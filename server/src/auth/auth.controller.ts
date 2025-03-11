import { Body, Controller, Get, Param, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

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
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Get('total')
  getTotalUser() {
    return this.authService.getTotalUser();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.authService.getUserByUsername(username);
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuth() {
    // Twitter authentication will be initiated
    console.log('Twitter authentication initiated');
  }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuthCallback(@Req() req, @Res() res) {
    try {
      const token = req.user.access_token;
      if (!token) {
        throw new Error('No token received from Twitter authentication');
      }
      
      // Redirect to frontend with token
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/auth/twitter?token=${token}`
      );
    } catch (error) {
      console.error('Twitter callback error:', error);
      // Redirect to frontend with error
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/login?error=twitter_auth_failed`
      );
    }
  }
}
