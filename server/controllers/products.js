const Product = require('../models/Product');
const asyncErrorWrapper = require("express-async-handler")


const getAllProducts = asyncErrorWrapper(async(req, res, next) => {
    const products = await Product.find();
    res
    .status(200)
    .json(products);
});

const addProduct = asyncErrorWrapper(async(req, res, next) => {
    const product = req.body;
    const products = await Product.create(product);
    
    res
    .status(200)
    .json(products);
});


module.exports = {
    getAllProducts,
    addProduct
}

    
   

