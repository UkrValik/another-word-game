import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import { getUserGames, selectFinishedGames } from '../../store/game.slice';
import { selectToken } from '../../store/user.slice';
import { GameCard } from '../common/components/game-card';
import { ScreenWrapper } from '../common/components/screen-wrapper';
import { ArchivStackParamList } from '../navigation/archiv-stack';

type Props = BottomTabScreenProps<ArchivStackParamList, 'ArchivScreen'>;

export const ArchivScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const finishedGames = useSelector(selectFinishedGames);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserGames(token));
    }, []),
  );

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
  },
  contentContainer: {
    alignItems: 'center',
  },
  bottomTabSafeArea: {
    height: 100,
  },
});
