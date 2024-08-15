import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../models/game.model';
import { Model } from 'mongoose';
import { Attempt } from '../models/attempt.model';
import { Injectable } from '@nestjs/common';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class GameRepository {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @InjectModel(Attempt.name) private readonly attemptModel: Model<Attempt>,
  ) {}

  async createGame(game: GameEntity) {
    const newGame = new this.gameModel(game);
    return newGame.save();
  }

  async updateGame(game: GameEntity) {
    const updatedGame = await this.gameModel.updateOne({ _id: game._id }, game).exec();
    return updatedGame;
  }

  async findById(_id: string) {
    const game = await this.gameModel.findOne({ _id }).exec();
    return game;
  }

  async findByUser(playerId: string) {
    const games = await this.gameModel.find({ playerId }).exec();
    return games;
  }
}
