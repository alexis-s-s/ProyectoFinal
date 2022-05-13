import {Fragment, useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {recibirDatos, borrarDatos} from './funciones';

function OrdenesCompraCliente() {

  var url = "http://localhost:3000";
  var urlOrdenes = url + "/ordenes/filtrarOrdenesDeCompra";
  var urlBorrarOrdenesDeCompra = url + "/ordenes/borrarOrdenesDeCompra";

  const parametrosUrl = useParams();
  var idUsuario = parametrosUrl.idUsuario;

  const [ordenesDeCompraCliente, setOrdenesDeCompraCliente] = useState("");
    
  useEffect( ()=>{

    async function mostrarOrdenesDeCompraCliente() {

      let mostrar = await recibirDatos(urlOrdenes + "/" + idUsuario);
      setOrdenesDeCompraCliente(mostrar)
    
    }

    mostrarOrdenesDeCompraCliente();

  }, [urlOrdenes, idUsuario])

  async function editarOrdenDeCompra(id) {

    window.open("/EditarOrdenDeCompra/" + id);

  }

  async function borrarOrdenDeCompra(id) {

    if (window.confirm("¿Borrar?")) {

      await borrarDatos(urlBorrarOrdenesDeCompra + "/" + id);

      alert ("Orden de compra borrada");

      setOrdenesDeCompraCliente(ordenesDeCompraCliente.filter(ordenDeCompraCliente => ordenDeCompraCliente._id !== id));

    }

  }

  return (

    <Fragment>

      <h2>Ordenes de compra de cliente</h2>

      {
        ordenesDeCompraCliente && ordenesDeCompraCliente.map (ordenDeCompraCliente => 

          <p>
            <div>Id: {ordenDeCompraCliente._id}</div>
            <div>Producto: {ordenDeCompraCliente.productos}</div>
            <div>Precio: ${ordenDeCompraCliente.precio}</div>
            <div>Descuentos: ${ordenDeCompraCliente.descuentos}</div>
            <div>Total: ${ordenDeCompraCliente.total}</div>
            <button onClick={()=>editarOrdenDeCompra(ordenDeCompraCliente._id)}>Editar</button>
            <button onClick={()=>borrarOrdenDeCompra(ordenDeCompraCliente._id)}>Borrar</button>
          </p>

        )
      }

    </Fragment>

  )

}
  
export default OrdenesCompraCliente;
  