const router = require("express").Router();
const ImageUploader = require("../controllers/image.uploader");
const { validateProductCategory, createProductCategory } = require("../controllers/product.category.createCategory");
const { getAllProductCategories } = require("../controllers/product.category.getAll");
const { createProduct, validateProductDeatils } = require("../controllers/product.createProduct");
const { deleteProduct } = require("../controllers/product.deleteProduct");
const { getDetailsPagination } = require("../controllers/product.getDetails.pagination");
const { newProductImage } = require("../controllers/product.image.new");
const { validateProductData, updateProduct } = require("../controllers/product.updateProduct");
const { fetchDetails } = require("../controllers/products.fetchDetails");

// URL /products/fetchDetails/:pid
// DESC get product details
router.get("/fetchDetails/:pid", fetchDetails);

// URL /products/details/:pageno/:limit
// DESC get product details with pagination
router.get("/details/:pageno/:limit", getDetailsPagination);

// URL /products/createProduct
// DESC create product details
router.post("/createProduct", validateProductDeatils, createProduct);

// URL /products/createProduct/:pid
// DESC update product details with product id
router.put("/createProduct/:pid", validateProductData, updateProduct);

// URL /products/deleteProduct/:pid
// DESC delete product via product-id
router.delete("/deleteProduct/:pid", deleteProduct)

// URL /products/image/new/:pid
// DESC add new image to product by pid
router.post("/image/new/:pid", ImageUploader.single("productImage"), newProductImage)

// URL /products/category/create
// DESC create new product category
router.post("/category/create", validateProductCategory, createProductCategory);

// URL /products/category/getall
// DESC get all product category
router.get("/category/getall", getAllProductCategories);

module.exports = router;