!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "alma@0.4.378" };
  } catch (e4) {
  }
}();
;
{
  try {
    (function() {
      var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "a74996e0-4bfe-4e76-b747-3fe357236cf0", e._sentryDebugIdIdentifier = "sentry-dbid-a74996e0-4bfe-4e76-b747-3fe357236cf0");
    })();
  } catch (e) {
  }
}
;
const fu = "strudel.log";
let m9 = 1e3, cc, lc;
function Si(e, t = "cyclist") {
  gt(`[${t}] error: ${e.message}`);
}
function gt(e, t, n = {}) {
  let s = performance.now();
  cc === e && s - lc < m9 || (cc = e, lc = s, console.log(`%c${e}`, "background-color: black;color:white;border-radius:15px"), typeof document < "u" && typeof CustomEvent < "u" && document.dispatchEvent(
    new CustomEvent(fu, {
      detail: {
        message: e,
        type: t,
        data: n
      }
    })
  ));
}
gt.key = fu;
typeof BigInt > "u" && (BigInt = function(e) {
  if (isNaN(e)) throw new Error("");
  return e;
});
const le = BigInt(0), Fe = BigInt(1), bi = BigInt(2), Ra = BigInt(5), Lt = BigInt(10), f9 = 2e3, Q = {
  s: Fe,
  n: le,
  d: Fe
};
function wn(e, t) {
  try {
    e = BigInt(e);
  } catch {
    throw Yn();
  }
  return e * t;
}
function en(e) {
  return typeof e == "bigint" ? e : Math.floor(e);
}
function st(e, t) {
  if (t === le)
    throw yu();
  const n = Object.create(Qe.prototype);
  n.s = e < le ? -Fe : Fe, e = e < le ? -e : e;
  const s = ss(e, t);
  return n.n = e / s, n.d = t / s, n;
}
function Fs(e) {
  const t = {};
  let n = e, s = bi, i = Ra - Fe;
  for (; i <= n; ) {
    for (; n % s === le; )
      n /= s, t[s] = (t[s] || le) + Fe;
    i += Fe + bi * s++;
  }
  return n !== e ? n > 1 && (t[n] = (t[n] || le) + Fe) : t[e] = (t[e] || le) + Fe, t;
}
const ft = function(e, t) {
  let n = le, s = Fe, i = Fe;
  if (e != null) if (t !== void 0) {
    if (typeof e == "bigint")
      n = e;
    else {
      if (isNaN(e))
        throw Yn();
      if (e % 1 !== 0)
        throw dc();
      n = BigInt(e);
    }
    if (typeof t == "bigint")
      s = t;
    else {
      if (isNaN(t))
        throw Yn();
      if (t % 1 !== 0)
        throw dc();
      s = BigInt(t);
    }
    i = n * s;
  } else if (typeof e == "object") {
    if ("d" in e && "n" in e)
      n = BigInt(e.n), s = BigInt(e.d), "s" in e && (n *= BigInt(e.s));
    else if (0 in e)
      n = BigInt(e[0]), 1 in e && (s = BigInt(e[1]));
    else if (typeof e == "bigint")
      n = e;
    else
      throw Yn();
    i = n * s;
  } else if (typeof e == "number") {
    if (isNaN(e))
      throw Yn();
    if (e < 0 && (i = -Fe, e = -e), e % 1 === 0)
      n = BigInt(e);
    else if (e > 0) {
      let r = 1, a = 0, u = 1, o = 1, c = 1, l = 1e7;
      for (e >= 1 && (r = 10 ** Math.floor(1 + Math.log10(e)), e /= r); u <= l && c <= l; ) {
        let p = (a + o) / (u + c);
        if (e === p) {
          u + c <= l ? (n = a + o, s = u + c) : c > u ? (n = o, s = c) : (n = a, s = u);
          break;
        } else
          e > p ? (a += o, u += c) : (o += a, c += u), u > l ? (n = o, s = c) : (n = a, s = u);
      }
      n = BigInt(n) * BigInt(r), s = BigInt(s);
    }
  } else if (typeof e == "string") {
    let r = 0, a = le, u = le, o = le, c = Fe, l = Fe, p = e.replace(/_/g, "").match(/\d+|./g);
    if (p === null)
      throw Yn();
    if (p[r] === "-" ? (i = -Fe, r++) : p[r] === "+" && r++, p.length === r + 1 ? u = wn(p[r++], i) : p[r + 1] === "." || p[r] === "." ? (p[r] !== "." && (a = wn(p[r++], i)), r++, (r + 1 === p.length || p[r + 1] === "(" && p[r + 3] === ")" || p[r + 1] === "'" && p[r + 3] === "'") && (u = wn(p[r], i), c = Lt ** BigInt(p[r].length), r++), (p[r] === "(" && p[r + 2] === ")" || p[r] === "'" && p[r + 2] === "'") && (o = wn(p[r + 1], i), l = Lt ** BigInt(p[r + 1].length) - Fe, r += 3)) : p[r + 1] === "/" || p[r + 1] === ":" ? (u = wn(p[r], i), c = wn(p[r + 2], Fe), r += 3) : p[r + 3] === "/" && p[r + 1] === " " && (a = wn(p[r], i), u = wn(p[r + 2], i), c = wn(p[r + 4], Fe), r += 5), p.length <= r)
      s = c * l, i = /* void */
      n = o + s * a + l * u;
    else
      throw Yn();
  } else if (typeof e == "bigint")
    n = e, i = e, s = Fe;
  else
    throw Yn();
  if (s === le)
    throw yu();
  Q.s = i < le ? -Fe : Fe, Q.n = n < le ? -n : n, Q.d = s < le ? -s : s;
};
function y9(e, t, n) {
  let s = Fe;
  for (; t > le; e = e * e % n, t >>= Fe)
    t & Fe && (s = s * e % n);
  return s;
}
function g9(e, t) {
  for (; t % bi === le; t /= bi)
    ;
  for (; t % Ra === le; t /= Ra)
    ;
  if (t === Fe)
    return le;
  let n = Lt % t, s = 1;
  for (; n !== Fe; s++)
    if (n = n * Lt % t, s > f9)
      return le;
  return BigInt(s);
}
function b9(e, t, n) {
  let s = Fe, i = y9(Lt, n, t);
  for (let r = 0; r < 300; r++) {
    if (s === i)
      return BigInt(r);
    s = s * Lt % t, i = i * Lt % t;
  }
  return 0;
}
function ss(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  for (; ; ) {
    if (e %= t, !e)
      return t;
    if (t %= e, !t)
      return e;
  }
}
function Qe(e, t) {
  if (ft(e, t), this instanceof Qe)
    e = ss(Q.d, Q.n), this.s = Q.s, this.n = Q.n / e, this.d = Q.d / e;
  else
    return st(Q.s * Q.n, Q.d);
}
var yu = function() {
  return new Error("Division by Zero");
}, Yn = function() {
  return new Error("Invalid argument");
}, dc = function() {
  return new Error("Parameters must be integer");
};
Qe.prototype = {
  s: Fe,
  n: le,
  d: Fe,
  /**
   * Calculates the absolute value
   *
   * Ex: new Fraction(-4).abs() => 4
   **/
  abs: function() {
    return st(this.n, this.d);
  },
  /**
   * Inverts the sign of the current fraction
   *
   * Ex: new Fraction(-4).neg() => 4
   **/
  neg: function() {
    return st(-this.s * this.n, this.d);
  },
  /**
   * Adds two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
   **/
  add: function(e, t) {
    return ft(e, t), st(
      this.s * this.n * Q.d + Q.s * this.d * Q.n,
      this.d * Q.d
    );
  },
  /**
   * Subtracts two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
   **/
  sub: function(e, t) {
    return ft(e, t), st(
      this.s * this.n * Q.d - Q.s * this.d * Q.n,
      this.d * Q.d
    );
  },
  /**
   * Multiplies two rational numbers
   *
   * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
   **/
  mul: function(e, t) {
    return ft(e, t), st(
      this.s * Q.s * this.n * Q.n,
      this.d * Q.d
    );
  },
  /**
   * Divides two rational numbers
   *
   * Ex: new Fraction("-17.(345)").inverse().div(3)
   **/
  div: function(e, t) {
    return ft(e, t), st(
      this.s * Q.s * this.n * Q.d,
      this.d * Q.n
    );
  },
  /**
   * Clones the actual object
   *
   * Ex: new Fraction("-17.(345)").clone()
   **/
  clone: function() {
    return st(this.s * this.n, this.d);
  },
  /**
   * Calculates the modulo of two rational numbers - a more precise fmod
   *
   * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
   * Ex: new Fraction(20, 10).mod().equals(0) ? "is Integer"
   **/
  mod: function(e, t) {
    if (e === void 0)
      return st(this.s * this.n % this.d, Fe);
    if (ft(e, t), le === Q.n * this.d)
      throw yu();
    return st(
      this.s * (Q.d * this.n) % (Q.n * this.d),
      Q.d * this.d
    );
  },
  /**
   * Calculates the fractional gcd of two rational numbers
   *
   * Ex: new Fraction(5,8).gcd(3,7) => 1/56
   */
  gcd: function(e, t) {
    return ft(e, t), st(ss(Q.n, this.n) * ss(Q.d, this.d), Q.d * this.d);
  },
  /**
   * Calculates the fractional lcm of two rational numbers
   *
   * Ex: new Fraction(5,8).lcm(3,7) => 15
   */
  lcm: function(e, t) {
    return ft(e, t), Q.n === le && this.n === le ? st(le, Fe) : st(Q.n * this.n, ss(Q.n, this.n) * ss(Q.d, this.d));
  },
  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   *
   * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
   **/
  inverse: function() {
    return st(this.s * this.d, this.n);
  },
  /**
   * Calculates the fraction to some integer exponent
   *
   * Ex: new Fraction(-1,2).pow(-3) => -8
   */
  pow: function(e, t) {
    if (ft(e, t), Q.d === Fe)
      return Q.s < le ? st((this.s * this.d) ** Q.n, this.n ** Q.n) : st((this.s * this.n) ** Q.n, this.d ** Q.n);
    if (this.s < le) return null;
    let n = Fs(this.n), s = Fs(this.d), i = Fe, r = Fe;
    for (let a in n)
      if (a !== "1") {
        if (a === "0") {
          i = le;
          break;
        }
        if (n[a] *= Q.n, n[a] % Q.d === le)
          n[a] /= Q.d;
        else return null;
        i *= BigInt(a) ** n[a];
      }
    for (let a in s)
      if (a !== "1") {
        if (s[a] *= Q.n, s[a] % Q.d === le)
          s[a] /= Q.d;
        else return null;
        r *= BigInt(a) ** s[a];
      }
    return Q.s < le ? st(r, i) : st(i, r);
  },
  /**
   * Calculates the logarithm of a fraction to a given rational base
   *
   * Ex: new Fraction(27, 8).log(9, 4) => 3/2
   */
  log: function(e, t) {
    if (ft(e, t), this.s <= le || Q.s <= le) return null;
    const n = {}, s = Fs(Q.n), i = Fs(Q.d), r = Fs(this.n), a = Fs(this.d);
    for (const c in i)
      s[c] = (s[c] || le) - i[c];
    for (const c in a)
      r[c] = (r[c] || le) - a[c];
    for (const c in s)
      c !== "1" && (n[c] = true);
    for (const c in r)
      c !== "1" && (n[c] = true);
    let u = null, o = null;
    for (const c in n) {
      const l = s[c] || le, p = r[c] || le;
      if (l === le) {
        if (p !== le)
          return null;
        continue;
      }
      let m = p, g = l;
      const y = ss(m, g);
      if (m /= y, g /= y, u === null && o === null)
        u = m, o = g;
      else if (m * o !== u * g)
        return null;
    }
    return u !== null && o !== null ? st(u, o) : null;
  },
  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  equals: function(e, t) {
    return ft(e, t), this.s * this.n * Q.d === Q.s * Q.n * this.d;
  },
  /**
   * Check if this rational number is less than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  lt: function(e, t) {
    return ft(e, t), this.s * this.n * Q.d < Q.s * Q.n * this.d;
  },
  /**
   * Check if this rational number is less than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  lte: function(e, t) {
    return ft(e, t), this.s * this.n * Q.d <= Q.s * Q.n * this.d;
  },
  /**
   * Check if this rational number is greater than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  gt: function(e, t) {
    return ft(e, t), this.s * this.n * Q.d > Q.s * Q.n * this.d;
  },
  /**
   * Check if this rational number is greater than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  gte: function(e, t) {
    return ft(e, t), this.s * this.n * Q.d >= Q.s * Q.n * this.d;
  },
  /**
   * Compare two rational numbers
   * < 0 iff this < that
   * > 0 iff this > that
   * = 0 iff this = that
   *
   * Ex: new Fraction(19.6).compare([98, 5]);
   **/
  compare: function(e, t) {
    ft(e, t);
    let n = this.s * this.n * Q.d - Q.s * Q.n * this.d;
    return (le < n) - (n < le);
  },
  /**
   * Calculates the ceil of a rational number
   *
   * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
   **/
  ceil: function(e) {
    return e = Lt ** BigInt(e || 0), st(
      en(this.s * e * this.n / this.d) + (e * this.n % this.d > le && this.s >= le ? Fe : le),
      e
    );
  },
  /**
   * Calculates the floor of a rational number
   *
   * Ex: new Fraction('4.(3)').floor() => (4 / 1)
   **/
  floor: function(e) {
    return e = Lt ** BigInt(e || 0), st(
      en(this.s * e * this.n / this.d) - (e * this.n % this.d > le && this.s < le ? Fe : le),
      e
    );
  },
  /**
   * Rounds a rational numbers
   *
   * Ex: new Fraction('4.(3)').round() => (4 / 1)
   **/
  round: function(e) {
    return e = Lt ** BigInt(e || 0), st(
      en(this.s * e * this.n / this.d) + this.s * ((this.s >= le ? Fe : le) + bi * (e * this.n % this.d) > this.d ? Fe : le),
      e
    );
  },
  /**
    * Rounds a rational number to a multiple of another rational number
    *
    * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
    **/
  roundTo: function(e, t) {
    ft(e, t);
    const n = this.n * Q.d, s = this.d * Q.n, i = n % s;
    let r = en(n / s);
    return i + i >= s && r++, st(this.s * r * Q.n, Q.d);
  },
  /**
   * Check if two rational numbers are divisible
   *
   * Ex: new Fraction(19.6).divisible(1.5);
   */
  divisible: function(e, t) {
    return ft(e, t), !(!(Q.n * this.d) || this.n * Q.d % (Q.n * this.d));
  },
  /**
   * Returns a decimal representation of the fraction
   *
   * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
   **/
  valueOf: function() {
    return Number(this.s * this.n) / Number(this.d);
  },
  /**
   * Creates a string representation of a fraction with all digits
   *
   * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
   **/
  toString: function(e) {
    let t = this.n, n = this.d;
    e = e || 15;
    let s = g9(t, n), i = b9(t, n, s), r = this.s < le ? "-" : "";
    if (r += en(t / n), t %= n, t *= Lt, t && (r += "."), s) {
      for (let a = i; a--; )
        r += en(t / n), t %= n, t *= Lt;
      r += "(";
      for (let a = s; a--; )
        r += en(t / n), t %= n, t *= Lt;
      r += ")";
    } else
      for (let a = e; t && a--; )
        r += en(t / n), t %= n, t *= Lt;
    return r;
  },
  /**
   * Returns a string-fraction representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
   **/
  toFraction: function(e) {
    let t = this.n, n = this.d, s = this.s < le ? "-" : "";
    if (n === Fe)
      s += t;
    else {
      let i = en(t / n);
      e && i > le && (s += i, s += " ", t %= n), s += t, s += "/", s += n;
    }
    return s;
  },
  /**
   * Returns a latex representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
   **/
  toLatex: function(e) {
    let t = this.n, n = this.d, s = this.s < le ? "-" : "";
    if (n === Fe)
      s += t;
    else {
      let i = en(t / n);
      e && i > le && (s += i, t %= n), s += "\\frac{", s += t, s += "}{", s += n, s += "}";
    }
    return s;
  },
  /**
   * Returns an array of continued fraction elements
   *
   * Ex: new Fraction("7/8").toContinued() => [0,1,7]
   */
  toContinued: function() {
    let e = this.n, t = this.d, n = [];
    do {
      n.push(en(e / t));
      let s = e % t;
      e = t, t = s;
    } while (e !== Fe);
    return n;
  },
  simplify: function(e) {
    const t = BigInt(1 / (e || 1e-3) | 0), n = this.abs(), s = n.toContinued();
    for (let i = 1; i < s.length; i++) {
      let r = st(s[i - 1], Fe);
      for (let u = i - 2; u >= 0; u--)
        r = r.inverse().add(s[u]);
      let a = r.sub(n);
      if (a.n * t < a.d)
        return r.mul(this.s);
    }
    return this;
  }
};
const M9 = (e) => /^[a-gA-G][#bsf]*[0-9]*$/.test(e), fs = (e) => /^[a-gA-G][#bsf]*-?[0-9]*$/.test(e), kl = (e) => {
  if (typeof e != "string")
    return [];
  const [t, n = "", s] = e.match(/^([a-gA-G])([#bsf]*)(-?[0-9]*)$/)?.slice(1) || [];
  return t ? [t, n, s ? Number(s) : void 0] : [];
}, C9 = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }, x9 = { "#": 1, b: -1, s: 1, f: -1 }, gu = (e) => e?.split("").reduce((t, n) => t + x9[n], 0) || 0, yn = (e, t = 3) => {
  const [n, s, i = t] = kl(e);
  if (!n)
    throw new Error('not a note: "' + e + '"');
  const r = C9[n.toLowerCase()], a = gu(s);
  return (Number(i) + 1) * 12 + r + a;
}, ds = (e) => Math.pow(2, (e - 69) / 12) * 440, bu = (e) => 12 * Math.log(e / 440) / Math.LN2 + 69, G9 = (e, t) => {
  if (typeof e != "object")
    throw new Error("valueToMidi: expected object value");
  let { freq: n, note: s } = e;
  if (typeof n == "number")
    return bu(n);
  if (typeof s == "string")
    return yn(s);
  if (typeof s == "number")
    return s;
  if (!t)
    throw new Error("valueToMidi: expected freq or note to be set");
  return t;
}, v9 = (e, t) => (e - t) * 1e3, zl = (e) => ds(typeof e == "number" ? e : yn(e)), P9 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], A9 = (e) => {
  const t = Math.floor(e / 12) - 1;
  return P9[e % 12] + t;
}, Ut = (e, t) => (e % t + t) % t, Nl = (e) => e.reduce((t, n) => t + n) / e.length;
function Wl(e, t = 0) {
  return isNaN(Number(e)) ? (gt(`"${e}" is not a number, falling back to ${t}`, "warning"), t) : e;
}
const F9 = (e, t) => Ut(Math.round(Wl(e ?? 0, 0)), t), X9 = (e) => {
  let { value: t, context: n } = e, s = t;
  if (typeof s == "object" && !Array.isArray(s) && (s = s.note || s.n || s.value, s === void 0))
    throw new Error(`cannot find a playable note for ${JSON.stringify(t)}`);
  if (typeof s == "number" && n.type !== "frequency")
    s = ds(e.value);
  else if (typeof s == "number" && n.type === "frequency")
    s = e.value;
  else if (typeof s != "string" || !fs(s))
    throw new Error("not a note: " + JSON.stringify(s));
  return s;
}, Tl = (e) => {
  let { value: t, context: n } = e;
  if (typeof t == "object")
    return t.freq ? t.freq : zl(t.note || t.n || t.value);
  if (typeof t == "number" && n.type !== "frequency")
    t = ds(e.value);
  else if (typeof t == "string" && fs(t))
    t = ds(yn(e.value));
  else if (typeof t != "number")
    throw new Error("not a note or frequency: " + t);
  return t;
}, Il = (e, t) => e.slice(t).concat(e.slice(0, t)), _l = (...e) => e.reduce(
  (t, n) => (...s) => t(n(...s)),
  (t) => t
), D9 = (...e) => _l(...e.reverse()), ys = (e) => e.filter((t) => t != null), En = (e) => [].concat(...e), Ds = (e) => e, S9 = (e, t) => e, wi = (e, t) => Array.from({ length: t - e + 1 }, (n, s) => s + e);
function Xe(e, t, n = e.length) {
  const s = function i(...r) {
    if (r.length >= n)
      return e.apply(this, r);
    {
      const a = function(...u) {
        return i.apply(this, r.concat(u));
      };
      return t && t(a, r), a;
    }
  };
  return t && t(s, []), s;
}
function Mu(e) {
  const t = Number(e);
  if (!isNaN(t))
    return t;
  if (fs(e))
    return yn(e);
  throw new Error(`cannot parse as numeral: "${e}"`);
}
function Cu(e, t) {
  return (...n) => e(...n.map(t));
}
function kt(e) {
  return Cu(e, Mu);
}
function Yl(e) {
  const t = Number(e);
  if (!isNaN(t))
    return t;
  const n = {
    pi: Math.PI,
    w: 1,
    h: 0.5,
    q: 0.25,
    e: 0.125,
    s: 0.0625,
    t: 1 / 3,
    f: 0.2,
    x: 1 / 6
  }[e];
  if (typeof n < "u")
    return n;
  throw new Error(`cannot parse as fractional: "${e}"`);
}
const w9 = (e) => Cu(e, Yl), xu = function(e, t) {
  return [t.slice(0, e), t.slice(e)];
}, gr = (e, t, n) => t.map((s, i) => e(s, n[i])), Hl = function(e) {
  const t = [];
  for (let n = 0; n < e.length - 1; ++n)
    t.push([e[n], e[n + 1]]);
  return t;
}, br = (e, t, n) => Math.min(Math.max(e, t), n), Z9 = ["Do", "Reb", "Re", "Mib", "Mi", "Fa", "Solb", "Sol", "Lab", "La", "Sib", "Si"], E9 = [
  "Sa",
  "Re",
  "Ga",
  "Ma",
  "Pa",
  "Dha",
  "Ni"
], L9 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Hb", "H"], R9 = [
  "Ni",
  "Pab",
  "Pa",
  "Voub",
  "Vou",
  "Ga",
  "Dib",
  "Di",
  "Keb",
  "Ke",
  "Zob",
  "Zo"
], B9 = [
  "I",
  "Ro",
  "Ha",
  "Ni",
  "Ho",
  "He",
  "To"
], V9 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], k9 = (e, t = "letters") => {
  const s = (t === "solfeggio" ? Z9 : t === "indian" ? E9 : t === "german" ? L9 : t === "byzantine" ? R9 : t === "japanese" ? B9 : V9)[e % 12], i = Math.floor(e / 12) - 1;
  return s + i;
};
function z9(e) {
  var t = {};
  return e.filter(function(n) {
    return t.hasOwn(n) ? false : t[n] = true;
  });
}
function N9(e) {
  return e.sort().filter(function(t, n, s) {
    return !n || t != s[n - 1];
  });
}
function Kl(e) {
  return e.sort((t, n) => t.compare(n)).filter(function(t, n, s) {
    return !n || t.ne(s[n - 1]);
  });
}
function jl(e) {
  const t = new TextEncoder().encode(e);
  return btoa(String.fromCharCode(...t));
}
function Ul(e) {
  const t = new Uint8Array(
    atob(e).split("").map((s) => s.charCodeAt(0))
  );
  return new TextDecoder().decode(t);
}
function W9(e) {
  return encodeURIComponent(jl(e));
}
function T9(e) {
  return Ul(decodeURIComponent(e));
}
function Ol(e, t) {
  return Array.isArray(e) ? e.map(t) : Object.fromEntries(Object.entries(e).map(([n, s], i) => [n, t(s, n, i)]));
}
function Ba(e, t) {
  return e / t;
}
class Jl {
  constructor({
    getTargetClockTime: t = _9,
    weight: n = 16,
    offsetDelta: s = 5e-3,
    checkAfterTime: i = 2,
    resetAfterTime: r = 8
  }) {
    this.offsetTime, this.timeAtPrevOffsetSample, this.prevOffsetTimes = [], this.getTargetClockTime = t, this.weight = n, this.offsetDelta = s, this.checkAfterTime = i, this.resetAfterTime = r, this.reset = () => {
      this.prevOffsetTimes = [], this.offsetTime = null, this.timeAtPrevOffsetSample = null;
    };
  }
  calculateOffset(t) {
    const n = this.getTargetClockTime(), s = n - this.timeAtPrevOffsetSample, i = n - t;
    if (s > this.resetAfterTime && this.reset(), this.offsetTime == null && (this.offsetTime = i), this.prevOffsetTimes.push(i), this.prevOffsetTimes.length > this.weight && this.prevOffsetTimes.shift(), this.timeAtPrevOffsetSample == null || s > this.checkAfterTime) {
      this.timeAtPrevOffsetSample = n;
      const r = Nl(this.prevOffsetTimes);
      Math.abs(r - this.offsetTime) > this.offsetDelta && (this.offsetTime = r);
    }
    return this.offsetTime;
  }
  calculateTimestamp(t, n) {
    return this.calculateOffset(t) + n;
  }
}
function I9() {
  return performance.now() * 1e-3;
}
function _9() {
  return Date.now() * 1e-3;
}
const Ql = /* @__PURE__ */ new Map([
  ["control", "Control"],
  ["ctrl", "Control"],
  ["alt", "Alt"],
  ["shift", "Shift"],
  ["down", "ArrowDown"],
  ["up", "ArrowUp"],
  ["left", "ArrowLeft"],
  ["right", "ArrowRight"]
]);
let ti;
function ql() {
  if (ti == null) {
    if (typeof window > "u")
      return;
    ti = {}, window.addEventListener("keydown", (e) => {
      ti[e.key] = true;
    }), window.addEventListener("keyup", (e) => {
      ti[e.key] = false;
    });
  }
  return { ...ti };
}
function Gu(e, t = false) {
  return typeof e == "object" ? t ? JSON.stringify(e).slice(1, -1).replaceAll('"', "").replaceAll(",", " ") : JSON.stringify(e) : e;
}
Qe.prototype.sam = function() {
  return this.floor();
};
Qe.prototype.nextSam = function() {
  return this.sam().add(1);
};
Qe.prototype.wholeCycle = function() {
  return new ct(this.sam(), this.nextSam());
};
Qe.prototype.cyclePos = function() {
  return this.sub(this.sam());
};
Qe.prototype.lt = function(e) {
  return this.compare(e) < 0;
};
Qe.prototype.gt = function(e) {
  return this.compare(e) > 0;
};
Qe.prototype.lte = function(e) {
  return this.compare(e) <= 0;
};
Qe.prototype.gte = function(e) {
  return this.compare(e) >= 0;
};
Qe.prototype.eq = function(e) {
  return this.compare(e) == 0;
};
Qe.prototype.ne = function(e) {
  return this.compare(e) != 0;
};
Qe.prototype.max = function(e) {
  return this.gt(e) ? this : e;
};
Qe.prototype.maximum = function(...e) {
  return e = e.map((t) => new Qe(t)), e.reduce((t, n) => n.max(t), this);
};
Qe.prototype.min = function(e) {
  return this.lt(e) ? this : e;
};
Qe.prototype.mulmaybe = function(e) {
  return e !== void 0 ? this.mul(e) : void 0;
};
Qe.prototype.divmaybe = function(e) {
  return e !== void 0 ? this.div(e) : void 0;
};
Qe.prototype.addmaybe = function(e) {
  return e !== void 0 ? this.add(e) : void 0;
};
Qe.prototype.submaybe = function(e) {
  return e !== void 0 ? this.sub(e) : void 0;
};
Qe.prototype.show = function() {
  return this.s * this.n + "/" + this.d;
};
Qe.prototype.or = function(e) {
  return this.eq(0) ? e : this;
};
const U = (e) => Qe(e), Y9 = (...e) => {
  if (e = ys(e), e.length !== 0)
    return e.reduce((t, n) => t.gcd(n), U(1));
}, rn = (...e) => {
  if (e = ys(e), e.length === 0)
    return;
  const t = e.pop();
  return e.reduce(
    (n, s) => n === void 0 || s === void 0 ? void 0 : n.lcm(s),
    t
  );
}, H9 = (e) => e instanceof Qe;
U._original = Qe;
class ct {
  constructor(t, n) {
    this.begin = U(t), this.end = U(n);
  }
  get spanCycles() {
    const t = [];
    var n = this.begin;
    const s = this.end, i = s.sam();
    if (n.equals(s))
      return [new ct(n, s)];
    for (; s.gt(n); ) {
      if (n.sam().equals(i)) {
        t.push(new ct(n, this.end));
        break;
      }
      const r = n.nextSam();
      t.push(new ct(n, r)), n = r;
    }
    return t;
  }
  get duration() {
    return this.end.sub(this.begin);
  }
  cycleArc() {
    const t = this.begin.cyclePos(), n = t.add(this.duration);
    return new ct(t, n);
  }
  withTime(t) {
    return new ct(t(this.begin), t(this.end));
  }
  withEnd(t) {
    return new ct(this.begin, t(this.end));
  }
  withCycle(t) {
    const n = this.begin.sam(), s = n.add(t(this.begin.sub(n))), i = n.add(t(this.end.sub(n)));
    return new ct(s, i);
  }
  intersection(t) {
    const n = this.begin.max(t.begin), s = this.end.min(t.end);
    if (!n.gt(s) && !(n.equals(s) && (n.equals(this.end) && this.begin.lt(this.end) || n.equals(t.end) && t.begin.lt(t.end))))
      return new ct(n, s);
  }
  intersection_e(t) {
    const n = this.intersection(t);
    if (n == null)
      throw "TimeSpans do not intersect";
    return n;
  }
  midpoint() {
    return this.begin.add(this.duration.div(U(2)));
  }
  equals(t) {
    return this.begin.equals(t.begin) && this.end.equals(t.end);
  }
  show() {
    return this.begin.show() + " → " + this.end.show();
  }
}
class et {
  /*
        Event class, representing a value active during the timespan
        'part'. This might be a fragment of an event, in which case the
        timespan will be smaller than the 'whole' timespan, otherwise the
        two timespans will be the same. The 'part' must never extend outside of the
        'whole'. If the event represents a continuously changing value
        then the whole will be returned as None, in which case the given
        value will have been sampled from the point halfway between the
        start and end of the 'part' timespan.
        The context is to store a list of source code locations causing the event.
  
        The word 'Event' is more or less a reserved word in javascript, hence this
        class is named called 'Hap'.
        */
  constructor(t, n, s, i = {}, r = false) {
    this.whole = t, this.part = n, this.value = s, this.context = i, this.stateful = r, r && console.assert(typeof this.value == "function", "Stateful values must be functions");
  }
  get duration() {
    let t;
    return typeof this.value?.duration == "number" ? t = U(this.value.duration) : t = this.whole.end.sub(this.whole.begin), typeof this.value?.clip == "number" ? t.mul(this.value.clip) : t;
  }
  get endClipped() {
    return this.whole.begin.add(this.duration);
  }
  isActive(t) {
    return this.whole.begin <= t && this.endClipped >= t;
  }
  isInPast(t) {
    return t > this.endClipped;
  }
  isInNearPast(t, n) {
    return n - t <= this.endClipped;
  }
  isInFuture(t) {
    return t < this.whole.begin;
  }
  isInNearFuture(t, n) {
    return n < this.whole.begin && n > this.whole.begin - t;
  }
  isWithinTime(t, n) {
    return this.whole.begin <= n && this.endClipped >= t;
  }
  wholeOrPart() {
    return this.whole ? this.whole : this.part;
  }
  withSpan(t) {
    const n = this.whole ? t(this.whole) : void 0;
    return new et(n, t(this.part), this.value, this.context);
  }
  withValue(t) {
    return new et(this.whole, this.part, t(this.value), this.context);
  }
  hasOnset() {
    return this.whole != null && this.whole.begin.equals(this.part.begin);
  }
  hasTag(t) {
    return this.context.tags?.includes(t);
  }
  resolveState(t) {
    if (this.stateful && this.hasOnset()) {
      console.log("stateful");
      const n = this.value, [s, i] = n(t);
      return [s, new et(this.whole, this.part, i, this.context, false)];
    }
    return [t, this];
  }
  spanEquals(t) {
    return this.whole == null && t.whole == null || this.whole.equals(t.whole);
  }
  equals(t) {
    return this.spanEquals(t) && this.part.equals(t.part) && // TODO would == be better ??
    this.value === t.value;
  }
  show(t = false) {
    const n = typeof this.value == "object" ? t ? JSON.stringify(this.value).slice(1, -1).replaceAll('"', "").replaceAll(",", " ") : JSON.stringify(this.value) : this.value;
    var s = "";
    if (this.whole == null)
      s = "~" + this.part.show;
    else {
      var i = this.whole.begin.equals(this.part.begin) && this.whole.end.equals(this.part.end);
      this.whole.begin.equals(this.part.begin) || (s = this.whole.begin.show() + " ⇜ "), i || (s += "("), s += this.part.show(), i || (s += ")"), this.whole.end.equals(this.part.end) || (s += " ⇝ " + this.whole.end.show());
    }
    return "[ " + s + " | " + n + " ]";
  }
  showWhole(t = false) {
    return `${this.whole == null ? "~" : this.whole.show()}: ${Gu(this.value, t)}`;
  }
  combineContext(t) {
    const n = this;
    return { ...n.context, ...t.context, locations: (n.context.locations || []).concat(t.context.locations || []) };
  }
  setContext(t) {
    return new et(this.whole, this.part, this.value, t);
  }
  ensureObjectValue() {
    if (typeof this.value != "object")
      throw new Error(
        `expected hap.value to be an object, but got "${this.value}". Hint: append .note() or .s() to the end`,
        "error"
      );
  }
}
class Es {
  constructor(t, n = {}) {
    this.span = t, this.controls = n;
  }
  // Returns new State with different span
  setSpan(t) {
    return new Es(t, this.controls);
  }
  withSpan(t) {
    return this.setSpan(t(this.span));
  }
  // Returns new State with added controls.
  setControls(t) {
    return new Es(this.span, { ...this.controls, ...t });
  }
}
function K9(e, t, n) {
  if (t?.value !== void 0 && Object.keys(t).length === 1)
    return gt("[warn]: Can't do arithmetic on control pattern."), e;
  const s = Object.keys(e).filter((i) => Object.keys(t).includes(i));
  return Object.assign({}, e, t, Object.fromEntries(s.map((i) => [i, n(e[i], t[i])])));
}
Xe((e, t) => e * t);
Xe((e, t) => t.map(e));
function $l(e, t = 60) {
  let n = 0, s = U(0), i = [""], r = "";
  for (; i[0].length < t; ) {
    const a = e.queryArc(n, n + 1), u = a.filter((l) => l.hasOnset()).map((l) => l.duration), o = Y9(...u), c = o.inverse();
    i = i.map((l) => l + "|"), r += "|";
    for (let l = 0; l < c; l++) {
      const [p, m] = [s, s.add(o)], g = a.filter((x) => x.whole.begin.lte(p) && x.whole.end.gte(m)), y = g.length - i.length;
      y > 0 && (i = i.concat(Array(y).fill(r))), i = i.map((x, v) => {
        const E = g[v];
        if (E) {
          const V = E.whole.begin.eq(p) ? "" + E.value : "-";
          return x + V;
        }
        return x + ".";
      }), r += ".", s = s.add(o);
    }
    n++;
  }
  return i.join(`
`);
}
const vu = {}, rr = async (...e) => {
  const t = await Promise.allSettled(e), n = t.filter((s) => s.status === "fulfilled").map((s) => s.value);
  return t.forEach((s, i) => {
    s.status === "rejected" && console.warn(`evalScope: module with index ${i} could not be loaded:`, s.reason);
  }), n.forEach((s) => {
    Object.entries(s).forEach(([i, r]) => {
      globalThis[i] = r, vu[i] = r;
    });
  }), n;
};
function j9(e, t = {}) {
  const { wrapExpression: n = true, wrapAsync: s = true } = t;
  n && (e = `{${e}}`), s && (e = `(async ()=>${e})()`);
  const i = `"use strict";return (${e})`;
  return Function(i)();
}
const e0 = async (e, t, n) => {
  let s = {};
  if (t) {
    const a = t(e, n);
    e = a.output, s = a;
  }
  return { mode: "javascript", pattern: await j9(e, { wrapExpression: !!t }), meta: s };
};
let Va, Tt = true;
const U9 = function(e) {
  Tt = !!e;
}, t0 = (e) => Va = e;
let _ = class yt {
  /**
   * Create a pattern. As an end user, you will most likely not create a Pattern directly.
   *
   * @param {function} query - The function that maps a `State` to an array of `Hap`.
   * @noAutocomplete
   */
  constructor(t, n = void 0) {
    this.query = t, this._Pattern = true, this._steps = n;
  }
  get _steps() {
    return this.__steps;
  }
  set _steps(t) {
    this.__steps = t === void 0 ? void 0 : U(t);
  }
  setSteps(t) {
    return this._steps = t, this;
  }
  withSteps(t) {
    return Tt ? new yt(this.query, this._steps === void 0 ? void 0 : t(this._steps)) : this;
  }
  get hasSteps() {
    return this._steps !== void 0;
  }
  //////////////////////////////////////////////////////////////////////
  // Haskell-style functor, applicative and monadic operations
  /**
   * Returns a new pattern, with the function applied to the value of
   * each hap. It has the alias `fmap`.
   * @synonyms fmap
   * @param {Function} func to to apply to the value
   * @returns Pattern
   * @example
   * "0 1 2".withValue(v => v + 10).log()
   */
  withValue(t) {
    const n = new yt((s) => this.query(s).map((i) => i.withValue(t)));
    return n._steps = this._steps, n;
  }
  // runs func on query state
  withState(t) {
    return new yt((n) => this.query(t(n)));
  }
  /**
   * see `withValue`
   * @noAutocomplete
   */
  fmap(t) {
    return this.withValue(t);
  }
  /**
   * Assumes 'this' is a pattern of functions, and given a function to
   * resolve wholes, applies a given pattern of values to that
   * pattern of functions.
   * @param {Function} whole_func
   * @param {Function} func
   * @noAutocomplete
   * @returns Pattern
   */
  appWhole(t, n) {
    const s = this, i = function(r) {
      const a = s.query(r), u = n.query(r), o = function(c, l) {
        const p = c.part.intersection(l.part);
        if (p != null)
          return new et(
            t(c.whole, l.whole),
            p,
            c.value(l.value),
            l.combineContext(c)
          );
      };
      return En(
        a.map((c) => ys(u.map((l) => o(c, l))))
      );
    };
    return new yt(i);
  }
  /**
   * When this method is called on a pattern of functions, it matches its haps
   * with those in the given pattern of values.  A new pattern is returned, with
   * each matching value applied to the corresponding function.
   *
   * In this `_appBoth` variant, where timespans of the function and value haps
   * are not the same but do intersect, the resulting hap has a timespan of the
   * intersection. This applies to both the part and the whole timespan.
   * @param {Pattern} pat_val
   * @noAutocomplete
   * @returns Pattern
   */
  appBoth(t) {
    const n = this, s = function(r, a) {
      if (!(r == null || a == null))
        return r.intersection_e(a);
    }, i = n.appWhole(s, t);
    return Tt && (i._steps = rn(t._steps, n._steps)), i;
  }
  /**
   * As with `appBoth`, but the `whole` timespan is not the intersection,
   * but the timespan from the function of patterns that this method is called
   * on. In practice, this means that the pattern structure, including onsets,
   * are preserved from the pattern of functions (often referred to as the left
   * hand or inner pattern).
   * @param {Pattern} pat_val
   * @noAutocomplete
   * @returns Pattern
   */
  appLeft(t) {
    const n = this, s = function(r) {
      const a = [];
      for (const u of n.query(r)) {
        const o = t.query(r.setSpan(u.wholeOrPart()));
        for (const c of o) {
          const l = u.whole, p = u.part.intersection(c.part);
          if (p) {
            const m = u.value(c.value), g = c.combineContext(u), y = new et(l, p, m, g);
            a.push(y);
          }
        }
      }
      return a;
    }, i = new yt(s);
    return i._steps = this._steps, i;
  }
  /**
   * As with `appLeft`, but `whole` timespans are instead taken from the
   * pattern of values, i.e. structure is preserved from the right hand/outer
   * pattern.
   * @param {Pattern} pat_val
   * @noAutocomplete
   * @returns Pattern
   */
  appRight(t) {
    const n = this, s = function(r) {
      const a = [];
      for (const u of t.query(r)) {
        const o = n.query(r.setSpan(u.wholeOrPart()));
        for (const c of o) {
          const l = u.whole, p = c.part.intersection(u.part);
          if (p) {
            const m = c.value(u.value), g = u.combineContext(c), y = new et(l, p, m, g);
            a.push(y);
          }
        }
      }
      return a;
    }, i = new yt(s);
    return i._steps = t._steps, i;
  }
  bindWhole(t, n) {
    const s = this, i = function(r) {
      const a = function(o, c) {
        return new et(
          t(o.whole, c.whole),
          c.part,
          c.value,
          Object.assign({}, o.context, c.context, {
            locations: (o.context.locations || []).concat(c.context.locations || [])
          })
        );
      }, u = function(o) {
        return n(o.value).query(r.setSpan(o.part)).map((c) => a(o, c));
      };
      return En(s.query(r).map((o) => u(o)));
    };
    return new yt(i);
  }
  bind(t) {
    const n = function(s, i) {
      if (!(s == null || i == null))
        return s.intersection_e(i);
    };
    return this.bindWhole(n, t);
  }
  join() {
    return this.bind(Ds);
  }
  outerBind(t) {
    return this.bindWhole((n) => n, t).setSteps(this._steps);
  }
  outerJoin() {
    return this.outerBind(Ds);
  }
  innerBind(t) {
    return this.bindWhole((n, s) => s, t);
  }
  innerJoin() {
    return this.innerBind(Ds);
  }
  // Flatterns patterns of patterns, by retriggering/resetting inner patterns at onsets of outer pattern haps
  resetJoin(t = false) {
    const n = this;
    return new yt((s) => n.discreteOnly().query(s).map((i) => i.value.late(t ? i.whole.begin : i.whole.begin.cyclePos()).query(s).map(
      (r) => new et(
        // Supports continuous haps in the inner pattern
        r.whole ? r.whole.intersection(i.whole) : void 0,
        r.part.intersection(i.part),
        r.value
      ).setContext(i.combineContext(r))
    ).filter((r) => r.part)).flat());
  }
  restartJoin() {
    return this.resetJoin(true);
  }
  // Like the other joins above, joins a pattern of patterns of values, into a flatter
  // pattern of values. In this case it takes whole cycles of the inner pattern to fit each event
  // in the outer pattern.
  squeezeJoin() {
    const t = this;
    function n(s) {
      const i = t.discreteOnly().query(s);
      function r(u) {
        const c = u.value._focusSpan(u.wholeOrPart()).query(s.setSpan(u.part));
        function l(p, m) {
          let g;
          if (m.whole && p.whole && (g = m.whole.intersection(p.whole), !g))
            return;
          const y = m.part.intersection(p.part);
          if (!y)
            return;
          const x = m.combineContext(p);
          return new et(g, y, m.value, x);
        }
        return c.map((p) => l(u, p));
      }
      return En(i.map(r)).filter((u) => u);
    }
    return new yt(n);
  }
  squeezeBind(t) {
    return this.fmap(t).squeezeJoin();
  }
  polyJoin = function() {
    const t = this;
    return t.fmap((n) => n.extend(t._steps.div(n._steps))).outerJoin();
  };
  polyBind(t) {
    return this.fmap(t).polyJoin();
  }
  //////////////////////////////////////////////////////////////////////
  // Utility methods mainly for internal use
  /**
   * Query haps inside the given time span.
   *
   * @param {Fraction | number} begin from time
   * @param {Fraction | number} end to time
   * @returns Hap[]
   * @example
   * const pattern = sequence('a', ['b', 'c'])
   * const haps = pattern.queryArc(0, 1)
   * console.log(haps)
   * silence
   * @noAutocomplete
   */
  queryArc(t, n, s = {}) {
    try {
      return this.query(new Es(new ct(t, n), s));
    } catch (i) {
      return Si(i, "query"), [];
    }
  }
  /**
   * Returns a new pattern, with queries split at cycle boundaries. This makes
   * some calculations easier to express, as all haps are then constrained to
   * happen within a cycle.
   * @returns Pattern
   * @noAutocomplete
   */
  splitQueries() {
    const t = this, n = (s) => En(s.span.spanCycles.map((i) => t.query(s.setSpan(i))));
    return new yt(n);
  }
  /**
   * Returns a new pattern, where the given function is applied to the query
   * timespan before passing it to the original pattern.
   * @param {Function} func the function to apply
   * @returns Pattern
   * @noAutocomplete
   */
  withQuerySpan(t) {
    return new yt((n) => this.query(n.withSpan(t)));
  }
  withQuerySpanMaybe(t) {
    const n = this;
    return new yt((s) => {
      const i = s.withSpan(t);
      return i.span ? n.query(i) : [];
    });
  }
  /**
   * As with `withQuerySpan`, but the function is applied to both the
   * begin and end time of the query timespan.
   * @param {Function} func the function to apply
   * @returns Pattern
   * @noAutocomplete
   */
  withQueryTime(t) {
    return new yt((n) => this.query(n.withSpan((s) => s.withTime(t))));
  }
  /**
   * Similar to `withQuerySpan`, but the function is applied to the timespans
   * of all haps returned by pattern queries (both `part` timespans, and where
   * present, `whole` timespans).
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withHapSpan(t) {
    return new yt((n) => this.query(n).map((s) => s.withSpan(t)));
  }
  /**
   * As with `withHapSpan`, but the function is applied to both the
   * begin and end time of the hap timespans.
   * @param {Function} func the function to apply
   * @returns Pattern
   * @noAutocomplete
   */
  withHapTime(t) {
    return this.withHapSpan((n) => n.withTime(t));
  }
  /**
   * Returns a new pattern with the given function applied to the list of haps returned by every query.
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withHaps(t) {
    const n = new yt((s) => t(this.query(s), s));
    return n._steps = this._steps, n;
  }
  /**
   * As with `withHaps`, but applies the function to every hap, rather than every list of haps.
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withHap(t) {
    return this.withHaps((n) => n.map(t));
  }
  /**
   * Returns a new pattern with the context field set to every hap set to the given value.
   * @param {*} context
   * @returns Pattern
   * @noAutocomplete
   */
  setContext(t) {
    return this.withHap((n) => n.setContext(t));
  }
  /**
   * Returns a new pattern with the given function applied to the context field of every hap.
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withContext(t) {
    const n = this.withHap((s) => s.setContext(t(s.context)));
    return this.__pure !== void 0 && (n.__pure = this.__pure, n.__pure_loc = this.__pure_loc), n;
  }
  /**
   * Returns a new pattern with the context field of every hap set to an empty object.
   * @returns Pattern
   * @noAutocomplete
   */
  stripContext() {
    return this.withHap((t) => t.setContext({}));
  }
  /**
   * Returns a new pattern with the given location information added to the
   * context of every hap.
   * @param {Number} start start offset
   * @param {Number} end end offset
   * @returns Pattern
   * @noAutocomplete
   */
  withLoc(t, n) {
    const s = {
      start: t,
      end: n
    }, i = this.withContext((r) => {
      const a = (r.locations || []).concat([s]);
      return { ...r, locations: a };
    });
    return this.__pure && (i.__pure = this.__pure, i.__pure_loc = s), i;
  }
  /**
   * Returns a new Pattern, which only returns haps that meet the given test.
   * @param {Function} hap_test - a function which returns false for haps to be removed from the pattern
   * @returns Pattern
   * @example
   * s("bd*8").velocity(rand).filterHaps((h) => (h.whole.begin % 1) < h.value.velocity)
   */
  filterHaps(t) {
    return new yt((n) => this.query(n).filter(t));
  }
  /**
   * As with `filterHaps`, but the function is applied to values
   * inside haps.
   * @param {Function} value_test
   * @returns Pattern
   * @example
   * const drums = s("bd sd bd sd")
   * kick: drums.filterValues((v) => v.s === 'bd').duck(2)
   * snare: drums.filterValues((v) => v.s === 'sd')
   * bass: s("saw!4").note("G#1").lpf(80).lpenv(4).orbit(2)
   */
  filterValues(t) {
    return new yt((n) => this.query(n).filter((s) => t(s.value))).setSteps(this._steps);
  }
  /**
   * Returns a new pattern, with haps containing undefined values removed from
   * query results.
   * @returns Pattern
   * @noAutocomplete
   */
  removeUndefineds() {
    return this.filterValues((t) => t != null);
  }
  /**
   * Returns a new pattern, with all haps without onsets filtered out. A hap
   * with an onset is one with a `whole` timespan that begins at the same time
   * as its `part` timespan.
   * @returns Pattern
   * @noAutocomplete
   */
  onsetsOnly() {
    return this.filterHaps((t) => t.hasOnset());
  }
  /**
   * Returns a new pattern, with 'continuous' haps (those without 'whole'
   * timespans) removed from query results.
   * @returns Pattern
   * @noAutocomplete
   */
  discreteOnly() {
    return this.filterHaps((t) => t.whole);
  }
  /**
   * Combines adjacent haps with the same value and whole.  Only
   * intended for use in tests.
   * @noAutocomplete
   */
  defragmentHaps() {
    return this.discreteOnly().withHaps((n) => {
      const s = [];
      for (var i = 0; i < n.length; ++i) {
        for (var r = true, a = n[i]; r; ) {
          const c = JSON.stringify(n[i].value);
          for (var u = false, o = i + 1; o < n.length; o++) {
            const l = n[o];
            if (a.whole.equals(l.whole)) {
              if (a.part.begin.eq(l.part.end)) {
                if (c === JSON.stringify(l.value)) {
                  a = new et(a.whole, new ct(l.part.begin, a.part.end), a.value), n.splice(o, 1), u = true;
                  break;
                }
              } else if (l.part.begin.eq(a.part.end) && c == JSON.stringify(l.value)) {
                a = new et(a.whole, new ct(a.part.begin, l.part.end), a.value), n.splice(o, 1), u = true;
                break;
              }
            }
          }
          r = u;
        }
        s.push(a);
      }
      return s;
    });
  }
  /**
   * Queries the pattern for the first cycle, returning Haps. Mainly of use when
   * debugging a pattern.
   * @param {Boolean} with_context - set to true, otherwise the context field
   * will be stripped from the resulting haps.
   * @returns [Hap]
   * @noAutocomplete
   */
  firstCycle(t = false) {
    var n = this;
    return t || (n = n.stripContext()), n.query(new Es(new ct(U(0), U(1))));
  }
  /**
   * Accessor for a list of values returned by querying the first cycle.
   * @noAutocomplete
   */
  get firstCycleValues() {
    return this.firstCycle().map((t) => t.value);
  }
  /**
   * More human-readable version of the `firstCycleValues` accessor.
   * @noAutocomplete
   */
  get showFirstCycle() {
    return this.firstCycle().map(
      (t) => `${t.value}: ${t.whole.begin.toFraction()} - ${t.whole.end.toFraction()}`
    );
  }
  /**
   * Returns a new pattern, which returns haps sorted in temporal order. Mainly
   * of use when comparing two patterns for equality, in tests.
   * @returns Pattern
   * @noAutocomplete
   */
  sortHapsByPart() {
    return this.withHaps(
      (t) => t.sort(
        (n, s) => n.part.begin.sub(s.part.begin).or(n.part.end.sub(s.part.end)).or(n.whole.begin.sub(s.whole.begin).or(n.whole.end.sub(s.whole.end)))
      )
    );
  }
  asNumber() {
    return this.fmap(Mu);
  }
  //////////////////////////////////////////////////////////////////////
  // Operators - see 'make composers' later..
  _opIn(t, n) {
    return this.fmap(n).appLeft(j(t));
  }
  _opOut(t, n) {
    return this.fmap(n).appRight(j(t));
  }
  _opMix(t, n) {
    return this.fmap(n).appBoth(j(t));
  }
  _opSqueeze(t, n) {
    const s = j(t);
    return this.fmap((i) => s.fmap((r) => n(i)(r))).squeezeJoin();
  }
  _opSqueezeOut(t, n) {
    const s = this;
    return j(t).fmap((r) => s.fmap((a) => n(a)(r))).squeezeJoin();
  }
  _opReset(t, n) {
    return j(t).fmap((i) => this.fmap((r) => n(r)(i))).resetJoin();
  }
  _opRestart(t, n) {
    return j(t).fmap((i) => this.fmap((r) => n(r)(i))).restartJoin();
  }
  _opPoly(t, n) {
    const s = j(t);
    return this.fmap((i) => s.fmap((r) => n(r)(i))).polyJoin();
  }
  //////////////////////////////////////////////////////////////////////
  // End-user methods.
  // Those beginning with an underscore (_) are 'patternified',
  // i.e. versions are created without the underscore, that are
  // magically transformed to accept patterns for all their arguments.
  //////////////////////////////////////////////////////////////////////
  // Methods without corresponding toplevel functions
  /**
   * Layers the result of the given function(s). Like `superimpose`, but without the original pattern:
   * @name layer
   * @memberof Pattern
   * @synonyms apply
   * @returns Pattern
   * @example
   * "<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
   *   .layer(x=>x.add("0,2"))
   *   .scale('C minor').note()
   */
  layer(...t) {
    return tt(...t.map((n) => n(this)));
  }
  /**
   * Superimposes the result of the given function(s) on top of the original pattern:
   * @name superimpose
   * @memberof Pattern
   * @returns Pattern
   * @example
   * "<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
   *   .superimpose(x=>x.add(2))
   *   .scale('C minor').note()
   */
  superimpose(...t) {
    return this.stack(...t.map((n) => n(this)));
  }
  //////////////////////////////////////////////////////////////////////
  // Multi-pattern functions
  stack(...t) {
    return tt(this, ...t);
  }
  sequence(...t) {
    return on(this, ...t);
  }
  seq(...t) {
    return on(this, ...t);
  }
  cat(...t) {
    return Mi(this, ...t);
  }
  fastcat(...t) {
    return Ft(this, ...t);
  }
  slowcat(...t) {
    return Qn(this, ...t);
  }
  //////////////////////////////////////////////////////////////////////
  // Context methods - ones that deal with metadata
  onTrigger(t, n = true) {
    return this.withHap(
      (s) => s.setContext({
        ...s.context,
        onTrigger: (...i) => {
          s.context.onTrigger?.(...i), t(...i);
        },
        // if dominantTrigger is set to true, the default output (webaudio) will be disabled
        // when using multiple triggers, you cannot flip this flag to false again!
        // example: x.csound('CooLSynth').log() as well as x.log().csound('CooLSynth') should work the same
        dominantTrigger: s.context.dominantTrigger || n
      })
    );
  }
  /**
   * Writes the content of the current event to the console (visible in the side menu).
   * @name log
   * @memberof Pattern
   * @example
   * s("bd sd").log()
   */
  log(t = (s) => `[hap] ${s.showWhole(true)}`, n = (s) => ({ hap: s })) {
    return this.onTrigger((...s) => {
      gt(t(...s), void 0, n(...s));
    }, false);
  }
  /**
   * A simplified version of `log` which writes all "values" (various configurable parameters)
   * within the event to the console (visible in the side menu).
   * @name logValues
   * @memberof Pattern
   * @example
   * s("bd sd").gain("0.25 0.5 1").n("2 1 0").logValues()
   */
  logValues(t = (n) => `[hap] ${Gu(n, true)}`) {
    return this.log((n) => t(n.value));
  }
  //////////////////////////////////////////////////////////////////////
  // Visualisation
  drawLine() {
    return console.log($l(this)), this;
  }
  //////////////////////////////////////////////////////////////////////
  // methods relating to breaking patterns into subcycles
  // Breaks a pattern into a pattern of patterns, according to the structure of the given binary pattern.
  unjoin(t, n = Ds) {
    return t.withHap(
      (s) => s.withValue((i) => i ? n(this.ribbon(s.whole.begin, s.whole.duration)) : this)
    );
  }
  /**
   * Breaks a pattern into pieces according to the structure of a given pattern.
   * True values in the given pattern cause the corresponding subcycle of the
   * source pattern to be looped, and for an (optional) given function to be
   * applied. False values result in the corresponding part of the source pattern
   * to be played unchanged.
   * @name into
   * @memberof Pattern
   * @example
   * sound("bd sd ht lt").into("1 0", hurry(2))
   */
  into(t, n) {
    return this.unjoin(t, n).innerJoin();
  }
};
function O9(e, t) {
  let n = [];
  return t.forEach((s) => {
    const i = n.findIndex(([r]) => e(s, r));
    i === -1 ? n.push([s]) : n[i].push(s);
  }), n;
}
const J9 = (e, t) => e.spanEquals(t);
_.prototype.collect = function() {
  return this.withHaps(
    (e) => O9(J9, e).map((t) => new et(t[0].whole, t[0].part, t, {}))
  );
};
const Q9 = B("arpWith", (e, t) => t.collect().fmap((n) => j(e(n))).innerJoin().withHap((n) => new et(n.whole, n.part, n.value.value, n.combineContext(n.value)))), q9 = B(
  "arp",
  (e, t) => t.arpWith((n) => j(e).fmap((s) => n[s % n.length])),
  false
);
function ji(e) {
  return !Array.isArray(e) && typeof e == "object" && !H9(e);
}
function $9(e, t, n) {
  return ji(e) || ji(t) ? (ji(e) || (e = { value: e }), ji(t) || (t = { value: t }), K9(e, t, n)) : n(e, t);
}
(function() {
  const e = {
    set: [(n, s) => s],
    keep: [(n) => n],
    keepif: [(n, s) => s ? n : void 0],
    // numerical functions
    /**
     *
     * Assumes a pattern of numbers. Adds the given number to each item in the pattern.
     * @name add
     * @memberof Pattern
     * @example
     * // Here, the triad 0, 2, 4 is shifted by different amounts
     * n("0 2 4".add("<0 3 4 0>")).scale("C:major")
     * // Without add, the equivalent would be:
     * // n("<[0 2 4] [3 5 7] [4 6 8] [0 2 4]>").scale("C:major")
     * @example
     * // You can also use add with notes:
     * note("c3 e3 g3".add("<0 5 7 0>"))
     * // Behind the scenes, the notes are converted to midi numbers:
     * // note("48 52 55".add("<0 5 7 0>"))
     */
    add: [kt((n, s) => n + s)],
    // support string concatenation
    /**
     *
     * Like add, but the given numbers are subtracted.
     * @name sub
     * @memberof Pattern
     * @example
     * n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
     * // See add for more information.
     */
    sub: [kt((n, s) => n - s)],
    /**
     *
     * Multiplies each number by the given factor.
     * @name mul
     * @memberof Pattern
     * @example
     * "<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
     */
    mul: [kt((n, s) => n * s)],
    /**
     *
     * Divides each number by the given factor.
     * @name div
     * @memberof Pattern
     */
    div: [kt((n, s) => n / s)],
    mod: [kt(Ut)],
    pow: [kt(Math.pow)],
    log2: [kt(Math.log2)],
    band: [kt((n, s) => n & s)],
    bor: [kt((n, s) => n | s)],
    bxor: [kt((n, s) => n ^ s)],
    blshift: [kt((n, s) => n << s)],
    brshift: [kt((n, s) => n >> s)],
    // TODO - force numerical comparison if both look like numbers?
    lt: [(n, s) => n < s],
    gt: [(n, s) => n > s],
    lte: [(n, s) => n <= s],
    gte: [(n, s) => n >= s],
    eq: [(n, s) => n == s],
    eqt: [(n, s) => n === s],
    ne: [(n, s) => n != s],
    net: [(n, s) => n !== s],
    and: [(n, s) => n && s],
    or: [(n, s) => n || s],
    //  bitwise ops
    func: [(n, s) => s(n)]
  }, t = ["In", "Out", "Mix", "Squeeze", "SqueezeOut", "Reset", "Restart", "Poly"];
  for (const [n, [s, i]] of Object.entries(e)) {
    _.prototype["_" + n] = function(r) {
      return this.fmap((a) => s(a, r));
    }, Object.defineProperty(_.prototype, n, {
      // a getter that returns a function, so 'pat' can be
      // accessed by closures that are methods of that function..
      get: function() {
        const r = this, a = (...u) => r[n].in(...u);
        for (const u of t)
          a[u.toLowerCase()] = function(...o) {
            var c = r;
            o = on(o), i && (c = i(c), o = i(o));
            var l;
            return n === "keepif" ? (l = c["_op" + u](o, (p) => (m) => s(p, m)), l = l.removeUndefineds()) : l = c["_op" + u](o, (p) => (m) => $9(p, m, s)), l;
          };
        return a.squeezein = a.squeeze, a;
      }
    });
    for (const r of t)
      _.prototype[r.toLowerCase()] = function(...a) {
        return this.set[r.toLowerCase()](a);
      };
  }
  _.prototype.struct = function(...n) {
    return this.keepif.out(...n);
  }, _.prototype.structAll = function(...n) {
    return this.keep.out(...n);
  }, _.prototype.mask = function(...n) {
    return this.keepif.in(...n);
  }, _.prototype.maskAll = function(...n) {
    return this.keep.in(...n);
  }, _.prototype.reset = function(...n) {
    return this.keepif.reset(...n);
  }, _.prototype.resetAll = function(...n) {
    return this.keep.reset(...n);
  }, _.prototype.restart = function(...n) {
    return this.keepif.restart(...n);
  }, _.prototype.restartAll = function(...n) {
    return this.keep.restart(...n);
  };
})();
const ex = tt, tx = tt, nx = Mr, Ws = (e) => new _(() => [], e), Ye = Ws(1), Wt = Ws(0);
function Ue(e) {
  function t(s) {
    return s.span.spanCycles.map((i) => new et(U(i.begin).wholeCycle(), i, e));
  }
  const n = new _(t, 1);
  return n.__pure = e, n;
}
function Pu(e) {
  return e instanceof _ || e?._Pattern;
}
function j(e) {
  return Pu(e) ? e : Va && typeof e == "string" ? Va(e) : Ue(e);
}
function n0(e) {
  let t = Ue([]);
  for (const n of e)
    t = t.bind((s) => n.fmap((i) => s.concat([i])));
  return t;
}
function tt(...e) {
  e = e.map((s) => Array.isArray(s) ? on(...s) : j(s));
  const t = (s) => En(e.map((i) => i.query(s))), n = new _(t);
  return Tt && (n._steps = rn(...e.map((s) => s._steps))), n;
}
function Au(e, t) {
  if (t = t.map((r) => Array.isArray(r) ? on(...r) : j(r)), t.length === 0)
    return Ye;
  if (t.length === 1)
    return t[0];
  const [n, ...s] = t.map((r) => r._steps), i = Tt ? n.maximum(...s) : void 0;
  return tt(...e(i, t));
}
function s0(...e) {
  return Au(
    (t, n) => n.map((s) => s._steps.eq(t) ? s : Rt(s, Ws(t.sub(s._steps)))),
    e
  );
}
function i0(...e) {
  return Au(
    (t, n) => n.map((s) => s._steps.eq(t) ? s : Rt(Ws(t.sub(s._steps)), s)),
    e
  );
}
function r0(...e) {
  return Au(
    (t, n) => n.map((s) => {
      if (s._steps.eq(t))
        return s;
      const i = Ws(t.sub(s._steps).div(2));
      return Rt(i, s, i);
    }),
    e
  );
}
function sx(e, ...t) {
  const [n, ...s] = t.map((a) => a._steps), i = n.maximum(...s), r = {
    centre: r0,
    left: s0,
    right: i0,
    expand: tt,
    repeat: (...a) => Mr(...a).steps(i)
  };
  return e.inhabit(r).fmap((a) => a(...t)).innerJoin().setSteps(i);
}
function Qn(...e) {
  if (e = e.map((s) => Array.isArray(s) ? Ft(...s) : j(s)), e.length == 1)
    return e[0];
  const t = function(s) {
    const i = s.span, r = Ut(i.begin.sam(), e.length), a = e[r];
    if (!a)
      return [];
    const u = i.begin.floor().sub(i.begin.div(e.length).floor());
    return a.withHapTime((o) => o.add(u)).query(s.setSpan(i.withTime((o) => o.sub(u))));
  }, n = Tt ? rn(...e.map((s) => s._steps)) : void 0;
  return new _(t).splitQueries().setSteps(n);
}
function Fu(...e) {
  e = e.map(j);
  const t = function(n) {
    const s = Math.floor(n.span.begin) % e.length;
    return e[s]?.query(n) || [];
  };
  return new _(t).splitQueries();
}
function Mi(...e) {
  return Qn(...e);
}
function ix(...e) {
  const t = e.reduce((n, [s]) => n + s, 0);
  return e = e.map(([n, s]) => [n, s.fast(n)]), Rt(...e).slow(t);
}
function rx(...e) {
  let t = U(0);
  for (let n of e)
    n.length == 2 && n.unshift(t), t = n[1];
  return tt(
    ...e.map(
      ([n, s, i]) => Ue(j(i)).compress(U(n).div(t), U(s).div(t))
    )
  ).slow(t).innerJoin();
}
function Ft(...e) {
  let t = Qn(...e);
  return e.length > 1 && (t = t._fast(e.length), t._steps = e.length), e.length == 1 && e[0].__steps_source && (e._steps = e[0]._steps), t;
}
function on(...e) {
  return Ft(...e);
}
function a0(...e) {
  return Ft(...e);
}
function ka(e) {
  return Array.isArray(e) ? e.length == 0 ? [Ye, 0] : e.length == 1 ? ka(e[0]) : [Ft(...e.map((t) => ka(t)[0])), e.length] : [j(e), 1];
}
const ax = Xe((e, t) => j(t).mask(e)), ux = Xe((e, t) => j(t).struct(e)), ox = Xe((e, t) => j(t).superimpose(...e)), cx = Xe((e, t) => j(t).withValue(e)), lx = Xe((e, t) => j(t).bind(e)), dx = Xe((e, t) => j(t).innerBind(e)), hx = Xe((e, t) => j(t).outerBind(e)), px = Xe((e, t) => j(t).squeezeBind(e)), mx = Xe((e, t) => j(t).stepBind(e)), fx = Xe((e, t) => j(t).polyBind(e)), yx = Xe((e, t) => j(t).set(e)), gx = Xe((e, t) => j(t).keep(e)), bx = Xe((e, t) => j(t).keepif(e)), Mx = Xe((e, t) => j(t).add(e)), Cx = Xe((e, t) => j(t).sub(e)), xx = Xe((e, t) => j(t).mul(e)), Gx = Xe((e, t) => j(t).div(e)), vx = Xe((e, t) => j(t).mod(e)), Px = Xe((e, t) => j(t).pow(e)), Ax = Xe((e, t) => j(t).band(e)), Fx = Xe((e, t) => j(t).bor(e)), Xx = Xe((e, t) => j(t).bxor(e)), Dx = Xe((e, t) => j(t).blshift(e)), Sx = Xe((e, t) => j(t).brshift(e)), wx = Xe((e, t) => j(t).lt(e)), Zx = Xe((e, t) => j(t).gt(e)), Ex = Xe((e, t) => j(t).lte(e)), Lx = Xe((e, t) => j(t).gte(e)), Rx = Xe((e, t) => j(t).eq(e)), Bx = Xe((e, t) => j(t).eqt(e)), Vx = Xe((e, t) => j(t).ne(e)), kx = Xe((e, t) => j(t).net(e)), zx = Xe((e, t) => j(t).and(e)), Nx = Xe((e, t) => j(t).or(e)), Wx = Xe((e, t) => j(t).func(e));
function B(e, t, n = true, s = false, i = (r) => r.innerJoin()) {
  if (Array.isArray(e)) {
    const o = {};
    for (const c of e)
      o[c] = B(c, t, n, s, i);
    return o;
  }
  const r = t.length;
  var a;
  n ? a = function(...o) {
    o = o.map(j);
    const c = o[o.length - 1];
    let l;
    if (r === 1)
      l = t(c);
    else {
      const p = o.slice(0, -1);
      if (p.every((m) => m.__pure != null)) {
        const m = p.map((y) => y.__pure), g = p.filter((y) => y.__pure_loc).map((y) => y.__pure_loc);
        l = t(...m, c), l = l.withContext((y) => {
          const x = (y.locations || []).concat(g);
          return { ...y, locations: x };
        });
      } else {
        const [m, ...g] = p;
        let y = (...x) => t(...x, c);
        y = Xe(y, null, r - 1), l = i(g.reduce((x, v) => x.appLeft(v), m.fmap(y)));
      }
    }
    return s && (l._steps = c._steps), l;
  } : a = function(...o) {
    o = o.map(j);
    const c = t(...o);
    return s && (c._steps = o[o.length - 1]._steps), c;
  }, _.prototype[e] = function(...o) {
    if (r === 2 && o.length !== 1)
      o = [on(...o)];
    else if (r !== o.length + 1)
      throw new Error(`.${e}() expects ${r - 1} inputs but got ${o.length}.`);
    return o = o.map(j), a(...o, this);
  }, r > 1 && (_.prototype["_" + e] = function(...o) {
    const c = t(...o, this);
    return s && c.setSteps(this._steps), c;
  });
  const u = Xe(a, null, r);
  return vu[e] = u, u;
}
function Ts(e, t, n = true, s = false, i = (r) => r.stepJoin()) {
  return B(e, t, n, s, i);
}
const Tx = B("round", function(e) {
  return e.asNumber().fmap((t) => Math.round(t));
}), Ix = B("floor", function(e) {
  return e.asNumber().fmap((t) => Math.floor(t));
}), _x = B("ceil", function(e) {
  return e.asNumber().fmap((t) => Math.ceil(t));
}), Yx = B("toBipolar", function(e) {
  return e.fmap((t) => t * 2 - 1);
}), Hx = B("fromBipolar", function(e) {
  return e.fmap((t) => (t + 1) / 2);
}), Kx = B("range", function(e, t, n) {
  return n.mul(t - e).add(e);
}), jx = B("rangex", function(e, t, n) {
  return n._range(Math.log(e), Math.log(t)).fmap(Math.exp);
}), Ux = B("range2", function(e, t, n) {
  return n.fromBipolar()._range(e, t);
}), Ox = B(
  "ratio",
  (e) => e.fmap((t) => Array.isArray(t) ? t.slice(1).reduce((n, s) => n / s, t[0]) : t)
), Jx = B("compress", function(e, t, n) {
  return e = U(e), t = U(t), e.gt(t) || e.gt(1) || t.gt(1) || e.lt(0) || t.lt(0) ? Ye : n._fastGap(U(1).div(t.sub(e)))._late(e);
}), { compressSpan: Qx, compressspan: qx } = B(["compressSpan", "compressspan"], function(e, t) {
  return t._compress(e.begin, e.end);
}), { fastGap: $x, fastgap: eG } = B(["fastGap", "fastgap"], function(e, t) {
  const n = function(i) {
    const r = i.begin.sam(), a = i.begin.sub(r).mul(e).min(1), u = i.end.sub(r).mul(e).min(1);
    if (!(a >= 1))
      return new ct(r.add(a), r.add(u));
  }, s = function(i) {
    const r = i.part.begin, a = i.part.end, u = r.sam(), o = r.sub(u).div(e).min(1), c = a.sub(u).div(e).min(1), l = new ct(u.add(o), u.add(c)), p = i.whole ? new ct(
      l.begin.sub(r.sub(i.whole.begin).div(e)),
      l.end.add(i.whole.end.sub(a).div(e))
    ) : void 0;
    return new et(p, l, i.value, i.context);
  };
  return t.withQuerySpanMaybe(n).withHap(s).splitQueries();
}), tG = B("focus", function(e, t, n) {
  return e = U(e), t = U(t), n._early(e.sam())._fast(U(1).div(t.sub(e)))._late(e);
}), { focusSpan: nG, focusspan: sG } = B(["focusSpan", "focusspan"], function(e, t) {
  return t._focus(e.begin, e.end);
}), iG = B("ply", function(e, t) {
  const n = t.fmap((s) => Ue(s)._fast(e)).squeezeJoin();
  return Tt && (n._steps = U(e).mulmaybe(t._steps)), n;
}), { fast: rG, density: pV } = B(
  ["fast", "density"],
  function(e, t) {
    return e === 0 ? Ye : (e = U(e), t.withQueryTime((s) => s.mul(e)).withHapTime((s) => s.div(e)).setSteps(t._steps));
  },
  true,
  true
), aG = B("hurry", function(e, t) {
  return t._fast(e).mul(Ue({ speed: e }));
}), { slow: uG, sparsity: oG } = B(["slow", "sparsity"], function(e, t) {
  return e === 0 ? Ye : t._fast(U(1).div(e));
}), cG = B("inside", function(e, t, n) {
  return t(n._slow(e))._fast(e);
}), lG = B("outside", function(e, t, n) {
  return t(n._fast(e))._slow(e);
}), dG = B("lastOf", function(e, t, n) {
  const s = Array(e - 1).fill(n);
  return s.push(t(n)), Fu(...s);
}), { firstOf: hG, every: pG } = B(["firstOf", "every"], function(e, t, n) {
  const s = Array(e - 1).fill(n);
  return s.unshift(t(n)), Fu(...s);
}), mG = B("apply", function(e, t) {
  return e(t);
}), fG = B("cpm", function(e, t) {
  return t._fast(e / 60 / 1);
}), yG = B(
  "early",
  function(e, t) {
    return e = U(e), t.withQueryTime((n) => n.add(e)).withHapTime((n) => n.sub(e));
  },
  true,
  true
), u0 = B(
  "late",
  function(e, t) {
    return e = U(e), t._early(U(0).sub(e));
  },
  true,
  true
), gG = B("zoom", function(e, t, n) {
  if (t = U(t), e = U(e), e.gte(t))
    return Wt;
  const s = t.sub(e), i = Tt ? n._steps?.mulmaybe(s) : void 0;
  return n.withQuerySpan((r) => r.withCycle((a) => a.mul(s).add(e))).withHapSpan((r) => r.withCycle((a) => a.sub(e).div(s))).splitQueries().setSteps(i);
}), { zoomArc: bG, zoomarc: MG } = B(["zoomArc", "zoomarc"], function(e, t) {
  return t.zoom(e.begin, e.end);
}), CG = B(
  "bite",
  (e, t, n) => t.fmap((s) => (i) => {
    const r = U(s).div(i).mod(1), a = r.add(U(1).div(i));
    return n.zoom(r, a);
  }).appLeft(e).squeezeJoin(),
  false
), xG = B(
  "linger",
  function(e, t) {
    return e == 0 ? Ye : e < 0 ? t._zoom(e.add(1), 1)._slow(e) : t._zoom(0, e)._slow(e);
  },
  true,
  true
), { segment: GG, seg: vG } = B(["segment", "seg"], function(e, t) {
  return t.struct(Ue(true)._fast(e)).setSteps(e);
}), PG = B("swingBy", (e, t, n) => n.inside(t, u0(a0(0, e / 2)))), AG = B("swing", (e, t) => t.swingBy(1 / 3, e)), { invert: FG, inv: XG } = B(
  ["invert", "inv"],
  function(e) {
    return e.fmap((t) => !t);
  },
  true,
  true
), DG = B("when", function(e, t, n) {
  return e ? t(n) : n;
}), SG = B("off", function(e, t, n) {
  return tt(n, t(n.late(e)));
}), wG = B("brak", function(e) {
  return e.when(Qn(false, true), (t) => Ft(t, Ye)._late(0.25));
}), o0 = B(
  "rev",
  function(e) {
    const t = function(n) {
      const s = n.span, i = s.begin.sam(), r = s.begin.nextSam(), a = function(o) {
        const c = o.withTime((p) => i.add(r.sub(p))), l = c.begin;
        return c.begin = c.end, c.end = l, c;
      };
      return e.query(n.setSpan(a(s))).map((o) => o.withSpan(a));
    };
    return new _(t).splitQueries();
  },
  false,
  true
), ZG = B("revv", function(e) {
  const t = (n) => new ct(U(0).sub(n.end), U(0).sub(n.begin));
  return e.withQuerySpan(t).withHapSpan(t);
}), EG = B("pressBy", function(e, t) {
  return t.fmap((n) => Ue(n).compress(e, 1)).squeezeJoin();
}), LG = B("press", function(e) {
  return e._pressBy(0.5);
});
_.prototype.hush = function() {
  return Ye;
};
const RG = B(
  "palindrome",
  function(e) {
    return e.lastOf(2, o0);
  },
  true,
  true
), { juxBy: BG, juxby: VG } = B(["juxBy", "juxby"], function(e, t, n) {
  e /= 2;
  const s = function(a, u, o) {
    return u in a ? a[u] : o;
  }, i = n.withValue((a) => Object.assign({}, a, { pan: s(a, "pan", 0.5) - e })), r = t(n.withValue((a) => Object.assign({}, a, { pan: s(a, "pan", 0.5) + e })));
  return tt(i, r).setSteps(Tt ? rn(i._steps, r._steps) : void 0);
}), kG = B("jux", function(e, t) {
  return t._juxBy(1, e, t);
}), { echoWith: zG, echowith: NG, stutWith: WG, stutwith: TG } = B(
  ["echoWith", "echowith", "stutWith", "stutwith"],
  function(e, t, n, s) {
    return tt(...wi(0, e - 1).map((i) => n(s.late(U(t).mul(i)), i)));
  }
), IG = B("echo", function(e, t, n, s) {
  return s._echoWith(e, t, (i, r) => i.gain(Math.pow(n, r)));
}), _G = B("stut", function(e, t, n, s) {
  return s._echoWith(e, n, (i, r) => i.gain(Math.pow(t, r)));
}), c0 = B("applyN", function(e, t, n) {
  let s = n;
  for (let i = 0; i < e; i++)
    s = t(s);
  return s;
}), YG = B(["plyWith", "plywith"], function(e, t, n) {
  const s = n.fmap((i) => Mi(...wi(0, e - 1).map((r) => c0(r, t, i)))._fast(e)).squeezeJoin();
  return Tt && (s._steps = U(e).mulmaybe(n._steps)), s;
}), HG = B(["plyForEach", "plyforeach"], function(e, t, n) {
  const s = n.fmap((i) => Mi(Mi(Ue(i), ...wi(1, e - 1).map((r) => t(Ue(i), r))))._fast(e)).squeezeJoin();
  return Tt && (s._steps = U(e).mulmaybe(n._steps)), s;
}), Xu = function(e, t, n = false) {
  return e = U(e), Qn(
    ...wi(0, e.sub(1)).map(
      (s) => n ? t.late(U(s).div(e)) : t.early(U(s).div(e))
    )
  );
}, KG = B(
  "iter",
  function(e, t) {
    return Xu(e, t, false);
  },
  true,
  true
), { iterBack: jG, iterback: UG } = B(
  ["iterBack", "iterback"],
  function(e, t) {
    return Xu(e, t, true);
  },
  true,
  true
), { repeatCycles: OG } = B(
  "repeatCycles",
  function(e, t) {
    return new _(function(n) {
      const s = n.span.begin.sam(), i = s.div(e).sam(), r = s.sub(i);
      return n = n.withSpan((a) => a.withTime((u) => u.sub(r))), t.query(n).map((a) => a.withSpan((u) => u.withTime((o) => o.add(r))));
    }).splitQueries();
  },
  true,
  true
), Du = function(e, t, n, s = false, i = false) {
  const r = Array(e - 1).fill(false);
  r.unshift(true);
  const a = Xu(e, on(...r), !s);
  return i || (n = n.repeatCycles(e)), n.when(a, t);
}, { chunk: JG, slowchunk: QG, slowChunk: qG } = B(
  ["chunk", "slowchunk", "slowChunk"],
  function(e, t, n) {
    return Du(e, t, n, false, false);
  },
  true,
  true
), { chunkBack: $G, chunkback: ev } = B(
  ["chunkBack", "chunkback"],
  function(e, t, n) {
    return Du(e, t, n, true);
  },
  true,
  true
), { fastchunk: tv, fastChunk: nv } = B(
  ["fastchunk", "fastChunk"],
  function(e, t, n) {
    return Du(e, t, n, false, true);
  },
  true,
  true
), { chunkinto: sv, chunkInto: iv } = B(["chunkinto", "chunkInto"], function(e, t, n) {
  return n.into(Ft(true, ...Array(e - 1).fill(false))._iterback(e), t);
}), { chunkbackinto: rv, chunkBackInto: av } = B(["chunkbackinto", "chunkBackInto"], function(e, t, n) {
  return n.into(
    Ft(true, ...Array(e - 1).fill(false))._iter(e)._early(1),
    t
  );
}), uv = B(
  "bypass",
  function(e, t) {
    return e = !!parseInt(e), e ? Ye : t;
  },
  true,
  true
), { ribbon: ov, rib: cv } = B(
  ["ribbon", "rib"],
  (e, t, n) => n.early(e).restart(Ue(1).slow(t))
), lv = B("hsla", (e, t, n, s, i) => i.color(`hsla(${e}turn,${t * 100}%,${n * 100}%,${s})`)), dv = B("hsl", (e, t, n, s) => s.color(`hsl(${e}turn,${t * 100}%,${n * 100}%)`));
_.prototype.tag = function(e) {
  return this.withContext((t) => ({ ...t, tags: (t.tags || []).concat([e]) }));
};
const hv = B("filter", (e, t) => t.withHaps((n) => n.filter(e))), pv = B("filterWhen", (e, t) => t.filter((n) => e(n.whole.begin))), mv = B(
  "within",
  (e, t, n, s) => tt(
    n(s.filterWhen((i) => i.cyclePos() >= e && i.cyclePos() <= t)),
    s.filterWhen((i) => i.cyclePos() < e || i.cyclePos() > t)
  )
);
_.prototype.stepJoin = function() {
  const e = this, t = Rt(...za(Na(e.queryArc(0, 1))))._steps, n = function(s) {
    const r = e.early(s.span.begin.sam()).query(s.setSpan(new ct(U(0), U(1))));
    return Rt(...za(Na(r))).query(s);
  };
  return new _(n, t);
};
_.prototype.stepBind = function(e) {
  return this.fmap(e).stepJoin();
};
function za(e) {
  const t = e.filter((r, a) => a.hasSteps).reduce((r, a) => r.add(a), U(0)), n = ys(e.map((r, a) => a._steps)).reduce(
    (r, a) => r.add(a),
    U(0)
  ), s = t.eq(0) ? void 0 : n.div(t);
  function i(r, a) {
    return a._steps === void 0 ? [r.mulmaybe(s), a] : [a._steps, a];
  }
  return e.map((r) => i(...r));
}
function Na(e) {
  const t = En(e.map((i) => [i.part.begin, i.part.end])), n = Kl([U(0), U(1), ...t]);
  return Hl(n).map((i) => [
    i[1].sub(i[0]),
    tt(...l0(new ct(...i), e).map((r) => r.value.withHap((a) => a.setContext(a.combineContext(r)))))
  ]);
}
function l0(e, t) {
  return ys(t.map((n) => d0(e, n)));
}
function d0(e, t) {
  const n = e.intersection(t.part);
  if (n != null)
    return new et(t.whole, n, t.value, t.context);
}
const h0 = B("pace", function(e, t) {
  return t._steps === void 0 ? t : t._steps.eq(U(0)) ? Wt : t._fast(U(e).div(t._steps)).setSteps(e);
});
function p0(e, ...t) {
  const n = t.map((i) => ka(i));
  if (n.length == 0)
    return Ye;
  e == 0 && (e = n[0][1]);
  const s = [];
  for (const i of n)
    i[1] != 0 && (e == i[1] ? s.push(i[0]) : s.push(i[0]._fast(U(e).div(U(i[1])))));
  return tt(...s);
}
function Mr(...e) {
  if (Array.isArray(e[0]))
    return p0(0, ...e);
  if (e = e.filter((s) => s.hasSteps), e.length == 0)
    return Ye;
  const t = rn(...e.map((s) => s._steps));
  if (t.eq(U(0)))
    return Wt;
  const n = tt(...e.map((s) => s.pace(t)));
  return n._steps = t, n;
}
function Rt(...e) {
  if (e.length === 0)
    return Wt;
  const t = (a) => Array.isArray(a) ? a : [a._steps ?? 1, a];
  if (e = e.map(t), e.find((a) => a[0] === void 0)) {
    const a = e.map((o) => o[0]).filter((o) => o !== void 0);
    if (a.length === 0)
      return Ft(...e.map((o) => o[1]));
    if (a.length === e.length)
      return Wt;
    const u = a.reduce((o, c) => o.add(c), U(0)).div(a.length);
    for (let o of e)
      o[0] === void 0 && (o[0] = u);
  }
  if (e.length == 1)
    return j(e[0][1]).withSteps((u) => e[0][0]);
  const n = e.map((a) => a[0]).reduce((a, u) => a.add(u), U(0));
  let s = U(0);
  const i = [];
  for (const [a, u] of e) {
    if (U(a).eq(0))
      continue;
    const o = s.add(a);
    i.push(j(u)._compress(s.div(n), o.div(n))), s = o;
  }
  const r = tt(...i);
  return r._steps = n, r;
}
function m0(...e) {
  e = e.map((i) => Array.isArray(i) ? i.map(j) : [j(i)]);
  const t = rn(...e.map((i) => U(i.length)));
  let n = [];
  for (let i = 0; i < t; ++i)
    n.push(...e.map((r) => r.length == 0 ? Ye : r[i % r.length]));
  n = n.filter((i) => i.hasSteps && i._steps > 0);
  const s = n.reduce((i, r) => i.add(r._steps), U(0));
  return n = Rt(...n), n._steps = s, n;
}
const f0 = Ts("take", function(e, t) {
  if (!t.hasSteps || t._steps.lte(0) || (e = U(e), e.eq(0)))
    return Wt;
  const n = e < 0;
  n && (e = e.abs());
  const s = e.div(t._steps);
  return s.lte(0) ? Wt : s.gte(1) ? t : n ? t.zoom(U(1).sub(s), 1) : t.zoom(0, s);
}), y0 = Ts("drop", function(e, t) {
  return t.hasSteps ? (e = U(e), e.lt(0) ? t.take(t._steps.add(e)) : t.take(U(0).sub(t._steps.sub(e)))) : Wt;
}), g0 = Ts("extend", function(e, t) {
  return t.fast(e).expand(e);
}), fv = Ts("replicate", function(e, t) {
  return t.repeatCycles(e).fast(e).expand(e);
}), b0 = Ts("expand", function(e, t) {
  return t.withSteps((n) => n.mul(U(e)));
}), M0 = Ts("contract", function(e, t) {
  return t.withSteps((n) => n.div(U(e)));
});
_.prototype.shrinklist = function(e) {
  const t = this;
  if (!t.hasSteps)
    return [t];
  let [n, s] = Array.isArray(e) ? e : [e, t._steps];
  if (n = U(n), s === 0 || n === 0)
    return [t];
  const i = n > 0, r = [];
  if (i) {
    const a = U(1).div(t._steps).mul(n);
    for (let u = 0; u < s; ++u) {
      const o = a.mul(u);
      if (o.gt(1))
        break;
      r.push([o, 1]);
    }
  } else {
    n = U(0).sub(n);
    const a = U(1).div(t._steps).mul(n);
    for (let u = 0; u < s; ++u) {
      const o = U(1).sub(a.mul(u));
      if (o.lt(0))
        break;
      r.push([U(0), o]);
    }
  }
  return r.map((a) => t.zoom(...a));
};
const C0 = (e, t) => t.shrinklist(e), x0 = B(
  "shrink",
  function(e, t) {
    if (!t.hasSteps)
      return Wt;
    const n = t.shrinklist(e), s = Rt(...n);
    return s._steps = n.reduce((i, r) => i.add(r._steps), U(0)), s;
  },
  true,
  false,
  (e) => e.stepJoin()
), yv = B(
  "grow",
  function(e, t) {
    if (!t.hasSteps)
      return Wt;
    const n = t.shrinklist(U(0).sub(e));
    n.reverse();
    const s = Rt(...n);
    return s._steps = n.reduce((i, r) => i.add(r._steps), U(0)), s;
  },
  true,
  false,
  (e) => e.stepJoin()
), G0 = function(e, ...t) {
  return e.tour(...t);
};
_.prototype.tour = function(...e) {
  return Rt(
    ...[].concat(
      ...e.map((t, n) => [...e.slice(0, e.length - n), this, ...e.slice(e.length - n)]),
      this,
      ...e
    )
  );
};
const v0 = function(...e) {
  e = e.filter((s) => s.hasSteps);
  const t = Qn(...e.map((s) => s._slow(s._steps))), n = rn(...e.map((s) => s._steps));
  return t._fast(n).setSteps(n);
}, gv = Rt, Su = Rt, bv = Rt, Mv = m0, Cv = Mr;
_.prototype.s_polymeter = _.prototype.polymeter;
const xv = x0;
_.prototype.s_taper = _.prototype.shrink;
const Gv = C0;
_.prototype.s_taperlist = _.prototype.shrinklist;
const vv = f0;
_.prototype.s_add = _.prototype.take;
const Pv = y0;
_.prototype.s_sub = _.prototype.drop;
const Av = b0;
_.prototype.s_expand = _.prototype.expand;
const Fv = g0;
_.prototype.s_extend = _.prototype.extend;
const Xv = M0;
_.prototype.s_contract = _.prototype.contract;
const Dv = G0;
_.prototype.s_tour = _.prototype.tour;
const Sv = v0;
_.prototype.s_zip = _.prototype.zip;
const wv = h0;
_.prototype.steps = _.prototype.pace;
const Zv = B("chop", function(e, t) {
  const s = Array.from({ length: e }, (a, u) => u).map((a) => ({ begin: a / e, end: (a + 1) / e })), i = function(a, u) {
    if ("begin" in a && "end" in a && a.begin !== void 0 && a.end !== void 0) {
      const o = a.end - a.begin;
      u = { begin: a.begin + u.begin * o, end: a.begin + u.end * o };
    }
    return Object.assign({}, a, u);
  }, r = function(a) {
    return on(s.map((u) => i(a, u)));
  };
  return t.squeezeBind(r).setSteps(Tt ? U(e).mulmaybe(t._steps) : void 0);
}), Ev = B("striate", function(e, t) {
  const s = Array.from({ length: e }, (r, a) => a).map((r) => ({ begin: r / e, end: (r + 1) / e })), i = Qn(...s);
  return t.set(i)._fast(e).setSteps(Tt ? U(e).mulmaybe(t._steps) : void 0);
}), P0 = function(e, t, n = 0.5) {
  return t.speed(1 / e * n).unit("c").slow(e);
}, A0 = B(
  "slice",
  function(e, t, n) {
    return e.innerBind(
      (s) => t.outerBind(
        (i) => n.outerBind((r) => {
          r = r instanceof Object ? r : { s: r };
          const a = Array.isArray(s) ? s[i] : i / s, u = Array.isArray(s) ? s[i + 1] : (i + 1) / s;
          return Ue({ begin: a, end: u, _slices: s, ...r });
        })
      )
    ).setSteps(t._steps);
  },
  false
  // turns off auto-patternification
);
_.prototype.onTriggerTime = function(e) {
  return this.onTrigger((t, n, s, i) => {
    const r = i - n;
    window.setTimeout(() => {
      e(t);
    }, r * 1e3);
  }, false);
};
const Lv = B(
  "splice",
  function(e, t, n) {
    const s = A0(e, t, n);
    return new _((i) => {
      const r = i.controls._cps || 1;
      return s.query(i).map(
        (u) => u.withValue((o) => ({
          speed: r / o._slices / u.whole.duration * (o.speed || 1),
          unit: "c",
          ...o
        }))
      );
    }).setSteps(t._steps);
  },
  false
  // turns off auto-patternification
), { loopAt: Rv, loopat: Bv } = B(["loopAt", "loopat"], function(e, t) {
  const n = t._steps ? t._steps.div(e) : void 0;
  return new _((s) => P0(e, t, s.controls._cps).query(s), n);
}), Vv = B(
  "fit",
  (e) => e.withHaps(
    (t, n) => t.map(
      (s) => s.withValue((i) => {
        const r = ("end" in i ? i.end : 1) - ("begin" in i ? i.begin : 0);
        return {
          ...i,
          speed: (n.controls._cps || 1) / s.whole.duration * r,
          unit: "c"
        };
      })
    )
  )
), { loopAtCps: kv, loopatcps: zv } = B(["loopAtCps", "loopatcps"], function(e, t, n) {
  return P0(e, n, t);
}), Nv = (e) => Ue(1).withValue(() => j(e())).innerJoin();
let hc = (e) => e < 0.5 ? 1 : 1 - (e - 0.5) / 0.5, F0 = (e, t, n) => {
  t = j(t), e = j(e), n = j(n);
  let s = t.fmap((r) => ({ gain: hc(r) })), i = t.fmap((r) => ({ gain: hc(1 - r) }));
  return tt(e.mul(s), n.mul(i));
};
_.prototype.xfade = function(e, t) {
  return F0(this, e, t);
};
const Wv = (e) => (t, n, s) => {
  t = U(t).mod(n), n = U(n);
  const i = t.div(n), r = t.add(1).div(n);
  return e(s.fmap((a) => Ue(a)._compress(i, r)));
}, { beat: Tv } = B(
  ["beat"],
  Wv((e) => e.innerJoin())
), wu = (e, t, n) => {
  n = U(n);
  const s = U(1).div(e.length), i = (u) => {
    const o = [];
    for (const [c, l] of u.entries())
      l && o.push([U(c).div(u.length), l]);
    return o;
  }, r = gr(
    ([u, o], [c, l]) => {
      const p = n.mul(c - u).add(u), m = p.add(s);
      return new ct(p, m);
    },
    i(e),
    i(t)
  );
  function a(u) {
    const o = u.span.begin.sam(), c = u.span.cycleArc(), l = [];
    for (const p of r) {
      const m = p.intersection(c);
      m !== void 0 && l.push(
        new et(
          p.withTime((g) => g.add(o)),
          m.withTime((g) => g.add(o)),
          true
        )
      );
    }
    return l;
  }
  return new _(a).splitQueries();
}, Iv = (e, t, n) => (e = j(e), t = j(t), n = j(n), e.innerBind((s) => t.innerBind((i) => n.innerBind((r) => wu(s, i, r))))), qn = function(e) {
  const t = function(n, s) {
    const i = j(n).fmap((r) => Array.isArray(r) ? [...r, e] : [r, 1, e]);
    return s ? s.distort(i) : Ue({}).distort(i);
  };
  return _.prototype[e] = function(n) {
    return t(n, this);
  }, t;
}, _v = qn("soft"), Yv = qn("hard"), Hv = qn("cubic"), Kv = qn("diode"), jv = qn("asym"), Uv = qn("fold"), Ov = qn("sinefold"), Jv = qn("chebyshev"), Zu = (e) => {
  let n = Ue(Xe((...s) => s, null, e.length));
  for (const s of e) n = n.appBoth(j(s));
  return n;
}, Cr = (e) => Array.isArray(e) ? Zu(e) : j(e);
_.prototype.partials = function(e) {
  return this.withValue((t) => (n) => ({ ...t, partials: n })).appLeft(Cr(e));
};
const Qv = (e) => Cr(e).as("partials");
_.prototype.phases = function(e) {
  return this.withValue((t) => (n) => ({ ...t, phases: n })).appLeft(Cr(e));
};
const qv = (e) => Cr(e).as("phases");
_.prototype.FX = function(...e) {
  return e = e.map(j), this.withValue((t) => (n) => {
    const s = t.FX ?? [];
    return { ...t, FX: s.concat(n) };
  }).appLeft(Zu(e));
};
const $v = (e) => {
  let n = Ue(Xe((...s) => s, null, e.length));
  for (const s of e) n = n.appLeft(s);
  return n;
};
_.prototype.worklet = function(e, ...t) {
  return t = t.map(j), this.outerBind((n) => $v(t).withValue((s) => {
    const i = n.workletInputs ?? [];
    return { ...n, workletSrc: e, workletInputs: i.concat(s) };
  }));
};
const eP = (...e) => Ue({}).worklet(...e);
function xr(e) {
  let t = Array.isArray(e);
  e = t ? e : [e];
  const n = e[0], s = (r) => {
    let a;
    if (typeof r == "object" && r.value !== void 0 && (a = { ...r }, r = r.value, delete a.value), t && Array.isArray(r)) {
      const u = a || {};
      return r.forEach((o, c) => {
        c < e.length && (u[e[c]] = o);
      }), u;
    } else return a ? (a[n] = r, a) : { [n]: r };
  }, i = function(r, a) {
    return a ? typeof r > "u" ? a.fmap(s) : a.set(j(r).withValue(s)) : j(r).withValue(s);
  };
  return _.prototype[n] = function(r) {
    return i(r, this);
  }, i;
}
const Ci = /* @__PURE__ */ new Map();
function X0(e) {
  return Ci.has(e);
}
function A(e, ...t) {
  const n = Array.isArray(e) ? e[0] : e;
  let s = {};
  return s[n] = xr(e), Ci.set(n, n), t.forEach((i) => {
    s[i] = s[n], Ci.set(i, n), _.prototype[i] = _.prototype[n];
  }), s;
}
function Gn(e, t, ...n) {
  e = Array.isArray(e) ? e : [e];
  let s = {};
  for (let i = 1; i <= t; i++) {
    let r = [...n], a = [...e];
    if (i === 1) {
      const o = r.map((l) => `${l}1`), c = a.map((l) => `${l}1`);
      r = r.concat(o).concat(c);
    } else
      r = r.map((o) => `${o}${i}`), a = a.map((o) => `${o}${i}`);
    const u = A(a, ...r);
    s = { ...s, ...u };
  }
  return s;
}
const { s: D0, sound: S0 } = A(["s", "n", "gain"], "sound"), { wt: w0, wavetablePosition: Z0 } = A("wt", "wavetablePosition"), { wtenv: E0 } = A("wtenv"), { wtattack: L0, wtatt: R0 } = A("wtattack", "wtatt"), { wtdecay: B0, wtdec: V0 } = A("wtdecay", "wtdec"), { wtsustain: k0, wtsus: z0 } = A("wtsustain", "wtsus"), { wtrelease: N0, wtrel: W0 } = A("wtrelease", "wtrel"), { wtrate: T0 } = A("wtrate"), { wtsync: I0 } = A("wtsync"), { wtdepth: _0 } = A("wtdepth"), { wtshape: Y0 } = A("wtshape"), { wtdc: H0 } = A("wtdc"), { wtskew: K0 } = A("wtskew"), { warp: j0, wavetableWarp: U0 } = A("warp", "wavetableWarp"), { warpattack: O0, warpatt: J0 } = A("warpattack", "warpatt"), { warpdecay: Q0, warpdec: q0 } = A("warpdecay", "warpdec"), { warpsustain: $0, warpsus: ed } = A("warpsustain", "warpsus"), { warprelease: td, warprel: nd } = A("warprelease", "warprel"), { warprate: sd } = A("warprate"), { warpdepth: id } = A("warpdepth"), { warpshape: rd } = A("warpshape"), { warpdc: ad } = A("warpdc"), { warpskew: ud } = A("warpskew"), { warpmode: od, wavetableWarpMode: cd } = A("warpmode", "wavetableWarpMode"), { wtphaserand: ld, wavetablePhaseRand: dd } = A("wtphaserand", "wavetablePhaseRand"), { warpenv: hd } = A("warpenv"), { warpsync: pd } = A("warpsync"), { source: md, src: fd } = A("source", "src"), { n: yd } = A("n"), { note: gd } = A(["note", "n"]), { accelerate: bd } = A("accelerate"), { velocity: Md, vel: Cd } = A("velocity", "vel"), { gain: xd } = A("gain"), { postgain: Gd } = A("postgain"), { amp: vd } = A("amp"), { attack: Pd, att: Ad } = A("attack", "att"), { fmh: Fd, fmh1: Xd, fmh2: Dd, fmh3: Sd, fmh4: wd, fmh5: Zd, fmh6: Ed, fmh7: Ld, fmh8: Rd } = Gn(["fmh", "fmi"], 8, "fmh"), { fmi: Bd, fmi1: Vd, fmi2: kd, fmi3: zd, fmi4: Nd, fmi5: Wd, fmi6: Td, fmi7: Id, fmi8: _d, fm: Yd, fm1: Hd, fm2: Kd, fm3: jd, fm4: Ud, fm5: Od, fm6: Jd, fm7: Qd, fm8: qd } = Gn(["fmi", "fmh"], 8, "fm"), { fmenv: $d, fmenv1: eh, fmenv2: th, fmenv3: nh, fmenv4: sh, fmenv5: ih, fmenv6: rh, fmenv7: ah, fmenv8: uh } = Gn(
  "fmenv",
  8
), {
  fmattack: oh,
  fmattack1: ch,
  fmattack2: lh,
  fmattack3: dh,
  fmattack4: hh,
  fmattack5: ph,
  fmattack6: mh,
  fmattack7: fh,
  fmattack8: yh,
  fmatt: gh,
  fmatt1: bh,
  fmatt2: Mh,
  fmatt3: Ch,
  fmatt4: xh,
  fmatt5: Gh,
  fmatt6: vh,
  fmatt7: Ph,
  fmatt8: Ah
} = Gn("fmattack", 8, "fmatt"), { fmwave: Fh, fmwave1: Xh, fmwave2: Dh, fmwave3: Sh, fmwave4: wh, fmwave5: Zh, fmwave6: Eh, fmwave7: Lh, fmwave8: Rh } = Gn(
  "fmwave",
  8
), {
  fmdecay: Bh,
  fmdecay1: Vh,
  fmdecay2: kh,
  fmdecay3: zh,
  fmdecay4: Nh,
  fmdecay5: Wh,
  fmdecay6: Th,
  fmdecay7: Ih,
  fmdecay8: _h,
  fmdec: Yh,
  fmdec1: Hh,
  fmdec2: Kh,
  fmdec3: jh,
  fmdec4: Uh,
  fmdec5: Oh,
  fmdec6: Jh,
  fmdec7: Qh,
  fmdec8: qh
} = Gn("fmdecay", 8, "fmdec"), {
  fmsustain: $h,
  fmsustain1: ep,
  fmsustain2: tp,
  fmsustain3: np,
  fmsustain4: sp,
  fmsustain5: ip,
  fmsustain6: rp,
  fmsustain7: ap,
  fmsustain8: up,
  fmsus: op,
  fmsus1: cp,
  fmsus2: lp,
  fmsus3: dp,
  fmsus4: hp,
  fmsus5: pp,
  fmsus6: mp,
  fmsus7: fp,
  fmsus8: yp
} = Gn("fmsustain", 8, "fmsus"), {
  fmrelease: gp,
  fmrelease1: bp,
  fmrelease2: Mp,
  fmrelease3: Cp,
  fmrelease4: xp,
  fmrelease5: Gp,
  fmrelease6: vp,
  fmrelease7: Pp,
  fmrelease8: Ap,
  fmrel: Fp,
  fmrel1: Xp,
  fmrel2: Dp,
  fmrel3: Sp,
  fmrel4: wp,
  fmrel5: Zp,
  fmrel6: Ep,
  fmrel7: Lp,
  fmrel8: Rp
} = Gn("fmrelease", 8, "fmrel");
for (let e = 0; e <= 8; e++)
  for (let t = 0; t <= 8; t++)
    A(`fmi${e}${t}`, `fm${e}${t}`);
const { bank: Bp } = A("bank"), { chorus: Vp } = A("chorus"), { analyze: kp } = A("analyze"), { fft: zp } = A("fft"), { decay: Np, dec: Wp } = A("decay", "dec"), { sustain: Tp, sus: Ip } = A("sustain", "sus"), { release: _p, rel: Yp } = A("release", "rel"), { hold: Hp } = A("hold"), { bandf: Kp, bpf: jp, bp: Up } = A(["bandf", "bandq", "bpenv"], "bpf", "bp"), { bandq: Op, bpq: Jp } = A("bandq", "bpq"), { begin: Qp } = A("begin"), { end: qp } = A("end"), { loop: $p } = A("loop"), { loopBegin: em, loopb: tm } = A("loopBegin", "loopb"), { loopEnd: nm, loope: sm } = A("loopEnd", "loope"), { crush: im } = A("crush"), { coarse: rm } = A("coarse"), { tremolo: am, trem: um } = A(["tremolo", "tremolodepth", "tremoloskew", "tremolophase"], "trem"), { tremolosync: om } = A(
  ["tremolosync", "tremolodepth", "tremoloskew", "tremolophase"],
  "tremsync"
), { tremolodepth: cm } = A("tremolodepth", "tremdepth"), { tremoloskew: lm } = A("tremoloskew", "tremskew"), { tremolophase: dm } = A("tremolophase", "tremphase"), { tremoloshape: hm } = A("tremoloshape", "tremshape"), { drive: pm } = A("drive"), { duck: mm } = A("duckorbit", "duck"), { duckdepth: fm } = A("duckdepth"), { duckonset: ym } = A("duckonset", "duckons"), { duckattack: gm } = A("duckattack", "duckatt"), { byteBeatExpression: bm, bbexpr: Mm } = A("byteBeatExpression", "bbexpr"), { byteBeatStartTime: Cm, bbst: xm } = A("byteBeatStartTime", "bbst"), { channels: Gm, ch: vm } = A("channels", "ch"), { pw: Pm } = A(["pw", "pwrate", "pwsweep"]), { pwrate: Am } = A("pwrate"), { pwsweep: Fm } = A("pwsweep"), { phaserrate: Xm, ph: Dm, phaser: Sm } = A(
  ["phaserrate", "phaserdepth", "phasercenter", "phasersweep"],
  "ph",
  "phaser"
), { phasersweep: wm, phs: Zm } = A("phasersweep", "phs"), { phasercenter: Em, phc: Lm } = A("phasercenter", "phc"), { phaserdepth: Rm, phd: Bm, phasdp: Vm } = A("phaserdepth", "phd", "phasdp"), { channel: km } = A("channel"), { cut: zm } = A("cut"), { cutoff: Nm, ctf: Wm, lpf: Tm, lp: Im } = A(["cutoff", "resonance", "lpenv"], "ctf", "lpf", "lp"), { lpenv: _m, lpe: Ym } = A("lpenv", "lpe"), { hpenv: Hm, hpe: Km } = A("hpenv", "hpe"), { bpenv: jm, bpe: Um } = A("bpenv", "bpe"), { lpattack: Om, lpa: Jm } = A("lpattack", "lpa"), { hpattack: Qm, hpa: qm } = A("hpattack", "hpa"), { bpattack: $m, bpa: ef } = A("bpattack", "bpa"), { lpdecay: tf, lpd: nf } = A("lpdecay", "lpd"), { hpdecay: sf, hpd: rf } = A("hpdecay", "hpd"), { bpdecay: af, bpd: uf } = A("bpdecay", "bpd"), { lpsustain: of, lps: cf } = A("lpsustain", "lps"), { hpsustain: lf, hps: df } = A("hpsustain", "hps"), { bpsustain: hf, bps: pf } = A("bpsustain", "bps"), { lprelease: mf, lpr: ff } = A("lprelease", "lpr"), { hprelease: yf, hpr: gf } = A("hprelease", "hpr"), { bprelease: bf, bpr: Mf } = A("bprelease", "bpr"), { ftype: Cf } = A("ftype"), { fanchor: xf } = A("fanchor"), { lprate: Gf } = A("lprate"), { lpsync: vf } = A("lpsync"), { lpdepth: Pf } = A("lpdepth"), { lpdepthfrequency: Af, lpdepthfreq: Ff } = A("lpdepthfrequency", "lpdepthfreq"), { lpshape: Xf } = A("lpshape"), { lpdc: Df } = A("lpdc"), { lpskew: Sf } = A("lpskew"), { bprate: wf } = A("bprate"), { bpsync: Zf } = A("bpsync"), { bpdepth: Ef } = A("bpdepth"), { bpdepthfrequency: Lf, bpdepthfreq: Rf } = A("bpdepthfrequency", "bpdepthfreq"), { bpshape: Bf } = A("bpshape"), { bpdc: Vf } = A("bpdc"), { bpskew: kf } = A("bpskew"), { hprate: zf } = A("hprate"), { hpsync: Nf } = A("hpsync"), { hpdepth: Wf } = A("hpdepth"), { hpdepthfrequency: Tf, hpdepthfreq: If } = A("hpdepthfrequency", "hpdepthfreq"), { hpshape: _f } = A("hpshape"), { hpdc: Yf } = A("hpdc"), { hpskew: Hf } = A("hpskew"), { vib: Kf, vibrato: jf, v: Uf } = A(["vib", "vibmod"], "vibrato", "v"), { noise: Of } = A("noise"), { vibmod: Jf, vmod: Qf } = A(["vibmod", "vib"], "vmod"), { hcutoff: qf, hpf: $f, hp: e1 } = A(["hcutoff", "hresonance", "hpenv"], "hpf", "hp"), { hresonance: t1, hpq: n1 } = A("hresonance", "hpq"), { resonance: s1, lpq: i1 } = A("resonance", "lpq"), { djf: r1 } = A("djf"), { delay: a1 } = A(["delay", "delaytime", "delayfeedback"]), { delayfeedback: u1, delayfb: o1, dfb: c1 } = A("delayfeedback", "delayfb", "dfb"), { delayspeed: l1 } = A("delayspeed"), { delaytime: d1, delayt: h1, dt: p1 } = A("delaytime", "delayt", "dt"), { delaysync: m1 } = A("delaysync"), { lock: f1 } = A("lock"), { detune: y1, det: g1 } = A("detune", "det"), { unison: b1 } = A("unison"), { spread: M1 } = A("spread"), { dry: C1 } = A("dry"), { fadeTime: x1, fadeOutTime: G1 } = A("fadeTime", "fadeOutTime"), { fadeInTime: v1 } = A("fadeInTime"), { freq: P1 } = A("freq"), { pattack: A1, patt: F1 } = A("pattack", "patt"), { pdecay: X1, pdec: D1 } = A("pdecay", "pdec"), { psustain: S1, psus: w1 } = A("psustain", "psus"), { prelease: Z1, prel: E1 } = A("prelease", "prel"), { penv: L1 } = A("penv"), { pcurve: R1 } = A("pcurve"), { panchor: B1 } = A("panchor"), { gate: V1, gat: k1 } = A("gate", "gat"), { leslie: z1 } = A("leslie"), { lrate: N1 } = A("lrate"), { lsize: W1 } = A("lsize"), { activeLabel: T1 } = A("activeLabel"), { label: I1 } = A(["label", "activeLabel"]), { degree: _1 } = A("degree"), { mtranspose: Y1 } = A("mtranspose"), { ctranspose: H1 } = A("ctranspose"), { harmonic: K1 } = A("harmonic"), { stepsPerOctave: j1 } = A("stepsPerOctave"), { octaveR: U1 } = A("octaveR"), { nudge: O1 } = A("nudge"), { octave: J1, oct: Q1 } = A("octave", "oct"), { orbit: q1 } = A("orbit", "o"), { bus: $1 } = A("bus"), { busgain: ey, bgain: ty } = A("busgain", "bgain"), { overgain: ny } = A("overgain"), { overshape: sy } = A("overshape"), { pan: iy } = A("pan"), { panspan: ry } = A("panspan"), { pansplay: ay } = A("pansplay"), { panwidth: uy } = A("panwidth"), { panorient: oy } = A("panorient"), { slide: cy } = A("slide"), { semitone: ly } = A("semitone"), { voice: dy } = A("voice"), { chord: hy } = A("chord"), { dictionary: py, dict: my } = A("dictionary", "dict"), { anchor: fy } = A("anchor"), { offset: yy } = A("offset"), { octaves: gy } = A("octaves"), { mode: by } = A(["mode", "anchor"]), { room: My } = A(["room", "size"]), { roomlp: Cy, rlp: xy } = A("roomlp", "rlp"), { roomdim: Gy, rdim: vy } = A("roomdim", "rdim"), { roomfade: Py, rfade: Ay } = A("roomfade", "rfade"), { ir: Fy, iresponse: Xy } = A(["ir", "i"], "iresponse"), { irspeed: Dy } = A("irspeed"), { irbegin: Sy } = A("irbegin"), { roomsize: wy, size: Zy, sz: Ey, rsize: Ly } = A("roomsize", "size", "sz", "rsize"), { shape: Ry } = A(["shape", "shapevol"]), { distort: By, dist: Vy } = A(["distort", "distortvol", "distorttype"], "dist"), { distortvol: ky } = A("distortvol", "distvol"), { distorttype: zy } = A("distorttype", "disttype"), { compressor: Ny } = A([
  "compressor",
  "compressorRatio",
  "compressorKnee",
  "compressorAttack",
  "compressorRelease"
]), { compressorKnee: Wy } = A("compressorKnee"), { compressorRatio: Ty } = A("compressorRatio"), { compressorAttack: Iy } = A("compressorAttack"), { compressorRelease: _y } = A("compressorRelease"), { speed: Eu } = A("speed"), { stretch: Yy } = A("stretch"), { unit: Hy } = A("unit"), { squiz: Ky } = A("squiz"), { vowel: jy } = A("vowel"), { waveloss: Uy } = A("waveloss"), { density: tP } = A("density"), { expression: Oy } = A("expression"), { sustainpedal: Jy } = A("sustainpedal"), { fshift: Qy } = A("fshift"), { fshiftnote: qy } = A("fshiftnote"), { fshiftphase: $y } = A("fshiftphase"), { triode: eg } = A("triode"), { krush: tg } = A("krush"), { kcutoff: ng } = A("kcutoff"), { octer: sg } = A("octer"), { octersub: ig } = A("octersub"), { octersubsub: rg } = A("octersubsub"), { ring: ag } = A("ring"), { ringf: ug } = A("ringf"), { ringdf: og } = A("ringdf"), { freeze: cg } = A("freeze"), { xsdelay: lg } = A("xsdelay"), { tsdelay: dg } = A("tsdelay"), { real: hg } = A("real"), { imag: pg } = A("imag"), { enhance: mg } = A("enhance"), { comb: fg } = A("comb"), { smear: yg } = A("smear"), { scram: gg } = A("scram"), { binshift: bg } = A("binshift"), { hbrick: Mg } = A("hbrick"), { lbrick: Cg } = A("lbrick"), { frameRate: xg } = A("frameRate"), { frames: Gg } = A("frames"), { hours: vg } = A("hours"), { minutes: Pg } = A("minutes"), { seconds: Ag } = A("seconds"), { songPtr: Fg } = A("songPtr"), { uid: Xg } = A("uid"), { val: Dg } = A("val"), { cps: Sg } = A("cps"), { clip: wg, legato: Zg } = A("clip", "legato"), { duration: Eg, dur: Lg } = A("duration", "dur"), { zrand: Rg } = A("zrand"), { curve: Bg } = A("curve"), { deltaSlide: Vg } = A("deltaSlide"), { pitchJump: kg } = A("pitchJump"), { pitchJumpTime: zg } = A("pitchJumpTime"), { znoise: Ng } = A("znoise"), { zmod: Wg } = A("zmod"), { zcrush: Tg } = A("zcrush"), { zdelay: Ig } = A("zdelay"), { zzfx: _g } = A("zzfx"), { color: Yg, colour: Hg } = A(["color", "colour"]);
let Lu = (...e) => e.reduce((t, n) => Object.assign(t, { [n]: xr(n) }), {});
const Kg = B("adsr", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, s, i, r] = e;
  return t.set({ attack: n, decay: s, sustain: i, release: r });
}), jg = B("ad", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, s = n] = e;
  return t.attack(n).decay(s);
}), Ug = B("ds", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, s = 0] = e;
  return t.set({ decay: n, sustain: s });
}), Og = B("ar", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, s = n] = e;
  return t.set({ attack: n, release: s });
}), { midichan: Jg } = A("midichan"), { midimap: Qg } = A("midimap"), { midiport: qg } = A("midiport"), { midicmd: $g } = A("midicmd"), eb = B("control", (e, t) => {
  if (!Array.isArray(e))
    throw new Error("control expects an array of [ccn, ccv]");
  const [n, s] = e;
  return t.ccn(n).ccv(s);
}), { ccn: tb } = A("ccn"), { ccv: nb } = A("ccv"), { ctlNum: sb } = A("ctlNum"), { nrpnn: ib } = A("nrpnn"), { nrpv: rb } = A("nrpv"), { progNum: ab } = A("progNum"), ub = B("sysex", (e, t) => {
  if (!Array.isArray(e))
    throw new Error("sysex expects an array of [id, data]");
  const [n, s] = e;
  return t.sysexid(n).sysexdata(s);
}), { sysexid: ob } = A("sysexid"), { sysexdata: cb } = A("sysexdata"), { midibend: lb } = A("midibend"), { miditouch: db } = A("miditouch"), { polyTouch: hb } = A("polyTouch"), { oschost: pb } = A("oschost"), { oscport: mb } = A("oscport"), xi = (e) => Ci.has(e) ? Ci.get(e) : e, fb = B("as", (e, t) => (e = Array.isArray(e) ? e : [e], t.fmap((n) => {
  n = Array.isArray(n) ? n : [n];
  const s = [];
  for (let i = 0; i < e.length; ++i)
    n[i] !== void 0 && s.push([xi(e[i]), n[i]]);
  return Object.fromEntries(s);
}))), yb = B(
  "scrub",
  (e, t) => e.outerBind((n) => {
    Array.isArray(n) || (n = [n]);
    const [s, i = 1] = n;
    return t.begin(s).mul(Eu(i)).clip(1);
  }),
  false
), Wa = /* @__PURE__ */ new Map(), nP = (e, t, ...n) => {
  const s = Wa.get(e) ?? /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set([t, ...n]);
  for (const r of i)
    s.set(String(r).toLowerCase(), t);
  Wa.set(e, s);
}, Ru = (e, t = []) => {
  for (const [n, ...s] of t)
    nP(e, n, ...s);
}, sP = (e, t) => {
  const n = Wa.get(e);
  return n ? n.get(String(t).toLowerCase()) ?? t : t;
};
Ru("lfo", [
  ["control", "c"],
  ["subControl", "sc"],
  ["rate", "r"],
  ["depth", "dep", "dr"],
  ["depthabs", "da"],
  ["dcoffset", "dc"],
  ["shape", "sh"],
  ["skew", "sk"],
  ["curve", "cu"],
  ["sync", "s"],
  ["fxi"]
]);
Ru("env", [
  ["control", "c"],
  ["subControl", "sc"],
  ["attack", "att", "a"],
  ["decay", "dec", "d"],
  ["sustain", "sus", "s"],
  ["release", "rel", "r"],
  ["depth", "dep", "dr"],
  ["depthabs", "da"],
  ["acurve", "ac"],
  ["dcurve", "dc"],
  ["rcurve", "rc"],
  ["fxi"]
]);
Ru("bmod", [
  ["bus", "b"],
  ["control", "c"],
  ["subControl", "sc"],
  ["depth", "dep", "dr"],
  ["depthabs", "da"],
  ["dc"],
  ["fxi"]
]);
_.prototype.modulate = function(e, t, n) {
  t = { control: void 0, ...t };
  const s = ["lfo", "env", "bmod"];
  if (!s.includes(e))
    return gt(`[core] Modulation type ${e} not found. Please use one of 'lfo', 'env', 'bmod'`), this;
  let i = this, r;
  i = i.fmap((a) => (u) => ({ v: a, id: u })).appLeft(j(n));
  for (const [a, u] of Object.entries(t)) {
    const o = sP(e, a), c = j(u);
    i = i.fmap(({ v: l, id: p }) => (m) => {
      if (r === void 0) {
        let y = xi(Object.keys(l).at(-1));
        s.includes(y) && (y = `${y}_${[...l[y].__ids].at(-1)}`), r = y;
      }
      l[e] ??= { __ids: /* @__PURE__ */ new Set() };
      const g = l[e];
      return p ??= g.__ids.size, g[p] ??= { control: r }, g.__ids.add(p), m === void 0 ? { v: l, id: p } : (o === "control" || o === "subControl" ? g[p][o] = xi(m) : g[p][o] = m, { v: l, id: p });
    }).appLeft(c);
  }
  return i.fmap(({ v: a }) => a);
};
_.prototype.lfo = function(e, t) {
  return this.modulate("lfo", e, t);
};
const gb = (e) => Ue({}).lfo(e);
_.prototype.env = function(e, t) {
  return this.modulate("env", e, t);
};
const bb = (e) => Ue({}).env(e);
_.prototype.bmod = function(e, t) {
  return this.modulate("bmod", e, t);
};
const Mb = (e) => Ue({}).bmod(e), { transient: Cb } = A(["transient", "transsustain"]), { FXrelease: xb, FXrel: Gb, FXr: vb, fxr: Pb } = A("FXrelease", "FXrel", "FXr", "fxr"), iP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FXr: vb,
  FXrel: Gb,
  FXrelease: xb,
  accelerate: bd,
  activeLabel: T1,
  ad: jg,
  adsr: Kg,
  amp: vd,
  analyze: kp,
  anchor: fy,
  ar: Og,
  as: fb,
  att: Ad,
  attack: Pd,
  bandf: Kp,
  bandq: Op,
  bank: Bp,
  bbexpr: Mm,
  bbst: xm,
  begin: Qp,
  bgain: ty,
  binshift: bg,
  bmod: Mb,
  bp: Up,
  bpa: ef,
  bpattack: $m,
  bpd: uf,
  bpdc: Vf,
  bpdecay: af,
  bpdepth: Ef,
  bpdepthfreq: Rf,
  bpdepthfrequency: Lf,
  bpe: Um,
  bpenv: jm,
  bpf: jp,
  bpq: Jp,
  bpr: Mf,
  bprate: wf,
  bprelease: bf,
  bps: pf,
  bpshape: Bf,
  bpskew: kf,
  bpsustain: hf,
  bpsync: Zf,
  bus: $1,
  busgain: ey,
  byteBeatExpression: bm,
  byteBeatStartTime: Cm,
  ccn: tb,
  ccv: nb,
  ch: vm,
  channel: km,
  channels: Gm,
  chord: hy,
  chorus: Vp,
  clip: wg,
  coarse: rm,
  color: Yg,
  colour: Hg,
  comb: fg,
  compressor: Ny,
  compressorAttack: Iy,
  compressorKnee: Wy,
  compressorRatio: Ty,
  compressorRelease: _y,
  control: eb,
  cps: Sg,
  createParam: xr,
  createParams: Lu,
  crush: im,
  ctf: Wm,
  ctlNum: sb,
  ctranspose: H1,
  curve: Bg,
  cut: zm,
  cutoff: Nm,
  dec: Wp,
  decay: Np,
  degree: _1,
  delay: a1,
  delayfb: o1,
  delayfeedback: u1,
  delayspeed: l1,
  delaysync: m1,
  delayt: h1,
  delaytime: d1,
  deltaSlide: Vg,
  density: tP,
  det: g1,
  detune: y1,
  dfb: c1,
  dict: my,
  dictionary: py,
  dist: Vy,
  distort: By,
  distorttype: zy,
  distortvol: ky,
  djf: r1,
  drive: pm,
  dry: C1,
  ds: Ug,
  dt: p1,
  duck: mm,
  duckattack: gm,
  duckdepth: fm,
  duckonset: ym,
  dur: Lg,
  duration: Eg,
  end: qp,
  enhance: mg,
  env: bb,
  expression: Oy,
  fadeInTime: v1,
  fadeOutTime: G1,
  fadeTime: x1,
  fanchor: xf,
  fft: zp,
  fm: Yd,
  fm1: Hd,
  fm2: Kd,
  fm3: jd,
  fm4: Ud,
  fm5: Od,
  fm6: Jd,
  fm7: Qd,
  fm8: qd,
  fmatt: gh,
  fmatt1: bh,
  fmatt2: Mh,
  fmatt3: Ch,
  fmatt4: xh,
  fmatt5: Gh,
  fmatt6: vh,
  fmatt7: Ph,
  fmatt8: Ah,
  fmattack: oh,
  fmattack1: ch,
  fmattack2: lh,
  fmattack3: dh,
  fmattack4: hh,
  fmattack5: ph,
  fmattack6: mh,
  fmattack7: fh,
  fmattack8: yh,
  fmdec: Yh,
  fmdec1: Hh,
  fmdec2: Kh,
  fmdec3: jh,
  fmdec4: Uh,
  fmdec5: Oh,
  fmdec6: Jh,
  fmdec7: Qh,
  fmdec8: qh,
  fmdecay: Bh,
  fmdecay1: Vh,
  fmdecay2: kh,
  fmdecay3: zh,
  fmdecay4: Nh,
  fmdecay5: Wh,
  fmdecay6: Th,
  fmdecay7: Ih,
  fmdecay8: _h,
  fmenv: $d,
  fmenv1: eh,
  fmenv2: th,
  fmenv3: nh,
  fmenv4: sh,
  fmenv5: ih,
  fmenv6: rh,
  fmenv7: ah,
  fmenv8: uh,
  fmh: Fd,
  fmh1: Xd,
  fmh2: Dd,
  fmh3: Sd,
  fmh4: wd,
  fmh5: Zd,
  fmh6: Ed,
  fmh7: Ld,
  fmh8: Rd,
  fmi: Bd,
  fmi1: Vd,
  fmi2: kd,
  fmi3: zd,
  fmi4: Nd,
  fmi5: Wd,
  fmi6: Td,
  fmi7: Id,
  fmi8: _d,
  fmrel: Fp,
  fmrel1: Xp,
  fmrel2: Dp,
  fmrel3: Sp,
  fmrel4: wp,
  fmrel5: Zp,
  fmrel6: Ep,
  fmrel7: Lp,
  fmrel8: Rp,
  fmrelease: gp,
  fmrelease1: bp,
  fmrelease2: Mp,
  fmrelease3: Cp,
  fmrelease4: xp,
  fmrelease5: Gp,
  fmrelease6: vp,
  fmrelease7: Pp,
  fmrelease8: Ap,
  fmsus: op,
  fmsus1: cp,
  fmsus2: lp,
  fmsus3: dp,
  fmsus4: hp,
  fmsus5: pp,
  fmsus6: mp,
  fmsus7: fp,
  fmsus8: yp,
  fmsustain: $h,
  fmsustain1: ep,
  fmsustain2: tp,
  fmsustain3: np,
  fmsustain4: sp,
  fmsustain5: ip,
  fmsustain6: rp,
  fmsustain7: ap,
  fmsustain8: up,
  fmwave: Fh,
  fmwave1: Xh,
  fmwave2: Dh,
  fmwave3: Sh,
  fmwave4: wh,
  fmwave5: Zh,
  fmwave6: Eh,
  fmwave7: Lh,
  fmwave8: Rh,
  frameRate: xg,
  frames: Gg,
  freeze: cg,
  freq: P1,
  fshift: Qy,
  fshiftnote: qy,
  fshiftphase: $y,
  ftype: Cf,
  fxr: Pb,
  gain: xd,
  gat: k1,
  gate: V1,
  getControlName: xi,
  harmonic: K1,
  hbrick: Mg,
  hcutoff: qf,
  hold: Hp,
  hours: vg,
  hp: e1,
  hpa: qm,
  hpattack: Qm,
  hpd: rf,
  hpdc: Yf,
  hpdecay: sf,
  hpdepth: Wf,
  hpdepthfreq: If,
  hpdepthfrequency: Tf,
  hpe: Km,
  hpenv: Hm,
  hpf: $f,
  hpq: n1,
  hpr: gf,
  hprate: zf,
  hprelease: yf,
  hps: df,
  hpshape: _f,
  hpskew: Hf,
  hpsustain: lf,
  hpsync: Nf,
  hresonance: t1,
  imag: pg,
  ir: Fy,
  irbegin: Sy,
  iresponse: Xy,
  irspeed: Dy,
  isControlName: X0,
  kcutoff: ng,
  krush: tg,
  label: I1,
  lbrick: Cg,
  legato: Zg,
  leslie: z1,
  lfo: gb,
  lock: f1,
  loop: $p,
  loopBegin: em,
  loopEnd: nm,
  loopb: tm,
  loope: sm,
  lp: Im,
  lpa: Jm,
  lpattack: Om,
  lpd: nf,
  lpdc: Df,
  lpdecay: tf,
  lpdepth: Pf,
  lpdepthfreq: Ff,
  lpdepthfrequency: Af,
  lpe: Ym,
  lpenv: _m,
  lpf: Tm,
  lpq: i1,
  lpr: ff,
  lprate: Gf,
  lprelease: mf,
  lps: cf,
  lpshape: Xf,
  lpskew: Sf,
  lpsustain: of,
  lpsync: vf,
  lrate: N1,
  lsize: W1,
  midibend: lb,
  midichan: Jg,
  midicmd: $g,
  midimap: Qg,
  midiport: qg,
  miditouch: db,
  minutes: Pg,
  mode: by,
  mtranspose: Y1,
  n: yd,
  noise: Of,
  note: gd,
  nrpnn: ib,
  nrpv: rb,
  nudge: O1,
  oct: Q1,
  octave: J1,
  octaveR: U1,
  octaves: gy,
  octer: sg,
  octersub: ig,
  octersubsub: rg,
  offset: yy,
  orbit: q1,
  oschost: pb,
  oscport: mb,
  overgain: ny,
  overshape: sy,
  pan: iy,
  panchor: B1,
  panorient: oy,
  panspan: ry,
  pansplay: ay,
  panwidth: uy,
  patt: F1,
  pattack: A1,
  pcurve: R1,
  pdec: D1,
  pdecay: X1,
  penv: L1,
  ph: Dm,
  phasdp: Vm,
  phaser: Sm,
  phasercenter: Em,
  phaserdepth: Rm,
  phaserrate: Xm,
  phasersweep: wm,
  phc: Lm,
  phd: Bm,
  phs: Zm,
  pitchJump: kg,
  pitchJumpTime: zg,
  polyTouch: hb,
  postgain: Gd,
  prel: E1,
  prelease: Z1,
  progNum: ab,
  psus: w1,
  psustain: S1,
  pw: Pm,
  pwrate: Am,
  pwsweep: Fm,
  rdim: vy,
  real: hg,
  registerControl: A,
  registerMultiControl: Gn,
  rel: Yp,
  release: _p,
  resonance: s1,
  rfade: Ay,
  ring: ag,
  ringdf: og,
  ringf: ug,
  rlp: xy,
  room: My,
  roomdim: Gy,
  roomfade: Py,
  roomlp: Cy,
  roomsize: wy,
  rsize: Ly,
  s: D0,
  scram: gg,
  scrub: yb,
  seconds: Ag,
  semitone: ly,
  shape: Ry,
  size: Zy,
  slide: cy,
  smear: yg,
  songPtr: Fg,
  sound: S0,
  source: md,
  speed: Eu,
  spread: M1,
  squiz: Ky,
  src: fd,
  stepsPerOctave: j1,
  stretch: Yy,
  sus: Ip,
  sustain: Tp,
  sustainpedal: Jy,
  sysex: ub,
  sysexdata: cb,
  sysexid: ob,
  sz: Ey,
  transient: Cb,
  trem: um,
  tremolo: am,
  tremolodepth: cm,
  tremolophase: dm,
  tremoloshape: hm,
  tremoloskew: lm,
  tremolosync: om,
  triode: eg,
  tsdelay: dg,
  uid: Xg,
  unison: b1,
  unit: Hy,
  v: Uf,
  val: Dg,
  vel: Cd,
  velocity: Md,
  vib: Kf,
  vibmod: Jf,
  vibrato: jf,
  vmod: Qf,
  voice: dy,
  vowel: jy,
  warp: j0,
  warpatt: J0,
  warpattack: O0,
  warpdc: ad,
  warpdec: q0,
  warpdecay: Q0,
  warpdepth: id,
  warpenv: hd,
  warpmode: od,
  warprate: sd,
  warprel: nd,
  warprelease: td,
  warpshape: rd,
  warpskew: ud,
  warpsus: ed,
  warpsustain: $0,
  warpsync: pd,
  waveloss: Uy,
  wavetablePhaseRand: dd,
  wavetablePosition: Z0,
  wavetableWarp: U0,
  wavetableWarpMode: cd,
  wt: w0,
  wtatt: R0,
  wtattack: L0,
  wtdc: H0,
  wtdec: V0,
  wtdecay: B0,
  wtdepth: _0,
  wtenv: E0,
  wtphaserand: ld,
  wtrate: T0,
  wtrel: W0,
  wtrelease: N0,
  wtshape: Y0,
  wtskew: K0,
  wtsus: z0,
  wtsustain: k0,
  wtsync: I0,
  xsdelay: lg,
  zcrush: Tg,
  zdelay: Ig,
  zmod: Wg,
  znoise: Ng,
  zrand: Rg,
  zzfx: _g
}, Symbol.toStringTag, { value: "Module" })), rP = function(e, t) {
  const [n, s] = e, [i, r] = t, [a, u] = xu(s, i);
  return [
    [s, n - s],
    [gr((o, c) => o.concat(c), a, r), u]
  ];
}, aP = function(e, t) {
  const [n, s] = e, [i, r] = t, [a, u] = xu(n, r);
  return [
    [n, s - n],
    [gr((c, l) => c.concat(l), i, a), u]
  ];
}, Ab = function(e, t) {
  const [n, s] = e;
  return Math.min(n, s) <= 1 ? [e, t] : Ab(...n > s ? rP(e, t) : aP(e, t));
}, Bu = function(e, t) {
  const n = e < 0, s = Math.abs(e), i = t - s, r = Array(s).fill([1]), a = Array(i).fill([0]), u = Ab([s, i], [r, a]), o = En(u[1][0]).concat(En(u[1][1]));
  return n ? o.map((c) => 1 - c) : o;
}, Gr = function(e, t, n) {
  const s = Bu(e, t);
  return n ? Il(s, -n) : s;
}, uP = B("euclid", function(e, t, n) {
  return n.struct(Gr(e, t, 0));
}), oP = B("bjork", function(e, t) {
  Array.isArray(e) || (e = [e]);
  const [n, s = n, i = 0] = e;
  return t.struct(Gr(n, s, i));
}), { euclidrot: cP, euclidRot: lP } = B(["euclidrot", "euclidRot"], function(e, t, n, s) {
  return s.struct(Gr(e, t, n));
}), Fb = function(e, t, n, s) {
  if (e < 1)
    return Ye;
  const r = Gr(e, t, 0).join("").split("1").slice(1).map((a) => [a.length + 1, true]);
  return s.struct(Su(...r)).late(U(n).div(t));
}, dP = B(["euclidLegato"], function(e, t, n) {
  return Fb(e, t, 0, n);
}), hP = B(["euclidLegatoRot"], function(e, t, n, s) {
  return Fb(e, t, n, s);
}), { euclidish: pP, eish: mP } = B(["euclidish", "eish"], function(e, t, n, s) {
  const i = wu(Bu(e, t), new Array(e).fill(1), n);
  return s.struct(i).setSteps(t);
});
function Xb(e, t, n = 0.05, s = 0.1, i = 0.1, r = globalThis.setInterval, a = globalThis.clearInterval, u = true) {
  let o = 0, c = 0, l = 10 ** 4, p = 0.01;
  const m = (D) => n = D(n);
  i = i || s / 2;
  const g = () => {
    const D = e(), X = D + s + i;
    for (c === 0 && (c = D + p); c < X; )
      c = u ? Math.round(c * l) / l : c, t(c, n, o, D), c += n, o++;
  };
  let y;
  const x = () => {
    v(), g(), y = r(g, s * 1e3);
  }, v = () => {
    y !== void 0 && a(y), y = void 0;
  };
  return { setDuration: m, start: x, stop: () => {
    o = 0, c = 0, v();
  }, pause: () => v(), duration: n, interval: s, getPhase: () => c, minLatency: p };
}
class Db {
  constructor({
    interval: t,
    onTrigger: n,
    onToggle: s,
    onError: i,
    getTime: r,
    latency: a = 0.1,
    setInterval: u,
    clearInterval: o,
    beforeStart: c
  }) {
    this.started = false, this.beforeStart = c, this.cps = 0.5, this.num_ticks_since_cps_change = 0, this.lastTick = 0, this.lastBegin = 0, this.lastEnd = 0, this.getTime = r, this.num_cycles_at_cps_change = 0, this.seconds_at_cps_change, this.onToggle = s, this.latency = a, this.clock = Xb(
      r,
      // called slightly before each cycle
      (l, p, m, g) => {
        this.num_ticks_since_cps_change === 0 && (this.num_cycles_at_cps_change = this.lastEnd, this.seconds_at_cps_change = l), this.num_ticks_since_cps_change++;
        const x = this.num_ticks_since_cps_change * p * this.cps;
        try {
          const v = this.lastEnd;
          this.lastBegin = v;
          const E = this.num_cycles_at_cps_change + x;
          if (this.lastEnd = E, this.lastTick = l, l < g) {
            console.log("skip query: too late");
            return;
          }
          this.pattern.queryArc(v, E, { _cps: this.cps, cyclist: "cyclist" }).forEach((V) => {
            if (V.hasOnset()) {
              const D = (V.whole.begin - this.num_cycles_at_cps_change) / this.cps + this.seconds_at_cps_change + a, X = V.duration / this.cps, Z = D - l;
              n?.(V, Z, X, this.cps, D), V.value.cps !== void 0 && this.cps != V.value.cps && (this.cps = V.value.cps, this.num_ticks_since_cps_change = 0);
            }
          });
        } catch (v) {
          Si(v), i?.(v);
        }
      },
      t,
      // duration of each cycle
      0.1,
      0.1,
      u,
      o
    );
  }
  now() {
    if (!this.started)
      return 0;
    const t = this.getTime() - this.lastTick - this.clock.duration;
    return this.lastBegin + t * this.cps;
  }
  setStarted(t) {
    this.started = t, this.onToggle?.(t);
  }
  async start() {
    if (await this.beforeStart?.(), this.num_ticks_since_cps_change = 0, this.num_cycles_at_cps_change = 0, !this.pattern)
      throw new Error("Scheduler: no pattern set! call .setPattern first.");
    gt("[cyclist] start"), this.clock.start(), this.setStarted(true);
  }
  pause() {
    gt("[cyclist] pause"), this.clock.pause(), this.setStarted(false);
  }
  stop() {
    gt("[cyclist] stop"), this.clock.stop(), this.lastEnd = 0, this.setStarted(false);
  }
  async setPattern(t, n = false) {
    this.pattern = t, n && !this.started && await this.start();
  }
  setCps(t = 0.5) {
    this.cps !== t && (this.cps = t, this.num_ticks_since_cps_change = 0);
  }
  log(t, n, s) {
    const i = s.filter((r) => r.hasOnset());
    console.log(`${t.toFixed(4)} - ${n.toFixed(4)} ${Array(i.length).fill("I").join("")}`);
  }
}
let pi = {};
const Sb = function() {
  wb();
}, wb = function() {
  pi = {};
}, fP = B(
  "timeline",
  function(e, t) {
    e = j(e);
    const n = function(s) {
      const i = !!s.controls.cyclist, r = e.query(s), a = [];
      for (const u of r) {
        const o = u.value;
        let c;
        if (o === 0)
          c = 0;
        else if (o in pi)
          c = pi[o];
        else {
          const p = u.wholeOrPart();
          !i || s.span.begin.lt(p.midpoint()) ? c = p.begin : c = p.end;
        }
        i && (pi[o] = c, o !== 0 && delete pi[-o]);
        const l = t.late(c).query(s.setSpan(u.part)).map((p) => p.setContext(p.combineContext(u)));
        a.push(...l);
      }
      return a;
    };
    return new _(n, t._steps);
  },
  false
), vn = function(e, t, n = true) {
  const s = Array.isArray(e), i = Object.keys(e).length;
  return e = Ol(e, j), i === 0 ? Ye : t.fmap((r) => {
    let a = r;
    return s && (a = n ? Math.round(a) % i : br(Math.round(a), 0, e.length - 1)), e[a];
  });
}, Zb = function(e, t) {
  return Array.isArray(t) && ([t, e] = [e, t]), yP(e, t);
}, yP = B("pick", function(e, t) {
  return vn(e, t, false).innerJoin();
}), Eb = B("pickmod", function(e, t) {
  return vn(e, t, true).innerJoin();
}), gP = B("pickF", function(e, t, n) {
  return n.apply(Zb(e, t));
}), bP = B("pickmodF", function(e, t, n) {
  return n.apply(Eb(e, t));
}), MP = B("pickOut", function(e, t) {
  return vn(e, t, false).outerJoin();
}), CP = B("pickmodOut", function(e, t) {
  return vn(e, t, true).outerJoin();
}), xP = B("pickRestart", function(e, t) {
  return vn(e, t, false).restartJoin();
}), GP = B("pickmodRestart", function(e, t) {
  return vn(e, t, true).restartJoin();
}), vP = B("pickReset", function(e, t) {
  return vn(e, t, false).resetJoin();
}), PP = B("pickmodReset", function(e, t) {
  return vn(e, t, true).resetJoin();
}), { inhabit: AP, pickSqueeze: FP } = B(["inhabit", "pickSqueeze"], function(e, t) {
  return vn(e, t, false).squeezeJoin();
}), { inhabitmod: XP, pickmodSqueeze: DP } = B(["inhabitmod", "pickmodSqueeze"], function(e, t) {
  return vn(e, t, true).squeezeJoin();
}), SP = (e, t) => (t = t.map(j), t.length == 0 ? Ye : e.fmap((n) => {
  const s = Ut(Math.round(n), t.length);
  return t[s];
}).squeezeJoin());
class wP {
  constructor({ onTrigger: t, onToggle: n, getTime: s }) {
    this.started = false, this.cps = 0.5, this.getTime = s, this.time_at_last_tick_message = 0, this.collator = new Jl({ getTargetClockTime: s }), this.onToggle = n, this.latency = 0.1, this.cycle = 0, this.id = Math.round(Date.now() * Math.random()), this.worker = new SharedWorker(new URL(
      /* @vite-ignore */
      "" + new URL("data:text/javascript;base64,KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIEwoKXtyZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkqLjAwMX1sZXQgXz0wLHI9MCxvPS41O2NvbnN0IGg9bmV3IE1hcCxtPS4xLE09bmV3IEJyb2FkY2FzdENoYW5uZWwoInN0cnVkZWx0aWNrIiksYj0ocyxlKT0+e00ucG9zdE1lc3NhZ2Uoe3R5cGU6cyxwYXlsb2FkOmV9KX0sQz1FKEwsKHMsZSx0LG4pPT57Y29uc3QgaT1yKmUsZD1zLW4sYz1uK2QsdT1pKm8sbD1fK3UsZz1uLWMtZSxmPWUqbyxwPWwrZix5PWwrZypvO2IoInRpY2siLHtiZWdpbjpsLGVuZDpwLGNwczpvLHRpbWU6bixjeWNsZTp5fSkscisrfSxtKTtsZXQgaz0hMTtjb25zdCBJPXM9PntoLnNldChzLHtzdGFydGVkOiEwfSksIWsmJihDLnN0YXJ0KCksaz0hMCl9LEE9YXN5bmMgcz0+e2guc2V0KHMse3N0YXJ0ZWQ6ITF9KTtjb25zdCBlPUFycmF5LmZyb20oaC52YWx1ZXMoKSkuc29tZSh0PT50LnN0YXJ0ZWQpOyFrfHxlfHwoQy5zdG9wKCksdygwKSxrPSExKX0sdz1zPT57cj0wLF89c30sRD1zPT57Y29uc3R7dHlwZTplLHBheWxvYWQ6dH09cztzd2l0Y2goZSl7Y2FzZSJjcHNjaGFuZ2UiOntpZih0LmNwcyE9PW8pe2NvbnN0IG49ciptO189XytuKm8sbz10LmNwcyxyPTB9YnJlYWt9Y2FzZSJzZXRjeWNsZSI6e3codC5jeWNsZSk7YnJlYWt9Y2FzZSJ0b2dnbGUiOnt0LnN0YXJ0ZWQ/SShzLmlkKTpBKHMuaWQpO2JyZWFrfX19O3NlbGYub25jb25uZWN0PWZ1bmN0aW9uKHMpe2NvbnN0IGU9cy5wb3J0c1swXTtlLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGZ1bmN0aW9uKHQpe0QodC5kYXRhKX0pLGUuc3RhcnQoKX07ZnVuY3Rpb24gRShzLGUsdD0uMDUsbj0uMSxpPS4xKXtsZXQgZD0wLGM9MCx1PTEwKio0LGw9LjAxO2NvbnN0IGc9YT0+dD1hKHQpO2k9aXx8bi8yO2NvbnN0IGY9KCk9Pntjb25zdCBhPXMoKSxPPWErbitpO2ZvcihjPT09MCYmKGM9YStsKTtjPE87KWM9TWF0aC5yb3VuZChjKnUpL3UsYz49YSYmZShjLHQsZCxhKSxjPGEmJmNvbnNvbGUubG9nKCJUT08gTEFURSIsYyksYys9dCxkKyt9O2xldCBwO2NvbnN0IHk9KCk9PntUKCksZigpLHA9c2V0SW50ZXJ2YWwoZixuKjFlMyl9LFQ9KCk9PnAhPT12b2lkIDAmJmNsZWFySW50ZXJ2YWwocCk7cmV0dXJue3NldER1cmF0aW9uOmcsc3RhcnQ6eSxzdG9wOigpPT57ZD0wLGM9MCxUKCl9LHBhdXNlOigpPT5UKCksZHVyYXRpb246dCxpbnRlcnZhbDpuLGdldFBoYXNlOigpPT5jLG1pbkxhdGVuY3k6bH19fSkoKTsK", import.meta.url).href,
      import.meta.url
    )), this.worker.port.start(), this.channel = new BroadcastChannel("strudeltick");
    const i = (a) => {
      const { cps: u, begin: o, end: c, cycle: l, time: p } = a;
      this.cps = u, this.cycle = l;
      const m = this.collator.calculateOffset(p) + p;
      r(o, c, m), this.time_at_last_tick_message = m;
    }, r = (a, u, o) => {
      if (this.started === false)
        return;
      this.pattern.queryArc(a, u, { _cps: this.cps, cyclist: "neocyclist" }).forEach((l) => {
        if (l.hasOnset()) {
          const m = Ba(l.whole.begin - this.cycle, this.cps) + o + this.latency, g = Ba(l.duration, this.cps);
          t?.(l, 0, g, this.cps, m);
        }
      });
    };
    this.channel.onmessage = (a) => {
      if (!this.started)
        return;
      const { payload: u, type: o } = a.data;
      switch (o) {
        case "tick":
          i(u);
      }
    };
  }
  sendMessage(t, n) {
    this.worker.port.postMessage({ type: t, payload: n, id: this.id });
  }
  now() {
    const t = (this.getTime() - this.time_at_last_tick_message) * this.cps;
    return this.cycle + t;
  }
  setCps(t = 1) {
    this.sendMessage("cpschange", { cps: t });
  }
  setCycle(t) {
    this.sendMessage("setcycle", { cycle: t });
  }
  setStarted(t) {
    this.sendMessage("toggle", { started: t }), this.started = t, this.onToggle?.(t);
  }
  start() {
    gt("[cyclist] start"), this.setStarted(true);
  }
  stop() {
    gt("[cyclist] stop"), this.collator.reset(), this.setStarted(false);
  }
  setPattern(t, n = false) {
    this.pattern = t, n && !this.started && this.start();
  }
  log(t, n, s) {
    const i = s.filter((r) => r.hasOnset());
    console.log(`${t.toFixed(4)} - ${n.toFixed(4)} ${Array(i.length).fill("I").join("")}`);
  }
}
let Ta, Lb, Rb, Bb, Vb;
function Ia() {
  if (!Ta)
    throw new Error("no time set! use setTime to define a time source");
  return Ta();
}
function ar(e) {
  Ta = e;
}
function kb(e) {
  Lb = e;
}
function ZP() {
  return Lb?.();
}
function zb(e) {
  Rb = e;
}
function EP() {
  return Rb;
}
function Nb(e) {
  Bb = e;
}
function LP() {
  return Bb;
}
function Wb(e) {
  Vb = !!e;
}
function RP() {
  return Vb;
}
function _a(e, t) {
  if (t || (t = "assertion failed"), !e)
    throw new Error(t);
}
let Ee = class {
  constructor(t, n) {
    this.type = t, n !== void 0 && (this.value = n), this.ins = [];
  }
  static parseInput(t, n) {
    if (typeof t == "function") {
      if (!n)
        throw new Error(
          "tried to parse function input without without passing node.."
        );
      return t(n);
    }
    return typeof t == "object" ? t : typeof t == "number" && !isNaN(t) || typeof t == "string" ? Ot(t) : (console.log(
      `invalid input type "${typeof t}" for node of type "${n.type}", falling back to 0. The input was:`,
      t
    ), 0);
  }
};
const Ls = (e, t) => new Ee(e, t);
let Pt = /* @__PURE__ */ new Map();
const Hn = "poly", Ya = "exit";
Ee.prototype.inherit = function(e) {
  return e.inputOf && (this.inputOf = e.inputOf), e.outputOf && (this.outputOf = e.outputOf), this;
};
Ee.prototype.toObject = function() {
  return JSON.parse(JSON.stringify(this));
};
Ee.prototype.stringify = function() {
  return JSON.stringify(this, null, 2).replaceAll('"', "'");
};
function Tb(e, ...t) {
  let n = 1;
  if (t = t.map((i) => {
    if (Array.isArray(i)) {
      if (i.length === 1)
        return i[0];
      i = new Ee(Hn).withIns(...i);
    }
    if (typeof i == "function") {
      const r = i(new Ee("peek"));
      r.type === Hn && (n = Math.max(r.ins.length, n));
    }
    return i.type === Hn && (n = Math.max(i.ins.length, n)), i;
  }), n === 1) {
    const i = Ls(e);
    return i.withIns(...t.map((r) => Ee.parseInput(r, i)));
  }
  if (e === Ya) {
    const i = t.map((r) => r.type === Hn ? r.ins.map((a) => Ee.parseInput(a).inherit(a)) : r).flat();
    return Ls(Ya).withIns(...i);
  }
  const s = Array.from({ length: n }, (i, r) => {
    const a = new Ee(e), u = t.map((o) => o.type === Hn ? Ee.parseInput(o.ins[r % o.ins.length], a).inherit(o) : (o = Ee.parseInput(o, a), o.type === Hn && (o = o.ins[r]), o));
    return a.withIns(...u);
  });
  return new Ee(Hn).withIns(...s);
}
function BP(e, t) {
  const n = Pt.get(e);
  return n?.ins?.[t] ? n.ins[t].name : "";
}
let q = (e, t) => bt(e, (...n) => Tb(e, ...n), t);
Pt.set("register", {
  tags: ["meta"],
  graph: false,
  description: "Registers a new Node function. Sets it on the prototype + returns the function itself. Like `module` but doesn't hide complexity in graph viz.",
  examples: [
    `let kick = register('kick', gate => gate.adsr(0,.11,0,.11)
.apply(env => env.mul(env)
  .mul(158)
  .sine(env)
  .distort(.85)
))
impulse(2).kick().out()`
  ]
});
let bt = (e, t, n) => (n && Pt.set(e, n), Ee.prototype[e] = function(...s) {
  return t(this, ...s);
}, Ee.prototype["_" + e] = function() {
  return this;
}, t);
Pt.set("module", {
  tags: ["meta"],
  graph: true,
  description: "Creates a module. Like `register`, but the graph viz will hide the internal complexity of the module.",
  examples: [
    `let kick = module('kick', gate => gate.adsr(0,.11,0,.11)
.apply(env => env.mul(env)
  .mul(158)
  .sine(env)
  .distort(.85)
))
impulse(2).kick().out()`
  ]
});
let VP = 0;
function It(e, t, n) {
  return bt(
    e,
    (...s) => {
      const i = VP++;
      return s = s.map(
        (r, a) => Ee.parseInput(r).asModuleInput?.(e, i, a)
      ), t(...s).asModuleOutput?.(e, i);
    },
    n
  );
}
Pt.set("n", {
  tags: ["math"],
  description: "Constant value node. Turns a number into a Node.",
  ins: [{ name: "value", default: 0 }]
});
function Ot(e) {
  return Array.isArray(e) ? poly(...e.map((t) => Ot(t))) : typeof e == "object" ? e : Ls("n", e);
}
Pt.set("out", {
  tags: ["meta"],
  description: "Sends the node to the audio output"
});
Pt.set("withIns", {
  internal: true,
  tags: ["innards"],
  description: "Sets the inputs of a node. Returns the node itself",
  ins: [{ name: "in", dynamic: true }]
});
Ee.prototype.withIns = function(...e) {
  return this.ins = e, this;
};
Pt.set("flatten", {
  internal: true,
  tags: ["innards"],
  description: "Flattens the node to a list of all nodes in the graph, where each Node's ins are now indices"
});
Ee.prototype.flatten = function() {
  return zP(this);
};
Pt.set("apply", {
  graph: true,
  tags: ["meta"],
  description: "Applies the given function to the Node. Useful when a node has to be used multiple times.",
  examples: [
    `impulse(4)
.apply(imp=>imp
  .seq(110,220,330,440)
  .sine()
  .mul( imp.ad(.1,.1) )
).out()`
  ]
});
Ee.prototype.apply = function(e) {
  return e(this);
};
Pt.set("clone", {
  internal: true,
  tags: ["innards"],
  description: "Clones the node"
});
Ee.prototype.clone = function() {
  return new Ee(this.type, this.value).withIns(...this.ins);
};
Pt.set("map", {
  tags: ["meta"],
  description: "Applies the given function to all ins if it's poly node. Otherwise it applies the function to itself.",
  examples: [
    `n([110,220,330])
.map( freq=>freq.mul([1,1.007]).saw().mix() )
.mix(2).mul(.5).out()`
  ]
});
Ee.prototype.map = function(e) {
  return this.type !== "poly" ? e(this) : poly(...this.ins.map(e));
};
Ee.prototype.channel = function(e) {
  return this.type !== "poly" ? this : this.ins[e % this.ins.length];
};
Pt.set("select", {
  tags: ["meta"],
  graph: true,
  description: "Find the first occurence of the given type up in the graph and returns the match. Useful to exit a feedback loop at another point.",
  examples: [
    `sine(220).mul(impulse(1).ad(.001,.2))
.add( x=>x.delay(.2).mul(.8) )
.select('delay').out()
`
  ]
});
Ee.prototype.select = function(e) {
  for (let t of this.ins) {
    if (t.type === e)
      return t;
    const n = t.select(e);
    if (n)
      return n;
  }
};
Pt.set("debug", {
  tags: ["meta"],
  description: "Logs the node to the console"
});
Ee.prototype.debug = function(e = (t) => t) {
  return console.log(e(this)), this;
};
function kP(e) {
  const t = modules.get(e), n = Array.from(
    { length: t.length },
    (i, r) => Ls(`$INPUT${r}`)
  ), s = t(...n);
  return JSON.stringify(s, null, 2);
}
function zP(e) {
  const t = [];
  return Vu(e, (n) => (t.push(n), n)), t.map((n) => {
    let s = {
      ...n,
      type: n.type,
      ins: n.ins.map((i) => t.indexOf(i) + "")
    };
    return n.value !== void 0 && (s.value = n.value), n.to !== void 0 && (s.to = t.indexOf(n.to)), s;
  });
}
let Ib = q("exit", { internal: true });
function _b(e, t) {
  let n = [];
  const s = bt("out", function(i, r = [0, 1]) {
    return n.push(i.output(r)), i;
  });
  return t ? (t.out = s, Function(...Object.keys(t), e)(...Object.values(t))) : (globalThis.out = s, Function(e)()), Ib(...n);
}
Ee.prototype.over = function(e) {
  return this.apply((t) => add(t, e(t)));
};
Ee.prototype.dfs = function(e, t) {
  return this.apply((n) => Vu(n, e, t));
};
Ee.prototype.apply2 = function(e) {
  return e(this, this);
};
let Vu = (e, t, n = []) => (e = t(e, n), n.push(e), e.ins = e.ins.map((s) => n.includes(s) ? s : Vu(s, t, n)), e);
Ee.prototype.asModuleInput = function(e, t, n) {
  return this.inputOf = this.inputOf || [], this.inputOf.push([e, t, n]), this;
};
Ee.prototype.asModuleOutput = function(e, t) {
  return this.outputOf = [e, t], this;
};
function ku(e, t = {}) {
  const {
    log: n = false,
    lang: s = "js",
    fallbackType: i = "thru",
    constType: r = "n",
    getRegister: a = (y) => `r[${y}]`,
    getOutput: u = (y) => `o[${y}]`,
    getSource: o = (y) => `s[${y}]`
  } = t;
  n && console.log("compile", e);
  const c = NP(e);
  let l = [], p = (y) => c[y].type !== r ? a(y) : typeof c[y].value == "string" ? `"${c[y].value}"` : c[y].value;
  const m = [];
  for (let y in c) {
    const x = c[y], v = c[y].ins.map((D) => p(c.indexOf(D))), E = m.length;
    let w = Pt.get(x.type);
    w || (console.warn(
      `unhandled node type "${c[y].type}". falling back to "${i}"`
    ), w = Pt.get(i));
    const V = {
      vars: v,
      node: x,
      nodes: c,
      id: y,
      ugenIndex: E,
      ugen: w.ugen,
      name: p(y),
      lang: s,
      getRegister: a,
      getOutput: u,
      getSource: o
    };
    w.compile && l.push(w.compile(V)), w.ugen && m.push({ type: w.ugen, inputs: v });
  }
  const g = l.join(`
`);
  return n && (console.log("compiled code:"), console.log(g)), { src: g, ugens: m, registers: c.length };
}
Ee.prototype.compile = function(e) {
  return ku(this, e);
};
function NP(e) {
  const t = [], n = /* @__PURE__ */ new Set();
  function s(i) {
    if (!(typeof i != "object" || n.has(i))) {
      n.add(i);
      for (let r in i.ins)
        s(i.ins[r]);
      t.push(i);
    }
  }
  return s(e), t;
}
const pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compile: ku
}, Symbol.toStringTag, { value: "Module" }));
class Yb {
  constructor() {
    this._events = {};
  }
  on(t, n) {
    this._events[t] || (this._events[t] = []);
    let s = this._events[t];
    _a(s.indexOf(n) == -1), s.push(n);
  }
  removeListener(t, n) {
    let s = this._events[t], i = s.indexOf(n);
    i != -1 && s.splice(i, 1);
  }
  trigger(t, ...n) {
    let s = this._events[t] || [];
    for (let i = 0; i < s.length; i++)
      s[i].apply(null, n);
  }
}
class WP extends Yb {
  constructor(t = navigator) {
    super(), this.midiAccess = null, this.getMIDIAccess(t);
  }
  // Try to get MIDI access from the browser
  async getMIDIAccess(t) {
    if ("requestMIDIAccess" in t) {
      this.midiAccess = await t.requestMIDIAccess({ sysex: false }), console.log("got MIDI access");
      for (let n of this.midiAccess.inputs.values())
        n.state == "connected" && (n.onmidimessage = (s) => this.trigger("midimessage", n.id, s.data));
      this.midiAccess.onstatechange = (n) => {
        n.port.type == "input" && n.port.state == "connected" && (console.log(
          "MIDI device connected:",
          n.port.name,
          "PORT:",
          n.port.id
        ), n.port.onmidimessage = (s) => this.trigger("midimessage", n.port.id, s.data));
      };
    }
  }
  // Send a message to all MIDI devices
  broadcast(t, n) {
    if (midi)
      for (let s of this.midiAccess.outputs.values())
        s.send(t, n);
  }
}
function TP(e) {
  let t = e[0] & 240, n = (e[0] & 15) + 1;
  if (t == 176 && e.length == 3) {
    let s = e[1], i = e[2] / 127 * 2 - 1;
    return { type: "CC", channel: n, cc: s, value: i };
  }
  if (t == 224 && e.length == 3) {
    let s = e[1], i = (e[2] << 7 | s) / 16383 * 2 - 1;
    return { type: "PITCHBEND", channel: n, value: i };
  }
  if (t == 144 && e.length == 3) {
    let s = e[1], i = e[2] / 127;
    return { type: "NOTE_ON", channel: n, note: s, velocity: i };
  }
  if (t == 128 && e.length == 3) {
    let s = e[1];
    return { type: "NOTE_ON", channel: n, note: s, velocity: 0 };
  }
}
class IP extends Yb {
  constructor() {
    super(), this.attach();
  }
  attach() {
    typeof window < "u" && (this.handleMouseMove = (t) => {
      const n = t.clientX / document.body.clientWidth * 2 - 1, s = t.clientY / document.body.clientHeight * 2 - 1;
      this.trigger("move", n, s);
    }, document.addEventListener("mousemove", this.handleMouseMove));
  }
  detach() {
    typeof window < "u" && document.removeEventListener("mousemove", this.handleMouseMove);
  }
}
const _P = "data:text/javascript;base64,KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGcoaCx0KXtpZih0fHwodD0iYXNzZXJ0aW9uIGZhaWxlZCIpLCFoKXRocm93IG5ldyBFcnJvcih0KX1mdW5jdGlvbiBTKGgsdCxzKXtyZXR1cm4gaDw9MD90Omg+PTE/czp0K2gqKHMtdCl9ZnVuY3Rpb24gUChoLHQscyl7cmV0dXJuIGg8PXQ/MDpoPj1zPzE6cz09PXQ/MDooaC10KS8ocy10KX1mdW5jdGlvbiBFKGgsdCl7cmV0dXJuIGg8dD8oaC89dCxoK2gtaCpoLTEpOmg+MS10PyhoPShoLTEpL3QsaCpoK2graCsxKTowfWZ1bmN0aW9uIFUoaCl7cmV0dXJuIE1hdGguZmxvb3IoaCk9PT1ofWZ1bmN0aW9uIF8oaCl7cmV0dXJuIFUoaCkmJmg+MH1mdW5jdGlvbiBrKGgsdCl7dD1NYXRoLm1pbihNYXRoLm1heCh0LDApLDEpLHQtPS4wMTt2YXIgcz0yKnQvKDEtdCksZT0oMStzKSpoLygxK3MqTWF0aC5hYnMoaCkpO3JldHVybiBlfWZ1bmN0aW9uIHcoaCx0LHMpe3JldHVybiBoPj0xP3M6dCtoKihzLXQpfWZ1bmN0aW9uIFQoKXt0aGlzLnN0YXRlPSJvZmYiLHRoaXMuc3RhcnRUaW1lPTAsdGhpcy5zdGFydFZhbD0wfVQucHJvdG90eXBlLmV2YWw9ZnVuY3Rpb24oaCx0LHMsZSxpLG4pe3N3aXRjaCh0aGlzLnN0YXRlKXtjYXNlIm9mZiI6cmV0dXJuIHQ+MCYmKHRoaXMuc3RhdGU9ImF0dGFjayIsdGhpcy5zdGFydFRpbWU9aCx0aGlzLnN0YXJ0VmFsPTApLDA7Y2FzZSJhdHRhY2siOntsZXQgcj1oLXRoaXMuc3RhcnRUaW1lO3JldHVybiByPnM/KHRoaXMuc3RhdGU9ImRlY2F5Iix0aGlzLnN0YXJ0VGltZT1oLDEpOncoci9zLHRoaXMuc3RhcnRWYWwsMSl9Y2FzZSJkZWNheSI6e2xldCByPWgtdGhpcy5zdGFydFRpbWUsbD13KHIvZSwxLGkpO3JldHVybiB0PD0wPyh0aGlzLnN0YXRlPSJyZWxlYXNlIix0aGlzLnN0YXJ0VGltZT1oLHRoaXMuc3RhcnRWYWw9bCxsKTpyPmU/KHRoaXMuc3RhdGU9InN1c3RhaW4iLHRoaXMuc3RhcnRUaW1lPWgsaSk6bH1jYXNlInN1c3RhaW4iOnJldHVybiB0PD0wJiYodGhpcy5zdGF0ZT0icmVsZWFzZSIsdGhpcy5zdGFydFRpbWU9aCx0aGlzLnN0YXJ0VmFsPWkpLGk7Y2FzZSJyZWxlYXNlIjp7bGV0IHI9aC10aGlzLnN0YXJ0VGltZTtpZihyPm4pcmV0dXJuIHRoaXMuc3RhdGU9Im9mZiIsMDtsZXQgbD13KHIvbix0aGlzLnN0YXJ0VmFsLDApO3JldHVybiB0PjAmJih0aGlzLnN0YXRlPSJhdHRhY2siLHRoaXMuc3RhcnRUaW1lPWgsdGhpcy5zdGFydFZhbD1sKSxsfX10aHJvdyJpbnZhbGlkIGVudmVsb3BlIHN0YXRlIn07ZnVuY3Rpb24gdigpe3RoaXMuczA9MCx0aGlzLnMxPTB9di5wcm90b3R5cGUuYXBwbHk9ZnVuY3Rpb24oaCx0LHMpe2coIWlzTmFOKGgpLCJOYU4gdmFsdWUgZmVkIGluIFR3b1BvbGVGaWx0ZXIiKSx0PU1hdGgubWluKHQsMSkscz1NYXRoLm1heChzLDApO3ZhciBlPU1hdGgucG93KC41LCgxLXQpLy4xMjUpLGk9TWF0aC5wb3coLjUsKHMrLjEyNSkvLjEyNSksbj0xLWkqZSxyPXRoaXMuczAsbD10aGlzLnMxO3JldHVybiByPW4qci1lKmwrZSpoLGw9bipsK2UqcixoPWwsdGhpcy5zMD1yLHRoaXMuczE9bCxofTtsZXQgQT1jbGFzcyBDe2NvbnN0cnVjdG9yKHQscyl7dGhpcy5zYW1wbGVSYXRlPXQscz90aGlzLmJ1ZmZlcj1zLnNsaWNlKDApOih0aGlzLmJ1ZmZlcj1uZXcgRmxvYXQzMkFycmF5KDEwKnQpLHRoaXMuYnVmZmVyLmZpbGwoMCkpLHRoaXMud3JpdGVJZHg9MCx0aGlzLnJlYWRJZHg9MH1yZXNldCgpe3RoaXMuYnVmZmVyLmZpbGwoMCksdGhpcy53cml0ZUlkeD0wLHRoaXMucmVhZElkeD0wfWNsb25lKCl7Y29uc3QgdD1uZXcgQyh0aGlzLnNhbXBsZVJhdGUsdGhpcy5idWZmZXIpO3JldHVybiB0LndyaXRlSWR4PXRoaXMud3JpdGVJZHgsdC5yZWFkSWR4PXRoaXMucmVhZElkeCx0fXdyaXRlKHQscyl7dGhpcy53cml0ZUlkeD0odGhpcy53cml0ZUlkeCsxKSV0aGlzLmJ1ZmZlci5sZW5ndGgsdGhpcy5idWZmZXJbdGhpcy53cml0ZUlkeF09dDtsZXQgZT1NYXRoLm1pbihNYXRoLmZsb29yKHRoaXMuc2FtcGxlUmF0ZSpzKSx0aGlzLmJ1ZmZlci5sZW5ndGgtMSk7dGhpcy5yZWFkSWR4PXRoaXMud3JpdGVJZHgtZSx0aGlzLnJlYWRJZHg8MCYmKHRoaXMucmVhZElkeCs9dGhpcy5idWZmZXIubGVuZ3RoKX1yZWFkKCl7cmV0dXJuIHRoaXMuYnVmZmVyW3RoaXMucmVhZElkeF19fTtjb25zdCB5PTEvNDhlMyxNPTI0LE49TS80O2NsYXNzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7dGhpcy5ub2RlSWQ9dCx0aGlzLnN0YXRlPXMsdGhpcy5zYW1wbGVSYXRlPWUsdGhpcy5zYW1wbGVUaW1lPTEvZSx0aGlzLnNlbmQ9aX19Y2xhc3MgcSBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5lbnY9bmV3IFR9dXBkYXRlKHQscyxlLGksbixyKXtyZXR1cm4gdGhpcy5lbnYuZXZhbCh0LHMsZSxpLG4scil9fWNsYXNzIEYgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MH11cGRhdGUodCl7bGV0IHM9TSp0LzYwLGU9LjU7cmV0dXJuIHRoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSpzLHRoaXMucGhhc2UlMTxlPzE6LTF9fWNsYXNzIEQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuaW5TZ249ITAsdGhpcy5vdXRTZ249ITAsdGhpcy5jbG9ja0NudD0wfXVwZGF0ZSh0LHMpe2xldCBlPXQ+MDtyZXR1cm4gdGhpcy5pblNnbiE9ZSYmKHRoaXMuY2xvY2tDbnQrKyx0aGlzLmNsb2NrQ250Pj1zJiYodGhpcy5jbG9ja0NudD0wLHRoaXMub3V0U2duPSF0aGlzLm91dFNnbikpLHRoaXMuaW5TZ249ZSx0aGlzLm91dFNnbj8xOi0xfX1jbGFzcyBMIGV4dGVuZHMgb3tjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLmluU2duPSExfXVwZGF0ZSh0LHMpe2xldCBlPXM+MDtyZXR1cm4gZSYmdGhpcy5pblNnbiE9ZSYmdGhpcy5zZW5kKHt0eXBlOiJDTE9DS19QVUxTRSIsbm9kZUlkOnRoaXMubm9kZUlkLHRpbWU6dH0pLHRoaXMuaW5TZ249ZSwwfX1jb25zdCBPPW5ldyBNYXA7Y2xhc3MgViBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSk7Y29uc3Qgbj1zLmlucHV0c1syXTtuJiZPLmhhcyhuKT90aGlzLmRlbGF5PU8uZ2V0KG4pLmNsb25lKCk6dGhpcy5kZWxheT1uZXcgQShlKSxuJiZPLnNldChuLHRoaXMuZGVsYXkpfXVwZGF0ZSh0LHMpe3JldHVybiB0aGlzLmRlbGF5LndyaXRlKHQscyksdGhpcy5kZWxheS5yZWFkKCl9fWNsYXNzIEcgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpfXVwZGF0ZSh0LHMpe3JldHVybiBrKHQscyl9fWNsYXNzIFIgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudmFsdWU9MCx0aGlzLnRyaWdTZ249ITF9d3JpdGUodCxzKXshdGhpcy50cmlnU2duJiZzPjAmJih0aGlzLnZhbHVlPXQpLHRoaXMudHJpZ1Nnbj1zPjB9cmVhZCgpe3JldHVybiB0aGlzLnZhbHVlfXVwZGF0ZSh0LHMpe3JldHVybiB0aGlzLndyaXRlKHQscyksdGhpcy5yZWFkKCl9fWNsYXNzIEJ7Y29uc3RydWN0b3IoKXt0aGlzLnZhbHVlPTB9dXBkYXRlKHQpe3JldHVybiB0aGlzLnZhbHVlPXQsdGhpcy52YWx1ZX19Y29uc3QgJD0zNDA7bGV0IEk9MDtjbGFzcyBIe2NvbnN0cnVjdG9yKCl7dGhpcy5jaD1JLHRoaXMuc3RhcnRfc2VlZD0kKih0aGlzLmNoKzEpPj4+MCx0aGlzLnN0YXRlPXRoaXMuc3RhcnRfc2VlZCx0aGlzLnZhbHVlPTAsdGhpcy5hPTE2NjQ1MjUsdGhpcy5jPTEwMTM5MDQyMjMsdGhpcy5tYXNrPTE2Nzc3MjE1LHRoaXMuc2NhbGU9MS8oMTw8MjQpLEkrK311cGRhdGUodCxzKXtpZighdClyZXR1cm4gdGhpcy52YWx1ZTtzJiYodGhpcy5zdGF0ZT10aGlzLnN0YXJ0X3NlZWQpLHRoaXMuc3RhdGU9dGhpcy5zdGF0ZSp0aGlzLmErdGhpcy5jPj4+MDtjb25zdCBlPSh0aGlzLnN0YXRlJnRoaXMubWFzaykqdGhpcy5zY2FsZTtyZXR1cm4gdGhpcy52YWx1ZT1lKjItMSx0aGlzLnZhbHVlfX1jbGFzcyBqe2NvbnN0cnVjdG9yKCl7dGhpcy52YWx1ZT1NYXRoLnJhbmRvbSgpKjItMX11cGRhdGUodCl7cmV0dXJuIHQ/KHRoaXMudmFsdWU9TWF0aC5yYW5kb20oKSoyLTEsdGhpcy52YWx1ZSk6dGhpcy52YWx1ZX19Y2xhc3MgS3t1cGRhdGUodCl7cmV0dXJuIE1hdGgucmFuZG9tKCk8dCp5P01hdGgucmFuZG9tKCk6MH19Y2xhc3MgV3tjb25zdHJ1Y3Rvcigpe3RoaXMub3V0PTB9dXBkYXRlKCl7bGV0IHQ9TWF0aC5yYW5kb20oKSoyLTE7cmV0dXJuIHRoaXMub3V0PSh0aGlzLm91dCsuMDIqdCkvMS4wMix0aGlzLm91dH19Y2xhc3MgWHtjb25zdHJ1Y3Rvcigpe3RoaXMuYjA9MCx0aGlzLmIxPTAsdGhpcy5iMj0wLHRoaXMuYjM9MCx0aGlzLmI0PTAsdGhpcy5iNT0wLHRoaXMuYjY9MH11cGRhdGUoKXtjb25zdCB0PU1hdGgucmFuZG9tKCkqMi0xO3RoaXMuYjA9Ljk5ODg2KnRoaXMuYjArdCouMDU1NTE3OSx0aGlzLmIxPS45OTMzMip0aGlzLmIxK3QqLjA3NTA3NTksdGhpcy5iMj0uOTY5KnRoaXMuYjIrdCouMTUzODUyLHRoaXMuYjM9Ljg2NjUqdGhpcy5iMyt0Ki4zMTA0ODU2LHRoaXMuYjQ9LjU1KnRoaXMuYjQrdCouNTMyOTUyMix0aGlzLmI1PS0uNzYxNip0aGlzLmI1LXQqLjAxNjg5ODtjb25zdCBzPXRoaXMuYjArdGhpcy5iMSt0aGlzLmIyK3RoaXMuYjMrdGhpcy5iNCt0aGlzLmI1K3RoaXMuYjYrdCouNTM2MjtyZXR1cm4gdGhpcy5iNj10Ki4xMTU5MjYscyouMTF9fWNsYXNzIFkgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MX11cGRhdGUodCl7dGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQ7bGV0IHM9dGhpcy5waGFzZT49MT8xOjA7cmV0dXJuIHRoaXMucGhhc2U9dGhpcy5waGFzZSUxLHN9fWNsYXNzIHogZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MH11cGRhdGUodCxzKXtyZXR1cm4gdGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQsdGhpcy5waGFzZSUxPHM/MTotMX19Y2xhc3MgWiBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5waGFzZT0wfXVwZGF0ZSh0KXtyZXR1cm4gdGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQsdGhpcy5waGFzZSUxKjItMX19Y2xhc3MgSntjb25zdHJ1Y3Rvcigpe3RoaXMucGhhc2U9TWF0aC5yYW5kb20oKX11cGRhdGUodCl7Y29uc3Qgcz10L3NhbXBsZVJhdGU7bGV0IGU9RSh0aGlzLnBoYXNlLHMpLGk9Mip0aGlzLnBoYXNlLTEtZTtyZXR1cm4gdGhpcy5waGFzZSs9cyx0aGlzLnBoYXNlPjEmJih0aGlzLnBoYXNlLT0xKSxpfX1jbGFzcyBRIGV4dGVuZHMgb3tjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnBoYXNlPTAsdGhpcy5zeW5jU2duPSExfXVwZGF0ZSh0LHMsZSl7IXRoaXMuc3luY1NnbiYmcz4wJiYodGhpcy5waGFzZT0wKSx0aGlzLnN5bmNTZ249cz4wO2xldCBpPSh0aGlzLnBoYXNlK2UpJTE7cmV0dXJuIHRoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSp0LE1hdGguc2luKGkqMipNYXRoLlBJKX19Y2xhc3MgdHR7ZEJUb0xpbmVhcih0KXtyZXR1cm4gTWF0aC5wb3coMTAsdC8yMCl9bGluZWFyVG9EQih0KXtyZXR1cm4gMjAqTWF0aC5sb2cxMCh0KX11cGRhdGUodCxzLGUpe2xldCBpPXRoaXMubGluZWFyVG9EQihNYXRoLmFicyh0KSksbj0wO3JldHVybiBpPnMmJihuPShpLXMpKigxLTEvZSkpLHRoaXMuZEJUb0xpbmVhcigtbil9fWNsYXNzIHN0IGV4dGVuZHMgb3tjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnBoYXNlPTB9dXBkYXRlKHQpe3RoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSp0O2xldCBzPXRoaXMucGhhc2UlMTtyZXR1cm4oczwuNT8yKnM6MS0yKihzLS41KSkqMi0xfX1jbGFzcyBldCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSk7Y29uc3Qgbj1lLzMwO2coXyhuKSksdGhpcy5idWZmZXI9bmV3IEZsb2F0MzJBcnJheShuKSx0aGlzLndyaXRlUG9zPTB9dXBkYXRlKHQscyxlLGkpe3JldHVybiB0aGlzLmJ1ZmZlclt0aGlzLndyaXRlUG9zXT10LHRoaXMud3JpdGVQb3MrKyx0aGlzLndyaXRlUG9zJXRoaXMuYnVmZmVyLmxlbmd0aD09MCYmKHRoaXMud3JpdGVQb3M9MCx0aGlzLnNlbmQoe3R5cGU6IlNFTkRfU0FNUExFUyIsaWQ6cyxzYW1wbGVzOnRoaXMuYnVmZmVyLGNoYW5uZWxzOmUsY2hhbm5lbDppfSkpLHR9fWNsYXNzIGl0e2NvbnN0cnVjdG9yKCl7dGhpcy5sYWdVbml0PTQ0MTAsdGhpcy5zPTB9dXBkYXRlKHQscyl7cmV0dXJuIHM9cyp0aGlzLmxhZ1VuaXQsczwxJiYocz0xKSx0aGlzLnMrPTEvcyoodC10aGlzLnMpLHRoaXMuc319Y2xhc3MgaHR7Y29uc3RydWN0b3IoKXt0aGlzLmxhc3Q9MH11cGRhdGUodCxzLGUpe2NvbnN0IGk9cyp5LG49ZSp5O2xldCByPXQtdGhpcy5sYXN0O3JldHVybiByPmk/cj1pOnI8LW4mJihyPS1uKSx0aGlzLmxhc3QrPXIsdGhpcy5sYXN0fX1jbGFzcyBhdCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5zPTB9dXBkYXRlKHQscyl7cmV0dXJuIHM9cyoxZTMsczwxJiYocz0xKSx0aGlzLnMrPTEvcyoodC10aGlzLnMpLHRoaXMuc319Y2xhc3MgbnQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuZmlsdGVyPW5ldyB2fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuZmlsdGVyLmFwcGx5KHQscyxlKSx0aGlzLmZpbHRlci5zMX19Y2xhc3MgcnQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuZmlsdGVyPW5ldyB2fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuZmlsdGVyLmFwcGx5KHQscyxlKSx0aGlzLmZpbHRlci5zMH19Y2xhc3MgdXQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpfXVwZGF0ZSh0LHMpe3JldHVybiBzPDAmJihzPTApLHM9cysxLHQ9dCpzLDQqKE1hdGguYWJzKC4yNSp0Ky4yNS1NYXRoLnJvdW5kKC4yNSp0Ky4yNSkpLS4yNSl9fWNsYXNzIGx0IGV4dGVuZHMgb3t1cGRhdGUodCl7cmV0dXJuIHR9fWNsYXNzIG0gZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMubm90ZT0wLHRoaXMuZnJlcT0wLHRoaXMudmVsb2NpdHk9MCx0aGlzLmdhdGVTdGF0ZT0ib2ZmIix0aGlzLnR5cGU9Im1pZGlpbiIsdGhpcy5jaGFubmVsPS0xfWlzRnJlZSgpe3JldHVybiB0aGlzLmdhdGVTdGF0ZT09PSJvZmYifW5vdGVPbih0LHMpe3M+MD8odGhpcy5ub3RlPXQsdGhpcy52ZWxvY2l0eT1zLHRoaXMuZnJlcT0yKiooKHQtNjkpLzEyKSo0NDAsdGhpcy5nYXRlU3RhdGU9InByZXRyaWciKTp0aGlzLm5vdGVPZmYoKX1ub3RlT2ZmKCl7dGhpcy5ub3RlPTAsdGhpcy5nYXRlU3RhdGU9Im9mZiJ9Z2V0R2F0ZSgpe3N3aXRjaCh0aGlzLmdhdGVTdGF0ZSl7Y2FzZSJwcmV0cmlnIjpyZXR1cm4gdGhpcy5nYXRlU3RhdGU9Im9uIiwwO2Nhc2Uib24iOnJldHVybiAxO2Nhc2Uib2ZmIjpyZXR1cm4gMDtkZWZhdWx0OmcoITEpfX1nZXRGcmVxKCl7c3dpdGNoKHRoaXMuZ2F0ZVN0YXRlKXtjYXNlInByZXRyaWciOnJldHVybiB0aGlzLmdhdGVTdGF0ZT0ib24iLDA7Y2FzZSJvbiI6cmV0dXJuIHRoaXMuZnJlcTtjYXNlIm9mZiI6cmV0dXJuIHRoaXMuZnJlcTtkZWZhdWx0OmcoITEpfX1nZXRWZWxvY2l0eSgpe3N3aXRjaCh0aGlzLmdhdGVTdGF0ZSl7Y2FzZSJwcmV0cmlnIjpyZXR1cm4gdGhpcy5nYXRlU3RhdGU9Im9uIiwwO2Nhc2Uib24iOnJldHVybiB0aGlzLnZlbG9jaXR5O2Nhc2Uib2ZmIjpyZXR1cm4gdGhpcy52ZWxvY2l0eTtkZWZhdWx0OmcoITEpfX19Y2xhc3Mgb3QgZXh0ZW5kcyBte2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudHlwZT0ibWlkaWdhdGUifXVwZGF0ZSh0KXtyZXR1cm4gdGhpcy5jaGFubmVsPXQsdGhpcy5nZXRHYXRlKCl9fWNsYXNzIGN0IGV4dGVuZHMgbXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnR5cGU9Im1pZGlmcmVxIn11cGRhdGUodCl7cmV0dXJuIHRoaXMuY2hhbm5lbD10LHRoaXMuZ2V0RnJlcSgpfX1jbGFzcyBkdCBleHRlbmRzIG17Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy50eXBlPSJtaWRpdmVsIn11cGRhdGUodCl7cmV0dXJuIHRoaXMuY2hhbm5lbD10LHRoaXMuZ2V0VmVsb2NpdHkoKX19Y2xhc3MgZnR7Y29uc3RydWN0b3IodCxzLGUsaSl7dGhpcy51cD0hMSx0aGlzLnNlbmQ9aSx0aGlzLnZhbHVlPTAsdGhpcy50eXBlPSJjYyJ9c2V0VmFsdWUodCl7dGhpcy52YWx1ZT10fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuaWQ9cywhdGhpcy51cCYmdD4wPyh0aGlzLnVwPSEwLHRoaXMuc2VuZCh7dHlwZToiU0lHTkFMX1RSSUdHRVIiLGlkOnMsdGltZTplfSksdGhpcy52YWx1ZSk6KHRoaXMudXA9dD4wLHRoaXMudmFsdWUpfX1jbGFzcyBwdCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy50eXBlPSJjYyIsdGhpcy52YWx1ZT1zLmlucHV0c1sxXT8/MH1zZXRWYWx1ZSh0KXt0aGlzLnZhbHVlPXR9dXBkYXRlKHQpe3JldHVybiB0aGlzLmlkPXQsdGhpcy52YWx1ZX19Y2xhc3MgYnQgZXh0ZW5kcyBve2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudHlwZT0ibWlkaWNjIix0aGlzLnZhbHVlPXMuaW5wdXRzWzJdPz8tMSx0aGlzLmNoYW5uZWw9LTEsdGhpcy5jY251bWJlcj0tMX1zZXRWYWx1ZSh0KXt0aGlzLnZhbHVlPXR9dXBkYXRlKHQscyl7cmV0dXJuIHRoaXMuY2NudW1iZXI9dCx0aGlzLmNoYW5uZWw9cyx0aGlzLnZhbHVlfX1jbGFzcyBndCBleHRlbmRzIG97Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5jbG9ja1Nnbj0hMCx0aGlzLnN0ZXA9MCx0aGlzLmZpcnN0PSEwfXVwZGF0ZSh0LC4uLnMpe3JldHVybiF0aGlzLmNsb2NrU2duJiZ0PjA/KHRoaXMuc3RlcD0odGhpcy5zdGVwKzEpJXMubGVuZ3RoLHRoaXMuY2xvY2tTZ249dD4wLDApOih0aGlzLmNsb2NrU2duPXQ+MCxzW3RoaXMuc3RlcF0pfX1jbGFzcyBtdCBleHRlbmRzIG97dXBkYXRlKHQsLi4ucyl7Y29uc3QgZT10JXMubGVuZ3RoK3MubGVuZ3RoO3JldHVybiBzW01hdGguZmxvb3IoZSklcy5sZW5ndGhdfX1jbGFzcyBTdHt1cGRhdGUodCxzLGUsaSxuKXtsZXQgcj1QKHQscyxlKTtyZXR1cm4gUyhyLGksbil9fWNsYXNzIHd0e3VwZGF0ZSh0LHMsZSl7cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHQscyksZSl9fWNsYXNzIHZ0e2NvbnN0cnVjdG9yKCl7dGhpcy5oaT0hMX11cGRhdGUodCl7cmV0dXJuIXRoaXMuaGkmJnQ+MD8odGhpcy5oaT0hMCwxKToodGhpcy5oaSYmdDw9MCYmKHRoaXMuaGk9ITEpLDApfX1jbGFzcyB5dHtjb25zdHJ1Y3Rvcigpe3RoaXMueDE9MCx0aGlzLngyPTAsdGhpcy55MT0wLHRoaXMueTI9MCx0aGlzLmEwPTEsdGhpcy5hMT0wLHRoaXMuYTI9MCx0aGlzLmIwPTEsdGhpcy5iMT0wLHRoaXMuYjI9MH11cGRhdGUodD0wLHM9MCxlPTUwMCxpPTEsbj0xKXtjb25zdCByPTIqTWF0aC5QSSplL3NhbXBsZVJhdGUsbD1NYXRoLnNpbihyKTtpPU1hdGgucG93KDEwLGkvMjApO2NvbnN0IHU9bC8oMippKSxjPU1hdGguY29zKHIpO2lmKHM9PT0wKXRoaXMuYjE9MS1jLHRoaXMuYjA9dGhpcy5iMS8yLHRoaXMuYjI9dGhpcy5iMCx0aGlzLmEwPTErdSx0aGlzLmExPS0yKmMsdGhpcy5hMj0xLXU7ZWxzZSBpZihzPT09MSl0aGlzLmIwPSgxK2MpLzIsdGhpcy5iMT0tKDErYyksdGhpcy5iMj10aGlzLmIwLHRoaXMuYTA9MSt1LHRoaXMuYTE9LTIqYyx0aGlzLmEyPTEtdTtlbHNlIGlmKHM9PT0yKXRoaXMuYjA9bC8yLHRoaXMuYjE9MCx0aGlzLmIyPS10aGlzLmIwLHRoaXMuYTA9MSt1LHRoaXMuYTE9LTIqYyx0aGlzLmEyPTEtdTtlbHNlIGlmKHM9PT0zKXRoaXMuYjA9MSx0aGlzLmIxPS0yKmMsdGhpcy5iMj0xLHRoaXMuYTA9MSt1LHRoaXMuYTE9LTIqYyx0aGlzLmEyPTEtdTtlbHNlIGlmKHM9PT00KXRoaXMuYjA9MS11LHRoaXMuYjE9LTIqYyx0aGlzLmIyPTErdSx0aGlzLmEwPTErdSx0aGlzLmExPS0yKmMsdGhpcy5hMj0xLXU7ZWxzZSBpZihzPT09NSl7Y29uc3QgYT1NYXRoLnBvdygxMCxuLzQwKTt0aGlzLmIwPTErdSphLHRoaXMuYjE9LTIqYyx0aGlzLmIyPTEtdSphLHRoaXMuYTA9MSt1L2EsdGhpcy5hMT0tMipjLHRoaXMuYTI9MS11L2F9ZWxzZSBpZihzPT09Nil7Y29uc3QgYT1NYXRoLnBvdygxMCxuLzQwKSxkPTIqTWF0aC5zcXJ0KGEpKnUsZj0oYS0xKSpjLHA9KGErMSkqYzt0aGlzLmIwPWEqKGErMS1mK2QpLHRoaXMuYjE9MiphKihhLTEtcCksdGhpcy5iMj1hKihhKzEtZi1kKSx0aGlzLmEwPWErMStmK2QsdGhpcy5hMT0tMiooYS0xK3ApLHRoaXMuYTI9YSsxK2YtZH1lbHNlIGlmKHM9PT03KXtjb25zdCBhPU1hdGgucG93KDEwLG4vNDApLGQ9MipNYXRoLnNxcnQoYSkqdSxmPShhLTEpKmMscD0oYSsxKSpjO3RoaXMuYjA9YSooYSsxK2YrZCksdGhpcy5iMT0tMiphKihhLTErcCksdGhpcy5iMj1hKihhKzErZi1kKSx0aGlzLmEwPWErMS1mK2QsdGhpcy5hMT0yKihhLTEtcCksdGhpcy5hMj1hKzEtZi1kfXRoaXMuYjAvPXRoaXMuYTAsdGhpcy5iMS89dGhpcy5hMCx0aGlzLmIyLz10aGlzLmEwLHRoaXMuYTEvPXRoaXMuYTAsdGhpcy5hMi89dGhpcy5hMCx0aGlzLmEwPTE7Y29uc3QgYj10aGlzLmIwKnQrdGhpcy5iMSp0aGlzLngxK3RoaXMuYjIqdGhpcy54Mi10aGlzLmExKnRoaXMueTEtdGhpcy5hMip0aGlzLnkyO3JldHVybiB0aGlzLngyPXRoaXMueDEsdGhpcy54MT10LHRoaXMueTI9dGhpcy55MSx0aGlzLnkxPWIsYn19Y29uc3QgTXQ9T2JqZWN0LmZyZWV6ZShPYmplY3QuZGVmaW5lUHJvcGVydHkoe19fcHJvdG9fXzpudWxsLEFEU1JOb2RlOnEsQXVkaW9JbjpsdCxBdWRpb05vZGU6byxCUEY6cnQsQmlxdWFkRmlsdGVyOnl0LEJyb3duTm9pc2VPc2M6VyxDQzpwdCxDTE9DS19QUFE6TSxDTE9DS19QUFM6TixDbGlwOnd0LENsb2NrOkYsQ2xvY2tEaXY6RCxDbG9ja091dDpMLERlbGF5OlYsRGlzdG9ydDpHLER1c3RPc2M6SyxGaWx0ZXI6bnQsRm9sZDp1dCxIb2xkOlIsSW1wdWxzZU9zYzpZLExhZzppdCxMY2dOb2lzZTpILE1pZGlDQzpidCxNaWRpRnJlcTpjdCxNaWRpR2F0ZTpvdCxNaWRpSW46bSxNaWRpVmVsOmR0LE5vaXNlT3NjOmosT3V0cHV0OkIsUGljazptdCxQaW5rTm9pc2U6WCxQdWxzZU9zYzp6LFJlbWFwOlN0LFNhd09zYzpKLFNjb3BlOmV0LFNlcXVlbmNlOmd0LFNpZGVjaGFpbkNvbXByZXNzb3I6dHQsU2lnbmFsOmZ0LFNpbmVPc2M6USxTbGV3Omh0LFNsaWRlOmF0LFRyaU9zYzpzdCxUcmlnOnZ0LFphd09zYzpafSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOiJNb2R1bGUifSkpLHg9bmV3IE1hcChPYmplY3QuZW50cmllcyhNdCkpO2NsYXNzIE90e2NvbnN0cnVjdG9yKHQscyl7Zyh0PT00OGUzKSx0aGlzLnNhbXBsZVJhdGU9dCx0aGlzLnBsYXlQb3M9MCx0aGlzLnNlbmQ9cyx0aGlzLnVuaXRzPVtdLHRoaXMudW5pdElEPTAsdGhpcy5mYWRlVGltZT0uMDEsdGhpcy5tYXhVbml0cz0xLHRoaXMucT1bXX1mYWRlT3V0VW5pdCh0KXt0LmZhZGVPdXQodGhpcy5wbGF5UG9zLHRoaXMuZmFkZVRpbWUpLHRoaXMuZnJlZVVuaXQodC5pZCx0aGlzLmZhZGVUaW1lKX1mYWRlT3V0VW5pdEJ5SWQodCl7Y29uc3Qgcz10aGlzLnVuaXRzLmZpbmQoZT0+ZS5pZD09PXQpO3MmJnRoaXMuZmFkZU91dFVuaXQocyl9ZmFkZU91dEFsbFVuaXRzKCl7dGhpcy51bml0cy5mb3JFYWNoKHQ9PnRoaXMuZmFkZU91dFVuaXQodCkpfWZhZGVPdXRPbGRVbml0cygpe2NvbnN0IHQ9dGhpcy51bml0cy5maWx0ZXIoZT0+ZS5hY3RpdmUpLHM9dC5sZW5ndGgtdGhpcy5tYXhVbml0cztzPD0wfHx0LnNsaWNlKDAscykuZm9yRWFjaChlPT50aGlzLmZhZGVPdXRVbml0KGUpKX1zdG9wKCl7dGhpcy5mYWRlT3V0QWxsVW5pdHMoKSx0aGlzLnNlbmQoe3R5cGU6IlNUT1AiLGZhZGVUaW1lOnRoaXMuZmFkZVRpbWV9KX1zcGF3blVuaXQodCxzKXtjb25zdCBlPW5ldyB4dCh0aGlzLnVuaXRJRCsrLHQsdGhpcy5zYW1wbGVSYXRlLHRoaXMuc2VuZCk7dGhpcy51bml0cy5wdXNoKGUpLGUuZmFkZUluKHRoaXMucGxheVBvcyx0aGlzLmZhZGVUaW1lKSx0aGlzLmZhZGVPdXRPbGRVbml0cygpLGNvbnNvbGUubG9nKGBzcGF3biB1bml0ICR7ZS5pZH0sIHVuaXRzIGFsaXZlOiAke3RoaXMudW5pdHMubGVuZ3RofWApLHMmJnRoaXMuc2NoZWR1bGVNZXNzYWdlKHttc2c6e3R5cGU6IkZBREVfT1VUX1VOSVQiLGlkOmUuaWR9LHRpbWU6c30pfWZyZWVVbml0KHQscyl7aWYocyl7dGhpcy5zY2hlZHVsZU1lc3NhZ2Uoe21zZzp7dHlwZToiRlJFRV9VTklUIixpZDp0fSx0aW1lOnN9KTtyZXR1cm59Y29uc3QgZT10aGlzLnVuaXRzLmxlbmd0aDt0aGlzLnVuaXRzPXRoaXMudW5pdHMuZmlsdGVyKGk9PmkuaWQhPT10KSxlPnRoaXMudW5pdHMubGVuZ3RoJiZjb25zb2xlLmxvZyhgZnJlZSB1bml0ICR7dH0sIHVuaXRzIGFsaXZlOiAke3RoaXMudW5pdHMubGVuZ3RofWApfXBhcnNlTXNnKHQpe3N3aXRjaCh0LnR5cGUpe2Nhc2UiU1BBV05fVU5JVCI6dGhpcy5zcGF3blVuaXQodC51bml0LHQuZHVyYXRpb24pO2JyZWFrO2Nhc2UiRlJFRV9VTklUIjp0aGlzLmZyZWVVbml0KHQuaWQpO2JyZWFrO2Nhc2UiRkFERV9PVVRfVU5JVCI6dGhpcy5mYWRlT3V0VW5pdEJ5SWQodC5pZCk7YnJlYWs7Y2FzZSJOT1RFX09OIjp0aGlzLm5vdGVPbih0KTticmVhaztjYXNlIkNDIjp0aGlzLm1pZGlDQyh0KTticmVhaztjYXNlIlNFVF9DT05UUk9MIjp0aGlzLnNldENvbnRyb2wodCk7YnJlYWs7Y2FzZSJGQURFX1RJTUUiOnRoaXMuZmFkZVRpbWU9TnVtYmVyKHQuZmFkZVRpbWUpO2JyZWFrO2Nhc2UiTUFYX1VOSVRTIjp0aGlzLm1heFVuaXRzPU51bWJlcih0Lm1heFVuaXRzKTticmVhaztjYXNlIlNUT1AiOnRoaXMuc3RvcCgpO2JyZWFrO2Nhc2UiU0VUX1VHRU4iOnRoaXMuYWRkVWdlbih0LmNsYXNzTmFtZSx0LnVnZW4pO2JyZWFrO2Nhc2UiU0NIRURVTEVfTVNHIjp0aGlzLnNjaGVkdWxlTWVzc2FnZSh0KTticmVhaztjYXNlIkJBVENIX01TRyI6dC5tZXNzYWdlcy5mb3JFYWNoKHM9PnRoaXMucGFyc2VNc2cocykpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihgdW5rbm93biBtZXNzYWdlIHR5cGUgJHt0LnR5cGV9YCl9fW5vdGVPbih0KXt0aGlzLnVuaXRzLmZvckVhY2gocz0+cy5ub3RlT24odCkpfW1pZGlDQyh0KXt0aGlzLnVuaXRzLmZvckVhY2gocz0+cy5taWRpQ0ModCkpfXNldENvbnRyb2wodCl7dGhpcy51bml0cy5mb3JFYWNoKHM9PnMuc2V0Q29udHJvbCh0KSl9c2NoZWR1bGVNZXNzYWdlKHQpe2lmKHQudGltZT10aGlzLnBsYXlQb3MrdC50aW1lLCF0aGlzLnEubGVuZ3RoKXt0aGlzLnEucHVzaCh0KTtyZXR1cm59bGV0IHM9MDtmb3IoO3M8dGhpcy5xLmxlbmd0aCYmdGhpcy5xW3NdLnRpbWU8dC50aW1lOylzKys7dGhpcy5xLnNwbGljZShzLDAsdCl9Z2VuU2FtcGxlKHQpe2Zvcig7dGhpcy5xLmxlbmd0aD4wJiZ0aGlzLnFbMF0udGltZTw9dGhpcy5wbGF5UG9zOyl0aGlzLnBhcnNlTXNnKHRoaXMucVswXS5tc2cpLHRoaXMucS5zaGlmdCgpO2lmKCF0aGlzLnVuaXRzLmxlbmd0aClyZXR1cm5bMCwwXTtjb25zdCBzPVswLDBdO2ZvcihsZXQgZT0wO2U8dGhpcy51bml0cy5sZW5ndGg7ZSsrKXtjb25zdCBpPXRoaXMudW5pdHNbZV0sbj1pLmdldExldmVsKHRoaXMucGxheVBvcyk7aS5nZW5TYW1wbGUodGhpcy5wbGF5UG9zLGkubm9kZXMsdCxpLnJlZ2lzdGVycyxpLm91dHB1dHMsaS5zb3VyY2VzKSxzWzBdKz1pLm91dHB1dHNbMF0qbixzWzFdKz1pLm91dHB1dHNbMV0qbn1yZXR1cm4gdGhpcy5wbGF5UG9zKz0xLzQ4ZTMsc31hZGRVZ2VuKHQscyl7Y29uc3QgZT1uZXcgRnVuY3Rpb24oYCR7c307cmV0dXJuICR7dH1gKSgpO3guc2V0KHQsZSl9fWNsYXNzIHh0e2NvbnN0cnVjdG9yKHQscyxlLGkpe3RoaXMuaWQ9dCx0aGlzLnNhbXBsZVJhdGU9ZSx0aGlzLnNlbmQ9aSx0aGlzLm5vZGVzPVtdLHRoaXMuYWN0aXZlPSEwO2ZvcihsZXQgciBpbiBzLnVnZW5zKXtjb25zdCBsPXMudWdlbnNbcl07aWYoeC5oYXMobC50eXBlKSl7Y29uc3QgdT14LmdldChsLnR5cGUpLGM9TnVtYmVyKHIpO3RoaXMubm9kZXNbY109bmV3IHUoYyxsLHRoaXMuc2FtcGxlUmF0ZSx0aGlzLnNlbmQpfWVsc2UgY29uc29sZS53YXJuKGB1bmtub3duIHVnZW4gIiR7bC50eXBlfSJgKX10aGlzLnJlZ2lzdGVycz1uZXcgQXJyYXkocy5yZWdpc3RlcnMpLmZpbGwoMCk7bGV0IG49MTY7dGhpcy5vdXRwdXRzPW5ldyBBcnJheShuKS5maWxsKDApLHRoaXMuc291cmNlcz1uZXcgQXJyYXkobikuZmlsbCgwKSxzLnNyYz1gby5maWxsKDApOyAvLyByZXNldCBvdXRwdXRzCmArcy5zcmMsdGhpcy5nZW5TYW1wbGU9bmV3IEZ1bmN0aW9uKCJ0aW1lIiwibm9kZXMiLCJpbnB1dCIsInIiLCJvIiwicyIscy5zcmMpfW5vdGVPbih0KXt2YXIgdSxjLGI7Y29uc3R7Y2hhbm5lbDpzLG5vdGU6ZSx2ZWxvY2l0eTppfT10LG49dGhpcy5ub2Rlcy5maWx0ZXIoYT0+YS50eXBlPT09Im1pZGlmcmVxIiYmKGEuY2hhbm5lbD09PS0xfHxhLmNoYW5uZWw9PT1zKSkscj10aGlzLm5vZGVzLmZpbHRlcihhPT5hLnR5cGU9PT0ibWlkaWdhdGUiJiYoYS5jaGFubmVsPT09LTF8fGEuY2hhbm5lbD09PXMpKSxsPXRoaXMubm9kZXMuZmlsdGVyKGE9PmEudHlwZT09PSJtaWRpdmVsIiYmKGEuY2hhbm5lbD09PS0xfHxhLmNoYW5uZWw9PT1zKSk7aWYoaT4wKXtsZXQgYT1uLmZpbmQocD0+cC5pc0ZyZWUoKSl8fG5bMF0sZD1yLmZpbmQocD0+cC5pc0ZyZWUoKSl8fHJbMF0sZj1sLmZpbmQocD0+cC5pc0ZyZWUoKSl8fGxbMF07YT09bnVsbHx8YS5ub3RlT24oZSxpKSxkPT1udWxsfHxkLm5vdGVPbihlLGkpLGY9PW51bGx8fGYubm90ZU9uKGUsaSl9ZWxzZSh1PW4uZmluZChhPT5hLm5vdGU9PT1lKSk9PW51bGx8fHUubm90ZU9mZigpLChjPXIuZmluZChhPT5hLm5vdGU9PT1lKSk9PW51bGx8fGMubm90ZU9mZigpLChiPWwuZmluZChhPT5hLm5vdGU9PT1lKSk9PW51bGx8fGIubm90ZU9mZigpfW1pZGlDQyh0KXtjb25zdHtjaGFubmVsOnMsY2M6ZSx2YWx1ZTppfT10O3RoaXMubm9kZXMuZm9yRWFjaChuPT57bi50eXBlPT09Im1pZGljYyImJihuLmNoYW5uZWw9PT0tMXx8bi5jaGFubmVsPT09cykmJm4uY2NudW1iZXI9PT1lJiZuLnNldFZhbHVlKGkpfSl9c2V0Q29udHJvbCh0KXtjb25zdHt2YWx1ZTpzLGlkOmV9PXQsaT10aGlzLm5vZGVzLmZpbmQobj0+bi50eXBlPT09ImNjIiYmbi5pZD09PWUpO2kmJmkuc2V0VmFsdWUocyl9Z2V0TGV2ZWwodCl7cmV0dXJuIHRoaXMuZmFkZVN0YXJ0PT09dm9pZCAwPzA6dGhpcy5hY3RpdmU/UygodC10aGlzLmZhZGVTdGFydCkvdGhpcy5mYWRlVGltZSwwLC4zKTpTKCh0LXRoaXMuZmFkZVN0YXJ0KS90aGlzLmZhZGVUaW1lLHRoaXMuZmFkZUZyb20sMCl9ZmFkZUluKHQscyl7dGhpcy5mYWRlU3RhcnQ9dCx0aGlzLmZhZGVUaW1lPXN9ZmFkZU91dCh0LHMpe3RoaXMuZmFkZVRpbWU9cyx0aGlzLmZhZGVGcm9tPXRoaXMuZ2V0TGV2ZWwodCksdGhpcy5hY3RpdmU9ITEsdGhpcy5mYWRlU3RhcnQ9dH1pc0RvbmUodCl7cmV0dXJuIXRoaXMuYWN0aXZlJiZ0aGlzLmdldExldmVsKHQpPT09MH19Y2xhc3MgVHQgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMucG9ydC5vbm1lc3NhZ2U9dGhpcy5vbm1lc3NhZ2UuYmluZCh0aGlzKSx0aGlzLmF1ZGlvR3JhcGg9bmV3IE90KDQ4ZTMsdGhpcy5wb3J0LnBvc3RNZXNzYWdlLmJpbmQodGhpcy5wb3J0KSl9b25tZXNzYWdlKHQpe2xldCBzPXQuZGF0YTt0aGlzLmF1ZGlvR3JhcGgucGFyc2VNc2cocyl9cHJvY2Vzcyh0LHMsZSl7Y29uc3QgaT1zWzBdLG49dFswXVswXSxyPWlbMF0sbD1pWzFdO2ZvcihsZXQgdT0wO3U8ci5sZW5ndGg7dSsrKXtsZXRbYyxiXT10aGlzLmF1ZGlvR3JhcGguZ2VuU2FtcGxlKG4/blt1XTowKTtyW3VdPWMsbFt1XT1ifXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3Nvcigic2FtcGxlLWdlbmVyYXRvciIsVHQpfSkoKTsK", YP = "data:text/javascript;base64,KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NsYXNzIG4gZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiaXNSZWNvcmRpbmciLGRlZmF1bHRWYWx1ZTowfV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuX2J1ZmZlclNpemU9MjA0OCx0aGlzLl9idWZmZXI9bmV3IEZsb2F0MzJBcnJheSh0aGlzLl9idWZmZXJTaXplKSx0aGlzLl9pbml0QnVmZmVyKCl9X2luaXRCdWZmZXIoKXt0aGlzLl9ieXRlc1dyaXR0ZW49MH1faXNCdWZmZXJFbXB0eSgpe3JldHVybiB0aGlzLl9ieXRlc1dyaXR0ZW49PT0wfV9pc0J1ZmZlckZ1bGwoKXtyZXR1cm4gdGhpcy5fYnl0ZXNXcml0dGVuPT09dGhpcy5fYnVmZmVyU2l6ZX1fYXBwZW5kVG9CdWZmZXIoZSl7dGhpcy5faXNCdWZmZXJGdWxsKCkmJnRoaXMuX2ZsdXNoKCksdGhpcy5fYnVmZmVyW3RoaXMuX2J5dGVzV3JpdHRlbl09ZSx0aGlzLl9ieXRlc1dyaXR0ZW4rPTF9X2ZsdXNoKCl7bGV0IGU9dGhpcy5fYnVmZmVyO3RoaXMuX2J5dGVzV3JpdHRlbjx0aGlzLl9idWZmZXJTaXplJiYoZT1lLnNsaWNlKDAsdGhpcy5fYnl0ZXNXcml0dGVuKSksdGhpcy5wb3J0LnBvc3RNZXNzYWdlKHtldmVudFR5cGU6ImRhdGEiLGF1ZGlvQnVmZmVyOmV9KSx0aGlzLl9pbml0QnVmZmVyKCl9X3JlY29yZGluZ1N0b3BwZWQoKXt0aGlzLnBvcnQucG9zdE1lc3NhZ2Uoe2V2ZW50VHlwZToic3RvcCJ9KX1wcm9jZXNzKGUsbyxoKXtjb25zdCBpPWguaXNSZWNvcmRpbmcsZj1vWzBdLHM9ZVswXSx1PWZbMF0sXz1mWzFdO2xldCByPSExO2ZvcihsZXQgdD0wO3Q8dS5sZW5ndGg7dCsrKXQ8aS5sZW5ndGgmJihyPWlbdF09PT0xKSwhciYmIXRoaXMuX2lzQnVmZmVyRW1wdHkoKSYmKHRoaXMuX2ZsdXNoKCksdGhpcy5fcmVjb3JkaW5nU3RvcHBlZCgpKSxyJiYodGhpcy5fYXBwZW5kVG9CdWZmZXIoc1swXVt0XSksdGhpcy5fYXBwZW5kVG9CdWZmZXIoc1sxXVt0XSkpLHVbdF09c1swXVt0XSxfW3RdPXNbMV1bdF07cmV0dXJuITB9fXJlZ2lzdGVyUHJvY2Vzc29yKCJyZWNvcmRlciIsbil9KSgpOwo=";
function HP(e, t, n) {
  if (e.length < 1)
    return;
  e[0];
  const s = 3, i = 32, r = e.map((m) => m.length).reduce((m, g) => m + g, 0), a = i / 8, u = n * a, o = 44, c = new ArrayBuffer(o + r * a), l = new DataView(c);
  Ui(l, 0, "RIFF"), l.setUint32(4, 36 + r * a, true), Ui(l, 8, "WAVE"), Ui(l, 12, "fmt "), l.setUint32(16, 16, true), l.setUint16(20, s, true), l.setUint16(22, n, true), l.setUint32(24, t, true), l.setUint32(28, t * u, true), l.setUint16(32, u, true), l.setUint16(34, i, true), Ui(l, 36, "data"), l.setUint32(40, r * a, true);
  let p = 44;
  for (const m of e)
    KP(l, p, m), p += m.length * a;
  return c;
}
function Ui(e, t, n) {
  for (let s = 0; s < n.length; s++)
    e.setUint8(t + s, n.charCodeAt(s));
}
function KP(e, t, n) {
  for (var s = 0; s < n.length; s++, t += 4)
    e.setFloat32(t, n[s], true);
}
const mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Node: Ee,
  compile: ku,
  evaluate: _b,
  exit: Ib,
  exportModule: kP,
  getInletName: BP,
  getNode: Tb,
  module: It,
  n: Ot,
  node: Ls,
  nodeRegistry: Pt,
  outputType: Ya,
  polyType: Hn,
  register: bt,
  registerNode: q
}, Symbol.toStringTag, { value: "Module" }));
let jP = (e) => `Math.sin(${e})`, UP = (e) => `Math.cos(${e})`, OP = (e) => `Math.tan(${e})`, JP = (e) => `Math.asin(${e})`, QP = (e) => `Math.acos(${e})`, qP = (e) => `Math.atan(${e})`, Hb = (e, t, n) => `${e} = ${t};${n ? ` /* ${n} */` : ""}`, zu = (e, ...t) => Hb(
  e.name,
  `nodes[${e.ugenIndex}].update(${t.join(",")})`,
  e.node.type
), $P = (e) => `(2 ** ((${e} - 69) / 12) * 440)`, eA = (e, t) => `${e} ** ${t}`, tA = (e) => `Math.exp(${e})`, nA = (e) => `Math.log(${e})`, sA = (e, t) => `${e}%${t}`, iA = (e) => `Math.abs(${e})`, rA = (e) => `Math.round(${e})`, aA = (e) => `Math.floor(${e})`, uA = (e) => `Math.sign(${e})`, oA = (e) => `Math.ceil(${e})`, cA = (e, t) => `Math.min(${e}, ${t})`, lA = (e, t) => `Math.max(${e}, ${t})`, dA = (e, t) => `[${e}, ${t}]`, Gi = (e) => `${e}[0]`, hA = (e) => `${e}[1]`, pA = (e, t) => `(${Gi(e)} < ${Gi(t)} ? ${e} : ${t})`, mA = (e, t) => `(${Gi(e)} > ${Gi(t)} ? ${e} : ${t})`;
const fA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abs: iA,
  ceil: oA,
  def: Hb,
  defAcos: QP,
  defAsin: JP,
  defAtan: qP,
  defCos: UP,
  defSin: jP,
  defTan: OP,
  defUgen: zu,
  exp: tA,
  floor: aA,
  log: nA,
  max: lA,
  midinote: $P,
  min: cA,
  mod: sA,
  pair_a: Gi,
  pair_a_max: mA,
  pair_a_min: pA,
  pair_b: hA,
  pair_make: dA,
  pow: eA,
  round: rA,
  sign: uA
}, Symbol.toStringTag, { value: "Module" }));
class yA {
  constructor(t = null) {
    this.ugens = /* @__PURE__ */ new Map(), this.outputNode = t;
  }
  async spawn(t, n) {
    this.graph = t;
    const { src: s, ugens: i, registers: r } = t.compile({
      log: false
    });
    !this.mouse && s.includes("mouse") && this.initMouse(), !this.midiInited && i.some((a) => a.type.startsWith("Midi")) && this.initMidi(), !this.audioIn && i.some((a) => a.type === "AudioIn") && await this.initAudioIn(), this.sendCustomUgens(), this.send({
      type: "SPAWN_UNIT",
      unit: { src: s, ugens: i, registers: r },
      duration: n
      // experimental
    });
  }
  // ugen is expected to be a class
  registerUgen(t) {
    this.ugens.set(t.name, t);
  }
  // custom ugens
  sendCustomUgens() {
    if (!this.ugens.size)
      return;
    let t = [];
    for (let [n, s] of this.ugens)
      t.push({
        type: "SET_UGEN",
        className: n,
        ugen: s + ""
      });
    this.send({
      type: "BATCH_MSG",
      messages: t
    });
  }
  scheduleMessage(t, n) {
    this.send({
      type: "SCHEDULE_MSG",
      msg: t,
      time: n
    });
  }
  setControl(t, n, s) {
    const i = {
      type: "SET_CONTROL",
      id: t,
      value: n
    };
    s ? this.send({ type: "SCHEDULE_MSG", time: s, msg: i }) : this.send(i);
  }
  // controls: { id, value, time }[]
  setControls(t) {
    const n = {
      type: "BATCH_MSG",
      messages: t.map((s) => {
        const i = { type: "SET_CONTROL", id: s.id, value: s.value };
        return s.time === void 0 ? i : {
          type: "SCHEDULE_MSG",
          time: s.time,
          msg: i
        };
      })
    };
    this.send(n);
  }
  async initAudioIn() {
    console.log("init audio input...");
    const t = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });
    this.audioCtx.createMediaStreamSource(t).connect(this.audioWorklet);
  }
  initMidi() {
    console.log("init midi input..."), this.midiInited = true, new WP().on("midimessage", (t, n) => {
      const s = TP(n);
      s && this.send(s);
    });
  }
  initMouse() {
    console.log("init mouse"), this.mouse = new IP(), this.mouse.on("move", (t, n) => {
      this.setControl("mouseX", t), this.setControl("mouseY", n);
    });
  }
  /**
   * Send a message to the audio thread (audio worket)
   */
  send(t) {
    _a(t instanceof Object), this.audioWorklet && this.audioWorklet.port.postMessage(t);
  }
  async init() {
    if (!this.audioCtx) {
      if (_a(!this.audioCtx), this.audioCtx = this.outputNode?.context || new AudioContext({
        latencyHint: "interactive",
        sampleRate: 48e3
      }), await this.audioCtx.resume(), !this.audioCtx.audioWorklet)
        throw new Error(
          "Audio cannot be loaded: non-secure origin? (AudioContext.audioWorklet is undefined)"
        );
      await this.audioCtx.audioWorklet.addModule(_P), await this.audioCtx.audioWorklet.addModule(YP), this.audioWorklet = new AudioWorkletNode(
        this.audioCtx,
        "sample-generator",
        {
          outputChannelCount: [2]
        }
      ), this.audioWorklet.port.onmessage = (t) => {
        const { id: n, time: s, type: i } = t.data;
        i === "SIGNAL_TRIGGER" ? this.graph.dfs((r) => {
          if (r.type === "signal" && r.id === n) {
            const a = r.callback(s, n);
            isNaN(a) ? a !== void 0 && console.warn(
              `expected number from "on" callback with id "${n}", got "${a}" instead.`
            ) : window.postMessage({
              type: "KABELSALAT_SET_CONTROL",
              value: a,
              id: n
            });
          }
          return r;
        }) : i === "STOP" ? setTimeout(() => this.destroy(), t.data.fadeTime * 1e3 + 200) : i === "SEND_SAMPLES" && this.graph.dfs((r) => (r.type !== "scope" || r.ins.length < 2 || r.ins[1].value !== n || window.postMessage({
          type: "KABELSALAT_UPDATE_SCOPE",
          samples: t.data.samples,
          channels: t.data.channels,
          channel: t.data.channel,
          id: n
        }), r));
      }, this.recorder = new window.AudioWorkletNode(this.audioCtx, "recorder"), this.audioWorklet.connect(this.recorder), this.sendCustomUgens(), this.recorder.connect(this.outputNode || this.audioCtx.destination), this.recorder.port.onmessage = (t) => {
        if (t.data.eventType === "data" && this.recordedBuffers.push(t.data.audioBuffer), t.data.eventType === "stop") {
          console.log("recording stopped");
          const n = HP(
            this.recordedBuffers,
            this.audioCtx.sampleRate,
            2
          );
          gA(n, "kabelsalat.wav", "audio/wav"), this.recordedBuffers = [];
        }
      }, this.recordOnPlay && this.record();
    }
  }
  destroy() {
    this.audioWorklet?.disconnect(), this.audioWorklet = null, this.recorder?.disconnect(), this.recorder = null, !this.outputNode && this.audioCtx?.close(), this.audioCtx = null;
  }
  /**
   * Stop audio playback
   */
  stop() {
    this.audioCtx && this.send({ type: "STOP" }), this.mouse?.detach();
  }
  record() {
    if (!this.audioCtx) {
      this.recordOnPlay = true;
      return;
    }
    this.recordedBuffers = [], this.recorder.parameters.get("isRecording").setValueAtTime(1, 0), console.log("recording started");
  }
  stopRecording() {
    this.recordOnPlay = false, this.audioCtx && this.recorder.parameters.get("isRecording").setValueAtTime(0, 0);
  }
  set fadeTime(t) {
    this.send({ type: "FADE_TIME", fadeTime: t });
  }
  set maxUnits(t) {
    this.send({ type: "MAX_UNITS", maxUnits: t });
  }
}
function gA(e, t, n) {
  const s = new Blob([e], { type: n }), i = document.createElement("a");
  i.href = window.URL.createObjectURL(s), i.download = t, i.click();
}
let bA = 0;
bt(
  "signal",
  (e, t) => {
    const n = bA++, s = getNode("signal", e, n);
    return s.callback = t, s.id = n, s;
  },
  {
    ugen: "Signal",
    compile: ({ vars: [e, t], ...n }) => zu(n, e, t, "time")
  }
);
let MA = (e) => `sin(${e})`, CA = (e) => `cos(${e})`, xA = (e) => `tan(${e})`, GA = (e) => `asin(${e})`, vA = (e) => `acos(${e})`, PA = (e) => `atan(${e})`, Ha = (e, t, n) => `${e} = ${t};${n ? ` /* ${n} */` : ""}`, AA = (e, ...t) => {
  if (t.unshift(`nodes[${e.ugenIndex}]`), e.ugen === "Sequence" || e.ugen === "Pick") {
    const n = t.length - 2, s = `(float[${n}]){${t.slice(2).join(",")}}`;
    return Ha(
      e.name,
      `${e.ugen}_update(${t[0]}, ${t[1]}, ${n}, ${s})`,
      e.ugen
    );
  }
  return Ha(e.name, `${e.ugen}_update(${t.join(",")})`, e.ugen);
}, FA = (e) => `pow(2.0, ((${e} - 69.0) / 12.0)) * 440.0`, XA = (e, t) => `pow(${e}, ${t})`, DA = (e) => `exp(${e})`, SA = (e) => `log(${e})`, wA = (e, t) => `${e}>=${t}?${e}-${t}:${e}`, ZA = (e) => `fabs(${e})`, EA = (e, t) => `fmin(${e}, ${t})`, LA = (e, t) => `fmax(${e}, ${t})`, RA = (e) => `fround(${e})`, BA = (e) => `floor(${e})`, VA = (e) => `ceil(${e})`, kA = (e, t) => `((pair) {${e}, ${t}})`, vi = (e) => `${e}.a`, zA = (e) => `${e}.b`, NA = (e, t) => `(${vi(e)} < ${vi(t)} ? ${e} : ${t})`, WA = (e, t) => `(${vi(e)} > ${vi(t)} ? ${e} : ${t})`;
const TA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abs: ZA,
  ceil: VA,
  def: Ha,
  defAcos: vA,
  defAsin: GA,
  defAtan: PA,
  defCos: CA,
  defSin: MA,
  defTan: xA,
  defUgen: AA,
  exp: DA,
  floor: BA,
  log: SA,
  max: LA,
  midinote: FA,
  min: EA,
  mod: wA,
  pair_a: vi,
  pair_a_max: WA,
  pair_a_min: NA,
  pair_b: zA,
  pair_make: kA,
  pow: XA,
  round: RA
}, Symbol.toStringTag, { value: "Module" })), T = {
  js: fA,
  c: TA
}, Kb = (e, t) => q(e, {
  ugen: t,
  compile: ({ vars: n, ...s }) => T[s.lang].defUgen(s, ...n)
});
let IA = bt("time", (e) => new Ee("time", e), {
  tags: ["meta"],
  description: "Returns elapsed time in seconds",
  compile: ({ name: e, lang: t }) => T[t].def(e, "time")
}), _A = bt(
  "raw",
  (e, t) => new Ee("raw", t).withIns(Ot(e)),
  {
    ins: [
      { name: "in" },
      {
        name: "code",
        description: "expression with variable `t` being the elapsed time and `$input` the input."
      }
    ],
    tags: ["meta"],
    description: "Raw code node, expects floats between -1 and 1",
    compile: ({ vars: e, node: t, name: n }) => `let $input = ${e[0]}; 
const ${n} = (${t.value}); // raw`,
    examples: [
      `sine(4).range(.5,1)
.raw("(time*110%1*2-1)*$input")
.out()`
    ]
  }
), YA = bt(
  "bytebeat",
  (e, t) => new Ee("bytebeat", t).withIns(Ot(e)),
  {
    ins: [
      { name: "t", description: "time in samples" },
      {
        name: "code",
        description: "bytebeat code with variable `t`"
      }
    ],
    tags: ["meta"],
    description: "Bytebeat node, expects numbers from 0 to 255",
    examples: [
      `time().mul(8000).bytebeat\`
// Fractalized Past
// by: lhphr
// from: https://dollchan.net/btb/res/3.html#69

(t>>10^t>>11)%5*((t>>14&3^t>>15&1)+1)*t%99+((3+(t>>14&3)-(t>>16&1))/3*t%99&64)
\`.out()`
    ],
    compile: ({ vars: e, node: t, name: n }) => `let t = ${e[0]}; 
const ${n} = ((${t.value}) & 255) / 127.5 - 1; // bytebeat`
  }
), HA = bt(
  "floatbeat",
  (e, t) => new Ee("bytebeat", t).withIns(Ot(e)),
  {
    ins: [
      { name: "t", description: "time in samples" },
      {
        name: "code",
        description: "floatbeat code with variable `t`"
      }
    ],
    tags: ["meta"],
    description: "Raw code node, expects numbers from -1 to 1",
    compile: ({ vars: e, node: t, name: n }) => `let t = ${e[0]}; const ${n} = (${t.value}); // floatbeat`
  }
), KA = q("adsr", {
  ugen: "ADSRNode",
  tags: ["envelope"],
  description: "ADSR envelope",
  examples: [
    `impulse(1).perc(.5)
.adsr(.01, .1, .5, .1)
.mul(sine(220)).out()`
  ],
  ins: [
    { name: "gate", default: 0, description: "gate input" },
    { name: "att", default: 0.02, description: "attack time" },
    { name: "dec", default: 0.1, description: "decay time" },
    { name: "sus", default: 0.2, description: "sustain level" },
    { name: "rel", default: 0.1, description: "release time" }
  ],
  compile: ({
    vars: [e = 0, t = 0.02, n = 0.1, s = 0.2, i = 0.1],
    ...r
  }) => T[r.lang].defUgen(r, "time", e, t, n, s, i)
}), jA = It(
  "ar",
  (e = 0, t = 0.02, n = 0.1) => e.adsr(t, 0, 1, n),
  {
    tags: ["envelope"],
    description: "AR envelope",
    examples: ["impulse(1).ad(.01, .1).mul(sine(220)).out()"],
    ins: [
      { name: "trig", default: 0, description: "gate input" },
      { name: "att", default: 0.02, description: "attack time" },
      { name: "rel", default: 0.1, description: "release time" }
    ]
  }
), UA = It(
  "ad",
  (e = 0, t = 0.02, n = 0.1) => e.adsr(t, n, 0, n),
  {
    tags: ["envelope"],
    description: "AD envelope",
    examples: ["impulse(1).ad(.01, .1).mul(sine(220)).out()"],
    ins: [
      { name: "trig", default: 0, description: "gate input" },
      { name: "att", default: 0.02, description: "attack time" },
      { name: "dec", default: 0.1, description: "decay time" }
    ]
  }
), OA = q("clock", {
  ugen: "Clock",
  internal: true,
  // impulse is the preferred way..
  tags: ["regular", "clock"],
  description: "Clock source, with tempo in BPM",
  examples: ["clock(120).clockdiv(16).mul(sine(220)).out()"],
  ins: [
    {
      name: "bpm",
      default: 120,
      description: "clock tempo in bpm (beats per minute)"
    }
  ],
  compile: ({ vars: [e = 120], ...t }) => T[t.lang].defUgen(t, e)
}), JA = q("clockdiv", {
  ugen: "ClockDiv",
  tags: ["clock", "trigger"],
  description: "Clock signal divider",
  examples: ["impulse(8).clockdiv(2).ad(.1,.1).mul(sine(220)).out()"],
  ins: [
    { name: "clock", default: 0, description: "clock input" },
    { name: "divisor", default: 2, description: "tempo divisor" }
  ],
  compile: ({ vars: [e = 0, t = 2], ...n }) => T[n.lang].defUgen(n, e, t)
}), QA = q("distort", {
  ugen: "Distort",
  tags: ["fx", "distortion"],
  description: "Overdrive-style distortion",
  examples: [
    `sine(220)
.distort( saw(.5).range(0,1) )
.out()`
  ],
  ins: [
    { name: "in", default: 0 },
    { name: "amt", default: 0, description: "distortion amount" }
  ],
  compile: ({ vars: [e = 0, t = 0], ...n }) => T[n.lang].defUgen(n, e, t)
}), jb = q("noise", {
  ugen: "NoiseOsc",
  tags: ["source", "noise"],
  description: "White noise source",
  examples: ["noise().mul(.25).out()"],
  ins: [
    {
      name: "next",
      default: 1,
      description: "if 0, the noise will hold the previous value. defaults to 1."
    }
  ],
  compile: ({ lang: e, vars: [t = 1], ...n }) => T[e].defUgen(n, t)
}), qA = q("lcgnoise", {
  ugen: "LcgNoise",
  tags: ["source", "noise"],
  description: "Lcg white noise source.",
  examples: ["lcgnoise().mul(.25).out()"],
  ins: [
    {
      name: "next",
      default: 1,
      description: "if 0, the noise will hold the previous value. defaults to 1."
    },
    {
      name: "reset",
      default: 0,
      description: "if 1, the random number generator sequence will reset."
    }
  ],
  compile: ({ lang: e, vars: [t = 1, n = 0], ...s }) => T[e].defUgen(s, t, n)
}), $A = q("pink", {
  ugen: "PinkNoise",
  tags: ["source", "noise"],
  description: "Pink noise source",
  examples: ["pink().mul(.5).out()"],
  ins: [],
  compile: ({ lang: e, ...t }) => T[e].defUgen(t)
}), eF = q("brown", {
  ugen: "BrownNoiseOsc",
  tags: ["source", "noise"],
  description: "Brown noise source",
  examples: ["brown().out()"],
  ins: [],
  compile: ({ lang: e, ...t }) => T[e].defUgen(t)
}), tF = q("dust", {
  ugen: "DustOsc",
  tags: ["trigger", "noise", "source"],
  description: "Generates random impulses from 0 to +1.",
  examples: ["dust(200).out()"],
  ins: [
    { name: "density", default: 0, description: "average impulses per second" }
  ],
  compile: ({ vars: [e = 0], ...t }) => T[t.lang].defUgen(t, e)
}), Ub = q("impulse", {
  ugen: "ImpulseOsc",
  tags: ["regular", "trigger"],
  description: "Regular single sample impulses (0 - 1)",
  examples: ["impulse(10).out()"],
  ins: [
    { name: "freq", default: 0 },
    { name: "phase", default: 0 }
  ],
  compile: ({ vars: [e = 0, t = 0], ...n }) => T[n.lang].defUgen(n, e, t)
}), nF = q("saw", {
  ugen: "SawOsc",
  tags: ["regular", "waveform", "source"],
  description: "Sawtooth wave oscillator with anti aliasing",
  examples: ["saw(110).mul(.5).out()"],
  ins: [{ name: "freq", default: 0 }],
  compile: ({ vars: [e = 0], ...t }) => T[t.lang].defUgen(t, e)
}), sF = q("zaw", {
  ugen: "ZawOsc",
  tags: ["regular", "waveform", "source"],
  description: "Sawtooth wave oscillator with sharp edges. Use saw for anti aliased variant.",
  examples: ["zaw(110).mul(.5).out()"],
  ins: [{ name: "freq", default: 0 }],
  compile: ({ vars: [e = 0], ...t }) => T[t.lang].defUgen(t, e)
}), iF = q("sine", {
  tags: ["regular", "waveform", "source"],
  ugen: "SineOsc",
  description: "Sine wave oscillator",
  examples: ["sine(220).out()"],
  ins: [
    { name: "freq", default: 0 },
    { name: "sync", default: 0, description: "sync input" },
    { name: "phase", default: 0, description: "phase offset" }
  ],
  compile: ({ vars: [e = 0, t = 0, n = 0], ...s }) => T[s.lang].defUgen(s, e, t, n)
}), rF = q("tri", {
  ugen: "TriOsc",
  tags: ["regular", "waveform", "source"],
  description: "Triangle wave oscillator",
  examples: ["tri(220).out()"],
  ins: [{ name: "freq", default: 0 }],
  compile: ({ vars: [e = 0], ...t }) => T[t.lang].defUgen(t, e)
}), aF = q("pulse", {
  ugen: "PulseOsc",
  tags: ["regular", "waveform", "source"],
  description: "Pulse wave oscillator",
  examples: ["pulse(220, sine(.1).range(.1,.5)).mul(.5).out()"],
  ins: [
    { name: "freq", default: 0 },
    { name: "pw", default: 0.5, description: "pulse width 0 - 1" }
  ],
  compile: ({ vars: [e = 0, t = 0.5], ...n }) => T[n.lang].defUgen(n, e, t)
}), uF = q("slide", {
  ugen: "Slide",
  tags: ["fx"],
  internal: true,
  description: "Slide/portamento node",
  examples: [
    `impulse(2).seq(55,110,220,330)
.slide(4).sine().out()`
  ],
  ins: [
    { name: "in", default: 0 },
    { name: "rate", default: 1 }
  ],
  compile: ({ vars: [e = 0, t = 1], ...n }) => T[n.lang].defUgen(n, e, t)
}), oF = q("lag", {
  ugen: "Lag",
  tags: ["fx"],
  description: "Smoothes a signal. Good for slide / portamento effects.",
  examples: [
    `impulse(2).seq(220,330,440,550)
.lag(.4).sine().out()`
  ],
  ins: [
    { name: "in", default: 0 },
    { name: "rate", default: 1, description: "60 dB lag time in seconds" }
  ],
  compile: ({ vars: [e = 0, t = 1], ...n }) => T[n.lang].defUgen(n, e, t)
}), cF = q("slew", {
  ugen: "Slew",
  tags: ["fx"],
  description: "Limits the slope of an input signal. The slope is expressed in units per second.",
  examples: ["pulse(800).slew(4000, 4000).out()"],
  ins: [
    { name: "in", default: 0 },
    {
      name: "up",
      default: 1,
      description: "Maximum upward slope in units per second"
    },
    {
      name: "dn",
      default: 1,
      description: "Maximum downward slope in units per second"
    }
  ],
  compile: ({ vars: [e = 0, t = 1, n = 1], ...s }) => T[s.lang].defUgen(s, e, t, n)
}), Ob = q("filter", {
  ugen: "Filter",
  tags: ["fx", "filter"],
  internal: true,
  description: "Two-pole low-pass filter",
  examples: ["saw(55).lpf( sine(1).range(.4,.8) ).out()"],
  ins: [
    { name: "in", default: 0 },
    { name: "cutoff", default: 1 },
    { name: "reso", default: 0 }
  ],
  compile: ({ vars: [e = 0, t = 1, n = 0], ...s }) => T[s.lang].defUgen(s, e, t, n)
}), lF = q("fold", {
  ugen: "Fold",
  tags: ["fx", "distortion", "limiter"],
  description: 'Distort incoming audio signal by "folding"',
  examples: [
    `sine(55)
.fold( sine(.5).range(0.2,4) )
.out()`
  ],
  ins: [
    { name: "in", default: 0 },
    { name: "rate", default: 0 }
  ],
  compile: ({ vars: [e = 0, t = 0], ...n }) => T[n.lang].defUgen(n, e, t)
}), dF = q("seq", {
  ugen: "Sequence",
  tags: ["sequencer"],
  description: "Trigger controlled sequencer",
  examples: [
    `impulse(2).seq(220,330,440,550)
.sine().out()`
  ],
  ins: [
    { name: "trig", default: 0 },
    { name: "step", default: 0, dynamic: true, description: "step inputs" }
    // 1-Infinity of steps
  ],
  compile: ({ vars: e, ...t }) => T[t.lang].defUgen(t, ...e)
}), hF = q("delay", {
  ugen: "Delay",
  tags: ["fx"],
  description: "Delay line node",
  examples: [
    `impulse(1).ad(.01,.2).mul(sine(220))
.add(x=>x.delay(.1).mul(.8)).out()`
  ],
  ins: [
    { name: "in", default: 0 },
    { name: "time", default: 0 }
  ],
  compile: ({ vars: [e = 0, t = 0], ...n }) => T[n.lang].defUgen(n, e, t)
}), pF = q("hold", {
  ugen: "Hold",
  tags: ["fx"],
  description: "Sample and hold",
  examples: [
    `noise().hold(impulse(2))
.range(220,880).sine().out()`
  ],
  ins: [
    { name: "in", default: 0 },
    { name: "trig", default: 0 }
  ],
  compile: ({ vars: [e = 0, t = 0], ...n }) => T[n.lang].defUgen(n, e, t)
}), mF = q("midifreq", {
  ugen: "MidiFreq",
  tags: ["external", "midi"],
  description: "Outputs frequency of midi note in. Multiple instances will do voice allocation",
  examples: ["midifreq().sine().out()"],
  ins: [
    {
      name: "channel",
      default: -1,
      description: "Channel filter. Defaults to all channels"
    }
  ],
  compile: ({ vars: [e = -1], ...t }) => T[t.lang].defUgen(t, e)
}), fF = q("midigate", {
  ugen: "MidiGate",
  tags: ["external", "midi"],
  description: "outputs gate of midi note in. Multiple instances will do voice allocation",
  examples: ["midigate().lag(1).mul(sine(220)).out()"],
  ins: [{ name: "channel", default: -1 }],
  compile: ({ vars: [e = -1], ...t }) => T[t.lang].defUgen(t, e)
}), yF = q("midivel", {
  ugen: "MidiVel",
  tags: ["external", "midi"],
  description: "outputs velocity of midi note in. Multiple instances will do voice allocation",
  examples: [
    "midigate().ar(0.01,0.2).mul(saw(midifreq())).mul(midivel()).mul(.8).out()"
  ],
  ins: [{ name: "channel", default: -1 }],
  compile: ({ vars: [e = -1], ...t }) => T[t.lang].defUgen(t, e)
}), gF = q("midicc", {
  ugen: "MidiCC",
  tags: ["external", "midi"],
  description: "Outputs bipolar value of given midi cc number. initValue can be set to be the output before getting first cc message.",
  examples: ["midicc(74).range(100,200).sine().out()"],
  ins: [
    { name: "ccnumber", default: -1 },
    { name: "channel", default: -1 },
    { name: "initValue", default: -1 }
    // could not name it "default" because syntax error
  ],
  compile: ({ vars: [e = -1, t = -1], ...n }) => T[n.lang].defUgen(n, e, t)
}), Nu = q("cc", {
  ugen: "CC",
  tags: ["external"],
  description: "CC control",
  ins: [
    { name: "id", default: 0 },
    { name: "value", default: 0 }
  ],
  compile: ({ vars: [e], ...t }) => T[t.lang].defUgen(t, e)
}), bF = q("audioin", {
  ugen: "AudioIn",
  tags: ["source", "external"],
  description: "External Audio Input, depends on your system input",
  examples: ["audioin().add(x=>x.delay(.1).mul(.8)).out()"],
  ins: [],
  compile: (e) => T[e.lang].defUgen(e, "input")
}), Ka = q("log", {
  tags: ["math"],
  description: "calculates the logarithm (base 10) of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].log(e))
}), Jb = q("exp", {
  tags: ["math"],
  description: "raises e to the power of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].exp(e))
}), MF = q("pow", {
  tags: ["math"],
  description: "raises the input to the given power",
  ins: [{ name: "in" }, { name: "power" }],
  compile: ({ vars: [e = 0, t = 1], name: n, lang: s }) => T[s].def(n, T[s].pow(e, t))
}), Qb = q("sin", {
  tags: ["math"],
  description: "calculates the sine of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].defSin(e))
}), qb = q("cos", {
  tags: ["math"],
  description: "calculates the cosine of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].defCos(e))
}), CF = q("tan", {
  tags: ["math"],
  description: "calculates the tan of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].defTan(e))
}), xF = q("acos", {
  tags: ["math"],
  description: "calculates the acos of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].defAcos(e))
}), GF = q("asin", {
  tags: ["math"],
  description: "calculates the asin of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].defAsin(e))
}), vF = q("atan", {
  tags: ["math"],
  description: "calculates the atan of the input signal",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].defAtan(e))
}), PF = q("mul", {
  tags: ["math"],
  description: "Multiplies the given signals.",
  examples: ["sine(220).mul( sine(4).range(.25,1) ).out()"],
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, e.join(" * ") || 0)
}), Wu = q("add", {
  tags: ["math"],
  description: "sums the given signals",
  examples: ["n([0,3,7,10]).add(60).midinote().sine().mix(2).out()"],
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, e.join(" + ") || 0)
}), AF = q("div", {
  tags: ["math"],
  description: "adds the given signals",
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, e.join(" / ") || 0)
}), FF = q("sub", {
  tags: ["math"],
  description: "subtracts the given signals",
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, e.join(" - ") || 0)
}), XF = q("mod", {
  tags: ["math"],
  description: "calculates the modulo",
  examples: ["add(x=>x.add(.003).mod(1)).out()"],
  ins: [{ name: "in" }, { name: "modulo" }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, T[n].mod(...e) || 0)
}), DF = q("abs", {
  tags: ["math"],
  description: "returns the absolute value of the signal",
  ins: [{ name: "in" }],
  examples: ["sine(440).abs().out()"],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].abs(e))
}), SF = q("round", {
  tags: ["math"],
  description: "Rounds the signal to the nearest integer",
  ins: [{ name: "in" }],
  examples: ["sine(440.5).round().out()"],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].round(e))
}), wF = q("clamp", {
  tags: ["math"],
  description: "Clamps the signal to stay within the given range",
  ins: [{ name: "in" }, { name: "min" }, { name: "max" }],
  examples: ["sine(440.5).clamp(-.6,.6).out()"],
  compile: ({ vars: [e = 0, t = -1, n = 1], name: s, lang: i }) => {
    const r = T[i].min(t, n), a = T[i].max(t, n), u = T[i].min(T[i].max(e, r), a);
    return T[i].def(s, u);
  }
}), ZF = q("floor", {
  tags: ["math"],
  description: "Rounds the signal down",
  ins: [{ name: "in" }],
  examples: ["sine(440.5).floor().out()"],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].floor(e))
}), EF = q("ceil", {
  tags: ["math"],
  description: "Rounds the signal up",
  ins: [{ name: "in" }],
  examples: ["sine(440.5).ceil().out()"],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].ceil(e))
}), LF = q("sign", {
  tags: ["math"],
  description: "Returns 1 if positive and -1 if negative. uses Math.sign",
  ins: [{ name: "in" }],
  examples: ["sine(440.5).ceil().out()"],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, T[n].sign(e))
}), RF = q("min", {
  tags: ["math"],
  description: "returns the minimum of the given signals",
  examples: [
    "impulse(4).apply(x => min(x.seq(0,3,2), x.seq(0,7,0,5,0)).add(48).midinote().sine()).out()"
  ],
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, e.reduce(T[n].min) || 0)
}), BF = q("max", {
  tags: ["math"],
  description: "returns the maximum of the given signals",
  examples: [
    "impulse(4).apply(x => max(x.seq(0,3,2), x.seq(0,7,0,5,0)).add(48).midinote().sine()).out()"
  ],
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, e.reduce(T[n].max) || 0)
}), VF = q("argmin", {
  tags: ["math"],
  description: "returns the index of the minimum of the given signals",
  examples: [
    "argmin(saw(1), saw(3), saw(5)).mul(12).add(48).midinote().sine().out()"
  ],
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(
    t,
    T[n].pair_b(
      e.map(T[n].pair_make).reduce(T[n].pair_a_min)
    ) || 0
  )
}), kF = q("argmax", {
  tags: ["math"],
  description: "returns the index of the maximum of the given signals",
  examples: [
    "argmax(saw(1), saw(3), saw(5)).mul(12).add(48).midinote().sine().out()"
  ],
  ins: [{ name: "in", dynamic: true }],
  compile: ({ vars: e, name: t, lang: n }) => T[n].def(
    t,
    T[n].pair_b(
      e.map(T[n].pair_make).reduce(T[n].pair_a_max)
    ) || 0
  )
}), $b = q("greater", {
  tags: ["logic"],
  description: "returns 1 if input is greater then threshold",
  ins: [{ name: "in" }, { name: "threshold" }],
  examples: [
    `greater(sine(1),0)
.bipolar().range(100,200)
.sine().out()`
  ],
  compile: ({ vars: [e = 0, t = 0], name: n, lang: s }) => T[s].def(n, `${e} > ${t}`)
}), e2 = q("lower", {
  tags: ["logic"],
  description: "returns 1 if input is lower then threshold",
  ins: [{ name: "in" }, { name: "threshold" }],
  examples: [
    `lower(sine(1),0)
.bipolar().range(100,200)
.sine().out()`
  ],
  compile: ({ vars: [e = 0, t = 0], name: n, lang: s }) => T[s].def(n, `${e} < ${t}`)
}), zF = $b, NF = e2, WF = q("xor", {
  tags: ["logic"],
  description: "returns 1 if exactly one of the inputs is 1",
  ins: [{ name: "a" }, { name: "b" }],
  compile: ({ vars: [e = 0, t = 0], name: n, lang: s }) => T[s].def(n, `${e} != ${t} ? 1 : 0`)
}), TF = q("and", {
  tags: ["logic"],
  description: "returns 1 if both inputs are 1",
  ins: [{ name: "a" }, { name: "b" }],
  compile: ({ vars: [e = 0, t = 0], name: n, lang: s }) => T[s].def(n, `${e} && ${t} ? 1 : 0`)
}), IF = q("or", {
  tags: ["logic"],
  description: "returns 1 if one or both inputs are 1",
  ins: [{ name: "a" }, { name: "b" }],
  compile: ({ vars: [e = 0, t = 0], name: n, lang: s }) => T[s].def(n, `${e} || ${t} ? 1 : 0`)
}), _F = q("not", {
  tags: ["logic"],
  description: "returns 1 if input is 0, otherwise 0",
  ins: [{ name: "in" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, `(${e} === 0 ? 1 : 0)`)
}), YF = q("bool", {
  tags: ["logic"],
  description: "returns 1 signal is non zero. inspired by genish",
  ins: [{ name: "a" }],
  compile: ({ vars: [e = 0], name: t, lang: n }) => T[n].def(t, `(${e} === 0 ? 0 : 1)`)
}), HF = q("ifelse", {
  tags: ["logic"],
  description: "if control is 1, a is returned, otherwise b",
  ins: [{ name: "control" }, { name: "a" }, { name: "b" }],
  compile: ({ vars: [e = 0, t = 0, n = 0], name: s, lang: i }) => T[i].def(s, `(${e} === 1 ? ${t} : ${n})`),
  examples: ["ifelse(pulse(1), sine(220), sine(330)).out()"]
}), KF = q("range", {
  tags: ["math"],
  description: "Scales the incoming bipolar value to the given range.",
  examples: ["sine(.5).range(.25,1).mul(sine(440)).out()"],
  ins: [{ name: "in" }, { name: "min" }, { name: "max" }],
  compile: ({ vars: e, name: t, lang: n }) => {
    const [s, i, r, a = 1] = e, u = `((${s} + 1) * 0.5)`, o = a === 1 ? u : T[n].pow(u, a);
    return T[n].def(t, `${o} * (${r} - ${i}) + ${i}`);
  }
}), jF = q("remap", {
  ugen: "Remap",
  tags: ["math"],
  description: "Remaps input from one value range to another",
  ins: [
    { name: "in" },
    { name: "inmin" },
    { name: "inmax" },
    { name: "outmin" },
    { name: "outmax" }
  ],
  // examples: [`sine(440).abs().out()`],
  compile: ({
    vars: [e = 0, t = -1, n = 1, s = -1, i = 1],
    ...r
  }) => T[r.lang].defUgen(r, e, t, n, s, i)
}), UF = q("thru", {
  compile: ({ name: e, vars: t, lang: n }) => T[n].def(e, t[0], "thru")
}), OF = It(
  "rangex",
  (e, t, n) => {
    let s = Ka(t), i = Ka(n).sub(s), r = e.unipolar().mul(i).add(s);
    return Jb(r);
  },
  {
    tags: ["math"],
    description: "exponential range",
    ins: [{ name: "in" }, { name: "min" }, { name: "max" }],
    examples: ["sine([1,3]).rangex(100, 2e3).sine().out()"]
  }
), JF = q("midinote", {
  compile: ({ vars: [e], name: t, lang: n }) => T[n].def(t, T[n].midinote(e)),
  tags: ["math"],
  description: "convert midi number to frequency",
  ins: [{ name: "midi" }],
  examples: [
    `impulse(4).seq(0,3,7,12).add(60)
.midinote().sine().out()`
  ]
}), QF = q("src", {
  internal: true,
  compile: ({ vars: [e = 0], name: t, lang: n, ...s }) => T[n].def(t, s.getSource(e), `read source ${e}`)
}), qF = q("output", {
  internal: true,
  ugen: "Output",
  compile: ({ vars: [e, t = 0], name: n, lang: s, ...i }) => {
    const r = i.getOutput(t), a = i.getSource(t);
    return [
      T[s].def(r, [r, e].join(" + "), `+ output ${t}`),
      T[s].def(a, r, `write source ${t}`)
    ].join(`
`);
  }
}), t2 = q("poly"), n2 = Ot(Math.PI), $F = bt(
  "fork",
  (e, t = 1) => t2(...Array.from({ length: t }, () => e.clone())),
  {
    ins: [{ name: "in" }, { name: "times" }],
    tags: ["multi-channel"],
    description: "split the signal into n channels",
    examples: ["dust(4).fork(2).adsr(.1).mul(sine(220)).out()"]
  }
), eX = It("perc", (e, t) => e.adsr(0, 0, 1, t), {
  tags: ["envelope"],
  description: "percussive envelope. usable with triggers or gates",
  ins: [{ name: "gate" }, { name: "release" }],
  examples: ["impulse(4).perc(.1).mul( pink() ).out()"]
}), tX = It(
  "hpf",
  (e, t, n = 0) => e.sub(e.lpf(t, n)),
  {
    ins: [{ name: "in" }, { name: "cutoff" }, { name: "reso" }],
    description: "high pass filter",
    tags: ["fx", "filter"],
    examples: ["tri([220,331,442]).mix().hpf(sine(.5).range(0,.9)).out()"]
  }
), nX = It("lpf", Ob, {
  ins: [{ name: "in" }, { name: "cutoff" }, { name: "reso" }],
  description: "low pass filter",
  tags: ["fx", "filter"],
  examples: ["saw(55).lpf( sine(1).range(.4,.8) ).out()"]
}), sX = q("bpf", {
  ugen: "BPF",
  ins: [{ name: "in" }, { name: "cutoff" }, { name: "reso" }],
  description: "high pass filter",
  tags: ["fx", "filter"],
  compile: ({ vars: [e = 0, t = 1, n = 0], ...s }) => T[s.lang].defUgen(s, e, t, n)
}), iX = It("lfnoise", (e) => jb().hold(Ub(e)), {
  ins: [{ name: "freq" }],
  description: "low frequency stepped noise.",
  tags: ["regular", "noise"],
  examples: ["lfnoise(4).range(200,800).sine().out()"]
}), rX = It(
  "bipolar",
  (e) => Ot(e).mul(2).sub(1),
  {
    ins: [{ name: "in" }],
    description: "convert unipolar [0,1] signal to bipolar [-1,1]",
    tags: ["math"]
    // examples: [], // tbd
  }
), aX = It(
  "unipolar",
  (e) => Ot(e).add(1).div(2),
  {
    ins: [{ name: "in" }],
    description: "convert bipolar [-1,1] signal to unipolar [0,1]",
    tags: ["math"]
    // examples: [], // tbd
  }
), uX = It(
  "pan",
  (e, t) => (t = Ot(t).add(1).mul(n2, 0.25), e.mul([qb(t), Qb(t)])),
  {
    ins: [
      { name: "in" },
      {
        name: "pos",
        description: "bipolar position: -1 = left, 0 = center, 1 = right"
      }
    ],
    description: "pans signal to stereo position. splits signal path in 2",
    tags: ["multi-channel"],
    examples: ["sine(220).pan(sine(.25)).out()"]
  }
), oX = q("pick", {
  tags: ["multi-channel"],
  ugen: "Pick",
  description: "Pick",
  ins: [{ name: "index" }, { name: "inputs", dynamic: true }],
  description: "picks input of given index",
  examples: [
    `sine(.25).range(0,2).round()
.pick(...sine([220,330,440]).ins)
.out()`
  ],
  compile: ({ vars: e, ...t }) => T[t.lang].defUgen(t, ...e)
}), cX = q("clip", {
  tags: ["fx"],
  ugen: "Clip",
  description: "Hard limits the signal between lo and hi.",
  ins: [{ name: "input" }, { name: "lo" }, { name: "hi" }],
  compile: ({ vars: [e = 0, t = -1, n = 1], ...s }) => T[s.lang].defUgen(s, e, t, n)
}), lX = q("trig", {
  tags: ["trigger"],
  ugen: "Trig",
  description: "Emits a trigger impulse whenever the signal becomes positive. Useful to turn gates into triggers.",
  ins: [
    { name: "input", default: 0 },
    { name: "lo", default: -1 },
    { name: "hi", default: 1 }
  ],
  compile: ({ vars: [e = 0, t = -1, n = 1], ...s }) => T[s.lang].defUgen(s, e, t, n),
  examples: [
    `pulse(2)
.trig() // comment out to hear difference
.ar(.01,.2)
.mul(sine(200)).out()`
  ]
}), dX = q("qf", {
  tags: ["fx", "filter"],
  ugen: "BiquadFilter",
  description: "biQuad Filter.",
  ins: [
    { name: "input", default: 0 },
    {
      name: "type",
      default: 0,
      description: "filter type: 0 = lowpass, 1 = highpass, 2 = band pass, 3 = notch, 4 = allpass, 5 = peaking, 6 = lowshelf, 7 = highshelf"
    },
    { name: "freq", default: 500, description: "filter cutoff in Hz" },
    { name: "q", default: 1, description: "q factor" },
    { name: "gain", default: 1 }
  ],
  compile: ({ vars: e, ...t }) => T[t.lang].defUgen(t, ...e),
  examples: [
    `pink()
.qf(
 impulse(.5).seq(0,1,2,3,4,5,6,7), // type
  tri(0.5).rangex(100, 8000),  // freq
 10, // Q
 1, // gain (only relevant for types 5-7)
).div(4).out();`
  ]
}), hX = bt(
  "qlpf",
  (e, t, n = 10) => e.qf(0, t, n),
  {
    description: "biQuad Low Pass Filter",
    ins: [
      { name: "input" },
      { name: "freq" },
      { name: "q", description: "resonance" }
    ],
    tags: ["fx", "filter"],
    examples: [
      `pink().qlpf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
    ]
  }
), pX = bt(
  "qhpf",
  (e, t, n = 10) => e.qf(1, t, n),
  {
    description: "biQuad High pass filter",
    ins: [
      { name: "input" },
      { name: "freq" },
      { name: "q", description: "resonance" }
    ],
    tags: ["fx", "filter"],
    examples: [
      `pink().qhpf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
    ]
  }
), mX = bt(
  "qbpf",
  (e, t, n = 10) => e.qf(2, t, n),
  {
    description: "biQuad Band Pass Filter",
    ins: [
      { name: "input" },
      { name: "freq" },
      { name: "q", description: "resonance" }
    ],
    tags: ["fx", "filter"],
    examples: [
      `pink().qbpf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
    ]
  }
), fX = bt(
  "qnf",
  (e, t, n = 10) => e.qf(3, t, n),
  {
    description: "biQuad Notch Filter",
    ins: [
      { name: "input" },
      { name: "freq" },
      { name: "q", description: "resonance" }
    ],
    tags: ["fx", "filter"],
    examples: [
      `pink().qnf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
    ]
  }
), yX = bt(
  "qapf",
  (e, t, n = 10) => e.qf(3, t, n),
  {
    description: "biQuad All Pass Filter",
    ins: [
      { name: "input" },
      { name: "freq" },
      { name: "q", description: "resonance" }
    ],
    tags: ["fx", "filter"],
    examples: [
      `impulse(1).qapf(
  tri(0.5).rangex(100, 8000), // cutoff freq
  10 // Q
).out()`
    ]
  }
), gX = bt(
  "split",
  (e, t) => e.type !== "poly" ? t([e]) : t(e.ins),
  {
    ins: [{ name: "input" }, { name: "fn" }],
    tags: ["multi-channel"],
    description: "apply fn to an array of signals, one for each channel in input",
    examples: ["sine([220,330,550]).split(chs => add(...chs)).out()"]
  }
), bX = bt(
  "mix",
  (e, t = 1) => {
    if ([1, 2].includes(t) || (t = 2, console.warn("mix only supports 1 or 2 channels atm.. falling back to 2")), e.type !== "poly")
      return e;
    if (t === 2) {
      const n = e.ins.map((s, i, r) => {
        const a = (i / (r.length - 1) * 2 - 1 + 1) * Math.PI / 4;
        return s.mul([Math.cos(a), Math.sin(a)]).inherit(e);
      });
      return Wu(...n);
    }
    return e.ins = e.ins.map((n) => n.inherit(e)), Ls("mix").withIns(...e.ins);
  },
  {
    compile: ({ vars: e, name: t, lang: n }) => T[n].def(t, `(${e.join(" + ")})`),
    description: `mixes down multiple channels. Useful to make sure you get a mono or stereo signal out at the end. 
When mixing down to 2 channels, the input channels are equally distributed over the stereo image, e.g. 3 channels are panned [-1,0,1]`,
    ins: [
      { name: "in" },
      {
        name: "channels",
        default: 1,
        description: "how many channels to mix down to. Only supports 1 and 2"
      }
    ],
    tags: ["multi-channel"],
    examples: ["sine([220,330,440]).mix(2).out()"]
  }
);
Ee.prototype.feedback = function(e) {
  return this.add(e);
};
let MX = (e) => Wu(e), CX = Ot, xX = Ot, GX = It("mouseX", () => Nu("mouseX"), {
  ins: [],
  description: "X position of mouse, bipolar range",
  tags: ["external"],
  examples: ["mouseX.range(100,800).sine().out()"]
}), vX = GX(), PX = It("mouseY", () => Nu("mouseY"), {
  ins: [],
  description: "Y position of mouse, bipolar range",
  tags: ["external"],
  examples: ["mouseY.range(800,100).sine().out()"]
}), AX = PX(), FX = bt(
  "scope",
  (e, t) => {
    let n = 1;
    e.type === "poly" && (n = e.ins.length);
    const s = getNode("scope", e, t, n);
    return s.type !== "poly" ? (s.ins.push({ type: "n", value: 0, ins: [] }), s) : (s.ins.forEach((i, r) => i.ins.push({ type: "n", value: r, ins: [] })), s);
  },
  {
    ugen: "Scope",
    description: "renders an an oscilloscope of the current point in the graph. expects values between -1 and 1. warning: this feature is still experimental! when using it, make sure to not switch tabs, as it might fry your browser.",
    compile: ({ vars: [e, t, n, s], ...i }) => zu(i, e, t, n, s)
  }
);
const fc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  B: CX,
  PI: n2,
  _: xX,
  abs: DF,
  acos: xF,
  ad: UA,
  add: Wu,
  adsr: KA,
  and: TF,
  ar: jA,
  argmax: kF,
  argmin: VF,
  asin: GF,
  atan: vF,
  audioin: bF,
  bipolar: rX,
  bool: YF,
  bpf: sX,
  brown: eF,
  bytebeat: YA,
  cc: Nu,
  ceil: EF,
  clamp: wF,
  clip: cX,
  clock: OA,
  clockdiv: JA,
  cos: qb,
  delay: hF,
  distort: QA,
  div: AF,
  dust: tF,
  exp: Jb,
  feedback: MX,
  filter: Ob,
  floatbeat: HA,
  floor: ZF,
  fold: lF,
  fork: $F,
  greater: $b,
  gt: zF,
  hold: pF,
  hpf: tX,
  ifelse: HF,
  impulse: Ub,
  lag: oF,
  lfnoise: iX,
  log: Ka,
  lower: e2,
  lpf: nX,
  lt: NF,
  max: BF,
  midicc: gF,
  midifreq: mF,
  midigate: fF,
  midinote: JF,
  midivel: yF,
  min: RF,
  mix: bX,
  mod: XF,
  mouseX: vX,
  mouseY: AX,
  mul: PF,
  noise: jb,
  not: _F,
  or: IF,
  output: qF,
  pan: uX,
  perc: eX,
  pick: oX,
  pink: $A,
  poly: t2,
  pow: MF,
  pulse: aF,
  qapf: yX,
  qbpf: mX,
  qf: dX,
  qhpf: pX,
  qlpf: hX,
  qnf: fX,
  range: KF,
  rangex: OF,
  raw: _A,
  registerUgen: Kb,
  remap: jF,
  rng: qA,
  round: SF,
  saw: nF,
  scope: FX,
  seq: dF,
  sign: LF,
  sin: Qb,
  sine: iF,
  slew: cF,
  slide: uF,
  split: gX,
  src: QF,
  sub: FF,
  tan: CF,
  thru: UF,
  time: IA,
  tri: rF,
  trig: lX,
  unipolar: aX,
  xor: WF,
  zaw: sF
}, Symbol.toStringTag, { value: "Module" }));
class XX {
  constructor({
    onToggle: t,
    onToggleRecording: n,
    beforeEval: s,
    transpiler: i,
    localScope: r = false,
    outputNode: a = null
  } = {}) {
    this.outputNode = a, this.audio = new yA(this.outputNode), this.onToggle = t, this.transpiler = i, this.onToggleRecording = n, this.beforeEval = s, this.localScope = r, typeof window < "u" && (r || (Object.assign(globalThis, mc), Object.assign(globalThis, fc), Object.assign(globalThis, pc), Object.assign(globalThis, { repl: this })), window.addEventListener("message", (o) => {
      o.data.type === "KABELSALAT_SET_CONTROL" && this.audio.setControl(o.data.id, o.data.value);
    }));
    const u = this;
    Ee.prototype.spawn = function(o = [0, 1], c) {
      u.audio.spawn(this.output(o).exit(), c);
    };
  }
  registerUgen(t, n) {
    return this.audio.registerUgen(n), Kb(t, n.name);
  }
  evaluate(t) {
    this.localScope || (Object.assign(globalThis, { audio: this.audio }), Object.assign(globalThis, {
      addUgen: this.registerUgen.bind(this)
    }));
    let n;
    this.transpiler ? n = this.transpiler(t) : n = { output: t }, this.beforeEval?.(n);
    let s;
    return this.localScope && (s = {
      ...mc,
      ...fc,
      ...pc,
      audio: this.audio,
      addUgen: this.registerUgen.bind(this),
      repl: this
    }), _b(n.output, s);
  }
  async play(t) {
    await this.audio.init(), t.ins.length && this.audio.spawn(t), this.onToggle?.(true);
  }
  run(t) {
    const n = this.evaluate(t);
    this.play(n);
  }
  stop() {
    this.stopRecording(), this.audio.stop(), this.onToggle?.(false);
  }
  record() {
    this.audio.record(), this.onToggleRecording?.(true);
  }
  stopRecording() {
    this.audio.stopRecording(), this.onToggleRecording?.(false);
  }
}
function DX({
  defaultOutput: e,
  onEvalError: t,
  beforeEval: n,
  beforeStart: s,
  afterEval: i,
  getTime: r,
  transpiler: a,
  onToggle: u,
  editPattern: o,
  onUpdateState: c,
  sync: l = false,
  setInterval: p,
  clearInterval: m,
  id: g,
  mondo: y = false
}) {
  const x = new XX({ localScope: true }), v = {
    schedulerError: void 0,
    evalError: void 0,
    code: "// LOADING",
    activeCode: "// LOADING",
    pattern: void 0,
    miniLocations: [],
    widgets: [],
    pending: false,
    started: false
  }, E = {
    id: g
  }, w = (he) => {
    Object.assign(v, he), v.isDirty = v.code !== v.activeCode, v.error = v.evalError || v.schedulerError, c?.(v);
  }, V = {
    onTrigger: s2({ defaultOutput: e, getTime: r }),
    getTime: r,
    onToggle: (he) => {
      w({ started: he }), Wb(he), u?.(he), he || Sb();
    },
    setInterval: p,
    clearInterval: m,
    beforeStart: s
  }, D = l && typeof SharedWorker < "u" ? new wP(V) : new Db(V);
  Nb(V.onTrigger), kb(() => D.cps);
  let X = {}, Z = 0, L;
  const R = function() {
    return X = {}, Z = 0, L = void 0, Ye;
  }, H = (he) => x.evaluate(he).compile({ log: false });
  function z(he) {
    return he._Pattern ? he.__pure : he;
  }
  const $ = async (he, Ge = true) => (he = o?.(he) || he, await D.setPattern(he, Ge), zb(he), he);
  ar(() => D.now());
  const I = () => D.stop(), Y = () => D.start(), ee = () => D.pause(), Me = () => D.toggle(), re = (he) => (D.setCps(z(he)), Ye), de = (he) => (D.setCps(z(he) / 60), Ye);
  let se = [];
  const Ie = function(he) {
    return se.push(he), Ye;
  }, rt = function(he) {
    return L = he, Ye;
  }, dt = () => {
    _.prototype.p = function(Ge) {
      return typeof Ge == "string" && (Ge.startsWith("_") || Ge.endsWith("_")) ? Ye : (Ge.includes("$") && (Ge = `${Ge}${Z}`, Z++), X[Ge] = this, this);
    }, _.prototype.q = function(Ge) {
      return Ye;
    };
    try {
      for (let Ge = 1; Ge < 10; ++Ge)
        Object.defineProperty(_.prototype, `d${Ge}`, {
          get() {
            return this.p(Ge);
          },
          configurable: true
        }), Object.defineProperty(_.prototype, `p${Ge}`, {
          get() {
            return this.p(Ge);
          },
          configurable: true
        }), _.prototype[`q${Ge}`] = Ye;
    } catch (Ge) {
      console.warn("injectPatternMethods: error:", Ge);
    }
    const he = B("cpm", function(Ge, Ce) {
      return Ce._fast(Ge / 60 / D.cps);
    });
    return rr({
      all: Ie,
      each: rt,
      hush: R,
      cpm: he,
      setCps: re,
      setcps: re,
      setCpm: de,
      setcpm: de,
      compileKabel: H
    });
  };
  return { scheduler: D, evaluate: async (he, Ge = true, Ce = true) => {
    if (!he)
      throw new Error("no code to evaluate");
    try {
      w({ code: he, pending: true }), await dt(), ar(() => D.now()), await n?.({ code: he }), se = [], Ce && R(), y && (he = `mondolang\`${he}\``);
      let { pattern: Pe, meta: Se } = await e0(he, a, E);
      if (Object.keys(X).length) {
        let Le = [], pt = false;
        for (const [ae, We] of Object.entries(X)) {
          const Mt = ae.length > 1 && ae.startsWith("S");
          if (Mt && pt === false && (Le = [], pt = true), !pt || pt && Mt) {
            const ie = We.withState((J) => J.setControls({ id: ae }));
            Le.push(ie);
          }
        }
        L && (Le = Le.map((ae) => L(ae))), Pe = tt(...Le);
      } else L && (Pe = L(Pe));
      if (se.length)
        for (const Le of se)
          Pe = Le(Pe);
      return Pu(Pe) || (Pe = Ye), gt("[eval] code updated"), Pe = await $(Pe, Ge), w({
        miniLocations: Se?.miniLocations || [],
        widgets: Se?.widgets || [],
        activeCode: he,
        pattern: Pe,
        evalError: void 0,
        schedulerError: void 0,
        pending: false
      }), i?.({ code: he, pattern: Pe, meta: Se }), Pe;
    } catch (Pe) {
      gt(`[eval] error: ${Pe.message}`, "error"), console.error(Pe), w({ evalError: Pe, pending: false }), t?.(Pe);
    }
  }, start: Y, stop: I, pause: ee, setCps: re, setPattern: $, setCode: (he) => w({ code: he }), toggle: Me, state: v };
}
const s2 = ({ getTime: e, defaultOutput: t }) => async (n, s, i, r, a) => {
  try {
    (!n.context.onTrigger || !n.context.dominantTrigger) && await t(n, s, i, r, a), n.context.onTrigger && await n.context.onTrigger(n, e(), r, a);
  } catch (u) {
    Si(u, "getTrigger");
  }
};
function SX(e) {
  return new _((t) => [new et(void 0, t.span, e)]);
}
const wt = (e) => {
  const t = (n) => [new et(void 0, n.span, e(n.span.begin, n.controls))];
  return new _(t);
}, Zi = wt((e) => e % 1), Tu = Zi.toBipolar(), vr = wt((e) => 1 - e % 1), Iu = vr.toBipolar(), _u = wt((e) => Math.sin(Math.PI * 2 * e)), i2 = _u.fromBipolar(), wX = i2._early(U(1).div(4)), ZX = _u._early(U(1).div(4)), r2 = wt((e) => Math.floor(e * 2 % 2)), EX = r2.toBipolar(), LX = Ft(Zi, vr), RX = Ft(Tu, Iu), BX = Ft(vr, Zi), VX = Ft(Iu, Tu), kX = wt(Ds);
let Yu = 0, Hu = 0;
typeof window < "u" && document.addEventListener("mousemove", (e) => {
  Yu = e.clientY / document.body.clientHeight, Hu = e.clientX / document.body.clientWidth;
});
const zX = wt(() => Yu), NX = wt(() => Yu), WX = wt(() => Hu), TX = wt(() => Hu), IX = (e) => (e |= 0, e ^= e >>> 16, e = Math.imul(e, 2246822507), e ^= e >>> 13, e = Math.imul(e, 3266489909), e ^= e >>> 16, e >>> 0), _X = (e) => Math.floor(e * 536870912), YX = (e, t = 0, n = 0) => {
  const s = e >>> 0 >>> 0, i = Math.floor(e / 4294967296) >>> 0;
  let r = s ^ Math.imul(i ^ 2246822507, 3266489909);
  return r ^= Math.imul(t ^ 2135587861, 2654435769), r ^= Math.imul(n ^ 374761393, 668265261), r >>> 0;
}, yc = (e, t = 0, n = 0) => IX(YX(e, t, n)) / 4294967296, HX = (e, t, n = 0) => {
  const s = _X(e);
  if (t === 1)
    return yc(s, 0, n);
  const i = new Array(t);
  for (let r = 0; r < t; r++) i[r] = yc(s, r, n);
  return i;
}, a2 = (e) => {
  const t = e << 13 ^ e, n = t >> 17 ^ t;
  return n << 5 ^ n;
}, KX = (e) => e - Math.trunc(e), jX = (e) => a2(Math.trunc(KX(e / 300) * 536870912)), gc = (e) => e % 536870912 / 536870912, UX = (e, t) => {
  if (t === 1)
    return Math.abs(gc(e));
  const n = [];
  for (let s = 0; s < t; s++)
    n.push(gc(e)), e = a2(e);
  return n;
}, OX = (e, t) => UX(jX(e), t);
let u2 = "legacy";
const Un = (e, t = 1, n = 0) => u2 === "legacy" ? OX(e + n, t) : HX(e, t, n), JX = (e = "legacy") => u2 = e, o2 = (e) => Zi.range(0, e).round().segment(e), QX = (e) => {
  const t = j(e).log2(0).floor().add(1);
  return c2(e, t);
}, c2 = (e, t = 16) => {
  t = j(t);
  const n = o2(t).mul(-1).add(t.sub(1));
  return j(e).segment(t).brshift(n).band(Ue(1));
}, qX = (e) => {
  const t = j(e).log2(0).floor().add(1);
  return l2(e, t);
}, l2 = (e, t = 16) => j(e).withValue((n) => (s) => {
  const i = [];
  for (let r = s - 1; r >= 0; r--)
    i.push(n >> r & 1);
  return i;
}).appLeft(j(t)), $X = (e) => wt((t) => (n) => Un(t, n).map(Math.abs)).appLeft(j(e)), d2 = (e) => wt((t, n) => {
  const i = Un(t.floor().add(0.5), e, n.randSeed).map((a, u) => [a, u]).sort((a, u) => (a[0] > u[0]) - (a[0] < u[0])).map((a) => a[1]), r = t.cyclePos().mul(e).floor() % e;
  return i[r];
})._segment(e), h2 = (e, t, n) => {
  const s = [...Array(t).keys()].map((i) => n.zoom(U(i).div(t), U(i + 1).div(t)));
  return e.fmap((i) => s[i].repeatCycles(t)._fast(t)).innerJoin();
}, eD = B("shuffle", (e, t) => h2(d2(e), e, t)), tD = B("scramble", (e, t) => h2(ju(e)._segment(e), e, t)), p2 = (e, t) => new _((n) => {
  let { randSeed: s, ...i } = n.controls;
  return s = e(s), t.query(n.setControls({ ...i, randSeed: s }));
}, t._steps), nD = B("seed", (e, t) => p2(() => e, t)), St = wt((e, t) => Un(e, 1, t.randSeed)), sD = St.toBipolar(), Ku = (e) => St.fmap((t) => t < e), iD = (e) => j(e).fmap(Ku).innerJoin(), rD = Ku(0.5), ju = (e) => St.fmap((t) => Math.trunc(t * e)), aD = (e) => j(e).fmap(ju).innerJoin(), Uu = (e, t) => (t = t.map(j), t.length == 0 ? Ye : e.range(0, t.length).fmap((n) => {
  const s = Math.min(Math.max(Math.floor(n), 0), t.length - 1);
  return t[s];
})), Pr = (e, t) => Uu(e, t).outerJoin(), Ar = (e, t) => Uu(e, t).innerJoin(), m2 = (...e) => Pr(St, e), uD = (...e) => Ar(St, e), oD = m2;
_.prototype.choose = function(...e) {
  return Pr(this, e);
};
_.prototype.choose2 = function(...e) {
  return Pr(this.fromBipolar(), e);
};
const f2 = (...e) => Ar(St.segment(1), e), cD = f2, y2 = function(e, ...t) {
  const n = t.map((u) => j(u[0])), s = [];
  let i = Ue(0);
  for (const u of t)
    i = i.add(u[1]), s.push(i);
  const r = n0(s), a = function(u) {
    const o = i.mul(u);
    return r.fmap((c) => (l) => n[c.findIndex((p) => p > l, c)]).appLeft(o);
  };
  return e.bind(a);
}, lD = (...e) => y2(...e).outerJoin(), dD = (...e) => lD(St, ...e), g2 = (...e) => y2(St.segment(1), ...e).innerJoin(), hD = g2;
function pD(e, t = 0) {
  let n = Math.floor(e), s = n + 1;
  const i = (c) => 6 * c ** 5 - 15 * c ** 4 + 10 * c ** 3, r = (c) => (l) => (p) => l + i(c) * (p - l), a = Un(n, 1, t), u = Un(s, 1, t);
  return r(e - n)(a)(u);
}
function mD(e, t = 0) {
  const n = Math.floor(e), s = n + 1, i = Un(n, 1, t), r = Un(s, 1, t), a = i + r, u = (e - n) / (s - n);
  return ((c, l, p) => c + p * (l - c))(i, a, u) / 2;
}
const fD = wt((e, t) => pD(e, t.randSeed)), yD = wt((e, t) => mD(e, t.randSeed)), gD = B(
  "degradeByWith",
  (e, t, n) => n.fmap((s) => (i) => s).appLeft(e.filterValues((s) => s > t)),
  true,
  true
), bD = B(
  "degradeBy",
  function(e, t) {
    return t._degradeByWith(St, e);
  },
  true,
  true
), MD = B("degrade", (e) => e._degradeBy(0.5), true, true), CD = B(
  "undegradeBy",
  function(e, t) {
    return t._degradeByWith(
      St.fmap((n) => 1 - n),
      e
    );
  },
  true,
  true
), xD = B("undegrade", (e) => e._undegradeBy(0.5), true, true), GD = B("sometimesBy", function(e, t, n) {
  return j(e).fmap((s) => tt(n._degradeBy(s), t(n._undegradeBy(1 - s)))).innerJoin();
}), vD = B("sometimes", function(e, t) {
  return t._sometimesBy(0.5, e);
}), PD = B("someCyclesBy", function(e, t, n) {
  return j(e).fmap(
    (s) => tt(
      n._degradeByWith(St._segment(1), s),
      t(n._degradeByWith(St.fmap((i) => 1 - i)._segment(1), 1 - s))
    )
  ).innerJoin();
}), AD = B("someCycles", function(e, t) {
  return t._someCyclesBy(0.5, e);
}), FD = B("often", function(e, t) {
  return t.sometimesBy(0.75, e);
}), XD = B("rarely", function(e, t) {
  return t.sometimesBy(0.25, e);
}), DD = B("almostNever", function(e, t) {
  return t.sometimesBy(0.1, e);
}), SD = B("almostAlways", function(e, t) {
  return t.sometimesBy(0.9, e);
}), wD = B("never", function(e, t) {
  return t;
}), ZD = B("always", function(e, t) {
  return e(t);
});
function Ou(e) {
  Array.isArray(e) === false && (e = [e]);
  const t = ql();
  return e.every((n) => {
    const s = Ql.get(n) ?? n;
    return t[s];
  });
}
const ED = B("whenKey", function(e, t, n) {
  return n.when(Ou(e), t);
}), LD = B("keyDown", function(e) {
  return e.fmap(Ou);
}), RD = new _(function(e) {
  return [new et(void 0, e.span, e.span.duration)];
}), b2 = new _(function(e) {
  return [new et(void 0, e.span, U(1).div(e.span.duration))];
}), BD = b2, VD = new _(function(e) {
  const t = U(1).div(e.span.duration);
  return [new et(void 0, e.span, Math.log(t) / Math.log(2) + 1)];
});
let ur;
try {
  ur = window?.speechSynthesis;
} catch {
  console.warn("cannot use window: not in browser?");
}
let bc = ur?.getVoices();
function kD(e, t, n) {
  ur.cancel();
  const s = new SpeechSynthesisUtterance(e);
  s.lang = t, bc = ur.getVoices();
  const i = bc.filter((r) => r.lang.includes(t));
  typeof n == "number" ? s.voice = i[n % i.length] : typeof n == "string" && (s.voice = i.find((r) => r.name === r)), speechSynthesis.speak(s);
}
const zD = B("speak", function(e, t, n) {
  return n.onTrigger((s) => {
    kD(s.value, e, t);
  });
}), ND = function(e, t = {}) {
  const n = document.getElementById("code"), s = "background-image:url(" + e + ");background-size:contain;";
  n.style = s;
  const { className: i } = n, r = (o, c) => {
    ({
      style: () => n.style = s + ";" + c,
      className: () => n.className = c + " " + i
    })[o]();
  }, a = Object.entries(t).filter(([o, c]) => typeof c == "function");
  Object.entries(t).filter(([o, c]) => typeof c == "string").forEach(([o, c]) => r(o, c)), a.length;
}, WD = () => {
  const e = document.getElementById("code");
  e && (e.style = "");
};
gt("🌀 @strudel/core loaded 🌀");
globalThis._strudelLoaded && console.warn(
  `@strudel/core was loaded more than once...
This might happen when you have multiple versions of strudel installed. 
Please check with "npm ls @strudel/core".`
);
globalThis._strudelLoaded = true;
const M2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClockCollator: Jl,
  Cyclist: Db,
  FXr: vb,
  FXrel: Gb,
  FXrelease: xb,
  Fraction: U,
  Hap: et,
  Pattern: _,
  State: Es,
  TimeSpan: ct,
  __chooseWith: Uu,
  _brandBy: Ku,
  _fitslice: l0,
  _irand: ju,
  _keyDown: Ou,
  _match: d0,
  _mod: Ut,
  _morph: wu,
  _polymeterListSteps: p0,
  _retime: za,
  _slices: Na,
  accelerate: bd,
  activeLabel: T1,
  ad: jg,
  add: Mx,
  adsr: Kg,
  almostAlways: SD,
  almostNever: DD,
  always: ZD,
  amp: vd,
  analyze: kp,
  anchor: fy,
  and: zx,
  apply: mG,
  applyN: c0,
  ar: Og,
  arp: q9,
  arpWith: Q9,
  arrange: ix,
  as: fb,
  asym: jv,
  att: Ad,
  attack: Pd,
  averageArray: Nl,
  backgroundImage: ND,
  band: Ax,
  bandf: Kp,
  bandq: Op,
  bank: Bp,
  base64ToUnicode: Ul,
  bbexpr: Mm,
  bbst: xm,
  beat: Tv,
  begin: Qp,
  berlin: yD,
  bgain: ty,
  binary: QX,
  binaryL: qX,
  binaryN: c2,
  binaryNL: l2,
  bind: lx,
  binshift: bg,
  bite: CG,
  bjork: oP,
  bjorklund: Bu,
  blshift: Dx,
  bmod: Mb,
  bor: Fx,
  bp: Up,
  bpa: ef,
  bpattack: $m,
  bpd: uf,
  bpdc: Vf,
  bpdecay: af,
  bpdepth: Ef,
  bpdepthfreq: Rf,
  bpdepthfrequency: Lf,
  bpe: Um,
  bpenv: jm,
  bpf: jp,
  bpq: Jp,
  bpr: Mf,
  bprate: wf,
  bprelease: bf,
  bps: pf,
  bpshape: Bf,
  bpskew: kf,
  bpsustain: hf,
  bpsync: Zf,
  brak: wG,
  brand: rD,
  brandBy: iD,
  brshift: Sx,
  bus: $1,
  busgain: ey,
  bxor: Xx,
  bypass: uv,
  byteBeatExpression: bm,
  byteBeatStartTime: Cm,
  calculateSteps: U9,
  cat: Mi,
  ccn: tb,
  ccv: nb,
  ceil: _x,
  ch: vm,
  channel: km,
  channels: Gm,
  chebyshev: Jv,
  choose: m2,
  chooseCycles: f2,
  chooseIn: uD,
  chooseInWith: Ar,
  chooseOut: oD,
  chooseWith: Pr,
  chop: Zv,
  chord: hy,
  chorus: Vp,
  chunk: JG,
  chunkBack: $G,
  chunkBackInto: av,
  chunkInto: iv,
  chunkback: ev,
  chunkbackinto: rv,
  chunkinto: sv,
  clamp: br,
  cleanupUi: WD,
  clip: wg,
  coarse: rm,
  code2hash: W9,
  color: Yg,
  colour: Hg,
  comb: fg,
  compose: D9,
  compress: Jx,
  compressSpan: Qx,
  compressor: Ny,
  compressorAttack: Iy,
  compressorKnee: Wy,
  compressorRatio: Ty,
  compressorRelease: _y,
  compressspan: qx,
  constant: S9,
  contract: M0,
  control: eb,
  controls: iP,
  cosine: wX,
  cosine2: ZX,
  cpm: fG,
  cps: Sg,
  createClock: Xb,
  createParam: xr,
  createParams: Lu,
  crush: im,
  ctf: Wm,
  ctlNum: sb,
  ctranspose: H1,
  cubic: Hv,
  curry: Xe,
  curve: Bg,
  cut: zm,
  cutoff: Nm,
  cycleToSeconds: Ba,
  cyclesPer: RD,
  dec: Wp,
  decay: Np,
  degrade: MD,
  degradeBy: bD,
  degradeByWith: gD,
  degree: _1,
  delay: a1,
  delayfb: o1,
  delayfeedback: u1,
  delayspeed: l1,
  delaysync: m1,
  delayt: h1,
  delaytime: d1,
  deltaSlide: Vg,
  det: g1,
  detune: y1,
  dfb: c1,
  dict: my,
  dictionary: py,
  diode: Kv,
  dist: Vy,
  distort: By,
  distorttype: zy,
  distortvol: ky,
  div: Gx,
  djf: r1,
  drawLine: $l,
  drive: pm,
  drop: y0,
  dry: C1,
  ds: Ug,
  dt: p1,
  duck: mm,
  duckattack: gm,
  duckdepth: fm,
  duckonset: ym,
  dur: Lg,
  duration: Eg,
  early: yG,
  echo: IG,
  echoWith: zG,
  echowith: NG,
  eish: mP,
  end: qp,
  enhance: mg,
  env: bb,
  eq: Rx,
  eqt: Bx,
  errorLogger: Si,
  euclid: uP,
  euclidLegato: dP,
  euclidLegatoRot: hP,
  euclidRot: lP,
  euclidish: pP,
  euclidrot: cP,
  evalScope: rr,
  evaluate: e0,
  every: pG,
  expand: b0,
  expression: Oy,
  extend: g0,
  fadeInTime: v1,
  fadeOutTime: G1,
  fadeTime: x1,
  fanchor: xf,
  fast: rG,
  fastChunk: nv,
  fastGap: $x,
  fastcat: Ft,
  fastchunk: tv,
  fastgap: eG,
  fft: zp,
  filter: hv,
  filterWhen: pv,
  firstOf: hG,
  fit: Vv,
  flatten: En,
  floor: Ix,
  fm: Yd,
  fm1: Hd,
  fm2: Kd,
  fm3: jd,
  fm4: Ud,
  fm5: Od,
  fm6: Jd,
  fm7: Qd,
  fm8: qd,
  fmatt: gh,
  fmatt1: bh,
  fmatt2: Mh,
  fmatt3: Ch,
  fmatt4: xh,
  fmatt5: Gh,
  fmatt6: vh,
  fmatt7: Ph,
  fmatt8: Ah,
  fmattack: oh,
  fmattack1: ch,
  fmattack2: lh,
  fmattack3: dh,
  fmattack4: hh,
  fmattack5: ph,
  fmattack6: mh,
  fmattack7: fh,
  fmattack8: yh,
  fmdec: Yh,
  fmdec1: Hh,
  fmdec2: Kh,
  fmdec3: jh,
  fmdec4: Uh,
  fmdec5: Oh,
  fmdec6: Jh,
  fmdec7: Qh,
  fmdec8: qh,
  fmdecay: Bh,
  fmdecay1: Vh,
  fmdecay2: kh,
  fmdecay3: zh,
  fmdecay4: Nh,
  fmdecay5: Wh,
  fmdecay6: Th,
  fmdecay7: Ih,
  fmdecay8: _h,
  fmenv: $d,
  fmenv1: eh,
  fmenv2: th,
  fmenv3: nh,
  fmenv4: sh,
  fmenv5: ih,
  fmenv6: rh,
  fmenv7: ah,
  fmenv8: uh,
  fmh: Fd,
  fmh1: Xd,
  fmh2: Dd,
  fmh3: Sd,
  fmh4: wd,
  fmh5: Zd,
  fmh6: Ed,
  fmh7: Ld,
  fmh8: Rd,
  fmi: Bd,
  fmi1: Vd,
  fmi2: kd,
  fmi3: zd,
  fmi4: Nd,
  fmi5: Wd,
  fmi6: Td,
  fmi7: Id,
  fmi8: _d,
  fmrel: Fp,
  fmrel1: Xp,
  fmrel2: Dp,
  fmrel3: Sp,
  fmrel4: wp,
  fmrel5: Zp,
  fmrel6: Ep,
  fmrel7: Lp,
  fmrel8: Rp,
  fmrelease: gp,
  fmrelease1: bp,
  fmrelease2: Mp,
  fmrelease3: Cp,
  fmrelease4: xp,
  fmrelease5: Gp,
  fmrelease6: vp,
  fmrelease7: Pp,
  fmrelease8: Ap,
  fmsus: op,
  fmsus1: cp,
  fmsus2: lp,
  fmsus3: dp,
  fmsus4: hp,
  fmsus5: pp,
  fmsus6: mp,
  fmsus7: fp,
  fmsus8: yp,
  fmsustain: $h,
  fmsustain1: ep,
  fmsustain2: tp,
  fmsustain3: np,
  fmsustain4: sp,
  fmsustain5: ip,
  fmsustain6: rp,
  fmsustain7: ap,
  fmsustain8: up,
  fmwave: Fh,
  fmwave1: Xh,
  fmwave2: Dh,
  fmwave3: Sh,
  fmwave4: wh,
  fmwave5: Zh,
  fmwave6: Eh,
  fmwave7: Lh,
  fmwave8: Rh,
  focus: tG,
  focusSpan: nG,
  focusspan: sG,
  fold: Uv,
  fractionalArgs: w9,
  frameRate: xg,
  frames: Gg,
  freeze: cg,
  freq: P1,
  freqToMidi: bu,
  fromBipolar: Hx,
  fshift: Qy,
  fshiftnote: qy,
  fshiftphase: $y,
  ftype: Cf,
  func: Wx,
  fxr: Pb,
  gain: xd,
  gap: Ws,
  gat: k1,
  gate: V1,
  getAccidentalsOffset: gu,
  getControlName: xi,
  getCps: ZP,
  getCurrentKeyboardState: ql,
  getEventOffsetMs: v9,
  getFreq: zl,
  getFrequency: Tl,
  getIsStarted: RP,
  getPattern: EP,
  getPerformanceTimeSeconds: I9,
  getPlayableNoteValue: X9,
  getRandsAtTime: Un,
  getSoundIndex: F9,
  getTime: Ia,
  getTrigger: s2,
  getTriggerFunc: LP,
  grow: yv,
  gt: Zx,
  gte: Lx,
  hard: Yv,
  harmonic: K1,
  hash2code: T9,
  hbrick: Mg,
  hcutoff: qf,
  hold: Hp,
  hours: vg,
  hp: e1,
  hpa: qm,
  hpattack: Qm,
  hpd: rf,
  hpdc: Yf,
  hpdecay: sf,
  hpdepth: Wf,
  hpdepthfreq: If,
  hpdepthfrequency: Tf,
  hpe: Km,
  hpenv: Hm,
  hpf: $f,
  hpq: n1,
  hpr: gf,
  hprate: zf,
  hprelease: yf,
  hps: df,
  hpshape: _f,
  hpskew: Hf,
  hpsustain: lf,
  hpsync: Nf,
  hresonance: t1,
  hsl: dv,
  hsla: lv,
  hurry: aG,
  id: Ds,
  imag: pg,
  inhabit: AP,
  inhabitmod: XP,
  innerBind: dx,
  inside: cG,
  inv: XG,
  invert: FG,
  ir: Fy,
  irand: aD,
  irbegin: Sy,
  iresponse: Xy,
  irspeed: Dy,
  isControlName: X0,
  isNote: fs,
  isNoteWithOctave: M9,
  isPattern: Pu,
  isaw: vr,
  isaw2: Iu,
  iter: KG,
  iterBack: jG,
  iterback: UG,
  itri: BX,
  itri2: VX,
  jux: kG,
  juxBy: BG,
  juxby: VG,
  kcutoff: ng,
  keep: gx,
  keepif: bx,
  keyAlias: Ql,
  keyDown: LD,
  krush: tg,
  label: I1,
  lastOf: dG,
  late: u0,
  lbrick: Cg,
  legato: Zg,
  leslie: z1,
  lfo: gb,
  linger: xG,
  listRange: wi,
  lock: f1,
  logKey: fu,
  logger: gt,
  loop: $p,
  loopAt: Rv,
  loopAtCps: kv,
  loopBegin: em,
  loopEnd: nm,
  loopat: Bv,
  loopatcps: zv,
  loopb: tm,
  loope: sm,
  lp: Im,
  lpa: Jm,
  lpattack: Om,
  lpd: nf,
  lpdc: Df,
  lpdecay: tf,
  lpdepth: Pf,
  lpdepthfreq: Ff,
  lpdepthfrequency: Af,
  lpe: Ym,
  lpenv: _m,
  lpf: Tm,
  lpq: i1,
  lpr: ff,
  lprate: Gf,
  lprelease: mf,
  lps: cf,
  lpshape: Xf,
  lpskew: Sf,
  lpsustain: of,
  lpsync: vf,
  lrate: N1,
  lsize: W1,
  lt: wx,
  lte: Ex,
  mapArgs: Cu,
  mask: ax,
  midi2note: A9,
  midiToFreq: ds,
  midibend: lb,
  midichan: Jg,
  midicmd: $g,
  midimap: Qg,
  midiport: qg,
  miditouch: db,
  minutes: Pg,
  mod: vx,
  mode: by,
  morph: Iv,
  mouseX: TX,
  mouseY: NX,
  mousex: WX,
  mousey: zX,
  mtranspose: Y1,
  mul: xx,
  n: yd,
  nanFallback: Wl,
  ne: Vx,
  net: kx,
  never: wD,
  noise: Of,
  note: gd,
  noteToMidi: yn,
  nothing: Wt,
  nrpnn: ib,
  nrpv: rb,
  nudge: O1,
  numeralArgs: kt,
  objectMap: Ol,
  oct: Q1,
  octave: J1,
  octaveR: U1,
  octaves: gy,
  octer: sg,
  octersub: ig,
  octersubsub: rg,
  off: SG,
  offset: yy,
  often: FD,
  or: Nx,
  orbit: q1,
  oschost: pb,
  oscport: mb,
  outerBind: hx,
  outside: lG,
  overgain: ny,
  overshape: sy,
  pace: h0,
  pairs: Hl,
  palindrome: RG,
  pan: iy,
  panchor: B1,
  panorient: oy,
  panspan: ry,
  pansplay: ay,
  panwidth: uy,
  parray: Zu,
  parseFractional: Yl,
  parseNumeral: Mu,
  partials: Qv,
  patt: F1,
  pattack: A1,
  pcurve: R1,
  pdec: D1,
  pdecay: X1,
  penv: L1,
  per: b2,
  perCycle: BD,
  perlin: fD,
  perx: VD,
  ph: Dm,
  phasdp: Vm,
  phaser: Sm,
  phasercenter: Em,
  phaserdepth: Rm,
  phaserrate: Xm,
  phasersweep: wm,
  phases: qv,
  phc: Lm,
  phd: Bm,
  phs: Zm,
  pick: Zb,
  pickF: gP,
  pickOut: MP,
  pickReset: vP,
  pickRestart: xP,
  pickSqueeze: FP,
  pickmod: Eb,
  pickmodF: bP,
  pickmodOut: CP,
  pickmodReset: PP,
  pickmodRestart: GP,
  pickmodSqueeze: DP,
  pipe: _l,
  pitchJump: kg,
  pitchJumpTime: zg,
  ply: iG,
  plyForEach: HG,
  plyWith: YG,
  pm: nx,
  polyBind: fx,
  polyTouch: hb,
  polymeter: Mr,
  polyrhythm: ex,
  postgain: Gd,
  pow: Px,
  pr: tx,
  prel: E1,
  prelease: Z1,
  press: LG,
  pressBy: EG,
  progNum: ab,
  psus: w1,
  psustain: S1,
  pure: Ue,
  pw: Pm,
  pwrate: Am,
  pwsweep: Fm,
  rand: St,
  rand2: sD,
  randL: $X,
  randcat: cD,
  randrun: d2,
  range: Kx,
  range2: Ux,
  rangex: jx,
  rarely: XD,
  ratio: Ox,
  rdim: vy,
  real: hg,
  ref: Nv,
  register: B,
  registerControl: A,
  registerMultiControl: Gn,
  reify: j,
  rel: Yp,
  release: _p,
  removeUndefineds: ys,
  repeatCycles: OG,
  repl: DX,
  replicate: fv,
  reset_state: Sb,
  reset_timelines: wb,
  resonance: s1,
  rev: o0,
  revv: ZG,
  rfade: Ay,
  rib: cv,
  ribbon: ov,
  ring: ag,
  ringdf: og,
  ringf: ug,
  rlp: xy,
  room: My,
  roomdim: Gy,
  roomfade: Py,
  roomlp: Cy,
  roomsize: wy,
  rotate: Il,
  round: Tx,
  rsize: Ly,
  run: o2,
  s: D0,
  s_add: vv,
  s_alt: Mv,
  s_cat: bv,
  s_contract: Xv,
  s_expand: Av,
  s_extend: Fv,
  s_polymeter: Cv,
  s_sub: Pv,
  s_taper: xv,
  s_taperlist: Gv,
  s_tour: Dv,
  s_zip: Sv,
  saw: Zi,
  saw2: Tu,
  scram: gg,
  scramble: tD,
  scrub: yb,
  seconds: Ag,
  seed: nD,
  seg: vG,
  segment: GG,
  semitone: ly,
  seq: a0,
  seqPLoop: rx,
  sequence: on,
  sequenceP: n0,
  set: yx,
  setCpsFunc: kb,
  setIsStarted: Wb,
  setPattern: zb,
  setStringParser: t0,
  setTime: ar,
  setTriggerFunc: Nb,
  shape: Ry,
  shrink: x0,
  shrinklist: C0,
  shuffle: eD,
  signal: wt,
  silence: Ye,
  sine: i2,
  sine2: _u,
  sinefold: Ov,
  size: Zy,
  slice: A0,
  slide: cy,
  slow: uG,
  slowChunk: qG,
  slowcat: Qn,
  slowcatPrime: Fu,
  slowchunk: QG,
  smear: yg,
  soft: _v,
  sol2note: k9,
  someCycles: AD,
  someCyclesBy: PD,
  sometimes: vD,
  sometimesBy: GD,
  songPtr: Fg,
  sound: S0,
  source: md,
  sparsity: oG,
  speak: zD,
  speed: Eu,
  splice: Lv,
  splitAt: xu,
  spread: M1,
  square: r2,
  square2: EX,
  squeeze: SP,
  squeezeBind: px,
  squiz: Ky,
  src: fd,
  stack: tt,
  stackBy: sx,
  stackCentre: r0,
  stackLeft: s0,
  stackRight: i0,
  steady: SX,
  stepBind: mx,
  stepalt: m0,
  stepcat: Rt,
  steps: wv,
  stepsPerOctave: j1,
  stretch: Yy,
  striate: Ev,
  stringifyValues: Gu,
  struct: ux,
  strudelScope: vu,
  stut: _G,
  stutWith: WG,
  stutwith: TG,
  sub: Cx,
  superimpose: ox,
  sus: Ip,
  sustain: Tp,
  sustainpedal: Jy,
  swing: AG,
  swingBy: PG,
  sysex: ub,
  sysexdata: cb,
  sysexid: ob,
  sz: Ey,
  take: f0,
  time: kX,
  timeCat: Su,
  timecat: gv,
  timeline: fP,
  toBipolar: Yx,
  tokenizeNote: kl,
  tour: G0,
  transient: Cb,
  trem: um,
  tremolo: am,
  tremolodepth: cm,
  tremolophase: dm,
  tremoloshape: hm,
  tremoloskew: lm,
  tremolosync: om,
  tri: LX,
  tri2: RX,
  triode: eg,
  tsdelay: dg,
  uid: Xg,
  undegrade: xD,
  undegradeBy: CD,
  unicodeToBase64: jl,
  uniq: z9,
  uniqsort: N9,
  uniqsortr: Kl,
  unison: b1,
  unit: Hy,
  useRNG: JX,
  v: Uf,
  val: Dg,
  valueToMidi: G9,
  vel: Cd,
  velocity: Md,
  vib: Kf,
  vibmod: Jf,
  vibrato: jf,
  vmod: Qf,
  voice: dy,
  vowel: jy,
  warp: j0,
  warpatt: J0,
  warpattack: O0,
  warpdc: ad,
  warpdec: q0,
  warpdecay: Q0,
  warpdepth: id,
  warpenv: hd,
  warpmode: od,
  warprate: sd,
  warprel: nd,
  warprelease: td,
  warpshape: rd,
  warpskew: ud,
  warpsus: ed,
  warpsustain: $0,
  warpsync: pd,
  waveloss: Uy,
  wavetablePhaseRand: dd,
  wavetablePosition: Z0,
  wavetableWarp: U0,
  wavetableWarpMode: cd,
  wchoose: dD,
  wchooseCycles: g2,
  when: DG,
  whenKey: ED,
  withSeed: p2,
  withValue: cx,
  within: mv,
  worklet: eP,
  wrandcat: hD,
  wt: w0,
  wtatt: R0,
  wtattack: L0,
  wtdc: H0,
  wtdec: V0,
  wtdecay: B0,
  wtdepth: _0,
  wtenv: E0,
  wtphaserand: ld,
  wtrate: T0,
  wtrel: W0,
  wtrelease: N0,
  wtshape: Y0,
  wtskew: K0,
  wtsus: z0,
  wtsustain: k0,
  wtsync: I0,
  xfade: F0,
  xsdelay: lg,
  zcrush: Tg,
  zdelay: Ig,
  zip: v0,
  zipWith: gr,
  zmod: Wg,
  znoise: Ng,
  zoom: gG,
  zoomArc: bG,
  zoomarc: MG,
  zrand: Rg,
  zzfx: _g
}, Symbol.toStringTag, { value: "Module" }));
if (typeof DelayNode < "u") {
  class e extends DelayNode {
    constructor(n, s, i, r) {
      return super(n), s = Math.abs(s), this.delayTime.value = i, this.feedbackGain = n.createGain(), this.feedbackGain.gain.value = Math.min(Math.abs(r), 0.995), this.feedback = this.feedbackGain.gain, this.delayGain = n.createGain(), this.delayGain.gain.value = s, this.connect(this.feedbackGain), this.connect(this.delayGain), this.feedbackGain.connect(this), this.connect = (a) => this.delayGain.connect(a), this;
    }
    start(n) {
      this.delayGain.gain.setValueAtTime(this.delayGain.gain.value, n + this.delayTime.value);
    }
  }
  BaseAudioContext.prototype.createFeedbackDelay = function(t, n, s) {
    return new e(this, t, n, s);
  };
}
let Rs;
const C2 = () => (Rs = new AudioContext(), Rs), or = (e) => (Rs = e, Rs), ve = () => Rs || C2();
function TD() {
  return ve().currentTime;
}
let x2 = (e) => console.log(e);
function Pi(e, t = "superdough") {
  lt(`[${t}] error: ${e.message}`);
}
const lt = (...e) => x2(...e), G2 = (e) => {
  x2 = e;
};
let ra = {};
function v2(e, t) {
  const n = ve();
  if (ra[e])
    return ra[e];
  const s = 2 * n.sampleRate, i = n.createBuffer(1, s, n.sampleRate), r = i.getChannelData(0);
  let a = 0, u, o, c, l, p, m, g;
  u = o = c = l = p = m = g = 0;
  for (let y = 0; y < s; y++)
    if (e === "white")
      r[y] = Math.random() * 2 - 1;
    else if (e === "brown") {
      let x = Math.random() * 2 - 1;
      r[y] = (a + 0.02 * x) / 1.02, a = r[y];
    } else if (e === "pink") {
      let x = Math.random() * 2 - 1;
      u = 0.99886 * u + x * 0.0555179, o = 0.99332 * o + x * 0.0750759, c = 0.969 * c + x * 0.153852, l = 0.8665 * l + x * 0.3104856, p = 0.55 * p + x * 0.5329522, m = -0.7616 * m - x * 0.016898, r[y] = u + o + c + l + p + m + g + x * 0.5362, r[y] *= 0.11, g = x * 0.115926;
    } else if (e === "crackle") {
      const x = t * 0.01;
      Math.random() < x ? r[y] = Math.random() * 2 - 1 : r[y] = 0;
    }
  return e !== "crackle" && (ra[e] = i), i;
}
function ja(e = "white", t, n = 0.02) {
  const i = ve().createBufferSource();
  return i.buffer = v2(e, n), i.loop = true, i.start(t), {
    node: i,
    stop: (r) => i.stop(r)
  };
}
function ID(e, t, n) {
  const s = ja("pink", n), i = E2(e, s.node, t);
  return bn(s.node, () => {
    Re(s.node);
  }), {
    node: i.node,
    stop: (r) => s?.stop(r),
    teardown: i.teardown
  };
}
const Ua = /* @__PURE__ */ new Map(), Ju = Symbol("nodePoolKey"), _D = (e) => !!e[Ju], P2 = (e) => e.context?.currentTime ?? 0, YD = (e) => {
  const t = /* @__PURE__ */ new Set();
  e.parameters?.forEach((i) => t.add(i));
  const n = /* @__PURE__ */ new Set();
  let s = e;
  for (; s !== Object.prototype; ) {
    for (const i of Object.getOwnPropertyNames(s)) {
      if (n.has(i)) continue;
      n.add(i);
      const r = e[i];
      r instanceof AudioParam && t.add(r);
    }
    s = Object.getPrototypeOf(s);
  }
  return t;
}, Qu = (e) => {
  if (e.disconnect(), e instanceof AudioScheduledSourceNode)
    return;
  const t = e[Ju];
  if (t == null) return;
  const n = P2(e);
  YD(e).forEach((i) => i.cancelScheduledValues(n));
  const s = Ua.get(t) ?? [];
  s.push(new WeakRef(e)), Ua.set(t, s);
}, HD = (e) => {
  if (!(e instanceof AudioWorkletNode)) return true;
  const t = P2(e), n = e?.parameters?.get("end").value ?? 0;
  return t < n + 0.45;
}, Ei = (e, t) => {
  const n = Ua.get(e) ?? [];
  let s, i = false;
  for (; n.length; )
    if (s = n.pop()?.deref(), s != null && HD(s)) {
      i = true;
      break;
    }
  return i || (s = t()), s[Ju] = e, s;
}, KD = (e) => {
  if (typeof e != "string")
    return [];
  const [t, n = "", s] = e.match(/^([a-gA-G])([#bsf]*)(-?[0-9]*)$/)?.slice(1) || [];
  return t ? [t, n, s ? Number(s) : void 0] : [];
}, jD = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }, UD = { "#": 1, b: -1, s: 1, f: -1 }, OD = (e) => e?.split("").reduce((t, n) => t + UD[n], 0) || 0, Fr = (e, t = 3) => {
  const [n, s, i = t] = KD(e);
  if (!n)
    throw new Error('not a note: "' + e + '"');
  const r = jD[n.toLowerCase()], a = OD(s);
  return (Number(i) + 1) * 12 + r + a;
}, A2 = (e) => Math.pow(2, (e - 69) / 12) * 440, gn = (e, t, n) => Math.min(Math.max(e, t), n), JD = (e) => 12 * Math.log(e / 440) / Math.LN2 + 69, QD = (e, t) => {
  if (typeof e != "object")
    throw new Error("valueToMidi: expected object value");
  let { freq: n, note: s } = e;
  return typeof n == "number" ? JD(n) : typeof s == "string" ? Fr(s) : typeof s == "number" ? s : t;
};
function Ln(e, t = 0, n) {
  return isNaN(Number(e)) ? (!n && lt(`"${e}" is not a number, falling back to ${t}`, "warning"), t) : e;
}
const F2 = (e, t) => (e % t + t) % t, Mc = (e, t) => F2(Math.round(Ln(e, 0)), t);
function Cc(e, t) {
  return e / t;
}
function X2(e, t) {
  const { s: n, n: s = 0 } = e;
  let i = QD(e, 36), r = i - 36, a, u = 0;
  if (Array.isArray(t))
    u = Mc(s, t.length), a = t[u];
  else {
    const c = (p) => Fr(p) - i, l = Object.keys(t).filter((p) => !p.startsWith("_")).reduce(
      (p, m, g) => !p || Math.abs(c(m)) < Math.abs(c(p)) ? m : p,
      null
    );
    r = -c(l), u = Mc(s, t[l].length), a = t[l][u];
  }
  const o = `${n}:${u}`;
  return { transpose: r, url: a, index: u, midi: i, label: o };
}
const aa = (e, t) => Object.fromEntries(Object.entries(t).map(([n, s]) => [n, e[s]])), D2 = (e) => {
  try {
    return new URL(".", new URL(e)).href.replace(/\/$/, "");
  } catch {
    return e.split("/").slice(0, -1).join("/");
  }
}, qu = ["pink", "white", "brown", "crackle"];
function je(e) {
  const t = ve().createGain();
  return t.gain.value = e, t;
}
function Ai(e, t, n) {
  const s = je(n);
  return e.connect(s), s.connect(t), s;
}
const xc = (e, t, n, s) => s - n === 0 ? 0 : (t - e) / (s - n);
function Dt(e, t, n, s) {
  const i = new AudioWorkletNode(e, t, s);
  return Object.entries(n).forEach(([r, a]) => {
    a !== void 0 && (i.parameters.get(r).value = a);
  }), i;
}
const zt = (e, t, n, s, i, r, a, u, o, c = "exponential") => {
  t = Ln(t), n = Ln(n), s = Ln(s), i = Ln(i);
  const l = c === "exponential" ? "exponentialRampToValueAtTime" : "linearRampToValueAtTime";
  c === "exponential" && (r = r === 0 ? 1e-3 : r, a = a === 0 ? 1e-3 : a);
  const p = a - r, m = r + s * p, g = o - u, y = (x) => {
    let v;
    return t > x ? v = x * xc(r, a, 0, t) + r : v = (x - t) * xc(a, m, 0, n) + a, c === "exponential" && (v = v || 1e-3), v;
  };
  e.setValueAtTime(r, u), t > g ? e[l](y(g), o) : t + n > g ? (e[l](y(t), u + t), e[l](y(g), o)) : (e[l](y(t), u + t), e[l](y(t + n), u + t + n), e.setValueAtTime(m, o)), e[l](r, o + i);
};
function qD(e) {
  return typeof e == "number" ? e % 5 : { tri: 0, triangle: 0, sine: 1, ramp: 2, saw: 3, square: 4 }[e] ?? 0;
}
function S2(e, t = {}) {
  return Dt(e, "envelope-processor", t);
}
function Is(e, t = {}) {
  const {
    shape: n = 0,
    begin: s = 0,
    end: i = 0,
    time: r,
    depth: a = 1,
    dcoffset: u = -0.5,
    frequency: o = 1,
    skew: c = 0.5,
    phaseoffset: l = 0,
    curve: p = 1,
    min: m,
    max: g,
    ...y
  } = t, x = {
    begin: s,
    end: i,
    time: r ?? s,
    depth: a,
    dcoffset: u,
    frequency: o,
    skew: c,
    phaseoffset: l,
    curve: p,
    shape: qD(n),
    min: m ?? u * a,
    max: g ?? u * a + a,
    ...y
  };
  return Dt(e, "lfo-processor", x);
}
function w2(e, t, n, s, i, r) {
  const a = Ei("compressor", () => new DynamicsCompressorNode(e, {}));
  return Object.entries({
    threshold: t ?? -3,
    ratio: n ?? 10,
    knee: s ?? 10,
    attack: i ?? 5e-3,
    release: r ?? 0.05
  }).forEach(([o, c]) => {
    a[o].value = c;
  }), a;
}
const Nt = (e, t = "linear", n) => {
  const [a, u, o, c] = e;
  if (a == null && u == null && o == null && c == null)
    return n ?? [1e-3, 1e-3, 1, 0.01];
  const l = o ?? (a != null && u == null || a == null && u == null ? 1 : 1e-3);
  return [Math.max(a ?? 0, 1e-3), Math.max(u ?? 0, 1e-3), Math.min(l, 1), Math.max(c ?? 0, 0.01)];
};
function $u(e, t, n, s, i) {
  let { defaultDepth: r = 1, depth: a, dcoffset: u, ...o } = i;
  a == null && (a = Object.values(o).some((p) => p != null) ? r : 0);
  let c;
  return a && (c = Is(e, {
    begin: n,
    end: s,
    depth: a,
    dcoffset: u,
    ...o
  }), c.connect(t)), c;
}
function Oa(e, t, n, s, i, r) {
  let { amount: a, offset: u, defaultAmount: o = 1, curve: c = "linear", values: l, holdEnd: p, defaultValues: m } = i;
  a == null && (a = l.some((w) => w != null) ? o : 0);
  const g = u ?? 0, y = a + g;
  if (Math.abs(y - g)) {
    const [E, w, V, D] = Nt(l, c, m);
    zt(t, E, w, V, D, g, y, n, p, c);
  }
  return $u(e, t, n, s, r);
}
function Z2(e, t, n, s, i, r) {
  let {
    frequency: a,
    anchor: u,
    env: o,
    type: c,
    model: l,
    q: p = 1,
    drive: m = 0.69,
    depth: g,
    depthfrequency: y,
    dcoffset: x = -0.5,
    skew: v,
    shape: E,
    rate: w,
    sync: V
  } = s, D, X;
  l === "ladder" ? (X = Dt(e, "ladder-processor", { frequency: a, q: p, drive: m }), D = X.parameters.get("frequency")) : (X = Ei("filter", () => e.createBiquadFilter()), X.type = c, Object.entries({ Q: p, frequency: a }).forEach(([Me, re]) => {
    X[Me].value = re;
  }), D = X.frequency);
  const Z = [s.attack, s.decay, s.sustain, s.release], [L, R, H, z] = Nt(Z, "exponential", [5e-3, 0.14, 0, 0.1]);
  if ([...Z, o].some((ee) => ee !== void 0)) {
    o = Ln(o, 1, true), u = Ln(u, 0, true);
    const ee = Math.abs(o), Me = ee * u;
    let re = gn(2 ** -Me * a, 0, 2e4), de = gn(2 ** (ee - Me) * a, 0, 2e4);
    o < 0 && ([re, de] = [de, re]), zt(D, L, R, H, z, re, de, t, n, "exponential");
  }
  V != null && (w = i * V);
  const I = [g, y, v, E, w].some((ee) => ee !== void 0);
  let Y;
  if (I) {
    g = g ?? 1;
    const ee = r / i, re = {
      depth: y ?? (g ?? 1) * a,
      dcoffset: x,
      skew: v,
      shape: E,
      frequency: w ?? i,
      min: -a + 30,
      max: 2e4 - a,
      time: ee,
      curve: 1
    };
    Y = $u(e, D, t, n, re);
  }
  return { filter: X, lfo: Y };
}
let Gc = (e) => e < 0.5 ? 1 : 1 - (e - 0.5) / 0.5;
function E2(e, t, n = 0) {
  const s = ve();
  if (!n)
    return e;
  let i = s.createGain(), r = s.createGain();
  e.connect(i), t.connect(r), i.gain.value = Gc(n), r.gain.value = Gc(1 - n);
  let a = s.createGain();
  return i.connect(a), r.connect(a), {
    node: a,
    teardown: () => {
      Re(i), Re(r), e.disconnect(i), t.disconnect(r);
    }
  };
}
let $D = ["linear", "exponential"];
function Bs(e, t, n, s) {
  if ((t.pattack ?? t.pdecay ?? t.psustain ?? t.prelease ?? t.penv) === void 0)
    return;
  const r = Ln(t.penv, 1, true), a = $D[t.pcurve ?? 0];
  let [u, o, c, l] = Nt(
    [t.pattack, t.pdecay, t.psustain, t.prelease],
    a,
    [0.2, 1e-3, 1, 1e-3]
  ), p = t.panchor ?? c;
  const m = r * 100, g = 0 - m * p, y = m - m * p;
  zt(e, u, o, c, l, g, y, n, s, a);
}
function Vs(e, t, n) {
  const { vibmod: s = 0.5, vib: i } = t;
  let r;
  if (i > 0) {
    r = ve().createOscillator(), r.frequency.value = i;
    const a = ve().createGain();
    return a.gain.value = s * 100, r.connect(a), a.connect(e), bn(r, () => {
      Re(a), Re(r);
    }), r.start(n), { stop: (u) => r.stop(u), nodes: { vib: [r], vib_gain: [a] } };
  }
}
function eS(e, t, n = ve()) {
  const s = n.currentTime;
  mn(n, e, s, t);
}
function mn(e, t, n, s) {
  const i = new ConstantSourceNode(e), r = je(0);
  return r.connect(e.destination), i.connect(r), bn(i, () => {
    Re(r), Re(i), t();
  }), i.start(n), i.stop(s), i;
}
const tS = (e, t = "sine") => {
  const n = ve();
  let s;
  return qu.includes(t) ? (s = n.createBufferSource(), s.buffer = v2(t, 2), s.loop = true) : (s = n.createOscillator(), s.type = t, s.frequency.value = e), s.start(), s;
}, nS = (e, t, n = "sine") => {
  const i = e.value * t;
  return { osc: tS(i, n), freq: i };
};
function Fi(e, t, n) {
  const s = ve(), i = [], r = {}, a = {};
  for (let u = 1; u <= 8; u++)
    for (let o = 0; o <= 8; o++) {
      let c;
      u === o + 1 ? c = `fmi${u === 1 ? "" : u}` : c = `fmi${u}${o}`;
      const l = t[c];
      if (!l) continue;
      let p = [];
      for (let [m, g] of [
        [true, u],
        // source
        [false, o]
        // target
      ]) {
        if (g === 0) {
          p.push(e);
          continue;
        }
        if (!r[g]) {
          const X = g === 1 ? "" : g, { osc: Z, freq: L } = nS(e, t[`fmh${X}`] ?? 1, t[`fmwave${X}`] ?? "sine");
          i.push(Z);
          const R = [Z], H = ["attack", "decay", "sustain", "release"].map(($) => t[`fm${$}${X}`]);
          let z = Z;
          if (H.some(($) => $ !== void 0)) {
            const $ = s.createGain(), [I, Y, ee, Me] = Nt(H), re = n + t.duration, de = t[`fmenv${X}`] ?? "exp";
            zt(
              $.gain,
              I,
              Y,
              ee,
              Me,
              0,
              1,
              n,
              re,
              de === "exp" ? "exponential" : "linear"
            ), R.push($), z = Z.connect($);
          }
          r[g] = { input: Z.frequency, output: z, freq: L, osc: Z, toCleanup: R }, a[`fm_${g}`] = [Z];
        }
        const { input: y, output: x, freq: v, osc: E, toCleanup: w } = r[g], V = je(l), D = je(v);
        p.push(m ? x.connect(V).connect(D) : y), k2(E, [...w, V, D]), a[`fm_${g}_gain`] = [V];
      }
      if (!p[1]) {
        lt(
          `[superdough] control ${c} failed to connect FM ${u} to target ${o} due to missing frequency parameter (likely because fm${o} is noise)`,
          "warning"
        );
        continue;
      }
      p[0].connect(p[1]);
    }
  return {
    nodes: a,
    stop: (u) => i.forEach((o) => o?.stop(u))
  };
}
const L2 = (e) => e / (1 + e), sS = (e, t) => (e % t + t) % t, iS = (e, t) => (1 + t) * e / (1 + t * Math.abs(e)), Ss = (e, t) => Math.tanh(e * (1 + t)), rS = (e, t) => gn((1 + t) * e, -1, 1), R2 = (e, t) => {
  let n = (1 + 0.5 * t) * e;
  const s = sS(n + 1, 4);
  return 1 - Math.abs(s - 2);
}, aS = (e, t) => Math.sin(Math.PI / 2 * R2(e, t)), uS = (e, t) => {
  const n = L2(Math.log1p(t)), s = (e - n / 3 * e * e * e) / (1 - n / 3);
  return Ss(s, t);
}, B2 = (e, t, n = false) => {
  const s = 1 + 2 * t, r = 0.07 * L2(Math.log1p(t)), a = Ss(e + r, 2 * t), u = Ss(n ? r : -e + r, 2 * t), o = a - u, c = 1 / Math.cosh(s * r), l = c * c, p = Math.max(1e-8, (n ? 1 : 2) * s * l);
  return Ss(o / p, t);
}, oS = (e, t) => B2(e, t, true), cS = (e, t) => {
  const n = 10 * Math.log1p(t);
  let s = 1, i = e, r, a = 0;
  for (let u = 1; u < 64; u++) {
    if (u < 2) {
      a += u == 0 ? s : i;
      continue;
    }
    r = 2 * e * s - i, i = s, s = r, u % 2 === 0 && (a += Math.min(1.3 * n / u, 2) * r);
  }
  return Ss(a, n / 20);
}, eo = {
  scurve: iS,
  soft: Ss,
  hard: rS,
  cubic: uS,
  diode: B2,
  asym: oS,
  fold: R2,
  sinefold: aS,
  chebyshev: cS
}, ni = Object.freeze(Object.keys(eo)), lS = (e) => {
  let t = e;
  typeof e == "string" && (t = ni.indexOf(e), t === -1 && (lt(`[superdough] Could not find waveshaping algorithm ${e}.
        Available options are ${ni.join(", ")}.
        Defaulting to ${ni[0]}.`), t = 0));
  const n = ni[t % ni.length];
  return eo[n];
}, V2 = (e, t, n) => Dt(ve(), "distort-processor", { distort: e, postgain: t }, { processorOptions: { algorithm: n } }), Kn = (e, t = 36) => {
  let { note: n, freq: s, octave: i = 0 } = e;
  return n = n || t, typeof n == "string" && (n = Fr(n)), !s && typeof n == "number" && (s = A2(n)), s *= Math.pow(2, i), Number(s);
}, bn = (e, t) => {
  const n = t;
  e.onended = function() {
    n && n(), this.onended = null;
  };
}, Re = (e) => {
  if (e != null) {
    if (!(e instanceof AudioNode))
      throw new Error("releaseAudioNode can only release an AudioNode");
    if (e.disconnect(), e instanceof AudioScheduledSourceNode)
      try {
        e.stop();
      } catch {
        e.start(e.context.currentTime + 5), e.stop();
      }
    e instanceof AudioWorkletNode && e.parameters.get("end")?.setValueAtTime(0, 0);
  }
}, k2 = (e, t) => {
  bn(e, () => t.forEach((n) => Re(n)));
};
var to = {};
to.generateReverb = function(e, t) {
  for (var n = e.audioContext || new AudioContext(), s = n.sampleRate, i = e.numChannels || 2, r = e.decayTime * 1.5, a = Math.round(e.decayTime * s), u = Math.round(r * s), o = Math.round((e.fadeInTime || 0) * s), c = Math.pow(1 / 1e3, 1 / a), l = n.createBuffer(i, u, s), p = 0; p < i; p++) {
    for (var m = l.getChannelData(p), g = 0; g < u; g++)
      m[g] = pS() * Math.pow(c, g);
    for (var g = 0; g < o; g++)
      m[g] *= g / o;
  }
  dS(l, e.lpFreqStart || 0, e.lpFreqEnd || 0, e.decayTime, t);
};
to.generateGraph = function(e, t, n, s, i) {
  var r = document.createElement("canvas");
  r.width = t, r.height = n;
  var a = r.getContext("2d");
  a.fillStyle = "#000", a.fillRect(0, 0, r.width, r.height), a.fillStyle = "#fff";
  for (var u = t / e.length, o = n / (i - s), c = 0; c < e.length; c++)
    a.fillRect(c * u, n - (e[c] - s) * o, 1, 1);
  return r;
};
var dS = function(e, t, n, s, i) {
  if (t == 0) {
    i(e);
    return;
  }
  var r = hS(e), a = new OfflineAudioContext(e.numberOfChannels, r[0].length, e.sampleRate), u = a.createBufferSource();
  u.buffer = e;
  var o = a.createBiquadFilter();
  t = Math.min(t, e.sampleRate / 2), n = Math.min(n, e.sampleRate / 2), o.type = "lowpass", o.Q.value = 1e-4, o.frequency.setValueAtTime(t, 0), o.frequency.linearRampToValueAtTime(n, s), u.connect(o), o.connect(a.destination), u.start(), a.oncomplete = function(c) {
    i(c.renderedBuffer), Re(o), Re(u);
  }, a.startRendering(), window.filterNode = o;
}, hS = function(e) {
  for (var t = [], n = 0; n < e.numberOfChannels; n++)
    t[n] = e.getChannelData(n);
  return t;
}, pS = function() {
  return Math.random() * 2 - 1;
};
typeof AudioContext < "u" && (BaseAudioContext.prototype.adjustLength = function(e, t, n = 1, s = 0) {
  const i = Math.floor(gn(s, 0, 1) * t.length), r = t.sampleRate * e, a = this.createBuffer(t.numberOfChannels, t.length, t.sampleRate);
  for (let u = 0; u < t.numberOfChannels; u++) {
    let o = t.getChannelData(u), c = a.getChannelData(u);
    for (let l = 0; l < r; l++) {
      let p = (i + l * Math.abs(n)) % o.length;
      n < 1 && (p = p * -1), c[l] = o.at(p) || 0;
    }
  }
  return a;
}, BaseAudioContext.prototype.createReverb = function(e, t, n, s, i, r, a) {
  const u = this.createConvolver();
  return u.generate = (o = 2, c = 0.1, l = 15e3, p = 1e3, m, g, y) => {
    u.duration = o, u.fade = c, u.lp = l, u.dim = p, u.ir = m, u.irspeed = g, u.irbegin = y, m ? u.buffer = this.adjustLength(o, m, g, y) : to.generateReverb(
      {
        audioContext: this,
        numChannels: 2,
        decayTime: o,
        fadeInTime: c,
        lpFreqStart: l,
        lpFreqEnd: p
      },
      (x) => {
        u.buffer = x;
      }
    );
  }, u.generate(e, t, n, s, i, r, a), u;
});
var vc = {
  a: { freqs: [660, 1120, 2750, 3e3, 3350], gains: [1, 0.5012, 0.0708, 0.0631, 0.0126], qs: [80, 90, 120, 130, 140] },
  e: { freqs: [440, 1800, 2700, 3e3, 3300], gains: [1, 0.1995, 0.1259, 0.1, 0.1], qs: [70, 80, 100, 120, 120] },
  i: { freqs: [270, 1850, 2900, 3350, 3590], gains: [1, 0.0631, 0.0631, 0.0158, 0.0158], qs: [40, 90, 100, 120, 120] },
  o: { freqs: [430, 820, 2700, 3e3, 3300], gains: [1, 0.3162, 0.0501, 0.0794, 0.01995], qs: [40, 80, 100, 120, 120] },
  u: { freqs: [370, 630, 2750, 3e3, 3400], gains: [1, 0.1, 0.0708, 0.0316, 0.01995], qs: [40, 60, 100, 120, 120] },
  ae: { freqs: [650, 1515, 2400, 3e3, 3350], gains: [1, 0.5, 0.1008, 0.0631, 0.0126], qs: [80, 90, 120, 130, 140] },
  aa: { freqs: [560, 900, 2570, 3e3, 3300], gains: [1, 0.5, 0.0708, 0.0631, 0.0126], qs: [80, 90, 120, 130, 140] },
  oe: { freqs: [500, 1430, 2300, 3e3, 3300], gains: [1, 0.2, 0.0708, 0.0316, 0.01995], qs: [40, 60, 100, 120, 120] },
  ue: { freqs: [250, 1750, 2150, 3200, 3300], gains: [1, 0.1, 0.0708, 0.0316, 0.01995], qs: [40, 60, 100, 120, 120] },
  y: { freqs: [400, 1460, 2400, 3e3, 3300], gains: [1, 0.2, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  uh: { freqs: [600, 1250, 2100, 3100, 3500], gains: [1, 0.3, 0.0608, 0.0316, 0.01995], qs: [40, 70, 100, 120, 130] },
  un: { freqs: [500, 1240, 2280, 3e3, 3500], gains: [1, 0.1, 0.1708, 0.0216, 0.02995], qs: [40, 60, 100, 120, 120] },
  en: { freqs: [600, 1480, 2450, 3200, 3300], gains: [1, 0.15, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  an: { freqs: [700, 1050, 2500, 3e3, 3300], gains: [1, 0.1, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  on: { freqs: [500, 1080, 2350, 3e3, 3300], gains: [1, 0.1, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  get æ() {
    return this.ae;
  },
  get ø() {
    return this.oe;
  },
  get ɑ() {
    return this.aa;
  },
  get å() {
    return this.aa;
  },
  get ö() {
    return this.oe;
  },
  get ü() {
    return this.ue;
  },
  get ı() {
    return this.y;
  }
};
if (typeof GainNode < "u") {
  class e extends GainNode {
    constructor(n, s) {
      if (super(n), !vc[s])
        throw new Error("vowel: unknown vowel " + s);
      const { gains: i, qs: r, freqs: a } = vc[s];
      this.makeupGain = n.createGain(), this.filters = [], this.gains = [];
      for (let u = 0; u < 5; u++) {
        const o = n.createGain();
        o.gain.value = i[u];
        const c = n.createBiquadFilter();
        c.type = "bandpass", c.Q.value = r[u], c.frequency.value = a[u], super.connect(c), c.connect(o), this.filters.push(c), o.connect(this.makeupGain), this.gains.push(o);
      }
      return this.makeupGain.gain.value = 8, this;
    }
    connect(n) {
      this.makeupGain.connect(n);
    }
    disconnect() {
      Re(this.makeupGain), this.filters.forEach(Re), this.gains.forEach(Re), super.disconnect(), this.makeupGain = null, this.filters = null, this.gains = null;
    }
  }
  BaseAudioContext.prototype.createVowelFilter = function(t) {
    return new e(this, t);
  };
}
const mS = "data:text/javascript;base64,dmFyIF89ZnVuY3Rpb24oUil7InVzZSBzdHJpY3QiO3ZhciBXZT1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIFllPShSLFcsWCk9PlcgaW4gUj9XZShSLFcse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOlh9KTpSW1ddPVg7dmFyIER0PShSLFcsWCk9PlllKFIsdHlwZW9mIFchPSJzeW1ib2wiP1crIiI6VyxYKTtjbGFzcyBYIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye2NvbnN0cnVjdG9yKHQpe3N1cGVyKHQpLHRoaXMuc3RhcnRlZD0hMSx0aGlzLm5iSW5wdXRzPXQubnVtYmVyT2ZJbnB1dHMsdGhpcy5uYk91dHB1dHM9dC5udW1iZXJPZk91dHB1dHMsdGhpcy5ibG9ja1NpemU9dC5wcm9jZXNzb3JPcHRpb25zLmJsb2NrU2l6ZSx0aGlzLmhvcFNpemU9MTI4LHRoaXMubmJPdmVybGFwcz10aGlzLmJsb2NrU2l6ZS90aGlzLmhvcFNpemUsdGhpcy5pbnB1dEJ1ZmZlcnM9bmV3IEFycmF5KHRoaXMubmJJbnB1dHMpLHRoaXMuaW5wdXRCdWZmZXJzSGVhZD1uZXcgQXJyYXkodGhpcy5uYklucHV0cyksdGhpcy5pbnB1dEJ1ZmZlcnNUb1NlbmQ9bmV3IEFycmF5KHRoaXMubmJJbnB1dHMpO2ZvcihsZXQgcz0wO3M8dGhpcy5uYklucHV0cztzKyspdGhpcy5hbGxvY2F0ZUlucHV0Q2hhbm5lbHMocywxKTt0aGlzLm91dHB1dEJ1ZmZlcnM9bmV3IEFycmF5KHRoaXMubmJPdXRwdXRzKSx0aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlPW5ldyBBcnJheSh0aGlzLm5iT3V0cHV0cyk7Zm9yKGxldCBzPTA7czx0aGlzLm5iT3V0cHV0cztzKyspdGhpcy5hbGxvY2F0ZU91dHB1dENoYW5uZWxzKHMsMSl9cmVhbGxvY2F0ZUNoYW5uZWxzSWZOZWVkZWQodCxzKXtmb3IobGV0IGU9MDtlPHRoaXMubmJJbnB1dHM7ZSsrKXtsZXQgaT10W2VdLmxlbmd0aDtpIT10aGlzLmlucHV0QnVmZmVyc1tlXS5sZW5ndGgmJnRoaXMuYWxsb2NhdGVJbnB1dENoYW5uZWxzKGUsaSl9Zm9yKGxldCBlPTA7ZTx0aGlzLm5iT3V0cHV0cztlKyspe2xldCBpPXNbZV0ubGVuZ3RoO2khPXRoaXMub3V0cHV0QnVmZmVyc1tlXS5sZW5ndGgmJnRoaXMuYWxsb2NhdGVPdXRwdXRDaGFubmVscyhlLGkpfX1hbGxvY2F0ZUlucHV0Q2hhbm5lbHModCxzKXt0aGlzLmlucHV0QnVmZmVyc1t0XT1uZXcgQXJyYXkocyk7Zm9yKGxldCBlPTA7ZTxzO2UrKyl0aGlzLmlucHV0QnVmZmVyc1t0XVtlXT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuYmxvY2tTaXplKzEyOCksdGhpcy5pbnB1dEJ1ZmZlcnNbdF1bZV0uZmlsbCgwKTt0aGlzLmlucHV0QnVmZmVyc0hlYWRbdF09bmV3IEFycmF5KHMpLHRoaXMuaW5wdXRCdWZmZXJzVG9TZW5kW3RdPW5ldyBBcnJheShzKTtmb3IobGV0IGU9MDtlPHM7ZSsrKXRoaXMuaW5wdXRCdWZmZXJzSGVhZFt0XVtlXT10aGlzLmlucHV0QnVmZmVyc1t0XVtlXS5zdWJhcnJheSgwLHRoaXMuYmxvY2tTaXplKSx0aGlzLmlucHV0QnVmZmVyc1RvU2VuZFt0XVtlXT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuYmxvY2tTaXplKX1hbGxvY2F0ZU91dHB1dENoYW5uZWxzKHQscyl7dGhpcy5vdXRwdXRCdWZmZXJzW3RdPW5ldyBBcnJheShzKTtmb3IobGV0IGU9MDtlPHM7ZSsrKXRoaXMub3V0cHV0QnVmZmVyc1t0XVtlXT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuYmxvY2tTaXplKSx0aGlzLm91dHB1dEJ1ZmZlcnNbdF1bZV0uZmlsbCgwKTt0aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlW3RdPW5ldyBBcnJheShzKTtmb3IobGV0IGU9MDtlPHM7ZSsrKXRoaXMub3V0cHV0QnVmZmVyc1RvUmV0cmlldmVbdF1bZV09bmV3IEZsb2F0MzJBcnJheSh0aGlzLmJsb2NrU2l6ZSksdGhpcy5vdXRwdXRCdWZmZXJzVG9SZXRyaWV2ZVt0XVtlXS5maWxsKDApfXJlYWRJbnB1dHModCl7aWYodFswXS5sZW5ndGgmJnRbMF1bMF0ubGVuZ3RoPT0wKXtmb3IobGV0IHM9MDtzPHRoaXMubmJJbnB1dHM7cysrKWZvcihsZXQgZT0wO2U8dGhpcy5pbnB1dEJ1ZmZlcnNbc10ubGVuZ3RoO2UrKyl0aGlzLmlucHV0QnVmZmVyc1tzXVtlXS5maWxsKDAsdGhpcy5ibG9ja1NpemUpO3JldHVybn1mb3IobGV0IHM9MDtzPHRoaXMubmJJbnB1dHM7cysrKWZvcihsZXQgZT0wO2U8dGhpcy5pbnB1dEJ1ZmZlcnNbc10ubGVuZ3RoO2UrKyl7bGV0IGk9dFtzXVtlXTt0aGlzLmlucHV0QnVmZmVyc1tzXVtlXS5zZXQoaSx0aGlzLmJsb2NrU2l6ZSl9fXdyaXRlT3V0cHV0cyh0KXtmb3IobGV0IHM9MDtzPHRoaXMubmJJbnB1dHM7cysrKWZvcihsZXQgZT0wO2U8dGhpcy5pbnB1dEJ1ZmZlcnNbc10ubGVuZ3RoO2UrKyl7bGV0IGk9dGhpcy5vdXRwdXRCdWZmZXJzW3NdW2VdLnN1YmFycmF5KDAsMTI4KTt0W3NdW2VdLnNldChpKX19c2hpZnRJbnB1dEJ1ZmZlcnMoKXtmb3IobGV0IHQ9MDt0PHRoaXMubmJJbnB1dHM7dCsrKWZvcihsZXQgcz0wO3M8dGhpcy5pbnB1dEJ1ZmZlcnNbdF0ubGVuZ3RoO3MrKyl0aGlzLmlucHV0QnVmZmVyc1t0XVtzXS5jb3B5V2l0aGluKDAsMTI4KX1zaGlmdE91dHB1dEJ1ZmZlcnMoKXtmb3IobGV0IHQ9MDt0PHRoaXMubmJPdXRwdXRzO3QrKylmb3IobGV0IHM9MDtzPHRoaXMub3V0cHV0QnVmZmVyc1t0XS5sZW5ndGg7cysrKXRoaXMub3V0cHV0QnVmZmVyc1t0XVtzXS5jb3B5V2l0aGluKDAsMTI4KSx0aGlzLm91dHB1dEJ1ZmZlcnNbdF1bc10uc3ViYXJyYXkodGhpcy5ibG9ja1NpemUtMTI4KS5maWxsKDApfXByZXBhcmVJbnB1dEJ1ZmZlcnNUb1NlbmQoKXtmb3IobGV0IHQ9MDt0PHRoaXMubmJJbnB1dHM7dCsrKWZvcihsZXQgcz0wO3M8dGhpcy5pbnB1dEJ1ZmZlcnNbdF0ubGVuZ3RoO3MrKyl0aGlzLmlucHV0QnVmZmVyc1RvU2VuZFt0XVtzXS5zZXQodGhpcy5pbnB1dEJ1ZmZlcnNIZWFkW3RdW3NdKX1oYW5kbGVPdXRwdXRCdWZmZXJzVG9SZXRyaWV2ZSgpe2ZvcihsZXQgdD0wO3Q8dGhpcy5uYk91dHB1dHM7dCsrKWZvcihsZXQgcz0wO3M8dGhpcy5vdXRwdXRCdWZmZXJzW3RdLmxlbmd0aDtzKyspZm9yKGxldCBlPTA7ZTx0aGlzLmJsb2NrU2l6ZTtlKyspdGhpcy5vdXRwdXRCdWZmZXJzW3RdW3NdW2VdKz10aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlW3RdW3NdW2VdL3RoaXMubmJPdmVybGFwc31wcm9jZXNzKHQscyxlKXtjb25zdCBuPXRbMF1bMF0hPT12b2lkIDA7cmV0dXJuIHRoaXMuc3RhcnRlZCYmIW4/ITE6KHRoaXMuc3RhcnRlZD1uLHRoaXMucmVhbGxvY2F0ZUNoYW5uZWxzSWZOZWVkZWQodCxzKSx0aGlzLnJlYWRJbnB1dHModCksdGhpcy5zaGlmdElucHV0QnVmZmVycygpLHRoaXMucHJlcGFyZUlucHV0QnVmZmVyc1RvU2VuZCgpLHRoaXMucHJvY2Vzc09MQSh0aGlzLmlucHV0QnVmZmVyc1RvU2VuZCx0aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlLGUpLHRoaXMuaGFuZGxlT3V0cHV0QnVmZmVyc1RvUmV0cmlldmUoKSx0aGlzLndyaXRlT3V0cHV0cyhzKSx0aGlzLnNoaWZ0T3V0cHV0QnVmZmVycygpLCEwKX1wcm9jZXNzT0xBKHQscyxlKXtjb25zb2xlLmFzc2VydCghMSwiTm90IG92ZXJyaWRlbiIpfX1jbGFzcyBRdHtjb25zdHJ1Y3Rvcih0KXtpZih0aGlzLnNpemU9dHwwLHRoaXMuc2l6ZTw9MXx8dGhpcy5zaXplJnRoaXMuc2l6ZS0xKXRocm93IG5ldyBFcnJvcigiRkZUIHNpemUgbXVzdCBiZSBhIHBvd2VyIG9mIHR3byBhbmQgYmlnZ2VyIHRoYW4gMSIpO3RoaXMuX2NzaXplPXQ8PDE7Zm9yKHZhciBzPW5ldyBBcnJheSh0aGlzLnNpemUqMiksZT0wO2U8cy5sZW5ndGg7ZSs9Mil7Y29uc3QgaD1NYXRoLlBJKmUvdGhpcy5zaXplO3NbZV09TWF0aC5jb3MoaCksc1tlKzFdPS1NYXRoLnNpbihoKX10aGlzLnRhYmxlPXM7Zm9yKHZhciBpPTAsbj0xO3RoaXMuc2l6ZT5uO248PD0xKWkrKzt0aGlzLl93aWR0aD1pJTI9PT0wP2ktMTppLHRoaXMuX2JpdHJldj1uZXcgQXJyYXkoMTw8dGhpcy5fd2lkdGgpO2Zvcih2YXIgYT0wO2E8dGhpcy5fYml0cmV2Lmxlbmd0aDthKyspe3RoaXMuX2JpdHJldlthXT0wO2Zvcih2YXIgbz0wO288dGhpcy5fd2lkdGg7bys9Mil7dmFyIGM9dGhpcy5fd2lkdGgtby0yO3RoaXMuX2JpdHJldlthXXw9KGE+Pj5vJjMpPDxjfX10aGlzLl9vdXQ9bnVsbCx0aGlzLl9kYXRhPW51bGwsdGhpcy5faW52PTB9ZnJvbUNvbXBsZXhBcnJheSh0LHMpe2Zvcih2YXIgZT1zfHxuZXcgQXJyYXkodC5sZW5ndGg+Pj4xKSxpPTA7aTx0Lmxlbmd0aDtpKz0yKWVbaT4+PjFdPXRbaV07cmV0dXJuIGV9Y3JlYXRlQ29tcGxleEFycmF5KCl7Y29uc3QgdD1uZXcgQXJyYXkodGhpcy5fY3NpemUpO2Zvcih2YXIgcz0wO3M8dC5sZW5ndGg7cysrKXRbc109MDtyZXR1cm4gdH10b0NvbXBsZXhBcnJheSh0LHMpe2Zvcih2YXIgZT1zfHx0aGlzLmNyZWF0ZUNvbXBsZXhBcnJheSgpLGk9MDtpPGUubGVuZ3RoO2krPTIpZVtpXT10W2k+Pj4xXSxlW2krMV09MDtyZXR1cm4gZX1jb21wbGV0ZVNwZWN0cnVtKHQpe2Zvcih2YXIgcz10aGlzLl9jc2l6ZSxlPXM+Pj4xLGk9MjtpPGU7aSs9Mil0W3MtaV09dFtpXSx0W3MtaSsxXT0tdFtpKzFdfXRyYW5zZm9ybSh0LHMpe2lmKHQ9PT1zKXRocm93IG5ldyBFcnJvcigiSW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIG11c3QgYmUgZGlmZmVyZW50Iik7dGhpcy5fb3V0PXQsdGhpcy5fZGF0YT1zLHRoaXMuX2ludj0wLHRoaXMuX3RyYW5zZm9ybTQoKSx0aGlzLl9vdXQ9bnVsbCx0aGlzLl9kYXRhPW51bGx9cmVhbFRyYW5zZm9ybSh0LHMpe2lmKHQ9PT1zKXRocm93IG5ldyBFcnJvcigiSW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIG11c3QgYmUgZGlmZmVyZW50Iik7dGhpcy5fb3V0PXQsdGhpcy5fZGF0YT1zLHRoaXMuX2ludj0wLHRoaXMuX3JlYWxUcmFuc2Zvcm00KCksdGhpcy5fb3V0PW51bGwsdGhpcy5fZGF0YT1udWxsfWludmVyc2VUcmFuc2Zvcm0odCxzKXtpZih0PT09cyl0aHJvdyBuZXcgRXJyb3IoIklucHV0IGFuZCBvdXRwdXQgYnVmZmVycyBtdXN0IGJlIGRpZmZlcmVudCIpO3RoaXMuX291dD10LHRoaXMuX2RhdGE9cyx0aGlzLl9pbnY9MSx0aGlzLl90cmFuc2Zvcm00KCk7Zm9yKHZhciBlPTA7ZTx0Lmxlbmd0aDtlKyspdFtlXS89dGhpcy5zaXplO3RoaXMuX291dD1udWxsLHRoaXMuX2RhdGE9bnVsbH1fdHJhbnNmb3JtNCgpe3ZhciB0PXRoaXMuX291dCxzPXRoaXMuX2NzaXplLGU9dGhpcy5fd2lkdGgsaT0xPDxlLG49cy9pPDwxLGEsbyxjPXRoaXMuX2JpdHJldjtpZihuPT09NClmb3IoYT0wLG89MDthPHM7YSs9bixvKyspe2NvbnN0IG09Y1tvXTt0aGlzLl9zaW5nbGVUcmFuc2Zvcm0yKGEsbSxpKX1lbHNlIGZvcihhPTAsbz0wO2E8czthKz1uLG8rKyl7Y29uc3QgbT1jW29dO3RoaXMuX3NpbmdsZVRyYW5zZm9ybTQoYSxtLGkpfXZhciBoPXRoaXMuX2ludj8tMToxLGY9dGhpcy50YWJsZTtmb3IoaT4+PTI7aT49MjtpPj49Mil7bj1zL2k8PDE7dmFyIHU9bj4+PjI7Zm9yKGE9MDthPHM7YSs9bilmb3IodmFyIGQ9YSt1LGw9YSxwPTA7bDxkO2wrPTIscCs9aSl7Y29uc3QgbT1sLEk9bSt1LHc9SSt1LHY9dyt1LE09dFttXSxQPXRbbSsxXSxnPXRbSV0sVD10W0krMV0sQT10W3ddLFY9dFt3KzFdLE89dFt2XSxOPXRbdisxXSxDPU0sRj1QLHE9ZltwXSxCPWgqZltwKzFdLEw9ZypxLVQqQixFPWcqQitUKnEsSD1mWzIqcF0saXQ9aCpmWzIqcCsxXSwkPUEqSC1WKml0LFU9QSppdCtWKkgsSz1mWzMqcF0sWj1oKmZbMypwKzFdLGs9TypLLU4qWixmdD1PKlorTipLLGR0PUMrJCxydD1GK1UsbnQ9Qy0kLHB0PUYtVSxtdD1MK2ssYXQ9RStmdCxvdD1oKihMLWspLGd0PWgqKEUtZnQpLHZ0PWR0K210LEF0PXJ0K2F0LE90PWR0LW10LE50PXJ0LWF0LEN0PW50K2d0LEZ0PXB0LW90LEV0PW50LWd0LGt0PXB0K290O3RbbV09dnQsdFttKzFdPUF0LHRbSV09Q3QsdFtJKzFdPUZ0LHRbd109T3QsdFt3KzFdPU50LHRbdl09RXQsdFt2KzFdPWt0fX19X3NpbmdsZVRyYW5zZm9ybTIodCxzLGUpe2NvbnN0IGk9dGhpcy5fb3V0LG49dGhpcy5fZGF0YSxhPW5bc10sbz1uW3MrMV0sYz1uW3MrZV0saD1uW3MrZSsxXSxmPWErYyx1PW8raCxkPWEtYyxsPW8taDtpW3RdPWYsaVt0KzFdPXUsaVt0KzJdPWQsaVt0KzNdPWx9X3NpbmdsZVRyYW5zZm9ybTQodCxzLGUpe2NvbnN0IGk9dGhpcy5fb3V0LG49dGhpcy5fZGF0YSxhPXRoaXMuX2ludj8tMToxLG89ZSoyLGM9ZSozLGg9bltzXSxmPW5bcysxXSx1PW5bcytlXSxkPW5bcytlKzFdLGw9bltzK29dLHA9bltzK28rMV0sbT1uW3MrY10sST1uW3MrYysxXSx3PWgrbCx2PWYrcCxNPWgtbCxQPWYtcCxnPXUrbSxUPWQrSSxBPWEqKHUtbSksVj1hKihkLUkpLE89dytnLE49ditULEM9TStWLEY9UC1BLHE9dy1nLEI9di1ULEw9TS1WLEU9UCtBO2lbdF09TyxpW3QrMV09TixpW3QrMl09QyxpW3QrM109RixpW3QrNF09cSxpW3QrNV09QixpW3QrNl09TCxpW3QrN109RX1fcmVhbFRyYW5zZm9ybTQoKXt2YXIgdD10aGlzLl9vdXQscz10aGlzLl9jc2l6ZSxlPXRoaXMuX3dpZHRoLGk9MTw8ZSxuPXMvaTw8MSxhLG8sYz10aGlzLl9iaXRyZXY7aWYobj09PTQpZm9yKGE9MCxvPTA7YTxzO2ErPW4sbysrKXtjb25zdCBSdD1jW29dO3RoaXMuX3NpbmdsZVJlYWxUcmFuc2Zvcm0yKGEsUnQ+Pj4xLGk+Pj4xKX1lbHNlIGZvcihhPTAsbz0wO2E8czthKz1uLG8rKyl7Y29uc3QgUnQ9Y1tvXTt0aGlzLl9zaW5nbGVSZWFsVHJhbnNmb3JtNChhLFJ0Pj4+MSxpPj4+MSl9dmFyIGg9dGhpcy5faW52Py0xOjEsZj10aGlzLnRhYmxlO2ZvcihpPj49MjtpPj0yO2k+Pj0yKXtuPXMvaTw8MTt2YXIgdT1uPj4+MSxkPXU+Pj4xLGw9ZD4+PjE7Zm9yKGE9MDthPHM7YSs9bilmb3IodmFyIHA9MCxtPTA7cDw9bDtwKz0yLG0rPWkpe3ZhciBJPWErcCx3PUkrZCx2PXcrZCxNPXYrZCxQPXRbSV0sZz10W0krMV0sVD10W3ddLEE9dFt3KzFdLFY9dFt2XSxPPXRbdisxXSxOPXRbTV0sQz10W00rMV0sRj1QLHE9ZyxCPWZbbV0sTD1oKmZbbSsxXSxFPVQqQi1BKkwsSD1UKkwrQSpCLGl0PWZbMiptXSwkPWgqZlsyKm0rMV0sVT1WKml0LU8qJCxLPVYqJCtPKml0LFo9ZlszKm1dLGs9aCpmWzMqbSsxXSxmdD1OKlotQyprLGR0PU4qaytDKloscnQ9RitVLG50PXErSyxwdD1GLVUsbXQ9cS1LLGF0PUUrZnQsb3Q9SCtkdCxndD1oKihFLWZ0KSx2dD1oKihILWR0KSxBdD1ydCthdCxPdD1udCtvdCxOdD1wdCt2dCxDdD1tdC1ndDtpZih0W0ldPUF0LHRbSSsxXT1PdCx0W3ddPU50LHRbdysxXT1DdCxwPT09MCl7dmFyIEZ0PXJ0LWF0LEV0PW50LW90O3Rbdl09RnQsdFt2KzFdPUV0O2NvbnRpbnVlfWlmKHAhPT1sKXt2YXIga3Q9cHQsT2U9LW10LE5lPXJ0LENlPS1udCxGZT0taCp2dCxFZT0taCpndCxrZT0taCpvdCxSZT0taCphdCxEZT1rdCtGZSx6ZT1PZStFZSxxZT1OZStSZSxMZT1DZS1rZSxadD1hK2QtcCxYdD1hK3UtcDt0W1p0XT1EZSx0W1p0KzFdPXplLHRbWHRdPXFlLHRbWHQrMV09TGV9fX19X3NpbmdsZVJlYWxUcmFuc2Zvcm0yKHQscyxlKXtjb25zdCBpPXRoaXMuX291dCxuPXRoaXMuX2RhdGEsYT1uW3NdLG89bltzK2VdLGM9YStvLGg9YS1vO2lbdF09YyxpW3QrMV09MCxpW3QrMl09aCxpW3QrM109MH1fc2luZ2xlUmVhbFRyYW5zZm9ybTQodCxzLGUpe2NvbnN0IGk9dGhpcy5fb3V0LG49dGhpcy5fZGF0YSxhPXRoaXMuX2ludj8tMToxLG89ZSoyLGM9ZSozLGg9bltzXSxmPW5bcytlXSx1PW5bcytvXSxkPW5bcytjXSxsPWgrdSxwPWgtdSxtPWYrZCxJPWEqKGYtZCksdz1sK20sdj1wLE09LUksUD1sLW0sZz1wLFQ9STtpW3RdPXcsaVt0KzFdPTAsaVt0KzJdPXYsaVt0KzNdPU0saVt0KzRdPVAsaVt0KzVdPTAsaVt0KzZdPWcsaVt0KzddPVR9fWxldCB0cz1yPT5jb25zb2xlLmxvZyhyKTtjb25zdCBzcz0oLi4ucik9PnRzKC4uLnIpLGVzPShyLHQscyk9Pk1hdGgubWluKE1hdGgubWF4KHIsdCkscyksenQ9cj0+ci8oMStyKSxpcz0ocix0KT0+KHIldCt0KSV0LHJzPShyLHQpPT4oMSt0KSpyLygxK3QqTWF0aC5hYnMocikpLEo9KHIsdCk9Pk1hdGgudGFuaChyKigxK3QpKSxucz0ocix0KT0+ZXMoKDErdCkqciwtMSwxKSxxdD0ocix0KT0+e2xldCBzPSgxKy41KnQpKnI7Y29uc3QgZT1pcyhzKzEsNCk7cmV0dXJuIDEtTWF0aC5hYnMoZS0yKX0sYXM9KHIsdCk9Pk1hdGguc2luKE1hdGguUEkvMipxdChyLHQpKSxvcz0ocix0KT0+e2NvbnN0IHM9enQoTWF0aC5sb2cxcCh0KSksZT0oci1zLzMqcipyKnIpLygxLXMvMyk7cmV0dXJuIEooZSx0KX0sTHQ9KHIsdCxzPSExKT0+e2NvbnN0IGU9MSsyKnQsbj0uMDcqenQoTWF0aC5sb2cxcCh0KSksYT1KKHIrbiwyKnQpLG89SihzP246LXIrbiwyKnQpLGM9YS1vLGg9MS9NYXRoLmNvc2goZSpuKSxmPWgqaCx1PU1hdGgubWF4KDFlLTgsKHM/MToyKSplKmYpO3JldHVybiBKKGMvdSx0KX0sV3Q9e3NjdXJ2ZTpycyxzb2Z0OkosaGFyZDpucyxjdWJpYzpvcyxkaW9kZTpMdCxhc3ltOihyLHQpPT5MdChyLHQsITApLGZvbGQ6cXQsc2luZWZvbGQ6YXMsY2hlYnlzaGV2OihyLHQpPT57Y29uc3Qgcz0xMCpNYXRoLmxvZzFwKHQpO2xldCBlPTEsaT1yLG4sYT0wO2ZvcihsZXQgbz0xO288NjQ7bysrKXtpZihvPDIpe2ErPW89PTA/ZTppO2NvbnRpbnVlfW49MipyKmUtaSxpPWUsZT1uLG8lMj09PTAmJihhKz1NYXRoLm1pbigxLjMqcy9vLDIpKm4pfXJldHVybiBKKGEscy8yMCl9fSxodD1PYmplY3QuZnJlZXplKE9iamVjdC5rZXlzKFd0KSksaHM9cj0+e2xldCB0PXI7dHlwZW9mIHI9PSJzdHJpbmciJiYodD1odC5pbmRleE9mKHIpLHQ9PT0tMSYmKHNzKGBbc3VwZXJkb3VnaF0gQ291bGQgbm90IGZpbmQgd2F2ZXNoYXBpbmcgYWxnb3JpdGhtICR7cn0uCiAgICAgICAgQXZhaWxhYmxlIG9wdGlvbnMgYXJlICR7aHQuam9pbigiLCAiKX0uCiAgICAgICAgRGVmYXVsdGluZyB0byAke2h0WzBdfS5gKSx0PTApKTtjb25zdCBzPWh0W3QlaHQubGVuZ3RoXTtyZXR1cm4gV3Rbc119O2Z1bmN0aW9uIGN0KHIsdCl7aWYodHx8KHQ9ImFzc2VydGlvbiBmYWlsZWQiKSwhcil0aHJvdyBuZXcgRXJyb3IodCl9ZnVuY3Rpb24gY3Mocix0LHMpe3JldHVybiByPD0wP3Q6cj49MT9zOnQrcioocy10KX1mdW5jdGlvbiB1cyhyLHQscyl7cmV0dXJuIHI8PXQ/MDpyPj1zPzE6cz09PXQ/MDooci10KS8ocy10KX1mdW5jdGlvbiBscyhyLHQpe3JldHVybiByPHQ/KHIvPXQscityLXIqci0xKTpyPjEtdD8ocj0oci0xKS90LHIqcityK3IrMSk6MH1mdW5jdGlvbiBmcyhyKXtyZXR1cm4gTWF0aC5mbG9vcihyKT09PXJ9ZnVuY3Rpb24gZHMocil7cmV0dXJuIGZzKHIpJiZyPjB9ZnVuY3Rpb24gcHMocix0KXt0PU1hdGgubWluKE1hdGgubWF4KHQsMCksMSksdC09LjAxO3ZhciBzPTIqdC8oMS10KSxlPSgxK3MpKnIvKDErcypNYXRoLmFicyhyKSk7cmV0dXJuIGV9ZnVuY3Rpb24gSXQocix0LHMpe3JldHVybiByPj0xP3M6dCtyKihzLXQpfWZ1bmN0aW9uIFl0KCl7dGhpcy5zdGF0ZT0ib2ZmIix0aGlzLnN0YXJ0VGltZT0wLHRoaXMuc3RhcnRWYWw9MH1ZdC5wcm90b3R5cGUuZXZhbD1mdW5jdGlvbihyLHQscyxlLGksbil7c3dpdGNoKHRoaXMuc3RhdGUpe2Nhc2Uib2ZmIjpyZXR1cm4gdD4wJiYodGhpcy5zdGF0ZT0iYXR0YWNrIix0aGlzLnN0YXJ0VGltZT1yLHRoaXMuc3RhcnRWYWw9MCksMDtjYXNlImF0dGFjayI6e2xldCBhPXItdGhpcy5zdGFydFRpbWU7cmV0dXJuIGE+cz8odGhpcy5zdGF0ZT0iZGVjYXkiLHRoaXMuc3RhcnRUaW1lPXIsMSk6SXQoYS9zLHRoaXMuc3RhcnRWYWwsMSl9Y2FzZSJkZWNheSI6e2xldCBhPXItdGhpcy5zdGFydFRpbWUsbz1JdChhL2UsMSxpKTtyZXR1cm4gdDw9MD8odGhpcy5zdGF0ZT0icmVsZWFzZSIsdGhpcy5zdGFydFRpbWU9cix0aGlzLnN0YXJ0VmFsPW8sbyk6YT5lPyh0aGlzLnN0YXRlPSJzdXN0YWluIix0aGlzLnN0YXJ0VGltZT1yLGkpOm99Y2FzZSJzdXN0YWluIjpyZXR1cm4gdDw9MCYmKHRoaXMuc3RhdGU9InJlbGVhc2UiLHRoaXMuc3RhcnRUaW1lPXIsdGhpcy5zdGFydFZhbD1pKSxpO2Nhc2UicmVsZWFzZSI6e2xldCBhPXItdGhpcy5zdGFydFRpbWU7aWYoYT5uKXJldHVybiB0aGlzLnN0YXRlPSJvZmYiLDA7bGV0IG89SXQoYS9uLHRoaXMuc3RhcnRWYWwsMCk7cmV0dXJuIHQ+MCYmKHRoaXMuc3RhdGU9ImF0dGFjayIsdGhpcy5zdGFydFRpbWU9cix0aGlzLnN0YXJ0VmFsPW8pLG99fXRocm93ImludmFsaWQgZW52ZWxvcGUgc3RhdGUifTtmdW5jdGlvbiB3dCgpe3RoaXMuczA9MCx0aGlzLnMxPTB9d3QucHJvdG90eXBlLmFwcGx5PWZ1bmN0aW9uKHIsdCxzKXtjdCghaXNOYU4ociksIk5hTiB2YWx1ZSBmZWQgaW4gVHdvUG9sZUZpbHRlciIpLHQ9TWF0aC5taW4odCwxKSxzPU1hdGgubWF4KHMsMCk7dmFyIGU9TWF0aC5wb3coLjUsKDEtdCkvLjEyNSksaT1NYXRoLnBvdyguNSwocysuMTI1KS8uMTI1KSxuPTEtaSplLGE9dGhpcy5zMCxvPXRoaXMuczE7cmV0dXJuIGE9biphLWUqbytlKnIsbz1uKm8rZSphLHI9byx0aGlzLnMwPWEsdGhpcy5zMT1vLHJ9O2xldCBtcz1jbGFzcyBKdHtjb25zdHJ1Y3Rvcih0LHMpe3RoaXMuc2FtcGxlUmF0ZT10LHM/dGhpcy5idWZmZXI9cy5zbGljZSgwKToodGhpcy5idWZmZXI9bmV3IEZsb2F0MzJBcnJheSgxMCp0KSx0aGlzLmJ1ZmZlci5maWxsKDApKSx0aGlzLndyaXRlSWR4PTAsdGhpcy5yZWFkSWR4PTB9cmVzZXQoKXt0aGlzLmJ1ZmZlci5maWxsKDApLHRoaXMud3JpdGVJZHg9MCx0aGlzLnJlYWRJZHg9MH1jbG9uZSgpe2NvbnN0IHQ9bmV3IEp0KHRoaXMuc2FtcGxlUmF0ZSx0aGlzLmJ1ZmZlcik7cmV0dXJuIHQud3JpdGVJZHg9dGhpcy53cml0ZUlkeCx0LnJlYWRJZHg9dGhpcy5yZWFkSWR4LHR9d3JpdGUodCxzKXt0aGlzLndyaXRlSWR4PSh0aGlzLndyaXRlSWR4KzEpJXRoaXMuYnVmZmVyLmxlbmd0aCx0aGlzLmJ1ZmZlclt0aGlzLndyaXRlSWR4XT10O2xldCBlPU1hdGgubWluKE1hdGguZmxvb3IodGhpcy5zYW1wbGVSYXRlKnMpLHRoaXMuYnVmZmVyLmxlbmd0aC0xKTt0aGlzLnJlYWRJZHg9dGhpcy53cml0ZUlkeC1lLHRoaXMucmVhZElkeDwwJiYodGhpcy5yZWFkSWR4Kz10aGlzLmJ1ZmZlci5sZW5ndGgpfXJlYWQoKXtyZXR1cm4gdGhpcy5idWZmZXJbdGhpcy5yZWFkSWR4XX19O2NvbnN0IFN0PTEvNDhlMyxfdD0yNCxncz1fdC80O2NsYXNzIHl7Y29uc3RydWN0b3IodCxzLGUsaSl7dGhpcy5ub2RlSWQ9dCx0aGlzLnN0YXRlPXMsdGhpcy5zYW1wbGVSYXRlPWUsdGhpcy5zYW1wbGVUaW1lPTEvZSx0aGlzLnNlbmQ9aX19Y2xhc3MgYnMgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuZW52PW5ldyBZdH11cGRhdGUodCxzLGUsaSxuLGEpe3JldHVybiB0aGlzLmVudi5ldmFsKHQscyxlLGksbixhKX19Y2xhc3MgdnMgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MH11cGRhdGUodCl7bGV0IHM9X3QqdC82MCxlPS41O3JldHVybiB0aGlzLnBoYXNlKz10aGlzLnNhbXBsZVRpbWUqcyx0aGlzLnBoYXNlJTE8ZT8xOi0xfX1jbGFzcyBJcyBleHRlbmRzIHl7Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5pblNnbj0hMCx0aGlzLm91dFNnbj0hMCx0aGlzLmNsb2NrQ250PTB9dXBkYXRlKHQscyl7bGV0IGU9dD4wO3JldHVybiB0aGlzLmluU2duIT1lJiYodGhpcy5jbG9ja0NudCsrLHRoaXMuY2xvY2tDbnQ+PXMmJih0aGlzLmNsb2NrQ250PTAsdGhpcy5vdXRTZ249IXRoaXMub3V0U2duKSksdGhpcy5pblNnbj1lLHRoaXMub3V0U2duPzE6LTF9fWNsYXNzIHdzIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLmluU2duPSExfXVwZGF0ZSh0LHMpe2xldCBlPXM+MDtyZXR1cm4gZSYmdGhpcy5pblNnbiE9ZSYmdGhpcy5zZW5kKHt0eXBlOiJDTE9DS19QVUxTRSIsbm9kZUlkOnRoaXMubm9kZUlkLHRpbWU6dH0pLHRoaXMuaW5TZ249ZSwwfX1jb25zdCBNdD1uZXcgTWFwO2NsYXNzIFNzIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKTtjb25zdCBuPXMuaW5wdXRzWzJdO24mJk10LmhhcyhuKT90aGlzLmRlbGF5PU10LmdldChuKS5jbG9uZSgpOnRoaXMuZGVsYXk9bmV3IG1zKGUpLG4mJk10LnNldChuLHRoaXMuZGVsYXkpfXVwZGF0ZSh0LHMpe3JldHVybiB0aGlzLmRlbGF5LndyaXRlKHQscyksdGhpcy5kZWxheS5yZWFkKCl9fWNsYXNzIF9zIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKX11cGRhdGUodCxzKXtyZXR1cm4gcHModCxzKX19Y2xhc3MgTXMgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudmFsdWU9MCx0aGlzLnRyaWdTZ249ITF9d3JpdGUodCxzKXshdGhpcy50cmlnU2duJiZzPjAmJih0aGlzLnZhbHVlPXQpLHRoaXMudHJpZ1Nnbj1zPjB9cmVhZCgpe3JldHVybiB0aGlzLnZhbHVlfXVwZGF0ZSh0LHMpe3JldHVybiB0aGlzLndyaXRlKHQscyksdGhpcy5yZWFkKCl9fWNsYXNzIHhze2NvbnN0cnVjdG9yKCl7dGhpcy52YWx1ZT0wfXVwZGF0ZSh0KXtyZXR1cm4gdGhpcy52YWx1ZT10LHRoaXMudmFsdWV9fWNvbnN0IHlzPTM0MDtsZXQgR3Q9MDtjbGFzcyBQc3tjb25zdHJ1Y3Rvcigpe3RoaXMuY2g9R3QsdGhpcy5zdGFydF9zZWVkPXlzKih0aGlzLmNoKzEpPj4+MCx0aGlzLnN0YXRlPXRoaXMuc3RhcnRfc2VlZCx0aGlzLnZhbHVlPTAsdGhpcy5hPTE2NjQ1MjUsdGhpcy5jPTEwMTM5MDQyMjMsdGhpcy5tYXNrPTE2Nzc3MjE1LHRoaXMuc2NhbGU9NTk2MDQ2NDQ3NzUzOTA2M2UtMjMsR3QrK311cGRhdGUodCxzKXtpZighdClyZXR1cm4gdGhpcy52YWx1ZTtzJiYodGhpcy5zdGF0ZT10aGlzLnN0YXJ0X3NlZWQpLHRoaXMuc3RhdGU9dGhpcy5zdGF0ZSp0aGlzLmErdGhpcy5jPj4+MDtjb25zdCBlPSh0aGlzLnN0YXRlJnRoaXMubWFzaykqdGhpcy5zY2FsZTtyZXR1cm4gdGhpcy52YWx1ZT1lKjItMSx0aGlzLnZhbHVlfX1jbGFzcyBUc3tjb25zdHJ1Y3Rvcigpe3RoaXMudmFsdWU9TWF0aC5yYW5kb20oKSoyLTF9dXBkYXRlKHQpe3JldHVybiB0Pyh0aGlzLnZhbHVlPU1hdGgucmFuZG9tKCkqMi0xLHRoaXMudmFsdWUpOnRoaXMudmFsdWV9fWNsYXNzIEJze3VwZGF0ZSh0KXtyZXR1cm4gTWF0aC5yYW5kb20oKTx0KlN0P01hdGgucmFuZG9tKCk6MH19Y2xhc3MgVnN7Y29uc3RydWN0b3IoKXt0aGlzLm91dD0wfXVwZGF0ZSgpe2xldCB0PU1hdGgucmFuZG9tKCkqMi0xO3JldHVybiB0aGlzLm91dD0odGhpcy5vdXQrLjAyKnQpLzEuMDIsdGhpcy5vdXR9fWNsYXNzIEFze2NvbnN0cnVjdG9yKCl7dGhpcy5iMD0wLHRoaXMuYjE9MCx0aGlzLmIyPTAsdGhpcy5iMz0wLHRoaXMuYjQ9MCx0aGlzLmI1PTAsdGhpcy5iNj0wfXVwZGF0ZSgpe2NvbnN0IHQ9TWF0aC5yYW5kb20oKSoyLTE7dGhpcy5iMD0uOTk4ODYqdGhpcy5iMCt0Ki4wNTU1MTc5LHRoaXMuYjE9Ljk5MzMyKnRoaXMuYjErdCouMDc1MDc1OSx0aGlzLmIyPS45NjkqdGhpcy5iMit0Ki4xNTM4NTIsdGhpcy5iMz0uODY2NSp0aGlzLmIzK3QqLjMxMDQ4NTYsdGhpcy5iND0uNTUqdGhpcy5iNCt0Ki41MzI5NTIyLHRoaXMuYjU9LS43NjE2KnRoaXMuYjUtdCouMDE2ODk4O2NvbnN0IHM9dGhpcy5iMCt0aGlzLmIxK3RoaXMuYjIrdGhpcy5iMyt0aGlzLmI0K3RoaXMuYjUrdGhpcy5iNit0Ki41MzYyO3JldHVybiB0aGlzLmI2PXQqLjExNTkyNixzKi4xMX19Y2xhc3MgT3MgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MX11cGRhdGUodCl7dGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQ7bGV0IHM9dGhpcy5waGFzZT49MT8xOjA7cmV0dXJuIHRoaXMucGhhc2U9dGhpcy5waGFzZSUxLHN9fWNsYXNzIE5zIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnBoYXNlPTB9dXBkYXRlKHQscyl7cmV0dXJuIHRoaXMucGhhc2UrPXRoaXMuc2FtcGxlVGltZSp0LHRoaXMucGhhc2UlMTxzPzE6LTF9fWNsYXNzIENzIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnBoYXNlPTB9dXBkYXRlKHQpe3JldHVybiB0aGlzLnBoYXNlKz10aGlzLnNhbXBsZVRpbWUqdCx0aGlzLnBoYXNlJTEqMi0xfX1jbGFzcyBGc3tjb25zdHJ1Y3Rvcigpe3RoaXMucGhhc2U9TWF0aC5yYW5kb20oKX11cGRhdGUodCl7Y29uc3Qgcz10L3NhbXBsZVJhdGU7bGV0IGU9bHModGhpcy5waGFzZSxzKSxpPTIqdGhpcy5waGFzZS0xLWU7cmV0dXJuIHRoaXMucGhhc2UrPXMsdGhpcy5waGFzZT4xJiYodGhpcy5waGFzZS09MSksaX19Y2xhc3MgRXMgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MCx0aGlzLnN5bmNTZ249ITF9dXBkYXRlKHQscyxlKXshdGhpcy5zeW5jU2duJiZzPjAmJih0aGlzLnBoYXNlPTApLHRoaXMuc3luY1Nnbj1zPjA7bGV0IGk9KHRoaXMucGhhc2UrZSklMTtyZXR1cm4gdGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQsTWF0aC5zaW4oaSoyKk1hdGguUEkpfX1jbGFzcyBrc3tkQlRvTGluZWFyKHQpe3JldHVybiBNYXRoLnBvdygxMCx0LzIwKX1saW5lYXJUb0RCKHQpe3JldHVybiAyMCpNYXRoLmxvZzEwKHQpfXVwZGF0ZSh0LHMsZSl7bGV0IGk9dGhpcy5saW5lYXJUb0RCKE1hdGguYWJzKHQpKSxuPTA7cmV0dXJuIGk+cyYmKG49KGktcykqKDEtMS9lKSksdGhpcy5kQlRvTGluZWFyKC1uKX19Y2xhc3MgUnMgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMucGhhc2U9MH11cGRhdGUodCl7dGhpcy5waGFzZSs9dGhpcy5zYW1wbGVUaW1lKnQ7bGV0IHM9dGhpcy5waGFzZSUxO3JldHVybihzPC41PzIqczoxLTIqKHMtLjUpKSoyLTF9fWNsYXNzIERzIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKTtjb25zdCBuPWUvMzA7Y3QoZHMobikpLHRoaXMuYnVmZmVyPW5ldyBGbG9hdDMyQXJyYXkobiksdGhpcy53cml0ZVBvcz0wfXVwZGF0ZSh0LHMsZSxpKXtyZXR1cm4gdGhpcy5idWZmZXJbdGhpcy53cml0ZVBvc109dCx0aGlzLndyaXRlUG9zKyssdGhpcy53cml0ZVBvcyV0aGlzLmJ1ZmZlci5sZW5ndGg9PTAmJih0aGlzLndyaXRlUG9zPTAsdGhpcy5zZW5kKHt0eXBlOiJTRU5EX1NBTVBMRVMiLGlkOnMsc2FtcGxlczp0aGlzLmJ1ZmZlcixjaGFubmVsczplLGNoYW5uZWw6aX0pKSx0fX1jbGFzcyB6c3tjb25zdHJ1Y3Rvcigpe3RoaXMubGFnVW5pdD00NDEwLHRoaXMucz0wfXVwZGF0ZSh0LHMpe3JldHVybiBzPXMqdGhpcy5sYWdVbml0LHM8MSYmKHM9MSksdGhpcy5zKz0xL3MqKHQtdGhpcy5zKSx0aGlzLnN9fWNsYXNzIHFze2NvbnN0cnVjdG9yKCl7dGhpcy5sYXN0PTB9dXBkYXRlKHQscyxlKXtjb25zdCBpPXMqU3Qsbj1lKlN0O2xldCBhPXQtdGhpcy5sYXN0O3JldHVybiBhPmk/YT1pOmE8LW4mJihhPS1uKSx0aGlzLmxhc3QrPWEsdGhpcy5sYXN0fX1jbGFzcyBMcyBleHRlbmRzIHl7Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5zPTB9dXBkYXRlKHQscyl7cmV0dXJuIHM9cyoxZTMsczwxJiYocz0xKSx0aGlzLnMrPTEvcyoodC10aGlzLnMpLHRoaXMuc319Y2xhc3MgV3MgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMuZmlsdGVyPW5ldyB3dH11cGRhdGUodCxzLGUpe3JldHVybiB0aGlzLmZpbHRlci5hcHBseSh0LHMsZSksdGhpcy5maWx0ZXIuczF9fWNsYXNzIFlzIGV4dGVuZHMgeXtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLmZpbHRlcj1uZXcgd3R9dXBkYXRlKHQscyxlKXtyZXR1cm4gdGhpcy5maWx0ZXIuYXBwbHkodCxzLGUpLHRoaXMuZmlsdGVyLnMwfX1jbGFzcyBHcyBleHRlbmRzIHl7Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSl9dXBkYXRlKHQscyl7cmV0dXJuIHM8MCYmKHM9MCkscz1zKzEsdD10KnMsNCooTWF0aC5hYnMoLjI1KnQrLjI1LU1hdGgucm91bmQoLjI1KnQrLjI1KSktLjI1KX19Y2xhc3MganMgZXh0ZW5kcyB5e3VwZGF0ZSh0KXtyZXR1cm4gdH19Y2xhc3MgYnQgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMubm90ZT0wLHRoaXMuZnJlcT0wLHRoaXMudmVsb2NpdHk9MCx0aGlzLmdhdGVTdGF0ZT0ib2ZmIix0aGlzLnR5cGU9Im1pZGlpbiIsdGhpcy5jaGFubmVsPS0xfWlzRnJlZSgpe3JldHVybiB0aGlzLmdhdGVTdGF0ZT09PSJvZmYifW5vdGVPbih0LHMpe3M+MD8odGhpcy5ub3RlPXQsdGhpcy52ZWxvY2l0eT1zLHRoaXMuZnJlcT0yKiooKHQtNjkpLzEyKSo0NDAsdGhpcy5nYXRlU3RhdGU9InByZXRyaWciKTp0aGlzLm5vdGVPZmYoKX1ub3RlT2ZmKCl7dGhpcy5ub3RlPTAsdGhpcy5nYXRlU3RhdGU9Im9mZiJ9Z2V0R2F0ZSgpe3N3aXRjaCh0aGlzLmdhdGVTdGF0ZSl7Y2FzZSJwcmV0cmlnIjpyZXR1cm4gdGhpcy5nYXRlU3RhdGU9Im9uIiwwO2Nhc2Uib24iOnJldHVybiAxO2Nhc2Uib2ZmIjpyZXR1cm4gMDtkZWZhdWx0OmN0KCExKX19Z2V0RnJlcSgpe3N3aXRjaCh0aGlzLmdhdGVTdGF0ZSl7Y2FzZSJwcmV0cmlnIjpyZXR1cm4gdGhpcy5nYXRlU3RhdGU9Im9uIiwwO2Nhc2Uib24iOnJldHVybiB0aGlzLmZyZXE7Y2FzZSJvZmYiOnJldHVybiB0aGlzLmZyZXE7ZGVmYXVsdDpjdCghMSl9fWdldFZlbG9jaXR5KCl7c3dpdGNoKHRoaXMuZ2F0ZVN0YXRlKXtjYXNlInByZXRyaWciOnJldHVybiB0aGlzLmdhdGVTdGF0ZT0ib24iLDA7Y2FzZSJvbiI6cmV0dXJuIHRoaXMudmVsb2NpdHk7Y2FzZSJvZmYiOnJldHVybiB0aGlzLnZlbG9jaXR5O2RlZmF1bHQ6Y3QoITEpfX19Y2xhc3MgSHMgZXh0ZW5kcyBidHtjb25zdHJ1Y3Rvcih0LHMsZSxpKXtzdXBlcih0LHMsZSxpKSx0aGlzLnR5cGU9Im1pZGlnYXRlIn11cGRhdGUodCl7cmV0dXJuIHRoaXMuY2hhbm5lbD10LHRoaXMuZ2V0R2F0ZSgpfX1jbGFzcyBVcyBleHRlbmRzIGJ0e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudHlwZT0ibWlkaWZyZXEifXVwZGF0ZSh0KXtyZXR1cm4gdGhpcy5jaGFubmVsPXQsdGhpcy5nZXRGcmVxKCl9fWNsYXNzICRzIGV4dGVuZHMgYnR7Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy50eXBlPSJtaWRpdmVsIn11cGRhdGUodCl7cmV0dXJuIHRoaXMuY2hhbm5lbD10LHRoaXMuZ2V0VmVsb2NpdHkoKX19Y2xhc3MgS3N7Y29uc3RydWN0b3IodCxzLGUsaSl7dGhpcy51cD0hMSx0aGlzLnNlbmQ9aSx0aGlzLnZhbHVlPTAsdGhpcy50eXBlPSJjYyJ9c2V0VmFsdWUodCl7dGhpcy52YWx1ZT10fXVwZGF0ZSh0LHMsZSl7cmV0dXJuIHRoaXMuaWQ9cywhdGhpcy51cCYmdD4wPyh0aGlzLnVwPSEwLHRoaXMuc2VuZCh7dHlwZToiU0lHTkFMX1RSSUdHRVIiLGlkOnMsdGltZTplfSksdGhpcy52YWx1ZSk6KHRoaXMudXA9dD4wLHRoaXMudmFsdWUpfX1jbGFzcyBacyBleHRlbmRzIHl7Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy50eXBlPSJjYyIsdGhpcy52YWx1ZT1zLmlucHV0c1sxXT8/MH1zZXRWYWx1ZSh0KXt0aGlzLnZhbHVlPXR9dXBkYXRlKHQpe3JldHVybiB0aGlzLmlkPXQsdGhpcy52YWx1ZX19Y2xhc3MgWHMgZXh0ZW5kcyB5e2NvbnN0cnVjdG9yKHQscyxlLGkpe3N1cGVyKHQscyxlLGkpLHRoaXMudHlwZT0ibWlkaWNjIix0aGlzLnZhbHVlPXMuaW5wdXRzWzJdPz8tMSx0aGlzLmNoYW5uZWw9LTEsdGhpcy5jY251bWJlcj0tMX1zZXRWYWx1ZSh0KXt0aGlzLnZhbHVlPXR9dXBkYXRlKHQscyl7cmV0dXJuIHRoaXMuY2NudW1iZXI9dCx0aGlzLmNoYW5uZWw9cyx0aGlzLnZhbHVlfX1jbGFzcyBKcyBleHRlbmRzIHl7Y29uc3RydWN0b3IodCxzLGUsaSl7c3VwZXIodCxzLGUsaSksdGhpcy5jbG9ja1Nnbj0hMCx0aGlzLnN0ZXA9MCx0aGlzLmZpcnN0PSEwfXVwZGF0ZSh0LC4uLnMpe3JldHVybiF0aGlzLmNsb2NrU2duJiZ0PjA/KHRoaXMuc3RlcD0odGhpcy5zdGVwKzEpJXMubGVuZ3RoLHRoaXMuY2xvY2tTZ249dD4wLDApOih0aGlzLmNsb2NrU2duPXQ+MCxzW3RoaXMuc3RlcF0pfX1jbGFzcyBRcyBleHRlbmRzIHl7dXBkYXRlKHQsLi4ucyl7Y29uc3QgZT10JXMubGVuZ3RoK3MubGVuZ3RoO3JldHVybiBzW01hdGguZmxvb3IoZSklcy5sZW5ndGhdfX1jbGFzcyB0ZXt1cGRhdGUodCxzLGUsaSxuKXtsZXQgYT11cyh0LHMsZSk7cmV0dXJuIGNzKGEsaSxuKX19Y2xhc3Mgc2V7dXBkYXRlKHQscyxlKXtyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodCxzKSxlKX19Y2xhc3MgZWV7Y29uc3RydWN0b3IoKXt0aGlzLmhpPSExfXVwZGF0ZSh0KXtyZXR1cm4hdGhpcy5oaSYmdD4wPyh0aGlzLmhpPSEwLDEpOih0aGlzLmhpJiZ0PD0wJiYodGhpcy5oaT0hMSksMCl9fWNsYXNzIGlle2NvbnN0cnVjdG9yKCl7dGhpcy54MT0wLHRoaXMueDI9MCx0aGlzLnkxPTAsdGhpcy55Mj0wLHRoaXMuYTA9MSx0aGlzLmExPTAsdGhpcy5hMj0wLHRoaXMuYjA9MSx0aGlzLmIxPTAsdGhpcy5iMj0wfXVwZGF0ZSh0PTAscz0wLGU9NTAwLGk9MSxuPTEpe2NvbnN0IGE9MipNYXRoLlBJKmUvc2FtcGxlUmF0ZSxvPU1hdGguc2luKGEpO2k9TWF0aC5wb3coMTAsaS8yMCk7Y29uc3QgYz1vLygyKmkpLGg9TWF0aC5jb3MoYSk7aWYocz09PTApdGhpcy5iMT0xLWgsdGhpcy5iMD10aGlzLmIxLzIsdGhpcy5iMj10aGlzLmIwLHRoaXMuYTA9MStjLHRoaXMuYTE9LTIqaCx0aGlzLmEyPTEtYztlbHNlIGlmKHM9PT0xKXRoaXMuYjA9KDEraCkvMix0aGlzLmIxPS0oMStoKSx0aGlzLmIyPXRoaXMuYjAsdGhpcy5hMD0xK2MsdGhpcy5hMT0tMipoLHRoaXMuYTI9MS1jO2Vsc2UgaWYocz09PTIpdGhpcy5iMD1vLzIsdGhpcy5iMT0wLHRoaXMuYjI9LXRoaXMuYjAsdGhpcy5hMD0xK2MsdGhpcy5hMT0tMipoLHRoaXMuYTI9MS1jO2Vsc2UgaWYocz09PTMpdGhpcy5iMD0xLHRoaXMuYjE9LTIqaCx0aGlzLmIyPTEsdGhpcy5hMD0xK2MsdGhpcy5hMT0tMipoLHRoaXMuYTI9MS1jO2Vsc2UgaWYocz09PTQpdGhpcy5iMD0xLWMsdGhpcy5iMT0tMipoLHRoaXMuYjI9MStjLHRoaXMuYTA9MStjLHRoaXMuYTE9LTIqaCx0aGlzLmEyPTEtYztlbHNlIGlmKHM9PT01KXtjb25zdCB1PU1hdGgucG93KDEwLG4vNDApO3RoaXMuYjA9MStjKnUsdGhpcy5iMT0tMipoLHRoaXMuYjI9MS1jKnUsdGhpcy5hMD0xK2MvdSx0aGlzLmExPS0yKmgsdGhpcy5hMj0xLWMvdX1lbHNlIGlmKHM9PT02KXtjb25zdCB1PU1hdGgucG93KDEwLG4vNDApLGQ9MipNYXRoLnNxcnQodSkqYyxsPSh1LTEpKmgscD0odSsxKSpoO3RoaXMuYjA9dSoodSsxLWwrZCksdGhpcy5iMT0yKnUqKHUtMS1wKSx0aGlzLmIyPXUqKHUrMS1sLWQpLHRoaXMuYTA9dSsxK2wrZCx0aGlzLmExPS0yKih1LTErcCksdGhpcy5hMj11KzErbC1kfWVsc2UgaWYocz09PTcpe2NvbnN0IHU9TWF0aC5wb3coMTAsbi80MCksZD0yKk1hdGguc3FydCh1KSpjLGw9KHUtMSkqaCxwPSh1KzEpKmg7dGhpcy5iMD11Kih1KzErbCtkKSx0aGlzLmIxPS0yKnUqKHUtMStwKSx0aGlzLmIyPXUqKHUrMStsLWQpLHRoaXMuYTA9dSsxLWwrZCx0aGlzLmExPTIqKHUtMS1wKSx0aGlzLmEyPXUrMS1sLWR9dGhpcy5iMC89dGhpcy5hMCx0aGlzLmIxLz10aGlzLmEwLHRoaXMuYjIvPXRoaXMuYTAsdGhpcy5hMS89dGhpcy5hMCx0aGlzLmEyLz10aGlzLmEwLHRoaXMuYTA9MTtjb25zdCBmPXRoaXMuYjAqdCt0aGlzLmIxKnRoaXMueDErdGhpcy5iMip0aGlzLngyLXRoaXMuYTEqdGhpcy55MS10aGlzLmEyKnRoaXMueTI7cmV0dXJuIHRoaXMueDI9dGhpcy54MSx0aGlzLngxPXQsdGhpcy55Mj10aGlzLnkxLHRoaXMueTE9ZixmfX1jb25zdCByZT1PYmplY3QuZnJlZXplKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7X19wcm90b19fOm51bGwsQURTUk5vZGU6YnMsQXVkaW9JbjpqcyxBdWRpb05vZGU6eSxCUEY6WXMsQmlxdWFkRmlsdGVyOmllLEJyb3duTm9pc2VPc2M6VnMsQ0M6WnMsQ0xPQ0tfUFBROl90LENMT0NLX1BQUzpncyxDbGlwOnNlLENsb2NrOnZzLENsb2NrRGl2OklzLENsb2NrT3V0OndzLERlbGF5OlNzLERpc3RvcnQ6X3MsRHVzdE9zYzpCcyxGaWx0ZXI6V3MsRm9sZDpHcyxIb2xkOk1zLEltcHVsc2VPc2M6T3MsTGFnOnpzLExjZ05vaXNlOlBzLE1pZGlDQzpYcyxNaWRpRnJlcTpVcyxNaWRpR2F0ZTpIcyxNaWRpSW46YnQsTWlkaVZlbDokcyxOb2lzZU9zYzpUcyxPdXRwdXQ6eHMsUGljazpRcyxQaW5rTm9pc2U6QXMsUHVsc2VPc2M6TnMsUmVtYXA6dGUsU2F3T3NjOkZzLFNjb3BlOkRzLFNlcXVlbmNlOkpzLFNpZGVjaGFpbkNvbXByZXNzb3I6a3MsU2lnbmFsOktzLFNpbmVPc2M6RXMsU2xldzpxcyxTbGlkZTpMcyxUcmlPc2M6UnMsVHJpZzplZSxaYXdPc2M6Q3N9LFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6Ik1vZHVsZSJ9KSksbmU9bmV3IE1hcChPYmplY3QuZW50cmllcyhyZSkpLFk9MTI4LEQ9TWF0aC5QSSx6PTIqRCxHPTEvc2FtcGxlUmF0ZSx4dD1yPT4xLU1hdGguZXhwKC1HL3IpLGp0PXI9Pk1hdGgucG93KDEwLHIvMjApLFM9KHIsdCxzKT0+TWF0aC5taW4oTWF0aC5tYXgocix0KSxzKSx1dD0ocix0LHMpPT5zKih0LXIpK3IsYj0ocix0KT0+clt0XT8/clswXSxRPXI9PnItTWF0aC5mbG9vcihyKSx0dD1yPT5yfDAsc3Q9cj0+dHQocisuNSksYWU9cj0+dHQocisxKSxIdD1yPT5yLXR0KHIpLGo9cj0+e2NvbnN0IHQ9cioqMjtyZXR1cm4gciooMjcrdCkvKDI3KzkqdCl9LFV0PShyLHQpPT57aWYocjwyKXJldHVybiBpPT4wO2NvbnN0IHM9dC8oci0xKSxlPXQqLjU7cmV0dXJuIGk9Pmkqcy1lfSxldD0ocix0KT0+cipNYXRoLnBvdygyLHQvMTIpO2Z1bmN0aW9uIG9lKHIsdCl7dD1NYXRoLm1pbih0LDEtdCk7Y29uc3Qgcz0xL3Q7cmV0dXJuIHI8dD8ocio9cywyKnItcioqMi0xKTpyPjEtdD8ocj0oci0xKSpzLHIqKjIrMipyKzEpOjB9Y29uc3QgeXQ9e3RyaShyLHQ9LjUpe2NvbnN0IHM9MS10O3JldHVybiByPj10PzEvcy1yL3M6ci90fSxzaW5lKHIpe3JldHVybiBNYXRoLnNpbih6KnIpKi41Ky41fSxyYW1wKHIpe3JldHVybiByfSxzYXcocil7cmV0dXJuIDEtcn0sc3F1YXJlKHIsdD0uNSl7cmV0dXJuIHI+PXQ/MDoxfSxjdXN0b20ocix0PVswLDFdKXtjb25zdCBzPXQubGVuZ3RoLTEsZT1NYXRoLmZsb29yKHIqcyksaT0xL3Msbj1TKHRbZV0sMCwxKSxvPVModFtlKzFdLDAsMSksYz1uLGg9MCxmPWk7cmV0dXJuKG8tYykvKGYtaCkqKHItaSplKStufSxzYXdibGVwKHIsdCl7cmV0dXJuIDIqci0xLW9lKHIsdCl9fSxoZT1PYmplY3Qua2V5cyh5dCk7Y2xhc3MgY2UgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiYmVnaW4iLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToidGltZSIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJlbmQiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToiZnJlcXVlbmN5IixkZWZhdWx0VmFsdWU6LjV9LHtuYW1lOiJza2V3IixkZWZhdWx0VmFsdWU6LjV9LHtuYW1lOiJkZXB0aCIsZGVmYXVsdFZhbHVlOjF9LHtuYW1lOiJwaGFzZW9mZnNldCIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJzaGFwZSIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJjdXJ2ZSIsZGVmYXVsdFZhbHVlOjF9LHtuYW1lOiJkY29mZnNldCIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJtaW4iLGRlZmF1bHRWYWx1ZTotMWU5fSx7bmFtZToibWF4IixkZWZhdWx0VmFsdWU6MWU5fV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMucGhhc2V9aW5jcmVtZW50UGhhc2UodCl7dGhpcy5waGFzZSs9dCx0aGlzLnBoYXNlPjEmJih0aGlzLnBoYXNlPXRoaXMucGhhc2UtMSl9cHJvY2Vzcyh0LHMsZSl7Y29uc3QgaT1lLmJlZ2luWzBdLG49ZS5lbmRbMF07aWYoY3VycmVudFRpbWU+PW4pcmV0dXJuITE7aWYoY3VycmVudFRpbWU8PWkpcmV0dXJuITA7Y29uc3QgYT1zWzBdLG89ZS5mcmVxdWVuY3lbMF0sYz1lLnRpbWVbMF0saD1lLmRlcHRoWzBdLGY9ZS5za2V3WzBdLHU9ZS5waGFzZW9mZnNldFswXSxkPWUuY3VydmVbMF0sbD1lLmRjb2Zmc2V0WzBdLHA9ZS5taW5bMF0sbT1lLm1heFswXSxJPWhlW2Uuc2hhcGVbMF1dLHc9YVswXS5sZW5ndGg/PzA7dGhpcy5waGFzZT09bnVsbCYmKHRoaXMucGhhc2U9SHQoYypvK3UpKTtjb25zdCB2PW8qRztmb3IobGV0IE09MDtNPHc7TSsrKXtmb3IobGV0IFA9MDtQPGEubGVuZ3RoO1ArKyl7bGV0IGc9KHl0W0ldKHRoaXMucGhhc2UsZikrbCkqaDtnPU1hdGgucG93KGcsZCksYVtQXVtNXT1TKGcscCxtKX10aGlzLmluY3JlbWVudFBoYXNlKHYpfXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigibGZvLXByb2Nlc3NvciIsY2UpO2NsYXNzIHVlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImNvYXJzZSIsZGVmYXVsdFZhbHVlOjF9XX1jb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5zdGFydGVkPSExfXByb2Nlc3ModCxzLGUpe2NvbnN0IGk9dFswXSxuPXNbMF0sYT1pWzBdIT09dm9pZCAwO2lmKHRoaXMuc3RhcnRlZCYmIWEpcmV0dXJuITE7dGhpcy5zdGFydGVkPWE7bGV0IG89ZS5jb2Fyc2VbMF0/PzA7bz1NYXRoLm1heCgxLG8pO2ZvcihsZXQgYz0wO2M8WTtjKyspZm9yKGxldCBoPTA7aDxpLmxlbmd0aDtoKyspbltoXVtjXT1jJW89PT0wP2lbaF1bY106bltoXVtjLTFdO3JldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigiY29hcnNlLXByb2Nlc3NvciIsdWUpO2NsYXNzIGxlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImNydXNoIixkZWZhdWx0VmFsdWU6MH1dfWNvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnN0YXJ0ZWQ9ITF9cHJvY2Vzcyh0LHMsZSl7Y29uc3QgaT10WzBdLG49c1swXSxhPWlbMF0hPT12b2lkIDA7aWYodGhpcy5zdGFydGVkJiYhYSlyZXR1cm4hMTt0aGlzLnN0YXJ0ZWQ9YTtsZXQgbz1lLmNydXNoWzBdPz84O289TWF0aC5tYXgoMSxvKTtmb3IobGV0IGM9MDtjPFk7YysrKWZvcihsZXQgaD0wO2g8aS5sZW5ndGg7aCsrKXtjb25zdCBmPU1hdGgucG93KDIsby0xKTtuW2hdW2NdPU1hdGgucm91bmQoaVtoXVtjXSpmKS9mfXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigiY3J1c2gtcHJvY2Vzc29yIixsZSk7Y2xhc3MgZmUgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToic2hhcGUiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToicG9zdGdhaW4iLGRlZmF1bHRWYWx1ZToxfV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuc3RhcnRlZD0hMX1wcm9jZXNzKHQscyxlKXtjb25zdCBpPXRbMF0sbj1zWzBdLGE9aVswXSE9PXZvaWQgMDtpZih0aGlzLnN0YXJ0ZWQmJiFhKXJldHVybiExO3RoaXMuc3RhcnRlZD1hO2xldCBvPWUuc2hhcGVbMF07bz1vPDE/bzouOTk5OTk5OTk5NixvPTIqby8oMS1vKTtjb25zdCBjPU1hdGgubWF4KC4wMDEsTWF0aC5taW4oMSxlLnBvc3RnYWluWzBdKSk7Zm9yKGxldCBoPTA7aDxZO2grKylmb3IobGV0IGY9MDtmPGkubGVuZ3RoO2YrKyluW2ZdW2hdPSgxK28pKmlbZl1baF0vKDErbypNYXRoLmFicyhpW2ZdW2hdKSkqYztyZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoInNoYXBlLXByb2Nlc3NvciIsZmUpO2NsYXNzICR0e2NvbnN0cnVjdG9yKCl7RHQodGhpcywiczAiLDApO0R0KHRoaXMsInMxIiwwKX11cGRhdGUodCxzLGU9MCl7ZT1TKGUsMCwxKSxzPVMocywwLHNhbXBsZVJhdGUvMi0xKTtjb25zdCBpPVMoMipNYXRoLnNpbihzKkQqRyksMCwxLjE0KSxhPTEtTWF0aC5wb3coLjUsOCplKzEpKmk7cmV0dXJuIHRoaXMuczA9YSp0aGlzLnMwLWkqdGhpcy5zMStpKnQsdGhpcy5zMT1hKnRoaXMuczEraSp0aGlzLnMwLHRoaXMuczF9fWNsYXNzIGRlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6InZhbHVlIixkZWZhdWx0VmFsdWU6LjV9XX1jb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5maWx0ZXJzPVtuZXcgJHQsbmV3ICR0XX1wcm9jZXNzKHQscyxlKXtjb25zdCBpPXRbMF0sbj1zWzBdLGE9aVswXSE9PXZvaWQgMDt0aGlzLnN0YXJ0ZWQ9YTtjb25zdCBvPVMoZS52YWx1ZVswXSwwLDEpO2xldCBjPSJub25lIixoLGY9MTtvPi41MT8oYz0iaGlwYXNzIixmPShvLS41KSoyKTpvPC40OSYmKGM9ImxvcGFzcyIsZj1vKjIpLGg9TWF0aC5wb3coZioxMSw0KTtmb3IobGV0IHU9MDt1PGkubGVuZ3RoO3UrKylmb3IobGV0IGQ9MDtkPFk7ZCsrKWM9PSJub25lIj9uW3VdW2RdPWlbdV1bZF06KHRoaXMuZmlsdGVyc1t1XS51cGRhdGUoaVt1XVtkXSxoLC4xKSxjPT09ImxvcGFzcyI/blt1XVtkXT10aGlzLmZpbHRlcnNbdV0uczE6Yz09PSJoaXBhc3MiP25bdV1bZF09aVt1XVtkXS10aGlzLmZpbHRlcnNbdV0uczE6blt1XVtkXT1pW3VdW2RdKTtyZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoImRqZi1wcm9jZXNzb3IiLGRlKTtjbGFzcyBwZSBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvcntzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJmcmVxdWVuY3kiLGRlZmF1bHRWYWx1ZTo1MDB9LHtuYW1lOiJxIixkZWZhdWx0VmFsdWU6MX0se25hbWU6ImRyaXZlIixkZWZhdWx0VmFsdWU6LjY5fV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuc3RhcnRlZD0hMSx0aGlzLnAwPVswLDBdLHRoaXMucDE9WzAsMF0sdGhpcy5wMj1bMCwwXSx0aGlzLnAzPVswLDBdLHRoaXMucDMyPVswLDBdLHRoaXMucDMzPVswLDBdLHRoaXMucDM0PVswLDBdfXByb2Nlc3ModCxzLGUpe2NvbnN0IGk9dFswXSxuPXNbMF0sYT1pWzBdIT09dm9pZCAwO2lmKHRoaXMuc3RhcnRlZCYmIWEpcmV0dXJuITE7dGhpcy5zdGFydGVkPWE7Y29uc3Qgbz1lLnFbMF0sYz1TKE1hdGguZXhwKGUuZHJpdmVbMF0pLC4xLDJlMyk7bGV0IGg9ZS5mcmVxdWVuY3lbMF07aD1oKnoqRyxoPWg+MT8xOmg7Y29uc3QgZj1NYXRoLm1pbig4LG8qLjEzKTtsZXQgdT0xL2MqTWF0aC5taW4oMS43NSwxK2YpO2ZvcihsZXQgZD0wO2Q8WTtkKyspZm9yKGxldCBsPTA7bDxpLmxlbmd0aDtsKyspe2NvbnN0IHA9dGhpcy5wM1tsXSouMzYwODkxK3RoaXMucDMyW2xdKi40MTcyOSt0aGlzLnAzM1tsXSouMTc3ODk2K3RoaXMucDM0W2xdKi4wNDM5NzI1O3RoaXMucDM0W2xdPXRoaXMucDMzW2xdLHRoaXMucDMzW2xdPXRoaXMucDMyW2xdLHRoaXMucDMyW2xdPXRoaXMucDNbbF0sdGhpcy5wMFtsXSs9KGooaVtsXVtkXSpjLWYqcCktaih0aGlzLnAwW2xdKSkqaCx0aGlzLnAxW2xdKz0oaih0aGlzLnAwW2xdKS1qKHRoaXMucDFbbF0pKSpoLHRoaXMucDJbbF0rPShqKHRoaXMucDFbbF0pLWoodGhpcy5wMltsXSkpKmgsdGhpcy5wM1tsXSs9KGoodGhpcy5wMltsXSktaih0aGlzLnAzW2xdKSkqaCxuW2xdW2RdPXAqdX1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoImxhZGRlci1wcm9jZXNzb3IiLHBlKTtjbGFzcyBtZSBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvcntzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJkaXN0b3J0IixkZWZhdWx0VmFsdWU6MH0se25hbWU6InBvc3RnYWluIixkZWZhdWx0VmFsdWU6MX1dfWNvbnN0cnVjdG9yKHtwcm9jZXNzb3JPcHRpb25zOnR9KXtzdXBlcigpLHRoaXMuc3RhcnRlZD0hMSx0aGlzLmFsZ29yaXRobT1ocyh0LmFsZ29yaXRobSl9cHJvY2Vzcyh0LHMsZSl7Y29uc3QgaT10WzBdLG49c1swXSxhPWlbMF0hPT12b2lkIDA7aWYodGhpcy5zdGFydGVkJiYhYSlyZXR1cm4hMTt0aGlzLnN0YXJ0ZWQ9YTtmb3IobGV0IG89MDtvPFk7bysrKXtjb25zdCBjPVMoYihlLnBvc3RnYWluLG8pLC4wMDEsMSksaD1NYXRoLmV4cG0xKGIoZS5kaXN0b3J0LG8pKTtmb3IobGV0IGY9MDtmPGkubGVuZ3RoO2YrKyl7Y29uc3QgdT1pW2ZdW29dO25bZl1bb109Yyp0aGlzLmFsZ29yaXRobSh1LGgpfX1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoImRpc3RvcnQtcHJvY2Vzc29yIixtZSk7Y2xhc3MgZ2UgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMucG9ydC5vbm1lc3NhZ2U9dD0+e2NvbnN0e3R5cGU6cyxwYXlsb2FkOmV9PXQuZGF0YXx8e307cz09PSJpbml0aWFsaXplIiYmdGhpcy5pbml0aWFsaXplKGUpfSx0aGlzLmluaXRpYWxpemUoKX1pbml0aWFsaXplKHQpe3RoaXMucGhhc2U9W119c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiYmVnaW4iLGRlZmF1bHRWYWx1ZTotMSxtYXg6TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLG1pbjotMX0se25hbWU6ImVuZCIsZGVmYXVsdFZhbHVlOi0xLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksbWluOi0xfSx7bmFtZToiZnJlcXVlbmN5IixkZWZhdWx0VmFsdWU6NDQwLG1pbjpOdW1iZXIuRVBTSUxPTn0se25hbWU6InBhbnNwcmVhZCIsZGVmYXVsdFZhbHVlOi40LG1pbjowLG1heDoxfSx7bmFtZToiZnJlcXNwcmVhZCIsZGVmYXVsdFZhbHVlOi4yLG1pbjowfSx7bmFtZToiZGV0dW5lIixkZWZhdWx0VmFsdWU6MCxtaW46MH0se25hbWU6InZvaWNlcyIsZGVmYXVsdFZhbHVlOjUsbWluOjEsYXV0b21hdGlvblJhdGU6ImstcmF0ZSJ9XX1wcm9jZXNzKHQscyxlKXtjb25zdCBpPWUuYmVnaW5bMF0sbj1lLmVuZFswXSxhPWk+PTAsbz1uPj0wLGM9byYmY3VycmVudFRpbWU+PW4rLjUsaD1vJiZjdXJyZW50VGltZT49bixmPWN1cnJlbnRUaW1lPD1pO2lmKGMpcmV0dXJuITE7aWYoaHx8Znx8IWEpcmV0dXJuITA7Y29uc3QgdT1zWzBdLGQ9ZS52b2ljZXNbMF07Zm9yKGxldCBsPTA7bDx1WzBdLmxlbmd0aDtsKyspe2NvbnN0IHA9YihlLmRldHVuZSxsKSxtPWIoZS5mcmVxc3ByZWFkLGwpLEk9YihlLnBhbnNwcmVhZCxsKSouNSsuNTtsZXQgdz1NYXRoLnNxcnQoMS1JKSx2PU1hdGguc3FydChJKSxNPWIoZS5mcmVxdWVuY3ksbCk7TT1ldChNLHAvMTAwKTtjb25zdCBQPVV0KGQsbSk7Zm9yKGxldCBnPTA7ZzxkO2crKyl7Y29uc3QgVD1ldChNLFAoZykpLEE9UShUKkcpO3RoaXMucGhhc2VbZ109dGhpcy5waGFzZVtnXT8/TWF0aC5yYW5kb20oKTtjb25zdCBWPXl0LnNhd2JsZXAodGhpcy5waGFzZVtnXSxBKTt1WzBdW2xdKz1WKncsdVsxXVtsXSs9Vip2O2xldCBPPXRoaXMucGhhc2VbZ10rQTtPPj0xJiYoTy09MSksdGhpcy5waGFzZVtnXT1PO2NvbnN0IE49dzt3PXYsdj1OfX1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoInN1cGVyc2F3LW9zY2lsbGF0b3IiLGdlKTtjb25zdCBiZT0yMDQ4LFB0PW5ldyBNYXA7ZnVuY3Rpb24gdmUocil7aWYoIVB0LmhhcyhyKSl7Y29uc3QgdD1uZXcgRmxvYXQzMkFycmF5KHIpO2ZvcihsZXQgcz0wO3M8cjtzKyspdFtzXT0uNSooMS1NYXRoLmNvcyh6KnMvcikpO1B0LnNldChyLHQpfXJldHVybiBQdC5nZXQocil9Y2xhc3MgSWUgZXh0ZW5kcyBYe3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6InBpdGNoRmFjdG9yIixkZWZhdWx0VmFsdWU6MX1dfWNvbnN0cnVjdG9yKHQpe3QucHJvY2Vzc29yT3B0aW9ucz17YmxvY2tTaXplOmJlfSxzdXBlcih0KSx0aGlzLnRpbWVDdXJzb3I9MCx0aGlzLmZmdFNpemU9dGhpcy5ibG9ja1NpemUsdGhpcy5pbnZmZnRTaXplPTEvdGhpcy5mZnRTaXplLHRoaXMuaGFubldpbmRvdz12ZSh0aGlzLmZmdFNpemUpLHRoaXMuZmZ0PW5ldyBRdCh0aGlzLmZmdFNpemUpLHRoaXMuZnJlcUNvbXBsZXhCdWZmZXI9dGhpcy5mZnQuY3JlYXRlQ29tcGxleEFycmF5KCksdGhpcy5mcmVxQ29tcGxleEJ1ZmZlclNoaWZ0ZWQ9dGhpcy5mZnQuY3JlYXRlQ29tcGxleEFycmF5KCksdGhpcy50aW1lQ29tcGxleEJ1ZmZlcj10aGlzLmZmdC5jcmVhdGVDb21wbGV4QXJyYXkoKSx0aGlzLm1hZ25pdHVkZXM9bmV3IEZsb2F0MzJBcnJheSh0aGlzLmZmdFNpemUvMisxKSx0aGlzLnBlYWtJbmRleGVzPW5ldyBJbnQzMkFycmF5KHRoaXMubWFnbml0dWRlcy5sZW5ndGgpLHRoaXMubmJQZWFrcz0wfXByb2Nlc3NPTEEodCxzLGUpe2xldCBpPWUucGl0Y2hGYWN0b3JbZS5waXRjaEZhY3Rvci5sZW5ndGgtMV07aTwwJiYoaT1pKi4yNSksaT1NYXRoLm1heCgwLGkrMSk7Zm9yKGxldCBuPTA7bjx0aGlzLm5iSW5wdXRzO24rKylmb3IobGV0IGE9MDthPHRbbl0ubGVuZ3RoO2ErKyl7Y29uc3Qgbz10W25dW2FdLGM9c1tuXVthXTt0aGlzLmFwcGx5SGFubldpbmRvdyhvKSx0aGlzLmZmdC5yZWFsVHJhbnNmb3JtKHRoaXMuZnJlcUNvbXBsZXhCdWZmZXIsbyksdGhpcy5jb21wdXRlTWFnbml0dWRlcygpLHRoaXMuZmluZFBlYWtzKCksdGhpcy5zaGlmdFBlYWtzKGkpLHRoaXMuZmZ0LmNvbXBsZXRlU3BlY3RydW0odGhpcy5mcmVxQ29tcGxleEJ1ZmZlclNoaWZ0ZWQpLHRoaXMuZmZ0LmludmVyc2VUcmFuc2Zvcm0odGhpcy50aW1lQ29tcGxleEJ1ZmZlcix0aGlzLmZyZXFDb21wbGV4QnVmZmVyU2hpZnRlZCksdGhpcy5mZnQuZnJvbUNvbXBsZXhBcnJheSh0aGlzLnRpbWVDb21wbGV4QnVmZmVyLGMpLHRoaXMuYXBwbHlIYW5uV2luZG93KGMpfXRoaXMudGltZUN1cnNvcis9dGhpcy5ob3BTaXplfWFwcGx5SGFubldpbmRvdyh0KXtmb3IobGV0IHM9MDtzPHRoaXMuYmxvY2tTaXplO3MrKyl0W3NdKj10aGlzLmhhbm5XaW5kb3dbc10qMS42Mn1jb21wdXRlTWFnbml0dWRlcygpe2xldCB0PTAscz0wO2Zvcig7dDx0aGlzLm1hZ25pdHVkZXMubGVuZ3RoOyl7Y29uc3QgZT10aGlzLmZyZXFDb21wbGV4QnVmZmVyW3NdLGk9dGhpcy5mcmVxQ29tcGxleEJ1ZmZlcltzKzFdO3RoaXMubWFnbml0dWRlc1t0XT1lKioyK2kqKjIsdCs9MSxzKz0yfX1maW5kUGVha3MoKXt0aGlzLm5iUGVha3M9MDtsZXQgdD0yO2NvbnN0IHM9dGhpcy5tYWduaXR1ZGVzLmxlbmd0aC0yO2Zvcig7dDxzOyl7Y29uc3QgZT10aGlzLm1hZ25pdHVkZXNbdF07aWYodGhpcy5tYWduaXR1ZGVzW3QtMV0+PWV8fHRoaXMubWFnbml0dWRlc1t0LTJdPj1lKXt0Kys7Y29udGludWV9aWYodGhpcy5tYWduaXR1ZGVzW3QrMV0+PWV8fHRoaXMubWFnbml0dWRlc1t0KzJdPj1lKXt0Kys7Y29udGludWV9dGhpcy5wZWFrSW5kZXhlc1t0aGlzLm5iUGVha3NdPXQsdGhpcy5uYlBlYWtzKyssdCs9Mn19c2hpZnRQZWFrcyh0KXt0aGlzLmZyZXFDb21wbGV4QnVmZmVyU2hpZnRlZC5maWxsKDApO2ZvcihsZXQgcz0wO3M8dGhpcy5uYlBlYWtzO3MrKyl7Y29uc3QgZT10aGlzLnBlYWtJbmRleGVzW3NdLGk9c3QoZSp0KTtpZihpPnRoaXMubWFnbml0dWRlcy5sZW5ndGgpYnJlYWs7bGV0IG49MCxhPXRoaXMuZmZ0U2l6ZTtzPjAmJihuPWUtc3QoKGUtdGhpcy5wZWFrSW5kZXhlc1tzLTFdKS8yKSksczx0aGlzLm5iUGVha3MtMSYmKGE9ZSthZSgodGhpcy5wZWFrSW5kZXhlc1tzKzFdLWUpLzIpKTtjb25zdCBvPW4tZSxjPWEtZSxoPXoqdGhpcy5pbnZmZnRTaXplKihpLWUpLGY9TWF0aC5jb3MoaCp0aGlzLnRpbWVDdXJzb3IpLHU9TWF0aC5zaW4oaCp0aGlzLnRpbWVDdXJzb3IpO2ZvcihsZXQgZD1vO2Q8YztkKyspe2NvbnN0IGw9ZStkLHA9aStkO2lmKHA+PXRoaXMubWFnbml0dWRlcy5sZW5ndGgpYnJlYWs7Y29uc3QgbT0yKmwsST1tKzEsdz10aGlzLmZyZXFDb21wbGV4QnVmZmVyW21dLHY9dGhpcy5mcmVxQ29tcGxleEJ1ZmZlcltJXSxNPXcqZi12KnUsUD13KnUrdipmLGc9MipwLFQ9ZysxO3RoaXMuZnJlcUNvbXBsZXhCdWZmZXJTaGlmdGVkW2ddKz1NLHRoaXMuZnJlcUNvbXBsZXhCdWZmZXJTaGlmdGVkW1RdKz1QfX19fXJlZ2lzdGVyUHJvY2Vzc29yKCJwaGFzZS12b2NvZGVyLXByb2Nlc3NvciIsSWUpO2NsYXNzIHdlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnBoaT0tRCx0aGlzLlkwPTAsdGhpcy5ZMT0wLHRoaXMuUFc9RCx0aGlzLkI9Mi4zLHRoaXMuZHBoaWY9MCx0aGlzLmVudmY9MH1zdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJiZWdpbiIsZGVmYXVsdFZhbHVlOjAsbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWSxtaW46MH0se25hbWU6ImVuZCIsZGVmYXVsdFZhbHVlOjAsbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWSxtaW46MH0se25hbWU6ImZyZXF1ZW5jeSIsZGVmYXVsdFZhbHVlOjQ0MCxtaW46TnVtYmVyLkVQU0lMT059LHtuYW1lOiJkZXR1bmUiLGRlZmF1bHRWYWx1ZTowLG1pbjpOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFksbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWX0se25hbWU6InB1bHNld2lkdGgiLGRlZmF1bHRWYWx1ZToxLG1pbjowLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFl9XX1wcm9jZXNzKHQscyxlKXtpZih0aGlzLmRpc2Nvbm5lY3RlZClyZXR1cm4hMTtpZihjdXJyZW50VGltZTw9ZS5iZWdpblswXSlyZXR1cm4hMDtpZihjdXJyZW50VGltZT49ZS5lbmRbMF0pcmV0dXJuITE7Y29uc3QgaT1zWzBdO2xldCBuPTEsYTtmb3IobGV0IG89MDtvPChpWzBdLmxlbmd0aD8/MCk7bysrKXtjb25zdCBjPSgxLVMoYihlLnB1bHNld2lkdGgsbyksLS45OSwuOTkpKSpELGg9YihlLmRldHVuZSxvKSxmPWV0KGIoZS5mcmVxdWVuY3ksbyksaC8xMDApO2E9Zip6KkcsdGhpcy5kcGhpZis9LjEqKGEtdGhpcy5kcGhpZiksbio9Ljk5OTgsdGhpcy5lbnZmKz0uMSoobi10aGlzLmVudmYpLHRoaXMuQj0yLjMqKDEtMWUtNCpmKSx0aGlzLkI8MCYmKHRoaXMuQj0wKSx0aGlzLnBoaSs9dGhpcy5kcGhpZix0aGlzLnBoaT49RCYmKHRoaXMucGhpLT16KTtsZXQgdT1NYXRoLmNvcyh0aGlzLnBoaSt0aGlzLkIqdGhpcy5ZMCk7dGhpcy5ZMD0uNSoodSt0aGlzLlkwKTtsZXQgZD1NYXRoLmNvcyh0aGlzLnBoaSt0aGlzLkIqdGhpcy5ZMStjKTt0aGlzLlkxPS41KihkK3RoaXMuWTEpO2ZvcihsZXQgbD0wO2w8aS5sZW5ndGg7bCsrKWlbbF1bb109LjE1Kih1LWQpKnRoaXMuZW52Zn1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoInB1bHNlLW9zY2lsbGF0b3IiLHdlKTtjb25zdCBUdD17Yml0QzpmdW5jdGlvbihyLHQscyl7cmV0dXJuIHImdD9zOjB9LGJyOmZ1bmN0aW9uKHIsdD04KXtpZih0PjMyKXRocm93IG5ldyBFcnJvcigiYnIoKSBTaXplIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gMzIiKTtsZXQgcz0wO2ZvcihsZXQgZT0wO2U8dDtlKyspc3w9VHQuYml0QyhyLDE8PGUsMTw8dC0oZSsxKSk7cmV0dXJuIHN9LHNpbmY6ZnVuY3Rpb24ocil7cmV0dXJuIE1hdGguc2luKHIqRC8xMjgpfSxjb3NmOmZ1bmN0aW9uKHIpe3JldHVybiBNYXRoLmNvcyhyKkQvMTI4KX0sdGFuZjpmdW5jdGlvbihyKXtyZXR1cm4gTWF0aC50YW4ocipELzEyOCl9LHJlZ0c6ZnVuY3Rpb24ocix0KXtyZXR1cm4gdC50ZXN0KHIudG9TdHJpbmcoMikpfX07bGV0IGx0LEJ0O2Z1bmN0aW9uIFNlKHIpe2lmKGx0PT1udWxsKXtsdD1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhNYXRoKSxCdD1sdC5tYXAoZT0+TWF0aFtlXSk7Y29uc3QgdD1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhUdCkscz10Lm1hcChlPT5UdFtlXSk7bHQucHVzaCgiaW50Iiwid2luZG93IiwuLi50KSxCdC5wdXNoKE1hdGguZmxvb3IsZ2xvYmFsVGhpcywuLi5zKX1yZXR1cm4gbmV3IEZ1bmN0aW9uKC4uLmx0LCJ0IixgcmV0dXJuIDAsCiR7cnx8MH07YCkuYmluZChnbG9iYWxUaGlzLC4uLkJ0KX1jbGFzcyBfZSBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3Nvcntjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5wb3J0Lm9ubWVzc2FnZT10PT57bGV0e2NvZGVUZXh0OnN9PXQuZGF0YTtjb25zdHtieXRlQmVhdFN0YXJ0VGltZTplfT10LmRhdGE7ZSE9bnVsbCYmKHRoaXMudD0wLHRoaXMuaW5pdGlhbE9mZnNldD1NYXRoLmZsb29yKGUpKSxzPXMudHJpbSgpLnJlcGxhY2UoL15ldmFsXCh1bmVzY2FwZVwoZXNjYXBlKD86YHxcKCd8XCgifFwoYCkoLio/KSg/OmB8J1wpfCJcKXxgXCkpLnJlcGxhY2VcKFwvdVwoXC5cLlwpXC9nLFsiJ2BdXCQxJVsiJ2BdXClcKVwpJC8sKGksbik9PnVuZXNjYXBlKGVzY2FwZShuKS5yZXBsYWNlKC91KC4uKS9nLCIkMSUiKSkpLHRoaXMuZnVuYz1TZShzKX0sdGhpcy5pbml0aWFsT2Zmc2V0PTAsdGhpcy50PW51bGwsdGhpcy5mdW5jPW51bGx9c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiYmVnaW4iLGRlZmF1bHRWYWx1ZTowLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksbWluOjB9LHtuYW1lOiJmcmVxdWVuY3kiLGRlZmF1bHRWYWx1ZTo0NDAsbWluOk51bWJlci5FUFNJTE9OfSx7bmFtZToiZGV0dW5lIixkZWZhdWx0VmFsdWU6MCxtaW46TnVtYmVyLk5FR0FUSVZFX0lORklOSVRZLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFl9LHtuYW1lOiJlbmQiLGRlZmF1bHRWYWx1ZTowLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksbWluOjB9XX1wcm9jZXNzKHQscyxlKXtpZih0aGlzLmRpc2Nvbm5lY3RlZClyZXR1cm4hMTtpZihjdXJyZW50VGltZTw9ZS5iZWdpblswXSlyZXR1cm4hMDtpZihjdXJyZW50VGltZT49ZS5lbmRbMF0pcmV0dXJuITE7dGhpcy50PT1udWxsJiYodGhpcy50PWUuYmVnaW5bMF0qc2FtcGxlUmF0ZSk7Y29uc3QgaT1zWzBdLG49MjU2Kkc7Zm9yKGxldCBhPTA7YTxpWzBdLmxlbmd0aDthKyspe2NvbnN0IG89YihlLmRldHVuZSxhKSxjPWV0KGIoZS5mcmVxdWVuY3ksYSksby8xMDApLGg9bipjKnRoaXMudCt0aGlzLmluaXRpYWxPZmZzZXQsdT0odGhpcy5mdW5jKGgpJjI1NSkvMTI3LjUtMSxkPVModSouMiwtLjQsLjQpO2ZvcihsZXQgbD0wO2w8aS5sZW5ndGg7bCsrKWlbbF1bYV09ZDt0aGlzLnQrK31yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoImJ5dGUtYmVhdC1wcm9jZXNzb3IiLF9lKTtjbGFzcyBNZSBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvcntzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJiZWdpbiIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJlbmQiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToiYXR0YWNrIixkZWZhdWx0VmFsdWU6LjAwNSxtaW5WYWx1ZTowfSx7bmFtZToiZGVjYXkiLGRlZmF1bHRWYWx1ZTouMTQsbWluVmFsdWU6MH0se25hbWU6InN1c3RhaW4iLGRlZmF1bHRWYWx1ZTowLG1pblZhbHVlOjAsbWF4VmFsdWU6MX0se25hbWU6InJlbGVhc2UiLGRlZmF1bHRWYWx1ZTouMSxtaW5WYWx1ZTowfSx7bmFtZToiYXR0YWNrQ3VydmUiLGRlZmF1bHRWYWx1ZTowLG1pblZhbHVlOi0xLG1heFZhbHVlOjF9LHtuYW1lOiJkZWNheUN1cnZlIixkZWZhdWx0VmFsdWU6MCxtaW5WYWx1ZTotMSxtYXhWYWx1ZToxfSx7bmFtZToicmVsZWFzZUN1cnZlIixkZWZhdWx0VmFsdWU6MCxtaW5WYWx1ZTotMSxtYXhWYWx1ZToxfSx7bmFtZToiZGVwdGgiLGRlZmF1bHRWYWx1ZToxfSx7bmFtZToibWluIixkZWZhdWx0VmFsdWU6LTFlOX0se25hbWU6Im1heCIsZGVmYXVsdFZhbHVlOjFlOX0se25hbWU6InJldHJpZ2dlciIsZGVmYXVsdFZhbHVlOjEsbWluVmFsdWU6MCxtYXhWYWx1ZToxfV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMudmFsPTAsdGhpcy5zZWdJZHg9MCx0aGlzLnN0YXRlPTAsdGhpcy5iZWdpblRpbWU9MCx0aGlzLmVuZFRpbWU9MCx0aGlzLmF0dGFja1N0YXJ0PTB9X3dhcnAodCxzLGU9OCl7aWYodD09PTB8fHQ9PT0xKXJldHVybiB0O2lmKHM+MCl7Y29uc3QgaT0xK2UqcztyZXR1cm4gMS1NYXRoLnBvdygxLXQsaSl9ZWxzZXtjb25zdCBpPTEtZSpzO3JldHVybiBNYXRoLnBvdyh0LGkpfX1fYWR2YW5jZSh0LHMsZSxpKXtpZihlPT09MHx8dD09PXMpdGhpcy52YWw9cztlbHNle2NvbnN0IG49TWF0aC5taW4oMSwoY3VycmVudFRpbWUtdGhpcy5iZWdpblRpbWUpL2UpLGE9dGhpcy5fd2FycChuLGkpO3RoaXMudmFsPXQrKHMtdCkqYX19cHJvY2Vzcyh0LHMsZSl7Y29uc3QgaT1lLmJlZ2luWzBdLG49ZS5lbmRbMF07aWYoY3VycmVudFRpbWU+PW4pcmV0dXJuITE7aWYoY3VycmVudFRpbWU8PWkpcmV0dXJuITA7Y29uc3QgYT1zWzBdWzBdLG89YihlLnJldHJpZ2dlciwwKT49LjU7aSE9PXRoaXMuYmVnaW5UaW1lJiYodGhpcy5zdGF0ZT09PTB8fG8pJiYodGhpcy5iZWdpblRpbWU9aSx0aGlzLnN0YXRlPTEsdGhpcy5lbmRUaW1lPWIoZS5lbmQsMCksdGhpcy5hdHRhY2tTdGFydD10aGlzLnZhbCk7Y29uc3QgYz10aGlzLmVuZFRpbWUtdGhpcy5iZWdpblRpbWU7Zm9yKGxldCBoPTA7aDxhLmxlbmd0aDtoKyspe2NvbnN0IGY9YihlLmF0dGFjayxoKSx1PWIoZS5kZWNheSxoKSxkPWIoZS5zdXN0YWluLGgpLGw9YihlLnJlbGVhc2UsaCkscD1iKGUuYXR0YWNrQ3VydmUsaCksbT1iKGUuZGVjYXlDdXJ2ZSxoKSxJPWIoZS5yZWxlYXNlQ3VydmUsaCksdz1iKGUuZGVwdGgsaCksdj1iKGUubWluLGgpLE09YihlLm1heCxoKSxQPVt7dGltZTpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksc3RhcnQ6MCx0YXJnZXQ6MH0se3RpbWU6ZixzdGFydDp0aGlzLmF0dGFja1N0YXJ0LHRhcmdldDoxLGN1cnZlOnB9LHt0aW1lOmYrdSxzdGFydDoxLHRhcmdldDpkLGN1cnZlOm19LHt0aW1lOmMsc3RhcnQ6ZCx0YXJnZXQ6ZH0se3RpbWU6YytsLHN0YXJ0OmQsdGFyZ2V0OjAsY3VydmU6SX1dO2xldHt0aW1lOmcsc3RhcnQ6VCx0YXJnZXQ6QSxjdXJ2ZTpWfT1QW3RoaXMuc3RhdGVdO2Zvcih0aGlzLl9hZHZhbmNlKFQsQSxnLFYpO2N1cnJlbnRUaW1lLXRoaXMuYmVnaW5UaW1lPj1nOyl0aGlzLnN0YXRlPSh0aGlzLnN0YXRlKzEpJVAubGVuZ3RoLGc9UFt0aGlzLnN0YXRlXS50aW1lO2FbaF09Uyh0aGlzLnZhbCp3LHYsTSl9cmV0dXJuITB9fXJlZ2lzdGVyUHJvY2Vzc29yKCJlbnZlbG9wZS1wcm9jZXNzb3IiLE1lKTtjb25zdCB4PU9iamVjdC5mcmVlemUoe05PTkU6MCxBU1lNOjEsTUlSUk9SOjIsQkVORFA6MyxCRU5ETTo0LEJFTkRNUDo1LFNZTkM6NixRVUFOVDo3LEZPTEQ6OCxQV006OSxPUkJJVDoxMCxTUElOOjExLENIQU9TOjEyLFBSSU1FUzoxMyxCSU5BUlk6MTQsQlJPV05JQU46MTUsUkVDSVBST0NBTDoxNixXT1JNSE9MRToxNyxMT0dJU1RJQzoxOCxTSUdNT0lEOjE5LEZSQUNUQUw6MjAsRkxJUDoyMX0pO2Z1bmN0aW9uIHhlKHIpe3JldHVybiByPXIrMjEyNzkxMjIxNCsocjw8MTIpLHI9cl4zMzQ1MDcyNzAwXnI+Pj4xOSxyPXIrMzc0NzYxMzkzKyhyPDw1KSxyPXIrMzU1MDYzNTExNl5yPDw5LHI9cis0MjUxOTkzNzk3KyhyPDwzKSxyPXJeMzA0MjU5NDU2OV5yPj4+MTYscj4+PjB9Y29uc3QgS3Q9cj0+KHhlKHIpPj4+OCkvMTY3NzcyMTY7ZnVuY3Rpb24geWUocix0KXtsZXQgcz0wO2ZvcihsZXQgZT0wO2U8dDtlKyspcz1zPDwxfHImMSxyPj4+PTE7cmV0dXJuIHN9ZnVuY3Rpb24gUGUocil7Y29uc3QgdD1NYXRoLmZsb29yKHIpLHM9ci10LGU9S3QodCksaT1LdCh0KzEpO3JldHVybiBlKyhpLWUpKnN9ZnVuY3Rpb24gVGUocix0PTQpe2xldCBzPS41LGU9MCxpPTAsbj0xO2ZvcihsZXQgYT0wO2E8dDthKyspZSs9cypQZShyKm4pLGkrPXMscyo9LjUsbio9MjtyZXR1cm4gZS9pKjItMX1jb25zdCBWdD17fTtjbGFzcyBCZSBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvcntzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJiZWdpbiIsZGVmYXVsdFZhbHVlOi0xLG1pbjotMSxtYXg6TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZfSx7bmFtZToiZW5kIixkZWZhdWx0VmFsdWU6LTEsbWluOi0xLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFl9LHtuYW1lOiJmcmVxdWVuY3kiLGRlZmF1bHRWYWx1ZTo0NDAsbWluOk51bWJlci5FUFNJTE9OfSx7bmFtZToiZGV0dW5lIixkZWZhdWx0VmFsdWU6MH0se25hbWU6ImZyZXFzcHJlYWQiLGRlZmF1bHRWYWx1ZTouMTgsbWluOjB9LHtuYW1lOiJwb3NpdGlvbiIsZGVmYXVsdFZhbHVlOjAsbWluOjAsbWF4OjF9LHtuYW1lOiJ3YXJwIixkZWZhdWx0VmFsdWU6MCxtaW46MCxtYXg6MX0se25hbWU6IndhcnBNb2RlIixkZWZhdWx0VmFsdWU6MH0se25hbWU6InZvaWNlcyIsZGVmYXVsdFZhbHVlOjEsbWluOjEsYXV0b21hdGlvblJhdGU6ImstcmF0ZSJ9LHtuYW1lOiJwYW5zcHJlYWQiLGRlZmF1bHRWYWx1ZTouNyxtaW46MCxtYXg6MX0se25hbWU6InBoYXNlcmFuZCIsZGVmYXVsdFZhbHVlOjAsbWluOjAsbWF4OjF9XX1jb25zdHJ1Y3Rvcih0KXtzdXBlcih0KSx0aGlzLnBvcnQub25tZXNzYWdlPXM9Pntjb25zdHt0eXBlOmUscGF5bG9hZDppfT1zLmRhdGF8fHt9O2U9PT0iaW5pdGlhbGl6ZSImJnRoaXMuaW5pdGlhbGl6ZShpKX0sdGhpcy5pbml0aWFsaXplKCl9aW5pdGlhbGl6ZSh0KXtpZih0aGlzLnRhYmxlPW51bGwsdGhpcy5mcmFtZUxlbj1udWxsLHRoaXMubnVtRnJhbWVzPW51bGwsdGhpcy5waGFzZT1bXSx0IT1udWxsJiZ0LmtleSl7Y29uc3Qgcz10LmtleTt0aGlzLmZyYW1lTGVuPXQuZnJhbWVMZW4sVnRbc118fChWdFtzXT10LmZyYW1lcyksdGhpcy50YWJsZT1WdFtzXSx0aGlzLm51bUZyYW1lcz10aGlzLnRhYmxlLmxlbmd0aH19X21pcnJvcih0KXtyZXR1cm4gMS1NYXRoLmFicygyKnQtMSl9X3RvQml0cyh0LHM9MixlPTEyKXtjb25zdCBpPWUrKHMtZSkqdDtyZXR1cm57YjppLG46c3QoTWF0aC5wb3coMixpKSl9fV93YXJwUGhhc2UodCxzLGUpe3N3aXRjaChlKXtjYXNlIHguTk9ORTpyZXR1cm4gdDtjYXNlIHguQVNZTTp7Y29uc3QgaT0uMDErLjk5KnM7cmV0dXJuIHQ8aT8uNSp0L2k6LjUrLjUqKHQtaSkvKDEtaSl9Y2FzZSB4Lk1JUlJPUjpyZXR1cm4gdGhpcy5fbWlycm9yKHRoaXMuX3dhcnBQaGFzZSh0LHMseC5BU1lNKSk7Y2FzZSB4LkJFTkRQOnJldHVybiBNYXRoLnBvdyh0LDErMypzKTtjYXNlIHguQkVORE06cmV0dXJuIE1hdGgucG93KHQsMS8oMSszKnMpKTtjYXNlIHguQkVORE1QOnJldHVybiBzPC41P3RoaXMuX3dhcnBQaGFzZSh0LDEtMipzLDMpOnRoaXMuX3dhcnBQaGFzZSh0LDIqcy0xLDIpO2Nhc2UgeC5TWU5DOntjb25zdCBpPU1hdGgucG93KDE2LHMqKjIpO3JldHVybiB0KmklMX1jYXNlIHguUVVBTlQ6e2NvbnN0e246aX09dGhpcy5fdG9CaXRzKHMpO3JldHVybiB0dCh0KmkpL2l9Y2FzZSB4LkZPTEQ6e2NvbnN0IG49MStNYXRoLm1heCgxLHN0KDcqcykpO3JldHVybiBNYXRoLmFicyhIdChuKnQpLS41KSoyfWNhc2UgeC5QV006e2NvbnN0IGk9UyguNSsuNDkqKDIqcy0xKSwwLDEpO3JldHVybiB0PGk/dC9pKi41Oi41Kyh0LWkpLygxLWkpKi41fWNhc2UgeC5PUkJJVDp7Y29uc3QgaT0uNSpzO3JldHVybiBRKHQraSpNYXRoLnNpbih6KjMqdCkpfWNhc2UgeC5TUElOOntjb25zdCBpPS41KnMse259PXRoaXMuX3RvQml0cyhzLDEsNik7cmV0dXJuIFEodCtpKk1hdGguc2luKHoqbip0KSl9Y2FzZSB4LkNIQU9TOntjb25zdCBuPSgzLjcrLjMqcykqdCooMS10KTtyZXR1cm4gUygoMS1zKSp0K3MqbiwwLDEpfWNhc2UgeC5QUklNRVM6e2NvbnN0IGk9YT0+e2lmKGE8MilyZXR1cm4hMTtpZihhJTI9PT0wKXJldHVybiBhPT09Mjtmb3IobGV0IG89MztvKioyPD1hO28rPTIpaWYoYSVvPT09MClyZXR1cm4hMTtyZXR1cm4hMH07bGV0e259PXRoaXMuX3RvQml0cyhzLDMpO2Zvcig7IWkobik7KW4rKztyZXR1cm4gdHQodCpuKS9ufWNhc2UgeC5CSU5BUlk6e2xldHtiOml9PXRoaXMuX3RvQml0cyhzLDMpO2k9c3QoaSk7Y29uc3Qgbj0xPDxpLGE9dHQodCpuKTtyZXR1cm4geWUoYSxpKS9ufWNhc2UgeC5CUk9XTklBTjp7Y29uc3QgaT0uMjUqcypUZSg2NCp0LDQpO3JldHVybiBRKHQraSl9Y2FzZSB4LlJFQ0lQUk9DQUw6e2NvbnN0IGk9Mis0KnMsbj10KmksYT10KygxLXQpKmksbz1hPjFlLTEyP24vYTowO3JldHVybiBTKG8sMCwxKX1jYXNlIHguV09STUhPTEU6e2NvbnN0IGk9UyguOCpzLDAsMSksbj0uNSooMS1pKSxhPS41KigxK2kpO3JldHVybiB0PG4/dC9uKi41OnQ+YT8uNSooMSsodC1hKS8oMS1hKSk6LjV9Y2FzZSB4LkxPR0lTVElDOntsZXQgaT10O2NvbnN0IG49My42Ky40KnMsYT0xK3N0KDIqcyk7Zm9yKGxldCBvPTA7bzxhO28rKylpPW4qaSooMS1pKTtyZXR1cm4gUyhpLDAsMSl9Y2FzZSB4LlNJR01PSUQ6e2NvbnN0IGk9MSsxMCpzLG49dC0uNSxhPTEvKDErTWF0aC5leHAoLWkqbikpLG89MS8oMStNYXRoLmV4cCguNSppKSksYz0xLygxK01hdGguZXhwKC0uNSppKSk7cmV0dXJuKGEtbykvKGMtbyl9Y2FzZSB4LkZSQUNUQUw6e2NvbnN0IGk9LjUqTWF0aC5zaW4oeip0KSpzO3JldHVybiBRKHQraSl9Y2FzZSB4LkZMSVA6cmV0dXJuIHQ7ZGVmYXVsdDpyZXR1cm4gdH19X3NhbXBsZUZyYW1lKHQscyl7Y29uc3QgZT10Lmxlbmd0aCxpPXMqZTtsZXQgbj1pfDA7bj49ZSYmKG49MCk7Y29uc3QgYT1pLW4sbz10W25dO2xldCBjPW4rMTtjPj1lJiYoYz0wKTtjb25zdCBoPXRbY107cmV0dXJuIG8rKGgtbykqYX1wcm9jZXNzKHQscyxlKXtjb25zdCBpPWUuYmVnaW5bMF0sbj1lLmVuZFswXSxhPWk+PTAsbz1uPj0wLGM9byYmY3VycmVudFRpbWU+PW4rLjUsaD1vJiZjdXJyZW50VGltZT49bixmPWN1cnJlbnRUaW1lPD1pO2lmKGMpcmV0dXJuITE7aWYoaHx8Znx8IWEpcmV0dXJuITA7Y29uc3QgdT1zWzBdWzBdLGQ9c1swXVsxXXx8c1swXVswXTtpZighdGhpcy50YWJsZSlyZXR1cm4gdS5maWxsKDApLGQhPT11JiZkLnNldCh1KSwhMDtjb25zdCBsPWUudm9pY2VzWzBdO2ZvcihsZXQgcD0wO3A8dS5sZW5ndGg7cCsrKXtjb25zdCBtPWIoZS5kZXR1bmUscCksST1iKGUuZnJlcXNwcmVhZCxwKSx2PVMoYihlLnBvc2l0aW9uLHApLDAsMSkqKHRoaXMubnVtRnJhbWVzLTEpLE09dnwwLFA9di1NLGc9UyhiKGUud2FycCxwKSwwLDEpLFQ9YihlLndhcnBNb2RlLHApLEE9UyhiKGUucGhhc2VyYW5kLHApLDAsMSksVj1sPjE/UyhiKGUucGFuc3ByZWFkLHApLDAsMSk6MCxPPU1hdGguc3FydCguNS0uNSpWKSxOPU1hdGguc3FydCguNSsuNSpWKTtsZXQgQz1iKGUuZnJlcXVlbmN5LHApO0M9ZXQoQyxtLzEwMCk7Y29uc3QgRj0xL01hdGguc3FydChsKSxxPVV0KGwsSSk7Zm9yKGxldCBCPTA7QjxsO0IrKyl7Y29uc3QgTD0oQiYxKT09MTtsZXQgRT1PLEg9TjtMJiYoRT1OLEg9Tyk7Y29uc3QgJD1ldChDLHEoQikpKkc7dGhpcy5waGFzZVtCXT10aGlzLnBoYXNlW0JdPz9NYXRoLnJhbmRvbSgpKkE7Y29uc3QgVT10aGlzLl93YXJwUGhhc2UodGhpcy5waGFzZVtCXSxnLFQpLEs9dGhpcy5fc2FtcGxlRnJhbWUodGhpcy50YWJsZVtNXSxVKSxaPXRoaXMuX3NhbXBsZUZyYW1lKHRoaXMudGFibGVbTWF0aC5taW4odGhpcy5udW1GcmFtZXMtMSxNKzEpXSxVKTtsZXQgaz11dChLLFosUCk7VD09PXguRkxJUCYmdGhpcy5waGFzZVtCXTxnJiYoaz0tayksdVtwXSs9aypFKkYsZFtwXSs9aypIKkYsdGhpcy5waGFzZVtCXT1RKHRoaXMucGhhc2VbQl0rJCl9fXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3Nvcigid2F2ZXRhYmxlLW9zY2lsbGF0b3ItcHJvY2Vzc29yIixCZSk7Y2xhc3MgVmUgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVybltdfWNvbnN0cnVjdG9yKHQpe3N1cGVyKCksdGhpcy5nYWluQ29lZmY9eHQoLjIpLHRoaXMuYXZnR2Fpbj0xO2xldHthdHRhY2tUaW1lOnM9LjAwMyxzdXN0YWluVGltZTplPS4wOCxhdHRhY2s6aT0wLHN1c3RhaW46bj0wLHNlbnNpdGl2aXR5OmE9LjEsbWl4Om89MSxiZWdpbjpjPTAsZW5kOmg9MH09dC5wcm9jZXNzb3JPcHRpb25zO3M9UyhzLDVlLTQsLjA1KSxlPVMoZSwuMDEsLjUpLHRoaXMuYXR0YWNrQ29lZmY9eHQocyksdGhpcy5zdXN0YWluQ29lZmY9eHQoZSksdGhpcy5hdHRhY2tBbXQ9UyhpLC0xLDEpLHRoaXMuc3VzdGFpbkFtdD1TKG4sLTEsMSksdGhpcy5zY2FsaW5nPS41KzUqUyhhLDAsMSksdGhpcy5taXg9UyhvLDAsMSksdGhpcy5iZWdpbj1jLHRoaXMuZW5kPWgsdGhpcy5hdHRhY2tFbnY9bmV3IEZsb2F0MzJBcnJheSgyKSx0aGlzLnN1c3RhaW5FbnY9bmV3IEZsb2F0MzJBcnJheSgyKX1wcm9jZXNzKHQscyxlKXtjb25zdCBpPXRbMF0sbj1zWzBdO2lmKGN1cnJlbnRUaW1lPj10aGlzLmVuZClyZXR1cm4hMTtpZihjdXJyZW50VGltZTw9dGhpcy5iZWdpbilyZXR1cm4hMDtjb25zdCBhPWkubGVuZ3RoO2E+dGhpcy5hdHRhY2tFbnYubGVuZ3RoJiYodGhpcy5hdHRhY2tFbnY9bmV3IEZsb2F0MzJBcnJheShhKSx0aGlzLnN1c3RhaW5FbnY9bmV3IEZsb2F0MzJBcnJheShhKSk7bGV0IG89dGhpcy5hdmdHYWluO2ZvcihsZXQgYz0wO2M8YTtjKyspe2xldCBoPXRoaXMuYXR0YWNrRW52W2NdLGY9dGhpcy5zdXN0YWluRW52W2NdO2ZvcihsZXQgdT0wO3U8WTt1Kyspe2NvbnN0IGQ9aVtjXVt1XSxsPU1hdGguYWJzKGQpO2g9dXQoaCxsLHRoaXMuYXR0YWNrQ29lZmYpLGY9dXQoZixsLHRoaXMuc3VzdGFpbkNvZWZmKTtjb25zdCBwPVModGhpcy5zY2FsaW5nKihoLWYpLyhmKzFlLTYpLC0xLjUsMS41KSxtPXA+MD9wOjAsST1wPDA/LXA6MCx3PWp0KHRoaXMuYXR0YWNrQW10Km0qMTgpLHY9anQodGhpcy5zdXN0YWluQW10KkkqMzYpLE09Uyh3KnYsMCw4KTtvPXV0KG8sTSx0aGlzLmdhaW5Db2VmZik7Y29uc3QgUD1vPi4wMDE/MS9vOjEsZz1kKk0qUDtsZXQgVD11dChkLGcsdGhpcy5taXgpO1QvPTErTWF0aC5hYnMoVCksbltjXVt1XT1UfXRoaXMuYXR0YWNrRW52W2NdPWgsdGhpcy5zdXN0YWluRW52W2NdPWZ9cmV0dXJuIHRoaXMuYXZnR2Fpbj1vLCEwfX1yZWdpc3RlclByb2Nlc3NvcigidHJhbnNpZW50LXByb2Nlc3NvciIsVmUpO2NsYXNzIEFlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnBsYXlQb3M9MDtjb25zdCB0PTE2O3RoaXMub3V0cHV0cz1uZXcgQXJyYXkodCkuZmlsbCgwKSx0aGlzLnNvdXJjZXM9bmV3IEFycmF5KHQpLmZpbGwoMCksdGhpcy5nYXRlRW5kZWQ9ITEsdGhpcy5zdGFydGVkPSExLHRoaXMucG9ydC5vbm1lc3NhZ2U9cz0+e3ZhciBoLGY7bGV0e3NyYzplLHNjaGVtYTp7dWdlbnM6aSxyZWdpc3RlcnM6bn0sc3RhcnQ6YSxnYXRlRW5kOm8sZW5kOmN9PXMuZGF0YTt0aGlzLnN0YXJ0PWEsdGhpcy5nYXRlRW5kPW8sdGhpcy5lbmQ9Yyx0aGlzLnJlZ2lzdGVycz1uZXcgQXJyYXkobikuZmlsbCgwKSx0aGlzLnNyYz1gby5maWxsKDApOyAvLyByZXNldCBvdXRwdXRzCiR7ZX1gLHRoaXMubm9kZXM9W107Zm9yKGxldCB1PTA7dTxpLmxlbmd0aDt1Kyspe2NvbnN0IGQ9aVt1XSxsPW5lLmdldChkLnR5cGUpLHA9bmV3IGwodSxkLHNhbXBsZVJhdGUpO3AudHlwZT09PSJjYyImJigoZj0oaD1kLmlucHV0cyk9PW51bGw/dm9pZCAwOmhbMF0pIT1udWxsJiZmLmluY2x1ZGVzKCJzdHJ1ZGVsLWdhdGUiKSkmJihwLnNldFZhbHVlKDEpLHRoaXMuZ2F0ZU5vZGU9cCksdGhpcy5ub2Rlc1t1XT1wfXRoaXMuZ2VuU2FtcGxlPW5ldyBGdW5jdGlvbigidGltZSIsIm5vZGVzIiwiaW5wdXQiLCJyIiwibyIsInMiLHRoaXMuc3JjKX19cHJvY2Vzcyh0LHMpe3ZhciBvLGM7Y29uc3QgZT0obz10WzBdKT09bnVsbD92b2lkIDA6b1swXTtpZihjdXJyZW50VGltZT49dGhpcy5lbmQpcmV0dXJuITE7aWYodGhpcy5nZW5TYW1wbGU9PT12b2lkIDB8fGN1cnJlbnRUaW1lPHRoaXMuc3RhcnQpcmV0dXJuITA7dGhpcy5zdGFydGVkPSEwLCF0aGlzLmdhdGVFbmRlZCYmY3VycmVudFRpbWU+dGhpcy5nYXRlRW5kJiYoKGM9dGhpcy5nYXRlTm9kZSk9PW51bGx8fGMuc2V0VmFsdWUoMCksdGhpcy5nYXRlRW5kZWQ9ITApO2NvbnN0IGk9c1swXSxuPWlbMF0sYT1pWzFdO2ZvcihsZXQgaD0wO2g8WTtoKyspe3RoaXMuZ2VuU2FtcGxlKHRoaXMucGxheVBvcyx0aGlzLm5vZGVzLGU/ZVtoXTowLHRoaXMucmVnaXN0ZXJzLHRoaXMub3V0cHV0cyx0aGlzLnNvdXJjZXMpO2NvbnN0IGY9dGhpcy5vdXRwdXRzWzBdLHU9dGhpcy5vdXRwdXRzWzFdO2E/KG5baF09ZixhW2hdPXUpOm5baF09LjUqKGYrdSksdGhpcy5wbGF5UG9zKz0xL3NhbXBsZVJhdGV9cmV0dXJuITB9fXJldHVybiByZWdpc3RlclByb2Nlc3NvcigiZ2VuZXJpYy1wcm9jZXNzb3IiLEFlKSxSLldhcnBNb2RlPXgsT2JqZWN0LmRlZmluZVByb3BlcnR5KFIsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZToiTW9kdWxlIn0pLFJ9KHt9KTsK";
let tn = [], _n = 0;
const Oi = 4;
let fS = (e) => {
  let t = [], n = {
    get() {
      return n.lc || n.listen(() => {
      })(), n.value;
    },
    lc: 0,
    listen(s) {
      return n.lc = t.push(s), () => {
        for (let r = _n + Oi; r < tn.length; )
          tn[r] === s ? tn.splice(r, Oi) : r += Oi;
        let i = t.indexOf(s);
        ~i && (t.splice(i, 1), --n.lc || n.off());
      };
    },
    notify(s, i) {
      let r = !tn.length;
      for (let a of t)
        tn.push(
          a,
          n.value,
          s,
          i
        );
      if (r) {
        for (_n = 0; _n < tn.length; _n += Oi)
          tn[_n](
            tn[_n + 1],
            tn[_n + 2],
            tn[_n + 3]
          );
        tn.length = 0;
      }
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    off() {
    },
    set(s) {
      let i = n.value;
      i !== s && (n.value = s, n.notify(i));
    },
    subscribe(s) {
      let i = n.listen(s);
      return s(n.value), i;
    },
    value: e
  };
  return n;
}, yS = (e = {}) => {
  let t = fS(e);
  return t.setKey = function(n, s) {
    let i = t.value;
    typeof s > "u" && n in t.value ? (t.value = { ...t.value }, delete t.value[n], t.notify(i, n)) : t.value[n] !== s && (t.value = {
      ...t.value,
      [n]: s
    }, t.notify(i, n));
  }, t;
};
const gS = {
  stretch: { node: "stretch", param: "pitchFactor" },
  gain: { node: "gain", param: "gain" },
  postgain: { node: "post", param: "gain" },
  pan: { node: "pan", param: "pan" },
  tremolo: { node: "tremolo", param: "frequency" },
  tremolosync: { node: "tremolo", param: "frequency" },
  tremolodepth: { node: "tremolo_gain", param: "gain" },
  tremoloskew: { node: "tremolo", param: "skew" },
  tremolophase: { node: "tremolo", param: "phase" },
  tremoloshape: { node: "tremolo", param: "shape" },
  // MODULATORS
  lfo: { node: "lfo", param: "frequency" },
  lfo_rate: { node: "lfo", param: "frequency" },
  lfo_sync: { node: "lfo", param: "frequency" },
  lfo_depth: { node: "lfo", param: "depth" },
  lfo_depthabs: { node: "lfo", param: "depth" },
  lfo_skew: { node: "lfo", param: "skew" },
  lfo_curve: { node: "lfo", param: "curve" },
  lfo_dcoffset: { node: "lfo", param: "dcoffset" },
  env: { node: "env", param: "depth" },
  env_attack: { node: "env", param: "attack" },
  env_decay: { node: "env", param: "decay" },
  env_sustain: { node: "env", param: "sustain" },
  env_release: { node: "env", param: "release" },
  bmod: { node: "bmod", param: "depth" },
  bmod_depth: { node: "bmod", param: "depth" },
  bmod_depthabs: { node: "bmod", param: "depth" },
  // LPF
  cutoff: { node: "lpf", param: "frequency" },
  resonance: { node: "lpf", param: "Q" },
  lprate: { node: "lpf_lfo", param: "rate" },
  lpsync: { node: "lpf_lfo", param: "sync" },
  lpdepth: { node: "lpf_lfo", param: "depth" },
  lpdepthfrequency: { node: "lpf_lfo", param: "depth" },
  lpshape: { node: "lpf_lfo", param: "shape" },
  lpdc: { node: "lpf_lfo", param: "dcoffset" },
  lpskew: { node: "lpf_lfo", param: "skew" },
  // HPF
  hcutoff: { node: "hpf", param: "frequency" },
  hresonance: { node: "hpf", param: "Q" },
  hprate: { node: "hpf_lfo", param: "rate" },
  hpsync: { node: "hpf_lfo", param: "sync" },
  hpdepth: { node: "hpf_lfo", param: "depth" },
  hpdepthfrequency: { node: "hpf_lfo", param: "depth" },
  hpshape: { node: "hpf_lfo", param: "shape" },
  hpdc: { node: "hpf_lfo", param: "dcoffset" },
  hpskew: { node: "hpf_lfo", param: "skew" },
  // BPF
  bandf: { node: "bpf", param: "frequency" },
  bandq: { node: "bpf", param: "Q" },
  bprate: { node: "bpf_lfo", param: "rate" },
  bpsync: { node: "bpf_lfo", param: "sync" },
  bpdepth: { node: "bpf_lfo", param: "depth" },
  bpdepthfrequency: { node: "bpf_lfo", param: "depth" },
  bpshape: { node: "bpf_lfo", param: "shape" },
  bpdc: { node: "bpf_lfo", param: "dcoffset" },
  bpskew: { node: "bpf_lfo", param: "skew" },
  vowel: { node: "vowel", param: "frequency" },
  // DISTORTION
  coarse: { node: "coarse", param: "coarse" },
  crush: { node: "crush", param: "crush" },
  shape: { node: "shape", param: "shape" },
  shapevol: { node: "shape", param: "postgain" },
  distort: { node: "distort", param: "distort" },
  distortvol: { node: "distort", param: "postgain" },
  distorttype: { node: "distort", param: "distort" },
  // COMPRESSOR
  compressor: { node: "compressor", param: "threshold" },
  compressorRatio: { node: "compressor", param: "ratio" },
  compressorKnee: { node: "compressor", param: "knee" },
  compressorAttack: { node: "compressor", param: "attack" },
  compressorRelease: { node: "compressor", param: "release" },
  // PHASER
  phaserrate: { node: "phaser_lfo", param: "frequency" },
  phasersweep: { node: "phaser_lfo", param: "depth" },
  phasercenter: { node: "phaser", param: "frequency" },
  phaserdepth: { node: "phaser", param: "Q" },
  // ORBIT EFFECTS
  delay: { node: "delay_mix", param: "gain" },
  delaytime: { node: "delay", param: "delayTime" },
  delayfeedback: { node: "delay", param: "feedback" },
  delaysync: { node: "delay", param: "delayTime" },
  dry: { node: "dry", param: "gain" },
  room: { node: "room_mix", param: "gain" },
  djf: { node: "djf", param: "value" },
  busgain: { node: "bus", param: "gain" },
  // SYNTHS
  s: { node: "source", param: "frequency" },
  detune: { node: "source", param: "freqspread" },
  wt: { node: "source", param: "position" },
  warp: { node: "source", param: "warp" },
  freq: { node: "source", param: "frequency" },
  note: { node: "source", param: "frequency" },
  wtdc: { node: "wt_lfo", param: "dc" },
  wtskew: { node: "wt_lfo", param: "skew" },
  wtrate: { node: "wt_lfo", param: "frequency" },
  wtsync: { node: "wt_lfo", param: "frequency" },
  wtdepth: { node: "wt_lfo", param: "depth" },
  warpdc: { node: "warp_lfo", param: "dc" },
  warpskew: { node: "warp_lfo", param: "skew" },
  warprate: { node: "warp_lfo", param: "frequency" },
  warpsync: { node: "warp_lfo", param: "frequency" },
  warpdepth: { node: "warp_lfo", param: "depth" },
  fmi: { node: "fm_1_gain", param: "gain" },
  fmi2: { node: "fm_2_gain", param: "gain" },
  fmi3: { node: "fm_3_gain", param: "gain" },
  fmi4: { node: "fm_4_gain", param: "gain" },
  fmi5: { node: "fm_5_gain", param: "gain" },
  fmi6: { node: "fm_6_gain", param: "gain" },
  fmi7: { node: "fm_7_gain", param: "gain" },
  fmi8: { node: "fm_8_gain", param: "gain" },
  fmh: { node: "fm_1", param: "frequency" },
  fmh2: { node: "fm_2", param: "frequency" },
  fmh3: { node: "fm_3", param: "frequency" },
  fmh4: { node: "fm_4", param: "frequency" },
  fmh5: { node: "fm_5", param: "frequency" },
  fmh6: { node: "fm_6", param: "frequency" },
  fmh7: { node: "fm_7", param: "frequency" },
  fmh8: { node: "fm_8", param: "frequency" },
  pw: { node: "source", param: "pulsewidth" },
  pwrate: { node: "pw_lfo", param: "frequency" },
  pwsweep: { node: "pw_lfo", param: "depth" },
  vib: { node: "vib", param: "frequency" },
  vibmod: { node: "vib_gain", param: "gain" },
  byteBeatStartTime: { node: "source", param: "byteBeatStartTime" },
  spread: { node: "source", param: "panspread" },
  transient: { node: "transient", param: "attack" }
};
function bS() {
  return gS;
}
const MS = (e, t) => {
  if (e?.parameters) {
    const s = e.parameters.get(t);
    if (s instanceof AudioParam)
      return s;
  }
  let n = e?.[t];
  if (n === void 0 && t === "frequency" && (n = e?.detune ?? e?.playbackRate), n instanceof AudioParam)
    return n;
}, Pc = bS(), CS = (e, t) => {
  const n = e.split("_")[0];
  return Pc[`${n}_${t}`] ?? Pc[n];
}, no = (e, t) => e === "frequency" && t >= 30 ? { min: 20 - t, max: 24e3 - t } : { min: void 0, max: void 0 }, xS = (e, t, n) => {
  const s = ve(), i = new Float32Array(256);
  for (let u = 0; u < i.length; u++) {
    const o = u / (i.length - 1) * 2 - 1;
    i[u] = gn(o * n, t, n);
  }
  const r = new WaveShaperNode(s, { curve: i }), a = je(1 / n);
  return e.connect(a).connect(r), { modulator: e, toCleanup: [r, a] };
}, so = (e, t, n) => {
  const s = CS(e, n);
  if (!s)
    return Pi(
      new Error(`Could not find control data for target '${e}'. It may not be modulatable.`),
      "superdough"
    ), { targetParams: [], paramName: e };
  const i = s.param, r = t[s.node] ? s.node : e, a = t[r];
  if (!a) {
    const o = Object.keys(t);
    return Pi(
      new Error(`Could not connect to target '${r}' — it does not exist. Available targets: ${o.join(", ")}`),
      "superdough"
    ), { targetParams: [], paramName: i };
  }
  const u = [];
  return a.forEach((o) => {
    const c = MS(o, i);
    u.push(c);
  }), { targetParams: u, paramName: i };
}, z2 = (e, t, n) => {
  const {
    rate: s = 1,
    sync: i,
    cps: r,
    cycle: a,
    control: u = "lfo",
    subControl: o,
    fxi: c = "main",
    depth: l = 1,
    depthabs: p,
    ...m
  } = t, { targetParams: g, paramName: y } = so(u, n[c], o);
  if (!g.length) return;
  let x = g[0].value;
  x = x === 0 ? 1 : x;
  const { min: v, max: E } = no(y, x), w = p ?? l * x, V = {
    ...m,
    frequency: i !== void 0 ? i * r : s,
    time: a / r,
    depth: w,
    min: v,
    max: E
  }, D = Is(ve(), V);
  return n.main[`lfo_${e}`] = [D], g.forEach((X) => D.connect(X)), D;
}, N2 = (e, t, n) => {
  const { control: s, subControl: i, acurve: r, dcurve: a, rcurve: u, depth: o = 1, depthabs: c, fxi: l = "main", ...p } = t, { targetParams: m, paramName: g } = so(s, n[l], i);
  if (!m.length) return;
  let y = m[0].value;
  y = y === 0 ? 1 : y;
  const { min: x, max: v } = no(g, y), E = c ?? o * y, w = S2(ve(), {
    ...p,
    depth: E,
    min: x,
    max: v,
    attackCurve: r,
    decayCurve: a,
    releaseCurve: u
  });
  return n.main[`env_${e}`] = [w], m.forEach((V) => w.connect(V)), w;
}, W2 = (e, t, n) => {
  const s = ve(), { control: i, subControl: r, depth: a = 1, depthabs: u, fxi: o = "main" } = e, { targetParams: c, paramName: l } = so(i, t[o], r);
  if (!c.length) return { toCleanup: [] };
  const p = n.getBus(e.bus), m = new ConstantSourceNode(s, { offset: e.dc ?? 0 });
  m.start(e.begin);
  const g = m.connect(je(1));
  p.connect(g);
  let y = c[0].value;
  y = y === 0 ? 1 : y;
  const { min: x, max: v } = no(l, y), E = u ?? a * y, w = je(Math.sign(E) * Math.abs(E) / 0.3), V = g.connect(w), D = [];
  let X = V;
  if (x !== void 0 && v !== void 0) {
    const Z = xS(V, x, v);
    X = Z.modulator, D.push(...Z.toCleanup);
  }
  return mn(
    s,
    () => {
      c.forEach((Z) => X.connect(Z));
    },
    0,
    e.begin
  ), D.push(m, g, w), { modulator: X, toCleanup: D };
}, io = {}, ua = {}, GS = (e) => io[e];
function vS(e, t) {
  var n = 1024;
  if (e < n) return e + " B";
  var s = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], i = -1;
  do
    e /= n, ++i;
  while (e >= n);
  return e.toFixed(1) + " " + s[i];
}
function T2(e, t) {
  const { speed: n = 1 } = e, { transpose: s, url: i, index: r, midi: a, label: u } = X2(e, t);
  let o = Math.abs(n) * Math.pow(2, s / 12);
  return { transpose: s, url: i, index: r, midi: a, label: u, playbackRate: o };
}
const I2 = async (e, t, n) => {
  let { url: s, label: i, playbackRate: r } = T2(e, t);
  n && (s = await n(s));
  const a = ve(), u = await cr(s, a, i);
  return e.unit === "c" && (r = r * u.duration), { buffer: u, playbackRate: r };
}, _2 = async (e, t, n) => {
  let { buffer: s, playbackRate: i } = await I2(e, t, n);
  e.speed < 0 && (s = Y2(s));
  const a = ve().createBufferSource();
  a.buffer = s, a.playbackRate.value = i;
  const { loopBegin: u = 0, loopEnd: o = 1, begin: c = 0, end: l = 1 } = e, p = a.buffer.duration, m = c * p;
  e.loop && (a.loop = true, a.loopStart = u * p, a.loopEnd = o * p);
  const y = p / a.playbackRate.value, x = (l - c) * y;
  return { bufferSource: a, offset: m, bufferDuration: p, playbackDuration: y, sliceDuration: x };
}, cr = (e, t, n, s = 0) => {
  const i = n ? `sound "${n}:${s}"` : "sample";
  if (e = e.replace("#", "%23"), !ua[e]) {
    lt(`[sampler] load ${i}..`, "load-sample", { url: e });
    const r = Date.now();
    ua[e] = fetch(e).then((a) => a.arrayBuffer()).then(async (a) => {
      const u = Date.now() - r, o = vS(a.byteLength);
      lt(`[sampler] load ${i}... done! loaded ${o} in ${u}ms`, "loaded-sample", { url: e });
      const c = await t.decodeAudioData(a);
      return io[e] = c, c;
    });
  }
  return ua[e];
};
function Y2(e) {
  const t = ve(), n = t.createBuffer(e.numberOfChannels, e.length, t.sampleRate);
  for (let s = 0; s < e.numberOfChannels; s++)
    n.copyToChannel(e.getChannelData(s).slice().reverse(), s, s);
  return n;
}
const PS = (e) => io[e];
function H2(e) {
  if (e.startsWith("bubo:")) {
    const [t, n] = e.split(":");
    e = `github:Bubobubobubobubo/dough-${n}`;
  }
  return e;
}
function K2(e, t = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let n = e.slice(7);
  n = n.endsWith("/") ? n.slice(0, -1) : n;
  let s = n.split("/"), i = s[0], r = s.length >= 2 ? s[1] : "samples", a = s.length >= 3 ? s[2] : "main", u = s.slice(3);
  return u.push(t || ""), u = u.join("/"), `https://raw.githubusercontent.com/${i}/${r}/${a}/${u}`;
}
const j2 = (e, t, n = e._base || "") => Object.entries(e).forEach(([s, i]) => {
  if (typeof i == "string" && (i = [i]), typeof i != "object")
    throw new Error("wrong sample map format for " + s);
  n = i._base || n, n = H2(n), n.startsWith("github:") && (n = K2(n, ""));
  const r = (a) => n + a;
  Array.isArray(i) ? i = i.map(r) : i = Object.fromEntries(
    Object.entries(i).map(([a, u]) => [a, (typeof u == "string" ? [u] : u).map(r)])
  ), t(s, i);
});
let U2 = {};
function AS(e, t) {
  U2[e] = t;
}
function FS(e) {
  const t = Object.entries(U2).find(([n]) => e.startsWith(n));
  if (t)
    return t[1];
}
async function XS(e) {
  const t = FS(e);
  if (t)
    return t(e);
  if (e = H2(e), e.startsWith("github:") && (e = K2(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432"), e.startsWith("shabda:")) {
    let [i, r] = e.split("shabda:");
    e = `https://shabda.ndre.gr/${r}.json?strudel=1`;
  }
  if (e.startsWith("shabda/speech")) {
    let [i, r] = e.split("shabda/speech");
    r = r.startsWith("/") ? r.substring(1) : r;
    let [a, u] = r.split(":"), o = "f", c = "en-GB";
    a && ([c, o] = a.split("/")), e = `https://shabda.ndre.gr/speech/${u}.json?gender=${o}&language=${c}&strudel=1'`;
  }
  if (typeof fetch != "function")
    return;
  const n = D2(e);
  if (typeof fetch > "u")
    return;
  const s = await fetch(e).then((i) => i.json()).catch((i) => {
    throw console.error(i), new Error(`error loading "${e}"`);
  });
  return [s, s._base || n];
}
const O2 = async (e, t = e._base || "", n = {}) => {
  if (typeof e == "string") {
    const [r, a] = await XS(e);
    return O2(r, t || a, n);
  }
  const { prebake: s, tag: i } = n;
  j2(
    e,
    (r, a) => {
      Q2(r, a, { baseUrl: t, prebake: s, tag: i });
    },
    t
  );
}, Ac = [];
async function J2(e, t, n, s, i) {
  let {
    s: r,
    nudge: a = 0,
    // TODO: is this in seconds?
    cut: u,
    loop: o,
    clip: c = void 0,
    // if set, samples will be cut off when the hap ends
    n: l = 0,
    speed: p = 1,
    // sample playback speed
    duration: m
  } = t;
  if (p === 0)
    return;
  const g = ve();
  let [y, x, v, E] = Nt([t.attack, t.decay, t.sustain, t.release]);
  const { bufferSource: w, sliceDuration: V, offset: D } = await _2(t, s, i);
  if (!w) {
    lt(`[sampler] could not load "${r}:${l}"`, "error");
    return;
  }
  if (g.currentTime > e) {
    lt(`[sampler] loading sound "${r}:${l}" took too long`, "highlight"), Re(w);
    return;
  }
  const X = Vs(w.detune, t, e), Z = e + a;
  w.start(Z, D);
  const L = g.createGain(), R = w.connect(L);
  c == null && o == null && t.release == null && (m = V);
  let H = e + m;
  zt(R.gain, y, x, v, E, 0, 1, e, H, "linear"), Bs(w.detune, t, e, H);
  const z = g.createGain();
  R.connect(z), bn(w, function() {
    Re(w), X?.stop(), Re(R), Re(z), n();
  });
  let $ = H + E + 0.01;
  w.stop($);
  const I = (ee) => {
    w.stop(ee);
  }, Y = { node: z, nodes: { source: [w], ...X?.nodes }, stop: I };
  if (u !== void 0) {
    const ee = Ac[u];
    ee && (ee.node.gain.setValueAtTime(1, Z), ee.node.gain.linearRampToValueAtTime(0, Z + 0.01)), Ac[u] = Y;
  }
  return Y;
}
function DS(e, t, n) {
  sn(e, (s, i, r) => J2(s, i, r, t), {
    type: "sample",
    samples: t,
    ...n
  });
}
function Q2(e, t, n) {
  e.startsWith("wt_") ? ro(e, t, n) : DS(e, t, n);
}
const Xs = (e, t) => e !== void 0 && e !== t, Ja = (e) => new GainNode(e, { gain: 1, channelCount: 2, channelCountMode: "explicit" });
class SS {
  reverbNode;
  delayNode;
  output;
  summingNode;
  djfNode;
  audioContext;
  constructor(t) {
    this.audioContext = t, this.output = Ja(t), this.summingNode = Ja(t), this.summingNode.connect(this.output);
  }
  disconnect() {
    this.output.disconnect(), this.summingNode.disconnect(), this.delayNode?.disconnect(), this.reverbNode?.disconnect();
  }
  getDjf(t, n = 0) {
    return this.djfNode == null && (this.djfNode = Dt(this.audioContext, "djf-processor", { value: t }), this.summingNode.disconnect(), this.summingNode.connect(this.djfNode), this.djfNode.connect(this.output)), this.djfNode.parameters.get("value").setValueAtTime(t, n), this.djfNode;
  }
  getDelay(t = 0, n = 0.5, s) {
    return n = gn(n, 0, 0.98), this.delayNode == null && (this.delayNode = this.audioContext.createFeedbackDelay(1, t, n), this.delayNode.connect(this.summingNode), this.delayNode.start?.(s)), this.delayNode.delayTime.value !== t && this.delayNode.delayTime.setValueAtTime(t, s), this.delayNode.feedback.value !== n && this.delayNode.feedback.setValueAtTime(n, s), this.delayNode;
  }
  getReverb(t, n, s, i, r, a, u) {
    return this.reverbNode == null && (this.reverbNode = this.audioContext.createReverb(t, n, s, i, r, a, u), this.reverbNode.connect(this.summingNode)), (Xs(t, this.reverbNode.duration) || Xs(n, this.reverbNode.fade) || Xs(s, this.reverbNode.lp) || Xs(i, this.reverbNode.dim) || Xs(a, this.reverbNode.irspeed) || Xs(u, this.reverbNode.irbegin) || this.reverbNode.ir !== r) && this.reverbNode.generate(t, n, s, i, r, a, u), this.reverbNode;
  }
  sendReverb(t, n) {
    return Ai(t, this.reverbNode, n);
  }
  sendDelay(t, n) {
    return Ai(t, this.delayNode, n);
  }
  duck(t, n = 0, s = 0.1, i = 1) {
    const r = n, a = Math.max(s, 2e-3), u = this.output.gain;
    mn(
      this.audioContext,
      () => {
        const o = this.audioContext.currentTime, c = u.value;
        u.cancelScheduledValues(o), u.setValueAtTime(c, o);
        const l = Math.max(t, o), p = gn(1 - Math.sqrt(i), 0.01, c);
        u.exponentialRampToValueAtTime(p, l + r), u.exponentialRampToValueAtTime(1, l + r + a);
      },
      0,
      t - 0.01
    );
  }
  connectToOutput(t) {
    t.connect(this.summingNode);
  }
}
class wS {
  channelMerger;
  destinationGain;
  constructor(t) {
    this.audioContext = t, this.initializeAudio();
  }
  initializeAudio() {
    const t = this.audioContext, n = t.destination.maxChannelCount;
    this.audioContext.destination.channelCount = n, this.channelMerger = new ChannelMergerNode(t, { numberOfInputs: t.destination.channelCount }), this.destinationGain = new GainNode(t), this.channelMerger.connect(this.destinationGain), this.destinationGain.connect(t.destination);
  }
  reset() {
    this.disconnect(), this.initializeAudio();
  }
  disconnect() {
    this.channelMerger.disconnect(), this.destinationGain.disconnect(), this.destinationGain = null, this.channelMerger = null;
  }
  connectToDestination = (t, n = [0, 1]) => {
    const s = new StereoPannerNode(this.audioContext);
    t.connect(s);
    const i = new ChannelSplitterNode(this.audioContext, {
      numberOfOutputs: s.channelCount
    });
    s.connect(i), n.forEach((r, a) => {
      i.connect(this.channelMerger, a % s.channelCount, r % this.audioContext.destination.channelCount);
    });
  };
}
class q2 {
  audioContext;
  output;
  nodes = {};
  buses = {};
  constructor(t) {
    this.audioContext = t, this.output = new wS(t);
  }
  reset() {
    Object.values(this.nodes).forEach((t) => {
      t.disconnect();
    }), Object.values(this.buses).forEach((t) => {
      t.disconnect();
    }), this.nodes = {}, this.buses = {}, this.output.reset();
  }
  duck(t, n, s = 0, i = 0.1, r = 1) {
    const a = [t].flat(), u = [s].flat(), o = [i].flat(), c = [r].flat();
    a.forEach((l, p) => {
      const m = this.nodes[l];
      if (m == null) {
        Pi(new Error(`duck target orbit ${l} does not exist`), "superdough");
        return;
      }
      const g = u[p] ?? u[0], y = Math.max(o[p] ?? o[0], 2e-3), x = c[p] ?? c[0];
      m.duck(n, g, y, x);
    });
  }
  getOrbit(t, n) {
    return this.nodes[t] == null && (this.nodes[t] = new SS(this.audioContext), this.output.connectToDestination(this.nodes[t].output, n)), this.nodes[t];
  }
  getBus(t) {
    return this.buses[t] == null && (this.buses[t] = Ja(this.audioContext)), this.buses[t];
  }
}
const Qa = Object.freeze({
  NONE: 0,
  ASYM: 1,
  MIRROR: 2,
  BENDP: 3,
  BENDM: 4,
  BENDMP: 5,
  SYNC: 6,
  QUANT: 7,
  FOLD: 8,
  PWM: 9,
  ORBIT: 10,
  SPIN: 11,
  CHAOS: 12,
  PRIMES: 13,
  BINARY: 14,
  BROWNIAN: 15,
  RECIPROCAL: 16,
  WORMHOLE: 17,
  LOGISTIC: 18,
  SIGMOID: 19,
  FRACTAL: 20,
  FLIP: 21
}), qa = /* @__PURE__ */ new Set();
function $2() {
  qa.clear();
}
async function ZS(e, t, n = 2048) {
  const s = `${e},${n}`;
  if (!qa.has(s)) {
    const r = (await BS(e, t)).getChannelData(0), a = r.length, u = Math.max(1, Math.floor(a / n)), o = new Array(u);
    for (let c = 0; c < u; c++) {
      const l = c * n;
      o[c] = r.subarray(l, l + n);
    }
    return qa.add(s), { frames: o, frameLen: n, numFrames: u, key: s };
  }
  return { frameLen: n, key: s };
}
function ES(e, t) {
  var n = 1024;
  if (e < n) return e + " B";
  var s = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], i = -1;
  do
    e /= n, ++i;
  while (e >= n);
  return e.toFixed(1) + " " + s[i];
}
function LS(e) {
  const t = new DataView(e);
  let n = 12;
  for (; n + 8 <= t.byteLength; ) {
    const s = String.fromCharCode(t.getUint8(n), t.getUint8(n + 1), t.getUint8(n + 2), t.getUint8(n + 3)), i = t.getUint32(n + 4, true);
    if (s === "fmt ")
      return t.getUint32(n + 12, true);
    n += 8 + i + (i & 1);
  }
  return null;
}
async function RS(e) {
  const t = LS(e) || 44100;
  return await new OfflineAudioContext(1, 1, t).decodeAudioData(e);
}
const oa = {}, BS = (e, t) => {
  if (e = e.replace("#", "%23"), !oa[e]) {
    lt(`[wavetable] load table ${t}..`, "load-table", { url: e });
    const n = Date.now();
    oa[e] = fetch(e).then((s) => s.arrayBuffer()).then(async (s) => {
      const i = Date.now() - n, r = ES(s.byteLength);
      return lt(`[wavetable] load table ${t}... done! loaded ${r} in ${i}ms`, "loaded-table", { url: e }), await RS(s);
    });
  }
  return oa[e];
};
function eM(e, t = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let [n, s] = e.split("github:");
  return s = s.endsWith("/") ? s.slice(0, -1) : s, s.split("/").length === 2 && (s += "/main"), `https://raw.githubusercontent.com/${s}/${t}`;
}
const Fc = (e, t, n, s = {}) => (t = e._base || t, Object.entries(e).forEach(([i, r]) => {
  if (i === "_base") return false;
  if (typeof r == "string" && (r = [r]), typeof r != "object")
    throw new Error("wrong json format for " + i);
  let a = t;
  a.startsWith("github:") && (a = eM(a, "")), r = r.map((u) => a + u).filter((u) => u.toLowerCase().endsWith(".wav") ? true : (lt(`[wavetable] skipping ${u} -- wavetables must be ".wav" format`), false)), r.length && ro(i, r, { baseUrl: t, frameLen: n });
}));
function ro(e, t, n) {
  sn(
    e,
    (s, i, r, a) => tM(s, i, r, t, a, n?.frameLen ?? 2048),
    {
      type: "wavetable",
      tables: t,
      ...n
    }
  );
}
const VS = async (e, t, n, s = {}) => {
  if (n !== void 0) return Fc(n, e, t);
  e.startsWith("github:") && (e = eM(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432");
  const i = D2(e);
  if (typeof fetch == "function" && !(typeof fetch > "u"))
    return fetch(e).then((r) => r.json()).then((r) => Fc(r, i, t, s)).catch((r) => {
      throw console.error(r), new Error(`error loading "${e}"`);
    });
};
async function tM(e, t, n, s, i, r) {
  const { s: a, n: u = 0, duration: o, clip: c } = t, l = ve(), [p, m, g, y] = Nt([t.attack, t.decay, t.sustain, t.release]);
  let { warpmode: x } = t;
  typeof x == "string" && (x = Qa[x.toUpperCase()] ?? Qa.NONE);
  const v = Kn(t), { url: E, label: w } = X2(t, s), V = await ZS(E, w, r);
  let D = e + o;
  c !== void 0 && (D = Math.min(e + c * o, D));
  const X = D + y, Z = X + 0.01, L = {
    begin: e,
    end: Z,
    frequency: v,
    freqspread: t.detune,
    position: t.wt,
    warp: t.warp,
    warpMode: x,
    voices: Math.max(t.unison ?? 1, 1),
    panspread: t.spread,
    phaserand: t.wtphaserand ?? t.unison > 1 ? 1 : 0
  }, H = Ei("wavetable", () => new AudioWorkletNode(l, "wavetable-oscillator-processor", { outputChannelCount: [2] }));
  if (Object.entries(L).forEach(([Ge, Ce]) => {
    const Pe = H.parameters.get(Ge), Se = Ce !== void 0 ? Ce : Pe.defaultValue;
    Pe.value = Se;
  }), H.port.postMessage({ type: "initialize", payload: V }), l.currentTime > e) {
    lt(`[wavetable] still loading sound "${a}:${u}"`, "highlight");
    return;
  }
  const z = [t.wtattack, t.wtdecay, t.wtsustain, t.wtrelease], $ = [t.warpattack, t.warpdecay, t.warpsustain, t.warprelease], I = H.parameters, Y = I.get("position"), ee = I.get("warp");
  let Me = t.wtrate;
  t.wtsync != null && (Me = i * t.wtsync);
  const re = Oa(
    l,
    Y,
    e,
    X,
    {
      offset: t.wt,
      amount: t.wtenv,
      defaultAmount: 0.5,
      values: z,
      holdEnd: D,
      defaultValues: [0, 0.5, 0, 0.1]
    },
    {
      frequency: Me,
      depth: t.wtdepth,
      defaultDepth: 0.5,
      shape: t.wtshape,
      skew: t.wtskew,
      dcoffset: t.wtdc ?? 0
    }
  );
  let de = t.warprate;
  t.warpsync != null && (de = de = i * t.warpsync);
  const se = Oa(
    l,
    ee,
    e,
    X,
    {
      offset: t.warp,
      amount: t.warpenv,
      defaultAmount: 0.5,
      values: $,
      holdEnd: D,
      defaultValues: [0, 0.5, 0, 0.1]
    },
    {
      frequency: de,
      depth: t.warpdepth,
      defaultDepth: 0.5,
      shape: t.warpshape,
      skew: t.warpskew,
      dcoffset: t.warpdc ?? 0
    }
  ), Ie = Vs(H.parameters.get("detune"), t, e), rt = Fi(H.parameters.get("frequency"), t, e), dt = l.createGain(), O = H.connect(dt);
  zt(O.gain, p, m, g, y, 0, 0.3, e, D, "linear"), Bs(H.parameters.get("detune"), t, e, D);
  const at = {
    node: O,
    nodes: {
      source: [H],
      wt_lfo: [re],
      warp_lfo: [se],
      ...rt?.nodes,
      ...Ie?.nodes
    }
  }, he = mn(
    l,
    () => {
      Qu(H), Ie?.stop(), rt?.stop(), Re(re), Re(se), n();
    },
    e,
    Z
  );
  return at.stop = (Ge) => {
    he.stop(Ge);
  }, at;
}
const ao = 128, $a = "System Standard";
let uo = ao;
function nM(e) {
  uo = parseInt(e) ?? ao;
}
let oo = false;
function sM(e) {
  oo = e == true;
}
const an = yS();
function sn(e, t, n = {}) {
  e = e.toLowerCase().replace(/\s+/g, "_"), an.setKey(e, { onTrigger: t, data: n });
}
let iM = (e) => e;
function pn(e) {
  return iM(e);
}
function kS(e) {
  iM = e;
}
function eu(e) {
  for (const n in e)
    e[n.toLowerCase()] = e[n];
  const t = an.get();
  for (const n in t) {
    const [s, i] = n.split("_");
    if (!i) continue;
    const r = e[s];
    if (r) {
      if (typeof r == "string")
        t[`${r}_${i}`.toLowerCase()] = t[n];
      else if (Array.isArray(r))
        for (const a of r)
          t[`${a}_${i}`.toLowerCase()] = t[n];
    }
  }
  an.set({ ...t });
}
async function zS(e) {
  const n = await (await fetch(e)).json();
  eu(n);
}
async function NS(...e) {
  switch (e.length) {
    case 1:
      return typeof e[0] == "string" ? zS(e[0]) : eu(e[0]);
    case 2:
      return eu({ [e[0]]: e[1] });
    default:
      throw new Error("aliasMap expects 1 or 2 arguments, received " + e.length);
  }
}
function WS(e, t) {
  if (is(e) == null) {
    lt("soundAlias: original sound not found");
    return;
  }
  an.setKey(t, is(e));
}
function is(e) {
  return typeof e != "string" ? (console.warn(`getSound: expected string got "${e}". fall back to triangle`), an.get().triangle) : an.get()[e.toLowerCase()];
}
const rM = async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true });
  let e = await navigator.mediaDevices.enumerateDevices();
  e = e.filter((n) => n.kind === "audiooutput" && n.deviceId !== "default");
  const t = /* @__PURE__ */ new Map();
  return t.set($a, ""), e.forEach((n) => {
    t.set(n.label, n.deviceId);
  }), t;
};
let Li = {
  s: "triangle",
  gain: 0.8,
  postgain: 1,
  density: ".03",
  channels: [1, 2],
  phaserdepth: 0.75,
  shapevol: 1,
  distortvol: 1,
  distorttype: 0,
  delay: 0,
  busgain: 1,
  byteBeatExpression: "0",
  delayfeedback: 0.5,
  delaysync: 3 / 16,
  orbit: 1,
  i: 1,
  velocity: 1,
  fft: 8,
  tremolodepth: 1,
  tremolophase: 0,
  release: 0.01
};
const TS = Object.freeze({ ...Li });
function IS(e, t) {
  Li[e] = t;
}
function _S() {
  Li = { ...TS };
}
let co = new Map(Object.entries(Li));
function lo(e, t) {
  co.set(e, t);
}
function ut(e) {
  return co.get(e);
}
function YS(e) {
  Object.keys(e).forEach((t) => {
    lo(t, e[t]);
  });
}
function aM() {
  co = new Map(Object.entries(Li));
}
function HS(e) {
  aM(), e === "1.0" && lo("fanchor", 0.5);
}
const KS = () => an.set({});
let uM = [];
function oM(e) {
  uM.push(e);
}
let Ji;
function cM() {
  if (!Ji) {
    const e = ve(), t = uM.concat([mS]);
    Ji = Promise.all(t.map((n) => e.audioWorklet.addModule(n))).then(
      () => Ji = void 0
    );
  }
  return Ji;
}
async function ho(e = {}) {
  const {
    disableWorklets: t = false,
    maxPolyphony: n,
    audioDeviceName: s = $a,
    multiChannelOrbits: i = false
  } = e;
  if (nM(n), sM(i), $2(), typeof window > "u")
    return;
  const r = ve();
  if (s != null && s != $a)
    try {
      const u = (await rM()).get(s), o = (u ?? "").length > 0;
      r.sinkId !== u && o && await r.setSinkId(u), lt(
        `[superdough] Audio Device set to ${s}, it might take a few seconds before audio plays on all output channels`
      );
    } catch {
      lt("[superdough] failed to set audio interface", "warning");
    }
  if (!r instanceof OfflineAudioContext && await r.resume(), t) {
    lt("[superdough]: AudioWorklets disabled with disableWorklets");
    return;
  }
  try {
    await cM(), lt("[superdough] AudioWorklets loaded");
  } catch (a) {
    console.warn("could not load AudioWorklet effects", a);
  }
  lt("[superdough] ready");
}
let ca;
async function lM(e) {
  return ca || (ca = new Promise((t) => {
    document.addEventListener("mousedown", async function n() {
      document.removeEventListener("mousedown", n), await ho(e), t();
    });
  })), ca;
}
let as;
function Xr() {
  return as == null && (as = new q2(ve())), as;
}
function tu(e) {
  return as = e, as;
}
function dM(e, t) {
  Xr().output.connectToDestination(e, t);
}
function jS(e, t, n = 1, s = 0.5, i = 1e3, r = 2e3) {
  const a = ve(), u = Is(a, { frequency: n, depth: r * 2, begin: e, end: t }), o = 1;
  let c = 282;
  const l = [];
  for (let p = 0; p < o; p++) {
    const m = Ei("filter", () => a.createBiquadFilter());
    m.type = "notch", m.gain.value = 1, m.frequency.value = i + c, m.Q.value = 2 - Math.min(Math.max(s * 2, 0), 1.9), u.connect(m.detune), c += 282, l.push(m);
  }
  return { filterChain: l, lfo: u };
}
function US(e) {
  e = e ?? 0;
  const t = ["12db", "ladder", "24db"];
  return typeof e == "number" ? t[Math.floor(F2(e, t.length))] : e;
}
let vt = {}, us = {};
function hM(e, t = 1024, n = 0.5) {
  if (!vt[e] || vt[e].context != ve()) {
    const s = ve().createAnalyser();
    s.fftSize = t, s.smoothingTimeConstant = n, vt[e] = s, us[e] = new Float32Array(vt[e].frequencyBinCount);
  }
  return vt[e].fftSize !== t && (vt[e].fftSize = t, us[e] = new Float32Array(vt[e].frequencyBinCount)), vt[e];
}
function Dr(e = "time", t = 1) {
  const n = {
    time: () => vt[t]?.getFloatTimeDomainData(us[t]),
    frequency: () => vt[t]?.getFloatFrequencyData(us[t])
  }[e];
  if (!n)
    throw new Error(`getAnalyzerData: ${e} not supported. use one of ${Object.keys(n).join(", ")}`);
  return n(), us[t];
}
function pM() {
  as?.reset(), vt = {}, us = {};
}
let si = /* @__PURE__ */ new Map();
function Xc(e) {
  return (Array.isArray(e) ? e : [e]).map((t) => t - 1);
}
class OS {
  constructor() {
    this.audioNodes = [], this.tails = [];
  }
  connect(...t) {
    return t.forEach((n) => {
      this.tails.forEach((s) => {
        s.connect(n);
      });
    }), this.tails = t, this.audioNodes.push(...t), this;
  }
  connectOne(t, n) {
    return this.tails[t].connect(n), this.tails[t] = n, this.audioNodes.push(n), this;
  }
  releaseNodes() {
    this.audioNodes.forEach((t) => _D(t) ? Qu(t) : Re(t)), this.audioNodes = [], this.tails = [];
  }
}
const Sr = async (e, t, n, s = 0.5, i = 0.5) => {
  const r = { main: {} }, a = ve(), u = Xr();
  let { stretch: o } = e;
  if (o != null && (t = t - 0.04), typeof e != "object")
    throw new Error(
      `expected hap.value to be an object, but got "${e}". Hint: append .note() or .s() to the end`,
      "error"
    );
  if (e.duration = n, t < a.currentTime) {
    console.warn(
      `[superdough]: cannot schedule sounds in the past (target: ${t.toFixed(2)}, now: ${a.currentTime.toFixed(2)})`
    );
    return;
  }
  let {
    s: c = ut("s"),
    bank: l,
    source: p,
    postgain: m = ut("postgain"),
    duckorbit: g,
    duckonset: y,
    duckattack: x,
    duckdepth: v,
    djf: E,
    release: w = ut("release"),
    dry: V,
    delay: D = ut("delay"),
    delayfeedback: X = ut("delayfeedback"),
    delaysync: Z = ut("delaysync"),
    delaytime: L,
    orbit: R = ut("orbit"),
    bus: H,
    busgain: z = ut("busgain"),
    room: $,
    roomfade: I,
    roomlp: Y,
    roomdim: ee,
    roomsize: Me,
    ir: re,
    irspeed: de,
    irbegin: se,
    i: Ie = ut("i"),
    analyze: rt,
    // analyser wet
    fft: dt = ut("fft"),
    // fftSize 0 - 10
    FX: O = [],
    FXrelease: at
  } = e;
  L = L ?? Cc(Z, s);
  const he = Xc(
    oo && R > 0 ? [R * 2 - 1, R * 2] : ut("channels")
  ), Ge = e.channels != null ? Xc(e.channels) : he, Ce = u.getOrbit(R, Ge);
  g != null && u.duck(g, t, y, x, v), m = pn(m), D = pn(D), z = pn(z);
  const Pe = t + n, Se = Math.max(w, at ?? 0), Le = Pe + Se, pt = Math.round(Math.random() * 1e6);
  for (let ie = 0; ie <= si.size - uo; ie++) {
    const J = si.entries().next(), He = J.value[1].deref(), pe = J.value[0], Te = t + 0.25;
    He?.node?.gain?.linearRampToValueAtTime(0, Te), He?.stop?.(Te), si.delete(pe);
  }
  if (["-", "~", "_"].includes(c))
    return;
  l && c && (c = `${l}_${c}`, e.s = c);
  const ae = new OS();
  let We;
  if (p)
    We = p(t, e, n, s), r.main.source = [We];
  else if (is(c)) {
    const { onTrigger: ie } = is(c), He = await ie(t, e, () => mn(
      a,
      () => {
        ae.releaseNodes(), si.delete(pt);
      },
      0,
      Le
    ), s);
    He && (We = He.node, si.set(pt, new WeakRef(He)), r.main = { ...r.main, ...He.nodes });
  } else
    throw new Error(`sound ${c} not found! Is it loaded?`);
  if (!We)
    return;
  if (a.currentTime > t) {
    lt("[webaudio] skip hap: still loading", a.currentTime - t);
    return;
  }
  ae.connect(We), O = [...O, e];
  for (let [ie, J] of Object.entries(O)) {
    const He = ie == O.length - 1 ? "main" : ie;
    r[He] ??= {};
    const pe = r[He];
    let {
      gain: Te = ut("gain"),
      velocity: Ct = ut("velocity"),
      shapevol: dn = ut("shapevol"),
      distorttype: Nn = ut("distorttype"),
      distortvol: hn = ut("distortvol"),
      tremolodepth: Xt = ut("tremolodepth"),
      phaserdepth: Fn = ut("phaserdepth"),
      delay: De = ut("delay"),
      delayfeedback: Oe = ut("delayfeedback"),
      delaysync: ye = ut("delaysync"),
      delaytime: qe,
      i: Ke = ut("i")
    } = J;
    if (Te = pn(Ln(Te, 1)), dn = pn(dn), hn = pn(hn), Ct = pn(Ct), Xt = pn(Xt), Te *= Ct, qe = qe ?? Cc(ye, s), J.workletSrc !== void 0) {
      const me = Dt(a, "generic-processor", {}, { outputChannelCount: [2] });
      ae.connect(me);
      const be = J.workletSrc.replace(/\bpat\[(\d+)\]/g, (_e, Bt) => J.workletInputs[Bt]).replaceAll("sFreq", Kn(e)).replaceAll("sGate", `cc('strudel-gate-${pt}')`), { src: $e, ugens: Je, registers: we } = compileKabel(be);
      me.port.postMessage({ src: $e, schema: { ugens: Je, registers: we }, start: t, gateEnd: Pe, end: Le });
    }
    if (J.stretch !== void 0) {
      const me = Dt(a, "phase-vocoder-processor", { pitchFactor: J.stretch });
      ae.connect(me), pe.stretch = [me];
    }
    if (J.transient !== void 0) {
      const me = Dt(
        a,
        "transient-processor",
        {},
        {
          processorOptions: {
            attack: J.transient,
            sustain: J.transsustain,
            begin: t,
            end: Le
          }
        }
      );
      ae.connect(me), pe.transient = me;
    }
    const ts = je(Te);
    pe.gain = [ts], ae.connect(ts);
    const ns = US(e.ftype), mt = (me) => Z2(a, t, Pe, me, s, i);
    if (J.cutoff !== void 0) {
      const be = aa(J, {
        frequency: "cutoff",
        q: "resonance",
        attack: "lpattack",
        decay: "lpdecay",
        sustain: "lpsustain",
        release: "lprelease",
        env: "lpenv",
        anchor: "fanchor",
        model: "ftype",
        drive: "drive",
        rate: "lprate",
        sync: "lpsync",
        depth: "lpdepth",
        depthfrequency: "lpdepthfrequency",
        shape: "lpshape",
        dcoffset: "lpdc",
        skew: "lpskew"
      });
      be.type = "lowpass";
      const { filter: $e, lfo: Je } = mt(be);
      if (pe.lpf = [$e], pe.lpf_lfo = [Je], ae.connect($e), Je && ae.audioNodes.push(Je), ns === "24db") {
        const { filter: we, lfo: _e } = mt(be);
        pe.lpf.push(we), pe.lpf_lfo.push(_e), ae.connect(we), _e && ae.audioNodes.push(_e);
      }
    }
    if (J.hcutoff !== void 0) {
      const be = aa(J, {
        frequency: "hcutoff",
        q: "hresonance",
        attack: "hpattack",
        decay: "hpdecay",
        sustain: "hpsustain",
        release: "hprelease",
        env: "hpenv",
        anchor: "fanchor",
        model: "ftype",
        drive: "drive",
        rate: "hprate",
        sync: "hpsync",
        depth: "hpdepth",
        depthfrequency: "hpdepthfrequency",
        shape: "hpshape",
        dcoffset: "hpdc",
        skew: "hpskew"
      });
      be.type = "highpass";
      const { filter: $e, lfo: Je } = mt(be);
      if (pe.hpf = [$e], pe.hpf_lfo = [Je], Je && ae.audioNodes.push(Je), ae.connect($e), ns === "24db") {
        const { filter: we, lfo: _e } = mt(be);
        pe.hpf.push(we), pe.hpf_lfo.push(_e), ae.connect(we), _e && ae.audioNodes.push(_e);
      }
    }
    if (J.bandf !== void 0) {
      const be = aa(J, {
        frequency: "bandf",
        q: "bandq",
        attack: "bpattack",
        decay: "bpdecay",
        sustain: "bpsustain",
        release: "bprelease",
        env: "bpenv",
        anchor: "fanchor",
        model: "ftype",
        drive: "drive",
        rate: "bprate",
        sync: "bpsync",
        depth: "bpdepth",
        depthfrequency: "bpdepthfrequency",
        shape: "bpshape",
        dcoffset: "bpdc",
        skew: "bpskew"
      });
      be.type = "bandpass";
      const { filter: $e, lfo: Je } = mt(be);
      if (pe.bpf = [$e], pe.bpf_lfo = [Je], ae.connect($e), Je && ae.audioNodes.push(Je), ns === "24db") {
        const { filter: we, lfo: _e } = mt(be);
        pe.bpf.push(we), pe.bpf_lfo.push(_e), ae.connect(we), _e && ae.audioNodes.push(_e);
      }
    }
    if (J.vowel !== void 0) {
      const me = a.createVowelFilter(J.vowel);
      pe.vowel = me.filters, ae.connect(me);
    }
    if (J.coarse !== void 0) {
      const me = Dt(a, "coarse-processor", { coarse: J.coarse });
      pe.coarse = [me], ae.connect(me);
    }
    if (J.crush !== void 0) {
      const me = Dt(a, "crush-processor", { crush: J.crush });
      pe.crush = [me], ae.connect(me);
    }
    if (J.shape !== void 0) {
      const me = Dt(a, "shape-processor", { shape: J.shape, postgain: dn });
      pe.shape = [me], ae.connect(me);
    }
    if (J.distort !== void 0) {
      const me = V2(J.distort, hn, Nn);
      pe.distort = [me], ae.connect(me);
    }
    let Wn = J.tremolo;
    if (J.tremolosync != null && (Wn = s * J.tremolosync), Wn !== void 0) {
      const me = Math.max(1 - Xt, 0), be = new GainNode(a, { gain: me }), $e = i / s, Je = Is(a, {
        skew: J.tremoloskew ?? (J.tremoloshape != null ? 0.5 : 1),
        frequency: Wn,
        depth: Xt,
        time: $e,
        dcoffset: 0,
        shape: J.tremoloshape,
        phaseoffset: J.tremolophase,
        min: 0,
        max: 1,
        curve: 1.5,
        begin: t,
        end: Le
      });
      pe.tremolo = [Je], pe.tremolo_gain = [be], Je.connect(be.gain), ae.audioNodes.push(Je), ae.connect(be);
    }
    if (J.compressor !== void 0) {
      const me = w2(
        a,
        J.compressor,
        J.compressorRatio,
        J.compressorKnee,
        J.compressorAttack,
        J.compressorRelease
      );
      pe.compressor = [me], ae.connect(me);
    }
    if (J.pan !== void 0) {
      const me = a.createStereoPanner();
      pe.pan = [me], me.pan.value = 2 * J.pan - 1, ae.connect(me);
    }
    if (J.phaserrate !== void 0 && Fn > 0) {
      const { filterChain: me, lfo: be } = jS(
        t,
        Le,
        J.phaserrate,
        Fn,
        J.phasercenter,
        J.phasersweep
      );
      pe.phaser = [...me], pe.phaser_lfo = [be], me.forEach(($e) => ae.connect($e)), ae.audioNodes.push(be);
    }
    if (He !== "main" && De > 0 && qe > 0 && Oe > 0) {
      const me = je(1);
      Oe = gn(Oe, 0, 0.98);
      const be = a.createFeedbackDelay(1, qe, Oe), $e = je(De), Je = je(J.dry ?? 1), we = new GainNode(a, { gain: 1, channelCount: 2, channelCountMode: "explicit" });
      ae.connect(me).connect(Je, be).connectOne(1, $e).connect(we), ae.audioNodes.push(be.feedbackGain, be.delayGain), pe.delay = [be], pe.delay_mix = [$e];
    }
    if (He !== "main" && J.room > 0) {
      let me;
      if (J.ir !== void 0) {
        let Bt, Vt = is(J.ir);
        Array.isArray(Vt) ? Bt = Vt.data.samples[J.i % Vt.data.samples.length] : typeof Vt == "object" && (Bt = Object.values(Vt.data.samples).flat()[Ke % Object.values(Vt.data.samples).length]), me = await cr(Bt, a, J.ir, 0);
      }
      const be = je(1), $e = a.createReverb(
        J.roomsize,
        J.roomfade,
        J.roomlp,
        J.roomdim,
        me,
        J.irspeed,
        J.irbegin
      ), Je = je(J.room), we = je(J.dry ?? 1), _e = new GainNode(a, { gain: 1, channelCount: 2, channelCountMode: "explicit" });
      ae.connect(be).connect(we, $e).connectOne(1, Je).connect(_e), pe.room = [$e], pe.room_mix = [Je];
    }
  }
  if (at !== void 0 && at > w) {
    const ie = je(1);
    ie.gain.setValueAtTime(1, Pe + w), ie.gain.linearRampToValueAtTime(0, Le), ae.connect(ie);
  }
  const Mt = new GainNode(a, { gain: m });
  if (r.main.post = [Mt], ae.connect(Mt), D > 0 && L > 0 && X > 0) {
    const ie = Ce.getDelay(L, X, t);
    r.main.delay = [ie];
    const J = Ce.sendDelay(Mt, D);
    r.main.delay_mix = [J], ae.audioNodes.push(J);
  }
  if ($ > 0) {
    let ie;
    if (re !== void 0) {
      let pe, Te = is(re);
      Array.isArray(Te) ? pe = Te.data.samples[Ie % Te.data.samples.length] : typeof Te == "object" && (pe = Object.values(Te.data.samples).flat()[Ie % Object.values(Te.data.samples).length]), ie = await cr(pe, a, re, 0);
    }
    const J = Ce.getReverb(Me, I, Y, ee, ie, de, se);
    r.main.room = [J];
    const He = Ce.sendReverb(Mt, $);
    r.main.room_mix = [He], ae.audioNodes.push(He);
  }
  if (H != null) {
    const ie = u.getBus(H), J = Ai(Mt, ie, z);
    ae.audioNodes.push(J);
  }
  if (E != null) {
    const ie = Ce.getDjf(E, t);
    r.main.djf = [ie];
  }
  if (rt && !(a instanceof OfflineAudioContext)) {
    const ie = hM(rt, 2 ** (dt + 5)), J = Ai(Mt, ie, 1);
    ae.audioNodes.push(J);
  }
  if (V != null) {
    V = pn(V);
    const ie = new GainNode(a, { gain: V });
    ae.connect(ie), Ce.connectToOutput(ie);
  } else
    Ce.connectToOutput(Mt);
  O.forEach((ie, J) => {
    const He = J === O.length - 1 ? "main" : J;
    if (ie.lfo)
      for (const pe of ie.lfo.__ids) {
        const Te = ie.lfo[pe];
        Te.fxi ??= He;
        const Ct = z2(
          pe,
          {
            ...Te,
            cps: s,
            cycle: i,
            begin: t,
            end: Le
          },
          r
        );
        Ct && ae.audioNodes.push(Ct);
      }
    if (ie.env)
      for (const pe of ie.env.__ids) {
        const Te = ie.env[pe];
        Te.fxi ??= He;
        const Ct = N2(
          pe,
          {
            ...Te,
            begin: t,
            end: Le
          },
          r
        );
        Ct && ae.audioNodes.push(Ct);
      }
    if (ie.bmod)
      for (const pe of ie.bmod.__ids) {
        const Te = ie.bmod[pe];
        Te.fxi ??= He;
        const { toCleanup: Ct } = W2({ ...Te, begin: t }, r, as);
        ae.audioNodes.push(...Ct);
      }
  });
}, JS = (e, t, n, s) => {
  Sr(t, e - n, t.duration / s, s);
}, QS = ["triangle", "square", "sawtooth", "sine", "user", "one"], qS = [
  ["tri", "triangle"],
  ["sqr", "square"],
  ["saw", "sawtooth"],
  ["sin", "sine"]
];
function $S(e, t) {
  const n = e, s = new Float32Array(t);
  for (let i = 0; i < t; i++) {
    const r = i * 2 / t - 1;
    s[i] = Math.tanh(r * n);
  }
  return s;
}
function mM() {
  [...QS].forEach((e) => {
    sn(
      e,
      (t, n, s) => {
        const [i, r, a, u] = Nt(
          [n.attack, n.decay, n.sustain, n.release],
          "linear",
          [1e-3, 0.05, 0.6, 0.01]
        ), o = je(0.3), c = yM(e, t, n, () => {
          Re(o), s();
        }), { node: l, nodes: p, stop: m, triggerRelease: g } = c, { duration: y } = n, x = je(1), v = l.connect(o).connect(x), E = t + y;
        zt(v.gain, i, r, a, u, 0, 1, t, E, "linear");
        const w = E + u + 0.01;
        return g?.(w), m(w), {
          node: v,
          nodes: p,
          stop: (V) => {
            m(V);
          }
        };
      },
      { type: "synth", prebake: true }
    );
  }), sn(
    "sbd",
    (e, t, n) => {
      const { duration: s, decay: i = 0.5, pdecay: r = 0.5, penv: a = 36, clip: u } = t, o = ve(), c = 0.02, l = 1.2, p = 0.025, m = 1, g = o.createOscillator();
      g.type = "triangle", g.frequency.value = Kn(t, 29), g.detune.setValueAtTime(a * 100, 0), g.detune.setValueAtTime(a * 100, e), g.detune.exponentialRampToValueAtTime(1e-3, e + r);
      const y = je(1);
      y.gain.setValueAtTime(1, e + c), y.gain.exponentialRampToValueAtTime(1e-3, e + c + i), g.start(e);
      const x = ja("brown", e, 2), v = je(1);
      v.gain.setValueAtTime(l, e), v.gain.exponentialRampToValueAtTime(1e-3, e + p);
      const E = new WaveShaperNode(o);
      E.curve = $S(2, o.sampleRate);
      const w = je(m);
      bn(g, () => {
        Re(g), Re(y), Re(E), Re(x.node), Re(v), Re(w), n();
      });
      const V = g.connect(E).connect(y).connect(w);
      x.node.connect(v).connect(w);
      let X = e + i + 0.01;
      return u != null && (X = Math.min(e + u * s, X)), w.gain.setValueAtTime(m, X - 0.01), w.gain.linearRampToValueAtTime(0, X), g.stop(X), x.stop(X), {
        node: V,
        nodes: { source: [g] },
        stop: (Z) => {
          g.stop(Z);
        }
      };
    },
    { type: "synth", prebake: true }
  ), sn(
    "supersaw",
    (e, t, n) => {
      const s = ve();
      let { duration: i, n: r, unison: a = 5, spread: u = 0.6, detune: o } = t;
      o = o ?? r ?? 0.18;
      const c = Kn(t), [l, p, m, g] = Nt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 0.6, 0.01]
      ), y = e + i, x = y + g + 0.01, v = gn(a, 1, 100);
      let E = v > 1 ? gn(u, 0, 1) : 0;
      const w = {
        frequency: c,
        begin: e,
        end: x,
        freqspread: o,
        voices: v,
        panspread: E
      }, D = Ei("supersaw", () => new AudioWorkletNode(s, "supersaw-oscillator", { outputChannelCount: [2] }));
      Object.entries(w).forEach(([z, $]) => {
        const I = D.parameters.get(z), Y = $ !== void 0 ? $ : I.defaultValue;
        I.value = Y;
      }), D.port.postMessage({ type: "initialize" });
      const X = 1 / Math.sqrt(v);
      Bs(D.parameters.get("detune"), t, e, y);
      const Z = Vs(D.parameters.get("detune"), t, e), L = Fi(D.parameters.get("frequency"), t, e);
      let R = je(1);
      R = D.connect(R), zt(R.gain, l, p, m, g, 0, 0.3 * X, e, y, "linear");
      let H = mn(
        s,
        () => {
          Qu(D), n(), L?.stop(), Z?.stop();
        },
        e,
        x
      );
      return {
        node: R,
        nodes: { source: [D], ...L?.nodes, ...Z?.nodes },
        stop: (z) => {
          H.stop(z);
        }
      };
    },
    { prebake: true, type: "synth" }
  ), sn(
    "bytebeat",
    (e, t, n) => {
      const s = [
        "(t%255 >= t/255%255)*255",
        "(t*(t*8%60 <= 300)|(-t)*(t*4%512 < 256))+t/400",
        "t",
        "t*(t >> 10^t)",
        "t&128",
        "t&t>>8",
        "((t%255+t%128+t%64+t%32+t%16+t%127.8+t%64.8+t%32.8+t%16.8)/3)",
        "((t%64+t%63.8+t%64.15+t%64.35+t%63.5)/1.25)",
        "(t&(t>>7)-t)",
        "(sin(t*PI/128)*127+127)",
        "((t^t/2+t+64*(sin((t*PI/64)+(t*PI/32768))+64))%128*2)",
        "((t^t/2+t+64*(cos >> 0))%127.85*2)",
        "((t^t/2+t+64)%128*2)",
        "(((t * .25)^(t * .25)/100+(t * .25))%128)*2",
        "((t^t/2+t+64)%7 * 24)"
      ], { n: i = 0 } = t, r = Kn(t), { byteBeatExpression: a = s[i % s.length], byteBeatStartTime: u } = t, o = ve();
      let { duration: c } = t;
      const [l, p, m, g] = Nt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 0.6, 0.01]
      ), y = e + c, x = y + g + 0.01;
      let v = Dt(
        o,
        "byte-beat-processor",
        {
          frequency: r,
          begin: e,
          end: x
        },
        {
          outputChannelCount: [2]
        }
      );
      v.port.postMessage({ codeText: a, byteBeatStartTime: u, frequency: r });
      let E = je(1);
      E = v.connect(E), zt(E.gain, l, p, m, g, 0, 1, e, y, "linear");
      let w = mn(
        o,
        () => {
          Re(v), n();
        },
        e,
        x
      );
      return {
        node: E,
        source: v,
        stop: (V) => {
          w.stop(V);
        }
      };
    },
    { prebake: true, type: "synth" }
  ), sn(
    "pulse",
    (e, t, n) => {
      const s = ve();
      let { pwrate: i, pwsweep: r } = t;
      r == null && (i != null ? r = 0.3 : r = 0), i == null && r != null && (i = 1);
      let { duration: a, pw: u = 0.5 } = t;
      const o = Kn(t), [c, l, p, m] = Nt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 0.6, 0.01]
      ), g = e + a, y = g + m + 0.01;
      let x = Dt(
        s,
        "pulse-oscillator",
        {
          frequency: o,
          begin: e,
          end: y,
          pulsewidth: u
        },
        {
          outputChannelCount: [2]
        }
      );
      Bs(x.parameters.get("detune"), t, e, g);
      const v = Vs(x.parameters.get("detune"), t, e), E = Fi(x.parameters.get("frequency"), t, e);
      let w = je(1);
      w = x.connect(w), zt(w.gain, c, l, p, m, 0, 1, e, g, "linear");
      let V;
      r != 0 && (V = Is(s, { frequency: i, depth: r, begin: e, end: y }), V.connect(x.parameters.get("pulsewidth")));
      let D = mn(
        s,
        () => {
          Re(x), Re(V), n(), E?.stop(), v?.stop();
        },
        e,
        y
      );
      return {
        node: w,
        nodes: { source: [x], pw_lfo: [V], ...E?.nodes, ...v?.nodes },
        stop: (X) => {
          D.stop(X);
        }
      };
    },
    { prebake: true, type: "synth" }
  ), sn(
    "bus",
    (e, t, n) => {
      const s = ve(), [i, r, a, u] = Nt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 1, 0.01]
      ), o = e + t.duration, c = o + u + 0.01, l = Xr().getBus(t.n ?? 0), p = l.connect(je(0));
      zt(p.gain, i, r, a, u, 0, 1, e, o, "linear");
      const m = mn(
        s,
        () => {
          l.disconnect(p), n();
        },
        e,
        c
      );
      return {
        node: p,
        nodes: { source: [l] },
        stop: (g) => {
          m.stop(g);
        }
      };
    },
    { prebake: true, type: "input" }
  ), [...qu].forEach((e) => {
    sn(
      e,
      (t, n, s) => {
        const [i, r, a, u] = Nt(
          [n.attack, n.decay, n.sustain, n.release],
          "linear",
          [1e-3, 0.05, 0.6, 0.01]
        );
        let o, { density: c } = n;
        o = ja(e, t, c);
        let { node: l, stop: p, triggerRelease: m } = o;
        const g = je(0.3), { duration: y } = n;
        bn(l, () => {
          Re(l), Re(g), s();
        });
        const x = je(1);
        let v = l.connect(g).connect(x);
        const E = t + y;
        zt(v.gain, i, r, a, u, 0, 1, t, E, "linear");
        const w = E + u + 0.01;
        return m?.(w), p(w), {
          node: v,
          nodes: { source: [l] },
          stop: (V) => {
            p(V);
          }
        };
      },
      { type: "synth", prebake: true }
    );
  }), qS.forEach(([e, t]) => an.set({ ...an.get(), [e]: an.get()[t] }));
}
const Dc = 2 * Math.PI;
function fM(e, t, n) {
  e = typeof e == "object" ? e : new Float32Array(e).fill(1);
  const i = e.length, r = new Float32Array(i + 1), a = new Float32Array(i + 1), u = ve(), o = u.createOscillator(), c = {
    sawtooth: (p) => [0, -1 / p],
    square: (p) => [0, p % 2 === 0 ? 0 : 1 / p],
    triangle: (p) => [p % 2 === 0 ? 0 : 1 / (p * p), 0],
    user: (p) => [0, 1]
  };
  if (!c[n])
    throw new Error(`unknown wave type ${n}`);
  for (let p = 0; p < i; p++) {
    const m = e[p], [g, y] = c[n](p + 1), x = t?.[p] ?? 0;
    let v = g * m, E = y * m;
    if (x !== 0) {
      const w = Math.cos(Dc * x), V = Math.sin(Dc * x);
      v = w * v - V * E, E = V * v + w * E;
    }
    r[p + 1] = v, a[p + 1] = E;
  }
  const l = u.createPeriodicWave(r, a);
  return o.setPeriodicWave(l), o;
}
function yM(e, t, n, s) {
  const { duration: i, noise: r = 0 } = n, a = n.partials ?? n.n;
  let u;
  if (e === "user" && !a && (lt(
    "[superdough] Synth 'user' was selected, but partials not specified. Defaulting to triangle. Use pat.partials to setup custom waveform"
  ), e = "triangle"), e = e === "user" && !a ? "triangle" : e, e === "one")
    return u = new ConstantSourceNode(ve(), { offset: 1 }), u.start(t), {
      node: u,
      nodes: { source: u },
      stop: (p) => u?.stop(p)
    };
  !a || a?.length === 0 || e === "sine" ? (u = ve().createOscillator(), u.type = e || "triangle") : u = fM(a, n.phases, e), u.frequency.value = Kn(n);
  const o = Vs(u.detune, n, t);
  Bs(u.detune, n, t, t + i);
  const c = Fi(u.frequency, n, t);
  let l;
  return r && (l = ID(u, r, t)), bn(u, () => {
    l?.teardown(), Re(u), Re(l?.node), s();
  }), u.start(t), {
    node: l?.node || u,
    nodes: { source: [u], ...o?.nodes, ...c?.nodes },
    stop: (p) => {
      c.stop(p), o?.stop(p), l?.stop(p), u.stop(p);
    },
    triggerRelease: (p) => {
    }
  };
}
function ew(e = 1, t = 0.05, n = 220, s = 0, i = 0, r = 0.1, a = 0, u = 1, o = 0, c = 0, l = 0, p = 0, m = 0, g = 0, y = 0, x = 0, v = 0, E = 1, w = 0, V = 0) {
  let D = Math.PI * 2, X = ve().sampleRate, Z = (Ie) => Ie > 0 ? 1 : -1, L = o *= 500 * D / X / X, R = n *= (1 + t * 2 * Math.random() - t) * D / X, H = [], z = 0, $ = 0, I = 0, Y = 1, ee = 0, Me = 0, re = 0, de, se;
  for (s = s * X + 9, w *= X, i *= X, r *= X, v *= X, c *= 500 * D / X ** 3, y *= D / X, l *= D / X, p *= X, m = m * X | 0, se = s + w + i + r + v | 0; I < se; H[I++] = re)
    ++Me % (x * 100 | 0) || (re = a ? a > 1 ? a > 2 ? a > 3 ? Math.sin((z % D) ** 3) : Math.max(Math.min(Math.tan(z), 1), -1) : 1 - (2 * z / D % 2 + 2) % 2 : 1 - 4 * Math.abs(Math.round(z / D) - z / D) : Math.sin(z), re = (m ? 1 - V + V * Math.sin(D * I / m) : 1) * Z(re) * Math.abs(re) ** u * // curve 0=square, 2=pointy
    e * 1 * // envelope
    (I < s ? I / s : I < s + w ? 1 - (I - s) / w * (1 - E) : I < s + w + i ? E : I < se - v ? (se - I - v) / r * // release falloff
    E : 0), re = v ? re / 2 + (v > I ? 0 : (I < se - v ? 1 : (se - I) / v) * // release delay
    H[I - v | 0] / 2) : re), de = (n += o += c) * // frequency
    Math.cos(y * $++), z += de - de * g * (1 - (Math.sin(I) + 1) * 1e9 % 2), Y && ++Y > p && (n += l, R += l, Y = 0), m && !(++ee % m) && (n = R, o = L, Y ||= 1);
  return H;
}
const gM = (e, t) => {
  let {
    s: n,
    note: s = 36,
    freq: i,
    //
    zrand: r = 0,
    attack: a = 0,
    decay: u = 0,
    sustain: o = 0.8,
    release: c = 0.1,
    curve: l = 1,
    slide: p = 0,
    deltaSlide: m = 0,
    pitchJump: g = 0,
    pitchJumpTime: y = 0,
    lfo: x = 0,
    znoise: v = 0,
    zmod: E = 0,
    zcrush: w = 0,
    zdelay: V = 0,
    tremolo: D = 0,
    duration: X = 0.2,
    zzfx: Z
  } = e;
  const L = Math.max(X - a - u, 0);
  typeof s == "string" && (s = Fr(s)), !i && typeof s == "number" && (i = A2(s)), n = n.replace("z_", "");
  const R = ["sine", "triangle", "sawtooth", "tan", "noise"].indexOf(n) || 0;
  l = n === "square" ? 0 : l;
  const z = (
    /* ZZFX. */
    ew(...Z || [
      0.25,
      // volume
      r,
      i,
      a,
      L,
      c,
      R,
      l,
      p,
      m,
      g,
      y,
      x,
      v,
      E,
      w,
      V,
      o,
      // sustain volume!
      u,
      D
    ])
  ), $ = ve(), I = $.createBuffer(1, z.length, $.sampleRate);
  I.getChannelData(0).set(z);
  const Y = ve().createBufferSource();
  return Y.buffer = I, Y.start(t), {
    node: Y
  };
};
function tw() {
  ["zzfx", "z_sine", "z_sawtooth", "z_triangle", "z_square", "z_tan", "z_noise"].forEach((e) => {
    sn(
      e,
      (t, n, s) => {
        const { node: i } = gM({ s: e, ...n }, t);
        return bn(i, () => {
          Re(i), s();
        }), {
          node: i,
          nodes: { source: [i] },
          stop: () => {
          }
        };
      },
      { type: "synth", prebake: true }
    );
  });
}
let ws;
async function bM(e, t) {
  const n = `dsp-worklet-${Date.now()}`, s = `${t}
let __q = []; // trigger queue
class MyProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.t = 0;
    this.stopped = false;
    this.port.onmessage = (e) => {
      if(e.data==='stop') {
        this.stopped = true;
      } else if(e.data?.dough) {
        __q.push(e.data)
      } else {
        msg?.(e.data)
      }
    };
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    if(__q.length) {
      for(let i=0;i<__q.length;++i) {
        const deadline = __q[i].time-currentTime;
        if(deadline<=0) {
          trigger(__q[i].dough)
          __q.splice(i,1)
        }
      }
    }
    for (let i = 0; i < output[0].length; i++) {
      const out = dsp(this.t / sampleRate);
      output.forEach((channel) => {
        channel[i] = out;
      });
      this.t++;
    }
  return !this.stopped;
  }
}
registerProcessor('${n}', MyProcessor);
`, r = `data:text/javascript;base64,${btoa(s)}`;
  await e.audioWorklet.addModule(r);
  const a = new AudioWorkletNode(e, n);
  return { node: a, stop: () => a.port.postMessage("stop") };
}
const MM = () => {
  ws && (ws?.stop(), ws?.node?.disconnect());
};
typeof window < "u" && window.addEventListener("message", (e) => {
  e.data === "strudel-stop" ? MM() : e.data?.dough && ws?.node.port.postMessage(e.data);
});
const nw = async (e) => {
  const t = ve();
  MM(), ws = await bM(t, e), ws.node.connect(t.destination);
};
function CM(e, t, n, s) {
  window.postMessage({ time: s, dough: e.value, currentTime: t, duration: e.duration, cps: n });
}
let mi;
function sw() {
  const e = ve();
  mi = Dt(
    e,
    "dough-processor",
    {},
    {
      outputChannelCount: [2]
    }
  ), dM(mi);
}
const er = /* @__PURE__ */ new Map(), Sc = /* @__PURE__ */ new Map();
_.prototype.supradough = function() {
  return this.onTrigger((e, t, n, s) => {
    e.value._begin = s, e.value._duration = e.duration / n, !mi && sw();
    const i = (e.value.bank ? e.value.bank + "_" : "") + e.value.s, r = e.value.n ?? 0, a = `${i}:${r}`;
    if (er.has(i) && (e.value.s = a), er.has(i) && !Sc.has(a)) {
      const u = er.get(i), o = u[r % u.length];
      console.log(`load ${a} from ${o}`);
      const c = aw(o);
      Sc.set(a, c), c.then(
        ({ channels: l, sampleRate: p }) => mi.port.postMessage({
          sample: a,
          channels: l,
          sampleRate: p
        })
      );
    }
    mi.port.postMessage({ spawn: e.value });
  }, 1);
};
function iw(e, t = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let [n, s] = e.split("github:");
  return s = s.endsWith("/") ? s.slice(0, -1) : s, s.split("/").length === 2 && (s += "/main"), `https://raw.githubusercontent.com/${s}/${t}`;
}
async function rw(e) {
  if (e.startsWith("github:") && (e = iw(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432"), e.startsWith("shabda:")) {
    let [s, i] = e.split("shabda:");
    e = `https://shabda.ndre.gr/${i}.json?strudel=1`;
  }
  if (e.startsWith("shabda/speech")) {
    let [s, i] = e.split("shabda/speech");
    i = i.startsWith("/") ? i.substring(1) : i;
    let [r, a] = i.split(":"), u = "f", o = "en-GB";
    r && ([o, u] = r.split("/")), e = `https://shabda.ndre.gr/speech/${a}.json?gender=${u}&language=${o}&strudel=1'`;
  }
  if (typeof fetch != "function")
    return;
  const t = e.split("/").slice(0, -1).join("/");
  if (typeof fetch > "u")
    return;
  const n = await fetch(e).then((s) => s.json()).catch((s) => {
    throw console.error(s), new Error(`error loading "${e}"`);
  });
  return [n, n._base || t];
}
async function aw(e) {
  const t = await fetch(e).then((s) => s.arrayBuffer()).then((s) => ve().decodeAudioData(s));
  let n = [];
  for (let s = 0; s < t.numberOfChannels; s++)
    n.push(t.getChannelData(s));
  return { channels: n, sampleRate: t.sampleRate };
}
async function xM(e, t) {
  if (typeof e == "string") {
    const [n, s] = await rw(e);
    return xM(n, s);
  }
  Object.entries(e).map(async ([n, s]) => {
    n !== "_base" && (s = s.map((i) => t + i), er.set(n, s));
  });
}
const uw = "data:text/javascript;base64,dmFyIGh0PU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgbnQ9KHUsbSxmKT0+bSBpbiB1P2h0KHUsbSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6Zn0pOnVbbV09Zjt2YXIgZT0odSxtLGYpPT5udCh1LHR5cGVvZiBtIT0ic3ltYm9sIj9tKyIiOm0sZik7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IHU9dHlwZW9mIHNhbXBsZVJhdGU8InUiP3NhbXBsZVJhdGU6NDhlMyxtPU1hdGguUEkvdSxmPTEvdTtsZXQgVj1oPT5NYXRoLnBvdyhoLDIpO2NvbnN0IE89KGgscyx0KT0+TWF0aC5taW4oTWF0aC5tYXgoaCxzKSx0KTtmdW5jdGlvbiBfKGgpe3JldHVybiBWKGgpfWZ1bmN0aW9uIFQoaCxzLHQpe2NvbnN0IGk9TWF0aC5zaW4oKDEtdCkqLjUqTWF0aC5QSSksbj1NYXRoLnNpbih0Ki41Kk1hdGguUEkpO3JldHVybiBoKmkrcypufWNsYXNzIGd7Y29uc3RydWN0b3IoKXtlKHRoaXMsInBoYXNlIiwwKX11cGRhdGUocyl7Y29uc3QgdD1NYXRoLnNpbih0aGlzLnBoYXNlKjIqTWF0aC5QSSk7cmV0dXJuIHRoaXMucGhhc2U9KHRoaXMucGhhc2Urcy91KSUxLHR9fWNsYXNzIEl7Y29uc3RydWN0b3IoKXtlKHRoaXMsInBoYXNlIiwwKX11cGRhdGUocyl7cmV0dXJuIHRoaXMucGhhc2UrPWYqcyx0aGlzLnBoYXNlJTEqMi0xfX1mdW5jdGlvbiBNKGgscyl7cmV0dXJuIGg8cz8oaC89cyxoK2gtaCpoLTEpOmg+MS1zPyhoPShoLTEpL3MsaCpoK2graCsxKTowfWNsYXNzIFN7Y29uc3RydWN0b3Iocz17fSl7dGhpcy5waGFzZT1zLnBoYXNlPz8wfXVwZGF0ZShzKXtjb25zdCB0PXMvdTtsZXQgaT1NKHRoaXMucGhhc2UsdCksbj0yKnRoaXMucGhhc2UtMS1pO3JldHVybiB0aGlzLnBoYXNlKz10LHRoaXMucGhhc2U+MSYmKHRoaXMucGhhc2UtPTEpLG59fWZ1bmN0aW9uIHooaCxzLHQpe3JldHVybiBoPDI/MDooKG4sbCxyKT0+cioobC1uKStuKSgtcyouNSxzKi41LHQvKGgtMSkpfWZ1bmN0aW9uIEYoaCxzKXtyZXR1cm4gaCpNYXRoLnBvdygyLHMvMTIpfWNsYXNzIEx7Y29uc3RydWN0b3Iocz17fSl7dGhpcy52b2ljZXM9cy52b2ljZXM/PzUsdGhpcy5mcmVxc3ByZWFkPXMuZnJlcXNwcmVhZD8/LjIsdGhpcy5wYW5zcHJlYWQ9cy5wYW5zcHJlYWQ/Py40LHRoaXMucGhhc2U9bmV3IEZsb2F0MzJBcnJheSh0aGlzLnZvaWNlcykubWFwKCgpPT5NYXRoLnJhbmRvbSgpKX11cGRhdGUocyl7Y29uc3QgdD1NYXRoLnNxcnQoMS10aGlzLnBhbnNwcmVhZCksaT1NYXRoLnNxcnQodGhpcy5wYW5zcHJlYWQpO2xldCBuPTAsbD0wO2ZvcihsZXQgcj0wO3I8dGhpcy52b2ljZXM7cisrKXtjb25zdCBhPUYocyx6KHRoaXMudm9pY2VzLHRoaXMuZnJlcXNwcmVhZCxyKSkvdSxjPShyJjEpPT0xO2xldCBkPXQ7YyYmKGQ9aSk7bGV0IGI9TSh0aGlzLnBoYXNlW3JdLGEpLEU9Mip0aGlzLnBoYXNlW3JdLTEtYjtuPW4rRSpkLGw9bCtFKmQsdGhpcy5waGFzZVtyXSs9YSx0aGlzLnBoYXNlW3JdPjEmJih0aGlzLnBoYXNlW3JdLT0xKX1yZXR1cm4gbitsfX1jbGFzcyBre2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJwaGFzZSIsMCl9dXBkYXRlKHMpe3RoaXMucGhhc2UrPWYqcztsZXQgdD10aGlzLnBoYXNlJTE7cmV0dXJuKHQ8LjU/Mip0OjEtMioodC0uNSkpKjItMX19Y2xhc3MgcXtjb25zdHJ1Y3Rvcigpe2UodGhpcywiczAiLDApO2UodGhpcywiczEiLDApfXVwZGF0ZShzLHQsaT0wKXtpPU1hdGgubWF4KGksMCksdD1NYXRoLm1pbih0LDJlNCk7bGV0IG49MipNYXRoLnNpbih0Km0pO249TyhuLDAsMS4xNCk7Y29uc3Qgcj0xLU1hdGgucG93KC41LChpKy4xMjUpLy4xMjUpKm47cmV0dXJuIHRoaXMuczA9cip0aGlzLnMwLW4qdGhpcy5zMStuKnMsdGhpcy5zMT1yKnRoaXMuczErbip0aGlzLnMwLHRoaXMuczF9fWNsYXNzIEN7Y29uc3RydWN0b3Iocz0wKXt0aGlzLnBoYXNlPXN9c2F3KHMsdCl7bGV0IGk9KHRoaXMucGhhc2UrcyklMSxuPU0oaSx0KTtyZXR1cm4gMippLTEtbn11cGRhdGUocyx0PS41KXtjb25zdCBpPXMvdTtsZXQgbj10aGlzLnNhdygwLGkpLXRoaXMuc2F3KHQsaSk7cmV0dXJuIHRoaXMucGhhc2U9KHRoaXMucGhhc2UraSklMSxuK3QqMi0xfX1jbGFzcyBOe2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJwaGFzZSIsMCl9dXBkYXRlKHMsdD0uNSl7cmV0dXJuIHRoaXMucGhhc2UrPWYqcyx0aGlzLnBoYXNlJTE8dD8xOi0xfX1jbGFzcyBQe2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJ1cGRhdGUiLHM9Pk1hdGgucmFuZG9tKCk8cypmP01hdGgucmFuZG9tKCk6MCl9fWNsYXNzIEd7dXBkYXRlKCl7cmV0dXJuIE1hdGgucmFuZG9tKCkqMi0xfX1jbGFzcyBqe2NvbnN0cnVjdG9yKCl7dGhpcy5vdXQ9MH11cGRhdGUoKXtsZXQgcz1NYXRoLnJhbmRvbSgpKjItMTtyZXR1cm4gdGhpcy5vdXQ9KHRoaXMub3V0Ky4wMipzKS8xLjAyLHRoaXMub3V0fX1jbGFzcyBCe2NvbnN0cnVjdG9yKCl7dGhpcy5iMD0wLHRoaXMuYjE9MCx0aGlzLmIyPTAsdGhpcy5iMz0wLHRoaXMuYjQ9MCx0aGlzLmI1PTAsdGhpcy5iNj0wfXVwZGF0ZSgpe2NvbnN0IHM9TWF0aC5yYW5kb20oKSoyLTE7dGhpcy5iMD0uOTk4ODYqdGhpcy5iMCtzKi4wNTU1MTc5LHRoaXMuYjE9Ljk5MzMyKnRoaXMuYjErcyouMDc1MDc1OSx0aGlzLmIyPS45NjkqdGhpcy5iMitzKi4xNTM4NTIsdGhpcy5iMz0uODY2NSp0aGlzLmIzK3MqLjMxMDQ4NTYsdGhpcy5iND0uNTUqdGhpcy5iNCtzKi41MzI5NTIyLHRoaXMuYjU9LS43NjE2KnRoaXMuYjUtcyouMDE2ODk4O2NvbnN0IHQ9dGhpcy5iMCt0aGlzLmIxK3RoaXMuYjIrdGhpcy5iMyt0aGlzLmI0K3RoaXMuYjUrdGhpcy5iNitzKi41MzYyO3JldHVybiB0aGlzLmI2PXMqLjExNTkyNix0Ki4xMX19Y2xhc3MgJHtjb25zdHJ1Y3Rvcigpe2UodGhpcywicGhhc2UiLDEpfXVwZGF0ZShzKXt0aGlzLnBoYXNlKz1mKnM7bGV0IHQ9dGhpcy5waGFzZT49MT8xOjA7cmV0dXJuIHRoaXMucGhhc2U9dGhpcy5waGFzZSUxLHR9fWZ1bmN0aW9uIHgoaCxzLHQsaT0xKXtpZihoPD0wKXJldHVybiBzO2lmKGg+PTEpcmV0dXJuIHQ7bGV0IG47cmV0dXJuIGk9PT0wP249aDppPjA/bj1NYXRoLnBvdyhoLGkpOm49MS1NYXRoLnBvdygxLWgsLWkpLHMrKHQtcykqbn1jbGFzcyB2e2NvbnN0cnVjdG9yKHM9e30pe3RoaXMuc3RhdGU9Im9mZiIsdGhpcy5zdGFydFRpbWU9MCx0aGlzLnN0YXJ0VmFsPTAsdGhpcy5kZWNheUN1cnZlPXMuZGVjYXlDdXJ2ZT8/MX11cGRhdGUocyx0LGksbixsLHIpe3N3aXRjaCh0aGlzLnN0YXRlKXtjYXNlIm9mZiI6cmV0dXJuIHQ+MCYmKHRoaXMuc3RhdGU9ImF0dGFjayIsdGhpcy5zdGFydFRpbWU9cyx0aGlzLnN0YXJ0VmFsPTApLDA7Y2FzZSJhdHRhY2siOntsZXQgcD1zLXRoaXMuc3RhcnRUaW1lO3JldHVybiBwPmk/KHRoaXMuc3RhdGU9ImRlY2F5Iix0aGlzLnN0YXJ0VGltZT1zLDEpOngocC9pLHRoaXMuc3RhcnRWYWwsMSwxKX1jYXNlImRlY2F5Ijp7bGV0IHA9cy10aGlzLnN0YXJ0VGltZSxhPXgocC9uLDEsbCwtdGhpcy5kZWNheUN1cnZlKTtyZXR1cm4gdDw9MD8odGhpcy5zdGF0ZT0icmVsZWFzZSIsdGhpcy5zdGFydFRpbWU9cyx0aGlzLnN0YXJ0VmFsPWEsYSk6cD5uPyh0aGlzLnN0YXRlPSJzdXN0YWluIix0aGlzLnN0YXJ0VGltZT1zLGwpOmF9Y2FzZSJzdXN0YWluIjpyZXR1cm4gdDw9MCYmKHRoaXMuc3RhdGU9InJlbGVhc2UiLHRoaXMuc3RhcnRUaW1lPXMsdGhpcy5zdGFydFZhbD1sKSxsO2Nhc2UicmVsZWFzZSI6e2xldCBwPXMtdGhpcy5zdGFydFRpbWU7aWYocD5yKXJldHVybiB0aGlzLnN0YXRlPSJvZmYiLDA7bGV0IGE9eChwL3IsdGhpcy5zdGFydFZhbCwwLC10aGlzLmRlY2F5Q3VydmUpO3JldHVybiB0PjAmJih0aGlzLnN0YXRlPSJhdHRhY2siLHRoaXMuc3RhcnRUaW1lPXMsdGhpcy5zdGFydFZhbD1hKSxhfX10aHJvdyJpbnZhbGlkIGVudmVsb3BlIHN0YXRlIn19Y29uc3QgVz0xMDtjbGFzcyBSe2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJ3cml0ZUlkeCIsMCk7ZSh0aGlzLCJyZWFkSWR4IiwwKTtlKHRoaXMsImJ1ZmZlciIsbmV3IEZsb2F0MzJBcnJheShXKnUpKX13cml0ZShzLHQpe3RoaXMud3JpdGVJZHg9KHRoaXMud3JpdGVJZHgrMSkldGhpcy5idWZmZXIubGVuZ3RoLHRoaXMuYnVmZmVyW3RoaXMud3JpdGVJZHhdPXM7bGV0IGk9TWF0aC5taW4oTWF0aC5mbG9vcih1KnQpLHRoaXMuYnVmZmVyLmxlbmd0aC0xKTt0aGlzLnJlYWRJZHg9dGhpcy53cml0ZUlkeC1pLHRoaXMucmVhZElkeDwwJiYodGhpcy5yZWFkSWR4Kz10aGlzLmJ1ZmZlci5sZW5ndGgpfXVwZGF0ZShzLHQpe3JldHVybiB0aGlzLndyaXRlKHMsdCksdGhpcy5idWZmZXJbdGhpcy5yZWFkSWR4XX19Y2xhc3MgWHtjb25zdHJ1Y3Rvcigpe2UodGhpcywiZGVsYXkiLG5ldyBSKTtlKHRoaXMsIm1vZHVsYXRvciIsbmV3IGspfXVwZGF0ZShzLHQsaSxuLGwpe2NvbnN0IHI9dGhpcy5tb2R1bGF0b3IudXBkYXRlKG4pKmwscD10aGlzLmRlbGF5LnVwZGF0ZShzLGkqKDErcikpO3JldHVybiBUKHMscCx0KX19Y2xhc3MgVXtjb25zdHJ1Y3Rvcigpe2UodGhpcywiaG9sZCIsMCk7ZSh0aGlzLCJ0IiwwKX11cGRhdGUocyx0KXtyZXR1cm4gdGhpcy50KysldD09PTAmJih0aGlzLnQ9MCx0aGlzLmhvbGQ9cyksdGhpcy5ob2xkfX1jbGFzcyBZe3VwZGF0ZShzLHQpe3Q9TWF0aC5tYXgoMSx0KTtjb25zdCBpPU1hdGgucG93KDIsdC0xKTtyZXR1cm4gTWF0aC5yb3VuZChzKmkpL2l9fWNsYXNzIFp7dXBkYXRlKHMsdD0wLGk9MSl7aT1NYXRoLm1heCguMDAxLE1hdGgubWluKDEsaSkpO2NvbnN0IG49TWF0aC5leHBtMSh0KTtyZXR1cm4oMStuKSpzLygxK24qTWF0aC5hYnMocykpKml9fWNsYXNzIHd7Y29uc3RydWN0b3Iocyx0LGkpe2UodGhpcywiYnVmZmVyIik7ZSh0aGlzLCJzYW1wbGVSYXRlIik7ZSh0aGlzLCJwb3MiLDApO2UodGhpcywic2FtcGxlRnJlcSIsQSgpKTt0aGlzLmJ1ZmZlcj1zLHRoaXMuc2FtcGxlUmF0ZT10LHRoaXMuZHVyYXRpb249dGhpcy5idWZmZXIubGVuZ3RoL3RoaXMuc2FtcGxlUmF0ZSx0aGlzLnNwZWVkPXUvdGhpcy5zYW1wbGVSYXRlLGkmJih0aGlzLnNwZWVkKj10aGlzLmR1cmF0aW9uKX11cGRhdGUocyl7aWYodGhpcy5wb3M+PXRoaXMuYnVmZmVyLmxlbmd0aClyZXR1cm4gMDtjb25zdCB0PXMvdGhpcy5zYW1wbGVGcmVxKnRoaXMuc3BlZWQ7bGV0IGk9dGhpcy5idWZmZXJbTWF0aC5mbG9vcih0aGlzLnBvcyldO3JldHVybiB0aGlzLnBvcz10aGlzLnBvcyt0LGl9fWUodywic2FtcGxlcyIsbmV3IE1hcCk7Y29uc3QgeT0oaCxzPSJsaW5lYXIiLHQpPT57Y29uc3RbcixwLGEsY109aDtpZihyPT1udWxsJiZwPT1udWxsJiZhPT1udWxsJiZjPT1udWxsKXJldHVybiB0Pz9bLjAwMSwuMDAxLDEsLjAxXTtjb25zdCBkPWE/PyhyIT1udWxsJiZwPT1udWxsfHxyPT1udWxsJiZwPT1udWxsPzE6LjAwMSk7cmV0dXJuW01hdGgubWF4KHI/PzAsLjAwMSksTWF0aC5tYXgocD8/MCwuMDAxKSxNYXRoLm1pbihkLDEpLE1hdGgubWF4KGM/PzAsLjAxKV19O2xldCBEPXtzaW5lOmcsc2F3OlMsemF3Okksc2F3dG9vdGg6Uyx6YXd0b290aDpJLHN1cGVyc2F3OkwsdHJpOmssdHJpYW5nbGU6ayxwdWxzZTpDLHNxdWFyZTpDLHB1bHplOk4sZHVzdDpQLGNyYWNrbGU6UCxpbXB1bHNlOiQsd2hpdGU6Ryxicm93bjpqLHBpbms6Qn07Y29uc3QgSD17Y2hvcnVzOjAsbm90ZTo0OCxzOiJ0cmlhbmdsZSIsYmFuazoiIixnYWluOjEscG9zdGdhaW46MSx2ZWxvY2l0eToxLGRlbnNpdHk6Ii4wMyIsZnR5cGU6IjEyZGIiLGZhbmNob3I6MCxyZXNvbmFuY2U6MCxocmVzb25hbmNlOjAsYmFuZHE6MCxjaGFubmVsczpbMSwyXSxwaGFzZXJkZXB0aDouNzUsc2hhcGV2b2w6MSxkaXN0b3J0dm9sOjEsZGVsYXk6MCxieXRlQmVhdEV4cHJlc3Npb246IjAiLGRlbGF5ZmVlZGJhY2s6LjUsZGVsYXlzcGVlZDoxLGRlbGF5dGltZTouMjUsb3JiaXQ6MSxpOjEsZmZ0OjgsejoidHJpYW5nbGUiLHBhbjouNSxmbWg6MSxmbWVudjowLHNwZWVkOjEscHc6LjV9O2xldCBvPWg9PkhbaF07Y29uc3QgSj17YzowLGQ6MixlOjQsZjo1LGc6NyxhOjksYjoxMX0sSz17IiMiOjEsYjotMSxzOjEsZjotMX0sUT0oaCxzPTMpPT57dmFyIGE7bGV0W3QsaT0iIixuPSIiXT0oKGE9U3RyaW5nKGgpLm1hdGNoKC9eKFthLWdBLUddKShbI2JzZl0qKShbMC05XSopJC8pKT09bnVsbD92b2lkIDA6YS5zbGljZSgxKSl8fFtdO2lmKCF0KXRocm93IG5ldyBFcnJvcignbm90IGEgbm90ZTogIicraCsnIicpO2NvbnN0IGw9Slt0LnRvTG93ZXJDYXNlKCldLHI9KGk9PW51bGw/dm9pZCAwOmkuc3BsaXQoIiIpLnJlZHVjZSgoYyxkKT0+YytLW2RdLDApKXx8MDtyZXR1cm4oTnVtYmVyKG58fHMpKzEpKjEyK2wrcn0sdHQ9aD0+TWF0aC5wb3coMiwoaC02OSkvMTIpKjQ0MCxBPWg9PihoPWh8fG8oIm5vdGUiKSx0eXBlb2YgaD09InN0cmluZyImJihoPVEoaCwzKSksdHQoaCkpO2NsYXNzIHN0e2NvbnN0cnVjdG9yKHMpe2UodGhpcywiaWQiLDApO2UodGhpcywib3V0IixbMCwwXSk7ZSh0aGlzLCJhdHRhY2siKTtlKHRoaXMsImRlY2F5Iik7ZSh0aGlzLCJzdXN0YWluIik7ZSh0aGlzLCJyZWxlYXNlIik7ZSh0aGlzLCJfYmVnaW4iKTtlKHRoaXMsIl9kdXJhdGlvbiIpO2UodGhpcywiX3NvdW5kIik7ZSh0aGlzLCJfY2hhbm5lbHMiLDEpO2UodGhpcywiX2J1ZmZlcnMiKTtlKHRoaXMsInVuaXQiKTtlKHRoaXMsIl9wZW52Iik7ZSh0aGlzLCJwZW52Iik7ZSh0aGlzLCJwYXR0YWNrIik7ZSh0aGlzLCJwZGVjYXkiKTtlKHRoaXMsInBzdXN0YWluIik7ZSh0aGlzLCJwcmVsZWFzZSIpO2UodGhpcywidmliIik7ZSh0aGlzLCJfdmliIik7ZSh0aGlzLCJ2aWJtb2QiKTtlKHRoaXMsIl9mbSIpO2UodGhpcywiZm1oIik7ZSh0aGlzLCJmbWkiKTtlKHRoaXMsIl9mbWVudiIpO2UodGhpcywiZm1hdHRhY2siKTtlKHRoaXMsImZtZGVjYXkiKTtlKHRoaXMsImZtc3VzdGFpbiIpO2UodGhpcywiZm1yZWxlYXNlIik7ZSh0aGlzLCJfbHBlbnYiKTtlKHRoaXMsImxwZW52Iik7ZSh0aGlzLCJscGF0dGFjayIpO2UodGhpcywibHBkZWNheSIpO2UodGhpcywibHBzdXN0YWluIik7ZSh0aGlzLCJscHJlbGVhc2UiKTtlKHRoaXMsIl9ocGVudiIpO2UodGhpcywiaHBlbnYiKTtlKHRoaXMsImhwYXR0YWNrIik7ZSh0aGlzLCJocGRlY2F5Iik7ZSh0aGlzLCJocHN1c3RhaW4iKTtlKHRoaXMsImhwcmVsZWFzZSIpO2UodGhpcywiX2JwZW52Iik7ZSh0aGlzLCJicGVudiIpO2UodGhpcywiYnBhdHRhY2siKTtlKHRoaXMsImJwZGVjYXkiKTtlKHRoaXMsImJwc3VzdGFpbiIpO2UodGhpcywiYnByZWxlYXNlIik7ZSh0aGlzLCJjdXRvZmYiKTtlKHRoaXMsImhjdXRvZmYiKTtlKHRoaXMsImJhbmRmIik7ZSh0aGlzLCJjb2Fyc2UiKTtlKHRoaXMsImNydXNoIik7ZSh0aGlzLCJkaXN0b3J0Iik7ZSh0aGlzLCJmcmVxIik7ZSh0aGlzLCJub3RlIik7ZSh0aGlzLCJfbHBmIik7ZSh0aGlzLCJfaHBmIik7ZSh0aGlzLCJfYnBmIik7ZSh0aGlzLCJfY2hvcnVzIik7ZSh0aGlzLCJfY29hcnNlIik7ZSh0aGlzLCJfY3J1c2giKTtlKHRoaXMsIl9kaXN0b3J0Iik7dmFyIGksbixsLHIscCxhLGM7dGhpcy5mcmVxPz8odGhpcy5mcmVxPUEocy5ub3RlKSksdGhpcy5fYmVnaW49cy5fYmVnaW4sdGhpcy5fZHVyYXRpb249cy5fZHVyYXRpb24sdGhpcy5yZWxlYXNlPXMucmVsZWFzZT8/MDtsZXQgdD10aGlzO2lmKE9iamVjdC5hc3NpZ24odCxzKSx0LnM9dC5zPz9vKCJzIiksdC5nYWluPV8odC5nYWluPz9vKCJnYWluIikpLHQudmVsb2NpdHk9Xyh0LnZlbG9jaXR5Pz9vKCJ2ZWxvY2l0eSIpKSx0LnBvc3RnYWluPV8odC5wb3N0Z2Fpbj8/bygicG9zdGdhaW4iKSksdC5kZW5zaXR5PXQuZGVuc2l0eT8/bygiZGVuc2l0eSIpLHQuZmFuY2hvcj10LmZhbmNob3I/P28oImZhbmNob3IiKSx0LmRyaXZlPXQuZHJpdmU/Py42OSx0LnBoYXNlcmRlcHRoPXQucGhhc2VyZGVwdGg/P28oInBoYXNlcmRlcHRoIiksdC5zaGFwZXZvbD1fKHQuc2hhcGV2b2w/P28oInNoYXBldm9sIikpLHQuZGlzdG9ydHZvbD1fKHQuZGlzdG9ydHZvbD8/bygiZGlzdG9ydHZvbCIpKSx0Lmk9dC5pPz9vKCJpIiksdC5jaG9ydXM9dC5jaG9ydXM/P28oImNob3J1cyIpLHQuZmZ0PXQuZmZ0Pz9vKCJmZnQiKSx0LnBhbj10LnBhbj8/bygicGFuIiksdC5vcmJpdD10Lm9yYml0Pz9vKCJvcmJpdCIpLHQuZm1lbnY9dC5mbWVudj8/bygiZm1lbnYiKSx0LnJlc29uYW5jZT10LnJlc29uYW5jZT8/bygicmVzb25hbmNlIiksdC5ocmVzb25hbmNlPXQuaHJlc29uYW5jZT8/bygiaHJlc29uYW5jZSIpLHQuYmFuZHE9dC5iYW5kcT8/bygiYmFuZHEiKSx0LnNwZWVkPXQuc3BlZWQ/P28oInNwZWVkIiksdC5wdz10LnB3Pz9vKCJwdyIpLFt0LmF0dGFjayx0LmRlY2F5LHQuc3VzdGFpbix0LnJlbGVhc2VdPXkoW3QuYXR0YWNrLHQuZGVjYXksdC5zdXN0YWluLHQucmVsZWFzZV0pLHQuX2hvbGRFbmQ9dC5fYmVnaW4rdC5fZHVyYXRpb24sdC5fZW5kPXQuX2hvbGRFbmQrdC5yZWxlYXNlKy4wMSx0LmZtaSYmKHQucz09PSJzYXcifHx0LnM9PT0ic2F3dG9vdGgiKSYmKHQucz0iemF3IiksRFt0LnNdKXtjb25zdCBkPURbdC5zXTt0Ll9zb3VuZD1uZXcgZCx0Ll9jaGFubmVscz0xfWVsc2UgaWYody5zYW1wbGVzLmhhcyh0LnMpKXtjb25zdCBkPXcuc2FtcGxlcy5nZXQodC5zKTt0Ll9idWZmZXJzPVtdLHQuX2NoYW5uZWxzPWQuY2hhbm5lbHMubGVuZ3RoO2ZvcihsZXQgYj0wO2I8dC5fY2hhbm5lbHM7YisrKXQuX2J1ZmZlcnMucHVzaChuZXcgdyhkLmNoYW5uZWxzW2JdLGQuc2FtcGxlUmF0ZSx0LnVuaXQ9PT0iYyIpKX1lbHNlIGNvbnNvbGUud2Fybigic291bmQgbm90IGxvYWRlZCIsdC5zKTt0LnBlbnYmJih0Ll9wZW52PW5ldyB2KHtkZWNheUN1cnZlOjR9KSxbdC5wYXR0YWNrLHQucGRlY2F5LHQucHN1c3RhaW4sdC5wcmVsZWFzZV09eShbdC5wYXR0YWNrLHQucGRlY2F5LHQucHN1c3RhaW4sdC5wcmVsZWFzZV0pKSx0LnZpYiYmKHQuX3ZpYj1uZXcgZyx0LnZpYm1vZD10LnZpYm1vZD8/bygidmlibW9kIikpLHQuZm1pJiYodC5fZm09bmV3IGcsdC5mbWg9dC5mbWg/P28oImZtaCIpLHQuZm1lbnYmJih0Ll9mbWVudj1uZXcgdih7ZGVjYXlDdXJ2ZToyfSksW3QuZm1hdHRhY2ssdC5mbWRlY2F5LHQuZm1zdXN0YWluLHQuZm1yZWxlYXNlXT15KFt0LmZtYXR0YWNrLHQuZm1kZWNheSx0LmZtc3VzdGFpbix0LmZtcmVsZWFzZV0pKSksdC5fYWRzcj1uZXcgdih7ZGVjYXlDdXJ2ZToyfSksdC5kZWxheT1fKHQuZGVsYXk/P28oImRlbGF5IikpLHQuZGVsYXlmZWVkYmFjaz10LmRlbGF5ZmVlZGJhY2s/P28oImRlbGF5ZmVlZGJhY2siKSx0LmRlbGF5c3BlZWQ9dC5kZWxheXNwZWVkPz9vKCJkZWxheXNwZWVkIiksdC5kZWxheXRpbWU9dC5kZWxheXRpbWU/P28oImRlbGF5dGltZSIpLHQubHBlbnYmJih0Ll9scGVudj1uZXcgdih7ZGVjYXlDdXJ2ZTo0fSksW3QubHBhdHRhY2ssdC5scGRlY2F5LHQubHBzdXN0YWluLHQubHByZWxlYXNlXT15KFt0LmxwYXR0YWNrLHQubHBkZWNheSx0Lmxwc3VzdGFpbix0LmxwcmVsZWFzZV0pKSx0LmhwZW52JiYodC5faHBlbnY9bmV3IHYoe2RlY2F5Q3VydmU6NH0pLFt0LmhwYXR0YWNrLHQuaHBkZWNheSx0Lmhwc3VzdGFpbix0LmhwcmVsZWFzZV09eShbdC5ocGF0dGFjayx0LmhwZGVjYXksdC5ocHN1c3RhaW4sdC5ocHJlbGVhc2VdKSksdC5icGVudiYmKHQuX2JwZW52PW5ldyB2KHtkZWNheUN1cnZlOjR9KSxbdC5icGF0dGFjayx0LmJwZGVjYXksdC5icHN1c3RhaW4sdC5icHJlbGVhc2VdPXkoW3QuYnBhdHRhY2ssdC5icGRlY2F5LHQuYnBzdXN0YWluLHQuYnByZWxlYXNlXSkpLHQuX2Nob3J1cz10LmNob3J1cz9bXTpudWxsLHQuX2xwZj10LmN1dG9mZj9bXTpudWxsLHQuX2hwZj10LmhjdXRvZmY/W106bnVsbCx0Ll9icGY9dC5iYW5kZj9bXTpudWxsLHQuX2NvYXJzZT10LmNvYXJzZT9bXTpudWxsLHQuX2NydXNoPXQuY3J1c2g/W106bnVsbCx0Ll9kaXN0b3J0PXQuZGlzdG9ydD9bXTpudWxsO2ZvcihsZXQgZD0wO2Q8dGhpcy5fY2hhbm5lbHM7ZCsrKShpPXQuX2xwZik9PW51bGx8fGkucHVzaChuZXcgcSksKG49dC5faHBmKT09bnVsbHx8bi5wdXNoKG5ldyBxKSwobD10Ll9icGYpPT1udWxsfHxsLnB1c2gobmV3IHEpLChyPXQuX2Nob3J1cyk9PW51bGx8fHIucHVzaChuZXcgWCksKHA9dC5fY29hcnNlKT09bnVsbHx8cC5wdXNoKG5ldyBVKSwoYT10Ll9jcnVzaCk9PW51bGx8fGEucHVzaChuZXcgWSksKGM9dC5fZGlzdG9ydCk9PW51bGx8fGMucHVzaChuZXcgWil9dXBkYXRlKHMpe2lmKCF0aGlzLl9zb3VuZCYmIXRoaXMuX2J1ZmZlcnMpcmV0dXJuIDA7bGV0IHQ9KyhzPj10aGlzLl9iZWdpbiYmczw9dGhpcy5faG9sZEVuZCksaT10aGlzLmZyZXEqdGhpcy5zcGVlZDtpZih0aGlzLl9mbSYmdGhpcy5mbWghPT12b2lkIDAmJnRoaXMuZm1pIT09dm9pZCAwKXtsZXQgYT10aGlzLmZtaTtpZih0aGlzLl9mbWVudil7Y29uc3QgYj10aGlzLl9mbWVudi51cGRhdGUocyx0LHRoaXMuZm1hdHRhY2ssdGhpcy5mbWRlY2F5LHRoaXMuZm1zdXN0YWluLHRoaXMuZm1yZWxlYXNlKTthPXRoaXMuZm1lbnYqYiphfWNvbnN0IGM9aSp0aGlzLmZtaCxkPWMqYTtpPWkrdGhpcy5fZm0udXBkYXRlKGMpKmR9aWYodGhpcy5fdmliJiZ0aGlzLnZpYm1vZCE9PXZvaWQgMCYmKGk9aSoyKioodGhpcy5fdmliLnVwZGF0ZSh0aGlzLnZpYikqdGhpcy52aWJtb2QvMTIpKSx0aGlzLl9wZW52JiZ0aGlzLnBlbnYhPT12b2lkIDApe2NvbnN0IGE9dGhpcy5fcGVudi51cGRhdGUocyx0LHRoaXMucGF0dGFjayx0aGlzLnBkZWNheSx0aGlzLnBzdXN0YWluLHRoaXMucHJlbGVhc2UpO2k9aSthKnRoaXMucGVudn1sZXQgbj10aGlzLmN1dG9mZjtpZihuIT09dm9pZCAwJiZ0aGlzLl9scGVudil7Y29uc3QgYT10aGlzLl9scGVudi51cGRhdGUocyx0LHRoaXMubHBhdHRhY2ssdGhpcy5scGRlY2F5LHRoaXMubHBzdXN0YWluLHRoaXMubHByZWxlYXNlKTtuPXRoaXMubHBlbnYqYSpuK259bGV0IGw9dGhpcy5oY3V0b2ZmO2lmKGwhPT12b2lkIDAmJnRoaXMuX2hwZW52JiZ0aGlzLmhwZW52IT09dm9pZCAwKXtjb25zdCBhPXRoaXMuX2hwZW52LnVwZGF0ZShzLHQsdGhpcy5ocGF0dGFjayx0aGlzLmhwZGVjYXksdGhpcy5ocHN1c3RhaW4sdGhpcy5ocHJlbGVhc2UpO2w9MioqdGhpcy5ocGVudiphKmwrbH1sZXQgcj10aGlzLmJhbmRmO2lmKHIhPT12b2lkIDAmJnRoaXMuX2JwZW52JiZ0aGlzLmJwZW52IT09dm9pZCAwKXtjb25zdCBhPXRoaXMuX2JwZW52LnVwZGF0ZShzLHQsdGhpcy5icGF0dGFjayx0aGlzLmJwZGVjYXksdGhpcy5icHN1c3RhaW4sdGhpcy5icHJlbGVhc2UpO3I9MioqdGhpcy5icGVudiphKnIrcn1jb25zdCBwPXRoaXMuX2Fkc3IudXBkYXRlKHMsdCx0aGlzLmF0dGFjayx0aGlzLmRlY2F5LHRoaXMuc3VzdGFpbix0aGlzLnJlbGVhc2UpO2ZvcihsZXQgYT0wO2E8dGhpcy5fY2hhbm5lbHM7YSsrKXtpZih0aGlzLl9zb3VuZCYmdGhpcy5zPT09InB1bHNlIj90aGlzLm91dFthXT10aGlzLl9zb3VuZC51cGRhdGUoaSx0aGlzLnB3KTp0aGlzLl9zb3VuZD90aGlzLm91dFthXT10aGlzLl9zb3VuZC51cGRhdGUoaSk6dGhpcy5fYnVmZmVycyYmKHRoaXMub3V0W2FdPXRoaXMuX2J1ZmZlcnNbYV0udXBkYXRlKGkpKSx0aGlzLm91dFthXT10aGlzLm91dFthXSp0aGlzLmdhaW4qdGhpcy52ZWxvY2l0eSx0aGlzLl9jaG9ydXMpe2NvbnN0IGM9dGhpcy5fY2hvcnVzW2FdLnVwZGF0ZSh0aGlzLm91dFthXSx0aGlzLmNob3J1cywuMDMrLjA1KmEsMSwuMTEpO3RoaXMub3V0W2FdPWMrdGhpcy5vdXRbYV19dGhpcy5fbHBmJiYodGhpcy5fbHBmW2FdLnVwZGF0ZSh0aGlzLm91dFthXSxuLHRoaXMucmVzb25hbmNlKSx0aGlzLm91dFthXT10aGlzLl9scGZbYV0uczEpLHRoaXMuX2hwZiYmKHRoaXMuX2hwZlthXS51cGRhdGUodGhpcy5vdXRbYV0sbCx0aGlzLmhyZXNvbmFuY2UpLHRoaXMub3V0W2FdPXRoaXMub3V0W2FdLXRoaXMuX2hwZlthXS5zMSksdGhpcy5fYnBmJiYodGhpcy5fYnBmW2FdLnVwZGF0ZSh0aGlzLm91dFthXSxyLHRoaXMuYmFuZHEpLHRoaXMub3V0W2FdPXRoaXMuX2JwZlthXS5zMCksdGhpcy5fY29hcnNlJiYodGhpcy5vdXRbYV09dGhpcy5fY29hcnNlW2FdLnVwZGF0ZSh0aGlzLm91dFthXSx0aGlzLmNvYXJzZSkpLHRoaXMuX2NydXNoJiYodGhpcy5vdXRbYV09dGhpcy5fY3J1c2hbYV0udXBkYXRlKHRoaXMub3V0W2FdLHRoaXMuY3J1c2gpKSx0aGlzLl9kaXN0b3J0JiYodGhpcy5vdXRbYV09dGhpcy5fZGlzdG9ydFthXS51cGRhdGUodGhpcy5vdXRbYV0sdGhpcy5kaXN0b3J0LHRoaXMuZGlzdG9ydHZvbCkpLHRoaXMub3V0W2FdPXRoaXMub3V0W2FdKnAsdGhpcy5vdXRbYV09dGhpcy5vdXRbYV0qdGhpcy5wb3N0Z2Fpbix0aGlzLl9idWZmZXJzfHwodGhpcy5vdXRbYV09dGhpcy5vdXRbYV0qLjIpfWlmKHRoaXMuX2NoYW5uZWxzPT09MSYmKHRoaXMub3V0WzFdPXRoaXMub3V0WzBdKSx0aGlzLnBhbiE9PS41KXtjb25zdCBhPXRoaXMucGFuKk1hdGguUEkvMjt0aGlzLm91dFswXT10aGlzLm91dFswXSpNYXRoLmNvcyhhKSx0aGlzLm91dFsxXT10aGlzLm91dFsxXSpNYXRoLnNpbihhKX19fWNsYXNzIGV0e2NvbnN0cnVjdG9yKHM9NDhlMyx0PTApe2UodGhpcywidm9pY2VzIixbXSk7ZSh0aGlzLCJ2aWQiLDApO2UodGhpcywicSIsW10pO2UodGhpcywib3V0IixbMCwwXSk7ZSh0aGlzLCJkZWxheXNlbmQiLFswLDBdKTtlKHRoaXMsImRlbGF5dGltZSIsbygiZGVsYXl0aW1lIikpO2UodGhpcywiZGVsYXlmZWVkYmFjayIsbygiZGVsYXlmZWVkYmFjayIpKTtlKHRoaXMsImRlbGF5c3BlZWQiLG8oImRlbGF5c3BlZWQiKSk7ZSh0aGlzLCJ0IiwwKTt0aGlzLnNhbXBsZVJhdGU9cyx0aGlzLnQ9TWF0aC5mbG9vcih0KnMpLHRoaXMuX2RlbGF5TD1uZXcgUix0aGlzLl9kZWxheVI9bmV3IFJ9bG9hZFNhbXBsZShzLHQsaSl7dy5zYW1wbGVzLnNldChzLHtjaGFubmVsczp0LHNhbXBsZVJhdGU6aX0pfXNjaGVkdWxlU3Bhd24ocyl7aWYocy5fYmVnaW49PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKCJbZG91Z2hdOiBzY2hlZHVsZVNwYXduIGV4cGVjdGVkIF9iZWdpbiB0byBiZSBzZXQiKTtpZihzLl9kdXJhdGlvbj09PXZvaWQgMCl0aHJvdyBuZXcgRXJyb3IoIltkb3VnaF06IHNjaGVkdWxlU3Bhd24gZXhwZWN0ZWQgX2R1cmF0aW9uIHRvIGJlIHNldCIpO3Muc2FtcGxlUmF0ZT10aGlzLnNhbXBsZVJhdGU7Y29uc3QgdD1NYXRoLmZsb29yKHMuX2JlZ2luKnRoaXMuc2FtcGxlUmF0ZSk7dGhpcy5zY2hlZHVsZSh7dGltZTp0LHR5cGU6InNwYXduIixhcmc6c30pfXNwYXduKHMpe3MuaWQ9dGhpcy52aWQrKztjb25zdCB0PW5ldyBzdChzKTt0aGlzLnZvaWNlcy5wdXNoKHQpO2NvbnN0IGk9TWF0aC5jZWlsKHQuX2VuZCp0aGlzLnNhbXBsZVJhdGUpO3RoaXMuc2NoZWR1bGUoe3RpbWU6aSx0eXBlOiJkZXNwYXduIixhcmc6dC5pZH0pfWRlc3Bhd24ocyl7dGhpcy52b2ljZXM9dGhpcy52b2ljZXMuZmlsdGVyKHQ9PnQuaWQhPT1zKX1zY2hlZHVsZShzKXtpZighdGhpcy5xLmxlbmd0aCl7dGhpcy5xLnB1c2gocyk7cmV0dXJufWxldCB0PTA7Zm9yKDt0PHRoaXMucS5sZW5ndGgmJnRoaXMucVt0XS50aW1lPHMudGltZTspdCsrO3RoaXMucS5zcGxpY2UodCwwLHMpfXVwZGF0ZSgpe2Zvcig7dGhpcy5xLmxlbmd0aD4wJiZ0aGlzLnFbMF0udGltZTw9dGhpcy50Oyl0aGlzW3RoaXMucVswXS50eXBlXSh0aGlzLnFbMF0uYXJnKSx0aGlzLnEuc2hpZnQoKTt0aGlzLm91dFswXT0wLHRoaXMub3V0WzFdPTA7Zm9yKGxldCBpPTA7aTx0aGlzLnZvaWNlcy5sZW5ndGg7aSsrKXRoaXMudm9pY2VzW2ldLnVwZGF0ZSh0aGlzLnQvdGhpcy5zYW1wbGVSYXRlKSx0aGlzLm91dFswXSs9dGhpcy52b2ljZXNbaV0ub3V0WzBdLHRoaXMub3V0WzFdKz10aGlzLnZvaWNlc1tpXS5vdXRbMV0sdGhpcy52b2ljZXNbaV0uZGVsYXkmJih0aGlzLmRlbGF5c2VuZFswXSs9dGhpcy52b2ljZXNbaV0ub3V0WzBdKnRoaXMudm9pY2VzW2ldLmRlbGF5LHRoaXMuZGVsYXlzZW5kWzFdKz10aGlzLnZvaWNlc1tpXS5vdXRbMV0qdGhpcy52b2ljZXNbaV0uZGVsYXksdGhpcy5kZWxheXRpbWU9dGhpcy52b2ljZXNbaV0uZGVsYXl0aW1lLHRoaXMuZGVsYXlzcGVlZD10aGlzLnZvaWNlc1tpXS5kZWxheXNwZWVkLHRoaXMuZGVsYXlmZWVkYmFjaz10aGlzLnZvaWNlc1tpXS5kZWxheWZlZWRiYWNrKTtjb25zdCBzPXRoaXMuX2RlbGF5TC51cGRhdGUodGhpcy5kZWxheXNlbmRbMF0sdGhpcy5kZWxheXRpbWUpLHQ9dGhpcy5fZGVsYXlSLnVwZGF0ZSh0aGlzLmRlbGF5c2VuZFsxXSx0aGlzLmRlbGF5dGltZSk7dGhpcy5kZWxheXNlbmRbMF09cyp0aGlzLmRlbGF5ZmVlZGJhY2ssdGhpcy5kZWxheXNlbmRbMV09dCp0aGlzLmRlbGF5ZmVlZGJhY2ssdGhpcy5vdXRbMF0rPXMsdGhpcy5vdXRbMV0rPXQsdGhpcy50Kyt9fWNvbnN0IGl0PShoLHMsdCk9Pk1hdGgubWluKE1hdGgubWF4KGgscyksdCk7Y2xhc3MgYXQgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuZG91Z2g9bmV3IGV0KHNhbXBsZVJhdGUsY3VycmVudFRpbWUpLHRoaXMucG9ydC5vbm1lc3NhZ2U9cz0+e3MuZGF0YS5zcGF3bj90aGlzLmRvdWdoLnNjaGVkdWxlU3Bhd24ocy5kYXRhLnNwYXduKTpzLmRhdGEuc2FtcGxlP3RoaXMuZG91Z2gubG9hZFNhbXBsZShzLmRhdGEuc2FtcGxlLHMuZGF0YS5jaGFubmVscyxzLmRhdGEuc2FtcGxlUmF0ZSk6cy5kYXRhLnNhbXBsZXM/cy5kYXRhLnNhbXBsZXMuZm9yRWFjaCgoW3QsaSxuXSk9Pnt0aGlzLmRvdWdoLmxvYWRTYW1wbGUodCxpLG4pfSk6Y29uc29sZS5sb2coInVucmVjb2duaXplZCBldmVudCB0eXBlIixzLmRhdGEpfX1wcm9jZXNzKHMsdCxpKXtpZih0aGlzLmRpc2Nvbm5lY3RlZClyZXR1cm4hMTtjb25zdCBuPXRbMF07Zm9yKGxldCBsPTA7bDxuWzBdLmxlbmd0aDtsKyspe3RoaXMuZG91Z2gudXBkYXRlKCk7Zm9yKGxldCByPTA7cjxuLmxlbmd0aDtyKyspbltyXVtsXT1pdCh0aGlzLmRvdWdoLm91dFtyXSwtMSwxKX1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoImRvdWdoLXByb2Nlc3NvciIsYXQpfSkoKTsK";
const ow = uw;
oM(ow);
const { Pattern: cw, logger: nu, repl: lw } = M2;
G2(nu);
const GM = (e) => (e.ensureObjectValue(), e.value), vM = (e, t, n, s, i) => Sr(GM(e), i, n, s, e.whole?.begin.valueOf());
async function dw(e, t, n, s, i, r, a, u = void 0) {
  let o = ve();
  await o.close(), o = new OfflineAudioContext(2, (s - n) / t * i, i), or(o), tu(new q2(o)), await ho({
    maxPolyphony: r,
    multiChannelOrbits: a
  }), nu("[webaudio] preloading");
  let c = e.queryArc(n, s, { _cps: t }).sort((l, p) => l.whole.begin.valueOf() - p.whole.begin.valueOf());
  for (const l of c)
    if (l.hasOnset())
      try {
        await Sr(
          GM(l),
          (l.whole.begin.valueOf() - n) / t,
          l.duration / t,
          t,
          (l.whole?.begin.valueOf() - n) / t
        );
      } catch (p) {
        Pi(p, "webaudio");
      }
  return nu("[webaudio] start rendering"), o.startRendering().then((l) => {
    const p = hw(l), m = new Blob([p], { type: "audio/wav" }), g = URL.createObjectURL(m), y = document.createElement("a");
    y.href = g, u = u ? `${u}.wav` : `${(/* @__PURE__ */ new Date()).toISOString()}.wav`, y.download = `${u}`, document.body.appendChild(y), y.click(), document.body.removeChild(y), URL.revokeObjectURL(g);
  }).finally(async () => {
    or(null), tu(null), pM();
  });
}
function PM(e = {}) {
  const t = e.audioContext ?? ve();
  return or(t), e = {
    getTime: () => t.currentTime,
    defaultOutput: vM,
    ...e
  }, lw(e);
}
cw.prototype.dough = function() {
  return this.onTrigger(CM, 1);
};
function hw(e, t) {
  t = t || {};
  var n = e.numberOfChannels, s = e.sampleRate, i = t.float32 ? 3 : 1, r = i === 3 ? 32 : 16, a;
  return n === 2 ? a = mw(e.getChannelData(0), e.getChannelData(1)) : a = e.getChannelData(0), pw(a, i, s, n, r);
}
function pw(e, t, n, s, i) {
  var r = i / 8, a = s * r, u = new ArrayBuffer(44 + e.length * r), o = new DataView(u);
  return Qi(o, 0, "RIFF"), o.setUint32(4, 36 + e.length * r, true), Qi(o, 8, "WAVE"), Qi(o, 12, "fmt "), o.setUint32(16, 16, true), o.setUint16(20, t, true), o.setUint16(22, s, true), o.setUint32(24, n, true), o.setUint32(28, n * a, true), o.setUint16(32, a, true), o.setUint16(34, i, true), Qi(o, 36, "data"), o.setUint32(40, e.length * r, true), t === 1 ? yw(o, 44, e) : fw(o, 44, e), u;
}
function mw(e, t) {
  for (var n = e.length + t.length, s = new Float32Array(n), i = 0, r = 0; i < n; )
    s[i++] = e[r], s[i++] = t[r], r++;
  return s;
}
function fw(e, t, n) {
  for (var s = 0; s < n.length; s++, t += 4)
    e.setFloat32(t, n[s], true);
}
function yw(e, t, n) {
  for (var s = 0; s < n.length; s++, t += 2) {
    var i = Math.max(-1, Math.min(1, n[s]));
    e.setInt16(t, i < 0 ? i * 32768 : i * 32767, true);
  }
}
function Qi(e, t, n) {
  for (var s = 0; s < n.length; s++)
    e.setUint8(t + s, n.charCodeAt(s));
}
const gs = (e = "test-canvas", t) => {
  let { contextType: n = "2d", pixelated: s = false, pixelRatio: i = window.devicePixelRatio } = {}, r = document.querySelector("#" + e);
  if (!r) {
    r = document.createElement("canvas"), r.id = e, r.width = window.innerWidth * i, r.height = window.innerHeight * i, r.style = "pointer-events:none;width:100%;height:100%;position:fixed;top:0;left:0", s && (r.style.imageRendering = "pixelated"), document.body.prepend(r);
    let a;
    window.addEventListener("resize", () => {
      a && clearTimeout(a), a = setTimeout(() => {
        r.width = window.innerWidth * i, r.height = window.innerHeight * i;
      }, 200);
    });
  }
  return r.getContext(n, { willReadFrequently: true });
};
let fi = {};
function gw(e) {
  fi[e] !== void 0 && (cancelAnimationFrame(fi[e]), delete fi[e]);
}
let Zn = {};
_.prototype.draw = function(e, t) {
  if (typeof window > "u")
    return this;
  let { id: n = 1, lookbehind: s = 0, lookahead: i = 0 } = t, r = Math.max(Ia(), 0);
  gw(n), s = Math.abs(s), Zn[n] = (Zn[n] || []).filter((c) => !c.isInFuture(r));
  let a = this.queryArc(r, r + i).filter((c) => c.hasOnset());
  Zn[n] = Zn[n].concat(a);
  let u;
  const o = () => {
    const c = Ia(), l = c + i;
    Zn[n] = Zn[n].filter((g) => g.isInNearPast(s, c));
    let p = Math.max(u || l, l - 1 / 10);
    const m = this.queryArc(p, l).filter((g) => g.hasOnset());
    Zn[n] = Zn[n].concat(m), u = l, e(Zn[n], c, l, this), fi[n] = requestAnimationFrame(o);
  };
  return fi[n] = requestAnimationFrame(o), this;
};
_.prototype.onPaint = function(e) {
  return this.withState((t) => (t.controls.painters || (t.controls.painters = []), t.controls.painters.push(e), t));
};
_.prototype.getPainters = function() {
  let e = [];
  return this.queryArc(0, 0, { painters: e }), e;
};
let bw = {
  background: "#222",
  foreground: "#75baff",
  caret: "#ffcc00",
  selection: "rgba(128, 203, 196, 0.5)",
  selectionMatch: "#036dd626",
  lineHighlight: "#00000050",
  gutterBackground: "transparent",
  gutterForeground: "#8a919966"
};
function Rn() {
  return bw;
}
let wc = "#22222210";
_.prototype.animate = function({ callback: e, sync: t = false, smear: n = 0.5 } = {}) {
  window.frame && cancelAnimationFrame(window.frame);
  const s = gs();
  let { clientWidth: i, clientHeight: r } = s.canvas;
  i *= window.devicePixelRatio, r *= window.devicePixelRatio;
  let a = n === 0 ? "99" : Number((1 - n) * 100).toFixed(0);
  a = a.length === 1 ? `0${a}` : a, wc = `#200010${a}`;
  const u = (o) => {
    let c;
    o = Math.round(o), c = this.slow(1e3).queryArc(o, o), s.fillStyle = wc, s.fillRect(0, 0, i, r), c.forEach((l) => {
      let { x: p, y: m, w: g, h: y, s: x, r: v, angle: E = 0, fill: w = "darkseagreen" } = l.value;
      if (g *= i, y *= r, v !== void 0 && E !== void 0) {
        const D = E * 2 * Math.PI, [X, Z] = [(i - g) / 2, (r - y) / 2];
        p = X + Math.cos(D) * v * X, m = Z + Math.sin(D) * v * Z;
      } else
        p *= i - g, m *= r - y;
      const V = { ...l.value, x: p, y: m, w: g, h: y };
      s.fillStyle = w, x === "rect" ? s.fillRect(p, m, g, y) : x === "ellipse" && (s.beginPath(), s.ellipse(p + g / 2, m + y / 2, g / 2, y / 2, 0, 0, 2 * Math.PI), s.fill()), e && e(s, V, l);
    }), window.frame = requestAnimationFrame(u);
  };
  return window.frame = requestAnimationFrame(u), Ye;
};
const { x: AM, y: fV, w: yV, h: gV, angle: bV, r: MV, fill: CV, smear: xV } = Lu("x", "y", "w", "h", "angle", "r", "fill", "smear");
B("rescale", function(e, t) {
  return t.mul(AM(e).w(e).y(e).h(e));
});
B("moveXY", function(e, t, n) {
  return n.add(AM(e).y(t));
});
B("zoomIn", function(e, t) {
  const n = Ue(1).sub(e).div(2);
  return t.rescale(e).move(n, n);
});
const ii = (e, t, n) => e * (n - t) + t, Zc = (e) => {
  let { value: t } = e;
  typeof e.value != "object" && (t = { value: t });
  let { note: n, n: s, freq: i, s: r } = t;
  if (i)
    return bu(i);
  if (n = n ?? s, typeof n == "string")
    try {
      return yn(n);
    } catch {
      return 0;
    }
  return typeof n == "number" ? n : r ? "_" + r : t;
};
_.prototype.pianoroll = function(e = {}) {
  let { cycles: t = 4, playhead: n = 0.5, overscan: s = 0, hideNegative: i = false, ctx: r = gs(), id: a = 1 } = e, u = -t * n, o = t * (1 - n);
  const c = (l, p) => (!i || l.whole.begin >= 0) && l.isWithinTime(p + u, p + o);
  return this.draw(
    (l, p) => {
      FM({
        ...e,
        time: p,
        ctx: r,
        haps: l.filter((m) => c(m, p))
      });
    },
    {
      lookbehind: u - s,
      lookahead: o + s,
      id: a
    }
  ), this;
};
function FM({
  time: e,
  haps: t,
  cycles: n = 4,
  playhead: s = 0.5,
  flipTime: i = 0,
  flipValues: r = 0,
  hideNegative: a = false,
  inactive: u = Rn().foreground,
  active: o = Rn().foreground,
  background: c = "transparent",
  smear: l = 0,
  playheadColor: p = Rn().foreground,
  minMidi: m = 10,
  maxMidi: g = 90,
  autorange: y = 0,
  timeframe: x,
  fold: v = 1,
  vertical: E = 0,
  labels: w = false,
  fill: V = 1,
  fillActive: D = false,
  strokeActive: X = true,
  stroke: Z,
  hideInactive: L = 0,
  colorizeInactive: R = 1,
  fontFamily: H,
  ctx: z,
  id: $
} = {}) {
  const I = z.canvas.width, Y = z.canvas.height;
  let ee = -n * s, Me = n * (1 - s);
  $ && (t = t.filter((Se) => Se.hasTag($))), x && (console.warn("timeframe is deprecated! use from/to instead"), ee = 0, Me = x);
  const re = E ? Y : I, de = E ? I : Y;
  let se = E ? [re, 0] : [0, re];
  const Ie = Me - ee, rt = E ? [0, de] : [de, 0];
  let dt = g - m + 1, O = de / dt, at = [];
  i && se.reverse(), r && rt.reverse();
  const { min: he, max: Ge, values: Ce } = t.reduce(
    ({ min: Se, max: Le, values: pt }, ae) => {
      const We = Zc(ae);
      return {
        min: We < Se ? We : Se,
        max: We > Le ? We : Le,
        values: pt.includes(We) ? pt : [...pt, We]
      };
    },
    { min: 1 / 0, max: -1 / 0, values: [] }
  );
  y && (m = he, g = Ge, dt = g - m + 1), at = Ce.sort(
    (Se, Le) => typeof Se == "number" && typeof Le == "number" ? Se - Le : typeof Se == "number" ? 1 : String(Se).localeCompare(String(Le))
  ), O = v ? de / at.length : de / dt, z.fillStyle = c, z.globalAlpha = 1, l || (z.clearRect(0, 0, I, Y), z.fillRect(0, 0, I, Y)), t.forEach((Se) => {
    const Le = Se.whole.begin <= e && Se.endClipped > e;
    let pt = Z ?? (X && Le), ae = !Le && V || Le && D;
    if (L && !Le)
      return;
    let We = Se.value?.color;
    o = We || o, u = R && We || u, We = Le ? o : u, z.fillStyle = ae ? We : "transparent", z.strokeStyle = We;
    const { velocity: Mt = 1, gain: ie = 1 } = Se.value || {};
    z.globalAlpha = Mt * ie;
    const J = (Se.whole.begin - (i ? Me : ee)) / Ie, He = ii(J, ...se);
    let pe = ii(Se.duration / Ie, 0, re);
    const Te = Zc(Se), Ct = v ? at.indexOf(Te) / at.length : (Number(Te) - m) / dt, dn = ii(Ct, ...rt);
    let Nn = 0;
    const hn = ii(e / Ie, ...se);
    let Xt;
    if (E ? Xt = [
      dn + 1 - (r ? O : 0),
      // x
      re - hn + He + Nn + 1 - (i ? 0 : pe),
      // y
      O - 2,
      // width
      pe - 2
      // height
    ] : Xt = [
      He - hn + Nn + 1 - (i ? pe : 0),
      // x
      dn + 1 - (r ? 0 : O),
      // y
      pe - 2,
      // widith
      O - 2
      // height
    ], pt && z.strokeRect(...Xt), ae && z.fillRect(...Xt), w) {
      const Fn = Se.value.note ?? Se.value.s + (Se.value.n ? `:${Se.value.n}` : ""), { label: De, activeLabel: Oe } = Se.value, qe = (Le && Oe || De) ?? Fn;
      let Ke = E ? pe : O * 0.75;
      z.font = `${Ke}px ${H || "monospace"}`, z.fillStyle = /* isActive &&  */
      ae ? "black" : We, z.textBaseline = "top", z.fillText(qe, ...Xt);
    }
  }), z.globalAlpha = 1;
  const Pe = ii(-ee / Ie, ...se);
  return z.strokeStyle = p, z.beginPath(), E ? (z.moveTo(0, Pe), z.lineTo(de, Pe)) : (z.moveTo(Pe, 0), z.lineTo(Pe, de)), z.stroke(), this;
}
function Mw(e, t = {}) {
  let [n, s] = e;
  n = Math.abs(n);
  const i = s + n, r = i !== 0 ? n / i : 0;
  return { fold: 1, ...t, cycles: i, playhead: r };
}
const Cw = (e = {}) => (t, n, s, i) => FM({ ctx: t, time: n, haps: s, ...Mw(i, e) });
_.prototype.punchcard = function(e) {
  return this.onPaint(Cw(e));
};
_.prototype.wordfall = function(e) {
  return this.punchcard({ vertical: 1, labels: 1, stroke: 0, fillActive: 1, active: "white", ...e });
};
function xw(e, t, n, s) {
  const i = (e - 90) * Math.PI / 180;
  return [n + Math.cos(i) * t, s + Math.sin(i) * t];
}
const Ec = (e, t, n, s, i = 0) => xw((e + i) * 360, t * e, n, s);
function Lc(e) {
  let {
    ctx: t,
    from: n = 0,
    to: s = 3,
    margin: i = 50,
    cx: r = 100,
    cy: a = 100,
    rotate: u = 0,
    thickness: o = i / 2,
    color: c = Rn().foreground,
    cap: l = "round",
    stretch: p = 1,
    fromOpacity: m = 1,
    toOpacity: g = 1
  } = e;
  n *= p, s *= p, u *= p, t.lineWidth = o, t.lineCap = l, t.strokeStyle = c, t.globalAlpha = m, t.beginPath();
  let [y, x] = Ec(n, i, r, a, u);
  t.moveTo(y, x);
  const v = 1 / 60;
  let E = n;
  for (; E <= s; ) {
    const [w, V] = Ec(E, i, r, a, u);
    t.globalAlpha = (E - n) / (s - n) * g, t.lineTo(w, V), E += v;
  }
  t.stroke();
}
function Gw(e) {
  let {
    stretch: t = 1,
    size: n = 80,
    thickness: s = n / 2,
    cap: i = "butt",
    // round butt squar,
    inset: r = 3,
    // start angl,
    playheadColor: a = "#ffffff",
    playheadLength: u = 0.02,
    playheadThickness: o = s,
    padding: c = 0,
    steady: l = 1,
    activeColor: p = Rn().foreground,
    inactiveColor: m = Rn().gutterForeground,
    colorizeInactive: g = 0,
    fade: y = true,
    // logSpiral = true,
    ctx: x,
    time: v,
    haps: E,
    drawTime: w,
    id: V
  } = e;
  V && (E = E.filter((I) => I.hasTag(V)));
  const [D, X] = [x.canvas.width, x.canvas.height];
  x.clearRect(0, 0, D * 2, X * 2);
  const [Z, L] = [D / 2, X / 2], R = {
    margin: n / t,
    cx: Z,
    cy: L,
    stretch: t,
    cap: i,
    thickness: s
  }, H = {
    ...R,
    thickness: o,
    from: r - u,
    to: r,
    color: a
  }, [z] = w, $ = l * v;
  E.forEach((I) => {
    const Y = I.whole.begin <= v && I.endClipped > v, ee = I.whole.begin - v + r, Me = I.endClipped - v + r - c, re = I.value?.color || p, de = g || Y ? re : m, se = y ? 1 - Math.abs((I.whole.begin - v) / z) : 1;
    Lc({
      ctx: x,
      ...R,
      from: ee,
      to: Me,
      rotate: $,
      color: de,
      fromOpacity: se,
      toOpacity: se
    });
  }), Lc({
    ctx: x,
    ...H,
    rotate: $
  });
}
_.prototype.spiral = function(e = {}) {
  return this.onPaint((t, n, s, i) => Gw({ ctx: t, time: n, haps: s, drawTime: i, ...e }));
};
const vw = ds(36), Rc = (e, t, n, s) => {
  s = s * Math.PI * 2;
  const i = Math.sin(s) * n + e, r = Math.cos(s) * n + t;
  return [i, r];
}, Bc = (e, t) => 0.5 - Math.log2(e / t) % 1;
function Pw({
  haps: e,
  ctx: t,
  id: n,
  hapcircles: s = 1,
  circle: i = 0,
  edo: r = 12,
  root: a = vw,
  thickness: u = 3,
  hapRadius: o = 6,
  mode: c = "flake",
  margin: l = 10
} = {}) {
  const p = c === "polygon", m = c === "flake", g = t.canvas.width, y = t.canvas.height;
  t.clearRect(0, 0, g, y);
  const x = Rn().foreground, E = Math.min(g, y) / 2 - u / 2 - o - l, w = g / 2, V = y / 2;
  n && (e = e.filter((X) => X.hasTag(n))), t.strokeStyle = x, t.fillStyle = x, t.globalAlpha = 1, t.lineWidth = u, i && (t.beginPath(), t.arc(w, V, E, 0, 2 * Math.PI), t.stroke()), r && (Array.from({ length: r }, (X, Z) => {
    const L = Bc(a * Math.pow(2, Z / r), a), [R, H] = Rc(w, V, E, L);
    t.beginPath(), t.arc(R, H, o, 0, 2 * Math.PI), t.fill();
  }), t.stroke());
  let D = [];
  t.lineWidth = o, e.forEach((X) => {
    let Z;
    try {
      Z = Tl(X);
    } catch {
      return;
    }
    const L = Bc(Z, a), [R, H] = Rc(w, V, E, L), z = X.value.color || x;
    t.strokeStyle = z, t.fillStyle = z;
    const { velocity: $ = 1, gain: I = 1 } = X.value || {}, Y = $ * I;
    t.globalAlpha = Y, D.push([R, H, L, z, Y]), t.beginPath(), s && (t.moveTo(R + o, H), t.arc(R, H, o, 0, 2 * Math.PI), t.fill()), m && (t.moveTo(w, V), t.lineTo(R, H)), t.stroke();
  }), t.strokeStyle = x, t.globalAlpha = 1, p && D.length && (D = D.sort((X, Z) => X[2] - Z[2]), t.beginPath(), t.moveTo(D[0][0], D[0][1]), D.forEach(([X, Z, L, R, H]) => {
    t.strokeStyle = R, t.globalAlpha = H, t.lineTo(X, Z);
  }), t.lineTo(D[0][0], D[0][1]), t.stroke());
}
_.prototype.pitchwheel = function(e = {}) {
  let { ctx: t = gs(), id: n = 1 } = e;
  return this.tag(n).onPaint(
    (s, i, r) => Pw({
      ...e,
      ctx: t,
      haps: r.filter((a) => a.isActive(i)),
      id: n
    })
  );
};
function XM(e, {
  align: t = true,
  color: n = "white",
  thickness: s = 3,
  scale: i = 0.25,
  pos: r = 0.75,
  trigger: a = 0,
  ctx: u = gs(),
  id: o = 1
} = {}) {
  u.lineWidth = s, u.strokeStyle = n;
  let c = u.canvas;
  if (!e) {
    u.beginPath();
    let x = r * c.height;
    u.moveTo(0, x), u.lineTo(c.width, x), u.stroke();
    return;
  }
  const l = Dr("time", o);
  u.beginPath();
  const p = e.frequencyBinCount;
  let m = t ? Array.from(l).findIndex((x, v, E) => v && E[v - 1] > -a && x <= -a) : 0;
  m = Math.max(m, 0);
  const g = c.width * 1 / p;
  let y = 0;
  for (let x = m; x < p; x++) {
    const v = l[x] + 1, E = (r - i * (v - 1)) * c.height;
    x === 0 ? u.moveTo(y, E) : u.lineTo(y, E), y += g;
  }
  u.stroke();
}
function DM(e, { color: t = "white", scale: n = 0.25, pos: s = 0.75, lean: i = 0.5, min: r = -150, max: a = 0, ctx: u = gs(), id: o = 1 } = {}) {
  if (!e) {
    u.beginPath();
    let y = s * l.height;
    u.moveTo(0, y), u.lineTo(l.width, y), u.stroke();
    return;
  }
  const c = Dr("frequency", o), l = u.canvas;
  u.fillStyle = t;
  const p = e.frequencyBinCount, m = l.width * 1 / p;
  let g = 0;
  for (let y = 0; y < p; y++) {
    const v = br((c[y] - r) / (a - r), 0, 1) * n, E = v * l.height, w = (s - v * i) * l.height;
    u.fillRect(g, w, Math.max(m, 1), E), g += m;
  }
}
function SM(e = 0, t = "0,0,0", n = gs()) {
  e ? (n.fillStyle = `rgba(${t},${1 - e})`, n.fillRect(0, 0, n.canvas.width, n.canvas.height)) : n.clearRect(0, 0, n.canvas.width, n.canvas.height);
}
_.prototype.fscope = function(e = {}) {
  let t = e.id ?? 1;
  return this.analyze(t).draw(
    () => {
      SM(e.smear, "0,0,0", e.ctx), vt[t] && DM(vt[t], e);
    },
    { id: t }
  );
};
_.prototype.tscope = function(e = {}) {
  let t = e.id ?? 1;
  return this.analyze(t).draw(
    (n) => {
      e.color = n[0]?.value?.color || Rn().foreground, e.color, SM(e.smear, "0,0,0", e.ctx), XM(vt[t], e);
    },
    { id: t }
  );
};
_.prototype.scope = _.prototype.tscope;
let Vc = {};
_.prototype.spectrum = function(e = {}) {
  let t = e.id ?? 1;
  return this.analyze(t).draw(
    (n) => {
      e.color = n[0]?.value?.color || Vc[t] || Rn().foreground, Vc[t] = e.color, Aw(vt[t], e);
    },
    { id: t }
  );
};
_.prototype.scope = _.prototype.tscope;
const la = /* @__PURE__ */ new Map();
function Aw(e, { thickness: t = 3, speed: n = 1, min: s = -80, max: i = 0, ctx: r = gs(), id: a = 1, color: u } = {}) {
  if (r.lineWidth = t, r.strokeStyle = u, !e)
    return;
  const o = n, c = Dr("frequency", a), l = r.canvas;
  r.fillStyle = u;
  const p = e.frequencyBinCount;
  let m = la.get(a) || r.getImageData(0, 0, l.width, l.height);
  la.set(a, m), r.clearRect(0, 0, r.canvas.width, r.canvas.height), r.putImageData(m, -o, 0);
  let g = l.width - n;
  for (let y = 0; y < p; y++) {
    const x = br((c[y] - s) / (i - s), 0, 1);
    r.globalAlpha = x;
    const v = Math.log(y + 1) / Math.log(p) * l.height;
    r.fillRect(g, l.height - v, o, 2);
  }
  la.set(a, r.getImageData(0, 0, l.width, l.height));
}
const Fw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_MAX_POLYPHONY: ao,
  Warpmode: Qa,
  aliasBank: NS,
  get analysers() {
    return vt;
  },
  get analysersData() {
    return us;
  },
  applyFM: Fi,
  applyGainCurve: pn,
  applyParameterModulators: Oa,
  cleanupOnEnd: k2,
  connectBusModulator: W2,
  connectEnvelope: N2,
  connectLFO: z2,
  connectToDestination: dM,
  createFilter: Z2,
  distortionAlgorithms: eo,
  dough: nw,
  doughTrigger: CM,
  doughsamples: xM,
  drawFrequencyScope: DM,
  drawTimeScope: XM,
  drywet: E2,
  dspWorklet: bM,
  effectSend: Ai,
  errorLogger: Pi,
  gainNode: je,
  getADSRValues: Nt,
  getAnalyserById: hM,
  getAnalyzerData: Dr,
  getAudioContext: ve,
  getAudioContextCurrentTime: TD,
  getAudioDevices: rM,
  getCachedBuffer: GS,
  getCompressor: w2,
  getDefaultValue: ut,
  getDistortion: V2,
  getDistortionAlgorithm: lS,
  getEnvelope: S2,
  getFrequencyFromValue: Kn,
  getLfo: Is,
  getLoadedBuffer: PS,
  getOscillator: yM,
  getParamADSR: zt,
  getParamLfo: $u,
  getPitchEnvelope: Bs,
  getSampleBuffer: I2,
  getSampleBufferSource: _2,
  getSampleInfo: T2,
  getSound: is,
  getSuperdoughAudioController: Xr,
  getVibratoOscillator: Vs,
  getWorklet: Dt,
  getZZFX: gM,
  initAudio: ho,
  initAudioOnFirstClick: lM,
  loadBuffer: cr,
  loadWorklets: cM,
  logger: lt,
  get maxPolyphony() {
    return uo;
  },
  get multiChannelOrbits() {
    return oo;
  },
  noises: qu,
  onTriggerSample: J2,
  onTriggerSynth: tM,
  onceEnded: bn,
  processSampleMap: j2,
  registerSampleSource: Q2,
  registerSamplesPrefix: AS,
  registerSound: sn,
  registerSynthSounds: mM,
  registerWaveTable: ro,
  registerWorklet: oM,
  registerZZFXSounds: tw,
  releaseAudioNode: Re,
  renderPatternAudio: dw,
  resetDefaultValues: aM,
  resetDefaults: _S,
  resetGlobalEffects: pM,
  resetLoadedSounds: KS,
  resetSeenKeys: $2,
  reverseBuffer: Y2,
  samples: O2,
  scheduleAtTime: eS,
  setAudioContext: or,
  setDefault: IS,
  setDefaultAudioContext: C2,
  setDefaultValue: lo,
  setDefaultValues: YS,
  setGainCurve: kS,
  setLogger: G2,
  setMaxPolyphony: nM,
  setMultiChannelOrbits: sM,
  setSuperdoughAudioController: tu,
  setVersionDefaults: HS,
  soundAlias: WS,
  soundMap: an,
  superdough: Sr,
  superdoughTrigger: JS,
  tables: VS,
  waveformN: fM,
  webAudioTimeout: mn,
  webaudioOutput: vM,
  webaudioRepl: PM
}, Symbol.toStringTag, { value: "Module" }));
function Xw(e, t) {
  function n() {
    this.constructor = e;
  }
  n.prototype = t.prototype, e.prototype = new n();
}
function hs(e, t, n, s) {
  var i = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(i, hs.prototype), i.expected = t, i.found = n, i.location = s, i.name = "SyntaxError", i;
}
Xw(hs, Error);
function da(e, t, n) {
  return n = n || " ", e.length > t ? e : (t -= e.length, n += n.repeat(t), e + n.slice(0, t));
}
hs.prototype.format = function(e) {
  var t = "Error: " + this.message;
  if (this.location) {
    var n = null, s;
    for (s = 0; s < e.length; s++)
      if (e[s].source === this.location.source) {
        n = e[s].text.split(/\r\n|\n|\r/g);
        break;
      }
    var i = this.location.start, r = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, a = this.location.source + ":" + r.line + ":" + r.column;
    if (n) {
      var u = this.location.end, o = da("", r.line.toString().length, " "), c = n[i.line - 1], l = i.line === u.line ? u.column : c.length + 1, p = l - i.column || 1;
      t += `
 --> ` + a + `
` + o + ` |
` + r.line + " | " + c + `
` + o + " | " + da("", i.column - 1, " ") + da("", p, "^");
    } else
      t += `
 at ` + a;
  }
  return t;
};
hs.buildMessage = function(e, t) {
  var n = {
    literal: function(c) {
      return '"' + i(c.text) + '"';
    },
    class: function(c) {
      var l = c.parts.map(function(p) {
        return Array.isArray(p) ? r(p[0]) + "-" + r(p[1]) : r(p);
      });
      return "[" + (c.inverted ? "^" : "") + l.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(c) {
      return c.description;
    }
  };
  function s(c) {
    return c.charCodeAt(0).toString(16).toUpperCase();
  }
  function i(c) {
    return c.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(l) {
      return "\\x0" + s(l);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(l) {
      return "\\x" + s(l);
    });
  }
  function r(c) {
    return c.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(l) {
      return "\\x0" + s(l);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(l) {
      return "\\x" + s(l);
    });
  }
  function a(c) {
    return n[c.type](c);
  }
  function u(c) {
    var l = c.map(a), p, m;
    if (l.sort(), l.length > 0) {
      for (p = 1, m = 1; p < l.length; p++)
        l[p - 1] !== l[p] && (l[m] = l[p], m++);
      l.length = m;
    }
    switch (l.length) {
      case 1:
        return l[0];
      case 2:
        return l[0] + " or " + l[1];
      default:
        return l.slice(0, -1).join(", ") + ", or " + l[l.length - 1];
    }
  }
  function o(c) {
    return c ? '"' + i(c) + '"' : "end of input";
  }
  return "Expected " + u(e) + " but " + o(t) + " found.";
};
function wM(e, t) {
  t = t !== void 0 ? t : {};
  var n = {}, s = t.grammarSource, i = { start: tc }, r = tc, a = ".", u = "-", o = "0", c = ",", l = "|", p = "[", m = "]", g = "{", y = "}", x = "%", v = "<", E = ">", w = "!", V = "(", D = ")", X = "/", Z = "*", L = "?", R = ":", H = "..", z = "^", $ = "struct", I = "target", Y = "euclid", ee = "slow", Me = "rotL", re = "rotR", de = "fast", se = "scale", Ie = "//", rt = "cat", dt = "$", O = "setcps", at = "setbpm", he = "hush", Ge = /^[1-9]/, Ce = /^[eE]/, Pe = /^[+\-]/, Se = /^[0-9]/, Le = /^[ \n\r\t\xA0]/, pt = /^["']/, ae = /^[#\--.0-9A-Z\^-_a-z~\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u09FC\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD-\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, We = /^[@_]/, Mt = /^[^\n]/, ie = ea("number"), J = Ve(".", false), He = Dn([["1", "9"]], false, false), pe = Dn(["e", "E"], false, false), Te = Dn(["+", "-"], false, false), Ct = Ve("-", false), dn = Ve("0", false), Nn = Dn([["0", "9"]], false, false), hn = ea("whitespace"), Xt = Dn([" ", `
`, "\r", "	", " "], false, false), Fn = Ve(",", false), De = Ve("|", false), Oe = Dn(['"', "'"], false, false), ye = ea('a letter, a number, "-", "#", ".", "^", "_"'), qe = Dn(["#", ["-", "."], ["0", "9"], ["A", "Z"], ["^", "_"], ["a", "z"], "~", "ª", "µ", "º", ["À", "Ö"], ["Ø", "ö"], ["ø", "ˁ"], ["ˆ", "ˑ"], ["ˠ", "ˤ"], "ˬ", "ˮ", ["Ͱ", "ʹ"], ["Ͷ", "ͷ"], ["ͺ", "ͽ"], "Ϳ", "Ά", ["Έ", "Ί"], "Ό", ["Ύ", "Ρ"], ["Σ", "ϵ"], ["Ϸ", "ҁ"], ["Ҋ", "ԯ"], ["Ա", "Ֆ"], "ՙ", ["ՠ", "ֈ"], ["א", "ת"], ["ׯ", "ײ"], ["ؠ", "ي"], ["ٮ", "ٯ"], ["ٱ", "ۓ"], "ە", ["ۥ", "ۦ"], ["ۮ", "ۯ"], ["ۺ", "ۼ"], "ۿ", "ܐ", ["ܒ", "ܯ"], ["ݍ", "ޥ"], "ޱ", ["ߊ", "ߪ"], ["ߴ", "ߵ"], "ߺ", ["ࠀ", "ࠕ"], "ࠚ", "ࠤ", "ࠨ", ["ࡀ", "ࡘ"], ["ࡠ", "ࡪ"], ["ࢠ", "ࢴ"], ["ࢶ", "ࢽ"], ["ऄ", "ह"], "ऽ", "ॐ", ["क़", "ॡ"], ["ॱ", "ঀ"], ["অ", "ঌ"], ["এ", "ঐ"], ["ও", "ন"], ["প", "র"], "ল", ["শ", "হ"], "ঽ", "ৎ", ["ড়", "ঢ়"], ["য়", "ৡ"], ["ৰ", "ৱ"], "ৼ", ["ਅ", "ਊ"], ["ਏ", "ਐ"], ["ਓ", "ਨ"], ["ਪ", "ਰ"], ["ਲ", "ਲ਼"], ["ਵ", "ਸ਼"], ["ਸ", "ਹ"], ["ਖ਼", "ੜ"], "ਫ਼", ["ੲ", "ੴ"], ["અ", "ઍ"], ["એ", "ઑ"], ["ઓ", "ન"], ["પ", "ર"], ["લ", "ળ"], ["વ", "હ"], "ઽ", "ૐ", ["ૠ", "ૡ"], "ૹ", ["ଅ", "ଌ"], ["ଏ", "ଐ"], ["ଓ", "ନ"], ["ପ", "ର"], ["ଲ", "ଳ"], ["ଵ", "ହ"], "ଽ", ["ଡ଼", "ଢ଼"], ["ୟ", "ୡ"], "ୱ", "ஃ", ["அ", "ஊ"], ["எ", "ஐ"], ["ஒ", "க"], ["ங", "ச"], "ஜ", ["ஞ", "ட"], ["ண", "த"], ["ந", "ப"], ["ம", "ஹ"], "ௐ", ["అ", "ఌ"], ["ఎ", "ఐ"], ["ఒ", "న"], ["ప", "హ"], "ఽ", ["ౘ", "ౚ"], ["ౠ", "ౡ"], "ಀ", ["ಅ", "ಌ"], ["ಎ", "ಐ"], ["ಒ", "ನ"], ["ಪ", "ಳ"], ["ವ", "ಹ"], "ಽ", "ೞ", ["ೠ", "ೡ"], ["ೱ", "ೲ"], ["അ", "ഌ"], ["എ", "ഐ"], ["ഒ", "ഺ"], "ഽ", "ൎ", ["ൔ", "ൖ"], ["ൟ", "ൡ"], ["ൺ", "ൿ"], ["අ", "ඖ"], ["ක", "න"], ["ඳ", "ර"], "ල", ["ව", "ෆ"], ["ก", "ะ"], ["า", "ำ"], ["เ", "ๆ"], ["ກ", "ຂ"], "ຄ", ["ງ", "ຈ"], "ຊ", "ຍ", ["ດ", "ທ"], ["ນ", "ຟ"], ["ມ", "ຣ"], "ລ", "ວ", ["ສ", "ຫ"], ["ອ", "ະ"], ["າ", "ຳ"], "ຽ", ["ເ", "ໄ"], "ໆ", ["ໜ", "ໟ"], "ༀ", ["ཀ", "ཇ"], ["ཉ", "ཬ"], ["ྈ", "ྌ"], ["က", "ဪ"], "ဿ", ["ၐ", "ၕ"], ["ၚ", "ၝ"], "ၡ", ["ၥ", "ၦ"], ["ၮ", "ၰ"], ["ၵ", "ႁ"], "ႎ", ["Ⴀ", "Ⴥ"], "Ⴧ", "Ⴭ", ["ა", "ჺ"], ["ჼ", "ቈ"], ["ቊ", "ቍ"], ["ቐ", "ቖ"], "ቘ", ["ቚ", "ቝ"], ["በ", "ኈ"], ["ኊ", "ኍ"], ["ነ", "ኰ"], ["ኲ", "ኵ"], ["ኸ", "ኾ"], "ዀ", ["ዂ", "ዅ"], ["ወ", "ዖ"], ["ዘ", "ጐ"], ["ጒ", "ጕ"], ["ጘ", "ፚ"], ["ᎀ", "ᎏ"], ["Ꭰ", "Ᏽ"], ["ᏸ", "ᏽ"], ["ᐁ", "ᙬ"], ["ᙯ", "ᙿ"], ["ᚁ", "ᚚ"], ["ᚠ", "ᛪ"], ["ᛮ", "ᛸ"], ["ᜀ", "ᜌ"], ["ᜎ", "ᜑ"], ["ᜠ", "ᜱ"], ["ᝀ", "ᝑ"], ["ᝠ", "ᝬ"], ["ᝮ", "ᝰ"], ["ក", "ឳ"], "ៗ", "ៜ", ["ᠠ", "ᡸ"], ["ᢀ", "ᢄ"], ["ᢇ", "ᢨ"], "ᢪ", ["ᢰ", "ᣵ"], ["ᤀ", "ᤞ"], ["ᥐ", "ᥭ"], ["ᥰ", "ᥴ"], ["ᦀ", "ᦫ"], ["ᦰ", "ᧉ"], ["ᨀ", "ᨖ"], ["ᨠ", "ᩔ"], "ᪧ", ["ᬅ", "ᬳ"], ["ᭅ", "ᭋ"], ["ᮃ", "ᮠ"], ["ᮮ", "ᮯ"], ["ᮺ", "ᯥ"], ["ᰀ", "ᰣ"], ["ᱍ", "ᱏ"], ["ᱚ", "ᱽ"], ["ᲀ", "ᲈ"], ["Ა", "Ჺ"], ["Ჽ", "Ჿ"], ["ᳩ", "ᳬ"], ["ᳮ", "ᳱ"], ["ᳵ", "ᳶ"], ["ᴀ", "ᶿ"], ["Ḁ", "ἕ"], ["Ἐ", "Ἕ"], ["ἠ", "ὅ"], ["Ὀ", "Ὅ"], ["ὐ", "ὗ"], "Ὑ", "Ὓ", "Ὕ", ["Ὗ", "ώ"], ["ᾀ", "ᾴ"], ["ᾶ", "ᾼ"], "ι", ["ῂ", "ῄ"], ["ῆ", "ῌ"], ["ῐ", "ΐ"], ["ῖ", "Ί"], ["ῠ", "Ῥ"], ["ῲ", "ῴ"], ["ῶ", "ῼ"], "ⁱ", "ⁿ", ["ₐ", "ₜ"], "ℂ", "ℇ", ["ℊ", "ℓ"], "ℕ", ["ℙ", "ℝ"], "ℤ", "Ω", "ℨ", ["K", "ℭ"], ["ℯ", "ℹ"], ["ℼ", "ℿ"], ["ⅅ", "ⅉ"], "ⅎ", ["Ⅰ", "ↈ"], ["Ⰰ", "Ⱞ"], ["ⰰ", "ⱞ"], ["Ⱡ", "ⳤ"], ["Ⳬ", "ⳮ"], ["Ⳳ", "ⳳ"], ["ⴀ", "ⴥ"], "ⴧ", "ⴭ", ["ⴰ", "ⵧ"], "ⵯ", ["ⶀ", "ⶖ"], ["ⶠ", "ⶦ"], ["ⶨ", "ⶮ"], ["ⶰ", "ⶶ"], ["ⶸ", "ⶾ"], ["ⷀ", "ⷆ"], ["ⷈ", "ⷎ"], ["ⷐ", "ⷖ"], ["ⷘ", "ⷞ"], "ⸯ", ["々", "〇"], ["〡", "〩"], ["〱", "〵"], ["〸", "〼"], ["ぁ", "ゖ"], ["ゝ", "ゟ"], ["ァ", "ヺ"], ["ー", "ヿ"], ["ㄅ", "ㄯ"], ["ㄱ", "ㆎ"], ["ㆠ", "ㆺ"], ["ㇰ", "ㇿ"], ["㐀", "䶵"], ["一", "鿯"], ["ꀀ", "ꒌ"], ["ꓐ", "ꓽ"], ["ꔀ", "ꘌ"], ["ꘐ", "ꘟ"], ["ꘪ", "ꘫ"], ["Ꙁ", "ꙮ"], ["ꙿ", "ꚝ"], ["ꚠ", "ꛯ"], ["ꜗ", "ꜟ"], ["Ꜣ", "ꞈ"], ["Ꞌ", "ꞹ"], ["ꟷ", "ꠁ"], ["ꠃ", "ꠅ"], ["ꠇ", "ꠊ"], ["ꠌ", "ꠢ"], ["ꡀ", "ꡳ"], ["ꢂ", "ꢳ"], ["ꣲ", "ꣷ"], "ꣻ", ["ꣽ", "ꣾ"], ["ꤊ", "ꤥ"], ["ꤰ", "ꥆ"], ["ꥠ", "ꥼ"], ["ꦄ", "ꦲ"], "ꧏ", ["ꧠ", "ꧤ"], ["ꧦ", "ꧯ"], ["ꧺ", "ꧾ"], ["ꨀ", "ꨨ"], ["ꩀ", "ꩂ"], ["ꩄ", "ꩋ"], ["ꩠ", "ꩶ"], "ꩺ", ["ꩾ", "ꪯ"], "ꪱ", ["ꪵ", "ꪶ"], ["ꪹ", "ꪽ"], "ꫀ", "ꫂ", ["ꫛ", "ꫝ"], ["ꫠ", "ꫪ"], ["ꫲ", "ꫴ"], ["ꬁ", "ꬆ"], ["ꬉ", "ꬎ"], ["ꬑ", "ꬖ"], ["ꬠ", "ꬦ"], ["ꬨ", "ꬮ"], ["ꬰ", "ꭚ"], ["ꭜ", "ꭥ"], ["ꭰ", "ꯢ"], ["가", "힣"], ["ힰ", "ퟆ"], ["ퟋ", "ퟻ"], ["豈", "舘"], ["並", "龎"], ["ﬀ", "ﬆ"], ["ﬓ", "ﬗ"], "יִ", ["ײַ", "ﬨ"], ["שׁ", "זּ"], ["טּ", "לּ"], "מּ", ["נּ", "סּ"], ["ףּ", "פּ"], ["צּ", "ﮱ"], ["ﯓ", "ﴽ"], ["ﵐ", "ﶏ"], ["ﶒ", "ﷇ"], ["ﷰ", "ﷻ"], ["ﹰ", "ﹴ"], ["ﹶ", "ﻼ"], ["Ａ", "Ｚ"], ["ａ", "ｚ"], ["ｦ", "ﾾ"], ["ￂ", "ￇ"], ["ￊ", "ￏ"], ["ￒ", "ￗ"], ["ￚ", "ￜ"]], false, false), Ke = Ve("[", false), ts = Ve("]", false), ns = Ve("{", false), mt = Ve("}", false), Wn = Ve("%", false), me = Ve("<", false), be = Ve(">", false), $e = Dn(["@", "_"], false, false), Je = Ve("!", false), we = Ve("(", false), _e = Ve(")", false), Bt = Ve("/", false), Vt = Ve("*", false), Wi = Ve("?", false), qr = Ve(":", false), $r = Ve("..", false), d = Ve("^", false), b = Ve("struct", false), f = Ve("target", false), M = Ve("euclid", false), P = Ve("slow", false), k = Ve("rotL", false), W = Ve("rotR", false), K = Ve("fast", false), te = Ve("scale", false), Ze = Ve("//", false), ot = Dn([`
`], true, false), Xn = Ve("cat", false), Tn = Ve("$", false), Ti = Ve("setcps", false), Ii = Ve("setbpm", false), _t = Ve("hush", false), kC = function() {
    return parseFloat(G5());
  }, zC = function(h) {
    const G = h.join("");
    return G === "." || G === "_";
  }, NC = function(h) {
    return new d9(h.join(""));
  }, WC = function(h) {
    return h;
  }, TC = function(h, G) {
    return h.arguments_.stepsPerCycle = G, h;
  }, IC = function(h) {
    return h;
  }, _C = function(h) {
    return h.arguments_.alignment = "polymeter_slowcat", h;
  }, YC = function(h) {
    return (G) => G.options_.weight = (G.options_.weight ?? 1) + (h ?? 2) - 1;
  }, HC = function(h) {
    return (G) => {
      const S = (G.options_.reps ?? 1) + (h ?? 2) - 1;
      G.options_.reps = S, G.options_.ops = G.options_.ops.filter((N) => N.type_ !== "replicate"), G.options_.ops.push({ type_: "replicate", arguments_: { amount: S } }), G.options_.weight = S;
    };
  }, KC = function(h, G, S) {
    return (N) => N.options_.ops.push({ type_: "bjorklund", arguments_: { pulse: h, step: G, rotation: S } });
  }, jC = function(h) {
    return (G) => G.options_.ops.push({ type_: "stretch", arguments_: { amount: h, type: "slow" } });
  }, UC = function(h) {
    return (G) => G.options_.ops.push({ type_: "stretch", arguments_: { amount: h, type: "fast" } });
  }, OC = function(h) {
    return (G) => G.options_.ops.push({ type_: "degradeBy", arguments_: { amount: h, seed: ia++ } });
  }, JC = function(h) {
    return (G) => G.options_.ops.push({ type_: "tail", arguments_: { element: h } });
  }, QC = function(h) {
    return (G) => G.options_.ops.push({ type_: "range", arguments_: { element: h } });
  }, qC = function(h, G) {
    const S = new p9(h, { ops: [], weight: 1, reps: 1 });
    for (const N of G)
      N(S);
    return S;
  }, $C = function(h, G) {
    return new Ki(G, "fastcat", void 0, !!h);
  }, e5 = function(h) {
    return { alignment: "stack", list: h };
  }, t5 = function(h) {
    return { alignment: "rand", list: h, seed: ia++ };
  }, n5 = function(h) {
    return { alignment: "feet", list: h, seed: ia++ };
  }, s5 = function(h, G) {
    return G && G.list.length > 0 ? new Ki([h, ...G.list], G.alignment, G.seed) : h;
  }, i5 = function(h, G) {
    return new Ki(G ? [h, ...G.list] : [h], "polymeter");
  }, r5 = function(h) {
    return h;
  }, a5 = function(h) {
    return { name: "struct", args: { mini: h } };
  }, u5 = function(h) {
    return { name: "target", args: { name: h } };
  }, o5 = function(h, G, S) {
    return { name: "bjorklund", args: { pulse: h, step: parseInt(G) } };
  }, c5 = function(h) {
    return { name: "stretch", args: { amount: h } };
  }, l5 = function(h) {
    return { name: "shift", args: { amount: "-" + h } };
  }, d5 = function(h) {
    return { name: "shift", args: { amount: h } };
  }, h5 = function(h) {
    return { name: "stretch", args: { amount: "1/" + h } };
  }, p5 = function(h) {
    return { name: "scale", args: { scale: h.join("") } };
  }, qo = function(h, G) {
    return G;
  }, m5 = function(h, G) {
    return G.unshift(h), new Ki(G, "slowcat");
  }, f5 = function(h) {
    return h;
  }, y5 = function(h, G) {
    return new h9(h.name, h.args, G);
  }, g5 = function(h) {
    return h;
  }, b5 = function(h) {
    return h;
  }, M5 = function(h) {
    return new sa("setcps", { value: h });
  }, C5 = function(h) {
    return new sa("setcps", { value: h / 120 / 2 });
  }, x5 = function() {
    return new sa("hush");
  }, F = t.peg$currPos | 0, Ae = F, Ms = [{ line: 1, column: 1 }], qt = F, _i = t.peg$maxFailExpected || [], oe = t.peg$silentFails | 0, $s;
  if (t.startRule) {
    if (!(t.startRule in i))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    r = i[t.startRule];
  }
  function G5() {
    return e.substring(Ae, F);
  }
  function $o() {
    return ta(Ae, F);
  }
  function Ve(h, G) {
    return { type: "literal", text: h, ignoreCase: G };
  }
  function Dn(h, G, S) {
    return { type: "class", parts: h, inverted: G, ignoreCase: S };
  }
  function v5() {
    return { type: "end" };
  }
  function ea(h) {
    return { type: "other", description: h };
  }
  function ec(h) {
    var G = Ms[h], S;
    if (G)
      return G;
    if (h >= Ms.length)
      S = Ms.length - 1;
    else
      for (S = h; !Ms[--S]; )
        ;
    for (G = Ms[S], G = {
      line: G.line,
      column: G.column
    }; S < h; )
      e.charCodeAt(S) === 10 ? (G.line++, G.column = 1) : G.column++, S++;
    return Ms[h] = G, G;
  }
  function ta(h, G, S) {
    var N = ec(h), ce = ec(G), nt = {
      source: s,
      start: {
        offset: h,
        line: N.line,
        column: N.column
      },
      end: {
        offset: G,
        line: ce.line,
        column: ce.column
      }
    };
    return nt;
  }
  function fe(h) {
    F < qt || (F > qt && (qt = F, _i = []), _i.push(h));
  }
  function P5(h, G, S) {
    return new hs(
      hs.buildMessage(h, G),
      h,
      G,
      S
    );
  }
  function tc() {
    var h;
    return h = l9(), h;
  }
  function Sn() {
    var h, G;
    return oe++, h = F, w5(), G = Yi(), G !== n ? (S5(), D5(), Ae = h, h = kC()) : (F = h, h = n), oe--, h === n && oe === 0 && fe(ie), h;
  }
  function A5() {
    var h;
    return e.charCodeAt(F) === 46 ? (h = a, F++) : (h = n, oe === 0 && fe(J)), h;
  }
  function F5() {
    var h;
    return h = e.charAt(F), Ge.test(h) ? F++ : (h = n, oe === 0 && fe(He)), h;
  }
  function X5() {
    var h;
    return h = e.charAt(F), Ce.test(h) ? F++ : (h = n, oe === 0 && fe(pe)), h;
  }
  function D5() {
    var h, G, S, N, ce;
    if (h = F, G = X5(), G !== n) {
      if (S = e.charAt(F), Pe.test(S) ? F++ : (S = n, oe === 0 && fe(Te)), S === n && (S = null), N = [], ce = Cs(), ce !== n)
        for (; ce !== n; )
          N.push(ce), ce = Cs();
      else
        N = n;
      N !== n ? (G = [G, S, N], h = G) : (F = h, h = n);
    } else
      F = h, h = n;
    return h;
  }
  function S5() {
    var h, G, S, N;
    if (h = F, G = A5(), G !== n) {
      if (S = [], N = Cs(), N !== n)
        for (; N !== n; )
          S.push(N), N = Cs();
      else
        S = n;
      S !== n ? (G = [G, S], h = G) : (F = h, h = n);
    } else
      F = h, h = n;
    return h;
  }
  function Yi() {
    var h, G, S, N;
    if (h = Z5(), h === n)
      if (h = F, G = F5(), G !== n) {
        for (S = [], N = Cs(); N !== n; )
          S.push(N), N = Cs();
        G = [G, S], h = G;
      } else
        F = h, h = n;
    return h;
  }
  function w5() {
    var h;
    return e.charCodeAt(F) === 45 ? (h = u, F++) : (h = n, oe === 0 && fe(Ct)), h;
  }
  function Z5() {
    var h;
    return e.charCodeAt(F) === 48 ? (h = o, F++) : (h = n, oe === 0 && fe(dn)), h;
  }
  function Cs() {
    var h;
    return h = e.charAt(F), Se.test(h) ? F++ : (h = n, oe === 0 && fe(Nn)), h;
  }
  function ge() {
    var h, G;
    for (oe++, h = [], G = e.charAt(F), Le.test(G) ? F++ : (G = n, oe === 0 && fe(Xt)); G !== n; )
      h.push(G), G = e.charAt(F), Le.test(G) ? F++ : (G = n, oe === 0 && fe(Xt));
    return oe--, G = n, oe === 0 && fe(hn), h;
  }
  function xs() {
    var h, G, S, N;
    return h = F, G = ge(), e.charCodeAt(F) === 44 ? (S = c, F++) : (S = n, oe === 0 && fe(Fn)), S !== n ? (N = ge(), G = [G, S, N], h = G) : (F = h, h = n), h;
  }
  function nc() {
    var h, G, S, N;
    return h = F, G = ge(), e.charCodeAt(F) === 124 ? (S = l, F++) : (S = n, oe === 0 && fe(De)), S !== n ? (N = ge(), G = [G, S, N], h = G) : (F = h, h = n), h;
  }
  function sc() {
    var h, G, S, N;
    return h = F, G = ge(), e.charCodeAt(F) === 46 ? (S = a, F++) : (S = n, oe === 0 && fe(J)), S !== n ? (N = ge(), G = [G, S, N], h = G) : (F = h, h = n), h;
  }
  function Gs() {
    var h;
    return h = e.charAt(F), pt.test(h) ? F++ : (h = n, oe === 0 && fe(Oe)), h;
  }
  function Hi() {
    var h;
    return oe++, h = e.charAt(F), ae.test(h) ? F++ : (h = n, oe === 0 && fe(qe)), oe--, h === n && oe === 0 && fe(ye), h;
  }
  function ic() {
    var h, G, S, N;
    if (h = F, ge(), G = [], S = Hi(), S !== n)
      for (; S !== n; )
        G.push(S), S = Hi();
    else
      G = n;
    return G !== n ? (S = ge(), Ae = F, N = zC(G), N ? N = n : N = void 0, N !== n ? (Ae = h, h = NC(G)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function E5() {
    var h, G, S, N;
    return h = F, ge(), e.charCodeAt(F) === 91 ? (G = p, F++) : (G = n, oe === 0 && fe(Ke)), G !== n ? (ge(), S = uc(), S !== n ? (ge(), e.charCodeAt(F) === 93 ? (N = m, F++) : (N = n, oe === 0 && fe(ts)), N !== n ? (ge(), Ae = h, h = WC(S)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function L5() {
    var h, G, S, N, ce;
    return h = F, ge(), e.charCodeAt(F) === 123 ? (G = g, F++) : (G = n, oe === 0 && fe(ns)), G !== n ? (ge(), S = oc(), S !== n ? (ge(), e.charCodeAt(F) === 125 ? (N = y, F++) : (N = n, oe === 0 && fe(mt)), N !== n ? (ce = R5(), ce === n && (ce = null), ge(), Ae = h, h = TC(S, ce)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function R5() {
    var h, G, S;
    return h = F, e.charCodeAt(F) === 37 ? (G = x, F++) : (G = n, oe === 0 && fe(Wn)), G !== n ? (S = vs(), S !== n ? (Ae = h, h = IC(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function B5() {
    var h, G, S, N;
    return h = F, ge(), e.charCodeAt(F) === 60 ? (G = v, F++) : (G = n, oe === 0 && fe(me)), G !== n ? (ge(), S = oc(), S !== n ? (ge(), e.charCodeAt(F) === 62 ? (N = E, F++) : (N = n, oe === 0 && fe(be)), N !== n ? (ge(), Ae = h, h = _C(S)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function vs() {
    var h;
    return h = ic(), h === n && (h = E5(), h === n && (h = L5(), h === n && (h = B5()))), h;
  }
  function rc() {
    var h;
    return h = V5(), h === n && (h = z5(), h === n && (h = N5(), h === n && (h = W5(), h === n && (h = k5(), h === n && (h = T5(), h === n && (h = I5(), h === n && (h = _5()))))))), h;
  }
  function V5() {
    var h, G, S;
    return h = F, ge(), G = e.charAt(F), We.test(G) ? F++ : (G = n, oe === 0 && fe($e)), G !== n ? (S = Sn(), S === n && (S = null), Ae = h, h = YC(S)) : (F = h, h = n), h;
  }
  function k5() {
    var h, G, S;
    return h = F, ge(), e.charCodeAt(F) === 33 ? (G = w, F++) : (G = n, oe === 0 && fe(Je)), G !== n ? (S = Sn(), S === n && (S = null), Ae = h, h = HC(S)) : (F = h, h = n), h;
  }
  function z5() {
    var h, G, S, N, ce, nt, $t;
    return h = F, e.charCodeAt(F) === 40 ? (G = V, F++) : (G = n, oe === 0 && fe(we)), G !== n ? (ge(), S = ei(), S !== n ? (ge(), N = xs(), N !== n ? (ge(), ce = ei(), ce !== n ? (ge(), xs(), ge(), nt = ei(), nt === n && (nt = null), ge(), e.charCodeAt(F) === 41 ? ($t = D, F++) : ($t = n, oe === 0 && fe(_e)), $t !== n ? (Ae = h, h = KC(S, ce, nt)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function N5() {
    var h, G, S;
    return h = F, e.charCodeAt(F) === 47 ? (G = X, F++) : (G = n, oe === 0 && fe(Bt)), G !== n ? (S = vs(), S !== n ? (Ae = h, h = jC(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function W5() {
    var h, G, S;
    return h = F, e.charCodeAt(F) === 42 ? (G = Z, F++) : (G = n, oe === 0 && fe(Vt)), G !== n ? (S = vs(), S !== n ? (Ae = h, h = UC(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function T5() {
    var h, G, S;
    return h = F, e.charCodeAt(F) === 63 ? (G = L, F++) : (G = n, oe === 0 && fe(Wi)), G !== n ? (S = Sn(), S === n && (S = null), Ae = h, h = OC(S)) : (F = h, h = n), h;
  }
  function I5() {
    var h, G, S;
    return h = F, e.charCodeAt(F) === 58 ? (G = R, F++) : (G = n, oe === 0 && fe(qr)), G !== n ? (S = vs(), S !== n ? (Ae = h, h = JC(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function _5() {
    var h, G, S;
    return h = F, e.substr(F, 2) === H ? (G = H, F += 2) : (G = n, oe === 0 && fe($r)), G !== n ? (S = vs(), S !== n ? (Ae = h, h = QC(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function ei() {
    var h, G, S, N;
    if (h = F, G = vs(), G !== n) {
      for (S = [], N = rc(); N !== n; )
        S.push(N), N = rc();
      Ae = h, h = qC(G, S);
    } else
      F = h, h = n;
    return h;
  }
  function In() {
    var h, G, S, N;
    if (h = F, e.charCodeAt(F) === 94 ? (G = z, F++) : (G = n, oe === 0 && fe(d)), G === n && (G = null), S = [], N = ei(), N !== n)
      for (; N !== n; )
        S.push(N), N = ei();
    else
      S = n;
    return S !== n ? (Ae = h, h = $C(G, S)) : (F = h, h = n), h;
  }
  function ac() {
    var h, G, S, N, ce;
    if (h = F, G = [], S = F, N = xs(), N !== n ? (ce = In(), ce !== n ? S = ce : (F = S, S = n)) : (F = S, S = n), S !== n)
      for (; S !== n; )
        G.push(S), S = F, N = xs(), N !== n ? (ce = In(), ce !== n ? S = ce : (F = S, S = n)) : (F = S, S = n);
    else
      G = n;
    return G !== n && (Ae = h, G = e5(G)), h = G, h;
  }
  function Y5() {
    var h, G, S, N, ce;
    if (h = F, G = [], S = F, N = nc(), N !== n ? (ce = In(), ce !== n ? S = ce : (F = S, S = n)) : (F = S, S = n), S !== n)
      for (; S !== n; )
        G.push(S), S = F, N = nc(), N !== n ? (ce = In(), ce !== n ? S = ce : (F = S, S = n)) : (F = S, S = n);
    else
      G = n;
    return G !== n && (Ae = h, G = t5(G)), h = G, h;
  }
  function H5() {
    var h, G, S, N, ce;
    if (h = F, G = [], S = F, N = sc(), N !== n ? (ce = In(), ce !== n ? S = ce : (F = S, S = n)) : (F = S, S = n), S !== n)
      for (; S !== n; )
        G.push(S), S = F, N = sc(), N !== n ? (ce = In(), ce !== n ? S = ce : (F = S, S = n)) : (F = S, S = n);
    else
      G = n;
    return G !== n && (Ae = h, G = n5(G)), h = G, h;
  }
  function uc() {
    var h, G, S;
    return h = F, G = In(), G !== n ? (S = ac(), S === n && (S = Y5(), S === n && (S = H5())), S === n && (S = null), Ae = h, h = s5(G, S)) : (F = h, h = n), h;
  }
  function oc() {
    var h, G, S;
    return h = F, G = In(), G !== n ? (S = ac(), S === n && (S = null), Ae = h, h = i5(G, S)) : (F = h, h = n), h;
  }
  function K5() {
    var h, G, S, N;
    return h = F, ge(), G = Gs(), G !== n ? (ge(), S = uc(), S !== n ? (ge(), N = Gs(), N !== n ? (Ae = h, h = r5(S)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function j5() {
    var h;
    return h = t9(), h === n && (h = Q5(), h === n && (h = e9(), h === n && (h = O5(), h === n && (h = J5(), h === n && (h = U5(), h === n && (h = $5(), h === n && (h = q5()))))))), h;
  }
  function U5() {
    var h, G, S;
    return h = F, e.substr(F, 6) === $ ? (G = $, F += 6) : (G = n, oe === 0 && fe(b)), G !== n ? (ge(), S = Ps(), S !== n ? (Ae = h, h = a5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function O5() {
    var h, G, S, N, ce;
    return h = F, e.substr(F, 6) === I ? (G = I, F += 6) : (G = n, oe === 0 && fe(f)), G !== n ? (ge(), S = Gs(), S !== n ? (N = ic(), N !== n ? (ce = Gs(), ce !== n ? (Ae = h, h = u5(N)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function J5() {
    var h, G, S, N;
    return h = F, e.substr(F, 6) === Y ? (G = Y, F += 6) : (G = n, oe === 0 && fe(M)), G !== n ? (ge(), S = Yi(), S !== n ? (ge(), N = Yi(), N !== n ? (ge(), Yi(), Ae = h, h = o5(S, N)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function Q5() {
    var h, G, S;
    return h = F, e.substr(F, 4) === ee ? (G = ee, F += 4) : (G = n, oe === 0 && fe(P)), G !== n ? (ge(), S = Sn(), S !== n ? (Ae = h, h = c5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function q5() {
    var h, G, S;
    return h = F, e.substr(F, 4) === Me ? (G = Me, F += 4) : (G = n, oe === 0 && fe(k)), G !== n ? (ge(), S = Sn(), S !== n ? (Ae = h, h = l5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function $5() {
    var h, G, S;
    return h = F, e.substr(F, 4) === re ? (G = re, F += 4) : (G = n, oe === 0 && fe(W)), G !== n ? (ge(), S = Sn(), S !== n ? (Ae = h, h = d5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function e9() {
    var h, G, S;
    return h = F, e.substr(F, 4) === de ? (G = de, F += 4) : (G = n, oe === 0 && fe(K)), G !== n ? (ge(), S = Sn(), S !== n ? (Ae = h, h = h5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function t9() {
    var h, G, S, N, ce;
    if (h = F, e.substr(F, 5) === se ? (G = se, F += 5) : (G = n, oe === 0 && fe(te)), G !== n)
      if (ge(), S = Gs(), S !== n) {
        if (N = [], ce = Hi(), ce !== n)
          for (; ce !== n; )
            N.push(ce), ce = Hi();
        else
          N = n;
        N !== n ? (ce = Gs(), ce !== n ? (Ae = h, h = p5(N)) : (F = h, h = n)) : (F = h, h = n);
      } else
        F = h, h = n;
    else
      F = h, h = n;
    return h;
  }
  function na() {
    var h, G, S, N;
    if (h = F, e.substr(F, 2) === Ie ? (G = Ie, F += 2) : (G = n, oe === 0 && fe(Ze)), G !== n) {
      for (S = [], N = e.charAt(F), Mt.test(N) ? F++ : (N = n, oe === 0 && fe(ot)); N !== n; )
        S.push(N), N = e.charAt(F), Mt.test(N) ? F++ : (N = n, oe === 0 && fe(ot));
      G = [G, S], h = G;
    } else
      F = h, h = n;
    return h;
  }
  function n9() {
    var h, G, S, N, ce, nt, $t, As;
    if (h = F, e.substr(F, 3) === rt ? (G = rt, F += 3) : (G = n, oe === 0 && fe(Xn)), G !== n)
      if (ge(), e.charCodeAt(F) === 91 ? (S = p, F++) : (S = n, oe === 0 && fe(Ke)), S !== n)
        if (ge(), N = Ps(), N !== n) {
          for (ce = [], nt = F, $t = xs(), $t !== n ? (As = Ps(), As !== n ? (Ae = nt, nt = qo(N, As)) : (F = nt, nt = n)) : (F = nt, nt = n); nt !== n; )
            ce.push(nt), nt = F, $t = xs(), $t !== n ? (As = Ps(), As !== n ? (Ae = nt, nt = qo(N, As)) : (F = nt, nt = n)) : (F = nt, nt = n);
          nt = ge(), e.charCodeAt(F) === 93 ? ($t = m, F++) : ($t = n, oe === 0 && fe(ts)), $t !== n ? (Ae = h, h = m5(N, ce)) : (F = h, h = n);
        } else
          F = h, h = n;
      else
        F = h, h = n;
    else
      F = h, h = n;
    return h;
  }
  function s9() {
    var h;
    return h = n9(), h === n && (h = K5()), h;
  }
  function Ps() {
    var h, G, S, N, ce;
    if (h = F, G = s9(), G !== n) {
      for (ge(), S = [], N = na(); N !== n; )
        S.push(N), N = na();
      Ae = h, h = f5(G);
    } else
      F = h, h = n;
    return h === n && (h = F, G = j5(), G !== n ? (ge(), e.charCodeAt(F) === 36 ? (S = dt, F++) : (S = n, oe === 0 && fe(Tn)), S !== n ? (N = ge(), ce = Ps(), ce !== n ? (Ae = h, h = y5(G, ce)) : (F = h, h = n)) : (F = h, h = n)) : (F = h, h = n)), h;
  }
  function i9() {
    var h, G;
    return h = F, G = Ps(), G !== n && (Ae = h, G = g5(G)), h = G, h === n && (h = na()), h;
  }
  function r9() {
    var h;
    return h = i9(), h;
  }
  function a9() {
    var h, G;
    return h = F, ge(), G = u9(), G === n && (G = o9(), G === n && (G = c9())), G !== n ? (ge(), Ae = h, h = b5(G)) : (F = h, h = n), h;
  }
  function u9() {
    var h, G, S;
    return h = F, e.substr(F, 6) === O ? (G = O, F += 6) : (G = n, oe === 0 && fe(Ti)), G !== n ? (ge(), S = Sn(), S !== n ? (Ae = h, h = M5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function o9() {
    var h, G, S;
    return h = F, e.substr(F, 6) === at ? (G = at, F += 6) : (G = n, oe === 0 && fe(Ii)), G !== n ? (ge(), S = Sn(), S !== n ? (Ae = h, h = C5(S)) : (F = h, h = n)) : (F = h, h = n), h;
  }
  function c9() {
    var h, G;
    return h = F, e.substr(F, 4) === he ? (G = he, F += 4) : (G = n, oe === 0 && fe(_t)), G !== n && (Ae = h, G = x5()), h = G, h;
  }
  function l9() {
    var h;
    return h = r9(), h === n && (h = a9()), h;
  }
  var d9 = function(h) {
    this.type_ = "atom", this.source_ = h, this.location_ = $o();
  }, Ki = function(h, G, S, N) {
    this.type_ = "pattern", this.arguments_ = { alignment: G, _steps: N }, S !== void 0 && (this.arguments_.seed = S), this.source_ = h;
  }, h9 = function(h, G, S) {
    this.type_ = h, this.arguments_ = G, this.source_ = S;
  }, p9 = function(h, G) {
    this.type_ = "element", this.source_ = h, this.options_ = G, this.location_ = $o();
  }, sa = function(h, G) {
    this.type_ = "command", this.name_ = h, this.options_ = G;
  }, ia = 0;
  if ($s = r(), t.peg$library)
    return (
      /** @type {any} */
      {
        peg$result: $s,
        peg$currPos: F,
        peg$FAILED: n,
        peg$maxFailExpected: _i,
        peg$maxFailPos: qt
      }
    );
  if ($s !== n && F === e.length)
    return $s;
  throw $s !== n && F < e.length && fe(v5()), P5(
    _i,
    qt < e.length ? e.charAt(qt) : null,
    qt < e.length ? ta(qt, qt + 1) : ta(qt, qt)
  );
}
const Dw = [
  "start"
], ZM = 3e-4, Sw = (e, t) => (n, s) => {
  const a = e.source_[s].options_?.ops, u = n.__steps_source;
  if (a)
    for (const o of a)
      switch (o.type_) {
        case "stretch": {
          const c = ["fast", "slow"], { type: l, amount: p } = o.arguments_;
          if (!c.includes(l))
            throw new Error(`mini: stretch: type must be one of ${c.join("|")} but got ${l}`);
          n = j(n)[l](t(p));
          break;
        }
        case "replicate": {
          const { amount: c } = o.arguments_;
          n = j(n), n = n._repeatCycles(c)._fast(c);
          break;
        }
        case "bjorklund": {
          o.arguments_.rotation ? n = n.euclidRot(t(o.arguments_.pulse), t(o.arguments_.step), t(o.arguments_.rotation)) : n = n.euclid(t(o.arguments_.pulse), t(o.arguments_.step));
          break;
        }
        case "degradeBy": {
          n = j(n)._degradeByWith(St.early(ZM * o.arguments_.seed), o.arguments_.amount ?? 0.5);
          break;
        }
        case "tail": {
          const c = t(o.arguments_.element);
          n = n.fmap((l) => (p) => Array.isArray(l) ? [...l, p] : [l, p]).appLeft(c);
          break;
        }
        case "range": {
          const c = t(o.arguments_.element);
          n = j(n);
          const l = (m, g, y = 1) => Array.from(
            { length: Math.abs(g - m) / y + 1 },
            (x, v) => m < g ? m + v * y : m - v * y
          );
          n = ((m, g) => m.squeezeBind((y) => g.bind((x) => Ft(...l(y, x)))))(n, c);
          break;
        }
        default:
          console.warn(`operator "${o.type_}" not implemented`);
      }
  return n.__steps_source = n.__steps_source || u, n;
};
function _s(e, t, n, s = 0) {
  n?.(e);
  const i = (r) => _s(r, t, n, s);
  switch (e.type_) {
    case "pattern": {
      const r = e.source_.map((c) => i(c)).map(Sw(e, i)), a = e.arguments_.alignment, u = r.filter((c) => c.__steps_source);
      let o;
      switch (a) {
        case "stack": {
          o = tt(...r), u.length && (o._steps = rn(...u.map((c) => U(c._steps))));
          break;
        }
        case "polymeter_slowcat": {
          o = tt(...r.map((c) => c._slow(c.__weight))), u.length && (o._steps = rn(...u.map((c) => U(c._steps))));
          break;
        }
        case "polymeter": {
          const c = e.arguments_.stepsPerCycle ? i(e.arguments_.stepsPerCycle).fmap((p) => U(p)) : Ue(U(r.length > 0 ? r[0].__weight : 1)), l = r.map((p) => p.fast(c.fmap((m) => m.div(p.__weight))));
          o = tt(...l);
          break;
        }
        case "rand": {
          o = Ar(St.early(ZM * e.arguments_.seed).segment(1), r), u.length && (o._steps = rn(...u.map((c) => U(c._steps))));
          break;
        }
        case "feet": {
          o = Ft(...r);
          break;
        }
        default: {
          if (e.source_.some((l) => !!l.options_?.weight)) {
            const l = e.source_.reduce(
              (p, m) => p.add(m.options_?.weight || U(1)),
              U(0)
            );
            o = Su(
              ...e.source_.map((p, m) => [p.options_?.weight || U(1), r[m]])
            ), o.__weight = l, o._steps = l, u.length && (o._steps = o._steps.mul(rn(...u.map((p) => U(p._steps)))));
          } else
            o = on(...r), o._steps = r.length;
          e.arguments_._steps && (o.__steps_source = true);
        }
      }
      return u.length && (o.__steps_source = true), o;
    }
    case "element":
      return i(e.source_);
    case "atom": {
      if (e.source_ === "~" || e.source_ === "-")
        return Ye;
      if (!e.location_)
        return console.warn("no location for", e), e.source_;
      const r = isNaN(Number(e.source_)) ? e.source_ : Number(e.source_);
      if (s === -1)
        return Ue(r);
      const [a, u] = po(t, e, s);
      return Ue(r).withLoc(a, u);
    }
    case "stretch":
      return i(e.source_).slow(i(e.arguments_.amount));
    default:
      return console.warn(`node type "${e.type_}" not implemented -> returning silence`), Ye;
  }
}
const po = (e, t, n = 0) => {
  const { start: s, end: i } = t.location_, r = e?.split("").slice(s.offset, i.offset).join(""), [a = 0, u = 0] = r ? r.split(t.source_).map((o) => o.split("").filter((c) => c === " ").length) : [];
  return [s.offset + a + n, i.offset - u + n];
}, Ri = (e, t = 0, n = e) => {
  try {
    return wM(e);
  } catch (s) {
    const i = [s.location.start.offset + t, s.location.end.offset + t], r = n.slice(0, i[0]).split(`
`).length;
    throw new Error(`[mini] parse error at line ${r}: ${s.message}`);
  }
}, EM = (e, t, n) => {
  const s = Ri(e, t, n);
  let i = [];
  return _s(
    s,
    e,
    (r) => {
      r.type_ === "atom" && i.push(r);
    },
    -1
  ), i;
}, mo = (e, t = 0, n) => EM(e, t, n).map((s) => po(e, s, t)), fo = (...e) => {
  const t = e.map((n) => {
    const s = `"${n}"`, i = Ri(s);
    return _s(i, s);
  });
  return on(...t);
}, ww = (e, t) => {
  const n = `"${e}"`, s = Ri(n);
  return _s(s, n, null, t);
}, Zw = (e) => {
  const t = Ri(e);
  return _s(t, e);
};
function Ew(e) {
  return typeof e == "string" ? fo(e) : j(e);
}
function LM() {
  t0(fo);
}
const Lw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  StartRules: Dw,
  SyntaxError: hs,
  getLeafLocation: po,
  getLeafLocations: mo,
  getLeaves: EM,
  h: Zw,
  m: ww,
  mini: fo,
  mini2ast: Ri,
  miniAllStrings: LM,
  minify: Ew,
  parse: wM,
  patternifyAST: _s
}, Symbol.toStringTag, { value: "Module" }));
var Rw = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], RM = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], Bw = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", BM = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", ha = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, pa = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", Vw = {
  5: pa,
  "5module": pa + " export import",
  6: pa + " const class extends export import super"
}, kw = /^in(stanceof)?$/, zw = new RegExp("[" + BM + "]"), Nw = new RegExp("[" + BM + Bw + "]");
function su(e, t) {
  for (var n = 65536, s = 0; s < t.length; s += 2) {
    if (n += t[s], n > e)
      return false;
    if (n += t[s + 1], n >= e)
      return true;
  }
  return false;
}
function Bn(e, t) {
  return e < 65 ? e === 36 : e < 91 ? true : e < 97 ? e === 95 : e < 123 ? true : e <= 65535 ? e >= 170 && zw.test(String.fromCharCode(e)) : t === false ? false : su(e, RM);
}
function ks(e, t) {
  return e < 48 ? e === 36 : e < 58 ? true : e < 65 ? false : e < 91 ? true : e < 97 ? e === 95 : e < 123 ? true : e <= 65535 ? e >= 170 && Nw.test(String.fromCharCode(e)) : t === false ? false : su(e, RM) || su(e, Rw);
}
var ze = function(t, n) {
  n === void 0 && (n = {}), this.label = t, this.keyword = n.keyword, this.beforeExpr = !!n.beforeExpr, this.startsExpr = !!n.startsExpr, this.isLoop = !!n.isLoop, this.isAssign = !!n.isAssign, this.prefix = !!n.prefix, this.postfix = !!n.postfix, this.binop = n.binop || null, this.updateContext = null;
};
function Yt(e, t) {
  return new ze(e, { beforeExpr: true, binop: t });
}
var Ht = { beforeExpr: true }, Et = { startsExpr: true }, yo = {};
function ke(e, t) {
  return t === void 0 && (t = {}), t.keyword = e, yo[e] = new ze(e, t);
}
var C = {
  num: new ze("num", Et),
  regexp: new ze("regexp", Et),
  string: new ze("string", Et),
  name: new ze("name", Et),
  privateId: new ze("privateId", Et),
  eof: new ze("eof"),
  // Punctuation token types.
  bracketL: new ze("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new ze("]"),
  braceL: new ze("{", { beforeExpr: true, startsExpr: true }),
  braceR: new ze("}"),
  parenL: new ze("(", { beforeExpr: true, startsExpr: true }),
  parenR: new ze(")"),
  comma: new ze(",", Ht),
  semi: new ze(";", Ht),
  colon: new ze(":", Ht),
  dot: new ze("."),
  question: new ze("?", Ht),
  questionDot: new ze("?."),
  arrow: new ze("=>", Ht),
  template: new ze("template"),
  invalidTemplate: new ze("invalidTemplate"),
  ellipsis: new ze("...", Ht),
  backQuote: new ze("`", Et),
  dollarBraceL: new ze("${", { beforeExpr: true, startsExpr: true }),
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  eq: new ze("=", { beforeExpr: true, isAssign: true }),
  assign: new ze("_=", { beforeExpr: true, isAssign: true }),
  incDec: new ze("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new ze("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: Yt("||", 1),
  logicalAND: Yt("&&", 2),
  bitwiseOR: Yt("|", 3),
  bitwiseXOR: Yt("^", 4),
  bitwiseAND: Yt("&", 5),
  equality: Yt("==/!=/===/!==", 6),
  relational: Yt("</>/<=/>=", 7),
  bitShift: Yt("<</>>/>>>", 8),
  plusMin: new ze("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: Yt("%", 10),
  star: Yt("*", 10),
  slash: Yt("/", 10),
  starstar: new ze("**", { beforeExpr: true }),
  coalesce: Yt("??", 1),
  // Keyword token types.
  _break: ke("break"),
  _case: ke("case", Ht),
  _catch: ke("catch"),
  _continue: ke("continue"),
  _debugger: ke("debugger"),
  _default: ke("default", Ht),
  _do: ke("do", { isLoop: true, beforeExpr: true }),
  _else: ke("else", Ht),
  _finally: ke("finally"),
  _for: ke("for", { isLoop: true }),
  _function: ke("function", Et),
  _if: ke("if"),
  _return: ke("return", Ht),
  _switch: ke("switch"),
  _throw: ke("throw", Ht),
  _try: ke("try"),
  _var: ke("var"),
  _const: ke("const"),
  _while: ke("while", { isLoop: true }),
  _with: ke("with"),
  _new: ke("new", { beforeExpr: true, startsExpr: true }),
  _this: ke("this", Et),
  _super: ke("super", Et),
  _class: ke("class", Et),
  _extends: ke("extends", Ht),
  _export: ke("export"),
  _import: ke("import", Et),
  _null: ke("null", Et),
  _true: ke("true", Et),
  _false: ke("false", Et),
  _in: ke("in", { beforeExpr: true, binop: 7 }),
  _instanceof: ke("instanceof", { beforeExpr: true, binop: 7 }),
  _typeof: ke("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
  _void: ke("void", { beforeExpr: true, prefix: true, startsExpr: true }),
  _delete: ke("delete", { beforeExpr: true, prefix: true, startsExpr: true })
}, Jt = /\r\n?|\n|\u2028|\u2029/, Ww = new RegExp(Jt.source, "g");
function Ys(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function VM(e, t, n) {
  n === void 0 && (n = e.length);
  for (var s = t; s < n; s++) {
    var i = e.charCodeAt(s);
    if (Ys(i))
      return s < n - 1 && i === 13 && e.charCodeAt(s + 1) === 10 ? s + 2 : s + 1;
  }
  return -1;
}
var kM = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Kt = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, zM = Object.prototype, Tw = zM.hasOwnProperty, Iw = zM.toString, Hs = Object.hasOwn || function(e, t) {
  return Tw.call(e, t);
}, kc = Array.isArray || function(e) {
  return Iw.call(e) === "[object Array]";
}, zc = /* @__PURE__ */ Object.create(null);
function jn(e) {
  return zc[e] || (zc[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function Vn(e) {
  return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var _w = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, Xi = function(t, n) {
  this.line = t, this.column = n;
};
Xi.prototype.offset = function(t) {
  return new Xi(this.line, this.column + t);
};
var wr = function(t, n, s) {
  this.start = n, this.end = s, t.sourceFile !== null && (this.source = t.sourceFile);
};
function NM(e, t) {
  for (var n = 1, s = 0; ; ) {
    var i = VM(e, s, t);
    if (i < 0)
      return new Xi(n, t - s);
    ++n, s = i;
  }
}
var iu = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
  // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
  // (the latest version the library supports). This influences
  // support for strict mode, the set of reserved words, and support
  // for new syntax features.
  ecmaVersion: null,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called when
  // a semicolon is automatically inserted. It will be passed the
  // position of the inserted semicolon as an offset, and if
  // `locations` is enabled, it is given the location as a `{line,
  // column}` object as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program, and an import.meta expression
  // in a script isn't considered an error.
  allowImportExportEverywhere: false,
  // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: null,
  // When enabled, super identifiers are not constrained to
  // appearing in methods and do not raise an error when they appear elsewhere.
  allowSuperOutsideMethod: null,
  // When enabled, hashbang directive in the beginning of file is
  // allowed and treated as a line comment. Enabled by default when
  // `ecmaVersion` >= 2023.
  allowHashBang: false,
  // By default, the parser will verify that private properties are
  // only used in places where they are valid and have been declared.
  // Set this to false to turn such checks off.
  checkPrivateFields: true,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  // When this option has an array as value, objects representing the
  // comments are pushed to it.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false
}, Nc = false;
function Yw(e) {
  var t = {};
  for (var n in iu)
    t[n] = e && Hs(e, n) ? e[n] : iu[n];
  if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!Nc && typeof console == "object" && console.warn && (Nc = true, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5), (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), kc(t.onToken)) {
    var s = t.onToken;
    t.onToken = function(i) {
      return s.push(i);
    };
  }
  return kc(t.onComment) && (t.onComment = Hw(t, t.onComment)), t;
}
function Hw(e, t) {
  return function(n, s, i, r, a, u) {
    var o = {
      type: n ? "Block" : "Line",
      value: s,
      start: i,
      end: r
    };
    e.locations && (o.loc = new wr(this, a, u)), e.ranges && (o.range = [i, r]), t.push(o);
  };
}
var Di = 1, Ks = 2, go = 4, WM = 8, TM = 16, IM = 32, bo = 64, _M = 128, Bi = 256, Mo = Di | Ks | Bi;
function Co(e, t) {
  return Ks | (e ? go : 0) | (t ? WM : 0);
}
var lr = 0, xo = 1, zn = 2, YM = 3, HM = 4, KM = 5, ht = function(t, n, s) {
  this.options = t = Yw(t), this.sourceFile = t.sourceFile, this.keywords = jn(Vw[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5]);
  var i = "";
  t.allowReserved !== true && (i = ha[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3], t.sourceType === "module" && (i += " await")), this.reservedWords = jn(i);
  var r = (i ? i + " " : "") + ha.strict;
  this.reservedWordsStrict = jn(r), this.reservedWordsStrictBind = jn(r + " " + ha.strictBind), this.input = String(n), this.containsEsc = false, s ? (this.pos = s, this.lineStart = this.input.lastIndexOf(`
`, s - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(Jt).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = C.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = true, this.inModule = t.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = false, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(Di), this.regexpState = null, this.privateNameStack = [];
}, Pn = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, inClassStaticBlock: { configurable: true } };
ht.prototype.parse = function() {
  var t = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(t);
};
Pn.inFunction.get = function() {
  return (this.currentVarScope().flags & Ks) > 0;
};
Pn.inGenerator.get = function() {
  return (this.currentVarScope().flags & WM) > 0 && !this.currentVarScope().inClassFieldInit;
};
Pn.inAsync.get = function() {
  return (this.currentVarScope().flags & go) > 0 && !this.currentVarScope().inClassFieldInit;
};
Pn.canAwait.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e];
    if (t.inClassFieldInit || t.flags & Bi)
      return false;
    if (t.flags & Ks)
      return (t.flags & go) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
Pn.allowSuper.get = function() {
  var e = this.currentThisScope(), t = e.flags, n = e.inClassFieldInit;
  return (t & bo) > 0 || n || this.options.allowSuperOutsideMethod;
};
Pn.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & _M) > 0;
};
Pn.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
Pn.allowNewDotTarget.get = function() {
  var e = this.currentThisScope(), t = e.flags, n = e.inClassFieldInit;
  return (t & (Ks | Bi)) > 0 || n;
};
Pn.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & Bi) > 0;
};
ht.extend = function() {
  for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n];
  for (var s = this, i = 0; i < t.length; i++)
    s = t[i](s);
  return s;
};
ht.parse = function(t, n) {
  return new this(n, t).parse();
};
ht.parseExpressionAt = function(t, n, s) {
  var i = new this(s, t, n);
  return i.nextToken(), i.parseExpression();
};
ht.tokenizer = function(t, n) {
  return new this(n, t);
};
Object.defineProperties(ht.prototype, Pn);
var Zt = ht.prototype, Kw = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
Zt.strictDirective = function(e) {
  if (this.options.ecmaVersion < 5)
    return false;
  for (; ; ) {
    Kt.lastIndex = e, e += Kt.exec(this.input)[0].length;
    var t = Kw.exec(this.input.slice(e));
    if (!t)
      return false;
    if ((t[1] || t[2]) === "use strict") {
      Kt.lastIndex = e + t[0].length;
      var n = Kt.exec(this.input), s = n.index + n[0].length, i = this.input.charAt(s);
      return i === ";" || i === "}" || Jt.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === "!" && this.input.charAt(s + 1) === "=");
    }
    e += t[0].length, Kt.lastIndex = e, e += Kt.exec(this.input)[0].length, this.input[e] === ";" && e++;
  }
};
Zt.eat = function(e) {
  return this.type === e ? (this.next(), true) : false;
};
Zt.isContextual = function(e) {
  return this.type === C.name && this.value === e && !this.containsEsc;
};
Zt.eatContextual = function(e) {
  return this.isContextual(e) ? (this.next(), true) : false;
};
Zt.expectContextual = function(e) {
  this.eatContextual(e) || this.unexpected();
};
Zt.canInsertSemicolon = function() {
  return this.type === C.eof || this.type === C.braceR || Jt.test(this.input.slice(this.lastTokEnd, this.start));
};
Zt.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), true;
};
Zt.semicolon = function() {
  !this.eat(C.semi) && !this.insertSemicolon() && this.unexpected();
};
Zt.afterTrailingComma = function(e, t) {
  if (this.type === e)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), true;
};
Zt.expect = function(e) {
  this.eat(e) || this.unexpected();
};
Zt.unexpected = function(e) {
  this.raise(e ?? this.start, "Unexpected token");
};
var Zr = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
Zt.checkPatternErrors = function(e, t) {
  if (e) {
    e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
    var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
    n > -1 && this.raiseRecoverable(n, t ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
Zt.checkExpressionErrors = function(e, t) {
  if (!e)
    return false;
  var n = e.shorthandAssign, s = e.doubleProto;
  if (!t)
    return n >= 0 || s >= 0;
  n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), s >= 0 && this.raiseRecoverable(s, "Redefinition of __proto__ property");
};
Zt.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
Zt.isSimpleAssignTarget = function(e) {
  return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var ue = ht.prototype;
ue.parseTopLevel = function(e) {
  var t = /* @__PURE__ */ Object.create(null);
  for (e.body || (e.body = []); this.type !== C.eof; ) {
    var n = this.parseStatement(null, true, t);
    e.body.push(n);
  }
  if (this.inModule)
    for (var s = 0, i = Object.keys(this.undefinedExports); s < i.length; s += 1) {
      var r = i[s];
      this.raiseRecoverable(this.undefinedExports[r].start, "Export '" + r + "' is not defined");
    }
  return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");
};
var Go = { kind: "loop" }, jw = { kind: "switch" };
ue.isLet = function(e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return false;
  Kt.lastIndex = this.pos;
  var t = Kt.exec(this.input), n = this.pos + t[0].length, s = this.input.charCodeAt(n);
  if (s === 91 || s === 92)
    return true;
  if (e)
    return false;
  if (s === 123 || s > 55295 && s < 56320)
    return true;
  if (Bn(s, true)) {
    for (var i = n + 1; ks(s = this.input.charCodeAt(i), true); )
      ++i;
    if (s === 92 || s > 55295 && s < 56320)
      return true;
    var r = this.input.slice(n, i);
    if (!kw.test(r))
      return true;
  }
  return false;
};
ue.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return false;
  Kt.lastIndex = this.pos;
  var e = Kt.exec(this.input), t = this.pos + e[0].length, n;
  return !Jt.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(ks(n = this.input.charCodeAt(t + 8)) || n > 55295 && n < 56320));
};
ue.parseStatement = function(e, t, n) {
  var s = this.type, i = this.startNode(), r;
  switch (this.isLet(e) && (s = C._var, r = "let"), s) {
    case C._break:
    case C._continue:
      return this.parseBreakContinueStatement(i, s.keyword);
    case C._debugger:
      return this.parseDebuggerStatement(i);
    case C._do:
      return this.parseDoStatement(i);
    case C._for:
      return this.parseForStatement(i);
    case C._function:
      return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, false, !e);
    case C._class:
      return e && this.unexpected(), this.parseClass(i, true);
    case C._if:
      return this.parseIfStatement(i);
    case C._return:
      return this.parseReturnStatement(i);
    case C._switch:
      return this.parseSwitchStatement(i);
    case C._throw:
      return this.parseThrowStatement(i);
    case C._try:
      return this.parseTryStatement(i);
    case C._const:
    case C._var:
      return r = r || this.value, e && r !== "var" && this.unexpected(), this.parseVarStatement(i, r);
    case C._while:
      return this.parseWhileStatement(i);
    case C._with:
      return this.parseWithStatement(i);
    case C.braceL:
      return this.parseBlock(true, i);
    case C.semi:
      return this.parseEmptyStatement(i);
    case C._export:
    case C._import:
      if (this.options.ecmaVersion > 10 && s === C._import) {
        Kt.lastIndex = this.pos;
        var a = Kt.exec(this.input), u = this.pos + a[0].length, o = this.input.charCodeAt(u);
        if (o === 40 || o === 46)
          return this.parseExpressionStatement(i, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), s === C._import ? this.parseImport(i) : this.parseExport(i, n);
    default:
      if (this.isAsyncFunction())
        return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, true, !e);
      var c = this.value, l = this.parseExpression();
      return s === C.name && l.type === "Identifier" && this.eat(C.colon) ? this.parseLabeledStatement(i, c, l, e) : this.parseExpressionStatement(i, l);
  }
};
ue.parseBreakContinueStatement = function(e, t) {
  var n = t === "break";
  this.next(), this.eat(C.semi) || this.insertSemicolon() ? e.label = null : this.type !== C.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
  for (var s = 0; s < this.labels.length; ++s) {
    var i = this.labels[s];
    if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === "loop") || e.label && n))
      break;
  }
  return s === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, n ? "BreakStatement" : "ContinueStatement");
};
ue.parseDebuggerStatement = function(e) {
  return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
};
ue.parseDoStatement = function(e) {
  return this.next(), this.labels.push(Go), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(C._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(C.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
};
ue.parseForStatement = function(e) {
  this.next();
  var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(Go), this.enterScope(0), this.expect(C.parenL), this.type === C.semi)
    return t > -1 && this.unexpected(t), this.parseFor(e, null);
  var n = this.isLet();
  if (this.type === C._var || this.type === C._const || n) {
    var s = this.startNode(), i = n ? "let" : this.value;
    return this.next(), this.parseVar(s, true, i), this.finishNode(s, "VariableDeclaration"), (this.type === C._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && s.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === C._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, s)) : (t > -1 && this.unexpected(t), this.parseFor(e, s));
  }
  var r = this.isContextual("let"), a = false, u = this.containsEsc, o = new Zr(), c = this.start, l = t > -1 ? this.parseExprSubscripts(o, "await") : this.parseExpression(true, o);
  return this.type === C._in || (a = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === C._in && this.unexpected(t), e.await = true) : a && this.options.ecmaVersion >= 8 && (l.start === c && !u && l.type === "Identifier" && l.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = false)), r && a && this.raise(l.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(l, false, o), this.checkLValPattern(l), this.parseForIn(e, l)) : (this.checkExpressionErrors(o, true), t > -1 && this.unexpected(t), this.parseFor(e, l));
};
ue.parseFunctionStatement = function(e, t, n) {
  return this.next(), this.parseFunction(e, yi | (n ? 0 : ru), false, t);
};
ue.parseIfStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(C._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
};
ue.parseReturnStatement = function(e) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(C.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
};
ue.parseSwitchStatement = function(e) {
  this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(C.braceL), this.labels.push(jw), this.enterScope(0);
  for (var t, n = false; this.type !== C.braceR; )
    if (this.type === C._case || this.type === C._default) {
      var s = this.type === C._case;
      t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), s ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = true, t.test = null), this.expect(C.colon);
    } else
      t || this.unexpected(), t.consequent.push(this.parseStatement(null));
  return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
};
ue.parseThrowStatement = function(e) {
  return this.next(), Jt.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Uw = [];
ue.parseCatchClauseParam = function() {
  var e = this.parseBindingAtom(), t = e.type === "Identifier";
  return this.enterScope(t ? IM : 0), this.checkLValPattern(e, t ? HM : zn), this.expect(C.parenR), e;
};
ue.parseTryStatement = function(e) {
  if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === C._catch) {
    var t = this.startNode();
    this.next(), this.eat(C.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(false), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
  }
  return e.finalizer = this.eat(C._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
};
ue.parseVarStatement = function(e, t, n) {
  return this.next(), this.parseVar(e, false, t, n), this.semicolon(), this.finishNode(e, "VariableDeclaration");
};
ue.parseWhileStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), this.labels.push(Go), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
};
ue.parseWithStatement = function(e) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
};
ue.parseEmptyStatement = function(e) {
  return this.next(), this.finishNode(e, "EmptyStatement");
};
ue.parseLabeledStatement = function(e, t, n, s) {
  for (var i = 0, r = this.labels; i < r.length; i += 1) {
    var a = r[i];
    a.name === t && this.raise(n.start, "Label '" + t + "' is already declared");
  }
  for (var u = this.type.isLoop ? "loop" : this.type === C._switch ? "switch" : null, o = this.labels.length - 1; o >= 0; o--) {
    var c = this.labels[o];
    if (c.statementStart === e.start)
      c.statementStart = this.start, c.kind = u;
    else
      break;
  }
  return this.labels.push({ name: t, kind: u, statementStart: this.start }), e.body = this.parseStatement(s ? s.indexOf("label") === -1 ? s + "label" : s : "label"), this.labels.pop(), e.label = n, this.finishNode(e, "LabeledStatement");
};
ue.parseExpressionStatement = function(e, t) {
  return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
};
ue.parseBlock = function(e, t, n) {
  for (e === void 0 && (e = true), t === void 0 && (t = this.startNode()), t.body = [], this.expect(C.braceL), e && this.enterScope(0); this.type !== C.braceR; ) {
    var s = this.parseStatement(null);
    t.body.push(s);
  }
  return n && (this.strict = false), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
};
ue.parseFor = function(e, t) {
  return e.init = t, this.expect(C.semi), e.test = this.type === C.semi ? null : this.parseExpression(), this.expect(C.semi), e.update = this.type === C.parenR ? null : this.parseExpression(), this.expect(C.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
};
ue.parseForIn = function(e, t) {
  var n = this.type === C._in;
  return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(
    t.start,
    (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(C.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? "ForInStatement" : "ForOfStatement");
};
ue.parseVar = function(e, t, n, s) {
  for (e.declarations = [], e.kind = n; ; ) {
    var i = this.startNode();
    if (this.parseVarId(i, n), this.eat(C.eq) ? i.init = this.parseMaybeAssign(t) : !s && n === "const" && !(this.type === C._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !s && i.id.type !== "Identifier" && !(t && (this.type === C._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : i.init = null, e.declarations.push(this.finishNode(i, "VariableDeclarator")), !this.eat(C.comma))
      break;
  }
  return e;
};
ue.parseVarId = function(e, t) {
  e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? xo : zn, false);
};
var yi = 1, ru = 2, jM = 4;
ue.parseFunction = function(e, t, n, s, i) {
  this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !s) && (this.type === C.star && t & ru && this.unexpected(), e.generator = this.eat(C.star)), this.options.ecmaVersion >= 8 && (e.async = !!s), t & yi && (e.id = t & jM && this.type !== C.name ? null : this.parseIdent(), e.id && !(t & ru) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? xo : zn : YM));
  var r = this.yieldPos, a = this.awaitPos, u = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Co(e.async, e.generator)), t & yi || (e.id = this.type === C.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, false, i), this.yieldPos = r, this.awaitPos = a, this.awaitIdentPos = u, this.finishNode(e, t & yi ? "FunctionDeclaration" : "FunctionExpression");
};
ue.parseFunctionParams = function(e) {
  this.expect(C.parenL), e.params = this.parseBindingList(C.parenR, false, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
ue.parseClass = function(e, t) {
  this.next();
  var n = this.strict;
  this.strict = true, this.parseClassId(e, t), this.parseClassSuper(e);
  var s = this.enterClassBody(), i = this.startNode(), r = false;
  for (i.body = [], this.expect(C.braceL); this.type !== C.braceR; ) {
    var a = this.parseClassElement(e.superClass !== null);
    a && (i.body.push(a), a.type === "MethodDefinition" && a.kind === "constructor" ? (r && this.raiseRecoverable(a.start, "Duplicate constructor in the same class"), r = true) : a.key && a.key.type === "PrivateIdentifier" && Ow(s, a) && this.raiseRecoverable(a.key.start, "Identifier '#" + a.key.name + "' has already been declared"));
  }
  return this.strict = n, this.next(), e.body = this.finishNode(i, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
};
ue.parseClassElement = function(e) {
  if (this.eat(C.semi))
    return null;
  var t = this.options.ecmaVersion, n = this.startNode(), s = "", i = false, r = false, a = "method", u = false;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(C.braceL))
      return this.parseClassStaticBlock(n), n;
    this.isClassElementNameStart() || this.type === C.star ? u = true : s = "static";
  }
  if (n.static = u, !s && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === C.star) && !this.canInsertSemicolon() ? r = true : s = "async"), !s && (t >= 9 || !r) && this.eat(C.star) && (i = true), !s && !r && !i) {
    var o = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a = o : s = o);
  }
  if (s ? (n.computed = false, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = s, this.finishNode(n.key, "Identifier")) : this.parseClassElementName(n), t < 13 || this.type === C.parenL || a !== "method" || i || r) {
    var c = !n.static && dr(n, "constructor"), l = c && e;
    c && a !== "method" && this.raise(n.key.start, "Constructor can't have get/set modifier"), n.kind = c ? "constructor" : a, this.parseClassMethod(n, i, r, l);
  } else
    this.parseClassField(n);
  return n;
};
ue.isClassElementNameStart = function() {
  return this.type === C.name || this.type === C.privateId || this.type === C.num || this.type === C.string || this.type === C.bracketL || this.type.keyword;
};
ue.parseClassElementName = function(e) {
  this.type === C.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = false, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
};
ue.parseClassMethod = function(e, t, n, s) {
  var i = e.key;
  e.kind === "constructor" ? (t && this.raise(i.start, "Constructor can't be a generator"), n && this.raise(i.start, "Constructor can't be an async method")) : e.static && dr(e, "prototype") && this.raise(i.start, "Classes may not have a static property named prototype");
  var r = e.value = this.parseMethod(t, n, s);
  return e.kind === "get" && r.params.length !== 0 && this.raiseRecoverable(r.start, "getter should have no params"), e.kind === "set" && r.params.length !== 1 && this.raiseRecoverable(r.start, "setter should have exactly one param"), e.kind === "set" && r.params[0].type === "RestElement" && this.raiseRecoverable(r.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
};
ue.parseClassField = function(e) {
  if (dr(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && dr(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(C.eq)) {
    var t = this.currentThisScope(), n = t.inClassFieldInit;
    t.inClassFieldInit = true, e.value = this.parseMaybeAssign(), t.inClassFieldInit = n;
  } else
    e.value = null;
  return this.semicolon(), this.finishNode(e, "PropertyDefinition");
};
ue.parseClassStaticBlock = function(e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(Bi | bo); this.type !== C.braceR; ) {
    var n = this.parseStatement(null);
    e.body.push(n);
  }
  return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
};
ue.parseClassId = function(e, t) {
  this.type === C.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, zn, false)) : (t === true && this.unexpected(), e.id = null);
};
ue.parseClassSuper = function(e) {
  e.superClass = this.eat(C._extends) ? this.parseExprSubscripts(null, false) : null;
};
ue.enterClassBody = function() {
  var e = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(e), e.declared;
};
ue.exitClassBody = function() {
  var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
  if (this.options.checkPrivateFields)
    for (var s = this.privateNameStack.length, i = s === 0 ? null : this.privateNameStack[s - 1], r = 0; r < n.length; ++r) {
      var a = n[r];
      Hs(t, a.name) || (i ? i.used.push(a) : this.raiseRecoverable(a.start, "Private field '#" + a.name + "' must be declared in an enclosing class"));
    }
};
function Ow(e, t) {
  var n = t.key.name, s = e[n], i = "true";
  return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (i = (t.static ? "s" : "i") + t.kind), s === "iget" && i === "iset" || s === "iset" && i === "iget" || s === "sget" && i === "sset" || s === "sset" && i === "sget" ? (e[n] = "true", false) : s ? true : (e[n] = i, false);
}
function dr(e, t) {
  var n = e.computed, s = e.key;
  return !n && (s.type === "Identifier" && s.name === t || s.type === "Literal" && s.value === t);
}
ue.parseExportAllDeclaration = function(e, t) {
  return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== C.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
};
ue.parseExport = function(e, t) {
  if (this.next(), this.eat(C.star))
    return this.parseExportAllDeclaration(e, t);
  if (this.eat(C._default))
    return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
  if (this.shouldParseExportStatement())
    e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null;
  else {
    if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from"))
      this.type !== C.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
    else {
      for (var n = 0, s = e.specifiers; n < s.length; n += 1) {
        var i = s[n];
        this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === "Literal" && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      e.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
};
ue.parseExportDeclaration = function(e) {
  return this.parseStatement(null);
};
ue.parseExportDefaultDeclaration = function() {
  var e;
  if (this.type === C._function || (e = this.isAsyncFunction())) {
    var t = this.startNode();
    return this.next(), e && this.next(), this.parseFunction(t, yi | jM, false, e);
  } else if (this.type === C._class) {
    var n = this.startNode();
    return this.parseClass(n, "nullableID");
  } else {
    var s = this.parseMaybeAssign();
    return this.semicolon(), s;
  }
};
ue.checkExport = function(e, t, n) {
  e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), Hs(e, t) && this.raiseRecoverable(n, "Duplicate export '" + t + "'"), e[t] = true);
};
ue.checkPatternExport = function(e, t) {
  var n = t.type;
  if (n === "Identifier")
    this.checkExport(e, t, t.start);
  else if (n === "ObjectPattern")
    for (var s = 0, i = t.properties; s < i.length; s += 1) {
      var r = i[s];
      this.checkPatternExport(e, r);
    }
  else if (n === "ArrayPattern")
    for (var a = 0, u = t.elements; a < u.length; a += 1) {
      var o = u[a];
      o && this.checkPatternExport(e, o);
    }
  else n === "Property" ? this.checkPatternExport(e, t.value) : n === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : n === "RestElement" && this.checkPatternExport(e, t.argument);
};
ue.checkVariableExport = function(e, t) {
  if (e)
    for (var n = 0, s = t; n < s.length; n += 1) {
      var i = s[n];
      this.checkPatternExport(e, i.id);
    }
};
ue.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
ue.parseExportSpecifier = function(e) {
  var t = this.startNode();
  return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(
    e,
    t.exported,
    t.exported.start
  ), this.finishNode(t, "ExportSpecifier");
};
ue.parseExportSpecifiers = function(e) {
  var t = [], n = true;
  for (this.expect(C.braceL); !this.eat(C.braceR); ) {
    if (n)
      n = false;
    else if (this.expect(C.comma), this.afterTrailingComma(C.braceR))
      break;
    t.push(this.parseExportSpecifier(e));
  }
  return t;
};
ue.parseImport = function(e) {
  return this.next(), this.type === C.string ? (e.specifiers = Uw, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === C.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
};
ue.parseImportSpecifier = function() {
  var e = this.startNode();
  return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, zn), this.finishNode(e, "ImportSpecifier");
};
ue.parseImportDefaultSpecifier = function() {
  var e = this.startNode();
  return e.local = this.parseIdent(), this.checkLValSimple(e.local, zn), this.finishNode(e, "ImportDefaultSpecifier");
};
ue.parseImportNamespaceSpecifier = function() {
  var e = this.startNode();
  return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, zn), this.finishNode(e, "ImportNamespaceSpecifier");
};
ue.parseImportSpecifiers = function() {
  var e = [], t = true;
  if (this.type === C.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(C.comma)))
    return e;
  if (this.type === C.star)
    return e.push(this.parseImportNamespaceSpecifier()), e;
  for (this.expect(C.braceL); !this.eat(C.braceR); ) {
    if (t)
      t = false;
    else if (this.expect(C.comma), this.afterTrailingComma(C.braceR))
      break;
    e.push(this.parseImportSpecifier());
  }
  return e;
};
ue.parseWithClause = function() {
  var e = [];
  if (!this.eat(C._with))
    return e;
  this.expect(C.braceL);
  for (var t = {}, n = true; !this.eat(C.braceR); ) {
    if (n)
      n = false;
    else if (this.expect(C.comma), this.afterTrailingComma(C.braceR))
      break;
    var s = this.parseImportAttribute(), i = s.key.type === "Identifier" ? s.key.name : s.key.value;
    Hs(t, i) && this.raiseRecoverable(s.key.start, "Duplicate attribute key '" + i + "'"), t[i] = true, e.push(s);
  }
  return e;
};
ue.parseImportAttribute = function() {
  var e = this.startNode();
  return e.key = this.type === C.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(C.colon), this.type !== C.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
};
ue.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === C.string) {
    var e = this.parseLiteral(this.value);
    return _w.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
  }
  return this.parseIdent(true);
};
ue.adaptDirectivePrologue = function(e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
};
ue.isDirectiveCandidate = function(e) {
  return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && // Reject parenthesized strings.
  (this.input[e.start] === '"' || this.input[e.start] === "'");
};
var Qt = ht.prototype;
Qt.toAssignable = function(e, t, n) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        e.type = "ObjectPattern", n && this.checkPatternErrors(n, true);
        for (var s = 0, i = e.properties; s < i.length; s += 1) {
          var r = i[s];
          this.toAssignable(r, t), r.type === "RestElement" && (r.argument.type === "ArrayPattern" || r.argument.type === "ObjectPattern") && this.raise(r.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
        break;
      case "ArrayExpression":
        e.type = "ArrayPattern", n && this.checkPatternErrors(n, true), this.toAssignableList(e.elements, t);
        break;
      case "SpreadElement":
        e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, n);
        break;
      case "ChainExpression":
        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!t)
          break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else n && this.checkPatternErrors(n, true);
  return e;
};
Qt.toAssignableList = function(e, t) {
  for (var n = e.length, s = 0; s < n; s++) {
    var i = e[s];
    i && this.toAssignable(i, t);
  }
  if (n) {
    var r = e[n - 1];
    this.options.ecmaVersion === 6 && t && r && r.type === "RestElement" && r.argument.type !== "Identifier" && this.unexpected(r.argument.start);
  }
  return e;
};
Qt.parseSpread = function(e) {
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeAssign(false, e), this.finishNode(t, "SpreadElement");
};
Qt.parseRestBinding = function() {
  var e = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== C.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
};
Qt.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case C.bracketL:
        var e = this.startNode();
        return this.next(), e.elements = this.parseBindingList(C.bracketR, true, true), this.finishNode(e, "ArrayPattern");
      case C.braceL:
        return this.parseObj(true);
    }
  return this.parseIdent();
};
Qt.parseBindingList = function(e, t, n, s) {
  for (var i = [], r = true; !this.eat(e); )
    if (r ? r = false : this.expect(C.comma), t && this.type === C.comma)
      i.push(null);
    else {
      if (n && this.afterTrailingComma(e))
        break;
      if (this.type === C.ellipsis) {
        var a = this.parseRestBinding();
        this.parseBindingListItem(a), i.push(a), this.type === C.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
        break;
      } else
        i.push(this.parseAssignableListItem(s));
    }
  return i;
};
Qt.parseAssignableListItem = function(e) {
  var t = this.parseMaybeDefault(this.start, this.startLoc);
  return this.parseBindingListItem(t), t;
};
Qt.parseBindingListItem = function(e) {
  return e;
};
Qt.parseMaybeDefault = function(e, t, n) {
  if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(C.eq))
    return n;
  var s = this.startNodeAt(e, t);
  return s.left = n, s.right = this.parseMaybeAssign(), this.finishNode(s, "AssignmentPattern");
};
Qt.checkLValSimple = function(e, t, n) {
  t === void 0 && (t = lr);
  var s = t !== lr;
  switch (e.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (s ? "Binding " : "Assigning to ") + e.name + " in strict mode"), s && (t === zn && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), n && (Hs(n, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), n[e.name] = true), t !== KM && this.declareName(e.name, t, e.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      s && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return s && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, n);
    default:
      this.raise(e.start, (s ? "Binding" : "Assigning to") + " rvalue");
  }
};
Qt.checkLValPattern = function(e, t, n) {
  switch (t === void 0 && (t = lr), e.type) {
    case "ObjectPattern":
      for (var s = 0, i = e.properties; s < i.length; s += 1) {
        var r = i[s];
        this.checkLValInnerPattern(r, t, n);
      }
      break;
    case "ArrayPattern":
      for (var a = 0, u = e.elements; a < u.length; a += 1) {
        var o = u[a];
        o && this.checkLValInnerPattern(o, t, n);
      }
      break;
    default:
      this.checkLValSimple(e, t, n);
  }
};
Qt.checkLValInnerPattern = function(e, t, n) {
  switch (t === void 0 && (t = lr), e.type) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, n);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, n);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, n);
      break;
    default:
      this.checkLValPattern(e, t, n);
  }
};
var nn = function(t, n, s, i, r) {
  this.token = t, this.isExpr = !!n, this.preserveSpace = !!s, this.override = i, this.generator = !!r;
}, it = {
  b_stat: new nn("{", false),
  b_expr: new nn("{", true),
  b_tmpl: new nn("${", false),
  p_stat: new nn("(", false),
  p_expr: new nn("(", true),
  q_tmpl: new nn("`", true, true, function(e) {
    return e.tryReadTemplateToken();
  }),
  f_stat: new nn("function", false),
  f_expr: new nn("function", true),
  f_expr_gen: new nn("function", true, false, null, true),
  f_gen: new nn("function", false, false, null, true)
}, js = ht.prototype;
js.initialContext = function() {
  return [it.b_stat];
};
js.curContext = function() {
  return this.context[this.context.length - 1];
};
js.braceIsBlock = function(e) {
  var t = this.curContext();
  return t === it.f_expr || t === it.f_stat ? true : e === C.colon && (t === it.b_stat || t === it.b_expr) ? !t.isExpr : e === C._return || e === C.name && this.exprAllowed ? Jt.test(this.input.slice(this.lastTokEnd, this.start)) : e === C._else || e === C.semi || e === C.eof || e === C.parenR || e === C.arrow ? true : e === C.braceL ? t === it.b_stat : e === C._var || e === C._const || e === C.name ? false : !this.exprAllowed;
};
js.inGeneratorContext = function() {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if (t.token === "function")
      return t.generator;
  }
  return false;
};
js.updateContext = function(e) {
  var t, n = this.type;
  n.keyword && e === C.dot ? this.exprAllowed = false : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
};
js.overrideContext = function(e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
};
C.parenR.updateContext = C.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return;
  }
  var e = this.context.pop();
  e === it.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
};
C.braceL.updateContext = function(e) {
  this.context.push(this.braceIsBlock(e) ? it.b_stat : it.b_expr), this.exprAllowed = true;
};
C.dollarBraceL.updateContext = function() {
  this.context.push(it.b_tmpl), this.exprAllowed = true;
};
C.parenL.updateContext = function(e) {
  var t = e === C._if || e === C._for || e === C._with || e === C._while;
  this.context.push(t ? it.p_stat : it.p_expr), this.exprAllowed = true;
};
C.incDec.updateContext = function() {
};
C._function.updateContext = C._class.updateContext = function(e) {
  e.beforeExpr && e !== C._else && !(e === C.semi && this.curContext() !== it.p_stat) && !(e === C._return && Jt.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === C.colon || e === C.braceL) && this.curContext() === it.b_stat) ? this.context.push(it.f_expr) : this.context.push(it.f_stat), this.exprAllowed = false;
};
C.colon.updateContext = function() {
  this.curContext().token === "function" && this.context.pop(), this.exprAllowed = true;
};
C.backQuote.updateContext = function() {
  this.curContext() === it.q_tmpl ? this.context.pop() : this.context.push(it.q_tmpl), this.exprAllowed = false;
};
C.star.updateContext = function(e) {
  if (e === C._function) {
    var t = this.context.length - 1;
    this.context[t] === it.f_expr ? this.context[t] = it.f_expr_gen : this.context[t] = it.f_gen;
  }
  this.exprAllowed = true;
};
C.name.updateContext = function(e) {
  var t = false;
  this.options.ecmaVersion >= 6 && e !== C.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = true), this.exprAllowed = t;
};
var xe = ht.prototype;
xe.checkPropClash = function(e, t, n) {
  if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
    var s = e.key, i;
    switch (s.type) {
      case "Identifier":
        i = s.name;
        break;
      case "Literal":
        i = String(s.value);
        break;
      default:
        return;
    }
    var r = e.kind;
    if (this.options.ecmaVersion >= 6) {
      i === "__proto__" && r === "init" && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = s.start) : this.raiseRecoverable(s.start, "Redefinition of __proto__ property")), t.proto = true);
      return;
    }
    i = "$" + i;
    var a = t[i];
    if (a) {
      var u;
      r === "init" ? u = this.strict && a.init || a.get || a.set : u = a.init || a[r], u && this.raiseRecoverable(s.start, "Redefinition of property");
    } else
      a = t[i] = {
        init: false,
        get: false,
        set: false
      };
    a[r] = true;
  }
};
xe.parseExpression = function(e, t) {
  var n = this.start, s = this.startLoc, i = this.parseMaybeAssign(e, t);
  if (this.type === C.comma) {
    var r = this.startNodeAt(n, s);
    for (r.expressions = [i]; this.eat(C.comma); )
      r.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(r, "SequenceExpression");
  }
  return i;
};
xe.parseMaybeAssign = function(e, t, n) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(e);
    this.exprAllowed = false;
  }
  var s = false, i = -1, r = -1, a = -1;
  t ? (i = t.parenthesizedAssign, r = t.trailingComma, a = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new Zr(), s = true);
  var u = this.start, o = this.startLoc;
  (this.type === C.parenL || this.type === C.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
  var c = this.parseMaybeConditional(e, t);
  if (n && (c = n.call(this, c, u, o)), this.type.isAssign) {
    var l = this.startNodeAt(u, o);
    return l.operator = this.value, this.type === C.eq && (c = this.toAssignable(c, false, t)), s || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= c.start && (t.shorthandAssign = -1), this.type === C.eq ? this.checkLValPattern(c) : this.checkLValSimple(c), l.left = c, this.next(), l.right = this.parseMaybeAssign(e), a > -1 && (t.doubleProto = a), this.finishNode(l, "AssignmentExpression");
  } else
    s && this.checkExpressionErrors(t, true);
  return i > -1 && (t.parenthesizedAssign = i), r > -1 && (t.trailingComma = r), c;
};
xe.parseMaybeConditional = function(e, t) {
  var n = this.start, s = this.startLoc, i = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t))
    return i;
  if (this.eat(C.question)) {
    var r = this.startNodeAt(n, s);
    return r.test = i, r.consequent = this.parseMaybeAssign(), this.expect(C.colon), r.alternate = this.parseMaybeAssign(e), this.finishNode(r, "ConditionalExpression");
  }
  return i;
};
xe.parseExprOps = function(e, t) {
  var n = this.start, s = this.startLoc, i = this.parseMaybeUnary(t, false, false, e);
  return this.checkExpressionErrors(t) || i.start === n && i.type === "ArrowFunctionExpression" ? i : this.parseExprOp(i, n, s, -1, e);
};
xe.parseExprOp = function(e, t, n, s, i) {
  var r = this.type.binop;
  if (r != null && (!i || this.type !== C._in) && r > s) {
    var a = this.type === C.logicalOR || this.type === C.logicalAND, u = this.type === C.coalesce;
    u && (r = C.logicalAND.binop);
    var o = this.value;
    this.next();
    var c = this.start, l = this.startLoc, p = this.parseExprOp(this.parseMaybeUnary(null, false, false, i), c, l, r, i), m = this.buildBinary(t, n, e, p, o, a || u);
    return (a && this.type === C.coalesce || u && (this.type === C.logicalOR || this.type === C.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(m, t, n, s, i);
  }
  return e;
};
xe.buildBinary = function(e, t, n, s, i, r) {
  s.type === "PrivateIdentifier" && this.raise(s.start, "Private identifier can only be left side of binary expression");
  var a = this.startNodeAt(e, t);
  return a.left = n, a.operator = i, a.right = s, this.finishNode(a, r ? "LogicalExpression" : "BinaryExpression");
};
xe.parseMaybeUnary = function(e, t, n, s) {
  var i = this.start, r = this.startLoc, a;
  if (this.isContextual("await") && this.canAwait)
    a = this.parseAwait(s), t = true;
  else if (this.type.prefix) {
    var u = this.startNode(), o = this.type === C.incDec;
    u.operator = this.value, u.prefix = true, this.next(), u.argument = this.parseMaybeUnary(null, true, o, s), this.checkExpressionErrors(e, true), o ? this.checkLValSimple(u.argument) : this.strict && u.operator === "delete" && UM(u.argument) ? this.raiseRecoverable(u.start, "Deleting local variable in strict mode") : u.operator === "delete" && au(u.argument) ? this.raiseRecoverable(u.start, "Private fields can not be deleted") : t = true, a = this.finishNode(u, o ? "UpdateExpression" : "UnaryExpression");
  } else if (!t && this.type === C.privateId)
    (s || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), a = this.parsePrivateIdent(), this.type !== C._in && this.unexpected();
  else {
    if (a = this.parseExprSubscripts(e, s), this.checkExpressionErrors(e))
      return a;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var c = this.startNodeAt(i, r);
      c.operator = this.value, c.prefix = false, c.argument = a, this.checkLValSimple(a), this.next(), a = this.finishNode(c, "UpdateExpression");
    }
  }
  if (!n && this.eat(C.starstar))
    if (t)
      this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(i, r, a, this.parseMaybeUnary(null, false, false, s), "**", false);
  else
    return a;
};
function UM(e) {
  return e.type === "Identifier" || e.type === "ParenthesizedExpression" && UM(e.expression);
}
function au(e) {
  return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && au(e.expression) || e.type === "ParenthesizedExpression" && au(e.expression);
}
xe.parseExprSubscripts = function(e, t) {
  var n = this.start, s = this.startLoc, i = this.parseExprAtom(e, t);
  if (i.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return i;
  var r = this.parseSubscripts(i, n, s, false, t);
  return e && r.type === "MemberExpression" && (e.parenthesizedAssign >= r.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= r.start && (e.parenthesizedBind = -1), e.trailingComma >= r.start && (e.trailingComma = -1)), r;
};
xe.parseSubscripts = function(e, t, n, s, i) {
  for (var r = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, a = false; ; ) {
    var u = this.parseSubscript(e, t, n, s, r, a, i);
    if (u.optional && (a = true), u === e || u.type === "ArrowFunctionExpression") {
      if (a) {
        var o = this.startNodeAt(t, n);
        o.expression = u, u = this.finishNode(o, "ChainExpression");
      }
      return u;
    }
    e = u;
  }
};
xe.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(C.arrow);
};
xe.parseSubscriptAsyncArrow = function(e, t, n, s) {
  return this.parseArrowExpression(this.startNodeAt(e, t), n, true, s);
};
xe.parseSubscript = function(e, t, n, s, i, r, a) {
  var u = this.options.ecmaVersion >= 11, o = u && this.eat(C.questionDot);
  s && o && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var c = this.eat(C.bracketL);
  if (c || o && this.type !== C.parenL && this.type !== C.backQuote || this.eat(C.dot)) {
    var l = this.startNodeAt(t, n);
    l.object = e, c ? (l.property = this.parseExpression(), this.expect(C.bracketR)) : this.type === C.privateId && e.type !== "Super" ? l.property = this.parsePrivateIdent() : l.property = this.parseIdent(this.options.allowReserved !== "never"), l.computed = !!c, u && (l.optional = o), e = this.finishNode(l, "MemberExpression");
  } else if (!s && this.eat(C.parenL)) {
    var p = new Zr(), m = this.yieldPos, g = this.awaitPos, y = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var x = this.parseExprList(C.parenR, this.options.ecmaVersion >= 8, false, p);
    if (i && !o && this.shouldParseAsyncArrow())
      return this.checkPatternErrors(p, false), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = m, this.awaitPos = g, this.awaitIdentPos = y, this.parseSubscriptAsyncArrow(t, n, x, a);
    this.checkExpressionErrors(p, true), this.yieldPos = m || this.yieldPos, this.awaitPos = g || this.awaitPos, this.awaitIdentPos = y || this.awaitIdentPos;
    var v = this.startNodeAt(t, n);
    v.callee = e, v.arguments = x, u && (v.optional = o), e = this.finishNode(v, "CallExpression");
  } else if (this.type === C.backQuote) {
    (o || r) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var E = this.startNodeAt(t, n);
    E.tag = e, E.quasi = this.parseTemplate({ isTagged: true }), e = this.finishNode(E, "TaggedTemplateExpression");
  }
  return e;
};
xe.parseExprAtom = function(e, t, n) {
  this.type === C.slash && this.readRegexp();
  var s, i = this.potentialArrowAt === this.start;
  switch (this.type) {
    case C._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), s = this.startNode(), this.next(), this.type === C.parenL && !this.allowDirectSuper && this.raise(s.start, "super() call outside constructor of a subclass"), this.type !== C.dot && this.type !== C.bracketL && this.type !== C.parenL && this.unexpected(), this.finishNode(s, "Super");
    case C._this:
      return s = this.startNode(), this.next(), this.finishNode(s, "ThisExpression");
    case C.name:
      var r = this.start, a = this.startLoc, u = this.containsEsc, o = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !u && o.name === "async" && !this.canInsertSemicolon() && this.eat(C._function))
        return this.overrideContext(it.f_expr), this.parseFunction(this.startNodeAt(r, a), 0, false, true, t);
      if (i && !this.canInsertSemicolon()) {
        if (this.eat(C.arrow))
          return this.parseArrowExpression(this.startNodeAt(r, a), [o], false, t);
        if (this.options.ecmaVersion >= 8 && o.name === "async" && this.type === C.name && !u && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
          return o = this.parseIdent(false), (this.canInsertSemicolon() || !this.eat(C.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(r, a), [o], true, t);
      }
      return o;
    case C.regexp:
      var c = this.value;
      return s = this.parseLiteral(c.value), s.regex = { pattern: c.pattern, flags: c.flags }, s;
    case C.num:
    case C.string:
      return this.parseLiteral(this.value);
    case C._null:
    case C._true:
    case C._false:
      return s = this.startNode(), s.value = this.type === C._null ? null : this.type === C._true, s.raw = this.type.keyword, this.next(), this.finishNode(s, "Literal");
    case C.parenL:
      var l = this.start, p = this.parseParenAndDistinguishExpression(i, t);
      return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(p) && (e.parenthesizedAssign = l), e.parenthesizedBind < 0 && (e.parenthesizedBind = l)), p;
    case C.bracketL:
      return s = this.startNode(), this.next(), s.elements = this.parseExprList(C.bracketR, true, true, e), this.finishNode(s, "ArrayExpression");
    case C.braceL:
      return this.overrideContext(it.b_expr), this.parseObj(false, e);
    case C._function:
      return s = this.startNode(), this.next(), this.parseFunction(s, 0);
    case C._class:
      return this.parseClass(this.startNode(), false);
    case C._new:
      return this.parseNew();
    case C.backQuote:
      return this.parseTemplate();
    case C._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
    default:
      return this.parseExprAtomDefault();
  }
};
xe.parseExprAtomDefault = function() {
  this.unexpected();
};
xe.parseExprImport = function(e) {
  var t = this.startNode();
  if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === C.parenL && !e)
    return this.parseDynamicImport(t);
  if (this.type === C.dot) {
    var n = this.startNodeAt(t.start, t.loc && t.loc.start);
    return n.name = "import", t.meta = this.finishNode(n, "Identifier"), this.parseImportMeta(t);
  } else
    this.unexpected();
};
xe.parseDynamicImport = function(e) {
  if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16)
    this.eat(C.parenR) ? e.options = null : (this.expect(C.comma), this.afterTrailingComma(C.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(C.parenR) || (this.expect(C.comma), this.afterTrailingComma(C.parenR) || this.unexpected())));
  else if (!this.eat(C.parenR)) {
    var t = this.start;
    this.eat(C.comma) && this.eat(C.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
};
xe.parseImportMeta = function(e) {
  this.next();
  var t = this.containsEsc;
  return e.property = this.parseIdent(true), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
};
xe.parseLiteral = function(e) {
  var t = this.startNode();
  return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
};
xe.parseParenExpression = function() {
  this.expect(C.parenL);
  var e = this.parseExpression();
  return this.expect(C.parenR), e;
};
xe.shouldParseArrow = function(e) {
  return !this.canInsertSemicolon();
};
xe.parseParenAndDistinguishExpression = function(e, t) {
  var n = this.start, s = this.startLoc, i, r = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var a = this.start, u = this.startLoc, o = [], c = true, l = false, p = new Zr(), m = this.yieldPos, g = this.awaitPos, y;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== C.parenR; )
      if (c ? c = false : this.expect(C.comma), r && this.afterTrailingComma(C.parenR, true)) {
        l = true;
        break;
      } else if (this.type === C.ellipsis) {
        y = this.start, o.push(this.parseParenItem(this.parseRestBinding())), this.type === C.comma && this.raiseRecoverable(
          this.start,
          "Comma is not permitted after the rest element"
        );
        break;
      } else
        o.push(this.parseMaybeAssign(false, p, this.parseParenItem));
    var x = this.lastTokEnd, v = this.lastTokEndLoc;
    if (this.expect(C.parenR), e && this.shouldParseArrow(o) && this.eat(C.arrow))
      return this.checkPatternErrors(p, false), this.checkYieldAwaitInDefaultParams(), this.yieldPos = m, this.awaitPos = g, this.parseParenArrowList(n, s, o, t);
    (!o.length || l) && this.unexpected(this.lastTokStart), y && this.unexpected(y), this.checkExpressionErrors(p, true), this.yieldPos = m || this.yieldPos, this.awaitPos = g || this.awaitPos, o.length > 1 ? (i = this.startNodeAt(a, u), i.expressions = o, this.finishNodeAt(i, "SequenceExpression", x, v)) : i = o[0];
  } else
    i = this.parseParenExpression();
  if (this.options.preserveParens) {
    var E = this.startNodeAt(n, s);
    return E.expression = i, this.finishNode(E, "ParenthesizedExpression");
  } else
    return i;
};
xe.parseParenItem = function(e) {
  return e;
};
xe.parseParenArrowList = function(e, t, n, s) {
  return this.parseArrowExpression(this.startNodeAt(e, t), n, false, s);
};
var Jw = [];
xe.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode();
  if (this.next(), this.options.ecmaVersion >= 6 && this.type === C.dot) {
    var t = this.startNodeAt(e.start, e.loc && e.loc.start);
    t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
    var n = this.containsEsc;
    return e.property = this.parseIdent(true), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
  }
  var s = this.start, i = this.startLoc;
  return e.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), s, i, true, false), this.eat(C.parenL) ? e.arguments = this.parseExprList(C.parenR, this.options.ecmaVersion >= 8, false) : e.arguments = Jw, this.finishNode(e, "NewExpression");
};
xe.parseTemplateElement = function(e) {
  var t = e.isTagged, n = this.startNode();
  return this.type === C.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
    raw: this.value.replace(/\r\n?/g, `
`),
    cooked: null
  }) : n.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), n.tail = this.type === C.backQuote, this.finishNode(n, "TemplateElement");
};
xe.parseTemplate = function(e) {
  e === void 0 && (e = {});
  var t = e.isTagged;
  t === void 0 && (t = false);
  var n = this.startNode();
  this.next(), n.expressions = [];
  var s = this.parseTemplateElement({ isTagged: t });
  for (n.quasis = [s]; !s.tail; )
    this.type === C.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(C.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(C.braceR), n.quasis.push(s = this.parseTemplateElement({ isTagged: t }));
  return this.next(), this.finishNode(n, "TemplateLiteral");
};
xe.isAsyncProp = function(e) {
  return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === C.name || this.type === C.num || this.type === C.string || this.type === C.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === C.star) && !Jt.test(this.input.slice(this.lastTokEnd, this.start));
};
xe.parseObj = function(e, t) {
  var n = this.startNode(), s = true, i = {};
  for (n.properties = [], this.next(); !this.eat(C.braceR); ) {
    if (s)
      s = false;
    else if (this.expect(C.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(C.braceR))
      break;
    var r = this.parseProperty(e, t);
    e || this.checkPropClash(r, i, t), n.properties.push(r);
  }
  return this.finishNode(n, e ? "ObjectPattern" : "ObjectExpression");
};
xe.parseProperty = function(e, t) {
  var n = this.startNode(), s, i, r, a;
  if (this.options.ecmaVersion >= 9 && this.eat(C.ellipsis))
    return e ? (n.argument = this.parseIdent(false), this.type === C.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (n.argument = this.parseMaybeAssign(false, t), this.type === C.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (n.method = false, n.shorthand = false, (e || t) && (r = this.start, a = this.startLoc), e || (s = this.eat(C.star)));
  var u = this.containsEsc;
  return this.parsePropertyName(n), !e && !u && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(n) ? (i = true, s = this.options.ecmaVersion >= 9 && this.eat(C.star), this.parsePropertyName(n)) : i = false, this.parsePropertyValue(n, e, s, i, r, a, t, u), this.finishNode(n, "Property");
};
xe.parseGetterSetter = function(e) {
  e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(false);
  var t = e.kind === "get" ? 0 : 1;
  if (e.value.params.length !== t) {
    var n = e.value.start;
    e.kind === "get" ? this.raiseRecoverable(n, "getter should have no params") : this.raiseRecoverable(n, "setter should have exactly one param");
  } else
    e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
};
xe.parsePropertyValue = function(e, t, n, s, i, r, a, u) {
  (n || s) && this.type === C.colon && this.unexpected(), this.eat(C.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, a), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === C.parenL ? (t && this.unexpected(), e.kind = "init", e.method = true, e.value = this.parseMethod(n, s)) : !t && !u && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== C.comma && this.type !== C.braceR && this.type !== C.eq ? ((n || s) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((n || s) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = i), e.kind = "init", t ? e.value = this.parseMaybeDefault(i, r, this.copyNode(e.key)) : this.type === C.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, r, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = true) : this.unexpected();
};
xe.parsePropertyName = function(e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(C.bracketL))
      return e.computed = true, e.key = this.parseMaybeAssign(), this.expect(C.bracketR), e.key;
    e.computed = false;
  }
  return e.key = this.type === C.num || this.type === C.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
xe.initFunction = function(e) {
  e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = false), this.options.ecmaVersion >= 8 && (e.async = false);
};
xe.parseMethod = function(e, t, n) {
  var s = this.startNode(), i = this.yieldPos, r = this.awaitPos, a = this.awaitIdentPos;
  return this.initFunction(s), this.options.ecmaVersion >= 6 && (s.generator = e), this.options.ecmaVersion >= 8 && (s.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Co(t, s.generator) | bo | (n ? _M : 0)), this.expect(C.parenL), s.params = this.parseBindingList(C.parenR, false, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(s, false, true, false), this.yieldPos = i, this.awaitPos = r, this.awaitIdentPos = a, this.finishNode(s, "FunctionExpression");
};
xe.parseArrowExpression = function(e, t, n, s) {
  var i = this.yieldPos, r = this.awaitPos, a = this.awaitIdentPos;
  return this.enterScope(Co(n, false) | TM), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, true), this.parseFunctionBody(e, true, false, s), this.yieldPos = i, this.awaitPos = r, this.awaitIdentPos = a, this.finishNode(e, "ArrowFunctionExpression");
};
xe.parseFunctionBody = function(e, t, n, s) {
  var i = t && this.type !== C.braceL, r = this.strict, a = false;
  if (i)
    e.body = this.parseMaybeAssign(s), e.expression = true, this.checkParams(e, false);
  else {
    var u = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    (!r || u) && (a = this.strictDirective(this.end), a && u && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var o = this.labels;
    this.labels = [], a && (this.strict = true), this.checkParams(e, !r && !a && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, KM), e.body = this.parseBlock(false, void 0, a && !r), e.expression = false, this.adaptDirectivePrologue(e.body.body), this.labels = o;
  }
  this.exitScope();
};
xe.isSimpleParamList = function(e) {
  for (var t = 0, n = e; t < n.length; t += 1) {
    var s = n[t];
    if (s.type !== "Identifier")
      return false;
  }
  return true;
};
xe.checkParams = function(e, t) {
  for (var n = /* @__PURE__ */ Object.create(null), s = 0, i = e.params; s < i.length; s += 1) {
    var r = i[s];
    this.checkLValInnerPattern(r, xo, t ? null : n);
  }
};
xe.parseExprList = function(e, t, n, s) {
  for (var i = [], r = true; !this.eat(e); ) {
    if (r)
      r = false;
    else if (this.expect(C.comma), t && this.afterTrailingComma(e))
      break;
    var a = void 0;
    n && this.type === C.comma ? a = null : this.type === C.ellipsis ? (a = this.parseSpread(s), s && this.type === C.comma && s.trailingComma < 0 && (s.trailingComma = this.start)) : a = this.parseMaybeAssign(false, s), i.push(a);
  }
  return i;
};
xe.checkUnreserved = function(e) {
  var t = e.start, n = e.end, s = e.name;
  if (this.inGenerator && s === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && s === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && s === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (s === "arguments" || s === "await") && this.raise(t, "Cannot use " + s + " in class static initialization block"), this.keywords.test(s) && this.raise(t, "Unexpected keyword '" + s + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf("\\") !== -1)) {
    var i = this.strict ? this.reservedWordsStrict : this.reservedWords;
    i.test(s) && (!this.inAsync && s === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + s + "' is reserved"));
  }
};
xe.parseIdent = function(e) {
  var t = this.parseIdentNode();
  return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
};
xe.parseIdentNode = function() {
  var e = this.startNode();
  return this.type === C.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = C.name) : this.unexpected(), e;
};
xe.parsePrivateIdent = function() {
  var e = this.startNode();
  return this.type === C.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
};
xe.parseYield = function(e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return this.next(), this.type === C.semi || this.canInsertSemicolon() || this.type !== C.star && !this.type.startsExpr ? (t.delegate = false, t.argument = null) : (t.delegate = this.eat(C.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
};
xe.parseAwait = function(e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, true, false, e), this.finishNode(t, "AwaitExpression");
};
var hr = ht.prototype;
hr.raise = function(e, t) {
  var n = NM(this.input, e);
  t += " (" + n.line + ":" + n.column + ")";
  var s = new SyntaxError(t);
  throw s.pos = e, s.loc = n, s.raisedAt = this.pos, s;
};
hr.raiseRecoverable = hr.raise;
hr.curPosition = function() {
  if (this.options.locations)
    return new Xi(this.curLine, this.pos - this.lineStart);
};
var $n = ht.prototype, Qw = function(t) {
  this.flags = t, this.var = [], this.lexical = [], this.functions = [], this.inClassFieldInit = false;
};
$n.enterScope = function(e) {
  this.scopeStack.push(new Qw(e));
};
$n.exitScope = function() {
  this.scopeStack.pop();
};
$n.treatFunctionsAsVarInScope = function(e) {
  return e.flags & Ks || !this.inModule && e.flags & Di;
};
$n.declareName = function(e, t, n) {
  var s = false;
  if (t === zn) {
    var i = this.currentScope();
    s = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & Di && delete this.undefinedExports[e];
  } else if (t === HM) {
    var r = this.currentScope();
    r.lexical.push(e);
  } else if (t === YM) {
    var a = this.currentScope();
    this.treatFunctionsAsVar ? s = a.lexical.indexOf(e) > -1 : s = a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
  } else
    for (var u = this.scopeStack.length - 1; u >= 0; --u) {
      var o = this.scopeStack[u];
      if (o.lexical.indexOf(e) > -1 && !(o.flags & IM && o.lexical[0] === e) || !this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1) {
        s = true;
        break;
      }
      if (o.var.push(e), this.inModule && o.flags & Di && delete this.undefinedExports[e], o.flags & Mo)
        break;
    }
  s && this.raiseRecoverable(n, "Identifier '" + e + "' has already been declared");
};
$n.checkLocalExport = function(e) {
  this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
};
$n.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
$n.currentVarScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & Mo)
      return t;
  }
};
$n.currentThisScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & Mo && !(t.flags & TM))
      return t;
  }
};
var Er = function(t, n, s) {
  this.type = "", this.start = n, this.end = 0, t.options.locations && (this.loc = new wr(t, s)), t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile), t.options.ranges && (this.range = [n, 0]);
}, Vi = ht.prototype;
Vi.startNode = function() {
  return new Er(this, this.start, this.startLoc);
};
Vi.startNodeAt = function(e, t) {
  return new Er(this, e, t);
};
function OM(e, t, n, s) {
  return e.type = t, e.end = n, this.options.locations && (e.loc.end = s), this.options.ranges && (e.range[1] = n), e;
}
Vi.finishNode = function(e, t) {
  return OM.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
};
Vi.finishNodeAt = function(e, t, n, s) {
  return OM.call(this, e, t, n, s);
};
Vi.copyNode = function(e) {
  var t = new Er(this, e.start, this.startLoc);
  for (var n in e)
    t[n] = e[n];
  return t;
};
var qw = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz", JM = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", QM = JM + " Extended_Pictographic", qM = QM, $M = qM + " EBase EComp EMod EPres ExtPict", e3 = $M, $w = e3, eZ = {
  9: JM,
  10: QM,
  11: qM,
  12: $M,
  13: e3,
  14: $w
}, tZ = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", nZ = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: tZ
}, Wc = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", t3 = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", n3 = t3 + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", s3 = n3 + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", i3 = s3 + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", r3 = i3 + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", sZ = r3 + " " + qw, iZ = {
  9: t3,
  10: n3,
  11: s3,
  12: i3,
  13: r3,
  14: sZ
}, a3 = {};
function rZ(e) {
  var t = a3[e] = {
    binary: jn(eZ[e] + " " + Wc),
    binaryOfStrings: jn(nZ[e]),
    nonBinary: {
      General_Category: jn(Wc),
      Script: jn(iZ[e])
    }
  };
  t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var ma = 0, Tc = [9, 10, 11, 12, 13, 14]; ma < Tc.length; ma += 1) {
  var aZ = Tc[ma];
  rZ(aZ);
}
var ne = ht.prototype, pr = function(t, n) {
  this.parent = t, this.base = n || this;
};
pr.prototype.separatedFrom = function(t) {
  for (var n = this; n; n = n.parent)
    for (var s = t; s; s = s.parent)
      if (n.base === s.base && n !== s)
        return true;
  return false;
};
pr.prototype.sibling = function() {
  return new pr(this.parent, this.base);
};
var An = function(t) {
  this.parser = t, this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "") + (t.options.ecmaVersion >= 13 ? "d" : "") + (t.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = a3[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = false, this.switchV = false, this.switchN = false, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = false, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = /* @__PURE__ */ Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
An.prototype.reset = function(t, n, s) {
  var i = s.indexOf("v") !== -1, r = s.indexOf("u") !== -1;
  this.start = t | 0, this.source = n + "", this.flags = s, i && this.parser.options.ecmaVersion >= 15 ? (this.switchU = true, this.switchV = true, this.switchN = true) : (this.switchU = r && this.parser.options.ecmaVersion >= 6, this.switchV = false, this.switchN = r && this.parser.options.ecmaVersion >= 9);
};
An.prototype.raise = function(t) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
};
An.prototype.at = function(t, n) {
  n === void 0 && (n = false);
  var s = this.source, i = s.length;
  if (t >= i)
    return -1;
  var r = s.charCodeAt(t);
  if (!(n || this.switchU) || r <= 55295 || r >= 57344 || t + 1 >= i)
    return r;
  var a = s.charCodeAt(t + 1);
  return a >= 56320 && a <= 57343 ? (r << 10) + a - 56613888 : r;
};
An.prototype.nextIndex = function(t, n) {
  n === void 0 && (n = false);
  var s = this.source, i = s.length;
  if (t >= i)
    return i;
  var r = s.charCodeAt(t), a;
  return !(n || this.switchU) || r <= 55295 || r >= 57344 || t + 1 >= i || (a = s.charCodeAt(t + 1)) < 56320 || a > 57343 ? t + 1 : t + 2;
};
An.prototype.current = function(t) {
  return t === void 0 && (t = false), this.at(this.pos, t);
};
An.prototype.lookahead = function(t) {
  return t === void 0 && (t = false), this.at(this.nextIndex(this.pos, t), t);
};
An.prototype.advance = function(t) {
  t === void 0 && (t = false), this.pos = this.nextIndex(this.pos, t);
};
An.prototype.eat = function(t, n) {
  return n === void 0 && (n = false), this.current(n) === t ? (this.advance(n), true) : false;
};
An.prototype.eatChars = function(t, n) {
  n === void 0 && (n = false);
  for (var s = this.pos, i = 0, r = t; i < r.length; i += 1) {
    var a = r[i], u = this.at(s, n);
    if (u === -1 || u !== a)
      return false;
    s = this.nextIndex(s, n);
  }
  return this.pos = s, true;
};
ne.validateRegExpFlags = function(e) {
  for (var t = e.validFlags, n = e.flags, s = false, i = false, r = 0; r < n.length; r++) {
    var a = n.charAt(r);
    t.indexOf(a) === -1 && this.raise(e.start, "Invalid regular expression flag"), n.indexOf(a, r + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), a === "u" && (s = true), a === "v" && (i = true);
  }
  this.options.ecmaVersion >= 15 && s && i && this.raise(e.start, "Invalid regular expression flag");
};
function uZ(e) {
  for (var t in e)
    return true;
  return false;
}
ne.validateRegExpPattern = function(e) {
  this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && uZ(e.groupNames) && (e.switchN = true, this.regexp_pattern(e));
};
ne.regexp_pattern = function(e) {
  e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = false, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = /* @__PURE__ */ Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(
    41
    /* ) */
  ) && e.raise("Unmatched ')'"), (e.eat(
    93
    /* ] */
  ) || e.eat(
    125
    /* } */
  )) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
  for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
    var s = n[t];
    e.groupNames[s] || e.raise("Invalid named capture referenced");
  }
};
ne.regexp_disjunction = function(e) {
  var t = this.options.ecmaVersion >= 16;
  for (t && (e.branchID = new pr(e.branchID, null)), this.regexp_alternative(e); e.eat(
    124
    /* | */
  ); )
    t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
  t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, true) && e.raise("Nothing to repeat"), e.eat(
    123
    /* { */
  ) && e.raise("Lone quantifier brackets");
};
ne.regexp_alternative = function(e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
    ;
};
ne.regexp_eatTerm = function(e) {
  return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), true) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), true) : false;
};
ne.regexp_eatAssertion = function(e) {
  var t = e.pos;
  if (e.lastAssertionIsQuantifiable = false, e.eat(
    94
    /* ^ */
  ) || e.eat(
    36
    /* $ */
  ))
    return true;
  if (e.eat(
    92
    /* \ */
  )) {
    if (e.eat(
      66
      /* B */
    ) || e.eat(
      98
      /* b */
    ))
      return true;
    e.pos = t;
  }
  if (e.eat(
    40
    /* ( */
  ) && e.eat(
    63
    /* ? */
  )) {
    var n = false;
    if (this.options.ecmaVersion >= 9 && (n = e.eat(
      60
      /* < */
    )), e.eat(
      61
      /* = */
    ) || e.eat(
      33
      /* ! */
    ))
      return this.regexp_disjunction(e), e.eat(
        41
        /* ) */
      ) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !n, true;
  }
  return e.pos = t, false;
};
ne.regexp_eatQuantifier = function(e, t) {
  return t === void 0 && (t = false), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(
    63
    /* ? */
  ), true) : false;
};
ne.regexp_eatQuantifierPrefix = function(e, t) {
  return e.eat(
    42
    /* * */
  ) || e.eat(
    43
    /* + */
  ) || e.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(e, t);
};
ne.regexp_eatBracedQuantifier = function(e, t) {
  var n = e.pos;
  if (e.eat(
    123
    /* { */
  )) {
    var s = 0, i = -1;
    if (this.regexp_eatDecimalDigits(e) && (s = e.lastIntValue, e.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(
      125
      /* } */
    )))
      return i !== -1 && i < s && !t && e.raise("numbers out of order in {} quantifier"), true;
    e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = n;
  }
  return false;
};
ne.regexp_eatAtom = function(e) {
  return this.regexp_eatPatternCharacters(e) || e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
};
ne.regexp_eatReverseSolidusAtomEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(e))
      return true;
    e.pos = t;
  }
  return false;
};
ne.regexp_eatUncapturingGroup = function(e) {
  var t = e.pos;
  if (e.eat(
    40
    /* ( */
  )) {
    if (e.eat(
      63
      /* ? */
    )) {
      if (this.options.ecmaVersion >= 16) {
        var n = this.regexp_eatModifiers(e), s = e.eat(
          45
          /* - */
        );
        if (n || s) {
          for (var i = 0; i < n.length; i++) {
            var r = n.charAt(i);
            n.indexOf(r, i + 1) > -1 && e.raise("Duplicate regular expression modifiers");
          }
          if (s) {
            var a = this.regexp_eatModifiers(e);
            !n && !a && e.current() === 58 && e.raise("Invalid regular expression modifiers");
            for (var u = 0; u < a.length; u++) {
              var o = a.charAt(u);
              (a.indexOf(o, u + 1) > -1 || n.indexOf(o) > -1) && e.raise("Duplicate regular expression modifiers");
            }
          }
        }
      }
      if (e.eat(
        58
        /* : */
      )) {
        if (this.regexp_disjunction(e), e.eat(
          41
          /* ) */
        ))
          return true;
        e.raise("Unterminated group");
      }
    }
    e.pos = t;
  }
  return false;
};
ne.regexp_eatCapturingGroup = function(e) {
  if (e.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(
      41
      /* ) */
    ))
      return e.numCapturingParens += 1, true;
    e.raise("Unterminated group");
  }
  return false;
};
ne.regexp_eatModifiers = function(e) {
  for (var t = "", n = 0; (n = e.current()) !== -1 && oZ(n); )
    t += Vn(n), e.advance();
  return t;
};
function oZ(e) {
  return e === 105 || e === 109 || e === 115;
}
ne.regexp_eatExtendedAtom = function(e) {
  return e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
};
ne.regexp_eatInvalidBracedQuantifier = function(e) {
  return this.regexp_eatBracedQuantifier(e, true) && e.raise("Nothing to repeat"), false;
};
ne.regexp_eatSyntaxCharacter = function(e) {
  var t = e.current();
  return u3(t) ? (e.lastIntValue = t, e.advance(), true) : false;
};
function u3(e) {
  return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
ne.regexp_eatPatternCharacters = function(e) {
  for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !u3(n); )
    e.advance();
  return e.pos !== t;
};
ne.regexp_eatExtendedPatternCharacter = function(e) {
  var t = e.current();
  return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), true) : false;
};
ne.regexp_groupSpecifier = function(e) {
  if (e.eat(
    63
    /* ? */
  )) {
    this.regexp_eatGroupName(e) || e.raise("Invalid group");
    var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
    if (n)
      if (t)
        for (var s = 0, i = n; s < i.length; s += 1) {
          var r = i[s];
          r.separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
        }
      else
        e.raise("Duplicate capture group name");
    t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = true;
  }
};
ne.regexp_eatGroupName = function(e) {
  if (e.lastStringValue = "", e.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(
      62
      /* > */
    ))
      return true;
    e.raise("Invalid capture group name");
  }
  return false;
};
ne.regexp_eatRegExpIdentifierName = function(e) {
  if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
    for (e.lastStringValue += Vn(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
      e.lastStringValue += Vn(e.lastIntValue);
    return true;
  }
  return false;
};
ne.regexp_eatRegExpIdentifierStart = function(e) {
  var t = e.pos, n = this.options.ecmaVersion >= 11, s = e.current(n);
  return e.advance(n), s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (s = e.lastIntValue), cZ(s) ? (e.lastIntValue = s, true) : (e.pos = t, false);
};
function cZ(e) {
  return Bn(e, true) || e === 36 || e === 95;
}
ne.regexp_eatRegExpIdentifierPart = function(e) {
  var t = e.pos, n = this.options.ecmaVersion >= 11, s = e.current(n);
  return e.advance(n), s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (s = e.lastIntValue), lZ(s) ? (e.lastIntValue = s, true) : (e.pos = t, false);
};
function lZ(e) {
  return ks(e, true) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
ne.regexp_eatAtomEscape = function(e) {
  return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? true : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), false);
};
ne.regexp_eatBackReference = function(e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var n = e.lastIntValue;
    if (e.switchU)
      return n > e.maxBackReference && (e.maxBackReference = n), true;
    if (n <= e.numCapturingParens)
      return true;
    e.pos = t;
  }
  return false;
};
ne.regexp_eatKGroupName = function(e) {
  if (e.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(e))
      return e.backReferenceNames.push(e.lastStringValue), true;
    e.raise("Invalid named reference");
  }
  return false;
};
ne.regexp_eatCharacterEscape = function(e) {
  return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, false) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
};
ne.regexp_eatCControlLetter = function(e) {
  var t = e.pos;
  if (e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(e))
      return true;
    e.pos = t;
  }
  return false;
};
ne.regexp_eatZero = function(e) {
  return e.current() === 48 && !Lr(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), true) : false;
};
ne.regexp_eatControlEscape = function(e) {
  var t = e.current();
  return t === 116 ? (e.lastIntValue = 9, e.advance(), true) : t === 110 ? (e.lastIntValue = 10, e.advance(), true) : t === 118 ? (e.lastIntValue = 11, e.advance(), true) : t === 102 ? (e.lastIntValue = 12, e.advance(), true) : t === 114 ? (e.lastIntValue = 13, e.advance(), true) : false;
};
ne.regexp_eatControlLetter = function(e) {
  var t = e.current();
  return o3(t) ? (e.lastIntValue = t % 32, e.advance(), true) : false;
};
function o3(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
ne.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
  t === void 0 && (t = false);
  var n = e.pos, s = t || e.switchU;
  if (e.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var i = e.lastIntValue;
      if (s && i >= 55296 && i <= 56319) {
        var r = e.pos;
        if (e.eat(
          92
          /* \ */
        ) && e.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(e, 4)) {
          var a = e.lastIntValue;
          if (a >= 56320 && a <= 57343)
            return e.lastIntValue = (i - 55296) * 1024 + (a - 56320) + 65536, true;
        }
        e.pos = r, e.lastIntValue = i;
      }
      return true;
    }
    if (s && e.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(e) && e.eat(
      125
      /* } */
    ) && dZ(e.lastIntValue))
      return true;
    s && e.raise("Invalid unicode escape"), e.pos = n;
  }
  return false;
};
function dZ(e) {
  return e >= 0 && e <= 1114111;
}
ne.regexp_eatIdentityEscape = function(e) {
  if (e.switchU)
    return this.regexp_eatSyntaxCharacter(e) ? true : e.eat(
      47
      /* / */
    ) ? (e.lastIntValue = 47, true) : false;
  var t = e.current();
  return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), true) : false;
};
ne.regexp_eatDecimalEscape = function(e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do
      e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
    while ((t = e.current()) >= 48 && t <= 57);
    return true;
  }
  return false;
};
var c3 = 0, kn = 1, jt = 2;
ne.regexp_eatCharacterClassEscape = function(e) {
  var t = e.current();
  if (hZ(t))
    return e.lastIntValue = -1, e.advance(), kn;
  var n = false;
  if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
    e.lastIntValue = -1, e.advance();
    var s;
    if (e.eat(
      123
      /* { */
    ) && (s = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(
      125
      /* } */
    ))
      return n && s === jt && e.raise("Invalid property name"), s;
    e.raise("Invalid property name");
  }
  return c3;
};
function hZ(e) {
  return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
ne.regexp_eatUnicodePropertyValueExpression = function(e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(
    61
    /* = */
  )) {
    var n = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var s = e.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(e, n, s), kn;
    }
  }
  if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
    var i = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, i);
  }
  return c3;
};
ne.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
  Hs(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(n) || e.raise("Invalid property value");
};
ne.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
  if (e.unicodeProperties.binary.test(t))
    return kn;
  if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t))
    return jt;
  e.raise("Invalid property name");
};
ne.regexp_eatUnicodePropertyName = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; l3(t = e.current()); )
    e.lastStringValue += Vn(t), e.advance();
  return e.lastStringValue !== "";
};
function l3(e) {
  return o3(e) || e === 95;
}
ne.regexp_eatUnicodePropertyValue = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; pZ(t = e.current()); )
    e.lastStringValue += Vn(t), e.advance();
  return e.lastStringValue !== "";
};
function pZ(e) {
  return l3(e) || Lr(e);
}
ne.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
  return this.regexp_eatUnicodePropertyValue(e);
};
ne.regexp_eatCharacterClass = function(e) {
  if (e.eat(
    91
    /* [ */
  )) {
    var t = e.eat(
      94
      /* ^ */
    ), n = this.regexp_classContents(e);
    return e.eat(
      93
      /* ] */
    ) || e.raise("Unterminated character class"), t && n === jt && e.raise("Negated character class may contain strings"), true;
  }
  return false;
};
ne.regexp_classContents = function(e) {
  return e.current() === 93 ? kn : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), kn);
};
ne.regexp_nonEmptyClassRanges = function(e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(e)) {
      var n = e.lastIntValue;
      e.switchU && (t === -1 || n === -1) && e.raise("Invalid character class"), t !== -1 && n !== -1 && t > n && e.raise("Range out of order in character class");
    }
  }
};
ne.regexp_eatClassAtom = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(e))
      return true;
    if (e.switchU) {
      var n = e.current();
      (n === 99 || p3(n)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
    }
    e.pos = t;
  }
  var s = e.current();
  return s !== 93 ? (e.lastIntValue = s, e.advance(), true) : false;
};
ne.regexp_eatClassEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    98
    /* b */
  ))
    return e.lastIntValue = 8, true;
  if (e.switchU && e.eat(
    45
    /* - */
  ))
    return e.lastIntValue = 45, true;
  if (!e.switchU && e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(e))
      return true;
    e.pos = t;
  }
  return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
};
ne.regexp_classSetExpression = function(e) {
  var t = kn, n;
  if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
    n === jt && (t = jt);
    for (var s = e.pos; e.eatChars(
      [38, 38]
      /* && */
    ); ) {
      if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
        n !== jt && (t = kn);
        continue;
      }
      e.raise("Invalid character in character class");
    }
    if (s !== e.pos)
      return t;
    for (; e.eatChars(
      [45, 45]
      /* -- */
    ); )
      this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
    if (s !== e.pos)
      return t;
  } else
    e.raise("Invalid character in character class");
  for (; ; )
    if (!this.regexp_eatClassSetRange(e)) {
      if (n = this.regexp_eatClassSetOperand(e), !n)
        return t;
      n === jt && (t = jt);
    }
};
ne.regexp_eatClassSetRange = function(e) {
  var t = e.pos;
  if (this.regexp_eatClassSetCharacter(e)) {
    var n = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassSetCharacter(e)) {
      var s = e.lastIntValue;
      return n !== -1 && s !== -1 && n > s && e.raise("Range out of order in character class"), true;
    }
    e.pos = t;
  }
  return false;
};
ne.regexp_eatClassSetOperand = function(e) {
  return this.regexp_eatClassSetCharacter(e) ? kn : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
};
ne.regexp_eatNestedClass = function(e) {
  var t = e.pos;
  if (e.eat(
    91
    /* [ */
  )) {
    var n = e.eat(
      94
      /* ^ */
    ), s = this.regexp_classContents(e);
    if (e.eat(
      93
      /* ] */
    ))
      return n && s === jt && e.raise("Negated character class may contain strings"), s;
    e.pos = t;
  }
  if (e.eat(
    92
    /* \ */
  )) {
    var i = this.regexp_eatCharacterClassEscape(e);
    if (i)
      return i;
    e.pos = t;
  }
  return null;
};
ne.regexp_eatClassStringDisjunction = function(e) {
  var t = e.pos;
  if (e.eatChars(
    [92, 113]
    /* \q */
  )) {
    if (e.eat(
      123
      /* { */
    )) {
      var n = this.regexp_classStringDisjunctionContents(e);
      if (e.eat(
        125
        /* } */
      ))
        return n;
    } else
      e.raise("Invalid escape");
    e.pos = t;
  }
  return null;
};
ne.regexp_classStringDisjunctionContents = function(e) {
  for (var t = this.regexp_classString(e); e.eat(
    124
    /* | */
  ); )
    this.regexp_classString(e) === jt && (t = jt);
  return t;
};
ne.regexp_classString = function(e) {
  for (var t = 0; this.regexp_eatClassSetCharacter(e); )
    t++;
  return t === 1 ? kn : jt;
};
ne.regexp_eatClassSetCharacter = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  ))
    return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? true : e.eat(
      98
      /* b */
    ) ? (e.lastIntValue = 8, true) : (e.pos = t, false);
  var n = e.current();
  return n < 0 || n === e.lookahead() && mZ(n) || fZ(n) ? false : (e.advance(), e.lastIntValue = n, true);
};
function mZ(e) {
  return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function fZ(e) {
  return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
ne.regexp_eatClassSetReservedPunctuator = function(e) {
  var t = e.current();
  return yZ(t) ? (e.lastIntValue = t, e.advance(), true) : false;
};
function yZ(e) {
  return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
ne.regexp_eatClassControlLetter = function(e) {
  var t = e.current();
  return Lr(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), true) : false;
};
ne.regexp_eatHexEscapeSequence = function(e) {
  var t = e.pos;
  if (e.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 2))
      return true;
    e.switchU && e.raise("Invalid escape"), e.pos = t;
  }
  return false;
};
ne.regexp_eatDecimalDigits = function(e) {
  var t = e.pos, n = 0;
  for (e.lastIntValue = 0; Lr(n = e.current()); )
    e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
  return e.pos !== t;
};
function Lr(e) {
  return e >= 48 && e <= 57;
}
ne.regexp_eatHexDigits = function(e) {
  var t = e.pos, n = 0;
  for (e.lastIntValue = 0; d3(n = e.current()); )
    e.lastIntValue = 16 * e.lastIntValue + h3(n), e.advance();
  return e.pos !== t;
};
function d3(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function h3(e) {
  return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
ne.regexp_eatLegacyOctalEscapeSequence = function(e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var n = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
    } else
      e.lastIntValue = t;
    return true;
  }
  return false;
};
ne.regexp_eatOctalDigit = function(e) {
  var t = e.current();
  return p3(t) ? (e.lastIntValue = t - 48, e.advance(), true) : (e.lastIntValue = 0, false);
};
function p3(e) {
  return e >= 48 && e <= 55;
}
ne.regexp_eatFixedHexDigits = function(e, t) {
  var n = e.pos;
  e.lastIntValue = 0;
  for (var s = 0; s < t; ++s) {
    var i = e.current();
    if (!d3(i))
      return e.pos = n, false;
    e.lastIntValue = 16 * e.lastIntValue + h3(i), e.advance();
  }
  return true;
};
var vo = function(t) {
  this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, t.options.locations && (this.loc = new wr(t, t.startLoc, t.endLoc)), t.options.ranges && (this.range = [t.start, t.end]);
}, Be = ht.prototype;
Be.next = function(e) {
  !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new vo(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
Be.getToken = function() {
  return this.next(), new vo(this);
};
typeof Symbol < "u" && (Be[Symbol.iterator] = function() {
  var e = this;
  return {
    next: function() {
      var t = e.getToken();
      return {
        done: t.type === C.eof,
        value: t
      };
    }
  };
});
Be.nextToken = function() {
  var e = this.curContext();
  if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(C.eof);
  if (e.override)
    return e.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
Be.readToken = function(e) {
  return Bn(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
};
Be.fullCharCodeAtPos = function() {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320)
    return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
};
Be.skipBlockComment = function() {
  var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
  if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations)
    for (var s = void 0, i = t; (s = VM(this.input, i, this.pos)) > -1; )
      ++this.curLine, i = this.lineStart = s;
  this.options.onComment && this.options.onComment(
    true,
    this.input.slice(t + 2, n),
    t,
    this.pos,
    e,
    this.curPosition()
  );
};
Be.skipLineComment = function(e) {
  for (var t = this.pos, n = this.options.onComment && this.curPosition(), s = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !Ys(s); )
    s = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    false,
    this.input.slice(t + e, this.pos),
    t,
    this.pos,
    n,
    this.curPosition()
  );
};
Be.skipSpace = function() {
  e: for (; this.pos < this.input.length; ) {
    var e = this.input.charCodeAt(this.pos);
    switch (e) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
      case 10:
      case 8232:
      case 8233:
        ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break e;
        }
        break;
      default:
        if (e > 8 && e < 14 || e >= 5760 && kM.test(String.fromCharCode(e)))
          ++this.pos;
        else
          break e;
    }
  }
};
Be.finishToken = function(e, t) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var n = this.type;
  this.type = e, this.value = t, this.updateContext(n);
};
Be.readToken_dot = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57)
    return this.readNumber(true);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(C.ellipsis)) : (++this.pos, this.finishToken(C.dot));
};
Be.readToken_slash = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(C.assign, 2) : this.finishOp(C.slash, 1);
};
Be.readToken_mult_modulo_exp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), n = 1, s = e === 42 ? C.star : C.modulo;
  return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, s = C.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(C.assign, n + 1) : this.finishOp(s, n);
};
Be.readToken_pipe_amp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n === 61)
        return this.finishOp(C.assign, 3);
    }
    return this.finishOp(e === 124 ? C.logicalOR : C.logicalAND, 2);
  }
  return t === 61 ? this.finishOp(C.assign, 2) : this.finishOp(e === 124 ? C.bitwiseOR : C.bitwiseAND, 1);
};
Be.readToken_caret = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(C.assign, 2) : this.finishOp(C.bitwiseXOR, 1);
};
Be.readToken_plus_min = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || Jt.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(C.incDec, 2) : t === 61 ? this.finishOp(C.assign, 2) : this.finishOp(C.plusMin, 1);
};
Be.readToken_lt_gt = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), n = 1;
  return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(C.assign, n + 1) : this.finishOp(C.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(C.relational, n));
};
Be.readToken_eq_excl = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(C.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(C.arrow)) : this.finishOp(e === 61 ? C.eq : C.prefix, 1);
};
Be.readToken_question = function() {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (t === 46) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n < 48 || n > 57)
        return this.finishOp(C.questionDot, 2);
    }
    if (t === 63) {
      if (e >= 12) {
        var s = this.input.charCodeAt(this.pos + 2);
        if (s === 61)
          return this.finishOp(C.assign, 3);
      }
      return this.finishOp(C.coalesce, 2);
    }
  }
  return this.finishOp(C.question, 1);
};
Be.readToken_numberSign = function() {
  var e = this.options.ecmaVersion, t = 35;
  if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), Bn(t, true) || t === 92))
    return this.finishToken(C.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + Vn(t) + "'");
};
Be.getTokenFromCode = function(e) {
  switch (e) {
    case 46:
      return this.readToken_dot();
    case 40:
      return ++this.pos, this.finishToken(C.parenL);
    case 41:
      return ++this.pos, this.finishToken(C.parenR);
    case 59:
      return ++this.pos, this.finishToken(C.semi);
    case 44:
      return ++this.pos, this.finishToken(C.comma);
    case 91:
      return ++this.pos, this.finishToken(C.bracketL);
    case 93:
      return ++this.pos, this.finishToken(C.bracketR);
    case 123:
      return ++this.pos, this.finishToken(C.braceL);
    case 125:
      return ++this.pos, this.finishToken(C.braceR);
    case 58:
      return ++this.pos, this.finishToken(C.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(C.backQuote);
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (t === 120 || t === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (t === 111 || t === 79)
          return this.readRadixNumber(8);
        if (t === 98 || t === 66)
          return this.readRadixNumber(2);
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(false);
    case 34:
    case 39:
      return this.readString(e);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(C.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + Vn(e) + "'");
};
Be.finishOp = function(e, t) {
  var n = this.input.slice(this.pos, this.pos + t);
  return this.pos += t, this.finishToken(e, n);
};
Be.readRegexp = function() {
  for (var e, t, n = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
    var s = this.input.charAt(this.pos);
    if (Jt.test(s) && this.raise(n, "Unterminated regular expression"), e)
      e = false;
    else {
      if (s === "[")
        t = true;
      else if (s === "]" && t)
        t = false;
      else if (s === "/" && !t)
        break;
      e = s === "\\";
    }
    ++this.pos;
  }
  var i = this.input.slice(n, this.pos);
  ++this.pos;
  var r = this.pos, a = this.readWord1();
  this.containsEsc && this.unexpected(r);
  var u = this.regexpState || (this.regexpState = new An(this));
  u.reset(n, i, a), this.validateRegExpFlags(u), this.validateRegExpPattern(u);
  var o = null;
  try {
    o = new RegExp(i, a);
  } catch {
  }
  return this.finishToken(C.regexp, { pattern: i, flags: a, value: o });
};
Be.readInt = function(e, t, n) {
  for (var s = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, r = this.pos, a = 0, u = 0, o = 0, c = t ?? 1 / 0; o < c; ++o, ++this.pos) {
    var l = this.input.charCodeAt(this.pos), p = void 0;
    if (s && l === 95) {
      i && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), u === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), o === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), u = l;
      continue;
    }
    if (l >= 97 ? p = l - 97 + 10 : l >= 65 ? p = l - 65 + 10 : l >= 48 && l <= 57 ? p = l - 48 : p = 1 / 0, p >= e)
      break;
    u = l, a = a * e + p;
  }
  return s && u === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === r || t != null && this.pos - r !== t ? null : a;
};
function gZ(e, t) {
  return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function m3(e) {
  return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
Be.readRadixNumber = function(e) {
  var t = this.pos;
  this.pos += 2;
  var n = this.readInt(e);
  return n == null && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = m3(this.input.slice(t, this.pos)), ++this.pos) : Bn(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(C.num, n);
};
Be.readNumber = function(e) {
  var t = this.pos;
  !e && this.readInt(10, void 0, true) === null && this.raise(t, "Invalid number");
  var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
  n && this.strict && this.raise(t, "Invalid number");
  var s = this.input.charCodeAt(this.pos);
  if (!n && !e && this.options.ecmaVersion >= 11 && s === 110) {
    var i = m3(this.input.slice(t, this.pos));
    return ++this.pos, Bn(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(C.num, i);
  }
  n && /[89]/.test(this.input.slice(t, this.pos)) && (n = false), s === 46 && !n && (++this.pos, this.readInt(10), s = this.input.charCodeAt(this.pos)), (s === 69 || s === 101) && !n && (s = this.input.charCodeAt(++this.pos), (s === 43 || s === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), Bn(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var r = gZ(this.input.slice(t, this.pos), n);
  return this.finishToken(C.num, r);
};
Be.readCodePoint = function() {
  var e = this.input.charCodeAt(this.pos), t;
  if (e === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var n = ++this.pos;
    t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
  } else
    t = this.readHexChar(4);
  return t;
};
Be.readString = function(e) {
  for (var t = "", n = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var s = this.input.charCodeAt(this.pos);
    if (s === e)
      break;
    s === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(false), n = this.pos) : s === 8232 || s === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (Ys(s) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return t += this.input.slice(n, this.pos++), this.finishToken(C.string, t);
};
var f3 = {};
Be.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e === f3)
      this.readInvalidTemplateToken();
    else
      throw e;
  }
  this.inTemplateElement = false;
};
Be.invalidStringToken = function(e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw f3;
  this.raise(e, t);
};
Be.readTmplToken = function() {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var n = this.input.charCodeAt(this.pos);
    if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === C.template || this.type === C.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(C.dollarBraceL)) : (++this.pos, this.finishToken(C.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(C.template, e));
    if (n === 92)
      e += this.input.slice(t, this.pos), e += this.readEscapedChar(true), t = this.pos;
    else if (Ys(n)) {
      switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          e += `
`;
          break;
        default:
          e += String.fromCharCode(n);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
    } else
      ++this.pos;
  }
};
Be.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{")
          break;
      case "`":
        return this.finishToken(C.invalidTemplate, this.input.slice(this.start, this.pos));
      case "\r":
        this.input[this.pos + 1] === `
` && ++this.pos;
      case `
`:
      case "\u2028":
      case "\u2029":
        ++this.curLine, this.lineStart = this.pos + 1;
        break;
    }
  this.raise(this.start, "Unterminated template");
};
Be.readEscapedChar = function(e) {
  var t = this.input.charCodeAt(++this.pos);
  switch (++this.pos, t) {
    case 110:
      return `
`;
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return Vn(this.readCodePoint());
    case 116:
      return "	";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (this.strict && this.invalidStringToken(
        this.pos - 1,
        "Invalid escape sequence"
      ), e) {
        var n = this.pos - 1;
        this.invalidStringToken(
          n,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (t >= 48 && t <= 55) {
        var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(s, 8);
        return i > 255 && (s = s.slice(0, -1), i = parseInt(s, 8)), this.pos += s.length - 1, t = this.input.charCodeAt(this.pos), (s !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(
          this.pos - 1 - s.length,
          e ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(i);
      }
      return Ys(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
  }
};
Be.readHexChar = function(e) {
  var t = this.pos, n = this.readInt(16, e);
  return n === null && this.invalidStringToken(t, "Bad character escape sequence"), n;
};
Be.readWord1 = function() {
  this.containsEsc = false;
  for (var e = "", t = true, n = this.pos, s = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var i = this.fullCharCodeAtPos();
    if (ks(i, s))
      this.pos += i <= 65535 ? 1 : 2;
    else if (i === 92) {
      this.containsEsc = true, e += this.input.slice(n, this.pos);
      var r = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var a = this.readCodePoint();
      (t ? Bn : ks)(a, s) || this.invalidStringToken(r, "Invalid Unicode escape"), e += Vn(a), n = this.pos;
    } else
      break;
    t = false;
  }
  return e + this.input.slice(n, this.pos);
};
Be.readWord = function() {
  var e = this.readWord1(), t = C.name;
  return this.keywords.test(e) && (t = yo[e]), this.finishToken(t, e);
};
var bZ = "8.14.0";
ht.acorn = {
  Parser: ht,
  version: bZ,
  defaultOptions: iu,
  Position: Xi,
  SourceLocation: wr,
  getLineInfo: NM,
  Node: Er,
  TokenType: ze,
  tokTypes: C,
  keywordTypes: yo,
  TokContext: nn,
  tokContexts: it,
  isIdentifierChar: ks,
  isIdentifierStart: Bn,
  Token: vo,
  isNewLine: Ys,
  lineBreak: Jt,
  lineBreakG: Ww,
  nonASCIIwhitespace: kM
};
function MZ(e, t) {
  return ht.parse(e, t);
}
var CZ = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function y3(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function xZ(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function s() {
      return this instanceof s ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: true }), Object.keys(e).forEach(function(s) {
    var i = Object.getOwnPropertyDescriptor(e, s);
    Object.defineProperty(n, s, i.get ? i : {
      enumerable: true,
      get: function() {
        return e[s];
      }
    });
  }), n;
}
var fa = {}, ya = {}, Ic;
function GZ() {
  return Ic || (Ic = 1, function(e) {
    (function t(n) {
      var s, i, r, a, u, o;
      function c(X) {
        var Z = {}, L, R;
        for (L in X)
          X.hasOwnProperty(L) && (R = X[L], typeof R == "object" && R !== null ? Z[L] = c(R) : Z[L] = R);
        return Z;
      }
      function l(X, Z) {
        var L, R, H, z;
        for (R = X.length, H = 0; R; )
          L = R >>> 1, z = H + L, Z(X[z]) ? R = L : (H = z + 1, R -= L + 1);
        return H;
      }
      s = {
        AssignmentExpression: "AssignmentExpression",
        AssignmentPattern: "AssignmentPattern",
        ArrayExpression: "ArrayExpression",
        ArrayPattern: "ArrayPattern",
        ArrowFunctionExpression: "ArrowFunctionExpression",
        AwaitExpression: "AwaitExpression",
        // CAUTION: It's deferred to ES7.
        BlockStatement: "BlockStatement",
        BinaryExpression: "BinaryExpression",
        BreakStatement: "BreakStatement",
        CallExpression: "CallExpression",
        CatchClause: "CatchClause",
        ChainExpression: "ChainExpression",
        ClassBody: "ClassBody",
        ClassDeclaration: "ClassDeclaration",
        ClassExpression: "ClassExpression",
        ComprehensionBlock: "ComprehensionBlock",
        // CAUTION: It's deferred to ES7.
        ComprehensionExpression: "ComprehensionExpression",
        // CAUTION: It's deferred to ES7.
        ConditionalExpression: "ConditionalExpression",
        ContinueStatement: "ContinueStatement",
        DebuggerStatement: "DebuggerStatement",
        DirectiveStatement: "DirectiveStatement",
        DoWhileStatement: "DoWhileStatement",
        EmptyStatement: "EmptyStatement",
        ExportAllDeclaration: "ExportAllDeclaration",
        ExportDefaultDeclaration: "ExportDefaultDeclaration",
        ExportNamedDeclaration: "ExportNamedDeclaration",
        ExportSpecifier: "ExportSpecifier",
        ExpressionStatement: "ExpressionStatement",
        ForStatement: "ForStatement",
        ForInStatement: "ForInStatement",
        ForOfStatement: "ForOfStatement",
        FunctionDeclaration: "FunctionDeclaration",
        FunctionExpression: "FunctionExpression",
        GeneratorExpression: "GeneratorExpression",
        // CAUTION: It's deferred to ES7.
        Identifier: "Identifier",
        IfStatement: "IfStatement",
        ImportExpression: "ImportExpression",
        ImportDeclaration: "ImportDeclaration",
        ImportDefaultSpecifier: "ImportDefaultSpecifier",
        ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
        ImportSpecifier: "ImportSpecifier",
        Literal: "Literal",
        LabeledStatement: "LabeledStatement",
        LogicalExpression: "LogicalExpression",
        MemberExpression: "MemberExpression",
        MetaProperty: "MetaProperty",
        MethodDefinition: "MethodDefinition",
        ModuleSpecifier: "ModuleSpecifier",
        NewExpression: "NewExpression",
        ObjectExpression: "ObjectExpression",
        ObjectPattern: "ObjectPattern",
        PrivateIdentifier: "PrivateIdentifier",
        Program: "Program",
        Property: "Property",
        PropertyDefinition: "PropertyDefinition",
        RestElement: "RestElement",
        ReturnStatement: "ReturnStatement",
        SequenceExpression: "SequenceExpression",
        SpreadElement: "SpreadElement",
        Super: "Super",
        SwitchStatement: "SwitchStatement",
        SwitchCase: "SwitchCase",
        TaggedTemplateExpression: "TaggedTemplateExpression",
        TemplateElement: "TemplateElement",
        TemplateLiteral: "TemplateLiteral",
        ThisExpression: "ThisExpression",
        ThrowStatement: "ThrowStatement",
        TryStatement: "TryStatement",
        UnaryExpression: "UnaryExpression",
        UpdateExpression: "UpdateExpression",
        VariableDeclaration: "VariableDeclaration",
        VariableDeclarator: "VariableDeclarator",
        WhileStatement: "WhileStatement",
        WithStatement: "WithStatement",
        YieldExpression: "YieldExpression"
      }, r = {
        AssignmentExpression: ["left", "right"],
        AssignmentPattern: ["left", "right"],
        ArrayExpression: ["elements"],
        ArrayPattern: ["elements"],
        ArrowFunctionExpression: ["params", "body"],
        AwaitExpression: ["argument"],
        // CAUTION: It's deferred to ES7.
        BlockStatement: ["body"],
        BinaryExpression: ["left", "right"],
        BreakStatement: ["label"],
        CallExpression: ["callee", "arguments"],
        CatchClause: ["param", "body"],
        ChainExpression: ["expression"],
        ClassBody: ["body"],
        ClassDeclaration: ["id", "superClass", "body"],
        ClassExpression: ["id", "superClass", "body"],
        ComprehensionBlock: ["left", "right"],
        // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ["blocks", "filter", "body"],
        // CAUTION: It's deferred to ES7.
        ConditionalExpression: ["test", "consequent", "alternate"],
        ContinueStatement: ["label"],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ["body", "test"],
        EmptyStatement: [],
        ExportAllDeclaration: ["source"],
        ExportDefaultDeclaration: ["declaration"],
        ExportNamedDeclaration: ["declaration", "specifiers", "source"],
        ExportSpecifier: ["exported", "local"],
        ExpressionStatement: ["expression"],
        ForStatement: ["init", "test", "update", "body"],
        ForInStatement: ["left", "right", "body"],
        ForOfStatement: ["left", "right", "body"],
        FunctionDeclaration: ["id", "params", "body"],
        FunctionExpression: ["id", "params", "body"],
        GeneratorExpression: ["blocks", "filter", "body"],
        // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ["test", "consequent", "alternate"],
        ImportExpression: ["source"],
        ImportDeclaration: ["specifiers", "source"],
        ImportDefaultSpecifier: ["local"],
        ImportNamespaceSpecifier: ["local"],
        ImportSpecifier: ["imported", "local"],
        Literal: [],
        LabeledStatement: ["label", "body"],
        LogicalExpression: ["left", "right"],
        MemberExpression: ["object", "property"],
        MetaProperty: ["meta", "property"],
        MethodDefinition: ["key", "value"],
        ModuleSpecifier: [],
        NewExpression: ["callee", "arguments"],
        ObjectExpression: ["properties"],
        ObjectPattern: ["properties"],
        PrivateIdentifier: [],
        Program: ["body"],
        Property: ["key", "value"],
        PropertyDefinition: ["key", "value"],
        RestElement: ["argument"],
        ReturnStatement: ["argument"],
        SequenceExpression: ["expressions"],
        SpreadElement: ["argument"],
        Super: [],
        SwitchStatement: ["discriminant", "cases"],
        SwitchCase: ["test", "consequent"],
        TaggedTemplateExpression: ["tag", "quasi"],
        TemplateElement: [],
        TemplateLiteral: ["quasis", "expressions"],
        ThisExpression: [],
        ThrowStatement: ["argument"],
        TryStatement: ["block", "handler", "finalizer"],
        UnaryExpression: ["argument"],
        UpdateExpression: ["argument"],
        VariableDeclaration: ["declarations"],
        VariableDeclarator: ["id", "init"],
        WhileStatement: ["test", "body"],
        WithStatement: ["object", "body"],
        YieldExpression: ["argument"]
      }, a = {}, u = {}, o = {}, i = {
        Break: a,
        Skip: u,
        Remove: o
      };
      function p(X, Z) {
        this.parent = X, this.key = Z;
      }
      p.prototype.replace = function(Z) {
        this.parent[this.key] = Z;
      }, p.prototype.remove = function() {
        return Array.isArray(this.parent) ? (this.parent.splice(this.key, 1), true) : (this.replace(null), false);
      };
      function m(X, Z, L, R) {
        this.node = X, this.path = Z, this.wrap = L, this.ref = R;
      }
      function g() {
      }
      g.prototype.path = function() {
        var Z, L, R, H, z, $;
        function I(Y, ee) {
          if (Array.isArray(ee))
            for (R = 0, H = ee.length; R < H; ++R)
              Y.push(ee[R]);
          else
            Y.push(ee);
        }
        if (!this.__current.path)
          return null;
        for (z = [], Z = 2, L = this.__leavelist.length; Z < L; ++Z)
          $ = this.__leavelist[Z], I(z, $.path);
        return I(z, this.__current.path), z;
      }, g.prototype.type = function() {
        var X = this.current();
        return X.type || this.__current.wrap;
      }, g.prototype.parents = function() {
        var Z, L, R;
        for (R = [], Z = 1, L = this.__leavelist.length; Z < L; ++Z)
          R.push(this.__leavelist[Z].node);
        return R;
      }, g.prototype.current = function() {
        return this.__current.node;
      }, g.prototype.__execute = function(Z, L) {
        var R, H;
        return H = void 0, R = this.__current, this.__current = L, this.__state = null, Z && (H = Z.call(this, L.node, this.__leavelist[this.__leavelist.length - 1].node)), this.__current = R, H;
      }, g.prototype.notify = function(Z) {
        this.__state = Z;
      }, g.prototype.skip = function() {
        this.notify(u);
      }, g.prototype.break = function() {
        this.notify(a);
      }, g.prototype.remove = function() {
        this.notify(o);
      }, g.prototype.__initialize = function(X, Z) {
        this.visitor = Z, this.root = X, this.__worklist = [], this.__leavelist = [], this.__current = null, this.__state = null, this.__fallback = null, Z.fallback === "iteration" ? this.__fallback = Object.keys : typeof Z.fallback == "function" && (this.__fallback = Z.fallback), this.__keys = r, Z.keys && (this.__keys = Object.assign(Object.create(this.__keys), Z.keys));
      };
      function y(X) {
        return X == null ? false : typeof X == "object" && typeof X.type == "string";
      }
      function x(X, Z) {
        return (X === s.ObjectExpression || X === s.ObjectPattern) && Z === "properties";
      }
      function v(X, Z) {
        for (var L = X.length - 1; L >= 0; --L)
          if (X[L].node === Z)
            return true;
        return false;
      }
      g.prototype.traverse = function(Z, L) {
        var R, H, z, $, I, Y, ee, Me, re, de, se, Ie;
        for (this.__initialize(Z, L), Ie = {}, R = this.__worklist, H = this.__leavelist, R.push(new m(Z, null, null, null)), H.push(new m(null, null, null, null)); R.length; ) {
          if (z = R.pop(), z === Ie) {
            if (z = H.pop(), Y = this.__execute(L.leave, z), this.__state === a || Y === a)
              return;
            continue;
          }
          if (z.node) {
            if (Y = this.__execute(L.enter, z), this.__state === a || Y === a)
              return;
            if (R.push(Ie), H.push(z), this.__state === u || Y === u)
              continue;
            if ($ = z.node, I = $.type || z.wrap, de = this.__keys[I], !de)
              if (this.__fallback)
                de = this.__fallback($);
              else
                throw new Error("Unknown node type " + I + ".");
            for (Me = de.length; (Me -= 1) >= 0; )
              if (ee = de[Me], se = $[ee], !!se) {
                if (Array.isArray(se)) {
                  for (re = se.length; (re -= 1) >= 0; )
                    if (se[re] && !v(H, se[re])) {
                      if (x(I, de[Me]))
                        z = new m(se[re], [ee, re], "Property", null);
                      else if (y(se[re]))
                        z = new m(se[re], [ee, re], null, null);
                      else
                        continue;
                      R.push(z);
                    }
                } else if (y(se)) {
                  if (v(H, se))
                    continue;
                  R.push(new m(se, ee, null, null));
                }
              }
          }
        }
      }, g.prototype.replace = function(Z, L) {
        var R, H, z, $, I, Y, ee, Me, re, de, se, Ie, rt;
        function dt(O) {
          var at, he, Ge, Ce;
          if (O.ref.remove()) {
            for (he = O.ref.key, Ce = O.ref.parent, at = R.length; at--; )
              if (Ge = R[at], Ge.ref && Ge.ref.parent === Ce) {
                if (Ge.ref.key < he)
                  break;
                --Ge.ref.key;
              }
          }
        }
        for (this.__initialize(Z, L), se = {}, R = this.__worklist, H = this.__leavelist, Ie = {
          root: Z
        }, Y = new m(Z, null, null, new p(Ie, "root")), R.push(Y), H.push(Y); R.length; ) {
          if (Y = R.pop(), Y === se) {
            if (Y = H.pop(), I = this.__execute(L.leave, Y), I !== void 0 && I !== a && I !== u && I !== o && Y.ref.replace(I), (this.__state === o || I === o) && dt(Y), this.__state === a || I === a)
              return Ie.root;
            continue;
          }
          if (I = this.__execute(L.enter, Y), I !== void 0 && I !== a && I !== u && I !== o && (Y.ref.replace(I), Y.node = I), (this.__state === o || I === o) && (dt(Y), Y.node = null), this.__state === a || I === a)
            return Ie.root;
          if (z = Y.node, !!z && (R.push(se), H.push(Y), !(this.__state === u || I === u))) {
            if ($ = z.type || Y.wrap, re = this.__keys[$], !re)
              if (this.__fallback)
                re = this.__fallback(z);
              else
                throw new Error("Unknown node type " + $ + ".");
            for (ee = re.length; (ee -= 1) >= 0; )
              if (rt = re[ee], de = z[rt], !!de)
                if (Array.isArray(de)) {
                  for (Me = de.length; (Me -= 1) >= 0; )
                    if (de[Me]) {
                      if (x($, re[ee]))
                        Y = new m(de[Me], [rt, Me], "Property", new p(de, Me));
                      else if (y(de[Me]))
                        Y = new m(de[Me], [rt, Me], null, new p(de, Me));
                      else
                        continue;
                      R.push(Y);
                    }
                } else y(de) && R.push(new m(de, rt, null, new p(z, rt)));
          }
        }
        return Ie.root;
      };
      function E(X, Z) {
        var L = new g();
        return L.traverse(X, Z);
      }
      function w(X, Z) {
        var L = new g();
        return L.replace(X, Z);
      }
      function V(X, Z) {
        var L;
        return L = l(Z, function(H) {
          return H.range[0] > X.range[0];
        }), X.extendedRange = [X.range[0], X.range[1]], L !== Z.length && (X.extendedRange[1] = Z[L].range[0]), L -= 1, L >= 0 && (X.extendedRange[0] = Z[L].range[1]), X;
      }
      function D(X, Z, L) {
        var R = [], H, z, $, I;
        if (!X.range)
          throw new Error("attachComments needs range information");
        if (!L.length) {
          if (Z.length) {
            for ($ = 0, z = Z.length; $ < z; $ += 1)
              H = c(Z[$]), H.extendedRange = [0, X.range[0]], R.push(H);
            X.leadingComments = R;
          }
          return X;
        }
        for ($ = 0, z = Z.length; $ < z; $ += 1)
          R.push(V(c(Z[$]), L));
        return I = 0, E(X, {
          enter: function(Y) {
            for (var ee; I < R.length && (ee = R[I], !(ee.extendedRange[1] > Y.range[0])); )
              ee.extendedRange[1] === Y.range[0] ? (Y.leadingComments || (Y.leadingComments = []), Y.leadingComments.push(ee), R.splice(I, 1)) : I += 1;
            if (I === R.length)
              return i.Break;
            if (R[I].extendedRange[0] > Y.range[1])
              return i.Skip;
          }
        }), I = 0, E(X, {
          leave: function(Y) {
            for (var ee; I < R.length && (ee = R[I], !(Y.range[1] < ee.extendedRange[0])); )
              Y.range[1] === ee.extendedRange[0] ? (Y.trailingComments || (Y.trailingComments = []), Y.trailingComments.push(ee), R.splice(I, 1)) : I += 1;
            if (I === R.length)
              return i.Break;
            if (R[I].extendedRange[0] > Y.range[1])
              return i.Skip;
          }
        }), X;
      }
      return n.Syntax = s, n.traverse = E, n.replace = w, n.attachComments = D, n.VisitorKeys = r, n.VisitorOption = i, n.Controller = g, n.cloneEnvironment = function() {
        return t({});
      }, n;
    })(e);
  }(ya)), ya;
}
var ri = {}, ga = { exports: {} }, _c;
function vZ() {
  return _c || (_c = 1, function() {
    function e(a) {
      if (a == null)
        return false;
      switch (a.type) {
        case "ArrayExpression":
        case "AssignmentExpression":
        case "BinaryExpression":
        case "CallExpression":
        case "ConditionalExpression":
        case "FunctionExpression":
        case "Identifier":
        case "Literal":
        case "LogicalExpression":
        case "MemberExpression":
        case "NewExpression":
        case "ObjectExpression":
        case "SequenceExpression":
        case "ThisExpression":
        case "UnaryExpression":
        case "UpdateExpression":
          return true;
      }
      return false;
    }
    function t(a) {
      if (a == null)
        return false;
      switch (a.type) {
        case "DoWhileStatement":
        case "ForInStatement":
        case "ForStatement":
        case "WhileStatement":
          return true;
      }
      return false;
    }
    function n(a) {
      if (a == null)
        return false;
      switch (a.type) {
        case "BlockStatement":
        case "BreakStatement":
        case "ContinueStatement":
        case "DebuggerStatement":
        case "DoWhileStatement":
        case "EmptyStatement":
        case "ExpressionStatement":
        case "ForInStatement":
        case "ForStatement":
        case "IfStatement":
        case "LabeledStatement":
        case "ReturnStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "TryStatement":
        case "VariableDeclaration":
        case "WhileStatement":
        case "WithStatement":
          return true;
      }
      return false;
    }
    function s(a) {
      return n(a) || a != null && a.type === "FunctionDeclaration";
    }
    function i(a) {
      switch (a.type) {
        case "IfStatement":
          return a.alternate != null ? a.alternate : a.consequent;
        case "LabeledStatement":
        case "ForStatement":
        case "ForInStatement":
        case "WhileStatement":
        case "WithStatement":
          return a.body;
      }
      return null;
    }
    function r(a) {
      var u;
      if (a.type !== "IfStatement" || a.alternate == null)
        return false;
      u = a.consequent;
      do {
        if (u.type === "IfStatement" && u.alternate == null)
          return true;
        u = i(u);
      } while (u);
      return false;
    }
    ga.exports = {
      isExpression: e,
      isStatement: n,
      isIterationStatement: t,
      isSourceElement: s,
      isProblematicIfStatement: r,
      trailingStatement: i
    };
  }()), ga.exports;
}
var ba = { exports: {} }, Yc;
function g3() {
  return Yc || (Yc = 1, function() {
    var e, t, n, s, i, r;
    t = {
      // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
      NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
      // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
      NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    }, e = {
      // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
      NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
      // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
      NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };
    function a(v) {
      return 48 <= v && v <= 57;
    }
    function u(v) {
      return 48 <= v && v <= 57 || // 0..9
      97 <= v && v <= 102 || // a..f
      65 <= v && v <= 70;
    }
    function o(v) {
      return v >= 48 && v <= 55;
    }
    n = [
      5760,
      8192,
      8193,
      8194,
      8195,
      8196,
      8197,
      8198,
      8199,
      8200,
      8201,
      8202,
      8239,
      8287,
      12288,
      65279
    ];
    function c(v) {
      return v === 32 || v === 9 || v === 11 || v === 12 || v === 160 || v >= 5760 && n.indexOf(v) >= 0;
    }
    function l(v) {
      return v === 10 || v === 13 || v === 8232 || v === 8233;
    }
    function p(v) {
      if (v <= 65535)
        return String.fromCharCode(v);
      var E = String.fromCharCode(Math.floor((v - 65536) / 1024) + 55296), w = String.fromCharCode((v - 65536) % 1024 + 56320);
      return E + w;
    }
    for (s = new Array(128), r = 0; r < 128; ++r)
      s[r] = r >= 97 && r <= 122 || // a..z
      r >= 65 && r <= 90 || // A..Z
      r === 36 || r === 95;
    for (i = new Array(128), r = 0; r < 128; ++r)
      i[r] = r >= 97 && r <= 122 || // a..z
      r >= 65 && r <= 90 || // A..Z
      r >= 48 && r <= 57 || // 0..9
      r === 36 || r === 95;
    function m(v) {
      return v < 128 ? s[v] : t.NonAsciiIdentifierStart.test(p(v));
    }
    function g(v) {
      return v < 128 ? i[v] : t.NonAsciiIdentifierPart.test(p(v));
    }
    function y(v) {
      return v < 128 ? s[v] : e.NonAsciiIdentifierStart.test(p(v));
    }
    function x(v) {
      return v < 128 ? i[v] : e.NonAsciiIdentifierPart.test(p(v));
    }
    ba.exports = {
      isDecimalDigit: a,
      isHexDigit: u,
      isOctalDigit: o,
      isWhiteSpace: c,
      isLineTerminator: l,
      isIdentifierStartES5: m,
      isIdentifierPartES5: g,
      isIdentifierStartES6: y,
      isIdentifierPartES6: x
    };
  }()), ba.exports;
}
var Ma = { exports: {} }, Hc;
function PZ() {
  return Hc || (Hc = 1, function() {
    var e = g3();
    function t(m) {
      switch (m) {
        case "implements":
        case "interface":
        case "package":
        case "private":
        case "protected":
        case "public":
        case "static":
        case "let":
          return true;
        default:
          return false;
      }
    }
    function n(m, g) {
      return !g && m === "yield" ? false : s(m, g);
    }
    function s(m, g) {
      if (g && t(m))
        return true;
      switch (m.length) {
        case 2:
          return m === "if" || m === "in" || m === "do";
        case 3:
          return m === "var" || m === "for" || m === "new" || m === "try";
        case 4:
          return m === "this" || m === "else" || m === "case" || m === "void" || m === "with" || m === "enum";
        case 5:
          return m === "while" || m === "break" || m === "catch" || m === "throw" || m === "const" || m === "yield" || m === "class" || m === "super";
        case 6:
          return m === "return" || m === "typeof" || m === "delete" || m === "switch" || m === "export" || m === "import";
        case 7:
          return m === "default" || m === "finally" || m === "extends";
        case 8:
          return m === "function" || m === "continue" || m === "debugger";
        case 10:
          return m === "instanceof";
        default:
          return false;
      }
    }
    function i(m, g) {
      return m === "null" || m === "true" || m === "false" || n(m, g);
    }
    function r(m, g) {
      return m === "null" || m === "true" || m === "false" || s(m, g);
    }
    function a(m) {
      return m === "eval" || m === "arguments";
    }
    function u(m) {
      var g, y, x;
      if (m.length === 0 || (x = m.charCodeAt(0), !e.isIdentifierStartES5(x)))
        return false;
      for (g = 1, y = m.length; g < y; ++g)
        if (x = m.charCodeAt(g), !e.isIdentifierPartES5(x))
          return false;
      return true;
    }
    function o(m, g) {
      return (m - 55296) * 1024 + (g - 56320) + 65536;
    }
    function c(m) {
      var g, y, x, v, E;
      if (m.length === 0)
        return false;
      for (E = e.isIdentifierStartES6, g = 0, y = m.length; g < y; ++g) {
        if (x = m.charCodeAt(g), 55296 <= x && x <= 56319) {
          if (++g, g >= y || (v = m.charCodeAt(g), !(56320 <= v && v <= 57343)))
            return false;
          x = o(x, v);
        }
        if (!E(x))
          return false;
        E = e.isIdentifierPartES6;
      }
      return true;
    }
    function l(m, g) {
      return u(m) && !i(m, g);
    }
    function p(m, g) {
      return c(m) && !r(m, g);
    }
    Ma.exports = {
      isKeywordES5: n,
      isKeywordES6: s,
      isReservedWordES5: i,
      isReservedWordES6: r,
      isRestrictedWord: a,
      isIdentifierNameES5: u,
      isIdentifierNameES6: c,
      isIdentifierES5: l,
      isIdentifierES6: p
    };
  }()), Ma.exports;
}
var Kc;
function AZ() {
  return Kc || (Kc = 1, function() {
    ri.ast = vZ(), ri.code = g3(), ri.keyword = PZ();
  }()), ri;
}
var ai = {}, Ca = {}, qi = {}, $i = {}, jc;
function FZ() {
  if (jc) return $i;
  jc = 1;
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return $i.encode = function(t) {
    if (0 <= t && t < e.length)
      return e[t];
    throw new TypeError("Must be between 0 and 63: " + t);
  }, $i.decode = function(t) {
    var n = 65, s = 90, i = 97, r = 122, a = 48, u = 57, o = 43, c = 47, l = 26, p = 52;
    return n <= t && t <= s ? t - n : i <= t && t <= r ? t - i + l : a <= t && t <= u ? t - a + p : t == o ? 62 : t == c ? 63 : -1;
  }, $i;
}
var Uc;
function b3() {
  if (Uc) return qi;
  Uc = 1;
  var e = FZ(), t = 5, n = 1 << t, s = n - 1, i = n;
  function r(u) {
    return u < 0 ? (-u << 1) + 1 : (u << 1) + 0;
  }
  function a(u) {
    var o = (u & 1) === 1, c = u >> 1;
    return o ? -c : c;
  }
  return qi.encode = function(o) {
    var c = "", l, p = r(o);
    do
      l = p & s, p >>>= t, p > 0 && (l |= i), c += e.encode(l);
    while (p > 0);
    return c;
  }, qi.decode = function(o, c, l) {
    var p = o.length, m = 0, g = 0, y, x;
    do {
      if (c >= p)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (x = e.decode(o.charCodeAt(c++)), x === -1)
        throw new Error("Invalid base64 digit: " + o.charAt(c - 1));
      y = !!(x & i), x &= s, m = m + (x << g), g += t;
    } while (y);
    l.value = a(m), l.rest = c;
  }, qi;
}
var xa = {}, Oc;
function ki() {
  return Oc || (Oc = 1, function(e) {
    function t(D, X, Z) {
      if (X in D)
        return D[X];
      if (arguments.length === 3)
        return Z;
      throw new Error('"' + X + '" is a required argument.');
    }
    e.getArg = t;
    var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, s = /^data:.+\,.+$/;
    function i(D) {
      var X = D.match(n);
      return X ? {
        scheme: X[1],
        auth: X[2],
        host: X[3],
        port: X[4],
        path: X[5]
      } : null;
    }
    e.urlParse = i;
    function r(D) {
      var X = "";
      return D.scheme && (X += D.scheme + ":"), X += "//", D.auth && (X += D.auth + "@"), D.host && (X += D.host), D.port && (X += ":" + D.port), D.path && (X += D.path), X;
    }
    e.urlGenerate = r;
    function a(D) {
      var X = D, Z = i(D);
      if (Z) {
        if (!Z.path)
          return D;
        X = Z.path;
      }
      for (var L = e.isAbsolute(X), R = X.split(/\/+/), H, z = 0, $ = R.length - 1; $ >= 0; $--)
        H = R[$], H === "." ? R.splice($, 1) : H === ".." ? z++ : z > 0 && (H === "" ? (R.splice($ + 1, z), z = 0) : (R.splice($, 2), z--));
      return X = R.join("/"), X === "" && (X = L ? "/" : "."), Z ? (Z.path = X, r(Z)) : X;
    }
    e.normalize = a;
    function u(D, X) {
      D === "" && (D = "."), X === "" && (X = ".");
      var Z = i(X), L = i(D);
      if (L && (D = L.path || "/"), Z && !Z.scheme)
        return L && (Z.scheme = L.scheme), r(Z);
      if (Z || X.match(s))
        return X;
      if (L && !L.host && !L.path)
        return L.host = X, r(L);
      var R = X.charAt(0) === "/" ? X : a(D.replace(/\/+$/, "") + "/" + X);
      return L ? (L.path = R, r(L)) : R;
    }
    e.join = u, e.isAbsolute = function(D) {
      return D.charAt(0) === "/" || n.test(D);
    };
    function o(D, X) {
      D === "" && (D = "."), D = D.replace(/\/$/, "");
      for (var Z = 0; X.indexOf(D + "/") !== 0; ) {
        var L = D.lastIndexOf("/");
        if (L < 0 || (D = D.slice(0, L), D.match(/^([^\/]+:\/)?\/*$/)))
          return X;
        ++Z;
      }
      return Array(Z + 1).join("../") + X.substr(D.length + 1);
    }
    e.relative = o;
    var c = function() {
      var D = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in D);
    }();
    function l(D) {
      return D;
    }
    function p(D) {
      return g(D) ? "$" + D : D;
    }
    e.toSetString = c ? l : p;
    function m(D) {
      return g(D) ? D.slice(1) : D;
    }
    e.fromSetString = c ? l : m;
    function g(D) {
      if (!D)
        return false;
      var X = D.length;
      if (X < 9 || D.charCodeAt(X - 1) !== 95 || D.charCodeAt(X - 2) !== 95 || D.charCodeAt(X - 3) !== 111 || D.charCodeAt(X - 4) !== 116 || D.charCodeAt(X - 5) !== 111 || D.charCodeAt(X - 6) !== 114 || D.charCodeAt(X - 7) !== 112 || D.charCodeAt(X - 8) !== 95 || D.charCodeAt(X - 9) !== 95)
        return false;
      for (var Z = X - 10; Z >= 0; Z--)
        if (D.charCodeAt(Z) !== 36)
          return false;
      return true;
    }
    function y(D, X, Z) {
      var L = v(D.source, X.source);
      return L !== 0 || (L = D.originalLine - X.originalLine, L !== 0) || (L = D.originalColumn - X.originalColumn, L !== 0 || Z) || (L = D.generatedColumn - X.generatedColumn, L !== 0) || (L = D.generatedLine - X.generatedLine, L !== 0) ? L : v(D.name, X.name);
    }
    e.compareByOriginalPositions = y;
    function x(D, X, Z) {
      var L = D.generatedLine - X.generatedLine;
      return L !== 0 || (L = D.generatedColumn - X.generatedColumn, L !== 0 || Z) || (L = v(D.source, X.source), L !== 0) || (L = D.originalLine - X.originalLine, L !== 0) || (L = D.originalColumn - X.originalColumn, L !== 0) ? L : v(D.name, X.name);
    }
    e.compareByGeneratedPositionsDeflated = x;
    function v(D, X) {
      return D === X ? 0 : D === null ? 1 : X === null ? -1 : D > X ? 1 : -1;
    }
    function E(D, X) {
      var Z = D.generatedLine - X.generatedLine;
      return Z !== 0 || (Z = D.generatedColumn - X.generatedColumn, Z !== 0) || (Z = v(D.source, X.source), Z !== 0) || (Z = D.originalLine - X.originalLine, Z !== 0) || (Z = D.originalColumn - X.originalColumn, Z !== 0) ? Z : v(D.name, X.name);
    }
    e.compareByGeneratedPositionsInflated = E;
    function w(D) {
      return JSON.parse(D.replace(/^\)]}'[^\n]*\n/, ""));
    }
    e.parseSourceMapInput = w;
    function V(D, X, Z) {
      if (X = X || "", D && (D[D.length - 1] !== "/" && X[0] !== "/" && (D += "/"), X = D + X), Z) {
        var L = i(Z);
        if (!L)
          throw new Error("sourceMapURL could not be parsed");
        if (L.path) {
          var R = L.path.lastIndexOf("/");
          R >= 0 && (L.path = L.path.substring(0, R + 1));
        }
        X = u(r(L), X);
      }
      return a(X);
    }
    e.computeSourceURL = V;
  }(xa)), xa;
}
var Ga = {}, Jc;
function M3() {
  if (Jc) return Ga;
  Jc = 1;
  var e = ki(), t = Object.prototype.hasOwnProperty, n = typeof Map < "u";
  function s() {
    this._array = [], this._set = n ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return s.fromArray = function(r, a) {
    for (var u = new s(), o = 0, c = r.length; o < c; o++)
      u.add(r[o], a);
    return u;
  }, s.prototype.size = function() {
    return n ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, s.prototype.add = function(r, a) {
    var u = n ? r : e.toSetString(r), o = n ? this.has(r) : t.call(this._set, u), c = this._array.length;
    (!o || a) && this._array.push(r), o || (n ? this._set.set(r, c) : this._set[u] = c);
  }, s.prototype.has = function(r) {
    if (n)
      return this._set.has(r);
    var a = e.toSetString(r);
    return t.call(this._set, a);
  }, s.prototype.indexOf = function(r) {
    if (n) {
      var a = this._set.get(r);
      if (a >= 0)
        return a;
    } else {
      var u = e.toSetString(r);
      if (t.call(this._set, u))
        return this._set[u];
    }
    throw new Error('"' + r + '" is not in the set.');
  }, s.prototype.at = function(r) {
    if (r >= 0 && r < this._array.length)
      return this._array[r];
    throw new Error("No element indexed by " + r);
  }, s.prototype.toArray = function() {
    return this._array.slice();
  }, Ga.ArraySet = s, Ga;
}
var va = {}, Qc;
function XZ() {
  if (Qc) return va;
  Qc = 1;
  var e = ki();
  function t(s, i) {
    var r = s.generatedLine, a = i.generatedLine, u = s.generatedColumn, o = i.generatedColumn;
    return a > r || a == r && o >= u || e.compareByGeneratedPositionsInflated(s, i) <= 0;
  }
  function n() {
    this._array = [], this._sorted = true, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return n.prototype.unsortedForEach = function(i, r) {
    this._array.forEach(i, r);
  }, n.prototype.add = function(i) {
    t(this._last, i) ? (this._last = i, this._array.push(i)) : (this._sorted = false, this._array.push(i));
  }, n.prototype.toArray = function() {
    return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = true), this._array;
  }, va.MappingList = n, va;
}
var qc;
function C3() {
  if (qc) return Ca;
  qc = 1;
  var e = b3(), t = ki(), n = M3().ArraySet, s = XZ().MappingList;
  function i(r) {
    r || (r = {}), this._file = t.getArg(r, "file", null), this._sourceRoot = t.getArg(r, "sourceRoot", null), this._skipValidation = t.getArg(r, "skipValidation", false), this._sources = new n(), this._names = new n(), this._mappings = new s(), this._sourcesContents = null;
  }
  return i.prototype._version = 3, i.fromSourceMap = function(a) {
    var u = a.sourceRoot, o = new i({
      file: a.file,
      sourceRoot: u
    });
    return a.eachMapping(function(c) {
      var l = {
        generated: {
          line: c.generatedLine,
          column: c.generatedColumn
        }
      };
      c.source != null && (l.source = c.source, u != null && (l.source = t.relative(u, l.source)), l.original = {
        line: c.originalLine,
        column: c.originalColumn
      }, c.name != null && (l.name = c.name)), o.addMapping(l);
    }), a.sources.forEach(function(c) {
      var l = c;
      u !== null && (l = t.relative(u, c)), o._sources.has(l) || o._sources.add(l);
      var p = a.sourceContentFor(c);
      p != null && o.setSourceContent(c, p);
    }), o;
  }, i.prototype.addMapping = function(a) {
    var u = t.getArg(a, "generated"), o = t.getArg(a, "original", null), c = t.getArg(a, "source", null), l = t.getArg(a, "name", null);
    this._skipValidation || this._validateMapping(u, o, c, l), c != null && (c = String(c), this._sources.has(c) || this._sources.add(c)), l != null && (l = String(l), this._names.has(l) || this._names.add(l)), this._mappings.add({
      generatedLine: u.line,
      generatedColumn: u.column,
      originalLine: o != null && o.line,
      originalColumn: o != null && o.column,
      source: c,
      name: l
    });
  }, i.prototype.setSourceContent = function(a, u) {
    var o = a;
    this._sourceRoot != null && (o = t.relative(this._sourceRoot, o)), u != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[t.toSetString(o)] = u) : this._sourcesContents && (delete this._sourcesContents[t.toSetString(o)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, i.prototype.applySourceMap = function(a, u, o) {
    var c = u;
    if (u == null) {
      if (a.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      c = a.file;
    }
    var l = this._sourceRoot;
    l != null && (c = t.relative(l, c));
    var p = new n(), m = new n();
    this._mappings.unsortedForEach(function(g) {
      if (g.source === c && g.originalLine != null) {
        var y = a.originalPositionFor({
          line: g.originalLine,
          column: g.originalColumn
        });
        y.source != null && (g.source = y.source, o != null && (g.source = t.join(o, g.source)), l != null && (g.source = t.relative(l, g.source)), g.originalLine = y.line, g.originalColumn = y.column, y.name != null && (g.name = y.name));
      }
      var x = g.source;
      x != null && !p.has(x) && p.add(x);
      var v = g.name;
      v != null && !m.has(v) && m.add(v);
    }, this), this._sources = p, this._names = m, a.sources.forEach(function(g) {
      var y = a.sourceContentFor(g);
      y != null && (o != null && (g = t.join(o, g)), l != null && (g = t.relative(l, g)), this.setSourceContent(g, y));
    }, this);
  }, i.prototype._validateMapping = function(a, u, o, c) {
    if (u && typeof u.line != "number" && typeof u.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (!(a && "line" in a && "column" in a && a.line > 0 && a.column >= 0 && !u && !o && !c)) {
      if (a && "line" in a && "column" in a && u && "line" in u && "column" in u && a.line > 0 && a.column >= 0 && u.line > 0 && u.column >= 0 && o)
        return;
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: a,
        source: o,
        original: u,
        name: c
      }));
    }
  }, i.prototype._serializeMappings = function() {
    for (var a = 0, u = 1, o = 0, c = 0, l = 0, p = 0, m = "", g, y, x, v, E = this._mappings.toArray(), w = 0, V = E.length; w < V; w++) {
      if (y = E[w], g = "", y.generatedLine !== u)
        for (a = 0; y.generatedLine !== u; )
          g += ";", u++;
      else if (w > 0) {
        if (!t.compareByGeneratedPositionsInflated(y, E[w - 1]))
          continue;
        g += ",";
      }
      g += e.encode(y.generatedColumn - a), a = y.generatedColumn, y.source != null && (v = this._sources.indexOf(y.source), g += e.encode(v - p), p = v, g += e.encode(y.originalLine - 1 - c), c = y.originalLine - 1, g += e.encode(y.originalColumn - o), o = y.originalColumn, y.name != null && (x = this._names.indexOf(y.name), g += e.encode(x - l), l = x)), m += g;
    }
    return m;
  }, i.prototype._generateSourcesContent = function(a, u) {
    return a.map(function(o) {
      if (!this._sourcesContents)
        return null;
      u != null && (o = t.relative(u, o));
      var c = t.toSetString(o);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, c) ? this._sourcesContents[c] : null;
    }, this);
  }, i.prototype.toJSON = function() {
    var a = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (a.file = this._file), this._sourceRoot != null && (a.sourceRoot = this._sourceRoot), this._sourcesContents && (a.sourcesContent = this._generateSourcesContent(a.sources, a.sourceRoot)), a;
  }, i.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, Ca.SourceMapGenerator = i, Ca;
}
var ui = {}, Pa = {}, $c;
function DZ() {
  return $c || ($c = 1, function(e) {
    e.GREATEST_LOWER_BOUND = 1, e.LEAST_UPPER_BOUND = 2;
    function t(n, s, i, r, a, u) {
      var o = Math.floor((s - n) / 2) + n, c = a(i, r[o], true);
      return c === 0 ? o : c > 0 ? s - o > 1 ? t(o, s, i, r, a, u) : u == e.LEAST_UPPER_BOUND ? s < r.length ? s : -1 : o : o - n > 1 ? t(n, o, i, r, a, u) : u == e.LEAST_UPPER_BOUND ? o : n < 0 ? -1 : n;
    }
    e.search = function(s, i, r, a) {
      if (i.length === 0)
        return -1;
      var u = t(
        -1,
        i.length,
        s,
        i,
        r,
        a || e.GREATEST_LOWER_BOUND
      );
      if (u < 0)
        return -1;
      for (; u - 1 >= 0 && r(i[u], i[u - 1], true) === 0; )
        --u;
      return u;
    };
  }(Pa)), Pa;
}
var Aa = {}, el;
function SZ() {
  if (el) return Aa;
  el = 1;
  function e(s, i, r) {
    var a = s[i];
    s[i] = s[r], s[r] = a;
  }
  function t(s, i) {
    return Math.round(s + Math.random() * (i - s));
  }
  function n(s, i, r, a) {
    if (r < a) {
      var u = t(r, a), o = r - 1;
      e(s, u, a);
      for (var c = s[a], l = r; l < a; l++)
        i(s[l], c) <= 0 && (o += 1, e(s, o, l));
      e(s, o + 1, l);
      var p = o + 1;
      n(s, i, r, p - 1), n(s, i, p + 1, a);
    }
  }
  return Aa.quickSort = function(s, i) {
    n(s, i, 0, s.length - 1);
  }, Aa;
}
var tl;
function wZ() {
  if (tl) return ui;
  tl = 1;
  var e = ki(), t = DZ(), n = M3().ArraySet, s = b3(), i = SZ().quickSort;
  function r(c, l) {
    var p = c;
    return typeof c == "string" && (p = e.parseSourceMapInput(c)), p.sections != null ? new o(p, l) : new a(p, l);
  }
  r.fromSourceMap = function(c, l) {
    return a.fromSourceMap(c, l);
  }, r.prototype._version = 3, r.prototype.__generatedMappings = null, Object.defineProperty(r.prototype, "_generatedMappings", {
    configurable: true,
    enumerable: true,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
    }
  }), r.prototype.__originalMappings = null, Object.defineProperty(r.prototype, "_originalMappings", {
    configurable: true,
    enumerable: true,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
    }
  }), r.prototype._charIsMappingSeparator = function(l, p) {
    var m = l.charAt(p);
    return m === ";" || m === ",";
  }, r.prototype._parseMappings = function(l, p) {
    throw new Error("Subclasses must implement _parseMappings");
  }, r.GENERATED_ORDER = 1, r.ORIGINAL_ORDER = 2, r.GREATEST_LOWER_BOUND = 1, r.LEAST_UPPER_BOUND = 2, r.prototype.eachMapping = function(l, p, m) {
    var g = p || null, y = m || r.GENERATED_ORDER, x;
    switch (y) {
      case r.GENERATED_ORDER:
        x = this._generatedMappings;
        break;
      case r.ORIGINAL_ORDER:
        x = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var v = this.sourceRoot;
    x.map(function(E) {
      var w = E.source === null ? null : this._sources.at(E.source);
      return w = e.computeSourceURL(v, w, this._sourceMapURL), {
        source: w,
        generatedLine: E.generatedLine,
        generatedColumn: E.generatedColumn,
        originalLine: E.originalLine,
        originalColumn: E.originalColumn,
        name: E.name === null ? null : this._names.at(E.name)
      };
    }, this).forEach(l, g);
  }, r.prototype.allGeneratedPositionsFor = function(l) {
    var p = e.getArg(l, "line"), m = {
      source: e.getArg(l, "source"),
      originalLine: p,
      originalColumn: e.getArg(l, "column", 0)
    };
    if (m.source = this._findSourceIndex(m.source), m.source < 0)
      return [];
    var g = [], y = this._findMapping(
      m,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      t.LEAST_UPPER_BOUND
    );
    if (y >= 0) {
      var x = this._originalMappings[y];
      if (l.column === void 0)
        for (var v = x.originalLine; x && x.originalLine === v; )
          g.push({
            line: e.getArg(x, "generatedLine", null),
            column: e.getArg(x, "generatedColumn", null),
            lastColumn: e.getArg(x, "lastGeneratedColumn", null)
          }), x = this._originalMappings[++y];
      else
        for (var E = x.originalColumn; x && x.originalLine === p && x.originalColumn == E; )
          g.push({
            line: e.getArg(x, "generatedLine", null),
            column: e.getArg(x, "generatedColumn", null),
            lastColumn: e.getArg(x, "lastGeneratedColumn", null)
          }), x = this._originalMappings[++y];
    }
    return g;
  }, ui.SourceMapConsumer = r;
  function a(c, l) {
    var p = c;
    typeof c == "string" && (p = e.parseSourceMapInput(c));
    var m = e.getArg(p, "version"), g = e.getArg(p, "sources"), y = e.getArg(p, "names", []), x = e.getArg(p, "sourceRoot", null), v = e.getArg(p, "sourcesContent", null), E = e.getArg(p, "mappings"), w = e.getArg(p, "file", null);
    if (m != this._version)
      throw new Error("Unsupported version: " + m);
    x && (x = e.normalize(x)), g = g.map(String).map(e.normalize).map(function(V) {
      return x && e.isAbsolute(x) && e.isAbsolute(V) ? e.relative(x, V) : V;
    }), this._names = n.fromArray(y.map(String), true), this._sources = n.fromArray(g, true), this._absoluteSources = this._sources.toArray().map(function(V) {
      return e.computeSourceURL(x, V, l);
    }), this.sourceRoot = x, this.sourcesContent = v, this._mappings = E, this._sourceMapURL = l, this.file = w;
  }
  a.prototype = Object.create(r.prototype), a.prototype.consumer = r, a.prototype._findSourceIndex = function(c) {
    var l = c;
    if (this.sourceRoot != null && (l = e.relative(this.sourceRoot, l)), this._sources.has(l))
      return this._sources.indexOf(l);
    var p;
    for (p = 0; p < this._absoluteSources.length; ++p)
      if (this._absoluteSources[p] == c)
        return p;
    return -1;
  }, a.fromSourceMap = function(l, p) {
    var m = Object.create(a.prototype), g = m._names = n.fromArray(l._names.toArray(), true), y = m._sources = n.fromArray(l._sources.toArray(), true);
    m.sourceRoot = l._sourceRoot, m.sourcesContent = l._generateSourcesContent(
      m._sources.toArray(),
      m.sourceRoot
    ), m.file = l._file, m._sourceMapURL = p, m._absoluteSources = m._sources.toArray().map(function(Z) {
      return e.computeSourceURL(m.sourceRoot, Z, p);
    });
    for (var x = l._mappings.toArray().slice(), v = m.__generatedMappings = [], E = m.__originalMappings = [], w = 0, V = x.length; w < V; w++) {
      var D = x[w], X = new u();
      X.generatedLine = D.generatedLine, X.generatedColumn = D.generatedColumn, D.source && (X.source = y.indexOf(D.source), X.originalLine = D.originalLine, X.originalColumn = D.originalColumn, D.name && (X.name = g.indexOf(D.name)), E.push(X)), v.push(X);
    }
    return i(m.__originalMappings, e.compareByOriginalPositions), m;
  }, a.prototype._version = 3, Object.defineProperty(a.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function u() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  a.prototype._parseMappings = function(l, p) {
    for (var m = 1, g = 0, y = 0, x = 0, v = 0, E = 0, w = l.length, V = 0, D = {}, X = {}, Z = [], L = [], R, H, z, $, I; V < w; )
      if (l.charAt(V) === ";")
        m++, V++, g = 0;
      else if (l.charAt(V) === ",")
        V++;
      else {
        for (R = new u(), R.generatedLine = m, $ = V; $ < w && !this._charIsMappingSeparator(l, $); $++)
          ;
        if (H = l.slice(V, $), z = D[H], z)
          V += H.length;
        else {
          for (z = []; V < $; )
            s.decode(l, V, X), I = X.value, V = X.rest, z.push(I);
          if (z.length === 2)
            throw new Error("Found a source, but no line and column");
          if (z.length === 3)
            throw new Error("Found a source and line, but no column");
          D[H] = z;
        }
        R.generatedColumn = g + z[0], g = R.generatedColumn, z.length > 1 && (R.source = v + z[1], v += z[1], R.originalLine = y + z[2], y = R.originalLine, R.originalLine += 1, R.originalColumn = x + z[3], x = R.originalColumn, z.length > 4 && (R.name = E + z[4], E += z[4])), L.push(R), typeof R.originalLine == "number" && Z.push(R);
      }
    i(L, e.compareByGeneratedPositionsDeflated), this.__generatedMappings = L, i(Z, e.compareByOriginalPositions), this.__originalMappings = Z;
  }, a.prototype._findMapping = function(l, p, m, g, y, x) {
    if (l[m] <= 0)
      throw new TypeError("Line must be greater than or equal to 1, got " + l[m]);
    if (l[g] < 0)
      throw new TypeError("Column must be greater than or equal to 0, got " + l[g]);
    return t.search(l, p, y, x);
  }, a.prototype.computeColumnSpans = function() {
    for (var l = 0; l < this._generatedMappings.length; ++l) {
      var p = this._generatedMappings[l];
      if (l + 1 < this._generatedMappings.length) {
        var m = this._generatedMappings[l + 1];
        if (p.generatedLine === m.generatedLine) {
          p.lastGeneratedColumn = m.generatedColumn - 1;
          continue;
        }
      }
      p.lastGeneratedColumn = 1 / 0;
    }
  }, a.prototype.originalPositionFor = function(l) {
    var p = {
      generatedLine: e.getArg(l, "line"),
      generatedColumn: e.getArg(l, "column")
    }, m = this._findMapping(
      p,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      e.compareByGeneratedPositionsDeflated,
      e.getArg(l, "bias", r.GREATEST_LOWER_BOUND)
    );
    if (m >= 0) {
      var g = this._generatedMappings[m];
      if (g.generatedLine === p.generatedLine) {
        var y = e.getArg(g, "source", null);
        y !== null && (y = this._sources.at(y), y = e.computeSourceURL(this.sourceRoot, y, this._sourceMapURL));
        var x = e.getArg(g, "name", null);
        return x !== null && (x = this._names.at(x)), {
          source: y,
          line: e.getArg(g, "originalLine", null),
          column: e.getArg(g, "originalColumn", null),
          name: x
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, a.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(l) {
      return l == null;
    }) : false;
  }, a.prototype.sourceContentFor = function(l, p) {
    if (!this.sourcesContent)
      return null;
    var m = this._findSourceIndex(l);
    if (m >= 0)
      return this.sourcesContent[m];
    var g = l;
    this.sourceRoot != null && (g = e.relative(this.sourceRoot, g));
    var y;
    if (this.sourceRoot != null && (y = e.urlParse(this.sourceRoot))) {
      var x = g.replace(/^file:\/\//, "");
      if (y.scheme == "file" && this._sources.has(x))
        return this.sourcesContent[this._sources.indexOf(x)];
      if ((!y.path || y.path == "/") && this._sources.has("/" + g))
        return this.sourcesContent[this._sources.indexOf("/" + g)];
    }
    if (p)
      return null;
    throw new Error('"' + g + '" is not in the SourceMap.');
  }, a.prototype.generatedPositionFor = function(l) {
    var p = e.getArg(l, "source");
    if (p = this._findSourceIndex(p), p < 0)
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    var m = {
      source: p,
      originalLine: e.getArg(l, "line"),
      originalColumn: e.getArg(l, "column")
    }, g = this._findMapping(
      m,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      e.getArg(l, "bias", r.GREATEST_LOWER_BOUND)
    );
    if (g >= 0) {
      var y = this._originalMappings[g];
      if (y.source === m.source)
        return {
          line: e.getArg(y, "generatedLine", null),
          column: e.getArg(y, "generatedColumn", null),
          lastColumn: e.getArg(y, "lastGeneratedColumn", null)
        };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, ui.BasicSourceMapConsumer = a;
  function o(c, l) {
    var p = c;
    typeof c == "string" && (p = e.parseSourceMapInput(c));
    var m = e.getArg(p, "version"), g = e.getArg(p, "sections");
    if (m != this._version)
      throw new Error("Unsupported version: " + m);
    this._sources = new n(), this._names = new n();
    var y = {
      line: -1,
      column: 0
    };
    this._sections = g.map(function(x) {
      if (x.url)
        throw new Error("Support for url field in sections not implemented.");
      var v = e.getArg(x, "offset"), E = e.getArg(v, "line"), w = e.getArg(v, "column");
      if (E < y.line || E === y.line && w < y.column)
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return y = v, {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: E + 1,
          generatedColumn: w + 1
        },
        consumer: new r(e.getArg(x, "map"), l)
      };
    });
  }
  return o.prototype = Object.create(r.prototype), o.prototype.constructor = r, o.prototype._version = 3, Object.defineProperty(o.prototype, "sources", {
    get: function() {
      for (var c = [], l = 0; l < this._sections.length; l++)
        for (var p = 0; p < this._sections[l].consumer.sources.length; p++)
          c.push(this._sections[l].consumer.sources[p]);
      return c;
    }
  }), o.prototype.originalPositionFor = function(l) {
    var p = {
      generatedLine: e.getArg(l, "line"),
      generatedColumn: e.getArg(l, "column")
    }, m = t.search(
      p,
      this._sections,
      function(y, x) {
        var v = y.generatedLine - x.generatedOffset.generatedLine;
        return v || y.generatedColumn - x.generatedOffset.generatedColumn;
      }
    ), g = this._sections[m];
    return g ? g.consumer.originalPositionFor({
      line: p.generatedLine - (g.generatedOffset.generatedLine - 1),
      column: p.generatedColumn - (g.generatedOffset.generatedLine === p.generatedLine ? g.generatedOffset.generatedColumn - 1 : 0),
      bias: l.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, o.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(l) {
      return l.consumer.hasContentsOfAllSources();
    });
  }, o.prototype.sourceContentFor = function(l, p) {
    for (var m = 0; m < this._sections.length; m++) {
      var g = this._sections[m], y = g.consumer.sourceContentFor(l, true);
      if (y)
        return y;
    }
    if (p)
      return null;
    throw new Error('"' + l + '" is not in the SourceMap.');
  }, o.prototype.generatedPositionFor = function(l) {
    for (var p = 0; p < this._sections.length; p++) {
      var m = this._sections[p];
      if (m.consumer._findSourceIndex(e.getArg(l, "source")) !== -1) {
        var g = m.consumer.generatedPositionFor(l);
        if (g) {
          var y = {
            line: g.line + (m.generatedOffset.generatedLine - 1),
            column: g.column + (m.generatedOffset.generatedLine === g.line ? m.generatedOffset.generatedColumn - 1 : 0)
          };
          return y;
        }
      }
    }
    return {
      line: null,
      column: null
    };
  }, o.prototype._parseMappings = function(l, p) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var m = 0; m < this._sections.length; m++)
      for (var g = this._sections[m], y = g.consumer._generatedMappings, x = 0; x < y.length; x++) {
        var v = y[x], E = g.consumer._sources.at(v.source);
        E = e.computeSourceURL(g.consumer.sourceRoot, E, this._sourceMapURL), this._sources.add(E), E = this._sources.indexOf(E);
        var w = null;
        v.name && (w = g.consumer._names.at(v.name), this._names.add(w), w = this._names.indexOf(w));
        var V = {
          source: E,
          generatedLine: v.generatedLine + (g.generatedOffset.generatedLine - 1),
          generatedColumn: v.generatedColumn + (g.generatedOffset.generatedLine === v.generatedLine ? g.generatedOffset.generatedColumn - 1 : 0),
          originalLine: v.originalLine,
          originalColumn: v.originalColumn,
          name: w
        };
        this.__generatedMappings.push(V), typeof V.originalLine == "number" && this.__originalMappings.push(V);
      }
    i(this.__generatedMappings, e.compareByGeneratedPositionsDeflated), i(this.__originalMappings, e.compareByOriginalPositions);
  }, ui.IndexedSourceMapConsumer = o, ui;
}
var Fa = {}, nl;
function ZZ() {
  if (nl) return Fa;
  nl = 1;
  var e = C3().SourceMapGenerator, t = ki(), n = /(\r?\n)/, s = 10, i = "$$$isSourceNode$$$";
  function r(a, u, o, c, l) {
    this.children = [], this.sourceContents = {}, this.line = a ?? null, this.column = u ?? null, this.source = o ?? null, this.name = l ?? null, this[i] = true, c != null && this.add(c);
  }
  return r.fromStringWithSourceMap = function(u, o, c) {
    var l = new r(), p = u.split(n), m = 0, g = function() {
      var w = D(), V = D() || "";
      return w + V;
      function D() {
        return m < p.length ? p[m++] : void 0;
      }
    }, y = 1, x = 0, v = null;
    return o.eachMapping(function(w) {
      if (v !== null)
        if (y < w.generatedLine)
          E(v, g()), y++, x = 0;
        else {
          var V = p[m] || "", D = V.substr(0, w.generatedColumn - x);
          p[m] = V.substr(w.generatedColumn - x), x = w.generatedColumn, E(v, D), v = w;
          return;
        }
      for (; y < w.generatedLine; )
        l.add(g()), y++;
      if (x < w.generatedColumn) {
        var V = p[m] || "";
        l.add(V.substr(0, w.generatedColumn)), p[m] = V.substr(w.generatedColumn), x = w.generatedColumn;
      }
      v = w;
    }, this), m < p.length && (v && E(v, g()), l.add(p.splice(m).join(""))), o.sources.forEach(function(w) {
      var V = o.sourceContentFor(w);
      V != null && (c != null && (w = t.join(c, w)), l.setSourceContent(w, V));
    }), l;
    function E(w, V) {
      if (w === null || w.source === void 0)
        l.add(V);
      else {
        var D = c ? t.join(c, w.source) : w.source;
        l.add(new r(
          w.originalLine,
          w.originalColumn,
          D,
          V,
          w.name
        ));
      }
    }
  }, r.prototype.add = function(u) {
    if (Array.isArray(u))
      u.forEach(function(o) {
        this.add(o);
      }, this);
    else if (u[i] || typeof u == "string")
      u && this.children.push(u);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + u
      );
    return this;
  }, r.prototype.prepend = function(u) {
    if (Array.isArray(u))
      for (var o = u.length - 1; o >= 0; o--)
        this.prepend(u[o]);
    else if (u[i] || typeof u == "string")
      this.children.unshift(u);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + u
      );
    return this;
  }, r.prototype.walk = function(u) {
    for (var o, c = 0, l = this.children.length; c < l; c++)
      o = this.children[c], o[i] ? o.walk(u) : o !== "" && u(o, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
  }, r.prototype.join = function(u) {
    var o, c, l = this.children.length;
    if (l > 0) {
      for (o = [], c = 0; c < l - 1; c++)
        o.push(this.children[c]), o.push(u);
      o.push(this.children[c]), this.children = o;
    }
    return this;
  }, r.prototype.replaceRight = function(u, o) {
    var c = this.children[this.children.length - 1];
    return c[i] ? c.replaceRight(u, o) : typeof c == "string" ? this.children[this.children.length - 1] = c.replace(u, o) : this.children.push("".replace(u, o)), this;
  }, r.prototype.setSourceContent = function(u, o) {
    this.sourceContents[t.toSetString(u)] = o;
  }, r.prototype.walkSourceContents = function(u) {
    for (var o = 0, c = this.children.length; o < c; o++)
      this.children[o][i] && this.children[o].walkSourceContents(u);
    for (var l = Object.keys(this.sourceContents), o = 0, c = l.length; o < c; o++)
      u(t.fromSetString(l[o]), this.sourceContents[l[o]]);
  }, r.prototype.toString = function() {
    var u = "";
    return this.walk(function(o) {
      u += o;
    }), u;
  }, r.prototype.toStringWithSourceMap = function(u) {
    var o = {
      code: "",
      line: 1,
      column: 0
    }, c = new e(u), l = false, p = null, m = null, g = null, y = null;
    return this.walk(function(x, v) {
      o.code += x, v.source !== null && v.line !== null && v.column !== null ? ((p !== v.source || m !== v.line || g !== v.column || y !== v.name) && c.addMapping({
        source: v.source,
        original: {
          line: v.line,
          column: v.column
        },
        generated: {
          line: o.line,
          column: o.column
        },
        name: v.name
      }), p = v.source, m = v.line, g = v.column, y = v.name, l = true) : l && (c.addMapping({
        generated: {
          line: o.line,
          column: o.column
        }
      }), p = null, l = false);
      for (var E = 0, w = x.length; E < w; E++)
        x.charCodeAt(E) === s ? (o.line++, o.column = 0, E + 1 === w ? (p = null, l = false) : l && c.addMapping({
          source: v.source,
          original: {
            line: v.line,
            column: v.column
          },
          generated: {
            line: o.line,
            column: o.column
          },
          name: v.name
        })) : o.column++;
    }), this.walkSourceContents(function(x, v) {
      c.setSourceContent(x, v);
    }), { code: o.code, map: c };
  }, Fa.SourceNode = r, Fa;
}
var sl;
function EZ() {
  return sl || (sl = 1, ai.SourceMapGenerator = C3().SourceMapGenerator, ai.SourceMapConsumer = wZ().SourceMapConsumer, ai.SourceNode = ZZ().SourceNode), ai;
}
const NZ = "2.1.0", UZ = {
  version: NZ
};
var il;
function OZ() {
  return il || (il = 1, function(e) {
    (function() {
      var t, n, s, i, r, a, u, o, c, l, p, m, g, y, x, v, E, w, V, D, X, Z, L, R, H, z;
      r = GZ(), a = AZ(), t = r.Syntax;
      function $(d) {
        return we.Expression.hasOwnProperty(d.type);
      }
      function I(d) {
        return we.Statement.hasOwnProperty(d.type);
      }
      n = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        Coalesce: 3,
        LogicalOR: 4,
        LogicalAND: 5,
        BitwiseOR: 6,
        BitwiseXOR: 7,
        BitwiseAND: 8,
        Equality: 9,
        Relational: 10,
        BitwiseSHIFT: 11,
        Additive: 12,
        Multiplicative: 13,
        Exponentiation: 14,
        Await: 15,
        Unary: 15,
        Postfix: 16,
        OptionalChaining: 17,
        Call: 18,
        New: 19,
        TaggedTemplate: 20,
        Member: 21,
        Primary: 22
      }, s = {
        "??": n.Coalesce,
        "||": n.LogicalOR,
        "&&": n.LogicalAND,
        "|": n.BitwiseOR,
        "^": n.BitwiseXOR,
        "&": n.BitwiseAND,
        "==": n.Equality,
        "!=": n.Equality,
        "===": n.Equality,
        "!==": n.Equality,
        is: n.Equality,
        isnt: n.Equality,
        "<": n.Relational,
        ">": n.Relational,
        "<=": n.Relational,
        ">=": n.Relational,
        in: n.Relational,
        instanceof: n.Relational,
        "<<": n.BitwiseSHIFT,
        ">>": n.BitwiseSHIFT,
        ">>>": n.BitwiseSHIFT,
        "+": n.Additive,
        "-": n.Additive,
        "*": n.Multiplicative,
        "%": n.Multiplicative,
        "/": n.Multiplicative,
        "**": n.Exponentiation
      };
      var Y = 1, ee = 2, Me = 4, re = 8, de = 16, se = 32, Ie = 64, rt = ee | Me, dt = Y | ee, O = Y | ee | Me, at = Y, he = Me, Ge = Y | Me, Ce = Y, Pe = Y | se, Se = 0, Le = Y | de, pt = Y | re;
      function ae() {
        return {
          indent: null,
          base: null,
          parse: null,
          comment: false,
          format: {
            indent: {
              style: "    ",
              base: 0,
              adjustMultilineComment: false
            },
            newline: `
`,
            space: " ",
            json: false,
            renumber: false,
            hexadecimal: false,
            quotes: "single",
            escapeless: false,
            compact: false,
            parentheses: true,
            semicolons: true,
            safeConcatenation: false,
            preserveBlankLines: false
          },
          moz: {
            comprehensionExpressionStartsWithAssignment: false,
            starlessGenerator: false
          },
          sourceMap: null,
          sourceMapRoot: null,
          sourceMapWithCode: false,
          directive: false,
          raw: true,
          verbatim: null,
          sourceCode: null
        };
      }
      function We(d, b) {
        var f = "";
        for (b |= 0; b > 0; b >>>= 1, d += d)
          b & 1 && (f += d);
        return f;
      }
      function Mt(d) {
        return /[\r\n]/g.test(d);
      }
      function ie(d) {
        var b = d.length;
        return b && a.code.isLineTerminator(d.charCodeAt(b - 1));
      }
      function J(d, b) {
        var f;
        for (f in b)
          b.hasOwnProperty(f) && (d[f] = b[f]);
        return d;
      }
      function He(d, b) {
        var f, M;
        function P(k) {
          return typeof k == "object" && k instanceof Object && !(k instanceof RegExp);
        }
        for (f in b)
          b.hasOwnProperty(f) && (M = b[f], P(M) ? P(d[f]) ? He(d[f], M) : d[f] = He({}, M) : d[f] = M);
        return d;
      }
      function pe(d) {
        var b, f, M, P, k;
        if (d !== d)
          throw new Error("Numeric literal whose value is NaN");
        if (d < 0 || d === 0 && 1 / d < 0)
          throw new Error("Numeric literal whose value is negative");
        if (d === 1 / 0)
          return c ? "null" : l ? "1e400" : "1e+400";
        if (b = "" + d, !l || b.length < 3)
          return b;
        for (f = b.indexOf("."), !c && b.charCodeAt(0) === 48 && f === 1 && (f = 0, b = b.slice(1)), M = b, b = b.replace("e+", "e"), P = 0, (k = M.indexOf("e")) > 0 && (P = +M.slice(k + 1), M = M.slice(0, k)), f >= 0 && (P -= M.length - f - 1, M = +(M.slice(0, f) + M.slice(f + 1)) + ""), k = 0; M.charCodeAt(M.length + k - 1) === 48; )
          --k;
        return k !== 0 && (P -= k, M = M.slice(0, k)), P !== 0 && (M += "e" + P), (M.length < b.length || p && d > 1e12 && Math.floor(d) === d && (M = "0x" + d.toString(16)).length < b.length) && +M === d && (b = M), b;
      }
      function Te(d, b) {
        return (d & -2) === 8232 ? (b ? "u" : "\\u") + (d === 8232 ? "2028" : "2029") : d === 10 || d === 13 ? (b ? "" : "\\") + (d === 10 ? "n" : "r") : String.fromCharCode(d);
      }
      function Ct(d) {
        var b, f, M, P, k, W, K, te;
        if (f = d.toString(), d.source) {
          if (b = f.match(/\/([^/]*)$/), !b)
            return f;
          for (M = b[1], f = "", K = false, te = false, P = 0, k = d.source.length; P < k; ++P)
            W = d.source.charCodeAt(P), te ? (f += Te(W, te), te = false) : (K ? W === 93 && (K = false) : W === 47 ? f += "\\" : W === 91 && (K = true), f += Te(W, te), te = W === 92);
          return "/" + f + "/" + M;
        }
        return f;
      }
      function dn(d, b) {
        var f;
        return d === 8 ? "\\b" : d === 12 ? "\\f" : d === 9 ? "\\t" : (f = d.toString(16).toUpperCase(), c || d > 255 ? "\\u" + "0000".slice(f.length) + f : d === 0 && !a.code.isDecimalDigit(b) ? "\\0" : d === 11 ? "\\x0B" : "\\x" + "00".slice(f.length) + f);
      }
      function Nn(d) {
        if (d === 92)
          return "\\\\";
        if (d === 10)
          return "\\n";
        if (d === 13)
          return "\\r";
        if (d === 8232)
          return "\\u2028";
        if (d === 8233)
          return "\\u2029";
        throw new Error("Incorrectly classified character");
      }
      function hn(d) {
        var b, f, M, P;
        for (P = m === "double" ? '"' : "'", b = 0, f = d.length; b < f; ++b)
          if (M = d.charCodeAt(b), M === 39) {
            P = '"';
            break;
          } else if (M === 34) {
            P = "'";
            break;
          } else M === 92 && ++b;
        return P + d + P;
      }
      function Xt(d) {
        var b = "", f, M, P, k = 0, W = 0, K, te;
        for (f = 0, M = d.length; f < M; ++f) {
          if (P = d.charCodeAt(f), P === 39)
            ++k;
          else if (P === 34)
            ++W;
          else if (P === 47 && c)
            b += "\\";
          else if (a.code.isLineTerminator(P) || P === 92) {
            b += Nn(P);
            continue;
          } else if (!a.code.isIdentifierPartES5(P) && (c && P < 32 || !c && !g && (P < 32 || P > 126))) {
            b += dn(P, d.charCodeAt(f + 1));
            continue;
          }
          b += String.fromCharCode(P);
        }
        if (K = !(m === "double" || m === "auto" && W < k), te = K ? "'" : '"', !(K ? k : W))
          return te + b + te;
        for (d = b, b = te, f = 0, M = d.length; f < M; ++f)
          P = d.charCodeAt(f), (P === 39 && K || P === 34 && !K) && (b += "\\"), b += String.fromCharCode(P);
        return b + te;
      }
      function Fn(d) {
        var b, f, M, P = "";
        for (b = 0, f = d.length; b < f; ++b)
          M = d[b], P += Array.isArray(M) ? Fn(M) : M;
        return P;
      }
      function De(d, b) {
        if (!Z)
          return Array.isArray(d) ? Fn(d) : d;
        if (b == null) {
          if (d instanceof i)
            return d;
          b = {};
        }
        return b.loc == null ? new i(null, null, Z, d, b.name || null) : new i(b.loc.start.line, b.loc.start.column, Z === true ? b.loc.source || null : Z, d, b.name || null);
      }
      function Oe() {
        return x || " ";
      }
      function ye(d, b) {
        var f, M, P, k;
        return f = De(d).toString(), f.length === 0 ? [b] : (M = De(b).toString(), M.length === 0 ? [d] : (P = f.charCodeAt(f.length - 1), k = M.charCodeAt(0), (P === 43 || P === 45) && P === k || a.code.isIdentifierPartES5(P) && a.code.isIdentifierPartES5(k) || P === 47 && k === 105 ? [d, Oe(), b] : a.code.isWhiteSpace(P) || a.code.isLineTerminator(P) || a.code.isWhiteSpace(k) || a.code.isLineTerminator(k) ? [d, b] : [d, x, b]));
      }
      function qe(d) {
        return [u, d];
      }
      function Ke(d) {
        var b;
        b = u, u += o, d(u), u = b;
      }
      function ts(d) {
        var b;
        for (b = d.length - 1; b >= 0 && !a.code.isLineTerminator(d.charCodeAt(b)); --b)
          ;
        return d.length - 1 - b;
      }
      function ns(d, b) {
        var f, M, P, k, W, K, te, Ze;
        for (f = d.split(/\r\n|[\r\n]/), K = Number.MAX_VALUE, M = 1, P = f.length; M < P; ++M) {
          for (k = f[M], W = 0; W < k.length && a.code.isWhiteSpace(k.charCodeAt(W)); )
            ++W;
          K > W && (K = W);
        }
        for (typeof b < "u" ? (te = u, f[1][K] === "*" && (b += " "), u = b) : (K & 1 && --K, te = u), M = 1, P = f.length; M < P; ++M)
          Ze = De(qe(f[M].slice(K))), f[M] = Z ? Ze.join("") : Ze;
        return u = te, f.join(`
`);
      }
      function mt(d, b) {
        if (d.type === "Line") {
          if (ie(d.value))
            return "//" + d.value;
          var f = "//" + d.value;
          return R || (f += `
`), f;
        }
        return D.format.indent.adjustMultilineComment && /[\n\r]/.test(d.value) ? ns("/*" + d.value + "*/", b) : "/*" + d.value + "*/";
      }
      function Wn(d, b) {
        var f, M, P, k, W, K, te, Ze, ot, Xn, Tn, Ti, Ii, _t;
        if (d.leadingComments && d.leadingComments.length > 0) {
          if (k = b, R) {
            for (P = d.leadingComments[0], b = [], Ze = P.extendedRange, ot = P.range, Tn = L.substring(Ze[0], ot[0]), _t = (Tn.match(/\n/g) || []).length, _t > 0 ? (b.push(We(`
`, _t)), b.push(qe(mt(P)))) : (b.push(Tn), b.push(mt(P))), Xn = ot, f = 1, M = d.leadingComments.length; f < M; f++)
              P = d.leadingComments[f], ot = P.range, Ti = L.substring(Xn[1], ot[0]), _t = (Ti.match(/\n/g) || []).length, b.push(We(`
`, _t)), b.push(qe(mt(P))), Xn = ot;
            Ii = L.substring(ot[1], Ze[1]), _t = (Ii.match(/\n/g) || []).length, b.push(We(`
`, _t));
          } else
            for (P = d.leadingComments[0], b = [], w && d.type === t.Program && d.body.length === 0 && b.push(`
`), b.push(mt(P)), ie(De(b).toString()) || b.push(`
`), f = 1, M = d.leadingComments.length; f < M; ++f)
              P = d.leadingComments[f], te = [mt(P)], ie(De(te).toString()) || te.push(`
`), b.push(qe(te));
          b.push(qe(k));
        }
        if (d.trailingComments)
          if (R)
            P = d.trailingComments[0], Ze = P.extendedRange, ot = P.range, Tn = L.substring(Ze[0], ot[0]), _t = (Tn.match(/\n/g) || []).length, _t > 0 ? (b.push(We(`
`, _t)), b.push(qe(mt(P)))) : (b.push(Tn), b.push(mt(P)));
          else
            for (W = !ie(De(b).toString()), K = We(" ", ts(De([u, b, o]).toString())), f = 0, M = d.trailingComments.length; f < M; ++f)
              P = d.trailingComments[f], W ? (f === 0 ? b = [b, o] : b = [b, K], b.push(mt(P, K))) : b = [b, qe(mt(P))], f !== M - 1 && !ie(De(b).toString()) && (b = [b, `
`]);
        return b;
      }
      function me(d, b, f) {
        var M, P = 0;
        for (M = d; M < b; M++)
          L[M] === `
` && P++;
        for (M = 1; M < P; M++)
          f.push(y);
      }
      function be(d, b, f) {
        return b < f ? ["(", d, ")"] : d;
      }
      function $e(d) {
        var b, f, M;
        for (M = d.split(/\r\n|\n/), b = 1, f = M.length; b < f; b++)
          M[b] = y + u + M[b];
        return M;
      }
      function Je(d, b) {
        var f, M, P;
        return f = d[D.verbatim], typeof f == "string" ? M = be($e(f), n.Sequence, b) : (M = $e(f.content), P = f.precedence != null ? f.precedence : n.Sequence, M = be(M, P, b)), De(M, d);
      }
      function we() {
      }
      we.prototype.maybeBlock = function(d, b) {
        var f, M, P = this;
        return M = !D.comment || !d.leadingComments, d.type === t.BlockStatement && M ? [x, this.generateStatement(d, b)] : d.type === t.EmptyStatement && M ? ";" : (Ke(function() {
          f = [
            y,
            qe(P.generateStatement(d, b))
          ];
        }), f);
      }, we.prototype.maybeBlockSuffix = function(d, b) {
        var f = ie(De(b).toString());
        return d.type === t.BlockStatement && (!D.comment || !d.leadingComments) && !f ? [b, x] : f ? [b, u] : [b, y, u];
      };
      function _e(d) {
        return De(d.name, d);
      }
      function Bt(d, b) {
        return d.async ? "async" + (b ? Oe() : x) : "";
      }
      function Vt(d) {
        var b = d.generator && !D.moz.starlessGenerator;
        return b ? "*" + x : "";
      }
      function Wi(d) {
        var b = d.value, f = "";
        return b.async && (f += Bt(b, !d.computed)), b.generator && (f += Vt(b) ? "*" : ""), f;
      }
      we.prototype.generatePattern = function(d, b, f) {
        return d.type === t.Identifier ? _e(d) : this.generateExpression(d, b, f);
      }, we.prototype.generateFunctionParams = function(d) {
        var b, f, M, P;
        if (P = false, d.type === t.ArrowFunctionExpression && !d.rest && (!d.defaults || d.defaults.length === 0) && d.params.length === 1 && d.params[0].type === t.Identifier)
          M = [Bt(d, true), _e(d.params[0])];
        else {
          for (M = d.type === t.ArrowFunctionExpression ? [Bt(d, false)] : [], M.push("("), d.defaults && (P = true), b = 0, f = d.params.length; b < f; ++b)
            P && d.defaults[b] ? M.push(this.generateAssignment(d.params[b], d.defaults[b], "=", n.Assignment, O)) : M.push(this.generatePattern(d.params[b], n.Assignment, O)), b + 1 < f && M.push("," + x);
          d.rest && (d.params.length && M.push("," + x), M.push("..."), M.push(_e(d.rest))), M.push(")");
        }
        return M;
      }, we.prototype.generateFunctionBody = function(d) {
        var b, f;
        return b = this.generateFunctionParams(d), d.type === t.ArrowFunctionExpression && (b.push(x), b.push("=>")), d.expression ? (b.push(x), f = this.generateExpression(d.body, n.Assignment, O), f.toString().charAt(0) === "{" && (f = ["(", f, ")"]), b.push(f)) : b.push(this.maybeBlock(d.body, pt)), b;
      }, we.prototype.generateIterationForStatement = function(d, b, f) {
        var M = ["for" + (b.await ? Oe() + "await" : "") + x + "("], P = this;
        return Ke(function() {
          b.left.type === t.VariableDeclaration ? Ke(function() {
            M.push(b.left.kind + Oe()), M.push(P.generateStatement(b.left.declarations[0], Se));
          }) : M.push(P.generateExpression(b.left, n.Call, O)), M = ye(M, d), M = [ye(
            M,
            P.generateExpression(b.right, n.Assignment, O)
          ), ")"];
        }), M.push(this.maybeBlock(b.body, f)), M;
      }, we.prototype.generatePropertyKey = function(d, b) {
        var f = [];
        return b && f.push("["), f.push(this.generateExpression(d, n.Assignment, O)), b && f.push("]"), f;
      }, we.prototype.generateAssignment = function(d, b, f, M, P) {
        return n.Assignment < M && (P |= Y), be(
          [
            this.generateExpression(d, n.Call, P),
            x + f + x,
            this.generateExpression(b, n.Assignment, P)
          ],
          n.Assignment,
          M
        );
      }, we.prototype.semicolon = function(d) {
        return !E && d & se ? "" : ";";
      }, we.Statement = {
        BlockStatement: function(d, b) {
          var f, M, P = ["{", y], k = this;
          return Ke(function() {
            d.body.length === 0 && R && (f = d.range, f[1] - f[0] > 2 && (M = L.substring(f[0] + 1, f[1] - 1), M[0] === `
` && (P = ["{"]), P.push(M)));
            var W, K, te, Ze;
            for (Ze = Ce, b & re && (Ze |= de), W = 0, K = d.body.length; W < K; ++W)
              R && (W === 0 && (d.body[0].leadingComments && (f = d.body[0].leadingComments[0].extendedRange, M = L.substring(f[0], f[1]), M[0] === `
` && (P = ["{"])), d.body[0].leadingComments || me(d.range[0], d.body[0].range[0], P)), W > 0 && !d.body[W - 1].trailingComments && !d.body[W].leadingComments && me(d.body[W - 1].range[1], d.body[W].range[0], P)), W === K - 1 && (Ze |= se), d.body[W].leadingComments && R ? te = k.generateStatement(d.body[W], Ze) : te = qe(k.generateStatement(d.body[W], Ze)), P.push(te), ie(De(te).toString()) || R && W < K - 1 && d.body[W + 1].leadingComments || P.push(y), R && W === K - 1 && (d.body[W].trailingComments || me(d.body[W].range[1], d.range[1], P));
          }), P.push(qe("}")), P;
        },
        BreakStatement: function(d, b) {
          return d.label ? "break " + d.label.name + this.semicolon(b) : "break" + this.semicolon(b);
        },
        ContinueStatement: function(d, b) {
          return d.label ? "continue " + d.label.name + this.semicolon(b) : "continue" + this.semicolon(b);
        },
        ClassBody: function(d, b) {
          var f = ["{", y], M = this;
          return Ke(function(P) {
            var k, W;
            for (k = 0, W = d.body.length; k < W; ++k)
              f.push(P), f.push(M.generateExpression(d.body[k], n.Sequence, O)), k + 1 < W && f.push(y);
          }), ie(De(f).toString()) || f.push(y), f.push(u), f.push("}"), f;
        },
        ClassDeclaration: function(d, b) {
          var f, M;
          return f = ["class"], d.id && (f = ye(f, this.generateExpression(d.id, n.Sequence, O))), d.superClass && (M = ye("extends", this.generateExpression(d.superClass, n.Unary, O)), f = ye(f, M)), f.push(x), f.push(this.generateStatement(d.body, Pe)), f;
        },
        DirectiveStatement: function(d, b) {
          return D.raw && d.raw ? d.raw + this.semicolon(b) : hn(d.directive) + this.semicolon(b);
        },
        DoWhileStatement: function(d, b) {
          var f = ye("do", this.maybeBlock(d.body, Ce));
          return f = this.maybeBlockSuffix(d.body, f), ye(f, [
            "while" + x + "(",
            this.generateExpression(d.test, n.Sequence, O),
            ")" + this.semicolon(b)
          ]);
        },
        CatchClause: function(d, b) {
          var f, M = this;
          return Ke(function() {
            var P;
            d.param ? (f = [
              "catch" + x + "(",
              M.generateExpression(d.param, n.Sequence, O),
              ")"
            ], d.guard && (P = M.generateExpression(d.guard, n.Sequence, O), f.splice(2, 0, " if ", P))) : f = ["catch"];
          }), f.push(this.maybeBlock(d.body, Ce)), f;
        },
        DebuggerStatement: function(d, b) {
          return "debugger" + this.semicolon(b);
        },
        EmptyStatement: function(d, b) {
          return ";";
        },
        ExportDefaultDeclaration: function(d, b) {
          var f = ["export"], M;
          return M = b & se ? Pe : Ce, f = ye(f, "default"), I(d.declaration) ? f = ye(f, this.generateStatement(d.declaration, M)) : f = ye(f, this.generateExpression(d.declaration, n.Assignment, O) + this.semicolon(b)), f;
        },
        ExportNamedDeclaration: function(d, b) {
          var f = ["export"], M, P = this;
          return M = b & se ? Pe : Ce, d.declaration ? ye(f, this.generateStatement(d.declaration, M)) : (d.specifiers && (d.specifiers.length === 0 ? f = ye(f, "{" + x + "}") : d.specifiers[0].type === t.ExportBatchSpecifier ? f = ye(f, this.generateExpression(d.specifiers[0], n.Sequence, O)) : (f = ye(f, "{"), Ke(function(k) {
            var W, K;
            for (f.push(y), W = 0, K = d.specifiers.length; W < K; ++W)
              f.push(k), f.push(P.generateExpression(d.specifiers[W], n.Sequence, O)), W + 1 < K && f.push("," + y);
          }), ie(De(f).toString()) || f.push(y), f.push(u + "}")), d.source ? f = ye(f, [
            "from" + x,
            // ModuleSpecifier
            this.generateExpression(d.source, n.Sequence, O),
            this.semicolon(b)
          ]) : f.push(this.semicolon(b))), f);
        },
        ExportAllDeclaration: function(d, b) {
          return [
            "export" + x,
            "*" + x,
            "from" + x,
            // ModuleSpecifier
            this.generateExpression(d.source, n.Sequence, O),
            this.semicolon(b)
          ];
        },
        ExpressionStatement: function(d, b) {
          var f, M;
          function P(K) {
            var te;
            return K.slice(0, 5) !== "class" ? false : (te = K.charCodeAt(5), te === 123 || a.code.isWhiteSpace(te) || a.code.isLineTerminator(te));
          }
          function k(K) {
            var te;
            return K.slice(0, 8) !== "function" ? false : (te = K.charCodeAt(8), te === 40 || a.code.isWhiteSpace(te) || te === 42 || a.code.isLineTerminator(te));
          }
          function W(K) {
            var te, Ze, ot;
            if (K.slice(0, 5) !== "async" || !a.code.isWhiteSpace(K.charCodeAt(5)))
              return false;
            for (Ze = 6, ot = K.length; Ze < ot && a.code.isWhiteSpace(K.charCodeAt(Ze)); ++Ze)
              ;
            return Ze === ot || K.slice(Ze, Ze + 8) !== "function" ? false : (te = K.charCodeAt(Ze + 8), te === 40 || a.code.isWhiteSpace(te) || te === 42 || a.code.isLineTerminator(te));
          }
          return f = [this.generateExpression(d.expression, n.Sequence, O)], M = De(f).toString(), M.charCodeAt(0) === 123 || // ObjectExpression
          P(M) || k(M) || W(M) || V && b & de && d.expression.type === t.Literal && typeof d.expression.value == "string" ? f = ["(", f, ")" + this.semicolon(b)] : f.push(this.semicolon(b)), f;
        },
        ImportDeclaration: function(d, b) {
          var f, M, P = this;
          return d.specifiers.length === 0 ? [
            "import",
            x,
            // ModuleSpecifier
            this.generateExpression(d.source, n.Sequence, O),
            this.semicolon(b)
          ] : (f = [
            "import"
          ], M = 0, d.specifiers[M].type === t.ImportDefaultSpecifier && (f = ye(f, [
            this.generateExpression(d.specifiers[M], n.Sequence, O)
          ]), ++M), d.specifiers[M] && (M !== 0 && f.push(","), d.specifiers[M].type === t.ImportNamespaceSpecifier ? f = ye(f, [
            x,
            this.generateExpression(d.specifiers[M], n.Sequence, O)
          ]) : (f.push(x + "{"), d.specifiers.length - M === 1 ? (f.push(x), f.push(this.generateExpression(d.specifiers[M], n.Sequence, O)), f.push(x + "}" + x)) : (Ke(function(k) {
            var W, K;
            for (f.push(y), W = M, K = d.specifiers.length; W < K; ++W)
              f.push(k), f.push(P.generateExpression(d.specifiers[W], n.Sequence, O)), W + 1 < K && f.push("," + y);
          }), ie(De(f).toString()) || f.push(y), f.push(u + "}" + x)))), f = ye(f, [
            "from" + x,
            // ModuleSpecifier
            this.generateExpression(d.source, n.Sequence, O),
            this.semicolon(b)
          ]), f);
        },
        VariableDeclarator: function(d, b) {
          var f = b & Y ? O : rt;
          return d.init ? [
            this.generateExpression(d.id, n.Assignment, f),
            x,
            "=",
            x,
            this.generateExpression(d.init, n.Assignment, f)
          ] : this.generatePattern(d.id, n.Assignment, f);
        },
        VariableDeclaration: function(d, b) {
          var f, M, P, k, W, K = this;
          f = [d.kind], W = b & Y ? Ce : Se;
          function te() {
            for (k = d.declarations[0], D.comment && k.leadingComments ? (f.push(`
`), f.push(qe(K.generateStatement(k, W)))) : (f.push(Oe()), f.push(K.generateStatement(k, W))), M = 1, P = d.declarations.length; M < P; ++M)
              k = d.declarations[M], D.comment && k.leadingComments ? (f.push("," + y), f.push(qe(K.generateStatement(k, W)))) : (f.push("," + x), f.push(K.generateStatement(k, W)));
          }
          return d.declarations.length > 1 ? Ke(te) : te(), f.push(this.semicolon(b)), f;
        },
        ThrowStatement: function(d, b) {
          return [ye(
            "throw",
            this.generateExpression(d.argument, n.Sequence, O)
          ), this.semicolon(b)];
        },
        TryStatement: function(d, b) {
          var f, M, P, k;
          if (f = ["try", this.maybeBlock(d.block, Ce)], f = this.maybeBlockSuffix(d.block, f), d.handlers)
            for (M = 0, P = d.handlers.length; M < P; ++M)
              f = ye(f, this.generateStatement(d.handlers[M], Ce)), (d.finalizer || M + 1 !== P) && (f = this.maybeBlockSuffix(d.handlers[M].body, f));
          else {
            for (k = d.guardedHandlers || [], M = 0, P = k.length; M < P; ++M)
              f = ye(f, this.generateStatement(k[M], Ce)), (d.finalizer || M + 1 !== P) && (f = this.maybeBlockSuffix(k[M].body, f));
            if (d.handler)
              if (Array.isArray(d.handler))
                for (M = 0, P = d.handler.length; M < P; ++M)
                  f = ye(f, this.generateStatement(d.handler[M], Ce)), (d.finalizer || M + 1 !== P) && (f = this.maybeBlockSuffix(d.handler[M].body, f));
              else
                f = ye(f, this.generateStatement(d.handler, Ce)), d.finalizer && (f = this.maybeBlockSuffix(d.handler.body, f));
          }
          return d.finalizer && (f = ye(f, ["finally", this.maybeBlock(d.finalizer, Ce)])), f;
        },
        SwitchStatement: function(d, b) {
          var f, M, P, k, W, K = this;
          if (Ke(function() {
            f = [
              "switch" + x + "(",
              K.generateExpression(d.discriminant, n.Sequence, O),
              ")" + x + "{" + y
            ];
          }), d.cases)
            for (W = Ce, P = 0, k = d.cases.length; P < k; ++P)
              P === k - 1 && (W |= se), M = qe(this.generateStatement(d.cases[P], W)), f.push(M), ie(De(M).toString()) || f.push(y);
          return f.push(qe("}")), f;
        },
        SwitchCase: function(d, b) {
          var f, M, P, k, W, K = this;
          return Ke(function() {
            for (d.test ? f = [
              ye("case", K.generateExpression(d.test, n.Sequence, O)),
              ":"
            ] : f = ["default:"], P = 0, k = d.consequent.length, k && d.consequent[0].type === t.BlockStatement && (M = K.maybeBlock(d.consequent[0], Ce), f.push(M), P = 1), P !== k && !ie(De(f).toString()) && f.push(y), W = Ce; P < k; ++P)
              P === k - 1 && b & se && (W |= se), M = qe(K.generateStatement(d.consequent[P], W)), f.push(M), P + 1 !== k && !ie(De(M).toString()) && f.push(y);
          }), f;
        },
        IfStatement: function(d, b) {
          var f, M, P, k = this;
          return Ke(function() {
            f = [
              "if" + x + "(",
              k.generateExpression(d.test, n.Sequence, O),
              ")"
            ];
          }), P = b & se, M = Ce, P && (M |= se), d.alternate ? (f.push(this.maybeBlock(d.consequent, Ce)), f = this.maybeBlockSuffix(d.consequent, f), d.alternate.type === t.IfStatement ? f = ye(f, ["else ", this.generateStatement(d.alternate, M)]) : f = ye(f, ye("else", this.maybeBlock(d.alternate, M)))) : f.push(this.maybeBlock(d.consequent, M)), f;
        },
        ForStatement: function(d, b) {
          var f, M = this;
          return Ke(function() {
            f = ["for" + x + "("], d.init ? d.init.type === t.VariableDeclaration ? f.push(M.generateStatement(d.init, Se)) : (f.push(M.generateExpression(d.init, n.Sequence, rt)), f.push(";")) : f.push(";"), d.test && (f.push(x), f.push(M.generateExpression(d.test, n.Sequence, O))), f.push(";"), d.update && (f.push(x), f.push(M.generateExpression(d.update, n.Sequence, O))), f.push(")");
          }), f.push(this.maybeBlock(d.body, b & se ? Pe : Ce)), f;
        },
        ForInStatement: function(d, b) {
          return this.generateIterationForStatement("in", d, b & se ? Pe : Ce);
        },
        ForOfStatement: function(d, b) {
          return this.generateIterationForStatement("of", d, b & se ? Pe : Ce);
        },
        LabeledStatement: function(d, b) {
          return [d.label.name + ":", this.maybeBlock(d.body, b & se ? Pe : Ce)];
        },
        Program: function(d, b) {
          var f, M, P, k, W;
          for (k = d.body.length, f = [w && k > 0 ? `
` : ""], W = Le, P = 0; P < k; ++P)
            !w && P === k - 1 && (W |= se), R && (P === 0 && (d.body[0].leadingComments || me(d.range[0], d.body[P].range[0], f)), P > 0 && !d.body[P - 1].trailingComments && !d.body[P].leadingComments && me(d.body[P - 1].range[1], d.body[P].range[0], f)), M = qe(this.generateStatement(d.body[P], W)), f.push(M), P + 1 < k && !ie(De(M).toString()) && (R && d.body[P + 1].leadingComments || f.push(y)), R && P === k - 1 && (d.body[P].trailingComments || me(d.body[P].range[1], d.range[1], f));
          return f;
        },
        FunctionDeclaration: function(d, b) {
          return [
            Bt(d, true),
            "function",
            Vt(d) || Oe(),
            d.id ? _e(d.id) : "",
            this.generateFunctionBody(d)
          ];
        },
        ReturnStatement: function(d, b) {
          return d.argument ? [ye(
            "return",
            this.generateExpression(d.argument, n.Sequence, O)
          ), this.semicolon(b)] : ["return" + this.semicolon(b)];
        },
        WhileStatement: function(d, b) {
          var f, M = this;
          return Ke(function() {
            f = [
              "while" + x + "(",
              M.generateExpression(d.test, n.Sequence, O),
              ")"
            ];
          }), f.push(this.maybeBlock(d.body, b & se ? Pe : Ce)), f;
        },
        WithStatement: function(d, b) {
          var f, M = this;
          return Ke(function() {
            f = [
              "with" + x + "(",
              M.generateExpression(d.object, n.Sequence, O),
              ")"
            ];
          }), f.push(this.maybeBlock(d.body, b & se ? Pe : Ce)), f;
        }
      }, J(we.prototype, we.Statement), we.Expression = {
        SequenceExpression: function(d, b, f) {
          var M, P, k;
          for (n.Sequence < b && (f |= Y), M = [], P = 0, k = d.expressions.length; P < k; ++P)
            M.push(this.generateExpression(d.expressions[P], n.Assignment, f)), P + 1 < k && M.push("," + x);
          return be(M, n.Sequence, b);
        },
        AssignmentExpression: function(d, b, f) {
          return this.generateAssignment(d.left, d.right, d.operator, b, f);
        },
        ArrowFunctionExpression: function(d, b, f) {
          return be(this.generateFunctionBody(d), n.ArrowFunction, b);
        },
        ConditionalExpression: function(d, b, f) {
          return n.Conditional < b && (f |= Y), be(
            [
              this.generateExpression(d.test, n.Coalesce, f),
              x + "?" + x,
              this.generateExpression(d.consequent, n.Assignment, f),
              x + ":" + x,
              this.generateExpression(d.alternate, n.Assignment, f)
            ],
            n.Conditional,
            b
          );
        },
        LogicalExpression: function(d, b, f) {
          return d.operator === "??" && (f |= Ie), this.BinaryExpression(d, b, f);
        },
        BinaryExpression: function(d, b, f) {
          var M, P, k, W, K, te;
          return W = s[d.operator], P = d.operator === "**" ? n.Postfix : W, k = d.operator === "**" ? W : W + 1, W < b && (f |= Y), K = this.generateExpression(d.left, P, f), te = K.toString(), te.charCodeAt(te.length - 1) === 47 && a.code.isIdentifierPartES5(d.operator.charCodeAt(0)) ? M = [K, Oe(), d.operator] : M = ye(K, d.operator), K = this.generateExpression(d.right, k, f), d.operator === "/" && K.toString().charAt(0) === "/" || d.operator.slice(-1) === "<" && K.toString().slice(0, 3) === "!--" ? (M.push(Oe()), M.push(K)) : M = ye(M, K), d.operator === "in" && !(f & Y) ? ["(", M, ")"] : (d.operator === "||" || d.operator === "&&") && f & Ie ? ["(", M, ")"] : be(M, W, b);
        },
        CallExpression: function(d, b, f) {
          var M, P, k;
          for (M = [this.generateExpression(d.callee, n.Call, dt)], d.optional && M.push("?."), M.push("("), P = 0, k = d.arguments.length; P < k; ++P)
            M.push(this.generateExpression(d.arguments[P], n.Assignment, O)), P + 1 < k && M.push("," + x);
          return M.push(")"), f & ee ? be(M, n.Call, b) : ["(", M, ")"];
        },
        ChainExpression: function(d, b, f) {
          n.OptionalChaining < b && (f |= ee);
          var M = this.generateExpression(d.expression, n.OptionalChaining, f);
          return be(M, n.OptionalChaining, b);
        },
        NewExpression: function(d, b, f) {
          var M, P, k, W, K;
          if (P = d.arguments.length, K = f & Me && !v && P === 0 ? Ge : at, M = ye(
            "new",
            this.generateExpression(d.callee, n.New, K)
          ), !(f & Me) || v || P > 0) {
            for (M.push("("), k = 0, W = P; k < W; ++k)
              M.push(this.generateExpression(d.arguments[k], n.Assignment, O)), k + 1 < W && M.push("," + x);
            M.push(")");
          }
          return be(M, n.New, b);
        },
        MemberExpression: function(d, b, f) {
          var M, P;
          return M = [this.generateExpression(d.object, n.Call, f & ee ? dt : at)], d.computed ? (d.optional && M.push("?."), M.push("["), M.push(this.generateExpression(d.property, n.Sequence, f & ee ? O : Ge)), M.push("]")) : (!d.optional && d.object.type === t.Literal && typeof d.object.value == "number" && (P = De(M).toString(), P.indexOf(".") < 0 && !/[eExX]/.test(P) && a.code.isDecimalDigit(P.charCodeAt(P.length - 1)) && !(P.length >= 2 && P.charCodeAt(0) === 48) && M.push(" ")), M.push(d.optional ? "?." : "."), M.push(_e(d.property))), be(M, n.Member, b);
        },
        MetaProperty: function(d, b, f) {
          var M;
          return M = [], M.push(typeof d.meta == "string" ? d.meta : _e(d.meta)), M.push("."), M.push(typeof d.property == "string" ? d.property : _e(d.property)), be(M, n.Member, b);
        },
        UnaryExpression: function(d, b, f) {
          var M, P, k, W, K;
          return P = this.generateExpression(d.argument, n.Unary, O), x === "" ? M = ye(d.operator, P) : (M = [d.operator], d.operator.length > 2 ? M = ye(M, P) : (W = De(M).toString(), K = W.charCodeAt(W.length - 1), k = P.toString().charCodeAt(0), ((K === 43 || K === 45) && K === k || a.code.isIdentifierPartES5(K) && a.code.isIdentifierPartES5(k)) && M.push(Oe()), M.push(P))), be(M, n.Unary, b);
        },
        YieldExpression: function(d, b, f) {
          var M;
          return d.delegate ? M = "yield*" : M = "yield", d.argument && (M = ye(
            M,
            this.generateExpression(d.argument, n.Yield, O)
          )), be(M, n.Yield, b);
        },
        AwaitExpression: function(d, b, f) {
          var M = ye(
            d.all ? "await*" : "await",
            this.generateExpression(d.argument, n.Await, O)
          );
          return be(M, n.Await, b);
        },
        UpdateExpression: function(d, b, f) {
          return d.prefix ? be(
            [
              d.operator,
              this.generateExpression(d.argument, n.Unary, O)
            ],
            n.Unary,
            b
          ) : be(
            [
              this.generateExpression(d.argument, n.Postfix, O),
              d.operator
            ],
            n.Postfix,
            b
          );
        },
        FunctionExpression: function(d, b, f) {
          var M = [
            Bt(d, true),
            "function"
          ];
          return d.id ? (M.push(Vt(d) || Oe()), M.push(_e(d.id))) : M.push(Vt(d) || x), M.push(this.generateFunctionBody(d)), M;
        },
        ArrayPattern: function(d, b, f) {
          return this.ArrayExpression(d, b, f, true);
        },
        ArrayExpression: function(d, b, f, M) {
          var P, k, W = this;
          return d.elements.length ? (k = M ? false : d.elements.length > 1, P = ["[", k ? y : ""], Ke(function(K) {
            var te, Ze;
            for (te = 0, Ze = d.elements.length; te < Ze; ++te)
              d.elements[te] ? (P.push(k ? K : ""), P.push(W.generateExpression(d.elements[te], n.Assignment, O))) : (k && P.push(K), te + 1 === Ze && P.push(",")), te + 1 < Ze && P.push("," + (k ? y : x));
          }), k && !ie(De(P).toString()) && P.push(y), P.push(k ? u : ""), P.push("]"), P) : "[]";
        },
        RestElement: function(d, b, f) {
          return "..." + this.generatePattern(d.argument);
        },
        ClassExpression: function(d, b, f) {
          var M, P;
          return M = ["class"], d.id && (M = ye(M, this.generateExpression(d.id, n.Sequence, O))), d.superClass && (P = ye("extends", this.generateExpression(d.superClass, n.Unary, O)), M = ye(M, P)), M.push(x), M.push(this.generateStatement(d.body, Pe)), M;
        },
        MethodDefinition: function(d, b, f) {
          var M, P;
          return d.static ? M = ["static" + x] : M = [], d.kind === "get" || d.kind === "set" ? P = [
            ye(d.kind, this.generatePropertyKey(d.key, d.computed)),
            this.generateFunctionBody(d.value)
          ] : P = [
            Wi(d),
            this.generatePropertyKey(d.key, d.computed),
            this.generateFunctionBody(d.value)
          ], ye(M, P);
        },
        Property: function(d, b, f) {
          return d.kind === "get" || d.kind === "set" ? [
            d.kind,
            Oe(),
            this.generatePropertyKey(d.key, d.computed),
            this.generateFunctionBody(d.value)
          ] : d.shorthand ? d.value.type === "AssignmentPattern" ? this.AssignmentPattern(d.value, n.Sequence, O) : this.generatePropertyKey(d.key, d.computed) : d.method ? [
            Wi(d),
            this.generatePropertyKey(d.key, d.computed),
            this.generateFunctionBody(d.value)
          ] : [
            this.generatePropertyKey(d.key, d.computed),
            ":" + x,
            this.generateExpression(d.value, n.Assignment, O)
          ];
        },
        ObjectExpression: function(d, b, f) {
          var M, P, k, W = this;
          return d.properties.length ? (M = d.properties.length > 1, Ke(function() {
            k = W.generateExpression(d.properties[0], n.Sequence, O);
          }), !M && !Mt(De(k).toString()) ? ["{", x, k, x, "}"] : (Ke(function(K) {
            var te, Ze;
            if (P = ["{", y, K, k], M)
              for (P.push("," + y), te = 1, Ze = d.properties.length; te < Ze; ++te)
                P.push(K), P.push(W.generateExpression(d.properties[te], n.Sequence, O)), te + 1 < Ze && P.push("," + y);
          }), ie(De(P).toString()) || P.push(y), P.push(u), P.push("}"), P)) : "{}";
        },
        AssignmentPattern: function(d, b, f) {
          return this.generateAssignment(d.left, d.right, "=", b, f);
        },
        ObjectPattern: function(d, b, f) {
          var M, P, k, W, K, te = this;
          if (!d.properties.length)
            return "{}";
          if (W = false, d.properties.length === 1)
            K = d.properties[0], K.type === t.Property && K.value.type !== t.Identifier && (W = true);
          else
            for (P = 0, k = d.properties.length; P < k; ++P)
              if (K = d.properties[P], K.type === t.Property && !K.shorthand) {
                W = true;
                break;
              }
          return M = ["{", W ? y : ""], Ke(function(Ze) {
            var ot, Xn;
            for (ot = 0, Xn = d.properties.length; ot < Xn; ++ot)
              M.push(W ? Ze : ""), M.push(te.generateExpression(d.properties[ot], n.Sequence, O)), ot + 1 < Xn && M.push("," + (W ? y : x));
          }), W && !ie(De(M).toString()) && M.push(y), M.push(W ? u : ""), M.push("}"), M;
        },
        ThisExpression: function(d, b, f) {
          return "this";
        },
        Super: function(d, b, f) {
          return "super";
        },
        Identifier: function(d, b, f) {
          return _e(d);
        },
        ImportDefaultSpecifier: function(d, b, f) {
          return _e(d.id || d.local);
        },
        ImportNamespaceSpecifier: function(d, b, f) {
          var M = ["*"], P = d.id || d.local;
          return P && M.push(x + "as" + Oe() + _e(P)), M;
        },
        ImportSpecifier: function(d, b, f) {
          var M = d.imported, P = [M.name], k = d.local;
          return k && k.name !== M.name && P.push(Oe() + "as" + Oe() + _e(k)), P;
        },
        ExportSpecifier: function(d, b, f) {
          var M = d.local, P = [M.name], k = d.exported;
          return k && k.name !== M.name && P.push(Oe() + "as" + Oe() + _e(k)), P;
        },
        Literal: function(d, b, f) {
          var M;
          if (d.hasOwnProperty("raw") && X && D.raw)
            try {
              if (M = X(d.raw).body[0].expression, M.type === t.Literal && M.value === d.value)
                return d.raw;
            } catch {
            }
          return d.regex ? "/" + d.regex.pattern + "/" + d.regex.flags : typeof d.value == "bigint" ? d.value.toString() + "n" : d.bigint ? d.bigint + "n" : d.value === null ? "null" : typeof d.value == "string" ? Xt(d.value) : typeof d.value == "number" ? pe(d.value) : typeof d.value == "boolean" ? d.value ? "true" : "false" : Ct(d.value);
        },
        GeneratorExpression: function(d, b, f) {
          return this.ComprehensionExpression(d, b, f);
        },
        ComprehensionExpression: function(d, b, f) {
          var M, P, k, W, K = this;
          return M = d.type === t.GeneratorExpression ? ["("] : ["["], D.moz.comprehensionExpressionStartsWithAssignment && (W = this.generateExpression(d.body, n.Assignment, O), M.push(W)), d.blocks && Ke(function() {
            for (P = 0, k = d.blocks.length; P < k; ++P)
              W = K.generateExpression(d.blocks[P], n.Sequence, O), P > 0 || D.moz.comprehensionExpressionStartsWithAssignment ? M = ye(M, W) : M.push(W);
          }), d.filter && (M = ye(M, "if" + x), W = this.generateExpression(d.filter, n.Sequence, O), M = ye(M, ["(", W, ")"])), D.moz.comprehensionExpressionStartsWithAssignment || (W = this.generateExpression(d.body, n.Assignment, O), M = ye(M, W)), M.push(d.type === t.GeneratorExpression ? ")" : "]"), M;
        },
        ComprehensionBlock: function(d, b, f) {
          var M;
          return d.left.type === t.VariableDeclaration ? M = [
            d.left.kind,
            Oe(),
            this.generateStatement(d.left.declarations[0], Se)
          ] : M = this.generateExpression(d.left, n.Call, O), M = ye(M, d.of ? "of" : "in"), M = ye(M, this.generateExpression(d.right, n.Sequence, O)), ["for" + x + "(", M, ")"];
        },
        SpreadElement: function(d, b, f) {
          return [
            "...",
            this.generateExpression(d.argument, n.Assignment, O)
          ];
        },
        TaggedTemplateExpression: function(d, b, f) {
          var M = dt;
          f & ee || (M = at);
          var P = [
            this.generateExpression(d.tag, n.Call, M),
            this.generateExpression(d.quasi, n.Primary, he)
          ];
          return be(P, n.TaggedTemplate, b);
        },
        TemplateElement: function(d, b, f) {
          return d.value.raw;
        },
        TemplateLiteral: function(d, b, f) {
          var M, P, k;
          for (M = ["`"], P = 0, k = d.quasis.length; P < k; ++P)
            M.push(this.generateExpression(d.quasis[P], n.Primary, O)), P + 1 < k && (M.push("${" + x), M.push(this.generateExpression(d.expressions[P], n.Sequence, O)), M.push(x + "}"));
          return M.push("`"), M;
        },
        ModuleSpecifier: function(d, b, f) {
          return this.Literal(d, b, f);
        },
        ImportExpression: function(d, b, f) {
          return be([
            "import(",
            this.generateExpression(d.source, n.Assignment, O),
            ")"
          ], n.Call, b);
        }
      }, J(we.prototype, we.Expression), we.prototype.generateExpression = function(d, b, f) {
        var M, P;
        return P = d.type || t.Property, D.verbatim && d.hasOwnProperty(D.verbatim) ? Je(d, b) : (M = this[P](d, b, f), D.comment && (M = Wn(d, M)), De(M, d));
      }, we.prototype.generateStatement = function(d, b) {
        var f, M;
        return f = this[d.type](d, b), D.comment && (f = Wn(d, f)), M = De(f).toString(), d.type === t.Program && !w && y === "" && M.charAt(M.length - 1) === `
` && (f = Z ? De(f).replaceRight(/\s+$/, "") : M.replace(/\s+$/, "")), De(f, d);
      };
      function qr(d) {
        var b;
        if (b = new we(), I(d))
          return b.generateStatement(d, Ce);
        if ($(d))
          return b.generateExpression(d, n.Sequence, O);
        throw new Error("Unknown node type: " + d.type);
      }
      function $r(d, b) {
        var f = ae(), M, P;
        return b != null ? (typeof b.indent == "string" && (f.format.indent.style = b.indent), typeof b.base == "number" && (f.format.indent.base = b.base), b = He(f, b), o = b.format.indent.style, typeof b.base == "string" ? u = b.base : u = We(o, b.format.indent.base)) : (b = f, o = b.format.indent.style, u = We(o, b.format.indent.base)), c = b.format.json, l = b.format.renumber, p = c ? false : b.format.hexadecimal, m = c ? "double" : b.format.quotes, g = b.format.escapeless, y = b.format.newline, x = b.format.space, b.format.compact && (y = x = o = u = ""), v = b.format.parentheses, E = b.format.semicolons, w = b.format.safeConcatenation, V = b.directive, X = c ? null : b.parse, Z = b.sourceMap, L = b.sourceCode, R = b.format.preserveBlankLines && L !== null, D = b, Z && (e.browser ? i = CZ.sourceMap.SourceNode : i = EZ().SourceNode), M = qr(d), Z ? (P = M.toStringWithSourceMap({
          file: b.file,
          sourceRoot: b.sourceMapRoot
        }), b.sourceContent && P.map.setSourceContent(
          b.sourceMap,
          b.sourceContent
        ), b.sourceMapWithCode ? P : P.map.toString()) : (P = { code: M.toString(), map: null }, b.sourceMapWithCode ? P : P.code);
      }
      H = {
        indent: {
          style: "",
          base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: "auto",
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
      }, z = ae().format, e.version = UZ.version, e.generate = $r, e.attachComments = r.attachComments, e.Precedence = He({}, n), e.browser = false, e.FORMAT_MINIFY = H, e.FORMAT_DEFAULTS = z;
    })();
  }(fa)), fa;
}
var JZ = OZ();
const x3 = /* @__PURE__ */ y3(JZ);
class QZ {
  constructor() {
    this.should_skip = false, this.should_remove = false, this.replacement = null, this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (t) => this.replacement = t
    };
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   * @param {Node} node
   */
  replace(t, n, s, i) {
    t && n && (s != null ? t[n][s] = i : t[n] = i);
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   */
  remove(t, n, s) {
    t && n && (s != null ? t[n].splice(s, 1) : delete t[n]);
  }
}
class qZ extends QZ {
  /**
   *
   * @param {SyncHandler} [enter]
   * @param {SyncHandler} [leave]
   */
  constructor(t, n) {
    super(), this.should_skip = false, this.should_remove = false, this.replacement = null, this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (s) => this.replacement = s
    }, this.enter = t, this.leave = n;
  }
  /**
   * @template {Node} Parent
   * @param {Node} node
   * @param {Parent | null} parent
   * @param {keyof Parent} [prop]
   * @param {number | null} [index]
   * @returns {Node | null}
   */
  visit(t, n, s, i) {
    if (t) {
      if (this.enter) {
        const a = this.should_skip, u = this.should_remove, o = this.replacement;
        this.should_skip = false, this.should_remove = false, this.replacement = null, this.enter.call(this.context, t, n, s, i), this.replacement && (t = this.replacement, this.replace(n, s, i, t)), this.should_remove && this.remove(n, s, i);
        const c = this.should_skip, l = this.should_remove;
        if (this.should_skip = a, this.should_remove = u, this.replacement = o, c) return t;
        if (l) return null;
      }
      let r;
      for (r in t) {
        const a = t[r];
        if (a && typeof a == "object")
          if (Array.isArray(a)) {
            const u = (
              /** @type {Array<unknown>} */
              a
            );
            for (let o = 0; o < u.length; o += 1) {
              const c = u[o];
              rl(c) && (this.visit(c, t, r, o) || o--);
            }
          } else rl(a) && this.visit(a, t, r, null);
      }
      if (this.leave) {
        const a = this.replacement, u = this.should_remove;
        this.replacement = null, this.should_remove = false, this.leave.call(this.context, t, n, s, i), this.replacement && (t = this.replacement, this.replace(n, s, i, t)), this.should_remove && this.remove(n, s, i);
        const o = this.should_remove;
        if (this.replacement = a, this.should_remove = u, o) return null;
      }
    }
    return t;
  }
}
function rl(e) {
  return e !== null && typeof e == "object" && "type" in e && typeof e.type == "string";
}
function G3(e, { enter: t, leave: n }) {
  return new qZ(t, n).visit(e, null);
}
let v3 = [];
function GV(e) {
  v3.push(e);
}
let zs = /* @__PURE__ */ new Map();
function vV(e, t) {
  zs.set(e, t);
}
function $Z(e, t = {}) {
  const { wrapAsync: n = false, addReturn: s = true, emitMiniLocations: i = true, emitWidgets: r = true } = t, a = [];
  let u = MZ(e, {
    ecmaVersion: 2022,
    allowAwaitOutsideFunction: true,
    locations: true,
    onComment: a
  });
  const o = P7(a, e.length);
  let c = [];
  const l = (y, x) => {
    const v = zs.get("minilang");
    if (v) {
      const E = `[${y}]`, w = v.getLocations(E, x.start);
      c = c.concat(w);
    } else {
      const E = mo(`"${y}"`, x.start, e);
      c = c.concat(E);
    }
  };
  let p = [];
  G3(u, {
    enter(y, x) {
      if (M7(y)) {
        const { name: v } = y.tag, E = zs.get(v), w = y.quasi.quasis[0].value.raw, V = y.quasi.start + 1;
        if (i) {
          const D = E.getLocations(w, V);
          c = c.concat(D);
        }
        return this.skip(), this.replace(v7(v, w, V));
      }
      if (C7(y, "tidal")) {
        const v = y.quasi.quasis[0].value.raw, E = y.quasi.start + 1;
        if (i) {
          const w = x7(v, E);
          c = c.concat(w);
        }
        return this.skip(), this.replace(G7(v, E));
      }
      if (c7(y, x)) {
        if (ll(y.start, o))
          return;
        const { quasis: v } = y, { raw: E } = v[0].value;
        return this.skip(), i && l(E, y), this.replace(cl(E, y));
      }
      if (o7(y)) {
        if (ll(y.start, o))
          return;
        const { value: v } = y;
        return this.skip(), i && l(v, y), this.replace(cl(v, y));
      }
      if (l7(y))
        return r && p.push({
          from: y.arguments[0].start,
          to: y.arguments[0].end,
          value: y.arguments[0].raw,
          // don't use value!
          min: y.arguments[1]?.value ?? 0,
          max: y.arguments[2]?.value ?? 1,
          step: y.arguments[3]?.value,
          type: "slider"
        }), this.replace(h7(y));
      if (d7(y)) {
        const v = y.callee.property.name, E = p.filter((V) => V.type === v).length, w = {
          to: y.end,
          index: E,
          type: v,
          id: t.id
        };
        return r && p.push(w), this.replace(m7(y, w));
      }
      if (f7(y, x))
        return this.replace(y7(y));
      if (g7(y))
        return this.replace(b7(y));
    },
    leave(y, x, v, E) {
      if (!e7(y)) return;
      let [w, ...V] = y.arguments;
      if (!w) throw new Error("K(...) requires an expression");
      t7(w) && (w = {
        type: "CallExpression",
        callee: w,
        arguments: [],
        optional: false
      });
      const { template: D, patternExprs: X } = n7(w);
      if (X.length) {
        const H = [{ type: "Literal", value: D }, ...X, ...V];
        let z = y.callee;
        return z.type === "ChainExpression" && (z = z.expression), z.type === "MemberExpression" ? this.replace({
          type: "CallExpression",
          callee: ol(z.object),
          arguments: H,
          optional: false
        }) : this.replace({
          type: "CallExpression",
          callee: { type: "Identifier", name: "worklet" },
          arguments: H,
          optional: false
        });
      }
      const L = [{ type: "Literal", value: uu(w) }, ...V];
      let R = y.callee;
      return R.type === "ChainExpression" && (R = R.expression), R.type === "MemberExpression" ? this.replace({
        type: "CallExpression",
        callee: ol(R.object),
        arguments: L,
        optional: false
      }) : this.replace({
        type: "CallExpression",
        callee: { type: "Identifier", name: "worklet" },
        arguments: L,
        optional: false
      });
    }
  });
  let { body: m } = u;
  if (!m.length)
    console.warn("empty body -> fallback to silence"), m.push({
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "silence"
      }
    });
  else if (!m?.[m.length - 1]?.expression)
    throw new Error("unexpected ast format without body expression");
  if (s) {
    const { expression: y } = m[m.length - 1];
    m[m.length - 1] = {
      type: "ReturnStatement",
      argument: y
    };
  }
  let g = x3.generate(u);
  return n && (g = `(async ()=>{${g}})()`), i ? { output: g, miniLocations: c, widgets: p } : { output: g };
}
function e7(e) {
  if (e.type !== "CallExpression") return false;
  let t = e.callee;
  return t.type === "ChainExpression" && (t = t.expression), t.type === "MemberExpression" ? !t.computed && t.property?.name === "K" : t.type === "Identifier" && t.name === "K";
}
function t7(e) {
  return e.type !== "ArrowFunctionExpression" && e.type !== "FunctionExpression" || e.params.length ? false : e.body?.type === "BlockStatement";
}
function uu(e) {
  return x3.generate(e, { format: { semicolons: false } });
}
function n7(e) {
  const t = ul(e), n = /* @__PURE__ */ new Map(), s = [];
  if (G3(t, {
    enter(u, o, c, l) {
      n.set(u, { parent: o, prop: c, index: l });
      const p = s7(u);
      p && (s.push({ node: u, patternExpr: p }), this.skip());
    }
  }), !s.length)
    return { template: uu(t), patternExprs: [] };
  s.sort((u, o) => al(u.node) - al(o.node));
  const i = s.map(({ patternExpr: u }) => ul(u));
  let r = t;
  return s.forEach(({ node: u }, o) => {
    r = u7(u, a7(o), n, r);
  }), { template: uu(r), patternExprs: i };
}
function s7(e) {
  if (i7(e)) {
    const t = e.arguments?.[0];
    if (!t)
      throw new Error("S(...) requires an argument");
    return t;
  }
  return P3(e) ? e : null;
}
function i7(e) {
  if (e.type !== "CallExpression")
    return false;
  const t = e.callee;
  return t.type === "Identifier" ? t.name === "S" : t.type === "MemberExpression" && !t.computed ? t.property?.name === "S" : false;
}
function r7() {
  return zs.get("minilang")?.name || "m";
}
function P3(e) {
  if (e.type !== "CallExpression")
    return false;
  const t = e.callee;
  if (t.type !== "Identifier" || t.name !== r7())
    return false;
  const n = e.arguments?.[0];
  return n?.type === "Literal" && typeof n.value == "string";
}
function al(e) {
  if (typeof e.start == "number")
    return e.start;
  if (P3(e)) {
    const t = e.arguments?.[1];
    if (t?.type === "Literal" && typeof t.value == "number")
      return t.value;
  }
  return 0;
}
function a7(e) {
  return {
    type: "MemberExpression",
    object: { type: "Identifier", name: "pat" },
    property: { type: "Literal", value: e },
    computed: true,
    optional: false
  };
}
function u7(e, t, n, s) {
  const i = n.get(e);
  if (!i || !i.parent)
    return t;
  const { parent: r, prop: a, index: u } = i;
  return Array.isArray(r[a]) ? r[a][u] = t : r[a] = t, n.set(t, { parent: r, prop: a, index: u }), s;
}
function ul(e) {
  return JSON.parse(JSON.stringify(e));
}
function ol(e) {
  return {
    type: "MemberExpression",
    object: e,
    property: { type: "Identifier", name: "worklet" },
    computed: false,
    optional: false
  };
}
function o7(e, t, n) {
  return e.type !== "Literal" ? false : e.raw[0] === '"';
}
function c7(e, t) {
  return e.type === "TemplateLiteral" && t.type !== "TaggedTemplateExpression";
}
function cl(e, t) {
  const { start: n } = t, s = zs.get("minilang");
  let i = "m";
  return s && s.name && (i = s.name), {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: i
    },
    arguments: [
      { type: "Literal", value: e },
      { type: "Literal", value: n }
    ],
    optional: false
  };
}
function l7(e) {
  return e.type === "CallExpression" && e.callee.name === "slider";
}
function d7(e) {
  return e.type === "CallExpression" && v3.includes(e.callee.property?.name);
}
function h7(e) {
  const t = "slider_" + e.arguments[0].start;
  return e.arguments.unshift({
    type: "Literal",
    value: t,
    raw: t
  }), e.callee.name = "sliderWithID", e;
}
function p7(e) {
  return `${e.id || ""}_widget_${e.type}_${e.index}`;
}
function m7(e, t) {
  const n = p7(t);
  return e.arguments.unshift({
    type: "Literal",
    value: n,
    raw: n
  }), e;
}
function f7(e, t) {
  return e.type === "CallExpression" && e.callee.name === "samples" && t.type !== "AwaitExpression";
}
function y7(e) {
  return {
    type: "AwaitExpression",
    argument: e
  };
}
function g7(e) {
  return e.type === "LabeledStatement";
}
function b7(e) {
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        object: e.body.expression,
        property: {
          type: "Identifier",
          name: "p"
        }
      },
      arguments: [
        {
          type: "Literal",
          value: e.label.name,
          raw: `'${e.label.name}'`
        }
      ]
    }
  };
}
function M7(e) {
  return e.type === "TaggedTemplateExpression" && zs.has(e.tag.name);
}
function C7(e, t) {
  return e.type === "TaggedTemplateExpression" && e.tag.name === t;
}
function x7(e, t) {
  return e.split("").reduce((n, s, i) => (s !== '"' || (!n.length || n[n.length - 1].length > 1 ? n.push([i + 1]) : n[n.length - 1].push(i)), n), []).map(([n, s]) => {
    const i = e.slice(n, s);
    return mo(`"${i}"`, t + n - 1);
  }).flat();
}
function G7(e, t) {
  return {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: "tidal"
    },
    arguments: [
      { type: "Literal", value: e },
      { type: "Literal", value: t }
    ],
    optional: false
  };
}
function v7(e, t, n) {
  return {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: e
    },
    arguments: [
      { type: "Literal", value: t },
      { type: "Literal", value: n }
    ],
    optional: false
  };
}
function P7(e, t) {
  const n = [], s = [];
  for (const i of e) {
    const r = i.value.trim();
    if (r.startsWith("mini-off"))
      s.push(i.start);
    else if (r.startsWith("mini-on")) {
      const a = s.pop();
      n.push([a, i.end]);
    }
  }
  for (; s.length; ) {
    const i = s.pop();
    n.push([i, t]);
  }
  return n;
}
function ll(e, t) {
  for (const [n, s] of t)
    if (e >= n && e < s)
      return true;
  return false;
}
function Po(e) {
  return e !== null && typeof e == "object" && "name" in e && typeof e.name == "string";
}
function Ao(e) {
  return e !== null && typeof e == "object" && "step" in e && typeof e.step == "number" && "alt" in e && typeof e.alt == "number" && !isNaN(e.step) && !isNaN(e.alt);
}
var A3 = [0, 2, 4, -1, 1, 3, 5], F3 = A3.map(
  (e) => Math.floor(e * 7 / 12)
);
function X3(e) {
  const { step: t, alt: n, oct: s, dir: i = 1 } = e, r = A3[t] + 7 * n;
  if (s === void 0)
    return [i * r];
  const a = s - F3[t] - 4 * n;
  return [i * r, i * a];
}
var A7 = [3, 0, 4, 1, 5, 2, 6];
function D3(e) {
  const [t, n, s] = e, i = A7[F7(t)], r = Math.floor((t + 1) / 7);
  if (n === void 0)
    return { step: i, alt: r, dir: s };
  const a = n + 4 * r + F3[i];
  return { step: i, alt: r, oct: a, dir: s };
}
function F7(e) {
  const t = (e + 1) % 7;
  return t < 0 ? 7 + t : t;
}
var dl = (e, t) => Array(Math.abs(t) + 1).join(e), ou = Object.freeze({
  empty: true,
  name: "",
  num: NaN,
  q: "",
  type: "",
  step: NaN,
  alt: NaN,
  dir: NaN,
  simple: NaN,
  semitones: NaN,
  chroma: NaN,
  coord: [],
  oct: NaN
}), X7 = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})", D7 = "(AA|A|P|M|m|d|dd)([-+]?\\d+)", S7 = new RegExp(
  "^" + X7 + "|" + D7 + "$"
);
function w7(e) {
  const t = S7.exec(`${e}`);
  return t === null ? ["", ""] : t[1] ? [t[1], t[2]] : [t[4], t[3]];
}
var hl = {};
function Mn(e) {
  return typeof e == "string" ? hl[e] || (hl[e] = Z7(e)) : Ao(e) ? Mn(L7(e)) : Po(e) ? Mn(e.name) : ou;
}
var pl = [0, 2, 4, 5, 7, 9, 11], S3 = "PMMPPMM";
function Z7(e) {
  const t = w7(e);
  if (t[0] === "")
    return ou;
  const n = +t[0], s = t[1], i = (Math.abs(n) - 1) % 7, r = S3[i];
  if (r === "M" && s === "P")
    return ou;
  const a = r === "M" ? "majorable" : "perfectable", u = "" + n + s, o = n < 0 ? -1 : 1, c = n === 8 || n === -8 ? n : o * (i + 1), l = E7(a, s), p = Math.floor((Math.abs(n) - 1) / 7), m = o * (pl[i] + l + 12 * p), g = (o * (pl[i] + l) % 12 + 12) % 12, y = X3({ step: i, alt: l, oct: p, dir: o });
  return {
    empty: false,
    name: u,
    num: n,
    q: s,
    step: i,
    alt: l,
    dir: o,
    type: a,
    simple: c,
    semitones: m,
    chroma: g,
    coord: y,
    oct: p
  };
}
function w3(e, t) {
  const [n, s = 0] = e, i = n * 7 + s * 12 < 0, r = t || i ? [-n, -s, -1] : [n, s, 1];
  return Mn(D3(r));
}
function E7(e, t) {
  return t === "M" && e === "majorable" || t === "P" && e === "perfectable" ? 0 : t === "m" && e === "majorable" ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? -1 * (e === "perfectable" ? t.length : t.length + 1) : 0;
}
function L7(e) {
  const { step: t, alt: n, oct: s = 0, dir: i } = e;
  if (!i)
    return "";
  const r = t + 1 + 7 * s, a = r === 0 ? t + 1 : r, u = i < 0 ? "-" : "", o = S3[t] === "M" ? "majorable" : "perfectable";
  return u + a + R7(o, n);
}
function R7(e, t) {
  return t === 0 ? e === "majorable" ? "M" : "P" : t === -1 && e === "majorable" ? "m" : t > 0 ? dl("A", t) : dl("d", e === "perfectable" ? t : t + 1);
}
var ml = (e, t) => Array(Math.abs(t) + 1).join(e), Z3 = Object.freeze({
  empty: true,
  name: "",
  letter: "",
  acc: "",
  pc: "",
  step: NaN,
  alt: NaN,
  chroma: NaN,
  height: NaN,
  coord: [],
  midi: null,
  freq: null
}), fl = /* @__PURE__ */ new Map(), B7 = (e) => "CDEFGAB".charAt(e), Rr = (e) => e < 0 ? ml("b", -e) : ml("#", e), Fo = (e) => e[0] === "b" ? -e.length : e.length;
function Ne(e) {
  const t = JSON.stringify(e), n = fl.get(t);
  if (n)
    return n;
  const s = typeof e == "string" ? N7(e) : Ao(e) ? Ne(W7(e)) : Po(e) ? Ne(e.name) : Z3;
  return fl.set(t, s), s;
}
var V7 = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function Xo(e) {
  const t = V7.exec(e);
  return t ? [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]] : ["", "", "", ""];
}
function k7(e) {
  return Ne(D3(e));
}
var z7 = (e, t) => (e % t + t) % t, Xa = [0, 2, 4, 5, 7, 9, 11];
function N7(e) {
  const t = Xo(e);
  if (t[0] === "" || t[3] !== "")
    return Z3;
  const n = t[0], s = t[1], i = t[2], r = (n.charCodeAt(0) + 3) % 7, a = Fo(s), u = i.length ? +i : void 0, o = X3({ step: r, alt: a, oct: u }), c = n + s + i, l = n + s, p = (Xa[r] + a + 120) % 12, m = u === void 0 ? z7(Xa[r] + a, 12) - 12 * 99 : Xa[r] + a + 12 * (u + 1), g = m >= 0 && m <= 127 ? m : null, y = u === void 0 ? null : Math.pow(2, (m - 69) / 12) * 440;
  return {
    empty: false,
    acc: s,
    alt: a,
    chroma: p,
    coord: o,
    freq: y,
    height: m,
    letter: n,
    midi: g,
    name: c,
    oct: u,
    pc: l,
    step: r
  };
}
function W7(e) {
  const { step: t, alt: n, oct: s } = e, i = B7(t);
  if (!i)
    return "";
  const r = i + Rr(n);
  return s || s === 0 ? r + s : r;
}
function cn(e, t) {
  const n = Ne(e), s = Array.isArray(t) ? t : Mn(t).coord;
  if (n.empty || !s || s.length < 2)
    return "";
  const i = n.coord, r = i.length === 1 ? [i[0] + s[0]] : [i[0] + s[0], i[1] + s[1]];
  return k7(r).name;
}
function E3(e, t) {
  const n = e.length;
  return (s) => {
    if (!t) return "";
    const i = s < 0 ? (n - -s % n) % n : s % n, r = Math.floor(s / n), a = cn(t, [0, r]);
    return cn(a, e[i]);
  };
}
function Br(e, t) {
  const n = Ne(e), s = Ne(t);
  if (n.empty || s.empty)
    return "";
  const i = n.coord, r = s.coord, a = r[0] - i[0], u = i.length === 2 && r.length === 2 ? r[1] - i[1] : -Math.floor(a * 7 / 12), o = s.height === n.height && s.midi !== null && n.oct === s.oct && n.step > s.step;
  return w3([a, u], o).name;
}
var yl = (e, t) => Array(t + 1).join(e), T7 = /^(_{1,}|=|\^{1,}|)([abcdefgABCDEFG])([,']*)$/;
function L3(e) {
  const t = T7.exec(e);
  return t ? [t[1], t[2], t[3]] : ["", "", ""];
}
function mr(e) {
  const [t, n, s] = L3(e);
  if (n === "")
    return "";
  let i = 4;
  for (let a = 0; a < s.length; a++)
    i += s.charAt(a) === "," ? -1 : 1;
  const r = t[0] === "_" ? t.replace(/_/g, "b") : t[0] === "^" ? t.replace(/\^/g, "#") : "";
  return n.charCodeAt(0) > 96 ? n.toUpperCase() + r + (i + 1) : n + r + i;
}
function R3(e) {
  const t = Ne(e);
  if (t.empty || !t.oct && t.oct !== 0)
    return "";
  const { letter: n, acc: s, oct: i } = t, r = s[0] === "b" ? s.replace(/b/g, "_") : s.replace(/#/g, "^"), a = i > 4 ? n.toLowerCase() : n, u = i === 5 ? "" : i > 4 ? yl("'", i - 5) : yl(",", 4 - i);
  return r + a + u;
}
function I7(e, t) {
  return R3(cn(mr(e), t));
}
function _7(e, t) {
  return Br(mr(e), mr(t));
}
var Y7 = {
  abcToScientificNotation: mr,
  scientificToAbcNotation: R3,
  tokenize: L3,
  transpose: I7,
  distance: _7
};
function H7(e, t) {
  const n = [];
  for (; t--; n[t] = t + e) ;
  return n;
}
function K7(e, t) {
  const n = [];
  for (; t--; n[t] = e - t) ;
  return n;
}
function j7(e, t) {
  return e < t ? H7(e, t - e + 1) : K7(e, e - t + 1);
}
function U7(e, t) {
  const n = t.length, s = (e % n + n) % n;
  return t.slice(s, n).concat(t.slice(0, s));
}
function O7(e) {
  return e.filter((t) => t === 0 || t);
}
function B3(e) {
  return e.map((n) => Ne(n)).filter((n) => !n.empty).sort((n, s) => n.height - s.height).map((n) => n.name);
}
function J7(e) {
  return B3(e).filter((t, n, s) => n === 0 || t !== s[n - 1]);
}
function Q7(e, t = Math.random) {
  let n, s, i = e.length;
  for (; i; )
    n = Math.floor(t() * i--), s = e[i], e[i] = e[n], e[n] = s;
  return e;
}
function V3(e) {
  return e.length === 0 ? [[]] : V3(e.slice(1)).reduce((t, n) => t.concat(
    e.map((s, i) => {
      const r = n.slice();
      return r.splice(i, 0, e[0]), r;
    })
  ), []);
}
const q7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compact: O7,
  permutations: V3,
  range: j7,
  rotate: U7,
  shuffle: Q7,
  sortedNoteNames: B3,
  sortedUniqNoteNames: J7
}, Symbol.toStringTag, { value: "Module" }));
function $7(e, t) {
  const n = [];
  for (; t--; n[t] = t + e) ;
  return n;
}
function eE(e, t) {
  const n = [];
  for (; t--; n[t] = e - t) ;
  return n;
}
function Vr(e, t) {
  return e < t ? $7(e, t - e + 1) : eE(e, e - t + 1);
}
function Us(e, t) {
  const n = t.length, s = (e % n + n) % n;
  return t.slice(s, n).concat(t.slice(0, s));
}
function Do(e) {
  return e.filter((t) => t === 0 || t);
}
function tE(e, t = Math.random) {
  let n, s, i = e.length;
  for (; i; )
    n = Math.floor(t() * i--), s = e[i], e[i] = e[n], e[n] = s;
  return e;
}
function k3(e) {
  return e.length === 0 ? [[]] : k3(e.slice(1)).reduce((t, n) => t.concat(
    e.map((s, i) => {
      const r = n.slice();
      return r.splice(i, 0, e[0]), r;
    })
  ), []);
}
var nE = {
  compact: Do,
  permutations: k3,
  range: Vr,
  rotate: Us,
  shuffle: tE
}, On = {
  empty: true,
  name: "",
  setNum: 0,
  chroma: "000000000000",
  normalized: "000000000000",
  intervals: []
}, So = (e) => Number(e).toString(2).padStart(12, "0"), gl = (e) => parseInt(e, 2), sE = /^[01]{12}$/;
function wo(e) {
  return sE.test(e);
}
var iE = (e) => typeof e == "number" && e >= 0 && e <= 4095, rE = (e) => e && wo(e.chroma), bl = { [On.chroma]: On };
function Gt(e) {
  const t = wo(e) ? e : iE(e) ? So(e) : Array.isArray(e) ? gE(e) : rE(e) ? e.chroma : On.chroma;
  return bl[t] = bl[t] || yE(t);
}
var aE = Gt, z3 = (e) => Gt(e).chroma, uE = (e) => Gt(e).intervals, oE = (e) => Gt(e).setNum, cE = [
  "1P",
  "2m",
  "2M",
  "3m",
  "3M",
  "4P",
  "5d",
  "5P",
  "6m",
  "6M",
  "7m",
  "7M"
];
function lE(e) {
  const t = [];
  for (let n = 0; n < 12; n++)
    e.charAt(n) === "1" && t.push(cE[n]);
  return t;
}
function dE(e) {
  return Gt(e).intervals.map((t) => cn("C", t));
}
function hE() {
  return Vr(2048, 4095).map(So);
}
function Zo(e, t = true) {
  const s = Gt(e).chroma.split("");
  return Do(
    s.map((i, r) => {
      const a = Us(r, s);
      return t && a[0] === "0" ? null : a.join("");
    })
  );
}
function pE(e, t) {
  return Gt(e).setNum === Gt(t).setNum;
}
function kr(e) {
  const t = Gt(e).setNum;
  return (n) => {
    const s = Gt(n).setNum;
    return t && t !== s && (s & t) === s;
  };
}
function zr(e) {
  const t = Gt(e).setNum;
  return (n) => {
    const s = Gt(n).setNum;
    return t && t !== s && (s | t) === s;
  };
}
function N3(e) {
  const t = Gt(e);
  return (n) => {
    const s = Ne(n);
    return t && !s.empty && t.chroma.charAt(s.chroma) === "1";
  };
}
function mE(e) {
  const t = N3(e);
  return (n) => n.filter(t);
}
var W3 = {
  get: Gt,
  chroma: z3,
  num: oE,
  intervals: uE,
  chromas: hE,
  isSupersetOf: zr,
  isSubsetOf: kr,
  isNoteIncludedIn: N3,
  isEqual: pE,
  filter: mE,
  modes: Zo,
  notes: dE,
  // deprecated
  pcset: aE
};
function fE(e) {
  const t = e.split("");
  return t.map((n, s) => Us(s, t).join(""));
}
function yE(e) {
  const t = gl(e), n = fE(e).map(gl).filter((r) => r >= 2048).sort()[0], s = So(n), i = lE(e);
  return {
    empty: false,
    name: "",
    setNum: t,
    chroma: e,
    normalized: s,
    intervals: i
  };
}
function gE(e) {
  if (e.length === 0)
    return On.chroma;
  let t;
  const n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let s = 0; s < e.length; s++)
    t = Ne(e[s]), t.empty && (t = Mn(e[s])), t.empty || (n[t.chroma] = 1);
  return n.join("");
}
var bE = [
  // ==Major==
  ["1P 3M 5P", "major", "M ^  maj"],
  ["1P 3M 5P 7M", "major seventh", "maj7 Δ ma7 M7 Maj7 ^7"],
  ["1P 3M 5P 7M 9M", "major ninth", "maj9 Δ9 ^9"],
  ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
  ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
  ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
  ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
  [
    "1P 3M 5P 7M 11A",
    "major seventh sharp eleventh",
    "maj#4 Δ#4 Δ#11 M7#11 ^7#11 maj7#11"
  ],
  // ==Minor==
  // '''Normal'''
  ["1P 3m 5P", "minor", "m min -"],
  ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
  [
    "1P 3m 5P 7M",
    "minor/major seventh",
    "m/ma7 m/maj7 mM7 mMaj7 m/M7 -Δ7 mΔ -^7 -maj7"
  ],
  ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
  ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
  ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
  ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
  ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
  // '''Diminished'''
  ["1P 3m 5d", "diminished", "dim ° o"],
  ["1P 3m 5d 7d", "diminished seventh", "dim7 °7 o7"],
  ["1P 3m 5d 7m", "half-diminished", "m7b5 ø -7b5 h7 h"],
  // ==Dominant/Seventh==
  // '''Normal'''
  ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
  ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
  ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
  ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
  // '''Altered'''
  ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
  ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
  ["1P 3M 7m 9m", "altered", "alt7"],
  // '''Suspended'''
  ["1P 4P 5P", "suspended fourth", "sus4 sus"],
  ["1P 2M 5P", "suspended second", "sus2"],
  ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
  ["1P 5P 7m 9M 11P", "eleventh", "11"],
  [
    "1P 4P 5P 7m 9m",
    "suspended fourth flat ninth",
    "b9sus phryg 7b9sus 7b9sus4"
  ],
  // ==Other==
  ["1P 5P", "fifth", "5"],
  ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
  ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
  ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
  [
    "1P 3M 5P 7M 9M 11A",
    "major sharp eleventh (lydian)",
    "maj9#11 Δ9#11 ^9#11"
  ],
  // ==Legacy==
  ["1P 2M 4P 5P", "", "sus24 sus4add9"],
  ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
  ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
  ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
  ["1P 3M 5A 7m 9M", "", "9#5 9+"],
  ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
  ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
  ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
  ["1P 3M 5A 9A", "", "+add#9"],
  ["1P 3M 5A 9M", "", "M#5add9 +add9"],
  ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
  ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
  ["1P 3M 5P 6M 9M 11A", "", "69#11"],
  ["1P 3m 5P 6M 9M", "", "m69 -69"],
  ["1P 3M 5P 6m 7m", "", "7b6"],
  ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
  ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
  ["1P 3M 5P 7M 9m", "", "M7b9"],
  ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
  ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
  ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
  ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
  ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
  ["1P 3M 5P 7m 9A 13M", "", "13#9"],
  ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
  ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
  ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
  ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
  ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
  ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
  ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
  ["1P 3M 5P 7m 9m 13M", "", "13b9"],
  ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
  ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
  ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
  ["1P 3M 5P 9m", "", "Maddb9"],
  ["1P 3M 5d", "", "Mb5"],
  ["1P 3M 5d 6M 7m 9M", "", "13b5"],
  ["1P 3M 5d 7M", "", "M7b5"],
  ["1P 3M 5d 7M 9M", "", "M9b5"],
  ["1P 3M 5d 7m", "", "7b5"],
  ["1P 3M 5d 7m 9M", "", "9b5"],
  ["1P 3M 7m", "", "7no5"],
  ["1P 3M 7m 13m", "", "7b13"],
  ["1P 3M 7m 9M", "", "9no5"],
  ["1P 3M 7m 9M 13M", "", "13no5"],
  ["1P 3M 7m 9M 13m", "", "9b13"],
  ["1P 3m 4P 5P", "", "madd4"],
  ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
  ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
  ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
  ["1P 3m 5P 9M", "", "madd9"],
  ["1P 3m 5d 6M 7M", "", "o7M7"],
  ["1P 3m 5d 7M", "", "oM7"],
  ["1P 3m 6m 7M", "", "mb6M7"],
  ["1P 3m 6m 7m", "", "m7#5"],
  ["1P 3m 6m 7m 9M", "", "m9#5"],
  ["1P 3m 5A 7m 9M 11P", "", "m11A"],
  ["1P 3m 6m 9m", "", "mb6b9"],
  ["1P 2M 3m 5d 7m", "", "m9b5"],
  ["1P 4P 5A 7M", "", "M7#5sus4"],
  ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
  ["1P 4P 5A 7m", "", "7#5sus4"],
  ["1P 4P 5P 7M", "", "M7sus4"],
  ["1P 4P 5P 7M 9M", "", "M9sus4"],
  ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
  ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
  ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
  ["1P 4P 7m 10m", "", "4 quartal"],
  ["1P 5P 7m 9m 11P", "", "11b9"]
], ME = bE;
({
  ...On
});
var Eo = [], tr = {};
function T3() {
  return Eo.slice();
}
function CE(e, t, n) {
  const s = GE(e), i = {
    ...Gt(e),
    name: n || "",
    quality: s,
    intervals: e,
    aliases: t
  };
  Eo.push(i), i.name && (tr[i.name] = i), tr[i.setNum] = i, tr[i.chroma] = i, i.aliases.forEach((r) => xE(i, r));
}
function xE(e, t) {
  tr[t] = e;
}
function GE(e) {
  const t = (n) => e.indexOf(n) !== -1;
  return t("5A") ? "Augmented" : t("3M") ? "Major" : t("5d") ? "Diminished" : t("3m") ? "Minor" : "Unknown";
}
ME.forEach(
  ([e, t, n]) => CE(e.split(" "), n.split(" "), t)
);
Eo.sort((e, t) => e.setNum - t.setNum);
var vE = (e) => {
  const t = e.reduce((n, s) => {
    const i = Ne(s).chroma;
    return i !== void 0 && (n[i] = n[i] || Ne(s).name), n;
  }, {});
  return (n) => t[n];
};
function PE(e, t = {}) {
  const n = e.map((i) => Ne(i).pc).filter((i) => i);
  return Ne.length === 0 ? [] : ZE(n, 1, t).filter((i) => i.weight).sort((i, r) => r.weight - i.weight).map((i) => i.name);
}
var Nr = {
  // 3m 000100000000
  // 3M 000010000000
  anyThirds: 384,
  // 5P 000000010000
  perfectFifth: 16,
  // 5d 000000100000
  // 5A 000000001000
  nonPerfectFifths: 40,
  anySeventh: 3
}, Wr = (e) => (t) => !!(t & e), AE = Wr(Nr.anyThirds), FE = Wr(Nr.perfectFifth), XE = Wr(Nr.anySeventh), DE = Wr(Nr.nonPerfectFifths);
function SE(e) {
  const t = parseInt(e.chroma, 2);
  return AE(t) && FE(t) && XE(t);
}
function wE(e) {
  const t = parseInt(e, 2);
  return DE(t) ? e : (t | 16).toString(2);
}
function ZE(e, t, n) {
  const s = e[0], i = Ne(s).chroma, r = vE(e), a = Zo(e, false), u = [];
  return a.forEach((o, c) => {
    const l = n.assumePerfectFifth && wE(o);
    T3().filter((m) => n.assumePerfectFifth && SE(m) ? m.chroma === l : m.chroma === o).forEach((m) => {
      const g = m.aliases[0], y = r(c);
      c !== i ? u.push({
        weight: 0.5 * t,
        name: `${y}${g}/${s}`
      }) : u.push({ weight: 1 * t, name: `${y}${g}` });
    });
  }), u;
}
function zi(e) {
  return e !== null && typeof e == "object" && "name" in e && typeof e.name == "string";
}
var I3 = [0, 2, 4, 5, 7, 9, 11], _3 = ({ step: e, alt: t }) => (I3[e] + t + 120) % 12, Lo = ({ step: e, alt: t, oct: n, dir: s = 1 }) => s * (I3[e] + t + 12 * (n === void 0 ? -100 : n)), Y3 = (e) => {
  const t = Lo(e);
  return e.oct !== void 0 && t >= -12 && t <= 115 ? t + 12 : null;
};
function Tr(e) {
  return e !== null && typeof e == "object" && "step" in e && typeof e.step == "number" && "alt" in e && typeof e.alt == "number";
}
var H3 = [0, 2, 4, -1, 1, 3, 5], K3 = H3.map(
  (e) => Math.floor(e * 7 / 12)
);
function Ir(e) {
  const { step: t, alt: n, oct: s, dir: i = 1 } = e, r = H3[t] + 7 * n;
  if (s === void 0)
    return [i * r];
  const a = s - K3[t] - 4 * n;
  return [i * r, i * a];
}
var EE = [3, 0, 4, 1, 5, 2, 6];
function _r(e) {
  const [t, n, s] = e, i = EE[LE(t)], r = Math.floor((t + 1) / 7);
  if (n === void 0)
    return { step: i, alt: r, dir: s };
  const a = n + 4 * r + K3[i];
  return { step: i, alt: r, oct: a, dir: s };
}
function LE(e) {
  const t = (e + 1) % 7;
  return t < 0 ? 7 + t : t;
}
var Ml = (e, t) => Array(Math.abs(t) + 1).join(e), cu = { empty: true, name: "", acc: "" }, RE = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})", BE = "(AA|A|P|M|m|d|dd)([-+]?\\d+)", VE = new RegExp(
  "^" + RE + "|" + BE + "$"
);
function Ro(e) {
  const t = VE.exec(`${e}`);
  return t === null ? ["", ""] : t[1] ? [t[1], t[2]] : [t[4], t[3]];
}
var Cl = {};
function At(e) {
  return typeof e == "string" ? Cl[e] || (Cl[e] = kE(e)) : Tr(e) ? At(NE(e)) : zi(e) ? At(e.name) : cu;
}
var xl = [0, 2, 4, 5, 7, 9, 11], j3 = "PMMPPMM";
function kE(e) {
  const t = Ro(e);
  if (t[0] === "")
    return cu;
  const n = +t[0], s = t[1], i = (Math.abs(n) - 1) % 7, r = j3[i];
  if (r === "M" && s === "P")
    return cu;
  const a = r === "M" ? "majorable" : "perfectable", u = "" + n + s, o = n < 0 ? -1 : 1, c = n === 8 || n === -8 ? n : o * (i + 1), l = zE(a, s), p = Math.floor((Math.abs(n) - 1) / 7), m = o * (xl[i] + l + 12 * p), g = (o * (xl[i] + l) % 12 + 12) % 12, y = Ir({ step: i, alt: l, oct: p, dir: o });
  return {
    empty: false,
    name: u,
    num: n,
    q: s,
    step: i,
    alt: l,
    dir: o,
    type: a,
    simple: c,
    semitones: m,
    chroma: g,
    coord: y,
    oct: p
  };
}
function Ni(e, t) {
  const [n, s = 0] = e, i = n * 7 + s * 12 < 0, r = t || i ? [-n, -s, -1] : [n, s, 1];
  return At(_r(r));
}
function zE(e, t) {
  return t === "M" && e === "majorable" || t === "P" && e === "perfectable" ? 0 : t === "m" && e === "majorable" ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? -1 * (e === "perfectable" ? t.length : t.length + 1) : 0;
}
function NE(e) {
  const { step: t, alt: n, oct: s = 0, dir: i } = e;
  if (!i)
    return "";
  const r = t + 1 + 7 * s, a = r === 0 ? t + 1 : r, u = i < 0 ? "-" : "", o = j3[t] === "M" ? "majorable" : "perfectable";
  return u + a + WE(o, n);
}
function WE(e, t) {
  return t === 0 ? e === "majorable" ? "M" : "P" : t === -1 && e === "majorable" ? "m" : t > 0 ? Ml("A", t) : Ml("d", e === "perfectable" ? t : t + 1);
}
var Gl = (e, t) => Array(Math.abs(t) + 1).join(e), U3 = { empty: true, name: "", pc: "", acc: "" }, vl = /* @__PURE__ */ new Map(), Bo = (e) => "CDEFGAB".charAt(e), Vo = (e) => e < 0 ? Gl("b", -e) : Gl("#", e), ko = (e) => e[0] === "b" ? -e.length : e.length;
function Cn(e) {
  const t = JSON.stringify(e), n = vl.get(t);
  if (n)
    return n;
  const s = typeof e == "string" ? _E(e) : Tr(e) ? Cn(YE(e)) : zi(e) ? Cn(e.name) : U3;
  return vl.set(t, s), s;
}
var TE = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function Yr(e) {
  const t = TE.exec(e);
  return t ? [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]] : ["", "", "", ""];
}
function zo(e) {
  return Cn(_r(e));
}
var IE = (e, t) => (e % t + t) % t, Da = [0, 2, 4, 5, 7, 9, 11];
function _E(e) {
  const t = Yr(e);
  if (t[0] === "" || t[3] !== "")
    return U3;
  const n = t[0], s = t[1], i = t[2], r = (n.charCodeAt(0) + 3) % 7, a = ko(s), u = i.length ? +i : void 0, o = Ir({ step: r, alt: a, oct: u }), c = n + s + i, l = n + s, p = (Da[r] + a + 120) % 12, m = u === void 0 ? IE(Da[r] + a, 12) - 12 * 99 : Da[r] + a + 12 * (u + 1), g = m >= 0 && m <= 127 ? m : null, y = u === void 0 ? null : Math.pow(2, (m - 69) / 12) * 440;
  return {
    empty: false,
    acc: s,
    alt: a,
    chroma: p,
    coord: o,
    freq: y,
    height: m,
    letter: n,
    midi: g,
    name: c,
    oct: u,
    pc: l,
    step: r
  };
}
function YE(e) {
  const { step: t, alt: n, oct: s } = e, i = Bo(t);
  if (!i)
    return "";
  const r = i + Vo(n);
  return s || s === 0 ? r + s : r;
}
function Ns(e, t) {
  const n = Cn(e), s = Array.isArray(t) ? t : At(t).coord;
  if (n.empty || !s || s.length < 2)
    return "";
  const i = n.coord, r = i.length === 1 ? [i[0] + s[0]] : [i[0] + s[0], i[1] + s[1]];
  return zo(r).name;
}
function Hr(e, t) {
  const n = e.length;
  return (s) => {
    if (!t)
      return "";
    const i = s < 0 ? (n - -s % n) % n : s % n, r = Math.floor(s / n), a = Ns(t, [0, r]);
    return Ns(a, e[i]);
  };
}
function No(e, t) {
  const n = Cn(e), s = Cn(t);
  if (n.empty || s.empty)
    return "";
  const i = n.coord, r = s.coord, a = r[0] - i[0], u = i.length === 2 && r.length === 2 ? r[1] - i[1] : -Math.floor(a * 7 / 12), o = s.height === n.height && s.midi !== null && n.midi !== null && n.step > s.step;
  return Ni([a, u], o).name;
}
var O3 = (e, t) => Array(Math.abs(t) + 1).join(e);
function Os(e, t, n) {
  return function(...s) {
    return console.warn(`${e} is deprecated. Use ${t}.`), n.apply(this, s);
  };
}
var J3 = Os("isNamed", "isNamedPitch", zi);
const Q3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accToAlt: ko,
  altToAcc: Vo,
  chroma: _3,
  coordToInterval: Ni,
  coordToNote: zo,
  coordinates: Ir,
  deprecate: Os,
  distance: No,
  fillStr: O3,
  height: Lo,
  interval: At,
  isNamed: J3,
  isNamedPitch: zi,
  isPitch: Tr,
  midi: Y3,
  note: Cn,
  pitch: _r,
  stepToLetter: Bo,
  tokenizeInterval: Ro,
  tokenizeNote: Yr,
  tonicIntervalsTransposer: Hr,
  transpose: Ns
}, Symbol.toStringTag, { value: "Module" }));
var HE = [
  ["1P 3M 5P", "major", "M ^  maj"],
  ["1P 3M 5P 7M", "major seventh", "maj7 Δ ma7 M7 Maj7 ^7"],
  ["1P 3M 5P 7M 9M", "major ninth", "maj9 Δ9 ^9"],
  ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
  ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
  ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
  ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
  [
    "1P 3M 5P 7M 11A",
    "major seventh sharp eleventh",
    "maj#4 Δ#4 Δ#11 M7#11 ^7#11 maj7#11"
  ],
  ["1P 3m 5P", "minor", "m min -"],
  ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
  [
    "1P 3m 5P 7M",
    "minor/major seventh",
    "m/ma7 m/maj7 mM7 mMaj7 m/M7 -Δ7 mΔ -^7"
  ],
  ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
  ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
  ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
  ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
  ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
  ["1P 3m 5d", "diminished", "dim ° o"],
  ["1P 3m 5d 7d", "diminished seventh", "dim7 °7 o7"],
  ["1P 3m 5d 7m", "half-diminished", "m7b5 ø -7b5 h7 h"],
  ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
  ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
  ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
  ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
  ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
  ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
  ["1P 3M 7m 9m", "altered", "alt7"],
  ["1P 4P 5P", "suspended fourth", "sus4 sus"],
  ["1P 2M 5P", "suspended second", "sus2"],
  ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
  ["1P 5P 7m 9M 11P", "eleventh", "11"],
  [
    "1P 4P 5P 7m 9m",
    "suspended fourth flat ninth",
    "b9sus phryg 7b9sus 7b9sus4"
  ],
  ["1P 5P", "fifth", "5"],
  ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
  ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
  ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
  [
    "1P 3M 5P 7M 9M 11A",
    "major sharp eleventh (lydian)",
    "maj9#11 Δ9#11 ^9#11"
  ],
  ["1P 2M 4P 5P", "", "sus24 sus4add9"],
  ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
  ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
  ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
  ["1P 3M 5A 7m 9M", "", "9#5 9+"],
  ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
  ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
  ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
  ["1P 3M 5A 9A", "", "+add#9"],
  ["1P 3M 5A 9M", "", "M#5add9 +add9"],
  ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
  ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
  ["1P 3M 5P 6M 9M 11A", "", "69#11"],
  ["1P 3m 5P 6M 9M", "", "m69 -69"],
  ["1P 3M 5P 6m 7m", "", "7b6"],
  ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
  ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
  ["1P 3M 5P 7M 9m", "", "M7b9"],
  ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
  ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
  ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
  ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
  ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
  ["1P 3M 5P 7m 9A 13M", "", "13#9"],
  ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
  ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
  ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
  ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
  ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
  ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
  ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
  ["1P 3M 5P 7m 9m 13M", "", "13b9"],
  ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
  ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
  ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
  ["1P 3M 5P 9m", "", "Maddb9"],
  ["1P 3M 5d", "", "Mb5"],
  ["1P 3M 5d 6M 7m 9M", "", "13b5"],
  ["1P 3M 5d 7M", "", "M7b5"],
  ["1P 3M 5d 7M 9M", "", "M9b5"],
  ["1P 3M 5d 7m", "", "7b5"],
  ["1P 3M 5d 7m 9M", "", "9b5"],
  ["1P 3M 7m", "", "7no5"],
  ["1P 3M 7m 13m", "", "7b13"],
  ["1P 3M 7m 9M", "", "9no5"],
  ["1P 3M 7m 9M 13M", "", "13no5"],
  ["1P 3M 7m 9M 13m", "", "9b13"],
  ["1P 3m 4P 5P", "", "madd4"],
  ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
  ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
  ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
  ["1P 3m 5P 9M", "", "madd9"],
  ["1P 3m 5d 6M 7M", "", "o7M7"],
  ["1P 3m 5d 7M", "", "oM7"],
  ["1P 3m 6m 7M", "", "mb6M7"],
  ["1P 3m 6m 7m", "", "m7#5"],
  ["1P 3m 6m 7m 9M", "", "m9#5"],
  ["1P 3m 5A 7m 9M 11P", "", "m11A"],
  ["1P 3m 6m 9m", "", "mb6b9"],
  ["1P 2M 3m 5d 7m", "", "m9b5"],
  ["1P 4P 5A 7M", "", "M7#5sus4"],
  ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
  ["1P 4P 5A 7m", "", "7#5sus4"],
  ["1P 4P 5P 7M", "", "M7sus4"],
  ["1P 4P 5P 7M 9M", "", "M9sus4"],
  ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
  ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
  ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
  ["1P 4P 7m 10m", "", "4 quartal"],
  ["1P 5P 7m 9m 11P", "", "11b9"]
], KE = HE, jE = {
  ...On,
  name: "",
  quality: "Unknown",
  intervals: [],
  aliases: []
}, Js = [], os = {};
function Wo(e) {
  return os[e] || jE;
}
var UE = Os("ChordType.chordType", "ChordType.get", Wo);
function OE() {
  return Js.map((e) => e.name).filter((e) => e);
}
function JE() {
  return Js.map((e) => e.aliases[0]).filter((e) => e);
}
function QE() {
  return Object.keys(os);
}
function Kr() {
  return Js.slice();
}
var qE = Os("ChordType.entries", "ChordType.all", Kr);
function $E() {
  Js = [], os = {};
}
function q3(e, t, n) {
  const s = tL(e), i = {
    ...Gt(e),
    name: n || "",
    quality: s,
    intervals: e,
    aliases: t
  };
  Js.push(i), i.name && (os[i.name] = i), os[i.setNum] = i, os[i.chroma] = i, i.aliases.forEach((r) => eL(i, r));
}
function eL(e, t) {
  os[t] = e;
}
function tL(e) {
  const t = (n) => e.indexOf(n) !== -1;
  return t("5A") ? "Augmented" : t("3M") ? "Major" : t("5d") ? "Diminished" : t("3m") ? "Minor" : "Unknown";
}
KE.forEach(
  ([e, t, n]) => q3(e.split(" "), n.split(" "), t)
);
Js.sort((e, t) => e.setNum - t.setNum);
var $3 = {
  names: OE,
  symbols: JE,
  get: Wo,
  all: Kr,
  add: q3,
  removeAll: $E,
  keys: QE,
  entries: qE,
  chordType: UE
}, nL = [
  // Basic scales
  ["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"],
  ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"],
  ["1P 2M 3m 4P 5P 6m 7m", "minor", "aeolian"],
  // Jazz common scales
  ["1P 2M 3m 3M 5P 6M", "major blues"],
  ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"],
  ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"],
  ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"],
  ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"],
  ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"],
  // Modes
  ["1P 2M 3m 4P 5P 6M 7m", "dorian"],
  ["1P 2M 3M 4A 5P 6M 7M", "lydian"],
  ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"],
  ["1P 2m 3m 4P 5P 6m 7m", "phrygian"],
  ["1P 2m 3m 4P 5d 6m 7m", "locrian"],
  // 5-note scales
  ["1P 3M 4P 5P 7M", "ionian pentatonic"],
  ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"],
  ["1P 2M 4P 5P 6M", "ritusen"],
  ["1P 2M 4P 5P 7m", "egyptian"],
  ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"],
  ["1P 3m 4P 5P 6m", "vietnamese 1"],
  ["1P 2m 3m 5P 6m", "pelog"],
  ["1P 2m 4P 5P 6m", "kumoijoshi"],
  ["1P 2M 3m 5P 6m", "hirajoshi"],
  ["1P 2m 4P 5d 7m", "iwato"],
  ["1P 2m 4P 5P 7m", "in-sen"],
  ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"],
  ["1P 3m 4P 6m 7m", "malkos raga"],
  ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"],
  ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"],
  ["1P 3m 4P 5P 6M", "minor six pentatonic"],
  ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"],
  ["1P 2M 3M 5P 6m", "flat six pentatonic"],
  ["1P 2m 3M 5P 6M", "scriabin"],
  ["1P 3M 5d 6m 7m", "whole tone pentatonic"],
  ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"],
  ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"],
  ["1P 3m 4P 5P 7M", "minor #7M pentatonic"],
  ["1P 3m 4d 5d 7m", "super locrian pentatonic"],
  // 6-note scales
  ["1P 2M 3m 4P 5P 7M", "minor hexatonic"],
  ["1P 2A 3M 5P 5A 7M", "augmented"],
  ["1P 2M 4P 5P 6M 7m", "piongio"],
  ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"],
  ["1P 2M 3M 4A 6M 7m", "prometheus"],
  ["1P 2m 3M 5d 6m 7m", "mystery #1"],
  ["1P 2m 3M 4P 5A 6M", "six tone symmetric"],
  ["1P 2M 3M 4A 5A 6A", "whole tone", "messiaen's mode #1"],
  ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"],
  // 7-note scales
  ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"],
  ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"],
  [
    "1P 2m 2A 3M 4A 6m 7m",
    "altered",
    "super locrian",
    "diminished whole tone",
    "pomeroy"
  ],
  ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"],
  [
    "1P 2M 3M 4P 5P 6m 7m",
    "mixolydian b6",
    "melodic minor fifth mode",
    "hindu"
  ],
  ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"],
  ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"],
  [
    "1P 2m 3m 4P 5P 6M 7m",
    "dorian b2",
    "phrygian #6",
    "melodic minor second mode"
  ],
  [
    "1P 2m 3m 4d 5d 6m 7d",
    "ultralocrian",
    "superlocrian bb7",
    "superlocrian diminished"
  ],
  ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"],
  ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"],
  // Source https://en.wikipedia.org/wiki/Ukrainian_Dorian_scale
  [
    "1P 2M 3m 4A 5P 6M 7m",
    "dorian #4",
    "ukrainian dorian",
    "romanian minor",
    "altered dorian"
  ],
  ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"],
  ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"],
  ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"],
  ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"],
  ["1P 2m 3m 4P 5P 6m 7M", "balinese"],
  ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"],
  ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"],
  ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"],
  ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"],
  ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"],
  ["1P 2m 3M 4P 5d 6M 7m", "oriental"],
  ["1P 2m 3m 3M 4A 5P 7m", "flamenco"],
  ["1P 2m 3m 4A 5P 6m 7M", "todi raga"],
  ["1P 2m 3M 4P 5d 6m 7M", "persian"],
  ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"],
  [
    "1P 2M 3M 4P 5A 6M 7M",
    "major augmented",
    "major #5",
    "ionian augmented",
    "ionian #5"
  ],
  ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"],
  // 8-note scales
  ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"],
  ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"],
  ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"],
  ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"],
  ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"],
  ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"],
  ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"],
  ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"],
  ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"],
  [
    "1P 2m 3m 3M 4A 5P 6M 7m",
    "half-whole diminished",
    "dominant diminished",
    "messiaen's mode #2"
  ],
  ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"],
  ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"],
  // 9-note scales
  ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"],
  ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"],
  // 10-note scales
  ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"],
  // 12-note scales
  ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]
], sL = nL, iL = {
  ...On,
  intervals: [],
  aliases: []
}, jr = [], cs = {};
function eC() {
  return jr.map((e) => e.name);
}
function Ur(e) {
  return cs[e] || iL;
}
var rL = Ur;
function Qs() {
  return jr.slice();
}
var aL = Qs;
function uL() {
  return Object.keys(cs);
}
function oL() {
  jr = [], cs = {};
}
function tC(e, t, n = []) {
  const s = { ...Gt(e), name: t, intervals: e, aliases: n };
  return jr.push(s), cs[s.name] = s, cs[s.setNum] = s, cs[s.chroma] = s, s.aliases.forEach((i) => cL(s, i)), s;
}
function cL(e, t) {
  cs[t] = e;
}
sL.forEach(
  ([e, t, ...n]) => tC(e.split(" "), t, n)
);
var nC = {
  names: eC,
  get: Ur,
  all: Qs,
  add: tC,
  removeAll: oL,
  keys: uL,
  // deprecated
  entries: aL,
  scaleType: rL
}, lu = {
  empty: true,
  name: "",
  symbol: "",
  root: "",
  rootDegree: 0,
  type: "",
  tonic: null,
  setNum: NaN,
  quality: "Unknown",
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
function To(e) {
  const [t, n, s, i] = Yr(e);
  return t === "" ? ["", e] : t === "A" && i === "ug" ? ["", "aug"] : [t + n, s + i];
}
function bs(e) {
  if (e === "")
    return lu;
  if (Array.isArray(e) && e.length === 2)
    return nr(e[1], e[0]);
  {
    const [t, n] = To(e), s = nr(n, t);
    return s.empty ? nr(e) : s;
  }
}
function nr(e, t, n) {
  const s = Wo(e), i = Cn(t || ""), r = Cn(n || "");
  if (s.empty || t && i.empty || n && r.empty)
    return lu;
  const a = No(i.pc, r.pc), u = s.intervals.indexOf(a) + 1;
  if (!r.empty && !u)
    return lu;
  const o = Array.from(s.intervals);
  for (let m = 1; m < u; m++) {
    const g = o[0][0], y = o[0][1], x = parseInt(g, 10) + 7;
    o.push(`${x}${y}`), o.shift();
  }
  const c = i.empty ? [] : o.map((m) => Ns(i, m));
  e = s.aliases.indexOf(e) !== -1 ? e : s.aliases[0];
  const l = `${i.empty ? "" : i.pc}${e}${r.empty || u <= 1 ? "" : "/" + r.pc}`, p = `${t ? i.pc + " " : ""}${s.name}${u > 1 && n ? " over " + r.pc : ""}`;
  return {
    ...s,
    name: p,
    symbol: l,
    type: s.name,
    root: r.name,
    intervals: o,
    rootDegree: u,
    tonic: i.name,
    notes: c
  };
}
var lL = Os("Chord.chord", "Chord.get", bs);
function dL(e, t) {
  const [n, s] = To(e);
  return n ? Ns(n, t) + s : e;
}
function hL(e) {
  const t = bs(e), n = zr(t.chroma);
  return Qs().filter((s) => n(s.chroma)).map((s) => s.name);
}
function pL(e) {
  const t = bs(e), n = zr(t.chroma);
  return Kr().filter((s) => n(s.chroma)).map((s) => t.tonic + s.aliases[0]);
}
function mL(e) {
  const t = bs(e), n = kr(t.chroma);
  return Kr().filter((s) => n(s.chroma)).map((s) => t.tonic + s.aliases[0]);
}
function fL(e) {
  const { intervals: t, tonic: n } = bs(e), s = Hr(t, n);
  return (i) => i ? s(i > 0 ? i - 1 : i) : "";
}
function yL(e) {
  const { intervals: t, tonic: n } = bs(e);
  return Hr(t, n);
}
var gL = {
  getChord: nr,
  get: bs,
  detect: PE,
  chordScales: hL,
  extended: pL,
  reduced: mL,
  tokenize: To,
  transpose: dL,
  degrees: fL,
  steps: yL,
  chord: lL
}, bL = [
  [
    0.125,
    "dl",
    ["large", "duplex longa", "maxima", "octuple", "octuple whole"]
  ],
  [0.25, "l", ["long", "longa"]],
  [0.5, "d", ["double whole", "double", "breve"]],
  [1, "w", ["whole", "semibreve"]],
  [2, "h", ["half", "minim"]],
  [4, "q", ["quarter", "crotchet"]],
  [8, "e", ["eighth", "quaver"]],
  [16, "s", ["sixteenth", "semiquaver"]],
  [32, "t", ["thirty-second", "demisemiquaver"]],
  [64, "sf", ["sixty-fourth", "hemidemisemiquaver"]],
  [128, "h", ["hundred twenty-eighth"]],
  [256, "th", ["two hundred fifty-sixth"]]
], ML = bL, Or = [];
ML.forEach(
  ([e, t, n]) => XL(e, t, n)
);
var CL = {
  empty: true,
  name: "",
  value: 0,
  fraction: [0, 0],
  shorthand: "",
  dots: "",
  names: []
};
function xL() {
  return Or.reduce((e, t) => (t.names.forEach((n) => e.push(n)), e), []);
}
function GL() {
  return Or.map((e) => e.shorthand);
}
var vL = /^([^.]+)(\.*)$/;
function Io(e) {
  const [t, n, s] = vL.exec(e) || [], i = Or.find(
    (u) => u.shorthand === n || u.names.includes(n)
  );
  if (!i)
    return CL;
  const r = DL(i.fraction, s.length), a = r[0] / r[1];
  return { ...i, name: e, dots: s, value: a, fraction: r };
}
var PL = (e) => Io(e).value, AL = (e) => Io(e).fraction, FL = { names: xL, shorthands: GL, get: Io, value: PL, fraction: AL };
function XL(e, t, n) {
  Or.push({
    empty: false,
    dots: "",
    name: "",
    value: 1 / e,
    fraction: e < 1 ? [1 / e, 1] : [1, e],
    shorthand: t,
    names: n
  });
}
function DL(e, t) {
  const n = Math.pow(2, t);
  let s = e[0] * n, i = e[1] * n;
  const r = s;
  for (let a = 0; a < t; a++)
    s += r / Math.pow(2, a + 1);
  for (; s % 2 === 0 && i % 2 === 0; )
    s /= 2, i /= 2;
  return [s, i];
}
function SL() {
  return "1P 2M 3M 4P 5P 6m 7m".split(" ");
}
var sC = At, wL = (e) => At(e).name, ZL = (e) => At(e).semitones, EL = (e) => At(e).q, LL = (e) => At(e).num;
function RL(e) {
  const t = At(e);
  return t.empty ? "" : t.simple + t.q;
}
function BL(e) {
  const t = At(e);
  if (t.empty)
    return "";
  const n = (7 - t.step) % 7, s = t.type === "perfectable" ? -t.alt : -(t.alt + 1);
  return At({ step: n, alt: s, oct: t.oct, dir: t.dir }).name;
}
var VL = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7], kL = "P m M m M P d P m M m M".split(" ");
function zL(e) {
  const t = e < 0 ? -1 : 1, n = Math.abs(e), s = n % 12, i = Math.floor(n / 12);
  return t * (VL[s] + 7 * i) + kL[s];
}
var NL = Br, iC = rC((e, t) => [e[0] + t[0], e[1] + t[1]]), WL = (e) => (t) => iC(e, t), TL = rC((e, t) => [e[0] - t[0], e[1] - t[1]]);
function IL(e, t) {
  const n = sC(e);
  if (n.empty)
    return "";
  const [s, i, r] = n.coord;
  return Ni([s + t, i, r]).name;
}
var ps = {
  names: SL,
  get: sC,
  name: wL,
  num: LL,
  semitones: ZL,
  quality: EL,
  fromSemitones: zL,
  distance: NL,
  invert: BL,
  simplify: RL,
  add: iC,
  addTo: WL,
  substract: TL,
  transposeFifths: IL
};
function rC(e) {
  return (t, n) => {
    const s = At(t).coord, i = At(n).coord;
    if (s && i) {
      const r = e(s, i);
      return Ni(r).name;
    }
  };
}
function aC(e) {
  return +e >= 0 && +e <= 127;
}
function uC(e) {
  if (aC(e))
    return +e;
  const t = Ne(e);
  return t.empty ? null : t.midi;
}
function _L(e, t = 440) {
  return Math.pow(2, (e - 69) / 12) * t;
}
var YL = Math.log(2), HL = Math.log(440);
function _o(e) {
  const t = 12 * (Math.log(e) - HL) / YL + 69;
  return Math.round(t * 100) / 100;
}
var KL = "C C# D D# E F F# G G# A A# B".split(" "), jL = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
function es(e, t = {}) {
  if (isNaN(e) || e === -1 / 0 || e === 1 / 0) return "";
  e = Math.round(e);
  const s = (t.sharps === true ? KL : jL)[e % 12];
  if (t.pitchClass)
    return s;
  const i = Math.floor(e / 12) - 1;
  return s + i;
}
function Yo(e) {
  return e % 12;
}
function UL(e) {
  return e.split("").reduce((t, n, s) => (s < 12 && n === "1" && t.push(s), t), []);
}
function OL(e) {
  return e.map(Yo).sort((t, n) => t - n).filter((t, n, s) => n === 0 || t !== s[n - 1]);
}
function Ho(e) {
  return Array.isArray(e) ? OL(e) : UL(e);
}
function JL(e) {
  const t = Ho(e);
  return (n) => {
    const s = Yo(n);
    for (let i = 0; i < 12; i++) {
      if (t.includes(s + i)) return n + i;
      if (t.includes(s - i)) return n - i;
    }
  };
}
function oC(e, t) {
  const n = Ho(e), s = n.length;
  return (i) => {
    const r = i < 0 ? (s - -i % s) % s : i % s, a = Math.floor(i / s);
    return n[r] + a * 12 + t;
  };
}
function QL(e, t) {
  const n = oC(e, t);
  return (s) => {
    if (s !== 0)
      return n(s > 0 ? s - 1 : s);
  };
}
var qL = {
  chroma: Yo,
  freqToMidi: _o,
  isMidi: aC,
  midiToFreq: _L,
  midiToNoteName: es,
  pcsetNearest: JL,
  pcset: Ho,
  pcsetDegrees: QL,
  pcsetSteps: oC,
  toMidi: uC
}, $L = ["C", "D", "E", "F", "G", "A", "B"], cC = (e) => e.name, lC = (e) => e.map(Ne).filter((t) => !t.empty);
function eR(e) {
  return e === void 0 ? $L.slice() : Array.isArray(e) ? lC(e).map(cC) : [];
}
var ln = Ne, tR = (e) => ln(e).name, nR = (e) => ln(e).pc, sR = (e) => ln(e).acc, iR = (e) => ln(e).oct, rR = (e) => ln(e).midi, aR = (e) => ln(e).freq, uR = (e) => ln(e).chroma;
function dC(e) {
  return es(e);
}
function oR(e) {
  return es(_o(e));
}
function cR(e) {
  return es(_o(e), { sharps: true });
}
function lR(e) {
  return es(e, { sharps: true });
}
var dR = Br, un = cn, hR = cn, hC = (e) => (t) => un(t, e), pR = hC, pC = (e) => (t) => un(e, t), mR = pC;
function fr(e, t) {
  return un(e, [t, 0]);
}
var fR = fr;
function yR(e, t) {
  return un(e, [0, t]);
}
var Ko = (e, t) => e.height - t.height, gR = (e, t) => t.height - e.height;
function mC(e, t) {
  return t = t || Ko, lC(e).sort(t).map(cC);
}
function fC(e) {
  return mC(e, Ko).filter(
    (t, n, s) => n === 0 || t !== s[n - 1]
  );
}
var bR = (e) => {
  const t = ln(e);
  return t.empty ? "" : es(t.midi || t.chroma, {
    sharps: t.alt > 0,
    pitchClass: t.midi === null
  });
};
function yC(e, t) {
  const n = ln(e);
  if (n.empty)
    return "";
  const s = ln(
    t || es(n.midi || n.chroma, {
      sharps: n.alt < 0,
      pitchClass: true
    })
  );
  if (s.empty || s.chroma !== n.chroma)
    return "";
  if (n.oct === void 0)
    return s.pc;
  const i = n.chroma - n.alt, r = s.chroma - s.alt, a = i > 11 || r < 0 ? -1 : i < 0 || r > 11 ? 1 : 0, u = n.oct + a;
  return s.pc + u;
}
var fn = {
  names: eR,
  get: ln,
  name: tR,
  pitchClass: nR,
  accidentals: sR,
  octave: iR,
  midi: rR,
  ascending: Ko,
  descending: gR,
  distance: dR,
  sortedNames: mC,
  sortedUniqNames: fC,
  fromMidi: dC,
  fromMidiSharps: lR,
  freq: aR,
  fromFreq: oR,
  fromFreqSharps: cR,
  chroma: uR,
  transpose: un,
  tr: hR,
  transposeBy: hC,
  trBy: pR,
  transposeFrom: pC,
  trFrom: mR,
  transposeFifths: fr,
  transposeOctaves: yR,
  trFifths: fR,
  simplify: bR,
  enharmonic: yC
}, gC = { empty: true, name: "", chordType: "" }, Pl = {};
function Jn(e) {
  return typeof e == "string" ? Pl[e] || (Pl[e] = AR(e)) : typeof e == "number" ? Jn(Jr[e] || "") : Ao(e) ? xR(e) : Po(e) ? Jn(e.name) : gC;
}
var MR = Jn;
function CR(e = true) {
  return (e ? Jr : PR).slice();
}
function xR(e) {
  return Jn(Rr(e.alt) + Jr[e.step]);
}
var GR = /^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;
function vR(e) {
  return GR.exec(e) || ["", "", "", ""];
}
var bC = "I II III IV V VI VII", Jr = bC.split(" "), PR = bC.toLowerCase().split(" ");
function AR(e) {
  const [t, n, s, i] = vR(e);
  if (!s)
    return gC;
  const r = s.toUpperCase(), a = Jr.indexOf(r), u = Fo(n), o = 1;
  return {
    empty: false,
    name: t,
    roman: s,
    interval: Mn({ step: a, alt: u, dir: o }).name,
    acc: n,
    chordType: i,
    alt: u,
    step: a,
    major: s === r,
    oct: 0,
    dir: o
  };
}
var FR = {
  names: CR,
  get: Jn,
  // deprecated
  romanNumeral: MR
}, xt = Object.freeze([]), MC = {
  type: "major",
  tonic: "",
  alteration: 0,
  keySignature: ""
}, sr = {
  tonic: "",
  grades: xt,
  intervals: xt,
  scale: xt,
  triads: xt,
  chords: xt,
  chordsHarmonicFunction: xt,
  chordScales: xt,
  secondaryDominants: xt,
  secondaryDominantSupertonics: xt,
  substituteDominantsMinorRelative: xt,
  substituteDominants: xt,
  substituteDominantSupertonics: xt,
  secondaryDominantsMinorRelative: xt
}, XR = {
  ...MC,
  ...sr,
  type: "major",
  minorRelative: "",
  scale: xt,
  substituteDominants: xt,
  secondaryDominantSupertonics: xt,
  substituteDominantsMinorRelative: xt
}, DR = {
  ...MC,
  type: "minor",
  relativeMajor: "",
  natural: sr,
  harmonic: sr,
  melodic: sr
}, Sa = (e, t, n = "") => t.map((s, i) => `${e[i]}${n}${s}`);
function Qr(e, t, n, s, i) {
  return (r) => {
    const a = e.map((g) => Jn(g).interval || ""), u = a.map((g) => un(r, g)), o = Sa(u, n), c = u.map((g) => un(g, "5P")).map(
      (g) => (
        // A secondary dominant is a V chord which:
        // 1. is not diatonic to the key,
        // 2. it must have a diatonic root.
        u.includes(g) && !o.includes(g + "7") ? g + "7" : ""
      )
    ), l = Al(
      c,
      t
    ), p = c.map((g) => {
      if (!g) return "";
      const y = g.slice(0, -1);
      return un(y, "5d") + "7";
    }), m = Al(
      p,
      t
    );
    return {
      tonic: r,
      grades: e,
      intervals: a,
      scale: u,
      triads: Sa(u, t),
      chords: o,
      chordsHarmonicFunction: s.slice(),
      chordScales: Sa(u, i, " "),
      secondaryDominants: c,
      secondaryDominantSupertonics: l,
      substituteDominants: p,
      substituteDominantSupertonics: m,
      // @deprecated use secondaryDominantsSupertonic
      secondaryDominantsMinorRelative: l,
      // @deprecated use secondaryDominantsSupertonic
      substituteDominantsMinorRelative: m
    };
  };
}
var Al = (e, t) => e.map((n, s) => {
  if (!n) return "";
  const i = n.slice(0, -1), r = un(i, "5P");
  return t[s].endsWith("m") ? r + "m7" : r + "m7b5";
}), CC = (e, t) => {
  const n = Ne(e), s = Ne(t);
  return n.empty || s.empty ? 0 : s.coord[0] - n.coord[0];
}, SR = Qr(
  "I II III IV V VI VII".split(" "),
  " m m   m dim".split(" "),
  "maj7 m7 m7 maj7 7 m7 m7b5".split(" "),
  "T SD T SD D T D".split(" "),
  "major,dorian,phrygian,lydian,mixolydian,minor,locrian".split(",")
), wR = Qr(
  "I II bIII IV V bVI bVII".split(" "),
  "m dim  m m  ".split(" "),
  "m7 m7b5 maj7 m7 m7 maj7 7".split(" "),
  "T SD T SD D SD SD".split(" "),
  "minor,locrian,major,dorian,phrygian,lydian,mixolydian".split(",")
), ZR = Qr(
  "I II bIII IV V bVI VII".split(" "),
  "m dim aug m   dim".split(" "),
  "mMaj7 m7b5 +maj7 m7 7 maj7 o7".split(" "),
  "T SD T SD D SD D".split(" "),
  "harmonic minor,locrian 6,major augmented,lydian diminished,phrygian dominant,lydian #9,ultralocrian".split(
    ","
  )
), ER = Qr(
  "I II bIII IV V VI VII".split(" "),
  "m m aug   dim dim".split(" "),
  "m6 m7 +maj7 7 7 m7b5 m7b5".split(" "),
  "T SD T SD D  ".split(" "),
  "melodic minor,dorian b2,lydian augmented,lydian dominant,mixolydian b6,locrian #2,altered".split(
    ","
  )
);
function LR(e) {
  const t = Ne(e).pc;
  if (!t) return XR;
  const n = SR(t), s = CC("C", t);
  return {
    ...n,
    type: "major",
    minorRelative: un(t, "-3m"),
    alteration: s,
    keySignature: Rr(s)
  };
}
function RR(e) {
  const t = Ne(e).pc;
  if (!t) return DR;
  const n = CC("C", t) - 3;
  return {
    type: "minor",
    tonic: t,
    relativeMajor: un(t, "3m"),
    alteration: n,
    keySignature: Rr(n),
    natural: wR(t),
    harmonic: ZR(t),
    melodic: ER(t)
  };
}
function BR(e) {
  return typeof e == "number" ? fr("C", e) : typeof e == "string" && /^b+|#+$/.test(e) ? fr("C", Fo(e)) : null;
}
var VR = { majorKey: LR, majorTonicFromKeySignature: BR, minorKey: RR }, kR = Mn;
function zR(e) {
  const t = Mn(e);
  return t.empty ? "" : t.simple + t.q;
}
function NR(e, t) {
  const n = kR(e);
  if (n.empty) return "";
  const [s, i, r] = n.coord;
  return w3([s + t, i, r]).name;
}
var jo = [
  [0, 2773, 0, "ionian", "", "Maj7", "major"],
  [1, 2902, 2, "dorian", "m", "m7"],
  [2, 3418, 4, "phrygian", "m", "m7"],
  [3, 2741, -1, "lydian", "", "Maj7"],
  [4, 2774, 1, "mixolydian", "", "7"],
  [5, 2906, 3, "aeolian", "m", "m7", "minor"],
  [6, 3434, 5, "locrian", "dim", "m7b5"]
], Fl = {
  ...On,
  name: "",
  alt: 0,
  modeNum: NaN,
  triad: "",
  seventh: "",
  aliases: []
}, Uo = jo.map(_R), du = {};
Uo.forEach((e) => {
  du[e.name] = e, e.aliases.forEach((t) => {
    du[t] = e;
  });
});
function ms(e) {
  return typeof e == "string" ? du[e.toLowerCase()] || Fl : e && e.name ? ms(e.name) : Fl;
}
var WR = ms;
function xC() {
  return Uo.slice();
}
var TR = xC;
function IR() {
  return Uo.map((e) => e.name);
}
function _R(e) {
  const [t, n, s, i, r, a, u] = e, o = u ? [u] : [], c = Number(n).toString(2);
  return {
    empty: false,
    intervals: Ur(i).intervals,
    modeNum: t,
    chroma: c,
    normalized: c,
    name: i,
    setNum: n,
    alt: s,
    triad: r,
    seventh: a,
    aliases: o
  };
}
function YR(e, t) {
  return ms(e).intervals.map((n) => cn(t, n));
}
function GC(e) {
  return (t, n) => {
    const s = ms(t);
    if (s.empty) return [];
    const i = Us(s.modeNum, e), r = s.intervals.map((a) => cn(n, a));
    return i.map((a, u) => r[u] + a);
  };
}
var HR = GC(jo.map((e) => e[4])), KR = GC(jo.map((e) => e[5]));
function vC(e, t) {
  const n = ms(t), s = ms(e);
  return n.empty || s.empty ? "" : zR(NR("1P", s.alt - n.alt));
}
function jR(e, t, n) {
  return cn(n, vC(e, t));
}
var UR = {
  get: ms,
  names: IR,
  all: xC,
  distance: vC,
  relativeTonic: jR,
  notes: YR,
  triads: HR,
  seventhChords: KR,
  // deprecated
  entries: TR,
  mode: WR
};
function OR(e) {
  const [t, n, s, i] = Xo(e);
  return t === "" ? wa("", e) : t === "A" && i === "ug" ? wa("", "aug") : wa(t + n, s + i);
}
function wa(e, t) {
  const n = t.split("/");
  if (n.length === 1)
    return [e, n[0], ""];
  const [s, i, r, a] = Xo(n[1]);
  return s !== "" && r === "" && a === "" ? [e, n[0], s + i] : [e, t, ""];
}
function JR(e, t) {
  return t.map(Jn).map(
    (s) => cn(e, Mn(s)) + s.chordType
  );
}
function QR(e, t) {
  return t.map((n) => {
    const [s, i] = OR(n), r = Br(e, s);
    return Jn(Mn(r)).name + i;
  });
}
var qR = { fromRomanNumerals: JR, toRomanNumerals: QR };
function PC(e) {
  const t = Do(
    e.map((n) => typeof n == "number" ? n : uC(n))
  );
  return !e.length || t.length !== e.length ? [] : t.reduce(
    (n, s) => {
      const i = n[n.length - 1];
      return n.concat(Vr(i, s).slice(1));
    },
    [t[0]]
  );
}
function $R(e, t) {
  return PC(e).map((n) => es(n, t));
}
var eB = { numeric: PC, chromatic: $R }, tB = {
  empty: true,
  name: "",
  type: "",
  tonic: null,
  setNum: NaN,
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
function AC(e) {
  if (typeof e != "string")
    return ["", ""];
  const t = e.indexOf(" "), n = Ne(e.substring(0, t));
  if (n.empty) {
    const i = Ne(e);
    return i.empty ? ["", e] : [i.name, ""];
  }
  const s = e.substring(n.name.length + 1).toLowerCase();
  return [n.name, s.length ? s : ""];
}
var nB = eC;
function xn(e) {
  const t = Array.isArray(e) ? e : AC(e), n = Ne(t[0]).name, s = Ur(t[1]);
  if (s.empty)
    return tB;
  const i = s.name, r = n ? s.intervals.map((u) => cn(n, u)) : [], a = n ? n + " " + i : i;
  return { ...s, name: a, type: i, tonic: n, notes: r };
}
var sB = xn;
function iB(e, t = {}) {
  const n = z3(e), s = Ne(t.tonic ?? e[0] ?? ""), i = s.chroma;
  if (i === void 0)
    return [];
  const r = n.split("");
  r[i] = "1";
  const a = Us(i, r).join(""), u = Qs().find((c) => c.chroma === a), o = [];
  return u && o.push(s.name + " " + u.name), t.match === "exact" || FC(a).forEach((c) => {
    o.push(s.name + " " + c);
  }), o;
}
function rB(e) {
  const t = xn(e), n = kr(t.chroma);
  return T3().filter((s) => n(s.chroma)).map((s) => s.aliases[0]);
}
function FC(e) {
  const t = wo(e) ? e : xn(e).chroma, n = zr(t);
  return Qs().filter((s) => n(s.chroma)).map((s) => s.name);
}
function aB(e) {
  const t = kr(xn(e).chroma);
  return Qs().filter((n) => t(n.chroma)).map((n) => n.name);
}
function XC(e) {
  const t = e.map((i) => Ne(i).pc).filter((i) => i), n = t[0], s = fC(t);
  return Us(s.indexOf(n), s);
}
function uB(e) {
  const t = xn(e);
  if (t.empty)
    return [];
  const n = t.tonic ? t.notes : t.intervals;
  return Zo(t.chroma).map((s, i) => {
    const r = xn(s).name;
    return r ? [n[i], r] : ["", ""];
  }).filter((s) => s[0]);
}
function oB(e) {
  const t = Array.isArray(e) ? XC(e) : xn(e).notes, n = t.map((s) => Ne(s).chroma);
  return (s) => {
    const i = Ne(typeof s == "number" ? dC(s) : s), r = i.height;
    if (r === void 0) return;
    const a = r % 12, u = n.indexOf(a);
    if (u !== -1)
      return yC(i.name, t[u]);
  };
}
function cB(e) {
  const t = oB(e);
  return (n, s) => {
    const i = Ne(n).height, r = Ne(s).height;
    return i === void 0 || r === void 0 ? [] : Vr(i, r).map(t).filter((a) => a);
  };
}
function lB(e) {
  const { intervals: t, tonic: n } = xn(e), s = E3(t, n);
  return (i) => i ? s(i > 0 ? i - 1 : i) : "";
}
function dB(e) {
  const { intervals: t, tonic: n } = xn(e);
  return E3(t, n);
}
var yr = {
  degrees: lB,
  detect: iB,
  extended: FC,
  get: xn,
  modeNames: uB,
  names: nB,
  rangeOf: cB,
  reduced: aB,
  scaleChords: rB,
  scaleNotes: XC,
  steps: dB,
  tokenize: AC,
  // deprecated
  scale: sB
}, hB = {
  empty: true,
  name: "",
  upper: void 0,
  lower: void 0,
  type: void 0,
  additive: []
}, pB = ["4/4", "3/4", "2/4", "2/2", "12/8", "9/8", "6/8", "3/8"];
function mB() {
  return pB.slice();
}
var fB = /^(\d*\d(?:\+\d)*)\/(\d+)$/, Xl = /* @__PURE__ */ new Map();
function yB(e) {
  const t = JSON.stringify(e), n = Xl.get(t);
  if (n)
    return n;
  const s = MB(Oo(e));
  return Xl.set(t, s), s;
}
function Oo(e) {
  if (typeof e == "string") {
    const [r, a, u] = fB.exec(e) || [];
    return Oo([a, u]);
  }
  const [t, n] = e, s = +n;
  if (typeof t == "number")
    return [t, s];
  const i = t.split("+").map((r) => +r);
  return i.length === 1 ? [i[0], s] : [i, s];
}
var gB = { names: mB, parse: Oo, get: yB }, bB = (e) => Math.log(e) / Math.log(2) % 1 === 0;
function MB([e, t]) {
  const n = Array.isArray(e) ? e.reduce((u, o) => u + o, 0) : e, s = t;
  if (n === 0 || s === 0)
    return hB;
  const i = Array.isArray(e) ? `${e.join("+")}/${t}` : `${e}/${t}`, r = Array.isArray(e) ? e : [], a = s === 4 || s === 2 ? "simple" : s === 8 && n % 3 === 0 ? "compound" : bB(s) ? "irregular" : "irrational";
  return {
    empty: false,
    name: i,
    type: a,
    upper: n,
    lower: s,
    additive: r
  };
}
var CB = Q3, xB = W3, GB = $3, vB = nC;
const PB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbcNotation: Y7,
  Array: q7,
  Chord: gL,
  ChordDictionary: GB,
  ChordType: $3,
  Collection: nE,
  Core: Q3,
  DurationValue: FL,
  Interval: ps,
  Key: VR,
  Midi: qL,
  Mode: UR,
  Note: fn,
  PcSet: xB,
  Pcset: W3,
  Progression: qR,
  Range: eB,
  RomanNumeral: FR,
  Scale: yr,
  ScaleDictionary: vB,
  ScaleType: nC,
  TimeSignature: gB,
  Tonal: CB,
  accToAlt: ko,
  altToAcc: Vo,
  chroma: _3,
  coordToInterval: Ni,
  coordToNote: zo,
  coordinates: Ir,
  deprecate: Os,
  distance: No,
  fillStr: O3,
  height: Lo,
  interval: At,
  isNamed: J3,
  isNamedPitch: zi,
  isPitch: Tr,
  midi: Y3,
  note: Cn,
  pitch: _r,
  stepToLetter: Bo,
  tokenizeInterval: Ro,
  tokenizeNote: Yr,
  tonicIntervalsTransposer: Hr,
  transpose: Ns
}, Symbol.toStringTag, { value: "Module" })), AB = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], FB = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"], XB = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], DB = { b: -1, "#": 1 }, SB = (e) => {
  const [t, ...n] = e.split("");
  return FB.indexOf(t.toLowerCase()) + n.reduce((s, i) => s + DB[i], 0);
};
function wB(e) {
  const t = (e || "").match(/^([A-G][b#]*)([^/]*)[/]?([A-G][b#]*)?$/);
  return t ? t.slice(1) : [];
}
const hu = (e) => e % 12, DC = (e) => {
  let t = Number(e);
  return isNaN(t) ? ps.semitones(e) : t;
}, pu = (e, t) => {
  if (typeof e == "number")
    return e;
  if (typeof e == "string")
    return yn(e, t);
}, ZB = (e, t = false) => {
  const n = Math.floor(e / 12) - 1;
  return (t ? XB : AB)[e % 12] + n;
};
function EB(e, t, n = 1) {
  e = e.map((i) => typeof i == "string" ? yn(i) : i);
  const s = Math.floor(t / e.length) * n * 12;
  return t = Ut(t, e.length), e[t] + s;
}
function SC(e, t, n) {
  let s = 0, i = 1 / 0;
  return t.forEach((r, a) => {
    const u = Math.abs(r - e);
    (!n && u < i || n && u <= i) && (s = a, i = u);
  }), s;
}
let Za = {};
function LB(e, t, n, s) {
  const [i, r] = yr.tokenize(t), a = pu(i), u = hu(a);
  if (!Za[r]) {
    const { intervals: m } = yr.get(`C ${r}`);
    Za[r] = m.map(DC);
  }
  const o = Za[r];
  if (!o)
    return null;
  let c = a;
  if (n) {
    n = pu(n, 3);
    const m = hu(n), g = Ut(m - u, 12), y = SC(g, o, s);
    e = e + y, c = n - g;
  }
  const l = Math.floor(e / o.length) * 12;
  return e = Ut(e, o.length), o[e] + c + l;
}
let Dl = {
  below: (e) => e.slice(-1)[0],
  duck: (e) => e.slice(-1)[0],
  above: (e) => e[0],
  root: (e) => e[0]
};
function RB({ chord: e, dictionary: t, offset: n = 0, n: s, mode: i = "below", anchor: r = "c5", octaves: a = 1 }) {
  const [u, o] = wB(e), c = SB(u);
  r = pu(r?.note || r, 4);
  const l = hu(r), p = t[o].map(
    (Z) => (typeof Z == "string" ? Z.split(" ") : Z).map(DC)
  );
  let m, g, y = p.map((Z, L) => {
    const R = Dl[i](Z), H = Ut(l - R - c, 12);
    return (m === void 0 || H < m) && (m = H, g = L), H;
  });
  i === "root" && (g = 0);
  const x = Math.ceil(n / p.length) * 12, v = Ut(g + n, p.length), E = p[v], w = Dl[i](E), V = r - y[v] + x, D = E.map((Z) => V - w + Z);
  let X = D.map((Z) => ZB(Z));
  return i === "duck" && (X = X.filter((Z, L) => D[L] !== r)), s !== void 0 ? [EB(X, s, a)] : X;
}
const BB = (e) => (e <= 0 ? -1 : 1) + e * 7 + "P";
function Jo(e) {
  e = e.replaceAll(":", " ");
  const t = yr.get(e), { tonic: n, empty: s } = t;
  if (s && fs(e) || s && !n)
    throw new Error(
      `Scale name ${e} is incomplete. Make sure to use ":" instead of spaces, example: .scale("C:major")`
    );
  if (s)
    throw new Error(`Invalid scale name "${e}"`);
  return t;
}
function VB(e, t) {
  e = Math.ceil(e);
  let { intervals: n, tonic: s } = Jo(t);
  s = s || "C";
  const { pc: i, oct: r = 3 } = fn.get(s), a = Math.floor(e / n.length), u = Ut(e, n.length), o = ps.add(n[u], BB(a));
  return fn.transpose(i + r, o);
}
function Sl(e, t, n) {
  let { notes: s } = Jo(e);
  if (s = s.map((p) => fn.get(p).pc), t = Number(t), isNaN(t))
    throw new Error(`scale offset "${t}" not a number`);
  const { pc: i, oct: r = 3 } = fn.get(n), a = s.indexOf(i);
  if (a === -1)
    throw new Error(`note "${n}" is not in scale "${e}"`);
  let u = a, o = r, c = i;
  const l = Math.sign(t);
  for (; Math.abs(u - a) < Math.abs(t); ) {
    u += l;
    const p = Ut(u, s.length);
    l < 0 && c[0] === "C" && (o += l), c = s[p], l > 0 && c[0] === "C" && (o += l);
  }
  return c + o;
}
const { transpose: kB, trans: zB } = B(["transpose", "trans"], function(t, n) {
  return n.withHap((s) => {
    const i = s.value.note ?? s.value;
    if (typeof i == "number") {
      let u;
      typeof t == "number" ? u = t : typeof t == "string" && (u = ps.semitones(t) || 0);
      const o = i + u;
      return typeof s.value == "object" ? s.withValue(() => ({ ...s.value, note: o })) : s.withValue(() => o);
    }
    if (typeof i != "string" || !fs(i))
      return gt(`[tonal] transpose: not a note "${i}"`, "warning"), s;
    const r = isNaN(Number(t)) ? String(t) : ps.fromSemitones(t), a = fn.transpose(i, r);
    return typeof s.value == "object" ? s.withValue(() => ({ ...s.value, note: a })) : s.withValue(() => a);
  });
}), { scaleTranspose: NB, scaleTrans: WB, strans: TB } = B(
  ["scaleTranspose", "scaleTrans", "strans"],
  function(e, t) {
    return t.withHap((n) => {
      if (!n.context.scale)
        throw new Error("can only use scaleTranspose after .scale");
      if (typeof n.value == "object")
        return n.withValue(() => ({
          ...n.value,
          note: Sl(n.context.scale, Number(e), n.value.note)
        }));
      if (typeof n.value != "string")
        throw new Error("can only use scaleTranspose with notes");
      return n.withValue(() => Sl(n.context.scale, Number(e), n.value));
    });
  }
);
function IB(e) {
  let t = Number(e), n = 0;
  if (isNaN(t)) {
    e = String(e);
    const s = /^(-?\d+)([#bsf]*)$/.exec(e);
    if (!s)
      throw new Error(`invalid scale step "${e}", expected number or integer with optional # b suffixes`);
    t = Number(s[1]);
    const i = s[2] || "";
    n = gu(i);
  }
  return [t, n];
}
let Ea = {};
function _B(e, t, n = true) {
  let s = typeof t == "string" ? yn(t) : t;
  if (Ea[e] === void 0) {
    const { intervals: p, tonic: m } = Jo(e), { pc: g } = fn.get(m), x = p.concat("8P").map((E) => fn.transpose(g + "0", E)), v = x.map(yn);
    Ea[e] = [v, x];
  }
  const [i, r] = Ea[e], a = i[0], u = Math.floor((s - a) / 12), o = i.map((p) => p + 12 * u), c = SC(s, o, n), l = r[c];
  return fn.transpose(l, ps.fromSemitones(12 * u));
}
const YB = B(
  "scale",
  function(e, t) {
    return Array.isArray(e) && (e = e.flat().join(" ")), t.withHaps((n) => (n = n.map((s) => {
      let i = s.value;
      const r = typeof i == "object";
      i = r ? i : { n: i };
      const { note: a, n: u, value: o, ...c } = i, l = a ?? u ?? o;
      if (l === void 0)
        return gt(
          `[tonal] Invalid value format for 'scale'. Value must contain n, note, or value but received keys [${Object.keys(i).join(", ")}]`,
          "error"
        ), s;
      let p;
      if (fs(l))
        p = _B(e, l), s.value = { ...c, note: p };
      else
        try {
          const [m, g] = IB(l);
          c.anchor ? p = LB(m, e, c.anchor) : p = VB(m, e), g != 0 && (p = fn.transpose(p, ps.fromSemitones(g)));
        } catch (m) {
          Si(m, "tonal");
          return;
        }
      return s.value = r ? { ...c, note: p } : p, s.setContext({ ...s.context, scale: e });
    }), ys(n)));
  },
  true,
  true
  // preserve step count
);
var La = {}, oi = {}, ci = {}, wl;
function wC() {
  if (wl) return ci;
  wl = 1, ci.__esModule = true, ci.getBestVoicing = void 0;
  function e(t) {
    var n = t.chord, s = t.range, i = t.finder, r = t.picker, a = t.lastVoicing, u = i(n, s);
    return u.length ? r(u, a) : [];
  }
  return ci.getBestVoicing = e, ci;
}
var li = {};
const ZC = /* @__PURE__ */ xZ(PB);
var di = {}, Zl;
function EC() {
  if (Zl) return di;
  Zl = 1, di.__esModule = true, di.tokenizeChord = void 0;
  function e(t) {
    var n = (t || "").match(/^([A-G][b#]*)([^\/]*)[\/]?([A-G][b#]*)?$/);
    return n ? n.slice(1) : [];
  }
  return di.tokenizeChord = e, di;
}
var El;
function HB() {
  if (El) return li;
  El = 1, li.__esModule = true, li.voicingsInRange = void 0;
  var e = ZC, t = LC(), n = EC();
  function s(i, r, a) {
    r === void 0 && (r = t.lefthand), a === void 0 && (a = ["D3", "A4"]);
    var u = (0, n.tokenizeChord)(i), o = u[0], c = u[1];
    if (!r[c])
      return [];
    var l = r[c].map(function(m) {
      return m.split(" ");
    }), p = e.Range.chromatic(a);
    return l.reduce(function(m, g) {
      var y = g.map(function(w) {
        return e.Interval.substract(w, g[0]);
      }), x = e.Note.transpose(o, g[0]), v = p.filter(function(w) {
        return e.Note.chroma(w) === e.Note.chroma(x);
      }).filter(function(w) {
        return e.Note.midi(e.Note.transpose(w, y[y.length - 1])) <= e.Note.midi(a[1]);
      }).map(function(w) {
        return e.Note.enharmonic(w, x);
      }), E = v.map(function(w) {
        return y.map(function(V) {
          return e.Note.transpose(w, V);
        });
      });
      return m.concat(E);
    }, []);
  }
  return li.voicingsInRange = s, li;
}
var Ll;
function LC() {
  return Ll || (Ll = 1, function(e) {
    var t = oi.__assign || function() {
      return t = Object.assign || function(u) {
        for (var o, c = 1, l = arguments.length; c < l; c++) {
          o = arguments[c];
          for (var p in o) Object.prototype.hasOwnProperty.call(o, p) && (u[p] = o[p]);
        }
        return u;
      }, t.apply(this, arguments);
    }, n = oi.__rest || function(u, o) {
      var c = {};
      for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && o.indexOf(l) < 0 && (c[l] = u[l]);
      if (u != null && typeof Object.getOwnPropertySymbols == "function")
        for (var p = 0, l = Object.getOwnPropertySymbols(u); p < l.length; p++)
          o.indexOf(l[p]) < 0 && Object.prototype.propertyIsEnumerable.call(u, l[p]) && (c[l[p]] = u[l[p]]);
      return c;
    };
    e.__esModule = true, e.dictionaryVoicing = e.dictionaryVoicingFinder = e.triads = e.guidetones = e.lefthand = void 0;
    var s = wC(), i = HB();
    e.lefthand = {
      m7: ["3m 5P 7m 9M", "7m 9M 10m 12P"],
      7: ["3M 6M 7m 9M", "7m 9M 10M 13M"],
      "^7": ["3M 5P 7M 9M", "7M 9M 10M 12P"],
      69: ["3M 5P 6A 9M"],
      m7b5: ["3m 5d 7m 8P", "7m 8P 10m 12d"],
      "7b9": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
      "7b13": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
      o7: ["1P 3m 5d 6M", "5d 6M 8P 10m"],
      "7#11": ["7m 9M 11A 13A"],
      "7#9": ["3M 7m 9A"],
      mM7: ["3m 5P 7M 9M", "7M 9M 10m 12P"],
      m6: ["3m 5P 6M 9M", "6M 9M 10m 12P"]
    }, e.guidetones = {
      m7: ["3m 7m", "7m 10m"],
      m9: ["3m 7m", "7m 10m"],
      7: ["3M 7m", "7m 10M"],
      "^7": ["3M 7M", "7M 10M"],
      "^9": ["3M 7M", "7M 10M"],
      69: ["3M 6M"],
      6: ["3M 6M", "6M 10M"],
      m7b5: ["3m 7m", "7m 10m"],
      "7b9": ["3M 7m", "7m 10M"],
      "7b13": ["3M 7m", "7m 10M"],
      o7: ["3m 6M", "6M 10m"],
      "7#11": ["3M 7m", "7m 10M"],
      "7#9": ["3M 7m", "7m 10M"],
      mM7: ["3m 7M", "7M 10m"],
      m6: ["3m 6M", "6M 10m"]
    }, e.triads = {
      M: ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
      m: ["1P 3m 5P", "3m 5P 8P", "5P 8P 10m"],
      o: ["1P 3m 5d", "3m 5d 8P", "5d 8P 10m"],
      aug: ["1P 3m 5A", "3m 5A 8P", "5A 8P 10m"]
    };
    var r = function(u) {
      return function(o, c) {
        return (0, i.voicingsInRange)(o, u, c);
      };
    };
    e.dictionaryVoicingFinder = r;
    var a = function(u) {
      var o = u.dictionary, c = u.range, l = n(u, ["dictionary", "range"]);
      return (0, s.getBestVoicing)(t(t({}, l), { range: c, finder: (0, e.dictionaryVoicingFinder)(o) }));
    };
    e.dictionaryVoicing = a;
  }(oi)), oi;
}
var hi = {}, Rl;
function KB() {
  if (Rl) return hi;
  Rl = 1, hi.__esModule = true, hi.minTopNoteDiff = void 0;
  var e = ZC;
  function t(n, s) {
    if (!s)
      return n[0];
    var i = function(r) {
      return Math.abs(e.Note.midi(s[s.length - 1]) - e.Note.midi(r[r.length - 1]));
    };
    return n.reduce(function(r, a) {
      return i(a) < i(r) ? a : r;
    }, n[0]);
  }
  return hi.minTopNoteDiff = t, hi;
}
var Bl;
function jB() {
  return Bl || (Bl = 1, function(e) {
    e.__esModule = true;
    var t = LC(), n = KB(), s = wC(), i = EC();
    e.default = {
      tokenizeChord: i.tokenizeChord,
      getBestVoicing: s.getBestVoicing,
      dictionaryVoicing: t.dictionaryVoicing,
      dictionaryVoicingFinder: t.dictionaryVoicingFinder,
      lefthand: t.lefthand,
      guidetones: t.guidetones,
      triads: t.triads,
      minTopNoteDiff: n.minTopNoteDiff
    };
  }(La)), La;
}
var UB = jB();
const Vl = /* @__PURE__ */ y3(UB), rs = {
  2: ["1P 5P 8P 9M", "1P 5P 8P 9M 12P", "5P 8P 9M 12P"],
  5: ["1P 5P 8P 12P", "5P 8P 12P 15P"],
  6: ["1P 5P 6M 8P 10M", "1P 5P 8P 10M 13M", "3M 5P 8P 10M 13M", "5P 8P 10M 12P 13M"],
  7: [
    "1P 5P 7m 8P 10M",
    "1P 7m 8P 10M 12P",
    "3M 7m 8P 10M 12P",
    "3M 7m 8P 10M 14m",
    "3M 7m 10M 12P 15P",
    "7m 10M 12P 14m 15P",
    "7m 10M 12P 15P 17M"
  ],
  9: [
    "1P 5P 7m 9M 10M",
    "1P 7m 9M 10M 12P",
    "3M 7m 8P 9M 12P",
    "7m 9M 10M 14m 15P",
    "3M 7m 8P 12P 16M",
    "7m 10M 12P 15P 16M"
  ],
  11: ["1P 5P 7m 9M 11P", "5P 7m 8P 9M 11P", "7m 8P 9M 11P 12P", "7m 8P 11P 12P 16M"],
  13: ["1P 6M 7m 9M 10M", "1P 7m 9M 10M 13M", "3M 7m 8P 9M 13M", "7m 8P 9M 10M 13M", "7m 9M 10M 13M 15P"],
  69: ["1P 5P 6M 9M 10M", "1P 5P 9M 10M 13M", "3M 5P 8P 9M 13M", "5P 8P 9M 10M 13M"],
  add9: ["1P 5P 8P 9M 10M", "1P 5P 9M 10M 12P", "3M 8P 9M 10M 12P", "3M 8P 9M 12P 15P", "5P 8P 9M 12P 17M"],
  "+": [
    "1P 3M 6m 8P 10M",
    "1P 6m 8P 10M 13m",
    "3M 6m 8P 10M 13m",
    "3M 8P 10M 13m 15P",
    "6m 8P 10M 13m 15P",
    "6m 10M 13m 15P 17M"
  ],
  o: ["1P 5d 8P 10m 12d", "3m 8P 10m 12d 15P", "5d 8P 10m 12d 15P"],
  h: [
    "3m 5d 7m 8P 10m",
    "1P 5d 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 7m 8P 10m 14m",
    "5d 8P 10m 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  sus: ["1P 4P 5P 8P", "1P 4P 5P 8P 11P", "5P 8P 11P 12P", "5P 8P 11P 12P 15P"],
  "^": ["1P 5P 8P 10M", "1P 5P 8P 10M 12P", "3M 5P 8P 10M 12P", "3M 8P 10M 12P 15P", "5P 8P 10M 12P 15P"],
  "-": ["1P 3m 5P 8P 10m", "1P 5P 8P 10m 12P", "3m 5P 8P 10m 12P", "5P 8P 10m 12P 15P"],
  "^7": ["1P 5P 7M 10M 12P", "1P 10M 12P 14M", "3M 8P 10M 12P 14M", "5P 8P 10M 12P 14M", "5P 8P 10M 14M 17M"],
  "-7": [
    "1P 3m 5P 7m 10m",
    "1P 5P 7m 10m 12P",
    "3m 7m 8P 10m 12P",
    "3m 7m 8P 10m 14m",
    "5P 7m 8P 10m 14m",
    "7m 10m 12P 14m 15P",
    "5P 8P 10m 14m 17m",
    "7m 10m 12P 15P 17m"
  ],
  "7sus": ["1P 5P 7m 8P 11P", "5P 8P 11P 12P 14m", "7m 8P 11P 12P 14m", "7m 11P 12P 14m 18P"],
  h7: [
    "3m 5d 7m 8P 10m",
    "1P 5d 7m 10m 12d",
    "1P 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 7m 8P 10m 14m",
    "5d 8P 10m 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  o7: [
    "1P 6M 8P 10m 12d",
    "1P 6M 10m 12d 13M",
    "3m 8P 10m 12d 13M",
    "3m 8P 12d 13M 15P",
    "5d 10m 12d 13M 15P",
    "5d 10m 13M 15P 17m",
    "6M 12d 13M 15P 17m",
    "6M 12d 15P 17m 19d"
  ],
  "^9": [
    "1P 5P 7M 9M 10M",
    "1P 7M 9M 10M 12P",
    "3M 7M 8P 9M 12P",
    "3M 7M 8P 12P 16M",
    "5P 8P 10M 14M 16M",
    "7M 8P 10M 12P 16M"
  ],
  "^13": ["1P 6M 7M 9M 10M", "1P 7M 9M 10M 13M", "3M 7M 8P 9M 13M", "3M 7M 8P 13M 16M", "7M 8P 10M 13M 16M"],
  "^7#11": ["1P 5P 7M 10M 12d", "3M 7M 8P 10M 12d", "1P 7M 10M 12d 14M", "3M 7M 8P 12d 14M", "5P 8P 10M 12d 14M"],
  "^9#11": ["1P 3M 5d 7M 9M", "1P 7M 9M 10M 12d", "3M 7M 8P 9M 12d", "3M 8P 9M 12d 14M"],
  "^7#5": ["1P 6m 7M 10M 13m", "3M 7M 8P 10M 13m", "6m 7M 8P 10M 13m"],
  "-6": [
    "1P 3m 5P 6M 8P",
    "1P 5P 6M 8P 10m",
    "3m 5P 6M 8P 10m",
    "1P 5P 8P 10m 13M",
    "3m 5P 8P 10m 13M",
    "5P 8P 10m 12P 13M",
    "5P 8P 10m 13M 15P"
  ],
  "-69": [
    "1P 3m 5P 6M 9M",
    "3m 5P 6M 8P 9M",
    "3m 6M 9M 10m 12P",
    "1P 5P 9M 10m 13M",
    "3m 5P 8P 9M 13M",
    "5P 8P 9M 10m 13M",
    "5P 8P 10m 13M 16M"
  ],
  "-^7": ["1P 3m 5P 7M 10m", "1P 5P 7M 10m 12P", "3m 7M 8P 10m 12P", "5P 7M 8P 10m 14M", "5P 8P 10m 14M 17m"],
  "-^9": ["1P 3m 5P 7M 9M", "1P 7M 9M 10m 12P", "3m 7M 8P 9M 12P", "5P 8P 9M 10m 14M"],
  "-9": [
    "1P 3m 5P 7m 9M",
    "3m 5P 7m 8P 9M",
    "3m 7m 8P 9M 12P",
    "5P 8P 9M 10m 14m",
    "3m 7m 9M 12P 15P",
    "7m 10m 12P 15P 16M"
  ],
  "-add9": ["1P 2M 3m 5P 8P", "1P 3m 5P 9M", "3m 5P 8P 9M 12P", "5P 8P 9M 10m 12P"],
  "-11": [
    "1P 3m 7m 9M 11P",
    "3m 7m 8P 9M 11P",
    "1P 4P 7m 10m 12P",
    "5P 8P 11P 14m",
    "3m 7m 9M 11P 15P",
    "5P 8P 11P 14m 16M",
    "7m 10m 12P 15P 18P"
  ],
  "-7b5": [
    "3m 5d 7m 8P 10m",
    "1P 7m 10m 12d",
    "1P 5d 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 7m 8P 10m 14m",
    "5d 8P 10m 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  h9: ["1P 7m 9M 10m 12d", "3m 7m 8P 9M 12d", "5d 8P 9M 10m 14m", "7m 10m 12d 15P 16M"],
  "-b6": ["1P 5P 6m 8P 10m", "1P 5P 8P 10m 13m", "3m 5P 8P 10m 13m", "5P 8P 10m 13m", "5P 8P 10m 13m 15P"],
  "-#5": ["1P 6m 8P 10m 13m", "3m 6m 8P 10m 13m", "6m 8P 10m 13m 15P"],
  "7b9": ["1P 3M 7m 9m 10M", "3M 7m 8P 9m 10M", "3M 7m 8P 9m 14m", "7m 9m 10M 14m 15P"],
  "7#9": ["1P 3M 7m 10m", "3M 7m 8P 10m 14m", "7m 10m 10M 14m 15P"],
  "7#11": ["1P 3M 7m 10M 12d", "3M 7m 8P 10M 12d", "7m 10M 12d 14m 15P"],
  "7b5": ["1P 3M 7m 10M 12d", "3M 7m 8P 10M 12d", "7m 10M 12d 14m 15P"],
  "7#5": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P"],
  "9#11": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9b5": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9#5": ["1P 7m 9M 10M 13m", "3M 7m 9M 10M 13m", "3M 7m 9M 13m 14m", "7m 10M 13m 14m 16M", "7m 10M 13m 16M 17M"],
  "7b13": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P"],
  "7#9#5": ["1P 3M 7m 10m 13m", "3M 7m 10m 13m 15P", "7m 10M 13m 15P 17m"],
  "7#9b5": ["1P 3M 7m 10m 12d", "3M 7m 10m 12d 15P", "7m 10M 12d 15P 17m"],
  "7#9#11": ["1P 3M 7m 10m 12d", "3M 7m 10m 12d 15P", "7m 10M 12d 15P 17m"],
  "7b9#11": ["1P 7m 9m 10M 12d", "3M 7m 8P 9m 12d", "7m 8P 10M 12d 16m"],
  "7b9b5": ["1P 7m 9m 10M 12d", "3M 7m 8P 9m 12d", "7m 8P 10M 12d 16m"],
  "7b9#5": ["1P 7m 9m 10M 13m", "3M 7m 8P 9m 13m", "7m 9m 10M 13m 15P"],
  "7b9#9": ["1P 3M 7m 9m 10m", "3M 7m 8P 9m 10m", "7m 8P 10M 16m 17m"],
  "7b9b13": ["1P 7m 9m 10M 13m", "3M 7m 8P 9m 13m", "7m 9m 10M 13m 15P"],
  "7alt": [
    "3M 7m 8P 9m 12d",
    "1P 7m 10m 10M 13m",
    "3M 7m 8P 10m 13m",
    "3M 7m 9m 12d 15P",
    "3M 7m 10m 13m 15P",
    "7m 10M 12d 15P 17m",
    "7m 10M 13m 15P 17m"
  ],
  "13#11": ["1P 6M 7m 10M 12d", "3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "13b9": ["1P 3M 6M 7m 9m", "1P 6M 7m 9m 10M", "3M 7m 9m 10M 13M", "3M 7m 10M 13M 16m", "7m 10M 13M 16m 17M"],
  "13#9": ["1P 3M 6M 7m 10m", "3M 7m 8P 10m 13M", "7m 10M 13M 14m 17m"],
  "7b9sus": ["1P 5P 7m 9m 11P", "5P 7m 8P 9m 11P", "7m 8P 11P 14m 16m"],
  "7susadd3": ["1P 4P 5P 7m 10M", "5P 8P 10M 11P 14m", "7m 11P 12P 15P 17M"],
  "9sus": ["1P 5P 7m 9M 11P", "5P 7m 8P 9M 11P", "7m 8P 9M 11P 12P", "7m 8P 11P 12P 16M"],
  "13sus": ["1P 4P 6M 7m 9M", "1P 7m 9M 11P 13M", "5P 7m 9M 11P 13M", "7m 9M 11P 13M 15P"],
  "7b13sus": ["1P 5P 7m 11P 13m", "5P 7m 8P 11P 13m", "7m 11P 13m 14m 15P"]
}, Zs = {
  2: ["1P 5P 6M 8P 9M", "1P 5P 8P 9M 12P", "5P 8P 9M 12P 13M", "5P 8P 9M 12P 15P"],
  5: ["1P 5P 8P 12P", "1P 5P 8P 9M 12P", "5P 8P 12P 15P", "5P 8P 12P 15P 16M"],
  6: ["1P 5P 6M 9M 10M", "1P 5P 9M 10M 13M", "3M 5P 9M 10M 13M", "5P 8P 9M 10M 13M", "3M 6M 9M 12P 15P"],
  7: [
    "1P 5P 7m 8P 10M",
    "1P 7m 8P 10M 12P",
    "3M 7m 8P 10M 12P",
    "3M 7m 8P 10M 14m",
    "3M 7m 10M 12P 15P",
    "7m 10M 12P 14m 15P",
    "7m 10M 12P 15P 17M",
    "7m 10M 14m 17M 19P"
  ],
  9: [
    "1P 6M 7m 9M 10M",
    "3M 7m 9M 10M 12P",
    "1P 7m 9M 10M 13M",
    "3M 7m 9M 10M 13M",
    "3M 7m 9M 12P 15P",
    "7m 10M 12P 13M 16M",
    "7m 10M 13M 16M 17M",
    "7m 10M 13M 16M 19P"
  ],
  11: [
    "1P 4P 6M 7m 9M",
    "1P 5P 7m 9M 11P",
    "4P 6M 7m 9M 11P",
    "5P 8P 9M 11P 14m",
    "7m 9M 11P 13M 15P",
    "7m 11P 12P 14m 18P"
  ],
  13: [
    "3M 7m 9M 10M 13M",
    "3M 7m 9M 13M 15P",
    "3M 7m 10M 13M 16M",
    "7m 10M 12P 13M 16M",
    "7m 10M 13M 16M 17M",
    "7m 10M 13M 16M 19P"
  ],
  69: ["1P 5P 6M 9M 10M", "1P 5P 9M 10M 13M", "3M 5P 9M 10M 13M", "5P 8P 9M 10M 13M", "3M 6M 9M 12P 15P"],
  add9: [
    "1P 5P 8P 9M 10M",
    "1P 5P 9M 10M 12P",
    "3M 8P 9M 10M 12P",
    "3M 8P 9M 12P 15P",
    "5P 8P 9M 10M 15P",
    "5P 8P 9M 12P 17M"
  ],
  "+": [
    "1P 6m 8P 9M 10M",
    "1P 6m 8P 10M 13m",
    "3M 8P 9M 10M 13m",
    "3M 8P 10M 13m 15P",
    "6m 10M 13m 15P 16M",
    "6m 10M 13m 15P 17M"
  ],
  o: [
    "1P 6M 8P 10m 12d",
    "1P 6M 10m 12d 13M",
    "3m 8P 10m 12d 13M",
    "3m 8P 12d 13M 15P",
    "5d 10m 12d 13M 15P",
    "5d 10m 13M 15P 17m",
    "6M 12d 13M 15P 17m",
    "6M 12d 15P 17m 19d"
  ],
  h: [
    "1P 5d 7m 10m 11P",
    "3m 5d 7m 8P 11P",
    "5d 7m 8P 10m 11P",
    "1P 7m 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 8P 10m 11P 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  sus: [
    "1P 4P 5P 8P 9M",
    "1P 4P 5P 8P 11P",
    "1P 5P 8P 9M 11P",
    "5P 8P 9M 11P 12P",
    "5P 8P 11P 12P 13M",
    "5P 8P 11P 13M 15P"
  ],
  "^": [
    "1P 3M 5P 6M 9M",
    "1P 5P 8P 10M 12P",
    "3M 5P 9M 10M 12P",
    "1P 5P 8P 10M 13M",
    "3M 8P 10M 13M 15P",
    "5P 9M 10M 12P 15P"
  ],
  "-": [
    "1P 3m 5P 8P 10m",
    "1P 3m 5P 9M 11P",
    "3m 5P 8P 9M 11P",
    "5P 8P 9M 10m 11P",
    "1P 5P 9M 10m 12P",
    "3m 5P 8P 10m 12P",
    "5P 8P 10m 12P 15P"
  ],
  "^7": [
    "1P 6M 7M 9M 10M",
    "3M 7M 9M 10M 12P",
    "1P 7M 9M 10M 13M",
    "3M 7M 9M 10M 13M",
    "3M 7M 9M 12P 13M",
    "3M 7M 9M 13M 14M",
    "3M 7M 10M 13M 16M",
    "7M 10M 13M 14M 16M",
    "7M 10M 13M 16M 17M",
    "7M 10M 13M 16M 19P"
  ],
  "-7": [
    "1P 3m 5P 7m 9M",
    "1P 3m 5P 7m 10m",
    "1P 5P 7m 10m 11P",
    "3m 7m 8P 10m 11P",
    "1P 5P 7m 10m 12P",
    "3m 7m 9M 10m 12P",
    "3m 7m 8P 10m 14m",
    "5P 7m 9M 10m 14m",
    "7m 10m 11P 14m 15P",
    "7m 10m 12P 15P 16M",
    "5P 8P 11P 14m 17m",
    "7m 10m 12P 15P 17m"
  ],
  "7sus": [
    "1P 4P 6M 7m 9M",
    "1P 5P 7m 9M 11P",
    "4P 6M 7m 9M 11P",
    "5P 8P 9M 11P 14m",
    "7m 9M 11P 13M 15P",
    "7m 11P 12P 14m 18P"
  ],
  h7: [
    "1P 5d 7m 10m 11P",
    "3m 5d 7m 8P 11P",
    "5d 7m 8P 10m 11P",
    "1P 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 8P 10m 11P 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  o7: [
    "1P 6M 8P 10m 12d",
    "1P 6M 10m 12d 13M",
    "3m 8P 10m 12d 13M",
    "3m 8P 12d 13M 15P",
    "5d 10m 12d 13M 15P",
    "5d 10m 13M 15P 17m",
    "6M 12d 13M 15P 17m",
    "6M 12d 15P 17m 19d"
  ],
  "^9": [
    "1P 6M 7M 9M 10M",
    "1P 7M 9M 10M 13M",
    "3M 7M 9M 10M 13M",
    "3M 7M 9M 12P 13M",
    "3M 7M 8P 9M 13M",
    "3M 7M 9M 13M 14M",
    "3M 7M 10M 13M 16M",
    "7M 10M 13M 14M 16M",
    "7M 10M 13M 16M 17M",
    "7M 10M 13M 16M 19P"
  ],
  "^13": [
    "1P 6M 7M 9M 10M",
    "1P 7M 9M 10M 13M",
    "3M 7M 9M 12P 13M",
    "3M 7M 9M 10M 13M",
    "3M 7M 8P 9M 13M",
    "3M 7M 9M 13M 14M",
    "3M 7M 10M 13M 16M",
    "7M 10M 13M 14M 16M",
    "7M 10M 13M 16M 17M",
    "7M 10M 13M 16M 19P"
  ],
  "^7#11": [
    "1P 3M 5d 7M 9M",
    "1P 7M 9M 10M 12d",
    "3M 7M 9M 10M 12d",
    "3M 7M 9M 12d 13M",
    "3M 7M 10M 12d 14M",
    "7M 10M 12d 13M 14M",
    "7M 10M 12d 13M 16M",
    "7M 10M 12d 14M 17M"
  ],
  "^9#11": [
    "1P 3M 5d 7M 9M",
    "1P 7M 9M 10M 12d",
    "3M 7M 9M 10M 12d",
    "3M 7M 9M 12d 13M",
    "3M 7M 9M 12d 14M",
    "7M 10M 12d 14M 16M",
    "7M 10M 12d 13M 16M"
  ],
  "^7#5": ["1P 6m 7M 10M 13m", "3M 7M 9M 10M 13m", "3M 7M 10M 13m 14M", "7M 10M 13m 14M 16M", "7M 10M 13m 14M 17M"],
  "-6": [
    "1P 3m 5P 6M 9M",
    "3m 5P 6M 8P 9M",
    "1P 5P 6M 10m 11P",
    "3m 5P 6M 8P 11P",
    "1P 5P 9M 10m 13M",
    "3m 5P 8P 9M 13M",
    "5P 8P 10m 11P 13M",
    "5P 8P 10m 13M 16M"
  ],
  "-69": [
    "1P 3m 5P 6M 9M",
    "3m 5P 6M 8P 9M",
    "3m 6M 9M 10m 12P",
    "1P 5P 9M 10m 13M",
    "3m 5P 8P 9M 13M",
    "5P 8P 9M 10m 13M",
    "5P 8P 10m 13M 16M"
  ],
  "-^7": [
    "1P 3m 5P 7M 9M",
    "1P 5P 7M 10m 11P",
    "3m 7M 9M 10m 11P",
    "3m 7M 9M 10m 12P",
    "3m 7M 9M 12P 14M",
    "7M 10m 11P 12P 14M",
    "7M 10m 12P 14M 16M"
  ],
  "-^9": [
    "1P 3m 5P 7M 9M",
    "1P 5P 7M 10m 11P",
    "3m 7M 9M 10m 11P",
    "3m 7M 9M 10m 12P",
    "3m 7M 9M 12P 14M",
    "7M 10m 11P 12P 14M",
    "7M 10m 12P 14M 16M"
  ],
  "-9": [
    "1P 3m 5P 7m 9M",
    "1P 3m 7m 9M 11P",
    "3m 7m 9M 10m 11P",
    "3m 7m 9M 10m 12P",
    "3m 7m 9M 10m 14m",
    "3m 7m 9M 12P 15P",
    "7m 10m 11P 14m 16M",
    "7m 10m 12P 16M 18P"
  ],
  "-add9": ["1P 2M 3m 5P 8P", "1P 3m 5P 9M", "3m 5P 8P 9M 12P", "5P 8P 9M 10m 12P"],
  "-11": [
    "3m 5P 7m 9M 11P",
    "7m 9M 10m 11P",
    "1P 4P 7m 10m 12P",
    "3m 7m 9M 11P 12P",
    "7m 9M 10m 11P 12P",
    "3m 7m 9M 11P 14m",
    "4P 10m 12P 14m",
    "5P 8P 11P 14m",
    "5P 8P 11P 14m 16M",
    "7m 10m 12P 16M 18P",
    "7m 10m 11P 16M 21m"
  ],
  "-7b5": [
    "1P 5d 7m 10m 11P",
    "3m 5d 7m 8P 11P",
    "5d 7m 8P 10m 11P",
    "1P 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 8P 10m 11P 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  h9: [
    "3m 5d 7m 9M 11P",
    "1P 7m 9M 10m 12d",
    "3m 7m 9M 12d 14m",
    "5d 8P 9M 10m 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 16M"
  ],
  "-b6": ["1P 3m 5P 6m 8P", "3m 5P 8P 11P 13m", "5P 8P 10m 11P 13m"],
  "-#5": ["1P 6m 8P 10m 13m", "3m 6m 8P 11P 13m", "6m 8P 10m 13m 15P"],
  "7b9": ["1P 3M 7m 9m 10M", "3M 7m 8P 9m 10M", "3M 7m 8P 9m 14m", "7m 9m 10M 14m 15P"],
  "7#9": ["1P 3M 7m 10m", "3M 7m 10m 10M 12P", "3M 7m 10m 12P 14m", "7m 10M 12P 14m 17m"],
  "7#11": ["1P 3M 7m 9M 12d", "3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "7b5": ["1P 3M 7m 9M 12d", "3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "7#5": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P", "7m 10M 13m 14m 17M"],
  "9#11": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9b5": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9#5": ["1P 7m 9M 10M 13m", "3M 7m 9M 10M 13m", "3M 7m 9M 13m 14m", "7m 10M 13m 14m 16M", "7m 10M 13m 16M 17M"],
  "7b13": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P", "7m 10M 13m 14m 17M"],
  "7#9#5": ["3M 7m 10m 10M 13m", "3M 7m 10m 13m 14m", "7m 10M 13m 14m 17m"],
  "7#9b5": ["3M 7m 10m 10M 12d", "3M 7m 10m 12d 14m", "7m 10M 12d 14m 17m"],
  "7#9#11": ["3M 7m 10m 10M 12d", "3M 7m 10m 12d 14m", "7m 10M 12d 14m 17m"],
  "7b9#11": ["3M 7m 9m 10M 12d", "3M 7m 9m 12d 14m", "7m 8P 10M 12d 16m", "7m 10M 12d 14m 16m"],
  "7b9b5": ["3M 7m 9m 10M 12d", "3M 7m 9m 12d 14m", "7m 8P 10M 12d 16m", "7m 10M 12d 14m 16m"],
  "7b9#5": ["1P 7m 9m 10M 13m", "3M 7m 9m 10M 13m", "3M 7m 10M 13m 16m", "7m 10M 13m 14m 16m", "7m 10M 13m 16m 17M"],
  "7b9#9": ["1P 3M 7m 9m 10m", "3M 7m 10m 13m 16m", "7m 10M 13m 16m 17m"],
  "7b9b13": ["1P 7m 9m 10M 13m", "3M 7m 9m 10M 13m", "3M 7m 10M 13m 16m", "7m 10M 13m 14m 16m", "7m 10M 13m 16m 17M"],
  "7alt": [
    "3M 7m 8P 10m 13m",
    "3M 7m 9m 12d 13m",
    "3M 7m 9m 10m 13m",
    "3M 7m 10m 13m 14m",
    "3M 7m 9m 12d 14m",
    "3M 7m 10m 13m 15P",
    "3M 7m 10m 13m 16m",
    "7m 10M 12d 14m 16m",
    "7m 10M 12d 13m 16m",
    "7m 10M 13m 15P 17m",
    "7m 10M 13m 16m 17m",
    "7m 10M 13m 16m 19d"
  ],
  "13#11": ["3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "13b9": ["3M 7m 9m 10M 13M", "3M 7m 10M 13M 16m", "7m 10M 13M 16m 17M"],
  "13#9": ["3M 7m 10m 10M 13M", "7m 10M 13M 14m 17m"],
  "7b9sus": ["1P 5P 7m 9m 11P", "5P 7m 8P 9m 11P", "7m 8P 11P 14m 16m"],
  "7susadd3": ["1P 4P 5P 7m 10M", "5P 8P 10M 11P 14m", "7m 11P 12P 15P 17M"],
  "9sus": [
    "1P 4P 6M 7m 9M",
    "1P 5P 7m 9M 11P",
    "4P 6M 7m 9M 11P",
    "5P 8P 9M 11P 14m",
    "7m 9M 11P 13M 15P",
    "7m 11P 12P 14m 18P"
  ],
  "13sus": [
    "1P 4P 6M 7m 9M",
    "1P 7m 9M 11P 13M",
    "4P 7m 9M 11P 13M",
    "7m 9M 11P 13M 15P",
    "7m 11P 13M 14m 16M",
    "7m 11P 13M 16M 18P"
  ],
  "7b13sus": ["1P 5P 7m 11P 13m", "5P 7m 8P 11P 13m", "7m 11P 13m 14m 15P"]
}, { dictionaryVoicing: OB, minTopNoteDiff: JB } = Vl.default || Vl, QB = {
  m7: ["3m 5P 7m 9M", "7m 9M 10m 12P"],
  7: ["3M 6M 7m 9M", "7m 9M 10M 13M"],
  "^7": ["3M 5P 7M 9M", "7M 9M 10M 12P"],
  69: ["3M 5P 6A 9M"],
  m7b5: ["3m 5d 7m 8P", "7m 8P 10m 12d"],
  "7b9": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  "7b13": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  o7: ["1P 3m 5d 6M", "5d 6M 8P 10m"],
  "7#11": ["7m 9M 11A 13A"],
  "7#9": ["3M 7m 9A"],
  mM7: ["3m 5P 7M 9M", "7M 9M 10m 12P"],
  m6: ["3m 5P 6M 9M", "6M 9M 10m 12P"]
}, qB = {
  m7: ["3m 7m", "7m 10m"],
  m9: ["3m 7m", "7m 10m"],
  7: ["3M 7m", "7m 10M"],
  "^7": ["3M 7M", "7M 10M"],
  "^9": ["3M 7M", "7M 10M"],
  69: ["3M 6M"],
  6: ["3M 6M", "6M 10M"],
  m7b5: ["3m 7m", "7m 10m"],
  "7b9": ["3M 7m", "7m 10M"],
  "7b13": ["3M 7m", "7m 10M"],
  o7: ["3m 6M", "6M 10m"],
  "7#11": ["3M 7m", "7m 10M"],
  "7#9": ["3M 7m", "7m 10M"],
  mM7: ["3m 7M", "7M 10m"],
  m6: ["3m 6M", "6M 10m"]
}, $B = {
  "": ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  M: ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  m: ["1P 3m 5P", "3m 5P 8P", "5P 8P 10m"],
  o: ["1P 3m 5d", "3m 5d 8P", "5d 8P 10m"],
  aug: ["1P 3m 5A", "3m 5A 8P", "5A 8P 10m"]
}, eV = {
  // triads
  "": ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  M: ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  m: ["1P 3m 5P", "3m 5P 8P", "5P 8P 10m"],
  o: ["1P 3m 5d", "3m 5d 8P", "5d 8P 10m"],
  aug: ["1P 3m 5A", "3m 5A 8P", "5A 8P 10m"],
  // sevenths chords
  m7: ["3m 5P 7m 9M", "7m 9M 10m 12P"],
  7: ["3M 6M 7m 9M", "7m 9M 10M 13M"],
  "^7": ["3M 5P 7M 9M", "7M 9M 10M 12P"],
  69: ["3M 5P 6A 9M"],
  m7b5: ["3m 5d 7m 8P", "7m 8P 10m 12d"],
  "7b9": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  "7b13": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  o7: ["1P 3m 5d 6M", "5d 6M 8P 10m"],
  "7#11": ["7m 9M 11A 13A"],
  "7#9": ["3M 7m 9A"],
  mM7: ["3m 5P 7M 9M", "7M 9M 10m 12P"],
  m6: ["3m 5P 6M 9M", "6M 9M 10m 12P"]
}, qs = {
  lefthand: { dictionary: QB, range: ["F3", "A4"], mode: "below", anchor: "a4" },
  triads: { dictionary: $B, mode: "below", anchor: "a4" },
  guidetones: { dictionary: qB, mode: "above", anchor: "a4" },
  legacy: { dictionary: eV, mode: "below", anchor: "a4" }
};
let RC = "ireal";
const BC = (e) => RC = e, tV = (e, t) => VC(e, qs[e].dictionary, t), VC = (e, t, n = ["F3", "A4"]) => {
  Object.assign(qs, { [e]: { dictionary: t, range: n } });
}, Qo = (e, t, n = {}) => {
  Object.assign(qs, { [e]: { dictionary: t, ...n } });
}, nV = (e, t, n) => {
  const { dictionary: s, range: i } = qs[t];
  return OB({
    chord: e,
    dictionary: s,
    range: i,
    picker: JB,
    lastVoicing: n
  });
};
let ir;
const sV = B("voicings", function(e, t) {
  return t.fmap((n) => (ir = nV(n, e, ir), tt(...ir))).outerJoin();
}), iV = B("rootNotes", function(e, t) {
  return t.fmap((n) => {
    const r = (n.chord || n).match(/^([a-gA-G][b#]?).*$/)[1] + e;
    return n.chord ? { note: r } : r;
  });
}), rV = B("voicing", function(e) {
  return e.fmap((t) => {
    t = typeof t == "string" ? { chord: t } : t;
    let { dictionary: n = RC, chord: s, anchor: i, offset: r, mode: a, n: u, octaves: o, ...c } = t;
    n = typeof n == "string" ? qs[n] : { dictionary: n, mode: "below", anchor: "c5" };
    try {
      let l = RB({ ...n, chord: s, anchor: i, offset: r, mode: a, n: u, octaves: o });
      return tt(...l).note().set(c);
    } catch {
      return gt(`[voicing]: unknown chord "${s}"`), Ye;
    }
  }).outerJoin();
});
function gi(e, t, n) {
  n = Array.isArray(n) ? n : [n], n.forEach((s) => {
    s[t] = s[e];
  });
}
gi("^", "", [rs, Zs]);
Object.keys(rs).forEach((e) => {
  if (e.includes("-")) {
    let t = e.replace("-", "m");
    gi(e, t, [Zs, rs]);
  }
  if (e.includes("^")) {
    let t = e.replace("^", "M");
    gi(e, t, [Zs, rs]);
  }
  if (e.includes("+")) {
    let t = e.replace("+", "aug");
    gi(e, t, [Zs, rs]);
  }
});
Qo("ireal", rs);
Qo("ireal-ext", Zs);
function aV() {
  ir = void 0, BC("ireal");
}
const uV = "@strudel/tonal", oV = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addVoicings: VC,
  complex: Zs,
  packageName: uV,
  registerVoicings: Qo,
  resetVoicings: aV,
  rootNotes: iV,
  scale: YB,
  scaleTrans: WB,
  scaleTranspose: NB,
  setDefaultVoicings: BC,
  setVoicingRange: tV,
  simple: rs,
  strans: TB,
  trans: zB,
  transpose: kB,
  voicing: rV,
  voicingAlias: gi,
  voicingRegistry: qs,
  voicings: sV
}, Symbol.toStringTag, { value: "Module" }));
async function cV() {
  const e = rr(
    rr,
    Promise.resolve().then(() => M2),
    Promise.resolve().then(() => Lw),
    Promise.resolve().then(() => oV),
    Promise.resolve().then(() => Fw),
    { hush: dV, evaluate: hV }
  );
  await Promise.all([
    e,
    mM()
    /* , registerSoundfonts() */
  ]);
}
let mu, ls;
function lV(e = {}) {
  lM(), e.miniAllStrings !== false && LM();
  const { prebake: t, ...n } = e;
  return ls = PM({ ...n, transpiler: $Z }), mu = (async () => (await cV(), await t?.(), ls))(), ar(() => ls.scheduler.now()), mu;
}
window.initStrudel = lV;
_.prototype.play = function() {
  if (!ls)
    throw new Error(".play: no repl found. Have you called initStrudel?");
  return mu.then(() => {
    ls.setPattern(this, true);
  }), this;
};
function dV() {
  ls.stop();
}
async function hV(e, t = true) {
  return ls.evaluate(e, t);
}
export {
  Jl as ClockCollator,
  Db as Cyclist,
  ao as DEFAULT_MAX_POLYPHONY,
  vb as FXr,
  Gb as FXrel,
  xb as FXrelease,
  U as Fraction,
  et as Hap,
  _ as Pattern,
  Dw as StartRules,
  Es as State,
  hs as SyntaxError,
  ct as TimeSpan,
  Qa as Warpmode,
  Uu as __chooseWith,
  Ku as _brandBy,
  l0 as _fitslice,
  ju as _irand,
  Ou as _keyDown,
  d0 as _match,
  Ut as _mod,
  wu as _morph,
  p0 as _polymeterListSteps,
  za as _retime,
  Na as _slices,
  bd as accelerate,
  T1 as activeLabel,
  jg as ad,
  Mx as add,
  VC as addVoicings,
  Kg as adsr,
  NS as aliasBank,
  SD as almostAlways,
  DD as almostNever,
  ZD as always,
  vd as amp,
  vt as analysers,
  us as analysersData,
  kp as analyze,
  fy as anchor,
  zx as and,
  mG as apply,
  Fi as applyFM,
  pn as applyGainCurve,
  c0 as applyN,
  Oa as applyParameterModulators,
  Og as ar,
  q9 as arp,
  Q9 as arpWith,
  ix as arrange,
  fb as as,
  jv as asym,
  Ad as att,
  Pd as attack,
  Nl as averageArray,
  ND as backgroundImage,
  Ax as band,
  Kp as bandf,
  Op as bandq,
  Bp as bank,
  Ul as base64ToUnicode,
  Mm as bbexpr,
  xm as bbst,
  Tv as beat,
  Qp as begin,
  yD as berlin,
  ty as bgain,
  QX as binary,
  qX as binaryL,
  c2 as binaryN,
  l2 as binaryNL,
  lx as bind,
  bg as binshift,
  CG as bite,
  oP as bjork,
  Bu as bjorklund,
  Dx as blshift,
  Mb as bmod,
  Fx as bor,
  Up as bp,
  ef as bpa,
  $m as bpattack,
  uf as bpd,
  Vf as bpdc,
  af as bpdecay,
  Ef as bpdepth,
  Rf as bpdepthfreq,
  Lf as bpdepthfrequency,
  Um as bpe,
  jm as bpenv,
  jp as bpf,
  Jp as bpq,
  Mf as bpr,
  wf as bprate,
  bf as bprelease,
  pf as bps,
  Bf as bpshape,
  kf as bpskew,
  hf as bpsustain,
  Zf as bpsync,
  wG as brak,
  rD as brand,
  iD as brandBy,
  Sx as brshift,
  $1 as bus,
  ey as busgain,
  Xx as bxor,
  uv as bypass,
  bm as byteBeatExpression,
  Cm as byteBeatStartTime,
  U9 as calculateSteps,
  Mi as cat,
  tb as ccn,
  nb as ccv,
  _x as ceil,
  vm as ch,
  km as channel,
  Gm as channels,
  Jv as chebyshev,
  m2 as choose,
  f2 as chooseCycles,
  uD as chooseIn,
  Ar as chooseInWith,
  oD as chooseOut,
  Pr as chooseWith,
  Zv as chop,
  hy as chord,
  Vp as chorus,
  JG as chunk,
  $G as chunkBack,
  av as chunkBackInto,
  iv as chunkInto,
  ev as chunkback,
  rv as chunkbackinto,
  sv as chunkinto,
  br as clamp,
  k2 as cleanupOnEnd,
  WD as cleanupUi,
  wg as clip,
  rm as coarse,
  W9 as code2hash,
  Yg as color,
  Hg as colour,
  fg as comb,
  Zs as complex,
  D9 as compose,
  Jx as compress,
  Qx as compressSpan,
  Ny as compressor,
  Iy as compressorAttack,
  Wy as compressorKnee,
  Ty as compressorRatio,
  _y as compressorRelease,
  qx as compressspan,
  W2 as connectBusModulator,
  N2 as connectEnvelope,
  z2 as connectLFO,
  dM as connectToDestination,
  S9 as constant,
  M0 as contract,
  eb as control,
  iP as controls,
  wX as cosine,
  ZX as cosine2,
  fG as cpm,
  Sg as cps,
  Xb as createClock,
  Z2 as createFilter,
  xr as createParam,
  Lu as createParams,
  im as crush,
  Wm as ctf,
  sb as ctlNum,
  H1 as ctranspose,
  Hv as cubic,
  Xe as curry,
  Bg as curve,
  zm as cut,
  Nm as cutoff,
  Ba as cycleToSeconds,
  RD as cyclesPer,
  Wp as dec,
  Np as decay,
  cV as defaultPrebake,
  MD as degrade,
  bD as degradeBy,
  gD as degradeByWith,
  _1 as degree,
  a1 as delay,
  o1 as delayfb,
  u1 as delayfeedback,
  l1 as delayspeed,
  m1 as delaysync,
  h1 as delayt,
  d1 as delaytime,
  Vg as deltaSlide,
  g1 as det,
  y1 as detune,
  c1 as dfb,
  my as dict,
  py as dictionary,
  Kv as diode,
  Vy as dist,
  By as distort,
  eo as distortionAlgorithms,
  zy as distorttype,
  ky as distortvol,
  Gx as div,
  r1 as djf,
  nw as dough,
  CM as doughTrigger,
  xM as doughsamples,
  DM as drawFrequencyScope,
  $l as drawLine,
  XM as drawTimeScope,
  pm as drive,
  y0 as drop,
  C1 as dry,
  E2 as drywet,
  Ug as ds,
  bM as dspWorklet,
  p1 as dt,
  mm as duck,
  gm as duckattack,
  fm as duckdepth,
  ym as duckonset,
  Lg as dur,
  Eg as duration,
  yG as early,
  IG as echo,
  zG as echoWith,
  NG as echowith,
  Ai as effectSend,
  mP as eish,
  qp as end,
  mg as enhance,
  bb as env,
  Rx as eq,
  Bx as eqt,
  uP as euclid,
  dP as euclidLegato,
  hP as euclidLegatoRot,
  lP as euclidRot,
  pP as euclidish,
  cP as euclidrot,
  rr as evalScope,
  hV as evaluate,
  pG as every,
  b0 as expand,
  Oy as expression,
  g0 as extend,
  v1 as fadeInTime,
  G1 as fadeOutTime,
  x1 as fadeTime,
  xf as fanchor,
  rG as fast,
  nv as fastChunk,
  $x as fastGap,
  Ft as fastcat,
  tv as fastchunk,
  eG as fastgap,
  zp as fft,
  hv as filter,
  pv as filterWhen,
  hG as firstOf,
  Vv as fit,
  En as flatten,
  Ix as floor,
  Yd as fm,
  Hd as fm1,
  Kd as fm2,
  jd as fm3,
  Ud as fm4,
  Od as fm5,
  Jd as fm6,
  Qd as fm7,
  qd as fm8,
  gh as fmatt,
  bh as fmatt1,
  Mh as fmatt2,
  Ch as fmatt3,
  xh as fmatt4,
  Gh as fmatt5,
  vh as fmatt6,
  Ph as fmatt7,
  Ah as fmatt8,
  oh as fmattack,
  ch as fmattack1,
  lh as fmattack2,
  dh as fmattack3,
  hh as fmattack4,
  ph as fmattack5,
  mh as fmattack6,
  fh as fmattack7,
  yh as fmattack8,
  Yh as fmdec,
  Hh as fmdec1,
  Kh as fmdec2,
  jh as fmdec3,
  Uh as fmdec4,
  Oh as fmdec5,
  Jh as fmdec6,
  Qh as fmdec7,
  qh as fmdec8,
  Bh as fmdecay,
  Vh as fmdecay1,
  kh as fmdecay2,
  zh as fmdecay3,
  Nh as fmdecay4,
  Wh as fmdecay5,
  Th as fmdecay6,
  Ih as fmdecay7,
  _h as fmdecay8,
  $d as fmenv,
  eh as fmenv1,
  th as fmenv2,
  nh as fmenv3,
  sh as fmenv4,
  ih as fmenv5,
  rh as fmenv6,
  ah as fmenv7,
  uh as fmenv8,
  Fd as fmh,
  Xd as fmh1,
  Dd as fmh2,
  Sd as fmh3,
  wd as fmh4,
  Zd as fmh5,
  Ed as fmh6,
  Ld as fmh7,
  Rd as fmh8,
  Bd as fmi,
  Vd as fmi1,
  kd as fmi2,
  zd as fmi3,
  Nd as fmi4,
  Wd as fmi5,
  Td as fmi6,
  Id as fmi7,
  _d as fmi8,
  Fp as fmrel,
  Xp as fmrel1,
  Dp as fmrel2,
  Sp as fmrel3,
  wp as fmrel4,
  Zp as fmrel5,
  Ep as fmrel6,
  Lp as fmrel7,
  Rp as fmrel8,
  gp as fmrelease,
  bp as fmrelease1,
  Mp as fmrelease2,
  Cp as fmrelease3,
  xp as fmrelease4,
  Gp as fmrelease5,
  vp as fmrelease6,
  Pp as fmrelease7,
  Ap as fmrelease8,
  op as fmsus,
  cp as fmsus1,
  lp as fmsus2,
  dp as fmsus3,
  hp as fmsus4,
  pp as fmsus5,
  mp as fmsus6,
  fp as fmsus7,
  yp as fmsus8,
  $h as fmsustain,
  ep as fmsustain1,
  tp as fmsustain2,
  np as fmsustain3,
  sp as fmsustain4,
  ip as fmsustain5,
  rp as fmsustain6,
  ap as fmsustain7,
  up as fmsustain8,
  Fh as fmwave,
  Xh as fmwave1,
  Dh as fmwave2,
  Sh as fmwave3,
  wh as fmwave4,
  Zh as fmwave5,
  Eh as fmwave6,
  Lh as fmwave7,
  Rh as fmwave8,
  tG as focus,
  nG as focusSpan,
  sG as focusspan,
  Uv as fold,
  w9 as fractionalArgs,
  xg as frameRate,
  Gg as frames,
  cg as freeze,
  P1 as freq,
  bu as freqToMidi,
  Hx as fromBipolar,
  Qy as fshift,
  qy as fshiftnote,
  $y as fshiftphase,
  Cf as ftype,
  Wx as func,
  Pb as fxr,
  xd as gain,
  je as gainNode,
  Ws as gap,
  k1 as gat,
  V1 as gate,
  Nt as getADSRValues,
  gu as getAccidentalsOffset,
  hM as getAnalyserById,
  Dr as getAnalyzerData,
  ve as getAudioContext,
  TD as getAudioContextCurrentTime,
  rM as getAudioDevices,
  GS as getCachedBuffer,
  w2 as getCompressor,
  xi as getControlName,
  ZP as getCps,
  ql as getCurrentKeyboardState,
  ut as getDefaultValue,
  V2 as getDistortion,
  lS as getDistortionAlgorithm,
  S2 as getEnvelope,
  v9 as getEventOffsetMs,
  zl as getFreq,
  Tl as getFrequency,
  Kn as getFrequencyFromValue,
  RP as getIsStarted,
  po as getLeafLocation,
  mo as getLeafLocations,
  EM as getLeaves,
  Is as getLfo,
  PS as getLoadedBuffer,
  yM as getOscillator,
  zt as getParamADSR,
  $u as getParamLfo,
  EP as getPattern,
  I9 as getPerformanceTimeSeconds,
  Bs as getPitchEnvelope,
  X9 as getPlayableNoteValue,
  Un as getRandsAtTime,
  I2 as getSampleBuffer,
  _2 as getSampleBufferSource,
  T2 as getSampleInfo,
  is as getSound,
  F9 as getSoundIndex,
  Xr as getSuperdoughAudioController,
  Ia as getTime,
  s2 as getTrigger,
  LP as getTriggerFunc,
  Vs as getVibratoOscillator,
  p7 as getWidgetID,
  Dt as getWorklet,
  gM as getZZFX,
  yv as grow,
  Zx as gt,
  Lx as gte,
  Zw as h,
  Yv as hard,
  K1 as harmonic,
  T9 as hash2code,
  Mg as hbrick,
  qf as hcutoff,
  Hp as hold,
  vg as hours,
  e1 as hp,
  qm as hpa,
  Qm as hpattack,
  rf as hpd,
  Yf as hpdc,
  sf as hpdecay,
  Wf as hpdepth,
  If as hpdepthfreq,
  Tf as hpdepthfrequency,
  Km as hpe,
  Hm as hpenv,
  $f as hpf,
  n1 as hpq,
  gf as hpr,
  zf as hprate,
  yf as hprelease,
  df as hps,
  _f as hpshape,
  Hf as hpskew,
  lf as hpsustain,
  Nf as hpsync,
  t1 as hresonance,
  dv as hsl,
  lv as hsla,
  aG as hurry,
  dV as hush,
  Ds as id,
  pg as imag,
  AP as inhabit,
  XP as inhabitmod,
  ho as initAudio,
  lM as initAudioOnFirstClick,
  lV as initStrudel,
  dx as innerBind,
  cG as inside,
  XG as inv,
  FG as invert,
  Fy as ir,
  aD as irand,
  Sy as irbegin,
  Xy as iresponse,
  Dy as irspeed,
  X0 as isControlName,
  fs as isNote,
  M9 as isNoteWithOctave,
  Pu as isPattern,
  vr as isaw,
  Iu as isaw2,
  KG as iter,
  jG as iterBack,
  UG as iterback,
  BX as itri,
  VX as itri2,
  kG as jux,
  BG as juxBy,
  VG as juxby,
  ng as kcutoff,
  gx as keep,
  bx as keepif,
  Ql as keyAlias,
  LD as keyDown,
  tg as krush,
  I1 as label,
  dG as lastOf,
  u0 as late,
  Cg as lbrick,
  Zg as legato,
  z1 as leslie,
  gb as lfo,
  xG as linger,
  wi as listRange,
  cr as loadBuffer,
  cM as loadWorklets,
  f1 as lock,
  fu as logKey,
  $p as loop,
  Rv as loopAt,
  kv as loopAtCps,
  em as loopBegin,
  nm as loopEnd,
  Bv as loopat,
  zv as loopatcps,
  tm as loopb,
  sm as loope,
  Im as lp,
  Jm as lpa,
  Om as lpattack,
  nf as lpd,
  Df as lpdc,
  tf as lpdecay,
  Pf as lpdepth,
  Ff as lpdepthfreq,
  Af as lpdepthfrequency,
  Ym as lpe,
  _m as lpenv,
  Tm as lpf,
  i1 as lpq,
  ff as lpr,
  Gf as lprate,
  mf as lprelease,
  cf as lps,
  Xf as lpshape,
  Sf as lpskew,
  of as lpsustain,
  vf as lpsync,
  N1 as lrate,
  W1 as lsize,
  wx as lt,
  Ex as lte,
  ww as m,
  Cu as mapArgs,
  ax as mask,
  uo as maxPolyphony,
  A9 as midi2note,
  ds as midiToFreq,
  lb as midibend,
  Jg as midichan,
  $g as midicmd,
  Qg as midimap,
  qg as midiport,
  db as miditouch,
  fo as mini,
  Ri as mini2ast,
  LM as miniAllStrings,
  Ew as minify,
  Pg as minutes,
  vx as mod,
  by as mode,
  Iv as morph,
  TX as mouseX,
  NX as mouseY,
  WX as mousex,
  zX as mousey,
  Y1 as mtranspose,
  xx as mul,
  oo as multiChannelOrbits,
  yd as n,
  Wl as nanFallback,
  Vx as ne,
  kx as net,
  wD as never,
  Of as noise,
  qu as noises,
  gd as note,
  yn as noteToMidi,
  Wt as nothing,
  ib as nrpnn,
  rb as nrpv,
  O1 as nudge,
  kt as numeralArgs,
  Ol as objectMap,
  Q1 as oct,
  J1 as octave,
  U1 as octaveR,
  gy as octaves,
  sg as octer,
  ig as octersub,
  rg as octersubsub,
  SG as off,
  yy as offset,
  FD as often,
  J2 as onTriggerSample,
  tM as onTriggerSynth,
  bn as onceEnded,
  Nx as or,
  q1 as orbit,
  pb as oschost,
  mb as oscport,
  hx as outerBind,
  lG as outside,
  ny as overgain,
  sy as overshape,
  h0 as pace,
  uV as packageName,
  Hl as pairs,
  RG as palindrome,
  iy as pan,
  B1 as panchor,
  oy as panorient,
  ry as panspan,
  ay as pansplay,
  uy as panwidth,
  Zu as parray,
  wM as parse,
  Yl as parseFractional,
  Mu as parseNumeral,
  Qv as partials,
  F1 as patt,
  A1 as pattack,
  _s as patternifyAST,
  R1 as pcurve,
  D1 as pdec,
  X1 as pdecay,
  L1 as penv,
  b2 as per,
  BD as perCycle,
  fD as perlin,
  VD as perx,
  Dm as ph,
  Vm as phasdp,
  Sm as phaser,
  Em as phasercenter,
  Rm as phaserdepth,
  Xm as phaserrate,
  wm as phasersweep,
  qv as phases,
  Lm as phc,
  Bm as phd,
  Zm as phs,
  Zb as pick,
  gP as pickF,
  MP as pickOut,
  vP as pickReset,
  xP as pickRestart,
  FP as pickSqueeze,
  Eb as pickmod,
  bP as pickmodF,
  CP as pickmodOut,
  PP as pickmodReset,
  GP as pickmodRestart,
  DP as pickmodSqueeze,
  _l as pipe,
  kg as pitchJump,
  zg as pitchJumpTime,
  iG as ply,
  HG as plyForEach,
  YG as plyWith,
  nx as pm,
  fx as polyBind,
  hb as polyTouch,
  Mr as polymeter,
  ex as polyrhythm,
  Gd as postgain,
  Px as pow,
  tx as pr,
  E1 as prel,
  Z1 as prelease,
  LG as press,
  EG as pressBy,
  j2 as processSampleMap,
  ab as progNum,
  w1 as psus,
  S1 as psustain,
  Ue as pure,
  Pm as pw,
  Am as pwrate,
  Fm as pwsweep,
  St as rand,
  sD as rand2,
  $X as randL,
  cD as randcat,
  d2 as randrun,
  Kx as range,
  Ux as range2,
  jx as rangex,
  XD as rarely,
  Ox as ratio,
  vy as rdim,
  hg as real,
  Nv as ref,
  B as register,
  A as registerControl,
  vV as registerLanguage,
  Gn as registerMultiControl,
  Q2 as registerSampleSource,
  AS as registerSamplesPrefix,
  sn as registerSound,
  mM as registerSynthSounds,
  Qo as registerVoicings,
  ro as registerWaveTable,
  GV as registerWidgetType,
  oM as registerWorklet,
  tw as registerZZFXSounds,
  j as reify,
  Yp as rel,
  _p as release,
  Re as releaseAudioNode,
  ys as removeUndefineds,
  dw as renderPatternAudio,
  OG as repeatCycles,
  DX as repl,
  fv as replicate,
  aM as resetDefaultValues,
  _S as resetDefaults,
  pM as resetGlobalEffects,
  KS as resetLoadedSounds,
  $2 as resetSeenKeys,
  aV as resetVoicings,
  Sb as reset_state,
  wb as reset_timelines,
  s1 as resonance,
  o0 as rev,
  Y2 as reverseBuffer,
  ZG as revv,
  Ay as rfade,
  cv as rib,
  ov as ribbon,
  ag as ring,
  og as ringdf,
  ug as ringf,
  xy as rlp,
  My as room,
  Gy as roomdim,
  Py as roomfade,
  Cy as roomlp,
  wy as roomsize,
  iV as rootNotes,
  Il as rotate,
  Tx as round,
  Ly as rsize,
  o2 as run,
  D0 as s,
  vv as s_add,
  Mv as s_alt,
  bv as s_cat,
  Xv as s_contract,
  Av as s_expand,
  Fv as s_extend,
  Cv as s_polymeter,
  Pv as s_sub,
  xv as s_taper,
  Gv as s_taperlist,
  Dv as s_tour,
  Sv as s_zip,
  O2 as samples,
  Zi as saw,
  Tu as saw2,
  YB as scale,
  WB as scaleTrans,
  NB as scaleTranspose,
  eS as scheduleAtTime,
  gg as scram,
  tD as scramble,
  yb as scrub,
  Ag as seconds,
  nD as seed,
  vG as seg,
  GG as segment,
  ly as semitone,
  a0 as seq,
  rx as seqPLoop,
  on as sequence,
  n0 as sequenceP,
  yx as set,
  or as setAudioContext,
  kb as setCpsFunc,
  IS as setDefault,
  C2 as setDefaultAudioContext,
  lo as setDefaultValue,
  YS as setDefaultValues,
  BC as setDefaultVoicings,
  kS as setGainCurve,
  Wb as setIsStarted,
  G2 as setLogger,
  nM as setMaxPolyphony,
  sM as setMultiChannelOrbits,
  zb as setPattern,
  t0 as setStringParser,
  tu as setSuperdoughAudioController,
  ar as setTime,
  Nb as setTriggerFunc,
  HS as setVersionDefaults,
  tV as setVoicingRange,
  Ry as shape,
  x0 as shrink,
  C0 as shrinklist,
  eD as shuffle,
  wt as signal,
  Ye as silence,
  rs as simple,
  i2 as sine,
  _u as sine2,
  Ov as sinefold,
  Zy as size,
  A0 as slice,
  cy as slide,
  uG as slow,
  qG as slowChunk,
  Qn as slowcat,
  Fu as slowcatPrime,
  QG as slowchunk,
  yg as smear,
  _v as soft,
  k9 as sol2note,
  AD as someCycles,
  PD as someCyclesBy,
  vD as sometimes,
  GD as sometimesBy,
  Fg as songPtr,
  S0 as sound,
  WS as soundAlias,
  an as soundMap,
  md as source,
  oG as sparsity,
  zD as speak,
  Eu as speed,
  Lv as splice,
  xu as splitAt,
  M1 as spread,
  r2 as square,
  EX as square2,
  SP as squeeze,
  px as squeezeBind,
  Ky as squiz,
  fd as src,
  tt as stack,
  sx as stackBy,
  r0 as stackCentre,
  s0 as stackLeft,
  i0 as stackRight,
  SX as steady,
  mx as stepBind,
  m0 as stepalt,
  Rt as stepcat,
  wv as steps,
  j1 as stepsPerOctave,
  TB as strans,
  Yy as stretch,
  Ev as striate,
  Gu as stringifyValues,
  ux as struct,
  vu as strudelScope,
  _G as stut,
  WG as stutWith,
  TG as stutwith,
  Cx as sub,
  Sr as superdough,
  JS as superdoughTrigger,
  ox as superimpose,
  Ip as sus,
  Tp as sustain,
  Jy as sustainpedal,
  AG as swing,
  PG as swingBy,
  ub as sysex,
  cb as sysexdata,
  ob as sysexid,
  Ey as sz,
  VS as tables,
  f0 as take,
  kX as time,
  Su as timeCat,
  gv as timecat,
  fP as timeline,
  Yx as toBipolar,
  kl as tokenizeNote,
  G0 as tour,
  zB as trans,
  Cb as transient,
  $Z as transpiler,
  kB as transpose,
  um as trem,
  am as tremolo,
  cm as tremolodepth,
  dm as tremolophase,
  hm as tremoloshape,
  lm as tremoloskew,
  om as tremolosync,
  LX as tri,
  RX as tri2,
  eg as triode,
  dg as tsdelay,
  Xg as uid,
  xD as undegrade,
  CD as undegradeBy,
  jl as unicodeToBase64,
  z9 as uniq,
  N9 as uniqsort,
  Kl as uniqsortr,
  b1 as unison,
  Hy as unit,
  JX as useRNG,
  Uf as v,
  Dg as val,
  G9 as valueToMidi,
  Cd as vel,
  Md as velocity,
  Kf as vib,
  Jf as vibmod,
  jf as vibrato,
  Qf as vmod,
  dy as voice,
  rV as voicing,
  gi as voicingAlias,
  qs as voicingRegistry,
  sV as voicings,
  jy as vowel,
  j0 as warp,
  J0 as warpatt,
  O0 as warpattack,
  ad as warpdc,
  q0 as warpdec,
  Q0 as warpdecay,
  id as warpdepth,
  hd as warpenv,
  od as warpmode,
  sd as warprate,
  nd as warprel,
  td as warprelease,
  rd as warpshape,
  ud as warpskew,
  ed as warpsus,
  $0 as warpsustain,
  pd as warpsync,
  fM as waveformN,
  Uy as waveloss,
  dd as wavetablePhaseRand,
  Z0 as wavetablePosition,
  U0 as wavetableWarp,
  cd as wavetableWarpMode,
  dD as wchoose,
  g2 as wchooseCycles,
  mn as webAudioTimeout,
  vM as webaudioOutput,
  PM as webaudioRepl,
  DG as when,
  ED as whenKey,
  p2 as withSeed,
  cx as withValue,
  mv as within,
  eP as worklet,
  hD as wrandcat,
  w0 as wt,
  R0 as wtatt,
  L0 as wtattack,
  H0 as wtdc,
  V0 as wtdec,
  B0 as wtdecay,
  _0 as wtdepth,
  E0 as wtenv,
  ld as wtphaserand,
  T0 as wtrate,
  W0 as wtrel,
  N0 as wtrelease,
  Y0 as wtshape,
  K0 as wtskew,
  z0 as wtsus,
  k0 as wtsustain,
  I0 as wtsync,
  F0 as xfade,
  lg as xsdelay,
  Tg as zcrush,
  Ig as zdelay,
  v0 as zip,
  gr as zipWith,
  Wg as zmod,
  Ng as znoise,
  gG as zoom,
  bG as zoomArc,
  MG as zoomarc,
  Rg as zrand,
  _g as zzfx
};
