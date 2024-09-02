import { GameLevel, IGame } from '@awg-backend/interfaces';
import { AttemptEntity } from './attempt.entity';

export class GameEntity implements IGame {
  _id?: string;
  name: string;
  playerId: string;
  word: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string;
  started: Date;
  finished?: Date;
  duration: number;
  attempts: AttemptEntity[];

  constructor(game: IGame) {
    this._id = game._id;
    this.name = game.name;
    this.playerId = game.playerId;
    this.word = game.word;
    this.length = game.length;
    this.gameLevel = game.gameLevel;
    this.createdBy = game.createdBy;
    this.started = game.started;
    this.duration = game.duration;
    this.attempts = game.attempts;
  }

  public finish() {
    this.finished = new Date();
  }

  public addAttempt(attempt: AttemptEntity) {
    this.attempts.push(attempt);
    this.duration += attempt.duration;
  }
}
