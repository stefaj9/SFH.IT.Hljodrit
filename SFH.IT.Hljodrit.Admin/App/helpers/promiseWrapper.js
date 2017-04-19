export function createPromise(funcToCall) {
    return new Promise((resolve, reject) => {
        try {
            funcToCall();
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}