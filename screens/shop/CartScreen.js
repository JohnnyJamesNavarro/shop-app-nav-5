import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

import Colors from "../../constants/Colors";

import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

function CartScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.totalAmount);

  const cartItems = useSelector((state) => {
    const items = state.cart.items;
    const itemsArray = [];

    for (const key in items) {
      itemsArray.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }

    return itemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  useEffect(() => {}, []);

  const placeOrder = useCallback(async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotal));
    setIsLoading(false);
  }, [dispatch, cartItems, cartTotal]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotal.toFixed(2) * 100) / 100}
          </Text>
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={placeOrder}
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            amount={itemData.item.sum}
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
            deletable={true}
          />
        )}
      />
    </View>
  );
}

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
