import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
  duration: number;
  attempts: IAttempt[];
}

export interface IGameSlice {
  finishedGames: IGame[];
  activeGames: IGame[];
  loadingGame: boolean;
  loadingAttempt: boolean;
  gameError?: string;
  attemptError?: string;
}

const initialState: IGameSlice = {
  finishedGames: [],
  activeGames: [],
  loadingGame: false,
  loadingAttempt: false,
  gameError: '',
  attemptError: '',
};

export interface ICreateGameBody {
  name: string;
  playerId: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string;
  started: string;
}

export interface ICreateAttemptBody {
  attemptWord: string;
  attemptNumber: number;
  duration: number;
}

export interface ICreateGameDto {
  game: ICreateGameBody;
  token: string;
}

export interface ICreateAttemptDto {
  attempt: ICreateAttemptBody;
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

export const createAttempt = createAsyncThunk('game/add-attempt', async ({ attempt, token }: ICreateAttemptDto) => {
  const response = await fetch(baseUrl + 'game/add-attempt', {
    method: 'POST',
    headers: configHeaders(token),
    body: JSON.stringify(attempt),
  });
  return (await response.json()) as { game: IGame };
});

export interface AddDurationPayload {
  gameId: string;
  duration: number;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addDuration: (state, action: PayloadAction<AddDurationPayload>) => {
      const i = state.activeGames.findIndex((g) => g._id === action.payload.gameId);
      state.activeGames[i].duration += action.payload.duration;
    },
  },
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
        action.payload.games.reverse();
        state.activeGames = action.payload.games.filter((game) => {
          if (!game.finished) {
            const localGameCopy = state.activeGames.find((g) => g._id === game._id);
            if (localGameCopy) {
              game.duration = localGameCopy.duration > game.duration ? localGameCopy.duration : game.duration;
            }
            return game;
          }
        });
        state.finishedGames = action.payload.games.filter((game) => game.finished);
      })
      .addCase(getUserGames.rejected, (state, action) => {
        state.loadingGame = false;
        state.gameError = action.error.message;
      })
      // create game attempt flow
      .addCase(createAttempt.pending, (state) => {
        state.loadingAttempt = true;
        state.attemptError = '';
      })
      .addCase(createAttempt.fulfilled, (state, action) => {
        state.loadingAttempt = false;
        const { game } = action.payload;
        if (game.finished) {
          state.finishedGames.unshift(game);
          state.activeGames = state.activeGames.filter((g) => g._id !== game._id);
        } else {
          const i = state.activeGames.findIndex((g) => g._id === game._id);
          state.activeGames[i] = game;
        }
      })
      .addCase(createAttempt.rejected, (state, action) => {
        state.loadingAttempt = false;
        state.attemptError = action.error.message;
      });
  },
});

export const { addDuration } = gameSlice.actions;

export const selectActiveGames = (state: RootState) => state.game.activeGames;
export const selectFinishedGames = (state: RootState) => state.game.finishedGames;
export const selectAttemptLoading = (state: RootState) => state.game.loadingAttempt;
export const selectAttemptError = (state: RootState) => state.game.attemptError;

export default gameSlice.reducer;
