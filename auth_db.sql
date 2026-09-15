-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2026 at 04:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(50) DEFAULT 'code',
  `features` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `features`, `created_at`) VALUES
(1, 'Phát triển Web & App', 'Xây dựng các hệ thống website và ứng dụng tùy biến cao, tối ưu hóa trải nghiệm người dùng và hiệu năng vận hành.', 'code', 'Thiết kế UI/UX hiện đại\nTối ưu chuẩn SEO & tốc độ\nBảo mật và mở rộng linh hoạt', '2026-09-14 17:38:30'),
(2, 'Tư vấn & Chuyển đổi số', 'Đồng hành cùng doanh nghiệp số hóa quy trình làm việc, tối ưu hóa chi phí vận hành và tăng trưởng doanh thu.', 'users', 'Tự động hóa quy trình\nTích hợp giải pháp đám mây\nĐào tạo đội ngũ vận hành', '2026-09-14 17:38:30'),
(3, 'Bảo trì & Nâng cấp hệ thống', 'Duy trì sự ổn định liên tục cho hạ tầng số với cam kết chất lượng, bảo mật định kỳ và hỗ trợ kỹ thuật 24/7.', 'refresh-cw', 'Giám sát hệ thống 24/7\nSao lưu dữ liệu định kỳ\nNâng cấp tính năng liên tục', '2026-09-14 17:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `full_name`, `password`, `role`, `created_at`) VALUES
(1, 'nguyenhuyenduy4', 'nhduycntt2411086@student.ctuet.edu.vn', '', '$2y$10$hjuF3vw4G9RKh4vwXg8VgegBnrIDu06gfqZR8ISh.x6.0qb/tr1WW', 'admin', '2026-09-14 15:32:34'),
(3, 'nguyenhuyenduy', 'nguyenhuyenduy18022006@gmail.com', 'Nguyễn Huyền Duy', '$2y$10$uUiV28cL1j7bxiHar4y1huLNPU7sPm4kjQyb0Sc2PiYkW/8B2ogtG', 'user', '2026-09-14 15:46:14'),
(4, 'nguyenhuyenduy2', 'nhduycntt2411086@student.ctuet.edu.vnm', 'Nguyễn Huyền Duy 2', '$2y$10$/Gid1jfG1PwxcHnxYXPSDuLp7n67lK3tpG7uiEOQm16EZnK8VhHry', 'user', '2026-09-14 17:31:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
