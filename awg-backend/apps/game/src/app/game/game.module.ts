import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { Attempt, AttemptSchema } from './models/attempt.model';
import { GameRepository } from './repositories/game.repository';
import { GameService } from './game.service';
import { GameCommands } from './game.commands';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Attempt.name, schema: AttemptSchema },
    ]),
  ],
  controllers: [GameCommands],
  providers: [GameRepository, GameService],
})
export class GameModule {}
