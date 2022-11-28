import { MidwayError } from '@midwayjs/core';
import { CODE } from '../interface/code';

export class UseError extends MidwayError {
  constructor(message?: string, codeType?: CODE) {
    super(message ?? '未知错误', CODE[codeType ?? 'COMMON_ERROR']);
  }
}
