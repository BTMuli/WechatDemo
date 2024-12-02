<script lang="ts" setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { reactive } from "vue";

const locale = zhCn;
const config = reactive({ max: 1 });
</script>

<template>
  <ElConfigProvider :locale="locale" :message="config">
    <router-view />
  </ElConfigProvider>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
