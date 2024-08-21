import { Injectable } from '@nestjs/common';
import { GameRepository } from './repositories/game.repository';
import { AttemptCreate, GameCreate } from '@awg-backend/contracts';
import { GameEntity } from './entities/game.entity';
import { AttemptEntity } from './entities/attempt.entity';
import { IWord } from '@awg-backend/interfaces';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
  ) {}

  async createGame(game: GameCreate.Request, word: IWord) {
    const newGameEntity = new GameEntity({
      playerId: game.playerId,
      word: word.value,
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

  async addAttempt({ gameId, attempt }: AttemptCreate.Request) {
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error('Game not found');
    }
    const newAttemptEntity = new AttemptEntity({
      attemptWord: attempt.attemptWord,
      attemptNumber: attempt.attemptNumber,
      duration: attempt.duration,
    });
    const gameEntity = new GameEntity(game);
    gameEntity.addAttempt(newAttemptEntity);
    return this.gameRepository.updateGame(gameEntity);
  }
}
