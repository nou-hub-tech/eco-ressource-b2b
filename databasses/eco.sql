-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 29 avr. 2026 à 19:59
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eco_ressource_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(14,2) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `co2label` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `date_label` varchar(255) DEFAULT NULL,
  `delivery_label` varchar(255) DEFAULT NULL,
  `earn_amount` decimal(14,2) DEFAULT NULL,
  `from_location` varchar(255) NOT NULL,
  `pickup_label` varchar(255) DEFAULT NULL,
  `product_label` varchar(255) NOT NULL,
  `status` enum('delivered','in_transit','pickup','pending','scheduled','transit') NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `enterprise_id` bigint(20) NOT NULL,
  `transporter_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `deliveries`
--

INSERT INTO `deliveries` (`id`, `amount`, `client_name`, `co2label`, `created_at`, `date_label`, `delivery_label`, `earn_amount`, `from_location`, `pickup_label`, `product_label`, `status`, `to_location`, `enterprise_id`, `transporter_id`) VALUES
(1, 1200.00, 'Industrie Slim', '12kg', '2026-04-09 17:40:46.000000', 'Mar 10', NULL, 190.00, 'Tunis', NULL, 'Aluminum Scrap 2T', 'delivered', 'Sfax', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `delivery_orders`
--

CREATE TABLE `delivery_orders` (
  `id_delivery` bigint(20) NOT NULL,
  `adresse_livraison` varchar(255) NOT NULL,
  `date_prevue` datetime(6) NOT NULL,
  `nom_client` varchar(100) NOT NULL,
  `statut` enum('EN_ATTENTE','EN_COURS','LIVREE') NOT NULL,
  `telephone_client` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `delivery_orders`
--

INSERT INTO `delivery_orders` (`id_delivery`, `adresse_livraison`, `date_prevue`, `nom_client`, `statut`, `telephone_client`) VALUES
(11, 'sfax', '2026-05-01 11:34:02.000000', 'slim ben ali', 'LIVREE', '55896478'),
(12, 'sfax ', '2026-04-30 11:47:16.000000', 'slim ben ali', 'LIVREE', '95275001'),
(13, 'le kef ', '2026-04-30 11:52:18.000000', 'slim ben ali', 'LIVREE', '54789632');

-- --------------------------------------------------------

--
-- Structure de la table `enterprises`
--

CREATE TABLE `enterprises` (
  `id` bigint(20) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `listings_count` int(11) NOT NULL,
  `orders_count` int(11) NOT NULL,
  `revenue` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `enterprises`
--

INSERT INTO `enterprises` (`id`, `company_name`, `created_at`, `listings_count`, `orders_count`, `revenue`, `sector`, `tax_id`, `user_id`) VALUES
(1, 'Industrie Slim SARL', '2026-04-09 17:40:46.000000', 1, 12, '14200', 'Metallurgy', 'TN123', 2),
(3, 'aaaa', '2026-04-13 14:28:42.000000', 0, 0, '0', 'Chemical Industry', '23655', 5),
(4, 'sss', '2026-04-23 09:22:54.000000', 0, 0, '0', 'Chemical Industry', '132155365', 6);

-- --------------------------------------------------------

--
-- Structure de la table `escrow`
--

CREATE TABLE `escrow` (
  `idescrow` bigint(20) NOT NULL,
  `amount` double DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `delivery_order_id` bigint(20) DEFAULT NULL,
  `id_stock` bigint(20) DEFAULT NULL,
  `linked_invoice_id` bigint(20) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `release_date` varchar(255) DEFAULT NULL,
  `status` enum('LOCKED','RELEASED','DISPUTED') DEFAULT NULL,
  `enterprise_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `escrow`
--

