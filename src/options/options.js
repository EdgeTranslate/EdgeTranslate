/**
 * 初始化设置列表
 */
window.onload = function() {
    var i18nElemwnts = document.getElementsByClassName("i18n");
    for (let i = 0; i < i18nElemwnts.length; i++) {
        // 跟随浏览器的语言设置显示内容
        i18nElemwnts[i].insertAdjacentText(
            "beforeEnd",
            chrome.i18n.getMessage(i18nElemwnts[i].getAttribute("data-i18n-name"))
        );
    }

    chrome.storage.sync.get(["DTSetting", "LayoutSettings", "OtherSettings"], function(result) {
        var DTSetting = result.DTSetting;
        var OtherSettings = result.OtherSettings;
        var LayoutSettings = result.LayoutSettings;

        // 存储翻译选项的选择元素
        var DTOptions = document.getElementsByClassName("dt-option");
        var OtherOptions = document.getElementsByClassName("other-option");
        var PopupPositions = document.getElementsByName("PopupPosition");

        // 首先将初始化的设置同步到页面
        for (let i = 0; i < DTOptions.length; i++) {
            DTOptions[i].checked = DTSetting.indexOf(DTOptions[i].value) !== -1;
        }

        for (let i = 0; i < OtherOptions.length; i++) {
            OtherOptions[i].checked = OtherSettings[OtherOptions[i].value];
        }

        for (let i = 0; i < PopupPositions.length; i++) {
            PopupPositions[i].checked = PopupPositions[i].value === LayoutSettings["PopupPosition"];
        }

        // 如果用户修改了选项，则添加事件监听,将修改的配置保存
        for (let i = 0; i < DTOptions.length; i++) {
            DTOptions[i].onchange = function() {
                // this 表示的当前的筛选框元素
                if (this.checked)
                    // 用户勾选了这一选项
                    DTSetting.push(this.value);
                // 用户取消勾选了这一选项
                else DTSetting.splice(DTSetting.indexOf(this.value), 1);
                // 同步修改后的设定
                saveOption("DTSetting", DTSetting);
            };
        }

        // 保存布局设定
        for (let i = 0; i < PopupPositions.length; i++) {
            PopupPositions[i].onchange = function() {
                if (this.checked) {
                    LayoutSettings["PopupPosition"] = this.value;
                    saveOption("LayoutSettings", LayoutSettings);
                }
            };
        }

        // 保存其他设置
        for (let i = 0; i < OtherOptions.length; i++) {
            OtherOptions[i].onchange = function() {
                OtherSettings[OtherOptions[i].value] = this.checked;
                saveOption("OtherSettings", OtherSettings);
            };
        }
    });

    // 统一添加事件监听
    addEventListener();
};

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
}

/**
 * 需要对页面中的元素添加事件监听时，请在此函数中添加
 */
function addEventListener() {}

/**
 * block start
 * 事件监听的回调函数定义请在此区域中进行
 */

/**
 * end block
 */
