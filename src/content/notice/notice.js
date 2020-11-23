/**
 * module: content
 * part: notice
 * function: do some i18n for notice.html
 */

import { i18nHTML } from "common/scripts/common.js";

window.onload = () => {
    i18nHTML();

    document.getElementById("permissionPage").addEventListener("click", () => {
        chrome.tabs.create({
            url: "chrome://extensions/?id=" + chrome.runtime.id
        });
    });
};
