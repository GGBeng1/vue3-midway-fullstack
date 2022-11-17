import { Inject, Middleware, Config, ALL } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { CacheManager } from '@midwayjs/cache';

@Middleware()
export class JwtMiddleware {
  @Config(ALL)
  allConfig;

  @Inject()
  jwtService: JwtService;

  @Inject()
  cacheManager: CacheManager;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '登录或已过期，请重新登录',
        };
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '登录或已过期，请重新登录',
        };
      }

      const [scheme, token] = parts;
      let tokenValue: any = null;
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          tokenValue = await this.jwtService.verify(token, {
            complete: true,
            ignoreExpiration: true,
          });
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            message: '登录失效~',
          };
        }
        // 增加redis判断 更新用户token缓存时间 用户两天内没有登录过就会失效
        const username = tokenValue.payload.username;
        if (!this.cacheManager.get(username)) {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            message: '登录或已过期，请重新登录~',
          };
        } else {
          this.cacheManager.set('username', username, {
            ttl: 60 * 60 * 24 * 2,
          });
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    // 获取公共前缀
    const globalPrefix = this.allConfig.koa?.globalPrefix;
    const whiteList = ['/login', '/register', '/get-image-captcha'];
    const ignore = whiteList.includes(
      globalPrefix ? ctx.path.split(globalPrefix)[1] : ctx.path
    );
    return !ignore;
  }
}
