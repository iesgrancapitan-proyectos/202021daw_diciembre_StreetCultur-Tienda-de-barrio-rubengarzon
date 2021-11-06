<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

$contrasenaCifrada = md5($params->contrasena);

// REALIZA LA QUERY A LA DB
$resultado = mysqli_query($conexion, "SELECT * FROM cliente WHERE Email='$params->email' AND Password='$contrasenaCifrada'");

class Result
{
}

// GENERA LOS DATOS DE RESPUESTA
$response = new Result();


while ($fila = mysqli_fetch_assoc($resultado)) {
  $response->resultado = 'OK';
  $response->email = $fila['Email'];

  /* if ($fila['Perfil'] == "2") {
    $response->url = '/';
  } else {
    $response->url = '/administracion';
  } */
}

header('Content-Type: application/json');

echo json_encode($response); // MUESTRA EL JSON GENERADO
