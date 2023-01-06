<template>
  <el-container class="layout-container">
    <el-header>
      <div class="toolbar">
        <div style="margin-left: 20px">
          <span style="font-size: large">智能冰柜管理系统</span>
        </div>
        <div>
          <el-dropdown style="width: 30px float: right;">
            <el-icon style="margin-right: 8px; margin-top: 1px" :size="20">
              <setting />
            </el-icon>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span style="margin-right: 20px">admin</span>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-container>
        <el-aside>
          <el-scrollbar style="height: auto">
            <el-menu
              background-color="#334058"
              text-color="#B5C0D0"
              unique-opened
              :collapse="isCollapse"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <House />
                  </el-icon>
                  <span>&nbsp;&nbsp;页面菜单&nbsp;&nbsp;&nbsp;</span>
                </template>
                <el-menu-item>
                  <el-icon>
                    <Setting />
                  </el-icon>
                  系统首页
                </el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <Box />
                  </el-icon>
                  <span>&nbsp;&nbsp;管理菜单</span>
                </template>
                <el-menu-item index="2-1">
                  <el-icon>
                    <Refrigerator />
                  </el-icon>
                  设备管理
                </el-menu-item>
                <el-menu-item index="2-2">
                  <el-icon>
                    <Present />
                  </el-icon>
                  商品管理
                </el-menu-item>
                <el-menu-item index="2-3">
                  <el-icon>
                    <Files />
                  </el-icon>
                  库存管理
                </el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <Tickets />
                  </el-icon>
                  <span>&nbsp;&nbsp;记录菜单</span>
                </template>
                <el-menu-item index="3-1">
                  <el-icon>
                    <DataAnalysis />
                  </el-icon>
                  销售记录
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
          <div @click="toggleCollapse" style="position: fixed; bottom: 0">
            <el-icon
              style="margin-bottom: 15px; margin-left: 15px"
              :size="30"
              color="white"
            >
              <Fold />
            </el-icon>
          </div>
        </el-aside>
      </el-container>

      <el-container>
        <el-main>
          <div style="padding: 10px 0">
            <el-input
              class="ml-10"
              style="width: 220px"
              placeholder="ID"
              clearable
              v-model="input_id"
              :prefix-icon="InfoFilled"
            /><el-input
              class="ml-10"
              style="width: 220px"
              placeholder="用户名"
              clearable
              v-model="input_userName"
              :prefix-icon="User"
            />
            <el-date-picker
              class="ml-10"
              v-model="input_date"
              type="date"
              placeholder="日期"
              value-format="YYYY-MM-DD"
            />
            <el-input
              class="ml-10"
              style="width: 220px"
              placeholder="数量前后100的上架"
              clearable
              v-model="input_shelves"
              :prefix-icon="ShoppingCartFull"
            />
            <el-input
              class="ml-10"
              style="width: 220px"
              placeholder="数量前后100的售出"
              clearable
              v-model="input_sold"
              :prefix-icon="ShoppingCart"
            />
            <el-button
              type="primary"
              class="ml-10"
              :icon="Search"
              @click="load()"
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
                <el-button type="danger" :icon="DocumentDelete"
                  >批量删除</el-button
                >
              </template>
            </el-popconfirm>
            <el-button type="primary" :icon="FolderAdd">导入</el-button>
            <el-button type="primary" :icon="DocumentCopy">导出</el-button>
          </div>
          <el-dialog v-model="new_dialog" title="新增用户">
            <el-form :model="register_form">
              <el-form-item label="用户名" :label-width="70">
                <el-input
                  v-model="register_form.userName"
                  placeholder="请输入1-20个字符作为你的用户名"
                  clearable
                  minlength="1"
                  maxlength="20"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item label="密码" :label-width="70">
                <el-input
                  v-model="register_form.password"
                  placeholder="请输入6-30个字符作为你的密码"
                  clearable
                  show-password
                  minlength="6"
                  maxlength="30"
                />
              </el-form-item>
              <el-form-item label="确认密码" :label-width="70">
                <el-input
                  v-model="register_form.comfirmPassword"
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
                <el-button type="primary" @click="new_crofirm">
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
          <el-dialog v-model="edit_dialog" title="用户信息修改">
            <el-form :model="edit_form">
              <el-form-item label="用户名" :label-width="70">
                <el-input
                  v-model="edit_form.userName"
                  placeholder="请输入1-20个字符作为你的新用户名"
                  clearable
                  minlength="1"
                  maxlength="20"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item label="注册时间" :label-width="70">
                <el-date-picker
                  v-model="edit_form.createTime"
                  type="date"
                  placeholder="请选择新的时间"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
              <el-form-item label="上架数" :label-width="70">
                <el-input
                  v-model="edit_form.shelves"
                  placeholder="请输入你的新上架数"
                  clearable
                />
              </el-form-item>
              <el-form-item label="售出数" :label-width="70">
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
                <el-button type="primary" @click="edit_corfirm">
                  确定
                </el-button>
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
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
  Menu as House,
  Refrigerator,
  Present,
  Box,
  Tickets,
  Setting,
  Fold,
  Files,
  DataAnalysis,
  Search,
  Edit,
  DocumentDelete,
  Plus,
  Minus,
  DocumentCopy,
  FolderAdd,
  User,
  InfoFilled,
