import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coin, CoinSchema } from './coin.schema';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserSchema } from 'src/auth/user.schema';
import { User } from 'src/auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coin.name, schema: CoinSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret.secret'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CoinService],
  controllers: [CoinController],
})
export class CoinModule {}
