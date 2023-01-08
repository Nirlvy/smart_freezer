import { createRouter, createWebHashHistory } from "vue-router"

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
          name: "用户记录",
          component: () => import("../views/User.vue"),
        },
        {
          path: "home",
          component: () => import("../views/Home.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
    },
  ],
})
