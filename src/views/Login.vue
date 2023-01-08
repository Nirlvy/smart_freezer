<template>
  <div class="wrapper">
    <div class="wrapper-overlay" :class="{ focus: blur }" ref="divFocus" />
    <div class="windows" :class="{ focus: blur }">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>登 录</b>
      </div>
      <el-input
        size="large"
        style="margin: 10px 0"
        :prefix-icon="UserFilled"
        v-model="user.userName"
        placeholder="用户名"
        autocomplete
        clearable
        @blur="inBlur"
        @focus="inFocus"
      />
      <el-input
        size="large"
        style="margin: 10px 0"
        :prefix-icon="Lock"
        show-password
        v-model="user.password"
        placeholder="密码"
        autocomplete
        clearable
        @blur="inBlur"
        @focus="inFocus"
      />
      <div style="margin: 10px 0; text-align: right">
        <el-button type="primary" size="large" round> 登录 </el-button>
        <el-button type="success" size="large" round> 注册 </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue"
import { Lock, UserFilled } from "@element-plus/icons-vue"

// const name = ref("Login")
const user = reactive({
  userName: "",
  password: "",
})
const blur = ref(false)
const divFocus = ref()

onMounted(() => {
  console.dir(divFocus.value)
})
watch(divFocus, (nv) => {
  console.log(nv)
  nv.addEventListener("focus", () => {
    console.log("Input focused")
  })
})

const inBlur = () => {
  blur.value = false
  console.log(blur.value)
}
const inFocus = () => {
  blur.value = true
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
  background-image: url(../ATDAN-_ATDAN-_Sakura_96707717_p0.jpg);
  transition: filter 0.3s ease-in-out;
}
.wrapper-overlay.focus {
  filter: blur(40px);
}
.windows {
  position: relative;
  z-index: 1;
  margin: 300px auto;
  background-color: #fff;
  width: 350px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0.6;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.windows.focus {
  transform: scale(1.5);
  opacity: 0.8;
}
</style>
