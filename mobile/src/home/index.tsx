import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import { GameList } from "./game-list";
import { Game } from "../common/types";
import { HomeStackParamList } from "../navigation/home-stack";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export const Home = ({ navigation }: Props) => {
  const navigateToGame = (game: Game) => {
    navigation.navigate("GameScreen", { game });
  };

  return (
    <View style={styles.container}>
      <GameList navigateToGame={navigateToGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
