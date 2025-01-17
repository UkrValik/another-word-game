import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LetterTable } from './letter-table/letter-table';
import colors from '../../../assets/colors.json';
import { IAttempt, IGame } from '../types';

interface Props {
  game: IGame;
  navigateToGame: (gameId: string) => void;
}

export const GameCard = ({ game, navigateToGame }: Props) => {
  const attempts = game.attempts;
  const attemptsArray: (IAttempt | number)[] = [];

  const calculateTimeSpent = (timeSpent: number) => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  };

  for (let i = 0; i < game.gameLevel; ++i) {
    attemptsArray.push(attempts[i] ? attempts[i] : i);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigateToGame(game._id)}>
      <View style={styles.avatarContainer}>
        <View style={styles.letterTableWrapper}>
          <LetterTable size={8 + (2 / 3) * game.length} attemptsArray={attemptsArray} game={game} />
        </View>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleLabel}>{game.name}</Text>
        <Text style={styles.timeLabel}>{calculateTimeSpent(game.duration)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: '1%',
    width: '90%',
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
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 75,
    height: 75,
    backgroundColor: colors['blue-sky'],
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTableWrapper: {
    width: '80%',
  },
  timeLabel: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 16,
  },
});
