document.addEventListener('mouseup', showButton);
var translateButton = document.createElement('div');
var img = document.createElement('img');
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABqlBMVEUAAABQksElnfxHgsVYm9NMlvE0QnEzRKcxRa8wQ68uQaoqPKQqOo8rPZFGXttLeP4aM1Zgs/tZp+QMDypOmM5Hi/gyd9Y5ZahJm/oaLEoSEzQTIHgUIXsUH1kRFBQPGS1ChuY2e9k/aJgKQ7xOpv83fN5etv8xSXFIcIk3nf8vXIsweugyffMYHDVcgv9EYMk2WnxZof8xcOE7ddgUU+Jhsv8wWIwtptI2d+gpaMEqbdE2WIkzdOY8gtknSIk8YMJCZspDZ8c/Y75DaLc2WJs7d9Q3V5kHAAAzX9ExW4oujudLgN85eN49f+g5eeQ4eeM3d+A5euI8hegrW7o2a9A+Z6gGBx0radAuWYFco/8nRHFmwv9Xtv9TqP9DhvdHjPpeq/9muP9ktvpjtvlhtPtfsfxgsf9gr/hzwf9Rr/9EjftNkvpOmf9OnP9Om/9QnP9QlftDivtFkv9ft/9XpP9w0f9Wnf9ftP9vyP9pv/9osv9w0v9irf9MnP9cuv9lt/9Mlv9XqP9Qn/9PoP9QoP9Onf9dt/9Cg/U/kP9u1v9OoP9hvf9qzP8AAADAaXBVAAAAW3RSTlMAbyaqrvQmICEiIiIiIiIQG+eDFsf9iJH4GRIVFRUVFLF+iwS7eFpjUiNZkWNMAhGSn0X1AbCAEEzlnWlM8oiGiIeGhoPJjhFaUSmIiYiIiIeHhoLHcASnWp5xRWw5awAAAAFiS0dEAIgFHUgAAAAJcEhZcwASBa4AEgWuAWmKs1MAAADGSURBVBjTY2AAAkYmBhTAHI3KZ4lhZWPn4OTi5uHl42dgEBCMjYtPSExKTklNS88QYmAQFsnMEs3Oyc3Lyy8oLBIDaREvlpCUkpaRlZNXKFEEG6JUqgwxTaVMFUiqqTNoaEIEtMq1gaROhS6Eq6fPYGAIpI0qjSECJqZmDOZA2qLKEuogq2prEGVTY2tn7+Do5OziWlvn5s7A4FHf0NjU3NLc2tbS3tHpycDg5e3j6+cfEBgUHNLVHRqG7KnwnghUX0ZGAQkARdEoBO6NYQwAAAAASUVORK5CYII=';
translateButton.appendChild(img);
translateButton.id = 'translate-button';
document.documentElement.appendChild(translateButton);
translateButton.addEventListener('click', translateSubmit);
function showButton() {
    var selection = window.getSelection();
    setTimeout(function () {
        if (selection.toString().trim()) {
            var element = selection.getRangeAt(0).endContainer.parentElement;
            var position = element.getBoundingClientRect();
            translateButton.style.top = position.top + 20 + 'px';
            translateButton.style.left = position.left + 'px';
            translateButton.style.display = 'inline-block';
        }
    }, 300);
}
function translateSubmit() {
    translate(window.getSelection().toString(), function (result) {
        display(result);
    })
}
document.addEventListener('mousedown', dispearButton);
function dispearButton() {
    var selection = window.getSelection();
    setTimeout(function () {
        if (!selection.toString().trim()) {
            translateButton.style.display = 'none';
        }
    }, 100);
}
