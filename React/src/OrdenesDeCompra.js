import {Fragment, useState, useEffect} from 'react';

import {recibirDatos} from './funciones';

function OrdenesDeCompra() {    

  var url = "http://localhost:3000";
  var urlOrdenes = url + "/ordenes/mostrarOrdenesDeCompra";

  const [ordenesDeCompra, setOrdenesDeCompra] = useState("");

  useEffect( ()=>{

    async function mostrarOrdenesDeCompra(){

      let mostrar = await recibirDatos(urlOrdenes);
      setOrdenesDeCompra(mostrar)

    }

    mostrarOrdenesDeCompra();

  }, [urlOrdenes])

  return (

    <Fragment>

      <h2>Ordenes de compra</h2>

      {
        ordenesDeCompra && ordenesDeCompra.map (ordenDeCompra => 

          <p>
            <div>Cliente: {ordenDeCompra.usuarioId}</div>
            <div>Producto: {ordenDeCompra.productos}</div>
            <div>Precio: ${ordenDeCompra.precio}</div>
            <div>Descuento: ${ordenDeCompra.descuentos}</div>
            <div>Total: ${ordenDeCompra.total}</div>
          </p>

        )
       }
      
    </Fragment>

  )

}
  
export default OrdenesDeCompra;
  