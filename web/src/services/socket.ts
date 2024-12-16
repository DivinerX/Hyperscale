import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(import.meta.env.VITE_SOCKET_URL); // Use the socket URL from your .env file
  }

  public connect() {
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string, callback: (data: any) => void) {
    this.socket.off(event, callback);
  }

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

export const socketService = new SocketService();