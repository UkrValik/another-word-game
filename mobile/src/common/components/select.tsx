import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import * as colors from '../../../assets/colors.json';

interface Props {
  setOption: (option: string | number) => void;
  chosenOption: string | number;
  options: string[] | number[];
  selectOptionStyles?: ViewStyle;
}

export const Select = (props: Props) => {
  const { options, chosenOption, selectOptionStyles, setOption } = props;

  return (
    <View style={styles.selectWrapper}>
      {options.map((currOption) => (
        <TouchableWithoutFeedback
          key={currOption.toString()}
          onPress={() => setOption(currOption)}
        >
          <View
            style={[
              chosenOption === currOption
                ? styles.chosenSelectOption
                : styles.selectOption,
              selectOptionStyles,
            ]}
          >
            <Text
              style={
                chosenOption === currOption
                  ? styles.chosenSelectText
                  : styles.selectText
              }
            >
              {currOption}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '2%',
  },
  selectOption: {
    borderRadius: 10,
    borderColor: colors.black,
    borderWidth: 1,
    width: '30%',
    paddingVertical: '1%',
    alignItems: 'center',
  },
  chosenSelectOption: {
    borderRadius: 10,
    backgroundColor: colors.black,
    width: '30%',
    paddingVertical: '1%',
    alignItems: 'center',
  },
  selectText: {
    fontWeight: '400',
    fontSize: 20,
    color: colors.black,
  },
  chosenSelectText: {
    fontWeight: '400',
    fontSize: 20,
    color: colors.white,
  },
});
