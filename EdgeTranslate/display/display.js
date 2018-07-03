// the div block to display all translation
var frame;

var display = function (content) {
    createBlock(content);
    chrome.runtime.onMessage.removeListener(display);
}

var createBlock = function (content) {
    frame = document.createElement('DIV');
    frame.id = 'translate_frame';
    var p = document.createElement('p');
    p.innerText = content;
    frame.appendChild(p);
    document.documentElement.appendChild(frame);
    document.body.style.transition = 'width 500ms';
    document.body.style.width = '85%';
    document.documentElement.addEventListener('click', clickListener)
}

var isParentNode = function (node1, node2) {
    while (!node1.isSameNode(document.body)) {
        if (node1.isSameNode(node2))
            return true;
        else
            node1 = node1.parentNode;
    }
    return false;
}

var clickListener = function (event) {
    let node = event.target;
    if (!isParentNode(node, frame)) {
        document.documentElement.removeChild(frame);
        document.body.style.width = '100%';
        document.documentElement.removeEventListener('click', clickListener);
    }
}
chrome.runtime.onMessage.addListener(display);