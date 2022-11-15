<template>
  <div class="common-layout h-full">
    <el-container>
      <el-header class="common-layout_header flex justify-between items-center">
        <div>header</div>
        <div class="h-full flex-center">
          <button @click="toggleDark()">
            <i inline-block align-middle i="dark:ep-moon ep-sunny" />
            <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
          </button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto" class="common-layout_aside"
          ><asideComponent></asideComponent
        ></el-aside>
        <el-main><RouterView></RouterView></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import asideComponent from './components/aside.vue'
import { useDark, useToggle } from '@vueuse/core'
// import { useUserInfoStore } from '@/stores/userInfo'

// 存储用户信息
// const store = useUserInfoStore()
// const { AuthState } = storeToRefs(store)
// console.log(AuthState)
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<style lang="scss" scoped>
.common-layout {
  .el-container {
    height: 100%;
  }
  &_header {
    background-color: var(--el-color-info-light-3);
    button {
      padding: 3px 15px;
      background-color: #44bd87;
      border: none;
      outline: none;
      color: #fff;
      margin: 0.5rem 0;
      border-bottom: 2px solid #33a06f;
      text-shadow: 1px 1px 1px #33a06f;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
      vertical-align: middle;
    }
  }
  // &_aside {
  // background-color: var(--el-color-info-light-3);
  // }
}
</style>
