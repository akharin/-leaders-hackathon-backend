import { Module } from '@nestjs/common';
import { ReceivingGateway } from './gateways/receiving/receiving.gateway';
import { SendingGateway } from './gateways/sending/sending.gateway';
import { ReceivingService } from './services/receiving/receiving.service';
import { SendingService } from './services/sending/sending.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLocationSchema } from './schemas/user-location.schema';
import { DbStoringService } from './services/db-storing/db-storing.service';
import { RedisStoringService } from './services/redis-storing/redis-storing.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserLocation', schema: UserLocationSchema }])],
  providers: [ReceivingGateway, SendingGateway, ReceivingService, SendingService, DbStoringService, RedisStoringService]
})
export class LocationsModule {
  constructor(private readonly dbStoring: DbStoringService) {
    this.dbStoring.enableStoring();
  }
}
