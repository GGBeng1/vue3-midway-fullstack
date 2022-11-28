import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { RESDATA } from '../module/sys/interface/resData';
import { CODE } from '../interface/code';
@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context): Promise<RESDATA> {
    ctx.logger.error(err);
    return {
      code: CODE.COMMON_ERROR,
      data: null,
      message: err.message,
    };
  }
}
