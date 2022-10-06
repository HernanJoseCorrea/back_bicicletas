const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const config = require('./config');


const login = require('./routes/login');

// Admin
const inventario = require('./routes/inventario');
const detalleInventario = require('./routes/detalleInventario');
const productos = require('./routes/products');
const carrito = require('./routes/carrito');

// Persona
const persona = require('./routes/personas');
const cliente = require('./routes/cliente');
const venta = require('./routes/ventas');
const direccion = require('./routes/direccion');
const telefono = require('./routes/telefono');

// Admin
const tipo = require('./routes/tipo');


// para urlencoded data
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(
  config.application.cors.server
));

app.use((req, res, next) => {
  //console.log(req.body)
  next();
})
// app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

app.use('/api', login);

app.use('/api', inventario);
app.use('/api', detalleInventario);
app.use('/api', productos);
app.use('/api', carrito);

app.use('/api', persona);
app.use('/api', cliente);
app.use('/api', venta);
app.use('/api', direccion);
app.use('/api', telefono);

// Añadir tablas crud en frontend
app.use('/api', tipo); // Tipo producto (Ron, Wisky, Tequila, etc...)

module.exports = app;