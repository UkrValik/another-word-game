import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArchivScreen } from '../archiv';
import { GameScreen } from '../game';

export type ArchivStackParamList = {
  ArchivScreen: undefined;
  GameScreen: { gameId: string };
};

const Stack = createNativeStackNavigator<ArchivStackParamList>();

export const ArchivStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ArchivScreen" component={ArchivScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
