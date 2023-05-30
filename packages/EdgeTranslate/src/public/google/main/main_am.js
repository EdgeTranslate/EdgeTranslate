(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var d = this || self;
    function e(a, v) {
        a = a.split(".");
        var b = d;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var c; a.length && (c = a.shift()); )
            a.length || void 0 === v
                ? b[c] && b[c] !== Object.prototype[c]
                    ? (b = b[c])
                    : (b = b[c] = {})
                : (b[c] = v);
    }
    var f = {
        0: "\u1270\u122d\u1309\u121d",
        1: "\u12ed\u1245\u122d",
        2: "\u12dd\u130b",
        3: function(a) {
            return (
                "\u12ed\u1205\u1295 \u1308\u133d Google \u1260\u122b\u1235-\u1230\u122d \u12c8\u12f0\u1361-" +
                (a + " \u1270\u122d\u1309\u121e\u1273\u120d\u1362")
            );
        },
        4: function(a) {
            return "\u12c8\u12f0\u1361-" + (a + " \u1270\u122d\u1309\u121e\u1273\u120d");
        },
        5: "\u1235\u1205\u1270\u1275\u1361- \u12a0\u1308\u120d\u130b\u12e9 \u1325\u12eb\u1244\u12ce\u1275\u1295 \u120a\u12eb\u1320\u1293\u1245\u1245 \u12a0\u120d\u127b\u1208\u121d\u1362 \u1260\u128b\u120b \u12a5\u1295\u12f0\u1308\u1293 \u12ed\u121e\u12ad\u1229\u1362",
        6: "\u1270\u1328\u121b\u122a \u12ed\u1228\u12f1",
        7: function(a) {
            return "\u1260" + (a + " \u1283\u12ed\u120d \u12e8\u1270\u1230\u1320\u12cd");
        },
        8: "\u1275\u122d\u1309\u121d",
        9: "\u1275\u122d\u1309\u121d \u1260\u1202\u12f0\u1275 \u120b\u12ed",
        10: function(a) {
            return (
                "\u12ed\u1205\u1295 \u1308\u133d Google \u1275\u122d\u1309\u121d\u1295 \u1260\u1218\u1320\u1240\u121d \u12c8\u12f0\u1361- " +
                (a + " \u1275\u122d\u1309\u121d?")
            );
        },
        11: function(a) {
            return "\u12ed\u1205\u1295 \u1308\u133d \u1260\u1361- " + (a + " \u12a0\u1233\u12ed");
        },
        12: "\u12e8\u1218\u1300\u1218\u122a\u12cd\u1295 \u12a0\u1233\u12ed",
        13: "\u12e8\u12da\u1205 \u12e8\u12a0\u12ab\u1263\u1262 \u134b\u12ed\u120d \u12ed\u12d8\u1275 \u12a0\u1235\u1270\u121b\u121b\u129d \u130d\u1295\u1299\u1290\u1275\u1295 \u1260\u1218\u1320\u1240\u121d \u12c8\u12f0 Google \u1208\u1275\u122d\u1309\u121d \u12ed\u120b\u12ab\u120d\u1362",
        14: "\u12e8\u12da\u1205 \u12a0\u1235\u1270\u121b\u121b\u129d \u1308\u133d \u12ed\u12d8\u1275 \u12a0\u1235\u1270\u121b\u121b\u129d \u130d\u1295\u1299\u1290\u1275\u1295 \u1260\u1218\u1320\u1240\u121d \u12c8\u12f0 Google \u1208\u1275\u122d\u1309\u121d \u12ed\u120b\u12ab\u120d\u1362",
        15: "\u12e8\u12da\u1205 \u12cd\u1235\u1320\u1218\u1228\u1265 \u1308\u133d \u12ed\u12d8\u1275 \u12a0\u1235\u1270\u121b\u121b\u129d \u130d\u1295\u1299\u1290\u1275\u1295 \u1260\u1218\u1320\u1240\u121d \u12c8\u12f0 Google \u1208\u1275\u122d\u1309\u121d \u12ed\u120b\u12ab\u120d\u1362",
        16: "\u124b\u1295\u124b \u121d\u1228\u1325",
        17: function(a) {
            return "\u12e8" + (a + " \u1275\u122d\u1309\u121d\u1295 \u12a0\u1325\u134b");
        },
        18: function(a) {
            return "\u1208\u1361- " + (a + " \u12a0\u1325\u134b");
        },
        19: "\u1201\u120d\u130a\u12dc\u121d \u12f0\u1265\u1245",
        20: "\u12e8\u1218\u1300\u1218\u122a\u12eb\u12cd \u133d\u1211\u134d\u1361-",
        21: "\u12e8\u1270\u123b\u1208 \u1275\u122d\u1309\u121d \u12eb\u1260\u122d\u12ad\u1271",
        22: "\u12eb\u1260\u122d\u12ad\u1271",
        23: "\u1201\u1209\u1295\u121d \u1270\u122d\u1309\u121d",
        24: "\u1201\u1209\u1295\u121d \u12c8\u12f0 \u1290\u1260\u1229\u1260\u1275 \u1218\u120d\u1235",
        25: "\u1201\u1209\u121d \u12ed\u1245\u122d",
        26: "\u12c8\u12f0 \u124b\u1295\u124b\u12ec \u12a8\u134d\u120e\u127d \u1270\u122d\u1309\u121d",
        27: function(a) {
            return (
                "\u1201\u1209\u1291\u121d \u12c8\u12f0 " + (a + " \u1218\u1270\u122d\u130e\u121d")
            );
        },
        28: "\u12e8\u1218\u1300\u1218\u122a\u12eb\u12ce\u1279\u1295 \u124b\u1295\u124b\u12ce\u127d \u12a0\u1233\u12ed",
        29: "\u12a0\u121b\u122b\u132e\u127d",
        30: "\u1208\u12da\u1205 \u1323\u1262\u12eb \u1275\u122d\u1309\u121d\u1295 \u12a0\u1325\u134b",
        31: null,
        32: "\u12a0\u121b\u122b\u132d \u1275\u122d\u1309\u121e\u127d\u1295 \u12a0\u1233\u12ed",
        33: "\u12a0\u121b\u122b\u132d \u1275\u122d\u1309\u121e\u127d\u1295 \u1208\u121b\u130d\u1298\u1275 \u1243\u120b\u1275 \u120b\u12ed \u12a8\u120b\u12ed \u1320\u1245 \u12eb\u12f5\u122d\u1309",
        34: "\u12ed\u1320\u1240\u1219",
        35: "\u1245\u12f0\u121d \u1270\u12a8\u1270\u120d\u1295 \u1208\u121b\u1235\u1270\u12ab\u12a8\u120d \u12a8\u1240\u12eb\u122a /shift / \u1241\u120d\u134d \u130b\u122d \u12ed\u130e\u1275\u1271\u1362",
        36: "\u1208\u12a0\u121b\u122b\u132d \u1275\u122d\u1309\u121e\u127d \u1320\u1245 \u12eb\u12f5\u122d\u1309",
        37: "\u1245\u12f0\u121d \u1270\u12a8\u1270\u120d\u1295 \u120b\u121b\u1235\u1270\u12ab\u12a8\u120d \u1241\u120d\u134d \u1240\u12eb\u122a /shift/ \u1241\u120d\u134d \u1270\u132d\u1290\u12cd \u12ed\u12eb\u12d9\u1363 \u1320\u1245 \u12eb\u12f5\u122d\u1309 \u12a5\u1293 \u12a8\u120b\u12ed \u12eb\u1209 \u1243\u120b\u1275\u1295 \u12ed\u130e\u1275\u1271\u1362",
        38: "\u12e8\u12a5\u122d\u1235\u12ce\u1295 \u12e8\u1275\u122d\u1309\u121d \u1200\u1233\u1265 \u1208Google \u1275\u122d\u1309\u121d \u1235\u120b\u1260\u1228\u12a8\u1271 \u12a5\u1293\u1218\u1230\u130d\u1293\u1295\u1362",
        39: "\u1208\u12da\u1205 \u1323\u1262\u12eb \u1275\u122d\u1309\u121d\u1295 \u12a0\u1235\u1270\u12f3\u12f5\u122d",
        40: "\u1208\u12a0\u121b\u122b\u132d \u1275\u122d\u1309\u121e\u127d \u12a0\u1295\u12f5 \u1243\u120d \u120b\u12ed \u1320\u1245 \u12eb\u12f5\u122d\u1309\u1363 \u12c8\u12ed\u121d  \u1260\u1240\u1325\u1273 \u1208\u121b\u1228\u121d/\u1208\u121b\u123b\u123b\u120d \u1201\u1208\u1275-\u1320\u1245 \u12eb\u12f5\u122d\u1309\u1362",
        41: "\u12e8\u1218\u1300\u1218\u122a\u12eb\u12cd \u133d\u1211\u134d",
        42: "\u1275\u122d\u1309\u121d",
        43: "\u1270\u122d\u1309\u121d",
        44: "\u12a5\u122d\u121b\u1275\u12ce/\u12eb\u12f0\u1228\u1309\u1275 \u121b\u1235\u1270\u12ab\u12ab\u12eb \u1308\u1262 \u1270\u12f0\u122d\u1313\u120d\u1362",
        45: "\u1235\u1205\u1270\u1275\u1361- \u12e8\u12f5\u1228 \u1308\u1339 \u124b\u1295\u124b \u12e8\u121a\u12f0\u1308\u1348 \u12a0\u12ed\u12f0\u1208\u121d\u1362",
        46: "\u12e8\u124b\u1295\u124b \u1218\u1270\u122d\u130e\u121a\u12eb \u1218\u130d\u1265\u122d"
    };
    var g = window.google && google.translate && google.translate._const;
    if (g) {
        var h;
        a: {
            for (var k = [], l = [""], m = 0; m < l.length; ++m) {
                var n = l[m].split(","),
                    p = n[0];
                if (p) {
                    var q = Number(n[1]);
                    if (!(!q || 0.1 < q || 0 > q)) {
                        var r = Number(n[2]),
                            t = new Date(),
                            u = 1e4 * t.getFullYear() + 100 * (t.getMonth() + 1) + t.getDate();
                        !r || r < u || k.push({ version: p, ratio: q, a: r });
                    }
                }
            }
            var w = 0,
                x = window.location.href.match(/google\.translate\.element\.random=([\d\.]+)/),
                y = Number(x && x[1]) || Math.random();
            for (m = 0; m < k.length; ++m) {
                var z = k[m];
                w += z.ratio;
                if (1 <= w) break;
                if (y < w) {
                    h = z.version;
                    break a;
                }
            }
            h = "TE_20200210_00";
        }
        var A = "/element/%s/e/js/element/element_main.js".replace("%s", h);
        if ("0" == h) {
            var B = " element %s e js element element_main.js".split(" ");
            B[B.length - 1] = "main_am.js";
            A = B.join("/").replace("%s", h);
        }
        if (g._cjlc) g._cjlc(this.EDGE_TRANSLATE_URL + "google/element_main.js");
        else {
            var C = this.EDGE_TRANSLATE_URL + "google/element_main.js",
                D = document.createElement("script");
            D.type = "text/javascript";
            D.charset = "UTF-8";
            D.src = C;
            var E = document.getElementsByTagName("head")[0];
            E || (E = document.body.parentNode.appendChild(document.createElement("head")));
            E.appendChild(D);
        }
        e("google.translate.m", f);
        e("google.translate.v", h);
    }
}.call(window));
