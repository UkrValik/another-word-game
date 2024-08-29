import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import * as colors from '../../../assets/colors.json';

interface Props {
  onPress?: () => void;
  titleStyles?: TextStyle;
  titleWrapperStyles?: ViewStyle;
  outline?: boolean;
  title: string;
}

export const OpacityButton = (props: Props) => {
  const { onPress, titleStyles, titleWrapperStyles, title, outline } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          outline ? styles.outlineWrapper : styles.titleWrapper,
          titleWrapperStyles,
        ]}
      >
        <Text
          style={[outline ? styles.outlineTitle : styles.title, titleStyles]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: colors.black,
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
