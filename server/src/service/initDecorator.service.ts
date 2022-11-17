import { MEMORY_CACHE_KEY } from '../decorator/cache.decorator';
import { Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Autoload, Init, MidwayDecoratorService } from '@midwayjs/core';
import { CacheManager } from '@midwayjs/cache';
import * as md5 from 'md5';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class InitDecorator {
  @Inject()
  decoratorService: MidwayDecoratorService;
  @Inject()
  cacheManager: CacheManager;
  @Init()
  async cacheInit() {
    this.decoratorService.registerMethodHandler(MEMORY_CACHE_KEY, options => {
      return {
        around: async joinPoint => {
          // 获取过期时间
          const ttl = options.metadata?.ttl || 5;
          const { target, methodName, args } = joinPoint;
          const key = md5(
            String(target.constructor.name) +
              String(methodName) +
              JSON.stringify(args)
          );
          // 获取缓存请求值
          let data: string | undefined = await this.cacheManager.get(key);
          // 如果缓存中有值则直接返回
          if (data) {
            return JSON.parse(data);
          } else {
            // 如果缓存中没有值则执行方法并将结果缓存
            data = await joinPoint.proceed(...joinPoint.args);
            this.cacheManager.set(key, JSON.stringify(data), { ttl });
          }
          return data;
        },
      };
    });
  }
}
