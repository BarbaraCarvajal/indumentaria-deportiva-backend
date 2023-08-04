const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth');

router.get('/current',auth.verifyToken, usuarioController.getCurrentUser);
router.post('/create',usuarioController.createUsuario);
router.get('/', auth.verifyToken,usuarioController.getAllUsuarios);
router.get('/:id', auth.verifyToken,usuarioController.getUsuarioById);
router.put('/:id', auth.verifyToken,usuarioController.updateUsuarioById);
router.patch('/:id', auth.verifyToken, usuarioController.updatePartialUsuarioById);
router.delete('/:id', auth.verifyToken,usuarioController.deleteUsuarioById);

module.exports = router;