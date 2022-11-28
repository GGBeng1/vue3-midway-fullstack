import { MidwayError } from '@midwayjs/core';

// 错误代码
export const CustomErrorEnum = {
  AUTHERROR: 10401, // 权限错误
  UNKNOWN: 10404, // 未知错误
  COMMON: 10400, // 通用错误
  PARAM_REQUIRED: 10001, // 参数缺失
};

export class UseError extends MidwayError {
  constructor(message?: string, type?: string) {
    super(message ?? '未知错误', CustomErrorEnum[type ?? 'COMMON']);
  }
}
