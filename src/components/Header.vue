<template>
  <div class="toolbar">
    <div style="margin-left: 20px">
      <span style="font-size: large">智能冰柜管理系统</span>
      <el-breadcrumb
        style="display: inline-block; margin-left: 20px; font-size: 16px"
        ><el-breadcrumb-item class="breadcrumb" :to="{ path: '/' }"
          >首页</el-breadcrumb-item
        ><template v-for="(item, index) in breadList"
          ><el-breadcrumb-item v-if="item.name" :key="index" :to="item.path">{{
            item.name
          }}</el-breadcrumb-item></template
        ></el-breadcrumb
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
import { Setting } from "@element-plus/icons-vue"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const breadList = ref(route.matched)
watch(route, () => {
  breadList.value = route.matched
})
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.breadcrumb :deep() .el-breadcrumb__inner {
  color: white;
  font-weight: 400;
  /* color: var(--el-text-color-primary); */
}

.breadcrumb:hover :deep() .el-breadcrumb__inner {
  color: #388ae6;
}
</style>
