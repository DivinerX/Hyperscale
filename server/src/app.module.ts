import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from './config/mongo.config';
import { DatabaseService } from './database.service';
import { SocketGateway } from './gateways/socket.gateway';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { Message, MessageSchema } from './message/message.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig],
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
    AuthModule,
    MessageModule,
  ],
  providers: [DatabaseService, SocketGateway, MessageService],
})
export class AppModule {}