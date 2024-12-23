import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { GuessAttemptItem } from './guess-attempt-item';
import * as colors from '../../../../assets/colors.json';
import { IAttempt } from '../../types';

export type GuessAttemptLettersMethods = {
  blur: () => void;
};

interface Props {
  size: number;
  letterCount: number;
  attempt: IAttempt | number;
  activeAttempt: boolean;
  attemptWord?: string;
  keyword: string;
  focusWordInput?: () => void;
}

export const GuessAttemptLetters = ({
  size,
  letterCount,
  attempt,
  activeAttempt,
  attemptWord,
  keyword,
  focusWordInput,
}: Props) => {
  const letterArray = new Array(letterCount).fill(1).map((_, index) => index);

  const calculateLetterBackground = (attempt: IAttempt | number, i: number) => {
    if (typeof attempt === 'object') {
      if (attempt.attemptWord[i] === keyword[i]) {
        return colors.green;
      } else if (keyword.includes(attempt.attemptWord[i])) {
        return colors.yellow;
      } else {
        return colors.white;
      }
    }
  };

  return activeAttempt ? (
    <TouchableWithoutFeedback onPress={focusWordInput}>
      <View>
        <View style={[styles.container, { paddingVertical: size / 2 - letterCount }]}>
          {letterArray.map((i) => (
            <GuessAttemptItem
              key={i.toString()}
              size={size - letterCount}
              letter={(attemptWord && attemptWord[i]) || ''}
              activeAttempt={activeAttempt}
              isActive={
                attemptWord?.length === i ||
                (letterArray.length === attemptWord?.length && attemptWord?.length - 1 === i)
              }
            />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={[styles.container, { paddingVertical: size / 2 - letterCount }]}>
      {letterArray.map((i) => (
        <GuessAttemptItem
          key={i.toString()}
          size={size - letterCount}
          letter={typeof attempt === 'object' ? attempt.attemptWord[i] : ''}
          activeAttempt={activeAttempt}
          backgroundColor={calculateLetterBackground(attempt, i)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
