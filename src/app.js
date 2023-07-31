const express = require('express');
const runDB = require('./db');
const Producto = require('./models/producto');
const productoRouter = require('./router/ProductoRouter');

const app = express();

const bodyParser = require('body-parser');

//conectar a la base de datos
runDB();

// para parsear los datos de solicitud como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//asociar las rutas
app.use("/api", productoRouter)
 


app.listen(3100, () => {
    console.log('Usando el puerto 3100 correctamente');
})