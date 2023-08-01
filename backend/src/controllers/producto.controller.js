const Producto = require('../models/producto');
const productoService = require('../services/productoService');

// Obtener todos los productos
async function getProductos(req, res) {
    try {
        // Llamar al servicio para obtener todos los productos
        const productos = await productoService.getProductos();
        res.status(200).json(productos);
    } catch (error) {
        // En caso de error, responder con un error de servidor y el mensaje de error
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo producto
async function createProducto(req, res) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { title, price, description, category, image } = req.body;

        // Verificar que todos los campos requeridos estén presentes
        if (title && price && description && category && image) {
            // Llamar al servicio para crear un nuevo producto
            const productoCreado = await productoService.createProducto(title, price, description, category, image);
            if (productoCreado) {
                res.status(201).json(productoCreado);
            } else {
                res.status(400).json({ message: "No se pudo crear el producto" });
            }
        } else {
            res.status(400).json({ message: "Faltan datos" });
        }
    } catch (error) {
        // En caso de error, responder con un error de servidor y el mensaje de error
        res.status(500).json({ error: error.message });
    }
}

// Obtener un producto por su ID
async function getProductoById(req, res) {
    try {
        // Obtener el ID del producto de los parámetros de la solicitud
        const productoId = req.params.id;

        // Llamar al servicio para obtener un producto por su ID
        const productoEncontrado = await productoService.getProductoById(productoId);

        // Verificar si el producto fue encontrado
        if (!productoEncontrado) {
            return res.status(404).json({ error: 'El producto no fue encontrado' });
        }

        res.status(201).json(productoEncontrado);
    } catch (error) {
        // En caso de error, responder con un error de servidor y un mensaje genérico
        res.status(500).json({ error: "Error al encontrar el producto en nuestra base de datos." });
    }
}

// Editar un producto existente
async function editarProducto(req, res) {
    try {
        // Obtener el ID del producto y los datos actualizados del cuerpo de la solicitud
        const productoId = req.params.id;
        const { title, price, description, category, image } = req.body;

        // Crear un objeto con los datos actualizados del producto
        const updatedData = {
            title, price, description, category, image
        };

        // Llamar al servicio para editar el producto
        const productoActualizado = await productoService.editarProducto(productoId, updatedData);
        res.status(201).json(productoActualizado);
    } catch (error) {
        // En caso de error, responder con un error de servidor y el mensaje de error
        res.status(500).json({ error: error.message });
    }
}

// Actualizar parcialmente un producto por su ID
async function actualizarProductoParcialmente(req, res) {
    try {
        // Obtener el ID del producto y las actualizaciones del cuerpo de la solicitud
        const productoId = req.params.id;
        const actualizaciones = req.body;

        // Llamar al servicio para actualizar parcialmente el producto
        const productoActualizado = await productoService.actualizarProductoParcialmente(productoId, actualizaciones);
        res.status(201).json(productoActualizado);
    } catch (error) {
        // En caso de error, responder con un error de servidor y el mensaje de error
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un producto por su ID
async function eliminarProducto(req, res) {
    try {
        // Obtener el ID del producto de los parámetros de la solicitud
        const productoId = req.params.id;

        // Llamar al servicio para eliminar el producto
        await productoService.eliminarProducto(productoId);

        // Responder con un mensaje de éxito
        res.status(201).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        // En caso de error, responder con un error de servidor y el mensaje de error
        res.status(500).json({ error: error.message });
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
