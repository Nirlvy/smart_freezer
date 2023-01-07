import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("../views/Manage.vue"),
      children: [
        {
          path: "user",
          meta: { label: "用户" },
          component: () => import("../views/User.vue"),
        },
        {
          path: "home",
          meta: { label: "首页" },
          component: () => import("../views/Home.vue"),
        },
      ],
    },
  ],
});
