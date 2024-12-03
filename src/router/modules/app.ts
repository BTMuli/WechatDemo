import { RouteRecordRaw } from "vue-router";

const appRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "首页",
    redirect: "/login",
  },
  {
    path: "/login/:type?",
    name: "登录",
    component: () => import("@/views/Home/LoginView.vue"),
  },
  {
    path: "/register",
    name: "注册",
    component: () => import("@/views/Home/RegisterView.vue"),
  },
  {
    path: "/setting",
    name: "设置（首页）",
    component: () => import("@/views/Home/ConfigView.vue"),
  },
];

export default appRoutes;
