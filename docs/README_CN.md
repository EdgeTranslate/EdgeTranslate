# 侧边翻译

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.MIT)
[![License](https://img.shields.io/badge/License-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/LICENSE.NPL)

[![Version](https://img.shields.io/github/release/EdgeTranslate/EdgeTranslate.svg?label=version)](https://github.com/EdgeTranslate/EdgeTranslate/releases)
[![Build Status](https://travis-ci.org/EdgeTranslate/EdgeTranslate.svg?branch=master)](https://travis-ci.org/EdgeTranslate/EdgeTranslate)
[![codebeat badge](https://codebeat.co/badges/901b9567-d213-48cc-a4f3-200339c59705)](https://codebeat.co/projects/github-com-edgetranslate-edgetranslate-master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEdgeTranslate%2FEdgeTranslate?ref=badge_shield)

[![Chrome Web Store](https://badgen.net/chrome-web-store/users/bocbaocobfecmglnmeaeppambideimao?icon=chrome&color=green)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao?hl=zh-CN)
[![Chrome Web Store](https://badgen.net/chrome-web-store/stars/bocbaocobfecmglnmeaeppambideimao?icon=chrome&color=green)](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao?hl=zh-CN)
[![Mozilla Add-on](https://badgen.net/amo/users/edge_translate?icon=firefox&color=green)](https://addons.mozilla.org/firefox/addon/edge_translate/)
[![Mozilla Add-on](https://badgen.net/amo/stars/edge_translate?icon=firefox&color=green)](https://addons.mozilla.org/firefox/addon/edge_translate/)

## 演示

![demo_zh_CN](./images/demo_zh_CN.gif)

## 下载
[Microsoft Edge扩展商店](https://microsoftedge.microsoft.com/addons/detail/bfdogplmndidlpjfhoijckpakkdjkkil)
/ [Chrome应用商店](https://chrome.google.com/webstore/detail/bocbaocobfecmglnmeaeppambideimao)
/ [Firefox附加组件商店](https://addons.mozilla.org/firefox/addon/edge_translate/)
/ [QQ浏览器应用商店](https://appcenter.browser.qq.com/search/detail?key=edgetranslate&id=bocbaocobfecmglnmeaeppambideimao%20&title=edgetranslate)
/ [360浏览器应用商店](https://ext.se.360.cn/webstore/detail/jkhojcaggkaojlhfddocjkkphfdkejeg)

__注意：__ 火狐浏览器附加组件商店里的版本已不再支持网页翻译，需要网页翻译的用户请看[这里](./wiki/zh_CN/致火狐用户.md)。

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

Telegram 频道: [侧边翻译频道](https://t.me/EdgeTranslate)

QQ 群: [侧边翻译用户交流群](https://jq.qq.com/?_wv=1027&k=gT5EYfFB)

加入频道或群组可以在正式版本发布前获得测试包，提前体验新特性。

## 开源协议

[MIT](../LICENSE.MIT) 与 [NPL](../LICENSE.NPL)

## 贡献者

* [Yang, Bo](https://github.com/Atry)

* [ArielAxionL](https://github.com/axionl) 

* [ElectroLom](https://github.com/electrolom42)

* [knlyknly](https://github.com/knlyknly)

* [ykyuki](https://github.com/ykyuki)

* [Isildur46](https://github.com/Isildur46)

## 帮助本地化

如果你愿意帮忙将侧边翻译翻译到其他语言，请阅读下方的指引。

[本地化](./wiki/zh_CN/本地化.md)

## 关于打赏

开发这个项目花费了我们许多的时间和精力，如果你真的觉得这个项目对你有帮助，不妨请我们喝罐可乐，支持我们继续做下去！

当然，这 __纯属自愿__，打赏并不能获得什么优待，不打赏也不会有任何影响，请量力而为！

|                                                                    微信                                                                     |                                                                    支付宝                                                                     |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/25877145/80864662-b6617c00-8cb6-11ea-915a-582ca046118c.png" height=200 alt="微信支付"/> | <img src="https://user-images.githubusercontent.com/25877145/80864685-ced19680-8cb6-11ea-94e5-f5ca8e4389b9.jpg" height=200 alt="支付宝支付"/> |
