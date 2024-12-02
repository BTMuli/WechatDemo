<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const formData = ref({});
const formDataRef = ref();
const router = useRouter();
const changeAccount = () => {
  router.push("/register");
};
</script>

<template>
  <div class="login-form">
    <div class="error-msg"></div>
    <ElForm ref="formDataRef" label-width="0px" @submit.prevent>
      <ElFormItem label="" prop="phone">
        <ElInput
          type="tel"
          size="large"
          placeholder="请输入手机号"
          clearable
          v-model.trim="formData.email"
        />
      </ElFormItem>
      <ElFormItem label="" prop="password">
        <ElInput type="password" size="large" placeholder="请输入密码" clearable />
      </ElFormItem>
    </ElForm>
    <ElLink :underline="false" class="action-link" @click="changeAccount">没有账号?</ElLink>
    <ElButton type="success" class="register-button" size="small" @click="loginFun">登录</ElButton>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  padding: 12px;
  -webkit-app-region: no-drag;
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: none;
  }
  .el-form-item {
    border-bottom: 1px solid #ddd;
  }
  .action-link {
    color: #576b95;
    font-size: 11px;
    padding: 0;
    height: auto;
    &:hover {
      color: #576b96;
    }
    &:not(.is-disabled) {
      &:active {
        color: #576b97;
      }
    }
  }
}
</style>
