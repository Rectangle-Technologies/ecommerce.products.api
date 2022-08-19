const Products = require("../models/Products");
const { validateProductDeatils } = require("../validation/DraftProductValidation");

exports.createProduct = async (req, res) => {
    const product = await Products.create(req.body);
    return res.json({
        success: true,
        message: "Product has been created",
        product: product
    });
}

exports.validateProductDeatils = validateProductDeatils;