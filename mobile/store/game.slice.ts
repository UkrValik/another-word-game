import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
const configHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
});

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
  name: string;
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
  loadingGame: boolean;
  gameError?: string;
}

const initialState: IGameSlice = {
  finishedGames: [],
  activeGames: [],
  loadingGame: false,
  gameError: '',
};

export interface ICreateGameBody {
  name: string;
  playerId: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string;
  started: string;
}

export interface ICreateGameDto {
  game: ICreateGameBody;
  token: string;
}

export const createGame = createAsyncThunk('game/new', async ({ game, token }: ICreateGameDto) => {
  const response = await fetch(baseUrl + 'game/new', {
    method: 'POST',
    headers: configHeaders(token),
    body: JSON.stringify(game),
  });
  return (await response.json()) as IGame;
});

export const getUserGames = createAsyncThunk('game/all', async (token: string) => {
  const response = await fetch(baseUrl + 'game/all', {
    headers: configHeaders(token),
  });
  return (await response.json()) as { games: IGame[] };
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create game flow
      .addCase(createGame.pending, (state) => {
        state.loadingGame = true;
        state.gameError = '';
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.loadingGame = false;
        state.gameError = '';
        state.activeGames.unshift(action.payload);
      })
      .addCase(createGame.rejected, (state, action) => {
        state.loadingGame = false;
        state.gameError = action.error.message;
      })
      // get all user games flow
      .addCase(getUserGames.pending, (state) => {
        state.loadingGame = true;
        state.gameError = '';
      })
      .addCase(getUserGames.fulfilled, (state, action) => {
        state.loadingGame = false;
        state.gameError = '';
        state.activeGames = action.payload.games.filter((game) => !game.finished);
        state.finishedGames = action.payload.games.filter((game) => game.finished);
      })
      .addCase(getUserGames.rejected, (state, action) => {
        state.loadingGame = false;
        state.gameError = action.error.message;
      });
  },
});

export const selectActiveGames = (state: RootState) => state.game.activeGames;
export const selectFinishedGames = (state: RootState) => state.game.finishedGames;

export default gameSlice.reducer;
