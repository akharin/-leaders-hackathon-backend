import { Injectable } from '@nestjs/common';
import redis from 'redis';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import { IUserLocation } from '../../../interfaces/user-location.interface';

@Injectable()
export class ReceivingService {
  private readonly redisClient: RedisClient;
  private readonly redisSet: (
    key: string,
    value: string,
    mode: string,
    duration: number,
  ) => Promise<'OK' | undefined>;

  constructor() {
    this.redisClient = redis.createClient();
    this.redisSet = promisify(this.redisClient.set).bind(this.redisClient);
  }

  async storeLocation(socketId: string, data: IUserLocation) {
    // console.log(data);
    // this.redisClient.rpush(`locations:${data.userId}:${socketId}`, JSON.stringify(data));

    await this.redisSet(
      `locations:${data.objectId}:${data.userId}:${Date.now()}`,
      JSON.stringify(data),
      'EX',
      300,
    );
  }
}
