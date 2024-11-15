export enum UserRole {
  Regular = 'Regular',
  Admin = 'Admin',
}

export enum GameLevel {
  Easy = 8,
  Normal = 6,
  Hard = 4,
}

export interface IUser {
  _id: string;
  displayName?: string;
  userName: string;
  email: string;
  role: UserRole;
}

export interface IAttempt {
  _id?: string;
  attemptWord: string;
  attemptNumber: number;
  duration: number;
}

export interface IGame {
  _id: string;
  name: string;
  playerId: string;
  word: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string; // user._id or 'game'
  started: Date;
  finished?: Date;
  duration: number;
  attempts: IAttempt[];
}
