import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IGame } from '../../store/game.slice';
import { GameScreen } from '../game';
import { Home } from '../home';

export type HomeStackParamList = {
  Home: undefined;
  GameScreen: { game: IGame };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
