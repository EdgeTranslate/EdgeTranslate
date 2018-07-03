/**
 * 初始化设置列表。
 */
window.onload = function () {
    // 获得用户之前选择的语言翻译选项。
    chrome.storage.sync.get({"language_setting": default_language_setting}, function (result) {
        language_setting = result.language_setting;

        // 获取下拉列表元素。
        var source_language = document.getElementById("sl");
        var target_language = document.getElementById("tl");

        // console.log("language_setting: " + language_setting);

        // languages是可选的源语言和目标语言的列表。
        languages.forEach(element => {
            // console.log("ele_value: " + element.value);
            if (language_setting && element.value == language_setting.sl) {
                source_language.options.add(new Option(element.name, element.value, true, true));
            } else {
                source_language.options.add(new Option(element.name, element.value));
            }

            if (language_setting && element.value == language_setting.tl) {
                target_language.options.add(new Option(element.name, element.value, true, true));
            } else {
                target_language.options.add(new Option(element.name, element.value));
            }
        });

        source_language.onchange = function () {
            update_language_setting(
                source_language.options[source_language.selectedIndex].value, 
                target_language.options[target_language.selectedIndex].value
            );
        };

        target_language.onchange = function () {
            update_language_setting(
                source_language.options[source_language.selectedIndex].value, 
                target_language.options[target_language.selectedIndex].value
            );
        };
    });
};

/**
 * 保存翻译语言设定。
 * 
 * @param {*} source_language 源语言
 * @param {*} target_language 目标语言
 */
function update_language_setting(source_language, target_language) {
    save_option("language_setting", {"sl": source_language, "tl": target_language});
}

/**
 * 保存一条设置项。
 * 
 * @param {*} key 设置项名
 * @param {*} value 设置项值
 */
function save_option(key, value) {
    var item = {};
    item[key] = value;
    chrome.storage.sync.set(item);
};