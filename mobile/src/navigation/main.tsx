import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";

import { HomeStack } from "./home-stack";
import { SignInStack } from "./sign-in-stack";
import { selectToken } from "../../store/user.slice";

const Stack = createNativeStackNavigator();

export const Main = () => {
  const token = useSelector(selectToken);
  console.log(token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="SignInStack" component={SignInStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
