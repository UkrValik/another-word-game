import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as colors from '../../assets/colors.json';
import { AppDispatch } from '../../store';
import { userSignIn } from '../../store/user.slice';
import { OpacityButton } from '../common/components/opacity-button';
import { ScreenWrapper } from '../common/components/screen-wrapper';
import { SignInStackParamList } from '../navigation/sign-in-stack';

type Props = NativeStackScreenProps<SignInStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = createRef<TextInput>();
  const passRef = createRef<TextInput>();

  const onBackgroundPress = () => {
    Keyboard.dismiss();
  };

  const goToSignUp = () => {
    Keyboard.dismiss();
    navigation.navigate('SignUp');
  };

  const goToHome = () => {
    dispatch(userSignIn({ email, password }));
  };

  return (
    <ScreenWrapper containerStyles={styles.container} onBackgroundPress={onBackgroundPress}>
      <View style={styles.gameTitleContainer}>
        <Text style={styles.gameTitle}>ONE MORE WORD GAME</Text>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={40}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputComponent}
            placeholder={'Email'}
            value={email}
            onChangeText={(text) => setEmail(text)}
            ref={emailRef}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputComponent}
            placeholder={'Password'}
            value={password}
            onChangeText={(text) => setPassword(text)}
            ref={passRef}
          />
        </View>
        <View style={styles.forgotPassContainer}>
          <Text style={styles.forgotPassText}>Forgot password?</Text>
        </View>
        <OpacityButton
          title={'Log in'}
          onPress={goToHome}
          titleStyles={styles.signInButtonTitle}
          titleWrapperStyles={styles.signInButtonContainer}
        />
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>
        <OpacityButton
          title={'Create an account'}
          onPress={goToSignUp}
          titleStyles={styles.signUpButtonTitle}
          titleWrapperStyles={styles.signUpButtonContainer}
        />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  contentContainer: {
    flex: 3,
    justifyContent: 'center',
    width: '90%',
    marginBottom: '40%',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors['grey-light'] + 'aa',
    marginVertical: '1%',
    backgroundColor: colors.white,
  },
  signInButtonContainer: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    paddingVertical: '5%',
    marginVertical: '3%',
  },
  signUpButtonContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: '5%',
    marginVertical: '3%',
    borderWidth: 1,
    borderColor: colors['grey-light'] + 'aa',
  },
  gameTitleContainer: {
    flex: 1,
    marginTop: '30%',
    justifyContent: 'center',
  },
  gameTitle: {
    fontWeight: '700',
    fontSize: 24,
  },
  signInButtonTitle: {
    color: colors.white3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButtonTitle: {
    color: colors['blue-dark'],
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputComponent: {
    paddingVertical: '4.5%',
    paddingHorizontal: '5%',
    fontSize: 18,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '5%',
  },
  orLine: {
    backgroundColor: colors.grey,
    height: 1,
    width: '45%',
  },
  orText: {
    color: colors.grey,
    fontSize: 16,
  },
  forgotPassContainer: {
    alignItems: 'flex-end',
    marginTop: '1%',
  },
  forgotPassText: {
    textDecorationLine: 'underline',
    color: colors.grey,
    fontSize: 16,
  },
});

export { SignIn };
