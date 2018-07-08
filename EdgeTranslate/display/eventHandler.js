/**
 * 将侧边栏元素从页面中除去，即将frame从document中删除
 */
var removeSlider = function () {
    document.documentElement.removeChild(frame);
    document.body.style.width = '100%';
    document.documentElement.removeEventListener('click', clickListener);
}