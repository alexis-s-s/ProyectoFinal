const express = require('express')

const router = express.Router();

const {insertarDatos, mostrarDatos, filtrarDatos, editarDatos, borrarDatos, completarDatos} = require('./funciones.js')

router.post('/guardarOrdenDeCompra', async(req, res)=>{

  let compra = req.body;

  res.send(
    await insertarDatos("ordenDeCompra", compra)
  )

})

router.get('/mostrarOrdenesDeCompra', async(req, res)=>{

  res.send(
    await mostrarDatos("ordenDeCompra")
  )

})

router.get('/filtrarOrdenesDeCompra/:usuarioId', async(req, res)=>{

  let usuarioId = req.params.usuarioId;

  res.send(
    await filtrarDatos("ordenDeCompra", {usuarioId})
  )

})

router.put('/editarOrdenDeCompra/:idOrdenDeCompra', async(req, res)=>{

  let idOrdenDeCompra = req.params.idOrdenDeCompra;

  let productos = req.body.productos;
  let precio = req.body.precio;
  let descuentos = req.body.descuentos;
  let total = req.body.total;
  let dia = req.body.dia;
  let edad = req.body.edad;

  let OrdenDeCompraEditada = {productos, precio, descuentos, total, dia, edad};

  res.send(
    await editarDatos("ordenDeCompra", idOrdenDeCompra, OrdenDeCompraEditada)
  )

})

router.delete('/borrarOrdenesDeCompra/:idOrdenDeCompra', async(req, res)=>{

  let idOrdenDeCompra = req.params.idOrdenDeCompra;

  res.send(
    await borrarDatos("ordenDeCompra", idOrdenDeCompra)
  )

})

router.get('/datosOrdenDeCompra/:idOrdenDeCompra', async(req, res)=>{

  let idOrdenDeCompra = req.params.idOrdenDeCompra;

  res.send(
    await completarDatos("ordenDeCompra", idOrdenDeCompra)
  )

})


module.exports = router; 