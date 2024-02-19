const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({
    port: 14513,
    host: "redis-14513.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", 
    password: process.env.PASSWORD,
  });


const PRODUCT_SERVICE_URLBASE = "http://app-service:4002" || process.env.PRODUCT_URL;

const typeDefs = gql`
  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    userMongoId: String
    images: [ProductImage]
  }

  type ProductWithCategory {
  id: ID
  name: String
  slug: String
  description: String
  price: Int
  mainImg: String
  categoryId: Int
  userMongoId: String
  images: [ProductImage]
  category: Category  
}

  type ProductImage {
    newImage1: String
    newImage2: String
    newImage3: String
  }

  type Category {
    id: ID
    name: String
  }

  type Image {
    id: ID
    productId: String
    imgUrl: String
  }

  type Message {
    msg: String
  }

  type Query {
    getAllProducts: [Product]
    getOneProduct(id: ID!): ProductWithCategory
    getAllCategories: [Category]
    getOneCategory(id: ID!): Category
    getAllImages: [Image]
    getOneImage(id: ID!): Image
  }

  type Mutation {
    addProduct(
      name: String
      slug: String
      description: String
      price: Int
      mainImg: String
      categoryId: Int
      userMongoId: String
      images: ProductImageInput
    ): Message
    patchProduct(
      id: ID!
      name: String
      slug: String
      description: String
      price: Int
      mainImg: String
      categoryId: Int
      userMongoId: String
      images: ProductImageInput
    ): Message
    deleteProduct(id: ID!): Message
    addCategory(name: String): Message
    patchCategory(id: ID!, name: String): Message
    deleteCategory(id: ID!): Message
    addImage(productId: String, imgUrl: String): Message
    patchImage(id: ID!, imgUrl: String): Message
  }

  input ProductImageInput {
    newImage1: String
    newImage2: String
    newImage3: String
  }
`;

