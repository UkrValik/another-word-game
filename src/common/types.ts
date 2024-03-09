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
  gameRequestedBy: GameRequestedByEnum;
};
