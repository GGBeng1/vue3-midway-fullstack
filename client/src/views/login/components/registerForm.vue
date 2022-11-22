<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="form"
    status-icon
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="用户昵称" prop="name">
      <el-input v-model="form.name" autocomplete="off" clearable />
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" autocomplete="off" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="form.password"
        type="password"
        autocomplete="off"
        clearable
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="password1">
      <el-input
        v-model="form.password1"
        type="password"
        autocomplete="off"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { register } from '@/http/api/login'
import * as md5 from 'md5'

const ruleFormRef = ref<FormInstance>()

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 * @param captchaId - 验证码id
 * @param verifyCode - 验证码
 */
const form = reactive({
  username: '',
  name: '',
  password: '',
  password1: '',
})
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (form.password !== value) {
      callback(new Error('两次密码不一致'))
    }
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  password1: [{ validator: validatePassword, trigger: 'blur' }],
})
const emit = defineEmits(['changeType'])

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      let reqValue = { ...form }
      reqValue.password = md5(form.password)
      reqValue.password1 = md5(form.password1)
      const { data } = await register(reqValue)
      if (data.code === 200) {
        ElMessage({
          showClose: true,
          message: '注册成功',
          type: 'success',
        })
        emit('changeType', 'login')
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped></style>
