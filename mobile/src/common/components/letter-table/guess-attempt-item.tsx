import { StyleSheet, Text, View } from 'react-native';

import * as colors from '../../../../assets/colors.json';

interface Props {
  size: number;
  activeAttempt: boolean;
  letter?: string;
  isActive?: boolean;
  backgroundColor?: string;
}

export const GuessAttemptItem = ({ size, activeAttempt, letter, isActive, backgroundColor }: Props) => {
  return activeAttempt ? (
    <View style={[styles.item, { borderWidth: isActive ? 5 : 1, width: size, height: size, borderRadius: size / 3 }]}>
      <Text style={[styles.letterStyle, { fontSize: size - 5 }]}>{letter?.toUpperCase()}</Text>
    </View>
  ) : (
    <View
      style={[
        styles.item,
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.white,
          width: size,
          height: size,
          borderRadius: size / 3,
        },
      ]}
    >
      <Text style={[styles.letterStyle, { fontSize: (size / 3) * 2 }]}>{letter?.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors['grey-light'],
  },
  letterStyle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.blue,
  },
});
