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
    var publishing = true;

    // check and update product status
    if (!req.body.status || req.body.status === "Draft") {
        req.body.status = "Draft";
        publishing = false;
    }

    // product.name
    if (!req.body.name) {
        validation_error.name = "*Name is required";
    } else if (!isString(req.body.name)) {
        validation_error.name = "Invalid name"
    }
    
    // add errors if the product status is publishing
    if (publishing) {
        const errors = validatePublishingProduct(req);
        if (errors) {
            const keys = Object.keys(errors);
            for (var i  = 0; i  < keys.length; i++) {
                const key = keys[i];
                validation_error[key] = errors[key];
            }
        }
    }
    
    if (Object.keys(validation_error).length > 0) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation error",
            errors: validation_error
        })
    } else next();
}

const validatePublishingProduct = (req) => {
    const validation_error = {};
    
    // product.description
    if (!req.body.description) {
        validation_error.description = "*Description is required";
    } else if (!isString(req.body.description)) {
        validation_error.description = "Invalid description"
    }

    // product.features
    const features_error = validateProductFeatures(req.body?.features);
    if (features_error) validation_error.features = features_error;

    // product.mrp
    if (!req.body.mrp) {
        validation_error.mrp = "*MRP is required";
    } else if (!isFinite(req.body.mrp)) {
        validation_error.mrp = "MRP is not valid";
    } else if (Number(req.body.mrp) <= 0) {
        validation_error.mrp = "MRP can not be less than or equal to zero";
    }

    // product.price
    if (!req.body.price) {
        validation_error.price = "*Price is required";
    } else if (!isFinite(req.body.price)) {
        validation_error.price = "Price is not valid";
    } else if (Number(req.body.price) < 0) {
        validation_error.price = "Price can not be less than zero";
    }

    // validate that price is less than MRP
    if (!validation_error.price && !validation_error.mrp) {
        if (Number(req.body.price) <= Number(req.body.mrp)) {}
        else {
            validation_error.price = "Price can not be greater than MRP";
        }
    }

    if (Object.keys(validation_error).length > 0) {
        return validation_error
    } else false;
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
