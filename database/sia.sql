-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Agu 2024 pada 17.22
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30
-- ////////////////////////////////////////
-- Bhadriko Theo Pramudya
-- 10123375
-- IF9
-- ////////////////////////////////////////////

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sia`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `dosen`
--

CREATE TABLE `dosen` (
  `NIDN` varchar(10) NOT NULL,
  `NamaDosen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `dosen`
--

INSERT INTO `dosen` (`NIDN`, `NamaDosen`) VALUES
('0123456789', 'Dr. Budi Santoso'),
('01265845', 'Dr. Barka Tirta S.kom,M.kom,S.Pd'),
('0987654321', 'Prof. Siti Nurhaliza'),
('10125533', 'Prof. Revana Yusuf Muhajidin'),
('1122334455', 'Dr. Andi Wijaya'),
('123456', 'Dr. Ahmad Sudirman'),
('193327', 'Ir.Dr.Bhadriko Theo Pramuda S.kom,M.kom,A.Md'),
('2233445566', 'Prof. Ir. Haryono'),
('234567', 'Prof. Budi Santoso'),
('326598147', 'Prof Zulfazri Wirakastam S.kom,M.kom'),
('3344556677', 'Dr. Dewi Anjani'),
('339397', 'Wirasetyo S.kom,M.kom'),
('5566778899', 'Dr. Maria Kristina'),
('6677889900', 'Dr. Rizky Maulana'),
('7788990011', 'Prof. Bambang Suharto'),
('789541236', 'Dr. Iqbal Nurhafiz'),
('8143254594', 'Ir. Thalleous Sendaris S.kom M.kom'),
('921658745', 'Ir.H.Frienldy Great');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurusan`
--

CREATE TABLE `jurusan` (
  `KodeJurusan` varchar(10) NOT NULL,
  `NamaJurusan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jurusan`
--

INSERT INTO `jurusan` (`KodeJurusan`, `NamaJurusan`) VALUES
('IOP', 'Teknik Instrumentasi Otimasi Proses'),
('Meka', 'Teknik Mekatronik'),
('PFPT', 'Perfileman dan Penayangan Televisi'),
('RPL', 'Rekayasa Perangkat Lunak'),
('SaIn', 'Sastra Informatika'),
('SasIng', 'Sastra Inggris'),
('SasMes', 'Sastra Mesin'),
('SI', 'Sistem Informasi'),
('SIJA', 'Sistem Jaringan'),
('TEI', 'Teknik Elektronik Industri'),
('TI', 'Teknik Informatika'),
('TOI', 'Teknik Otimatisasi Industri'),
('TPTU', 'Teknik Pendingn dan Tata Udara');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `NamaKelas` varchar(100) NOT NULL,
  `NIDN` varchar(10) DEFAULT NULL,
  `NamaDosen` varchar(100) DEFAULT NULL,
  `KodeJurusan` varchar(10) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`NamaKelas`, `NIDN`, `NamaDosen`, `KodeJurusan`, `id`) VALUES
('RPL B1', '234567', NULL, 'RPL', 9),
('RPLA', '123456', NULL, 'RPL', 10),
('IF1', '921658745', NULL, 'IOP', 14),
('IF9', '1122334455', NULL, 'TI', 15);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelasmahasiswa`
--

