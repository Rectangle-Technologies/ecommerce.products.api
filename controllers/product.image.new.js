const { default: mongoose } = require("mongoose");
const Products = require("../models/Products");
const { s3 } = require('./image.uploader')

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
            .catch((err) => { })
    } else {
        return res.status(404).json({
            message: "Product not found",
            errorMessage: "Invalid product identification"
        })
    }
}

exports.deleteImage = async (req, res) => {
    try {
        const { productId, imageUrl } = req.body
        // Finding the product
        const product = await Products.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        // Checking if image is there in product
        const idx = product.imageUrls.findIndex(url => url === imageUrl)
        // if (idx === -1) {
        //     return res.status(404).json({ message: 'Image not there in product' })
        // }
        // Deleting from S3
        let key = imageUrl.split('/')[3]
        key = key.replaceAll("%2C", ",")
        await s3
            .deleteObject({ Bucket: "bloomdev", Key: key })
            .promise();
        // Deleting from MongoDB
        const newImageUrls = product.imageUrls.filter(url => url !== imageUrl)
        product.imageUrls = newImageUrls
        await product.save()
        res.status(200).json({ message: 'Image deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}