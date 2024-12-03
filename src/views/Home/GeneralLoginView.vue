<template>
  <div class="login-form">
    <ElImage src="/logo.png" class="logo" fit="contain" @click="switchAccount()" />
    <ElRadioGroup v-model="formData.loginWay">
      <ElRadioButton :value="LoginWay.Code">验证码登录</ElRadioButton>
      <ElRadioButton :value="LoginWay.Pwd">密码登录</ElRadioButton>
    </ElRadioGroup>
    <ElForm label-width="auto" label-position="left">
      <ElFormItem label="手机号" prop="phone">
        <ElInput type="tel" clearable v-model="formData.phone" />
      </ElFormItem>
      <ElFormItem label="验证码" prop="autoCode" v-if="formData.loginWay === LoginWay.Code">
        <ElInput type="text" clearable v-model="formData.authCode">
          <template #append>
            <ElButton type="primary" v-if="canGetCode" @click="tryGetCode()">获取验证码</ElButton>
            <ElButton type="primary" :disabled="true" v-else>{{ codeCount }}秒后获取</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="pwd" v-if="formData.loginWay === LoginWay.Pwd">
        <ElInput type="password" clearable v-model="formData.pwd" />
      </ElFormItem>
    </ElForm>
    <div class="register-link" @click="toRegister()">没有账号？</div>
    <div class="login-btn" @click="tryLogin()">登录</div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useAppStore } from "@/store/modules/app.js";

enum LoginWay {
  Pwd,
  Code,
}

type LoginFormData =
  | {
      phone: string;
      authCode: string;
      loginWay: LoginWay.Code;
    }
  | {
      phone: string;
      pwd: string;
      loginWay: LoginWay.Pwd;
    };

const router = useRouter();
const { isLogin } = storeToRefs(useAppStore());

const formData = ref<LoginFormData>({ phone: "", authCode: "", loginWay: LoginWay.Code });
const codeTimer = ref<NodeJS.Timeout | null>(null);
const canGetCode = ref<boolean>(true);
const codeCount = ref<number>(60);

async function toRegister(): Promise<void> {
  await router.push({ name: "注册" });
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
  ElMessage.success("验证码已发送");
}

async function tryLogin(): Promise<void> {
  if (!formData.value.phone) {
    ElMessage.error("请输入手机号");
    return;
  }
  if (!formData.value.phone.match(/^1[3-9]\d{9}$/)) {
    ElMessage.error("请输入正确的手机号");
    return;
  }
  if (formData.value.loginWay === LoginWay.Code) {
    if (!formData.value.authCode) {
      ElMessage.error("请输入验证码");
      return;
    }
  } else {
    if (!formData.value.pwd) {
      ElMessage.error("请输入密码");
      return;
    }
  }
  // isLogin.value = true;
}

function switchAccount(): void {
  isLogin.value = true;
}

onUnmounted(() => {
  if (codeTimer.value) {
    clearInterval(codeTimer.value);
    codeTimer.value = null;
  }
});
</script>
<style lang="scss" scoped>
.login-form {
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

.register-link {
  color: #cccccc;
  cursor: pointer;
  text-align: right;
  margin-left: auto;
  font-size: 12px;
}

.login-btn {
  position: relative;
  width: 180px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 10px;
  background: #07c160;
  color: white;
  cursor: pointer;
}
</style>
