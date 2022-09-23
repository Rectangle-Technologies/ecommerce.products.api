const ProductCategory = require('../models/ProductCategory')

exports.deleteCategory = async (req, res) => {
    try {
        // Delete category from mongoDB
        const category = await ProductCategory.findByIdAndDelete(req.params.id)

        // Delete image from AWS
        // const imageUrl = category.imageUrl
        // let key = imageUrl.split('/')[3]
        // key = key.replaceAll("%2C", ",")
        // await s3
        // .deleteObject({ Bucket: "bloomdev", Key: key })
        // .promise();
        res.status(200).json({ message: 'Category deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message || 'Something went wrong' })
    }
}