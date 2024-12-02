<template>
  <div class="content">
    <div class="user-info">
      <ElImage :src="imgUrl" class="avatar" draggable="false" />
      <div class="username">爱芳芳</div>
    </div>
    <div class="bottom-acts">
      <ElButton type="success" class="login-button" @click="loginFun">进入微信</ElButton>
      <div class="action-links">
        <ElLink :underline="false" class="action-link" @click="switchAccount()"> 切换账号</ElLink>
        <ElDivider direction="vertical" />
        <ElLink :underline="false" class="action-link">仅传输文件</ElLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElDivider, ElImage, ElLink } from "element-plus";

interface AutoLoginEmits {
  (e: "changeAccount"): void;
}

const emits = defineEmits<AutoLoginEmits>();

const imgUrl =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622154903_3c36a.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672907135&t=77ba3e01d433d87c1e0ea51f9aa39dd3";

function switchAccount() {
  emits("changeAccount");
}

const loginFun = () => {
  console.log("Logging in...");
};
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
  row-gap: 40px;
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
    -webkit-app-region: no-drag;
    overflow: hidden;

    :deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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

  .login-button {
    width: 180px;
    height: 36px;
    border-radius: 4px;
    font-size: 14px;
    padding: 0;
    -webkit-app-region: no-drag;
    background: #07c160;
  }

  .action-links {
    display: flex;
    align-items: center;
    -webkit-app-region: no-drag;

    .action-link {
      color: #576b95;
      font-size: 13px;
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

    :deep(.el-divider--vertical) {
      height: 12px;
      margin: 0 10px;
      border-color: #f3f3f3;
    }
  }
}
</style>
