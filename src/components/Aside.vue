<template>
  <el-scrollbar style="height: auto">
    <el-menu
      background-color="#334058"
      text-color="#B5C0D0"
      unique-opened
      :collapse="isCollapse"
      router
      :default-active="curPath"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <House />
          </el-icon>
          <span>&nbsp;&nbsp;页面菜单&nbsp;&nbsp;&nbsp;</span>
        </template>
        <el-menu-item index="/home">
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
        <el-menu-item index="/user">
          <el-icon>
            <DataAnalysis />
          </el-icon>
          用户记录
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
</template>

<script lang="ts" setup>
import { ref } from "vue"
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
} from "@element-plus/icons-vue"
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"

const isCollapse = ref(false)
const route = useRoute()
const router = useRouter()
const curPath = ref(route.fullPath)
const menuList = ref(router.options.routes[0].children)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  console.log(menuList)
}
onBeforeRouteUpdate((to) => {
  curPath.value = to.path
})
</script>

<style scoped>
.layout-container .el-menu {
  border-right: none;
}
</style>
