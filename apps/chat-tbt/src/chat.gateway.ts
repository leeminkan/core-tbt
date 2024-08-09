import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');
  private id = Math.floor(Math.random() * 10000) + 1;

  // Run when start up application
  afterInit(server: Server) {
    console.log('afterInit', server);
    this.logger.log('afterInit');
  }

  handleDisconnect(client: Socket) {
    console.log('handleDisconnect', {
      client,
      serverId: this.id,
    });
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('handleConnection', {
      client,
      args,
      serverId: this.id,
    });
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('S_MESSAGE')
  handleSMessage(client: Socket, payload: { toUser: string }): void {
    console.log('handleSMessage', {
      client,
      serverId: this.id,
    });
    this.logger.log(`handleSMessage: ${payload}`);
    this.server.to(payload.toUser).emit('C_MESSAGE', payload);
  }
}
