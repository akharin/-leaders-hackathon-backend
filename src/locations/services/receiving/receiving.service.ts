import { Injectable } from '@nestjs/common';
import { IUserLocation } from '../../../interfaces/user-location.interface';
import { RedisStoringService } from '../redis-storing/redis-storing.service';

@Injectable()
export class ReceivingService {
  constructor(private readonly redisStoring: RedisStoringService) {}

  async storeLocation(data: IUserLocation) {
    // console.log(data);
    await this.redisStoring.saveLocation(data);
  }
}
