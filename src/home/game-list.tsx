import { ScrollView, StyleSheet } from "react-native";

import { GameCard } from "../common/components/game-card";
import { Game, GameRequestedByEnum, GameStateEnum } from "../common/types";

const games: Game[] = [
  {
    id: "1",
    state: GameStateEnum.active,
    timeSpent: 123,
    attemptsLeft: 3,
    gameRequestedBy: GameRequestedByEnum.app,
  },
  {
    id: "2",
    state: GameStateEnum.active,
    timeSpent: 321,
    attemptsLeft: 2,
    gameRequestedBy: GameRequestedByEnum.app,
  },
  {
    id: "3",
    state: GameStateEnum.active,
    timeSpent: 223,
    attemptsLeft: 3,
    gameRequestedBy: GameRequestedByEnum.app,
  },
];

export const GameList = () => {
  return (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.contentContainer}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
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
