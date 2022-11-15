import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { RESDATA } from '../controller/sys/interface/resData';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context): Promise<RESDATA> {
    ctx.logger.error(err);
    return {
      code: 400,
      data: null,
      message: err.message,
    };
  }
}
