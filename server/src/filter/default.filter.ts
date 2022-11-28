import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { RESDATA } from '../module/sys/interface/resData';
import { CustomErrorEnum } from '../error/common.error';
@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context): Promise<RESDATA> {
    ctx.logger.error(err);
    return {
      code: CustomErrorEnum.COMMON,
      data: null,
      message: err.message,
    };
  }
}
