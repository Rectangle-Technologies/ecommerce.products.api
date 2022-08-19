const ProductCategory = require("../models/ProductCategory");
const isString = require("../utils/isString");
const mongoose = require("mongoose")

exports.validatePublishingProduct = async (req) => {
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

    // product.category
    const category_error = await validateProductCategories(req.body?.category);
    if (category_error) validation_error.category = category_error;

    // product.sizes
    const sizes_error = validateProductSizes(req.body?.sizes);
    if (sizes_error) validation_error.sizes = sizes_error;
    if (req.body?.sizes === undefined || req.body?.sizes?.length === 0) validation_error.sizes = "Atleast one size should be there in the product";

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

const validateProductCategories = async (category) => {
    const validation_errors = [];
    var found = false;

    for (var i = 0; i < category?.length; i++) {
        const validation_error = {};

        if (!mongoose.Types.ObjectId.isValid(category[i])) {
            validation_error.error = "Product category is invalid";
        } else {
            const pcategory = await ProductCategory.findById(category[i]);
            if (pcategory === null) {
                validation_error.error = "Product category not found";
            }
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

const validateProductSizes = (sizes) => {
    const validation_errors = [];
    var found = false;

    for (var i = 0; sizes?.length > i; i++) {
        const validation_error = {};
        // size.title
        if (!sizes[i].title) {
            validation_error.title = "*Title";
        } else if (!isString(sizes[i].title)) {
            validation_error.title = "Invalid title"
        }
        
        // size.stock
        if (!sizes[i].stock) {
            validation_error.stock = "*Stock is required";
        } else if (!isFinite(sizes[i].stock)) {
            validation_error.stock = "Stock is not valid";
        } else if (Number(sizes[i].stock) < 0) {
            validation_error.stock = "Stock can not be less than zero";
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
