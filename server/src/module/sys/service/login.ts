import { Provide } from '@midwayjs/decorator';
import { LoginDTO, RegisterDTO } from '../dto/login';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Inject } from '@midwayjs/decorator';
import { CaptchaService } from '@midwayjs/captcha';
import { JwtService } from '@midwayjs/jwt';
import { Cache } from '../../../decorator/cache.decorator';
import { CacheManager } from '@midwayjs/cache';
import { loginResData } from '../interface/login';
import { UseError } from '../../../error/common.error';
@Provide()
export class LoginService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  ctx;

  @Inject()
  jwtService: JwtService;

  @Inject()
  cacheManager: CacheManager;

  @Cache(5)
  /**
   * Description 用户登录
   * @date 11/15/2022 - 11:48:47 AM
   * @author GGbeng
   *
   * @async
   * @param {LoginDTO} data
   * @returns {Promise<loginResData>}
   */
  async login(data: LoginDTO): Promise<loginResData> {
    const { username, captchaId, verifyCode, password, userFinger } = data;
    const passed: boolean = await this.captchaService.check(
      captchaId,
      verifyCode
    );
    if (!passed) throw new UseError('验证码错误');
    const findData = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (!findData) throw new UseError('用户名不存在');
    if (findData.password === password) {
      const token = this.jwtService.signSync({ username: findData.username });
      findData.userFinger = userFinger;
      await this.userModel.save(findData);
      // 在redis中缓存token及用户指纹 并以过期时间为主
      this.cacheManager.set(username, findData.username, {
        ttl: 60 * 60 * 24 * 2,
      });
      this.cacheManager.set(`${username}:userFinger`, userFinger, {
        ttl: 60 * 60 * 24 * 2,
      });
      return {
        token,
        userInfo: {
          userId: findData.id,
          name: findData.name,
          username: findData.username,
        },
      };
    }
  }

  /**
   * Description 用户注册
   * @date 11/15/2022 - 11:49:03 AM
   * @author GGbeng
   *
   * @async
   * @param {RegisterDTO} data
   * @returns {Promise<boolean>}
   */
  async register(data: RegisterDTO): Promise<boolean> {
    const { name, username, password, password1 } = data;
    if (password !== password1) throw new UseError('两次密码不一致');
    const findData = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (findData) {
      throw new UseError('用户名已存在');
    } else {
      const user = new User();
      user.name = name;
      user.username = username;
      user.password = password;
      await this.userModel.save(user);
      return true;
    }
  }

  /**
   * Description 用户登出
   * @date 11/17/2022 - 2:58:39 PM
   * @author GGbeng
   *
   * @async
   * @returns {Promise<boolean>}
   */
  async loginOut(data): Promise<boolean> {
    const token: string = this.ctx.request.header.authorization.split(' ')[1];
    await this.cacheManager.del(token);
    await this.cacheManager.del(`${data.username}:userFinger`);
    return true;
  }
}

@Provide()
export class GetCaptchaService {
  @Inject()
  captchaService: CaptchaService;
  // 接口缓存 3 秒 , 防止用户多次点击获取验证码

  /**
   * Description 获取验证码
   * @date 11/18/2022 - 3:50:33 PM
   * @author GGbeng
   *
   * @async
   * @returns {Promise<{ id: string; imageBase64: string }>}
   */
  @Cache(3)
  async get(): Promise<{ id: string; imageBase64: string }> {
    const { id, imageBase64 } = await this.captchaService.image({
      width: 120,
      height: 40,
    });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }
}
