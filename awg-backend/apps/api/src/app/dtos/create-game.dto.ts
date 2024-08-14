import { GameLevel } from '@awg-backend/interfaces';
import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateGameDto {
  @IsString()
  word: string;

  @IsString()
  playerId: string;
  
  @IsNumber()
  length: number;
  
  @IsEnum(GameLevel)
  gameLevel: GameLevel;
  
  @IsString()
  createdBy: string;    // user._id or 'game'
  
  @IsString()
  started: string;
}
