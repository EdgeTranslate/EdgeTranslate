import render from "./library/render.js";
import { isChromePDFViewer } from "../common.js";
import Messager from "../../common/scripts/messager.js";

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
var panelContainer;
// 用于存储一个iframe元素，这个元素用来在页面的右侧展示翻译结果
var shadowDom;
// iframe中的 document
var resultPanel;

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
 * @param {Object} sender 返送消息者的具体信息 如果sender是content module，会有tab属性，如果是background，则没有tab属性
 */
Messager.receive("content", message => {
    // 避免从file://跳转到pdf viewer的消息传递对此的影响
    switch (message.title) {
        // 发送的是翻译结果
        case "translateResult":
            translateResult = message.detail.translateResult;
            sourceTTSSpeed = "fast";
            targetTTSSpeed = "fast";
            createBlock(message.detail.translateResult, result);
            break;
        // 发送的是翻译状态信息
        case "info":
            switch (message.detail.info) {
                case "start_translating":
                    createBlock(message.detail, loading);
                    break;
                case "error":
                    createBlock(message.detail, error);
                    break;
                default:
                    break;
            }
            break;
        // 发送的是快捷键命令
        case "command":
            switch (message.detail.command) {
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
                case "pronounce_original":
                    sourcePronounce();
                    break;
                case "pronounce_translated":
                    targetPronounce();
                    break;
                case "copy_result":
                    if (translateResult) {
                        copyContent();
                    }
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return Promise.resolve();
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
        if (!isChildNode(panelContainer, document.documentElement)) {
            // frame不在页面中，创建新的frame
            panelContainer = document.createElement("div");
            panelContainer.id = "translate_div";
            shadowDom = panelContainer.attachShadow({ mode: "open" });
            resultPanel = document.createElement("div");
            resultPanel.id = "edge-translate-panel";
            // shadowDom.style.backgroundColor = "white"; // 动态设置样式以兼容Dark Reader
            // shadowDom.style.boxShadow = "0px 0px 50px rgb(200,200,200,0.5)"; // 动态设置样式以兼容Dark Reader
            shadowDom.appendChild(resultPanel);

            resultPanel.style.backgroundColor = "white"; // 动态设置样式以兼容Dark Reader
            resultPanel.style.boxShadow = "0px 0px 50px rgb(200,200,200,0.5)"; // 动态设置样式以兼容Dark Reader
            document.documentElement.appendChild(panelContainer);

            // if (popupPosition == "left") {
            // } else {
            // }
        }

        // Write contents into iframe.
        resultPanel.innerHTML = render(template, content);
        startSlider(layoutSettings);
        addEventListener();

        // iframe 一加载完成添加事件监听
        // shadowDom.onload = function() {
        //     // resultPanel = shadowDom.contentDocument;

        //     // 根据用户设定决定是否采用从右到左布局（用于阿拉伯语等从右到左书写的语言）
        //     chrome.storage.sync.get("LayoutSettings", result => {
        //         if (result.LayoutSettings.RTL) {
        //             let contents = resultPanel.getElementsByClassName("may-need-rtl");
        //             for (let i = 0; i < contents.length; i++) {
        //                 contents[i].dir = "rtl";
        //             }
        //         }
        //     });
        //     // 添加事件监听
        //     addEventListener();
        // };
    });
}

/**
 * 需要对侧边栏中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {
    // 给关闭按钮添加点击事件监听，用于关闭侧边栏
    resultPanel.getElementById("icon-close").addEventListener("click", removeSlider);
    // 如果渲染的是result.html或error.html，则有icon-tuding-fix图标， 可以添加点击事件监听
    if (resultPanel.getElementById("icon-tuding-fix")) {
        // 给固定侧边栏的按钮添加点击事件监听，用户侧边栏的固定与取消固定
        resultPanel.getElementById("icon-tuding-fix").addEventListener("click", fixOn);
        resultPanel.getElementById("icon-tuding-full").addEventListener("click", fixOff);
    }
    // 如果渲染的是result.html，则有icon-copy图标， 可以添加点击事件监听
    if (resultPanel.getElementById("icon-copy")) {
        // copy the translation result to the copy board
        resultPanel.getElementById("icon-copy").addEventListener("click", copyContent);

        let sourcePronounceIcon = resultPanel.getElementById("source-pronounce");
        if (sourcePronounceIcon) {
            sourcePronounceIcon.addEventListener("click", sourcePronounce);
        }

        let targetPronounceIcon = resultPanel.getElementById("target-pronounce");
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

    // 将iframe内部的事件转发到document里，以实现更好的拖动效果。
    resultPanel.addEventListener("mousemove", function(event) {
        let new_event = new event.constructor(event.type, event);
        document.documentElement.dispatchEvent(new_event);
    });

    resultPanel.addEventListener("mouseup", function(event) {
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
 * change CSS style of body element and the shadowDom element
 * the body size will be contracted
 */
function startSlider() {
    // 获取用户上次通过resize设定的侧边栏宽度
    chrome.storage.sync.get("sideWidth", function(result) {
        let sideWidth = 0.2;
        if (result.sideWidth) {
            sideWidth = result.sideWidth;
        }
        // var resizeFlag = layoutSettings["Resize"]; // 保存侧边栏展示的位置
        resultPanel.style.width = sideWidth * 100 + "%";
        // if (resizeFlag) {
        //     // 用户设置 收缩页面
        //     document.body.style.transition = "width " + transitionDuration + "ms";
        //     document.body.style.width = (1 - sideWidth) * 100 + "%";
        // }
        if (popupPosition === "left") {
            // 用户设置 在页面左侧显示侧边栏
            // if (resizeFlag) {
            //     // 用户设置 收缩页面
            //     document.body.style.position = "absolute";
            //     // document.body.style.marginLeft = 0.2 * originOriginWidth + "px";
            //     document.body.style.right = "0";
            //     document.body.style.left = "";
            // }
            // panelContainer.style.left = "0";
            // panelContainer.style["padding-right"] = dragSensitivity + "px";
        } else {
            // if (resizeFlag) {
            //     // 用户设置 收缩页面
            //     document.body.style.margin = "0";
            //     document.body.style.right = "";
            //     document.body.style.left = "0";
            // }
            resultPanel.style.right = "0";
            // panelContainer.style.right = "0";
            // panelContainer.style["padding-left"] = dragSensitivity + "px";
        }
    });
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
    if (!isChildNode(node, panelContainer)) {
        var boundary =
            popupPosition === "left"
                ? panelContainer.offsetLeft + panelContainer.clientWidth
                : panelContainer.offsetLeft; // 根据侧边栏的位置确定拖拽的起点
        if (Math.abs(event.x - boundary) > dragSensitivity) {
            removeSlider();
        }
    }
}

/**
 * 将侧边栏元素从页面中除去，即将frame从document中删除
 */
function removeSlider() {
    if (isChildNode(panelContainer, document.documentElement)) {
        document.documentElement.removeChild(panelContainer);
        document.body.style.width = 100 + "%";
        setTimeout(function() {
            document.body.style.margin = "auto";
            document.body.style.position = "static";
            document.body.style.right = "";
            document.body.style.left = "";
        }, transitionDuration);
        document.documentElement.removeEventListener("mousedown", clickListener);
        // handle the click event exception when using chrome's original pdf viewer
        if (isChromePDFViewer()) {
            document.body.children[0].focus();
        }
        // resizeBody.disableResize();
        // resizeDivFrame.disableResize();

        // 告诉background.js翻译框已关闭
        Messager.send("background", "frame_closed");
    }
}

/**
 * 负责将侧边栏固定
 */
function fixOn() {
    chrome.storage.sync.set({
        fixSetting: FIX_ON
    });
    if (resultPanel.getElementById("icon-tuding-full")) {
        resultPanel.getElementById("icon-tuding-full").style.display = "inline";
        resultPanel.getElementById("icon-tuding-fix").style.display = "none";
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
    if (resultPanel.getElementById("icon-tuding-full")) {
        resultPanel.getElementById("icon-tuding-full").style.display = "none";
        resultPanel.getElementById("icon-tuding-fix").style.display = "inline";
    }
    document.documentElement.addEventListener("mousedown", clickListener);
}

/**
 * Send message to background to pronounce the translating text.
 */
function sourcePronounce() {
    if (isChildNode(panelContainer, document.documentElement)) {
        Messager.send("background", "pronounce", {
            text: translateResult.originalText,
            language: translateResult.sourceLanguage,
            speed: sourceTTSSpeed
        }).then(() => {
            if (sourceTTSSpeed === "fast") {
                sourceTTSSpeed = "slow";
            } else {
                sourceTTSSpeed = "fast";
            }
        });
    }
}

function targetPronounce() {
    if (isChildNode(panelContainer, document.documentElement)) {
        Messager.send("background", "pronounce", {
            text: translateResult.mainMeaning,
            language: translateResult.targetLanguage,
            speed: targetTTSSpeed
        }).then(() => {
            if (targetTTSSpeed === "fast") {
                targetTTSSpeed = "slow";
            } else {
                targetTTSSpeed = "fast";
            }
        });
    }
}

function copyContent() {
    // the node of translation result
    translateResult = resultPanel.getElementsByClassName("main-meaning")[0].firstChild;
    translateResult.setAttribute("contenteditable", "true");
    translateResult.focus();
    // select all content automatically
    var range = resultPanel.createRange();
    var frameWindow = shadowDom.contentWindow;
    if (frameWindow) {
        range.selectNodeContents(translateResult);
        frameWindow.getSelection().removeAllRanges();
        frameWindow.getSelection().addRange(range);
        resultPanel.execCommand("copy");

        // on focus out, set the node to unedible
        translateResult.addEventListener("blur", function() {
            translateResult.setAttribute("contenteditable", "false");
            frameWindow.getSelection().removeAllRanges();
        });
    }
}

/**
 * end block
 */
