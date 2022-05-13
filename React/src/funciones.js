async function enviarDatos(URL, Datos) {

  var datosHeaders = new Headers();
  datosHeaders.append("Accept", "application/json");
  datosHeaders.append("Content-Type", "application/json");

  var datosEnviar = {
    method: 'POST',
    headers: datosHeaders,
    redirect: 'follow',
    body: JSON.stringify(Datos)
  };

  let enviar = await fetch(URL, datosEnviar);
  let enviarJson = await enviar.json();

  return enviarJson; 
}

async function recibirDatos(URL) {

  var datosHeaders = new Headers();
  datosHeaders.append("Accept", "application/json");
  datosHeaders.append("Content-Type", "application/json");

  var datosRecibir = {
    method: 'GET',
    headers: datosHeaders,
    redirect: 'follow'
  };

  let recibir = await fetch(URL, datosRecibir);
  let recibirJson = await recibir.json();

  return recibirJson;
}

async function editarDatos(URL, Datos) {

  var datosHeaders = new Headers();
  datosHeaders.append("Accept", "application/json");
  datosHeaders.append("Content-Type", "application/json");

  var datosEditar = {
    method: 'PUT',
    headers: datosHeaders,
    redirect: 'follow',
    body: JSON.stringify(Datos)
  };

  let editar = await fetch(URL, datosEditar);
  let editarJson = await editar.json();

  return editarJson;

}

async function borrarDatos(URL) {

  var datosHeaders = new Headers();
  datosHeaders.append("Accept", "application/json");
  datosHeaders.append("Content-Type", "application/json");

  var datosBorrar = {
    method: 'DELETE',
    headers: datosHeaders,
    redirect: 'follow'
  };

  let borrar = await fetch(URL, datosBorrar);
  let borrarJson = await borrar.json();

  return borrarJson;

}

module.exports = {
  enviarDatos,
  recibirDatos,
  editarDatos,
  borrarDatos
}