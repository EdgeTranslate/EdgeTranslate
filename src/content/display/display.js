import render from "./library/render.js";
import moveable from "./library/moveable/moveable.js";
import { isChromePDFViewer } from "../common.js";
import Messager from "common/scripts/messager.js";
import { delayPromise } from "common/scripts/promise.js";

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

// store the moveable object return by moveable.js
var moveablePanel;
// store the element for highlight part
var highlightPart;
var highlightPartShown = false;

// store the display type(floating or fixed)
var displaySetting = {
    type: "fixed",
    fixedData: {
        width: 0.2,
        position: "right"
    },
    floatingData: {
        width: 0.15,
        height: 0.6
    }
};

var translateResult; // 保存翻译结果
var sourceTTSSpeed, targetTTSSpeed;
// store the width of scroll bar
const scrollbarWidth = getScrollbarWidth();
// the duration time of result panel's transition. unit: ms
const transitionDuration = 500;
// flag whether the user set to resize document body
var resizeFlag = false;
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

    /* initiate setting value */
    updateDisplaySetting();
    // Set up translator options.
    chrome.storage.sync.get(["languageSetting", "TranslatorConfig"], async result => {
        let config = result.TranslatorConfig;
        let languageSetting = result.languageSetting;
        let availableTranslators = await Messager.send("background", "get_available_translators", {
            from: languageSetting.sl,
            to: languageSetting.tl
        });
        setUpTranslateConfig(config, availableTranslators);
    });

    /* make the resultPanel resizable and draggable */
    moveablePanel = new moveable(resultPanel, {
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
                if (!path || !shadowDom.getElementById("panel-head").isSameNode(path[0])) {
                    stop();
                    return;
                }
            }
            set(startTranslate);
        })
        .on("drag", ({ target, translate, inputEvent }) => {
            if (inputEvent) {
                // change the display type from fixed to floating
                if (displaySetting.type === "fixed") {
                    displaySetting.type = "floating";
                    removeFixedPanel();
                    showFloatingPanel();
                    updateDisplaySetting();
                }
                /* whether to show hight part on the one side of the page*/
                let threshold = 10;
                if (inputEvent.clientX <= threshold) showHighlightPart("left");
                else if (inputEvent.clientX >= window.innerWidth - threshold)
                    showHighlightPart("right");
                else removeHighlightPart();
            }
            startTranslate = translate;
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
        })
        .on("dragEnd", ({ translate, inputEvent }) => {
            startTranslate = translate;

            /* change the display type of result panel */
            if (inputEvent && displaySetting.type === "floating") {
                let threshold = 10;
                // mouse is close to the left boundary
                if (inputEvent.clientX <= threshold) displaySetting.fixedData.position = "left";
                // mouse is close to the right boundary
                else if (inputEvent.clientX >= window.innerWidth - threshold)
                    displaySetting.fixedData.position = "right";
                else return;
                displaySetting.type = "fixed";
                removeHighlightPart();
                showFixedPanel();
                updateDisplaySetting();
            }
        });
    // // the result panel start to drag out of the drag area
    // .on("boundStart", ({ direction }) => {
    //     console.log("boundStart" + direction);
    // })
    // // the result panel drag out of the drag area
    // .on("bound", ({ direction, distance }) => {
    //     console.log("bound", direction, distance);
    // })
    // // the result panel drag into drag area first time
    // .on("boundEnd", () => {
    //     console.log("boundEnd");
    // });
    /* resizable  events*/
    moveablePanel
        .on("resizeStart", ({ set }) => {
            set(startTranslate);
        })
        .on("resize", ({ target, width, height, translate }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
            if (resizeFlag) {
                document.body.style.width = `${(1 - width / window.innerWidth - 0.01) * 100}%`;
            }
        })
        .on("resizeEnd", ({ translate, width, height, inputEvent, target }) => {
            startTranslate = translate;
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;

            // update new size of the result panel
            if (inputEvent) {
                if (displaySetting.type === "floating") {
                    displaySetting.floatingData.width = width / window.innerWidth;
                    displaySetting.floatingData.height = height / window.innerHeight;
                } else {
                    displaySetting.fixedData.width = width / window.innerWidth;
                }
                updateDisplaySetting();
            }
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
        updateBounds();
        document.documentElement.appendChild(panelContainer);
        if (displaySetting.type === "floating") {
            /* show floating panel */
            let position;
            if (content.position)
                position = [content.position.XPosition, content.position.YPosition];
            else
                position = [
                    (1 - displaySetting.floatingData.width) * window.innerWidth -
                        (hasScrollbar() ? scrollbarWidth : 0),
                    0
                ];
            move(
                displaySetting.floatingData.width * window.innerWidth,
                displaySetting.floatingData.height * window.innerHeight,
                position[0],
                position[1]
            );
        } else {
            showFixedPanel();
        }
    }
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
                case "network_error":
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

/**
 * show the result panel in the floating type
 */
function showFloatingPanel() {
    moveablePanel.request("resizable", {
        width: displaySetting.floatingData.width * window.innerWidth,
        height: displaySetting.floatingData.height * window.innerHeight
    });
}

/**
 * show the result panel in the fixed type
 */
function showFixedPanel() {
    let width = displaySetting.fixedData.width * window.innerWidth;
    // the offset left value for fixed result panel
    let offsetLeft = 0;
    if (displaySetting.fixedData.position === "right")
        offsetLeft = window.innerWidth - width - (hasScrollbar() ? scrollbarWidth : 0);
    chrome.storage.sync.get("LayoutSettings", async result => {
        resizeFlag = result.LayoutSettings.Resize;
        // user set to resize the document body
        if (resizeFlag) {
            document.body.style.position = "absolute";
            document.body.style.transition = `width ${transitionDuration}ms`;
            resultPanel.style.transition = `width ${transitionDuration}ms`;
            /* set the start width to make the transition effect work */
            document.body.style.width = "100%";
            move(0, window.innerHeight, offsetLeft, 0);
            // wait some time to make the setting of width applied
            await delayPromise(50);
            // the fixed panel in on the left side
            if (displaySetting.fixedData.position === "left") {
                document.body.style.right = "0";
                document.body.style.left = "";
            }
            // the fixed panel in on the right side
            else {
                document.body.style.margin = "0";
                document.body.style.right = "";
                document.body.style.left = "0";
            }
            // set the target width for document body
            document.body.style.width = `${(1 - displaySetting.fixedData.width - 0.01) * 100}%`;
            // set the target width for the result panel
            move(width, window.innerHeight, offsetLeft, 0);
            /* cancel the transition effect after the panel showed */
            await delayPromise(transitionDuration);
            resultPanel.style.transition = "";
            document.body.style.transition = "";
        } else move(width, window.innerHeight, offsetLeft, 0);
    });
}

/**
 * if user choose to resize the document body, make the page return to normal size
 */
async function removeFixedPanel() {
    if (resizeFlag) {
        document.body.style.transition = `width ${transitionDuration}ms`;
        document.body.style.width = "100%";
        await delayPromise(transitionDuration);
        document.body.style.cssText = "";
    }
}

/**
 * show a highlight part in the page
 * @param {string} position the highlight part show on the "left" or "right" of the page
 */
function showHighlightPart(position) {
    if (!highlightPartShown) {
        // the element has been created
        if (highlightPart) {
            highlightPartShown = true;
            highlightPart.style.width = `${displaySetting.fixedData.width * window.innerWidth}px`;
            if (position === "left") highlightPart.style.left = 0;
            else highlightPart.style.right = 0;
        }
        // the element is not existed, create one
        else {
            highlightPart = document.createElement("div");
            highlightPart.id = "panel-highlight";
            shadowDom.appendChild(highlightPart);
            showHighlightPart(position);
        }
    }
}

/**
 * remove the highlight part from the page
 */
function removeHighlightPart() {
    if (highlightPartShown) {
        highlightPartShown = false;
        highlightPart.style.cssText = "";
    }
}

/**
 * get or set the display setting in chrome.storage api
 */
function updateDisplaySetting() {
    // TODO
}

/**
 * judge whether the current page has a scroll bar
 */
function hasScrollbar() {
    return (
        document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    );
}

/**
 * calculate the width of scroll bar
 * method: create a div element with a scroll bar and calculate the difference between offsetWidth and clientWidth
 * @returns {number} the width of scroll bar
 */
function getScrollbarWidth() {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
        "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
}

/**
 * update the bounds value for draggable area
 */
function updateBounds() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    moveablePanel.setBounds({
        top: scrollTop,
        bottom: scrollTop + (1 + displaySetting.floatingData.height) * window.innerHeight - 64
    });
}

