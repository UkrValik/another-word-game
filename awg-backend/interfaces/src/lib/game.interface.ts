import { IAttempt } from './attempt.interface';

export enum GameLevel {
  Easy = 8,
  Normal = 6,
  Hard = 4,
};

export interface IGame {
  _id?: string;
  word: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string;    // user._id or 'game'
  started: Date;
  finished?: Date;
  duration?: number;
  attempts: IAttempt[];
}
