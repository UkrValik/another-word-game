import { IsString } from 'class-validator';

export namespace VocabularyWordExists {
  export const topic = 'vocabulary.word-exists.query';

  export class Request {
    @IsString()
    value: string;
  }

  export class Response {
    exist: boolean;
  }
}
