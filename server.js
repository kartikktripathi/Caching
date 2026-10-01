const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Product Cache API is running" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
