import { createCustomMethodDecorator } from '@midwayjs/decorator';

// 装饰器内部的唯一 id
export const MEMORY_CACHE_KEY = 'decorator:cache_ttl';

/**
 * Description 缓存接口装饰器 使用方法参照 server/src/module/sys/service/login.ts GetCaptchaService
 * @date 11/17/2022 - 3:08:51 PM
 * @author GGbeng
 *
 * @export
 * @param {number} ttl 过期时间
 * @returns {MethodDecorator}
 */
export function Cache(ttl: number): MethodDecorator {
  return createCustomMethodDecorator(MEMORY_CACHE_KEY, {
    ttl,
  });
}
