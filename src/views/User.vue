<template>
  <div style="padding: 10px 0">
    <el-input
      class="ml-10"
      style="width: 220px"
      placeholder="ID"
      clearable
      @clear="load()"
      v-model="input_id"
      :prefix-icon="InfoFilled"
    /><el-input
      class="ml-10"
      style="width: 220px"
      placeholder="用户名"
      clearable
      @clear="load()"
      v-model="input_userName"
      :prefix-icon="User"
    />
    <el-date-picker
      class="ml-10"
      v-model="input_date"
      type="date"
      placeholder="日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      @clear="load()"
    />
    <el-input
      class="ml-10"
      style="width: 220px"
      placeholder="数量前后100的上架"
      clearable
      @clear="load()"
      v-model="input_shelves"
      :prefix-icon="ShoppingCartFull"
    />
    <el-input
      class="ml-10"
      style="width: 220px"
      placeholder="数量前后100的售出"
      clearable
      @clear="load()"
      v-model="input_sold"
      :prefix-icon="ShoppingCart"
    />
    <el-button type="primary" class="ml-10" :icon="Search" @click="load()"
      >搜索</el-button
    >
  </div>

  <div style="padding: 10px 10px">
    <el-button type="primary" :icon="Plus" @click="new_dialog = true"
      >新增</el-button
    >
    <el-popconfirm
      title="确定批量删除?"
      width="200"
      @confirm="batchDelete"
      cancel-button-text="我再想想"
    >
      <template #reference>
        <el-button type="danger" :icon="DocumentDelete">批量删除</el-button>
      </template>
    </el-popconfirm>
    <el-upload
      class="ml-10"
      v-model:action="server_url"
      :on-success="handleUpSuccess"
      :on-error="handleUpError"
      :limit="1"
      :on-exceed="handleExceed"
      accept=".xlsx"
      :show-file-list="false"
      style="display: inline-flex; top: 3px"
    >
      <el-button type="primary" :icon="FolderAdd">导入</el-button>
    </el-upload>
    <el-button type="primary" class="ml-10" :icon="DocumentCopy" @click="exp()"
      >导出</el-button
    >
  </div>

  <el-dialog v-model="new_dialog" title="新增用户">
    <el-form
      :model="register_form"
      :rules="register_rules"
      ref="ruleFormRef"
      status-icon
      hide-required-asterisk
    >
      <el-form-item label="用户名" :label-width="70" prop="userName">
        <el-input
          v-model="register_form.userName"
          :prefix-icon="UserFilled"
          placeholder="请输入1-20个字符作为你的用户名"
          clearable
          minlength="1"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="密码" :label-width="70" prop="password">
        <el-input
          v-model="register_form.password"
          :prefix-icon="Lock"
          placeholder="请输入6-30个字符作为你的密码"
          clearable
          show-password
          minlength="6"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="确认密码" :label-width="70" prop="confirmPassword">
        <el-input
          v-model="register_form.confirmPassword"
          :prefix-icon="Lock"
          placeholder="请重复输入一次你的密码"
          clearable
          show-password
          minlength="6"
          maxlength="30"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="new_dialog = false">取消</el-button>
        <el-button type="primary" @click="new_crofirm(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-table :data="tableData" @selection-change="selection">
    <el-table-column type="selection" width="30" />
    <el-table-column prop="id" label="ID" width="60" />
    <el-table-column prop="userName" label="用户名" />
    <el-table-column prop="createTime" label="注册时间" />
    <el-table-column prop="shelves" label="上架总数" />
    <el-table-column prop="sold" label="销售总数" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          :icon="Edit"
          @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-popconfirm
          title="确定删除?"
          width="200"
          @confirm="handleDelete(scope.row)"
          cancel-button-text="我再想想"
        >
          <template #reference>
            <el-button size="small" type="danger" :icon="DocumentDelete"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="edit_dialog" title="用户信息修改" width="25%">
    <el-form
      :model="edit_form"
      ref="ruleFormRef"
      label-width="80"
      :rules="edit_rules"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="edit_form.userName"
          :prefix-icon="UserFilled"
          placeholder="请输入1-20个字符作为你的新用户名"
          clearable
          minlength="1"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="注册时间" prop="createTime">
        <el-date-picker
          v-model="edit_form.createTime"
          type="datetime"
          placeholder="请选择新的时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="上架数" prop="shelves">
        <el-input
          v-model="edit_form.shelves"
          placeholder="请输入你的新上架数"
          clearable
        />
      </el-form-item>
      <el-form-item label="售出数" prop="sold">
        <el-input
          v-model="edit_form.sold"
          placeholder="请输入你的新售出数"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="edit_dialog = false">取消</el-button>
        <el-button type="primary" @click="edit_corfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <div class="ml-10" style="padding: 10px 0">
    <el-pagination
      v-model:current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      v-model:page-size="pageSize"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="load"
      @current-change="load"
    />
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref, watch } from "vue"
import {
  Search,
  Edit,
  DocumentDelete,
  Plus,
  DocumentCopy,
  FolderAdd,
  User,
  InfoFilled,
  ShoppingCartFull,
  ShoppingCart,
  UserFilled,
  Lock,
} from "@element-plus/icons-vue"
import { ElMessage, FormInstance, FormRules, genFileId } from "element-plus"
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus"
import request from "../utils/request"

