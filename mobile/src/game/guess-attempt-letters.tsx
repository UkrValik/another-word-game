import { forwardRef, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { GuessAttemptItem } from "./guess-attempt-item";
import { Attempt } from "../common/types";

export type GuessAttemptLettersMethods = {
  blurAll: () => void;
};

interface Props {
  letterCount: number;
  attempt: Attempt | number;
  activeAttempt: boolean;
}

export const GuessAttemptLetters = forwardRef<object, Props>(
  ({ letterCount, attempt, activeAttempt }, ref) => {
    const letterArray = new Array(letterCount).fill(1).map((_, index) => index);
    const inputRefs = letterArray.map(() => useRef<TextInput>(null));

    const methods: GuessAttemptLettersMethods = {
      blurAll: () => {
        for (const ref of inputRefs) {
          ref.current?.blur();
        }
      },
    };

    if (activeAttempt) {
      if (typeof ref === "function") ref(methods);
      else if (ref) ref.current = methods;
    }

    return (
      <View style={styles.container}>
        {letterArray.map((i) => (
          <GuessAttemptItem
            key={i.toString()}
            index={i}
            ref={inputRefs[i]}
            activeAttempt={activeAttempt}
            attempt={attempt}
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
