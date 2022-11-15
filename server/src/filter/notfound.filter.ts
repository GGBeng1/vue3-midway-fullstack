import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RESDATA } from '../controller/sys/interface/resData';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context): Promise<RESDATA> {
    ctx.logger.error(err);
    // 404 错误会到这里
    return {
      code: 404,
      message: err.message,
    };
  }
}
