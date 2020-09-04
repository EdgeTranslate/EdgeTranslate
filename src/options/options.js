import TRANSLATOR from "../background/library/translators/proxy.js";

/**
 * 初始化设置列表
 */
window.onload = () => {
    var i18nElements = document.getElementsByClassName("i18n");
    for (let i = 0; i < i18nElements.length; i++) {
        // Default "beforeEnd".
        let pos = "beforeEnd";
        if (i18nElements[i].hasAttribute("data-insert-pos")) {
            pos = i18nElements[i].getAttribute("data-insert-pos");
        }

        // 跟随浏览器的语言设置显示内容
        i18nElements[i].insertAdjacentText(
            pos,
            chrome.i18n.getMessage(i18nElements[i].getAttribute("data-i18n-name"))
        );
    }

    // 设置不同语言的隐私政策链接
    var PrivacyPolicyLink = document.getElementById("PrivacyPolicyLink");
    PrivacyPolicyLink.setAttribute("href", chrome.i18n.getMessage("PrivacyPolicyLink"));

    /**
     * Set up hybrid translate config.
     */
    setUpTranslateConfig();

    /**
     * initiate and update settings
     * attribute "setting-type": indicate the setting type of one option
     * attribute "setting-path": indicate the nested setting path. used to locate the path of one setting item in chrome storage
     */
    chrome.storage.sync.get(result => {
        var inputElements = document.getElementsByTagName("input");
        for (let element of inputElements) {
            var settingItemPath = element.getAttribute("setting-path").split(/\s/g);
            var settingItemValue = getSetting(result, settingItemPath);

            switch (element.getAttribute("setting-type")) {
                case "checkbox":
                    element.checked = settingItemValue.indexOf(element.value) !== -1;
                    // update setting value
                    element.onchange = event => {
                        let target = event.target;
                        var settingItemPath = target.getAttribute("setting-path").split(/\s/g);
                        var settingItemValue = getSetting(result, settingItemPath);

                        // if user checked this option, add value to setting array
                        if (target.checked) settingItemValue.push(target.value);
                        // if user unchecked this option, delete value from setting array
                        else settingItemValue.splice(settingItemValue.indexOf(target.value), 1);
                        saveOption(result, settingItemPath, settingItemValue);
                    };
                    break;
                case "radio":
                    element.checked = settingItemValue === element.value;
                    // update setting value
                    element.onchange = event => {
                        let target = event.target;
                        var settingItemPath = target.getAttribute("setting-path").split(/\s/g);
                        if (target.checked) {
                            saveOption(result, settingItemPath, target.value);
                        }
                    };
                    break;
                case "switch":
                    element.checked = settingItemValue;
                    // update setting value
                    element.onchange = event => {
                        var settingItemPath = event.target
                            .getAttribute("setting-path")
                            .split(/\s/g);
                        saveOption(result, settingItemPath, event.target.checked);
                    };
                    break;
                default:
                    break;
            }
        }
    });
};

/**
 * Set up hybrid translate config.
 */
function setUpTranslateConfig() {
    chrome.storage.sync.get(["languageSetting", "TranslatorConfig"], result => {
        let config = result.TranslatorConfig;
        let languageSetting = result.languageSetting;
        let availableTranslators = TRANSLATOR.getAvailableTranslatorsFor(
            languageSetting.sl,
            languageSetting.tl
        );
        let translatorConfigEles = document.getElementsByClassName("translator-config");

        for (let ele of translatorConfigEles) {
            // data-affected indicates items affected by this element in config.selections, they always have the same value.
            let affected = ele.getAttribute("data-affected").split(/\s/g);
            let selected = config.selections[affected[0]];
            for (let translator of availableTranslators) {
                if (translator === selected) {
                    ele.options.add(
                        new Option(chrome.i18n.getMessage(translator), translator, true, true)
                    );
                } else {
                    ele.options.add(new Option(chrome.i18n.getMessage(translator), translator));
                }
            }

            ele.onchange = () => {
                let value = ele.options[ele.selectedIndex].value;
                // Update every affected item.
                for (let item of affected) {
                    result.TranslatorConfig.selections[item] = value;
                }

                // Get the new selected translator set.
                let translators = new Set();
                result.TranslatorConfig.translators = [];
                for (let item in result.TranslatorConfig.selections) {
                    let translator = result.TranslatorConfig.selections[item];
                    if (!translators.has(translator)) {
                        result.TranslatorConfig.translators.push(translator);
                        translators.add(translator);
                    }
                }

                chrome.storage.sync.set(result);
            };
        }
    });
}

/**
 *
 * get setting value according to path of setting item
 *
 * @param {Object} localSettings setting object stored in local
 * @param {Array} settingItemPath path of the setting item
 * @returns {*} setting value
 */
function getSetting(localSettings, settingItemPath) {
    var result = localSettings;
    settingItemPath.forEach(key => {
        result = result[key];
    });
    return result;
}

/**
 * 保存一条设置项
 *
 * @param {Object} localSettings  本地存储的设置项
 * @param {Array} settingItemPath 设置项的层级路径
 * @param {*} value 设置项的值
 */
function saveOption(localSettings, settingItemPath, value) {
    // update local settings
    var pointer = localSettings; // point to children of local setting or itself

    // point to the leaf item recursively
    for (let i = 0; i < settingItemPath.length - 1; i++) {
        pointer = pointer[settingItemPath[i]];
    }
    // update the setting leaf value
    pointer[settingItemPath[settingItemPath.length - 1]] = value;

    var result = {};
    result[settingItemPath[0]] = localSettings[settingItemPath[0]];
    chrome.storage.sync.set(result);
}
