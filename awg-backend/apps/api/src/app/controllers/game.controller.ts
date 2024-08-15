import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { CreateGameDto } from '../dtos/create-game.dto';
import { GameCreate, GameGetById, GameGetByUser } from '@awg-backend/contracts';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@UseGuards(JWTAuthGuard)
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

  @Get('all')
  async getAllUserGames(@UserId() userId: string) {
    try {
      return this.rmqService.send<GameGetByUser.Request, GameGetByUser.Response>(GameGetByUser.topic, { userId });
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
    }
  }

  @Get(':id')
  async getGameById(@Param('id') _id: string) {
    try {
      return this.rmqService.send<GameGetById.Request, GameGetById.Response>(GameGetById.topic, { _id });
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
    } 
  }
}
