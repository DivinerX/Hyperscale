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
  async twitterAuth(@Req() req, @Res() res) {
    try {
      // Log the request details for debugging
      console.log('Twitter auth initiated', {
        headers: req.headers,
        query: req.query
      });
      
      // Passport will handle the authentication
      // This function won't be called unless there's an error
      return;
    } catch (error) {
      console.error('Twitter auth error:', error);
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/login?error=twitter_auth_failed`
      );
    }
  }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuthCallback(@Req() req, @Res() res) {
    try {
      // Log the callback data for debugging
      console.log('Twitter callback received', {
        user: req.user,
        query: req.query
      });

      if (!req.user) {
        throw new Error('No user data received from Twitter');
      }

      // Generate JWT token
      const token = await this.authService.loginWithTwitter(req.user);
      
      if (!token) {
        throw new Error('Failed to generate authentication token');
      }

      // Redirect to frontend with token
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/auth/twitter?token=${token.access_token}`
      );
    } catch (error) {
      console.error('Twitter callback error:', error);
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/login?error=${encodeURIComponent(error.message)}`
      );
    }
  }
}
