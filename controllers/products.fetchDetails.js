const Products = require("../models/Products");
const mongoose = require("mongoose");
const ProductCategory = require('../models/ProductCategory')

exports.fetchDetails = async (req, res) => {
    const pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(pid)) {
        const product = await Products.findById(pid);
        if (product) {
            return res.json({ product, message: "Product details found" });
        }
        return res.status(404).json({
            product: "Product not found"
        })
    } else {
        return res.status(404).json({
            message: "Product not found",
            errorMessage: "Invalid product identification"
        })
    }
}

exports.fetchByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        // Checking if category exists
        const category = await ProductCategory.findById(categoryId)
        if (!category) {
            return res.status(400).json({ message: 'Category not found' })
        }
        // Fetching products for the category
        const products = await Products.find({ category: { $elemMatch: { $eq: categoryId } } })
        res.status(200).json({ message: 'Products fetched successfully', products })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.fetchByFilter = async (req, res) => {
    try {
        const { categoryId, priceRange, sizes } = req.body
        console.log(sizes)
        // Checking if category exists
        const category = await ProductCategory.findById(categoryId)
        if (!category) {
            return res.status(400).json({ message: 'Category not found' })
        }
        // Fetching products for the category
        if (sizes && sizes.length) {
            const products = await Products.find({
                $and: [
                    { category: { $elemMatch: { $eq: categoryId } } },
                    { price: { $gte: priceRange.min, $lte: priceRange.max } },
                    { 'sizes.title': { $in: sizes } }
                ]
            })
            res.status(200).json({ message: 'Products fetched successfully', products })
        } else {
            const products = await Products.find({
                $and: [
                    { category: { $elemMatch: { $eq: categoryId } } },
                    { price: { $gte: priceRange.min, $lte: priceRange.max } },
                ]
            })
            res.status(200).json({ message: 'Products fetched successfully', products })
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}