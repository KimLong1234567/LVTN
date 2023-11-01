-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 03:42 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petshop3`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `gh_id` int(11) NOT NULL,
  `kh_id` int(11) DEFAULT NULL,
  `sp_code` varchar(50) DEFAULT NULL,
  `gh_create` datetime DEFAULT NULL,
  `gh_update` datetime DEFAULT NULL,
  `gh_sl` int(11) DEFAULT NULL,
  `status` int(3) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`gh_id`, `kh_id`, `sp_code`, `gh_create`, `gh_update`, `gh_sl`, `status`) VALUES
(13, 5, '077234026809', '2023-10-23 23:26:53', NULL, 3, 0),
(21, 5, '850004357262', '2023-10-24 09:21:04', NULL, 2, 0),
(22, 5, '852301008274', '2023-10-24 09:54:13', NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cate`
--

CREATE TABLE `cate` (
  `cate_id` int(11) NOT NULL,
  `cate_name` varchar(255) DEFAULT NULL,
  `cate_status` int(3) DEFAULT 0,
  `cate_create` datetime DEFAULT NULL,
  `cate_update` datetime DEFAULT NULL,
  `cate_img` varchar(255) DEFAULT NULL,
  `c_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cate`
--

INSERT INTO `cate` (`cate_id`, `cate_name`, `cate_status`, `cate_create`, `cate_update`, `cate_img`, `c_status`) VALUES
(7, 'Dog', 0, '2023-10-23 07:33:32', '2023-10-29 12:50:41', 'cate_img-1698558641075.jpg', 1),
(8, 'Cat', 0, '2023-10-23 07:34:33', '2023-10-23 15:22:22', 'cate_img-1698021273488.jpg', 1),
(9, 'Fish', 0, '2023-10-23 15:23:47', NULL, 'cate_img-1698049427119.jpg', 1),
(10, 'Bird ', 0, '2023-10-23 15:24:53', NULL, 'cate_img-1698049492979.jpeg', 1),
(11, 'Other', 0, '2023-10-23 15:25:37', NULL, 'cate_img-1698049537202.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `chuc_vu`
--

CREATE TABLE `chuc_vu` (
  `cv_id` int(11) NOT NULL,
  `cv_name` varchar(255) DEFAULT NULL,
  `cv_luong` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chuc_vu`
--

INSERT INTO `chuc_vu` (`cv_id`, `cv_name`, `cv_luong`) VALUES
(1, 'admin', 9000000),
(2, 'nhân viên', 6000000);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `bl_id` int(11) NOT NULL,
  `bl_content` varchar(255) DEFAULT NULL,
  `sp_id` int(11) DEFAULT NULL,
  `kh_id` int(11) DEFAULT NULL,
  `bl_create` datetime DEFAULT NULL,
  `bl_update` datetime DEFAULT NULL,
  `bl_status` int(3) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`bl_id`, `bl_content`, `sp_id`, `kh_id`, `bl_create`, `bl_update`, `bl_status`) VALUES
(4, 'Very helpful', 21, 5, '2023-10-23 18:20:45', NULL, 0),
(5, 'Good', 20, 5, '2023-10-26 16:13:00', NULL, 0),
(6, 'Rất tốt\n', 22, 5, '2023-10-26 17:44:38', NULL, 0),
(7, 'ovaggs', 21, 5, '2023-10-28 08:07:09', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ctdh`
--

CREATE TABLE `ctdh` (
  `ctdh_id` int(11) NOT NULL,
  `sp_code` varchar(50) DEFAULT NULL,
  `ctdh_sl` int(11) DEFAULT NULL,
  `ctdh_create` datetime DEFAULT NULL,
  `ctdh_update` datetime DEFAULT NULL,
  `dh_id` int(11) DEFAULT NULL,
  `ctdh_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ctdh`
--

INSERT INTO `ctdh` (`ctdh_id`, `sp_code`, `ctdh_sl`, `ctdh_create`, `ctdh_update`, `dh_id`, `ctdh_price`) VALUES
(22, '077234026809', 3, '2023-10-27 22:47:41', NULL, 13, NULL),
(23, '850004357262', 2, '2023-10-27 22:47:41', NULL, 13, NULL),
(24, '852301008274', 1, '2023-10-27 22:47:41', NULL, 13, NULL),
(25, '077234026809', 3, '2023-10-28 08:09:40', NULL, 14, NULL),
(26, '850004357262', 2, '2023-10-28 08:09:40', NULL, 14, NULL),
(27, '852301008274', 1, '2023-10-28 08:09:40', NULL, 14, NULL),
(28, '644472000627', 3, '2023-10-28 08:09:40', NULL, 14, NULL),
(29, '077234026809', 3, '2023-10-30 23:25:47', NULL, 17, NULL),
(30, '850004357262', 2, '2023-10-30 23:25:47', NULL, 17, NULL),
(31, '852301008274', 1, '2023-10-30 23:25:47', NULL, 17, NULL),
(32, '077234026809', 3, '2023-10-30 23:33:57', NULL, 18, 5),
(33, '850004357262', 3, '2023-10-30 23:33:57', NULL, 18, 28),
(34, '852301008274', 1, '2023-10-30 23:33:57', NULL, 18, 17);

-- --------------------------------------------------------

--
-- Table structure for table `ctpnhap`
--

CREATE TABLE `ctpnhap` (
  `ctpn_id` int(11) NOT NULL,
  `pn_id` int(11) DEFAULT NULL,
  `sp_code` varchar(50) DEFAULT NULL,
  `ctpn_sl` int(11) DEFAULT NULL,
  `ctpn_create` datetime DEFAULT NULL,
  `ctpn_update` datetime DEFAULT NULL,
  `ctpn_gianhap` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ctpnhap`
--

INSERT INTO `ctpnhap` (`ctpn_id`, `pn_id`, `sp_code`, `ctpn_sl`, `ctpn_create`, `ctpn_update`, `ctpn_gianhap`) VALUES
(10, 49, '077234026809', 50, '2023-10-23 18:15:34', NULL, 3),
(11, 49, '644472000627', 80, '2023-10-23 18:15:34', NULL, 46),
(12, 49, '852301008274', 50, '2023-10-23 18:15:34', NULL, 6),
(13, 50, '00050000580125', 50, '2023-10-26 17:51:46', NULL, 14),
(14, 50, '11113', 60, '2023-10-26 17:51:46', NULL, 13),
(15, 50, '048081003206', 30, '2023-10-26 17:51:46', NULL, 150),
(16, 51, '00050000580125', 50, '2023-10-28 08:14:56', NULL, 10),
(17, 51, '62064', 49, '2023-10-28 08:14:56', NULL, 35),
(18, 51, '644472000627', 50, '2023-10-28 08:14:56', NULL, 36);

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `dh_id` int(11) NOT NULL,
  `dh_pay` varchar(255) DEFAULT NULL,
  `dh_status` int(3) DEFAULT 0,
  `dh_total` double DEFAULT NULL,
  `sp_code` varchar(50) DEFAULT NULL,
  `kh_id` int(11) DEFAULT NULL,
  `nv_id` int(11) DEFAULT NULL,
  `dh_create` datetime DEFAULT NULL,
  `dh_update` datetime DEFAULT NULL,
  `dh_sl` int(11) DEFAULT NULL,
  `dh_address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`dh_id`, `dh_pay`, `dh_status`, `dh_total`, `sp_code`, `kh_id`, `nv_id`, `dh_create`, `dh_update`, `dh_sl`, `dh_address`) VALUES
(13, 'Pay when products arrive', 0, 88, NULL, 5, NULL, '2023-10-27 22:47:41', NULL, 6, 'CanTho, Vietnam'),
(14, 'Pay when products arrive', 0, 268, NULL, 5, NULL, '2023-10-28 08:09:40', NULL, 9, 'CanTho, Vietnam'),
(17, 'Pay when products arrive', 0, 88, NULL, 5, NULL, '2023-10-30 23:25:47', NULL, 6, 'CanTho, Vietnam'),
(18, 'Pay when products arrive', 0, 116, NULL, 5, NULL, '2023-10-30 23:33:57', NULL, 7, 'Bạc Liêu, Việt Nam');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `lh_id` int(11) NOT NULL,
  `lh_status` int(3) DEFAULT 0,
  `lh_name` varchar(255) DEFAULT NULL,
  `lh_email` varchar(255) DEFAULT NULL,
  `lh_sdt` varchar(255) DEFAULT NULL,
  `lh_content` varchar(255) DEFAULT NULL,
  `lh_address` varchar(255) DEFAULT NULL,
  `lh_create` datetime DEFAULT NULL,
  `lh_update` datetime DEFAULT NULL,
  `lh_img` varchar(255) DEFAULT NULL,
  `lh_ph` varchar(255) DEFAULT NULL,
  `lh_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`lh_id`, `lh_status`, `lh_name`, `lh_email`, `lh_sdt`, `lh_content`, `lh_address`, `lh_create`, `lh_update`, `lh_img`, `lh_ph`, `lh_image`) VALUES
(5, 1, 'Việt', 'kimlonglam50@gmail.com', '0516645331', 'tư vấn giúp tôi sản phẩm này', 'ARAC', '2023-10-26 17:48:01', '2023-10-26 22:30:23', 'lh_img-1698317281611.png', 'Thanks for your feedbacks', NULL),
(6, 1, 'Việt', 'kimlonglam50@gmail.com', '0516645331', 'kvagfqg', 'ARAC', '2023-10-28 08:16:44', '2023-10-28 08:16:59', 'lh_img-1698455804586.jpg', 'jvbjajjqjeq', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhan_vien`
--

CREATE TABLE `nhan_vien` (
  `nv_id` int(11) NOT NULL,
  `nv_email` varchar(255) DEFAULT NULL,
  `nv_password` varchar(255) DEFAULT NULL,
  `nv_hoten` varchar(255) DEFAULT NULL,
  `nv_avt` varchar(255) DEFAULT NULL,
  `nv_phone` varchar(255) DEFAULT NULL,
  `nv_adress` varchar(255) DEFAULT NULL,
  `nv_gt` varchar(10) DEFAULT NULL,
  `cv_id` int(11) DEFAULT NULL,
  `nv_status` tinyint(1) DEFAULT 0,
  `nv_create` datetime DEFAULT NULL,
  `nv_update` datetime DEFAULT NULL,
  `nv_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhan_vien`
--

INSERT INTO `nhan_vien` (`nv_id`, `nv_email`, `nv_password`, `nv_hoten`, `nv_avt`, `nv_phone`, `nv_adress`, `nv_gt`, `cv_id`, `nv_status`, `nv_create`, `nv_update`, `nv_date`) VALUES
(17, 'kimlonglam100@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Long (admin)', 'nv_avt-1698594100829.jpg', '0912907682', 'Cần Thơ', 'nam', 1, 0, '2023-10-23 07:27:14', '2023-10-29 22:41:40', '09/09/2000'),
(18, 'kimlonglam50@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Nhân viên 1', 'nv_avt-1698059956206.jpg', '0912306415', 'Can Thơ', 'nữ', 2, 0, '2023-10-23 18:19:16', NULL, '09/09/2003');

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `p_id` int(11) NOT NULL,
  `p_des` varchar(255) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `p_img` varchar(255) DEFAULT NULL,
  `kh_id` int(11) DEFAULT NULL,
  `p_create` datetime DEFAULT NULL,
  `p_status` int(3) DEFAULT 0,
  `p_s_detail` varchar(255) DEFAULT NULL,
  `p_s_fee` double DEFAULT NULL,
  `p_s_date` datetime DEFAULT NULL,
  `p_update` datetime DEFAULT NULL,
  `p_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`p_id`, `p_des`, `cate_id`, `p_img`, `kh_id`, `p_create`, `p_status`, `p_s_detail`, `p_s_fee`, `p_s_date`, `p_update`, `p_name`) VALUES
(1, 'chích ngừa', 8, 'p_img-1698145020385.jpg', 5, '2023-10-24 17:57:00', 0, NULL, NULL, NULL, NULL, 'Lu');

-- --------------------------------------------------------

--
-- Table structure for table `phieu_nhap`
--

CREATE TABLE `phieu_nhap` (
  `pn_id` int(11) NOT NULL,
  `pn_total` double DEFAULT NULL,
  `nv_id` int(11) DEFAULT NULL,
  `sp_code` varchar(50) DEFAULT NULL,
  `pn_create` datetime DEFAULT NULL,
  `pn_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phieu_nhap`
--

INSERT INTO `phieu_nhap` (`pn_id`, `pn_total`, `nv_id`, `sp_code`, `pn_create`, `pn_update`) VALUES
(39, 420, 17, '852301008274', '2023-10-23 15:34:15', NULL),
(40, 1440, 17, '850004357262', '2023-10-23 15:42:24', NULL),
(41, 500, 17, '00050000580125', '2023-10-23 15:52:48', NULL),
(42, 160, 17, '077234026809', '2023-10-23 16:07:06', NULL),
(43, 1715, 17, '62064', '2023-10-23 16:39:57', NULL),
(44, 600, 17, '11113', '2023-10-23 17:02:35', NULL),
(45, 800, 17, '762177450209', '2023-10-23 17:30:07', NULL),
(46, 1800, 17, '644472000627', '2023-10-23 17:32:45', NULL),
(47, 1600, 17, '4516', '2023-10-23 17:42:43', NULL),
(48, 4500, 17, '048081003206', '2023-10-23 17:48:00', NULL),
(49, 4130, 17, NULL, '2023-10-23 18:15:34', NULL),
(50, 5980, 17, NULL, '2023-10-26 17:51:46', NULL),
(51, 4015, 17, NULL, '2023-10-28 08:14:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `sp_id` int(11) NOT NULL,
  `sp_code` varchar(50) DEFAULT NULL,
  `sp_name` varchar(255) DEFAULT NULL,
  `sp_price` double DEFAULT NULL,
  `sp_image` varchar(255) DEFAULT NULL,
  `sp_describe` varchar(255) DEFAULT NULL,
  `sp_sl` int(11) DEFAULT NULL,
  `sp_xuatxu` varchar(255) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `sp_gianhap` double DEFAULT NULL,
  `sp_status` int(3) DEFAULT 0,
  `nv_id` int(11) DEFAULT NULL,
  `sp_create` datetime DEFAULT NULL,
  `sp_update` datetime DEFAULT NULL,
  `sp_note` varchar(255) DEFAULT NULL,
  `s_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`sp_id`, `sp_code`, `sp_name`, `sp_price`, `sp_image`, `sp_describe`, `sp_sl`, `sp_xuatxu`, `cate_id`, `sp_gianhap`, `sp_status`, `nv_id`, `sp_create`, `sp_update`, `sp_note`, `s_status`) VALUES
(20, '852301008274', 'Stella & Chewys Freeze-Dried Raw Lamb Heart Dog Treats', 17, 'sp_image-1698327344579.jpg', 'Only ONE ingredient and ONE source of protein. Each Lamb Heart Treat is a generous, and always tasty, piece of freeze-dried raw nutrition. Made in the USA! High-protein, high-value training treats. Perfect for dogs with food sensitivities or allergies. Co', 60, 'USA', 7, 7, 0, 17, '2023-10-23 15:34:15', '2023-10-26 20:35:44', 'Nguồn cung không ổn định', 1),
(21, '850004357262', 'Dr. Marty Shine & Luster Dog Supplements', 28, 'sp_image-1698052881012.jpg', 'Canine Seasonal Allergy Support Antioxidants to help ease signs of seasonal allergies Omega-3s to support a healthy coat and skin', 80, 'USA', 7, 18, 0, 17, '2023-10-23 15:42:24', '2023-10-23 16:21:21', 'Nguồn cung không ổn định', 1),
(22, '00050000580125', 'Fancy Feast Purely Natural Seabass and Shrimp Entree Cat Food Tray', 17, 'sp_image-1698052175229.jpg', 'A purely savory combination of natural seabass and shrimp, served in a delicate broth. Complete and balanced with vitamins and minerals. Never any by-products or fillers.', 50, 'USA', 8, 10, 0, 17, '2023-10-23 15:52:48', '2023-10-23 16:09:35', 'Nguồn cung không ổn định', 1),
(23, '077234026809', 'Ethical Pet SPOT Skinneeez Forest Creatures Cat Toys', 5, 'sp_image-1698052633204.jpg', 'Skinneeez Forest Animals Cat Toys come in one of three animals; Skunk, Squirrel, or Mouse. **Let us choose which forest creature your cat will enjoy! Stuffing free plush Skinneeez cat toys come in three realistic forest animal designs and contain catnip.', 80, 'USA', 8, 2, 0, 17, '2023-10-23 16:07:06', '2023-10-23 16:17:13', 'Nguồn cung không ổn định', 1),
(24, '62064', 'Fritz Aquatics Pro Aquatics A.C.C.R. Dry Ammonia, Chlorine and Chloramine Remover', 51, 'sp_image-1698053997350.jpg', 'FritzPro A.C.C.R. is a unique, highly-concentrated powder that completely, instantly, and safely detoxifies ammonia, chlorine, and chloramine from fresh and saltwater. FritzPro A.C.C.R is non-toxic and can be safely used in all types of fish and aquatic i', 49, 'USA', 9, 35, 0, 17, '2023-10-23 16:39:57', NULL, 'Nguồn cung không ổn định', 1),
(25, '11113', 'Fritz Aquatics Betta Water with Almond Leaf Extract', 18, 'sp_image-1698055542078.png', 'Fritz Betta Water is free of chlorine and chloramines and has been specifically formulated with the correct parameters for bettas. Fritz Betta Water contains a natural source of tannins extracted from Indian Almond Leaves to help create a more natural & h', 60, 'USA', 9, 10, 0, 17, '2023-10-23 17:02:35', '2023-10-23 17:05:42', 'Nguồn cung không ổn định', 1),
(26, '762177450209', 'Zupreem Sensible Seed Food for Small Birds', 23, 'sp_image-1698057007807.jpg', 'Sensible Seed for Small Birds is a premium blend of seeds and FruitBlend Flavor Smart Pellets to provide pet birds a sensible way to indulge in a seed mix. Suitable for Parakeets, Budgies, Parrotlets, Canaries, Finches and other small birds that prefer th', 50, 'USA', 10, 16, 0, 17, '2023-10-23 17:30:07', NULL, 'Nguồn cung không ổn định', 1),
(27, '644472000627', 'A & E Happy Beaks The Voyager Black Soft Sided Bird Carrier', 60, 'sp_image-1698057165182.jpg', 'Lightweight. zip open carrier used for travel with your pet and includes an adjustable, padded shoulder strap, roomy and well ventilated carrier with mesh windows, easy removable perch with 2 perch placement areas to customize the carrier for your birds s', 50, 'USA', 10, 36, 0, 17, '2023-10-23 17:32:45', NULL, 'Nguồn cung không ổn định', 1),
(28, '4516', 'Supreme Science Selective Complete Rat & Mouse Food', 28, 'sp_image-1698057763087.jpg', 'Supreme Pet Foods Science Selective Rat is a quality natural diet that helps sustain a healthy skin and coat while providing balanced nutrition. Rich in natural ingredients like apples, this rat diet contains no added sugars or artificial colors and is hi', 80, 'USA', 11, 20, 0, 17, '2023-10-23 17:42:43', NULL, 'Nguồn cung không ổn định', 1),
(29, '048081003206', 'Prevue Small Animal Cage with Stand', 170, 'sp_image-1698058080570.jpg', 'Prevue Pet Products Small Animal Cage 320 with Stand is ideal for a variety of small animals including rabbits and guinea pigs. Two large doors, one on the top and one on the side, allow you to easily access your precious pet. Tubular steel stand sits on ', 30, 'USA', 11, 150, 0, 17, '2023-10-23 17:48:00', NULL, 'Nguồn cung không ổn định', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_avt` varchar(255) DEFAULT NULL,
  `user_gt` varchar(10) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_create` datetime DEFAULT NULL,
  `user_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_avt`, `user_gt`, `user_password`, `user_phone`, `user_address`, `user_create`, `user_update`) VALUES
(5, 'Nao', 'test@gmail.com', 'user_avt-1698747626552.jpg', 'nữ', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0912306415', 'Can Tho', '2023-10-23 15:19:43', '2023-10-31 17:20:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`gh_id`),
  ADD KEY `kh_id` (`kh_id`),
  ADD KEY `sp_code` (`sp_code`);

--
-- Indexes for table `cate`
--
ALTER TABLE `cate`
  ADD PRIMARY KEY (`cate_id`);

--
-- Indexes for table `chuc_vu`
--
ALTER TABLE `chuc_vu`
  ADD PRIMARY KEY (`cv_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`bl_id`);

--
-- Indexes for table `ctdh`
--
ALTER TABLE `ctdh`
  ADD PRIMARY KEY (`ctdh_id`),
  ADD KEY `sp_code` (`sp_code`),
  ADD KEY `dh_id` (`dh_id`);

--
-- Indexes for table `ctpnhap`
--
ALTER TABLE `ctpnhap`
  ADD PRIMARY KEY (`ctpn_id`),
  ADD KEY `sp_code` (`sp_code`),
  ADD KEY `pn_id` (`pn_id`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`dh_id`),
  ADD KEY `sp_code` (`sp_code`),
  ADD KEY `kh_id` (`kh_id`),
  ADD KEY `nv_id` (`nv_id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`lh_id`);

--
-- Indexes for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD PRIMARY KEY (`nv_id`),
  ADD KEY `cv_id` (`cv_id`);

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `cate_id` (`cate_id`),
  ADD KEY `kh_id` (`kh_id`);

--
-- Indexes for table `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD PRIMARY KEY (`pn_id`),
  ADD KEY `sp_code` (`sp_code`),
  ADD KEY `nv_id` (`nv_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`sp_id`),
  ADD UNIQUE KEY `sp_code` (`sp_code`),
  ADD KEY `cate_id` (`cate_id`),
  ADD KEY `nv_id` (`nv_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `gh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `cate`
--
ALTER TABLE `cate`
  MODIFY `cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `chuc_vu`
--
ALTER TABLE `chuc_vu`
  MODIFY `cv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `bl_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ctdh`
--
ALTER TABLE `ctdh`
  MODIFY `ctdh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `ctpnhap`
--
ALTER TABLE `ctpnhap`
  MODIFY `ctpn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `dh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `lh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  MODIFY `nv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  MODIFY `pn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `sp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`kh_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`sp_code`) REFERENCES `products` (`sp_code`);

--
-- Constraints for table `ctdh`
--
ALTER TABLE `ctdh`
  ADD CONSTRAINT `ctdh_ibfk_1` FOREIGN KEY (`sp_code`) REFERENCES `products` (`sp_code`),
  ADD CONSTRAINT `ctdh_ibfk_2` FOREIGN KEY (`dh_id`) REFERENCES `donhang` (`dh_id`);

--
-- Constraints for table `ctpnhap`
--
ALTER TABLE `ctpnhap`
  ADD CONSTRAINT `ctpnhap_ibfk_1` FOREIGN KEY (`sp_code`) REFERENCES `products` (`sp_code`),
  ADD CONSTRAINT `ctpnhap_ibfk_2` FOREIGN KEY (`pn_id`) REFERENCES `phieu_nhap` (`pn_id`);

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`sp_code`) REFERENCES `products` (`sp_code`),
  ADD CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`kh_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `donhang_ibfk_3` FOREIGN KEY (`nv_id`) REFERENCES `nhan_vien` (`nv_id`);

--
-- Constraints for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD CONSTRAINT `nhan_vien_ibfk_1` FOREIGN KEY (`cv_id`) REFERENCES `chuc_vu` (`cv_id`);

--
-- Constraints for table `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `cate` (`cate_id`),
  ADD CONSTRAINT `pet_ibfk_2` FOREIGN KEY (`kh_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD CONSTRAINT `phieu_nhap_ibfk_1` FOREIGN KEY (`sp_code`) REFERENCES `products` (`sp_code`),
  ADD CONSTRAINT `phieu_nhap_ibfk_2` FOREIGN KEY (`nv_id`) REFERENCES `nhan_vien` (`nv_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `cate` (`cate_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`nv_id`) REFERENCES `nhan_vien` (`nv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
