/**
 * 划词翻译功能的实现
 * 需要对页面的相关事件进行监听，根据用户设定来决定是否进行监听。
 */
chrome.storage.sync.get("OtherSettings", function (result) {
    var OtherSettings = result.OtherSettings;
    if (OtherSettings && OtherSettings["SelectTranslate"]) {
        document.addEventListener('mouseup', showButton);
        document.addEventListener('mousedown', dispearButton);
    }
});

/**
 * 当用户更改设定时添加或删除事件监听。
 */
chrome.storage.onChanged.addListener(function (changes, area) {
    if (area === "sync" && changes["OtherSettings"]) {
        if (changes["OtherSettings"].newValue["SelectTranslate"]) {
            document.addEventListener('mouseup', showButton);
            document.addEventListener('mousedown', dispearButton);
        } else {
            document.removeEventListener("mouseup", showButton);
            document.removeEventListener("mousedown", dispearButton);
        }
    }
});

/**
 * 创建翻译按钮的图标元素
 */
var translateButton = document.createElement('div');
var disable = true; // 用于实现点击完按钮后按钮消失的功能，用于在某些情况下禁止按钮的显示
var img = document.createElement('img');
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABqlBMVEUAAABQksElnfxHgsVYm9NMlvE0QnEzRKcxRa8wQ68uQaoqPKQqOo8rPZFGXttLeP4aM1Zgs/tZp+QMDypOmM5Hi/gyd9Y5ZahJm/oaLEoSEzQTIHgUIXsUH1kRFBQPGS1ChuY2e9k/aJgKQ7xOpv83fN5etv8xSXFIcIk3nf8vXIsweugyffMYHDVcgv9EYMk2WnxZof8xcOE7ddgUU+Jhsv8wWIwtptI2d+gpaMEqbdE2WIkzdOY8gtknSIk8YMJCZspDZ8c/Y75DaLc2WJs7d9Q3V5kHAAAzX9ExW4oujudLgN85eN49f+g5eeQ4eeM3d+A5euI8hegrW7o2a9A+Z6gGBx0radAuWYFco/8nRHFmwv9Xtv9TqP9DhvdHjPpeq/9muP9ktvpjtvlhtPtfsfxgsf9gr/hzwf9Rr/9EjftNkvpOmf9OnP9Om/9QnP9QlftDivtFkv9ft/9XpP9w0f9Wnf9ftP9vyP9pv/9osv9w0v9irf9MnP9cuv9lt/9Mlv9XqP9Qn/9PoP9QoP9Onf9dt/9Cg/U/kP9u1v9OoP9hvf9qzP8AAADAaXBVAAAAW3RSTlMAbyaqrvQmICEiIiIiIiIQG+eDFsf9iJH4GRIVFRUVFLF+iwS7eFpjUiNZkWNMAhGSn0X1AbCAEEzlnWlM8oiGiIeGhoPJjhFaUSmIiYiIiIeHhoLHcASnWp5xRWw5awAAAAFiS0dEAIgFHUgAAAAJcEhZcwASBa4AEgWuAWmKs1MAAADGSURBVBjTY2AAAkYmBhTAHI3KZ4lhZWPn4OTi5uHl42dgEBCMjYtPSExKTklNS88QYmAQFsnMEs3Oyc3Lyy8oLBIDaREvlpCUkpaRlZNXKFEEG6JUqgwxTaVMFUiqqTNoaEIEtMq1gaROhS6Eq6fPYGAIpI0qjSECJqZmDOZA2qLKEuogq2prEGVTY2tn7+Do5OziWlvn5s7A4FHf0NjU3NLc2tbS3tHpycDg5e3j6+cfEBgUHNLVHRqG7KnwnghUX0ZGAQkARdEoBO6NYQwAAAAASUVORK5CYII=';
translateButton.appendChild(img);
translateButton.id = 'translate-button'; // 此id对应于./display/display.css文件中的样式
document.documentElement.appendChild(translateButton);
translateButton.addEventListener('mousedown', translateSubmit);

/**
 * 当鼠标选中一段文字后，调用此函数，显示出翻译按钮
 */
function showButton(event) {
    if (disable) {
        var selection = window.getSelection();
        setTimeout(function () {
            if (selection.toString().trim()) { // 检查页面中是否有内容被选中
                // var element = selection.getRangeAt(0).getBoundingClientRect();
                // 翻译按钮的纵坐标位置：选中区域高度 + y方向滚动的高度 + 选中区域位置 + 细微高度调整
                // translateButton.style.top = element.height + document.documentElement.scrollTop + element.top + 3 + 'px';
                // 翻译按钮的横坐标位置：选中区域的宽度的一半(使翻译按钮居中) + x方向滚动的距离 + 选中区域的位置 - 按钮自身宽度的一半(使翻译按钮居中)
                // translateButton.style.left = element.width / 2 + document.documentElement.scrollLeft + element.left - 10 + 'px';
                
                // 翻译按钮的纵坐标位置: 鼠标停留位置 + y方向滚动的高度 + bias
                translateButton.style.top = event.y + document.documentElement.scrollTop - 40 + 'px';
                // 翻译按钮的横坐标位置: 鼠标停留位置 + x方向滚动的高度 + bias
                translateButton.style.left = event.x + document.documentElement.scrollLeft + 20 + 'px';
                // 使翻译按钮显示出来
                translateButton.style.display = 'inline-block';
            } else {
                translateButton.style.display = 'none'; // 使翻译按钮隐藏
            }
        }, 300);
    }
}

/**
 * 处理点击翻译按钮后的事件
 */
function translateSubmit() {
    disable = false; // 禁止按钮显示
    // 发送消息给后台进行翻译。
    chrome.runtime.sendMessage({
        "text": window.getSelection().toString()
    }, function (response) {
        translateButton.style.display = 'none';
    });
}

/**
 * 如果页面中没有鼠标选中的区域，调用此函数去掉翻译按钮
 */
function dispearButton() {
    var selection = window.getSelection();
    setTimeout(function () {
        if (!selection.toString().trim()) {
            translateButton.style.display = 'none';
            disable = true; // 回复按钮显示
        }
    }, 100);
    setTimeout(function () {
        if (!selection.toString().trim()) {
            translateButton.style.display = 'none';
            disable = true; // 回复按钮显示
        }
    }, 400);
}
