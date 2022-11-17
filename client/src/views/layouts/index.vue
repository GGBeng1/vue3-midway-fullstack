<template>
  <div class="common-layout h-full">
    <el-container>
      <el-header class="common-layout_header flex justify-between items-center">
        <div>header</div>
        <div class="h-full flex-center">
          <button @click="toggleDark()" class="btn-theme">
            <i inline-block align-middle i="dark:ep-moon ep-sunny" />
            <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
          </button>
        </div>
        <el-button text type="primary" @click="handlerLoginOut">登出</el-button>
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
import { useUserInfoStore } from '@/stores/userInfo'
import { loginOut } from '@/http/api/login'
// 存储用户信息
const store = useUserInfoStore()
const router = useRouter()
// const { AuthState } = storeToRefs(store)
// console.log(AuthState)
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 登出
const handlerLoginOut = async () => {
  let res = await loginOut()
  let { code, data } = res.data
  if (code === 200 && data) {
    await store.ClearAuthState()
    ElMessage.success('登出成功')
    router.push('/login')
  }
}
</script>
<style lang="scss" scoped>
.common-layout {
  .el-container {
    height: 100%;
  }
  &_header {
    background-color: var(--el-color-info-light-3);
    .btn-theme {
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
