import { forwardRef, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { IAttempt } from '../../store/game.slice';

interface Props {
  attempt: IAttempt | number;
  activeAttempt: boolean;
  index: number;
}

export const GuessAttemptItem = forwardRef<TextInput, Props>(({ attempt, activeAttempt, index }, inputRef) => {
  const innerRef = useRef<TextInput | null>(null);

  const onItemPress = () => {
    innerRef.current?.focus();
  };

  return activeAttempt ? (
    <TouchableWithoutFeedback onPress={() => onItemPress()}>
      <View style={styles.item}>
        <TextInput
          style={styles.inputStyle}
          editable={activeAttempt}
          contextMenuHidden={activeAttempt}
          value={typeof attempt === 'object' ? attempt.attemptWord[index] : ''}
          autoCapitalize="characters"
          ref={(element: TextInput) => {
            if (activeAttempt) {
              innerRef.current = element;
              if (typeof inputRef === 'function') {
                inputRef(element);
              } else if (inputRef) {
                inputRef.current = element;
              }
            }
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.item}>
      <Text style={styles.inputStyle}>{typeof attempt === 'object' ? attempt.attemptWord[index] : ''}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: 24,
    fontWeight: '600',
  },
});
