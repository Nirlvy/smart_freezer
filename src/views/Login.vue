<template>
  <div class="wrapper">
    <div class="wrapper-overlay" :class="{ focus: blur }" />
    <div
      class="windows"
      :class="{ focus: blur }"
      @mouseenter="blur = true"
      @mouseleave="blur = false"
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>智能冰柜管理系统</b>
      </div>
      <el-form :model="user" :rules="rules" ref="ruleFormRef">
        <el-form-item prop="userName">
          <el-input
            size="large"
            style="margin: 10px 0"
            :prefix-icon="UserFilled"
            v-model="user.userName"
            placeholder="用户名"
            autocomplete
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            style="margin: 10px 0"
            :prefix-icon="Lock"
            show-password
            v-model="user.password"
            placeholder="密码"
            autocomplete
            clearable
          />
        </el-form-item>
        <el-form-item class="el-form-button">
          <el-button
            type="primary"
            size="large"
            round
            @click="login(ruleFormRef)"
          >
            登录
          </el-button>
          <el-button
            type="success"
            size="large"
            round
            @click="router.push('/register')"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { Lock, UserFilled } from "@element-plus/icons-vue"
import request from "../utils/request"
import { ElMessage, FormInstance, FormRules } from "element-plus"
import { useRouter } from "vue-router"

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  code: string
  data: Array<string>
  msg: string
}

const user = reactive({
  userName: "",
  password: "",
})
const blur = ref(false)
const router = useRouter()
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 20, message: "长度应该为1到20位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 30, message: "长度应该为6到30位", trigger: "blur" },
  ],
})
const ruleFormRef = ref<FormInstance>()

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      request
        .post<ServerResponse, ServerData>("/user/login", user)
        .then((res) => {
          if (res.code === "200") {
            localStorage.setItem("user", JSON.stringify(res.data))
            router.push("/home")
            ElMessage({
              message: "登录成功",
              type: "success",
            })
          } else {
            ElMessage({
              message: res.msg,
              type: "error",
            })
          }
        })
    }
  })
}
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.wrapper-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: linear-gradient(to bottom right, #fc466b, #3f5efb); */
  background-image: url(../assets/Cupoi吃咖喱的poi_Cupoi吃咖喱的poi_林中小屋_98928714_p0.jpg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
  will-change: filter;
  filter: blur(0px);
  transition: filter 0.3s ease-in-out;
}
.wrapper-overlay.focus {
  filter: blur(20px);
}
.windows {
  position: relative;
  z-index: 1;
  margin: 200px auto;
  background-color: #fff;
  width: 350px;
  height: 310px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  will-change: scale, opacity;
  scale: (1);
  opacity: 0.2;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.windows.focus {
  transform: scale(1.2);
  opacity: 0.8;
}

.el-form-button :deep() .el-form-item__content {
  text-align: right;
  display: block;
}
</style>
