## Hello Firefox users

I am one of the developers of Edge Translate. I am mainly responsible for the management of Edge Translate on the Firefox browser.

First of all, thank you for your love of Edge Translate. Thanks to your support, Edge Translate can reach today. Thank you very much!

But I'm sorry to inform you that we have to delete web translation related functions in Edge Translate on Firefox browser (the versions on other platforms are not affected). We feel pity about this, but we have no choice.

In simple terms, in order to implement the web page translation function, we need to use Google's web page translation components, but these components are private and we cannot obtain their source code. Now, Firefox requires us to provide the source code for all third-party components we use, otherwise our extensions will be removed from the store. The reviewers suggested that we may look for open source implementations, but we couldn't find any, so we have to delete this feature to pass the review.

This extension is a work we have developed in our free time, which has accumulated a lot of our hard work. Being forced to delete this hard-implemented function making us very sad, plus many problems of Firefox itself (such as not supporting the use of extension built-in pdf reader, which caused the pdf wording function of Edge Translate to be invalid; not supporting adding buttons to notifications, which caused us to spend extra time for compatibility, etc.) bringing additional development costs to us, we may not add new features to Edge Translate on Firefox. We strongly recommend that users who like Edge Translate try to use Chromium-based browsers, such as Chrome, the new version of Edge, or the open source Chromium.

If you really need web translation function, you may consider the following two options:

1. If it's possible, we will provide packages with beta signature which can be downloaded and installed directly. The steps are:

    1. Go to [Releases](https://github.com/EdgeTranslate/EdgeTranslate/releases/latest).

    2. If you find a package with its name like `EdgeTranslate_vx.x.x.x_firefox.xpi` (**4** version numbers) in the download options at the bottom of the page, just download and install it.

    3. If you cannot find any package like that, it means we cannot provide that kind of packages. You'll need to follow next option.

2. Manually download and install the unsigned complete version, following these steps:

    1. Download and install the [ESR Version](//www.mozilla.org/firefox/organizations/), [Developer Version](//www.mozilla.org/firefox/developer/) or [Nightly Version](//nightly.mozilla.org/) of Firefox. You can choose any of them, but the recommended priority is ESR > Developer > Nightly.

    2. Download the latest version with page translate of Edge Translate for Firefox from [Releases](https://github.com/EdgeTranslate/EdgeTranslate/releases/latest), the package name format is `EdgeTranslate_vx.x.x_firefox.zip`

    3. Open Firefox configuration editor (Navigate to `about:config`), Search `xpinstall.signatures.required` and switch the value to `false` (Click the bi-direction arrow at the end to switch).

    4. Open Firefox Add-on management page (Navigate to `about:addons`). Click setting menu on the up right corner. Select `Install Add-on From File...` and choose downloaded Edge Translate package.

Thank you for your continued support!
