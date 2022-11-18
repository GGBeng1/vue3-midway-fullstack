import { Provide } from '@midwayjs/decorator';
import { User } from '../entity/user';
import { Inject } from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserFingerDto } from '../dto/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  cacheManager: CacheManager;

  /**
   * Description 检查用户指纹, 防止用户借助token更换设备登录
   * @date 11/18/2022 - 3:47:11 PM
   * @author GGbeng
   *
   * @async
   * @param {UserFingerDto} data
   * @returns {Promise<boolean>}
   */
  async checkUserFinger(data: UserFingerDto): Promise<boolean> {
    const { userFinger, username } = data;
    const finger = await this.cacheManager.get(`${username}:userFinger`);
    if (finger) {
      return finger === userFinger;
    } else {
      const findData = await this.userModel.findOne({
        where: {
          username,
        },
      });
      // 用户指纹缓存一周
      if (findData.userFinger === userFinger) {
        this.cacheManager.set(`${username}:userFinger`, userFinger, {
          ttl: 60 * 60 * 24 * 7,
        });
        return true;
      } else {
        return false;
      }
    }
  }
}
