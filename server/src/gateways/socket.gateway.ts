import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface IConnectedUser {
  socketId: string;
  userId?: string;
  username?: string;
  connectionTime: Date;
}

const event = {
  onlineUsers: "onlineUsers",
  userIdentify: "userIdentify",
  message: "message"
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, IConnectedUser> = new Map();

  private broadcastOnlineUsers() {
    const onlineUsers = this.getAllConnectedUsers();
    this.server.emit(event.onlineUsers, onlineUsers);
  }

  handleConnection(client: Socket) {
    const newUser: IConnectedUser = {
      socketId: client.id,
      connectionTime: new Date(),
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

  @SubscribeMessage(event.userIdentify)
  handleUserIdentification(client: Socket, payload: { userId: string, username: string }): void {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      user.userId = payload.userId;
      user.username = payload.username;
      this.connectedUsers.set(client.id, user);
    }
    
    this.broadcastOnlineUsers();
  }

  @SubscribeMessage('message') 
  handleMessage(client: Socket, payload: any): void {
    const user = this.connectedUsers.get(client.id);
    console.log('Received message from user:', user);
    console.log('Message:', payload);
    
    this.server.emit(event.message, {
      message: payload,
      user: user,
      timestamp: new Date()
    });
  }

  // Helper methods to work with connected users
  getAllConnectedUsers(): IConnectedUser[] {
    return Array.from(this.connectedUsers.values());
  }

  getUserBySocketId(socketId: string): IConnectedUser | undefined {
    return this.connectedUsers.get(socketId);
  }

  getUserByUserId(userId: string): IConnectedUser | undefined {
    return Array.from(this.connectedUsers.values()).find(user => user.userId === userId);
  }
}