Van,
ShoppingCartFull,
ShoppingCart,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import request from "../utils/request";

interface User {
  id: Int32Array;
  userName: string;
  createTime: string;
  shelves: Int32Array;
  sold: Int32Array;
}

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  records: string;
  total: number;
}

const tableData = ref();
const isCollapse = ref(false);
const input_id = ref("");
const input_userName = ref("");
const input_date = ref("");
const input_shelves = ref("");
const input_sold = ref("");
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const new_dialog = ref(false);
const edit_dialog = ref(false);
const multipleSelection = ref<User[]>([]);

const register_form = reactive({
  userName: "",
  password: "",
  comfirmPassword: "",
});

const edit_form = reactive({
  id: "",
  userName: "",
  createTime: "",
  shelves: "",
  sold: "",
});

const clear = () => {
  Object.keys(register_form).map((key) => {
    delete register_form[key];
  });
  Object.keys(edit_form).map((key) => {
    delete edit_form[key];
  });
};

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
    .then(function (res) {
      tableData.value = res.records;
      total.value = res.total;
    });
};

load();

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const new_crofirm = () => {
  if (
    register_form.userName.length >= 1 &&
    register_form.userName.length <= 20 &&
    register_form.password.length >= 6 &&
    register_form.password.length <= 30 &&
    register_form.password == register_form.comfirmPassword
  ) {
    request.post("/user?userName=", register_form).then((res) => {
      if (res) {
        {
          ElMessage({
            message: "注册成功！",
            type: "success",
          });
          new_dialog.value = false;
          currentPage.value = Math.ceil((total.value + 1) / pageSize.value);
          load();
          clear();
        }
      }
    });
  } else {
    ElMessage({
      message: "你输入的用户名密码不符合规范或者两次输入密码不同！",
      type: "error",
    });
  }
};

const handleEdit = (row: string) => {
  Object.assign(edit_form, row);
  edit_dialog.value = true;
};

const edit_corfirm = () => {
  if (
    edit_form.userName.length >= 1 &&
    edit_form.userName.length <= 20 &&
    edit_form.createTime != null &&
    edit_form.shelves != null &&
    edit_form.sold != null &&
    typeof edit_form.shelves === "number" &&
    !isNaN(edit_form.shelves) &&
    typeof edit_form.sold === "number" &&
    !isNaN(edit_form.sold) &&
    edit_form.shelves >= edit_form.shelves
  ) {
    request.post("/user?userName=", edit_form).then((res) => {
      if (res) {
        {
          ElMessage({
            message: "修改成功！",
            type: "success",
          });
          edit_dialog.value = false;
          input_id.value = edit_form.id;
          load();
          clear();
        }
      }
    });
  } else {
    ElMessage({
      message: "输入不符合要求，请检查！",
      type: "error",
    });
  }
};

const handleDelete = (row: string) => {
  Object.assign(edit_form, row);
  request.delete("/user/" + edit_form.id).then((res) => {
    if (res) {
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      load();
    }
  });
};

const selection = (val: User[]) => {
  multipleSelection.value = val;
};

const batchDelete = () => {
  let ids = multipleSelection.value.map((v) => v.id);
  request.delete("/user/del/batch", { data: ids }).then((res) => {
    if (res) {
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      load();
    }
  });
};
</script>

<style scoped>
.layout-container .el-header {
  position: relative;
  background-color: #263146;
  color: white;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: #334058;
  width: auto;
}

.layout-container .el-menu {
  border-right: none;
}

.layout-container .el-main {
  padding: 0;
}

.layout-container .toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
