<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = Conexion(); // CREA LA CONEXION

$query = "UPDATE cliente SET perfil='$params->perfil', email='$params->email', nombre = '$params->nombre',  apellidos = '$params->apellidos', provincia = '$params->provincia', localidad = '$params->localidad' , domicilio = '$params->domicilio', codigopostal = '$params->codigopostal', movil = '$params->movil' WHERE id='$params->id'";


// REALIZA LA QUERY A LA DB
$resultado = mysqli_query($conexion, $query);

class Result
{
}

// GENERA LOS DATOS DE RESPUESTA
$response = new Result();


if ($resultado == TRUE) {
  $response->resultado = 'OK';
} else {
  $response->resultado = 'FAIL';
  $response->mensaje = $resultado->error;
}

header('Content-Type: application/json');

echo json_encode($response); // MUESTRA EL JSON GENERADO
