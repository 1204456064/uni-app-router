import { ref } from 'vue';

interface loginForm {
    account: string;
    password: string;
}

export default function useLogin() {
    const formRef = ref();

    const form = ref<loginForm>({
        account: '',
        password: '',
    });

    const rules = ref({
        account: [
            {
                required: true,
                message: '请输入用户名',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
            },
        ],
    });

    return {
        form,
        formRef,
        rules,
    };
}
