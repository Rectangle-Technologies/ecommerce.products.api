const { default: isEmail } = require("validator/lib/isEmail");
const CollaborateQueries = require("../models/CollaborateQueries");
const isString = require("../utils/isString");

exports.createCollabQuery = async (req, res) => {
    const collab = await CollaborateQueries.create(req.body);

    return res.json({
        success: true,
        message: "Collaboration query has been saved",
        id: collab.id || collab._id
    })
}

exports.validateCollabQuery = async (req, res, next) => {
    const validation_error = {};
    
    // query.first_name
    if (!req.body.first_name) {
        validation_error.first_name = "*First name is required";
    } else if (!isString(req.body.first_name)) {
        validation_error.first_name = "Invalid first_name"
    }
    
    // query.last_name
    if (!req.body.last_name) {
        validation_error.last_name = "*Last name is required";
    } else if (!isString(req.body.last_name)) {
        validation_error.last_name = "Invalid last_name"
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