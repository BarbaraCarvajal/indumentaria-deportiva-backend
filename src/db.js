// Importar la librería mongoose para interactuar con la base de datos MongoDB
const mongoose = require('mongoose');

// Definir la URI (Uniform Resource Identifier) de la base de datos MongoDB
const uri = "mongodb://127.0.0.1:27017/indumentaria_deportiva";

// Función para establecer la conexión con la base de datos
const conexionBD = () => {
    // Conectar a la base de datos usando la URI definida y las opciones de configuración
    mongoose.connect(uri, {
        useNewUrlParser: true,         // Utilizar el nuevo analizador de URL (evita el aviso de deprecación)
        useUnifiedTopology: true,    // Utilizar el nuevo motor de detección de servidores (evita el aviso de deprecación)
        socketTimeoutMS: 30000       // Establecer el tiempo de espera para la conexión en milisegundos
    })
    .then(() => console.log("Conectado a MongoDB"))  // En caso de éxito, mostrar un mensaje en la consola
    .catch(err => console.log("Error de conexión", err)); // En caso de error, mostrar un mensaje en la consola
}

// Exportar la función para su uso en otros archivos
module.exports = conexionBD;