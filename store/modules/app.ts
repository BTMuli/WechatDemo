import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {}, {
  persist: [
    {
      key: "nav",
      storage: window.localStorage,
    },
  ],
});
