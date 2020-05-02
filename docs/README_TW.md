# 側邊翻譯

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.MIT)
[![License](https://img.shields.io/badge/License-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.NPL)

[![Version](https://img.shields.io/github/release/EdgeTranslate/EdgeTranslate.svg?label=version)](https://github.com/EdgeTranslate/EdgeTranslate/releases)
[![Build Status](https://travis-ci.org/EdgeTranslate/EdgeTranslate.svg?branch=develop)](https://travis-ci.org/EdgeTranslate/EdgeTranslate)
[![codebeat badge](https://codebeat.co/badges/93aa3e86-a3e7-449f-bda2-abdc34595ebb)](https://codebeat.co/projects/github-com-edgetranslate-edgetranslate-develop)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate?ref=badge_shield)

[![Chrome users](https://img.shields.io/chrome-web-store/users/bocbaocobfecmglnmeaeppambideimao.svg?label=Chrome%20users)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
[![Chrome stars](https://img.shields.io/chrome-web-store/stars/bocbaocobfecmglnmeaeppambideimao.svg?label=Chrome%20stars)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
[![Firefox users](https://img.shields.io/amo/users/edge_translate.svg?label=Firefox%20users)](https://addons.mozilla.org/firefox/addon/edge_translate/)
[![Firefox stars](https://img.shields.io/amo/stars/edge_translate.svg?label=Firefox%20stars)](https://addons.mozilla.org/firefox/addon/edge_translate/)

## 下載

[Chrome應用商店](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
/ [Firefox附加組件商店](https://addons.mozilla.org/firefox/addon/edge_translate/)
/ [QQ瀏覽器應用商店](https://appcenter.browser.qq.com/search/detail?key=edgetranslate&id=bocbaocobfecmglnmeaeppambideimao%20&title=edgetranslate)
/ [360瀏覽器應用商店](https://ext.se.360.cn/webstore/detail/aajldohlagodeegngemjjgmabejbejli)

## 手動安裝

從 [GitHub Releases](https://github.com/EdgeTranslate/EdgeTranslate/releases) 下載瀏覽器對應的安裝包 (Chrome與QQ瀏覽器使用相同的安裝包) 。

建議下載最新版本。

### Chrome

* 將下載好的`.zip`安裝包解壓到本地；

* 在瀏覽器中訪問： `chrome://extensions` ；

* 開啓右上角的`開發者模式`；

* 點擊右上角的`加載已解壓的擴展程序`；

* 打開剛纔解壓得到的文件夾，點確定；

### QQ瀏覽器

* 將下載好的`.zip`安裝包解壓到本地；

* 在瀏覽器中訪問: `qqbrowser://extensions/manage`.

* 開啓右上角的`開發者模式`；

* 點擊右上角的`加載已解壓的擴展程序`；

* 打開剛纔解壓得到的文件夾，點確定；

### Firefox

* 使用Firefox下載`.xapi`文件，下載完成後會自動安裝；

### 360瀏覽器

* 使用360瀏覽器打開安裝包，即可自動安裝；

## 構建擴展

構建本擴展需要安裝[Node.js](https://nodejs.org/)。

克隆倉庫：

```shell
git clone https://github.com/EdgeTranslate/EdgeTranslate.git
```

安裝依賴：

```shell
npm install
```

構建Chrome擴展：

```shell
npm run build:chrome
```

構建Firefox擴展：

```shell
npm run build:firefox
```

構建完成之後在 `./build/chrome/` 和 `./build/firefox/` 文件夾下可分別找到Chrome擴展和Firefox擴展。

## 在瀏覽器中加載已解壓的擴展

### Chrome

* 在瀏覽器中訪問： `chrome://extensions` ；

* 開啓右上角的`開發者模式`；

* 點擊左上角的`加載已解壓的擴展程序`；

* 找到剛才克隆下來的倉庫，打開 `build` 文件夾，選擇其中的 `chrome` 文件夾；

* 現在你就可以在Chrome中體驗本擴展了。

### Firefox

* 在瀏覽器中訪問： `about:debugging` ；

* 選中該頁面上的`啓用附加組件調試`；

* 點擊`臨時載入附加組件`；

* 找到剛才克隆下來的倉庫，打開 `build/firefox` , 選擇其中的任意一個文件；

* 現在你就可以在Firefox中體驗本擴展了。

## 瞭解更多

[Wiki](./wiki/zh_TW/插件介紹.md)

## 聯係我們

電子郵件: [nickyc975](mailto:chenjinlong2016@outlook.com), [Mark Fenng](mailto:f18846188605@gmail.com)

## 開源協議

[MIT](../LICENSE.MIT) 與 [NPL](../LICENSE.NPL)

## 貢獻者

* [ArielAxionL](https://github.com/axionl) 

* [ElectroLom](https://github.com/electrolom42)

## 幫助本地化

如果你願意幫忙將側邊翻譯翻譯到其他語言，請閱讀下方的指引。

[本地化](./wiki/zh_TW/本地化.md)
