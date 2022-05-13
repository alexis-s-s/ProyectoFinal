const express = require('express')
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());

const usuarios = require('./api/usuarios');
const medicamentos = require('./api/medicamentos');
const ordenes = require('./api/ordenes');

app.use("/usuarios", usuarios);
app.use("/medicamentos", medicamentos);
app.use("/ordenes", ordenes);

app.listen(3000, ()=>{
    console.log("Conectado a servidor")
})
