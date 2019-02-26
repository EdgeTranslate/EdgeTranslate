import { getDomain, contains } from "./common.js"

export { 
    addUrlBlacklist, 
    addDomainBlacklist, 
    removeUrlBlacklist, 
    removeDomainBlacklist, 
    updateBLackListMenu
}

/**
 * 将当前页面的url添加到黑名单
 */
function addUrlBlacklist() {
    addBlacklist("urls", function () {
        disableItems([
            "add_url_blacklist",
            "add_domain_blacklist",
            "remove_domain_blacklist"
        ]);

        enableItems([
            "remove_url_blacklist"
        ]);
    });
}

/**
 * 将当前页面的url移出黑名单
 */
function removeUrlBlacklist() {
    removeBlacklist("urls", function () {
        disableItems([
            "remove_url_blacklist",
            "remove_domain_blacklist"
        ]);

        enableItems([
            "add_url_blacklist",
            "add_domain_blacklist"
        ]);
    });
}

/**
 * 将当前页面的域名添加到黑名单
 */
function addDomainBlacklist() {
    addBlacklist("domains", function () {
        disableItems([
            "add_url_blacklist",
            "add_domain_blacklist",
            "remove_url_blacklist"
        ]);

        enableItems([
            "remove_domain_blacklist"
        ]);
    });
}

/**
 * 将当前页面的域名移出黑名单
 */
function removeDomainBlacklist() {
    removeBlacklist("domains", function () {
        disableItems([
            "remove_url_blacklist",
            "remove_domain_blacklist"
        ]);

        enableItems([
            "add_url_blacklist",
            "add_domain_blacklist"
        ]);
    });
}

/**
 * 执行添加黑名单的相关操作
 * 
 * @param {String} field 决定将url拉黑还是将域名拉黑
 * @param {Function} callback 回调
 */
function addBlacklist(field, callback) {
    chrome.tabs.query({"active": true, "currentWindow": true}, function (tabs) {
        if (tabs && tabs[0]) {
            chrome.storage.sync.get("blacklist", function (blacklist) {
                var value = field === "urls" ? tabs[0].url : getDomain(tabs[0].url);
                blacklist.blacklist[field].push(value);
                chrome.storage.sync.set(blacklist, function () {
                    callback();
                });
            });
        }
    });
}

/**
 * 执行移出黑名单相关操作
 * 
 * @param {String} field 决定从域名黑名单中移出还是从url黑名单中移出
 * @param {Function} callback 回调
 */
function removeBlacklist(field, callback) {
    chrome.tabs.query({"active": true, "currentWindow": true}, function (tabs) {
        if (tabs && tabs[0]) {
            chrome.storage.sync.get("blacklist", function (blacklist) {
                var values = [];
                var value = field === "urls" ? tabs[0].url : getDomain(tabs[0].url);
                blacklist.blacklist[field].forEach(item => {
                    if (item !== value) {
                        values.push(item);
                    }
                });
                blacklist.blacklist[field] = values;
                chrome.storage.sync.set(blacklist, function () {
                    callback();
                });
            });
        }
    });
}

/**
 * 当用户切换到一个页面时，根据该页面是否已经在黑名单中展示不同的context menu项
 * 
 * @param {String} url 切换到的页面的url
 */
function updateBLackListMenu(url) {
    chrome.storage.sync.get("blacklist", function (result) {
        if (result.blacklist) {
            if (contains(result.blacklist.domains, getDomain(url))) {
                disableItems([
                    "add_url_blacklist",
                    "remove_url_blacklist",
                    "add_domain_blacklist"
                ]);

                enableItems([
                    "remove_domain_blacklist"
                ]);
            } else if (contains(result.blacklist.urls, url)) {
                disableItems([
                    "add_url_blacklist",
                    "add_domain_blacklist",
                    "remove_domain_blacklist"
                ]);

                enableItems([
                    "remove_url_blacklist"
                ]);
            } else {
                disableItems([
                    "remove_url_blacklist",
                    "remove_domain_blacklist"
                ]);

                enableItems([
                    "add_url_blacklist",
                    "add_domain_blacklist"
                ]);
            }
        } else {
            chrome.storage.sync.set({
                "blacklist": {
                    "urls": [],
                    "domains": []
                }
            });
        }
    });
}

/**
 * 启用指定的context menu项
 * 
 * @param {String} items 
 */
function enableItems(items) {
    items.forEach(item => {
        chrome.contextMenus.update(item, {
            "enabled": true,
            "visible": true
        }, function () {
            console.log("Chrome runtime error: " + chrome.runtime.lastError);
        });
    });
}

/**
 * 禁用指定的context menu项
 * 
 * @param {String} items 
 */
function disableItems(items) {
    items.forEach(item => {
        chrome.contextMenus.update(item, {
            "enabled": false,
            "visible": false
        }, function () {
            console.log("Chrome runtime error: " + chrome.runtime.lastError);
        });
    });
}
