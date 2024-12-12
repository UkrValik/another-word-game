import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post('new-words')
  @UseInterceptors(FileInterceptor('new-words-file'))
  async insertNewWords(@UploadedFile() file) {
    return this.vocabularyService.addNewWords(file.buffer.toString());
  }
}
