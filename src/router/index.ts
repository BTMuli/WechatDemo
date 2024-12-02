import { createRouter, createWebHashHistory } from "vue-router";

import mainRoutes from "./modules/main.js";

const routes = [...mainRoutes];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
