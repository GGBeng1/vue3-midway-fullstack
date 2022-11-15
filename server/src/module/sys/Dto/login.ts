import { Rule, RuleType, PickDto } from '@midwayjs/validate';

export class LoginDTO {
  // 登录用户名
  @Rule(RuleType.string().max(12).min(1).required())
  username: string;

  // 密码
  @Rule(RuleType.string().max(12).min(1).required())
  password: string;

  // 验证码ID
  @Rule(RuleType.string().required())
  captchaId: string;

  // 验证码
  @Rule(RuleType.required())
  verifyCode: string;
}

export class RegisterDTO extends PickDto(LoginDTO, ['username', 'password']) {
  // 用户名称
  @Rule(RuleType.string().max(12).min(1).required())
  name: string;
  // 确认密码
  @Rule(RuleType.string().max(12).min(1).required())
  password1: string;
}
