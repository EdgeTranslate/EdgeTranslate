function onClickHandler(clickedElement) {
    var text = clickedElement.selectionText;

    var request = new XMLHttpRequest();
    request.open("GET", "https://translate.google.cn/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&dt=at&q=" + text, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log(response);
            var response = JSON.parse(request.response);
            var meanings = response[5][0][2];
            var meaning = "";
            for (var i = 0; i < meanings.length; i++) {
                meaning += meanings[i][0] + ", ";
            }
            showTranslate(clickedElement, meaning);
            alert(meaning);
        }
    }
};

var showTranslate = function (element, content) {
    console.log(element);
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({ "title": "Easy Translate", "contexts": ["selection"], "id": "context_selection" });
});