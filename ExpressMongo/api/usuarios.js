const express = require('express')

const router = express.Router();

var bcrypt = require('bcryptjs');

const {insertarDatos, mostrarDatos, comprobarDatos, editarDatos, borrarDatos, completarDatos} = require('./funciones.js')

router.post('/registrarUsuario', async(req, res)=>{

  let usuario = req.body.usuario;
  let contrasena = bcrypt.hashSync(req.body.contrasena);
  let tipoDeUsuario = req.body.tipoDeUsuario;

  let registro = {usuario, contrasena, tipoDeUsuario};

  res.send(
    await insertarDatos("usuario", registro)
  )

})

router.post('/ingresarUsuario', async(req, res)=>{

  let usuario = req.body.usuario;
  let contrasena = req.body.contrasena;

  let comprobarUsuario = await comprobarDatos("usuario", {usuario});

  if (!comprobarUsuario) {

    res.send({
      mensaje: "Usuario incorrecto"
    })

  }

  else {

    let contrasenaGuardada = comprobarUsuario.contrasena;
    let comprobarContrasena = bcrypt.compareSync(contrasena, contrasenaGuardada);

    if (!comprobarContrasena) {

      res.send({
        mensaje: "Contraseña incorrecta" 
      })

    }

    else {

      res.send(
        comprobarUsuario
      )

    }
  }

})

router.get('/mostrarUsuarios', async(req, res)=>{

  res.send(
    await mostrarDatos("usuario")
  )

})

router.put('/editarUsuario/:idUsuario', async(req, res)=>{

  let idUsuario = req.params.idUsuario;

  let usuario = req.body.usuario;
  let tipoDeUsuario = req.body.tipoDeUsuario;

  let usuarioEditado = {usuario, tipoDeUsuario};


  res.send(
    await editarDatos("usuario", idUsuario, usuarioEditado)
  )

})

router.put('/editarUsuario/contrasena/:idUsuario', async(req, res)=>{

  let idUsuario = req.params.idUsuario;

  let contrasena = bcrypt.hashSync(req.body.contrasena);

  let contrasenaEditada = {contrasena};

  res.send(
    await editarDatos("usuario", idUsuario, contrasenaEditada)
  )

})

router.delete('/borrarUsuarios/:idUsuario', async(req, res)=>{

  let idUsuario = req.params.idUsuario;

  res.send(
    await borrarDatos("usuario", idUsuario)
  )

})

router.get('/datosUsuario/:idUsuario', async(req, res)=>{

  let idUsuario = req.params.idUsuario;

  res.send(
    await completarDatos("usuario", idUsuario)
  )

})

module.exports = router; 