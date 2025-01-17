import { StyleSheet, Text, View } from 'react-native';

import * as colors from '../../assets/colors.json';
import { IAttempt } from '../common/types';

interface Props {
  attempts: IAttempt[];
  word: string;
}

export const LetterBar = ({ attempts, word }: Props) => {
  const lettersString = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
  const lettersStringMaleHard = 'гґжзйфхцчшщь';
  const lettersStringMaleLight = 'бвдклмнпрст';
  const lettersStringFemale = 'аеєиіїоуюя';

  const lettersColors: { [key: string]: string } = {};

  for (const letter of lettersString.split('')) {
    lettersColors[letter] = colors.white;
  }

  let checkedLetters = '';
  for (const attempt of attempts) {
    for (let i = 0; i < attempt.attemptWord.length; ++i) {
      const letter = attempt.attemptWord[i];
      if (!word.includes(letter)) {
        lettersColors[letter] = colors['grey-light'];
        checkedLetters += letter;
        continue;
      }
      if (word[i] === letter) {
        lettersColors[letter] = colors.green;
        checkedLetters += letter;
        continue;
      }
      if (!checkedLetters.includes(letter)) {
        lettersColors[letter] = colors.yellow;
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        {lettersStringFemale.split('').map((letter) => (
          <View key={letter} style={[styles.textWrapper, { backgroundColor: lettersColors[letter] }]}>
            <Text style={styles.text}>{letter.toUpperCase()}</Text>
          </View>
        ))}
      </View>
      <View style={styles.containerRow}>
        {lettersStringMaleLight.split('').map((letter) => (
          <View key={letter} style={[styles.textWrapper, { backgroundColor: lettersColors[letter] }]}>
            <Text style={styles.text}>{letter.toUpperCase()}</Text>
          </View>
        ))}
      </View>
      <View style={styles.containerRow}>
        {lettersStringMaleHard.split('').map((letter) => (
          <View key={letter} style={[styles.textWrapper, { backgroundColor: lettersColors[letter] }]}>
            <Text style={styles.text}>{letter.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    paddingTop: '2%',
    width: '90%',
    marginBottom: '5%',
    backgroundColor: colors.white2 + 'cc',
    borderRadius: 10,
  },
  containerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: '1%',
  },
  textWrapper: {
    alignItems: 'center',
    paddingVertical: 1,
    width: 25,
    backgroundColor: colors.white,
    borderColor: colors['grey-light'] + 'cc',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: '600',
  },
});
