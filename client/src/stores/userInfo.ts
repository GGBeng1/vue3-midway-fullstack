export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfoData: Auth.UserInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : {
        userId: '',
        userName: '',
      }
  const AuthState: ApiLogin.LoginResData = reactive({
    token: localStorage.getItem('token') || '',
    userInfo: userInfoData,
  })

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

  return { AuthState, ChangeAuthState }
})
