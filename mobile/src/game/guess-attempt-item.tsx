import { StyleSheet, Text, View } from 'react-native';

interface Props {
  activeAttempt: boolean;
  letter: string;
  isActive?: boolean;
}

export const GuessAttemptItem = ({ activeAttempt, letter, isActive }: Props) => {
  return activeAttempt ? (
    <View style={[styles.item, { borderWidth: isActive ? 5 : 1 }]}>
      <Text style={styles.inputStyle}>{letter.toUpperCase()}</Text>
    </View>
  ) : (
    <View style={styles.item}>
      <Text style={styles.inputStyle}>{letter}</Text>
    </View>
  );
};

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
