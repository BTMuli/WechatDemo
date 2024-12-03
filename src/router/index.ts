import { createRouter, createWebHashHistory } from "vue-router";

import appRoutes from "@/router/modules/app.js";

const routes = [...appRoutes];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
