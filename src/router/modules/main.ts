import { RouteRecordRaw } from "vue-router";

import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "首页",
    redirect: "/login",
  },
  {
    path: "/login/:type?",
    name: "登录",
    component: Login,
  },
  {
    path: "/register",
    name: "注册",
    component: Register,
  },
  // {
  //   path: "/home",
  //   name: "主页",
  //   component: Home,
  // },
];

export default mainRoutes;
