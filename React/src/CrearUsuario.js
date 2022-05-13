import {Fragment, useState} from 'react';

import {enviarDatos} from './funciones';

function CrearUsuario() {

  var url = "http://localhost:3000";
  var urlGuardarUsuarios = url + "/usuarios/registrarUsuario";

  const [usuarioIngresado, setUsuarioIngresado] = useState("");
  const [contrasenaIngresada, setContrasenaIngresada] = useState(""); 
  const [tipoDeUsuarioIngresado, setTipoDeUsuarioingresado] = useState(""); 

  function usuario(e) {
    setUsuarioIngresado(e.target.value);
  }

  function contrasena(e) {
    setContrasenaIngresada(e.target.value);
  }

  function tipoDeUsuario(e) {
    setTipoDeUsuarioingresado(e.target.value);
  }

  let nuevoUsuario = {usuario: usuarioIngresado, contrasena: contrasenaIngresada, tipoDeUsuario: tipoDeUsuarioIngresado};

  async function CrearUsuario() {

    if ((usuarioIngresado !== "") && (contrasenaIngresada !== "") && (tipoDeUsuarioIngresado !== "")) {

      await enviarDatos(urlGuardarUsuarios, nuevoUsuario);

      alert ("Usuario creado");
      window.location.reload();

    }

    else {
      alert ("Complete todos los datos");
    }

  }

  return (

    <Fragment>

        <h2>Crear usuario</h2>

        <div> <div className="nombreCampo">Usuario:</div><input type="text" value={usuarioIngresado} onChange={usuario} className="campo"/> </div>
        
        <div> <div className="nombreCampo">Contraseña:</div><input type="password" value={contrasenaIngresada} onChange={contrasena} className="campo"/> </div>
        
        <div className="nombreCampo">Tipo de usuario:</div>
        <select name="tipoDeUsuario" onChange={tipoDeUsuario} className="campo"> 
          <option value=""></option>
          <option value="Administrador">Administrador</option>
          <option value="Cliente">Cliente</option>
        </select>
        
        <div> <button onClick={CrearUsuario} className="boton">Crear usuario</button> </div>

    </Fragment>

  );

}

export default CrearUsuario;
