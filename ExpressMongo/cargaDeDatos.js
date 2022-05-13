  var bcrypt = require('bcryptjs');

  const {insertar} = require('./api/funciones.js')

  async function datos() {

    await insertar("usuario", [
    	{usuario: "administrador", contrasena: bcrypt.hashSync('administrador'), tipoDeUsuario: "Administrador"}, 
    	{usuario: "cliente", contrasena: bcrypt.hashSync('cliente'), tipoDeUsuario: "Cliente"}
    ])

    await insertar("medicamento", [
    	{nombre: "Aspirina", descripcion: "Tableta de 10 comprimidos", precio: 100}, 
    	{nombre: "Alcohol etílico", descripcion: "Botella de 1 litro", precio: 200}, 
    	{nombre: "Jarabe para la tos", descripcion: "Frasco de 150 ml", precio: 300}
    ])

    console.log("Datos guardados")

  }

  datos();
