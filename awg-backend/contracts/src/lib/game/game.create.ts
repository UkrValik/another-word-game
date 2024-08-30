import { GameLevel, IAttempt } from '@awg-backend/interfaces';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export namespace GameCreate {
  export const topic = 'game.create.command';

  export class Request {
    
    @IsString()
    playerId: string;

    @IsString()
    name: string;
    
    @IsNumber()
    length: number;
    
    @IsEnum(GameLevel)
    gameLevel: GameLevel;
    
    @IsString()
    createdBy: string;    // user._id or 'game'
    
    @IsString()
    started: string;
  }

  export class Response {
    _id?: string;
    playerId: string;
    word: string;
    length: number;
    gameLevel: GameLevel;
    createdBy: string;    // user._id or 'game'
    started: Date;
    attempts: IAttempt[];
  }
}