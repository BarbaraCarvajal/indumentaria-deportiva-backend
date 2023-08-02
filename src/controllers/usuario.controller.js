const usuarioService = require('../services/usuarioService');
const auth = require('../middlewares/auth');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

//funcion para iniciar sesion y verificar credenciales
const loginUser = async (req, res) => {
    try{
        await auth.login(req, res);
    }catch(error){
        console.log('Error al iniciar sesión', error)
        res.status(500).json({error: error.message});
    }
};

//funcion para cerrar sesion
const logoutUser = async (req, res) => {
    try{
        res.clearCookie('token', {httpOnly: true, secure: true});
        res.status(200).json({message: 'Sesión cerrada'});
    }catch(error){
        console.log('Error al cerrar sesión', error)
        res.status(500).json({error: error.message});
    }
};

//funcion para crear un usuario
const createUsuario = async (req, res) => {
    try{
        console.log('usuario nuevo guardado:', req.body);
        const {userSaved, token} = await usuarioService.createUsuario(req, res);
        console.log('usuario nuevo guardado:', userSaved);
        res.status(201).json({userSaved, token});
    }catch(error){
        console.log('error al guardar el usuario:', error);
         res.status(400).json({message: error.message});
    }
};

//funcion para obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
    try{
        const usuarios = await usuarioService.getAllUsuarios();
        if(usuarios.length === 0){
            return res.status(404).json({message: 'No se encontraron usuarios'});
        }
        res.status(200).json(usuarios);
    }catch(error){
         res.status(400).json({message: error.message});
    }
};

//funcion para obtener un usuario por id
const getUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    try{
        const usuario = await usuarioService.getUsuarioById(usuarioId);
        if(!usuario){
            return res.status(404).json({message: 'No se encontro el usuario'});
        }
        res.status(200).json(usuario);
    }catch(error){
         res.status(400).json({message: error.message});
    }
};

//funcion para actualizar un usuario por id
const updateUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    try{
        const updateUsuario = await usuarioService.updateUsuarioById(usuarioId, req.body);
        if(!updateUsuario){
            return res.status(404).json({message: 'No se encontro el usuario'});
        }
        res.status(200).json(updateUsuario);
    }catch(error){
         res.status(400).json({message: error.message});
    }
};

//Funcion para actualizar parcialmente un usuario por id
const updatePartialUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    try{
        const patchUsuario = await usuarioService.updatePartialUsuarioById(usuarioId, req.body);
        if(!patchUsuario){
            return res.status(404).json({message: 'No se encontro el usuario'});
        }
        res.status(200).json(patchUsuario);
    }catch(error){
         res.status(400).json({message: error.message});
    }
};

//funcion para eliminar un usuario por id
const deleteUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    try{
        const deleteUsuario = await usuarioService.deleteUsuarioById(usuarioId);
        if(!deleteUsuario){
            return res.status(404).json({message: 'No se encontro el usuario'});
        }
        res.status(200).json({message: 'Usuario eliminado'});
    }catch(error){
         res.status(400).json({message: error.message});
    }
};

//funcion para obtener datos del usuario logueado y mostrarlos en el perfil
const getCurrentUser = async (req, res) => {
    try{
        //obtener el token del usuario de las cookies de la solicitud
        const token = req.cookies.token;
        //decodificar el token
        const decodedToken = jwt.verify(token, secretKey);
        //obtener el usuario logueado
        const email = decodedToken.email;
        //buscar el usuario en la base de datos
        const user= await Usuario.findOne({email: email});
        if(!user){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        //devolver los datos del usuario
        res.status(200).json({user});
    }catch(err){
        console.error('Error al obtener los datos del usuario:', err);
        res.status(400).json({error: 'Error al obtener los datos del usuario'});
    }
};



module.exports = {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuarioById,
    updatePartialUsuarioById,
    deleteUsuarioById,
    loginUser,
    logoutUser,
    getCurrentUser
};