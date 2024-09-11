import { forwardRef, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { IAttempt } from '../../store/game.slice';

interface Props {
  attempt: IAttempt | number;
  activeAttempt: boolean;
  index: number;
  letterCount: number;
  activeItem?: number;
  attemptWord: string;
  setActiveItem?: (i: number) => void;
  setAttemptWord?: (word: string) => void;
  focusItem?: (i: number) => void;
}

export const GuessAttemptItem = forwardRef<TextInput, Props>(
  (
    { attempt, activeAttempt, index, letterCount, activeItem, attemptWord, setActiveItem, setAttemptWord, focusItem },
    inputRef,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    // const onItemPress = () => {
    //   innerRef.current?.focus();
    // };

    const onChangeText = (text: string) => {
      if (setActiveItem && setAttemptWord && focusItem && activeItem) {
        if (text === '') {
          setAttemptWord(attemptWord.substring(0, attemptWord.length - 1));
          if (index > 0) {
            setActiveItem(activeItem - 1);
            focusItem(activeItem - 1);
            innerRef.current?.blur();
          }
        } else {
          if (index < letterCount - 1) {
            setActiveItem(activeItem + 1);
            focusItem(activeItem + 1);
          }
          setAttemptWord(attemptWord + text);
          innerRef.current?.blur();
        }
      }
    };

    const focusRightItem = () => {
      if (focusItem && activeItem) {
        focusItem(activeItem);
      }
    };

    return activeAttempt ? (
      <TouchableWithoutFeedback onPress={focusRightItem}>
        <View style={styles.item}>
          <TextInput
            style={styles.inputStyle}
            editable={activeAttempt}
            contextMenuHidden={activeAttempt}
            value={attemptWord[index] || ''}
            onChangeText={(text) => onChangeText(text)}
            autoCapitalize={'characters'}
            maxLength={1}
            onPress={focusRightItem}
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
  },
);

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
