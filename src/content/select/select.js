import { getDomain } from "../../common/scripts/common.js";
import { isPDFjsPDFViewer } from "../common.js";
import Messager from "../../common/scripts/messager.js";

// 记录下mousedown事件，只有在mousedown事件发生后再发生mouseup事件才会尝试进行划词翻译
var HasMouseDown = false;
// to indicate whether the translation button has been shown
var HasButtonShown = false;

/* store the position of selection icon to help locate the result panel*/
// store start position of the icon
var startPosition;
// store the latest position of the icon. scroll event may change the icon's position
var currentPosition;

/**
 * 创建翻译按钮的图标元素
 */
var translateButton = document.createElement("div");
var disable = true; // 用于实现点击完按钮后按钮消失的功能，用于在某些情况下禁止按钮的显示
var img = document.createElement("img");
img.src =
    "data:image/png;base64,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";
translateButton.appendChild(img);
translateButton.id = "translate-button";
translateButton.style.backgroundColor = "white"; // 动态设置样式以兼容Dark Reader
document.documentElement.appendChild(translateButton);
translateButton.addEventListener("mousedown", buttonClickHandler);

var originScrollX = 0; // record the original scroll X position(before scroll event)
var originScrollY = 0; // record the original scroll Y position(before scroll event)
var originPositionX = 0; // record the original X position of selection icon(before scroll event)
var originPositionY = 0; // record the original Y position of selection icon(before scroll event)
var scrollingElement = document.documentElement; // store the specific scrolling element. In normal web pages, document element is the scrolling element

// this listener activated when document content is loaded
// to make selection button available ASAP
window.addEventListener("DOMContentLoaded", () => {
    // the scrolling elements in pdf files are different from normal web pages
    if (isPDFjsPDFViewer()) {
        // #viewerContainer element is the scrolling element in a pdf file
        scrollingElement = document.getElementById("viewerContainer");
        // to make the selection icon move with the mouse scrolling
        scrollingElement.addEventListener("scroll", scrollHandler);
    } else {
        // scrolling event listener has to be added to window and adding to document element doesn't work
        window.addEventListener("scroll", scrollHandler);
    }

    /**
     * 划词翻译功能的实现
     * 需要对页面的相关事件进行监听，根据用户设定来决定是否进行监听。
     */
    chrome.storage.sync.get("OtherSettings", function(result) {
        var OtherSettings = result.OtherSettings;
        if (OtherSettings && OtherSettings["SelectTranslate"]) {
            document.addEventListener("mouseup", mouseUpHandler);
            document.addEventListener("mousedown", mouseDownHandler);
        }
        if (OtherSettings && OtherSettings["TranslateAfterDblClick"]) {
            document.addEventListener("dblclick", dblClickHandler);
        }
    });

    /**
     * 当用户更改设定时添加或删除事件监听。
     */
    chrome.storage.onChanged.addListener(function(changes, area) {
        if (area === "sync" && changes["OtherSettings"]) {
            if (changes["OtherSettings"].newValue["SelectTranslate"]) {
                document.addEventListener("mouseup", mouseUpHandler);
                document.addEventListener("mousedown", mouseDownHandler);
            } else {
                document.removeEventListener("mouseup", mouseUpHandler);
                document.removeEventListener("mousedown", mouseDownHandler);
            }
            if (changes["OtherSettings"].newValue["TranslateAfterDblClick"]) {
                document.addEventListener("dblclick", dblClickHandler);
            } else {
                document.removeEventListener("dblclick", dblClickHandler);
            }
        }
    });
});

/**
 * Handle double click event
 */
function dblClickHandler(event) {
    executeIfNotInBlacklist(function() {
        if (isSelected()) {
            // 检查页面中是否有内容被选中
            chrome.storage.sync.get("OtherSettings", function(result) {
                var OtherSettings = result.OtherSettings;
                // Show translating result instantly.
                if (
                    OtherSettings &&
                    !OtherSettings["TranslateAfterSelect"] &&
                    OtherSettings["TranslateAfterDblClick"]
                ) {
                    disable = false;
                    // store the position which would be transferred to display.js through messager.
                    currentPosition = [event.clientX, event.clientY];
                    translateSubmit();
                }
            });
        } else {
            disappearButton(); // 使翻译按钮隐藏
        }
    });
}

/**
 * Handle mouse up event.
 */
function mouseUpHandler(event) {
    executeIfNotInBlacklist(function() {
        if (isSelected()) {
            // 检查页面中是否有内容被选中
            chrome.storage.sync.get("OtherSettings", function(result) {
                var OtherSettings = result.OtherSettings;
                // Show translating result instantly.
                if (OtherSettings && OtherSettings["TranslateAfterSelect"] && HasMouseDown) {
                    // 重置HasMouseDown
                    HasMouseDown = false;
                    // store the position which would be transferred to display.js through messager.
                    currentPosition = [event.clientX, event.clientY];
                    // submit translation request
                    translateSubmit();

                    // Show translate button.
                } else if (disable) {
                    setTimeout(function() {
                        showButton(event);
                    }, 0);
                }
            });
        } else {
            disappearButton(); // 使翻译按钮隐藏
        }
    });
}

/**
 * 处理鼠标点击按钮事件
 *
 * @param {MouseEvent} event 鼠标点击事件
 */
