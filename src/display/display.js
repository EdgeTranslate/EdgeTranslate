import render from './engine.js';
/**
 * load templates
 */
// load templates
import result from './templates/result.html'; // template of translate result
import loading from './templates/loading.html'; // template of loading icon
import error from './templates/error.html'; // template of error message

/**
 * end load
 */

// 用于存储一个iframe元素，这个元素用来在页面的右侧展示翻译结果
var frame;
// iframe中的 document
var frameDocument;

var mousedown = false; // 在鼠标拖动边框时，用于标记鼠标是否已经按下
var originX; // 鼠标开始拖动的x坐标轴初始位置
var originWidth; // 侧边栏的初始宽度
var originOriginWidth; // 存储网页body的原始宽度
if (!fixSwitch) {
    var fixSwitch = false; // 固定侧边栏的开关 true<->switch on  false<->switch off
}
var translateResult; // 保存翻译结果
var sourceTTSSpeed, targetTTSSpeed;
var popupPosition; // 保存侧边栏展示的位置
const dragSensitivity = 15;  // 用来调节拖动侧边栏的灵敏度的参数 单位:px
const transitionDuration = 500; // 侧边栏出现动画的持续事件 单位:ms

/**
 * 负责处理后台发送给页面的消息
 * 
 * @param {Object} message 后台发送的消息
 * @param {Object} sender 返送消息者的具体信息 如何发送者、是content_script，会有tab属性，如果是background，则没有tab属性
 */
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    if (!sender || !sender.tab) { // 避免从file://跳转到pdf viewer的消息传递对此的影响
        switch (message.type) {
            // 发送的是翻译结果
            case "translateResult":
                translateResult = message.translateResult;
                sourceTTSSpeed = "fast";
                targetTTSSpeed = "fast";
                createBlock(message.translateResult, result);
                break;
            // 发送的是翻译状态信息
            case "info":
                switch (message.info) {
                    case "start_translating":
                        createBlock(message, loading);
                        break;
                    case "network_error":
                        createBlock(message, error);
                        break;
                    default:
                        break;
                }
            // 发送的是快捷键命令
            case "command":
                switch (message.command) {
                    case "fix_result_frame":
                        if (fixSwitch) {
                            fixOff();
                        } else {
                            fixOn();
                        }
                        break;
                    case "close_result_frame":
                        removeSlider();
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        if (callback)
            callback();
        return true;
    }
});

/**
 * 在页面的右侧创建一块区域，用于显示翻译的结果，创建一个frame元素，将其插入到document中
 * 
 * @param {Object} content 翻译的结果
 * @param {String} template 需要渲染的模板
 */
