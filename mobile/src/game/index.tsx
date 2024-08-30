import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { GuessAttemptLetters, GuessAttemptLettersMethods } from './guess-attempt-letters';
import { IAttempt } from '../../store/game.slice';
import { HomeStackParamList } from '../navigation/home-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'GameScreen'>;

export const GameScreen = ({ route }: Props) => {
  const game = route.params.game;
  const attempts = game.attempts;
  const attemptsArray: (IAttempt | number)[] = [];

  for (let i = 0; i < game.gameLevel; ++i) {
    attemptsArray.push(attempts[i] ? attempts[i] : i);
  }

  const lineRef = useRef<GuessAttemptLettersMethods>(null);

  return (
    <TouchableWithoutFeedback onPress={() => lineRef.current?.blurAll()}>
      <View style={styles.container}>
        <View style={styles.attemptsWrapper}>
          {attemptsArray.map((attempt, index) => {
            const activeAttempt =
              (typeof attemptsArray[index] === 'number' && index === 0) ||
              (typeof attemptsArray[index - 1] === 'object' && typeof attemptsArray[index] === 'number');
            return (
              <GuessAttemptLetters
                key={JSON.stringify(attempt)}
                letterCount={game.length}
                attempt={attempt}
                activeAttempt={activeAttempt}
                ref={lineRef}
              />
            );
          })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
  },
  attemptsWrapper: {
    justifyContent: 'space-between',
    height: 336,
  },
});
