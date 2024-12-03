<template>
  <div class="content">
    <div class="user-info">
      <ElImage src="/logo.png" class="avatar" fit="contain" />
      <div class="username">爱芳芳</div>
    </div>
    <div class="bottom-acts">
      <div class="login-btn" @click="loginFun()">进入微信</div>
      <div class="action-links">
        <div class="action-link" @click="switchAccount()">切换账号</div>
        <div class="action-divider" />
        <div class="action-link" @click="toFileTransfer()">仅传输文件</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useAppStore } from "@/store/modules/app.js";

function loginFun() {
  console.log("Logging in...");
}

const { isLogin } = storeToRefs(useAppStore());

async function switchAccount(): Promise<void> {
  isLogin.value = false;
}

function toFileTransfer(): void {
  window.open("https://filehelper.weixin.qq.com/?from=windows&type=recommend", "_blank");
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  width: 100%;
  height: 100%;
  row-gap: 60px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 24px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.username {
  font-size: 20px;
}

.bottom-acts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
}

.login-btn {
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

.action-links {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 15px;
}

.action-link {
  color: #436895;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  height: auto;
  cursor: pointer;
}

.action-divider {
  width: 1px;
  height: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
