function onClickHandler(info, tabs) {
    var text = info.selectionText;

    var request = new XMLHttpRequest();
    request.open("GET", "https://translate.google.cn/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&dt=at&q=" + text, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.response);
            console.log(response);
            var meanings = response[5][0][2];
            var meaning = "";
            for (var i = 0; i < meanings.length; i++) {
                meaning += meanings[i][0] + ", ";
            }
            showTranslate(tabs, meaning);
        }
    }
};

var showTranslate = function (tabs, content) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            alert(content);
        }
        else {
            chrome.tabs.executeScript(tabs[0].id, {
                file: './display/display.js'
            }, function (tab) {
                if (chrome.runtime.lastError) {
                    alert(content);
                } else{
                    chrome.tabs.sendMessage(tabs[0].id, content);
                }
            })
        }
    })
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