INSERT INTO `escrow` (`idescrow`, `amount`, `created_at`, `delivery_order_id`, `id_stock`, `linked_invoice_id`, `project`, `release_date`, `status`, `enterprise_id`) VALUES
(11, 238, '2026-04-23', NULL, NULL, 10, 'sqqsssd', '2026-04-23', 'RELEASED', NULL),
(12, 119, '2026-04-23', NULL, NULL, 11, 'skmkm', '2026-04-23', 'RELEASED', NULL),
(13, 238, '2026-04-23', NULL, NULL, 12, 'csfyy', '2026-04-23', 'RELEASED', NULL),
(14, 1000, '2026-02-10', NULL, NULL, NULL, 'dcdf', NULL, 'DISPUTED', NULL),
(15, 476, '2026-04-23', NULL, NULL, NULL, 'qqq', '2026-04-23', 'LOCKED', NULL),
(16, 142.8, '2026-04-23', NULL, NULL, 14, 'sirine', NULL, 'LOCKED', NULL),
(17, 476, '2026-04-25', NULL, NULL, 15, 'linda ', NULL, 'LOCKED', NULL),
(18, 476, '2026-04-25', NULL, NULL, 16, 'hjde', '2026-04-25', 'RELEASED', NULL),
(19, 502.18, '2026-04-25', NULL, NULL, 17, 'qqq', NULL, 'LOCKED', NULL),
(20, 833, '2026-04-25', NULL, NULL, 18, 'dsss', NULL, 'LOCKED', NULL),
(21, 476, '2026-04-25', NULL, NULL, 19, 'ddh', NULL, 'LOCKED', NULL),
(22, 476, '2026-04-25', NULL, NULL, NULL, 'ddh', NULL, 'LOCKED', 4),
(23, 476, '2026-04-25', NULL, NULL, 20, 'qqqq', NULL, 'LOCKED', NULL),
(24, 476, '2026-04-25', NULL, NULL, NULL, 'qqqq', '2026-04-25', 'RELEASED', 4),
(25, 119, '2026-04-25', NULL, NULL, 21, 'hggiu', '2026-04-25', 'RELEASED', NULL),
(26, 833, '2026-04-26', NULL, NULL, 22, 'abc', '2026-04-26', 'RELEASED', NULL),
(27, 833, '2026-04-25', NULL, NULL, NULL, 'abc', '2026-04-26', 'RELEASED', 4),
(28, 119, '2026-04-26', NULL, NULL, 23, 'qdqd', '2026-04-27', 'RELEASED', NULL),
(29, 119, '2026-04-26', NULL, NULL, NULL, 'qdqd', '2026-04-27', 'RELEASED', 4),
(30, 109, '2026-04-28', NULL, NULL, 24, 'sisi', '2026-04-28', 'RELEASED', NULL),
(31, 1071, '2026-04-28', NULL, NULL, 25, 'izzz', '2026-04-28', 'RELEASED', NULL),
(32, 1071, '2026-04-28', NULL, NULL, NULL, 'izzz', '2026-04-28', 'RELEASED', 4);

-- --------------------------------------------------------

--
-- Structure de la table `exchange_requests`
--

CREATE TABLE `exchange_requests` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `duration_label` varchar(255) NOT NULL,
  `from_avatar` varchar(255) NOT NULL,
  `from_company_name` varchar(255) NOT NULL,
  `from_date` date NOT NULL,
  `item` varchar(255) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `price` decimal(14,2) NOT NULL,
  `received_label` varchar(255) NOT NULL,
  `status` enum('pending','accepted','declined') NOT NULL,
  `to_date` date NOT NULL,
  `type_label` varchar(255) NOT NULL,
  `urgent` bit(1) NOT NULL,
  `recipient_enterprise_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `exchange_requests`
--

INSERT INTO `exchange_requests` (`id`, `created_at`, `duration_label`, `from_avatar`, `from_company_name`, `from_date`, `item`, `message`, `price`, `received_label`, `status`, `to_date`, `type_label`, `urgent`, `recipient_enterprise_id`) VALUES
(1, '2026-04-09 17:40:46.000000', '2 days', 'TM', 'Textile Mona SA', '2025-03-25', 'CNC Milling Machine', 'We need your CNC machine for a short production run.', 400.00, '10 min ago', 'pending', '2025-03-27', 'Machine Rental', b'1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `financing_request`
--

CREATE TABLE `financing_request` (
  `id` bigint(20) NOT NULL,
  `amount_approved` double DEFAULT NULL,
  `amount_requested` double DEFAULT NULL,
  `duration_months` int(11) NOT NULL,
  `interest_rate` double DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inventory_scan`
--

