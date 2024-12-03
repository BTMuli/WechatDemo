<template>
  <BasePanel :show-setting="true">
    <template #title>微信-注册</template>
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
              <ElButton type="primary" @click="tryGetCode()" v-if="canGetCode">获取验证码</ElButton>
              <ElButton type="primary" :disabled="true" v-else>{{ codeCount }}秒后获取</ElButton>
            </template>
          </ElInput>
        </ElFormItem>
      </ElForm>
      <div class="login-link" @click="toLogin()">已有账号？</div>
      <div class="register-btn" @click="tryRegister()">注册</div>
    </div>
  </BasePanel>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

import BasePanel from "@/Layouts/BasePanel.vue";

type RegisterFormData = { phone: string; pwd: string; authCode: string };
const router = useRouter();

const formData = ref<RegisterFormData>({ phone: "", pwd: "", authCode: "" });
const codeTimer = ref<NodeJS.Timeout | null>(null);
const canGetCode = ref<boolean>(true);
const codeCount = ref<number>(60);

async function toLogin(): Promise<void> {
  await router.push({ name: "登录" });
}

async function tryRegister(): Promise<void> {
  console.log(formData.value);
}

async function tryGetCode(): Promise<void> {
  if (!formData.value.phone) {
    ElMessage.error("请输入手机号");
    return;
  }
  if (!formData.value.phone.match(/^1[3-9]\d{9}$/)) {
    ElMessage.error("请输入正确的手机号");
    return;
  }
  if (!canGetCode.value) {
    ElMessage.error("请稍后再试");
    return;
  }
  if (codeTimer.value) {
    clearInterval(codeTimer.value);
    codeTimer.value = null;
  }
  canGetCode.value = false;
  codeTimer.value = setInterval(() => {
    codeCount.value--;
    if (codeCount.value <= 0) {
      if (codeTimer.value !== null) clearInterval(codeTimer.value);
      codeTimer.value = null;
      codeCount.value = 60;
      canGetCode.value = true;
    }
  }, 1000);
}

onUnmounted(() => {
  if (codeTimer.value) {
    clearInterval(codeTimer.value);
    codeTimer.value = null;
  }
});
</script>
<style lang="scss" scoped>
.register-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  .el-form-item:last-child {
    margin-bottom: 0;
  }
}

.logo {
  width: 80px;
  height: 80px;
}

.login-link {
  color: #cccccc;
  cursor: pointer;
  text-align: right;
  margin-left: auto;
  font-size: 12px;
}

.register-btn {
  position: relative;
  width: 180px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #07c160;
  color: white;
  cursor: pointer;
}
</style>
