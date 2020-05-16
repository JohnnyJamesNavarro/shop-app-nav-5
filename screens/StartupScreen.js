import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const parsedData = JSON.parse(userData);
      const { token, userId, expirationDate } = parsedData;
      const expDate = new Date(expirationDate);

      // This condition is true when the token is no longer valid of if it doesn't exist.
      if (expDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const timeLeftForExpiration = expDate.getTime() - new Date().getTime();

      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token, timeLeftForExpiration));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
