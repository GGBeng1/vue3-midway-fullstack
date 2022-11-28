/**
 * Description placeholder
 * @date 11/14/2022 - 4:22:48 PM
 * @author GGbeng
 *
 * @export
 * @enum {string} - 状态码
 */
export enum CODE {
  SUCCESS = '10200', // 成功
  AUTH_ERROR = '10401', // 权限错误
  UNKNOWN_ERROR = '10404', // 未知错误
  COMMON_ERROR = '10400', // 通用错误
  PARAM_REQUIRED_ERROR = '10001', // 参数缺失
}
