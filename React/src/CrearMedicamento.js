import {Fragment, useState} from 'react';

import {enviarDatos} from './funciones';

function Crearmedicamento() {

  var url = "http://localhost:3000";
  var urlGuardarMedicamentos = url + "/medicamentos/crearMedicamento";

  const [nombreIngresado, setNombreIngresado] = useState("");
  const [descripcionIngresada, setDescripcionIngresada] = useState(""); 
  const [precioIngresado, setPrecioIngresado] = useState(""); 

  function nombre(e) {
    setNombreIngresado(e.target.value);
  }

  function descripcion(e) {
    setDescripcionIngresada(e.target.value);
  }

  function precio(e) {
    setPrecioIngresado(e.target.value);
  }

  let nuevoMedicamento = {nombre: nombreIngresado, descripcion: descripcionIngresada, precio: precioIngresado};

  async function crearMedicamento() {

    if ((nombreIngresado !== "") && (descripcionIngresada !== "") && (precioIngresado !== "")) {

      if (!isNaN(precioIngresado)) {

        await enviarDatos(urlGuardarMedicamentos, nuevoMedicamento);

        alert ("Medicamento creado");
        window.location.reload();

     }

     else {
      alert ("Ingrese un precio correcto");
     }


    }

    else {
      alert ("Complete todos los datos");
    }

  }

  return (

    <Fragment>

        <h2>Crear medicamento</h2>

        <div> <div className="nombreCampo">Nombre:</div><input type="text" value={nombreIngresado} onChange={nombre} className="campo"/> </div>
        
        <div> <div className="nombreCampo">Descripción:</div><textarea value={descripcionIngresada} onChange={descripcion} className="campo"></textarea> </div>
        
        <div> <div className="nombreCampo">Precio:</div><input type="text" value={precioIngresado} onChange={precio} className="campo"/> </div>
        
        <div> <button onClick={crearMedicamento} className="boton">Crear medicamento</button> </div>

    </Fragment>

  );

}

export default Crearmedicamento;
