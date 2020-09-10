import render from "./library/render.js";
import myMoveable from "./library/moveable/moveable.js";
import { isChromePDFViewer } from "../common.js";
import Messager from "../../common/scripts/messager.js";
// import Moveable from "moveable";

/**
 * load templates
 */
import common from "./templates/common.html"; // template of panel's structure(common part of the result panel)
import result from "./templates/result.html"; // template of translate result
import loading from "./templates/loading.html"; // template of loading icon
import error from "./templates/error.html"; // template of error message

const Template = {
    result: result,
    loading: loading,
    error: error
};

/**
 * end load
 */

// the container of translation panel. the root element of panel
var panelContainer;

// store a shadow dom which is used to attach panel elements
var shadowDom;

// the first child element of shadow dom. It contains all of the panel content elements
var resultPanel;

// store the panel body element
var bodyPanel;

var moveablePanel;

var translateResult; // 保存翻译结果
var sourceTTSSpeed, targetTTSSpeed;
var popupPosition; // 保存侧边栏展示的位置
const FIX_ON = true; // 侧边栏固定的值
const FIX_OFF = false; // 侧边栏不固定的值

/**
 * initiate panel elements to display translation result
 * create a shadow dom to contain panel elements
 * add moveable feature to ${resultPanel}
 */
(function initiate() {
    /* create elements */
    // the container of translation panel. the root element of panel
    panelContainer = document.createElement("div");
    // store a shadow dom which is used to attach panel elements
    shadowDom = panelContainer.attachShadow({ mode: "open" });
    shadowDom.innerHTML = render(common);
    // the first child element of shadow dom. It contains all of the panel content elements
    resultPanel = shadowDom.firstChild;
    // store the panel body element
    bodyPanel = shadowDom.getElementById("panel-body");

    /* set attributes of elements */
    resultPanel.style.backgroundColor = "white"; // set style dynamically to be compatible with chrome extension "Dark Reader"
    resultPanel.style.boxShadow = "0px 4px 23px -6px rgb(64,64,64,0.8)"; // set style dynamically to be compatible with chrome extension "Dark Reader"

    /* add event listeners */
    // add event listeners to the panel- head elements
    addHeadEventListener();
    // update drag bounds when users scroll the page
    window.addEventListener("scroll", updateBounds);
    // update the drag bounds and size when the size of window has changed
    window.addEventListener("resize", windowResizeHandler);

    /* make the resultPanel resizable and draggable */
    moveablePanel = new myMoveable(resultPanel, {
        draggable: true,
        resizable: true,
        /* set threshold value to increase the resize area */
        // threshold: { s: 5, se: 5, e: 5, ne: 5, n: 5, nw: 5, w: 5, sw: 5 },
        // threshold: { edge:5, corner:5 },
        threshold: 10,
        /**
         * set thresholdPosition to decide where the resizable area is
         * "in": the activated resizable area is within the target element
         * "center": the activated resizable area is half within the target element and half out of the it
         * "out": the activated resizable area is out of the target element
         * a number(0~1): a ratio which determines the how much the the activated resizable area beyond the element
         */
        // thresholdPosition: "in",
        // thresholdPosition: "center",
        // thresholdPosition: "out",
        thresholdPosition: 0.9
    });

    let startTranslate = [0, 0];
    /* draggable events*/
    moveablePanel
        .on("dragStart", ({ set, stop, inputEvent }) => {
            if (inputEvent) {
                const path =
                    inputEvent.path || (inputEvent.composedPath && inputEvent.composedPath());
                // if drag element isn't the head element, stop the drag event
                if (!path || !shadowDom.getElementById("panel-head").isSameNode(path[0])) stop();
            }
            set(startTranslate);
        })
        .on("drag", ({ target, translate }) => {
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
        })
        .on("dragEnd", ({ translate }) => {
            startTranslate = translate;
        });
    /* resizable  events*/
    moveablePanel
        .on("resizeStart", ({ set }) => {
            set(startTranslate);
        })
        .on("resize", ({ target, width, height, translate }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
        })
        .on("resizeEnd", ({ translate }) => {
            startTranslate = translate;
        });
})();

/**
 * render panel content using translation result and templates and show the panel in the current web page
 *
 * @param {Object} content translation result
 * @param {String} template the name of render template
 */
