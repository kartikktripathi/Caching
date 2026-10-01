const db = require("../database/productDatabase");

class ProductService {
  async getAllProducts() {
    return await db.readData();
  }

  async getProductById(id) {
    const numericId = Number(id);
    const products = await db.readData();
    return products.find((item) => item.id === numericId) || null;
  }

  async createProduct(productData) {
    const products = await db.readData();

    const maxId = products.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0,
    );
    const newProduct = {
      ...productData,
      id: maxId + 1,
    };

    products.push(newProduct);
    await db.writeData(products);
    return newProduct;
  }

  async updateProduct(id, productData) {
    const numericId = Number(id);
    const products = await db.readData();
    const index = products.findIndex((item) => item.id === numericId);

    if (index === -1) {
      return null;
    }

    const updatedProduct = {
      ...productData,
      id: numericId,
    };

    products[index] = updatedProduct;
    await db.writeData(products);
    return updatedProduct;
  }

  async patchProduct(id, partialData) {
    const numericId = Number(id);
    const products = await db.readData();
    const index = products.findIndex((item) => item.id === numericId);

    if (index === -1) {
      return null;
    }

    const updatedProduct = {
      ...products[index],
      ...partialData,
      id: numericId,
    };

    products[index] = updatedProduct;
    await db.writeData(products);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const numericId = Number(id);
    const products = await db.readData();
    const index = products.findIndex((item) => item.id === numericId);

    if (index === -1) {
      return null;
    }

    const [deletedProduct] = products.splice(index, 1);
    await db.writeData(products);
    return deletedProduct;
  }
}

module.exports = new ProductService();
