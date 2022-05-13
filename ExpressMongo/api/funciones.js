const {ObjectId} = require('mongodb');

const {conectarClienteBaseDeDatos} = require('./conectar.js')

async function insertar(nombreColeccion, contenido){

  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const contenidoInsertado = await coleccion.insertMany(contenido);
  console.log('Contenido insertado: ', contenidoInsertado);

  return contenidoInsertado;

}

async function insertarDatos(nombreColeccion, contenido){

  return await insertar(nombreColeccion, [contenido])

}

async function mostrarDatos(nombreColeccion){

  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const mostrarContenido = await coleccion.find({}).toArray();
  console.log("Contenido: " + JSON.stringify(mostrarContenido))

  return mostrarContenido;

}

async function filtrarDatos(nombreColeccion, filtro){

  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const mostrarContenido = await coleccion.find(filtro).toArray();
  console.log("Contenido: " + JSON.stringify(mostrarContenido))

  return mostrarContenido;

}

async function comprobarDatos(nombreColeccion, filtro){
  
  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const comprobarContenido = await coleccion.find(filtro).toArray();
  console.log("Contenido comprobado: " + JSON.stringify(comprobarContenido))

  return comprobarContenido[0];

}

async function editarDatos(nombreColeccion, idContenido, nuevoContenido){

  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const contenidoEditado = await coleccion.updateOne({_id: ObjectId(idContenido)}, {$set: nuevoContenido});
  console.log("Contenido editado id: " + idContenido)
  console.log(contenidoEditado)

  return contenidoEditado;

}

async function borrarDatos(nombreColeccion, filtro){

  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const borrarContenido = await coleccion.deleteOne({_id: ObjectId(filtro)});
  console.log("Contenido borrado id: " + filtro)
  console.log(borrarContenido)

  return borrarContenido;

}

async function completarDatos(nombreColeccion, filtro){

  let baseDeDatos = await conectarClienteBaseDeDatos();
  const coleccion = baseDeDatos.collection(nombreColeccion);

  const mostrarContenido = await coleccion.find({_id: ObjectId(filtro)}).toArray();
  console.log("Mostrar: " + JSON.stringify(mostrarContenido))

  return mostrarContenido[0];

}

module.exports = {
  insertar,
  insertarDatos,
  mostrarDatos,
  filtrarDatos,
  comprobarDatos,
  editarDatos,
  borrarDatos,
  completarDatos
}
