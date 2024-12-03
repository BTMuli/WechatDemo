<template>
  <BasePanel :show-login="true" :show-close="true">
    <template #title>微信-配置</template>
    <div class="home-config-view">
      <div class="title">网络代理设置</div>
      <div class="radios">
        <span>使用代理</span>
        <ElRadioGroup v-model="useProxy">
          <ElRadio :value="false">关闭</ElRadio>
          <ElRadio :value="true">开启</ElRadio>
        </ElRadioGroup>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";

import BasePanel from "@/Layouts/BasePanel.vue";
import { useAppStore } from "@/store/modules/app.js";

const { useProxy } = storeToRefs(useAppStore());
</script>
<style lang="scss" scoped>
.home-config-view {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  row-gap: 20px;
}

.title {
  margin-top: 30px;
  font-size: 18px;
}

.radios {
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 20px;
  color: #999999;
  font-size: 14px;
}
</style>
