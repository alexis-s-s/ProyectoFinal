import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Registro from './Registro';
import Ingresar from './Ingresar';
import Administrador from './Administrador';
import Cliente from './Cliente';
import Usuarios from './Usuarios';
import CrearUsuario from './CrearUsuario';
import EditarUsuario from './EditarUsuario';
import OpcionesCuentaCliente from './OpcionesCuentaCliente';
import OrdenesDeCompra from './OrdenesDeCompra';
import OrdenesCompraCliente from './OrdenesCompraCliente';
import EditarOrdenDeCompra from './EditarOrdenDeCompra';
import Medicamentos from './Medicamentos';
import CrearMedicamento from './CrearMedicamento';
import EditarMedicamento from './EditarMedicamento';
import Error from './Error';


function App() {
  
  return (

      <Router>

        <Switch>
          <Route exact path="/" component={Ingresar}/>
          <Route path="/Registro" component={Registro}/>
          <Route path="/Administrador/:idUsuario" component={Administrador}/>
          <Route path="/Cliente/:idUsuario" component={Cliente}/>
          <Route path="/Usuarios" component={Usuarios}/>
          <Route path="/CrearUsuario" component={CrearUsuario}/>
          <Route path="/EditarUsuario/:idUsuario" component={EditarUsuario}/>
          <Route path="/OpcionesCuentaCliente/:idUsuario" component={OpcionesCuentaCliente}/>
          <Route path="/OrdenesDeCompra" component={OrdenesDeCompra}/>
          <Route path="/OrdenesCompraCliente/:idUsuario" component={OrdenesCompraCliente}/>
          <Route path="/EditarOrdenDeCompra/:idOrdenDeCompra" component={EditarOrdenDeCompra}/>
          <Route path="/Medicamentos" component={Medicamentos}/>
          <Route path="/CrearMedicamento" component={CrearMedicamento}/>
          <Route path="/EditarMedicamento/:idMedicamento" component={EditarMedicamento}/>
          <Route path="*" component={Error}/>
        </Switch>

      </Router>

  );
}

export default App;
