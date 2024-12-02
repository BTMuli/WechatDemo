<template>
  <BasePanel title="微信" :show-setting="true" :show-close="true">
    <!-- 快速登录页面 -->
    <AutoLoginView v-if="isLogin" />
    <!-- 普通登录页面 -->
    <GeneralLoginView v-else />
  </BasePanel>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import BasePanel from "@/Layouts/BasePanel.vue";
import AutoLoginView from "@/views/AutoLoginView.vue";
import GeneralLoginView from "@/views/GeneralLoginView.vue";

const type = useRoute().params.type;
const isLogin = ref<boolean>(type !== "pass");
</script>
<style lang="scss" scoped></style>
