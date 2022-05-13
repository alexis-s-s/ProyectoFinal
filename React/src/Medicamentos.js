import {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {recibirDatos, borrarDatos} from './funciones';

function Medicamentos() {

  var url = "http://localhost:3000";
  var urlMedicamentos = url + "/medicamentos/mostrarMedicamentos";
  var urlBorrarMedicamentos = url + "/medicamentos/borrarMedicamentos";

  const [medicamentos, setMedicamentos] = useState("");
    
  useEffect( ()=>{

    async function mostrarMedicamentos(){

      let mostrar = await recibirDatos(urlMedicamentos);
      setMedicamentos(mostrar)

    }

    mostrarMedicamentos();

  }, [urlMedicamentos])

  async function editarMedicamento(id) {

    window.open("/EditarMedicamento/" + id);

  }

  async function borrarMedicamentos(id) {

    if (window.confirm("¿Borrar?")) {

      await borrarDatos(urlBorrarMedicamentos + "/" + id);

      alert ("Medicamento borrado");

      setMedicamentos(medicamentos.filter(medicamento => medicamento._id !== id));

    }

  }

  return (

    <Fragment>

      <h2>Medicamentos</h2>

      {
        medicamentos && medicamentos.map (medicamento => 

          <p>
            <div>Id: {medicamento._id}</div>
            <div>Nombre: {medicamento.nombre}</div>
            <div>Descripción: {medicamento.descripcion}</div>
            <div>Precio: ${medicamento.precio}</div>
            <button onClick={()=>editarMedicamento(medicamento._id)} className="boton">Editar</button>
            <button onClick={()=>borrarMedicamentos(medicamento._id)} className="boton">Borrar</button>
          </p>

        )
      }

      <p> <Link to="/CrearMedicamento">Crear medicamento</Link> </p>

      </Fragment>

  );
}

export default Medicamentos;
