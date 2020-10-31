import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { promisify } from 'util';
import { IUserLocation } from '../../../interfaces/user-location.interface';
import { RedisStoringService } from '../redis-storing/redis-storing.service';

@Injectable()
export class SendingService {
  private socketServer: Server;

  constructor(private readonly redisStoring: RedisStoringService) {
    // TODO Перенести вызов через cron
    setInterval(this.sendLocationsToClient, 5000);
  }

  async startWatching(socket: Socket, objectId: string) {
    await promisify(socket.join).bind(socket)(objectId);
    await this.sendLocationsToClient();
    return { ok: true };
  }

  async stopWatching(socket: Socket, objectId: string) {
    await promisify(socket.leave).bind(socket)(objectId);
    return { ok: true };
  }

  setIOServer(server: Server) {
    this.socketServer = server;
  }

  private sendLocationsToClient = async () => {
    // Получаем последние данные
    const keys = await this.redisStoring.getLocations();
    // Оставляем последнее местоположение для каждого пользователя
    const byUsers = await this.redisStoring.getLastLocationsByUsers(keys);

    // Группируем по объектам
    const byObjects: {
      [objectId: string]: Omit<IUserLocation, 'objectId'>[];
    } = {};
    for (const userId in byUsers) {
      if (byUsers.hasOwnProperty(userId)) {
        // Если оставшееся время < время жизни - 30 сек, то пропускаем
        if (byUsers[userId].ttl < RedisStoringService.locationTtl - 30) {
          continue;
        }
        const value = byUsers[userId].value;
        if (!byObjects[value.objectId]) {
          byObjects[value.objectId] = [];
        }
        byObjects[value.objectId].push({
          userId: value.userId,
          lat: value.lat,
          lng: value.lng,
          alt: value.alt,
        });
      }
    }

    // Отправляем по websocket
    if (this.socketServer) {
      for (const objectId in byObjects)
        if (byObjects.hasOwnProperty(objectId)) {
          this.socketServer
            .to(objectId)
            .emit('locationsUpdated', byObjects[objectId]);
        }
    }
  };
}
