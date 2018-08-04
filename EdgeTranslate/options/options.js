/**
 * 初始化设置列表
 */
window.onload = function () {
    var i18nElemwnts = document.getElementsByClassName("i18n");
    var translate_input = document.getElementById('translate_input');
    translate_input.focus();
    for (let i = 0; i < i18nElemwnts.length; i++) {
        // 跟随浏览器的语言设置显示内容
        i18nElemwnts[i].insertAdjacentText("beforeEnd", chrome.i18n.getMessage(i18nElemwnts[i].getAttribute("data-i18n-name")));
    }

    // 获得用户之前选择的语言翻译选项
    chrome.storage.sync.get("languageSetting", function (result) {
        var languageSetting = result.languageSetting;

        // 获取下拉列表元素
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

        // languages是可选的源语言和目标语言的列表
        LANGUAGES.forEach(element => {
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

    chrome.storage.sync.get('DTSetting', function (result) {
        var DTSetting = result.DTSetting;

        // 存储翻译选项的选择元素
        var configCheckbox = [];

        //添加翻译选项的选择元素
        configCheckbox.push(document.getElementById('ex'));  // 显示例句选项
        configCheckbox.push(document.getElementById('ss'));  // 显示相关词选项
        configCheckbox.push(document.getElementById('md'));  // 显示定义选项
        configCheckbox.push(document.getElementById('rw'));  // 显示词组选项
        configCheckbox.push(document.getElementById('bd'));  // 显示所有含义选项
        configCheckbox.push(document.getElementById('at'));  // 显示常用意思选项

        // 首先将初始化的设置同步到页面
        for (let i = 0; i < configCheckbox.length; i++)
            configCheckbox[i].checked = DTSetting.indexOf(configCheckbox[i].value) !== -1;

        // 如果用户修改了选项，则添加事件监听,将修改的配置保存
        for (let i = 0; i < configCheckbox.length; i++)
            configCheckbox[i].onchange = function () {
                // this 表示的当前的筛选框元素
                if (this.checked) // 用户勾选了这一选项
                    DTSetting.push(this.value);
                else // 用户取消勾选了这一选项
                    DTSetting.splice(DTSetting.indexOf(this.value), 1);
                // 同步修改后的设定
                updateTranslateSetting(DTSetting);
            }
    })

    /**
     * 
     * 如果源语言是自动判断语言类型(值是auto),则按钮显示灰色，避免用户点击
     * 
     * @param {*HTMLElement} exchangeButton 特定的一个element,是一个交换按钮图
     * @param {*HTMLElement} sourceLanguage 特定的一个element,源语言的选项
     */
    var judgeValue = function (exchangeButton, sourceLanguage) {
        if (sourceLanguage.value === 'auto')
            exchangeButton.style.color = 'gray';
        else
            exchangeButton.style.color = '#4a8cf7';
    }

    // 统一添加事件监听
    addEventListener();
};

/**
 * 保存翻译语言设定
 * 
 * @param {*} sourceLanguage 源语言
 * @param {*} targetLanguage 目标语言
 */
function updateLanguageSetting(sourceLanguage, targetLanguage) {
    saveOption("languageSetting", { "sl": sourceLanguage, "tl": targetLanguage });
}

/**
 * 保存翻译选项设置(DTSetting)
 * 
 * @param {*object} DTSetting 需要同步的翻译选项设定
 */
function updateTranslateSetting(DTSetting) {
    saveOption("DTSetting", DTSetting);
}

/**
 * 保存一条设置项
 * 
 * @param {*} key 设置项名
 * @param {*} value 设置项
 */
function saveOption(key, value) {
    var item = {};
    item[key] = value;
    chrome.storage.sync.set(item);
};

/**
 * 需要对页面中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {
    document.getElementById('translateSubmit').addEventListener('click', translateSubmit);
    document.addEventListener('keypress', translatePreSubmit);  // 对用户按下回车按键后的事件进行监听
    document.getElementById('setting-switch').addEventListener('click', settingSwitch);
}

/**
 * block start
 * 事件监听的回调函数定义请在此区域中进
 */

/**
 * 负责在option页面中输入内容后进行翻译
 */
function translateSubmit() {
    var content = document.getElementById('translate_input').value;
    if (content.replace(/\s*/, '') !== '') { // 判断值是否为
        document.getElementById('hint_message').style.display = 'none';
        var result = translate(content, function (result) {
            showTranslate(result, function () {
                window.close(); // 展示结束后关闭option页面
            });
        });
    }
    else  // 提示输入的内容是
        document.getElementById('hint_message').style.display = 'inline';
}

/**
 * 负责在option中隐藏或显示设置选项
 */
function settingSwitch() {
    var setting = document.getElementById('setting');
    var arrowUp = document.getElementById('arrow-up');
    var arrowDown = document.getElementById('arrow-down');
    console.log(setting.style);
    if (!setting.style.display || setting.style.display == 'none') {
        setting.style.display = 'block';
        arrowDown.style.display = 'none';
        arrowUp.style.display = 'inline';
    }
    else {
        setting.style.display = 'none';
        arrowDown.style.display = 'inline';
        arrowUp.style.display = 'none';
    }
}

/**
 * 判断如果按下的是按钮是enter键，就调用翻译的函数
 */
function translatePreSubmit(event) {
    var int_keycode = event.charCode || event.keyCode;
    if (int_keycode == '13') {
        translateSubmit();
    }
}
/**
 * end block
 */