import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ReceivingService } from '../../services/receiving/receiving.service';

@WebSocketGateway({path: '/api/ws'})
export class ReceivingGateway {
  constructor(private readonly receivingService: ReceivingService) {}

  @SubscribeMessage('sendLocation')
  sendLocation(@MessageBody() data) {
    return this.receivingService.storeLocation(data);
  }
}
