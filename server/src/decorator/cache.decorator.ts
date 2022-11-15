import { createCustomMethodDecorator } from '@midwayjs/decorator';

// 装饰器内部的唯一 id
export const MEMORY_CACHE_KEY = 'decorator:cache_ttl';

export function Cache(ttl: number): MethodDecorator {
  return createCustomMethodDecorator(MEMORY_CACHE_KEY, {
    ttl,
  });
}
