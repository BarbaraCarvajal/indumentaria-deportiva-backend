const Producto = require('../models/producto');

// Obtener todos los productos
async function getProductos() {
    try {
        // Consultar todos los productos en la base de datos
        let productos = await Producto.find();

        return productos;
    } catch (error) {
        // En caso de error, lanzar una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

// Crear un nuevo producto
async function createProducto(title, price, description, category, image) {
    try {
        // Crear una nueva instancia del modelo Producto con los datos proporcionados
        let producto = new Producto({ title, price, description, category, image });

        // Guardar el producto en la base de datos
        await producto.save();

        return producto;
    } catch (error) {
        // En caso de error, lanzar una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

// Obtener un producto por su ID
async function getProductoById(productId) {
    try {
        // Buscar el producto en la base de datos por su ID
        const productoEncontrado = await Producto.findById(productId);
        return productoEncontrado;
    } catch (error) {
        // En caso de error, lanzar una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

// Editar un producto por su ID
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
        // En caso de error, lanzar una excepción con el mensaje de error
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

        // Guardar los cambios en la base de datos
        await productoExistente.save();
        return productoExistente;
    } catch (error) {
        // En caso de error, lanzar una excepción con el mensaje de error
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
        // En caso de error, lanzar una excepción con el mensaje de error
        throw new Error(error.message);
    }
}

// Exportar todas las funciones para su uso en otros archivos
module.exports = {
    getProductos,
    createProducto,
    getProductoById,
    editarProducto,
    actualizarProductoParcialmente,
    eliminarProducto
};
