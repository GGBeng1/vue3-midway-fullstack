declare namespace ApiRequest {
  /**
   * 后端返回值内容
   * @param code - 状态码 200为正确
   * @param message - 提示信息
   * @param data - 返回值
   */
  type Result<T> = {
    code: number
    message?: string
    data: T
  }
  /**
   * @property {boolean} loading - 是否显示加载状态，默认为true
   * @property {string} loadingText - 加载请求时显示的文本。
   * @property {boolean} errorTip - 是否显示错误信息，默认为true
   */
  type reqConfig = {
    loading?: boolean
    loadingText?: string
    errorTip?: boolean
  }
}

declare namespace ApiLogin {
  /**
   * 登录
   * @param username - 用户名
   * @param password - 密码
   * @param verifyCode - 验证码
   * @param captchaId - 验证码Id
   */
  interface LoginReqForm {
    username: string
    password: string
    verifyCode: string
    captchaId: string
  }

  /**
   * Description 登出
   * @date 11/18/2022 - 3:17:02 PM
   * @author GGbeng
   *
   * @interface LoginOutReq
   * @typedef {LoginOutReq}
   * @param username - 用户名
   */
  interface LoginOutReq {
    username: string
  }
  /**
   * Description 登录接口信息
   * @date 11/1/2022 - 3:48:40 PM
   * @author GGbeng
   *
   * @interface LoginResData
   * @typedef {LoginResData}
   * @param {string} token - token
   * @param {UserInfo} userInfo - 用户信息
   */
  interface LoginResData {
    token: string
    userInfo: Auth.UserInfo
  }
  interface LoginCaptcha {
    id: string
    imageBase64: string
  }

  interface RegisterReqForm {
    username: string
    password: string
    password1: string
  }
  interface RegisterResData {
    data?: boolean
  }
}

declare namespace Auth {
  /**
   * Description 用户信息
   * @date 11/1/2022 - 3:58:21 PM
   * @author GGbeng
   *
   * @typedef {UserInfo}
   * @param {string} userId - 用户id
   * @param {string} username - 用户名
   * @param {string} name - 用户昵称
   */
  type UserInfo = {
    userId: string
    username: string
    name: string
  }
}

/**
 * Description 菜单类型
 * @date 11/1/2022 - 3:50:43 PM
 * @author GGbeng
 *
 * @interface Menu
 * @typedef {Menu}
 * @param {string} name - 菜单名称
 * @param {string} path - 路由路径
 * @param {string} icon - 菜单图标
 * @param {string} id - 菜单id
 * @param {string} parentId - 父级菜单id
 * @param {string} children - 子菜单集合
 */
interface Menu {
  name: string
  path: string
  icon: string
  id: string
  parentId: string
  children?: Menu[]
}

interface UserFinger {
  userFinger: string
  username: string
}
