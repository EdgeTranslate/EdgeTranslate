### Localization

We developed this extension to help more people overcome language barriers. But there are too many languages in the world and we only speak English and Chinese. So far, our software only supports the following languages:

- English
  
- Simplified Chinese
  
- Traditional Chinese

- Russian(Thanks to [ElectroLom](https://github.com/electrolom42) and [Viktor](https://github.com/ViktorOn))

- Japanese(Thanks to [ykyuki](https://github.com/ykyuki))

If your native language is not in the list above, and you would like to add the support of your language, we would really appreciate it.

### How to add your local language support

1. Fork and clone this [project](https://github.com/EdgeTranslate/EdgeTranslate).

2. Add a folder named `localeCode` under this path: `static/_locales`, where `localeCode` is a code such as `en` for English and `ru` for Russian. You can find the code for most languages [here](https://github.com/EdgeTranslate/EdgeTranslate/blob/master/src/popup/languages.js).

3. Copy the file `static/_locales/en/messages.json` into the new `localeCode` folder.

4. Translate the content of `messages.json`

   For Example, in `AppName` label there are `"​message​"​: ​"​Edge Translate"` and `"​description​"​: ​"​App Name​"`. You'll need to translate the content `Edge Translate` and `App Name` into your language. By the way, the translation of language names, which start from label `Afrikaans`, is not necessary.

5. Commit your change and push it to your forked repository.

6. Create a new [pull request](https://github.com/EdgeTranslate/EdgeTranslate/pulls) to our repository. We would merge your pull request soon.

### More Info

Please refer to [Chrome Developer Docs](https://developer.chrome.com/extensions/i18n) for more information.
