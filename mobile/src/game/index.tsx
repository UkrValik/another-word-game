import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GameHeader } from './header';
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
import { LetterTable } from '../common/components/letter-table/letter-table';
import { OpacityButton } from '../common/components/opacity-button';
import { ScreenWrapper } from '../common/components/screen-wrapper';
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

  for (let i = 0; i < game.gameLevel; ++i) {
    attemptsArray.push(attempts[i] ? attempts[i] : i);
  }

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const wordNotFound = useSelector(selectWordNotFound);

  const [attemptWord, setAttemptWord] = useState('');
  const [duration, setDuration] = useState(game.duration);
  const [showWordNotFound, setShowWordNotFound] = useState(false);

  const wordInputRef = useRef<TextInput>(null);
  const durationRef = useRef(game.duration);
  const gameRef = useRef(game);

  const focusWordInput = () => {
    wordInputRef.current?.focus();
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
      attemptWord: attemptWord.toLowerCase(),
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
    <ScreenWrapper safe onBackgroundPress={Keyboard.dismiss} containerStyles={styles.container}>
      <GameHeader game={game} duration={duration} />
      {!showWordNotFound && !game.finished && <View style={{ height: 15 }} />}
      {showWordNotFound && <Text style={styles.warningText}>{wordNotFoundText}</Text>}
      {game.finished && <Text>{game.word}</Text>}
      <View style={styles.attemptsWrapper}>
        <LetterTable
          size={40}
          attemptsArray={attemptsArray}
          attemptWord={attemptWord}
          game={game}
          focusWordInput={focusWordInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <OpacityButton
          onPress={onCreateAttempt}
          title={'Guess Attempt'}
          disabled={attemptWord.length !== game.length}
        />
      </View>
      <TextInput
        ref={wordInputRef}
        value={attemptWord}
        onChangeText={(text) => setAttemptWord(text)}
        maxLength={game.length}
        style={styles.attemptInput}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  attemptsWrapper: {
    padding: '3%',
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: colors.white2 + 'cc',
    borderRadius: 10,
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
  attemptInput: {
    position: 'absolute',
    left: -2000,
    top: -2000,
    borderWidth: 20,
  },
});
