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
              v-model="id"
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
            <el-button
              type="primary"
              class="ml-10"
              :icon="Search"
              @click="load()"
              >搜索</el-button
            >
          </div>

          <div class="ml-10" style="padding: 10px 0">
            <el-button type="primary" :icon="Plus">新增</el-button>
            <el-button type="danger" :icon="Minus">批量删除</el-button>
            <el-button type="primary" :icon="FolderAdd">导入</el-button>
            <el-button type="primary" :icon="DocumentCopy">导出</el-button>
          </div>

          <el-table :data="tableData">
            <el-table-column prop="id" label="ID" width="60" />
            <el-table-column prop="userName" label="用户名" width="300" />
            <el-table-column prop="createTime" label="注册时间" />
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button size="small" type="primary" :icon="Edit"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" :icon="DocumentDelete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="ml-10" style="padding: 10px 0">
            <el-pagination
              v-model:current-page="currentPage"
              :page-sizes="[5, 10, 15]"
              v-model:page-size="pageSize"
              :background="true"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
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
} from "@element-plus/icons-vue";

const tableData = ref("");
const isCollapse = ref(false);
const id = ref("");
const input_userName = ref("");
const input_date = ref("");
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

load();

function load() {
  fetch(
    "http://localhost:8080/user/page?pageNum=" +
      currentPage.value +
      "&pageSize=" +
      pageSize.value +
      "&id=" +
      id.value +
      "&userName=" +
      input_userName.value +
      "&createTime=" +
      input_date.value
  )
    .then((res) => res.json())
    .then(function (res) {
      tableData.value = res.records;
      total.value = res.total;
    });
}

function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}

function handleSizeChange() {
  load();
}

function handleCurrentChange() {
  load();
}
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
