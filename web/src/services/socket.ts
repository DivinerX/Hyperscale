import { io, Socket } from 'socket.io-client';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {
    // Remove socket initialization from constructor
  }

  public event = {
    onlineUsers: "onlineUsers",
    clientCount: "clientCount",
    userIdentify: "userIdentify",
    message: "message"
  }
  public init(): void {
    if (!this.socket) {
      const socketUrl = import.meta.env.VITE_SOCKET_URL;
      this.socket = io(socketUrl);
      
      this.socket.on('connect', () => {
        console.log('Connected to server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

export const socketService = SocketService.getInstance();
