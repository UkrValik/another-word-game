import { InjectModel } from '@nestjs/mongoose';
import { Word } from '../models/word.model';
import { Model } from 'mongoose';
import { WordEntity } from '../entities/word.entity';
import { Injectable } from '@nestjs/common';
import { IWord } from '@awg-backend/interfaces';

@Injectable()
export class WordRepository {
  constructor(
    @InjectModel(Word.name) private readonly wordModel: Model<Word>
  ) {}
  
  async createWord(word: WordEntity) {
    const oldWord = await this.wordModel.findOne({ value: word.value }).exec();
    if (oldWord) return oldWord;
    const newWord = new this.wordModel(word);
    return newWord.save();
  }

  async createMany(words: WordEntity[]) {
    const newWords = [];
    for (const word of words) {
      const  newWord = await this.createWord(word);
      newWords.push(newWord);
    }
    return newWords;
  }

  async getRandomWordByLength(length: number) {
    return this.wordModel.aggregate<IWord>([
      { $match: { length } },
      { $sample: { size: 1 } },
    ]).exec();
  }
}
