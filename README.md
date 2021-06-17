# Edge Translate

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.MIT)
[![License](https://img.shields.io/badge/License-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.NPL)

[![Version](https://img.shields.io/github/release/EdgeTranslate/EdgeTranslate.svg?label=version)](https://github.com/EdgeTranslate/EdgeTranslate/releases)
[![Build Status](https://travis-ci.org/EdgeTranslate/EdgeTranslate.svg?branch=develop)](https://travis-ci.org/EdgeTranslate/EdgeTranslate)
[![codebeat badge](https://codebeat.co/badges/93aa3e86-a3e7-449f-bda2-abdc34595ebb)](https://codebeat.co/projects/github-com-edgetranslate-edgetranslate-develop)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate?ref=badge_shield)

[![Chrome Web Store](https://badgen.net/chrome-web-store/users/bocbaocobfecmglnmeaeppambideimao?icon=chrome&color=green)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao?hl=en)
[![Chrome Web Store](https://badgen.net/chrome-web-store/stars/bocbaocobfecmglnmeaeppambideimao?icon=chrome&color=green)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao?hl=en)
[![Mozilla Add-on](https://badgen.net/amo/users/edge_translate?icon=firefox&color=green)](https://addons.mozilla.org/firefox/addon/edge_translate/)
[![Mozilla Add-on](https://badgen.net/amo/stars/edge_translate?icon=firefox&color=green)](https://addons.mozilla.org/firefox/addon/edge_translate/)

View this page in other languages:

* [简体中文](./docs/README_CN.md)

* [繁體中文](./docs/README_TW.md)

## Demo

![demo_en](./docs/images/demo_en.gif)

## Downloads

[Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/bfdogplmndidlpjfhoijckpakkdjkkil)
/ [Chrome Web Store](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
/ [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/edge_translate/)
/ [QQ Browser Web Store](https://appcenter.browser.qq.com/search/detail?key=edgetranslate&id=bocbaocobfecmglnmeaeppambideimao%20&title=edgetranslate)
/ [360 Browser Web Store](https://ext.se.360.cn/webstore/detail/jkhojcaggkaojlhfddocjkkphfdkejeg)

__Attention:__ The version in Firefox Add-ons does not support page translate anymore. If you need page translate, please refer to [here](./docs/wiki/en/ToFirefoxUsers.md).

## Manually Install

Firstly you need to download the extension package for your browser (Chrome and QQ Browser use the same package) from [GitHub Releases](https://github.com/EdgeTranslate/EdgeTranslate/releases).

It is always recommended to download the latest version.

### Chrome

* Extract the `.zip` package to somewhere on your disk.

* Navigate to: `chrome://extensions`.

* Enable `Developer mode`. It should be in the upper right corner of the page.

* Click `Load unpacked` in the upper left corner.

* Navigate to the directory of the extracted package.

### QQ Browser

* Extract the `.zip` package to somewhere on your disk.

* Navigate to: `qqbrowser://extensions/manage`.

* Enable `Developer mode`. It should be in the upper right corner of the page.

* Click `Load unpacked` in the upper left corner.

* Navigate to the directory of the extracted package.

### Firefox

* Installation will start automatically after the `.xapi` package is downloaded through Firefox browser.

### 360 Browser

* Right click on the package file and choose "Use 360 Browser to open", then it will be installed automatically.

## Build It By Yourself

To build the extension, you need to have [Node.js](https://nodejs.org/) installed.

Clone the repository:

```shell
git clone https://github.com/EdgeTranslate/EdgeTranslate.git
```

Install dependencies:

```shell
npm install
```

Build Chrome version:

```shell
npm run build:chrome
```

Build Firefox version:

```shell
npm run build:firefox
```

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

Telegram channel: [Edge Translate Channel](https://t.me/EdgeTranslate)

QQ group: [Edge Translate QQ Group](https://jq.qq.com/?_wv=1027&k=gT5EYfFB)

Join the channel or group to get Edge Translate beta packages before releases.

## License

[MIT](./LICENSE.MIT) AND [NPL](./LICENSE.NPL)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://nickyc975.github.io/"><img src="https://avatars.githubusercontent.com/u/25877145?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicky Chen</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=nickyc975" title="Code">💻</a> <a href="#data-nickyc975" title="Data">🔣</a> <a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=nickyc975" title="Documentation">📖</a> <a href="#ideas-nickyc975" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-nickyc975" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://blog.csdn.net/Clark_Fitz817"><img src="https://avatars.githubusercontent.com/u/27533910?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucky Feng</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=Mark-Fenng" title="Code">💻</a> <a href="#design-Mark-Fenng" title="Design">🎨</a> <a href="#mentoring-Mark-Fenng" title="Mentoring">🧑‍🏫</a> <a href="#ideas-Mark-Fenng" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-Mark-Fenng" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/sansroman"><img src="https://avatars.githubusercontent.com/u/17476682?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zia</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=sansroman" title="Code">💻</a> <a href="#design-sansroman" title="Design">🎨</a> <a href="#ideas-sansroman" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.yang-bo.com/"><img src="https://avatars.githubusercontent.com/u/601530?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yang, Bo</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=Atry" title="Code">💻</a> <a href="#ideas-Atry" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Isildur46"><img src="https://avatars.githubusercontent.com/u/19759799?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Isildur46</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=Isildur46" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://ykyuki.net/"><img src="https://avatars.githubusercontent.com/u/28839969?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ykyuki</b></sub></a><br /><a href="#translation-ykyuki" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/electrolom42"><img src="https://avatars.githubusercontent.com/u/25820887?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ElectroLom</b></sub></a><br /><a href="#translation-electrolom42" title="Translation">🌍</a></td>
    <td align="center"><a href="https://axionl.me/"><img src="https://avatars.githubusercontent.com/u/8396456?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ArielAxionL</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=axionl" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/vanja-san"><img src="https://avatars.githubusercontent.com/u/7201687?v=4?s=100" width="100px;" alt=""/><br /><sub><b>The_BadUser</b></sub></a><br /><a href="#translation-vanja-san" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/knlyknly"><img src="https://avatars.githubusercontent.com/u/1418612?v=4?s=100" width="100px;" alt=""/><br /><sub><b>knlyknly</b></sub></a><br /><a href="https://github.com/EdgeTranslate/EdgeTranslate/commits?author=knlyknly" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Help Localization

If you want to help localize Edge Translate, please read the following guide.

[Localization](./docs/wiki/en/Localization.md)

## Sponsor

It took us much time and energy to develop this project. If it truly helped you in some way, you could reward us with cans of Coke to support us to keep improving it: [PayPal](https://paypal.me/EdgeTranslate).

But, this is completely __voluntary__. Sponsoring won't bring any special treatment and you can still use Edge Translate freely without sponsoring. Do it according to your capability!
