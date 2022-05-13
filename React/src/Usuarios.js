import {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {recibirDatos, borrarDatos} from './funciones';

function Usuarios() {

  var url = "http://localhost:3000";
  var urlMostrarUsuarios = url + "/usuarios/mostrarUsuarios";
  var urlBorrarUsuarios = url + "/usuarios/borrarUsuarios";

  const [usuarios, setUsuarios] = useState("");

  useEffect( ()=>{

    async function mostrarUsuarios(){

      let mostrar = await recibirDatos(urlMostrarUsuarios);
      setUsuarios(mostrar)
      
    }

    mostrarUsuarios();

  }, [urlMostrarUsuarios])

  async function editarUsuario(id) {

    window.open("/EditarUsuario/" + id);

  }

  async function borrarUsuario(id) {

    if (window.confirm("¿Borrar?")) {

      await borrarDatos(urlBorrarUsuarios + "/" + id);

      alert ("Usuario borrado");

      setUsuarios(usuarios.filter(usuario => usuario._id !== id));

    }

  }

  return (

    <Fragment>

      <h2>Usuarios</h2>

      {
        usuarios && usuarios.map (usuario => 

          <p>
            <div>Id: {usuario._id}</div>
            <div>Usuario: {usuario.usuario}</div>
            <div>Tipo de usuario: {usuario.tipoDeUsuario}</div>
            <button onClick={()=>editarUsuario(usuario._id)} className="boton">Editar</button>
            <button onClick={()=>borrarUsuario(usuario._id)} className="boton">Borrar</button>
          </p>

        )
      }

      <p> <Link to="/CrearUsuario">Crear usuario</Link> </p>
      
    </Fragment>

  )

}
  
export default Usuarios;
  