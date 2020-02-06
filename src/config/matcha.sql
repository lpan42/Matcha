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
  `id_blocker` int(11) NOT NULL,
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
  `id_liker` int(11) NOT NULL,
  `id_pic` int(11) NOT NULL,
  `like_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
  `id_chatroom` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(1000) NOT NULL,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `notifications` (
  `id_notif` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_link` int(11) NOT NULL,
  `notification` varchar(25) NOT NULL,
  `notif_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `notifications` (`id_notif`, `id_user`, `id_link`, `notification`, `notif_time`, `readed`) VALUES
(1, 1, 9, 'visits', '2020-02-05 13:59:04', 0),
(2, 1, 10, 'visits', '2020-02-05 14:00:47', 0),
(3, 1, 11, 'visits', '2020-02-05 14:01:25', 0),
(4, 1, 12, 'visits', '2020-02-05 14:01:37', 0),
(5, 1, 13, 'visits', '2020-02-05 14:01:46', 0),
(6, 1, 14, 'visits', '2020-02-05 14:02:40', 0),
(7, 1, 15, 'visits', '2020-02-05 14:05:07', 0),
(8, 1, 16, 'visits', '2020-02-05 14:10:27', 0),
(9, 1, 17, 'visits', '2020-02-05 14:12:20', 0),
(10, 1, 20, 'visits', '2020-02-05 14:23:00', 0),
(11, 1, 21, 'visits', '2020-02-05 15:05:08', 0),
(12, 1, 22, 'visits', '2020-02-05 15:05:53', 0),
(13, 1, 23, 'visits', '2020-02-05 15:07:20', 0),
(14, 1, 24, 'visits', '2020-02-05 15:07:30', 0),
(15, 1, 25, 'visits', '2020-02-05 15:07:39', 0),
(16, 1, 26, 'visits', '2020-02-05 15:08:00', 0),
(17, 1, 27, 'visits', '2020-02-05 15:08:34', 0),
(18, 1, 28, 'visits', '2020-02-05 15:08:36', 0),
(19, 1, 29, 'visits', '2020-02-05 15:08:59', 0),
(20, 1, 30, 'visits', '2020-02-05 15:09:01', 0);

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
(1, 1, 'Female', '1987-09-30', 'hetero', 'hahahahhahha', 0, 0, NULL, 8);

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
(1, 'ashley.lepan@gmail.com', 'admin', '$2b$10$czclxBLC5TnCBp6llJ8qDOMqSJ/M6U0BC3H.v/lF7XEuskJLBBUAm', 'adrien', 'pan', 1, '8464296e9277a72c3b88', NULL, 1, '2020-02-05 13:35:57', '2020-02-05 12:27:23');

CREATE TABLE `users_interests` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_interest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users_interests` (`id`, `id_user`, `id_interest`) VALUES
(5, 1, 1),
(6, 1, 10),
(7, 1, 5),
(9, 1, 6);

CREATE TABLE `visits` (
  `id_visits` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_visitor` int(11) NOT NULL,
  `visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `visits` (`id_visits`, `id_user`, `id_visitor`, `visit_time`) VALUES
(1, 1, 10, '2020-02-05 13:37:38'),
(2, 1, 10, '2020-02-05 13:38:03'),
(3, 1, 10, '2020-02-05 13:39:07'),
(4, 1, 10, '2020-02-05 13:55:43'),
(5, 1, 10, '2020-02-05 13:56:02'),
(6, 1, 10, '2020-02-05 13:56:43'),
(7, 1, 10, '2020-02-05 13:57:07'),
(8, 1, 10, '2020-02-05 13:58:44'),
(9, 1, 10, '2020-02-05 13:59:04'),
(10, 1, 10, '2020-02-05 14:00:47'),
(11, 1, 10, '2020-02-05 14:01:25'),
(12, 1, 10, '2020-02-05 14:01:37'),
(13, 1, 10, '2020-02-05 14:01:46'),
(14, 1, 10, '2020-02-05 14:02:40'),
(15, 1, 10, '2020-02-05 14:05:07'),
(16, 1, 10, '2020-02-05 14:10:27'),
(17, 1, 10, '2020-02-05 14:12:20'),
(18, 1, 10, '2020-02-05 14:20:42'),
(19, 1, 10, '2020-02-05 14:21:07'),
(20, 1, 10, '2020-02-05 14:23:00'),
(21, 1, 10, '2020-02-05 15:05:08'),
(22, 1, 10, '2020-02-05 15:05:53'),
(23, 1, 10, '2020-02-05 15:07:20'),
(24, 1, 10, '2020-02-05 15:07:30'),
(25, 1, 10, '2020-02-05 15:07:39'),
(26, 1, 10, '2020-02-05 15:08:00'),
(27, 1, 10, '2020-02-05 15:08:34'),
(28, 1, 10, '2020-02-05 15:08:36'),
(29, 1, 10, '2020-02-05 15:08:59'),
(30, 1, 10, '2020-02-05 15:09:01');


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

ALTER TABLE `visits`
  ADD PRIMARY KEY (`id_visits`);


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
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `pics`
  MODIFY `id_pic` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `profiles`
  MODIFY `id_profile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `users_interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `visits`
  MODIFY `id_visits` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
