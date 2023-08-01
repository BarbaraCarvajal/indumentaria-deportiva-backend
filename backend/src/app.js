const express = require('express');// librería Express
const runDB = require('./db');//función runDB para conectar a la base de datos
const productoRouter = require('./router/ProductoRouter');// enrutador de Producto
const cors = require('cors'); // librería CORS para permitir peticiones cruzadas (Cross-Origin Resource Sharing)


// Crear una instancia de la aplicación Express
const app = express();

// Configurar CORS para permitir peticiones desde http://localhost:5173
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

//librería bodyParser para parsear los datos de solicitud como JSON
const bodyParser = require('body-parser');

// Conectar a la base de datos llamando a la función runDB
runDB();

// Configurar Express para parsear datos de solicitud como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Asociar las rutas definidas en el enrutador de Producto a la ruta "/api"
app.use("/api", productoRouter);

// Iniciar el servidor Express en el puerto 3100 y mostrar un mensaje en la consola
app.listen(3100, () => {
    console.log('Usando el puerto 3100 correctamente');
});
