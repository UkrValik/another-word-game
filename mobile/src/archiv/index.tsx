import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectFinishedGames } from '../../store/game.slice';
import { GameCard } from '../common/components/game-card';
import { ScreenWrapper } from '../common/components/screen-wrapper';
import { ArchivStackParamList } from '../navigation/archiv-stack';

type Props = BottomTabScreenProps<ArchivStackParamList, 'ArchivScreen'>;

export const ArchivScreen = ({ navigation }: Props) => {
  const finishedGames = useSelector(selectFinishedGames);

  const navigateToGame = (gameId: string) => {
    navigation.navigate('GameScreen', { gameId });
  };

  return (
    <ScreenWrapper safe containerStyles={{ flex: 1, width: '100%' }}>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
        {finishedGames.map((game) => (
          <GameCard key={game._id} game={game} navigateToGame={navigateToGame} />
        ))}
      </ScrollView>
      <View style={styles.bottomTabSafeArea} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    // marginTop: '5%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  bottomTabSafeArea: {
    height: 100,
  },
});
