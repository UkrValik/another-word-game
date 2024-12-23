import { StyleSheet, Text, View } from 'react-native';

import * as colors from '../../assets/colors.json';
import { IGame } from '../common/types';

interface Props {
  game: IGame;
  duration: number;
}

export const GameHeader = ({ game, duration }: Props) => {
  const calculateTimeSpent = (timeSpent: number) => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  };

  return (
    <View style={styles.gameHeaderContainer}>
      <View>
        <Text style={styles.gameHeader}>{game.name}</Text>
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>{calculateTimeSpent(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: '5%',
    height: '5%',
  },
  gameHeader: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
  durationText: {
    color: colors.black,
    fontSize: 20,
  },
  durationContainer: {
    alignItems: 'flex-start',
    width: '17%',
  },
});
