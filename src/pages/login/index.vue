<template>
    <view>
        <!-- <view>
            <movable-area scale-area>
                <movable-view direction="all" scale scale-min="1" scale-max="3" :scale-value="scale">
                    <image src="/src/assets/back.png" mode="widthfix" />
                </movable-view>
            </movable-area>
        </view> -->
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
    </view>
</template>

<script setup lang="ts">
import useLogin from '@/pages/login/useLogin';
import { ref, onMounted } from 'vue';

/**
 * @description 缩放比例
 */
const scale = ref<number>(1);

/**
 * 登录相关
 */
const { formRef, form, rules } = useLogin();

/**
 * @description 登录
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

onMounted(() => {
    // setInterval(() => {
    //     scale.value += 0.05;
    //     if (scale.value >= 2.9) {
    //         scale.value = 1;
    //     }
    // }, 80);
});
</script>

<style lang="scss" scoped>
movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

movable-area {
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
}

movable-view image {
    width: 100%;
    height: 100%;
    opacity: 0.9;
}

body {
    // background: linear-gradient(
    //     111.4deg,
    //     rgb(209, 231, 235) 7.4%,
    //     rgb(238, 219, 199) 51.4%,
    //     rgb(255, 159, 122) 82.6%,
    //     rgb(255, 109, 58) 100.2%
    // );
    background: radial-gradient(
        circle at 50% 50%,
        rgb(209, 231, 235) 7.4%,
        rgb(238, 219, 199) 51.4%,
        rgb(255, 159, 122) 82.6%,
        rgb(255, 109, 58) 100.2%
    );
    // background-color: rgb(246, 223, 228);
    // background-color: black;
}

.card {
    // background: linear-gradient(
    //     111.4deg,
    //     rgb(209, 231, 235) 7.4%,
    //     rgb(238, 219, 199) 51.4%,
    //     rgb(255, 159, 122) 82.6%,
    //     rgb(255, 109, 58) 100.2%
    // );
    background: radial-gradient(
        circle at 50% 50%,
        rgb(209, 231, 235) 7.4%,
        rgb(238, 219, 199) 51.4%,
        rgb(255, 159, 122) 82.6%,
        rgb(255, 109, 58) 100.2%
    );
    // background-color: rgb(246, 223, 228);
    position: absolute;
    z-index: 9999;
    text-align: center;
    bottom: 40%;
    left: 30rpx;
    right: 30rpx;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    // background: linear-gradient (to top right, rgba(90, 149, 207, 0.5), rgba(58, 76, 99, 0.8));
    box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2), -10px 10px 10px rgba(225, 225, 225, 1);
    border-radius: 20px;

    &__title {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }

    &__login {
        margin: 30rpx 45rpx;
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
