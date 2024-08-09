import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { RMQService } from "nestjs-rmq";
import { CreateGameDto } from "../dtos/create-game.dto";
import { GameCreate } from "@awg-backend/contracts";

@Controller('game')
export class GameController {
  constructor(
    private readonly rmqService: RMQService,
  ) {}

  @Post('new')
  async startNewGame(@Body() dto: CreateGameDto) {
    try {
      return this.rmqService.send<GameCreate.Request, GameCreate.Response>(GameCreate.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
    }
  }
}
