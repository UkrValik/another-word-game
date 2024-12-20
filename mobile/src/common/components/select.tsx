import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import * as colors from '../../../assets/colors.json';

interface Props {
  setOption: (option: string | number) => void;
  chosenOption: string | number;
  options: string[] | number[];
  values: string[] | number[];
  selectOptionStyles?: ViewStyle;
}

export const Select = (props: Props) => {
  const { options, values, chosenOption, selectOptionStyles, setOption } = props;

  return (
    <View style={styles.selectWrapper}>
      {options.map((currOption, index) => (
        <TouchableWithoutFeedback key={index.toString()} onPress={() => setOption(currOption)}>
          <View
            style={[
              chosenOption === currOption ? styles.chosenSelectOption : styles.selectOption,
              selectOptionStyles,
              { borderLeftWidth: index > 0 ? 1 : 0, borderColor: colors.blue },
            ]}
          >
            <Text style={chosenOption === currOption ? styles.chosenSelectText : styles.selectText}>
              {values[index]}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '2%',
    marginHorizontal: '5%',
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectOption: {
    flex: 1,
    paddingVertical: '1%',
    alignItems: 'center',
  },
  chosenSelectOption: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: '1%',
    alignItems: 'center',
  },
  selectText: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.blue,
  },
  chosenSelectText: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
});
