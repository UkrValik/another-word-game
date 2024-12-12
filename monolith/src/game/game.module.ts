import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularyModule } from 'src/vocabulary/vocabulary.module';
import { Game, GameSchema } from './models/game.model';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameRepository } from './repositories/game.repository';

@Module({
  imports: [
    VocabularyModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
