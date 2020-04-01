SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `matcha`;

CREATE TABLE `blocks` (
  `id_block` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `block_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chatrooms` (
  `id_chatroom` int(11) NOT NULL,
  `id_user_1` int(11) NOT NULL,
  `id_user_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `messages` (
  `id_chatroom` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(1000) NOT NULL,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `notifications` (
  `id_notif` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_sender` int(11) NOT NULL,
  `id_link` int(11) DEFAULT NULL,
  `notification` varchar(25) NOT NULL,
  `notif_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `pics` (
  `id_pic` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pics` (`id_pic`, `id_user`, `path`) VALUES
(14, 1, '12a96eaf93b'),
(16, 1, '1d6b02a97d7'),
(17, 1, '11cafac2011'),
(18, 7, '72d8834d61d');

CREATE TABLE `profiles` (
  `id_profile` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `gender` varchar(25) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sex_prefer` varchar(25) DEFAULT 'bi',
  `biography` varchar(10000) DEFAULT NULL,
  `location_lat` float NOT NULL,
  `location_lon` float NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `fame` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `profiles` (`id_profile`, `id_user`, `gender`, `birthday`, `sex_prefer`, `biography`, `location_lat`, `location_lon`, `avatar`, `fame`) VALUES
(1, 1, 'female', '1987-09-30', 'straight', 'This is ashley', 0, 0, '1c849c68e98', 1520),
(2, 7, 'female', '2000-03-19', 'straight', 'Hi, i am le Pan. ', 0, 0, '7c464b6568c', 4670),
(6, 14, 'female', '2020-03-04', 'gay', '4r4r4', 0, 0, '14_0', 26),
(7, 16, NULL, NULL, 'bi', NULL, 0, 0, NULL, 0);

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
(1, 'adrien.vardon1@yahoo.fr', 'admin', '$2b$10$czclxBLC5TnCBp6llJ8qDOMqSJ/M6U0BC3H.v/lF7XEuskJLBBUAm', 'le', 'pan', 1, '8464296e9277a72c3b88', NULL, 1, '2020-04-01 11:29:30', '2020-02-05 12:27:23'),
(7, 'ashley1@gmail.com', 'admin1', '$2b$10$yp0ci/ZM6iVOyldoCvYzTertVDjlPHwRRHakxuisax1P.ov9hvjCy', 'Ashley', 'vardon', 1, 'ac4f94e120f1160586d2', NULL, 1, '2020-03-31 19:20:00', '2020-02-19 16:53:56'),
(14, 'adrien.vardon@yahoo.fr', 'test', '$2b$10$y54mGTEqaiDlKzPwHwpeZOTq23j0ZPxNhjldr.K5stN1dEeY22m0a', 'adrien', 'vardon', 1, '8075501784a54b838625', NULL, 0, '2020-03-25 11:34:48', '2020-02-21 18:25:49'),
(16, 'cchi@gmail.com', 'test1', '$2b$10$ROO9n5lo.S3eQHth/8FhKud/IBGwpSTSZUNp3oEdpqZ9FJdsUe1Xe', 'c', 'chi', 1, 'abe6099967d2f9c27fea', NULL, 0, '2020-03-27 16:23:32', '2020-03-27 15:07:17');

CREATE TABLE `users_interests` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_interest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users_interests` (`id`, `id_user`, `id_interest`) VALUES
(218, 14, 4),
(219, 14, 12),
(220, 14, 10),
(1378, 1, 9),
(1379, 1, 1),
(1380, 1, 13),
(1381, 1, 6),
(1382, 1, 12),
(1383, 1, 11),
(1384, 1, 4),
(1397, 7, 6),
(1398, 7, 1),
(1399, 7, 9),
(1400, 7, 12),
(1401, 7, 13),
(1402, 7, 4);


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
  MODIFY `id_chatroom` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `interests`
  MODIFY `id_interest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `likes`
  MODIFY `id_likes` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `messages`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `notifications`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pics`
  MODIFY `id_pic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

ALTER TABLE `profiles`
  MODIFY `id_profile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

ALTER TABLE `users_interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1403;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
