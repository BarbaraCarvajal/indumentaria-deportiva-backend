const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth');

router.post('/login', usuarioController.loginUser);
router.post('/logout', auth.verifyToken, usuarioController.logoutUser);

module.exports = router;