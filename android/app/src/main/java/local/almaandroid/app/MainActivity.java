package local.almaandroid.app;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;
import com.getcapacitor.BridgeActivity;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.Locale;

/**
 * Alma Android 壳。
 * <p>
 * 原生侧职责（等价官方 iOS 壳）：
 * <ul>
 *   <li>WebView 权限：配对扫码用 getUserMedia 拿摄像头。Capacitor 的
 *       WebChromeClient 在 App 已持有运行时权限时会放行 WebView 的
 *       PermissionRequest —— 所以这里在启动时主动申请 CAMERA。</li>
 *   <li>首帧背景色与页面一致，减少启动白闪（暗色 = #282c34，随系统/应用主题）。</li>
 *   <li>edge-to-edge（Android 15 强制 / 部分 ROM 自行全屏）：系统栏图标
 *       深浅随主题，键盘 insets 由父容器补齐。</li>
 *   <li>注入系统 locale（renderer 语言检测用；WebView 的 navigator.language
 *       不随系统语言，需要原生权威值）。</li>
 * </ul>
 */
public class MainActivity extends BridgeActivity {

    /** 与 renderer 主题底色一致（shim 的 FOUC 打底同色）。 */
    private static final int BG_DARK = 0xFF282C34;
    private static final int BG_LIGHT = Color.WHITE;

    private WebView webView;

    /** 下载状态（shim 轮询进度用）：none|downloading|failed。 */
    private volatile String dlStatus = "none";
    private volatile long dlBytes = 0, dlTotal = -1;
    /** 下载代次号：新一轮 downloadAndInstall 使旧线程的镜像重试链失效。 */
    private volatile int dlGen = 0;
    /** 镜像重试队列（按序换：下载失败 / 文件无效时取下一个）。 */
    private final java.util.ArrayDeque<String> updateFallbacks = new java.util.ArrayDeque<>();

