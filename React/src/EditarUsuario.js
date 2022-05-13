import {Fragment, useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {recibirDatos, editarDatos} from './funciones';

function EditarUsuario() {

  var url = "http://localhost:3000";
  var urlEditarUsuarios = url + "/usuarios/editarUsuario";
  var urlDatosUsuario = url + "/usuarios/datosUsuario";

  const parametrosUrl = useParams();
  var idUsuario = parametrosUrl.idUsuario;

  const [usuarioIngresado, setUsuarioIngresado] = useState("");
  const [tipoDeUsuarioIngresado, setTipoDeUsuarioIngresado] = useState(""); 
  const [contrasenaIngresada, setContrasenaIngresada] = useState("");
    
  useEffect( ()=>{

    async function mostrarDatosUsuario(){

      let mostrar = await recibirDatos(urlDatosUsuario + "/" + idUsuario);
      
      setUsuarioIngresado(mostrar.usuario)
      setTipoDeUsuarioIngresado(mostrar.tipoDeUsuario)

   }

    mostrarDatosUsuario();

  }, [urlDatosUsuario, idUsuario])

  function usuario(e) {
    setUsuarioIngresado(e.target.value);
  }

  function tipoDeUsuario(e) {
    setTipoDeUsuarioIngresado(e.target.value);
  }

   function contrasena(e) {
    setContrasenaIngresada(e.target.value);
  }

  let usuarioEditado = {usuario: usuarioIngresado, tipoDeUsuario: tipoDeUsuarioIngresado};

  async function editarUsuario() {

    if ((usuarioIngresado !== "") && (tipoDeUsuarioIngresado !== "")) {

      await editarDatos(urlEditarUsuarios + "/" + idUsuario, usuarioEditado);
      alert ("Usuario editado");
      window.opener.location.reload();

    }

    else {
      alert ("Complete todos los datos");
    }

  }

  let contrasenaEditada = {contrasena: contrasenaIngresada};

  async function editarContrasena() {

    if ((contrasenaIngresada !== "")) {

      await editarDatos(urlEditarUsuarios + "/contrasena/" + idUsuario, contrasenaEditada);
      alert ("Contraseña editada");

    }

    else {
      alert ("Complete todos los datos");
    }

  }

  return (

    <Fragment>

      <h2>Editar usuario</h2>

      <p>

        <div> <div className="nombreCampo">Usuario:</div><input type="text" value={usuarioIngresado} onChange={usuario} className="campo"/> </div>

        <div className="nombreCampo">Tipo de usuario:</div>
        <select name="tipoDeUsuario" onChange={tipoDeUsuario} className="campo" value={tipoDeUsuarioIngresado}> 
          <option value="Administrador">Administrador</option>
          <option value="Cliente">Cliente</option>
        </select>

        <div> <button onClick={editarUsuario} className="boton">Editar usuario</button> </div>

      </p>

      <p>

        <div> <div className="nombreCampo">Contraseña:</div><input type="password" value={contrasenaIngresada} onChange={contrasena} className="campo"/> </div>
        
        <div> <button onClick={editarContrasena} className="boton">Editar contraseña</button> </div>

      </p>


    </Fragment>

  );

}

export default EditarUsuario;
