const axios = require("axios");
const PRODUCT_SERVICE_URLBASE = "http://localhost:4002";
const Redis = require('ioredis');
const redis = new Redis();

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const cachedProducts = await redis.get("products");

      if (!cachedProducts) {
        const response = await axios.get(PRODUCT_SERVICE_URLBASE + `/products`);
        await redis.set("products", JSON.stringify(response.data));
        res.status(response.status).json(response.data);
      } else {
        const products = JSON.parse(cachedProducts);
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      const cachedProduct = await redis.get(`product:${id}`);

      if (!cachedProduct) {
        const response = await axios.get(PRODUCT_SERVICE_URLBASE + `/products/${id}`);
        await redis.set(`product:${id}`, JSON.stringify(response.data));
        res.status(response.status).json(response.data);
      } else {
        const product = JSON.parse(cachedProduct);
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const response = await axios.post(
        PRODUCT_SERVICE_URLBASE + "/products",
        req.body
      );
      await redis.del("products"); 
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async patchProduct(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.patch(
        PRODUCT_SERVICE_URLBASE + `/products/${id}`,
        req.body
      );
      await redis.del(`product:${id}`); 
      await redis.del("products")
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.delete(
        PRODUCT_SERVICE_URLBASE + `/products/${id}`
      );

      if (response.status === 200) {
        await redis.del(`product:${id}`);
        await redis.del("products");
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCategory(req, res) {
    try {
      const cachedCategory = await redis.get("categories");

      if (!cachedCategory) {
        const response = await axios.get(PRODUCT_SERVICE_URLBASE + `/category`);
        await redis.set("categories", JSON.stringify(response.data));
        res.status(response.status).json(response.data);
      } else {
        const categories = JSON.parse(cachedCategory);
        res.status(200).json(categories);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOneCategory(req, res) {
    try {
      const { id } = req.params;
      const cachedCategory = await redis.get(`category:${id}`);

      if (!cachedCategory) {
        const response = await axios.get(
          PRODUCT_SERVICE_URLBASE + `/category/${id}`
        );
        await redis.set(`category:${id}`, JSON.stringify(response.data));
        res.status(response.status).json(response.data);
      } else {
        const category = JSON.parse(cachedCategory);
        res.status(200).json(category);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addCategory(req, res) {
    try {
      const response = await axios.post(
        PRODUCT_SERVICE_URLBASE + "/category",
        req.body
      );
      await redis.del("categories"); 
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async patchCategory(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.patch(
        PRODUCT_SERVICE_URLBASE + `/category/${id}`,
        req.body
      );
      await redis.del(`category:${id}`); 
      await redis.del("categories"); 
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.delete(
        PRODUCT_SERVICE_URLBASE + `/category/${id}`
      );

      if (response.status === 200) {
        await redis.del(`category:${id}`);
        await redis.del("categories"); 
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getImages(req, res) {
    try {
      const cachedImages = await redis.get("images");

      if (!cachedImages) {
        const response = await axios.get(PRODUCT_SERVICE_URLBASE + `/images`);
        await redis.set("images", JSON.stringify(response.data));
        res.status(response.status).json(response.data);
      } else {
        const images = JSON.parse(cachedImages);
        res.status(200).json(images);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOneImage(req, res) {
    try {
      const { id } = req.params;
      const cachedImage = await redis.get(`image:${id}`);

      if (!cachedImage) {
        const response = await axios.get(
          PRODUCT_SERVICE_URLBASE + `/images/${id}`
        );
        await redis.set(`image:${id}`, JSON.stringify(response.data));
        res.status(response.status).json(response.data);
      } else {
        const image = JSON.parse(cachedImage);
        res.status(200).json(image);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;

