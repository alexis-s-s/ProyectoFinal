import {Fragment, useState} from 'react';

import {useParams} from 'react-router-dom';

import {editarDatos, borrarDatos} from './funciones';

function Cliente() {

  var url = "http://localhost:3000";
  var urlEditarUsuarios = url + "/usuarios/editarUsuario"
  var urlBorrarUsuarios = url + "/usuarios/borrarUsuarios";

  const parametrosUrl = useParams();
  var idUsuario = parametrosUrl.idUsuario;

  const [contrasenaIngresada, setContrasenaIngresada] = useState("");

  function contrasena(e) {
    setContrasenaIngresada(e.target.value);
  }

  let contrasenaEditada = {contrasena: contrasenaIngresada};

  async function CambiarContrasena() {

    if ((contrasenaIngresada !== "")) {

      await editarDatos(urlEditarUsuarios + "/contrasena/" + idUsuario, contrasenaEditada);
      alert ("Contraseña editada");

    }

    else {
      alert ("Complete todos los datos");
    }

  }

  async function eliminarCuenta(id) {

    if (window.confirm("¿Borrar?")) {

      await borrarDatos(urlBorrarUsuarios + "/" + idUsuario);

      alert ("Cuenta borrada");

      window.location.href = '/';

    }

  }


  return (

    <Fragment>

      <h2>Opciones de cuenta</h2>

      <h3>Cambiar contraseña</h3>

      <div> <div className="nombreCampo">Contraseña:</div><input type="password" value={contrasenaIngresada} onChange={contrasena} className="campo"/> </div>
        
      <div> <button onClick={CambiarContrasena} className="boton">Cambiar contraseña</button> </div>

      <h3>Borrar cuenta</h3>

      <p><button onClick={eliminarCuenta}>Eliminar cuenta</button></p>

    </Fragment>
  );
}

export default Cliente;
