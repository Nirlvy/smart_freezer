import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import "./assets/main.css";
import axios from "axios";

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
app.config.globalProperties.$axios = axios;

import { router } from "./router/index.js"
app.use(router)

app.mount("#app");
