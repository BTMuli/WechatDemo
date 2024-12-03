import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    const isLogin = ref<boolean>(false);
    const useProxy = ref<boolean>(false);
    return {
      isLogin,
      useProxy,
    };
  },
  {
    persist: [
      {
        key: "app",
        storage: localStorage,
        pick: ["isLogin", "useProxy"],
      },
    ],
  },
);
