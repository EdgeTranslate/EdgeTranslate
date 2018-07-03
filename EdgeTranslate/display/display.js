// 用于存储一个div元素，这个元素用来在页面的右侧展示翻译结果
var frame;

/**
 * 负责根据传入的翻译结果内容将结果显示在用户正在使用的页面中
 * 
 * @param {Object} content 翻译的结果
 */
var display = function (content) {
    createBlock(content);
    chrome.runtime.onMessage.removeListener(display);
}

/**
 * 在页面的右侧创建一块区域，用于显示翻译的结果，创建一个frame元素，将其插入到document中
 * 
 * @param {Object} content 翻译的结果
 */
var createBlock = function (content) {
    frame = document.createElement('DIV');
    frame.id = 'translate_frame';
    document.body.style.transition = 'width 500ms';
    document.body.style.width = '85%';
    document.documentElement.addEventListener('click', clickListener)

    var p = document.createElement('p');
    p.innerText = content;

    let closeIcon = document.createElement('i');
    closeIcon.className = 'translate-icon-close';
    closeIcon.onclick = removeSlider;

    document.documentElement.appendChild(frame);
    frame.appendChild(closeIcon);
    frame.appendChild(p);
}

/**
 * 
 * 一个工具api,判断传入的第一个元素是否是传入的第二个元素的子节点
 * 
 * @param {Element} node1 第一个document Element 元素
 * @param {Element} node2 第二个document Element 元素
 */
var isChildNode = function (node1, node2) {
    while (!node1.isSameNode(document.body)) {
        if (node1.isSameNode(node2))
            return true;
        else
            node1 = node1.parentNode;
    }
    return false;
}

/**
 * 
 * 用于处理点击页面除侧边栏外的区域的回调函数 ，负责将侧边栏关闭
 * 
 * @param {object} event 点击事件的object
 */
var clickListener = function (event) {
    let node = event.target;
    if (!isChildNode(node, frame)) {
        removeSlider();
    }
}

/**
 * 将侧边栏元素从页面中除去，即将frame从document中删除
 */
var removeSlider = function () {
    document.documentElement.removeChild(frame);
    document.body.style.width = '100%';
    document.documentElement.removeEventListener('click', clickListener);
}
chrome.runtime.onMessage.addListener(display);