import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      consumerKey: configService.get<string>('TWITTER_CONSUMER_KEY'),
      consumerSecret: configService.get<string>('TWITTER_CONSUMER_SECRET'),
      callbackURL: configService.get<string>('TWITTER_CALLBACK_URL'),
      includeEmail: true,
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
  ): Promise<any> {
    const { id, username, photos } = profile;
    
    // Create or get user from database
    const user = await this.authService.findOrCreateTwitterUser({
      twitterId: id,
      username: username,
      avatar: photos[0]?.value || null,
    });

    return user;
  }
} 