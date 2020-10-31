import { Injectable } from '@nestjs/common';
import redis, { RedisClient } from 'redis';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDbUserLocationDoc } from '../../interfaces/user-location.interface';
import { promisify } from 'util';
import { IUserLocation } from '../../../interfaces/user-location.interface';

@Injectable()
export class RedisStoringService {
  static locationTtl = 300;

  private readonly redis: RedisClient;

  private readonly set: (
    key: string,
    value: string,
    mode: string,
    duration: number,
  ) => Promise<'OK' | undefined>;

  private readonly keys: (pattern: string) => Promise<string[]>;

  private readonly get: (key: string) => Promise<unknown>;

  constructor(
    @InjectModel('UserLocation')
    private locationModel: Model<IDbUserLocationDoc>,
  ) {
    this.redis = redis.createClient();
    this.set = promisify(this.redis.set).bind(this.redis);
    this.keys = promisify(this.redis.keys).bind(this.redis);
    this.get = promisify(this.redis.get).bind(this.redis);
  }

  /**
   * Сохранет местоположение в redis
   *
   * @param data
   */
  async saveLocation(data: IUserLocation) {
    await this.set(
      `locations:${data.objectId}:${data.userId}:${Date.now()}`,
      JSON.stringify(data),
      'EX',
      RedisStoringService.locationTtl,
    );
  }

  /**
   * Возвращает данные по местоположениям из redis
   */
  getLocations() {
    return this.keys('locations:*');
  }

  async getLocationValue(key: string) {
    return (await this.get(key)) as IUserLocation;
  }

  /**
   * Возвращает оставшееся время жизни и данные по местоположению
   *
   * @param key
   */
  getLocationTtlAndValue(key: string): Promise<[number, string]> {
    return new Promise((resolve, reject) => {
      this.redis
        .multi()
        .ttl(key)
        .get(key)
        .exec((error, result: [number, string]) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
    });
  }

  /**
   * Группирует местоположения по пользователям и оставляет только последнее значение
   *
   * @param keys
   */
  async getLastLocationsByUsers(keys: string[]) {
    const byUsers: {
      [userId: string]: { ttl: number; value: IUserLocation; date: number };
    } = {};
    for (const key of keys) {
      const [ttl, jsonValue] = await this.getLocationTtlAndValue(key);
      const value: IUserLocation = JSON.parse(jsonValue);
      // TODO Получать дату создания из отдельного ключа в redis
      const date = +key.substring(key.lastIndexOf(':') + 1);

      if (!byUsers[value.userId] || byUsers[value.userId].ttl < ttl) {
        byUsers[value.userId] = { ttl, value, date };
      }
    }
    return byUsers;
  }
}
