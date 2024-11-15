import { baseUrl, configHeaders, retryNum } from './utils';
import { GameLevel, IGame } from '../src/common/types';

interface ICreateGameBody {
  name: string;
  playerId: string;
  length: number;
  gameLevel: GameLevel;
  createdBy: string;
  started: string;
}

interface ICreateAttemptBody {
  attemptWord: string;
  attemptNumber: number;
  duration: number;
}

interface ICreateGameDto {
  game: ICreateGameBody;
  token: string;
}

interface ICreateAttemptDto {
  attempt: ICreateAttemptBody;
  token: string;
}

interface ChangeGameDurationDto {
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

export const createAttemptPost = async ({ attempt, token }: ICreateAttemptDto): Promise<{ game: IGame }> => {
  for (let i = 0; i < retryNum; ++i) {
    const response = await fetch(baseUrl + 'game/add-attempt', {
      method: 'POST',
      headers: configHeaders(token),
      body: JSON.stringify(attempt),
    });
    if (response.ok) {
      return await response.json();
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
  console.log(gameId, duration);
  for (let i = 0; i < retryNum; ++i) {
    const response = await fetch(baseUrl + 'game/change-duration', {
      method: 'POST',
      headers: configHeaders(token),
      body: JSON.stringify({ gameId, duration }),
    });
    if (response.ok) {
      return await response.json();
    }
    console.log(await response.json());
  }
  throw new Error('Cannot change game duration');
};
