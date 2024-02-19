import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Card({getAllProducts}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const navigation = useNavigation()

  return (
<TouchableOpacity
onPress={() => {
  console.log(getAllProducts.id)
  navigation.push('DetailProduct', {
      id: getAllProducts.id
    })
}}
style={{
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  width: "48%",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  width:170,
  paddingBottom: -7
}}
>
  <View>
    <View>
      <Image source={{ uri: getAllProducts.mainImg}} style={{ width: 150, height: 150 }} />
    </View>
    <View style={{ marginTop: 10,  width: 150, height: 150  }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{getAllProducts.name}</Text>
      <Text style={{ fontSize: 16 }}>{formatPrice(getAllProducts.price)}</Text>
      <Text style={{ fontSize: 16, marginTop:20 }}>3 warna</Text>
    </View>
  </View>
</TouchableOpacity>);

}


