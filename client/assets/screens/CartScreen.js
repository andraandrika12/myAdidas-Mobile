import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";

export default function CartScreen({ }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://media.karousell.com/media/photos/products/2023/8/23/sepatu_adidas_samba_og_authent_1692765930_c8208dce.jpg"  }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>Sepatu adidas samba OG</Text>
          <Text style={styles.description}>
            Sepatu baru dengan corak yang sangat elegan
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>Rp. 1.500.000</Text>
          <Text style={styles.quantity}>x1</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
    width: widthToDp("90%"),
  },
  image: {
    width: widthToDp(30),
    height: heightToDp(30),
    borderRadius: 10,
  },
  title: {
    fontSize: widthToDp(4),
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

});