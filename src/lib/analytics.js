import UAParser from "ua-parser-js";
export { insertAnalyticsScript };

const ANALYTICS_ACCOUNT = "UA-153659474-1";
const UA_INFO = new UAParser();
const BROWSER = UA_INFO.getBrowser();
const OS = UA_INFO.getOS();
const BASE_URL = "https://www.google-analytics.com/collect";

/**
 * Insert google analytics script into a window
 * @param {Window} insertWindow The window object the script insert to.
 */
function insertAnalyticsScript() {
    // insertWindow[GLOBAL_NAME]("create", ANALYTICS_ACCOUNT, "auto");
    // insertWindow[GLOBAL_NAME]("set", "checkProtocolTask", null); // Disable file protocol checking.
    // insertWindow[GLOBAL_NAME]("set", "language", navigator.language);
    // insertWindow[GLOBAL_NAME]("set", "appVersion", chrome.runtime.getManifest().version);
    // insertWindow[GLOBAL_NAME]("set", "dimension1", BROWSER.name || "None");
    // insertWindow[GLOBAL_NAME](
    //     "set",
    //     "dimension2",
    //     (BROWSER.version || "0.0")
    //         .split(".")
    //         .slice(0, 3)
    //         .join(".")
    // );
    // insertWindow[GLOBAL_NAME]("set", "dimension3", OS.name || "None");
    // insertWindow[GLOBAL_NAME]("set", "dimension4", OS.version || "0.0");
    // insertWindow[GLOBAL_NAME]("send", "pageview");

    send("background", "pageview", null);
}

function send(page, type, appendRequestData) {
    let documentLocation =
        document.location.origin + document.location.pathname + document.location.search;
    getUUID(function(UUID) {
        var formData = new FormData();
        let request = new XMLHttpRequest();
        formData.append("v", 1); // analytics protocol version
        formData.append("tid", ANALYTICS_ACCOUNT); // google analytics account
        formData.append("uid", UUID); // unique user ID
        formData.append("ul", navigator.language); // user's language setting
        formData.append("an", chrome.runtime.getManifest().name); // the name of this extension
        formData.append("av", chrome.runtime.getManifest().version); // the version number of this extension
        formData.append("t", type); // hit(request) type
        formData.append("dl", documentLocation); // document location
        formData.append("dp", "/" + page); // document page
        formData.append("dt", page); // document title
        formData.forEa;
        let url = BASE_URL;
        request.open("POST", url, true);
        request.send(generateURLRequest(formData));
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                // HTTP request successfully
                if (request.status !== 200) {
                    // console.log("google analytics request failed");
                }
            }
        };
    });
}

function generateURLRequest(requestData) {
    let url = "";
    if (requestData) {
        requestData.forEach((value, key) => {
            url += key + "=" + value + "&";
        });
    }
    return url;
}

/**
 * 
 * @param {function name(UUID) {
     
 }} callback the callback function to be executed when the result is returned. If user is new, set a new UUID
 */
function getUUID(callback) {
    chrome.storage.sync.get("UUID", function(result) {
        let UUID = result.UUID;
        if (!UUID) {
            UUID = generateUUID();
            chrome.storage.sync.set({
                UUID: UUID
            });
        }
        callback(UUID);
    });
}

function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
