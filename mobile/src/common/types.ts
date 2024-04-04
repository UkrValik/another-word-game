export enum GameStateEnum {
  active = "active",
  finished = "finished",
}

export enum GameRequestedByEnum {
  player = "player",
  app = "app",
}

export type Game = {
  id: string;
  state: GameStateEnum;
  timeSpent: number;
  attemptsLeft: number;
  attemptsCount: number;
  gameRequestedBy: GameRequestedByEnum;
  secretWord: string;
  attempts: Attempt[];
};

export type Attempt = {
  id: string;
  gameId: string;
  word: string;
  guessedLettersIndexes: number[];
  lettersInSecretWordIndexes: number[];
};
