import { IUser, UserRole } from "@awg-backend/interfaces";
import { compare, genSalt, hash } from "bcryptjs";

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
  }

  public async setPassword(pasword: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(pasword, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}