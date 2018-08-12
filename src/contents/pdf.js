/**
 * 根据用户设置决定是否启用内置pdf查看器。
 */
chrome.storage.sync.get("OtherSettings", function (result) {
    var OtherSettings = result.OtherSettings;
    if (OtherSettings && OtherSettings["UsePDFjs"]) {
        chrome.runtime.sendMessage({
            "url": chrome.runtime.getURL("pdf/viewer.html?file=" +  window.location.href)
        });
    }
});
