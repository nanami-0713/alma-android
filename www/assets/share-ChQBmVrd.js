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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "c9f00d32-7de8-47a9-9c60-b211b6b8d297", e._sentryDebugIdIdentifier = "sentry-dbid-c9f00d32-7de8-47a9-9c60-b211b6b8d297");
    })();
  } catch (e) {
  }
}
;
import { R as React, r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import { a as useI18n, B as Button, c as cn, a1 as writeImageToClipboard, a2 as toast, C as Copy, i as initObservability, S as SWRConfig, s as swrConfig, T as ThemeProvider, d as Toaster } from "./ThemeContext-Ac9lDiNd.js";
import { i as instance } from "./createLucideIcon-sFEqYeet.js";
import "./clipboard-polyfill-B3oH85Ao.js";
import { C as Checkbox, b as Label, R as RotateCcw } from "./label-CF1Fh03r.js";
import "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import { u as usePlatformContext, W as WindowControls, P as PlatformProvider } from "./PlatformContext-BWz3dz-T.js";
import { O as OverflowContainer, u as useTheme } from "./overflow-container-CXkfjaRd.js";
import { s as startOfWeek, g as getDefaultOptions, e as enUS, M as Message, a as MessageContent } from "./en-US-CZvvliM3.js";
import { R as Response, b as ZoomIn, Z as ZoomOut } from "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import { t as toDate, c as constructFrom, d as differenceInCalendarDays, m as millisecondsInWeek, a as addLeadingZeros, i as isValid } from "./addLeadingZeros-DCGuLiwe.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import { D as Download } from "./wand-sparkles-D4aHx43i.js";
import "./index-CZUfqr00.js";
import "./image-C_h5oH_f.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfWeekYear(date, options) {
  const defaultOptions = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}
const lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
const formatters = {
  // Era
  G: function(date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};
const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};
const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};
const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;
const throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions = getDefaultOptions();
  const locale = defaultOptions.locale ?? enUS;
  const firstWeekContainsDate = defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (isProtectedWeekYearToken(token) || isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
var roundNumber = function(num, decimal) {
  return Number(num.toFixed(decimal));
};
var checkIsNumber = function(num, defaultValue) {
  return defaultValue;
};
var handleCallback = function(context, event, callback) {
  if (callback && typeof callback === "function") {
    callback(context, event);
  }
};
var easeOut = function(t) {
  return -Math.cos(t * Math.PI) / 2 + 0.5;
};
var linear = function(t) {
  return t;
};
var easeInQuad = function(t) {
  return t * t;
};
var easeOutQuad = function(t) {
  return t * (2 - t);
};
var easeInOutQuad = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
var easeInCubic = function(t) {
  return t * t * t;
};
var easeOutCubic = function(t) {
  return --t * t * t + 1;
};
var easeInOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
var easeInQuart = function(t) {
  return t * t * t * t;
};
var easeOutQuart = function(t) {
  return 1 - --t * t * t * t;
};
var easeInOutQuart = function(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
var easeInQuint = function(t) {
  return t * t * t * t * t;
};
var easeOutQuint = function(t) {
  return 1 + --t * t * t * t * t;
};
var easeInOutQuint = function(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
var animations = {
  easeOut,
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint
};
var handleCancelAnimationFrame = function(animation) {
  if (typeof animation === "number") {
    cancelAnimationFrame(animation);
  }
};
var handleCancelAnimation = function(contextInstance) {
  if (!contextInstance.mounted)
    return;
  handleCancelAnimationFrame(contextInstance.animation);
  contextInstance.animate = false;
  contextInstance.animation = null;
  contextInstance.velocity = null;
};
function handleSetupAnimation(contextInstance, animationName, animationTime, callback) {
  if (!contextInstance.mounted)
    return;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  var lastStep = 1;
  handleCancelAnimation(contextInstance);
  contextInstance.animation = function() {
    if (!contextInstance.mounted) {
      return handleCancelAnimationFrame(contextInstance.animation);
    }
    var frameTime = (/* @__PURE__ */ new Date()).getTime() - startTime;
    var animationProgress = frameTime / animationTime;
    var animationType = animations[animationName];
    var step = animationType(animationProgress);
    if (frameTime >= animationTime) {
      callback(lastStep);
      contextInstance.animation = null;
    } else if (contextInstance.animation) {
      callback(step);
      requestAnimationFrame(contextInstance.animation);
    }
  };
  requestAnimationFrame(contextInstance.animation);
}
function isValidTargetState(targetState) {
  var scale = targetState.scale, positionX = targetState.positionX, positionY = targetState.positionY;
  if (Number.isNaN(scale) || Number.isNaN(positionX) || Number.isNaN(positionY)) {
    return false;
  }
  return true;
}
function animate(contextInstance, targetState, animationTime, animationName) {
  var isValid2 = isValidTargetState(targetState);
  if (!contextInstance.mounted || !isValid2)
    return;
  var setTransformState = contextInstance.setTransformState;
  var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  var scaleDiff = targetState.scale - scale;
  var positionXDiff = targetState.positionX - positionX;
  var positionYDiff = targetState.positionY - positionY;
  if (animationTime === 0) {
    setTransformState(targetState.scale, targetState.positionX, targetState.positionY);
  } else {
    handleSetupAnimation(contextInstance, animationName, animationTime, function(step) {
      var newScale = scale + scaleDiff * step;
      var newPositionX = positionX + positionXDiff * step;
      var newPositionY = positionY + positionYDiff * step;
      setTransformState(newScale, newPositionX, newPositionY);
    });
  }
}
function getComponentsSizes(wrapperComponent, contentComponent, newScale) {
  var wrapperWidth = wrapperComponent.offsetWidth;
  var wrapperHeight = wrapperComponent.offsetHeight;
  var contentWidth = contentComponent.offsetWidth;
  var contentHeight = contentComponent.offsetHeight;
  var newContentWidth = contentWidth * newScale;
  var newContentHeight = contentHeight * newScale;
  var newDiffWidth = wrapperWidth - newContentWidth;
  var newDiffHeight = wrapperHeight - newContentHeight;
  return {
    wrapperWidth,
    wrapperHeight,
    newContentWidth,
    newDiffWidth,
    newContentHeight,
    newDiffHeight
  };
}
var getBounds = function(wrapperWidth, newContentWidth, diffWidth, wrapperHeight, newContentHeight, diffHeight, centerZoomedOut) {
  var scaleWidthFactor = wrapperWidth > newContentWidth ? diffWidth * (centerZoomedOut ? 1 : 0.5) : 0;
  var scaleHeightFactor = wrapperHeight > newContentHeight ? diffHeight * (centerZoomedOut ? 1 : 0.5) : 0;
  var minPositionX = wrapperWidth - newContentWidth - scaleWidthFactor;
  var maxPositionX = scaleWidthFactor;
  var minPositionY = wrapperHeight - newContentHeight - scaleHeightFactor;
  var maxPositionY = scaleHeightFactor;
  return { minPositionX, maxPositionX, minPositionY, maxPositionY };
};
var calculateBounds = function(contextInstance, newScale) {
  var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
  var centerZoomedOut = contextInstance.setup.centerZoomedOut;
  if (!wrapperComponent || !contentComponent) {
    throw new Error("Components are not mounted");
  }
  var _a = getComponentsSizes(wrapperComponent, contentComponent, newScale), wrapperWidth = _a.wrapperWidth, wrapperHeight = _a.wrapperHeight, newContentWidth = _a.newContentWidth, newDiffWidth = _a.newDiffWidth, newContentHeight = _a.newContentHeight, newDiffHeight = _a.newDiffHeight;
  var bounds = getBounds(wrapperWidth, newContentWidth, newDiffWidth, wrapperHeight, newContentHeight, newDiffHeight, Boolean(centerZoomedOut));
  return bounds;
};
var boundLimiter = function(value, minBound, maxBound, isActive) {
  if (!isActive)
    return roundNumber(value, 2);
  if (value < minBound)
    return roundNumber(minBound, 2);
  if (value > maxBound)
    return roundNumber(maxBound, 2);
  return roundNumber(value, 2);
};
var handleCalculateBounds = function(contextInstance, newScale) {
  var bounds = calculateBounds(contextInstance, newScale);
  contextInstance.bounds = bounds;
  return bounds;
};
function getMouseBoundedPosition(positionX, positionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent) {
  var minPositionX = bounds.minPositionX, minPositionY = bounds.minPositionY, maxPositionX = bounds.maxPositionX, maxPositionY = bounds.maxPositionY;
  var paddingX = 0;
  var paddingY = 0;
  if (wrapperComponent) {
    paddingX = paddingValueX;
    paddingY = paddingValueY;
  }
  var x = boundLimiter(positionX, minPositionX - paddingX, maxPositionX + paddingX, limitToBounds);
  var y = boundLimiter(positionY, minPositionY - paddingY, maxPositionY + paddingY, limitToBounds);
  return { x, y };
}
function handleCalculateZoomPositions(contextInstance, mouseX, mouseY, newScale, bounds, limitToBounds) {
  var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  var scaleDifference = newScale - scale;
  if (typeof mouseX !== "number" || typeof mouseY !== "number") {
    console.error("Mouse X and Y position were not provided!");
    return { x: positionX, y: positionY };
  }
  var calculatedPositionX = positionX - mouseX * scaleDifference;
  var calculatedPositionY = positionY - mouseY * scaleDifference;
  var newPositions = getMouseBoundedPosition(calculatedPositionX, calculatedPositionY, bounds, limitToBounds, 0, 0, null);
  return newPositions;
}
function checkZoomBounds(zoom, minScale, maxScale, zoomPadding, enablePadding) {
  var scalePadding = enablePadding ? zoomPadding : 0;
  var minScaleWithPadding = minScale - scalePadding;
  if (!Number.isNaN(maxScale) && zoom >= maxScale)
    return maxScale;
  if (!Number.isNaN(minScale) && zoom <= minScaleWithPadding)
    return minScaleWithPadding;
  return zoom;
}
var isPanningStartAllowed = function(contextInstance, event) {
  var excluded = contextInstance.setup.panning.excluded;
  var isInitialized = contextInstance.isInitialized, wrapperComponent = contextInstance.wrapperComponent;
  var target = event.target;
  var targetIsShadowDom = "shadowRoot" in target && "composedPath" in event;
  var isWrapperChild = targetIsShadowDom ? event.composedPath().some(function(el) {
    if (!(el instanceof Element)) {
      return false;
    }
    return wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(el);
  }) : wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(target);
  var isAllowed = isInitialized && target && isWrapperChild;
  if (!isAllowed)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  return true;
};
var isPanningAllowed = function(contextInstance) {
  var isInitialized = contextInstance.isInitialized, isPanning = contextInstance.isPanning, setup = contextInstance.setup;
  var disabled = setup.panning.disabled;
  var isAllowed = isInitialized && isPanning && !disabled;
  if (!isAllowed)
    return false;
  return true;
};
var handlePanningSetup = function(contextInstance, event) {
  var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY;
  contextInstance.isPanning = true;
  var x = event.clientX;
  var y = event.clientY;
  contextInstance.startCoords = { x: x - positionX, y: y - positionY };
};
var handleTouchPanningSetup = function(contextInstance, event) {
  var touches = event.touches;
  var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY;
  contextInstance.isPanning = true;
  var oneFingerTouch = touches.length === 1;
  if (oneFingerTouch) {
    var x = touches[0].clientX;
    var y = touches[0].clientY;
    contextInstance.startCoords = { x: x - positionX, y: y - positionY };
  }
};
function handlePanToBounds(contextInstance) {
  var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
  var _b = contextInstance.setup, disabled = _b.disabled, limitToBounds = _b.limitToBounds, centerZoomedOut = _b.centerZoomedOut;
  var wrapperComponent = contextInstance.wrapperComponent;
  if (disabled || !wrapperComponent || !contextInstance.bounds)
    return;
  var _c = contextInstance.bounds, maxPositionX = _c.maxPositionX, minPositionX = _c.minPositionX, maxPositionY = _c.maxPositionY, minPositionY = _c.minPositionY;
  var xChanged = positionX > maxPositionX || positionX < minPositionX;
  var yChanged = positionY > maxPositionY || positionY < minPositionY;
  var mousePosX = positionX > maxPositionX ? wrapperComponent.offsetWidth : contextInstance.setup.minPositionX || 0;
  var mousePosY = positionY > maxPositionY ? wrapperComponent.offsetHeight : contextInstance.setup.minPositionY || 0;
  var _d = handleCalculateZoomPositions(contextInstance, mousePosX, mousePosY, scale, contextInstance.bounds, limitToBounds || centerZoomedOut), x = _d.x, y = _d.y;
  return {
    scale,
    positionX: xChanged ? x : positionX,
    positionY: yChanged ? y : positionY
  };
}
function handleNewPosition(contextInstance, newPositionX, newPositionY, paddingValueX, paddingValueY) {
  var limitToBounds = contextInstance.setup.limitToBounds;
  var wrapperComponent = contextInstance.wrapperComponent, bounds = contextInstance.bounds;
  var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  if (wrapperComponent === null || bounds === null || newPositionX === positionX && newPositionY === positionY) {
    return;
  }
  var _b = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent), x = _b.x, y = _b.y;
  contextInstance.setTransformState(scale, x, y);
}
var getPanningClientPosition = function(contextInstance, clientX, clientY) {
  var startCoords = contextInstance.startCoords, transformState = contextInstance.transformState;
  var panning = contextInstance.setup.panning;
  var lockAxisX = panning.lockAxisX, lockAxisY = panning.lockAxisY;
  var positionX = transformState.positionX, positionY = transformState.positionY;
  if (!startCoords) {
    return { x: positionX, y: positionY };
  }
  var mouseX = clientX - startCoords.x;
  var mouseY = clientY - startCoords.y;
  var newPositionX = lockAxisX ? positionX : mouseX;
  var newPositionY = lockAxisY ? positionY : mouseY;
  return { x: newPositionX, y: newPositionY };
};
var getPaddingValue = function(contextInstance, size) {
  var setup = contextInstance.setup, transformState = contextInstance.transformState;
  var scale = transformState.scale;
  var minScale = setup.minScale, disablePadding = setup.disablePadding;
  if (size > 0 && scale >= minScale && !disablePadding) {
    return size;
  }
  return 0;
};
var isVelocityCalculationAllowed = function(contextInstance) {
  var mounted = contextInstance.mounted;
  var _a = contextInstance.setup, disabled = _a.disabled, velocityAnimation = _a.velocityAnimation;
  var scale = contextInstance.transformState.scale;
  var disabledVelocity = velocityAnimation.disabled;
  var isAllowed = !disabledVelocity || scale > 1 || !disabled || mounted;
  if (!isAllowed)
    return false;
  return true;
};
var isVelocityAllowed = function(contextInstance) {
  var mounted = contextInstance.mounted, velocity = contextInstance.velocity, bounds = contextInstance.bounds;
  var _a = contextInstance.setup, disabled = _a.disabled, velocityAnimation = _a.velocityAnimation;
  var scale = contextInstance.transformState.scale;
  var disabledVelocity = velocityAnimation.disabled;
  var isAllowed = !disabledVelocity || scale > 1 || !disabled || mounted;
  if (!isAllowed)
    return false;
  if (!velocity || !bounds)
    return false;
  return true;
};
function getVelocityMoveTime(contextInstance, velocity) {
  var velocityAnimation = contextInstance.setup.velocityAnimation;
  var equalToMove = velocityAnimation.equalToMove, animationTime = velocityAnimation.animationTime, sensitivity = velocityAnimation.sensitivity;
  if (equalToMove) {
    return animationTime * velocity * sensitivity;
  }
  return animationTime;
}
function getVelocityPosition(newPosition, startPosition, currentPosition, isLocked, limitToBounds, minPosition, maxPosition, minTarget, maxTarget, step) {
  if (limitToBounds) {
    if (startPosition > maxPosition && currentPosition > maxPosition) {
      var calculatedPosition = maxPosition + (newPosition - maxPosition) * step;
      if (calculatedPosition > maxTarget)
        return maxTarget;
      if (calculatedPosition < maxPosition)
        return maxPosition;
      return calculatedPosition;
    }
    if (startPosition < minPosition && currentPosition < minPosition) {
      var calculatedPosition = minPosition + (newPosition - minPosition) * step;
      if (calculatedPosition < minTarget)
        return minTarget;
      if (calculatedPosition > minPosition)
        return minPosition;
      return calculatedPosition;
    }
  }
  if (isLocked)
    return startPosition;
  return boundLimiter(newPosition, minPosition, maxPosition, limitToBounds);
}
function getSizeMultiplier(wrapperComponent, equalToMove) {
  var defaultMultiplier = 1;
  if (equalToMove) {
    return Math.min(defaultMultiplier, wrapperComponent.offsetWidth / window.innerWidth);
  }
  return defaultMultiplier;
}
function handleCalculateVelocity(contextInstance, position) {
  var isAllowed = isVelocityCalculationAllowed(contextInstance);
  if (!isAllowed) {
    return;
  }
  var lastMousePosition = contextInstance.lastMousePosition, velocityTime = contextInstance.velocityTime, setup = contextInstance.setup;
  var wrapperComponent = contextInstance.wrapperComponent;
  var equalToMove = setup.velocityAnimation.equalToMove;
  var now = Date.now();
  if (lastMousePosition && velocityTime && wrapperComponent) {
    var sizeMultiplier = getSizeMultiplier(wrapperComponent, equalToMove);
    var distanceX = position.x - lastMousePosition.x;
    var distanceY = position.y - lastMousePosition.y;
    var velocityX = distanceX / sizeMultiplier;
    var velocityY = distanceY / sizeMultiplier;
    var interval = now - velocityTime;
    var speed = distanceX * distanceX + distanceY * distanceY;
    var velocity = Math.sqrt(speed) / interval;
    contextInstance.velocity = { velocityX, velocityY, total: velocity };
  }
  contextInstance.lastMousePosition = position;
  contextInstance.velocityTime = now;
}
function handleVelocityPanning(contextInstance) {
  var velocity = contextInstance.velocity, bounds = contextInstance.bounds, setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
  var isAllowed = isVelocityAllowed(contextInstance);
  if (!isAllowed || !velocity || !bounds || !wrapperComponent) {
    return;
  }
  var velocityX = velocity.velocityX, velocityY = velocity.velocityY, total = velocity.total;
  var maxPositionX = bounds.maxPositionX, minPositionX = bounds.minPositionX, maxPositionY = bounds.maxPositionY, minPositionY = bounds.minPositionY;
  var limitToBounds = setup.limitToBounds, alignmentAnimation = setup.alignmentAnimation;
  var zoomAnimation = setup.zoomAnimation, panning = setup.panning;
  var lockAxisY = panning.lockAxisY, lockAxisX = panning.lockAxisX;
  var animationType = zoomAnimation.animationType;
  var sizeX = alignmentAnimation.sizeX, sizeY = alignmentAnimation.sizeY, velocityAlignmentTime = alignmentAnimation.velocityAlignmentTime;
  var alignAnimationTime = velocityAlignmentTime;
  var moveAnimationTime = getVelocityMoveTime(contextInstance, total);
  var finalAnimationTime = Math.max(moveAnimationTime, alignAnimationTime);
  var paddingValueX = getPaddingValue(contextInstance, sizeX);
  var paddingValueY = getPaddingValue(contextInstance, sizeY);
  var paddingX = paddingValueX * wrapperComponent.offsetWidth / 100;
  var paddingY = paddingValueY * wrapperComponent.offsetHeight / 100;
  var maxTargetX = maxPositionX + paddingX;
  var minTargetX = minPositionX - paddingX;
  var maxTargetY = maxPositionY + paddingY;
  var minTargetY = minPositionY - paddingY;
  var startState = contextInstance.transformState;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  handleSetupAnimation(contextInstance, animationType, finalAnimationTime, function(step) {
    var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    var frameTime = (/* @__PURE__ */ new Date()).getTime() - startTime;
    var animationProgress = frameTime / alignAnimationTime;
    var alignAnimation = animations[alignmentAnimation.animationType];
    var alignStep = 1 - alignAnimation(Math.min(1, animationProgress));
    var customStep = 1 - step;
    var newPositionX = positionX + velocityX * customStep;
    var newPositionY = positionY + velocityY * customStep;
    var currentPositionX = getVelocityPosition(newPositionX, startState.positionX, positionX, lockAxisX, limitToBounds, minPositionX, maxPositionX, minTargetX, maxTargetX, alignStep);
    var currentPositionY = getVelocityPosition(newPositionY, startState.positionY, positionY, lockAxisY, limitToBounds, minPositionY, maxPositionY, minTargetY, maxTargetY, alignStep);
    if (positionX !== newPositionX || positionY !== newPositionY) {
      contextInstance.setTransformState(scale, currentPositionX, currentPositionY);
    }
  });
}
function handlePanningStart(contextInstance, event) {
  var scale = contextInstance.transformState.scale;
  handleCancelAnimation(contextInstance);
  handleCalculateBounds(contextInstance, scale);
  if (window.TouchEvent !== void 0 && event instanceof TouchEvent) {
    handleTouchPanningSetup(contextInstance, event);
  } else {
    handlePanningSetup(contextInstance, event);
  }
}
function handleAlignToBounds(contextInstance, customAnimationTime) {
  var scale = contextInstance.transformState.scale;
  var _a = contextInstance.setup, minScale = _a.minScale, alignmentAnimation = _a.alignmentAnimation;
  var disabled = alignmentAnimation.disabled, sizeX = alignmentAnimation.sizeX, sizeY = alignmentAnimation.sizeY, animationTime = alignmentAnimation.animationTime, animationType = alignmentAnimation.animationType;
  var isDisabled = disabled || scale < minScale || !sizeX && !sizeY;
  if (isDisabled)
    return;
  var targetState = handlePanToBounds(contextInstance);
  if (targetState) {
    animate(contextInstance, targetState, customAnimationTime !== null && customAnimationTime !== void 0 ? customAnimationTime : animationTime, animationType);
  }
}
function handlePanning(contextInstance, clientX, clientY) {
  var startCoords = contextInstance.startCoords, setup = contextInstance.setup;
  var _a = setup.alignmentAnimation, sizeX = _a.sizeX, sizeY = _a.sizeY;
  if (!startCoords)
    return;
  var _b = getPanningClientPosition(contextInstance, clientX, clientY), x = _b.x, y = _b.y;
  var paddingValueX = getPaddingValue(contextInstance, sizeX);
  var paddingValueY = getPaddingValue(contextInstance, sizeY);
  handleCalculateVelocity(contextInstance, { x, y });
  handleNewPosition(contextInstance, x, y, paddingValueX, paddingValueY);
}
function handlePanningEnd(contextInstance) {
  if (contextInstance.isPanning) {
    var velocityDisabled = contextInstance.setup.panning.velocityDisabled;
    var velocity = contextInstance.velocity, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    contextInstance.isPanning = false;
    contextInstance.animate = false;
    contextInstance.animation = null;
    var wrapperRect = wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.getBoundingClientRect();
    var contentRect = contentComponent === null || contentComponent === void 0 ? void 0 : contentComponent.getBoundingClientRect();
    var wrapperWidth = (wrapperRect === null || wrapperRect === void 0 ? void 0 : wrapperRect.width) || 0;
    var wrapperHeight = (wrapperRect === null || wrapperRect === void 0 ? void 0 : wrapperRect.height) || 0;
    var contentWidth = (contentRect === null || contentRect === void 0 ? void 0 : contentRect.width) || 0;
    var contentHeight = (contentRect === null || contentRect === void 0 ? void 0 : contentRect.height) || 0;
    var isZoomed = wrapperWidth < contentWidth || wrapperHeight < contentHeight;
    var shouldAnimate = !velocityDisabled && velocity && (velocity === null || velocity === void 0 ? void 0 : velocity.total) > 0.1 && isZoomed;
    if (shouldAnimate) {
      handleVelocityPanning(contextInstance);
    } else {
      handleAlignToBounds(contextInstance);
    }
  }
}
function handleZoomToPoint(contextInstance, scale, mouseX, mouseY) {
  var _a = contextInstance.setup, minScale = _a.minScale, maxScale = _a.maxScale, limitToBounds = _a.limitToBounds;
  var newScale = checkZoomBounds(roundNumber(scale, 2), minScale, maxScale, 0, false);
  var bounds = handleCalculateBounds(contextInstance, newScale);
  var _b = handleCalculateZoomPositions(contextInstance, mouseX, mouseY, newScale, bounds, limitToBounds), x = _b.x, y = _b.y;
  return { scale: newScale, positionX: x, positionY: y };
}
function handleAlignToScaleBounds(contextInstance, mousePositionX, mousePositionY) {
  var scale = contextInstance.transformState.scale;
  var wrapperComponent = contextInstance.wrapperComponent;
  var _a = contextInstance.setup, minScale = _a.minScale, limitToBounds = _a.limitToBounds, zoomAnimation = _a.zoomAnimation;
  var disabled = zoomAnimation.disabled, animationTime = zoomAnimation.animationTime, animationType = zoomAnimation.animationType;
  var isDisabled = disabled || scale >= minScale;
  if (scale >= 1 || limitToBounds) {
    handleAlignToBounds(contextInstance);
  }
  if (isDisabled || !wrapperComponent || !contextInstance.mounted)
    return;
  var mouseX = mousePositionX || wrapperComponent.offsetWidth / 2;
  var mouseY = mousePositionY || wrapperComponent.offsetHeight / 2;
  var targetState = handleZoomToPoint(contextInstance, minScale, mouseX, mouseY);
  if (targetState) {
    animate(contextInstance, targetState, animationTime, animationType);
  }
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message2) {
  var e = new Error(message2);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var initialState = {
  scale: 1,
  positionX: 0,
  positionY: 0
};
var initialSetup = {
  disabled: false,
  minPositionX: null,
  maxPositionX: null,
  minPositionY: null,
  maxPositionY: null,
  minScale: 1,
  maxScale: 8,
  limitToBounds: true,
  centerZoomedOut: false,
  centerOnInit: false,
  disablePadding: false,
  smooth: true,
  wheel: {
    step: 0.2,
    disabled: false,
    smoothStep: 1e-3,
    wheelDisabled: false,
    touchPadDisabled: false,
    activationKeys: [],
    excluded: []
  },
  panning: {
    disabled: false,
    velocityDisabled: false,
    lockAxisX: false,
    lockAxisY: false,
    allowLeftClickPan: true,
    allowMiddleClickPan: true,
    allowRightClickPan: true,
    wheelPanning: false,
    activationKeys: [],
    excluded: []
  },
  pinch: {
    step: 5,
    disabled: false,
    excluded: []
  },
  doubleClick: {
    disabled: false,
    step: 0.7,
    mode: "zoomIn",
    animationType: "easeOut",
    animationTime: 200,
    excluded: []
  },
  zoomAnimation: {
    disabled: false,
    size: 0.4,
    animationTime: 200,
    animationType: "easeOut"
  },
  alignmentAnimation: {
    disabled: false,
    sizeX: 100,
    sizeY: 100,
    animationTime: 200,
    velocityAlignmentTime: 400,
    animationType: "easeOut"
  },
  velocityAnimation: {
    disabled: false,
    sensitivity: 1,
    animationTime: 400,
    animationType: "easeOut",
    equalToMove: true
  }
};
var baseClasses = {
  wrapperClass: "react-transform-wrapper",
  contentClass: "react-transform-component"
};
var createState = function(props) {
  var _a, _b, _c, _d;
  return {
    previousScale: (_a = props.initialScale) !== null && _a !== void 0 ? _a : initialState.scale,
    scale: (_b = props.initialScale) !== null && _b !== void 0 ? _b : initialState.scale,
    positionX: (_c = props.initialPositionX) !== null && _c !== void 0 ? _c : initialState.positionX,
    positionY: (_d = props.initialPositionY) !== null && _d !== void 0 ? _d : initialState.positionY
  };
};
var createSetup = function(props) {
  var newSetup = __assign({}, initialSetup);
  Object.keys(props).forEach(function(key) {
    var validValue = typeof props[key] !== "undefined";
    var validParameter = typeof initialSetup[key] !== "undefined";
    if (validParameter && validValue) {
      var dataType = Object.prototype.toString.call(initialSetup[key]);
      var isObject = dataType === "[object Object]";
      var isArray = dataType === "[object Array]";
      if (isObject) {
        newSetup[key] = __assign(__assign({}, initialSetup[key]), props[key]);
      } else if (isArray) {
        newSetup[key] = __spreadArray(__spreadArray([], initialSetup[key], true), props[key]);
      } else {
        newSetup[key] = props[key];
      }
    }
  });
  return newSetup;
};
var handleCalculateButtonZoom = function(contextInstance, delta, step) {
  var scale = contextInstance.transformState.scale;
  var wrapperComponent = contextInstance.wrapperComponent, setup = contextInstance.setup;
  var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation, smooth = setup.smooth;
  var size = zoomAnimation.size;
  if (!wrapperComponent) {
    throw new Error("Wrapper is not mounted");
  }
  var targetScale = smooth ? scale * Math.exp(delta * step) : scale + delta * step;
  var newScale = checkZoomBounds(roundNumber(targetScale, 3), minScale, maxScale, size, false);
  return newScale;
};
function handleZoomToViewCenter(contextInstance, delta, step, animationTime, animationType) {
  var wrapperComponent = contextInstance.wrapperComponent;
  var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  if (!wrapperComponent)
    return console.error("No WrapperComponent found");
  var wrapperWidth = wrapperComponent.offsetWidth;
  var wrapperHeight = wrapperComponent.offsetHeight;
  var mouseX = (wrapperWidth / 2 - positionX) / scale;
  var mouseY = (wrapperHeight / 2 - positionY) / scale;
  var newScale = handleCalculateButtonZoom(contextInstance, delta, step);
  var targetState = handleZoomToPoint(contextInstance, newScale, mouseX, mouseY);
  if (!targetState) {
    return console.error("Error during zoom event. New transformation state was not calculated.");
  }
  animate(contextInstance, targetState, animationTime, animationType);
}
function resetTransformations(contextInstance, animationTime, animationType, onResetTransformation) {
  var setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
  var limitToBounds = setup.limitToBounds;
  var initialTransformation = createState(contextInstance.props);
  var _a = contextInstance.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  if (!wrapperComponent)
    return;
  var newBounds = calculateBounds(contextInstance, initialTransformation.scale);
  var boundedPositions = getMouseBoundedPosition(initialTransformation.positionX, initialTransformation.positionY, newBounds, limitToBounds, 0, 0, wrapperComponent);
  var newState = {
    scale: initialTransformation.scale,
    positionX: boundedPositions.x,
    positionY: boundedPositions.y
  };
  if (scale === initialTransformation.scale && positionX === initialTransformation.positionX && positionY === initialTransformation.positionY) {
    return;
  }
  onResetTransformation === null || onResetTransformation === void 0 ? void 0 : onResetTransformation();
  animate(contextInstance, newState, animationTime, animationType);
}
function getOffset(element, wrapper, content, state) {
  var offset = element.getBoundingClientRect();
  var wrapperOffset = wrapper.getBoundingClientRect();
  var contentOffset = content.getBoundingClientRect();
  var xOff = wrapperOffset.x * state.scale;
  var yOff = wrapperOffset.y * state.scale;
  return {
    x: (offset.x - contentOffset.x + xOff) / state.scale,
    y: (offset.y - contentOffset.y + yOff) / state.scale
  };
}
function calculateZoomToNode(contextInstance, node, customZoom) {
  var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent, transformState = contextInstance.transformState;
  var _a = contextInstance.setup, limitToBounds = _a.limitToBounds, minScale = _a.minScale, maxScale = _a.maxScale;
  if (!wrapperComponent || !contentComponent)
    return transformState;
  var wrapperRect = wrapperComponent.getBoundingClientRect();
  var nodeRect = node.getBoundingClientRect();
  var nodeOffset = getOffset(node, wrapperComponent, contentComponent, transformState);
  var nodeLeft = nodeOffset.x;
  var nodeTop = nodeOffset.y;
  var nodeWidth = nodeRect.width / transformState.scale;
  var nodeHeight = nodeRect.height / transformState.scale;
  var scaleX = wrapperComponent.offsetWidth / nodeWidth;
  var scaleY = wrapperComponent.offsetHeight / nodeHeight;
  var newScale = checkZoomBounds(customZoom || Math.min(scaleX, scaleY), minScale, maxScale, 0, false);
  var offsetX = (wrapperRect.width - nodeWidth * newScale) / 2;
  var offsetY = (wrapperRect.height - nodeHeight * newScale) / 2;
  var newPositionX = (wrapperRect.left - nodeLeft) * newScale + offsetX;
  var newPositionY = (wrapperRect.top - nodeTop) * newScale + offsetY;
  var bounds = calculateBounds(contextInstance, newScale);
  var _b = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, 0, 0, wrapperComponent), x = _b.x, y = _b.y;
  return { positionX: x, positionY: y, scale: newScale };
}
var zoomIn = function(contextInstance) {
  return function(step, animationTime, animationType) {
    if (step === void 0) {
      step = 0.5;
    }
    if (animationTime === void 0) {
      animationTime = 300;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    handleZoomToViewCenter(contextInstance, 1, step, animationTime, animationType);
  };
};
var zoomOut = function(contextInstance) {
  return function(step, animationTime, animationType) {
    if (step === void 0) {
      step = 0.5;
    }
    if (animationTime === void 0) {
      animationTime = 300;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    handleZoomToViewCenter(contextInstance, -1, step, animationTime, animationType);
  };
};
var setTransform = function(contextInstance) {
  return function(newPositionX, newPositionY, newScale, animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 300;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    var _a = contextInstance.transformState, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
    var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    var disabled = contextInstance.setup.disabled;
    if (disabled || !wrapperComponent || !contentComponent)
      return;
    var targetState = {
      positionX: Number.isNaN(newPositionX) ? positionX : newPositionX,
      positionY: Number.isNaN(newPositionY) ? positionY : newPositionY,
      scale: Number.isNaN(newScale) ? scale : newScale
    };
    animate(contextInstance, targetState, animationTime, animationType);
  };
};
var resetTransform = function(contextInstance) {
  return function(animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 200;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    resetTransformations(contextInstance, animationTime, animationType);
  };
};
var centerView = function(contextInstance) {
  return function(scale, animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 200;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    var transformState = contextInstance.transformState, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    if (wrapperComponent && contentComponent) {
      var targetState = getCenterPosition(scale || transformState.scale, wrapperComponent, contentComponent);
      animate(contextInstance, targetState, animationTime, animationType);
    }
  };
};
var zoomToElement = function(contextInstance) {
  return function(node, scale, animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 600;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    handleCancelAnimation(contextInstance);
    var wrapperComponent = contextInstance.wrapperComponent;
    var target = typeof node === "string" ? document.getElementById(node) : node;
    if (wrapperComponent && target && wrapperComponent.contains(target)) {
      var targetState = calculateZoomToNode(contextInstance, target, scale);
      animate(contextInstance, targetState, animationTime, animationType);
    }
  };
};
var getControls = function(contextInstance) {
  return {
    instance: contextInstance,
    zoomIn: zoomIn(contextInstance),
    zoomOut: zoomOut(contextInstance),
    setTransform: setTransform(contextInstance),
    resetTransform: resetTransform(contextInstance),
    centerView: centerView(contextInstance),
    zoomToElement: zoomToElement(contextInstance)
  };
};
var getState = function(contextInstance) {
  return {
    instance: contextInstance,
    state: contextInstance.transformState
  };
};
var getContext = function(contextInstance) {
  var ref = {};
  Object.assign(ref, getState(contextInstance));
  Object.assign(ref, getControls(contextInstance));
  return ref;
};
var passiveSupported = false;
function makePassiveEventOption() {
  try {
    var options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    return options;
  } catch (err) {
    passiveSupported = false;
    return passiveSupported;
  }
}
var matchPrefix = ".".concat(baseClasses.wrapperClass);
var isExcludedNode = function(node, excluded) {
  return excluded.some(function(exclude) {
    return node.matches("".concat(matchPrefix, " ").concat(exclude, ", ").concat(matchPrefix, " .").concat(exclude, ", ").concat(matchPrefix, " ").concat(exclude, " *, ").concat(matchPrefix, " .").concat(exclude, " *"));
  });
};
var cancelTimeout = function(timeout) {
  if (timeout) {
    clearTimeout(timeout);
  }
};
var getTransformStyles = function(x, y, scale) {
  return "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(scale, ")");
};
var getCenterPosition = function(scale, wrapperComponent, contentComponent) {
  var contentWidth = contentComponent.offsetWidth * scale;
  var contentHeight = contentComponent.offsetHeight * scale;
  var centerPositionX = (wrapperComponent.offsetWidth - contentWidth) / 2;
  var centerPositionY = (wrapperComponent.offsetHeight - contentHeight) / 2;
  return {
    scale,
    positionX: centerPositionX,
    positionY: centerPositionY
  };
};
function mergeRefs(refs) {
  return function(value) {
    refs.forEach(function(ref) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isWheelAllowed = function(contextInstance, event) {
  var _a = contextInstance.setup.wheel, disabled = _a.disabled, wheelDisabled = _a.wheelDisabled, touchPadDisabled = _a.touchPadDisabled, excluded = _a.excluded;
  var isInitialized = contextInstance.isInitialized, isPanning = contextInstance.isPanning;
  var target = event.target;
  var isAllowed = isInitialized && !isPanning && !disabled && target;
  if (!isAllowed)
    return false;
  if (wheelDisabled && !event.ctrlKey)
    return false;
  if (touchPadDisabled && event.ctrlKey)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  return true;
};
var getDeltaY = function(event) {
  if (event) {
    return event.deltaY < 0 ? 1 : -1;
  }
  return 0;
};
function getDelta(event, customDelta) {
  var deltaY = getDeltaY(event);
  var delta = checkIsNumber(customDelta, deltaY);
  return delta;
}
function getMousePosition(event, contentComponent, scale) {
  var contentRect = contentComponent.getBoundingClientRect();
  var mouseX = 0;
  var mouseY = 0;
  if ("clientX" in event) {
    mouseX = (event.clientX - contentRect.left) / scale;
    mouseY = (event.clientY - contentRect.top) / scale;
  } else {
    var touch = event.touches[0];
    mouseX = (touch.clientX - contentRect.left) / scale;
    mouseY = (touch.clientY - contentRect.top) / scale;
  }
  if (Number.isNaN(mouseX) || Number.isNaN(mouseY))
    console.error("No mouse or touch offset found");
  return {
    x: mouseX,
    y: mouseY
  };
}
var handleCalculateWheelZoom = function(contextInstance, delta, step, disable, getTarget) {
  var scale = contextInstance.transformState.scale;
  var wrapperComponent = contextInstance.wrapperComponent, setup = contextInstance.setup;
  var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation, disablePadding = setup.disablePadding;
  var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
  if (!wrapperComponent) {
    throw new Error("Wrapper is not mounted");
  }
  var targetScale = scale + delta * step;
  var paddingEnabled = disable ? false : !disabled;
  var newScale = checkZoomBounds(roundNumber(targetScale, 3), minScale, maxScale, size, paddingEnabled && !disablePadding);
  return newScale;
};
var handleWheelZoomStop = function(contextInstance, event) {
  var previousWheelEvent = contextInstance.previousWheelEvent;
  var scale = contextInstance.transformState.scale;
  var _a = contextInstance.setup, maxScale = _a.maxScale, minScale = _a.minScale;
  if (!previousWheelEvent)
    return false;
  if (scale < maxScale || scale > minScale)
    return true;
  if (Math.sign(previousWheelEvent.deltaY) !== Math.sign(event.deltaY))
    return true;
  if (previousWheelEvent.deltaY > 0 && previousWheelEvent.deltaY < event.deltaY)
    return true;
  if (previousWheelEvent.deltaY < 0 && previousWheelEvent.deltaY > event.deltaY)
    return true;
  if (Math.sign(previousWheelEvent.deltaY) !== Math.sign(event.deltaY))
    return true;
  return false;
};
var isPinchStartAllowed = function(contextInstance, event) {
  var _a = contextInstance.setup.pinch, disabled = _a.disabled, excluded = _a.excluded;
  var isInitialized = contextInstance.isInitialized;
  var target = event.target;
  var isAllowed = isInitialized && !disabled && target;
  if (!isAllowed)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  return true;
};
var isPinchAllowed = function(contextInstance) {
  var disabled = contextInstance.setup.pinch.disabled;
  var isInitialized = contextInstance.isInitialized, pinchStartDistance = contextInstance.pinchStartDistance;
  var isAllowed = isInitialized && !disabled && pinchStartDistance;
  if (!isAllowed)
    return false;
  return true;
};
var calculateTouchMidPoint = function(event, scale, contentComponent) {
  var contentRect = contentComponent.getBoundingClientRect();
  var touches = event.touches;
  var firstPointX = roundNumber(touches[0].clientX - contentRect.left, 5);
  var firstPointY = roundNumber(touches[0].clientY - contentRect.top, 5);
  var secondPointX = roundNumber(touches[1].clientX - contentRect.left, 5);
  var secondPointY = roundNumber(touches[1].clientY - contentRect.top, 5);
  return {
    x: (firstPointX + secondPointX) / 2 / scale,
    y: (firstPointY + secondPointY) / 2 / scale
  };
};
var getTouchDistance = function(event) {
  return Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));
};
var calculatePinchZoom = function(contextInstance, currentDistance) {
  var pinchStartScale = contextInstance.pinchStartScale, pinchStartDistance = contextInstance.pinchStartDistance, setup = contextInstance.setup;
  var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation, disablePadding = setup.disablePadding;
  var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
  if (!pinchStartScale || pinchStartDistance === null || !currentDistance) {
    throw new Error("Pinch touches distance was not provided");
  }
  if (currentDistance < 0) {
    return contextInstance.transformState.scale;
  }
  var touchProportion = currentDistance / pinchStartDistance;
  var scaleDifference = touchProportion * pinchStartScale;
  return checkZoomBounds(roundNumber(scaleDifference, 2), minScale, maxScale, size, !disabled && !disablePadding);
};
var wheelStopEventTime = 160;
var wheelAnimationTime = 100;
var handleWheelStart = function(contextInstance, event) {
  var _a = contextInstance.props, onWheelStart = _a.onWheelStart, onZoomStart = _a.onZoomStart;
  if (!contextInstance.wheelStopEventTimer) {
    handleCancelAnimation(contextInstance);
    handleCallback(getContext(contextInstance), event, onWheelStart);
    handleCallback(getContext(contextInstance), event, onZoomStart);
  }
};
var handleWheelZoom = function(contextInstance, event) {
  var _a = contextInstance.props, onWheel = _a.onWheel, onZoom = _a.onZoom;
  var contentComponent = contextInstance.contentComponent, setup = contextInstance.setup, transformState = contextInstance.transformState;
  var scale = transformState.scale;
  var limitToBounds = setup.limitToBounds, centerZoomedOut = setup.centerZoomedOut, zoomAnimation = setup.zoomAnimation, wheel = setup.wheel, disablePadding = setup.disablePadding, smooth = setup.smooth;
  var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
  var step = wheel.step, smoothStep = wheel.smoothStep;
  if (!contentComponent) {
    throw new Error("Component not mounted");
  }
  event.preventDefault();
  event.stopPropagation();
  var delta = getDelta(event, null);
  var zoomStep = smooth ? smoothStep * Math.abs(event.deltaY) : step;
  var newScale = handleCalculateWheelZoom(contextInstance, delta, zoomStep, !event.ctrlKey);
  if (scale === newScale)
    return;
  var bounds = handleCalculateBounds(contextInstance, newScale);
  var mousePosition = getMousePosition(event, contentComponent, scale);
  var isPaddingDisabled = disabled || size === 0 || centerZoomedOut || disablePadding;
  var isLimitedToBounds = limitToBounds && isPaddingDisabled;
  var _b = handleCalculateZoomPositions(contextInstance, mousePosition.x, mousePosition.y, newScale, bounds, isLimitedToBounds), x = _b.x, y = _b.y;
  contextInstance.previousWheelEvent = event;
  contextInstance.setTransformState(newScale, x, y);
  handleCallback(getContext(contextInstance), event, onWheel);
  handleCallback(getContext(contextInstance), event, onZoom);
};
var handleWheelStop = function(contextInstance, event) {
  var _a = contextInstance.props, onWheelStop = _a.onWheelStop, onZoomStop = _a.onZoomStop;
  cancelTimeout(contextInstance.wheelAnimationTimer);
  contextInstance.wheelAnimationTimer = setTimeout(function() {
    if (!contextInstance.mounted)
      return;
    handleAlignToScaleBounds(contextInstance, event.x, event.y);
    contextInstance.wheelAnimationTimer = null;
  }, wheelAnimationTime);
  var hasStoppedZooming = handleWheelZoomStop(contextInstance, event);
  if (hasStoppedZooming) {
    cancelTimeout(contextInstance.wheelStopEventTimer);
    contextInstance.wheelStopEventTimer = setTimeout(function() {
      if (!contextInstance.mounted)
        return;
      contextInstance.wheelStopEventTimer = null;
      handleCallback(getContext(contextInstance), event, onWheelStop);
      handleCallback(getContext(contextInstance), event, onZoomStop);
    }, wheelStopEventTime);
  }
};
var getTouchCenter = function(event) {
  var totalX = 0;
  var totalY = 0;
  for (var i = 0; i < 2; i += 1) {
    totalX += event.touches[i].clientX;
    totalY += event.touches[i].clientY;
  }
  var x = totalX / 2;
  var y = totalY / 2;
  return { x, y };
};
var handlePinchStart = function(contextInstance, event) {
  var distance = getTouchDistance(event);
  contextInstance.pinchStartDistance = distance;
  contextInstance.lastDistance = distance;
  contextInstance.pinchStartScale = contextInstance.transformState.scale;
  contextInstance.isPanning = false;
  var center = getTouchCenter(event);
  contextInstance.pinchLastCenterX = center.x;
  contextInstance.pinchLastCenterY = center.y;
  handleCancelAnimation(contextInstance);
};
var handlePinchZoom = function(contextInstance, event) {
  var contentComponent = contextInstance.contentComponent, pinchStartDistance = contextInstance.pinchStartDistance, wrapperComponent = contextInstance.wrapperComponent;
  var scale = contextInstance.transformState.scale;
  var _a = contextInstance.setup, limitToBounds = _a.limitToBounds, centerZoomedOut = _a.centerZoomedOut, zoomAnimation = _a.zoomAnimation, alignmentAnimation = _a.alignmentAnimation;
  var disabled = zoomAnimation.disabled, size = zoomAnimation.size;
  if (pinchStartDistance === null || !contentComponent)
    return;
  var midPoint = calculateTouchMidPoint(event, scale, contentComponent);
  if (!Number.isFinite(midPoint.x) || !Number.isFinite(midPoint.y))
    return;
  var currentDistance = getTouchDistance(event);
  var newScale = calculatePinchZoom(contextInstance, currentDistance);
  var center = getTouchCenter(event);
  var panX = center.x - (contextInstance.pinchLastCenterX || 0);
  var panY = center.y - (contextInstance.pinchLastCenterY || 0);
  if (newScale === scale && panX === 0 && panY === 0)
    return;
  contextInstance.pinchLastCenterX = center.x;
  contextInstance.pinchLastCenterY = center.y;
  var bounds = handleCalculateBounds(contextInstance, newScale);
  var isPaddingDisabled = disabled || size === 0 || centerZoomedOut;
  var isLimitedToBounds = limitToBounds && isPaddingDisabled;
  var _b = handleCalculateZoomPositions(contextInstance, midPoint.x, midPoint.y, newScale, bounds, isLimitedToBounds), x = _b.x, y = _b.y;
  contextInstance.pinchMidpoint = midPoint;
  contextInstance.lastDistance = currentDistance;
  var sizeX = alignmentAnimation.sizeX, sizeY = alignmentAnimation.sizeY;
  var paddingValueX = getPaddingValue(contextInstance, sizeX);
  var paddingValueY = getPaddingValue(contextInstance, sizeY);
  var newPositionX = x + panX;
  var newPositionY = y + panY;
  var _c = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent), finalX = _c.x, finalY = _c.y;
  contextInstance.setTransformState(newScale, finalX, finalY);
};
var handlePinchStop = function(contextInstance) {
  var pinchMidpoint = contextInstance.pinchMidpoint;
  contextInstance.velocity = null;
  contextInstance.lastDistance = null;
  contextInstance.pinchMidpoint = null;
  contextInstance.pinchStartScale = null;
  contextInstance.pinchStartDistance = null;
  handleAlignToScaleBounds(contextInstance, pinchMidpoint === null || pinchMidpoint === void 0 ? void 0 : pinchMidpoint.x, pinchMidpoint === null || pinchMidpoint === void 0 ? void 0 : pinchMidpoint.y);
};
var handleDoubleClickStop = function(contextInstance, event) {
  var onZoomStop = contextInstance.props.onZoomStop;
  var animationTime = contextInstance.setup.doubleClick.animationTime;
  cancelTimeout(contextInstance.doubleClickStopEventTimer);
  contextInstance.doubleClickStopEventTimer = setTimeout(function() {
    contextInstance.doubleClickStopEventTimer = null;
    handleCallback(getContext(contextInstance), event, onZoomStop);
  }, animationTime);
};
var handleDoubleClickResetMode = function(contextInstance, event) {
  var _a = contextInstance.props, onZoomStart = _a.onZoomStart, onZoom = _a.onZoom;
  var _b = contextInstance.setup.doubleClick, animationTime = _b.animationTime, animationType = _b.animationType;
  handleCallback(getContext(contextInstance), event, onZoomStart);
  resetTransformations(contextInstance, animationTime, animationType, function() {
    return handleCallback(getContext(contextInstance), event, onZoom);
  });
  handleDoubleClickStop(contextInstance, event);
};
function getDoubleClickScale(mode, scale) {
  if (mode === "toggle") {
    return scale === 1 ? 1 : -1;
  }
  return mode === "zoomOut" ? -1 : 1;
}
function handleDoubleClick(contextInstance, event) {
  var setup = contextInstance.setup, doubleClickStopEventTimer = contextInstance.doubleClickStopEventTimer, transformState = contextInstance.transformState, contentComponent = contextInstance.contentComponent;
  var scale = transformState.scale;
  var _a = contextInstance.props, onZoomStart = _a.onZoomStart, onZoom = _a.onZoom;
  var _b = setup.doubleClick, disabled = _b.disabled, mode = _b.mode, step = _b.step, animationTime = _b.animationTime, animationType = _b.animationType;
  if (disabled)
    return;
  if (doubleClickStopEventTimer)
    return;
  if (mode === "reset") {
    return handleDoubleClickResetMode(contextInstance, event);
  }
  if (!contentComponent)
    return console.error("No ContentComponent found");
  var delta = getDoubleClickScale(mode, contextInstance.transformState.scale);
  var newScale = handleCalculateButtonZoom(contextInstance, delta, step);
  if (scale === newScale)
    return;
  handleCallback(getContext(contextInstance), event, onZoomStart);
  var mousePosition = getMousePosition(event, contentComponent, scale);
  var targetState = handleZoomToPoint(contextInstance, newScale, mousePosition.x, mousePosition.y);
  if (!targetState) {
    return console.error("Error during zoom event. New transformation state was not calculated.");
  }
  handleCallback(getContext(contextInstance), event, onZoom);
  animate(contextInstance, targetState, animationTime, animationType);
  handleDoubleClickStop(contextInstance, event);
}
var isDoubleClickAllowed = function(contextInstance, event) {
  var isInitialized = contextInstance.isInitialized, setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
  var _a = setup.doubleClick, disabled = _a.disabled, excluded = _a.excluded;
  var target = event.target;
  var isWrapperChild = wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(target);
  var isAllowed = isInitialized && target && isWrapperChild && !disabled;
  if (!isAllowed)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  return true;
};
var ZoomPanPinch = (
  /** @class */
  /* @__PURE__ */ function() {
    function ZoomPanPinch2(props) {
      var _this = this;
      this.mounted = true;
      this.pinchLastCenterX = null;
      this.pinchLastCenterY = null;
      this.onChangeCallbacks = /* @__PURE__ */ new Set();
      this.onInitCallbacks = /* @__PURE__ */ new Set();
      this.wrapperComponent = null;
      this.contentComponent = null;
      this.isInitialized = false;
      this.bounds = null;
      this.previousWheelEvent = null;
      this.wheelStopEventTimer = null;
      this.wheelAnimationTimer = null;
      this.isPanning = false;
      this.isWheelPanning = false;
      this.startCoords = null;
      this.lastTouch = null;
      this.distance = null;
      this.lastDistance = null;
      this.pinchStartDistance = null;
      this.pinchStartScale = null;
      this.pinchMidpoint = null;
      this.doubleClickStopEventTimer = null;
      this.velocity = null;
      this.velocityTime = null;
      this.lastMousePosition = null;
      this.animate = false;
      this.animation = null;
      this.maxBounds = null;
      this.pressedKeys = {};
      this.mount = function() {
        _this.initializeWindowEvents();
      };
      this.unmount = function() {
        _this.cleanupWindowEvents();
      };
      this.update = function(newProps) {
        _this.props = newProps;
        handleCalculateBounds(_this, _this.transformState.scale);
        _this.setup = createSetup(newProps);
      };
      this.initializeWindowEvents = function() {
        var _a, _b;
        var passive = makePassiveEventOption();
        var currentDocument = (_a = _this.wrapperComponent) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        var currentWindow = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.defaultView;
        (_b = _this.wrapperComponent) === null || _b === void 0 ? void 0 : _b.addEventListener("wheel", _this.onWheelPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("mousedown", _this.onPanningStart, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("mousemove", _this.onPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("mouseup", _this.onPanningStop, passive);
        currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.addEventListener("mouseleave", _this.clearPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("keyup", _this.setKeyUnPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("keydown", _this.setKeyPressed, passive);
      };
      this.cleanupWindowEvents = function() {
        var _a, _b;
        var passive = makePassiveEventOption();
        var currentDocument = (_a = _this.wrapperComponent) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        var currentWindow = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.defaultView;
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("mousedown", _this.onPanningStart, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("mousemove", _this.onPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("mouseup", _this.onPanningStop, passive);
        currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.removeEventListener("mouseleave", _this.clearPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("keyup", _this.setKeyUnPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("keydown", _this.setKeyPressed, passive);
        document.removeEventListener("mouseleave", _this.clearPanning, passive);
        handleCancelAnimation(_this);
        (_b = _this.observer) === null || _b === void 0 ? void 0 : _b.disconnect();
      };
      this.handleInitializeWrapperEvents = function(wrapper) {
        var passive = makePassiveEventOption();
        wrapper.addEventListener("wheel", _this.onWheelZoom, passive);
        wrapper.addEventListener("dblclick", _this.onDoubleClick, passive);
        wrapper.addEventListener("touchstart", _this.onTouchPanningStart, passive);
        wrapper.addEventListener("touchmove", _this.onTouchPanning, passive);
        wrapper.addEventListener("touchend", _this.onTouchPanningStop, passive);
      };
      this.handleInitialize = function(wrapper, contentComponent) {
        var isCentered = false;
        var centerOnInit = _this.setup.centerOnInit;
        var hasTarget = function(entries, target) {
          for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            if (entry.target === target) {
              return true;
            }
          }
          return false;
        };
        _this.applyTransformation();
        _this.onInitCallbacks.forEach(function(callback) {
          callback(getContext(_this));
        });
        _this.observer = new ResizeObserver(function(entries) {
          if (hasTarget(entries, wrapper) || hasTarget(entries, contentComponent)) {
            if (centerOnInit && !isCentered) {
              var currentWidth = contentComponent.offsetWidth;
              var currentHeight = contentComponent.offsetHeight;
              if (currentWidth > 0 || currentHeight > 0) {
                isCentered = true;
                _this.setCenter();
              }
            } else {
              handleCancelAnimation(_this);
              handleCalculateBounds(_this, _this.transformState.scale);
              handleAlignToBounds(_this, 0);
            }
          }
        });
        _this.observer.observe(wrapper);
        _this.observer.observe(contentComponent);
      };
      this.onWheelZoom = function(event) {
        var disabled = _this.setup.disabled;
        if (disabled)
          return;
        var isAllowed = isWheelAllowed(_this, event);
        if (!isAllowed)
          return;
        var keysPressed = _this.isPressingKeys(_this.setup.wheel.activationKeys);
        if (!keysPressed)
          return;
        handleWheelStart(_this, event);
        handleWheelZoom(_this, event);
        handleWheelStop(_this, event);
      };
      this.onWheelPanning = function(event) {
        var _a = _this.setup, disabled = _a.disabled, wheel = _a.wheel, panning = _a.panning;
        if (!_this.wrapperComponent || !_this.contentComponent || disabled || !wheel.wheelDisabled || panning.disabled || !panning.wheelPanning || event.ctrlKey) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        var _b = _this.transformState, positionX = _b.positionX, positionY = _b.positionY;
        var mouseX = positionX - event.deltaX;
        var mouseY = positionY - event.deltaY;
        var newPositionX = panning.lockAxisX ? positionX : mouseX;
        var newPositionY = panning.lockAxisY ? positionY : mouseY;
        var _c = _this.setup.alignmentAnimation, sizeX = _c.sizeX, sizeY = _c.sizeY;
        var paddingValueX = getPaddingValue(_this, sizeX);
        var paddingValueY = getPaddingValue(_this, sizeY);
        if (newPositionX === positionX && newPositionY === positionY)
          return;
        handleNewPosition(_this, newPositionX, newPositionY, paddingValueX, paddingValueY);
      };
      this.onPanningStart = function(event) {
        var disabled = _this.setup.disabled;
        var onPanningStart = _this.props.onPanningStart;
        if (disabled)
          return;
        var isAllowed = isPanningStartAllowed(_this, event);
        if (!isAllowed)
          return;
        var keysPressed = _this.isPressingKeys(_this.setup.panning.activationKeys);
        if (!keysPressed)
          return;
        if (event.button === 0 && !_this.setup.panning.allowLeftClickPan)
          return;
        if (event.button === 1 && !_this.setup.panning.allowMiddleClickPan)
          return;
        if (event.button === 2 && !_this.setup.panning.allowRightClickPan)
          return;
        event.preventDefault();
        event.stopPropagation();
        handleCancelAnimation(_this);
        handlePanningStart(_this, event);
        handleCallback(getContext(_this), event, onPanningStart);
      };
      this.onPanning = function(event) {
        var disabled = _this.setup.disabled;
        var onPanning = _this.props.onPanning;
        if (disabled)
          return;
        var isAllowed = isPanningAllowed(_this);
        if (!isAllowed)
          return;
        var keysPressed = _this.isPressingKeys(_this.setup.panning.activationKeys);
        if (!keysPressed)
          return;
        event.preventDefault();
        event.stopPropagation();
        handlePanning(_this, event.clientX, event.clientY);
        handleCallback(getContext(_this), event, onPanning);
      };
      this.onPanningStop = function(event) {
        var onPanningStop = _this.props.onPanningStop;
        if (_this.isPanning) {
          handlePanningEnd(_this);
          handleCallback(getContext(_this), event, onPanningStop);
        }
      };
      this.onPinchStart = function(event) {
        var disabled = _this.setup.disabled;
        var _a = _this.props, onPinchingStart = _a.onPinchingStart, onZoomStart = _a.onZoomStart;
        if (disabled)
          return;
        var isAllowed = isPinchStartAllowed(_this, event);
        if (!isAllowed)
          return;
        handlePinchStart(_this, event);
        handleCancelAnimation(_this);
        handleCallback(getContext(_this), event, onPinchingStart);
        handleCallback(getContext(_this), event, onZoomStart);
      };
      this.onPinch = function(event) {
        var disabled = _this.setup.disabled;
        var _a = _this.props, onPinching = _a.onPinching, onZoom = _a.onZoom;
        if (disabled)
          return;
        var isAllowed = isPinchAllowed(_this);
        if (!isAllowed)
          return;
        event.preventDefault();
        event.stopPropagation();
        handlePinchZoom(_this, event);
        handleCallback(getContext(_this), event, onPinching);
        handleCallback(getContext(_this), event, onZoom);
      };
      this.onPinchStop = function(event) {
        var _a = _this.props, onPinchingStop = _a.onPinchingStop, onZoomStop = _a.onZoomStop;
        if (_this.pinchStartScale) {
          handlePinchStop(_this);
          handleCallback(getContext(_this), event, onPinchingStop);
          handleCallback(getContext(_this), event, onZoomStop);
        }
      };
      this.onTouchPanningStart = function(event) {
        var disabled = _this.setup.disabled;
        var onPanningStart = _this.props.onPanningStart;
        if (disabled)
          return;
        var isAllowed = isPanningStartAllowed(_this, event);
        if (!isAllowed)
          return;
        var isDoubleTap = _this.lastTouch && +/* @__PURE__ */ new Date() - _this.lastTouch < 200 && event.touches.length === 1;
        if (!isDoubleTap) {
          _this.lastTouch = +/* @__PURE__ */ new Date();
          handleCancelAnimation(_this);
          var touches = event.touches;
          var isPanningAction = touches.length === 1;
          var isPinchAction = touches.length === 2;
          if (isPanningAction) {
            handleCancelAnimation(_this);
            handlePanningStart(_this, event);
            handleCallback(getContext(_this), event, onPanningStart);
          }
          if (isPinchAction) {
            _this.onPinchStart(event);
          }
        }
      };
      this.onTouchPanning = function(event) {
        var disabled = _this.setup.disabled;
        var onPanning = _this.props.onPanning;
        if (_this.isPanning && event.touches.length === 1) {
          if (disabled)
            return;
          var isAllowed = isPanningAllowed(_this);
          if (!isAllowed)
            return;
          event.preventDefault();
          event.stopPropagation();
          var touch = event.touches[0];
          handlePanning(_this, touch.clientX, touch.clientY);
          handleCallback(getContext(_this), event, onPanning);
        } else if (event.touches.length > 1) {
          _this.onPinch(event);
        }
      };
      this.onTouchPanningStop = function(event) {
        _this.onPanningStop(event);
        _this.onPinchStop(event);
      };
      this.onDoubleClick = function(event) {
        var disabled = _this.setup.disabled;
        if (disabled)
          return;
        var isAllowed = isDoubleClickAllowed(_this, event);
        if (!isAllowed)
          return;
        handleDoubleClick(_this, event);
      };
      this.clearPanning = function(event) {
        if (_this.isPanning) {
          _this.onPanningStop(event);
        }
      };
      this.setKeyPressed = function(e) {
        _this.pressedKeys[e.key] = true;
      };
      this.setKeyUnPressed = function(e) {
        _this.pressedKeys[e.key] = false;
      };
      this.isPressingKeys = function(keys) {
        if (!keys.length) {
          return true;
        }
        return Boolean(keys.find(function(key) {
          return _this.pressedKeys[key];
        }));
      };
      this.setTransformState = function(scale, positionX, positionY) {
        var onTransformed = _this.props.onTransformed;
        if (!Number.isNaN(scale) && !Number.isNaN(positionX) && !Number.isNaN(positionY)) {
          if (scale !== _this.transformState.scale) {
            _this.transformState.previousScale = _this.transformState.scale;
            _this.transformState.scale = scale;
          }
          _this.transformState.positionX = positionX;
          _this.transformState.positionY = positionY;
          _this.applyTransformation();
          var ctx_1 = getContext(_this);
          _this.onChangeCallbacks.forEach(function(callback) {
            return callback(ctx_1);
          });
          handleCallback(ctx_1, { scale, positionX, positionY }, onTransformed);
        } else {
          console.error("Detected NaN set state values");
        }
      };
      this.setCenter = function() {
        if (_this.wrapperComponent && _this.contentComponent) {
          var targetState = getCenterPosition(_this.transformState.scale, _this.wrapperComponent, _this.contentComponent);
          _this.setTransformState(targetState.scale, targetState.positionX, targetState.positionY);
        }
      };
      this.handleTransformStyles = function(x, y, scale) {
        if (_this.props.customTransform) {
          return _this.props.customTransform(x, y, scale);
        }
        return getTransformStyles(x, y, scale);
      };
      this.applyTransformation = function() {
        if (!_this.mounted || !_this.contentComponent)
          return;
        var _a = _this.transformState, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
        var transform = _this.handleTransformStyles(positionX, positionY, scale);
        _this.contentComponent.style.transform = transform;
      };
      this.getContext = function() {
        return getContext(_this);
      };
      this.onChange = function(callback) {
        if (!_this.onChangeCallbacks.has(callback)) {
          _this.onChangeCallbacks.add(callback);
        }
        return function() {
          _this.onChangeCallbacks.delete(callback);
        };
      };
      this.onInit = function(callback) {
        if (!_this.onInitCallbacks.has(callback)) {
          _this.onInitCallbacks.add(callback);
        }
        return function() {
          _this.onInitCallbacks.delete(callback);
        };
      };
      this.init = function(wrapperComponent, contentComponent) {
        _this.cleanupWindowEvents();
        _this.wrapperComponent = wrapperComponent;
        _this.contentComponent = contentComponent;
        handleCalculateBounds(_this, _this.transformState.scale);
        _this.handleInitializeWrapperEvents(wrapperComponent);
        _this.handleInitialize(wrapperComponent, contentComponent);
        _this.initializeWindowEvents();
        _this.isInitialized = true;
        var ctx = getContext(_this);
        handleCallback(ctx, void 0, _this.props.onInit);
      };
      this.props = props;
      this.setup = createSetup(this.props);
      this.transformState = createState(this.props);
    }
    return ZoomPanPinch2;
  }()
);
var Context = React.createContext(null);
var getContent = function(children, ctx) {
  if (typeof children === "function") {
    return children(ctx);
  }
  return children;
};
var TransformWrapper = React.forwardRef(function(props, ref) {
  var instance2 = reactExports.useRef(new ZoomPanPinch(props)).current;
  var content = getContent(props.children, getControls(instance2));
  reactExports.useImperativeHandle(ref, function() {
    return getControls(instance2);
  }, [instance2]);
  reactExports.useEffect(function() {
    instance2.update(props);
  }, [instance2, props]);
  return React.createElement(Context.Provider, { value: instance2 }, content);
});
React.forwardRef(function(props, ref) {
  var localRef = reactExports.useRef(null);
  var instance2 = reactExports.useContext(Context);
  reactExports.useEffect(function() {
    return instance2.onChange(function(ctx) {
      if (localRef.current) {
        var positionX = 0;
        var positionY = 0;
        localRef.current.style.transform = instance2.handleTransformStyles(positionX, positionY, 1 / ctx.instance.transformState.scale);
      }
    });
  }, [instance2]);
  return React.createElement("div", __assign({}, props, { ref: mergeRefs([localRef, ref]) }));
});
function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = ".transform-component-module_wrapper__SPB86 {\n  position: relative;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  overflow: hidden;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none;\n  margin: 0;\n  padding: 0;\n  transform: translate3d(0, 0, 0);\n}\n.transform-component-module_content__FBWxo {\n  display: flex;\n  flex-wrap: wrap;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin: 0;\n  padding: 0;\n  transform-origin: 0% 0%;\n}\n.transform-component-module_content__FBWxo img {\n  pointer-events: none;\n}\n";
var styles = { "wrapper": "transform-component-module_wrapper__SPB86", "content": "transform-component-module_content__FBWxo" };
styleInject(css_248z);
var TransformComponent = function(_a) {
  var children = _a.children, _b = _a.wrapperClass, wrapperClass = _b === void 0 ? "" : _b, _c = _a.contentClass, contentClass = _c === void 0 ? "" : _c, wrapperStyle = _a.wrapperStyle, contentStyle = _a.contentStyle, _d = _a.wrapperProps, wrapperProps = _d === void 0 ? {} : _d, _e = _a.contentProps, contentProps = _e === void 0 ? {} : _e;
  var _f = reactExports.useContext(Context), init = _f.init, cleanupWindowEvents = _f.cleanupWindowEvents;
  var wrapperRef = reactExports.useRef(null);
  var contentRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    var wrapper = wrapperRef.current;
    var content = contentRef.current;
    if (wrapper !== null && content !== null && init) {
      init === null || init === void 0 ? void 0 : init(wrapper, content);
    }
    return function() {
      cleanupWindowEvents === null || cleanupWindowEvents === void 0 ? void 0 : cleanupWindowEvents();
    };
  }, []);
  return React.createElement(
    "div",
    __assign({}, wrapperProps, { ref: wrapperRef, className: "".concat(baseClasses.wrapperClass, " ").concat(styles.wrapper, " ").concat(wrapperClass), style: wrapperStyle }),
    React.createElement("div", __assign({}, contentProps, { ref: contentRef, className: "".concat(baseClasses.contentClass, " ").concat(styles.content, " ").concat(contentClass), style: contentStyle }), children)
  );
};
function isTextPart$1(part) {
  return typeof part === "object" && part !== null && part.type === "text";
}
function getPreviewText(message2, maxLength = 80) {
  const parts = message2.message.parts;
  if (!parts || parts.length === 0) {
    return "[Empty message]";
  }
  const textParts = parts.filter(isTextPart$1);
  if (textParts.length === 0) {
    return "[Media content]";
  }
  const fullText = textParts.map((p) => p.text).join(" ");
  const cleanText = fullText.replace(/```[\s\S]*?```/g, "[code]").replace(/`[^`]+`/g, "[code]").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*_~]/g, "").replace(/\n+/g, " ").trim();
  return cleanText.slice(0, maxLength) + (cleanText.length > maxLength ? "..." : "");
}
const MessageSelector = reactExports.memo(function MessageSelector2({ messages, selectedIds, onSelectionChange }) {
  const { t } = useI18n();
  const handleSelectAll = reactExports.useCallback(() => {
    onSelectionChange(new Set(messages.map((m) => m.id)));
  }, [messages, onSelectionChange]);
  const handleDeselectAll = reactExports.useCallback(() => {
    onSelectionChange(/* @__PURE__ */ new Set());
  }, [onSelectionChange]);
  const handleToggle = reactExports.useCallback(
    (messageId) => {
      const newSelection = new Set(selectedIds);
      if (newSelection.has(messageId)) {
        newSelection.delete(messageId);
      } else {
        newSelection.add(messageId);
      }
      onSelectionChange(newSelection);
    },
    [selectedIds, onSelectionChange]
  );
  const allSelected = messages.length > 0 && selectedIds.size === messages.length;
  const noneSelected = selectedIds.size === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("share.selectMessages", { selected: selectedIds.size, total: messages.length }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: handleSelectAll, disabled: allSelected, children: t("share.selectAll") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: handleDeselectAll, disabled: noneSelected, children: t("share.deselectAll") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowContainer, { className: "h-[200px] rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 space-y-1", children: messages.map((message2) => {
      const isUser = message2.message.role === "user";
      const isSelected = selectedIds.has(message2.id);
      const preview = getPreviewText(message2);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: cn(
            "flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors",
            "hover:bg-muted",
            isSelected && "bg-muted/50"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: isSelected, onCheckedChange: () => handleToggle(message2.id), className: "mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-xs font-medium mb-0.5", isUser ? "text-primary" : "text-muted-foreground"), children: isUser ? t("share.user") : t("share.assistant") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/80 truncate", children: preview })
            ] })
          ]
        },
        message2.id
      );
    }) }) })
  ] });
});
function isTextPart(part) {
  return typeof part === "object" && part !== null && part.type === "text";
}
function isFilePart(part) {
  return typeof part === "object" && part !== null && part.type === "file";
}
function extractTextContent(message2) {
  const parts = message2.message.parts;
  if (!parts || parts.length === 0) {
    return "";
  }
  return parts.filter(isTextPart).map((part) => part.text).join("\n\n");
}
function extractImages(message2) {
  const parts = message2.message.parts;
  if (!parts) return [];
  return parts.filter(isFilePart).filter((part) => part.mediaType?.includes("image")).map((part) => part.url);
}
const ExportMessage = reactExports.memo(function ExportMessage2({ message: message2, showTimestamp = false }) {
  const textContent = extractTextContent(message2);
  const images = extractImages(message2);
  const timestamp = message2.createdAt || message2.timestamp;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-export-message": true, children: [
    showTimestamp && timestamp && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1 px-1", children: format(new Date(timestamp), "yyyy-MM-dd HH:mm") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { from: message2.message.role, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(MessageContent, { children: [
      images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: images.map((url, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: `Attachment ${index + 1}`, className: "max-w-full max-h-64 rounded-lg" }, index)) }),
      textContent && /* @__PURE__ */ jsxRuntimeExports.jsx(Response, { children: textContent })
    ] }) })
  ] });
});
const SharePreview = reactExports.memo(
  reactExports.forwardRef(function SharePreview2({ messages, selectedIds, options = {}, className }, ref) {
    const { includeHeader = true, includeTimestamp = false, title } = options;
    const selectedMessages = reactExports.useMemo(() => {
      return messages.filter((m) => selectedIds.has(m.id)).sort((a, b) => new Date(a.createdAt || a.timestamp).getTime() - new Date(b.createdAt || b.timestamp).getTime());
    }, [messages, selectedIds]);
    const exportDate = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: cn("w-[800px] bg-background text-foreground p-8", className),
        style: {
          // Ensure consistent rendering for export
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        children: [
          includeHeader && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 pb-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: title || "Conversation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Exported on ",
              exportDate,
              " • ",
              selectedMessages.length,
              " message",
              selectedMessages.length !== 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: selectedMessages.map((message2) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExportMessage, { message: message2, showTimestamp: includeTimestamp }, message2.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: instance.t("share.generatedBy") }) })
        ]
      }
    );
  })
);
function changeJpegDpi(uint8Array, dpi) {
  uint8Array[13] = 1;
  uint8Array[14] = dpi >> 8;
  uint8Array[15] = dpi & 255;
  uint8Array[16] = dpi >> 8;
  uint8Array[17] = dpi & 255;
  return uint8Array;
}
const _P = "p".charCodeAt(0);
const _H = "H".charCodeAt(0);
const _Y = "Y".charCodeAt(0);
const _S = "s".charCodeAt(0);
let pngDataTable;
function createPngDataTable() {
  const crcTable = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}
function calcCrc(uint8Array) {
  let c = -1;
  if (!pngDataTable)
    pngDataTable = createPngDataTable();
  for (let n = 0; n < uint8Array.length; n++) {
    c = pngDataTable[(c ^ uint8Array[n]) & 255] ^ c >>> 8;
  }
  return c ^ -1;
}
function searchStartOfPhys(uint8Array) {
  const length = uint8Array.length - 1;
  for (let i = length; i >= 4; i--) {
    if (uint8Array[i - 4] === 9 && uint8Array[i - 3] === _P && uint8Array[i - 2] === _H && uint8Array[i - 1] === _Y && uint8Array[i] === _S) {
      return i - 3;
    }
  }
  return 0;
}
function changePngDpi(uint8Array, dpi, overwritepHYs = false) {
  const physChunk = new Uint8Array(13);
  dpi *= 39.3701;
  physChunk[0] = _P;
  physChunk[1] = _H;
  physChunk[2] = _Y;
  physChunk[3] = _S;
  physChunk[4] = dpi >>> 24;
  physChunk[5] = dpi >>> 16;
  physChunk[6] = dpi >>> 8;
  physChunk[7] = dpi & 255;
  physChunk[8] = physChunk[4];
  physChunk[9] = physChunk[5];
  physChunk[10] = physChunk[6];
  physChunk[11] = physChunk[7];
  physChunk[12] = 1;
  const crc = calcCrc(physChunk);
  const crcChunk = new Uint8Array(4);
  crcChunk[0] = crc >>> 24;
  crcChunk[1] = crc >>> 16;
  crcChunk[2] = crc >>> 8;
  crcChunk[3] = crc & 255;
  if (overwritepHYs) {
    const startingIndex = searchStartOfPhys(uint8Array);
    uint8Array.set(physChunk, startingIndex);
    uint8Array.set(crcChunk, startingIndex + 13);
    return uint8Array;
  } else {
    const chunkLength = new Uint8Array(4);
    chunkLength[0] = 0;
    chunkLength[1] = 0;
    chunkLength[2] = 0;
    chunkLength[3] = 9;
    const finalHeader = new Uint8Array(54);
    finalHeader.set(uint8Array, 0);
    finalHeader.set(chunkLength, 33);
    finalHeader.set(physChunk, 37);
    finalHeader.set(crcChunk, 50);
    return finalHeader;
  }
}
const b64PhysSignature1 = "AAlwSFlz";
const b64PhysSignature2 = "AAAJcEhZ";
const b64PhysSignature3 = "AAAACXBI";
function detectPhysChunkFromDataUrl(dataUrl) {
  let b64index = dataUrl.indexOf(b64PhysSignature1);
  if (b64index === -1) {
    b64index = dataUrl.indexOf(b64PhysSignature2);
  }
  if (b64index === -1) {
    b64index = dataUrl.indexOf(b64PhysSignature3);
  }
  return b64index;
}
const PREFIX = "[modern-screenshot]";
const IN_BROWSER = typeof window !== "undefined";
const SUPPORT_WEB_WORKER = IN_BROWSER && "Worker" in window;
const SUPPORT_ATOB = IN_BROWSER && "atob" in window;
const SUPPORT_BTOA = IN_BROWSER && "btoa" in window;
const USER_AGENT = IN_BROWSER ? window.navigator?.userAgent : "";
const IN_CHROME = USER_AGENT.includes("Chrome");
const IN_SAFARI = USER_AGENT.includes("AppleWebKit") && !IN_CHROME;
const IN_FIREFOX = USER_AGENT.includes("Firefox");
const isContext = (value) => value && "__CONTEXT__" in value;
const isCssFontFaceRule = (rule) => rule.constructor.name === "CSSFontFaceRule";
const isCSSImportRule = (rule) => rule.constructor.name === "CSSImportRule";
const isElementNode = (node) => node.nodeType === 1;
const isSVGElementNode = (node) => typeof node.className === "object";
const isSVGImageElementNode = (node) => node.tagName === "image";
const isSVGUseElementNode = (node) => node.tagName === "use";
const isHTMLElementNode = (node) => isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
const isCommentNode = (node) => node.nodeType === 8;
const isTextNode = (node) => node.nodeType === 3;
const isImageElement = (node) => node.tagName === "IMG";
const isVideoElement = (node) => node.tagName === "VIDEO";
const isCanvasElement = (node) => node.tagName === "CANVAS";
const isTextareaElement = (node) => node.tagName === "TEXTAREA";
const isInputElement = (node) => node.tagName === "INPUT";
const isStyleElement = (node) => node.tagName === "STYLE";
const isScriptElement = (node) => node.tagName === "SCRIPT";
const isSelectElement = (node) => node.tagName === "SELECT";
const isSlotElement = (node) => node.tagName === "SLOT";
const isIFrameElement = (node) => node.tagName === "IFRAME";
const consoleWarn = (...args) => console.warn(PREFIX, ...args);
function supportWebp(ownerDocument) {
  const canvas = ownerDocument?.createElement?.("canvas");
  if (canvas) {
    canvas.height = canvas.width = 1;
  }
  return Boolean(canvas) && "toDataURL" in canvas && Boolean(canvas.toDataURL("image/webp").includes("image/webp"));
}
const isDataUrl = (url) => url.startsWith("data:");
function resolveUrl(url, baseUrl) {
  if (url.match(/^[a-z]+:\/\//i))
    return url;
  if (IN_BROWSER && url.match(/^\/\//))
    return window.location.protocol + url;
  if (url.match(/^[a-z]+:/i))
    return url;
  if (!IN_BROWSER)
    return url;
  const doc = getDocument().implementation.createHTMLDocument();
  const base = doc.createElement("base");
  const a = doc.createElement("a");
  doc.head.appendChild(base);
  doc.body.appendChild(a);
  if (baseUrl)
    base.href = baseUrl;
  a.href = url;
  return a.href;
}
function getDocument(target) {
  return (target && isElementNode(target) ? target?.ownerDocument : target) ?? window.document;
}
const XMLNS = "http://www.w3.org/2000/svg";
function createSvg(width, height, ownerDocument) {
  const svg = getDocument(ownerDocument).createElementNS(XMLNS, "svg");
  svg.setAttributeNS(null, "width", width.toString());
  svg.setAttributeNS(null, "height", height.toString());
  svg.setAttributeNS(null, "viewBox", `0 0 ${width} ${height}`);
  return svg;
}
function svgToDataUrl(svg, removeControlCharacter) {
  let xhtml = new XMLSerializer().serializeToString(svg);
  if (removeControlCharacter) {
    xhtml = xhtml.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu, "");
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xhtml)}`;
}
function readBlob(blob, type) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.onabort = () => reject(new Error(`Failed read blob to ${type}`));
    {
      reader.readAsDataURL(blob);
    }
  });
}
const blobToDataUrl = (blob) => readBlob(blob, "dataUrl");
function createImage(url, ownerDocument) {
  const img = getDocument(ownerDocument).createElement("img");
  img.decoding = "sync";
  img.loading = "eager";
  img.src = url;
  return img;
}
function loadMedia(media, options) {
  return new Promise((resolve) => {
    const { timeout, ownerDocument, onError: userOnError, onWarn } = options ?? {};
    const node = typeof media === "string" ? createImage(media, getDocument(ownerDocument)) : media;
    let timer = null;
    let removeEventListeners = null;
    function onResolve() {
      resolve(node);
      timer && clearTimeout(timer);
      removeEventListeners?.();
    }
    if (timeout) {
      timer = setTimeout(onResolve, timeout);
    }
    if (isVideoElement(node)) {
      const currentSrc = node.currentSrc || node.src;
      if (!currentSrc) {
        if (node.poster) {
          return loadMedia(node.poster, options).then(resolve);
        }
        return onResolve();
      }
      if (node.readyState >= 2) {
        return onResolve();
      }
      const onLoadeddata = onResolve;
      const onError = (error) => {
        onWarn?.(
          "Failed video load",
          currentSrc,
          error
        );
        userOnError?.(error);
        onResolve();
      };
      removeEventListeners = () => {
        node.removeEventListener("loadeddata", onLoadeddata);
        node.removeEventListener("error", onError);
      };
      node.addEventListener("loadeddata", onLoadeddata, { once: true });
      node.addEventListener("error", onError, { once: true });
    } else {
      const currentSrc = isSVGImageElementNode(node) ? node.href.baseVal : node.currentSrc || node.src;
      if (!currentSrc) {
        return onResolve();
      }
      const onLoad = async () => {
        if (isImageElement(node) && "decode" in node) {
          try {
            await node.decode();
          } catch (error) {
            onWarn?.(
              "Failed to decode image, trying to render anyway",
              node.dataset.originalSrc || currentSrc,
              error
            );
          }
        }
        onResolve();
      };
      const onError = (error) => {
        onWarn?.(
          "Failed image load",
          node.dataset.originalSrc || currentSrc,
          error
        );
        onResolve();
      };
      if (isImageElement(node) && node.complete) {
        return onLoad();
      }
      removeEventListeners = () => {
        node.removeEventListener("load", onLoad);
        node.removeEventListener("error", onError);
      };
      node.addEventListener("load", onLoad, { once: true });
      node.addEventListener("error", onError, { once: true });
    }
  });
}
async function waitUntilLoad(node, options) {
  if (isHTMLElementNode(node)) {
    if (isImageElement(node) || isVideoElement(node)) {
      await loadMedia(node, options);
    } else {
      await Promise.all(
        ["img", "video"].flatMap((selectors) => {
          return Array.from(node.querySelectorAll(selectors)).map((el) => loadMedia(el, options));
        })
      );
    }
  }
}
const uuid = /* @__PURE__ */ function uuid2() {
  let counter = 0;
  const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
  return () => {
    counter += 1;
    return `u${random()}${counter}`;
  };
}();
function splitFontFamily(fontFamily) {
  return fontFamily?.split(",").map((val) => val.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
}
let uid = 0;
function createLogger(debug) {
  const prefix = `${PREFIX}[#${uid}]`;
  uid++;
  return {
    // eslint-disable-next-line no-console
    time: (label) => debug && console.time(`${prefix} ${label}`),
    // eslint-disable-next-line no-console
    timeEnd: (label) => debug && console.timeEnd(`${prefix} ${label}`),
    warn: (...args) => debug && consoleWarn(...args)
  };
}
function getDefaultRequestInit(bypassingCache) {
  return {
    cache: bypassingCache ? "no-cache" : "force-cache"
  };
}
async function orCreateContext(node, options) {
  return isContext(node) ? node : createContext(node, { ...options, autoDestruct: true });
}
async function createContext(node, options) {
  const { scale = 1, workerUrl, workerNumber = 1 } = options || {};
  const debug = Boolean(options?.debug);
  const features = options?.features ?? true;
  const ownerDocument = node.ownerDocument ?? (IN_BROWSER ? window.document : void 0);
  const ownerWindow = node.ownerDocument?.defaultView ?? (IN_BROWSER ? window : void 0);
  const requests = /* @__PURE__ */ new Map();
  const context = {
    // Options
    width: 0,
    height: 0,
    quality: 1,
    type: "image/png",
    scale,
    backgroundColor: null,
    style: null,
    filter: null,
    maximumCanvasSize: 0,
    timeout: 3e4,
    progress: null,
    debug,
    fetch: {
      requestInit: getDefaultRequestInit(options?.fetch?.bypassingCache),
      placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      bypassingCache: false,
      ...options?.fetch
    },
    fetchFn: null,
    font: {},
    drawImageInterval: 100,
    workerUrl: null,
    workerNumber,
    onCloneEachNode: null,
    onCloneNode: null,
    onEmbedNode: null,
    onCreateForeignObjectSvg: null,
    includeStyleProperties: null,
    autoDestruct: false,
    ...options,
    // InternalContext
    __CONTEXT__: true,
    log: createLogger(debug),
    node,
    ownerDocument,
    ownerWindow,
    dpi: scale === 1 ? null : 96 * scale,
    svgStyleElement: createStyleElement(ownerDocument),
    svgDefsElement: ownerDocument?.createElementNS(XMLNS, "defs"),
    svgStyles: /* @__PURE__ */ new Map(),
    defaultComputedStyles: /* @__PURE__ */ new Map(),
    workers: [
      ...Array.from({
        length: SUPPORT_WEB_WORKER && workerUrl && workerNumber ? workerNumber : 0
      })
    ].map(() => {
      try {
        const worker = new Worker(workerUrl);
        worker.onmessage = async (event) => {
          const { url, result } = event.data;
          if (result) {
            requests.get(url)?.resolve?.(result);
          } else {
            requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
          }
        };
        worker.onmessageerror = (event) => {
          const { url } = event.data;
          requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
        };
        return worker;
      } catch (error) {
        context.log.warn("Failed to new Worker", error);
        return null;
      }
    }).filter(Boolean),
    fontFamilies: /* @__PURE__ */ new Map(),
    fontCssTexts: /* @__PURE__ */ new Map(),
    acceptOfImage: `${[
      supportWebp(ownerDocument) && "image/webp",
      "image/svg+xml",
      "image/*",
      "*/*"
    ].filter(Boolean).join(",")};q=0.8`,
    requests,
    drawImageCount: 0,
    tasks: [],
    features,
    isEnable: (key) => {
      if (key === "restoreScrollPosition") {
        return typeof features === "boolean" ? false : features[key] ?? false;
      }
      if (typeof features === "boolean") {
        return features;
      }
      return features[key] ?? true;
    },
    shadowRoots: []
  };
  context.log.time("wait until load");
  await waitUntilLoad(node, { timeout: context.timeout, onWarn: context.log.warn });
  context.log.timeEnd("wait until load");
  const { width, height } = resolveBoundingBox(node, context);
  context.width = width;
  context.height = height;
  return context;
}
function createStyleElement(ownerDocument) {
  if (!ownerDocument)
    return void 0;
  const style = ownerDocument.createElement("style");
  const cssText = style.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);
  style.appendChild(cssText);
  return style;
}
function resolveBoundingBox(node, context) {
  let { width, height } = context;
  if (isElementNode(node) && (!width || !height)) {
    const box = node.getBoundingClientRect();
    width = width || box.width || Number(node.getAttribute("width")) || 0;
    height = height || box.height || Number(node.getAttribute("height")) || 0;
  }
  return { width, height };
}
async function imageToCanvas(image, context) {
  const {
    log,
    timeout,
    drawImageCount,
    drawImageInterval
  } = context;
  log.time("image to canvas");
  const loaded = await loadMedia(image, { timeout, onWarn: context.log.warn });
  const { canvas, context2d } = createCanvas(image.ownerDocument, context);
  const drawImage = () => {
    try {
      context2d?.drawImage(loaded, 0, 0, canvas.width, canvas.height);
    } catch (error) {
      context.log.warn("Failed to drawImage", error);
    }
  };
  drawImage();
  if (context.isEnable("fixSvgXmlDecode")) {
    for (let i = 0; i < drawImageCount; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          context2d?.clearRect(0, 0, canvas.width, canvas.height);
          drawImage();
          resolve();
        }, i + drawImageInterval);
      });
    }
  }
  context.drawImageCount = 0;
  log.timeEnd("image to canvas");
  return canvas;
}
function createCanvas(ownerDocument, context) {
  const { width, height, scale, backgroundColor, maximumCanvasSize: max } = context;
  const canvas = ownerDocument.createElement("canvas");
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (max) {
    if (canvas.width > max || canvas.height > max) {
      if (canvas.width > max && canvas.height > max) {
        if (canvas.width > canvas.height) {
          canvas.height *= max / canvas.width;
          canvas.width = max;
        } else {
          canvas.width *= max / canvas.height;
          canvas.height = max;
        }
      } else if (canvas.width > max) {
        canvas.height *= max / canvas.width;
        canvas.width = max;
      } else {
        canvas.width *= max / canvas.height;
        canvas.height = max;
      }
    }
  }
  const context2d = canvas.getContext("2d");
  if (context2d && backgroundColor) {
    context2d.fillStyle = backgroundColor;
    context2d.fillRect(0, 0, canvas.width, canvas.height);
  }
  return { canvas, context2d };
}
function cloneCanvas(canvas, context) {
  if (canvas.ownerDocument) {
    try {
      const dataURL = canvas.toDataURL();
      if (dataURL !== "data:,") {
        return createImage(dataURL, canvas.ownerDocument);
      }
    } catch (error) {
      context.log.warn("Failed to clone canvas", error);
    }
  }
  const cloned = canvas.cloneNode(false);
  const ctx = canvas.getContext("2d");
  const clonedCtx = cloned.getContext("2d");
  try {
    if (ctx && clonedCtx) {
      clonedCtx.putImageData(
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        0,
        0
      );
    }
    return cloned;
  } catch (error) {
    context.log.warn("Failed to clone canvas", error);
  }
  return cloned;
}
function cloneIframe(iframe, context) {
  try {
    if (iframe?.contentDocument?.body) {
      return cloneNode(iframe.contentDocument.body, context);
    }
  } catch (error) {
    context.log.warn("Failed to clone iframe", error);
  }
  return iframe.cloneNode(false);
}
function cloneImage(image) {
  const cloned = image.cloneNode(false);
  if (image.currentSrc && image.currentSrc !== image.src) {
    cloned.src = image.currentSrc;
    cloned.srcset = "";
  }
  if (cloned.loading === "lazy") {
    cloned.loading = "eager";
  }
  return cloned;
}
async function cloneVideo(video, context) {
  if (video.ownerDocument && !video.currentSrc && video.poster) {
    return createImage(video.poster, video.ownerDocument);
  }
  const cloned = video.cloneNode(false);
  cloned.crossOrigin = "anonymous";
  if (video.currentSrc && video.currentSrc !== video.src) {
    cloned.src = video.currentSrc;
  }
  const ownerDocument = cloned.ownerDocument;
  if (ownerDocument) {
    let canPlay = true;
    await loadMedia(cloned, { onError: () => canPlay = false, onWarn: context.log.warn });
    if (!canPlay) {
      if (video.poster) {
        return createImage(video.poster, video.ownerDocument);
      }
      return cloned;
    }
    cloned.currentTime = video.currentTime;
    await new Promise((resolve) => {
      cloned.addEventListener("seeked", resolve, { once: true });
    });
    const canvas = ownerDocument.createElement("canvas");
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    try {
      const ctx = canvas.getContext("2d");
      if (ctx)
        ctx.drawImage(cloned, 0, 0, canvas.width, canvas.height);
    } catch (error) {
      context.log.warn("Failed to clone video", error);
      if (video.poster) {
        return createImage(video.poster, video.ownerDocument);
      }
      return cloned;
    }
    return cloneCanvas(canvas, context);
  }
  return cloned;
}
function cloneElement(node, context) {
  if (isCanvasElement(node)) {
    return cloneCanvas(node, context);
  }
  if (isIFrameElement(node)) {
    return cloneIframe(node, context);
  }
  if (isImageElement(node)) {
    return cloneImage(node);
  }
  if (isVideoElement(node)) {
    return cloneVideo(node, context);
  }
  return node.cloneNode(false);
}
function getSandBox(context) {
  let sandbox = context.sandbox;
  if (!sandbox) {
    const { ownerDocument } = context;
    try {
      if (ownerDocument) {
        sandbox = ownerDocument.createElement("iframe");
        sandbox.id = `__SANDBOX__${uuid()}`;
        sandbox.width = "0";
        sandbox.height = "0";
        sandbox.style.visibility = "hidden";
        sandbox.style.position = "fixed";
        ownerDocument.body.appendChild(sandbox);
        sandbox.srcdoc = '<!DOCTYPE html><meta charset="UTF-8"><title></title><body>';
        context.sandbox = sandbox;
      }
    } catch (error) {
      context.log.warn("Failed to getSandBox", error);
    }
  }
  return sandbox;
}
const ignoredStyles = [
  "width",
  "height",
  "-webkit-text-fill-color"
];
const includedAttributes = [
  "stroke",
  "fill"
];
function getDefaultStyle(node, pseudoElement, context) {
  const { defaultComputedStyles } = context;
  const nodeName = node.nodeName.toLowerCase();
  const isSvgNode = isSVGElementNode(node) && nodeName !== "svg";
  const attributes = isSvgNode ? includedAttributes.map((name) => [name, node.getAttribute(name)]).filter(([, value]) => value !== null) : [];
  const key = [
    isSvgNode && "svg",
    nodeName,
    attributes.map((name, value) => `${name}=${value}`).join(","),
    pseudoElement
  ].filter(Boolean).join(":");
  if (defaultComputedStyles.has(key))
    return defaultComputedStyles.get(key);
  const sandbox = getSandBox(context);
  const sandboxWindow = sandbox?.contentWindow;
  if (!sandboxWindow)
    return /* @__PURE__ */ new Map();
  const sandboxDocument = sandboxWindow?.document;
  let root;
  let el;
  if (isSvgNode) {
    root = sandboxDocument.createElementNS(XMLNS, "svg");
    el = root.ownerDocument.createElementNS(root.namespaceURI, nodeName);
    attributes.forEach(([name, value]) => {
      el.setAttributeNS(null, name, value);
    });
    root.appendChild(el);
  } else {
    root = el = sandboxDocument.createElement(nodeName);
  }
  el.textContent = " ";
  sandboxDocument.body.appendChild(root);
  const computedStyle = sandboxWindow.getComputedStyle(el, pseudoElement);
  const styles2 = /* @__PURE__ */ new Map();
  for (let len = computedStyle.length, i = 0; i < len; i++) {
    const name = computedStyle.item(i);
    if (ignoredStyles.includes(name))
      continue;
    styles2.set(name, computedStyle.getPropertyValue(name));
  }
  sandboxDocument.body.removeChild(root);
  defaultComputedStyles.set(key, styles2);
  return styles2;
}
function getDiffStyle(style, defaultStyle, includeStyleProperties) {
  const diffStyle = /* @__PURE__ */ new Map();
  const prefixs = [];
  const prefixTree = /* @__PURE__ */ new Map();
  if (includeStyleProperties) {
    for (const name of includeStyleProperties) {
      applyTo(name);
    }
  } else {
    for (let len = style.length, i = 0; i < len; i++) {
      const name = style.item(i);
      applyTo(name);
    }
  }
  for (let len = prefixs.length, i = 0; i < len; i++) {
    prefixTree.get(prefixs[i])?.forEach((value, name) => diffStyle.set(name, value));
  }
  function applyTo(name) {
    const value = style.getPropertyValue(name);
    const priority = style.getPropertyPriority(name);
    const subIndex = name.lastIndexOf("-");
    const prefix = subIndex > -1 ? name.substring(0, subIndex) : void 0;
    if (prefix) {
      let map = prefixTree.get(prefix);
      if (!map) {
        map = /* @__PURE__ */ new Map();
        prefixTree.set(prefix, map);
      }
      map.set(name, [value, priority]);
    }
    if (defaultStyle.get(name) === value && !priority)
      return;
    if (prefix) {
      prefixs.push(prefix);
    } else {
      diffStyle.set(name, [value, priority]);
    }
  }
  return diffStyle;
}
function copyCssStyles(node, cloned, isRoot, context) {
  const { ownerWindow, includeStyleProperties, currentParentNodeStyle } = context;
  const clonedStyle = cloned.style;
  const computedStyle = ownerWindow.getComputedStyle(node);
  const defaultStyle = getDefaultStyle(node, null, context);
  currentParentNodeStyle?.forEach((_, key) => {
    defaultStyle.delete(key);
  });
  const style = getDiffStyle(computedStyle, defaultStyle, includeStyleProperties);
  style.delete("transition-property");
  style.delete("all");
  style.delete("d");
  style.delete("content");
  if (isRoot) {
    style.delete("margin-top");
    style.delete("margin-right");
    style.delete("margin-bottom");
    style.delete("margin-left");
    style.delete("margin-block-start");
    style.delete("margin-block-end");
    style.delete("margin-inline-start");
    style.delete("margin-inline-end");
    style.set("box-sizing", ["border-box", ""]);
  }
  if (style.get("background-clip")?.[0] === "text") {
    cloned.classList.add("______background-clip--text");
  }
  if (IN_CHROME) {
    if (!style.has("font-kerning"))
      style.set("font-kerning", ["normal", ""]);
    if ((style.get("overflow-x")?.[0] === "hidden" || style.get("overflow-y")?.[0] === "hidden") && style.get("text-overflow")?.[0] === "ellipsis" && node.scrollWidth === node.clientWidth) {
      style.set("text-overflow", ["clip", ""]);
    }
  }
  for (let len = clonedStyle.length, i = 0; i < len; i++) {
    clonedStyle.removeProperty(clonedStyle.item(i));
  }
  style.forEach(([value, priority], name) => {
    clonedStyle.setProperty(name, value, priority);
  });
  return style;
}
function copyInputValue(node, cloned) {
  if (isTextareaElement(node) || isInputElement(node) || isSelectElement(node)) {
    cloned.setAttribute("value", node.value);
  }
}
const pseudoClasses = [
  "::before",
  "::after"
  // '::placeholder', TODO
];
const scrollbarPseudoClasses = [
  "::-webkit-scrollbar",
  "::-webkit-scrollbar-button",
  // '::-webkit-scrollbar:horizontal', TODO
  "::-webkit-scrollbar-thumb",
  "::-webkit-scrollbar-track",
  "::-webkit-scrollbar-track-piece",
  // '::-webkit-scrollbar:vertical', TODO
  "::-webkit-scrollbar-corner",
  "::-webkit-resizer"
];
function copyPseudoClass(node, cloned, copyScrollbar, context, addWordToFontFamilies) {
  const { ownerWindow, svgStyleElement, svgStyles, currentNodeStyle } = context;
  if (!svgStyleElement || !ownerWindow)
    return;
  function copyBy(pseudoClass) {
    const computedStyle = ownerWindow.getComputedStyle(node, pseudoClass);
    let content = computedStyle.getPropertyValue("content");
    if (!content || content === "none")
      return;
    addWordToFontFamilies?.(content);
    content = content.replace(/(')|(")|(counter\(.+\))/g, "");
    const klasses = [uuid()];
    const defaultStyle = getDefaultStyle(node, pseudoClass, context);
    currentNodeStyle?.forEach((_, key) => {
      defaultStyle.delete(key);
    });
    const style = getDiffStyle(computedStyle, defaultStyle, context.includeStyleProperties);
    style.delete("content");
    style.delete("-webkit-locale");
    if (style.get("background-clip")?.[0] === "text") {
      cloned.classList.add("______background-clip--text");
    }
    const cloneStyle = [
      `content: '${content}';`
    ];
    style.forEach(([value, priority], name) => {
      cloneStyle.push(`${name}: ${value}${priority ? " !important" : ""};`);
    });
    if (cloneStyle.length === 1)
      return;
    try {
      cloned.className = [cloned.className, ...klasses].join(" ");
    } catch (err) {
      context.log.warn("Failed to copyPseudoClass", err);
      return;
    }
    const cssText = cloneStyle.join("\n  ");
    let allClasses = svgStyles.get(cssText);
    if (!allClasses) {
      allClasses = [];
      svgStyles.set(cssText, allClasses);
    }
    allClasses.push(`.${klasses[0]}${pseudoClass}`);
  }
  pseudoClasses.forEach(copyBy);
  if (copyScrollbar)
    scrollbarPseudoClasses.forEach(copyBy);
}
const excludeParentNodes = /* @__PURE__ */ new Set([
  "symbol"
  // test/fixtures/svg.symbol.html
]);
async function appendChildNode(node, cloned, child, context, addWordToFontFamilies) {
  if (isElementNode(child) && (isStyleElement(child) || isScriptElement(child)))
    return;
  if (context.filter && !context.filter(child))
    return;
  if (excludeParentNodes.has(cloned.nodeName) || excludeParentNodes.has(child.nodeName)) {
    context.currentParentNodeStyle = void 0;
  } else {
    context.currentParentNodeStyle = context.currentNodeStyle;
  }
  const childCloned = await cloneNode(child, context, false, addWordToFontFamilies);
  if (context.isEnable("restoreScrollPosition")) {
    restoreScrollPosition(node, childCloned);
  }
  cloned.appendChild(childCloned);
}
async function cloneChildNodes(node, cloned, context, addWordToFontFamilies) {
  let firstChild = node.firstChild;
  if (isElementNode(node)) {
    if (node.shadowRoot) {
      firstChild = node.shadowRoot?.firstChild;
      context.shadowRoots.push(node.shadowRoot);
    }
  }
  for (let child = firstChild; child; child = child.nextSibling) {
    if (isCommentNode(child))
      continue;
    if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === "function") {
      const nodes = child.assignedNodes();
      for (let i = 0; i < nodes.length; i++) {
        await appendChildNode(node, cloned, nodes[i], context, addWordToFontFamilies);
      }
    } else {
      await appendChildNode(node, cloned, child, context, addWordToFontFamilies);
    }
  }
}
function restoreScrollPosition(node, chlidCloned) {
  if (!isHTMLElementNode(node) || !isHTMLElementNode(chlidCloned))
    return;
  const { scrollTop, scrollLeft } = node;
  if (!scrollTop && !scrollLeft) {
    return;
  }
  const { transform } = chlidCloned.style;
  const matrix = new DOMMatrix(transform);
  const { a, b, c, d } = matrix;
  matrix.a = 1;
  matrix.b = 0;
  matrix.c = 0;
  matrix.d = 1;
  matrix.translateSelf(-scrollLeft, -scrollTop);
  matrix.a = a;
  matrix.b = b;
  matrix.c = c;
  matrix.d = d;
  chlidCloned.style.transform = matrix.toString();
}
function applyCssStyleWithOptions(cloned, context) {
  const { backgroundColor, width, height, style: styles2 } = context;
  const clonedStyle = cloned.style;
  if (backgroundColor)
    clonedStyle.setProperty("background-color", backgroundColor, "important");
  if (width)
    clonedStyle.setProperty("width", `${width}px`, "important");
  if (height)
    clonedStyle.setProperty("height", `${height}px`, "important");
  if (styles2) {
    for (const name in styles2) clonedStyle[name] = styles2[name];
  }
}
const NORMAL_ATTRIBUTE_RE = /^[\w-:]+$/;
async function cloneNode(node, context, isRoot = false, addWordToFontFamilies) {
  const { ownerDocument, ownerWindow, fontFamilies, onCloneEachNode } = context;
  if (ownerDocument && isTextNode(node)) {
    if (addWordToFontFamilies && /\S/.test(node.data)) {
      addWordToFontFamilies(node.data);
    }
    return ownerDocument.createTextNode(node.data);
  }
  if (ownerDocument && ownerWindow && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
    const cloned2 = await cloneElement(node, context);
    if (context.isEnable("removeAbnormalAttributes")) {
      const names = cloned2.getAttributeNames();
      for (let len = names.length, i = 0; i < len; i++) {
        const name = names[i];
        if (!NORMAL_ATTRIBUTE_RE.test(name)) {
          cloned2.removeAttribute(name);
        }
      }
    }
    const style = context.currentNodeStyle = copyCssStyles(node, cloned2, isRoot, context);
    if (isRoot)
      applyCssStyleWithOptions(cloned2, context);
    let copyScrollbar = false;
    if (context.isEnable("copyScrollbar")) {
      const overflow = [
        style.get("overflow-x")?.[0],
        style.get("overflow-y")?.[0]
      ];
      copyScrollbar = overflow.includes("scroll") || (overflow.includes("auto") || overflow.includes("overlay")) && (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth);
    }
    const textTransform = style.get("text-transform")?.[0];
    const families = splitFontFamily(style.get("font-family")?.[0]);
    const addWordToFontFamilies2 = families ? (word) => {
      if (textTransform === "uppercase") {
        word = word.toUpperCase();
      } else if (textTransform === "lowercase") {
        word = word.toLowerCase();
      } else if (textTransform === "capitalize") {
        word = word[0].toUpperCase() + word.substring(1);
      }
      families.forEach((family) => {
        let fontFamily = fontFamilies.get(family);
        if (!fontFamily) {
          fontFamilies.set(family, fontFamily = /* @__PURE__ */ new Set());
        }
        word.split("").forEach((text) => fontFamily.add(text));
      });
    } : void 0;
    copyPseudoClass(
      node,
      cloned2,
      copyScrollbar,
      context,
      addWordToFontFamilies2
    );
    copyInputValue(node, cloned2);
    if (!isVideoElement(node)) {
      await cloneChildNodes(
        node,
        cloned2,
        context,
        addWordToFontFamilies2
      );
    }
    await onCloneEachNode?.(cloned2);
    return cloned2;
  }
  const cloned = node.cloneNode(false);
  await cloneChildNodes(node, cloned, context);
  await onCloneEachNode?.(cloned);
  return cloned;
}
function destroyContext(context) {
  context.ownerDocument = void 0;
  context.ownerWindow = void 0;
  context.svgStyleElement = void 0;
  context.svgDefsElement = void 0;
  context.svgStyles.clear();
  context.defaultComputedStyles.clear();
  if (context.sandbox) {
    try {
      context.sandbox.remove();
    } catch (err) {
      context.log.warn("Failed to destroyContext", err);
    }
    context.sandbox = void 0;
  }
  context.workers = [];
  context.fontFamilies.clear();
  context.fontCssTexts.clear();
  context.requests.clear();
  context.tasks = [];
  context.shadowRoots = [];
}
function baseFetch(options) {
  const { url, timeout, responseType, ...requestInit } = options;
  const controller = new AbortController();
  const timer = timeout ? setTimeout(() => controller.abort(), timeout) : void 0;
  return fetch(url, { signal: controller.signal, ...requestInit }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed fetch, not 2xx response", { cause: response });
    }
    switch (responseType) {
      case "arrayBuffer":
        return response.arrayBuffer();
      case "dataUrl":
        return response.blob().then(blobToDataUrl);
      case "text":
      default:
        return response.text();
    }
  }).finally(() => clearTimeout(timer));
}
function contextFetch(context, options) {
  const { url: rawUrl, requestType = "text", responseType = "text", imageDom } = options;
  let url = rawUrl;
  const {
    timeout,
    acceptOfImage,
    requests,
    fetchFn,
    fetch: {
      requestInit,
      bypassingCache,
      placeholderImage
    },
    font,
    workers,
    fontFamilies
  } = context;
  if (requestType === "image" && (IN_SAFARI || IN_FIREFOX)) {
    context.drawImageCount++;
  }
  let request = requests.get(rawUrl);
  if (!request) {
    if (bypassingCache) {
      if (bypassingCache instanceof RegExp && bypassingCache.test(url)) {
        url += (/\?/.test(url) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
      }
    }
    const canFontMinify = requestType.startsWith("font") && font && font.minify;
    const fontTexts = /* @__PURE__ */ new Set();
    if (canFontMinify) {
      const families = requestType.split(";")[1].split(",");
      families.forEach((family) => {
        if (!fontFamilies.has(family))
          return;
        fontFamilies.get(family).forEach((text) => fontTexts.add(text));
      });
    }
    const needFontMinify = canFontMinify && fontTexts.size;
    const baseFetchOptions = {
      url,
      timeout,
      responseType: needFontMinify ? "arrayBuffer" : responseType,
      headers: requestType === "image" ? { accept: acceptOfImage } : void 0,
      ...requestInit
    };
    request = {
      type: requestType,
      resolve: void 0,
      reject: void 0,
      response: null
    };
    request.response = (async () => {
      if (fetchFn && requestType === "image") {
        const result = await fetchFn(rawUrl);
        if (result)
          return result;
      }
      if (!IN_SAFARI && rawUrl.startsWith("http") && workers.length) {
        return new Promise((resolve, reject) => {
          const worker = workers[requests.size & workers.length - 1];
          worker.postMessage({ rawUrl, ...baseFetchOptions });
          request.resolve = resolve;
          request.reject = reject;
        });
      }
      return baseFetch(baseFetchOptions);
    })().catch((error) => {
      requests.delete(rawUrl);
      if (requestType === "image" && placeholderImage) {
        context.log.warn("Failed to fetch image base64, trying to use placeholder image", url);
        return typeof placeholderImage === "string" ? placeholderImage : placeholderImage(imageDom);
      }
      throw error;
    });
    requests.set(rawUrl, request);
  }
  return request.response;
}
async function replaceCssUrlToDataUrl(cssText, baseUrl, context, isImage) {
  if (!hasCssUrl(cssText))
    return cssText;
  for (const [rawUrl, url] of parseCssUrls(cssText, baseUrl)) {
    try {
      const dataUrl = await contextFetch(
        context,
        {
          url,
          requestType: isImage ? "image" : "text",
          responseType: "dataUrl"
        }
      );
      cssText = cssText.replace(toRE(rawUrl), `$1${dataUrl}$3`);
    } catch (error) {
      context.log.warn("Failed to fetch css data url", rawUrl, error);
    }
  }
  return cssText;
}
function hasCssUrl(cssText) {
  return /url\((['"]?)([^'"]+?)\1\)/.test(cssText);
}
const URL_RE = /url\((['"]?)([^'"]+?)\1\)/g;
function parseCssUrls(cssText, baseUrl) {
  const result = [];
  cssText.replace(URL_RE, (raw, quotation, url) => {
    result.push([url, resolveUrl(url, baseUrl)]);
    return raw;
  });
  return result.filter(([url]) => !isDataUrl(url));
}
function toRE(url) {
  const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
}
const properties = [
  "background-image",
  "border-image-source",
  "-webkit-border-image",
  "-webkit-mask-image",
  "list-style-image"
];
function embedCssStyleImage(style, context) {
  return properties.map((property) => {
    const value = style.getPropertyValue(property);
    if (!value || value === "none") {
      return null;
    }
    if (IN_SAFARI || IN_FIREFOX) {
      context.drawImageCount++;
    }
    return replaceCssUrlToDataUrl(value, null, context, true).then((newValue) => {
      if (!newValue || value === newValue)
        return;
      style.setProperty(
        property,
        newValue,
        style.getPropertyPriority(property)
      );
    });
  }).filter(Boolean);
}
function embedImageElement(cloned, context) {
  if (isImageElement(cloned)) {
    const originalSrc = cloned.currentSrc || cloned.src;
    if (!isDataUrl(originalSrc)) {
      return [
        contextFetch(context, {
          url: originalSrc,
          imageDom: cloned,
          requestType: "image",
          responseType: "dataUrl"
        }).then((url) => {
          if (!url)
            return;
          cloned.srcset = "";
          cloned.dataset.originalSrc = originalSrc;
          cloned.src = url || "";
        })
      ];
    }
    if (IN_SAFARI || IN_FIREFOX) {
      context.drawImageCount++;
    }
  } else if (isSVGElementNode(cloned) && !isDataUrl(cloned.href.baseVal)) {
    const originalSrc = cloned.href.baseVal;
    return [
      contextFetch(context, {
        url: originalSrc,
        imageDom: cloned,
        requestType: "image",
        responseType: "dataUrl"
      }).then((url) => {
        if (!url)
          return;
        cloned.dataset.originalSrc = originalSrc;
        cloned.href.baseVal = url || "";
      })
    ];
  }
  return [];
}
function embedSvgUse(cloned, context) {
  const { ownerDocument, svgDefsElement } = context;
  const href = cloned.getAttribute("href") ?? cloned.getAttribute("xlink:href");
  if (!href)
    return [];
  const [svgUrl, id] = href.split("#");
  if (id) {
    const query = `#${id}`;
    const definition = context.shadowRoots.reduce(
      (res, root) => {
        return res ?? root.querySelector(`svg ${query}`);
      },
      ownerDocument?.querySelector(`svg ${query}`)
    );
    if (svgUrl) {
      cloned.setAttribute("href", query);
    }
    if (svgDefsElement?.querySelector(query))
      return [];
    if (definition) {
      svgDefsElement?.appendChild(definition.cloneNode(true));
      return [];
    } else if (svgUrl) {
      return [
        contextFetch(context, {
          url: svgUrl,
          responseType: "text"
        }).then((svgData) => {
          svgDefsElement?.insertAdjacentHTML("beforeend", svgData);
        })
      ];
    }
  }
  return [];
}
function embedNode(cloned, context) {
  const { tasks } = context;
  if (isElementNode(cloned)) {
    if (isImageElement(cloned) || isSVGImageElementNode(cloned)) {
      tasks.push(...embedImageElement(cloned, context));
    }
    if (isSVGUseElementNode(cloned)) {
      tasks.push(...embedSvgUse(cloned, context));
    }
  }
  if (isHTMLElementNode(cloned)) {
    tasks.push(...embedCssStyleImage(cloned.style, context));
  }
  cloned.childNodes.forEach((child) => {
    embedNode(child, context);
  });
}
async function embedWebFont(clone, context) {
  const {
    ownerDocument,
    svgStyleElement,
    fontFamilies,
    fontCssTexts,
    tasks,
    font
  } = context;
  if (!ownerDocument || !svgStyleElement || !fontFamilies.size) {
    return;
  }
  if (font && font.cssText) {
    const cssText = filterPreferredFormat(font.cssText, context);
    svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
  } else {
    const styleSheets = Array.from(ownerDocument.styleSheets).filter((styleSheet) => {
      try {
        return "cssRules" in styleSheet && Boolean(styleSheet.cssRules.length);
      } catch (error) {
        context.log.warn(`Error while reading CSS rules from ${styleSheet.href}`, error);
        return false;
      }
    });
    await Promise.all(
      styleSheets.flatMap((styleSheet) => {
        return Array.from(styleSheet.cssRules).map(async (cssRule, index) => {
          if (isCSSImportRule(cssRule)) {
            let importIndex = index + 1;
            const baseUrl = cssRule.href;
            let cssText = "";
            try {
              cssText = await contextFetch(context, {
                url: baseUrl,
                requestType: "text",
                responseType: "text"
              });
            } catch (error) {
              context.log.warn(`Error fetch remote css import from ${baseUrl}`, error);
            }
            const replacedCssText = cssText.replace(
              URL_RE,
              (raw, quotation, url) => raw.replace(url, resolveUrl(url, baseUrl))
            );
            for (const rule of parseCss(replacedCssText)) {
              try {
                styleSheet.insertRule(
                  rule,
                  rule.startsWith("@import") ? importIndex += 1 : styleSheet.cssRules.length
                );
              } catch (error) {
                context.log.warn("Error inserting rule from remote css import", { rule, error });
              }
            }
          }
        });
      })
    );
    const cssRules = styleSheets.flatMap((styleSheet) => Array.from(styleSheet.cssRules));
    cssRules.filter((cssRule) => isCssFontFaceRule(cssRule) && hasCssUrl(cssRule.style.getPropertyValue("src")) && splitFontFamily(cssRule.style.getPropertyValue("font-family"))?.some((val) => fontFamilies.has(val))).forEach((value) => {
      const rule = value;
      const cssText = fontCssTexts.get(rule.cssText);
      if (cssText) {
        svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
      } else {
        tasks.push(
          replaceCssUrlToDataUrl(
            rule.cssText,
            rule.parentStyleSheet ? rule.parentStyleSheet.href : null,
            context
          ).then((cssText2) => {
            cssText2 = filterPreferredFormat(cssText2, context);
            fontCssTexts.set(rule.cssText, cssText2);
            svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText2}
`));
          })
        );
      }
    });
  }
}
const COMMENTS_RE = /(\/\*[\s\S]*?\*\/)/g;
const KEYFRAMES_RE = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
function parseCss(source) {
  if (source == null)
    return [];
  const result = [];
  let cssText = source.replace(COMMENTS_RE, "");
  while (true) {
    const matches = KEYFRAMES_RE.exec(cssText);
    if (!matches)
      break;
    result.push(matches[0]);
  }
  cssText = cssText.replace(KEYFRAMES_RE, "");
  const IMPORT_RE = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
  const UNIFIED_RE = new RegExp(
    // eslint-disable-next-line
    "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",
    "gi"
  );
  while (true) {
    let matches = IMPORT_RE.exec(cssText);
    if (!matches) {
      matches = UNIFIED_RE.exec(cssText);
      if (!matches) {
        break;
      } else {
        IMPORT_RE.lastIndex = UNIFIED_RE.lastIndex;
      }
    } else {
      UNIFIED_RE.lastIndex = IMPORT_RE.lastIndex;
    }
    result.push(matches[0]);
  }
  return result;
}
const URL_WITH_FORMAT_RE = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
const FONT_SRC_RE = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function filterPreferredFormat(str, context) {
  const { font } = context;
  const preferredFormat = font ? font?.preferredFormat : void 0;
  return preferredFormat ? str.replace(FONT_SRC_RE, (match) => {
    while (true) {
      const [src, , format2] = URL_WITH_FORMAT_RE.exec(match) || [];
      if (!format2)
        return "";
      if (format2 === preferredFormat)
        return `src: ${src};`;
    }
  }) : str;
}
async function domToForeignObjectSvg(node, options) {
  const context = await orCreateContext(node, options);
  if (isElementNode(context.node) && isSVGElementNode(context.node))
    return context.node;
  const {
    ownerDocument,
    log,
    tasks,
    svgStyleElement,
    svgDefsElement,
    svgStyles,
    font,
    progress,
    autoDestruct,
    onCloneNode,
    onEmbedNode,
    onCreateForeignObjectSvg
  } = context;
  log.time("clone node");
  const clone = await cloneNode(context.node, context, true);
  if (svgStyleElement && ownerDocument) {
    let allCssText = "";
    svgStyles.forEach((klasses, cssText) => {
      allCssText += `${klasses.join(",\n")} {
  ${cssText}
}
`;
    });
    svgStyleElement.appendChild(ownerDocument.createTextNode(allCssText));
  }
  log.timeEnd("clone node");
  await onCloneNode?.(clone);
  if (font !== false && isElementNode(clone)) {
    log.time("embed web font");
    await embedWebFont(clone, context);
    log.timeEnd("embed web font");
  }
  log.time("embed node");
  embedNode(clone, context);
  const count = tasks.length;
  let current = 0;
  const runTask = async () => {
    while (true) {
      const task = tasks.pop();
      if (!task)
        break;
      try {
        await task;
      } catch (error) {
        context.log.warn("Failed to run task", error);
      }
      progress?.(++current, count);
    }
  };
  progress?.(current, count);
  await Promise.all([...Array.from({ length: 4 })].map(runTask));
  log.timeEnd("embed node");
  await onEmbedNode?.(clone);
  const svg = createForeignObjectSvg(clone, context);
  svgDefsElement && svg.insertBefore(svgDefsElement, svg.children[0]);
  svgStyleElement && svg.insertBefore(svgStyleElement, svg.children[0]);
  autoDestruct && destroyContext(context);
  await onCreateForeignObjectSvg?.(svg);
  return svg;
}
function createForeignObjectSvg(clone, context) {
  const { width, height } = context;
  const svg = createSvg(width, height, clone.ownerDocument);
  const foreignObject = svg.ownerDocument.createElementNS(svg.namespaceURI, "foreignObject");
  foreignObject.setAttributeNS(null, "x", "0%");
  foreignObject.setAttributeNS(null, "y", "0%");
  foreignObject.setAttributeNS(null, "width", "100%");
  foreignObject.setAttributeNS(null, "height", "100%");
  foreignObject.append(clone);
  svg.appendChild(foreignObject);
  return svg;
}
async function domToCanvas(node, options) {
  const context = await orCreateContext(node, options);
  const svg = await domToForeignObjectSvg(context);
  const dataUrl = svgToDataUrl(svg, context.isEnable("removeControlCharacter"));
  if (!context.autoDestruct) {
    context.svgStyleElement = createStyleElement(context.ownerDocument);
    context.svgDefsElement = context.ownerDocument?.createElementNS(XMLNS, "defs");
    context.svgStyles.clear();
  }
  const image = createImage(dataUrl, svg.ownerDocument);
  return await imageToCanvas(image, context);
}
async function domToDataUrl(node, options) {
  const context = await orCreateContext(node, options);
  const { log, quality, type, dpi } = context;
  const canvas = await domToCanvas(context);
  log.time("canvas to data url");
  let dataUrl = canvas.toDataURL(type, quality);
  if (["image/png", "image/jpeg"].includes(type) && dpi && SUPPORT_ATOB && SUPPORT_BTOA) {
    const [format2, body] = dataUrl.split(",");
    let headerLength = 0;
    let overwritepHYs = false;
    if (type === "image/png") {
      const b64Index = detectPhysChunkFromDataUrl(body);
      if (b64Index >= 0) {
        headerLength = Math.ceil((b64Index + 28) / 3) * 4;
        overwritepHYs = true;
      } else {
        headerLength = 33 / 3 * 4;
      }
    } else if (type === "image/jpeg") {
      headerLength = 18 / 3 * 4;
    }
    const stringHeader = body.substring(0, headerLength);
    const restOfData = body.substring(headerLength);
    const headerBytes = window.atob(stringHeader);
    const uint8Array = new Uint8Array(headerBytes.length);
    for (let i = 0; i < uint8Array.length; i++) {
      uint8Array[i] = headerBytes.charCodeAt(i);
    }
    const finalArray = type === "image/png" ? changePngDpi(uint8Array, dpi, overwritepHYs) : changeJpegDpi(uint8Array, dpi);
    const base64Header = window.btoa(String.fromCharCode(...finalArray));
    dataUrl = [format2, ",", base64Header, restOfData].join("");
  }
  log.timeEnd("canvas to data url");
  return dataUrl;
}
async function domToPng(node, options) {
  return domToDataUrl(
    await orCreateContext(node, { ...options, type: "image/png" })
  );
}
function useConversationExport() {
  const [isExporting, setIsExporting] = reactExports.useState(false);
  const exportToDataURL = reactExports.useCallback(async (element, options) => {
    setIsExporting(true);
    try {
      const dataURL = await domToPng(element, {
        scale: options?.scale ?? 2,
        backgroundColor: options?.backgroundColor ?? "#ffffff",
        filter: (node) => {
          if (node instanceof HTMLElement && node.dataset.exportIgnore === "true") {
            return false;
          }
          return true;
        }
      });
      return dataURL;
    } finally {
      setIsExporting(false);
    }
  }, []);
  const saveToFile = reactExports.useCallback((dataURL, filename) => {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const finalFilename = filename ?? `conversation-${timestamp}.png`;
    const link = document.createElement("a");
    link.download = finalFilename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  const copyToClipboard = reactExports.useCallback(async (dataURL) => {
    return writeImageToClipboard(dataURL);
  }, []);
  return {
    isExporting,
    exportToDataURL,
    saveToFile,
    copyToClipboard
  };
}
function ShareWindow() {
  const { t } = useI18n();
  const { isMac } = usePlatformContext();
  const previewRef = reactExports.useRef(null);
  const { isExporting, exportToDataURL, saveToFile, copyToClipboard } = useConversationExport();
  const [shareData, setShareData] = reactExports.useState(null);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [includeHeader, setIncludeHeader] = reactExports.useState(true);
  const [includeTimestamp, setIncludeTimestamp] = reactExports.useState(false);
  const [previewDataUrl, setPreviewDataUrl] = reactExports.useState(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleShareData = (_event, data) => {
      setShareData(data);
      if (data.messages.length > 0) {
        setSelectedIds(new Set(data.messages.map((m) => m.id)));
      }
    };
    window.ipcRenderer.on("share-data", handleShareData);
    window.ipcRenderer.send("share-window-ready");
    return () => {
      window.ipcRenderer.off("share-data", handleShareData);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!shareData || selectedIds.size === 0) {
      setPreviewDataUrl(null);
      return;
    }
    const generatePreview = async () => {
      setIsGeneratingPreview(true);
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (previewRef.current) {
        try {
          const computedStyle = getComputedStyle(document.documentElement);
          const bgColor = computedStyle.getPropertyValue("--background").trim();
          const backgroundColor = bgColor.startsWith("hsl") || bgColor.includes(" ") ? `hsl(${bgColor})` : bgColor || "#ffffff";
          const dataUrl = await exportToDataURL(previewRef.current, {
            scale: 1,
            backgroundColor
          });
          setPreviewDataUrl(dataUrl);
        } catch (error) {
          console.error("Failed to generate preview:", error);
        }
      }
      setIsGeneratingPreview(false);
    };
    const debounceTimer = setTimeout(generatePreview, 300);
    return () => clearTimeout(debounceTimer);
  }, [shareData, selectedIds, includeHeader, includeTimestamp, exportToDataURL]);
  const handleSaveToFile = reactExports.useCallback(async () => {
    if (!previewRef.current || selectedIds.size === 0) return;
    try {
      const computedStyle = getComputedStyle(document.documentElement);
      const bgColor = computedStyle.getPropertyValue("--background").trim();
      const backgroundColor = bgColor.startsWith("hsl") || bgColor.includes(" ") ? `hsl(${bgColor})` : bgColor || "#ffffff";
      const dataUrl = await exportToDataURL(previewRef.current, {
        scale: 2,
        backgroundColor
      });
      saveToFile(dataUrl);
      toast.success(t("share.savedToFile"));
    } catch (error) {
      console.error("Failed to export:", error);
      toast.error(t("share.exportFailed"));
    }
  }, [selectedIds, exportToDataURL, saveToFile, t]);
  const handleCopyToClipboard = reactExports.useCallback(async () => {
    if (!previewRef.current || selectedIds.size === 0) return;
    try {
      const computedStyle = getComputedStyle(document.documentElement);
      const bgColor = computedStyle.getPropertyValue("--background").trim();
      const backgroundColor = bgColor.startsWith("hsl") || bgColor.includes(" ") ? `hsl(${bgColor})` : bgColor || "#ffffff";
      const dataUrl = await exportToDataURL(previewRef.current, {
        scale: 2,
        backgroundColor
      });
      const success = await copyToClipboard(dataUrl);
      if (success) {
        toast.success(t("share.copiedToClipboard"));
      } else {
        toast.error(t("share.copyFailed"));
      }
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error(t("share.copyFailed"));
    }
  }, [selectedIds, exportToDataURL, copyToClipboard, t]);
  const previewOptions = {
    includeHeader,
    includeTimestamp,
    title: shareData?.title
  };
  const messages = shareData?.messages ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/80 backdrop-blur-sm",
        style: { WebkitAppRegion: "drag" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: isMac ? "pl-16" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold", children: t("share.title") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WindowControls, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden flex flex-col p-4 gap-4", children: !shareData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSelector, { messages, selectedIds, onSelectionChange: setSelectedIds }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 py-2 border-t border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: includeHeader, onCheckedChange: (checked) => setIncludeHeader(checked === true) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: t("share.includeHeader") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: includeTimestamp, onCheckedChange: (checked) => setIncludeTimestamp(checked === true) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: t("share.includeTimestamp") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t("share.preview") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t("share.previewHint") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full min-h-[200px] rounded-md border bg-muted/30 overflow-hidden", children: selectedIds.size === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-muted-foreground", children: t("share.noMessagesSelected") }) : isGeneratingPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" }) }) : previewDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(TransformWrapper, { initialScale: 0.5, minScale: 0.1, maxScale: 2, centerOnInit: true, wheel: { step: 0.1 }, children: ({ zoomIn: zoomIn2, zoomOut: zoomOut2, resetTransform: resetTransform2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 z-10 flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "icon", className: "size-7", onClick: () => zoomIn2(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "size-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "icon", className: "size-7", onClick: () => zoomOut2(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "size-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "icon", className: "size-7", onClick: () => resetTransform2(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TransformComponent,
            {
              wrapperClass: "!w-full !h-full",
              contentClass: "!w-full !h-full flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewDataUrl, alt: "Preview", className: "shadow-lg rounded" })
            }
          )
        ] }) }) : null })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => window.windowControls?.close(), children: t("common.cancel") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleCopyToClipboard, disabled: selectedIds.size === 0 || isExporting, children: [
          isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-4 mr-2" }),
          t("share.copyToClipboard")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSaveToFile, disabled: selectedIds.size === 0 || isExporting, children: [
          isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4 mr-2" }),
          t("share.saveAsPng")
        ] })
      ] })
    ] }) }),
    shareData && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          left: "-9999px",
          top: 0,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SharePreview, { ref: previewRef, messages, selectedIds, options: previewOptions })
      }
    )
  ] });
}
initObservability();
function ThemedToaster() {
  const { effectiveTheme } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", theme: effectiveTheme });
}
function ShareApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SWRConfig, { value: swrConfig, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShareWindow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemedToaster, {})
  ] }) }) });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShareApp, {}) })
);
window.ipcRenderer?.on("main-process-message", (_event, message2) => {
  console.log(message2);
});
