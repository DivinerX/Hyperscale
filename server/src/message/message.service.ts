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

  async getPrivateMessage(
    senderId: string,
    receiverId: string,
  ): Promise<Message[]> {
    const messages = await this.messageModel
      .find({
        $or: [
          { $and: [{ 'sender.id': senderId }, { 'receiver.id': receiverId }] },
          { $and: [{ 'sender.id': receiverId }, { 'receiver.id': senderId }] },
        ],
      })
      .sort({ timestamp: -1 })
      .exec();

    return messages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );
  }

  async getPublicMessage(page: number): Promise<Message[]> {
    const messages = await this.messageModel
      .find({
        receiver: null,
      })
      .sort({ timestamp: -1 })
      .skip(page * 15)
      .limit(15)
      .exec();

    return messages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );
  }
}
