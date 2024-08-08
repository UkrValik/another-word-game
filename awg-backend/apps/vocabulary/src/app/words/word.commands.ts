import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { VocabularyNewWords } from '@awg-backend/contracts';
import { WordService } from './word.service';

@Controller()
export class WordCommands {
  constructor(
    private readonly wordService: WordService,
  ) {}

  @RMQValidate()
  @RMQRoute(VocabularyNewWords.topic)
  async addNewWords(@Body() { wordsString }: VocabularyNewWords.Request): Promise<VocabularyNewWords.Response> {
    return this.wordService.addNewWords(wordsString);
  }
}