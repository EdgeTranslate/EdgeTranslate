/**
 * 初始化设置列表。
 */
window.onload = function () {
    // 获得用户之前选择的语言翻译选项。
    chrome.storage.sync.get("languageSetting", function (result) {
        var languageSetting = result.languageSetting;

        // 获取下拉列表元素。
        var sourceLanguage = document.getElementById("sl");
        var targetLanguage = document.getElementById("tl");

        // console.log("languageSetting: " + languageSetting);

        // languages是可选的源语言和目标语言的列表。
        LANGUAGES.forEach(element => {
            // console.log("ele_value: " + element.value);
            if (languageSetting && element.value == languageSetting.sl) {
                sourceLanguage.options.add(new Option(element.name, element.value, true, true));
            } else {
                sourceLanguage.options.add(new Option(element.name, element.value));
            }

            if (languageSetting && element.value == languageSetting.tl) {
                targetLanguage.options.add(new Option(element.name, element.value, true, true));
            } else {
                targetLanguage.options.add(new Option(element.name, element.value));
            }
        });

        sourceLanguage.onchange = function () {
            updateLanguageSetting(
                sourceLanguage.options[sourceLanguage.selectedIndex].value, 
                targetLanguage.options[targetLanguage.selectedIndex].value
            );
        };

        targetLanguage.onchange = function () {
            updateLanguageSetting(
                sourceLanguage.options[sourceLanguage.selectedIndex].value, 
                targetLanguage.options[targetLanguage.selectedIndex].value
            );
        };
    });
};

/**
 * 保存翻译语言设定。
 * 
 * @param {*} sourceLanguage 源语言
 * @param {*} targetLanguage 目标语言
 */
function updateLanguageSetting(sourceLanguage, targetLanguage) {
    saveOption("languageSetting", {"sl": sourceLanguage, "tl": targetLanguage});
}

/**
 * 保存一条设置项。
 * 
 * @param {*} key 设置项名
 * @param {*} value 设置项值
 */
function saveOption(key, value) {
    var item = {};
    item[key] = value;
    chrome.storage.sync.set(item);
};