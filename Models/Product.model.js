const mongoose = require('mongoose');
const Schema = mongoose.Schema


const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})
const Product = mongoose.model('product', BookSchema)
module.exports = Product;