import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import CartItem from "./CartItem";
import Card from "../UI/Card";

import Colors from "../../constants/Colors";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { total, date, items } = props;

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((previousState) => !previousState);
        }}
      />

      {showDetails && (
        <View style={styles.itemDetails}>
          {items.map((i) => (
            <CartItem
              key={i.productId}
              quantity={i.quantity}
              amount={i.sum}
              title={i.productTitle}
              deletable={false}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  total: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: { fontFamily: "open-sans", fontSize: 16, color: "#888" },
  itemDetails: {
    width: "100%",
    marginTop: 15,
  },
});

export default OrderItem;
