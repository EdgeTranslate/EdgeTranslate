/** @jsx h */
import { h, render } from "preact";
// import { isChromePDFViewer, detectSelect } from "../common.js";

import Panel from "./Panel.jsx";

window.onload = () => {
    render(<Panel />, document.documentElement);
};

// /**
//  * initiate panel elements to display translation result
//  * create a shadow dom to contain panel elements
//  * add moveable feature to ${resultPanel}
//  */
// (function initiate() {
//     /* create elements */
//     // the container of translation panel. the root element of panel
//     panelContainer = document.createElement("div");
//     // store a shadow dom which is used to attach panel elements
//     shadowDom = panelContainer.attachShadow({ mode: "open" });
//     shadowDom.innerHTML = render(<Panel />);
//     // the first child element of shadow dom. It contains all of the panel content elements
//     resultPanel = shadowDom.firstChild;
//     // store the panel body element
//     bodyPanel = shadowDom.getElementById(`${CommonPrefix}body`);

//     /* set attributes of elements */
//     resultPanel.style.backgroundColor = "white"; // set style dynamically to be compatible with chrome extension "Dark Reader"
//     resultPanel.style.boxShadow = "0px 4px 23px -6px rgb(64,64,64,0.8)"; // set style dynamically to be compatible with chrome extension "Dark Reader"

// showPanel(
//     {
//         originalText: "test",
//         mainMeaning: "测试",
//         sPronunciation: "[test]",
//         tPronunciation: "ceshi",
//         detailedMeanings: [
//             {
//                 pos: "词性",
//                 meaning: "意思",
//                 synonyms: ["近义词"],
//             },
//         ],
//     },
//     "result"
// );

// /**
//  * add event listeners to panel body elements
//  * @param {String} template the name of the current using template
//  */
// function addBodyEventListener(template) {
//     switch (template) {
//         case "result": {
//             // copy the translation result to the copy board
//             shadowDom
//                 .getElementById(`${CommonPrefix}icon-copy`)
//                 .addEventListener("click", copyContent);

//             // Pronounce texts.
//             let sourcePronounceIcon = shadowDom.getElementById(
//                 `${CommonPrefix}icon-pronounce-source`
//             );
//             if (sourcePronounceIcon) {
//                 sourcePronounceIcon.addEventListener("click", sourcePronounce);
//             }

//             let targetPronounceIcon = shadowDom.getElementById(
//                 `${CommonPrefix}icon-pronounce-target`
//             );
//             if (targetPronounceIcon) {
//                 targetPronounceIcon.addEventListener("click", targetPronounce);
//             }

//             // Edit and re-translate the text.
//             let editIcon = shadowDom.getElementById(`${CommonPrefix}icon-edit`);
//             editIcon.addEventListener("click", editOriginalText);
//             editIcon.style.display = "block";

//             let editDoneIcon = shadowDom.getElementById(`${CommonPrefix}icon-edit-done`);
//             editDoneIcon.addEventListener("click", submitEditedText);
//             editDoneIcon.style.display = "none";

//             // Unfold original text on click.
//             let originalTextEle = shadowDom.getElementById(`${CommonPrefix}source-text`);
//             originalTextEle.addEventListener("mousedown", expandOriginalText);

//             // // 根据用户设定决定是否采用从右到左布局（用于阿拉伯语等从右到左书写的语言）
//             chrome.storage.sync.get("LayoutSettings", (result) => {
//                 if (result.LayoutSettings.RTL) {
//                     let contents = shadowDom.getElementsByClassName(`${CommonPrefix}may-need-rtl`);
//                     for (let i = 0; i < contents.length; i++) {
//                         contents[i].dir = "rtl";
//                     }
//                 }
//             });
//             break;
//         }
//         case "loading":
//             break;
//         case "error":
//             break;
//         default:
//             break;
//     }
// }

// /**
//  * block start
//  * 事件监听的回调函数定义请在此区域中进行
//  */

// function copyContent() {
//     // the node of translation result
//     let translateResultEle = shadowDom.getElementById(`${CommonPrefix}target-text`);

//     // make contents editable
//     translateResultEle.setAttribute("contenteditable", "true");
//     translateResultEle.focus();

//     // select all content automatically
//     let range = document.createRange();
//     range.selectNodeContents(translateResultEle);
//     window.getSelection().removeAllRanges();
//     window.getSelection().addRange(range);

//     // do copy
//     document.execCommand("copy");

//     // on focus out, set the node to unedible
//     translateResultEle.addEventListener("blur", () => {
//         translateResultEle.setAttribute("contenteditable", "false");
//         window.getSelection().removeAllRanges();
//     });
// }

// /**
//  * The following 4 functions are intended to prevent input events from being caught by other elements.
//  */

