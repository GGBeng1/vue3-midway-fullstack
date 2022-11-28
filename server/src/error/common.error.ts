import { MidwayError } from '@midwayjs/core';
import { CODE } from '../interface/code';
type codeKey = keyof typeof CODE;
export class UseError extends MidwayError {
  constructor(message?: string, codeType?: codeKey) {
    super(message ?? '未知错误', CODE[codeType ?? 'COMMON_ERROR']);
  }
}
