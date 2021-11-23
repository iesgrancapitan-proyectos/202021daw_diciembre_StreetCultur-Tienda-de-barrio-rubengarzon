<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION


// REALIZA LA QUERY A LA DB
$resultado = mysqli_query($conexion, "SELECT * FROM ropa WHERE Id='$params->Id'");

class Result
{
}

// GENERA LOS DATOS DE RESPUESTA
$response = new Result();

$response->ropa = $resultado->fetch_all(MYSQLI_ASSOC);

while ($fila = mysqli_fetch_assoc($resultado)) {
  $response->resultado = 'OK';
}


header('Content-Type: application/json');

echo json_encode($response); // MUESTRA EL JSON GENERADO
