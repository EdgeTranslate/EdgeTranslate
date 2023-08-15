"use strict";
this.default_tr = this.default_tr || {};
(function(_) {
    var window = this;
    try {
        var Uh;
        _.Ih = function(a) {
            return _.Ca ? _.Da ? _.Da.brands.some(function(b) {
                return (b = b.brand) && -1 != b.indexOf(a)
            }) : !1 : !1
        }
        ;
        _.Jh = function() {
            return _.Ea() ? _.Ih("Microsoft Edge") : _.u("Edg/")
        }
        ;
        _.Kh = function() {
            return _.u("Firefox") || _.u("FxiOS")
        }
        ;
        _.Lh = function() {
            return _.Ea() ? _.Ih("Chromium") : (_.u("Chrome") || _.u("CriOS")) && !_.Ha() || _.u("Silk")
        }
        ;
        _.Mh = function() {
            return _.u("Safari") && !(_.Lh() || (_.Ea() ? 0 : _.u("Coast")) || _.Fa() || _.Ha() || _.Jh() || (_.Ea() ? _.Ih("Opera") : _.u("OPR")) || _.Kh() || _.u("Silk") || _.u("Android"))
        }
        ;
        _.Nh = function() {
            return _.u("Android") && !(_.Lh() || _.Kh() || _.Fa() || _.u("Silk"))
        }
        ;
        _.Oh = function(a) {
            if (!_.og) {
                a: {
                    var b = document.createElement("a");
                    try {
                        b.href = a
                    } catch (c) {
                        a = void 0;
                        break a
                    }
                    a = b.protocol;
                    a = ":" === a || "" === a ? "https:" : a
                }
                return a
            }
            try {
                b = new URL(a)
            } catch (c) {
                return "https:"
            }
            return b.protocol
        }
        ;
        _.Ph = function(a) {
            if ("javascript:" !== _.Oh(a))
                return a
        }
        ;
        _.Qh = function(a) {
            return Array.prototype.slice.call(a)
        }
        ;
        _.Rh = function(a) {
            return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
        }
        ;
        Uh = function(a, b, c, d, e, f) {
            if (null != a) {
                if (Array.isArray(a))
                    a = e && 0 == a.length && (0,
                    _.Sh)(a) & 1 ? void 0 : f && (0,
                    _.Sh)(a) & 2 ? a : _.Th(a, b, c, void 0 !== d, e, f);
                else if (_.Rh(a)) {
                    var g = {}, h;
                    for (h in a)
                        g[h] = Uh(a[h], b, c, d, e, f);
                    a = g
                } else
                    a = b(a, d);
                return a
            }
        }
        ;
        _.Th = function(a, b, c, d, e, f) {
            var g = d || c ? (0,
            _.Sh)(a) : 0;
            d = d ? !!(g & 32) : void 0;
            a = _.Qh(a);
            for (var h = 0; h < a.length; h++)
                a[h] = Uh(a[h], b, c, d, e, f);
            c && c(g, a);
            return a
        }
        ;
        _.Xh = function(a) {
            return a.ke === _.Vh ? a.Ik() : _.Wh && null != a && a instanceof Uint8Array ? new Uint8Array(a) : a
        }
        ;
        _.Yh = function(a) {
            return a instanceof _.Mc && a.constructor === _.Mc ? a.g : "type_error:SafeUrl"
        }
        ;
        _.Zh = _.Kh();
        _.$h = _.Ja() || _.u("iPod");
        _.ai = _.u("iPad");
        _.bi = _.Nh();
        _.ci = _.Lh();
        _.di = _.Mh() && !_.Ka();
        _.Wh = "undefined" !== typeof Uint8Array;
        _.ei = !_.E && "function" === typeof btoa;
        var fi;
        fi = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;
        _.gi = fi ? function(a, b) {
            a[fi] |= b
        }
        : function(a, b) {
            void 0 !== a.g ? a.g |= b : Object.defineProperties(a, {
                g: {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !1
                }
            })
        }
        ;
        _.hi = fi ? function(a, b) {
            a[fi] &= ~b
        }
        : function(a, b) {
            void 0 !== a.g && (a.g &= ~b)
        }
        ;
        _.Sh = fi ? function(a) {
            return a[fi] | 0
        }
        : function(a) {
            return a.g | 0
        }
        ;
        _.ii = fi ? function(a) {
            return a[fi]
        }
        : function(a) {
            return a.g
        }
        ;
        _.ji = fi ? function(a, b) {
            a[fi] = b
        }
        : function(a, b) {
            void 0 !== a.g ? a.g = b : Object.defineProperties(a, {
                g: {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !1
                }
            })
        }
        ;
        var li;
        _.Vh = {};
        li = [];
        (0,
        _.ji)(li, 39);
        _.ki = Object.freeze(li);
        _.mi = "undefined" != typeof structuredClone ? structuredClone : function(a) {
            return _.Th(a, _.Xh, void 0, void 0, !1, !1)
        }
        ;
    } catch (e) {
        _._DumpException(e)
    }
    try {
        var qi, ri, si, wi, zi, Di, Ei, Fi, Hi, Oi, Bi, Ai, xi;
        _.ni = function(a) {
            var b = (0,
            _.Sh)(a);
            1 !== (b & 1) && (Object.isFrozen(a) && (a = _.Qh(a)),
            (0,
            _.ji)(a, b | 1));
            return a
        }
        ;
        _.oi = function(a, b) {
            Object.isFrozen(a) && (a = _.Qh(a));
            (0,
            _.ji)(a, b);
            return a
        }
        ;
        _.pi = function(a) {
            (0,
            _.gi)(a, 1);
            return a
        }
        ;
        qi = function(a, b) {
            (0,
            _.ji)(b, (a | 0) & -99)
        }
        ;
        ri = function(a, b) {
            (0,
            _.ji)(b, (a | 34) & -73)
        }
        ;
        si = function(a) {
            a = a >> 11 & 1023;
            return 0 === a ? 536870912 : a
        }
        ;
        _.ti = function(a) {
            if (a & 2)
                throw Error();
        }
        ;
        _.ui = function(a) {
            if ("boolean" !== typeof a)
                throw Error("ea`" + _.wb(a) + "`" + a);
            return !!a
        }
        ;
        _.vi = function(a) {
            return null == a || "string" === typeof a ? a : void 0
        }
        ;
        wi = function(a, b, c) {
            var d = !1;
            if (null != a && "object" === typeof a && !(d = Array.isArray(a)) && a.ke === _.Vh)
                return a;
            if (d) {
                var e = d = (0,
                _.Sh)(a);
                0 === e && (e |= c & 32);
                e |= c & 2;
                e !== d && (0,
                _.ji)(a, e);
                return new b(a)
            }
        }
        ;
        _.yi = function(a, b) {
            xi = b;
            a = new a(b);
            xi = void 0;
            return a
        }
        ;
        zi = function(a, b, c) {
            for (var d = 1023 + b, e = a.length, f = d; f < e; f++) {
                var g = a[f];
                null != g && g !== c && (c[f - b] = g)
            }
            a.length = d + 1;
            a[d] = c
        }
        ;
        _.H = function(a, b, c) {
            null == a && (a = xi);
            xi = void 0;
            if (null == a) {
                var d = 96;
                c ? (a = [c],
                d |= 512) : a = [];
                b && (d = d & -2095105 | (b & 1023) << 11)
            } else {
                if (!Array.isArray(a))
                    throw Error();
                d = (0,
                _.Sh)(a);
                if (d & 64)
                    return a;
                d |= 64;
                if (c && (d |= 512,
                c !== a[0]))
                    throw Error();
                a: {
                    c = a;
                    var e = c.length;
                    if (e) {
                        var f = e - 1
                          , g = c[f];
                        if (_.Rh(g)) {
                            d |= 256;
                            b = (d >> 9 & 1) - 1;
                            e = f - b;
                            1024 <= e && (zi(c, b, g),
                            e = 1023);
                            d = d & -2095105 | (e & 1023) << 11;
                            break a
                        }
                    }
                    b && (g = (d >> 9 & 1) - 1,
                    b = Math.max(b, e - g),
                    1024 < b && (zi(c, g, {}),
                    d |= 256,
                    b = 1023),
                    d = d & -2095105 | (b & 1023) << 11)
                }
            }
            (0,
            _.ji)(a, d);
            return a
        }
        ;
        _.Ci = function(a) {
            switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "boolean":
                return a ? 1 : 0;
            case "object":
                if (a && !Array.isArray(a) && _.Wh && null != a && a instanceof Uint8Array) {
                    if (_.ei) {
                        for (var b = "", c = 0, d = a.length - 10240; c < d; )
                            b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
                        b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                        a = btoa(b)
                    } else {
                        void 0 === b && (b = 0);
                        if (!Ai) {
                            Ai = {};
                            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
                            d = ["+/=", "+/", "-_=", "-_.", "-_"];
                            for (var e = 0; 5 > e; e++) {
                                var f = c.concat(d[e].split(""));
                                Bi[e] = f;
                                for (var g = 0; g < f.length; g++) {
                                    var h = f[g];
                                    void 0 === Ai[h] && (Ai[h] = g)
                                }
                            }
                        }
                        b = Bi[b];
                        c = Array(Math.floor(a.length / 3));
                        d = b[64] || "";
                        for (e = f = 0; f < a.length - 2; f += 3) {
                            var k = a[f]
                              , m = a[f + 1];
                            h = a[f + 2];
                            g = b[k >> 2];
                            k = b[(k & 3) << 4 | m >> 4];
                            m = b[(m & 15) << 2 | h >> 6];
                            h = b[h & 63];
                            c[e++] = g + k + m + h
                        }
                        g = 0;
                        h = d;
                        switch (a.length - f) {
                        case 2:
                            g = a[f + 1],
                            h = b[(g & 15) << 2] || d;
                        case 1:
                            a = a[f],
                            c[e] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
                        }
                        a = c.join("")
                    }
                    return a
                }
            }
            return a
        }
        ;
        Di = function(a, b, c) {
            a = _.Qh(a);
            var d = a.length
              , e = b & 256 ? a[d - 1] : void 0;
            d += e ? -1 : 0;
            for (b = b & 512 ? 1 : 0; b < d; b++)
                a[b] = c(a[b]);
            if (e) {
                b = a[b] = {};
                for (var f in e)
                    b[f] = c(e[f])
            }
            return a
        }
        ;
        Ei = function(a) {
            return a.ke === _.Vh ? a.toJSON() : _.Ci(a)
        }
        ;
        Fi = function(a, b, c) {
            c = void 0 === c ? ri : c;
            if (null != a) {
                if (_.Wh && a instanceof Uint8Array)
                    return b ? a : new Uint8Array(a);
                if (Array.isArray(a)) {
                    var d = (0,
                    _.Sh)(a);
                    if (d & 2)
                        return a;
                    if (b && !(d & 64) && (d & 32 || 0 === d))
                        return (0,
                        _.ji)(a, d | 34),
                        a;
                    a = _.Th(a, Fi, d & 4 ? ri : c, !0, !1, !0);
                    b = (0,
                    _.Sh)(a);
                    b & 4 && b & 2 && Object.freeze(a);
                    return a
                }
                a.ke === _.Vh && (b = a.O,
                c = (0,
                _.ii)(b),
                a = c & 2 ? a : _.yi(a.constructor, _.Gi(b, c, !0)));
                return a
            }
        }
        ;
        _.Gi = function(a, b, c) {
            var d = c || b & 2 ? ri : qi
              , e = !!(b & 32);
            a = Di(a, b, function(f) {
                return Fi(f, e, d)
            });
            (0,
            _.gi)(a, 32 | (c ? 2 : 0));
            return a
        }
        ;
        Hi = function(a) {
            var b = a.O
              , c = (0,
            _.ii)(b);
            return c & 2 ? _.yi(a.constructor, _.Gi(b, c, !1)) : a
        }
        ;
        _.Ii = function(a, b, c, d, e) {
            var f = si(b);
            if (c >= f || e) {
                e = b;
                if (b & 256)
                    f = a[a.length - 1];
                else {
                    if (null == d)
                        return;
                    f = a[f + ((b >> 9 & 1) - 1)] = {};
                    e |= 256
                }
                f[c] = d;
                e &= -1025;
                e !== b && (0,
                _.ji)(a, e)
            } else
                a[c + ((b >> 9 & 1) - 1)] = d,
                b & 256 && (d = a[a.length - 1],
                c in d && delete d[c]),
                b & 1024 && (0,
                _.ji)(a, b & -1025)
        }
        ;
        _.Ki = function(a, b, c, d) {
            var e = b & 2;
            a = _.Ji(a, b, c, d);
            Array.isArray(a) || (a = _.ki);
            b = (0,
            _.Sh)(a);
            b & 1 || _.pi(a);
            e ? b & 2 || (0,
            _.gi)(a, 34) : b & 32 && !(b & 2) && (0,
            _.hi)(a, 32);
            return a
        }
        ;
        _.Li = function(a, b, c, d) {
            var e = a.O
              , f = (0,
            _.ii)(e);
            _.ti(f);
            _.Ii(e, f, b, c !== d ? c : void 0);
            return a
        }
        ;
        _.Mi = function(a, b, c, d, e, f) {
            var g = !!(b & 2)
              , h = _.Ki(a, b, d, e);
            if (h === _.ki || !((0,
            _.Sh)(h) & 4)) {
                var k = h;
                h = !!(b & 2);
                var m = !!((0,
                _.Sh)(k) & 2);
                g = k;
                !h && m && (k = _.Qh(k));
                var n = b | (m ? 2 : 0);
                m = m || void 0;
                for (var p = 0, q = 0; p < k.length; p++) {
                    var r = wi(k[p], c, n);
                    void 0 !== r && (m = m || (0,
                    _.ii)(r.O) & 2,
                    k[q++] = r)
                }
                q < p && (k.length = q);
                c = k;
                k = (0,
                _.Sh)(c);
                n = k | 5;
                m = m ? n & -9 : n | 8;
                k != m && (c = _.oi(c, m));
                k = c;
                g !== k && _.Ii(a, b, d, k, e);
                (h && 2 !== f || 1 === f) && Object.freeze(k);
                return k
            }
            if (3 === f)
                return h;
            g ? 2 === f && (f = (0,
            _.Sh)(h),
            h = _.Qh(h),
            (0,
            _.ji)(h, f),
            _.Ii(a, b, d, h, e)) : (g = Object.isFrozen(h),
            1 === f ? g || Object.freeze(h) : (f = (0,
            _.Sh)(h),
            c = f & -35,
            g && (h = _.Qh(h),
            f = 0,
            _.Ii(a, b, d, h, e)),
            f !== c && (0,
            _.ji)(h, c)));
            return h
        }
        ;
        _.Ni = function(a, b) {
            return null != a ? a : b
        }
        ;
        Oi = function(a, b, c) {
            var d = a.constructor.pb
              , e = si((0,
            _.ii)(c ? a.O : b))
              , f = !1;
            if (d) {
                if (!c) {
                    b = _.Qh(b);
                    var g;
                    if (b.length && _.Rh(g = b[b.length - 1]))
                        for (f = 0; f < d.length; f++)
                            if (d[f] >= e) {
                                Object.assign(b[b.length - 1] = {}, g);
                                break
                            }
                    f = !0
                }
                e = b;
                c = !c;
                g = (0,
                _.ii)(a.O);
                a = si(g);
                g = (g >> 9 & 1) - 1;
                for (var h, k, m = 0; m < d.length; m++)
                    if (k = d[m],
                    k < a) {
                        k += g;
                        var n = e[k];
                        null == n ? e[k] = c ? _.ki : _.pi([]) : c && n !== _.ki && _.ni(n)
                    } else
                        h || (n = void 0,
                        e.length && _.Rh(n = e[e.length - 1]) ? h = n : e.push(h = {})),
                        n = h[k],
                        null == h[k] ? h[k] = c ? _.ki : _.pi([]) : c && n !== _.ki && _.ni(n)
            }
            d = b.length;
            if (!d)
                return b;
            var p;
            if (_.Rh(h = b[d - 1])) {
                a: {
                    var q = h;
                    e = {};
                    c = !1;
                    for (var r in q)
                        a = q[r],
                        Array.isArray(a) && a != a && (c = !0),
                        null != a ? e[r] = a : c = !0;
                    if (c) {
                        for (var w in e) {
                            q = e;
                            break a
                        }
                        q = null
                    }
                }
                q != h && (p = !0);
                d--
            }
            for (; 0 < d; d--) {
                h = b[d - 1];
                if (null != h)
                    break;
                var D = !0
            }
            if (!p && !D)
                return b;
            var Q;
            f ? Q = b : Q = Array.prototype.slice.call(b, 0, d);
            b = Q;
            f && (b.length = d);
            q && b.push(q);
            return b
        }
        ;
        _.Pi = function(a) {
            return function(b) {
                b = JSON.parse(b);
                if (!Array.isArray(b))
                    throw Error("ia`" + _.wb(b) + "`" + b);
                (0,
                _.gi)(b, 34);
                return new a(b)
            }
        }
        ;
        _.Qi = function(a, b, c, d, e, f, g) {
            var h = new _.bh;
            _.eh.push(h);
            b && h.J("complete", b);
            h.Xb("ready", h.V);
            f && (h.o = Math.max(0, f));
            g && (h.F = g);
            h.send(a, c, d, e)
        }
        ;
        Bi = {};
        Ai = null;
        _.Ji = function(a, b, c, d) {
            if (-1 === c)
                return null;
            if (c >= si(b)) {
                if (b & 256)
                    return a[a.length - 1][c]
            } else {
                var e = a.length;
                if (d && b & 256 && (d = a[e - 1][c],
                null != d))
                    return d;
                b = c + ((b >> 9 & 1) - 1);
                if (b < e)
                    return a[b]
            }
        }
        ;
        _.Si = function(a, b) {
            a = a.O;
            return _.Ji(a, (0,
            _.ii)(a), b)
        }
        ;
        _.Ti = function(a, b, c, d) {
            var e = a.O
              , f = (0,
            _.ii)(e);
            _.ti(f);
            _.Ii(e, f, b, c, d);
            return a
        }
        ;
        _.Ui = function(a, b, c, d) {
            a = a.O;
            var e = (0,
            _.ii)(a)
              , f = _.Ji(a, e, c, d);
            b = wi(f, b, e);
            b !== f && null != b && _.Ii(a, e, c, b, d);
            return b
        }
        ;
        _.Vi = function(a, b, c, d) {
            d = void 0 === d ? !1 : d;
            b = _.Ui(a, b, c, d);
            if (null == b)
                return b;
            a = a.O;
            var e = (0,
            _.ii)(a);
            if (!(e & 2)) {
                var f = Hi(b);
                f !== b && (b = f,
                _.Ii(a, e, c, b, d))
            }
            return b
        }
        ;
        _.Wi = function(a, b, c) {
            var d = a.O
              , e = (0,
            _.ii)(d);
            a = !!(e & 2);
            b = _.Mi(d, e, b, c, void 0, a ? 1 : 2);
            if (!(a || (0,
            _.Sh)(b) & 8)) {
                for (c = 0; c < b.length; c++)
                    a = b[c],
                    d = Hi(a),
                    a !== d && (b[c] = d);
                (0,
                _.gi)(b, 8)
            }
            return b
        }
        ;
        _.I = function(a, b, c) {
            null == c && (c = void 0);
            return _.Ti(a, b, c)
        }
        ;
        _.Xi = function(a, b) {
            return _.Ni(_.vi(_.Si(a, b)), "")
        }
        ;
        _.Yi = function(a, b) {
            if (null == b || "" == b)
                return new a;
            b = JSON.parse(b);
            if (!Array.isArray(b))
                throw Error(void 0);
            (0,
            _.gi)(b, 32);
            return _.yi(a, b)
        }
        ;
        _.J = function(a, b, c) {
            this.O = _.H(a, b, c)
        }
        ;
        _.J.prototype.toJSON = function() {
            if (_.Ri)
                var a = Oi(this, this.O, !1);
            else
                a = _.Th(this.O, Ei, void 0, void 0, !1, !1),
                a = Oi(this, a, !0);
            return a
        }
        ;
        _.J.prototype.Ik = function() {
            return Oi(this, _.Th(this.O, _.Xh, void 0, void 0, !1, !1), !0)
        }
        ;
        _.J.prototype.ke = _.Vh;
        _.J.prototype.toString = function() {
            return Oi(this, this.O, !1).toString()
        }
        ;
    } catch (e) {
        _._DumpException(e)
    }
    try {
        _.gj = function(a) {
            if (null == a)
                return a;
            if ("string" === typeof a) {
                if (!a)
                    return;
                a = +a
            }
            return "number" === typeof a ? a : void 0
        }
        ;
        _.hj = function(a, b) {
            b = _.Bb(_.ca, b);
            a.Ca ? b() : (a.ha || (a.ha = []),
            a.ha.push(b))
        }
        ;
    } catch (e) {
        _._DumpException(e)
    }
    try {
        var pk;
        _.nk = function(a, b) {
            b = b instanceof _.Mc ? _.Yh(b) : _.Ph(b);
            void 0 !== b && (a.href = b)
        }
        ;
        _.ok = {};
        pk = {};
        _.qk = function(a) {
            this.g = a;
            this.nb = !0
        }
        ;
        _.qk.prototype.toString = function() {
            return this.g.toString()
        }
        ;
        _.qk.prototype.Sa = function() {
            return this.g
        }
        ;
        _.rk = {};
        _.yg = function() {
            throw Error("O");
        }
        ;
        _.yg.prototype.Te = null;
        _.yg.prototype.na = function() {
            return this.g
        }
        ;
        _.yg.prototype.toString = function() {
            return this.g
        }
        ;
        _.yg.prototype.Xc = function() {
            if (this.Db !== _.rk)
                throw Error("P");
            return _.ad(this.toString())
        }
        ;
        var sk = function() {
            _.yg.call(this)
        };
        _.A(sk, _.yg);
        sk.prototype.Db = _.rk;
        var tk = function() {
            _.yg.call(this)
        };
        _.A(tk, _.yg);
        tk.prototype.Db = _.ok;
        tk.prototype.Te = 1;
        tk.prototype.l = function() {
            return new _.qk(this.toString(),pk)
        }
        ;
        _.L = function(a) {
            function b(c) {
                this.g = c
            }
            b.prototype = a.prototype;
            return function(c, d) {
                c = new b(String(c));
                void 0 !== d && (c.Te = d);
                return c
            }
        }(sk);
        _.uk = function(a) {
            function b(c) {
                this.g = c
            }
            b.prototype = a.prototype;
            return function(c) {
                return new b(String(c))
            }
        }(tk);
    } catch (e) {
        _._DumpException(e)
    }
    try {
        var wk, xk, Ak, Dk, Bk, Ck, Ek, Fk, Hk, Kk, Lk;
        _.vk = function(a, b) {
            return _.sd(a.g, b)
        }
        ;
        wk = function() {
            this.o = !1;
            this.h = null;
            this.j = void 0;
            this.g = 1;
            this.B = this.s = 0;
            this.l = null
        }
        ;
        xk = function(a) {
            if (a.o)
                throw new TypeError("g");
            a.o = !0
        }
        ;
        wk.prototype.A = function(a) {
            this.j = a
        }
        ;
        var yk = function(a, b) {
            a.l = {
                Oi: b,
                Gj: !0
            };
            a.g = a.s || a.B
        };
        wk.prototype.return = function(a) {
            this.l = {
                return: a
            };
            this.g = this.B
        }
        ;
        _.zk = function(a, b, c) {
            a.g = c;
            return {
                value: b
            }
        }
        ;
        Ak = function(a) {
            this.g = new wk;
            this.h = a
        }
        ;
        Dk = function(a, b) {
            xk(a.g);
            var c = a.g.h;
            if (c)
                return Bk(a, "return"in c ? c["return"] : function(d) {
                    return {
                        value: d,
                        done: !0
                    }
                }
                , b, a.g.return);
            a.g.return(b);
            return Ck(a)
        }
        ;
        Bk = function(a, b, c, d) {
            try {
                var e = b.call(a.g.h, c);
                if (!(e instanceof Object))
                    throw new TypeError("f`" + e);
                if (!e.done)
                    return a.g.o = !1,
                    e;
                var f = e.value
            } catch (g) {
                return a.g.h = null,
                yk(a.g, g),
                Ck(a)
            }
            a.g.h = null;
            d.call(a.g, f);
            return Ck(a)
        }
        ;
        Ck = function(a) {
            for (; a.g.g; )
                try {
                    var b = a.h(a.g);
                    if (b)
                        return a.g.o = !1,
                        {
                            value: b.value,
                            done: !1
                        }
                } catch (c) {
                    a.g.j = void 0,
                    yk(a.g, c)
                }
            a.g.o = !1;
            if (a.g.l) {
                b = a.g.l;
                a.g.l = null;
                if (b.Gj)
                    throw b.Oi;
                return {
                    value: b.return,
                    done: !0
                }
            }
            return {
                value: void 0,
                done: !0
            }
        }
        ;
        Ek = function(a) {
            this.next = function(b) {
                xk(a.g);
                a.g.h ? b = Bk(a, a.g.h.next, b, a.g.A) : (a.g.A(b),
                b = Ck(a));
                return b
            }
            ;
            this.throw = function(b) {
                xk(a.g);
                a.g.h ? b = Bk(a, a.g.h["throw"], b, a.g.A) : (yk(a.g, b),
                b = Ck(a));
                return b
            }
            ;
            this.return = function(b) {
                return Dk(a, b)
            }
            ;
            this[Symbol.iterator] = function() {
                return this
            }
        }
        ;
        Fk = function(a) {
            function b(d) {
                return a.next(d)
            }
            function c(d) {
                return a.throw(d)
            }
            return new Promise(function(d, e) {
                function f(g) {
                    g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
                }
                f(a.next())
            }
            )
        }
        ;
        _.Gk = function(a) {
            return Fk(new Ek(new Ak(a)))
        }
        ;
        Hk = /^[\w+/_-]+[=]{0,2}$/;
        _.Ik = function(a, b) {
            b = (b || _.t).document;
            return b.querySelector ? (a = b.querySelector(a)) && (a = a.nonce || a.getAttribute("nonce")) && Hk.test(a) ? a : "" : ""
        }
        ;
        _.Jk = function(a) {
            return _.Ik("script[nonce]", a)
        }
        ;
        Kk = function(a) {
            return String(a).replace(/\-([a-z])/g, function(b, c) {
                return c.toUpperCase()
            })
        }
        ;
        Lk = function(a) {
            return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function(b, c, d) {
                return c + d.toUpperCase()
            })
        }
        ;
        _.Mk = function(a, b) {
            return (b || document).getElementsByTagName(String(a))
        }
        ;
        _.Nk = function(a) {
            if (a instanceof _.te)
                return a;
            var b = new _.te(_.Gb);
            _.se(b, 2, a);
            return b
        }
        ;
        var Pk, Ok;
        _.M = function(a, b, c) {
            if ("string" === typeof b)
                (b = Ok(a, b)) && (a.style[b] = c);
            else
                for (var d in b) {
                    c = a;
                    var e = b[d]
                      , f = Ok(c, d);
                    f && (c.style[f] = e)
                }
        }
        ;
        Pk = {};
        Ok = function(a, b) {
            var c = Pk[b];
            if (!c) {
                var d = Kk(b);
                c = d;
                void 0 === a.style[d] && (d = (_.sc ? "Webkit" : _.rc ? "Moz" : _.E ? "ms" : null) + Lk(d),
                void 0 !== a.style[d] && (c = d));
                Pk[b] = c
            }
            return c
        }
        ;
        _.Qk = _.rc ? "MozUserSelect" : _.sc || _.pc ? "WebkitUserSelect" : null;
    } catch (e) {
        _._DumpException(e)
    }
    try {
        _.na("el_main_css");

        _.pa();
    } catch (e) {
        _._DumpException(e)
    }
    try {
        _.na("el_main");
        /*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
        /*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
        var Rk = function(a) {
            var b = document.implementation.createHTMLDocument("").createRange();
            a = _.ad(a);
            return b.createContextualFragment(_.$c(a))
        }
          , Sk = function(a) {
            a = a.nodeName;
            return "string" === typeof a ? a : "FORM"
        }
          , Tk = function(a) {
            a = a.nodeType;
            return 1 === a || "number" !== typeof a
        }
          , Uk = function(a, b, c) {
            a.setAttribute(b, c)
        }
          , Vk = function(a, b) {
            return _.Ci(b)
        }
          , Wk = function(a) {
            var b = a.O;
            return _.yi(a.constructor, _.Gi(b, (0,
            _.ii)(b), !1))
        }
          , Xk = function(a, b) {
            a = a.split("%s");
            for (var c = "", d = a.length - 1, e = 0; e < d; e++)
                c += a[e] + (e < b.length ? b[e] : "%s");
            _.aa.call(this, c + a[d])
        }
          , Zk = function() {
            var a = Yk, b;
            for (b in a)
                return !1;
            return !0
        }
          , $k = function(a) {
            var b = {}, c;
            for (c in a)
                b[c] = a[c];
            return b
        }
          , al = function(a) {
            for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
                var e = a.charAt(d);
                if ("]" == e) {
                    if (b)
                        return !1;
                    b = !0
                } else if ("[" == e) {
                    if (!b)
                        return !1;
                    b = !1
                } else if (!b && !c.test(e))
                    return !1
            }
            return b
        }
          , cl = function(a) {
            return a.replace(_.Wc, function(b, c, d, e) {
                var f = "";
                d = d.replace(/^(['"])(.*)\1$/, function(g, h, k) {
                    f = h;
                    return k
                });
                b = (bl(d) || _.Rc).Sa();
                return c + f + b + f + e
            })
        }
          , el = function(a) {
            if (a instanceof _.Mc)
                return 'url("' + _.Yh(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
            if (a instanceof _.Mb)
                a = _.Nb(a);
            else {
                a = String(a);
                var b = a.replace(_.Xc, "$1").replace(_.Xc, "$1").replace(_.Wc, "url");
                if (_.Vc.test(b)) {
                    if (b = !dl.test(a)) {
                        for (var c = b = !0, d = 0; d < a.length; d++) {
                            var e = a.charAt(d);
                            "'" == e && c ? b = !b : '"' == e && b && (c = !c)
                        }
                        b = b && c && al(a)
                    }
                    a = b ? cl(a) : "zClosurez"
                } else
                    a = "zClosurez"
            }
            if (/[{;}]/.test(a))
                throw new Xk("Value does not allow [{;}], got: %s.",[a]);
            return a
        }
          , fl = function(a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
        }
          , gl = function(a) {
            var b = void 0 === b ? {} : b;
            if (a instanceof _.Zc)
                return a;
            a = fl(a);
            b.pn && (a = a.replace(/(^|[\r\n\t ]) /g, "$1&#160;"));
            b.on && (a = a.replace(/(\r\n|\n|\r)/g, "<br>"));
            b.qn && (a = a.replace(/(\t+)/g, '<span style="white-space:pre">$1</span>'));
            return _.ad(a)
        }
          , hl = function(a) {
            var b = {
                nonce: _.Jk()
            };
            b = void 0 === b ? {} : b;
            a = _.Rb(a).toString();
            var c = "<script";
            b.id && (c += ' id="' + fl(b.id) + '"');
            b.nonce && (c += ' nonce="' + fl(b.nonce) + '"');
            b.type && (c += ' type="' + fl(b.type) + '"');
            b.defer && (c += " defer");
            return _.ad(c + (">" + a + "\x3c/script>"))
        }
          , il = function(a) {
            return _.ad(a.map(function(b) {
                return _.$c(gl(b))
            }).join(""))
        }
          , ll = function(a) {
            for (var b = "", c = Object.keys(a), d = 0; d < c.length; d++) {
                var e = c[d]
                  , f = a[e];
                if (!jl.test(e))
                    throw Error("B");
                if (void 0 !== f && null !== f) {
                    if (/^on/i.test(e))
                        throw Error("B");
                    -1 !== kl.indexOf(e.toLowerCase()) && (f = f instanceof _.Mc ? f.toString() : _.Ph(String(f)) || "about:invalid#zClosurez");
                    e = e + '="' + gl(String(f)) + '"';
                    b += " " + e
                }
            }
            return b
        }
          , ol = function(a) {
            var b = {};
            if (!jl.test("body"))
                throw Error("B");
            if (-1 !== ml.indexOf("BODY"))
                throw Error("B");
            var c = "<body";
            b && (c += ll(b));
            Array.isArray(a) || (a = void 0 === a ? [] : [a]);
            -1 !== nl.indexOf("BODY") ? c += ">" : (a = il(a.map(function(d) {
                return d instanceof _.Zc ? d : gl(String(d))
            })),
            c += ">" + a.toString() + "</body>");
            return _.ad(c)
        }
          , ql = function(a) {
            return _.ya(a) ? a.Xc && (a = a.Xc(),
            a instanceof _.Zc) ? a : pl("zSoyz") : pl(String(a))
        }
          , sl = function(a, b) {
            b && b.j ? b.j(a) : rl(a, ql(b))
        }
          , ul = function(a, b) {
            b = a(b || tl, void 0);
            a = _.ld();
            b && b.h ? a = b.h() : (a = _.vk(a, "DIV"),
            b = ql(b),
            rl(a, b));
            1 == a.childNodes.length && (b = a.firstChild,
            1 == b.nodeType && (a = b));
            return a
        }
          , vl = function(a) {
            if (null != a && "number" !== typeof a)
                throw Error();
            return a
        }
          , wl = function(a) {
            if (null != a && "string" !== typeof a)
                throw Error();
            return a
        }
          , yl = function(a) {
            var b = new xl;
            b = _.Li(b, 1, wl(a[0]), "");
            3 === a.length && _.Li(b, 3, wl(a[2]), "");
            return b
        }
          , zl = function(a) {
            return _.Wi(a, xl, 1).map(function(b) {
                return _.Xi(b, 3) ? [_.Xi(b, 1), 200, _.Xi(b, 3)] : [_.Xi(b, 1), 200]
            })
        }
          , Al = function() {
            function a() {
                e[0] = 1732584193;
                e[1] = 4023233417;
                e[2] = 2562383102;
                e[3] = 271733878;
                e[4] = 3285377520;
                n = m = 0
            }
            function b(p) {
                for (var q = g, r = 0; 64 > r; r += 4)
                    q[r / 4] = p[r] << 24 | p[r + 1] << 16 | p[r + 2] << 8 | p[r + 3];
                for (r = 16; 80 > r; r++)
                    p = q[r - 3] ^ q[r - 8] ^ q[r - 14] ^ q[r - 16],
                    q[r] = (p << 1 | p >>> 31) & 4294967295;
                p = e[0];
                var w = e[1]
                  , D = e[2]
                  , Q = e[3]
                  , W = e[4];
                for (r = 0; 80 > r; r++) {
                    if (40 > r)
                        if (20 > r) {
                            var ha = Q ^ w & (D ^ Q);
                            var ce = 1518500249
                        } else
                            ha = w ^ D ^ Q,
                            ce = 1859775393;
                    else
                        60 > r ? (ha = w & D | Q & (w | D),
                        ce = 2400959708) : (ha = w ^ D ^ Q,
                        ce = 3395469782);
                    ha = ((p << 5 | p >>> 27) & 4294967295) + ha + W + ce + q[r] & 4294967295;
                    W = Q;
                    Q = D;
                    D = (w << 30 | w >>> 2) & 4294967295;
                    w = p;
                    p = ha
                }
                e[0] = e[0] + p & 4294967295;
                e[1] = e[1] + w & 4294967295;
                e[2] = e[2] + D & 4294967295;
                e[3] = e[3] + Q & 4294967295;
                e[4] = e[4] + W & 4294967295
            }
            function c(p, q) {
                if ("string" === typeof p) {
                    p = unescape(encodeURIComponent(p));
                    for (var r = [], w = 0, D = p.length; w < D; ++w)
                        r.push(p.charCodeAt(w));
                    p = r
                }
                q || (q = p.length);
                r = 0;
                if (0 == m)
                    for (; r + 64 < q; )
                        b(p.slice(r, r + 64)),
                        r += 64,
                        n += 64;
                for (; r < q; )
                    if (f[m++] = p[r++],
                    n++,
                    64 == m)
                        for (m = 0,
                        b(f); r + 64 < q; )
                            b(p.slice(r, r + 64)),
                            r += 64,
                            n += 64
            }
            function d() {
                var p = []
                  , q = 8 * n;
                56 > m ? c(h, 56 - m) : c(h, 64 - (m - 56));
                for (var r = 63; 56 <= r; r--)
                    f[r] = q & 255,
                    q >>>= 8;
                b(f);
                for (r = q = 0; 5 > r; r++)
                    for (var w = 24; 0 <= w; w -= 8)
                        p[q++] = e[r] >> w & 255;
                return p
            }
            for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k)
                h[k] = 0;
            var m, n;
            a();
            return {
                reset: a,
                update: c,
                digest: d,
                Ii: function() {
                    for (var p = d(), q = "", r = 0; r < p.length; r++)
                        q += "0123456789ABCDEF".charAt(Math.floor(p[r] / 16)) + "0123456789ABCDEF".charAt(p[r] % 16);
                    return q
                }
            }
        }
          , Bl = function(a) {
            for (var b = a.length; 0 <= --b; )
                a[b] = 0
        }
          , Cl = function(a, b, c, d, e) {
            this.Rh = a;
            this.Si = b;
            this.Ri = c;
            this.Ji = d;
            this.bk = e;
            this.eh = a && a.length
        }
          , Dl = function(a, b) {
            this.Eg = a;
            this.Lc = 0;
            this.bc = b
        }
          , El = function(a, b) {
            a.ja[a.pending++] = b & 255;
            a.ja[a.pending++] = b >>> 8 & 255
        }
          , Fl = function(a, b, c) {
            a.za > 16 - c ? (a.La |= b << a.za & 65535,
            El(a, a.La),
            a.La = b >> 16 - a.za,
            a.za += c - 16) : (a.La |= b << a.za & 65535,
            a.za += c)
        }
          , Gl = function(a, b, c) {
            Fl(a, c[2 * b], c[2 * b + 1])
        }
          , Hl = function(a, b) {
            var c = 0;
            do
                c |= a & 1,
                a >>>= 1,
                c <<= 1;
            while (0 < --b);
            return c >>> 1
        }
          , Il = function(a, b, c) {
            var d = Array(16), e = 0, f;
            for (f = 1; 15 >= f; f++)
                d[f] = e = e + c[f - 1] << 1;
            for (c = 0; c <= b; c++)
                e = a[2 * c + 1],
                0 !== e && (a[2 * c] = Hl(d[e]++, e))
        }
          , Jl = function(a) {
            var b;
            for (b = 0; 286 > b; b++)
                a.Ra[2 * b] = 0;
            for (b = 0; 30 > b; b++)
                a.jc[2 * b] = 0;
            for (b = 0; 19 > b; b++)
                a.Ea[2 * b] = 0;
            a.Ra[512] = 1;
            a.Kb = a.Wc = 0;
            a.eb = a.matches = 0
        }
          , Kl = function(a) {
            8 < a.za ? El(a, a.La) : 0 < a.za && (a.ja[a.pending++] = a.La);
            a.La = 0;
            a.za = 0
        }
          , Ll = function(a, b, c) {
            Kl(a);
            El(a, c);
            El(a, ~c);
            N.Dc(a.ja, a.window, b, c, a.pending);
            a.pending += c
        }
          , Ml = function(a, b, c, d) {
            var e = 2 * b
              , f = 2 * c;
            return a[e] < a[f] || a[e] === a[f] && d[b] <= d[c]
        }
          , Nl = function(a, b, c) {
            for (var d = a.ka[c], e = c << 1; e <= a.Gb; ) {
                e < a.Gb && Ml(b, a.ka[e + 1], a.ka[e], a.depth) && e++;
                if (Ml(b, d, a.ka[e], a.depth))
                    break;
                a.ka[c] = a.ka[e];
                c = e;
                e <<= 1
            }
            a.ka[c] = d
        }
          , Ul = function(a, b, c) {
            var d = 0;
            if (0 !== a.eb) {
                do {
                    var e = a.ja[a.gd + 2 * d] << 8 | a.ja[a.gd + 2 * d + 1];
                    var f = a.ja[a.pf + d];
                    d++;
                    if (0 === e)
                        Gl(a, f, b);
                    else {
                        var g = Ol[f];
                        Gl(a, g + 256 + 1, b);
                        var h = Pl[g];
                        0 !== h && (f -= Ql[g],
                        Fl(a, f, h));
                        e--;
                        g = 256 > e ? Rl[e] : Rl[256 + (e >>> 7)];
                        Gl(a, g, c);
                        h = Sl[g];
                        0 !== h && (e -= Tl[g],
                        Fl(a, e, h))
                    }
                } while (d < a.eb)
            }
            Gl(a, 256, b)
        }
          , Vl = function(a, b) {
            var c = b.Eg, d = b.bc.Rh, e = b.bc.eh, f = b.bc.Ji, g, h = -1;
            a.Gb = 0;
            a.Gc = 573;
            for (g = 0; g < f; g++)
                0 !== c[2 * g] ? (a.ka[++a.Gb] = h = g,
                a.depth[g] = 0) : c[2 * g + 1] = 0;
            for (; 2 > a.Gb; ) {
                var k = a.ka[++a.Gb] = 2 > h ? ++h : 0;
                c[2 * k] = 1;
                a.depth[k] = 0;
                a.Kb--;
                e && (a.Wc -= d[2 * k + 1])
            }
            b.Lc = h;
            for (g = a.Gb >> 1; 1 <= g; g--)
                Nl(a, c, g);
            k = f;
            do
                g = a.ka[1],
                a.ka[1] = a.ka[a.Gb--],
                Nl(a, c, 1),
                d = a.ka[1],
                a.ka[--a.Gc] = g,
                a.ka[--a.Gc] = d,
                c[2 * k] = c[2 * g] + c[2 * d],
                a.depth[k] = (a.depth[g] >= a.depth[d] ? a.depth[g] : a.depth[d]) + 1,
                c[2 * g + 1] = c[2 * d + 1] = k,
                a.ka[1] = k++,
                Nl(a, c, 1);
            while (2 <= a.Gb);
            a.ka[--a.Gc] = a.ka[1];
            g = b.Eg;
            k = b.Lc;
            d = b.bc.Rh;
            e = b.bc.eh;
            f = b.bc.Si;
            var m = b.bc.Ri, n = b.bc.bk, p, q = 0;
            for (p = 0; 15 >= p; p++)
                a.Cb[p] = 0;
            g[2 * a.ka[a.Gc] + 1] = 0;
            for (b = a.Gc + 1; 573 > b; b++) {
                var r = a.ka[b];
                p = g[2 * g[2 * r + 1] + 1] + 1;
                p > n && (p = n,
                q++);
                g[2 * r + 1] = p;
                if (!(r > k)) {
                    a.Cb[p]++;
                    var w = 0;
                    r >= m && (w = f[r - m]);
                    var D = g[2 * r];
                    a.Kb += D * (p + w);
                    e && (a.Wc += D * (d[2 * r + 1] + w))
                }
            }
            if (0 !== q) {
                do {
                    for (p = n - 1; 0 === a.Cb[p]; )
                        p--;
                    a.Cb[p]--;
                    a.Cb[p + 1] += 2;
                    a.Cb[n]--;
                    q -= 2
                } while (0 < q);
                for (p = n; 0 !== p; p--)
                    for (r = a.Cb[p]; 0 !== r; )
                        d = a.ka[--b],
                        d > k || (g[2 * d + 1] !== p && (a.Kb += (p - g[2 * d + 1]) * g[2 * d],
                        g[2 * d + 1] = p),
                        r--)
            }
            Il(c, h, a.Cb)
        }
          , Wl = function(a, b, c) {
            var d, e = -1, f = b[1], g = 0, h = 7, k = 4;
            0 === f && (h = 138,
            k = 3);
            b[2 * (c + 1) + 1] = 65535;
            for (d = 0; d <= c; d++) {
                var m = f;
                f = b[2 * (d + 1) + 1];
                ++g < h && m === f || (g < k ? a.Ea[2 * m] += g : 0 !== m ? (m !== e && a.Ea[2 * m]++,
                a.Ea[32]++) : 10 >= g ? a.Ea[34]++ : a.Ea[36]++,
                g = 0,
                e = m,
                0 === f ? (h = 138,
                k = 3) : m === f ? (h = 6,
                k = 3) : (h = 7,
                k = 4))
            }
        }
          , Xl = function(a, b, c) {
            var d, e = -1, f = b[1], g = 0, h = 7, k = 4;
            0 === f && (h = 138,
            k = 3);
            for (d = 0; d <= c; d++) {
                var m = f;
                f = b[2 * (d + 1) + 1];
                if (!(++g < h && m === f)) {
                    if (g < k) {
                        do
                            Gl(a, m, a.Ea);
                        while (0 !== --g)
                    } else
                        0 !== m ? (m !== e && (Gl(a, m, a.Ea),
                        g--),
                        Gl(a, 16, a.Ea),
                        Fl(a, g - 3, 2)) : 10 >= g ? (Gl(a, 17, a.Ea),
                        Fl(a, g - 3, 3)) : (Gl(a, 18, a.Ea),
                        Fl(a, g - 11, 7));
                    g = 0;
                    e = m;
                    0 === f ? (h = 138,
                    k = 3) : m === f ? (h = 6,
                    k = 3) : (h = 7,
                    k = 4)
                }
            }
        }
          , Yl = function(a) {
            var b = 4093624447, c;
            for (c = 0; 31 >= c; c++,
            b >>>= 1)
                if (b & 1 && 0 !== a.Ra[2 * c])
                    return 0;
            if (0 !== a.Ra[18] || 0 !== a.Ra[20] || 0 !== a.Ra[26])
                return 1;
            for (c = 32; 256 > c; c++)
                if (0 !== a.Ra[2 * c])
                    return 1;
            return 0
        }
          , Zl = function(a, b, c) {
            a.ja[a.gd + 2 * a.eb] = b >>> 8 & 255;
            a.ja[a.gd + 2 * a.eb + 1] = b & 255;
            a.ja[a.pf + a.eb] = c & 255;
            a.eb++;
            0 === b ? a.Ra[2 * c]++ : (a.matches++,
            b--,
            a.Ra[2 * (Ol[c] + 256 + 1)]++,
            a.jc[2 * (256 > b ? Rl[b] : Rl[256 + (b >>> 7)])]++);
            return a.eb === a.od - 1
        }
          , am = function(a, b) {
            a.msg = $l[b];
            return b
        }
          , bm = function(a) {
            for (var b = a.length; 0 <= --b; )
                a[b] = 0
        }
          , cm = function(a) {
            var b = a.state
              , c = b.pending;
            c > a.ca && (c = a.ca);
            0 !== c && (N.Dc(a.sd, b.ja, b.ud, c, a.Nc),
            a.Nc += c,
            b.ud += c,
            a.ag += c,
            a.ca -= c,
            b.pending -= c,
            0 === b.pending && (b.ud = 0))
        }
          , gm = function(a, b) {
            var c = 0 <= a.Xa ? a.Xa : -1
              , d = a.K - a.Xa
              , e = 0;
            if (0 < a.level) {
                2 === a.Z.Ue && (a.Z.Ue = Yl(a));
                Vl(a, a.he);
                Vl(a, a.Nd);
                Wl(a, a.Ra, a.he.Lc);
                Wl(a, a.jc, a.Nd.Lc);
                Vl(a, a.xg);
                for (e = 18; 3 <= e && 0 === a.Ea[2 * dm[e] + 1]; e--)
                    ;
                a.Kb += 3 * (e + 1) + 14;
                var f = a.Kb + 3 + 7 >>> 3;
                var g = a.Wc + 3 + 7 >>> 3;
                g <= f && (f = g)
            } else
                f = g = d + 5;
            if (d + 4 <= f && -1 !== c)
                Fl(a, b ? 1 : 0, 3),
                Ll(a, c, d);
            else if (4 === a.zb || g === f)
                Fl(a, 2 + (b ? 1 : 0), 3),
                Ul(a, em, fm);
            else {
                Fl(a, 4 + (b ? 1 : 0), 3);
                c = a.he.Lc + 1;
                d = a.Nd.Lc + 1;
                e += 1;
                Fl(a, c - 257, 5);
                Fl(a, d - 1, 5);
                Fl(a, e - 4, 4);
                for (f = 0; f < e; f++)
                    Fl(a, a.Ea[2 * dm[f] + 1], 3);
                Xl(a, a.Ra, c - 1);
                Xl(a, a.jc, d - 1);
                Ul(a, a.Ra, a.jc)
            }
            Jl(a);
            b && Kl(a);
            a.Xa = a.K;
            cm(a.Z)
        }
          , O = function(a, b) {
            a.ja[a.pending++] = b
        }
          , hm = function(a, b) {
            a.ja[a.pending++] = b >>> 8 & 255;
            a.ja[a.pending++] = b & 255
        }
          , im = function(a, b) {
            var c = a.qh
              , d = a.K
              , e = a.Za
              , f = a.uh
              , g = a.K > a.Ga - 262 ? a.K - (a.Ga - 262) : 0
              , h = a.window
              , k = a.cc
              , m = a.xb
              , n = a.K + 258
              , p = h[d + e - 1]
              , q = h[d + e];
            a.Za >= a.Pg && (c >>= 2);
            f > a.R && (f = a.R);
            do {
                var r = b;
                if (h[r + e] === q && h[r + e - 1] === p && h[r] === h[d] && h[++r] === h[d + 1]) {
                    d += 2;
                    for (r++; h[++d] === h[++r] && h[++d] === h[++r] && h[++d] === h[++r] && h[++d] === h[++r] && h[++d] === h[++r] && h[++d] === h[++r] && h[++d] === h[++r] && h[++d] === h[++r] && d < n; )
                        ;
                    r = 258 - (n - d);
                    d = n - 258;
                    if (r > e) {
                        a.Kc = b;
                        e = r;
                        if (r >= f)
                            break;
                        p = h[d + e - 1];
                        q = h[d + e]
                    }
                }
            } while ((b = m[b & k]) > g && 0 !== --c);
            return e <= a.R ? e : a.R
        }
          , lm = function(a) {
            var b = a.Ga, c;
            do {
                var d = a.Vh - a.R - a.K;
                if (a.K >= b + (b - 262)) {
                    N.Dc(a.window, a.window, b, b, 0);
                    a.Kc -= b;
                    a.K -= b;
                    a.Xa -= b;
                    var e = c = a.de;
                    do {
                        var f = a.head[--e];
                        a.head[e] = f >= b ? f - b : 0
                    } while (--c);
                    e = c = b;
                    do
                        f = a.xb[--e],
                        a.xb[e] = f >= b ? f - b : 0;
                    while (--c);
                    d += b
                }
                if (0 === a.Z.Ka)
                    break;
                e = a.Z;
                c = a.window;
                f = a.K + a.R;
                var g = e.Ka;
                g > d && (g = d);
                0 === g ? c = 0 : (e.Ka -= g,
                N.Dc(c, e.input, e.vc, g, f),
                1 === e.state.wa ? e.X = jm(e.X, c, g, f) : 2 === e.state.wa && (e.X = km(e.X, c, g, f)),
                e.vc += g,
                e.xc += g,
                c = g);
                a.R += c;
                if (3 <= a.R + a.Ta)
                    for (d = a.K - a.Ta,
                    a.aa = a.window[d],
                    a.aa = (a.aa << a.Fb ^ a.window[d + 1]) & a.Eb; a.Ta && !(a.aa = (a.aa << a.Fb ^ a.window[d + 3 - 1]) & a.Eb,
                    a.xb[d & a.cc] = a.head[a.aa],
                    a.head[a.aa] = d,
                    d++,
                    a.Ta--,
                    3 > a.R + a.Ta); )
                        ;
            } while (262 > a.R && 0 !== a.Z.Ka)
        }
          , mm = function(a, b) {
            for (var c; ; ) {
                if (262 > a.R) {
                    lm(a);
                    if (262 > a.R && 0 === b)
                        return 1;
                    if (0 === a.R)
                        break
                }
                c = 0;
                3 <= a.R && (a.aa = (a.aa << a.Fb ^ a.window[a.K + 3 - 1]) & a.Eb,
                c = a.xb[a.K & a.cc] = a.head[a.aa],
                a.head[a.aa] = a.K);
                0 !== c && a.K - c <= a.Ga - 262 && (a.ea = im(a, c));
                if (3 <= a.ea)
                    if (c = Zl(a, a.K - a.Kc, a.ea - 3),
                    a.R -= a.ea,
                    a.ea <= a.wf && 3 <= a.R) {
                        a.ea--;
                        do
                            a.K++,
                            a.aa = (a.aa << a.Fb ^ a.window[a.K + 3 - 1]) & a.Eb,
                            a.xb[a.K & a.cc] = a.head[a.aa],
                            a.head[a.aa] = a.K;
                        while (0 !== --a.ea);
                        a.K++
                    } else
                        a.K += a.ea,
                        a.ea = 0,
                        a.aa = a.window[a.K],
                        a.aa = (a.aa << a.Fb ^ a.window[a.K + 1]) & a.Eb;
                else
                    c = Zl(a, 0, a.window[a.K]),
                    a.R--,
                    a.K++;
                if (c && (gm(a, !1),
                0 === a.Z.ca))
                    return 1
            }
            a.Ta = 2 > a.K ? a.K : 2;
            return 4 === b ? (gm(a, !0),
            0 === a.Z.ca ? 3 : 4) : a.eb && (gm(a, !1),
            0 === a.Z.ca) ? 1 : 2
        }
          , nm = function(a, b) {
            for (var c, d; ; ) {
                if (262 > a.R) {
                    lm(a);
                    if (262 > a.R && 0 === b)
                        return 1;
                    if (0 === a.R)
                        break
                }
                c = 0;
                3 <= a.R && (a.aa = (a.aa << a.Fb ^ a.window[a.K + 3 - 1]) & a.Eb,
                c = a.xb[a.K & a.cc] = a.head[a.aa],
                a.head[a.aa] = a.K);
                a.Za = a.ea;
                a.Dh = a.Kc;
                a.ea = 2;
                0 !== c && a.Za < a.wf && a.K - c <= a.Ga - 262 && (a.ea = im(a, c),
                5 >= a.ea && (1 === a.zb || 3 === a.ea && 4096 < a.K - a.Kc) && (a.ea = 2));
                if (3 <= a.Za && a.ea <= a.Za) {
                    d = a.K + a.R - 3;
                    c = Zl(a, a.K - 1 - a.Dh, a.Za - 3);
                    a.R -= a.Za - 1;
                    a.Za -= 2;
                    do
                        ++a.K <= d && (a.aa = (a.aa << a.Fb ^ a.window[a.K + 3 - 1]) & a.Eb,
                        a.xb[a.K & a.cc] = a.head[a.aa],
                        a.head[a.aa] = a.K);
                    while (0 !== --a.Za);
                    a.sc = 0;
                    a.ea = 2;
                    a.K++;
                    if (c && (gm(a, !1),
                    0 === a.Z.ca))
                        return 1
                } else if (a.sc) {
                    if ((c = Zl(a, 0, a.window[a.K - 1])) && gm(a, !1),
                    a.K++,
                    a.R--,
                    0 === a.Z.ca)
                        return 1
                } else
                    a.sc = 1,
                    a.K++,
                    a.R--
            }
            a.sc && (Zl(a, 0, a.window[a.K - 1]),
            a.sc = 0);
            a.Ta = 2 > a.K ? a.K : 2;
            return 4 === b ? (gm(a, !0),
            0 === a.Z.ca ? 3 : 4) : a.eb && (gm(a, !1),
            0 === a.Z.ca) ? 1 : 2
        }
          , om = function(a, b) {
            for (var c, d, e, f = a.window; ; ) {
                if (258 >= a.R) {
                    lm(a);
                    if (258 >= a.R && 0 === b)
                        return 1;
                    if (0 === a.R)
                        break
                }
                a.ea = 0;
                if (3 <= a.R && 0 < a.K && (d = a.K - 1,
                c = f[d],
                c === f[++d] && c === f[++d] && c === f[++d])) {
                    for (e = a.K + 258; c === f[++d] && c === f[++d] && c === f[++d] && c === f[++d] && c === f[++d] && c === f[++d] && c === f[++d] && c === f[++d] && d < e; )
                        ;
                    a.ea = 258 - (e - d);
                    a.ea > a.R && (a.ea = a.R)
                }
                3 <= a.ea ? (c = Zl(a, 1, a.ea - 3),
                a.R -= a.ea,
                a.K += a.ea,
                a.ea = 0) : (c = Zl(a, 0, a.window[a.K]),
                a.R--,
                a.K++);
                if (c && (gm(a, !1),
                0 === a.Z.ca))
                    return 1
            }
            a.Ta = 0;
            return 4 === b ? (gm(a, !0),
            0 === a.Z.ca ? 3 : 4) : a.eb && (gm(a, !1),
            0 === a.Z.ca) ? 1 : 2
        }
          , pm = function(a, b) {
            for (var c; ; ) {
                if (0 === a.R && (lm(a),
                0 === a.R)) {
                    if (0 === b)
                        return 1;
                    break
                }
                a.ea = 0;
                c = Zl(a, 0, a.window[a.K]);
                a.R--;
                a.K++;
                if (c && (gm(a, !1),
                0 === a.Z.ca))
                    return 1
            }
            a.Ta = 0;
            return 4 === b ? (gm(a, !0),
            0 === a.Z.ca ? 3 : 4) : a.eb && (gm(a, !1),
            0 === a.Z.ca) ? 1 : 2
        }
          , qm = function(a, b, c, d, e) {
            this.ej = a;
            this.ak = b;
            this.hk = c;
            this.Zj = d;
            this.Ui = e
        }
          , rm = function() {
            this.Z = null;
            this.status = 0;
            this.ja = null;
            this.wa = this.pending = this.ud = this.gb = 0;
            this.W = null;
            this.mb = 0;
            this.method = 8;
            this.Jc = -1;
            this.cc = this.cg = this.Ga = 0;
            this.window = null;
            this.Vh = 0;
            this.head = this.xb = null;
            this.uh = this.Pg = this.zb = this.level = this.wf = this.qh = this.Za = this.R = this.Kc = this.K = this.sc = this.Dh = this.ea = this.Xa = this.Fb = this.Eb = this.jf = this.de = this.aa = 0;
            this.Ra = new N.Ab(1146);
            this.jc = new N.Ab(122);
            this.Ea = new N.Ab(78);
            bm(this.Ra);
            bm(this.jc);
            bm(this.Ea);
            this.xg = this.Nd = this.he = null;
            this.Cb = new N.Ab(16);
            this.ka = new N.Ab(573);
            bm(this.ka);
            this.Gc = this.Gb = 0;
            this.depth = new N.Ab(573);
            bm(this.depth);
            this.za = this.La = this.Ta = this.matches = this.Wc = this.Kb = this.gd = this.eb = this.od = this.pf = 0
        }
          , tm = function(a, b) {
            if (!a || !a.state || 5 < b || 0 > b)
                return a ? am(a, -2) : -2;
            var c = a.state;
            if (!a.sd || !a.input && 0 !== a.Ka || 666 === c.status && 4 !== b)
                return am(a, 0 === a.ca ? -5 : -2);
            c.Z = a;
            var d = c.Jc;
            c.Jc = b;
            if (42 === c.status)
                if (2 === c.wa)
                    a.X = 0,
                    O(c, 31),
                    O(c, 139),
                    O(c, 8),
                    c.W ? (O(c, (c.W.text ? 1 : 0) + (c.W.Wb ? 2 : 0) + (c.W.Tb ? 4 : 0) + (c.W.name ? 8 : 0) + (c.W.Se ? 16 : 0)),
                    O(c, c.W.time & 255),
                    O(c, c.W.time >> 8 & 255),
                    O(c, c.W.time >> 16 & 255),
                    O(c, c.W.time >> 24 & 255),
                    O(c, 9 === c.level ? 2 : 2 <= c.zb || 2 > c.level ? 4 : 0),
                    O(c, c.W.nn & 255),
                    c.W.Tb && c.W.Tb.length && (O(c, c.W.Tb.length & 255),
                    O(c, c.W.Tb.length >> 8 & 255)),
                    c.W.Wb && (a.X = km(a.X, c.ja, c.pending, 0)),
                    c.mb = 0,
                    c.status = 69) : (O(c, 0),
                    O(c, 0),
                    O(c, 0),
                    O(c, 0),
                    O(c, 0),
                    O(c, 9 === c.level ? 2 : 2 <= c.zb || 2 > c.level ? 4 : 0),
                    O(c, 3),
                    c.status = 113);
                else {
                    var e = 8 + (c.cg - 8 << 4) << 8;
                    e |= (2 <= c.zb || 2 > c.level ? 0 : 6 > c.level ? 1 : 6 === c.level ? 2 : 3) << 6;
                    0 !== c.K && (e |= 32);
                    c.status = 113;
                    hm(c, e + (31 - e % 31));
                    0 !== c.K && (hm(c, a.X >>> 16),
                    hm(c, a.X & 65535));
                    a.X = 1
                }
            if (69 === c.status)
                if (c.W.Tb) {
                    for (e = c.pending; c.mb < (c.W.Tb.length & 65535) && (c.pending !== c.gb || (c.W.Wb && c.pending > e && (a.X = km(a.X, c.ja, c.pending - e, e)),
                    cm(a),
                    e = c.pending,
                    c.pending !== c.gb)); )
                        O(c, c.W.Tb[c.mb] & 255),
                        c.mb++;
                    c.W.Wb && c.pending > e && (a.X = km(a.X, c.ja, c.pending - e, e));
                    c.mb === c.W.Tb.length && (c.mb = 0,
                    c.status = 73)
                } else
                    c.status = 73;
            if (73 === c.status)
                if (c.W.name) {
                    e = c.pending;
                    do {
                        if (c.pending === c.gb && (c.W.Wb && c.pending > e && (a.X = km(a.X, c.ja, c.pending - e, e)),
                        cm(a),
                        e = c.pending,
                        c.pending === c.gb)) {
                            var f = 1;
                            break
                        }
                        f = c.mb < c.W.name.length ? c.W.name.charCodeAt(c.mb++) & 255 : 0;
                        O(c, f)
                    } while (0 !== f);
                    c.W.Wb && c.pending > e && (a.X = km(a.X, c.ja, c.pending - e, e));
                    0 === f && (c.mb = 0,
                    c.status = 91)
                } else
                    c.status = 91;
            if (91 === c.status)
                if (c.W.Se) {
                    e = c.pending;
                    do {
                        if (c.pending === c.gb && (c.W.Wb && c.pending > e && (a.X = km(a.X, c.ja, c.pending - e, e)),
                        cm(a),
                        e = c.pending,
                        c.pending === c.gb)) {
                            f = 1;
                            break
                        }
                        f = c.mb < c.W.Se.length ? c.W.Se.charCodeAt(c.mb++) & 255 : 0;
                        O(c, f)
                    } while (0 !== f);
                    c.W.Wb && c.pending > e && (a.X = km(a.X, c.ja, c.pending - e, e));
                    0 === f && (c.status = 103)
                } else
                    c.status = 103;
            103 === c.status && (c.W.Wb ? (c.pending + 2 > c.gb && cm(a),
            c.pending + 2 <= c.gb && (O(c, a.X & 255),
            O(c, a.X >> 8 & 255),
            a.X = 0,
            c.status = 113)) : c.status = 113);
            if (0 !== c.pending) {
                if (cm(a),
                0 === a.ca)
                    return c.Jc = -1,
                    0
            } else if (0 === a.Ka && (b << 1) - (4 < b ? 9 : 0) <= (d << 1) - (4 < d ? 9 : 0) && 4 !== b)
                return am(a, -5);
            if (666 === c.status && 0 !== a.Ka)
                return am(a, -5);
            if (0 !== a.Ka || 0 !== c.R || 0 !== b && 666 !== c.status) {
                d = 2 === c.zb ? pm(c, b) : 3 === c.zb ? om(c, b) : sm[c.level].Ui(c, b);
                if (3 === d || 4 === d)
                    c.status = 666;
                if (1 === d || 3 === d)
                    return 0 === a.ca && (c.Jc = -1),
                    0;
                if (2 === d && (1 === b ? (Fl(c, 2, 3),
                Gl(c, 256, em),
                16 === c.za ? (El(c, c.La),
                c.La = 0,
                c.za = 0) : 8 <= c.za && (c.ja[c.pending++] = c.La & 255,
                c.La >>= 8,
                c.za -= 8)) : 5 !== b && (Fl(c, 0, 3),
                Ll(c, 0, 0),
                3 === b && (bm(c.head),
                0 === c.R && (c.K = 0,
                c.Xa = 0,
                c.Ta = 0))),
                cm(a),
                0 === a.ca))
                    return c.Jc = -1,
                    0
            }
            if (4 !== b)
                return 0;
            if (0 >= c.wa)
                return 1;
            2 === c.wa ? (O(c, a.X & 255),
            O(c, a.X >> 8 & 255),
            O(c, a.X >> 16 & 255),
            O(c, a.X >> 24 & 255),
            O(c, a.xc & 255),
            O(c, a.xc >> 8 & 255),
            O(c, a.xc >> 16 & 255),
            O(c, a.xc >> 24 & 255)) : (hm(c, a.X >>> 16),
            hm(c, a.X & 65535));
            cm(a);
            0 < c.wa && (c.wa = -c.wa);
            return 0 !== c.pending ? 0 : 1
        }
          , um = function(a) {
            if (!(this instanceof um))
                return new um(a);
            a = this.options = N.assign({
                level: -1,
                method: 8,
                Ei: 16384,
                dc: 15,
                dk: 8,
                zb: 0,
                Th: ""
            }, a || {});
            a.raw && 0 < a.dc ? a.dc = -a.dc : a.fj && 0 < a.dc && 16 > a.dc && (a.dc += 16);
            this.Ye = 0;
            this.msg = "";
            this.ended = !1;
            this.dd = [];
            this.Z = new vm;
            this.Z.ca = 0;
            var b = this.Z;
            var c = a.level
              , d = a.method
              , e = a.dc
              , f = a.dk
              , g = a.zb;
            if (b) {
                var h = 1;
                -1 === c && (c = 6);
                0 > e ? (h = 0,
                e = -e) : 15 < e && (h = 2,
                e -= 16);
                if (1 > f || 9 < f || 8 !== d || 8 > e || 15 < e || 0 > c || 9 < c || 0 > g || 4 < g)
                    b = am(b, -2);
                else {
                    8 === e && (e = 9);
                    var k = new rm;
                    b.state = k;
                    k.Z = b;
                    k.wa = h;
                    k.W = null;
                    k.cg = e;
                    k.Ga = 1 << k.cg;
                    k.cc = k.Ga - 1;
                    k.jf = f + 7;
                    k.de = 1 << k.jf;
                    k.Eb = k.de - 1;
                    k.Fb = ~~((k.jf + 3 - 1) / 3);
                    k.window = new N.zc(2 * k.Ga);
                    k.head = new N.Ab(k.de);
                    k.xb = new N.Ab(k.Ga);
                    k.od = 1 << f + 6;
                    k.gb = 4 * k.od;
                    k.ja = new N.zc(k.gb);
                    k.gd = k.od;
                    k.pf = 3 * k.od;
                    k.level = c;
                    k.zb = g;
                    k.method = d;
                    if (b && b.state) {
                        b.xc = b.ag = 0;
                        b.Ue = 2;
                        c = b.state;
                        c.pending = 0;
                        c.ud = 0;
                        0 > c.wa && (c.wa = -c.wa);
                        c.status = c.wa ? 42 : 113;
                        b.X = 2 === c.wa ? 0 : 1;
                        c.Jc = 0;
                        if (!wm) {
                            d = Array(16);
                            for (f = g = 0; 28 > f; f++)
                                for (Ql[f] = g,
                                e = 0; e < 1 << Pl[f]; e++)
                                    Ol[g++] = f;
                            Ol[g - 1] = f;
                            for (f = g = 0; 16 > f; f++)
                                for (Tl[f] = g,
                                e = 0; e < 1 << Sl[f]; e++)
                                    Rl[g++] = f;
                            for (g >>= 7; 30 > f; f++)
                                for (Tl[f] = g << 7,
                                e = 0; e < 1 << Sl[f] - 7; e++)
                                    Rl[256 + g++] = f;
                            for (e = 0; 15 >= e; e++)
                                d[e] = 0;
                            for (e = 0; 143 >= e; )
                                em[2 * e + 1] = 8,
                                e++,
                                d[8]++;
                            for (; 255 >= e; )
                                em[2 * e + 1] = 9,
                                e++,
                                d[9]++;
                            for (; 279 >= e; )
                                em[2 * e + 1] = 7,
                                e++,
                                d[7]++;
                            for (; 287 >= e; )
                                em[2 * e + 1] = 8,
                                e++,
                                d[8]++;
                            Il(em, 287, d);
                            for (e = 0; 30 > e; e++)
                                fm[2 * e + 1] = 5,
                                fm[2 * e] = Hl(e, 5);
                            xm = new Cl(em,Pl,257,286,15);
                            ym = new Cl(fm,Sl,0,30,15);
                            zm = new Cl([],Am,0,19,7);
                            wm = !0
                        }
                        c.he = new Dl(c.Ra,xm);
                        c.Nd = new Dl(c.jc,ym);
                        c.xg = new Dl(c.Ea,zm);
                        c.La = 0;
                        c.za = 0;
                        Jl(c);
                        c = 0
                    } else
                        c = am(b, -2);
                    0 === c && (b = b.state,
                    b.Vh = 2 * b.Ga,
                    bm(b.head),
                    b.wf = sm[b.level].ak,
                    b.Pg = sm[b.level].ej,
                    b.uh = sm[b.level].hk,
                    b.qh = sm[b.level].Zj,
                    b.K = 0,
                    b.Xa = 0,
                    b.R = 0,
                    b.Ta = 0,
                    b.ea = b.Za = 2,
                    b.sc = 0,
                    b.aa = 0);
                    b = c
                }
            } else
                b = -2;
            if (0 !== b)
                throw Error($l[b]);
            a.Cj && (b = this.Z) && b.state && 2 === b.state.wa && (b.state.W = a.Cj);
            if (a.hd) {
                var m;
                "string" === typeof a.hd ? m = Bm(a.hd) : "[object ArrayBuffer]" === Cm.call(a.hd) ? m = new Uint8Array(a.hd) : m = a.hd;
                a = this.Z;
                f = m;
                g = f.length;
                if (a && a.state)
                    if (m = a.state,
                    b = m.wa,
                    2 === b || 1 === b && 42 !== m.status || m.R)
                        b = -2;
                    else {
                        1 === b && (a.X = jm(a.X, f, g, 0));
                        m.wa = 0;
                        g >= m.Ga && (0 === b && (bm(m.head),
                        m.K = 0,
                        m.Xa = 0,
                        m.Ta = 0),
                        c = new N.zc(m.Ga),
                        N.Dc(c, f, g - m.Ga, m.Ga, 0),
                        f = c,
                        g = m.Ga);
                        c = a.Ka;
                        d = a.vc;
                        e = a.input;
                        a.Ka = g;
                        a.vc = 0;
                        a.input = f;
                        for (lm(m); 3 <= m.R; ) {
                            f = m.K;
                            g = m.R - 2;
                            do
                                m.aa = (m.aa << m.Fb ^ m.window[f + 3 - 1]) & m.Eb,
                                m.xb[f & m.cc] = m.head[m.aa],
                                m.head[m.aa] = f,
                                f++;
                            while (--g);
                            m.K = f;
                            m.R = 2;
                            lm(m)
                        }
                        m.K += m.R;
                        m.Xa = m.K;
                        m.Ta = m.R;
                        m.R = 0;
                        m.ea = m.Za = 2;
                        m.sc = 0;
                        a.vc = d;
                        a.input = e;
                        a.Ka = c;
                        m.wa = b;
                        b = 0
                    }
                else
                    b = -2;
                if (0 !== b)
                    throw Error($l[b]);
                this.jm = !0
            }
        }
          , Dm = function(a) {
            var b = {};
            b = b || {};
            b.fj = !0;
            b = new um(b);
            b.push(a, !0);
            if (b.Ye)
                throw b.msg || $l[b.Ye];
            return b.result
        }
          , Em = function(a) {
            return "translate:" + a
        }
          , Lm = function(a) {
            var b = new Fm;
            b = Gm(b, 1, a.name);
            var c = Hm(a.startTime);
            b = _.I(b, 2, c);
            a = Im(a.duration);
            a = _.I(b, 3, a);
            b = new Jm;
            return Km(a, 5, b)
        }
          , Hm = function(a) {
            var b = new Mm;
            b.setSeconds(Math.floor(a / 1E3));
            _.Li(b, 2, vl(Math.round(a % 1E3 * 1E6)), 0);
            return b
        }
          , Im = function(a) {
            var b = new Nm;
            b.setSeconds(Math.floor(a / 1E3));
            _.Li(b, 2, vl(Math.round(a % 1E3 * 1E6)), 0);
            return b
        }
          , Om = function(a) {
            performance && performance.mark && performance.getEntriesByName(a, "mark")
        }
          , Pm = function(a, b) {
            return performance && performance.measure ? performance.measure(a, b) : null
        }
          , Sm = function(a, b, c) {
            var d = Array.prototype.slice.call(arguments);
            d.splice(0, 2);
            d = "l" + a.toString(16) + "i" + b.toString(16) + (d.length ? "-" + d.join("_") : "");
            Qm ? Qm.push(d) : Rm(d)
        }
          , Vm = function() {
            var a = Tm || (Tm = Um('[null,null,null,null,null,"(function(){/*\\n\\n Copyright The Closure Library Authors.\\n SPDX-License-Identifier: Apache-2.0\\n*/\\n\'use strict\';var e\\u003dthis||self;function f(a){return a};var h;function k(a){this.g\\u003da}k.prototype.toString\\u003dfunction(){return this.g+\\"\\"};var l\\u003d{};function m(a){if(void 0\\u003d\\u003d\\u003dh){var c\\u003dnull;var b\\u003de.trustedTypes;if(b\\u0026\\u0026b.createPolicy){try{c\\u003db.createPolicy(\\"goog#html\\",{createHTML:f,createScript:f,createScriptURL:f})}catch(d){e.console\\u0026\\u0026e.console.error(d.message)}h\\u003dc}else h\\u003dc}a\\u003d(c\\u003dh)?c.createScriptURL(a):a;return new k(a,l)};/*\\n\\n SPDX-License-Identifier: Apache-2.0\\n*/\\nif(!function(){if(self.origin)return\\"null\\"\\u003d\\u003d\\u003dself.origin;if(\\"\\"!\\u003d\\u003dlocation.host)return!1;try{return window.parent.escape(\\"\\"),!1}catch(a){return!0}}())throw Error(\\"sandboxing error\\");\\nwindow.addEventListener(\\"message\\",function(a){var c\\u003da.ports[0];a\\u003da.data;var b\\u003da.callbackName.split(\\".\\"),d\\u003dwindow;\\"window\\"\\u003d\\u003d\\u003db[0]\\u0026\\u0026b.shift();for(var g\\u003d0;g\\u003cb.length-1;g++)d[b[g]]\\u003d{},d\\u003dd[b[g]];d[b[b.length-1]]\\u003dfunction(n){c.postMessage(JSON.stringify(n))};b\\u003ddocument.createElement(\\"script\\");a\\u003dm(a.url);b.src\\u003da instanceof k\\u0026\\u0026a.constructor\\u003d\\u003d\\u003dk?a.g:\\"type_error:TrustedResourceUrl\\";document.body.appendChild(b)},!0);}).call(this);\\n"]'));
            if (!a)
                return null;
            a = _.vi(_.Si(a, 6));
            var b;
            null === a || void 0 === a ? b = null : b = _.Sb(a);
            return b
        }
          , Wm = function(a) {
            var b = {};
            a = _.x(a);
            for (var c = a.next(); !c.done; c = a.next())
                c = c.value,
                b[c.language] = c.name;
            return b
        }
          , Xm = function(a) {
            P.call(this);
            a = a || {};
            this.id = a.id || this.jb();
            this.tf = a.tf || "";
            this.ie = a.ie || null;
            this.je = a.je || null;
            this.Qe = a.Qe || !1;
            this.className = a.className || null;
            this.l = null
        }
          , R = function(a, b) {
            this.x = void 0 !== a ? a : 0;
            this.y = void 0 !== b ? b : 0
        };
        R.prototype.ceil = function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this
        }
        ;
        R.prototype.floor = function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this
        }
        ;
        R.prototype.round = function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this
        }
        ;
        R.prototype.translate = function(a, b) {
            a instanceof R ? (this.x += a.x,
            this.y += a.y) : (this.x += Number(a),
            "number" === typeof b && (this.y += b));
            return this
        }
        ;
        var Ym = function(a) {
            return new R(a.x,a.y)
        }
          , Zm = function(a, b, c, d) {
            a = d || a;
            b = b && "*" != b ? String(b).toUpperCase() : "";
            if (a.querySelectorAll && a.querySelector && (b || c))
                return a.querySelectorAll(b + (c ? "." + c : ""));
            if (c && a.getElementsByClassName) {
                a = a.getElementsByClassName(c);
                if (b) {
                    d = {};
                    for (var e = 0, f = 0, g; g = a[f]; f++)
                        b == g.nodeName && (d[e++] = g);
                    d.length = e;
                    return d
                }
                return a
            }
            a = a.getElementsByTagName(b || "*");
            if (c) {
                d = {};
                for (f = e = 0; g = a[f]; f++)
                    b = g.className,
                    "function" == typeof b.split && _.ta(b.split(/\s+/), c) && (d[e++] = g);
                d.length = e;
                return d
            }
            return a
        }
          , $m = function(a, b) {
            var c = b || document;
            if (c.getElementsByClassName)
                a = c.getElementsByClassName(a)[0];
            else {
                c = document;
                var d = b || c;
                a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : Zm(c, "*", a, b)[0] || null
            }
            return a || null
        }
          , an = function(a) {
            return a.scrollingElement ? a.scrollingElement : !_.sc && _.pd(a) ? a.documentElement : a.body || a.documentElement
        }
          , bn = function(a) {
            var b = an(a);
            a = a.parentWindow || a.defaultView;
            return _.E && a.pageYOffset != b.scrollTop ? new R(b.scrollLeft,b.scrollTop) : new R(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
        }
          , cn = ["data:", "http:", "https:", "mailto:", "ftp:"]
          , dn = function(a, b, c) {
            c = a.g.get(c);
            return (null == c ? 0 : c.has(b)) ? c.get(b) : a.l.has(b) ? {
                Ba: 1
            } : (c = a.o.get(b)) ? c : a.h && [].concat(_.fb(a.h)).some(function(d) {
                return 0 === b.indexOf(d)
            }) ? {
                Ba: 1
            } : {
                Ba: 0
            }
        }
          , en = function(a) {
            0 === a.g.length && a.g.push("")
        }
          , fn = function(a, b) {
            if (3 === b.nodeType)
                return 1;
            if (!Tk(b))
                return 2;
            b = Sk(b);
            if (null === b)
                return en(a),
                2;
            var c = a.h;
            if ("FORM" !== b && (c.j.has(b) || c.g.has(b)))
                return 1;
            en(a);
            return 2
        }
          , gn = function(a, b) {
            var c = Sk(b)
              , d = document.createElement(c);
            b = b.attributes;
            for (var e = _.x(b), f = e.next(); !f.done; f = e.next()) {
                var g = f.value;
                f = g.name;
                g = g.value;
                var h = dn(a.h, f, c), k;
                a: {
                    if (k = h.conditions) {
                        k = _.x(k);
                        for (var m = k.next(); !m.done; m = k.next()) {
                            var n = _.x(m.value);
                            m = n.next().value;
                            n = n.next().value;
                            var p = void 0;
                            if ((m = null == (p = b.getNamedItem(m)) ? void 0 : p.value) && !n.has(m)) {
                                k = !1;
                                break a
                            }
                        }
                    }
                    k = !0
                }
                if (k)
                    switch (h.Ba) {
                    case 1:
                        Uk(d, f, g);
                        break;
                    case 2:
                        h = _.Oh(g);
                        h = void 0 !== h && -1 !== cn.indexOf(h.toLowerCase()) ? g : "about:invalid#zClosurez";
                        h !== g && en(a);
                        Uk(d, f, h);
                        break;
                    case 3:
                        Uk(d, f, g.toLowerCase());
                        break;
                    case 4:
                        Uk(d, f, g);
                        break;
                    case 0:
                        en(a)
                    }
                else
                    en(a)
            }
            return d
        }
          , hn = function(a) {
            var b = _.vg;
            a = Rk(a);
            a = document.createTreeWalker(a, 5, function(g) {
                return fn(b, g)
            }, !1);
            for (var c = a.nextNode(), d = document.createDocumentFragment(), e = d; null !== c; ) {
                var f = void 0;
                if (3 === c.nodeType)
                    f = document.createTextNode(c.data);
                else if (Tk(c))
                    f = gn(b, c);
                else
                    throw Error("B");
                e.appendChild(f);
                if (c = a.firstChild())
                    e = f;
                else
                    for (; !(c = a.nextSibling()) && (c = a.parentNode()); )
                        e = e.parentNode
            }
            return d
        }
          , jn = function(a) {
            var b = document.createElement("span");
            b.appendChild(hn(a));
            a = (new XMLSerializer).serializeToString(b);
            a = a.slice(a.indexOf(">") + 1, a.lastIndexOf("</"));
            return _.ad(a)
        }
          , kn = function(a) {
            _.Ri = !0;
            try {
                return JSON.stringify(a.toJSON(), Vk)
            } finally {
                _.Ri = !1
            }
        }
          , ln = function(a, b) {
            if (!b)
                return a;
            var c = a.indexOf("#");
            0 > c && (c = a.length);
            var d = a.indexOf("?");
            if (0 > d || d > c) {
                d = c;
                var e = ""
            } else
                e = a.substring(d + 1, c);
            a = [a.slice(0, d), e, a.slice(c)];
            c = a[1];
            a[1] = b ? c ? c + "&" + b : b : c;
            return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
        }
          , mn = function(a, b) {
            var c = [];
            for (b = b || 0; b < a.length; b += 2)
                _.Uf(a[b], a[b + 1], c);
            return c.join("&")
        }
          , nn = function(a, b) {
            var c = 2 == arguments.length ? mn(arguments[1], 0) : mn(arguments, 1);
            return ln(a, c)
        }
          , pn = function(a, b) {
            b = on(b || {}, a.j ? a.j.g() : {});
            a.h(null, b.Db);
            return b.l()
        }
          , qn = function(a) {
            a.pc = void 0;
            a.Vb = function() {
                return a.pc ? a.pc : a.pc = new a
            }
        }
          , rn = {};
        _.A(Xk, _.aa);
        Xk.prototype.name = "AssertionError";
        var sn = /&/g
          , tn = /</g
          , un = />/g
          , vn = /"/g
          , wn = /'/g
          , xn = /\x00/g
          , yn = /[\x00&<>"']/
          , zn = function(a) {
            if (!yn.test(a))
                return a;
            -1 != a.indexOf("&") && (a = a.replace(sn, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(tn, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(un, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(vn, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(wn, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(xn, "&#0;"));
            return a
        }
          , An = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        }
          , Bn = function(a, b) {
            var c = 0;
            a = (0,
            _.kc)(String(a)).split(".");
            b = (0,
            _.kc)(String(b)).split(".");
            for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
                var f = a[e] || ""
                  , g = b[e] || "";
                do {
                    f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    if (0 == f[0].length && 0 == g[0].length)
                        break;
                    c = An(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || An(0 == f[2].length, 0 == g[2].length) || An(f[2], g[2]);
                    f = f[3];
                    g = g[3]
                } while (0 == c)
            }
            return c
        }
          , Dn = function(a) {
            var b = Cn;
            return Object.prototype.hasOwnProperty.call(b, "7.0") ? b["7.0"] : b["7.0"] = a("7.0")
        }
          , Cn = {}
          , En = function() {
            return Dn(function() {
                return 0 <= Bn(_.Gc, "7.0")
            })
        }
          , Fn = /^data:(.*);base64,[a-z0-9+\/]+=*$/i
          , Gn = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
          , bl = function(a) {
            if (a instanceof _.Mc)
                return a;
            a = "object" == typeof a && a.nb ? a.Sa() : String(a);
            Gn.test(a) ? a = _.Qc(a) : (a = String(a).replace(/(%0A|%0D)/g, ""),
            a = a.match(Fn) ? _.Qc(a) : null);
            return a
        }
          , Hn = function(a) {
            return a instanceof _.Tc && a.constructor === _.Tc ? a.g : "type_error:SafeStyle"
        }
          , dl = /\/\*/
          , In = function(a) {
            return a instanceof _.qk && a.constructor === _.qk ? a.g : "type_error:SafeStyleSheet"
        }
          , pl = function(a) {
            return a instanceof _.Zc ? a : _.ad(zn("object" == typeof a && a.nb ? a.Sa() : String(a)))
        }
          , Jn = /^[a-zA-Z0-9-]+$/
          , Kn = {
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
        }
          , Ln = function(a) {
            if (!Jn.test(a))
                throw Error("B");
            if (a.toUpperCase()in Kn)
                throw Error("B");
        }
          , Mn = {
            action: !0,
            cite: !0,
            data: !0,
            formaction: !0,
            href: !0,
            manifest: !0,
            poster: !0,
            src: !0
        }
          , rl = function(a, b) {
            if ((0,
            _.dd)())
                for (; a.lastChild; )
                    a.removeChild(a.lastChild);
            a.innerHTML = _.$c(b)
        }
          , Nn = function(a, b) {
            if (!(b instanceof _.Mc || b instanceof _.Mc)) {
                b = "object" == typeof b && b.nb ? b.Sa() : String(b);
                b: {
                    var c = b;
                    if (_.Oc) {
                        try {
                            var d = new URL(c)
                        } catch (e) {
                            c = "https:";
                            break b
                        }
                        c = d.protocol
                    } else
                        c: {
                            d = document.createElement("a");
                            try {
                                d.href = c
                            } catch (e) {
                                c = void 0;
                                break c
                            }
                            c = d.protocol;
                            c = ":" === c || "" === c ? "https:" : c
                        }
                }
                "javascript:" === c && (b = "about:invalid#zClosurez");
                b = _.Qc(b)
            }
            a.action = _.Yh(b)
        }
          , On = function(a, b) {
            return a + Math.random() * (b - a)
        }
          , Pn = function(a, b) {
            return new R(a.x - b.x,a.y - b.y)
        }
          , Qn = function(a) {
            return a.replace(/\xa0|[ \t]+/g, " ")
        }
          , Rn = function(a) {
            return a.replace(/[\s\xa0]+$/, "")
        }
          , Sn = function(a) {
            return a = zn(a)
        }
          , Tn = function(a) {
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
                    return "#" != c.charAt(0) || (c = Number("0" + c.slice(1)),
                    isNaN(c)) ? b : String.fromCharCode(c)
                }
            })
        }
          , Un = /&([^;\s<&]+);?/g
          , Vn = function(a) {
            var b = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"'
            };
            var c = _.t.document.createElement("div");
            return a.replace(Un, function(d, e) {
                var f = b[d];
                if (f)
                    return f;
                "#" == e.charAt(0) && (e = Number("0" + e.slice(1)),
                isNaN(e) || (f = String.fromCharCode(e)));
                f || (f = _.ad(d + " "),
                rl(c, f),
                f = c.firstChild.nodeValue.slice(0, -1));
                return b[d] = f
            })
        }
          , Wn = function(a) {
            return -1 != a.indexOf("&") ? "document"in _.t ? Vn(a) : Tn(a) : a
        }
          , S = function(a) {
            return _.md(document, a)
        }
          , Xn = function(a, b, c) {
            return _.ud(document, arguments)
        }
          , Yn = function(a, b) {
            _.td(_.kd(a), a, arguments, 1)
        }
          , Zn = function(a, b) {
            b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
        }
          , $n = function(a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        }
          , ao = function(a) {
            return _.ya(a) && 1 == a.nodeType
        }
          , bo = function(a) {
            return a.contentDocument || a.contentWindow.document
        }
          , co = function(a) {
            try {
                return a.contentWindow || (a.contentDocument ? _.rd(a.contentDocument) : null)
            } catch (b) {}
            return null
        }
          , eo = {
            SCRIPT: 1,
            STYLE: 1,
            HEAD: 1,
            IFRAME: 1,
            OBJECT: 1
        }
          , fo = {
            IMG: " ",
            BR: "\n"
        }
          , go = function(a) {
            a = a.tabIndex;
            return "number" === typeof a && 0 <= a && 32768 > a
        }
          , ho = function(a, b) {
            b ? a.tabIndex = 0 : (a.tabIndex = -1,
            a.removeAttribute("tabIndex"))
        }
          , io = function(a, b, c) {
            if (!(a.nodeName in eo))
                if (3 == a.nodeType)
                    c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
                else if (a.nodeName in fo)
                    b.push(fo[a.nodeName]);
                else
                    for (a = a.firstChild; a; )
                        io(a, b, c),
                        a = a.nextSibling
        }
          , jo = function(a) {
            var b = [];
            io(a, b, !0);
            a = b.join("");
            a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
            a = a.replace(/\u200B/g, "");
            a = a.replace(/ +/g, " ");
            " " != a && (a = a.replace(/^\s*/, ""));
            return a
        }
          , ko = function(a) {
            var b = [];
            io(a, b, !1);
            return b.join("")
        }
          , lo = function(a, b, c) {
            this.promise = a;
            this.resolve = b;
            this.reject = c
        }
          , mo = function() {
            var a, b, c = new _.te(function(d, e) {
                a = d;
                b = e
            }
            );
            return new lo(c,a,b)
        }
          , no = function(a, b, c) {
            c = null != c ? "=" + _.gd(c) : "";
            return ln(a, b + c)
        }
          , oo = function(a, b, c) {
            for (; 0 <= (b = a.indexOf("format", b)) && b < c; ) {
                var d = a.charCodeAt(b - 1);
                if (38 == d || 63 == d)
                    if (d = a.charCodeAt(b + 6),
                    !d || 61 == d || 38 == d || 35 == d)
                        return b;
                b += 7
            }
            return -1
        }
          , po = /#|$/
          , qo = /[?&]($|#)/
          , ro = function(a) {
            var b = _.Af(a);
            if ("undefined" == typeof b)
                throw Error("N");
            var c = new _.ag(null);
            a = _.zf(a);
            for (var d = 0; d < b.length; d++) {
                var e = b[d]
                  , f = a[d];
                Array.isArray(f) ? _.ng(c, e, f) : c.add(e, f)
            }
            return c
        }
          , jl = /^[a-z][a-z\d-]*$/i
          , ml = "APPLET BASE EMBED IFRAME LINK MATH META OBJECT SCRIPT STYLE SVG TEMPLATE".split(" ")
          , nl = "AREA BR COL COMMAND HR IMG INPUT KEYGEN PARAM SOURCE TRACK WBR".split(" ")
          , kl = ["action", "formaction", "href"]
          , so = {}
          , to = {}
          , uo = {}
          , tl = {}
          , vo = function(a, b) {
            _.G.call(this);
            this.l = a || 1;
            this.j = b || _.t;
            this.o = (0,
            _.z)(this.A, this);
            this.s = _.Cb()
        };
        _.A(vo, _.G);
        vo.prototype.h = !1;
        vo.prototype.g = null;
        var wo = function(a, b) {
            a.l = b;
            a.g && a.h ? (a.stop(),
            a.start()) : a.g && a.stop()
        };
        vo.prototype.A = function() {
            if (this.h) {
                var a = _.Cb() - this.s;
                0 < a && a < .8 * this.l ? this.g = this.j.setTimeout(this.o, this.l - a) : (this.g && (this.j.clearTimeout(this.g),
                this.g = null),
                this.dispatchEvent("tick"),
                this.h && (this.stop(),
                this.start()))
            }
        }
        ;
        vo.prototype.start = function() {
            this.h = !0;
            this.g || (this.g = this.j.setTimeout(this.o, this.l),
            this.s = _.Cb())
        }
        ;
        vo.prototype.stop = function() {
            this.h = !1;
            this.g && (this.j.clearTimeout(this.g),
            this.g = null)
        }
        ;
        vo.prototype.I = function() {
            vo.P.I.call(this);
            this.stop();
            delete this.j
        }
        ;
        var xo = function(a) {
            for (var b = [], c = 0, d = 0; d < a.length; d++) {
                var e = a.charCodeAt(d);
                128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023),
                b[c++] = e >> 18 | 240,
                b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224,
                b[c++] = e >> 6 & 63 | 128),
                b[c++] = e & 63 | 128)
            }
            return b
        }
          , zo = function(a) {
            return void 0 !== _.Ui(a, yo, 11, !1)
        }
          , Km = function(a, b, c) {
            var d = Ao;
            null == c && (c = void 0);
            var e = a.O
              , f = (0,
            _.ii)(e);
            _.ti(f);
            for (var g = 0, h = 0; h < d.length; h++) {
                var k = d[h];
                null != _.Ji(e, f, k) && (0 !== g && _.Ii(e, f, g),
                g = k)
            }
            (d = g) && d !== b && null != c && _.Ii(e, f, d);
            _.Ii(e, f, b, c);
            return a
        }
          , Bo = function(a, b, c) {
            var d = a.O
              , e = (0,
            _.ii)(d);
            _.ti(e);
            if (null != c) {
                for (var f = !!c.length, g = 0; g < c.length; g++) {
                    var h = c[g];
                    f = f && !((0,
                    _.Sh)(h.O) & 2)
                }
                g = (0,
                _.Sh)(c);
                h = g | 1;
                h = (f ? h | 8 : h & -9) | 4;
                h != g && (c = _.oi(c, h))
            }
            null == c && (c = void 0);
            _.Ii(d, e, b, c);
            return a
        }
          , Gm = function(a, b, c) {
            return _.Ti(a, b, wl(c))
        }
          , Do = function() {
            var a = new Co;
            return _.Ti(a, 1, 1)
        }
          , Eo = function() {
            this.g = document || {
                cookie: ""
            }
        };
        _.l = Eo.prototype;
        _.l.isEnabled = function() {
            if (!_.t.navigator.cookieEnabled)
                return !1;
            if (!this.Ib())
                return !0;
            this.set("TESTCOOKIESENABLED", "1", {
                lh: 60
            });
            if ("1" !== this.get("TESTCOOKIESENABLED"))
                return !1;
            this.remove("TESTCOOKIESENABLED");
            return !0
        }
        ;
        _.l.set = function(a, b, c) {
            var d = !1;
            if ("object" === typeof c) {
                var e = c.sn;
                d = c.tn || !1;
                var f = c.domain || void 0;
                var g = c.path || void 0;
                var h = c.lh
            }
            if (/[;=\s]/.test(a))
                throw Error("ka`" + a);
            if (/[;\r\n]/.test(b))
                throw Error("la`" + b);
            void 0 === h && (h = -1);
            this.g.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
        }
        ;
        _.l.get = function(a, b) {
            for (var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
                f = (0,
                _.kc)(d[e]);
                if (0 == f.lastIndexOf(c, 0))
                    return f.slice(c.length);
                if (f == a)
                    return ""
            }
            return b
        }
        ;
        _.l.remove = function(a, b, c) {
            var d = void 0 !== this.get(a);
            this.set(a, "", {
                lh: 0,
                path: b,
                domain: c
            });
            return d
        }
        ;
        _.l.mc = function() {
            return Fo(this).keys
        }
        ;
        _.l.Ya = function() {
            return Fo(this).values
        }
        ;
        _.l.Ib = function() {
            return !this.g.cookie
        }
        ;
        var Fo = function(a) {
            a = (a.g.cookie || "").split(";");
            for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
                e = (0,
                _.kc)(a[f]),
                d = e.indexOf("="),
                -1 == d ? (b.push(""),
                c.push(e)) : (b.push(e.substring(0, d)),
                c.push(e.substring(d + 1)));
            return {
                keys: b,
                values: c
            }
        }
          , xl = function(a) {
            this.O = _.H(a)
        };
        _.y(xl, _.J);
        var Go = function(a) {
            this.O = _.H(a)
        };
        _.y(Go, _.J);
        Go.pb = [1];
        var Ho = function(a) {
            this.g = a
        }
          , Io = function(a, b, c) {
            var d, e;
            return _.Gk(function(f) {
                if (1 == f.g) {
                    var g = a.g
                      , h = g.translate
                      , k = c || new Function
                      , m = b.O
                      , n = (0,
                    _.ii)(m)
                      , p = n & 2
                      , q = _.Ki(m, n, 1)
                      , r = (0,
                    _.Sh)(q);
                    if (!(r & 4)) {
                        Object.isFrozen(q) && (q = _.pi(_.Qh(q)),
                        _.Ii(m, n, 1, q));
                        for (var w = 0, D = 0; w < q.length; w++) {
                            var Q = _.vi(q[w]);
                            null != Q && (q[D++] = Q)
                        }
                        D < w && (q.length = D);
                        r |= 5;
                        p && (r |= 34);
                        (0,
                        _.ji)(q, r);
                        r & 2 && Object.freeze(q)
                    }
                    !p && (r & 2 || Object.isFrozen(q)) && (q = _.Qh(q),
                    (0,
                    _.gi)(q, 5),
                    _.Ii(m, n, 1, q));
                    return _.zk(f, h.call(g, k, q, b.lb(), b.ta(), 0, !1), 2)
                }
                d = f.j;
                e = d.map(yl);
                g = f.return;
                h = new Go;
                h = Bo(h, 1, e);
                return g.call(f, h)
            })
        }
          , Jo = function(a, b) {
            return null != a && a.Db === b
        }
          , Ko = function(a) {
            if (null != a)
                switch (a.Te) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0
                }
            return null
        }
          , Lo = function(a, b) {
            return a && b && a.Hj && b.Hj ? a.Db !== b.Db ? !1 : a.toString() === b.toString() : a instanceof _.yg && b instanceof _.yg ? a.Db != b.Db ? !1 : a.toString() == b.toString() : a == b
        }
          , Mo = function(a) {
            return a instanceof _.yg ? !!a.na() : !!a
        }
          , No = {}
          , Oo = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g
          , Po = /</g
          , Qo = function(a) {
            return a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>")
        }
          , So = function() {
            var a;
            Jo("", uo) ? a = "".na() : a = Ro.test("") ? "" : "zSoyz";
            Jo(a, uo) && (a = a.na());
            return (a && !a.startsWith(" ") ? " " : "") + a
        }
          , To = {
            "\x00": "&#0;",
            "\t": "&#9;",
            "\n": "&#10;",
            "\v": "&#11;",
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
        }
          , Uo = function(a) {
            return To[a]
        }
          , Vo = {
            "\x00": "\\0 ",
            "\b": "\\8 ",
            "\t": "\\9 ",
            "\n": "\\a ",
            "\v": "\\b ",
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
        }
          , Wo = function(a) {
            return Vo[a]
        }
          , Xo = {
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
            "\v": "%0B",
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
        }
          , Yo = function(a) {
            return Xo[a]
        }
          , Zo = /[\x00\x22\x26\x27\x3c\x3e]/g
          , $o = function(a) {
            return Jo(a, _.rk) ? a : a instanceof _.Zc ? (0,
            _.L)(_.$c(a).toString()) : a instanceof _.Zc ? (0,
            _.L)(_.$c(a).toString()) : (0,
            _.L)(String(String(a)).replace(Zo, Uo), Ko(a))
        }
          , ap = /[\x00\x22\x27\x3c\x3e]/g
          , T = function(a) {
            return Jo(a, _.rk) ? String(String(a.na()).replace(Oo, "").replace(Po, "&lt;")).replace(ap, Uo) : String(a).replace(Zo, Uo)
        }
          , bp = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g
          , cp = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g
          , dp = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g
          , ep = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g
          , fp = function(a) {
            return String(a).replace(ep, Yo)
        }
          , gp = function(a) {
            return Jo(a, to) ? a.na() : a instanceof _.Tb ? _.Wa(a).toString() : a instanceof _.Tb ? fp(_.Wa(a).toString()) : "about:invalid#zSoyz"
        }
          , hp = /^(?!-*(?:expression|(?:moz-)?binding))(?:(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|(?:calc|cubic-bezier|drop-shadow|hsl|hsla|hue-rotate|invert|linear-gradient|max|min|rgb|rgba|rotate|rotateZ|translate|translate3d|translateX|translateY)\((?:[-\u0020\t,+.!#%_0-9a-zA-Z]|(?:calc|cubic-bezier|drop-shadow|hsl|hsla|hue-rotate|invert|linear-gradient|max|min|rgb|rgba|rotate|rotateZ|translate|translate3d|translateX|translateY)\([-\u0020\t,+.!#%_0-9a-zA-Z]+\))+\)|[-+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e-?[0-9]+)?(?:[a-z]{1,4}|%)?|!important)(?:\s*[,\u0020]\s*|$))*$/i
          , ip = function(a) {
            Jo(a, _.ok) ? a = Qo(a.na()) : null == a ? a = "" : a instanceof _.Tc ? a = Qo(Hn(a)) : a instanceof _.Tc ? a = Qo(Hn(a)) : a instanceof _.qk ? a = Qo(In(a)) : a instanceof _.qk ? a = Qo(In(a)) : (a = String(a),
            a = hp.test(a) ? a : "zSoyz");
            return a
        }
          , jp = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i
          , kp = function(a) {
            Jo(a, so) || Jo(a, to) ? a = fp(a) : a instanceof _.Mc ? a = fp(_.Yh(a)) : a instanceof _.Mc ? a = fp(_.Yh(a)) : a instanceof _.Tb ? a = fp(_.Wa(a).toString()) : a instanceof _.Tb ? a = fp(_.Wa(a).toString()) : (a = String(a),
            a = jp.test(a) ? a.replace(ep, Yo) : "about:invalid#zSoyz");
            return a
        }
          , lp = /^[^&:\/?#]*(?:[\/?#]|$)|^https?:|^ftp:|^data:image\/[a-z0-9+]+;base64,[a-z0-9+\/]+=*$|^blob:/i
          , mp = function(a) {
            Jo(a, so) || Jo(a, to) ? a = fp(a) : a instanceof _.Mc ? a = fp(_.Yh(a)) : a instanceof _.Mc ? a = fp(_.Yh(a)) : a instanceof _.Tb ? a = fp(_.Wa(a).toString()) : a instanceof _.Tb ? a = fp(_.Wa(a).toString()) : (a = String(a),
            a = lp.test(a) ? a.replace(ep, Yo) : "about:invalid#zSoyz");
            return a
        }
          , Ro = /^(?!on|src|(?:action|archive|background|cite|classid|codebase|content|data|dsync|href|http-equiv|longdesc|style|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i
          , np = function(a, b, c, d) {
            this.top = a;
            this.right = b;
            this.bottom = c;
            this.left = d
        };
        np.prototype.ceil = function() {
            this.top = Math.ceil(this.top);
            this.right = Math.ceil(this.right);
            this.bottom = Math.ceil(this.bottom);
            this.left = Math.ceil(this.left);
            return this
        }
        ;
        np.prototype.floor = function() {
            this.top = Math.floor(this.top);
            this.right = Math.floor(this.right);
            this.bottom = Math.floor(this.bottom);
            this.left = Math.floor(this.left);
            return this
        }
        ;
        np.prototype.round = function() {
            this.top = Math.round(this.top);
            this.right = Math.round(this.right);
            this.bottom = Math.round(this.bottom);
            this.left = Math.round(this.left);
            return this
        }
        ;
        np.prototype.translate = function(a, b) {
            a instanceof R ? (this.left += a.x,
            this.right += a.x,
            this.top += a.y,
            this.bottom += a.y) : (this.left += a,
            this.right += a,
            "number" === typeof b && (this.top += b,
            this.bottom += b));
            return this
        }
        ;
        var op = function(a, b, c, d) {
            this.left = a;
            this.top = b;
            this.width = c;
            this.height = d
        };
        op.prototype.ceil = function() {
            this.left = Math.ceil(this.left);
            this.top = Math.ceil(this.top);
            this.width = Math.ceil(this.width);
            this.height = Math.ceil(this.height);
            return this
        }
        ;
        op.prototype.floor = function() {
            this.left = Math.floor(this.left);
            this.top = Math.floor(this.top);
            this.width = Math.floor(this.width);
            this.height = Math.floor(this.height);
            return this
        }
        ;
        op.prototype.round = function() {
            this.left = Math.round(this.left);
            this.top = Math.round(this.top);
            this.width = Math.round(this.width);
            this.height = Math.round(this.height);
            return this
        }
        ;
        op.prototype.translate = function(a, b) {
            a instanceof R ? (this.left += a.x,
            this.top += a.y) : (this.left += a,
            "number" === typeof b && (this.top += b));
            return this
        }
        ;
        var pp = function(a, b) {
            var c = _.kd(a);
            return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
        }
          , qp = function(a, b) {
            return pp(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
        }
          , rp = function(a) {
            "number" == typeof a && (a += "px");
            return a
        }
          , sp = function(a, b) {
            if (b instanceof R) {
                var c = b.x;
                b = b.y
            } else
                c = b,
                b = void 0;
            a.style.left = rp(c);
            a.style.top = rp(b)
        }
          , tp = function(a) {
            a = a ? _.kd(a) : document;
            return !_.E || 9 <= Number(_.Jc) || _.pd(_.ld(a).g) ? a.documentElement : a.body
        }
          , up = function(a) {
            try {
                return a.getBoundingClientRect()
            } catch (b) {
                return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }
            }
        }
          , vp = function(a) {
            if (_.E && !(8 <= Number(_.Jc)))
                return a.offsetParent;
            var b = _.kd(a)
              , c = qp(a, "position")
              , d = "fixed" == c || "absolute" == c;
            for (a = a.parentNode; a && a != b; a = a.parentNode)
                if (11 == a.nodeType && a.host && (a = a.host),
                c = qp(a, "position"),
                d = d && "static" == c && a != b.documentElement && a != b.body,
                !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))
                    return a;
            return null
        }
          , wp = function(a) {
            var b = _.kd(a)
              , c = new R(0,0)
              , d = tp(b);
            if (a == d)
                return c;
            a = up(a);
            b = bn(_.ld(b).g);
            c.x = a.left + b.x;
            c.y = a.top + b.y;
            return c
        }
          , xp = function(a) {
            for (var b = new np(0,Infinity,Infinity,0), c = _.ld(a), d = c.g.body, e = c.g.documentElement, f = an(c.g); a = vp(a); )
                if (!(_.E && 0 == a.clientWidth || _.sc && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != qp(a, "overflow")) {
                    var g = wp(a)
                      , h = new R(a.clientLeft,a.clientTop);
                    g.x += h.x;
                    g.y += h.y;
                    b.top = Math.max(b.top, g.y);
                    b.right = Math.min(b.right, g.x + a.clientWidth);
                    b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                    b.left = Math.max(b.left, g.x)
                }
            d = f.scrollLeft;
            f = f.scrollTop;
            b.left = Math.max(b.left, d);
            b.top = Math.max(b.top, f);
            c = _.qd(_.yd(c) || window);
            b.right = Math.min(b.right, d + c.width);
            b.bottom = Math.min(b.bottom, f + c.height);
            return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
        }
          , yp = function(a, b) {
            var c = new R(0,0)
              , d = _.rd(_.kd(a));
            if (!_.nc(d, "parent"))
                return c;
            do {
                if (d == b)
                    var e = wp(a);
                else
                    e = up(a),
                    e = new R(e.left,e.top);
                c.x += e.x;
                c.y += e.y
            } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
            return c
        }
          , Ap = function(a) {
            var b = zp;
            if ("none" != qp(a, "display"))
                return b(a);
            var c = a.style
              , d = c.display
              , e = c.visibility
              , f = c.position;
            c.visibility = "hidden";
            c.position = "absolute";
            c.display = "inline";
            a = b(a);
            c.display = d;
            c.position = f;
            c.visibility = e;
            return a
        }
          , zp = function(a) {
            var b = a.offsetWidth
              , c = a.offsetHeight
              , d = _.sc && !b && !c;
            return (void 0 === b || d) && a.getBoundingClientRect ? (a = up(a),
            new _.ed(a.right - a.left,a.bottom - a.top)) : new _.ed(b,c)
        }
          , Bp = function(a, b) {
            a.style.display = b ? "" : "none"
        }
          , Cp = function(a, b) {
            b = In(b);
            _.E && void 0 !== a.cssText ? a.cssText = b : _.t.trustedTypes ? _.xd(a, b) : a.innerHTML = b
        }
          , Dp = function(a, b) {
            b = _.ld(b);
            var c = b.g;
            if (_.E && c.createStyleSheet)
                b = c.createStyleSheet(),
                Cp(b, a);
            else {
                c = Zm(b.g, "HEAD")[0];
                if (!c) {
                    var d = Zm(b.g, "BODY")[0];
                    c = b.U("HEAD");
                    d.parentNode.insertBefore(c, d)
                }
                d = b.U("STYLE");
                var e;
                (e = _.Ik('style[nonce],link[rel="stylesheet"][nonce]')) && d.setAttribute("nonce", e);
                Cp(d, a);
                b.appendChild(c, d)
            }
        }
          , Ep = function(a) {
            return "rtl" == qp(a, "direction")
        }
          , Fp = function(a) {
            return new _.ed(a.offsetWidth,a.offsetHeight)
        }
          , Gp = function(a, b, c) {
            a = a.style;
            _.rc ? a.MozBoxSizing = c : _.sc ? a.WebkitBoxSizing = c : a.boxSizing = c;
            a.width = Math.max(b.width, 0) + "px";
            a.height = Math.max(b.height, 0) + "px"
        }
          , Hp = function(a, b) {
            Gp(a, b, "content-box")
        }
          , Ip = function(a, b) {
            if (/^\d+px?$/.test(b))
                return parseInt(b, 10);
            var c = a.style.left
              , d = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            a.style.left = b;
            b = a.style.pixelLeft;
            a.style.left = c;
            a.runtimeStyle.left = d;
            return +b
        }
          , Jp = function(a, b) {
            return (b = a.currentStyle ? a.currentStyle[b] : null) ? Ip(a, b) : 0
        }
          , Kp = function(a) {
            if (_.E) {
                var b = Jp(a, "paddingLeft")
                  , c = Jp(a, "paddingRight")
                  , d = Jp(a, "paddingTop");
                a = Jp(a, "paddingBottom");
                return new np(d,c,a,b)
            }
            b = pp(a, "paddingLeft");
            c = pp(a, "paddingRight");
            d = pp(a, "paddingTop");
            a = pp(a, "paddingBottom");
            return new np(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))
        }
          , Lp = {
            thin: 2,
            medium: 4,
            thick: 6
        }
          , Mp = function(a, b) {
            if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
                return 0;
            b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
            return b in Lp ? Lp[b] : Ip(a, b)
        }
          , Np = function(a) {
            if (_.E && !(9 <= Number(_.Jc))) {
                var b = Mp(a, "borderLeft")
                  , c = Mp(a, "borderRight")
                  , d = Mp(a, "borderTop");
                a = Mp(a, "borderBottom");
                return new np(d,c,a,b)
            }
            b = pp(a, "borderLeftWidth");
            c = pp(a, "borderRightWidth");
            d = pp(a, "borderTopWidth");
            a = pp(a, "borderBottomWidth");
            return new np(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))
        };
        var Op = function(a) {
            this.O = _.H(a)
        };
        _.y(Op, _.J);
        Op.pb = [2];
        var Nm = function(a) {
            this.O = _.H(a)
        };
        _.y(Nm, _.J);
        Nm.prototype.getSeconds = function() {
            return _.Ni(_.Si(this, 1), 0)
        }
        ;
        Nm.prototype.setSeconds = function(a) {
            return _.Li(this, 1, a, 0)
        }
        ;
        var Mm = function(a) {
            this.O = _.H(a)
        };
        _.y(Mm, _.J);
        Mm.prototype.getSeconds = function() {
            return _.Ni(_.Si(this, 1), 0)
        }
        ;
        Mm.prototype.setSeconds = function(a) {
            return _.Li(this, 1, a, 0)
        }
        ;
        var Pp = function(a) {
            if (!a)
                return "";
            if (/^about:(?:blank|srcdoc)$/.test(a))
                return window.origin || "";
            a.startsWith("blob:") && (a = a.substring(5));
            a = a.split("#")[0].split("?")[0];
            a = a.toLowerCase();
            0 == a.indexOf("//") && (a = window.location.protocol + a);
            /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
            var b = a.substring(a.indexOf("://") + 3)
              , c = b.indexOf("/");
            -1 != c && (b = b.substring(0, c));
            c = a.substring(0, a.indexOf("://"));
            if (!c)
                throw Error("xa`" + a);
            if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !== c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c)
                throw Error("ya`" + c);
            a = "";
            var d = b.indexOf(":");
            if (-1 != d) {
                var e = b.substring(d + 1);
                b = b.substring(0, d);
                if ("http" === c && "80" !== e || "https" === c && "443" !== e)
                    a = ":" + e
            }
            return c + "://" + b + a
        };
        var Qp = function(a) {
            return function() {
                return a
            }
        }
          , Rp = function(a, b) {
            for (var c = 0; c < b.length - 2; c += 3) {
                var d = b.charAt(c + 2);
                d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
                d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
                a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
            }
            return a
        }
          , Tp = function(a) {
            var b = Sp.split(".")
              , c = Number(b[0]) || 0;
            a = xo(a);
            for (var d = c, e = 0; e < a.length; e++)
                d += a[e],
                d = Rp(d, "+-a^+6");
            d = Rp(d, "+-3^+b+-f");
            d ^= Number(b[1]) || 0;
            0 > d && (d = (d & 2147483647) + 2147483648);
            b = d % 1E6;
            return b.toString() + "." + (b ^ c)
        }
          , Up = function() {
            var a = Qp(String.fromCharCode(116))
              , b = Qp(String.fromCharCode(107));
            a = [a(), a()];
            a[1] = b();
            return a.join("")
        };
        var Vp = window.google && google.translate && google.translate._const;
        Vp || (Vp = {
            _cac: "",
            _cam: "",
            _cest: new Date,
            _cjlc: "",
            _cl: "",
            _cuc: "",
            _cnad: !1,
            _cnal: {},
            im: "",
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
        var Wp = window.google && window.google.translate && window.google.translate.v || ""
          , Xp = Vp._cl || "en"
          , Yp = Vp._cuc
          , Zp = Vp._cnad
          , $p = Vp._cest
          , aq = Vp._cnal || {}
          , bq = "lib" == Vp._cam ? 1 : 0
          , cq = (Vp._cac || "te") + (1 == bq ? "_lib" : "")
          , Sp = function() {
            function a(d) {
                return function() {
                    return d
                }
            }
            var b = String.fromCharCode(107)
              , c = a(String.fromCharCode(116));
            b = a(b);
            c = [c(), c()];
            c[1] = b();
            return Vp["_c" + c.join(b())] || ""
        }()
          , dq = Vp._pah || ""
          , eq = Vp._pas || "https://"
          , fq = Vp._pbi || ""
          , gq = Vp._pci || ""
          , hq = Vp._plla || ""
          , iq = Vp._pli || ""
          , jq = Vp._ps || ""
          , kq = Vp._puh || ""
          , lq = "//" + kq + "/translate_suggestion?client=" + cq
          , mq = "//" + dq + "/translate_voting?client=" + cq
          , nq = "https://www.google.com/support/translate" + ("en" == Xp ? "" : "#googtrans/en/" + Xp);
        var pq = function(a, b, c) {
            var d = String(_.t.location.href);
            return d && a && b ? [b, oq(Pp(d), a, c || null)].join(" ") : null
        }
          , oq = function(a, b, c) {
            var d = []
              , e = [];
            if (1 == (Array.isArray(c) ? 2 : 1))
                return e = [b, a],
                _.ec(d, function(h) {
                    e.push(h)
                }),
                qq(e.join(" "));
            var f = []
              , g = [];
            _.ec(c, function(h) {
                g.push(h.key);
                f.push(h.value)
            });
            c = Math.floor((new Date).getTime() / 1E3);
            e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
            _.ec(d, function(h) {
                e.push(h)
            });
            a = qq(e.join(" "));
            a = [c, a];
            0 == g.length || a.push(g.join(""));
            return a.join("_")
        }
          , qq = function(a) {
            var b = Al();
            b.update(a);
            return b.Ii().toLowerCase()
        };
        var rq = {};
        var sq = function(a) {
            return !!rq.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a)
        }
          , tq = function(a, b, c, d) {
            (a = _.t[a]) || "undefined" === typeof document || (a = (new Eo).get(b));
            return a ? pq(a, c, d) : null
        }
          , uq = function(a, b) {
            b = void 0 === b ? !1 : b;
            var c = Pp(String(_.t.location.href))
              , d = [];
            var e = b;
            e = void 0 === e ? !1 : e;
            var f = _.t.__SAPISID || _.t.__APISID || _.t.__3PSAPISID || _.t.__OVERRIDE_SID;
            sq(e) && (f = f || _.t.__1PSAPISID);
            if (f)
                e = !0;
            else {
                if ("undefined" !== typeof document) {
                    var g = new Eo;
                    f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID") || g.get("OSID");
                    sq(e) && (f = f || g.get("__Secure-1PAPISID"))
                }
                e = !!f
            }
            e && (e = (c = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:") || 0 == c.indexOf("moz-extension:")) ? _.t.__SAPISID : _.t.__APISID,
            e || "undefined" === typeof document || (e = new Eo,
            e = e.get(c ? "SAPISID" : "APISID") || e.get("__Secure-3PAPISID")),
            (e = e ? pq(e, c ? "SAPISIDHASH" : "APISIDHASH", a) : null) && d.push(e),
            c && sq(b) && ((b = tq("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && d.push(b),
            (a = tq("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && d.push(a)));
            return 0 == d.length ? null : d.join(" ")
        };
        var vq = function(a) {
            this.O = _.H(a)
        };
        _.y(vq, _.J);
        var wq = function(a) {
            this.O = _.H(a)
        };
        _.y(wq, _.J);
        var xq = function(a) {
            this.g = this.h = this.j = a
        };
        xq.prototype.reset = function() {
            this.g = this.h = this.j
        }
        ;
        xq.prototype.ua = function() {
            return this.h
        }
        ;
        var yq = function(a) {
            this.O = _.H(a)
        };
        _.y(yq, _.J);
        var zq = function(a) {
            this.O = _.H(a)
        };
        _.y(zq, _.J);
        zq.pb = [1];
        var yo = function(a) {
            this.O = _.H(a)
        };
        _.y(yo, _.J);
        var Aq = ["platform", "platformVersion", "architecture", "model", "uaFullVersion"];
        new zq;
        var Co = function(a) {
            this.O = _.H(a)
        };
        _.y(Co, _.J);
        var Bq = function(a) {
            this.O = _.H(a)
        };
        _.y(Bq, _.J);
        Bq.prototype.ua = function() {
            return _.vi(_.Si(this, 2))
        }
        ;
        Bq.prototype.Pa = function(a) {
            Gm(this, 2, a)
        }
        ;
        var Cq = function(a) {
            this.O = _.H(a)
        };
        _.y(Cq, _.J);
        var Dq = function(a) {
            this.O = _.H(a, 34)
        };
        _.y(Dq, _.J);
        Dq.prototype.Pa = function(a, b) {
            var c = this.O
              , d = (0,
            _.ii)(c);
            _.ti(d);
            var e = _.Mi(c, d, Bq, 3, !1, 2);
            b = null != b ? b : new Bq;
            if ("number" !== typeof a || 0 > a || a > e.length)
                throw Error();
            void 0 != a ? e.splice(a, 1, b) : e.push(b);
            (0,
            _.Sh)(b.O) & 2 && (0,
            _.hi)(e, 8);
            d & 1024 && (0,
            _.ji)(c, d & -1025)
        }
        ;
        Dq.pb = [3, 20, 27];
        var Eq = function(a) {
            this.O = _.H(a, 19)
        };
        _.y(Eq, _.J);
        Eq.pb = [3, 5];
        var Fq = function(a) {
            this.O = _.H(a, 6)
        };
        _.y(Fq, _.J);
        var Gq = function(a) {
            return function(b) {
                return _.Yi(a, b)
            }
        }(Fq);
        Fq.pb = [5];
        var Hq = function(a) {
            this.O = _.H(a)
        };
        _.y(Hq, _.J);
        var Iq = new function(a, b) {
            this.g = a;
            this.ic = b;
            this.h = _.Vi;
            this.defaultValue = void 0
        }
        (175237375,Hq);
        var Mq = function(a) {
            _.G.call(this);
            var b = this;
            this.h = [];
            this.M = "";
            this.G = !1;
            this.S = this.L = -1;
            this.N = !1;
            this.A = this.experimentIds = null;
            this.s = this.l = 0;
            this.V = 1;
            this.Zf = 0;
            this.B = !1;
            _.G.call(this);
            this.pd = a.pd;
            this.lc = a.lc || function() {}
            ;
            this.j = new Jq(a.pd,a.qc);
            this.uc = a.uc;
            this.Rc = a.Rc || null;
            this.ba = _.Bb(On, 0, 1);
            this.D = a.Pk || null;
            this.Yb = a.Yb || null;
            this.jd = a.jd || !1;
            this.td = a.td || null;
            this.withCredentials = !a.Ve;
            this.qc = a.qc || !1;
            this.Y = !this.qc && !!_.rd() && !!_.rd().navigator && void 0 !== _.rd().navigator.sendBeacon;
            var c = Do();
            Kq(this.j, c);
            this.o = new xq(1E4);
            this.g = new vo(this.o.ua());
            _.hj(this, this.g);
            a = Lq(this, a.Ci);
            _.F(this.g, "tick", a, !1, this);
            this.F = new vo(6E5);
            _.hj(this, this.F);
            _.F(this.F, "tick", a, !1, this);
            this.jd || this.F.start();
            this.qc || (_.F(document, "visibilitychange", function() {
                "hidden" === document.visibilityState && b.H()
            }),
            _.F(document, "pagehide", this.H, !1, this))
        };
        _.y(Mq, _.G);
        var Lq = function(a, b) {
            return b ? function() {
                b().then(function() {
                    a.flush()
                })
            }
            : function() {
                a.flush()
            }
        };
        Mq.prototype.I = function() {
            this.H();
            _.G.prototype.I.call(this)
        }
        ;
        var Nq = function(a) {
            a.D || (a.D = .01 > a.ba() ? "https://www.google.com/log?format=json&hasfast=true" : "https://play.google.com/log?format=json&hasfast=true");
            return a.D
        }
          , Oq = function(a, b) {
            a.o = new xq(1 > b ? 1 : b);
            wo(a.g, a.o.ua())
        };
        Mq.prototype.log = function(a) {
            a = Wk(a);
            var b = this.V++;
            a = _.Ti(a, 21, b);
            _.Si(a, 1) || _.Ti(a, 1, Date.now().toString());
            null == _.Si(a, 15) && _.Ti(a, 15, 60 * (new Date).getTimezoneOffset());
            this.experimentIds && (b = Wk(this.experimentIds),
            _.I(a, 16, b));
            b = this.h.length - 1E3 + 1;
            0 < b && (this.h.splice(0, b),
            this.l += b);
            this.h.push(a);
            this.dispatchEvent(new Pq(a));
            this.jd || this.g.h || this.g.start()
        }
        ;
        Mq.prototype.flush = function(a, b) {
            var c = this;
            if (0 === this.h.length)
                a && a();
            else if (this.B)
                Qq(this.j, 3),
                Rq(this);
            else {
                var d = Date.now();
                if (this.S > d && this.L < d)
                    b && b("throttled");
                else {
                    Qq(this.j, 1);
                    var e = Sq(this.j, this.h, this.l, this.s, this.Rc);
                    d = {};
                    var f = this.lc();
                    f && (d.Authorization = f);
                    var g = Nq(this);
                    this.Yb && (d["X-Goog-AuthUser"] = this.Yb,
                    g = no(g, "authuser", this.Yb));
                    this.td && (d["X-Goog-PageId"] = this.td,
                    g = no(g, "pageId", this.td));
                    if (f && this.M === f)
                        b && b("stale-auth-token");
                    else {
                        this.h = [];
                        this.g.h && this.g.stop();
                        this.l = 0;
                        var h = kn(e), k;
                        this.A && this.A.wb() && (k = Promise.resolve(Dm(Uint8Array.from(xo(h)))));
                        var m = {
                            url: g,
                            body: h,
                            Di: 1,
                            Jf: d,
                            yk: "POST",
                            withCredentials: this.withCredentials,
                            Zf: this.Zf
                        }
                          , n = function(r) {
                            c.o.reset();
                            wo(c.g, c.o.ua());
                            if (r) {
                                var w = null;
                                try {
                                    var D = JSON.stringify(JSON.parse(r.replace(")]}'\n", "")));
                                    w = Gq(D)
                                } catch (Q) {}
                                w && (r = Number(_.Ni(_.Si(w, 1), "-1")),
                                0 < r && (c.L = Date.now(),
                                c.S = c.L + r),
                                w = Iq.ic ? Iq.h(w, Iq.ic, Iq.g, !0) : Iq.h(w, Iq.g, null, !0),
                                w = null === w ? void 0 : w) && (r = -1,
                                r = void 0 === r ? 0 : r,
                                w = _.Ni(_.gj(_.Si(w, 1)), r),
                                -1 !== w && (c.N || Oq(c, w)))
                            }
                            a && a();
                            c.s = 0
                        }
                          , p = function(r, w) {
                            var D = _.Wi(e, Dq, 3)
                              , Q = _.Si(e, 14)
                              , W = c.o;
                            W.g = Math.min(3E5, 2 * W.g);
                            W.h = Math.min(3E5, W.g + Math.round(.2 * (Math.random() - .5) * W.g));
                            wo(c.g, c.o.ua());
                            401 === r && f && (c.M = f);
                            Q && (c.l += Q);
                            void 0 === w && (w = 500 <= r && 600 > r || 401 === r || 0 === r);
                            w && (c.h = D.concat(c.h),
                            c.jd || c.g.h || c.g.start());
                            b && b("net-send-failed", r);
                            ++c.s
                        }
                          , q = function() {
                            c.uc && c.uc.send(m, n, p)
                        };
                        k ? k.then(function(r) {
                            m.Jf["Content-Encoding"] = "gzip";
                            m.Jf["Content-Type"] = "application/binary";
                            m.body = r;
                            m.Di = 2;
                            q()
                        }, function() {
                            q()
                        }) : q()
                    }
                }
            }
        }
        ;
        Mq.prototype.H = function() {
            Tq(this.j, !0);
            this.G && (Qq(this.j, 3),
            Rq(this));
            this.flush();
            Tq(this.j, !1)
        }
        ;
        var Rq = function(a) {
            Uq(a, function(b, c) {
                b = no(b, "format", "json");
                var d = !1;
                try {
                    // EDGE TRANSLATE: Disable log.
                    // d = _.rd().navigator.sendBeacon(b, kn(c))
                    d = !0;
                } catch (e) {}
                a.B && !d && (a.B = !1);
                return d
            })
        }
          , Uq = function(a, b) {
            if (0 !== a.h.length) {
                var c = Nq(a);
                for (var d = c.search(po), e = 0, f, g = []; 0 <= (f = oo(c, e, d)); )
                    g.push(c.substring(e, f)),
                    e = Math.min(c.indexOf("&", f) + 1 || d, d);
                g.push(c.slice(e));
                c = g.join("").replace(qo, "$1");
                c = nn(c, "auth", a.lc(), "authuser", a.Yb || "0");
                for (d = 0; 10 > d && a.h.length; ++d) {
                    e = a.h.slice(0, 32);
                    f = Sq(a.j, e, a.l, a.s, a.Rc);
                    if (!b(c, f)) {
                        ++a.s;
                        break
                    }
                    a.l = 0;
                    a.s = 0;
                    a.h = a.h.slice(e.length)
                }
                a.g.h && a.g.stop()
            }
        }
          , Pq = function() {
            _.Ad.call(this, "event-logged", void 0)
        };
        _.y(Pq, _.Ad);
        var Jq = function(a, b) {
            this.qc = b = void 0 === b ? !1 : b;
            this.h = this.locale = null;
            this.g = new Eq;
            Number.isInteger(a) && _.Ti(this.g, 2, a);
            b || (this.locale = document.documentElement.getAttribute("lang"));
            Kq(this, new Co)
        }
          , Kq = function(a, b) {
            _.I(a.g, 1, b);
            _.Si(b, 1) || _.Ti(b, 1, 1);
            a.qc || (b = Vq(a),
            _.vi(_.Si(b, 5)) || Gm(b, 5, a.locale));
            a.h && (b = Vq(a),
            _.Vi(b, zq, 9) || _.I(b, 9, a.h))
        }
          , Qq = function(a, b) {
            zo(_.Vi(a.g, Co, 1)) && (a = Wq(a),
            _.Ti(a, 1, b))
        }
          , Tq = function(a, b) {
            zo(_.Vi(a.g, Co, 1)) && (a = Wq(a),
            _.Ti(a, 2, null == b ? b : _.ui(b)))
        }
          , Xq = function(a, b) {
            var c = void 0 === c ? Aq : c;
            b(_.rd(), c).then(function(d) {
                a.h = d;
                d = Vq(a);
                _.I(d, 9, a.h);
                return !0
            }).catch(function() {
                return !1
            })
        }
          , Vq = function(a) {
            a = _.Vi(a.g, Co, 1);
            var b = _.Vi(a, yo, 11);
            b || (b = new yo,
            _.I(a, 11, b));
            return b
        }
          , Wq = function(a) {
            a = Vq(a);
            var b = _.Vi(a, yq, 10);
            b || (b = new yq,
            _.Ti(b, 2, _.ui(!1)),
            _.I(a, 10, b));
            return b
        }
          , Sq = function(a, b, c, d, e) {
            c = void 0 === c ? 0 : c;
            d = void 0 === d ? 0 : d;
            if (zo(_.Vi(a.g, Co, 1))) {
                var f = Wq(a);
                _.Ti(f, 3, vl(d))
            }
            a = Wk(a.g);
            a = _.Ti(a, 4, Date.now().toString());
            b = Bo(a, 3, b);
            e && (a = new vq,
            e = _.Ti(a, 13, vl(e)),
            a = new wq,
            e = _.I(a, 2, e),
            a = new Cq,
            e = _.I(a, 1, e),
            _.I(b, 18, e));
            c && _.Ti(b, 14, c);
            return b
        };
        var Yq = function() {};
        Yq.prototype.send = function(a, b, c) {
            b = void 0 === b ? function() {}
            : b;
            c = void 0 === c ? function() {}
            : c;
            _.Qi(a.url, function(d) {
                d = d.target;
                d.nd() ? b(d.kb()) : c(d.ub())
            }, a.yk, a.body, a.Jf, a.Zf, a.withCredentials)
        }
        ;
        var Zq = function(a, b) {
            _.B.call(this);
            this.pd = a;
            this.Yb = b;
            this.l = "https://play.google.com/log?format=json&hasfast=true";
            this.g = !1;
            this.uc = new Yq
        };
        _.y(Zq, _.B);
        var $q = function(a) {
            a.j = Wp;
            return a
        }
          , br = function(a) {
            a.h = new ar;
            return a
        }
          , cr = function(a) {
            var b = new Zq(1871,"0");
            b.l = "https://translate.googleapis.com/element/log?format=json&hasfast=true";
            b.lc = a;
            return b
        }
          , dr = function(a) {
            a.g = !0;
            return a
        };
        Zq.prototype.Ve = function() {
            this.D = !0;
            return this
        }
        ;
        var er = function(a) {
            var b = new Mq({
                pd: a.pd,
                lc: a.lc ? a.lc : uq,
                Yb: a.Yb,
                Pk: a.l,
                qc: !1,
                jd: !1,
                Ve: a.D,
                td: void 0,
                Ci: void 0,
                uc: a.uc ? a.uc : void 0
            });
            _.hj(a, b);
            a.s && Kq(b.j, a.s);
            if (a.j) {
                var c = a.j
                  , d = Vq(b.j);
                Gm(d, 7, c)
            }
            a.h && (b.A = a.h);
            a.Rc && (b.Rc = a.Rc);
            a.o && ((c = a.o) ? (b.experimentIds || (b.experimentIds = new Op),
            c = kn(c),
            Gm(b.experimentIds, 4, c)) : b.experimentIds && _.Ti(b.experimentIds, 4, void 0, !1));
            if (a.B) {
                var e = a.B;
                b.experimentIds || (b.experimentIds = new Op);
                c = b.experimentIds.O;
                d = (0,
                _.ii)(c);
                _.ti(d);
                e = null == e ? _.ki : _.ni(e);
                _.Ii(c, d, 2, e)
            }
            a.g && (b.G = a.g && b.Y);
            a.A && (c = a.A,
            b.N = !0,
            Oq(b, c));
            a.F && Xq(b.j, a.F);
            return b
        };
        var N = {}
          , fr = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
        N.assign = function(a) {
            for (var b = Array.prototype.slice.call(arguments, 1); b.length; ) {
                var c = b.shift();
                if (c) {
                    if ("object" !== typeof c)
                        throw new TypeError("za`" + c);
                    for (var d in c)
                        Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
                }
            }
            return a
        }
        ;
        N.Wf = function(a, b) {
            if (a.length === b)
                return a;
            if (a.subarray)
                return a.subarray(0, b);
            a.length = b;
            return a
        }
        ;
        var gr = {
            Dc: function(a, b, c, d, e) {
                if (b.subarray && a.subarray)
                    a.set(b.subarray(c, c + d), e);
                else
                    for (var f = 0; f < d; f++)
                        a[e + f] = b[c + f]
            },
            Ig: function(a) {
                var b, c;
                var d = c = 0;
                for (b = a.length; d < b; d++)
                    c += a[d].length;
                var e = new Uint8Array(c);
                d = c = 0;
                for (b = a.length; d < b; d++) {
                    var f = a[d];
                    e.set(f, c);
                    c += f.length
                }
                return e
            }
        }
          , hr = {
            Dc: function(a, b, c, d, e) {
                for (var f = 0; f < d; f++)
                    a[e + f] = b[c + f]
            },
            Ig: function(a) {
                return [].concat.apply([], a)
            }
        };
        N.Ck = function() {
            fr ? (N.zc = Uint8Array,
            N.Ab = Uint16Array,
            N.Wh = Int32Array,
            N.assign(N, gr)) : (N.zc = Array,
            N.Ab = Array,
            N.Wh = Array,
            N.assign(N, hr))
        }
        ;
        N.Ck();
        var ir = !0;
        try {
            new Uint8Array(1)
        } catch (a) {
            ir = !1
        }
        var Bm = function(a) {
            var b, c, d = a.length, e = 0;
            for (b = 0; b < d; b++) {
                var f = a.charCodeAt(b);
                if (55296 === (f & 64512) && b + 1 < d) {
                    var g = a.charCodeAt(b + 1);
                    56320 === (g & 64512) && (f = 65536 + (f - 55296 << 10) + (g - 56320),
                    b++)
                }
                e += 128 > f ? 1 : 2048 > f ? 2 : 65536 > f ? 3 : 4
            }
            var h = new N.zc(e);
            for (b = c = 0; c < e; b++)
                f = a.charCodeAt(b),
                55296 === (f & 64512) && b + 1 < d && (g = a.charCodeAt(b + 1),
                56320 === (g & 64512) && (f = 65536 + (f - 55296 << 10) + (g - 56320),
                b++)),
                128 > f ? h[c++] = f : (2048 > f ? h[c++] = 192 | f >>> 6 : (65536 > f ? h[c++] = 224 | f >>> 12 : (h[c++] = 240 | f >>> 18,
                h[c++] = 128 | f >>> 12 & 63),
                h[c++] = 128 | f >>> 6 & 63),
                h[c++] = 128 | f & 63);
            return h
        };
        var jm = {};
        jm = function(a, b, c, d) {
            var e = a & 65535 | 0;
            a = a >>> 16 & 65535 | 0;
            for (var f; 0 !== c; ) {
                f = 2E3 < c ? 2E3 : c;
                c -= f;
                do
                    e = e + b[d++] | 0,
                    a = a + e | 0;
                while (--f);
                e %= 65521;
                a %= 65521
            }
            return e | a << 16 | 0
        }
        ;
        for (var km = {}, jr, kr = [], lr = 0; 256 > lr; lr++) {
            jr = lr;
            for (var mr = 0; 8 > mr; mr++)
                jr = jr & 1 ? 3988292384 ^ jr >>> 1 : jr >>> 1;
            kr[lr] = jr
        }
        km = function(a, b, c, d) {
            c = d + c;
            for (a ^= -1; d < c; d++)
                a = a >>> 8 ^ kr[(a ^ b[d]) & 255];
            return a ^ -1
        }
        ;
        var $l = {};
        $l = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        };
        var Pl = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
          , Sl = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
          , Am = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
          , dm = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
          , em = Array(576);
        Bl(em);
        var fm = Array(60);
        Bl(fm);
        var Rl = Array(512);
        Bl(Rl);
        var Ol = Array(256);
        Bl(Ol);
        var Ql = Array(29);
        Bl(Ql);
        var Tl = Array(30);
        Bl(Tl);
        var xm, ym, zm, wm = !1;
        var sm;
        sm = [new qm(0,0,0,0,function(a, b) {
            var c = 65535;
            for (c > a.gb - 5 && (c = a.gb - 5); ; ) {
                if (1 >= a.R) {
                    lm(a);
                    if (0 === a.R && 0 === b)
                        return 1;
                    if (0 === a.R)
                        break
                }
                a.K += a.R;
                a.R = 0;
                var d = a.Xa + c;
                if (0 === a.K || a.K >= d)
                    if (a.R = a.K - d,
                    a.K = d,
                    gm(a, !1),
                    0 === a.Z.ca)
                        return 1;
                if (a.K - a.Xa >= a.Ga - 262 && (gm(a, !1),
                0 === a.Z.ca))
                    return 1
            }
            a.Ta = 0;
            if (4 === b)
                return gm(a, !0),
                0 === a.Z.ca ? 3 : 4;
            a.K > a.Xa && gm(a, !1);
            return 1
        }
        ), new qm(4,4,8,4,mm), new qm(4,5,16,8,mm), new qm(4,6,32,32,mm), new qm(4,4,16,16,nm), new qm(8,16,32,32,nm), new qm(8,16,128,128,nm), new qm(8,32,128,256,nm), new qm(32,128,258,1024,nm), new qm(32,258,258,4096,nm)];
        var vm = {};
        vm = function() {
            this.input = null;
            this.xc = this.Ka = this.vc = 0;
            this.sd = null;
            this.ag = this.ca = this.Nc = 0;
            this.msg = "";
            this.state = null;
            this.Ue = 2;
            this.X = 0
        }
        ;
        var Cm = Object.prototype.toString;
        um.prototype.push = function(a, b) {
            var c = this.Z
              , d = this.options.Ei;
            if (this.ended)
                return !1;
            var e = b === ~~b ? b : !0 === b ? 4 : 0;
            "string" === typeof a ? c.input = Bm(a) : "[object ArrayBuffer]" === Cm.call(a) ? c.input = new Uint8Array(a) : c.input = a;
            c.vc = 0;
            c.Ka = c.input.length;
            do {
                0 === c.ca && (c.sd = new N.zc(d),
                c.Nc = 0,
                c.ca = d);
                a = tm(c, e);
                if (1 !== a && 0 !== a)
                    return this.fb(a),
                    this.ended = !0,
                    !1;
                if (0 === c.ca || 0 === c.Ka && (4 === e || 2 === e))
                    if ("string" === this.options.Th) {
                        var f = N.Wf(c.sd, c.Nc);
                        b = f;
                        f = f.length;
                        if (65537 > f && (b.subarray && ir || !b.subarray))
                            b = String.fromCharCode.apply(null, N.Wf(b, f));
                        else {
                            for (var g = "", h = 0; h < f; h++)
                                g += String.fromCharCode(b[h]);
                            b = g
                        }
                        this.dd.push(b)
                    } else
                        b = N.Wf(c.sd, c.Nc),
                        this.dd.push(b)
            } while ((0 < c.Ka || 0 === c.ca) && 1 !== a);
            if (4 === e)
                return (c = this.Z) && c.state ? (d = c.state.status,
                42 !== d && 69 !== d && 73 !== d && 91 !== d && 103 !== d && 113 !== d && 666 !== d ? a = am(c, -2) : (c.state = null,
                a = 113 === d ? am(c, -3) : 0)) : a = -2,
                this.fb(a),
                this.ended = !0,
                0 === a;
            2 === e && (this.fb(0),
            c.ca = 0);
            return !0
        }
        ;
        um.prototype.fb = function(a) {
            0 === a && (this.result = "string" === this.options.Th ? this.dd.join("") : N.Ig(this.dd));
            this.dd = [];
            this.Ye = a;
            this.msg = this.Z.msg
        }
        ;
        var ar = function() {};
        ar.prototype.wb = function() {
            try {
                return !!Uint8Array.from
            } catch (a) {
                return !1
            }
        }
        ;
        var or = function() {
            this.g = nr()
        }
          , nr = function() {
            return er($q(br(dr(cr(function() {
                return null
            }).Ve()))))
        };
        or.prototype.log = function(a) {
            var b = this.g;
            if (a instanceof Dq)
                b.log(a);
            else {
                var c = new Dq;
                a = kn(a);
                c = Gm(c, 8, a);
                b.log(c)
            }
        }
        ;
        var pr = new or;
        var qr = Em("initialized")
          , rr = Em("initiated")
          , sr = Em("restored")
          , tr = Em("page_load_to_initialized")
          , ur = Em("initialization_to_translation_triggered");
        var Jm = function(a) {
            this.O = _.H(a)
        };
        _.y(Jm, _.J);
        var vr = function(a) {
            this.O = _.H(a)
        };
        _.y(vr, _.J);
        var Fm = function(a) {
            this.O = _.H(a)
        };
        _.y(Fm, _.J);
        var Ao = [4, 5, 6];
        var wr = function(a) {
            this.O = _.H(a)
        };
        _.y(wr, _.J);
        var xr = function(a) {
            this.O = _.H(a)
        };
        _.y(xr, _.J);
        var yr = function(a) {
            this.O = _.H(a)
        };
        _.y(yr, _.J);
        var zr = function(a) {
            this.O = _.H(a)
        };
        _.y(zr, _.J);
        _.l = zr.prototype;
        _.l.lb = function() {
            return _.Xi(this, 16)
        }
        ;
        _.l.ac = function(a) {
            return Gm(this, 16, a)
        }
        ;
        _.l.ta = function() {
            return _.Xi(this, 1)
        }
        ;
        _.l.va = function(a) {
            return Gm(this, 1, a)
        }
        ;
        _.l.Og = function() {
            return _.Ni(_.Si(this, 53), 0)
        }
        ;
        zr.pb = [26, 80];
        var Ar = function(a) {
            var b = "pc";
            if (a.pc && a.hasOwnProperty(b))
                return a.pc;
            b = new a;
            return a.pc = b
        };
        /*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
        var Br = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        for (var Cr, Dr = Array(36), Er = 0, Fr, Gr = 0; 36 > Gr; Gr++)
            8 == Gr || 13 == Gr || 18 == Gr || 23 == Gr ? Dr[Gr] = "-" : 14 == Gr ? Dr[Gr] = "4" : (2 >= Er && (Er = 33554432 + 16777216 * Math.random() | 0),
            Fr = Er & 15,
            Er >>= 4,
            Dr[Gr] = Br[19 == Gr ? Fr & 3 | 8 : Fr]);
        Cr = Dr.join("");
        var Hr = function(a) {
            a = void 0 === a ? {} : a;
            this.mf = void 0 === a.mf ? Cr : a.mf;
            this.zd = this.yd = null
        }
          , Lr = function(a) {
            var b = Ir(a, 7);
            Jr(a, b);
            Kr(b)
        }
          , Ir = function(a, b) {
            var c = new zr;
            c = Gm(c, 50, Xp);
            var d = new yr;
            b = _.Ti(d, 1, b);
            b = Gm(b, 2, cq);
            a = Gm(b, 3, a.mf);
            return _.I(c, 112, a)
        }
          , Kr = function(a) {
            var b = new Dq;
            a = kn(a);
            b = Gm(b, 8, a);
            pr.log(b)
        }
          , Jr = function(a, b) {
            b.ac(a.yd);
            b.va(a.zd)
        };
        var Mr = function(a) {
            for (var b = {}, c = 0; c < a.length; ++c)
                b[a[c]] = !0;
            return b
        }
          , Nr = function(a) {
            this.h = a ? [a] : [];
            this.g = [0];
            this.j = !1
        };
        Nr.prototype.register = function(a) {
            if (this.j)
                return a || function() {}
                ;
            this.g.push(0);
            var b = this.g.length - 1;
            return (0,
            _.z)(function() {
                this.g[b]++;
                a && a.apply(null, arguments);
                Or(this)
            }, this)
        }
        ;
        Nr.prototype.delay = function(a) {
            return this.j ? a : (0,
            _.z)(function() {
                if (this.j)
                    a.apply(null, arguments);
                else {
                    var b = arguments;
                    this.h.push(function() {
                        a.apply(null, b)
                    })
                }
            }, this)
        }
        ;
        Nr.prototype.finish = function() {
            this.g[0] = 1;
            Or(this)
        }
        ;
        var Or = function(a) {
            for (var b = 0; b < a.g.length; ++b)
                if (0 == a.g[b])
                    return;
            a.j = !0;
            for (b = 0; b < a.h.length; ++b) {
                var c = a.h[b];
                a.h[b] = null;
                c.call()
            }
            a.h = [];
            a.g = []
        }
          , Pr = function(a) {
            this.j = a;
            this.h = this.g = !1
        }
          , Qr = function(a, b) {
            return (0,
            _.z)(function() {
                b && b.apply(null, arguments);
                this.h ? this.g || (this.j.call(),
                this.g = !0) : this.g = !0
            }, a)
        };
        Pr.prototype.finish = function() {
            this.h || (this.h = !0,
            this.g && this.j.call())
        }
        ;
        var Rr = function(a, b, c) {
            this.g = b;
            this.A = a;
            this.s = c || 0;
            this.j = this.h = !1
        }
          , Sr = function(a) {
            a.h || a.o()
        };
        Rr.prototype.o = function() {
            (this.h = (this.j = !!this.A.call()) || 0 >= --this.s) ? (this.g.call(null, this.j),
            this.l = 0) : this.l = window.setTimeout((0,
            _.z)(this.o, this), 30)
        }
        ;
        Rr.prototype.cancel = function() {
            this.l && window.clearTimeout(this.l);
            this.h = !0;
            this.g.call(null, this.j)
        }
        ;
        var Tr = function(a, b) {
            return function() {
                a.dispatchEvent(b)
            }
        }, Ur = function(a) {
            a = (0,
            _.kc)(a).toLowerCase().replace("_", "-");
            if ("zh-cn" == a)
                return "zh-CN";
            if ("zh-tw" == a)
                return "zh-TW";
            var b = a.indexOf("-");
            a = 0 <= b ? a.substring(0, b) : a;
            return "zh" == a ? "zh-CN" : a
        }, Vr = function(a) {
            var b = [], c;
            for (c in a)
                if (a[c] !== Object.prototype[c]) {
                    var d = _.gd(c);
                    if ("array" == _.wb(a[c]))
                        for (var e = 0; e < a[c].length; ++e)
                            b.push(d + "=" + _.gd(a[c][e]));
                    else
                        b.push(d + "=" + _.gd(a[c]))
                }
            return b.join("&")
        }, Rm = function(a, b) {
            b = b || {};
            b.nca = a;
            b.client = cq;
            Wp && (b.logld = "v" + Wp);
            var c = new Image;
            c.src = "//" + kq + "/gen204?" + Vr(b);
            c.onload = function() {
                c.onload = null
            }
        }, Xr = function(a, b) {
            if ((_.E || _.oc) && window.location.hostname != document.domain) {
                Wr = Wr ? Wr + 1 : 1;
                var c = "f" + Wr + "_" + _.Cb().toString(36);
                window[c] = function() {
                    window[c] = void 0;
                    a.src = "#";
                    b && window.setTimeout(function() {
                        b()
                    }, 0)
                }
                ;
                a.src = "javascript:void(document.write(\"<script>document.domain='" + document.domain + "';parent['" + c + "']();\x3c/script>\"))"
            } else
                b && b()
        }, Wr, Yr = function() {
            var a = {};
            try {
                for (var b in Object.prototype) {
                    var c = Object.prototype[b];
                    delete Object.prototype[b];
                    a[b] = c
                }
            } catch (d) {
                return {}
            }
            return a
        }, Zr = function(a) {
            for (var b in a)
                Object.prototype[b] = a[b]
        }, $r = function(a) {
            for (var b in a)
                if (a[b] !== Object.prototype[b])
                    return !1;
            return !0
        }, as = function(a, b) {
            return "auto" != a && "zh-CN" != a && a == b
        }, bs = function() {
            var a = window.location.hash.match(/google\.translate\.element\.sp=([^&]+)/);
            return a && a[1] ? a[1] : null
        };
        var Qm = null
          , cs = null
          , ds = function() {};
        ds.prototype.attach = function(a, b, c) {
            for (var d in c)
                c[d] !== Object.prototype[d] && (b[d] = "function" === typeof c[d] ? c[d] : _.Bb(Sm, a, Number(c[d])))
        }
        ;
        var fs = function() {
            Qm && es();
            Qm = [];
            cs = _.F(window, "pagehide", function() {
                es()
            })
        }
          , es = function() {
            cs && (_.Yd(cs),
            cs = null);
            Qm && Qm.length && Rm(Qm.join(""));
            Qm = null
        }
          , gs = new ds;
        var hs = function(a) {
            this.O = _.H(a)
        };
        _.y(hs, _.J);
        var Um = _.Pi(hs);
        var Tm;
        var is = function(a) {
            this.url = a;
            this.timeout = -1;
            this.j = this.h = "callback";
            this.g = this.nc = null
        }
          , ms = function(a, b) {
            b = void 0 === b ? {} : b;
            a.g = mo();
            var c = new _.Vf(a.url)
              , d = new Map;
            a.j && d.set(a.j, a.h);
            c.g.o(ro(b), d);
            js(a).then(function() {
                ks(a, c.toString())
            }).then(function() {
                return a.g.promise
            }).then(function() {
                ls(a)
            }, function() {
                ls(a)
            });
            0 < a.timeout && (a.l = setTimeout(function() {
                a.g.reject("Timeout!")
            }, a.timeout));
            return a.g.promise
        }
          , ks = function(a, b) {
            var c = new MessageChannel;
            a.nc.contentWindow.postMessage({
                url: b,
                callbackName: a.h
            }, "*", [c.port2]);
            c.port1.onmessage = function(d) {
                var e = {};
                void 0 !== a.l && (clearTimeout(a.l),
                a.l = void 0);
                void 0 === d.data && a.g.reject("Callback called, but no data received");
                "string" !== typeof d.data && a.g.reject("Exploitation attempt! Data is not a string!");
                try {
                    e = JSON.parse(d.data)
                } catch (f) {
                    a.g.reject("Invalid Data received: " + f.message)
                }
                a.g.resolve(e)
            }
        }
          , js = function(a) {
            var b = mo()
              , c = _.sd(document, "IFRAME");
            if (!c.sandbox)
                throw Error("Aa");
            c.sandbox.value = "allow-scripts";
            c.style.display = "none";
            a.nc = c;
            a = Vm();
            a = il([_.bd, ol(hl(a))]);
            c.srcdoc = _.$c(a);
            a = _.Za("data:text/html;charset=UTF-8;base64," + btoa(_.$c(a).toString()));
            c.src = _.Wa(a).toString();
            c.addEventListener("load", function() {
                return b.resolve(c)
            }, !1);
            c.addEventListener("error", function(d) {
                b.reject(d)
            }, !1);
            document.documentElement.appendChild(c);
            return b.promise
        }
          , ls = function(a) {
            null !== a.nc && (document.documentElement.removeChild(a.nc),
            a.nc = null)
        };
        var ns = function(a, b) {
            _.B.call(this);
            this.g = new _.Vf(a);
            if (b)
                for (var c in b)
                    b[c] !== Object.prototype[c] && this.g.g.set(c, b[c])
        };
        _.y(ns, _.B);
        ns.prototype.wb = function() {
            return !0
        }
        ;
        ns.prototype.vb = function() {
            return this.wb()
        }
        ;
        ns.prototype.send = function() {
            return _.Nk(null)
        }
        ;
        ns.prototype.cancel = function() {}
        ;
        var os = function(a, b, c) {
            ns.call(this, a, b);
            a = this.h = new is(this.g);
            a.h = "callback";
            a.j = void 0 === c ? "callback" : c
        };
        _.y(os, ns);
        os.prototype.wb = function() {
            return !0
        }
        ;
        os.prototype.send = function(a) {
            return ms(this.h, a)
        }
        ;
        os.prototype.cancel = function(a) {
            a.cancel()
        }
        ;
        var ps = function(a, b) {
            ns.call(this, a, b);
            this.h = {};
            this.j = 0
        };
        _.y(ps, ns);
        ps.prototype.wb = function() {
            return !0
        }
        ;
        ps.prototype.send = function(a) {
            var b = this
              , c = Yr()
              , d = ++this.j
              , e = {}
              , f = {};
            "q"in a && (f.q = a.q,
            delete a.q);
            e.oa = new _.bh;
            this.g.h.endsWith(".corp.google.com") && (e.oa.F = !0);
            var g = new _.te(function(h, k) {
                _.F(e.oa, "complete", function() {
                    if (!e.yg) {
                        if (e.oa.nd()) {
                            var m = e.oa.kb();
                            qs(b, d);
                            return h(m)
                        }
                        b.Wj();
                        m = e.oa.kb();
                        qs(b, d);
                        return k(m)
                    }
                });
                _.F(e.oa, "timeout", function() {
                    if (!e.yg)
                        return b.Yj(),
                        qs(b, d),
                        k()
                })
            }
            );
            e.oa.send(this.g.toString() + "&" + Vr(a), "POST", Vr(f), {
                "Content-Type": "application/x-www-form-urlencoded"
            });
            this.h[d] = e;
            Zr(c);
            return g
        }
        ;
        ps.prototype.cancel = function(a) {
            var b = this.h[a];
            b && (b.yg = !0,
            qs(this, a))
        }
        ;
        var qs = function(a, b) {
            var c = a.h[b];
            c && (c.oa && (c.oa.T(),
            c.oa = null),
            delete a.h[b])
        };
        ps.prototype.I = function() {
            ns.prototype.I.call(this);
            for (var a in this.h)
                this.cancel(a)
        }
        ;
        gs.attach(17170, ps.prototype, {
            Yj: 1,
            Wj: 2
        });
        var rs = function(a, b, c) {
            ns.call(this, a, c);
            this.j = b.proxyIsSupported;
            this.l = function(d, e, f) {
                return _.Nk(b.proxySend(d, e, f))
            }
            ;
            this.h = b.proxyCancel
        };
        _.y(rs, ns);
        rs.prototype.wb = function() {
            return this.j()
        }
        ;
        rs.prototype.send = function(a, b) {
            return this.l(this.g.toString(), a, b)
        }
        ;
        rs.prototype.cancel = function(a) {
            this.h(a)
        }
        ;
        var ss = function(a, b) {
            _.B.call(this);
            this.h = a;
            this.g = b ? b : null
        };
        _.y(ss, _.B);
        ss.prototype.I = function() {
            _.B.prototype.I.call(this)
        }
        ;
        _.ts = function(a) {
            return a
        }
        ;
        var vs = function(a, b, c, d) {
            _.B.call(this);
            var e;
            b ? e = {
                client: b
            } : e = {
                anno: 3,
                client: cq,
                format: "html",
                v: "1.0"
            };
            c && (e.sp = c);
            e.key = a;
            Wp && (e.logld = "v" + Wp);
            this.g = null;
            this.h = {
                oh: 300
            };
            a = this.o = new ss(e,d);
            // EDGE TRANSLATE: emit "https://" header
            // b = eq + hq;
            b = hq;
            this.l = a.g ? new rs(b,a.g,{
                client: cq
            }) : new os(b,{
                client: cq
            });
            a = this.o;
            if (a.g) {
                if (!a.g)
                    throw Error("Ba");
                a = [{
                    ya: new rs(eq + dq + "/translate_a/t",a.g,a.h),
                    vf: 1900,
                    ph: 4294967295,
                    nh: -1,
                    Jh: 0,
                    We: !1
                }]
            } else
                a = [{
                    ya: new ps(eq + dq + "/translate_a/t",a.h),
                    vf: 30720,
                    ph: 4294967295,
                    nh: -1,
                    Jh: 0,
                    We: !1
                }];
            this.s = new us(a);
            this.j = !1;
            for (b = 0; b < a.length; ++b)
                this.j = this.j || a[b].ya.wb();
            this.j || this.Pj()
        };
        _.y(vs, _.B);
        vs.prototype.initialize = function(a) {
            this.A || (this.A = !0,
            this.s.start((0,
            _.z)(function(b) {
                b && (this.g = b,
                this.h.ya = b.ya);
                a()
            }, this)))
        }
        ;
        vs.prototype.wb = function() {
            return this.j
        }
        ;
        vs.prototype.vb = function() {
            return null !== this.g && null !== this.g.ya && this.g.ya.vb()
        }
        ;
        var ws = function(a, b, c) {
            var d = {
                q: c.substring(0, a.h.oh),
                sl: "auto",
                tl: "en"
            };
            return new _.te(function(e, f) {
                a.h.ya.send(d, b).then(function(g) {
                    try {
                        var h = JSON.parse(g);
                        e(h && h[1] || null)
                    } catch (k) {
                        e(null)
                    }
                }, function(g) {
                    return f(g || null)
                })
            }
            )
        };
        vs.prototype.translate = function(a, b, c, d, e, f, g, h) {
            var k = this
              , m = {
                q: b,
                sl: c,
                tl: d
            };
            m = _.ts(m);
            m.tc = e;
            f && (m.ctt = 1);
            g && (m.dom = 1);
            h && (m.sr = 1);
            m[Up()] = Tp(b.join(""));
            return new _.te(function(n, p) {
                k.g.ya.send(m, a).then(function(q) {
                    if (q) {
                        if ("object" !== typeof q)
                            try {
                                q = JSON.parse(q)
                            } catch (D) {
                                k.Oj();
                                p();
                                return
                            }
                        if ("array" != _.wb(q))
                            var r = [[q, 200]];
                        else if (2 == q.length && "array" != _.wb(q[0]) && "array" != _.wb(q[1]))
                            r = [[q[0], 200, q[1]], [q[1], 200, q[1]]];
                        else {
                            r = [];
                            for (var w = 0; w < q.length; ++w)
                                r[w] = "array" != _.wb(q[w]) ? [q[w], 200] : [q[w][0], 200, q[w][1]]
                        }
                        n(r)
                    } else
                        p()
                })
            }
            )
        }
        ;
        var xs = function(a, b) {
            b instanceof _.te ? b.then(function(c) {
                a.g.ya.cancel(c)
            }) : a.g.ya.cancel(b)
        }
          , ys = function(a) {
            return a.g.We ? a.g.vf - (new _.Vf(a.g.ya.g)).toString().length : a.g.vf
        };
        vs.prototype.I = function() {
            _.B.prototype.I.call(this);
            this.g && (this.g.ya.T(),
            this.g.ya = null);
            this.h.ya = null;
            this.l.T();
            this.l = null
        }
        ;
        gs.attach(7361, vs.prototype, {
            Pj: function() {
                Rm("te_au")
            }
        });
        gs.attach(47504, vs.prototype, {
            Oj: function() {
                Rm("te_afbr")
            }
        });
        var us = function(a) {
            this.h = a
        };
        us.prototype.start = function(a) {
            this.g = a;
            this.j = 0;
            zs(this)
        }
        ;
        var zs = function(a) {
            if (a.j >= a.h.length)
                a.g(null);
            else {
                var b = a.h[a.j++];
                b.uk ? Sr(new Rr((0,
                _.z)(b.ya.vb, b.ya),(0,
                _.z)(function(c) {
                    c ? this.g(b) : zs(this)
                }, a),b.uk)) : b.ya.vb() ? a.g(b) : zs(a)
            }
        };
        var As = Mr("A ABBR ACRONYM B BASEFONT BDO BIG CITE DFN EM FONT I INPUT NOBR LABEL Q S SMALL SPAN STRIKE STRONG SUB SUP TEXTAREA TT U VAR".split(" "))
          , Bs = Mr("APPLET AREA BASE FRAME FRAMESET HR LINK META NOFRAMES NOSCRIPT INPUT TEXTAREA TITLE".split(" "))
          , Cs = Mr("BR CODE IMG KBD MAP OBJECT PARAM SCRIPT STYLE WBR svg".split(" "))
          , Ds = Mr(["submit", "button"]);
        var Fs = function(a, b, c, d, e) {
            this.h = !!b;
            this.node = null;
            this.g = 0;
            this.Yf = !1;
            this.j = !c;
            a && Es(this, a, d);
            this.depth = void 0 != e ? e : this.g || 0;
            this.h && (this.depth *= -1)
        };
        _.A(Fs, _.of);
        var Es = function(a, b, c, d) {
            if (a.node = b)
                a.g = "number" === typeof c ? c : 1 != a.node.nodeType ? 0 : a.h ? -1 : 1;
            "number" === typeof d && (a.depth = d)
        }
          , Gs = function(a) {
            var b = a.h ? -1 : 1;
            a.g == b && (a.g = -1 * b,
            a.depth += a.g * (a.h ? -1 : 1))
        };
        Fs.prototype.next = function() {
            if (this.Yf) {
                if (!this.node || this.j && 0 == this.depth)
                    return _.pf;
                var a = this.node;
                var b = this.h ? -1 : 1;
                if (this.g == b) {
                    var c = this.h ? a.lastChild : a.firstChild;
                    c ? Es(this, c) : Es(this, a, -1 * b)
                } else
                    (c = this.h ? a.previousSibling : a.nextSibling) ? Es(this, c) : Es(this, a.parentNode, -1 * b);
                this.depth += this.g * (this.h ? -1 : 1)
            } else
                this.Yf = !0;
            return (a = this.node) ? {
                value: a,
                done: !1
            } : _.pf
        }
        ;
        var Is = function(a, b) {
            this.j = _.E ? [] : null;
            this.h = [];
            this.done = !1;
            for (this.g = new Fs(a,!1,b,3 === a.nodeType ? 0 : 1,1); a = a.parentNode; )
                Hs(this, a, !0);
            this.h.push(!1);
            this.h.reverse();
            for (a = 1; a < this.h.length; ++a)
                null == this.h[a] && (this.h[a] = this.h[a - 1])
        }
          , Hs = function(a, b, c) {
            c = void 0 === c ? !1 : c;
            var d = (b.style && b.style.whiteSpace || "").substring(0, 3);
            "pre" === d || !d && "PRE" === b.tagName ? a.h.push(!0) : d && "pre" !== d ? a.h.push(!1) : c ? a.h.push(null) : a.h.push(a.h[a.h.length - 1])
        }
          , Js = function(a) {
            return !!a.h[a.h.length - 1]
        };
        Is.prototype.node = function() {
            return this.g.node
        }
        ;
        Is.prototype.depth = function() {
            return this.g.depth
        }
        ;
        Is.prototype.next = function() {
            try {
                this.j && 0 < this.j.length && -1 === this.g.g && this.j.length--;
                -1 === this.g.g && this.h.length--;
                if (this.j && 0 < this.j.length && 1 !== this.g.g && !this.g.node.nextSibling)
                    Es(this.g, this.j[this.j.length - 1], -1, this.g.depth - 1);
                else {
                    if (this.g.next().done) {
                        this.done = !0;
                        return
                    }
                    this.j && 1 === this.g.g && this.j.push(this.g.node)
                }
                1 === this.g.g && this.g.Yf && Hs(this, this.g.node)
            } catch (a) {
                this.Vj(a),
                this.done = !0
            }
        }
        ;
        gs.attach(52754, Is.prototype, {
            Vj: 1
        });
        var Ks = function() {
            return "[msg_undefined]"
        }
          , U = {};
        (function() {
            var a = function(b) {
                return function() {
                    return b
                }
            };
            U = {
                qg: a(0),
                Xh: a(1),
                eg: a(2),
                Gl: a(3),
                ti: a(4),
                gg: a(5),
                ki: a(45),
                li: a(6),
                ni: a(7),
                Je: a(8),
                ui: a(9),
                Zl: a(10),
                xi: a(11),
                oi: a(12),
                Ul: a(13),
                ri: a(14),
                Tl: a(15),
                pi: a(16),
                cm: a(17),
                vi: a(18),
                Wk: a(19),
                El: a(20),
                Yh: a(21),
                Vl: a(22),
                Ol: a(23),
                Nl: a(24),
                Ll: a(25),
                am: a(26),
                Yl: a(27),
                Ml: a(28),
                mi: a(29),
                wi: a(30),
                Vk: a(32),
                Tk: a(33),
                dm: a(34),
                fl: a(35),
                al: a(36),
                el: a(37),
                si: a(38),
                vl: a(39),
                Uk: a(40),
                Fl: a(41),
                ng: a(46),
                Hl: a(47),
                ol: a(48),
                nl: a(49),
                ml: a(50),
                bm: a(51)
            }
        }
        )();
        U.Rm = function() {
            return _.K[0]
        }
        ;
        U.Xi = function() {
            return _.K[1]
        }
        ;
        U.um = function() {
            return _.K[2]
        }
        ;
        U.Fm = function() {
            return _.K[3]
        }
        ;
        U.Sm = function() {
            return _.K[4]
        }
        ;
        U.ym = function() {
            return _.K[5]
        }
        ;
        U.Am = function() {
            return _.K[45]
        }
        ;
        U.Bm = function() {
            return _.K[6]
        }
        ;
        U.Gm = function() {
            return _.K[7]
        }
        ;
        U.Vm = function() {
            return _.K[8]
        }
        ;
        U.Xm = function() {
            return _.K[9]
        }
        ;
        U.Um = function() {
            return _.K[10]
        }
        ;
        U.dn = function() {
            return _.K[11]
        }
        ;
        U.Hm = function() {
            return _.K[12]
        }
        ;
        U.Om = function() {
            return _.K[13]
        }
        ;
        U.Pm = function() {
            return _.K[14]
        }
        ;
        U.Nm = function() {
            return _.K[15]
        }
        ;
        U.Im = function() {
            return _.K[16]
        }
        ;
        U.an = function() {
            return _.K[17]
        }
        ;
        U.Zm = function() {
            return _.K[18]
        }
        ;
        U.sm = function() {
            return _.K[19]
        }
        ;
        U.Em = function() {
            return _.K[20]
        }
        ;
        U.bj = function() {
            return _.K[41]
        }
        ;
        U.xm = function() {
            return _.K[21]
        }
        ;
        U.dj = function() {
            return _.K[22]
        }
        ;
        U.Mm = function() {
            return _.K[23]
        }
        ;
        U.Lm = function() {
            return _.K[24]
        }
        ;
        U.Jm = function() {
            return _.K[25]
        }
        ;
        U.Wm = function() {
            return _.K[26]
        }
        ;
        U.Tm = function() {
            return _.K[27]
        }
        ;
        U.Km = function() {
            return _.K[28]
        }
        ;
        U.Dm = function() {
            return _.K[29]
        }
        ;
        U.bn = function() {
            return _.K[30]
        }
        ;
        U.Cm = function() {
            return _.K[39]
        }
        ;
        U.rm = function() {
            return _.K[32]
        }
        ;
        U.pm = function() {
            return _.K[33]
        }
        ;
        U.qm = function() {
            return _.K[40]
        }
        ;
        U.cn = function() {
            return _.K[34]
        }
        ;
        U.wm = function() {
            return _.K[35]
        }
        ;
        U.tm = function() {
            return _.K[36]
        }
        ;
        U.vm = function() {
            return _.K[37]
        }
        ;
        U.Qm = function() {
            return _.K[38]
        }
        ;
        U.zm = function() {
            return _.K[46]
        }
        ;
        U.cj = function() {
            return _.K[47]
        }
        ;
        U.aj = function() {
            return _.K[48]
        }
        ;
        U.Zi = function() {
            return _.K[49]
        }
        ;
        U.Yi = function() {
            return _.K[50]
        }
        ;
        U.Ym = function() {
            return _.K[51]
        }
        ;
        var Ls = U.Xi
          , Ms = U.dj
          , Ns = U.bj
          , Os = U.cj
          , Ps = U.aj
          , Qs = U.Zi
          , Rs = U.Yi;
        var Ss = No["key_a:"];
        if (void 0 === Ss || 0 > Ss)
            No["key_a:"] = 0;
        else if (0 == Ss)
            throw Error("Ca`a`");
        var Ts = function() {
            return (0,
            _.L)('<div><textarea class="contribute-original-text"></textarea><div class="activity-form-container"></div></div>')
        }
          , Us = function(a) {
            var b = a.yi
              , c = a.method
              , d = a.Qi;
            a = a.dir;
            b = '<div class="' + T("VIpgJd-yAWNEb-L4Nn5e-I9GLp") + '"><div class="form-message"></div><form class="' + T("VIpgJd-yAWNEb-Z0Arqf-I9GLp") + '" action="' + T(kp(b)) + '" method="' + T(c) + '"><div class="form-buttons" style="text-align:' + (Lo(a, "rtl") ? "right" : "left") + '"><input class="' + T("VIpgJd-yAWNEb-Z0Arqf-sFeBqf") + '" type="button" value="' + T(Ms()) + '"><input class="activity-cancel" type="button" value="' + T(Ls()) + '"></div><div class="parameters"><input type="hidden" name="gtrans"/><input type="hidden" name="utrans"/><input type="hidden" name="hl"/><input type="hidden" name="text"/><input type="hidden" name="langpair"/><input type="hidden" name="oe" value="UTF-8"/>';
            c = d.length;
            for (a = 0; a < c; a++)
                b += '<input type="hidden" name="' + T(d[a]) + '"/>';
            return (0,
            _.L)(b + "</div></form></div>")
        }
          , Xs = function(a) {
            var b = a.dir;
            a = a.Rk;
            b = '<div id="goog-gt-tt" class="' + T("VIpgJd-yAWNEb-L7lbkb") + ' skiptranslate" style="border-radius: 12px; margin: 0 0 0 -23px; padding: 0; font-family: \'Google Sans\', Arial, sans-serif;" data-id=""><div id="goog-gt-vt" class="' + T("VIpgJd-yAWNEb-hvhgNd") + '"><div class="' + ("rtl" == b ? " " + T("VIpgJd-yAWNEb-hvhgNd-l4eHX-SIsrTd") + " " : " " + T("VIpgJd-yAWNEb-hvhgNd-l4eHX-i3jM8c")) + '"><img src="https://fonts.gstatic.com/s/i/productlogos/translate/v14/24px.svg" width="24" height="24" alt=""/></div><div class="' + ("rtl" == b ? "  " + T("VIpgJd-yAWNEb-hvhgNd-k77Iif-SIsrTd") + " " : " " + T("VIpgJd-yAWNEb-hvhgNd-k77Iif-i3jM8c")) + '"><div class="' + T("VIpgJd-yAWNEb-hvhgNd-IuizWc") + '" dir="' + T(b) + '">' + $o(Ns()) + '</div><div id="goog-gt-original-text" class="' + T("VIpgJd-yAWNEb-nVMfcd-fmcmS") + " " + T("VIpgJd-yAWNEb-hvhgNd-axAV1") + '"></div></div><div class="' + T("VIpgJd-yAWNEb-hvhgNd-N7Eqid") + " " + T(b) + '"><div class="' + T("VIpgJd-yAWNEb-hvhgNd-N7Eqid-B7I4Od") + " " + T(b) + '" dir="' + T(b) + '"><div class="' + T("VIpgJd-yAWNEb-hvhgNd-UTujCb") + '">' + $o(Os()) + '</div><div class="' + T("VIpgJd-yAWNEb-hvhgNd-eO9mKe") + '">' + $o(Ps()) + '</div></div><div class="' + T("VIpgJd-yAWNEb-hvhgNd-xgov5") + " " + T(b) + '">' + ("rtl" == b ? Vs() + Ws() : Ws() + Vs()) + "</div></div>";
            a = (0,
            _.L)('<div id="goog-gt-votingHiddenPane" class="' + T("VIpgJd-yAWNEb-hvhgNd-aXYTce") + '"><form id="goog-gt-votingForm" action="' + T(kp(a)) + '" method="post" target="votingFrame" class="' + T("VIpgJd-yAWNEb-hvhgNd-aXYTce") + '"><input type="text" name="sl" id="goog-gt-votingInputSrcLang"/><input type="text" name="tl" id="goog-gt-votingInputTrgLang"/><input type="text" name="query" id="goog-gt-votingInputSrcText"/><input type="text" name="gtrans" id="goog-gt-votingInputTrgText"/><input type="text" name="vote" id="goog-gt-votingInputVote"/></form><iframe name="votingFrame" frameBorder=0></iframe></div>');
            return (0,
            _.L)(b + a + "</div></div>")
        }
          , Ws = function() {
            var a = Qs();
            a = '<button id="goog-gt-thumbUpButton" type="button" class="' + T("VIpgJd-yAWNEb-hvhgNd-bgm6sf") + '" title="' + T(a) + '" aria-label="' + T(a) + '" aria-pressed="false"><span id="goog-gt-thumbUpIcon">';
            var b = (0,
            _.L)('<svg width="' + T(24) + '" height="' + T(24) + '" viewBox="' + T("0 0 24 24") + '" focusable="false" class="' + T("VIpgJd-yAWNEb-hvhgNd-THI6Vb") + " " + T("NMm5M") + '"' + So() + '><path d="M21 7h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 0S7.08 6.85 7 7H2v13h16c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9c0-1.1-.9-2-2-2zM7 18H4V9h3v9zm14-7l-3 7H9V8l4.34-4.34L12 9h9v2z"/></svg>');
            a = a + b + '</span><span id="goog-gt-thumbUpIconFilled">';
            b = (0,
            _.L)('<svg width="' + T(24) + '" height="' + T(24) + '" viewBox="' + T("0 0 24 24") + '" focusable="false" class="' + T("VIpgJd-yAWNEb-hvhgNd-THI6Vb") + " " + T("NMm5M") + '"' + So() + '><path d="M21 7h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 0S7.08 6.85 7 7v13h11c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9c0-1.1-.9-2-2-2zM5 7H1v13h4V7z"/></svg>');
            return (0,
            _.L)(a + b + "</span></button>")
        }
          , Vs = function() {
            var a = Rs();
            a = '<button id="goog-gt-thumbDownButton" type="button" class="' + T("VIpgJd-yAWNEb-hvhgNd-bgm6sf") + '" title="' + T(a) + '" aria-label="' + T(a) + '" aria-pressed="false"><span id="goog-gt-thumbDownIcon">';
            var b = (0,
            _.L)('<svg width="' + T(24) + '" height="' + T(24) + '" viewBox="' + T("0 0 24 24") + '" focusable="false" class="' + T("VIpgJd-yAWNEb-hvhgNd-THI6Vb") + " " + T("NMm5M") + '"' + So() + '><path d="M3 17h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 24s7.09-6.85 7.17-7h5V4H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2zM17 6h3v9h-3V6zM3 13l3-7h9v10l-4.34 4.34L12 15H3v-2z"/></svg>');
            a = a + b + '</span><span id="goog-gt-thumbDownIconFilled">';
            b = (0,
            _.L)('<svg width="' + T(24) + '" height="' + T(24) + '" viewBox="' + T("0 0 24 24") + '" focusable="false" class="' + T("VIpgJd-yAWNEb-hvhgNd-THI6Vb") + " " + T("NMm5M") + '"' + So() + '><path d="M3 17h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 24s7.09-6.85 7.17-7V4H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2zm16 0h4V4h-4v13z"/></svg>');
            return (0,
            _.L)(a + b + "</span></button>")
        };
        var Ys = function() {};
        qn(Ys);
        Ys.prototype.g = 0;
        var P = function(a) {
            _.G.call(this);
            this.h = a || _.ld();
            this.qa = Zs;
            this.Y = null;
            this.cb = !1;
            this.o = null;
            this.L = void 0;
            this.N = this.H = this.F = null;
            this.xa = !1
        };
        _.A(P, _.G);
        P.prototype.Da = Ys.Vb();
        var Zs = null
          , $s = function(a, b) {
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
                return b ? "focus" : "blur";
            case 64:
                return b ? "open" : "close"
            }
            throw Error("Da");
        };
        P.prototype.jb = function() {
            return this.Y || (this.Y = ":" + (this.Da.g++).toString(36))
        }
        ;
        var at = function(a, b) {
            if (a.F && a.F.N) {
                var c = a.F.N
                  , d = a.Y;
                d in c && delete c[d];
                c = a.F.N;
                if (null !== c && b in c)
                    throw Error("y`" + b);
                c[b] = a
            }
            a.Y = b
        };
        P.prototype.C = function() {
            return this.o
        }
        ;
        var bt = function(a, b) {
            return a.o ? $m(b, a.o || a.h.g) : null
        }
          , ct = function(a) {
            a.L || (a.L = new _.Og(a));
            return a.L
        };
        P.prototype.ve = function(a) {
            if (this.F && this.F != a)
                throw Error("Fa");
            P.P.ve.call(this, a)
        }
        ;
        P.prototype.U = function() {
            this.o = _.vk(this.h, "DIV")
        }
        ;
        P.prototype.Oa = function(a) {
            dt(this, a)
        }
        ;
        var dt = function(a, b, c) {
            if (a.cb)
                throw Error("Ga");
            a.o || a.U();
            b ? b.insertBefore(a.o, c || null) : a.h.g.body.appendChild(a.o);
            a.F && !a.F.cb || a.sa()
        }
          , et = function(a, b) {
            if (a.cb)
                throw Error("Ga");
            if (b && a.jg(b)) {
                a.xa = !0;
                var c = _.kd(b);
                a.h && a.h.g == c || (a.h = _.ld(b));
                a.Aa(b);
                a.sa()
            } else
                throw Error("Ha");
        };
        _.l = P.prototype;
        _.l.jg = function() {
            return !0
        }
        ;
        _.l.Aa = function(a) {
            this.o = a
        }
        ;
        _.l.sa = function() {
            this.cb = !0;
            ft(this, function(a) {
                !a.cb && a.C() && a.sa()
            })
        }
        ;
        _.l.ma = function() {
            ft(this, function(a) {
                a.cb && a.ma()
            });
            this.L && _.Sg(this.L);
            this.cb = !1
        }
        ;
        _.l.I = function() {
            this.cb && this.ma();
            this.L && (this.L.T(),
            delete this.L);
            ft(this, function(a) {
                a.T()
            });
            !this.xa && this.o && $n(this.o);
            this.F = this.o = this.N = this.H = null;
            P.P.I.call(this)
        }
        ;
        var V = function(a, b) {
            return a.jb() + "." + b
        }
          , ft = function(a, b) {
            a.H && a.H.forEach(b, void 0)
        };
        P.prototype.Ff = function(a) {
            for (var b = []; this.H && 0 != this.H.length; ) {
                var c = b
                  , d = c.push
                  , e = this.H ? this.H[0] || null : null
                  , f = a;
                if (e) {
                    var g = "string" === typeof e ? e : e.jb();
                    this.N && g ? (e = this.N,
                    e = (null !== e && g in e ? e[g] : void 0) || null) : e = null;
                    if (g && e) {
                        var h = this.N;
                        g in h && delete h[g];
                        _.va(this.H, e);
                        f && (e.ma(),
                        e.o && $n(e.o));
                        f = e;
                        if (null == f)
                            throw Error("Ea");
                        f.F = null;
                        P.P.ve.call(f, null)
                    }
                }
                if (!e)
                    throw Error("Ia");
                d.call(c, e)
            }
            return b
        }
        ;
        _.A(Xm, P);
        _.l = Xm.prototype;
        _.l.qe = function(a) {
            this.l = a
        }
        ;
        _.l.Bd = function() {
            if (!this.cb)
                throw Error("Ja");
            if (!this.l)
                throw Error("Ka");
        }
        ;
        _.l.Oc = function() {}
        ;
        _.l.T = function() {
            this.ob() || (Xm.P.T.call(this),
            delete this.je)
        }
        ;
        _.l.Fa = function() {
            return this.l
        }
        ;
        var it = function() {
            _.G.call(this);
            this.h = "closure_frame" + gt++;
            this.j = [];
            ht[this.h] = this
        }, jt;
        _.A(it, _.G);
        var ht = {}
          , gt = 0
          , kt = function(a, b) {
            var c = _.ld(a);
            _.Bf(b, function(d, e) {
                Array.isArray(d) || (d = [d]);
                _.ec(d, function(f) {
                    f = c.U("INPUT", {
                        type: "hidden",
                        name: e,
                        value: f
                    });
                    a.appendChild(f)
                })
            })
        };
        _.l = it.prototype;
        _.l.la = null;
        _.l.bb = null;
        _.l.Hc = null;
        _.l.fk = 0;
        _.l.tb = !1;
        _.l.ye = !1;
        _.l.qf = null;
        _.l.oc = null;
        _.l.send = function(a, b, c, d) {
            if (this.tb)
                throw Error("La");
            a = new _.Vf(a);
            b = b ? b.toUpperCase() : "GET";
            c && _.ig(a);
            jt || (jt = Xn("FORM"),
            jt.acceptCharset = "utf-8",
            c = jt.style,
            c.position = "absolute",
            c.visibility = "hidden",
            c.top = c.left = "-10px",
            c.width = c.height = "10px",
            c.overflow = "hidden",
            document.body.appendChild(jt));
            this.la = jt;
            "GET" == b && kt(this.la, a.g);
            d && kt(this.la, d);
            Nn(this.la, _.Qc(a.toString()));
            this.la.method = b;
            lt(this);
            mt(this)
        }
        ;
        var nt = function(a, b) {
            if (a.tb)
                throw Error("La");
            var c = new _.Vf(b.action);
            a.la = b;
            Nn(a.la, c.toString());
            lt(a)
        };
        _.l = it.prototype;
        _.l.abort = function() {
            if (this.tb) {
                var a = ot(this);
                if (a)
                    if (_.Fd(a))
                        a.ab && _.Md(a.ab);
                    else if (a = _.Td(a)) {
                        var b = 0, c;
                        for (c in a.g)
                            for (var d = a.g[c].concat(), e = 0; e < d.length; ++e)
                                _.Yd(d[e]) && ++b
                    }
                this.ye = this.tb = !1;
                this.dispatchEvent("abort");
                pt(this)
            }
        }
        ;
        _.l.I = function() {
            this.tb && this.abort();
            it.P.I.call(this);
            this.bb && qt(this);
            mt(this);
            delete this.o;
            this.qf = this.la = null;
            delete ht[this.h]
        }
        ;
        _.l.nd = function() {
            return this.ye
        }
        ;
        _.l.isActive = function() {
            return this.tb
        }
        ;
        _.l.kb = function() {
            return this.qf
        }
        ;
        var lt = function(a) {
            a.tb = !0;
            a.Hc = a.h + "_" + (a.fk++).toString(36);
            a.bb = _.ld(a.la).U("IFRAME", {
                name: a.Hc,
                id: a.Hc
            });
            _.E && 7 > Number(_.Gc) && Nn(a.bb, _.Qc(_.Nb(_.Ob('javascript:""'))));
            var b = a.bb.style;
            b.visibility = "hidden";
            b.width = b.height = "10px";
            b.display = "none";
            _.sc ? b.marginTop = b.marginLeft = "-10px" : (b.position = "absolute",
            b.top = b.left = "-10px");
            _.ld(a.la).g.body.appendChild(a.bb);
            b = a.Hc + "_inner";
            var c = bo(a.bb);
            if (document.baseURI) {
                var d = Sn(b);
                d = _.ad('<head><base href="' + Sn(document.baseURI) + '"></head><body><iframe id="' + d + '" name="' + d + '"></iframe>')
            } else
                d = Sn(b),
                d = _.ad('<body><iframe id="' + d + '" name="' + d + '"></iframe>');
            c.write(_.$c(d));
            _.F(c.getElementById(b), "load", a.g, !1, a);
            d = _.Mk("TEXTAREA", a.la);
            for (var e = 0, f = d.length; e < f; e++) {
                var g = d[e].value;
                ko(d[e]) != g && (_.xd(d[e], g),
                d[e].value = g)
            }
            d = c.importNode(a.la, !0);
            d.target = b;
            d.action = a.la.action;
            c.body.appendChild(d);
            e = _.Mk("SELECT", a.la);
            f = _.Mk("SELECT", d);
            g = 0;
            for (var h = e.length; g < h; g++)
                for (var k = _.Mk("OPTION", e[g]), m = _.Mk("OPTION", f[g]), n = 0, p = k.length; n < p; n++)
                    m[n].selected = k[n].selected;
            e = _.Mk("INPUT", a.la);
            f = _.Mk("INPUT", d);
            g = 0;
            for (h = e.length; g < h; g++)
                if ("file" == e[g].type && e[g].value != f[g].value) {
                    a.la.target = b;
                    d = a.la;
                    break
                }
            try {
                a.s = !1,
                d.submit(),
                c.close(),
                _.rc && _.ah(a.A, 250, a)
            } catch (q) {
                _.Xd(c.getElementById(b), "load", a.g, !1, a),
                c.close(),
                rt(a)
            }
        };
        it.prototype.g = function() {
            _.Xd(ot(this), "load", this.g, !1, this);
            try {
                var a = this.bb ? bo(ot(this)) : null;
                this.tb = !1;
                try {
                    var b = a.body;
                    this.qf = b.textContent || b.innerText
                } catch (e) {
                    var c = 1
                }
                var d;
                c || "function" != typeof this.o || (d = this.o(a)) && (c = 4);
                c ? rt(this) : (this.ye = !0,
                this.dispatchEvent("complete"),
                this.dispatchEvent("success"),
                pt(this))
            } catch (e) {
                rt(this)
            }
        }
        ;
        var rt = function(a) {
            a.s || (a.ye = !1,
            a.tb = !1,
            a.dispatchEvent("complete"),
            a.dispatchEvent("error"),
            pt(a),
            a.s = !0)
        }
          , pt = function(a) {
            qt(a);
            mt(a);
            a.la = null;
            a.dispatchEvent("ready")
        }
          , qt = function(a) {
            var b = a.bb;
            b && (b.onreadystatechange = null,
            b.onload = null,
            b.onerror = null,
            a.j.push(b));
            a.oc && (_.t.clearTimeout(a.oc),
            a.oc = null);
            _.rc ? a.oc = _.ah(a.l, 2E3, a) : a.l();
            a.bb = null;
            a.Hc = null
        };
        it.prototype.l = function() {
            this.oc && (_.t.clearTimeout(this.oc),
            this.oc = null);
            for (; 0 != this.j.length; ) {
                var a = this.j.pop();
                $n(a)
            }
        }
        ;
        var mt = function(a) {
            a.la && a.la == jt && _.vd(a.la)
        }
          , ot = function(a) {
            return a.bb ? bo(a.bb).getElementById(a.Hc + "_inner") : null
        };
        it.prototype.A = function() {
            if (this.tb) {
                var a = this.bb ? bo(ot(this)) : null;
                a && !_.nc(a, "documentUri") ? (_.Xd(ot(this), "load", this.g, !1, this),
                rt(this)) : _.ah(this.A, 250, this)
            }
        }
        ;
        var ut = function(a, b, c, d, e, f) {
            if (_.uc && e)
                return st(a);
            if (e && !d)
                return !1;
            if (!_.rc) {
                "number" === typeof b && (b = tt(b));
                var g = 17 == b || 18 == b || _.uc && 91 == b;
                if ((!c || _.uc) && g || _.uc && 16 == b && (d || f))
                    return !1
            }
            if ((_.sc || _.pc) && d && c)
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
                    return !1
                }
            if (_.E && d && b == a)
                return !1;
            switch (a) {
            case 13:
                return _.rc ? f || e ? !1 : !(c && d) : !0;
            case 27:
                return !(_.sc || _.pc || _.rc)
            }
            return _.rc && (d || e || f) ? !1 : st(a)
        }
          , st = function(a) {
            if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (_.sc || _.pc) && 0 == a)
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
                return _.rc;
            default:
                return !1
            }
        }
          , tt = function(a) {
            if (_.rc)
                a = vt(a);
            else if (_.uc && _.sc)
                switch (a) {
                case 93:
                    a = 91
                }
            return a
        }
          , vt = function(a) {
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
                return a
            }
        };
        var wt = function(a, b, c, d) {
            _.Dd.call(this, d);
            this.type = "key";
            this.keyCode = a;
            this.charCode = b;
            this.repeat = c
        };
        _.A(wt, _.Dd);
        var xt = function(a, b) {
            _.G.call(this);
            a && this.attach(a, b)
        };
        _.A(xt, _.G);
        _.l = xt.prototype;
        _.l.Ac = null;
        _.l.fe = null;
        _.l.nf = null;
        _.l.ge = null;
        _.l.Ua = -1;
        _.l.Jb = -1;
        _.l.Le = !1;
        var yt = {
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
        }
          , zt = {
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
        }
          , At = _.uc && _.rc;
        _.l = xt.prototype;
        _.l.qj = function(a) {
            if (_.sc || _.pc)
                if (17 == this.Ua && !a.ctrlKey || 18 == this.Ua && !a.altKey || _.uc && 91 == this.Ua && !a.metaKey)
                    this.Jb = this.Ua = -1;
            -1 == this.Ua && (a.ctrlKey && 17 != a.keyCode ? this.Ua = 17 : a.altKey && 18 != a.keyCode ? this.Ua = 18 : a.metaKey && 91 != a.keyCode && (this.Ua = 91));
            ut(a.keyCode, this.Ua, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.Jb = tt(a.keyCode),
            At && (this.Le = a.altKey)) : this.handleEvent(a)
        }
        ;
        _.l.sj = function(a) {
            this.Jb = this.Ua = -1;
            this.Le = a.altKey
        }
        ;
        _.l.handleEvent = function(a) {
            var b = a.g
              , c = b.altKey;
            if (_.E && "keypress" == a.type) {
                var d = this.Jb;
                var e = 13 != d && 27 != d ? b.keyCode : 0
            } else
                (_.sc || _.pc) && "keypress" == a.type ? (d = this.Jb,
                e = 0 <= b.charCode && 63232 > b.charCode && st(d) ? b.charCode : 0) : ("keypress" == a.type ? (At && (c = this.Le),
                b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode,
                e = 0) : (d = this.Jb,
                e = b.charCode) : (d = b.keyCode || this.Jb,
                e = b.charCode || 0)) : (d = b.keyCode || this.Jb,
                e = b.charCode || 0),
                _.uc && 63 == e && 224 == d && (d = 191));
            var f = d = tt(d);
            d ? 63232 <= d && d in yt ? f = yt[d] : 25 == d && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in zt && (f = zt[b.keyIdentifier]);
            if (!_.rc || "keypress" != a.type || ut(f, this.Ua, a.shiftKey, a.ctrlKey, c, a.metaKey))
                a = f == this.Ua,
                this.Ua = f,
                b = new wt(f,e,a,b),
                b.altKey = c,
                this.dispatchEvent(b)
        }
        ;
        _.l.C = function() {
            return this.Ac
        }
        ;
        _.l.attach = function(a, b) {
            this.ge && Bt(this);
            this.Ac = a;
            this.fe = _.F(this.Ac, "keypress", this, b);
            this.nf = _.F(this.Ac, "keydown", this.qj, b, this);
            this.ge = _.F(this.Ac, "keyup", this.sj, b, this)
        }
        ;
        var Bt = function(a) {
            a.fe && (_.Yd(a.fe),
            _.Yd(a.nf),
            _.Yd(a.ge),
            a.fe = null,
            a.nf = null,
            a.ge = null);
            a.Ac = null;
            a.Ua = -1;
            a.Jb = -1
        };
        xt.prototype.I = function() {
            xt.P.I.call(this);
            Bt(this)
        }
        ;
        var Ct;
        var Dt = function(a, b, c) {
            Array.isArray(c) && (c = c.join(" "));
            var d = "aria-" + b;
            "" === c || void 0 == c ? (Ct || (c = {},
            Ct = (c.atomic = !1,
            c.autocomplete = "none",
            c.dropeffect = "none",
            c.haspopup = !1,
            c.live = "off",
            c.multiline = !1,
            c.multiselectable = !1,
            c.orientation = "vertical",
            c.readonly = !1,
            c.relevant = "additions text",
            c.required = !1,
            c.sort = "none",
            c.busy = !1,
            c.disabled = !1,
            c.hidden = !1,
            c.invalid = "false",
            c)),
            c = Ct,
            b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
        };
        var Et = function(a) {
            return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
        }
          , Ft = function(a) {
            return a.classList ? a.classList : Et(a).match(/\S+/g) || []
        }
          , Gt = function(a, b) {
            "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
        }
          , Ht = function(a, b) {
            return a.classList ? a.classList.contains(b) : _.ta(Ft(a), b)
        }
          , It = function(a, b) {
            if (a.classList)
                a.classList.add(b);
            else if (!Ht(a, b)) {
                var c = Et(a);
                Gt(a, c + (0 < c.length ? " " + b : b))
            }
        }
          , Jt = function(a, b) {
            if (a.classList)
                Array.prototype.forEach.call(b, function(e) {
                    It(a, e)
                });
            else {
                var c = {};
                Array.prototype.forEach.call(Ft(a), function(e) {
                    c[e] = !0
                });
                Array.prototype.forEach.call(b, function(e) {
                    c[e] = !0
                });
                b = "";
                for (var d in c)
                    b += 0 < b.length ? " " + d : d;
                Gt(a, b)
            }
        }
          , Kt = function(a, b) {
            a.classList ? a.classList.remove(b) : Ht(a, b) && Gt(a, Array.prototype.filter.call(Ft(a), function(c) {
                return c != b
            }).join(" "))
        }
          , Lt = function(a, b) {
            a.classList ? Array.prototype.forEach.call(b, function(c) {
                Kt(a, c)
            }) : Gt(a, Array.prototype.filter.call(Ft(a), function(c) {
                return !_.ta(b, c)
            }).join(" "))
        };
        var Mt = function() {}, Nt;
        qn(Mt);
        var Ot = {
            button: "pressed",
            checkbox: "checked",
            menuitem: "selected",
            menuitemcheckbox: "checked",
            menuitemradio: "checked",
            radio: "checked",
            tab: "selected",
            treeitem: "selected"
        };
        _.l = Mt.prototype;
        _.l.Sd = function() {}
        ;
        _.l.U = function(a) {
            return a.h.U("DIV", Pt(this, a).join(" "), a.na())
        }
        ;
        _.l.Ce = function() {
            return !0
        }
        ;
        _.l.ec = function(a, b) {
            b.id && at(a, b.id);
            b && b.firstChild ? Qt(a, b.firstChild.nextSibling ? _.wa(b.childNodes) : b.firstChild) : a.fc = null;
            var c = 0
              , d = this.Ub()
              , e = this.Ub()
              , f = !1
              , g = !1
              , h = _.wa(Ft(b));
            h.forEach(function(k) {
                f || k != d ? g || k != e ? c |= Rt(this, k) : g = !0 : (f = !0,
                e == d && (g = !0));
                1 == Rt(this, k) && b.hasAttribute("tabindex") && go(b) && ho(b, !1)
            }, this);
            a.pa = c;
            f || (h.push(d),
            e == d && (g = !0));
            g || h.push(e);
            (a = a.af) && h.push.apply(h, a);
            f && g && !a || Gt(b, h.join(" "));
            return b
        }
        ;
        _.l.ih = function(a) {
            null == a.qa && (a.qa = Ep(a.cb ? a.o : a.h.g.body));
            a.qa && this.Ee(a.C(), !0);
            a.isEnabled() && this.Uc(a, a.isVisible())
        }
        ;
        var St = function(a, b) {
            if (a = a.Sd()) {
                var c = b.getAttribute("role") || null;
                a != c && (a ? b.setAttribute("role", a) : b.removeAttribute("role"))
            }
        };
        _.l = Mt.prototype;
        _.l.Cd = function(a, b) {
            var c = !b;
            b = _.E ? a.getElementsByTagName("*") : null;
            if (_.Qk) {
                if (c = c ? "none" : "",
                a.style && (a.style[_.Qk] = c),
                b) {
                    a = 0;
                    for (var d; d = b[a]; a++)
                        d.style && (d.style[_.Qk] = c)
                }
            } else if (_.E && (c = c ? "on" : "",
            a.setAttribute("unselectable", c),
            b))
                for (a = 0; d = b[a]; a++)
                    d.setAttribute("unselectable", c)
        }
        ;
        _.l.Ee = function(a, b) {
            var c = this.Ub() + "-SIsrTd";
            (a = a.C ? a.C() : a) && (b ? Jt : Lt)(a, [c])
        }
        ;
        _.l.De = function(a) {
            var b;
            return a.Qa & 32 && (b = a.C()) ? b.hasAttribute("tabindex") && go(b) : !1
        }
        ;
        _.l.Uc = function(a, b) {
            var c;
            if (a.Qa & 32 && (c = a.C())) {
                if (!b && a.pa & 32) {
                    try {
                        c.blur()
                    } catch (d) {}
                    a.pa & 32 && a.Sg(null)
                }
                (c.hasAttribute("tabindex") && go(c)) != b && ho(c, b)
            }
        }
        ;
        _.l.ga = function(a, b) {
            Bp(a, b);
            a && Dt(a, "hidden", !b)
        }
        ;
        _.l.Yc = function(a, b, c) {
            var d = a.C();
            if (d) {
                var e = Tt(this, b);
                e && (a = a.C ? a.C() : a) && (c ? Jt : Lt)(a, [e]);
                this.rb(d, b, c)
            }
        }
        ;
        _.l.rb = function(a, b, c) {
            Nt || (Nt = {
                1: "disabled",
                8: "selected",
                16: "checked",
                64: "expanded"
            });
            b = Nt[b];
            var d = a.getAttribute("role") || null;
            d && (d = Ot[d] || b,
            b = "checked" == b || "selected" == b ? d : b);
            b && Dt(a, b, c)
        }
        ;
        _.l.kg = function(a, b) {
            if (a && (_.vd(a),
            b))
                if ("string" === typeof b)
                    _.xd(a, b);
                else {
                    var c = function(d) {
                        if (d) {
                            var e = _.kd(a);
                            a.appendChild("string" === typeof d ? e.createTextNode(d) : d)
                        }
                    };
                    Array.isArray(b) ? b.forEach(c) : !_.da(b) || "nodeType"in b ? c(b) : _.wa(b).forEach(c)
                }
        }
        ;
        _.l.Ub = function() {
            return "VIpgJd-bMcfAe"
        }
        ;
        var Pt = function(a, b) {
            var c = a.Ub()
              , d = [c]
              , e = a.Ub();
            e != c && d.push(e);
            c = b.pa;
            for (e = []; c; ) {
                var f = c & -c;
                e.push(Tt(a, f));
                c &= ~f
            }
            d.push.apply(d, e);
            (a = b.af) && d.push.apply(d, a);
            return d
        }
          , Tt = function(a, b) {
            a.g || Ut(a);
            return a.g[b]
        }
          , Rt = function(a, b) {
            if (!a.h) {
                a.g || Ut(a);
                var c = a.g, d = {}, e;
                for (e in c)
                    d[c[e]] = e;
                a.h = d
            }
            a = parseInt(a.h[b], 10);
            return isNaN(a) ? 0 : a
        }
          , Ut = function(a) {
            var b = a.Ub();
            a.g = {
                1: b + "-OWB6Me",
                2: b + "-ZmdkE",
                4: b + "-auswjd",
                8: b + "-gk6SMd",
                16: b + "-barxie",
                32: b + "-XpnDCe",
                64: b + "-FNFY6c"
            }
        };
        var Vt = function() {};
        _.A(Vt, Mt);
        qn(Vt);
        _.l = Vt.prototype;
        _.l.Sd = function() {
            return "button"
        }
        ;
        _.l.rb = function(a, b, c) {
            switch (b) {
            case 8:
            case 16:
                Dt(a, "pressed", c);
                break;
            default:
            case 64:
            case 1:
                Vt.P.rb.call(this, a, b, c)
            }
        }
        ;
        _.l.U = function(a) {
            var b = Vt.P.U.call(this, a);
            this.Sf(b, a.Fa());
            var c = a.ua();
            c && this.Pa(b, c);
            a.Qa & 16 && this.rb(b, 16, !!(a.pa & 16));
            return b
        }
        ;
        _.l.ec = function(a, b) {
            b = Vt.P.ec.call(this, a, b);
            var c = this.ua(b);
            a.s = c;
            a.M = this.Fa(b);
            a.Qa & 16 && this.rb(b, 16, !!(a.pa & 16));
            return b
        }
        ;
        _.l.ua = function() {}
        ;
        _.l.Pa = function() {}
        ;
        _.l.Fa = function(a) {
            return a.title
        }
        ;
        _.l.Sf = function(a, b) {
            a && (b ? a.title = b : a.removeAttribute("title"))
        }
        ;
        _.l.Ub = function() {
            return "VIpgJd-LgbsSe"
        }
        ;
        var Wt = {
            He: "mousedown",
            Ie: "mouseup",
            og: "mousecancel",
            Bl: "mousemove",
            Dl: "mouseover",
            Cl: "mouseout",
            zl: "mouseenter",
            Al: "mouseleave"
        };
        var Xt = function(a, b) {
            if (!a)
                throw Error("Ma`" + a);
            if ("function" !== typeof b)
                throw Error("Na`" + b);
        }
          , Yt = {};
        var X = function(a, b, c) {
            P.call(this, c);
            if (!b) {
                for (b = this.constructor; b; ) {
                    var d = _.za(b);
                    if (d = Yt[d])
                        break;
                    b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor
                }
                b = d ? "function" === typeof d.Vb ? d.Vb() : new d : null
            }
            this.g = b;
            this.fc = void 0 !== a ? a : null
        };
        _.A(X, P);
        _.l = X.prototype;
        _.l.fc = null;
        _.l.pa = 0;
        _.l.Qa = 39;
        _.l.Pe = 255;
        _.l.sb = !0;
        _.l.af = null;
        _.l.gf = !0;
        _.l.Gd = !1;
        var $t = function(a) {
            a.cb && 0 != a.gf && Zt(a, !1);
            a.gf = !1
        };
        X.prototype.U = function() {
            var a = this.g.U(this);
            this.o = a;
            St(this.g, a);
            this.Gd || this.g.Cd(a, !1);
            this.isVisible() || this.g.ga(a, !1)
        }
        ;
        X.prototype.jg = function(a) {
            return this.g.Ce(a)
        }
        ;
        X.prototype.Aa = function(a) {
            this.o = a = this.g.ec(this, a);
            St(this.g, a);
            this.Gd || this.g.Cd(a, !1);
            this.sb = "none" != a.style.display
        }
        ;
        X.prototype.sa = function() {
            X.P.sa.call(this);
            var a = this.g
              , b = this.o;
            this.isVisible() || Dt(b, "hidden", !this.isVisible());
            this.isEnabled() || a.rb(b, 1, !this.isEnabled());
            this.Qa & 8 && a.rb(b, 8, !!(this.pa & 8));
            this.Qa & 16 && a.rb(b, 16, !!(this.pa & 16));
            this.Qa & 64 && a.rb(b, 64, !!(this.pa & 64));
            this.g.ih(this);
            this.Qa & -2 && (this.gf && Zt(this, !0),
            this.Qa & 32 && (a = this.C())) && (b = this.A || (this.A = new xt),
            b.attach(a),
            ct(this).J(b, "key", this.rj).J(a, "focus", this.ai).J(a, "blur", this.Sg))
        }
        ;
        var Zt = function(a, b) {
            var c = ct(a)
              , d = a.C();
            b ? (c.J(d, Wt.He, a.ff).J(d, [Wt.Ie, Wt.og], a.hf).J(d, "mouseover", a.V).J(d, "mouseout", a.ba),
            a.G != _.Gb && c.J(d, "contextmenu", a.G),
            _.E && !a.B && (a.B = new au(a),
            _.hj(a, a.B))) : (c.qb(d, Wt.He, a.ff).qb(d, [Wt.Ie, Wt.og], a.hf).qb(d, "mouseover", a.V).qb(d, "mouseout", a.ba),
            a.G != _.Gb && c.qb(d, "contextmenu", a.G),
            _.E && (_.ca(a.B),
            a.B = null))
        };
        X.prototype.ma = function() {
            X.P.ma.call(this);
            this.A && Bt(this.A);
            this.isVisible() && this.isEnabled() && this.g.Uc(this, !1)
        }
        ;
        X.prototype.I = function() {
            X.P.I.call(this);
            this.A && (this.A.T(),
            delete this.A);
            delete this.g;
            this.B = this.af = this.fc = null
        }
        ;
        X.prototype.na = function() {
            return this.fc
        }
        ;
        X.prototype.l = function(a) {
            this.g.kg(this.C(), a);
            this.fc = a
        }
        ;
        var Qt = function(a, b) {
            a.fc = b
        };
        _.l = X.prototype;
        _.l.Lh = function(a) {
            this.l(a)
        }
        ;
        _.l.isVisible = function() {
            return this.sb
        }
        ;
        _.l.ga = function(a, b) {
            if (b || this.sb != a && this.dispatchEvent(a ? "show" : "hide"))
                (b = this.C()) && this.g.ga(b, a),
                this.isEnabled() && this.g.Uc(this, a),
                this.sb = a
        }
        ;
        _.l.isEnabled = function() {
            return !(this.pa & 1)
        }
        ;
        _.l.yb = function(a) {
            var b = this.F;
            b && "function" == typeof b.isEnabled && !b.isEnabled() || !bu(this, 1, !a) || (a || (cu(this, !1),
            du(this, !1)),
            this.isVisible() && this.g.Uc(this, a),
            eu(this, 1, !a, !0))
        }
        ;
        var du = function(a, b) {
            bu(a, 2, b) && eu(a, 2, b)
        };
        X.prototype.isActive = function() {
            return !!(this.pa & 4)
        }
        ;
        var cu = function(a, b) {
            bu(a, 4, b) && eu(a, 4, b)
        }
          , eu = function(a, b, c, d) {
            d || 1 != b ? a.Qa & b && c != !!(a.pa & b) && (a.g.Yc(a, b, c),
            a.pa = c ? a.pa | b : a.pa & ~b) : a.yb(!c)
        }
          , fu = function(a) {
            if (a.cb && a.pa & 32)
                throw Error("Ga");
            a.pa & 32 && eu(a, 32, !1);
            a.Qa &= -33
        }
          , gu = function(a, b) {
            return !!(a.Pe & b) && !!(a.Qa & b)
        }
          , hu = function(a) {
            a.Pe &= -256
        }
          , bu = function(a, b, c) {
            return !!(a.Qa & b) && !!(a.pa & b) != c && (!(0 & b) || a.dispatchEvent($s(b, c))) && !a.ob()
        };
        X.prototype.V = function(a) {
            !iu(a, this.C()) && this.dispatchEvent("enter") && this.isEnabled() && gu(this, 2) && du(this, !0)
        }
        ;
        X.prototype.ba = function(a) {
            !iu(a, this.C()) && this.dispatchEvent("leave") && (gu(this, 4) && cu(this, !1),
            gu(this, 2) && du(this, !1))
        }
        ;
        X.prototype.G = _.Gb;
        var iu = function(a, b) {
            return !!a.relatedTarget && _.wd(b, a.relatedTarget)
        };
        _.l = X.prototype;
        _.l.ff = function(a) {
            this.isEnabled() && (gu(this, 2) && du(this, !0),
            0 != a.g.button || _.uc && a.ctrlKey || (gu(this, 4) && cu(this, !0),
            this.g && this.g.De(this) && this.C().focus()));
            this.Gd || 0 != a.g.button || _.uc && a.ctrlKey || a.preventDefault()
        }
        ;
        _.l.hf = function(a) {
            this.isEnabled() && (gu(this, 2) && du(this, !0),
            this.isActive() && this.te(a) && gu(this, 4) && cu(this, !1))
        }
        ;
        _.l.te = function(a) {
            if (gu(this, 16)) {
                var b = !(this.pa & 16);
                bu(this, 16, b) && eu(this, 16, b)
            }
            gu(this, 8) && bu(this, 8, !0) && eu(this, 8, !0);
            gu(this, 64) && (b = !(this.pa & 64),
            bu(this, 64, b) && eu(this, 64, b));
            b = new _.Ad("action",this);
            a && (b.altKey = a.altKey,
            b.ctrlKey = a.ctrlKey,
            b.metaKey = a.metaKey,
            b.shiftKey = a.shiftKey,
            b.j = a.j);
            return this.dispatchEvent(b)
        }
        ;
        _.l.ai = function() {
            gu(this, 32) && bu(this, 32, !0) && eu(this, 32, !0)
        }
        ;
        _.l.Sg = function() {
            gu(this, 4) && cu(this, !1);
            gu(this, 32) && bu(this, 32, !1) && eu(this, 32, !1)
        }
        ;
        _.l.rj = function(a) {
            return this.isVisible() && this.isEnabled() && this.ef(a) ? (a.preventDefault(),
            a.stopPropagation(),
            !0) : !1
        }
        ;
        _.l.ef = function(a) {
            return 13 == a.keyCode && this.te(a)
        }
        ;
        if ("function" !== typeof X)
            throw Error("Oa`" + X);
        if ("function" !== typeof Mt)
            throw Error("Pa`" + Mt);
        var ju = _.za(X);
        Yt[ju] = Mt;
        Xt("VIpgJd-bMcfAe", function() {
            return new X(null)
        });
        var au = function(a) {
            _.B.call(this);
            this.h = a;
            this.g = !1;
            this.j = new _.Og(this);
            _.hj(this, this.j);
            a = this.h.o;
            this.j.J(a, Wt.He, this.o).J(a, Wt.Ie, this.s).J(a, "click", this.l)
        };
        _.A(au, _.B);
        var ku = !_.E || 9 <= Number(_.Jc);
        au.prototype.o = function() {
            this.g = !1
        }
        ;
        au.prototype.s = function() {
            this.g = !0
        }
        ;
        var lu = function(a, b) {
            if (!ku)
                return a.button = 0,
                a.type = b,
                a;
            var c = document.createEvent("MouseEvents");
            c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
            return c
        };
        au.prototype.l = function(a) {
            if (this.g)
                this.g = !1;
            else {
                var b = a.g
                  , c = b.button
                  , d = b.type
                  , e = lu(b, "mousedown");
                this.h.ff(new _.Dd(e,a.currentTarget));
                e = lu(b, "mouseup");
                this.h.hf(new _.Dd(e,a.currentTarget));
                ku || (b.button = c,
                b.type = d)
            }
        }
        ;
        au.prototype.I = function() {
            this.h = null;
            au.P.I.call(this)
        }
        ;
        var mu = function() {};
        _.A(mu, Vt);
        qn(mu);
        _.l = mu.prototype;
        _.l.Sd = function() {}
        ;
        _.l.U = function(a) {
            $t(a);
            hu(a);
            fu(a);
            var b = a.h
              , c = b.U
              , d = {
                "class": Pt(this, a).join(" "),
                disabled: !a.isEnabled(),
                title: a.Fa() || "",
                value: a.ua() || ""
            };
            a = (a = a.na()) ? ("string" === typeof a ? a : Array.isArray(a) ? a.map(ko).join("") : jo(a)).replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "") : "";
            return c.call(b, "BUTTON", d, a || "")
        }
        ;
        _.l.Ce = function(a) {
            return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
        }
        ;
        _.l.ec = function(a, b) {
            $t(a);
            hu(a);
            fu(a);
            if (b.disabled) {
                var c = Tt(this, 1);
                It(b, c)
            }
            return mu.P.ec.call(this, a, b)
        }
        ;
        _.l.ih = function(a) {
            ct(a).J(a.C(), "click", a.te)
        }
        ;
        _.l.Cd = function() {}
        ;
        _.l.Ee = function() {}
        ;
        _.l.De = function(a) {
            return a.isEnabled()
        }
        ;
        _.l.Uc = function() {}
        ;
        _.l.Yc = function(a, b, c) {
            mu.P.Yc.call(this, a, b, c);
            (a = a.C()) && 1 == b && (a.disabled = c)
        }
        ;
        _.l.ua = function(a) {
            return a.value
        }
        ;
        _.l.Pa = function(a, b) {
            a && (a.value = b)
        }
        ;
        _.l.rb = function() {}
        ;
        var nu = function(a, b, c) {
            X.call(this, a, b || mu.Vb(), c)
        };
        _.A(nu, X);
        _.l = nu.prototype;
        _.l.ua = function() {
            return this.s
        }
        ;
        _.l.Pa = function(a) {
            this.s = a;
            this.g.Pa(this.C(), a)
        }
        ;
        _.l.Fa = function() {
            return this.M
        }
        ;
        _.l.Sf = function(a) {
            this.M = a;
            this.g.Sf(this.C(), a)
        }
        ;
        _.l.I = function() {
            nu.P.I.call(this);
            delete this.s;
            delete this.M
        }
        ;
        _.l.sa = function() {
            nu.P.sa.call(this);
            if (this.Qa & 32) {
                var a = this.C();
                a && ct(this).J(a, "keyup", this.ef)
            }
        }
        ;
        _.l.ef = function(a) {
            return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.te(a) : 32 == a.keyCode
        }
        ;
        Xt("VIpgJd-LgbsSe", function() {
            return new nu(null)
        });
        var ou = function(a, b) {
            P.call(this);
            this.B = a || "";
            this.j = null;
            this.A = [];
            this.g = null;
            this.D = b || "GET";
            this.l = this.s = null
        };
        _.y(ou, P);
        ou.prototype.U = function() {
            var a = {
                yi: this.B,
                method: this.D,
                Qi: this.A,
                dir: _.Qf.test(Xp) ? "rtl" : "ltr"
            };
            this.Aa(ul(Us, a))
        }
        ;
        ou.prototype.Aa = function(a) {
            this.o = a;
            this.g = bt(this, "VIpgJd-yAWNEb-Z0Arqf-I9GLp");
            a = bt(this, "VIpgJd-yAWNEb-Z0Arqf-sFeBqf");
            this.l = new nu("");
            et(this.l, a);
            a = bt(this, "activity-cancel");
            this.j = new nu("");
            et(this.j, a)
        }
        ;
        ou.prototype.sa = function() {
            var a = ct(this);
            a.J(this.l, "action", (0,
            _.z)(this.G, this));
            a.J(this.j, "action", this.dispatchEvent.bind(this, "cancelled"))
        }
        ;
        ou.prototype.G = function() {
            var a = !0;
            this.s && (a = this.s());
            a && (a = new it,
            _.F(a, "success", function() {
                this.dispatchEvent("successful")
            }),
            _.F(a, "error", function() {
                this.dispatchEvent("failed")
            }),
            nt(a, this.g));
            this.dispatchEvent("submitted")
        }
        ;
        var pu = function(a, b) {
            for (var c in b)
                a.g[c] && (a.g[c].value = b[c])
        }
          , qu = function(a, b) {
            return a.g[b] ? a.g[b].value : ""
        };
        ou.prototype.I = function() {
            this.l = this.g = this.j = null;
            P.prototype.I.call(this)
        }
        ;
        var ru = function(a, b) {
            a.s = b
        };
        var su = function() {};
        _.A(su, Mt);
        qn(su);
        _.l = su.prototype;
        _.l.Sd = function() {}
        ;
        _.l.ec = function(a, b) {
            $t(a);
            hu(a);
            fu(a);
            su.P.ec.call(this, a, b);
            a.l(b.value);
            return b
        }
        ;
        _.l.U = function(a) {
            $t(a);
            hu(a);
            fu(a);
            return a.h.U("TEXTAREA", {
                "class": Pt(this, a).join(" "),
                disabled: !a.isEnabled()
            }, a.na() || "")
        }
        ;
        _.l.Ce = function(a) {
            return "TEXTAREA" == a.tagName
        }
        ;
        _.l.Ee = function() {}
        ;
        _.l.De = function(a) {
            return a.isEnabled()
        }
        ;
        _.l.Uc = function() {}
        ;
        _.l.Yc = function(a, b, c) {
            su.P.Yc.call(this, a, b, c);
            (a = a.C()) && 1 == b && (a.disabled = c)
        }
        ;
        _.l.rb = function() {}
        ;
        _.l.kg = function(a, b) {
            a && (a.value = b)
        }
        ;
        _.l.Ub = function() {
            return "VIpgJd-B7I4Od"
        }
        ;
        var tu = function(a, b, c) {
            X.call(this, a, b || su.Vb(), c);
            $t(this);
            this.Gd = !0;
            (b = this.C()) && this.g.Cd(b, !0);
            this.Fc = "" != a;
            a || (this.fc = "")
        };
        _.A(tu, X);
        var uu = !(_.E && !(11 <= Number(_.Jc)));
        _.l = tu.prototype;
        _.l.Ic = !1;
        _.l.ce = !1;
        _.l.Fc = !1;
        _.l.Hb = 0;
        _.l.mh = 0;
        _.l.yf = 0;
        _.l.dh = !1;
        _.l.le = !1;
        _.l.Mf = !1;
        _.l.Lf = !1;
        _.l.Pc = "";
        var vu = function(a) {
            return a.j.top + a.j.bottom + a.S.top + a.S.bottom
        }
          , wu = function(a) {
            var b = a.yf
              , c = a.C();
            b && c && a.le && (b -= vu(a));
            return b
        }
          , yu = function(a) {
            a.yf = 50;
            xu(a)
        }
          , zu = function(a) {
            a.mh = 50;
            xu(a)
        };
        tu.prototype.Pa = function(a) {
            this.l(String(a))
        }
        ;
        tu.prototype.ua = function() {
            return this.C().value != this.Pc || Au(this) || this.Fc ? this.C().value : ""
        }
        ;
        tu.prototype.l = function(a) {
            tu.P.l.call(this, a);
            this.Fc = "" != a;
            xu(this)
        }
        ;
        tu.prototype.yb = function(a) {
            tu.P.yb.call(this, a);
            this.C().disabled = !a
        }
        ;
        var xu = function(a) {
            a.C() && a.D()
        }
          , Au = function(a) {
            return "placeholder"in a.C()
        }
          , Bu = function(a) {
            a.Pc && (Au(a) ? a.C().placeholder = a.Pc : !a.C() || a.Fc || a.ce || (It(a.C(), "B7I4Od-LwH6nd-YPqjbf"),
            a.C().value = a.Pc))
        };
        tu.prototype.sa = function() {
            tu.P.sa.call(this);
            var a = this.C();
            _.M(a, {
                overflowY: "hidden",
                overflowX: "auto",
                boxSizing: "border-box",
                MsBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                MozBoxSizing: "border-box"
            });
            this.j = Kp(a);
            this.S = Np(a);
            ct(this).J(a, "scroll", this.D).J(a, "focus", this.D).J(a, "keyup", this.D).J(a, "mouseup", this.Ia).J(a, "blur", this.ra);
            Bu(this);
            xu(this)
        }
        ;
        var Cu = function(a) {
            if (!a.dh) {
                var b = a.C().cloneNode(!1);
                _.M(b, {
                    position: "absolute",
                    height: "auto",
                    top: "-9999px",
                    margin: "0",
                    padding: "1px",
                    border: "1px solid #000",
                    overflow: "hidden"
                });
                a.h.g.body.appendChild(b);
                var c = b.scrollHeight;
                b.style.padding = "10px";
                var d = b.scrollHeight;
                a.Mf = d > c;
                b.style.borderWidth = "10px";
                a.Lf = b.scrollHeight > d;
                b.style.height = "100px";
                100 != b.offsetHeight && (a.le = !0);
                $n(b);
                a.dh = !0
            }
            b = a.C();
            isNaN(a.j.top) && (a.j = Kp(b),
            a.S = Np(b));
            c = a.C().scrollHeight;
            var e = a.C();
            d = e.offsetHeight - e.clientHeight;
            if (!a.Mf) {
                var f = a.j;
                d -= f.top + f.bottom
            }
            a.Lf || (e = Np(e),
            d -= e.top + e.bottom);
            c += 0 < d ? d : 0;
            a.le ? c -= vu(a) : (a.Mf || (d = a.j,
            c += d.top + d.bottom),
            a.Lf || (a = Np(b),
            c += a.top + a.bottom));
            return c
        }
          , Du = function(a, b) {
            a.Hb != b && (a.Hb = b,
            a.C().style.height = b + "px")
        }
          , Eu = function(a) {
            var b = a.C();
            b.style.height = "auto";
            var c = b.value.match(/\n/g) || [];
            b.rows = c.length + 1;
            a.Hb = 0
        };
        tu.prototype.ra = function() {
            Au(this) || (this.ce = !1,
            "" == this.C().value && (this.Fc = !1,
            Bu(this)))
        }
        ;
        tu.prototype.D = function(a) {
            if (!this.Ic) {
                var b = this.C();
                !Au(this) && a && "focus" == a.type && (b.value == this.Pc && this.Pc && !this.ce && (Kt(b, "B7I4Od-LwH6nd-YPqjbf"),
                b.value = ""),
                this.ce = !0,
                this.Fc = "" != b.value);
                var c = !1;
                this.Ic = !0;
                a = this.Hb;
                if (b.scrollHeight) {
                    var d = !1
                      , e = !1
                      , f = Cu(this)
                      , g = b.offsetHeight
                      , h = wu(this);
                    var k = this.mh;
                    var m = this.C();
                    k && m && this.le && (k -= vu(this));
                    h && f < h ? (Du(this, h),
                    d = !0) : k && f > k ? (Du(this, k),
                    b.style.overflowY = "",
                    e = !0) : g != f ? Du(this, f) : this.Hb || (this.Hb = f);
                    d || e || !uu || (c = !0)
                } else
                    Eu(this);
                this.Ic = !1;
                c && (b = this.C(),
                this.Ic || (this.Ic = !0,
                (e = b.scrollHeight) ? (f = Cu(this),
                c = wu(this),
                c && f <= c || (d = this.j,
                b.style.paddingTop = d.top + 1 + "px",
                Cu(this) == f && (b.style.paddingTop = d.top + e + "px",
                b.scrollTop = 0,
                e = Cu(this) - e,
                e >= c ? Du(this, e) : Du(this, c)),
                b.style.paddingTop = d.top + "px")) : Eu(this),
                this.Ic = !1));
                a != this.Hb && this.dispatchEvent("resize")
            }
        }
        ;
        tu.prototype.Ia = function() {
            var a = this.C()
              , b = a.offsetHeight;
            a.filters && a.filters.length && (a = a.filters.item("DXImageTransform.Microsoft.DropShadow")) && (b -= a.offX);
            b != this.Hb && (this.Hb = this.yf = b)
        }
        ;
        var Fu = function(a, b) {
            Xm.call(this, a);
            this.A = !1;
            this.s = b || {};
            this.j = null
        };
        _.y(Fu, Xm);
        _.l = Fu.prototype;
        _.l.qe = function(a) {
            Xm.prototype.qe.call(this, a);
            ct(this).J(this.j.C(), "keydown", (0,
            _.z)(this.Fa().wd, this.Fa(), !1));
            this.A = this.Fa().ad;
            this.Bd()
        }
        ;
        _.l.Bd = function() {
            Xm.prototype.Bd.call(this);
            this.j.l(this.Fa().Y);
            var a = this.Fa().lb()
              , b = this.Fa().ta();
            a && b && (pu(this.g, {
                gtrans: this.Fa().Y,
                text: this.Fa().Dd(),
                hl: Xp,
                langpair: a + "|" + b
            }),
            pu(this.g, this.s));
            this.dispatchEvent("ready");
            this.j.C().focus()
        }
        ;
        _.l.Oc = function() {
            this.Fa().wd(this.A)
        }
        ;
        _.l.U = function() {
            this.Aa(ul(Ts))
        }
        ;
        _.l.Aa = function(a) {
            this.o = a;
            a = bt(this, "contribute-original-text");
            this.j = new tu("");
            et(this.j, a);
            zu(this.j);
            yu(this.j);
            a = bt(this, "activity-form-container");
            this.g = new ou(lq,"POST");
            this.g.A = _.Oa(this.s);
            ru(this.g, (0,
            _.z)(function() {
                pu(this.g, {
                    utrans: (0,
                    _.kc)(this.j.ua())
                });
                return qu(this.g, "utrans") != qu(this.g, "gtrans")
            }, this));
            this.g.Oa(a)
        }
        ;
        _.l.sa = function() {
            Xm.prototype.sa.call(this);
            var a = ct(this);
            a.J(this.g, "cancelled", (0,
            _.z)(function() {
                this.dispatchEvent("cancelled")
            }, this));
            a.J(this.g, "submitted", (0,
            _.z)(function() {
                var b = this.j.ua();
                this.Fa().Y = b && (0,
                _.kc)(b);
                this.dispatchEvent("submitted");
                b = this.Fa().ub();
                var c = U.si;
                _.xd(b.C(), c)
            }, this))
        }
        ;
        _.l.I = function() {
            this.j && this.j.T();
            this.j = null;
            this.g && this.g.T();
            this.g = null;
            Xm.prototype.I.call(this)
        }
        ;
        var Gu = function(a) {
            _.G.call(this);
            this.o = a;
            this.s = {};
            this.j = new _.Og(this);
            this.l = null
        };
        _.y(Gu, _.G);
        Gu.prototype.attach = function() {}
        ;
        Gu.prototype.lg = function() {}
        ;
        Gu.prototype.I = function() {
            this.j.T();
            this.j = null
        }
        ;
        var Hu = function(a, b, c) {
            if (b = a.o.j[b]) {
                c = c || "undefined" == typeof c;
                for (var d = 0; d < b.Na.length; ++d)
                    b.Na[d] && a.gh(b.Na[d], c)
            }
        };
        Gu.prototype.gh = function(a, b) {
            _.M(a, "backgroundColor", b ? "#E6ECF9" : "");
            _.M(a, "color", b ? "#000" : "")
        }
        ;
        var Iu = function(a, b, c) {
            _.B.call(this);
            this.h = a;
            this.l = b || 0;
            this.j = c;
            this.g = (0,
            _.z)(this.bi, this)
        };
        _.A(Iu, _.B);
        _.l = Iu.prototype;
        _.l.Zc = 0;
        _.l.I = function() {
            Iu.P.I.call(this);
            this.stop();
            delete this.h;
            delete this.j
        }
        ;
        _.l.start = function(a) {
            this.stop();
            this.Zc = _.ah(this.g, void 0 !== a ? a : this.l)
        }
        ;
        _.l.stop = function() {
            this.isActive() && _.t.clearTimeout(this.Zc);
            this.Zc = 0
        }
        ;
        _.l.isActive = function() {
            return 0 != this.Zc
        }
        ;
        _.l.bi = function() {
            this.Zc = 0;
            this.h && this.h.call(this.j)
        }
        ;
        var Yk = {}
          , Ju = null
          , Ku = function(a) {
            a = _.za(a);
            delete Yk[a];
            Zk() && Ju && Ju.stop()
        }
          , Mu = function() {
            Ju || (Ju = new Iu(function() {
                Lu()
            }
            ,20));
            var a = Ju;
            a.isActive() || a.start()
        }
          , Lu = function() {
            var a = _.Cb();
            _.Lc(Yk, function(b) {
                Nu(b, a)
            });
            Zk() || Mu()
        };
        var Ou = function() {
            _.G.call(this);
            this.g = 0;
            this.endTime = this.startTime = null
        };
        _.A(Ou, _.G);
        Ou.prototype.j = function() {
            this.h("begin")
        }
        ;
        Ou.prototype.fb = function() {
            this.h("end")
        }
        ;
        Ou.prototype.Oc = function() {
            this.h("stop")
        }
        ;
        Ou.prototype.h = function(a) {
            this.dispatchEvent(a)
        }
        ;
        var Pu = function(a, b, c, d) {
            Ou.call(this);
            if (!Array.isArray(a) || !Array.isArray(b))
                throw Error("Qa");
            if (a.length != b.length)
                throw Error("Ra");
            this.l = a;
            this.F = b;
            this.duration = c;
            this.B = d;
            this.coords = [];
            this.progress = 0
        };
        _.A(Pu, Ou);
        Pu.prototype.play = function(a) {
            if (a || 0 == this.g)
                this.progress = 0,
                this.coords = this.l;
            else if (1 == this.g)
                return !1;
            Ku(this);
            this.startTime = a = _.Cb();
            -1 == this.g && (this.startTime -= this.duration * this.progress);
            this.endTime = this.startTime + this.duration;
            this.progress || this.j();
            this.h("play");
            -1 == this.g && this.h("resume");
            this.g = 1;
            var b = _.za(this);
            b in Yk || (Yk[b] = this);
            Mu();
            Nu(this, a);
            return !0
        }
        ;
        Pu.prototype.stop = function(a) {
            Ku(this);
            this.g = 0;
            a && (this.progress = 1);
            Qu(this, this.progress);
            this.Oc();
            this.fb()
        }
        ;
        Pu.prototype.Qf = function(a) {
            this.progress = a;
            1 == this.g && (this.startTime = _.Cb() - this.duration * this.progress,
            this.endTime = this.startTime + this.duration)
        }
        ;
        Pu.prototype.I = function() {
            0 == this.g || this.stop(!1);
            this.h("destroy");
            Pu.P.I.call(this)
        }
        ;
        var Nu = function(a, b) {
            b < a.startTime && (a.endTime = b + a.endTime - a.startTime,
            a.startTime = b);
            a.progress = (b - a.startTime) / (a.endTime - a.startTime);
            1 < a.progress && (a.progress = 1);
            Qu(a, a.progress);
            1 == a.progress ? (a.g = 0,
            Ku(a),
            a.h("finish"),
            a.fb()) : 1 == a.g && a.A()
        }
          , Qu = function(a, b) {
            "function" === typeof a.B && (b = a.B(b));
            a.coords = Array(a.l.length);
            for (var c = 0; c < a.l.length; c++)
                a.coords[c] = (a.F[c] - a.l[c]) * b + a.l[c]
        };
        Pu.prototype.A = function() {
            this.h("animate")
        }
        ;
        Pu.prototype.h = function(a) {
            this.dispatchEvent(new Ru(a,this))
        }
        ;
        var Ru = function(a, b) {
            _.Ad.call(this, a);
            this.coords = b.coords;
            this.x = b.coords[0];
            this.y = b.coords[1];
            this.z = b.coords[2];
            this.duration = b.duration;
            this.progress = b.progress;
            this.state = b.g
        };
        _.A(Ru, _.Ad);
        var Su = function() {
            if (_.vc) {
                var a = /Windows NT ([0-9.]+)/;
                return (a = a.exec(_.Ba())) ? a[1] : "0"
            }
            return _.uc ? (a = /1[0|1][_.][0-9_.]+/,
            (a = a.exec(_.Ba())) ? a[0].replace(/_/g, ".") : "10") : _.wc ? (a = /Android\s+([^\);]+)(\)|;)/,
            (a = a.exec(_.Ba())) ? a[1] : "") : _.xc || _.yc || _.zc ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/,
            (a = a.exec(_.Ba())) ? a[1].replace(/_/g, ".") : "") : ""
        }();
        var Tu = function(a) {
            return (a = a.exec(_.Ba())) ? a[1] : ""
        }
          , Uu = function() {
            if (_.Zh)
                return Tu(/Firefox\/([0-9.]+)/);
            if (_.E || _.pc || _.oc)
                return _.Gc;
            if (_.ci) {
                if (_.Ka() || _.La()) {
                    var a = Tu(/CriOS\/([0-9.]+)/);
                    if (a)
                        return a
                }
                return Tu(/Chrome\/([0-9.]+)/)
            }
            if (_.di && !_.Ka())
                return Tu(/Version\/([0-9.]+)/);
            if (_.$h || _.ai) {
                if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(_.Ba()))
                    return a[1] + "." + a[2]
            } else if (_.bi)
                return (a = Tu(/Android\s+([0-9.]+)/)) ? a : Tu(/Version\/([0-9.]+)/);
            return ""
        }();
        var Vu = function(a, b, c, d, e) {
            Pu.call(this, b, c, d, e);
            this.element = a
        };
        _.A(Vu, Pu);
        Vu.prototype.s = function() {}
        ;
        Vu.prototype.A = function() {
            this.s();
            Vu.P.A.call(this)
        }
        ;
        Vu.prototype.fb = function() {
            this.s();
            Vu.P.fb.call(this)
        }
        ;
        Vu.prototype.j = function() {
            this.s();
            Vu.P.j.call(this)
        }
        ;
        var Wu = function(a, b, c, d, e) {
            "number" === typeof b && (b = [b]);
            "number" === typeof c && (c = [c]);
            Vu.call(this, a, b, c, d, e);
            if (1 != b.length || 1 != c.length)
                throw Error("Sa");
            this.o = -1
        };
        _.A(Wu, Vu);
        var Xu = 1 / 1024;
        Wu.prototype.s = function() {
            var a = this.coords[0];
            if (Math.abs(a - this.o) >= Xu) {
                var b = this.element.style;
                "opacity"in b ? b.opacity = a : "MozOpacity"in b ? b.MozOpacity = a : "filter"in b && (b.filter = "" === a ? "" : "alpha(opacity=" + 100 * Number(a) + ")");
                this.o = a
            }
        }
        ;
        Wu.prototype.j = function() {
            this.o = -1;
            Wu.P.j.call(this)
        }
        ;
        Wu.prototype.fb = function() {
            this.o = -1;
            Wu.P.fb.call(this)
        }
        ;
        var Yu = function(a, b, c) {
            Wu.call(this, a, 1, 0, b, c)
        };
        _.A(Yu, Wu);
        Yu.prototype.j = function() {
            this.element.style.display = "";
            Yu.P.j.call(this)
        }
        ;
        Yu.prototype.fb = function() {
            this.element.style.display = "none";
            Yu.P.fb.call(this)
        }
        ;
        var Zu = function(a, b, c) {
            Wu.call(this, a, 0, 1, b, c)
        };
        _.A(Zu, Wu);
        Zu.prototype.j = function() {
            this.element.style.display = "";
            Zu.P.j.call(this)
        }
        ;
        var $u = function() {
            P.call(this);
            this.g = null
        };
        _.y($u, P);
        $u.prototype.U = function() {
            this.Aa(this.h.U("DIV", {
                "class": "status-message"
            }))
        }
        ;
        $u.prototype.Aa = function(a) {
            this.o = a;
            a.style.display = "none"
        }
        ;
        var bv = function(a) {
            var b = c;
            var c = (0,
            _.z)(function() {
                _.xd(this.C(), "");
                b && b()
            }, a);
            c = (0,
            _.z)(a.j, a, 750, c);
            av(a, c)
        }
          , cv = function(a) {
            a.g && (a.g.stop(!0),
            a.g = null);
            _.xd(a.C(), "");
            a.ga(!1)
        }
          , av = function(a, b) {
            a.g = new Zu(a.C(),750);
            ct(a).Xb(a.g, "begin", (0,
            _.z)(function() {
                this.C().style.display = "block"
            }, a));
            ct(a).Xb(a.g, "finish", (0,
            _.z)(function() {
                this.g = null;
                window.setTimeout(b, 2E3)
            }, a));
            a.g.play()
        };
        $u.prototype.j = function(a, b) {
            this.isVisible() && (this.g = new Yu(this.C(),a),
            ct(this).Xb(this.g, "finish", (0,
            _.z)(function() {
                b && b()
            }, this)),
            this.g.play())
        }
        ;
        $u.prototype.ga = function(a) {
            this.C().style.display = a ? "block" : "none";
            this.C().style.opacity = a ? "1" : "0"
        }
        ;
        $u.prototype.isVisible = function() {
            return "none" !== this.C().style.display && "0" !== this.C().style.opacity
        }
        ;
        var dv = function(a, b) {
            _.G.call(this);
            this.A = new _.Og(this);
            this.Tc(a || null);
            b && (this.Bc = b)
        };
        _.A(dv, _.G);
        _.l = dv.prototype;
        _.l.Va = null;
        _.l.ad = !0;
        _.l.wg = null;
        _.l.rc = !1;
        _.l.sf = -1;
        _.l.Bc = "toggle_display";
        _.l.C = function() {
            return this.Va
        }
        ;
        _.l.Tc = function(a) {
            if (this.rc)
                throw Error("Ta");
            this.Va = a
        }
        ;
        _.l.wd = function(a) {
            if (this.rc)
                throw Error("Ta");
            this.ad = a
        }
        ;
        _.l.isVisible = function() {
            return this.rc
        }
        ;
        _.l.ga = function(a) {
            this.Ia && this.Ia.stop();
            this.xa && this.xa.stop();
            if (a) {
                if (!this.rc && this.Fe()) {
                    if (!this.Va)
                        throw Error("Ua");
                    this.Bb();
                    a = _.kd(this.Va);
                    if (this.ad)
                        if (this.A.J(a, "mousedown", this.zf, !0),
                        _.E) {
                            try {
                                var b = a.activeElement
                            } catch (d) {}
                            for (; b && "IFRAME" == b.nodeName; ) {
                                try {
                                    var c = bo(b)
                                } catch (d) {
                                    break
                                }
                                a = c;
                                b = a.activeElement
                            }
                            this.A.J(a, "mousedown", this.zf, !0);
                            this.A.J(a, "deactivate", this.vh)
                        } else
                            this.A.J(a, "blur", this.vh);
                    "toggle_display" == this.Bc ? (this.Va.style.visibility = "visible",
                    Bp(this.Va, !0)) : "move_offscreen" == this.Bc && this.Bb();
                    this.rc = !0;
                    this.sf = Date.now();
                    this.Ia ? (_.Qd(this.Ia, "end", this.yh, !1, this),
                    this.Ia.play()) : this.yh()
                }
            } else
                ev(this)
        }
        ;
        _.l.Bb = function() {}
        ;
        var ev = function(a, b) {
            a.rc && a.dispatchEvent({
                type: "beforehide",
                target: b
            }) && (a.A && _.Sg(a.A),
            a.rc = !1,
            a.xa ? (_.Qd(a.xa, "end", _.Bb(a.Bg, b), !1, a),
            a.xa.play()) : a.Bg(b))
        };
        _.l = dv.prototype;
        _.l.Bg = function(a) {
            "toggle_display" == this.Bc ? this.Dj() : "move_offscreen" == this.Bc && (this.Va.style.top = "-10000px");
            this.Bf(a)
        }
        ;
        _.l.Dj = function() {
            this.Va.style.visibility = "hidden";
            Bp(this.Va, !1)
        }
        ;
        _.l.Fe = function() {
            return this.dispatchEvent("beforeshow")
        }
        ;
        _.l.yh = function() {
            this.dispatchEvent("show")
        }
        ;
        _.l.Bf = function(a) {
            this.dispatchEvent({
                type: "hide",
                target: a
            })
        }
        ;
        _.l.zf = function(a) {
            a = a.target;
            _.wd(this.Va, a) || fv(this, a) || 150 > Date.now() - this.sf || ev(this, a)
        }
        ;
        _.l.vh = function(a) {
            var b = _.kd(this.Va);
            if ("undefined" != typeof document.activeElement) {
                if (a = b.activeElement,
                !a || _.wd(this.Va, a) || "BODY" == a.tagName || fv(this, a))
                    return
            } else if (a.target != b)
                return;
            150 > Date.now() - this.sf || ev(this)
        }
        ;
        var fv = function(a, b) {
            return _.hc(a.wg || [], function(c) {
                return b === c || _.wd(c, b)
            })
        };
        dv.prototype.I = function() {
            dv.P.I.call(this);
            this.A.T();
            _.ca(this.Ia);
            _.ca(this.xa);
            delete this.Va;
            delete this.A;
            delete this.wg
        }
        ;
        var gv = function(a) {
            _.G.call(this);
            this.g = a;
            a = _.E ? "focusout" : "blur";
            this.h = _.F(this.g, _.E ? "focusin" : "focus", this, !_.E);
            this.j = _.F(this.g, a, this, !_.E)
        };
        _.A(gv, _.G);
        gv.prototype.handleEvent = function(a) {
            var b = new _.Dd(a.g);
            b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
            this.dispatchEvent(b)
        }
        ;
        gv.prototype.I = function() {
            gv.P.I.call(this);
            _.Yd(this.h);
            _.Yd(this.j);
            delete this.g
        }
        ;
        var hv = function() {};
        hv.prototype.h = function() {}
        ;
        var kv = function(a, b, c, d, e, f, g) {
            var h;
            if (h = c.offsetParent) {
                var k = "HTML" == h.tagName || "BODY" == h.tagName;
                if (!k || "static" != qp(h, "position")) {
                    var m = wp(h);
                    if (!k) {
                        k = Ep(h);
                        var n;
                        if (n = k) {
                            n = _.di && 0 <= Bn(Uu, 10);
                            var p;
                            if (p = _.Ac)
                                p = 0 <= Bn(Su, 10);
                            var q = _.ci && 0 <= Bn(Uu, 85);
                            n = _.rc || n || p || q
                        }
                        k = n ? -h.scrollLeft : k && !_.qc && "visible" != qp(h, "overflowX") ? h.scrollWidth - h.clientWidth - h.scrollLeft : h.scrollLeft;
                        m = Pn(m, new R(k,h.scrollTop))
                    }
                }
            }
            h = m || new R;
            m = wp(a);
            k = Ap(a);
            m = new op(m.x,m.y,k.width,k.height);
            if (k = xp(a))
                q = new op(k.left,k.top,k.right - k.left,k.bottom - k.top),
                k = Math.max(m.left, q.left),
                n = Math.min(m.left + m.width, q.left + q.width),
                k <= n && (p = Math.max(m.top, q.top),
                q = Math.min(m.top + m.height, q.top + q.height),
                p <= q && (m.left = k,
                m.top = p,
                m.width = n - k,
                m.height = q - p));
            k = _.ld(a);
            p = _.ld(c);
            k.g != p.g && (n = k.g.body,
            p = yp(n, _.yd(p)),
            p = Pn(p, wp(n)),
            !_.E || 9 <= Number(_.Jc) || _.pd(k.g) || (p = Pn(p, bn(k.g))),
            m.left += p.x,
            m.top += p.y);
            a = iv(a, b);
            b = m.left;
            a & 4 ? b += m.width : a & 2 && (b += m.width / 2);
            b = new R(b,m.top + (a & 1 ? m.height : 0));
            b = Pn(b, h);
            e && (b.x += (a & 4 ? -1 : 1) * e.x,
            b.y += (a & 1 ? -1 : 1) * e.y);
            var r;
            g && (r = xp(c)) && (r.top -= h.y,
            r.right -= h.x,
            r.bottom -= h.y,
            r.left -= h.x);
            return jv(b, c, d, f, r, g)
        }
          , jv = function(a, b, c, d, e, f) {
            a = Ym(a);
            var g = iv(b, c);
            c = Ap(b);
            var h = new _.ed(c.width,c.height);
            a = Ym(a);
            h = new _.ed(h.width,h.height);
            var k = 0;
            if (d || 0 != g)
                g & 4 ? a.x -= h.width + (d ? d.right : 0) : g & 2 ? a.x -= h.width / 2 : d && (a.x += d.left),
                g & 1 ? a.y -= h.height + (d ? d.bottom : 0) : d && (a.y += d.top);
            f && (e ? (d = h,
            g = 0,
            65 == (f & 65) && (a.x < e.left || a.x >= e.right) && (f &= -2),
            132 == (f & 132) && (a.y < e.top || a.y >= e.bottom) && (f &= -5),
            a.x < e.left && f & 1 && (a.x = e.left,
            g |= 1),
            f & 16 && (k = a.x,
            a.x < e.left && (a.x = e.left,
            g |= 4),
            a.x + d.width > e.right && (d.width = Math.min(e.right - a.x, k + d.width - e.left),
            d.width = Math.max(d.width, 0),
            g |= 4)),
            a.x + d.width > e.right && f & 1 && (a.x = Math.max(e.right - d.width, e.left),
            g |= 1),
            f & 2 && (g |= (a.x < e.left ? 16 : 0) | (a.x + d.width > e.right ? 32 : 0)),
            a.y < e.top && f & 4 && (a.y = e.top,
            g |= 2),
            f & 32 && (k = a.y,
            a.y < e.top && (a.y = e.top,
            g |= 8),
            a.y + d.height > e.bottom && (d.height = Math.min(e.bottom - a.y, k + d.height - e.top),
            d.height = Math.max(d.height, 0),
            g |= 8)),
            a.y + d.height > e.bottom && f & 4 && (a.y = Math.max(e.bottom - d.height, e.top),
            g |= 2),
            f & 8 && (g |= (a.y < e.top ? 64 : 0) | (a.y + d.height > e.bottom ? 128 : 0)),
            e = g) : e = 256,
            k = e);
            e = new op(0,0,0,0);
            e.left = a.x;
            e.top = a.y;
            e.width = h.width;
            e.height = h.height;
            a = k;
            if (a & 496)
                return a;
            sp(b, new R(e.left,e.top));
            h = new _.ed(e.width,e.height);
            _.fd(c, h) || Gp(b, h, "border-box");
            return a
        }
          , iv = function(a, b) {
            return (b & 8 && Ep(a) ? b ^ 4 : b) & -9
        };
        var lv = function(a, b, c) {
            this.element = a;
            this.j = b;
            this.l = c
        };
        _.A(lv, hv);
        lv.prototype.h = function(a, b, c) {
            kv(this.element, this.j, a, b, void 0, c, this.l)
        }
        ;
        var mv = function(a, b) {
            this.g = a instanceof R ? a : new R(a,b)
        };
        _.A(mv, hv);
        mv.prototype.h = function(a, b, c) {
            kv(tp(a), 0, a, b, this.g, c, null)
        }
        ;
        var nv = function(a, b) {
            this.B = b || void 0;
            dv.call(this, a)
        };
        _.A(nv, dv);
        nv.prototype.Bb = function() {
            if (this.B) {
                var a = !this.isVisible() && "move_offscreen" != this.Bc
                  , b = this.C();
                a && (b.style.visibility = "hidden",
                Bp(b, !0));
                this.B.h(b, 8, this.Ej);
                a && Bp(b, !1)
            }
        }
        ;
        var Y = function(a, b, c) {
            this.V = c || (a ? _.ld(S(a)) : _.ld());
            nv.call(this, this.V.U("DIV", {
                style: "position:absolute;display:none;"
            }));
            this.cd = new R(1,1);
            this.F = new _.Cf;
            this.H = null;
            a && this.attach(a);
            null != b && this.hb(b)
        };
        _.A(Y, nv);
        var ov = [];
        _.l = Y.prototype;
        _.l.Ja = null;
        _.l.className = "VIpgJd-suEOdc";
        _.l.Nh = 500;
        _.l.fh = 0;
        _.l.attach = function(a) {
            a = S(a);
            this.F.add(a);
            _.F(a, "mouseover", this.Ge, !1, this);
            _.F(a, "mouseout", this.Ec, !1, this);
            _.F(a, "mousemove", this.Kg, !1, this);
            _.F(a, "focus", this.Od, !1, this);
            _.F(a, "blur", this.Ec, !1, this)
        }
        ;
        var qv = function(a, b) {
            if (b)
                b = S(b),
                pv(a, b),
                a.F.remove(b);
            else {
                for (var c = a.F.Ya(), d = 0; b = c[d]; d++)
                    pv(a, b);
                a = a.F;
                b = a.g;
                b.h = {};
                b.g.length = 0;
                b.size = 0;
                b.j = 0;
                a.size = 0
            }
        }
          , pv = function(a, b) {
            _.Xd(b, "mouseover", a.Ge, !1, a);
            _.Xd(b, "mouseout", a.Ec, !1, a);
            _.Xd(b, "mousemove", a.Kg, !1, a);
            _.Xd(b, "focus", a.Od, !1, a);
            _.Xd(b, "blur", a.Ec, !1, a)
        };
        Y.prototype.hb = function(a) {
            _.xd(this.C(), a)
        }
        ;
        Y.prototype.Tc = function(a) {
            var b = this.C();
            b && $n(b);
            Y.P.Tc.call(this, a);
            a ? (b = this.V.g.body,
            b.insertBefore(a, b.lastChild),
            _.ca(this.H),
            this.H = new gv(this.C()),
            _.hj(this, this.H),
            _.F(this.H, "focusin", this.M, void 0, this),
            _.F(this.H, "focusout", this.Pb, void 0, this)) : (_.ca(this.H),
            this.H = null)
        }
        ;
        Y.prototype.Dd = function() {
            return jo(this.C())
        }
        ;
        var rv = function(a) {
            return a.S ? a.isVisible() ? 4 : 1 : a.ra ? 3 : a.isVisible() ? 2 : 0
        };
        Y.prototype.Fe = function() {
            if (!dv.prototype.Fe.call(this))
                return !1;
            if (this.g)
                for (var a, b = 0; a = ov[b]; b++)
                    _.wd(a.C(), this.g) || a.ga(!1);
            _.ua(ov, this);
            a = this.C();
            a.className = this.className;
            this.M();
            _.F(a, "mouseover", this.ae, !1, this);
            _.F(a, "mouseout", this.Zd, !1, this);
            sv(this);
            return !0
        }
        ;
        Y.prototype.Bf = function() {
            _.va(ov, this);
            for (var a = this.C(), b, c = 0; b = ov[c]; c++)
                b.g && _.wd(a, b.g) && b.ga(!1);
            this.Qg && this.Qg.Pb();
            _.Xd(a, "mouseover", this.ae, !1, this);
            _.Xd(a, "mouseout", this.Zd, !1, this);
            this.g = void 0;
            0 == rv(this) && (this.Ob = !1);
            dv.prototype.Bf.call(this)
        }
        ;
        Y.prototype.xf = function(a, b) {
            this.g == a && _.wf(this.F.g, _.Df(this.g)) && (this.Ob || !this.hn ? (this.ga(!1),
            this.isVisible() || (this.g = a,
            this.B = b || new tv(Ym(this.cd)),
            this.isVisible() && this.Bb(),
            this.ga(!0))) : this.g = void 0);
            this.S = void 0
        }
        ;
        Y.prototype.Lj = function(a) {
            this.ra = void 0;
            if (a == this.g) {
                a = this.V;
                var b = a.g;
                try {
                    var c = b && b.activeElement;
                    var d = c && c.nodeName ? c : null
                } catch (e) {
                    d = null
                }
                d = d && this.C() && a.h(this.C(), d);
                null != this.Ja && (this.Ja == this.C() || _.wf(this.F.g, _.Df(this.Ja))) || d || this.Qd && this.Qd.Ja || this.ga(!1)
            }
        }
        ;
        var uv = function(a, b) {
            var c = bn(a.V.g);
            a.cd.x = b.clientX + c.x;
            a.cd.y = b.clientY + c.y
        };
        Y.prototype.Ge = function(a) {
            var b = vv(this, a.target);
            this.Ja = b;
            this.M();
            b != this.g && (this.g = b,
            wv(this, b),
            xv(this),
            uv(this, a))
        }
        ;
        var vv = function(a, b) {
            try {
                for (; b && !_.wf(a.F.g, _.Df(b)); )
                    b = b.parentNode;
                return b
            } catch (c) {
                return null
            }
        };
        Y.prototype.Kg = function(a) {
            uv(this, a);
            this.Ob = !0
        }
        ;
        Y.prototype.Od = function(a) {
            this.Ja = a = vv(this, a.target);
            this.Ob = !0;
            if (this.g != a) {
                this.g = a;
                var b = new yv(this.Ja);
                this.M();
                wv(this, a, b);
                xv(this)
            }
        }
        ;
        var xv = function(a) {
            if (a.g)
                for (var b, c = 0; b = ov[c]; c++)
                    _.wd(b.C(), a.g) && (b.Qd = a,
                    a.Qg = b)
        };
        Y.prototype.Ec = function(a) {
            var b = vv(this, a.target)
              , c = vv(this, a.relatedTarget);
            b != c && (b == this.Ja && (this.Ja = null),
            sv(this),
            this.Ob = !1,
            !this.isVisible() || a.relatedTarget && _.wd(this.C(), a.relatedTarget) ? this.g = void 0 : this.Pb())
        }
        ;
        Y.prototype.ae = function() {
            var a = this.C();
            this.Ja != a && (this.M(),
            this.Ja = a)
        }
        ;
        Y.prototype.Zd = function(a) {
            var b = this.C();
            this.Ja != b || a.relatedTarget && _.wd(b, a.relatedTarget) || (this.Ja = null,
            this.Pb())
        }
        ;
        var wv = function(a, b, c) {
            a.S || (a.S = _.ah((0,
            _.z)(a.xf, a, b, c), a.Nh))
        }
          , sv = function(a) {
            a.S && (_.t.clearTimeout(a.S),
            a.S = void 0)
        };
        Y.prototype.Pb = function() {
            2 == rv(this) && (this.ra = _.ah((0,
            _.z)(this.Lj, this, this.g), this.fh))
        }
        ;
        Y.prototype.M = function() {
            this.ra && (_.t.clearTimeout(this.ra),
            this.ra = void 0)
        }
        ;
        Y.prototype.I = function() {
            this.ga(!1);
            sv(this);
            qv(this);
            this.C() && $n(this.C());
            this.Ja = null;
            delete this.V;
            Y.P.I.call(this)
        }
        ;
        var tv = function(a, b) {
            mv.call(this, a, b)
        };
        _.A(tv, mv);
        tv.prototype.h = function(a, b, c) {
            b = tp(a);
            b = xp(b);
            c = c ? new np(c.top + 10,c.right,c.bottom,c.left + 10) : new np(10,0,0,10);
            jv(this.g, a, 8, c, b, 9) & 496 && jv(this.g, a, 8, c, b, 5)
        }
        ;
        var yv = function(a) {
            lv.call(this, a, 5)
        };
        _.A(yv, lv);
        yv.prototype.h = function(a, b, c) {
            var d = new R(10,0);
            kv(this.element, this.j, a, b, d, c, 9) & 496 && kv(this.element, 4, a, 1, d, c, 5)
        }
        ;
        var zv = function() {
            Y.call(this);
            this.ba = {};
            this.Cc = {};
            this.G = null;
            this.Pd = !1;
            this.bd = this.h = this.N = null;
            this.qa = {};
            this.s = new _.Og(this);
            this.D = this.j = this.o = this.Qb = this.l = this.Y = this.Da = null;
            this.L = !0;
            this.Rb = []
        };
        _.y(zv, Y);
        _.l = zv.prototype;
        _.l.Oa = function() {
            this.L = !1;
            var a = _.Qf.test(Xp) ? "rtl" : "ltr";
            this.Tc(ul(Xs, {
                kn: "https://www.gstatic.com/images/branding/product/1x/translate_24dp.png",
                mm: "https://www.google.com/images/cleardot.gif",
                gn: gq,
                dir: a,
                Rk: mq
            }));
            this.className += " VIpgJd-yAWNEb-L7lbkb skiptranslate";
            this.C() && this.G && this.Qb && this.o.C() && this.N && this.D && (this.s.J(window, "resize", (0,
            _.z)(this.Bb, this)),
            this.s.J(this, "hide", (0,
            _.z)(this.rk, this)),
            this.Rb.length && (this.sg.apply(this, this.Rb),
            this.Rb = []))
        }
        ;
        _.l.sg = function(a) {
            for (var b = [], c = 0; c < arguments.length; ++c) {
                var d = arguments[c];
                if (d)
                    if (this.G || d.je) {
                        var e = Xn("SPAN", {
                            "class": d.className || "VIpgJd-yAWNEb-Z0Arqf-hSRGPd"
                        });
                        _.xd(e, d.tf || "");
                        b.push(e);
                        Yn(d.je || this.G, e);
                        if (d.qe && d.Oc) {
                            var f = (0,
                            _.z)(this.gj, this, d);
                            this.s.J(e, "click", f);
                            d.ie && this.s.J(this.N, d.ie, f)
                        }
                        d.id = d.id || d.jb();
                        this.ba[d.id] && this.Gh(d);
                        this.ba[d.id] = d;
                        this.Cc[d.id] = e
                    } else
                        this.Rb.push(d)
            }
            return b
        }
        ;
        _.l.Gh = function(a) {
            for (var b = 0; b < arguments.length; ++b) {
                var c = "string" === typeof arguments[b] || arguments[b]instanceof String ? arguments[b] : arguments[b].id
                  , d = this.ba[c]
                  , e = this.Cc[c];
                d && e && (this.h && this.h.id === c && this.Re(),
                this.s.qb(d, ["submitted", "cancelled"]),
                d.T(),
                this.qa[c] && delete this.qa[c],
                delete this.ba[c],
                delete this.Cc[c],
                $n(e))
            }
        }
        ;
        _.l.gj = function(a) {
            if (this.N) {
                a != this.h && this.h && (cv(this.o),
                this.h.Oc.call(this.h),
                this.h.C() && (this.h.C().style.display = "none"),
                Av(this, !1),
                this.h = null);
                Av(this, !0);
                cv(this.o);
                this.h = a;
                if (this.qa[a.id]) {
                    var b = this.qa[a.id];
                    var c = a.Bd
                } else
                    a.Oa(),
                    b = a.C(),
                    c = a.qe,
                    this.s.J(a, ["submitted", "cancelled"], (0,
                    _.z)(this.Re, this)),
                    a.Qe && (this.qa[a.id] = b);
                Yn(this.N, b);
                c.call(a, this);
                a = new Zu(b,100);
                this.s.Xb(a, "finish", (0,
                _.z)(this.Bb, this, !0, !0));
                a.play()
            }
        }
        ;
        _.l.Re = function() {
            if (this.h)
                if (cv(this.o),
                this.h.Oc.call(this.h),
                this.h.C()) {
                    var a = new Yu(this.h.C(),100);
                    this.s.Xb(a, "finish", (0,
                    _.z)(function() {
                        $n(this.h.C());
                        this.h = null;
                        Av(this, !1);
                        jo(this.o.C()) && (bv(this.o),
                        this.Bb(!0, !0))
                    }, this));
                    a.play()
                } else
                    Av(this, !1),
                    this.h = null
        }
        ;
        _.l.xf = function(a, b) {
            this.bd = a;
            Y.prototype.xf.call(this, a, b);
            this.C().style.display = "block"
        }
        ;
        _.l.Ge = function(a) {
            if (!this.L) {
                var b = vv(this, a.target);
                this.Ja = b;
                this.M();
                b != this.g ? (this.g = b,
                wv(this, b),
                xv(this),
                uv(this, a)) : wv(this, b)
            }
        }
        ;
        _.l.rk = function() {
            cv(this.o);
            this.Pd && this.Re()
        }
        ;
        _.l.I = function() {
            for (var a in this.ba)
                this.Gh(a);
            this.s && this.s.T();
            this.s = null;
            this.o && this.o.T();
            this.D = this.Qb = this.bd = this.N = this.G = this.o = null;
            Y.prototype.I.call(this)
        }
        ;
        var Av = function(a, b) {
            a.Pd = b;
            a.L = b;
            if (a.L) {
                var c = a.C();
                a.Da = new R(c.offsetLeft,c.offsetTop)
            } else
                a.Da && (null != (a.B || null) && ((a.B || null).g = a.Da),
                sp(a.C(), a.Da),
                a.Da = null);
            a.G.style.display = b ? "none" : "inline-block";
            a.Qb.style.display = b ? "inline-block" : "none"
        };
        _.l = zv.prototype;
        _.l.wd = function(a) {
            if (this.isVisible()) {
                a = (this.ad = a) ? this.A.J : this.A.qb;
                var b = _.kd(this.C());
                a.call(this.A, b, "mousedown", this.zf, !0)
            } else
                Y.prototype.wd.call(this, a)
        }
        ;
        _.l.Tc = function(a) {
            Y.prototype.Tc.call(this, a);
            if (a) {
                this.G = $m("VIpgJd-yAWNEb-Z0Arqf-PLDbbf", a);
                var b = $m("VIpgJd-yAWNEb-jOfkMb-Ne3sFf", a);
                b && (this.o = new $u,
                et(this.o, b));
                this.Qb = $m("VIpgJd-yAWNEb-fw42Ze-Z0Arqf-haAclf", a);
                this.N = $m("VIpgJd-yAWNEb-Z0Arqf-H9tDt", a);
                this.D = $m("VIpgJd-yAWNEb-nVMfcd-fmcmS", a)
            }
        }
        ;
        _.l.Bb = function(a, b) {
            var c = wp(document.body).y;
            if (this.B) {
                (this.B || null).g.y += c;
                Y.prototype.Bb.call(this);
                var d = parseInt(this.C().style.left, 10);
                a = parseInt(this.C().style.top, 10) - (a ? 0 : c);
                b && (b = this.Ej || {},
                a -= b.top || 10,
                d -= b.left || 10);
                a -= c;
                (this.B || null).g.y = a;
                (this.B || null).g.x = d;
                c = new R(d,a);
                sp(this.C(), c)
            }
        }
        ;
        _.l.ga = function(a) {
            Y.prototype.ga.call(this, a)
        }
        ;
        _.l.ac = function(a) {
            this.l = a
        }
        ;
        _.l.va = function(a) {
            this.j = a
        }
        ;
        _.l.hb = function(a) {
            a = a ? (0,
            _.kc)(a) : "";
            this.D ? _.xd(this.D, a) : Y.prototype.hb.call(this, a)
        }
        ;
        _.l.lb = function() {
            return this.l
        }
        ;
        _.l.ub = function() {
            return this.o
        }
        ;
        _.l.ta = function() {
            return this.j
        }
        ;
        _.l.Dd = function() {
            return this.D ? jo(this.D) : Y.prototype.Dd.call(this)
        }
        ;
        _.l.Ec = function(a) {
            this.L || Y.prototype.Ec.call(this, a)
        }
        ;
        _.l.ae = function(a) {
            this.L || Y.prototype.ae.call(this, a)
        }
        ;
        _.l.Zd = function(a) {
            this.L || Y.prototype.Zd.call(this, a)
        }
        ;
        var Bv = function() {
            this.h = new Map;
            this.g = Ar(Hr)
        }
          , Fv = function(a) {
            var b = S("goog-gt-thumbUpButton")
              , c = a.h
              , d = a.g;
            b.addEventListener("click", function() {
                if (Cv(c) === Dv)
                    Lr(d);
                else {
                    var e = Ir(d, 5);
                    Jr(d, e);
                    Kr(e)
                }
                Ev(c, Dv)
            }, !1)
        }
          , Hv = function(a) {
            var b = S("goog-gt-thumbDownButton")
              , c = a.h
              , d = a.g;
            b.addEventListener("click", function() {
                if (Cv(c) === Gv)
                    Lr(d);
                else {
                    var e = Ir(d, 6);
                    Jr(d, e);
                    Kr(e)
                }
                Ev(c, Gv)
            }, !1)
        }
          , Kv = function(a) {
            var b = S("goog-gt-tt")
              , c = b.dataset
              , d = S("goog-gt-votingInputSrcLang")
              , e = S("goog-gt-votingInputTrgLang")
              , f = S("goog-gt-votingInputSrcText")
              , g = S("goog-gt-votingInputTrgText")
              , h = $m("VIpgJd-yAWNEb-nVMfcd-fmcmS")
              , k = S("goog-gt-translation")
              , m = a.h
              , n = a.g;
            window.document.body.addEventListener("goog-gt-popupShown", function(p) {
                var q = Ir(n, 4);
                Jr(n, q);
                Kr(q);
                p = p.detail;
                q = String(p.Id);
                p = p.Kk;
                c.id = q;
                q = m.get(q) || Iv;
                Jv(q);
                b.style.width = Math.max(Math.min(window.innerWidth - 16, 536), 288) + "px";
                q = p.lb() || "";
                var r = p.ta() || "";
                d.value = q;
                e.value = r;
                f.value = p.Dd();
                g.value = p.Y;
                k && (k.innerText = p.Y);
                b.lang = Xp;
                h.lang = q;
                k && (k.lang = r);
                _.Qf.test(q) && (h.classList.add("rtl"),
                h.dir = "rtl");
                k && _.Qf.test(r) && (k.classList.add("rtl"),
                k.dir = "rtl")
            }, !1)
        }
          , Jv = function(a) {
            var b = S("goog-gt-thumbUpButton")
              , c = S("goog-gt-thumbUpIcon")
              , d = S("goog-gt-thumbUpIconFilled")
              , e = S("goog-gt-thumbDownButton")
              , f = S("goog-gt-thumbDownIcon")
              , g = S("goog-gt-thumbDownIconFilled");
            b.setAttribute("aria-pressed", "false");
            c.style.display = "";
            d.style.display = "none";
            e.setAttribute("aria-pressed", "false");
            f.style.display = "";
            g.style.display = "none";
            switch (a) {
            case Dv:
                b.setAttribute("aria-pressed", "true");
                c.style.display = "none";
                d.style.display = "";
                break;
            case Gv:
                e.setAttribute("aria-pressed", "true"),
                f.style.display = "none",
                g.style.display = ""
            }
            S("goog-gt-votingInputVote").value = a
        }
          , Cv = function(a) {
            var b = S("goog-gt-tt").dataset;
            return a.get(b.id)
        }
          , Ev = function(a, b) {
            Cv(a) === b && (b = Iv);
            Jv(b);
            var c = S("goog-gt-tt").dataset;
            a.set(c.id, b);
            S("goog-gt-votingForm").submit()
        }
          , Iv = (0).toString()
          , Dv = (1).toString()
          , Gv = (2).toString();
        var Lv = {
            set: function(a, b) {
                a.className = b
            },
            get: function(a) {
                a = a.className;
                return "string" === typeof a && a.match(/\S+/g) || []
            },
            add: function(a, b) {
                var c = Lv.get(a)
                  , d = Array.prototype.slice.call(arguments, 1)
                  , e = c.length + d.length;
                Lv.tg(c, d);
                Lv.set(a, c.join(" "));
                return c.length == e
            },
            remove: function(a, b) {
                var c = Lv.get(a)
                  , d = Array.prototype.slice.call(arguments, 1)
                  , e = Lv.Mg(c, d);
                Lv.set(a, e.join(" "));
                return e.length == c.length - d.length
            },
            tg: function(a, b) {
                for (var c = 0; c < b.length; c++)
                    _.ta(a, b[c]) || a.push(b[c])
            },
            Mg: function(a, b) {
                return a.filter(function(c) {
                    return !_.ta(b, c)
                })
            },
            wn: function(a, b, c) {
                for (var d = Lv.get(a), e = !1, f = 0; f < d.length; f++)
                    d[f] == b && (d.splice(f--, 1),
                    e = !0);
                e && (d.push(c),
                Lv.set(a, d.join(" ")));
                return e
            },
            km: function(a, b, c) {
                var d = Lv.get(a);
                "string" === typeof b ? _.va(d, b) : Array.isArray(b) && (d = Lv.Mg(d, b));
                "string" !== typeof c || _.ta(d, c) ? Array.isArray(c) && Lv.tg(d, c) : d.push(c);
                Lv.set(a, d.join(" "))
            },
            has: function(a, b) {
                return _.ta(Lv.get(a), b)
            },
            enable: function(a, b, c) {
                c ? Lv.add(a, b) : Lv.remove(a, b)
            },
            toggle: function(a, b) {
                var c = !Lv.has(a, b);
                Lv.enable(a, b, c);
                return c
            }
        };
        var Mv = function(a, b) {
            Gu.call(this, a);
            b = b || {};
            this.g = {
                apiKey: b.apiKey || "",
                kc: b.kc || 1
            };
            this.h = null
        };
        _.y(Mv, Gu);
        _.l = Mv.prototype;
        _.l.attach = function(a, b) {
            b && (b.Id = a,
            this.h.attach(b))
        }
        ;
        _.l.lg = function(a) {
            a && qv(this.h, a)
        }
        ;
        _.l.di = function() {
            var a = this.h.bd;
            if (a && void 0 !== a.Id) {
                var b = a.Id;
                a = this.o.j[b];
                Hu(this, this.l, !1);
                this.l = b;
                Hu(this, b);
                this.h.ac(a.Fk);
                this.h.va(a.Hk);
                var c = a.fa;
                this.h.Y = c && (0,
                _.kc)(c);
                this.h.hb(a.text)
            }
            b = new CustomEvent("goog-gt-popupShown",{
                detail: {
                    Id: b,
                    Kk: this.h
                }
            });
            window.document.body.dispatchEvent(b)
        }
        ;
        _.l.ci = function() {
            Hu(this, this.l, !1)
        }
        ;
        _.l.pk = function() {
            this.o.j[this.l].Ni.dispatchEvent("updating")
        }
        ;
        _.l.I = function() {
            this.h.T();
            this.h = null;
            Gu.prototype.I.call(this)
        }
        ;
        _.l.gh = function(a, b) {
            Lv[b ? "add" : "remove"](a, "VIpgJd-yAWNEb-VIpgJd-fmcmS-sn54Q")
        }
        ;
        var Nv = function(a) {
            this.s = a;
            this.l = this.h = this.o = this.j = -1;
            this.g = !1;
            this.F = 0;
            this.D = "";
            this.A = 0
        };
        Nv.prototype.start = function() {
            if (!this.g) {
                this.g = !0;
                var a = [], b;
                for (b = 0; 15 > b; b++)
                    a[b] = Br[0 | 62 * Math.random()];
                this.D = a.join("");
                this.F = 0;
                this.l = this.h = this.o = this.j = -1;
                this.A = _.Cb();
                _.ah(this.B, 1E4, this)
            }
        }
        ;
        Nv.prototype.stop = function() {
            this.g && (this.g = !1,
            Ov(this))
        }
        ;
        Nv.prototype.B = function() {
            this.g && (Ov(this),
            _.ah(this.B, 1E3, this))
        }
        ;
        var Ov = function(a) {
            var b = a.s.l
              , c = a.s.s
              , d = a.s.j
              , e = a.s.o;
            if (a.j != b || a.o != c || a.h != d || a.l != e) {
                var f = {};
                f.ct = b;
                f.cv = c;
                f.cts = d;
                f.cvs = e;
                f.sid = a.D;
                f.seq = a.F++;
                f.tat = _.Cb() - a.A;
                if (0 <= a.j || 0 <= a.o || 0 <= a.h || 0 <= a.l)
                    f.pt = a.j,
                    f.pv = a.o,
                    f.pts = a.h,
                    f.pvs = a.l;
                Rm("te_v", f);
                a.j = b;
                a.o = c;
                a.h = d;
                a.l = e
            }
        };
        var Pv = function() {
            this.o = this.j = this.s = this.l = 0;
            this.g = [];
            this.h = null != _.t.IntersectionObserver ? new IntersectionObserver((0,
            _.z)(this.A, this)) : null
        };
        Pv.prototype.attach = function(a, b) {
            this.j += b;
            var c = this.g.length;
            this.g.push(b);
            for (b = 0; b < a.length; ++b) {
                var d = a[b];
                ao(d) ? (d[Qv] = c,
                this.l += jo(d).length,
                this.h && this.h.observe(d)) : this.kh(d.nodeType)
            }
        }
        ;
        Pv.prototype.reset = function() {
            this.o = this.j = this.s = this.l = 0;
            this.g = []
        }
        ;
        Pv.prototype.A = function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                if (0 < c.intersectionRatio && null != c.target[Qv]) {
                    this.s += jo(c.target).length;
                    var d = c.target[Qv];
                    this.o += this.g[d];
                    this.g[d] = 0;
                    delete c.target[Qv]
                }
            }
        }
        ;
        gs.attach(36546, Pv.prototype, {
            kh: 1
        });
        var Qv = "_gt_" + Math.random().toString(36).substr(2);
        var Rv = function(a, b) {
            _.B.call(this);
            a = a || {};
            this.g = $k(a);
            this.g.kc = a.kc;
            this.g.Uf = !!a.Uf;
            this.g.Fi = parseInt(a.Fi, 10) || 300;
            this.g.vk = a.vk;
            this.g.trackVisibility = a.trackVisibility || !1;
            this.A = 0;
            this.j = {};
            this.s = new _.Og(this);
            this.l = new Mv(this,this.g);
            b && (this.l.s = b || {});
            a = this.l;
            a.h = new zv({
                Ek: a.g.Ek
            });
            a.h.fh = 300;
            a.h.Nh = 1E3;
            a.h.wd(!0);
            a.j.J(a.h, "show", (0,
            _.z)(a.di, a));
            a.j.J(a.h, "hide", (0,
            _.z)(a.ci, a));
            a.g.kc && "te_cl" != cq && (b = new Fu({
                id: "contribute",
                tf: U.Yh,
                ie: "dblclick",
                Qe: !0
            },a.s),
            a.h.sg(b),
            a.j.J(b, "submitted", (0,
            _.z)(a.pk, a)));
            a.h.Oa();
            a = new Bv;
            S("goog-gt-thumbUpButton") && (Fv(a),
            Hv(a),
            Kv(a));
            this.o = this.h = null;
            this.g.trackVisibility && null != _.t.IntersectionObserver && (this.h = new Pv,
            this.o = new Nv(this.h))
        };
        _.y(Rv, _.B);
        var Sv = function(a) {
            a.o && a.o.stop();
            for (var b in a.j) {
                var c = a
                  , d = b
                  , e = c.j[d];
                if (e) {
                    if (c.h)
                        for (var f = c.h, g = e.Na, h = 0; h < g.length; ++h) {
                            var k = f
                              , m = g[h];
                            ao(m) ? (m[Qv] = void 0,
                            k.h && k.h.unobserve(m)) : k.kh(m.nodeType)
                        }
                    for (f = 0; f < e.Na.length; ++f)
                        e.Na[f] && c.l.lg(e.Na[f]);
                    delete c.j[d]
                }
            }
            a.h && a.h.reset()
        };
        Rv.prototype.I = function() {
            Sv(this);
            this.s.T();
            this.s = null;
            this.l.T();
            this.l = null
        }
        ;
        var Tv = function(a) {
            for (var b = 0; b < a.length; ++b)
                if (a[b] && a[b].node)
                    return a[b].node;
            return null
        }, Xv = function(a) {
            var b = Tv(a);
            if (!b)
                return null;
            var c = []
              , d = []
              , e = [];
            b = new Is(b,!0);
            var f = a[a.length - 1].node
              , g = 0
              , h = !1;
            do {
                b.next();
                var k = b.node();
                if (!k)
                    break;
                var m = b.g.g
                  , n = b.depth();
                for (1 == m && --n; g < a.length && !a[g].node; )
                    ++g;
                k == a[g].node || !h && 1 == m && (null != k && null == k.previousSibling ? 0 : !Uv(Vv(k))) ? (m = Wv(k),
                d.push({
                    node: m,
                    hb: function() {}
                }),
                e[d.length - 1] = n,
                k.parentNode && k.parentNode.insertBefore(m, k),
                k == a[g].node && (c[g++] = d.length - 1,
                h = !0)) : h = !1
            } while (k != f);
            return {
                dg: e,
                sk: c,
                Fj: d
            }
        }, Uv = function(a) {
            return null != a && Cs[a.tagName]
        }, Vv = function(a) {
            if (null == a)
                return null;
            for (a = a.previousSibling; null != a && null != a && 3 == a.nodeType && "" == (0,
            _.kc)(jo(a)); )
                a = a.previousSibling;
            return a
        }, $v = function(a, b, c, d, e, f) {
            _.G.call(this);
            this.g = [];
            for (var g = 0; g < a.length; ++g)
                this.g.push("nodeType"in a[g] ? Yv(a[g]) : a[g]),
                Zv(a[g].node);
            this.j = b;
            this.H = d || 0;
            this.S = e || 0;
            this.B = c;
            this.A = f || null;
            this.G = this.D = this.N = !1;
            this.o = [];
            this.s = [];
            this.h = [];
            this.M = [];
            new _.Og(this);
            this.l = this.L = !1
        }, Yv;
        _.y($v, _.G);
        var cw = function(a) {
            if (!a)
                return !1;
            if (3 != a.nodeType || !_.E)
                return aw in a && !!a[aw];
            if (!a.parentNode)
                return !0;
            if (!(bw in a.parentNode))
                return !1;
            var b = a.parentNode[bw];
            if (!b || !b[a.nodeValue])
                return !1;
            b = b[a.nodeValue];
            for (var c = 0; c < b.length; ++c)
                if (b[c] == a)
                    return !0;
            return !1
        }
          , dw = function(a, b) {
            if (!a)
                return "";
            if ("TITLE" == a.tagName)
                return String(document.title);
            3 == a.nodeType ? b = "nodeValue" : b || (b = "value");
            return a.getAttribute && a.getAttribute(b) ? String(a.getAttribute(b)) : "string" === typeof a[b] ? String(a[b]) : ""
        };
        $v.prototype.na = function() {
            return this.j
        }
        ;
        var ew = function(a, b, c) {
            b = {
                zh: b,
                Cf: c,
                ia: []
            };
            a.h.push(b);
            return b
        }
          , gw = function(a) {
            if (!a.l && a.N && !a.D && !a.G) {
                a.D = !0;
                var b;
                if (b = fw(a.g)) {
                    b = a.g;
                    var c = a.h;
                    if (1 == b.length && b[0] && b[0].bg) {
                        for (var d = [], e = 0; e < c.length; ++e)
                            for (var f = 0; f < c[e].ia.length; ++f)
                                d.push(c[e].ia[f].fa);
                        b[0].hb(d.join(" "), b[0].node);
                        b = !0
                    } else
                        b = !1;
                    b = !b
                }
                if (b && (b = Xv(a.g))) {
                    a.s = b.sk;
                    a.o = b.Fj;
                    d = a.g;
                    e = a.s;
                    f = a.o;
                    var g = b.dg;
                    c = [];
                    for (var h = 0; h < d.length; ++h)
                        if (c[h] = [],
                        d[h].node && void 0 !== e[h])
                            for (var k = 0; k < f.length; ++k)
                                if (!(g[k] > g[e[h]])) {
                                    if (g[k] == g[e[h]]) {
                                        if (f[k].node.parentNode != f[e[h]].node.parentNode)
                                            continue
                                    } else {
                                        for (var m = g[e[h]] - g[k], n = f[e[h]].node.parentNode; m-- && n && n != f[k].node.parentNode; )
                                            n = n.parentNode;
                                        if (n != f[k].node.parentNode)
                                            continue
                                    }
                                    c[h].push(k)
                                }
                    d = a.g;
                    e = a.h;
                    f = -1;
                    for (g = e.length - 1; 0 <= g; --g)
                        for (h = e[g],
                        k = h.ia.length - 1; 0 <= k; --k)
                            if (m = h.ia[k],
                            !(0 > m.da) && d[m.da] && d[m.da].node)
                                if (0 > f)
                                    m.ee = Mr(c[m.da]),
                                    f = c[m.da][c[m.da].length - 1];
                                else
                                    for (n = c[m.da].length - 1; 0 <= n; --n)
                                        if (c[m.da][n] <= f) {
                                            m.ee = Mr(c[m.da].slice(0, n + 1));
                                            f = c[m.da][n];
                                            break
                                        }
                    for (c = e = 0; c < a.h.length; ++c) {
                        d = a.h[c];
                        f = a.g;
                        g = b.dg;
                        h = a.s;
                        k = "";
                        for (m = 0; m < d.ia.length; ++m)
                            if (n = d.ia[m],
                            k += n.fa,
                            0 > n.da) {
                                var p = -1
                                  , q = -1
                                  , r = h[d.ia[m - 1].da];
                                void 0 !== r && (p = g[r]);
                                m < d.ia.length - 1 && (r = h[d.ia[m + 1].da],
                                void 0 !== r && (q = g[r]));
                                if (0 <= p || 0 <= q)
                                    a: if (q = (0 > p || q < p) && m < d.ia.length - 1,
                                    p = d.ia[q ? m + 1 : m - 1],
                                    !(p.da >= f.length || null == f[p.da].node)) {
                                        r = n.fa;
                                        n.fa = "";
                                        if (/^ +$/.test(r) && (n = q ? p.fa.charCodeAt(0) : p.fa.charCodeAt(p.fa.length - 1),
                                        3584 <= n && 3711 >= n || 12288 <= n && 12351 >= n || 12352 <= n && 12543 >= n || 12784 <= n && 12799 >= n || 19968 <= n && 40959 >= n || 65280 <= n && 65519 >= n))
                                            break a;
                                        p.fa = q ? r + p.fa : p.fa + r
                                    }
                            }
                        f = k;
                        g = a.g;
                        h = a.o;
                        k = b.dg;
                        m = a.s;
                        n = [];
                        for (p = 0; p < d.ia.length && !(e >= h.length); ++p)
                            if (q = d.ia[p],
                            q.ee && !(0 > q.da) && g[q.da].node && q.fa)
                                if (e == m[q.da] || e in q.ee && (!(e + 1 in q.ee) || e + 1 != m[q.da])) {
                                    if (h[e] && h[e].node) {
                                        r = Wv(h[e].node);
                                        n.push(r);
                                        for (var w = h[e].node, D = k[m[q.da]] - k[e], Q = r, W = g[q.da].node.parentNode, ha = Q; W && D--; )
                                            ha = W.cloneNode(!1),
                                            ha.appendChild(Q),
                                            W = W.parentNode,
                                            Q = ha;
                                        w.appendChild(ha);
                                        w = g[q.da].node;
                                        g[q.da].Ae ? g[q.da].hh || r.appendChild(w) : (w = g[q.da].node.cloneNode(!1),
                                        w.id && (w.id = ""),
                                        r.appendChild(w));
                                        g[q.da].hb(q.fa, w)
                                    }
                                } else
                                    ++e,
                                    --p;
                        g = n;
                        n = a.g;
                        h = a.B;
                        if (d.zh)
                            h = d.zh;
                        else {
                            m = n.length;
                            k = -1;
                            for (p = 0; p < d.ia.length; ++p)
                                q = d.ia[p].da,
                                0 <= q && n[q] && n[q].node && (k = Math.max(k, q),
                                m = Math.min(m, q));
                            for (n = ""; m <= k; ++m)
                                h[m] && (n += h[m]);
                            h = n
                        }
                        m = g;
                        n = h;
                        if (a.A) {
                            if (3 != a.A.g.kc) {
                                g = a.M;
                                h = g.push;
                                k = a.A;
                                d = d.Cf;
                                p = a;
                                d = k.j[++k.A] = {
                                    id: k.A.toString(),
                                    Ni: p,
                                    text: n,
                                    un: d || n,
                                    fa: f,
                                    Fk: k.B,
                                    Hk: k.F,
                                    Na: m
                                };
                                for (f = 0; f < m.length; ++f)
                                    m[f] && k.l.attach(d.id, m[f]);
                                k.h && k.h.attach(m, n.length);
                                k.o && k.o.start();
                                h.call(g, d.id)
                            }
                        } else
                            for (d = 0; d < m.length; ++d)
                                m[d].title = n
                    }
                    b = a.g;
                    for (c = 0; c < b.length; ++c)
                        b[c].node && !b[c].Ae && $n(b[c].node);
                    b = a.g;
                    c = a.o;
                    a = a.s;
                    for (e = d = 0; e < c.length; ++e)
                        if (f = c[e].node) {
                            for (; d < b.length && e > a[d]; )
                                d++;
                            (d >= b.length || e != a[d]) && !f.firstChild && ($n(f),
                            c[e].node = null)
                        }
                }
            }
        };
        $v.prototype.restore = function() {
            if (this.D)
                if (this.D = !1,
                this.A && Sv(this.A),
                this.M = [],
                fw(this.o),
                1 == this.g.length && this.g[0].bg)
                    this.g[0].hb(this.B[0], this.g[0].node);
                else {
                    for (var a = 0, b = 0; b < this.o.length; ++b) {
                        var c = this.o[b].node;
                        if (c) {
                            for (; a < this.g.length && b > this.s[a]; ) {
                                var d = a++;
                                this.g[d].node && (hw(this.g[d].node),
                                this.g[d].node = null)
                            }
                            if (a < this.g.length && b == this.s[a] && this.g[a].node) {
                                this.g[a].hh || (_.vd(c),
                                c.appendChild(this.g[a].node));
                                this.g[a].hb(this.B[a], this.g[a].node);
                                a++;
                                var e = c.parentNode;
                                if (e && 11 != e.nodeType)
                                    if (c.removeNode)
                                        c.removeNode(!1);
                                    else {
                                        for (; d = c.firstChild; )
                                            e.insertBefore(d, c);
                                        $n(c)
                                    }
                            } else
                                $n(c)
                        }
                    }
                    this.o = []
                }
        }
        ;
        $v.prototype.I = function() {
            _.G.prototype.I.call(this);
            this.restore();
            for (var a = 0; a < this.g.length; ++a)
                this.g[a].node && hw(this.g[a].node);
            this.g = null
        }
        ;
        var Zv = function(a) {
            if (a)
                if (3 == a.nodeType && _.E) {
                    bw in a.parentNode && a.parentNode[bw] || (a.parentNode[bw] = {});
                    var b = a.parentNode[bw];
                    b[a.nodeValue] || (b[a.nodeValue] = []);
                    b = b[a.nodeValue];
                    for (var c = 0; c < b.length; ++c)
                        if (b[c] == a)
                            return;
                    b.push(a)
                } else
                    a[aw] = 1
        }
          , hw = function(a) {
            if (!a || 3 == a.nodeType && _.E) {
                var b = a.parentNode;
                if (b && bw in b) {
                    var c = b[bw];
                    if (c && a && c[a.nodeValue]) {
                        var d = c[a.nodeValue];
                        if (d)
                            for (var e = 0; e < d.length; ++e)
                                if (d[e] == a) {
                                    d.splice(e, 1);
                                    break
                                }
                        0 == d.length && delete c[a.nodeValue]
                    }
                    if (c && $r(c))
                        try {
                            delete b[bw]
                        } catch (f) {
                            b[bw] = ""
                        }
                }
            } else if (aw in a)
                try {
                    delete a[aw]
                } catch (f) {
                    a[aw] = ""
                }
        }
          , fw = function(a) {
            for (var b = 0; b < a.length; ++b)
                try {
                    a[b].node && !a[b].node.parentNode && (a[b].node = null)
                } catch (c) {
                    a[b].node = null
                }
            for (b = a.length - 1; 0 <= b && !a[b].node; --b)
                ;
            a.length = b + 1;
            return a.length
        }
          , Wv = function(a) {
            a = a.ownerDocument ? a.ownerDocument.createElement("font") : _.sd(document, "font");
            Zv(a);
            a.style.verticalAlign = "inherit";
            return a
        }
          , iw = function(a) {
            for (var b = new Set, c = 0; c < a.g.length; c++) {
                var d = a.g[c].node;
                null != d && b.add(d)
            }
            return b
        }
          , jw = function() {
            this.h = {};
            this.g = {}
        };
        jw.prototype.has = function(a, b) {
            return null != this.h[a] || null != this.g[a] || b && (a in this.h || a in this.g)
        }
        ;
        jw.prototype.write = function(a, b) {
            this.g[a] = b
        }
        ;
        jw.prototype.remove = function(a) {
            delete this.g[a];
            delete this.h[a]
        }
        ;
        jw.prototype.Ib = function() {
            return $r(this.h)
        }
        ;
        var aw = "_gt_" + Math.random().toString(36).substr(2)
          , bw = "_gtn_" + Math.random().toString(36).substr(2);
        (function() {
            function a(c) {
                document.title = c
            }
            var b = {};
            Yv = function(c, d) {
                if ("TITLE" == c.tagName)
                    return {
                        node: c,
                        hb: a,
                        Ae: !0,
                        hh: !0,
                        bg: !0
                    };
                if (3 == c.nodeType)
                    return {
                        node: c,
                        hb: function(e, f) {
                            _.xd(f, e)
                        }
                    };
                d || (d = "value");
                b[d] || (b[d] = function(e, f) {
                    f.setAttribute && f.setAttribute(d, e);
                    "string" === typeof e && (f[d] = e)
                }
                );
                c = {
                    node: c,
                    hb: b[d],
                    Ae: !0
                };
                "value" != d && (c.bg = !0);
                return c
            }
        }
        )();
        var kw = function(a, b, c, d) {
            d = d.firstChild && 3 == d.firstChild.nodeType ? d.firstChild.nodeValue : jo(d);
            d = {
                da: c,
                fa: Wn(d)
            };
            a.push(d);
            b[c] ? b[c].end = d : b[c] = {
                start: d,
                end: d
            };
            return d
        }
          , lw = function(a) {
            for (var b, c = a.firstChild; c; c = b)
                b = c.nextSibling,
                3 != c.nodeType && (c == a.firstChild ? a.parentNode && a.parentNode.insertBefore(c, a) : Zn(c, a),
                lw(c))
        };
        var mw = function() {
            this.g = []
        };
        mw.prototype.add = function(a) {
            this.g.push(a)
        }
        ;
        var nw = function() {
            this.g = []
        };
        _.y(nw, mw);
        nw.prototype.add = function(a) {
            if (a)
                for (; a(); )
                    ;
        }
        ;
        nw.Vb = function() {
            return Ar(nw)
        }
        ;
        var pw = function(a) {
            this.g = [];
            this.h = .5;
            ow(this, a);
            this.l = 0;
            this.j = !0;
            this.o = (0,
            _.z)(this.s, this)
        };
        _.y(pw, mw);
        var ow = function(a, b) {
            1 < b ? a.h = 1 : .001 > b ? a.h = .001 : b && (a.h = b)
        };
        pw.prototype.add = function(a) {
            mw.prototype.add.call(this, a);
            this.j && qw(this)
        }
        ;
        var qw = function(a) {
            a.j = !1;
            window.setTimeout(a.o, Math.min(a.l, 5E3))
        };
        pw.prototype.s = function() {
            var a = (new Date).getTime();
            do {
                this.g.length && (this.g[0] && this.g[0]() || this.g.shift());
                var b = !!this.g.length;
                var c = 95 * this.h + 5;
                var d = (new Date).getTime() - a
            } while (b && d < c);
            this.l = Math.ceil(d * (1 / this.h - 1)) + 1;
            b ? qw(this) : this.j = !0
        }
        ;
        var rw = function(a, b) {
            this.F = a || null;
            this.L = b || nw.Vb();
            this.A = this.s = this.H = null;
            this.l = this.j = !1;
            this.o = null;
            this.g = [];
            this.h = 0
        }
          , sw = function(a, b) {
            a.j || (a.H = b)
        }
          , tw = function(a, b, c) {
            a.s = c ? (0,
            _.z)(b, c) : b
        }
          , uw = function(a, b, c) {
            a.A = c ? (0,
            _.z)(b, c) : b
        }
          , vw = function(a, b) {
            a.j || (a.j = !0,
            a.D = b,
            a.h++,
            a.o = a.H,
            a.B())
        };
        rw.prototype.stop = function() {
            this.h++;
            this.j = !1;
            this.g = []
        }
        ;
        var ww = function(a) {
            if (!a.j)
                return null;
            for (var b = !1, c = 0; c < a.g.length; ++c)
                if (a.g[c].target === a) {
                    a.g[c].ready = !1;
                    a.g[c].Uh = a.h + 1;
                    b = !0;
                    break
                }
            b || a.g.push({
                target: a,
                ready: !1,
                Uh: a.h + 1
            });
            return (0,
            _.z)(a.B, a, a, a.h + 1)
        }
          , xw = function(a) {
            if (!a.j)
                return !0;
            for (var b = 0; b < a.g.length; ++b)
                if (a.g[b].target === a && a.g[b].Uh == a.h)
                    return a.g[b].ready;
            return !0
        };
        rw.prototype.B = function(a, b) {
            if (this.j) {
                if (a)
                    for (var c = 0; c < this.g.length; ++c)
                        if (this.g[c].target === a) {
                            this.g[c].ready = !0;
                            break
                        }
                this.l || this.L.add((0,
                _.z)(this.G, this, b || this.h))
            }
        }
        ;
        rw.prototype.G = function(a) {
            if (this.h != a)
                return !1;
            a = this.o;
            if (a == yw)
                return this.stop(),
                this.s && this.s.call(this.F, this, this.D),
                !1;
            this.l = !0;
            try {
                var b = a.call(this.F, this, this.D);
                if (!b)
                    throw Error();
            } catch (c) {
                this.stop();
                a = c;
                if (this.A)
                    this.A.call(this.F, a, this, this.D);
                else
                    throw a;
                return !1
            } finally {
                this.l = !1
            }
            b != zw && (this.o = b,
            this.h++,
            this.B());
            return !1
        }
        ;
        var zw = function() {}
          , yw = function() {};
        var Bw = function(a, b, c, d, e) {
            b = b || {};
            this.G = e || [];
            this.s = [];
            this.D = [];
            Aw(this, a || document.documentElement, void 0 === b.Ih || !!b.Ih);
            this.B = c || $v;
            this.F = b.Nj;
            this.j = this.g = this.o = this.kd = null;
            this.A = !!b.Qk;
            this.ha = !!b.Mk;
            this.N = this.A ? 27 : 13;
            this.L = !0;
            this.H = [];
            this.l = new rw(this,d)
        }
          , Cw = function(a, b, c, d) {
            a.l.j || (b = {
                Sh: b,
                Oh: c,
                Na: [],
                Ah: [],
                hc: [],
                textLength: 0,
                size: 0,
                continuous: !0
            },
            a.kd = null,
            sw(a.l, a.h),
            tw(a.l, d),
            uw(a.l, (0,
            _.z)(function(e) {
                this.Uj(e);
                d()
            }, a)),
            vw(a.l, b))
        }
          , Dw = function(a, b) {
            return 0 < a.Na.length ? new b(a.Na,a.hc.join(""),a.Ah,a.textLength,a.size) : null
        }
          , Ew = function(a, b) {
            if (!a.j)
                return a.kd = Dw(b, a.B),
                !0;
            if (!b.continuous && 0 < b.Na.length)
                return a.kd = Dw(b, a.B),
                !0;
            b.continuous = a.j.sh;
            a: {
                var c = a.j;
                var d = a.N;
                if (b.size > b.Oh || b.textLength > b.Sh)
                    c = !1;
                else {
                    var e = c.size
                      , f = c.text.length;
                    if (0 != b.Na.length && (e += 1 == b.Na.length ? b.size + d + d : b.size + d,
                    f += b.textLength,
                    e > b.Oh || f > b.Sh)) {
                        c = !1;
                        break a
                    }
                    b.size = e;
                    b.textLength = f;
                    b.Na.push(c.node);
                    b.Ah.push(c.text);
                    d = b.Na.length - 1;
                    0 == d ? b.hc.push(c.Ze) : (1 == d && (b.hc[0] = "<a i=0>" + b.hc[0] + "</a>"),
                    b.hc.push("<a i=" + d + ">"),
                    b.hc.push(c.Ze),
                    b.hc.push("</a>"));
                    c = !0
                }
            }
            if (c)
                return a.j = null,
                !1;
            a.kd = Dw(b, a.B);
            return !0
        }
          , Fw = function(a, b, c) {
            var d = dw(b, c);
            d && (0,
            _.kc)(Qn(d)) && a.H.push({
                node: b,
                Bi: c,
                text: d
            })
        };
        Bw.prototype.h = function(a, b) {
            var c = this;
            if (this.j && Ew(this, b))
                return yw;
            if (!this.g) {
                this.L = !!this.s.length;
                if (!this.s.length && (a = this.H.shift()))
                    return this.j = {
                        sh: !1,
                        node: Yv(a.node, a.Bi),
                        text: a.text,
                        Ze: Sn(a.text),
                        size: this.A ? _.gd(a.text).length : a.text.length
                    },
                    b.continuous = !1,
                    Ew(this, b),
                    yw;
                a = this.s.shift() || this.D.shift();
                if (!a)
                    return this.j = null,
                    Ew(this, b),
                    yw;
                this.o = [a.Lk];
                this.g = new Is(a.root)
            }
            this.g.next();
            if (this.g.done)
                return this.g = null,
                b.continuous = !1,
                this.h;
            a = this.g.node();
            var d = this.g.g.g;
            if (-1 == d)
                return Gw(this),
                Hw(a) || (b.continuous = !1),
                this.h;
            Iw(this, a);
            d = 1 == d;
            var e = !!a && (3 == a.nodeType && "string" === typeof a.nodeValue || "TITLE" == a.tagName && "string" === typeof a.value || "TEXTAREA" == a.tagName && Ht(a, "translate") || "INPUT" == a.tagName && (Ds[a.type] || Ht(a, "translate")));
            if ((e || d) && this.L && !Jw(a))
                return Aw(this, a, Kw(this), !0),
                Gs(this.g.g),
                Gw(this),
                this.h;
            if (d && Kw(this) && (this.ha && Fw(this, a, "title"),
            Fw(this, a, "alt"),
            Fw(this, a, "placeholder"),
            Fw(this, a, "aria-label"),
            Fw(this, a, "aria-placeholder"),
            Fw(this, a, "aria-roledescription"),
            Fw(this, a, "aria-valuetext"),
            Js(this.g)))
                for (var f = a.firstChild; f; ) {
                    if (3 == f.nodeType) {
                        var g = f.nodeValue.split("\n");
                        if (2 < g.length || 2 == g.length && "" != (0,
                        _.kc)(g[0]) && "" != (0,
                        _.kc)(g[1])) {
                            f.nodeValue = g[0];
                            for (var h = 1; h < g.length; ++h) {
                                var k = _.kd(a).createElement("font");
                                this.G.push(k);
                                Zn(k, f);
                                f = k;
                                Zn(_.kd(a).createTextNode("\n" + g[h]), f);
                                f = f.nextSibling
                            }
                        }
                    }
                    f = f.nextSibling
                }
            a.shadowRoot && Array.from(a.shadowRoot.childNodes).forEach(function(n) {
                Aw(c, n, Kw(c))
            });
            if (e) {
                Gs(this.g.g);
                if (Kw(this)) {
                    var m = dw(a);
                    if ((0,
                    _.kc)(Qn(m)) && (this.j = {
                        sh: !0,
                        node: Yv(a),
                        text: m,
                        Ze: Sn(m),
                        size: this.A ? _.gd(m).length : m.length
                    },
                    Ew(this, b)))
                        return Gw(this),
                        yw
                }
                Gw(this);
                return this.h
            }
            if (d) {
                if (Lw(a) || !a.firstChild && "IFRAME" != a.tagName)
                    return b.continuous = b.continuous && !!Cs[a.tagName],
                    Gs(this.g.g),
                    Gw(this),
                    this.h;
                if ("IFRAME" == a.tagName) {
                    try {
                        a.src.match(/https?:\/\//) && _.Sf(a.src.match(_.Rf)[3] || null) != window.location.hostname || (m = bo(a).documentElement) && Aw(this, m, Kw(this))
                    } catch (n) {}
                    b.continuous = !1;
                    Gs(this.g.g);
                    Gw(this);
                    return this.h
                }
                Kw(this) && Hw(a) ? this.F && "A" == a.tagName && a.href && this.F(a) : b.continuous = !1;
                return this.h
            }
            Gs(this.g.g);
            Gw(this);
            return this.h
        }
        ;
        var Lw = function(a) {
            return cw(a) || 3 != a.nodeType && (!a.tagName || Bs[a.tagName] || Cs[a.tagName] || Ht(a, "skiptranslate"))
        }
          , Mw = function(a) {
            var b = _.kd(a);
            return b.defaultView && b.defaultView.getComputedStyle ? b.defaultView.getComputedStyle(a, null) : a.currentStyle
        }
          , Jw = function(a) {
            return 3 == a.nodeType ? !0 : 1 != a.nodeType ? !1 : a.offsetWidth && a.offsetHeight ? !0 : (a = Mw(a),
            !!a && "none" != a.display && "hidden" != a.visibility)
        }
          , Hw = function(a) {
            if (3 == a.nodeType)
                return !0;
            if (1 != a.nodeType)
                return !1;
            var b = Mw(a);
            return !!As[a.tagName] && (!b || !b.display || "inline" == b.display)
        }
          , Aw = function(a, b, c, d) {
            (d ? a.D : a.s).push({
                root: b,
                Lk: void 0 === c || c
            })
        }
          , Kw = function(a) {
            return a.o[a.o.length - 1]
        }
          , Iw = function(a, b) {
            b = !cw(b) && (b.nodeType == rn && Kw(a) || !(Ht(b, "notranslate") || b.attributes && b.attributes.translate && "no" == b.attributes.translate.value) && (Ht(b, "translate") || !!b.attributes && !!b.attributes.translate && "yes" == b.attributes.translate.value || Kw(a)));
            a.o.push(b)
        }
          , Gw = function(a) {
            a.o.pop()
        };
        gs.attach(5762, Bw.prototype, {
            Uj: 1
        });
        var Nw = function() {
            _.B.call(this);
            this.g = []
        };
        _.y(Nw, _.B);
        Nw.prototype.restore = function() {
            _.ah(this.h, 0, this)
        }
        ;
        Nw.prototype.h = function() {
            for (var a = 0; a < this.g.length; ++a)
                $n(this.g[a]);
            this.g = []
        }
        ;
        Nw.prototype.I = function() {
            _.B.prototype.I.call(this);
            this.restore()
        }
        ;
        var Ow = function(a) {
            var b = new Set;
            a.forEach(function(c) {
                if (ao(c))
                    b.add(c);
                else {
                    a: {
                        var d;
                        if (_.Kc && (d = c.parentElement)) {
                            c = d;
                            break a
                        }
                        d = c.parentNode;
                        c = ao(d) ? d : null
                    }
                    null != c && b.add(c)
                }
            });
            return b
        };
        var Pw = function(a) {
            this.h = !0;
            this.l = a;
            this.j = !1;
            this.g = []
        };
        Pw.prototype.na = function() {
            return this.g.join("")
        }
        ;
        var Qw = function(a, b) {
            this.o = a;
            this.l = !0;
            this.j = b;
            this.g = null;
            this.h = 0
        }
          , Rw = function(a, b) {
            return a.l ? (b((0,
            _.z)(a.s, a), a.o, a.j ? "en" : ""),
            !0) : !1
        };
        Qw.prototype.s = function(a, b, c) {
            this.g = b;
            this.h = c;
            a()
        }
        ;
        var Sw = function(a, b) {
            this.l = a;
            this.F = !!b;
            this.g = this.B = 0;
            this.o = this.j = -1;
            this.s = this.A = this.h = 0
        }
          , Vw = function(a, b, c) {
            a.F && (b -= 9);
            for (var d = "", e = 0, f = a.B; f < a.l.length; ++f) {
                var g = a.l.charAt(f)
                  , h = g.charCodeAt(0);
                e++;
                a.h += a.F ? 127 >= h ? 32 >= h || Tw[h] ? 3 : 1 : 2047 >= h || 55296 <= h && 56319 >= h || 56320 <= h && 57343 >= h ? 6 : 9 : 1;
                h = a.h >= b;
                Uw[g] ? (a.o = f,
                a.A = a.h,
                h = h || e > c) : " " == g && (a.j = f,
                a.s = a.h,
                h = h || e > c);
                if (h)
                    return 0 <= a.o ? (d = a.l.substring(a.g, a.o + 1),
                    a.h -= a.A,
                    a.g = a.o + 1,
                    a.o >= a.j ? (a.j = -1,
                    a.s = 0) : a.s -= a.A,
                    a.o = -1,
                    a.A = 0) : 0 <= a.j ? (d = a.l.substring(a.g, a.j + 1),
                    a.h -= a.s,
                    a.g = a.j + 1,
                    a.j = -1,
                    a.s = 0) : (d = a.l.substring(a.g, f + 1),
                    a.h = 0,
                    a.g = f + 1,
                    a.o = a.j = -1,
                    a.s = a.A = 0),
                    a.B = f + 1,
                    d
            }
            a.g < a.l.length && (d = a.l.substring(a.g),
            a.g = a.l.length);
            return d
        }
          , Uw = Mr([".", ",", ":", "\\?", "!"])
          , Tw = Mr([34, 35, 36, 37, 38, 43, 44, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 96, 123, 124, 125, 127]);
        var Ww = function(a) {
            this.O = _.H(a)
        };
        _.y(Ww, _.J);
        Ww.prototype.lb = function() {
            return _.Xi(this, 2)
        }
        ;
        Ww.prototype.ac = function(a) {
            return _.Li(this, 2, wl(a), "")
        }
        ;
        Ww.prototype.ta = function() {
            return _.Xi(this, 3)
        }
        ;
        Ww.prototype.va = function(a) {
            return _.Li(this, 3, wl(a), "")
        }
        ;
        Ww.pb = [1];
        var Xw = function(a, b, c, d, e, f) {
            this.A = d || function() {}
            ;
            this.Y = f || function() {}
            ;
            this.S = !!e;
            this.j = a.g.ph;
            this.l = 0;
            this.L = function() {}
            ;
            this.F = c;
            this.D = this.h = this.o = 0;
            this.g = null;
            this.G = 0;
            this.qa = !1;
            this.V = a.g.nh;
            this.N = [];
            this.ba = 0;
            this.ha = a.g.We;
            this.s = ys(a);
            this.xa = this.S ? 1 : 6;
            this.Da = a.g.Jh;
            this.M = b;
            this.B = [];
            this.Ca = a
        }
          , Yw = function(a, b) {
            var c = 0;
            a.L = (0,
            _.z)(function() {
                ++c == this.B.length && b()
            }, a)
        }
          , Zw = function(a, b, c) {
            a.A = function() {}
            ;
            a.M = b;
            a.g = null;
            a.ba = 0;
            a.B = [];
            a.L = function() {}
            ;
            a.F = c
        }
          , $w = function(a, b, c) {
            if (0 == a.h && (a.h = b ? 860 : a.s,
            !c || c <= a.s)) {
                a.o = a.h;
                return
            }
            do
                b = a.h,
                a.h < a.s && (a.h *= a.xa,
                a.h > a.s && (a.h = a.s));
            while (b != a.h && c && a.h < c);
            a.o = a.h
        }
          , ax = function(a, b) {
            var c = null != b
              , d = !c && !a.qa;
            (d || c) && a.A(100, d, b)
        }
          , bx = function(a) {
            return a.ha ? a.g.S : a.g.na().length
        }
          , cx = function(a, b, c, d, e) {
            return new Bw(a.M.shift(),{
                Qk: a.ha,
                Nj: b,
                Ih: !0,
                Mk: !!c
            },function() {
                var f = Array.prototype.slice.call(arguments);
                return new $v(f.shift(),f.shift(),f.shift(),f.shift(),f.shift(),c,d)
            }
            ,a.F,e)
        }
          , fx = function(a, b, c) {
            if (0 < a.V && dx(b) >= a.V)
                return !0;
            if (bx(a) > a.h) {
                if (0 < dx(b))
                    return !0;
                $w(a, c, bx(a));
                for (var d = a.g.na(), e = new Sw(d,a.ha), f; f = Vw(e, a.h, a.j); )
                    if (b.o.push(new Qw([f],!1)),
                    a.l += f.length,
                    a.j -= f.length,
                    0 >= a.j) {
                        b.D = d.substring(e.g);
                        break
                    } else
                        $w(a, c);
                ex(b, a.g, !0);
                a.g = null;
                return !0
            }
            if (bx(a) > a.o)
                return !0;
            ex(b, a.g, !0);
            a.o -= bx(a) + a.Da;
            a.l += a.g.H;
            a.j -= a.g.H;
            a.g = null;
            return !1
        }
          , gx = function(a, b, c, d, e) {
            var f, g, h;
            return _.Gk(function(k) {
                switch (k.g) {
                case 1:
                    var m = new Ho(a.Ca);
                    var n = new Ww
                      , p = c
                      , q = n.O
                      , r = (0,
                    _.ii)(q);
                    _.ti(r);
                    if (null == p)
                        _.Ii(q, r, 1);
                    else {
                        var w = (0,
                        _.Sh)(p);
                        if (!(w & 4)) {
                            if (w & 2 || Object.isFrozen(p))
                                p = _.Qh(p);
                            for (var D = 0; D < p.length; D++) {
                                var Q = p
                                  , W = D
                                  , ha = p[D];
                                if ("string" !== typeof ha)
                                    throw Error();
                                Q[W] = ha
                            }
                            (0,
                            _.ji)(p, w | 5)
                        }
                        _.Ii(q, r, 1, p)
                    }
                    f = Io(m, n.ac(d).va(e), b);
                    k.s = 2;
                    return _.zk(k, f, 4);
                case 4:
                    g = k.j;
                    h = zl(g);
                    b(h, 200);
                    k.g = 3;
                    k.s = 0;
                    break;
                case 2:
                    k.s = 0,
                    k.l = null,
                    b([], 500);
                case 3:
                    return a.N.push(f),
                    k.return(f)
                }
            })
        };
        var hx = function(a, b) {
            _.B.call(this);
            this.l = b;
            this.j = {
                rootMargin: a
            };
            this.g = new IntersectionObserver((0,
            _.z)(this.h, this),this.j)
        };
        _.y(hx, _.B);
        hx.prototype.I = function() {
            _.B.prototype.I.call(this);
            this.g = null
        }
        ;
        hx.prototype.h = function(a) {
            for (var b = 0; b < a.length; b++)
                if (0 < a[b].intersectionRatio) {
                    this.l();
                    break
                }
        }
        ;
        var ix = function(a) {
            return (0,
            _.L)('<span id="' + T(a.id) + '"></span>')
        }
          , jx = function(a) {
            var b = a.id
              , c = a.Bh;
            return (0,
            _.L)($o(a.Ch) + '<div id="' + T(b) + '"></div>' + $o(c))
        }
          , on = function(a) {
            var b = a.top
              , c = a.left
              , d = a.bottom
              , e = a.right
              , f = a.id;
            return (0,
            _.uk)("." + ip(a.className) + " {z-index:9999999; overflow:visible; position:fixed; _position:absolute;" + (Mo(b) || Lo(b, 0) ? "top:" + ip(b) + "px; _top:expression((" + ip(b) + "+(hack1=document.documentElement.scrollTop||document.body.scrollTop))+'px');" : "top:auto;") + (Mo(c) || Lo(c, 0) ? "left:" + ip(c) + "px; _left:expression((" + ip(c) + "+(hack2=document.documentElement.scrollLeft||document.body.scrollLeft))+'px');" : "left:auto;") + (Mo(d) || Lo(d, 0) ? "bottom:" + ip(d) + "px; _top:expression((-" + ip(d) + "-document.getElementById('" + String(f).replace(dp, Wo) + "').offsetHeight+(hack3=document.documentElement.clientHeight||document.body.clientHeight)+(hack4=document.documentElement.scrollTop||document.body.scrollTop))+'px');" : "bottom:auto;") + (Mo(e) || Lo(e, 0) ? "right:" + ip(e) + "px; _left:expression((-" + ip(e) + "-document.getElementById('" + String(f).replace(dp, Wo) + "').offsetWidth+(hack5=document.documentElement.clientWidth||document.body.clientWidth)+(hack6=document.documentElement.scrollLeft||document.body.scrollLeft))+'px');" : "right:auto;") + "}")
        }
          , kx = function() {
            return (0,
            _.L)('<div class="' + T("VIpgJd-ZVi9od-aZ2wEe-wOHMyf") + '"><div class="' + T("VIpgJd-ZVi9od-aZ2wEe-OiiCO") + '"><svg xmlns="http://www.w3.org/2000/svg" class="' + T("VIpgJd-ZVi9od-aZ2wEe") + '" width="96px" height="96px" viewBox="0 0 66 66"><circle class="' + T("VIpgJd-ZVi9od-aZ2wEe-Jt5cK") + '" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"/></svg></div></div>')
        };
        var lx = function() {
            P.call(this)
        };
        _.y(lx, P);
        lx.prototype.U = function() {
            this.Aa(ul(kx))
        }
        ;
        lx.prototype.Aa = function(a) {
            this.o = a
        }
        ;
        var mx = function(a) {
            Kt(a.C(), "VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc");
            Kt(a.C().firstChild, "VIpgJd-ZVi9od-aZ2wEe-OiiCO-ti6hGc")
        };
        var nx = function() {
            this.g = new lx;
            this.g.U();
            this.g.Oa();
            this.h = 0
        };
        nx.prototype.reset = function() {
            this.h = 0;
            mx(this.g)
        }
        ;
        var ox = function(a, b, c, d, e, f, g, h) {
            this.o = a;
            this.g = b;
            this.B = [];
            this.D = null;
            this.h = c;
            this.l = d;
            this.j = e;
            this.ha = f;
            this.M = g;
            this.F = this.s = null;
            this.A = h || null;
            this.G = this.L = !1;
            this.H = {}
        }
          , px = function(a) {
            for (var b = new Set, c = 0; c < a.length; c++)
                iw(a[c]).forEach(function(d) {
                    return b.add(d)
                });
            return b
        };
        ox.prototype.trackVisibility = function(a) {
            a = this.s = new hx("200px",(0,
            _.z)(this.Ca, this, a));
            var b = Ow(px([].concat(this.g, this.B)));
            _.Bf(b, (0,
            _.z)(a.g.observe, a.g));
            a = this.F = new hx("0px",(0,
            _.z)(this.S, this));
            b = Ow(px([].concat(this.g, this.B)));
            _.Bf(b, (0,
            _.z)(a.g.observe, a.g))
        }
        ;
        ox.prototype.Ca = function(a) {
            this.s && (this.s.g.disconnect(),
            this.s = null);
            a()
        }
        ;
        ox.prototype.S = function() {
            this.L = !0;
            qx(this);
            if (!this.G && this.A) {
                var a = this.A;
                0 == a.h++ && (a = a.g,
                It(a.C(), "VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc"),
                It(a.C().firstChild, "VIpgJd-ZVi9od-aZ2wEe-OiiCO-ti6hGc"))
            }
        }
        ;
        var qx = function(a) {
            a.F && (a.F.g.disconnect(),
            a.F = null)
        };
        ox.prototype.N = function() {
            if (this.L && !this.G && this.A) {
                var a = this.A;
                0 == --a.h && mx(a.g)
            }
            this.s && (this.s.g.disconnect(),
            this.s = null);
            qx(this)
        }
        ;
        var ex = function(a, b, c) {
            c ? (a.g.push(b),
            a.H[b.na()] = !0) : a.B.push(b)
        }
          , dx = function(a) {
            return a.g.length + a.B.length
        }
          , rx = function(a) {
            if (0 == a.o.length) {
                for (var b = [], c = 0; c < a.g.length; ++c)
                    b.push(a.g[c].na());
                a.o.push(new Qw(b,!1))
            }
        };
        ox.prototype.translate = function(a) {
            function b() {
                d++;
                d == c && e()
            }
            rx(this);
            for (var c = 0, d = 0, e = function() {}, f = this.h, g = this.l, h = this.j, k = 0; k < this.o.length; ++k)
                Rw(this.o[k], function(m, n, p) {
                    return gx(f, _.Bb(m, b), n, p || g, h)
                }) && c++;
            0 != c && (e = ww(a));
            return c
        }
        ;
        var sx = function(a, b) {
            _.B.call(this);
            this.g = [];
            this.h = [];
            this.l = a;
            this.j = b
        };
        _.y(sx, _.B);
        sx.prototype.o = function(a) {
            var b = (0,
            _.kc)(a.href);
            0 == b.indexOf("javascript:") || 0 <= b.indexOf("#") || (this.h.push(a.href),
            this.g.push(a),
            a.href = b + "#googtrans/" + this.l + "/" + this.j)
        }
        ;
        sx.prototype.I = function() {
            _.B.prototype.I.call(this);
            this.restore()
        }
        ;
        sx.prototype.restore = function() {
            if (this.g.length) {
                for (var a = 0; a < this.g.length; ++a)
                    this.g[a].href = this.h[a];
                this.g = [];
                this.h = []
            }
        }
        ;
        var tx = function(a, b) {
            _.B.call(this);
            this.g = a;
            this.h = _.Qf.test(b) ? "translated-rtl" : "translated-ltr";
            a = [].concat(this.g);
            for (b = 0; b < a.length; ++b)
                ao(a[b]) && It(a[b], this.h)
        };
        _.y(tx, _.B);
        tx.prototype.I = function() {
            _.B.prototype.I.call(this);
            this.restore()
        }
        ;
        tx.prototype.restore = function() {
            for (var a = [].concat(this.g), b = 0; b < a.length; ++b)
                ao(a[b]) && Kt(a[b], this.h)
        }
        ;
        var ux = function(a, b, c, d, e, f, g, h, k, m) {
            _.B.call(this);
            this.F = a;
            this.Cc = b;
            this.Y = c || null;
            this.qa = m || null;
            this.L = null;
            this.Ia = !!d;
            this.cd = e || "transparent";
            this.bd = !!f;
            this.D = [];
            this.Rb = this.H = this.g = !1;
            this.h = h || new jw;
            this.Qd = !h;
            this.ba = g || nw.Vb();
            this.Ob = new Nw;
            this.xa = this.ra = this.G = !1;
            this.Pb = this.o = .5;
            this.Qb = .01;
            this.B = new pw(this.o);
            this.S = (this.A = this.V = !!k) ? new MutationObserver((0,
            _.z)(this.uj, this)) : null;
            this.j = this.l = null;
            _.F(window, "blur", this.Yg, !0, this);
            _.F(window, "focus", this.Zg, !0, this)
        };
        _.y(ux, _.B);
        _.l = ux.prototype;
        _.l.lb = function() {
            return this.l ? this.l : ""
        }
        ;
        _.l.ta = function() {
            return this.j ? this.j : ""
        }
        ;
        _.l.Ki = function(a) {
            this.Qj.apply(this, arguments);
            this.s && this.s(0, !1, 1)
        }
        ;
        _.l.Gg = function(a) {
            this.Rj.apply(this, arguments);
            this.s && this.s(0, !1, 1)
        }
        ;
        _.l.Li = function(a) {
            this.Sj.apply(this, arguments);
            this.s && this.s(0, !1, 1)
        }
        ;
        _.l.Mi = function(a) {
            this.Tj.apply(this, arguments);
            this.s && this.s(0, !1, 1)
        }
        ;
        _.l.translate = function(a, b, c, d, e) {
            if (d || a != this.l || b != this.j)
                vx(this),
                this.Qd && (this.h = new jw);
            else if (this.g)
                return;
            this.s = c;
            this.Od = e;
            this.A = this.V;
            this.S && this.S.observe(document.body, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            });
            this.g = !0;
            this.l = a;
            this.j = b;
            this.Ia && (this.L = new sx(a,b));
            this.xa = "auto" == this.l;
            this.Y && (c = this.Y,
            a && (c.B = a),
            b && (c.F = b));
            this.Da = new tx(this.F,this.j);
            this.N = wx(this);
            (a = this.F instanceof Node ? this.F : null) && xx(a, this.j)
        }
        ;
        var wx = function(a) {
            var b = new rw(a,a.ba);
            sw(b, a.Xg);
            uw(b, (0,
            _.z)(a.Ki, a));
            vw(b, new Xw(a.Cc,[].concat(a.F),a.ba,a.s,a.A,a.Od));
            return b
        };
        ux.prototype.restore = function() {
            vx(this);
            this.Ob.restore();
            var a = this.F instanceof Node ? this.F : null;
            a && xx(a, this.lb())
        }
        ;
        ux.prototype.I = function() {
            _.B.prototype.I.call(this);
            this.restore();
            _.Xd(window, "blur", this.Yg, !0, this);
            _.Xd(window, "focus", this.Zg, !0, this)
        }
        ;
        var yx = function(a, b, c, d) {
            var e = a.h.Ib()
              , f = new rw(a,b.F);
            b.B.push(f);
            tw(f, b.L);
            $w(b, e);
            sw(f, d || a.Ug);
            b = c || new ox([],[],b,a.lb(),a.ta(),a.Rb,a.H,a.qa);
            uw(f, a.xj, a);
            a.A && tw(f, b.N, b);
            vw(f, b)
        };
        _.l = ux.prototype;
        _.l.xj = function(a, b, c) {
            c.N();
            this.H ? this.Mi(a) : this.Li(a);
            c.h.L()
        }
        ;
        _.l.Zg = function() {
            this.G = !1;
            this.M = 0;
            ow(this.B, this.o)
        }
        ;
        _.l.Yg = function(a) {
            a.target == window && (this.G = !0,
            this.M = 0,
            ow(this.B, .01))
        }
        ;
        _.l.uj = function(a) {
            if (this.g && this.A) {
                for (var b = 0; b < a.length; b++)
                    if (a[b].target && a[b].target.className && "string" === typeof a[b].target.className && (0 <= a[b].target.className.indexOf("translate") || 0 == a[b].target.className.indexOf("goog-")))
                        return;
                this.ba.add((0,
                _.z)(this.zk, this))
            }
        }
        ;
        _.l.zk = function() {
            this.H = !0;
            this.N.stop();
            this.N = wx(this);
            return !1
        }
        ;
        _.l.Xg = function(a, b) {
            Yw(b, ww(a));
            yx(this, b);
            return this.Aj
        }
        ;
        _.l.Aj = function(a, b) {
            if (!this.g)
                return yw;
            if (!xw(a))
                return zw;
            if (!this.A)
                for (a = 0; a < this.D.length; ++a) {
                    var c = (0,
                    _.z)(this.vg, this, b, this.D[a]);
                    b.F.add(c)
                }
            return this.zj
        }
        ;
        _.l.Tg = function(a, b) {
            if (this.M && !this.G) {
                a = (new Date).getTime() - this.M;
                var c = this.o;
                900 > a && .01 < c ? c = Math.max(.9 * c, .01) : 1100 < a && .5 > c && (c = Math.min(1.5 * c, .5));
                this.o = c;
                this.ra ? this.Qb = .01 : this.Pb = this.o
            }
            this.H = this.g = !0;
            this.M = (new Date).getTime();
            this.Pd != (a = document.body.innerText || document.body.textContent || document.body.innerHTML) ? (this.Pd = a,
            a = !0) : a = !1;
            a ? (this.ra = !1,
            this.o = this.Pb,
            this.G || ow(this.B, this.o),
            Zw(b, [].concat(this.F), this.B),
            a = new rw(this,this.B),
            sw(a, this.Xg),
            uw(a, (0,
            _.z)(this.Gg, this)),
            vw(a, b),
            this.N = a) : (this.ra = !0,
            this.o = this.Qb,
            this.G || ow(this.B, this.o),
            a = new rw(this,this.B),
            sw(a, this.Tg),
            uw(a, (0,
            _.z)(this.Gg, this)),
            vw(a, b),
            this.N = a);
            return yw
        }
        ;
        _.l.zj = function(a, b) {
            if (!this.g)
                return yw;
            this.H = this.g = !1;
            this.xa ? ax(b, !0) : (ax(b),
            b.Y(b.l));
            if (this.bd)
                return this.Tg;
            for (a = 0; a < b.B.length; ++a)
                b.B[a].stop();
            for (a = 0; a < b.N.length; ++a)
                xs(b.Ca, b.N[a]);
            return yw
        }
        ;
        var Ax = function(a, b, c) {
            a: {
                var d = zx(a)
                  , e = a.Y
                  , f = a.cd
                  , g = a.Ob.g;
                b = ww(b);
                if (!c.H) {
                    if (0 == c.M.length) {
                        0 == c.l && 0 == c.ba && c.A(0, !0);
                        c = !1;
                        break a
                    }
                    c.H = cx(c, d, e, f, g)
                }
                c.ra = !0;
                Cw(c.H, c.j, c.h, b);
                c = !0
            }
            return c ? a.Ug : a.Yd
        }
          , zx = function(a) {
            return a.Ia ? (0,
            _.z)(a.L.o, a.L) : function() {}
        };
        _.l = ux.prototype;
        _.l.Ug = function(a, b) {
            if (!this.g)
                return yw;
            var c = b.h;
            if (null == c.g) {
                if (!c.ra)
                    return Ax(this, a, b.h);
                if (!xw(a))
                    return zw;
                c.ra = !1;
                c.g = c.H.kd || null;
                var d = c.g ? c.g : c.H = null;
                if (!d)
                    return Ax(this, a, b.h);
                this.D.push(d);
                var e = d.na();
                if (this.h.has(e, !this.A) || null != b.H[e] && b.H[e])
                    return e = c.g.H,
                    c.l += e,
                    c.j -= e,
                    c.g = null,
                    this.A && ex(b, d, !1),
                    Ax(this, a, b.h);
                this.h.g[d.na()] = null
            }
            0 < dx(b) && ow(this.B, .5);
            d = this.h.Ib();
            return fx(c, b, d) ? this.Yd : Ax(this, a, b.h)
        }
        ;
        _.l.Yd = function(a, b) {
            if (!this.g || 0 == dx(b))
                return yw;
            yx(this, b.h);
            return this.A ? (b.trackVisibility(ww(a)),
            this.Bj) : 0 == b.translate(a) ? yw : this.Wg
        }
        ;
        _.l.Bj = function(a, b) {
            return this.g ? xw(a) ? 0 == b.translate(a) ? yw : this.Wg : zw : yw
        }
        ;
        _.l.vg = function(a, b) {
            b.l && this.h.remove(b.j);
            if (!this.g)
                return !1;
            if (this.h.has(b.na(), !1)) {
                var c = this.h;
                if (c.has(b.j, !1)) {
                    var d = b.j
                      , e = c.g[d];
                    e || (e = c.h[d],
                    c.g[d] = e);
                    b.h = e;
                    b.N = !0
                } else
                    c.remove(b.j),
                    b.l = !0;
                gw(b)
            } else if (c = this.h,
            b.l)
                c.remove(b.j);
            else if (b.F) {
                d = b.F.replace(/<a /g, "<span ").replace(/\/a>/g, "/span>");
                b.N = !0;
                delete b.F;
                b.F = null;
                b.h = [];
                e = _.sd(document, "div");
                Bp(e, !1);
                d = 0 <= d.indexOf("<i>") ? d : "<b>" + d + "</b>";
                d = _.Ya(d);
                d = _.ad(d);
                if (1 === e.nodeType) {
                    var f = e.tagName;
                    if ("SCRIPT" === f || "STYLE" === f)
                        throw Error("B");
                }
                e.innerHTML = _.$c(d);
                document.body.appendChild(e);
                d = [];
                for (f = e.firstChild; f; f = f.nextSibling)
                    if ("I" == f.tagName)
                        var g = ew(b, jo(f), f.innerHTML);
                    else if ("B" == f.tagName) {
                        g || (g = ew(b, "", ""));
                        if (1 == b.g.length)
                            kw(g.ia, d, 0, f);
                        else {
                            var h = f;
                            var k = b.g;
                            g = g.ia;
                            for (var m = [], n = h.firstChild; n; n = p) {
                                var p = n.nextSibling;
                                lw(n)
                            }
                            for (p = h.firstChild; p; p = p.nextSibling)
                                p.attributes && p.attributes.i ? (h = parseInt(p.attributes.i.nodeValue, 10),
                                !isNaN(h) && 0 <= h && h < k.length && (k[h].Ae && m[h] ? m[h].fa += p.firstChild && 3 == p.firstChild.nodeType ? p.firstChild.nodeValue : jo(p) : m[h] = kw(g, d, h, p))) : 3 == p.nodeType && g.push({
                                    da: -1,
                                    fa: Wn(p.nodeValue)
                                });
                            null != g && 0 < g.length && -1 == g[0].da && (1 == g.length ? g[0].da = 0 : (g[1].fa = g[0].fa + g[1].fa,
                            g.shift()))
                        }
                        g = void 0
                    }
                f = b.h;
                for (k = 0; k < f.length - 1; ++k)
                    g = f[k],
                    m = Rn(g.ia[g.ia.length - 1].fa),
                    m = m.charCodeAt(m.length - 1),
                    12288 <= m && 12351 >= m || 65280 <= m && 65519 >= m || (g.ia[g.ia.length - 1].fa += " ");
                $n(e);
                for (e = 0; e < b.g.length; ++e)
                    e < d.length && e < b.B.length && null != d[e] && (f = b.B[e],
                    k = d[e].start,
                    null != k && (g = f.substring(0, f.length - f.replace(/^[\s\xa0]+/, "").length),
                    " " == g && (g = ""),
                    g && (k.fa = g + k.fa.replace(/^[\s\xa0]+/, ""))),
                    k = d[e].end,
                    null != k && (f = f.substring(Rn(f).length),
                    " " == f && (f = ""),
                    f && (k.fa = Rn(k.fa) + f)));
                1 != b.h.length || b.h[0].Cf || (b.h[0].Cf = b.j);
                c.write(b.j, b.h);
                gw(b)
            }
            b.L || (this.xa = !1);
            c = b.l ? !0 : void 0;
            a.G += b.H;
            null != c && (a.qa = !0);
            b = Math.min(Math.floor(100 * a.G / a.l), 100);
            if (a.D != b || c)
                a.D = b,
                a.S ? (a.A(a.D, !0, c),
                a.Y(a.G)) : a.A(a.D, !1, c);
            return !1
        }
        ;
        _.l.Wg = function(a, b) {
            if (!this.g)
                return yw;
            if (!xw(a))
                return zw;
            if (1 < dx(b)) {
                a = b.o[0];
                var c = b.g;
                if (a.j || 0 == c.length || null == a.g || 0 == a.g.length)
                    a = null;
                else {
                    for (var d = [], e = [], f = 0; f < a.g.length && f < c.length; ++f) {
                        var g = a.g[f];
                        g && g[0] && 200 == g[1] || (e.push(c[f]),
                        d.push(a.o[f]))
                    }
                    a = 0 < e.length ? {
                        Ak: new Qw(d,!0),
                        Nf: e
                    } : null
                }
                a = a ? new ox([a.Ak],a.Nf,b.h,b.l,b.j,b.ha,b.M,b.A) : null;
                null != a && yx(this, b.h, a, this.Yd)
            } else {
                a = !1;
                for (c = 0; c < b.o.length; ++c)
                    d = b.o[c],
                    d.j || 200 == d.h && d.g && d.g[0] ? d = d.l = !1 : (d.j = !0,
                    d = d.l = !0),
                    a = d || a;
                if (a)
                    return this.Yd
            }
            d = this.lb();
            a = this.ta();
            if (1 < b.g.length)
                if (c = b.o[0],
                e = "auto" == d,
                d = b.g,
                200 == c.h)
                    for (f = 0; f < c.g.length && f < d.length; ++f)
                        if ((g = c.g[f]) && 200 == g[1]) {
                            var h = g[2]
                              , k = d[f]
                              , m = k
                              , n = null != h && h == a;
                            m.F = g[0];
                            void 0 !== n && (m.G = n);
                            k.L = e && null == h
                        } else
                            d[f].l = !0;
                else
                    for (a = 0; a < d.length; ++a)
                        d[a].l = !0;
            else {
                c = new Pw("auto" == d);
                for (d = 0; d < b.o.length; ++d)
                    f = b.o[d],
                    e = a,
                    200 == f.h && f.g && f.g[0] ? (f = f.g[0],
                    c.g.push(f[0]),
                    f = f[2],
                    c.h = c.h && null != f && f == e,
                    null != f && (c.l = !1)) : 500 != f.h && (c.j = !0);
                null != b.D && (c.g.push(b.D),
                b.D = null);
                if (a = b.g[0])
                    d = c.h,
                    a.F = c.na(),
                    void 0 !== d && (a.G = d),
                    a.L = c.l,
                    a.l = c.j
            }
            if (this.A) {
                a = (0,
                _.z)(this.vg, this);
                for (c = 0; c < b.g.length; c++)
                    a(b.h, b.g[c]);
                for (c = 0; c < b.B.length; c++)
                    a(b.h, b.B[c]);
                qx(b);
                b.G = !0;
                b.L && b.A && (b = b.A,
                0 == --b.h && mx(b.g))
            }
            return yw
        }
        ;
        var vx = function(a) {
            a.S && a.S.disconnect();
            a.qa && a.qa.reset();
            a.g && (a.N.stop(),
            a.g = !1,
            a.H = !1);
            if (a.D.length) {
                for (var b = 0; b < a.D.length; ++b)
                    a.D[b].T();
                a.D = []
            }
            null != a.L && (a.L.restore(),
            a.L = null);
            null != a.Da && (a.Da.restore(),
            a.Da = null)
        }
          , xx = function(a, b) {
            a.getAttribute("xml:lang") && a.setAttribute("xml:lang", b);
            a.getAttribute("lang") && a.setAttribute("lang", b)
        };
        gs.attach(3046, ux.prototype, {
            Qj: 1,
            Sj: 2,
            Rj: 3,
            Tj: 4
        });
        var Bx = Ar(Hr)
          , Cx = function(a, b, c, d, e, f, g, h, k, m, n) {
            _.B.call(this);
            this.L = b || null;
            this.N = !!c;
            this.H = d || "transparent";
            this.F = f || "";
            b = g || {
                fetchStart: 0,
                nm: 0
            };
            a = b.fetchStart || 0;
            b = b.fetchEnd || 0;
            this.D = a && b ? b - a : 0;
            this.S = Date.now() - $p;
            this.s = !1;
            this.g = new vs(e || "",void 0,f,n);
            this.G = new pw(1);
            this.A = new jw;
            this.h = null;
            this.B = !0;
            this.o = null != _.t.IntersectionObserver;
            this.M = h || null;
            e = new Nr;
            f = new Pr(this.g.initialize.bind(this.g, e.register()));
            this.Ud = Qr(f, e.delay((0,
            _.z)(this.Ud, this)));
            this.Td = Qr(f, e.delay((0,
            _.z)(this.Td, this)));
            this.ze = Qr(f, e.delay((0,
            _.z)(this.ze, this)));
            this.restore = Qr(f, e.delay((0,
            _.z)(this.restore, this)));
            f.finish();
            e.finish();
            performance && performance.mark && performance.mark(qr, void 0);
            e = Ir(Bx, 1);
            f = new wr;
            f = Gm(f, 1, window.location.origin);
            a: {
                if (performance && (h = performance.getEntriesByType("navigation"),
                1 == h.length)) {
                    h = h[0];
                    break a
                }
                h = null
            }
            h && (n = new Fm,
            n = Gm(n, 1, ""),
            a = Hm(h.startTime),
            n = _.I(n, 2, a),
            a = Im(h.duration),
            n = _.I(n, 3, a),
            a = new vr,
            a = Gm(a, 1, h.initiatorType),
            a = Gm(a, 2, h.nextHopProtocol),
            b = Hm(h.workerStart || 0),
            a = _.I(a, 3, b),
            b = Hm(h.redirectStart),
            a = _.I(a, 4, b),
            b = Hm(h.redirectStart),
            a = _.I(a, 4, b),
            b = Hm(h.redirectEnd),
            a = _.I(a, 5, b),
            b = Hm(h.fetchStart),
            a = _.I(a, 6, b),
            b = Hm(h.domainLookupStart),
            a = _.I(a, 7, b),
            b = Hm(h.domainLookupEnd),
            a = _.I(a, 8, b),
            b = Hm(h.connectStart),
            a = _.I(a, 9, b),
            b = Hm(h.connectEnd),
            a = _.I(a, 10, b),
            b = Hm(h.secureConnectionStart),
            a = _.I(a, 11, b),
            b = Hm(h.responseStart),
            a = _.I(a, 13, b),
            b = Hm(h.responseEnd),
            a = _.I(a, 14, b),
            a = _.Ti(a, 15, h.transferSize),
            a = _.Ti(a, 16, h.encodedBodySize),
            a = _.Ti(a, 17, h.decodedBodySize),
            n = Km(n, 6, a),
            _.I(f, 3, n),
            h = Pm(tr, {
                start: h.responseEnd,
                end: Om(qr) || performance.now()
            })) && (performance && performance.clearMeasures && performance.clearMeasures(tr),
            h = Lm(h),
            _.I(f, 4, h),
            h = _.Vi(e, yr, 112),
            _.I(h, 4, f));
            Kr(e)
        };
        _.A(Cx, _.B);
        gs.attach(14097, Cx.prototype, {
            uf: function() {
                Rm(this.g.wb() ? "te_afas" : "te_afau")
            }
        });
        _.l = Cx.prototype;
        _.l.Bk = function(a) {
            this.o = a
        }
        ;
        _.l.vb = function() {
            return this.g.wb()
        }
        ;
        _.l.Ud = function(a, b) {
            this.g.vb() ? this.g.l.send({
                display_language: b,
                key: "AIzaSyBWDj0QJvVIx8XOhRegXX5_SrRWxhT5Hs4"
            }, a).then(function(c) {
                return a(c)
            }) : (this.uf(),
            a(null))
        }
        ;
        _.l.Td = function(a) {
            var b = document.documentElement.lang;
            if (b)
                a(b);
            else if (this.g.vb()) {
                b = new Fs(document.body,!1,!1,1,1);
                for (var c = [], d = 0, e = this.g.h.oh; c.length + d < e; ) {
                    var f = b.next();
                    if (f.done)
                        break;
                    f = f.value;
                    1 == b.g && Lw(f) ? Gs(b) : 3 == f.nodeType && (f = (0,
                    _.kc)(Qn(f.nodeValue))) && (c.push(f),
                    d += f.length)
                }
                ws(this.g, a, c.join(" ")).then(function(g) {
                    a(g)
                }, function(g) {
                    return a(null, g)
                })
            } else
                this.uf(),
                a(null, !0)
        }
        ;
        _.l.ze = function(a, b, c, d, e) {
            Bx.yd = a;
            Bx.zd = b;
            var f = Ir(Bx, 2);
            Jr(Bx, f);
            var g = Om(qr);
            if (g) {
                var h = Pm(ur, {
                    start: g,
                    end: Om(rr) || performance.now()
                });
                if (h) {
                    g = _.Vi(f, yr, 112);
                    var k = new xr;
                    h = Lm(h);
                    k = _.I(k, 1, h);
                    _.I(g, 5, k);
                    performance && performance.clearMeasures && performance.clearMeasures(ur)
                }
            }
            Kr(f);
            f = {
                detail: {
                    sourceLanguage: a,
                    targetLanguage: b
                }
            };
            performance && performance.mark && performance.mark(rr, f);
            f = Date.now();
            fs();
            if (!a || as(a, b))
                a = "auto";
            if (e || a != this.l || b != this.j)
                this.A = new jw;
            this.l = a;
            this.j = b;
            this.g.vb() ? (d = d || document.documentElement,
            this.h && this.h.T(),
            this.h = new ux(d,this.g,this.L,this.N,this.H,!0,this.G,this.A,this.o,this.M),
            this.h.Rb = this.s,
            this.B = !0,
            this.h.translate(a, b, c, e, (0,
            _.z)(this.Xj, this, f, a, b))) : (this.uf(),
            c(0, !1, !0))
        }
        ;
        _.l.ei = function() {
            return !!this.h && this.h.g
        }
        ;
        _.l.Mh = function(a) {
            this.s = a
        }
        ;
        _.l.restore = function() {
            var a = Ir(Bx, 3);
            Jr(Bx, a);
            Kr(a);
            performance && performance.mark && performance.mark(sr, void 0);
            fs();
            this.g.vb() && this.h && this.h.restore()
        }
        ;
        _.l.I = function() {
            es();
            Cx.P.I.call(this);
            this.g.T();
            this.h = this.g = null;
            this.A = new jw
        }
        ;
        _.l.Xj = function(a, b, c, d) {
            this.B && (this.B = !1,
            b = {
                sl: b,
                tl: c,
                textlen: d
            },
            this.s && (b.ctt = "1"),
            "" != this.F && (b.sp = this.F),
            b.ttt = Date.now() - a,
            b.ttl = this.S,
            this.D && (b.ttf = this.D),
            this.o && (b.sr = 1),
            Rm("te_time", b))
        }
        ;
        var Dx = function(a) {
            P.call(this, a);
            this.A = new _.Og(this)
        };
        _.y(Dx, P);
        Dx.prototype.U = function() {
            var a = _.vk(this.h, "select");
            a.className = "goog-te-combo";
            a.setAttribute("aria-label", U.ng);
            this.Aa(a)
        }
        ;
        Dx.prototype.sa = function() {
            P.prototype.sa.call(this);
            this.Fg()
        }
        ;
        Dx.prototype.Fg = function() {
            _.F(this.C(), "change", Tr(this, "change"));
            this.dispatchEvent("load")
        }
        ;
        Dx.prototype.ma = function() {
            P.prototype.ma.call(this);
            this.A.T();
            this.A = null
        }
        ;
        var Ex = function(a, b) {
            a.C().parentNode != b && (a.C().parentNode.removeChild(a.C()),
            b.appendChild(a.C()))
        };
        _.l = Dx.prototype;
        _.l.xd = function(a) {
            this.h.Ff(this.C());
            for (var b in a)
                if (a[b] !== Object.prototype[b]) {
                    var c = this.h.U("OPTION", {
                        value: b
                    });
                    this.h.Vc(c, a[b]);
                    this.C().appendChild(c)
                }
            this.C().selectedIndex = 0
        }
        ;
        _.l.ua = function() {
            return this.C().value
        }
        ;
        _.l.Pa = function(a) {
            if (this.C().value != a)
                for (var b = 0, c; c = this.C().options.item(b); ++b)
                    if (c.value == a) {
                        this.C().selectedIndex = b;
                        break
                    }
        }
        ;
        _.l.Ed = function(a) {
            if ("undefined" == _.wb(a))
                return this.C().options.item(this.C().selectedIndex).text;
            for (var b = 0, c; c = this.C().options.item(b); ++b)
                if (c.value == a)
                    return c.text
        }
        ;
        _.l.yb = function(a) {
            this.C().disabled = !a
        }
        ;
        var Fx = function(a) {
            Dx.call(this, a)
        };
        _.y(Fx, Dx);
        Fx.prototype.Zb = function(a) {
            this.xd.call(this, a)
        }
        ;
        var Gx = function(a, b) {
            Dx.call(this, b);
            this.g = a && $k(a) || {};
            this.g.Kf = this.g.Kf || 11;
            this.g.xe = 0 != this.g.xe;
            this.g.Nb = jq
        };
        _.y(Gx, Dx);
        _.l = Gx.prototype;
        _.l.Md = function() {
            throw Error("Va");
        }
        ;
        _.l.U = function() {
            this.Md();
            this.D = this.C();
            this.l = Xn("IFRAME", {
                frameBorder: 0,
                "class": "VIpgJd-ZVi9od-xl07Ob-OEVmcd skiptranslate",
                title: U.ng
            });
            this.l.style.visibility = "visible";
            Bp(this.l, !1);
            document.body.appendChild(this.l)
        }
        ;
        _.l.Fg = function() {
            var a = _.Qf.test(Xp) ? "rtl" : "ltr"
              , b = _.$a(this.g.Nb)
              , c = V(this, "menuBody");
            this.A.J(this.l, "load", this.fi);
            Xr(this.l, (0,
            _.z)(function() {
                var d = bo(this.l)
                  , e = '<head><meta http-equiv="Content-Type" content="text/html; charset=UTF8"><link rel="stylesheet" type="text/css" href="' + T(gp(b)) + '"></head><body scroll="no" style="margin:0px;overflow:hidden" dir="' + T(a) + '" marginHeight=0 marginWidth=0 leftMargin=0 topMargin=0 border=0><div id="' + T(c) + '" class=';
                if (Jo("VIpgJd-ZVi9od-xl07Ob", _.rk)) {
                    var f = String("VIpgJd-ZVi9od-xl07Ob".na()).replace(Oo, "").replace(Po, "&lt;");
                    f = String(f).replace(cp, Uo)
                } else
                    f = "VIpgJd-ZVi9od-xl07Ob".replace(bp, Uo);
                e = (0,
                _.L)(e + f + "></div></body>").Xc();
                d.write(_.$c(e));
                d.close()
            }, this))
        }
        ;
        _.l.fi = function() {
            this.j = new _.jd(bo(this.l));
            this.S = this.j.C(V(this, "menuBody"));
            this.A.J(this.D, "click", this.df);
            _.E ? this.A.J(this.l, "blur", this.Xd) : this.A.J(co(this.l), "blur", this.Xd);
            this.dispatchEvent("load")
        }
        ;
        _.l.ma = function() {
            Dx.prototype.ma.call(this);
            $n(this.l);
            this.D = this.ba = this.B = this.S = this.j = this.l = null
        }
        ;
        _.l.Vg = function(a) {
            this.s != a.currentTarget.value && (this.Pa(a.currentTarget.value),
            this.dispatchEvent("change"));
            this.Xd()
        }
        ;
        _.l.df = function() {
            Hx(this);
            co(this.l).focus();
            this.ra = !0
        }
        ;
        _.l.Xd = function() {
            this.ra && (this.ra = !1,
            Hx(this, !1),
            _.rd(_.kd(this.D)).focus())
        }
        ;
        _.l.Gf = function() {}
        ;
        _.l.Hf = function() {}
        ;
        var Hx = function(a, b) {
            if ("undefined" == typeof b || b) {
                a.Hf();
                b = yp(a.D, window);
                var c = b.y + a.D.offsetHeight
                  , d = b.y - a.G.height
                  , e = b.x
                  , f = b.x + a.D.offsetWidth - a.G.width;
                if (_.E && !En()) {
                    var g = document.body;
                    c -= g.offsetTop;
                    d -= g.offsetTop;
                    e -= g.offsetLeft;
                    f -= g.offsetLeft
                } else
                    g = bn(document),
                    c -= g.y,
                    d -= g.y,
                    e -= g.x,
                    f -= g.x;
                g = _.qd(window);
                b.y = b.y <= g.height - a.G.height ? c : d;
                b.y > g.height - a.G.height && (b.y = g.height - a.G.height);
                0 > b.y && (b.y = 0);
                _.Qf.test(Xp) ? b.x = 0 <= f ? f : e : b.x = e <= g.width - a.G.width ? e : f;
                b.x > g.width - a.G.width && (b.x = g.width - a.G.width);
                0 > b.x && (b.x = 0);
                sp(a.l, b);
                Bp(a.l, !0);
                Ix(a)
            } else
                a.Gf(),
                Bp(a.l, !1)
        };
        _.l = Gx.prototype;
        _.l.ua = function() {
            return this.s
        }
        ;
        _.l.xd = function(a) {
            this.j.Ff(this.S);
            Bp(this.l, !0);
            this.Ia = a;
            this.B = [];
            for (var b in a)
                if (a[b] !== Object.prototype[b])
                    if ("---" == a[b]) {
                        var c = {
                            link: this.j.U("DIV", {
                                className: "VIpgJd-ZVi9od-vH1Gmf-hgDUwe",
                                value: b
                            }),
                            Ij: !0
                        };
                        this.B.push(c)
                    } else {
                        c = {
                            link: this.j.U("A", {
                                className: "VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd",
                                href: "#",
                                value: b
                            })
                        };
                        this.B.push(c);
                        var d = this.j.U("DIV", {
                            style: "white-space:nowrap"
                        });
                        this.j.appendChild(c.link, d);
                        this.g.xe && this.j.appendChild(d, this.j.U("SPAN", {
                            className: "indicator"
                        }, "\u203a"));
                        this.j.appendChild(d, this.j.U("SPAN", {
                            className: "text"
                        }, a[b]));
                        this.A.J(c.link, "click", this.Vg)
                    }
            a = this.B.length - 1;
            a = Math.round((a - a % this.g.Kf) / this.g.Kf) + 1;
            this.ba = this.j.U("TABLE", {
                cellspacing: 0,
                cellpadding: 0,
                border: 0
            });
            c = this.j.U("TBODY");
            b = this.j.U("TR", {
                valign: "top"
            });
            this.S.className = "VIpgJd-ZVi9od-vH1Gmf";
            this.j.appendChild(this.S, this.ba);
            this.j.appendChild(this.ba, c);
            this.j.appendChild(c, b);
            for (d = c = 0; c < a; ++c) {
                var e = this.j.U("TD");
                this.j.appendChild(b, e);
                for (var f = 0; 11 > f && d < this.B.length; ++f,
                ++d)
                    this.j.appendChild(e, this.B[d].link);
                c != a - 1 && (e = this.j.U("TD", {
                    "class": "VIpgJd-ZVi9od-vH1Gmf-KrhPNb"
                }, "\u00a0"),
                this.j.appendChild(b, e))
            }
            this.s = null;
            this.Pa(this.B[0].link.value);
            Ix(this);
            Bp(this.l, !1)
        }
        ;
        _.l.Ed = function(a) {
            return this.Ia["undefined" == _.wb(a) ? this.s : a]
        }
        ;
        _.l.If = function() {}
        ;
        _.l.Pa = function(a) {
            if (this.s != a) {
                this.Ed(a) && (this.s = a,
                this.If());
                for (var b = 0; b < this.B.length; ++b) {
                    var c = this.B[b];
                    c.Ij || (c.link.className = c.link.value == a && this.g.xe ? "VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd" : "VIpgJd-ZVi9od-vH1Gmf-ibnC6b")
                }
            }
        }
        ;
        var Ix = function(a) {
            Hp(a.S, Fp(a.ba));
            Hp(a.l, Fp(a.S));
            a.G = Fp(a.l)
        }
          , Jx = function(a, b) {
            Gx.call(this, a, b)
        };
        _.y(Jx, Gx);
        _.l = Jx.prototype;
        _.l.Md = function() {
            var a = this.h.U("a", {
                "aria-haspopup": "true"
            });
            a.className = "VIpgJd-ZVi9od-xl07Ob-lTBxed";
            _.nk(a, "#");
            this.M = this.h.U("SPAN");
            a.appendChild(this.M);
            this.V = this.h.U("IMG", {
                src: "https://www.google.com/images/cleardot.gif",
                alt: "",
                style: "background-image:url(" + gq + ");background-position:-14px 0px;border:none",
                width: 14,
                height: 14
            });
            a.appendChild(this.V);
            this.Aa(a)
        }
        ;
        _.l.Gf = function() {
            _.M(this.V, "backgroundPosition", "-14px 0px")
        }
        ;
        _.l.Hf = function() {
            _.M(this.V, "backgroundPosition", "0px 0px")
        }
        ;
        _.l.ma = function() {
            Gx.prototype.ma.call(this);
            this.V = this.M = null
        }
        ;
        _.l.If = function() {
            this.h.Vc(this.M, this.Ed(this.s) || "")
        }
        ;
        _.l.Zb = function(a) {
            this.xd.call(this, a)
        }
        ;
        var Kx = function(a, b) {
            Gx.call(this, a, b)
        };
        _.y(Kx, Gx);
        _.l = Kx.prototype;
        _.l.Md = function() {
            var a = this.h.U("a", {
                "aria-haspopup": "true"
            });
            a.className = "VIpgJd-ZVi9od-xl07Ob-lTBxed";
            _.nk(a, "#");
            this.M = this.h.U("SPAN");
            a.appendChild(this.M);
            a.appendChild(this.h.U("IMG", {
                src: "https://www.google.com/images/cleardot.gif",
                alt: "",
                width: 1,
                height: 1
            }));
            a.appendChild(this.h.U("SPAN", {
                style: "border-left:1px solid #bbb"
            }, "\u200b"));
            a.appendChild(this.h.U("IMG", {
                src: "https://www.google.com/images/cleardot.gif",
                alt: "",
                width: 1,
                height: 1
            }));
            this.V = this.h.U("span", {
                style: "color:#767676",
                "aria-hidden": "true"
            }, "\u25bc");
            a.appendChild(this.V);
            this.Aa(a)
        }
        ;
        _.l.Gf = function() {
            _.M(this.V, "color", "#9b9b9b")
        }
        ;
        _.l.Hf = function() {
            _.M(this.V, "color", "#d5d5d5")
        }
        ;
        _.l.ma = function() {
            Gx.prototype.ma.call(this);
            this.V = this.M = null
        }
        ;
        _.l.If = function() {
            this.h.Vc(this.M, this.Ed(this.s) || "")
        }
        ;
        _.l.Zb = function(a) {
            this.xd.call(this, a)
        }
        ;
        var Lx = function(a, b) {
            Gx.call(this, a, b);
            this.g.xe = !1
        };
        _.y(Lx, Gx);
        Lx.prototype.Md = function() {
            var a = _.vk(this.h, "div");
            a.className = "VIpgJd-ZVi9od-LgbsSe";
            var b = this.h.U("DIV", {
                style: "background: url(" + fq + ") repeat-x 0 -39px"
            });
            a.appendChild(b);
            this.M = _.vk(this.h, "button");
            b.appendChild(this.M);
            this.Aa(a)
        }
        ;
        Lx.prototype.Lh = function(a) {
            _.vd(this.M);
            this.M.appendChild(this.h.g.createTextNode(String(a + "\u00a0\u25bc")))
        }
        ;
        Lx.prototype.ma = function() {
            Gx.prototype.ma.call(this);
            this.M = null
        }
        ;
        Lx.prototype.Vg = function(a) {
            this.Pa(a.currentTarget.value);
            this.dispatchEvent("change");
            this.Xd()
        }
        ;
        var Mx = function() {
            this.h = {};
            this.g = 0
        };
        Mx.prototype.j = function(a, b) {
            a = this.h[b];
            if (!a)
                return b;
            b = "";
            a.Xf && (b += "<" + a.Xf + a.attributes + ">");
            a.kf && (b += a.kf);
            a.Xe && (b += "</" + a.Xe + ">");
            return b
        }
        ;
        Mx.prototype.Xf = function(a, b) {
            Ln(a);
            var c = "";
            if (b)
                for (var d in b)
                    if (Object.prototype.hasOwnProperty.call(b, d)) {
                        if (!Jn.test(d))
                            throw Error("B");
                        var e = b[d];
                        if (null != e) {
                            var f = d;
                            if (e instanceof _.Mb)
                                e = _.Nb(e);
                            else if ("style" == f.toLowerCase()) {
                                var g = e;
                                if (!_.ya(g))
                                    throw Error("B");
                                if (!(g instanceof _.Tc)) {
                                    e = void 0;
                                    var h = "";
                                    for (e in g)
                                        if (Object.prototype.hasOwnProperty.call(g, e)) {
                                            if (!/^[-_a-zA-Z0-9]+$/.test(e))
                                                throw Error("A`" + e);
                                            var k = g[e];
                                            null != k && (k = Array.isArray(k) ? k.map(el).join(" ") : el(k),
                                            h += e + ":" + k + ";")
                                        }
                                    g = h ? new _.Tc(h,_.Sc) : _.Uc
                                }
                                e = Hn(g)
                            } else {
                                if (/^on/i.test(f))
                                    throw Error("B");
                                if (f.toLowerCase()in Mn)
                                    if (e instanceof _.Tb)
                                        e = _.Wa(e).toString();
                                    else if (e instanceof _.Mc)
                                        e = _.Yh(e);
                                    else if ("string" === typeof e)
                                        e = (bl(e) || _.Rc).Sa();
                                    else
                                        throw Error("B");
                            }
                            e.nb && (e = e.Sa());
                            f = f + '="' + zn(String(e)) + '"';
                            c += " " + f
                        }
                    }
            return Nx(this, {
                Xf: a,
                attributes: c
            })
        }
        ;
        Mx.prototype.Xe = function(a) {
            Ln(a);
            return Nx(this, {
                Xe: a
            })
        }
        ;
        Mx.prototype.text = function(a) {
            return Nx(this, {
                kf: Sn(a)
            })
        }
        ;
        var Nx = function(a, b) {
            a.g++;
            var c = "{SafeHtmlFormatter:" + a.g + "_" + _.id() + "}";
            a.h[Sn(c)] = b;
            return c
        };
        var Ox = function(a, b) {
            P.call(this, b);
            this.g = a && $k(a) || {};
            this.j = new _.Og(this)
        };
        _.A(Ox, P);
        var Px = {
            fm: 0,
            ql: 1,
            Ql: 2
        };
        _.l = Ox.prototype;
        _.l.U = function() {
            var a = _.vk(this.h, "div");
            It(a, "skiptranslate");
            It(a, "goog-te-gadget");
            a.dir = _.Qf.test(Xp) ? "rtl" : "ltr";
            Bp(a, !1);
            if (2 == this.g.layout)
                sl(a, jx({
                    id: V(this, "targetLanguage"),
                    Ch: "",
                    Bh: ""
                }));
            else {
                var b = new Mx;
                if (_.E && !En())
                    var c = "<span style=\"display:inline-block;vertical-align:middle;height:15px; width:51px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader( src='" + "https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png".replace(dp, Wo) + "',sizingMethod='scale');\"></span>";
                else
                    c = U.Je,
                    c = '<img src="' + T(mp("https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png")) + '" width="37px" height="14px" style="padding-right: 3px" alt="Google ' + T(c) + '">';
                var d = U.Je;
                var e = (0,
                _.L)('<span style="white-space:nowrap"><a class="' + T("VIpgJd-ZVi9od-l4eHX-hSRGPd") + '" href="' + T(kp("https://translate.google.com")) + '" target="_blank">' + c + $o(d) + "</a></span>");
                c = U;
                d = c.ni;
                e = e.Xc();
                e = Nx(b, {
                    kf: _.$c(e).toString()
                });
                c = d.call(c, e);
                d = Sn("SafeHtmlFormatter:");
                b = Sn(c).replace(new RegExp("\\{" + d + "[\\w&#;]+\\}","g"), (0,
                _.z)(b.j, b, []));
                b = _.ad(b);
                sl(a, jx({
                    id: V(this, "targetLanguage"),
                    Ch: "",
                    Bh: 1 == this.g.layout ? il(["\u00a0", "\u00a0", b]) : b
                }))
            }
            this.Aa(a)
        }
        ;
        _.l.sa = function() {
            Ox.P.sa.call(this);
            this.l = 2 == this.g.layout ? new Kx(null,this.h) : new Fx(this.h);
            this.j.J(this.l, "change", Tr(this, "chg_tgt_lang"));
            this.j.J(this.l, "load", this.gi);
            var a = this.h.C(V(this, "targetLanguage"));
            if (2 == this.g.layout) {
                var b = this.h.U("IMG", {
                    src: "https://www.google.com/images/cleardot.gif",
                    "class": "goog-te-gadget-icon",
                    alt: ""
                });
                b.style.backgroundImage = "url(" + gq + ")";
                b.style.backgroundPosition = "-65px 0px";
                var c = this.h.U("SPAN", {
                    style: "vertical-align: middle"
                });
                a.appendChild(b);
                a.appendChild(c);
                this.l.Oa(c);
                a.style.whiteSpace = "nowrap";
                a.className = "goog-te-gadget-simple"
            } else
                this.l.Oa(a),
                1 == this.g.layout && (a.style.display = "inline")
        }
        ;
        _.l.gi = function() {
            if (2 == this.g.layout) {
                var a = this.l
                  , b = this.h.C(V(this, "targetLanguage"));
                a.A.qb(a.D, "click", a.df);
                a.D = b;
                a.A.J(a.D, "click", a.df)
            }
            this.dispatchEvent("load")
        }
        ;
        _.l.ma = function() {
            Ox.P.ma.call(this);
            this.j.T();
            this.j = null;
            this.l.T();
            this.l = null
        }
        ;
        _.l.ta = function() {
            return this.l.ua()
        }
        ;
        _.l.va = function(a) {
            "" == a ? this.M && this.l.Zb(this.M) : this.G && this.l.Zb(this.G);
            this.l.Pa(a)
        }
        ;
        _.l.ga = function(a) {
            Bp(this.C(), a)
        }
        ;
        _.l.yb = function(a) {
            this.l.yb(a)
        }
        ;
        _.l.Rf = function(a, b) {
            this.M = a;
            this.G = b
        }
        ;
        var Qx = function(a, b) {
            P.call(this, b);
            this.g = a && $k(a) || {};
            this.g.Nb || (this.g.Nb = jq);
            this.j = new _.Og(this)
        };
        _.A(Qx, P);
        var Rx = {
            Wl: 1,
            Xl: 2,
            Yk: 3,
            Xk: 4
        };
        _.l = Qx.prototype;
        _.l.U = function() {
            var a = _.vk(this.h, "div");
            this.sb = !1;
            Bp(a, !1);
            var b = V(this, "container");
            b = (0,
            _.L)('<iframe id="' + T(b) + '" frameBorder=0 src="javascript:\'\'" class="' + T("VIpgJd-ZVi9od-SmfZ-OEVmcd") + ' skiptranslate" style="visibility:visible"></iframe>');
            sl(a, b);
            this.Aa(a)
        }
        ;
        _.l.sa = function() {
            Qx.P.sa.call(this);
            var a = _.Qf.test(Xp) ? "rtl" : "ltr"
              , b = _.$a(this.g.Nb)
              , c = V(this, "translate");
            this.C().id = V(this, "floatContainer");
            var d = {
                id: this.C().id,
                className: "goog-te-ftab-float"
            };
            this.C().className += " goog-te-ftab-float";
            switch (this.g.Rd) {
            case 2:
                var e = "goog-te-float-top";
                d.top = 0;
                d.right = 20;
                break;
            case 3:
                e = "goog-te-float-bottom";
                d.bottom = 0;
                d.right = 20;
                break;
            case 4:
                e = "goog-te-float-bottom";
                d.bottom = 0;
                d.left = 20;
                break;
            default:
                e = "goog-te-float-top",
                d.top = 0,
                d.left = 20
            }
            Dp(pn(new _.xg, d), this.C());
            this.B = this.h.C(V(this, "container"));
            this.j.J(this.B, "load", this.hi);
            Xr(this.B, (0,
            _.z)(function() {
                var f = bo(this.B)
                  , g = e
                  , h = U.qg;
                g = (0,
                _.L)('<head><meta http-equiv="Content-Type" content="text/html; charset=UTF8"><link rel="stylesheet" type="text/css" href="' + T(gp(b)) + '"></head><body class="' + T("VIpgJd-ZVi9od-SmfZ") + " " + T(g) + '" scroll="no" style="overflow:hidden" dir="' + T(a) + '"><a id="' + T(c) + '" href="javascript:void(0)" class="' + T("VIpgJd-ZVi9od-SmfZ-hSRGPd") + '"><img src="' + T(mp("https://www.google.com/images/cleardot.gif")) + '" style="background-image:url(' + T(mp(gq)) + ');background-position:-65px 0px"><span>' + $o(h) + "</span></a></body>").Xc();
                f.write(_.$c(g));
                f.close()
            }, this))
        }
        ;
        _.l.hi = function() {
            this.l = (new _.jd(bo(this.B))).C(V(this, "translate"));
            this.j.J(this.l, "click", Tr(this, "clk_trans"));
            Bp(this.C(), !0);
            var a = Fp(this.l);
            Bp(this.C(), !1);
            Hp(this.B, a);
            Hp(this.C(), a);
            this.dispatchEvent("load")
        }
        ;
        _.l.ma = function() {
            Qx.P.ma.call(this);
            this.j.T();
            this.j = null;
            $n(this.B);
            this.l = this.B = null
        }
        ;
        _.l.isVisible = function() {
            return this.sb
        }
        ;
        _.l.ga = function(a) {
            this.sb = a;
            Bp(this.C(), a)
        }
        ;
        var Sx = function(a, b) {
            P.call(this, b);
            this.A = new _.Og(this);
            this.g = a && $k(a) || {};
            this.g.Nb = jq;
            this.g.Vf = !1;
            _.M(this.h.g.body, "position", "relative");
            _.bi || _.M(this.h.g.body, "minHeight", "100%");
            _.M(this.h.g.documentElement, "height", "100%");
            _.M(this.h.g.body, "top", "0px");
            _.E && (window._bannerquirkfixleft = -parseInt("0" + this.h.g.body.leftMargin, 10),
            window._bannerquirkfixtop = -parseInt("0" + this.h.g.body.topMargin, 10) - 40)
        };
        _.A(Sx, P);
        _.l = Sx.prototype;
        _.l.Oa = function() {
            var a = this.h.g.body.firstChild;
            dt(this, a.parentNode, a)
        }
        ;
        _.l.U = function() {
            var a = _.vk(this.h, "div");
            this.sb = !1;
            Bp(a, !1);
            It(a, "skiptranslate");
            var b = V(this, "container");
            b = (0,
            _.L)('<iframe id="' + T(b) + '" class="' + T("VIpgJd-ZVi9od-ORHb-OEVmcd") + ' skiptranslate" frameBorder=0 src="#" style="visibility:visible"></iframe>');
            sl(a, b);
            this.Aa(a)
        }
        ;
        _.l.sa = function() {
            Sx.P.sa.call(this);
            var a = _.Qf.test(Xp) ? "rtl" : "ltr", b = _.$a(this.g.Nb), c = V(this, "promptSection"), d = V(this, "confirm"), e = V(this, "progressSection"), f = V(this, "progressValue"), g = V(this, "cancel"), h = V(this, "finishSection"), k = V(this, "restore"), m = V(this, "errorSection"), n = V(this, "errorContent"), p = V(this, "close"), q = V(this, "noAutoPopup"), r, w = [];
            this.g.Vf && w.push(ix({
                id: V(this, "promptSourceLang")
            }));
            w.push(ix({
                id: V(this, "promptTargetLang")
            }));
            var D = jn(U.xi.apply(null, w));
            w = [];
            this.g.Vf && w.push(ix({
                id: V(this, "finishSourceLang")
            }));
            w.push(ix({
                id: V(this, "finishTargetLang")
            }));
            var Q = jn(U.ti.apply(null, w));
            this.g.Qh && (r = this.g.Qh);
            this.B = this.h.C(V(this, "container"));
            this.A.J(this.B, "load", this.ii);
            Xr(this.B, (0,
            _.z)(function() {
                var W = bo(this.B)
                  , ha = r
                  , ce = U.Je
                  , $y = U.qg
                  , az = U.ui
                  , bz = U.Xh
                  , cz = U.oi
                  , dz = U.eg
                  , ez = U.eg;
                ha = (0,
                _.L)('<head><meta http-equiv="Content-Type" content="text/html; charset=UTF8"><link rel="stylesheet" type="text/css" href="' + T(gp(b)) + '"></head><body class="' + T("VIpgJd-ZVi9od-ORHb") + '" scroll="no" border=0 dir="' + T(a) + '"><table border=0 cellspacing=0 cellpadding=0 width=100% height=100%><tr valign=middle><td width=1 nowrap><a href="' + T(kp("https://translate.google.com")) + '" class="' + T("VIpgJd-ZVi9od-l4eHX-hSRGPd") + '" target="_blank"><img src="' + T(mp("https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_68x28dp.png")) + '" alt="Google ' + T(ce) + '"></a></td>' + (ha ? '<td width=1><img src="' + T(mp("https://www.google.com/images/cleardot.gif")) + '" width="9" height="15" title="' + T(ha) + '" alt="' + T(ha) + '" style="background-image:url(' + T(mp(gq)) + ');background-position:-56px 0px;margin:0 4px"></td>' : "") + '<td class="' + T("VIpgJd-ZVi9od-ORHb-KE6vqe") + '"></td><td><table border=0 cellspacing=0 cellpadding=0 height=100%><tr id="' + T(c) + '" style="display:none" valign=middle><td nowrap><span class="' + T("VIpgJd-ZVi9od-ORHb-bN97Pc") + '">' + $o(D) + '</span></td><td class="' + T("VIpgJd-ZVi9od-ORHb-KE6vqe") + '"></td><td nowrap><div class="' + T("VIpgJd-ZVi9od-LgbsSe") + '"><div><button id="' + T(d) + '"><b>' + $o($y) + '</b></button></div></div></td><td class="' + T("VIpgJd-ZVi9od-ORHb-KE6vqe") + '"></td><td nowrap><div class="' + T("VIpgJd-ZVi9od-LgbsSe") + '"><div><button id="' + T(q) + '"></button></div></div></td></tr><tr id="' + T(e) + '" style="display:none" valign=middle><td><span class="' + T("VIpgJd-ZVi9od-ORHb-bN97Pc") + '">' + $o(az) + '&nbsp;<span dir="ltr">(<b id="' + T(f) + '"></b>%)</span>&nbsp;<img src="' + T(mp(iq)) + '"></span></td><td class="' + T("VIpgJd-ZVi9od-ORHb-KE6vqe") + '"></td><td nowrap><div class="' + T("VIpgJd-ZVi9od-LgbsSe") + '"><div><button id="' + T(g) + '">' + $o(bz) + '</button></div></div></td></tr><tr id="' + T(h) + '" style="display:none"><td><span class="' + T("VIpgJd-ZVi9od-ORHb-bN97Pc") + '">' + $o(Q) + '</span></td><td class="' + T("VIpgJd-ZVi9od-ORHb-KE6vqe") + '"></td><td nowrap><div class="' + T("VIpgJd-ZVi9od-LgbsSe") + '"><div><button id="' + T(k) + '">' + $o(cz) + '</button></div></div></td></tr><tr id="' + T(m) + '" style="display:none" valign=middle><td><span id="' + T(n) + '" class="' + T("VIpgJd-ZVi9od-ORHb-bN97Pc") + '"></span></td></tr></table></td><td class="' + T("VIpgJd-ZVi9od-ORHb-KE6vqe") + '"></td><td width=1 id="options"></td><td width=1><a id="' + T(p) + '" class="' + T("VIpgJd-ZVi9od-TvD9Pc-hSRGPd") + '" href="#" title="' + T(dz) + '"><img src="' + T(mp("https://www.google.com/images/cleardot.gif")) + '" width="15" height="15" alt="' + T(ez) + '" style="background-image:url(' + T(mp(gq)) + ');background-position:-28px 0px"></a></td></tr></table></body>').Xc();
                W.write(_.$c(ha));
                W.close()
            }, this))
        }
        ;
        _.l.ii = function() {
            this.j = new _.jd(bo(this.B));
            Tx(this, U.gg);
            if (this.g.Nb == jq) {
                var a = "url(" + fq + ")";
                _.M(this.j.g.body, "backgroundImage", a);
                for (var b = this.j.g.getElementsByTagName("button"), c = 0; c < b.length; ++c) {
                    var d = b[c].parentNode;
                    _.M(d, "backgroundImage", a);
                    _.M(d, "backgroundRepeat", "repeat-x");
                    _.M(d, "backgroundPosition", "0 -39px")
                }
            }
            this.g.Vf && (this.s = new Jx(this.g,this.j));
            this.l = new Jx(this.g,this.j);
            this.D = new Lx(this.g,this.j);
            this.A.J(this.j.C(V(this, "confirm")), "click", Tr(this, "clk_confirm"));
            this.A.J(this.j.C(V(this, "cancel")), "click", Tr(this, "clk_cancel"));
            this.A.J(this.j.C(V(this, "restore")), "click", Tr(this, "clk_restore"));
            this.A.J(this.j.C(V(this, "close")), "click", Tr(this, "clk_close"));
            this.S = this.j.C(V(this, "noAutoPopup"));
            this.A.J(this.S, "click", Tr(this, "clk_no_ap"));
            this.s && this.A.J(this.s, "change", Tr(this, "chg_src_lang"));
            this.A.J(this.l, "change", Tr(this, "chg_tgt_lang"));
            this.A.J(this.D, "change", this.vj);
            a = new Nr((0,
            _.z)(this.ji, this));
            this.s && this.A.J(this.s, "load", a.register());
            this.A.J(this.l, "load", a.register());
            this.A.J(this.D, "load", a.register());
            a.finish();
            this.s && this.s.Oa(this.j.C(V(this, "promptSourceLang")));
            this.l.Oa(this.j.C(V(this, "promptTargetLang")));
            this.D.Oa(this.j.C("options"))
        }
        ;
        _.l.ji = function() {
            this.D.Lh(U.mi);
            this.D.xd({
                turn_off_site: U.wi,
                s1: "---",
                learn_more: U.li
            });
            this.dispatchEvent("load")
        }
        ;
        _.l.vj = function() {
            switch (this.D.ua()) {
            case "learn_more":
                window.open(nq, "_blank");
                break;
            case "turn_off_site":
                this.dispatchEvent("clk_no_ap_site")
            }
        }
        ;
        _.l.ma = function() {
            this.ga(!1);
            Sx.P.ma.call(this);
            this.A.T();
            this.A = null;
            this.s && (this.s.T(),
            this.s = null);
            this.l.T();
            this.l = null;
            this.D.T();
            this.D = null;
            $n(this.B);
            this.fd = this.j = null
        }
        ;
        _.l.lb = function() {
            return this.s ? this.s.ua() : ""
        }
        ;
        _.l.ta = function() {
            return this.l.ua()
        }
        ;
        _.l.ac = function(a) {
            this.s && this.s.Pa(a);
            this.V && this.V[a] && this.j.Vc(this.S, U.vi(this.V[a]))
        }
        ;
        _.l.va = function(a) {
            this.l.Pa(a)
        }
        ;
        var Ux = function(a, b, c, d) {
            if (a.fd != b) {
                a.fd = b;
                if (0 == b) {
                    a.s && Ex(a.s, a.j.C(V(a, "promptSourceLang")));
                    if (a.M) {
                        var e = a.ta();
                        a.l.Zb(a.M);
                        a.va(e)
                    }
                    Ex(a.l, a.j.C(V(a, "promptTargetLang")))
                } else
                    2 == b && (a.s && Ex(a.s, a.j.C(V(a, "finishSourceLang"))),
                    a.G && (e = a.ta(),
                    a.l.Zb(a.G),
                    a.va(e)),
                    Ex(a.l, a.j.C(V(a, "finishTargetLang"))));
                e = {};
                e[-1] = a.j.C(V(a, "errorSection"));
                e[0] = a.j.C(V(a, "promptSection"));
                e[1] = a.j.C(V(a, "progressSection"));
                e[2] = a.j.C(V(a, "finishSection"));
                for (var f in e)
                    e[f] !== Object.prototype[f] && Bp(e[f], f == b)
            }
            c && a.ga(!0);
            a.S.parentNode.parentNode.style.display = d ? "block" : "none"
        };
        Sx.prototype.isVisible = function() {
            return this.sb
        }
        ;
        Sx.prototype.ga = function(a) {
            if (this.sb != a) {
                this.sb = a;
                if (_.E)
                    var b = parseInt("0" + this.h.g.body.leftMargin, 10)
                      , c = parseInt("0" + this.h.g.body.topMargin, 10);
                var d = "BackCompat" == this.h.g.compatMode;
                a ? (_.M(this.h.g.body, "top", "40px"),
                Bp(this.C(), !0),
                _.E && (En() ? (window._bannerquirkfixleft = window._bannerquirkfixtop = 0,
                d && (this.h.g.body.topMargin = c + 40)) : d ? (this.h.g.body.topMargin = c + 40,
                window._bannerquirkfixleft = window._bannerquirkfixtop = 0) : (window._bannerquirkfixleft = -b,
                window._bannerquirkfixtop = -c - 40))) : (_.M(this.h.g.body, "top", "0px"),
                Bp(this.C(), !1),
                d && 40 <= c && (this.h.g.body.topMargin = c - 40))
            }
        }
        ;
        Sx.prototype.Qf = function(a) {
            this.j.Vc(this.j.C(V(this, "progressValue")), a)
        }
        ;
        var Tx = function(a, b) {
            a.j.Vc(a.j.C(V(a, "errorContent")), b)
        };
        Sx.prototype.Rf = function(a, b) {
            this.M = a;
            this.G = b;
            this.l.Zb(a)
        }
        ;
        var Wx = function(a, b) {
            _.B.call(this);
            "string" == _.wb(a) && (b = a,
            a = {});
            "string" == _.wb(b) && (b = S(String(b)));
            this.V = b;
            this.s = new _.Og(this);
            this.ba = void 0;
            a = Object(a);
            this.o = "auto";
            !(b = window.parent != window) && (b = (!window.external || !window.external.googleToolbarVersion || 6.2 > parseFloat(window.external.googleToolbarVersion)) && (!window.gtbExternal || !window.gtbExternal.isTranslateEnabled || !window.gtbExternal.isTranslateEnabled())) && (b = navigator.appVersion && navigator.appVersion.match(/\sChrome\/((\d+)\.(\d+)\.[\d\.]+)\s/),
            b = !(b && b[2] && b[3] && 4001 <= 1E3 * Number(b[2]) + Number(b[3])));
            this.g = {
                Ne: b,
                Jg: !1,
                Oe: null,
                Hd: null,
                lf: [],
                Hg: [],
                Gi: !1,
                Mc: !1,
                apiKey: "",
                Lg: !1,
                bf: "",
                layout: 0,
                Cg: !1
            };
            this.xa = {
                Nb: jq,
                Qh: "https://" == eq ? U.ri : null
            };
            this.Y = {
                Nb: jq,
                Rd: null
            };
            a && ("autoDisplay"in a && (this.g.Ne = this.g.Ne && !!a.autoDisplay),
            "multilanguagePage"in a && (this.g.Mc = !!a.multilanguagePage),
            "gaTrack"in a && (this.g.Lg = !!a.gaTrack),
            "layout"in a && (this.g.layout = a.layout),
            a.pageLanguage && (this.g.re = Ur(a.pageLanguage)),
            a.includedLanguages && (this.g.lf = a.includedLanguages.split(",")),
            a.excludedLanguages && (this.g.Hg = a.excludedLanguages.split(",")),
            this.g.re && (this.o = this.g.re),
            a.key && (this.g.apiKey = a.key),
            a.gaId && (this.g.bf = a.gaId),
            this.Y.Rd = Number(a.floatPosition) || this.Y.Rd,
            "disableAutoTranslation"in a && (this.g.Cg = !!a.disableAutoTranslation),
            a.remoteApiProxyHandlers && (this.ba = a.remoteApiProxyHandlers));
            !this.g.Cg && Vx(this) && (this.g.Jg = !0);
            this.B = {};
            if ((a = document.cookie.match(/(^|; )googtransopt=(.*?)(;|$)/)) && a[2])
                for (this.B = {},
                a = _.hd(a[2]).split("|"),
                b = 0; b < a.length; ++b) {
                    var c = a[b].split("=");
                    c[0] && (this.B[c[0]] = c[1])
                }
            this.ra = new Rv({
                apiKey: this.g.apiKey,
                kc: 1,
                Uf: !0,
                vn: lq
            },{
                client: cq,
                u: window.location.href
            });
            this.D = new Cx(void 0,this.ra,void 0,void 0,this.g.apiKey,void 0,void 0,new nx,void 0,void 0,this.ba);
            this.H = !1;
            this.s.J(window, "pagehide", this.T);
            this.G = new Nr((0,
            _.z)(this.pj, this));
            this.L = new Nr((0,
            _.z)(this.tj, this));
            this.M = new Pr((0,
            _.z)(this.Mj, this));
            this.h = new Sx(this.xa);
            this.D.Ud(this.G.register((0,
            _.z)(this.oj, this)), Xp);
            this.V ? (this.l = new Ox(this.g),
            this.s.J(this.l, "load", this.G.register()),
            this.s.J(this.l, "chg_tgt_lang", Qr(this.M, this.L.delay((0,
            _.z)(this.nj, this)))),
            this.l.Oa(this.V)) : this.Y.Rd && (this.A = new Qx(this.Y),
            this.s.J(this.A, "load", this.G.register()),
            this.s.J(this.A, "clk_trans", Qr(this.M, this.L.delay((0,
            _.z)(this.mj, this)))),
            this.A.Oa());
            !this.g.re && this.g.Gi && this.D.Td(this.G.register((0,
            _.z)(this.lj, this)));
            this.G.finish()
        };
        _.y(Wx, _.B);
        var Vx = function(a) {
            function b(f, g) {
                if (f = _.hd(f).match("^\\((([a-zA-Z\\-_]*)\\|)?([a-zA-Z\\-_]*)\\)|^/(([a-zA-Z\\-_]*)/)?([a-zA-Z\\-_]*)")) {
                    if (f[3])
                        return g.g.Oe = f[2],
                        g.g.Hd = f[3],
                        !0;
                    if (f[6])
                        return g.g.Oe = f[5],
                        g.g.Hd = f[6],
                        !0
                }
                return !1
            }
            var c = {
                url: function() {
                    var f = window.location.href.match(/#.*googtrans(.*)/);
                    return f && f[1]
                },
                cookie: function() {
                    var f = document.cookie.match(/(^|; )googtrans=(.*?)(;|$)/);
                    return f && f[2]
                }
            }, d;
            for (d in c)
                if (c[d] !== Object.prototype[d]) {
                    var e = c[d]();
                    if (e && b(e, a))
                        return d
                }
            return ""
        }
          , Xx = function(a, b) {
            for (var c = window.location.hostname.split("."); 2 < c.length; )
                c.shift();
            c = ";domain=" + c.join(".");
            null != b ? a = a + "=" + b : (b = new Date,
            b.setTime(b.getTime() - 1),
            a = a + "=none;expires=" + b.toGMTString());
            a += ";path=/";
            document.cookie = a;
            try {
                document.cookie = a + c
            } catch (d) {}
        }
          , Yx = function(a, b) {
            var c = null;
            void 0 !== b && (c = void 0 !== a ? "/" + a + "/" + b : "/" + b);
            Xx("googtrans", c)
        };
        _.l = Wx.prototype;
        _.l.oj = function(a) {
            this.j = Ur(Xp);
            a = a || {};
            var b = a.targetLanguages || [];
            this.N = {
                sl: Wm(a.sourceLanguages || []),
                tl: Wm(b)
            };
            this.F = {};
            this.S = {};
            a = !this.g.lf.length;
            b = Mr(this.g.lf);
            var c = Mr(this.g.Hg);
            this.F[Xp] = "";
            this.S[Xp] = "";
            for (var d in this.N.tl)
                this.N.tl[d] === Object.prototype[d] || !(a || d in b) || d in c || (this.S[d] = this.N.tl[d],
                d == this.g.re && !this.g.Mc) || (this.F[d] = this.N.tl[d]);
            this.F[Xp] || delete this.F[Xp];
            this.S[Xp] || delete this.S[Xp];
            this.qa = $k(this.N.sl)
        }
        ;
        _.l.lj = function(a) {
            a && (this.o = Ur(a))
        }
        ;
        _.l.pj = function() {
            delete this.G;
            if (this.N) {
                this.o = this.o || this.g.Oe;
                this.j = this.g.Hd || this.j;
                var a = this.g.Jg || this.g.Ne && this.o != this.j && !(this.o in aq) && "1" != this.B.os && "1" != this.B["o" + this.o];
                "zh-TW" == this.o && (this.o = "zh-CN");
                this.qa[this.o] || (a = !1,
                this.o = "auto");
                if (!this.F[this.j])
                    if (a = !1,
                    this.F.en)
                        this.j = "en";
                    else
                        for (var b in this.F)
                            if (this.F[b] !== Object.prototype[b]) {
                                this.j = b;
                                break
                            }
                if (this.l) {
                    b = this.F;
                    var c = {
                        "": U.pi
                    }, d;
                    for (d in b)
                        b[d] !== Object.prototype[d] && (c[d] = b[d]);
                    this.l.Rf(c, this.S);
                    this.l.va("")
                }
                !Zp && a ? this.g.Hd ? Qr(this.M, this.L.delay((0,
                _.z)(this.we, this, !0, !0))).call() : (this.H = !0,
                Qr(this.M, this.L.delay((0,
                _.z)(this.we, this))).call(),
                Rm("te_ap", {
                    sl: this.o
                })) : (this.A && this.A.ga(!0),
                this.l && this.l.ga(!0));
                window.google.translate.TranslateService && this.yb(!1);
                this.M.finish()
            }
        }
        ;
        _.l.tj = function() {
            var a = this.h
              , b = this.qa;
            a.s && a.s.Zb(b);
            a.V = b;
            this.h.Rf(this.F, this.S);
            this.h.ac(this.o);
            this.h.va(this.j);
            this.s.J(this.h, "clk_confirm", this.ij);
            this.s.J(this.h, "clk_cancel", this.hj);
            this.s.J(this.h, "clk_restore", this.cf);
            this.s.J(this.h, "clk_close", this.Vd);
            this.s.J(this.h, "clk_no_ap", this.jj);
            this.s.J(this.h, "clk_no_ap_site", this.kj);
            this.s.J(this.h, "chg_src_lang", this.Rg);
            this.s.J(this.h, "chg_tgt_lang", this.Rg);
            this.l && this.l.ga(!0)
        }
        ;
        _.l.Mj = function() {
            this.s.J(this.h, "load", this.L.register());
            this.h.Oa();
            this.L.finish()
        }
        ;
        _.l.I = function() {
            this.D.restore();
            _.B.prototype.I.call(this);
            this.D.T();
            this.s.T();
            this.s = null;
            this.h && this.h.T();
            this.h = null;
            this.A && this.A.T();
            this.A = null;
            this.l && this.l.T();
            this.V = this.l = null
        }
        ;
        _.l.ij = function() {
            !this.h.isVisible() || !this.g.Mc && as(this.o, this.h.ta()) || (this.H && Rm("te_apt", {
                sl: this.o
            }),
            Zx(this, !1),
            this.l && this.l.va(this.h.ta()))
        }
        ;
        _.l.hj = function() {
            this.h.isVisible() && ($x(this),
            Ux(this.h, 0),
            this.l && this.l.va(""))
        }
        ;
        _.l.cf = function() {
            this.h.isVisible() && ($x(this),
            Ux(this.h, 0));
            this.l && this.l.va("")
        }
        ;
        _.l.Vd = function() {
            this.h.isVisible() && (this.H && (this.H = !1,
            Rm("te_apc", {
                sl: this.o
            })),
            $x(this),
            this.h.ga(!1),
            this.l && this.l.va(""),
            this.A && this.A.ga(!0))
        }
        ;
        _.l.jj = function() {
            this.h.isVisible() && (this.B["o" + this.o] = "1",
            Rm("te_apr", {
                sl: this.o
            }),
            this.H = !1,
            this.Vd())
        }
        ;
        _.l.kj = function() {
            if (this.h.isVisible()) {
                this.H = !1;
                this.B.os = "1";
                var a = null;
                if (this.B) {
                    a = [];
                    for (var b in this.B)
                        this.B[b] !== Object.prototype[b] && a.push(b + "=" + this.B[b]);
                    a = a.join("|")
                }
                Xx("googtransopt", a);
                this.Vd()
            }
        }
        ;
        _.l.Rg = function() {
            this.h.isVisible() && (!this.g.Mc && as(this.o, this.h.ta()) ? this.cf() : (this.o = this.h.lb() || this.o,
            this.j = this.h.ta(),
            2 == this.h.fd && (this.l && this.l.va(this.h.ta()),
            Zx(this))))
        }
        ;
        _.l.we = function(a, b) {
            this.h.isVisible() || (this.A && this.A.ga(!1),
            a ? Zx(this, b) : Ux(this.h, 0, !0, this.H))
        }
        ;
        _.l.Dk = function(a, b) {
            Qr(this.M, this.L.delay((0,
            _.z)(this.we, this, a, b))).call()
        }
        ;
        _.l.mj = function() {
            this.we(2 == this.h.fd)
        }
        ;
        _.l.nj = function() {
            this.l.ta() ? !this.g.Mc && as(this.o, this.h.ta()) ? this.cf() : (this.j = this.l.ta(),
            this.h.va(this.j),
            Zx(this)) : this.l.va(this.j)
        }
        ;
        var Zx = function(a, b) {
            if (window.google.translate.TranslateService)
                try {
                    window.google.translate.TranslateService.getInstance().restore()
                } catch (c) {}
            Yx(a.o, a.j);
            a.H = !1;
            !b && a.o in aq && Rm("te_ape", {
                sl: a.o
            });
            a.h.Qf(0);
            Ux(a.h, 1, !0);
            a.D.Mh(!!b);
            window.setTimeout((0,
            _.z)(a.D.ze, a.D, a.g.Mc ? "auto" : a.o, a.j, (0,
            _.z)(a.Da, a), void 0, void 0), 0);
            if (a.g.Lg && window._gaq && window._gat)
                try {
                    a.g.bf ? window._gat._getTracker(a.g.bf)._trackEvent("Google Website Translator", "Translate", a.j) : window._gat._getTrackerByName()._trackEvent("Google Website Translator", "Translate", a.j)
                } catch (c) {}
        };
        Wx.prototype.Da = function(a, b, c) {
            "function" == typeof this.Ia && this.Ia();
            this.h.isVisible() && 1 == this.h.fd && (c ? ($x(this),
            Ux(this.h, -1, !0),
            2 == c ? Tx(this.h, U.ki) : Tx(this.h, U.gg)) : (this.h.Qf(a),
            b && (this.l && this.l.va(this.j),
            this.h.ac(this.o),
            Ux(this.h, 2))))
        }
        ;
        var $x = function(a) {
            Yx();
            window.setTimeout((0,
            _.z)(a.D.restore, a.D, null), 0)
        };
        Wx.prototype.yb = function(a) {
            a || this.Vd();
            this.l && this.l.yb(a);
            this.A && this.A.ga(a)
        }
        ;
        var ay = function(a) {
            if (a && (a = String(a),
            a = a.split("."),
            a.length)) {
                for (var b = window, c = 0; c < a.length; ++c) {
                    var d = a[c];
                    if (!(d && d in b))
                        return;
                    b = b[d]
                }
                return b
            }
        };
        var by = ay("google.translate.m");
        if (by)
            for (var cy in U)
                if (U[cy] !== Object.prototype[U[cy]] && U[cy]) {
                    var dy = U[cy]();
                    U[cy] = by[dy] ? by[dy] : Ks
                }
        if (1 == bq) {
            var ey = null
              , fy = function(a) {
                if (!ey) {
                    var b, c, d, e;
                    a && ("key"in a && (b = a.key),
                    "serverParams"in a && (c = a.serverParams),
                    "timeInfo"in a && (d = a.timeInfo),
                    "remoteApiProxyHandlers"in a && (e = a.remoteApiProxyHandlers),
                    (a = bs()) && (c = a));
                    a = 0;
                    if ("te_lib" == cq || _.tc)
                        a = 3;
                    ey = new Cx(void 0,new Rv({
                        apiKey: b,
                        kc: a,
                        Uf: !0,
                        trackVisibility: "tvis" == c
                    }),void 0,void 0,b,c,d,void 0,void 0,void 0,e);
                    ey.constructor = function() {}
                    ;
                    ey.isAvailable = ey.vb;
                    ey.getSupportedLanguages = ey.Ud;
                    ey.getPageLanguage = ey.Td;
                    ey.setClickThrough = ey.Mh;
                    ey.translatePage = ey.ze;
                    ey.restore = ey.restore;
                    ey.isTranslating = ey.ei;
                    ey.setCheckVisibility = ey.Bk
                }
                return ey
            };
            fy.getInstance = function() {
                return ey
            }
            ;
            _.Db("google.translate.TranslateService", fy);
            Rm("te_li")
        } else {
            var gy = null
              , hy = function(a, b) {
                gy || (gy = new Wx(a,b),
                gy.constructor = function() {}
                );
                return gy
            };
            hy.getInstance = function() {
                return gy
            }
            ;
            _.Db("google.translate.TranslateElement", hy);
            Wx.prototype.dispose = Wx.prototype.T;
            Wx.prototype.showBanner = Wx.prototype.Dk;
            Wx.prototype.setEnabled = Wx.prototype.yb;
            _.Db("google.translate.TranslateElement.FloatPosition", Rx);
            Rx.TOP_LEFT = 1;
            Rx.TOP_RIGHT = 2;
            Rx.BOTTOM_RIGHT = 3;
            Rx.BOTTOM_LEFT = 4;
            _.Db("google.translate.TranslateElement.InlineLayout", Px);
            Px.VERTICAL = 0;
            Px.HORIZONTAL = 1;
            Px.SIMPLE = 2
        }
        (function() {
            for (var a in Object.prototype) {
                _.Lc = function(d, e, f) {
                    for (var g in d)
                        d[g] !== Object.prototype[g] && e.call(f, d[g], g, d)
                }
                ;
                break
            }
            var b = _.Cb()
              , c = ay(Yp);
            c && "function" == typeof c && (1 == bq ? c() : function e() {
                var f = document.readyState;
                "undefined" == _.wb(f) || "complete" == f || "interactive" == f || 2E4 <= _.Cb() - b ? c() : window.setTimeout(e, 500)
            }())
        }
        )();
        _.pa();
    } catch (e) {
        _._DumpException(e)
    }
}
).call(this, this.default_tr);
// Google Inc.
