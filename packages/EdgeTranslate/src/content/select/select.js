import { getDomain } from "common/scripts/common.js";
import { isPDFjsPDFViewer, detectSelect } from "../common.js";
import Channel from "common/scripts/channel.js";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "common/scripts/settings.js";

const ImageData =
    "data:image/png;base64,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";

// Communication channel.
const channel = new Channel();

// to indicate whether the translation button has been shown
let HasButtonShown = false;

/**
 * Initiate translation button.
 */
let translationButtonContainer = document.createElement("iframe");
const iframeContainer = translationButtonContainer;
// Note: some websites can't get contentDocument e.g. https://raw.githubusercontent.com/git/git/master/Documentation/RelNotes/2.40.0.txt. So I use shadow DOM as a fallback.
document.documentElement.appendChild(translationButtonContainer);
if (translationButtonContainer.contentDocument === null) {
    translationButtonContainer = document.createElement("div");
    renderButton();
}
document.documentElement.removeChild(iframeContainer);
translationButtonContainer.id = "edge-translate-button";
translationButtonContainer.style.backgroundColor = "white"; // programatically set style to compatible with the extension 'Dark Reader'

/**
 * When the user clicks the translation button, the translationButtonContainer will be mounted at document.documentElement and the load event will be triggered.
 */
function renderButton() {
    const buttonImage = document.createElement("img");
    buttonImage.src = ImageData;
    const BUTTON_SIZE = "20px";
    Object.assign(buttonImage.style, {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        minWidth: 0,
        maxWidth: BUTTON_SIZE,
        minHeight: 0,
        maxHeight: BUTTON_SIZE,
        padding: 0,
        border: 0,
        margin: 0,
        verticalAlign: 0, // fix the style problem in some websites
        filter: "none", // https://github.com/EdgeTranslate/EdgeTranslate/projects/2#card-58817626
    });
    const translationButton = document.createElement("div");
    Object.assign(translationButton.style, {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        padding: "6px",
        margin: 0,
        borderRadius: "50%",
        boxSizing: "content-box",
        overflow: "hidden",
        border: "none",
        cursor: "pointer",
    });
    translationButton.appendChild(buttonImage);
    getInnerParent(translationButtonContainer).appendChild(translationButton);

    const CleanStyle = {
        padding: 0,
        margin: 0,
        border: "none",
        overflow: "hidden",
    };
    Object.assign(
        translationButtonContainer.contentDocument?.documentElement.style || {},
        CleanStyle
    );
    Object.assign(translationButtonContainer.contentDocument?.body.style || {}, CleanStyle);
    translationButton.addEventListener("mousedown", buttonClickHandler);
    translationButton.addEventListener("contextmenu", (e) => e.preventDefault());
}
translationButtonContainer.addEventListener("load", renderButton);

let originScrollX = 0; // record the original scroll X position(before scroll event)
let originScrollY = 0; // record the original scroll Y position(before scroll event)
let originPositionX = 0; // record the original X position of selection icon(before scroll event)
let originPositionY = 0; // record the original Y position of selection icon(before scroll event)
let scrollingElement = window; // store the specific scrolling element. In normal web pages, window is the scrolling object, while in pdf.js viewer, "#viewerContainer" is the scrolling element.
// store the name of scroll property according to scrollingElement(pageXOffset for window and scrollLeft for pdf.js element)
let scrollPropertyX = "pageXOffset";
let scrollPropertyY = "pageYOffset";
// store the position setting of the translation button. default: "TopLeft"
let ButtonPositionSetting = "TopRight";

// Fetch the button position setting.
getOrSetDefaultSettings("LayoutSettings", DEFAULT_SETTINGS).then((result) => {
    ButtonPositionSetting = result.LayoutSettings.SelectTranslatePosition;
});
// Update the button position setting when the setting is changed.
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.LayoutSettings) return;
    ButtonPositionSetting = changes.LayoutSettings.newValue.SelectTranslatePosition;
});

