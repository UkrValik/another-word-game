import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GuessAttemptLetters, GuessAttemptLettersMethods } from './guess-attempt-letters';
import * as colors from '../../assets/colors.json';
import { AppDispatch } from '../../store';
import {
  addDuration,
  changeGameDuration,
  createAttempt,
  saveWordNotFound,
  selectActiveGames,
  selectFinishedGames,
  selectWordNotFound,
} from '../../store/game.slice';
import { selectToken } from '../../store/user.slice';
import { OpacityButton } from '../common/components/opacity-button';
import { IAttempt } from '../common/types';
import { HomeStackParamList } from '../navigation/home-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'GameScreen'>;

export const GameScreen = ({ route }: Props) => {
  const wordNotFoundText = 'This word does not exist';

  const activeGames = useSelector(selectActiveGames);
  const finishedGames = useSelector(selectFinishedGames);
  const gameId = route.params.gameId;
  const game = [...activeGames, ...finishedGames].find((g) => g._id === gameId)!;
  const attempts = game.attempts;
  const attemptsArray: (IAttempt | number)[] = [];

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const wordNotFound = useSelector(selectWordNotFound);

  for (let i = 0; i < game.gameLevel; ++i) {
    attemptsArray.push(attempts[i] ? attempts[i] : i);
  }

  const [attemptWord, setAttemptWord] = useState('');
  const [duration, setDuration] = useState(game.duration);
  const [showWordNotFound, setShowWordNotFound] = useState(false);

  const durationRef = useRef(game.duration);
  const gameRef = useRef(game);
  const lineRef = useRef<GuessAttemptLettersMethods>(null);

  const calculateTimeSpent = (timeSpent: number) => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  };

  const onCreateAttempt = () => {
    const previousDuration = attempts.reduce(
      (sum, currAtt) => {
        sum.duration += currAtt.duration;
        return sum;
      },
      { attemptNumber: 0, attemptWord: '', duration: 0 },
    ).duration;
    const attempt: IAttempt = {
      attemptWord,
      attemptNumber: attempts.length + 1,
      duration: duration - previousDuration,
    };
    const attemptBody = {
      attempt,
      gameId: game._id,
    };
    if (attemptWord.length === game.length) {
      dispatch(createAttempt({ attemptBody, token }));
      dispatch(changeGameDuration({ gameId: game._id, duration: durationRef.current, token }));
      setAttemptWord('');
    }
  };

  if (wordNotFound) {
    dispatch(saveWordNotFound(false));
    setShowWordNotFound(true);
    setTimeout(() => setShowWordNotFound(false), 5000);
  }

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        if (gameRef.current.finished) {
          clearInterval(interval);
        } else {
          setDuration((duration) => duration + 1);
          durationRef.current += 1;
        }
      }, 1000);
      return () => {
        if (!gameRef.current.finished) {
          dispatch(addDuration({ gameId: game._id, duration: durationRef.current }));
          dispatch(changeGameDuration({ gameId: game._id, duration: durationRef.current, token }));
          clearInterval(interval);
        }
      };
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={() => lineRef.current?.blur()}>
      <View style={styles.container}>
        <View style={styles.gameHeaderContainer}>
          <View>
            <Text style={styles.gameHeader}>{game.name}</Text>
          </View>
          <View>
            <Text style={styles.durationText}>{calculateTimeSpent(duration)}</Text>
          </View>
        </View>
        {!showWordNotFound && !game.finished && <View style={{ height: 15 }} />}
        {showWordNotFound && <Text style={styles.warningText}>{wordNotFoundText}</Text>}
        {game.finished && <Text>{game.word}</Text>}
        <View style={styles.attemptsWrapper}>
          {attemptsArray.map((attempt, index) => {
            const activeAttempt =
              (typeof attemptsArray[index] === 'number' && index === 0) ||
              (typeof attemptsArray[index - 1] === 'object' && typeof attemptsArray[index] === 'number');
            return (
              <GuessAttemptLetters
                key={JSON.stringify(attempt)}
                ref={lineRef}
                letterCount={game.length}
                attempt={attempt}
                activeAttempt={activeAttempt}
                attemptWord={attemptWord}
                setAttemptWord={setAttemptWord}
              />
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <OpacityButton
            onPress={onCreateAttempt}
            title={'Guess Attempt'}
            disabled={attemptWord.length !== game.length}
          />
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  warningText: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    color: 'red',
  },
});
