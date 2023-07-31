const express = require('express');
const { getProductos, createProducto, getProductoById } = require('../controllers/producto.controller');

const router = express.Router();

router.get('/productos', getProductos)
router.post('/productos', createProducto)
router.get('/productos/:id', getProductoById)



module.exports = router;