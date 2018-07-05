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
        // 获取交换按钮
        var exchangeButton = document.getElementById("exchange");

        // 添加交换按钮对点击事件的监听
        exchangeButton.onclick = function () {
            if (sourceLanguage.value !== 'auto') {
                let tempValue = targetLanguage.value;
                targetLanguage.value = sourceLanguage.value;
                sourceLanguage.value = tempValue;
                updateLanguageSetting(sourceLanguage.value, targetLanguage.value);
            }
        }

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

        // 如何源语言是自动判断语言类型(值是auto),则按钮显示灰色，避免用户点击
        judgeValue(exchangeButton, sourceLanguage);

        sourceLanguage.onchange = function () {
            // 如何源语言是自动判断语言类型(值是auto),则按钮显示灰色，避免用户点击,如果不是，则显示蓝色，可以点击
            judgeValue(exchangeButton, sourceLanguage);
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

    /**
     * 
     * 如果源语言是自动判断语言类型(值是auto),则按钮显示灰色，避免用户点击
     * 
     * @param {*HTMLElement} exchangeButton 特定的一个element,是一个交换按钮图标
     * @param {*HTMLElement} sourceLanguage 特定的一个element,源语言的选项框
     */
    var judgeValue = function (exchangeButton, sourceLanguage) {
        if (sourceLanguage.value === 'auto')
            exchangeButton.style.color = 'gray';
        else
            exchangeButton.style.color = '#4a8cf7';
    }
};

/**
 * 保存翻译语言设定。
 * 
 * @param {*} sourceLanguage 源语言
 * @param {*} targetLanguage 目标语言
 */
function updateLanguageSetting(sourceLanguage, targetLanguage) {
    saveOption("languageSetting", { "sl": sourceLanguage, "tl": targetLanguage });
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