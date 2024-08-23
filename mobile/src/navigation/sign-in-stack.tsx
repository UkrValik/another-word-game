import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { SignIn } from "../sign-in";
import { SignUp } from "../sign-up";

export type SignInStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<SignInStackParamList>();

export const SignInStack = () => {
  return (
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
    </Stack.Navigator>
  );
};
