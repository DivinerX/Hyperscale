import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { IConnectedUser, IReceiveMessage, IMessage, event } from 'src/types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, IConnectedUser> = new Map();

  constructor(private messageService: MessageService) {}

  private broadcastOnlineUsers() {
    const onlineUsers = this.getAllConnectedUsers();
    this.server.emit(event.onlineUsers, onlineUsers);
  }

  handleConnection(client: Socket) {
    const newUser: IConnectedUser = {
      socketId: client.id
    };
    
    this.connectedUsers.set(client.id, newUser);
    console.log(`Client connected: ${client.id}`);
    
    this.broadcastOnlineUsers();
  }

  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
    
    this.broadcastOnlineUsers();
  }

  @SubscribeMessage(event.checkUsers)
  handleCheckOnlineUsers(client: Socket): void {
    this.broadcastOnlineUsers();
  }

  @SubscribeMessage(event.userIdentify)
  handleUserIdentification(client: Socket, payload: { id: string, username: string, avatar: string }): void {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      user.id = payload.id;
      user.username = payload.username;
      user.avatar = payload.avatar;
      user.connectionTime = new Date();
      this.connectedUsers.set(client.id, user);
    }
    this.broadcastOnlineUsers();
  }

  @SubscribeMessage(event.userMessage) 
  async handleMessage(client: Socket, payload: IReceiveMessage): Promise<void> {
    const user = this.connectedUsers.get(client.id);

    const message: IMessage = {
      ...payload,
      timestamp: new Date()
    }
    
    try {
      message.status = "sent"
      await this.messageService.create(message);
      client.emit(event.sentMessage, message);
      this.server.except(client.id).emit(event.serverMessage, message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  getAllConnectedUsers(): IConnectedUser[] {
    return Array.from(this.connectedUsers.values());
  }

  getUserBySocketId(socketId: string): IConnectedUser | undefined {
    return this.connectedUsers.get(socketId);
  }

  getUserByUserId(userId: string): IConnectedUser | undefined {
    return Array.from(this.connectedUsers.values()).find(user => user.id === userId);
  }
}