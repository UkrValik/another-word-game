import { Body, Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { GameGetById, GameGetByUser } from '@awg-backend/contracts';

@Controller()
export class GameQueries {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @RMQValidate()
  @RMQRoute(GameGetById.topic)
  async getById(@Body() { _id }: GameGetById.Request): Promise<GameGetById.Response> {
    const game = await this.gameService.findById(_id);
    return { game };
  }

  @RMQValidate()
  @RMQRoute(GameGetByUser.topic)
  async getByUser(@Body() { userId }: GameGetByUser.Request) {
    const games = await this.gameService.findByUser(userId);
    return { games };
  }
}
