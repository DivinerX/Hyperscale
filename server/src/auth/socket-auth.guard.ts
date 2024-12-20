// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { Socket } from 'socket.io';

// @Injectable()
// export class SocketAuthGuard implements CanActivate {
//   constructor(private authService: AuthService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const socket: Socket = context.switchToWs().getClient();
//     const token = socket.handshake?.query?.token;

//     if (!token) {
//       throw new UnauthorizedException('No token provided');
//     }

//     const user = this.authService.validateToken(token as string);
//     if (!user) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     socket['user'] = user;
//     return true;
//   }
// }
