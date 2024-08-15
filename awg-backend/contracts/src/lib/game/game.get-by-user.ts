import { IGame } from '@awg-backend/interfaces';
import { IsString } from 'class-validator';

export namespace GameGetByUser {
  export const topic = 'game.get-by-user.query';

  export class Request {
    @IsString()
    userId: string;
  }

  export class Response {
    games: IGame[];
  }
}
