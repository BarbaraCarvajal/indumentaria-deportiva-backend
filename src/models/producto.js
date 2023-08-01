const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productoSchema = new Schema({
    title:{
        type: String,
        required: true
    } ,
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required: true
    }
})

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;