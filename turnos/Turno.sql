-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: turnos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agenda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_espac_prof` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `dia` date NOT NULL,
  `hora` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `ocupado` tinyint(1) DEFAULT 0,
  `creador` int(11) NOT NULL,
  `habilitado` tinyint(1) DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_agenda_espac_prof1_idx` (`id_espac_prof`),
  KEY `fk_agenda_usuario1_idx` (`id_usuario`),
  KEY `fk_agenda_usuario2_idx` (`creador`),
  CONSTRAINT `fk_agenda_espac_prof1` FOREIGN KEY (`id_espac_prof`) REFERENCES `espac_prof` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_usuario2` FOREIGN KEY (`creador`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catego_espacio`
--

DROP TABLE IF EXISTS `catego_espacio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catego_espacio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_catego_espacio_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_catego_espacio_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catego_espacio`
--

LOCK TABLES `catego_espacio` WRITE;
/*!40000 ALTER TABLE `catego_espacio` DISABLE KEYS */;
INSERT INTO `catego_espacio` VALUES (2,1,'Consultorio Suite','Consultorio con baño incluído',1,'2020-07-29 19:30:55'),(3,1,'Consultorio Simple','Consultorio sin baño',0,'2020-07-29 19:40:23');
/*!40000 ALTER TABLE `catego_espacio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catego_profes`
--

DROP TABLE IF EXISTS `catego_profes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catego_profes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `habilitado` tinyint(1) DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_catego_profes_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_catego_profes_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catego_profes`
--

LOCK TABLES `catego_profes` WRITE;
/*!40000 ALTER TABLE `catego_profes` DISABLE KEYS */;
INSERT INTO `catego_profes` VALUES (1,1,'Grupo 1','Grupo de Profesionales nº 1 (Gr1)',1,'2020-07-31 00:38:22');
/*!40000 ALTER TABLE `catego_profes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espac_prof`
--

DROP TABLE IF EXISTS `espac_prof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `espac_prof` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_espacio` int(11) NOT NULL,
  `id_prof` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `dia_sem` varchar(3) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'LUN',
  `hora_desde` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `hora_hasta` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `duracion` int(11) DEFAULT 15,
  `habilitado` tinyint(1) DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_espac_prof_espacio1_idx` (`id_espacio`),
  KEY `fk_espac_prof_profesional1_idx` (`id_prof`),
  KEY `fk_espac_prof_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_espac_prof_espacio1` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_espac_prof_profesional1` FOREIGN KEY (`id_prof`) REFERENCES `profesional` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_espac_prof_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espac_prof`
--

LOCK TABLES `espac_prof` WRITE;
/*!40000 ALTER TABLE `espac_prof` DISABLE KEYS */;
INSERT INTO `espac_prof` VALUES (4,1,1,1,'VIE','10:00','12:00',15,1,'2020-08-07 00:13:10'),(7,1,1,1,'MIE','16:00','21:00',15,1,'2020-08-07 01:49:41');
/*!40000 ALTER TABLE `espac_prof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espacio`
--

DROP TABLE IF EXISTS `espacio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `espacio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_catego_espac` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cupo` tinyint(4) NOT NULL DEFAULT 1,
  `habilitado` tinyint(1) NOT NULL DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_espacio_catego_espacio_idx` (`id_catego_espac`),
  KEY `fk_espacio_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_espacio_catego_espacio` FOREIGN KEY (`id_catego_espac`) REFERENCES `catego_espacio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_espacio_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espacio`
--

LOCK TABLES `espacio` WRITE;
/*!40000 ALTER TABLE `espacio` DISABLE KEYS */;
INSERT INTO `espacio` VALUES (1,3,1,'Consultorio 1','Consultorio numero 1',1,1,'2020-07-31 23:24:29');
/*!40000 ALTER TABLE `espacio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesional`
--

DROP TABLE IF EXISTS `profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_catego_profes` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `apellido` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `correo` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `cuit` int(11) DEFAULT NULL,
  `habilitado` tinyint(1) DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_profesional_catego_profes1_idx` (`id_catego_profes`),
  KEY `fk_profesional_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_profesional_catego_profes1` FOREIGN KEY (`id_catego_profes`) REFERENCES `catego_profes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_profesional_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesional`
--

LOCK TABLES `profesional` WRITE;
/*!40000 ALTER TABLE `profesional` DISABLE KEYS */;
INSERT INTO `profesional` VALUES (1,1,1,'Sergio','Pérez','correo@correo.com',0,0,1,'2020-08-01 19:21:34');
/*!40000 ALTER TABLE `profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` int(11) NOT NULL,
  `password` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `apellido` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `domicilio` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `localidad` varchar(45) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `codpostal` varchar(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `habilitado` tinyint(1) DEFAULT 1,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,1111,'1','valeriacsaavedra@gmail.com','Vale','','','','',1,1,'2020-07-29 16:34:06'),(2,222222,'222222','correo@correo.com','Otro','','','','',0,0,'2020-08-07 01:25:07'),(3,3333333,'3333333','correoveo@correo.com','aaaaa','','','','',0,0,'2020-08-07 01:25:41'),(4,4444444,'4444444','correo1@correo.com','bbbb','','','','',0,1,'2020-08-07 01:29:54'),(5,555555,'555555','correo6@correo.com','sssss','','','','',0,1,'2020-08-07 01:35:27');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaca_feriado`
--

DROP TABLE IF EXISTS `vaca_feriado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaca_feriado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_prof` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora_desde` varchar(5) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `hora_hasta` varchar(5) CHARACTER SET big5 DEFAULT NULL,
  `habilitado` tinyint(1) DEFAULT 0,
  `ts_create` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_vaca_feriado_profesional1_idx` (`id_prof`),
  KEY `fk_vaca_feriado_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_vaca_feriado_profesional1` FOREIGN KEY (`id_prof`) REFERENCES `profesional` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vaca_feriado_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaca_feriado`
--

LOCK TABLES `vaca_feriado` WRITE;
/*!40000 ALTER TABLE `vaca_feriado` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaca_feriado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-07 19:59:08
