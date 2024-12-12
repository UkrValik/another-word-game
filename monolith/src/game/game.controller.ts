import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { UserId } from 'src/guards/user.decorator';
import { AddAttemptDto } from './dtos/add-attempt.dto';
import { ChangeGameDurationDto } from './dtos/change-game-duration.dto';
import { CreateGameDto } from './dtos/create-game.dto';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly vocabularyService: VocabularyService,
  ) {}

  @Post('new')
  async startNewGame(@Body() dto: CreateGameDto) {
    const word = await this.vocabularyService.getRandomWordByLength(dto.length);
    return this.gameService.createGame(dto, word);
  }

  @Post('add-attempt')
  async addAttempt(@Body() dto: AddAttemptDto) {
    const exist = await this.vocabularyService.findByValue(
      dto.attempt.attemptWord,
    );
    if (!exist) {
      throw new NotFoundException('This word does not exist');
    }
    const game = await this.gameService.addAttempt(dto);
    return { game };
  }

  @Post('change-duration')
  async changeDuration(@Body() dto: ChangeGameDurationDto) {
    return await this.gameService.changeDuration(dto);
  }

  @Get('all')
  async getAllUserGames(@UserId() userId: string) {
    const games = await this.gameService.findByUser(userId);
    return { games };
  }

  @Get(':id')
  async getGameById(@Param('id') _id: string) {
    const game = await this.gameService.findById(_id);
    return { game };
  }
}
