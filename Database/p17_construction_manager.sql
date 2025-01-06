CREATE DATABASE  IF NOT EXISTS `p17_construction_manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p17_construction_manager`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p17_construction_manager
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `FeedbackID` int NOT NULL AUTO_INCREMENT,
  `GivenBy` int DEFAULT NULL,
  `ForUser` int DEFAULT NULL,
  `Comments` text NOT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `FileAttachment` blob,
  `FeedbackType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`FeedbackID`),
  KEY `GivenBy` (`GivenBy`),
  KEY `ForUser` (`ForUser`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`GivenBy`) REFERENCES `users` (`UserID`),
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`ForUser`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (19,18,19,'Great leadership in managing the Greenfield Housing Project.','Positive',NULL,'Project Feedback'),(20,20,21,'The smart traffic lights project is running well and on schedule.','Positive',NULL,'Project Feedback'),(21,19,18,'Metro Rail Project needs improvement in pace and coordination.','Constructive',NULL,'Project Feedback');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues` (
  `IssueID` int NOT NULL AUTO_INCREMENT,
  `RaisedBy` int DEFAULT NULL,
  `TaskID` int DEFAULT NULL,
  `Description` text NOT NULL,
  `Status` varchar(50) NOT NULL,
  `ResolvedBy` int DEFAULT NULL,
  PRIMARY KEY (`IssueID`),
  KEY `RaisedBy` (`RaisedBy`),
  KEY `TaskID` (`TaskID`),
  KEY `ResolvedBy` (`ResolvedBy`),
  CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`RaisedBy`) REFERENCES `users` (`UserID`),
  CONSTRAINT `issues_ibfk_2` FOREIGN KEY (`TaskID`) REFERENCES `tasks` (`TaskID`),
  CONSTRAINT `issues_ibfk_3` FOREIGN KEY (`ResolvedBy`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
INSERT INTO `issues` VALUES (25,21,33,'Delay in cement delivery for the foundation work.','Open',NULL),(26,20,34,'Lack of skilled workers for the column construction task.','Open',NULL),(27,19,35,'Machinery malfunctioning in the track-laying operation.','Resolved',21);
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `ProgressID` int NOT NULL AUTO_INCREMENT,
  `TaskID` int DEFAULT NULL,
  `ProjectID` int DEFAULT NULL,
  `CompletedPercentage` int DEFAULT NULL,
  `UpdateDate` date DEFAULT NULL,
  `Description` text,
  `UpdatedBy` int DEFAULT NULL,
  PRIMARY KEY (`ProgressID`),
  KEY `TaskID` (`TaskID`),
  KEY `ProjectID` (`ProjectID`),
  KEY `UpdatedBy` (`UpdatedBy`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`TaskID`) REFERENCES `tasks` (`TaskID`),
  CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`ProjectID`),
  CONSTRAINT `progress_ibfk_3` FOREIGN KEY (`UpdatedBy`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (25,33,20,20,'2025-01-20','Foundation work started successfully with initial groundwork.',19),(26,34,20,0,'2025-03-20','Task yet to be started due to material delays.',19),(27,35,21,0,'2024-06-20','Track installation preparation underway, equipment arriving soon.',19),(28,36,22,100,'2023-05-15','Smart traffic lights installed and fully operational in Pune.',21);
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `managed_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK130q86aiyxo2fdp6lytxvwoxx` (`created_by`),
  KEY `FKm10onaw6up7ejiinvi49toe6j` (`managed_by`),
  CONSTRAINT `FK130q86aiyxo2fdp6lytxvwoxx` FOREIGN KEY (`created_by`) REFERENCES `users` (`UserID`),
  CONSTRAINT `FKm10onaw6up7ejiinvi49toe6j` FOREIGN KEY (`managed_by`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `ProjectID` int NOT NULL AUTO_INCREMENT,
  `ProjectName` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `StartDate` date NOT NULL,
  `DueDate` date NOT NULL,
  `ManagedBy` int DEFAULT NULL,
  `FileAttachment` blob,
  `Status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ProjectID`),
  KEY `ManagedBy` (`ManagedBy`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`ManagedBy`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (20,'Greenfield Housing Project','A residential housing project involving eco-friendly materials and sustainable designs.','2025-01-01','2026-12-31',19,NULL,NULL),(21,'Metro Rail Construction','Development of a new metro rail line in Mumbai to ease traffic congestion.','2024-06-01','2027-05-31',19,NULL,NULL),(22,'Smart City Initiative','Urban development with smart technologies like IoT-based traffic management in Pune.','2023-03-01','2025-12-31',19,NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`RoleID`),
  UNIQUE KEY `Unique_RoleName` (`RoleName`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin',''),(2,'Project Manager',''),(3,'Site Engineer',''),(4,'Client','');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `task_name` varchar(255) DEFAULT NULL,
  `assigned_by` int DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr7ydi8q6e7u0b6qmj9an9x8a` (`assigned_by`),
  KEY `FK4amgamieqvrq9ej2wy2oe6878` (`assigned_to`),
  KEY `FKk8qrwowg31kx7hp93sru1pdqa` (`project_id`),
  CONSTRAINT `FK4amgamieqvrq9ej2wy2oe6878` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`UserID`),
  CONSTRAINT `FKk8qrwowg31kx7hp93sru1pdqa` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `FKr7ydi8q6e7u0b6qmj9an9x8a` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `TaskID` int NOT NULL AUTO_INCREMENT,
  `TaskName` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `StartDate` date NOT NULL,
  `DueDate` date NOT NULL,
  `Priority` varchar(50) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `AssignedTo` int DEFAULT NULL,
  `AssignedBy` int DEFAULT NULL,
  `FileAttachment` blob,
  `ProjectID` int DEFAULT NULL,
  PRIMARY KEY (`TaskID`),
  KEY `AssignedTo` (`AssignedTo`),
  KEY `AssignedBy` (`AssignedBy`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`AssignedTo`) REFERENCES `users` (`UserID`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`AssignedBy`) REFERENCES `users` (`UserID`),
  CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`ProjectID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (33,'Foundation Work','Laying the foundation for the Greenfield Housing Project in Pune.','2025-01-10','2025-03-15','High','In Progress',20,19,NULL,20),(34,'Column Construction','Construction of concrete columns for the Greenfield Housing Project.','2025-03-16','2025-06-30','Medium','Not Started',20,19,NULL,20),(35,'Track Installation','Installation of the tracks for the metro rail project in Mumbai.','2024-06-15','2024-12-31','High','Not Started',20,19,NULL,21),(36,'Smart Traffic Lights','Installation of smart traffic management systems in Pune.','2023-04-01','2023-09-30','Medium','Completed',21,19,NULL,22);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `RoleID` int DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `fk_role` (`RoleID`),
  CONSTRAINT `fk_role` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`),
  CONSTRAINT `fk_roleid` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'Shubham Chakor','shubham@gmail.com','shubham@123',1),(19,'Sushen Gajare','sushen.gajare@gmail.com','Sushen@123',2),(20,'Abhishek Andhale','abhishek.andhale@example.com','Abhishek@123',3),(21,'Tushar Lohar','Tushar@gmail.com','tushar@123',3),(26,'ajay','ajay@gmail.com','Xyz@1245',3),(33,'Manthan Bhome','manthan@gmail.com','manthan@123',4),(34,'abc','abc@gmail.com','abc',3),(35,'shreyash','shreyash@gmail.com','12345',4);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-06 14:30:12
