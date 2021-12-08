<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = Conexion(); // CREA LA CONEXION

$nombreArchivo = $params->nombreArchivo;
$archivo = $params->base64;
$archivo = base64_decode($archivo);

$filePath =  "../assets/" . $nombreArchivo;
$filePathNuevo = "../../../assets/" . $nombreArchivo;
file_put_contents($filePath, $archivo);


$query = "INSERT INTO ropa (Nombre, Descripcion, Talla, Precio, Cantidad, Tipo, Color, Novedad, Imagen, Imagen1) VALUES('$params->Nombre', '$params->Descripcion', 'XS,S,M,L,XL,XXL', '$params->Precio', '50', '$params->Tipo', '$params->Color', '1', '$filePathNuevo', '$filePathNuevo')";


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
