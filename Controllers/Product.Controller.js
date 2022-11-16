const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('../Models/Product.model')

const getAllProducts = async (req, res, next) => {
    try {
        const results = await Product.find({}, {
            __v: 0
        }, {});
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }
}

const createNewProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error.name === 'validation error') {
            next(createError(422, error.message))
            return;
        }
        next(error);
    }
}
const findProductById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw createError(404, "product does not exist.")
        }
        res.send(product);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, "Invalid product id"))
            return;
        }
        next(error);
    }

}
const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = {
            new: true
        };

        const result = await Product.findByIdAndUpdate(id, updates, options);
        if (!result) {
            throw createError(404, "product does not exist");
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            return next(createError(400, "invalid product id"))
        }
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            throw createError(404, "product does not exist.")
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, "Invalid product id"))
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllProducts,
    createNewProduct,
    findProductById,
    updateProduct,
    deleteProduct
};