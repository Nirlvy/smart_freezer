<template>
  <div class="toolbar">
    <div style="margin-left: 20px">
      <span style="font-size: large">智能冰柜管理系统</span>
      <el-breadcrumb
        style="display: inline-block; margin-left: 20px; font-size: 16px"
        ><el-breadcrumb-item class="breadcrumb a" :to="paths.path">{{
          paths.meta.label
        }}</el-breadcrumb-item
        ><el-breadcrumb-item>用户信息</el-breadcrumb-item></el-breadcrumb
      >
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
</template>

<script lang="ts" setup>
import { Setting } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const paths = ref(useRouter().currentRoute.value);
const log = () => {
  console.log(useRouter().currentRoute.value);
};
log();
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.breadcrumb >>> .el-breadcrumb__inner {
  color: white;
  font-weight: 400;
  /* color: var(--el-text-color-primary); */
}

.a:hover >>> .el-breadcrumb__inner {
  color: #388ae6;
}
</style>
