import { Injectable } from '@nestjs/common';
import { WordEntity } from './entities/word.entity';
import { WordRepository } from './repositories/word.repository';

@Injectable()
export class WordService {
  constructor(
    private readonly wordRepository: WordRepository,
  ) {}

  public async addNewWords(wordsString: string) {
    const words = wordsString.split('\n').map((w) => new WordEntity({
      value: w.trim(),
      length: w.trim().length,
    }));
    return this.wordRepository.createMany(words);
  }

  public async getRandomWordByLength(length: number) {
    const word = await this.wordRepository.getRandomWordByLength(length);
    return word[0];
  }
}
