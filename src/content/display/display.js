/** @jsx h */
import { h } from "preact";
import render from "preact-render-to-string";
import format from "./library/render.js";
import moveable from "./library/moveable/moveable.js";
import Notifier from "./library/notifier/notifier.js";
import { isChromePDFViewer, detectSelect } from "../common.js";
import Messager from "common/scripts/messager.js";
import { delayPromise } from "common/scripts/promise.js";

/**
 * load templates
 */
import result from "./templates/result.xhtml"; // template of translate result
import loading from "./templates/loading.xhtml"; // template of loading icon
import error from "./templates/error.xhtml"; // template of error message

import Panel from "./templates/Panel.jsx";
import Result from "./templates/Result.jsx";

const Template = {
    result,
    loading,
    error,
};

/**
 * end load
 */

// the container of translation panel. the root element of panel
let panelContainer;

// store a shadow dom which is used to attach panel elements
let shadowDom;

// the first child element of shadow dom. It contains all of the panel content elements
let resultPanel;

// store the panel body element
let bodyPanel;

// store the moveable object return by moveable.js
let moveablePanel;
// store the element for highlight part
let highlightPart;
let highlightPartShown = false;

// store the display type(floating or fixed)
let displaySetting = {
    type: "fixed",
    fixedData: {
        width: 0.2,
        position: "right",
    },
    floatingData: {
        width: 0.15,
        height: 0.6,
    },
};

// Store the translation result and attach it to window
window.translateResult = {};

// Flag of showing result.
window.isDisplayingResult = false;

// TTS speeds
let sourceTTSSpeed, targetTTSSpeed;
// store the width of scroll bar
const scrollbarWidth = getScrollbarWidth();
// the duration time of result panel's transition. unit: ms
const transitionDuration = 500;
// flag whether the user set to resize document body
let resizeFlag = false;
// store original css text on document.body
let documentBodyCSS;

// Send notifications to users.
const notifier = new Notifier("center");

