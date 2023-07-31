const Producto = require('../models/producto');


async function getProductos(){
    try {
        let productos = await Producto.find();

        return productos;

    } catch (error) {
        throw new Error(error.message);
    }
}

async function createProducto(title, price, description, category, image){
    try {
        let producto = new Producto({title, price, description, category, image});
        producto.save();

        return producto;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {  getProductos, createProducto }