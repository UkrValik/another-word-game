import { IGame } from '@awg-backend/interfaces';
import { IsString } from 'class-validator';

export namespace GameGetById {
  export const topic = 'game.get-by-id.query';

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    game: IGame;
  }
}
