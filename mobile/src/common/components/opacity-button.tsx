import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import * as colors from '../../../assets/colors.json';

interface Props {
  title: string;
  disabled?: boolean;
  outline?: boolean;
  titleStyles?: TextStyle;
  titleWrapperStyles?: ViewStyle;
  onPress?: () => void;
}

export const OpacityButton = (props: Props) => {
  const { title, disabled, outline, titleStyles, titleWrapperStyles, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[outline ? styles.outlineWrapper : styles.titleWrapper, titleWrapperStyles]}>
        <Text style={[outline ? styles.outlineTitle : styles.title, titleStyles]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: colors.blue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '600',
  },
  outlineWrapper: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  outlineTitle: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '600',
  },
});
