// Copyright 2010 Google Inc. All Rights Reserved.

function injection() {
    var pageLang = "en";
    var userLang = "zh-CN";

    var uid = "1E07F158C6FA4460B352973E9693B329";
    var teId = "TE_" + uid;
    var cbId = "TECB_" + uid;

    var edge_translate_url = document.getElementById("edge_translate_url");
    this.EDGE_TRANSLATE_URL = edge_translate_url.getAttribute("data");
    document.documentElement.removeChild(edge_translate_url);

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
            pageLanguage: pageLang
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
            s.src = EDGE_TRANSLATE_URL + "google/element.js";
            document.getElementsByTagName("head")[0].appendChild(s);
        }
    }
}

var s = document.createElement("script");
s.innerHTML = "(function(){(" + injection.toString() + ")();})();";
document.getElementsByTagName("head")[0].appendChild(s);
