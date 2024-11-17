-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 17 2024 г., 18:15
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `audit`
--

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rating` int NOT NULL,
  `comment` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `username`, `email`, `rating`, `comment`, `created_at`) VALUES
(1, 'Даниил', 'example@mail.ru', 3, 'ЫВАЫВА', '2024-11-17 15:04:27'),
(2, 'Никита', 'example@mail.ru', 4, 'sdfs', '2024-11-17 15:04:27'),
(3, 'Илья', 'example@mail.ru', 2, NULL, '2024-11-17 15:04:43'),
(10, 'anonymus', '', 5, '', '2024-11-17 17:08:41'),
(11, 'anonymus', '', 5, 'dfxcv', '2024-11-17 17:11:05'),
(12, 'anonymus', 'dgdgdgd@mail.ru', 5, 'dsfdsf', '2024-11-17 17:11:26'),
(13, 'Anonymus', 'zczxczc@mail.ru', 5, 'sdfsd', '2024-11-17 17:12:07'),
(14, 'dsfsfsfsfd', 'ivanov@mail.ru', 5, '', '2024-11-17 17:13:07'),
(15, 'sdfdferre4', 'sdfdgdf@mail.ru', 3, 'sdfsdfsd', '2024-11-17 17:13:21'),
(17, 'Anonymus', 'danilka-shubnikov@mail.ru', 5, '', '2024-11-17 17:33:04'),
(18, 'Anonymus', 'danilka-shubnikov@mail.ru', 5, '', '2024-11-17 17:36:00'),
(19, 'Anonymus', 'danilka-shubnikov@mail.ru', 5, '', '2024-11-17 17:36:22'),
(20, 'Anonymus', 'danilka-shubnikov@mail.ru', 5, '', '2024-11-17 17:39:43'),
(21, 'Anonymus', 'danilka-shubnikov@mail.ru', 5, '', '2024-11-17 17:40:19');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
