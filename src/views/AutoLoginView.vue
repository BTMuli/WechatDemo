<template>
  <div class="content">
    <div class="user-info">
      <ElImage src="/avatar.jpeg" class="avatar" draggable="false" />
      <div class="username">爱芳芳</div>
    </div>
    <div class="bottom-acts">
      <ElButton color="#07c160" size="large" @click="loginFun()">进入微信</ElButton>
      <div class="action-links">
        <ElLink :underline="false" class="action-link" @click="switchAccount()">切换账号</ElLink>
        <div class="action-divider" />
        <ElLink :underline="false" class="action-link">仅传输文件</ElLink>
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
  row-gap: 16px;

  .avatar {
    width: 75px;
    height: 74px;
    border-radius: 4px;
    overflow: hidden;
  }

  .username {
    font-size: 20px;
  }
}

.bottom-acts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;

  .action-links {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;

    .action-link {
      color: #576b95;
      font-size: 14px;
      line-height: 1;
      padding: 0;
      height: auto;

      &:hover {
        color: #7088b5;
      }

      &:active {
        color: #445a84;
      }
    }
  }
}

.action-divider {
  width: 1px;
  height: 12px;
  background: #f3f3f3;
}
</style>
