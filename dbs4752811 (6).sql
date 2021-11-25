-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2021 a las 13:04:22
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
  `imagen` varchar(300) NOT NULL,
  `cantidad` int(30) NOT NULL,
  `precio` int(20) NOT NULL,
  `total` int(30) NOT NULL,
  `talla` set('XS','S','M','L','XL','XXL') NOT NULL,
  `idcliente` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carro`
--

INSERT INTO `carro` (`id`, `nombre`, `imagen`, `cantidad`, `precio`, `total`, `talla`, `idcliente`) VALUES
(160, 'Degraded', '../../../assets/degraded.png', 3, 15, 45, 'XL', 12);

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
(12, 'cliente', 'prueba@gmail.com', '202cb962ac59075b964b07152d234b70', 'Laura', 'García', 'Córdoba', 'Córdoba', 'ccc', 15000, 1111),
(13, 'empleado', 'empleado@gmail.com', '202cb962ac59075b964b07152d234b70', 'Pablo', NULL, '', '', NULL, NULL, NULL),
(22, 'admin', 'admin@gmail.com', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(27, '2021-11-19', 'Pendiente', 27, NULL, NULL, 12),
(28, '2021-11-19', 'Recibido', 30, NULL, NULL, 12),
(29, '2021-11-19', 'Pendiente', 30, NULL, NULL, 12);

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
(1, 10, 12),
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
  `Tipo` enum('Sudadera','Pantalon','Zapatilla','Accesorio') NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Novedad` tinyint(1) NOT NULL,
  `Imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ropa`
--

INSERT INTO `ropa` (`Id`, `Nombre`, `Descripcion`, `Talla`, `Precio`, `Cantidad`, `Tipo`, `Color`, `Novedad`, `Imagen`) VALUES
(11, 'sss', 'bbb', 'S', '13', 12, 'Sudadera', 'Amarillo, Blanco', 1, '../../../assets/oso.jpg'),
(16, 'ffff', 'aaa', 'XS,S,M,L', '20', 15, 'Sudadera', 'Negra', 1, ''),
(17, 'fff', 'rrr', 'XS,S,M,L,XL,XXL', '20', 12, 'Sudadera', 'Negra', 1, ''),
(18, 'ttt', 'ttttt', 'XS,S,L,M', '22', 15, 'Accesorio', 'Negra', 1, ''),
(19, 'www', 'dgsfsdf', 'L', '12', 15, 'Pantalon', 'Negro', 1, ''),
(20, 'pqpqpq', 'bb', 'M', '2', 2, 'Sudadera', 'azul', 1, ''),
(21, 'tttt', 'tttt', 'M', '2', 2, 'Pantalon', 'Negro', 1, '');

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `puntos`
--
ALTER TABLE `puntos`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ropa`
--
ALTER TABLE `ropa`
  MODIFY `Id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
