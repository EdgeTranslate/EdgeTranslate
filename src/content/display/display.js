import render from "./library/render.js";
import { isChromePDFViewer } from "../common.js";
import Messager from "../../common/scripts/messager.js";
import Moveable from "moveable";

/**
 * load templates
 */
import result from "./templates/result.html"; // template of translate result
import loading from "./templates/loading.html"; // template of loading icon
import error from "./templates/error.html"; // template of error message

/**
 * end load
 */

// the container of translation panel. the root element of panel
var panelContainer;

// store a shadow dom which is used to attach panel elements
var shadowDom;

// the first child element of shadow dom. It contains all of the panel content elements
var resultPanel;

var moveablePanel;

var translateResult; // 保存翻译结果
var sourceTTSSpeed, targetTTSSpeed;
var popupPosition; // 保存侧边栏展示的位置
const FIX_ON = true; // 侧边栏固定的值
const FIX_OFF = false; // 侧边栏不固定的值
const transitionDuration = 500; // 侧边栏出现动画的持续事件 单位:ms

/**
 * initiate panel elements to display translation result
 * create a shadow dom to contain panel elements
 * add moveable feature to ${resultPanel}
 */
(function initiate() {
    /* create elements */
    panelContainer = document.createElement("div");
    shadowDom = panelContainer.attachShadow({ mode: "open" });
    resultPanel = document.createElement("div");
    let styleLink = document.createElement("link");

    /* set attributes of elements */
    resultPanel.id = "edge-translate-panel";
    styleLink.type = "text/css";
    styleLink.rel = "stylesheet";
    styleLink.href = chrome.runtime.getURL("content/display/style/display.css");

    resultPanel.style.backgroundColor = "white"; // set style dynamically to be compatible with chrome extension "Dark Reader"
    resultPanel.style.boxShadow = "0px 0px 50px rgb(200,200,200,0.5)"; // set style dynamically to be compatible with chrome extension "Dark Reader"

    /* add elements to the document tree */
    shadowDom.appendChild(styleLink);
    shadowDom.appendChild(resultPanel);

    moveablePanel = new Moveable(shadowDom, {
        target: resultPanel,
        // If the container is null, the position is fixed. (default: parentElement(document.body))
        container: null,
        draggable: true,
        resizable: true,
        // snappable: true,
        // bounds: { left: 0, top: 0, right: window.innerWidth - 7, bottom: window.innerHeight - 7 },
        edge: true,
        origin: false,
        // Add padding around the target to increase the drag area.
        padding: { left: 5, top: 5, right: 5, bottom: 5 }
    });
    let startTranslate = [0, 0];
    /* draggable events*/
    moveablePanel
        .on("dragStart", ({ set }) => {
            set(startTranslate);
        })
        .on("drag", ({ target, beforeTranslate }) => {
            startTranslate = beforeTranslate;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        });
    /* resizable  events*/
    moveablePanel
        .on("resizeStart", ({ setOrigin, dragStart }) => {
            setOrigin(["%", "%"]);
            dragStart && dragStart.set(startTranslate);
        })
        .on("resize", ({ target, width, height, drag }) => {
            const beforeTranslate = drag.beforeTranslate;
            startTranslate = beforeTranslate;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        });
})();
// showPanel({}, loading);

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
            showPanel(message.detail.translateResult, result);
            break;
        // 发送的是翻译状态信息
        case "info":
            switch (message.detail.info) {
                case "start_translating":
                    showPanel(message.detail, loading);
                    break;
                case "error":
                    showPanel(message.detail, error);
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
 * render panel content using translation result and templates and show the panel in the current web page
 *
 * @param {Object} content translation result
 * @param {String} template the name of render template
 */
function showPanel(content, template) {
    // 获取用户对侧边栏展示位置的设定
    chrome.storage.sync.get("LayoutSettings", function(result) {
        var layoutSettings = result.LayoutSettings;
        popupPosition = layoutSettings["PopupPosition"]; // 保存侧边栏展示的位置

        // Write contents into iframe.
        resultPanel.innerHTML = render(template, content);
        document.documentElement.appendChild(panelContainer);

        // 获取用户上次通过resize设定的侧边栏宽度
        chrome.storage.sync.get("sideWidth", function(result) {
            let sideWidth = 0.2;
            if (result.sideWidth) {
                sideWidth = result.sideWidth;
            }
            // var resizeFlag = layoutSettings["Resize"]; // 保存侧边栏展示的位置
            // resultPanel.style.width = sideWidth * 100 + "%";
            move(
                sideWidth * window.innerWidth,
                window.innerHeight - 7,
                (1 - sideWidth) * window.innerWidth - 7,
                document.documentElement.scrollTop || document.body.scrollTop
            );

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
                // setTimeout(() => {
                //     console.log(getElementLeft(shadowDom.getElementById("translate-test")));
                //     moveablePanel = new Moveable(shadowDom, {
                //         target: resultPanel,
                //         // If the container is null, the position is fixed. (default: parentElement(document.body))
                //         container: null,
                //         draggable: true,
                //         resizable: true,
                //         edge: true
                //     });
                //     let startTranslate = [0, 0];
                //     /* draggable */
                //     moveablePanel
                //         .on("dragStart", ({ set }) => {
                //             set(startTranslate);
                //         })
                //         .on("drag", ({ target, beforeTranslate }) => {
                //             startTranslate = beforeTranslate;
                //             target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                //         });
                //     /* resizable */
                //     moveablePanel
                //         .on("resizeStart", ({ setOrigin, dragStart }) => {
                //             setOrigin(["%", "%"]);
                //             dragStart && dragStart.set(startTranslate);
                //         })
                //         .on("resize", ({ target, width, height, drag }) => {
                //             const beforeTranslate = drag.beforeTranslate;
                //             startTranslate = beforeTranslate;
                //             target.style.width = `${width}px`;
                //             target.style.height = `${height}px`;
                //             target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                //         });
                // }, 0);
                // panelContainer.style.right = "0";
                // panelContainer.style["padding-left"] = dragSensitivity + "px";
            }
        });
        // startSlider(layoutSettings);
        // addEventListener();

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

function hasScrollbar() {
    return (
        document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    );
}

//计算滚动条宽度的方法
// 新建一个带有滚动条的 div 元素，通过该元素的 offsetWidth 和 clientWidth 的差值即可获得
function getScrollbarWidth() {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
        "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
}

function move(width, height, left, top) {
    moveablePanel.request("resizable", {
        offsetWidth: width,
        offsetHeight: height,
        isInstant: true
    });
    setTimeout(() => {
        moveablePanel.request("resizable", {
            offsetWidth: width,
            offsetHeight: height,
            isInstant: true
        });

        moveablePanel.request("draggable", {
            x: left,
            y: top,
            isInstant: true
        });
    }, 100);
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

    // // 将iframe内部的事件转发到document里，以实现更好的拖动效果。
    // frameDocument.addEventListener("mousemove", function(event) {
    //     let new_event = new event.constructor(event.type, event);
    //     document.documentElement.dispatchEvent(new_event);
    // });

    // frameDocument.addEventListener("mouseup", function(event) {
    //     let new_event = new event.constructor(event.type, event);
    //     document.documentElement.dispatchEvent(new_event);
    // });
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
function startSlider() {}
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft + current.clientLeft;
        current = current.offsetParent;
    }
    return actualLeft;
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
