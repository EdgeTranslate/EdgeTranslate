/*
 * 使用内置pdf viewer打开pdf文件。
 */
window.onload = function () {
    chrome.runtime.sendMessage({
        "url": chrome.runtime.getURL("pdf/viewer.html?file=" +  window.location.href)
    });
}