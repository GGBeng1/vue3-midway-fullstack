import { Rule, RuleType, PickDto } from '@midwayjs/validate';

export class LoginDTO {
  // 登录用户名
  @Rule(RuleType.string().max(12).min(3).required())
  username: string;

  // 密码
  @Rule(RuleType.string().max(100).min(6).required())
  password: string;

  // 用户指纹
  @Rule(RuleType.required())
  userFinger: string;

  // 验证码ID
  @Rule(RuleType.string().required())
  captchaId: string;

  // 验证码
  @Rule(RuleType.required())
  verifyCode: string;
}

export class RegisterDTO extends PickDto(LoginDTO, ['username', 'password']) {
  // 用户名称
  @Rule(RuleType.string().max(12).min(3).required())
  name: string;
  // 确认密码
  @Rule(RuleType.string().max(100).min(6).required())
  password1: string;
}
export class LoginOutDTO extends PickDto(LoginDTO, ['username']) {}
