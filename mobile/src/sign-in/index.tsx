import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SignInStackParamList } from "../navigation/sign-in-stack";

type Props = NativeStackScreenProps<SignInStackParamList, "SignIn">;

const SignIn = ({ navigation }: Props) => {
  const [inputActive, setInputActive] = useState(false);

  const emailRef = createRef<TextInput>();
  const passRef = createRef<TextInput>();

  const onBackgroundPress = () => {
    emailRef?.current?.blur();
    passRef?.current?.blur();
    setInputActive(false);
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
    setInputActive(false);
  };

  const goToHome = () => {
    navigation.navigate("HomeStack");
    setInputActive(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onBackgroundPress}>
      <View style={styles.container}>
        <View style={styles.gameTitleContainer}>
          <Text style={styles.gameTitle}>ONE MORE WORD GAME</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.signInTitleContainer}>
            <Text style={styles.signInTitle}>Sign In</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputComponent}
              placeholder="email"
              onFocus={() => setInputActive(true)}
              ref={emailRef}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputComponent}
              placeholder="password"
              onFocus={() => setInputActive(true)}
              ref={passRef}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.signInButtonContainer}
              onPress={goToHome}
            >
              <Text style={styles.signInButtonTitle}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.signUpButtonContainer}
              onPress={goToSignUp}
            >
              <Text style={styles.signUpButtonTitle}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.voidContainer,
            { marginBottom: inputActive ? "30%" : "5%" },
          ]}
        >
          <TouchableOpacity
            style={[styles.signUpButtonContainer, { borderWidth: 0 }]}
            onPress={goToHome}
          >
            <Text style={styles.signUpButtonTitle}>Play as guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  contentContainer: {
    flex: 3,
    justifyContent: "center",
    width: "90%",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    marginVertical: "2%",
  },
  signInButtonContainer: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
    marginHorizontal: "25%",
    marginVertical: "5%",
  },
  signUpButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
    marginHorizontal: "25%",
    marginBottom: "5%",
    borderWidth: 1,
    borderRadius: 10,
  },
  gameTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  signInTitleContainer: {
    alignItems: "center",
    marginVertical: "10%",
  },
  voidContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: "5%",
    width: "90%",
  },
  gameTitle: {
    fontWeight: "700",
    fontSize: 24,
  },
  signInTitle: {
    fontWeight: "400",
    fontSize: 20,
  },
  signInButtonTitle: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 18,
    fontWeight: "400",
  },
  signUpButtonTitle: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 18,
    fontWeight: "400",
  },
  inputComponent: {
    fontSize: 18,
  },
  inputActive: {
    marginBottom: "30%",
  },
});

export { SignIn };