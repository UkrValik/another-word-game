import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import { HomeStackParamList } from "../navigation/home-stack";

type Props = NativeStackScreenProps<HomeStackParamList, "GameScreen">;

export const GameScreen = ({ route }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Game {route.params.game.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
