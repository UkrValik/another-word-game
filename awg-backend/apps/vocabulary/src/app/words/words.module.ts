import { Module } from '@nestjs/common';
import { WordRepository } from './repositories/word.repository';
import { WordCommands } from './word.commands';
import { WordService } from './word.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './models/word.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Word.name, schema: WordSchema },
  ])],
  providers: [WordRepository, WordService],
  controllers: [WordCommands],
  exports: [WordRepository],
})
export class WordsModule {}
