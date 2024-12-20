import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coin {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export type CoinDocument = Coin & Document;
export const CoinSchema = SchemaFactory.createForClass(Coin);
