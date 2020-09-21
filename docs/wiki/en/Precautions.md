## Edge Translate Q & A

* __Q: Does this extension have xxx feature? / Why can't this extension do xxx?__

  __A:__ Here is a [list](./Introduction.md) of what the extension can do, check it out!

* __Q: I encountered problems when using the extension.__

  __A:__ Please send us ([nickyc975](mailto:chenjinlong2016@outlook.com), [Mark Fenng](mailto:f18846188605@gmail.com)) an email or submit an issue in our github repo.

* __Q: I have just installed/updated the extension and it doesn't work. What should I do?__

  __A:__ After installing or updating the extension, you must refresh the pages that needs to be translated, and then the translation functions can be available.

* __Q: The translate icon doesn't pop up even if there are some texts selected.__

  __A:__ You need to enable `Enable Select Translate` in the options and then refresh the tab;

* __Q: How to enable translating functions in pdf files?__

  __A:__ Firstly, you should grant the extension the permission to access file links. You can follow the instruction in __Figure 1__ to do this. After the permission granted, you must enable `Use Built-in PDF Viewer` in the options of this extension and then refresh the pdf file tabs to use translating functions in pdf files;

* __Q: The keeping popping up result frame is annoying!__

  __A:__ You can click the pin icon on the up right corner of the frame to fix it.

* __Q: Why can't I install the * .crx file I downloaded from the "Releases" page?__

  __A:__ If your error message is "``Apps, extensions, and user scripts can not be added from this site``", try the following steps:

  1. Open the url in Chrome: ``chrome://flags/#extensions-on-chrome-urls``.

  2. If "``Extensions on chrome:// URLs``" is off, turn this switch on and restart chrome.

  3. Open this url: ``chrome://extensions/``.

  4. Make sure that ``Developer Mode`` is on. If the switch is off, turn it on and refresh the page. 5.

  Now, you can try dragging and dropping the *.crx file onto this page again.

* __Q: Why has the translation box become floating? How can I get it to change back to right (left) side fixed?__

  __A:__ This is a new feature introduced in Edge Translate 2.0, which supports floating box display. When you move the mouse cursor to the blue area at the top of the translation box, you can drag the box by holding down the left mouse button.

  When the translation box is fixed to the side, dragging the translation box will make it floating.

  If you want to make it side-fixed again, __drag the translation box to the right (left) until the mouse cursor reaches the border__ to make it side-fixed again.

  See Figure 2 for demo (the gif file is large, wait a moment please).

* __Q: What if the translation box is out of the interface and I can't see the translation?__

  If the floating translation box is out of the page and can't be dragged back, you can try to change the page zoom to make it back to the page, specific operations are: hold down the Ctrl key and roll the mouse wheel at the same time to adjust the page zoom.

### Figure 1: Allow Edge Translate to access file links

![grant_access](../../images/grant_access.gif)

### Figure 2: Switch between floating mode and fixed mode

![floating_fixed_switch](../../images/floating_fixed_switch.gif)