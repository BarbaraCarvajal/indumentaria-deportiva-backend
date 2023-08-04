const express = require('express');// librería Express
const runDB = require('./db');//función runDB para conectar a la base de datos
const productoRouter = require('./router/productoRouter');// enrutador de Producto
const cookieParser = require('cookie-parser');
const cors = require('cors'); // librería CORS para permitir peticiones cruzadas (Cross-Origin Resource Sharing)
const swaggerUi = require('swagger-ui-express'); // librería swagger-ui-express para documentar la API
const usuarioRouter = require('./router/usuarioRouter');
const authRouter = require('./router/authRouter');

// Crear una instancia de la aplicación Express
const app = express();

app.use(cookieParser());
// Configurar CORS para permitir peticiones desde http://localhost:5173
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

//librería bodyParser para parsear los datos de solicitud como JSON
const bodyParser = require('body-parser');

// Conectar a la base de datos llamando a la función runDB
runDB();
// para ver el swagger -> http://localhost:3100/api-docs/#/ <-
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(require("./api-endpoints.json")));

// Configurar Express para parsear datos de solicitud como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Asociar las rutas definidas en el enrutador de Producto a la ruta "/api"
app.use("/api", productoRouter);
app.use("/api", usuarioRouter);
app.use('/auth', authRouter);

// Iniciar el servidor Express en el puerto 3100 y mostrar un mensaje en la consola
app.listen(3100, () => {
    console.log('Usando el puerto 3100 correctamente');
});