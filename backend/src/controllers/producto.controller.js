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
        
        const productoCreado = new Producto({title, price, description, category, image});
        productoCreado.save();

        res.status(201).json(productoCreado);
   } catch (error) {
         res.status(500).json({error: error.message});
   }
}


async function getProductoById(req, res) {
    try {
        
        res.json("message: encontre uno")

    } catch (error) {
        
    }

}

async function deleteProductos(req, res) {
    try {
        const producto = await Producto.findById(req.params.id)
        if (producto == null) {
            return res.status(404).json({ message: 'No se encontro el producto' })
        }
        await producto.remove()
        res.json({ message: 'Producto eliminado' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function updateProductos(req, res) {

    try {
        const producto = await Producto.findById(req.params.id)

        if (producto == null) {
            return res.status(404).json({ message: 'No se encontro el producto' })
        }
        
        if (req.body.title != null) {
            producto.title = req.body.title
        }
        
        if (req.body.price != null) {
            producto.price = req.body.price
        }

        if (req.body.description != null) {
            producto.description = req.body.description
        }

        if (req.body.category != null) {
            producto.category = req.body.category
        }

        if (req.body.image != null) {
            producto.image = req.body.image
        }

        const productoActualizado = await producto.save()
        res.json(productoActualizado)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}





module.exports = {getProductos, createProducto, getProductoById}