const router = require("express").Router();
const { validateProductCategory, createProductCategory } = require("../controllers/product.category.createCategory");
const { createProduct, validateProductDeatils } = require("../controllers/product.createProduct");
const { deleteProduct } = require("../controllers/product.deleteProduct");
const { validateProductData, updateProduct } = require("../controllers/product.updateProduct");
const { fetchDetails } = require("../controllers/products.fetchDetails");

// URL /products/fetchDetails/:pid
// DESC get product details
router.get("/fetchDetails/:pid", fetchDetails);

// URL /products/createProduct
// DESC create product details
router.post("/createProduct", validateProductDeatils, createProduct);

// URL /products/createProduct/:pid
// DESC update product details with product id
router.put("/createProduct/:pid", validateProductData, updateProduct);

// URL /products/deleteProduct/:pid
// DESC delete product via product-id
router.delete("/deleteProduct/:pid", deleteProduct)

// URL /products/category/create
// DESC create new product category
router.post("/category/create", validateProductCategory, createProductCategory);

module.exports = router;