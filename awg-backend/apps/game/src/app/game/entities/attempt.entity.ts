import { IAttempt } from '@awg-backend/interfaces';

export class AttemptEntity implements IAttempt {
  _id?: string;
  attemptWord: string;
  attemptNumber: number;
  duration: number;

  constructor(attempt: IAttempt) {
    this._id = attempt._id;
    this.attemptNumber = attempt.attemptNumber;
    this.attemptWord = attempt.attemptWord;
    this.duration = attempt.duration;
  }
}
