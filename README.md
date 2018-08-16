# Edge Translate

[![Version](https://img.shields.io/github/release/nickyc975/EdgeTranslate.svg?label=version)](https://github.com/nickyc975/EdgeTranslate/release)
[![Build Status](https://travis-ci.org/nickyc975/EdgeTranslate.svg?branch=master)](https://travis-ci.org/nickyc975/EdgeTranslate)
[![codebeat badge](https://codebeat.co/badges/7f28bc52-26ec-4dbc-815d-343220100c72)](https://codebeat.co/projects/github-com-nickyc975-edgetranslate-master)
[![License](https://img.shields.io/github/license/nickyc975/EdgeTranslate.svg?colorB=44cc11?maxAge=2592000)](https://github.com/nickyc975/EdgeTranslate/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnickyc975%2FEdgeTranslate.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnickyc975%2FEdgeTranslate?ref=badge_shield)

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
/ [GitHub Release](https://github.com/nickyc975/EdgeTranslate/releases)

## Build It By Yourself

To build the extension, you need to have [Node.js](https://nodejs.org/) installed.

Clone the repository:

    git clone https://github.com/nickyc975/EdgeTranslate.git

Install dependencies:

    npm install

Build Chrome version:

    npm run build:chrome

Build Firefox version:

    npm run build:firefox

After building finished, you will get the unpacked extension under    ./build/chrome/    and    ./build/firefox/    .

## Load Unpacked Extension In Your Browser

### Chrome

* Navigate to:    chrome://extensions    .

* Enable "Developer mode". It should be in the upper right corner of the page.

* Click "Load unpacked" in the upper left corner.

* Navigate to the repository you just cloned, select build/chrome.

* Now you can try this extension in Chrome.

### Firefox

* Navigate to:    about:debugging    .

* Check the "Enable add-on debugging" box if it's not checked.

* Click "Load Temporary Add-on".

* Navigate to the repository you just cloned, open build/firefox, select any file in this directory.

* Now you can try this extension in Firefox.

## More Information

[Wiki](https://github.com/nickyc975/EdgeTranslate/wiki)

## Contact Us

E-mails: [chenjinlong2016@outlook.com](mailto:chenjinlong2016@outlook.com), [f18846188605@gmail.com](mailto:f18846188605@gmail.com)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnickyc975%2FEdgeTranslate.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnickyc975%2FEdgeTranslate?ref=badge_large)