    private final androidx.activity.result.ActivityResultLauncher<String> cameraPermission =
        registerForActivityResult(new ActivityResultContracts.RequestPermission(), granted -> {
            // 用户授予或拒绝都无需额外处理：授予后 WebView 的下一次
            // PermissionRequest 会被 Capacitor 放行；拒绝则扫码功能不可用（可再申请）。
        });

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView != null) {
            applyWebViewBackground(isNightMode());
            applySystemBars(isNightMode());
            attachImeInsetsListener();
            allowLandscapeCutout();
            attachAppInsets();
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {
            cameraPermission.launch(Manifest.permission.CAMERA);
        }

        // 系统语言：Android WebView 的 navigator.language 不随系统语言（Capacitor
        // 长期已知问题，常返 en-US），renderer 的语言检测因此误判。原生侧提供权威
        // locale：documentStart 脚本（API 33+）在任何页面 JS 之前注入主帧与 iframe；
        // 旧设备回退 JavascriptInterface，由 shim 同步读取。二者皆无时 shim 退回
        // navigator.language。
        String langScript = "window.__almaAndroidLang__=\"" + Locale.getDefault().toLanguageTag() + "\";";
        try {
            if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
                java.util.Set<String> origins = new java.util.HashSet<>(java.util.Arrays.asList(
                        "https://localhost", "http://localhost"));
                WebViewCompat.addDocumentStartJavaScript(webView, langScript, origins);
            }
        } catch (Throwable t) {
            // 不支持则静默降级到 JavascriptInterface
        }
        try {
            webView.addJavascriptInterface(new LocaleBridge(), "__almaAndroidLocale");
            webView.addJavascriptInterface(new UiBridge(), "__almaAndroidUi");
            webView.addJavascriptInterface(new UpdateBridge(), "__almaAndroidUpdate");
        } catch (Throwable t) {
            // 同上
        }

        // 应用内自更新：下载完成后通过 FileProvider 拉起系统安装器。
        // v0.4.213-11 起弃用系统 DownloadManager：透明代理/部分 ROM 的
        // DownloadManager 会把 200 的 HTML 错误页当 APK 落盘（实机
        // 「安装包已损坏」，SUCCESSFUL ≠ 文件有效）。改为应用内
        // HttpURLConnection 直下：写盘前校验状态码/Content-Type/zip 魔数。
    }

    // ── 主题底色 / 系统栏外观 ────────────────────────────────────────────

    private boolean isNightMode() {
        int ui = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
        return ui == Configuration.UI_MODE_NIGHT_YES;
    }

    /** WebView 底色：页面尚未绘制/重载时的兜底，必须与主题一致，否则暗色用户看到白闪。 */
    private void applyWebViewBackground(boolean dark) {
        if (webView != null) webView.setBackgroundColor(dark ? BG_DARK : BG_LIGHT);
    }

    /** 状态栏/导航栏图标深浅（dark=true 表示页面深色 → 图标用浅色）。 */
    private void applySystemBars(boolean dark) {
        try {
            WindowInsetsControllerCompat c = new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
            c.setAppearanceLightStatusBars(!dark);
            c.setAppearanceLightNavigationBars(!dark);
        } catch (Throwable t) {
            // 个别 ROM 上调整失败不影响功能
        }
    }

    /** 应用主题（"dark" | "light" | "system"）→ WebView 底色 + 系统栏图标。 */
    private void applyTheme(String mode) {
        boolean dark = "dark".equals(mode) || (!"light".equals(mode) && isNightMode());
        applyWebViewBackground(dark);
        applySystemBars(dark);
    }

    /**
     * 键盘 insets：edge-to-edge 下 Capacitor 只给 WebView 补 systemBars 边距并在
     * WebView 上 CONSUMED 全部 insets（含 ime）→ 键盘弹出会盖住输入框。在 WebView
     * 的父容器上按 ime 补底 padding（减去已由 WebView margin 处理的导航栏高度），
     * insets 继续透传给 WebView 供 Capacitor 使用。非 edge-to-edge 窗口 insets
     * 派发到这里已是 0，此监听为 no-op。
     */
    private void attachImeInsetsListener() {
        if (!(webView.getParent() instanceof View)) return;
        View parent = (View) webView.getParent();
        ViewCompat.setOnApplyWindowInsetsListener(parent, (v, insets) -> {
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(0, 0, 0, Math.max(0, ime.bottom - bars.bottom));
            return insets;
        });
    }

    /**
     * 横屏挖孔全屏铺满（修复横屏左/右侧被挖孔逼出的空白条）。
     * <p>Android ≤14 默认 layoutInDisplayCutoutMode 在横屏下整个窗口避让挖孔
     * （系统级 letterbox）；shortEdges 允许窗口延伸进挖孔区，与 Android 15
     * edge-to-edge 强制行为一致。无挖孔设备（含 AVD 默认）此设置无任何效果。
     */
    private void allowLandscapeCutout() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            try {
                getWindow().getAttributes().layoutInDisplayCutoutMode =
                        WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            } catch (Throwable t) {
                // 个别 ROM 不接受则维持系统默认
            }
        }
    }

    /**
     * 用应用自己的 insets 策略替换 Capacitor 的 WebView 边距
     * （adjustMarginsForEdgeToEdge=force：边距 = systemBars|displayCutout 并集）。
     * <p>差异只在横屏左右：挖孔屏左右侧的 displayCutout inset（OPPO 打孔在横屏
     * 落在左缘，实测 136px）不再折算成 WebView 左右边距 —— 那会得到一条内容
     * 永远进不去的空白条。聊天内容在孔下滚动是全屏应用的常态；上下仍取
     * systemBars 与 displayCutout 的较大者，竖屏刘海/状态栏行为不变。
     * setOnApplyWindowInsetsListener 直接顶掉 Capacitor 在 Bridge 构造时挂的
     * 监听（本方法在 super.onCreate 之后调用）。
     */
    private void attachAppInsets() {
        ViewCompat.setOnApplyWindowInsetsListener(webView, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            Insets cut = insets.getInsets(WindowInsetsCompat.Type.displayCutout());
            if (v.getLayoutParams() instanceof ViewGroup.MarginLayoutParams) {
                ViewGroup.MarginLayoutParams mlp = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
                mlp.leftMargin = bars.left;
                mlp.rightMargin = bars.right;
                mlp.topMargin = Math.max(bars.top, cut.top);
                mlp.bottomMargin = Math.max(bars.bottom, cut.bottom);
                v.setLayoutParams(mlp);
            }
            // 与 Capacitor 原监听一致：insets 不再下传（父容器的键盘补边在先执行）
            return WindowInsetsCompat.CONSUMED;
        });
        webView.requestApplyInsets();
    }

    /** uiMode 在 manifest 的 configChanges 里：系统深浅色切换不重建 Activity，手动同步。 */
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        applyWebViewBackground(isNightMode());
        applySystemBars(isNightMode());
    }

    /** 兜底 locale 通道：documentStart 不可用（<API 33）时由 shim 同步调用。 */
    public static class LocaleBridge {
        @JavascriptInterface
        public String getLanguageTag() {
            return Locale.getDefault().toLanguageTag();
        }
    }

    /**
     * 主题通道：shim 在启动时（appearance-cache）与每次主题切换时上报
     * "dark"/"light"/"system"，原生同步 WebView 底色与系统栏图标深浅 ——
     * 应用内主题（含"跟随系统"）与系统深浅色不一致时也能保持对比度。
     */
    public class UiBridge {
        @JavascriptInterface
        public void setTheme(final String mode) {
            runOnUiThread(() -> applyTheme(mode));
        }
    }

    // ── 应用内自更新 ────────────────────────────────────────────────────

    /** 取下一个兜底镜像；队列空返回 null。 */
    private String nextUpdateFallback() {
        return updateFallbacks.poll();
    }

    /**
     * 应用内 APK 下载（HttpURLConnection，后台线程）。系统 DownloadManager
     * 在国内网络/部分 ROM 上会拿到 200 的 HTML 错误页当 APK 落盘（实机
     * 「安装包已损坏」），故自己下：响应不是 APK 就换下一个镜像，
     * 垃圾永远不落盘。写 alma-update.apk.part，成功后原子改名。
     */
    private void startUpdateDownload(String url) {
        final int gen = ++dlGen;
        dlStatus = "downloading";
        dlBytes = 0;
        dlTotal = -1;
        new Thread(() -> {
            String u = url;
            while (u != null) {
                if (gen != dlGen) return; // 新一轮下载已开始，旧链让位
                if (downloadToFile(u, gen)) {
                    dlStatus = "none";
                    runOnUiThread(this::installUpdate);
                    return;
                }
                u = nextUpdateFallback();
            }
            dlStatus = "failed";
            runOnUiThread(() -> notifyUpdateState("error"));
        }, "alma-update-dl").start();
    }

    /** 单地址下载到 .part；响应不是 APK（HTML 错误页/重定向链坏/截断）即判失败。 */
    private boolean downloadToFile(String url, int gen) {
        // 慢速看门狗：readTimeout 只能掐死「完全断流」，掐不死「涓涓细流」——
        // 实测 gh-proxy 可以 15KB/s 匀速回，39MB 要 45 分钟，UI 永远"下载中"。
        // 宽限期后均速低于下限（或超过总时限）即放弃本地址换下一个镜像。
        final long minBps = 128L * 1024L;
        final long graceMs = 15000L, deadlineMs = 360000L;
        long started = android.os.SystemClock.elapsedRealtime();
        java.net.HttpURLConnection c = null;
        try {
            File dir = getExternalFilesDir("updates");
            if (dir == null) throw new IOException("no-updates-dir");
            if (!dir.exists() && !dir.mkdirs()) throw new IOException("no-dir");
            File part = new File(dir, "alma-update.apk.part");
            File apk = new File(dir, "alma-update.apk");
            c = (java.net.HttpURLConnection) new java.net.URL(url).openConnection();
            c.setInstanceFollowRedirects(true);
            c.setConnectTimeout(15000);
            c.setReadTimeout(30000);
            c.setRequestProperty("User-Agent", "AlmaAndroid-Updater");
            int code = c.getResponseCode();
            String ctype = c.getContentType();
            long clen = c.getContentLengthLong();
            // GitHub 资产 ≈ 39MB：错误页/JSON 都远小于 1MB，且 HTML 明确不是包
            boolean looksHtml = ctype != null && ctype.toLowerCase(java.util.Locale.ROOT).contains("text/html");
            if (code != 200 || looksHtml || (clen >= 0 && clen < 1024L * 1024L)) {
                throw new IOException("bad-response " + code + " " + ctype + " len=" + clen);
            }
            try (java.io.InputStream in = c.getInputStream();
                 java.io.OutputStream out = new java.io.FileOutputStream(part)) {
                byte[] buf = new byte[65536];
                int n;
                long wrote = 0;
                boolean first = true;
                while ((n = in.read(buf)) > 0) {
                    // 判在写入之前：新一轮已开始时不再向新线程截断过的 .part 交错写
                    if (gen != dlGen) throw new IOException("superseded");
                    // zip 魔数 PK：第一块数据就验，HTML/网关页即刻拒收不落盘
                    if (first) {
                        if (n < 4 || buf[0] != 'P' || buf[1] != 'K') throw new IOException("not-zip");
                        first = false;
                    }
                    out.write(buf, 0, n);
                    wrote += n;
                    if (clen > 0) dlTotal = clen;
                    dlBytes = wrote;
                    long elapsed = android.os.SystemClock.elapsedRealtime() - started;
                    if (elapsed > deadlineMs) {
                        throw new IOException("deadline " + (wrote * 1000L / Math.max(1, elapsed)) + "B/s");
                    }
                    if (wrote > 512L * 1024L && elapsed > graceMs
                            && wrote * 1000L / Math.max(1, elapsed) < minBps) {
                        throw new IOException("too-slow " + (wrote * 1000L / Math.max(1, elapsed)) + "B/s");
                    }
                }
                out.flush();
            }
            if (part.length() < 1024L * 1024L) throw new IOException("too-small");
            // 原子替换：新 inode，规避 FUSE 对同名覆盖的陈旧读
            if (apk.exists() && !apk.delete()) throw new IOException("no-delete");
            if (!part.renameTo(apk)) throw new IOException("no-rename");
            android.util.Log.d("almaUpdate", "downloaded " + url + " -> " + apk.length() + "B");
            return true;
        } catch (Throwable t) {
            android.util.Log.d("almaUpdate", "download failed " + url + ": " + t);
            return false;
        } finally {
            if (c != null) c.disconnect();
        }
    }

    /** 版本号 → [a,b,c,d]（同 shim isNewer：split [.+-]，1.x 遗留折算 0.4.213）。 */
    private static int[] parseVer(String v) {
        String t = v == null ? "" : v.trim();
        if (t.startsWith("v") || t.startsWith("V")) t = t.substring(1);
        String[] parts = t.split("[.+-]");
        int[] out = new int[4];
        for (int i = 0; i < 4 && i < parts.length; i++) {
            try {
                out[i] = Integer.parseInt(parts[i]);
            } catch (Throwable e) {
                out[i] = 0;
            }
        }
        // 1.x 壳随包 renderer 都是 0.4.213（与应用内 isNewer 同款折算）
        if (out[0] == 1 && out[1] >= 0 && (out[1] > 0 || out[2] > 0)) {
            int suffix = out[3];
            out = new int[]{0, 4, 213, 0};
            out[3] = suffix;
        }
        return out;
    }

    /** candidate 是否严格新于 current。 */
    private static boolean versionNewer(String candidate, String current) {
        int[] a = parseVer(candidate), b = parseVer(current);
        for (int i = 0; i < 4; i++) {
            if (a[i] != b[i]) return a[i] > b[i];
        }
        return false;
    }

    /**
     * APK 完整性预检（交安装器前的最后一关）：
     * ① 可被 PackageManager 解析（截断 zip / HTML / 空文件 → null）；
     * ② 包名是本应用；
     * ③ versionName 严格新于当前运行版本 —— 手动装过新版后残留的旧
     *    alma-update.apk 曾穿过仅查 manifest 的校验直达系统安装器
     *    （OPPO 实机报「安装包已损坏」，v0.4.213-10）；
     * ④ 签名与已装应用一致（垃圾包/重打包拒收）。
     */
    private boolean isValidUpdateApk(File apk) {
        try {
            PackageManager pm = getPackageManager();
            android.content.pm.PackageInfo pi =
                    pm.getPackageArchiveInfo(apk.getPath(), PackageManager.GET_SIGNATURES);
            boolean ok = pi != null && getPackageName().equals(pi.packageName);
            String why = ok ? "" : (pi == null ? "unparseable" : "pkg-mismatch");
            if (ok) {
                String cur = pm.getPackageInfo(getPackageName(), 0).versionName;
                if (!versionNewer(pi.versionName, cur)) {
                    ok = false;
                    why = "stale " + pi.versionName + " <= " + cur;
                }
            }
            if (ok) {
                android.content.pm.Signature[] as = pi.signatures;
                android.content.pm.Signature[] bs =
                        pm.getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES).signatures;
                ok = as != null && as.length > 0 && bs != null && bs.length > 0
                        && as[0].equals(bs[0]);
                if (!ok) why = "signature-mismatch";
            }
            android.util.Log.d("almaUpdate", "validate " + apk.length() + "B v="
                    + (pi == null ? "?" : pi.versionName) + " -> " + ok + (ok ? "" : " (" + why + ")"));
            return ok;
        } catch (Throwable t) {
            android.util.Log.d("almaUpdate", "validate threw " + t);
            return false;
        }
    }

    /**
     * 拉起系统安装器安装已下载的 APK。Android 8+ 需用户先授予本应用
     * "安装未知应用"：未授予时直接引导到对应设置页（比依赖各 ROM 行为
     * 不一的 ActivityNotFoundException 兜底更可控），授权后回设置页
     * 再点一次"安装"即可。
     *
     * 下载"成功"≠文件有效（见 isValidUpdateApk）：坏了删掉走镜像重试
     * （与下载失败同一路径），镜像也坏才报 error。
     */
    private void installUpdate() {
        File dir = getExternalFilesDir("updates");
        File apk = dir == null ? null : new File(dir, "alma-update.apk");
        if (apk == null || !apk.exists()) {
            notifyUpdateState("error");
            return;
        }
        if (!isValidUpdateApk(apk)) {
            android.util.Log.d("almaUpdate", "apk invalid (" + apk.length() + "B), fallbacks=" + updateFallbacks.size());
            apk.delete();
            String fb = nextUpdateFallback();
            if (fb != null) {
                startUpdateDownload(fb);
                return; // 重试下载的终态仍经完成广播回到这里
            }
            notifyUpdateState("error");
            return;
        }
        try {
            if (Build.VERSION.SDK_INT >= 26
                    && !getPackageManager().canRequestPackageInstalls()) {
                Intent s = new Intent(
                        android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                        Uri.parse("package:" + getPackageName()));
                startActivity(s);
                notifyUpdateState("permission");
                return;
            }
            Uri content = FileProvider.getUriForFile(this,
                    getPackageName() + ".fileprovider", apk);
            Intent i = new Intent(Intent.ACTION_VIEW);
            i.setDataAndType(content, "application/vnd.android.package-archive");
            i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivity(i);
            notifyUpdateState("downloaded");
        } catch (Throwable t) {
            notifyUpdateState("error");
        }
    }

    /** 下载终态同步给 shim；无监听（页面已翻页/重载）时静默。 */
    private void notifyUpdateState(String state) {
        if (webView == null) return;
        try {
            webView.evaluateJavascript(
                "(window.__almaUpdateState?window.__almaUpdateState(\""
                    + state.replace("\\", "\\\\").replace("\"", "\\\"")
                    + "\"):0)", null);
        } catch (Throwable t) {
            // WebView 已销毁等
        }
    }

    /**
     * 自更新通道：window.__almaAndroidUpdate 读壳版本（versionName 以
     * PackageManager 为权威 —— BuildConfig 在 AGP 8 默认不生成）、发起下载。
     * 调用来自 WebView 的 JS 线程；下载在后台线程，安装动作回主线程。
     */
    public class UpdateBridge {
        @JavascriptInterface
        public String getVersionName() {
            try {
                return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
            } catch (Throwable t) {
                return "";
            }
        }

        /** @return "ok" 或错误码（shim 展示）；真正结果经 __almaUpdateState 回调。 */
        @JavascriptInterface
        public String downloadAndInstall(String url, String fallback) {
            try {
                String u = url == null ? "" : url.trim();
                if (!u.startsWith("http")) return "bad-url";
                updateFallbacks.clear();
                String fb = fallback == null ? "" : fallback.trim();
                // 镜像链（JSON 数组，按序换）；旧协议单 URL 兼容
                if (fb.startsWith("[")) {
                    org.json.JSONArray arr = new org.json.JSONArray(fb);
                    for (int i = 0; i < arr.length(); i++) {
                        String s = arr.optString(i, "").trim();
                        if (s.startsWith("http")) updateFallbacks.add(s);
                    }
                } else if (fb.startsWith("http")) {
                    updateFallbacks.add(fb);
                }
                startUpdateDownload(u);
                return "ok";
            } catch (Throwable t) {
                return "error";
            }
        }

        /**
         * 下载进度（shim 轮询渲染进度条）。终态由 __almaUpdateState 推送，
         * 这里只报进度与 transient failed（shim 连续 3 次 failed 的兜底仍有效）。
         */
        @JavascriptInterface
        public String downloadProgress() {
            String s = dlStatus;
            if ("downloading".equals(s)) {
                return "{\"status\":\"downloading\",\"transferred\":" + dlBytes
                        + ",\"total\":" + dlTotal + "}";
            }
            if ("failed".equals(s)) {
                return "{\"status\":\"failed\"}";
            }
            return "{\"status\":\"none\"}";
        }

        /** 「重启安装」键：重新拉起安装器（首次弹窗可能被取消）。 */
        @JavascriptInterface
        public void launchInstaller() {
            runOnUiThread(() -> installUpdate());
        }
    }

    @Override
    public void onDestroy() {
        dlGen++; // 令进行中的下载线程让位
        super.onDestroy();
    }

    /**
     * 返回键。层级优先级（v0.4.213-11 修正：原先 canGoBack() 判在 JS 之前，
     * renderer 主页面积累过 pushState 历史后（用几天的真机必然如此），
     * 返回手势全被 WebView.goBack() 吃掉，设置层/弹窗的消化逻辑没机会
     * 跑 —— 实机表现为「配对页侧滑直接退出应用」回归）：
     * ① JS 消化（更新弹窗 → 设置层 iframe 内部回退 → 关设置层）；
     * ② WebView 自身历史（renderer 模态等 pushState）；
     * ③ 默认行为（退出）。
     */
    @Override
    public void onBackPressed() {
        WebView wv = webView != null ? webView
                : (getBridge() != null ? getBridge().getWebView() : null);
        if (wv != null) {
            // evaluateJavascript 的回调在 UI 线程执行
            wv.evaluateJavascript(
                "(window.__almaAndroidBack ? window.__almaAndroidBack() : false)",
                new android.webkit.ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
                        if ("true".equals(value)) return; // JS 已按层级消化
                        if (wv.canGoBack()) {
                            wv.goBack();
                            return;
                        }
                        MainActivity.super.onBackPressed();
                    }
                });
            return;
        }
        super.onBackPressed();
    }
}
