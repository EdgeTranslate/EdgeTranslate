// 用于存储一个div元素，这个元素用来在页面的右侧展示翻译结果
var frame;

var mousedown = false;
var originX;
var originWidth;

/**
 * 负责根据传入的翻译结果内容将结果显示在用户正在使用的页面中
 * 
 * @param {Object} content 翻译的结果
 */
var display = function (content) {
    console.log(content);
    createBlock(content);
    chrome.runtime.onMessage.removeListener(display);
}

/**
 * 在页面的右侧创建一块区域，用于显示翻译的结果，创建一个frame元素，将其插入到document中
 * 
 * @param {Object} content 翻译的结果
 */
var createBlock = function (content) {
    // 判断frame是否已经添加到了页面中
    if (!isChildNode(frame, document.documentElement)) { // frame不在页面中，创建新的frame
        frame = document.createElement('DIV');
        frame.id = 'translate_frame';
        document.body.style.transition = 'width 500ms';
        document.body.style.width = '85%';
        document.documentElement.addEventListener('click', clickListener)

        frame.innerHTML = render(template, content);
        // 将frame放入document
        document.documentElement.appendChild(frame);
    } else { // frame已经在页面中，直接改变frame的值
        frame.innerHTML = render(template, content);
    }
    addEventListener();
}

/**
 * 需要对侧边栏中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {
    // 给关闭按钮添加点击事件监听，用于关闭侧边栏
    document.getElementsByClassName('translate-icon-close')[0].onclick = removeSlider;
    frame.addEventListener('mousedown', dragHandler);
    frame.addEventListener('mousemove', moveHandler);
    document.addEventListener('mousemove', dragOn);
    document.addEventListener('mouseup', dragOff);
}

/**
 * 
 * 一个工具api,判断传入的第一个元素是否是传入的第二个元素的子节点
 * 
 * @param {Element} node1 第一个document Element 元素,非空
 * @param {Element} node2 第二个document Element 元素，非空
 */
var isChildNode = function (node1, node2) {
    // 判断传入的参数是否合法
    if (!(node1 && node2))
        return false;
    while (node1 && !node1.isSameNode(document.body)) {
        if (node1.isSameNode(node2))
            return true;
        else
            node1 = node1.parentNode;
    }
    return false;
}

/**
 * block start
 * 事件监听的回调函数定义请在此区域中进行
 */

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
    document.removeEventListener('mousemove', dragOn);
    document.removeEventListener('mouseup', dragOff);
}

/**
 * 处理鼠标的拖动事件
 * @param {Object} event 
 */
var dragOn = function (event) {
    if (mousedown) {
        frame.style.width = originX - event.x + originWidth + 'px';
        document.body.style.width = window.innerWidth - originWidth - (originX - event.x) + 'px';
    }
}

var dragOff = function () {
    if (mousedown) {
        frame.style.transition = 'width 500ms';
        document.body.style.transition = 'width 500ms';
        mousedown = false;
    }
}

var dragHandler = function (event) {
    var node = event.target;
    if (node.isSameNode(frame)) {
        if (event.x <= node.offsetLeft + 4) {
            mousedown = true;
            frame.style.transition = 'none';
            document.body.style.transition = 'none';
            originX = node.offsetLeft;
            originWidth = node.clientWidth;
        }
    }
}

/**
 * 
 * 处理鼠标移动到侧边栏附近鼠标形状的改变特效
 * 
 * @param {Object} event 事件发生的所有信息
 */
var moveHandler = function (event) {
    var node = event.target;
    if (node.isSameNode(frame)) {
        if (event.x <= node.offsetLeft + 4)
            frame.style.cursor = 'e-resize';
        else
            frame.style.cursor = 'auto';
    }
}
/**
 * end block
 */


chrome.runtime.onMessage.addListener(display);