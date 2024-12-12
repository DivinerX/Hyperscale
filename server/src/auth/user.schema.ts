import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false, default: null })
  avatar: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User); 