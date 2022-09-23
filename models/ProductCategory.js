const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);