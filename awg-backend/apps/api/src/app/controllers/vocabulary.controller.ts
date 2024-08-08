import { VocabularyNewWords } from '@awg-backend/contracts';
import { Controller, Post, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RMQService } from 'nestjs-rmq';

@Controller('vocabulary')
export class VocabularyController {
  constructor(
    private readonly rmqService: RMQService,
  ) {}

  @Post('new-words')
  @UseInterceptors(FileInterceptor('new-words-file'))
  async insertNewWords(@UploadedFile() file) {
    try {
      return await this.rmqService.send<VocabularyNewWords.Request, VocabularyNewWords.Response>(VocabularyNewWords.topic, { wordsString: file.buffer.toString() });
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}