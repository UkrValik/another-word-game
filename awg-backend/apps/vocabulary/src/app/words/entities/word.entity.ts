import { IWord } from "@awg-backend/interfaces";

export class WordEntity implements IWord {
  _id?: string;
  value: string;
  length: number;

  constructor(word: IWord) {
    this._id = word._id;
    this.value = word.value;
    this.length = word.length;
  }
}
