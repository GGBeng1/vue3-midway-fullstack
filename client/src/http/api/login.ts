import Request from '../index'
// 用户登录
export const login = (params: ApiLogin.LoginReqForm) => {
  return Request.post<ApiLogin.LoginResData>('/login', params)
}
// 用户退出
export const loginOut = () => {
  return Request.post<ApiLogin.LoginResData>('/login-out')
}
// 用户注册
export const register = (params: ApiLogin.RegisterReqForm) => {
  return Request.post<ApiLogin.RegisterResData>('/register', params)
}
// 获取验证码
export const getCaptcha = () => {
  return Request.get<ApiLogin.LoginCaptcha>('/get-image-captcha')
}
