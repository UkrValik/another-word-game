import { forwardRef, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { GuessAttemptItem } from './guess-attempt-item';
import { IAttempt } from '../common/types';

export type GuessAttemptLettersMethods = {
  blur: () => void;
};

interface Props {
  letterCount: number;
  attempt: IAttempt | number;
  activeAttempt: boolean;
}

export const GuessAttemptLetters = forwardRef<object, Props>(({ letterCount, attempt, activeAttempt }, ref) => {
  const letterArray = new Array(letterCount).fill(1).map((_, index) => index);
  const wordInputRef = useRef<TextInput>(null);

  const [attemptWord, setAttemptWord] = useState('');

  const methods: GuessAttemptLettersMethods = {
    blur: () => wordInputRef.current?.blur(),
  };

  if (activeAttempt) {
    if (typeof ref === 'function') ref(methods);
    else if (ref) ref.current = methods;
  }

  return activeAttempt ? (
    <TouchableWithoutFeedback onPress={() => wordInputRef.current?.focus()}>
      <View>
        <TextInput
          ref={wordInputRef}
          value={attemptWord}
          onChangeText={(text) => setAttemptWord(text)}
          maxLength={letterCount}
          style={styles.attemptInput}
        />
        <View style={styles.container}>
          {letterArray.map((i) => (
            <GuessAttemptItem
              key={i.toString()}
              letter={attemptWord[i] || ''}
              activeAttempt={activeAttempt}
              isActive={attemptWord.length === i}
            />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.container}>
      {letterArray.map((i) => (
        <GuessAttemptItem
          key={i.toString()}
          letter={typeof attempt === 'object' ? attempt.attemptWord[i] : ''}
          activeAttempt={activeAttempt}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  attemptInput: {
    position: 'absolute',
    left: -2000,
    top: -2000,
    borderWidth: 20,
  },
});
