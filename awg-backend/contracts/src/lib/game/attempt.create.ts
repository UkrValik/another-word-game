import { IGame } from '@awg-backend/interfaces';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export namespace AttemptCreate {
  export const topic = 'attempt.create.command';

  class AttemptRequest {
    @IsString()
    attemptWord: string;

    @IsNumber()
    attemptNumber: number;

    @IsNumber()
    duration: number;
  }

  export class Request {
    @IsString()
    gameId: string

    @ValidateNested()
    attempt: AttemptRequest;
  }

  export class Response {
    game: IGame;
  }
}