function buttonClickHandler(event) {
    if (event.button === 0) {
        translateSubmit();
    } else if (event.button === 2) {
        pronounceSubmit();
    }
}

/**
 * 当鼠标选中一段文字后，调用此函数，显示出翻译按钮
 */
function showButton(event) {
    if (disable && !HasButtonShown) {
        // 使翻译按钮显示出来
        translateButton.style.display = "inline-block";
        const XBias = 10,
            YBias = 15;

        // 翻译按钮的横坐标位置: 鼠标停留位置 + x方向滚动的高度 + bias
        let XPosition = event.x + XBias;
        // 翻译按钮的纵坐标位置: 鼠标停留位置 + y方向滚动的高度 + bias
        let YPosition = event.y - YBias - translateButton.clientHeight;

        // transfer this position to display.js through the translate submission
        startPosition = [event.clientX, event.clientY];
        currentPosition = startPosition;

        // if the icon is beyond the right side of the page, we need to put the icon on the left of the cursor
        if (XPosition + translateButton.clientWidth > document.documentElement.clientWidth)
            XPosition = event.x - XBias - translateButton.clientWidth;
        // if the icon is above the top of the page, we need to put the icon below the cursor
        if (YPosition <= 0) YPosition = event.y + YBias;

        // set the new position of the icon
        // translateButton.style.transform = "translate(" + XPosition + "px," + YPosition + "px)";
        translateButton.style.top = YPosition + "px";
        translateButton.style.left = XPosition + "px";

        // record original position of the selection icon and the start mouse scrolling position
        originScrollX = scrollingElement.scrollLeft;
        originScrollY = scrollingElement.scrollTop;
        originPositionX = XPosition;
        originPositionY = YPosition;
        HasButtonShown = true;
    }
}

/**
 * 处理点击翻译按钮后的事件
 */
function translateSubmit() {
    disable = false; // 禁止按钮显示
    // 发送消息给后台进行翻译。
    if (
        window
            .getSelection()
            .toString()
            .trim()
    ) {
        Messager.send("background", "translate", {
            text: window.getSelection().toString(),
            // send the position of selection icon to background
            // to help locate the result panel
            position: currentPosition // an array
        }).then(() => {
            chrome.storage.sync.get("OtherSettings", result => {
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
 * To judge if there is normal text selected
 * @returns boolean true-> normal text selected
 */
function isSelected() {
    let selectionObject = window.getSelection();
    return (
        selectionObject.toString().trim() &&
        (selectionObject.anchorNode.nodeType === 3 || selectionObject.focusNode.nodeType === 3)
    ); // to make sure the selected text is not in the input elements. Value "3" map to Node.TEXT_NODE
}

/**
 * 处理发音快捷键
 */
function pronounceSubmit() {
    if (
        window
            .getSelection()
            .toString()
            .trim()
    ) {
        Messager.send("background", "pronounce", {
            text: window.getSelection().toString(),
            language: "auto"
        });
    }
}

/**
 * execute this function to make the translation button disappear
 */
function disappearButton() {
    translateButton.style.display = "none";
    HasButtonShown = false;
}

/**
 * 如果页面中没有鼠标选中的区域，调用此函数去掉翻译按钮
 */
function mouseDownHandler() {
    // 记录下mousedown事件
    HasMouseDown = true;

    // set time out to avoid the button to flash after clicking it
    var selection = window.getSelection();
    setTimeout(function() {
        if (!selection.toString().trim()) {
            disappearButton();
            disable = true; // 回复按钮显示
        }
    }, 0);
}

/**
 * the handler function to make the selection icon move with mouse scrolling
 * @param Event the event of scrolling
 */
function scrollHandler() {
    if (HasButtonShown) {
        let distanceX = originScrollX - scrollingElement.scrollLeft;
        let distanceY = originScrollY - scrollingElement.scrollTop;

        translateButton.style.left = originPositionX + distanceX + "px";
        translateButton.style.top = originPositionY + distanceY + "px";
        currentPosition = [startPosition[0] + distanceX, startPosition[1] + distanceY];
    }
}

/**
 * 如果当前页面不在黑名单中则执行给定的回调函数。
 *
 * @param {Function} callback 回调
 */
function executeIfNotInBlacklist(callback) {
    chrome.storage.sync.get("blacklist", function(result) {
        var url = window.location.href;
        var blacklist = result.blacklist;
        if (!blacklist || (!blacklist.domains[getDomain(url)] && !blacklist.urls[url])) {
            callback();
        }
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
    let checkAndClick = button => {
        if (button !== null && button !== undefined) {
            button.click();
        }
    };

    let frame = document.getElementById(":0.container");
    if (frame !== null && frame !== undefined) {
        let cancelButton = frame.contentDocument.getElementById(":0.close");
        checkAndClick(cancelButton);
        return;
    }

    frame = document.getElementById("OUTFOX_JTR_BAR");
    if (frame !== null && frame !== undefined) {
        let cancelButton = frame.contentDocument.getElementById("OUTFOX_JTR_BAR_CLOSE");
        checkAndClick(cancelButton);
        return;
    }
}

/**
 *  实现快捷键翻译
 */
Messager.receive("content", message => {
    switch (message.title) {
        case "command":
            switch (message.detail.command) {
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
            break;
        default:
            break;
    }
    return Promise.resolve();
});
