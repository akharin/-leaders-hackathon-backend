import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ReceivingService } from '../../services/receiving/receiving.service';
import { Socket } from 'socket.io';

@WebSocketGateway({path: '/api/ws'})
export class ReceivingGateway {
  constructor(private readonly receivingService: ReceivingService) {}

  @SubscribeMessage('startSession')
  startSession() {
    // TODO
  }

  @SubscribeMessage('pauseSession')
  pauseSession() {
    // TODO
  }

  @SubscribeMessage('stopSession')
  stopSession() {
    // TODO
  }

  @SubscribeMessage('sendLocation')
  sendLocation(@ConnectedSocket() client: Socket, @MessageBody() data) {
    return this.receivingService.storeLocation(client.id, data);
  }
}
