/**
 * Description placeholder
 * @date 11/14/2022 - 4:22:48 PM
 * @author GGbeng
 *
 * @export
 * @enum {number} - 状态码
 */
export declare enum RESCODE {
  SUCCESS = 200, // 成功
  RESFAIL = 422, // 通用特殊失败
  FAIL = 400, // 通用失败
}

/**
 * Description placeholder
 * @date 11/14/2022 - 4:22:59 PM
 * @author GGbeng
 *
 * @export
 * @interface RESDATA
 * @typedef {RESDATA}
 * @param {RESCODE} code - 状态码
 * @param {any} [data] - 返回数据
 * @param {string} [message] - 返回信息
 */
export interface RESDATA {
  code: RESCODE;
  data?: any;
  message?: string;
}
