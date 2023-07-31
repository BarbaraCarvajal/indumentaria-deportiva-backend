const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productoSchema = new Schema({
    title:{
        type: String
    } ,
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    }
})

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;