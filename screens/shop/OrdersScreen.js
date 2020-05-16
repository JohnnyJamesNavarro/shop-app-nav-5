import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButtom from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";

import * as OrderActions from "../../store/actions/order";
import Colors from "../../constants/Colors";

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(OrderActions.fetchOrders());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You haven't ordered anything yet.</Text>
      </View>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          total={itemData.item.total}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
