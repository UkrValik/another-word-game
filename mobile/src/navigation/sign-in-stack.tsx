import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { HomeStack } from "./home-stack";
import { SignIn } from "../sign-in";
import { SignUp } from "../sign-up";

export type SignInStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  HomeStack: undefined;
};

const Stack = createNativeStackNavigator<SignInStackParamList>();

export const SignInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
