import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";

export default function NavigationContainer() {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    // If we are not authenticated (for example: when you log out) the app navigates back to the auth screen.
    if (!isAuth) {
      // We have to use a ref because we are outside of the ShopNavigator, but need to access code within it.
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
}
