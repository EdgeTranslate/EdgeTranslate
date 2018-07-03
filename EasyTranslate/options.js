window.onload = function () {
    const language_setting = "language_setting";

    // 获得用户之前选择的语言翻译选项。
    chrome.storage.sync.get(language_setting, function (result) {
        var source_language = document.getElementById("sl");
        var target_language = document.getElementById("tl");

        var default_language_setting = result[language_setting];

        console.log("default_language_setting: " + default_language_setting);

        languages.forEach(element => {
            console.log("ele_value: " + element.value);
            if (default_language_setting && element.value == default_language_setting.sl) {
                source_language.options.add(new Option(element.name, element.value, true, true));
            } else {
                source_language.options.add(new Option(element.name, element.value));
            }

            if (default_language_setting && element.value == default_language_setting.tl) {
                target_language.options.add(new Option(element.name, element.value, true, true));
            } else {
                target_language.options.add(new Option(element.name, element.value));
            }
        });

        source_language.onchange = function () {
            save_option(language_setting, {
                "sl": source_language.options[source_language.selectedIndex].value,
                "tl": target_language.options[target_language.selectedIndex].value
            });
        };

        target_language.onchange = function () {
            save_option(language_setting, {
                "sl": source_language.options[source_language.selectedIndex].value,
                "tl": target_language.options[target_language.selectedIndex].value
            });
        };
    });


};

function save_option(key, value) {
    var item = {};
    item[key] = value;
    chrome.storage.sync.set(item);
};