const CommonPrefix = "edge-translate-";

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
    shadowDom.innerHTML = render(<Panel />);
    // the first child element of shadow dom. It contains all of the panel content elements
    resultPanel = shadowDom.firstChild;
    // store the panel body element
    bodyPanel = shadowDom.getElementById(`${CommonPrefix}body`);

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
    getDisplaySetting();
    // Set up translator options.
    chrome.storage.sync.get(["languageSetting", "DefaultTranslator"], async (result) => {
        let languageSetting = result.languageSetting;
        let availableTranslators = await Messager.send("background", "get_available_translators", {
            from: languageSetting.sl,
            to: languageSetting.tl,
        });
        setUpTranslateConfig(result.DefaultTranslator, availableTranslators);
    });

    /* make the resultPanel resizable and draggable */
    moveablePanel = new moveable(resultPanel, {
        draggable: true,
        resizable: true,
        /* set threshold value to increase the resize area */
        // threshold: { s: 5, se: 5, e: 5, ne: 5, n: 5, nw: 5, w: 5, sw: 5 },
        // threshold: { edge:5, corner:5 },
        threshold: 5,
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
        thresholdPosition: 0.7,
        minWidth: 100,
        minHeight: 150,
    });

    let startTranslate = [0, 0];
    // to flag whether the floating panel should be changed to fixed panel
    let floatingToFixed = false;
    // store the fixed direction on bound event
    let fixedDirection = "";
    /* draggable events*/
    moveablePanel
        .on("dragStart", ({ set, stop, inputEvent }) => {
            if (inputEvent) {
                const path =
                    inputEvent.path || (inputEvent.composedPath && inputEvent.composedPath());
                // if drag element isn't the head element, stop the drag event
                if (!path || !shadowDom.getElementById(`${CommonPrefix}head`).isSameNode(path[0])) {
                    stop();
                    return;
                }
            }
            set(startTranslate);
        })
        .on("drag", ({ target, translate }) => {
            startTranslate = translate;
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
        })
        .on("dragEnd", ({ translate, inputEvent }) => {
            startTranslate = translate;

            /* change the display type of result panel */
            if (inputEvent && displaySetting.type === "floating") {
                if (floatingToFixed) {
                    displaySetting.fixedData.position = fixedDirection;
                    displaySetting.type = "fixed";
                    removeHighlightPart();
                    showFixedPanel();
                    updateDisplaySetting();
                }
            }
        })
        // // the result panel start to drag out of the drag area
        // .on("boundStart", ({ direction }) => {
        //     console.log(direction);
        // })
        // the result panel drag out of the drag area
        .on("bound", ({ direction, distance }) => {
            /* whether to show hight part on the one side of the page*/
            if (displaySetting.type === "floating") {
                let threshold = 10;
                if (distance > threshold) {
                    if (direction === "left" || direction === "right") {
                        fixedDirection = direction;
                        floatingToFixed = true;
                        showHighlightPart(direction);
                    }
                }
            }
        })
        // the result panel drag into drag area first time
        .on("boundEnd", () => {
            if (floatingToFixed) removeHighlightPart();
            floatingToFixed = false;
            // change the display type from fixed to floating
            if (displaySetting.type === "fixed") {
                displaySetting.type = "floating";
                removeFixedPanel();
                showFloatingPanel();
                updateDisplaySetting();
            }
        });
    /* resizable  events*/
    moveablePanel
        .on("resizeStart", ({ set }) => {
            set(startTranslate);
        })
        .on("resize", ({ target, width, height, translate, inputEvent }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
            if (inputEvent) {
                if (displaySetting.type === "fixed" && resizeFlag) {
                    document.body.style.width = `${(1 - width / window.innerWidth) * 100}%`;
                }
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
async function showPanel(content, template) {
    // Tell select.js that we are displaying results.
    window.isDisplayingResult = true;

    // Write contents into iframe.
    bodyPanel.innerHTML = render(<Result result={content} />);
    // addBodyEventListener(template);
    // if panel hasn't been displayed, locate the panel and show it
    if (!document.documentElement.contains(panelContainer)) {
        await getDisplaySetting();
        updateBounds();
        document.documentElement.appendChild(panelContainer);
        if (displaySetting.type === "floating") {
            /* show floating panel */
            let position;
            let width = displaySetting.floatingData.width * window.innerWidth;
            let height = displaySetting.floatingData.height * window.innerHeight;
            if (content.position) {
                /* adjust the position of result panel. Avoid to beyond the range of page */
                const XBias = 20,
                    YBias = 20,
                    threshold = height / 4;
                position = [content.position[0], content.position[1]];
                // the result panel would exceeds the right boundary of the page
                if (position[0] + width > window.innerWidth) {
                    position[0] = position[0] - width - XBias;
                }
                // the result panel would exceeds the bottom boundary of the page
                if (position[1] + height > window.innerHeight + threshold) {
                    // make true the panel wouldn't exceed the top boundary
                    let newPosition1 = position[1] - height - YBias + threshold;
                    position[1] = newPosition1 < 0 ? 0 : newPosition1;
                }
                position = [position[0] + XBias, position[1] + YBias];
            } else
                position = [
                    (1 - displaySetting.floatingData.width) * window.innerWidth -
                        (hasScrollbar() ? scrollbarWidth : 0),
                    0,
                ];
            showFloatingPanel();
            moveablePanel.request("draggable", { x: position[0], y: position[1] });
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
Messager.receive("content", (message) => {
    /**
     * Check message timestamp.
     *
     * translateResult keeps the latest(biggest) timestamp ever received.
     */
    if (window.translateResult.timestamp && message.detail.timestamp) {
        /**
         * When a new message with timestamp arrived, we check if the timestamp stored in translateResult
         * is bigger than the timestamp of the arriving message.
         */
        if (window.translateResult.timestamp > message.detail.timestamp) {
            /**
             * If it does, which means the corresponding translating request is out of date, we drop the
             * message.
             */
            return Promise.resolve();
        }
        /**
         * If it doesn't, which means the corresponding translating request is up to date, we update
         * the timestamp stored in translateResult and accept the message.
         */
        window.translateResult.timestamp = message.detail.timestamp;
    }

    // 避免从file://跳转到pdf viewer的消息传递对此的影响
    switch (message.title) {
        case "before_translating":
            // the translator send this message to make sure current tab can display result panel
            break;
        case "start_translating":
            // Remember translating text.
            window.translateResult.originalText = message.detail.text;
            showPanel(message.detail, "loading");
            break;
        case "translating_finished":
            window.translateResult = message.detail;
            sourceTTSSpeed = "fast";
            targetTTSSpeed = "fast";
            showPanel(message.detail, "result");
            break;
        case "translating_error":
            showPanel(message.detail, "error");
            break;
        case "pronouncing_finished":
            onPronouncingFinished(message.detail.pronouncing);
            break;
        case "pronouncing_error":
            onPronouncingFinished(message.detail.pronouncing);
            notifier.notify({
                type: "error",
                title: chrome.i18n.getMessage("AppName"),
                detail: chrome.i18n.getMessage("PRONOUN_ERR"),
            });
            break;
        case "update_translator_options":
            setUpTranslateConfig(
                message.detail.selectedTranslator,
                message.detail.availableTranslators
            );
            break;
        // 发送的是快捷键命令
        case "command":
            switch (message.detail.command) {
                case "fix_result_frame":
                    chrome.storage.sync.get("fixSetting", (result) => {
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
                    if (window.translateResult.mainMeaning) {
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
    /* set border radius for the floating type result panel */
    shadowDom.getElementById(`${CommonPrefix}head`).style["border-radius"] = "6px 6px 0 0";
    shadowDom.getElementById(`${CommonPrefix}body`).style["border-radius"] = "0 0 6px 6px";
    moveablePanel.request("resizable", {
        width: displaySetting.floatingData.width * window.innerWidth,
        height: displaySetting.floatingData.height * window.innerHeight,
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
    chrome.storage.sync.get("LayoutSettings", async (result) => {
        resizeFlag = result.LayoutSettings.Resize;
        // user set to resize the document body
        if (resizeFlag) {
            // store the original css text. when fixed panel is removed, restore the style of document.body
            documentBodyCSS = document.body.style.cssText;

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
            document.body.style.width = `${(1 - displaySetting.fixedData.width) * 100}%`;
            // set the target width for the result panel
            move(width, window.innerHeight, offsetLeft, 0);
            /* cancel the transition effect after the panel showed */
            await delayPromise(transitionDuration);
            resultPanel.style.transition = "";
            document.body.style.transition = "";
        } else move(width, window.innerHeight, offsetLeft, 0);
    });

    /* cancel the border radius of the fixed type result panel */
    shadowDom.getElementById("edge-translate-panel-head").style["border-radius"] = "";
    shadowDom.getElementById("edge-translate-panel-body").style["border-radius"] = "";
}

/**
 * if user choose to resize the document body, make the page return to normal size
 */
async function removeFixedPanel() {
    if (resizeFlag) {
        document.body.style.transition = `width ${transitionDuration}ms`;
        await delayPromise(50);
        document.body.style.width = "100%";
        await delayPromise(transitionDuration);
        document.body.style.cssText = documentBodyCSS;
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
            highlightPart.id = "edge-translate-panel-highlight";
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
 * get the display setting in chrome.storage api
 * @returns {Promise{undefined}} null promise
 */
function getDisplaySetting() {
    return new Promise((resolve) => {
        chrome.storage.sync.get("DisplaySetting", (result) => {
            if (result.DisplaySetting) {
                displaySetting = result.DisplaySetting;
            } else {
                updateDisplaySetting();
            }
            resolve();
        });
    });
}

/**
 * set the display setting in chrome.storage api
 */
function updateDisplaySetting() {
    chrome.storage.sync.set({ DisplaySetting: displaySetting });
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
    let scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
        "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
    document.documentElement.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.documentElement.removeChild(scrollDiv);
    return scrollbarWidth;
}

/**
 * update the bounds value for draggable area
 */
async function updateBounds() {
    await getDisplaySetting();
    let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    moveablePanel.setBounds({
        left: scrollLeft,
        top: scrollTop,
        right: scrollLeft + window.innerWidth - (hasScrollbar() ? scrollbarWidth : 0),
        bottom: scrollTop + (1 + displaySetting.floatingData.height) * window.innerHeight - 64,
    });
}

/**
 * the handler for window resize event
 * update drag bounds and the size or position of the result panel
 */
function windowResizeHandler() {
    updateBounds();
    // if result panel has been shown
    if (document.documentElement.contains(panelContainer)) {
        if (displaySetting.type === "fixed") showFixedPanel();
        else
            moveablePanel.request("resizable", {
                width: displaySetting.floatingData.width * window.innerWidth,
                height: displaySetting.floatingData.height * window.innerHeight,
            });
    }
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
        y: top,
    });
    moveablePanel.request("resizable", {
        width,
        height,
    });
}

/**
 * add event listeners to the panel-head elements
 */
function addHeadEventListener() {
    // 给关闭按钮添加点击事件监听，用于关闭侧边栏
    shadowDom.getElementById(`${CommonPrefix}icon-close`).addEventListener("click", removePanel);
    // 给固定侧边栏的按钮添加点击事件监听，用户侧边栏的固定与取消固定
    shadowDom.getElementById(`${CommonPrefix}icon-pin`).addEventListener("click", fixOn);
    shadowDom.getElementById(`${CommonPrefix}icon-unpin`).addEventListener("click", fixOff);
    // Open options page.
    shadowDom
        .getElementById(`${CommonPrefix}icon-options`)
        .addEventListener("click", openOptionsPage);

    // 给点击侧边栏之外区域事件添加监听，点击侧边栏之外的部分就会让侧边栏关闭
    chrome.storage.sync.get("fixSetting", (result) => {
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

            // Pronounce texts.
            let sourcePronounceIcon = shadowDom.getElementById("source-pronounce");
            if (sourcePronounceIcon) {
                sourcePronounceIcon.addEventListener("click", sourcePronounce);
            }

            let targetPronounceIcon = shadowDom.getElementById("target-pronounce");
            if (targetPronounceIcon) {
                targetPronounceIcon.addEventListener("click", targetPronounce);
            }

            // Edit and re-translate the text.
            let editIcon = shadowDom.getElementById("icon-edit");
            editIcon.addEventListener("click", editOriginalText);
            editIcon.style.display = "block";

            let editDoneIcon = shadowDom.getElementById("icon-edit-done");
            editDoneIcon.addEventListener("click", submitEditedText);
            editDoneIcon.style.display = "none";

            // Unfold original text on click.
            let originalTextEle = resultPanel
                .getElementsByClassName("original-text")[0]
                .getElementsByTagName("p")[0];
            originalTextEle.addEventListener("mousedown", expandOriginalText);

            // 根据用户设定决定是否采用从右到左布局（用于阿拉伯语等从右到左书写的语言）
            chrome.storage.sync.get("LayoutSettings", (result) => {
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
        // Tell select.js that the result panel has been removed.
        window.isDisplayingResult = false;

        removeFixedPanel();
        document.documentElement.removeChild(panelContainer);

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
        fixSetting: true,
    });
    shadowDom.getElementById(`${CommonPrefix}icon-unpin`).style.display = "flex";
    shadowDom.getElementById(`${CommonPrefix}icon-pin`).style.display = "none";
    document.documentElement.removeEventListener("mousedown", clickListener);
}

/**
 * 负责解除侧边栏的固定
 */
function fixOff() {
    chrome.storage.sync.set({
        fixSetting: false,
    });
    shadowDom.getElementById(`${CommonPrefix}icon-unpin`).style.display = "none";
    shadowDom.getElementById(`${CommonPrefix}icon-pin`).style.display = "flex";
    document.documentElement.addEventListener("mousedown", clickListener);
}

/**
 * Open options page.
 */
function openOptionsPage() {
    Messager.send("background", "open_options_page", {});
}

/**
 * Send message to background to pronounce the translating text.
 */
function sourcePronounce() {
    if (document.documentElement.contains(panelContainer)) {
        // Show loading animation when loading pronouncing.
        shadowDom.getElementById("source-pronounce").style.display = "none";
        shadowDom.getElementById("source-pronounce-loading").style.display = "block";

        Messager.send("background", "pronounce", {
            pronouncing: "source",
            text: window.translateResult.originalText,
            language: window.translateResult.sourceLanguage,
            speed: sourceTTSSpeed,
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
        // Show loading animation when loading pronouncing.
        shadowDom.getElementById("target-pronounce").style.display = "none";
        shadowDom.getElementById("target-pronounce-loading").style.display = "block";

        Messager.send("background", "pronounce", {
            pronouncing: "target",
            text: window.translateResult.mainMeaning,
            language: window.translateResult.targetLanguage,
            speed: targetTTSSpeed,
        }).then(() => {
            if (targetTTSSpeed === "fast") {
                targetTTSSpeed = "slow";
            } else {
                targetTTSSpeed = "fast";
            }
        });
    }
}

/**
 * Restore pronounce icon when pronouncing finished.
 *
 * @param {String} pronouncing which pronounce icon should we restore, source or target?
 */
function onPronouncingFinished(pronouncing) {
    if (pronouncing == "source") {
        shadowDom.getElementById("source-pronounce-loading").style.display = "none";
        shadowDom.getElementById("source-pronounce").style.display = "block";
    } else if (pronouncing == "target") {
        shadowDom.getElementById("target-pronounce-loading").style.display = "none";
        shadowDom.getElementById("target-pronounce").style.display = "block";
    }
}

function copyContent() {
    // the node of translation result
    let translateResultEle = resultPanel
        .getElementsByClassName("main-meaning")[0]
        .getElementsByTagName("p")[0];

    // make contents editable
    translateResultEle.setAttribute("contenteditable", "true");
    translateResultEle.focus();

    // select all content automatically
    let range = document.createRange();
    range.selectNodeContents(translateResultEle);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // do copy
    document.execCommand("copy");

    // on focus out, set the node to unedible
    translateResultEle.addEventListener("blur", () => {
        translateResultEle.setAttribute("contenteditable", "false");
        window.getSelection().removeAllRanges();
    });
}

/**
 * The following 4 functions are intended to prevent input events from being caught by other elements.
 */

/**
 * Prevent keydown event from propagation.
 *
 * @param {Event} event keydown event.
 */
function onKeyDownInTextEditor(event) {
    event.stopPropagation();
}

/**
 * Prevent keyup event from propagation.
 *
 * @param {Event} event keyup event.
 */
function onKeyUpInTextEditor(event) {
    event.stopPropagation();
}

/**
 * When the input box gets focused, prevent input events from propagation.
 *
 * @param {Event} event focus event.
 */
function onTextEditorFocused(event) {
    event.target.addEventListener("keydown", onKeyDownInTextEditor);
    event.target.addEventListener("keyup", onKeyUpInTextEditor);
}

/**
 * When the input box gets blurred, allow input events propagation.
 *
 * @param {Event} event blur event.
 */
function onTextEditorBlurred(event) {
    event.target.removeEventListener("keydown", onKeyDownInTextEditor);
    event.target.removeEventListener("keyup", onKeyUpInTextEditor);
}

/**
 * Fold overflowed original text for better reading experience.
 *
 * @returns {void} nothing
 */
function foldOriginalText() {
    let originalTextEle = resultPanel
        .getElementsByClassName("original-text")[0]
        .getElementsByTagName("p")[0];

    detectSelect(originalTextEle, null, () => {
        // Fold text.
        originalTextEle.style.overflow = "hidden";
        originalTextEle.style["white-space"] = "nowrap";
        originalTextEle.title = chrome.i18n.getMessage("ClickToExpand");

        // Update mousedown event listener.
        originalTextEle.removeEventListener("mousedown", foldOriginalText);
        originalTextEle.addEventListener("mousedown", expandOriginalText);
    });
}

/**
 * Expand overflowed original text for reading and editing.
 *
 * @returns {void} nothing
 */
function expandOriginalText() {
    let originalTextEle = resultPanel
        .getElementsByClassName("original-text")[0]
        .getElementsByTagName("p")[0];

    detectSelect(originalTextEle, null, () => {
        // Expand text.
        originalTextEle.style.overflow = "inherit";
        originalTextEle.style["white-space"] = "inherit";
        originalTextEle.title = chrome.i18n.getMessage("ClickToFold");

        // Update mousedown event listener.
        originalTextEle.removeEventListener("mousedown", expandOriginalText);
        originalTextEle.addEventListener("mousedown", foldOriginalText);
    });
}

/**
 * Edit original text.
 */
function editOriginalText() {
    let originalTextEle = resultPanel
        .getElementsByClassName("original-text")[0]
        .getElementsByTagName("p")[0];

    // Allow editing.
    originalTextEle.setAttribute("contenteditable", "true");

    // Prevent input events from propagation.
    originalTextEle.addEventListener("focus", onTextEditorFocused);
    originalTextEle.addEventListener("blur", onTextEditorBlurred);

    // Expand original text for reading and editing.
    originalTextEle.style.overflow = "inherit";
    originalTextEle.style["white-space"] = "inherit";
    originalTextEle.title = "";

    // Remove click listeners to avoid unwanted folding and expanding.
    originalTextEle.removeEventListener("mousedown", foldOriginalText);
    originalTextEle.removeEventListener("mousedown", expandOriginalText);

    // Auto focus.
    originalTextEle.focus();

    shadowDom.getElementById("icon-edit").style.display = "none";
    shadowDom.getElementById("icon-edit-done").style.display = "block";
}

/**
 * Submit and translate edited text.
 */
function submitEditedText() {
    let originalTextEle = resultPanel
        .getElementsByClassName("original-text")[0]
        .getElementsByTagName("p")[0];

    // Prevent editing.
    originalTextEle.setAttribute("contenteditable", "false");

    // Allow input events propagation.
    originalTextEle.removeEventListener("focus", onTextEditorFocused);
    originalTextEle.removeEventListener("blur", onTextEditorBlurred);

    // Add back foldOriginalText click listener to enable folding.
    originalTextEle.addEventListener("mousedown", foldOriginalText);
    originalTextEle.title = chrome.i18n.getMessage("ClickToFold");

    let text = originalTextEle.textContent.trim();
    if (text.length > 0) {
        // to make sure the new text is different from the original text
        if (text.valueOf() !== window.translateResult.originalText.valueOf()) {
            // Do translating.
            Messager.send("background", "translate", { text });
        }
    } else {
        // Restore original text.
        originalTextEle.textContent = window.translateResult.originalText;
    }

    shadowDom.getElementById("icon-edit").style.display = "block";
    shadowDom.getElementById("icon-edit-done").style.display = "none";
}

/**
 * Set up translator options.
 *
 * @param {String} selectedTranslator selected translator
 * @param {Array<String>} availableTranslators available translators for current language setting
 *
 * @returns {void} nothing
 */
function setUpTranslateConfig(selectedTranslator, availableTranslators) {
    // let translatorsEle = shadowDom.getElementById("translators");
    // // Remove existed options.
    // for (let i = translatorsEle.options.length; i > 0; i--) {
    //     translatorsEle.options.remove(i - 1);
    // }
    // // Add translator options.
    // for (let translator of availableTranslators) {
    //     if (translator === selectedTranslator) {
    //         translatorsEle.options.add(
    //             new Option(chrome.i18n.getMessage(translator), translator, true, true)
    //         );
    //     } else {
    //         translatorsEle.options.add(new Option(chrome.i18n.getMessage(translator), translator));
    //     }
    // }
    // // Update and re-translate.
    // translatorsEle.onchange = () => {
    //     Messager.send("background", "update_default_translator", {
    //         translator: translatorsEle.options[translatorsEle.selectedIndex].value,
    //     }).then(() => {
    //         Messager.send("background", "translate", { text: window.translateResult.originalText });
    //     });
    // };
}

/**
 * end block
 */
