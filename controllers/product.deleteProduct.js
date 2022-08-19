const { default: mongoose } = require("mongoose");
const Products = require("../models/Products");

exports.deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(pid)) {
        const product = await Products.findByIdAndDelete(pid, req.body);
        if (product != null) return res.json({
            success: true,
            message: "Product deleted",
            product
        })
        else return res.status(404).json({
            success: false,
            errorMessage: "Product not found",
        })
    } else {
        return res.status(404).json({
            message: "Product not found",
            errorMessage: "Invalid product identification"
        })
    }
}