// /**
//  * Prevent keydown event from propagation.
//  *
//  * @param {Event} event keydown event.
//  */
// function onKeyDownInTextEditor(event) {
//     event.stopPropagation();
// }

// /**
//  * Prevent keyup event from propagation.
//  *
//  * @param {Event} event keyup event.
//  */
// function onKeyUpInTextEditor(event) {
//     event.stopPropagation();
// }

// /**
//  * When the input box gets focused, prevent input events from propagation.
//  *
//  * @param {Event} event focus event.
//  */
// function onTextEditorFocused(event) {
//     event.target.addEventListener("keydown", onKeyDownInTextEditor);
//     event.target.addEventListener("keyup", onKeyUpInTextEditor);
// }

// /**
//  * When the input box gets blurred, allow input events propagation.
//  *
//  * @param {Event} event blur event.
//  */
// function onTextEditorBlurred(event) {
//     event.target.removeEventListener("keydown", onKeyDownInTextEditor);
//     event.target.removeEventListener("keyup", onKeyUpInTextEditor);
// }

// /**
//  * Fold overflowed original text for better reading experience.
//  *
//  * @returns {void} nothing
//  */
// function foldOriginalText() {
//     let originalTextEle = resultPanel
//         .getElementsByClassName("original-text")[0]
//         .getElementsByTagName("p")[0];

//     detectSelect(originalTextEle, null, () => {
//         // Fold text.
//         originalTextEle.style.overflow = "hidden";
//         originalTextEle.style["white-space"] = "nowrap";
//         originalTextEle.title = chrome.i18n.getMessage("ClickToExpand");

//         // Update mousedown event listener.
//         originalTextEle.removeEventListener("mousedown", foldOriginalText);
//         originalTextEle.addEventListener("mousedown", expandOriginalText);
//     });
// }

// /**
//  * Expand overflowed original text for reading and editing.
//  *
//  * @returns {void} nothing
//  */
// function expandOriginalText() {
//     let originalTextEle = resultPanel
//         .getElementsByClassName("original-text")[0]
//         .getElementsByTagName("p")[0];

//     detectSelect(originalTextEle, null, () => {
//         // Expand text.
//         originalTextEle.style.overflow = "inherit";
//         originalTextEle.style["white-space"] = "inherit";
//         originalTextEle.title = chrome.i18n.getMessage("ClickToFold");

//         // Update mousedown event listener.
//         originalTextEle.removeEventListener("mousedown", expandOriginalText);
//         originalTextEle.addEventListener("mousedown", foldOriginalText);
//     });
// }

// /**
//  * Edit original text.
//  */
// function editOriginalText() {
//     let originalTextEle = resultPanel
//         .getElementsByClassName("original-text")[0]
//         .getElementsByTagName("p")[0];

//     // Allow editing.
//     originalTextEle.setAttribute("contenteditable", "true");

//     // Prevent input events from propagation.
//     originalTextEle.addEventListener("focus", onTextEditorFocused);
//     originalTextEle.addEventListener("blur", onTextEditorBlurred);

//     // Expand original text for reading and editing.
//     originalTextEle.style.overflow = "inherit";
//     originalTextEle.style["white-space"] = "inherit";
//     originalTextEle.title = "";

//     // Remove click listeners to avoid unwanted folding and expanding.
//     originalTextEle.removeEventListener("mousedown", foldOriginalText);
//     originalTextEle.removeEventListener("mousedown", expandOriginalText);

//     // Auto focus.
//     originalTextEle.focus();

//     shadowDom.getElementById("icon-edit").style.display = "none";
//     shadowDom.getElementById("icon-edit-done").style.display = "block";
// }

// /**
//  * Submit and translate edited text.
//  */
// function submitEditedText() {
//     let originalTextEle = resultPanel
//         .getElementsByClassName("original-text")[0]
//         .getElementsByTagName("p")[0];

//     // Prevent editing.
//     originalTextEle.setAttribute("contenteditable", "false");

//     // Allow input events propagation.
//     originalTextEle.removeEventListener("focus", onTextEditorFocused);
//     originalTextEle.removeEventListener("blur", onTextEditorBlurred);

//     // Add back foldOriginalText click listener to enable folding.
//     originalTextEle.addEventListener("mousedown", foldOriginalText);
//     originalTextEle.title = chrome.i18n.getMessage("ClickToFold");

//     let text = originalTextEle.textContent.trim();
//     if (text.length > 0) {
//         // to make sure the new text is different from the original text
//         if (text.valueOf() !== window.translateResult.originalText.valueOf()) {
//             // Do translating.
//             Messager.send("background", "translate", { text });
//         }
//     } else {
//         // Restore original text.
//         originalTextEle.textContent = window.translateResult.originalText;
//     }

//     shadowDom.getElementById("icon-edit").style.display = "block";
//     shadowDom.getElementById("icon-edit-done").style.display = "none";
// }