function showPanel(content, template) {
    // Write contents into iframe.
    bodyPanel.innerHTML = render(Template[template], content);
    addBodyEventListener(template);
    // if panel hasn't been displayed, locate the panel and show it
    if (!document.documentElement.contains(panelContainer)) {
        // 获取用户对侧边栏展示位置的设定
        chrome.storage.sync.get("LayoutSettings", function(result) {
            var layoutSettings = result.LayoutSettings;
            popupPosition = layoutSettings["PopupPosition"]; // 保存侧边栏展示的位置
            if (content.position) {
                let position = content.position;
                moveablePanel.snappable = true;
                updateBounds();
                window.addEventListener("scroll", updateBounds);
                move(300, 600, position.XPosition, position.YPosition);
            } else {
                // 获取用户上次通过resize设定的侧边栏宽度
                chrome.storage.sync.get("sideWidth", function(result) {
                    let sideWidth = 0.2;
                    if (result.sideWidth) {
                        sideWidth = result.sideWidth;
                    }
                    // var resizeFlag = layoutSettings["Resize"]; // 保存侧边栏展示的位置
                    // resultPanel.style.width = sideWidth * 100 + "%";
                    moveablePanel.snappable = true;
                    updateBounds();
                    move(
                        sideWidth * window.innerWidth,
                        window.innerHeight,
                        (1 - sideWidth) * window.innerWidth,
                        0
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
            }
            document.documentElement.appendChild(panelContainer);
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
}

function windowResizeHandler() {
    // 获取用户上次通过resize设定的侧边栏宽度
    chrome.storage.sync.get("sideWidth", function(result) {
        let sideWidth = 0.2;
        if (result.sideWidth) {
            sideWidth = result.sideWidth;
        }
        let width = window.innerWidth;
        let height = window.innerHeight;
        let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let rightBound;
        if (hasScrollbar()) rightBound = scrollLeft + window.innerWidth - getScrollbarWidth();
        moveablePanel.bounds = {
            left: scrollLeft,
            right: rightBound,
            top: scrollTop,
            bottom: Number.MAX_VALUE
        };
        move(sideWidth * width, height, (1 - sideWidth) * width, 0);
    });
}

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
            showPanel(message.detail.translateResult, "result");
            break;
        // 发送的是翻译状态信息
        case "info":
            switch (message.detail.info) {
                case "start_translating":
                    showPanel(message.detail, "loading");
                    break;
                case "error":
                    showPanel(message.detail, "error");
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
                    removePanel();
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

function updateBounds() {
    let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let rightBound;
    if (hasScrollbar()) rightBound = scrollLeft + window.innerWidth - getScrollbarWidth();
    moveablePanel.bounds = {
        left: scrollLeft,
        right: rightBound,
        top: scrollTop,
        bottom: Number.MAX_VALUE
    };
}

/**
 * drag the target element to the position and resize it to the size
 * @param {number} width width
 * @param {number} height height value
 * @param {number} left x-axis coordinate of the target position
 * @param {number} top y-axis coordinate of the target position
 */
function move(width, height, left, top) {
    moveablePanel.request("resizable", {
        width: width,
        height: height
    });
    moveablePanel.request("draggable", {
        x: left,
        y: top
    });
}

/**
 * add event listeners to the panel-head elements
 */
function addHeadEventListener() {
    // 给关闭按钮添加点击事件监听，用于关闭侧边栏
    shadowDom.getElementById("icon-close").addEventListener("click", removePanel);
    // 给固定侧边栏的按钮添加点击事件监听，用户侧边栏的固定与取消固定
    shadowDom.getElementById("icon-tuding-fix").addEventListener("click", fixOn);
    shadowDom.getElementById("icon-tuding-full").addEventListener("click", fixOff);
    // 给点击侧边栏之外区域事件添加监听，点击侧边栏之外的部分就会让侧边栏关闭
    chrome.storage.sync.get("fixSetting", function(result) {
        if (!result.fixSetting) {
            fixOff();
        } else {
            fixOn();
        }
    });
}

/**
 * add event listeners to panel body elements
 * @param {String} template the name of the current using template
 */
function addBodyEventListener(template) {
    switch (template) {
        case "result": {
            // copy the translation result to the copy board
            shadowDom.getElementById("icon-copy").addEventListener("click", copyContent);
            let sourcePronounceIcon = shadowDom.getElementById("source-pronounce");
            if (sourcePronounceIcon) {
                sourcePronounceIcon.addEventListener("click", sourcePronounce);
            }

            let targetPronounceIcon = shadowDom.getElementById("target-pronounce");
            if (targetPronounceIcon) {
                targetPronounceIcon.addEventListener("click", targetPronounce);
            }
            break;
        }
        case "loading":
            break;
        case "error":
            break;
        default:
            break;
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
    if (!panelContainer.contains(node)) {
        removePanel();
    }
}

/**
 * remove the panel from the page
 */
function removePanel() {
    if (document.documentElement.contains(panelContainer)) {
        document.documentElement.removeChild(panelContainer);
        moveablePanel.snappable = false;

        document.documentElement.removeEventListener("mousedown", clickListener);
        // handle the click event exception when using chrome's original pdf viewer
        if (isChromePDFViewer()) {
            document.body.children[0].focus();
        }

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
    if (shadowDom.getElementById("icon-tuding-full")) {
        shadowDom.getElementById("icon-tuding-full").style.display = "inline";
        shadowDom.getElementById("icon-tuding-fix").style.display = "none";
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
    if (shadowDom.getElementById("icon-tuding-full")) {
        shadowDom.getElementById("icon-tuding-full").style.display = "none";
        shadowDom.getElementById("icon-tuding-fix").style.display = "inline";
    }
    document.documentElement.addEventListener("mousedown", clickListener);
}

/**
 * Send message to background to pronounce the translating text.
 */
function sourcePronounce() {
    if (document.documentElement.contains(panelContainer)) {
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
    if (document.documentElement.contains(panelContainer)) {
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
