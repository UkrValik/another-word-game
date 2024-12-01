import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GameList } from './game-list';
import { HomeHeader } from './header';
import { ScreenWrapper } from '../common/components/screen-wrapper';
import { HomeStackParamList } from '../navigation/home-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export const Home = ({ navigation }: Props) => {
  const navigateToGame = (gameId: string) => {
    navigation.navigate('GameScreen', { gameId });
  };

  return (
    <ScreenWrapper containerStyles={styles.container}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <HomeHeader />
        <GameList navigateToGame={navigateToGame} />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
