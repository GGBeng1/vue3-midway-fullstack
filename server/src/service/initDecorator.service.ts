import { MEMORY_CACHE_KEY } from '../decorator/cache.decorator';
import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import * as md5 from 'md5';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class InitDecorator {
  @Inject()
  cacheManager: CacheManager;

  async cacheInit(): Promise<[string, any]> {
    return [
      MEMORY_CACHE_KEY,
      options => {
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
      },
    ];
  }
}
