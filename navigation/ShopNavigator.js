import React from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen, {
  screenOptions as productsOverviewOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailsOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as userProductsOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authOptions,
} from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";

// defaultNavOptions can continue the same as RNv4.
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

// Creating a stack no longer requires an object with the configurations.
const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailsOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

// The configurations specific to each navigator now goes into the "parent" navigator intead of the childs link in RNv4.
export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 25 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Log Out"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logOut());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
