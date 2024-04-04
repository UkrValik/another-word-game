import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Game } from "../common/types";
import { GameScreen } from "../game";
import { Home } from "../home";

export type HomeStackParamList = {
  Home: undefined;
  GameScreen: { game: Game };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
