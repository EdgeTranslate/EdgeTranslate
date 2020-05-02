# 侧边翻译

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

## 下载

[Chrome应用商店](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
/ [Firefox附加组件商店](https://addons.mozilla.org/firefox/addon/edge_translate/)
/ [QQ浏览器应用商店](https://appcenter.browser.qq.com/search/detail?key=edgetranslate&id=bocbaocobfecmglnmeaeppambideimao%20&title=edgetranslate)
/ [360浏览器应用商店](https://ext.se.360.cn/webstore/detail/aajldohlagodeegngemjjgmabejbejli)

## 手动安装

从 [GitHub Releases](https://github.com/EdgeTranslate/EdgeTranslate/releases) 下载浏览器对应的安装包 (Chrome与QQ浏览器使用相同的安装包) 。

建议下载最新版本。

### Chrome

* 将下载好的`.zip`安装包解压到本地；

* 在浏览器中访问： `chrome://extensions` ；

* 开启右上角的`开发者模式`；

* 点击左上角`加载已解压的扩展程序`；

* 找到刚才解压出来的文件夹，点确定；

### QQ浏览器

* 将下载好的`.zip`安装包解压到本地；

* 在浏览器中访问: `qqbrowser://extensions/manage`.

* 开启右上角的`开发者模式`；

* 点击左上角`加载已解压的扩展程序`；

* 找到刚才解压出来的文件夹，点确定；

### Firefox

* 使用Firefox下载`.xapi`文件，下载完成后会自动安装；

### 360浏览器

* 使用360浏览器打开安装包，即可自动安装。

## 构建扩展

构建本扩展需要安装[Node.js](https://nodejs.org/)。

克隆仓库：

```shell
git clone https://github.com/EdgeTranslate/EdgeTranslate.git
```

安装依赖：

```shell
npm install
```

构建Chrome扩展：

```shell
npm run build:chrome
```

构建Firefox扩展：

```shell
npm run build:firefox
```

构建完成之后在 `./build/chrome/` 和 `./build/firefox/` 文件夹下可分别找到已解压的Chrome扩展和Firefox扩展。

## 在浏览器中加载已解压的扩展

### Chrome

* 在浏览器中访问： `chrome://extensions` ；

* 开启右上角的`开发者模式`；

* 点击左上角`加载已解压的扩展程序`；

* 找到刚才克隆下来的仓库，打开 `build` 文件夹，选择其中的 `chrome` 文件夹；

* 现在你就可以在Chrome中体验本扩展了。

### Firefox

* 在浏览器中访问： `about:debugging` ；

* 选中该页面上的`启用附加组件调试`；

* 点击`临时载入附加组件`；

* 找到刚才克隆下来的仓库， 打开 `build/firefox` , 选择其中的任意一个文件；

* 现在你就可以在Firefox中体验本扩展了。

## 了解更多

[Wiki](./wiki/zh_CN/插件介绍.md)

## 联系我们

电子邮件: [nickyc975](mailto:chenjinlong2016@outlook.com), [Mark Fenng](mailto:f18846188605@gmail.com)

## 开源协议

[MIT](../LICENSE.MIT) 与 [NPL](../LICENSE.NPL)

## 贡献者

* [ArielAxionL](https://github.com/axionl) 

* [ElectroLom](https://github.com/electrolom42)

## 帮助本地化

如果你愿意帮忙将侧边翻译翻译到其他语言，请阅读下方的指引。

[本地化](./wiki/zh_CN/本地化.md)
