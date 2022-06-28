import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Intercept axios() to add error handling.
 *
 * @param target axios instance
 * @param thisArg not used
 * @param args args passed to axios()
 *
 * @returns {Promise<Any>} response Promise
 */
async function applyTrap(target: AxiosInstance, _thisArg: any, args: [AxiosRequestConfig]) {
    try {
        return await target(...args);
    } catch (error: any) {
        throw {
            errorType: "NET_ERR",
            errorCode: 0,
            errorMsg: error.message,
        };
    }
}

/**
 * Intercept the method getting operation to add error handling for axios methods.
 *
 * @param target axios instance
 * @param propName property name.
 *
 * @returns If the property is a function, return a wrapper with error handling for it. If the property is not a function, just return it.
 */
function getTrap(target: AxiosInstance, propName: string) {
    const prop = (target as any)[propName];

    // If the property is not a function, just return it.
    if (Object.prototype.toString.call(prop) !== "[object Function]") {
        return prop;
    }

    // If the property is a function, return a wrapper with error handling.
    return async (...args: any) => {
        try {
            // Using Promise.resolve to wrap up the return value of prop in case it is not a Promise.
            return await Promise.resolve(prop(...args));
        } catch (error: any) {
            throw {
                errorType: "NET_ERR",
                errorCode: 0,
                errorMsg: error.message,
            };
        }
    };
}

/**
 * Axios proxy with error handling.
 */
const AxiosProxy = new Proxy<AxiosInstance>(axios, {
    apply: applyTrap,
    get: getTrap,
});

export default AxiosProxy;
