import { Module } from '@nestjs/common';
import { ReceivingGateway } from './gateways/receiving/receiving.gateway';
import { SendingGateway } from './gateways/sending/sending.gateway';
import { ReceivingService } from './services/receiving/receiving.service';
import { SendingService } from './services/sending/sending.service';

@Module({
  providers: [ReceivingGateway, SendingGateway, ReceivingService, SendingService]
})
export class LocationsModule {}
