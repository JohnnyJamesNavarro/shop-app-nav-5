import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ProductsNavigator } from "./ShopNavigator";

export default function AppNavigator() {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
}

// The NavigationContainer component is equivalent to the createAppContainer function used in RNv4.
