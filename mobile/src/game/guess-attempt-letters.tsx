import { forwardRef, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { GuessAttemptItem } from './guess-attempt-item';
import { IAttempt } from '../../store/game.slice';

export type GuessAttemptLettersMethods = {
  blurAll: () => void;
};

interface Props {
  letterCount: number;
  attempt: IAttempt | number;
  activeAttempt: boolean;
}

export const GuessAttemptLetters = forwardRef<object, Props>(({ letterCount, attempt, activeAttempt }, ref) => {
  const letterArray = new Array(letterCount).fill(1).map((_, index) => index);
  const inputRefs = letterArray.map(() => useRef<TextInput>(null));

  const [activeItem, setActiveItem] = useState(0);
  const [attemptWord, setAttemptWord] = useState('');

  const methods: GuessAttemptLettersMethods = {
    blurAll: () => {
      for (const ref of inputRefs) {
        ref.current?.blur();
      }
    },
  };

  if (activeAttempt) {
    if (typeof ref === 'function') ref(methods);
    else if (ref) ref.current = methods;
  }

  const focusItem = (i: number) => {
    inputRefs[i].current?.focus();
  };

  return activeAttempt ? (
    <TouchableWithoutFeedback onPress={() => focusItem(activeItem)}>
      <TextInput
        value={attemptWord}
        onChangeText={(text) => setAttemptWord(text)}
        maxLength={letterCount}
        style={styles.attemptInput}
      />
      <View style={styles.container}>
        {letterArray.map((i) => (
          <GuessAttemptItem
            key={i.toString()}
            index={i}
            letterCount={letterCount}
            ref={inputRefs[i]}
            activeAttempt={activeAttempt}
            attempt={attempt}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            attemptWord={attemptWord}
            setAttemptWord={setAttemptWord}
            focusItem={focusItem}
          />
        ))}
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.container}>
      {letterArray.map((i) => (
        <GuessAttemptItem
          key={i.toString()}
          index={i}
          letterCount={letterCount}
          ref={inputRefs[i]}
          activeAttempt={activeAttempt}
          attempt={attempt}
          attemptWord={attemptWord}
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
  },
  attemptInput: {
    position: 'absolute',
    left: -5000,
    top: -5000,
    borderWidth: 20,
  },
});
