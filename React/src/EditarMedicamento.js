import {Fragment, useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {recibirDatos, editarDatos} from './funciones';

function Editarmedicamento() {

  var url = "http://localhost:3000";
  var urlDatosMedicamento = url + "/medicamentos/datosMedicamento";
  var urlEditarMedicamentos = url + "/medicamentos/editarMedicamento";

  const parametrosUrl = useParams();
  var idMedicamento = parametrosUrl.idMedicamento;

  const [nombreIngresado, setNombreIngresado] = useState("");
  const [descripcionIngresada, setDescripcionIngresada] = useState(""); 
  const [precioIngresado, setPrecioIngresado] = useState(""); 

  useEffect( ()=>{

    async function mostrarDatosMedicamento(){

    let mostrar = await recibirDatos(urlDatosMedicamento + "/" + idMedicamento);
        
      setNombreIngresado(mostrar.nombre)
      setDescripcionIngresada(mostrar.descripcion)
      setPrecioIngresado(mostrar.precio)

    }

    mostrarDatosMedicamento();

  }, [urlDatosMedicamento, idMedicamento])

  function nombre(e) {
    setNombreIngresado(e.target.value);
  }

  function descripcion(e) {
    setDescripcionIngresada(e.target.value);
  }

  function precio(e) {
    setPrecioIngresado(e.target.value);
  }

  let MedicamentoEditado = {nombre: nombreIngresado, descripcion: descripcionIngresada, precio: precioIngresado};

  async function editarMedicamento() {

    if ((nombreIngresado !== "") && (descripcionIngresada !== "") && (precioIngresado !== "")) {

      if (!isNaN(precioIngresado)) {

        await editarDatos(urlEditarMedicamentos + "/" + idMedicamento, MedicamentoEditado);
        
        alert ("Medicamento editado");
        window.opener.location.reload();

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

        <h2>Editar medicamento</h2>

        <div> <div className="nombreCampo">Nombre:</div> <input type="text" value={nombreIngresado} onChange={nombre} className="campo"/> </div>
        
        <div> <div className="nombreCampo">Descripción:</div> <textarea value={descripcionIngresada} onChange={descripcion} className="campo"></textarea> </div>
        
        <div> <div className="nombreCampo">Precio:</div> <input type="text" value={precioIngresado} onChange={precio} className="campo"/> </div>

        <div> <button onClick={editarMedicamento} className="boton">Editar medicamento</button> </div>

    </Fragment>

  );

}

export default Editarmedicamento;
