import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, View, Text, StyleSheet, Image } from "react-native";

const GET_PRODUCT_BY_ID = gql`
query GetOneProduct($getOneProductId: ID!) {
  getOneProduct(id: $getOneProductId) {
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
    category {
      id
      name
    }
  }
}
`


export default function DetailProduct (dataById){
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price);
      };

    // console.log(dataById)
    const id = dataById.route.params.id

    const {loading, error, data} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            getOneProductId: id
        }
        
    }) 
    console.log(data)

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

    const getOneProduct = data.getOneProduct

    return (
        <View style={styles.container}>
        <Image source={{ uri: getOneProduct.mainImg }} style={styles.image} />
        <Text style={styles.name}>{getOneProduct.name}</Text>
        <Text style={styles.price}>{formatPrice(getOneProduct.price)}</Text>
        <Text style={styles.category}>Category: {getOneProduct.category.name}</Text>
        <Text style={styles.description}>{getOneProduct.description}</Text>
      </View>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#ffffff',
    },
    image: {
      width: 380,
      height: 300,
      resizeMode: 'contain',
      borderRadius: 10,
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    price: {
      fontSize: 20,
      color: '#4caf50',
      marginBottom: 8,
    },
    category: {
      fontSize: 16,
      color: '#2196f3',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
    },
  });