export { insertAnalyticsScript };

const ANALYTICS_ACCOUNT = "UA-153659474-1";
const GLOBAL_NAME = "ga"; // global name of google analytics object
/**
 * Insert google analytics script into a window
 * @param {Window} insertWindow The window object the script insert to.
 */
function insertAnalyticsScript(insertWindow) {
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
