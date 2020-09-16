/**
 * module: common
 * part: none
 * function: encapsulate some async functions in Promise style
 */

export { delayPromise };

/**
 *
 * @param {number} time  the delay time. unit: ms
 * @returns {Promise<Object>} delay Promise
 */
function delayPromise(time) {
    return new Promise((resolve, reject) => {
        if (typeof time === "number" && time >= 0) {
            setTimeout(() => {
                resolve();
            }, time);
        } else {
            reject(`the type or value of variable time(${time}) is not supported`);
        }
    });
}
