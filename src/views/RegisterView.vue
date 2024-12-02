<script lang="ts" setup>
import { ElForm, ElFormItem, ElImage, ElInput, ElLink, ElMessage, ElUpload } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";

import BasePanel from "@/Layouts/BasePanel.vue";

const router = useRouter();

const changeAccount = () => {
  // 这里跳转的时候加个参数
  router.push("/login/pass");
};

const formData = ref({
  avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  nickname: "",
  qq: "",
  email: "",
  phone: "",
  password: "",
  repassword: "",
});

const uploadUrl = "/api/upload"; // Replace with your actual upload URL

const handleAvatarSuccess = (response, file) => {
  console.log("Avatar uploaded successfully", response, file);
  formData.value.avatar = URL.createObjectURL(file.raw);
};

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};
</script>

<template>
  <BasePanel title="微信">
    <div class="register-form">
      <div class="error-msg"></div>
      <ElForm :model="formData" label-width="0px" @submit.prevent>
        <ElFormItem>
          <ElUpload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <ElImage :src="formData.avatar" class="avatar" />
          </ElUpload>
        </ElFormItem>
        <ElFormItem prop="nickname">
          <ElInput v-model="formData.nickname" size="large" placeholder="请输入昵称" clearable />
        </ElFormItem>
        <ElFormItem prop="qq">
          <ElInput v-model="formData.qq" size="large" placeholder="请输入QQ号" clearable />
        </ElFormItem>
        <ElFormItem prop="email">
          <ElInput
            v-model="formData.email"
            type="email"
            size="large"
            placeholder="请输入QQ邮箱"
            clearable
          />
        </ElFormItem>
        <ElFormItem prop="phone">
          <ElInput
            v-model="formData.phone"
            type="tel"
            size="large"
            placeholder="请输入手机号"
            clearable
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="formData.password"
            type="password"
            size="large"
            placeholder="请输入密码"
            clearable
          />
        </ElFormItem>
        <ElFormItem prop="repassword">
          <ElInput
            v-model="formData.repassword"
            type="password"
            size="large"
            placeholder="请输入确认密码"
            clearable
          />
        </ElFormItem>
      </ElForm>
      <ElLink :underline="false" class="action-link" @click="changeAccount">已有账号?</ElLink>
      <ElButton type="success" class="register-button" size="small" @click="loginFun"
        >注册
      </ElButton>
    </div>
  </BasePanel>
</template>

<style lang="scss" scoped>
.register-form {
  overflow: auto;
  // padding: 12px;
  margin: 32px;
  -webkit-app-region: no-drag;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #d2d2d2;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: 0;
  }

  .el-form-item {
    border-bottom: 1px solid #ddd;
  }

  .el-form-item:nth-child(1) {
    border: none;

    :deep(.el-form-item__content) {
      justify-content: center;
    }
  }

  .register-button {
    width: 141px;
    height: 28px;
    border-radius: 4px;
    -webkit-app-region: no-drag;
  }

  .action-link {
    color: #576b95;
    font-size: 11px;
    padding: 0;
    height: auto;

    &:hover {
      color: #7689b3;
    }

    &:not(.is-disabled) {
      &:active {
        color: #3d4d6d;
      }
    }
  }

  .avatar-uploader {
    display: flex;
    justify-content: center;

    .avatar {
      width: 82px;
      height: 82px;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
    }
  }
}
</style>
