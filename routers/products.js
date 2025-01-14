const router = require("express").Router();
const { ImageUploader } = require("../controllers/image.uploader");
const { validateProductCategory, createProductCategory } = require("../controllers/product.category.createCategory");
const { deleteCategory } = require("../controllers/product.category.deleteCategory");
const { getAllProductCategories, getCategory } = require("../controllers/product.category.getAll");
const { newProductCategoryImage } = require("../controllers/product.category.image.new");
const { createProduct, validateProductDeatils } = require("../controllers/product.createProduct");
const { deleteProduct } = require("../controllers/product.deleteProduct");
const { getDetailsPagination } = require("../controllers/product.getDetails.pagination");
const { getLatestProducts } = require("../controllers/product.getLatest");
const { fetchProductsByName, fetchProductsByNameAdmin } = require("../controllers/product.getProductByName");
const { newProductImage, deleteImage } = require("../controllers/product.image.new");
const { validateProductData, updateProduct } = require("../controllers/product.updateProduct");
const { fetchDetails, fetchByFilter, fetchByCategory } = require("../controllers/products.fetchDetails");
const authenticate = require("../middleware/auth");

// URL /products/fetchDetails/:pid
// DESC get product details
router.get("/fetchDetails/:pid", fetchDetails);

// URL /products/details/:pageno/:limit
// DESC get product details with pagination
router.get("/details/:pageno/:limit", getDetailsPagination);

// URL /products/fetchByFilter
// DESC get products by filters
router.post('/fetchByFilter', fetchByFilter)

// URL /products/fetchByCategory
router.get('/fetchByCategory/:id', fetchByCategory)

// URL /products/get
// DESC fetch products by name
router.get('/get', fetchProductsByName)

// URL /products/get/admin
// DESC fetch products by name admin
router.get('/get/admin', fetchProductsByNameAdmin)

// URL /products/createProduct
// DESC create product details
router.post("/createProduct", authenticate, validateProductDeatils, createProduct);

// URL /products/createProduct/:pid
// DESC update product details with product id
router.post("/updateProduct/:pid", authenticate, validateProductData, updateProduct);

// URL /products/deleteProduct/:pid
// DESC delete product via product-id
router.delete("/deleteProduct/:pid", authenticate, deleteProduct)

// URL /products/image/new/:pid
// DESC add new image to product by pid
router.post("/image/new/:pid", authenticate, ImageUploader.single("productImage"), newProductImage)

// URL /products/image/delete
router.post('/image/delete', authenticate, deleteImage)

// URL /products/category/create
// DESC create new product category
router.post("/category/create", authenticate, validateProductCategory, createProductCategory);

// URL /category/image/:pid
// DESC add product category image
router.post("/category/image/:pid", authenticate, ImageUploader.single("productCategoryImage"), newProductCategoryImage)

// URL /products/category/:id
// DESC delete product category
router.delete('/category/:id', authenticate, deleteCategory)

// URL /products/category/getall
// DESC get all product category
router.get("/category/getall", getAllProductCategories);

// URL /products/category/:id
router.get('/category/:id', getCategory)

// URL /products/latest
// DESC get latest products launched
router.get("/latest", getLatestProducts);

module.exports = router;