// this listener activated when document content is loaded
// to make selection button available ASAP
window.addEventListener("DOMContentLoaded", () => {
    // the scrolling elements in pdf files are different from normal web pages
    if (isPDFjsPDFViewer()) {
        // #viewerContainer element is the scrolling element in a pdf file
        scrollingElement = document.getElementById("viewerContainer");
        scrollPropertyX = "scrollLeft";
        scrollPropertyY = "scrollTop";
    }
    // to make the selection icon move with the mouse scrolling
    scrollingElement.addEventListener("scroll", scrollHandler);

    document.addEventListener("mousedown", () => {
        disappearButton();
        // whether user take a select action
        detectSelect(document, (event) => {
            selectTranslate(event);
        });
    });

    document.addEventListener("dblclick", (event) => {
        selectTranslate(event, true);
    });

    document.addEventListener("click", (event) => {
        // triple click
        if (event.detail === 3) {
            selectTranslate(event, true);
        }
    });

    /**
     * implement the select translate feature
     * for the implement detail, please check in the document
     * @param {MouseEvent} event mouse event of mouse up , double click or triple click
     * @param {boolean} isDoubleClick whether the event type is double click or triple click, set false by default
     */
    async function selectTranslate(event, isDoubleClick = false) {
        if (!shouldTranslate()) return;

        const inBlacklist = await isInBlacklist();
        if (inBlacklist) return;

        getOrSetDefaultSettings("OtherSettings", DEFAULT_SETTINGS).then((result) => {
            if (!result.OtherSettings) return;

            let OtherSettings = result.OtherSettings;

            // Show translating result instantly.
            if (
                OtherSettings["TranslateAfterSelect"] ||
                (isDoubleClick && OtherSettings["TranslateAfterDblClick"])
            ) {
                translateSubmit();
            } else if (OtherSettings["SelectTranslate"]) {
                showButton(event);
            }
        });
    }
});

/**
 * 处理鼠标点击按钮事件
 *
 * @param {MouseEvent} event 鼠标点击事件
 */
function buttonClickHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.button === 0) {
        translateSubmit();
    } else if (event.button === 2) {
        pronounceSubmit();
    }
}

/**
 * Use this function to show the translation buttion.
 */
function showButton(event) {
    document.documentElement.appendChild(translationButtonContainer);

    const OffsetXValue = 10,
        OffsetYValue = 20;
    let XBias, YBias;
    switch (ButtonPositionSetting) {
        default:
        case "TopRight":
            XBias = OffsetXValue;
            YBias = -OffsetYValue - translationButtonContainer.clientHeight;
            break;
        case "TopLeft":
            XBias = -OffsetXValue - translationButtonContainer.clientWidth;
            YBias = -OffsetYValue - translationButtonContainer.clientHeight;
            break;
        case "BottomRight":
            XBias = OffsetXValue;
            YBias = OffsetYValue;
            break;
        case "BottomLeft":
            XBias = -OffsetXValue - translationButtonContainer.clientWidth;
            YBias = OffsetYValue;
            break;
    }

    let XPosition = event.x + XBias;
    let YPosition = event.y + YBias;

    // If the icon is beyond the side of the page, we need to reposition the icon inside the page.
    if (XPosition <= 0 || XPosition + translationButtonContainer.clientWidth > window.innerWidth)
        XPosition = event.x - XBias - translationButtonContainer.clientWidth;
    if (YPosition <= 0 || YPosition + translationButtonContainer.clientHeight > window.innerHeight)
        YPosition = event.y - YBias - translationButtonContainer.clientHeight;

    // set the new position of the icon
    translationButtonContainer.style.top = `${YPosition}px`;
    translationButtonContainer.style.left = `${XPosition}px`;

    // record original position of the selection icon and the start mouse scrolling position
    originScrollX = scrollingElement[scrollPropertyX];
    originScrollY = scrollingElement[scrollPropertyY];
    originPositionX = XPosition;
    originPositionY = YPosition;
    HasButtonShown = true;
}

/**
 * get selected text and its position in the page
 *
 * @returns {Object} format: {text: "string", position: [p1,p2]}
 */
function getSelection() {
    let selection = window.getSelection();
    let text = "";
    let position;
    if (selection.rangeCount > 0) {
        text = selection.toString().trim();
        if (isPDFjsPDFViewer()) {
            /**
             * pdf.js adds \n at the end of every line and breaks down single sentences into multiple lines.
             * Thus we have to replace \n with space to improve translation.
             */
            text = text.replace(/\n/g, " ");
        }

        const lastRange = selection.getRangeAt(selection.rangeCount - 1);
        // If the user selects something in a shadow dom, the endContainer will be the HTML element and the position will be [0,0]. In this situation, we set the position undefined to avoid relocating the result panel.
        if (lastRange.endContainer !== document.documentElement) {
            let rect = selection.getRangeAt(selection.rangeCount - 1).getBoundingClientRect();
            position = [rect.left, rect.top];
        }
    }
    return { text, position };
}

/**
 * 处理点击翻译按钮后的事件
 */
