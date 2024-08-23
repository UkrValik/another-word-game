import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}
