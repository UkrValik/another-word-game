import { IsString, IsNumber } from 'class-validator';

export namespace ChangeGameDuration {
  export const topic = 'game.change-duration.command';

  export class Request {
    @IsString()
    gameId: string;

    @IsNumber()
    duration: number;
  }

  export class Response {}
}
