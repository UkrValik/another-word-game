import { StyleSheet, View } from "react-native";

import { GameList } from "./game-list";

export const Home = () => {
  return (
    <View style={styles.container}>
      <GameList />
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
