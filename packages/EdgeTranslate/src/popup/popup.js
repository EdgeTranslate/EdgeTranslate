import { LANGUAGES } from "@edge_translate/translators";
import Channel from "common/scripts/channel.js";
import { i18nHTML } from "common/scripts/common.js";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "common/scripts/settings.js";

/**
 * Communication channel.
 */
const channel = new Channel();

// 获取下拉列表元素
let sourceLanguage = document.getElementById("sl");
let targetLanguage = document.getElementById("tl");
// 获取交换按钮
let exchangeButton = document.getElementById("exchange");
// 获取互译模式开关
let mutualTranslate = document.getElementById("mutual-translate");

/**
 * 初始化设置列表
 */
window.onload = function () {
    i18nHTML();

    let arrowUp = document.getElementById("arrow-up");
    let arrowDown = document.getElementById("arrow-down");
    arrowDown.setAttribute("title", chrome.i18n.getMessage("Unfold"));
    arrowUp.setAttribute("title", chrome.i18n.getMessage("Fold"));

    sourceLanguage.onchange = function () {
        // 如果源语言是自动判断语言类型(值是auto),则按钮显示灰色，避免用户点击,如果不是，则显示蓝色，可以点击
        judgeValue(exchangeButton, sourceLanguage);
        updateLanguageSetting(
            sourceLanguage.options[sourceLanguage.selectedIndex].value,
            targetLanguage.options[targetLanguage.selectedIndex].value
        );
        showSourceTarget(); // update source language and target language in input placeholder
    };

    targetLanguage.onchange = function () {
        updateLanguageSetting(
            sourceLanguage.options[sourceLanguage.selectedIndex].value,
            targetLanguage.options[targetLanguage.selectedIndex].value
        );
        showSourceTarget(); // update source language and target language in input placeholder
    };

    // 添加交换按钮对点击事件的监听
    exchangeButton.onclick = exchangeLanguage;

    // 添加互译模式开关的事件监听
    mutualTranslate.onchange = () => {
        getOrSetDefaultSettings("OtherSettings", DEFAULT_SETTINGS).then((result) => {
            let OtherSettings = result.OtherSettings;
            OtherSettings["MutualTranslate"] = mutualTranslate.checked;
            saveOption("OtherSettings", OtherSettings);
        });
        showSourceTarget();
    };

    // 获得用户之前选择的语言翻译选项和互译设置
    getOrSetDefaultSettings(["languageSetting", "OtherSettings"], DEFAULT_SETTINGS).then(
        (result) => {
            let OtherSettings = result.OtherSettings;
            let languageSetting = result.languageSetting;

            // 根据源语言设定更新
            if (languageSetting.sl === "auto") {
                mutualTranslate.disabled = true;
                mutualTranslate.parentElement.title = chrome.i18n.getMessage(
                    "MutualTranslationWarning"
                );
                if (OtherSettings["MutualTranslate"]) {
                    mutualTranslate.checked = false;
                    mutualTranslate.onchange();
                }
            } else {
                mutualTranslate.checked = OtherSettings["MutualTranslate"];
                mutualTranslate.parentElement.title = "";
            }

            // languages是可选的源语言和目标语言的列表
            for (let language in LANGUAGES) {
                let value = language;
                let name = chrome.i18n.getMessage(LANGUAGES[language]);

                if (languageSetting && value == languageSetting.sl) {
                    sourceLanguage.options.add(new Option(name, value, true, true));
                } else {
                    sourceLanguage.options.add(new Option(name, value));
                }

                if (languageSetting && value == languageSetting.tl) {
                    targetLanguage.options.add(new Option(name, value, true, true));
                } else {
                    targetLanguage.options.add(new Option(name, value));
                }
            }

            showSourceTarget(); // show source language and target language in input placeholder
        }
    );
    // 统一添加事件监听
    addEventListener();
};

/**
 * 监听展开语言设置的快捷键
 */
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case "change_language_setting":
            settingSwitch();
            break;
        case "exchange_source_target_lang":
            exchangeLanguage();
            break;
        case "change_mutual_translate":
            mutualTranslate.click();
            break;
        default:
            break;
    }
});

/**
 * 保存翻译语言设定
 *
 * @param {*} sourceLanguage 源语言
 * @param {*} targetLanguage 目标语言
 */
