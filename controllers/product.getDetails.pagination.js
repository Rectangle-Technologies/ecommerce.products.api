const Products = require("../models/Products");
const mongoose = require("mongoose");
const ProductCategory = require("../models/ProductCategory");

exports.getDetailsPagination = async (req, res) => {
    const limit = req.params.limit;
    const pageno = req.params.pageno;

    const pageOptions = {
        page: parseInt(pageno, 10) || 0,
        limit: parseInt(limit, 10) || 10
    }

    const count = await Products.count();
    const products = await Products.find().populate('category').skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit);
    return res.json({ products, message: "Product details fetched", totalProducts: count });
}