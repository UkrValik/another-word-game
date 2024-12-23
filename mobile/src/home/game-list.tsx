import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import { getUserGames, selectActiveGames } from '../../store/game.slice';
import { selectToken } from '../../store/user.slice';
import { GameCard } from '../common/components/game-card';

interface Props {
  navigateToGame: (gameId: string) => void;
}

export const GameList = ({ navigateToGame }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeGames = useSelector(selectActiveGames);
  const token = useSelector(selectToken);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserGames(token));
    }, []),
  );

  return (
    <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
      {activeGames.map((game) => (
        <GameCard key={game._id} game={game} navigateToGame={navigateToGame} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    marginTop: '5%',
  },
  contentContainer: {
    alignItems: 'center',
  },
});
