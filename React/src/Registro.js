import {Fragment, useState} from 'react';

import {enviarDatos} from './funciones';

function Registro() {

  var url = "http://localhost:3000";
  var urlGuardarUsuarios = url + "/usuarios/registrarUsuario";

  const [usuarioIngresado, setUsuarioIngresado] = useState("");
  const [contrasenaIngresada, setContrasenaIngresada] = useState(""); 

  function usuario(e) {
    setUsuarioIngresado(e.target.value);
  }

  function contrasena(e) {
    setContrasenaIngresada(e.target.value);
  }

  let nuevoUsuario = {usuario: usuarioIngresado, contrasena: contrasenaIngresada, tipoDeUsuario: "Cliente"};

  async function Registrar() {

    if ((usuarioIngresado !== "") && (contrasenaIngresada !== "")) {

      await enviarDatos(urlGuardarUsuarios, nuevoUsuario);

      alert ("Usuario registrado");
      window.location.reload();

    }

    else {
      alert ("Complete todos los datos");
    }

  }

  return (

    <Fragment>

        <h2>Registro</h2>

        <div> <div className="nombreCampo">Usuario:</div><input type="text" value={usuarioIngresado} onChange={usuario} className="campo"/> </div>
        
        <div> <div className="nombreCampo">Contraseña:</div><input type="password" value={contrasenaIngresada} onChange={contrasena} className="campo"/> </div>
        
        <div> <button onClick={Registrar} className="boton">Registro</button> </div>

    </Fragment>

  );

}

export default Registro;
