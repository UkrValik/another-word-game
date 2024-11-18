import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  ChangeGameDurationDto,
  ICreateAttemptDto,
  ICreateGameDto,
  allUserGamesGet,
  changeGameDurationPost,
  createAttemptPost,
  createGamePost,
} from '../api/game';
import { IGame } from '../src/common/types';

import { RootState } from '.';

export interface IGameSlice {
  finishedGames: IGame[];
  activeGames: IGame[];
  wordNotFound: boolean;
  loadingGame: boolean;
  loadingAttempt: boolean;
  gameError?: string;
  attemptError?: string;
}

const initialState: IGameSlice = {
  finishedGames: [],
  activeGames: [],
  wordNotFound: false,
  loadingGame: false,
  loadingAttempt: false,
  gameError: '',
  attemptError: '',
};

export const createGame = createAsyncThunk('game/new', async ({ game, token }: ICreateGameDto) => {
  return (await createGamePost({ game, token })) as IGame;
});

export const getUserGames = createAsyncThunk('game/all', async (token: string) => {
  return (await allUserGamesGet(token)) as { games: IGame[] };
});

export const createAttempt = createAsyncThunk('game/add-attempt', async ({ attemptBody, token }: ICreateAttemptDto) => {
  return await createAttemptPost({ attemptBody, token });
});

export const changeGameDuration = createAsyncThunk(
  'game/change-duration',
  async ({ gameId, duration, token }: ChangeGameDurationDto) => {
    return await changeGameDurationPost({ gameId, duration, token });
  },
);

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
      if (i !== -1) {
        state.activeGames[i].duration = action.payload.duration;
      }
    },
    saveWordNotFound: (state, action: PayloadAction<boolean>) => {
      state.wordNotFound = action.payload;
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
        state.wordNotFound = false;
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
        state.wordNotFound = true;
      });
  },
});

export const { addDuration, saveWordNotFound } = gameSlice.actions;

export const selectActiveGames = (state: RootState) => state.game.activeGames;
export const selectFinishedGames = (state: RootState) => state.game.finishedGames;
export const selectAttemptLoading = (state: RootState) => state.game.loadingAttempt;
export const selectAttemptError = (state: RootState) => state.game.attemptError;
export const selectWordNotFound = (state: RootState) => state.game.wordNotFound;

export default gameSlice.reducer;
