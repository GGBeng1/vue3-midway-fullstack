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
  async checkUserFinger(data: UserFingerDto) {
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
      if (findData.userFinger === userFinger) {
        this.cacheManager.set(`${username}:userFinger`, userFinger, {
          ttl: 60 * 60 * 24 * 2,
        });
        return true;
      } else {
        return false;
      }
    }
  }
}
