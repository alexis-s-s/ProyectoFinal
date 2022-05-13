import {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

import {enviarDatos} from './funciones';

function Ingresar() {

  var url = "http://localhost:3000";
  var urlComprobarUsuarios = url + "/usuarios/ingresarUsuario";

  const [usuarioIngresado, setUsuarioIngresado] = useState("");
  const [contrasenaIngresada, setContrasenaIngresada] = useState("");

  function usuario(e) {
    setUsuarioIngresado(e.target.value);
  }

  function contrasena(e) {
    setContrasenaIngresada(e.target.value);
  }

  async function comprobarIngreso() {

    if ((usuarioIngresado !== "") && (contrasenaIngresada !== "")) {

      let datosIngreso = {usuario: usuarioIngresado, contrasena: contrasenaIngresada};
      let ingresar = await enviarDatos(urlComprobarUsuarios, datosIngreso);

      let mensaje = ingresar.mensaje;
      let idUsuario = ingresar._id;
      let tipoDeUsuario = ingresar.tipoDeUsuario;

      if ((tipoDeUsuario === "Administrador") || (tipoDeUsuario === "Cliente")) {
        window.location.href = tipoDeUsuario + "/" + idUsuario;
      }

      else {
        alert (mensaje);
      }

    }

    else {
      alert ('Complete todos los datos');
    }

  }




  return (

    <Fragment>

      <h1>Farmacia</h1>

      <div> <div className="nombreCampo">Usuario:</div><input type="text" value={usuarioIngresado} onChange={usuario}  className="campo"/> </div>
      
      <div> <div className="nombreCampo">Contraseña:</div><input type="password" value={contrasenaIngresada} onChange={contrasena} className="campo"/> </div>
      
      <div> <button onClick={comprobarIngreso} className="boton">Ingresar</button> </div>
      
      <p> <Link to="/Registro">Registro</Link> </p>

    </Fragment>
  );
}

export default Ingresar;