CREATE TABLE `kelasmahasiswa` (
  `KelasMahasiswaID` int(11) NOT NULL,
  `NamaKelas` varchar(100) DEFAULT NULL,
  `NIM` varchar(10) DEFAULT NULL,
  `NamaMahasiswa` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelasmahasiswa`
--

INSERT INTO `kelasmahasiswa` (`KelasMahasiswaID`, `NamaKelas`, `NIM`, `NamaMahasiswa`) VALUES
(1, 'IF', '10123355', 'Revana Yusuf Maulid'),
(2, 'IF', '10123365', 'Muhammad Iqbal Nurhafidz'),
(3, 'IFSatu', '10136685', 'Muhammad Arya Rafi Raharjo'),
(4, 'IFSatu', '10245897', 'Wanda Maximoff'),
(5, 'SF1', '10123375', 'Bhadriko Theo Pramudya'),
(6, 'SI1', '555555', 'DATA DUMMY'),
(7, 'SI1', '9999999', 'Udin Petot'),
(8, 'AA', '555555', NULL),
(9, 'AA', '9999999', NULL),
(10, 'AB', '2021003', NULL),
(11, 'AB', '555555', NULL),
(12, 'AB', '9999999', NULL),
(13, 'ZZ', '2021002', NULL),
(14, 'ZZ', '2021003', NULL),
(15, 'IOP1', '10123355', NULL),
(16, 'RPL B1', '10122275', NULL),
(17, 'RPL B1', '10123375', NULL),
(18, 'RPLA', '10136685', NULL),
(19, 'RPLA', '10245897', NULL),
(20, 'TITIT', '2101234572', NULL),
(21, 'TITIT', '2101234575', NULL),
(22, 'MEMEK', '2101234569', NULL),
(23, 'MEMEK', '2101234570', NULL),
(24, 'asu', '2101234575', NULL),
(25, 'asu', '555555', NULL),
(26, 'IF1', '10122275', NULL),
(27, 'IF1', '10123355', NULL),
(28, 'IF1', '10123365', NULL),
(29, 'IF1', '10123369', NULL),
(30, 'IF1', '10123375', NULL),
(31, 'IF1', '10136685', NULL),
(32, 'IF1', '10245897', NULL),
(33, 'IF9', '10123355', NULL),
(34, 'IF9', '10123365', NULL),
(35, 'IF9', '10123369', NULL),
(36, 'IF9', '10123375', NULL),
(37, 'IF9', '10136685', NULL),
(38, 'IF9', '2101234567', NULL),
(39, 'IF9', '2101234571', NULL),
(40, 'IF9', '2101234572', NULL),
(41, 'IF9', '9999999', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelasmatakuliah`
--

CREATE TABLE `kelasmatakuliah` (
  `KelasMatakuliahID` int(11) NOT NULL,
  `NamaKelas` varchar(100) DEFAULT NULL,
  `KodeMatakuliah` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelasmatakuliah`
--

INSERT INTO `kelasmatakuliah` (`KelasMatakuliahID`, `NamaKelas`, `KodeMatakuliah`) VALUES
(1, 'IF', 'ASD'),
(2, 'IF', 'BD'),
(3, 'IFSatu', 'ASD2'),
(4, 'IFSatu', 'BD'),
(5, 'IFSatu', 'BD2'),
(6, 'SI1', 'ASD'),
(7, 'SI1', 'BD'),
(8, 'AB', 'ASD'),
(9, 'AB', 'ASD2'),
(10, 'AB', 'BD'),
(11, 'RPL B1', 'ASD'),
(12, 'RPL B1', 'BD'),
(13, 'RPLA', 'ASD'),
(14, 'RPLA', 'ASD2'),
(15, 'RPLA', 'BD'),
(16, 'TITIT', 'ASD'),
(17, 'TITIT', 'ASD2'),
(18, 'MEMEK', 'ASD'),
(19, 'MEMEK', 'ASD2'),
(20, 'MEMEK', 'BD'),
(21, 'asu', 'ASD'),
(22, 'asu', 'ASD2'),
(23, 'asu', 'BD'),
(24, 'IF1', 'ASD'),
(25, 'IF1', 'ASD2'),
(26, 'IF1', 'BD'),
(27, 'IF1', 'BD2'),
(28, 'IF1', 'PBO'),
(29, 'IF1', 'PW2'),
(30, 'IF1', 'SMTK'),
(31, 'IF9', 'PW2'),
(32, 'IF9', 'SMTK'),
(33, 'IF9', 'Sunda');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `NIM` varchar(10) NOT NULL,
  `NamaMahasiswa` varchar(100) NOT NULL,
  `JenisKelamin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`NIM`, `NamaMahasiswa`, `JenisKelamin`) VALUES
('10122275', 'Ajizah Masripah', 'Perempuan'),
('10123355', 'Revana Yusuf Maulid', 'Laki-laki'),
('10123365', 'Muhammad Iqbal Nurhafidz', 'Laki-laki'),
('10123369', 'Zulfazri Wirakastam', 'Laki-laki'),
('10123374', 'Natasha Romanoff', 'Perempuan'),
('10123375', 'Bhadriko Theo Pramudya', 'Laki-laki'),
('10136685', 'Muhammad Arya Rafi Raharjo', 'Laki-laki'),
('10245897', 'Wanda Maximoff', 'Perempuan'),
('2021002', 'Bobie', 'Laki-laki'),
('2021003', 'Charlie', 'Laki-laki'),
('2101234567', 'Ahmad Pratama', 'Laki-laki'),
('2101234568', 'Siti Aisyah', 'Perempuan'),
('2101234569', 'Budi Hartono', 'Laki-laki'),
('2101234570', 'Dewi Kusuma', 'Perempuan'),
('2101234571', 'Rizky Ramadhan', 'Laki-laki'),
('2101234572', 'Intan Permata', 'Perempuan'),
('2101234575', 'Agus Setiawan', 'Laki-laki'),
('555555', 'DATA DUMMY', 'Perempuan'),
('9999999', 'Udin Petot', 'Laki-laki');

-- --------------------------------------------------------

--
-- Struktur dari tabel `matakuliah`
--

CREATE TABLE `matakuliah` (
  `KodeMatakuliah` varchar(10) NOT NULL,
  `NamaMatakuliah` varchar(100) NOT NULL,
  `NIDN` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `matakuliah`
--

INSERT INTO `matakuliah` (`KodeMatakuliah`, `NamaMatakuliah`, `NIDN`) VALUES
('ASD', 'Algoritma Struktur Data', '10125533'),
('ASD2', 'Algoritma Struktur Data2', '789541236'),
('BD', 'Basis Data', '921658745'),
('BD2', 'Basis Data 2', '921658745'),
('MSTB', 'Matematika Statistika Probabilitas', '7788990011'),
('PBO', 'Pemrograman Berorientasi Objek', '123456'),
('PW2', 'Pemrograman Web 2', '193327'),
('SMTK', 'Sastra Matematika', '789541236'),
('Sunda', 'Bahasa Sunda', '10125533');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`NIDN`);

--
-- Indeks untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`KodeJurusan`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NamaKelas` (`NamaKelas`),
  ADD KEY `NIDN` (`NIDN`),
  ADD KEY `KodeJurusan` (`KodeJurusan`);

--
-- Indeks untuk tabel `kelasmahasiswa`
--
ALTER TABLE `kelasmahasiswa`
  ADD PRIMARY KEY (`KelasMahasiswaID`),
  ADD KEY `NIM` (`NIM`);

--
-- Indeks untuk tabel `kelasmatakuliah`
--
ALTER TABLE `kelasmatakuliah`
  ADD PRIMARY KEY (`KelasMatakuliahID`),
  ADD KEY `KodeMatakuliah` (`KodeMatakuliah`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`NIM`);

--
-- Indeks untuk tabel `matakuliah`
--
ALTER TABLE `matakuliah`
  ADD PRIMARY KEY (`KodeMatakuliah`),
  ADD KEY `NIDN` (`NIDN`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `kelasmahasiswa`
--
ALTER TABLE `kelasmahasiswa`
  MODIFY `KelasMahasiswaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `kelasmatakuliah`
--
ALTER TABLE `kelasmatakuliah`
  MODIFY `KelasMatakuliahID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`NIDN`) REFERENCES `dosen` (`NIDN`),
  ADD CONSTRAINT `kelas_ibfk_2` FOREIGN KEY (`KodeJurusan`) REFERENCES `jurusan` (`KodeJurusan`);

--
-- Ketidakleluasaan untuk tabel `kelasmahasiswa`
--
ALTER TABLE `kelasmahasiswa`
  ADD CONSTRAINT `kelasmahasiswa_ibfk_1` FOREIGN KEY (`NIM`) REFERENCES `mahasiswa` (`NIM`);

--
-- Ketidakleluasaan untuk tabel `kelasmatakuliah`
--
ALTER TABLE `kelasmatakuliah`
  ADD CONSTRAINT `kelasmatakuliah_ibfk_1` FOREIGN KEY (`KodeMatakuliah`) REFERENCES `matakuliah` (`KodeMatakuliah`);

--
-- Ketidakleluasaan untuk tabel `matakuliah`
--
ALTER TABLE `matakuliah`
  ADD CONSTRAINT `matakuliah_ibfk_1` FOREIGN KEY (`NIDN`) REFERENCES `dosen` (`NIDN`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
