-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2024 a las 16:14:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestorincidencias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `usuariosId` int(11) DEFAULT NULL,
  `incidenciasId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id` int(11) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` enum('pendiente','en progreso','resuelto') DEFAULT 'pendiente',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id`, `asunto`, `tipo`, `descripcion`, `imagen`, `estado`, `fecha_creacion`, `fecha_actualizacion`, `id_usuario`) VALUES
(1, 'filtracion', 'urgente', 'filtracion el piso por tuberia rota', '', 'pendiente', '2024-07-16 15:34:05', '2024-07-16 15:34:05', NULL),
(3, 'filtracion', 'urgente', 'filtracion el piso por tuberia rota', '', 'pendiente', '2024-07-16 15:46:25', '2024-07-19 21:25:24', 1),
(4, 'filtracion', 'urgente', 'filtracion el piso por tuberia rota', '', 'resuelto', '2024-07-16 15:46:42', '2024-07-19 21:25:21', 1),
(7, 'techo roto', 'urgente', 'filtracion de aguas', '', 'en progreso', '2024-07-16 16:20:25', '2024-07-16 21:26:54', 1),
(10, 'ropi la camisa hoy', 'urgente', 'frio123', 'uploads\\1721248322670-free.jpeg', 'pendiente', '2024-07-17 20:32:02', '2024-07-20 20:45:35', 2),
(12, 'Tuberia aguas negras', '', 'pruebaa dos', 'uploads\\1721252205238-LogoGit.jpg', 'en progreso', '2024-07-17 21:36:45', '2024-07-18 15:48:28', 2),
(13, 'paredes rotas', '', 'las paredas se rompieron por mi golpe', 'uploads\\1721252664222-free.jpeg', 'pendiente', '2024-07-17 21:44:24', '2024-07-17 21:44:24', 2),
(14, 'Tuberia aguas negras', '', 'Tuberia aguas negras prueba 5', 'uploads\\1721252705260-free.jpeg', 'pendiente', '2024-07-17 21:45:05', '2024-07-17 21:45:05', 2),
(15, 'Tuberia aguas negras', '', 'Tuberia aguas negras prueba 6', 'uploads\\1721252717324-free.jpeg', 'pendiente', '2024-07-17 21:45:17', '2024-07-17 21:45:17', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('residente','administrador') NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `piso` varchar(15) DEFAULT NULL,
  `apartamento` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`, `telefono`, `piso`, `apartamento`) VALUES
(1, 'frezeer2', 'frezeer@gmail.com', '$2b$10$fcl292jLKroW.c6m8z8bR.LjPtquPb.PnRrBep.FJ68nkHyuDOjxq', 'residente', '1592632', '3', '3A'),
(2, 'gaku', 'goku@gmail.com', '$2b$10$n2LfnT1lZPFZAkmirnjP0eO04W1Y8i.medqlFq1am4kA0dpoCs8.S', 'residente', '15926323', '3', '3A'),
(3, '', 'admin@gmail.com', '$2b$10$U5yx6He//0fBKNFhixwDnuWrxcFHQBF4ybiEs1dRBEV4bBi60ttfy', 'administrador', NULL, 'null', 'null');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuariosId` (`usuariosId`),
  ADD KEY `incidenciasId` (`incidenciasId`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`incidenciasId`) REFERENCES `incidencias` (`id`);

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
