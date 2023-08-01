const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    id: Schema.Types.ObjectId,
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;