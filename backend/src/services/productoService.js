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


async function getProductoById(productId) {
    try {
        const productoEncontrado = await Producto.findById(productId);
        return productoEncontrado;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function editarProducto(productoId, updatedData) {
    try {
        // Verificar si el producto existe en la base de datos
        const productoExistente = await Producto.findById(productoId);
        if (!productoExistente) {
            throw new Error('El producto no existe');
        }

        // Actualizar los campos del producto existente con los datos actualizados
        Object.assign(productoExistente, updatedData);
        await productoExistente.save();

        return productoExistente;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Actualizar parcialmente un producto por su ID
async function actualizarProductoParcialmente(productoId, actualizaciones) {
    try {
        // Verificar si el producto existe en la base de datos
        const productoExistente = await Producto.findById(productoId);
        if (!productoExistente) {
            throw new Error('El producto no existe');
        }

        // Actualizar los campos del producto existente con las actualizaciones proporcionadas
        for (const key in actualizaciones) {
            if (key in productoExistente) {
                productoExistente[key] = actualizaciones[key];
            }
        }

        await productoExistente.save();
        return productoExistente;
    } catch (error) {
        throw new Error(error.message);
    }
}
// Eliminar un producto por su ID
async function eliminarProducto(productoId) {
    try {
        // Verificar si el producto existe en la base de datos
        const productoExistente = await Producto.findById(productoId);
        if (!productoExistente) {
            throw new Error('El producto no existe');
        }

        // Eliminar el producto de la base de datos
        await Producto.findByIdAndDelete(productoId);
        return { message: 'producto eliminado correctamente' };
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {  getProductos, createProducto, getProductoById, editarProducto, actualizarProductoParcialmente, eliminarProducto }