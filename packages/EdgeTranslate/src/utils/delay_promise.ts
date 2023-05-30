/**
 * @param time  the delay time. unit: ms
 * @returns delay Promise
 */
export function delayPromise(time: number) {
    return new Promise<void>((resolve, reject) => {
        if (typeof time === "number" && time >= 0) {
            setTimeout(() => {
                resolve();
            }, time);
        } else {
            reject(`the type or value of variable time(${time}) is not supported`);
        }
    });
}
