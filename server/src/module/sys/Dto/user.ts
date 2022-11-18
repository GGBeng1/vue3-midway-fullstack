import { Rule, RuleType } from '@midwayjs/validate';

export class UserFingerDto {
  // 用户指纹
  @Rule(RuleType.required())
  userFinger: string;
  // 登录用户名
  @Rule(RuleType.string().max(12).min(3).required())
  username: string;
}
