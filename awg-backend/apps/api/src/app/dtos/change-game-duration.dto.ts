import { IsNumber, IsString } from "class-validator";

export class ChangeGameDurationDto {
  @IsString()
  gameId: string;

  @IsNumber()
  duration: number;
}
