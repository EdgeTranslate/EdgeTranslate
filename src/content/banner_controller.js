import Channel from "common/scripts/channel.js";

class BannerController {
    constructor() {
        // Communication channel.
        this.channel = new Channel();

        // Allowed translator: youdao, google.
        this.currentTranslator = null;

        this.canceller = null;

        this.channel.on(
            "start_page_translate",
            ((detail) => {
                switch (detail.translator) {
                    case "google": {
                        this.currentTranslator = "google";
                        let handler = this.googleMessageHandler.bind(this);
                        window.addEventListener("message", handler);
                        this.canceller = (() => {
                            window.removeEventListener("message", handler);
                        }).bind(this);
                        break;
                    }
                    case "youdao":
                        this.currentTranslator = "youdao";
                        this.canceller = this.channel.on(
                            "page_translate_event",
                            this.youdaoMessageHandler.bind(this)
                        );
                        break;
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
            case "youdao": {
                let banner = document.getElementById("OUTFOX_BAR_WRAPPER");
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

    movePage(property, distance, absolute) {
        let orig = document.body.style.getPropertyValue(property);
        try {
            let orig_value = parseInt(orig, 10);
            document.body.style.cssText = document.body.style.cssText.replace(
                new RegExp(`${property}:.*;`, "g"),
                `${property}: ${absolute ? distance : orig_value + distance}px !important;`
            );
        } catch {
            document.body.style.setProperty(property, `${distance}px`, "important");
        }
    }

    googleMessageHandler(msg) {
        let data = JSON.parse(msg.data);
        if (!data.type || data.type !== "edge_translate_page_translate_event") return;

        switch (data.event) {
            case "page_moved":
                chrome.storage.sync.get("HidePageTranslatorBanner", (result) => {
                    if (result.HidePageTranslatorBanner) {
                        this.toggleBannerFrame(false);
                        this.movePage("top", 0, true);
                    }
                });

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

    youdaoMessageHandler(detail) {
        switch (detail.event) {
            case "page_moved":
                chrome.storage.sync.get("HidePageTranslatorBanner", (result) => {
                    if (result.HidePageTranslatorBanner) {
                        this.toggleBannerFrame(false);
                        this.movePage("margin-top", -detail.distance, false);
                    }
                });

                if (detail.distance <= 0) {
                    this.canceller();
                    this.canceller = null;
                    this.currentTranslator = null;
                }
                break;
            default:
                break;
        }
    }

    toggleBanner() {
        if (!this.currentTranslator) return;

        chrome.storage.sync.get("HidePageTranslatorBanner", (result) => {
            switch (this.currentTranslator) {
                case "google": {
                    if (result.HidePageTranslatorBanner) {
                        this.toggleBannerFrame(true);
                        this.movePage("top", 40, true);
                    } else {
                        this.toggleBannerFrame(false);
                        this.movePage("top", 0, true);
                    }
                    break;
                }
                case "youdao": {
                    if (result.HidePageTranslatorBanner) {
                        this.toggleBannerFrame(true);
                        this.movePage("margin-top", 50, false);
                    } else {
                        this.toggleBannerFrame(false);
                        this.movePage("margin-top", -50, false);
                    }
                    break;
                }
                default:
                    break;
            }

            result.HidePageTranslatorBanner = !result.HidePageTranslatorBanner;
            chrome.storage.sync.set(result);
        });
    }
}

window.EdgeTranslateBannerController = new BannerController();
