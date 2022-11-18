import Request from '../index'
// 用户登录
export const checkUserFinger = (params: UserFinger) => {
  return Request.post<boolean>('/check-user-finger', params)
}
