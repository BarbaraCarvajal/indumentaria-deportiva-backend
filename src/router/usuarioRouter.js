const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/create', usuarioController.createUsuario);
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.put('/:id', usuarioController.updateUsuarioById);
router.patch('/:id', usuarioController.updatePartialUsuarioById);
router.delete('/:id', usuarioController.deleteUsuarioById);

module.exports = router;