import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Object, required: true })
  sender: {
    id: string;
    username: string;
    avatar: string;
  };

  @Prop({ type: Object })
  receiver: {
    id: string;
    username: string;
    avatar: string;
  };

  @Prop({ default: Date.now })
  timestamp: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