function createBlock(content, template) {
    // 获取用户对侧边栏展示位置的设定
    chrome.storage.sync.get("LayoutSettings", function (result) {
        var layoutSettings = result.LayoutSettings;
        popupPosition = layoutSettings["PopupPosition"]; // 保存侧边栏展示的位置

        // 判断frame是否已经添加到了页面中
        if (!isChildNode(frame, document.documentElement)) { // frame不在页面中，创建新的frame
            frame = document.createElement('iframe');
            frame.id = 'translate_frame';
            document.body.style.transition = 'width ' + transitionDuration + 'ms';
            originOriginWidth = document.body.clientWidth;
            document.body.style.width = 80 + '%';
            if (popupPosition === 'left') { // 用户设置 在页面左侧显示侧边栏
                document.body.style.position = 'absolute';
                document.body.style.marginLeft = 0.2 * originOriginWidth + 'px';
                document.body.style.right = '0';
                document.body.style.left = '';
                frame.style.left = '0';
            } else {
                document.body.style.margin = '0';
                document.body.style.right = '';
                document.body.style.left = '0';
                frame.style.right = '0';
            }
            document.documentElement.appendChild(frame);
            frameDocument = frame.contentDocument;
        }

        // Write contents into iframe. Apply different strategies based on browser type.
        if (navigator.userAgent.indexOf('Chrome') >= 0) {
            frameDocument.open();
            frameDocument.write(render(template, content));
            frameDocument.close();
        } else {
            let script = frameDocument.createElement("script");
            let text = render(Template, content).replace(/\'/g, "\\\'");
            script.textContent = "document.open();document.write('" + text + "');document.close();";
            frameDocument.documentElement.appendChild(script);
        }

        // 添加事件监听
        addEventListener();
    });
}

/**
 * 需要对侧边栏中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {
    // 给点击侧边栏之外区域事件添加监听，点击侧边栏之外的部分就会让侧边栏关闭
    if (!fixSwitch) {
        document.documentElement.addEventListener('mousedown', clickListener);
    } else {
        fixOn();
    }
    document.addEventListener('mousemove', documentDragOn);
    frameDocument.addEventListener('mousemove', iframeDragOn);
    document.addEventListener('mousedown', documentDragOn);
    frameDocument.addEventListener('mousedown', iframeDragOn);
    document.addEventListener('mousemove', drag);
    frameDocument.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragOff);
    frameDocument.addEventListener('mouseup', dragOff);
    // 给关闭按钮添加点击事件监听，用于关闭侧边栏
    frameDocument.getElementById('icon-close').onclick = removeSlider;
    // 给固定侧边栏的按钮添加点击事件监听，用户侧边栏的固定与取消固定
    frameDocument.getElementById('icon-tuding-fix').addEventListener('click', fixOn);
    frameDocument.getElementById('icon-tuding-full').addEventListener('click', fixOff);

    let sourcePronounceIcon = frameDocument.getElementById('source-pronounce');
    if (sourcePronounceIcon) {
        sourcePronounceIcon.addEventListener('click', sourcePronounce);
    }

    let targetPronounceIcon = frameDocument.getElementById('target-pronounce');
    if (targetPronounceIcon) {
        targetPronounceIcon.addEventListener('click', targetPronounce);
    }
}

/**
 * 
 * 一个工具api,判断传入的第一个元素是否是传入的第二个元素的子节点
 * 
 * @param {Element} node1 第一个document Element 元素,非空
 * @param {Element} node2 第二个document Element 元素，非空
 */
function isChildNode(node1, node2) {
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
function clickListener(event) {
    let node = event.target;
    if (!isChildNode(node, frame)) {
        var boundary = (popupPosition === 'left') ? frame.offsetLeft + frame.clientWidth : frame.offsetLeft; // 根据侧边栏的位置确定拖拽的起点
        if (Math.abs(event.x - boundary) > dragSensitivity) {
            removeSlider();
        }
    }
}

/**
 * 将侧边栏元素从页面中除去，即将frame从document中删除
 */
function removeSlider() {
    fixSwitch = false; // 点击关闭按钮后自动取消侧边栏的固定
    mousedown = false; // 如果侧边栏关闭，直接停止侧边栏宽度的调整
    if (isChildNode(frame, document.documentElement)) {
        document.documentElement.removeChild(frame);
        document.body.style.width = 100 + '%';
        setTimeout(function () {
            document.body.style.marginLeft = 'auto';
            document.body.style.position = 'static';
            document.body.style.right = '';
            document.body.style.left = '';
        }, transitionDuration);
        document.documentElement.removeEventListener('mousedown', clickListener);
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragOff);
    }
}

/**
 * 
 * 处理在原始页面 点击侧边栏边框附近，开始拖动的动作 以及处理鼠标移动到侧边栏附近鼠标形状的改变特效
 * 
 * @param {Object} event 事件发生的全部信息
 */
function documentDragOn(event) {
    var boundary = (popupPosition === 'left') ? frame.offsetLeft + frame.clientWidth : frame.offsetLeft; // 根据侧边栏的位置确定拖拽的起点
    if (Math.abs(event.x - boundary) <= dragSensitivity) {
        if (event.type === 'mousemove') {
            document.documentElement.style.cursor = 'e-resize';
        } else {
            mousedown = true;
            frame.style.transition = 'none';
            document.body.style.transition = 'none';
            originX = event.screenX;
            originWidth = frame.clientWidth;
        }
    } else
        document.documentElement.style.cursor = 'auto';
}

/**
 * 
 * 处理在iframe内 点击侧边栏边框附近，开始拖动的动作 以及处理鼠标移动到侧边栏附近鼠标形状的改变特效
 * 
 * @param {Object} event 事件发生的全部信息
 */
function iframeDragOn(event) {
    var boundary = (popupPosition === 'left') ? frame.clientWidth : 0; // 根据侧边栏的位置确定拖拽的起点
    if (Math.abs(event.x - boundary) <= dragSensitivity) {
        if (event.type === 'mousemove') {
            frameDocument.documentElement.style.cursor = 'e-resize';
        } else {
            mousedown = true;
            frame.style.transition = 'none';
            document.body.style.transition = 'none';
            originX = event.screenX;
            originWidth = frame.clientWidth;
        }
    }
    else
        frameDocument.documentElement.style.cursor = 'auto';
}

/**
 * 处理鼠标的拖动事件，侧边栏的大小正在调整
 * @param {Object} event 
 */
function drag(event) {
    if (mousedown) {
        var moveLength = popupPosition === 'left' ? -(originX - event.screenX) : (originX - event.screenX); // 根据侧边栏的位置确定移动距离的增减
        frame.style.width = moveLength + originWidth + 'px';
        document.body.style.width = originOriginWidth - originWidth - moveLength + 'px';
    }
}

/**
 * 处理释放鼠标按钮后，边框的宽度停止改变的事件
 */
function dragOff() {
    if (mousedown) {
        frame.style.transition = 'width ' + transitionDuration + 'ms';
        document.body.style.transition = 'width ' + transitionDuration + 'ms';
        mousedown = false;
    }
}

/**
 * 负责将侧边栏固定
 */
function fixOn() {
    fixSwitch = true; // 将固定开关打开
    frameDocument.getElementById('icon-tuding-full').style.display = 'inline';
    frameDocument.getElementById('icon-tuding-fix').style.display = 'none';
    document.documentElement.removeEventListener('mousedown', clickListener);
}

/**
 * 负责解除侧边栏的固定
 */
function fixOff() {
    fixSwitch = false; // 将固定开关关闭
    frameDocument.getElementById('icon-tuding-full').style.display = 'none';
    frameDocument.getElementById('icon-tuding-fix').style.display = 'inline';
    document.documentElement.addEventListener('mousedown', clickListener);
}

/**
 * Send message to background to pronounce the translating text.
 */
function sourcePronounce() {
    chrome.runtime.sendMessage({
        "type": "pronounce",
        "text": translateResult.originalText,
        "language": translateResult.sourceLanguage,
        "speed": sourceTTSSpeed
    }, function () {
        if (sourceTTSSpeed === "fast") {
            sourceTTSSpeed = "slow";
        } else {
            sourceTTSSpeed = "fast";
        }
    });
}

function targetPronounce() {
    chrome.runtime.sendMessage({
        "type": "pronounce",
        "text": translateResult.mainMeaning,
        "language": translateResult.targetLanguage,
        "speed": targetTTSSpeed
    }, function () {
        if (targetTTSSpeed === "fast") {
            targetTTSSpeed = "slow";
        } else {
            targetTTSSpeed = "fast";
        }
    });
}
/**
 * end block
 */