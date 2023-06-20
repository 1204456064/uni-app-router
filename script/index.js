console.log('运行监听路由脚本成功');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// 记录修改文件的次数
let count = 0;

// 路由文件路径、监听该路径下所有路由文件
let routerPath = path.join(__dirname, '../src/router');

// 需要重写pages.json的路径
let writePath = path.join(__dirname, '../src/pages.json');

/**
 * @description 读取router下的所有路由文件
 * @param {string} url router路径
 * @return urlObj 路由文件路径集合
 */
const readDir = (url) => {
    const dirInfo = fs.readdirSync(url);
    let urlObj = {};
    dirInfo.map((item) => {
        const location = path.join(url, item);
        console.log('路由文件路径=> ' + location);
        urlObj[location] = location;
    });
    return urlObj;
};

// 路由文件路径集合
const originObj = readDir(routerPath);

/**
 * @description 监听所有路由文件
 */
chokidar.watch(routerPath).on('all', (event, path) => {
    // 移除路由文件、更新pages.json
    if (event === 'unlink') {
        delete originObj[path];
        updateRouter(routerPath);
        return;
    }

    // 新增路由文件，并未改动，不更新
    if (event === 'add') {
        originObj[path] = path;
        return;
    }

    // 路由文件保存，更新pages.json
    if (event === 'change') {
        updateRouter(routerPath);
    }
});

/**
 * @description 重写pages.json
 * @param {string} url router路径
 * @return void
 */
const updateRouter = (url) => {
    const dirInfo = fs.readdirSync(url);
    // 存放所有路由
    let urlList = [];
    dirInfo.map((item) => {
        const location = path.join(url, item);
        // node会缓存模块，需要清除缓存，以获取最新的文件内容
        delete require.cache[require.resolve(location)];

        if (originObj[location]) {
            urlList.push(...require(originObj[location]));
        }
    });
    // router.js存放一些默认配置，也可优化成动态拼接不同的模块
    const initConf = require('./router.js');
    // 需要将登录页放在所有路由的第一项，因为重写pages.json后会丢失uni-app的页面缓存
    // 用于存放合并路由后的登录页所对应的数组下标
    let deleteIndex = 0;
    // 用于存放登录路由
    let copyItem = {};

    urlList.forEach((item, index) => {
        if (item.style.navigationBarTitleText === '登录') {
            copyItem = item;
            deleteIndex = index;
        }
    });
    // 去除路由集合中不知道处于第几项的登录路由
    urlList.splice(deleteIndex, 1);
    // 将登录路由放到路由集合的第一项
    urlList.unshift(copyItem);

    // 更新pages.json的配置
    initConf.pages = urlList;
    count++;
    // 重写src目录下的pages.json文件
    fs.writeFile(writePath, JSON.stringify(initConf, null, '  '), (e) =>
        e ? console.error(e) : console.log(`路由修改成功，如果页面报错，请重新点击保存,修改次数为${count}`)
    );
};
