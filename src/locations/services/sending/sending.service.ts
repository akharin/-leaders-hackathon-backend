import { Injectable } from '@nestjs/common';
import io, { Server, Socket } from 'socket.io';
import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import { IUserLocation } from '../../../interfaces/user-location.interface';

@Injectable()
export class SendingService {
  private readonly redisClient: RedisClient;
  private socketServer: Server;

  constructor() {
    this.redisClient = redis.createClient();

    setInterval(this.handleLocations, 5000);
  }

  async startWatching(socket: Socket, objectId: string) {
    await promisify(socket.join).bind(socket)(objectId);
    return { ok: true };
  }

  async stopWatching(socket: Socket, objectId: string) {
    await promisify(socket.leave).bind(socket)(objectId);
    return { ok: true };
  }

  setIOServer(server: Server) {
    this.socketServer = server;
  }

  private handleLocations = async () => {
    if (this.redisClient) {
      // Получаем данные за последние 30 сек
      const keys = await promisify(this.redisClient.keys).bind(
        this.redisClient,
      )('locations:*');

      // Оставляем последнее местоположение для каждого пользователя
      const byUsers: {
        [userId: string]: { ttl: number; value: IUserLocation };
      } = {};
      for (const key of keys) {
        const [ttl, jsonValue] = await this.getTtlAndValue(key);
        const value: IUserLocation = JSON.parse(jsonValue);

        if (!byUsers[value.userId] || byUsers[value.userId].ttl < ttl) {
          byUsers[value.userId] = { ttl, value };
        }
      }

      // Группируем по объектам
      const byObjects: { [objectId: string]: Omit<IUserLocation, 'objectId'>[] } = {};
      for (const userId in byUsers) {
        if (byUsers.hasOwnProperty(userId)) {
          if (byUsers[userId].ttl < 270) {
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
            this.socketServer.to(objectId).emit('locationsUpdated', byObjects[objectId]);
          }
      }
    }
  };

  private getTtlAndValue = (key: string): Promise<[number, string]> => {
    return new Promise((resolve, reject) => {
      this.redisClient
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
  };
}
