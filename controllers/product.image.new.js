const { default: mongoose } = require("mongoose");
const Products = require("../models/Products");

exports.newProductImage = (req, res) => {
    const pid = req.params.pid;
    if (req.file === undefined && req.files === undefined) {
        return res.status(400).json({
            success: false,
            message: "Image was not uploaded",
            errorMessage: "Image was not sent with API"
        })
    }
    
    if (mongoose.Types.ObjectId.isValid(pid)) {
        Products.findById(pid)
        .then(async (product) => {
            if (product != null) {
                product.imageUrls.push(req.file.location);
                const updatedProduct = await product.save();
                return res.json({
                    success: true,
                    product: updatedProduct
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                    errorMessage: "Invalid product identification"
                })
            }
        })
        .catch((err) => {})
    } else {
        return res.status(404).json({
            message: "Product not found",
            errorMessage: "Invalid product identification"
        })
    }
}