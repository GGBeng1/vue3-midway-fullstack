import type { MockMethod } from 'vite-plugin-mock'
const apis: MockMethod[] = [
  // 获取验证码
  {
    url: '/mock/login',
    method: 'post',
    response: (): ApiRequest.Result<ApiLogin.LoginResData> => {
      return {
        code: 200,
        message: 'ok',
        data: {
          token: '123456',
          userInfo: {
            userId: '123456',
            userName: 'admin',
          },
        },
      }
    },
  },
]

export default apis
