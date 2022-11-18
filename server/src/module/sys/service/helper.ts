import { Provide } from '@midwayjs/decorator';
import { RESDATA, RESCODE } from '../interface/resData';
@Provide()
// 辅助函数 帮助快速返回接口code
export class HelperService {
  async ok(data?: any, code?: RESCODE.RESFAIL): Promise<RESDATA> {
    return {
      code: code || 200,
      data,
      message: 'success',
    };
  }
  async error(message?: string, code?: RESCODE.RESFAIL): Promise<RESDATA> {
    return {
      code: code || 400,
      data: null,
      message,
    };
  }
}
