// export { sendHitRequest };

// // specification of this module is in: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
// const ANALYTICS_ACCOUNT = "UA-153659474-1";
// const GA_URL = "https://www.google-analytics.com/collect";

// /**
//  * send hit data to google analytics API
//  * "hit type" includes: "pageview", "event"
//  * "event type" includes: "click", "open", "installation"
//  * @param {string} page page name of the current document
//  * @param {string} type type of hit.
//  * @param {Object} extraHitData extra hit(request) data
//  */
// function sendHitRequest(page, type, extraHitData) {
//     let documentLocation =
//         document.location.origin + document.location.pathname + document.location.search;
//     useGoogleAnalytics(function() {
//         getUUID(function(UUID) {
//             // establish basic hit data(payload)
//             var hitData = {
//                 v: 1, // analytics protocol version
//                 tid: ANALYTICS_ACCOUNT, // analytics protocol version
//                 cid: UUID, // unique user ID
//                 ul: navigator.language, //   user's language setting
//                 an: chrome.runtime.getManifest().name, // the name of this extension
//                 av: chrome.runtime.getManifest().version, // the version number of this extension
//                 t: type, // hit(request) type
//                 dl: documentLocation, // document location
//                 dp: "/" + page, // document page
//                 dt: page // document title
//             };
//             // merge hitData and extraHitData
//             Object.assign(hitData, extraHitData);

//             let request = new XMLHttpRequest();
//             request.open("POST", GA_URL, true);
//             request.send(generateURLRequest(hitData));
//         });
//     });
// }

// /**
//  * generate url according to the request object
//  * @param {Object} requestData object contains request data
//  * @returns {string} generated url
//  */
// function generateURLRequest(requestData) {
//     let url = "";
//     if (requestData) {
//         for (let key in requestData) {
//             url += key + "=" + requestData[key] + "&";
//         }
//     }
//     return url;
// }

// /**
//  *
//  * @param {function} callback the callback function executed when the result of settings is ready and value of UseGoogleAnalytics is true
//  */
// function useGoogleAnalytics(callback) {
//     chrome.storage.sync.get("OtherSettings", function(result) {
//         if (result.OtherSettings.UseGoogleAnalytics) callback();
//     });
// }

// /**
//  * get UUID(unique user ID). If user is new, a new UUID will be generated or return the UUID stored in chrome storage
//  * @param {function(UUID)} callback the callback function to be executed when the result is returned. If user is new, set a new UUID. UUID is a function parameter as result
//  */
// function getUUID(callback) {
//     chrome.storage.sync.get("UUID", function(result) {
//         let UUID = result.UUID;
//         if (!UUID) {
//             UUID = generateUUID();
//             chrome.storage.sync.set({
//                 UUID: UUID
//             });
//         }
//         callback(UUID);
//     });
// }

// function generateUUID() {
//     var d = new Date().getTime();
//     if (window.performance && typeof window.performance.now === "function") {
//         d += performance.now(); //use high-precision timer if available
//     }
//     var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
//         var r = (d + Math.random() * 16) % 16 | 0;
//         d = Math.floor(d / 16);
//         return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//     });
//     return uuid;
// }
