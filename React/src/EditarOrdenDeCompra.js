import {Fragment, useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {recibirDatos, editarDatos} from './funciones';

function EditarOrdenDeCompra() {

  var url = "http://localhost:3000";
  var urlMedicamentos = url + "/medicamentos/mostrarMedicamentos";
  var urlEditarOrdenes = url + "/ordenes/editarOrdenDeCompra";
  var urlDatosOrdenes = url + "/ordenes/datosOrdenDeCompra";

  const parametrosUrl = useParams();
  var idOrdenDeCompra = parametrosUrl.idOrdenDeCompra;

  const [medicamentos, setMedicamentos] = useState("");

  useEffect( ()=>{

    async function mostrarMedicamentos(){

      let mostrar = await recibirDatos(urlMedicamentos);
      setMedicamentos(mostrar)

    }

    mostrarMedicamentos();

  }, [urlMedicamentos])

  const [nombreProductoSeleccionado, setNombreProductoSeleccionado] = useState(""); 
  const [precioProductoSeleccionado, setPrecioProductoSeleccionado] = useState(""); 
  const [diaSeleccionado, setDiaSeleccionado] = useState(""); 
  const [edadSeleccionada, setEdadSeleccionada] = useState(""); 

  function productoElegido(nombre, precio) {
    setNombreProductoSeleccionado(nombre);
    setPrecioProductoSeleccionado(precio);
  }

  function diaDeCompra(e) {
    setDiaSeleccionado(e.target.value);
  }

  function edadCliente(e) {
    setEdadSeleccionada(e.target.value);
  }

  useEffect( ()=>{

    async function mostrarDatosOrdenDeCompra(){

      let mostrar = await recibirDatos(urlDatosOrdenes + "/" + idOrdenDeCompra);

      setNombreProductoSeleccionado(mostrar.productos)
      setPrecioProductoSeleccionado(mostrar.precio)
      setDiaSeleccionado(mostrar.dia)
      setEdadSeleccionada(mostrar.edad)

    }

    mostrarDatosOrdenDeCompra();

  }, [urlDatosOrdenes, idOrdenDeCompra])

  async function editarOrdenDeCompra() {

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

      let ordenDeCompraEditada = {productos: nombreProductoSeleccionado, precio: precioProductoSeleccionado, dia: diaSeleccionado, edad: edadSeleccionada, descuentos: descuento, total: total};

      await editarDatos(urlEditarOrdenes + "/" + idOrdenDeCompra, ordenDeCompraEditada);
      alert ("Orden de compra editada");
      window.opener.location.reload();

    }

    else {
      alert ("Complete todos los datos");
    }
    
  }

  return (

    <Fragment>

      <h2>Editar orden de compra</h2>

      <h3>Medicamentos</h3>

      {
        
        medicamentos && medicamentos.map (medicamento => 

          {

            if (medicamento.nombre === nombreProductoSeleccionado) {
              return <p className="listaMedicamentos">
                      <div> <input type="radio" name="Medicamento" checked onChange={()=>productoElegido(medicamento.nombre, medicamento.precio)}/><b>{medicamento.nombre}</b> </div>
                      <div> - {medicamento.descripcion}</div>
                      <div> - ${medicamento.precio}</div>
                     </p>;
            }

            else {
              return <p className="listaMedicamentos">
                      <div> <input type="radio" name="Medicamento" onChange={()=>productoElegido(medicamento.nombre, medicamento.precio)}/><b>{medicamento.nombre}</b> </div>
                      <div> - {medicamento.descripcion}</div>
                      <div> - ${medicamento.precio}</div>
                     </p>;
            }

          }

        )
      }

      <h3>Día de compra</h3>

      <select id="Dia" onChange={diaDeCompra} value={diaSeleccionado}>
        <option value="1">Lunes</option>
        <option value="2">Martes</option>
        <option value="3">Miércoles</option>
        <option value="4">Jueves</option>
        <option value="5">Viernes</option>
        <option value="6">Sábado</option>
        <option value="7">Domingo</option>
      </select>

      <h3>Edad</h3>

      <select name="Edad" onChange={edadCliente} value={edadSeleccionada}> 
        <option value="Nino">Niño</option>
        <option value="Adulto">Adulto</option>
        <option value="AdultoMayor">Adulto mayor</option>
      </select>

      <p><button onClick={editarOrdenDeCompra}>Editar orden de compra</button></p>



    </Fragment>
  );

}

export default EditarOrdenDeCompra;
