// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * 检测用户语言，并设定翻译组件的语言。
 */
chrome.runtime.sendMessage({ type: "get_lang" }, function(response) {
    var s = document.getElementById("google-translate-injection");
    if (s !== null) {
        s.remove();
    }

    s = document.createElement("script");
    var user_lang = response && response.lang ? response.lang : "zh-CN";

    s.id = "google-translate-injection";
    s.setAttribute("user-lang", user_lang);
    s.setAttribute("edge-translate-url", chrome.runtime.getURL(""));
    s.innerHTML = "(function(){(" + injection.toString() + ")();})();";
    document.getElementsByTagName("head")[0].appendChild(s);
    return true;
});

function injection() {
    var uid = "1E07F158C6FA4460B352973E9693B329";
    var teId = "TE_" + uid;
    var cbId = "TECB_" + uid;

    var injection_ele = document.getElementById("google-translate-injection");
    this.USER_LANG = injection_ele.getAttribute("user-lang");
    injection_ele.removeAttribute("user-lang");
    this.EDGE_TRANSLATE_URL = injection_ele.getAttribute("edge-translate-url");
    injection_ele.removeAttribute("edge-translate-url");

    function show() {
        window.setTimeout(function() {
            window[teId].showBanner(true);
        }, 10);
    }

    function newElem() {
        // eslint-disable-next-line no-undef
        var elem = new google.translate.TranslateElement({
            autoDisplay: false,
            floatPosition: 0,
            multilanguagePage: true,
            pageLanguage: "auto"
        });
        return elem;
    }

    if (window[teId]) {
        show();
    } else {
        // eslint-disable-next-line no-undef
        if (!window.google || !google.translate || !google.translate.TranslateElement) {
            if (!window[cbId]) {
                window[cbId] = function() {
                    window[teId] = newElem();
                    show();
                };
            }
            var s = document.createElement("script");
            s.src = this.EDGE_TRANSLATE_URL + "google/element.js";
            document.getElementsByTagName("head")[0].appendChild(s);
        }
    }
}
