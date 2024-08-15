import { Injectable } from '@nestjs/common';
import { GameRepository } from './repositories/game.repository';
import { GameCreate } from '@awg-backend/contracts';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
  ) {}

  async createGame(game: GameCreate.Request) {
    const newGameEntity = new GameEntity({
      playerId: game.playerId,
      word: game.word,
      length: game.length,
      gameLevel: game.gameLevel,
      createdBy: game.createdBy,
      started: new Date(game.started),
      attempts: [],
    });
    const newGame = await this.gameRepository.createGame(newGameEntity);
    return newGame;
  }

  async findById(_id: string) {
    return this.gameRepository.findById(_id);
  }

  async findByUser(playerId: string) {
    return this.gameRepository.findByUser(playerId);
  }
}
