import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { checkUserFinger } from '@/http/api/user'
export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfoData: Auth.UserInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : {
        userId: '',
        username: '',
      }
  const AuthState: ApiLogin.LoginResData = reactive({
    token: localStorage.getItem('token') || '',
    userInfo: userInfoData,
  })
  // 用户指纹
  const UserFinger = ref('')
  /**
   * Description 改变用户信息
   * @date 11/1/2022 - 3:54:37 PM
   * @author GGbeng
   *
   * @async
   * @param {ApiLogin.LoginResData} data
   * @returns {*}
   */
  const ChangeAuthState = async (data: ApiLogin.LoginResData) => {
    AuthState.token = data.token
    AuthState.userInfo = data.userInfo
    localStorage.setItem('token', data.token)
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
  }
  const ClearAuthState = async () => {
    AuthState.token = ''
    AuthState.userInfo = {
      userId: '',
      username: '',
      name: '',
    }
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }
  const InitAndCheckUserFinger = async () => {
    if (!UserFinger.value) {
      const fpPromise = FingerprintJS.load()
      const fp = await fpPromise
      const result = await fp.get()
      UserFinger.value = result.visitorId
    }
    if (!AuthState.userInfo.username) return
    const res = await checkUserFinger({
      userFinger: UserFinger.value,
      username: AuthState.userInfo.username,
    })
    const { code } = res.data
    if (code === 200) {
      return true
    } else {
      ClearAuthState()
      return false
    }
  }
  return {
    AuthState,
    UserFinger,
    ChangeAuthState,
    ClearAuthState,
    InitAndCheckUserFinger,
  }
})
