const router = require("express").Router();
const { createProduct, validateNewProductData } = require("../controllers/product.createProduct");
const { validateProductData, updateProduct } = require("../controllers/product.updateProduct");
const { fetchDetails } = require("../controllers/products.fetchDetails");

// URL /products/fetchDetails/:pid
// DESC get product details
router.get("/fetchDetails/:pid", fetchDetails);

// URL /products/createProduct
// DESC create product details
router.post("/createProduct", validateNewProductData, createProduct);

// URL /products/createProduct/:pid
// DESC update product details with product id
router.put("/createProduct/:pid", validateProductData, updateProduct);

module.exports = router;