import { Provide } from '@midwayjs/decorator';
import { RESDATA } from '../interface/resData';
import { CODE } from '../../../interface/code';
@Provide()
// 辅助函数 帮助快速返回接口code
export class HelperService {
  async ok(data?: any, code?: CODE): Promise<RESDATA> {
    return {
      code: code ?? CODE.SUCCESS,
      data,
      message: 'success',
    };
  }
  async error(message?: string, code?: CODE): Promise<RESDATA> {
    return {
      code: code ?? CODE.COMMON_ERROR,
      data: null,
      message,
    };
  }
}
