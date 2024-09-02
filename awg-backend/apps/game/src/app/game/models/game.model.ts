import { Document } from 'mongoose';
import { GameLevel, IGame } from '@awg-backend/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Attempt, AttemptSchema } from './attempt.model';

@Schema()
export class Game extends Document<string> implements IGame {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  word: string;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true, type: Number, enum: GameLevel })
  gameLevel: GameLevel;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  started: Date;

  @Prop()
  finished?: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, type: [AttemptSchema], default: [] })
  attempts: Attempt[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
