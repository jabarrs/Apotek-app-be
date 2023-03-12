-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2023 at 09:32 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_apotek`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian`
--

CREATE TABLE `detail_pembelian` (
  `ID` int(11) NOT NULL,
  `ID_pembelian` int(11) NOT NULL,
  `ID_obat` int(11) NOT NULL,
  `jumlah_satuan_obat` int(255) NOT NULL,
  `subtotal` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_pembelian`
--

INSERT INTO `detail_pembelian` (`ID`, `ID_pembelian`, `ID_obat`, `jumlah_satuan_obat`, `subtotal`) VALUES
(1, 1, 2, 2, 24000),
(2, 1, 1, 3, 24000),
(3, 1, 1, 3, 24000),
(4, 2, 1, 5, 25000),
(5, 2, 2, 3, 24000),
(6, 2, 1, 1, 5000),
(7, 3, 2, 1, 8000),
(8, 2, 1, 5, 25000),
(9, 2, 2, 3, 24000),
(10, 2, 1, 5, 25000),
(11, 2, 2, 2, 16000),
(12, 4, 1, 5, 25000),
(13, 4, 2, 2, 16000),
(14, 4, 1, 5, 25000),
(15, 4, 2, 2, 16000),
(16, 4, 1, 5, 25000),
(17, 4, 2, 2, 16000),
(18, 4, 1, 5, 25000),
(19, 4, 2, 2, 16000),
(20, 4, 1, 5, 25000),
(21, 5, 1, 3, 15000),
(22, 5, 2, 2, 16000);

--
-- Triggers `detail_pembelian`
--
DELIMITER $$
CREATE TRIGGER `update_pembelian_insert` AFTER INSERT ON `detail_pembelian` FOR EACH ROW BEGIN
    UPDATE pembelian
    JOIN detail_pembelian ON pembelian.id = detail_pembelian.ID_pembelian
    SET total = total + NEW.subtotal
    WHERE pembelian.ID = NEW.ID_pembelian;
    UPDATE medicene
    SET Stock = Stock + NEW.jumlah_satuan_obat
    WHERE medicene.idMedicene = NEW.ID_obat;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `ID` int(11) NOT NULL,
  `ID_penjualan` int(11) NOT NULL,
  `ID_obat` int(11) NOT NULL,
  `jumlah_satuan_obat` int(11) NOT NULL,
  `Subtotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`ID`, `ID_penjualan`, `ID_obat`, `jumlah_satuan_obat`, `Subtotal`) VALUES
(1, 1, 2, 4, 48000),
(2, 2, 2, 1, 12000),
(3, 2, 1, 16, 128000),
(4, 3, 1, 3, 24000),
(5, 3, 2, 2, 24000),
(6, 4, 1, 3, 24000),
(7, 4, 2, 2, 24000),
(8, 5, 1, 3, 24000),
(9, 5, 2, 2, 24000);

--
-- Triggers `detail_penjualan`
--
DELIMITER $$
CREATE TRIGGER `update_penjualan_insert` AFTER INSERT ON `detail_penjualan` FOR EACH ROW BEGIN
    UPDATE penjualan
    JOIN detail_penjualan ON penjualan.id = detail_penjualan.ID_penjualan
    SET total = total + NEW.subtotal
    WHERE NEW.ID_penjualan = penjualan.ID;
    UPDATE medicene
    SET Stock = Stock - NEW.jumlah_satuan_obat
    WHERE medicene.idMedicene = NEW.ID_obat;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `nameCategory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `nameCategory`) VALUES
(1, 'Obat Mual'),
(2, 'Obat Narkotika'),
(3, 'Obat Pusing'),
(5, 'obat bebas terbatas');

-- --------------------------------------------------------

--
-- Table structure for table `medicene`
--

CREATE TABLE `medicene` (
  `idMedicene` int(11) NOT NULL,
  `namaObat` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `unitId` int(11) NOT NULL,
  `tglKadeluarsa` date NOT NULL,
  `hargaJual` int(11) NOT NULL,
  `hargaBeli` int(11) NOT NULL,
  `supplierId` int(11) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `storageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicene`
--

INSERT INTO `medicene` (`idMedicene`, `namaObat`, `categoryId`, `stock`, `unitId`, `tglKadeluarsa`, `hargaJual`, `hargaBeli`, `supplierId`, `keterangan`, `storageId`) VALUES
(1, 'Panadol', 2, 1031, 4, '2022-12-28', 8000, 5000, 2, 'obat flu generik', 2),
(2, 'Paracetamol', 1, 121, 2, '2022-12-29', 12000, 8000, 3, 'Obat demam', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pembelian`
--

