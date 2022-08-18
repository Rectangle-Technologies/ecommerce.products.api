const isString = require("../utils/isString");
const { validatePublishingProduct } = require("./PublishedProductValidation");

exports.validateProductDeatils = (req, res, next) => {
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
