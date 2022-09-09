const ProductCategory = require("../models/ProductCategory")

exports.getAllProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find();
        return res.json({
            success: true,
            message: "Fetched all product categories",
            categories: productCategories
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.getCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await ProductCategory.findById(id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json({ message: 'Category fetched successfully', category })
    } catch (err) {
        console.log(res)
        res.status(500).json({ message: 'Something went wrong' })
    }
}