# Edge Translate

[![Version](https://img.shields.io/github/release/EdgeTranslate/EdgeTranslate.svg?label=version)](https://github.com/EdgeTranslate/EdgeTranslate/releases)
[![Build Status](https://travis-ci.org/EdgeTranslate/EdgeTranslate.svg?branch=master)](https://travis-ci.org/EdgeTranslate/EdgeTranslate)
[![codebeat badge](https://codebeat.co/badges/901b9567-d213-48cc-a4f3-200339c59705)](https://codebeat.co/projects/github-com-edgetranslate-edgetranslate-master)
[![License](https://img.shields.io/github/license/EdgeTranslate/EdgeTranslate.svg?colorB=44cc11?maxAge=2592000)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate?ref=badge_shield)

[![Chrome users](https://img.shields.io/chrome-web-store/users/bocbaocobfecmglnmeaeppambideimao.svg?label=Chrome%20users)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
[![Chrome stars](https://img.shields.io/chrome-web-store/stars/bocbaocobfecmglnmeaeppambideimao.svg?label=Chrome%20stars)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
[![Firefox users](https://img.shields.io/amo/users/edge_translate.svg?label=Firefox%20users)](https://addons.mozilla.org/firefox/addon/edge_translate/)
[![Firefox stars](https://img.shields.io/amo/stars/edge_translate.svg?label=Firefox%20stars)](https://addons.mozilla.org/firefox/addon/edge_translate/)

View this page in other languages:

* [简体中文](./docs/README_CN.md)

* [繁體中文](./docs/README_TW.md)

## Downloads

[Chrome Web Store](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
/ [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/edge_translate/)
/ [QQBrowser Web Store](https://appcenter.browser.qq.com/search/detail?key=edgetranslate&id=bocbaocobfecmglnmeaeppambideimao%20&title=edgetranslate)
/ [360Browser Web Store](https://ext.se.360.cn/webstore/detail/aajldohlagodeegngemjjgmabejbejli)

## Manually Install

Download installation package from [GitHub Release](https://github.com/EdgeTranslate/EdgeTranslate/releases)

Recommend you to download the latest version corresponding to your browser type (Chrome and QQBrowser use the same package).

### Chrome

* Navigate to: `chrome://extensions`.

* Enable `Developer mode`. It should be in the upper right corner of the page.

* Drag the Installation package into the page.

### QQBrowser

* Navigate to: `qqbrowser://extensions/manage`.

* Enable `Developer mode`. It should be in the upper right corner of the page.

* Drag the Installation package into the page.

### Firefox

* Install automatically when the package is ready.

### 360Browser

* Use 360Browser to open the installation package, then it will be installed automatically


## Build It By Yourself

To build the extension, you need to have [Node.js](https://nodejs.org/) installed.

Clone the repository:

    git clone https://github.com/EdgeTranslate/EdgeTranslate.git

Install dependencies:

    npm install

Build Chrome version:

    npm run build:chrome

Build Firefox version:

    npm run build:firefox

After building finished, you will get the unpacked extension under `./build/chrome/` and `./build/firefox/`.

## Load Unpacked Extension In Your Browser

### Chrome

* Navigate to: `chrome://extensions`.

* Enable `Developer mode`. It should be in the upper right corner of the page.

* Click `Load unpacked` in the upper left corner.

* Navigate to the repository you just cloned, select `build/chrome`.

* Now you can try this extension in Chrome.

### Firefox

* Navigate to: `about:debugging`.

* Check the `Enable add-on debugging` box if it's not checked.

* Click `Load Temporary Add-on`.

* Navigate to the repository you just cloned, open `build/firefox`, select any file in this directory.

* Now you can try this extension in Firefox.

## More Information

[Wiki](./docs/wiki/en/Introduction.md)

## Contact Us

E-mails: [nickyc975](mailto:chenjinlong2016@outlook.com), [Mark Fenng](mailto:f18846188605@gmail.com)

## License

[MIT](./LICENSE)