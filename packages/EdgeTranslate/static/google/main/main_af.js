(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var d = "Vertaal",
        e = this || self;
    function f(a, w) {
        a = a.split(".");
        var b = e;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var c; a.length && (c = a.shift()); )
            a.length || void 0 === w
                ? b[c] && b[c] !== Object.prototype[c]
                    ? (b = b[c])
                    : (b = b[c] = {})
                : (b[c] = w);
    }
    var g = {
        0: d,
        1: "Kanselleer",
        2: "Sluit",
        3: function(a) {
            return "Google het hierdie bladsy outomaties vertaal na:" + a;
        },
        4: function(a) {
            return "Vertaal na: " + a;
        },
        5: "Fout: Die bediener kon nie aan jou versoek voldoen nie. Probeer weer later.",
        6: "Vind meer uit",
        7: function(a) {
            return "Aangedryf deur " + a;
        },
        8: d,
        9: "Vertaling aan die gang",
        10: function(a) {
            return "Vertaal hierdie bladsy na: " + (a + " deur Google Vertaal te gebruik?");
        },
        11: function(a) {
            return "Lees hierdie bladsy in: " + a;
        },
        12: "Toon oorspronklike",
        13: "Die inhoud van hierdie plaaslike l\u00eaer sal na Google gestuur word deur 'n veilige konneksie te gebruik.",
        14: "Die inhoud van hierdie veilige blad sal na Google gestuur word deur 'n veilige konneksie te gebruik.",
        15: "Die inhoud van hierdie intranet blad sal na Google gestuur word deur 'n veilige konneksie te gebruik.",
        16: "Kies taal",
        17: function(a) {
            return "Skakel " + (a + " vertaling af");
        },
        18: function(a) {
            return "Skakel af vir: " + a;
        },
        19: "Verberg altyd",
        20: "Oorspronklike teks:",
        21: "Dra 'n beter vertaling by",
        22: "Dra by",
        23: "Vertaal alles",
        24: "Herstel alles",
        25: "Kanselleer alles",
        26: "Vertaal dele na my taal",
        27: function(a) {
            return "Vertaal alles na " + a;
        },
        28: "Toon oorspronklike tale",
        29: "Opsies",
        30: "Skakel vertaling af vir hierdie webwerf",
        31: null,
        32: "Wys alternatiewe vertalings.",
        33: "Klik op woorde hierbo om alternatiewe vertalings te kry",
        34: "Gebruik",
        35: "Trek met Shift-sleutel om te herorganiseer",
        36: "Klik vir alternatiewe vertalings",
        37: "Druk die Shift-sleutel, klik en trek die woorde hierbo om te hersorteer.",
        38: "Dankie dat jy jou vertaalvoorstel bygedra het tot Google Vertaal.",
        39: "Bestuur vertaling vir hierdie werf",
        40: "Klik op 'n woord vir alternatiewe vertalings, of dubbel-klik om direk te redigeer",
        41: "Oorspronklike teks",
        42: d,
        43: d,
        44: "Jou regstelling is ingedien.",
        45: "Fout: die taal van die webbladsy word nie gesteun nie.",
        46: "Taal se vertaallegstuk"
    };
    var h = window.google && google.translate && google.translate._const;
    if (h) {
        var k;
        a: {
            for (var l = [], m = [""], n = 0; n < m.length; ++n) {
                var p = m[n].split(","),
                    q = p[0];
                if (q) {
                    var r = Number(p[1]);
                    if (!(!r || 0.1 < r || 0 > r)) {
                        var t = Number(p[2]),
                            u = new Date(),
                            v = 1e4 * u.getFullYear() + 100 * (u.getMonth() + 1) + u.getDate();
                        !t || t < v || l.push({ version: q, ratio: r, a: t });
                    }
                }
            }
            var x = 0,
                y = window.location.href.match(/google\.translate\.element\.random=([\d\.]+)/),
                z = Number(y && y[1]) || Math.random();
            for (n = 0; n < l.length; ++n) {
                var A = l[n];
                x += A.ratio;
                if (1 <= x) break;
                if (z < x) {
                    k = A.version;
                    break a;
                }
            }
            k = "TE_20200210_00";
        }
        var B = "/element/%s/e/js/element/element_main.js".replace("%s", k);
        if ("0" == k) {
            var C = " element %s e js element element_main.js".split(" ");
            C[C.length - 1] = "main_af.js";
            B = C.join("/").replace("%s", k);
        }
        if (h._cjlc) h._cjlc(this.EDGE_TRANSLATE_URL + "google/element_main.js");
        else {
            var D = this.EDGE_TRANSLATE_URL + "google/element_main.js",
                E = document.createElement("script");
            E.type = "text/javascript";
            E.charset = "UTF-8";
            E.src = D;
            var F = document.getElementsByTagName("head")[0];
            F || (F = document.body.parentNode.appendChild(document.createElement("head")));
            F.appendChild(E);
        }
        f("google.translate.m", g);
        f("google.translate.v", k);
    }
}.call(window));
