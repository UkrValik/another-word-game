import { Document } from 'mongoose';
import { IWord } from '@awg-backend/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Word extends Document<string> implements IWord {
  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  length: number;
}

export const WordSchema = SchemaFactory.createForClass(Word);
