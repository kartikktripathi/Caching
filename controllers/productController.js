const productService = require("../services/productService");

class ProductController {
  async getAllProducts(req, res) {
    try {
      const data = await productService.getAllProducts();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  async getProductById(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve product" });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, price } = req.body;
      if (!name || price === undefined) {
        return res
          .status(400)
          .json({ error: "Product name and price are required" });
      }

      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: "Failed to create product" });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const { name, price } = req.body;
      if (!name || price === undefined) {
        return res
          .status(400)
          .json({ error: "Product name and price are required" });
      }

      const updatedProduct = await productService.updateProduct(id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: "Failed to update product" });
    }
  }

  async patchProduct(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const updatedProduct = await productService.patchProduct(id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: "Failed to patch product" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const deletedProduct = await productService.deleteProduct(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
}

module.exports = new ProductController();
