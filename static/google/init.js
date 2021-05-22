/**
 * 检测用户语言，并设定翻译组件的语言。
 */
chrome.runtime.sendMessage(
    JSON.stringify({ type: "service", service: "get_lang" }),
    function (response) {
        let s = document.getElementById("google-translate-injection");
        if (s !== null) {
            s.remove();
        }

        s = document.createElement("script");
        let user_lang = response && response.lang ? response.lang : "zh-CN";

        s.id = "google-translate-injection";
        s.src = `${chrome.runtime.getURL("")}google/injection.js`;
        s.setAttribute("user-lang", user_lang);
        s.setAttribute("edge-translate-url", chrome.runtime.getURL(""));
        document.getElementsByTagName("head")[0].appendChild(s);
        return true;
    }
);
