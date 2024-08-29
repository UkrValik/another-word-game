import { createSlice } from '@reduxjs/toolkit';

export enum GameLevel {
  Easy = 8,
  Normal = 6,
  Hard = 4,
}

export interface IAttempt {
  _id?: string;
  attemptWord: string;
  attemptNumber: number;
  duration: number;
}

export interface IGame {
  _id: string;
  playerId: string;
  word: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string; // user._id or 'game'
  started: Date;
  finished?: Date;
  duration?: number;
  attempts: IAttempt[];
}

export interface IGameSlice {
  finishedGames: IGame[];
  activeGames: IGame[];
}

const initialState: IGameSlice = {
  finishedGames: [],
  activeGames: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});

export default gameSlice.reducer;
