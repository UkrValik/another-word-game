import { ReactNode } from 'react';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  safe?: boolean;
  containerStyles?: ViewStyle;
  onBackgroundPress?: () => void;
}

export const ScreenWrapper = ({ children, safe = false, containerStyles, onBackgroundPress }: Props) => {
  return safe ? (
    <ImageBackground style={{ flex: 1 }} source={require('../../../assets/background_image.png')} resizeMode={'repeat'}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={onBackgroundPress}>
          <View style={containerStyles || styles.container}>{children}</View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <TouchableWithoutFeedback onPress={onBackgroundPress}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/background_image.png')}
        resizeMode={'repeat'}
      >
        <View style={containerStyles || styles.container}>{children}</View>
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
