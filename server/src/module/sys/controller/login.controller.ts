import { Controller, Post, Body, Inject, Get } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { LoginService, GetCaptchaService } from '../service/login';
import { HelperService } from '../service/helper';
import { UserService } from '../service/user';
import { LoginDTO, RegisterDTO, LoginOutDTO } from '../dto/login';
import { UserFingerDto } from '../dto/user';
import { Context } from '@midwayjs/koa';
@Controller('/')
export class LoginController {
  @Inject()
  loginService: LoginService;

  @Inject()
  userService: UserService;

  @Inject()
  getCaptchaService: GetCaptchaService;

  @Inject()
  helper: HelperService;

  @Inject()
  ctx: Context;

  @Post('/login')
  @Validate()
  async login(@Body() data: LoginDTO) {
    return this.helper.ok(await this.loginService.login(data));
  }
  @Post('/login-out')
  @Validate()
  async loginOut(@Body() data: LoginOutDTO) {
    return this.helper.ok(await this.loginService.loginOut(data));
  }

  @Post('/register')
  @Validate()
  async register(@Body() data: RegisterDTO) {
    return this.helper.ok(await this.loginService.register(data));
  }

  @Get('/get-image-captcha')
  async getImageCaptcha() {
    return this.helper.ok(await this.getCaptchaService.get());
  }

  @Post('/check-user-finger')
  @Validate()
  async checkUserFinger(@Body() data: UserFingerDto) {
    return this.helper.ok(await this.userService.checkUserFinger(data));
  }
}
