import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import uviewPlus from 'uview-plus';

export function createApp() {
    const app = createSSRApp(App);
    app.use(createPinia());
    app.use(uviewPlus);

    /**
     * 捕获全局未处理的异常
     * @param err 错误文件
     * @param vm vue 实例
     * @param info
     */
    app.config.errorHandler = (err, vm, info) => {
        console.error('发生未捕获的异常');

        console.error('err: %o', err);
        console.error('vm: %o', vm);
        console.error('info: %o', info);
    };
    return {
        app,
    };
}

uni.$u.config.unit = 'rpx';
