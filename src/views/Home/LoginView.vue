<template>
  <BasePanel title="微信-登录" :show-setting="true" :show-close="true">
    <!-- 快速登录页面 -->
    <AutoLoginView v-if="isLogin" />
    <!-- 普通登录页面 -->
    <GeneralLoginView v-else />
  </BasePanel>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";

import BasePanel from "@/Layouts/BasePanel.vue";
import { useAppStore } from "@/store/modules/app.js";
import AutoLoginView from "@/views/Home/AutoLoginView.vue";
import GeneralLoginView from "@/views/Home/GeneralLoginView.vue";

const { isLogin } = storeToRefs(useAppStore());
</script>
<style lang="scss" scoped></style>
