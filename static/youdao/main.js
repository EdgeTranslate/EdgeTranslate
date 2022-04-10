function notifyEdgeTranslate(event, detail) {
    chrome.runtime.sendMessage(
        JSON.stringify({
            type: "event",
            event: "page_translate_event",
            detail: {
                event,
                ...detail,
            },
        }),
        () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            }
        }
    );
}

/* eslint-disable */

if (this.JSON && this.JSON.stringify.toString().indexOf("[native code]") !== -1) {
    this.JSONDAO = this.JSON;
} else {
    this.JSONDAO = {};
}
(function() {
    function f(n) {
        return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() +
                      "-" +
                      f(this.getUTCMonth() + 1) +
                      "-" +
                      f(this.getUTCDate()) +
                      "T" +
                      f(this.getUTCHours()) +
                      ":" +
                      f(this.getUTCMinutes()) +
                      ":" +
                      f(this.getUTCSeconds()) +
                      "Z"
                : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
            key
        ) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string)
            ? '"' +
                  string.replace(escapable, function(a) {
                      var c = meta[a];
                      return typeof c === "string"
                          ? c
                          : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                  }) +
                  '"'
            : '"' + string + '"';
    }
    function str(key, holder) {
        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }
                    v =
                        partial.length === 0
                            ? "[]"
                            : gap
                            ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                            : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === "string") {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                v =
                    partial.length === 0
                        ? "{}"
                        : gap
                        ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                        : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }
    if (typeof JSONDAO.stringify !== "function") {
        JSONDAO.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else {
                if (typeof space === "string") {
                    indent = space;
                }
            }
            rep = replacer;
            if (
                replacer &&
                typeof replacer !== "function" &&
                (typeof replacer !== "object" || typeof replacer.length !== "number")
            ) {
                throw new Error("JSONDAO.stringify");
            }
            return str("", { "": value });
        };
    }
    if (typeof JSONDAO.parse !== "function") {
        JSONDAO.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k,
                    v,
                    value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (
                /^[\],:{}\s]*$/.test(
                    text
                        .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                        .replace(
                            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                            "]"
                        )
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                )
            ) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({ "": j }, "") : j;
            }
            throw new SyntaxError("JSONDAO.parse");
        };
    }
})();
(function() {
    var a = {
        browser: (function() {
            var e = {};
            var c = navigator.userAgent.toLowerCase();
            var d;
            (d = c.match(/msie ([\d.]+)/))
                ? (e.msie = d[1])
                : (d = c.match(/firefox\/([\d.]+)/))
                ? (e.firefox = d[1])
                : (d = c.match(/chrome\/([\d.]+)/))
                ? (e.chrome = d[1])
                : (d = c.match(/opera.([\d.]+)/))
                ? (e.opera = d[1])
                : (d = c.match(/version\/([\d.]+).*safari/))
                ? (e.safari = d[1])
                : 0;
            return e;
        })(),
        isDOM: function(c) {
            return Boolean(c && c.nodeType === 1);
        },
        isArray: function(c) {
            return Object.prototype.toString.call(c) === "[object Array]";
        },
        isFunction: function(c) {
            return Object.prototype.toString.call(c) === "[object Function]";
        },
        each: function(d, g, f) {
            if (d === undefined || d === null) {
                return;
            }
            if (d.length === undefined || a.isFunction(d)) {
                for (var c in d) {
                    if (d.hasOwnProperty(c)) {
                        if (g.call(f || d[c], c, d[c]) === false) {
                            break;
                        }
                    }
                }
            } else {
                for (var e = 0; e < d.length; e++) {
                    if (g.call(f || d[e], e, d[e]) === false) {
                        break;
                    }
                }
            }
            return d;
        },
        indexOf: function b(d, e) {
            if (d.indexOf) {
                return d.indexOf(e);
            } else {
                var c = -1;
                a.each(d, function(f) {
                    if (this === e) {
                        c = f;
                        return false;
                    }
                });
                return c;
            }
        },
        bind: function(d, c, e) {
            if (!e) {
                return;
            }
            if (d.addEventListener) {
                d.addEventListener(c, e, false);
            } else {
                if (d.attachEvent) {
                    d.attachEvent("on" + c, e);
                } else {
                    d["on" + c] = e;
                }
            }
            return this;
        },
        unbind: function(d, c, e) {
            if (!e) {
                return;
            }
            if (d.removeEventListener) {
                d.removeEventListener(c, e, false);
            } else {
                if (d.detachEvent) {
                    d.detachEvent("on" + c, e);
                } else {
                    d["on" + c] = function() {};
                }
            }
            return this;
        },
        param: function(c) {
            if (typeof c === "string") {
                return c;
            }
            var d = [];
            a.each(c, function(e, f) {
                if (f) {
                    f = encodeURIComponent(f);
                    if (a.browser.firefox) {
                        f = encodeURIComponent(unescape(f));
                    }
                    d.push(encodeURIComponent(e) + "=" + f);
                }
            });
            return d.join("&");
        },
        makeArray: function(c) {
            return Array.prototype.slice.call(c, 0);
        },
        getDocumentCharset: function() {
            a.log(
                "document.characterSet || document.charset:::" + document.characterSet ||
                    document.charset
            );
            return document.characterSet || document.charset;
        },
        log: function() {
            // if (!!window.console && !!window.console.log) {
            //     var c = a.makeArray(arguments);
            //     c.unshift("[J]");
            //     try {
            //         window.console.log.apply(window.console, c);
            //     } catch (d) {
            //         if (arguments.length === 3) {
            //             window.console.log(arguments[0], arguments[1], arguments[2]);
            //         } else {
            //             if (arguments.length === 2) {
            //                 window.console.log(arguments[0], arguments[1]);
            //             } else {
            //                 window.console.log(arguments[0]);
            //             }
            //         }
            //     }
            // }
        },
        css: (function() {
            var c = function(h, d) {
                var i = "";
                if (d == "float") {
                    document.defaultView ? (d = "float") : (d = "styleFloat");
                }
                if (h.style[d]) {
                    i = h.style[d];
                } else {
                    if (h.currentStyle) {
                        i = h.currentStyle[d];
                    } else {
                        if (document.defaultView && document.defaultView.getComputedStyle) {
                            d = d.replace(/([A-Z])/g, "-$1").toLowerCase();
                            var f = document.defaultView.getComputedStyle(h, "");
                            i = f && f.getPropertyValue(d);
                        } else {
                            i = null;
                        }
                    }
                }
                if (
                    (i == "auto" || i.indexOf("%") !== -1) &&
                    ("width" === d.toLowerCase() || "height" === d.toLowerCase()) &&
                    h.style.display != "none" &&
                    i.indexOf("%") !== -1
                ) {
                    i =
                        h["offset" + d.charAt(0).toUpperCase() + d.substring(1).toLowerCase()] +
                        "px";
                }
                if (d == "opacity") {
                    try {
                        i = h.filters["DXImageTransform.Microsoft.Alpha"].opacity;
                        i = i / 100;
                    } catch (j) {
                        try {
                            i = h.filters("alpha").opacity;
                        } catch (g) {}
                    }
                }
                return i;
            };
            return function(e, d) {
                if (typeof d === "string") {
                    return c(e, d);
                } else {
                    a.each(d, function(f, g) {
                        e.style[f] = g;
                    });
                }
            };
        })(),
        getPageSize: function() {
            var g, c;
            if (window.innerHeight && window.scrollMaxY) {
                g = document.body.scrollWidth;
                c = window.innerHeight + window.scrollMaxY;
            } else {
                g = Math.max(document.body.scrollWidth, document.body.offsetWidth);
                c = Math.max(document.body.scrollHeight, document.body.offsetHeight);
            }
            var e, h;
            e = document.documentElement.clientWidth || document.body.clientWidth;
            h = document.documentElement.clientHeight || document.body.clientHeight;
            var f = Math.max(c, h);
            var d = Math.max(g, e);
            return { page: { width: d, height: f }, window: { width: e, height: h } };
        },
        findPos: function(c) {
            var d = { x: 0, y: 0 };
            if (!!document.documentElement.getBoundingClientRect()) {
                d.x = c.getBoundingClientRect().left + a.scroll().left;
                d.y = c.getBoundingClientRect().top + a.scroll().top;
            } else {
                while (c) {
                    d.x += c.offsetLeft;
                    d.y += c.offsetTop;
                    c = c.offsetParent;
                }
            }
            return d;
        },
        textPos: function(e, h) {
            var i = e || window.event;
            var g = {};
            var j = {};
            var d = h.h;
            var f = h.v || "bottom";
            if (window.getSelection) {
                g = window.getSelection().getRangeAt(0);
            } else {
                if (document.selection) {
                    g = document.selection.createRange();
                }
            }
            if (!!d) {
                j.x = c[d] + a.scroll().left;
            } else {
                if (i.pageX || i.pageY) {
                    j.x = i.pageX;
                } else {
                    if (i.clientX || i.clientY) {
                        j.x = i.clientX + a.scroll().left;
                    }
                }
            }
            if (!!g.getBoundingClientRect) {
                var c = g.getBoundingClientRect();
                j.y = c[f] + a.scroll().top;
            } else {
                if (i.pageX || i.pageY) {
                    j.y = i.pageY;
                } else {
                    if (i.clientX || i.clientY) {
                        j.y = i.clientY + a.scroll().top;
                    }
                }
            }
            return j;
        },
        scroll: function() {
            return {
                left: document.documentElement.scrollLeft + document.body.scrollLeft,
                top: document.documentElement.scrollTop + document.body.scrollTop
            };
        },
        walkTheDOM: function(e, d, c) {
            if (c && !c(e)) {
                return;
            }
            d(e);
            if (e.tagName === "NOSCRIPT") {
                return;
            } else {
                if (e.tagName === "IFRAME" || e.tagName === "FRAME") {
                    return;
                } else {
                    e = e.firstChild;
                }
            }
            while (e) {
                arguments.callee(e, d, c);
                e = e.nextSibling;
            }
        },
        getTextNodes: function(e, c) {
            var d = [];
            a.walkTheDOM(
                e,
                function(f) {
                    if (f.nodeType === 3 && a.trim(f.nodeValue)) {
                        d.push(f);
                    }
                },
                c
            );
            return d;
        },
        getElementsByClassName: function(e, d) {
            if (e.getElementsByClassName) {
                return e.getElementsByClassName(d);
            } else {
                var c = [];
                a.walkTheDOM(e, function(f) {
                    if (a.hasClass(f, d)) {
                        c.push(f);
                    }
                });
                return c;
            }
        },
        query: function(e, f) {
            var d = new RegExp("(?:(?:\\.([^()]+))?)(?:(?:#([^()]+))?)");
            var c = d.exec(e);
            var i = f || document;
            if (!c) {
                return null;
            } else {
                if (!!c[1]) {
                    var h = c[1];
                    if (i.getElementsByClassName) {
                        return i.getElementsByClassName(h);
                    } else {
                        var g = [];
                        a.walkTheDOM(i, function(j) {
                            if (a.hasClass(j, h)) {
                                g.push(j);
                            }
                        });
                        return g;
                    }
                }
                if (!!c[2]) {
                    return i.getElementById(c[2]);
                }
            }
        },
        trim: function(c) {
            return c.replace(/^\s*/, "").replace(/\s*$/, "");
        },
        formatTemplate: function(f, g) {
            var d = document.createElement("div");
            for (var e in g) {
                if (g.hasOwnProperty(e)) {
                    f = f.replace(new RegExp("{" + e + "}", "g"), g[e]);
                }
            }
            d.innerHTML = f;
            var c = d.firstChild;
            d.removeChild(c);
            return c;
        },
        hasClass: function(g, f) {
            if (a.isDOM(g)) {
                if (g.className === f) {
                    return true;
                }
                var e = g.className.split(" "),
                    d = 0,
                    c = e.length;
                for (; d < c; d++) {
                    if (f === e[d]) {
                        return true;
                    }
                }
            }
            return false;
        },
        loadCSS: function(e, d) {
            var c = function(j) {
                if (e && e.createElement) {
                    var i = Date.parse(new Date()),
                        g = e.createElement("link");
                    var f = j.indexOf("?") === -1 ? j + "?572877" : j + "&572877";
                    g.setAttribute("rel", "stylesheet");
                    g.setAttribute("href", f);
                    g.setAttribute("type", "text/css");
                    var h = e.getElementsByTagName("head")[0] || e.body;
                    h.appendChild(g);
                }
            };
            if (a.isArray(d)) {
                a.each(d, function(f, g) {
                    c(g);
                });
            } else {
                if (typeof d === "string") {
                    c(d);
                }
            }
        },
        addClass: function(g, f) {
            if (a.isDOM(g)) {
                var e = g.className.split(" "),
                    d = 0,
                    c = e.length;
                for (; d < c; d++) {
                    if (f === e[d]) {
                        return;
                    }
                }
                e[d] = f;
                g.className = e.join(" ");
            }
        },
        removeClass: function(g, f) {
            if (a.isDOM(g)) {
                var e = g.className.split(" "),
                    d = 0,
                    c = e.length,
                    h = [];
                for (; d < c; d++) {
                    if (f !== e[d]) {
                        h.push(e[d]);
                    }
                }
                g.className = h.join(" ");
            }
        },
        toggleClass: function(g, f) {
            if (a.isDOM(g)) {
                var e = g.className.split(" "),
                    d = 0,
                    c = e.length,
                    j = [],
                    h = "add";
                for (; d < c; d++) {
                    if (f === e[d]) {
                        h = "remove";
                    } else {
                        j.push(e[d]);
                    }
                }
                if (h === "add") {
                    e[d] = f;
                } else {
                    e = j;
                }
                g.className = e.join(" ");
            }
        },
        guid: (function() {
            var c = function() {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);
            };
            return function() {
                return c() + c() + "-" + c() + "-" + c() + "-" + c() + "-" + c() + c() + c();
            };
        })(),
        protoExtend: function(e, c) {
            var d = a.isFunction(c) ? c : function() {};
            d.prototype = e;
            return new d();
        },
        stopPropagation: function(d) {
            var c = d || window.event;
            if (c.stopPropagation) {
                c.stopPropagation();
            }
            c.cancelBubble = true;
            return c;
        },
        storage: function(d, f) {
            var e = function(h, i) {
                var g = window.localStorage;
                if (i === undefined) {
                    return g.getItem(h);
                }
                if (h !== undefined && i !== undefined) {
                    g.setItem(h, i);
                    return i;
                }
            };
            var c = function(h, i) {
                var g = document.documentElement;
                g.addBehavior("#default#userData");
                if (i === undefined) {
                    g.load("fanyiweb2");
                    return g.getAttribute(h);
                }
                if (h !== undefined && i !== undefined) {
                    g.setAttribute(h, i);
                    g.save("fanyiweb2");
                    return i;
                }
            };
            if (!!window.localStorage) {
                return e(d, f);
            }
            if (!!document.documentElement.addBehavior) {
                return c(d, f);
            }
        },
        cookie: function(c, f) {
            function d(g, i) {
                var h = 30;
                var j = new Date();
                j.setTime(j.getTime() + h * 24 * 60 * 60 * 1000);
                document.cookie = g + "=" + i + ";expire*=" + j.toGMTString();
            }
            function e(h) {
                var g = document.cookie.match(new RegExp("(^| )" + h + "=([^;]*)(;|$)"));
                if (g != null) {
                    return decodeURIComponent(g[2]);
                }
                return null;
            }
            if (!!f) {
                d(c, f);
            } else {
                return e(c);
            }
        },
        parseData: (function() {
            var c = {
                json: function(d) {
                    try {
                        return (d = JSONDAO.parse(d));
                    } catch (f) {
                        a.log("[Error]", "Invalid JSON data:", d);
                    }
                },
                xml: function(e) {
                    if (window.DOMParser) {
                        return new DOMParser().parseFromString(e, "text/xml");
                    } else {
                        var d = new ActiveXObject("Microsoft.XMLDOM");
                        d.async = "false";
                        d.loadXML(e);
                        return d;
                    }
                }
            };
            return function(d, e) {
                if (d === undefined) {
                    return e;
                }
                if (a.isFunction(d)) {
                    return d(e);
                }
                if (!!d && !c[d]) {
                    a.log("[Error]", "Function parseData() dosen't support this type:", d);
                    return e;
                }
                return c[d](e);
            };
        })(),
        once: function(c) {
            return function() {
                if (a.isFunction(c)) {
                    c.apply(this, arguments);
                }
                c = function() {};
            };
        }
    };
    window.J = a;
})();
(function(a) {
    var b = function(e, d, c) {
        return new b.prototype.init(e, d, c);
    };
    b.prototype = {
        init: function(c, f, g) {
            var d = this;
            var e = [];
            var h = function(i) {
                d.ajax = i;
                while (e.length > 0) {
                    i(e.pop());
                }
            };
            if (!!window.postMessage) {
                this.createMessageChannel(c, f, g, h);
            } else {
                this.createJTRAssist(c, h);
            }
            this.ajax = function(i) {
                e.push(i);
                return this;
            };
            return this;
        },
        createMessageChannel: function(d, f, h, i) {
            var e = this;
            var c = (function() {
                if (a.isDOM(a.query("#" + d))) {
                    throw new Error("Existed CDA iFrame element");
                }
                if (f && h) {
                    var j = document.createElement("iframe");
                    j.setAttribute("id", d);
                    j.className = "OUTFOX_JTR_CONN";
                    j.style.display = "none";
                    j.setAttribute("src", h);
                    document.body.appendChild(j);
                    return j.contentWindow;
                } else {
                    throw new Error("Empty domain is not allowed");
                }
            })();
            var g = (function() {
                var k = [];
                var l = 0;
                var j = {
                    transferStationReady: function() {
                        i(function(m) {
                            m.data = a.param(m.data);
                            m.index = l++;
                            k[m.index] = { dataType: m.dataType, callback: m.callback };
                            delete m.callback;
                            c.postMessage(JSONDAO.stringify(m), "*");
                            return e;
                        });
                    },
                    dataBack: function(n) {
                        if (!!n && !!k[n.index]) {
                            var m = k[n.index];
                            if (a.isFunction(m.callback)) {
                                m.callback(a.parseData(m.dataType, n.response));
                            }
                            delete k[n.index];
                        }
                    }
                };
                return function(n) {
                    // EDGE TRANSLATE MODIFICATION START

                    // Google page translator posted messages may be received here
                    // and cause an error, we just ignore it.
                    let data = JSONDAO.parse(n.data);
                    if (data.type && data.type === "edge_translate_page_translate_event")
                        return;

                    var m = JSONDAO.parse(n.data);
                    j[m.handler](JSONDAO.parse(n.data));

                    // EDGE TRANSLATE MODIFICATION END
                };
            })();
            a.bind(window, "message", function(j) {
                g.call(e, j);
            });
        },
        createJTRAssist: function(h, e) {
            var k = this;
            var d = "https://fanyi.youdao.com/web2/JTRAssist.swf?" + +new Date();
            var j = function() {
                if (!!a.query("#" + h)) {
                    return;
                }
                var l = document.createElement("div");
                if (a.browser.msie === "6.0" || a.browser.msie === "7.0") {
                    l.innerHTML =
                        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" id="' +
                        h +
                        '"><param name="allowScriptAccess" value="always" /><param name="movie" value="' +
                        d +
                        '" /></object>';
                } else {
                    l.innerHTML =
                        '<object height="1" width="1" id="' +
                        h +
                        '" data="' +
                        d +
                        '"><param name="allowScriptAccess" value="always"></object>';
                }
                document.body.appendChild(l);
            };
            var c = "outfox_jtr_fproxy_callback_",
                f = 0;
            var g = function(m) {
                var l = c + f++;
                window[l] = function(n) {
                    m.callback.call(k, a.parseData(m.dataType, decodeURI(n)));
                };
                a.query("#" + h).load(m.url, m.data, m.type || "POST", 'window["' + l + '"]');
            };
            var i = function(n) {
                var l = n.data.key,
                    m = n.data.value;
                if (m === undefined) {
                    if (a.isFunction(n.callback)) {
                        n.callback(a.parseData(n.dataType, a.query("#" + h).getItem(l)));
                    }
                } else {
                    a.query("#" + h).setItem(l, m);
                }
            };
            j();
            window.JTRAssistIsReady = function() {
                e(function(l) {
                    switch (l.handler) {
                        case "translate":
                            l.data = a.param(l.data);
                            g(l);
                            break;
                        case "localStorage":
                            i(l);
                            break;
                        default:
                            throw new Error("Unsupported request type :" + l.handler);
                    }
                    return k;
                });
            };
        }
    };
    b.prototype.init.prototype = b.prototype;
    a.CDA = b;
})(J);
(function(a) {
    TR = function(d, b, g, c) {
        this._manager = c;
        this._reqSize = b.reqSize;
        this._onStatusChange = b.onStatusChange || function() {};
        this._url = b.url;
        this.conn = g;
        this._context = d;
        this._request = function(i, j, k) {
            g.ajax({
                url: i,
                handler: "translate",
                type: "POST",
                data: j,
                callback: k,
                dataType: "json"
            });
        };
        var h = new a.Page(d);
        var f = [];
        var e = h.getMainArticle();
        if (e) {
            f = a.getTextNodes(e.elem, TR.isInclude);
        }
        this.mainNodeLength = f.length || null;
        this._nodeIndex = [];
        f = f.concat(
            a.getTextNodes(d, function(i) {
                return i !== (e && e.elem) && TR.isInclude(i);
            })
        );
        a.each(
            f,
            function(i, j) {
                this._nodeIndex.push(this._manager.addNode(j));
            },
            this
        );
        this.workingThread = 0;
        this.guid = b.guid || a.guid();
    };
    TR.prototype = {
        doTrans: function() {
            var d = ++this.workingThread;
            var h = {
                ue: a.getDocumentCharset() || null,
                data: null,
                relatedUrl: document.location.href,
                guid: this.guid,
                mainLength: this.mainNodeLength,
                requestId: a.guid()
            };
            var j = [];
            var f = 0;
            for (var g = 0; g < this._nodeIndex.length; g++) {
                if (this._manager.transResults[g]) {
                    if (d === this.workingThread) {
                        this._manager.replaceTrans(g);
                    }
                } else {
                    var e = null;
                    if (j[parseInt(f / this._reqSize, 10)]) {
                        e = j[parseInt(f++ / this._reqSize, 10)];
                    } else {
                        e = j[parseInt(f++ / this._reqSize, 10)] = {};
                    }
                    var i = null;
                    try {
                        i =
                            (this._manager.nodes[g].parentNode &&
                                this._manager.nodes[g].parentNode.tagName) ||
                            null;
                    } catch (c) {}
                    e[g] = { src: this._manager.originals[g], tag: i };
                }
            }
            if (j.length === 0) {
                this._onStatusChange({ id: d, action: "TRANS", level: "0", status: "finish" });
                return;
            }
            var k = this,
                b = function(l) {
                    k._onStatusChange({
                        id: d,
                        action: "TRANS",
                        level: "0",
                        status: "busy",
                        data: [l, j.length]
                    });
                    h.data = JSONDAO.stringify(j[l]);
                    k._request(k._url.textTrans, h, function(m) {
                        k._updateTrans(m, d);
                        if (++l < j.length) {
                            b(l);
                        } else {
                            k._onStatusChange({
                                id: d,
                                action: "TRANS",
                                level: "0",
                                status: "finish"
                            });
                        }
                    });
                };
            b(0);
        },
        revertTrans: function() {
            var c = ++this.workingThread;
            for (var b = 0; b < this._nodeIndex.length; b++) {
                if (c === this.workingThread) {
                    this._manager.revertTrans(this._nodeIndex[b]);
                }
            }
        },
        _updateTrans: function(b, c) {
            if (!!!b) {
                return;
            }
            if (b.errorCode === 40 && b.errorCode === 30) {
                a.log("Get Error Code:", b.errorCode);
                return;
            }
            a.each(
                b.data,
                function(d, e) {
                    this._manager.transResults[d] = e.tst;
                    if (c === this.workingThread) {
                        this._manager.replaceTrans(d);
                    }
                },
                this
            );
        },
        doTips: function(b) {
            var e = ++this.workingThread;
            var i = {
                type: "X",
                ue: a.getDocumentCharset() || null,
                data: null,
                relatedUrl: document.location.href,
                mainLength: this.mainNodeLength,
                guid: this.guid
            };
            var k = [];
            var g = 0;
            for (var h = 0; h < this._nodeIndex.length; h++) {
                if (this._manager.tipsResults[h]) {
                    if (e === this.workingThread) {
                        this._manager.replaceTips(h, b);
                    }
                } else {
                    var f = null;
                    if (k[parseInt(g / this._reqSize, 10)]) {
                        f = k[parseInt(g++ / this._reqSize, 10)];
                    } else {
                        f = k[parseInt(g++ / this._reqSize, 10)] = {};
                    }
                    var j = null;
                    try {
                        j =
                            (this._manager.nodes[h].parentNode &&
                                this._manager.nodes[h].parentNode.tagName) ||
                            null;
                    } catch (d) {}
                    f[h] = { src: this._manager.originals[h], tag: j };
                }
            }
            if (k.length === 0) {
                this._onStatusChange({ id: e, action: "TIPS", level: b, status: "finish" });
                return;
            }
            var l = this;
            var c = function(m) {
                a.log("Send:", k[m]);
                l._onStatusChange({
                    id: e,
                    action: "TIPS",
                    level: b,
                    data: [m, k.length],
                    status: "busy"
                });
                i.data = JSONDAO.stringify(k[m]);
                l._request(l._url.tips, i, function(n) {
                    l._updateTips(n, e, b);
                    if (++m < k.length) {
                        c(m);
                    } else {
                        l._onStatusChange({ id: e, action: "TIPS", level: b, status: "finish" });
                    }
                });
            };
            c(0);
        },
        revertTips: function() {
            var c = ++this.workingThread;
            for (var b = 0; b < this._nodeIndex.length; b++) {
                if (c === this.workingThread) {
                    this._manager.revertTips(this._nodeIndex[b]);
                }
            }
        },
        _updateTips: function(e, d, c) {
            if (!!!e) {
                return;
            }
            if (e.errorCode === 40 && e.errorCode === 30) {
                a.log("Get Error Code:", e.errorCode);
                return;
            }
            var b = function(g, f) {
                return g.start > f.start;
            };
            a.each(
                e.data,
                function(f, g) {
                    if (g.length > 0) {
                        this._bubbleSort(g, b);
                        this._manager.tipsResults[f] = g;
                        if (d === this.workingThread) {
                            this._manager.replaceTips(f, c);
                        }
                    } else {
                        this._manager.tipsResults[f] = [];
                    }
                },
                this
            );
        },
        _bubbleSort: function(c, f) {
            for (var d = c.length - 2; d >= 0; d--) {
                for (var b = 0; b <= d; b++) {
                    if (f(c[b + 1], c[b])) {
                        var e = c[b];
                        c[b] = c[b + 1];
                        c[b + 1] = e;
                    }
                }
            }
            return c;
        }
    };
    TR.isInclude = function(b) {
        return !(
            b.tagName === "SCRIPT" ||
            b.tagName === "STYLE" ||
            b.tagName === "PRE" ||
            (b.className && /OUTFOX_JTR_/.test(b.className))
        );
    };
    a.TR = TR;
})(J);
if (!J || !J.bind) {
    throw new Error("swipe extension need J.bind support");
}
(function(h) {
    var g = "https://fanyi.youdao.com",
        f = g + "/fsearch",
        b = g + "/translate";
    var j = function(k) {
        return (
            '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="15px" height="15px" align="absmiddle" id="speach_flash"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="https://cidian.youdao.com/chromeplus/voice.swf" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="high" /><param name="wmode"  value="transparent"><param name="FlashVars" value="audio=' +
            k +
            '"><embed wmode="transparent" play="false" src="https://cidian.youdao.com/chromeplus/voice.swf" loop="false" menu="false" quality="high" bgcolor="#ffffff" width="15" height="15" align="absmiddle" allowScriptAccess="sameDomain" FlashVars="audio=' +
            k +
            '" type="application/x-shockwave-flash" pluginspage="https://www.macromedia.com/go/getflashplayer" /></object>'
        );
    };
    var c = function(k) {
        return (k.split && k.split(" ").length) || 0;
    };
    var e = {
        isJapanese: function(k) {
            return !Boolean(/[^\u0800-\u4e00]/.test(k));
        },
        isContainJapanese: function(k) {
            var m = 0;
            for (var l = 0; l < k.length; l++) {
                if (this.isJapanese(k.charAt(l))) {
                    m++;
                }
            }
            return m > 2;
        },
        isKoera: function(k) {
            for (i = 0; i < k.length; i++) {
                if (
                    (k.charCodeAt(i) > 12592 && k.charCodeAt(i) < 12687) ||
                    (k.charCodeAt(i) >= 44032 && k.charCodeAt(i) <= 55203)
                ) {
                    return true;
                }
            }
            return false;
        },
        isContainKoera: function(k) {
            var m = 0;
            for (var l = 0; l < k.length; l++) {
                if (this.isKoera(k.charAt(l))) {
                    m++;
                }
            }
            return m > 0;
        },
        isChinese: function(k) {
            return !Boolean(/[^\u4e00-\u9fa5]/.test(k));
        },
        isContainChinese: function(k) {
            var m = 0;
            for (var l = 0; l < k.length; l++) {
                if (this.isChinese(k.charAt(l))) {
                    m++;
                }
            }
            return m > 5;
        }
    };
    var a = function(k, l) {
        return new a.fn.init(k, l);
    };
    a.fn = a.prototype = {
        init: function(l, m) {
            var k = this;
            this.wrapper = a.createFrameWrapper();
            this.conn = a.initConnection(m);
            this.context = l;
            h.bind(document.body, "click", function(o) {
                var n = o || window.event;
                k.wrapper.style.display = "none";
                k.wrapper.style.position = "absolute";
                k.wrapper.innerHTML = "";
            });
        },
        enableSwipe: function() {
            if (!this._swipeListener) {
                var k = this;
                this._swipeListener = function(l) {
                    k._onSwipe.call(k, l);
                };
                h.bind(this.context, "mouseup", this._swipeListener);
            }
        },
        disableSwipe: function() {
            if (this._swipeListener) {
                h.unbind(this.context, "mouseup", this._swipeListener);
                delete this._swipeListener;
            }
        },
        _onSwipe: function(l) {
            var k = "",
                n = "";
            var m = {};
            if (window.getSelection) {
                k = window.getSelection();
            } else {
                if (document.selection) {
                    k = document.selection.createRange();
                }
            }
            if (k.toString) {
                n = k.toString();
            } else {
                if (k.text) {
                    n = k.text.toString();
                }
            }
            var o = h.textPos(l, {});
            n = h.trim(n);
            if (!a.validateSwipeWord(n)) {
                return;
            }
            this.swipeWord(n, o.x, o.y);
            if (this.onSwipeCallback) {
                this.onSwipeCallback(n);
            }
        },
        swipeWord: function(p, k, q, o, n) {
            var l = this;
            var m = null;
            this.wrapper.innerHTML = "";
            if (
                (!e.isContainChinese(p) && c(p) >= 3) ||
                (e.isContainChinese(p) || (e.isContainJapanese(p) && p.length > 4))
            ) {
                m = "translate";
            } else {
                m = "dict";
            }
            this.conn.request({ action: m, word: p }, function(r) {
                l.wrapper.innerHTML = "";
                l._onResponse.call(l, r);
                a.initWrapper(l.wrapper, k, q, o, n);
            });
        },
        _onResponse: function(l) {
            var m = l.firstChild,
                k = null;
            if (!m) {
                return;
            } else {
                if (m.baseName && m.baseName == "xml") {
                    m = m.nextSibling;
                }
            }
            switch (m.tagName) {
                case "response":
                    k = a.processXmlTransData(l);
                    break;
                case "yodaodict":
                    k = a.processXmlDictData(l);
                    break;
                default:
                    throw new Error("Incorrect xml data");
            }
            if (k) {
                this.wrapper.appendChild(k);
                this.wrapper.style.display = "block";
            }
        }
    };
    a.createFrameWrapper = function() {
        var k = document.createElement("div");
        k.id = "yddWrapper";
        h.bind(k, "click", function(l) {
            h.stopPropagation(l);
        });
        h.bind(k, "mouseup", function(l) {
            h.stopPropagation(l);
        });
        document.body.appendChild(k);
        return k;
    };
    a.validateSwipeWord = function(k) {
        return !(k === "" || k.length > 2000);
    };
    a.initConnection = function(k) {
        var n = null;
        var m = function(q) {
            var p = null,
                r = null;
            if (q.action == "dict") {
                r = {
                    client: "JTRHelper",
                    keyfrom: "JTRHelper.bookmark",
                    q: q.word,
                    pos: -1,
                    doctype: "xml",
                    xmlVersion: "3.2",
                    dogVersion: "1.0",
                    vendor: "jtr",
                    le: "eng"
                };
                p = f;
            } else {
                r = {
                    client: "JTRHelper",
                    keyfrom: "JTRHelper.bookmark",
                    i: q.word,
                    doctype: "xml",
                    xmlVersion: "1.1",
                    dogVersion: "1.0"
                };
                p = b;
            }
            return [p, r];
        };
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
            n = {
                request: function(p, q) {
                    window.chrome.runtime.sendMessage(p, function(r) {
                        if (r) {
                            q(new DOMParser().parseFromString(r, "text/xml"));
                        }
                    });
                }
            };
            return n;
        } else {
            if (k) {
                n = {
                    request: function(q, r) {
                        var p = m(q);
                        k.ajax({
                            url: p[0],
                            handler: "translate",
                            data: p[1],
                            callback: r,
                            dataType: "xml",
                            type: "POST"
                        });
                    }
                };
                return n;
            } else {
                if (h.CDA) {
                    var l = null;
                    try {
                        l = h.CDA("_OUTFOX_JTR_SWIPE_CONN", g, CONN_FILE_PATH);
                    } catch (o) {
                        throw new Error("Unable to get cross-domain ajax file.");
                    }
                    n = {
                        request: function(q, r) {
                            var p = m(q);
                            l.ajax({
                                url: p[0],
                                handler: "translate",
                                data: p[1],
                                callback: r,
                                dataType: "xml",
                                type: "POST"
                            });
                        }
                    };
                    return n;
                } else {
                    throw new Error("Unable to initialize cross-domain connection port.");
                }
            }
        }
    };
    a.initWrapper = function(p, t, s, q, D) {
        var n = 0,
            v = 0,
            B = 50,
            l = h.scroll().top,
            z = h.scroll().left,
            u = p.clientHeight,
            C = p.clientWidth,
            w = h.getPageSize().window.height,
            F = h.getPageSize().window.width;
        q = q || 0;
        D = D || 0;
        if (s - u >= l + B) {
            v = s - u;
        } else {
            v = s + D;
        }
        if (t + C <= F + z) {
            n = t + q;
        } else {
            n = F + z - C;
        }
        var r = !!(h.css(document.body, "position") !== "static");
        var A = h.css(document.body, "marginLeft");
        var o = h.css(document.body, "marginRight");
        if (A === "auto" && o === "auto") {
            var E = h.getPageSize().page.width;
            var k = parseInt(h.css(document.body, "width"));
            if (E > k) {
                A = (E - k) / 2;
            } else {
                A = 0;
            }
        }
        A = r ? parseInt(A) : 0;
        var m = r ? parseInt(h.css(document.body, "marginTop")) : 0;
        h.css(p, { position: "absolute", left: n - A + "px", top: v - m + "px" });
    };
    a.processXmlTransData = function(r) {
        var l = (
                r.getElementsByTagName("input")[0].childNodes[1] ||
                r.getElementsByTagName("input")[0].childNodes[0]
            ).nodeValue,
            q = (
                r.getElementsByTagName("translation")[0].childNodes[1] ||
                r.getElementsByTagName("translation")[0].childNodes[0]
            ).nodeValue,
            p = r.getElementsByTagName("response")[0].getAttribute("errorCode") - 0,
            n = h.trim(q),
            m = h.trim(l);
        if (
            (e.isContainChinese(m) || e.isContainJapanese(m) || e.isContainKoera(m)) &&
            m.length > 15
        ) {
            m = m.substring(0, 8) + " ...";
        } else {
            if (m.length > 25) {
                m = m.substring(0, 15) + " ...";
            }
        }
        if (m == n) {
            return null;
        }
        var o = "https://fanyi.youdao.com/translate?i=" + encodeURIComponent(l) + "&keyfrom=chrome";
        var k =
            '<div class="ydd-container">                          <div class="ydd-top-wrapper">                            <div class="ydd-top">                            </div>                          </div>                          <div class="ydd-body-wrapper">                            <div class="ydd-lb"></div>                            <div class="ydd-rb"></div>                            <div class="ydd-body">                              <div class="ydd-titile">                                <span>{input}</span>                                <span><a href="{searchURL}" target="_blank">详细&rsaquo;&rsaquo;</a></span>                              </div>                              <div class="ydd-middle">                                <div class="ydd-trans-wrapper ydd-simple-trans">                                  <div class="ydd-trans-container">{trans}</div>                                </div>                              </div>                            </div>                          </div>                          <div class="ydd-bottom-wrapper"><div class="ydd-bottom"></div></div>                          <div class="ydd-bg-top"></div></div>                        </div>';
        return h.formatTemplate(k, {
            searchURL: o,
            input: a.escapeHTML(m),
            trans: a.escapeHTML(q)
        });
    };
    a.processXmlDictData = function(D) {
        var l = null,
            n = null,
            q = [],
            z = [],
            x = "",
            v = "",
            F = "",
            r = "",
            w = 0;
        var t = function(H) {
            try {
                return D.getElementsByTagName(H)[0].firstChild.nodeValue;
            } catch (G) {
                return "";
            }
        };
        x = t("return-phrase");
        v = t("dictcn-speach");
        F = t("lang");
        r = t("phonetic-symbol");
        if ((n = D.getElementsByTagName("translation")) && n.length > 0) {
            for (w = 0; w < n.length; w++) {
                q.push(n[w].getElementsByTagName("content")[0].firstChild.nodeValue);
            }
        }
        if ((l = D.getElementsByTagName("web-translation")) && l.length > 0) {
            for (w = 0; w < l.length - 1; w++) {
                z.push({
                    key: l[w].getElementsByTagName("key")[0].firstChild.nodeValue,
                    value: l[w].getElementsByTagName("trans")[0].getElementsByTagName("value")[0]
                        .firstChild.nodeValue
                });
            }
        }
        var B =
                "https://dict.youdao.com/search?q=" +
                encodeURIComponent(x) +
                "&keyfrom=chrome.extension" +
                F,
            E = x,
            A = "",
            o = "",
            m = "",
            u = null,
            C = "https://www.youdao.com/search?q={title}&keyfrom=fanyi.jtr",
            s = "";
        s =
            '<div class="ydd-container">                      <div class="ydd-top-wrapper">                        <div class="ydd-top"></div>                      </div>                      <div class="ydd-body-wrapper">                        <div class="ydd-lb"></div>                        <div class="ydd-rb"></div>                        <div class="ydd-body">                          <div class="ydd-titile">                            <span class="ydd-key-title">{title}</span>                            <span class="ydd-phonetic">{phonetic}</span> {speechHTML} <span class="ydd-detail"><a href="{searchURL}" target="_blank">详细&rsaquo;&rsaquo;</a></span>                          </div>                          <div class="ydd-middle">                            <div class="ydd-trans-wrapper ydd-base-trans">                              <div class="ydd-tabs"><span class="ydd-tab">基本翻译</span></div>{baseTransHTML}</div>                              <div class="ydd-trans-wrapper ydd-web-trans">                                <div class="ydd-tabs"><span class="ydd-tab">网络释义</span></div>{webTransHTML}</div>                              </div>                            </div>                          </div>                        <div class="ydd-bottom-wrapper">                          <div class="ydd-bottom"><a href="' +
            C +
            '" target="_blank" title="使用有道搜索 {title}">搜索&nbsp;{title}</a></div>                        </div>                        <div class="ydd-bg-top"></div>                      </div>                    </div>';
        if (
            (e.isContainChinese(E) || e.isContainJapanese(E) || e.isContainKoera(E)) &&
            E.length > 15
        ) {
            E = E.substring(0, 10) + "...";
        } else {
            if (E.length > 25) {
                E = E.substring(0, 15) + " ...";
            }
        }
        if (q.length + z.length > 0 && v) {
            A =
                '<span class="ydd-voice">' +
                j("https://dict.youdao.com/speech?audio=" + v, "test", "CLICK", "dictcn_speech") +
                "</span>";
        }
        for (w = 0; w < q.length; w++) {
            o += '<div class="ydd-trans-container">' + q[w] + "</div>";
        }
        for (w = 0; w < z.length; w++) {
            var p =
                "https://dict.youdao.com/search?q=" +
                encodeURIComponent(z[w].key) +
                "&keyfrom=chrome.extension" +
                F;
            m +=
                '<div class="ydd-trans-container"><a href="' +
                p +
                '" target="_blank">' +
                z[w].key +
                ":</a> " +
                z[w].value +
                "</div>";
        }
        u = h.formatTemplate(s, {
            phonetic: r ? "[" + r + "]" : "",
            title: E,
            searchURL: B,
            speechHTML: A,
            baseTransHTML: o,
            webTransHTML: m
        });
        var k = h.query(".ydd-middle", u)[0];
        n = h.query(".ydd-base-trans", k)[0];
        l = h.query(".ydd-web-trans", k)[0];
        if (q.length + z.length === 0) {
            k.innerHTML = '<p class="ydd-no-result">没有英汉互译结果</p>';
        }
        try {
            if (q.length === 0) {
                k.removeChild(n);
            } else {
                if (z.length === 0) {
                    k.removeChild(l);
                }
            }
        } catch (y) {}
        return u;
    };
    var d = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
    a.escapeHTML = function(k) {
        return String(k).replace(/[&<>"'\/]/g, function(l) {
            return d[l];
        });
    };
    a.fn.init.prototype = a.fn;
    h.Swipe = a;
})(J);
(function(a) {
    var b = function(d, c, f) {
        var e = this;
        if (!a.isDOM(d)) {
            throw Error("Invalid slider container element");
        }
        this.container = d;
        if (!a.isDOM(c)) {
            throw Error("Invalid slider controller block element");
        }
        this.controller = c;
        for (var g = this.container; g; g = g.parentNode) {
            if (g.nodeType === 9) {
                this.document = g;
                break;
            }
        }
        if (!g) {
            throw Error(
                "Can't find parent Document element of container, container dom node should insert to document first"
            );
        }
        if (a.isDOM(f.bar)) {
            this.bar = f.bar;
        } else {
            this.bar = null;
        }
        this.range = Number(f.max - f.min);
        if (!(this.range && this.range > 0)) {
            throw Error("range must greater than 0");
        }
        if (a.isFunction(f.callback)) {
            this.callback = function(h) {
                f.callback.call(e, h);
            };
        }
        this.borderFix = Number(f.borderFix) || 0;
        this.mousemove = function(h) {
            e._mousemove(h);
        };
        this.mouseup = function(h) {
            e._mouseup(h);
        };
        this.mousedown = function(h) {
            e._mousedown(h);
        };
    };
    b.prototype = {
        enable: function() {
            a.bind(this.container, "mousedown", this.mousedown);
        },
        disable: function() {
            a.unbind(this.container, "mousedown", this.mousedown);
        },
        to: function(e, d) {
            var c = this,
                f = null;
            tempFunc = function() {
                if (!c.container.offsetHeight || !c.container.clientWidth) {
                    f = setTimeout(tempFunc, 200);
                    return;
                }
                var g = c.container.clientWidth - c.controller.clientWidth - 2 * c.borderFix;
                pos = (e / c.range) * g;
                c._valueChange((pos / g) * c.range, pos);
            };
            tempFunc();
        },
        _mousemove: function(d) {
            var c = d || window.event;
            this._moveHandler(c, false);
        },
        _mouseup: function(d) {
            var c = d || window.event;
            this._moveHandler(c, true);
            a.unbind(this.document, "mouseup", this.mouseup);
            a.unbind(this.document, "mousemove", this.mousemove);
            this.container.style.cursor = "pointer";
        },
        _mousedown: function(d) {
            var c = d || window.event;
            this._moveHandler(c, false);
            a.bind(this.document, "mouseup", this.mouseup);
            a.bind(this.document, "mousemove", this.mousemove);
            if (c.preventDefault) {
                c.preventDefault();
            }
            c.returnValue = false;
        },
        _moveHandler: function(e, i) {
            var f =
                    e.clientX -
                    (1 / 2) * this.controller.clientWidth -
                    a.findPos(this.container).x -
                    this.borderFix,
                h = this.container.clientWidth - this.controller.clientWidth - 2 * this.borderFix,
                g = h / this.range,
                c = g / 2,
                d = f % g,
                j = 0;
            if (f < 0) {
                f = 0;
                d = 0;
            } else {
                if (f > h) {
                    f = h;
                    d = 0;
                }
            }
            if (i && d < c) {
                j = f - d;
            } else {
                if (i && d > g - c) {
                    j = f - d + g;
                } else {
                    j = f;
                }
            }
            this._valueChange((j / h) * this.range, j);
        },
        _valueChange: function(c, d) {
            this.callback(c);
            this.controller.style.left = d + this.borderFix + "px";
            if (this.bar) {
                this.bar.style.width = d + this.controller.clientWidth / 2 + "px";
            }
        }
    };
    a.Slider = b;
})(J);
(function(a) {
    var b = function() {
        this.nodes = [];
        this.originals = {};
        this.transResults = {};
        this.tipsResults = {};
    };
    b.prototype = {
        addNode: function(e, c) {
            var d = 0;
            if (!c) {
                for (; d < this.nodes.length; d++) {
                    if (this.nodes[d] === e) {
                        return d;
                    }
                }
            }
            this.nodes.push(e);
            this.originals[d] = e.nodeValue;
            return d;
        },
        replaceTrans: function(d) {
            if (this.nodes[d] && this.transResults[d]) {
                var f = this.nodes[d],
                    h = document.createElement("font"),
                    c = this.transResults[d];
                try {
                    if (f.nodeValue === c) {
                        return false;
                    }
                    if (!f.parentNode) {
                        return;
                    }
                } catch (g) {
                    return;
                }
                f.nodeValue = "";
                h.className = "OUTFOX_JTR_TRANS_NODE";
                h.id = "OUTFOX_JTR_TRANS_NODE-" + d;
                h.setAttribute("rel", d);
                h.innerHTML = c;
                try {
                    f.parentNode.insertBefore(h, f.nextSibling);
                } catch (e) {}
            }
        },
        revertTrans: function(c) {
            if (this.nodes[c] && this.originals[c]) {
                var e = a.query("#OUTFOX_JTR_TRANS_NODE-" + c);
                if (e && e.parentNode) {
                    e.parentNode.removeChild(e);
                }
                try {
                    this.nodes[c].nodeValue = this.originals[c];
                } catch (d) {}
            }
        },
        replaceTips: function(d, c) {
            var e = c || -1;
            if (this.nodes[d] && this.tipsResults[d]) {
                a.each(
                    this.tipsResults[d],
                    function(q, n) {
                        if (n.level && n.level < e) {
                            return;
                        }
                        var k = this.nodes[d],
                            i = n.start,
                            m = n.end,
                            o = n.explain;
                        if (typeof k.parentNode === undefined) {
                            return;
                        }
                        var h = document.createElement("font");
                        h.className = "OUTFOX_NANCI_WRAPPER";
                        try {
                            var p = k.nodeValue.substr(0, i),
                                g = k.nodeValue.substr(i, m - i),
                                f = k.nodeValue.substr(m);
                            k.nodeValue = p;
                            h.innerHTML = g;
                            k.parentNode.insertBefore(document.createTextNode(f), k.nextSibling);
                            k.parentNode.insertBefore(h, k.nextSibling);
                            var j = document.createElement("font");
                            j.className = "OUTFOX_NANCI_TIPS";
                            j.setAttribute("rel", d);
                            j.innerHTML = "(" + o + ")";
                            h.parentNode.insertBefore(j, h.nextSibling);
                        } catch (l) {}
                    },
                    this
                );
            }
        },
        revertTips: function(c) {
            if (this.nodes[c]) {
                var d;
                do {
                    try {
                        d = !this.revertTip(this.nodes[c].nextSibling);
                    } catch (e) {
                        d = true;
                    }
                } while (!d);
            }
        },
        revertTip: function(d) {
            if (a.hasClass(d, "OUTFOX_NANCI_WRAPPER") && d.firstChild) {
                var c = d.nextSibling;
                if (a.hasClass(c, "OUTFOX_NANCI_TIPS")) {
                    c.parentNode.removeChild(c);
                }
                if (d.nextSibling && d.nextSibling.nodeType === 3) {
                    d.firstChild.nodeValue += d.nextSibling.nodeValue;
                    d.parentNode.removeChild(d.nextSibling);
                }
                if (d.previousSibling && d.previousSibling.nodeType === 3) {
                    d.previousSibling.nodeValue += d.firstChild.nodeValue;
                    d.parentNode.removeChild(d);
                }
                return true;
            } else {
                return false;
            }
        },
        countTips: function(d) {
            var c = 0;
            a.each(
                this.tipsResults,
                function(g, e) {
                    for (var f = 0; f < e.length; f++) {
                        if (e[f].level >= d) {
                            c++;
                        }
                    }
                },
                this
            );
            return c;
        }
    };
    a.NodeManager = b;
})(J);
(function(a) {
    var b = function() {
        this.map = {};
        this.dataMap = {};
    };
    b.prototype = {
        getId: function(c) {
            var d = null;
            a.each(this.map, function(f, e) {
                if (e === c) {
                    d = f;
                    return false;
                }
            });
            if (d === null) {
                d = a.guid();
                this.map[d] = c;
            }
            return d;
        },
        data: function(g, c, f) {
            var h = this.getId(g);
            if (arguments.length === 3) {
                if (!this.dataMap[h]) {
                    this.dataMap[h] = {};
                }
                this.dataMap[h][c] = f;
                return f;
            } else {
                var e = null;
                try {
                    e = this.dataMap[h][c];
                } catch (d) {
                    e = undefined;
                }
                return e;
            }
        }
    };
    a.Cache = b;
})(J);
(function(a) {
    var b = function(d) {
        this.contentDocument = d;
        this.cache = new a.Cache();
    };
    b.prototype = {
        IGNORE_TAGS: [
            "HTML",
            "HEAD",
            "META",
            "TITLE",
            "SCRIPT",
            "STYLE",
            "LINK",
            "IMG",
            "FORM",
            "INPUT",
            "BUTTON",
            "TEXTAREA",
            "SELECT",
            "OPTION",
            "LABEL",
            "IFRAME",
            "UL",
            "OL",
            "LI",
            "DD",
            "DT",
            "A",
            "OBJECT",
            "PARAM",
            "EMBED",
            "NOSCRIPT",
            "EM",
            "B",
            "STRONG",
            "I",
            "INS",
            "BR",
            "HR",
            "PRE",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "CITE"
        ],
        getMainArticle: function() {
            return null;
            var g = null,
                e = "";
            if (!!location) {
                e = location.hostname;
            }
            if (/\b(google|facebook|twitter)\b/i.test(e)) {
                return null;
            }
            var d = this._getAllArticle();
            if (!(d && d.length)) {
                return null;
            }
            d.sort(function(i, h) {
                return !!(h.weight - i.weight);
            });
            for (var f = 2; f > 0; f--) {
                g = d[0];
                d.splice(0, 1);
                break;
            }
            return g;
        },
        _getAllArticle: function() {
            var f = this.contentDocument.getElementsByTagName("*"),
                e = [];
            for (var d = 0, h = f.length > 100 ? 100 : f.length; d < h; d++) {
                var g = f[d];
                if (this._checkTagName(g) && this._checkSize(g) && this._checkVisibility(g)) {
                    e[e.length] = new c(g);
                }
            }
            return e;
        },
        _checkTagName: function(d) {
            return a.indexOf(this.IGNORE_TAGS, d.tagName) == -1;
        },
        _checkVisibility: function(d) {
            return !(
                a.css(d, "visibility") == "hidden" ||
                a.css(d, "display") == "none" ||
                parseInt(a.css(d, "height")) <= 0 ||
                parseInt(a.css(d, "width")) <= 0
            );
        },
        _checkSize: function(d) {
            return d.offsetWidth > 300 && d.offsetHeight > 200;
        }
    };
    var c = function(d) {
        this.elem = d;
        this._texts = this._getAllTexts();
        this.weight = this.calcWeight();
    };
    c.prototype = {
        IGNORE_TAGS: ["A", "DD", "DT", "OL", "OPTION", "PRE", "SCRIPT", "STYLE", "UL", "IFRAME"],
        MINOR_REGEXP: /comment|combx|disqus|foot|header|menu|rss|shoutbox|sidebar|sponsor/i,
        MAJOR_REGEXP: /article|entry|post|body|column|main|content/i,
        TINY_REGEXP: /comment/i,
        BLANK_REGEXP: /\S/i,
        _getAllTexts: function() {
            var g = [],
                d = a.getTextNodes(this.elem);
            for (var h = 0, f = d.length; h < f; h++) {
                var j = d[h];
                if (this._checkTagName(j) && this._checkLength(j)) {
                    var e = j.parentNode || {},
                        i = e.parentNode || {};
                    if (!(this._checkMinorContent(e) || this._checkMinorContent(i))) {
                        g.push(j);
                    }
                }
            }
            return g;
        },
        calcStructWeight: function() {
            var d = 0;
            for (var i = 0, e = this._texts.length; i < e; i++) {
                var j = this._texts[i],
                    g = j.nodeValue.length,
                    h = 1;
                if (g > 20) {
                    continue;
                }
                for (var f = j.parentNode; f && f != this.elem; f = f.parentNode) {
                    h -= 0.1;
                }
                d += Math.pow(g * h, 1.25);
            }
            return d;
        },
        calcContentWeight: function() {
            var d = 1;
            for (var e = this.elem; e; e = e.parentNode) {
                var f = e.id + " " + e.className;
                if (this.MAJOR_REGEXP.test(f)) {
                    d += 0.4;
                }
                if (this.MINOR_REGEXP.test(f)) {
                    d -= 0.8;
                }
            }
            return d;
        },
        calcWeight: function() {
            return this.calcStructWeight() * this.calcContentWeight();
        },
        _checkTagName: function(d) {
            return a.indexOf(this.IGNORE_TAGS, d.tagName) == -1;
        },
        _checkLength: function(d) {
            return Boolean(this.BLANK_REGEXP.test(d.nodeValue));
        },
        _checkMinorContent: function(d) {
            return Boolean(this.TINY_REGEXP.test(d.id + " " + d.className));
        }
    };
    a.Page = b;
})(J);
(function(a) {
    var b = { runCount: 0, swipe: true, mode: "TRANS", level: "0" };
    var c = {
        0: ["TIPS", 3],
        1: ["TIPS", 2],
        2: ["TIPS", 1],
        3: ["TRANS", "0"],
        4: ["NONE", "NONE"]
    };
    a.TR.UI = function(e, f) {
        var d = this;
        this.initLogger(f.logURL);
        this.log({ action: "start" });
        this.guid = a.guid();
        this.context = e;
        this.conn = a.CDA("OUTFOX_JTR_CDA", f.domain, f.connFilePath);
        this.update = f.update;
        this.updateTipMsg = f.updateTipMsg;
        this.updateDate = f.updateDate;
        this.manager = new a.NodeManager();
        this.barHeight = 50;
        this.permissionDenied = "由于该网页存在安全性限制, 无法加载有道网页翻译2.0";
        this.translator = new a.TR(
            e,
            {
                reqSize: f.reqSize,
                onStatusChange: function() {
                    d._trStatusChangeCallback.apply(d, arguments);
                },
                url: { textTrans: f.transURL, tips: f.tipsURL },
                guid: this.guid
            },
            this.conn,
            this.manager
        );
        this.queue = {
            TRANS: { 0: { currentThread: -1 } },
            TIPS: { 1: { currentThread: -1 }, 2: { currentThread: -1 }, 3: { currentThread: -1 } },
            NONE: { NONE: {} }
        };
        this.mode = null;
        this.level = null;
        this.initFrame(f.cssURL, function() {
            var h = "";
            var g = this;
            if (location) {
                h = location.href;
            }
            this.movePage(g.barHeight);
            this.frame.body.innerHTML =
                '<div id="wrapper">' + 
                    '<a href="https://fanyi.youdao.com/web2/?keyfrom=headerLogo" target="_blank">' + 
                        '<h1 id="headerLogo" class="logo"></h1>' + 
                    '</a>' + 
                    '<div id="sliderLabel" style="display: none;">翻译级别</div>' + 
                    '<div id="sliderWrapper" class="slider-wrapper" style="display: none;">' + 
                        '<div id="levelLabel">' + 
                            '<label id="level-3" rel="0">' + 
                                '<a>专&nbsp;&nbsp;&nbsp;家</a>' + 
                            '</label>' + 
                            '<label id="level-2" rel="1">' + 
                                '<a>进&nbsp;&nbsp;&nbsp;阶</a>' + 
                            '</label>' + 
                            '<label id="level-1" rel="2">' + 
                                '<a>入&nbsp;&nbsp;&nbsp;门</a>' + 
                            '</label>' + 
                            '<label id="level-0" rel="3">' + 
                                '<a>全文翻译</a>' + 
                            '</label>' + 
                        '</div>' + 
                        '<div id="sliderContainer" class="slider-container">' + 
                            '<div id="sliderBackground">' + 
                                '<div class="slider-background"></div>' + 
                            '</div>' + 
                            '<a id="slider" href="javascript:void(0);" class="slider"></a>' + 
                        '</div>' + 
                    '</div>' + 
                    '<div id="status"></div>' + 
                    '<div id="switchWrapper">' + 
                        '<a id="switch" href="javascript:void(0);"></a>' + 
                    '</div>' + 
                '</div>' + 
                '<a id="OUTFOX_JTR_BAR_CLOSE" href="javascript:void(0);" class="OUTFOX_JTR_BAR_CLOSE"></a>' + 
                '<div id="OUTFOX_JTR_BAR_UPDATE_SHADE"></div>' + 
                '<div id="OUTFOX_JTR_BAR_CLOSE_UPDATE_TIP">' + 
                    '<div id="OUTFOX_JTR_BAR_CLOSE_UPDATE_TIP_CONTENT"></div>' + 
                '</div>';
            this.initTipContent();
            this.initBarClose();
            this.initSwitch();
            this.initSlider();
            this.initLabel();
            this.initTipsCtrl();
            this.initTransTip();
            this.initSwipe();
            var i = function(j) {
                g.loadSetting(j);
                g.enable();
                g.writeSettings({ runCount: g.settings.runCount + 1 });
                a.each(c, function(k, l) {
                    if (g.mode === l[0] && g.level === l[1]) {
                        g.slider.to(k);
                    }
                });
            };
            this.conn.ajax({
                handler: "localStorage",
                data: { key: "settings" },
                dataType: "json",
                callback: function(j) {
                    i(j);
                }
            });
        });
    };
    a.TR.UI.prototype = {
        positionElementInViewPort: function(k) {
            var n = k.tip;
            var x = k.target;
            var l = !!(a.css(document.body, "position") !== "static");
            var r = a.css(document.body, "marginLeft");
            var h = a.css(document.body, "marginRight");
            if (r === "auto" && h === "auto") {
                var w = a.getPageSize().page.width;
                var d = parseInt(a.css(document.body, "width"));
                if (w > d) {
                    r = (w - d) / 2;
                } else {
                    r = 0;
                }
            }
            r = l ? parseInt(r) : 0;
            var f = l ? parseInt(a.css(document.body, "marginTop")) : 0;
            var j = a.findPos(x),
                p = 0,
                g = 0,
                e = a.scroll().top,
                s = a.scroll().left,
                t = j.x,
                m = j.y,
                i = x.offsetHeight,
                o = n.clientHeight,
                u = n.clientWidth,
                q = a.getPageSize().window.height,
                v = a.getPageSize().window.width;
            if (m - o >= e + this.barHeight) {
                p = m - o;
            } else {
                p = m + i;
            }
            if (t + u <= v + s) {
                g = t;
            } else {
                g = v + s - u;
            }
            a.css(k.tip, { position: "absolute", top: p - f + "px", left: g - r + "px" });
        },
        disable: function() {
            this.changeMode("NONE", "NONE");
            this.slider.disable();
            this.frame.body.className = "disable";
            this.disabled = true;
            this.updateStatus();
            this.switchElem.innerHTML = "重新翻译";
        },
        enable: function() {
            this.changeMode(this.settings.mode, this.settings.level);
            this.slider.enable();
            a.removeClass(this.frame.body, "disable");
            a.addClass(this.frame.body, "enable");
            this.disabled = false;
            this.updateStatus();
            this.switchElem.innerHTML = "取消翻译";
        },
        _trStatusChangeCallback: function(e) {
            if (!e.id || !e.action || !e.level) {
                return;
            }
            var d = this.queue[e.action][e.level];
            if (d.currentThread <= e.id) {
                d.currentThread = e.id;
                d.status = e.status;
                d.data = e.data || null;
                if (e.action === this.mode && e.level === this.level) {
                    this.updateStatus();
                }
            }
        },
        updateStatus: function() {
            var f = this.queue[this.mode][this.level];
            a.removeClass(this.statusElem.parentNode, "statistic");
            if (f.status === "busy" && f.data) {
                this.switchElem.style.visibility = "hidden";
                var d = parseInt((f.data[0] * 100) / f.data[1], 10);
                if (this.mode === "TRANS") {
                    this.statusElem.innerHTML = "正在翻译&nbsp;" + d + "%&nbsp;...";
                } else {
                    this.statusElem.innerHTML = "正在分析&nbsp;" + d + "%&nbsp;...";
                }
                this.statusElem.className = "busy";
            } else {
                if (f.status === "finish") {
                    this.switchElem.style.visibility = "inherit";
                    if (this.mode === "TRANS") {
                        this.statusElem.innerHTML = "翻译完成";
                    } else {
                        var e = this.manager.countTips(this.level);
                        if (e !== 0) {
                            a.addClass(this.statusElem.parentNode, "statistic");
                            this.statusElem.innerHTML =
                                '共注释<span class="OUTFOX_BAR_TOTAL_NUM">' + e + "</span>个难词";
                        } else {
                            this.statusElem.innerHTML = "恭喜您！该网页上没有难词~";
                        }
                    }
                    this.statusElem.className = "finish";
                } else {
                    this.switchElem.style.visibility = "inherit";
                    this.statusElem.innerHTML = "翻译助手已关闭";
                    this.statusElem.className = "finish";
                }
            }
        },
        initLogger: function(d) {
            this.logURL = d;
            this._logImgCache = [];
        },
        log: function(e) {
            if (this.logURL) {
                e.relatedURL = document.location.href;
                e.guid = this.guid;
                var d = new Image();
                d.src = this.logURL + "?" + a.param(e) + "&" + new Date().getTime();
                this._logImgCache[this._logImgCache.length] = d;
            }
        },
        initSwipe: function() {
            var d = this;
            this.swipe = a.Swipe(this.context, this.conn);
            this.swipe.onSwipeCallback = function(e) {
                d.log({ action: "swipeWord", word: e });
            };
        },
        movePage: function(d) {
            if (a.browser.msie) {
                var f = a.css(this.context, "paddingTop");
                try {
                    f = parseInt(f);
                } catch (e) {
                    f = 0;
                }
                this.context.style.cssText += ";padding-top:" + (d + f) + "px !important;";
            } else {
                var g = a.css(this.context, "marginTop");
                try {
                    g = parseInt(g);
                } catch (e) {
                    g = 0;
                }
                if (a.css(this.context, "position") === "static") {
                    a.css(this.context, { position: "relative" });
                }
                this.context.style.cssText += ";margin-top:" + (d + g) + "px !important;";
            }

            // EDGE TRANSLATE MODIFICATION START
            notifyEdgeTranslate("page_moved", { translator: "youdao", distance: d });
            // EDGE TRANSLATE MODIFICATION END
        },
        initFrame: function(f, i) {
            var d = this;
            var h = document.createElement("div");
            h.id = "OUTFOX_BAR_WRAPPER";
            this.context.appendChild(h);

            // EDGE TRANSLATE MODIFICATION START
            notifyEdgeTranslate("banner_created", { translator: "youdao" });
            // EDGE TRANSLATE MODIFICATION END

            this.wrapper = h;
            function g(k) {
                k.innerHTML = '<iframe id="OUTFOX_JTR_BAR" src="" style="display:none;"></iframe>';
                var j = a.query("#OUTFOX_JTR_BAR");
                j.setAttribute("frameBorder", 0);
                if (a.browser.msie && document.domain != window.location.hostname) {
                    j.src =
                        "javascript:void(document.write(\"<script>document.domain='" +
                        document.domain +
                        "';</script><body></body>\"))";
                }
                if (
                    a.browser.msie &&
                    !(a.browser.msie === "8.0" && document.compatMode === "CSS1Compat")
                ) {
                    a.css(j, { width: a.getPageSize().window.width + "px" });
                    a.bind(window, "resize", function(l) {
                        a.css(j, { width: a.getPageSize().window.width + "px" });
                    });
                }
                return j;
            }
            var e = g(h);
            this.iframe = e;
            setTimeout(function() {
                try {
                    d.frame = e.contentDocument || e.contentWindow.document;
                } catch (j) {
                    d.log({ action: "secRestrict", relatedURL: window.location.href });
                    alert(d.permissionDenied);
                    return;
                }
                a.css(e, { display: "block" });
                a.addClass(e, "OUTFOX_JTR_BAR");
                a.loadCSS(d.frame, f);
                d.frame.body.id = "OUTFOX_JTR_BAR_BODY";
                a.addClass(d.frame.body, "forbid-select");
                d.frame.body.onselectstart = d.frame.body.ondrag = function() {
                    return false;
                };
                i.call(d);
            }, 100);
        },
        initBarClose: function() {
            var d = this;
            var e = this.frame.getElementById("OUTFOX_JTR_BAR_CLOSE");
            a.addClass(e, "OUTFOX_JTR_BAR_CLOSE");
            a.bind(window, "resize", function(f) {
                a.css(e, { top: 1 + "px", right: 1 + "px" });
            });
            a.bind(e, "click", function() {
                d.disable();
                d.movePage(-d.barHeight);
                d.context.removeChild(d.wrapper);
                var tmp = a.query("#OUTFOX_JTR_CDA");
                if (tmp) {
                    d.context.removeChild(tmp);
                }
                tmp = a.query("#yddWrapper");
                if (tmp) {
                    d.context.removeChild(tmp);
                }
                tmp = a.query("#outfox_seed_js");
                if (tmp) {
                    d.context.removeChild(tmp);
                }
            });
        },
        initTipContent: function() {
            if (!this.update) {
                return;
            }
            var d = this;
            var e = function() {
                var i = a.query("#OUTFOX_JTR_BAR_CLOSE_UPDATE_TIP_CONTENT", d.frame);
                var f = a.query("#OUTFOX_JTR_BAR_UPDATE_SHADE", d.frame);
                var h = a.query("#OUTFOX_JTR_BAR_CLOSE_UPDATE_TIP", d.frame);
                i.innerHTML =
                    "更新提示：<br/>" +
                    d.updateTipMsg +
                    '<span class="update-date">' +
                    d.updateDate +
                    '</span><a href="javascript:void(0);" id="OUTFOX_JTR_BAR_CLOSE_UPDATE_TIP_CONTENT_CLOSE"></a>';
                var g = a.query("#OUTFOX_JTR_BAR_CLOSE_UPDATE_TIP_CONTENT_CLOSE", d.frame);
                a.css(f, { display: "block" });
                a.css(h, { display: "block" });
                a.bind(g, "click", function() {
                    a.css(f, { display: "none" });
                    a.css(h, { display: "none" });
                });
            };
            d.conn.ajax({
                handler: "localStorage",
                data: { key: "date" },
                callback: function(f) {
                    if (f !== d.updateDate) {
                        e();
                        d.conn.ajax({
                            handler: "localStorage",
                            data: { key: "date", value: d.updateDate }
                        });
                    }
                }
            });
        },
        initSwitch: function() {
            var d = this;
            this.statusElem = a.query("#status", this.frame);
            this.switchElem = a.query("#switch", this.frame);
            a.bind(this.switchElem, "click", function(f) {
                if (d.disabled) {
                    d.enable();
                } else {
                    d.disable();
                }
            });
        },
        initLabel: function() {
            this.labels = [];
            var d = this;
            var f = function(i) {
                var g = i || window.event,
                    h = g.target || g.srcElement,
                    j = h.parentNode.getAttribute("rel");
                if (d.disabled) {
                    return;
                }
                if (j) {
                    d.changeMode(c[j][0], c[j][1]);
                    a.each(c, function(k, l) {
                        if (d.mode === l[0] && d.level === l[1]) {
                            d.slider.to(k);
                        }
                    });
                }
            };
            for (var e = 0; e < 4; e++) {
                this.labels[e] = a.query("#level-" + e, this.frame);
                a.bind(this.labels[e], "click", f);
            }
        },
        initSlider: function() {
            var e = a.query("#sliderContainer", this.frame);
            var d = a.query("#slider", this.frame);
            var f = this,
                h = null,
                g = 10;
            this.slider = new a.Slider(e, d, {
                bar: a.query("#sliderBackground", this.frame),
                max: 3,
                min: 0,
                step: 1,
                borderFix: -3,
                callback: function(i) {
                    clearTimeout(h);
                    h = setTimeout(function() {
                        f._valueChange(i);
                    }, g);
                }
            });
        },
        loadSetting: function(f) {
            var e = {};
            if (f === null || Object.prototype.toString.call(f) !== "[object Object]") {
                this.conn.ajax({
                    handler: "localStorage",
                    dataType: "json",
                    data: { key: "settings", value: JSONDAO.stringify(b) }
                });
                e = b;
            } else {
                for (var d in b) {
                    if (b.hasOwnProperty(d)) {
                        e[d] = f.hasOwnProperty(d) ? f[d] : b[d];
                    }
                }
            }
            e.mode = e.mode || b.mode;
            e.level = e.level || b.level;
            a.log("Load Settings:", e);
            this.settings = e;
        },
        _valueChange: function(f) {
            var g = Math.round(f),
                e = c[g][0],
                d = c[g][1];
            if (e !== this.mode) {
                this.changeMode(e, d);
            } else {
                if (d !== this.level) {
                    this.changeLevel(d);
                }
            }
        },
        changeMode: function(e, f) {
            if (this.mode === "TIPS") {
                for (var d = 1; d <= 3; d++) {
                    this.labels[d].className = "deactive";
                }
                this.translator.revertTips();
            } else {
                if (this.mode === "TRANS") {
                    this.labels[0].className = "deactive";
                    this.translator.revertTrans();
                }
            }
            this.swipe.disableSwipe();
            this.disableTransTip();
            this.disableTipsCtrl();
            this.mode = e;
            this.changeLevel(f);
        },
        changeLevel: function(e) {
            a.log("Change level to:", e);
            if (this.level === null) {
                this.log({ action: "view", level: e });
            } else {
                this.log({ action: "changeLevel", oldLevel: this.level, newLevel: e });
            }
            this.level = e;
            if (this.mode === "TIPS") {
                this.swipe.enableSwipe();
                for (var d = 1; d <= 3; d++) {
                    this.labels[d].className = d == e ? "active" : "deactive";
                }
                this.translator.revertTips();
                this.translator.doTips(this.level);
                this.enableTipsCtrl();
            } else {
                if (this.mode === "TRANS") {
                    this.labels[0].className = "active";
                    this.translator.doTrans();
                    this.enableTransTip();
                }
            }
            if (this.mode !== "NONE") {
                this.writeSettings({ mode: this.mode, level: this.level });
            }
        },
        writeSettings: function(d) {
            a.each(
                d,
                function(e, f) {
                    this.settings[e] = f;
                },
                this
            );
            this.conn.ajax({
                handler: "localStorage",
                dataType: "json",
                data: { key: "settings", value: JSONDAO.stringify(this.settings) }
            });
        },
        initTipsCtrl: function() {
            var d = this,
                f = this.initTipsCtrlElem();
            var e = null;
            this.tipsTarget = null;
            this.tipsCtrlHandler = function(j) {
                var h = j || window.evt,
                    i = h.target || h.srcElement,
                    g = 0,
                    k = 0;
                clearTimeout(e);
                if (
                    i === d.tipsTarget ||
                    (i.className && i.className.indexOf("OUTFOX_JTR_NANCI_") !== -1)
                ) {
                    return;
                }
                e = setTimeout(function() {
                    if (f.parentNode) {
                        f.parentNode.removeChild(f);
                    }
                    if (a.hasClass(i, "OUTFOX_NANCI_TIPS")) {
                        var t = a.findPos(i),
                            l = a.query(".OUTFOX_JTR_NANCI_CTRL_WORD", f)[0],
                            m = null;
                        d.context.appendChild(f);
                        l.innerHTML = i.innerHTML;
                        var v = a.css(i, "fontSize");
                        var r = a.css(i, "fontFamily");
                        try {
                            if (v.indexOf("em") != -1) {
                            } else {
                                if (parseInt(v) < 12) {
                                    v = "12px";
                                }
                            }
                        } catch (q) {
                            v = "12px";
                        }
                        var w = !!(a.css(document.body, "position") !== "static");
                        var o = a.css(document.body, "marginLeft");
                        var s = a.css(document.body, "marginRight");
                        if (o === "auto" && s === "auto") {
                            var u = a.getPageSize().page.width;
                            var p = parseInt(a.css(document.body, "width"));
                            if (u > p) {
                                o = (u - p) / 2;
                            } else {
                                o = 0;
                            }
                        }
                        o = w ? parseInt(o) : 0;
                        var n = w ? parseInt(a.css(document.body, "marginTop")) : 0;
                        a.css(l, { fontSize: v });
                        a.css(l, { fontFamily: r });
                        a.css(f, {
                            left: t.x - o + "px",
                            top: t.y - n + "px",
                            position: "absolute"
                        });
                        d.tipsTarget = i;
                    } else {
                        d.tipsTarget = null;
                    }
                }, 200);
            };
        },
        initTipsCtrlElem: function() {
            var j = document.createElement("span"),
                g = document.createElement("span"),
                h = document.createElement("a"),
                i = document.createElement("span"),
                k = document.createElement("a"),
                d = document.createElement("span"),
                l = this;
            d.className = "OUTFOX_JTR_NANCI_CTRL_WORD";
            j.appendChild(d);
            h.className = "OUTFOX_JTR_NANCI_CTRL_DETAIL";
            h.setAttribute("title", "查看详细解释");
            h.innerHTML = "详解";
            g.appendChild(h);
            g.className = "OUTFOX_JTR_NANCI_CTRL_DETAIL_BG";
            j.appendChild(g);
            k.className = "OUTFOX_JTR_NANCI_CTRL_CLOSE";
            k.setAttribute("title", "我知道了");
            k.innerHTML = "关闭";
            i.appendChild(k);
            i.className = "OUTFOX_JTR_NANCI_CTRL_CLOSE_BG";
            j.appendChild(i);
            j.className = "OUTFOX_JTR_NANCI_BAR";
            var f = function() {
                var m = null;
                try {
                    m = l.tipsTarget.previousSibling;
                } catch (n) {}
                return m;
            };
            var e = function(o) {
                var m = null;
                if (document.createRange) {
                    var n = window.getSelection();
                    m = document.createRange();
                    n.removeAllRanges();
                    m.selectNode(o);
                    n.addRange(m);
                } else {
                    if (document.body.createTextRange) {
                        m = document.body.createTextRange();
                        m.moveToElementText(o);
                        m.select();
                    }
                }
            };
            a.bind(h, "click", function(o) {
                var q = f();
                if (q && l.swipe) {
                    l.log({ action: "viewDetail", word: q.innerHTML });
                    e(q);
                    var p = document.createElement("font");
                    p.innerHTML = "&nbsp";
                    q.appendChild(p);
                    var n = a.findPos(p),
                        m = p.offsetHeight;
                    q.removeChild(p);
                    l.swipe.swipeWord(q.firstChild.nodeValue, n.x, n.y, 0, m);
                }
                j.parentNode.removeChild(j);
                a.removeClass(l.tipsTarget, "on");
            });
            a.bind(k, "click", function(m) {
                var n = j.getAttribute("rel"),
                    o = f();
                if (o) {
                    l.log({ action: "closeTip", word: o.innerHTML, tip: l.tipsTarget.innerHTML });
                    l.translator._manager.revertTip(o);
                }
                j.parentNode.removeChild(j);
                a.removeClass(l.tipsTarget, "on");
            });
            return j;
        },
        _findTipCtrlPosition: function(e, t) {
            var u = e.firstChild,
                n = u.nodeValue,
                p = u.nodeValue.length,
                k = document.createElement("font"),
                f = document.createTextNode(""),
                r = [0, 0],
                j = null,
                h = null,
                q = null,
                o = 0,
                m = 0,
                d = 0,
                s = p,
                g = null;
            a.css(k, { border: "none", padding: 0, margin: 0 });
            for (var l = 0; l <= p; l++) {
                f.nodeValue = u.nodeValue.substr(l);
                u.nodeValue = u.nodeValue.substr(0, l);
                e.insertBefore(f, u.nextSibling);
                e.insertBefore(k, u.nextSibling);
                q = a.findPos(k);
                o = q.x - t[0];
                m = q.y - t[1];
                if (m <= 0 && (h === null || m > h)) {
                    g = h = m;
                    r[0] = q.x;
                    r[1] = q.y;
                    j = null;
                    d = l;
                }
                if (m !== g) {
                    s = l;
                    g = m;
                }
                u.nodeValue = n;
                e.removeChild(f);
                e.removeChild(k);
            }
            k.innerHTML = u.nodeValue.substr(d, s);
            u.nodeValue = u.nodeValue.substr(0, d);
            e.insertBefore(k, u.nextSibling);
            r[0] += k.offsetWidth;
            e.removeChild(k);
            u.nodeValue = n;
            return r;
        },
        preventClose: function() {
            a.css(a.query("#OUTFOX_JTR_BAR_CLOSE", this.frame), { display: "none" });
        },
        enableTipsCtrl: function() {
            a.bind(this.context, "mouseover", this.tipsCtrlHandler);
        },
        disableTipsCtrl: function() {
            a.unbind(this.context, "mouseover", this.tipsCtrlHandler);
        },
        enableTransTip: function() {
            a.bind(this.context, "mouseover", this.transTipHandler);
        },
        disableTransTip: function() {
            a.unbind(this.context, "mouseover", this.transTipHandler);
        },
        initTransTip: function(d) {
            var f = this,
                g = null,
                e = null;
            this.initTransTipElem("", "");
            this.transTipHandler = function(j) {
                var h = j || window.event,
                    i = h.target || h.srcElement;
                clearTimeout(e);
                e = setTimeout(function() {
                    if (
                        g === i ||
                        (i.className &&
                            (i.className.indexOf("OUTFOX_JTR_TRANSTIP_") !== -1 ||
                                i.className.indexOf("ydd-") !== -1))
                    ) {
                        return;
                    }
                    if (g) {
                        g.style.textDecoration = "none";
                    }
                    if (f.transTipElem.elem.parentNode) {
                        f.transTipElem.elem.parentNode.removeChild(f.transTipElem.elem);
                    }
                    if (a.hasClass(i, "OUTFOX_JTR_TRANS_NODE")) {
                        g = i;
                        var k = i.getAttribute("rel"),
                            l = f.translator._manager;
                        f.resetTransTipElem(l.originals[k], l.transResults[k], k);
                        f.context.appendChild(f.transTipElem.elem);
                        f.positionElementInViewPort({ target: i, tip: f.transTipElem.elem });
                        i.style.textDecoration = "underline";
                    } else {
                        g = null;
                    }
                }, 200);
            };
        },
        initTransTipElem: function() {
            var k = this,
                g = document.createElement("div");
            g.className = "OUTFOX_JTR_TRANSTIP_WRAPPER";
            var m = document.createTextNode("");
            var e = document.createTextNode("");
            g.innerHTML +=
                '<div class="OUTFOX_JTR_TRANSTIP_ORIGIN">                                        <div class="ydd-container">                                          <div class="ydd-top-wrapper">                                            <div class="ydd-top">                                            </div>                                          </div>                                          <div class="ydd-body-wrapper">                                            <div class="ydd-lb"></div>                                            <div class="ydd-rb"></div>                                            <div class="ydd-body">                                              <div class="ydd-title">                                                <strong>原文：</strong>                                              </div>                                              <div class="ydd-middle">                                                <div class="OUTFOX_JTR_TRANSTIP_ORIGIN_TEXT"></div>                                                <div class="OUTFOX_JTR_TRANSTIP_ADVISE">                                                  <textarea class="OUTFOX_JTR_TRANSTIP_ADVISE_TEXT"></textarea>                                                  <a class="OUTFOX_JTR_TRANSTIP_ADVISE_SUBMIT" href="javascript:void(0);">提交翻译建议</a>                                                </div>                                              </div>                                            </div>                                          </div>                                          <div class="ydd-bottom-wrapper">                                            <div class="ydd-bottom">                                              <a class="OUTFOX_JTR_TRANSTIP_ADVISE_TOGGLE">更好的翻译建议</a>                                              <span class="OUTFOX_JTR_TRANSTIP_ADVISE_THANK">感谢您为有道提供建议^_^</span>                                            </div>                                          </div>                                          <div class="ydd-bg-top"></div>                                        </div>                                      </div>';
            a.query(".OUTFOX_JTR_TRANSTIP_ORIGIN_TEXT", g)[0].appendChild(e);
            a.query(".OUTFOX_JTR_TRANSTIP_ADVISE_TEXT", g)[0].appendChild(m);
            var f = a.query(".OUTFOX_JTR_TRANSTIP_ADVISE_TOGGLE", g)[0],
                i = a.query(".OUTFOX_JTR_TRANSTIP_ADVISE_SUBMIT", g)[0],
                l = a.query(".OUTFOX_JTR_TRANSTIP_ADVISE", g)[0],
                d = a.query(".ydd-bottom", g)[0],
                h = a.query(".OUTFOX_JTR_TRANSTIP_ADVISE_TEXT", g)[0];
            i.hideFocus = true;
            a.bind(f, "click", function() {
                a.toggleClass(l, "expand");
                a.css(f, { display: "none" });
            });
            var j = function(n) {
                n = n.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                return n;
            };
            a.bind(i, "click", function() {
                var o = h.value;
                if (o === "") {
                    alert("翻译建议不能为空，请您输入内容后再次提交");
                    return;
                }
                o = j(o);
                a.addClass(l, "finish");
                a.removeClass(l, "expand");
                a.addClass(d, "OUTFOX_JTR_TRANSTIP_ADVISE_THANK_TIP");
                var n = k.transTipElem.index;
                if (n && k.manager.transResults[n]) {
                    k.manager.transResults[n] = o;
                    k.manager.revertTrans(n);
                    k.manager.replaceTrans(n);
                }
            });
            this.transTipElem = {
                elem: g,
                transTextContainer: h,
                trans: m,
                original: e,
                toggle: f,
                submit: i,
                advise: l,
                bottom: d,
                index: null
            };
        },
        resetTransTipElem: function(d, f, e) {
            a.removeClass(this.transTipElem.advise, "finish");
            a.removeClass(this.transTipElem.advise, "expand");
            a.removeClass(this.transTipElem.bottom, "OUTFOX_JTR_TRANSTIP_ADVISE_THANK_TIP");
            this.transTipElem.toggle.innerHTML = "提交翻译建议";
            a.css(this.transTipElem.toggle, { display: "" });
            this.transTipElem.transTextContainer.value = f;
            this.transTipElem.original.nodeValue = d;
            this.transTipElem.index = e;
        }
    };
})(J);
(function(d) {
    var f = "https://fanyi.youdao.com/web2";
    var g = "https://fanyi.youdao.com";
    var h = chrome.runtime.getURL("youdao/conn.html");
    var c = f + "/index.do";
    var a = g + "/jtr";
    var e = f + "/rl.do";
    var b = chrome.runtime.getURL("youdao/main.css");
    d.loadCSS(document, b);
    window.OUTFOX_JavascriptTranslatoR = new d.TR.UI(document.body, {
        domain: g,
        update: false,
        updateTipMsg: "修复链接错误",
        updateDate: "2013-12-24",
        cssURL: b,
        tipsURL: c,
        transURL: a,
        // 禁用log以避免跨域cookie造成的问题(#107)
        // logURL: e,
        connFilePath: h,
        reqSize: 20
    });
})(J);
