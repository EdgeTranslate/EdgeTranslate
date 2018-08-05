/**
 * 初始化设置列表
 */
window.onload = function () {
    var i18nElemwnts = document.getElementsByClassName("i18n");
    
    
    for (let i = 0; i < i18nElemwnts.length; i++) {
        // 跟随浏览器的语言设置显示内容
        i18nElemwnts[i].insertAdjacentText("beforeEnd", chrome.i18n.getMessage(i18nElemwnts[i].getAttribute("data-i18n-name")));
    }

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

    // 统一添加事件监听
    addEventListener();
};

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
}

/**
 * block start
 * 事件监听的回调函数定义请在此区域中进行
 */

/**
 * end block
 */