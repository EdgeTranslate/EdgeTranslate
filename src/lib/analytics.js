import UAParser from "ua-parser-js";
export { insertAnalyticsScript };

const ANALYTICS_ACCOUNT = "UA-153659474-1";
const GLOBAL_NAME = "ga"; // global name of google analytics object
/**
 * Insert google analytics script into a window
 * @param {Window} insertWindow The window object the script insert to.
 */
function insertAnalyticsScript(insertWindow) {
    const UA_INFO = new UAParser();
    const BROWSER = UA_INFO.getBrowser();
    const OS = UA_INFO.getOS();
    // The script type depends on the running environment(production or development)
    let analyticsScriptSrc =
        "https://www.google-analytics.com/" +
        (process.env.NODE_ENV === "production" ? "analytics.js" : "analytics_debug.js");
    insertWindow["GoogleAnalyticsObject"] = GLOBAL_NAME;

    // Creates an initial ga() function.
    // The queued commands will be executed once analytics.js loads.
    insertWindow[GLOBAL_NAME] =
        insertWindow[GLOBAL_NAME] ||
        function() {
            (insertWindow[GLOBAL_NAME].q = insertWindow[GLOBAL_NAME].q || []).push(arguments);
        };
    // Sets the time (as an integer) this tag was executed.
    // Used for timing hits.
    insertWindow[GLOBAL_NAME].l = Date.now();

    insertWindow[GLOBAL_NAME]("create", ANALYTICS_ACCOUNT, "auto");
    insertWindow[GLOBAL_NAME]("set", "checkProtocolTask", null); // Disable file protocol checking.
    insertWindow[GLOBAL_NAME]("set", "language", navigator.language);
    insertWindow[GLOBAL_NAME]("set", "appVersion", chrome.runtime.getManifest().version);
    insertWindow[GLOBAL_NAME]("set", "dimension1", BROWSER.name || "None");
    insertWindow[GLOBAL_NAME](
        "set",
        "dimension2",
        (BROWSER.version || "0.0")
            .split(".")
            .slice(0, 3)
            .join(".")
    );
    insertWindow[GLOBAL_NAME]("set", "dimension3", OS.name || "None");
    insertWindow[GLOBAL_NAME]("set", "dimension4", OS.version || "0.0");
    insertWindow[GLOBAL_NAME]("send", "pageview");

    // Insert the script tag asynchronously.
    // Inserts above current tag to prevent blocking in addition to using the
    // async attribute.
    var insertScript = insertWindow.document.createElement("script");
    insertScript.type = "text/javascript";
    insertScript.async = true;
    insertScript.src = analyticsScriptSrc;
    insertWindow.document.body.appendChild(insertScript);
}
