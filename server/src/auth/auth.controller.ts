import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

class RegisterDto {
  username: string;
  password: string;
  avatar: string;
}

class LoginDto {
  username: string;
  password: string;
}

@Controller('api/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() { username, password, avatar }: RegisterDto) {
    return this.authService.register(username, password, avatar);
  }

  @Post('login')
  login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }

  @Get('all')
  getAllUser() {
    return this.authService.getAllUser();
  }

  @UseGuards(AuthGuard)
  @Get('total')
  getTotalUser() {
    return this.authService.getTotalUser();
  }

  @UseGuards(AuthGuard)
  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.authService.getUserByUsername(username);
  }
}
