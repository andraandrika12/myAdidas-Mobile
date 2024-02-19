import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SearchBar } from "react-native-elements";
import Card from "../component/card";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT = gql`
 query GetAllProducts {
  getAllProducts {
    id
    name
    slug
    description
    price
    mainImg
    categoryId
    userMongoId
    images {
      newImage1
      newImage2
      newImage3
    }
  }
}
`;

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(getAllProducts || []);

  const { data, loading, error } = useQuery(GET_PRODUCT);
  // console.log(data)
 
  useEffect(() => {
    if (data && data.getAllProducts) {
      setFilteredDataSource(data.getAllProducts);
    }
  }, [data]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Whops, it's Error!</Text>
      </View>
    );
  }

  const getAllProducts = data?.getAllProducts;
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Card getAllProducts={item} />
    </View>
  );


  const searchFilterFunction = (text, categoryId) => {
    setSearch(text);
    const newData = (getAllProducts || []).filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text ? text.toUpperCase() : "";
      const categoryMatch = !categoryId || item.categoryId === categoryId; 
      return itemData.indexOf(textData) > -1 && categoryMatch;
    });
    setFilteredDataSource(newData);
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {"."}
        {item.name.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    alert("Id : " + item.id + " Name : " + item.name);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      <SearchBar
  round
  searchIcon={{ size: 24 }}
  onChangeText={(text) => searchFilterFunction(text)}
  onClear={() => searchFilterFunction("")}
  placeholder="Type Here..."
  value={search}
  inputStyle={styles.inputStyleSearch}
  containerStyle={styles.inputContainerSearch}
  inputContainerStyle={styles.inputStyleSearch}
/>



        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => searchFilterFunction(search, '')}
          >
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => searchFilterFunction(search, 1)}
          >
            <Text style={styles.categoryText}>Men</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => searchFilterFunction(search, 2)}
          >
            <Text style={styles.categoryText}>Women</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => searchFilterFunction(search, 3)}
          >
            <Text style={styles.categoryText}>Kids</Text>
          </TouchableOpacity>
        </View>

        <FlatList
  style={styles.containerStyle}
  data={filteredDataSource}
  numColumns={2}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  ItemSeparatorComponent={ItemSeparatorView}
/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C8C8C8",
  },
  categoryText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  inputStyleSearch: {
    backgroundColor: "white",
    alignSelf: "center",
  },
  inputContainerSearch: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: -10,
    paddingBottom: -10,
    width: 390,
    alignSelf: "center",
  },
  containerStyle: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth:0,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    borderColor:'#808080',
    elevation: 10,
    height: 560
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});
