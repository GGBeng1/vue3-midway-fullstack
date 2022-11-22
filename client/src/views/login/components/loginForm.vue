<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="form"
    status-icon
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="验证码">
      <div class="flex w-full items-center relative">
        <el-input
          v-model="form.verifyCode"
          placeholder="图片验证码"
          maxlength="4"
          @keyup.enter="submitForm(ruleFormRef)"
        />

        <captcha
          ref="captcha"
          @refresh="handlerRefreshCaptcha"
          :base64="base64"
        />
      </div>
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
import { useUserInfoStore } from '@/stores/userInfo'
import { login, getCaptcha } from '@/http/api/login'
import Captcha from './captcha.vue'
import * as md5 from 'md5'
// 存储用户信息
const store = useUserInfoStore()
const { UserFinger } = storeToRefs(store)
const { ChangeAuthState } = store
const router = useRouter()

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
  password: '',
  verifyCode: '',
  captchaId: '',
})

const base64 = ref('') // 验证码base64图片
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' },
  ],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      let reqValue = Object.assign({}, form, { userFinger: UserFinger.value })
      reqValue.password = md5(reqValue.password)
      let res = await login(reqValue)
      let { code, data } = res.data
      if (code === 200) {
        await ChangeAuthState(data)
        router.push('/welcome')
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
const handlerRefreshCaptcha = () => {
  getCaptcha().then(res => {
    let { code, data } = res.data
    if (code === 200) {
      form.captchaId = data.id
      base64.value = data.imageBase64
    }
  })
}
onMounted(async () => {
  handlerRefreshCaptcha()
  await store.InitAndCheckUserFinger()
})
</script>

<style lang="scss" scoped></style>
