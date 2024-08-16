import { Body, Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AttemptCreate, GameCreate } from '@awg-backend/contracts';

@Controller()
export class GameCommands {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @RMQValidate()
  @RMQRoute(GameCreate.topic)
  async createGame(@Body() game: GameCreate.Request): Promise<GameCreate.Response> {
    return this.gameService.createGame(game);
  }

  @RMQValidate()
  @RMQRoute(AttemptCreate.topic)
  async createAttempt(@Body() attemptRequest: AttemptCreate.Request): Promise<AttemptCreate.Response> {
    const game = await this.gameService.addAttempt(attemptRequest);
    return { game };
  }
}
