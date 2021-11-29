-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2021 a las 14:44:18
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

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
  `imagen` varchar(300) NOT NULL,
  `cantidad` int(30) NOT NULL,
  `precio` int(20) NOT NULL,
  `total` int(30) NOT NULL,
  `talla` set('XS','S','M','L','XL','XXL') NOT NULL,
  `idcliente` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(100) NOT NULL,
  `perfil` set('cliente','empleado','admin','') NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `provincia` varchar(30) DEFAULT NULL,
  `localidad` varchar(30) DEFAULT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `codigopostal` int(30) DEFAULT NULL,
  `movil` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `perfil`, `email`, `password`, `nombre`, `apellidos`, `provincia`, `localidad`, `domicilio`, `codigopostal`, `movil`) VALUES
(12, '', 'prueba@gmail.com', '202cb962ac59075b964b07152d234b70', 'Laura', 'García', 'Córdoba', 'Córdoba', 'ccc', 15000, 1111),
(13, 'empleado', 'empleado@gmail.com', '202cb962ac59075b964b07152d234b70', 'Pablo', NULL, '', '', NULL, NULL, NULL),
(22, 'admin', 'admin@gmail.com', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprar_ahora`
--

CREATE TABLE `comprar_ahora` (
  `id` int(30) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `precio` int(30) NOT NULL,
  `cantidad` int(30) NOT NULL,
  `talla` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img`
--

CREATE TABLE `img` (
  `id` int(30) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `idropa` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id` int(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `motivo` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(20) NOT NULL,
  `fecha` date NOT NULL,
  `estado` set('Pendiente','Enviado','Recibido','') NOT NULL,
  `preciototal` int(30) NOT NULL,
  `fechaenvio` date DEFAULT NULL,
  `fecharecibido` date DEFAULT NULL,
  `idcliente` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `fecha`, `estado`, `preciototal`, `fechaenvio`, `fecharecibido`, `idcliente`) VALUES
(32, '2021-11-28', 'Pendiente', 21, NULL, NULL, 12),
(33, '2021-11-28', 'Pendiente', 20, NULL, NULL, 12),
(34, '2021-11-28', 'Pendiente', 20, NULL, NULL, 12),
(35, '2021-11-28', 'Pendiente', 17, NULL, NULL, 12),
(36, '2021-11-28', 'Pendiente', 22, NULL, NULL, 12),
(37, '2021-11-28', 'Pendiente', 22, NULL, NULL, 12),
(38, '2021-11-28', 'Pendiente', 16, NULL, NULL, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos`
--

CREATE TABLE `puntos` (
  `id` int(30) NOT NULL,
  `puntos` int(30) NOT NULL,
  `idcliente` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `puntos`
--

INSERT INTO `puntos` (`id`, `puntos`, `idcliente`) VALUES
(1, 24, 12),
(3, 0, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ropa`
--

CREATE TABLE `ropa` (
  `Id` int(100) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Talla` varchar(100) NOT NULL,
  `Precio` decimal(50,0) NOT NULL,
  `Cantidad` int(30) NOT NULL,
  `Tipo` enum('Sudadera','Pantalon','Chandal','Accesorio','Camiseta','Abrigo') NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Novedad` tinyint(1) NOT NULL,
  `Imagen` varchar(100) NOT NULL,
  `Imagen1` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ropa`
--

INSERT INTO `ropa` (`Id`, `Nombre`, `Descripcion`, `Talla`, `Precio`, `Cantidad`, `Tipo`, `Color`, `Novedad`, `Imagen`, `Imagen1`) VALUES
(22, 'Efforts', 'Sudadera Unisex', 'XS,S,M,L,XL,XXL', '15', 50, 'Sudadera', 'Gris', 1, '../../../assets/efforts.png', '../../../assets/efforts1.png'),
(23, 'I am very well', 'Sudadera Unisex Reflectante', 'XS,S,M,L,XL,XXL', '19', 50, 'Sudadera', 'Negra, Amarilla, Gris, Rosa, Morado', 1, '../../../assets/imverywell.png', '../../../assets/imverywell1.png'),
(24, 'AD', 'Pantalón vaquero Unisex', 'XS,S,M,L,XL,XXL', '22', 50, 'Pantalon', 'Azul', 1, '../../../assets/ad.png', '../../../assets/ad1.png'),
(25, 'Mountain', 'Abrigo unisex estampado montaña nevada', 'XS, S, L, M, XL, XXL', '45', 50, 'Abrigo', 'Estampado', 1, '../../../assets/mountain.PNG', '../../../assets/mountain1.PNG'),
(26, 'Basic', 'Basic Chandal Unisex', 'XS,S,M,L,XL,XXL', '13', 50, 'Chandal', 'Gris, Negro', 1, '../../../assets/basic.PNG', '../../../assets/basic1.PNG'),
(28, 'Flower', 'Flower Calcetines Unisex', 'XS,S,M,L,XL,XXL', '5', 50, 'Accesorio', 'Blanco,Negro,Azul,Marrón', 1, '../../../assets/flower.PNG', '../../../assets/flower1.PNG'),
(29, 'Cactus', 'Cactus Unisex', 'XS,S,M,L,XL,XXL', '16', 50, 'Camiseta', 'Blanca,Verde,Negra', 1, '../../../assets/cactus.PNG', '../../../assets/cactus1.png'),
(30, 'Planet', 'Planet Sudadera Unisex', 'XS,S,M,L,XL,XXL', '17', 50, 'Sudadera', 'Negra', 1, '../../../assets/planet.png', '../../../assets/planet1.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carro`
--
ALTER TABLE `carro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carro-cliente` (`idcliente`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- Indices de la tabla `comprar_ahora`
--
ALTER TABLE `comprar_ahora`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `img-ropa` (`idropa`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido-cliente` (`idcliente`);

--
-- Indices de la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `puntos-cliente` (`idcliente`);

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `comprar_ahora`
--
ALTER TABLE `comprar_ahora`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `img`
--
ALTER TABLE `img`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `puntos`
--
ALTER TABLE `puntos`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ropa`
--
ALTER TABLE `ropa`
  MODIFY `Id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carro`
--
ALTER TABLE `carro`
  ADD CONSTRAINT `carro-cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `img`
--
ALTER TABLE `img`
  ADD CONSTRAINT `img-ropa` FOREIGN KEY (`idropa`) REFERENCES `ropa` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido-cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD CONSTRAINT `puntos-cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
