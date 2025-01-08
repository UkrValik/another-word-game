import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { GameList } from './game-list';
import { HomeHeader } from './header';
import * as colors from '../../assets/colors.json';
import { selectActiveGames } from '../../store/game.slice';
import { ScreenWrapper } from '../common/components/screen-wrapper';
import { HomeStackParamList } from '../navigation/home-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export const Home = ({ navigation }: Props) => {
  const navigateToGame = (gameId: string) => {
    navigation.navigate('GameScreen', { gameId });
  };

  const activeGames = useSelector(selectActiveGames);

  return (
    <ScreenWrapper containerStyles={styles.container}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <HomeHeader />
        {activeGames.length && <GameList navigateToGame={navigateToGame} />}
        {!activeGames.length && (
          <View style={styles.arrowContainer}>
            <Image style={styles.arrowImage} source={require('../../assets/arrow.png')} />
            <Text style={styles.textStyle}>No active games.</Text>
            <Text style={styles.textStyle}>Tap "New game" to start.</Text>
          </View>
        )}
        <View style={styles.bottomTabSafeArea} />
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
  bottomTabSafeArea: {
    height: 100,
  },
  arrowImage: {
    width: 300,
    height: 400,
    marginTop: -75,
    marginBottom: -75,
  },
  arrowContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: colors['grey-light'],
    fontSize: 16,
  },
});
