SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+01:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `matcha`;

CREATE TABLE `blocks` (
  `id_block` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_blocker` int(11) NOT NULL,
  `block_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chatrooms` (
  `id_chatroom` int(11) NOT NULL,
  `id_user_1` int(11) NOT NULL,
  `id_user_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `chatrooms` (`id_chatroom`, `id_user_1`, `id_user_2`) VALUES
(1, 1, 2),
(2, 1, 3),
(21, 4, 1);

CREATE TABLE `interests` (
  `id_interest` int(11) NOT NULL,
  `interest` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `interests` (`id_interest`, `interest`) VALUES
(1, 'travel'),
(2, 'sports'),
(3, 'arts'),
(4, 'films'),
(5, 'music'),
(6, 'animals'),
(7, 'dance'),
(8, 'outdoors'),
(9, 'food'),
(10, 'books'),
(11, 'programming'),
(12, 'creative'),
(13, 'languages'),
(14, 'stargazing');

CREATE TABLE `likes` (
  `id_likes` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `like_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `likes` (`id_likes`, `id_user`, `id_sender`, `like_time`) VALUES
(8, 3, 1, '2020-02-07 16:43:42'),
(9, 2, 1, '2020-02-07 16:44:16'),
(11, 1, 2, '2020-02-07 17:06:05'),
(12, 1, 3, '2020-02-07 17:06:14'),
(14, 4, 1, '2020-02-10 11:54:54'),
(38, 1, 8, '2020-02-10 16:15:31'),
(39, 1, 4, '2020-02-10 16:29:52');

CREATE TABLE `messages` (
  `id_chatroom` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(1000) NOT NULL,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `messages` (`id_chatroom`, `id_message`, `id_sender`, `time`, `message`, `readed`) VALUES
(21, 1, 1, '2020-02-10 17:30:10', 'hi', 0),
(21, 2, 4, '2020-02-10 17:30:35', 'hello', 0),
(21, 5, 4, '2020-02-10 18:36:13', 'how are you?', 0),
(21, 6, 4, '2020-02-10 18:36:58', 'how are you?', 0),
(21, 7, 4, '2020-02-10 18:37:07', 'how are you?', 0),
(21, 8, 4, '2020-02-10 18:38:29', 'how are you?', 0),
(21, 9, 4, '2020-02-13 12:11:28', 'are u there?', 0),
(21, 10, 4, '2020-02-13 12:13:14', 'are u there?', 0),
(21, 11, 4, '2020-02-13 12:16:47', 'are u there?', 0);

CREATE TABLE `notifications` (
  `id_notif` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_sender` int(11) NOT NULL,
  `id_link` int(11) DEFAULT NULL,
  `notification` varchar(25) NOT NULL,
  `notif_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `notifications` (`id_notif`, `id_user`, `id_sender`, `id_link`, `notification`, `notif_time`, `readed`) VALUES
(22, 1, 10, NULL, 'visits', '2020-02-07 12:27:57', 1),
(23, 1, 2, NULL, 'visits', '2020-02-07 13:03:08', 1),
(38, 1, 2, NULL, 'likes', '2020-02-07 17:06:05', 0),
(39, 1, 3, NULL, 'likes', '2020-02-07 17:06:14', 0),
(40, 1, 2, NULL, 'visits', '2020-02-10 11:37:45', 0),
(41, 1, 2, NULL, 'visits', '2020-02-10 11:38:50', 0),
(42, 1, 2, NULL, 'visits', '2020-02-10 11:38:59', 0),
(43, 1, 2, NULL, 'visits', '2020-02-10 11:42:35', 0),
(44, 1, 2, NULL, 'visits', '2020-02-10 11:43:23', 0),
(45, 1, 2, NULL, 'visits', '2020-02-10 11:44:04', 0),
(46, 1, 2, NULL, 'visits', '2020-02-10 11:44:23', 0),
(47, 1, 4, NULL, 'likes', '2020-02-10 11:54:25', 0),
(48, 4, 1, NULL, 'likes', '2020-02-10 11:54:54', 0),
(49, 1, 5, NULL, 'likes', '2020-02-10 11:56:14', 0),
(50, 1, 6, NULL, 'likes', '2020-02-10 11:56:39', 0),
(51, 1, 5, NULL, 'likes', '2020-02-10 14:19:41', 0),
(52, 1, 5, NULL, 'likes', '2020-02-10 14:20:23', 0),
(53, 1, 5, NULL, 'unlikes', '2020-02-10 14:20:32', 0),
(54, 1, 5, NULL, 'likes', '2020-02-10 14:21:55', 0),
(55, 1, 5, NULL, 'unlikes', '2020-02-10 14:27:45', 0),
(56, 1, 5, NULL, 'likes', '2020-02-10 14:29:12', 0),
(57, 1, 5, NULL, 'unlikes', '2020-02-10 14:29:21', 0),
(58, 1, 4, NULL, 'unlikes', '2020-02-10 14:29:58', 0),
(59, 1, 4, NULL, 'likes', '2020-02-10 14:30:19', 0),
(60, 1, 4, NULL, 'unlikes', '2020-02-10 14:39:51', 0),
(61, 1, 4, NULL, 'likes', '2020-02-10 14:40:10', 0),
(62, 1, 4, NULL, 'unlikes', '2020-02-10 14:40:57', 0),
(63, 1, 4, NULL, 'likes', '2020-02-10 14:41:25', 0),
(64, 1, 4, NULL, 'unlikes', '2020-02-10 14:42:09', 0),
(65, 1, 4, NULL, 'likes', '2020-02-10 14:43:31', 0),
(66, 1, 4, NULL, 'unlikes', '2020-02-10 14:43:41', 0),
(67, 1, 4, NULL, 'likes', '2020-02-10 14:47:14', 0),
(68, 1, 4, NULL, 'unlikes', '2020-02-10 14:47:25', 0),
(69, 1, 4, NULL, 'likes', '2020-02-10 14:48:02', 0),
(70, 1, 4, NULL, 'unlikes', '2020-02-10 14:49:20', 0),
(71, 1, 4, NULL, 'likes', '2020-02-10 14:49:55', 0),
(72, 1, 4, NULL, 'unlikes', '2020-02-10 14:50:06', 0),
(73, 1, 4, NULL, 'likes', '2020-02-10 14:50:27', 0),
(74, 1, 4, NULL, 'unlikes', '2020-02-10 14:50:35', 0),
(75, 1, 4, NULL, 'likes', '2020-02-10 14:57:50', 0),
(76, 1, 4, NULL, 'unlikes', '2020-02-10 14:57:55', 0),
(77, 1, 4, NULL, 'likes', '2020-02-10 14:58:50', 0),
(78, 1, 4, NULL, 'unlikes', '2020-02-10 14:58:55', 0),
(79, 1, 4, NULL, 'likes', '2020-02-10 14:59:58', 0),
(80, 1, 4, NULL, 'unlikes', '2020-02-10 15:00:03', 0),
(81, 1, 4, NULL, 'likes', '2020-02-10 15:01:19', 0),
(82, 1, 4, NULL, 'unlikes', '2020-02-10 15:01:28', 0),
(83, 1, 4, NULL, 'likes', '2020-02-10 15:04:29', 0),
(84, 1, 4, NULL, 'unlikes', '2020-02-10 15:07:49', 0),
(85, 1, 4, NULL, 'likes', '2020-02-10 15:09:05', 0),
(86, 1, 4, NULL, 'unlikes', '2020-02-10 15:09:14', 0),
(87, 1, 4, NULL, 'likes', '2020-02-10 15:09:32', 0),
(88, 1, 4, NULL, 'unlikes', '2020-02-10 15:10:10', 0),
(89, 1, 4, NULL, 'likes', '2020-02-10 15:15:37', 0),
(90, 1, 4, NULL, 'unlikes', '2020-02-10 15:16:10', 0),
(91, 1, 4, NULL, 'likes', '2020-02-10 15:19:09', 0),
(92, 1, 8, NULL, 'likes', '2020-02-10 16:15:31', 0),
(93, 1, 4, NULL, 'unlikes', '2020-02-10 16:15:45', 0),
(94, 1, 4, NULL, 'likes', '2020-02-10 16:29:52', 0),
(95, 1, 4, 11, 'messages', '2020-02-13 11:16:47', 0),
(96, 1111, 1, NULL, 'visits', '2020-02-24 12:24:46', 0),
(97, 1111, 1, NULL, 'visits', '2020-02-24 12:25:57', 0),
(98, 1111, 1, NULL, 'visits', '2020-02-24 12:35:14', 0),
(99, 1111, 1, NULL, 'visits', '2020-02-24 12:36:06', 0),
(100, 1111, 1, NULL, 'visits', '2020-02-24 12:48:15', 0),
(101, 1, 7, NULL, 'visits', '2020-02-24 13:11:17', 0),
(102, 1, 7, NULL, 'visits', '2020-02-24 13:11:35', 0),
(103, 1, 7, NULL, 'visits', '2020-02-24 13:14:45', 0),
(104, 1, 7, NULL, 'visits', '2020-02-24 17:15:50', 0),
(105, 1, 7, NULL, 'visits', '2020-02-24 17:16:23', 0),
(106, 1, 7, NULL, 'visits', '2020-02-24 17:16:35', 0),
(107, 1, 7, NULL, 'visits', '2020-02-24 17:17:04', 0),
(108, 1, 7, NULL, 'visits', '2020-02-25 12:00:56', 0),
(109, 1, 7, NULL, 'visits', '2020-02-25 12:01:26', 0),
(110, 1, 7, NULL, 'visits', '2020-02-25 12:01:44', 0),
(111, 1, 7, NULL, 'visits', '2020-02-25 12:02:17', 0),
(112, 1, 7, NULL, 'visits', '2020-02-25 12:02:21', 0),
(113, 1, 7, NULL, 'visits', '2020-02-25 12:06:29', 0),
(114, 1, 7, NULL, 'visits', '2020-02-25 12:06:43', 0),
(115, 1, 7, NULL, 'visits', '2020-02-25 12:07:29', 0),
(116, 1, 7, NULL, 'visits', '2020-02-25 12:39:30', 0),
(117, 1, 7, NULL, 'visits', '2020-02-25 15:17:21', 0),
(118, 1, 7, NULL, 'visits', '2020-02-25 15:17:48', 0),
(119, 1, 7, NULL, 'visits', '2020-02-25 15:17:50', 0),
(120, 1, 7, NULL, 'visits', '2020-02-25 15:19:21', 0),
(121, 1, 7, NULL, 'visits', '2020-02-25 15:19:29', 0),
(122, 1, 7, NULL, 'visits', '2020-02-25 15:20:09', 0),
(123, 1, 7, NULL, 'visits', '2020-02-25 15:30:58', 0),
(124, 1, 7, NULL, 'visits', '2020-02-25 15:31:38', 0),
(125, 1, 7, NULL, 'visits', '2020-02-25 15:31:43', 0),
(126, 1, 7, NULL, 'visits', '2020-02-25 15:31:50', 0),
(127, 1, 7, NULL, 'visits', '2020-02-25 15:31:54', 0),
(128, 1, 7, NULL, 'visits', '2020-02-25 15:32:10', 0),
(129, 1, 7, NULL, 'visits', '2020-02-25 15:35:14', 0),
(130, 1, 7, NULL, 'visits', '2020-02-25 15:35:16', 0),
(131, 1, 7, NULL, 'visits', '2020-02-25 15:35:29', 0),
(132, 1, 7, NULL, 'visits', '2020-02-25 15:36:23', 0),
(133, 1, 7, NULL, 'visits', '2020-02-25 15:36:41', 0),
(134, 1, 7, NULL, 'visits', '2020-02-25 15:36:49', 0),
(135, 1, 7, NULL, 'visits', '2020-02-25 15:36:59', 0),
(136, 1, 7, NULL, 'visits', '2020-02-25 15:37:03', 0),
(137, 1, 7, NULL, 'visits', '2020-02-25 15:37:09', 0),
(138, 1, 7, NULL, 'visits', '2020-02-25 15:37:35', 0),
(139, 1, 7, NULL, 'visits', '2020-02-25 15:37:41', 0),
(140, 1, 7, NULL, 'visits', '2020-02-25 15:37:45', 0),
(141, 1, 7, NULL, 'visits', '2020-02-25 15:37:58', 0),
(142, 1, 7, NULL, 'visits', '2020-02-25 15:38:02', 0),
(143, 1, 7, NULL, 'visits', '2020-02-25 15:38:09', 0),
(144, 1, 7, NULL, 'visits', '2020-02-25 15:38:55', 0),
(145, 1, 7, NULL, 'visits', '2020-02-25 15:39:17', 0),
(146, 1, 7, NULL, 'visits', '2020-02-25 15:40:00', 0),
(147, 1, 7, NULL, 'visits', '2020-02-25 15:40:37', 0),
(148, 1, 7, NULL, 'visits', '2020-02-25 15:42:57', 0),
(149, 1, 7, NULL, 'visits', '2020-02-25 15:43:00', 0),
(150, 1, 7, NULL, 'visits', '2020-02-25 15:43:15', 0),
(151, 1, 7, NULL, 'visits', '2020-02-25 15:43:22', 0),
(152, 1, 7, NULL, 'visits', '2020-02-25 15:44:28', 0),
(153, 1, 7, NULL, 'visits', '2020-02-25 15:48:01', 0),
(154, 1, 7, NULL, 'visits', '2020-02-25 15:49:57', 0),
(155, 1, 7, NULL, 'visits', '2020-02-25 15:50:02', 0),
(156, 1, 7, NULL, 'visits', '2020-02-25 15:52:49', 0),
(157, 1, 7, NULL, 'visits', '2020-02-25 15:52:53', 0),
(158, 1, 7, NULL, 'visits', '2020-02-25 15:53:30', 0),
(159, 1, 7, NULL, 'visits', '2020-02-25 16:23:48', 0),
(160, 1, 7, NULL, 'visits', '2020-03-02 09:43:25', 0),
(161, 1, 7, NULL, 'visits', '2020-03-02 09:47:21', 0),
(162, 1, 7, NULL, 'visits', '2020-03-02 09:48:26', 0);

CREATE TABLE `pics` (
  `id_pic` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `profiles` (
  `id_profile` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `gender` varchar(25) NOT NULL,
  `birthday` date NOT NULL,
  `sex_prefer` varchar(25) DEFAULT 'bi',
  `biography` varchar(10000) DEFAULT NULL,
  `location_lat` float NOT NULL,
  `location_lon` float NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `fame` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `profiles` (`id_profile`, `id_user`, `gender`, `birthday`, `sex_prefer`, `biography`, `location_lat`, `location_lon`, `picture`, `fame`) VALUES
(1, 1, 'Female', '1988-09-07', 'hetero', 'hahahahhahha', 0, 0, NULL, 188);

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `active_link` varchar(255) DEFAULT NULL,
  `ini_pwd_link` varchar(255) DEFAULT NULL,
  `online` tinyint(1) NOT NULL DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id_user`, `email`, `username`, `password`, `firstname`, `lastname`, `active`, `active_link`, `ini_pwd_link`, `online`, `last_login`, `creation_date`) VALUES
(1, 'adrien1.vardon@yahoo.fr', 'admin', '$2b$10$czclxBLC5TnCBp6llJ8qDOMqSJ/M6U0BC3H.v/lF7XEuskJLBBUAm', 'le', 'pan', 1, '8464296e9277a72c3b88', NULL, 1, '2020-03-02 10:48:31', '2020-02-05 12:27:23'),
(7, 'ashley1@gmail.com', 'admin1', '$2b$10$yp0ci/ZM6iVOyldoCvYzTertVDjlPHwRRHakxuisax1P.ov9hvjCy', 'le', 'pan', 1, 'ac4f94e120f1160586d2', NULL, 0, '2020-03-02 10:42:54', '2020-02-19 16:53:56'),
(14, 'adrien.vardon@yahoo.fr', 'test', '$2b$10$y54mGTEqaiDlKzPwHwpeZOTq23j0ZPxNhjldr.K5stN1dEeY22m0a', 'adrien', 'vardon', 0, '8075501784a54b838625', NULL, 0, NULL, '2020-02-21 18:25:49');

CREATE TABLE `users_interests` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_interest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users_interests` (`id`, `id_user`, `id_interest`) VALUES
(5, 1, 1),
(6, 1, 10),
(7, 1, 5),
(9, 1, 6),
(10, 1, 14),
(11, 1, 11);


ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id_block`);

ALTER TABLE `chatrooms`
  ADD PRIMARY KEY (`id_chatroom`);

ALTER TABLE `interests`
  ADD PRIMARY KEY (`id_interest`),
  ADD KEY `id_interest` (`id_interest`);

ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_likes`);

ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_message`);

ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notif`);

ALTER TABLE `pics`
  ADD PRIMARY KEY (`id_pic`);

ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id_profile`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `active_link` (`active_link`),
  ADD UNIQUE KEY `ini_pwd_link` (`ini_pwd_link`);

ALTER TABLE `users_interests`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `blocks`
  MODIFY `id_block` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `chatrooms`
  MODIFY `id_chatroom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `interests`
  MODIFY `id_interest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `likes`
  MODIFY `id_likes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

ALTER TABLE `messages`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `notifications`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

ALTER TABLE `pics`
  MODIFY `id_pic` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `profiles`
  MODIFY `id_profile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `users_interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
