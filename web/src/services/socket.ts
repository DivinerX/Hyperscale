import { io, Socket } from 'socket.io-client';
import { storageService } from '@/services/storage';

export class SocketService {
  private static socket: Socket | null = null;

  private constructor() {
  }

  public static event = {
    onlineUsers: "onlineUsers",
    checkUsers: "checkUsers",
    userIdentify: "userIdentify",
    userMessage: "userMessage",
    sentMessage: "sentMessage",
    serverMessage: "serverMessage",
    userTyping: "userTyping",
  }

  public static init(): void {
    if (!this.socket) {
      const socketUrl = import.meta.env.VITE_SOCKET_URL;
      const token = storageService.getItem('token');
      
      this.socket = io(socketUrl, {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 5000,
        query: {
          token: token
        }
      });
      
      this.socket.on('connect', () => {
        console.log('socket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
    }
  }

  public static getSocket(): Socket | null {
    return this.socket;
  }

  public static disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public static emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
  
  public static off(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  public static on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}