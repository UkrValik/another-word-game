import { ScrollView, StyleSheet } from "react-native";

import { GameCard } from "../common/components/game-card";
import {
  Attempt,
  Game,
  GameRequestedByEnum,
  GameStateEnum,
} from "../common/types";

const attempts: Attempt[] = [
  {
    id: "1",
    gameId: "1",
    word: "access",
    guessedLettersIndexes: [],
    lettersInSecretWordIndexes: [0],
  },
  {
    id: "2",
    gameId: "1",
    word: "advice",
    guessedLettersIndexes: [],
    lettersInSecretWordIndexes: [0],
  },
  {
    id: "3",
    gameId: "1",
    word: "breath",
    guessedLettersIndexes: [0, 3],
    lettersInSecretWordIndexes: [],
  },
  {
    id: "4",
    gameId: "2",
    word: "appeal",
    guessedLettersIndexes: [],
    lettersInSecretWordIndexes: [0, 4],
  },
  {
    id: "5",
    gameId: "2",
    word: "bureau",
    guessedLettersIndexes: [0],
    lettersInSecretWordIndexes: [4],
  },
  {
    id: "6",
    gameId: "3",
    word: "button",
    guessedLettersIndexes: [0],
    lettersInSecretWordIndexes: [],
  },
];

const games: Game[] = [
  {
    id: "1",
    state: GameStateEnum.active,
    timeSpent: 123,
    attemptsLeft: 3,
    attemptsCount: 6,
    secretWord: "banana",
    gameRequestedBy: GameRequestedByEnum.app,
    attempts: [attempts[0], attempts[1], attempts[2]],
  },
  {
    id: "2",
    state: GameStateEnum.active,
    timeSpent: 321,
    attemptsLeft: 4,
    attemptsCount: 6,
    secretWord: "banana",
    gameRequestedBy: GameRequestedByEnum.app,
    attempts: [attempts[3], attempts[4]],
  },
  {
    id: "3",
    state: GameStateEnum.active,
    timeSpent: 223,
    attemptsLeft: 3,
    attemptsCount: 4,
    secretWord: "banana",
    gameRequestedBy: GameRequestedByEnum.app,
    attempts: [attempts[5]],
  },
];

interface Props {
  navigateToGame: (game: Game) => void;
}

export const GameList = ({ navigateToGame }: Props) => {
  return (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.contentContainer}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} navigateToGame={navigateToGame} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
  },
});
