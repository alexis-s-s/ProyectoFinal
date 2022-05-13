const express = require('express')

const router = express.Router();

const {insertarDatos, mostrarDatos, editarDatos, borrarDatos, completarDatos} = require('./funciones.js')

router.post('/crearMedicamento', async(req, res)=>{

  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;

  let medicamento = {nombre, descripcion, precio};

    res.send(
      await insertarDatos("medicamento", medicamento)
  )

})

router.get('/mostrarMedicamentos', async(req, res)=>{

  res.send(
  await mostrarDatos("medicamento")
  )

})

router.put('/editarMedicamento/:idMedicamento', async(req, res)=>{

  let idMedicamento = req.params.idMedicamento;

  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;

  let medicamentoEditado = {nombre, descripcion, precio};

  res.send(
    await editarDatos("medicamento", idMedicamento, medicamentoEditado)
  )

})

router.delete('/borrarMedicamentos/:idMedicamento', async(req, res)=>{

  let idMedicamento = req.params.idMedicamento;

  res.send(
    await borrarDatos("medicamento", idMedicamento)
  )

})

router.get('/datosMedicamento/:idMedicamento', async(req, res)=>{

  let idMedicamento = req.params.idMedicamento;

  res.send(
    await completarDatos("medicamento", idMedicamento)
  )

})

module.exports = router; 