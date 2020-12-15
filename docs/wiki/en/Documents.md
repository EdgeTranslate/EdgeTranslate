### Project Structure
```
+-- config
| +-- webpack.base.config.js
| +-- webpack.dev.config.js
| +-- webpack.prod.config.js
+-- src
| +-- contents
| | +-- pdf.js
| | +-- select.js
| +-- display
| | +-- display.js
| | +-- engine.js
| | +-- template.js
| +-- options
| +-- popup
| +-- background.js
| +-- translate.js
+-- static
| +-- _locales
| +-- icon
| +-- pdf
```
#### config

Store the three configuration files of the webpack,

+ `webpack.base.config.js` common configuration

+ `webpack.dev.config.js` development environment configuration

+ `webpack.prod.config.js` production environment configuration

#### contents

Contains two content scripts for the extension

+ pdf.js is used to automatically jump to the built-in pdf reader when the pdf files are read by the browser (introduced [pdf.js](https://github.com/mozilla/pdf.js))

+ select.js is used to implement select translation
  + logic diagram of select translation![diagram](../../images/selecting_translate_diagram.jpg)

#### display

Responsible for generating a sidebar in the current window to display translation results.
In this module, We used our own simple template rendering engine, which is responsible for rendering the structured data and static pages of the translation results to generate html content for display.

+ `engine.js` Simple rendering engine (render function).
+ `tempalte.js` Store template content.

+ `display.js` Use the `render()` function from `engine.js` to render the page in the sidebar. Responsible for generating the sidebar, popping up the sidebar and closing the sidebar.

#### options

Responsible for options page of the extension.

#### popup

Responsible for the popup page.
Includes the input box for querying words and options for source and target languages.

#### background.js

Responsible for initializing the default settings when the extension is installed and forwarding messages between the various parts of the extension during the runtime.

#### translate.js

Responsible for the main translation function

+ Send translation requests.

+ Process the received data and pack it up.

+ Pass the translation result object to the displaying module.

#### _locales
Responsible for the internationalization of the extension.

Chinese Simplified, Chinese Traditional and English are currently supported.

#### icon

Store icon files.

#### pdf

Store files of [pdf.js](https://github.com/mozilla/pdf.js). They will be introduced as static files during packaging.