import { ref } from 'vue';
import { hideLoading, showLoading, showToast } from './messageTip';

const BASE_URL = import.meta.env.VITE_API_URL as string;

type unknownType = any;

/**
 * 未登录码
 */
const NOT_LOGIN_CODE = 407;

/**
 * 异常提示码
 */
const EXCEPTION_CODE = 500;

/**
 * 违反数据完整性
 */
const BETRAY_DATA_INTEGRITY = 400;

/**
 * 成功码
 */
const SUCCESS_CODE = 200;

export function http(data: unknownType, method: unknownType, url: string, loading = true) {
    const token = uni.getStorageSync('token');

    if (loading) {
        showLoading('请求中', loading);
    }

    return new Promise((resolve) => {
        uni.request({
            url: BASE_URL + url,
            method,
            data,
            dataType: 'json',
            header: {
                'v-token': token,
            },
            success: (res) => {
                responHandler(res, resolve);
            },
            fail: () => {
                errorHander();
            },
            complete: () => {
                hideLoading();
            },
        });
    });
}

function responHandler(res: unknownType, resolve: unknownType) {
    const { code } = res.data;
    if (code === NOT_LOGIN_CODE) {
        uni.showToast({
            title: '登录失效，请重新登录',
            icon: 'none',
            mask: true,
            complete: () => {
                uni.navigateTo({ url: '/pages/login/index' });
            },
        });

        return false;
    }

    if (code === EXCEPTION_CODE) {
        showToast(res.data.message);
        return resolve(false);
    }

    if (code === BETRAY_DATA_INTEGRITY) {
        showToast(res.data.message);
        return resolve(false);
    }

    if (code === SUCCESS_CODE) {
        return resolve({ ...res.data });
    }
}

/**
 * 错误处理
 */
function errorHander() {
    showToast('网络错误或服务器错误');
}

/**
 * get请求
 */
export function get(url: string, data?: unknownType) {
    return http(data, 'GET', url);
}

/**
 * post请求
 */
export function post(url: string, data?: unknownType): Promise<any> {
    return http(data, 'POST', url);
}

export function isSuccess(code: number) {
    return Math.floor(code / 100) === 1;
}