CREATE TABLE `pembelian` (
  `ID` int(11) NOT NULL,
  `total` int(255) NOT NULL,
  `tgl_transaksi` date NOT NULL,
  `ID_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pembelian`
--

INSERT INTO `pembelian` (`ID`, `total`, `tgl_transaksi`, `ID_users`) VALUES
(1, 72000, '2022-12-17', 4),
(2, 144000, '2022-11-19', 2),
(3, 8000, '2022-11-19', 2),
(4, 189000, '2022-12-17', 3),
(5, 31000, '2022-11-20', 1),
(6, 0, '2022-11-20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `penjualan`
--

CREATE TABLE `penjualan` (
  `ID` int(11) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `total` int(11) NOT NULL,
  `tgl_transaksi` date NOT NULL,
  `ID_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualan`
--

INSERT INTO `penjualan` (`ID`, `customer`, `total`, `tgl_transaksi`, `ID_users`) VALUES
(1, 'Agus', 48000, '2022-12-17', 4),
(2, 'Jabar', 140000, '2022-11-05', 4),
(3, 'Heru', 48000, '2022-11-20', 1),
(4, 'Rizky', 48000, '2022-11-20', 1),
(5, 'Bram', 48000, '2022-11-20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `penyimpanan`
--

CREATE TABLE `penyimpanan` (
  `ID` int(11) NOT NULL,
  `Nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penyimpanan`
--

INSERT INTO `penyimpanan` (`ID`, `Nama`) VALUES
(1, 'Lemari A-1'),
(2, 'Lemari A-2'),
(3, 'Lemari A-3'),
(9, 'gudang');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `nik` char(16) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `blood_type` enum('A','B','AB','O') NOT NULL,
  `photo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `nik`, `full_name`, `gender`, `blood_type`, `photo`, `url`, `userId`, `createdAt`, `updatedAt`) VALUES
(39, '1234567891234567', 'Jabar', 'male', 'O', 'f45e6beb0ace7e818d9c5b3ac5ef4498.webp', 'http://localhost:5000/Images/f45e6beb0ace7e818d9c5b3ac5ef4498.webp', 1, '2023-01-28 18:55:37', '2023-01-28 18:56:06');

-- --------------------------------------------------------

--
-- Table structure for table `reset_password`
--

CREATE TABLE `reset_password` (
  `reset_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reset_password`
--

INSERT INTO `reset_password` (`reset_id`, `user_id`, `token`) VALUES
('06f1a0e6-c0fe-45c1-9b63-b1af389224ea', '8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0YnJhbTA4MDdAZ21haWwuY29tIiwiaWF0IjoxNjc0MjEyMjQyLCJleHAiOjE2NzQyMTU4NDJ9.Ze_KIPSItUUX8OA7cmi1S6r_VqIDhLdoVrtEJcdDo_k');

-- --------------------------------------------------------

--
-- Table structure for table `satuan_obat`
--

CREATE TABLE `satuan_obat` (
  `ID` int(11) NOT NULL,
  `Nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `satuan_obat`
--

INSERT INTO `satuan_obat` (`ID`, `Nama`) VALUES
(1, 'butir'),
(2, 'botol'),
(3, 'tablet'),
(4, 'strip');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `ID` int(11) NOT NULL,
  `Nama` varchar(255) NOT NULL,
  `Alamat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`ID`, `Nama`, `Alamat`) VALUES
(1, 'PT. Glaxo Wellcome Indonesia', 'Jalan Merbabu'),
(2, 'Cendo Indonesia', 'Jalan Merapi'),
(3, 'PT. Kimia Farma', 'Jalan Semeru');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'jabar', 'jabar@gmail.com', '$2b$10$qKCVJixzIZr.grvz3pdZreboU3icTL/VaYEn69RBIjC82./5TS56a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJqYWJhciIsImVtYWlsIjoiamFiYXJAZ21haWwuY29tIiwiaWF0IjoxNjc0OTMwNDAzLCJleHAiOjE2NzUwMTY4MDN9.uMWTLkH8julBSTYa7tvFk58gstIgLALV9bccyk3yt38', '2023-01-27 09:30:20', '2023-01-28 18:26:43'),
(2, 'bram', 'bram@gmail.com', '$2b$10$oA0qvl.lIZivsrqUXaHpcu18H/WY67vT0n0afrCUh6cjoqZPY3vVW', '', '2023-01-28 16:50:23', '2023-01-28 16:50:23');

-- --------------------------------------------------------

--
-- Table structure for table `users2`
--

CREATE TABLE `users2` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `NIP` int(11) NOT NULL,
  `Passwords` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `is_verified` smallint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users2`
--

INSERT INTO `users2` (`ID`, `Name`, `Email`, `NIP`, `Passwords`, `Role`, `is_verified`) VALUES
(1, 'Bram', 'bram@gmail.com', 32312312, '$2a$10$GUtS/ma5rVKlfLfzRL4WKem.euzUDmXMCbKfB9K7YnLEviBCMtKdG', 'user', 0),
(2, 'Rizky', 'rizky@gmail.com', 22312312, '$2a$10$.PAjlBbamouJkwK0pDoqD.rEuzIhOT0XDHf1CLQnUhXnU38ujnhQu', 'admin', 0),
(3, 'Zaki', 'zaki@gmail.com', 12312312, '$2a$10$LR/bdjzQIFxTQmE/9uTDruWEUftMZrJe.n.xA5w.QpzcRHBvvFkya', 'superuser', 0),
(4, 'Agus', 'agus@mail.com', 21234123, '$2a$10$dgZsR9nX.SfrKgSUhGDk/OElhmetNa6vu2I.XydqIuEKqQrIg0Vnu', 'admin', 0),
(5, 'Jabar', 'jabar@mail.com', 31234123, '$2a$10$tWJme3gzajbwPlnDQpPU1.h4dpiTy1Q3EcS54/pmIaI7eLL9x2dCS', 'user', 0),
(6, 'Heru', 'heru@gmail.com', 22212312, '$2a$10$JyECawNexhRaWPTp0djUkOHh8rClQ22pAufxMpGiNdAxNc48YlDNC', 'admin', 0),
(7, 'Fahmi', 'fahmi@gmail.com', 22478920, '$2a$10$pi612/.bogCvmaCjCmIQ5uAlAx5A0CUiHMqdoLqR8Ro4CFs.45oW.', 'admin', 0),
(8, 'Bram T', 'tbram0807@gmail.com', 2147483647, '$2a$10$CZJ3QaF4KggPUyibxqJUQuM.5D5MxVezt3XAexbN0csU9YVRauvqe', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_verification`
--

CREATE TABLE `users_verification` (
  `verification_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230312031516-create-user.js'),
('20230312031619-create-role.js'),
('20230312031821-create-status.js');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_pembelian` (`ID_pembelian`),
  ADD KEY `ID_obat` (`ID_obat`);

--
-- Indexes for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_penjualan` (`ID_penjualan`),
  ADD KEY `ID_obat` (`ID_obat`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `medicene`
--
ALTER TABLE `medicene`
  ADD PRIMARY KEY (`idMedicene`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `unitId` (`unitId`),
  ADD KEY `supplierId` (`storageId`),
  ADD KEY `storageId` (`storageId`);

--
-- Indexes for table `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_users` (`ID_users`);

--
-- Indexes for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_users` (`ID_users`);

--
-- Indexes for table `penyimpanan`
--
ALTER TABLE `penyimpanan`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_ibfk_1` (`userId`);

--
-- Indexes for table `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`reset_id`);

--
-- Indexes for table `satuan_obat`
--
ALTER TABLE `satuan_obat`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users2`
--
ALTER TABLE `users2`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users_verification`
--
ALTER TABLE `users_verification`
  ADD PRIMARY KEY (`verification_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD CONSTRAINT `detail_pembelian_ibfk_1` FOREIGN KEY (`ID_pembelian`) REFERENCES `pembelian` (`ID`),
  ADD CONSTRAINT `detail_pembelian_ibfk_2` FOREIGN KEY (`ID_obat`) REFERENCES `medicene` (`idMedicene`);

--
-- Constraints for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD CONSTRAINT `detail_penjualan_ibfk_1` FOREIGN KEY (`ID_penjualan`) REFERENCES `penjualan` (`ID`),
  ADD CONSTRAINT `detail_penjualan_ibfk_2` FOREIGN KEY (`ID_obat`) REFERENCES `medicene` (`idMedicene`);

--
-- Constraints for table `medicene`
--
ALTER TABLE `medicene`
  ADD CONSTRAINT `obat_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `obat_ibfk_2` FOREIGN KEY (`unitId`) REFERENCES `satuan_obat` (`ID`),
  ADD CONSTRAINT `obat_ibfk_3` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`ID`),
  ADD CONSTRAINT `obat_ibfk_4` FOREIGN KEY (`storageId`) REFERENCES `penyimpanan` (`ID`);

--
-- Constraints for table `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `pembelian_ibfk_1` FOREIGN KEY (`ID_users`) REFERENCES `users2` (`ID`);

--
-- Constraints for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `penjualan_ibfk_1` FOREIGN KEY (`ID_users`) REFERENCES `users2` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;