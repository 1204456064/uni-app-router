/**
 * await to
 */
export function to(promise?: any, errorExt?: any) {
    return promise
        .then((data: any) => [null, data])
        .catch((err: any) => {
            if (errorExt) {
                Object.assign(err, errorExt);
            }

            return [err, undefined];
        });
}
