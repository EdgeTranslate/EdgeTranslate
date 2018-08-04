document.addEventListener('mouseup', test);
function test() {
    var selection = window.getSelection();
    setTimeout(function () {
        if (selection.toString().trim()) {
            console.log('test');
        }
    }, 300);
}