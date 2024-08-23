import { IUser } from '@awg-backend/interfaces';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
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

  export class Response {
    user: IUser;
    access_token: string;
  }
}