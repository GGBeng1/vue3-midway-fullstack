import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RESDATA } from '../module/sys/interface/resData';
import { CustomErrorEnum } from '../error/common.error';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context): Promise<RESDATA> {
    ctx.logger.error(err);
    // 404 错误会到这里
    return {
      code: CustomErrorEnum.UNKNOWN,
      message: err.message,
    };
  }
}
