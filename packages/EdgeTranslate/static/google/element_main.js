function notifyEdgeTranslate(event, detail) {
    window.postMessage(
        JSON.stringify({
            type: "edge_translate_page_translate_event",
            event,
            ...detail,
        }),
        window.href
    );
}

/* eslint-disable */

(function() {
    /*

    Copyright The Closure Library Authors.
    SPDX-License-Identifier: Apache-2.0

    Modifications:
        2021-3-3 Edge Translate: resolved some error reports
            1. Replace "javascript:void(0)" with "#" globally.
            2. Replace "src="javascript:\'\'"" with "" globally.
            3. Insert line 12954.
   */
    var aa = '" style="background-image:url(',
        ba = "-disabled",
        da = "-document.getElementById('",
        ea = "/translate_a/t",
        fa = "/translate_suggestion?client=",
        ha = '</button></div></div></td></tr><tr id="',
        ia =
            '</span></td><td class="goog-te-banner-margin"></td><td nowrap><div class="goog-te-button"><div><button id="',
        ja =
            '<head><meta http-equiv="Content-Type" content="text/html; charset=UTF8"><link rel="stylesheet" type="text/css" href="',
        ka = "Component already rendered",
        g = "DIV",
        la = "Edge",
        ma = "Google Website Translator",
        na = "IFRAME",
        oa = "INPUT",
        pa = "INTERNAL_SERVER_ERROR",
        qa = "OPTION",
        ra = "Opera",
        sa = "POST",
        ta = "SCRIPT",
        ua = "SPAN",
        va = "TEXTAREA",
        wa = "TITLE",
        xa = "Unable to set parent component",
        ya = "[goog.net.IframeIo] Unable to send, already active.",
        za = "about:invalid#zClosurez",
        Aa = "about:invalid#zSoyz",
        Ba = "absolute",
        Ca = "action",
        Da = "activedescendant",
        Ea = "activity-form-container",
        Fa = "alt-edited",
        Ga = "array",
        Ha = "auto",
        Ia = "backgroundImage",
        Ja = "backgroundPosition",
        Ka = "blur",
        La = "border-box",
        Ma = "button",
        Na = "cancelled",
        Oa = "change",
        Pa = "character",
        Qa = "checked",
        Ra = "chg_tgt_lang",
        Sa = "click",
        Ta = "clk_no_ap_site",
        Ua = "complete",
        Va = "container",
        Wa = "contextmenu",
        Xa = "dblclick",
        Ya = "direction",
        Za = "div",
        $a = "finish",
        ab = "finishSourceLang",
        bb = "finishTargetLang",
        cb = "focus",
        db = "focusin",
        eb = "focusout",
        p = "function",
        fb = "goog-float-bottom",
        gb = "goog-float-top",
        hb = "goog-inline-block ",
        ib = "goog-menuheader",
        jb = "goog-menuseparator",
        kb = "goog-option",
        lb = "goog-option-selected",
        mb = "goog-te-menu-value",
        nb = "goog-te-menu2-item-selected",
        ob = "goog-te-spinner-animation-show",
        pb = "goog-te-spinner-pos-show",
        qb = "hidden",
        rb = "hide",
        sb = "horizontal",
        tb = "https://translate.google.com",
        vb = "https://www.google.com/images/cleardot.gif",
        wb = "#",
        xb = "keydown",
        yb = "keypress",
        zb = "load",
        Ab = "mousedown",
        Bb = "mousemove",
        Cb = "mouseout",
        Db = "mouseover",
        Eb = "move_offscreen",
        q = "none",
        Fb = "number",
        Gb = "object",
        Hb = "opacity 1s linear",
        Ib = "paddingLeft",
        Jb = "paddingRight",
        Kb = "position",
        Lb = "progressSection",
        Mb = "promptSourceLang",
        Nb = "promptTargetLang",
        Ob = "ready",
        Pb = "readystatechange",
        Qb = "rtl",
        Rb = "selected",
        Sb = "skiptranslate",
        Tb = "status-message",
        t = "string",
        Ub = "submitted",
        Vb = "targetLanguage",
        Wb = "textarea-placeholder-input",
        Xb = "toggle_display",
        Yb = "trans-target-empty",
        Zb = "trans-target-highlight",
        $b = "transition",
        ac = "translate",
        bc = "vertical",
        cc = "visible",
        dc = "withCredentials";
    function ec() {
        return function() {};
    }
    function fc(a) {
        return function(b) {
            this[a] = b;
        };
    }
    function u(a) {
        return function() {
            return this[a];
        };
    }
    function v(a) {
        return function() {
            return a;
        };
    }
    var x,
        gc =
            typeof Object.create == p
                ? Object.create
                : function(a) {
                      function b() {}
                      b.prototype = a;
                      return new b();
                  },
        hc;
    if (typeof Object.setPrototypeOf == p) hc = Object.setPrototypeOf;
    else {
        var ic;
        a: {
            var jc = { Dh: !0 },
                kc = {};
            try {
                kc.__proto__ = jc;
                ic = kc.Dh;
                break a;
            } catch (a) {}
            ic = !1;
        }
        hc = ic
            ? function(a, b) {
                  a.__proto__ = b;
                  if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
                  return a;
              }
            : null;
    }
    var lc = hc;
    function mc(a, b) {
        a.prototype = gc(b.prototype);
        a.prototype.constructor = a;
        if (lc) lc(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d);
                    } else a[c] = b[c];
        a.m = b.prototype;
    }
    var goog = goog || {},
        y = this || self,
        nc = /^[\w+/_-]+[=]{0,2}$/,
        oc = null;
    function z() {}
    function pc(a) {
        a.Ue = void 0;
        a.X = function() {
            return a.Ue ? a.Ue : (a.Ue = new a());
        };
    }
    function A(a) {
        var b = typeof a;
        if (b == Gb)
            if (a) {
                if (a instanceof Array) return Ga;
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return Gb;
                if (
                    "[object Array]" == c ||
                    (typeof a.length == Fb &&
                        "undefined" != typeof a.splice &&
                        "undefined" != typeof a.propertyIsEnumerable &&
                        !a.propertyIsEnumerable("splice"))
                )
                    return Ga;
                if (
                    "[object Function]" == c ||
                    ("undefined" != typeof a.call &&
                        "undefined" != typeof a.propertyIsEnumerable &&
                        !a.propertyIsEnumerable("call"))
                )
                    return p;
            } else return "null";
        else if (b == p && "undefined" == typeof a.call) return Gb;
        return b;
    }
    function B(a) {
        return A(a) == Ga;
    }
    function qc(a) {
        var b = A(a);
        return b == Ga || (b == Gb && typeof a.length == Fb);
    }
    function rc(a) {
        return A(a) == p;
    }
    function sc(a) {
        var b = typeof a;
        return (b == Gb && null != a) || b == p;
    }
    function tc(a) {
        return (Object.prototype.hasOwnProperty.call(a, uc) && a[uc]) || (a[uc] = ++vc);
    }
    var uc = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
        vc = 0;
    function wc(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }
    function xc(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e);
            };
        }
        return function() {
            return a.apply(b, arguments);
        };
    }
    function C(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code")
            ? (C = wc)
            : (C = xc);
        return C.apply(null, arguments);
    }
    function yc(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d);
        };
    }
    var D =
        Date.now ||
        function() {
            return +new Date();
        };
    function zc(a, b) {
        a = a.split(".");
        var c = y;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b
                ? c[d] && c[d] !== Object.prototype[d]
                    ? (c = c[d])
                    : (c = c[d] = {})
                : (c[d] = b);
    }
    function E(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.m = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
    }
    var Ac,
        Bc = {
            Tj: 1,
            Ij: 2,
            nk: 3,
            Lj: 4,
            Vj: 5,
            Uj: 6,
            fk: 7,
            Nj: 8,
            Oj: 9,
            Qj: 10,
            Pj: 11,
            ck: 12
        };
    function Cc(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Cc);
        else {
            var b = Error().stack;
            b && (this.stack = b);
        }
        a && (this.message = String(a));
    }
    E(Cc, Error);
    Cc.prototype.name = "CustomError";
    function Dc(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++)
            c += a[e] + (e < b.length ? b[e] : "%s");
        Cc.call(this, c + a[d]);
    }
    E(Dc, Cc);
    Dc.prototype.name = "AssertionError";
    function Ec(a) {
        return a[a.length - 1];
    }
    var Fc = Array.prototype.indexOf
            ? function(a, b) {
                  return Array.prototype.indexOf.call(a, b, void 0);
              }
            : function(a, b) {
                  if (typeof a === t) return typeof b !== t || 1 != b.length ? -1 : a.indexOf(b, 0);
                  for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
                  return -1;
              },
        Gc = Array.prototype.forEach
            ? function(a, b, c) {
                  Array.prototype.forEach.call(a, b, c);
              }
            : function(a, b, c) {
                  for (var d = a.length, e = typeof a === t ? a.split("") : a, f = 0; f < d; f++)
                      f in e && b.call(c, e[f], f, a);
              },
        Hc = Array.prototype.filter
            ? function(a, b) {
                  return Array.prototype.filter.call(a, b, void 0);
              }
            : function(a, b) {
                  for (
                      var c = a.length, d = [], e = 0, f = typeof a === t ? a.split("") : a, h = 0;
                      h < c;
                      h++
                  )
                      if (h in f) {
                          var k = f[h];
                          b.call(void 0, k, h, a) && (d[e++] = k);
                      }
                  return d;
              },
        Ic = Array.prototype.map
            ? function(a, b) {
                  return Array.prototype.map.call(a, b, void 0);
              }
            : function(a, b) {
                  for (
                      var c = a.length, d = Array(c), e = typeof a === t ? a.split("") : a, f = 0;
                      f < c;
                      f++
                  )
                      f in e && (d[f] = b.call(void 0, e[f], f, a));
                  return d;
              },
        Jc = Array.prototype.some
            ? function(a, b) {
                  return Array.prototype.some.call(a, b, void 0);
              }
            : function(a, b) {
                  for (var c = a.length, d = typeof a === t ? a.split("") : a, e = 0; e < c; e++)
                      if (e in d && b.call(void 0, d[e], e, a)) return !0;
                  return !1;
              },
        Kc = Array.prototype.every
            ? function(a, b) {
                  return Array.prototype.every.call(a, b, void 0);
              }
            : function(a, b) {
                  for (var c = a.length, d = typeof a === t ? a.split("") : a, e = 0; e < c; e++)
                      if (e in d && !b.call(void 0, d[e], e, a)) return !1;
                  return !0;
              };
    function Lc(a, b) {
        a: {
            for (var c = a.length, d = typeof a === t ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a;
                }
            b = -1;
        }
        return 0 > b ? null : typeof a === t ? a.charAt(b) : a[b];
    }
    function Mc(a, b) {
        return 0 <= Fc(a, b);
    }
    function Nc(a, b) {
        b = Fc(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c;
    }
    function Oc(a) {
        return Array.prototype.concat.apply([], arguments);
    }
    function Pc(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c;
        }
        return [];
    }
    function Qc(a, b, c, d) {
        Array.prototype.splice.apply(a, Rc(arguments, 1));
    }
    function Rc(a, b, c) {
        return 2 >= arguments.length
            ? Array.prototype.slice.call(a, b)
            : Array.prototype.slice.call(a, b, c);
    }
    var Sc = String.prototype.trim
        ? function(a) {
              return a.trim();
          }
        : function(a) {
              return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
          };
    function Tc(a, b) {
        if (b)
            a = a
                .replace(Uc, "&amp;")
                .replace(Vc, "&lt;")
                .replace(Wc, "&gt;")
                .replace(Xc, "&quot;")
                .replace(Yc, "&#39;")
                .replace(Zc, "&#0;");
        else {
            if (!$c.test(a)) return a;
            -1 != a.indexOf("&") && (a = a.replace(Uc, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(Vc, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(Wc, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(Xc, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(Yc, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(Zc, "&#0;"));
        }
        return a;
    }
    var Uc = /&/g,
        Vc = /</g,
        Wc = />/g,
        Xc = /"/g,
        Yc = /'/g,
        Zc = /\x00/g,
        $c = /[\x00&<>"']/;
    function ad(a, b) {
        var c = 0;
        a = Sc(String(a)).split(".");
        b = Sc(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length && 0 == h[0].length) break;
                c =
                    bd(
                        0 == f[1].length ? 0 : parseInt(f[1], 10),
                        0 == h[1].length ? 0 : parseInt(h[1], 10)
                    ) ||
                    bd(0 == f[2].length, 0 == h[2].length) ||
                    bd(f[2], h[2]);
                f = f[3];
                h = h[3];
            } while (0 == c);
        }
        return c;
    }
    function bd(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    var cd;
    a: {
        var dd = y.navigator;
        if (dd) {
            var ed = dd.userAgent;
            if (ed) {
                cd = ed;
                break a;
            }
        }
        cd = "";
    }
    function H(a) {
        return -1 != cd.indexOf(a);
    }
    function fd(a) {
        for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; (d = b.exec(a)); )
            c.push([d[1], d[2], d[3] || void 0]);
        return c;
    }
    function gd(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a);
    }
    function hd(a, b) {
        for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
        return !1;
    }
    function id(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b;
    }
    function jd(a, b) {
        return null !== a && b in a;
    }
    function kd() {
        var a = ld,
            b;
        for (b in a) return !1;
        return !0;
    }
    function md(a, b, c) {
        if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
        a[b] = c;
    }
    function nd(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b;
    }
    var od = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
    );
    function pd(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < od.length; f++)
                (c = od[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
    }
    function qd(a) {
        var b = arguments.length;
        if (1 == b && B(arguments[0])) return qd.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c;
    }
    function rd() {
        return H("Trident") || H("MSIE");
    }
    function sd() {
        return H("Firefox") || H("FxiOS");
    }
    function td() {
        return (H("Chrome") || H("CriOS")) && !H(la);
    }
    function ud() {
        function a(e) {
            e = Lc(e, d);
            return c[e] || "";
        }
        var b = cd;
        if (!rd()) {
            b = fd(b);
            var c = {};
            Gc(b, function(e) {
                c[e[0]] = e[1];
            });
            var d = yc(jd, c);
            H(ra)
                ? a(["Version", ra])
                : H(la)
                ? a([la])
                : H("Edg/")
                ? a(["Edg"])
                : td() && a(["Chrome", "CriOS", "HeadlessChrome"]);
        }
    }
    function vd(a) {
        var b = !1,
            c;
        return function() {
            b || ((c = a()), (b = !0));
            return c;
        };
    }
    var wd = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    var xd = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
    function yd(a, b) {
        this.a = (a === zd && b) || "";
        this.b = Ad;
    }
    yd.prototype.gb = !0;
    yd.prototype.La = u("a");
    function Bd(a) {
        return a instanceof yd && a.constructor === yd && a.b === Ad ? a.a : "type_error:Const";
    }
    var Ad = {},
        zd = {},
        Cd = new yd(zd, "");
    function Dd(a, b) {
        this.b = (a === Ed && b) || "";
        this.c = Fd;
    }
    Dd.prototype.gb = !0;
    Dd.prototype.La = function() {
        return this.b.toString();
    };
    Dd.prototype.Re = !0;
    Dd.prototype.a = v(1);
    function Gd(a) {
        if (a instanceof Dd && a.constructor === Dd && a.c === Fd) return a.b;
        A(a);
        return "type_error:TrustedResourceUrl";
    }
    var Hd = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
        Fd = {};
    function Id(a, b, c) {
        if (null == c) return b;
        if (typeof c === t) return c ? a + encodeURIComponent(c) : "";
        for (var d in c) {
            var e = c[d];
            e = B(e) ? e : [e];
            for (var f = 0; f < e.length; f++) {
                var h = e[f];
                null != h &&
                    (b || (b = a),
                    (b +=
                        (b.length > a.length ? "&" : "") +
                        encodeURIComponent(d) +
                        "=" +
                        encodeURIComponent(String(h))));
            }
        }
        return b;
    }
    var Ed = {};
    function Jd(a, b) {
        this.b = (a === Kd && b) || "";
        this.c = Ld;
    }
    Jd.prototype.gb = !0;
    Jd.prototype.La = function() {
        return this.b.toString();
    };
    Jd.prototype.Re = !0;
    Jd.prototype.a = v(1);
    function Md(a) {
        if (a instanceof Jd && a.constructor === Jd && a.c === Ld) return a.b;
        A(a);
        return "type_error:SafeUrl";
    }
    var Nd = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    function Od(a) {
        if (a instanceof Jd) return a;
        a = typeof a == Gb && a.gb ? a.La() : String(a);
        Nd.test(a) || (a = za);
        return new Jd(Kd, a);
    }
    var Ld = {},
        Kd = {};
    function Pd() {
        this.a = "";
        this.b = Qd;
    }
    Pd.prototype.gb = !0;
    var Qd = {};
    Pd.prototype.La = u("a");
    function Rd(a) {
        if (a instanceof Pd && a.constructor === Pd && a.b === Qd) return a.a;
        A(a);
        return "type_error:SafeStyle";
    }
    function Sd(a) {
        var b = new Pd();
        b.a = a;
        return b;
    }
    var Td = Sd("");
    function Ud(a) {
        if (a instanceof Jd)
            return (
                'url("' +
                Md(a)
                    .replace(/</g, "%3c")
                    .replace(/[\\"]/g, "\\$&") +
                '")'
            );
        if (a instanceof yd) a = Bd(a);
        else {
            a = String(a);
            var b = a
                .replace(Vd, "$1")
                .replace(Vd, "$1")
                .replace(Wd, "url");
            if (Xd.test(b)) {
                if ((b = !Yd.test(a))) {
                    for (var c = (b = !0), d = 0; d < a.length; d++) {
                        var e = a.charAt(d);
                        "'" == e && c ? (b = !b) : '"' == e && b && (c = !c);
                    }
                    b = b && c && Zd(a);
                }
                a = b ? $d(a) : "zClosurez";
            } else a = "zClosurez";
        }
        if (/[{;}]/.test(a)) throw new Dc("Value does not allow [{;}], got: %s.", [a]);
        return a;
    }
    function Zd(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b) return !1;
                b = !0;
            } else if ("[" == e) {
                if (!b) return !1;
                b = !1;
            } else if (!b && !c.test(e)) return !1;
        }
        return b;
    }
    var Xd = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/,
        Wd = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g,
        Vd = /\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g,
        Yd = /\/\*/;
    function $d(a) {
        return a.replace(Wd, function(b, c, d, e) {
            var f = "";
            d = d.replace(/^(['"])(.*)\1$/, function(h, k, l) {
                f = k;
                return l;
            });
            b = Od(d).La();
            return c + f + b + f + e;
        });
    }
    function ae() {
        this.a = "";
        this.b = be;
    }
    ae.prototype.gb = !0;
    var be = {};
    ae.prototype.La = u("a");
    function ce(a) {
        if (a instanceof ae && a.constructor === ae && a.b === be) return a.a;
        A(a);
        return "type_error:SafeStyleSheet";
    }
    function de(a) {
        var b = new ae();
        b.a = a;
        return b;
    }
    de("");
    function ee() {
        this.b = "";
        this.f = fe;
        this.c = null;
    }
    ee.prototype.Re = !0;
    ee.prototype.a = u("c");
    ee.prototype.gb = !0;
    ee.prototype.La = function() {
        return this.b.toString();
    };
    function ge(a) {
        if (a instanceof ee && a.constructor === ee && a.f === fe) return a.b;
        A(a);
        return "type_error:SafeHtml";
    }
    function he(a) {
        if (a instanceof ee) return a;
        var b = typeof a == Gb,
            c = null;
        b && a.Re && (c = a.a());
        return ie(Tc(b && a.gb ? a.La() : String(a)), c);
    }
    var je = /^[a-zA-Z0-9-]+$/,
        ke = {
            action: !0,
            cite: !0,
            data: !0,
            formaction: !0,
            href: !0,
            manifest: !0,
            poster: !0,
            src: !0
        },
        le = {
            APPLET: !0,
            BASE: !0,
            EMBED: !0,
            IFRAME: !0,
            LINK: !0,
            MATH: !0,
            META: !0,
            OBJECT: !0,
            SCRIPT: !0,
            STYLE: !0,
            SVG: !0,
            TEMPLATE: !0
        };
    function me(a, b) {
        var c = String(a);
        if (!je.test(c)) throw Error("");
        if (c.toUpperCase() in le) throw Error("");
        a = String(a);
        c = null;
        var d = "<" + a,
            e = "";
        if (b)
            for (n in b) {
                if (!je.test(n)) throw Error("");
                var f = b[n];
                if (null != f) {
                    var h = n;
                    var k = f;
                    if (k instanceof yd) k = Bd(k);
                    else if ("style" == h.toLowerCase()) {
                        f = void 0;
                        if (!sc(k)) throw Error("");
                        if (!(k instanceof Pd)) {
                            var l = "";
                            for (f in k) {
                                if (!/^[-_a-zA-Z0-9]+$/.test(f))
                                    throw Error("Name allows only [-_a-zA-Z0-9], got: " + f);
                                var m = k[f];
                                null != m &&
                                    ((m = B(m) ? Ic(m, Ud).join(" ") : Ud(m)),
                                    (l += f + ":" + m + ";"));
                            }
                            k = l ? Sd(l) : Td;
                        }
                        k = Rd(k);
                    } else {
                        if (/^on/i.test(h)) throw Error("");
                        if (h.toLowerCase() in ke)
                            if (k instanceof Dd) k = Gd(k).toString();
                            else if (k instanceof Jd) k = Md(k);
                            else if (typeof k === t) k = Od(k).La();
                            else throw Error("");
                    }
                    k.gb && (k = k.La());
                    h = h + '="' + Tc(String(k)) + '"';
                    e += " " + h;
                }
            }
        var n = d + e;
        d = void 0;
        null == d ? (d = []) : B(d) || (d = [d]);
        !0 === wd[a.toLowerCase()]
            ? (n += ">")
            : ((c = ne(d)), (n += ">" + ge(c).toString() + "</" + a + ">"), (c = c.a()));
        (b = b && b.dir) && (/^(ltr|rtl|auto)$/i.test(b) ? (c = 0) : (c = null));
        return oe(n, c);
    }
    function pe(a) {
        function b(f) {
            B(f)
                ? Gc(f, b)
                : ((f = he(f)),
                  e.push(ge(f).toString()),
                  (f = f.a()),
                  0 == d ? (d = f) : 0 != f && d != f && (d = null));
        }
        var c = he(qe),
            d = c.a(),
            e = [];
        Gc(a, b);
        return ie(e.join(ge(c).toString()), d);
    }
    function ne(a) {
        return pe(Array.prototype.slice.call(arguments));
    }
    var fe = {};
    function ie(a, b) {
        return oe(a, b);
    }
    function oe(a, b) {
        var c = new ee();
        c.b = a;
        c.c = b;
        return c;
    }
    oe("<!DOCTYPE html>", 0);
    var qe = oe("", 0),
        re = oe("<br>", 0);
    var se = vd(function() {
        var a = document.createElement(Za),
            b = document.createElement(Za);
        b.appendChild(document.createElement(Za));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = ge(qe);
        return !b.parentElement;
    });
    function te(a, b) {
        if (se()) for (; a.lastChild; ) a.removeChild(a.lastChild);
        a.innerHTML = ge(b);
    }
    function ue(a, b) {
        b instanceof Jd ||
            b instanceof Jd ||
            ((b = typeof b == Gb && b.gb ? b.La() : String(b)),
            Nd.test(b) || (b = za),
            (b = new Jd(Kd, b)));
        a.action = Md(b);
    }
    function ve(a, b) {
        a.src = b;
        if (null === oc)
            b: {
                b = y.document;
                if (
                    (b = b.querySelector && b.querySelector("script[nonce]")) &&
                    (b = b.nonce || b.getAttribute("nonce")) &&
                    nc.test(b)
                ) {
                    oc = b;
                    break b;
                }
                oc = "";
            }
        b = oc;
        b && a.setAttribute("nonce", b);
    }
    function we(a) {
        return a.replace(/\xa0|[ \t]+/g, " ");
    }
    function xe(a) {
        return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
    }
    function ye(a) {
        return a.replace(/^[\s\xa0]+/, "");
    }
    function ze(a) {
        return a.replace(/[\s\xa0]+$/, "");
    }
    function Ae(a) {
        return encodeURIComponent(String(a));
    }
    function Be(a) {
        return decodeURIComponent(a.replace(/\+/g, " "));
    }
    function Ce(a) {
        return (a = Tc(a, void 0));
    }
    function De(a) {
        return -1 != a.indexOf("&") ? ("document" in y ? Ee(a) : Fe(a)) : a;
    }
    function Ee(a) {
        var b = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' };
        var c = y.document.createElement(Za);
        return a.replace(Ge, function(d, e) {
            var f = b[d];
            if (f) return f;
            "#" == e.charAt(0) &&
                ((e = Number("0" + e.substr(1))), isNaN(e) || (f = String.fromCharCode(e)));
            f || ((f = oe(d + " ", null)), te(c, f), (f = c.firstChild.nodeValue.slice(0, -1)));
            return (b[d] = f);
        });
    }
    function Fe(a) {
        return a.replace(/&([^;]+);/g, function(b, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    return "#" != c.charAt(0) || ((c = Number("0" + c.substr(1))), isNaN(c))
                        ? b
                        : String.fromCharCode(c);
            }
        });
    }
    var Ge = /&([^;\s<&]+);?/g;
    function He(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase();
        });
    }
    function Ie(a) {
        return a.replace(/(^|[\s]+)([a-z])/g, function(b, c, d) {
            return c + d.toUpperCase();
        });
    }
    function Je() {
        return H("iPhone") && !H("iPod") && !H("iPad");
    }
    function Ke() {
        return Je() || H("iPad") || H("iPod");
    }
    function Le(a) {
        Le[" "](a);
        return a;
    }
    Le[" "] = z;
    function Me(a, b) {
        try {
            return Le(a[b]), !0;
        } catch (c) {}
        return !1;
    }
    function Ne(a, b, c) {
        return Object.prototype.hasOwnProperty.call(a, b) ? a[b] : (a[b] = c(b));
    }
    var Oe = H(ra),
        I = rd(),
        Pe = H(la),
        Qe = Pe || I,
        J =
            H("Gecko") &&
            !(-1 != cd.toLowerCase().indexOf("webkit") && !H(la)) &&
            !(H("Trident") || H("MSIE")) &&
            !H(la),
        K = -1 != cd.toLowerCase().indexOf("webkit") && !H(la),
        Re = K && H("Mobile"),
        Se = H("Macintosh"),
        Te = H("Windows"),
        Ue = H("Android"),
        Ve = Je(),
        We = H("iPad"),
        Xe = H("iPod"),
        Ye = Ke();
    function Ze() {
        var a = y.document;
        return a ? a.documentMode : void 0;
    }
    var $e;
    a: {
        var af = "",
            bf = (function() {
                var a = cd;
                if (J) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (Pe) return /Edge\/([\d\.]+)/.exec(a);
                if (I) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (K) return /WebKit\/(\S+)/.exec(a);
                if (Oe) return /(?:Version)[ \/]?(\S+)/.exec(a);
            })();
        bf && (af = bf ? bf[1] : "");
        if (I) {
            var cf = Ze();
            if (null != cf && cf > parseFloat(af)) {
                $e = String(cf);
                break a;
            }
        }
        $e = af;
    }
    var df = $e,
        ef = {};
    function L(a) {
        return Ne(ef, a, function() {
            return 0 <= ad(df, a);
        });
    }
    function ff(a) {
        return Number(gf) >= a;
    }
    var jf;
    jf = y.document && I ? Ze() : void 0;
    var gf = jf;
    var kf = sd(),
        lf = Je() || H("iPod"),
        mf = H("iPad"),
        nf = H("Android") && !(td() || sd() || H(ra) || H("Silk")),
        of = td(),
        pf =
            H("Safari") &&
            !(
                td() ||
                H("Coast") ||
                H(ra) ||
                H(la) ||
                H("Edg/") ||
                H("OPR") ||
                sd() ||
                H("Silk") ||
                H("Android")
            ) &&
            !Ke();
    var qf = null,
        rf = J || (K && !pf) || Oe || (!pf && !I && typeof y.atob == p);
    function sf(a) {
        if (rf) return y.atob(a);
        var b = "";
        tf(a, function(c) {
            b += String.fromCharCode(c);
        });
        return b;
    }
    function tf(a, b) {
        function c(l) {
            for (; d < a.length; ) {
                var m = a.charAt(d++),
                    n = qf[m];
                if (null != n) return n;
                if (!/^[\s\xa0]*$/.test(m)) throw Error("Unknown base64 encoding at char: " + m);
            }
            return l;
        }
        uf();
        for (var d = 0; ; ) {
            var e = c(-1),
                f = c(0),
                h = c(64),
                k = c(64);
            if (64 === k && -1 === e) break;
            b((e << 2) | (f >> 4));
            64 != h && (b(((f << 4) & 240) | (h >> 2)), 64 != k && b(((h << 6) & 192) | k));
        }
    }
    function uf() {
        if (!qf) {
            qf = {};
            for (
                var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
                    b = ["+/=", "+/", "-_=", "-_.", "-_"],
                    c = 0;
                5 > c;
                c++
            )
                for (var d = a.concat(b[c].split("")), e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === qf[f] && (qf[f] = e);
                }
        }
    }
    function vf() {}
    var wf = typeof Uint8Array == p;
    function xf(a, b, c) {
        a.a = null;
        b || (b = []);
        a.l = void 0;
        a.f = -1;
        a.b = b;
        a: {
            if ((b = a.b.length)) {
                --b;
                var d = a.b[b];
                if (!(null === d || typeof d != Gb || B(d) || (wf && d instanceof Uint8Array))) {
                    a.g = b - a.f;
                    a.c = d;
                    break a;
                }
            }
            a.g = Number.MAX_VALUE;
        }
        a.h = {};
        if (c)
            for (b = 0; b < c.length; b++)
                (d = c[b]),
                    d < a.g
                        ? ((d += a.f), (a.b[d] = a.b[d] || yf))
                        : (zf(a), (a.c[d] = a.c[d] || yf));
    }
    var yf = [];
    function zf(a) {
        var b = a.g + a.f;
        a.b[b] || (a.c = a.b[b] = {});
    }
    function Af(a, b) {
        if (b < a.g) {
            b += a.f;
            var c = a.b[b];
            return c === yf ? (a.b[b] = []) : c;
        }
        if (a.c) return (c = a.c[b]), c === yf ? (a.c[b] = []) : c;
    }
    function Bf(a, b, c) {
        b < a.g ? (a.b[b + a.f] = c) : (zf(a), (a.c[b] = c));
        return a;
    }
    function Cf(a, b, c) {
        a.a || (a.a = {});
        var d = c ? c.Fb() : c;
        a.a[b] = c;
        Bf(a, b, d);
    }
    function Df(a, b, c) {
        a.a || (a.a = {});
        if (!a.a[b]) {
            for (var d = Af(a, b), e = [], f = 0; f < d.length; f++) e[f] = new c(d[f]);
            a.a[b] = e;
        }
        (d = a.a[b]) || (d = a.a[b] = []);
        c = new c();
        a = Af(a, b);
        d.push(c);
        a.push(c.Fb());
        return c;
    }
    function Ef(a) {
        if (a.a)
            for (var b in a.a) {
                var c = a.a[b];
                if (B(c)) for (var d = 0; d < c.length; d++) c[d] && c[d].Fb();
                else c && c.Fb();
            }
    }
    vf.prototype.Fb = function() {
        Ef(this);
        return this.b;
    };
    vf.prototype.toString = function() {
        Ef(this);
        return this.b.toString();
    };
    function Ff(a) {
        return typeof a.className == t
            ? a.className
            : (a.getAttribute && a.getAttribute("class")) || "";
    }
    function Gf(a) {
        return a.classList ? a.classList : Ff(a).match(/\S+/g) || [];
    }
    function Hf(a, b) {
        typeof a.className == t ? (a.className = b) : a.setAttribute && a.setAttribute("class", b);
    }
    function If(a, b) {
        return a.classList ? a.classList.contains(b) : Mc(Gf(a), b);
    }
    function M(a, b) {
        if (a.classList) a.classList.add(b);
        else if (!If(a, b)) {
            var c = Ff(a);
            Hf(a, c + (0 < c.length ? " " + b : b));
        }
    }
    function Jf(a, b) {
        if (a.classList)
            Gc(b, function(e) {
                M(a, e);
            });
        else {
            var c = {};
            Gc(Gf(a), function(e) {
                c[e] = !0;
            });
            Gc(b, function(e) {
                c[e] = !0;
            });
            b = "";
            for (var d in c) b += 0 < b.length ? " " + d : d;
            Hf(a, b);
        }
    }
    function Kf(a, b) {
        a.classList
            ? a.classList.remove(b)
            : If(a, b) &&
              Hf(
                  a,
                  Hc(Gf(a), function(c) {
                      return c != b;
                  }).join(" ")
              );
    }
    function Lf(a, b) {
        a.classList
            ? Gc(b, function(c) {
                  Kf(a, c);
              })
            : Hf(
                  a,
                  Hc(Gf(a), function(c) {
                      return !Mc(b, c);
                  }).join(" ")
              );
    }
    var Mf = !I || ff(9),
        Nf = (!J && !I) || (I && ff(9)) || (J && L("1.9.1")),
        Of = I && !L("9"),
        Pf = I || Oe || K,
        Qf = I && !ff(9);
    function N(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0;
    }
    function Rf(a) {
        return new N(a.x, a.y);
    }
    function Sf(a, b) {
        return new N(a.x - b.x, a.y - b.y);
    }
    N.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    };
    N.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    };
    N.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    N.prototype.translate = function(a, b) {
        a instanceof N
            ? ((this.x += a.x), (this.y += a.y))
            : ((this.x += Number(a)), typeof b === Fb && (this.y += b));
        return this;
    };
    function Tf(a, b) {
        this.width = a;
        this.height = b;
    }
    Tf.prototype.aspectRatio = function() {
        return this.width / this.height;
    };
    Tf.prototype.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    Tf.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    Tf.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    function Uf(a) {
        return a ? new Vf(O(a)) : Ac || (Ac = new Vf());
    }
    function Wf(a, b) {
        return typeof b === t ? a.getElementById(b) : b;
    }
    function Xf(a, b) {
        return (b || document).getElementsByTagName(String(a));
    }
    function Yf() {
        var a = document;
        return a.querySelectorAll && a.querySelector
            ? a.querySelectorAll(".alt-edited")
            : Zf(document, "*", Fa, void 0);
    }
    function $f(a, b) {
        var c = b || document;
        if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
        else {
            c = document;
            var d = b || c;
            a =
                d.querySelectorAll && d.querySelector && a
                    ? d.querySelector(a ? "." + a : "")
                    : Zf(c, "*", a, b)[0] || null;
        }
        return a || null;
    }
    function Zf(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (b || c))
            return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, h; (h = a[f]); f++) b == h.nodeName && (d[e++] = h);
                d.length = e;
                return d;
            }
            return a;
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; (h = a[f]); f++)
                (b = h.className), typeof b.split == p && Mc(b.split(/\s+/), c) && (d[e++] = h);
            d.length = e;
            return d;
        }
        return a;
    }
    function ag(a, b) {
        gd(b, function(c, d) {
            c && typeof c == Gb && c.gb && (c = c.La());
            "style" == d
                ? (a.style.cssText = c)
                : "class" == d
                ? (a.className = c)
                : "for" == d
                ? (a.htmlFor = c)
                : bg.hasOwnProperty(d)
                ? a.setAttribute(bg[d], c)
                : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0)
                ? a.setAttribute(d, c)
                : (a[d] = c);
        });
    }
    var bg = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function cg(a) {
        a = a.document;
        a = dg(a) ? a.documentElement : a.body;
        return new Tf(a.clientWidth, a.clientHeight);
    }
    function eg(a) {
        var b = fg(a);
        a = a.parentWindow || a.defaultView;
        return I && L("10") && a.pageYOffset != b.scrollTop
            ? new N(b.scrollLeft, b.scrollTop)
            : new N(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
    }
    function fg(a) {
        return a.scrollingElement
            ? a.scrollingElement
            : !K && dg(a)
            ? a.documentElement
            : a.body || a.documentElement;
    }
    function gg(a) {
        return a ? a.parentWindow || a.defaultView : window;
    }
    function hg(a, b, c) {
        return ig(document, arguments);
    }
    function ig(a, b) {
        var c = String(b[0]),
            d = b[1];
        if (!Mf && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', Ce(d.name), '"');
            if (d.type) {
                c.push(' type="', Ce(d.type), '"');
                var e = {};
                pd(e, d);
                delete e.type;
                d = e;
            }
            c.push(">");
            c = c.join("");
        }
        c = jg(a, c);
        d && (typeof d === t ? (c.className = d) : B(d) ? (c.className = d.join(" ")) : ag(c, d));
        2 < b.length && kg(a, c, b, 2);
        return c;
    }
    function kg(a, b, c, d) {
        function e(h) {
            h && b.appendChild(typeof h === t ? a.createTextNode(h) : h);
        }
        for (; d < c.length; d++) {
            var f = c[d];
            !qc(f) || (sc(f) && 0 < f.nodeType) ? e(f) : Gc(lg(f) ? Pc(f) : f, e);
        }
    }
    function jg(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b);
    }
    function mg() {
        var a = me("WBR"),
            b = document,
            c = jg(b, g);
        I ? ((a = ne(re, a)), te(c, a), c.removeChild(c.firstChild)) : te(c, a);
        if (1 == c.childNodes.length) c = c.removeChild(c.firstChild);
        else {
            for (b = b.createDocumentFragment(); c.firstChild; ) b.appendChild(c.firstChild);
            c = b;
        }
        return c;
    }
    function dg(a) {
        return "CSS1Compat" == a.compatMode;
    }
    function ng(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case oa:
            case na:
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case ta:
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1;
        }
        return !0;
    }
    function og(a, b) {
        kg(O(a), a, arguments, 1);
    }
    function pg(a) {
        for (var b; (b = a.firstChild); ) a.removeChild(b);
    }
    function qg(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b);
    }
    function rg(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling);
    }
    function sg(a) {
        a && a.parentNode && a.parentNode.removeChild(a);
    }
    function tg(a) {
        return Nf && void 0 != a.children
            ? a.children
            : Hc(a.childNodes, function(b) {
                  return 1 == b.nodeType;
              });
    }
    function ug(a) {
        return void 0 !== a.firstElementChild ? a.firstElementChild : vg(a.firstChild, !0);
    }
    function vg(a, b) {
        for (; a && 1 != a.nodeType; ) a = b ? a.nextSibling : a.previousSibling;
        return a;
    }
    function wg(a) {
        return sc(a) && 1 == a.nodeType;
    }
    function xg(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; ) b = b.parentNode;
        return b == a;
    }
    function yg(a, b) {
        if (a == b) return 0;
        if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
        if (I && !ff(9)) {
            if (9 == a.nodeType) return -1;
            if (9 == b.nodeType) return 1;
        }
        if ("sourceIndex" in a || (a.parentNode && "sourceIndex" in a.parentNode)) {
            var c = 1 == a.nodeType,
                d = 1 == b.nodeType;
            if (c && d) return a.sourceIndex - b.sourceIndex;
            var e = a.parentNode,
                f = b.parentNode;
            return e == f
                ? zg(a, b)
                : !c && xg(e, b)
                ? -1 * Ag(a, b)
                : !d && xg(f, a)
                ? Ag(b, a)
                : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex);
        }
        d = O(a);
        c = d.createRange();
        c.selectNode(a);
        c.collapse(!0);
        a = d.createRange();
        a.selectNode(b);
        a.collapse(!0);
        return c.compareBoundaryPoints(y.Range.START_TO_END, a);
    }
    function Ag(a, b) {
        var c = a.parentNode;
        if (c == b) return -1;
        for (; b.parentNode != c; ) b = b.parentNode;
        return zg(b, a);
    }
    function zg(a, b) {
        for (; (b = b.previousSibling); ) if (b == a) return -1;
        return 1;
    }
    function Bg(a) {
        var b,
            c = arguments.length;
        if (!c) return null;
        if (1 == c) return arguments[0];
        var d = [],
            e = Infinity;
        for (b = 0; b < c; b++) {
            for (var f = [], h = arguments[b]; h; ) f.unshift(h), (h = h.parentNode);
            d.push(f);
            e = Math.min(e, f.length);
        }
        f = null;
        for (b = 0; b < e; b++) {
            h = d[0][b];
            for (var k = 1; k < c; k++) if (h != d[k][b]) return f;
            f = h;
        }
        return f;
    }
    function O(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document;
    }
    function Cg(a) {
        return a.contentDocument || a.contentWindow.document;
    }
    function Dg(a) {
        try {
            return a.contentWindow || (a.contentDocument ? gg(a.contentDocument) : null);
        } catch (b) {}
        return null;
    }
    function Eg(a, b) {
        if ("textContent" in a) a.textContent = b;
        else if (3 == a.nodeType) a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; ) a.removeChild(a.lastChild);
            a.firstChild.data = String(b);
        } else pg(a), a.appendChild(O(a).createTextNode(String(b)));
    }
    var Fg = { SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1 },
        Gg = { IMG: " ", BR: "\n" };
    function Hg(a, b) {
        b ? (a.tabIndex = 0) : ((a.tabIndex = -1), a.removeAttribute("tabIndex"));
    }
    function Ig(a) {
        return I && !L("9")
            ? ((a = a.getAttributeNode("tabindex")), null != a && a.specified)
            : a.hasAttribute("tabindex");
    }
    function Jg(a) {
        a = a.tabIndex;
        return typeof a === Fb && 0 <= a && 32768 > a;
    }
    function Kg(a) {
        if (Of && null !== a && "innerText" in a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        else {
            var b = [];
            Lg(a, b, !0);
            a = b.join("");
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        Of || (a = a.replace(/ +/g, " "));
        " " != a && (a = a.replace(/^\s*/, ""));
        return a;
    }
    function Mg(a) {
        var b = [];
        Lg(a, b, !1);
        return b.join("");
    }
    function Lg(a, b, c) {
        if (!(a.nodeName in Fg))
            if (3 == a.nodeType)
                c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in Gg) b.push(Gg[a.nodeName]);
            else for (a = a.firstChild; a; ) Lg(a, b, c), (a = a.nextSibling);
    }
    function lg(a) {
        if (a && typeof a.length == Fb) {
            if (sc(a)) return typeof a.item == p || typeof a.item == t;
            if (rc(a)) return typeof a.item == p;
        }
        return !1;
    }
    function Vf(a) {
        this.a = a || y.document || document;
    }
    x = Vf.prototype;
    x.j = function(a) {
        return Wf(this.a, a);
    };
    x.D = function(a, b, c) {
        return ig(this.a, arguments);
    };
    function Ng(a, b) {
        return jg(a.a, b);
    }
    function Og(a) {
        a = a.a;
        return a.parentWindow || a.defaultView;
    }
    x.appendChild = function(a, b) {
        a.appendChild(b);
    };
    x.Rc = pg;
    x.Rh = tg;
    x.cg = ug;
    x.contains = xg;
    x.ib = Eg;
    x.eg = Kg;
    function Pg(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    }
    x = Pg.prototype;
    x.contains = function(a) {
        return this && a
            ? a instanceof Pg
                ? a.left >= this.left &&
                  a.right <= this.right &&
                  a.top >= this.top &&
                  a.bottom <= this.bottom
                : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
            : !1;
    };
    x.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this;
    };
    x.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this;
    };
    x.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this;
    };
    x.translate = function(a, b) {
        a instanceof N
            ? ((this.left += a.x), (this.right += a.x), (this.top += a.y), (this.bottom += a.y))
            : ((this.left += a),
              (this.right += a),
              typeof b === Fb && ((this.top += b), (this.bottom += b)));
        return this;
    };
    function Qg(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    }
    x = Qg.prototype;
    x.contains = function(a) {
        return a instanceof N
            ? a.x >= this.left &&
                  a.x <= this.left + this.width &&
                  a.y >= this.top &&
                  a.y <= this.top + this.height
            : this.left <= a.left &&
                  this.left + this.width >= a.left + a.width &&
                  this.top <= a.top &&
                  this.top + this.height >= a.top + a.height;
    };
    x.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    x.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    x.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    x.translate = function(a, b) {
        a instanceof N
            ? ((this.left += a.x), (this.top += a.y))
            : ((this.left += a), typeof b === Fb && (this.top += b));
        return this;
    };
    function P(a, b, c) {
        if (typeof b === t) (b = Rg(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d],
                    f = Rg(c, d);
                f && (c.style[f] = e);
            }
    }
    var Sg = {};
    function Rg(a, b) {
        var c = Sg[b];
        if (!c) {
            var d = He(b);
            c = d;
            void 0 === a.style[d] &&
                ((d = (K ? "Webkit" : J ? "Moz" : I ? "ms" : Oe ? "O" : null) + Ie(d)),
                void 0 !== a.style[d] && (c = d));
            Sg[b] = c;
        }
        return c;
    }
    function Tg(a, b) {
        var c = O(a);
        return c.defaultView &&
            c.defaultView.getComputedStyle &&
            (a = c.defaultView.getComputedStyle(a, null))
            ? a[b] || a.getPropertyValue(b) || ""
            : "";
    }
    function Ug(a, b) {
        return Tg(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || (a.style && a.style[b]);
    }
    function Vg(a, b, c) {
        if (b instanceof N) {
            var d = b.x;
            b = b.y;
        } else (d = b), (b = c);
        a.style.left = Wg(d);
        a.style.top = Wg(b);
    }
    function Xg(a) {
        a = a ? O(a) : document;
        return !I || ff(9) || dg(Uf(a).a) ? a.documentElement : a.body;
    }
    function Yg(a) {
        try {
            var b = a.getBoundingClientRect();
        } catch (c) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
        I &&
            a.ownerDocument.body &&
            ((a = a.ownerDocument),
            (b.left -= a.documentElement.clientLeft + a.body.clientLeft),
            (b.top -= a.documentElement.clientTop + a.body.clientTop));
        return b;
    }
    function Zg(a) {
        if (I && !ff(8)) return a.offsetParent;
        var b = O(a),
            c = Ug(a, Kb),
            d = "fixed" == c || c == Ba;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (
                (11 == a.nodeType && a.host && (a = a.host),
                (c = Ug(a, Kb)),
                (d = d && "static" == c && a != b.documentElement && a != b.body),
                !d &&
                    (a.scrollWidth > a.clientWidth ||
                        a.scrollHeight > a.clientHeight ||
                        "fixed" == c ||
                        c == Ba ||
                        "relative" == c))
            )
                return a;
        return null;
    }
    function $g(a) {
        for (
            var b = new Pg(0, Infinity, Infinity, 0),
                c = Uf(a),
                d = c.a.body,
                e = c.a.documentElement,
                f = fg(c.a);
            (a = Zg(a));

        )
            if (
                !((I && 0 == a.clientWidth) || (K && 0 == a.clientHeight && a == d)) &&
                a != d &&
                a != e &&
                Ug(a, "overflow") != cc
            ) {
                var h = ah(a),
                    k = new N(a.clientLeft, a.clientTop);
                h.x += k.x;
                h.y += k.y;
                b.top = Math.max(b.top, h.y);
                b.right = Math.min(b.right, h.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
                b.left = Math.max(b.left, h.x);
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = cg(Og(c) || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null;
    }
    function ah(a) {
        var b = O(a),
            c = new N(0, 0),
            d = Xg(b);
        if (a == d) return c;
        a = Yg(a);
        b = eg(Uf(b).a);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c;
    }
    function bh(a, b) {
        var c = new N(0, 0),
            d = gg(O(a));
        if (!Me(d, "parent")) return c;
        do {
            if (d == b) var e = ah(a);
            else (e = Yg(a)), (e = new N(e.left, e.top));
            c.x += e.x;
            c.y += e.y;
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
        return c;
    }
    function Wg(a) {
        typeof a == Fb && (a += "px");
        return a;
    }
    function ch(a) {
        var b = dh;
        if (Ug(a, "display") != q) return b(a);
        var c = a.style,
            d = c.display,
            e = c.visibility,
            f = c.position;
        c.visibility = qb;
        c.position = Ba;
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a;
    }
    function dh(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = K && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect
            ? ((a = Yg(a)), new Tf(a.right - a.left, a.bottom - a.top))
            : new Tf(b, c);
    }
    function Q(a, b) {
        a.style.display = b ? "" : q;
    }
    function eh(a, b) {
        b = Uf(b);
        var c = b.a;
        if (I && c.createStyleSheet) (b = c.createStyleSheet()), fh(b, a);
        else {
            c = Zf(b.a, "HEAD", void 0, void 0)[0];
            if (!c) {
                var d = Zf(b.a, "BODY", void 0, void 0)[0];
                c = b.D("HEAD");
                d.parentNode.insertBefore(c, d);
            }
            d = b.D("STYLE");
            fh(d, a);
            b.appendChild(c, d);
        }
    }
    function fh(a, b) {
        b = ce(b);
        I && void 0 !== a.cssText ? (a.cssText = b) : (a.innerHTML = b);
    }
    function gh(a) {
        return Qb == Ug(a, Ya);
    }
    var hh = J ? "MozUserSelect" : K || Pe ? "WebkitUserSelect" : null;
    function ih(a, b, c) {
        c = c ? null : a.getElementsByTagName("*");
        if (hh) {
            if (((b = b ? q : ""), a.style && (a.style[hh] = b), c)) {
                a = 0;
                for (var d; (d = c[a]); a++) d.style && (d.style[hh] = b);
            }
        } else if (I || Oe)
            if (((b = b ? "on" : ""), a.setAttribute("unselectable", b), c))
                for (a = 0; (d = c[a]); a++) d.setAttribute("unselectable", b);
    }
    function jh(a) {
        return new Tf(a.offsetWidth, a.offsetHeight);
    }
    function kh(a, b) {
        var c = dg(Uf(O(a)).a);
        if (!I || L("10") || (c && L("8"))) lh(a, b, "content-box");
        else {
            var d = a.style;
            c
                ? ((d.pixelWidth = b.width), (d.pixelHeight = b.height))
                : ((c = mh(a)),
                  (a = nh(a)),
                  (d.pixelWidth = b.width + a.left + c.left + c.right + a.right),
                  (d.pixelHeight = b.height + a.top + c.top + c.bottom + a.bottom));
        }
    }
    function lh(a, b, c) {
        a = a.style;
        J ? (a.MozBoxSizing = c) : K ? (a.WebkitBoxSizing = c) : (a.boxSizing = c);
        a.width = Math.max(b.width, 0) + "px";
        a.height = Math.max(b.height, 0) + "px";
    }
    function oh(a, b, c, d) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var e = a.style[c],
            f = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = e;
        a.runtimeStyle[c] = f;
        return +b;
    }
    function ph(a, b) {
        return (b = a.currentStyle ? a.currentStyle[b] : null) ? oh(a, b, "left", "pixelLeft") : 0;
    }
    function mh(a) {
        if (I) {
            var b = ph(a, Ib),
                c = ph(a, Jb),
                d = ph(a, "paddingTop");
            a = ph(a, "paddingBottom");
            return new Pg(d, c, a, b);
        }
        b = Tg(a, Ib);
        c = Tg(a, Jb);
        d = Tg(a, "paddingTop");
        a = Tg(a, "paddingBottom");
        return new Pg(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
    }
    var qh = { thin: 2, medium: 4, thick: 6 };
    function rh(a, b) {
        if ((a.currentStyle ? a.currentStyle[b + "Style"] : null) == q) return 0;
        b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return b in qh ? qh[b] : oh(a, b, "left", "pixelLeft");
    }
    function nh(a) {
        if (I && !ff(9)) {
            var b = rh(a, "borderLeft"),
                c = rh(a, "borderRight"),
                d = rh(a, "borderTop");
            a = rh(a, "borderBottom");
            return new Pg(d, c, a, b);
        }
        b = Tg(a, "borderLeftWidth");
        c = Tg(a, "borderRightWidth");
        d = Tg(a, "borderTopWidth");
        a = Tg(a, "borderBottomWidth");
        return new Pg(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
    }
    var sh;
    qd([
        "A",
        "AREA",
        "BUTTON",
        "HEAD",
        oa,
        "LINK",
        "MENU",
        "META",
        "OPTGROUP",
        qa,
        "PROGRESS",
        "STYLE",
        "SELECT",
        "SOURCE",
        va,
        wa,
        "TRACK"
    ]);
    function th(a, b) {
        b ? a.setAttribute("role", b) : a.removeAttribute("role");
    }
    function uh(a, b, c) {
        B(c) && (c = c.join(" "));
        var d = "aria-" + b;
        "" === c || void 0 == c
            ? (sh ||
                  (sh = {
                      atomic: !1,
                      autocomplete: q,
                      dropeffect: q,
                      haspopup: !1,
                      live: "off",
                      multiline: !1,
                      multiselectable: !1,
                      orientation: bc,
                      readonly: !1,
                      relevant: "additions text",
                      required: !1,
                      sort: q,
                      busy: !1,
                      disabled: !1,
                      hidden: !1,
                      invalid: "false"
                  }),
              (c = sh),
              b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d))
            : a.setAttribute(d, c);
    }
    var vh = !I || ff(9),
        wh = !I || ff(9),
        xh = I && !L("9"),
        yh = (function() {
            if (!y.addEventListener || !Object.defineProperty) return !1;
            var a = !1,
                b = Object.defineProperty({}, "passive", {
                    get: function() {
                        a = !0;
                    }
                });
            try {
                y.addEventListener("test", z, b), y.removeEventListener("test", z, b);
            } catch (c) {}
            return a;
        })();
    function R() {
        this.ub = this.ub;
        this.wa = this.wa;
    }
    R.prototype.ub = !1;
    R.prototype.M = function() {
        this.ub || ((this.ub = !0), this.F());
    };
    function zh(a, b) {
        a.ub ? b() : (a.wa || (a.wa = []), a.wa.push(b));
    }
    R.prototype.F = function() {
        if (this.wa) for (; this.wa.length; ) this.wa.shift()();
    };
    function Ah(a) {
        a && typeof a.M == p && a.M();
    }
    function Bh(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.c = !1;
    }
    Bh.prototype.stopPropagation = function() {
        this.c = !0;
    };
    Bh.prototype.b = function() {
        this.defaultPrevented = !0;
    };
    var Ch = {
        Wb: Ab,
        Xb: "mouseup",
        rc: "mousecancel",
        $j: Bb,
        bk: Db,
        ak: Cb,
        Yj: "mouseenter",
        Zj: "mouseleave"
    };
    function Dh(a, b) {
        Bh.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.f = this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.a = null;
        if (a) {
            var c = (this.type = a.type),
                d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            (b = a.relatedTarget)
                ? J && (Me(b, "nodeName") || (b = null))
                : c == Db
                ? (b = a.fromElement)
                : c == Cb && (b = a.toElement);
            this.relatedTarget = b;
            d
                ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
                  (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
                  (this.screenX = d.screenX || 0),
                  (this.screenY = d.screenY || 0))
                : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
                  (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
                  (this.screenX = a.screenX || 0),
                  (this.screenY = a.screenY || 0));
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.f = Se ? a.metaKey : a.ctrlKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = typeof a.pointerType === t ? a.pointerType : Eh[a.pointerType] || "";
            this.a = a;
            a.defaultPrevented && this.b();
        }
    }
    E(Dh, Bh);
    var Fh = [1, 4, 2],
        Eh = { 2: "touch", 3: "pen", 4: "mouse" };
    function Gh(a) {
        return vh ? 0 == a.a.button : a.type == Sa ? !0 : !!(a.a.button & Fh[0]);
    }
    Dh.prototype.stopPropagation = function() {
        Dh.m.stopPropagation.call(this);
        this.a.stopPropagation ? this.a.stopPropagation() : (this.a.cancelBubble = !0);
    };
    Dh.prototype.b = function() {
        Dh.m.b.call(this);
        var a = this.a;
        if (a.preventDefault) a.preventDefault();
        else if (((a.returnValue = !1), xh))
            try {
                if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
            } catch (b) {}
    };
    var Hh = "closure_listenable_" + ((1e6 * Math.random()) | 0);
    function Ih(a) {
        return !(!a || !a[Hh]);
    }
    var Jh = 0;
    function Kh(a, b, c, d, e) {
        this.listener = a;
        this.a = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Id = e;
        this.key = ++Jh;
        this.pc = this.ed = !1;
    }
    function Lh(a) {
        a.pc = !0;
        a.listener = null;
        a.a = null;
        a.src = null;
        a.Id = null;
    }
    function Mh(a) {
        this.src = a;
        this.a = {};
        this.b = 0;
    }
    Mh.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.a[f];
        a || ((a = this.a[f] = []), this.b++);
        var h = Nh(a, b, d, e);
        -1 < h
            ? ((b = a[h]), c || (b.ed = !1))
            : ((b = new Kh(b, this.src, f, !!d, e)), (b.ed = c), a.push(b));
        return b;
    };
    Mh.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.a)) return !1;
        var e = this.a[a];
        b = Nh(e, b, c, d);
        return -1 < b
            ? (Lh(e[b]),
              Array.prototype.splice.call(e, b, 1),
              0 == e.length && (delete this.a[a], this.b--),
              !0)
            : !1;
    };
    function Oh(a, b) {
        var c = b.type;
        if (!(c in a.a)) return !1;
        var d = Nc(a.a[c], b);
        d && (Lh(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
        return d;
    }
    function Ph(a, b) {
        b = b && b.toString();
        var c = 0,
            d;
        for (d in a.a)
            if (!b || d == b) {
                for (var e = a.a[d], f = 0; f < e.length; f++) ++c, Lh(e[f]);
                delete a.a[d];
                a.b--;
            }
        return c;
    }
    Mh.prototype.Fc = function(a, b, c, d) {
        a = this.a[a.toString()];
        var e = -1;
        a && (e = Nh(a, b, c, d));
        return -1 < e ? a[e] : null;
    };
    Mh.prototype.hasListener = function(a, b) {
        var c = void 0 !== a,
            d = c ? a.toString() : "",
            e = void 0 !== b;
        return hd(this.a, function(f) {
            for (var h = 0; h < f.length; ++h)
                if (!((c && f[h].type != d) || (e && f[h].capture != b))) return !0;
            return !1;
        });
    };
    function Nh(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.pc && f.listener == b && f.capture == !!c && f.Id == d) return e;
        }
        return -1;
    }
    var Qh = "closure_lm_" + ((1e6 * Math.random()) | 0),
        Rh = {},
        Sh = 0;
    function S(a, b, c, d, e) {
        if (d && d.once) return Th(a, b, c, d, e);
        if (B(b)) {
            for (var f = 0; f < b.length; f++) S(a, b[f], c, d, e);
            return null;
        }
        c = Uh(c);
        return Ih(a) ? a.w(b, c, sc(d) ? !!d.capture : !!d, e) : Vh(a, b, c, !1, d, e);
    }
    function Vh(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = sc(e) ? !!e.capture : !!e,
            k = Wh(a);
        k || (a[Qh] = k = new Mh(a));
        c = k.add(b, c, d, h, f);
        if (c.a) return c;
        d = Xh();
        c.a = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            yh || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Yh(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        Sh++;
        return c;
    }
    function Xh() {
        var a = Zh,
            b = wh
                ? function(c) {
                      return a.call(b.src, b.listener, c);
                  }
                : function(c) {
                      c = a.call(b.src, b.listener, c);
                      if (!c) return c;
                  };
        return b;
    }
    function Th(a, b, c, d, e) {
        if (B(b)) {
            for (var f = 0; f < b.length; f++) Th(a, b[f], c, d, e);
            return null;
        }
        c = Uh(c);
        return Ih(a) ? a.Ab(b, c, sc(d) ? !!d.capture : !!d, e) : Vh(a, b, c, !0, d, e);
    }
    function $h(a, b, c, d, e) {
        if (B(b)) for (var f = 0; f < b.length; f++) $h(a, b[f], c, d, e);
        else
            (d = sc(d) ? !!d.capture : !!d),
                (c = Uh(c)),
                Ih(a) ? a.ba(b, c, d, e) : a && (a = Wh(a)) && (b = a.Fc(b, c, d, e)) && ai(b);
    }
    function ai(a) {
        if (typeof a === Fb || !a || a.pc) return !1;
        var b = a.src;
        if (Ih(b)) return Oh(b.Ka, a);
        var c = a.type,
            d = a.a;
        b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent
            ? b.detachEvent(Yh(c), d)
            : b.addListener && b.removeListener && b.removeListener(d);
        Sh--;
        (c = Wh(b)) ? (Oh(c, a), 0 == c.b && ((c.src = null), (b[Qh] = null))) : Lh(a);
        return !0;
    }
    function bi(a, b) {
        if (!a) return 0;
        if (Ih(a)) return a.Ka ? Ph(a.Ka, b) : 0;
        a = Wh(a);
        if (!a) return 0;
        var c = 0;
        b = b && b.toString();
        for (var d in a.a)
            if (!b || d == b)
                for (var e = a.a[d].concat(), f = 0; f < e.length; ++f) ai(e[f]) && ++c;
        return c;
    }
    function Yh(a) {
        return a in Rh ? Rh[a] : (Rh[a] = "on" + a);
    }
    function ci(a, b, c, d) {
        var e = !0;
        if ((a = Wh(a)))
            if ((b = a.a[b.toString()]))
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.pc && ((f = di(f, d)), (e = e && !1 !== f));
                }
        return e;
    }
    function di(a, b) {
        var c = a.listener,
            d = a.Id || a.src;
        a.ed && ai(a);
        return c.call(d, b);
    }
    function Zh(a, b) {
        if (a.pc) return !0;
        if (!wh) {
            if (!b)
                a: {
                    b = ["window", "event"];
                    for (var c = y, d = 0; d < b.length; d++)
                        if (((c = c[b[d]]), null == c)) {
                            b = null;
                            break a;
                        }
                    b = c;
                }
            d = b;
            b = new Dh(d, this);
            c = !0;
            if (!(0 > d.keyCode || void 0 != d.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == d.keyCode)
                        try {
                            d.keyCode = -1;
                            break a;
                        } catch (h) {
                            e = !0;
                        }
                    if (e || void 0 == d.returnValue) d.returnValue = !0;
                }
                d = [];
                for (e = b.currentTarget; e; e = e.parentNode) d.push(e);
                a = a.type;
                for (e = d.length - 1; !b.c && 0 <= e; e--) {
                    b.currentTarget = d[e];
                    var f = ci(d[e], a, !0, b);
                    c = c && f;
                }
                for (e = 0; !b.c && e < d.length; e++)
                    (b.currentTarget = d[e]), (f = ci(d[e], a, !1, b)), (c = c && f);
            }
            return c;
        }
        return di(a, new Dh(b, this));
    }
    function Wh(a) {
        a = a[Qh];
        return a instanceof Mh ? a : null;
    }
    var ei = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
    function Uh(a) {
        if (rc(a)) return a;
        a[ei] ||
            (a[ei] = function(b) {
                return a.handleEvent(b);
            });
        return a[ei];
    }
    function fi(a) {
        R.call(this);
        this.b = a;
        this.a = {};
    }
    E(fi, R);
    var gi = [];
    x = fi.prototype;
    x.w = function(a, b, c, d) {
        return hi(this, a, b, c, d);
    };
    function ii(a, b, c, d) {
        hi(a, b, Sa, c, !1, d);
    }
    function hi(a, b, c, d, e, f) {
        B(c) || (c && (gi[0] = c.toString()), (c = gi));
        for (var h = 0; h < c.length; h++) {
            var k = S(b, c[h], d || a.handleEvent, e || !1, f || a.b || a);
            if (!k) break;
            a.a[k.key] = k;
        }
        return a;
    }
    x.Ab = function(a, b, c, d) {
        return ji(this, a, b, c, d);
    };
    function ji(a, b, c, d, e, f) {
        if (B(c)) for (var h = 0; h < c.length; h++) ji(a, b, c[h], d, e, f);
        else {
            b = Th(b, c, d || a.handleEvent, e, f || a.b || a);
            if (!b) return a;
            a.a[b.key] = b;
        }
        return a;
    }
    x.ba = function(a, b, c, d, e) {
        if (B(b)) for (var f = 0; f < b.length; f++) this.ba(a, b[f], c, d, e);
        else
            (c = c || this.handleEvent),
                (d = sc(d) ? !!d.capture : !!d),
                (e = e || this.b || this),
                (c = Uh(c)),
                (d = !!d),
                (b = Ih(a) ? a.Fc(b, c, d, e) : a ? ((a = Wh(a)) ? a.Fc(b, c, d, e) : null) : null),
                b && (ai(b), delete this.a[b.key]);
        return this;
    };
    function ki(a) {
        gd(
            a.a,
            function(b, c) {
                this.a.hasOwnProperty(c) && ai(b);
            },
            a
        );
        a.a = {};
    }
    x.F = function() {
        fi.m.F.call(this);
        ki(this);
    };
    x.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };
    function li() {
        R.call(this);
        this.Ka = new Mh(this);
        this.Fh = this;
        this.mf = null;
    }
    E(li, R);
    li.prototype[Hh] = !0;
    x = li.prototype;
    x.nd = u("mf");
    x.vf = fc("mf");
    x.addEventListener = function(a, b, c, d) {
        S(this, a, b, c, d);
    };
    x.removeEventListener = function(a, b, c, d) {
        $h(this, a, b, c, d);
    };
    x.dispatchEvent = function(a) {
        var b = this.nd();
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.nd()) c.push(b), ++d;
        }
        b = this.Fh;
        d = a.type || a;
        if (typeof a === t) a = new Bh(a, b);
        else if (a instanceof Bh) a.target = a.target || b;
        else {
            var e = a;
            a = new Bh(d, b);
            pd(a, e);
        }
        e = !0;
        if (c)
            for (var f = c.length - 1; !a.c && 0 <= f; f--) {
                var h = (a.currentTarget = c[f]);
                e = mi(h, d, !0, a) && e;
            }
        a.c ||
            ((h = a.currentTarget = b),
            (e = mi(h, d, !0, a) && e),
            a.c || (e = mi(h, d, !1, a) && e));
        if (c)
            for (f = 0; !a.c && f < c.length; f++)
                (h = a.currentTarget = c[f]), (e = mi(h, d, !1, a) && e);
        return e;
    };
    x.F = function() {
        li.m.F.call(this);
        this.Ka && Ph(this.Ka, void 0);
        this.mf = null;
    };
    x.w = function(a, b, c, d) {
        return this.Ka.add(String(a), b, !1, c, d);
    };
    x.Ab = function(a, b, c, d) {
        return this.Ka.add(String(a), b, !0, c, d);
    };
    x.ba = function(a, b, c, d) {
        return this.Ka.remove(String(a), b, c, d);
    };
    function mi(a, b, c, d) {
        b = a.Ka.a[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.pc && h.capture == c) {
                var k = h.listener,
                    l = h.Id || h.src;
                h.ed && Oh(a.Ka, h);
                e = !1 !== k.call(l, d) && e;
            }
        }
        return e && !d.defaultPrevented;
    }
    x.Fc = function(a, b, c, d) {
        return this.Ka.Fc(String(a), b, c, d);
    };
    x.hasListener = function(a, b) {
        return this.Ka.hasListener(void 0 !== a ? String(a) : void 0, b);
    };
    function ni() {}
    pc(ni);
    ni.prototype.a = 0;
    function T(a) {
        li.call(this);
        this.b = a || Uf();
        this.la = oi;
        this.ia = null;
        this.U = !1;
        this.A = null;
        this.K = void 0;
        this.G = this.s = this.B = this.ra = null;
        this.jb = !1;
    }
    E(T, li);
    T.prototype.tb = ni.X();
    var oi = null;
    function pi(a, b) {
        switch (a) {
            case 1:
                return b ? "disable" : "enable";
            case 2:
                return b ? "highlight" : "unhighlight";
            case 4:
                return b ? "activate" : "deactivate";
            case 8:
                return b ? "select" : "unselect";
            case 16:
                return b ? "check" : "uncheck";
            case 32:
                return b ? cb : Ka;
            case 64:
                return b ? "open" : "close";
        }
        throw Error("Invalid component state");
    }
    function qi(a) {
        return a.ia || (a.ia = ":" + (a.tb.a++).toString(36));
    }
    function ri(a, b) {
        if (a.B && a.B.G) {
            var c = a.B.G,
                d = a.ia;
            d in c && delete c[d];
            md(a.B.G, b, a);
        }
        a.ia = b;
    }
    x = T.prototype;
    x.j = u("A");
    function si(a, b) {
        return a.A ? $f(b, a.A || a.b.a) : null;
    }
    function U(a) {
        a.K || (a.K = new fi(a));
        return a.K;
    }
    function ti(a, b) {
        if (a == b) throw Error(xa);
        if (b && a.B && a.ia && ui(a.B, a.ia) && a.B != b) throw Error(xa);
        a.B = b;
        T.m.vf.call(a, b);
    }
    x.wb = u("B");
    x.vf = function(a) {
        if (this.B && this.B != a) throw Error("Method not supported");
        T.m.vf.call(this, a);
    };
    x.D = function() {
        this.A = Ng(this.b, g);
    };
    x.fa = function(a) {
        vi(this, a);
    };
    function vi(a, b, c) {
        if (a.U) throw Error(ka);
        a.A || a.D();
        b ? b.insertBefore(a.A, c || null) : a.b.a.body.appendChild(a.A);
        (a.B && !a.B.U) || a.O();
    }
    function wi(a, b) {
        if (a.U) throw Error(ka);
        if (b && a.Ce(b)) {
            a.jb = !0;
            var c = O(b);
            (a.b && a.b.a == c) || (a.b = Uf(b));
            a.S(b);
            a.O();
        } else throw Error("Invalid element to decorate");
    }
    x.Ce = v(!0);
    x.S = fc("A");
    x.O = function() {
        this.U = !0;
        xi(this, function(a) {
            !a.U && a.j() && a.O();
        });
    };
    x.Z = function() {
        xi(this, function(a) {
            a.U && a.Z();
        });
        this.K && ki(this.K);
        this.U = !1;
    };
    x.F = function() {
        this.U && this.Z();
        this.K && (this.K.M(), delete this.K);
        xi(this, function(a) {
            a.M();
        });
        !this.jb && this.A && sg(this.A);
        this.B = this.ra = this.A = this.G = this.s = null;
        T.m.F.call(this);
    };
    function V(a, b) {
        return qi(a) + "." + b;
    }
    x.sc = function(a, b) {
        this.ie(a, yi(this), b);
    };
    x.ie = function(a, b, c) {
        if (a.U && (c || !this.U)) throw Error(ka);
        if (0 > b || b > yi(this)) throw Error("Child component index out of bounds");
        (this.G && this.s) || ((this.G = {}), (this.s = []));
        if (a.wb() == this) {
            var d = qi(a);
            this.G[d] = a;
            Nc(this.s, a);
        } else md(this.G, qi(a), a);
        ti(a, this);
        Qc(this.s, b, 0, a);
        a.U && this.U && a.wb() == this
            ? ((c = this.ud()),
              (b = c.childNodes[b] || null),
              b != a.j() && c.insertBefore(a.j(), b))
            : c
            ? (this.A || this.D(), (b = zi(this, b + 1)), vi(a, this.ud(), b ? b.A : null))
            : this.U && !a.U && a.A && a.A.parentNode && 1 == a.A.parentNode.nodeType && a.O();
    };
    x.ud = u("A");
    function Ai(a) {
        null == a.la && (a.la = gh(a.U ? a.A : a.b.a.body));
        return a.la;
    }
    function yi(a) {
        return a.s ? a.s.length : 0;
    }
    function ui(a, b) {
        a.G && b ? ((a = a.G), (b = (null !== a && b in a ? a[b] : void 0) || null)) : (b = null);
        return b;
    }
    function zi(a, b) {
        return a.s ? a.s[b] || null : null;
    }
    function xi(a, b, c) {
        a.s && Gc(a.s, b, c);
    }
    function Bi(a, b) {
        return a.s && b ? Fc(a.s, b) : -1;
    }
    x.removeChild = function(a, b) {
        if (a) {
            var c = typeof a === t ? a : qi(a);
            a = ui(this, c);
            if (c && a) {
                var d = this.G;
                c in d && delete d[c];
                Nc(this.s, a);
                b && (a.Z(), a.A && sg(a.A));
                ti(a, null);
            }
        }
        if (!a) throw Error("Child is not in parent component");
        return a;
    };
    x.Rc = function(a) {
        for (var b = []; this.s && 0 != this.s.length; ) b.push(this.removeChild(zi(this, 0), a));
        return b;
    };
    function Ci() {}
    var Di;
    pc(Ci);
    var Ei = {
        button: "pressed",
        checkbox: Qa,
        menuitem: Rb,
        menuitemcheckbox: Qa,
        menuitemradio: Qa,
        radio: Qa,
        tab: Rb,
        treeitem: Rb
    };
    x = Ci.prototype;
    x.$b = ec();
    x.D = function(a) {
        return a.b.D(g, Fi(this, a).join(" "), a.ea());
    };
    x.zb = function(a) {
        return a;
    };
    function Gi(a, b, c) {
        if ((a = a.j ? a.j() : a)) {
            var d = [b];
            I && !L("7") && ((d = Hi(Gf(a), b)), d.push(b));
            (c ? Jf : Lf)(a, d);
        }
    }
    x.xd = v(!0);
    x.Oa = function(a, b) {
        b.id && ri(a, b.id);
        var c = this.zb(b);
        c && c.firstChild
            ? Ii(a, c.firstChild.nextSibling ? Pc(c.childNodes) : c.firstChild)
            : (a.Mb = null);
        var d = 0,
            e = this.da(),
            f = this.da(),
            h = !1,
            k = !1,
            l = !1,
            m = Pc(Gf(b));
        Gc(
            m,
            function(r) {
                h || r != e
                    ? k || r != f
                        ? (d |= this.pd(r))
                        : (k = !0)
                    : ((h = !0), f == e && (k = !0));
                1 == this.pd(r) && Ig(c) && Jg(c) && Hg(c, !1);
            },
            this
        );
        a.V = d;
        h || (m.push(e), f == e && (k = !0));
        k || m.push(f);
        (a = a.ve) && m.push.apply(m, a);
        if (I && !L("7")) {
            var n = Hi(m);
            0 < n.length && (m.push.apply(m, n), (l = !0));
        }
        (h && k && !a && !l) || Hf(b, m.join(" "));
        return b;
    };
    x.hg = function(a) {
        Ai(a) && this.He(a.j(), !0);
        a.isEnabled() && this.ac(a, a.isVisible());
    };
    function Ji(a, b, c) {
        if ((a = c || a.$b())) (c = b.getAttribute("role") || null), a != c && th(b, a);
    }
    function Ki(a, b, c) {
        b.isVisible() || uh(c, qb, !b.isVisible());
        b.isEnabled() || a.Wa(c, 1, !b.isEnabled());
        b.aa & 8 && a.Wa(c, 8, !!(b.V & 8));
        b.aa & 16 && a.Wa(c, 16, !!(b.V & 16));
        b.aa & 64 && a.Wa(c, 64, !!(b.V & 64));
    }
    x.yd = function(a, b) {
        ih(a, !b, !I && !Oe);
    };
    x.He = function(a, b) {
        Gi(a, this.da() + "-rtl", b);
    };
    x.Ge = function(a) {
        var b;
        return a.aa & 32 && (b = a.j()) ? Ig(b) && Jg(b) : !1;
    };
    x.ac = function(a, b) {
        var c;
        if (a.aa & 32 && (c = a.j())) {
            if (!b && a.V & 32) {
                try {
                    c.blur();
                } catch (d) {}
                a.V & 32 && a.ig(null);
            }
            (Ig(c) && Jg(c)) != b && Hg(c, b);
        }
    };
    x.I = function(a, b) {
        Q(a, b);
        a && uh(a, qb, !b);
    };
    x.Kc = function(a, b, c) {
        var d = a.j();
        if (d) {
            var e = this.Ec(b);
            e && Gi(a, e, c);
            this.Wa(d, b, c);
        }
    };
    x.Wa = function(a, b, c) {
        Di || (Di = { 1: "disabled", 8: Rb, 16: Qa, 64: "expanded" });
        b = Di[b];
        var d = a.getAttribute("role") || null;
        d && ((d = Ei[d] || b), (b = b == Qa || b == Rb ? d : b));
        b && uh(a, b, c);
    };
    x.Jc = function(a, b) {
        var c = this.zb(a);
        c &&
            (pg(c),
            b &&
                (typeof b === t
                    ? Eg(c, b)
                    : ((a = function(d) {
                          if (d) {
                              var e = O(c);
                              c.appendChild(typeof d === t ? e.createTextNode(d) : d);
                          }
                      }),
                      B(b) ? Gc(b, a) : !qc(b) || "nodeType" in b ? a(b) : Gc(Pc(b), a))));
    };
    x.da = v("goog-control");
    function Fi(a, b) {
        var c = a.da(),
            d = [c],
            e = a.da();
        e != c && d.push(e);
        c = b.V;
        for (e = []; c; ) {
            var f = c & -c;
            e.push(a.Ec(f));
            c &= ~f;
        }
        d.push.apply(d, e);
        (a = b.ve) && d.push.apply(d, a);
        I && !L("7") && d.push.apply(d, Hi(d));
        return d;
    }
    function Hi(a, b) {
        var c = [];
        b && (a = Oc(a, [b]));
        Gc([], function(d) {
            !Kc(d, yc(Mc, a)) || (b && !Mc(d, b)) || c.push(d.join("_"));
        });
        return c;
    }
    x.Ec = function(a) {
        this.a || Mi(this);
        return this.a[a];
    };
    x.pd = function(a) {
        if (!this.c) {
            this.a || Mi(this);
            var b = this.a,
                c = {},
                d;
            for (d in b) c[b[d]] = d;
            this.c = c;
        }
        a = parseInt(this.c[a], 10);
        return isNaN(a) ? 0 : a;
    };
    function Mi(a) {
        var b = a.da();
        b.replace(/\xa0|\s/g, " ");
        a.a = {
            1: b + ba,
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        };
    }
    function Ni() {}
    E(Ni, Ci);
    pc(Ni);
    x = Ni.prototype;
    x.$b = v(Ma);
    x.Wa = function(a, b, c) {
        switch (b) {
            case 8:
            case 16:
                uh(a, "pressed", c);
                break;
            default:
            case 64:
            case 1:
                Ni.m.Wa.call(this, a, b, c);
        }
    };
    x.D = function(a) {
        var b = Ni.m.D.call(this, a),
            c = a.l;
        b && (c ? (b.title = c) : b.removeAttribute("title"));
        (c = a.Aa()) && this.ya(b, c);
        a.aa & 16 && this.Wa(b, 16, !!(a.V & 16));
        return b;
    };
    x.Oa = function(a, b) {
        b = Ni.m.Oa.call(this, a, b);
        var c = this.Aa(b);
        a.g = c;
        a.l = b.title;
        a.aa & 16 && this.Wa(b, 16, !!(a.V & 16));
        return b;
    };
    x.Aa = z;
    x.ya = z;
    x.da = v("goog-button");
    function Oi(a) {
        if ((a.altKey && !a.ctrlKey) || a.metaKey || (112 <= a.keyCode && 123 >= a.keyCode))
            return !1;
        if (Pi(a.keyCode)) return !0;
        switch (a.keyCode) {
            case 18:
            case 20:
            case 93:
            case 17:
            case 40:
            case 35:
            case 27:
            case 36:
            case 45:
            case 37:
            case 224:
            case 91:
            case 144:
            case 12:
            case 34:
            case 33:
            case 19:
            case 255:
            case 44:
            case 39:
            case 145:
            case 16:
            case 38:
            case 252:
            case 224:
            case 92:
                return !1;
            case 0:
                return !J;
            default:
                return 166 > a.keyCode || 183 < a.keyCode;
        }
    }
    function Qi(a, b, c, d, e, f) {
        if (K && !L("525")) return !0;
        if (Se && e) return Pi(a);
        if (e && !d) return !1;
        if (!J) {
            typeof b === Fb && (b = Ri(b));
            var h = 17 == b || 18 == b || (Se && 91 == b);
            if (((!c || Se) && h) || (Se && 16 == b && (d || f))) return !1;
        }
        if ((K || Pe) && d && c)
            switch (a) {
                case 220:
                case 219:
                case 221:
                case 192:
                case 186:
                case 189:
                case 187:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                    return !1;
            }
        if (I && d && b == a) return !1;
        switch (a) {
            case 13:
                return J ? (f || e ? !1 : !(c && d)) : !0;
            case 27:
                return !(K || Pe || J);
        }
        return J && (d || e || f) ? !1 : Pi(a);
    }
    function Pi(a) {
        if (
            (48 <= a && 57 >= a) ||
            (96 <= a && 106 >= a) ||
            (65 <= a && 90 >= a) ||
            ((K || Pe) && 0 == a)
        )
            return !0;
        switch (a) {
            case 32:
            case 43:
            case 63:
            case 64:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
            case 163:
            case 58:
                return !0;
            case 173:
                return J;
            default:
                return !1;
        }
    }
    function Ri(a) {
        if (J) a = Si(a);
        else if (Se && K)
            switch (a) {
                case 93:
                    a = 91;
            }
        return a;
    }
    function Si(a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a;
        }
    }
    function Ti(a, b) {
        li.call(this);
        a && Ui(this, a, b);
    }
    E(Ti, li);
    x = Ti.prototype;
    x.A = null;
    x.Nd = null;
    x.We = null;
    x.Od = null;
    x.Fa = -1;
    x.hb = -1;
    x.le = !1;
    var Vi = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
        },
        Wi = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "U+007F": 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        Xi = !K || L("525"),
        Yi = Se && J;
    x = Ti.prototype;
    x.ki = function(a) {
        if (K || Pe)
            if (
                (17 == this.Fa && !a.ctrlKey) ||
                (18 == this.Fa && !a.altKey) ||
                (Se && 91 == this.Fa && !a.metaKey)
            )
                this.hb = this.Fa = -1;
        -1 == this.Fa &&
            (a.ctrlKey && 17 != a.keyCode
                ? (this.Fa = 17)
                : a.altKey && 18 != a.keyCode
                ? (this.Fa = 18)
                : a.metaKey && 91 != a.keyCode && (this.Fa = 91));
        Xi && !Qi(a.keyCode, this.Fa, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey)
            ? this.handleEvent(a)
            : ((this.hb = Ri(a.keyCode)), Yi && (this.le = a.altKey));
    };
    x.li = function(a) {
        this.hb = this.Fa = -1;
        this.le = a.altKey;
    };
    x.handleEvent = function(a) {
        var b = a.a,
            c = b.altKey;
        if (I && a.type == yb) {
            var d = this.hb;
            var e = 13 != d && 27 != d ? b.keyCode : 0;
        } else
            (K || Pe) && a.type == yb
                ? ((d = this.hb),
                  (e = 0 <= b.charCode && 63232 > b.charCode && Pi(d) ? b.charCode : 0))
                : Oe && !K
                ? ((d = this.hb), (e = Pi(d) ? b.keyCode : 0))
                : (a.type == yb
                      ? (Yi && (c = this.le),
                        b.keyCode == b.charCode
                            ? 32 > b.keyCode
                                ? ((d = b.keyCode), (e = 0))
                                : ((d = this.hb), (e = b.charCode))
                            : ((d = b.keyCode || this.hb), (e = b.charCode || 0)))
                      : ((d = b.keyCode || this.hb), (e = b.charCode || 0)),
                  Se && 63 == e && 224 == d && (d = 191));
        var f = (d = Ri(d));
        d
            ? 63232 <= d && d in Vi
                ? (f = Vi[d])
                : 25 == d && a.shiftKey && (f = 9)
            : b.keyIdentifier && b.keyIdentifier in Wi && (f = Wi[b.keyIdentifier]);
        (J && Xi && a.type == yb && !Qi(f, this.Fa, a.shiftKey, a.ctrlKey, c, a.metaKey)) ||
            ((a = f == this.Fa),
            (this.Fa = f),
            (b = new Zi(f, e, a, b)),
            (b.altKey = c),
            this.dispatchEvent(b));
    };
    x.j = u("A");
    function Ui(a, b, c) {
        a.Od && $i(a);
        a.A = b;
        a.Nd = S(a.A, yb, a, c);
        a.We = S(a.A, xb, a.ki, c, a);
        a.Od = S(a.A, "keyup", a.li, c, a);
    }
    function $i(a) {
        a.Nd && (ai(a.Nd), ai(a.We), ai(a.Od), (a.Nd = null), (a.We = null), (a.Od = null));
        a.A = null;
        a.Fa = -1;
        a.hb = -1;
    }
    x.F = function() {
        Ti.m.F.call(this);
        $i(this);
    };
    function Zi(a, b, c, d) {
        Dh.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.repeat = c;
    }
    E(Zi, Dh);
    function aj(a, b) {
        if (!a) throw Error("Invalid class name " + a);
        if (!rc(b)) throw Error("Invalid decorator function " + b);
        bj[a] = b;
    }
    var cj = {},
        bj = {};
    function W(a, b, c) {
        T.call(this, c);
        if (!b) {
            for (b = this.constructor; b; ) {
                var d = tc(b);
                if ((d = cj[d])) break;
                b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor;
            }
            b = d ? (rc(d.X) ? d.X() : new d()) : null;
        }
        this.a = b;
        this.Mb = void 0 !== a ? a : null;
    }
    E(W, T);
    x = W.prototype;
    x.Mb = null;
    x.V = 0;
    x.aa = 39;
    x.kb = 255;
    x.Vc = 0;
    x.ga = !0;
    x.ve = null;
    x.Oe = !0;
    x.ad = !1;
    function dj(a, b) {
        a.U && b != a.Oe && ej(a, b);
        a.Oe = b;
    }
    x.D = function() {
        var a = this.a.D(this);
        this.A = a;
        Ji(this.a, a, this.Gc());
        this.ad || this.a.yd(a, !1);
        this.isVisible() || this.a.I(a, !1);
    };
    x.Gc = v(null);
    x.ud = function() {
        return this.a.zb(this.j());
    };
    x.Ce = function(a) {
        return this.a.xd(a);
    };
    x.S = function(a) {
        this.A = a = this.a.Oa(this, a);
        Ji(this.a, a, this.Gc());
        this.ad || this.a.yd(a, !1);
        this.ga = a.style.display != q;
    };
    x.O = function() {
        W.m.O.call(this);
        Ki(this.a, this, this.A);
        this.a.hg(this);
        if (this.aa & -2 && (this.Oe && ej(this, !0), this.aa & 32)) {
            var a = this.j();
            if (a) {
                var b = this.f || (this.f = new Ti());
                Ui(b, a);
                U(this)
                    .w(b, "key", this.Ga)
                    .w(a, cb, this.Vh)
                    .w(a, Ka, this.ig);
            }
        }
    };
    function ej(a, b) {
        var c = U(a),
            d = a.j();
        b
            ? (c
                  .w(d, Ch.Wb, a.Mc)
                  .w(d, [Ch.Xb, Ch.rc], a.dc)
                  .w(d, Db, a.Ie)
                  .w(d, Cb, a.Pe),
              a.Oc != z && c.w(d, Wa, a.Oc),
              I && (L(9) || c.w(d, Xa, a.mg), a.h || ((a.h = new fj(a)), zh(a, yc(Ah, a.h)))))
            : (c
                  .ba(d, Ch.Wb, a.Mc)
                  .ba(d, [Ch.Xb, Ch.rc], a.dc)
                  .ba(d, Db, a.Ie)
                  .ba(d, Cb, a.Pe),
              a.Oc != z && c.ba(d, Wa, a.Oc),
              I && (L(9) || c.ba(d, Xa, a.mg), Ah(a.h), (a.h = null)));
    }
    x.Z = function() {
        W.m.Z.call(this);
        this.f && $i(this.f);
        this.isVisible() && this.isEnabled() && this.a.ac(this, !1);
    };
    x.F = function() {
        W.m.F.call(this);
        this.f && (this.f.M(), delete this.f);
        delete this.a;
        this.h = this.ve = this.Mb = null;
    };
    x.ea = u("Mb");
    x.Nb = function(a) {
        this.a.Jc(this.j(), a);
        this.Mb = a;
    };
    function Ii(a, b) {
        a.Mb = b;
    }
    x.bb = function() {
        var a = this.ea();
        if (!a) return "";
        a = typeof a === t ? a : B(a) ? Ic(a, Mg).join("") : Kg(a);
        return xe(a);
    };
    x.Wg = function(a) {
        this.Nb(a);
    };
    x.isVisible = u("ga");
    x.I = function(a, b) {
        return b || (this.ga != a && this.dispatchEvent(a ? "show" : rb))
            ? ((b = this.j()) && this.a.I(b, a),
              this.isEnabled() && this.a.ac(this, a),
              (this.ga = a),
              !0)
            : !1;
    };
    x.isEnabled = function() {
        return !(this.V & 1);
    };
    x.ka = function(a) {
        var b = this.wb();
        (b && typeof b.isEnabled == p && !b.isEnabled()) ||
            !gj(this, 1, !a) ||
            (a || (hj(this, !1), ij(this, !1)),
            this.isVisible() && this.a.ac(this, a),
            jj(this, 1, !a, !0));
    };
    function ij(a, b) {
        gj(a, 2, b) && jj(a, 2, b);
    }
    x.fc = function() {
        return !!(this.V & 4);
    };
    function hj(a, b) {
        gj(a, 4, b) && jj(a, 4, b);
    }
    function kj(a, b) {
        gj(a, 64, b) && jj(a, 64, b);
    }
    function jj(a, b, c, d) {
        d || 1 != b
            ? a.aa & b && c != !!(a.V & b) && (a.a.Kc(a, b, c), (a.V = c ? a.V | b : a.V & ~b))
            : a.ka(!c);
    }
    x.ta = function(a, b) {
        if (this.U && this.V & a && !b) throw Error(ka);
        !b && this.V & a && jj(this, a, !1);
        this.aa = b ? this.aa | a : this.aa & ~a;
    };
    function lj(a, b) {
        return !!(a.kb & b) && !!(a.aa & b);
    }
    function gj(a, b, c) {
        return (
            !!(a.aa & b) && !!(a.V & b) != c && (!(a.Vc & b) || a.dispatchEvent(pi(b, c))) && !a.ub
        );
    }
    x.Ie = function(a) {
        (!a.relatedTarget || !xg(this.j(), a.relatedTarget)) &&
            this.dispatchEvent("enter") &&
            this.isEnabled() &&
            lj(this, 2) &&
            ij(this, !0);
    };
    x.Pe = function(a) {
        (a.relatedTarget && xg(this.j(), a.relatedTarget)) ||
            !this.dispatchEvent("leave") ||
            (lj(this, 4) && hj(this, !1), lj(this, 2) && ij(this, !1));
    };
    x.Oc = z;
    x.Mc = function(a) {
        this.isEnabled() &&
            (lj(this, 2) && ij(this, !0),
            !Gh(a) ||
                (K && Se && a.ctrlKey) ||
                (lj(this, 4) && hj(this, !0), this.a && this.a.Ge(this) && this.j().focus()));
        this.ad || !Gh(a) || (K && Se && a.ctrlKey) || a.b();
    };
    x.dc = function(a) {
        this.isEnabled() &&
            (lj(this, 2) && ij(this, !0), this.fc() && this.nc(a) && lj(this, 4) && hj(this, !1));
    };
    x.mg = function(a) {
        this.isEnabled() && this.nc(a);
    };
    x.nc = function(a) {
        if (lj(this, 16)) {
            var b = !(this.V & 16);
            gj(this, 16, b) && jj(this, 16, b);
        }
        lj(this, 8) && gj(this, 8, !0) && jj(this, 8, !0);
        lj(this, 64) && kj(this, !(this.V & 64));
        b = new Bh(Ca, this);
        a &&
            ((b.altKey = a.altKey),
            (b.ctrlKey = a.ctrlKey),
            (b.metaKey = a.metaKey),
            (b.shiftKey = a.shiftKey),
            (b.f = a.f));
        return this.dispatchEvent(b);
    };
    x.Vh = function() {
        lj(this, 32) && gj(this, 32, !0) && jj(this, 32, !0);
    };
    x.ig = function() {
        lj(this, 4) && hj(this, !1);
        lj(this, 32) && gj(this, 32, !1) && jj(this, 32, !1);
    };
    x.Ga = function(a) {
        return this.isVisible() && this.isEnabled() && this.Lc(a)
            ? (a.b(), a.stopPropagation(), !0)
            : !1;
    };
    x.Lc = function(a) {
        return 13 == a.keyCode && this.nc(a);
    };
    if (!rc(W)) throw Error("Invalid component class " + W);
    if (!rc(Ci)) throw Error("Invalid renderer class " + Ci);
    var mj = tc(W);
    cj[mj] = Ci;
    aj("goog-control", function() {
        return new W(null);
    });
    function fj(a) {
        R.call(this);
        this.b = a;
        this.a = !1;
        this.c = new fi(this);
        zh(this, yc(Ah, this.c));
        a = this.b.A;
        this.c
            .w(a, Ch.Wb, this.g)
            .w(a, Ch.Xb, this.h)
            .w(a, Sa, this.f);
    }
    E(fj, R);
    var nj = !I || ff(9);
    fj.prototype.g = function() {
        this.a = !1;
    };
    fj.prototype.h = function() {
        this.a = !0;
    };
    function oj(a, b) {
        if (!nj) return (a.button = 0), (a.type = b), a;
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(
            b,
            a.bubbles,
            a.cancelable,
            a.view || null,
            a.detail,
            a.screenX,
            a.screenY,
            a.clientX,
            a.clientY,
            a.ctrlKey,
            a.altKey,
            a.shiftKey,
            a.metaKey,
            0,
            a.relatedTarget || null
        );
        return c;
    }
    fj.prototype.f = function(a) {
        if (this.a) this.a = !1;
        else {
            var b = a.a,
                c = b.button,
                d = b.type,
                e = oj(b, Ab);
            this.b.Mc(new Dh(e, a.currentTarget));
            e = oj(b, "mouseup");
            this.b.dc(new Dh(e, a.currentTarget));
            nj || ((b.button = c), (b.type = d));
        }
    };
    fj.prototype.F = function() {
        this.b = null;
        fj.m.F.call(this);
    };
    function pj() {}
    E(pj, Ni);
    pc(pj);
    x = pj.prototype;
    x.$b = ec();
    x.D = function(a) {
        dj(a, !1);
        a.kb &= -256;
        a.ta(32, !1);
        return a.b.D(
            "BUTTON",
            {
                class: Fi(this, a).join(" "),
                disabled: !a.isEnabled(),
                title: a.l || "",
                value: a.Aa() || ""
            },
            a.bb() || ""
        );
    };
    x.xd = function(a) {
        return (
            "BUTTON" == a.tagName ||
            (a.tagName == oa && (a.type == Ma || "submit" == a.type || "reset" == a.type))
        );
    };
    x.Oa = function(a, b) {
        dj(a, !1);
        a.kb &= -256;
        a.ta(32, !1);
        if (b.disabled) {
            var c = this.Ec(1);
            M(b, c);
        }
        return pj.m.Oa.call(this, a, b);
    };
    x.hg = function(a) {
        U(a).w(a.j(), Sa, a.nc);
    };
    x.yd = z;
    x.He = z;
    x.Ge = function(a) {
        return a.isEnabled();
    };
    x.ac = z;
    x.Kc = function(a, b, c) {
        pj.m.Kc.call(this, a, b, c);
        (a = a.j()) && 1 == b && (a.disabled = c);
    };
    x.Aa = function(a) {
        return a.value;
    };
    x.ya = function(a, b) {
        a && (a.value = b);
    };
    x.Wa = z;
    function qj(a, b, c) {
        W.call(this, a, b || pj.X(), c);
    }
    E(qj, W);
    x = qj.prototype;
    x.Aa = u("g");
    x.ya = function(a) {
        this.g = a;
        this.a.ya(this.j(), a);
    };
    x.F = function() {
        qj.m.F.call(this);
        delete this.g;
        delete this.l;
    };
    x.O = function() {
        qj.m.O.call(this);
        if (this.aa & 32) {
            var a = this.j();
            a && U(this).w(a, "keyup", this.Lc);
        }
    };
    x.Lc = function(a) {
        return (13 == a.keyCode && "key" == a.type) || (32 == a.keyCode && "keyup" == a.type)
            ? this.nc(a)
            : 32 == a.keyCode;
    };
    aj("goog-button", function() {
        return new qj(null);
    });
    function rj() {}
    E(rj, Ni);
    pc(rj);
    x = rj.prototype;
    x.D = function(a) {
        var b = Fi(this, a);
        b = a.b.D(g, hb + b.join(" "), sj(this, a.ea(), a.b));
        a = a.l;
        b && (a ? (b.title = a) : b.removeAttribute("title"));
        return b;
    };
    x.$b = v(Ma);
    x.zb = function(a) {
        return a && a.firstChild && a.firstChild.firstChild;
    };
    function sj(a, b, c) {
        return c.D(g, hb + (a.da() + "-outer-box"), c.D(g, hb + (a.da() + "-inner-box"), b));
    }
    x.xd = function(a) {
        return a.tagName == g;
    };
    x.Oa = function(a, b) {
        tj(b, !0);
        tj(b, !1);
        a: {
            var c = a.b.cg(b);
            var d = this.da() + "-outer-box";
            if (c && If(c, d) && ((c = a.b.cg(c)), (d = this.da() + "-inner-box"), c && If(c, d))) {
                c = !0;
                break a;
            }
            c = !1;
        }
        c || b.appendChild(sj(this, b.childNodes, a.b));
        Jf(b, ["goog-inline-block", this.da()]);
        return rj.m.Oa.call(this, a, b);
    };
    x.da = v("goog-custom-button");
    function tj(a, b) {
        if (a)
            for (var c = b ? a.firstChild : a.lastChild, d; c && c.parentNode == a; ) {
                d = b ? c.nextSibling : c.previousSibling;
                if (3 == c.nodeType) {
                    var e = c.nodeValue;
                    if ("" == Sc(e)) a.removeChild(c);
                    else {
                        c.nodeValue = b ? ye(e) : ze(e);
                        break;
                    }
                } else break;
                c = d;
            }
    }
    function uj(a, b, c) {
        qj.call(this, a, b || rj.X(), c);
        this.ta(16, !0);
    }
    E(uj, qj);
    aj("goog-toggle-button", function() {
        return new uj(null);
    });
    var vj = "StopIteration" in y ? y.StopIteration : { message: "StopIteration", stack: "" };
    function wj() {}
    wj.prototype.next = function() {
        throw vj;
    };
    wj.prototype.Ja = function() {
        return this;
    };
    function xj(a) {
        if (a instanceof wj) return a;
        if (typeof a.Ja == p) return a.Ja(!1);
        if (qc(a)) {
            var b = 0,
                c = new wj();
            c.next = function() {
                for (;;) {
                    if (b >= a.length) throw vj;
                    if (b in a) return a[b++];
                    b++;
                }
            };
            return c;
        }
        throw Error("Not implemented");
    }
    function yj(a, b, c) {
        a = xj(a);
        try {
            for (; b.call(c, a.next(), void 0, a); );
        } catch (d) {
            if (d !== vj) throw d;
        }
    }
    function zj(a, b) {
        this.b = {};
        this.a = [];
        this.f = this.c = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
        } else if (a)
            if (a instanceof zj)
                for (c = a.Ra(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
            else for (d in a) this.set(d, a[d]);
    }
    x = zj.prototype;
    x.Da = function() {
        Aj(this);
        for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
        return a;
    };
    x.Ra = function() {
        Aj(this);
        return this.a.concat();
    };
    function Bj(a, b) {
        return Cj(a.b, b);
    }
    function Dj(a) {
        a.b = {};
        a.a.length = 0;
        a.c = 0;
        a.f = 0;
    }
    x.remove = function(a) {
        return Cj(this.b, a)
            ? (delete this.b[a], this.c--, this.f++, this.a.length > 2 * this.c && Aj(this), !0)
            : !1;
    };
    function Aj(a) {
        if (a.c != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length; ) {
                var d = a.a[b];
                Cj(a.b, d) && (a.a[c++] = d);
                b++;
            }
            a.a.length = c;
        }
        if (a.c != a.a.length) {
            var e = {};
            for (c = b = 0; b < a.a.length; )
                (d = a.a[b]), Cj(e, d) || ((a.a[c++] = d), (e[d] = 1)), b++;
            a.a.length = c;
        }
    }
    x.get = function(a, b) {
        return Cj(this.b, a) ? this.b[a] : b;
    };
    x.set = function(a, b) {
        Cj(this.b, a) || (this.c++, this.a.push(a), this.f++);
        this.b[a] = b;
    };
    x.forEach = function(a, b) {
        for (var c = this.Ra(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this);
        }
    };
    x.Ja = function(a) {
        Aj(this);
        var b = 0,
            c = this.f,
            d = this,
            e = new wj();
        e.next = function() {
            if (c != d.f) throw Error("The map has changed since the iterator was created");
            if (b >= d.a.length) throw vj;
            var f = d.a[b++];
            return a ? f : d.b[f];
        };
        return e;
    };
    function Cj(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function Ej(a) {
        if (a.Da && typeof a.Da == p) return a.Da();
        if (typeof a === t) return a.split("");
        if (qc(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b;
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b;
    }
    function Fj(a, b, c) {
        if (a.forEach && typeof a.forEach == p) a.forEach(b, c);
        else if (qc(a) || typeof a === t) Gc(a, b, c);
        else {
            if (a.Ra && typeof a.Ra == p) var d = a.Ra();
            else if (a.Da && typeof a.Da == p) d = void 0;
            else if (qc(a) || typeof a === t) {
                d = [];
                for (var e = a.length, f = 0; f < e; f++) d.push(f);
            } else d = id(a);
            e = Ej(a);
            f = e.length;
            for (var h = 0; h < f; h++) b.call(c, e[h], d && d[h], a);
        }
    }
    var Gj = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/\\#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    function Hj(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="),
                    e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1);
                } else f = a[c];
                b(f, e ? Be(e) : "");
            }
        }
    }
    function Ij(a) {
        this.f = this.s = this.c = "";
        this.l = null;
        this.g = this.h = "";
        this.b = !1;
        if (a instanceof Ij) {
            this.b = a.b;
            Jj(this, a.c);
            this.s = a.s;
            this.f = a.f;
            Kj(this, a.l);
            this.h = a.h;
            var b = a.a;
            var c = new Lj();
            c.c = b.c;
            b.a && ((c.a = new zj(b.a)), (c.b = b.b));
            Mj(this, c);
            this.g = a.g;
        } else
            a && (b = String(a).match(Gj))
                ? ((this.b = !1),
                  Jj(this, b[1] || "", !0),
                  (this.s = Nj(b[2] || "")),
                  (this.f = Nj(b[3] || "", !0)),
                  Kj(this, b[4]),
                  (this.h = Nj(b[5] || "", !0)),
                  Mj(this, b[6] || "", !0),
                  (this.g = Nj(b[7] || "")))
                : ((this.b = !1), (this.a = new Lj(null, this.b)));
    }
    Ij.prototype.toString = function() {
        var a = [],
            b = this.c;
        b && a.push(Oj(b, Pj, !0), ":");
        var c = this.f;
        if (c || "file" == b)
            a.push("//"),
                (b = this.s) && a.push(Oj(b, Pj, !0), "@"),
                a.push(Ae(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
                (c = this.l),
                null != c && a.push(":", String(c));
        if ((c = this.h))
            this.f && "/" != c.charAt(0) && a.push("/"),
                a.push(Oj(c, "/" == c.charAt(0) ? Qj : Rj, !0));
        (c = this.a.toString()) && a.push("?", c);
        (c = this.g) && a.push("#", Oj(c, Sj));
        return a.join("");
    };
    function Jj(a, b, c) {
        a.c = c ? Nj(b, !0) : b;
        a.c && (a.c = a.c.replace(/:$/, ""));
    }
    function Kj(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
            a.l = b;
        } else a.l = null;
    }
    function Mj(a, b, c) {
        b instanceof Lj
            ? ((a.a = b), Tj(a.a, a.b))
            : (c || (b = Oj(b, Uj)), (a.a = new Lj(b, a.b)));
    }
    function Nj(a, b) {
        return a ? (b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a)) : "";
    }
    function Oj(a, b, c) {
        return typeof a === t
            ? ((a = encodeURI(a).replace(b, Vj)),
              c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
              a)
            : null;
    }
    function Vj(a) {
        a = a.charCodeAt(0);
        return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    }
    var Pj = /[#\/\?@]/g,
        Rj = /[#\?:]/g,
        Qj = /[#\?]/g,
        Uj = /[#\?@]/g,
        Sj = /#/g;
    function Lj(a, b) {
        this.b = this.a = null;
        this.c = a || null;
        this.f = !!b;
    }
    function Wj(a) {
        a.a ||
            ((a.a = new zj()),
            (a.b = 0),
            a.c &&
                Hj(a.c, function(b, c) {
                    a.add(Be(b), c);
                }));
    }
    x = Lj.prototype;
    x.add = function(a, b) {
        Wj(this);
        this.c = null;
        a = Xj(this, a);
        var c = this.a.get(a);
        c || this.a.set(a, (c = []));
        c.push(b);
        this.b = this.b + 1;
        return this;
    };
    x.remove = function(a) {
        Wj(this);
        a = Xj(this, a);
        return Bj(this.a, a)
            ? ((this.c = null), (this.b = this.b - this.a.get(a).length), this.a.remove(a))
            : !1;
    };
    function Yj(a, b) {
        Wj(a);
        b = Xj(a, b);
        return Bj(a.a, b);
    }
    x.forEach = function(a, b) {
        Wj(this);
        this.a.forEach(function(c, d) {
            Gc(
                c,
                function(e) {
                    a.call(b, e, d, this);
                },
                this
            );
        }, this);
    };
    x.Ra = function() {
        Wj(this);
        for (var a = this.a.Da(), b = this.a.Ra(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c;
    };
    x.Da = function(a) {
        Wj(this);
        var b = [];
        if (typeof a === t) Yj(this, a) && (b = Oc(b, this.a.get(Xj(this, a))));
        else {
            a = this.a.Da();
            for (var c = 0; c < a.length; c++) b = Oc(b, a[c]);
        }
        return b;
    };
    x.set = function(a, b) {
        Wj(this);
        this.c = null;
        a = Xj(this, a);
        Yj(this, a) && (this.b = this.b - this.a.get(a).length);
        this.a.set(a, [b]);
        this.b = this.b + 1;
        return this;
    };
    x.get = function(a, b) {
        if (!a) return b;
        a = this.Da(a);
        return 0 < a.length ? String(a[0]) : b;
    };
    function Zj(a, b, c) {
        a.remove(b);
        0 < c.length && ((a.c = null), a.a.set(Xj(a, b), Pc(c)), (a.b = a.b + c.length));
    }
    x.toString = function() {
        if (this.c) return this.c;
        if (!this.a) return "";
        for (var a = [], b = this.a.Ra(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = Ae(d);
            d = this.Da(d);
            for (var f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + Ae(d[f]));
                a.push(h);
            }
        }
        return (this.c = a.join("&"));
    };
    function Xj(a, b) {
        b = String(b);
        a.f && (b = b.toLowerCase());
        return b;
    }
    function Tj(a, b) {
        b &&
            !a.f &&
            (Wj(a),
            (a.c = null),
            a.a.forEach(function(c, d) {
                var e = d.toLowerCase();
                d != e && (this.remove(d), Zj(this, e, c));
            }, a));
        a.f = b;
    }
    x.dg = function(a) {
        for (var b = 0; b < arguments.length; b++)
            Fj(
                arguments[b],
                function(c, d) {
                    this.add(d, c);
                },
                this
            );
    };
    var ak = {},
        bk = {},
        ck = {},
        dk = {};
    function ek() {
        throw Error("Do not instantiate directly");
    }
    ek.prototype.fd = null;
    ek.prototype.ea = u("a");
    ek.prototype.toString = u("a");
    function fk(a) {
        if (a.Ib !== ak) throw Error("Sanitized content was not of kind HTML.");
        return oe(a.toString(), a.fd || null);
    }
    function gk() {
        ek.call(this);
    }
    E(gk, ek);
    gk.prototype.Ib = ak;
    function hk() {
        ek.call(this);
    }
    E(hk, ek);
    hk.prototype.Ib = dk;
    hk.prototype.fd = 1;
    function ik(a, b) {
        return null != a && a.Ib === b;
    }
    function jk(a) {
        if (null != a)
            switch (a.fd) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0;
            }
        return null;
    }
    function kk(a) {
        return ik(a, ak)
            ? a
            : a instanceof ee
            ? lk(ge(a).toString(), a.a())
            : lk(Ce(String(String(a))), jk(a));
    }
    var lk = (function(a) {
            function b(c) {
                this.a = c;
            }
            b.prototype = a.prototype;
            return function(c, d) {
                c = new b(String(c));
                void 0 !== d && (c.fd = d);
                return c;
            };
        })(gk),
        mk = (function(a) {
            function b(c) {
                this.a = c;
            }
            b.prototype = a.prototype;
            return function(c) {
                return new b(String(c));
            };
        })(hk);
    function nk(a) {
        return a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>");
    }
    function X(a) {
        return ik(a, ak)
            ? String(
                  String(a.ea())
                      .replace(ok, "")
                      .replace(pk, "&lt;")
              ).replace(qk, rk)
            : Ce(String(a));
    }
    function sk(a) {
        ik(a, bk) || ik(a, ck)
            ? (a = tk(a))
            : a instanceof Jd
            ? (a = tk(Md(a)))
            : a instanceof Dd
            ? (a = tk(Gd(a).toString()))
            : ((a = String(a)), (a = uk.test(a) ? a.replace(vk, wk) : Aa));
        return a;
    }
    function xk(a) {
        ik(a, bk) || ik(a, ck)
            ? (a = tk(a))
            : a instanceof Jd
            ? (a = tk(Md(a)))
            : a instanceof Dd
            ? (a = tk(Gd(a).toString()))
            : ((a = String(a)), (a = yk.test(a) ? a.replace(vk, wk) : Aa));
        return a;
    }
    function zk(a) {
        return ik(a, ck) ? a.ea() : a instanceof Dd ? Gd(a).toString() : Aa;
    }
    function Ak(a) {
        ik(a, dk)
            ? (a = nk(a.ea()))
            : null == a
            ? (a = "")
            : a instanceof Pd
            ? (a = nk(Rd(a)))
            : a instanceof ae
            ? (a = nk(ce(a)))
            : ((a = String(a)), (a = Bk.test(a) ? a : "zSoyz"));
        return a;
    }
    var Ck = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\x0B": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    };
    function rk(a) {
        return Ck[a];
    }
    var Dk = {
        "\x00": "\\0 ",
        "\b": "\\8 ",
        "\t": "\\9 ",
        "\n": "\\a ",
        "\x0B": "\\b ",
        "\f": "\\c ",
        "\r": "\\d ",
        '"': "\\22 ",
        "&": "\\26 ",
        "'": "\\27 ",
        "(": "\\28 ",
        ")": "\\29 ",
        "*": "\\2a ",
        "/": "\\2f ",
        ":": "\\3a ",
        ";": "\\3b ",
        "<": "\\3c ",
        "=": "\\3d ",
        ">": "\\3e ",
        "@": "\\40 ",
        "\\": "\\5c ",
        "{": "\\7b ",
        "}": "\\7d ",
        "\u0085": "\\85 ",
        "\u00a0": "\\a0 ",
        "\u2028": "\\2028 ",
        "\u2029": "\\2029 "
    };
    function Ek(a) {
        return Dk[a];
    }
    var Fk = {
        "\x00": "%00",
        "\u0001": "%01",
        "\u0002": "%02",
        "\u0003": "%03",
        "\u0004": "%04",
        "\u0005": "%05",
        "\u0006": "%06",
        "\u0007": "%07",
        "\b": "%08",
        "\t": "%09",
        "\n": "%0A",
        "\x0B": "%0B",
        "\f": "%0C",
        "\r": "%0D",
        "\u000e": "%0E",
        "\u000f": "%0F",
        "\u0010": "%10",
        "\u0011": "%11",
        "\u0012": "%12",
        "\u0013": "%13",
        "\u0014": "%14",
        "\u0015": "%15",
        "\u0016": "%16",
        "\u0017": "%17",
        "\u0018": "%18",
        "\u0019": "%19",
        "\u001a": "%1A",
        "\u001b": "%1B",
        "\u001c": "%1C",
        "\u001d": "%1D",
        "\u001e": "%1E",
        "\u001f": "%1F",
        " ": "%20",
        '"': "%22",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "<": "%3C",
        ">": "%3E",
        "\\": "%5C",
        "{": "%7B",
        "}": "%7D",
        "\u007f": "%7F",
        "\u0085": "%C2%85",
        "\u00a0": "%C2%A0",
        "\u2028": "%E2%80%A8",
        "\u2029": "%E2%80%A9",
        "\uff01": "%EF%BC%81",
        "\uff03": "%EF%BC%83",
        "\uff04": "%EF%BC%84",
        "\uff06": "%EF%BC%86",
        "\uff07": "%EF%BC%87",
        "\uff08": "%EF%BC%88",
        "\uff09": "%EF%BC%89",
        "\uff0a": "%EF%BC%8A",
        "\uff0b": "%EF%BC%8B",
        "\uff0c": "%EF%BC%8C",
        "\uff0f": "%EF%BC%8F",
        "\uff1a": "%EF%BC%9A",
        "\uff1b": "%EF%BC%9B",
        "\uff1d": "%EF%BC%9D",
        "\uff1f": "%EF%BC%9F",
        "\uff20": "%EF%BC%A0",
        "\uff3b": "%EF%BC%BB",
        "\uff3d": "%EF%BC%BD"
    };
    function wk(a) {
        return Fk[a];
    }
    var qk = /[\x00\x22\x27\x3c\x3e]/g,
        Gk = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g,
        vk = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
        Bk = /^(?!-*(?:expression|(?:moz-)?binding))(?:(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|(?:rgb|hsl)a?\([0-9.%,\u0020]+\)|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,4}|%)?|!important)(?:\s*[,\u0020]\s*|$))*$/i,
        uk = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
        yk = /^[^&:\/?#]*(?:[\/?#]|$)|^https?:|^data:image\/[a-z0-9+]+;base64,[a-z0-9+\/]+=*$|^blob:/i;
    function tk(a) {
        return String(a).replace(vk, wk);
    }
    var ok = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
        pk = /</g;
    function Hk() {}
    Hk.prototype.b = ec();
    var Ik = (function() {
        if (Te) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec(cd)) ? a[1] : "0";
        }
        return Se
            ? ((a = /10[_.][0-9_.]+/), (a = a.exec(cd)) ? a[0].replace(/_/g, ".") : "10")
            : Ue
            ? ((a = /Android\s+([^\);]+)(\)|;)/), (a = a.exec(cd)) ? a[1] : "")
            : Ve || We || Xe
            ? ((a = /(?:iPhone|CPU)\s+OS\s+(\S+)/), (a = a.exec(cd)) ? a[1].replace(/_/g, ".") : "")
            : "";
    })();
    function Jk(a) {
        return (a = a.exec(cd)) ? a[1] : "";
    }
    var Kk = (function() {
        if (kf) return Jk(/Firefox\/([0-9.]+)/);
        if (I || Pe || Oe) return df;
        if (of) return Ke() ? Jk(/CriOS\/([0-9.]+)/) : Jk(/Chrome\/([0-9.]+)/);
        if (pf && !Ke()) return Jk(/Version\/([0-9.]+)/);
        if (lf || mf) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(cd);
            if (a) return a[1] + "." + a[2];
        } else if (nf) return (a = Jk(/Android\s+([0-9.]+)/)) ? a : Jk(/Version\/([0-9.]+)/);
        return "";
    })();
    function Lk(a, b, c, d, e, f, h, k, l) {
        var m = Mk(c);
        var n = ah(a);
        var r = ch(a);
        n = new Qg(n.x, n.y, r.width, r.height);
        if ((r = $g(a))) {
            var w = new Qg(r.left, r.top, r.right - r.left, r.bottom - r.top);
            r = Math.max(n.left, w.left);
            var G = Math.min(n.left + n.width, w.left + w.width);
            if (r <= G) {
                var F = Math.max(n.top, w.top);
                w = Math.min(n.top + n.height, w.top + w.height);
                F <= w && ((n.left = r), (n.top = F), (n.width = G - r), (n.height = w - F));
            }
        }
        r = Uf(a);
        F = Uf(c);
        r.a != F.a &&
            ((G = r.a.body),
            (F = bh(G, Og(F))),
            (F = Sf(F, ah(G))),
            !I || ff(9) || dg(r.a) || (F = Sf(F, eg(r.a))),
            (n.left += F.x),
            (n.top += F.y));
        a = Nk(a, b);
        b = n.left;
        a & 4 ? (b += n.width) : a & 2 && (b += n.width / 2);
        b = new N(b, n.top + (a & 1 ? n.height : 0));
        b = Sf(b, m);
        e && ((b.x += (a & 4 ? -1 : 1) * e.x), (b.y += (a & 1 ? -1 : 1) * e.y));
        if (h)
            if (l) var ca = l;
            else if ((ca = $g(c)))
                (ca.top -= m.y), (ca.right -= m.x), (ca.bottom -= m.y), (ca.left -= m.x);
        return Ok(b, c, d, f, ca, h, k);
    }
    function Mk(a) {
        if ((a = a.offsetParent)) {
            var b = "HTML" == a.tagName || "BODY" == a.tagName;
            if (!b || "static" != Ug(a, Kb)) {
                var c = ah(a);
                if (!b) {
                    b = gh(a);
                    var d;
                    if ((d = b)) {
                        d = pf && 0 <= ad(Kk, 10);
                        var e;
                        if ((e = Ye)) e = 0 <= ad(Ik, 10);
                        d = J || d || e;
                    }
                    b = d
                        ? -a.scrollLeft
                        : !b || (Qe && L("8")) || Ug(a, "overflowX") == cc
                        ? a.scrollLeft
                        : a.scrollWidth - a.clientWidth - a.scrollLeft;
                    c = Sf(c, new N(b, a.scrollTop));
                }
            }
        }
        return c || new N();
    }
    function Ok(a, b, c, d, e, f, h) {
        a = Rf(a);
        var k = Nk(b, c);
        c = ch(b);
        h = h ? new Tf(h.width, h.height) : new Tf(c.width, c.height);
        a = Rf(a);
        h = new Tf(h.width, h.height);
        var l = 0;
        if (d || 0 != k)
            k & 4
                ? (a.x -= h.width + (d ? d.right : 0))
                : k & 2
                ? (a.x -= h.width / 2)
                : d && (a.x += d.left),
                k & 1 ? (a.y -= h.height + (d ? d.bottom : 0)) : d && (a.y += d.top);
        if (f) {
            if (e) {
                d = a;
                k = h;
                l = 0;
                65 == (f & 65) && (d.x < e.left || d.x >= e.right) && (f &= -2);
                132 == (f & 132) && (d.y < e.top || d.y >= e.bottom) && (f &= -5);
                d.x < e.left && f & 1 && ((d.x = e.left), (l |= 1));
                if (f & 16) {
                    var m = d.x;
                    d.x < e.left && ((d.x = e.left), (l |= 4));
                    d.x + k.width > e.right &&
                        ((k.width = Math.min(e.right - d.x, m + k.width - e.left)),
                        (k.width = Math.max(k.width, 0)),
                        (l |= 4));
                }
                d.x + k.width > e.right &&
                    f & 1 &&
                    ((d.x = Math.max(e.right - k.width, e.left)), (l |= 1));
                f & 2 && (l |= (d.x < e.left ? 16 : 0) | (d.x + k.width > e.right ? 32 : 0));
                d.y < e.top && f & 4 && ((d.y = e.top), (l |= 2));
                f & 32 &&
                    ((m = d.y),
                    d.y < e.top && ((d.y = e.top), (l |= 8)),
                    d.y + k.height > e.bottom &&
                        ((k.height = Math.min(e.bottom - d.y, m + k.height - e.top)),
                        (k.height = Math.max(k.height, 0)),
                        (l |= 8)));
                d.y + k.height > e.bottom &&
                    f & 4 &&
                    ((d.y = Math.max(e.bottom - k.height, e.top)), (l |= 2));
                f & 8 && (l |= (d.y < e.top ? 64 : 0) | (d.y + k.height > e.bottom ? 128 : 0));
                e = l;
            } else e = 256;
            l = e;
        }
        f = new Qg(0, 0, 0, 0);
        f.left = a.x;
        f.top = a.y;
        f.width = h.width;
        f.height = h.height;
        e = l;
        if (e & 496) return e;
        Vg(b, new N(f.left, f.top));
        h = new Tf(f.width, f.height);
        c == h ||
            (c && h && c.width == h.width && c.height == h.height) ||
            ((c = h),
            (a = dg(Uf(O(b)).a)),
            !I || L("10") || (a && L("8"))
                ? lh(b, c, La)
                : ((h = b.style),
                  a
                      ? ((a = mh(b)),
                        (b = nh(b)),
                        (h.pixelWidth = c.width - b.left - a.left - a.right - b.right),
                        (h.pixelHeight = c.height - b.top - a.top - a.bottom - b.bottom))
                      : ((h.pixelWidth = c.width), (h.pixelHeight = c.height))));
        return e;
    }
    function Nk(a, b) {
        return (b & 8 && gh(a) ? b ^ 4 : b) & -9;
    }
    function Pk(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable;
        } catch (b) {
            return !1;
        }
    }
    function Qk(a, b) {
        this.c = a;
        this.f = b;
        this.b = 0;
        this.a = null;
    }
    Qk.prototype.get = function() {
        if (0 < this.b) {
            this.b--;
            var a = this.a;
            this.a = a.next;
            a.next = null;
        } else a = this.c();
        return a;
    };
    function Rk(a, b) {
        a.f(b);
        100 > a.b && (a.b++, (b.next = a.a), (a.a = b));
    }
    function Sk(a) {
        y.setTimeout(function() {
            throw a;
        }, 0);
    }
    var Tk;
    function Uk() {
        var a = y.MessageChannel;
        "undefined" === typeof a &&
            "undefined" !== typeof window &&
            window.postMessage &&
            window.addEventListener &&
            !H("Presto") &&
            (a = function() {
                var e = jg(document, na);
                e.style.display = q;
                e.src = Gd(new Dd(Ed, Bd(Cd))).toString();
                document.documentElement.appendChild(e);
                var f = e.contentWindow;
                e = f.document;
                e.open();
                e.write(ge(qe));
                e.close();
                var h = "callImmediate" + Math.random(),
                    k =
                        "file:" == f.location.protocol
                            ? "*"
                            : f.location.protocol + "//" + f.location.host;
                e = C(function(l) {
                    if (("*" == k || l.origin == k) && l.data == h) this.port1.onmessage();
                }, this);
                f.addEventListener("message", e, !1);
                this.port1 = {};
                this.port2 = {
                    postMessage: function() {
                        f.postMessage(h, k);
                    }
                };
            });
        if ("undefined" !== typeof a && !rd()) {
            var b = new a(),
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.Sf;
                    c.Sf = null;
                    e();
                }
            };
            return function(e) {
                d.next = { Sf: e };
                d = d.next;
                b.port2.postMessage(0);
            };
        }
        return "undefined" !== typeof document && "onreadystatechange" in jg(document, ta)
            ? function(e) {
                  var f = jg(document, ta);
                  f.onreadystatechange = function() {
                      f.onreadystatechange = null;
                      f.parentNode.removeChild(f);
                      f = null;
                      e();
                      e = null;
                  };
                  document.documentElement.appendChild(f);
              }
            : function(e) {
                  y.setTimeout(e, 0);
              };
    }
    function Vk() {
        this.b = this.a = null;
    }
    var Xk = new Qk(
        function() {
            return new Wk();
        },
        function(a) {
            a.reset();
        }
    );
    Vk.prototype.add = function(a, b) {
        var c = Xk.get();
        c.set(a, b);
        this.b ? (this.b.next = c) : (this.a = c);
        this.b = c;
    };
    Vk.prototype.remove = function() {
        var a = null;
        this.a &&
            ((a = this.a), (this.a = this.a.next), this.a || (this.b = null), (a.next = null));
        return a;
    };
    function Wk() {
        this.next = this.b = this.a = null;
    }
    Wk.prototype.set = function(a, b) {
        this.a = a;
        this.b = b;
        this.next = null;
    };
    Wk.prototype.reset = function() {
        this.next = this.b = this.a = null;
    };
    function Yk(a, b) {
        Zk || $k();
        al || (Zk(), (al = !0));
        bl.add(a, b);
    }
    var Zk;
    function $k() {
        if (y.Promise && y.Promise.resolve) {
            var a = y.Promise.resolve(void 0);
            Zk = function() {
                a.then(cl);
            };
        } else
            Zk = function() {
                var b = cl;
                !rc(y.setImmediate) ||
                (y.Window &&
                    y.Window.prototype &&
                    !H(la) &&
                    y.Window.prototype.setImmediate == y.setImmediate)
                    ? (Tk || (Tk = Uk()), Tk(b))
                    : y.setImmediate(b);
            };
    }
    var al = !1,
        bl = new Vk();
    function cl() {
        for (var a; (a = bl.remove()); ) {
            try {
                a.a.call(a.b);
            } catch (b) {
                Sk(b);
            }
            Rk(Xk, a);
        }
        al = !1;
    }
    function dl(a, b) {
        this.a = 0;
        this.l = void 0;
        this.f = this.b = this.c = null;
        this.g = this.h = !1;
        if (a != z)
            try {
                var c = this;
                a.call(
                    b,
                    function(d) {
                        el(c, 2, d);
                    },
                    function(d) {
                        el(c, 3, d);
                    }
                );
            } catch (d) {
                el(this, 3, d);
            }
    }
    function fl() {
        this.next = this.c = this.b = this.f = this.a = null;
        this.g = !1;
    }
    fl.prototype.reset = function() {
        this.c = this.b = this.f = this.a = null;
        this.g = !1;
    };
    var gl = new Qk(
        function() {
            return new fl();
        },
        function(a) {
            a.reset();
        }
    );
    function hl(a, b, c) {
        var d = gl.get();
        d.f = a;
        d.b = b;
        d.c = c;
        return d;
    }
    function il(a) {
        if (a instanceof dl) return a;
        var b = new dl(z);
        el(b, 2, a);
        return b;
    }
    function jl() {
        var a = kl[5];
        return new dl(function(b, c) {
            c(a);
        });
    }
    dl.prototype.then = function(a, b, c) {
        return ll(this, rc(a) ? a : null, rc(b) ? b : null, c);
    };
    dl.prototype.$goog_Thenable = !0;
    dl.prototype.cancel = function(a) {
        if (0 == this.a) {
            var b = new ml(a);
            Yk(function() {
                nl(this, b);
            }, this);
        }
    };
    function nl(a, b) {
        if (0 == a.a)
            if (a.c) {
                var c = a.c;
                if (c.b) {
                    for (
                        var d = 0, e = null, f = null, h = c.b;
                        h && (h.g || (d++, h.a == a && (e = h), !(e && 1 < d)));
                        h = h.next
                    )
                        e || (f = h);
                    e &&
                        (0 == c.a && 1 == d
                            ? nl(c, b)
                            : (f
                                  ? ((d = f), d.next == c.f && (c.f = d), (d.next = d.next.next))
                                  : ol(c),
                              pl(c, e, 3, b)));
                }
                a.c = null;
            } else el(a, 3, b);
    }
    function ql(a, b) {
        a.b || (2 != a.a && 3 != a.a) || rl(a);
        a.f ? (a.f.next = b) : (a.b = b);
        a.f = b;
    }
    function ll(a, b, c, d) {
        var e = hl(null, null, null);
        e.a = new dl(function(f, h) {
            e.f = b
                ? function(k) {
                      try {
                          var l = b.call(d, k);
                          f(l);
                      } catch (m) {
                          h(m);
                      }
                  }
                : f;
            e.b = c
                ? function(k) {
                      try {
                          var l = c.call(d, k);
                          void 0 === l && k instanceof ml ? h(k) : f(l);
                      } catch (m) {
                          h(m);
                      }
                  }
                : h;
        });
        e.a.c = a;
        ql(a, e);
        return e.a;
    }
    dl.prototype.o = function(a) {
        this.a = 0;
        el(this, 2, a);
    };
    dl.prototype.B = function(a) {
        this.a = 0;
        el(this, 3, a);
    };
    function el(a, b, c) {
        if (0 == a.a) {
            a === c && ((b = 3), (c = new TypeError("Promise cannot resolve to itself")));
            a.a = 1;
            a: {
                var d = c,
                    e = a.o,
                    f = a.B;
                if (d instanceof dl) {
                    ql(d, hl(e || z, f || null, a));
                    var h = !0;
                } else if (Pk(d)) d.then(e, f, a), (h = !0);
                else {
                    if (sc(d))
                        try {
                            var k = d.then;
                            if (rc(k)) {
                                sl(d, k, e, f, a);
                                h = !0;
                                break a;
                            }
                        } catch (l) {
                            f.call(a, l);
                            h = !0;
                            break a;
                        }
                    h = !1;
                }
            }
            h || ((a.l = c), (a.a = b), (a.c = null), rl(a), 3 != b || c instanceof ml || tl(a, c));
        }
    }
    function sl(a, b, c, d, e) {
        function f(l) {
            k || ((k = !0), d.call(e, l));
        }
        function h(l) {
            k || ((k = !0), c.call(e, l));
        }
        var k = !1;
        try {
            b.call(a, h, f);
        } catch (l) {
            f(l);
        }
    }
    function rl(a) {
        a.h || ((a.h = !0), Yk(a.s, a));
    }
    function ol(a) {
        var b = null;
        a.b && ((b = a.b), (a.b = b.next), (b.next = null));
        a.b || (a.f = null);
        return b;
    }
    dl.prototype.s = function() {
        for (var a; (a = ol(this)); ) pl(this, a, this.a, this.l);
        this.h = !1;
    };
    function pl(a, b, c, d) {
        if (3 == c && b.b && !b.g) for (; a && a.g; a = a.c) a.g = !1;
        if (b.a) (b.a.c = null), ul(b, c, d);
        else
            try {
                b.g ? b.f.call(b.c) : ul(b, c, d);
            } catch (e) {
                vl.call(null, e);
            }
        Rk(gl, b);
    }
    function ul(a, b, c) {
        2 == b ? a.f.call(a.c, c) : a.b && a.b.call(a.c, c);
    }
    function tl(a, b) {
        a.g = !0;
        Yk(function() {
            a.g && vl.call(null, b);
        });
    }
    var vl = Sk;
    function ml(a) {
        Cc.call(this, a);
    }
    E(ml, Cc);
    ml.prototype.name = "cancel";
    function wl(a, b, c) {
        if (rc(a)) c && (a = C(a, c));
        else if (a && typeof a.handleEvent == p) a = C(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : y.setTimeout(a, b || 0);
    }
    function xl(a) {
        y.clearTimeout(a);
    }
    function yl(a, b, c) {
        R.call(this);
        this.b = a;
        this.f = b || 0;
        this.c = c;
        this.a = C(this.Th, this);
    }
    E(yl, R);
    x = yl.prototype;
    x.ia = 0;
    x.F = function() {
        yl.m.F.call(this);
        this.stop();
        delete this.b;
        delete this.c;
    };
    x.start = function(a) {
        this.stop();
        this.ia = wl(this.a, void 0 !== a ? a : this.f);
    };
    x.stop = function() {
        this.fc() && xl(this.ia);
        this.ia = 0;
    };
    x.fc = function() {
        return 0 != this.ia;
    };
    x.Th = function() {
        this.ia = 0;
        this.b && this.b.call(this.c);
    };
    function zl(a, b) {
        b = a(b || Al, void 0, void 0);
        a = Ng(Uf(), g);
        b = sc(b) ? (b instanceof ek ? fk(b) : he("zSoyz")) : he(String(b));
        te(a, b);
        1 == a.childNodes.length && ((b = a.firstChild), 1 == b.nodeType && (a = b));
        return a;
    }
    var Al = {};
    function Bl() {}
    Bl.prototype.a = null;
    function Cl(a) {
        var b;
        (b = a.a) || ((b = {}), Dl(a) && ((b[0] = !0), (b[1] = !0)), (b = a.a = b));
        return b;
    }
    var El;
    function Fl() {}
    E(Fl, Bl);
    function Gl(a) {
        return (a = Dl(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
    }
    function Dl(a) {
        if (!a.b && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (
                var b = [
                        "MSXML2.XMLHTTP.6.0",
                        "MSXML2.XMLHTTP.3.0",
                        "MSXML2.XMLHTTP",
                        "Microsoft.XMLHTTP"
                    ],
                    c = 0;
                c < b.length;
                c++
            ) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), (a.b = d);
                } catch (e) {}
            }
            throw Error(
                "Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"
            );
        }
        return a.b;
    }
    El = new Fl();
    function Hl(a) {
        li.call(this);
        this.headers = new zj();
        this.ge = a || null;
        this.ma = !1;
        this.fe = this.N = null;
        this.rb = "";
        this.Ha = 0;
        this.Pd = "";
        this.Qb = this.Se = this.Kd = this.te = !1;
        this.Wc = 0;
        this.ce = null;
        this.Tg = "";
        this.Ef = this.lh = !1;
    }
    E(Hl, li);
    Hl.prototype.sa = null;
    var Il = /^https?$/i,
        Jl = [sa, "PUT"],
        Kl = [];
    function Ll(a, b, c, d, e) {
        var f = new Hl();
        Kl.push(f);
        b && f.w(Ua, b);
        f.Ab(Ob, f.Ih);
        e && (f.Wc = Math.max(0, e));
        f.send(a, c, d, void 0);
    }
    x = Hl.prototype;
    x.Ih = function() {
        this.M();
        Nc(Kl, this);
    };
    x.send = function(a, b, c, d) {
        if (this.N)
            throw Error(
                "[goog.net.XhrIo] Object is active with another request=" +
                    this.rb +
                    "; newUri=" +
                    a
            );
        b = b ? b.toUpperCase() : "GET";
        this.rb = a;
        this.Pd = "";
        this.Ha = 0;
        this.te = !1;
        this.ma = !0;
        this.N = this.ge ? Gl(this.ge) : Gl(El);
        this.fe = this.ge ? Cl(this.ge) : Cl(El);
        this.N.onreadystatechange = C(this.Lg, this);
        try {
            this.xa(), (this.Se = !0), this.N.open(b, String(a), !0), (this.Se = !1);
        } catch (f) {
            this.xa();
            this.kd(5, f);
            return;
        }
        a = c || "";
        var e = new zj(this.headers);
        d &&
            Fj(d, function(f, h) {
                e.set(h, f);
            });
        d = Lc(e.Ra(), Ml);
        c = y.FormData && a instanceof y.FormData;
        !Mc(Jl, b) ||
            d ||
            c ||
            e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function(f, h) {
            this.N.setRequestHeader(h, f);
        }, this);
        this.Tg && (this.N.responseType = this.Tg);
        dc in this.N && this.N.withCredentials !== this.lh && (this.N.withCredentials = this.lh);
        try {
            Nl(this),
                0 < this.Wc &&
                    ((this.Ef = Ol(this.N)),
                    this.xa(),
                    this.Ef
                        ? ((this.N.timeout = this.Wc), (this.N.ontimeout = C(this.Eb, this)))
                        : (this.ce = wl(this.Eb, this.Wc, this))),
                this.xa(),
                (this.Kd = !0),
                this.N.send(a),
                (this.Kd = !1);
        } catch (f) {
            this.xa(), this.kd(5, f);
        }
    };
    function Ol(a) {
        return I && L(9) && typeof a.timeout === Fb && void 0 !== a.ontimeout;
    }
    function Ml(a) {
        return "content-type" == a.toLowerCase();
    }
    x.Eb = function() {
        "undefined" != typeof goog &&
            this.N &&
            ((this.Pd = "Timed out after " + this.Wc + "ms, aborting"),
            (this.Ha = 8),
            this.xa(),
            this.dispatchEvent("timeout"),
            this.abort(8));
    };
    x.kd = function(a, b) {
        this.ma = !1;
        this.N && ((this.Qb = !0), this.N.abort(), (this.Qb = !1));
        this.Pd = b;
        this.Ha = a;
        Pl(this);
        Ql(this);
    };
    function Pl(a) {
        a.te || ((a.te = !0), a.dispatchEvent(Ua), a.dispatchEvent("error"));
    }
    x.abort = function(a) {
        this.N &&
            this.ma &&
            (this.xa(),
            (this.ma = !1),
            (this.Qb = !0),
            this.N.abort(),
            (this.Qb = !1),
            (this.Ha = a || 7),
            this.dispatchEvent(Ua),
            this.dispatchEvent("abort"),
            Ql(this));
    };
    x.F = function() {
        this.N &&
            (this.ma && ((this.ma = !1), (this.Qb = !0), this.N.abort(), (this.Qb = !1)),
            Ql(this, !0));
        Hl.m.F.call(this);
    };
    x.Lg = function() {
        this.ub || (this.Se || this.Kd || this.Qb ? Rl(this) : this.$i());
    };
    x.$i = function() {
        Rl(this);
    };
    function Rl(a) {
        if (a.ma && "undefined" != typeof goog)
            if (a.fe[1] && 4 == Sl(a) && 2 == a.xa()) a.xa();
            else if (a.Kd && 4 == Sl(a)) wl(a.Lg, 0, a);
            else if ((a.dispatchEvent(Pb), a.Md())) {
                a.xa();
                a.ma = !1;
                try {
                    if (a.Qc()) a.dispatchEvent(Ua), a.dispatchEvent("success");
                    else {
                        a.Ha = 6;
                        try {
                            var b = 2 < Sl(a) ? a.N.statusText : "";
                        } catch (c) {
                            b = "";
                        }
                        a.Pd = b + " [" + a.xa() + "]";
                        Pl(a);
                    }
                } finally {
                    Ql(a);
                }
            }
    }
    function Ql(a, b) {
        if (a.N) {
            Nl(a);
            var c = a.N,
                d = a.fe[0] ? z : null;
            a.N = null;
            a.fe = null;
            b || a.dispatchEvent(Ob);
            try {
                c.onreadystatechange = d;
            } catch (e) {}
        }
    }
    function Nl(a) {
        a.N && a.Ef && (a.N.ontimeout = null);
        a.ce && (xl(a.ce), (a.ce = null));
    }
    x.fc = function() {
        return !!this.N;
    };
    x.Md = function() {
        return 4 == Sl(this);
    };
    x.Qc = function() {
        var a = this.xa();
        a: switch (a) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                var b = !0;
                break a;
            default:
                b = !1;
        }
        if (!b) {
            if ((a = 0 === a))
                (a = String(this.rb).match(Gj)[1] || null),
                    !a &&
                        y.self &&
                        y.self.location &&
                        ((a = y.self.location.protocol), (a = a.substr(0, a.length - 1))),
                    (a = !Il.test(a ? a.toLowerCase() : ""));
            b = a;
        }
        return b;
    };
    function Sl(a) {
        return a.N ? a.N.readyState : 0;
    }
    x.xa = function() {
        try {
            return 2 < Sl(this) ? this.N.status : -1;
        } catch (a) {
            return -1;
        }
    };
    x.Ae = function() {
        return String(this.rb);
    };
    x.Lb = function() {
        try {
            return this.N ? this.N.responseText : "";
        } catch (a) {
            return "";
        }
    };
    x.getResponseHeader = function(a) {
        if (this.N && this.Md()) return (a = this.N.getResponseHeader(a)), null === a ? void 0 : a;
    };
    x.getAllResponseHeaders = function() {
        return this.N && this.Md() ? this.N.getAllResponseHeaders() || "" : "";
    };
    x.ze = u("Ha");
    function Tl() {
        this.b = [];
        this.a = {};
        this.c = !1;
        this.B = 1;
        this.g = {};
        this.f = null;
        this.s = "";
        S(window, "beforeunload", this.o, !1, this);
    }
    pc(Tl);
    function Ul(a, b, c) {
        if (null == b) return "1";
        switch (A(b)) {
            case t:
                return (a = b), 64 < a.length && (null == c || !c) && (a = a.substr(0, 64)), Ae(a);
            case Fb:
                return "" + b;
            case "boolean":
                return b ? "1" : "0";
            case Ga:
                var d = [],
                    e;
                for (e in b) d.push(Ul(a, b[e], c));
                return d.join(",");
            case Gb:
                d = [];
                for (e in b) d.push(Vl(a, e, b[e], c));
                return d.join(",");
            default:
                return "";
        }
    }
    function Vl(a, b, c, d) {
        return [Ae(b), Ul(a, c, d || "smtalt" == b)].join("=");
    }
    Tl.prototype.log = function(a, b) {
        this.b.push([a, b]);
        this.c || ((this.c = !0), wl(this.h, 0, this));
    };
    Tl.prototype.h = function() {
        for (var a = 0; a < this.b.length; a++) {
            var b = this.b[a];
            Wl(this, b[0], b[1]);
        }
        this.b = [];
        this.c = !1;
    };
    function Wl(a, b, c) {
        Xl(a, a.s + "/gen204?" + (a.f ? ["client=", a.f, "&"].join("") : "") + Vl(a, b, c));
    }
    function Xl(a, b) {
        var c = new Image(),
            d = a.B++;
        a.g[d] = c;
        c.onload = c.onerror = function() {
            delete Tl.X().g[d];
        };
        c.src = b;
        c = null;
    }
    function Yl(a, b) {
        var c = 0,
            d = null;
        b in a.a && ((d = a.a[b]), (c = d[0]), (d = d[1]));
        if (A(1) == Gb) {
            A(d) != Gb && (d = {});
            for (var e in 1) d[e] = $l(e in d ? d[e] : null, (1)[e]);
        } else d = $l(d, 1);
        a.a[b] = [c, d];
        xl(a.a[b][0]);
        c = wl(C(a.l, a, b), 2e3);
        a.a[b][0] = c;
    }
    Tl.prototype.l = function(a) {
        Wl(this, a, this.a[a][1]);
        a in this.a && (xl(this.a[a][0]), delete this.a[a]);
    };
    function $l(a, b) {
        null == b && (b = 1);
        isNaN(a) && (a = parseInt(a, 10));
        isNaN(b) && (b = parseInt(b, 10));
        return a + b;
    }
    Tl.prototype.o = function() {
        this.h();
        for (var a in this.a) 0 != this.a[a] && this.l(a);
    };
    function am() {}
    pc(am);
    function bm(a) {
        xf(this, a, null);
    }
    E(bm, vf);
    function cm(a) {
        xf(this, a, dm);
    }
    E(cm, vf);
    var dm = [3, 4];
    function em(a) {
        xf(this, a, fm);
    }
    E(em, vf);
    var fm = [3];
    function gm(a) {
        xf(this, a, hm);
    }
    E(gm, vf);
    var hm = [2];
    function im(a) {
        xf(this, a, jm);
    }
    E(im, vf);
    var jm = [26, 80];
    im.prototype.cb = function() {
        return Af(this, 16);
    };
    im.prototype.Tb = function(a) {
        Bf(this, 16, a);
    };
    im.prototype.oa = function() {
        return Af(this, 1);
    };
    im.prototype.ua = function(a) {
        Bf(this, 1, a);
    };
    function km() {
        this.c = this.a = "";
        am.X();
    }
    pc(km);
    km.prototype.Tb = fc("a");
    km.prototype.ua = fc("c");
    km.prototype.store = function(a) {
        Bf(a, 65, 0);
        a.Tb(this.a);
        Bf(a, 14, "");
        a.ua(this.c);
        Bf(a, 50, "");
        Bf(a, 52, "");
        Bf(a, 32, 0);
    };
    function lm(a, b) {
        var c = a[b - 1];
        if (null == c || mm(c)) (a = a[a.length - 1]), mm(a) && (c = a[b]);
        return c;
    }
    function mm(a) {
        return sc(a) && !qc(a);
    }
    function nm(a, b) {
        return a === b
            ? !0
            : Kc(a, function(c, d) {
                  if (mm(c)) {
                      d = c;
                      for (var e in d) {
                          c = d[e];
                          var f = lm(b, +e);
                          if (!om(c, f)) return !1;
                      }
                      return !0;
                  }
                  e = lm(b, d + 1);
                  return om(c, e);
              }) &&
                  Kc(b, function(c, d) {
                      if (mm(c)) {
                          for (var e in c) if (null == lm(a, +e)) return !1;
                          return !0;
                      }
                      return (null == c) == (null == lm(a, d + 1));
                  });
    }
    function om(a, b) {
        return a === b ||
            (null == a && null == b) ||
            !((!0 !== a && 1 !== a) || (!0 !== b && 1 !== b)) ||
            !((!1 !== a && 0 !== a) || (!1 !== b && 0 !== b))
            ? !0
            : B(a) && B(b)
            ? nm(a, b)
            : !1;
    }
    function pm() {}
    function qm(a, b, c) {
        a = a.Ea = b = b || [];
        if (a.length) {
            var d = a.length - 1;
            b = a[d];
            if (mm(b) && (delete a[d], d < c)) {
                d = 0;
                for (var e in b) {
                    var f = +e;
                    f <= c ? ((a[f - 1] = b[e]), delete b[e]) : d++;
                }
                d && (a[c] = b);
            }
        }
    }
    function rm(a, b, c) {
        a = a.Ea[b];
        return null != a ? a : c;
    }
    function sm(a, b) {
        return !!rm(a, b, void 0);
    }
    function tm(a, b) {
        return rm(a, b, 0);
    }
    function um(a, b) {
        return rm(a, b, "");
    }
    function vm(a, b, c) {
        a = a.Ea;
        a[b] || (a[b] = []);
        return a[b][c];
    }
    function Y(a, b) {
        return a.Ea[b] ? a.Ea[b].length : 0;
    }
    pm.prototype.Fb = u("Ea");
    pm.prototype.sj = function(a) {
        var b = this.Ea;
        this.Ea = a.Ea;
        a.Ea = b;
    };
    function wm(a) {
        qm(this, a, 9);
    }
    E(wm, pm);
    function xm() {
        this.b = km.X();
    }
    E(xm, R);
    pc(xm);
    xm.prototype.a = function() {
        ym(this, 25);
    };
    function ym(a, b) {
        var c = new im();
        a.b.store(c);
        Bf(c, 31, b);
        return c;
    }
    function zm() {
        this.a = [];
    }
    zm.prototype.add = function(a) {
        this.a.push(a);
    };
    function Am() {
        this.a = [];
    }
    E(Am, zm);
    pc(Am);
    Am.prototype.add = function(a) {
        if (a) for (; a(); );
    };
    function Bm(a) {
        this.a = [];
        this.b = 0.5;
        Cm(this, a);
        this.f = 0;
        this.c = !0;
        this.g = C(this.h, this);
    }
    E(Bm, zm);
    function Cm(a, b) {
        1 < b ? (a.b = 1) : 0.001 > b ? (a.b = 0.001) : b && (a.b = b);
    }
    Bm.prototype.add = function(a) {
        Bm.m.add.call(this, a);
        this.c && Dm(this);
    };
    function Dm(a) {
        a.c = !1;
        window.setTimeout(a.g, Math.min(a.f, 5e3));
    }
    Bm.prototype.h = function() {
        var a = new Date().getTime();
        do {
            this.a.length && ((this.a[0] && this.a[0]()) || this.a.shift());
            var b = !!this.a.length;
            var c = 95 * this.b + 5;
            var d = new Date().getTime() - a;
        } while (b && d < c);
        this.f = Math.ceil(d * (1 / this.b - 1)) + 1;
        b ? Dm(this) : (this.c = !0);
    };
    function Em(a, b) {
        this.o = a || null;
        this.C = b || Am.X();
        this.l = this.h = this.G = null;
        this.f = this.c = !1;
        this.g = null;
        this.a = [];
        this.b = 0;
    }
    function Fm() {}
    function Gm() {}
    function Hm(a, b) {
        a.c || (a.G = b);
    }
    function Im(a, b, c) {
        a.h = c ? C(b, c) : b;
    }
    function Jm(a, b, c) {
        a.l = c ? C(b, c) : b;
    }
    function Km(a, b) {
        a.c || ((a.c = !0), (a.B = b), a.b++, (a.g = a.G), a.s());
    }
    Em.prototype.stop = function() {
        this.b++;
        this.c = !1;
        this.a = [];
    };
    function Lm(a) {
        if (!a.c) return null;
        for (var b = !1, c = 0; c < a.a.length; ++c)
            if (a.a[c].target === a) {
                a.a[c].ready = !1;
                a.a[c].jh = a.b + 1;
                b = !0;
                break;
            }
        b || a.a.push({ target: a, ready: !1, jh: a.b + 1 });
        return C(a.s, a, a, a.b + 1);
    }
    function Mm(a) {
        if (!a.c) return !0;
        for (var b = 0; b < a.a.length; ++b)
            if (a.a[b].target === a && a.a[b].jh == a.b) return a.a[b].ready;
        return !0;
    }
    Em.prototype.s = function(a, b) {
        if (this.c) {
            if (a)
                for (var c = 0; c < this.a.length; ++c)
                    if (this.a[c].target === a) {
                        this.a[c].ready = !0;
                        break;
                    }
            this.f || this.C.add(C(this.K, this, b || this.b));
        }
    };
    Em.prototype.K = function(a) {
        if (this.b != a) return !1;
        a = this.g;
        if (a == Gm) return this.stop(), this.h && this.h.call(this.o, this, this.B), !1;
        this.f = !0;
        try {
            var b = a.call(this.o, this, this.B);
            if (!b) throw Error();
        } catch (c) {
            this.stop();
            a = c;
            if (this.l) this.l.call(this.o, a, this, this.B);
            else throw a;
            return !1;
        } finally {
            this.f = !1;
        }
        b != Fm && ((this.g = b), this.b++, this.s());
        return !1;
    };
    function Nm(a, b) {
        B(b) || (b = [b]);
        b = Ic(b, function(c) {
            return typeof c === t
                ? c
                : c.Bk + " " + c.duration + "s " + c.timing + " " + c.delay + "s";
        });
        P(a, $b, b.join(","));
    }
    var Om = vd(function() {
        if (I) return L("10.0");
        var a = jg(document, g),
            b = K ? "-webkit" : J ? "-moz" : I ? "-ms" : Oe ? "-o" : null,
            c = { transition: Hb };
        b && (c[b + "-transition"] = Hb);
        b = me(Za, { style: c });
        te(a, b);
        a = a.firstChild;
        b = a.style[He($b)];
        return "" != ("undefined" !== typeof b ? b : a.style[Rg(a, $b)] || "");
    });
    function Pm(a, b) {
        li.call(this);
        this.h = new fi(this);
        this.bc(a || null);
        b && (this.qc = b);
    }
    E(Pm, li);
    x = Pm.prototype;
    x.A = null;
    x.uc = !0;
    x.Qf = null;
    x.ic = !1;
    x.Ye = -1;
    x.qc = Xb;
    x.j = u("A");
    x.bc = function(a) {
        Qm(this);
        this.A = a;
    };
    x.Tc = function(a) {
        Qm(this);
        this.uc = a;
    };
    function Qm(a) {
        if (a.ic) throw Error("Can not change this state of the popup while showing.");
    }
    x.isVisible = u("ic");
    x.I = function(a) {
        this.va && this.va.stop();
        this.qa && this.qa.stop();
        if (a) {
            if (!this.ic && this.Je()) {
                if (!this.A)
                    throw Error("Caller must call setElement before trying to show the popup");
                this.ob();
                a = O(this.A);
                if (this.uc)
                    if ((this.h.w(a, Ab, this.hf, !0), I)) {
                        try {
                            var b = a.activeElement;
                        } catch (d) {}
                        for (; b && b.nodeName == na; ) {
                            try {
                                var c = Cg(b);
                            } catch (d) {
                                break;
                            }
                            a = c;
                            b = a.activeElement;
                        }
                        this.h.w(a, Ab, this.hf, !0);
                        this.h.w(a, "deactivate", this.Kg);
                    } else this.h.w(a, Ka, this.Kg);
                this.qc == Xb
                    ? ((this.A.style.visibility = cc), Q(this.A, !0))
                    : this.qc == Eb && this.ob();
                this.ic = !0;
                this.Ye = D();
                this.va ? (Th(this.va, "end", this.Mg, !1, this), this.va.play()) : this.Mg();
            }
        } else Rm(this);
    };
    x.ob = z;
    function Rm(a, b) {
        a.ic &&
            a.dispatchEvent({ type: "beforehide", target: b }) &&
            (a.h && ki(a.h),
            (a.ic = !1),
            D(),
            a.qa ? (Th(a.qa, "end", yc(a.Tf, b), !1, a), a.qa.play()) : a.Tf(b));
    }
    x.Tf = function(a) {
        this.qc == Xb ? this.Di() : this.qc == Eb && (this.A.style.top = "-10000px");
        this.jf(a);
    };
    x.Di = function() {
        this.A.style.visibility = qb;
        Q(this.A, !1);
    };
    x.Je = function() {
        return this.dispatchEvent("beforeshow");
    };
    x.Mg = function() {
        this.dispatchEvent("show");
    };
    x.jf = function(a) {
        this.dispatchEvent({ type: rb, target: a });
    };
    x.hf = function(a) {
        a = a.target;
        xg(this.A, a) || Sm(this, a) || 150 > D() - this.Ye || Rm(this, a);
    };
    x.Kg = function(a) {
        var b = O(this.A);
        if ("undefined" != typeof document.activeElement) {
            if (((a = b.activeElement), !a || xg(this.A, a) || "BODY" == a.tagName || Sm(this, a)))
                return;
        } else if (a.target != b) return;
        150 > D() - this.Ye || Rm(this);
    };
    function Sm(a, b) {
        return Jc(a.Qf || [], function(c) {
            return b === c || xg(c, b);
        });
    }
    x.F = function() {
        Pm.m.F.call(this);
        this.h.M();
        Ah(this.va);
        Ah(this.qa);
        delete this.A;
        delete this.h;
        delete this.Qf;
    };
    function Tm(a, b) {
        this.s = b || void 0;
        Pm.call(this, a);
    }
    E(Tm, Pm);
    Tm.prototype.ob = function() {
        if (this.s) {
            var a = !this.isVisible() && this.qc != Eb,
                b = this.j();
            a && ((b.style.visibility = qb), Q(b, !0));
            this.s.b(b, 8, this.af);
            a && Q(b, !1);
        }
    };
    function Um() {
        li.call(this);
        this.a = 0;
        this.endTime = this.b = null;
    }
    E(Um, li);
    Um.prototype.c = function() {
        this.Qa("begin");
    };
    Um.prototype.f = function() {
        this.Qa("end");
    };
    Um.prototype.Bb = function() {
        this.Qa("stop");
    };
    Um.prototype.Qa = function(a) {
        this.dispatchEvent(a);
    };
    function Vm(a, b, c, d, e) {
        Um.call(this);
        this.A = a;
        this.l = b;
        this.s = c;
        this.g = d;
        this.o = B(e) ? e : [e];
    }
    E(Vm, Um);
    x = Vm.prototype;
    x.play = function() {
        if (1 == this.a) return !1;
        this.c();
        this.Qa("play");
        this.b = D();
        this.a = 1;
        if (Om()) return P(this.A, this.s), (this.h = wl(this.ej, void 0, this)), !0;
        this.Bf(!1);
        return !1;
    };
    x.ej = function() {
        ch(this.A);
        Nm(this.A, this.o);
        P(this.A, this.g);
        this.h = wl(C(this.Bf, this, !1), 1e3 * this.l);
    };
    x.stop = function() {
        1 == this.a && this.Bf(!0);
    };
    x.Bf = function(a) {
        P(this.A, $b, "");
        xl(this.h);
        P(this.A, this.g);
        this.endTime = D();
        this.a = 0;
        a ? this.Bb() : this.Qa($a);
        this.f();
    };
    x.F = function() {
        this.stop();
        Vm.m.F.call(this);
    };
    function Wm(a, b) {
        Tm.call(this, a);
        this.c = b;
        this.a = 0;
        this.b = null;
        this.f = 0;
        this.I(!0);
        this.I(!1);
        M(this.j(), "round-trip-popup");
        M(this.c, "round-trip-content");
    }
    E(Wm, Tm);
    Wm.prototype.o = function() {
        xl(this.f);
        1 == this.a
            ? Th(this.b, $a, C(this.o, this))
            : 0 == this.a && (this.f = wl(C(this.l, this, -1), 200));
    };
    Wm.prototype.l = function(a) {
        if (
            this.a != a &&
            (0 != this.a || !((this.isVisible() && 1 == a) || (!this.isVisible() && -1 == a)))
        ) {
            var b = this.isVisible();
            this.I(!0);
            var c = -Math.ceil(ch(this.c).width);
            gh(this.j()) && (c = -c);
            var d = 1 == a ? c : 0;
            c = 1 == a ? 0 : c;
            this.I(b);
            if (Om()) {
                b = 0.2;
                if (0 != this.a) {
                    var e = parseInt(Tg(this.c, "left"), 10);
                    this.g();
                    b *= (c - e) / (c - d);
                    d = e;
                }
                this.a = a;
                this.b = new Vm(
                    this.c,
                    b,
                    { left: d + "px" },
                    { left: c + "px" },
                    "left " + b + "s"
                );
                this.b.play();
                Th(this.b, $a, C(this.g, this));
                -1 == a ? Th(this.b, $a, C(this.I, this, !1)) : this.I(!0);
            } else P(this.c, "left", c + "px"), this.I(1 == a ? !0 : !1);
        }
    };
    Wm.prototype.g = function() {
        0 != this.a && (this.b.stop(), wl(C(bi, this, this.b)), (this.a = 0), (this.b = null));
    };
    function Xm(a) {
        qm(this, a, 4);
    }
    E(Xm, pm);
    function Ym(a) {
        qm(this, a, 2);
    }
    E(Ym, pm);
    function Zm(a) {
        qm(this, a, 7);
    }
    E(Zm, pm);
    function $m(a, b) {
        return new Xm(vm(a, 2, b));
    }
    function an(a) {
        qm(this, a, 19);
    }
    E(an, pm);
    function bn(a, b) {
        return new Zm(vm(a, 5, b));
    }
    function cn() {
        this.A = null;
        this.a = hg(g, "gt-hl-layer", document.createTextNode(""));
        this.b = null;
        this.A && (qg(this.a, this.A), dn(this));
    }
    function en(a, b, c, d, e) {
        var f = d || "gt-hl-text";
        d = a.A && (a.A.value || Kg(a.A));
        dn(a);
        pg(a.a);
        if (b != c || e) {
            if (0 < b) {
                var h = d.substring(0, b);
                fn(a.a, h, 0, e);
            }
            b < c && ((h = d.substring(b, c)), (f = hg(ua, f)), fn(f, h, b, e), a.a.appendChild(f));
            c < d.length && ((h = d.substring(c)), fn(a.a, h, c, e));
        }
    }
    function dn(a) {
        var b = a.A;
        var c = O(b),
            d = I && b.currentStyle;
        d && dg(Uf(c).a) && d.width != Ha && d.height != Ha && !d.boxSizing
            ? ((c = oh(b, d.width, "width", "pixelWidth")),
              (b = oh(b, d.height, "height", "pixelHeight")),
              (b = new Tf(c, b)))
            : ((d = jh(b)),
              (c = mh(b)),
              (b = nh(b)),
              (b = new Tf(
                  d.width - b.left - c.left - c.right - b.right,
                  d.height - b.top - c.top - c.bottom - b.bottom
              )));
        kh(a.a, b);
        c = ah(a.A);
        b = a.a;
        d = c.x;
        c = c.y;
        var e = ah(b);
        d instanceof N && ((c = d.y), (d = d.x));
        Vg(b, b.offsetLeft + (d - e.x), b.offsetTop + (Number(c) - e.y));
        b = mh(a.A);
        P(a.a, Ib, b.left + "px");
        P(a.a, Jb, b.right + "px");
        a.a.dir = a.A.dir;
    }
    function fn(a, b, c, d) {
        d = d || [];
        for (var e = 0, f; (f = d[e]); e++)
            if (!(0 > f.Cc - c)) {
                if (f.Cc - c >= b.length) break;
                if (0 < f.Cc - c) {
                    var h = b.substring(0, f.Cc - c);
                    gn(a, h);
                }
                var k = f.className || "gt-hl-text";
                h = b.substring(f.Cc - c, f.Cf - c);
                var l = hg(ua);
                Hf(l, k);
                gn(l, h);
                a.appendChild(l);
                b = b.substring(f.Cf - c);
                c = f.Cf;
            }
        b && gn(a, b);
    }
    function gn(a, b) {
        b = b.replace(/(\r\n|\r|\n)/g, "\n").split("\n");
        for (var c = 0, d = b.length; c < d; c++) {
            if (0 < c) {
                var e = hg("BR");
                a.appendChild(e);
            }
            a.appendChild(document.createTextNode(String(b[c])));
        }
    }
    function hn(a, b, c, d, e) {
        this.f = !!b;
        this.node = null;
        this.c = 0;
        this.o = !1;
        this.C = !c;
        a && jn(this, a, d);
        this.depth = void 0 != e ? e : this.c || 0;
        this.f && (this.depth *= -1);
    }
    E(hn, wj);
    function jn(a, b, c, d) {
        if ((a.node = b)) a.c = typeof c === Fb ? c : 1 != a.node.nodeType ? 0 : a.f ? -1 : 1;
        typeof d === Fb && (a.depth = d);
    }
    hn.prototype.g = function() {
        var a = this.f ? -1 : 1;
        this.c == a && ((this.c = -1 * a), (this.depth += this.c * (this.f ? -1 : 1)));
    };
    hn.prototype.next = function() {
        if (this.o) {
            if (!this.node || (this.C && 0 == this.depth)) throw vj;
            var a = this.node;
            var b = this.f ? -1 : 1;
            if (this.c == b) {
                var c = this.f ? a.lastChild : a.firstChild;
                c ? jn(this, c) : jn(this, a, -1 * b);
            } else
                (c = this.f ? a.previousSibling : a.nextSibling)
                    ? jn(this, c)
                    : jn(this, a.parentNode, -1 * b);
            this.depth += this.c * (this.f ? -1 : 1);
        } else this.o = !0;
        a = this.node;
        if (!this.node) throw vj;
        return a;
    };
    hn.prototype.splice = function(a) {
        var b = this.node,
            c = this.f ? 1 : -1;
        this.c == c && ((this.c = -1 * c), (this.depth += this.c * (this.f ? -1 : 1)));
        this.f = !this.f;
        hn.prototype.next.call(this);
        this.f = !this.f;
        c = qc(arguments[0]) ? arguments[0] : arguments;
        for (var d = c.length - 1; 0 <= d; d--) rg(c[d], b);
        sg(b);
    };
    function kn() {}
    function ln(a) {
        if (a.getSelection) return a.getSelection();
        a = a.document;
        var b = a.selection;
        if (b) {
            try {
                var c = b.createRange();
                if (c.parentElement) {
                    if (c.parentElement().document != a) return null;
                } else if (!c.length || c.item(0).document != a) return null;
            } catch (d) {
                return null;
            }
            return b;
        }
        return null;
    }
    function mn(a) {
        for (var b = [], c = 0, d = a.Hc(); c < d; c++) b.push(a.Zb(c));
        return b;
    }
    function nn(a) {
        return a.Ve() ? a.Ma() : a.eb();
    }
    kn.prototype.Ve = v(!1);
    function on(a, b) {
        hn.call(this, a, b, !0);
    }
    E(on, hn);
    function pn(a, b, c, d, e) {
        this.b = this.a = null;
        this.B = this.G = 0;
        this.h = !!e;
        if (a) {
            this.a = a;
            this.G = b;
            this.b = c;
            this.B = d;
            if (1 == a.nodeType && "BR" != a.tagName)
                if (((a = a.childNodes), (b = a[b]))) (this.a = b), (this.G = 0);
                else {
                    a.length && (this.a = Ec(a));
                    var f = !0;
                }
            1 == c.nodeType && ((this.b = c.childNodes[d]) ? (this.B = 0) : (this.b = c));
        }
        hn.call(this, this.h ? this.b : this.a, this.h, !0);
        if (f)
            try {
                this.next();
            } catch (h) {
                if (h != vj) throw h;
            }
    }
    E(pn, on);
    pn.prototype.s = u("a");
    pn.prototype.l = function() {
        return (
            this.o &&
            (this.node != (this.h ? this.a : this.b)
                ? !1
                : this.h
                ? this.G
                    ? -1 != this.c
                    : 1 == this.c
                : !this.B || 1 != this.c)
        );
    };
    pn.prototype.next = function() {
        if (this.l()) throw vj;
        return pn.m.next.call(this);
    };
    pn.prototype.g = function() {
        pn.m.g.apply(this);
        if (xg(this.node, this.h ? this.a : this.b)) throw vj;
    };
    function qn() {}
    function rn(a, b) {
        b = b.Dc();
        try {
            return 0 <= a.ab(b, 0, 0) && 0 >= a.ab(b, 1, 1);
        } catch (c) {
            if (!I) throw c;
            return !1;
        }
    }
    qn.prototype.Ja = function() {
        return new pn(this.Sa(), this.nb(), this.mb(), this.vb());
    };
    function sn(a) {
        this.a = a;
    }
    E(sn, qn);
    function tn(a) {
        var b = O(a).createRange();
        if (3 == a.nodeType) b.setStart(a, 0), b.setEnd(a, a.length);
        else if (un(a)) {
            for (var c, d = a; (c = d.firstChild) && un(c); ) d = c;
            b.setStart(d, 0);
            for (d = a; (c = d.lastChild) && un(c); ) d = c;
            b.setEnd(d, 1 == d.nodeType ? d.childNodes.length : d.length);
        } else (c = a.parentNode), (a = Fc(c.childNodes, a)), b.setStart(c, a), b.setEnd(c, a + 1);
        return b;
    }
    function vn(a, b, c, d) {
        var e = O(a).createRange();
        e.setStart(a, b);
        e.setEnd(c, d);
        return e;
    }
    x = sn.prototype;
    x.Dc = u("a");
    x.Be = function() {
        return this.a.commonAncestorContainer;
    };
    x.Sa = function() {
        return this.a.startContainer;
    };
    x.nb = function() {
        return this.a.startOffset;
    };
    x.mb = function() {
        return this.a.endContainer;
    };
    x.vb = function() {
        return this.a.endOffset;
    };
    x.ab = function(a, b, c) {
        return this.a.compareBoundaryPoints(
            1 == c
                ? 1 == b
                    ? y.Range.START_TO_START
                    : y.Range.START_TO_END
                : 1 == b
                ? y.Range.END_TO_START
                : y.Range.END_TO_END,
            a
        );
    };
    x.Ta = function() {
        return this.a.collapsed;
    };
    x.fg = function() {
        return this.a.toString();
    };
    x.select = function(a) {
        var b = gg(O(this.Sa()));
        this.Sc(b.getSelection(), a);
    };
    x.Sc = function(a) {
        a.removeAllRanges();
        a.addRange(this.a);
    };
    function wn(a) {
        this.a = a;
    }
    E(wn, sn);
    wn.prototype.Sc = function(a, b) {
        !b || this.Ta()
            ? wn.m.Sc.call(this, a, b)
            : (a.collapse(this.mb(), this.vb()), a.extend(this.Sa(), this.nb()));
    };
    function xn(a) {
        this.b = this.a = this.h = null;
        this.g = this.f = -1;
        this.c = a;
    }
    E(xn, qn);
    function yn(a) {
        var b = O(a).body.createTextRange();
        if (1 == a.nodeType)
            b.moveToElementText(a), un(a) && !a.childNodes.length && b.collapse(!1);
        else {
            for (var c = 0, d = a; (d = d.previousSibling); ) {
                var e = d.nodeType;
                if (3 == e) c += d.length;
                else if (1 == e) {
                    b.moveToElementText(d);
                    break;
                }
            }
            d || b.moveToElementText(a.parentNode);
            b.collapse(!d);
            c && b.move(Pa, c);
            b.moveEnd(Pa, a.length);
        }
        return b;
    }
    x = xn.prototype;
    x.Dc = u("c");
    x.Be = function() {
        if (!this.h) {
            var a = this.c.text,
                b = this.c.duplicate(),
                c = a.replace(/ +$/, "");
            (c = a.length - c.length) && b.moveEnd(Pa, -c);
            c = b.parentElement();
            b = b.htmlText.replace(/(\r\n|\r|\n)+/g, " ").length;
            if (this.Ta() && 0 < b) return (this.h = c);
            for (; b > c.outerHTML.replace(/(\r\n|\r|\n)+/g, " ").length; ) c = c.parentNode;
            for (
                ;
                1 == c.childNodes.length && c.innerText == zn(c.firstChild) && un(c.firstChild);

            )
                c = c.firstChild;
            0 == a.length && (c = An(this, c));
            this.h = c;
        }
        return this.h;
    };
    function An(a, b) {
        for (var c = b.childNodes, d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            if (un(f)) {
                var h = yn(f),
                    k = h.htmlText != f.outerHTML;
                if (a.Ta() && k ? 0 <= a.ab(h, 1, 1) && 0 >= a.ab(h, 1, 0) : a.c.inRange(h))
                    return An(a, f);
            }
        }
        return b;
    }
    x.Sa = function() {
        this.a || ((this.a = Bn(this, 1)), this.Ta() && (this.b = this.a));
        return this.a;
    };
    x.nb = function() {
        0 > this.f && ((this.f = Cn(this, 1)), this.Ta() && (this.g = this.f));
        return this.f;
    };
    x.mb = function() {
        if (this.Ta()) return this.Sa();
        this.b || (this.b = Bn(this, 0));
        return this.b;
    };
    x.vb = function() {
        if (this.Ta()) return this.nb();
        0 > this.g && ((this.g = Cn(this, 0)), this.Ta() && (this.f = this.g));
        return this.g;
    };
    x.ab = function(a, b, c) {
        return this.c.compareEndPoints(
            (1 == b ? "Start" : "End") + "To" + (1 == c ? "Start" : "End"),
            a
        );
    };
    function Bn(a, b, c) {
        c = c || a.Be();
        if (!c || !c.firstChild) return c;
        for (var d = 1 == b, e = 0, f = c.childNodes.length; e < f; e++) {
            var h = d ? e : f - e - 1,
                k = c.childNodes[h];
            try {
                var l = Dn(k);
            } catch (n) {
                continue;
            }
            var m = l.Dc();
            if (a.Ta())
                if (!un(k)) {
                    if (0 == a.ab(m, 1, 1)) {
                        a.f = a.g = h;
                        break;
                    }
                } else {
                    if (rn(l, a)) return Bn(a, b, k);
                }
            else {
                if (rn(a, l)) {
                    if (!un(k)) {
                        d ? (a.f = h) : (a.g = h + 1);
                        break;
                    }
                    return Bn(a, b, k);
                }
                if (0 > a.ab(m, 1, 0) && 0 < a.ab(m, 0, 1)) return Bn(a, b, k);
            }
        }
        return c;
    }
    function Cn(a, b) {
        var c = 1 == b,
            d = c ? a.Sa() : a.mb();
        if (1 == d.nodeType) {
            d = d.childNodes;
            for (var e = d.length, f = c ? 1 : -1, h = c ? 0 : e - 1; 0 <= h && h < e; h += f) {
                var k = d[h];
                if (
                    !un(k) &&
                    0 ==
                        a.c.compareEndPoints(
                            (1 == b ? "Start" : "End") + "To" + (1 == b ? "Start" : "End"),
                            Dn(k).Dc()
                        )
                )
                    return c ? h : h + 1;
            }
            return -1 == h ? 0 : h;
        }
        a = a.c.duplicate();
        b = yn(d);
        a.setEndPoint(c ? "EndToEnd" : "StartToStart", b);
        a = a.text.length;
        return c ? d.length - a : a;
    }
    function zn(a) {
        return 3 == a.nodeType ? a.nodeValue : a.innerText;
    }
    x.Ta = function() {
        return 0 == this.c.compareEndPoints("StartToEnd", this.c);
    };
    x.fg = function() {
        return this.c.text;
    };
    x.select = function() {
        this.c.select();
    };
    function En(a) {
        this.a = a;
    }
    E(En, sn);
    En.prototype.Sc = function(a) {
        a.collapse(this.Sa(), this.nb());
        (this.mb() == this.Sa() && this.vb() == this.nb()) || a.extend(this.mb(), this.vb());
        0 == a.rangeCount && a.addRange(this.a);
    };
    function Fn(a) {
        this.a = a;
    }
    E(Fn, sn);
    Fn.prototype.ab = function(a, b, c) {
        return L("528")
            ? Fn.m.ab.call(this, a, b, c)
            : this.a.compareBoundaryPoints(
                  1 == c
                      ? 1 == b
                          ? y.Range.START_TO_START
                          : y.Range.END_TO_START
                      : 1 == b
                      ? y.Range.START_TO_END
                      : y.Range.END_TO_END,
                  a
              );
    };
    Fn.prototype.Sc = function(a, b) {
        b
            ? a.setBaseAndExtent(this.mb(), this.vb(), this.Sa(), this.nb())
            : a.setBaseAndExtent(this.Sa(), this.nb(), this.mb(), this.vb());
    };
    function Gn(a) {
        return Qf
            ? new xn(a, O(a.parentElement()))
            : K
            ? new Fn(a)
            : J
            ? new wn(a)
            : Oe
            ? new En(a)
            : new sn(a);
    }
    function Dn(a) {
        if (I && !ff(9)) {
            var b = new xn(yn(a), O(a));
            if (un(a)) {
                for (var c, d = a; (c = d.firstChild) && un(c); ) d = c;
                b.a = d;
                b.f = 0;
                for (d = a; (c = d.lastChild) && un(c); ) d = c;
                b.b = d;
                b.g = 1 == d.nodeType ? d.childNodes.length : d.length;
                b.h = a;
            } else (b.a = b.b = b.h = a.parentNode), (b.f = Fc(b.h.childNodes, a)), (b.g = b.f + 1);
            a = b;
        } else a = K ? new Fn(tn(a)) : J ? new wn(tn(a)) : Oe ? new En(tn(a)) : new sn(tn(a));
        return a;
    }
    function un(a) {
        return ng(a) || 3 == a.nodeType;
    }
    function Hn() {
        this.c = this.b = this.g = this.a = this.h = null;
        this.f = !1;
    }
    E(Hn, kn);
    function In(a, b) {
        var c = new Hn();
        c.h = a;
        c.f = !!b;
        return c;
    }
    x = Hn.prototype;
    x.xe = function() {
        return Jn(this).Dc();
    };
    x.Hc = v(1);
    x.Zb = function() {
        return this;
    };
    function Jn(a) {
        var b;
        if (!(b = a.h)) {
            b = a.Ma();
            var c = a.Na(),
                d = a.eb(),
                e = a.fb();
            if (I && !ff(9)) {
                var f = b,
                    h = c,
                    k = d,
                    l = e,
                    m = !1;
                1 == f.nodeType &&
                    ((h = f.childNodes[h]), (m = !h), (f = h || f.lastChild || f), (h = 0));
                var n = yn(f);
                h && n.move(Pa, h);
                f == k && h == l
                    ? n.collapse(!0)
                    : (m && n.collapse(!1),
                      (m = !1),
                      1 == k.nodeType &&
                          ((k = (h = k.childNodes[l]) || k.lastChild || k), (l = 0), (m = !h)),
                      (f = yn(k)),
                      f.collapse(!m),
                      l && f.moveEnd(Pa, l),
                      n.setEndPoint("EndToEnd", f));
                l = new xn(n, O(b));
                l.a = b;
                l.f = c;
                l.b = d;
                l.g = e;
                b = l;
            } else
                b = K
                    ? new Fn(vn(b, c, d, e))
                    : J
                    ? new wn(vn(b, c, d, e))
                    : Oe
                    ? new En(vn(b, c, d, e))
                    : new sn(vn(b, c, d, e));
            b = a.h = b;
        }
        return b;
    }
    x.rd = function() {
        return Jn(this).Be();
    };
    x.Ma = function() {
        return this.a || (this.a = Jn(this).Sa());
    };
    x.Na = function() {
        return null != this.g ? this.g : (this.g = Jn(this).nb());
    };
    x.eb = function() {
        return this.b || (this.b = Jn(this).mb());
    };
    x.fb = function() {
        return null != this.c ? this.c : (this.c = Jn(this).vb());
    };
    x.Ve = u("f");
    x.td = function() {
        return Jn(this).Ta();
    };
    x.sd = function() {
        return Jn(this).fg();
    };
    x.Ja = function() {
        return new pn(this.Ma(), this.Na(), this.eb(), this.fb());
    };
    x.select = function() {
        Jn(this).select(this.f);
    };
    function Kn() {}
    E(Kn, kn);
    function Ln() {
        this.c = this.b = this.a = null;
    }
    E(Ln, Kn);
    x = Ln.prototype;
    x.xe = function() {
        return this.a || document.body.createControlRange();
    };
    x.Hc = function() {
        return this.a ? this.a.length : 0;
    };
    x.Zb = function(a) {
        a = this.a.item(a);
        return In(Dn(a), void 0);
    };
    x.rd = function() {
        return Bg.apply(null, Mn(this));
    };
    x.Ma = function() {
        return Nn(this)[0];
    };
    x.Na = v(0);
    x.eb = function() {
        var a = Nn(this),
            b = Ec(a);
        return Lc(a, function(c) {
            return xg(c, b);
        });
    };
    x.fb = function() {
        return this.eb().childNodes.length;
    };
    function Mn(a) {
        if (!a.b && ((a.b = []), a.a)) for (var b = 0; b < a.a.length; b++) a.b.push(a.a.item(b));
        return a.b;
    }
    function Nn(a) {
        a.c ||
            ((a.c = Mn(a).concat()),
            a.c.sort(function(b, c) {
                return b.sourceIndex - c.sourceIndex;
            }));
        return a.c;
    }
    x.td = function() {
        return !this.a || !this.a.length;
    };
    x.sd = v("");
    x.Ja = function() {
        return new On(this);
    };
    x.select = function() {
        this.a && this.a.select();
    };
    function On(a) {
        this.h = this.b = this.a = null;
        a && ((this.h = Nn(a)), (this.a = this.h.shift()), (this.b = Ec(this.h) || this.a));
        hn.call(this, this.a, !1, !0);
    }
    E(On, on);
    On.prototype.s = u("a");
    On.prototype.l = function() {
        return !this.depth && !this.h.length;
    };
    On.prototype.next = function() {
        if (this.l()) throw vj;
        if (!this.depth) {
            var a = this.h.shift();
            jn(this, a, 1, 1);
            return a;
        }
        return On.m.next.call(this);
    };
    function Pn() {
        this.sa = null;
        this.a = [];
        this.f = [];
        this.c = this.b = null;
    }
    E(Pn, Kn);
    x = Pn.prototype;
    x.xe = function() {
        return this.a[0];
    };
    x.Hc = function() {
        return this.a.length;
    };
    x.Zb = function(a) {
        this.f[a] || (this.f[a] = In(Gn(this.a[a]), void 0));
        return this.f[a];
    };
    x.rd = function() {
        if (!this.c) {
            for (var a = [], b = 0, c = this.Hc(); b < c; b++) a.push(this.Zb(b).rd());
            this.c = Bg.apply(null, a);
        }
        return this.c;
    };
    function Qn(a) {
        a.b ||
            ((a.b = mn(a)),
            a.b.sort(function(b, c) {
                var d = b.Ma();
                b = b.Na();
                var e = c.Ma();
                c = c.Na();
                return d == e && b == c ? 0 : Rn(d, b, e, c) ? 1 : -1;
            }));
        return a.b;
    }
    x.Ma = function() {
        return Qn(this)[0].Ma();
    };
    x.Na = function() {
        return Qn(this)[0].Na();
    };
    x.eb = function() {
        return Ec(Qn(this)).eb();
    };
    x.fb = function() {
        return Ec(Qn(this)).fb();
    };
    x.td = function() {
        return 0 == this.a.length || (1 == this.a.length && this.Zb(0).td());
    };
    x.sd = function() {
        return Ic(mn(this), function(a) {
            return a.sd();
        }).join("");
    };
    x.Ja = function() {
        return new Sn(this);
    };
    x.select = function() {
        var a = ln(gg(O(I ? this.rd() : this.Ma())));
        a.removeAllRanges();
        for (var b = 0, c = this.Hc(); b < c; b++) a.addRange(this.Zb(b).xe());
    };
    function Sn(a) {
        this.a = null;
        this.b = 0;
        a &&
            (this.a = Ic(Qn(a), function(b) {
                return xj(b);
            }));
        hn.call(this, a ? this.s() : null, !1, !0);
    }
    E(Sn, on);
    Sn.prototype.s = function() {
        return this.a[0].s();
    };
    Sn.prototype.l = function() {
        return this.a[this.b].l();
    };
    Sn.prototype.next = function() {
        try {
            var a = this.a[this.b],
                b = a.next();
            jn(this, a.node, a.c, a.depth);
            return b;
        } catch (c) {
            if (c !== vj || this.a.length - 1 == this.b) throw c;
            this.b++;
            return this.next();
        }
    };
    function Tn() {
        var a = ln(window);
        return a && Un(a);
    }
    function Un(a) {
        var b = !1;
        if (a.createRange)
            try {
                var c = a.createRange();
            } catch (e) {
                return null;
            }
        else if (a.rangeCount) {
            if (1 < a.rangeCount) {
                b = new Pn();
                c = 0;
                for (var d = a.rangeCount; c < d; c++) b.a.push(a.getRangeAt(c));
                return b;
            }
            c = a.getRangeAt(0);
            b = Rn(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset);
        } else return null;
        (a = c) && a.addElement ? ((b = new Ln()), (b.a = a), (a = b)) : (a = In(Gn(a), b));
        return a;
    }
    function Rn(a, b, c, d) {
        if (a == c) return d < b;
        var e;
        if (1 == a.nodeType && b)
            if ((e = a.childNodes[b])) (a = e), (b = 0);
            else if (xg(a, c)) return !0;
        if (1 == c.nodeType && d)
            if ((e = c.childNodes[d])) (c = e), (d = 0);
            else if (xg(c, a)) return !1;
        return 0 < (yg(a, c) || b - d);
    }
    function Vn() {
        var a = Tn();
        return null != a && !a.td() && 0 < a.sd().length;
    }
    function Wn() {
        this.b = [];
    }
    E(Wn, Ci);
    pc(Wn);
    function Xn(a, b) {
        var c = a.b[b];
        if (!c) {
            switch (b) {
                case 0:
                    c = a.da() + "-highlight";
                    break;
                case 1:
                    c = a.da() + "-checkbox";
                    break;
                case 2:
                    c = a.da() + "-content";
            }
            a.b[b] = c;
        }
        return c;
    }
    x = Wn.prototype;
    x.$b = v("menuitem");
    x.D = function(a) {
        var b = a.b.D(g, Fi(this, a).join(" "), Yn(this, a.ea(), a.b));
        Zn(this, a, b, !!(a.aa & 8) || !!(a.aa & 16));
        return b;
    };
    x.zb = function(a) {
        return a && a.firstChild;
    };
    x.Oa = function(a, b) {
        var c = ug(b),
            d = Xn(this, 2);
        (c && If(c, d)) || b.appendChild(Yn(this, b.childNodes, a.b));
        If(b, kb) && (a.ta(16, !0), a && b && Zn(this, a, b, !0));
        return Wn.m.Oa.call(this, a, b);
    };
    x.Jc = function(a, b) {
        var c = this.zb(a),
            d = $n(this, a) ? c.firstChild : null;
        Wn.m.Jc.call(this, a, b);
        d && !$n(this, a) && c.insertBefore(d, c.firstChild || null);
    };
    function Yn(a, b, c) {
        a = Xn(a, 2);
        return c.D(g, a, b);
    }
    function $n(a, b) {
        return (b = a.zb(b)) ? ((b = b.firstChild), (a = Xn(a, 1)), !!b && wg(b) && If(b, a)) : !1;
    }
    function Zn(a, b, c, d) {
        Ji(a, c, b.Gc());
        Ki(a, b, c);
        d != $n(a, c) &&
            (d ? M(c, kb) : Kf(c, kb),
            (c = a.zb(c)),
            d
                ? ((a = Xn(a, 1)), c.insertBefore(b.b.D(g, a), c.firstChild || null))
                : c.removeChild(c.firstChild));
    }
    x.Ec = function(a) {
        switch (a) {
            case 2:
                return Xn(this, 0);
            case 16:
            case 8:
                return lb;
            default:
                return Wn.m.Ec.call(this, a);
        }
    };
    x.pd = function(a) {
        var b = Xn(this, 0);
        switch (a) {
            case lb:
                return 16;
            case b:
                return 2;
            default:
                return Wn.m.pd.call(this, a);
        }
    };
    x.da = v("goog-menuitem");
    function ao(a, b, c, d) {
        W.call(this, a, d || Wn.X(), c);
        this.ya(b);
    }
    E(ao, W);
    x = ao.prototype;
    x.Aa = function() {
        var a = this.ra;
        return null != a ? a : this.bb();
    };
    x.ya = fc("ra");
    x.ta = function(a, b) {
        ao.m.ta.call(this, a, b);
        switch (a) {
            case 8:
                this.V & 16 && !b && gj(this, 16, !1) && jj(this, 16, !1);
                (a = this.j()) && this && a && Zn(this.a, this, a, b);
                break;
            case 16:
                (a = this.j()) && this && a && Zn(this.a, this, a, b);
        }
    };
    x.bb = function() {
        var a = this.ea();
        return B(a)
            ? ((a = Ic(a, function(b) {
                  return wg(b) &&
                      (If(b, "goog-menuitem-accel") || If(b, "goog-menuitem-mnemonic-separator"))
                      ? ""
                      : Mg(b);
              }).join("")),
              xe(a))
            : ao.m.bb.call(this);
    };
    x.dc = function(a) {
        var b = this.wb();
        if (b) {
            var c = b.J;
            b.J = null;
            if ((b = c && typeof a.clientX === Fb))
                (b = new N(a.clientX, a.clientY)),
                    (b = c == b ? !0 : c && b ? c.x == b.x && c.y == b.y : !1);
            if (b) return;
        }
        ao.m.dc.call(this, a);
    };
    x.Lc = function(a) {
        return a.keyCode == this.Ig && this.nc(a) ? !0 : ao.m.Lc.call(this, a);
    };
    x.Sh = u("Ig");
    aj("goog-menuitem", function() {
        return new ao(null);
    });
    ao.prototype.Gc = function() {
        return this.aa & 16
            ? "menuitemcheckbox"
            : this.aa & 8
            ? "menuitemradio"
            : ao.m.Gc.call(this);
    };
    ao.prototype.wb = function() {
        return W.prototype.wb.call(this);
    };
    ao.prototype.nd = function() {
        return W.prototype.nd.call(this);
    };
    function bo(a) {
        this.a = a;
    }
    pc(bo);
    function co(a, b) {
        a && (a.tabIndex = b ? 0 : -1);
    }
    x = bo.prototype;
    x.D = function(a) {
        return a.b.D(g, eo(this, a).join(" "));
    };
    x.De = function(a) {
        return a.tagName == g;
    };
    function fo(a, b, c) {
        c.id && ri(b, c.id);
        var d = a.vd(),
            e = !1,
            f = Gf(c);
        f &&
            Gc(
                f,
                function(h) {
                    h == d
                        ? (e = !0)
                        : h &&
                          (h == d + ba
                              ? b.ka(!1)
                              : h == d + "-horizontal"
                              ? go(b, sb)
                              : h == d + "-vertical" && go(b, bc));
                },
                a
            );
        e || M(c, d);
        ho(a, b, c);
        return c;
    }
    function ho(a, b, c) {
        if (c)
            for (var d = c.firstChild, e; d && d.parentNode == c; ) {
                e = d.nextSibling;
                if (1 == d.nodeType) {
                    var f = a.ye(d);
                    f && ((f.A = d), b.isEnabled() || f.ka(!1), b.sc(f), wi(f, d));
                } else (d.nodeValue && "" != Sc(d.nodeValue)) || c.removeChild(d);
                d = e;
            }
    }
    x.ye = function(a) {
        a: {
            a = Gf(a);
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ((d = d in bj ? bj[d]() : null)) {
                    a = d;
                    break a;
                }
            }
            a = null;
        }
        return a;
    };
    x.Ee = function(a) {
        a = a.j();
        ih(a, !0, J);
        I && (a.hideFocus = !0);
        var b = this.a;
        b && th(a, b);
    };
    x.vd = v("goog-container");
    function eo(a, b) {
        a = a.vd();
        var c = [a, b.Sb == sb ? a + "-horizontal" : a + "-vertical"];
        b.isEnabled() || c.push(a + ba);
        return c;
    }
    function io() {}
    E(io, Ci);
    pc(io);
    io.prototype.D = function(a) {
        return a.b.D(g, this.da());
    };
    io.prototype.Oa = function(a, b) {
        b.id && ri(a, b.id);
        if ("HR" == b.tagName) {
            var c = b;
            b = this.D(a);
            qg(b, c);
            sg(c);
        } else M(b, this.da());
        return b;
    };
    io.prototype.Jc = ec();
    io.prototype.da = v(jb);
    function jo(a, b) {
        W.call(this, null, a || io.X(), b);
        this.ta(1, !1);
        this.ta(2, !1);
        this.ta(4, !1);
        this.ta(32, !1);
        this.V = 1;
    }
    E(jo, W);
    jo.prototype.O = function() {
        jo.m.O.call(this);
        th(this.j(), "separator");
    };
    aj(jb, function() {
        return new jo();
    });
    function ko(a) {
        this.a = a || "menu";
    }
    E(ko, bo);
    pc(ko);
    x = ko.prototype;
    x.De = function(a) {
        return "UL" == a.tagName || ko.m.De.call(this, a);
    };
    x.ye = function(a) {
        return "HR" == a.tagName ? new jo() : ko.m.ye.call(this, a);
    };
    x.yc = function(a, b) {
        return xg(a.j(), b);
    };
    x.vd = v("goog-menu");
    x.Ee = function(a) {
        ko.m.Ee.call(this, a);
        uh(a.j(), "haspopup", "true");
    };
    function lo(a, b, c) {
        T.call(this, c);
        this.yb = b || bo.X();
        this.Sb = a || bc;
    }
    E(lo, T);
    x = lo.prototype;
    x.jc = null;
    x.Ic = null;
    x.yb = null;
    x.Sb = null;
    x.ga = !0;
    x.xb = !0;
    x.Jb = !0;
    x.ha = -1;
    x.pa = null;
    x.kc = !1;
    x.lb = null;
    function mo(a) {
        return a.jc || a.j();
    }
    function no(a, b) {
        if (a.Jb) {
            var c = mo(a),
                d = a.U;
            a.jc = b;
            var e = mo(a);
            d && ((a.jc = c), oo(a, !1), (a.jc = b), Ui(po(a), e), oo(a, !0));
        } else
            throw Error(
                "Can't set key event target for container that doesn't support keyboard focus!"
            );
    }
    function po(a) {
        return a.Ic || (a.Ic = new Ti(mo(a)));
    }
    x.D = function() {
        this.A = this.yb.D(this);
    };
    x.ud = function() {
        return this.j();
    };
    x.Ce = function(a) {
        return this.yb.De(a);
    };
    x.S = function(a) {
        this.A = fo(this.yb, this, a);
        a.style.display == q && (this.ga = !1);
    };
    x.O = function() {
        lo.m.O.call(this);
        xi(
            this,
            function(b) {
                b.U && qo(this, b);
            },
            this
        );
        var a = this.j();
        this.yb.Ee(this);
        this.I(this.ga, !0);
        U(this)
            .w(this, "enter", this.Me)
            .w(this, "highlight", this.Pc)
            .w(this, "unhighlight", this.Qe)
            .w(this, "open", this.oi)
            .w(this, "close", this.ci)
            .w(a, Ch.Wb, this.Uh)
            .w(O(a), [Ch.Xb, Ch.rc], this.ei)
            .w(a, [Ch.Wb, Ch.Xb, Ch.rc, Db, Cb, Wa], this.ai);
        this.Jb && oo(this, !0);
    };
    function oo(a, b) {
        var c = U(a),
            d = mo(a);
        b
            ? c
                  .w(d, cb, a.gg)
                  .w(d, Ka, a.wd)
                  .w(po(a), "key", a.Ga)
            : c
                  .ba(d, cb, a.gg)
                  .ba(d, Ka, a.wd)
                  .ba(po(a), "key", a.Ga);
    }
    x.Z = function() {
        this.Cb(-1);
        this.pa && kj(this.pa, !1);
        this.kc = !1;
        lo.m.Z.call(this);
    };
    x.F = function() {
        lo.m.F.call(this);
        this.Ic && (this.Ic.M(), (this.Ic = null));
        this.yb = this.pa = this.lb = this.jc = null;
    };
    x.Me = v(!0);
    x.Pc = function(a) {
        var b = Bi(this, a.target);
        if (-1 < b && b != this.ha) {
            var c = ro(this);
            c && ij(c, !1);
            this.ha = b;
            c = ro(this);
            this.kc && hj(c, !0);
            this.pa && c != this.pa && (c.aa & 64 ? kj(c, !0) : kj(this.pa, !1));
        }
        b = this.j();
        null != a.target.j() && uh(b, Da, a.target.j().id);
    };
    x.Qe = function(a) {
        a.target == ro(this) && (this.ha = -1);
        this.j().removeAttribute("aria-activedescendant");
    };
    x.oi = function(a) {
        (a = a.target) &&
            a != this.pa &&
            a.wb() == this &&
            (this.pa && kj(this.pa, !1), (this.pa = a));
    };
    x.ci = function(a) {
        a.target == this.pa && (this.pa = null);
        var b = this.j(),
            c = a.target.j();
        b && a.target.V & 2 && c && ((a = ""), c && (a = c.id), uh(b, Da, a));
    };
    x.Uh = function(a) {
        this.xb && (this.kc = !0);
        var b = mo(this);
        b && Ig(b) && Jg(b) ? b.focus() : a.b();
    };
    x.ei = function() {
        this.kc = !1;
    };
    x.ai = function(a) {
        a: {
            var b = a.target;
            if (this.lb)
                for (var c = this.j(); b && b !== c; ) {
                    var d = b.id;
                    if (d in this.lb) {
                        b = this.lb[d];
                        break a;
                    }
                    b = b.parentNode;
                }
            b = null;
        }
        if (b)
            switch (a.type) {
                case Ch.Wb:
                    b.Mc(a);
                    break;
                case Ch.Xb:
                case Ch.rc:
                    b.dc(a);
                    break;
                case Db:
                    b.Ie(a);
                    break;
                case Cb:
                    b.Pe(a);
                    break;
                case Wa:
                    b.Oc(a);
            }
    };
    x.gg = ec();
    x.wd = function() {
        this.Cb(-1);
        this.kc = !1;
        this.pa && kj(this.pa, !1);
    };
    x.Ga = function(a) {
        return this.isEnabled() && this.isVisible() && (0 != yi(this) || this.jc) && this.Fe(a)
            ? (a.b(), a.stopPropagation(), !0)
            : !1;
    };
    x.Fe = function(a) {
        var b = ro(this);
        if (
            (b && typeof b.Ga == p && b.Ga(a)) ||
            (this.pa && this.pa != b && typeof this.pa.Ga == p && this.pa.Ga(a))
        )
            return !0;
        if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !1;
        switch (a.keyCode) {
            case 27:
                if (this.Jb) mo(this).blur();
                else return !1;
                break;
            case 36:
                so(this);
                break;
            case 35:
                to(this);
                break;
            case 38:
                if (this.Sb == bc) uo(this);
                else return !1;
                break;
            case 37:
                if (this.Sb == sb) Ai(this) ? vo(this) : uo(this);
                else return !1;
                break;
            case 40:
                if (this.Sb == bc) vo(this);
                else return !1;
                break;
            case 39:
                if (this.Sb == sb) Ai(this) ? uo(this) : vo(this);
                else return !1;
                break;
            default:
                return !1;
        }
        return !0;
    };
    function qo(a, b) {
        var c = b.j();
        c = c.id || (c.id = qi(b));
        a.lb || (a.lb = {});
        a.lb[c] = b;
    }
    x.sc = function(a, b) {
        lo.m.sc.call(this, a, b);
    };
    x.ie = function(a, b, c) {
        a.Vc |= 2;
        a.Vc |= 64;
        a.ta(32, !1);
        dj(a, !1);
        var d = a.wb() == this ? Bi(this, a) : -1;
        lo.m.ie.call(this, a, b, c);
        a.U && this.U && qo(this, a);
        a = d;
        -1 == a && (a = yi(this));
        a == this.ha
            ? (this.ha = Math.min(yi(this) - 1, b))
            : a > this.ha && b <= this.ha
            ? this.ha++
            : a < this.ha && b > this.ha && this.ha--;
    };
    x.removeChild = function(a, b) {
        if ((a = typeof a === t ? ui(this, a) : a)) {
            var c = Bi(this, a);
            -1 != c && (c == this.ha ? (ij(a, !1), (this.ha = -1)) : c < this.ha && this.ha--);
            var d = a.j();
            d && d.id && this.lb && ((c = this.lb), (d = d.id), d in c && delete c[d]);
        }
        a = lo.m.removeChild.call(this, a, b);
        dj(a, !0);
        return a;
    };
    function go(a, b) {
        if (a.j()) throw Error(ka);
        a.Sb = b;
    }
    x.isVisible = u("ga");
    x.I = function(a, b) {
        if (b || (this.ga != a && this.dispatchEvent(a ? "show" : rb))) {
            this.ga = a;
            var c = this.j();
            c &&
                (Q(c, a),
                this.Jb && co(mo(this), this.xb && this.ga),
                b || this.dispatchEvent(this.ga ? "aftershow" : "afterhide"));
            return !0;
        }
        return !1;
    };
    x.isEnabled = u("xb");
    x.ka = function(a) {
        this.xb != a &&
            this.dispatchEvent(a ? "enable" : "disable") &&
            (a
                ? ((this.xb = !0),
                  xi(this, function(b) {
                      b.kh ? delete b.kh : b.ka(!0);
                  }))
                : (xi(this, function(b) {
                      b.isEnabled() ? b.ka(!1) : (b.kh = !0);
                  }),
                  (this.kc = this.xb = !1)),
            this.Jb && co(mo(this), a && this.ga));
    };
    function wo(a, b) {
        b != a.Jb && a.U && oo(a, b);
        a.Jb = b;
        a.xb && a.ga && co(mo(a), b);
    }
    x.Cb = function(a) {
        (a = zi(this, a)) ? ij(a, !0) : -1 < this.ha && ij(ro(this), !1);
    };
    function ro(a) {
        return zi(a, a.ha);
    }
    function so(a) {
        xo(
            a,
            function(b, c) {
                return (b + 1) % c;
            },
            yi(a) - 1
        );
    }
    function to(a) {
        xo(
            a,
            function(b, c) {
                b--;
                return 0 > b ? c - 1 : b;
            },
            0
        );
    }
    function vo(a) {
        xo(
            a,
            function(b, c) {
                return (b + 1) % c;
            },
            a.ha
        );
    }
    function uo(a) {
        xo(
            a,
            function(b, c) {
                b--;
                return 0 > b ? c - 1 : b;
            },
            a.ha
        );
    }
    function xo(a, b, c) {
        c = 0 > c ? Bi(a, a.pa) : c;
        var d = yi(a);
        c = b.call(a, c, d);
        for (var e = 0; e <= d; ) {
            var f = zi(a, c);
            if (f && a.Rf(f)) {
                a.Cb(c);
                break;
            }
            e++;
            c = b.call(a, c, d);
        }
    }
    x.Rf = function(a) {
        return a.isVisible() && a.isEnabled() && !!(a.aa & 2);
    };
    function yo() {}
    E(yo, Ci);
    pc(yo);
    yo.prototype.da = v(ib);
    function zo(a, b, c) {
        W.call(this, a, c || yo.X(), b);
        this.ta(1, !1);
        this.ta(2, !1);
        this.ta(4, !1);
        this.ta(32, !1);
        this.V = 1;
    }
    E(zo, W);
    aj(ib, function() {
        return new zo(null);
    });
    aj(jb, function() {
        return new jo();
    });
    function Ao(a, b) {
        lo.call(this, bc, b || ko.X(), a);
        wo(this, !1);
    }
    E(Ao, lo);
    x = Ao.prototype;
    x.je = !0;
    x.yc = function(a) {
        if (this.yb.yc(this, a)) return !0;
        for (var b = 0, c = yi(this); b < c; b++) {
            var d = zi(this, b);
            if (typeof d.yc == p && d.yc(a)) return !0;
        }
        return !1;
    };
    x.I = function(a, b, c) {
        (b = Ao.m.I.call(this, a, b)) && a && this.U && this.je && mo(this).focus();
        a && c && typeof c.clientX === Fb
            ? (this.J = new N(c.clientX, c.clientY))
            : (this.J = null);
        return b;
    };
    x.Me = function(a) {
        this.je && mo(this).focus();
        return Ao.m.Me.call(this, a);
    };
    x.Rf = function(a) {
        return a.isEnabled() && a.isVisible() && !!(a.aa & 2);
    };
    x.S = function(a) {
        for (
            var b = this.yb, c = Zf(this.b.a, g, b.vd() + "-content", a), d = c.length, e = 0;
            e < d;
            e++
        )
            ho(b, this, c[e]);
        Ao.m.S.call(this, a);
    };
    x.Fe = function(a) {
        var b = Ao.m.Fe.call(this, a);
        b ||
            xi(
                this,
                function(c) {
                    !b &&
                        c.Sh &&
                        c.Ig == a.keyCode &&
                        (this.isEnabled() && this.Cb(Bi(this, c)), (b = c.Ga(a)));
                },
                this
            );
        return b;
    };
    x.Cb = function(a) {
        Ao.m.Cb.call(this, a);
        var b = zi(this, a);
        if (b) {
            a = this.j() || fg(document);
            var c = b.j();
            b = a || fg(document);
            var d = ah(c),
                e = ah(b),
                f = nh(b);
            if (b == fg(document)) {
                var h = d.x - b.scrollLeft;
                d = d.y - b.scrollTop;
                I && !ff(10) && ((h += f.left), (d += f.top));
            } else (h = d.x - e.x - f.left), (d = d.y - e.y - f.top);
            c = dh(c);
            f = b.clientHeight - c.height;
            e = b.scrollLeft;
            var k = b.scrollTop;
            e += Math.min(h, Math.max(h - (b.clientWidth - c.width), 0));
            k += Math.min(d, Math.max(d - f, 0));
            b = new N(e, k);
            a.scrollLeft = b.x;
            a.scrollTop = b.y;
        }
    };
    function Bo(a, b, c) {
        this.c = a;
        this.f = b;
        this.s = c;
    }
    E(Bo, Hk);
    Bo.prototype.b = function(a, b, c) {
        Lk(this.c, this.f, a, b, void 0, c, this.s);
    };
    function Co(a, b, c, d) {
        Bo.call(this, a, b);
        this.l = c ? 5 : 0;
        this.g = d || void 0;
    }
    E(Co, Bo);
    Co.prototype.h = fc("l");
    Co.prototype.b = function(a, b, c) {
        var d = Lk(this.c, this.f, a, b, null, c, 10, void 0, this.g);
        if (d & 496) {
            var e = Do(d, this.f);
            b = Do(d, b);
            d = Lk(this.c, e, a, b, null, c, 10, void 0, this.g);
            d & 496 &&
                ((e = Do(d, e)),
                (b = Do(d, b)),
                Lk(this.c, e, a, b, null, c, this.l, void 0, this.g));
        }
    };
    function Do(a, b) {
        a & 48 && (b ^= 4);
        a & 192 && (b ^= 1);
        return b;
    }
    function Eo(a, b) {
        this.a = a instanceof N ? a : new N(a, b);
    }
    E(Eo, Hk);
    Eo.prototype.b = function(a, b, c) {
        var d = O(a);
        var e = d.body;
        d = d.documentElement;
        d = new N(e.scrollLeft || d.scrollLeft, e.scrollTop || d.scrollTop);
        e = this.a.x + d.x;
        d = this.a.y + d.y;
        var f = Mk(a);
        e -= f.x;
        d -= f.y;
        Ok(new N(e, d), a, b, c, null, null, void 0);
    };
    function Fo(a, b) {
        Eo.call(this, a, b);
    }
    E(Fo, Eo);
    Fo.prototype.c = 0;
    Fo.prototype.h = fc("c");
    Fo.prototype.b = function(a, b, c) {
        var d = Xg(a);
        d = $g(d);
        var e = fg(Uf(a).a);
        e = new N(this.a.x + e.scrollLeft, this.a.y + e.scrollTop);
        var f = b,
            h = Ok(e, a, f, c, d, 10, void 0);
        if (0 != (h & 496)) {
            if (h & 16 || h & 32) f ^= 4;
            if (h & 64 || h & 128) f ^= 1;
            h = Ok(e, a, f, c, d, 10, void 0);
            0 != (h & 496) && Ok(e, a, b, c, d, this.c, void 0);
        }
    };
    function Go(a, b) {
        Ao.call(this, a, b);
        this.je = !0;
        wo(this, !0);
        this.I(!1, !0);
        this.a = new zj();
    }
    E(Go, Ao);
    x = Go.prototype;
    x.ih = !1;
    x.Cg = 0;
    x.Ca = null;
    x.S = function(a) {
        Go.m.S.call(this, a);
        (a = a.getAttribute("for") || a.htmlFor) && Ho(this, this.b.j(a), 1);
    };
    x.O = function() {
        Go.m.O.call(this);
        this.a.forEach(this.bd, this);
        var a = U(this);
        a.w(this, Ca, this.ff);
        a.w(this.b.a, Ab, this.Yi, !0);
    };
    function Ho(a, b, c, d, e, f) {
        (b && Bj(a.a, tc(b))) ||
            ((c = a.qe(b, c, d, e, f)),
            a.U && a.bd(c),
            (b = yc(a.Zi, b)),
            a.j() && U(a).w(a.j(), xb, b));
    }
    x.Zi = function(a, b) {
        if (27 == b.keyCode) a.focus();
        else if ((a = zi(this, this.ha))) {
            a = a.j();
            var c = new Dh(b.a, a);
            c.target = a;
            if (32 == b.keyCode || 13 == b.keyCode) Ih(a) ? mi(a, xb, !1, c) : ci(a, xb, !1, c);
            32 == b.keyCode && this.pb();
        }
    };
    x.qe = function(a, b, c, d, e) {
        if (!a) return null;
        b = { A: a, bh: b, Vi: c, Bc: d ? Wa : Ab, af: e };
        this.a.set(tc(a), b);
        return b;
    };
    x.bd = function(a) {
        U(this).w(a.A, a.Bc, this.Vd);
        a.Bc != Wa && U(this).w(a.A, xb, this.bj);
    };
    x.hd = function() {
        if (this.U) for (var a = this.a.Ra(), b = 0; b < a.length; b++) this.se(this.a.get(a[b]));
        Dj(this.a);
    };
    x.se = function(a) {
        U(this).ba(a.A, a.Bc, this.Vd);
    };
    x.zd = function(a, b, c) {
        b = void 0 !== a.bh ? new Co(a.A, a.bh, !0) : new Fo(b, c);
        b.h && b.h(5);
        var d = a.Vi;
        c = a.af;
        var e = a.A;
        a = this.isVisible();
        var f;
        (f = this.isVisible()) || (f = 150 > D() - this.Cg);
        f && this.ih
            ? this.pb()
            : ((this.Ca = e || null),
              this.dispatchEvent("beforeshow") &&
                  ((d = "undefined" != typeof d ? d : 8),
                  a || (this.j().style.visibility = qb),
                  Q(this.j(), !0),
                  b.b(this.j(), d, c),
                  a || (this.j().style.visibility = cc),
                  this.Cb(-1),
                  this.I(!0)));
    };
    x.pb = function() {
        this.isVisible() && (this.I(!1), this.isVisible() || ((this.Cg = D()), (this.Ca = null)));
    };
    x.ff = function() {
        this.pb();
    };
    x.Vd = function(a) {
        Io(this, a);
    };
    x.bj = function(a) {
        (32 != a.keyCode && 13 != a.keyCode && 40 != a.keyCode) || Io(this, a);
        40 == a.keyCode && so(this);
    };
    function Io(a, b) {
        for (var c = a.a.Ra(), d = 0; d < c.length; d++) {
            var e = a.a.get(c[d]);
            if (e.A == b.currentTarget) {
                a.zd(e, b.clientX, b.clientY);
                b.b();
                b.stopPropagation();
                break;
            }
        }
    }
    x.Yi = function(a) {
        this.isVisible() && !this.yc(a.target) && this.pb();
    };
    x.wd = function(a) {
        Go.m.wd.call(this, a);
        this.pb();
    };
    x.F = function() {
        Go.m.F.call(this);
        this.a && (Dj(this.a), delete this.a);
    };
    function Jo(a) {
        li.call(this);
        this.A = a;
        a = I ? eb : Ka;
        this.a = S(this.A, I ? db : cb, this, !I);
        this.b = S(this.A, a, this, !I);
    }
    E(Jo, li);
    Jo.prototype.handleEvent = function(a) {
        var b = new Dh(a.a);
        b.type = a.type == db || a.type == cb ? db : eb;
        this.dispatchEvent(b);
    };
    Jo.prototype.F = function() {
        Jo.m.F.call(this);
        ai(this.a);
        ai(this.b);
        delete this.A;
    };
    function Ko(a, b) {
        this.a = a instanceof N ? a : new N(a, b);
    }
    E(Ko, Hk);
    Ko.prototype.b = function(a, b, c) {
        Lk(Xg(a), 0, a, b, this.a, c, null, void 0);
    };
    function Lo() {
        this.a = new zj();
    }
    function Mo(a) {
        var b = typeof a;
        return (b == Gb && a) || b == p ? "o" + tc(a) : b.substr(0, 1) + a;
    }
    x = Lo.prototype;
    x.add = function(a) {
        this.a.set(Mo(a), a);
    };
    x.remove = function(a) {
        return this.a.remove(Mo(a));
    };
    x.contains = function(a) {
        return Bj(this.a, Mo(a));
    };
    x.Da = function() {
        return this.a.Da();
    };
    x.Ja = function() {
        return this.a.Ja(!1);
    };
    function No(a, b, c) {
        this.ca = c || (a ? Uf(Wf(document, a)) : Uf());
        Tm.call(this, this.ca.D(g, { style: "position:absolute;display:none;" }));
        this.Gb = new N(1, 1);
        this.B = new Lo();
        this.G = null;
        a && Oo(this, a);
        null != b && this.Pa(b);
    }
    E(No, Tm);
    var Po = [];
    x = No.prototype;
    x.za = null;
    x.className = "goog-tooltip";
    x.Zg = 500;
    x.zg = 0;
    function Oo(a, b) {
        b = Wf(document, b);
        a.B.add(b);
        S(b, Db, a.Ke, !1, a);
        S(b, Cb, a.cc, !1, a);
        S(b, Bb, a.qg, !1, a);
        S(b, cb, a.jg, !1, a);
        S(b, Ka, a.cc, !1, a);
    }
    function Qo(a, b) {
        if (b) (b = Wf(document, b)), Ro(a, b), a.B.remove(b);
        else {
            for (var c = a.B.Da(), d = 0; (b = c[d]); d++) Ro(a, b);
            Dj(a.B.a);
        }
    }
    function Ro(a, b) {
        $h(b, Db, a.Ke, !1, a);
        $h(b, Cb, a.cc, !1, a);
        $h(b, Bb, a.qg, !1, a);
        $h(b, cb, a.jg, !1, a);
        $h(b, Ka, a.cc, !1, a);
    }
    x.Pa = function(a) {
        Eg(this.j(), a);
    };
    x.bc = function(a) {
        var b = this.j();
        b && sg(b);
        No.m.bc.call(this, a);
        a
            ? ((b = this.ca.a.body),
              b.insertBefore(a, b.lastChild),
              Ah(this.G),
              (this.G = new Jo(this.j())),
              zh(this, yc(Ah, this.G)),
              S(this.G, db, this.Yb, void 0, this),
              S(this.G, eb, this.Zd, void 0, this))
            : (Ah(this.G), (this.G = null));
    };
    x.Nc = function() {
        return Kg(this.j());
    };
    function So(a) {
        return a.L ? (a.isVisible() ? 4 : 1) : a.la ? 3 : a.isVisible() ? 2 : 0;
    }
    x.Je = function() {
        if (!Pm.prototype.Je.call(this)) return !1;
        if (this.b) for (var a, b = 0; (a = Po[b]); b++) xg(a.j(), this.b) || a.I(!1);
        Mc(Po, this) || Po.push(this);
        a = this.j();
        a.className = this.className;
        this.Yb();
        S(a, Db, this.Hd, !1, this);
        S(a, Cb, this.Gd, !1, this);
        To(this);
        return !0;
    };
    x.jf = function() {
        Nc(Po, this);
        for (var a = this.j(), b, c = 0; (b = Po[c]); c++) b.b && xg(a, b.b) && b.I(!1);
        this.$c && this.$c.Zd();
        $h(a, Db, this.Hd, !1, this);
        $h(a, Cb, this.Gd, !1, this);
        this.b = void 0;
        0 == So(this) && (this.Ia = !1);
        Pm.prototype.jf.call(this);
    };
    x.df = function(a, b) {
        this.b == a &&
            this.B.contains(this.b) &&
            (this.Ia || !this.Nf
                ? (this.I(!1),
                  this.isVisible() ||
                      ((this.b = a),
                      (this.s = b || new Uo(Rf(this.Gb))),
                      this.isVisible() && this.ob(),
                      this.I(!0)))
                : (this.b = void 0));
        this.L = void 0;
    };
    x.Ui = function(a) {
        this.la = void 0;
        if (a == this.b) {
            a = this.ca;
            var b = a.a;
            try {
                var c = b && b.activeElement;
                var d = c && c.nodeName ? c : null;
            } catch (e) {
                d = null;
            }
            d = d && this.j() && a.contains(this.j(), d);
            (null != this.za && (this.za == this.j() || this.B.contains(this.za))) ||
                d ||
                (this.Zc && this.Zc.za) ||
                this.I(!1);
        }
    };
    function Vo(a, b) {
        var c = eg(a.ca.a);
        a.Gb.x = b.clientX + c.x;
        a.Gb.y = b.clientY + c.y;
    }
    x.Ke = function(a) {
        var b = Wo(this, a.target);
        this.za = b;
        this.Yb();
        b != this.b && ((this.b = b), Xo(this, b), Yo(this), Vo(this, a));
    };
    function Wo(a, b) {
        try {
            for (; b && !a.B.contains(b); ) b = b.parentNode;
            return b;
        } catch (c) {
            return null;
        }
    }
    x.qg = function(a) {
        Vo(this, a);
        this.Ia = !0;
    };
    x.jg = function(a) {
        this.za = a = Wo(this, a.target);
        this.Ia = !0;
        if (this.b != a) {
            this.b = a;
            var b = new Zo(this.za);
            this.Yb();
            Xo(this, a, b);
            Yo(this);
        }
    };
    function Yo(a) {
        if (a.b) for (var b, c = 0; (b = Po[c]); c++) xg(b.j(), a.b) && ((b.Zc = a), (a.$c = b));
    }
    x.cc = function(a) {
        var b = Wo(this, a.target),
            c = Wo(this, a.relatedTarget);
        b != c &&
            (b == this.za && (this.za = null),
            To(this),
            (this.Ia = !1),
            !this.isVisible() || (a.relatedTarget && xg(this.j(), a.relatedTarget))
                ? (this.b = void 0)
                : this.Zd());
    };
    x.Hd = function() {
        var a = this.j();
        this.za != a && (this.Yb(), (this.za = a));
    };
    x.Gd = function(a) {
        var b = this.j();
        this.za != b ||
            (a.relatedTarget && xg(b, a.relatedTarget)) ||
            ((this.za = null), this.Zd());
    };
    function Xo(a, b, c) {
        a.L || (a.L = wl(C(a.df, a, b, c), a.Zg));
    }
    function To(a) {
        a.L && (xl(a.L), (a.L = void 0));
    }
    x.Zd = function() {
        2 == So(this) && (this.la = wl(C(this.Ui, this, this.b), this.zg));
    };
    x.Yb = function() {
        this.la && (xl(this.la), (this.la = void 0));
    };
    x.F = function() {
        this.I(!1);
        To(this);
        Qo(this);
        this.j() && sg(this.j());
        this.za = null;
        delete this.ca;
        No.m.F.call(this);
    };
    function Uo(a, b) {
        Ko.call(this, a, b);
    }
    E(Uo, Ko);
    Uo.prototype.b = function(a, b, c) {
        b = Xg(a);
        b = $g(b);
        c = c ? new Pg(c.top + 10, c.right, c.bottom, c.left + 10) : new Pg(10, 0, 0, 10);
        Ok(this.a, a, 8, c, b, 9) & 496 && Ok(this.a, a, 8, c, b, 5);
    };
    function Zo(a) {
        Bo.call(this, a, 5);
    }
    E(Zo, Bo);
    Zo.prototype.b = function(a, b, c) {
        var d = new N(10, 0);
        Lk(this.c, this.f, a, b, d, c, 9) & 496 && Lk(this.c, 4, a, 1, d, c, 5);
    };
    function $o(a, b, c) {
        Go.call(this, b, c);
        this.h = new zj();
        this.f = a || 5;
        this.l = null;
        this.o = !1;
        this.g = Array(this.f);
        this.H = Array(this.f);
        this.C = Tl.X();
        this.sa = xm.X();
        this.L = null;
        this.ih = !0;
    }
    E($o, Go);
    var ap = "";
    x = $o.prototype;
    x.D = function() {
        $o.m.D.call(this);
        for (var a = 0; a < this.f; ++a) this.sc(new ao(""), !0);
    };
    x.fa = function(a) {
        $o.m.fa.call(this, a);
        M(this.j(), "alt-menu");
    };
    x.xf = function(a) {
        a = this.h.get(tc(a));
        for (var b = 0; b < Y(a, 2) && b < this.f; ++b) {
            var c = zi(this, b);
            c.Nb(um($m(a, b), 0));
            c.ya(b);
            c.I(!0, !0);
        }
        for (; b < this.f; ++b) zi(this, b).I(!1);
    };
    function bp(a, b, c) {
        a.h.set(tc(b), c);
        Ho(a, b, 9, 8, !1, new Pg(-2, 1, -2, 1));
    }
    x.hd = function() {
        $o.m.hd.call(this);
        Dj(this.h);
    };
    x.I = function(a, b) {
        var c = this.Ca;
        this.L = c;
        a && null != c
            ? (cp(this, c), Yl(this.C, "altshow"), ym(this.sa, 207))
            : null != this.l && en(this.l, 0, 0);
        null != c && (a ? this.re(c) : this.oe(c));
        b = $o.m.I.call(this, a, b);
        a && null != this.j() && ih(this.j(), !1);
        return b;
    };
    x.bb = function() {
        if (null != this.L) {
            var a = Kg(this.L);
            if (null != a) return a;
        }
        return "";
    };
    x.pb = function() {
        $o.m.pb.call(this);
        if (this.o)
            for (var a = 0; a < this.g.length; a++) {
                var b = this.g[a];
                xl(b.f);
                b.g();
                b.l(-1);
                b.g();
                b.I(!1);
            }
    };
    x.re = function(a) {
        M(a, "trans-target");
        a.title = "";
    };
    x.oe = function(a) {
        Kf(a, "trans-target");
        a.title = ap;
    };
    x.Ga = function(a) {
        if (a.shiftKey || a.ctrlKey || a.altKey || 36 == a.keyCode || 35 == a.keyCode) return !1;
        var b = $o.m.Ga.call(this, a);
        if (!b && (37 == a.keyCode || 39 == a.keyCode)) {
            var c = gh(this.Ca.parentNode.parentNode),
                d = null;
            if ((!c && 37 == a.keyCode) || (c && 39 == a.keyCode)) d = !1;
            if ((!c && 39 == a.keyCode) || (c && 37 == a.keyCode)) d = !0;
            if (
                this.ke(d) &&
                ((c = this.Ca),
                (c = d
                    ? void 0 !== c.nextElementSibling
                        ? c.nextElementSibling
                        : vg(c.nextSibling, !0)
                    : void 0 !== c.previousElementSibling
                    ? c.previousElementSibling
                    : vg(c.previousSibling, !1)) && c != this.Ca)
            )
                return (
                    this.pb(),
                    this.Yg(d),
                    this.zd(c ? this.a.get(tc(c)) : null, 0, 0),
                    dp(this),
                    a.b(),
                    a.stopPropagation(),
                    !0
                );
        }
        return b;
    };
    x.zd = function(a, b, c) {
        gh((a.A || this.Ca).parentNode.parentNode) ? P(this.j(), Ya, Qb) : P(this.j(), Ya, "");
        if (this.o) for (var d = 0; d < this.g.length; d++) ep(this, d), Eg(this.g[d].c, "...");
        this.xf(a.A);
        $o.m.zd.call(this, a, b, c);
    };
    function fp(a, b, c) {
        !a.o || b >= a.f || "" == c || (Eg(a.g[b].c, c), ep(a, b));
    }
    function ep(a, b) {
        Lk(zi(a, b).j(), 12, a.g[b].j(), 8, new N(1, 0));
    }
    x.Pc = function(a) {
        $o.m.Pc.call(this, a);
        var b = this.Ca;
        null != b &&
            (Yl(this.C, "altmenuhl"),
            ym(this.sa, 209),
            cp(this, b),
            (a = this.od(a.target)),
            -1 != a &&
                a != this.f &&
                (xl(this.H[a]),
                (this.H[a] = wl(this.Si, 300, this)),
                this.o &&
                    ((b = this.g[a]),
                    gh(this.Ca.parentNode.parentNode)
                        ? (M(b.j(), Qb), P(b.j(), Ya, Qb))
                        : (Kf(b.j(), Qb), P(b.j(), Ya, "")),
                    ep(this, a),
                    xl(b.f),
                    0 == b.a ? (b.f = wl(C(b.l, b, 1), 300)) : b.l(1))));
    };
    x.Si = function() {
        Yl(this.C, "altmenuhold");
        ym(this.sa, 208);
    };
    x.Qe = function(a) {
        $o.m.Qe.call(this, a);
        a = this.od(a.target);
        -1 != a && a != this.f && (xl(this.H[a]), this.o && this.g[a].o());
    };
    x.od = function(a) {
        return Bi(this, a);
    };
    x.ke = v(!0);
    x.Yg = ec();
    x.qe = function(a, b, c, d, e) {
        (a = $o.m.qe.call(this, a, b, c, d, e)) && a.Bc == Ab && (a.Bc = Sa);
        return a;
    };
    x.bd = function(a) {
        $o.m.bd.call(this, a);
        U(this).w(a.A, Db, this.vg);
        U(this).w(a.A, Cb, this.Ed);
        U(this).w(a.A, Wa, this.tg);
        U(this).w(a.A, Bb, this.ug);
    };
    x.se = function(a) {
        $o.m.se.call(this, a);
        U(this).ba(a.A, Db, this.vg);
        U(this).ba(a.A, Cb, this.Ed);
        U(this).ba(a.A, Wa, this.tg);
        U(this).ba(a.A, Bb, this.ug);
    };
    function cp(a, b) {
        if (null != a.l && (b = a.h.get(tc(b))) && ((a = a.l), a.b))
            for (
                var c = a.A && (a.A.value || Kg(a.A)), d = -1, e = -1, f = !1, h = 0;
                h < Y(a.b, 5);
                h++
            ) {
                var k = bn(a.b, h);
                if (
                    0 != Y(k, 2) &&
                    (0 == tm(k, 5) &&
                        ((f = c.indexOf(um(k, 4), e + 1)),
                        0 <= f ? ((d = f), (e = d + um(k, 4).length), (f = !0)) : (f = !1)),
                    bn(a.b, h).Fb() == b.Fb())
                ) {
                    if (f) {
                        c = [];
                        for (e = 0; e < Y(b, 3); ++e)
                            c.push({
                                Cc: d + tm(new Ym(vm(b, 3, e)), 0),
                                Cf: d + tm(new Ym(vm(b, 3, e)), 1)
                            });
                        en(a, 0, 0, void 0, c);
                    } else (d = c.indexOf(um(b, 0))), 0 <= d && en(a, d, d + um(b, 0).length);
                    break;
                }
            }
    }
    function gp(a, b) {
        b
            ? yj(
                  a.a.Ja(!1),
                  function(c) {
                      "" == this.b.eg(c.A) && (M(c.A, Yb), this.b.ib(c.A, "_"));
                      return !0;
                  },
                  a
              )
            : yj(
                  a.a.Ja(!1),
                  function(c) {
                      If(c.A, Yb) && (Kf(c.A, Yb), this.b.ib(c.A, ""));
                      return !0;
                  },
                  a
              );
    }
    x.vg = function(a) {
        !Vn() &&
            this.isEnabled() &&
            (M(a.target, Zb),
            cp(this, a.target),
            gp(this, !0),
            Yl(this.C, "althighlight"),
            ym(this.sa, 206));
    };
    x.Ed = function(a) {
        Kf(a.target, Zb);
        null == this.l || this.isVisible() || en(this.l, 0, 0);
        gp(this, !1);
    };
    x.ug = function(a) {
        Vn() && this.Ed(a);
    };
    x.tg = function(a) {
        Vn() || (this.Ed(a), In(Dn(a.target), void 0).select());
    };
    function dp(a) {
        yj(
            a.a.Ja(!1),
            function(b) {
                Kf(b.A, Zb);
                return !0;
            },
            a
        );
    }
    x.ff = function(a) {
        a && a.currentTarget && a.currentTarget.Ca && (a.g = a.currentTarget.Ca);
        $o.m.ff.call(this, a);
    };
    x.Vd = function(a) {
        Vn() ? dp(this) : this.xb && $o.m.Vd.call(this, a);
    };
    function hp(a, b, c) {
        this.P = this.c = null;
        $o.call(this, a, b, c);
    }
    E(hp, $o);
    x = hp.prototype;
    x.Yg = fc("c");
    x.I = function(a, b) {
        b = hp.m.I.call(this, a, b);
        this.c = null;
        a
            ? (this.P = this.bb())
            : null != this.P && this.P != this.bb() && this.dispatchEvent(new Bh(Ca, this));
        return b;
    };
    x.re = function(a) {
        hp.m.re.call(this, a);
        M(a, "trans-edit");
        a.contentEditable = !0;
        no(this, a);
        mo(this).focus();
        Hg(mo(this), !0);
        U(this).w(a, xb, this.ng);
        U(this).w(a, Cb, this.Fd);
        U(this).w(a, Db, this.Fd);
        if (null != this.c) {
            a = In(Dn(a), void 0);
            var b = this.c ? a.Na() : a.fb(),
                c = nn(a);
            a = c;
            var d = b,
                e = new Hn();
            e.f = Rn(a, d, c, b);
            if (wg(a) && !ng(a)) {
                var f = a.parentNode;
                d = Fc(f.childNodes, a);
                a = f;
            }
            wg(c) && !ng(c) && ((f = c.parentNode), (b = Fc(f.childNodes, c)), (c = f));
            e.f
                ? ((e.a = c), (e.g = b), (e.b = a), (e.c = d))
                : ((e.a = a), (e.g = d), (e.b = c), (e.c = b));
            e.select();
        }
    };
    x.oe = function(a) {
        hp.m.oe.call(this, a);
        Kf(a, "trans-edit");
        a.contentEditable = !1;
        mo(this) && Hg(mo(this), !1);
        U(this).ba(a, xb, this.ng);
        U(this).ba(a, Cb, this.Fd);
        U(this).ba(a, Db, this.Fd);
    };
    x.Fd = function() {
        var a = Tn();
        null == a || (a.Ma() == a.eb() && a.Na() == a.fb()) || this.I(a.Ma() == a.eb());
    };
    x.ng = function(a) {
        for (var b = 0; b < this.f; ++b) zi(this, b).I(!1);
        if (13 == a.keyCode || 3 == a.keyCode)
            return null === ro(this) ? (this.pb(), a.stopPropagation(), a.b(), !0) : !1;
        null === ro(this) ||
            (!Oi(a) && 37 != a.keyCode && 39 != a.keyCode) ||
            (this.Ca.focus(), this.Cb(Bi(this, null)));
        return !1;
    };
    x.ke = function(a) {
        var b = Tn();
        if (b.Ma() == b.eb() && b.Na() == b.fb()) {
            var c = b.Ve() ? b.Na() : b.fb();
            b = In(Dn(nn(b)), void 0);
            if ((!a && c == b.Na()) || (a && c == b.fb())) return !0;
        }
        return !1;
    };
    function ip(a, b, c) {
        $o.call(this, a, b, c);
        this.c = null;
    }
    E(ip, $o);
    x = ip.prototype;
    x.fa = function(a) {
        ip.m.fa.call(this, a);
        this.c = new jp("");
        this.sc(this.c, !0);
    };
    x.xf = function(a) {
        ip.m.xf.call(this, a);
        this.c.j().firstChild.value = this.b.eg(a);
    };
    x.I = function(a, b) {
        b = ip.m.I.call(this, a, b);
        a &&
            null != this.j() &&
            (mo(this) == this.c.j().firstChild || mo(this) == this.c.j().firstChild.nextSibling) &&
            ij(this.c, !0);
        return b;
    };
    x.Pc = function(a) {
        ip.m.Pc.call(this, a);
        a.target == this.c ? no(this, this.c.j().firstChild) : no(this, this.j());
        mo(this).focus();
        mo(this).tabIndex = 0;
    };
    x.od = function(a) {
        return a == this.c ? -1 : ip.m.od.call(this, a);
    };
    x.Ga = function(a) {
        return 9 == a.keyCode
            ? (this.c.V & 2
                  ? (mo(this) == this.c.j().firstChild
                        ? no(this, this.c.j().firstChild.nextSibling)
                        : no(this, this.c.j().firstChild),
                    mo(this).focus(),
                    (mo(this).tabIndex = 0))
                  : ij(this.c, !0),
              a.b(),
              a.stopPropagation(),
              !0)
            : ip.m.Ga.call(this, a);
    };
    x.ke = function() {
        return null === ro(this) || !(ro(this) instanceof jp);
    };
    function jp(a, b, c) {
        W.call(this, a, c || kp.X(), b);
        this.ta(4, !1);
    }
    E(jp, W);
    jp.prototype.Mc = function(a) {
        a.target == this.j().firstChild.nextSibling && this.dispatchEvent(Ca);
    };
    jp.prototype.O = function() {
        jp.m.O.call(this);
        U(this).w(this.j().firstChild, xb, function(a) {
            32 == a.keyCode && a.stopPropagation();
        });
    };
    jp.prototype.bb = function() {
        return this.j().firstChild.value;
    };
    function kp() {}
    E(kp, Ci);
    pc(kp);
    var lp = "";
    kp.prototype.D = function(a) {
        var b = a.b.D(oa, { value: a.ea(), id: "alt-input-text", type: "text" }),
            c = a.b.D(oa, { value: lp, id: "alt-input-submit", class: "", type: Ma });
        return a.b.D(g, { id: "alt-input" }, b, c);
    };
    function mp() {}
    E(mp, Ci);
    pc(mp);
    x = mp.prototype;
    x.$b = ec();
    x.Oa = function(a, b) {
        dj(a, !1);
        a.kb &= -256;
        a.ta(32, !1);
        mp.m.Oa.call(this, a, b);
        a.Nb(b.value);
        return b;
    };
    x.D = function(a) {
        dj(a, !1);
        a.kb &= -256;
        a.ta(32, !1);
        return a.b.D(va, { class: Fi(this, a).join(" "), disabled: !a.isEnabled() }, a.ea() || "");
    };
    x.xd = function(a) {
        return a.tagName == va;
    };
    x.He = z;
    x.Ge = function(a) {
        return a.isEnabled();
    };
    x.ac = z;
    x.Kc = function(a, b, c) {
        mp.m.Kc.call(this, a, b, c);
        (a = a.j()) && 1 == b && (a.disabled = c);
    };
    x.Wa = z;
    x.Jc = function(a, b) {
        a && (a.value = b);
    };
    x.da = v("goog-textarea");
    function np(a, b, c) {
        W.call(this, a, b || mp.X(), c);
        dj(this, !1);
        this.ad = !0;
        (b = this.j()) && this.a.yd(b, !0);
        this.ec = "" != a;
        a || (this.Mb = "");
    }
    E(np, W);
    var op = !(I && !ff(11));
    x = np.prototype;
    x.hc = !1;
    x.Jd = !1;
    x.ec = !1;
    x.qb = 0;
    x.Gg = 0;
    x.ef = 0;
    x.yg = !1;
    x.Td = !1;
    x.tf = !1;
    x.sf = !1;
    x.oc = "";
    function pp(a) {
        return a.c.top + a.c.bottom + a.o.top + a.o.bottom;
    }
    function qp(a) {
        var b = a.ef,
            c = a.j();
        b && c && a.Td && (b -= pp(a));
        return b;
    }
    function rp(a) {
        a.ef = 50;
        sp(a);
    }
    function tp(a) {
        a.Gg = 50;
        sp(a);
    }
    x.ya = function(a) {
        this.Nb(String(a));
    };
    x.Aa = function() {
        return this.j().value != this.oc || up(this) || this.ec ? this.j().value : "";
    };
    x.Nb = function(a) {
        np.m.Nb.call(this, a);
        this.ec = "" != a;
        sp(this);
    };
    x.ka = function(a) {
        np.m.ka.call(this, a);
        this.j().disabled = !a;
    };
    function sp(a) {
        a.j() && a.Ad();
    }
    function up(a) {
        return "placeholder" in a.j();
    }
    function vp(a) {
        a.oc &&
            (up(a)
                ? (a.j().placeholder = a.oc)
                : !a.j() || a.ec || a.Jd || (M(a.j(), Wb), (a.j().value = a.oc)));
    }
    x.O = function() {
        np.m.O.call(this);
        var a = this.j();
        P(a, {
            overflowY: qb,
            overflowX: Ha,
            boxSizing: La,
            MsBoxSizing: La,
            WebkitBoxSizing: La,
            MozBoxSizing: La
        });
        this.c = mh(a);
        this.o = nh(a);
        U(this)
            .w(a, "scroll", this.Ad)
            .w(a, cb, this.Ad)
            .w(a, "keyup", this.Ad)
            .w(a, "mouseup", this.Wi)
            .w(a, Ka, this.Hh);
        vp(this);
        sp(this);
    };
    function wp(a) {
        if (!a.yg) {
            var b = a.j().cloneNode(!1);
            P(b, {
                position: Ba,
                height: Ha,
                top: "-9999px",
                margin: "0",
                padding: "1px",
                border: "1px solid #000",
                overflow: qb
            });
            a.b.a.body.appendChild(b);
            var c = b.scrollHeight;
            b.style.padding = "10px";
            var d = b.scrollHeight;
            a.tf = d > c;
            b.style.borderWidth = "10px";
            a.sf = b.scrollHeight > d;
            b.style.height = "100px";
            100 != b.offsetHeight && (a.Td = !0);
            sg(b);
            a.yg = !0;
        }
        b = a.j();
        isNaN(a.c.top) && ((a.c = mh(b)), (a.o = nh(b)));
        c = a.j().scrollHeight;
        var e = a.j();
        d = e.offsetHeight - e.clientHeight;
        if (!a.tf) {
            var f = a.c;
            d -= f.top + f.bottom;
        }
        a.sf || ((e = nh(e)), (d -= e.top + e.bottom));
        c += 0 < d ? d : 0;
        a.Td
            ? (c -= pp(a))
            : (a.tf || ((d = a.c), (c += d.top + d.bottom)),
              a.sf || ((a = nh(b)), (c += a.top + a.bottom)));
        return c;
    }
    function xp(a, b) {
        a.qb != b && ((a.qb = b), (a.j().style.height = b + "px"));
    }
    function yp(a) {
        var b = a.j();
        b.style.height = Ha;
        var c = b.value.match(/\n/g) || [];
        b.rows = c.length + 1;
        a.qb = 0;
    }
    x.Hh = function() {
        up(this) || ((this.Jd = !1), "" == this.j().value && ((this.ec = !1), vp(this)));
    };
    x.Ad = function(a) {
        if (!this.hc) {
            var b = this.j();
            !up(this) &&
                a &&
                a.type == cb &&
                (b.value == this.oc && this.oc && !this.Jd && (Kf(b, Wb), (b.value = "")),
                (this.Jd = !0),
                (this.ec = "" != b.value));
            var c = !1;
            this.hc = !0;
            a = this.qb;
            if (b.scrollHeight) {
                var d = !1,
                    e = !1,
                    f = wp(this),
                    h = b.offsetHeight,
                    k = qp(this);
                var l = this.Gg;
                var m = this.j();
                l && m && this.Td && (l -= pp(this));
                k && f < k
                    ? (xp(this, k), (d = !0))
                    : l && f > l
                    ? (xp(this, l), (b.style.overflowY = ""), (e = !0))
                    : h != f
                    ? xp(this, f)
                    : this.qb || (this.qb = f);
                d || e || !op || (c = !0);
            } else yp(this);
            this.hc = !1;
            c &&
                ((b = this.j()),
                this.hc ||
                    ((this.hc = !0),
                    (e = b.scrollHeight)
                        ? ((f = wp(this)),
                          (c = qp(this)),
                          (c && f <= c) ||
                              ((d = this.c),
                              (b.style.paddingBottom = d.bottom + 1 + "px"),
                              wp(this) == f &&
                                  ((b.style.paddingBottom = d.bottom + e + "px"),
                                  (b.scrollTop = 0),
                                  (e = wp(this) - e),
                                  e >= c ? xp(this, e) : xp(this, c)),
                              (b.style.paddingBottom = d.bottom + "px")))
                        : yp(this),
                    (this.hc = !1)));
            a != this.qb && this.dispatchEvent("resize");
        }
    };
    x.Wi = function() {
        var a = this.j(),
            b = a.offsetHeight;
        a.filters &&
            a.filters.length &&
            (a = a.filters.item("DXImageTransform.Microsoft.DropShadow")) &&
            (b -= a.offX);
        b != this.qb && (this.qb = this.ef = b);
    };
    function zp(a) {
        return function() {
            return a;
        };
    }
    function Ap(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2);
            d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
            d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
        }
        return a;
    }
    function Bp(a, b) {
        var c = b.split(".");
        b = Number(c[0]) || 0;
        for (var d = [], e = 0, f = 0; f < a.length; f++) {
            var h = a.charCodeAt(f);
            128 > h
                ? (d[e++] = h)
                : (2048 > h
                      ? (d[e++] = (h >> 6) | 192)
                      : (55296 == (h & 64512) &&
                        f + 1 < a.length &&
                        56320 == (a.charCodeAt(f + 1) & 64512)
                            ? ((h = 65536 + ((h & 1023) << 10) + (a.charCodeAt(++f) & 1023)),
                              (d[e++] = (h >> 18) | 240),
                              (d[e++] = ((h >> 12) & 63) | 128))
                            : (d[e++] = (h >> 12) | 224),
                        (d[e++] = ((h >> 6) & 63) | 128)),
                  (d[e++] = (h & 63) | 128));
        }
        a = b;
        for (e = 0; e < d.length; e++) (a += d[e]), (a = Ap(a, "+-a^+6"));
        a = Ap(a, "+-3^+b+-f");
        a ^= Number(c[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        c = a % 1e6;
        return c.toString() + "." + (c ^ b);
    }
    var Cp = null;
    function Dp() {
        var a = zp(String.fromCharCode(116)),
            b = zp(String.fromCharCode(107));
        a = [a(), a()];
        a[1] = b();
        return a.join("");
    }
    function Ep() {
        this.a = 0;
        this.sa = xm.X();
    }
    function Fp(a) {
        a = a.Da("q").join("");
        if (null !== Cp) var b = Cp;
        else {
            var c = zp(String.fromCharCode(84));
            b = zp(String.fromCharCode(75));
            c = [c(), c()];
            c[1] = b();
            b = (Cp = window[c.join(b())] || "") || "";
        }
        return "&" + Dp() + "=" + Bp(a, b);
    }
    function Gp(a, b, c, d, e) {
        c = c.toString();
        c += Fp(d);
        d = d.toString();
        var f = sa;
        b += "?" + c;
        2e3 > b.length + d.length && ((f = "GET"), (b += "&" + d), (d = ""));
        ++a.a;
        Ll(
            b,
            function(h) {
                --a.a;
                e(h);
            },
            f,
            d,
            void 0
        );
    }
    Ep.prototype.b = function(a, b, c) {
        c = c.target;
        !c.Qc() || ("[" != c.Lb()[0] && "{" != c.Lb()[0])
            ? (Hp(this, c), b && b(c.xa()))
            : ((b = Ip(c, "handleSingleResult_")), B(b) && (b = new an(b)), a(b));
    };
    Ep.prototype.c = function(a, b, c) {
        c = c.target;
        if (c.Qc()) {
            c = Ip(c, "handleTextResult_");
            var d = [];
            if (a) d.push(B(c) ? c[0] : c);
            else if (B(c)) for (a = 0; a < c.length; ++a) d.push(B(c[a]) ? c[a][0] : c[a]);
            b(d);
        } else Hp(this, c), b(null, c.ze());
    };
    function Ip(a, b) {
        var c = a.Lb();
        a = { class: "trans.common.TranslationAPI", func: b, url: a.Ae() };
        try {
            var d = JSON.parse(c);
        } catch (e) {
            throw ((d = Tl.X()), (a.js = c), (a.error = e.message), d.log("jsonParseErr", a), e);
        }
        return d;
    }
    var Jp = {},
        Kp = ((Jp[1] = 15),
        (Jp[2] = 16),
        (Jp[3] = 17),
        (Jp[4] = 18),
        (Jp[5] = 19),
        (Jp[6] = 20),
        (Jp[7] = 21),
        (Jp[8] = 22),
        (Jp[9] = 23),
        Jp);
    function Hp(a, b) {
        var c = b.ze();
        c = c in Kp ? Kp[c] : 0;
        a = ym(a.sa, 148);
        var d = new bm();
        d = Bf(d, 1, 156);
        c && Bf(d, 5, c);
        Cf(a, 63, d);
        c = Tl.X();
        a = b.Ae();
        b = b.Lb();
        c.log("invalidResponse", {
            q: a.substring(0, 500),
            ql: a.length,
            r: b.substring(0, 500),
            rl: b.length
        });
    }
    function Lp(a, b) {
        this.b = b;
        for (var c = [], d = !0, e = a.length - 1; 0 <= e; e--) {
            var f = a[e] | 0;
            (d && f == b) || ((c[e] = f), (d = !1));
        }
        this.a = c;
    }
    var Mp = {};
    function Np(a) {
        return -128 <= a && 128 > a
            ? Ne(Mp, a, function(b) {
                  return new Lp([b | 0], 0 > b ? -1 : 0);
              })
            : new Lp([a | 0], 0 > a ? -1 : 0);
    }
    function Op(a) {
        if (isNaN(a) || !isFinite(a)) return Pp;
        if (0 > a) return Qp(Op(-a));
        for (var b = [], c = 1, d = 0; a >= c; d++) (b[d] = (a / c) | 0), (c *= 4294967296);
        return new Lp(b, 0);
    }
    var Pp = Np(0),
        Rp = Np(1),
        Sp = Np(16777216);
    function Tp(a) {
        if (-1 == a.b) return -Tp(Qp(a));
        for (var b = 0, c = 1, d = 0; d < a.a.length; d++) {
            var e = Up(a, d);
            b += (0 <= e ? e : 4294967296 + e) * c;
            c *= 4294967296;
        }
        return b;
    }
    x = Lp.prototype;
    x.toString = function(a) {
        a = a || 10;
        if (2 > a || 36 < a) throw Error("radix out of range: " + a);
        if (Vp(this)) return "0";
        if (-1 == this.b) return "-" + Qp(this).toString(a);
        for (var b = Op(Math.pow(a, 6)), c = this, d = ""; ; ) {
            var e = Wp(c, b).a;
            c = Xp(c, Yp(e, b));
            var f = ((0 < c.a.length ? c.a[0] : c.b) >>> 0).toString(a);
            c = e;
            if (Vp(c)) return f + d;
            for (; 6 > f.length; ) f = "0" + f;
            d = "" + f + d;
        }
    };
    function Up(a, b) {
        return 0 > b ? 0 : b < a.a.length ? a.a[b] : a.b;
    }
    function Vp(a) {
        if (0 != a.b) return !1;
        for (var b = 0; b < a.a.length; b++) if (0 != a.a[b]) return !1;
        return !0;
    }
    function Zp(a, b) {
        a = Xp(a, b);
        return -1 == a.b ? -1 : Vp(a) ? 0 : 1;
    }
    function Qp(a) {
        for (var b = a.a.length, c = [], d = 0; d < b; d++) c[d] = ~a.a[d];
        return new Lp(c, ~a.b).add(Rp);
    }
    x.abs = function() {
        return -1 == this.b ? Qp(this) : this;
    };
    x.add = function(a) {
        for (var b = Math.max(this.a.length, a.a.length), c = [], d = 0, e = 0; e <= b; e++) {
            var f = d + (Up(this, e) & 65535) + (Up(a, e) & 65535),
                h = (f >>> 16) + (Up(this, e) >>> 16) + (Up(a, e) >>> 16);
            d = h >>> 16;
            f &= 65535;
            h &= 65535;
            c[e] = (h << 16) | f;
        }
        return new Lp(c, c[c.length - 1] & -2147483648 ? -1 : 0);
    };
    function Xp(a, b) {
        return a.add(Qp(b));
    }
    function Yp(a, b) {
        if (Vp(a) || Vp(b)) return Pp;
        if (-1 == a.b) return -1 == b.b ? Yp(Qp(a), Qp(b)) : Qp(Yp(Qp(a), b));
        if (-1 == b.b) return Qp(Yp(a, Qp(b)));
        if (0 > Zp(a, Sp) && 0 > Zp(b, Sp)) return Op(Tp(a) * Tp(b));
        for (var c = a.a.length + b.a.length, d = [], e = 0; e < 2 * c; e++) d[e] = 0;
        for (e = 0; e < a.a.length; e++)
            for (var f = 0; f < b.a.length; f++) {
                var h = Up(a, e) >>> 16,
                    k = Up(a, e) & 65535,
                    l = Up(b, f) >>> 16,
                    m = Up(b, f) & 65535;
                d[2 * e + 2 * f] += k * m;
                $p(d, 2 * e + 2 * f);
                d[2 * e + 2 * f + 1] += h * m;
                $p(d, 2 * e + 2 * f + 1);
                d[2 * e + 2 * f + 1] += k * l;
                $p(d, 2 * e + 2 * f + 1);
                d[2 * e + 2 * f + 2] += h * l;
                $p(d, 2 * e + 2 * f + 2);
            }
        for (e = 0; e < c; e++) d[e] = (d[2 * e + 1] << 16) | d[2 * e];
        for (e = c; e < 2 * c; e++) d[e] = 0;
        return new Lp(d, 0);
    }
    function $p(a, b) {
        for (; (a[b] & 65535) != a[b]; ) (a[b + 1] += a[b] >>> 16), (a[b] &= 65535), b++;
    }
    function aq(a, b) {
        this.a = a;
        this.b = b;
    }
    function Wp(a, b) {
        if (Vp(b)) throw Error("division by zero");
        if (Vp(a)) return new aq(Pp, Pp);
        if (-1 == a.b) return (b = Wp(Qp(a), b)), new aq(Qp(b.a), Qp(b.b));
        if (-1 == b.b) return (b = Wp(a, Qp(b))), new aq(Qp(b.a), b.b);
        if (30 < a.a.length) {
            if (-1 == a.b || -1 == b.b)
                throw Error("slowDivide_ only works with positive integers.");
            for (var c = Rp, d = b; 0 >= Zp(d, a); ) (c = bq(c, 1)), (d = bq(d, 1));
            var e = cq(c, 1),
                f = cq(d, 1);
            d = cq(d, 2);
            for (c = cq(c, 2); !Vp(d); ) {
                var h = f.add(d);
                0 >= Zp(h, a) && ((e = e.add(c)), (f = h));
                d = cq(d, 1);
                c = cq(c, 1);
            }
            b = Xp(a, Yp(e, b));
            return new aq(e, b);
        }
        for (e = Pp; 0 <= Zp(a, b); ) {
            c = Math.max(1, Math.floor(Tp(a) / Tp(b)));
            d = Math.ceil(Math.log(c) / Math.LN2);
            d = 48 >= d ? 1 : Math.pow(2, d - 48);
            f = Op(c);
            for (h = Yp(f, b); -1 == h.b || 0 < Zp(h, a); ) (c -= d), (f = Op(c)), (h = Yp(f, b));
            Vp(f) && (f = Rp);
            e = e.add(f);
            a = Xp(a, h);
        }
        return new aq(e, a);
    }
    x.and = function(a) {
        for (var b = Math.max(this.a.length, a.a.length), c = [], d = 0; d < b; d++)
            c[d] = Up(this, d) & Up(a, d);
        return new Lp(c, this.b & a.b);
    };
    x.or = function(a) {
        for (var b = Math.max(this.a.length, a.a.length), c = [], d = 0; d < b; d++)
            c[d] = Up(this, d) | Up(a, d);
        return new Lp(c, this.b | a.b);
    };
    x.xor = function(a) {
        for (var b = Math.max(this.a.length, a.a.length), c = [], d = 0; d < b; d++)
            c[d] = Up(this, d) ^ Up(a, d);
        return new Lp(c, this.b ^ a.b);
    };
    function bq(a, b) {
        var c = b >> 5;
        b %= 32;
        for (var d = a.a.length + c + (0 < b ? 1 : 0), e = [], f = 0; f < d; f++)
            e[f] = 0 < b ? (Up(a, f - c) << b) | (Up(a, f - c - 1) >>> (32 - b)) : Up(a, f - c);
        return new Lp(e, a.b);
    }
    function cq(a, b) {
        var c = b >> 5;
        b %= 32;
        for (var d = a.a.length - c, e = [], f = 0; f < d; f++)
            e[f] = 0 < b ? (Up(a, f + c) >>> b) | (Up(a, f + c + 1) << (32 - b)) : Up(a, f + c);
        return new Lp(e, a.b);
    }
    Xp(bq(Rp, 32), Rp);
    Xp(bq(Rp, 128), Rp);
    var dq = I || K || Oe || Pe || !1;
    (of && 0 <= ad(Kk, "4")) ||
        (pf && L("533")) ||
        (J && L("2.0")) ||
        (I && L("10")) ||
        (Oe && ud());
    function eq(a, b, c, d, e, f, h, k, l) {
        T.call(this, a);
        this.f = h || null;
        null != this.f && this.f.h(C(this.fi, this));
        this.l = null;
        this.a = Ha;
        this.ca = this.c = "";
        this.Za = new Ep();
        this.Gb = !!b && dq && !I;
        this.J = null != e ? e : 0;
        this.g = this.Gb ? new hp() : new ip();
        l && this.g.ka(!1);
        if (0 < this.J)
            for (a = this.g, a.o = !0, b = 0; b < a.f; b++)
                (h = hg(g, "goog-menu", "")),
                    (e = hg(g, null, h)),
                    (h = new Wm(e, h)),
                    (a.g[b] = h),
                    document.body.appendChild(e);
        this.g.fa(c);
        this.h = k || null;
        this.Ia = null != d ? d : -1;
        this.L = Tl.X();
        this.C = new zj();
        this.H = null;
        this.Ya = "t";
        this.P = this.W = null;
        this.o = f || null;
        this.qa = !1;
        null != this.o && (this.o.c(C(this.kj, this)), this.o.a(C(this.bi, this)));
        this.va = null;
        this.sa = xm.X();
    }
    E(eq, T);
    function fq(a, b) {
        a.va = b;
        a.g.l = b;
    }
    function gq(a) {
        a.H = tb;
        a.g.C.s = a.H || "";
    }
    function hq(a) {
        var b = iq;
        a.L.f = b;
        a.Ya = b;
    }
    function jq(a, b) {
        null != a.o && a.o.f();
        b && ((a.l = new an(b)), (a.P = null));
        kq(a) && (a.f.b(), null != a.h && a.h.a(!1));
        if (a.l) {
            b = 0 != Yf().length;
            a.b.Rc(a.j());
            a.g.hd();
            a.va && (a.va.b = a.l);
            for (var c = "", d = 0, e = 0; e < Y(a.l, 5); e++)
                lq(a.l, e) && (c += " "), (c += mq(a.l, e)), (d += Y(bn(a.l, e), 2));
            if (0 != d) {
                c = [];
                d = !1;
                e = a.l;
                for (var f = "", h = 0; h < Y(e, 5); h++) {
                    var k = bn(e, h);
                    null != k.Ea[4] && 0 < um(k, 4).length
                        ? (f = um(k, 4))
                        : (new Zm(k.Fb()).Ea[4] = f);
                }
                for (e = 0; e < Y(a.l, 5); e++) {
                    f = bn(a.l, e);
                    h = $m(f, 0);
                    lq(a.l, e)
                        ? a.b.appendChild(a.j(), a.b.a.createTextNode(" "))
                        : ("km" == a.c || "lo" == a.c) &&
                          a.b.appendChild(
                              a.j(),
                              K
                                  ? mg()
                                  : Oe
                                  ? document.createTextNode("&shy;")
                                  : I
                                  ? document.createTextNode("&#8203;")
                                  : mg()
                          );
                    null != f.Ea[4] && 0 < um(f, 4).length && 0 == tm(f, 5) && c.push(um(f, 4));
                    var l;
                    k = mq(a.l, e);
                    /^[\s\xa0]*$/.test(k)
                        ? 0 == k.length || (l = nq(k))
                        : ((l = a.b.D(ua, null, k)),
                          (h = tm(h, 1)),
                          0 <= a.Ia && h < a.Ia && M(l, "alt-low-conf"),
                          Bj(a.C, a.a + "." + a.c + "." + um(f, 0)) &&
                              ((h = a.C.get(a.a + "." + a.c + "." + um(f, 0))),
                              h != oq(f, 0) && (a.b.ib(l, h), M(l, Fa), (d = !0), pq(a, !0))),
                          (l.title = ap),
                          bp(a.g, l, f));
                    l && a.b.appendChild(a.j(), l);
                }
                if (null != a.f) {
                    l = a.a + "." + a.c;
                    for (e = 0; e < c.length; ++e) l += "." + c[e];
                    Bj(a.C, l) &&
                        (qq(a, !1),
                        (d = !0),
                        rq(a, a.C.get(l)),
                        null != a.h && a.h.a(!1),
                        pq(a, !0));
                }
                d || (pq(a, !1), qq(a, !1));
                (d || b) && a.dispatchEvent(Ca);
            }
        } else pq(a, !1), qq(a, !1);
    }
    function nq(a) {
        a = Ce(a)
            .replace(/(\r\n|\r|\n)/g, "<br>")
            .split("<br>");
        var b = document.createDocumentFragment(),
            c = 0;
        Gc(a, function(d) {
            0 != c && b.appendChild(hg("BR"));
            c++;
            "" != d && b.appendChild(document.createTextNode(String(De(d))));
        });
        return b;
    }
    function sq(a, b) {
        if (kq(a)) return a.f.a();
        var c = [];
        if (a.j() && a.j().childNodes)
            for (var d = 0; d < a.j().childNodes.length; ++d) {
                var e = a.j().childNodes[d];
                c[d] = b && "BR" == e.tagName ? "\n" : Kg(e);
            }
        return c.join("");
    }
    function tq(a, b, c, d) {
        if (b)
            for (a = 0; a < Y(b, 5); a++) {
                var e = bn(b, a);
                if ((e = e && e) && nm(c.Ea, e.Ea)) {
                    c = b;
                    b = a;
                    e = -1;
                    a = Y(c, 5);
                    for (var f = b; 0 <= f; f--)
                        if (0 == tm(bn(c, f), 5)) {
                            e = f;
                            break;
                        }
                    for (f = b + 1; f <= Y(c, 5); f++)
                        if (0 == tm(bn(c, f), 5)) {
                            a = f;
                            break;
                        }
                    if (d) b = uq(c, e, a);
                    else if (((d = c), (c = e), d)) {
                        e = b + 1;
                        f = b;
                        for (b = mq(d, b).length; 64 > b && (e != a || f != c); )
                            e < a && (b += mq(d, e++).length + 1),
                                64 > b && f > c && (b += mq(d, --f).length + 1);
                        b = uq(d, f, e);
                    } else b = "";
                    return b;
                }
            }
        return "";
    }
    function uq(a, b, c) {
        var d = [];
        d.push(mq(a, b));
        for (b += 1; b < c; b++) lq(a, b) && d.push(" "), d.push(mq(a, b));
        return d.join("");
    }
    function lq(a, b) {
        if (0 == b) return !1;
        var c = bn(a, b),
            d = bn(a, b - 1);
        if ((c = sm($m(c, 0), 2) && !sm($m(d, 0), 3)))
            (a = mq(a, b - 1)), (b = a.length - 1), (c = !(0 <= b && a.indexOf("\n", b) == b));
        return c;
    }
    x = eq.prototype;
    x.cb = u("a");
    x.oa = u("c");
    x.D = function() {
        this.S(Ng(this.b, "span"));
    };
    x.S = function(a) {
        eq.m.S.call(this, a);
        jq(this);
    };
    x.O = function() {
        eq.m.O.call(this);
        U(this).w(this.g, Ca, this.si);
        null != this.h &&
            null != this.h.b &&
            (U(this).w(this.h.b, Sa, this.wi), ii(U(this), this.h.b, this.sa.a, this.sa));
        U(this).w(this.g, "show", this.ri);
        this.j() &&
            U(this).w(
                this.j(),
                xb,
                function(a) {
                    32 == a.keyCode && a.stopPropagation();
                },
                !0
            );
    };
    x.F = function() {
        eq.m.F.call(this);
        this.g.M();
    };
    x.fi = function() {
        this.o.ka(this.f.c());
        pq(this, this.f.c());
    };
    x.si = function(a) {
        if (a.type != rb || a.target == this.g)
            if (null == a.target && null != this.f)
                this.L.log("editpopupclk"),
                    ym(this.sa, 233),
                    null != this.h && this.h.a(!0),
                    this.f.l(sq(this)),
                    (this.qa = this.o.j().style.display != q),
                    this.o.reset(),
                    null != this.h ? this.o.ka(this.h.b.style.display != q) : this.o.ka(!1),
                    pq(this, !1);
            else {
                var b = a.g;
                null == b && null != a.currentTarget && (b = a.currentTarget.Ca);
                var c = a.target.bb();
                if (null != b && null != a.target) {
                    var d = b,
                        e = this.g.h.get(tc(d));
                    this.b.ib(d, c);
                    c == oq(e, 0)
                        ? (Kf(d, Fa), 0 == Yf().length && (pq(this, !1), qq(this, !1)))
                        : (M(d, Fa), pq(this, !0), qq(this, !0));
                    null != this.C && this.C.set(this.a + "." + this.c + "." + um(e, 0), c);
                    e = this.g.h.get(tc(b));
                    null != this.C && this.C.set(this.a + "." + this.c + "." + um(e, 0), c);
                    d = oq(e, 0);
                    b = Bi(this.g, a.target);
                    d = {
                        sl: this.a,
                        tl: this.c,
                        utrans: c,
                        gtrans: d,
                        index: b,
                        ophrase: um(e, 0),
                        osentence: um(e, 4),
                        tsentence: tq(this, this.l, e)
                    };
                    0 < Y(e, 2) && (d.confidence = tm($m(e, 0), 1));
                    if (a.target instanceof jp || -1 == b) (d.manual = 1), ym(this.sa, 240);
                    else {
                        a = ym(this.sa, 239);
                        e = new gm();
                        var f = Df(Df(e, 2, em), 3, cm);
                        Bf(f, 1, b);
                        Cf(a, 27, e);
                    }
                    for (var h in d)
                        typeof d[h] === t &&
                            64 < d[h].length &&
                            ((d.tr = 1), (d[h] = d[h].substr(0, 64)));
                    this.L.log("usealt", d, this.H);
                    h = new Bh("usealt");
                    h.text = c;
                    this.dispatchEvent(h);
                    this.dispatchEvent(Ca);
                }
            }
    };
    function rq(a, b) {
        if (a.j()) {
            null == a.W && (a.P = Pc(a.b.Rh(a.j())));
            a.W = b;
            var c;
            if ((c = a.j().childNodes && 0 < a.j().childNodes.length))
                c = (c = a.j().childNodes[0]) ? Bj(a.g.a, tc(c)) : !1;
            if (c)
                a.b.Rc(a.j()),
                    a.g.hd(),
                    (b = a.b.D(ua, Fa, a.W)),
                    a.b.appendChild(a.j(), b),
                    bp(a.g, b, new Zm());
            else {
                pg(a.j());
                a = a.j();
                c = Ce(b);
                b = hg(g);
                c = c.replace(/(\r\n|\r|\n)/g, "<br>").split("<br>");
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    e.length && ((e = hg(ua, e)), b.appendChild(e));
                    d != c.length - 1 && ((e = hg("BR")), b.appendChild(e));
                }
                a.appendChild(b);
            }
        }
    }
    x.wi = function() {
        null != this.f && kq(this) ? this.f.g() : vq(this);
        this.L.log("clkundo", void 0, this.H);
    };
    x.bi = function() {
        kq(this) &&
            (this.f.c() && (rq(this, this.f.a()), (this.qa = !0)),
            this.f.b(),
            null != this.h && this.h.a(!1),
            this.f.c() && pq(this, !0),
            this.o.ka(!0),
            Q(this.o.j(), this.qa),
            this.dispatchEvent(Ca));
        ym(this.sa, 215);
        this.L.log("clkcancel", void 0, this.H);
    };
    x.ri = function() {
        var a = this.g.h.get(tc(this.g.Ca));
        if (a) {
            if (0 < this.J) {
                var b = new Lj("source=baf");
                if (1 == this.J) {
                    for (var c = [], d = 0, e = Y(a, 2); d < e; d++) c.push(oq(a, d));
                    d = this.Za;
                    var f = this.c,
                        h = this.a,
                        k = wq(this),
                        l = C(this.mj, this);
                    e = new Lj();
                    var m = new Lj();
                    e.set("client", "mt");
                    e.set("sl", f);
                    e.set("tl", h);
                    e.set("hl", k);
                    e.set("v", "1.0");
                    b && e.dg(b);
                    (b = !B(c) || (B(c) && 1 == c.length)) ? m.set("q", c) : Zj(m, "q", c);
                    b = C(d.c, d, b, l);
                    Gp(d, ea, e, m, b);
                } else
                    for (d = 0, e = Y(a, 2); d < e; d++) {
                        h = oq(a, d);
                        c = this.Za;
                        m = this.c;
                        l = this.a;
                        f = wq(this);
                        k = C(this.nj, this, d);
                        var n = b,
                            r = new Lj(),
                            w = new Lj();
                        r.set("client", "mt");
                        r.set("sl", m);
                        r.set("tl", l);
                        r.set("hl", f);
                        Zj(r, "dt", ["at", "t"]);
                        n && r.dg(n);
                        w.set("q", h);
                        Gp(c, "/translate_a/single", r, w, C(c.b, c, k, void 0));
                    }
            }
            b = new Bh(Sa);
            b.text = this.g.bb();
            b.h = Y(this.l, 5);
            this.dispatchEvent(b);
            b = {};
            b.confidence = tm($m(a, 0), 1);
            this.a &&
                this.c &&
                this.ca &&
                ((b.segments = Y(this.l, 5)), (b.sl = this.a), (b.tl = this.c), (b.hl = this.ca));
            ym(this.sa, 238);
            this.L.log("phrsclk", b, this.H);
        }
    };
    x.nj = function(a, b) {
        if (1 == this.J || 1 < Y(b, 5)) {
            var c = um(new wm(vm(b, 0, 0)), 0);
            var d = 1;
            for (var e = Y(b, 0); d < e; d++) c += " " + um(new wm(vm(b, 0, d)), 0);
            d = c;
        } else if (1 == Y(b, 5)) {
            c = [];
            b = bn(b, 0);
            d = 0;
            for (e = Math.min(this.J, Y(b, 2)); d < e; d++) c.push(oq(b, d));
            d = c.join(", ");
        } else d = "...";
        fp(this.g, a, d);
    };
    x.mj = function(a) {
        for (var b = 0; b < a.length; b++) fp(this.g, b, a[b]);
    };
    function vq(a) {
        kq(a) && (null != a.h && a.h.a(!1), a.f.b());
        Dj(a.C);
        a.W = null;
        jq(a);
        a.dispatchEvent(Ca);
    }
    function pq(a, b) {
        null != a.h && null != a.h.b && Q(a.h.b, b);
    }
    function qq(a, b) {
        null != a.o && (b && a.o.reset(), Q(a.o.j(), b));
    }
    x.kj = function() {
        ym(this.sa, 374);
        var a = [],
            b;
        null != this.P ? (b = this.P) : (b = tg(this.j()));
        for (var c = { segment: [] }, d = null, e = 0, f = 0; f < b.length; f++) {
            var h = bn(this.l, f);
            if (null != h) {
                var k = Kg(b[f]);
                a: {
                    var l = k;
                    var m = h;
                    if (0 == Y(m, 2)) l = 0;
                    else {
                        for (var n = 0; n < Y(m, 2); ++n)
                            if (l == oq(m, n)) {
                                l = n;
                                break a;
                            }
                        l = -1;
                    }
                }
                m = Sc(um(h, 4));
                n = tq(this, this.l, h, !0);
                if (0 != m.length) {
                    if (0 == a.length || m != a[a.length - 1])
                        a.push(m),
                            (d = xq(this, a.length - 1)),
                            (e = 0),
                            (d = {
                                source: m,
                                original_target: n,
                                segment_source: d,
                                phrase_correction: []
                            }),
                            c.segment.push(d);
                    if (0 != l)
                        for (
                            m = oq(h, 0).length,
                                l = {
                                    alternative_index: l,
                                    edited_phrase: k,
                                    source_span: [],
                                    target_span: [{ start: e, end: e + m }]
                                },
                                d.phrase_correction.push(l),
                                m = 0;
                            m < Y(h, 3);
                            ++m
                        )
                            (n = new Ym(vm(h, 3, m))),
                                l.source_span.push({ start: tm(n, 0), end: tm(n, 1) });
                    e += k.length;
                    sm($m(h, 0), 2) && e++;
                }
            }
        }
        if (kq(this)) {
            this.dispatchEvent(Ca);
            this.f.b();
            null != this.h && this.h.a(!1);
            pq(this, !0);
            this.f.a() != sq(this) && rq(this, this.f.a());
            b = this.a + "." + this.c;
            for (f = 0; f < a.length; ++f) b += "." + a[f];
            a = this.f.a();
            this.C.set(b, a);
            c.contains_full_edit = !0;
        }
        c.edited_target = sq(this, !0);
        a = new Lj();
        a.set("ue", JSON.stringify(c));
        a.set("sl", this.a);
        a.set("tl", this.c);
        Ll(fa + this.Ya, void 0, sa, a.toString(), 1e4);
    };
    function xq(a, b) {
        if (b < Y(a.l, 0))
            switch (rm(new wm(vm(a.l, 0, b)), 4, 0)) {
                case 0:
                    return 1;
                case 1:
                    return 2;
                case 2:
                    return 3;
                case 10:
                    return 4;
                case 3:
                    return 5;
            }
        return 0;
    }
    function kq(a) {
        return null != a.f && a.f.f();
    }
    function mq(a, b) {
        a = bn(a, b);
        return 0 == Y(a, 2) ? um(a, 0) : oq(a, 0);
    }
    function oq(a, b) {
        return um($m(a, b), 0);
    }
    function wq(a) {
        a = a.ca;
        0 === a.length && null != Wf(document, "hl") && (a = Wf(document, "hl").value);
        return a;
    }
    var yq = window.google && google.translate && google.translate._const;
    yq ||
        (yq = {
            _cac: "",
            _cam: "",
            _cest: new Date(),
            _cjlc: "",
            _cl: "",
            _cuc: "",
            _cnad: !1,
            _cnal: {},
            wk: "",
            _pah: "",
            _pas: "",
            _pbi: "",
            _pci: "",
            _phf: "",
            _pli: "",
            _plla: "",
            _pmi: "",
            _ps: "",
            _pta: "",
            _puh: ""
        });
    var zq = (window.google && window.google.translate && window.google.translate.v) || "",
        Aq = yq._cl || "en",
        Bq = yq._cuc,
        Cq = yq._cnad,
        Dq = yq._cest,
        Eq = yq._cnal || {},
        Fq = "lib" == yq._cam ? 1 : 0,
        Gq = (yq._cac || "te") + (1 == Fq ? "_lib" : ""),
        Hq = (function() {
            function a(d) {
                return function() {
                    return d;
                };
            }
            var b = String.fromCharCode(107),
                c = a(String.fromCharCode(116));
            b = a(b);
            c = [c(), c()];
            c[1] = b();
            return yq["_c" + c.join(b())] || "";
        })(),
        Iq = yq._pah || "",
        Jq = yq._pas || "https://",
        Kq = yq._pbi || "",
        Lq = yq._pci || "",
        Mq = yq._plla || "",
        Nq = yq._pli || "",
        Oq = yq._ps || "",
        Pq = yq._puh || "",
        Qq = "//" + Pq + fa + Gq,
        Rq = "https://www.google.com/support/translate" + ("en" == Aq ? "" : "#googtrans/en/" + Aq);
    function Sq(a) {
        for (var b = {}, c = 0; c < a.length; ++c) b[a[c]] = !0;
        return b;
    }
    function Tq(a) {
        this.b = a ? [a] : [];
        this.a = [0];
        this.c = !1;
    }
    Tq.prototype.register = function(a) {
        if (this.c) return a || z;
        this.a.push(0);
        var b = this.a.length - 1;
        return C(function() {
            this.a[b]++;
            a && a.apply(null, arguments);
            Uq(this);
        }, this);
    };
    Tq.prototype.delay = function(a) {
        return this.c
            ? a
            : C(function() {
                  if (this.c) a.apply(null, arguments);
                  else {
                      var b = arguments;
                      this.b.push(function() {
                          a.apply(null, b);
                      });
                  }
              }, this);
    };
    Tq.prototype.finish = function() {
        this.a[0] = 1;
        Uq(this);
    };
    function Uq(a) {
        for (var b = 0; b < a.a.length; ++b) if (0 == a.a[b]) return;
        a.c = !0;
        for (b = 0; b < a.b.length; ++b) {
            var c = a.b[b];
            a.b[b] = null;
            c.call();
        }
        a.b = [];
        a.a = [];
    }
    function Vq(a) {
        this.c = a;
        this.b = this.a = !1;
    }
    function Wq(a, b) {
        return C(function() {
            b && b.apply(null, arguments);
            this.b ? this.a || (this.c.call(), (this.a = !0)) : (this.a = !0);
        }, a);
    }
    Vq.prototype.finish = function() {
        this.b || ((this.b = !0), this.a && this.c.call());
    };
    function Xq(a, b, c) {
        this.a = b;
        this.h = a;
        this.l = c || 0;
        this.b = this.c = !1;
    }
    function Yq(a) {
        a.c || a.g();
    }
    Xq.prototype.g = function() {
        (this.c = (this.b = !!this.h.call()) || 0 >= --this.l)
            ? (this.a.call(null, this.b), (this.f = 0))
            : (this.f = window.setTimeout(C(this.g, this), 30));
    };
    Xq.prototype.cancel = function() {
        this.f && window.clearTimeout(this.f);
        this.c = !0;
        this.a.call(null, this.b);
    };
    function Zq(a, b) {
        return function() {
            a.dispatchEvent(b);
        };
    }
    function $q(a) {
        a = Sc(a)
            .toLowerCase()
            .replace("_", "-");
        if ("zh-cn" == a) return "zh-CN";
        if ("zh-tw" == a) return "zh-TW";
        var b = a.indexOf("-");
        a = 0 <= b ? a.substring(0, b) : a;
        return "zh" == a ? "zh-CN" : a;
    }
    function ar(a) {
        var b = [],
            c;
        for (c in a)
            if (a[c] !== Object.prototype[c]) {
                var d = Ae(c);
                if (A(a[c]) == Ga)
                    for (var e = 0; e < a[c].length; ++e) b.push(d + "=" + Ae(a[c][e]));
                else b.push(d + "=" + Ae(a[c]));
            }
        return b.join("&");
    }
    function br(a, b) {
        b = b || {};
        b.nca = a;
        b.client = Gq;
        zq && (b.logld = "v" + zq);
        var c = new Image();
        c.src = "//" + Pq + "/gen204?" + ar(b);
        c.onload = function() {
            c.onload = null;
        };
    }
    function cr(a, b) {
        if ((I || Oe) && window.location.hostname != document.domain) {
            dr = dr ? dr + 1 : 1;
            var c = "f" + dr + "_" + D().toString(36);
            window[c] = function() {
                window[c] = void 0;
                a.src = wb;
                b &&
                    window.setTimeout(function() {
                        b();
                    }, 0);
            };
            a.src =
                "javascript:void(document.write(\"<script>document.domain='" +
                document.domain +
                "';parent['" +
                c +
                "']();\x3c/script>\"))";
        } else b && b();
    }
    var dr;
    function er() {
        var a = {};
        try {
            for (var b in Object.prototype) {
                var c = Object.prototype[b];
                delete Object.prototype[b];
                a[b] = c;
            }
        } catch (d) {
            return {};
        }
        return a;
    }
    function fr(a) {
        for (var b in a) Object.prototype[b] = a[b];
    }
    function gr(a) {
        for (var b in a) if (a[b] !== Object.prototype[b]) return !1;
        return !0;
    }
    function hr(a, b) {
        return a != Ha && "zh-CN" != a && a == b;
    }
    var ir, jr, kr;
    (function() {
        function a(d, e, f) {
            var h = Array.prototype.slice.call(arguments);
            h.splice(0, 2);
            h = "l" + d.toString(16) + "i" + e.toString(16) + (h.length ? "-" + h.join("_") : "");
            b ? b.push(h) : br(h);
        }
        var b = null,
            c = null;
        ir = function(d, e, f) {
            for (var h in f)
                f[h] !== Object.prototype[h] && (e[h] = rc(f[h]) ? f[h] : yc(a, d, Number(f[h])));
        };
        jr = function() {
            b && kr();
            b = [];
            c = S(window, "unload", function() {
                kr();
            });
        };
        kr = function() {
            c && (ai(c), (c = null));
            b && b.length && br(b.join(""));
            b = null;
        };
    })(); /*
    Portions of this code are from MochiKit, received by
    The Closure Authors under the MIT license. All other code is Copyright
    2005-2009 The Closure Authors. All Rights Reserved.
   */
    function lr(a) {
        var b = mr;
        this.g = [];
        this.C = b;
        this.G = a || null;
        this.f = this.a = !1;
        this.c = void 0;
        this.o = this.K = this.l = !1;
        this.h = 0;
        this.b = null;
        this.s = 0;
    }
    lr.prototype.cancel = function(a) {
        if (this.a) this.c instanceof lr && this.c.cancel();
        else {
            if (this.b) {
                var b = this.b;
                delete this.b;
                a ? b.cancel(a) : (b.s--, 0 >= b.s && b.cancel());
            }
            this.C ? this.C.call(this.G, this) : (this.o = !0);
            this.a || ((a = new nr(this)), or(this), pr(this, !1, a));
        }
    };
    lr.prototype.B = function(a, b) {
        this.l = !1;
        pr(this, a, b);
    };
    function pr(a, b, c) {
        a.a = !0;
        a.c = c;
        a.f = !b;
        qr(a);
    }
    function or(a) {
        if (a.a) {
            if (!a.o) throw new rr(a);
            a.o = !1;
        }
    }
    function sr(a, b, c, d) {
        a.g.push([b, c, d]);
        a.a && qr(a);
    }
    lr.prototype.then = function(a, b, c) {
        var d,
            e,
            f = new dl(function(h, k) {
                d = h;
                e = k;
            });
        sr(this, d, function(h) {
            h instanceof nr ? f.cancel() : e(h);
        });
        return f.then(a, b, c);
    };
    lr.prototype.$goog_Thenable = !0;
    function tr(a) {
        return Jc(a.g, function(b) {
            return rc(b[1]);
        });
    }
    function qr(a) {
        if (a.h && a.a && tr(a)) {
            var b = a.h,
                c = ur[b];
            c && (y.clearTimeout(c.ia), delete ur[b]);
            a.h = 0;
        }
        a.b && (a.b.s--, delete a.b);
        b = a.c;
        for (var d = (c = !1); a.g.length && !a.l; ) {
            var e = a.g.shift(),
                f = e[0],
                h = e[1];
            e = e[2];
            if ((f = a.f ? h : f))
                try {
                    var k = f.call(e || a.G, b);
                    void 0 !== k && ((a.f = a.f && (k == b || k instanceof Error)), (a.c = b = k));
                    if (Pk(b) || (typeof y.Promise === p && b instanceof y.Promise))
                        (d = !0), (a.l = !0);
                } catch (l) {
                    (b = l), (a.f = !0), tr(a) || (c = !0);
                }
        }
        a.c = b;
        d &&
            ((k = C(a.B, a, !0)),
            (d = C(a.B, a, !1)),
            b instanceof lr ? (sr(b, k, d), (b.K = !0)) : b.then(k, d));
        c && ((b = new vr(b)), (ur[b.ia] = b), (a.h = b.ia));
    }
    function rr() {
        Cc.call(this);
    }
    E(rr, Cc);
    rr.prototype.message = "Deferred has already fired";
    rr.prototype.name = "AlreadyCalledError";
    function nr() {
        Cc.call(this);
    }
    E(nr, Cc);
    nr.prototype.message = "Deferred was canceled";
    nr.prototype.name = "CanceledError";
    function vr(a) {
        this.ia = y.setTimeout(C(this.a, this), 0);
        this.kd = a;
    }
    vr.prototype.a = function() {
        delete ur[this.ia];
        throw this.kd;
    };
    var ur = {};
    function wr(a, b) {
        var c = b || {};
        b = c.document || document;
        var d = Gd(a).toString(),
            e = jg(document, ta),
            f = { Vg: e, Eb: void 0 },
            h = new lr(f),
            k = null,
            l = null != c.timeout ? c.timeout : 5e3;
        0 < l &&
            ((k = window.setTimeout(function() {
                xr(e, !0);
                var m = new yr(1, "Timeout reached for loading script " + d);
                or(h);
                pr(h, !1, m);
            }, l)),
            (f.Eb = k));
        e.onload = e.onreadystatechange = function() {
            (e.readyState && "loaded" != e.readyState && e.readyState != Ua) ||
                (xr(e, c.Jh || !1, k), or(h), pr(h, !0, null));
        };
        e.onerror = function() {
            xr(e, !0, k);
            var m = new yr(0, "Error while loading script " + d);
            or(h);
            pr(h, !1, m);
        };
        f = c.attributes || {};
        pd(f, { type: "text/javascript", charset: "UTF-8" });
        ag(e, f);
        ve(e, Mq);
        zr(b).appendChild(e);
        return h;
    }
    function zr(a) {
        var b = Xf("HEAD", a);
        return b && 0 != b.length ? b[0] : a.documentElement;
    }
    function mr() {
        if (this && this.Vg) {
            var a = this.Vg;
            a && a.tagName == ta && xr(a, !0, this.Eb);
        }
    }
    function xr(a, b, c) {
        null != c && y.clearTimeout(c);
        a.onload = z;
        a.onerror = z;
        a.onreadystatechange = z;
        b &&
            window.setTimeout(function() {
                sg(a);
            }, 0);
    }
    function yr(a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        Cc.call(this, c);
        this.code = a;
    }
    E(yr, Cc);
    function Ar(a, b) {
        this.b = a;
        this.a = b ? b : "callback";
        this.Eb = 5e3;
    }
    Ar.prototype.send = function(a, b, c, d) {
        a = a ? nd(a) : {};
        d = "";
        var e = "__callback__" + d;
        b && ((y[e] = Cr(d, b)), (a[this.a] = e));
        b = { timeout: this.Eb, Jh: !0 };
        e = Gd(this.b).toString();
        e = Hd.exec(e);
        var f = e[3] || "";
        e = new Dd(Ed, e[1] + Id("?", e[2] || "", a) + Id("#", f, void 0));
        b = wr(e, b);
        sr(b, null, Dr(d, a, c), void 0);
        return { ia: d, Uf: b };
    };
    Ar.prototype.cancel = function(a) {
        a && (a.Uf && a.Uf.cancel(), a.ia && Er(a.ia, !1));
    };
    function Dr(a, b, c) {
        return function() {
            Er(a, !1);
            c && c(b);
        };
    }
    function Cr(a, b) {
        return function(c) {
            Er(a, !0);
            b.apply(void 0, arguments);
        };
    }
    function Er(a, b) {
        a = "__callback__" + a;
        if (y[a])
            if (b)
                try {
                    delete y[a];
                } catch (c) {
                    y[a] = void 0;
                }
            else y[a] = z;
    }
    function Fr(a) {
        Gr();
        return oe(a, null);
    }
    function Hr(a) {
        Gr();
        return new Dd(Ed, a);
    }
    var Gr = z;
    function Ir(a, b) {
        R.call(this);
        this.a = new Ij(a);
        if (b) for (var c in b) b[c] !== Object.prototype[c] && this.a.a.set(c, b[c]);
    }
    E(Ir, R);
    Ir.prototype.c = v(!0);
    Ir.prototype.Ua = function() {
        return this.c();
    };
    Ir.prototype.send = v(null);
    Ir.prototype.cancel = ec();
    function Jr(a, b, c, d) {
        Ir.call(this, a, b);
        this.f = null == d || !!d;
        this.b = new Ar(Hr(this.a.toString()), c);
    }
    E(Jr, Ir);
    Jr.prototype.c = u("f");
    Jr.prototype.send = function(a, b) {
        this.b.Eb = -1;
        return this.b.send(a, b);
    };
    Jr.prototype.cancel = function(a) {
        this.b.cancel(a);
    };
    function Kr(a, b) {
        Ir.call(this, a, b);
        this.f = {};
        this.b = this.g = 0;
        window.XMLHttpRequest && dc in new XMLHttpRequest() && (this.b = 1);
        !this.b &&
            window.XDomainRequest &&
            "file:" != window.location.protocol &&
            ((this.b = 2), this.a.a.set("u", window.location.href));
    }
    E(Kr, Ir);
    ir(17170, Kr.prototype, { Fg: 1, Eg: 2 });
    Kr.prototype.c = function() {
        return !!this.b;
    };
    Kr.prototype.send = function(a, b) {
        var c = er(),
            d = ++this.g,
            e = {},
            f = {};
        "q" in a && ((f.q = a.q), delete a.q);
        a.mode = this.b;
        1 == this.b
            ? ((e.sb = new Hl()),
              S(
                  e.sb,
                  Ua,
                  C(function() {
                      e.vc ||
                          (e.sb.Qc() ? b(e.sb.Lb()) : (this.Eg(), b(null, e.sb.Lb() || null)),
                          Lr(this, d));
                  }, this)
              ),
              S(
                  e.sb,
                  "timeout",
                  C(function() {
                      e.vc || (this.Fg(), Lr(this, d));
                  }, this)
              ),
              e.sb.send(this.a.toString() + "&" + ar(a), sa, ar(f), {
                  "Content-Type": "application/x-www-form-urlencoded"
              }))
            : ((e.Xa = new XDomainRequest()),
              (e.Xa.timeout = 2e4),
              (e.Xa.onload = C(function() {
                  e.vc || (b(e.Xa.responseText), Lr(this, d));
              }, this)),
              (e.Xa.onerror = C(function() {
                  e.vc || (this.Eg(), b(null), Lr(this, d));
              }, this)),
              (e.Xa.ontimeout = C(function() {
                  e.vc || (this.Fg(), b(null), Lr(this, d));
              }, this)),
              e.Xa.open(sa, this.a.toString() + "&" + ar(a)),
              e.Xa.send(ar(f)));
        this.f[d] = e;
        fr(c);
        return d;
    };
    Kr.prototype.cancel = function(a) {
        var b = this.f[a];
        b && ((b.vc = !0), b.Xa && b.Xa.abort(), Lr(this, a));
    };
    function Lr(a, b) {
        var c = a.f[b];
        c && (c.sb ? (c.sb.M(), (c.sb = null)) : c.Xa && (c.Xa = null), delete a.f[b]);
    }
    Kr.prototype.F = function() {
        Kr.m.F.call(this);
        for (var a in this.f) this.cancel(a);
    };
    function Mr(a, b, c) {
        Ir.call(this, a, c);
        this.f = b.proxyIsSupported;
        this.g = b.proxySend;
        this.b = b.proxyCancel;
    }
    E(Mr, Ir);
    Mr.prototype.c = function() {
        return this.f();
    };
    Mr.prototype.send = function(a, b) {
        return this.g(this.a.toString(), a, b);
    };
    Mr.prototype.cancel = function(a) {
        this.b(a);
    };
    function Nr(a, b) {
        R.call(this);
        this.c = !0;
        this.b = a;
        this.a = b ? b : null;
    }
    E(Nr, R);
    ir(47504, Nr.prototype, {
        Ji: function() {
            br("te_afbr");
        }
    });
    function Or(a, b) {
        if (!a.c) return b;
        if (A(b) != Ga) a = [[b, 200]];
        else if (2 == b.length && A(b[0]) != Ga && A(b[1]) != Ga)
            a = [[b[0], 200, b[1]], [b[1], 200, b[1]]];
        else {
            a = [];
            for (var c = 0; c < b.length; ++c)
                A(b[c]) != Ga ? (a[c] = [b[c], 200]) : (a[c] = [b[c][0], 200, b[c][1]]);
        }
        return a;
    }
    Nr.prototype.g = function(a) {
        var b = this;
        return function(c) {
            if (c)
                try {
                    var d = c.indexOf("\x00");
                    0 <= d && (c = c.substr(0, d));
                    var e = JSON.parse(c);
                } catch (f) {
                    (e = null), b.Ji();
                }
            e ? a(Or(b, e), 200) : a([], 500);
        };
    };
    Nr.prototype.f = function(a) {
        var b = this;
        return function(c) {
            c ? a(Or(b, c), 200) : a([], 500);
        };
    };
    Nr.prototype.F = function() {
        Nr.m.F.call(this);
    };
    var kl = {
        0: "NO_ERROR",
        1: "UNKNOWN_ERROR",
        2: "JWT_TOKEN_CANNOT_PARSE",
        3: "JWT_TOKEN_MISS_PARAM",
        4: "JWT_TOKEN_INVALID_ISS",
        5: "JWT_TOKEN_INVALID",
        6: pa,
        7: "OUT_OF_QUOTA",
        8: pa
    };
    function Pr() {}
    Pr.prototype.b = ec();
    function Qr(a) {
        a = a.split(".");
        if (3 !== a.length) return !1;
        a = JSON.parse(sf(a[1]));
        return null == a || !a.exp || 1e3 * a.exp < D() ? !1 : !0;
    }
    function Rr(a) {
        this.a = a;
    }
    mc(Rr, Pr);
    Rr.prototype.b = function() {
        return Qr(this.a) ? il(this.a) : jl();
    };
    function Sr(a) {
        this.a = null;
        this.c = a;
    }
    mc(Sr, Pr);
    Sr.prototype.b = function() {
        if (null != this.a && Qr(this.a)) return il(this.a);
        this.a = null;
        return new dl(function(a, b) {
            var c = this;
            this.c(function(d) {
                c.a = d;
                Qr(c.a) ? a(d) : b(kl[5]);
            }, b);
        }, this);
    };
    function Tr(a, b, c, d, e, f) {
        R.call(this);
        var h;
        b ? (h = { client: b }) : (h = { anno: 3, client: Gq, format: "html", v: "1.0" });
        c && (h.sp = c);
        h.key = a;
        zq && (h.logld = "v" + zq);
        this.s = d || null;
        this.Vb = e || null;
        this.a = null;
        this.b = { wc: C(this.G, this), Hg: 300 };
        this.h = h;
        a = this.f = new Nr(h, f);
        b = Jq + Mq;
        this.g = a.a ? new Mr(b, a.a, { client: Gq }) : new Jr(b, { client: Gq }, "cb");
        a = this.f;
        if (a.a) {
            if (!a.a) throw Error("this.remoteApiProxyHandlers_ is null");
            a = [
                {
                    na: new Mr(Jq + Iq + ea, a.a, a.b),
                    wc: C(a.f, a),
                    Sd: 1900,
                    cf: 4294967295,
                    bf: -1,
                    uf: 0,
                    jd: !1
                }
            ];
        } else
            (b = Jq + Iq),
                (a = [
                    {
                        na: new Kr(b + ea, a.b),
                        wc: C(a.g, a),
                        Sd: 30720,
                        cf: 4294967295,
                        bf: -1,
                        uf: 0,
                        jd: !1
                    },
                    {
                        na: new Jr(b + ea, a.b, "cb", I && 7 >= df),
                        wc: C(a.f, a),
                        Sd: 1900,
                        cf: 4294967295,
                        bf: -1,
                        uf: 3,
                        jd: !0
                    }
                ]);
        this.o = new Ur(a);
        this.c = !1;
        for (b = 0; b < a.length; ++b) this.c = this.c || a[b].na.c();
        this.c || this.Ki();
    }
    E(Tr, R);
    ir(7361, Tr.prototype, {
        Ki: function() {
            br("te_au");
        }
    });
    Tr.prototype.G = function(a) {
        return function(b) {
            if (b)
                try {
                    var c = JSON.parse(b);
                } catch (d) {
                    c = null;
                }
            a((c && c[1]) || void 0);
        };
    };
    function Ur(a) {
        this.b = a;
    }
    Ur.prototype.start = function(a) {
        this.a = a;
        this.c = 0;
        Vr(this);
    };
    function Vr(a) {
        if (a.c >= a.b.length) a.a(null);
        else {
            var b = a.b[a.c++];
            b.fj
                ? Yq(
                      new Xq(
                          C(b.na.Ua, b.na),
                          C(function(c) {
                              c ? this.a(b) : Vr(this);
                          }, a),
                          b.fj
                      )
                  )
                : b.na.Ua()
                ? a.a(b)
                : Vr(a);
        }
    }
    Tr.prototype.l = function(a) {
        this.B ||
            ((this.B = !0),
            this.o.start(
                C(function(b) {
                    b && ((this.a = b), (this.b.na = b.na));
                    a();
                }, this)
            ));
    };
    Tr.prototype.Ua = function() {
        return null !== this.a && null !== this.a.na && this.a.na.Ua();
    };
    Tr.prototype.translate = function(a, b, c, d, e, f, h, k) {
        var l = this,
            m = this.a.wc(a),
            n = { q: b, sl: c, tl: d };
        (this.h.sp && 0 == this.h.sp.indexOf("nmt")) || (n.sp = "nmt");
        n.tc = e;
        f && (n.ctt = 1);
        h && (n.dom = 1);
        k && (n.sr = 1);
        n[Dp()] = Bp(b.join(""), Hq);
        return this.s
            ? this.s.b().then(
                  function(r) {
                      null != r && ((n.jwtt = r), (n.rurl = location.hostname));
                      return l.a.na.send(n, C(Wr(m), l));
                  },
                  function(r) {
                      r && l.Vb && l.Vb(r);
                  }
              )
            : this.a.na.send(n, m);
    };
    function Wr(a) {
        return function(b, c) {
            if (c && this.Vb) {
                try {
                    var d = JSON.parse(c).error_code;
                } catch (e) {
                    d = null;
                }
                c = kl[1];
                this.Vb(null == d ? c : kl[d] || c);
            }
            a(b);
        };
    }
    function Xr(a, b) {
        b instanceof dl
            ? b.then(function(c) {
                  a.a.na.cancel(c);
              })
            : a.a.na.cancel(b);
    }
    Tr.prototype.F = function() {
        Tr.m.F.call(this);
        this.a && (this.a.na.M(), (this.a.na = null));
        this.b.na = null;
        this.g.M();
        this.g = null;
    };
    var Yr = Sq([
            "A",
            "ABBR",
            "ACRONYM",
            "B",
            "BASEFONT",
            "BDO",
            "BIG",
            "CITE",
            "DFN",
            "EM",
            "FONT",
            "I",
            oa,
            "NOBR",
            "LABEL",
            "Q",
            "S",
            "SMALL",
            ua,
            "STRIKE",
            "STRONG",
            "SUB",
            "SUP",
            va,
            "TT",
            "U",
            "VAR"
        ]),
        Zr = Sq([
            "APPLET",
            "AREA",
            "BASE",
            "FRAME",
            "FRAMESET",
            "HR",
            "LINK",
            "META",
            "NOFRAMES",
            "NOSCRIPT",
            oa,
            va,
            wa
        ]),
        $r = Sq(["BR", "CODE", "IMG", "KBD", "MAP", "OBJECT", "PARAM", ta, "STYLE", "WBR", "svg"]),
        as = Sq(["submit", Ma]);
    function bs(a, b) {
        this.a = new hn(a, !1, b, 3 == a.nodeType ? 0 : 1, 1);
        this.c = I ? [] : null;
        for (this.b = []; (a = a.parentNode); ) cs(this, a, !0);
        this.b.push(!1);
        this.b.reverse();
        for (a = 1; a < this.b.length; ++a) null == this.b[a] && (this.b[a] = this.b[a - 1]);
        this.f = !1;
    }
    ir(52754, bs.prototype, { Qi: 1 });
    function cs(a, b, c) {
        var d = ((b.style && b.style.whiteSpace) || "").substring(0, 3);
        "pre" == d || (!d && "PRE" == b.tagName)
            ? a.b.push(!0)
            : d && "pre" != d
            ? a.b.push(!1)
            : c
            ? a.b.push(null)
            : a.b.push(a.b[a.b.length - 1]);
    }
    bs.prototype.node = function() {
        return this.a.node;
    };
    bs.prototype.depth = function() {
        return this.a.depth;
    };
    bs.prototype.next = function() {
        try {
            this.c && 0 < this.c.length && -1 == this.a.c && this.c.length--,
                -1 == this.a.c && this.b.length--,
                this.c && 0 < this.c.length && 1 != this.a.c && !this.a.node.nextSibling
                    ? jn(this.a, this.c[this.c.length - 1], -1, this.a.depth - 1)
                    : (this.a.next(), this.c && 1 == this.a.c && this.c.push(this.a.node)),
                1 == this.a.c && this.a.o && cs(this, this.a.node);
        } catch (a) {
            a != vj && this.Qi(a), (this.f = !0);
        }
    };
    function ds() {
        return "[msg_undefined]";
    }
    var Z = {};
    (function() {
        function a(b) {
            return function() {
                return b;
            };
        }
        Z = {
            Mf: a(0),
            Hf: a(1),
            If: a(2),
            ek: a(3),
            wh: a(4),
            Jf: a(5),
            nh: a(45),
            oh: a(6),
            rh: a(7),
            Xc: a(8),
            xh: a(9),
            sk: a(10),
            Bh: a(11),
            sh: a(12),
            mk: a(13),
            uh: a(14),
            lk: a(15),
            th: a(16),
            uk: a(17),
            yh: a(18),
            Hj: a(19),
            dk: a(20),
            mh: a(21),
            vh: a(22),
            jk: a(23),
            ik: a(24),
            gk: a(25),
            tk: a(26),
            rk: a(27),
            hk: a(28),
            ph: a(29),
            zh: a(30),
            Gj: a(32),
            Fj: a(33),
            Ah: a(34),
            Sj: a(35),
            Mj: a(36),
            Rj: a(37),
            Lf: a(38),
            Xj: a(39),
            Gf: a(40),
            qh: a(41),
            Kf: a(46)
        };
    })();
    function es(a) {
        return lk('<span id="' + X(a.id) + '"></span>');
    }
    function fs(a) {
        var b = a.id,
            c = a.Qg;
        return lk(kk(a.Rg) + '<div id="' + X(b) + '"></div>' + kk(c));
    }
    function gs() {
        var a = I && !L("7.0");
        return lk(
            '<span style="white-space:nowrap"><a class="goog-logo-link" href="' +
                X(sk(tb)) +
                '" target="_blank">' +
                (a
                    ? "<span style=\"display:inline-block;vertical-align:middle;height:15px; width:51px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader( src='" +
                      "https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png".replace(
                          Gk,
                          Ek
                      ) +
                      "',sizingMethod='scale');\"></span>"
                    : '<img src="' +
                      X(
                          xk(
                              "https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png"
                          )
                      ) +
                      '" width="37px" height="14px" style="padding-right: 3px" alt="Google ' +
                      X(Z.Xc) +
                      '">') +
                kk(Z.Xc) +
                "</a></span>"
        );
    }
    function hs(a) {
        var b = a.Ti;
        return lk(
            '<div id="goog-gt-tt" class="skiptranslate" dir="' +
                X(a.dir) +
                '"><div style="padding: 8px;"><div><div class="logo"><img src="' +
                X(xk(b)) +
                '" width="20" height="20" alt="Google ' +
                X(Z.Xc) +
                '"/></div></div></div><div class="top" style="padding: 8px; float: left; width: 100%;"><h1 class="title gray">' +
                kk(Z.qh) +
                '</h1></div><div class="middle" style="padding: 8px;"><div class="original-text"></div></div><div class="bottom" style="padding: 8px;"><div class="activity-links"></div><div class="started-activity-container"><hr style="color: #CCC; background-color: #CCC; height: 1px; border: none;"/><div class="activity-root"></div></div></div><div class="status-message"></div></div>'
        );
    }
    function is(a) {
        var b = a.method,
            c = a.Qh,
            d = a.dir;
        a =
            '<div class="translate-form"><div class="form-message"></div><form class="activity-form" action="' +
            X(sk(a.Eh)) +
            '" method="' +
            X(b) +
            '"><div class="form-buttons" style="text-align:' +
            ((d && d.Fi && "rtl".Fi
              ? d.Ib !== "rtl".Ib
                  ? 0
                  : d.toString() === "rtl".toString()
              : d == Qb)
                ? "right"
                : "left") +
            '"><input class="activity-submit" type="button" value="' +
            X(Z.vh) +
            '"><input class="activity-cancel" type="button" value="' +
            X(Z.Hf) +
            '"></div><div class="parameters"><input type="hidden" name="gtrans"/><input type="hidden" name="utrans"/><input type="hidden" name="hl"/><input type="hidden" name="text"/><input type="hidden" name="langpair"/><input type="hidden" name="oe" value="UTF-8"/>';
        b = c.length;
        for (d = 0; d < b; d++) a += '<input type="hidden" name="' + X(c[d]) + '"/>';
        return lk(a + "</div></form></div>");
    }
    function js() {
        return lk(
            '<div><textarea class="contribute-original-text"></textarea><div class="activity-form-container"></div></div>'
        );
    }
    function ks(a) {
        return lk(
            '<div><span class="alt-translated-text"></span><div class="alt-helper-text">' +
                kk(a.Bi) +
                '</div><div class="activity-form-container"></div></div>'
        );
    }
    function ls() {
        return lk(
            '<div class="goog-te-spinner-pos"><div class="goog-te-spinner-animation"><svg xmlns="http://www.w3.org/2000/svg" class="goog-te-spinner" width="96px" height="96px" viewBox="0 0 66 66"><circle class="goog-te-spinner-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"/></svg></div></div>'
        );
    }
    function ms(a) {
        T.call(this);
        a = a || {};
        this.id = a.id || qi(this);
        this.Ze = a.Ze || "";
        this.Qd = a.Qd || null;
        this.Rd = a.Rd || null;
        this.dd = a.dd || !1;
        this.className = a.className || null;
        this.c = null;
    }
    E(ms, T);
    ms.prototype.mc = fc("c");
    ms.prototype.Ub = function() {
        if (!this.U) throw Error("Activity must be rendered before it can be resumed.");
        if (!this.c) throw Error("Activity must have a tooltip instance to be resumed");
    };
    ms.prototype.Bb = ec();
    ms.prototype.M = function() {
        this.ub || (ms.m.M.call(this), delete this.Rd);
    };
    function ns() {
        li.call(this);
        this.c = "closure_frame" + os++;
        this.b = [];
        ps[this.c] = this;
    }
    var qs;
    E(ns, li);
    var ps = {},
        os = 0;
    function rs(a, b) {
        var c = Uf(a);
        Fj(b, function(d, e) {
            B(d) || (d = [d]);
            Gc(d, function(f) {
                f = c.D(oa, { type: qb, name: e, value: f });
                a.appendChild(f);
            });
        });
    }
    x = ns.prototype;
    x.sa = null;
    x.Y = null;
    x.ja = null;
    x.Pb = null;
    x.Xi = 0;
    x.ma = !1;
    x.xc = !1;
    x.$d = !1;
    x.rb = null;
    x.Xe = null;
    x.Ha = 0;
    x.Ob = null;
    x.send = function(a, b, c, d) {
        if (this.ma) throw Error(ya);
        this.rb = a = new Ij(a);
        b = b ? b.toUpperCase() : "GET";
        c &&
            ((c =
                Math.floor(2147483648 * Math.random()).toString(36) +
                Math.abs(Math.floor(2147483648 * Math.random()) ^ D()).toString(36)),
            a.a.set("zx", c));
        qs ||
            ((qs = hg("FORM")),
            (qs.acceptCharset = "utf-8"),
            (c = qs.style),
            (c.position = Ba),
            (c.visibility = qb),
            (c.top = c.left = "-10px"),
            (c.width = c.height = "10px"),
            (c.overflow = qb),
            document.body.appendChild(qs));
        this.Y = qs;
        "GET" == b && rs(this.Y, a.a);
        d && rs(this.Y, d);
        d = this.Y;
        a = a.toString();
        Gr();
        ue(d, new Jd(Kd, a));
        this.Y.method = b;
        ss(this);
        ts(this);
    };
    function us(a, b) {
        if (a.ma) throw Error(ya);
        var c = new Ij(b.action);
        a.rb = c;
        a.Y = b;
        ue(a.Y, c.toString());
        ss(a);
    }
    x.abort = function(a) {
        this.ma &&
            (bi(vs(this)),
            (this.$d = this.ma = this.xc = !1),
            (this.Ha = a || 7),
            this.dispatchEvent("abort"),
            ws(this));
    };
    x.F = function() {
        this.ma && this.abort();
        ns.m.F.call(this);
        this.ja && xs(this);
        ts(this);
        delete this.f;
        this.rb = this.Xe = this.Y = null;
        this.Ha = 0;
        delete ps[this.c];
    };
    x.Md = u("xc");
    x.Qc = u("$d");
    x.fc = u("ma");
    x.Lb = u("Xe");
    x.Ae = u("rb");
    x.ze = u("Ha");
    function ss(a) {
        a.ma = !0;
        a.xc = !1;
        a.Ha = 0;
        a.Pb = a.c + "_" + (a.Xi++).toString(36);
        a.ja = Uf(a.Y).D(na, { name: a.Pb, id: a.Pb });
        I && 7 > Number(df) && ue(a.ja, new Jd(Kd, Bd(new yd(zd, 'javascript:""'))));
        var b = a.ja.style;
        b.visibility = qb;
        b.width = b.height = "10px";
        b.display = q;
        K
            ? (b.marginTop = b.marginLeft = "-10px")
            : ((b.position = Ba), (b.top = b.left = "-10px"));
        if (I && !L("11")) {
            a.Y.target = a.Pb || "";
            Uf(a.Y).a.body.appendChild(a.ja);
            S(a.ja, Pb, a.kf, !1, a);
            try {
                (a.a = !1), a.Y.submit();
            } catch (w) {
                $h(a.ja, Pb, a.kf, !1, a), ys(a, 1);
            }
        } else {
            Uf(a.Y).a.body.appendChild(a.ja);
            b = a.Pb + "_inner";
            var c = Cg(a.ja);
            if (document.baseURI) {
                var d = Ce(b);
                d =
                    '<head><base href="' +
                    Ce(document.baseURI) +
                    '"></head><body><iframe id="' +
                    d +
                    '" name="' +
                    d +
                    '"></iframe>';
                d = oe(d, null);
            } else
                (d = Ce(b)),
                    (d = oe('<body><iframe id="' + d + '" name="' + d + '"></iframe>', null));
            Oe && !K ? te(c.documentElement, d) : c.write(ge(d));
            S(c.getElementById(b), zb, a.Ud, !1, a);
            var e = Xf(va, a.Y);
            d = 0;
            for (var f = e.length; d < f; d++) {
                var h = e[d].value;
                Mg(e[d]) != h && (Eg(e[d], h), (e[d].value = h));
            }
            e = c.importNode(a.Y, !0);
            e.target = b;
            e.action = a.Y.action;
            c.body.appendChild(e);
            h = Xf("SELECT", a.Y);
            var k = Xf("SELECT", e);
            d = 0;
            for (f = h.length; d < f; d++)
                for (var l = Xf(qa, h[d]), m = Xf(qa, k[d]), n = 0, r = l.length; n < r; n++)
                    m[n].selected = l[n].selected;
            h = Xf(oa, a.Y);
            k = Xf(oa, e);
            d = 0;
            for (f = h.length; d < f; d++)
                if ("file" == h[d].type && h[d].value != k[d].value) {
                    a.Y.target = b;
                    e = a.Y;
                    break;
                }
            try {
                (a.a = !1), e.submit(), c.close(), J && wl(a.gh, 250, a);
            } catch (w) {
                $h(c.getElementById(b), zb, a.Ud, !1, a), c.close(), ys(a, 2);
            }
        }
    }
    x.kf = function() {
        if (this.ja.readyState == Ua) {
            $h(this.ja, Pb, this.kf, !1, this);
            try {
                var a = Cg(this.ja);
                if (I && "about:blank" == a.location && !navigator.onLine) {
                    ys(this, 9);
                    return;
                }
            } catch (b) {
                ys(this, 1);
                return;
            }
            zs(this, a);
        }
    };
    x.Ud = function() {
        if (!Oe || K || "about:blank" != (this.ja ? Cg(vs(this)) : null).location) {
            $h(vs(this), zb, this.Ud, !1, this);
            try {
                zs(this, this.ja ? Cg(vs(this)) : null);
            } catch (a) {
                ys(this, 1);
            }
        }
    };
    function zs(a, b) {
        a.xc = !0;
        a.ma = !1;
        try {
            var c = b.body;
            a.Xe = c.textContent || c.innerText;
        } catch (e) {
            var d = 1;
        }
        d || typeof a.f != p || ((b = a.f(b)) && (d = 4));
        d
            ? ys(a, d)
            : ((a.$d = !0), (a.Ha = 0), a.dispatchEvent(Ua), a.dispatchEvent("success"), ws(a));
    }
    function ys(a, b) {
        a.a ||
            ((a.$d = !1),
            (a.ma = !1),
            (a.xc = !0),
            (a.Ha = b),
            a.dispatchEvent(Ua),
            a.dispatchEvent("error"),
            ws(a),
            (a.a = !0));
    }
    function ws(a) {
        xs(a);
        ts(a);
        a.Y = null;
        a.dispatchEvent(Ob);
    }
    function xs(a) {
        var b = a.ja;
        b && ((b.onreadystatechange = null), (b.onload = null), (b.onerror = null), a.b.push(b));
        a.Ob && (xl(a.Ob), (a.Ob = null));
        J || (Oe && !K) ? (a.Ob = wl(a.Wf, 2e3, a)) : a.Wf();
        a.ja = null;
        a.Pb = null;
    }
    x.Wf = function() {
        this.Ob && (xl(this.Ob), (this.Ob = null));
        for (; 0 != this.b.length; ) {
            var a = this.b.pop();
            sg(a);
        }
    };
    function ts(a) {
        a.Y && a.Y == qs && pg(a.Y);
    }
    function vs(a) {
        return a.ja ? (I && !L("11") ? a.ja : Cg(a.ja).getElementById(a.Pb + "_inner")) : null;
    }
    x.gh = function() {
        if (this.ma) {
            var a = this.ja ? Cg(vs(this)) : null;
            a && !Me(a, "documentUri")
                ? ($h(vs(this), zb, this.Ud, !1, this),
                  navigator.onLine ? ys(this, 3) : ys(this, 9))
                : wl(this.gh, 250, this);
        }
    };
    function As(a, b) {
        T.call(this);
        this.l = a || "";
        this.f = null;
        this.h = [];
        this.a = null;
        this.o = b || "GET";
        this.c = this.g = null;
    }
    E(As, T);
    x = As.prototype;
    x.D = function() {
        var a = { Eh: this.l, method: this.o, Qh: this.h, dir: xd.test(Aq) ? Qb : "ltr" };
        this.S(zl(is, a));
    };
    x.S = function(a) {
        this.A = a;
        this.a = si(this, "activity-form");
        a = si(this, "activity-submit");
        this.c = new qj("");
        wi(this.c, a);
        a = si(this, "activity-cancel");
        this.f = new qj("");
        wi(this.f, a);
    };
    x.O = function() {
        var a = U(this);
        a.w(this.c, Ca, C(this.rj, this));
        a.w(this.f, Ca, C(this.dispatchEvent, this, Na));
    };
    x.rj = function() {
        var a = !0;
        this.g && (a = this.g());
        a &&
            ((a = new ns()),
            S(a, "success", function() {
                this.dispatchEvent("successful");
            }),
            S(a, "error", function() {
                this.dispatchEvent("failed");
            }),
            us(a, this.a));
        this.dispatchEvent(Ub);
    };
    function Bs(a, b) {
        for (var c in b) a.a[c] && (a.a[c].value = b[c]);
    }
    function Cs(a, b) {
        return a.a[b] ? a.a[b].value : "";
    }
    x.F = function() {
        this.c = this.a = this.f = null;
        As.m.F.call(this);
    };
    function Ds(a, b) {
        a.g = b;
    }
    function Es(a, b) {
        ms.call(this, a);
        this.f = null;
        this.o = b || {};
        this.h = new cn();
        this.l = this.a = null;
        this.g = new Tr((a || {}).$a || "", iq);
        this.g.f.c = !1;
    }
    E(Es, ms);
    var iq = Gq.replace("_", "-") + "-alt";
    x = Es.prototype;
    x.mc = function(a) {
        Es.m.mc.call(this, a);
        this.g.l(C(this.Ub, this));
    };
    x.Ub = function() {
        Es.m.Ub.call(this);
        var a = this.c.J,
            b = this.c.o;
        if (a && b) {
            Eg(this.l, a);
            var c = this.h;
            c.A = b;
            qg(c.a, c.A);
            dn(c);
            Q(this.h.a, !0);
            b = this.c.cb();
            c = this.c.oa();
            if (this.g.Ua() && b && c) {
                var d = this.c.Nc(),
                    e = C(this.aj, this);
                this.g && this.g.translate(e, [d], b, c, 0, !1);
                Bs(this.a, { gtrans: a, text: this.c.Nc(), hl: Aq, langpair: b + "|" + c });
                Bs(this.a, this.o);
                Bs(this.a, { client: iq });
            }
            this.dispatchEvent(Ob);
        }
    };
    x.D = function() {
        this.S(zl(ks, { Bi: Z.Gf }));
    };
    x.S = function(a) {
        this.A = a;
        this.l = si(this, "alt-translated-text");
        var b = si(this, Ea);
        this.a = new As(Qq, sa);
        this.a.h = id(this.o);
        Ds(
            this.a,
            C(function() {
                Bs(this.a, { utrans: sq(this.f) });
                return Cs(this.a, "utrans") != Cs(this.a, "gtrans");
            }, this)
        );
        this.a.fa(b);
        lp = Z.Ah;
        ap = Z.Gf;
        this.f = new eq(void 0, !0, a);
        fq(this.f, this.h);
        gq(this.f);
        hq(this.f);
        wi(this.f, this.l);
    };
    x.O = function() {
        Es.m.O.call(this);
        var a = U(this);
        a.w(
            this.a,
            Na,
            C(function() {
                vq(this.f);
                this.dispatchEvent(Na);
            }, this)
        );
        a.w(
            this.a,
            Ub,
            C(function() {
                var b = sq(this.f);
                this.c.J = b && Sc(b);
                this.dispatchEvent(Ub);
                b = this.c.xa();
                Eg(b.j(), Z.Lf);
            }, this)
        );
    };
    x.aj = function(a) {
        a && jq(this.f, a);
    };
    x.Bb = function() {
        Q(this.h.a, !1);
    };
    x.F = function() {
        this.f && this.f.M();
        this.l = this.h = this.f = null;
        this.g && this.g.M();
        this.g = null;
        this.a && this.a.M();
        this.a = null;
        Es.m.F.call(this);
    };
    function Fs(a, b) {
        ms.call(this, a);
        this.h = !1;
        this.g = b || {};
        this.f = null;
    }
    E(Fs, ms);
    x = Fs.prototype;
    x.mc = function(a) {
        Fs.m.mc.call(this, a);
        U(this).w(this.f.j(), xb, C(this.c.Tc, this.c, !1));
        this.h = this.c.uc;
        this.Ub();
    };
    x.Ub = function() {
        Fs.m.Ub.call(this);
        this.f.Nb(this.c.J);
        var a = this.c.cb(),
            b = this.c.oa();
        a &&
            b &&
            (Bs(this.a, { gtrans: this.c.J, text: this.c.Nc(), hl: Aq, langpair: a + "|" + b }),
            Bs(this.a, this.g));
        this.dispatchEvent(Ob);
        this.f.j().focus();
    };
    x.Bb = function() {
        this.c.Tc(this.h);
    };
    x.D = function() {
        this.S(zl(js));
    };
    x.S = function(a) {
        this.A = a;
        a = si(this, "contribute-original-text");
        this.f = new np("");
        wi(this.f, a);
        tp(this.f);
        rp(this.f);
        a = si(this, Ea);
        this.a = new As(Qq, sa);
        this.a.h = id(this.g);
        Ds(
            this.a,
            C(function() {
                Bs(this.a, { utrans: Sc(this.f.Aa()) });
                return Cs(this.a, "utrans") != Cs(this.a, "gtrans");
            }, this)
        );
        this.a.fa(a);
    };
    x.O = function() {
        Fs.m.O.call(this);
        var a = U(this);
        a.w(
            this.a,
            Na,
            C(function() {
                this.dispatchEvent(Na);
            }, this)
        );
        a.w(
            this.a,
            Ub,
            C(function() {
                var b = this.f.Aa();
                this.c.J = b && Sc(b);
                this.dispatchEvent(Ub);
                b = this.c.xa();
                Eg(b.j(), Z.Lf);
            }, this)
        );
    };
    x.F = function() {
        this.f && this.f.M();
        this.f = null;
        this.a && this.a.M();
        this.a = null;
        Fs.m.F.call(this);
    };
    function Gs(a) {
        li.call(this);
        this.h = a;
        this.g = {};
        this.c = new fi(this);
        this.f = null;
    }
    E(Gs, li);
    Gs.prototype.eh = ec();
    Gs.prototype.fh = ec();
    Gs.prototype.F = function() {
        this.c.M();
        this.c = null;
    };
    function Hs(a, b, c) {
        if ((b = a.h.c[b])) {
            c = c || "undefined" == typeof c;
            for (var d = 0; d < b.Ba.length; ++d) b.Ba[d] && a.Ag(b.Ba[d], c);
        }
    }
    Gs.prototype.Ag = function(a, b) {
        P(a, "backgroundColor", b ? "#E6ECF9" : "");
        P(a, "color", b ? "#000" : "");
    };
    var ld = {},
        Is = null;
    function Js(a) {
        a = tc(a);
        delete ld[a];
        kd() && Is && Is.stop();
    }
    function Ks() {
        Is ||
            (Is = new yl(function() {
                Ls();
            }, 20));
        var a = Is;
        a.fc() || a.start();
    }
    function Ls() {
        var a = D();
        gd(ld, function(b) {
            Ms(b, a);
        });
        kd() || Ks();
    }
    function Ns(a, b, c, d) {
        Um.call(this);
        if (!B(a) || !B(b)) throw Error("Start and end parameters must be arrays");
        if (a.length != b.length) throw Error("Start and end points must be the same length");
        this.g = a;
        this.B = b;
        this.duration = c;
        this.o = d;
        this.coords = [];
        this.progress = 0;
    }
    E(Ns, Um);
    x = Ns.prototype;
    x.play = function(a) {
        if (a || 0 == this.a) (this.progress = 0), (this.coords = this.g);
        else if (1 == this.a) return !1;
        Js(this);
        this.b = a = D();
        -1 == this.a && (this.b -= this.duration * this.progress);
        this.endTime = this.b + this.duration;
        this.progress || this.c();
        this.Qa("play");
        -1 == this.a && this.Qa("resume");
        this.a = 1;
        var b = tc(this);
        b in ld || (ld[b] = this);
        Ks();
        Ms(this, a);
        return !0;
    };
    x.stop = function(a) {
        Js(this);
        this.a = 0;
        a && (this.progress = 1);
        Os(this, this.progress);
        this.Bb();
        this.f();
    };
    x.wf = function(a) {
        this.progress = a;
        1 == this.a &&
            ((this.b = D() - this.duration * this.progress),
            (this.endTime = this.b + this.duration));
    };
    x.F = function() {
        0 == this.a || this.stop(!1);
        this.Qa("destroy");
        Ns.m.F.call(this);
    };
    function Ms(a, b) {
        b < a.b && ((a.endTime = b + a.endTime - a.b), (a.b = b));
        a.progress = (b - a.b) / (a.endTime - a.b);
        1 < a.progress && (a.progress = 1);
        Os(a, a.progress);
        1 == a.progress ? ((a.a = 0), Js(a), a.Qa($a), a.f()) : 1 == a.a && a.gf();
    }
    function Os(a, b) {
        rc(a.o) && (b = a.o(b));
        a.coords = Array(a.g.length);
        for (var c = 0; c < a.g.length; c++) a.coords[c] = (a.B[c] - a.g[c]) * b + a.g[c];
    }
    x.gf = function() {
        this.Qa("animate");
    };
    x.Qa = function(a) {
        this.dispatchEvent(new Ps(a, this));
    };
    function Ps(a, b) {
        Bh.call(this, a);
        this.coords = b.coords;
        this.x = b.coords[0];
        this.y = b.coords[1];
        this.duration = b.duration;
        this.progress = b.progress;
    }
    E(Ps, Bh);
    function Qs(a, b, c, d, e) {
        Ns.call(this, b, c, d, e);
        this.h = a;
    }
    E(Qs, Ns);
    Qs.prototype.s = z;
    Qs.prototype.gf = function() {
        this.s();
        Qs.m.gf.call(this);
    };
    Qs.prototype.f = function() {
        this.s();
        Qs.m.f.call(this);
    };
    Qs.prototype.c = function() {
        this.s();
        Qs.m.c.call(this);
    };
    function Rs(a, b, c, d, e) {
        typeof b === Fb && (b = [b]);
        typeof c === Fb && (c = [c]);
        Qs.call(this, a, b, c, d, e);
        if (1 != b.length || 1 != c.length) throw Error("Start and end points must be 1D");
        this.l = -1;
    }
    E(Rs, Qs);
    var Ss = 1 / 1024;
    Rs.prototype.s = function() {
        var a = this.coords[0];
        if (Math.abs(a - this.l) >= Ss) {
            var b = this.h.style;
            "opacity" in b
                ? (b.opacity = a)
                : "MozOpacity" in b
                ? (b.MozOpacity = a)
                : "filter" in b &&
                  (b.filter = "" === a ? "" : "alpha(opacity=" + 100 * Number(a) + ")");
            this.l = a;
        }
    };
    Rs.prototype.c = function() {
        this.l = -1;
        Rs.m.c.call(this);
    };
    Rs.prototype.f = function() {
        this.l = -1;
        Rs.m.f.call(this);
    };
    function Ts(a, b, c) {
        Rs.call(this, a, 1, 0, b, c);
    }
    E(Ts, Rs);
    Ts.prototype.c = function() {
        this.h.style.display = "";
        Ts.m.c.call(this);
    };
    Ts.prototype.f = function() {
        this.h.style.display = q;
        Ts.m.f.call(this);
    };
    function Us(a, b, c) {
        Rs.call(this, a, 0, 1, b, c);
    }
    E(Us, Rs);
    Us.prototype.c = function() {
        this.h.style.display = "";
        Us.m.c.call(this);
    };
    function Vs() {
        T.call(this);
        this.a = null;
    }
    E(Vs, T);
    x = Vs.prototype;
    x.D = function() {
        this.S(this.b.D(g, { class: Tb }));
    };
    x.S = function(a) {
        this.A = a;
        a.style.display = q;
    };
    function Ws(a) {
        var b = c;
        var c = C(function() {
            Eg(this.j(), "");
            b && b();
        }, a);
        c = C(a.Ci, a, 750, c);
        Xs(a, c);
    }
    function Ys(a) {
        a.a && (a.a.stop(!0), (a.a = null));
        Eg(a.j(), "");
        a.I(!1);
    }
    function Xs(a, b) {
        a.a = new Us(a.j(), 750);
        U(a).Ab(
            a.a,
            "begin",
            C(function() {
                this.j().style.display = "block";
            }, a)
        );
        U(a).Ab(
            a.a,
            $a,
            C(function() {
                this.a = null;
                window.setTimeout(b, 2e3);
            }, a)
        );
        a.a.play();
    }
    x.Ci = function(a, b) {
        this.isVisible() &&
            ((this.a = new Ts(this.j(), a)),
            U(this).Ab(
                this.a,
                $a,
                C(function() {
                    b && b();
                }, this)
            ),
            this.a.play());
    };
    x.I = function(a) {
        this.j().style.display = a ? "block" : q;
        this.j().style.opacity = a ? "1" : "0";
    };
    x.isVisible = function() {
        return this.j().style.display !== q && "0" !== this.j().style.opacity;
    };
    function Zs() {
        No.call(this);
        this.P = {};
        this.jb = {};
        this.K = null;
        this.Yc = !1;
        this.tb = this.f = this.H = null;
        this.W = {};
        this.l = new fi(this);
        this.o = this.c = this.g = this.Ya = this.a = this.J = this.ra = null;
        this.C = !0;
        this.Za = [];
    }
    E(Zs, No);
    x = Zs.prototype;
    x.fa = function() {
        this.C = !1;
        var a = xd.test(Aq) ? Qb : "ltr";
        this.bc(
            zl(hs, {
                Ti: "https://www.gstatic.com/images/branding/product/1x/translate_24dp.png",
                yk: vb,
                Ak: Lq,
                dir: a
            })
        );
        this.className += " skiptranslate";
        this.j() &&
            this.K &&
            this.Ya &&
            this.g.j() &&
            this.H &&
            this.o &&
            (this.l.w(window, "resize", C(this.ob, this)),
            this.l.w(this, rb, C(this.cj, this)),
            this.Za.length && (this.he.apply(this, this.Za), (this.Za = [])));
    };
    x.he = function(a) {
        for (var b = [], c = 0; c < arguments.length; ++c) {
            var d = arguments[c];
            if (d)
                if (this.K || d.Rd) {
                    var e = d;
                    var f = hg(ua, { class: e.className || "activity-link" });
                    Eg(f, e.Ze || "");
                    e = f;
                    b.push(e);
                    og(d.Rd || this.K, e);
                    d.mc &&
                        d.Bb &&
                        ((f = C(this.Wh, this, d)),
                        this.l.w(e, Sa, f),
                        d.Qd && this.l.w(this.H, d.Qd, f));
                    d.id = d.id || qi(d);
                    this.P[d.id] && this.Sg(d);
                    this.P[d.id] = d;
                    this.jb[d.id] = e;
                } else this.Za.push(d);
        }
        return b;
    };
    x.Sg = function(a) {
        for (var b = 0; b < arguments.length; ++b) {
            var c =
                    typeof arguments[b] === t || arguments[b] instanceof String
                        ? arguments[b]
                        : arguments[b].id,
                d = this.P[c],
                e = this.jb[c];
            d &&
                e &&
                (this.f && this.f.id === c && this.pe(),
                this.l.ba(d, [Ub, Na]),
                d.M(),
                this.W[c] && delete this.W[c],
                delete this.P[c],
                delete this.jb[c],
                sg(e));
        }
    };
    x.Wh = function(a) {
        if (this.H) {
            a != this.f &&
                this.f &&
                (Ys(this.g),
                this.f.Bb.call(this.f),
                this.f.j() && (this.f.j().style.display = q),
                $s(this, !1),
                (this.f = null));
            $s(this, !0);
            Ys(this.g);
            this.f = a;
            if (this.W[a.id]) {
                var b = this.W[a.id];
                var c = a.Ub;
            } else
                a.fa(),
                    (b = a.j()),
                    (c = a.mc),
                    this.l.w(a, [Ub, Na], C(this.pe, this)),
                    a.dd && (this.W[a.id] = b);
            og(this.H, b);
            c.call(a, this);
            a = new Us(b, 100);
            this.l.Ab(a, $a, C(this.ob, this, !0, !0));
            a.play();
        }
    };
    x.pe = function() {
        if (this.f)
            if ((Ys(this.g), this.f.Bb.call(this.f), this.f.j())) {
                var a = new Ts(this.f.j(), 100);
                this.l.Ab(
                    a,
                    $a,
                    C(function() {
                        sg(this.f.j());
                        this.f = null;
                        $s(this, !1);
                        Kg(this.g.j()) && (Ws(this.g), this.ob(!0, !0));
                    }, this)
                );
                a.play();
            } else $s(this, !1), (this.f = null);
    };
    x.df = function(a, b) {
        this.tb = a;
        Zs.m.df.call(this, a, b);
        this.j().style.display = "block";
    };
    x.Ke = function(a) {
        if (!this.C) {
            var b = Wo(this, a.target);
            this.za = b;
            this.Yb();
            b != this.b ? ((this.b = b), Xo(this, b), Yo(this), Vo(this, a)) : Xo(this, b);
        }
    };
    x.cj = function() {
        Ys(this.g);
        this.Yc && this.pe();
    };
    x.F = function() {
        for (var a in this.P) this.Sg(a);
        this.l && this.l.M();
        this.l = null;
        this.g && this.g.M();
        this.o = this.Ya = this.tb = this.H = this.K = this.g = null;
        Zs.m.F.call(this);
    };
    function $s(a, b) {
        a.Yc = b;
        a.C = b;
        if (a.C) {
            var c = a.j();
            a.ra = new N(c.offsetLeft, c.offsetTop);
        } else
            a.ra &&
                (null != (a.s || null) && ((a.s || null).a = a.ra), Vg(a.j(), a.ra), (a.ra = null));
        a.K.style.display = b ? q : "inline-block";
        a.Ya.style.display = b ? "inline-block" : q;
    }
    x.Tc = function(a) {
        this.isVisible()
            ? ((this.uc = a),
              (this.uc ? this.h.w : this.h.ba).call(this.h, O(this.j()), Ab, this.hf, !0))
            : Zs.m.Tc.call(this, a);
    };
    x.bc = function(a) {
        Zs.m.bc.call(this, a);
        if (a) {
            this.K = $f("activity-links", a);
            var b = $f(Tb, a);
            b && ((this.g = new Vs()), wi(this.g, b));
            this.Ya = $f("started-activity-container", a);
            this.H = $f("activity-root", a);
            this.o = $f("original-text", a);
        }
    };
    x.ob = function(a, b) {
        var c = ah(document.body).y;
        if (this.s) {
            (this.s || null).a.y += c;
            Zs.m.ob.call(this);
            var d = parseInt(this.j().style.left, 10);
            a = parseInt(this.j().style.top, 10) - (a ? 0 : c);
            b && ((b = this.af || {}), (a -= b.top || 10), (d -= b.left || 10));
            a -= c;
            (this.s || null).a.y = a;
            (this.s || null).a.x = d;
            Vg(this.j(), new N(d, a));
        }
    };
    x.I = function(a) {
        Zs.m.I.call(this, a);
    };
    x.Tb = fc("a");
    x.ua = fc("c");
    x.Pa = function(a) {
        a = a ? Sc(a) : "";
        this.o ? Eg(this.o, a) : Zs.m.Pa.call(this, a);
    };
    x.cb = u("a");
    x.xa = u("g");
    x.oa = u("c");
    x.Nc = function() {
        return this.o ? Kg(this.o) : Zs.m.Nc.call(this);
    };
    x.cc = function(a) {
        this.C || Zs.m.cc.call(this, a);
    };
    x.Hd = function(a) {
        this.C || Zs.m.Hd.call(this, a);
    };
    x.Gd = function(a) {
        this.C || Zs.m.Gd.call(this, a);
    };
    var at = {
        set: function(a, b) {
            a.className = b;
        },
        get: function(a) {
            a = a.className;
            return (typeof a === t && a.match(/\S+/g)) || [];
        },
        add: function(a, b) {
            var c = at.get(a),
                d = Rc(arguments, 1),
                e = c.length + d.length;
            at.Of(c, d);
            at.set(a, c.join(" "));
            return c.length == e;
        },
        remove: function(a, b) {
            var c = at.get(a),
                d = Rc(arguments, 1),
                e = at.bg(c, d);
            at.set(a, e.join(" "));
            return e.length == c.length - d.length;
        },
        Of: function(a, b) {
            for (var c = 0; c < b.length; c++) Mc(a, b[c]) || a.push(b[c]);
        },
        bg: function(a, b) {
            return Hc(a, function(c) {
                return !Mc(b, c);
            });
        },
        sj: function(a, b, c) {
            for (var d = at.get(a), e = !1, f = 0; f < d.length; f++)
                d[f] == b && (Qc(d, f--, 1), (e = !0));
            e && (d.push(c), at.set(a, d.join(" ")));
            return e;
        },
        xk: function(a, b, c) {
            var d = at.get(a);
            typeof b === t ? Nc(d, b) : B(b) && (d = at.bg(d, b));
            typeof c !== t || Mc(d, c) ? B(c) && at.Of(d, c) : d.push(c);
            at.set(a, d.join(" "));
        },
        has: function(a, b) {
            return Mc(at.get(a), b);
        },
        enable: function(a, b, c) {
            c ? at.add(a, b) : at.remove(a, b);
        },
        toggle: function(a, b) {
            var c = !at.has(a, b);
            at.enable(a, b, c);
            return c;
        }
    };
    function bt(a, b) {
        Gs.call(this, a);
        b = b || {};
        this.a = { $a: b.$a || "", Kb: b.Kb || 1 };
        this.b = null;
    }
    E(bt, Gs);
    x = bt.prototype;
    x.eh = function(a, b) {
        b && ((b.a = a), Oo(this.b, b));
    };
    x.fh = function(a) {
        a && Qo(this.b, a);
    };
    x.Aj = function() {
        var a = this.b.tb;
        if (a && void 0 !== a.a) {
            var b = a.a;
            a = this.h.c[b];
            Hs(this, this.f, !1);
            this.f = b;
            Hs(this, b);
            this.b.Tb(a.qj);
            this.b.ua(a.Bj);
            b = a.T;
            this.b.J = b && Sc(b);
            this.b.Pa(a.text);
        }
    };
    x.zj = function() {
        Hs(this, this.f, !1);
    };
    x.Ng = function() {
        this.h.c[this.f].Ph.dispatchEvent("updating");
    };
    x.F = function() {
        this.b.M();
        this.b = null;
        bt.m.F.call(this);
    };
    x.Ag = function(a, b) {
        at[b ? "add" : "remove"](a, "goog-text-highlight");
    }; /*
   
   Math.uuid.js (v1.4)
   http://www.broofa.com
   mailto:robert@broofa.com
   Copyright (c) 2010 Robert Kieffer
   Dual licensed under the MIT and GPL licenses.
   */
    var ct = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    function dt(a) {
        this.h = a;
        this.c = this.a = this.f = this.b = -1;
        this.g = !1;
        this.s = 0;
        this.o = "";
        this.B = 0;
    }
    dt.prototype.start = function() {
        if (!this.g) {
            this.g = !0;
            var a = [],
                b;
            var c = 62;
            for (b = 0; 15 > b; b++) a[b] = ct[0 | (Math.random() * c)];
            this.o = a.join("");
            this.s = 0;
            this.c = this.a = this.f = this.b = -1;
            this.B = D();
            wl(this.l, 1e4, this);
        }
    };
    dt.prototype.stop = function() {
        this.g && ((this.g = !1), et(this));
    };
    dt.prototype.l = function() {
        this.g && (et(this), wl(this.l, 1e3, this));
    };
    function et(a) {
        var b = a.h.f,
            c = a.h.h,
            d = a.h.c,
            e = a.h.g;
        if (a.b != b || a.f != c || a.a != d || a.c != e) {
            var f = {};
            f.ct = b;
            f.cv = c;
            f.cts = d;
            f.cvs = e;
            f.sid = a.o;
            f.seq = a.s++;
            f.tat = D() - a.B;
            if (0 <= a.b || 0 <= a.f || 0 <= a.a || 0 <= a.c)
                (f.pt = a.b), (f.pv = a.f), (f.pts = a.a), (f.pvs = a.c);
            br("te_v", f);
            a.b = b;
            a.f = c;
            a.a = d;
            a.c = e;
        }
    }
    function ft() {
        this.g = this.c = this.h = this.f = 0;
        this.a = [];
        this.b = null != y.IntersectionObserver ? new IntersectionObserver(C(this.l, this)) : null;
    }
    ir(36546, ft.prototype, { Dg: 1 });
    var gt =
        "_gt_" +
        Math.random()
            .toString(36)
            .substr(2);
    ft.prototype.reset = function() {
        this.g = this.c = this.h = this.f = 0;
        this.a = [];
    };
    ft.prototype.l = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (0 < c.intersectionRatio && null != c.target[gt]) {
                this.h += Kg(c.target).length;
                var d = c.target[gt];
                this.g += this.a[d];
                this.a[d] = 0;
                c.target[gt] = void 0;
            }
        }
    };
    function ht(a, b) {
        R.call(this);
        a = a || {};
        this.a = nd(a);
        this.a.Kb = a.Kb;
        this.a.zf = !!a.zf;
        this.a.Kh = parseInt(a.Kh, 10) || 300;
        this.a.gj = a.gj;
        this.a.trackVisibility = a.trackVisibility || !1;
        this.h = 0;
        this.c = {};
        this.l = new fi(this);
        this.f = new bt(this, this.a);
        b && (this.f.g = b || {});
        a = this.f;
        a.b = new Zs({ pj: a.a.pj });
        a.b.zg = 300;
        a.b.Zg = 1e3;
        a.b.Tc(!0);
        a.c.w(a.b, "show", C(a.Aj, a));
        a.c.w(a.b, rb, C(a.zj, a));
        b = new Es({ $a: a.a.$a, id: "alternate", Ze: Z.mh, dd: !0 }, a.g);
        a.b.he(b);
        a.c.w(b, Ub, C(a.Ng, a));
        a.a.Kb &&
            ((b = new Fs({ id: "contribute", Qd: Xa, dd: !0 }, a.g)),
            a.b.he(b),
            a.c.w(b, Ub, C(a.Ng, a)));
        a.b.fa();
        this.g = this.b = null;
        this.a.trackVisibility &&
            null != y.IntersectionObserver &&
            ((this.b = new ft()), (this.g = new dt(this.b)));
    }
    E(ht, R);
    function it(a, b, c, d, e, f) {
        d = a.c[++a.h] = {
            id: a.h.toString(),
            Ph: f,
            text: c,
            Ck: e || c,
            T: d,
            qj: a.s,
            Bj: a.o,
            Ba: b
        };
        for (e = 0; e < b.length; ++e) b[e] && a.f.eh(d.id, b[e]);
        if (a.b)
            for (
                e = a.b, f = c.length, e.c += f, c = e.a.length, e.a.push(f), f = 0;
                f < b.length;
                ++f
            ) {
                var h = e,
                    k = b[f];
                wg(k)
                    ? ((k[gt] = c), (h.f += Kg(k).length), h.b && h.b.observe(k))
                    : h.Dg(k.nodeType);
            }
        a.g && a.g.start();
        return d.id;
    }
    function jt(a) {
        a.g && a.g.stop();
        for (var b in a.c) {
            var c = a,
                d = b,
                e = c.c[d];
            if (e) {
                if (c.b)
                    for (var f = c.b, h = e.Ba, k = 0; k < h.length; ++k) {
                        var l = f,
                            m = h[k];
                        wg(m) ? ((m[gt] = void 0), l.b && l.b.unobserve(m)) : l.Dg(m.nodeType);
                    }
                for (f = 0; f < e.Ba.length; ++f) e.Ba[f] && c.f.fh(e.Ba[f]);
                delete c.c[d];
            }
        }
        a.b && a.b.reset();
    }
    ht.prototype.F = function() {
        jt(this);
        this.l.M();
        this.l = null;
        this.f.M();
        this.f = null;
    };
    function kt(a) {
        for (var b = 0; b < a.length; ++b) if (a[b] && a[b].node) return a[b].node;
        return null;
    }
    function lt(a) {
        var b = kt(a);
        if (!b) return null;
        var c = [],
            d = [],
            e = [];
        b = new bs(b, !0);
        var f = a[a.length - 1].node,
            h = 0,
            k = !1;
        do {
            b.next();
            var l = b.node();
            if (!l) break;
            var m = b.a.c,
                n = b.depth();
            for (1 == m && --n; h < a.length && !a[h].node; ) ++h;
            l == a[h].node ||
            (!k && 1 == m && (null != l && null == l.previousSibling ? 0 : !mt(nt(l))))
                ? ((m = ot(l)),
                  d.push({ node: m, Pa: ec() }),
                  (e[d.length - 1] = n),
                  qg(m, l),
                  l == a[h].node && ((c[h++] = d.length - 1), (k = !0)))
                : (k = !1);
        } while (l != f);
        return { Ff: e, dj: c, Ei: d };
    }
    function mt(a) {
        return null != a && $r[a.tagName];
    }
    function nt(a) {
        if (null == a) return null;
        for (a = a.previousSibling; null != a && null != a && 3 == a.nodeType && "" == Sc(Kg(a)); )
            a = a.previousSibling;
        return a;
    }
    function pt(a, b, c, d, e, f) {
        li.call(this);
        this.a = [];
        for (var h = 0; h < a.length; ++h)
            this.a.push("nodeType" in a[h] ? qt(a[h]) : a[h]), rt(a[h].node);
        this.f = b;
        this.G = d || 0;
        this.J = e || 0;
        this.l = c;
        this.s = f || null;
        this.C = this.B = this.K = !1;
        this.c = [];
        this.h = [];
        this.b = [];
        this.L = [];
        new fi(this);
        this.g = this.H = !1;
    }
    var qt;
    E(pt, li);
    function st() {
        this.b = {};
        this.a = {};
    }
    st.prototype.has = function(a, b) {
        return null != this.b[a] || null != this.a[a] || (b && (a in this.b || a in this.a));
    };
    st.prototype.write = function(a, b) {
        this.a[a] = b;
    };
    st.prototype.remove = function(a) {
        delete this.a[a];
        delete this.b[a];
    };
    var tt =
            "_gt_" +
            Math.random()
                .toString(36)
                .substr(2),
        ut =
            "_gtn_" +
            Math.random()
                .toString(36)
                .substr(2);
    function vt(a) {
        if (!a) return !1;
        if (3 != a.nodeType || !I) return tt in a && !!a[tt];
        if (!a.parentNode) return !0;
        if (!(ut in a.parentNode)) return !1;
        var b = a.parentNode[ut];
        if (!b || !b[a.nodeValue]) return !1;
        b = b[a.nodeValue];
        for (var c = 0; c < b.length; ++c) if (b[c] == a) return !0;
        return !1;
    }
    (function() {
        function a(c) {
            document.title = c;
        }
        var b = {};
        qt = function(c, d) {
            if (c.tagName == wa) return { node: c, Pa: a, ee: !0, Bg: !0, Df: !0 };
            if (3 == c.nodeType)
                return {
                    node: c,
                    Pa: function(e, f) {
                        Eg(f, e);
                    }
                };
            d || (d = "value");
            b[d] ||
                (b[d] = function(e, f) {
                    f.setAttribute && f.setAttribute(d, e);
                    typeof e === t && (f[d] = e);
                });
            c = { node: c, Pa: b[d], ee: !0 };
            "value" != d && (c.Df = !0);
            return c;
        };
    })();
    function wt(a, b) {
        if (!a) return "";
        if (a.tagName == wa) return String(document.title);
        3 == a.nodeType ? (b = "nodeValue") : b || (b = "value");
        return a.getAttribute && a.getAttribute(b)
            ? String(a.getAttribute(b))
            : typeof a[b] === t
            ? String(a[b])
            : "";
    }
    pt.prototype.ea = u("f");
    function xt(a, b, c, d) {
        d = d.firstChild && 3 == d.firstChild.nodeType ? d.firstChild.nodeValue : Kg(d);
        d = { R: c, T: De(d) };
        a.push(d);
        b[c] ? (b[c].end = d) : (b[c] = { start: d, end: d });
        return d;
    }
    function yt(a, b, c) {
        b = { Og: b, lf: c, $: [] };
        a.b.push(b);
        return b;
    }
    function zt(a) {
        if (!a.g && a.K && !a.B && !a.C) {
            a.B = !0;
            var b;
            if ((b = At(a.a))) {
                b = a.a;
                var c = a.b;
                if (1 == b.length && b[0] && b[0].Df) {
                    for (var d = [], e = 0; e < c.length; ++e)
                        for (var f = 0; f < c[e].$.length; ++f) d.push(c[e].$[f].T);
                    b[0].Pa(d.join(" "), b[0].node);
                    b = !0;
                } else b = !1;
                b = !b;
            }
            if (b && (b = lt(a.a))) {
                a.h = b.dj;
                a.c = b.Ei;
                d = a.a;
                e = a.h;
                f = a.c;
                var h = b.Ff;
                c = [];
                for (var k = 0; k < d.length; ++k)
                    if (((c[k] = []), d[k].node && void 0 !== e[k]))
                        for (var l = 0; l < f.length; ++l)
                            if (!(h[l] > h[e[k]])) {
                                if (h[l] == h[e[k]]) {
                                    if (f[l].node.parentNode != f[e[k]].node.parentNode) continue;
                                } else {
                                    for (
                                        var m = h[e[k]] - h[l], n = f[e[k]].node.parentNode;
                                        m-- && n && n != f[l].node.parentNode;

                                    )
                                        n = n.parentNode;
                                    if (n != f[l].node.parentNode) continue;
                                }
                                c[k].push(l);
                            }
                d = a.a;
                e = a.b;
                f = -1;
                for (h = e.length - 1; 0 <= h; --h)
                    for (k = e[h], l = k.$.length - 1; 0 <= l; --l)
                        if (((m = k.$[l]), !(0 > m.R) && d[m.R] && d[m.R].node))
                            if (0 > f) (m.Ld = Sq(c[m.R])), (f = c[m.R][c[m.R].length - 1]);
                            else
                                for (n = c[m.R].length - 1; 0 <= n; --n)
                                    if (c[m.R][n] <= f) {
                                        m.Ld = Sq(c[m.R].slice(0, n + 1));
                                        f = c[m.R][n];
                                        break;
                                    }
                for (c = e = 0; c < a.b.length; ++c) {
                    d = a.b[c];
                    f = a.a;
                    h = d;
                    k = b.Ff;
                    l = a.h;
                    m = "";
                    for (n = 0; n < h.$.length; ++n) {
                        var r = h.$[n];
                        m += r.T;
                        if (0 > r.R) {
                            var w = -1,
                                G = -1,
                                F = l[h.$[n - 1].R];
                            void 0 !== F && (w = k[F]);
                            n < h.$.length - 1 &&
                                ((F = l[h.$[n + 1].R]), void 0 !== F && (G = k[F]));
                            if (0 <= w || 0 <= G)
                                a: if (
                                    ((G = (0 > w || G < w) && n < h.$.length - 1),
                                    (w = h.$[G ? n + 1 : n - 1]),
                                    !(w.R >= f.length || null == f[w.R].node))
                                ) {
                                    F = r.T;
                                    r.T = "";
                                    if (
                                        /^ +$/.test(F) &&
                                        ((r = G
                                            ? w.T.charCodeAt(0)
                                            : w.T.charCodeAt(w.T.length - 1)),
                                        (3584 <= r && 3711 >= r) ||
                                            (12288 <= r && 12351 >= r) ||
                                            (12352 <= r && 12543 >= r) ||
                                            (12784 <= r && 12799 >= r) ||
                                            (19968 <= r && 40959 >= r) ||
                                            (65280 <= r && 65519 >= r))
                                    )
                                        break a;
                                    w.T = G ? F + w.T : w.T + F;
                                }
                        }
                    }
                    f = m;
                    h = a.a;
                    k = d;
                    l = a.c;
                    m = b.Ff;
                    n = a.h;
                    r = [];
                    for (w = 0; w < k.$.length && !(e >= l.length); ++w)
                        if (((G = k.$[w]), G.Ld && !(0 > G.R) && h[G.R].node && G.T))
                            if (
                                e == n[G.R] ||
                                (e in G.Ld && (!(e + 1 in G.Ld) || e + 1 != n[G.R]))
                            ) {
                                if (l[e] && l[e].node) {
                                    F = ot(l[e].node);
                                    r.push(F);
                                    for (
                                        var ca = l[e].node,
                                            Zl = m[n[G.R]] - m[e],
                                            hf = F,
                                            ub = h[G.R].node.parentNode,
                                            Li = hf;
                                        ub && Zl--;

                                    )
                                        (Li = ub.cloneNode(!1)),
                                            Li.appendChild(hf),
                                            (ub = ub.parentNode),
                                            (hf = Li);
                                    ca.appendChild(Li);
                                    ca = h[G.R].node;
                                    h[G.R].ee
                                        ? h[G.R].Bg || F.appendChild(ca)
                                        : ((ca = h[G.R].node.cloneNode(!1)),
                                          ca.id && (ca.id = ""),
                                          F.appendChild(ca));
                                    h[G.R].Pa(G.T, ca);
                                }
                            } else ++e, --w;
                    h = r;
                    r = a.a;
                    k = a.l;
                    if (d.Og) k = d.Og;
                    else {
                        l = r.length;
                        m = -1;
                        for (n = 0; n < d.$.length; ++n)
                            (w = d.$[n].R),
                                0 <= w &&
                                    r[w] &&
                                    r[w].node &&
                                    ((m = Math.max(m, w)), (l = Math.min(l, w)));
                        r = "";
                        for (n = l; n <= m; ++n) k[n] && (r += k[n]);
                        k = r;
                    }
                    if (a.s) 3 != a.s.a.Kb && a.L.push(it(a.s, h, k, f, d.lf, a));
                    else for (d = 0; d < h.length; ++d) h[d].title = k;
                }
                b = a.a;
                for (c = 0; c < b.length; ++c) b[c].node && !b[c].ee && sg(b[c].node);
                b = a.a;
                c = a.c;
                a = a.h;
                for (e = d = 0; e < c.length; ++e)
                    if ((f = c[e].node)) {
                        for (; d < b.length && e > a[d]; ) d++;
                        (d >= b.length || e != a[d]) &&
                            !f.firstChild &&
                            (sg(f), (c[e].node = null));
                    }
            }
        }
    }
    pt.prototype.restore = function() {
        if (this.B)
            if (
                ((this.B = !1),
                this.s && jt(this.s),
                (this.L = []),
                At(this.c),
                1 == this.a.length && this.a[0].Df)
            )
                this.a[0].Pa(this.l[0], this.a[0].node);
            else {
                for (var a = 0, b = 0; b < this.c.length; ++b) {
                    var c = this.c[b].node;
                    if (c) {
                        for (; a < this.a.length && b > this.h[a]; ) {
                            var d = a++;
                            this.a[d].node && (Bt(this.a[d].node), (this.a[d].node = null));
                        }
                        if (a < this.a.length && b == this.h[a] && this.a[a].node) {
                            this.a[a].Bg || (pg(c), c.appendChild(this.a[a].node));
                            this.a[a].Pa(this.l[a], this.a[a].node);
                            a++;
                            d = c;
                            var e = d.parentNode;
                            if (e && 11 != e.nodeType)
                                if (d.removeNode) d.removeNode(!1);
                                else {
                                    for (; (c = d.firstChild); ) e.insertBefore(c, d);
                                    sg(d);
                                }
                        } else sg(c);
                    }
                }
                this.c = [];
            }
    };
    pt.prototype.F = function() {
        pt.m.F.call(this);
        this.restore();
        for (var a = 0; a < this.a.length; ++a) this.a[a].node && Bt(this.a[a].node);
        this.a = null;
    };
    function rt(a) {
        if (a)
            if (3 == a.nodeType && I) {
                (ut in a.parentNode && a.parentNode[ut]) || (a.parentNode[ut] = {});
                var b = a.parentNode[ut];
                b[a.nodeValue] || (b[a.nodeValue] = []);
                b = b[a.nodeValue];
                for (var c = 0; c < b.length; ++c) if (b[c] == a) return;
                b.push(a);
            } else a[tt] = 1;
    }
    function Bt(a) {
        if (!a || (3 == a.nodeType && I)) {
            var b = a.parentNode;
            if (b && ut in b) {
                var c = b[ut];
                if (c && a && c[a.nodeValue]) {
                    var d = c[a.nodeValue];
                    if (d)
                        for (var e = 0; e < d.length; ++e)
                            if (d[e] == a) {
                                d.splice(e, 1);
                                break;
                            }
                    0 == d.length && delete c[a.nodeValue];
                }
                if (c && gr(c))
                    try {
                        delete b[ut];
                    } catch (f) {
                        b[ut] = "";
                    }
            }
        } else if (tt in a)
            try {
                delete a[tt];
            } catch (f) {
                a[tt] = "";
            }
    }
    function At(a) {
        for (var b = 0; b < a.length; ++b)
            try {
                a[b].node && !a[b].node.parentNode && (a[b].node = null);
            } catch (c) {
                a[b].node = null;
            }
        for (b = a.length - 1; 0 <= b && !a[b].node; --b);
        a.length = b + 1;
        return a.length;
    }
    function ot(a) {
        a = a.ownerDocument ? a.ownerDocument.createElement("font") : jg(document, "font");
        rt(a);
        a.style.verticalAlign = "inherit";
        return a;
    }
    function Ct(a) {
        for (var b, c = a.firstChild; c; c = b)
            (b = c.nextSibling),
                3 != c.nodeType && (c == a.firstChild ? qg(c, a) : rg(c, a), Ct(c));
    }
    function Dt(a, b, c, d, e) {
        b = b || {};
        this.wa = e || [];
        this.h = [];
        this.o = [];
        Et(this, a || document.documentElement, void 0 === b.Ug || !!b.Ug);
        this.l = c || pt;
        this.C = b.Ii;
        this.c = this.a = this.g = this.Ac = null;
        this.s = !!b.Ej;
        this.H = !!b.Dj;
        this.K = this.s ? 27 : 13;
        this.G = !0;
        this.B = [];
        this.f = new Em(this, d);
    }
    ir(5762, Dt.prototype, { Pi: 1 });
    function Ft(a, b, c, d) {
        a.f.c ||
            ((b = { hh: b, $g: c, Ba: [], Pg: [], Hb: [], be: 0, size: 0, continuous: !0 }),
            (a.Ac = null),
            Hm(a.f, a.b),
            Im(a.f, d),
            Jm(
                a.f,
                C(function(e) {
                    this.Pi(e);
                    d();
                }, a)
            ),
            Km(a.f, b));
    }
    function Gt(a, b) {
        return 0 < a.Ba.length ? new b(a.Ba, a.Hb.join(""), a.Pg, a.be, a.size) : null;
    }
    function Ht(a, b) {
        if (!a.c) return (a.Ac = Gt(b, a.l)), !0;
        if (!b.continuous && 0 < b.Ba.length) return (a.Ac = Gt(b, a.l)), !0;
        b.continuous = a.c.Jg;
        a: {
            var c = a.c;
            var d = a.K;
            if (b.size > b.$g || b.be > b.hh) c = !1;
            else {
                var e = c.size,
                    f = c.text.length;
                if (
                    0 != b.Ba.length &&
                    ((e += 1 == b.Ba.length ? b.size + d + d : b.size + d),
                    (f += b.be),
                    e > b.$g || f > b.hh)
                ) {
                    c = !1;
                    break a;
                }
                b.size = e;
                b.be = f;
                b.Ba.push(c.node);
                b.Pg.push(c.text);
                d = b.Ba.length - 1;
                0 == d
                    ? b.Hb.push(c.ue)
                    : (1 == d && (b.Hb[0] = "<a i=0>" + b.Hb[0] + "</a>"),
                      b.Hb.push("<a i=" + d + ">"),
                      b.Hb.push(c.ue),
                      b.Hb.push("</a>"));
                c = !0;
            }
        }
        if (c) return (a.c = null), !1;
        a.Ac = Gt(b, a.l);
        return !0;
    }
    function It(a, b, c) {
        var d = wt(b, c);
        d && Sc(we(d)) && a.B.push({ node: b, Gh: c, text: d });
    }
    Dt.prototype.b = function(a, b) {
        if (this.c && Ht(this, b)) return Gm;
        if (!this.a) {
            this.G = !!this.h.length;
            if (!this.h.length && (a = this.B.shift()))
                return (
                    (this.c = {
                        Jg: !1,
                        node: qt(a.node, a.Gh),
                        text: a.text,
                        ue: Ce(a.text),
                        size: this.s ? Ae(a.text).length : a.text.length
                    }),
                    (b.continuous = !1),
                    Ht(this, b),
                    Gm
                );
            a = this.h.shift() || this.o.shift();
            if (!a) return (this.c = null), Ht(this, b), Gm;
            this.g = [a.Cj];
            this.a = new bs(a.root);
        }
        this.a.next();
        if (this.a.f) return (this.a = null), (b.continuous = !1), this.b;
        a = this.a.node();
        var c = this.a.a.c;
        if (-1 == c) {
            Jt(this);
            if (!a || (3 != a.nodeType && !Yr[a.tagName])) b.continuous = !1;
            return this.b;
        }
        var d =
            !vt(a) &&
            ((a.nodeType == Bc && Kt(this)) || (!If(a, "notranslate") && (If(a, ac) || Kt(this))));
        this.g.push(d);
        c = 1 == c;
        if (
            ((d =
                !!a &&
                ((3 == a.nodeType && typeof a.nodeValue === t) ||
                    (a.tagName == wa && typeof a.value === t) ||
                    (a.tagName == va && If(a, ac)) ||
                    (a.tagName == oa && (as[a.type] || If(a, ac))))) ||
                c) &&
            this.G &&
            !Lt(a)
        )
            return Et(this, a, Kt(this), !0), this.a.a.g(), Jt(this), this.b;
        if (c && Kt(this)) {
            this.H && It(this, a, "title");
            It(this, a, "alt");
            It(this, a, "placeholder");
            It(this, a, "aria-label");
            It(this, a, "aria-placeholder");
            It(this, a, "aria-roledescription");
            It(this, a, "aria-valuetext");
            var e = this.a;
            if (e.b[e.b.length - 1])
                for (e = a.firstChild; e; ) {
                    if (3 == e.nodeType) {
                        var f = e.nodeValue.split("\n");
                        if (2 < f.length || (2 == f.length && "" != Sc(f[0]) && "" != Sc(f[1]))) {
                            e.nodeValue = f[0];
                            for (var h = 1; h < f.length; ++h) {
                                var k = O(a).createElement("font");
                                this.wa.push(k);
                                rg(k, e);
                                e = k;
                                rg(O(a).createTextNode("\n" + f[h]), e);
                                e = e.nextSibling;
                            }
                        }
                    }
                    e = e.nextSibling;
                }
        }
        if (d) {
            this.a.a.g();
            if (Kt(this)) {
                var l = wt(a);
                if (
                    Sc(we(l)) &&
                    ((this.c = {
                        Jg: !0,
                        node: qt(a),
                        text: l,
                        ue: Ce(l),
                        size: this.s ? Ae(l).length : l.length
                    }),
                    Ht(this, b))
                )
                    return Jt(this), Gm;
            }
            Jt(this);
            return this.b;
        }
        if (c) {
            if (Mt(a) || (!a.firstChild && a.tagName != na))
                return (
                    (b.continuous = b.continuous && !!$r[a.tagName]), this.a.a.g(), Jt(this), this.b
                );
            if (a.tagName == na) {
                try {
                    if (!(l = !a.src.match(/https?:\/\//))) {
                        var m = a.src.match(Gj)[3] || null;
                        l = (m ? decodeURI(m) : m) == window.location.hostname;
                    }
                    if (l) {
                        var n = Cg(a).documentElement;
                        n && Et(this, n, Kt(this));
                    }
                } catch (r) {}
                b.continuous = !1;
                this.a.a.g();
                Jt(this);
                return this.b;
            }
            Kt(this) && a && (3 == a.nodeType || Yr[a.tagName])
                ? this.C && "A" == a.tagName && a.href && this.C(a)
                : (b.continuous = !1);
            return this.b;
        }
        this.a.a.g();
        Jt(this);
        return this.b;
    };
    function Mt(a) {
        return (
            vt(a) ||
            (3 != a.nodeType &&
                (!a.tagName || Zr[a.tagName] || $r[a.tagName] || If(a, Sb) || "gts-order" == a.id))
        );
    }
    function Lt(a) {
        if (3 == a.nodeType) return !0;
        if (1 != a.nodeType) return !1;
        if (!a.offsetWidth || !a.offsetHeight) {
            var b = O(a),
                c = null;
            b.defaultView && b.defaultView.getComputedStyle
                ? (c = b.defaultView.getComputedStyle(a, null))
                : (c = a.currentStyle);
            return c && c.display != q && c.visibility != qb;
        }
        return !0;
    }
    function Et(a, b, c, d) {
        (d ? a.o : a.h).push({ root: b, Cj: void 0 === c || c });
    }
    function Kt(a) {
        return a.g[a.g.length - 1];
    }
    function Jt(a) {
        a.g.pop();
    }
    function Nt() {
        R.call(this);
        this.a = [];
    }
    E(Nt, R);
    Nt.prototype.restore = function() {
        wl(this.b, 0, this);
    };
    Nt.prototype.b = function() {
        for (var a = 0; a < this.a.length; ++a) sg(this.a[a]);
        this.a = [];
    };
    Nt.prototype.F = function() {
        Nt.m.F.call(this);
        this.restore();
    };
    function Ot(a) {
        var b = new Lo();
        Fj(a, function(c) {
            if (wg(c)) b.add(c);
            else {
                a: {
                    var d;
                    if (
                        Pf &&
                        !(I && L("9") && !L("10") && y.SVGElement && c instanceof y.SVGElement) &&
                        (d = c.parentElement)
                    ) {
                        c = d;
                        break a;
                    }
                    d = c.parentNode;
                    c = wg(d) ? d : null;
                }
                null != c && b.add(c);
            }
        });
        return b;
    }
    function Pt(a) {
        this.b = !0;
        this.f = a;
        this.c = !1;
        this.a = [];
    }
    Pt.prototype.ea = function() {
        return this.a.join("");
    };
    function Qt(a, b) {
        this.g = a;
        this.f = !0;
        this.c = b;
        this.a = null;
        this.b = 0;
    }
    function Rt(a, b) {
        return a.f ? (b(C(a.h, a), a.g, a.c ? "en" : ""), !0) : !1;
    }
    Qt.prototype.h = function(a, b, c) {
        this.a = b;
        this.b = c;
        a();
    };
    function St(a, b) {
        this.f = a;
        this.o = !!b;
        this.b = this.s = 0;
        this.g = this.c = -1;
        this.h = this.l = this.a = 0;
    }
    var Tt = Sq(". , ; : \\? !".split(" ")),
        Ut = Sq([
            34,
            35,
            36,
            37,
            38,
            43,
            44,
            47,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            91,
            92,
            93,
            94,
            96,
            123,
            124,
            125,
            127
        ]);
    function Vt(a, b, c) {
        a.o && (b -= 9);
        for (var d = "", e = 0, f = a.s; f < a.f.length; ++f) {
            var h = a.f.charAt(f),
                k = h.charCodeAt(0);
            e++;
            a.a += a.o
                ? 127 >= k
                    ? 32 >= k || Ut[k]
                        ? 3
                        : 1
                    : 2047 >= k || (55296 <= k && 56319 >= k) || (56320 <= k && 57343 >= k)
                    ? 6
                    : 9
                : 1;
            k = a.a >= b;
            Tt[h]
                ? ((a.g = f), (a.l = a.a), (k = k || e > c))
                : " " == h && ((a.c = f), (a.h = a.a), (k = k || e > c));
            if (k)
                return (
                    0 <= a.g
                        ? ((d = a.f.substring(a.b, a.g + 1)),
                          (a.a -= a.l),
                          (a.b = a.g + 1),
                          a.g >= a.c ? ((a.c = -1), (a.h = 0)) : (a.h -= a.l),
                          (a.g = -1),
                          (a.l = 0))
                        : 0 <= a.c
                        ? ((d = a.f.substring(a.b, a.c + 1)),
                          (a.a -= a.h),
                          (a.b = a.c + 1),
                          (a.c = -1),
                          (a.h = 0))
                        : ((d = a.f.substring(a.b, f + 1)),
                          (a.a = 0),
                          (a.b = f + 1),
                          (a.g = a.c = -1),
                          (a.h = a.l = 0)),
                    (a.s = f + 1),
                    d
                );
        }
        a.b < a.f.length && ((d = a.f.substring(a.b)), (a.b = a.f.length));
        return d;
    }
    function Wt(a, b, c, d, e, f) {
        this.l = d || z;
        this.W = f || z;
        this.L = !!e;
        this.c = a.a.cf;
        this.f = 0;
        this.G = z;
        this.C = c;
        this.o = this.b = this.g = 0;
        this.a = null;
        this.K = 0;
        this.qa = !1;
        this.ca = a.a.bf;
        this.J = [];
        this.H = 0;
        this.h = (this.P = a.a.jd) ? a.a.Sd - new Ij(a.a.na.a).toString().length : a.a.Sd;
        this.va = this.L ? 1 : 6;
        this.Ia = a.a.uf;
        this.wa = b;
        this.s = [];
        this.la = a;
    }
    function Xt(a, b) {
        var c = 0;
        a.G = C(function() {
            ++c == this.s.length && b();
        }, a);
    }
    function Yt(a, b, c) {
        if (0 == a.b && ((a.b = b ? 860 : a.h), !c || c <= a.h)) {
            a.g = a.b;
            return;
        }
        do (b = a.b), a.b < a.h && ((a.b *= a.va), a.b > a.h && (a.b = a.h));
        while (b != a.b && c && a.b < c);
        a.g = a.b;
    }
    function Zt(a, b) {
        var c = null != b,
            d = !c && !a.qa;
        (d || c) && a.l(100, d, b);
    }
    function $t(a) {
        return a.P ? a.a.J : a.a.ea().length;
    }
    function au(a, b, c, d, e) {
        return new Dt(
            a.wa.shift(),
            { Ej: a.P, Ii: b, Ug: !0, Dj: !!c },
            function() {
                var f = Array.prototype.slice.call(arguments);
                return new pt(f.shift(), f.shift(), f.shift(), f.shift(), f.shift(), c, d);
            },
            a.C,
            e
        );
    }
    function bu(a, b, c) {
        if (0 < a.ca && cu(b) >= a.ca) return !0;
        if ($t(a) > a.b) {
            if (0 < cu(b)) return !0;
            Yt(a, c, $t(a));
            for (var d = a.a.ea(), e = new St(d, a.P), f; (f = Vt(e, a.b, a.c)); )
                if ((b.g.push(new Qt([f], !1)), (a.f += f.length), (a.c -= f.length), 0 >= a.c)) {
                    b.B = d.substring(e.b);
                    break;
                } else Yt(a, c);
            du(b, a.a, !0);
            a.a = null;
            return !0;
        }
        if ($t(a) > a.g) return !0;
        du(b, a.a, !0);
        a.g -= $t(a) + a.Ia;
        a.f += a.a.G;
        a.c -= a.a.G;
        a.a = null;
        return !1;
    }
    function eu(a, b) {
        R.call(this);
        this.f = b;
        this.b = { rootMargin: a };
        this.a = new IntersectionObserver(C(this.c, this), this.b);
    }
    E(eu, R);
    eu.prototype.F = function() {
        eu.m.F.call(this);
        this.a = null;
    };
    eu.prototype.c = function(a) {
        for (var b = 0; b < a.length; b++)
            if (0 < a[b].intersectionRatio) {
                this.f();
                break;
            }
    };
    function fu() {
        T.call(this);
    }
    E(fu, T);
    fu.prototype.D = function() {
        this.S(zl(ls));
    };
    fu.prototype.S = fc("A");
    function gu(a) {
        Kf(a.j(), pb);
        Kf(a.j().firstChild, ob);
    }
    function hu() {
        this.a = new fu();
        this.a.D();
        this.a.fa();
        this.b = 0;
    }
    hu.prototype.reset = function() {
        this.b = 0;
        gu(this.a);
    };
    function iu(a, b, c, d, e, f, h, k) {
        this.g = a;
        this.b = b;
        this.s = [];
        this.B = null;
        this.f = c;
        this.a = d;
        this.c = e;
        this.wa = f;
        this.H = h;
        this.o = this.h = null;
        this.l = k || null;
        this.K = this.C = !1;
        this.G = {};
    }
    function ju(a) {
        for (var b = new Lo(), c = 0; c < a.length; c++) {
            for (var d = a[c], e = new Lo(), f = 0; f < d.a.length; f++) {
                var h = d.a[f].node;
                null != h && e.add(h);
            }
            d = b;
            e = Ej(e);
            f = e.length;
            for (h = 0; h < f; h++) d.add(e[h]);
        }
        return b;
    }
    x = iu.prototype;
    x.trackVisibility = function(a) {
        a = this.h = new eu("200px", C(this.ti, this, a));
        var b = Ot(ju([].concat(this.b, this.s)));
        Fj(b, C(a.a.observe, a.a));
        a = this.o = new eu("0px", C(this.xi, this));
        b = Ot(ju([].concat(this.b, this.s)));
        Fj(b, C(a.a.observe, a.a));
    };
    x.ti = function(a) {
        this.h && (this.h.a.disconnect(), (this.h = null));
        a();
    };
    x.xi = function() {
        this.C = !0;
        ku(this);
        if (!this.K && this.l) {
            var a = this.l;
            0 == a.b++ && ((a = a.a), M(a.j(), pb), M(a.j().firstChild, ob));
        }
    };
    function ku(a) {
        a.o && (a.o.a.disconnect(), (a.o = null));
    }
    x.dh = function() {
        if (this.C && !this.K && this.l) {
            var a = this.l;
            0 == --a.b && gu(a.a);
        }
        this.h && (this.h.a.disconnect(), (this.h = null));
        ku(this);
    };
    function du(a, b, c) {
        c ? (a.b.push(b), (a.G[b.ea()] = !0)) : a.s.push(b);
    }
    function cu(a) {
        return a.b.length + a.s.length;
    }
    function lu(a) {
        if (0 == a.g.length) {
            for (var b = [], c = 0; c < a.b.length; ++c) b.push(a.b[c].ea());
            a.g.push(new Qt(b, !1));
        }
    }
    x.translate = function(a) {
        function b() {
            d++;
            d == c && e();
        }
        lu(this);
        for (
            var c = 0,
                d = 0,
                e = z,
                f = this.f,
                h = this.a,
                k = this.c,
                l = this.wa,
                m = this.H,
                n = 0;
            n < this.g.length;
            ++n
        )
            Rt(this.g[n], function(r, w, G) {
                r = f.la.translate(yc(r, b), w, G || h, k, ++f.H, l, m, f.L);
                f.J.push(r);
                return r;
            }) && c++;
        0 != c && (e = Lm(a));
        return c;
    };
    function mu(a, b) {
        R.call(this);
        this.b = [];
        this.f = [];
        this.a = a;
        this.c = b;
    }
    E(mu, R);
    mu.prototype.g = function(a) {
        var b = Sc(a.href);
        0 == b.indexOf("javascript:") ||
            0 <= b.indexOf("#") ||
            (this.f.push(a.href),
            this.b.push(a),
            (a.href = b + "#googtrans/" + this.a + "/" + this.c));
    };
    mu.prototype.F = function() {
        mu.m.F.call(this);
        this.restore();
    };
    mu.prototype.restore = function() {
        if (this.b.length) {
            for (var a = 0; a < this.b.length; ++a) this.b[a].href = this.f[a];
            this.b = [];
            this.f = [];
        }
    };
    function nu(a, b) {
        R.call(this);
        this.b = a;
        this.a = xd.test(b) ? "translated-rtl" : "translated-ltr";
        a = [].concat(this.b);
        for (b = 0; b < a.length; ++b) wg(a[b]) && M(a[b], this.a);
    }
    E(nu, R);
    nu.prototype.F = function() {
        nu.m.F.call(this);
        this.restore();
    };
    nu.prototype.restore = function() {
        for (var a = [].concat(this.b), b = 0; b < a.length; ++b) wg(a[b]) && Kf(a[b], this.a);
    };
    function ou(a, b, c, d, e, f, h, k, l, m) {
        R.call(this);
        this.B = a;
        this.Ch = b;
        this.la = c || null;
        this.va = m || null;
        this.C = null;
        this.tb = !!d;
        this.Yc = e || "transparent";
        this.Gb = !!f;
        this.o = [];
        this.jb = this.G = this.b = !1;
        this.l = k || new st();
        this.Nf = !k;
        this.ra = h || Am.X();
        this.Ia = new Nt();
        this.W = this.P = this.K = !1;
        this.Ya = this.f = 0.5;
        this.Za = 0.01;
        this.s = new Bm(this.f);
        this.J = (this.h = this.qa = !!l) ? new MutationObserver(C(this.ni, this)) : null;
        this.c = this.a = null;
        S(window, Ka, this.wg, !0, this);
        S(window, cb, this.xg, !0, this);
    }
    E(ou, R);
    ir(3046, ou.prototype, { Li: 1, Ni: 2, Mi: 3, Oi: 4 });
    x = ou.prototype;
    x.cb = function() {
        return this.a ? this.a : "";
    };
    x.oa = function() {
        return this.c ? this.c : "";
    };
    x.Mh = function(a) {
        this.Li.apply(this, arguments);
        this.g && this.g(0, !1, 1);
    };
    x.Yf = function(a) {
        this.Mi.apply(this, arguments);
        this.g && this.g(0, !1, 1);
    };
    x.Nh = function(a) {
        this.Ni.apply(this, arguments);
        this.g && this.g(0, !1, 1);
    };
    x.Oh = function(a) {
        this.Oi.apply(this, arguments);
        this.g && this.g(0, !1, 1);
    };
    x.translate = function(a, b, c, d, e) {
        if (d || a != this.a || b != this.c) pu(this), this.Nf && (this.l = new st());
        else if (this.b) return;
        this.g = c;
        this.Zc = e;
        this.h = this.qa && !0;
        this.J &&
            this.J.observe(document.body, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            });
        this.b = !0;
        this.a = a;
        this.c = b;
        this.tb && (this.C = new mu(a, b));
        this.W = this.a == Ha;
        this.la && ((c = this.la), a && (c.s = a), b && (c.o = b));
        this.ca = new nu(this.B, this.c);
        this.H = qu(this);
        (a = this.B instanceof Node ? this.B : null) && ru(a, this.c);
    };
    function qu(a) {
        var b = new Em(a, a.ra);
        Hm(b, a.sg);
        Jm(b, C(a.Mh, a));
        Km(b, new Wt(a.Ch, [].concat(a.B), a.ra, a.g, a.h, a.Zc));
        return b;
    }
    x.restore = function() {
        pu(this);
        this.Ia.restore();
        var a = this.B instanceof Node ? this.B : null;
        a && ru(a, this.cb());
    };
    x.F = function() {
        ou.m.F.call(this);
        this.restore();
        $h(window, Ka, this.wg, !0, this);
        $h(window, cb, this.xg, !0, this);
    };
    function su(a, b, c, d) {
        var e = gr(a.l.b),
            f = new Em(a, b.C);
        b.s.push(f);
        Im(f, b.G);
        Yt(b, e);
        Hm(f, d || a.og);
        b = c || new iu([], [], b, a.cb(), a.oa(), a.jb, a.G, a.va);
        Jm(f, a.ui, a);
        a.h && Im(f, b.dh, b);
        Km(f, b);
    }
    x.ui = function(a, b, c) {
        c.dh();
        this.G ? this.Oh(a) : this.Nh(a);
        c.f.G();
    };
    x.xg = function() {
        this.K = !1;
        this.L = 0;
        Cm(this.s, this.f);
    };
    x.wg = function(a) {
        a.target == window && ((this.K = !0), (this.L = 0), Cm(this.s, 0.01));
    };
    x.ni = function(a) {
        if (this.b && this.h) {
            for (var b = 0; b < a.length; b++)
                if (
                    a[b].target &&
                    a[b].target.className &&
                    a[b].target.className.indexOf &&
                    (0 <= a[b].target.className.indexOf(ac) ||
                        0 == a[b].target.className.indexOf("goog-"))
                )
                    return;
            this.ra.add(C(this.hj, this));
        }
    };
    x.hj = function() {
        this.G = !0;
        this.H.stop();
        this.H = qu(this);
        return !1;
    };
    x.sg = function(a, b) {
        Xt(b, Lm(a));
        su(this, b);
        return this.zi;
    };
    x.zi = function(a, b) {
        if (!this.b) return Gm;
        if (!Mm(a)) return Fm;
        if (!this.h)
            for (a = 0; a < this.o.length; ++a) {
                var c = C(this.Pf, this, b, this.o[a]);
                b.C.add(c);
            }
        return this.yi;
    };
    x.lg = function(a, b) {
        if (this.L && !this.K) {
            a = new Date().getTime() - this.L;
            var c = this.f;
            900 > a && 0.01 < c
                ? (c = Math.max(0.9 * c, 0.01))
                : 1100 < a && 0.5 > c && (c = Math.min(1.5 * c, 0.5));
            this.f = c;
            this.P ? (this.Za = 0.01) : (this.Ya = this.f);
        }
        this.G = this.b = !0;
        this.L = new Date().getTime();
        this.$c !=
        (a = document.body.innerText || document.body.textContent || document.body.innerHTML)
            ? ((this.$c = a), (a = !0))
            : (a = !1);
        a
            ? ((this.P = !1),
              (this.f = this.Ya),
              this.K || Cm(this.s, this.f),
              (a = [].concat(this.B)),
              (c = this.s),
              (b.l = z),
              (b.wa = a),
              (b.a = null),
              (b.H = 0),
              (b.s = []),
              (b.G = z),
              (b.C = c),
              (a = new Em(this, this.s)),
              Hm(a, this.sg),
              Jm(a, C(this.Yf, this)),
              Km(a, b),
              (this.H = a))
            : ((this.P = !0),
              (this.f = this.Za),
              this.K || Cm(this.s, this.f),
              (a = new Em(this, this.s)),
              Hm(a, this.lg),
              Jm(a, C(this.Yf, this)),
              Km(a, b),
              (this.H = a));
        return Gm;
    };
    x.yi = function(a, b) {
        if (!this.b) return Gm;
        this.G = this.b = !1;
        this.W ? Zt(b, !0) : (Zt(b), b.W(b.f));
        if (this.Gb) return this.lg;
        for (a = 0; a < b.s.length; ++a) b.s[a].stop();
        for (a = 0; a < b.J.length; ++a) Xr(b.la, b.J[a]);
        return Gm;
    };
    function tu(a, b, c) {
        a: {
            var d = a.tb ? C(a.C.g, a.C) : z,
                e = a.la,
                f = a.Yc,
                h = a.Ia.a;
            b = Lm(b);
            if (!c.B) {
                if (0 == c.wa.length) {
                    0 == c.f && 0 == c.H && c.l(0, !0);
                    c = !1;
                    break a;
                }
                c.B = au(c, d, e, f, h);
            }
            c.ra = !0;
            Ft(c.B, c.c, c.b, b);
            c = !0;
        }
        return c ? a.og : a.Dd;
    }
    x.og = function(a, b) {
        if (!this.b) return Gm;
        var c = b.f;
        if (null == c.a) {
            if (!c.ra) return tu(this, a, b.f);
            if (!Mm(a)) return Fm;
            c.ra = !1;
            c.a = c.B.Ac || null;
            var d = c.a ? c.a : (c.B = null);
            if (!d) return tu(this, a, b.f);
            this.o.push(d);
            var e = d.ea();
            if (this.l.has(e, !this.h) || (null != b.G[e] && b.G[e]))
                return (
                    (e = c.a.G),
                    (c.f += e),
                    (c.c -= e),
                    (c.a = null),
                    this.h && du(b, d, !1),
                    tu(this, a, b.f)
                );
            this.l.a[d.ea()] = null;
        }
        0 < cu(b) && Cm(this.s, 0.5);
        return bu(c, b, gr(this.l.b)) ? this.Dd : tu(this, a, b.f);
    };
    x.Dd = function(a, b) {
        if (!this.b || 0 == cu(b)) return Gm;
        su(this, b.f);
        return this.h ? (b.trackVisibility(Lm(a)), this.Ai) : 0 == b.translate(a) ? Gm : this.rg;
    };
    x.Ai = function(a, b) {
        return this.b ? (Mm(a) ? (0 == b.translate(a) ? Gm : this.rg) : Fm) : Gm;
    };
    x.Pf = function(a, b) {
        b.g && this.l.remove(b.f);
        if (!this.b) return !1;
        if (this.l.has(b.ea(), !1)) {
            var c = this.l;
            if (c.has(b.f, !1)) {
                var d = b.f,
                    e = c.a[d];
                e || ((e = c.b[d]), (c.a[d] = e));
                b.b = e;
                b.K = !0;
            } else c.remove(b.f), (b.g = !0);
            zt(b);
        } else if (((c = this.l), b.g)) c.remove(b.f);
        else if (b.o) {
            d = b.o.replace(/<a /g, "<span ").replace(/\/a>/g, "/span>");
            b.K = !0;
            delete b.o;
            b.o = null;
            b.b = [];
            e = jg(document, Za);
            Q(e, !1);
            e.innerHTML = 0 <= d.indexOf("<i>") ? d : "<b>" + d + "</b>";
            document.body.appendChild(e);
            d = [];
            var f;
            for (f = e.firstChild; f; f = f.nextSibling)
                if ("I" == f.tagName) var h = yt(b, Kg(f), f.innerHTML);
                else if ("B" == f.tagName) {
                    h || (h = yt(b, "", ""));
                    if (1 == b.a.length) xt(h.$, d, 0, f);
                    else {
                        var k = d;
                        var l = f;
                        var m = b.a;
                        h = h.$;
                        for (var n = [], r, w = l.firstChild; w; w = r) (r = w.nextSibling), Ct(w);
                        for (r = l.firstChild; r; r = r.nextSibling)
                            r.attributes && r.attributes.i
                                ? ((l = parseInt(r.attributes.i.nodeValue, 10)),
                                  !isNaN(l) &&
                                      0 <= l &&
                                      l < m.length &&
                                      (m[l].ee && n[l]
                                          ? (n[l].T +=
                                                r.firstChild && 3 == r.firstChild.nodeType
                                                    ? r.firstChild.nodeValue
                                                    : Kg(r))
                                          : (n[l] = xt(h, k, l, r))))
                                : 3 == r.nodeType && h.push({ R: -1, T: De(r.nodeValue) });
                        null != h &&
                            0 < h.length &&
                            -1 == h[0].R &&
                            (1 == h.length
                                ? (h[0].R = 0)
                                : ((h[1].T = h[0].T + h[1].T), h.shift()));
                    }
                    h = void 0;
                }
            f = b.b;
            for (k = 0; k < f.length - 1; ++k)
                (m = f[k]),
                    (h = ze(m.$[m.$.length - 1].T)),
                    (h = h.charCodeAt(h.length - 1)),
                    (12288 <= h && 12351 >= h) ||
                        (65280 <= h && 65519 >= h) ||
                        (m.$[m.$.length - 1].T += " ");
            sg(e);
            for (e = 0; e < b.a.length; ++e)
                e < d.length &&
                    e < b.l.length &&
                    null != d[e] &&
                    ((f = b.l[e]),
                    (k = d[e].start),
                    null != k &&
                        ((m = f.substring(0, f.length - ye(f).length)),
                        " " == m && (m = ""),
                        m && (k.T = m + ye(k.T))),
                    (k = d[e].end),
                    null != k &&
                        ((f = f.substring(ze(f).length)),
                        " " == f && (f = ""),
                        f && (k.T = ze(k.T) + f)));
            1 != b.b.length || b.b[0].lf || (b.b[0].lf = b.f);
            c.write(b.f, b.b);
            zt(b);
        }
        b.H || (this.W = !1);
        c = b.g ? !0 : void 0;
        a.K += b.G;
        null != c && (a.qa = !0);
        b = Math.min(Math.floor((100 * a.K) / a.f), 100);
        if (a.o != b || c) (a.o = b), a.L ? (a.l(a.o, !0, c), a.W(a.K)) : a.l(a.o, !1, c);
        return !1;
    };
    x.rg = function(a, b) {
        if (!this.b) return Gm;
        if (!Mm(a)) return Fm;
        if (1 < cu(b)) {
            a = b.g[0];
            var c = b.b;
            if (a.c || 0 == c.length || null == a.a || 0 == a.a.length) a = null;
            else {
                for (var d = [], e = [], f = 0; f < a.a.length && f < c.length; ++f) {
                    var h = a.a[f];
                    (h && h[0] && 200 == h[1]) || (e.push(c[f]), d.push(a.g[f]));
                }
                a = 0 < e.length ? { ij: new Qt(d, !0), jj: e } : null;
            }
            a = a ? new iu([a.ij], a.jj, b.f, b.a, b.c, b.wa, b.H, b.l) : null;
            null != a && su(this, b.f, a, this.Dd);
        } else {
            a = !1;
            for (c = 0; c < b.g.length; ++c)
                (d = b.g[c]),
                    d.c || (200 == d.b && d.a && d.a[0])
                        ? (d = d.f = !1)
                        : ((d.c = !0), (d = d.f = !0)),
                    (a = d || a);
            if (a) return this.Dd;
        }
        d = this.cb();
        a = this.oa();
        if (1 < b.b.length)
            if (((c = b.g[0]), (e = d == Ha), (d = b.b), 200 == c.b))
                for (f = 0; f < c.a.length && f < d.length; ++f)
                    if ((h = c.a[f]) && 200 == h[1]) {
                        var k = h[2],
                            l = d[f],
                            m = l,
                            n = null != k && k == a;
                        m.o = h[0];
                        void 0 !== n && (m.C = n);
                        l.H = e && null == k;
                    } else d[f].g = !0;
            else for (a = 0; a < d.length; ++a) d[a].g = !0;
        else {
            c = new Pt(d == Ha);
            for (d = 0; d < b.g.length; ++d)
                (h = b.g[d]),
                    (e = a),
                    (f = c),
                    200 == h.b && h.a && h.a[0]
                        ? ((h = h.a[0]),
                          f.a.push(h[0]),
                          (h = h[2]),
                          (f.b = f.b && null != h && h == e),
                          null != h && (f.f = !1))
                        : 500 != h.b && (f.c = !0);
            null != b.B && (c.a.push(b.B), (b.B = null));
            if ((a = b.b[0]))
                (d = c.b), (a.o = c.ea()), void 0 !== d && (a.C = d), (a.H = c.f), (a.g = c.c);
        }
        if (this.h) {
            a = C(this.Pf, this);
            for (c = 0; c < b.b.length; c++) a(b.f, b.b[c]);
            for (c = 0; c < b.s.length; c++) a(b.f, b.s[c]);
            ku(b);
            b.K = !0;
            b.C && b.l && ((b = b.l), 0 == --b.b && gu(b.a));
        }
        return Gm;
    };
    function pu(a) {
        a.J && a.J.disconnect();
        a.va && a.va.reset();
        a.b && (a.H.stop(), (a.b = !1), (a.G = !1));
        if (a.o.length) {
            for (var b = 0; b < a.o.length; ++b) a.o[b].M();
            a.o = [];
        }
        null != a.C && (a.C.restore(), (a.C = null));
        null != a.ca && (a.ca.restore(), (a.ca = null));
    }
    function ru(a, b) {
        a.getAttribute("xml:lang") && a.setAttribute("xml:lang", b);
        a.getAttribute("lang") && a.setAttribute("lang", b);
    }
    function uu(a, b, c, d, e, f, h, k, l, m, n) {
        R.call(this);
        this.K = b || null;
        this.L = !!c;
        this.C = d || "transparent";
        this.g = f || "";
        b = h || { fetchStart: 0, zk: 0 };
        a = b.fetchStart || 0;
        b = b.fetchEnd || 0;
        this.G = a && b ? b - a : 0;
        this.J = D() - Dq;
        this.s = !1;
        this.b = new Tr(e || "", void 0, f, l, m, n);
        this.H = new Bm(1);
        this.o = new st();
        this.f = null;
        this.h = !0;
        this.l = null != y.IntersectionObserver;
        this.B = k || null;
        new fi(this);
        e = new Tq();
        f = new Vq(C(this.b.l, this.b, e.register()));
        this.qd = Wq(f, e.delay(C(this.qd, this)));
        this.md = Wq(f, e.delay(C(this.md, this)));
        this.de = Wq(f, e.delay(C(this.de, this)));
        this.restore = Wq(f, e.delay(C(this.restore, this)));
        f.finish();
        e.finish();
    }
    E(uu, R);
    ir(14097, uu.prototype, {
        $e: function() {
            br(this.b.c ? "te_afas" : "te_afau");
        }
    });
    x = uu.prototype;
    x.lj = fc("l");
    x.Ua = function() {
        return this.b.c;
    };
    x.qd = function(a, b) {
        if (this.b.Ua()) {
            var c = this.b,
                d = { alpha: !0 };
            b && (d.hl = b);
            c.g.send(d, a);
        } else this.$e(), a(null);
    };
    x.md = function(a) {
        var b = document.documentElement.lang;
        if (b) a(b);
        else if (this.b.Ua()) {
            var c = new hn(document.body, !1, !1, 1, 1);
            b = [];
            try {
                for (var d = 0, e = this.b.b.Hg; b.length + d < e; ) {
                    var f = c.next();
                    if (1 == c.c && Mt(f)) c.g();
                    else if (3 == f.nodeType) {
                        var h = Sc(we(f.nodeValue));
                        h && (b.push(h), (d += h.length));
                    }
                }
            } catch (k) {
                if (k != vj) throw k;
            }
            e = this.b;
            b = b.join(" ");
            a = e.b.wc(a);
            e.b.na.send({ q: b.substring(0, e.b.Hg), sl: Ha, tl: "en" }, a);
        } else this.$e(), a(null, !0);
    };
    x.de = function(a, b, c, d, e) {
        var f = D();
        jr();
        if (!a || hr(a, b)) a = Ha;
        if (e || a != this.a || b != this.c) this.o = new st();
        this.a = a;
        this.c = b;
        this.b.Ua()
            ? ((d = d || document.documentElement),
              this.f && this.f.M(),
              this.B.reset(),
              (this.f = new ou(
                  d,
                  this.b,
                  this.K,
                  this.L,
                  this.C,
                  !0,
                  this.H,
                  this.o,
                  this.l,
                  this.B
              )),
              (this.f.jb = this.s),
              (this.h = !0),
              this.f.translate(a, b, c, e, C(this.Ri, this, f, a, b)))
            : (this.$e(), c(0, !1, !0));
    };
    x.tj = function() {
        return !!this.f && this.f.b;
    };
    x.Xg = fc("s");
    x.restore = function() {
        jr();
        this.b.Ua() && this.f && this.f.restore();
    };
    x.F = function() {
        kr();
        uu.m.F.call(this);
        this.b.M();
        this.f = this.b = null;
        this.o = new st();
    };
    x.Ri = function(a, b, c, d) {
        this.h &&
            ((this.h = !1),
            (b = { sl: b, tl: c, textlen: d }),
            this.s && (b.ctt = "1"),
            "" != this.g && (b.sp = this.g),
            0 != this.g.indexOf("nmt") && (b.sp = "" != this.g ? "nmt," + this.g : "nmt"),
            (b.ttt = D() - a),
            (b.ttl = this.J),
            this.G && (b.ttf = this.G),
            this.l && (b.sr = 1),
            br("te_time", b));
    };
    function vu(a) {
        T.call(this, a);
        this.l = new fi(this);
    }
    E(vu, T);
    x = vu.prototype;
    x.D = function() {
        var a = Ng(this.b, "select");
        a.className = "goog-te-combo";
        a.setAttribute("aria-label", Z.Kf);
        this.S(a);
    };
    x.O = function() {
        vu.m.O.call(this);
        this.Xf();
    };
    x.Xf = function() {
        S(this.j(), Oa, Zq(this, Oa));
        this.dispatchEvent(zb);
    };
    x.Z = function() {
        vu.m.Z.call(this);
        this.l.M();
        this.l = null;
    };
    function wu(a, b) {
        a.j().parentNode != b && (a.j().parentNode.removeChild(a.j()), b.appendChild(a.j()));
    }
    x.Uc = function(a) {
        this.b.Rc(this.j());
        for (var b in a)
            if (a[b] !== Object.prototype[b]) {
                var c = this.b.D(qa, { value: b });
                this.b.ib(c, a[b]);
                this.j().appendChild(c);
            }
        this.j().selectedIndex = 0;
    };
    x.Aa = function() {
        return this.j().value;
    };
    x.ya = function(a) {
        if (this.j().value != a)
            for (var b = 0, c; (c = this.j().options.item(b)); ++b)
                if (c.value == a) {
                    this.j().selectedIndex = b;
                    break;
                }
    };
    x.ae = function(a) {
        if ("undefined" == A(a)) return this.j().options.item(this.j().selectedIndex).text;
        for (var b = 0, c; (c = this.j().options.item(b)); ++b) if (c.value == a) return c.text;
    };
    x.ka = function(a) {
        this.j().disabled = !a;
    };
    function xu(a) {
        vu.call(this, a);
    }
    E(xu, vu);
    xu.prototype.Db = function(a) {
        this.Uc.call(this, a);
    };
    function yu(a, b) {
        vu.call(this, b);
        this.a = (a && nd(a)) || {};
        this.a.rf = this.a.rf || 11;
        this.a.Yd = 0 != this.a.Yd;
        this.a.Va || (this.a.Va = Oq);
    }
    E(yu, vu);
    x = yu.prototype;
    x.gd = function() {
        throw Error("Not implemented.");
    };
    x.D = function() {
        this.gd();
        this.o = this.j();
        this.f = hg(na, { frameBorder: 0, class: "goog-te-menu-frame skiptranslate", title: Z.Kf });
        this.f.style.visibility = cc;
        Q(this.f, !1);
        document.body.appendChild(this.f);
    };
    x.Xf = function() {
        var a = xd.test(Aq) ? Qb : "ltr",
            b = Hr(this.a.Va),
            c = V(this, "menuBody");
        this.l.w(this.f, zb, this.yj);
        cr(
            this.f,
            C(function() {
                var d = Cg(this.f);
                var e = lk(
                    ja +
                        X(zk(b)) +
                        '"></head><body scroll="no" style="margin:0px;overflow:hidden" dir="' +
                        X(a) +
                        '" marginHeight=0 marginWidth=0 leftMargin=0 topMargin=0 border=0><div id="' +
                        X(c) +
                        '" class="goog-te-menu"></div></body>'
                );
                e = fk(e);
                d.write(ge(e));
                d.close();
            }, this)
        );
    };
    x.yj = function() {
        this.c = new Vf(Cg(this.f));
        this.L = this.c.j(V(this, "menuBody"));
        this.l.w(this.o, Sa, this.Ne);
        I ? this.l.w(this.f, Ka, this.Cd) : this.l.w(Dg(this.f), Ka, this.Cd);
        this.dispatchEvent(zb);
    };
    x.Z = function() {
        yu.m.Z.call(this);
        sg(this.f);
        this.o = this.P = this.h = this.L = this.c = this.f = null;
    };
    x.pg = function(a) {
        this.g != a.currentTarget.value && (this.ya(a.currentTarget.value), this.dispatchEvent(Oa));
        this.Cd();
    };
    x.Ne = function() {
        zu(this);
        Dg(this.f).focus();
        this.W = !0;
    };
    x.Cd = function() {
        this.W && ((this.W = !1), zu(this, !1), gg(O(this.o)).focus());
    };
    x.nf = ec();
    x.pf = ec();
    function zu(a, b) {
        if ("undefined" == typeof b || b) {
            a.pf();
            b = bh(a.o, window);
            var c = b.y + a.o.offsetHeight,
                d = b.y - a.C.height,
                e = b.x,
                f = b.x + a.o.offsetWidth - a.C.width;
            if (I && !L("7.0")) {
                var h = document.body;
                c -= h.offsetTop;
                d -= h.offsetTop;
                e -= h.offsetLeft;
                f -= h.offsetLeft;
            } else (h = eg(document)), (c -= h.y), (d -= h.y), (e -= h.x), (f -= h.x);
            h = cg(window);
            b.y = b.y <= h.height - a.C.height ? c : d;
            b.y > h.height - a.C.height && (b.y = h.height - a.C.height);
            0 > b.y && (b.y = 0);
            xd.test(Aq) ? (b.x = 0 <= f ? f : e) : (b.x = e <= h.width - a.C.width ? e : f);
            b.x > h.width - a.C.width && (b.x = h.width - a.C.width);
            0 > b.x && (b.x = 0);
            Vg(a.f, b);
            Q(a.f, !0);
            Au(a);
        } else a.nf(), Q(a.f, !1);
    }
    x.Aa = u("g");
    x.Uc = function(a) {
        this.c.Rc(this.L);
        Q(this.f, !0);
        this.ca = a;
        this.h = [];
        for (var b in a)
            if (a[b] !== Object.prototype[b])
                if ("---" == a[b]) {
                    var c = {
                        link: this.c.D(g, { className: "goog-te-menu2-separator", value: b }),
                        Gi: !0
                    };
                    this.h.push(c);
                } else {
                    c = { link: this.c.D("A", { className: nb, href: wb, value: b }) };
                    this.h.push(c);
                    var d = this.c.D(g, { style: "white-space:nowrap" });
                    this.c.appendChild(c.link, d);
                    this.a.Yd &&
                        this.c.appendChild(d, this.c.D(ua, { className: "indicator" }, "\u203a"));
                    this.c.appendChild(d, this.c.D(ua, { className: "text" }, a[b]));
                    this.l.w(c.link, Sa, this.pg);
                }
        a = this.h.length - 1;
        a = Math.round((a - (a % this.a.rf)) / this.a.rf) + 1;
        this.P = this.c.D("TABLE", { cellspacing: 0, cellpadding: 0, border: 0 });
        c = this.c.D("TBODY");
        b = this.c.D("TR", { valign: "top" });
        this.L.className = "goog-te-menu2";
        this.c.appendChild(this.L, this.P);
        this.c.appendChild(this.P, c);
        this.c.appendChild(c, b);
        for (d = c = 0; c < a; ++c) {
            var e = this.c.D("TD");
            this.c.appendChild(b, e);
            for (var f = 0; 11 > f && d < this.h.length; ++f, ++d)
                this.c.appendChild(e, this.h[d].link);
            c != a - 1 &&
                ((e = this.c.D("TD", { class: "goog-te-menu2-colpad" }, "\u00a0")),
                this.c.appendChild(b, e));
        }
        this.g = null;
        this.ya(this.h[0].link.value);
        Au(this);
        Q(this.f, !1);
    };
    x.ae = function(a) {
        a = "undefined" == A(a) ? this.g : a;
        return this.ca[a];
    };
    x.qf = ec();
    x.ya = function(a) {
        if (this.g != a) {
            this.ae(a) && ((this.g = a), this.qf());
            for (var b = 0; b < this.h.length; ++b) {
                var c = this.h[b];
                c.Gi ||
                    (c.link.className = c.link.value == a && this.a.Yd ? nb : "goog-te-menu2-item");
            }
        }
    };
    function Au(a) {
        kh(a.L, jh(a.P));
        kh(a.f, jh(a.L));
        a.C = jh(a.f);
    }
    function Bu(a, b) {
        yu.call(this, a, b);
    }
    E(Bu, yu);
    x = Bu.prototype;
    x.gd = function() {
        var a = this.b.D("a", { "aria-haspopup": "true" });
        a.className = mb;
        a.href = wb;
        this.H = this.b.D(ua);
        a.appendChild(this.H);
        this.J = this.b.D("IMG", {
            src: vb,
            alt: "",
            style: "background-image:url(" + Lq + ");background-position:-14px 0px;border:none",
            width: 14,
            height: 14
        });
        a.appendChild(this.J);
        this.S(a);
    };
    x.nf = function() {
        P(this.J, Ja, "-14px 0px");
    };
    x.pf = function() {
        P(this.J, Ja, "0px 0px");
    };
    x.Z = function() {
        Bu.m.Z.call(this);
        this.J = this.H = null;
    };
    x.qf = function() {
        this.b.ib(this.H, this.ae(this.g) || "");
    };
    x.Db = function(a) {
        this.Uc.call(this, a);
    };
    function Cu(a, b) {
        yu.call(this, a, b);
    }
    E(Cu, yu);
    x = Cu.prototype;
    x.gd = function() {
        var a = this.b.D("a", { "aria-haspopup": "true" });
        a.className = mb;
        a.href = wb;
        this.H = this.b.D(ua);
        a.appendChild(this.H);
        a.appendChild(this.b.D("IMG", { src: vb, alt: "", width: 1, height: 1 }));
        a.appendChild(this.b.D(ua, { style: "border-left:1px solid #bbb" }, "\u200b"));
        a.appendChild(this.b.D("IMG", { src: vb, alt: "", width: 1, height: 1 }));
        this.J = this.b.D("span", { style: "color:#767676", "aria-hidden": "true" }, "\u25bc");
        a.appendChild(this.J);
        this.S(a);
    };
    x.nf = function() {
        P(this.J, "color", "#9b9b9b");
    };
    x.pf = function() {
        P(this.J, "color", "#d5d5d5");
    };
    x.Z = function() {
        Cu.m.Z.call(this);
        this.J = this.H = null;
    };
    x.qf = function() {
        this.b.ib(this.H, this.ae(this.g) || "");
    };
    x.Db = function(a) {
        this.Uc.call(this, a);
    };
    function Du(a, b) {
        yu.call(this, a, b);
        this.a.Yd = !1;
    }
    E(Du, yu);
    Du.prototype.gd = function() {
        var a = Ng(this.b, Za);
        a.className = "goog-te-button";
        var b = this.b.D(g, { style: "background: url(" + Kq + ") repeat-x 0 -39px" });
        a.appendChild(b);
        this.H = Ng(this.b, Ma);
        b.appendChild(this.H);
        this.S(a);
    };
    Du.prototype.Wg = function(a) {
        pg(this.H);
        this.H.appendChild(this.b.a.createTextNode(String(a + "\u00a0\u25bc")));
    };
    Du.prototype.Z = function() {
        Du.m.Z.call(this);
        this.H = null;
    };
    Du.prototype.pg = function(a) {
        this.ya(a.currentTarget.value);
        this.dispatchEvent(Oa);
        this.Cd();
    };
    function Eu(a, b) {
        T.call(this, b);
        this.a = (a && nd(a)) || {};
        this.c = new fi(this);
    }
    E(Eu, T);
    var Fu = { vk: 0, Wj: 1, kk: 2 };
    x = Eu.prototype;
    x.D = function() {
        var a = Ng(this.b, Za);
        M(a, Sb);
        M(a, "goog-te-gadget");
        a.dir = xd.test(Aq) ? Qb : "ltr";
        Q(a, !1);
        if (2 == this.a.Rb) a.innerHTML = fs({ id: V(this, Vb), Rg: "", Qg: "" });
        else {
            var b = Z.rh(gs() || "");
            a.innerHTML = fs({
                id: V(this, Vb),
                Rg: "",
                Qg: Fr(1 == this.a.Rb ? "&nbsp;&nbsp;" + b : b)
            });
        }
        this.S(a);
    };
    x.O = function() {
        Eu.m.O.call(this);
        this.f = 2 == this.a.Rb ? new Cu(null, this.b) : new xu(this.b);
        this.c.w(this.f, Oa, Zq(this, Ra));
        this.c.w(this.f, zb, this.wj);
        var a = this.b.j(V(this, Vb));
        if (2 == this.a.Rb) {
            var b = this.b.D("IMG", { src: vb, class: "goog-te-gadget-icon", alt: "" });
            b.style.backgroundImage = "url(" + Lq + ")";
            b.style.backgroundPosition = "-65px 0px";
            var c = this.b.D(ua, { style: "vertical-align: middle" });
            a.appendChild(b);
            a.appendChild(c);
            this.f.fa(c);
            a.style.whiteSpace = "nowrap";
            a.className = "goog-te-gadget-simple";
        } else this.f.fa(a), 1 == this.a.Rb && (a.style.display = "inline");
    };
    x.wj = function() {
        if (2 == this.a.Rb) {
            var a = this.f,
                b = this.b.j(V(this, Vb));
            a.l.ba(a.o, Sa, a.Ne);
            a.o = b;
            a.l.w(a.o, Sa, a.Ne);
        }
        this.dispatchEvent(zb);
    };
    x.Z = function() {
        Eu.m.Z.call(this);
        this.c.M();
        this.c = null;
        this.f.M();
        this.f = null;
    };
    x.oa = function() {
        return this.f.Aa();
    };
    x.ua = function(a) {
        "" == a ? this.H && this.f.Db(this.H) : this.C && this.f.Db(this.C);
        this.f.ya(a);
    };
    x.I = function(a) {
        Q(this.j(), a);
    };
    x.ka = function(a) {
        this.f.ka(a);
    };
    x.yf = function(a, b) {
        this.H = a;
        this.C = b;
    };
    function Gu() {
        Uf();
    }
    Gu.prototype.fa = function(a) {
        a = a({}, {});
        this.a(null, a && a.Ib);
    };
    function Hu(a, b) {
        b = b || {};
        var c = b.top,
            d = b.left,
            e = b.bottom,
            f = b.right,
            h = b.id;
        b = mk(
            "." +
                Ak(b.className) +
                " {z-index:9999999; overflow:visible; position:fixed; _position:absolute;" +
                (c || 0 == c
                    ? "top:" +
                      Ak(c) +
                      "px; _top:expression((" +
                      Ak(c) +
                      "+(hack1=document.documentElement.scrollTop||document.body.scrollTop))+'px');"
                    : "top:auto;") +
                (d || 0 == d
                    ? "left:" +
                      Ak(d) +
                      "px; _left:expression((" +
                      Ak(d) +
                      "+(hack2=document.documentElement.scrollLeft||document.body.scrollLeft))+'px');"
                    : "left:auto;") +
                (e || 0 == e
                    ? "bottom:" +
                      Ak(e) +
                      "px; _top:expression((-" +
                      Ak(e) +
                      da +
                      String(h).replace(Gk, Ek) +
                      "').offsetHeight+(hack3=document.documentElement.clientHeight||document.body.clientHeight)+(hack4=document.documentElement.scrollTop||document.body.scrollTop))+'px');"
                    : "bottom:auto;") +
                (f || 0 == f
                    ? "right:" +
                      Ak(f) +
                      "px; _left:expression((-" +
                      Ak(f) +
                      da +
                      String(h).replace(Gk, Ek) +
                      "').offsetWidth+(hack5=document.documentElement.clientWidth||document.body.clientWidth)+(hack6=document.documentElement.scrollLeft||document.body.scrollLeft))+'px');"
                    : "right:auto;") +
                "}"
        );
        a.a(null, b.Ib);
        return de(b.toString());
    }
    Gu.prototype.a = z;
    function Iu(a, b) {
        T.call(this, b);
        this.a = (a && nd(a)) || {};
        this.a.Va || (this.a.Va = Oq);
        this.c = new fi(this);
    }
    E(Iu, T);
    var Ju = { pk: 1, qk: 2, Kj: 3, Jj: 4 };
    x = Iu.prototype;
    x.D = function() {
        var a = Ng(this.b, Za);
        this.ga = !1;
        Q(a, !1);
        var b = V(this, Va);
        a.innerHTML = lk(
            '<iframe id="' +
                X(b) +
                '" frameBorder=0 class="goog-te-ftab-frame skiptranslate" style="visibility:visible"></iframe>'
        );
        this.S(a);
    };
    x.O = function() {
        Iu.m.O.call(this);
        var a = xd.test(Aq) ? Qb : "ltr",
            b = Hr(this.a.Va),
            c = V(this, ac);
        this.j().id = V(this, "floatContainer");
        var d = { id: this.j().id, className: "goog-te-ftab-float" };
        this.j().className += " goog-te-ftab-float";
        switch (this.a.ld) {
            case 2:
                var e = gb;
                d.top = 0;
                d.right = 20;
                break;
            case 3:
                e = fb;
                d.bottom = 0;
                d.right = 20;
                break;
            case 4:
                e = fb;
                d.bottom = 0;
                d.left = 20;
                break;
            default:
                (e = gb), (d.top = 0), (d.left = 20);
        }
        eh(Hu(new Gu(), d), this.j());
        this.l = this.b.j(V(this, Va));
        this.c.w(this.l, zb, this.xj);
        cr(
            this.l,
            C(function() {
                var f = Cg(this.l);
                var h = e;
                h = lk(
                    ja +
                        X(zk(b)) +
                        '"></head><body class="goog-te-ftab ' +
                        X(h) +
                        '" scroll="no" style="overflow:hidden" dir="' +
                        X(a) +
                        '"><a id="' +
                        X(c) +
                        '" href="#" class="goog-te-ftab-link"><img src="' +
                        X(xk(vb)) +
                        aa +
                        X(xk(Lq)) +
                        ');background-position:-65px 0px"><span>' +
                        kk(Z.Mf) +
                        "</span></a></body>"
                );
                h = fk(h);
                f.write(ge(h));
                f.close();
            }, this)
        );
    };
    x.xj = function() {
        this.f = new Vf(Cg(this.l)).j(V(this, ac));
        this.c.w(this.f, Sa, Zq(this, "clk_trans"));
        Q(this.j(), !0);
        var a = jh(this.f);
        Q(this.j(), !1);
        kh(this.l, a);
        kh(this.j(), a);
        this.dispatchEvent(zb);
    };
    x.Z = function() {
        Iu.m.Z.call(this);
        this.c.M();
        this.c = null;
        sg(this.l);
        this.f = this.l = null;
    };
    x.isVisible = u("ga");
    x.I = function(a) {
        this.ga = a;
        Q(this.j(), a);
    };
    function Ku(a, b) {
        T.call(this, b);
        this.h = new fi(this);
        this.a = (a && nd(a)) || {};
        this.a.Va || (this.a.Va = Oq);
        this.a.Af = !1;
        P(this.b.a.body, Kb, "relative");
        nf || P(this.b.a.body, "minHeight", "100%");
        P(this.b.a.documentElement, "height", "100%");
        P(this.b.a.body, "top", "0px");
        I &&
            ((window._bannerquirkfixleft = -parseInt("0" + this.b.a.body.leftMargin, 10)),
            (window._bannerquirkfixtop = -parseInt("0" + this.b.a.body.topMargin, 10) - 40));
    }
    E(Ku, T);
    x = Ku.prototype;
    x.fa = function() {
        var a = this.b.a.body.firstChild;
        vi(this, a.parentNode, a);
    };
    x.D = function() {
        var a = Ng(this.b, Za);
        this.ga = !1;
        Q(a, !1);
        M(a, Sb);
        var b = V(this, Va);
        a.innerHTML = lk(
            '<iframe id="' +
                X(b) +
                '" class="goog-te-banner-frame skiptranslate" frameBorder=0 style="visibility:visible"></iframe>'
        );
        this.S(a);

        // EDGE TRANSLATE MODIFICATION START
        notifyEdgeTranslate("banner_created", { translator: "google" });
        // EDGE TRANSLATE MODIFICATION END
    };
    x.O = function() {
        Ku.m.O.call(this);
        var a = xd.test(Aq) ? Qb : "ltr",
            b = Hr(this.a.Va),
            c = V(this, "promptSection"),
            d = V(this, "confirm"),
            e = V(this, Lb),
            f = V(this, "progressValue"),
            h = V(this, "cancel"),
            k = V(this, "finishSection"),
            l = V(this, "restore"),
            m = V(this, "errorSection"),
            n = V(this, "errorContent"),
            r = V(this, "close"),
            w = V(this, "noAutoPopup"),
            G,
            F = [];
        this.a.Af && F.push(es({ id: V(this, Mb) }));
        F.push(es({ id: V(this, Nb) }));
        var ca = Fr(Z.Bh.apply(null, F));
        F = [];
        this.a.Af && F.push(es({ id: V(this, ab) }));
        F.push(es({ id: V(this, bb) }));
        var Zl = Fr(Z.wh.apply(null, F));
        this.a.ah && (G = this.a.ah);
        this.l = this.b.j(V(this, Va));
        this.h.w(this.l, zb, this.uj);
        cr(
            this.l,
            C(function() {
                var hf = Cg(this.l);
                var ub = G;
                ub = lk(
                    ja +
                        X(zk(b)) +
                        '"></head><body class="goog-te-banner" scroll="no" border=0 dir="' +
                        X(a) +
                        '"><table border=0 cellspacing=0 cellpadding=0 width=100% height=100%><tr valign=middle><td width=1 nowrap><a href="' +
                        X(sk(tb)) +
                        '" class="goog-logo-link" target="_blank"><img src="' +
                        X(
                            xk(
                                "https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_68x28dp.png"
                            )
                        ) +
                        '" alt="Google ' +
                        X(Z.Xc) +
                        '"></a></td>' +
                        (ub
                            ? '<td width=1><img src="' +
                              X(xk(vb)) +
                              '" width="9" height="15" title="' +
                              X(ub) +
                              '" alt="' +
                              X(ub) +
                              aa +
                              X(xk(Lq)) +
                              ');background-position:-56px 0px;margin:0 4px"></td>'
                            : "") +
                        '<td class="goog-te-banner-margin"></td><td><table border=0 cellspacing=0 cellpadding=0 height=100%><tr id="' +
                        X(c) +
                        '" style="display:none" valign=middle><td nowrap><span class="goog-te-banner-content">' +
                        kk(ca) +
                        ia +
                        X(d) +
                        '"><b>' +
                        kk(Z.Mf) +
                        '</b></button></div></div></td><td class="goog-te-banner-margin"></td><td nowrap><div class="goog-te-button"><div><button id="' +
                        X(w) +
                        '"></button></div></div></td></tr><tr id="' +
                        X(e) +
                        '" style="display:none" valign=middle><td><span class="goog-te-banner-content">' +
                        kk(Z.xh) +
                        '&nbsp;<span dir="ltr">(<b id="' +
                        X(f) +
                        '"></b>%)</span>&nbsp;<img src="' +
                        X(xk(Nq)) +
                        '"></span></td><td class="goog-te-banner-margin"></td><td nowrap><div class="goog-te-button"><div><button id="' +
                        X(h) +
                        '">' +
                        kk(Z.Hf) +
                        ha +
                        X(k) +
                        '" style="display:none"><td><span class="goog-te-banner-content">' +
                        kk(Zl) +
                        ia +
                        X(l) +
                        '">' +
                        kk(Z.sh) +
                        ha +
                        X(m) +
                        '" style="display:none" valign=middle><td><span id="' +
                        X(n) +
                        '" class="goog-te-banner-content"></span></td></tr></table></td><td><td class="goog-te-banner-margin"></td></td><td width=1 id="options"></td><td width=1><a id="' +
                        X(r) +
                        '" class="goog-close-link" href="#" title="' +
                        X(Z.If) +
                        '"><img src="' +
                        X(xk(vb)) +
                        '" width="15" height="15" alt="' +
                        X(Z.If) +
                        aa +
                        X(xk(Lq)) +
                        ');background-position:-28px 0px"></a></td></tr></table></body>'
                );
                ub = fk(ub);
                hf.write(ge(ub));
                hf.close();
            }, this)
        );
    };
    x.uj = function() {
        this.c = new Vf(Cg(this.l));
        Lu(this, Z.Jf);
        if (this.a.Va == Oq) {
            var a = "url(" + Kq + ")";
            P(this.c.a.body, Ia, a);
            for (var b = this.c.a.getElementsByTagName(Ma), c = 0; c < b.length; ++c) {
                var d = b[c].parentNode;
                P(d, Ia, a);
                P(d, "backgroundRepeat", "repeat-x");
                P(d, Ja, "0 -39px");
            }
        }
        this.a.Af && (this.g = new Bu(this.a, this.c));
        this.f = new Bu(this.a, this.c);
        this.o = new Du(this.a, this.c);
        this.h.w(this.c.j(V(this, "confirm")), Sa, Zq(this, "clk_confirm"));
        this.h.w(this.c.j(V(this, "cancel")), Sa, Zq(this, "clk_cancel"));
        this.h.w(this.c.j(V(this, "restore")), Sa, Zq(this, "clk_restore"));
        this.h.w(this.c.j(V(this, "close")), Sa, Zq(this, "clk_close"));
        this.L = this.c.j(V(this, "noAutoPopup"));
        this.h.w(this.L, Sa, Zq(this, "clk_no_ap"));
        this.g && this.h.w(this.g, Oa, Zq(this, "chg_src_lang"));
        this.h.w(this.f, Oa, Zq(this, Ra));
        this.h.w(this.o, Oa, this.pi);
        a = new Tq(C(this.vj, this));
        this.g && this.h.w(this.g, zb, a.register());
        this.h.w(this.f, zb, a.register());
        this.h.w(this.o, zb, a.register());
        a.finish();
        this.g && this.g.fa(this.c.j(V(this, Mb)));
        this.f.fa(this.c.j(V(this, Nb)));
        this.o.fa(this.c.j("options"));
    };
    x.vj = function() {
        this.o.Wg(Z.ph);
        this.o.Uc({ turn_off_site: Z.zh, s1: "---", learn_more: Z.oh });
        this.dispatchEvent(zb);
    };
    x.pi = function() {
        switch (this.o.Aa()) {
            case "learn_more":
                window.open(Rq, "_blank");
                break;
            case "turn_off_site":
                this.dispatchEvent(Ta);
        }
    };
    x.Z = function() {
        this.I(!1);
        Ku.m.Z.call(this);
        this.h.M();
        this.h = null;
        this.g && (this.g.M(), (this.g = null));
        this.f.M();
        this.f = null;
        this.o.M();
        this.o = null;
        sg(this.l);
        this.zc = this.c = null;
    };
    x.cb = function() {
        return this.g ? this.g.Aa() : "";
    };
    x.oa = function() {
        return this.f.Aa();
    };
    x.Tb = function(a) {
        this.g && this.g.ya(a);
        this.J && this.J[a] && this.c.ib(this.L, Z.yh(this.J[a]));
    };
    x.ua = function(a) {
        this.f.ya(a);
    };
    function Mu(a, b, c, d) {
        if (a.zc != b) {
            a.zc = b;
            if (0 == b) {
                a.g && wu(a.g, a.c.j(V(a, Mb)));
                if (a.H) {
                    var e = a.oa();
                    a.f.Db(a.H);
                    a.ua(e);
                }
                wu(a.f, a.c.j(V(a, Nb)));
            } else
                2 == b &&
                    (a.g && wu(a.g, a.c.j(V(a, ab))),
                    a.C && ((e = a.oa()), a.f.Db(a.C), a.ua(e)),
                    wu(a.f, a.c.j(V(a, bb))));
            e = {};
            e[-1] = a.c.j(V(a, "errorSection"));
            e[0] = a.c.j(V(a, "promptSection"));
            e[1] = a.c.j(V(a, Lb));
            e[2] = a.c.j(V(a, "finishSection"));
            for (var f in e) e[f] !== Object.prototype[f] && Q(e[f], f == b);
        }
        c && a.I(!0);
        a.L.parentNode.parentNode.style.display = d ? "block" : q;
    }
    x.isVisible = u("ga");
    x.I = function(a) {
        if (this.ga != a) {
            this.ga = a;
            if (I)
                var b = parseInt("0" + this.b.a.body.leftMargin, 10),
                    c = parseInt("0" + this.b.a.body.topMargin, 10);
            var d = "BackCompat" == this.b.a.compatMode;
            // EDGE TRANSLATE MODIFICATION START
            if (a) {
               (P(this.b.a.body, "top", "40px"),
                  Q(this.j(), !0),
                  I &&
                      (L("7.0")
                          ? ((window._bannerquirkfixleft = window._bannerquirkfixtop = 0),
                            d && (this.b.a.body.topMargin = c + 40))
                          : d
                          ? ((this.b.a.body.topMargin = c + 40),
                            (window._bannerquirkfixleft = window._bannerquirkfixtop = 0))
                          : ((window._bannerquirkfixleft = -b),
                            (window._bannerquirkfixtop = -c - 40))));

                notifyEdgeTranslate("page_moved", { translator: "google", distance: 40 });
            } else {
                (P(this.b.a.body, "top", "0px"),
                  Q(this.j(), !1),
                  d && 40 <= c && (this.b.a.body.topMargin = c - 40));

                notifyEdgeTranslate("page_moved", { translator: "google", distance: -40 });
            }
            // EDGE TRANSLATE MODIFICATION END
        }
    };
    x.wf = function(a) {
        this.c.ib(this.c.j(V(this, "progressValue")), a);
    };
    function Lu(a, b) {
        a.c.ib(a.c.j(V(a, "errorContent")), b);
    }
    x.yf = function(a, b) {
        this.H = a;
        this.C = b;
        this.f.Db(a);
    };
    function Nu(a, b) {
        R.call(this);
        A(a) == t && ((b = a), (a = {}));
        A(b) == t && (b = Wf(document, String(b)));
        this.ca = b;
        this.h = new fi(this);
        this.Vb = this.W = void 0;
        a = Object(a);
        this.g = Ha;
        !(b = window.parent != window) &&
            (b =
                (!window.external ||
                    !window.external.googleToolbarVersion ||
                    6.2 > parseFloat(window.external.googleToolbarVersion)) &&
                (!window.gtbExternal ||
                    !window.gtbExternal.isTranslateEnabled ||
                    !window.gtbExternal.isTranslateEnabled())) &&
            ((b =
                navigator.appVersion &&
                navigator.appVersion.match(/\sChrome\/((\d+)\.(\d+)\.[\d\.]+)\s/)),
            (b = !(b && b[2] && b[3] && 4001 <= 1e3 * Number(b[2]) + Number(b[3]))));
        this.a = {
            me: b,
            $f: !1,
            ne: null,
            cd: null,
            Te: [],
            Zf: [],
            Lh: !1,
            lc: !1,
            $a: "",
            ag: !1,
            we: "",
            Rb: 0,
            Vf: !1
        };
        this.qa = { Va: Oq, ah: "https://" == Jq ? Z.uh : null };
        this.P = { Va: Oq, ld: null };
        a &&
            ("autoDisplay" in a && (this.a.me = this.a.me && !!a.autoDisplay),
            "multilanguagePage" in a && (this.a.lc = !!a.multilanguagePage),
            "gaTrack" in a && (this.a.ag = !!a.gaTrack),
            "layout" in a && (this.a.Rb = a.layout),
            a.pageLanguage && (this.a.Wd = $q(a.pageLanguage)),
            a.includedLanguages && (this.a.Te = a.includedLanguages.split(",")),
            a.excludedLanguages && (this.a.Zf = a.excludedLanguages.split(",")),
            this.a.Wd && (this.g = this.a.Wd),
            a.key && (this.a.$a = a.key),
            a.gaId && (this.a.we = a.gaId),
            (this.P.ld = Number(a.floatPosition) || this.P.ld),
            "disableAutoTranslation" in a && (this.a.Vf = !!a.disableAutoTranslation),
            a.jwtToken && (this.W = new Rr(a.jwtToken)),
            a.jwtTokenProvider && (this.W = new Sr(a.jwtTokenProvider)),
            a.translateErrorHandler && (this.Vb = a.translateErrorHandler));
        !this.a.Vf && Ou(this) && (this.a.$f = !0);
        this.s = {};
        if ((a = document.cookie.match(/(^|; )googtransopt=(.*?)(;|$)/)) && a[2])
            for (this.s = {}, a = Be(a[2]).split("|"), b = 0; b < a.length; ++b) {
                var c = a[b].split("=");
                c[0] && (this.s[c[0]] = c[1]);
            }
        this.va = new ht(
            { $a: this.a.$a, Kb: 1, zf: !0, Dk: Qq },
            { client: Gq, u: window.location.href }
        );
        this.B = new uu(
            void 0,
            this.va,
            void 0,
            void 0,
            this.a.$a,
            void 0,
            void 0,
            new hu(),
            this.W,
            this.Vb
        );
        this.G = !1;
        this.h.w(window, "unload", this.M);
        this.K = new Tq(C(this.ji, this));
        this.C = new Tq(C(this.mi, this));
        this.L = new Vq(C(this.Hi, this));
        this.b = new Ku(this.qa);
        this.B.qd(this.K.register(C(this.ii, this)), Aq);
        this.ca
            ? ((this.f = new Eu(this.a)),
              this.h.w(this.f, zb, this.K.register()),
              this.h.w(this.f, Ra, Wq(this.L, this.C.delay(C(this.hi, this)))),
              this.f.fa(this.ca))
            : this.P.ld &&
              ((this.l = new Iu(this.P)),
              this.h.w(this.l, zb, this.K.register()),
              this.h.w(this.l, "clk_trans", Wq(this.L, this.C.delay(C(this.gi, this)))),
              this.l.fa());
        !this.a.Wd && this.a.Lh && this.B.md(this.K.register(C(this.di, this)));
        this.K.finish();
    }
    E(Nu, R);
    function Ou(a) {
        function b(f, h) {
            if (
                (f = Be(f).match(
                    "^\\((([a-zA-Z\\-_]*)\\|)?([a-zA-Z\\-_]*)\\)|^/(([a-zA-Z\\-_]*)/)?([a-zA-Z\\-_]*)"
                ))
            ) {
                if (f[3]) return (h.a.ne = f[2]), (h.a.cd = f[3]), !0;
                if (f[6]) return (h.a.ne = f[5]), (h.a.cd = f[6]), !0;
            }
            return !1;
        }
        var c = {
                url: function() {
                    var f = window.location.href.match(/#.*googtrans(.*)/);
                    return f && f[1];
                },
                cookie: function() {
                    var f = document.cookie.match(/(^|; )googtrans=(.*?)(;|$)/);
                    return f && f[2];
                }
            },
            d;
        for (d in c)
            if (c[d] !== Object.prototype[d]) {
                var e = c[d]();
                if (e && b(e, a)) return d;
            }
        return "";
    }
    function Pu(a, b) {
        for (var c = window.location.hostname.split("."); 2 < c.length; ) c.shift();
        c = ";domain=" + c.join(".");
        null != b
            ? (a = a + "=" + b)
            : ((b = new Date()),
              b.setTime(b.getTime() - 1),
              (a = a + "=none;expires=" + b.toGMTString()));
        a += ";path=/";
        document.cookie = a;
        try {
            document.cookie = a + c;
        } catch (d) {}
    }
    function Qu(a, b) {
        var c = null;
        void 0 !== b && (c = void 0 !== a ? "/" + a + "/" + b : "/" + b);
        Pu("googtrans", c);
    }
    x = Nu.prototype;
    x.ii = function(a) {
        this.c = $q(Aq);
        this.H = a || {};
        this.o = {};
        this.J = {};
        a = !this.a.Te.length;
        var b = Sq(this.a.Te),
            c = Sq(this.a.Zf);
        this.o[Aq] = "";
        this.J[Aq] = "";
        for (var d in this.H.tl)
            this.H.tl[d] === Object.prototype[d] ||
                !(a || d in b) ||
                d in c ||
                ((this.J[d] = this.H.tl[d]), d == this.a.Wd && !this.a.lc) ||
                (this.o[d] = this.H.tl[d]);
        this.o[Aq] || delete this.o[Aq];
        this.J[Aq] || delete this.J[Aq];
        this.la = nd(this.H.sl);
    };
    x.di = function(a) {
        a && (this.g = $q(a));
    };
    x.ji = function() {
        delete this.K;
        if (this.H) {
            this.g = this.g || this.a.ne;
            this.c = this.a.cd || this.c;
            var a =
                this.a.$f ||
                (this.a.me &&
                    this.g != this.c &&
                    !(this.g in Eq) &&
                    "1" != this.s.os &&
                    "1" != this.s["o" + this.g]);
            "zh-TW" == this.g && (this.g = "zh-CN");
            this.la[this.g] || ((a = !1), (this.g = Ha));
            if (!this.o[this.c])
                if (((a = !1), this.o.en)) this.c = "en";
                else
                    for (var b in this.o)
                        if (this.o[b] !== Object.prototype[b]) {
                            this.c = b;
                            break;
                        }
            if (this.f) {
                var c = this.o,
                    d = { "": Z.th };
                for (b in c) c[b] !== Object.prototype[b] && (d[b] = c[b]);
                this.f.yf(d, this.J);
                this.f.ua("");
            }
            !Cq && a
                ? this.a.cd
                    ? Wq(this.L, this.C.delay(C(this.Xd, this, !0, !0))).call()
                    : ((this.G = !0),
                      Wq(this.L, this.C.delay(C(this.Xd, this))).call(),
                      br("te_ap", { sl: this.g }))
                : (this.l && this.l.I(!0), this.f && this.f.I(!0));
            window.google.translate.TranslateService && this.ka(!1);
            this.L.finish();
        }
    };
    x.mi = function() {
        var a = this.b,
            b = this.la;
        a.g && a.g.Db(b);
        a.J = b;
        this.b.yf(this.o, this.J);
        this.b.Tb(this.g);
        this.b.ua(this.c);
        this.h.w(this.b, "clk_confirm", this.Yh);
        this.h.w(this.b, "clk_cancel", this.Xh);
        this.h.w(this.b, "clk_restore", this.Le);
        this.h.w(this.b, "clk_close", this.Bd);
        this.h.w(this.b, "clk_no_ap", this.Zh);
        this.h.w(this.b, Ta, this.$h);
        this.h.w(this.b, "chg_src_lang", this.kg);
        this.h.w(this.b, Ra, this.kg);
        this.f && this.f.I(!0);
    };
    x.Hi = function() {
        this.h.w(this.b, zb, this.C.register());
        this.b.fa();
        this.C.finish();
    };
    x.F = function() {
        this.B.restore();
        Nu.m.F.call(this);
        this.B.M();
        this.h.M();
        this.h = null;
        this.b && this.b.M();
        this.b = null;
        this.l && this.l.M();
        this.l = null;
        this.f && this.f.M();
        this.ca = this.f = null;
    };
    x.Yh = function() {
        !this.b.isVisible() ||
            (!this.a.lc && hr(this.g, this.b.oa())) ||
            (this.G && br("te_apt", { sl: this.g }),
            Ru(this, !1),
            this.f && this.f.ua(this.b.oa()));
    };
    x.Xh = function() {
        this.b.isVisible() && (Su(this), Mu(this.b, 0), this.f && this.f.ua(""));
    };
    x.Le = function() {
        this.b.isVisible() && (Su(this), Mu(this.b, 0));
        this.f && this.f.ua("");
    };
    x.Bd = function() {
        this.b.isVisible() &&
            (this.G && ((this.G = !1), br("te_apc", { sl: this.g })),
            Su(this),
            this.b.I(!1),
            this.f && this.f.ua(""),
            this.l && this.l.I(!0));
    };
    x.Zh = function() {
        this.b.isVisible() &&
            ((this.s["o" + this.g] = "1"), br("te_apr", { sl: this.g }), (this.G = !1), this.Bd());
    };
    x.$h = function() {
        if (this.b.isVisible()) {
            this.G = !1;
            this.s.os = "1";
            var a = null;
            if (this.s) {
                a = [];
                for (var b in this.s)
                    this.s[b] !== Object.prototype[b] && a.push(b + "=" + this.s[b]);
                a = a.join("|");
            }
            Pu("googtransopt", a);
            this.Bd();
        }
    };
    x.kg = function() {
        this.b.isVisible() &&
            (!this.a.lc && hr(this.g, this.b.oa())
                ? this.Le()
                : ((this.g = this.b.cb() || this.g),
                  (this.c = this.b.oa()),
                  2 == this.b.zc && (this.f && this.f.ua(this.b.oa()), Ru(this))));
    };
    x.Xd = function(a, b) {
        this.b.isVisible() || (this.l && this.l.I(!1), a ? Ru(this, b) : Mu(this.b, 0, !0, this.G));
    };
    x.oj = function(a, b) {
        Wq(this.L, this.C.delay(C(this.Xd, this, a, b))).call();
    };
    x.gi = function() {
        this.Xd(2 == this.b.zc);
    };
    x.hi = function() {
        this.f.oa()
            ? !this.a.lc && hr(this.g, this.b.oa())
                ? this.Le()
                : ((this.c = this.f.oa()), this.b.ua(this.c), Ru(this))
            : this.f.ua(this.c);
    };
    function Ru(a, b) {
        if (window.google.translate.TranslateService)
            try {
                window.google.translate.TranslateService.getInstance().restore();
            } catch (c) {}
        Qu(a.g, a.c);
        a.G = !1;
        !b && a.g in Eq && br("te_ape", { sl: a.g });
        a.b.wf(0);
        Mu(a.b, 1, !0);
        a.B.Xg(!!b);
        window.setTimeout(C(a.B.de, a.B, a.a.lc ? Ha : a.g, a.c, C(a.vi, a), void 0, void 0), 0);
        if (a.a.ag && window._gaq && window._gat)
            try {
                a.a.we
                    ? window._gat._getTracker(a.a.we)._trackEvent(ma, "Translate", a.c)
                    : window._gat._getTrackerByName()._trackEvent(ma, "Translate", a.c);
            } catch (c) {}
    }
    x.vi = function(a, b, c) {
        A(this.ra) == p && this.ra();
        this.b.isVisible() &&
            1 == this.b.zc &&
            (c
                ? (Su(this), Mu(this.b, -1, !0), 2 == c ? Lu(this.b, Z.nh) : Lu(this.b, Z.Jf))
                : (this.b.wf(a),
                  b && (this.f && this.f.ua(this.c), this.b.Tb(this.g), Mu(this.b, 2))));
    };
    function Su(a) {
        Qu();
        window.setTimeout(C(a.B.restore, a.B, null), 0);
    }
    x.ka = function(a) {
        a || this.Bd();
        this.f && this.f.ka(a);
        this.l && this.l.I(a);
    };
    function Tu(a) {
        if (a && ((a = String(a)), (a = a.split(".")), a.length)) {
            for (var b = window, c = 0; c < a.length; ++c) {
                var d = a[c];
                if (!(d && d in b)) return;
                b = b[d];
            }
            return b;
        }
    }
    var Uu = Tu("google.translate.m");
    if (Uu)
        for (var Vu in Z)
            if (Z[Vu] !== Object.prototype[Z[Vu]] && Z[Vu]) {
                var Wu = Z[Vu]();
                Z[Vu] = Uu[Wu] ? Uu[Wu] : ds;
            }
    if (1 == Fq) {
        var Xu = null,
            Yu = function(a) {
                if (!Xu) {
                    var b, c, d, e;
                    a &&
                        ("key" in a && (b = a.key),
                        "serverParams" in a && (c = a.serverParams),
                        "timeInfo" in a && (d = a.timeInfo),
                        "remoteApiProxyHandlers" in a && (e = a.remoteApiProxyHandlers),
                        (a =
                            (a = window.location.hash.match(
                                /google\.translate\.element\.sp=([^&]+)/
                            )) && a[1]
                                ? a[1]
                                : null) && (c = a));
                    a = 0;
                    if ("te_lib" == Gq || Re) a = 3;
                    Xu = new uu(
                        void 0,
                        new ht({ $a: b, Kb: a, zf: !0, trackVisibility: "tvis" == c }),
                        void 0,
                        void 0,
                        b,
                        c,
                        d,
                        new hu(),
                        void 0,
                        void 0,
                        e
                    );
                    Xu.constructor = z;
                    Xu.isAvailable = Xu.Ua;
                    Xu.getSupportedLanguages = Xu.qd;
                    Xu.getPageLanguage = Xu.md;
                    Xu.setClickThrough = Xu.Xg;
                    Xu.translatePage = Xu.de;
                    Xu.restore = Xu.restore;
                    Xu.isTranslating = Xu.tj;
                    Xu.setCheckVisibility = Xu.lj;
                }
                return Xu;
            };
        Yu.getInstance = function() {
            return Xu;
        };
        zc("google.translate.TranslateService", Yu);
        br("te_li");
    } else {
        var Zu = null,
            $u = function(a, b) {
                Zu || ((Zu = new Nu(a, b)), (Zu.constructor = z));
                return Zu;
            };
        $u.getInstance = function() {
            return Zu;
        };
        zc("google.translate.TranslateElement", $u);
        Nu.prototype.dispose = Nu.prototype.M;
        Nu.prototype.showBanner = Nu.prototype.oj;
        Nu.prototype.setEnabled = Nu.prototype.ka;
        zc("google.translate.TranslateElement.FloatPosition", Ju);
        Ju.TOP_LEFT = 1;
        Ju.TOP_RIGHT = 2;
        Ju.BOTTOM_RIGHT = 3;
        Ju.BOTTOM_LEFT = 4;
        zc("google.translate.TranslateElement.InlineLayout", Fu);
        Fu.VERTICAL = 0;
        Fu.HORIZONTAL = 1;
        Fu.SIMPLE = 2;
    }
    (function() {
        for (var a in Object.prototype) {
            gd = function(d, e, f) {
                for (var h in d) d[h] !== Object.prototype[h] && e.call(f, d[h], h, d);
            };
            break;
        }
        var b = D(),
            c = Tu(Bq);
        c &&
            A(c) == p &&
            (1 == Fq
                ? c()
                : (function e() {
                      var f = document.readyState;
                      "undefined" == A(f) || f == Ua || "interactive" == f || 2e4 <= D() - b
                          ? c()
                          : window.setTimeout(e, 500);
                  })());
    })();
}.call(window));
