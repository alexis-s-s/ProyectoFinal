import {Fragment, useState, useEffect} from 'react';

import {useParams, Link} from 'react-router-dom';

import {enviarDatos, recibirDatos} from './funciones';

function Cliente() {

  var url = "http://localhost:3000";
  var urlMedicamentos = url + "/medicamentos/mostrarMedicamentos";
  var urlGuardarOrdenes = url + "/ordenes/guardarOrdenDeCompra";

  const parametrosUrl = useParams();
  var idUsuario = parametrosUrl.idUsuario;

  const [medicamentos, setMedicamentos] = useState("");

  useEffect( ()=>{

    async function mostrarMedicamentos(){

      let mostrar = await recibirDatos(urlMedicamentos);
      setMedicamentos(mostrar)
      
    }

    mostrarMedicamentos();

  }, [urlMedicamentos])

  const [precioProductoSeleccionado, setPrecioProductoSeleccionado] = useState(""); 
  const [nombreProductoSeleccionado, setNombreProductoSeleccionado] = useState(""); 

  function productoElegido(nombre, precio) {
    setNombreProductoSeleccionado(nombre);
    setPrecioProductoSeleccionado(precio);
  }

  const [diaSeleccionado, setDiaSeleccionado] = useState(""); 

  function diaDeCompra(e) {
    setDiaSeleccionado(e.target.value);
  }

  const [edadSeleccionada, setEdadSeleccionada] = useState(""); 

  function edadCliente(e) {
    setEdadSeleccionada(e.target.value);
  }

  async function ordenDeCompra() {

    if ((precioProductoSeleccionado !== "") && (nombreProductoSeleccionado !== "") && (diaSeleccionado !== "") && (edadSeleccionada !== "")) {

      var descuentoDia;
      var descuentoEdad;

      if (diaSeleccionado <= 5) {
        descuentoDia = 20;
      }
      else {
        descuentoDia = 30;
      }

      if ((edadSeleccionada === "Nino") || (edadSeleccionada === "AdultoMayor")) {
        descuentoEdad = 50;
      }
      else {
        descuentoEdad = 0;
      }

      let descuentos = descuentoDia + descuentoEdad;

      if (descuentos > 70) {
        descuentos = 70;
      }

      let descuento = precioProductoSeleccionado * (descuentos / 100);

      let total = precioProductoSeleccionado - descuento;

      let ordenCompraCliente = {usuarioId: idUsuario, productos: nombreProductoSeleccionado, precio: precioProductoSeleccionado, dia: diaSeleccionado, edad: edadSeleccionada, descuentos: descuento, total: total};

      await enviarDatos(urlGuardarOrdenes, ordenCompraCliente);

      alert ("Compra realizada");

    }

    else {
      alert ("Complete todos los datos");
    }
  }


  return (

    <Fragment>

      <h2>Cliente</h2>

      <h3>Medicamentos a comprar</h3>

      {
        medicamentos && medicamentos.map (medicamento => 

          <p className="listaMedicamentos">
            <div> <input type="radio" name="Medicamento" onChange={()=>productoElegido(medicamento.nombre, medicamento.precio)}/><b>{medicamento.nombre}</b> </div>
            <div> - {medicamento.descripcion}</div>
            <div> - ${medicamento.precio}</div>
          </p>

       )
      }

      <h3>Día de compra</h3>

      <select onChange={diaDeCompra}>
        <option value=""></option>
        <option value="1">Lunes</option>
        <option value="2">Martes</option>
        <option value="3">Miércoles</option>
        <option value="4">Jueves</option>
        <option value="5">Viernes</option>
        <option value="6">Sábado</option>
        <option value="7">Domingo</option>
      </select>

      <h3>Edad</h3>

      <select onChange={edadCliente}> 
        <option value=""></option>
        <option value="Nino">Niño</option>
        <option value="Adulto">Adulto</option>
        <option value="AdultoMayor">Adulto mayor</option>
      </select>

      <p> <button onClick={ordenDeCompra} className="boton">Comprar</button> </p>

      <p> <Link to={"/OrdenesCompraCliente/" + idUsuario}>Ordenes de compra</Link> </p>

      <p> <Link to={"/OpcionesCuentaCliente/" + idUsuario}>Opciones de cuenta</Link> </p>

    </Fragment>

  );
}

export default Cliente;
