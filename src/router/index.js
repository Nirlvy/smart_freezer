import { createRouter, createWebHashHistory } from "vue-router"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
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
        {
          path: "person",
          name: "个人信息",
          component: () => import("../views/Person.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/Register.vue"),
    },
  ],
})
