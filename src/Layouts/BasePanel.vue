<template>
  <div class="base-panel-layout">
    <div class="nav">
      <div class="title">
        <slot name="title" />
      </div>
      <div class="acts">
        <NavActItem
          v-if="props.showPin"
          class="act-item"
          :class="{ 'rotate-icon': isPin }"
          @click="switchPin()"
          :title="isPin ? '取消置顶' : '置顶'"
        >
          <icon-tdesign-pin v-if="!isPin" />
          <icon-tdesign-pin-filled v-else />
        </NavActItem>
        <NavActItem v-if="props.showSetting" title="设置" @click="toSetting()">
          <icon-weui-setting-outlined />
        </NavActItem>
        <NavActItem v-if="props.showLogin" title="登录" @click="toLogin()">
          <icon-weui-me-outlined />
        </NavActItem>
        <NavActItem v-if="props.showMin" class="act-item" @click="minimize()" title="最小化">
          <icon-qlementine-icons-windows-minimize-16 />
        </NavActItem>
        <NavActItem
          v-if="props.showMax"
          class="act-item"
          @click="maximize()"
          :title="isMaximized ? '向下还原' : '最大化'"
        >
          <icon-qlementine-icons-windows-unmaximize-16 v-if="isMaximized" />
          <icon-qlementine-icons-windows-maximize-16 v-else />
        </NavActItem>
        <NavActItem v-if="props.showClose" class="act-item close" @click="close()" title="关闭">
          <icon-qlementine-icons-windows-close-16 />
        </NavActItem>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentWindow } from "@tauri-apps/api/window";
import { ref } from "vue";

import router from "@/router/index.js";

interface BasePanelProps {
  showLogin?: boolean;
  showSetting?: boolean;
  showClose?: boolean;
  showPin?: boolean;
  showMin?: boolean;
  showMax?: boolean;
  closeType?: number;
}

const props = withDefaults(defineProps<BasePanelProps>(), {
  showSetting: false,
  showLogin: false,
  showClose: true,
  showPin: true,
  showMin: false,
  showMax: false,
  closeType: 1,
});

const isPin = ref<boolean>(false);
const isMaximized = ref<boolean>(false);

async function toSetting(): Promise<void> {
  if (location.hash === "#/login" || location.hash === "#/register") {
    await router.push({ name: "设置（首页）" });
  }
  return;
}

async function toLogin(): Promise<void> {
  if (location.hash === "#/setting") router.back();
  return;
}

async function switchPin(): Promise<void> {
  isPin.value = !isPin.value;
  await getCurrentWindow().setAlwaysOnTop(isPin.value);
}

async function minimize(): Promise<void> {
  await getCurrentWindow().minimize();
}

async function maximize(): Promise<void> {
  isMaximized.value = !isMaximized.value;
  if (isMaximized.value) {
    await getCurrentWindow().maximize();
  } else {
    await getCurrentWindow().unmaximize();
  }
}

async function close(): Promise<void> {
  await getCurrentWindow().close();
}
</script>
<style lang="scss" scoped>
.base-panel-layout {
  position: relative;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 40px;
}

.nav {
  -webkit-app-region: drag;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: white;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: space-between;
}

.title {
  font-size: 14px;
  color: #a7a6aa;
  line-height: 25px;
  margin-left: 10px;
}

.acts {
  display: flex;
  align-items: center;
  height: 25px;
}

.act-item {
  width: 46px;
  height: 25px;
  font-size: 13px;
  cursor: pointer;
  color: #686868;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  outline: none;
  -webkit-app-region: no-drag;

  &:hover {
    background-color: #f3f3f3;
  }

  &:active {
    background-color: #d0d0d0;
  }

  &.close {
    &:hover {
      background-color: #fb7373;
      color: white;
    }

    &:active {
      background-color: #e14949;
      color: white;
    }
  }
}

.rotate-icon {
  svg {
    transform: rotate(-45deg);
  }
}
</style>
