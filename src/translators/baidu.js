export default TRANSLATOR;

/**
 * Baidu translator interface.
 */
class BaiduTranslator {
    constructor() {
        this.MAX_RETRY = 3; // Max retry times after failure.
        this.HOST = "https://fanyi.baidu.com/"; // Baidu translation url
        this.token = ""; // one of request parameters
        this.gtk = ""; // used to calculate value of "sign"
        this.sign = ""; // one of request parameters
        this.languages = {};
        /**
         * Request headers
         */
        this.HEADERS = {
            accept: "*/*",
            "accept-language":
                "en,zh;q=0.9,en-GB;q=0.8,en-CA;q=0.7,en-AU;q=0.6,en-ZA;q=0.5,en-NZ;q=0.4,en-IN;q=0.3,zh-CN;q=0.2",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        };
    }

    /**
     * Get latest token and gtk for urls.
     *
     * @returns {Promise} then(this=>callback()) used to run callback. catch(error) used to catch error
     */
    getTokenGtk() {
        let oneRequest = () => {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open("GET", this.HOST, true);
                request.send();
                request.onreadystatechange = () => {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            window.document.innerHTML = request.responseText;
                            this.token = request.responseText.match(/token: '(.*?)',/)[1];
                            this.gtk = request.responseText.match(/window.gtk = '(.*?)'/)[1];
                            resolve(this);
                        }
                    }
                };
                request.ontimeout = function(e) {
                    reject(e);
                };
                request.onerror = function(e) {
                    reject(e);
                };
            });
        };
        // request two times to ensure the token is the latest value
        // otherwise the request would return "997" error
        return oneRequest().then(() => {
            return oneRequest();
        });
    }

    /**
     * Parse the translate result.
     *
     * @param {Object} result translate result
     * @returns {Object} Parsed result
     */
    parseResult(result) {
        let parsed = {};
        parsed.originalText = result.trans_result.data[0].src;
        parsed.mainMeaning = result.trans_result.data[0].dst;
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text to detect
     * @returns {Promise} then(result) used to return request result. catch(error) used to catch error
     */
    detect(text) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let path = "langdetect";

            request.open("POST", this.HOST + path);
            for (let key in this.HEADERS) {
                request.setRequestHeader(key, this.HEADERS[key]);
            }
            let data = new URLSearchParams({
                query: text
            });
            request.send(data.toString());
            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        resolve(request.response);
                    }
                }
            };
            request.ontimeout = function(e) {
                reject(e);
            };
            request.onerror = function(e) {
                reject(e);
            };
        });
    }

    /**
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     * @returns {Promise} then(result) used to return request result. catch(error) used to catch error
     */
    translate(text, from, to) {
        var reTryCount = 0;
        // send translation request one time
        // if the first request fails, resend requests no more than {this.MAX_RETRY} times
        let translateOneTime = function() {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                let path = "/v2transapi?" + "from=" + from + "&to=" + to;

                request.open("POST", this.HOST + path);
                for (let key in this.HEADERS) {
                    request.setRequestHeader(key, this.HEADERS[key]);
                }
                let data = new URLSearchParams({
                    from: from,
                    to: to,
                    query: text,
                    transtype: "realtime",
                    simple_means_flag: 3,
                    sign: this.generateSign(text, this.gtk),
                    token: this.token,
                    domain: "common"
                });
                request.send(data.toString());

                request.onreadystatechange = () => {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            let responseObject = JSON.parse(request.response);
                            // token is out of date and try to resend request
                            if (responseObject.errno) {
                                if (reTryCount < this.MAX_RETRY) {
                                    reTryCount++;
                                    resolve(
                                        // get new token and gtk
                                        this.getTokenGtk().then(() => {
                                            // resend translation request
                                            return translateOneTime();
                                        })
                                    );
                                } else reject(responseObject);
                            }
                            resolve(request.response);
                        }
                    }
                };
                request.ontimeout = function(e) {
                    reject(e);
                };
                request.onerror = function(e) {
                    reject(e);
                };
            });
        }.bind(this);
        // if old token and gtk exist
        if (this.token && this.gtk) {
            return translateOneTime();
        } else {
            // get token and gtk when the translator is initiated
            return this.getTokenGtk().then(() => {
                return translateOneTime();
            });
        }
    }

    /* eslint-disable */
    tokenA(r, o) {
        for (var t = 0; t < o.length - 2; t += 3) {
            var a = o.charAt(t + 2);
            (a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a)),
                (a = "+" === o.charAt(t + 1) ? r >>> a : r << a),
                (r = "+" === o.charAt(t) ? (r + a) & 4294967295 : r ^ a);
        }
        return r;
    }
    generateSign(query, gtk) {
        var C = null;
        var o = query.length;
        o > 30 &&
            (query =
                "" +
                query.substr(0, 10) +
                query.substr(Math.floor(o / 2) - 5, 10) +
                query.substring(query.length, query.length - 10));
        var t = void 0,
            t = null !== C ? C : (C = gtk || "") || "";
        for (
            var e = t.split("."),
                h = Number(e[0]) || 0,
                i = Number(e[1]) || 0,
                d = [],
                f = 0,
                g = 0;
            g < query.length;
            g++
        ) {
            var m = query.charCodeAt(g);
            128 > m
                ? (d[f++] = m)
                : (2048 > m
                      ? (d[f++] = (m >> 6) | 192)
                      : (55296 === (64512 & m) &&
                        g + 1 < query.length &&
                        56320 === (64512 & query.charCodeAt(g + 1))
                            ? ((m = 65536 + ((1023 & m) << 10) + (1023 & query.charCodeAt(++g))),
                              (d[f++] = (m >> 18) | 240),
                              (d[f++] = ((m >> 12) & 63) | 128))
                            : (d[f++] = (m >> 12) | 224),
                        (d[f++] = ((m >> 6) & 63) | 128)),
                  (d[f++] = (63 & m) | 128));
        }
        for (var S = h, u = "+-a^+6", l = "+-3^+b+-f", s = 0; s < d.length; s++)
            (S += d[s]), (S = this.tokenA(S, u));
        return (
            (S = this.tokenA(S, l)),
            (S ^= i),
            0 > S && (S = (2147483647 & S) + 2147483648),
            (S %= 1e6),
            S.toString() + "." + (S ^ h)
        );
    }
    /* eslint-enable */
}

/**
 * Create default translator object.
 */
window.TRANSLATOR = new BaiduTranslator();
var TRANSLATOR = window.TRANSLATOR;
