#!/usr/bin/env bash
# Alma Android 发布脚本：测试 → 构建 → latest.json → commit → tag → push → GitHub Release。
#
# 用法：
#   bash scripts/release.sh [版本号] [发布说明]
#   版本号缺省 = 当前 versionName 的 patch 位 +1（1.3.0 → 1.3.1）
#   发布说明缺省 = "Alma Android v<版本>。"
#
# 前置：HEAD 干净（www/ 与 android/ 已提交）；test 三件套全绿才会走到 commit
# （对应「端到端测试和回归测试通过之前不许提交」的项目规则）。
set -euo pipefail
# 中文 notes 经 argv 进 python：C locale 下会被 surrogateescape 解码成无效
# UTF-8，latest.json json.dump 直接炸（surrogates not allowed）。强制 UTF-8。
export LC_ALL="${LC_ALL:-en_US.UTF-8}" LANG="${LANG:-en_US.UTF-8}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEST_DIR="${ALMA_TEST_DIR:-$ROOT/../test}"
GRADLE="$ROOT/android"
export JAVA_HOME="${JAVA_HOME:-/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home}"

cd "$ROOT"

# ── 0. 前置检查 ─────────────────────────────────────────────────────
if [ -n "$(git status --porcelain)" ]; then
  echo "✗ 工作区有未提交改动；先提交或 stash 再发布。" >&2
  exit 1
fi
command -v gh >/dev/null || { echo "✗ 需要 gh CLI。" >&2; exit 1; }
for t in cdp-e2e.mjs cdp-drawer.mjs cdp-webview-gate.mjs cdp-pair-nav.mjs; do
  [ -f "$TEST_DIR/$t" ] || { echo "✗ 缺少测试 $TEST_DIR/$t（可用 ALMA_TEST_DIR 覆盖路径）。" >&2; exit 1; }
done

