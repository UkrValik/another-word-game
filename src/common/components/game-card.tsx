import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../assets/colors.json';
import { Game, GameRequestedByEnum } from '../../home/game-list';

interface Props {
  game: Game,
};

export const GameCard = ({ game }: Props) => {
  const calculateTimeSpent = (timeSpent: number) => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
  }

  return (
    <TouchableOpacity style={styles.container}>
      {game.gameRequestedBy === GameRequestedByEnum.app && (
        <View style={styles.titleWrapper}>
          <Text style={styles.titleLabel}>
            Game {game.id}
          </Text>
        </View>
      )}
      <View style={styles.timeAttemptsContainer}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            Time Spent: {calculateTimeSpent(game.timeSpent)}
          </Text>
        </View>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            Attempts Left: {game.attemptsLeft.toString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: colors.black,
    borderRadius: 10,
    marginVertical: '1%',
    width: '90%',
  },
  timeAttemptsContainer: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
  },
  labelWrapper: {
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  label: {
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: 12,
  },
  titleWrapper: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    marginVertical: '2%',
  },
  titleLabel: {
    color: colors.black,
    fontSize: 20,
  },
});
