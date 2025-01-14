const ProductCategory = require("../models/ProductCategory");
const isString = require("../utils/isString");

exports.createProductCategory = async (req, res) => {
    const productCategory = await ProductCategory.create({ ...req.body, imageUrl: 'https://i.pinimg.com/736x/33/66/50/336650d646d0f5d9e144e626323a3d42.jpg' });
    return res.json({
        success: true,
        message: "Product Category has been created",
        productCategory: productCategory
    });
}

exports.validateProductCategory = (req, res, next) => {
    const validation_error = {};

    // category.title
    if (!req.body.title) {
        validation_error.title = "*Title is required";
    } else if (!isString(req.body.title)) {
        validation_error.title = "Invalid title"
    }

    if (Object.keys(validation_error).length > 0) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation error",
            errors: validation_error
        })
    } else next();
}