# ── 1. 版本号：以 www/ 内嵌 renderer 版本为准（与 Alma 桌面同版本号）──
# tag = v<renderer 版本>；同一 renderer 版本的壳修复（tag 已存在）追加
# "-<versionCode>" 后缀（如 v0.4.213-6），应用内 isNewer 按第 4 段比较。
GRADLE_FILE="$GRADLE/app/build.gradle"
CUR_NAME="$(sed -n 's/.*versionName "\([^"]*\)".*/\1/p' "$GRADLE_FILE" | head -1)"
CUR_CODE="$(sed -n 's/.*versionCode \([0-9]*\).*/\1/p' "$GRADLE_FILE" | head -1)"
NEW_CODE=$((CUR_CODE + 1))
RENDERER_VER="$(grep -ho 'alma@[0-9][0-9A-Za-z.]*' "$ROOT"/www/assets/*.js 2>/dev/null | head -1 | cut -d'@' -f2)"
NEW_NAME="${1:-$RENDERER_VER}"
[ -n "$NEW_NAME" ] || { echo "✗ 无法从 www/ 读出 renderer 版本，请显式传版本号。" >&2; exit 1; }
if [ "${NEW_NAME#*-}" != "$NEW_NAME" ]; then
  echo "✗ 版本号请只给 renderer 版本（如 0.4.214），壳修复后缀由脚本生成。" >&2; exit 1
fi
TAG="v${NEW_NAME}"
# -N 后缀触发条件（应用内 isNewer 同款比较，含 1.x 遗留折算）：
#   ① tag 已被占用（同 renderer 的壳修复）；② 对已发布的最新 tag 不构成
#   「严格更新」（如 v1.3.0 → v0.4.213：折算后相等，老用户会收不到提示）。
LATEST_TAG="$(gh release view --repo nanami-0713/alma-android --json tagName -q .tagName 2>/dev/null || true)"
SUFFIX_NEEDED="$(python3 - "$NEW_NAME" "$LATEST_TAG" <<'PY'
import re, sys
new, latest = sys.argv[1], (sys.argv[2] or "").strip()
def legacy(t):
    t = t.lstrip("v")
    return "0.4.213" if re.match(r"^1\.\d+(\.\d+)?$", t) else t   # 1.x 壳随包 renderer 都是 0.4.213
def parse(t):
    parts = re.split(r"[.+-]", t.lstrip("v"))[:4]
    return [int(p) if p.isdigit() else 0 for p in parts] + [0, 0, 0, 0]
new, latest = legacy(new), legacy(latest)
print("1" if latest and parse(new) <= parse(latest) else "0")
PY
)"
if [ -n "$(git ls-remote --tags origin "refs/tags/${TAG}" 2>/dev/null | grep -q . && echo x)" ] || [ "$SUFFIX_NEEDED" = "1" ]; then
  NEW_NAME="${NEW_NAME}-${NEW_CODE}"
  TAG="v${NEW_NAME}"
  echo "▶ 壳修复/形态切换发布 $TAG"
fi
# 更新说明：未显式传 $2 时自动取上一 tag 以来的提交标题做条目（应用内
# 「更新内容」弹窗读 GitHub Release 正文 / latest.json notes）
if [ -n "${2:-}" ]; then
  NOTES="$2"
else
  LAST_TAG="$(git describe --tags --abbrev=0 2>/dev/null || true)"
  NOTES="Alma Android ${NEW_NAME}（renderer ${RENDERER_VER}）。"
  if [ -n "$LAST_TAG" ]; then
    while IFS= read -r line; do
      line="$(echo "$line" | sed -e 's/^[a-z0-9]*: //' -e 's/（.*//' | cut -c1-60)"
      [ -n "$line" ] && NOTES="$NOTES
- $line"
    done <<COMMITS
$(git log --format='%s' "$LAST_TAG"..HEAD 2>/dev/null | grep -v '^release:')
COMMITS
  fi
fi
# 下载兜底镜像链（与应用内 UPDATE.mirrors 保持一致；latest.json 优先生效）
MIRROR_BASES="https://gh-proxy.com/ https://ghfast.top/"
ASSET="alma-android-${TAG}.apk"
echo "▶ $CUR_NAME ($CUR_CODE) → $NEW_NAME ($NEW_CODE)  tag=$TAG"

# ── 2. 回归测试（www 静态服务 8778 + CDP 断言三件套）────────────────
# www/alma-droid-shim.js 等最终态已提交，测试即针对当前 HEAD；版本号写在
# android/ 不影响 www 层测试，先测后改号等价于测即将发布的代码。
STARTED_SERVER=0
if ! curl -sf -o /dev/null http://127.0.0.1:8778/ ; then
  echo "▶ 启动 www 静态服务 :8778"
  python3 -m http.server 8778 --directory "$ROOT/www" >/dev/null 2>&1 &
  SERVER_PID=$!
  STARTED_SERVER=1
  sleep 1
fi
cleanup() { [ "$STARTED_SERVER" = 1 ] && kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT

fail=0
for t in cdp-webview-gate.mjs cdp-e2e.mjs cdp-drawer.mjs cdp-update.mjs cdp-update-pill.mjs cdp-pair-nav.mjs; do
  [ -f "$TEST_DIR/$t" ] || continue
  echo "── $t"
  if ! node "$TEST_DIR/$t"; then fail=1; fi
done
if [ "$fail" = 1 ]; then echo "✗ 测试未全绿，中止（未提交任何内容）。" >&2; exit 1; fi
echo "✓ 回归测试全绿"

# ── 3. 写版本号 + 同步 web 资产 + 构建 APK ──────────────────────────
sed -i '' -e "s/versionCode $CUR_CODE/versionCode $NEW_CODE/" \
          -e "s/versionName \"$CUR_NAME\"/versionName \"$NEW_NAME\"/" "$GRADLE_FILE"
# assets/public 不进 git：www/ 改动必须同步进去，否则打出旧 web 层
echo "▶ cap sync android（www → assets/public）"
( cd "$ROOT" && npx cap sync android )
echo "▶ gradle assembleDebug（JDK ${JAVA_HOME}）"
( cd "$GRADLE" && ./gradlew -q assembleDebug )
APK="$GRADLE/app/build/outputs/apk/debug/app-debug.apk"
[ -f "$APK" ] || { echo "✗ 构建产物缺失：$APK" >&2; exit 1; }
cp "$APK" "/tmp/$ASSET"
# 本地分发目录（外层 apk-serve，非 git）
[ -d "$ROOT/../apk-serve" ] && cp "$APK" "$ROOT/../apk-serve/app-debug.apk" || true

# ── 4. latest.json（镜像 fallback 的 raw 源，随 main 分支发布）────────
# notes 保留换行（应用内弹窗按行出条目）；mirrors = 兜底镜像全 URL 链，
# 可在不发版的情况下远程调整下载兜底。
python3 - "$TAG" "$ASSET" "$NOTES" "$MIRROR_BASES" <<'PY'
import json, sys
tag, asset, notes, bases = sys.argv[1:5]
apk = f"https://github.com/nanami-0713/alma-android/releases/download/{tag}/{asset}"
with open("latest.json", "w") as f:
    json.dump({"tag": tag, "apk": asset, "notes": notes,
               "mirrors": [b + apk for b in bases.split()]},
              f, ensure_ascii=False, indent=2)
    f.write("\n")
PY

# ── 5. commit + tag + push ─────────────────────────────────────────
git add -A
git commit -m "release: $TAG (versionCode $NEW_CODE)

$NOTES"
git tag "$TAG"
git push origin main
git push origin "$TAG"

# ── 6. GitHub Release（附 APK 资产；应用内检查即读它）──────────────
gh release create "$TAG" "/tmp/$ASSET#$ASSET" \
  --repo nanami-0713/alma-android \
  --title "Alma Android $TAG" \
  --notes "$NOTES"

echo "✓ 发布完成：${TAG}（资产 ${ASSET}，latest.json 已随 main 推送）"
