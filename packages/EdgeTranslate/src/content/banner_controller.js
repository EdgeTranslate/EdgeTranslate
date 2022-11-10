import Channel from "common/scripts/channel.js";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "common/scripts/settings.js";

/**
 * Control the visibility of page translator banners.
 */
class BannerController {
    constructor() {
        // Communication channel.
        this.channel = new Channel();

        // Allowed translator: google.
        this.currentTranslator = null;

        // Message listener canceller.
        this.canceller = null;

        this.addListeners();
    }

    /**
     * Add event and message listeners.
     */
    addListeners() {
        this.channel.on(
            "start_page_translate",
            ((detail) => {
                switch (detail.translator) {
                    case "google": {
                        // Google page translator runs in website context, so we use window.postMessage
                        // for message passing.
                        this.currentTranslator = "google";
                        let handler = this.googleMessageHandler.bind(this);
                        window.addEventListener("message", handler);
                        this.canceller = (() => {
                            window.removeEventListener("message", handler);
                        }).bind(this);
                        break;
                    }
                    default:
                        break;
                }
            }).bind(this)
        );

        this.channel.on("command", (detail) => {
            switch (detail.command) {
                case "toggle_page_translate_banner":
                    this.toggleBanner();
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * Toggle the visibility of banner frame.
     *
     * @param {boolean} visible the visibility of banner frame.
     * @returns {void} nothing
     */
    toggleBannerFrame(visible) {
        switch (this.currentTranslator) {
            case "google": {
                let banner = document.getElementById(":0.container");
                if (banner !== null && banner !== undefined) {
                    banner.style.visibility = visible ? "visible" : "hidden";
                    return;
                }
                break;
            }
            default:
                break;
        }
    }

    /**
     * Move the page body.
     *
     * @param {String} property indicates which style property to use for moving. Google uses "top".
     *
     * @param {Number} distance the distance to move.
     * @param {boolean} absolute whether the distance is relative or absolute.
     */
    movePage(property, distance, absolute) {
        let orig = document.body.style.getPropertyValue(property);
        try {
            // The property has value originally.
            let orig_value = parseInt(orig, 10);
            document.body.style.cssText = document.body.style.cssText.replace(
                new RegExp(`${property}:.*;`, "g"),
                `${property}: ${absolute ? distance : orig_value + distance}px !important;`
            );
        } catch {
            // The property has no valid value originally, move absolutely.
            document.body.style.setProperty(property, `${distance}px`, "important");
        }
    }

    /**
     * Handle messages sent by Google page translator.
     *
     * @param {Object} msg the message content.
     * @returns {void} nothing
     */
    googleMessageHandler(msg) {
        let data = JSON.parse(msg.data);
        if (!data.type || data.type !== "edge_translate_page_translate_event") return;

        switch (data.event) {
            case "page_moved":
                // The "page_moved" event may be sent when the banner is created or destroyed.
                // If the distance property is positive, it means the banner is created, and
                // the page has been moved down. Else if it is negative, it means the banner is
                // destroyed, and the banner has been moved up.
                getOrSetDefaultSettings("HidePageTranslatorBanner", DEFAULT_SETTINGS).then(
                    (result) => {
                        if (result.HidePageTranslatorBanner) {
                            setTimeout(() => {
                                this.toggleBannerFrame(false);
                                // If user decide to hide the banner, we just keep the top
                                // of the page at 0px.
                                this.movePage("top", 0, true);
                            }, 0);
                        }
                    }
                );

                // If the banner is destroyed, we should cancel listeners.
                if (data.distance <= 0) {
                    this.canceller();
                    this.canceller = null;
                    this.currentTranslator = null;
                }
                break;
            default:
                break;
        }
    }

    /**
     * Toggle the visibility of the banner.
     *
     * @returns {void} nothing
     */
    toggleBanner() {
        if (!this.currentTranslator) return;

        getOrSetDefaultSettings("HidePageTranslatorBanner", DEFAULT_SETTINGS).then((result) => {
            result.HidePageTranslatorBanner = !result.HidePageTranslatorBanner;
            chrome.storage.sync.set(result);

            switch (this.currentTranslator) {
                case "google": {
                    if (result.HidePageTranslatorBanner) {
                        // Hide the banner.
                        this.toggleBannerFrame(false);
                        this.movePage("top", 0, true);
                    } else {
                        // Show the banner.
                        this.toggleBannerFrame(true);
                        this.movePage("top", 40, true);
                    }
                    break;
                }
                default:
                    break;
            }
        });
    }
}

// Create the object.
window.EdgeTranslateBannerController = new BannerController();
