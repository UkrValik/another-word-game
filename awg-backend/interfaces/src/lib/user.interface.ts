export enum UserRole {
  Regular = 'Regular',
  Admin = 'Admin'
}

export interface IUser {
  _id?: string;
  displayName?: string;
  userName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
