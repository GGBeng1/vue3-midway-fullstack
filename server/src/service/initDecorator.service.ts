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
          const ttl = options.metadata?.ttl || 5;
          const { target, methodName, args } = joinPoint;
          const key = md5(
            String(target.constructor.name) +
              String(methodName) +
              JSON.stringify(args)
          );
          let data: string | undefined = await this.cacheManager.get(key);
          if (data) {
            return JSON.parse(data);
          } else {
            data = await joinPoint.proceed(...joinPoint.args);
            this.cacheManager.set(key, JSON.stringify(data), { ttl });
          }
          return data;
        },
      };
    });
  }
}
