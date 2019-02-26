export { getDomain, contains }

/**
 * 提取给定的url的域名
 * 
 * @param {String} url 
 */
function getDomain(url) {
    var URL_PATTERN = /.+:\/\/([\w\.\-]+).*/;
    var groups = url.match(URL_PATTERN);
    return groups[1];
}

/**
 * 判断一个数组是否包含给定的元素
 * 
 * @param {Array} array 
 * @param {any} item 
 */
function contains(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return true;
        }
    }
    return false;
}