<template>
  <el-container class="layout-container">
    <el-header>
      <div class="toolbar">
        <div style="margin-left: 20px;">
          <span style="font-size: large;">智能冰柜管理系统</span>
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
          <span style="margin-right: 10px;">admin</span>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-container>
        <el-aside width="auto">
          <el-scrollbar style="height: auto">
            <el-menu background-color="#334058" text-color="#B5C0D0" unique-opened :collapse="isCollapse">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <House />
                  </el-icon>
                  <span>&nbsp;&nbsp;页面菜单&nbsp;&nbsp;&nbsp;</span>
                </template>
                <el-menu-item><el-icon>
                    <Setting />
                  </el-icon>系统首页</el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <Box />
                  </el-icon>
                  <span>&nbsp;&nbsp;管理菜单</span>
                </template>
                <el-menu-item index="2-1"><el-icon>
                    <Refrigerator />
                  </el-icon>设备管理</el-menu-item>
                <el-menu-item index="2-2"><el-icon>
                    <Present />
                  </el-icon>商品管理</el-menu-item>
                <el-menu-item index="2-3"><el-icon>
                    <Files />
                  </el-icon>库存管理</el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <Tickets />
                  </el-icon>
                  <span>&nbsp;&nbsp;记录菜单</span>
                </template>
                <el-menu-item index="3-1"><el-icon>
                    <DataAnalysis />
                  </el-icon>销售记录</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
          <div @click="toggleCollapse" style="position: fixed; bottom: 0">
            <el-icon style="margin-bottom: 15px; margin-left: 15px" :size="30" color="white">
              <Fold />
            </el-icon>
          </div>
        </el-aside>
      </el-container>

      <el-container>
        <el-main>
          <el-scrollbar>
            <el-table :data="tableData">
              <el-table-column prop="date" label="Date" width="140" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </el-scrollbar>
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
} from "@element-plus/icons-vue";

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 15 }).fill(item));
const isCollapse = ref(false);

function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
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
