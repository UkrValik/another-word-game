import { IAttempt } from '@awg-backend/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Attempt extends Document<string> implements IAttempt {
  @Prop({ required: true })
  attemptWord: string;

  @Prop({ required: true })
  attemptNumber: number;

  @Prop({ required: true })
  duration: number;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