/**
 * the handler for window resize event
 * update drag bounds and the size or position of the result panel
 */
function windowResizeHandler() {
    updateBounds();
    if (displaySetting.type === "fixed") showFixedPanel();
    else
        moveablePanel.request("resizable", {
            width: displaySetting.floatingData.width * window.innerWidth,
            height: displaySetting.floatingData.height * window.innerHeight
        });
}

/**
 * drag the target element to the position and resize it to the size
 * @param {number} width width
 * @param {number} height height value
 * @param {number} left x-axis coordinate of the target position
 * @param {number} top y-axis coordinate of the target position
 */
function move(width, height, left, top) {
    moveablePanel.request("draggable", {
        x: left,
        y: top
    });
    moveablePanel.request("resizable", {
        width: width,
        height: height
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
            // 根据用户设定决定是否采用从右到左布局（用于阿拉伯语等从右到左书写的语言）
            chrome.storage.sync.get("LayoutSettings", result => {
                if (result.LayoutSettings.RTL) {
                    let contents = resultPanel.getElementsByClassName("may-need-rtl");
                    for (let i = 0; i < contents.length; i++) {
                        contents[i].dir = "rtl";
                    }
                }
            });
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
        removeFixedPanel();
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
 * Set up translator options.
 *
 * @param {Object} config translator config
 * @param {Array<String>} availableTranslators available translators for current language setting
 *
 * @returns {void} nothing
 */
function setUpTranslateConfig(config, availableTranslators) {
    let translatorsEle = shadowDom.getElementById("translators");

    // Remove existed options.
    for (let i = translatorsEle.options.length; i > 0; i--) {
        translatorsEle.options.remove(i - 1);
    }

    // data-affected indicates items affected by this element in config.selections, they always have the same value.
    let selected = config.single;

    // Add hybrid translator alone.
    if (selected === "hybrid") {
        translatorsEle.options.add(new Option("Hybrid", "hybrid", true, true));
    } else {
        translatorsEle.options.add(new Option("Hybrid", "hybrid"));
    }

    // Add normal translators.
    for (let translator of availableTranslators) {
        if (translator === selected) {
            translatorsEle.options.add(
                new Option(chrome.i18n.getMessage(translator), translator, true, true)
            );
        } else {
            translatorsEle.options.add(new Option(chrome.i18n.getMessage(translator), translator));
        }
    }

    // Update and re-translate.
    translatorsEle.onchange = () => {
        let value = translatorsEle.options[translatorsEle.selectedIndex].value;
        Messager.send("background", "update_translator", { translator: value }).then(() => {
            Messager.send("background", "translate", { text: translateResult.originalText });
        });
    };
}

/**
 * end block
 */
