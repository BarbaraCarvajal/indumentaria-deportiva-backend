const mongoose = require('mongoose');


const uri = "mongodb://127.0.0.1:27017/indumentaria_deportiva"

const conexionBD = () => {
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000
    })
    .then(()=>console.log("Connectado a MongoDb"))
    .catch(err=> console.log("error de conexion",err))
}

module.exports = conexionBD