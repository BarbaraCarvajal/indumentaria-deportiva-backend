const express = require('express');
const { getProductos, createProducto, getProductoById, editarProducto, actualizarProductoParcialmente, eliminarProducto} = require('../controllers/producto.controller');
const auth = require('../middlewares/auth');
const {comprobarId, productoValidacion} = require('../middlewares/validaciones');

const router = express.Router();

router.get('/productos', auth.verifyToken ,getProductos) //revisado
router.post('/productos', productoValidacion, createProducto) //revisado
router.get('/productos/:id', auth.verifyToken,comprobarId, getProductoById) //revisado
router.put('/productos/:id', auth.verifyToken,comprobarId, productoValidacion, editarProducto) //revisado
router.patch('/productos/:id', auth.verifyToken,comprobarId, actualizarProductoParcialmente) //revisado
router.delete('/productos/:id', auth.verifyToken,comprobarId, eliminarProducto) //revisado



module.exports = router;
