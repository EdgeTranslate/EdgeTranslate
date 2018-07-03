var display = function (content) {
    createBlock(content);
    chrome.runtime.onMessage.removeListener(display);
}
var createBlock = function (content) {
    let frame = document.createElement('DIV');
    frame.id = 'translate_frame';
    var p = document.createElement('p');
    p.innerText = content;
    frame.appendChild(p);
    document.body.appendChild(frame);
}
chrome.runtime.onMessage.addListener(display);