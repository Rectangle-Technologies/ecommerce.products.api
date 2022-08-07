const Products = require("../models/Products");
const mongoose = require("mongoose");
const validator = require("validator");
const isString = require("../utils/isString");

exports.createProduct = async (req, res) => {
    const product = await Products.create(req.body);
    return res.json({
        success: true,
        message: "Product has been created",
        product: product
    });
}

exports.validateNewProductData = (req, res, next) => {
    const validation_error = {};

    // product.name
    if (!req.body.name) {
        validation_error.name = "*Name is required";
    } else if (!isString(req.body.name)) {
        validation_error.name = "Invalid name"
    }
    
    // product.description
    if (!req.body.description) {
        validation_error.description = "*Description is required";
    } else if (!isString(req.body.description)) {
        validation_error.description = "Invalid description"
    }

    // product.features
    const features_error = validateProductFeatures(req.body?.features);
    if (features_error) validation_error.features = features_error;

    // product.variants
    const variant_error = validateProductVariants(req.body?.variant);
    if (variant_error) validation_error.variant = variant_error;

    if (Object.keys(validation_error).length > 0) {
        console.log(validation_error);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: validation_error
        })
    }
    next();
}

const validateProductFeatures = (features) => {
    const validation_errors = [];
    var found = false;

    for (var i = 0; features?.length > i; i++) {
        const validation_error = {};
        // feature.key
        if (!features[i].key) {
            validation_error.key = "*Key";
        } else if (!isString(features[i].key)) {
            validation_error.key = "Invalid key"
        }
        
        // feature.value
        if (!features[i].value) {
            validation_error.value = "*Value";
        } else if (!isString(features[i].value)) {
            validation_error.value = "Invalid value"
        }
        
        if (Object.keys(validation_error).length > 0) {
            validation_error.index = i;
            validation_errors.push(validation_error);
            found = true;
        }
    }

    if (found) {
        return validation_errors;
    } else {
        return ;
    }
}

const validateProductVariants = (variants) => {
    const validation_errors = [];
    var found = false;

    for (var i = 0; variants?.length > i; i++) {
        const validation_error = {};
        // variant.name
        if (!variants[i].name) {
            validation_error.name = "*Name";
        } else if (!isString(variants[i].name)) {
            validation_error.name = "Invalid name"
        }
        
        if (Object.keys(validation_error).length > 0) {
            validation_error.index = i;
            validation_errors.push(validation_error);
            found = true;
        }
    }

    if (found) {
        return validation_errors;
    } else {
        return ;
    }
}