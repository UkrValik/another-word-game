import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectActiveGames } from '../../store/game.slice';
import { GameCard } from '../common/components/game-card';

interface Props {
  navigateToGame: (gameId: string) => void;
}

export const GameList = ({ navigateToGame }: Props) => {
  const activeGames = useSelector(selectActiveGames);

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