function updateLanguageSetting(sourceLanguage, targetLanguage) {
    // Update translator config.
    channel.emit("language_setting_update", {
        from: sourceLanguage,
        to: targetLanguage,
    });

    saveOption("languageSetting", { sl: sourceLanguage, tl: targetLanguage });
    if (sourceLanguage === "auto") {
        mutualTranslate.checked = false;
        mutualTranslate.disabled = true;
        mutualTranslate.parentElement.title = chrome.i18n.getMessage("MutualTranslationWarning");
        mutualTranslate.onchange();
    } else if (mutualTranslate.disabled) {
        mutualTranslate.disabled = false;
        mutualTranslate.parentElement.title = "";
    }
}

/**
 * 保存一条设置项
 *
 * @param {*} key 设置项名
 * @param {*} value 设置项
 */
function saveOption(key, value) {
    let item = {};
    item[key] = value;
    chrome.storage.sync.set(item);
}

/**
 * 需要对页面中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {
    document.getElementById("translateSubmit").addEventListener("click", translateSubmit);
    document.addEventListener("keypress", translatePreSubmit); // 对用户按下回车按键后的事件进行监听
    document.getElementById("setting-switch").addEventListener("click", settingSwitch);
    document.getElementById("google-page-translate").addEventListener("click", () => {
        channel.emit("translate_page_google", {});
    });
}

/**
 * block start
 * 事件监听的回调函数定义请在此区域中进
 */

/**
 * 负责在option页面中输入内容后进行翻译
 */
function translateSubmit() {
    let content = document.getElementById("translate_input").value;
    if (content.replace(/\s*/, "") !== "") {
        // 判断值是否为
        document.getElementById("hint_message").style.display = "none";

        // send message to background to translate content
        channel.request("translate", { text: content }).then(() => {
            setTimeout(() => {
                window.close(); // 展示结束后关闭option页面
            }, 0);
        });
    } // 提示输入的内容是
    else document.getElementById("hint_message").style.display = "inline";
}

/**
 *
 * 如果源语言是自动判断语言类型(值是auto),则按钮显示灰色，避免用户点击
 *
 * @param {*HTMLElement} exchangeButton 特定的一个element,是一个交换按钮图
 * @param {*HTMLElement} sourceLanguage 特定的一个element,源语言的选项
 */
function judgeValue(exchangeButton, sourceLanguage) {
    if (sourceLanguage.value === "auto") exchangeButton.style.color = "gray";
    else exchangeButton.style.color = "#4a8cf7";
}

/**
 * 交换源语言和目标语言
 */
function exchangeLanguage() {
    if (sourceLanguage.value !== "auto") {
        let tempValue = targetLanguage.value;
        targetLanguage.value = sourceLanguage.value;
        sourceLanguage.value = tempValue;
        updateLanguageSetting(sourceLanguage.value, targetLanguage.value);
        showSourceTarget(); // update source language and target language in input placeholder
    }
}

/**
 * 负责在option中隐藏或显示设置选项
 */
function settingSwitch() {
    let setting = document.getElementById("setting");
    let arrowUp = document.getElementById("arrow-up");
    let arrowDown = document.getElementById("arrow-down");
    if (!setting.style.display || setting.style.display == "none") {
        setting.style.display = "block";
        arrowDown.style.display = "none";
        arrowUp.style.display = "inline";
        document.getElementById("tl").focus(); // after show settings block, the language element <select> will be auto focused
        judgeValue(exchangeButton, sourceLanguage);
    } else {
        setting.style.display = "none";
        arrowDown.style.display = "inline";
        arrowUp.style.display = "none";
        document.getElementById("translate_input").focus(); // after settings block disappear, the translation element <input> will be auto focused
    }
}

/**
 * 判断如果按下的是按钮是enter键，就调用翻译的函数
 */
function translatePreSubmit(event) {
    let int_keycode = event.charCode || event.keyCode;
    if (int_keycode == "13") {
        translateSubmit();
    }
}

/**
 * show source language and target language hint in placeholder of input element
 */
function showSourceTarget() {
    let inputElement = document.getElementById("translate_input");
    let sourceLanguageString = sourceLanguage.options[sourceLanguage.selectedIndex].text;
    let targetLanguageString = targetLanguage.options[targetLanguage.selectedIndex].text;
    if (
        sourceLanguage.options[sourceLanguage.selectedIndex].value === "auto" ||
        !mutualTranslate.checked
    ) {
        inputElement.placeholder = `${sourceLanguageString} ==> ${targetLanguageString}`;
    } else {
        inputElement.placeholder = `${sourceLanguageString} <=> ${targetLanguageString}`;
    }
}

/**
 * end block
 */
