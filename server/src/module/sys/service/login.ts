import { Provide } from '@midwayjs/decorator';
import { LoginDTO, RegisterDTO } from '../dto/login';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Inject } from '@midwayjs/decorator';
import { CaptchaService } from '@midwayjs/captcha';
import { JwtService } from '@midwayjs/jwt';
import { Cache } from '../../../decorator/cache.decorator';
import * as md5 from 'md5';

@Provide()
export class LoginService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  jwtService: JwtService;

  @Cache(5)
  /**
   * Description placeholder
   * @date 11/15/2022 - 11:48:47 AM
   * @author GGbeng
   *
   * @async
   * @param {LoginDTO} data
   */
  async login(data: LoginDTO) {
    const { username, captchaId, verifyCode, password } = data;
    const passed: boolean = await this.captchaService.check(
      captchaId,
      verifyCode
    );
    if (!passed) throw new Error('验证码错误');
    const findData = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (!findData) throw new Error('用户名不存在');
    if (findData.password === md5(password)) {
      return {
        token: this.jwtService.signSync({ id: findData.id }),
        userInfo: {
          userId: findData.id,
          name: findData.name,
          username: findData.username,
        },
      };
    }
  }

  /**
   * Description placeholder
   * @date 11/15/2022 - 11:49:03 AM
   * @author GGbeng
   *
   * @async
   * @param {RegisterDTO} data
   * @returns {Promise<boolean>}
   */
  async register(data: RegisterDTO): Promise<boolean> {
    const { name, username, password, password1 } = data;
    if (password !== password1) throw new Error('两次密码不一致');
    const findData = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (findData) {
      throw new Error('用户名已存在');
    } else {
      const user = new User();
      user.name = name;
      user.username = username;
      user.password = md5(password);
      await this.userModel.save(user);
      return true;
    }
  }
}

@Provide()
export class GetCaptchaService {
  @Inject()
  captchaService: CaptchaService;

  @Cache(3)
  async get() {
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
