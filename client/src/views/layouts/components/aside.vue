<template>
  <el-menu
    class="el-menu-vertical-list h-full"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>
        <i i="ep-location" class="w4 h4 text-center text-[18px] mr-[5px]"></i>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <i i="ep-menu" class="w4 h4 text-center text-[18px] mr-[5px]"></i>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i i="ep-document" class="w4 h4 text-center text-[18px] mr-[5px]"></i>
      <template #title>Navigator Three</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
const isCollapse = ref(false)
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-list:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
