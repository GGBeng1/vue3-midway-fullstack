import { MidwayConfig } from '@midwayjs/core';
import * as redisStore from 'cache-manager-ioredis';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1667543005095_613',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'shyt-ggbeng',
    expiresIn: '3d', // https://github.com/vercel/ms
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'ggbeng',
        // 自动建表
        synchronize: true,
        // 打印日志
        logging: true,
        // 字符集
        charset: 'utf8mb4',
        entities: '../controller/sys/entity',
      },
    },
  },
  cache: {
    store: redisStore,
    options: {
      host: '127.0.0.1',
      port: 6379,
      password: '123456',
      db: 0,
      ttl: null,
    },
  },
} as MidwayConfig;
