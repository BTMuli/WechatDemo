<template>
  <div class="login-form">
    <ElImage src="/logo.png" class="logo" fit="contain" @click="switchAccount()" />
    <ElForm label-width="auto" label-position="left">
      <ElFormItem label="手机号" prop="phone">
        <ElInput type="tel" clearable v-model="formData.phone" />
      </ElFormItem>
      <ElFormItem label="验证码" prop="autoCode">
        <ElInput type="text" clearable v-model="formData.authCode">
          <template #append>
            <ElButton type="primary">获取验证码</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
    </ElForm>
    <ElButton color="#07c160" size="large" @click="tryLogin()">登录</ElButton>
    <ElLink :underline="false" class="action-link" @click="toRegister()">没有账号?</ElLink>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAppStore } from "@/store/modules/app.js";

type LoginFormData = { phone: string; authCode: string };

const formData = ref<LoginFormData>({ phone: "", authCode: "" });
const router = useRouter();
const { isLogin } = storeToRefs(useAppStore());

async function toRegister(): Promise<void> {
  await router.push({ name: "注册" });
}

async function tryLogin(): Promise<void> {
  console.log(formData.value);
}

function switchAccount(): void {
  isLogin.value = true;
}
</script>
<style lang="scss" scoped>
.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;
  padding: 12px;
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
