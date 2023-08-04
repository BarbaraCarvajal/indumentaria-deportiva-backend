const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/auth');

//funcion para crear usuarios

const createUsuario = async (req, res) => {
    const {nombre, apellido, email, password, rol} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = new Usuario({
            _id: new mongoose.Types.ObjectId(),
            nombre,
            apellido,
            email,
            password: hashedPassword,
            rol,
        });
        const usuarioNuevo = await usuario.save();
        console.log('usuario nuevo guardado:', usuarioNuevo);
        const token = createToken(usuarioNuevo);
        return { userSaved: usuarioNuevo, token};
    }catch(error){
        console.log('error al guardar el usuario:', error);
        throw new Error(error);
    }
};

//funcion para obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.find();
        console.log('usuarios:', usuarios);
        if(usuarios.length === 0){
            return {message: 'No hay usuarios'};
        }
        return usuarios;
    }catch(error){
        console.log('error al obtener los usuarios:', error);
        throw new Error(error);
    }
};

//funcion para obtener un usuario por id
const getUsuarioById = async (usuarioId) => {
    try{
        const usuario = await Usuario.findById(usuarioId);
        if(!usuario){
            return {message: 'No existe el usuario'};
        }
        console.log('usuario encontrado:', usuario);
        return usuario;
    }catch(error){
        console.log('error al obtener el usuario:', error);
        throw new Error(error);
    }
};

//funcion para actualizar un usuario por id
const updateUsuarioById = async (usuarioId, usuarioData) => {
    try{
        const updateUsuario = await Usuario.findByIdAndUpdate(usuarioId, usuarioData, {new: true});
        if(!updateUsuario){
            return {message: 'No existe el usuario'};
        }
        console.log('usuario actualizado:', updateUsuario);
        return updateUsuario;
    }catch(error){
        console.log('error al actualizar el usuario:', error);
        throw new Error(error);
    }
};

//funcion para actualizar parcialmente un usuario por id
const updatePartialUsuarioById = async (usuarioId, usuarioData) => {
    try{
        const updateUsuario = await Usuario.findByIdAndUpdate(usuarioId, usuarioData, {new: true});
        if(!updateUsuario){
            return {message: 'No existe el usuario'};
        }
        console.log('usuario actualizado:', updateUsuario);
        return updateUsuario;
    }catch(error){
        console.log('error al actualizar el usuario:', error);
        throw new Error(error);
    }
};

//funcion para eliminar un usuario por id
const deleteUsuarioById = async (usuarioId) => {
    try{
        const usuarioDelete = await Usuario.findByIdAndDelete(usuarioId);
        if(!usuarioDelete){
            return {message: 'No existe el usuario'};
        }
        console.log('usuario eliminado:', usuarioDelete);
        return usuarioDelete;
    }catch(error){
        console.log('error al eliminar el usuario:', error);
        throw new Error(error);
    }
};

module.exports = {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuarioById,
    updatePartialUsuarioById,
    deleteUsuarioById,
};