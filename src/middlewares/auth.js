const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;

//metodo para crear token al iniciar sesion
const createToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    return token;
};

//metodo para iniciar sesion y verificar credenciales
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await Usuario.findOne({email: email});
        if (!user) {
            return res.status(400).json({error: 'Usuario no encontrado en la base de datos'});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({error: 'Contraseña incorrecta'});
        }
        const token = createToken(user);
        res.cookie('token', token).send('Cookie creada');
    }catch (error) {
        console.log('Error al iniciar sesión', error)
        res.status(500).json({error: error.message});
    }
};

//middleware para verificar el token 
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) {
        res.redirect('/login');
    }
    try {
        const tokenDecoded = jwt.verify(token, secretKey);
        if (tokenDecoded) {
            next();
        }else{
            res.redirect('/login');
        }
    }catch (error) {
        console.log('Error al verificar el token', error)
        return res.status(500).json({error: error.message});
    }
};

module.exports = {
    createToken,
    login,
    verifyToken,
};