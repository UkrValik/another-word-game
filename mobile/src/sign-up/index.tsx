import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as colors from '../../assets/colors.json';
import { AppDispatch } from '../../store';
import { userSignUp } from '../../store/user.slice';
import { OpacityButton } from '../common/components/opacity-button';
import { ScreenWrapper } from '../common/components/screen-wrapper';
import { SignInStackParamList } from '../navigation/sign-in-stack';

type Props = NativeStackScreenProps<SignInStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPass, setRepPass] = useState('');

  const emailRef = createRef<TextInput>();
  const passRef = createRef<TextInput>();
  const repPassRef = createRef<TextInput>();

  const onBackgroundPress = () => {
    Keyboard.dismiss();
  };

  const goToSignIn = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const goToHome = () => {
    if (password === repPass) {
      dispatch(userSignUp({ email, password }));
    }
  };

  return (
    <ScreenWrapper onBackgroundPress={onBackgroundPress} containerStyles={styles.container}>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputComponent}
            placeholder={'Repeat password'}
            value={repPass}
            onChangeText={(text) => setRepPass(text)}
            ref={repPassRef}
          />
        </View>
        <OpacityButton
          title={'Register'}
          onPress={goToHome}
          titleStyles={styles.signUpButtonTitle}
          titleWrapperStyles={styles.signUpButtonContainer}
        />
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>
        <OpacityButton
          title={'Already have an account'}
          onPress={goToSignIn}
          titleStyles={styles.signInButtonTitle}
          titleWrapperStyles={styles.signInButtonContainer}
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
    marginBottom: '50%',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors['grey-light'] + 'aa',
    marginVertical: '1%',
    backgroundColor: colors.white,
  },
  signUpButtonContainer: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    paddingVertical: '5%',
    marginVertical: '3%',
    marginTop: '7%',
  },
  signInButtonContainer: {
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
  signUpButtonTitle: {
    color: colors.white3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInButtonTitle: {
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
});

export { SignUp };
