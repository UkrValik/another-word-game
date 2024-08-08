import { IsString } from "class-validator";

export namespace VocabularyNewWords {
  export const topic = 'vocabulary.new-words.command';

  export class Request {
    @IsString()
    wordsString: string;
  }

  export class Response {}
}