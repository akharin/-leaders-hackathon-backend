import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { SendingService } from '../../services/sending/sending.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({path: '/api/ws'})
export class SendingGateway implements OnGatewayInit {
  constructor(private readonly sendingService: SendingService) {}

  afterInit(server: Server) {
    this.sendingService.setIOServer(server);
  }

  @SubscribeMessage('startWatching')
  startWatching(@ConnectedSocket() client: Socket, @MessageBody() data) {
    return this.sendingService.startWatching(client, data.objectId);
  }

  @SubscribeMessage('stopWatching')
  stopWatching(@ConnectedSocket() client: Socket, @MessageBody() data) {
    return this.sendingService.stopWatching(client, data.objectId);
  }
}
