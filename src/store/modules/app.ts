import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    const isLogin = ref<boolean>(false);

    return {
      isLogin,
    };
  },
  {
    persist: [
      {
        key: "app",
        storage: localStorage,
        pick: ["isLogin"],
      },
    ],
  },
);
