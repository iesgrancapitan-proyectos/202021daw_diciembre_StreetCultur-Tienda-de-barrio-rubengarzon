<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = conexion(); // CREA LA CONEXION

$nombre = $params->nombre;
$nombreArchivo = $params->nombreArchivo;
$archivo = $params->base64textString;
$archivo = base64_decode($archivo);

$filePath = "../src/assets/" . $nombreArchivo;
file_put_contents($filePath, $archivo);

class Result
{
}

// GENERA LOS DATOS DE RESPUESTA
$response = new Result();

$response->sudaderas = $resultado->fetch_all(MYSQLI_ASSOC);

if ($resultado == true) {
  $response->resultado = "OK";
} else {
  $response->resultado = "FAIL";
}
header('Content-Type: application/json');

echo json_encode($response); // MUESTRA EL JSON GENERADO
