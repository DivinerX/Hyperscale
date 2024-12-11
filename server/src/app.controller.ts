import { Controller, Get } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({
  cors: {
    origin: '*', // In production, replace with your frontend URL
  },
})
@Controller()
export class AppController {
  @WebSocketServer()
  server: Server;

  private connectedClients: Set<string> = new Set();

  constructor(private readonly appService: AppService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.add(client.id);
    
    // Emit the current number of connected clients
    this.server.emit('clientsCount', this.connectedClients.size);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
    
    // Emit the updated number of connected clients
    this.server.emit('clientsCount', this.connectedClients.size);
  }

  @SubscribeMessage('getConnections')
  handleGetConnections(): number {
    return this.connectedClients.size;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): void {
    this.server.emit('message', data);
  }
}
