import { BadRequestException, Body, Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { AttemptCreate, GameCreate, VocabularyRandomByLength } from '@awg-backend/contracts';

@Controller()
export class GameCommands {
  constructor(
    private readonly gameService: GameService,
    private readonly rmqService: RMQService,
  ) {}

  @RMQValidate()
  @RMQRoute(GameCreate.topic)
  async createGame(@Body() game: GameCreate.Request): Promise<GameCreate.Response> {
    const { word } = await this.rmqService.send<VocabularyRandomByLength.Request, VocabularyRandomByLength.Response>(VocabularyRandomByLength.topic, { length: game.length });
    return this.gameService.createGame(game, word);
  }

  @RMQValidate()
  @RMQRoute(AttemptCreate.topic)
  async createAttempt(@Body() attemptRequest: AttemptCreate.Request): Promise<AttemptCreate.Response> {
    const game = await this.gameService.addAttempt(attemptRequest);
    return { game };
  }
}
