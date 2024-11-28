import { ReactNode } from 'react';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

interface Props {
  children: ReactNode;
  containerStyles?: ViewStyle;
  onBackgroundPress?: () => void;
}

export const ScreenWrapper = ({ children, containerStyles, onBackgroundPress }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onBackgroundPress}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/background_image.png')}
        resizeMode={'repeat'}
      >
        <View style={styles.container || containerStyles}>{children}</View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
});
