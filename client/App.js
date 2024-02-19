import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './assets/screens/HomeScreen';
import ProductScreen from './assets/screens/ProductScreen';
import AccountScreen from './assets/screens/AccountScreen';
import CartScreen from './assets/screens/CartScreen';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import DetailProduct from './assets/screens/DetailProduct';

const client = new ApolloClient({
  uri: "https://6136-123-253-233-172.ngrok-free.app",
  cache: new InMemoryCache()
})

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = <Feather name="home" size={26} color="black" />;
          } else if (route.name === 'Product') {
            iconComponent = <MaterialCommunityIcons name="shoe-sneaker" size={28} color="black" />;
          } else if (route.name === 'Account') {
            iconComponent = <MaterialCommunityIcons name="account-circle" size={26} color="black" />;
          } else if (route.name === 'Cart') {
            iconComponent = <AntDesign name="shoppingcart" size={26} color="black" />;
          }

          return iconComponent;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Product" component={ProductScreen} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: '' }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
      <Stack.Navigator>
  <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
  <Stack.Screen 
    name="DetailProduct" 
    component={DetailProduct} 
    options={{
      headerTitle: 'Detail Product', 
      headerStyle: { backgroundColor: 'black' },
      headerTintColor: 'white'
    }}
  />
</Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
