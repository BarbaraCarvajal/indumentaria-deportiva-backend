const Producto = require('../models/producto');
const productoService = require('../services/productoService');

async function getProductos(req, res) {
    try {
        const productos = await productoService.getProductos()
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createProducto(req, res) {
   try {
        const {title, price, description, category, image} = req.body;

        if(title && price && description && category && image){
            const productoCreado = await productoService.createProducto(title, price, description, category, image);
            if(productoCreado){
                res.status(201).json(productoCreado);
            }else{
                res.status(400).json({message: "No se pudo crear el producto"});
            }
        }else{
            res.status(400).json({message: "Faltan datos"});
        }
   } catch (error) {
         res.status(500).json({error: error.message});
   }
}

// Obtener un producto por su ID
async function getProductoById(req, res) {
    try {
        const productoId = req.params.id;
        const productoEncontrado = await productoService.getProductoById(productoId);

        if (!productoEncontrado) {
            return res.status(404).json({ error: 'El producto no fue encontrado' });
        }

        res.status(201).json(productoEncontrado);
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar el producto en nuestra base de datos." });
    }
}

// Editar un producto existente
async function editarProducto(req, res) {
    try {
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
        res.status(500).json({ error: error.message });
    }
}


// Actualizar parcialmente un producto por su ID
async function actualizarProductoParcialmente(req, res) {
    try {
        const productoId = req.params.id;
        const actualizaciones = req.body;
        // Llamar al servicio para actualizar parcialmente el producto
        const productoActualizado = await productoService.actualizarProductoParcialmente(productoId, actualizaciones);
        res.status(201).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un producto por su ID
async function eliminarProducto(req, res) {
    try {
        const productoId = req.params.id;
        // Llamar al servicio para eliminar el producto
        await productoService.eliminarProducto(productoId);
        res.status(201).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {getProductos, createProducto, getProductoById, editarProducto, actualizarProductoParcialmente, eliminarProducto};