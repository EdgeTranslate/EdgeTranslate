# 側邊翻譯

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.MIT)
[![License](https://img.shields.io/badge/License-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.NPL)

[![Version](https://img.shields.io/github/release/EdgeTranslate/EdgeTranslate.svg?label=version)](https://github.com/EdgeTranslate/EdgeTranslate/releases)
[![Build Status](https://travis-ci.org/EdgeTranslate/EdgeTranslate.svg?branch=master)](https://travis-ci.org/EdgeTranslate/EdgeTranslate)
[![codebeat badge](https://codebeat.co/badges/901b9567-d213-48cc-a4f3-200339c59705)](https://codebeat.co/projects/github-com-edgetranslate-edgetranslate-master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate?ref=badge_shield)

[![Chrome Web Store](https://badgen.net/chrome-web-store/users/bocbaocobfecmglnmeaeppambideimao?icon=chrome&color=green)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao?hl=zh-TW)
[![Chrome Web Store](https://badgen.net/chrome-web-store/stars/bocbaocobfecmglnmeaeppambideimao?icon=chrome&color=green)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao?hl=zh-TW)
[![Mozilla Add-on](https://badgen.net/amo/users/edge_translate?icon=firefox&color=green)](https://addons.mozilla.org/firefox/addon/edge_translate/)
[![Mozilla Add-on](https://badgen.net/amo/stars/edge_translate?icon=firefox&color=green)](https://addons.mozilla.org/firefox/addon/edge_translate/)

## 演示

![demo_zh_TW](./images/demo_zh_TW.gif)

## 下載

[Microsoft Edge擴展商店](https://microsoftedge.microsoft.com/addons/detail/bfdogplmndidlpjfhoijckpakkdjkkil)
/ [Chrome應用商店](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
/ [Firefox附加組件商店](https://addons.mozilla.org/firefox/addon/edge_translate/)
/ [QQ瀏覽器應用商店](https://appcenter.browser.qq.com/search/detail?key=edgetranslate&id=bocbaocobfecmglnmeaeppambideimao%20&title=edgetranslate)
/ [360瀏覽器應用商店](https://ext.se.360.cn/webstore/detail/jkhojcaggkaojlhfddocjkkphfdkejeg)

__注意：__ 火狐瀏覽器附加組件商店裏的版本已不再支持網頁翻譯，需要網頁翻譯的用戶請看[這裏](./wiki/zh_TW/致火狐用戶.md)。

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

Telegram 頻道: [側邊翻譯頻道](https://t.me/EdgeTranslate)

QQ 群: [側邊翻譯用戶交流群](https://jq.qq.com/?_wv=1027&k=gT5EYfFB)

加入頻道或群組可以在正式版本發佈前獲得測試包，提前體驗新特性。

## 開源協議

[MIT](../LICENSE.MIT) 與 [NPL](../LICENSE.NPL)

## 貢獻者

* [Yang, Bo](https://github.com/Atry)

* [ArielAxionL](https://github.com/axionl) 

* [ElectroLom](https://github.com/electrolom42)

* [knlyknly](https://github.com/knlyknly)

* [ykyuki](https://github.com/ykyuki)

* [Isildur46](https://github.com/Isildur46)

## 幫助本地化

如果你願意幫忙將側邊翻譯翻譯到其他語言，請閱讀下方的指引。

[本地化](./wiki/zh_TW/本地化.md)

## 支持我們

開發側邊翻譯花費了我們許多的時間和精力，如果你真的覺得這個項目對你有幫助，不妨請我們喝罐可樂，支持我們繼續做下去：[PayPal](https://paypal.me/EdgeTranslate)

當然，這 __純屬自願__，打賞并不會帶來什麽優待，不打賞也不會有影響，請量力而爲！
