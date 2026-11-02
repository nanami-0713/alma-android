!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "alma@0.4.378" };
  } catch (e2) {
  }
}();
;
{
  try {
    (function() {
      var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "2b2ca90f-74ce-4117-8927-0a6a74c89048", e._sentryDebugIdIdentifier = "sentry-dbid-2b2ca90f-74ce-4117-8927-0a6a74c89048");
    })();
  } catch (e) {
  }
}
;
import { W as WebPlugin } from "./connected-C8Gvg28Q.js";
import "./preload-helper-D_8ag_Pp.js";
import "./index-B0zE39VE.js";
import "./apiClient-DmP45vUN.js";
class LocalNotificationsWeb extends WebPlugin {
  constructor() {
    super(...arguments);
    this.pending = [];
    this.deliveredNotifications = [];
    this.hasNotificationSupport = () => {
      if (!("Notification" in window) || !Notification.requestPermission) {
        return false;
      }
      if (Notification.permission !== "granted") {
        try {
          new Notification("");
        } catch (e) {
          if (e.name == "TypeError") {
            return false;
          }
        }
      }
      return true;
    };
  }
  async getDeliveredNotifications() {
    const deliveredSchemas = [];
    for (const notification of this.deliveredNotifications) {
      const deliveredSchema = {
        title: notification.title,
        id: parseInt(notification.tag),
        body: notification.body
      };
      deliveredSchemas.push(deliveredSchema);
    }
    return {
      notifications: deliveredSchemas
    };
  }
  async removeDeliveredNotifications(delivered) {
    for (const toRemove of delivered.notifications) {
      const found = this.deliveredNotifications.find((n) => n.tag === String(toRemove.id));
      found === null || found === void 0 ? void 0 : found.close();
      this.deliveredNotifications = this.deliveredNotifications.filter(() => !found);
    }
  }
  async removeAllDeliveredNotifications() {
    for (const notification of this.deliveredNotifications) {
      notification.close();
    }
    this.deliveredNotifications = [];
  }
  async createChannel() {
    throw this.unimplemented("Not implemented on web.");
  }
  async deleteChannel() {
    throw this.unimplemented("Not implemented on web.");
  }
  async listChannels() {
    throw this.unimplemented("Not implemented on web.");
  }
  async schedule(options) {
    if (!this.hasNotificationSupport()) {
      throw this.unavailable("Notifications not supported in this browser.");
    }
    for (const notification of options.notifications) {
      this.sendNotification(notification);
    }
    return {
      notifications: options.notifications.map((notification) => ({
        id: notification.id
      }))
    };
  }
  async getPending() {
    return {
      notifications: this.pending
    };
  }
  async registerActionTypes() {
    throw this.unimplemented("Not implemented on web.");
  }
  async cancel(pending) {
    this.pending = this.pending.filter((notification) => !pending.notifications.find((n) => n.id === notification.id));
  }
  async areEnabled() {
    const { display } = await this.checkPermissions();
    return {
      value: display === "granted"
    };
  }
  async changeExactNotificationSetting() {
    throw this.unimplemented("Not implemented on web.");
  }
  async checkExactNotificationSetting() {
    throw this.unimplemented("Not implemented on web.");
  }
  async requestPermissions() {
    if (!this.hasNotificationSupport()) {
      throw this.unavailable("Notifications not supported in this browser.");
    }
    const display = this.transformNotificationPermission(await Notification.requestPermission());
    return { display };
  }
  async checkPermissions() {
    if (!this.hasNotificationSupport()) {
      throw this.unavailable("Notifications not supported in this browser.");
    }
    const display = this.transformNotificationPermission(Notification.permission);
    return { display };
  }
  transformNotificationPermission(permission) {
    switch (permission) {
      case "granted":
        return "granted";
      case "denied":
        return "denied";
      default:
        return "prompt";
    }
  }
  sendPending() {
    var _a;
    const toRemove = [];
    const now = (/* @__PURE__ */ new Date()).getTime();
    for (const notification of this.pending) {
      if (((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) && notification.schedule.at.getTime() <= now) {
        this.buildNotification(notification);
        toRemove.push(notification);
      }
    }
    this.pending = this.pending.filter((notification) => !toRemove.find((n) => n === notification));
  }
  sendNotification(notification) {
    var _a;
    if ((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) {
      const diff = notification.schedule.at.getTime() - (/* @__PURE__ */ new Date()).getTime();
      this.pending.push(notification);
      setTimeout(() => {
        this.sendPending();
      }, diff);
      return;
    }
    this.buildNotification(notification);
  }
  buildNotification(notification) {
    const localNotification = new Notification(notification.title, {
      body: notification.body,
      tag: String(notification.id)
    });
    localNotification.addEventListener("click", this.onClick.bind(this, notification), false);
    localNotification.addEventListener("show", this.onShow.bind(this, notification), false);
    localNotification.addEventListener("close", () => {
      this.deliveredNotifications = this.deliveredNotifications.filter(() => !this);
    }, false);
    this.deliveredNotifications.push(localNotification);
    return localNotification;
  }
  onClick(notification) {
    const data = {
      actionId: "tap",
      notification
    };
    this.notifyListeners("localNotificationActionPerformed", data);
  }
  onShow(notification) {
    this.notifyListeners("localNotificationReceived", notification);
  }
}
export {
  LocalNotificationsWeb
};