interface Userinfor {
  id: Int32Array
  userName: string
  createTime: string
  shelves: Int32Array
  sold: Int32Array
}

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  records: string
  total: number
}

interface RServerResponse {
  data: RServerData
}

interface RServerData {
  code: string
  data: Array<string>
  msg: string
}

const tableData = ref()
const input_id = ref("")
const input_userName = ref("")
const input_date = ref([])
watch(input_date, (nv) => {
  if (nv == null) input_date.value = []
})
const input_shelves = ref("")
const input_sold = ref("")
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const new_dialog = ref(false)
const edit_dialog = ref(false)
const multipleSelection = ref<Userinfor[]>([])
const upload = ref<UploadInstance>()
const server = (inject("variable") as { server: string }).server
const server_url = ref(server + "/user/import")

const register_form = reactive({
  userName: "",
  password: "",
  confirmPassword: "",
})

const edit_form = reactive({
  id: "",
  userName: "",
  createTime: "",
  shelves: "",
  sold: "",
})

const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！"))
  } else {
    if (register_form.confirmPassword !== "") {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField("checkPass", () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码！"))
  } else if (value !== register_form.password) {
    callback(new Error("两次输入不一致！"))
  } else {
    callback()
  }
}

const register_rules = reactive<FormRules>({
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 20, message: "长度应该为1到20位", trigger: "blur" },
  ],
  password: [
    { min: 6, max: 30, message: "长度应该为6到30位", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
  confirmPassword: [
    { min: 6, max: 30, message: "长度应该为6到30位", trigger: "blur" },
    { validator: validatePass2, trigger: "blur" },
  ],
})

const edit_rules = reactive<FormRules>({
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 20, message: "长度应该为1到20位", trigger: "blur" },
  ],
  createTime: [{ required: true, message: "请输入注册时间", trigger: "blur" }],
  shelves: [
    { required: true, message: "请输入上架数量", trigger: "blur" },
    { type: "number", message: "请输入数字", trigger: "blur" },
  ],
  sold: [
    { required: true, message: "请输入售出数量", trigger: "blur" },
    { type: "number", message: "请输入数字", trigger: "blur" },
  ],
})

const clear = () => {
  Object.keys(register_form).map((key) => {
    delete register_form[key]
  })
  Object.keys(edit_form).map((key) => {
    delete edit_form[key]
  })
}

const load = () => {
  request
    .get<ServerResponse, ServerData>(
      "/user/page?pageNum=" +
        currentPage.value +
        "&pageSize=" +
        pageSize.value +
        "&id=" +
        input_id.value +
        "&userName=" +
        input_userName.value +
        "&createTime=" +
        input_date.value +
        "&shelves=" +
        input_shelves.value +
        "&sold=" +
        input_sold.value
    )
    .then((res) => {
      tableData.value = res.records
      total.value = res.total
    })
}

load()

const new_crofirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      request
        .post<RServerResponse, RServerData>("/user/register", register_form)
        .then((res) => {
          if (res.code === "200") {
            ElMessage({
              message: "注册成功",
              type: "success",
            })
            new_dialog.value = false
            currentPage.value = Math.ceil((total.value + 1) / pageSize.value)
            load()
            clear()
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

const handleEdit = (row: string) => {
  Object.assign(edit_form, row)
  edit_dialog.value = true
}

const edit_corfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      {
        request.post("/user?userName=", edit_form).then((res) => {
          if (res) {
            {
              ElMessage({
                message: "修改成功！",
                type: "success",
              })
              edit_dialog.value = false
              input_id.value = edit_form.id
              load()
              clear()
            }
          }
        })
      }
    } else {
      ElMessage({
        message: "输入不符合要求，请检查！",
        type: "error",
      })
    }
  })
}

const handleDelete = (row: string) => {
  Object.assign(edit_form, row)
  request.delete("/user/" + edit_form.id).then((res) => {
    if (res) {
      ElMessage({
        message: "删除成功！",
        type: "success",
      })
      load()
    }
  })
}

const selection = (val: Userinfor[]) => {
  multipleSelection.value = val
}

const batchDelete = () => {
  let ids = multipleSelection.value.map((v) => v.id)
  request.delete("/user/del/batch", { data: ids }).then((res) => {
    if (res) {
      ElMessage({
        message: "删除成功！",
        type: "success",
      })
      load()
    }
  })
}

const exp = () => {
  window.open(server + "/user/export")
}

const handleUpSuccess = () => {
  ElMessage.success("上传成功")
  load()
}

const handleUpError = () => {
  ElMessage.error("上传失败，请稍后再试")
}

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
</script>

<style scoped></style>
