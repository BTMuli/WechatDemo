<template>
  <BasePanel title="微信" :show-setting="true" :show-close="true">
    <!-- 快速登录页面 -->
    <AutoLoginView :changeAccount="changeAccount" :isLogin="isLogin" v-if="isLogin" />
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

const router = useRoute();
const type = router.params.type;
const isLogin = ref<boolean>(type !== "pass");

function changeAccount() {
  isLogin.value = !isLogin.value;
}
</script>
<style lang="scss" scoped></style>
