import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig, jwtConfig } from './config/env.config';
import { DatabaseService } from './database.service';
import { SocketGateway } from './gateways/socket.gateway';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { Message, MessageSchema } from './message/message.schema';
import { CoinModule } from './coin/coin.module';
import { CoinSchema } from './coin/coin.schema';
import { Coin } from './coin/coin.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }]),
    AuthModule,
    MessageModule,
    CoinModule,
  ],
  providers: [DatabaseService, SocketGateway, MessageService],
})
export class AppModule {}
