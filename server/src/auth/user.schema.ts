import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false, default: null })
  avatar: string;

  @Prop({ required: false })
  password: string | null;

  @Prop({ required: true, default: 0 })
  investRate: number;

  @Prop({ required: true, default: false })
  verified: boolean;

  @Prop({ required: false })
  twitterId: string;

  @Prop({ required: true, enum: ['local', 'twitter'], default: 'local' })
  authMethod: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
