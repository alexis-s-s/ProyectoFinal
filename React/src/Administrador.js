import {Fragment} from 'react';
import {Link} from 'react-router-dom';

function Administrador() {

  return (

    <Fragment>

      <h2>Administrador</h2>

      <p> <Link to="/OrdenesDeCompra">Ordenes de compra</Link> </p>
      <p> <Link to="/Usuarios">Usuarios</Link> </p>
      <p> <Link to="/Medicamentos">Medicamentos</Link> </p>
      
    </Fragment>

  )

}
  
export default Administrador;
  