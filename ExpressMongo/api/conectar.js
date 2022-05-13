const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url);
const nombreBaseDeDatos = 'Farmacia';
let baseDeDatos = null;

async function conectarClienteBaseDeDatos() {

  if (baseDeDatos) return baseDeDatos;

  await cliente.connect();
  console.log('Conectado a base de datos');

  baseDeDatos = cliente.db(nombreBaseDeDatos);
  return baseDeDatos;

}

module.exports = {
  conectarClienteBaseDeDatos
}