function translateSubmit() {
    let selection = getSelection();
    if (selection.text && selection.text.length > 0) {
        channel.request("translate", selection).then(() => {
            getOrSetDefaultSettings("OtherSettings", DEFAULT_SETTINGS).then((result) => {
                // to check whether user need to cancel text selection after translation finished
                if (result.OtherSettings && result.OtherSettings["CancelTextSelection"]) {
                    cancelTextSelection();
                }
            });
            disappearButton();
        });
    }
}

/**
 * Check if we should start translating.
 *
 * @returns {boolean} if we should start translating
 */
function shouldTranslate() {
    let selectionObject = window.getSelection();
    let selectionText = selectionObject.toString().trim();
    if (BROWSER_ENV === "firefox")
        // on firefox, we don't need to tell the focusNode type because in input elements, selectionText is ""
        return (
            selectionText.length > 0 &&
            // Do not re-translate translated text.
            !(window.isDisplayingResult && window.translateResult.originalText === selectionText)
        );

    /**
     * Filter out the nodes to avoid the translation button appearing in some unnecessary places.
     * @param {Node} node the node to be filtered
     * @returns {boolean} if the node should be passed
     */
    const filterNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) return true;
        // BODY is a special case. see https://github.com/EdgeTranslate/EdgeTranslate/issues/531
        if (node.nodeType === Node.ELEMENT_NODE) return ["BODY"].includes(node.tagName);
    };

    return (
        selectionText.length > 0 &&
        (filterNode(selectionObject.anchorNode) || filterNode(selectionObject.focusNode)) &&
        // Do not re-translate translated text.
        !(window.isDisplayingResult && window.translateResult.originalText === selectionText)
    );
}

/**
 * 处理发音快捷键
 */
function pronounceSubmit() {
    let selection = getSelection();
    if (selection.text && selection.text.length > 0) {
        channel.request("pronounce", {
            text: selection.text,
            language: "auto",
        });
    }
}

/**
 * execute this function to make the translation button disappear
 */
function disappearButton() {
    if (HasButtonShown) {
        document.documentElement.removeChild(translationButtonContainer);
        HasButtonShown = false;
    }
}

/**
 * the handler function to make the selection icon move with mouse scrolling
 * @param Event the event of scrolling
 */
function scrollHandler() {
    if (HasButtonShown) {
        let distanceX = originScrollX - scrollingElement[scrollPropertyX];
        let distanceY = originScrollY - scrollingElement[scrollPropertyY];

        translationButtonContainer.style.left = `${originPositionX + distanceX}px`;
        translationButtonContainer.style.top = `${originPositionY + distanceY}px`;
    }
}

/**
 * whether the url of current page is in the blacklist
 *
 * @returns {Promise<boolean>} result in promise form
 */
function isInBlacklist() {
    return getOrSetDefaultSettings("blacklist", DEFAULT_SETTINGS).then((result) => {
        let url = window.location.href;
        let blacklist = result.blacklist;
        return blacklist.domains[getDomain(url)] || blacklist.urls[url];
    });
}

/**
 * cancel text selection when translation is finished
 */
function cancelTextSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
            // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {
        // IE
        document.selection.empty();
    }
}

/**
 * 处理取消网页翻译的快捷键
 */
function cancelPageTranslate() {
    let checkAndClick = (button) => {
        if (button !== null && button !== undefined) {
            button.click();
        }
    };

    let frame = document.getElementById(":0.container");
    if (frame !== null && frame !== undefined) {
        let cancelButton = frame.contentDocument.getElementById(":0.close");
        checkAndClick(cancelButton);
    }

    frame = document.getElementById("OUTFOX_JTR_BAR");
    if (frame !== null && frame !== undefined) {
        let cancelButton = frame.contentDocument.getElementById("OUTFOX_JTR_BAR_CLOSE");
        checkAndClick(cancelButton);
    }
}

/**
 * The container of the translation button can be either an iframe or a div with a shadow dom.
 * This function can get the inner parent of the container.
 * @param {HTMLIFrameElement|HTMLDivElement} container
 */
function getInnerParent(container) {
    if (container.tagName === "IFRAME") return container.contentDocument.body;

    if (container.shadowRoot) return container.shadowRoot;

    container.attachShadow({ mode: "open" });
    return container.shadowRoot;
}

// provide user's selection result for the background module
channel.provide("get_selection", () => Promise.resolve(getSelection()));

// handler for shortcut command
channel.on("command", (detail) => {
    switch (detail.command) {
        case "translate_selected":
            translateSubmit();
            break;
        case "pronounce_selected":
            pronounceSubmit();
            break;
        case "cancel_page_translate":
            cancelPageTranslate();
            break;
        default:
            break;
    }
});
