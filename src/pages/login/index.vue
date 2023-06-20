<template>
    <view class="card">
        <view class="card__title"> <text>剑开天门</text> </view>
        <view class="flex-row">
            <u-form ref="formRef" class="card__form" :model="form" :rules="rules" label-width="120">
                <u-form-item label="用户名" required prop="account">
                    <u-input
                        v-model="form.account"
                        type="text"
                        placeholder="请输入用户名"
                        placeholder-style="color:#999"
                    />
                </u-form-item>
                <u-form-item label="密码" required prop="password">
                    <u-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码"
                        placeholder-style="color:#999"
                    />
                </u-form-item>
            </u-form>
            <view class="card__right-space"></view>
        </view>
        <view class="card__login">
            <u-button plain type="primary" @click="login">登录</u-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import useLogin from '@/pages/login/useLogin';

/**
 * 登录相关
 */
const { formRef, form, rules } = useLogin();

/**
 * 登录
 */
const login = async () => {
    // 表单校验
    await formRef.value.validate();

    // 校验通过
    // const res = await Login.login({
    //     account: form.value.account,
    //     password: form.value.password,
    //     // 1: PC端   2: APP端
    //     // loginType: 2,
    // });

    // if (!res) {
    //     return;
    // }

    // 存储 token 与 用户信息到本地
    // saveStorage('token', res.data.token);
    // saveStorage('userInfo', res.data);

    // 跳转页面
    uni.switchTab({ url: '/pages/index/index' });
};
</script>

<style lang="scss" scoped>
body {
    background-image: url('/src/assets/back.png');
    // width: 100%;
    background-repeat: no-repeat;
    // height: 100vh;

    background-size: cover;
    background-position: center center;
}

.card {
    background-color: #ffffff;
    position: absolute;
    z-index: 10;
    font-family: sans-serif;
    text-align: center;
    bottom: 10%;
    left: 30rpx;
    right: 30rpx;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient (to top right, rgba(90, 149, 207, 0.5), rgba(58, 76, 99, 0.8));
    box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2), -10px 10px 20px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    border-radius: 20px;

    &__title {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }

    &__login {
        margin-top: 30rpx;
        margin-bottom: 30rpx;
        margin-left: 45rpx;
        margin-right: 45rpx;
        border-bottom: 10rpx;
    }

    &__form {
        width: 100%;
        margin-left: 45rpx;
    }

    &__right-space {
        width: 45rpx;
    }
}
</style>
