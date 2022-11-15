import { Controller, Post, Body, Inject, Get } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { LoginService, GetCaptchaService } from '../service/login';
import { HelperService } from '../service/helper';
import { LoginDTO, RegisterDTO } from '../Dto/login';
import { CaptchaService } from '@midwayjs/captcha';

@Controller('/')
export class LoginController {
  @Inject()
  loginService: LoginService;
  @Inject()
  getCaptchaService: GetCaptchaService;
  @Inject()
  captchaService: CaptchaService;
  @Inject()
  helper: HelperService;

  @Post('/login')
  @Validate()
  async login(@Body() data: LoginDTO) {
    return this.helper.ok(await this.loginService.login(data));
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
