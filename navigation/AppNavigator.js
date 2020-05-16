import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import StartupScreen from "../screens/StartupScreen";

export default function AppNavigator() {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
}

// The NavigationContainer component is equivalent to the createAppContainer function used in RNv4.

/*
  There is no need for a Switch navigator here. In fact, it doesn't exist in React Navigation v5.

  Since in v5 navigation is handled through React components, now we can dinamically decide 
  which navigators and/or screens are rendered, thus making the Switch navigator useless.

  In this scenario it works like this:

  - If the user is authenticated (isAuth = true), we show the ShopNavigator (the drawer with all the app screens).
  - If the user is not authenticated but the app tried to do an auto login (isAuth = false, didTryAutoLogin = true), we send the user to the Auth screen through the AuthNavigator.
  - If the user is not authenticated and the app have not tried to auto login (isAuth = false, didTryAutoLogin = false), we show the StartupScreen.
*/
