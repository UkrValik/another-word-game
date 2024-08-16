import { IsString, IsNumber, ValidateNested } from 'class-validator';

class AttemptRequest {
  @IsString()
  attemptWord: string;

  @IsNumber()
  attemptNumber: number;

  @IsNumber()
  duration: number;
}

export class AddAttemptDto {
  @IsString()
  gameId: string

  @ValidateNested()
  attempt: AttemptRequest;
}
