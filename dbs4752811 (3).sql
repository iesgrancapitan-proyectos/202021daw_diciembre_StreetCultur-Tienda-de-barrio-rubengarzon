-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2021 a las 19:24:36
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbs4752811`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carro`
--

CREATE TABLE `carro` (
  `id` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` int(20) NOT NULL,
  `idcliente` int(20) NOT NULL,
  `idpedido` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carro`
--

INSERT INTO `carro` (`id`, `nombre`, `precio`, `idcliente`, `idpedido`) VALUES
(123, 'Bear', 17, 12, NULL),
(124, 'Degraded', 15, 12, NULL),
(125, 'Smile', 10, 12, NULL),
(126, 'Heart', 16, 12, NULL),
(127, 'Heart', 16, 12, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `provincia` varchar(30) NOT NULL,
  `localidad` varchar(30) NOT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `codigopostal` int(30) DEFAULT NULL,
  `movil` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `email`, `password`, `nombre`, `apellidos`, `provincia`, `localidad`, `domicilio`, `codigopostal`, `movil`) VALUES
(12, 'prueba@gmail.com', '202cb962ac59075b964b07152d234b70', 'yyy', 'bbbb', 'Córdoba', 'Córdoba', 'ccc', 14013, 1111);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(20) NOT NULL,
  `fecha` date NOT NULL,
  `estado` set('Pendiente','Enviado','Recibido','') NOT NULL,
  `idcliente` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `fecha`, `estado`, `idcliente`) VALUES
(3, '0000-00-00', 'Pendiente', 12),
(10, '2021-11-12', 'Pendiente', 12),
(11, '2021-11-12', 'Pendiente', 12),
(12, '2021-11-12', 'Pendiente', 12),
(13, '2021-11-12', 'Pendiente', 12),
(14, '2021-11-12', 'Pendiente', 12),
(15, '2021-11-12', 'Pendiente', 12),
(16, '2021-11-12', 'Pendiente', 12),
(17, '2021-11-12', 'Pendiente', 12),
(18, '2021-11-12', 'Pendiente', 12),
(19, '2021-11-12', 'Pendiente', 12),
(20, '2021-11-12', 'Pendiente', 12),
(21, '2021-11-12', 'Pendiente', 12),
(22, '2021-11-12', 'Pendiente', 12),
(23, '2021-11-12', 'Pendiente', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ropa`
--

CREATE TABLE `ropa` (
  `Id` int(100) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Talla` varchar(10) NOT NULL,
  `Precio` decimal(50,0) NOT NULL,
  `Cantidad` int(30) NOT NULL,
  `Tipo` enum('Sudadera','Pantalon','Zapatilla','Accesorio') NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Novedad` tinyint(1) NOT NULL,
  `Imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ropa`
--

INSERT INTO `ropa` (`Id`, `Nombre`, `Descripcion`, `Talla`, `Precio`, `Cantidad`, `Tipo`, `Color`, `Novedad`, `Imagen`) VALUES
(1, 'Bear', 'Articulo Unisex. Sudadera disponible en colores amarillo y blanco tiene en el bolsillo un pequeño peluche de oso.', 'S, L, XL', '17', 10, 'Sudadera', 'Amarillo, Blanco', 1, '../../../assets/oso.jpg'),
(3, 'Smile', 'Articulo Unisex. Sudadera disponible en colores gris claro y negro tiene impreso una cara sonriente.', 'S, L, XL', '10', 12, 'Sudadera', 'aa', 1, '../../../assets/sonrisa.png'),
(4, 'Degraded', 'Articulo Unisex. Sudadera disponible en un degradado gris.', 'S, L, XL', '15', 15, 'Sudadera', 'Gris', 1, '../../../assets/degraded.png'),
(5, 'Heart', 'Articulo Unisex. Sudadera disponible en color negro, tiene un estampado de un corazón.', 'S,L,XL', '16', 15, 'Sudadera', 'Negra', 1, '../../../assets/heart.PNG'),
(6, 'Weekend', 'Articulo Unisex. Pantalón vaquero con estampado weekend.', 'S,L,XL', '20', 12, 'Pantalon', 'Azul', 1, '../../../assets/weekend.PNG'),
(7, 'aaaaa', 'aaaa', 'S,L,XL', '20', 12, 'Pantalon', 'Negra', 1, '../../../assets/weekend.PNG'),
(8, 'aaaaa', 'aaa', 'S,L,XL', '22', 12, 'Zapatilla', 'Negra', 1, ''),
(9, 'aaadasd', 'sads', 'S,L,XL', '12', 12, 'Accesorio', 'asd', 1, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carro`
--
ALTER TABLE `carro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carro-cliente` (`idcliente`),
  ADD KEY `carro-pedido` (`idpedido`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido-cliente` (`idcliente`);

--
-- Indices de la tabla `ropa`
--
ALTER TABLE `ropa`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carro`
--
ALTER TABLE `carro`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `ropa`
--
ALTER TABLE `ropa`
  MODIFY `Id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carro`
--
ALTER TABLE `carro`
  ADD CONSTRAINT `carro-cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carro-pedido` FOREIGN KEY (`idpedido`) REFERENCES `pedido` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido-cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
