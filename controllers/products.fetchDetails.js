const Products = require("../models/Products");
const mongoose = require("mongoose");
const ProductCategory = require('../models/ProductCategory')

exports.fetchDetails = async (req, res) => {
    const pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(pid)) {
        const product = await Products.findById(pid);
        if (product) {
            if (product.launch_time <= Date.now())
                return res.json({ product, message: "Product details found" });
            else
                return res.status(400).json({ message: "Product is not launched yet", status: "PRODUCT_NOT_LAUNCHED", product })
        }
        return res.status(404).json({
            message: "Product not found"
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
        const page = Number.parseInt(req.query.page)
        const limit = Number.parseInt(req.query.limit)
        // Checking if category exists
        const category = await ProductCategory.findById(categoryId)
        if (!category) {
            return res.status(400).json({ message: 'Category not found' })
        }
        // Fetching products for the category
        const count = await Products.find({ category: { $elemMatch: { $eq: categoryId } } }).count()
        const products = await Products
            .find({ category: { $elemMatch: { $eq: categoryId } } })
            .skip((page - 1) * limit)
            .limit(limit)
        res.status(200).json({ message: 'Products fetched successfully', products, count })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.fetchByFilter = async (req, res) => {
    try {
        const { categoryId, priceRange, sizes, name } = req.body
        // Checking if category exists
        if (categoryId) {
            const category = await ProductCategory.findById(categoryId)
            if (!category) {
                return res.status(400).json({ message: 'Category not found' })
            }
        }
        // Fetching products for the category
        const page = Number.parseInt(req.query.page)
        const limit = Number.parseInt(req.query.limit)
        if (categoryId) {
            if (sizes && sizes.length) {
                const count = await Products.find({
                    $and: [
                        { category: { $elemMatch: { $eq: categoryId } } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                        { 'sizes.title': { $in: sizes } }
                    ]
                }).count()
                const products = await Products.find({
                    $and: [
                        { category: { $elemMatch: { $eq: categoryId } } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                        { 'sizes.title': { $in: sizes } }
                    ]
                }).skip((page - 1) * limit).limit(limit)
                res.status(200).json({ message: 'Products fetched successfully', products, count })
            } else {
                const count = await Products.find({
                    $and: [
                        { category: { $elemMatch: { $eq: categoryId } } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                    ]
                }).count()
                const products = await Products.find({
                    $and: [
                        { category: { $elemMatch: { $eq: categoryId } } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                    ]
                }).skip((page - 1) * limit).limit(limit)
                res.status(200).json({ message: 'Products fetched successfully', products, count })
            }
        } else if (name) {
            if (sizes && sizes.length) {
                const count = await Products.find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                        { 'sizes.title': { $in: sizes } }
                    ]
                }).count()
                const products = await Products.find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                        { 'sizes.title': { $in: sizes } }
                    ]
                }).skip((page - 1) * limit).limit(limit)
                res.status(200).json({ message: 'Products fetched successfully', products, count })
            } else {
                const count = await Products.find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                    ]
                }).count()
                const products = await Products.find({
                    $and: [
                        { name: { $regex: name, $options: 'i' } },
                        { price: { $gte: priceRange.min, $lte: priceRange.max } },
                    ]
                }).skip((page - 1) * limit).limit(limit)
                res.status(200).json({ message: 'Products fetched successfully', products, count })
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}