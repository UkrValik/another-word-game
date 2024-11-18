import { baseUrl, configHeaders, retryNum } from './utils';
import { GameLevel, IGame } from '../src/common/types';

export interface ICreateGameBody {
  name: string;
  playerId: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string;
  started: string;
}

export interface ICreateAttemptBody {
  gameId: string;
  attempt: {
    attemptWord: string;
    attemptNumber: number;
    duration: number;
  };
}

export interface ICreateGameDto {
  game: ICreateGameBody;
  token: string;
}

export interface ICreateAttemptDto {
  attemptBody: ICreateAttemptBody;
  token: string;
}

export interface ChangeGameDurationDto {
  gameId: string;
  duration: number;
  token: string;
}

export const createGamePost = async ({ game, token }: ICreateGameDto): Promise<IGame> => {
  for (let i = 0; i < retryNum; ++i) {
    const response = await fetch(baseUrl + 'game/new', {
      method: 'POST',
      headers: configHeaders(token),
      body: JSON.stringify(game),
    });
    if (response.ok) {
      return await response.json();
    }
  }
  throw new Error('Cannot create game');
};

export const createAttemptPost = async ({ attemptBody, token }: ICreateAttemptDto): Promise<{ game: IGame }> => {
  for (let i = 0; i < retryNum; ++i) {
    const response = await fetch(baseUrl + 'game/add-attempt', {
      method: 'POST',
      headers: configHeaders(token),
      body: JSON.stringify(attemptBody),
    });
    if (response.ok) {
      return await response.json();
    }
    if (response.status === 404) {
      throw await response.json();
    }
  }
  throw new Error('Cannot create attempt');
};

export const allUserGamesGet = async (token: string): Promise<{ games: IGame[] }> => {
  for (let i = 0; i < retryNum; ++i) {
    const response = await fetch(baseUrl + 'game/all', {
      headers: configHeaders(token),
    });
    if (response.ok) {
      return await response.json();
    }
  }
  throw new Error('Cannot fetch user games');
};

export const changeGameDurationPost = async ({ gameId, duration, token }: ChangeGameDurationDto) => {
  for (let i = 0; i < retryNum; ++i) {
    const response = await fetch(baseUrl + 'game/change-duration', {
      method: 'POST',
      headers: configHeaders(token),
      body: JSON.stringify({ gameId, duration }),
    });
    if (response.ok) {
      return await response.json();
    }
  }
  throw new Error('Cannot change game duration');
};
