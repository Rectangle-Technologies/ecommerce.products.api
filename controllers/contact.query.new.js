const { default: isEmail } = require("validator/lib/isEmail");
const ContactQueries = require("../models/ContactQueries");
const isString = require("../utils/isString");

exports.createContactQuery = async (req, res) => {
    const contact = await ContactQueries.create(req.body);
    
    if (req.body.marketing_checkbox) {
        // TODO add user for marketing module
    }

    return res.json({
        success: true,
        message: "Contact query has been added to queue",
        id: contact.id || contact._id
    })
}

exports.validateContactQuery = async (req, res, next) => {
    const validation_error = {};
    
    // query.name
    if (!req.body.name) {
        validation_error.name = "*Name is required";
    } else if (!isString(req.body.name)) {
        validation_error.name = "Invalid name"
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