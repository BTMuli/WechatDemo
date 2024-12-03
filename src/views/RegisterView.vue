<template>
  <BasePanel title="微信-账号注册">
    <div class="register-form">
      <ElImage src="/logo.png" class="logo" fit="contain" />
      <ElForm :model="formData" label-width="auto" label-position="left">
        <ElFormItem prop="phone" label="手机号">
          <ElInput v-model="formData.phone" type="tel" clearable />
        </ElFormItem>
        <ElFormItem prop="pwd" label="密码">
          <ElInput v-model="formData.pwd" type="password" clearable />
        </ElFormItem>
        <ElFormItem prop="authCode" label="验证码">
          <ElInput v-model="formData.authCode" type="text" clearable>
            <template #append>
              <ElButton type="primary" @click="postCode()">获取验证码</ElButton>
            </template>
          </ElInput>
        </ElFormItem>
      </ElForm>
      <ElButton type="success" class="register-button" size="large" @click="tryRegister()">
        注册
      </ElButton>
      <ElLink :underline="false" class="action-link" @click="toLogin()">已有账号?</ElLink>
    </div>
  </BasePanel>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import BasePanel from "@/Layouts/BasePanel.vue";

type RegisterFormData = { phone: string; pwd: string; authCode: string };

const router = useRouter();

const formData = ref<RegisterFormData>({ phone: "", pwd: "", authCode: "" });

async function toLogin(): Promise<void> {
  await router.push({ name: "登录" });
}

async function tryRegister(): Promise<void> {
  console.log(formData.value);
}

async function postCode(): Promise<void> {
  console.log("postCode");
}
</script>
<style lang="scss" scoped>
.register-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 12px;
  row-gap: 8px;
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
