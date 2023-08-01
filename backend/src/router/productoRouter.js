const express = require('express');
const { getProductos, createProducto, getProductoById, editarProducto, actualizarProductoParcialmente, eliminarProducto} = require('../controllers/producto.controller');

const {comprobarId, productoValidacion} = require('../middlewares/validaciones');

const router = express.Router();

router.get('/productos',getProductos) //revisado
router.post('/productos',productoValidacion, createProducto) //revisado
router.get('/productos/:id',comprobarId, getProductoById) //revisado
router.put('/productos/:id',comprobarId, productoValidacion, editarProducto) //revisado
router.patch('/productos/:id',comprobarId, actualizarProductoParcialmente) //revisado
router.delete('/productos/:id', comprobarId, eliminarProducto) //revisado



module.exports = router;
