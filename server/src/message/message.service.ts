import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { IMessage } from 'src/types';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(message: IMessage): Promise<Message> {
    const newMessage = new this.messageModel(message);
    return newMessage.save();
  }

  async getTargetMessage(id: string): Promise<Message[]> {
    return await this.messageModel.find({
      $or: [{ sender: id }, { receiver: id }],
    }).exec();
  }

  async getAllMessage(): Promise<Message[]> {
    const messages = await this.messageModel.find().exec();
    console.log(messages);
    return messages;
  }
} 