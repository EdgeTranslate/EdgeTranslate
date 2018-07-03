var display = function (content) {
    alert(content);
    chrome.runtime.onMessage.removeListener(display);
}
chrome.runtime.onMessage.addListener(display);