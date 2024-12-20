import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../models/game.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class GameRepository {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
  ) {}

  async createGame(game: GameEntity) {
    const newGame = new this.gameModel(game);
    return newGame.save();
  }

  async updateGame(game: GameEntity) {
    await this.gameModel.updateOne({ _id: game._id }, game).exec();
    const updatedGame = await this.gameModel.findOne({ _id: game._id }).exec();
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
