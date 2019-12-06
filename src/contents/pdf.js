/**
 * 处理PDF文件链接
 *
 * 1. 如果是使用浏览器打开PDF文件，根据用户设定决定是否跳转到插件内置PDF阅读器。
 *
 * 2. 如果是在浏览器内置的PDF阅读器中点刷新，根据用户设定决定是否跳转到插件内置PDF阅读器。
 *
 * 3. 如果是从插件内置PDF阅读器中返回，不再自动跳转到插件内置PDF阅读器。
 */
window.onload = function() {
    if (
        this.document.body.children[0] &&
        this.document.body.children[0].type === "application/pdf"
    ) {
        var state = history.state;
        if (state === null) {
            state = { ET_visited: true };
            redirect();
        } else if (!state.ET_visited) {
            state.ET_visited = true;
            redirect();
        } else {
            state.ET_visited = false;
        }

        history.replaceState(state, document.title);
    }
};

/**
 * 向background.js发送消息实现跳转。
 */
function redirect() {
    chrome.storage.sync.get("OtherSettings", function(result) {
        var OtherSettings = result.OtherSettings;
        if (OtherSettings && OtherSettings["UsePDFjs"]) {
            chrome.runtime.sendMessage({
                type: "redirect",
                url: chrome.runtime.getURL("pdf/viewer.html?file=" + window.location.href)
            });
        }
    });
}
