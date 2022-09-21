const { default: isEmail } = require("validator/lib/isEmail");
const ExchangeQueries = require("../models/ExchangeQueries");
const isString = require("../utils/isString");

exports.createExchangeQuery = async (req, res) => {
    const exchange = await ExchangeQueries.create(req.body);

    return res.json({
        success: true,
        message: "Exchange query has been saved",
        id: exchange.id || exchange._id
    })
}

exports.validateExchangeQuery = async (req, res, next) => {
    const validation_error = {};
    
    // query.order_id
    if (!req.body.order_id) {
        validation_error.order_id = "*Order ID is required";
    } else if (!isString(req.body.order_id)) {
        validation_error.order_id = "Invalid order_id"
    }

    // query.email
    if (!req.body.email) {
        validation_error.email = "*Email is required";
    } else if (!isString(req.body.email)) {
        validation_error.email = "Invalid email";
    } else if (!isEmail(req.body.email)) {
        validation_error.email = "Invalid email";
    }
    
    // query.message
    if (!req.body.message) {
        validation_error.message = "*Message is required";
    } else if (!isString(req.body.message)) {
        validation_error.message = "Invalid message";
    }

    // query.mobile_no
    if (!req.body.mobile_no) {
        validation_error.mobile_no = "*Mobile no. is required";
    } else if (!isString(req.body.mobile_no)) {
        validation_error.mobile_no = "Invalid mobile no";
    }

    if (Object.keys(validation_error).length > 0) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation error",
            errors: validation_error
        })
    } else next();
}