import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { GameRepository } from './repositories/game.repository';
import { GameService } from './game.service';
import { GameCommands } from './game.commands';
import { GameQueries } from './game.queries';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
    ]),
  ],
  controllers: [GameCommands, GameQueries],
  providers: [GameRepository, GameService],
})
export class GameModule {}
