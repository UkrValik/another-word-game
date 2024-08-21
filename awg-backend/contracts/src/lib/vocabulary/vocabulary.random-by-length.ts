import { IWord } from "@awg-backend/interfaces";
import { IsNumber } from "class-validator";

export namespace VocabularyRandomByLength {
  export const topic = 'vocabulary.random-by-length.command';

  export class Request {
    @IsNumber()
    length: number;
  }

  export class Response {
    word: IWord;
  }
}