CREATE TABLE `inventory_scan` (
  `id` bigint(20) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `real_condition` varchar(255) DEFAULT NULL,
  `real_location` varchar(255) DEFAULT NULL,
  `real_qty` int(11) NOT NULL,
  `scanned_at` datetime(6) DEFAULT NULL,
  `id_product` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `invoice`
--

CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL,
  `amount_ht` double NOT NULL,
  `amount_ttc` double NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `delivered_at` varchar(255) DEFAULT NULL,
  `delivery_order_id` bigint(20) DEFAULT NULL,
  `id_stock` bigint(20) DEFAULT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `issue_date` varchar(255) DEFAULT NULL,
  `linked_escrow_id` bigint(20) DEFAULT NULL,
  `project` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `tva` double NOT NULL,
  `buyer_article_fiscal` varchar(50) DEFAULT NULL,
  `seller_article_fiscal` varchar(50) DEFAULT NULL,
  `seller_name` varchar(255) DEFAULT NULL,
  `invoice_type` enum('VENTE','ACHAT') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `invoice`
--

INSERT INTO `invoice` (`id`, `amount_ht`, `amount_ttc`, `client_name`, `delivered_at`, `delivery_order_id`, `id_stock`, `invoice_number`, `issue_date`, `linked_escrow_id`, `project`, `status`, `tva`, `buyer_article_fiscal`, `seller_article_fiscal`, `seller_name`, `invoice_type`) VALUES
(8, 5000, 5950, 'izzz', '2026-04-23', 70, NULL, 'INV-811989', '2026-04-13', 8, 'aaa', 'PAID', 19, NULL, NULL, NULL, NULL),
(9, 100, 119, 'aaa', '2026-04-25', 10, NULL, 'INV-188097', '2026-04-23', 9, 'qas', 'PAID', 19, '5454', '1321', 'sss', 'VENTE'),
(10, 200, 238, 'qfqsdf', '2026-04-23', 42, NULL, 'INV-787082', '2026-04-23', 11, 'sqqsssd', 'PAID', 19, '5135', '156', 'sdsdB2B', NULL),
(11, 100, 119, 'skjdihi', '2026-04-23', 45, NULL, 'INV-580178', '2026-04-23', 12, 'skmkm', 'PAID', 19, '656', '6565', 'EcoRessource B2B', NULL),
(12, 200, 238, 'scs', '2026-04-23', 70, NULL, 'INV-149452', '2026-04-23', 13, 'csfyy', 'PAID', 19, '54354', '3232', 'scB2B', NULL),
(14, 120, 142.8, 'dqlji', NULL, 80, NULL, 'INV-539598', '2025-01-23', 16, 'sirine', 'UNPAID', 19, '6564', '65565', 'EcoRessource B2B', NULL),
(15, 400, 476, 'sidhu', NULL, 546, NULL, 'INV-845745', '2026-04-25', 17, 'linda ', 'UNPAID', 19, '5545646', '566564', 'EcoRessource B2B', NULL),
(16, 400, 476, 'bkhk', '2026-04-25', 133, NULL, 'INV-448235', '2026-04-25', 18, 'hjde', 'PAID', 19, 'lkjkj', 'mmlklj', 'EcoRessource B2B', NULL),
(17, 422, 502.18, 'aaa', NULL, 70, NULL, 'INV-099695', '2025-01-01', 19, 'qqq', 'UNPAID', 19, '8951', '326', 'qsd', NULL),
(18, 700, 833, 'lmm', NULL, 78, NULL, 'INV-448247', '2026-04-25', 20, 'dsss', 'UNPAID', 19, '5684684', '4544', 'EcoRessource B2B', NULL),
(19, 400, 476, 'aaa', NULL, 80, NULL, 'INV-929420', '2026-04-25', 21, 'ddh', 'UNPAID', 19, '6465', '654564', 'EcoRessource B2B', 'VENTE'),
(20, 400, 476, 'qss', NULL, 660, NULL, 'INV-305203', '2026-04-25', 23, 'qqqq', 'UNPAID', 19, '313351', '45654', 'EcoRessource B2B', 'VENTE'),
(21, 100, 119, 'sss', '2026-04-25', 54, NULL, 'ACH-2026-001', '2026-04-25', 25, 'hggiu', 'PAID', 19, '654646', '3454', 'sss', 'ACHAT'),
(22, 700, 833, 'llm', '2026-04-26', 456, NULL, 'VTE-2026-004', '2026-04-25', 26, 'abc', 'PAID', 19, '54654', '643643', 'sss', 'VENTE'),
(23, 100, 119, 'sxsds', '2026-04-27', 5654, NULL, 'VTE-2026-005', '2026-04-26', 28, 'qdqd', 'PAID', 19, '565545', '5465464', 'sss', 'VENTE'),
(24, 100, 109, 'sss', '2026-04-28', 444, NULL, 'ACH-2026-002', '2026-04-28', 30, 'sisi', 'PAID', 9, '2365', 'TN123', 'Industrie Slim SARL', 'ACHAT'),
(25, 900, 1071, 'aaaa', '2026-04-28', 888, NULL, 'VTE-2026-006', '2026-04-28', 31, 'izzz', 'PAID', 19, '23655', '35354', 'sss', 'VENTE');

-- --------------------------------------------------------

--
-- Structure de la table `listings`
--

CREATE TABLE `listings` (
  `id` bigint(20) NOT NULL,
  `ai_insight` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `enquiries` int(11) DEFAULT NULL,
  `posted_label` varchar(255) DEFAULT NULL,
  `price` decimal(14,2) NOT NULL,
  `quantity_label` varchar(255) NOT NULL,
  `status` enum('active','pending','draft','rejected') NOT NULL,
  `title` varchar(255) NOT NULL,
  `views` int(11) DEFAULT NULL,
  `enterprise_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `listings`
--

INSERT INTO `listings` (`id`, `ai_insight`, `category`, `created_at`, `enquiries`, `posted_label`, `price`, `quantity_label`, `status`, `title`, `views`, `enterprise_id`) VALUES
(1, 'High demand — act fast', 'Metal', '2026-04-09 17:40:46.000000', 5, 'Mar 1', 1200.00, '2,000 kg', 'active', 'Aluminum Scrap 2T', 48, 1);

-- --------------------------------------------------------

--
-- Structure de la table `platform_events`
--

CREATE TABLE `platform_events` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `event_date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `participants` int(11) NOT NULL,
  `status` enum('upcoming','ongoing','done') NOT NULL,
  `title` varchar(255) NOT NULL,
  `type_label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `platform_events`
--

INSERT INTO `platform_events` (`id`, `created_at`, `event_date`, `location`, `participants`, `status`, `title`, `type_label`) VALUES
(1, '2026-04-09 17:40:46.000000', '2025-04-10', 'Tunis', 42, 'upcoming', 'B2B Industrial Fair 2025', 'Conference');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id_product` bigint(20) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `material_type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `recyclable` bit(1) NOT NULL,
  `enterprise_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `barcode`, `category`, `description`, `image`, `material_type`, `name`, `recyclable`, `enterprise_id`) VALUES
(2, '2000000000002', 'Plastic', 'csfvgbgbfgbffhnhn', '1777384096814_04adb472.png', 'Raw', 'ddcqdccs', b'0', 4),
(3, NULL, 'electronic', 'azertyuiopqsdfghjk', '1777387797238_c0b5a42c.jpg', 'metal', 'iphone', b'0', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `reclamations`
--

CREATE TABLE `reclamations` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `damaged_quantity` int(11) DEFAULT NULL,
  `damaged_unit` varchar(20) DEFAULT NULL,
  `defect_type` varchar(100) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `resolution_notes` text DEFAULT NULL,
  `resolved_at` datetime(6) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `enterprise_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `stock_item_id` bigint(20) DEFAULT NULL,
  `target_enterprise_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reclamations`
--

INSERT INTO `reclamations` (`id`, `created_at`, `damaged_quantity`, `damaged_unit`, `defect_type`, `description`, `image_url`, `resolution_notes`, `resolved_at`, `status`, `enterprise_id`, `product_id`, `stock_item_id`, `target_enterprise_id`) VALUES
(1, '2026-04-28 14:31:52.000000', 1, NULL, 'Cracked / Broken', 'Screen is cracked / broken', '1777386711685_3e42a87d.jpg', 'Defect classification: The defect claim for the \'ddcqdccs\' product, specifically the \'Cracked / Broken\' screen, has been confirmed. Given that the product is made of \'Raw Plastic\' material in a \'Good\' condition at the time of stock entry, I assess the severity as moderate to high due to the potential for further damage or leakage. Based on the 78 kg quantity in stock and unit price of 7.0 TND, the estimated financial impact is approximately 540 TND. \n\nRecommendation: I recommend that the affected stock be removed from inventory and quarantined for disposal, and an investigation be conducted to determine the root cause of the defect to prevent future occurrences.\n\nApproved by stock owner. Stock decreased by 1. New quantity: 77.', '2026-04-28 14:32:32.000000', 'TREATED', 4, 2, 2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `from_date` date NOT NULL,
  `item` varchar(255) NOT NULL,
  `price` decimal(14,2) NOT NULL,
  `status` enum('confirmed','active','pending','completed') NOT NULL,
  `to_date` date NOT NULL,
  `type_label` varchar(255) NOT NULL,
  `enterprise_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `company_name`, `created_at`, `from_date`, `item`, `price`, `status`, `to_date`, `type_label`, `enterprise_id`) VALUES
(1, 'Industrie Slim', '2026-04-09 17:40:46.000000', '2025-03-20', 'CNC Milling 3-axis', 450.00, 'confirmed', '2025-03-22', 'Machine', 1);

-- --------------------------------------------------------

--
-- Structure de la table `shipments`
--

CREATE TABLE `shipments` (
  `id` bigint(20) NOT NULL,
  `date_depart` datetime(6) NOT NULL,
  `id_transporter` bigint(20) NOT NULL,
  `produit_id` bigint(20) NOT NULL,
  `quantite` double NOT NULL,
  `statut` enum('EN_ATTENTE','EN_COURS','LIVREE') NOT NULL,
  `delivery_order_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `shipments`
--

INSERT INTO `shipments` (`id`, `date_depart`, `id_transporter`, `produit_id`, `quantite`, `statut`, `delivery_order_id`) VALUES
(9, '2026-04-29 09:40:41.000000', 1, 1, 1, 'LIVREE', 11),
(10, '2026-04-29 09:47:55.000000', 1, 1, 1, 'LIVREE', 12),
(11, '2026-04-29 09:55:18.000000', 1, 1, 1, 'LIVREE', 13);

-- --------------------------------------------------------

--
-- Structure de la table `solidarity_associations`
--

CREATE TABLE `solidarity_associations` (
  `id` bigint(20) NOT NULL,
  `ai_insight` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `donations` int(11) NOT NULL,
  `members` int(11) NOT NULL,
  `mission` varchar(2000) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status_label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `solidarity_associations`
--

INSERT INTO `solidarity_associations` (`id`, `ai_insight`, `created_at`, `donations`, `members`, `mission`, `name`, `status_label`) VALUES
(1, 'High donation success rate', '2026-04-09 17:40:46.000000', 4500, 120, 'Household waste sorting & recycling awareness', 'Recycly Tunisia', 'active');

-- --------------------------------------------------------

--
-- Structure de la table `stock_item`
--

CREATE TABLE `stock_item` (
  `id_stock` bigint(20) NOT NULL,
  `item_condition` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `unit_price` double NOT NULL,
  `enterprise_id` bigint(20) DEFAULT NULL,
  `id_product` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stock_item`
--

INSERT INTO `stock_item` (`id_stock`, `item_condition`, `deleted`, `expiration_date`, `image`, `location`, `quantity`, `status`, `unit`, `unit_price`, `enterprise_id`, `id_product`) VALUES
(1, 'Excellent', b'0', '2026-04-30', '1777383224738_b9332a90.png', 'tunis', 7, 'AVAILABLE', '8', 7, NULL, 2),
(2, 'Good', b'0', '2026-04-29', '/files/1777386303097_16223763.png', 'hujio', 77, 'available', 'kg', 7, 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `stock_items`
--

CREATE TABLE `stock_items` (
  `id` bigint(20) NOT NULL,
  `ai_insight` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `condition_label` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('listed','reserved','unlisted') NOT NULL,
  `unit` varchar(255) NOT NULL,
  `enterprise_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stock_items`
--

INSERT INTO `stock_items` (`id`, `ai_insight`, `category`, `condition_label`, `created_at`, `name`, `quantity`, `status`, `unit`, `enterprise_id`) VALUES
(1, 'Shortage in 2 weeks', 'Metal', 'Good', '2026-04-09 17:40:46.000000', 'Aluminum Scrap', 2000, 'listed', 'kg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `stock_movement`
--

CREATE TABLE `stock_movement` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `movement_date` datetime(6) DEFAULT NULL,
  `movement_type` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `id_stock` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stock_movement`
--

INSERT INTO `stock_movement` (`id`, `description`, `movement_date`, `movement_type`, `quantity`, `status`, `id_stock`) VALUES
(1, 'Stock item added', '2026-04-28 13:33:44.000000', 'IN', 7, 'ACTIVE', 1),
(2, 'Stock item updated', '2026-04-28 13:34:12.000000', 'UPDATE', 7, 'ACTIVE', 1);

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

CREATE TABLE `transaction` (
  `idtransaction` bigint(20) NOT NULL,
  `amount` double DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','COMPLETED','FAILED','LOCKED') DEFAULT NULL,
  `type` enum('PAYMENT','DISBURSEMENT','REFUND','FEE','ESCROW','LOAN') DEFAULT NULL,
  `enterprise_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transaction`
--

INSERT INTO `transaction` (`idtransaction`, `amount`, `date`, `project`, `status`, `type`, `enterprise_id`) VALUES
(1, 466.48, '2026-04-25', 'ddh', 'PENDING', 'PAYMENT', 4),
(2, 466.48, '2026-04-25', 'qqqq', 'PENDING', 'PAYMENT', 4),
(3, 116.62, '2026-04-25', 'hggiu', 'PENDING', 'DISBURSEMENT', 4),
(4, 816.34, '2026-04-25', 'abc', 'PENDING', 'PAYMENT', 4),
(5, 116.62, '2026-04-26', 'qdqd', 'PENDING', 'PAYMENT', 4),
(6, 106.82, '2026-04-28', 'sisi', 'COMPLETED', 'DISBURSEMENT', NULL),
(7, 1049.58, '2026-04-28', 'izzz', 'PENDING', 'PAYMENT', 4);

-- --------------------------------------------------------

--
-- Structure de la table `transporters`
--

CREATE TABLE `transporters` (
  `id` bigint(20) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `listings_count` int(11) NOT NULL,
  `orders_count` int(11) NOT NULL,
  `revenue` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transporters`
--

INSERT INTO `transporters` (`id`, `company_name`, `created_at`, `listings_count`, `orders_count`, `revenue`, `sector`, `tax_id`, `user_id`) VALUES
(1, 'Karim Logistics', '2026-04-09 17:40:46.000000', 0, 34, '8750', 'Transport & Logistics', 'TN456', 3);

-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS deliveries (
  id bigint(20) NOT NULL,
  amount decimal(14,2) DEFAULT NULL,
  client_name varchar(255) DEFAULT NULL,
  co2label varchar(255) DEFAULT NULL,
  created_at datetime(6) NOT NULL,
  date_label varchar(255) DEFAULT NULL,
  delivery_label varchar(255) DEFAULT NULL,
  earn_amount decimal(14,2) DEFAULT NULL,
  from_location varchar(255) NOT NULL,
  pickup_label varchar(255) DEFAULT NULL,
  product_label varchar(255) NOT NULL,
  status enum('delivered','in_transit','pickup','pending','scheduled','transit') NOT NULL,
  to_location varchar(255) NOT NULL,
  enterprise_id bigint(20) NOT NULL,
  transporter_id bigint(20) DEFAULT NULL
);
--
-- Structure de la table `transport_offers`
--

CREATE TABLE `transport_offers` (
  `id` bigint(20) NOT NULL,
  `cargo_description` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `from_location` varchar(255) NOT NULL,
  `proposed_earn` decimal(14,2) NOT NULL,
  `status` enum('open','assigned','closed') NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `weight_label` varchar(255) NOT NULL,
  `transporter_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transport_offers`
--

INSERT INTO `transport_offers` (`id`, `cargo_description`, `created_at`, `from_location`, `proposed_earn`, `status`, `to_location`, `weight_label`, `transporter_id`) VALUES
(1, 'Steel Offcuts 2T', '2026-04-09 17:40:46.000000', 'Gabès', 420.00, 'open', 'Tunis', '2,000kg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `account_status` enum('active','pending','suspended') DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_ENTERPRISE','ROLE_TRANSPORTER') NOT NULL,
  `verified` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `account_status`, `city`, `created_at`, `email`, `enabled`, `full_name`, `password`, `phone`, `role`, `verified`) VALUES
(1, 'active', 'Tunis', '2026-04-09 17:40:46.000000', 'admin@marketplace.com', b'1', 'Admin Principal', '$2a$10$eAS1dlQRAvtWwMhzjR5Ss.alA2HSHAt5PSAhe3avhUAljSa5QuOIS', '', 'ROLE_ADMIN', b'1'),
(2, 'active', 'Tunis', '2026-04-09 17:40:46.000000', 'slim@entreprise.tn', b'1', 'Slim Ben Ali', '$2a$10$p8AehhaHlbRitAKpJ5dzvO8UhtEC8c/um7.S5A2AKBiAGeIOdSbci', '+216 71 234 567', 'ROLE_ENTERPRISE', b'1'),
(3, 'active', 'Sfax', '2026-04-09 17:40:46.000000', 'karim@transport.tn', b'1', 'Karim Transport', '$2a$10$ElKoEpv9Um4OuUye.LcF9.meBedDZfaoEu/cS2CGPrAsygllYNR/u', '+216 72 345 678', 'ROLE_TRANSPORTER', b'1'),
(5, 'active', NULL, '2026-04-13 14:28:42.000000', 'izzatamri2@gmail.com', b'1', 'izzat', '$2a$10$oLe8Dr5TcgLfvPVnLETsW.O6jBHxJY7KGl3D3173dbAuvUM8CiCU2', '6654789325', 'ROLE_ENTERPRISE', b'0'),
(6, 'active', NULL, '2026-04-23 09:22:54.000000', 'sirinerhaiem03@gmail.com', b'1', 'sirine', '$2a$10$dZ.FzdPaRoaGHQJLb/l6UOqmOQZUwpoQxcNqqJpr4yiQAro8eSPb2', '+21695275001', 'ROLE_ENTERPRISE', b'0');

-- --------------------------------------------------------

--
-- Structure de la table `wallet_transactions`
--

CREATE TABLE `wallet_transactions` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(14,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `from_party` varchar(255) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `positive_flag` bit(1) DEFAULT NULL,
  `status` enum('completed','locked','pending') NOT NULL,
  `to_party` varchar(255) DEFAULT NULL,
  `type_label` varchar(255) NOT NULL,
  `value_date` date DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `wallet_transactions`
--

INSERT INTO `wallet_transactions` (`id`, `amount`, `created_at`, `from_party`, `label`, `positive_flag`, `status`, `to_party`, `type_label`, `value_date`, `user_id`) VALUES
(1, 1200.00, '2026-04-09 17:40:46.000000', NULL, 'Aluminum Scrap sale', b'1', 'completed', NULL, 'Escrow Release', '2025-03-14', 2),
(2, -54.00, '2026-04-09 17:40:46.000000', NULL, 'Platform commission', b'0', 'completed', NULL, 'Fee', '2025-03-14', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5vsv4wdyof55t0e3a26jy5xfu` (`enterprise_id`),
  ADD KEY `FKra6u1owihjkw7xh2c56v7uxir` (`transporter_id`);

--
-- Index pour la table `delivery_orders`
--
ALTER TABLE `delivery_orders`
  ADD PRIMARY KEY (`id_delivery`);

--
-- Index pour la table `enterprises`
--
ALTER TABLE `enterprises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_8d4ninni1puu1j5jg1rromp9s` (`user_id`);

--
-- Index pour la table `escrow`
--
ALTER TABLE `escrow`
  ADD PRIMARY KEY (`idescrow`);

--
-- Index pour la table `exchange_requests`
--
ALTER TABLE `exchange_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdr5godwrt0m4fh9u28buoc6ll` (`recipient_enterprise_id`);

--
-- Index pour la table `financing_request`
--
ALTER TABLE `financing_request`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `inventory_scan`
--
ALTER TABLE `inventory_scan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKriv9n1i3wlm43h4jb4d1sl9ng` (`id_product`);

--
-- Index pour la table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_t6xkdjx1qtd5whp2iljdfn2yj` (`invoice_number`);

--
-- Index pour la table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkfc9m997no0h5jv1bgd2p6gul` (`enterprise_id`);

--
-- Index pour la table `platform_events`
--
ALTER TABLE `platform_events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `FK47m71l5cmgm7ne44n04c4s3cy` (`enterprise_id`);

--
-- Index pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrw7xibfc2yy8uoak8st5f045s` (`enterprise_id`),
  ADD KEY `FKsiddydhpj69ljev69919712xs` (`product_id`),
  ADD KEY `FK63cqd9t0k9a0fstp8s5o2dhgw` (`stock_item_id`),
  ADD KEY `FKl0w1xe82pex0186ywrfpjxomd` (`target_enterprise_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnc91a1pkbaidc0ei29b4ah3md` (`enterprise_id`);

--
-- Index pour la table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlke35ceh1ob6uo4ph77ai0xy` (`delivery_order_id`);

--
-- Index pour la table `solidarity_associations`
--
ALTER TABLE `solidarity_associations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `stock_item`
--
ALTER TABLE `stock_item`
  ADD PRIMARY KEY (`id_stock`),
  ADD KEY `FK8u3uspnci2ub7tv60o2ylstmr` (`enterprise_id`),
  ADD KEY `FKftr55dgb2sl08ke2x0tpdy4ix` (`id_product`);

--
-- Index pour la table `stock_items`
--
ALTER TABLE `stock_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkoes77atih3h3lmq1xrx8jr4j` (`enterprise_id`);

--
-- Index pour la table `stock_movement`
--
ALTER TABLE `stock_movement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4riel2r90qx3uxpdw4joujqht` (`id_stock`);

--
-- Index pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`idtransaction`);

--
-- Index pour la table `transporters`
--
ALTER TABLE `transporters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_eb1bqpvlqmmb0yynjin9nxpyu` (`user_id`);

--
-- Index pour la table `transport_offers`
--
ALTER TABLE `transport_offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnhm564gunwbmxyc8rvwk8d77h` (`transporter_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Index pour la table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrtsa3qtjhd0rn4xb92na03vd` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `delivery_orders`
--
ALTER TABLE `delivery_orders`
  MODIFY `id_delivery` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `enterprises`
--
ALTER TABLE `enterprises`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `escrow`
--
ALTER TABLE `escrow`
  MODIFY `idescrow` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `exchange_requests`
--
ALTER TABLE `exchange_requests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `financing_request`
--
ALTER TABLE `financing_request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inventory_scan`
--
ALTER TABLE `inventory_scan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `platform_events`
--
ALTER TABLE `platform_events`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `reclamations`
--
ALTER TABLE `reclamations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `solidarity_associations`
--
ALTER TABLE `solidarity_associations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `stock_item`
--
ALTER TABLE `stock_item`
  MODIFY `id_stock` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `stock_items`
--
ALTER TABLE `stock_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `stock_movement`
--
ALTER TABLE `stock_movement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `idtransaction` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `transporters`
--
ALTER TABLE `transporters`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `transport_offers`
--
ALTER TABLE `transport_offers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `FK5vsv4wdyof55t0e3a26jy5xfu` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`),
  ADD CONSTRAINT `FKra6u1owihjkw7xh2c56v7uxir` FOREIGN KEY (`transporter_id`) REFERENCES `transporters` (`id`);

--
-- Contraintes pour la table `enterprises`
--
ALTER TABLE `enterprises`
  ADD CONSTRAINT `FKtegoe6oujp8lc23w368lii1i4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `exchange_requests`
--
ALTER TABLE `exchange_requests`
  ADD CONSTRAINT `FKdr5godwrt0m4fh9u28buoc6ll` FOREIGN KEY (`recipient_enterprise_id`) REFERENCES `enterprises` (`id`);

--
-- Contraintes pour la table `inventory_scan`
--
ALTER TABLE `inventory_scan`
  ADD CONSTRAINT `FKriv9n1i3wlm43h4jb4d1sl9ng` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Contraintes pour la table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `FKkfc9m997no0h5jv1bgd2p6gul` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK47m71l5cmgm7ne44n04c4s3cy` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`);

--
-- Contraintes pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD CONSTRAINT `FK63cqd9t0k9a0fstp8s5o2dhgw` FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`id_stock`),
  ADD CONSTRAINT `FKl0w1xe82pex0186ywrfpjxomd` FOREIGN KEY (`target_enterprise_id`) REFERENCES `enterprises` (`id`),
  ADD CONSTRAINT `FKrw7xibfc2yy8uoak8st5f045s` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`),
  ADD CONSTRAINT `FKsiddydhpj69ljev69919712xs` FOREIGN KEY (`product_id`) REFERENCES `product` (`id_product`);

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `FKnc91a1pkbaidc0ei29b4ah3md` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`);

--
-- Contraintes pour la table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `FKlke35ceh1ob6uo4ph77ai0xy` FOREIGN KEY (`delivery_order_id`) REFERENCES `delivery_orders` (`id_delivery`);

--
-- Contraintes pour la table `stock_item`
--
ALTER TABLE `stock_item`
  ADD CONSTRAINT `FK8u3uspnci2ub7tv60o2ylstmr` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`),
  ADD CONSTRAINT `FKftr55dgb2sl08ke2x0tpdy4ix` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Contraintes pour la table `stock_items`
--
ALTER TABLE `stock_items`
  ADD CONSTRAINT `FKkoes77atih3h3lmq1xrx8jr4j` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`);

--
-- Contraintes pour la table `stock_movement`
--
ALTER TABLE `stock_movement`
  ADD CONSTRAINT `FK4riel2r90qx3uxpdw4joujqht` FOREIGN KEY (`id_stock`) REFERENCES `stock_item` (`id_stock`);

--
-- Contraintes pour la table `transporters`
--
ALTER TABLE `transporters`
  ADD CONSTRAINT `FK43hlixrg4tj79t7r99wqjygio` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `transport_offers`
--
ALTER TABLE `transport_offers`
  ADD CONSTRAINT `FKnhm564gunwbmxyc8rvwk8d77h` FOREIGN KEY (`transporter_id`) REFERENCES `transporters` (`id`);

--
-- Contraintes pour la table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD CONSTRAINT `FKrtsa3qtjhd0rn4xb92na03vd` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
