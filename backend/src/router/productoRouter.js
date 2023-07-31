const express = require('express');
const { getProductos, createProducto, getProductoById, editarProducto, actualizarProductoParcialmente, eliminarProducto} = require('../controllers/producto.controller');

const router = express.Router();

router.get('/productos', getProductos) //revisado
router.post('/productos', createProducto) //revisado
router.get('/productos/:id', getProductoById) //revisado
router.put('/productos/:id', editarProducto) //revisado
router.patch('/productos/:id', actualizarProductoParcialmente) //revisado
router.delete('/productos/:id', eliminarProducto) //revisado



module.exports = router;