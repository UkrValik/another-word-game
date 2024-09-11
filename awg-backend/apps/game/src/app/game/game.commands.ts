import { Body, Controller, NotFoundException } from '@nestjs/common';
import { GameService } from './game.service';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { AttemptCreate, ChangeGameDuration, GameCreate, VocabularyRandomByLength, VocabularyWordExists } from '@awg-backend/contracts';

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
    const { exist } = await this.rmqService.send<VocabularyWordExists.Request, VocabularyWordExists.Response>(VocabularyWordExists.topic, { value: attemptRequest.attempt.attemptWord });
    if (!exist) {
      throw new NotFoundException('This word does not exist');
    }
    const game = await this.gameService.addAttempt(attemptRequest);
    return { game };
  }

  @RMQValidate()
  @RMQRoute(ChangeGameDuration.topic)
  async changeGameDuration(@Body() changeDurationDto: ChangeGameDuration.Request): Promise<ChangeGameDuration.Response> {
    return await this.gameService.changeDuration(changeDurationDto);
  }
}
