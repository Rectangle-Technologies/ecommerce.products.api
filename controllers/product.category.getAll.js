const ProductCategory = require("../models/ProductCategory")

exports.getAllProductCategories = async (req, res) => {
    const productCategories = await ProductCategory.find();
    return res.json({
        success: true,
        message: "Fetched all product categories",
        categories: productCategories
    });
}