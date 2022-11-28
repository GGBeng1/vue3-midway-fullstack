import { CODE } from '../../../interface/code';

/**
 * Description placeholder
 * @date 11/14/2022 - 4:22:59 PM
 * @author GGbeng
 *
 * @export
 * @interface RESDATA
 * @typedef {RESDATA}
 * @param {CODE} code - 状态码
 * @param {any} [data] - 返回数据
 * @param {string} [message] - 返回信息
 */
export interface RESDATA {
  code: CODE;
  data?: any;
  message?: string;
}
