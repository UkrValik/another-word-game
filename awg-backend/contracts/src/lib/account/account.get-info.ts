import { UserRole } from "@awg-backend/interfaces";
import { IsString } from "class-validator";

export namespace AccountGetInfo {
  export const topic = 'account.get-info.query';

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    _id: string;
    email: string;
    userName: string;
    role: UserRole;
    displayName?: string;
  }
}