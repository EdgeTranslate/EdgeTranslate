import render from "../lib/render.js";
import Resizable from "../lib/Resizable.js";

/**
 * load templates
 */
// load templates
import result from "./templates/result.html"; // template of translate result
import loading from "./templates/loading.html"; // template of loading icon
import error from "./templates/error.html"; // template of error message

/**
 * end load
 */

// 用于存储div, div 中包含一个 iframe元素，这个iframe元素用来在页面的右侧展示翻译结果
var divFrame;
// 用于存储一个iframe元素，这个元素用来在页面的右侧展示翻译结果
var frame;
// iframe中的 document
var frameDocument;

var resizeBody;

var resizeDivFrame;

var translateResult; // 保存翻译结果
var sourceTTSSpeed, targetTTSSpeed;
var popupPosition; // 保存侧边栏展示的位置
const FIX_ON = true; // 侧边栏固定的值
const FIX_OFF = false; // 侧边栏不固定的值
const dragSensitivity = 6; // 用来调节拖动侧边栏的灵敏度的参数 单位:px
const transitionDuration = 500; // 侧边栏出现动画的持续事件 单位:ms

/**
 * 负责处理后台发送给页面的消息
 *
 * @param {Object} message 后台发送的消息
 * @param {Object} sender 返送消息者的具体信息 如何发送者、是content_script，会有tab属性，如果是background，则没有tab属性
 */
chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (!sender || !sender.tab) {
        // 避免从file://跳转到pdf viewer的消息传递对此的影响
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
                break;
            // 发送的是快捷键命令
            case "command":
                switch (message.command) {
                    case "fix_result_frame":
                        chrome.storage.sync.get("fixSetting", function(result) {
                            if (!result.fixSetting) {
                                fixOn();
                            } else {
                                fixOff();
                            }
                        });
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

        if (callback) callback();
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
    chrome.storage.sync.get("LayoutSettings", function(result) {
        var layoutSettings = result.LayoutSettings;
        popupPosition = layoutSettings["PopupPosition"]; // 保存侧边栏展示的位置

        // 判断frame是否已经添加到了页面中
        if (!isChildNode(divFrame, document.documentElement)) {
            // frame不在页面中，创建新的frame
            divFrame = document.createElement("div");
            divFrame.id = "translate_div";
            frame = document.createElement("iframe");
            frame.id = "translate_frame";
            frame.sandbox = "allow-same-origin allow-scripts";
            startSlider(layoutSettings);
            divFrame.appendChild(frame);
            document.documentElement.appendChild(divFrame);

            if (popupPosition == "left") {
                resizeBody = new Resizable(document.body, "left", {
                    parentElement: document.documentElement,
                    dragSensitivity: dragSensitivity,
                    preFunction: function(element) {
                        element.style.transition = "none";
                    },
                    callback(element) {
                        element.style.transition = "width " + transitionDuration + "ms";
                    }
                });
                resizeBody.enableResize();
                resizeDivFrame = new Resizable(divFrame, "right", {
                    parentElement: document.documentElement,
                    dragSensitivity: dragSensitivity
                });
                resizeDivFrame.enableResize();
            } else {
                resizeBody = new Resizable(document.body, "right", {
                    parentElement: document.documentElement,
                    dragSensitivity: dragSensitivity,
                    preFunction: function(element) {
                        element.style.transition = "none";
                    },
                    callback(element) {
                        element.style.transition = "width " + transitionDuration + "ms";
                    }
                });
                resizeBody.enableResize();
                resizeDivFrame = new Resizable(divFrame, "left", {
                    parentElement: document.documentElement,
                    dragSensitivity: dragSensitivity,
                    callback(element) {
                        element.style.position = "fixed";
                    }
                });
                resizeDivFrame.enableResize();
            }
        }

        // Write contents into iframe.
        frame.srcdoc = render(template, content);

        // iframe 一加载完成添加事件监听
        frame.onload = function() {
            frameDocument = frame.contentDocument;
            // 添加事件监听
            addEventListener();
        };
    });
}

/**
 * 需要对侧边栏中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {
    // 如果渲染的是result.html，则有icon-tuding-full 图标， 可以添加事件
    if (frameDocument.getElementById("icon-tuding-full")) {
        // 给固定侧边栏的按钮添加点击事件监听，用户侧边栏的固定与取消固定
        frameDocument.getElementById("icon-tuding-fix").addEventListener("click", fixOn);
        frameDocument.getElementById("icon-tuding-full").addEventListener("click", fixOff);

        let sourcePronounceIcon = frameDocument.getElementById("source-pronounce");
        if (sourcePronounceIcon) {
            sourcePronounceIcon.addEventListener("click", sourcePronounce);
        }

        let targetPronounceIcon = frameDocument.getElementById("target-pronounce");
        if (targetPronounceIcon) {
            targetPronounceIcon.addEventListener("click", targetPronounce);
        }
    }
    // 给点击侧边栏之外区域事件添加监听，点击侧边栏之外的部分就会让侧边栏关闭
    chrome.storage.sync.get("fixSetting", function(result) {
        if (!result.fixSetting) {
            fixOff();
        } else {
            fixOn();
        }
    });
    // 给关闭按钮添加点击事件监听，用于关闭侧边栏
    frameDocument.getElementById("icon-close").addEventListener("click", removeSlider);

    // 将iframe内部的事件转发到document里，以实现更好的拖动效果。
    frameDocument.addEventListener("mousemove", function(event) {
        let new_event = new event.constructor(event.type, event);
        document.documentElement.dispatchEvent(new_event);
    });

    frameDocument.addEventListener("mouseup", function(event) {
        let new_event = new event.constructor(event.type, event);
        document.documentElement.dispatchEvent(new_event);
    });
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
    if (!(node1 && node2)) return false;
    while (node1 && !node1.isSameNode(document.body)) {
        if (node1.isSameNode(node2)) return true;
        else node1 = node1.parentNode;
    }
    return false;
}

/**
 * change CSS style of body element and the frame element
 * the body size will be contracted
 */
function startSlider(layoutSettings) {
    var resizeFlag = layoutSettings["Resize"]; // 保存侧边栏展示的位置
    if (resizeFlag) {
        // 用户设置 收缩页面
        document.body.style.transition = "width " + transitionDuration + "ms";
        document.body.style.width = 80 + "%";
    }
    if (popupPosition === "left") {
        // 用户设置 在页面左侧显示侧边栏
        if (resizeFlag) {
            // 用户设置 收缩页面
            document.body.style.position = "absolute";
            // document.body.style.marginLeft = 0.2 * originOriginWidth + "px";
            document.body.style.right = "0";
            document.body.style.left = "";
        }
        divFrame.style.left = "0";
        divFrame.style["padding-right"] = dragSensitivity + "px";
    } else {
        if (resizeFlag) {
            // 用户设置 收缩页面
            document.body.style.margin = "0";
            document.body.style.right = "";
            document.body.style.left = "0";
        }
        divFrame.style.right = "0";
        divFrame.style["padding-left"] = dragSensitivity + "px";
    }
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
    if (!isChildNode(node, divFrame)) {
        var boundary =
            popupPosition === "left"
                ? divFrame.offsetLeft + divFrame.clientWidth
                : divFrame.offsetLeft; // 根据侧边栏的位置确定拖拽的起点
        if (Math.abs(event.x - boundary) > dragSensitivity) {
            removeSlider();
        }
    }
}

/**
 * 将侧边栏元素从页面中除去，即将frame从document中删除
 */
function removeSlider() {
    if (isChildNode(divFrame, document.documentElement)) {
        document.documentElement.removeChild(divFrame);
        document.body.style.width = 100 + "%";
        setTimeout(function() {
            document.body.style.margin = "auto";
            document.body.style.position = "static";
            document.body.style.right = "";
            document.body.style.left = "";
        }, transitionDuration);
        document.documentElement.removeEventListener("mousedown", clickListener);
        resizeBody.disableResize();
        resizeDivFrame.disableResize();
    }
}

/**
 * 负责将侧边栏固定
 */
function fixOn() {
    chrome.storage.sync.set({
        fixSetting: FIX_ON
    });
    if (frameDocument.getElementById("icon-tuding-full")) {
        frameDocument.getElementById("icon-tuding-full").style.display = "inline";
        frameDocument.getElementById("icon-tuding-fix").style.display = "none";
    }
    document.documentElement.removeEventListener("mousedown", clickListener);
}

/**
 * 负责解除侧边栏的固定
 */
function fixOff() {
    chrome.storage.sync.set({
        fixSetting: FIX_OFF
    });
    if (frameDocument.getElementById("icon-tuding-full")) {
        frameDocument.getElementById("icon-tuding-full").style.display = "none";
        frameDocument.getElementById("icon-tuding-fix").style.display = "inline";
    }
    document.documentElement.addEventListener("mousedown", clickListener);
}

/**
 * Send message to background to pronounce the translating text.
 */
function sourcePronounce() {
    chrome.runtime.sendMessage(
        {
            type: "pronounce",
            text: translateResult.originalText,
            language: translateResult.sourceLanguage,
            speed: sourceTTSSpeed
        },
        function() {
            if (sourceTTSSpeed === "fast") {
                sourceTTSSpeed = "slow";
            } else {
                sourceTTSSpeed = "fast";
            }
        }
    );
}

function targetPronounce() {
    chrome.runtime.sendMessage(
        {
            type: "pronounce",
            text: translateResult.mainMeaning,
            language: translateResult.targetLanguage,
            speed: targetTTSSpeed
        },
        function() {
            if (targetTTSSpeed === "fast") {
                targetTTSSpeed = "slow";
            } else {
                targetTTSSpeed = "fast";
            }
        }
    );
}
/**
 * end block
 */
