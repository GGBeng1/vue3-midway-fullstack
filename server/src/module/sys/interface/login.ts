/**
 * Description 用户信息
 * @date 11/18/2022 - 3:56:44 PM
 * @author GGbeng
 *
 * @export
 * @interface UserInfo
 * @typedef {UserInfo}
 */
export interface UserInfo {
  userId: number;
  name: string;
  username: string;
}

/**
 * Description 登录接口返回值
 * @date 11/18/2022 - 3:56:11 PM
 * @author GGbeng
 *
 * @export
 * @interface loginResData
 * @typedef {loginResData}
 */
export interface loginResData {
  token: string;
  userInfo: UserInfo;
}
