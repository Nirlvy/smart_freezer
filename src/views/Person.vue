<template>
  <el-form
    label-width="80px"
    :model="user"
    :rules="rules"
    ref="ruleFormRef"
    status-icon
    style="margin: 30px; width: 600px"
  >
    <el-upload
      class="avatar-uploader"
      action="http://localhost:8080/file/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.img" :src="user.img" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-form-item prop="userName" label="用户名">
      <el-input
        :prefix-icon="UserFilled"
        v-model="user.userName"
        placeholder="请输入1-20个字符作为你的新用户名"
        clearable
        minlength="1"
        maxlength="20"
        show-word-limit
      />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        :prefix-icon="Lock"
        show-password
        v-model="user.password"
        placeholder="请输入6-30个字符作为你的新密码"
        clearable
        minlength="6"
        maxlength="30"
      />
    </el-form-item>
    <el-form-item prop="confirm_password" label="确认密码">
      <el-input
        :prefix-icon="Lock"
        show-password
        v-model="user.confirmPassword"
        placeholder="请重复输入一次你的新密码"
        clearable
        minlength="6"
        maxlength="30"
      />
    </el-form-item>
    <el-form-item prop="createTime" label="创建时间">
      <el-date-picker
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        v-model="user.createTime"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="请输入新的时间"
        clearable
      /> </el-form-item
    ><el-form-item prop="shelves" label="上架数">
      <el-input
        :prefix-icon="ShoppingCartFull"
        v-model="user.shelves"
        placeholder="请输入你的新上架数"
        clearable
      />
    </el-form-item>
    <el-form-item prop="sold" label="售出数">
      <el-input
        :prefix-icon="ShoppingCart"
        v-model="user.sold"
        placeholder="请输入你的新售出数"
        clearable
      />
    </el-form-item>
    <el-form-item class="el-form-button">
      <el-button
        type="primary"
        size="large"
        round
        @click="confirm(ruleFormRef)"
      >
        确认修改
      </el-button>
      <el-button
        type="success"
        size="large"
        round
        @click="router.push('/home')"
      >
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {
  Lock,
  ShoppingCart,
  ShoppingCartFull,
  UserFilled,
  Plus,
} from "@element-plus/icons-vue"
import {
  FormRules,
  FormInstance,
  ElMessage,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  UploadProps,
} from "element-plus"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import request from "../utils/request"

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  code: string
  data: Array<string>
  msg: string
}

interface LServerResponse {
  data: ServerData
}

interface LServerData {
  records: object
  total: number
}

const localuser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "0")
  : {}

const user = reactive({
  id: "",
  userName: "",
  password: "",
  confirmPassword: "",
  createTime: "",
  shelves: "",
  sold: "",
  img: "",
})

const load = () => {
  request
    .get<LServerResponse, LServerData>(
      "/user/page?pageNum=1" + "&pageSize=1" + "&userName=" + localuser.userName
    )
    .then((res) => {
      Object.assign(user, res.records[0])
    })
}

load()

const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (user.confirmPassword !== "") {
    console.log(1)
    if (value !== user.password) {
      callback(new Error("两次输入不一致！"))
    } else {
      callback()
    }
  }
  callback()
}

const rules = reactive<FormRules>({
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 20, message: "长度应该为1到20位", trigger: "blur" },
  ],
  password: [
    { min: 6, max: 30, message: "长度应该为6到30位", trigger: "blur" },
  ],
  confirm_password: [
    { min: 6, max: 30, message: "长度应该为6到30位", trigger: "blur" },
    { validator: validatePass2, trigger: "blur" },
  ],
  createTime: [{ required: true, message: "请输入时间", trigger: "blur" }],
  shelves: [
    { required: true, message: "请输入上架数量", trigger: "blur" },
    { type: "number", message: "请输入数字", trigger: "blur" },
  ],
  sold: [
    { required: true, message: "请输入销售数量", trigger: "blur" },
    { type: "number", message: "请输入数字", trigger: "blur" },
  ],
})

const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      request.post<ServerResponse, ServerData>("/user", user).then((res) => {
        if (res) {
          ElMessage({
            message: "修改成功",
            type: "success",
          })
          router.push("/home")
        } else {
          ElMessage({
            message: "修改失败",
            type: "error",
          })
        }
      })
    }
  })
}

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  user.img = response
  let newuserinfo = JSON.parse(localStorage.getItem("user") || "0")
  newuserinfo.img = response
  newuserinfo.userName = user.userName
  localStorage.setItem("user", JSON.stringify(newuserinfo))
  request.post<ServerResponse, ServerData>("/user", user).then((res) => {
    if (res) {
      ElMessage.success("修改成功")
    } else {
      ElMessage.error("修改失败")
    }
  })
  setTimeout(() => {
    location.reload()
  }, 2000)
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像必须为 JPG 或者 PNG 格式!")
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像不能大于2MB!")
    return false
  }
  return true
}
</script>

<style scoped>
.el-form-button :deep() .el-form-item__content {
  text-align: right;
  display: block;
}

.avatar-uploader {
  text-align: center;
  padding: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
