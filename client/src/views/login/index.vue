<template>
  <div class="wh-full flex-center">
    <el-card style="width: 350px">
      <template #header>
        <div class="flex items-center justify-between">
          <template v-if="type === 'register'">
            <span>注册</span>
            <el-button type="primary" text @click="handlerchangeType('login')"
              >登录</el-button
            ></template
          >
          <template v-else>
            <span>登录</span>
            <el-button
              type="primary"
              text
              @click="handlerchangeType('register')"
              >注册</el-button
            >
          </template>
        </div>
      </template>
      <loginForm v-if="type === 'login'"></loginForm>
      <registerForm
        v-if="type === 'register'"
        @changeType="handlerchangeType"
      ></registerForm>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import loginForm from './components/loginForm.vue'
import registerForm from './components/registerForm.vue'

type TypeVlaue = 'login' | 'register' // 登录类型

const type: Ref<TypeVlaue> = ref('login')

const handlerchangeType = (typeValue: TypeVlaue) => {
  type.value = typeValue
}
</script>