const resolvers = {
    Query: {
        getAllProducts: async () => {
            const cachedProducts = await redis.get("products");

            if (!cachedProducts) {
                const products = await axios.get(PRODUCT_SERVICE_URLBASE + "/products");
                await redis.set("products", JSON.stringify(products.data));
                return products.data;
            } else {
                return JSON.parse(cachedProducts);
            }
        },

        getOneProduct: async (_, { id }) => {
            const cachedProduct = await redis.get(`product:${id}`);
          
            if (!cachedProduct) {
              const productResponse = await axios.get(PRODUCT_SERVICE_URLBASE + `/products/${id}`);
              const product = productResponse.data;
          
              if (product.error) {
                throw new Error(product.error);
              }
          
              const categoryResponse = await axios.get(PRODUCT_SERVICE_URLBASE + `/category/${product.categoryId}`);
              const category = categoryResponse.data;
          
              if (category.error) {
                throw new Error(category.error);
              }
          
              product.category = category; 
          
              await redis.set(`product:${id}`, JSON.stringify(product));
              return product;
            } else {
              return JSON.parse(cachedProduct);
            }
          },
        getAllCategories: async () => {
            const cachedCategories = await redis.get("categories");

            if (!cachedCategories) {
                const categories = await axios.get(
                    PRODUCT_SERVICE_URLBASE + "/category"
                );
                await redis.set("categories", JSON.stringify(categories.data));
                return categories.data;
            } else {
                return JSON.parse(cachedCategories);
            }
        },

        getOneCategory: async (_, { id }) => {
            const cachedCategory = await redis.get(`category:${id}`);

            if (!cachedCategory) {
                const category = await axios.get(
                    PRODUCT_SERVICE_URLBASE + `/category/${id}`
                );
                if (category.error) {
                    throw new Error(category.error);
                }
                await redis.set(`category:${id}`, JSON.stringify(category.data));
                return category.data;
            } else {
                return JSON.parse(cachedCategory);
            }
        },

        getAllImages: async () => {
            const cachedImages = await redis.get("images");

            if (!cachedImages) {
                const images = await axios.get(PRODUCT_SERVICE_URLBASE + "/images");
                await redis.set("images", JSON.stringify(images.data));
                return images.data;
            } else {
                return JSON.parse(cachedImages);
            }
        },

        getOneImage: async (_, { id }) => {
            const cachedImage = await redis.get(`image:${id}`);

            if (!cachedImage) {
                const image = await axios.get(
                    PRODUCT_SERVICE_URLBASE + `/images/${id}`
                );
                if (image.error) {
                    throw new Error(image.error);
                }
                await redis.set(`image:${id}`, JSON.stringify(image.data));
                return image.data;
            } else {
                return JSON.parse(cachedImage);
            }
        },
    },

    Mutation: {
        addProduct: async (_, { name, slug, description, price, mainImg, categoryId, userMongoId, images }) => {
            try {
              await axios.post(PRODUCT_SERVICE_URLBASE + '/products', { 
                name, slug, description, price, mainImg, categoryId, userMongoId, 
                newImage1: images.newImage1, 
                newImage2: images.newImage2, 
                newImage3: images.newImage3 
              });
      
             await redis.del("products");
              
              return {msg: "add product success"}
            } catch (error) {
              throw new Error(error.message);
            }
          },
      
          patchProduct: async (_, { id, name, slug, description, price, mainImg, categoryId, userMongoId, images }) => {
            try {
              await axios.patch(PRODUCT_SERVICE_URLBASE + `/products/${id}`, { 
                name, slug, description, price, mainImg, categoryId, userMongoId, 
                newImage1: images.newImage1, 
                newImage2: images.newImage2, 
                newImage3: images.newImage3 
              });
      
         
                await redis.del(`product:${id}`);
                await redis.del("products");
              
      
              return {msg: "edit product success"}
            } catch (error) {
              throw new Error(error.message);
            }
          },

        deleteProduct: async (_, { id }) => {
            try {
                await axios.delete(
                    PRODUCT_SERVICE_URLBASE + `/products/${id}`
                );

             
                    await redis.del(`product:${id}`);
                    await redis.del("products");
                

                return {msg: "delete product success"}
            } catch (error) {
                throw new Error(error.message);
            }
        },

        addCategory: async (_, { name }) => {
            try {
                await axios.post(
                    PRODUCT_SERVICE_URLBASE + "/category",
                    { name }
                );

             
                    await redis.del("categories");
                

                return {msg: "add category success"}
            } catch (error) {
                throw new Error(error.message);
            }
        },

        patchCategory: async (_, { id, name }) => {
            try {
                await axios.patch(
                    PRODUCT_SERVICE_URLBASE + `/category/${id}`,
                    { name }
                );

             
                    await redis.del(`category:${id}`);
                    await redis.del("categories");
              

                return {msg: "edit category success"}
            } catch (error) {
                throw new Error(error.message);
            }
        },

        deleteCategory: async (_, { id }) => {
            try {
                await axios.delete(
                    PRODUCT_SERVICE_URLBASE + `/category/${id}`
                );

                if (response.status === 200) {
                    await redis.del(`category:${id}`);
                    await redis.del("categories");
                }

                return {msg: "delete category success"}
            } catch (error) {
                throw new Error(error.message);
            }
        },

        addImage: async (_, { productId, imgUrl }) => {
            try {
                await axios.post(PRODUCT_SERVICE_URLBASE + "/images", {
                    productId,
                    imgUrl,
                });

              
                    await redis.del("images");
                

                return {msg: "add image success"}
            } catch (error) {
                throw new Error(error.message);
            }
        },

        patchImage: async (_, { id, imgUrl }) => {
            try {
                await axios.patch(
                    PRODUCT_SERVICE_URLBASE + `/images/${id}`,
                    { imgUrl }
                );

           
                    await redis.del(`image:${id}`);
                    await redis.del("images");
                

                return {msg: "edit image success"}
            } catch (error) {
                throw new Error(error.message);
            }
        },


    },
};

module.exports = { typeDefs, resolvers };
