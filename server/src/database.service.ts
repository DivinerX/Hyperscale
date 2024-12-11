// database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectConnection() private connection: Connection) { }

  async onModuleInit() {
    try {
      await this.checkConnection();
    } catch (err) {
      console.error('Database connection error:', err);
    }
  }

  async checkConnection() {
    const state = this.connection.readyState;
    if (state === 1) {
      console.log('Database connected successfully');
    } else {
      console.log('Database connection state:', state);
    }
    return state;
  }
}