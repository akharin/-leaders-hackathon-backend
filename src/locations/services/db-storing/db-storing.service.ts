import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDbUserLocationDoc } from '../../interfaces/user-location.interface';
import { RedisStoringService } from '../redis-storing/redis-storing.service';

@Injectable()
export class DbStoringService {
  private intervalId;

  constructor(
    @InjectModel('UserLocation')
    private locationModel: Model<IDbUserLocationDoc>,
    private readonly redisStoring: RedisStoringService,
  ) {}

  enableStoring() {
    // TODO Перенести вызов через cron
    this.intervalId = setInterval(this.storeLocations, 60 * 1000);
  }

  disableStoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  storeLocations = async () => {
    // Получаем последние данные
    const keys = await this.redisStoring.getLocations();
    // Оставляем последнее местоположение для каждого пользователя
    const byUsers = await this.redisStoring.getLastLocationsByUsers(keys);

    for (const userId in byUsers) {
      if (byUsers.hasOwnProperty(userId)) {
        const item = byUsers[userId];
        // Проверяем, чтобы такой записи в БД не было
        const existingRecord = await this.locationModel
          .findOne({
            userId,
            objectId: item.value.objectId,
            date: new Date(item.date),
          })
          .exec();
        if (!existingRecord) {
          // Сохраняем в БД
          await this.locationModel.create({
            ...item.value,
            userId,
            date: item.date,
          });
        }
      }
    }
  };
}
