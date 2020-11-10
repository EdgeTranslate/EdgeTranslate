import axios from "axios";

/**
 * Intercept axios() to add error handling.
 *
 * @param {import("axios").AxiosInstance} target axios instance
 * @param {Any} thisArg not used
 * @param {Array<Any>} args args passed to axios()
 *
 * @returns {Promise<Any>} response Promise
 */
async function applyTrap(target, thisArg, args) {
    try {
        return await target(...args);
    } catch (error) {
        throw {
            errorType: "NET_ERR",
            errorCode: 0,
            errorMsg: error.message
        };
    }
}

/**
 * Intercept the method getting operation to add error handling for axios methods.
 *
 * @param {import("axios").AxiosInstance} target axios instance
 * @param {String} propName property name.
 *
 * @returns {Any} If the property is a function, return a wrapper with error handling for it.
 *                If the property is not a function, just return it.
 */
function getTrap(target, propName) {
    let prop = target[propName];

    // If the property is not a function, just return it.
    if (Object.prototype.toString.call(prop) !== "[object Function]") {
        return prop;
    }

    // If the property is a function, return a wrapper with error handling.
    return async (...args) => {
        try {
            // Using Promise.resolve to wrap up the return value of prop in case it is not a Promise.
            return await Promise.resolve(prop(...args));
        } catch (error) {
            throw {
                errorType: "NET_ERR",
                errorCode: 0,
                errorMsg: error.message
            };
        }
    };
}

/**
 * Axios proxy with error handling.
 */
const AxiosProxy = new Proxy(axios, {
    apply: applyTrap,
    get: getTrap
});

export default AxiosProxy;
