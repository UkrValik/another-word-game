import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { GuessAttemptLetters, GuessAttemptLettersMethods } from './guess-attempt-letters';
import * as colors from '../../assets/colors.json';
import { AppDispatch } from '../../store';
import { IAttempt, addDuration } from '../../store/game.slice';
import { HomeStackParamList } from '../navigation/home-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'GameScreen'>;

export const GameScreen = ({ route }: Props) => {
  const game = route.params.game;
  const attempts = game.attempts;
  const attemptsArray: (IAttempt | number)[] = [];

  const dispatch = useDispatch<AppDispatch>();

  for (let i = 0; i < game.gameLevel; ++i) {
    attemptsArray.push(attempts[i] ? attempts[i] : i);
  }

  const [duration, setDuration] = useState(0);

  const durationRef = useRef(0);
  const lineRef = useRef<GuessAttemptLettersMethods>(null);

  const calculateTimeSpent = (timeSpent: number) => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        setDuration((duration) => duration + 1);
        durationRef.current += 1;
      }, 1000);
      return () => {
        dispatch(addDuration({ gameId: game._id, duration: durationRef.current }));
        clearInterval(interval);
      };
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={() => lineRef.current?.blurAll()}>
      <View style={styles.container}>
        <View style={styles.gameHeaderContainer}>
          <View>
            <Text style={styles.gameHeader}>{game.name}</Text>
          </View>
          <View>
            <Text style={styles.durationText}>{calculateTimeSpent((game.duration || 0) + duration)}</Text>
          </View>
        </View>
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
    backgroundColor: colors.white,
  },
  attemptsWrapper: {
    margin: 10,
    justifyContent: 'space-between',
    height: 336,
  },
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
    fontSize: 20,
  },
  durationText: {
    color: colors.black,
    fontSize: 18,
  },
});
