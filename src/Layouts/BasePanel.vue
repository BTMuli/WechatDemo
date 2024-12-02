<template>
  <div class="base-panel-layout">
    <div class="nav">
      <div class="title">{{ props.title }}</div>
      <div class="acts">
        <div v-if="showSetting" class="act-item" @click="setting()" title="设置">
          <icon-weui-setting-outlined />
        </div>
        <div
          v-if="showPin"
          class="act-item"
          :class="{ 'rotate-icon': isPin }"
          @click="switchPin()"
          :title="isPin ? '取消置顶' : '置顶'"
        >
          <icon-tdesign-pin v-if="!isPin" />
          <icon-tdesign-pin-filled v-else />
        </div>
        <div v-if="showMin" class="act-item" @click="minimize()" title="最小化">
          <icon-qlementine-icons-windows-minimize-16 />
        </div>
        <div
          v-if="showMax"
          class="act-item"
          @click="maximize()"
          :title="isMaximized ? '向下还原' : '最大化'"
        >
          <icon-qlementine-icons-windows-unmaximize-16 v-if="isMaximized" />
          <icon-qlementine-icons-windows-maximize-16 v-else />
        </div>
        <div v-if="showClose" class="act-item close" @click="close()" title="关闭">
          <icon-qlementine-icons-windows-close-16 />
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentWindow } from "@tauri-apps/api/window";
import { defineProps, ref, withDefaults } from "vue";

interface BasePanelProps {
  title: string;
  showSetting?: boolean;
  showClose?: boolean;
  showPin?: boolean;
  showMin?: boolean;
  showMax?: boolean;
  closeType?: number;
}

const props = withDefaults(defineProps<BasePanelProps>(), {
  showSetting: false,
  showClose: true,
  showPin: false,
  showMin: false,
  showMax: false,
  closeType: 1,
});

const isPin = ref<boolean>(false);
const isMaximized = ref<boolean>(false);
const isSetting = ref<boolean>(false);

function setting() {
  isSetting.value = !isSetting.value;
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
  height: 32px;
  background-color: white;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 14px;
  color: #a7a6aa;
  margin-left: 10px;
}

.acts {
  display: flex;
  align-items: center;
  height: 100%;
}

.act-item {
  width: 46px;
  height: 100%;
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
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }

  &.close {
    &:hover {
      background-color: #ed4c4c;
      color: white;
    }

    &:active {
      background-color: #e14949;
      color: white;
    }
  }
}

.rotate-icon {
  transform: rotate(-45deg);
}
</style>
