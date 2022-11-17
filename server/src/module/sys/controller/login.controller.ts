import { Controller, Post, Body, Inject, Get } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { LoginService, GetCaptchaService } from '../service/login';
import { HelperService } from '../service/helper';
import { LoginDTO, RegisterDTO } from '../dto/login';
import { Context } from '@midwayjs/koa';
@Controller('/')
export class LoginController {
  @Inject()
  loginService: LoginService;

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
  async loginOut() {
    return this.helper.ok(await this.loginService.loginOut());
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
}
