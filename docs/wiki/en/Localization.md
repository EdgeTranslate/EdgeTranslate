### Localization
We developed this extension to help more people  overcome language barriers. But there are too many languages in the world and we only speak English and Chinese. So far, our software only supports the following languages:

- English
- Simplified Chinese
- Traditional Chinese
- Russian(Thanks to [ElectroLom](https://github.com/electrolom42))

If your native language is not in the list above, and you would like to add the support of your language, we would really appreciate it.

### how to add your local language support

1. Fork and clone this [project](https://github.com/EdgeTranslate/EdgeTranslate).
2. Add a folder named localeCode under this path: `static/_locales`, where `localeCode` is a code such as en for English.
3. Copy the file `static/_locales/en/messages.json` to the new localeCode folder.
4. Change the content of `messages.json`
    For Example:
    > "​message​"​: ​"​Fix the result frame​"​,
    "​description​"​: ​"​Fix the translating result frame.​"

    You need to translate "​Fix the result frame" and ”​Fix the translating result frame“ to your language version.

    By the way, the translation of language names , like French, is not necessary.

5. Commit your change and push it to your fork repository
6. Create a new [pull request](https://github.com/EdgeTranslate/EdgeTranslate/pulls) to our repository. We would merge your pull request soon.