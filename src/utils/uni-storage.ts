/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @param key 属性名称
 * @param data 要保存的数据
 */
export function saveStorage(key: string, data: unknown) {
    uni.setStorageSync(key, data);
}

/**
 * 从本地缓存中同步获取指定 key 对应的内容。
 * @param key 取数据的key
 * @returns
 */
export function getStorage(key: string) {
    return uni.getStorageSync(key);
}

/**
 * 从本地缓存中移除指定key对应的内容。
 * @param key 移除数据的key
 * @returns
 */
export function removeStorage(key: string) {
    return uni.removeStorageSync(key);
}
