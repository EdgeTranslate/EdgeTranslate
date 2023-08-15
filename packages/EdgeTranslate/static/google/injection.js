// Copyright 2010 Google Inc. All Rights Reserved.

(function () {
    let uid = "1E07F158C6FA4460B352973E9693B329";
    let teId = `TE_${uid}`;
    let cbId = `TECB_${uid}`;

    let injection_ele = document.getElementById("google-translate-injection");
    this.USER_LANG = injection_ele.getAttribute("user-lang");
    injection_ele.removeAttribute("user-lang");
    this.EDGE_TRANSLATE_URL = injection_ele.getAttribute("edge-translate-url");
    injection_ele.removeAttribute("edge-translate-url");

    function show() {
        window.setTimeout(function () {
            window[teId].showBanner(true);
        }, 10);
    }

    function newElem() {
        // eslint-disable-next-line no-undef
        let elem = new google.translate.TranslateElement({
            autoDisplay: false,
            floatPosition: 0,
            multilanguagePage: true,
            pageLanguage: "auto",
        });
        return elem;
    }

    if (window[teId]) {
        show();
    }
    // eslint-disable-next-line no-undef
    else if (!window.google || !google.translate || !google.translate.TranslateElement) {
        if (!window[cbId]) {
            window[cbId] = function () {
                window[teId] = newElem();
                show();
            };
        }

        let s = document.createElement("script");
        s.src = `${this.EDGE_TRANSLATE_URL}google/elms/elm_${this.USER_LANG}.js`;
        document.getElementsByTagName("head")[0].appendChild(s);
    }
})();
