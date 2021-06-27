-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2021 at 01:22 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_quiz_ans`
--

CREATE TABLE `admin_quiz_ans` (
  `id` bigint(50) NOT NULL,
  `t_id` bigint(50) NOT NULL,
  `u_id` bigint(50) NOT NULL,
  `q_id` bigint(50) NOT NULL,
  `marks` text NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_quiz_ans`
--

INSERT INTO `admin_quiz_ans` (`id`, `t_id`, `u_id`, `q_id`, `marks`, `description`, `file`) VALUES
(25, 2, 88, 6, '200', 'no', 'uploads/RashikaKhatri_1918594_B.1621947534.pdf'),
(26, 7, 287, 36, '200', 'no', 'uploads/B_1918594_RashikaKhatri.1622970984.pdf'),
(27, 7, 287, 43, '6', 'no', 'uploads/WhatsApp Image 2021-05-27 at 11.06.30 AM.1623008414.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `topic` text NOT NULL,
  `t_desc` text NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `topic`, `t_desc`, `teacher_id`, `status`) VALUES
(16, 'sxsc', '', 1, 2),
(17, 'gbhn', '&lt;p&gt;test&lt;/p&gt;', 2, 2),
(18, 'hrgtr', '&lt;p&gt;rrrr&lt;/p&gt;', 2, 2),
(20, 'ghjnm', '', 1, 2),
(21, 'gyhj', '&lt;p&gt;ghj&lt;/p&gt;', 2, 3),
(28, 'new topic check', '&lt;p&gt;b vcxzfgfdsa&lt;/p&gt;', 7, 2),
(29, 'sdfg', '&lt;p&gt;vb&lt;/p&gt;', 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'vendor'),
(3, 'user'),
(4, 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `customer_navbar`
--

CREATE TABLE `customer_navbar` (
  `id` int(11) NOT NULL,
  `head` varchar(150) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `link` varchar(150) NOT NULL,
  `icon` varchar(150) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 65535,
  `status` varchar(50) NOT NULL DEFAULT 'active'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_navbar`
--

INSERT INTO `customer_navbar` (`id`, `head`, `parent`, `link`, `icon`, `sort_order`, `status`) VALUES
(1, 'Dashboard', NULL, 'dashboard', 'fas fa-tachometer-alt', 1, 'active'),
(2, 'Catalogue', NULL, '#', 'fas fa-tags', 2, 'inactive'),
(3, 'Categories', 2, 'categories', 'fas fa-align-justify', 3, 'active'),
(4, 'Test Series', 2, 'products', 'fas fa-cart-plus', 4, 'active'),
(7, 'Orders', NULL, '#', 'fas fa-shopping-cart', 7, 'inactive'),
(8, 'Pending Orders', 7, 'pending_orders', 'fas fa-hourglass-start', 8, 'active'),
(12, 'Marketing', NULL, '#', 'fas fa-tags', 12, 'active'),
(14, 'Students', NULL, '#', 'fas fa-users', 14, 'inactive'),
(15, 'Active', 14, 'active_customers', 'fas fa-check-circle', 15, 'active'),
(16, 'Blocked', 14, 'blocked_customers', 'fas fa-ban', 16, 'active'),
(17, 'Setup', NULL, '#', 'fas fa-laptop', 17, 'active'),
(80, 'Social Links', 23, 'social_links', 'fa fa-link', 80, 'active'),
(23, 'Edit Site', NULL, '#', 'fas fa-cog', 23, 'active'),
(24, 'Profile', 17, 'profiles', 'far fa-user-circle', 24, 'active'),
(27, 'Email Subscribers', 12, 'email', 'fas fa-envelope-open', 27, 'active'),
(28, 'Queries', NULL, '#', 'fas fa-question', 28, 'active'),
(29, 'Pending', 28, 'pending_queries', 'fas fa-user-circle', 29, 'active'),
(30, 'Responded', 28, 'responded_queries', 'fas fa-question-circle', 30, 'active'),
(33, 'Slider Setup', 23, 'slider_setup', 'fas fa-images', 33, 'active'),
(34, 'Page Setup', 23, 'page_setup', 'fas fa-cogs', 34, 'active'),
(64, 'Push Notifications', 12, 'push_notifications', 'far fa-dot-circle', 64, 'active'),
(68, 'Delivered Orders', 7, 'delivered_orders', 'fas fa-cart-arrow-down', 68, 'active'),
(94, 'Cancelled Orders', 7, 'cancelled_orders', 'fa fa-ban', 94, 'active'),
(105, 'FAQs', 23, 'faq', 'fas fa-question', 105, 'active'),
(106, 'Failed Orders', 7, 'failed_orders', 'fas fa-exclamation-triangle', 106, 'active'),
(107, 'Study Material', NULL, 'study-material', 'fa fa-book', 107, 'active'),
(109, 'Programmes', 108, 'programmes', 'fa fa-stopwatch', 110, 'active'),
(110, 'Courses', 108, 'courses', 'fa fa-book', 110, 'active'),
(108, 'Courses', NULL, '#', 'fa fa-rupee', 108, 'active'),
(111, 'Quiz', NULL, '#', 'fa fa-question-circle', 111, 'active'),
(112, 'Featured Courses', 17, 'featured-courses', 'fa fa-book', 24, 'active'),
(113, 'Topper\'s Reviews', 17, 'reviews', 'fa fa-certificate', 24, 'active'),
(115, 'Why Us?', 17, 'why-us', 'fas fa-question', 24, 'active'),
(116, 'Useful Links', 17, 'useful-links', 'fa fa-list', 24, 'active'),
(117, 'Live Class', 122, 'liveclass', 'fa fa-calendar-check-o', 113, 'active'),
(118, 'Teachers', NULL, 'teachers', 'fa fa-user-circle', 112, 'active'),
(119, 'Quiz Results', NULL, '#', 'fa fa-file-text', 114, 'active'),
(120, 'Evaluated Quiz', 119, 'evaluatedquiz', 'fa fa-check-circle', 114, 'active'),
(121, 'Non-Evaluated', 119, 'quizmarks', 'fa fa-times', 114, 'active'),
(122, 'Classes', NULL, '#', 'fa fa-calendar', 113, 'active'),
(123, 'Past Live Class', 122, 'pastliveclass', 'fa fa-calendar-times-o', 113, 'active'),
(124, 'Prelims Quiz', 111, 'quiz/prelims', 'fa fa-question-circle', 111, 'active'),
(125, 'Mains Quiz', 111, 'quiz/mains', 'fa fa-question-circle', 65535, 'active'),
(126, 'Daily Quiz', 111, 'quiz/dailyquiz', 'fa fa-question-circle', 65536, 'active'),
(127, 'Previous Year Quiz', NULL, '#', 'fa fa-question-circle', 65537, 'active'),
(128, 'Mains', 127, 'previousquiz/mains', 'fa fa-question-circle', 65538, 'active'),
(129, 'Prelims', 127, 'previousquiz/prelims', 'fa fa-question-circle', 65539, 'active'),
(130, 'Pending Quiz', 119, 'pendingquiz', 'fa fa-check-circle', 114, 'active'),
(134, 'Students', NULL, '#', 'fa fa-check-circle', 114, 'active'),
(135, 'All Students', 134, 'students/all', 'fa fa-check-circle', 114, 'active'),
(136, 'Students Course', 134, 'students/course', 'fa fa-check-circle', 114, 'active'),
(137, 'Students Program', 134, 'students/program', 'fa fa-check-circle', 114, 'active'),
(138, 'Articles', NULL, '#', 'fa fa-check-circle', 116, 'active'),
(139, 'All', 138, 'article/all', 'fa fa-check-circle', 116, 'active'),
(140, 'Pending', 138, 'article/pending', 'fa fa-check-circle', 116, 'active'),
(141, 'Approved', 138, 'article/approved', 'fa fa-check-circle', 116, 'active'),
(142, 'Rejected', 138, 'article/rejected', 'fa fa-check-circle', 116, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `customer_navbar_corresponding_pages`
--

CREATE TABLE `customer_navbar_corresponding_pages` (
  `id` int(11) NOT NULL,
  `navbar_id` int(11) NOT NULL,
  `link` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_navbar_corresponding_pages`
--

INSERT INTO `customer_navbar_corresponding_pages` (`id`, `navbar_id`, `link`) VALUES
(3, 1, 'ajax_admin'),
(4, 4, 'ajax_admin'),
(5, 8, 'view'),
(6, 9, 'view'),
(7, 10, 'return_view'),
(9, 13, 'ajax_admin'),
(10, 21, 'ajax_admin'),
(11, 32, 'view'),
(15, 44, 'ajax_stock'),
(16, 45, 'ajax_stock'),
(17, 46, 'payment_ajax'),
(23, 4, 'product_view'),
(20, 50, 'ajaxupdate'),
(21, 50, 'ajax_bill'),
(22, 52, 'offline_ajax'),
(24, 4, 'add_product'),
(25, 74, 'get-mass-data'),
(26, 76, 'additional_services_ajax');

-- --------------------------------------------------------

--
-- Table structure for table `documents_upload`
--

CREATE TABLE `documents_upload` (
  `id` bigint(50) NOT NULL,
  `src` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `documents_upload`
--

INSERT INTO `documents_upload` (`id`, `src`) VALUES
(2807, '36127-6050a2ea2b407-048.jpg'),
(2808, '46323-6050a2ea34fe2-100.jpg'),
(2809, '60918-6050c86883584-ple.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `dynamic_pages`
--

CREATE TABLE `dynamic_pages` (
  `id` int(11) NOT NULL,
  `parent_id` text DEFAULT NULL COMMENT 'ID FROM THE SAME TABLE, OR PRELIMS/MAINS/IMP',
  `page_name` varchar(45) NOT NULL,
  `title` varchar(200) NOT NULL,
  `page_data` longtext NOT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_keyword` text DEFAULT NULL,
  `meta_description` longtext DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `file` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dynamic_pages`
--

INSERT INTO `dynamic_pages` (`id`, `parent_id`, `page_name`, `title`, `page_data`, `meta_title`, `meta_keyword`, `meta_description`, `status`, `file`) VALUES
(2, NULL, 'about-us', 'About Us', '&lt;p&gt;About Us&lt;/p&gt;', NULL, NULL, NULL, 'active', ''),
(21, 'imp', 'imp-news-one', 'Some Important News', '&lt;h3&gt;&lt;s&gt;&lt;em&gt;&lt;strong&gt;This is just a demo news here.&lt;/strong&gt;&lt;/em&gt;&lt;/s&gt;&lt;/h3&gt;', NULL, NULL, NULL, 'active', ''),
(10, '20', 'termsandconditions', 'Terms and Conditions', 'Terms and Conditions', NULL, NULL, NULL, 'active', ''),
(8, '20', 'privacypolicy', 'Privacy Policy', 'Privacy Policy', NULL, NULL, NULL, 'active', ''),
(20, NULL, '#', 'Others', 'others', NULL, NULL, NULL, 'active', ''),
(23, 'prelims', 'Prelims-dynamic', 'prelims dynamic', '&lt;h1&gt;Will Get Updated Soon&lt;/h1&gt;', NULL, NULL, NULL, 'active', ''),
(24, '24', 'mains', 'Mains', '&lt;h1&gt;Will Get Updated Soon&lt;/h1&gt;', NULL, NULL, NULL, 'active', ''),
(25, NULL, '', 'Blogs', '<h1>Will Get Updated Soon</h1>', NULL, NULL, NULL, 'active', ''),
(26, '25', 'blog-1', 'blog1', '&lt;h1&gt;Will Get Updated Soon&lt;/h1&gt;', NULL, NULL, NULL, 'active', 'uploads/Screenshot (676).1623920867.png');

-- --------------------------------------------------------

--
-- Table structure for table `email_sent`
--

CREATE TABLE `email_sent` (
  `id` bigint(50) NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `receivers` int(11) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `email_subscribe`
--

CREATE TABLE `email_subscribe` (
  `id` int(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_subscribe`
--

INSERT INTO `email_subscribe` (`id`, `email`) VALUES
(3, 'oberoigaurav317@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`) VALUES
(31, 'First Question', 'Answer1'),
(32, 'Second Question', 'Answer2');

-- --------------------------------------------------------

--
-- Table structure for table `featured_courses`
--

CREATE TABLE `featured_courses` (
  `id` bigint(50) NOT NULL,
  `course_id` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `featured_courses`
--

INSERT INTO `featured_courses` (`id`, `course_id`) VALUES
(34, 3),
(35, 2);

-- --------------------------------------------------------

--
-- Table structure for table `forgot_pass`
--

CREATE TABLE `forgot_pass` (
  `id` bigint(50) NOT NULL,
  `email` text NOT NULL,
  `token` text NOT NULL,
  `md5Token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forgot_pass`
--

INSERT INTO `forgot_pass` (`id`, `email`, `token`, `md5Token`) VALUES
(19, 'rashikhatri0013@gmail.com', '037SGN5JS', '74435aab611b6368bea493cb347554d3');

-- --------------------------------------------------------

--
-- Table structure for table `input_values`
--

CREATE TABLE `input_values` (
  `id` int(50) NOT NULL,
  `option_id` int(50) NOT NULL,
  `option_value` varchar(100) NOT NULL,
  `sort_order` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `input_values`
--

INSERT INTO `input_values` (`id`, `option_id`, `option_value`, `sort_order`) VALUES
(10, 3, 'Small', 0),
(11, 3, 'Medium', 0),
(12, 3, 'Large', 0),
(13, 1, 'Male', 0),
(14, 1, 'Female', 0),
(17, 2, 'D1', 0),
(18, 2, 'D2', 0),
(20, 6, 'check', 0),
(21, 6, 'check', 0),
(24, 8, 'alpha', 0),
(25, 8, 'beta', 0);

-- --------------------------------------------------------

--
-- Table structure for table `live_class`
--

CREATE TABLE `live_class` (
  `id` bigint(50) NOT NULL,
  `type` text NOT NULL,
  `course_or_prg` text NOT NULL,
  `teacher` text NOT NULL,
  `date` text NOT NULL,
  `time` text NOT NULL,
  `recording_url` text NOT NULL,
  `presenting_url` text NOT NULL,
  `class_id` text NOT NULL,
  `class_title` text NOT NULL,
  `end_time` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `live_class`
--

INSERT INTO `live_class` (`id`, `type`, `course_or_prg`, `teacher`, `date`, `time`, `recording_url`, `presenting_url`, `class_id`, `class_title`, `end_time`, `status`) VALUES
(35, 'course', '3', '2', '2021-05-12', '00:23', 'https://www.wiziqxt.com//class/recording.aspx?Gm7apshIUPkY5tc2QDg6%2fHeAWg4DN9S0En0exkHX1nwSZRHqlQAlxSnt9%2b6BJZTfg%2b8DMLal195jfAbnc%2biYGg%3d%3d', 'https://backend.wiziqxt.com/landing/session/v1/8306c27963056ee061ae10cd9fd4c19f9a799b7422d605a30405e69110808f57/p?hash=MjQ5MjA0MDpmZDk4YWQ3MzQ2MDljOGFhZjU5OGE3ZDdhZTY2YTdiOTVhYzYzMGE3ZTQ3MDkzYWQ=', '2492040', 'test class', '00:24:47', 2),
(36, 'course', '3', '2', '2021-05-12', '00:38', 'https://www.wiziqxt.com//class/recording.aspx?Gm7apshIUPkY5tc2QDg6%2fGQB8C7exY4DXIkJ6%2bgzdT7ORUbW9kVj5XF5%2bhtWP5jE%2bs7xUez4UJZ%2b9UIqIf%2bMWw%3d%3d', 'https://backend.wiziqxt.com/landing/session/v1/b20f114951f0478d09906f7aa26dfe0c2b3666edaa24afdd150aeaf3d037b469/p?hash=MjQ5MjA0NDo5OTVmM2Q3NDMzNDM5YmIwZjkyZGM0YWJjYmQ4YzRiZjE4OTBhZmNkZDJkNmI3MTA=', '2492044', 'test', '00:38:15', 2),
(45, 'program', '2', '1', '2021-05-13', '13:07', 'https://www.wiziqxt.com//class/recording.aspx?Gm7apshIUPkY5tc2QDg6%2fAtncb5yBkZjGnFsAIt7Tez4TI6SkHkYM5ikl9P4cohfOJuRywSXvTRHS822gNBjbg%3d%3d', 'https://backend.wiziqxt.com/landing/session/v1/898a04d254044bf191026d958478fe92ff990b917f6b3805a1e603829c9a7bd3/p?hash=MjQ5Mjg2NDo2ZThiMzhlZTllNTY2YzY1MzlhOGNlNzZhM2MxYjQ1NGM3MzM1NzY0NjJhMjhmOTE=', '2492864', 'test', '', 1),
(51, 'course', '3', '2', '2021-05-12', '17:50', 'https://www.wiziqxt.com//class/recording.aspx?Gm7apshIUPkUK%2bYQiUGr%2fbgBfG1lW82cqpkSRD2pgYg98C%2b5R%2bARkhd219mqHQChKd5UZFLfMXkj4i%2fmnk30KQ%3d%3d', 'https://backend.wiziqxt.com/landing/session/v1/b19e7b78d07c82aba7f41bf7043316f84a5f93fdf8fd6de09d2633f034460ec7/p?hash=MjQ5MzI0MTpkZGM1NWQ3N2VkNjc1YzYxZmE4Y2MyZjVlZjM3ZDViZDVmZGY5YmMyYjA1NjIwNzE=', '2493241', 'test class', '17:51:54', 2),
(52, 'program', '4', '2', '2021-05-15', '15:15', 'https://www.wiziqxt.com//class/recording.aspx?Gm7apshIUPn%2f9onah6ffwAJozCw%2bCESu1anKx2vxD65g8hAxA5%2f%2bX17Ef6x6YGWk7G0aj21l%2bbPO2SXbR255aQ%3d%3d', 'https://backend.wiziqxt.com/landing/session/v1/0f375b327084270596d209d0859f394055190099aedfc4fd4a9844b02cebe16e/p?hash=MjQ5NjczODo3MjRlNTA0OGM3NjlkM2ZkZmVlNDliYzI5ODRjMGY0N2RiMmVjNzY4YjFmMzk1YjM=', '2496738', 'test', '', 1),
(53, 'course', '3', '2', '2021-05-22', '06:44', 'https://www.wiziqxt.com//class/recording.aspx?Gm7apshIUPn%2f9onah6ffwABPvIBy884bhKXYvqb6uRcqCJfF%2ffdnal6jpF7MJcTZMJVvLUN25xCnhcpZUQ8Kiw%3d%3d', 'https://backend.wiziqxt.com/landing/session/v1/c779cac9edad0209099b0289394d1f383b35eeab08738b4d41a30cc056d4d49e/p?hash=MjQ5Njc2NTowMzQ5NDA0OTYwZjg0Yzc1ZjQ5MzE5ZWVmZDUxN2VjNzI2MGRhNzZjYTYwZjNlZTI=', '2496765', 'test', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(50) NOT NULL,
  `image` text NOT NULL,
  `name` text NOT NULL,
  `link` text NOT NULL,
  `parent` text NOT NULL,
  `sort_order` int(11) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `image`, `name`, `link`, `parent`, `sort_order`, `status`) VALUES
(1, '98579-604851472b0ea-ies.jpg', 'Prelims', 'Prelims', 'None', 1, 'Active'),
(2, '70171-60485242d65fe-on6.png', 'Main', 'Main', 'None', 2, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `navbarheadings`
--

CREATE TABLE `navbarheadings` (
  `id` bigint(20) DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `navbar_access`
--

CREATE TABLE `navbar_access` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `navbar_id` int(11) NOT NULL,
  `access` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications_sent`
--

CREATE TABLE `notifications_sent` (
  `id` bigint(50) NOT NULL,
  `title` text NOT NULL,
  `redirection_link` text NOT NULL,
  `message` text NOT NULL,
  `receivers` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications_sent`
--

INSERT INTO `notifications_sent` (`id`, `title`, `redirection_link`, `message`, `receivers`) VALUES
(1, 'aa', 'aa', 'aa', 17),
(2, '', 'https://webixun.com', 'aa', 5);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `Type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `name`, `Type`) VALUES
(1, 'Select', 'select'),
(2, 'Checkbox', 'checkbox'),
(3, 'Size', 'text'),
(5, 'Color', 'checkbox'),
(6, 'Limit', 'checkbox'),
(7, 'Size1', 'checkbox'),
(8, 'Extras', 'checkbox'),
(9, 'Quantity', 'select');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(50) NOT NULL,
  `order_id` text NOT NULL,
  `agent_id` bigint(50) DEFAULT NULL,
  `l_c_id` bigint(50) DEFAULT NULL,
  `u_id` bigint(50) DEFAULT NULL,
  `order_amount` double NOT NULL,
  `time_statmpts` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `total_amount` double NOT NULL DEFAULT 0,
  `discount` double NOT NULL DEFAULT 0,
  `order_status` text NOT NULL,
  `time_slot` text NOT NULL,
  `time_slot_type` text NOT NULL,
  `payment_mode` text NOT NULL,
  `shipping_address` text NOT NULL,
  `shipping_charge` double NOT NULL,
  `description` text DEFAULT NULL,
  `delivery_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `o_id` bigint(50) NOT NULL,
  `timestamps` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `action` varchar(100) NOT NULL,
  `update_by` varchar(100) NOT NULL,
  `customer_notified` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL,
  `o_id` bigint(50) NOT NULL,
  `p_id` int(50) NOT NULL,
  `product_quantity` int(50) NOT NULL,
  `product_quantity_type` text NOT NULL,
  `product_price` double NOT NULL,
  `order_item_status` varchar(50) NOT NULL,
  `p_options` varchar(50) DEFAULT NULL,
  `cleaning_charge` int(11) NOT NULL DEFAULT 0,
  `cutting_charge` int(11) NOT NULL DEFAULT 0,
  `cancel_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_item_options`
--

CREATE TABLE `order_item_options` (
  `id` int(10) NOT NULL,
  `order_item_id` int(10) NOT NULL,
  `option_name` varchar(50) NOT NULL,
  `option_value` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `status_name`) VALUES
(7, 'Confirmed/In Process'),
(8, 'Packed'),
(9, 'On The Way'),
(10, 'Delivered'),
(11, 'Cancel');

-- --------------------------------------------------------

--
-- Table structure for table `participated_quiz`
--

CREATE TABLE `participated_quiz` (
  `id` bigint(50) NOT NULL,
  `q_id` bigint(50) NOT NULL,
  `u_id` bigint(50) NOT NULL,
  `quiz_type` text NOT NULL,
  `status` int(11) NOT NULL,
  `points_obtained` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `participated_quiz`
--

INSERT INTO `participated_quiz` (`id`, `q_id`, `u_id`, `quiz_type`, `status`, `points_obtained`) VALUES
(38, 6, 88, 'mains', 3, 0),
(39, 26, 287, 'mains', 2, 0),
(40, 29, 287, 'mains', 2, 0),
(41, 32, 287, 'mains', 2, 0),
(42, 28, 287, 'mains', 1, 0),
(43, 35, 287, 'mains', 1, 0),
(44, 36, 287, 'mains', 3, 0),
(45, 27, 287, 'mains', 1, 0),
(46, 42, 287, 'dailyquiz', 3, 22),
(47, 43, 287, 'mains', 3, 0),
(48, 44, 287, 'prelims', 3, 0),
(49, 41, 287, 'dailyquiz', 3, 0),
(50, 41, 287, 'dailyquiz', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment_log`
--

CREATE TABLE `payment_log` (
  `id` bigint(20) NOT NULL,
  `txn_id` varchar(50) NOT NULL,
  `o_id` bigint(55) NOT NULL,
  `amount` varchar(55) NOT NULL,
  `status` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_log`
--

INSERT INTO `payment_log` (`id`, `txn_id`, `o_id`, `amount`, `status`) VALUES
(84, '1567856675293F46', 141, '125', 'pending'),
(85, '156827367388J46', 155, '125', 'pending'),
(86, '1575020963122J52', 170, '856', 'pending'),
(87, '1575021026917G52', 171, '856', 'pending'),
(88, '157554289080D52', 172, '917', 'pending'),
(89, '1575545110764R52', 173, '175', 'pending'),
(90, '1575545663169C52', 174, '175', 'pending'),
(91, '1575545767686K52', 175, '175', 'pending'),
(92, '1575546167751N52', 176, '175', 'pending'),
(93, '1575553780811R52', 177, '236', 'pending'),
(94, '1575553799485G52', 178, '236', 'Sucess'),
(95, '1575553974698O52', 179, '200', 'failed'),
(96, '1575554175877W52', 180, '129', 'pending'),
(97, '1575554193860Y52', 181, '129', 'pending'),
(98, '1575554247783M52', 182, '129', 'failed'),
(99, '1575555657983X52', 183, '169', 'failed'),
(100, '1575555998420N52', 184, '60', 'Sucess'),
(101, '1575561886253S53', 186, '123', 'Sucess'),
(102, '1575567065988C53', 187, '108', 'failed'),
(103, '1575630764155G53', 188, '225', 'Sucess'),
(104, '1575630989298N53', 189, '108', 'Sucess'),
(105, 'bba1d155ac8043deb798aa0376c93bf9', 208, '22.5', 'pending'),
(106, 'ab21395985b3474384ed96eed700f4d3', 209, '37.5', 'success'),
(107, '9c4d9a173ee14feeaf7fde508d712770', 210, '37.5', 'success'),
(108, '205b102b90674205b118b170e08f9a33', 211, '52.5', 'pending'),
(109, '475953b42bd449e7a015fd64b658bca6', 212, '37.5', 'success'),
(110, '2b90b67aa672429abe7306783561f411', 213, '335', 'pending'),
(111, '1cffdee4df0046efae5f9af29adaabdc', 248, '190', 'pending'),
(112, '8a66587363954677930a9396a6140c94', 286, '120', 'pending'),
(113, '98ded05a97b34a2c888a1883e37bd7c1', 291, '110', 'pending'),
(114, '782d3b449102459789370a32a0f0ef36', 292, '200', 'pending'),
(115, '1d972e5842a64b09961785b4ebdb297f', 296, '110', 'pending'),
(116, '2a09d7a2837a46a5960109dec9c42e28', 297, '142.5', 'pending'),
(117, '26a25996c41f4fd38ed4dff02ca0df40', 1001, '407.5', 'pending'),
(118, '131c6047024849a092f416be711f26e3', 1002, '22.5', 'pending'),
(119, 'efcef10afc2c4a5dbfa032ea3fa9032d', 1003, '30', 'pending'),
(120, '7ae05e00796441de9ac9081de21a5c4a', 1004, '30', 'pending'),
(121, '5cb7c4e1239542ef8bed3e4a50e10a52', 1070, '22.5', 'pending'),
(122, '74a8ba04ce7e4618a8d0a2c42586b589', 1073, '22.5', 'pending'),
(123, 'bccbf471f78648fda941114ff0be2efc', 1082, '1233', 'pending'),
(124, '502aeba2c80345cab9c8474eb62f0a72', 1083, '1233', 'pending'),
(125, '0f33e4f9c7814fe1829c6b1e746cf99c', 1085, '240', 'pending'),
(126, 'af2accd3a4d241f1bffc2d5f78a67f05', 1087, '22.5', 'pending'),
(127, '292fde62e29c4c598b8e19bc98ab274c', 1105, '22.5', 'pending'),
(128, '0f830fa815ec4ca1beb0671f05fc4788', 1119, '290', 'pending'),
(129, '8fb65559e66a445eb383f55e2c1733d4', 1120, '270', 'pending'),
(130, '750818e0d20d407ab9fc040c694b02e9', 1121, '190', 'pending'),
(131, '7e407b2a5fed4946bac2db2ac480c8fe', 1136, '270', 'success'),
(132, '4c3b9611b3514e7fbc8896ebf0966baf', 1137, '30', 'pending'),
(133, 'b16393a789dd44f8badda4c9046dc3de', 1138, '30', 'pending'),
(134, 'e50348cd6eb84b64b20979304df05fe0', 1139, '30', 'pending'),
(135, 'bd3b3da7a7314eff8f5abe4a50af6acd', 1141, '30', 'pending'),
(136, '8d7da18b072b4bbbab424a060fda6939', 1142, '30', 'pending'),
(137, 'f4e7771a0cc34ebab375c4bc56b80b5b', 1143, '395', 'pending'),
(138, '04e37e376fb14f839339b00963e4aa76', 1144, '30', 'pending'),
(139, '1d9179df035a494a9bef0374af6b1e1a', 1145, '30', 'pending'),
(140, '94863c7b519848ce9311cf0b63971a6d', 1146, '395', 'pending'),
(141, '08653fc590264d34a40751fd244a00a2', 1147, '395', 'pending'),
(142, 'a32e8e82a5aa4e4abf6ce2da35129f8c', 1148, '395', 'success'),
(143, '3d9fb6305a964f39a19272d98eb680ea', 1149, '395', 'pending'),
(144, '962367141b144ebcbca4a4a90b6641f7', 1150, '30', 'pending'),
(145, '33c36e70824a4a64928bdc888b7cc40a', 1151, '30', 'pending'),
(146, '48dbb132b12a41f7837eae9b659db19b', 1152, '30', 'pending'),
(147, '5517eedff63645a78dba379860f71513', 1153, '30', 'success'),
(148, '0512479b85a545d4a63298939da2e721', 1154, '30', 'pending'),
(149, '6af65158a7f84f49994d53c957c1f044', 1155, '30', 'pending'),
(150, '7cadaff4c79e41798acf5dce391e4612', 1156, '30', 'success'),
(151, 'b489b08231b34136a5d0581153cb97d7', 1157, '30', 'pending'),
(152, '30be7c1e0fdc4e97b004b44b9dcd2095', 1158, '42.5', 'pending'),
(153, '4025e359f1c54af88c3c43a9d87800a3', 1159, '30', 'success'),
(154, 'ad2a7625f4444c0c88a93e993bd425a4', 1168, '1006', 'pending'),
(155, 'de5dbc2121094322bc7339b9717bf067', 1169, '596.94', 'success'),
(156, '595033a8256848fe97209442042fe9d2', 1175, '25', 'pending'),
(157, 'dc4630e6492f467ca22e778e50b33497', 1222, '190', 'success'),
(158, '4649080049924f5ca1df48408e9339cf', 1260, '1605', 'pending'),
(159, '9788976653dd4cdd80ce97e2040836d2', 1264, '1500', 'pending'),
(160, '30fc43171de44c6aabb66b661463409d', 1273, '714', 'pending'),
(161, '039ac86a5e424b9394a8a651b51962df', 1321, '830', 'pending'),
(162, 'd7866ea787764b9c8e095d01758f5332', 1361, '280', 'pending'),
(163, '1e94c05fd0a0428684684e165239bd72', 1428, '440', 'success'),
(164, '45f5a069051548bb94729375bd091abc', 1479, '146', 'success'),
(165, '561d31b452bc4ea98b431390765624bb', 1544, '24', 'pending'),
(166, '80e840745c2a4ac296de10d51cc71c32', 1626, '850', 'pending'),
(167, '4637c85e2463442bad7417bfebc829a8', 1648, '208', 'pending'),
(168, '9de74dde50504f8187b4e46387519530', 1666, '707', 'pending'),
(169, 'e3213c3fc0fc498485998bc1ddf8a2a3', 1674, '765', 'pending'),
(170, '40bd60d56a55492997d0f0c2806d6354', 1675, '1141', 'pending'),
(171, '6b4e346259bc43b9babc8dafec1a9934', 1680, '25', 'pending'),
(172, 'f3d2996858bb46eeba2b4bc107afa76e', 1682, '723', 'pending'),
(173, 'a07df9c05b2f4368898868799d74f17f', 1683, '717', 'pending'),
(174, 'eae4d7f260db47578359b300a8843bd6', 1809, '800', 'pending'),
(175, '6680adb18c3041acadbc41688575ed3c', 1852, '205', 'pending'),
(176, '48064bac9e14473abce723724130b5bb', 1856, '460', 'success'),
(177, '25ffa06089734d7cb73e4b5d86d3db5e', 1859, '1267', 'pending'),
(178, '7e06859a421a49c7a8eec5cf8173c575', 1864, '235', 'success'),
(179, '53e4e22cbe09477e87f65d47f7820d86', 1870, '220', 'pending'),
(180, '126c356ff6f3480c85a8c6c7b5c34cd2', 1915, '450', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `payment_options`
--

CREATE TABLE `payment_options` (
  `id` int(11) NOT NULL,
  `p_option` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `previousquiz`
--

CREATE TABLE `previousquiz` (
  `id` bigint(50) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `title` text NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `previousquiz_que`
--

CREATE TABLE `previousquiz_que` (
  `id` bigint(50) NOT NULL,
  `p_id` bigint(50) NOT NULL,
  `file` text NOT NULL,
  `questions` text NOT NULL,
  `option1` text NOT NULL,
  `option2` text NOT NULL,
  `option3` text NOT NULL,
  `option4` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programs_and_courses`
--

CREATE TABLE `programs_and_courses` (
  `id` bigint(50) NOT NULL,
  `image` text NOT NULL,
  `name` text NOT NULL,
  `link` text NOT NULL,
  `type` varchar(50) NOT NULL COMMENT 'program, course',
  `description` text NOT NULL,
  `fees` double NOT NULL,
  `tax_per` double NOT NULL,
  `starting_from` date NOT NULL,
  `sample_video` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `schedule_pdf` text DEFAULT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `programs_and_courses`
--

INSERT INTO `programs_and_courses` (`id`, `image`, `name`, `link`, `type`, `description`, `fees`, `tax_per`, `starting_from`, `sample_video`, `status`, `schedule_pdf`, `added_on`, `updated_on`) VALUES
(1, 'xyz.png', 'First Program', 'first-program', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 5000, 18, '2021-03-31', NULL, 'delete', NULL, '2021-03-18 13:47:47', '2021-05-12 10:01:45'),
(2, '16155-6053797a0cb43-100.jpg', 'GEOGRAPHY OPTIONAL (e-Classroom Learning Program) 2021 and MAINS TEST SERIES 2021', 'geography-optional', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 15000, 12, '2021-04-01', '15156-605367332af1e-deo.mp4', 'active', '14413-6053673326f9f-ple.pdf', '2021-03-18 14:44:03', '2021-06-17 03:15:09'),
(3, '76245-6053815e7a6de-336.jpg', 'First Course', 'first-course', 'course', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 1500, 18, '2021-04-01', '15156-605367332af1e-deo.mp4', 'delete', NULL, '2021-03-18 16:35:42', '2021-06-17 03:19:02'),
(4, '88278-60bd0fae907ca-orn.jpg', 'test Programes34', 'test-programes', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 12600, 13, '2021-12-01', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-05-02 18:41:42', '2021-06-17 03:17:29'),
(5, '20529-609a310d301b2-62).png', 'course 2', 'course-2', 'course', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 12121, 12, '2021-05-12', '15156-605367332af1e-deo.mp4', 'delete', NULL, '2021-05-11 07:23:23', '2021-06-17 03:17:34'),
(6, '23928-609fbc76d7684-nut.jpg', 'test', 'test', 'course', '<p>dummy</p>\n', 123, 0, '2021-05-16', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-05-15 12:20:06', '2021-06-17 03:17:37'),
(7, '23928-609fbc76d7684-nut.jpg', 'checkfree', 'checkfree', 'course', '\r\n<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 0, 0, '2021-05-22', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-05-23 09:25:39', '2021-06-17 06:47:38'),
(8, '76245-6053815e7a6de-336.jpg', 'check free prg', 'check-free-prg', 'program', '<p>test description</p><p><em><strong>This is a demo description changed again</strong></em></p>\r\n\r\n', 0, 0, '2021-05-21', '15156-605367332af1e-deo.mp4', 'delete', NULL, '2021-05-23 09:26:41', '2021-06-17 03:19:23'),
(9, '60064-60bc5ec25182e-_49.png', 'Btech CSE', 'btech', 'course', '<p>Helllo this is test description</p>\r\n<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 500, 12, '2021-06-05', '15156-605367332af1e-deo.mp4', 'delete', NULL, '2021-06-06 05:36:02', '2021-06-17 03:19:34'),
(10, '64926-60bc60a3d8858-1).jpeg', 'Btech Prg Test', 'prg-test', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 1500, 11, '2021-06-05', '15156-605367332af1e-deo.mp4', 'delete', NULL, '2021-06-06 05:44:03', '2021-06-17 03:19:39'),
(11, '76830-60bc612b86594-am.jpeg', 'Tech Corse free', 'tech-corse-paid', 'course', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 0, 0, '2021-06-05', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 05:46:19', '2021-06-17 03:19:44'),
(12, '99175-60bd0f8935dd4-pm.jpeg', 'Tech Course paid', 'tech-course-paid', 'course', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 334, 0, '2021-06-06', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 05:46:56', '2021-06-17 03:19:48'),
(13, '22261-60bc618b75faf-1).jpeg', 'Tech Prg Free', 'tech-prg-free', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 0, 0, '2021-06-06', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 05:47:55', '2021-06-17 03:20:10'),
(14, '24265-60bd10901fd05-x.jpg', 'Tech Prg Paid', 'tech-prg-paid', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 123, 3, '2021-06-04', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 05:48:24', '2021-06-17 03:18:45'),
(15, '36117-60bd0ffe04beb-_14.png', 'free check 2', 'free-check-2', 'course', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 0, 0, '2021-06-05', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 18:12:14', '2021-06-17 03:19:52'),
(16, '90247-60bd102350287-ash.jpg', 'paid check 2', 'paid-check-2', 'course', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 0, 0, '2021-06-04', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 18:12:51', '2021-06-17 03:19:56'),
(17, '14047-60bd1049dbb74-ash.jpg', 'free prg check 2', 'free-prg-check-2', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 0, 0, '2021-06-04', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 18:13:29', '2021-06-17 03:19:59'),
(18, '50849-60bd10767af0a-my.png', 'paid prg check 2', 'paid-prg-check-2', 'program', '<p><em><strong>This is a demo description changed again</strong></em></p>\r\n', 23, 2, '2021-06-04', '15156-605367332af1e-deo.mp4', 'active', NULL, '2021-06-06 18:14:14', '2021-06-17 03:20:04');

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `id` bigint(50) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `subject` text NOT NULL,
  `contact` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `response` text DEFAULT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'Pending',
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `responded_on` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`id`, `name`, `email`, `subject`, `contact`, `message`, `response`, `status`, `time_stamp`, `responded_on`) VALUES
(4, 'Test', 'test@aa.com', 'demo', '8528528526', 'Testing', 'This is testing', 'responded', '2020-02-09 12:33:22', '2020-02-09'),
(5, 'Test', 'test@aa.com', 'demo', '8528528526', 'Testing', 'This is testing', 'pending', '2020-02-09 12:33:22', '2020-02-09');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` bigint(50) NOT NULL,
  `title` text NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'prelims' COMMENT 'prelims, mains',
  `description` text NOT NULL,
  `free_under` text DEFAULT NULL COMMENT 'either dynamic_page_id or prelims or mains',
  `total_points` double NOT NULL,
  `media_file` text DEFAULT NULL COMMENT 'applicable in case of Mains Quiz',
  `media_file1` text NOT NULL,
  `media_file2` text NOT NULL,
  `paid_under` bigint(50) DEFAULT NULL COMMENT 'programme/course ID',
  `available_from` date NOT NULL,
  `available_to` date NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `prev_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `title`, `type`, `description`, `free_under`, `total_points`, `media_file`, `media_file1`, `media_file2`, `paid_under`, `available_from`, `available_to`, `added_on`, `updated_on`, `status`, `prev_year`) VALUES
(26, 'jk', 'mains', '<p>452</p>\n', 'prelims', 54, '78126-60b759c6a99cd-(1).pdf', 'B_1918594_RashikaKhatri.1623004202.pdf', 'B23RashikaKhatri.1623004210.pdf', NULL, '2021-06-02', '2021-06-03', '2021-06-02 10:13:26', '2021-06-06 18:30:10', 'active', 0),
(40, 'testing', 'prelims', '<p>hellloooo</p>\n', NULL, 0, NULL, '', '', 18, '2021-06-03', '2021-06-30', '2021-06-06 16:49:03', '2021-06-06 18:41:59', 'active', 1),
(41, 'Daily quiz check', 'dailyquiz', '<p>testing daily quiz</p>\n', 'prelims', 567, NULL, '', '', NULL, '2021-06-04', '2021-06-17', '2021-06-06 18:17:57', '2021-06-06 18:17:57', 'active', 0),
(43, 'test mains', 'mains', '<p>tets</p>\n', 'prelims', 12, '32455-60bd15784e08c-tri.pdf', '37288-60bd15785020e-tri.pdf', '60496-60bd157852306-i_h.pdf', NULL, '2021-06-01', '2021-06-30', '2021-06-06 18:35:36', '2021-06-06 18:35:36', 'active', 0),
(44, 'test prem', 'prelims', '<p>cvbn</p>\n', 'prelims', 48, NULL, '', '', NULL, '2021-06-04', '2021-07-02', '2021-06-06 18:43:27', '2021-06-06 18:43:27', 'active', 0),
(46, 'test', 'mains', '<p>dfgh</p>\n', NULL, 0, '73187-60bd221d518c4-tri.pdf', '', '', 0, '0000-00-00', '0000-00-00', '2021-06-06 19:29:33', '2021-06-06 19:29:47', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_options`
--

CREATE TABLE `quiz_options` (
  `id` bigint(50) NOT NULL,
  `question_id` bigint(50) NOT NULL,
  `option_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quiz_options`
--

INSERT INTO `quiz_options` (`id`, `question_id`, `option_value`) VALUES
(25, 7, 'a'),
(26, 7, 'b'),
(27, 7, 'c'),
(28, 7, 'd'),
(29, 8, 'a'),
(30, 8, 'c'),
(31, 8, 'c'),
(32, 8, 'd'),
(101, 26, '1'),
(102, 26, '2'),
(103, 26, '3'),
(104, 26, '4'),
(109, 28, 'qq'),
(110, 28, 'ss'),
(111, 28, 'cc'),
(112, 28, 'vv'),
(129, 33, '1'),
(130, 33, 'c'),
(131, 33, 'cc'),
(132, 33, 'e'),
(133, 34, '2'),
(134, 34, '4'),
(135, 34, '9'),
(136, 34, '5');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` bigint(50) NOT NULL,
  `quiz_id` bigint(50) NOT NULL,
  `question` text NOT NULL,
  `correct_answer` text DEFAULT NULL COMMENT 'applicable in case of MCQ',
  `explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question`, `correct_answer`, `explanation`) VALUES
(7, 22, 'test', '3', ''),
(8, 23, 'que1', '3', ''),
(26, 40, 'dcxz', '2', 'testttt'),
(28, 41, 'test question', '2', 'explanationfgv'),
(33, 44, 'que1', '3', 'sdxfcgh'),
(34, 44, 'dsf', '2', '');

-- --------------------------------------------------------

--
-- Table structure for table `return_policy`
--

CREATE TABLE `return_policy` (
  `id` int(50) NOT NULL,
  `max_day` int(5) NOT NULL,
  `charge_day` int(5) NOT NULL,
  `type` varchar(2) NOT NULL,
  `amount` int(10) NOT NULL,
  `policy_content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `return_policy`
--

INSERT INTO `return_policy` (`id`, `max_day`, `charge_day`, `type`, `amount`, `policy_content`) VALUES
(1, 20, 10, 'a', 10, '&lt;p&gt;&lt;strong&gt;Will Be Updated Soon!&lt;/strong&gt;&lt;/p&gt;');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(50) NOT NULL,
  `name` text NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `name`, `title`, `image`, `description`, `added_on`) VALUES
(2, 'Demo', 'topper', '81183-605ac8a1dc8a9-800.jpg', 'Best Institute', '2021-03-24 05:05:37');

-- --------------------------------------------------------

--
-- Table structure for table `shop_details`
--

CREATE TABLE `shop_details` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `logo` text DEFAULT NULL,
  `icon` text NOT NULL,
  `contact` varchar(50) NOT NULL,
  `alternate_contact` varchar(11) DEFAULT NULL,
  `applink` text DEFAULT NULL,
  `admin_pic` text DEFAULT NULL,
  `website_status` varchar(50) NOT NULL,
  `cod` varchar(45) NOT NULL DEFAULT 'Enable',
  `gstin` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `pin` int(7) NOT NULL,
  `technical_contact` text DEFAULT NULL,
  `technical_email` text DEFAULT NULL,
  `cleaning_charges` int(11) NOT NULL COMMENT 'Is According To 1 KG'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shop_details`
--

INSERT INTO `shop_details` (`id`, `name`, `email`, `address`, `logo`, `icon`, `contact`, `alternate_contact`, `applink`, `admin_pic`, `website_status`, `cod`, `gstin`, `state`, `city`, `pin`, `technical_contact`, `technical_email`, `cleaning_charges`) VALUES
(2, 'UPSC', 'upsc@gmail.com', 'Dehradun', 'logo.png', 'logo.png', '8888855555', '9999955555', NULL, 'logo.png', 'Enable', 'Enable', 'WERTYDFGHER4645646', 'Chennai', 'Chennai', 248001, '9898989898', 'tech@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `image` text NOT NULL,
  `sort_order` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `image`, `sort_order`, `status`) VALUES
(103, '1.png', 1, 'active'),
(104, '2.png', 2, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `sms_sent`
--

CREATE TABLE `sms_sent` (
  `id` bigint(50) NOT NULL,
  `message` text NOT NULL,
  `receivers` bigint(50) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sms_sent`
--

INSERT INTO `sms_sent` (`id`, `message`, `receivers`, `time_stamp`) VALUES
(1, 'Test', 50, '2020-02-08 11:23:30'),
(2, 'Test Me', 1, '2020-02-08 14:53:23'),
(3, 'Test Me', 1, '2020-02-08 14:53:42'),
(4, 'Test Me', 1, '2020-02-08 14:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `head` varchar(100) NOT NULL,
  `link` varchar(500) NOT NULL,
  `icon` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `head`, `link`, `icon`) VALUES
(13, 'Facebook', 'https://facebook.com', 'fa-facebook');

-- --------------------------------------------------------

--
-- Table structure for table `statesandcity`
--

CREATE TABLE `statesandcity` (
  `id` int(11) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statesandcity`
--

INSERT INTO `statesandcity` (`id`, `city`, `state`) VALUES
(1, 'Macherla', 'Andhra Pradesh'),
(2, 'Kurnool', 'Andhra Pradesh'),
(3, 'Anantapur', 'Andhra Pradesh'),
(4, 'Dharmavaram', 'Andhra Pradesh'),
(5, 'Penukonda', 'Andhra Pradesh'),
(6, 'Puttaparthi', 'Andhra Pradesh'),
(7, 'Hindupur', 'Andhra Pradesh'),
(8, 'Kalyandurg', 'Andhra Pradesh'),
(9, 'Gorantla', 'Andhra Pradesh'),
(10, 'Madakasira', 'Andhra Pradesh'),
(11, 'Gooty', 'Andhra Pradesh'),
(12, 'Tadipatri', 'Andhra Pradesh'),
(13, 'Singanamala', 'Andhra Pradesh'),
(14, 'Guntakal', 'Andhra Pradesh'),
(15, 'Kadri', 'Andhra Pradesh'),
(16, 'Rayadurg', 'Andhra Pradesh'),
(17, 'Uravakonda', 'Andhra Pradesh'),
(18, 'Kadapa', 'Andhra Pradesh'),
(19, 'Yerraguntla', 'Andhra Pradesh'),
(20, 'Rly Koduru', 'Andhra Pradesh'),
(21, 'Rajampet', 'Andhra Pradesh'),
(22, 'Proddatur', 'Andhra Pradesh'),
(23, 'Pulivendula', 'Andhra Pradesh'),
(24, 'Rayachoti', 'Andhra Pradesh'),
(25, 'Pileru', 'Andhra Pradesh'),
(26, 'Badvel', 'Andhra Pradesh'),
(27, 'Mydukur', 'Andhra Pradesh'),
(28, 'Lakkireddy Palli', 'Andhra Pradesh'),
(29, 'Giddalur', 'Andhra Pradesh'),
(30, 'Jammalamadugu', 'Andhra Pradesh'),
(31, 'Veldurthi', 'Andhra Pradesh'),
(32, 'Chittoor', 'Andhra Pradesh'),
(33, 'Chandragiri', 'Andhra Pradesh'),
(34, 'Irala', 'Andhra Pradesh'),
(35, 'Vayalpad', 'Andhra Pradesh'),
(36, 'Punganur', 'Andhra Pradesh'),
(37, 'Thamballapalle', 'Andhra Pradesh'),
(38, 'Madanepalle', 'Andhra Pradesh'),
(39, 'Venkatagiri Kota', 'Andhra Pradesh'),
(40, 'Palamaner', 'Andhra Pradesh'),
(41, 'Kuppam', 'Andhra Pradesh'),
(42, 'Tirupathi', 'Andhra Pradesh'),
(43, 'Puttur', 'Andhra Pradesh'),
(44, 'Srikalahasti', 'Andhra Pradesh'),
(45, 'Satyavedu', 'Andhra Pradesh'),
(46, 'Nagari', 'Andhra Pradesh'),
(47, 'Venkatagiri', 'Andhra Pradesh'),
(48, 'K V P Puram', 'Andhra Pradesh'),
(49, 'Nandikotkur', 'Andhra Pradesh'),
(50, 'Pattikanda', 'Andhra Pradesh'),
(51, 'Nandyal', 'Andhra Pradesh'),
(52, 'Chiippagiri', 'Andhra Pradesh'),
(53, 'Dhone', 'Andhra Pradesh'),
(54, 'Koilkuntla', 'Andhra Pradesh'),
(55, 'Allagadda', 'Andhra Pradesh'),
(56, 'Yemmiganur', 'Andhra Pradesh'),
(57, 'Adoni', 'Andhra Pradesh'),
(58, 'Mantralayam', 'Andhra Pradesh'),
(59, 'Alur', 'Andhra Pradesh'),
(60, 'Atmakur Kurnool', 'Andhra Pradesh'),
(61, 'Kodumur', 'Andhra Pradesh'),
(62, 'Vijayawada', 'Andhra Pradesh'),
(63, 'Avanigadda', 'Andhra Pradesh'),
(64, 'Machilipatnam', 'Andhra Pradesh'),
(65, 'Kaikaluru', 'Andhra Pradesh'),
(66, 'Gannavaram', 'Andhra Pradesh'),
(67, 'Eluru', 'Andhra Pradesh'),
(68, 'Gudivada', 'Andhra Pradesh'),
(69, 'Nuzvid', 'Andhra Pradesh'),
(70, 'Kankipadu', 'Andhra Pradesh'),
(71, 'Vuyyuru', 'Andhra Pradesh'),
(72, 'Nandigama', 'Andhra Pradesh'),
(73, 'Mylavaram', 'Andhra Pradesh'),
(74, 'Jaggayyapeta', 'Andhra Pradesh'),
(75, 'Tiruvuru', 'Andhra Pradesh'),
(76, 'Mudinepalle', 'Andhra Pradesh'),
(77, 'Bhogapuram', 'Andhra Pradesh'),
(78, 'Guntur', 'Andhra Pradesh'),
(79, 'Prathipadu_Guntur', 'Andhra Pradesh'),
(80, 'Amaravati', 'Andhra Pradesh'),
(81, 'Tadikonda', 'Andhra Pradesh'),
(82, 'Mangalagiri', 'Andhra Pradesh'),
(83, 'Bapatla', 'Andhra Pradesh'),
(84, 'Ponnur', 'Andhra Pradesh'),
(85, 'Tenali', 'Andhra Pradesh'),
(86, 'Chilakaluripet', 'Andhra Pradesh'),
(87, 'Repalle', 'Andhra Pradesh'),
(88, 'Duggirala', 'Andhra Pradesh'),
(89, 'Vinukonda', 'Andhra Pradesh'),
(90, 'Sattenapalle', 'Andhra Pradesh'),
(91, 'Narasaraopet', 'Andhra Pradesh'),
(92, 'Bellamkonda', 'Andhra Pradesh'),
(93, 'Piduguralla', 'Andhra Pradesh'),
(94, 'Dachepalli', 'Andhra Pradesh'),
(95, 'Nekarikallu', 'Andhra Pradesh'),
(96, 'Ongole', 'Andhra Pradesh'),
(97, 'Singarayakonda', 'Andhra Pradesh'),
(98, 'Kandukuru', 'Andhra Pradesh'),
(99, 'Pamur', 'Andhra Pradesh'),
(100, 'Kanigiri', 'Andhra Pradesh'),
(101, 'Chirala', 'Andhra Pradesh'),
(102, 'Parchur', 'Andhra Pradesh'),
(103, 'Addanki', 'Andhra Pradesh'),
(104, 'Markapur', 'Andhra Pradesh'),
(105, 'Martur', 'Andhra Pradesh'),
(106, 'Kondapi', 'Andhra Pradesh'),
(107, 'Podili', 'Andhra Pradesh'),
(108, 'Kavali', 'Andhra Pradesh'),
(109, 'Yerragondapalem', 'Andhra Pradesh'),
(110, 'Cumbum', 'Andhra Pradesh'),
(111, 'Nellore', 'Andhra Pradesh'),
(112, 'Gudur', 'Andhra Pradesh'),
(113, 'Kaligiri', 'Andhra Pradesh'),
(114, 'Sullurpet', 'Andhra Pradesh'),
(115, 'Naidupeta', 'Andhra Pradesh'),
(116, 'Rapur', 'Andhra Pradesh'),
(117, 'Allur', 'Andhra Pradesh'),
(118, 'Udayagiri', 'Andhra Pradesh'),
(119, 'Buchi', 'Andhra Pradesh'),
(120, 'Atmakur', 'Andhra Pradesh'),
(121, 'Muthukuru', 'Andhra Pradesh'),
(122, 'Visakhapatnam', 'Andhra Pradesh'),
(123, 'Pendurthi', 'Andhra Pradesh'),
(124, 'Kothavalasa', 'Andhra Pradesh'),
(125, 'Bheemunipatnam', 'Andhra Pradesh'),
(126, 'Anakapalle', 'Andhra Pradesh'),
(127, 'Chodavaram', 'Andhra Pradesh'),
(128, 'Paderu', 'Andhra Pradesh'),
(129, 'Madugula', 'Andhra Pradesh'),
(130, 'Yelamanchili', 'Andhra Pradesh'),
(131, 'Payakaraopeta', 'Andhra Pradesh'),
(132, 'Narsipatnam', 'Andhra Pradesh'),
(133, 'Koyyuru', 'Andhra Pradesh'),
(134, 'Parvathipuram', 'Andhra Pradesh'),
(135, 'Gudem Kotha Veedhi', 'Andhra Pradesh'),
(136, 'Chintapalle', 'Andhra Pradesh'),
(137, 'Anantagiri', 'Andhra Pradesh'),
(138, 'Komarada', 'Andhra Pradesh'),
(139, 'Therlam', 'Andhra Pradesh'),
(140, 'Srungavarapukota', 'Andhra Pradesh'),
(141, 'Vizianagaram', 'Andhra Pradesh'),
(142, 'Chipurupalle', 'Andhra Pradesh'),
(143, 'Gajapathinagaram', 'Andhra Pradesh'),
(144, 'Srikakulam', 'Andhra Pradesh'),
(145, 'Narasannapeta', 'Andhra Pradesh'),
(146, 'Palakonda', 'Andhra Pradesh'),
(147, 'Amadalavalasa', 'Andhra Pradesh'),
(148, 'Rajam', 'Andhra Pradesh'),
(149, 'Bobbili', 'Andhra Pradesh'),
(150, 'Tekkali', 'Andhra Pradesh'),
(151, 'Pathapatnam', 'Andhra Pradesh'),
(152, 'Palasa', 'Andhra Pradesh'),
(153, 'Sompeta', 'Andhra Pradesh'),
(154, 'Ichapuram', 'Andhra Pradesh'),
(155, 'Ranasthalam', 'Andhra Pradesh'),
(156, 'Kotturu', 'Andhra Pradesh'),
(157, 'Salur', 'Andhra Pradesh'),
(158, 'Kakinada', 'Andhra Pradesh'),
(159, 'Ramachandrapuram', 'Andhra Pradesh'),
(160, 'Rajahmundry', 'Andhra Pradesh'),
(161, 'Kovvur', 'Andhra Pradesh'),
(162, 'Kadiam', 'Andhra Pradesh'),
(163, 'Amalapuram', 'Andhra Pradesh'),
(164, 'Allavaram', 'Andhra Pradesh'),
(165, 'Mummidivaram', 'Andhra Pradesh'),
(166, 'Kothapeta', 'Andhra Pradesh'),
(167, 'Mandapeta', 'Andhra Pradesh'),
(168, 'Razole', 'Andhra Pradesh'),
(169, 'Narsapur', 'Andhra Pradesh'),
(170, 'Rampachodavaram', 'Andhra Pradesh'),
(171, 'Gokavaram', 'Andhra Pradesh'),
(172, 'Peddapuram', 'Andhra Pradesh'),
(173, 'Rajanagaram', 'Andhra Pradesh'),
(174, 'Anaparthy', 'Andhra Pradesh'),
(175, 'Annavaram', 'Andhra Pradesh'),
(176, 'Tanuku', 'Andhra Pradesh'),
(177, 'Prathipadu_East Godavari', 'Andhra Pradesh'),
(178, 'Jaggampeta', 'Andhra Pradesh'),
(179, 'Thallarevu', 'Andhra Pradesh'),
(180, 'Bhimadole', 'Andhra Pradesh'),
(181, 'Tadepalligudem', 'Andhra Pradesh'),
(182, 'Gopalapuram', 'Andhra Pradesh'),
(183, 'Atchanta', 'Andhra Pradesh'),
(184, 'Palakollu', 'Andhra Pradesh'),
(185, 'Jangareddygudem', 'Andhra Pradesh'),
(186, 'Undi', 'Andhra Pradesh'),
(187, 'Bhimavaram', 'Andhra Pradesh'),
(188, 'Polavaram', 'Andhra Pradesh'),
(189, 'Dwaraka Tirumala', 'Andhra Pradesh'),
(190, 'Lingapalem', 'Andhra Pradesh'),
(191, 'Chintalapudi', 'Andhra Pradesh'),
(192, 'Itanagar', 'Arunachal Pradesh'),
(193, 'Guwahati', 'Assam'),
(194, 'Chhayagaon', 'Assam'),
(195, 'Mirza', 'Assam'),
(196, 'Hajo', 'Assam'),
(197, 'Baihata', 'Assam'),
(198, 'Dhupdhara', 'Assam'),
(199, 'Karakuchi', 'Assam'),
(200, 'Mangoldoi', 'Assam'),
(201, 'Barpeta', 'Assam'),
(202, 'Nalbari', 'Assam'),
(203, 'Jalahgaon', 'Assam'),
(204, 'Goalpara', 'Assam'),
(205, 'Tamulpur', 'Assam'),
(206, 'Goreswar', 'Assam'),
(207, 'Nagaon', 'Assam'),
(208, 'Kaliabor', 'Assam'),
(209, 'Raha', 'Assam'),
(210, 'Morigaon', 'Assam'),
(211, 'Tezpur', 'Assam'),
(212, 'Laharighat', 'Assam'),
(213, 'Dhing', 'Assam'),
(214, 'Jamugurihat', 'Assam'),
(215, 'Kathiatoli', 'Assam'),
(216, 'Sonapur', 'Assam'),
(217, 'Jagiroad', 'Assam'),
(218, 'Hojai', 'Assam'),
(219, 'Howraghat', 'Assam'),
(220, 'Lanka', 'Assam'),
(221, 'Lumding', 'Assam'),
(222, 'Diphu', 'Assam'),
(223, 'Sarupathar', 'Assam'),
(224, 'Bokajan', 'Assam'),
(225, 'Lakhipur-Goalpara', 'Assam'),
(226, 'Dudhnoi', 'Assam'),
(227, 'Dhubri', 'Assam'),
(228, 'Mankacher', 'Assam'),
(229, 'Kokrajhar', 'Assam'),
(230, 'Agomani', 'Assam'),
(231, 'Gossaigaon', 'Assam'),
(232, 'Bilasipara', 'Assam'),
(233, 'Bongaigaon', 'Assam'),
(234, 'Abhayapuri', 'Assam'),
(235, 'Dhekiajuli', 'Assam'),
(236, 'Balipara', 'Assam'),
(237, 'Mazbat', 'Assam'),
(238, 'Kharupetia', 'Assam'),
(239, 'Bihpuria', 'Assam'),
(240, 'Behali', 'Assam'),
(241, 'Gohpur', 'Assam'),
(242, 'Biswanath Chariali', 'Assam'),
(243, 'Udalguri', 'Assam'),
(244, 'Jorhat', 'Assam'),
(245, 'Titabor', 'Assam'),
(246, 'Majuli', 'Assam'),
(247, 'Nakachari', 'Assam'),
(248, 'Merapani', 'Assam'),
(249, 'Bokaghat', 'Assam'),
(250, 'Numaligarh', 'Assam'),
(251, 'Golaghat', 'Assam'),
(252, 'Sivasagar', 'Assam'),
(253, 'Nazira', 'Assam'),
(254, 'Moranhat', 'Assam'),
(255, 'Amguri', 'Assam'),
(256, 'Sonari', 'Assam'),
(257, 'Namrup', 'Assam'),
(258, 'Dibrugarh', 'Assam'),
(259, 'Chabua', 'Assam'),
(260, 'Tinsukia', 'Assam'),
(261, 'Doom Dooma', 'Assam'),
(262, 'Sadiya', 'Assam'),
(263, 'Digboi', 'Assam'),
(264, 'Ledo', 'Assam'),
(265, 'Duliajan', 'Assam'),
(266, 'Tingkhong', 'Assam'),
(267, 'North Lakhimpur', 'Assam'),
(268, 'Gogamukh', 'Assam'),
(269, 'Dhakuakhana', 'Assam'),
(270, 'Dhemaji', 'Assam'),
(271, 'Silapathar', 'Assam'),
(272, 'Murkongselek', 'Assam'),
(273, 'Silchar', 'Assam'),
(274, 'Kalain', 'Assam'),
(275, 'Lakhipur-Cachar', 'Assam'),
(276, 'Dholai Bazar', 'Assam'),
(277, 'Hailakandi', 'Assam'),
(278, 'Katlicherra', 'Assam'),
(279, 'Karimganj', 'Assam'),
(280, 'Haflong', 'Assam'),
(281, 'Umrangso', 'Assam'),
(282, 'Forbesganj', 'Bihar'),
(283, 'Patna', 'Bihar'),
(284, 'Bihta', 'Bihar'),
(285, 'Paliganj', 'Bihar'),
(286, 'Neora', 'Bihar'),
(287, 'Hilsa', 'Bihar'),
(288, 'Hulasganj', 'Bihar'),
(289, 'Chandi', 'Bihar'),
(290, 'Rajgir', 'Bihar'),
(291, 'Buxar', 'Bihar'),
(292, 'Dumraon', 'Bihar'),
(293, 'Bihia', 'Bihar'),
(294, 'Jagdishpur', 'Bihar'),
(295, 'Dinara', 'Bihar'),
(296, 'Bhabua', 'Bihar'),
(297, 'Arrah', 'Bihar'),
(298, 'Rusera', 'Bihar'),
(299, 'Bikramganj', 'Bihar'),
(300, 'Arwal', 'Bihar'),
(301, 'Dehri-On-Sone', 'Bihar'),
(302, 'Majhaul', 'Bihar'),
(303, 'Motipur', 'Bihar'),
(304, 'Saraiya', 'Bihar'),
(305, 'Bihar Sharif', 'Bihar'),
(306, 'Barh', 'Bihar'),
(307, 'Mirganj', 'Bihar'),
(308, 'Mokama', 'Bihar'),
(309, 'Tekari', 'Bihar'),
(310, 'Gaya', 'Bihar'),
(311, 'Jehanabad', 'Bihar'),
(312, 'Daudnagar', 'Bihar'),
(313, 'Mashaurhi', 'Bihar'),
(314, 'Sikandra', 'Bihar'),
(315, 'Nawada', 'Bihar'),
(316, 'Sheikhpura', 'Bihar'),
(317, 'Rajauli', 'Bihar'),
(318, 'Lakhisarai', 'Bihar'),
(319, 'Munger', 'Bihar'),
(320, 'Kharagpur - Bh', 'Bihar'),
(321, 'Chakai', 'Bihar'),
(322, 'Jhajha', 'Bihar'),
(323, 'Jamui', 'Bihar'),
(324, 'Bhagalpur', 'Bihar'),
(325, 'Banka', 'Bihar'),
(326, 'Katoria', 'Bihar'),
(327, 'Sultanganj', 'Bihar'),
(328, 'Belhar', 'Bihar'),
(329, 'Kahalgaon', 'Bihar'),
(330, 'Sahebganj - Bh', 'Bihar'),
(331, 'Sasaram', 'Bihar'),
(332, 'Chainpur', 'Bihar'),
(333, 'Malahipur', 'Bihar'),
(334, 'Kishanganj', 'Bihar'),
(335, 'Nabinagar', 'Bihar'),
(336, 'Naugachia', 'Bihar'),
(337, 'Akbarpur', 'Bihar'),
(338, 'Aurangabad', 'Bihar'),
(339, 'Rafiganj', 'Bihar'),
(340, 'Barachhati', 'Bihar'),
(341, 'Sherghati', 'Bihar'),
(342, 'Hajipur', 'Bihar'),
(343, 'Ekma', 'Bihar'),
(344, 'Dighwara', 'Bihar'),
(345, 'Raghunathpur - Bh', 'Bihar'),
(346, 'Chhapra', 'Bihar'),
(347, 'Parsa', 'Bihar'),
(348, 'Mahrajganj', 'Bihar'),
(349, 'Siwan', 'Bihar'),
(350, 'Mairwa', 'Bihar'),
(351, 'Gopalganj', 'Bihar'),
(352, 'Basantpur', 'Bihar'),
(353, 'Masrakh', 'Bihar'),
(354, 'Kuchaikote', 'Bihar'),
(355, 'Bhore', 'Bihar'),
(356, 'Muzaffarpur', 'Bihar'),
(357, 'Sitamarhi', 'Bihar'),
(358, 'Dholi', 'Bihar'),
(359, 'Katra - Bh', 'Bihar'),
(360, 'Mahua', 'Bihar'),
(361, 'Runni', 'Bihar'),
(362, 'Bhagwanpur', 'Bihar'),
(363, 'Dhaka', 'Bihar'),
(364, 'Bhutahi', 'Bihar'),
(365, 'Pupri', 'Bihar'),
(366, 'Sheohar', 'Bihar'),
(367, 'Begusarai', 'Bihar'),
(368, 'Lakhminia', 'Bihar'),
(369, 'Bagaha', 'Bihar'),
(370, 'Narkaiaganj', 'Bihar'),
(371, 'Katihar', 'Bihar'),
(372, 'Raxaul', 'Bihar'),
(373, 'Banmankhi', 'Bihar'),
(374, 'Motihari', 'Bihar'),
(375, 'Areraj', 'Bihar'),
(376, 'Chakia', 'Bihar'),
(377, 'Bettiah', 'Bihar'),
(378, 'Barauni', 'Bihar'),
(379, 'Dalsingh Sarai', 'Bihar'),
(380, 'Samastipur', 'Bihar'),
(381, 'Darbhanga', 'Bihar'),
(382, 'Benipatti', 'Bihar'),
(383, 'Benipur', 'Bihar'),
(384, 'Singhia', 'Bihar'),
(385, 'Simrahi Bazar', 'Bihar'),
(386, 'Madhubani', 'Bihar'),
(387, 'Jhanjharpur', 'Bihar'),
(388, 'Jaynagar', 'Bihar'),
(389, 'Bachhawara', 'Bihar'),
(390, 'Khagaria', 'Bihar'),
(391, 'Gogri', 'Bihar'),
(392, 'Parbatta', 'Bihar'),
(393, 'Udakishanganj', 'Bihar'),
(394, 'Sahasra', 'Bihar'),
(395, 'Madhepura', 'Bihar'),
(396, 'Simri Bakhtiyarpur', 'Bihar'),
(397, 'Triveniganj', 'Bihar'),
(398, 'Supaul', 'Bihar'),
(399, 'Purnea', 'Bihar'),
(400, 'Falka', 'Bihar'),
(401, 'Manihari', 'Bihar'),
(402, 'Barsoi', 'Bihar'),
(403, 'Araria', 'Bihar'),
(404, 'Baisi', 'Bihar'),
(405, 'Dahibhat', 'Bihar'),
(406, 'Thakurganj', 'Bihar'),
(407, 'Bhilai', 'Chhattisgarh'),
(408, 'Ahiwara', 'Chhattisgarh'),
(409, 'Patan-Cg', 'Chhattisgarh'),
(410, 'Gunderdehi', 'Chhattisgarh'),
(411, 'Balod', 'Chhattisgarh'),
(412, 'Dhamtari ', 'Chhattisgarh'),
(413, 'Dalli Rajhara', 'Chhattisgarh'),
(414, 'Bhanupratappur', 'Chhattisgarh'),
(415, 'Dhamdha', 'Chhattisgarh'),
(416, 'Bemetara', 'Chhattisgarh'),
(417, 'Kabirdham', 'Chhattisgarh'),
(418, 'Mungeli', 'Chhattisgarh'),
(419, 'Bhatapara ', 'Chhattisgarh'),
(420, 'Rajnandgaon', 'Chhattisgarh'),
(421, 'Khairagarh-Cg', 'Chhattisgarh'),
(422, 'Dongargarh', 'Chhattisgarh'),
(423, 'Chowki', 'Chhattisgarh'),
(424, 'Pandariya', 'Chhattisgarh'),
(425, 'Dongargaon', 'Chhattisgarh'),
(426, 'Gandai', 'Chhattisgarh'),
(427, 'Raipur', 'Chhattisgarh'),
(428, 'Kunkuri', 'Chhattisgarh'),
(429, 'Tilda', 'Chhattisgarh'),
(430, 'Baloda Bazar', 'Chhattisgarh'),
(431, 'Seobri Narayan', 'Chhattisgarh'),
(432, 'Pithora', 'Chhattisgarh'),
(433, 'Kasdol', 'Chhattisgarh'),
(434, 'Mahasamund ', 'Chhattisgarh'),
(435, 'Baghbahara', 'Chhattisgarh'),
(436, 'Basna', 'Chhattisgarh'),
(437, 'Saraipali', 'Chhattisgarh'),
(438, 'Sarangarh', 'Chhattisgarh'),
(439, 'Abhanpur', 'Chhattisgarh'),
(440, 'Gariaband', 'Chhattisgarh'),
(441, 'Jagdalpur ', 'Chhattisgarh'),
(442, 'Lohandiguda', 'Chhattisgarh'),
(443, 'Sukma', 'Chhattisgarh'),
(444, 'Kirandul', 'Chhattisgarh'),
(445, 'Kondagaon', 'Chhattisgarh'),
(446, 'Keskal', 'Chhattisgarh'),
(447, 'Naharpur', 'Chhattisgarh'),
(448, 'Kanker ', 'Chhattisgarh'),
(449, 'Charama', 'Chhattisgarh'),
(450, 'Dantewada', 'Chhattisgarh'),
(451, 'Bijapur', 'Chhattisgarh'),
(452, 'Bhairamgarh', 'Chhattisgarh'),
(453, 'Narayanpur', 'Chhattisgarh'),
(454, 'Antagarh', 'Chhattisgarh'),
(455, 'Bilaspur', 'Chhattisgarh'),
(456, 'Kota', 'Chhattisgarh'),
(457, 'Pendra Road', 'Chhattisgarh'),
(458, 'Marwahi', 'Chhattisgarh'),
(459, 'Korba ', 'Chhattisgarh'),
(460, 'Katghora', 'Chhattisgarh'),
(461, 'Pali-Cg', 'Chhattisgarh'),
(462, 'Akaltara', 'Chhattisgarh'),
(463, 'Champa ', 'Chhattisgarh'),
(464, 'Jaijaipur', 'Chhattisgarh'),
(465, 'Dharamjaygarh', 'Chhattisgarh'),
(466, 'Sakti', 'Chhattisgarh'),
(467, 'Dabra-Cg', 'Chhattisgarh'),
(468, 'Raigarh', 'Chhattisgarh'),
(469, 'Gharghoda', 'Chhattisgarh'),
(470, 'Lailunga', 'Chhattisgarh'),
(471, 'Pathalgaon', 'Chhattisgarh'),
(472, 'Bagicha', 'Chhattisgarh'),
(473, 'Jashpur Nagar', 'Chhattisgarh'),
(474, 'Kusmi-Cg', 'Chhattisgarh'),
(475, 'Kharsia', 'Chhattisgarh'),
(476, 'Ambikapur', 'Chhattisgarh'),
(477, 'Batauli', 'Chhattisgarh'),
(478, 'Lakhanpur', 'Chhattisgarh'),
(479, 'Ramanujganj', 'Chhattisgarh'),
(480, 'Pratappur', 'Chhattisgarh'),
(481, 'Wadafnagar', 'Chhattisgarh'),
(482, 'Bishrampur', 'Chhattisgarh'),
(483, 'Bhaiyathan', 'Chhattisgarh'),
(484, 'Baikunthpur', 'Chhattisgarh'),
(485, 'Udaipur', 'Chhattisgarh'),
(486, 'Manendragarh', 'Chhattisgarh'),
(487, 'Bharatpur', 'Chhattisgarh'),
(488, 'Silvassa', 'Dadra and Nagar Haveli'),
(489, 'Delhi', 'Delhi'),
(490, 'Panjim', 'Goa'),
(491, 'Bicholim', 'Goa'),
(492, 'Ponda', 'Goa'),
(493, 'Verna', 'Goa'),
(494, 'Mapusa', 'Goa'),
(495, 'Pernem', 'Goa'),
(496, 'Margao', 'Goa'),
(497, 'Quepem', 'Goa'),
(498, 'Rajkot', 'Gujarat'),
(499, 'Jasdan', 'Gujarat'),
(500, 'Upleta', 'Gujarat'),
(501, 'Gondal', 'Gujarat'),
(502, 'Paddhari', 'Gujarat'),
(503, 'Bhanvad', 'Gujarat'),
(504, 'Jetpur', 'Gujarat'),
(505, 'Dhoraji', 'Gujarat'),
(506, 'Junagadh', 'Gujarat'),
(507, 'Jamjodhpur', 'Gujarat'),
(508, 'Kalavad', 'Gujarat'),
(509, 'Porbandar', 'Gujarat'),
(510, 'Kutiyana', 'Gujarat'),
(511, 'Balej', 'Gujarat'),
(512, 'Sodhana', 'Gujarat'),
(513, 'Jamnagar', 'Gujarat'),
(514, 'Motikhavdi', 'Gujarat'),
(515, 'Dhrol', 'Gujarat'),
(516, 'Khambhalia', 'Gujarat'),
(517, 'Lalpur - Gj', 'Gujarat'),
(518, 'Mahadeviya', 'Gujarat'),
(519, 'Dwarka', 'Gujarat'),
(520, 'Bhesan', 'Gujarat'),
(521, 'Ranpur', 'Gujarat'),
(522, 'Una-Gj', 'Gujarat'),
(523, 'Visavadar', 'Gujarat'),
(524, 'Talala', 'Gujarat'),
(525, 'Keshod', 'Gujarat'),
(526, 'Mangrol', 'Gujarat'),
(527, 'Morbi', 'Gujarat'),
(528, 'Veraval', 'Gujarat'),
(529, 'Kodinar', 'Gujarat'),
(530, 'Manavadar', 'Gujarat'),
(531, 'Surendranagar', 'Gujarat'),
(532, 'Dhangadhra', 'Gujarat'),
(533, 'Halvad', 'Gujarat'),
(534, 'Limbdi', 'Gujarat'),
(535, 'Bagodara', 'Gujarat'),
(536, 'Chotila', 'Gujarat'),
(537, 'Wankaner', 'Gujarat'),
(538, 'Bhavnagar', 'Gujarat'),
(539, 'Talaja', 'Gujarat'),
(540, 'Palitana', 'Gujarat'),
(541, 'Umrala', 'Gujarat'),
(542, 'Gariadhar', 'Gujarat'),
(543, 'Rajula', 'Gujarat'),
(544, 'Mahuva Bhavnagar', 'Gujarat'),
(545, 'Botad', 'Gujarat'),
(546, 'Amreli', 'Gujarat'),
(547, 'Bagasara', 'Gujarat'),
(548, 'Savarkundla', 'Gujarat'),
(549, 'Vadia', 'Gujarat'),
(550, 'Mahuva', 'Gujarat'),
(551, 'Nasvadi', 'Gujarat'),
(552, 'Babra', 'Gujarat'),
(553, 'Gadhada', 'Gujarat'),
(554, 'Dhari', 'Gujarat'),
(555, 'Baroda', 'Gujarat'),
(556, 'Bhuj', 'Gujarat'),
(557, 'Gandhidham', 'Gujarat'),
(558, 'Bachau', 'Gujarat'),
(559, 'Rapar', 'Gujarat'),
(560, 'Mundra', 'Gujarat'),
(561, 'Mandvi', 'Gujarat'),
(562, 'Naliya', 'Gujarat'),
(563, 'Ahmedabad', 'Gujarat'),
(564, 'Talod', 'Gujarat'),
(565, 'Valsad', 'Gujarat'),
(566, 'Gandhi Nagar', 'Gujarat'),
(567, 'Becharaji', 'Gujarat'),
(568, 'Viramgam', 'Gujarat'),
(569, 'Bavla', 'Gujarat'),
(570, 'Dhandhuka', 'Gujarat'),
(571, 'Dehgam', 'Gujarat'),
(572, 'Kalol', 'Gujarat'),
(573, 'Mehsana', 'Gujarat'),
(574, 'Shankheshwar', 'Gujarat'),
(575, 'Vijapur', 'Gujarat'),
(576, 'Himatnagar', 'Gujarat'),
(577, 'Bayad', 'Gujarat'),
(578, 'Idar', 'Gujarat'),
(579, 'Khedbrahma', 'Gujarat'),
(580, 'Modasa', 'Gujarat'),
(581, 'Lunawada', 'Gujarat'),
(582, 'Patan-Gj', 'Gujarat'),
(583, 'Kheralu', 'Gujarat'),
(584, 'Vadgam', 'Gujarat'),
(585, 'Palanpur', 'Gujarat'),
(586, 'Danta', 'Gujarat'),
(587, 'Dhanera', 'Gujarat'),
(588, 'Suigam', 'Gujarat'),
(589, 'Deodar', 'Gujarat'),
(590, 'Varahi', 'Gujarat'),
(591, 'Santalpur', 'Gujarat'),
(592, 'Deesa', 'Gujarat'),
(593, 'Shihori', 'Gujarat'),
(594, 'Vav', 'Gujarat'),
(595, 'Nadiad', 'Gujarat'),
(596, 'Mehmedabad', 'Gujarat'),
(597, 'Anand', 'Gujarat'),
(598, 'Kapadwanj', 'Gujarat'),
(599, 'Balasinor', 'Gujarat'),
(600, 'Borsad', 'Gujarat'),
(601, 'Tarapur', 'Gujarat'),
(602, 'Virpur', 'Gujarat'),
(603, 'Khambhat', 'Gujarat'),
(604, 'Godhra', 'Gujarat'),
(605, 'Santrampur', 'Gujarat'),
(606, 'Limkheda', 'Gujarat'),
(607, 'Dahod', 'Gujarat'),
(608, 'Jhalod', 'Gujarat'),
(609, 'Halol', 'Gujarat'),
(610, 'Jetpur-Pavi', 'Gujarat'),
(611, 'Dabhoi', 'Gujarat'),
(612, 'Rajpipla', 'Gujarat'),
(613, 'Kavant', 'Gujarat'),
(614, 'Chhota Udaipur', 'Gujarat'),
(615, 'Karjan', 'Gujarat'),
(616, 'Jambusar', 'Gujarat'),
(617, 'Bharuch', 'Gujarat'),
(618, 'Vagara', 'Gujarat'),
(619, 'Vyara', 'Gujarat'),
(620, 'Dahej', 'Gujarat'),
(621, 'Bardoli', 'Gujarat'),
(622, 'Mangarol', 'Gujarat'),
(623, 'Ankleshwar', 'Gujarat'),
(624, 'Dediapada', 'Gujarat'),
(625, 'Netrang', 'Gujarat'),
(626, 'Navsari', 'Gujarat'),
(627, 'Vapi', 'Gujarat'),
(628, 'Surat', 'Gujarat'),
(629, 'Kim', 'Gujarat'),
(630, 'Mandavi', 'Gujarat'),
(631, 'Uchchhal', 'Gujarat'),
(632, 'Nandurbar', 'Gujarat'),
(633, 'Umarpada', 'Gujarat'),
(634, 'Bansda', 'Gujarat'),
(635, 'Hansot', 'Gujarat'),
(636, 'Umbergaon', 'Gujarat'),
(637, 'Ahwa', 'Gujarat'),
(638, 'Bilimora', 'Gujarat'),
(639, 'Shimla', 'Himachal Pradesh'),
(640, 'Baddi', 'Himachal Pradesh'),
(641, 'Solan', 'Himachal Pradesh'),
(642, 'Nalagarh', 'Himachal Pradesh'),
(643, 'Una', 'Himachal Pradesh'),
(644, 'Mandi', 'Himachal Pradesh'),
(645, 'Faridabad', 'Haryana'),
(646, 'Palwal', 'Haryana'),
(647, 'Hodal', 'Haryana'),
(648, 'Gurugram', 'Haryana'),
(649, 'Nuh', 'Haryana'),
(650, 'Pataudi', 'Haryana'),
(651, 'Rewari', 'Haryana'),
(652, 'Narnaul', 'Haryana'),
(653, 'Mahendargarh', 'Haryana'),
(654, 'Kosli', 'Haryana'),
(655, 'Rohtak', 'Haryana'),
(656, 'Maham', 'Haryana'),
(657, 'Jhajjar', 'Haryana'),
(658, 'Charkhi Dadri', 'Haryana'),
(659, 'Bahadurgarh', 'Haryana'),
(660, 'Sampla', 'Haryana'),
(661, 'Hisar', 'Haryana'),
(662, 'Hansi', 'Haryana'),
(663, 'Fatehabad', 'Haryana'),
(664, 'Adampur', 'Haryana'),
(665, 'Bhattu', 'Haryana'),
(666, 'Sirsa', 'Haryana'),
(667, 'Rania', 'Haryana'),
(668, 'Kalanwali', 'Haryana'),
(669, 'Dabwali', 'Haryana'),
(670, 'Ellenabad', 'Haryana'),
(671, 'Bhuna', 'Haryana'),
(672, 'Tohana', 'Haryana'),
(673, 'Barwala', 'Haryana'),
(674, 'Jind', 'Haryana'),
(675, 'Pilu Khera', 'Haryana'),
(676, 'Asandh', 'Haryana'),
(677, 'Narwana', 'Haryana'),
(678, 'Bhiwani', 'Haryana'),
(679, 'Bahal', 'Haryana'),
(680, 'Tosham', 'Haryana'),
(681, 'Siwani', 'Haryana'),
(682, 'Loharu', 'Haryana'),
(683, 'Sonipat', 'Haryana'),
(684, 'Gohana', 'Haryana'),
(685, 'Karnal', 'Haryana'),
(686, 'Ladwa', 'Haryana'),
(687, 'Panipat', 'Haryana'),
(688, 'Kurukshetra', 'Haryana'),
(689, 'Nilokeri', 'Haryana'),
(690, 'Ambala', 'Haryana'),
(691, 'Yamuna Nagar', 'Haryana'),
(692, 'Barara', 'Haryana'),
(694, 'Kalka', 'Haryana'),
(695, 'Panchkula', 'Haryana'),
(696, 'Naraingarh', 'Haryana'),
(697, 'Pehowa', 'Haryana'),
(698, 'Kaithal', 'Haryana'),
(699, 'Cheeka', 'Haryana'),
(700, 'Barmer', 'Haryana'),
(701, 'Merhma', 'Jharkhand'),
(702, 'Dumka', 'Jharkhand'),
(703, 'Jharmundi', 'Jharkhand'),
(704, 'Deoghar', 'Jharkhand'),
(705, 'Madhupur', 'Jharkhand'),
(706, 'Hansdiha', 'Jharkhand'),
(707, 'Godda', 'Jharkhand'),
(708, 'Kundahit', 'Jharkhand'),
(709, 'Mahagama', 'Jharkhand'),
(710, 'Jamtara', 'Jharkhand'),
(711, 'Giridih', 'Jharkhand'),
(712, 'Satgawan', 'Jharkhand'),
(713, 'Jamua', 'Jharkhand'),
(714, 'Bararwa', 'Jharkhand'),
(715, 'Mahespur', 'Jharkhand'),
(716, 'Pakur', 'Jharkhand'),
(717, 'Sahebganj', 'Jharkhand'),
(718, 'Rajmahal', 'Jharkhand'),
(719, 'Medininagar', 'Jharkhand'),
(720, 'Haider Nagar', 'Jharkhand'),
(721, 'Tarhasi', 'Jharkhand'),
(722, 'Garhwa', 'Jharkhand'),
(723, 'Bishnupur', 'Jharkhand'),
(724, 'Panki', 'Jharkhand'),
(725, 'Latehar', 'Jharkhand'),
(726, 'Patratu', 'Jharkhand'),
(727, 'Ramgarh', 'Jharkhand'),
(728, 'Peterwar', 'Jharkhand'),
(729, 'Chatra', 'Jharkhand'),
(730, 'Bagodar', 'Jharkhand'),
(731, 'Gomoh', 'Jharkhand'),
(732, 'Markacho', 'Jharkhand'),
(733, 'Hazaribagh', 'Jharkhand'),
(734, 'Barkagaon', 'Jharkhand'),
(735, 'Ghato', 'Jharkhand'),
(736, 'Gumia', 'Jharkhand'),
(737, 'Khalari', 'Jharkhand'),
(738, 'Mandu', 'Jharkhand'),
(739, 'Padma', 'Jharkhand'),
(740, 'Chouparan', 'Jharkhand'),
(741, 'Jhumri Telaiya', 'Jharkhand'),
(742, 'Dhanbad', 'Jharkhand'),
(743, 'Bokaro', 'Jharkhand'),
(744, 'Chandankayari', 'Jharkhand'),
(745, 'Chandwa', 'Jharkhand'),
(746, 'Jamshedpur', 'Jharkhand'),
(747, 'Gamaria', 'Jharkhand'),
(748, 'Chandil', 'Jharkhand'),
(749, 'Baharagora', 'Jharkhand'),
(750, 'Ghatsila', 'Jharkhand'),
(751, 'Chowka', 'Jharkhand'),
(752, 'Kharsawan', 'Jharkhand'),
(753, 'Chakradharpur', 'Jharkhand'),
(754, 'Sonua', 'Jharkhand'),
(755, 'Bano', 'Jharkhand'),
(756, 'Chaibasa', 'Jharkhand'),
(757, 'Jagannathpur', 'Jharkhand'),
(758, 'Ranchi', 'Jharkhand'),
(759, 'Silli', 'Jharkhand'),
(760, 'Tatisilva', 'Jharkhand'),
(761, 'Bero', 'Jharkhand'),
(762, 'Tamar', 'Jharkhand'),
(763, 'Gumla', 'Jharkhand'),
(764, 'Khunti', 'Jharkhand'),
(766, 'Kurdeg', 'Jharkhand'),
(767, 'Lohardaga', 'Jharkhand'),
(768, 'Simdega', 'Jharkhand'),
(769, 'Kamdhara', 'Jharkhand'),
(770, 'Torpa', 'Jharkhand'),
(771, 'Sembo', 'Jharkhand'),
(772, 'Jammu', 'Jammu and Kashmir'),
(773, 'Miransahib', 'Jammu and Kashmir'),
(774, 'Akhnoor', 'Jammu and Kashmir'),
(775, 'Udhampur', 'Jammu and Kashmir'),
(776, 'Katra', 'Jammu and Kashmir'),
(777, 'Kathua', 'Jammu and Kashmir'),
(778, 'Srinagar', 'Jammu and Kashmir'),
(779, 'Budgam', 'Jammu and Kashmir'),
(780, 'Ganderbal', 'Jammu and Kashmir'),
(781, 'Anantnag', 'Jammu and Kashmir'),
(782, 'Kulgam', 'Jammu and Kashmir'),
(783, 'Pulwama', 'Jammu and Kashmir'),
(784, 'Shopian', 'Jammu and Kashmir'),
(785, 'Baramulla', 'Jammu and Kashmir'),
(786, 'Sopore', 'Jammu and Kashmir'),
(787, 'Raichur', 'Karnataka'),
(788, 'Bengaluru', 'Karnataka'),
(789, 'Kunigal', 'Karnataka'),
(790, 'Ramnagara', 'Karnataka'),
(791, 'Pavagada', 'Karnataka'),
(792, 'Doddaballapur', 'Karnataka'),
(793, 'Bagepalli', 'Karnataka'),
(794, 'Gauribidanur', 'Karnataka'),
(795, 'Mulabagilu', 'Karnataka'),
(796, 'Chintamani', 'Karnataka'),
(797, 'Tumkur', 'Karnataka'),
(798, 'Kanakpura', 'Karnataka'),
(799, 'Hosakote', 'Karnataka'),
(800, 'Kolar', 'Karnataka'),
(801, 'Bangarapet', 'Karnataka'),
(802, 'Malur', 'Karnataka'),
(804, 'Mysore', 'Karnataka'),
(805, 'Tirumakudal Narsipur', 'Karnataka'),
(806, 'Kushalnagar', 'Karnataka'),
(807, 'Krishnarajanagara', 'Karnataka'),
(808, 'Chamarajanagar', 'Karnataka'),
(809, 'H.D.Kote', 'Karnataka'),
(810, 'Maddur, Mandya', 'Karnataka'),
(811, 'Madikeri', 'Karnataka'),
(812, 'Virajpet', 'Karnataka'),
(813, 'Somwarpet', 'Karnataka'),
(814, 'Kollegal', 'Karnataka'),
(815, 'Mandya', 'Karnataka'),
(816, 'Srirangapatna', 'Karnataka'),
(817, 'Nagamangala', 'Karnataka'),
(818, 'Krishnarajpet', 'Karnataka'),
(819, 'Davangere', 'Karnataka'),
(820, 'Madhugiri', 'Karnataka'),
(821, 'Sira', 'Karnataka'),
(822, 'Tiptur', 'Karnataka'),
(823, 'Hiriyur', 'Karnataka'),
(824, 'Hasan', 'Karnataka'),
(825, 'Belur', 'Karnataka'),
(826, 'Arkalgud', 'Karnataka'),
(827, 'Arsikere', 'Karnataka'),
(828, 'Channarayapatna', 'Karnataka'),
(829, 'Sakleshpur', 'Karnataka'),
(830, 'Kaduru', 'Karnataka'),
(831, 'Karkala', 'Karnataka'),
(832, 'Padubidri', 'Karnataka'),
(833, 'Kapu', 'Karnataka'),
(834, 'Hebri', 'Karnataka'),
(835, 'Ujire', 'Karnataka'),
(836, 'Manipal', 'Karnataka'),
(837, 'Moodbidri', 'Karnataka'),
(838, 'Mangalore', 'Karnataka'),
(839, 'B.C Road', 'Karnataka'),
(840, 'Surathkal', 'Karnataka'),
(842, 'Sullia', 'Karnataka'),
(843, 'Kadaba', 'Karnataka'),
(844, 'Vitla', 'Karnataka'),
(845, 'Uppinangady', 'Karnataka'),
(846, 'Kundapura', 'Karnataka'),
(847, 'Brahmavar', 'Karnataka'),
(848, 'Byndoor', 'Karnataka'),
(849, 'Hosangadi', 'Karnataka'),
(850, 'Bhatkal', 'Karnataka'),
(851, 'Chickamagalur', 'Karnataka'),
(852, 'Sringeri', 'Karnataka'),
(853, 'Mudigere', 'Karnataka'),
(854, 'Bhadravati', 'Karnataka'),
(855, 'Thirthahalli', 'Karnataka'),
(856, 'Shivamoga', 'Karnataka'),
(857, 'Shikaripura', 'Karnataka'),
(858, 'Channagiri', 'Karnataka'),
(859, 'Honnali', 'Karnataka'),
(860, 'Sagara', 'Karnataka'),
(861, 'Hirekerur', 'Karnataka'),
(862, 'Chitradurga', 'Karnataka'),
(863, 'Jagalur', 'Karnataka'),
(864, 'Hosadurga', 'Karnataka'),
(865, 'Sirigere', 'Karnataka'),
(866, 'Challakere', 'Karnataka'),
(867, 'Holalkere', 'Karnataka'),
(868, 'Molakalmuru', 'Karnataka'),
(869, 'Dharwad', 'Karnataka'),
(870, 'Hubli', 'Karnataka'),
(871, 'Hangal', 'Karnataka'),
(872, 'Kittur', 'Karnataka'),
(873, 'Ranebennur', 'Karnataka'),
(874, 'Shiggaon', 'Karnataka'),
(875, 'Haveri', 'Karnataka'),
(876, 'Dandeli', 'Karnataka'),
(877, 'Rona', 'Karnataka'),
(878, 'Kaiga', 'Karnataka'),
(880, 'Kalaghatagi', 'Karnataka'),
(881, 'Nargund', 'Karnataka'),
(882, 'Shirahatti', 'Karnataka'),
(883, 'Hukeri', 'Karnataka'),
(884, 'Karwar', 'Karnataka'),
(885, 'Ankola', 'Karnataka'),
(886, 'Sirsi', 'Karnataka'),
(887, 'Kumta', 'Karnataka'),
(888, 'Siddapura', 'Karnataka'),
(889, 'Honnavar', 'Karnataka'),
(890, 'Yellapur', 'Karnataka'),
(891, 'Mundgod', 'Karnataka'),
(892, 'Bagalkot', 'Karnataka'),
(893, 'Gadag', 'Karnataka'),
(894, 'Yelburga', 'Karnataka'),
(895, 'Jamkhandi', 'Karnataka'),
(896, 'Bellary', 'Karnataka'),
(897, 'Sanduru', 'Karnataka'),
(898, 'Gangavati', 'Karnataka'),
(899, 'Siruguppa', 'Karnataka'),
(900, 'Toranagallu', 'Karnataka'),
(901, 'Harpanahalli', 'Karnataka'),
(902, 'Kudligi', 'Karnataka'),
(903, 'Hospet', 'Karnataka'),
(904, 'Hagari Bommanahalli', 'Karnataka'),
(905, 'Koppal', 'Karnataka'),
(906, 'Sindhanur', 'Karnataka'),
(907, 'Kushtagi', 'Karnataka'),
(908, 'Ilkal', 'Karnataka'),
(909, 'Devadurga', 'Karnataka'),
(910, 'Lingasugur', 'Karnataka'),
(911, 'Manvi', 'Karnataka'),
(912, 'Gulbarga', 'Karnataka'),
(913, 'Yadagiri Taluku', 'Karnataka'),
(914, 'Sadam', 'Karnataka'),
(915, 'Wadi', 'Karnataka'),
(916, 'Afzalpur', 'Karnataka'),
(917, 'Shorapur', 'Karnataka'),
(918, 'Muddebihal', 'Karnataka'),
(919, 'Shahapur', 'Karnataka'),
(920, 'Bidar', 'Karnataka'),
(921, 'Hallikheda', 'Karnataka'),
(922, 'Aland', 'Karnataka'),
(923, 'Basavakalyan', 'Karnataka'),
(924, 'Aurad', 'Karnataka'),
(925, 'Humnabad', 'Karnataka'),
(926, 'Jevargi', 'Karnataka'),
(927, 'Chincholi', 'Karnataka'),
(928, 'Bhalki', 'Karnataka'),
(929, 'Kolhar', 'Karnataka'),
(930, 'Indi', 'Karnataka'),
(931, 'Sindagi', 'Karnataka'),
(932, 'Basavana Bagewadi', 'Karnataka'),
(933, 'Athani', 'Karnataka'),
(934, 'Mudhol', 'Karnataka'),
(935, 'Badami', 'Karnataka'),
(936, 'Belgaum', 'Karnataka'),
(937, 'Gokak', 'Karnataka'),
(938, 'Bailhongal', 'Karnataka'),
(939, 'Saundatti', 'Karnataka'),
(940, 'Chikodi', 'Karnataka'),
(941, 'Nipani', 'Karnataka'),
(942, 'Raibag', 'Karnataka'),
(943, 'Kannur', 'Kerala'),
(944, 'Thalassery', 'Kerala'),
(945, 'Payyanur', 'Kerala'),
(946, 'Vellarikundu', 'Kerala'),
(947, 'Iritty', 'Kerala'),
(948, 'Mananthavady', 'Kerala'),
(949, 'Kasaragod', 'Kerala'),
(950, 'Kanhangad', 'Kerala'),
(951, 'Manjeshwar', 'Kerala'),
(952, 'Shornur', 'Kerala'),
(953, 'Kozhikode', 'Kerala'),
(954, 'Vadakara', 'Kerala'),
(955, 'Kalpetta', 'Kerala'),
(956, 'Quilandy', 'Kerala'),
(957, 'Kottakkal', 'Kerala'),
(958, 'Kondotty', 'Kerala'),
(959, 'Thamarassery', 'Kerala'),
(960, 'Sultan Bathery', 'Kerala'),
(961, 'Manjeri', 'Kerala'),
(962, 'Ponnani', 'Kerala'),
(963, 'Perinthalmanna', 'Kerala'),
(964, 'Palakkad', 'Kerala'),
(965, 'Alathur', 'Kerala'),
(966, 'Kunnamkulam', 'Kerala'),
(967, 'Thrissur', 'Kerala'),
(968, 'Chalakudy', 'Kerala'),
(969, 'North Paravur', 'Kerala'),
(970, 'Kochi', 'Kerala'),
(971, 'Aluva', 'Kerala'),
(972, 'Piravom', 'Kerala'),
(973, 'Muvattupuzha', 'Kerala'),
(974, 'Kattappana', 'Kerala'),
(975, 'Munnar', 'Kerala'),
(976, 'Thodupuzha', 'Kerala'),
(977, 'Pala', 'Kerala'),
(978, 'Kottayam', 'Kerala'),
(979, 'Thiruvalla', 'Kerala'),
(980, 'Vaikom', 'Kerala'),
(981, 'Pathanamthitta', 'Kerala'),
(982, 'Alappuzha', 'Kerala'),
(983, 'Cherthala', 'Kerala'),
(984, 'Adoor', 'Kerala'),
(985, 'Mavelikara', 'Kerala'),
(986, 'Punalur', 'Kerala'),
(987, 'Karunagapalli', 'Kerala'),
(988, 'Kollam', 'Kerala'),
(989, 'Ayoor', 'Kerala'),
(990, 'Kottarakarra', 'Kerala'),
(991, 'Thiruvananthapuram', 'Kerala'),
(992, 'Technopark Campus', 'Kerala'),
(993, 'Neyyattinkara', 'Kerala'),
(994, 'Attingal', 'Kerala'),
(995, 'Mumbai', 'Maharashtra'),
(996, 'Thane', 'Maharashtra'),
(997, 'Mumbra', 'Maharashtra'),
(998, 'Uran', 'Maharashtra'),
(999, 'Palghar', 'Maharashtra'),
(1000, 'Kudus', 'Maharashtra'),
(1001, 'Talasari', 'Maharashtra'),
(1002, 'Jawhar', 'Maharashtra'),
(1003, 'Roha', 'Maharashtra'),
(1004, 'Mahad', 'Maharashtra'),
(1005, 'Mangaon', 'Maharashtra'),
(1006, 'Srivardhan', 'Maharashtra'),
(1007, 'Pali - Mh', 'Maharashtra'),
(1008, 'Panvel', 'Maharashtra'),
(1009, 'Alibagh', 'Maharashtra'),
(1010, 'Mulshi', 'Maharashtra'),
(1011, 'Ahmednagar', 'Maharashtra'),
(1012, 'Nagpur', 'Maharashtra'),
(1013, 'Kolhapur', 'Maharashtra'),
(1014, 'Karjat - Raigarh', 'Maharashtra'),
(1015, 'Kamothe', 'Maharashtra'),
(1016, 'Kamsheth', 'Maharashtra'),
(1017, 'Pune', 'Maharashtra'),
(1018, 'Junnar', 'Maharashtra'),
(1019, 'Ambegoan', 'Maharashtra'),
(1020, 'Rajgurunagar', 'Maharashtra'),
(1021, 'Talegaon', 'Maharashtra'),
(1022, 'Lonand', 'Maharashtra'),
(1023, 'Phaltan', 'Maharashtra'),
(1024, 'Saswad', 'Maharashtra'),
(1025, 'Bhor', 'Maharashtra'),
(1026, 'Wagholi', 'Maharashtra'),
(1027, 'Yavat', 'Maharashtra'),
(1028, 'Ranjangaon', 'Maharashtra'),
(1029, 'Daund', 'Maharashtra'),
(1030, 'Shirwal', 'Maharashtra'),
(1031, 'Alephata', 'Maharashtra'),
(1032, 'Wai', 'Maharashtra'),
(1033, 'Solapur', 'Maharashtra'),
(1034, 'Malsiras', 'Maharashtra'),
(1035, 'Baramati', 'Maharashtra'),
(1036, 'Indapur', 'Maharashtra'),
(1037, 'Jamkhed', 'Maharashtra'),
(1038, 'Karmala', 'Maharashtra'),
(1039, 'Patoda', 'Maharashtra'),
(1040, 'Kurudwadi', 'Maharashtra'),
(1041, 'Mohol', 'Maharashtra'),
(1042, 'Akaalkot', 'Maharashtra'),
(1043, 'Barsi', 'Maharashtra'),
(1044, 'Pandharpur', 'Maharashtra'),
(1045, 'Atpadi', 'Maharashtra'),
(1046, 'Sangola', 'Maharashtra'),
(1047, 'Osmanabad', 'Maharashtra'),
(1048, 'Tuljapur', 'Maharashtra'),
(1049, 'Bhum', 'Maharashtra'),
(1050, 'Kallam', 'Maharashtra'),
(1051, 'Latur', 'Maharashtra'),
(1052, 'Chakur', 'Maharashtra'),
(1053, 'Ahmadpur', 'Maharashtra'),
(1054, 'Ausa', 'Maharashtra'),
(1055, 'Udgir', 'Maharashtra'),
(1056, 'Nilanga', 'Maharashtra'),
(1057, 'Shirur Anantpal', 'Maharashtra'),
(1058, 'Lohara', 'Maharashtra'),
(1059, 'Umarga', 'Maharashtra'),
(1060, 'Shrigonda', 'Maharashtra'),
(1061, 'Parner', 'Maharashtra'),
(1062, 'Rahuri', 'Maharashtra'),
(1063, 'Shrimpur', 'Maharashtra'),
(1064, 'Shirdi', 'Maharashtra'),
(1065, 'Sangamner', 'Maharashtra'),
(1066, 'Nevasa', 'Maharashtra'),
(1067, 'Pathardi', 'Maharashtra'),
(1068, 'Shevgaon', 'Maharashtra'),
(1069, 'Beed', 'Maharashtra'),
(1070, 'Karjat - Ahmadnagar', 'Maharashtra'),
(1071, 'Gevrai', 'Maharashtra'),
(1072, 'Satara', 'Maharashtra'),
(1073, 'Koregoan', 'Maharashtra'),
(1074, 'Vaduj', 'Maharashtra'),
(1075, 'Shahuwadi', 'Maharashtra'),
(1076, 'Vita', 'Maharashtra'),
(1077, 'Karad', 'Maharashtra'),
(1078, 'Dapoli', 'Maharashtra'),
(1079, 'Patan-Mh', 'Maharashtra'),
(1080, 'Islampur - Mh', 'Maharashtra'),
(1082, 'Chiplun', 'Maharashtra'),
(1083, 'Sangmeshwar', 'Maharashtra'),
(1084, 'Ratnagiri', 'Maharashtra'),
(1085, 'Guhagar', 'Maharashtra'),
(1086, 'Khed', 'Maharashtra'),
(1087, 'Lanja', 'Maharashtra'),
(1088, 'Devgarh', 'Maharashtra'),
(1089, 'Sangli', 'Maharashtra'),
(1090, 'Miraj', 'Maharashtra'),
(1091, 'Gargoti', 'Maharashtra'),
(1092, 'Gadhinglaj', 'Maharashtra'),
(1093, 'Tasgaon', 'Maharashtra'),
(1094, 'Jath', 'Maharashtra'),
(1095, 'Ajra', 'Maharashtra'),
(1096, 'Sawantwadi', 'Maharashtra'),
(1097, 'Oros Budruk', 'Maharashtra'),
(1098, 'Malwan', 'Maharashtra'),
(1099, 'Kankavali', 'Maharashtra'),
(1100, 'Titwala', 'Maharashtra'),
(1101, 'Bhiwandi', 'Maharashtra'),
(1102, 'Murbad', 'Maharashtra'),
(1103, 'Sahapur', 'Maharashtra'),
(1104, 'Igatpuri', 'Maharashtra'),
(1105, 'Nasik', 'Maharashtra'),
(1106, 'Sinnar', 'Maharashtra'),
(1107, 'Satana', 'Maharashtra'),
(1108, 'Niphad', 'Maharashtra'),
(1109, 'Yeola', 'Maharashtra'),
(1110, 'Kalvan', 'Maharashtra'),
(1111, 'Akole', 'Maharashtra'),
(1112, 'Malegaon', 'Maharashtra'),
(1113, 'Nandgaon', 'Maharashtra'),
(1114, 'Sakri', 'Maharashtra'),
(1115, 'Vaijapur', 'Maharashtra'),
(1116, 'Gangapur', 'Maharashtra'),
(1117, 'Dhule', 'Maharashtra'),
(1118, 'Chalisgaon', 'Maharashtra'),
(1119, 'Pachora', 'Maharashtra'),
(1120, 'Parola', 'Maharashtra'),
(1121, 'Soygaon', 'Maharashtra'),
(1122, 'Jamner', 'Maharashtra'),
(1123, 'Sindkheda', 'Maharashtra'),
(1124, 'Jalgaon', 'Maharashtra'),
(1125, 'Amalner', 'Maharashtra'),
(1126, 'Chopda', 'Maharashtra'),
(1127, 'Malkapur', 'Maharashtra'),
(1128, 'Bhusawal', 'Maharashtra'),
(1129, 'Raver', 'Maharashtra'),
(1130, 'Shahada', 'Maharashtra'),
(1132, 'Taloda', 'Maharashtra'),
(1133, 'Navapur', 'Maharashtra'),
(1134, 'Phulambri', 'Maharashtra'),
(1135, 'Kannad', 'Maharashtra'),
(1136, 'Selu', 'Maharashtra'),
(1137, 'Paithan', 'Maharashtra'),
(1138, 'Sillod', 'Maharashtra'),
(1139, 'Bhokardan', 'Maharashtra'),
(1140, 'Aambad', 'Maharashtra'),
(1141, 'Kaij', 'Maharashtra'),
(1142, 'Parli Vaijnath', 'Maharashtra'),
(1143, 'Manjlegaon', 'Maharashtra'),
(1144, 'Jalna', 'Maharashtra'),
(1145, 'Jafrabad', 'Maharashtra'),
(1146, 'Partur', 'Maharashtra'),
(1147, 'Deolgaon Raja', 'Maharashtra'),
(1148, 'Parbhani', 'Maharashtra'),
(1149, 'Manwat', 'Maharashtra'),
(1150, 'Jintur', 'Maharashtra'),
(1151, 'Purna', 'Maharashtra'),
(1152, 'Basmat', 'Maharashtra'),
(1153, 'Hingoli', 'Maharashtra'),
(1154, 'Gangakher', 'Maharashtra'),
(1155, 'Ambajogai', 'Maharashtra'),
(1156, 'Sengaon', 'Maharashtra'),
(1157, 'Nanded', 'Maharashtra'),
(1158, 'Kandahar', 'Maharashtra'),
(1159, 'Nayagaon Khairgaon', 'Maharashtra'),
(1160, 'Dharmabad', 'Maharashtra'),
(1161, 'Umarkhed', 'Maharashtra'),
(1162, 'Bhokar', 'Maharashtra'),
(1163, 'Mukher', 'Maharashtra'),
(1164, 'Deglur', 'Maharashtra'),
(1165, 'Mahur', 'Maharashtra'),
(1166, 'Mudkhed', 'Maharashtra'),
(1167, 'Himayat Nagar', 'Maharashtra'),
(1168, 'Kinwat', 'Maharashtra'),
(1169, 'Kamthi', 'Maharashtra'),
(1170, 'Parseoni', 'Maharashtra'),
(1171, 'Katul', 'Maharashtra'),
(1172, 'Kuhi', 'Maharashtra'),
(1173, 'Ramtek', 'Maharashtra'),
(1174, 'Butibori', 'Maharashtra'),
(1175, 'Wardha', 'Maharashtra'),
(1176, 'Umred', 'Maharashtra'),
(1177, 'Brahmapuri', 'Maharashtra'),
(1178, 'Desaiganj', 'Maharashtra'),
(1179, 'Kurkhera', 'Maharashtra'),
(1180, 'Sindewahi', 'Maharashtra'),
(1181, 'Mul', 'Maharashtra'),
(1182, 'Gondpipari', 'Maharashtra'),
(1183, 'Narkhed', 'Maharashtra'),
(1184, 'Gondia', 'Maharashtra'),
(1185, 'Arjuni Morgaon', 'Maharashtra'),
(1186, 'Sakoli', 'Maharashtra'),
(1187, 'Sadak Arjuni', 'Maharashtra'),
(1188, 'Amgaon', 'Maharashtra'),
(1189, 'Pauni', 'Maharashtra'),
(1190, 'Bhandara', 'Maharashtra'),
(1191, 'Mohari', 'Maharashtra'),
(1192, 'Tumsar', 'Maharashtra'),
(1193, 'Tirora', 'Maharashtra'),
(1194, 'Hinganghat', 'Maharashtra'),
(1195, 'Arvi', 'Maharashtra'),
(1196, 'Talegaon Wardha', 'Maharashtra'),
(1197, 'Karanja - Washim', 'Maharashtra'),
(1198, 'Chandrapur', 'Maharashtra'),
(1199, 'Bhadravati - Mh', 'Maharashtra'),
(1200, 'Ahiri', 'Maharashtra'),
(1201, 'Chamursi', 'Maharashtra'),
(1202, 'Garhchiroli', 'Maharashtra'),
(1203, 'Chimur', 'Maharashtra'),
(1204, 'Gadchandur', 'Maharashtra'),
(1205, 'Warora', 'Maharashtra'),
(1206, 'Wani - Yavatmal', 'Maharashtra'),
(1207, 'Buldana', 'Maharashtra'),
(1208, 'Mehekar', 'Maharashtra'),
(1209, 'Nandura', 'Maharashtra'),
(1210, 'Sangrampur', 'Maharashtra'),
(1211, 'Akola', 'Maharashtra'),
(1212, 'Akot', 'Maharashtra'),
(1213, 'Murtijapur', 'Maharashtra'),
(1214, 'Khamgaon', 'Maharashtra'),
(1215, 'Mangrul Pir', 'Maharashtra'),
(1216, 'Digras', 'Maharashtra'),
(1217, 'Patur', 'Maharashtra'),
(1218, 'Risod', 'Maharashtra'),
(1219, 'Washim', 'Maharashtra'),
(1220, 'Amravati', 'Maharashtra'),
(1221, 'Dharni', 'Maharashtra'),
(1222, 'Chandur Bazar', 'Maharashtra'),
(1223, 'Daryapur', 'Maharashtra'),
(1224, 'Nandgaon Khandeshwar', 'Maharashtra'),
(1225, 'Damangaon', 'Maharashtra'),
(1226, 'Achalpur', 'Maharashtra'),
(1227, 'Warud', 'Maharashtra'),
(1228, 'Yavatmal', 'Maharashtra'),
(1229, 'Babulgaon', 'Maharashtra'),
(1230, 'Arni - Mh', 'Maharashtra'),
(1231, 'Ghatanji', 'Maharashtra'),
(1232, 'Darwha', 'Maharashtra'),
(1233, 'Ner', 'Maharashtra'),
(1234, 'Pusad', 'Maharashtra'),
(1235, 'Pandharkawada', 'Maharashtra'),
(1236, 'Kalamb', 'Maharashtra'),
(1237, 'Shillong', 'Meghalaya'),
(1238, 'Imphal', 'Manipur'),
(1239, 'Khandwa', 'Madhya Pradesh'),
(1240, 'Harsud', 'Madhya Pradesh'),
(1241, 'Nepanagar', 'Madhya Pradesh'),
(1242, 'Mundi', 'Madhya Pradesh'),
(1243, 'Burhanpur', 'Madhya Pradesh'),
(1244, 'Pandhana', 'Madhya Pradesh'),
(1245, 'Barwah', 'Madhya Pradesh'),
(1246, 'Khargone', 'Madhya Pradesh'),
(1247, 'Bhikangaon', 'Madhya Pradesh'),
(1248, 'Simrol', 'Madhya Pradesh'),
(1249, 'Maheshwar', 'Madhya Pradesh'),
(1250, 'Sendhwa', 'Madhya Pradesh'),
(1251, 'Barwani', 'Madhya Pradesh'),
(1252, 'Thikri/Rajpur', 'Madhya Pradesh'),
(1253, 'Pansemal', 'Madhya Pradesh'),
(1254, 'Indore', 'Madhya Pradesh'),
(1255, 'Betma', 'Madhya Pradesh'),
(1256, 'Sanwer', 'Madhya Pradesh'),
(1257, 'Depalpur', 'Madhya Pradesh'),
(1258, 'Gadarwara', 'Madhya Pradesh'),
(1259, 'Dhar', 'Madhya Pradesh'),
(1260, 'Rajgarh-Mp', 'Madhya Pradesh'),
(1261, 'Kukshi', 'Madhya Pradesh'),
(1262, 'Manawar', 'Madhya Pradesh'),
(1263, 'Dharampuri', 'Madhya Pradesh'),
(1264, 'Badnawar', 'Madhya Pradesh'),
(1265, 'Dewas', 'Madhya Pradesh'),
(1266, 'Sonkatch', 'Madhya Pradesh'),
(1267, 'Hatpipliya', 'Madhya Pradesh'),
(1268, 'Bagli', 'Madhya Pradesh'),
(1269, 'Kannod', 'Madhya Pradesh'),
(1270, 'Khategaon', 'Madhya Pradesh'),
(1271, 'Ujjain', 'Madhya Pradesh'),
(1272, 'Mahidpur', 'Madhya Pradesh'),
(1273, 'Badnagar', 'Madhya Pradesh'),
(1274, 'Nagda', 'Madhya Pradesh'),
(1275, 'Tarana', 'Madhya Pradesh'),
(1276, 'Maksi', 'Madhya Pradesh'),
(1277, 'Ratlam', 'Madhya Pradesh'),
(1278, 'A Lot', 'Madhya Pradesh'),
(1279, 'Jaora', 'Madhya Pradesh'),
(1280, 'Thandla', 'Madhya Pradesh'),
(1281, 'Jhabua', 'Madhya Pradesh'),
(1282, 'Bhabra', 'Madhya Pradesh'),
(1283, 'Alirajpur', 'Madhya Pradesh'),
(1284, 'Jobat', 'Madhya Pradesh'),
(1285, 'Mandsaur', 'Madhya Pradesh'),
(1286, 'Manasa', 'Madhya Pradesh'),
(1287, 'Bhanpura', 'Madhya Pradesh'),
(1288, 'Nimach', 'Madhya Pradesh'),
(1289, 'Sitamau', 'Madhya Pradesh'),
(1290, 'Shamgarh', 'Madhya Pradesh'),
(1291, 'Betul', 'Madhya Pradesh'),
(1292, 'Bhainsdehi', 'Madhya Pradesh'),
(1293, 'Shahpur', 'Madhya Pradesh'),
(1294, 'Amla', 'Madhya Pradesh'),
(1295, 'Multai', 'Madhya Pradesh'),
(1296, 'Hoshangabad', 'Madhya Pradesh'),
(1297, 'Itarsi', 'Madhya Pradesh'),
(1298, 'Seoni-Malwa', 'Madhya Pradesh'),
(1299, 'Sirali', 'Madhya Pradesh'),
(1300, 'Harda', 'Madhya Pradesh'),
(1301, 'Semri', 'Madhya Pradesh'),
(1302, 'Pipariya', 'Madhya Pradesh'),
(1303, 'Pachmarhi', 'Madhya Pradesh'),
(1304, 'Bhopal', 'Madhya Pradesh'),
(1305, 'Mandideep', 'Madhya Pradesh'),
(1306, 'Hatta', 'Madhya Pradesh'),
(1307, 'Berasia', 'Madhya Pradesh'),
(1308, 'Narsinghgarh', 'Madhya Pradesh'),
(1309, 'Vidisha', 'Madhya Pradesh'),
(1310, 'Lateri', 'Madhya Pradesh'),
(1311, 'Basoda', 'Madhya Pradesh'),
(1312, 'Bina', 'Madhya Pradesh'),
(1313, 'Sironj', 'Madhya Pradesh'),
(1314, 'Begamganj', 'Madhya Pradesh'),
(1315, 'Raisen', 'Madhya Pradesh'),
(1316, 'Bareli', 'Madhya Pradesh'),
(1317, 'Silwani', 'Madhya Pradesh'),
(1318, 'Udaipura', 'Madhya Pradesh'),
(1319, 'Shajapur', 'Madhya Pradesh'),
(1320, 'Polaykalan', 'Madhya Pradesh'),
(1321, 'Sarangpur', 'Madhya Pradesh'),
(1322, 'Shujalpur', 'Madhya Pradesh'),
(1323, 'Agar', 'Madhya Pradesh'),
(1324, 'Susner', 'Madhya Pradesh'),
(1325, 'Soyat Kalan', 'Madhya Pradesh'),
(1326, 'Chachaura', 'Madhya Pradesh'),
(1327, 'Zirapur', 'Madhya Pradesh'),
(1328, 'Sehore', 'Madhya Pradesh'),
(1329, 'Ashta', 'Madhya Pradesh'),
(1330, 'Nasrullaganj', 'Madhya Pradesh'),
(1331, 'Sagar', 'Madhya Pradesh'),
(1332, 'Banda-Mp', 'Madhya Pradesh'),
(1333, 'Rahatgarh', 'Madhya Pradesh'),
(1334, 'Deori', 'Madhya Pradesh'),
(1335, 'Rehli', 'Madhya Pradesh'),
(1336, 'Garhakota', 'Madhya Pradesh'),
(1337, 'Shahgarh', 'Madhya Pradesh'),
(1338, 'Rajwas', 'Madhya Pradesh'),
(1339, 'Damoh', 'Madhya Pradesh'),
(1340, 'Patharia', 'Madhya Pradesh'),
(1341, 'Batiagarh', 'Madhya Pradesh'),
(1342, 'Tendukheda-Damoh', 'Madhya Pradesh'),
(1343, 'Katangi', 'Madhya Pradesh'),
(1344, 'Chhatarpur', 'Madhya Pradesh'),
(1345, 'Khajuraho', 'Madhya Pradesh'),
(1346, 'Harpalpur', 'Madhya Pradesh'),
(1347, 'Nowgong', 'Madhya Pradesh'),
(1348, 'Bijawar', 'Madhya Pradesh'),
(1349, 'Bada Malhera', 'Madhya Pradesh'),
(1350, 'Buxwaha', 'Madhya Pradesh'),
(1351, 'Lavkushnagar', 'Madhya Pradesh'),
(1352, 'Chandla', 'Madhya Pradesh'),
(1353, 'Tikamgarh', 'Madhya Pradesh'),
(1354, 'Prithvipur', 'Madhya Pradesh'),
(1355, 'Palera', 'Madhya Pradesh'),
(1356, 'Bhander', 'Madhya Pradesh'),
(1357, 'Guna', 'Madhya Pradesh'),
(1358, 'Raghogarh', 'Madhya Pradesh'),
(1359, 'Ashoknagar', 'Madhya Pradesh'),
(1360, 'Badarwas', 'Madhya Pradesh'),
(1361, 'Isagarh', 'Madhya Pradesh'),
(1362, 'Mungaoli', 'Madhya Pradesh'),
(1363, 'Chanderi', 'Madhya Pradesh'),
(1364, 'Shivpuri', 'Madhya Pradesh'),
(1365, 'Narwar', 'Madhya Pradesh'),
(1366, 'Bhitarwar', 'Madhya Pradesh'),
(1367, 'Datia', 'Madhya Pradesh'),
(1368, 'Mohna', 'Madhya Pradesh'),
(1369, 'Gwalior', 'Madhya Pradesh'),
(1370, 'Pichhore', 'Madhya Pradesh'),
(1371, 'Dabra-Mp', 'Madhya Pradesh'),
(1372, 'Indergarh', 'Madhya Pradesh'),
(1373, 'Seondha', 'Madhya Pradesh'),
(1374, 'Morena', 'Madhya Pradesh'),
(1375, 'Ambah', 'Madhya Pradesh'),
(1376, 'Gormi', 'Madhya Pradesh'),
(1377, 'Joura', 'Madhya Pradesh'),
(1378, 'Sabalgarh', 'Madhya Pradesh'),
(1379, 'Bijaipur', 'Madhya Pradesh'),
(1380, 'Sheopur', 'Madhya Pradesh'),
(1381, 'Bhind', 'Madhya Pradesh'),
(1382, 'Gohad', 'Madhya Pradesh'),
(1383, 'Mau-Mp', 'Madhya Pradesh'),
(1384, 'Mihona', 'Madhya Pradesh'),
(1385, 'Daboh', 'Madhya Pradesh'),
(1386, 'Chhindwara', 'Madhya Pradesh'),
(1387, 'Sausar', 'Madhya Pradesh'),
(1388, 'Amarwara', 'Madhya Pradesh'),
(1389, 'Patan-Mp', 'Madhya Pradesh'),
(1390, 'Junnardeo', 'Madhya Pradesh'),
(1391, 'Pandhurna', 'Madhya Pradesh'),
(1392, 'Seoni', 'Madhya Pradesh'),
(1393, 'Lakhnadon', 'Madhya Pradesh'),
(1394, 'Nainpur', 'Madhya Pradesh'),
(1395, 'Bijadandi', 'Madhya Pradesh'),
(1396, 'Balaghat', 'Madhya Pradesh'),
(1397, 'Baihar', 'Madhya Pradesh'),
(1398, 'Bichhiya', 'Madhya Pradesh'),
(1399, 'Waraseoni', 'Madhya Pradesh'),
(1400, 'Mandla', 'Madhya Pradesh'),
(1401, 'Shahpura-Dindori', 'Madhya Pradesh'),
(1402, 'Dindori', 'Madhya Pradesh'),
(1403, 'Rajendragram', 'Madhya Pradesh'),
(1404, 'Jabalpur', 'Madhya Pradesh'),
(1405, 'Gotegaon', 'Madhya Pradesh'),
(1406, 'Shahpura-Jabalpur', 'Madhya Pradesh'),
(1407, 'Sihora', 'Madhya Pradesh'),
(1408, 'Bahuriband', 'Madhya Pradesh'),
(1409, 'Pan Umariya', 'Madhya Pradesh'),
(1410, 'Katni', 'Madhya Pradesh'),
(1411, 'Bijeraghogarh', 'Madhya Pradesh'),
(1412, 'Shahdol', 'Madhya Pradesh'),
(1413, 'Burhar', 'Madhya Pradesh'),
(1414, 'Kotma', 'Madhya Pradesh'),
(1415, 'Anuppur', 'Madhya Pradesh'),
(1416, 'Pali-Mp', 'Madhya Pradesh'),
(1417, 'Umaria', 'Madhya Pradesh'),
(1418, 'Beohari', 'Madhya Pradesh'),
(1419, 'Sidhi', 'Madhya Pradesh'),
(1420, 'Satna', 'Madhya Pradesh'),
(1421, 'Rewa', 'Madhya Pradesh'),
(1422, 'Birsinghpur', 'Madhya Pradesh'),
(1423, 'Maihar', 'Madhya Pradesh'),
(1424, 'Nagod', 'Madhya Pradesh'),
(1425, 'Ramnagar-Mp', 'Madhya Pradesh'),
(1426, 'Mangawan', 'Madhya Pradesh'),
(1427, 'Amiliya', 'Madhya Pradesh'),
(1428, 'Teonthar', 'Madhya Pradesh'),
(1429, 'Mauganj', 'Madhya Pradesh'),
(1430, 'Sirmaur', 'Madhya Pradesh'),
(1431, 'Churhat', 'Madhya Pradesh'),
(1432, 'Majhouli', 'Madhya Pradesh'),
(1433, 'Kusmi-Mp', 'Madhya Pradesh'),
(1434, 'Chitrangi', 'Madhya Pradesh'),
(1435, 'Waidhan', 'Madhya Pradesh'),
(1436, 'Singrauli', 'Madhya Pradesh'),
(1437, 'Narsimhapur', 'Madhya Pradesh'),
(1438, 'Tendukheda-Narsimhapur', 'Madhya Pradesh'),
(1439, 'Panna', 'Madhya Pradesh'),
(1440, 'Pawai', 'Madhya Pradesh'),
(1441, 'Aizawl', 'Mizoram'),
(1442, 'Dimapur', 'Nagaland'),
(1443, 'Bhubaneswar', 'Odisha'),
(1444, 'Puri', 'Odisha'),
(1445, 'Khordha', 'Odisha'),
(1447, 'Balugaon', 'Odisha'),
(1448, 'Buguda', 'Odisha'),
(1449, 'Bhapur', 'Odisha'),
(1450, 'Nayagarh', 'Odisha'),
(1451, 'Daspala', 'Odisha'),
(1452, 'Cuttack', 'Odisha'),
(1453, 'Nimapara', 'Odisha'),
(1454, 'Balikuda', 'Odisha'),
(1455, 'Badamba', 'Odisha'),
(1456, 'Banki', 'Odisha'),
(1457, 'Jagatsinghpur', 'Odisha'),
(1458, 'Chandikhol', 'Odisha'),
(1459, 'Kendrapara', 'Odisha'),
(1460, 'Dhenkanala', 'Odisha'),
(1461, 'Talcher', 'Odisha'),
(1462, 'Salepur', 'Odisha'),
(1463, 'Paradip', 'Odisha'),
(1464, 'Raj Nagar', 'Odisha'),
(1465, 'Aul', 'Odisha'),
(1466, 'Chandbali', 'Odisha'),
(1467, 'Binjharpur', 'Odisha'),
(1468, 'Jajpur', 'Odisha'),
(1469, 'Bhuban', 'Odisha'),
(1470, 'Balasore', 'Odisha'),
(1471, 'Baliapal', 'Odisha'),
(1472, 'Jaleshwar', 'Odisha'),
(1473, 'Soro', 'Odisha'),
(1474, 'Hatadihi', 'Odisha'),
(1475, 'Bhadrak', 'Odisha'),
(1476, 'Basudebpur', 'Odisha'),
(1477, 'Baripada', 'Odisha'),
(1478, 'Morada', 'Odisha'),
(1479, 'Betnoti', 'Odisha'),
(1480, 'Jharpokharia', 'Odisha'),
(1481, 'Rairangpur', 'Odisha'),
(1482, 'Champua', 'Odisha'),
(1483, 'Karanjia', 'Odisha'),
(1484, 'Ghatgao', 'Odisha'),
(1485, 'Udala', 'Odisha'),
(1486, 'Kendujhargarh', 'Odisha'),
(1487, 'Anandapur', 'Odisha'),
(1488, 'Telkoi', 'Odisha'),
(1489, 'Barbil', 'Odisha'),
(1490, 'Hindol', 'Odisha'),
(1491, 'Kamakhyanagar', 'Odisha'),
(1492, 'Angul', 'Odisha'),
(1493, 'Kaniha', 'Odisha'),
(1494, 'Athamallika', 'Odisha'),
(1495, 'Pallahara', 'Odisha'),
(1496, 'Chendipada', 'Odisha'),
(1497, 'Redhakhol', 'Odisha'),
(1498, 'Berhampur', 'Odisha'),
(1499, 'Chhatrapur', 'Odisha'),
(1500, 'Digapahandi', 'Odisha'),
(1501, 'Chikiti', 'Odisha'),
(1502, 'Mohana', 'Odisha'),
(1503, 'Purusottampur', 'Odisha'),
(1504, 'Aska', 'Odisha'),
(1505, 'Badagada', 'Odisha'),
(1506, 'Bhanjanagar', 'Odisha'),
(1507, 'Paralakhemundi', 'Odisha'),
(1508, 'Gunupur', 'Odisha'),
(1509, 'Phulbani', 'Odisha'),
(1510, 'Balliguda', 'Odisha'),
(1511, 'Boudh', 'Odisha'),
(1512, 'Sonepur', 'Odisha'),
(1513, 'Balangir', 'Odisha'),
(1514, 'G. Udayagiri', 'Odisha'),
(1515, 'Daringbarhi', 'Odisha'),
(1516, 'Bissamcuttack', 'Odisha'),
(1517, 'Koraput', 'Odisha'),
(1518, 'Jaypore', 'Odisha'),
(1519, 'Tikiri', 'Odisha'),
(1520, 'Rayagada', 'Odisha'),
(1521, 'Balimela', 'Odisha'),
(1522, 'Malkangiri', 'Odisha'),
(1523, 'Pappadahandi', 'Odisha'),
(1524, 'Nabarangapur', 'Odisha'),
(1525, 'Kotapad', 'Odisha'),
(1526, 'Umarkot', 'Odisha'),
(1527, 'Jayapatna', 'Odisha'),
(1528, 'Kalimela', 'Odisha'),
(1529, 'Bhawanipatna', 'Odisha'),
(1530, 'Kesinga', 'Odisha'),
(1531, 'Junagada', 'Odisha'),
(1532, 'Saintala', 'Odisha'),
(1533, 'Titlagarh', 'Odisha'),
(1534, 'Nuaparha', 'Odisha'),
(1535, 'Khariar', 'Odisha'),
(1536, 'Binika', 'Odisha'),
(1537, 'Sohela', 'Odisha'),
(1538, 'Patnagarh', 'Odisha'),
(1539, 'Kantabanji', 'Odisha'),
(1540, 'Padmapur', 'Odisha'),
(1541, 'Sambalpur', 'Odisha'),
(1542, 'Attabira', 'Odisha'),
(1543, 'Bargarh', 'Odisha'),
(1544, 'Bhatli', 'Odisha'),
(1545, 'Kuchinda', 'Odisha'),
(1546, 'Deogarh', 'Odisha'),
(1547, 'Rengali', 'Odisha'),
(1548, 'Jharsuguda', 'Odisha'),
(1549, 'Belpahar', 'Odisha'),
(1550, 'Rajgangpur', 'Odisha'),
(1551, 'Rourkela', 'Odisha'),
(1552, 'Sundergarh', 'Odisha'),
(1553, 'Subdega', 'Odisha'),
(1554, 'Birmitrapur', 'Odisha'),
(1555, 'Banei', 'Odisha'),
(1556, 'Dera Bassi', 'Punjab'),
(1557, 'Rupnagar', 'Punjab'),
(1558, 'Cham Kaur Sahib', 'Punjab'),
(1559, 'Kharar', 'Punjab'),
(1560, 'Mohali', 'Punjab'),
(1561, 'Anandpur Sahib', 'Punjab'),
(1562, 'Nangal', 'Punjab'),
(1563, 'Rajpura', 'Punjab'),
(1564, 'Fatehgarh Sahib', 'Punjab'),
(1565, 'Patiala', 'Punjab'),
(1566, 'Ludhiana', 'Punjab'),
(1567, 'Raikot', 'Punjab'),
(1568, 'Sahnewal', 'Punjab'),
(1569, 'Samrala', 'Punjab'),
(1570, 'Payal', 'Punjab'),
(1571, 'Jallandhar', 'Punjab'),
(1572, 'Mandigobindgarh', 'Punjab'),
(1573, 'Moga', 'Punjab'),
(1574, 'Jagraon', 'Punjab'),
(1575, 'Bagha Purana', 'Punjab'),
(1576, 'Dharamkot', 'Punjab'),
(1577, 'Makhu', 'Punjab'),
(1578, 'Zira', 'Punjab'),
(1579, 'Amritsar', 'Punjab'),
(1580, 'Ajnala', 'Punjab'),
(1581, 'Beas', 'Punjab'),
(1582, 'Tarn Taran', 'Punjab'),
(1583, 'Batala', 'Punjab'),
(1584, 'Bikkiwind', 'Punjab'),
(1585, 'Pathankot', 'Punjab'),
(1586, 'Patti', 'Punjab'),
(1587, 'Majitha', 'Punjab'),
(1588, 'Gurdaspur', 'Punjab'),
(1589, 'Dera Baba Nanak', 'Punjab'),
(1590, 'Shri Govindpur', 'Punjab'),
(1591, 'Mukerian', 'Punjab'),
(1592, 'Bhogpur', 'Punjab'),
(1593, 'Nakodar', 'Punjab'),
(1594, 'Nawanshahr', 'Punjab'),
(1595, 'Phagwara', 'Punjab'),
(1596, 'Phillaur', 'Punjab'),
(1597, 'Hoshiarpur', 'Punjab'),
(1598, 'Dasuya', 'Punjab'),
(1599, 'Talwara', 'Punjab'),
(1600, 'Mahalpur', 'Punjab'),
(1601, 'Kapurthala', 'Punjab'),
(1602, 'Sultanpur Lodhi', 'Punjab'),
(1603, 'Begowal', 'Punjab'),
(1604, 'Samana', 'Punjab'),
(1605, 'Patran', 'Punjab'),
(1606, 'Nabha', 'Punjab'),
(1607, 'Sangrur', 'Punjab'),
(1608, 'Maler Kotla', 'Punjab'),
(1609, 'Barnala', 'Punjab'),
(1610, 'Sunam', 'Punjab'),
(1611, 'Lehragaga', 'Punjab'),
(1612, 'Bhadaur', 'Punjab'),
(1613, 'Longowal', 'Punjab'),
(1614, 'Rampura Phul', 'Punjab'),
(1615, 'Bhatinda', 'Punjab'),
(1616, 'Jaitu', 'Punjab'),
(1617, 'Faridkot', 'Punjab'),
(1618, 'Malout', 'Punjab'),
(1619, 'Guru Har Sahai', 'Punjab'),
(1620, 'Muktsar', 'Punjab'),
(1621, 'Raman', 'Punjab'),
(1622, 'Budhlada', 'Punjab'),
(1623, 'Mansa', 'Punjab'),
(1624, 'Sardulgarh', 'Punjab'),
(1625, 'Maur', 'Punjab'),
(1626, 'Ferozepur', 'Punjab'),
(1627, 'Jalalabad', 'Punjab'),
(1628, 'Abohar', 'Punjab'),
(1629, 'Fazilka', 'Punjab');
INSERT INTO `statesandcity` (`id`, `city`, `state`) VALUES
(1630, 'Pondicherry', 'Pondicherry'),
(1631, 'Karaikal', 'Pondicherry'),
(1632, 'Bhiwadi', 'Rajasthan'),
(1633, 'Alwar', 'Rajasthan'),
(1634, 'Behror', 'Rajasthan'),
(1635, 'Viratnagar', 'Rajasthan'),
(1636, 'Khairtal', 'Rajasthan'),
(1637, 'Mahwa', 'Rajasthan'),
(1638, 'Bansur', 'Rajasthan'),
(1639, 'Tijara', 'Rajasthan'),
(1640, 'Rajgarh-Rj', 'Rajasthan'),
(1641, 'Nagar', 'Rajasthan'),
(1642, 'Jaipur', 'Rajasthan'),
(1643, 'Suratgarh', 'Rajasthan'),
(1644, 'Degana', 'Rajasthan'),
(1645, 'Bagru', 'Rajasthan'),
(1646, 'Dausa', 'Rajasthan'),
(1647, 'Achrol', 'Rajasthan'),
(1648, 'Phagi', 'Rajasthan'),
(1649, 'Phulera', 'Rajasthan'),
(1650, 'Bassi', 'Rajasthan'),
(1651, 'Bandikui', 'Rajasthan'),
(1652, 'Nadoti', 'Rajasthan'),
(1653, 'Lalsot', 'Rajasthan'),
(1654, 'Chomu', 'Rajasthan'),
(1655, 'Reengus', 'Rajasthan'),
(1656, 'Chaksu', 'Rajasthan'),
(1657, 'Tonk', 'Rajasthan'),
(1658, 'Niwai', 'Rajasthan'),
(1659, 'Lakheri', 'Rajasthan'),
(1660, 'Nainwa', 'Rajasthan'),
(1661, 'Malpura', 'Rajasthan'),
(1662, 'Deoli', 'Rajasthan'),
(1663, 'Ajmer', 'Rajasthan'),
(1664, 'Pushkar', 'Rajasthan'),
(1665, 'Pisangan', 'Rajasthan'),
(1666, 'Beawar', 'Rajasthan'),
(1667, 'Ratangarh', 'Rajasthan'),
(1668, 'Nasirabad', 'Rajasthan'),
(1669, 'Kekri', 'Rajasthan'),
(1670, 'Bijainagar', 'Rajasthan'),
(1671, 'Kishangarh', 'Rajasthan'),
(1672, 'Kuchaman City', 'Rajasthan'),
(1673, 'Makrana', 'Rajasthan'),
(1674, 'Asind', 'Rajasthan'),
(1675, 'Sojat', 'Rajasthan'),
(1676, 'Desuri', 'Rajasthan'),
(1677, 'Falna', 'Rajasthan'),
(1678, 'Pali', 'Rajasthan'),
(1679, 'Sumerpur', 'Rajasthan'),
(1680, 'Jaitaran', 'Rajasthan'),
(1681, 'Luni', 'Rajasthan'),
(1682, 'Sirohi', 'Rajasthan'),
(1683, 'Kotra', 'Rajasthan'),
(1684, 'Abu Road', 'Rajasthan'),
(1685, 'Jalore', 'Rajasthan'),
(1686, 'Bhinmal', 'Rajasthan'),
(1687, 'Bhilwara', 'Rajasthan'),
(1688, 'Kotri', 'Rajasthan'),
(1689, 'Banera', 'Rajasthan'),
(1690, 'Shahpura-Rj', 'Rajasthan'),
(1691, 'Mandalgarh', 'Rajasthan'),
(1692, 'Sahara', 'Rajasthan'),
(1693, 'Chittor Garh', 'Rajasthan'),
(1694, 'Begun', 'Rajasthan'),
(1695, 'Bhinder', 'Rajasthan'),
(1696, 'Kapasan', 'Rajasthan'),
(1697, 'Fatehnagar', 'Rajasthan'),
(1698, 'Bari Sadri', 'Rajasthan'),
(1699, 'Nimbahera', 'Rajasthan'),
(1700, 'Pratapgarh-Rj', 'Rajasthan'),
(1701, 'Banswara', 'Rajasthan'),
(1703, 'Gogunda', 'Rajasthan'),
(1704, 'Sarada', 'Rajasthan'),
(1705, 'Dhariawad', 'Rajasthan'),
(1706, 'Bhatewar', 'Rajasthan'),
(1707, 'Nathdwara', 'Rajasthan'),
(1708, 'Rajsamand', 'Rajasthan'),
(1709, 'Dungarpur', 'Rajasthan'),
(1710, 'Ghatol', 'Rajasthan'),
(1711, 'Sajjangarh', 'Rajasthan'),
(1713, 'Kaman', 'Rajasthan'),
(1714, 'Bayana', 'Rajasthan'),
(1715, 'Deeg', 'Rajasthan'),
(1716, 'Sadulpur', 'Rajasthan'),
(1717, 'Sawai Madhopur', 'Rajasthan'),
(1718, 'Khandar', 'Rajasthan'),
(1720, 'Hindaun', 'Rajasthan'),
(1721, 'Karauli', 'Rajasthan'),
(1722, 'Bundi', 'Rajasthan'),
(1724, 'Kapren', 'Rajasthan'),
(1725, 'Rawatbhata', 'Rajasthan'),
(1726, 'Kewal Nagar', 'Rajasthan'),
(1727, 'Anta', 'Rajasthan'),
(1728, 'Baran', 'Rajasthan'),
(1730, 'Sangod', 'Rajasthan'),
(1731, 'Atru', 'Rajasthan'),
(1732, 'Chhabra', 'Rajasthan'),
(1733, 'Aklera', 'Rajasthan'),
(1734, 'Jhalawar', 'Rajasthan'),
(1735, 'Ramganj Mandi', 'Rajasthan'),
(1736, 'Dhaulpur', 'Rajasthan'),
(1737, 'Bari', 'Rajasthan'),
(1738, 'Churu', 'Rajasthan'),
(1739, 'Fatehpur-Rj', 'Rajasthan'),
(1740, 'Jhunjhunu', 'Rajasthan'),
(1741, 'Pilani', 'Rajasthan'),
(1742, 'Taranagar', 'Rajasthan'),
(1743, 'Sardarshahar', 'Rajasthan'),
(1744, 'Sujangarh', 'Rajasthan'),
(1745, 'Nagaur', 'Rajasthan'),
(1746, 'Sri Dungargarh', 'Rajasthan'),
(1747, 'Sikar', 'Rajasthan'),
(1748, 'Didwana', 'Rajasthan'),
(1749, 'Laxmangarh', 'Rajasthan'),
(1750, 'Udaipurwati', 'Rajasthan'),
(1751, 'Neem Ka Thana', 'Rajasthan'),
(1752, 'Khetri', 'Rajasthan'),
(1753, 'Bikaner', 'Rajasthan'),
(1754, 'Chhatargarh', 'Rajasthan'),
(1755, 'Khajuwala', 'Rajasthan'),
(1756, 'Nokha', 'Rajasthan'),
(1757, 'Kolayat', 'Rajasthan'),
(1758, 'Lunkaransar', 'Rajasthan'),
(1759, 'Sriganganagar', 'Rajasthan'),
(1760, 'Raisinghnagar', 'Rajasthan'),
(1761, 'Sangaria', 'Rajasthan'),
(1762, 'Hanumangarh', 'Rajasthan'),
(1763, 'Bhadra', 'Rajasthan'),
(1764, 'Nohar', 'Rajasthan'),
(1765, 'Rawatsar', 'Rajasthan'),
(1766, 'Anupgarh', 'Rajasthan'),
(1767, 'Osian', 'Rajasthan'),
(1768, 'Merta', 'Rajasthan'),
(1769, 'Jodhpur', 'Rajasthan'),
(1770, 'Shikargarh', 'Rajasthan'),
(1771, 'Shergarh', 'Rajasthan'),
(1772, 'Phalodi', 'Rajasthan'),
(1773, 'Bhopalgarh', 'Rajasthan'),
(1774, 'Dhorimana', 'Rajasthan'),
(1775, 'Sindhari', 'Rajasthan'),
(1777, 'Sheo', 'Rajasthan'),
(1778, 'Balotra', 'Rajasthan'),
(1779, 'Baytu', 'Rajasthan'),
(1780, 'Jaisalmer', 'Rajasthan'),
(1781, 'Pokhran', 'Rajasthan'),
(1782, 'Mohangarh', 'Rajasthan'),
(1783, 'Gangtok', 'Sikkim'),
(1784, 'Rangpo', 'Sikkim'),
(1785, 'Sholinghur', 'Tamil Nadu'),
(1786, 'Chennai', 'Tamil Nadu'),
(1787, 'Vandalur', 'Tamil Nadu'),
(1788, 'Redhills', 'Tamil Nadu'),
(1789, 'Minjur', 'Tamil Nadu'),
(1790, 'Uthukottai', 'Tamil Nadu'),
(1791, 'Gummudipoondi', 'Tamil Nadu'),
(1792, 'Ponneri', 'Tamil Nadu'),
(1793, 'Tiruvallur', 'Tamil Nadu'),
(1794, 'Sriperumbudur', 'Tamil Nadu'),
(1795, 'Chengalpattu', 'Tamil Nadu'),
(1796, 'Maraimalainagar', 'Tamil Nadu'),
(1797, 'Kalpakkam', 'Tamil Nadu'),
(1798, 'Arakkonam', 'Tamil Nadu'),
(1799, 'Kanchipuram', 'Tamil Nadu'),
(1800, 'Maduranthakam', 'Tamil Nadu'),
(1801, 'Tindivanam', 'Tamil Nadu'),
(1802, 'Gingee', 'Tamil Nadu'),
(1803, 'Tiruvannamalai', 'Tamil Nadu'),
(1804, 'Arni', 'Tamil Nadu'),
(1805, 'Musiri', 'Tamil Nadu'),
(1806, 'Cheyyar', 'Tamil Nadu'),
(1807, 'Chidambaram', 'Tamil Nadu'),
(1808, 'Vellore', 'Tamil Nadu'),
(1809, 'Villupuram', 'Tamil Nadu'),
(1810, 'Tirukovilur', 'Tamil Nadu'),
(1811, 'Ghengam', 'Tamil Nadu'),
(1812, 'Vriddhachalam', 'Tamil Nadu'),
(1813, 'Ulundurpet', 'Tamil Nadu'),
(1814, 'Kallakurichi', 'Tamil Nadu'),
(1815, 'Perambalur', 'Tamil Nadu'),
(1816, 'Cuddalore', 'Tamil Nadu'),
(1817, 'Neyveli', 'Tamil Nadu'),
(1818, 'Mayiladuthurai', 'Tamil Nadu'),
(1819, 'Jayankondam', 'Tamil Nadu'),
(1820, 'Sirkaali', 'Tamil Nadu'),
(1821, 'Kumbakonam', 'Tamil Nadu'),
(1822, 'Thiruvarur', 'Tamil Nadu'),
(1823, 'Nagapattinam', 'Tamil Nadu'),
(1824, 'Mannargudi', 'Tamil Nadu'),
(1825, 'Vedaranyam', 'Tamil Nadu'),
(1826, 'Thanjavur', 'Tamil Nadu'),
(1827, 'Padukottai', 'Tamil Nadu'),
(1828, 'Pattukottai', 'Tamil Nadu'),
(1829, 'Aranthangi', 'Tamil Nadu'),
(1830, 'Tiruchirapally', 'Tamil Nadu'),
(1831, 'Kanyakumari', 'Tamil Nadu'),
(1832, 'Thuraiyur', 'Tamil Nadu'),
(1833, 'Manapparai', 'Tamil Nadu'),
(1834, 'Srirangam', 'Tamil Nadu'),
(1835, 'Karur', 'Tamil Nadu'),
(1836, 'Ariyalur', 'Tamil Nadu'),
(1837, 'Madurai', 'Tamil Nadu'),
(1838, 'Karaikudi', 'Tamil Nadu'),
(1839, 'Mudukulathur', 'Tamil Nadu'),
(1840, 'Sivagangai', 'Tamil Nadu'),
(1841, 'Devakottai', 'Tamil Nadu'),
(1842, 'Thiruvadanai', 'Tamil Nadu'),
(1843, 'Kalaiyarkovil', 'Tamil Nadu'),
(1844, 'Ramnad', 'Tamil Nadu'),
(1845, 'Kilakarai', 'Tamil Nadu'),
(1846, 'Rameshwaram', 'Tamil Nadu'),
(1847, 'Tirunelvelli', 'Tamil Nadu'),
(1848, 'Mana Madurai', 'Tamil Nadu'),
(1849, 'Paramukudai', 'Tamil Nadu'),
(1850, 'Dindigul', 'Tamil Nadu'),
(1851, 'Kodaikanal', 'Tamil Nadu'),
(1852, 'Batlagundu', 'Tamil Nadu'),
(1853, 'Theni', 'Tamil Nadu'),
(1854, 'Natham', 'Tamil Nadu'),
(1855, 'Melur', 'Tamil Nadu'),
(1856, 'Palani', 'Tamil Nadu'),
(1857, 'Oddanchatram', 'Tamil Nadu'),
(1858, 'Dharapuram', 'Tamil Nadu'),
(1859, 'Tirumangalam', 'Tamil Nadu'),
(1860, 'Usilampatti', 'Tamil Nadu'),
(1862, 'Virudunagar', 'Tamil Nadu'),
(1863, 'Sivakasi', 'Tamil Nadu'),
(1864, 'Aruppukottai', 'Tamil Nadu'),
(1865, 'Rajapalyam', 'Tamil Nadu'),
(1866, 'Kovilpatti', 'Tamil Nadu'),
(1867, 'Vallioor', 'Tamil Nadu'),
(1868, 'Sattankulam', 'Tamil Nadu'),
(1869, 'Tenkasi', 'Tamil Nadu'),
(1870, 'Thoothukkudi', 'Tamil Nadu'),
(1871, 'Ambasamudram', 'Tamil Nadu'),
(1872, 'Puliyangudi', 'Tamil Nadu'),
(1873, 'Tiruchendur', 'Tamil Nadu'),
(1874, 'Nagercoil', 'Tamil Nadu'),
(1875, 'Kalkulam', 'Tamil Nadu'),
(1876, 'Marthandam', 'Tamil Nadu'),
(1877, 'Ranipet', 'Tamil Nadu'),
(1878, 'Gudiyattam', 'Tamil Nadu'),
(1879, 'Vaniyambadi', 'Tamil Nadu'),
(1880, 'Krishnagiri', 'Tamil Nadu'),
(1881, 'Hosur', 'Tamil Nadu'),
(1882, 'Kaveripattanam', 'Tamil Nadu'),
(1883, 'Pallacode', 'Tamil Nadu'),
(1884, 'Tiruppattur', 'Tamil Nadu'),
(1885, 'Dharmapuri', 'Tamil Nadu'),
(1886, 'Uthangarai', 'Tamil Nadu'),
(1887, 'Harur', 'Tamil Nadu'),
(1888, 'Vellakovil', 'Tamil Nadu'),
(1889, 'Salem', 'Tamil Nadu'),
(1890, 'Attur', 'Tamil Nadu'),
(1891, 'Rasipuram', 'Tamil Nadu'),
(1892, 'Mettur', 'Tamil Nadu'),
(1893, 'Omalur', 'Tamil Nadu'),
(1894, 'Sankari', 'Tamil Nadu'),
(1895, 'Tirupur', 'Tamil Nadu'),
(1896, 'Nallampalli', 'Tamil Nadu'),
(1897, 'Pennagaram', 'Tamil Nadu'),
(1898, 'Namakkal', 'Tamil Nadu'),
(1899, 'Erode', 'Tamil Nadu'),
(1900, 'Gopichettipalayam', 'Tamil Nadu'),
(1901, 'Kangayam', 'Tamil Nadu'),
(1902, 'Avinashi', 'Tamil Nadu'),
(1903, 'Udumalaippettai', 'Tamil Nadu'),
(1904, 'Anthiyur', 'Tamil Nadu'),
(1905, 'Sathyamangalam', 'Tamil Nadu'),
(1906, 'Palladam', 'Tamil Nadu'),
(1907, 'Annur', 'Tamil Nadu'),
(1908, 'Pollachi', 'Tamil Nadu'),
(1909, 'Mettupalayam', 'Tamil Nadu'),
(1910, 'Coimbatore', 'Tamil Nadu'),
(1911, 'Ooty', 'Tamil Nadu'),
(1912, 'Coonoor', 'Tamil Nadu'),
(1913, 'Kotgiri', 'Tamil Nadu'),
(1914, 'Gudalur', 'Tamil Nadu'),
(1915, 'Agartala', 'Tripura'),
(1916, 'Hyderabad', 'Telangana'),
(1917, 'Medchal', 'Telangana'),
(1918, 'Vikarabad', 'Telangana'),
(1919, 'Tandur', 'Telangana'),
(1920, 'Pargi', 'Telangana'),
(1921, 'Chevella', 'Telangana'),
(1922, 'Maheshwaram', 'Telangana'),
(1923, 'Ibrahimpatnam', 'Telangana'),
(1924, 'Sangareddy', 'Telangana'),
(1925, 'Medak', 'Telangana'),
(1926, 'Siddipet', 'Telangana'),
(1928, 'Zaheerabad', 'Telangana'),
(1929, 'Gajwel', 'Telangana'),
(1930, 'Narayankhed', 'Telangana'),
(1931, 'Husnabad', 'Telangana'),
(1932, 'Nizamabad', 'Telangana'),
(1933, 'Kamareddy', 'Telangana'),
(1934, 'Yellareddy', 'Telangana'),
(1935, 'Banswada', 'Telangana'),
(1936, 'Dichpalle', 'Telangana'),
(1937, 'Armoor', 'Telangana'),
(1938, 'Bodhan', 'Telangana'),
(1939, 'Balkonda', 'Telangana'),
(1940, 'Adilabad', 'Telangana'),
(1941, 'Ichoda', 'Telangana'),
(1942, 'Mudhole', 'Telangana'),
(1943, 'Bhainsa', 'Telangana'),
(1944, 'Nirmal', 'Telangana'),
(1945, 'Chennur', 'Telangana'),
(1946, 'Khanapur', 'Telangana'),
(1948, 'Mancherial', 'Telangana'),
(1949, 'Bellampalli', 'Telangana'),
(1950, 'Kaghaznagar', 'Telangana'),
(1951, 'Boath', 'Telangana'),
(1952, 'Utnoor', 'Telangana'),
(1953, 'Karimnagar', 'Telangana'),
(1954, 'Huzurabad', 'Telangana'),
(1955, 'Peddapalli', 'Telangana'),
(1956, 'Manthani', 'Telangana'),
(1957, 'Choppadandi', 'Telangana'),
(1958, 'Godavarikhani', 'Telangana'),
(1959, 'Siricilla', 'Telangana'),
(1960, 'Vemulawada', 'Telangana'),
(1961, 'Jagtial', 'Telangana'),
(1962, 'Metpally', 'Telangana'),
(1963, 'Manakondur', 'Telangana'),
(1964, 'Warangal', 'Telangana'),
(1965, 'Mahabubabad', 'Telangana'),
(1966, 'Narsampet', 'Telangana'),
(1967, 'Station Ghanpur', 'Telangana'),
(1968, 'Wardhannapet', 'Telangana'),
(1969, 'Parkal', 'Telangana'),
(1970, 'Eturnagaram', 'Telangana'),
(1971, 'Aler', 'Telangana'),
(1972, 'Khammam', 'Telangana'),
(1973, 'Kothagudem', 'Telangana'),
(1974, 'Bhadrachalam', 'Telangana'),
(1975, 'Palwancha', 'Telangana'),
(1976, 'Manugur', 'Telangana'),
(1977, 'Yellandu', 'Telangana'),
(1978, 'Palair', 'Telangana'),
(1979, 'Sathupalli', 'Telangana'),
(1980, 'Wyra', 'Telangana'),
(1981, 'Thallada', 'Telangana'),
(1982, 'Nalgonda', 'Telangana'),
(1983, 'Valigonda', 'Telangana'),
(1984, 'Ramannapet', 'Telangana'),
(1985, 'Chityal', 'Telangana'),
(1986, 'Bhongir', 'Telangana'),
(1987, 'Huzurnagar', 'Telangana'),
(1988, 'Nakrekal', 'Telangana'),
(1989, 'Kodad', 'Telangana'),
(1990, 'Miryalguda', 'Telangana'),
(1991, 'Suryapet', 'Telangana'),
(1992, 'Devarakonda', 'Telangana'),
(1993, 'Munugode', 'Telangana'),
(1994, 'Choutuppal', 'Telangana'),
(1995, 'Pochampally', 'Telangana'),
(1996, 'Mahbubnagar', 'Telangana'),
(1997, 'Wanaparthy', 'Telangana'),
(1998, 'Gadwal', 'Telangana'),
(1999, 'Devarkadra', 'Telangana'),
(2000, 'Alampur', 'Telangana'),
(2001, 'Nagarkurnool', 'Telangana'),
(2002, 'Shadnagar', 'Telangana'),
(2003, 'Narayanpet', 'Telangana'),
(2004, 'Jadcherla', 'Telangana'),
(2005, 'Kalwakurthy', 'Telangana'),
(2006, 'Kashipur', 'Uttarakhand'),
(2007, 'Roorkee', 'Uttarakhand'),
(2008, 'Dehradun', 'Uttarakhand'),
(2009, 'Rishikesh', 'Uttarakhand'),
(2010, 'Haridwar', 'Uttarakhand'),
(2011, 'Haldwani', 'Uttarakhand'),
(2012, 'Rudrapur', 'Uttarakhand'),
(2013, 'Mau-Up', 'Uttar Pradesh'),
(2014, 'Ghaziabad', 'Uttar Pradesh'),
(2015, 'Greater Noida', 'Uttar Pradesh'),
(2016, 'Lucknow', 'Uttar Pradesh'),
(2017, 'Loni', 'Uttar Pradesh'),
(2018, 'Modinagar', 'Uttar Pradesh'),
(2019, 'Noida', 'Uttar Pradesh'),
(2020, 'Aligarh', 'Uttar Pradesh'),
(2021, 'Sikandra Rao', 'Uttar Pradesh'),
(2022, 'Khair', 'Uttar Pradesh'),
(2023, 'Iglas', 'Uttar Pradesh'),
(2024, 'Atrauli', 'Uttar Pradesh'),
(2025, 'Khurja', 'Uttar Pradesh'),
(2026, 'Kasganj', 'Uttar Pradesh'),
(2027, 'Jewar', 'Uttar Pradesh'),
(2028, 'Hathras', 'Uttar Pradesh'),
(2029, 'Bulandshahr', 'Uttar Pradesh'),
(2030, 'Babrala', 'Uttar Pradesh'),
(2031, 'Anupshahar', 'Uttar Pradesh'),
(2032, 'Dibai', 'Uttar Pradesh'),
(2033, 'Siyana', 'Uttar Pradesh'),
(2034, 'Jalesar', 'Uttar Pradesh'),
(2035, 'Mainpuri', 'Uttar Pradesh'),
(2036, 'Jasrana', 'Uttar Pradesh'),
(2037, 'Aliganj', 'Uttar Pradesh'),
(2038, 'Kishni', 'Uttar Pradesh'),
(2039, 'Etawah', 'Uttar Pradesh'),
(2040, 'Bharthana', 'Uttar Pradesh'),
(2041, 'Auraiya', 'Uttar Pradesh'),
(2042, 'Bidhuna', 'Uttar Pradesh'),
(2043, 'Dibiyapur', 'Uttar Pradesh'),
(2044, 'Rasulabad', 'Uttar Pradesh'),
(2045, 'Etah', 'Uttar Pradesh'),
(2046, 'Patiyali', 'Uttar Pradesh'),
(2047, 'Kanpur', 'Uttar Pradesh'),
(2048, 'Bhognipur', 'Uttar Pradesh'),
(2049, 'Ghatampur', 'Uttar Pradesh'),
(2050, 'Bilhaur', 'Uttar Pradesh'),
(2051, 'Safipur', 'Uttar Pradesh'),
(2052, 'Bighapur', 'Uttar Pradesh'),
(2053, 'Kaimganj', 'Uttar Pradesh'),
(2054, 'Farrukhabad', 'Uttar Pradesh'),
(2055, 'Jalalabad-Shahjahanpur', 'Uttar Pradesh'),
(2056, 'Chhibramau', 'Uttar Pradesh'),
(2057, 'Kannauj', 'Uttar Pradesh'),
(2058, 'Unnao', 'Uttar Pradesh'),
(2059, 'Mohanlalganj', 'Uttar Pradesh'),
(2060, 'Hasanganj', 'Uttar Pradesh'),
(2061, 'Banda-Up', 'Uttar Pradesh'),
(2062, 'Allahabad', 'Uttar Pradesh'),
(2063, 'Atarra', 'Uttar Pradesh'),
(2064, 'Baberu', 'Uttar Pradesh'),
(2065, 'Hamirpur', 'Uttar Pradesh'),
(2066, 'Chitrakoot', 'Uttar Pradesh'),
(2067, 'Manjhanpur', 'Uttar Pradesh'),
(2068, 'Kalyanpur', 'Uttar Pradesh'),
(2069, 'Maudaha', 'Uttar Pradesh'),
(2070, 'Mahoba', 'Uttar Pradesh'),
(2071, 'Rath', 'Uttar Pradesh'),
(2072, 'Bewar', 'Uttar Pradesh'),
(2073, 'Garautha', 'Uttar Pradesh'),
(2074, 'Koraon', 'Uttar Pradesh'),
(2075, 'Chail', 'Uttar Pradesh'),
(2076, 'Phoolpur', 'Uttar Pradesh'),
(2077, 'Kaushambi', 'Uttar Pradesh'),
(2078, 'Kunda', 'Uttar Pradesh'),
(2079, 'Unchahar', 'Uttar Pradesh'),
(2080, 'Handia', 'Uttar Pradesh'),
(2081, 'Fatehpur-Up', 'Uttar Pradesh'),
(2082, 'Khaga', 'Uttar Pradesh'),
(2083, 'Bindki', 'Uttar Pradesh'),
(2084, 'Varanasi', 'Uttar Pradesh'),
(2085, 'Saidpur', 'Uttar Pradesh'),
(2086, 'Kerakat', 'Uttar Pradesh'),
(2087, 'Pindra', 'Uttar Pradesh'),
(2088, 'Bhadohi', 'Uttar Pradesh'),
(2089, 'Chunar', 'Uttar Pradesh'),
(2090, 'Mirzapur', 'Uttar Pradesh'),
(2091, 'Barhaj', 'Uttar Pradesh'),
(2092, 'Belthara Road', 'Uttar Pradesh'),
(2093, 'Rasra', 'Uttar Pradesh'),
(2094, 'Maunath Bhanjan', 'Uttar Pradesh'),
(2095, 'Ballia', 'Uttar Pradesh'),
(2096, 'Sikanderpur', 'Uttar Pradesh'),
(2097, 'Jaunpur', 'Uttar Pradesh'),
(2098, 'Badlapur', 'Uttar Pradesh'),
(2099, 'Machhali Shahar', 'Uttar Pradesh'),
(2100, 'Rampur', 'Uttar Pradesh'),
(2101, 'Shahganj', 'Uttar Pradesh'),
(2102, 'Kadipur', 'Uttar Pradesh'),
(2103, 'Lambhua', 'Uttar Pradesh'),
(2105, 'Lalganj-Azamgarh', 'Uttar Pradesh'),
(2106, 'Faizabad', 'Uttar Pradesh'),
(2107, 'Rudauli', 'Uttar Pradesh'),
(2108, 'Ram Sanehi Ghat', 'Uttar Pradesh'),
(2109, 'Akbarpur-Ambedkar Nagar', 'Uttar Pradesh'),
(2110, 'Tanda', 'Uttar Pradesh'),
(2111, 'Kurebhar', 'Uttar Pradesh'),
(2112, 'Milkipur', 'Uttar Pradesh'),
(2113, 'Haraiya', 'Uttar Pradesh'),
(2114, 'Bikapur', 'Uttar Pradesh'),
(2115, 'Bara Banki', 'Uttar Pradesh'),
(2116, 'Haidargarh', 'Uttar Pradesh'),
(2117, 'Ramnagar-Up', 'Uttar Pradesh'),
(2118, 'Mahmudabad', 'Uttar Pradesh'),
(2119, 'Malihabad', 'Uttar Pradesh'),
(2120, 'Sidhauli', 'Uttar Pradesh'),
(2121, 'Amethi', 'Uttar Pradesh'),
(2122, 'Gauriganj', 'Uttar Pradesh'),
(2123, 'Sultanpur', 'Uttar Pradesh'),
(2124, 'Tiloi', 'Uttar Pradesh'),
(2125, 'Musafirkhana', 'Uttar Pradesh'),
(2126, 'Rai Bareily', 'Uttar Pradesh'),
(2127, 'Lalganj-Raebareli', 'Uttar Pradesh'),
(2128, 'Pratapgarh-Up', 'Uttar Pradesh'),
(2129, 'Obra', 'Uttar Pradesh'),
(2130, 'Robertsganj', 'Uttar Pradesh'),
(2131, 'Renukoot', 'Uttar Pradesh'),
(2132, 'Marihan', 'Uttar Pradesh'),
(2133, 'Dudhinagar', 'Uttar Pradesh'),
(2134, 'Anpara', 'Uttar Pradesh'),
(2136, 'Chandauli', 'Uttar Pradesh'),
(2137, 'Zamania', 'Uttar Pradesh'),
(2138, 'Muhammadabad', 'Uttar Pradesh'),
(2139, 'Ghazipur', 'Uttar Pradesh'),
(2140, 'Mardah', 'Uttar Pradesh'),
(2141, 'Hardoi', 'Uttar Pradesh'),
(2142, 'Bilgram', 'Uttar Pradesh'),
(2143, 'Shahbad-Hardoi', 'Uttar Pradesh'),
(2144, 'Sandila', 'Uttar Pradesh'),
(2145, 'Misrikah', 'Uttar Pradesh'),
(2146, 'Pihani', 'Uttar Pradesh'),
(2147, 'Shahjahanpur', 'Uttar Pradesh'),
(2148, 'Powayan', 'Uttar Pradesh'),
(2149, 'Puranpur', 'Uttar Pradesh'),
(2150, 'Tilhar', 'Uttar Pradesh'),
(2151, 'Dataganj', 'Uttar Pradesh'),
(2152, 'Bareilly', 'Uttar Pradesh'),
(2153, 'Faridpur', 'Uttar Pradesh'),
(2154, 'Baheri', 'Uttar Pradesh'),
(2155, 'Nawabganj', 'Uttar Pradesh'),
(2156, 'Aonia', 'Uttar Pradesh'),
(2158, 'Budaun', 'Uttar Pradesh'),
(2159, 'Bisauli', 'Uttar Pradesh'),
(2160, 'Sahaswan', 'Uttar Pradesh'),
(2161, 'Chandausi', 'Uttar Pradesh'),
(2162, 'Moradabad', 'Uttar Pradesh'),
(2163, 'Amroha', 'Uttar Pradesh'),
(2164, 'Hasanpur', 'Uttar Pradesh'),
(2165, 'Gajraula', 'Uttar Pradesh'),
(2166, 'Sambhal', 'Uttar Pradesh'),
(2167, 'Kanth', 'Uttar Pradesh'),
(2168, 'Thakurdwara', 'Uttar Pradesh'),
(2169, 'Bilari', 'Uttar Pradesh'),
(2170, 'Bilaspur-Up', 'Uttar Pradesh'),
(2171, 'Shahbad-Rampur', 'Uttar Pradesh'),
(2172, 'Suar', 'Uttar Pradesh'),
(2173, 'Hapur', 'Uttar Pradesh'),
(2174, 'Dhaulana', 'Uttar Pradesh'),
(2175, 'Bijnor', 'Uttar Pradesh'),
(2176, 'Najibabad', 'Uttar Pradesh'),
(2177, 'Nagina', 'Uttar Pradesh'),
(2178, 'Chandpur', 'Uttar Pradesh'),
(2179, 'Dhampur', 'Uttar Pradesh'),
(2180, 'Saharanpur', 'Uttar Pradesh'),
(2181, 'Behat', 'Uttar Pradesh'),
(2182, 'Nakur', 'Uttar Pradesh'),
(2183, 'Shamli', 'Uttar Pradesh'),
(2184, 'Deoband', 'Uttar Pradesh'),
(2185, 'Jalalabad-Shamli', 'Uttar Pradesh'),
(2186, 'Meerut', 'Uttar Pradesh'),
(2187, 'Baghpat', 'Uttar Pradesh'),
(2188, 'Mawana', 'Uttar Pradesh'),
(2189, 'Sardhana', 'Uttar Pradesh'),
(2190, 'Baraut', 'Uttar Pradesh'),
(2191, 'Muzzafarnagar', 'Uttar Pradesh'),
(2192, 'Sitapur', 'Uttar Pradesh'),
(2193, 'Laharpur', 'Uttar Pradesh'),
(2194, 'Biswan', 'Uttar Pradesh'),
(2195, 'Mahasi', 'Uttar Pradesh'),
(2196, 'Lakhimpur', 'Uttar Pradesh'),
(2197, 'Dhaurahara', 'Uttar Pradesh'),
(2198, 'Mohammadi', 'Uttar Pradesh'),
(2199, 'Pilibhit', 'Uttar Pradesh'),
(2200, 'Bisalpur', 'Uttar Pradesh'),
(2201, 'Gola Gokarannath', 'Uttar Pradesh'),
(2202, 'Nighasan', 'Uttar Pradesh'),
(2203, 'Gonda', 'Uttar Pradesh'),
(2204, 'Mankapur', 'Uttar Pradesh'),
(2205, 'Colonelganj', 'Uttar Pradesh'),
(2206, 'Balrampur', 'Uttar Pradesh'),
(2207, 'Tulsipur', 'Uttar Pradesh'),
(2208, 'Payagpur', 'Uttar Pradesh'),
(2209, 'Bhinga', 'Uttar Pradesh'),
(2210, 'Utraula', 'Uttar Pradesh'),
(2211, 'Tarapganj', 'Uttar Pradesh'),
(2212, 'Domariyaganj', 'Uttar Pradesh'),
(2213, 'Bahraich', 'Uttar Pradesh'),
(2214, 'Nanpara', 'Uttar Pradesh'),
(2215, 'Kaisarganj', 'Uttar Pradesh'),
(2216, 'Basti', 'Uttar Pradesh'),
(2217, 'Khalilabad', 'Uttar Pradesh'),
(2218, 'Bansi', 'Uttar Pradesh'),
(2219, 'Tetri Bazar', 'Uttar Pradesh'),
(2220, 'Bansgaon', 'Uttar Pradesh'),
(2221, 'Shohratgarh', 'Uttar Pradesh'),
(2222, 'Campierganj', 'Uttar Pradesh'),
(2223, 'Gorakhpur', 'Uttar Pradesh'),
(2224, 'Maharajganj', 'Uttar Pradesh'),
(2225, 'Nautanwa', 'Uttar Pradesh'),
(2226, 'Chauri Chaura', 'Uttar Pradesh'),
(2227, 'Gola', 'Uttar Pradesh'),
(2228, 'Deoria', 'Uttar Pradesh'),
(2229, 'Kushinagar', 'Uttar Pradesh'),
(2230, 'Padrauna', 'Uttar Pradesh'),
(2231, 'Tamakuhi Raj', 'Uttar Pradesh'),
(2232, 'Bhatpar Rani', 'Uttar Pradesh'),
(2233, 'Ghosi', 'Uttar Pradesh'),
(2234, 'Azamgarh', 'Uttar Pradesh'),
(2235, 'Bariya', 'Uttar Pradesh'),
(2236, 'Mathura', 'Uttar Pradesh'),
(2237, 'Sadabad', 'Uttar Pradesh'),
(2238, 'Farah', 'Uttar Pradesh'),
(2239, 'Govardhan', 'Uttar Pradesh'),
(2240, 'Chhata', 'Uttar Pradesh'),
(2241, 'Agra', 'Uttar Pradesh'),
(2242, 'Kirauli', 'Uttar Pradesh'),
(2243, 'Firozabad', 'Uttar Pradesh'),
(2244, 'Bah', 'Uttar Pradesh'),
(2246, 'Shamsabad', 'Uttar Pradesh'),
(2247, 'Khairagarh-Up', 'Uttar Pradesh'),
(2248, 'Tundla', 'Uttar Pradesh'),
(2249, 'Jhansi', 'Uttar Pradesh'),
(2250, 'Lalitpur', 'Uttar Pradesh'),
(2251, 'Talbehat', 'Uttar Pradesh'),
(2252, 'Mauranipur', 'Uttar Pradesh'),
(2253, 'Tahrauli', 'Uttar Pradesh'),
(2254, 'Moth', 'Uttar Pradesh'),
(2255, 'Mahrauni', 'Uttar Pradesh'),
(2256, 'Orai', 'Uttar Pradesh'),
(2257, 'Ait', 'Uttar Pradesh'),
(2258, 'Jalaun', 'Uttar Pradesh'),
(2259, 'Konch', 'Uttar Pradesh'),
(2260, 'Akbarpur-Kanpur Dehat', 'Uttar Pradesh'),
(2261, 'Chandigarh', 'Union Territory'),
(2262, 'Kolkata', 'West Bengal'),
(2263, 'Barrackpore', 'West Bengal'),
(2264, 'Barasat', 'West Bengal'),
(2265, 'Baruipur', 'West Bengal'),
(2266, 'Sonarpur', 'West Bengal'),
(2267, 'Howrah', 'West Bengal'),
(2268, 'Bally', 'West Bengal'),
(2269, 'Udaynarayanpur', 'West Bengal'),
(2270, 'Shyampur', 'West Bengal'),
(2271, 'Ranihati', 'West Bengal'),
(2272, 'Uluberia', 'West Bengal'),
(2273, 'Shrirampur', 'West Bengal'),
(2274, 'Chandannagar', 'West Bengal'),
(2275, 'Goghat', 'West Bengal'),
(2276, 'Kalna', 'West Bengal'),
(2277, 'Chunchura', 'West Bengal'),
(2278, 'Jamalpur', 'West Bengal'),
(2279, 'Konnagar', 'West Bengal'),
(2280, 'Pursura', 'West Bengal'),
(2281, 'Asansol', 'West Bengal'),
(2282, 'Khanakul', 'West Bengal'),
(2283, 'Santipur', 'West Bengal'),
(2284, 'Balagarh', 'West Bengal'),
(2285, 'Burdwan', 'West Bengal'),
(2286, 'Bhatar', 'West Bengal'),
(2287, 'Katwa', 'West Bengal'),
(2288, 'Guskura', 'West Bengal'),
(2289, 'Nanoor', 'West Bengal'),
(2290, 'Khandaghosh', 'West Bengal'),
(2291, 'Malteswar', 'West Bengal'),
(2292, 'Durgapur', 'West Bengal'),
(2293, 'Ilambazar', 'West Bengal'),
(2294, 'Khoyrsole', 'West Bengal'),
(2295, 'Sonamukhi', 'West Bengal'),
(2296, 'Mejhia', 'West Bengal'),
(2297, 'Neturia', 'West Bengal'),
(2298, 'Salanpur', 'West Bengal'),
(2299, 'Purbasthali', 'West Bengal'),
(2300, 'Medinipur', 'West Bengal'),
(2301, 'Chandrakona', 'West Bengal'),
(2302, 'Sabang', 'West Bengal'),
(2303, 'Jhargram', 'West Bengal'),
(2304, 'Daspur', 'West Bengal'),
(2305, 'Panskura', 'West Bengal'),
(2306, 'Keshiari', 'West Bengal'),
(2307, 'Mecheda', 'West Bengal'),
(2308, 'Sankrail', 'West Bengal'),
(2309, 'Binpur', 'West Bengal'),
(2310, 'Kharagpur', 'West Bengal'),
(2311, 'Haldia', 'West Bengal'),
(2312, 'Bhagawanpur', 'West Bengal'),
(2313, 'Contai', 'West Bengal'),
(2314, 'Egra', 'West Bengal'),
(2315, 'Ramnagar', 'West Bengal'),
(2316, 'Dantan', 'West Bengal'),
(2317, 'Nandigram', 'West Bengal'),
(2318, 'Islampur', 'West Bengal'),
(2319, 'Gopi Ballavpur', 'West Bengal'),
(2320, 'Tamluk', 'West Bengal'),
(2321, 'Diamond Harbour', 'West Bengal'),
(2322, 'Bankura', 'West Bengal'),
(2323, 'Khatra', 'West Bengal'),
(2324, 'Jaypur', 'West Bengal'),
(2325, 'Gangajalghati', 'West Bengal'),
(2326, 'Raipur - Wb', 'West Bengal'),
(2327, 'Santuri', 'West Bengal'),
(2328, 'Simlapal', 'West Bengal'),
(2329, 'Hathirampur', 'West Bengal'),
(2330, 'Indus-Wb', 'West Bengal'),
(2331, 'Purulia', 'West Bengal'),
(2332, 'Raghunathpur', 'West Bengal'),
(2333, 'Barabazar', 'West Bengal'),
(2334, 'Lalpur - Wb', 'West Bengal'),
(2335, 'Bandwan', 'West Bengal'),
(2336, 'Kothsila', 'West Bengal'),
(2337, 'Barobisha', 'West Bengal'),
(2338, 'Sirui', 'West Bengal'),
(2339, 'Mayureswar', 'West Bengal'),
(2340, 'Rampurhat', 'West Bengal'),
(2341, 'Shantiniketan', 'West Bengal'),
(2342, 'Murarai', 'West Bengal'),
(2343, 'Sagardighi', 'West Bengal'),
(2344, 'Siliguri', 'West Bengal'),
(2345, 'Malda', 'West Bengal'),
(2346, 'Chachal', 'West Bengal'),
(2347, 'Pakuahat', 'West Bengal'),
(2348, 'Farakka', 'West Bengal'),
(2349, 'Ratua', 'West Bengal'),
(2350, 'Balurghat', 'West Bengal'),
(2351, 'Kushmandi', 'West Bengal'),
(2352, 'Raiganj', 'West Bengal'),
(2353, 'Gangarampur', 'West Bengal'),
(2354, 'Harirampur', 'West Bengal'),
(2355, 'Dalkola', 'West Bengal'),
(2356, 'Rajganj', 'West Bengal'),
(2357, 'Darjeeling', 'West Bengal'),
(2358, 'Kurseong', 'West Bengal'),
(2359, 'Takdah', 'West Bengal'),
(2360, 'Mirik', 'West Bengal'),
(2361, 'Kalimpong', 'West Bengal'),
(2362, 'Naxalbari', 'West Bengal'),
(2363, 'Phansidewa', 'West Bengal'),
(2364, 'Malbazar', 'West Bengal'),
(2365, 'Jalpaiguri', 'West Bengal'),
(2366, 'Birpara', 'West Bengal'),
(2367, 'Dhupguri', 'West Bengal'),
(2368, 'Jaigaon', 'West Bengal'),
(2369, 'Falakata', 'West Bengal'),
(2370, 'Kalchini', 'West Bengal'),
(2371, 'Gorubathan', 'West Bengal'),
(2372, 'Nagrakata', 'West Bengal'),
(2373, 'Mekliganj', 'West Bengal'),
(2374, 'Mathabhanga', 'West Bengal'),
(2375, 'Cooch Behar', 'West Bengal'),
(2376, 'Alipurduar', 'West Bengal'),
(2377, 'Tufanganj', 'West Bengal'),
(2378, 'Dinhata', 'West Bengal'),
(2379, 'Krishnagar', 'West Bengal'),
(2380, 'Tehatta', 'West Bengal'),
(2381, 'Karimpur', 'West Bengal'),
(2382, 'Bethuadahari', 'West Bengal'),
(2383, 'Ranaghat', 'West Bengal'),
(2384, 'Debagram', 'West Bengal'),
(2385, 'Bagula', 'West Bengal'),
(2386, 'Haringhata', 'West Bengal'),
(2387, 'Kalyani', 'West Bengal'),
(2388, 'Berhampore', 'West Bengal'),
(2389, 'Raninagar', 'West Bengal'),
(2390, 'Kandi', 'West Bengal'),
(2391, 'Lalgola', 'West Bengal'),
(2392, 'Suti', 'West Bengal'),
(2393, 'Raghunathganj', 'West Bengal'),
(2394, 'Habra', 'West Bengal'),
(2395, 'Bagda', 'West Bengal'),
(2396, 'Bongaon', 'West Bengal'),
(2397, 'Swarupnagar', 'West Bengal'),
(2398, 'Gaighata', 'West Bengal'),
(2399, 'Hasnabad', 'West Bengal'),
(2400, 'Haroa', 'West Bengal'),
(2401, 'Amdanga', 'West Bengal'),
(2402, 'Gosaba', 'West Bengal'),
(2403, 'Canning-Wb', 'West Bengal'),
(2404, 'Joynagar', 'West Bengal'),
(2405, 'Kakdwip', 'West Bengal'),
(2406, 'Falta', 'West Bengal'),
(2407, 'Malancha', 'West Bengal'),
(2408, 'Hingalganj', 'West Bengal'),
(2410, 'Port Blair', 'Andaman and Nicobar Islands'),
(2430, 'Jaggaiahpet', 'Andhra Pradesh'),
(2433, 'Kadiri', 'Andhra Pradesh'),
(2435, 'Kandukur', 'Andhra Pradesh'),
(2441, 'Madanapalle', 'Andhra Pradesh'),
(2445, 'Naidupet', 'Andhra Pradesh'),
(2447, 'Narasapuram', 'Andhra Pradesh'),
(2451, 'Nidadavole', 'Andhra Pradesh'),
(2454, 'Palacole', 'Andhra Pradesh'),
(2455, 'Palasa Kasibugga', 'Andhra Pradesh'),
(2457, 'Pedana', 'Andhra Pradesh'),
(2459, 'Pithapuram', 'Andhra Pradesh'),
(2470, 'Renigunta', 'Andhra Pradesh'),
(2473, 'Samalkot', 'Andhra Pradesh'),
(2477, 'Srisailam Project (Right Flank', 'Andhra Pradesh'),
(2478, 'Sullurpeta', 'Andhra Pradesh'),
(2480, 'Tadpatri', 'Andhra Pradesh'),
(2483, 'Tirupati', 'Andhra Pradesh'),
(2485, 'Tuni', 'Andhra Pradesh'),
(2494, 'Naharlagun', 'Arunachal Pradesh'),
(2495, 'Pasighat', 'Arunachal Pradesh'),
(2497, 'Bongaigaon City', 'Assam'),
(2507, 'Mangaldoi', 'Assam'),
(2508, 'Mankachar', 'Assam'),
(2509, 'Margherita', 'Assam'),
(2510, 'Mariani', 'Assam'),
(2511, 'Marigaon', 'Assam'),
(2515, 'Rangia', 'Assam'),
(2516, 'Sibsagar', 'Assam'),
(2524, 'Asarganj', 'Bihar'),
(2530, 'BhabUrban Agglomeration', 'Bihar'),
(2547, 'Lalganj', 'Bihar'),
(2551, 'Mahnar Bazar', 'Bihar'),
(2552, 'Makhdumpur', 'Bihar'),
(2553, 'Maner', 'Bihar'),
(2555, 'Marhaura', 'Bihar'),
(2556, 'Masaurhi', 'Bihar'),
(2558, 'Mokameh', 'Bihar'),
(2562, 'Murliganj', 'Bihar'),
(2564, 'Narkatiaganj', 'Bihar'),
(2565, 'Naugachhia', 'Bihar'),
(2569, 'Piro', 'Bihar'),
(2570, 'Purnia', 'Bihar'),
(2574, 'Raxaul Bazar', 'Bihar'),
(2575, 'Revelganj', 'Bihar'),
(2576, 'Rosera', 'Bihar'),
(2577, 'Saharsa', 'Bihar'),
(2583, 'Silao', 'Bihar'),
(2587, 'Sugauli', 'Bihar'),
(2590, 'Warisaliganj', 'Bihar'),
(2594, 'Bhilai Nagar', 'Chhattisgarh'),
(2596, 'Chirmiri', 'Chhattisgarh'),
(2597, 'Dalli-Rajhara', 'Chhattisgarh'),
(2599, 'Durg', 'Chhattisgarh'),
(2605, 'Naila Janjgir', 'Chhattisgarh'),
(2610, 'Tilda Newra', 'Chhattisgarh'),
(2613, 'New Delhi', 'Delhi'),
(2616, 'Marmagao', 'Goa'),
(2617, 'Panaji', 'Goa'),
(2618, 'Adalaj', 'Gujarat'),
(2622, 'Anjar', 'Gujarat'),
(2632, 'Kadi', 'Gujarat'),
(2633, 'Kapadvanj', 'Gujarat'),
(2636, 'Lathi', 'Gujarat'),
(2639, 'Mahemdabad', 'Gujarat'),
(2640, 'Mahesana', 'Gujarat'),
(2647, 'Morvi', 'Gujarat'),
(2650, 'Padra', 'Gujarat'),
(2653, 'Pardi', 'Gujarat'),
(2654, 'Patan', 'Gujarat'),
(2655, 'Petlad', 'Gujarat'),
(2657, 'Radhanpur', 'Gujarat'),
(2661, 'Ranavav', 'Gujarat'),
(2663, 'Salaya', 'Gujarat'),
(2664, 'Sanand', 'Gujarat'),
(2666, 'Sidhpur', 'Gujarat'),
(2667, 'Sihor', 'Gujarat'),
(2668, 'Songadh', 'Gujarat'),
(2671, 'Thangadh', 'Gujarat'),
(2672, 'Tharad', 'Gujarat'),
(2674, 'Umreth', 'Gujarat'),
(2676, 'Unjha', 'Gujarat'),
(2678, 'Vadnagar', 'Gujarat'),
(2679, 'Vadodara', 'Gujarat'),
(2686, 'Visnagar', 'Gujarat'),
(2688, 'Wadhwan', 'Gujarat'),
(2696, 'Gurgaon', 'Haryana'),
(2703, 'Mahendragarh', 'Haryana'),
(2704, 'Mandi Dabwali', 'Haryana'),
(2711, 'Pinjore', 'Haryana'),
(2713, 'Ratia', 'Haryana'),
(2716, 'Safidon', 'Haryana'),
(2717, 'Samalkha', 'Haryana'),
(2718, 'Sarsod', 'Haryana'),
(2719, 'Shahbad', 'Haryana'),
(2721, 'Sohna', 'Haryana'),
(2723, 'Taraori', 'Haryana'),
(2724, 'Thanesar', 'Haryana'),
(2726, 'Yamunanagar', 'Haryana'),
(2728, 'Nahan', 'Himachal Pradesh'),
(2729, 'Palampur', 'Himachal Pradesh'),
(2732, 'Sundarnagar', 'Himachal Pradesh'),
(2734, 'Baramula', 'Jammu and Kashmir'),
(2736, 'KathUrban Agglomeration', 'Jammu and Kashmir'),
(2737, 'Punch', 'Jammu and Kashmir'),
(2738, 'Rajauri', 'Jammu and Kashmir'),
(2742, 'Adityapur', 'Jharkhand'),
(2743, 'Bokaro Steel City', 'Jharkhand'),
(2746, 'Chirkunda', 'Jharkhand'),
(2752, 'Hazaribag', 'Jharkhand'),
(2754, 'Jhumri Tilaiya', 'Jharkhand'),
(2757, 'Medininagar (Daltonganj)', 'Jharkhand'),
(2758, 'Mihijam', 'Jharkhand'),
(2759, 'Musabani', 'Jharkhand'),
(2760, 'Pakaur', 'Jharkhand'),
(2762, 'Phusro', 'Jharkhand'),
(2765, 'Sahibganj', 'Jharkhand'),
(2766, 'Saunda', 'Jharkhand'),
(2768, 'Tenu dam-cum-Kathhara', 'Jharkhand'),
(2769, 'Adyar', 'Karnataka'),
(2772, 'Athni', 'Karnataka'),
(2773, 'Ballari', 'Karnataka'),
(2774, 'Belagavi', 'Karnataka'),
(2776, 'Chikkamagaluru', 'Karnataka'),
(2777, 'Davanagere', 'Karnataka'),
(2779, 'Hubli-Dharwad', 'Karnataka'),
(2782, 'Lakshmeshwar', 'Karnataka'),
(2783, 'Lingsugur', 'Karnataka'),
(2784, 'Maddur', 'Karnataka'),
(2787, 'Magadi', 'Karnataka'),
(2788, 'Mahalingapura', 'Karnataka'),
(2789, 'Malavalli', 'Karnataka'),
(2792, 'Mangaluru', 'Karnataka'),
(2794, 'Mudabidri', 'Karnataka'),
(2795, 'Mudalagi', 'Karnataka'),
(2798, 'Mulbagal', 'Karnataka'),
(2799, 'Mundargi', 'Karnataka'),
(2800, 'Nanjangud', 'Karnataka'),
(2802, 'Navalgund', 'Karnataka'),
(2803, 'Nelamangala', 'Karnataka'),
(2805, 'Piriyapatna', 'Karnataka'),
(2807, 'Raayachuru', 'Karnataka'),
(2808, 'Rabkavi Banhatti', 'Karnataka'),
(2809, 'Ramanagaram', 'Karnataka'),
(2810, 'Ramdurg', 'Karnataka'),
(2811, 'Ranebennuru', 'Karnataka'),
(2812, 'Ranibennur', 'Karnataka'),
(2813, 'Robertson Pet', 'Karnataka'),
(2814, 'Ron', 'Karnataka'),
(2815, 'Sadalagi', 'Karnataka'),
(2817, 'Sakaleshapura', 'Karnataka'),
(2819, 'Sankeshwara', 'Karnataka'),
(2820, 'Saundatti-Yellamma', 'Karnataka'),
(2821, 'Savanur', 'Karnataka'),
(2822, 'Sedam', 'Karnataka'),
(2823, 'Shahabad', 'Karnataka'),
(2826, 'Shikaripur', 'Karnataka'),
(2827, 'Shivamogga', 'Karnataka'),
(2828, 'Shrirangapattana', 'Karnataka'),
(2829, 'Sidlaghatta', 'Karnataka'),
(2831, 'Sindhagi', 'Karnataka'),
(2832, 'Sindhnur', 'Karnataka'),
(2836, 'Srinivaspur', 'Karnataka'),
(2837, 'Surapura', 'Karnataka'),
(2838, 'Talikota', 'Karnataka'),
(2839, 'Tarikere', 'Karnataka'),
(2840, 'Tekkalakote', 'Karnataka'),
(2841, 'Terdal', 'Karnataka'),
(2844, 'Udupi', 'Karnataka'),
(2845, 'Vijayapura', 'Karnataka'),
(2847, 'Yadgir', 'Karnataka'),
(2853, 'Changanassery', 'Kerala'),
(2855, 'Chittur-Thathamangalam', 'Kerala'),
(2856, 'Guruvayoor', 'Kerala'),
(2860, 'Kayamkulam', 'Kerala'),
(2862, 'Kodungallur', 'Kerala'),
(2865, 'Koyilandy', 'Kerala'),
(2868, 'Malappuram', 'Kerala'),
(2869, 'Mattannur', 'Kerala'),
(2870, 'Mavelikkara', 'Kerala'),
(2871, 'Mavoor', 'Kerala'),
(2873, 'Nedumangad', 'Kerala'),
(2875, 'Nilambur', 'Kerala'),
(2876, 'Ottappalam', 'Kerala'),
(2877, 'Palai', 'Kerala'),
(2879, 'Panamattom', 'Kerala'),
(2880, 'Panniyannur', 'Kerala'),
(2881, 'Pappinisseri', 'Kerala'),
(2882, 'Paravoor', 'Kerala'),
(2884, 'Peringathur', 'Kerala'),
(2886, 'Perumbavoor', 'Kerala'),
(2889, 'Puthuppally', 'Kerala'),
(2890, 'Shoranur', 'Kerala'),
(2891, 'Taliparamba', 'Kerala'),
(2896, 'Tirur', 'Kerala'),
(2898, 'Varkala', 'Kerala'),
(2899, 'Vatakara', 'Kerala'),
(2901, 'Ashok Nagar', 'Madhya Pradesh'),
(2904, 'Ganjbasoda', 'Madhya Pradesh'),
(2909, 'Lahar', 'Madhya Pradesh'),
(2910, 'Maharajpur', 'Madhya Pradesh'),
(2913, 'Malaj Khand', 'Madhya Pradesh'),
(2920, 'Mhow Cantonment', 'Madhya Pradesh'),
(2921, 'Mhowgaon', 'Madhya Pradesh'),
(2925, 'Murwara (Katni)', 'Madhya Pradesh'),
(2930, 'Neemuch', 'Madhya Pradesh'),
(2932, 'Niwari', 'Madhya Pradesh'),
(2934, 'Nowrozabad (Khodargama)', 'Madhya Pradesh'),
(2935, 'Pachore', 'Madhya Pradesh'),
(2937, 'Panagar', 'Madhya Pradesh'),
(2940, 'Pasan', 'Madhya Pradesh'),
(2942, 'Pithampur', 'Madhya Pradesh'),
(2943, 'Porsa', 'Madhya Pradesh'),
(2945, 'Raghogarh-Vijaypur', 'Madhya Pradesh'),
(2948, 'Rajgarh', 'Madhya Pradesh'),
(2950, 'Rau', 'Madhya Pradesh'),
(2955, 'Sanawad', 'Madhya Pradesh'),
(2957, 'Sarni', 'Madhya Pradesh'),
(2974, 'Sohagpur', 'Madhya Pradesh'),
(2980, 'Vijaypur', 'Madhya Pradesh'),
(2981, 'Wara Seoni', 'Madhya Pradesh'),
(2987, 'Ambejogai', 'Maharashtra'),
(2989, 'Anjangaon', 'Maharashtra'),
(2994, 'Ichalkaranji', 'Maharashtra'),
(2995, 'Kalyan-Dombivali', 'Maharashtra'),
(2996, 'Karjat', 'Maharashtra'),
(2998, 'Loha', 'Maharashtra'),
(2999, 'Lonar', 'Maharashtra'),
(3000, 'Lonavla', 'Maharashtra'),
(3004, 'Mangalvedhe', 'Maharashtra'),
(3005, 'Mangrulpir', 'Maharashtra'),
(3007, 'Manmad', 'Maharashtra'),
(3008, 'Manwath', 'Maharashtra'),
(3009, 'Mehkar', 'Maharashtra'),
(3010, 'Mhaswad', 'Maharashtra'),
(3011, 'Mira-Bhayandar', 'Maharashtra'),
(3012, 'Morshi', 'Maharashtra'),
(3013, 'Mukhed', 'Maharashtra'),
(3017, 'Nanded-Waghala', 'Maharashtra'),
(3022, 'Nashik', 'Maharashtra'),
(3023, 'Nawapur', 'Maharashtra'),
(3026, 'Ozar', 'Maharashtra'),
(3030, 'Pandharkaoda', 'Maharashtra'),
(3034, 'Parli', 'Maharashtra'),
(3037, 'Pathri', 'Maharashtra'),
(3040, 'Pen', 'Maharashtra'),
(3042, 'Pulgaon', 'Maharashtra'),
(3047, 'Rajura', 'Maharashtra'),
(3052, 'Sailu', 'Maharashtra'),
(3055, 'Sangole', 'Maharashtra'),
(3056, 'Sasvad', 'Maharashtra'),
(3059, 'Savner', 'Maharashtra'),
(3061, 'Shahade', 'Maharashtra'),
(3062, 'Shegaon', 'Maharashtra'),
(3063, 'Shendurjana', 'Maharashtra'),
(3065, 'Shirpur-Warwade', 'Maharashtra'),
(3066, 'Shirur', 'Maharashtra'),
(3072, 'Soyagaon', 'Maharashtra'),
(3073, 'Talegaon Dabhade', 'Maharashtra'),
(3074, 'Talode', 'Maharashtra'),
(3080, 'Uchgaon', 'Maharashtra'),
(3086, 'Uran Islampur', 'Maharashtra'),
(3087, 'Vadgaon Kasba', 'Maharashtra'),
(3089, 'Vasai-Virar', 'Maharashtra'),
(3091, 'Wadgaon Road', 'Maharashtra'),
(3093, 'Wani', 'Maharashtra'),
(3099, 'Yawal', 'Maharashtra'),
(3100, 'Yevla', 'Maharashtra'),
(3102, 'Lilong', 'Manipur'),
(3103, 'Mayang Imphal', 'Manipur'),
(3104, 'Thoubal', 'Manipur'),
(3105, 'Nongstoin', 'Meghalaya'),
(3107, 'Tura', 'Meghalaya'),
(3109, 'Lunglei', 'Mizoram'),
(3110, 'Saiha', 'Mizoram'),
(3112, 'Kohima', 'Nagaland'),
(3113, 'Mokokchung', 'Nagaland'),
(3114, 'Tuensang', 'Nagaland'),
(3115, 'Wokha', 'Nagaland'),
(3116, 'Zunheboto', 'Nagaland'),
(3118, 'Baleshwar Town', 'Odisha'),
(3121, 'Baripada Town', 'Odisha'),
(3125, 'Brahmapur', 'Odisha'),
(3126, 'Byasanagar', 'Odisha'),
(3128, 'Dhenkanal', 'Odisha'),
(3129, 'Jatani', 'Odisha'),
(3132, 'Kendujhar', 'Odisha'),
(3136, 'Parlakhemundi', 'Odisha'),
(3137, 'Pattamundai', 'Odisha'),
(3138, 'Phulabani', 'Odisha'),
(3141, 'Rajagangapur', 'Odisha'),
(3142, 'Raurkela', 'Odisha'),
(3146, 'Sunabeda', 'Odisha'),
(3147, 'Sundargarh', 'Odisha'),
(3149, 'Tarbha', 'Odisha'),
(3152, 'Mahe', 'Puducherry'),
(3154, 'Yanam', 'Puducherry'),
(3158, 'Bathinda', 'Punjab'),
(3159, 'Dhuri', 'Punjab'),
(3162, 'Firozpur', 'Punjab'),
(3163, 'Firozpur Cantt.', 'Punjab'),
(3164, 'Gobindgarh', 'Punjab'),
(3168, 'Jalandhar', 'Punjab'),
(3169, 'Jalandhar Cantt.', 'Punjab'),
(3171, 'Khanna', 'Punjab'),
(3173, 'Kot Kapura', 'Punjab'),
(3176, 'Malerkotla', 'Punjab'),
(3181, 'Morinda, India', 'Punjab'),
(3191, 'Pattran', 'Punjab'),
(3194, 'Qadian', 'Punjab'),
(3201, 'Sirhind Fatehgarh Sahib', 'Punjab'),
(3202, 'Sujanpur', 'Punjab'),
(3206, 'Urmar Tanda', 'Punjab'),
(3208, 'Zirakpur', 'Punjab'),
(3217, 'Lachhmangarh', 'Rajasthan'),
(3218, 'Ladnu', 'Rajasthan'),
(3221, 'Losal', 'Rajasthan'),
(3225, 'Mandawa', 'Rajasthan'),
(3227, 'Merta City', 'Rajasthan'),
(3228, 'Mount Abu', 'Rajasthan'),
(3229, 'Nadbai', 'Rajasthan'),
(3234, 'Neem-Ka-Thana', 'Rajasthan'),
(3242, 'Pilibanga', 'Rajasthan'),
(3243, 'Pindwara', 'Rajasthan'),
(3244, 'Pipar City', 'Rajasthan'),
(3245, 'Prantij', 'Rajasthan'),
(3246, 'Pratapgarh', 'Rajasthan'),
(3248, 'Rajakhera', 'Rajasthan'),
(3249, 'Rajaldesar', 'Rajasthan'),
(3250, 'Rajgarh (Alwar)', 'Rajasthan'),
(3251, 'Rajgarh (Churu)', 'Rajasthan'),
(3254, 'Ramngarh', 'Rajasthan'),
(3259, 'Sadri', 'Rajasthan'),
(3261, 'Sadulshahar', 'Rajasthan'),
(3262, 'Sagwara', 'Rajasthan'),
(3263, 'Sambhar', 'Rajasthan'),
(3264, 'Sanchore', 'Rajasthan'),
(3268, 'Shahpura', 'Rajasthan'),
(3270, 'Sheoganj', 'Rajasthan'),
(3274, 'Sri Madhopur', 'Rajasthan'),
(3278, 'Takhatgarh', 'Rajasthan'),
(3280, 'Todabhim', 'Rajasthan'),
(3281, 'Todaraisingh', 'Rajasthan'),
(3285, 'Vijainagar, Ajmer', 'Rajasthan'),
(3287, 'Aruppukkottai', 'Tamil Nadu'),
(3291, 'Gobichettipalayam', 'Tamil Nadu'),
(3292, 'Kancheepuram', 'Tamil Nadu'),
(3294, 'Lalgudi', 'Tamil Nadu'),
(3296, 'Manachanallur', 'Tamil Nadu'),
(3299, 'Namagiripettai', 'Tamil Nadu'),
(3301, 'Nandivaram-Guduvancheri', 'Tamil Nadu'),
(3302, 'Nanjikottai', 'Tamil Nadu'),
(3304, 'Nellikuppam', 'Tamil Nadu'),
(3305, 'Neyveli (TS)', 'Tamil Nadu'),
(3306, 'O\' Valley', 'Tamil Nadu'),
(3308, 'P.N.Patti', 'Tamil Nadu'),
(3309, 'Pacode', 'Tamil Nadu'),
(3310, 'Padmanabhapuram', 'Tamil Nadu'),
(3313, 'Pallapatti', 'Tamil Nadu'),
(3314, 'Pallikonda', 'Tamil Nadu'),
(3315, 'Panagudi', 'Tamil Nadu'),
(3316, 'Panruti', 'Tamil Nadu'),
(3317, 'Paramakudi', 'Tamil Nadu'),
(3318, 'Parangipettai', 'Tamil Nadu'),
(3319, 'Pattukkottai', 'Tamil Nadu'),
(3321, 'Peravurani', 'Tamil Nadu'),
(3322, 'Periyakulam', 'Tamil Nadu'),
(3323, 'Periyasemur', 'Tamil Nadu'),
(3324, 'Pernampattu', 'Tamil Nadu'),
(3326, 'Polur', 'Tamil Nadu'),
(3328, 'Pudukkottai', 'Tamil Nadu'),
(3329, 'Pudupattinam', 'Tamil Nadu'),
(3330, 'Puliyankudi', 'Tamil Nadu'),
(3331, 'Punjaipugalur', 'Tamil Nadu'),
(3332, 'Rajapalayam', 'Tamil Nadu'),
(3333, 'Ramanathapuram', 'Tamil Nadu'),
(3338, 'Sankarankovil', 'Tamil Nadu'),
(3341, 'Sattur', 'Tamil Nadu'),
(3342, 'Shenkottai', 'Tamil Nadu'),
(3343, 'Sholavandan', 'Tamil Nadu'),
(3344, 'Sholingur', 'Tamil Nadu'),
(3345, 'Sirkali', 'Tamil Nadu'),
(3346, 'Sivaganga', 'Tamil Nadu'),
(3347, 'Sivagiri', 'Tamil Nadu'),
(3349, 'Srivilliputhur', 'Tamil Nadu'),
(3350, 'Surandai', 'Tamil Nadu'),
(3351, 'Suriyampalayam', 'Tamil Nadu'),
(3353, 'Thammampatti', 'Tamil Nadu'),
(3355, 'Tharamangalam', 'Tamil Nadu'),
(3356, 'Tharangambadi', 'Tamil Nadu'),
(3357, 'Theni Allinagaram', 'Tamil Nadu'),
(3358, 'Thirumangalam', 'Tamil Nadu'),
(3359, 'Thirupuvanam', 'Tamil Nadu'),
(3360, 'Thiruthuraipoondi', 'Tamil Nadu'),
(3361, 'Thiruvallur', 'Tamil Nadu'),
(3366, 'Tiruchengode', 'Tamil Nadu'),
(3367, 'Tiruchirappalli', 'Tamil Nadu'),
(3368, 'Tirukalukundram', 'Tamil Nadu'),
(3369, 'Tirukkoyilur', 'Tamil Nadu'),
(3370, 'Tirunelveli', 'Tamil Nadu'),
(3371, 'Tirupathur', 'Tamil Nadu'),
(3373, 'Tiruppur', 'Tamil Nadu'),
(3374, 'Tiruttani', 'Tamil Nadu'),
(3376, 'Tiruvethipuram', 'Tamil Nadu'),
(3377, 'Tittakudi', 'Tamil Nadu'),
(3378, 'Udhagamandalam', 'Tamil Nadu'),
(3379, 'Udumalaipettai', 'Tamil Nadu'),
(3380, 'Unnamalaikadai', 'Tamil Nadu'),
(3382, 'Uthamapalayam', 'Tamil Nadu'),
(3383, 'Uthiramerur', 'Tamil Nadu'),
(3384, 'Vadakkuvalliyur', 'Tamil Nadu'),
(3385, 'Vadalur', 'Tamil Nadu'),
(3386, 'Vadipatti', 'Tamil Nadu'),
(3387, 'Valparai', 'Tamil Nadu'),
(3388, 'Vandavasi', 'Tamil Nadu'),
(3391, 'Vellakoil', 'Tamil Nadu'),
(3393, 'Vikramasingapuram', 'Tamil Nadu'),
(3394, 'Viluppuram', 'Tamil Nadu'),
(3395, 'Virudhachalam', 'Tamil Nadu'),
(3396, 'Virudhunagar', 'Tamil Nadu'),
(3397, 'Viswanatham', 'Tamil Nadu'),
(3399, 'Bellampalle', 'Telangana'),
(3404, 'Farooqnagar', 'Telangana'),
(3408, 'Jangaon', 'Telangana'),
(3409, 'Kagaznagar', 'Telangana'),
(3413, 'Koratla', 'Telangana'),
(3415, 'Kyathampalle', 'Telangana'),
(3418, 'Mandamarri', 'Telangana'),
(3419, 'Manuguru', 'Telangana'),
(3421, 'Miryalaguda', 'Telangana'),
(3427, 'Ramagundam', 'Telangana'),
(3428, 'Sadasivpet', 'Telangana'),
(3431, 'Sircilla', 'Telangana'),
(3439, 'Belonia', 'Tripura'),
(3440, 'Dharmanagar', 'Tripura'),
(3441, 'Kailasahar', 'Tripura'),
(3442, 'Khowai', 'Tripura'),
(3445, 'Achhnera', 'Uttar Pradesh'),
(3454, 'Fatehpur Sikri', 'Uttar Pradesh'),
(3459, 'Kalpi', 'Uttar Pradesh'),
(3464, 'Lal Gopalganj Nindaura', 'Uttar Pradesh'),
(3467, 'Lar', 'Uttar Pradesh'),
(3478, 'Naraura', 'Uttar Pradesh'),
(3479, 'Naugawan Sadat', 'Uttar Pradesh'),
(3482, 'Nehtaur', 'Uttar Pradesh'),
(3485, 'Noorpur', 'Uttar Pradesh'),
(3489, 'Palia Kalan', 'Uttar Pradesh'),
(3490, 'Parasi', 'Uttar Pradesh'),
(3491, 'Phulpur', 'Uttar Pradesh'),
(3494, 'Pilkhuwa', 'Uttar Pradesh'),
(3496, 'Pukhrayan', 'Uttar Pradesh'),
(3498, 'PurqUrban Agglomerationzi', 'Uttar Pradesh'),
(3499, 'Purwa', 'Uttar Pradesh'),
(3500, 'Rae Bareli', 'Uttar Pradesh'),
(3502, 'Rampur Maniharan', 'Uttar Pradesh'),
(3506, 'Reoti', 'Uttar Pradesh'),
(3513, 'Sahaspur', 'Uttar Pradesh'),
(3515, 'Sahawar', 'Uttar Pradesh'),
(3516, 'Sahjanwa', 'Uttar Pradesh'),
(3519, 'Samdhan', 'Uttar Pradesh'),
(3520, 'Samthar', 'Uttar Pradesh'),
(3521, 'Sandi', 'Uttar Pradesh'),
(3524, 'Seohara', 'Uttar Pradesh'),
(3525, 'Shahabad, Hardoi', 'Uttar Pradesh'),
(3526, 'Shahabad, Rampur', 'Uttar Pradesh'),
(3530, 'Shamsabad, Agra', 'Uttar Pradesh'),
(3531, 'Shamsabad, Farrukhabad', 'Uttar Pradesh'),
(3532, 'Sherkot', 'Uttar Pradesh'),
(3533, 'Shikarpur, Bulandshahr', 'Uttar Pradesh'),
(3534, 'Shikohabad', 'Uttar Pradesh'),
(3535, 'Shishgarh', 'Uttar Pradesh'),
(3536, 'Siana', 'Uttar Pradesh'),
(3539, 'Sikandrabad', 'Uttar Pradesh'),
(3540, 'Sirsaganj', 'Uttar Pradesh'),
(3543, 'Soron', 'Uttar Pradesh'),
(3546, 'SUrban Agglomerationr', 'Uttar Pradesh'),
(3549, 'Thana Bhawan', 'Uttar Pradesh'),
(3551, 'Tirwaganj', 'Uttar Pradesh'),
(3554, 'Ujhani', 'Uttar Pradesh'),
(3558, 'Vrindavan', 'Uttar Pradesh'),
(3559, 'Warhapur', 'Uttar Pradesh'),
(3560, 'Zaidpur', 'Uttar Pradesh'),
(3562, 'Bageshwar', 'Uttarakhand'),
(3564, 'Haldwani-cum-Kathgodam', 'Uttarakhand'),
(3565, 'Hardwar', 'Uttarakhand'),
(3567, 'Manglaur', 'Uttarakhand'),
(3568, 'Mussoorie', 'Uttarakhand'),
(3569, 'Nagla', 'Uttarakhand'),
(3570, 'Nainital', 'Uttarakhand'),
(3571, 'Pauri', 'Uttarakhand'),
(3572, 'Pithoragarh', 'Uttarakhand'),
(3577, 'Sitarganj', 'Uttarakhand'),
(3579, 'Tehri', 'Uttarakhand'),
(3580, 'Adra', 'West Bengal'),
(3581, 'AlipurdUrban Agglomerationr', 'West Bengal'),
(3582, 'Arambagh', 'West Bengal'),
(3584, 'Baharampur', 'West Bengal'),
(3587, 'Darjiling', 'West Bengal'),
(3588, 'English Bazar', 'West Bengal'),
(3591, 'Hugli-Chinsurah', 'West Bengal'),
(3597, 'Mainaguri', 'West Bengal'),
(3601, 'Memari', 'West Bengal'),
(3602, 'Monoharpur', 'West Bengal'),
(3603, 'Murshidabad', 'West Bengal'),
(3604, 'Nabadwip', 'West Bengal'),
(3605, 'Naihati', 'West Bengal'),
(3606, 'Panchla', 'West Bengal'),
(3607, 'PandUrban Agglomeration', 'West Bengal'),
(3608, 'Paschim Punropara', 'West Bengal'),
(3615, 'Sainthia', 'West Bengal'),
(3619, 'Srirampore', 'West Bengal'),
(3620, 'Suri', 'West Bengal'),
(3621, 'Taki', 'West Bengal'),
(3623, 'Tarakeswar', 'West Bengal');

-- --------------------------------------------------------

--
-- Table structure for table `study_material`
--

CREATE TABLE `study_material` (
  `id` bigint(50) NOT NULL,
  `type` text NOT NULL,
  `title` text NOT NULL,
  `tag` text NOT NULL,
  `file` text NOT NULL,
  `paid` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0-free, 1-paid',
  `sort_order` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `pc_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `study_material`
--

INSERT INTO `study_material` (`id`, `type`, `title`, `tag`, `file`, `paid`, `sort_order`, `status`, `added_on`, `pc_id`) VALUES
(23, 'free', 'Test 1', 'rers,tyur,wtus', '16164-60bd0e46c4250-tri.pdf', 0, 987, 'active', '2021-06-06 18:04:54', ''),
(24, 'course', 'Study Material', 'test,test2', '95084-60bd0ed37692b-tri.pdf', 0, 678, 'active', '2021-06-06 18:07:15', '12'),
(26, 'free', 'free', 'fgh,fdg,dfg', '87505-60bd225fd8139-tri.pdf', 0, 56, 'active', '2021-06-06 19:30:39', ''),
(27, 'program', 'testgf', 'fdc,fdcdx', '40269-60bd23c6010cc-(2).pdf', 0, 4323, 'active', '2021-06-06 19:36:38', '14'),
(28, 'program', 'fdc', 're,refd,fds', '36865-60bd23e15cf40-tri.pdf', 0, 43, 'active', '2021-06-06 19:37:05', '17');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(50) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `password`) VALUES
(7, 'Teacher', 'teacher@gmail.com', '01cfcd4f6b8770febfb40cb906715822');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(50) NOT NULL,
  `user_email` text NOT NULL,
  `user_id` text NOT NULL,
  `amount` text NOT NULL,
  `topic` text NOT NULL,
  `topic_id` text NOT NULL,
  `topic_name` text NOT NULL,
  `payment_id` text NOT NULL,
  `status` text NOT NULL,
  `order_id` text NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_email`, `user_id`, `amount`, `topic`, `topic_id`, `topic_name`, `payment_id`, `status`, `order_id`, `time_stamp`) VALUES
(27, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9NZgRc1nhpyuy', 'success', 'order_H9NZFmojZNr7ew', '2021-05-11 06:02:40'),
(28, 'student@gmail.com', '88', '15000', 'program', '2', 'GEOGRAPHY OPTIONAL (e-Classroom Learning Program) 2021 and MAINS TEST SERIES 2021', 'pay_H9Nfr2TmnLUdV1', 'success', 'order_H9NfSPCG8Us4Su', '2021-05-11 06:08:30'),
(29, 'student@gmail.com', '88', '12600', 'program', '4', 'test Programes', 'pay_H9NhDZSJnCS5oH', 'success', 'order_H9Ngr2njrTmmTn', '2021-05-11 06:09:47'),
(30, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9NiKNau5OVoXk', 'success', 'order_H9Ni3yggXCjSJl', '2021-05-11 06:10:50'),
(31, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9NjgBiWy6lnyI', 'success', 'order_H9NjCVDOgeTX4P', '2021-05-11 06:12:07'),
(32, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9NlsfwUoJ7UjQ', 'success', 'order_H9NlNq7OiS2M73', '2021-05-11 06:14:12'),
(33, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9Ns1rUwM5ZQty', 'success', 'order_H9NrfF0H0Q4N25', '2021-05-11 06:20:01'),
(34, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9Nu5TQ19OdLS7', 'success', 'order_H9NtpnPlzhTOu8', '2021-05-11 06:21:58'),
(35, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9NwmOlIFgTk6F', 'success', 'order_H9NwP58tNQ530U', '2021-05-11 06:24:31'),
(36, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9NzCtCBxS9gT4', 'success', 'order_H9NyVPNNzUCZSo', '2021-05-11 06:26:49'),
(37, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9O9obDTirnfHo', 'success', 'order_H9O9OvMYYsHZgu', '2021-05-11 06:36:52'),
(38, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9OLYKwJLbSq51', 'success', 'order_H9OLJvZNSpvygO', '2021-05-11 06:47:58'),
(39, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9OO1WRYNr2kzJ', 'success', 'order_H9ONjPEdSjSZvw', '2021-05-11 06:50:18'),
(40, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9OR44W4NV99Va', 'success', 'order_H9OQqHLGdmebHE', '2021-05-11 06:53:11'),
(41, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_H9OZrQfYcW2xD4', 'success', 'order_H9OZYeuICGO30t', '2021-05-11 07:01:31'),
(42, 'student@gmail.com', '88', '15000', 'program', '2', 'GEOGRAPHY OPTIONAL (e-Classroom Learning Program) 2021 and MAINS TEST SERIES 2021', 'pay_H9Oc01fKqC04IG', 'success', 'order_H9ObgZGy7QdcXC', '2021-05-11 07:03:32'),
(43, 'student@gmail.com', '88', '12600', 'program', '4', 'test Programes', 'pay_H9atGhP0fRNRpZ', 'success', 'order_H9asrl1t81ta4u', '2021-05-11 19:04:15'),
(44, 'student@gmail.com', '88', '1500', 'course', '3', 'First Course', 'pay_HAxMURXAokfcyy', 'success', 'order_HAxLlhLJXgIXAk', '2021-05-15 05:42:10'),
(45, 'student@gmail.com', '88', '12600', 'program', '4', 'test Programes34', 'pay_HAyLitnkRuXljD', 'success', 'order_HAyLAv0fiFlmnW', '2021-05-15 06:40:07'),
(46, 'student@gmail.com', '88', '123', 'course', '6', 'test', '', 'pending', 'order_HDeTfxQvlUD9CU', '2021-05-22 01:10:42'),
(47, 'r@gmail.com', '287', '123', 'course', '6', 'test', '', 'pending', 'order_HITRHxx5xIwp8u', '2021-06-03 05:37:51'),
(48, 'r@gmail.com', '287', '123', 'course', '6', 'test', 'pay_HIVm0FpQcV9wjY', 'success', 'order_HIVlT5M629Mqqy', '2021-06-03 07:54:55'),
(49, 'r@gmail.com', '287', '334', 'course', '12', 'Tech Course paid', 'pay_HJmg6MNK2FJXYY', 'success', 'order_HJmfgozEelNZx5', '2021-06-06 13:06:06'),
(50, 'r@gmail.com', '287', '123', 'program', '14', 'Tech Prg Paid', 'pay_HJtMJRJhZHEBaU', 'success', 'order_HJtLri8nS4Nc0b', '2021-06-06 19:38:16');

-- --------------------------------------------------------

--
-- Table structure for table `useful_links`
--

CREATE TABLE `useful_links` (
  `id` bigint(50) NOT NULL,
  `page_id` bigint(50) NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `useful_links`
--

INSERT INTO `useful_links` (`id`, `page_id`, `added_on`) VALUES
(1, 2, '2021-03-20 11:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` int(50) NOT NULL,
  `time_stampt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `type`, `time_stampt`) VALUES
(9, 'test@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 1, '2021-04-09 05:33:11'),
(90, 'inayabaig@gmail.com', '2996a9986c9b885ea465720d081f069d', 2, '2021-06-06 03:16:00'),
(98, 'yasser.ar@gmail.com', '58b4e38f66bcdb546380845d6af27187', 3, '2020-04-05 07:17:25'),
(106, 'vinodshankar35@gmail.com', '0979d9869887f6921d5b25e0ddc59c6a', 3, '2020-04-05 14:42:52'),
(108, 'lovelyafrose36@gmail.com', 'f520711fd94864a33c889be1c2b6138a', 3, '2020-04-05 14:46:13'),
(110, 'Suhail.ahmd@hotmail.com', 'dacdece227352eadef5d3de9dbfde734', 3, '2020-04-05 15:51:52'),
(113, 'pancham@gmail.com', '4124bc0a9335c27f086f24ba207a4912', 3, '2020-04-24 18:12:57'),
(114, 'kauser23@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-04-29 16:52:20'),
(115, 'afridisyed874@gmail.com', '415e1af7ea95f89f4e375162b21ae38c', 3, '2020-04-07 09:54:24'),
(116, 'vishnuram.vr@gmail.com', '2c4c27991724d4d70b1a202580bef74d', 3, '2020-07-14 12:38:00'),
(117, 'aarifhussain10864@gmail.com', '8e2e09cbc2d8bdcac70b2c2f80759ffd', 3, '2020-04-07 14:42:46'),
(119, 'rufia.thaseen93@gmail.com', '5e87c601c1cdc87e61345f3392cc663a', 3, '2020-04-10 07:05:55'),
(120, 'freak.kar@gmail.com', 'f7d36ca84fc8efc027179e22c9532a3b', 3, '2020-04-10 07:43:23'),
(125, 'rkarthik.1999@gmail.com', 'f7d36ca84fc8efc027179e22c9532a3b', 3, '2020-04-10 09:26:53'),
(126, 'tksvillalan@yahoo.com', '233a6a6d65cde6a6fd2e49b3c28e7df6', 3, '2020-04-11 02:40:17'),
(127, 'roshankamar@gmail.com', '8f1edc0c4035c3e1384e4e1dd7c19ebf', 3, '2020-04-11 13:28:23'),
(128, 'anamikakrish1511@gmail.com', 'af50c9083541ef74807b865c94bc7809', 3, '2020-04-11 15:41:50'),
(129, 'shayesthafathima@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-05-19 17:03:20'),
(130, 'anjukova@yahoo.com', 'cd7da57a3e7b1546d669707c252c3fee', 3, '2020-04-13 12:33:10'),
(131, 'Rasheeda74banu@gmail.com', '47910c7dcb50bf275e0db45682baf0b7', 3, '2020-04-13 17:40:45'),
(160, 'iyyappanc1991@gmail.com', '084b063f87d450c7d05aa95ecdf5014f', 3, '2020-04-14 06:26:14'),
(174, 'elgoogclass3@gmail.com', '4a2d4102f34c16ea6c80941f13b351a3', 3, '2020-04-17 07:04:50'),
(175, 'rubinasheriff15@gmail.com', '8f1edc0c4035c3e1384e4e1dd7c19ebf', 3, '2020-04-17 13:01:49'),
(176, 'KHADERMOHIDEEN99952900224@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 3, '2020-04-17 15:29:11'),
(204, 'sharanya163@gmail.com', 'ce1b6b850322d2b7d6e0e12b99d60c86', 3, '2020-04-18 12:33:37'),
(205, 'par_win25@yahoo.co.in', '2698129f7c3245edfe16c6786b64633f', 3, '2020-04-18 14:51:25'),
(206, 'bilalhussainfire@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-05-12 03:27:39'),
(207, 'vichusai70@gmail.com', 'e0deff349b2c61f5f796ccaa344a4930', 3, '2020-04-19 08:15:40'),
(208, 'chakoshah@gmail.com', 'a2a78f848eb1dc598f12c603a97e1c0e', 3, '2020-04-19 15:47:36'),
(209, 'dkdineshsmartz7@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-07-04 01:10:11'),
(218, 'nizam@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-04-22 03:30:11'),
(219, 'Ayaanmuhammed@rediffmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-04-22 12:37:20'),
(222, 'shafiks2525@gmail.com', 'dd4b0a66e92a6a594667e38393524829', 3, '2020-04-24 08:10:02'),
(224, 'irfana.sharief@gmail.com', '5f0808c0ac14020edbd993a6726a8d1b', 3, '2020-04-25 06:45:08'),
(225, 'musfiraahamed@gmail.com', '27364538fbd571b23ace40f013a6641b', 3, '2020-04-26 17:47:15'),
(226, 'jixafe6073@oriwijn.com', 'e9128053eaae8c2169bf44bc4d60e894', 3, '2020-04-28 10:16:46'),
(227, 'spashoba@gmail.com', '929aac5748837ce4890f010d77246c2d', 3, '2020-04-29 13:42:48'),
(228, 'ponmanipandian123@gmail.com', '1cb8dff5d61fc8871ae3b023131d38ad', 3, '2020-04-29 15:41:08'),
(229, 'martinahfernando@gmail.com', '4681289e8d63e9b658ad2e1c4269a006', 3, '2020-04-30 03:56:48'),
(230, 'dr.tayyabkharadi@gmail.com', '172b9057f1e59ddcb93e8522b7968f09', 3, '2020-04-30 07:16:05'),
(231, 'hab.nel@gmail.com', '358261b4e5f2ec2a50cf7404a69a4d53', 3, '2020-07-21 06:40:16'),
(232, 'nandhi2k@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-12-20 00:10:08'),
(233, 'fareed30017@gmail.com', 'f79151399844d650b4e0333a7d3343d2', 3, '2020-05-02 07:37:20'),
(234, 'coolspize.jasmine@gmail.com', '8e711029d259a1d40f08cc0edd4e2dbe', 3, '2020-05-02 19:05:15'),
(235, 'smmehtab@gmail.com', 'b5f5eb6f68f8c68c55a19b3ccebb8b48', 3, '2020-05-03 06:41:56'),
(236, 'barkavi2000@gmail.com', '3fc93b92e4267e06129130e32d4e6ac5', 3, '2020-05-05 02:48:29'),
(237, 'cgkarpagam@gmail.com', '70ce64794d6803d15de90cdf2922c82b', 3, '2020-05-10 03:24:46'),
(238, 'fathimasaba174@gmail.com', 'f2ee0636898ad07a06287fcb99dc2394', 3, '2020-05-11 08:07:05'),
(239, 'hameed1049@yahoo.com', 'cf072fd576995329723a1e25c589c312', 3, '2020-05-13 14:47:28'),
(240, 'farookb1@gmail.com', 'fd5a5451c9426dd30ad50fd2808419b2', 3, '2020-05-15 07:01:06'),
(241, 'goyalshubham900@gmail.com', '0e672dbcdeb117659e1837a68fc1d914', 3, '2020-05-22 16:08:36'),
(242, 'vijay_anand44@yahoo.com', 'a398fce6f14b436a6e5d8d47693c941a', 3, '2020-05-24 13:59:33'),
(243, 'VISHVAANGU@gmail.com', '5cfdd6cf249f17b7ee302a75cbb2a8ae', 3, '2020-05-26 05:17:01'),
(244, 'anupamkandwal@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 3, '2020-05-26 09:20:51'),
(245, 'fazdil77@yahoo.co.in', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-05-27 15:03:22'),
(246, 'habirealty@gmail.com', 'e8b5f6570b1aca0fa4953d2377a3274f', 3, '2020-06-02 15:25:40'),
(247, 'arkmohideen@yahoo.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-07-04 05:34:10'),
(248, 'kamaalasmath@gmail.com', '4258fb74369c78c8e9d192c438e3dc98', 3, '2020-06-06 12:30:55'),
(249, 'officialazeem7@gmail.com', '837d326d85e00ae0f47d9f7738be81d7', 3, '2020-06-19 14:19:54'),
(250, 'khajalebbai@gmail.com', 'db89616e6e5ea223188303f289c0e7d8', 3, '2020-06-21 13:33:39'),
(251, 'Aysha@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-06-22 07:07:52'),
(252, 'viswa@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-06-22 13:14:41'),
(253, 'shazz2608@gmail.com', 'c5530b0b2867d1d4a1e7c1d0868e3bf4', 3, '2020-06-22 14:07:12'),
(254, 'deepaprasad1958@gmail.com', '109c0b7087bfad9617a184b24e2e8146', 3, '2020-06-26 16:30:57'),
(255, 'manoj.s1602@gmail.com', 'a3d2d9a152afe42eb300ea5b56523ecd', 3, '2020-06-27 13:52:20'),
(256, 'deepakjudy@gmail.com', 'e60946ebdf24c7541e4f9fed435bc40d', 3, '2020-06-30 15:32:01'),
(257, 'naseekifa@icloud.com', '5a9dde129f0f683b17bb642de0490538', 3, '2020-07-01 11:12:11'),
(258, 'vishwaryadutt@gmail.com', '94a21e06f4a0609c7b87cac9f4873a3c', 3, '2020-07-02 12:00:58'),
(259, 'oberoigaurav317@gmail.com', '4124bc0a9335c27f086f24ba207a4912', 3, '2020-07-05 08:00:16'),
(260, 'svignesh2105@gmail.com', '89f6e91c84ae95d613f60fa86b2aff48', 3, '2020-07-07 14:28:47'),
(261, 'ksrkraojuly1953@gmail.com', '87ad0bb3f4118d6dd94aada04c00f709', 3, '2020-07-08 03:43:38'),
(262, 'sivakumar.thiru@sbi.co.in', '6f7481bd00f79ef5a9455feb1fd1d348', 3, '2020-07-12 01:07:11'),
(263, 'harshithapv67@gmail.com', 'ffdff52afd0202861bfacb5d9e297dcb', 3, '2020-08-17 04:31:48'),
(264, 'mohansubbu@gmail.com', '2b89304da726f2486ff8e370d40b3ed0', 3, '2020-07-18 05:22:06'),
(265, 'jahari7@gmail.com', 'd4bfb7d5b6634ce62bc30b572fd752e8', 3, '2020-07-28 04:42:03'),
(266, 'velmurugan59692@gmail.com', '495c446a6cc3183ee667095893ead011', 3, '2020-08-10 12:51:39'),
(267, 'skbattestation@gmail.com', '3dc64d82f62ba561528f6c83791ed43a', 3, '2020-08-15 04:43:11'),
(268, 'barkath25.md@gmail.com', '87b866484a13d4bdcc3f1b1dd00e011d', 3, '2020-08-23 04:53:03'),
(269, 'makdhumabanu@gmail.com', '51d07f05d6e0af96636830fbfa23da8f', 3, '2020-08-24 18:32:49'),
(270, 'ahmedashif253@gmail.com', '4ae47319e38b5efdd41a6e74b5e6ac58', 3, '2020-08-27 18:33:07'),
(271, 's84710996@gmail.com', '189ab0c9f6dc8cc865b5e987aa992e93', 3, '2020-08-29 05:26:33'),
(272, 'salihamohamed8@gmail.com', '5df07ecf4cea616e3eb384a9be3511bb', 3, '2020-08-30 10:34:10'),
(273, 'irfanimran0612@gmail.com', '6ccf5094c506cdee604cf01c9237eaa4', 3, '2020-09-02 14:33:45'),
(274, 'ayeshabiotech@gmail.com', 'ad2e1f91a34a0f880631b3a47c48c8a2', 3, '2020-09-15 09:47:06'),
(275, 'mohamedasfaq1@gmail.com', '92d06ecf1cfc330d612dfd5c4bee3061', 3, '2020-09-23 07:24:39'),
(276, 'masroorahmed30@gmail.com', '03346657feea0490a4d4f677faa0583d', 3, '2020-10-04 09:53:29'),
(277, 'adnankhader40@gmail.com', 'aa3870525fd37551c80b22a5b7293892', 3, '2020-10-13 18:31:54'),
(278, 'sadiafirdouse83@gmail.com', 'ceb5715869491b9956de51c92c2f700d', 3, '2020-10-27 09:25:49'),
(279, 'josephrajangle@gmail.com', '8072af10bd2c8e7679c27340035d9051', 3, '2020-10-28 06:49:36'),
(280, 'smdsalman199@gmail.com', '20769d02852606e1aaa07de3ee8bbf21', 3, '2020-11-04 12:11:42'),
(281, 'thendrall79@gmail.com', '73741a8c767a4db2d0ff6c208aa116ad', 3, '2020-11-17 09:28:38'),
(282, 'kailash@webixun.com', 'e2fc714c4727ee9395f324cd2e7f331f', 3, '2020-12-03 14:41:16'),
(283, 'parvezmuda@gmail.com', '005f47cddf568dacb8d03e20ba682cf9', 3, '2020-12-08 07:13:10'),
(284, 'rasheedanoor74banu@gmail.com', '46fb6bcc0c4cf31acec53de186b26626', 3, '2020-12-23 13:43:37'),
(285, 'deepajdorairajpl@gmail.com', 'e60946ebdf24c7541e4f9fed435bc40d', 3, '2020-12-26 09:19:12'),
(286, 'deepthikl4u@gmail', 'dc75877b60d45030c07d50c40bf4df28', 3, '2021-01-04 09:20:23'),
(287, 'rashikhatri0013@gmail.com', '2d841879342d2b31b3b569165f2c8bd7', 2, '2021-06-17 11:20:42'),
(288, 'ab@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 2, '2021-06-17 10:45:50'),
(290, 'rashikhatri@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 2, '2021-06-17 10:49:08'),
(291, 'rashika@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 2, '2021-06-17 10:55:02'),
(294, 'rashik3a@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 2, '2021-06-17 10:56:31'),
(296, 'rashik7a@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 2, '2021-06-17 10:57:37'),
(297, 'rashik79a@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 2, '2021-06-17 11:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `user_liveclass`
--

CREATE TABLE `user_liveclass` (
  `id` bigint(50) NOT NULL,
  `u_id` text NOT NULL,
  `attendee_id` text NOT NULL,
  `class_id` text NOT NULL,
  `end_time` text NOT NULL,
  `join_time` text NOT NULL,
  `url` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_liveclass`
--

INSERT INTO `user_liveclass` (`id`, `u_id`, `attendee_id`, `class_id`, `end_time`, `join_time`, `url`, `status`) VALUES
(1, '88', '102', '2492040', '', '13:50:11', 'https://backend.wiziqxt.com/landing/session/v1/21ceec5a42453485af22dcb3823e277acc4d912e6a0a85b768278e6bb649a5ab/a?hash=MjQ4OTI0MzowY2U0YmQ5Mjc3MWQ3NjEwZDYyZTY3M2Q5ZGZmNmFkMGQwNjc0YWZhMDNmMjYyNzU=', 1),
(2, '88', '102', '2491300', '', '13:50:26', 'https://backend.wiziqxt.com/landing/session/v1/21ceec5a42453485af22dcb3823e277acc4d912e6a0a85b768278e6bb649a5ab/a?hash=MjQ4OTI0MzowY2U0YmQ5Mjc3MWQ3NjEwZDYyZTY3M2Q5ZGZmNmFkMGQwNjc0YWZhMDNmMjYyNzU=', 1),
(3, '88', '102', '2491300', '', '13:56:38', 'https://backend.wiziqxt.com/landing/session/v1/e5dcfba690b4feaccee8d3008ac3bb46167c4d8e817cab5ea2b6ddccdd5f49cd/a?hash=MjQ4OTI0Njo3ZDE3M2FlZjZiNGFmZDc5ZThjZWQ1ODgzYTE1MmFkZTcwNGIxMmMzNDRjMWFmNTQ=', 1),
(4, '88', '102', '2491300', '', '13:58:27', 'https://backend.wiziqxt.com/landing/session/v1/e5dcfba690b4feaccee8d3008ac3bb46167c4d8e817cab5ea2b6ddccdd5f49cd/a?hash=MjQ4OTI0Njo3ZDE3M2FlZjZiNGFmZDc5ZThjZWQ1ODgzYTE1MmFkZTcwNGIxMmMzNDRjMWFmNTQ=', 1),
(5, '88', '102', '2493134', '', '16:59:06', 'https://backend.wiziqxt.com/landing/session/v1/cbb45491602390006686d7f952fe3b7a651b34ff32ce39c81f5611b9f8778e6f/a?hash=MjQ5MzEzNDpmYTlhMTkzYWI2MjQxZWY4MWUyZjkzNzMxMTg0NzUxODVjMjk1YjkyZTM2ZGRmM2I=', 1),
(6, '88', '102', '2493134', '', '17:03:24', 'https://backend.wiziqxt.com/landing/session/v1/cbb45491602390006686d7f952fe3b7a651b34ff32ce39c81f5611b9f8778e6f/a?hash=MjQ5MzEzNDpmYTlhMTkzYWI2MjQxZWY4MWUyZjkzNzMxMTg0NzUxODVjMjk1YjkyZTM2ZGRmM2I=', 1),
(7, '88', '102', '2493134', '', '17:03:25', 'https://backend.wiziqxt.com/landing/session/v1/cbb45491602390006686d7f952fe3b7a651b34ff32ce39c81f5611b9f8778e6f/a?hash=MjQ5MzEzNDpmYTlhMTkzYWI2MjQxZWY4MWUyZjkzNzMxMTg0NzUxODVjMjk1YjkyZTM2ZGRmM2I=', 1),
(8, '88', '102', '2493180', '', '17:23:00', 'https://backend.wiziqxt.com/landing/session/v1/48d4d71b7ff699aad74013de8f02f360ec2888a01f597b2f3028e9d1524f70e5/a?hash=MjQ5MzE4MDowNWUzZjJjYTk0OWNmMDZjNzNhMGUzMjc3MTBkNWE2YjEyOTFlMWYyN2JiNDI1YTA=', 1),
(9, '88', '102', '2493241', '', '17:51:11', 'https://backend.wiziqxt.com/landing/session/v1/f25d663694aa9a72325bd7d8e2fdad20e89d78018a85e2b5f7afc53251659c3f/a?hash=MjQ5MzI0MTpjMmFmNTdiNjcwM2I5N2ZkN2U1NDhmYWQ0ZTgwZTcwODViNDdmMTA4MzBiZTI5MWE=', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `u_id` bigint(50) NOT NULL,
  `status` varchar(66) NOT NULL,
  `block_reason` text DEFAULT NULL,
  `f_name` varchar(66) NOT NULL,
  `l_name` varchar(66) NOT NULL,
  `gender` varchar(66) NOT NULL,
  `token` varchar(66) NOT NULL,
  `profile_pic` text NOT NULL,
  `w_money` int(11) NOT NULL DEFAULT 0,
  `reward_points` int(11) NOT NULL DEFAULT 0,
  `contact` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `u_id`, `status`, `block_reason`, `f_name`, `l_name`, `gender`, `token`, `profile_pic`, `w_money`, `reward_points`, `contact`) VALUES
(9, 287, 'Active', NULL, 'Market', 'Boi', 'Male', ' ', 'user.png', 0, 0, ''),
(56, 88, 'Enabled', NULL, 'Ahamed', 'Sheriff', 'Male', '', 'user.png', 0, 0, ''),
(57, 89, 'Enabled', NULL, 'Sujth', 'Sampath', 'Male', '', 'user.png', 0, 0, ''),
(58, 90, 'Enabled', NULL, 'Inayath', 'Baig', 'Male', '', 'user.png', 0, 0, ''),
(59, 91, 'Enabled', NULL, 'Noorullah', 'Husain', 'Male', '', 'user.png', 0, 0, ''),
(60, 92, 'Enabled', NULL, 'Mohammed Abdul', 'Jaleel', 'Male', '', 'user.png', 0, 0, ''),
(61, 93, 'Block', 'demo', 'Ayushi', 'Jain', 'Male', '', 'user.png', 0, 0, ''),
(62, 94, 'Enabled', NULL, 'Manjula', '', 'Male', '', 'user.png', 0, 0, ''),
(63, 96, 'Enabled', NULL, 'Manikandan', 'C', 'Male', '', 'user.png', 0, 0, ''),
(64, 97, 'Enabled', NULL, 'S. PARVATHAVARDHNI', 'SATHIYAMURTHY', 'Male', '', 'user.png', 0, 0, ''),
(65, 98, 'Enabled', NULL, 'Yasser', 'Yasin', 'Male', '', 'user.png', 0, 0, ''),
(66, 99, 'Enabled', NULL, 'Absar', 'Basha', 'Male', '', 'user.png', 0, 0, ''),
(67, 103, 'Enabled', NULL, 'Mohammed', 'Ali', 'Male', '', 'user.png', 0, 0, ''),
(68, 106, 'Enabled', NULL, 'Vinod', 'Shankar', 'Male', '', 'user.png', 0, 0, ''),
(69, 107, 'Enabled', NULL, 'Mohammed ali.A', 'Ali.A', 'Male', '', 'user.png', 0, 0, ''),
(70, 108, 'Enabled', NULL, 'Lovely', 'Afrose', 'Male', '', 'user.png', 0, 0, ''),
(72, 110, 'Enabled', NULL, 'Amberina', 'Khilji', 'Male', '', 'user.png', 0, 0, ''),
(73, 111, 'Enabled', NULL, 'Shabiya', 'thaseen', 'Male', '', 'user.png', 0, 0, ''),
(74, 113, 'Block', 'not valid phone no', 'Panchan', 'Sheoran', 'Male', '', 'user.png', 0, 0, ''),
(75, 114, 'Enabled', NULL, 'Kausari', 'Begum', 'Male', '', 'user.png', 0, 0, ''),
(76, 115, 'Enabled', NULL, 'Syed', 'Afridi', 'Male', '', 'user.png', 0, 0, ''),
(77, 116, 'Enabled', NULL, 'Vishnu', 'Ram', 'Male', '', 'user.png', 0, 0, ''),
(78, 117, 'Enabled', NULL, 'Aarif', 'Basha', 'Male', '', 'user.png', 0, 0, ''),
(79, 119, 'Enabled', NULL, 'Rufia', 'Thaseen', 'Male', '', 'user.png', 0, 0, ''),
(80, 120, 'Enabled', NULL, 'Karthikeyan', 'R', 'Male', '', 'user.png', 0, 0, ''),
(81, 125, 'Enabled', NULL, 'Karthik', 'R', 'Male', '', 'user.png', 0, 0, ''),
(82, 126, 'Enabled', NULL, 'Villalan', 'Srinivasan', 'Male', '', 'user.png', 0, 0, ''),
(83, 127, 'Enabled', NULL, 'Ahamed', 'Roshan', 'Male', '', 'user.png', 0, 0, ''),
(84, 128, 'Enabled', NULL, 'anamika', 'kk', 'Male', '', 'user.png', 0, 0, ''),
(85, 129, 'Enabled', NULL, 'Shayestha', 'Fathima', 'Male', '', 'user.png', 0, 0, ''),
(86, 130, 'Enabled', NULL, 'Anju', 'Kovalan', 'Male', '', 'user.png', 0, 0, ''),
(87, 131, 'Enabled', NULL, 'Banu', 'Noor', 'Male', '', 'user.png', 0, 0, ''),
(88, 160, 'Enabled', NULL, 'Manikandan', 'C', 'Male', '', 'user.png', 0, 0, ''),
(89, 174, 'Enabled', NULL, 'Elgoog', 'Elgoog', 'Male', '', 'user.png', 0, 0, ''),
(90, 175, 'Enabled', NULL, 'Rubina', 'Sheriff', 'Male', '', 'user.png', 0, 0, ''),
(91, 176, 'Enabled', NULL, 'Khader mohideen', '', 'Male', '', 'user.png', 0, 0, ''),
(92, 204, 'Enabled', NULL, 'Jayadev', '', 'Male', '', 'user.png', 0, 0, ''),
(93, 205, 'Enabled', NULL, '', 'Yacob', 'Male', '', 'user.png', 0, 0, ''),
(94, 206, 'Enabled', NULL, 'Mohammed bilal', '', 'Male', '', 'user.png', 0, 0, ''),
(95, 207, 'Enabled', NULL, 'Viswanathan', 'Periyasamy', 'Male', '', 'user.png', 0, 0, ''),
(96, 208, 'Enabled', NULL, 'Shahul', 'HAMEED', 'Male', '', 'user.png', 0, 0, ''),
(97, 209, 'Enabled', NULL, 'Sai', 'Dikshan', 'Male', '', 'user.png', 0, 0, ''),
(98, 218, 'Enabled', NULL, 'Nizam', 'Syed', 'Male', '', 'user.png', 0, 0, ''),
(99, 219, 'Enabled', NULL, 'Absar', 'Basha', 'Male', '', 'user.png', 0, 0, ''),
(100, 222, 'Enabled', NULL, 'Shafi', 'KS', 'Male', '', 'user.png', 0, 0, ''),
(101, 224, 'Enabled', NULL, 'Irfana', '', 'Male', '', 'user.png', 0, 0, ''),
(102, 225, 'Enabled', NULL, 'Musfira', '', 'Male', '', 'user.png', 0, 0, ''),
(103, 226, 'Enabled', NULL, 'ovj', 'ash', 'Male', '', 'user.png', 0, 0, ''),
(104, 227, 'Enabled', NULL, 'SHOBA', 'PRABHU', 'Male', '', 'user.png', 0, 0, ''),
(105, 228, 'Enabled', NULL, 'Ponmani', 'Pandian', 'Male', '', 'user.png', 0, 0, ''),
(106, 229, 'Enabled', NULL, 'Martinah', 'Joseph', 'Male', '', 'user.png', 0, 0, ''),
(107, 230, 'Enabled', NULL, 'TAYYAB', '', 'Male', '', 'user.png', 0, 0, ''),
(108, 231, 'Enabled', NULL, 'syed', 'nelu', 'Male', '', 'user.png', 0, 0, ''),
(109, 232, 'Enabled', NULL, 'Nandhithaa', 'Mohan', 'Male', '', 'user.png', 0, 0, ''),
(110, 233, 'Enabled', NULL, '', 'Ali', 'Male', '', 'user.png', 0, 0, ''),
(111, 234, 'Enabled', NULL, 'Afrose', 'Adhil', 'Male', '', 'user.png', 0, 0, ''),
(112, 235, 'Enabled', NULL, 'MEHTAB', 'ABULKALAM', 'Male', '', 'user.png', 0, 0, ''),
(113, 236, 'Enabled', NULL, 'Kavitha', 'K', 'Male', '', 'user.png', 0, 0, ''),
(114, 237, 'Enabled', NULL, 'KARPAGAM', 'Gnanaprakasam', 'Male', '', 'user.png', 0, 0, ''),
(115, 238, 'Enabled', NULL, 'Saba', 'Altaf', 'Male', '', 'user.png', 0, 0, ''),
(116, 239, 'Enabled', NULL, 'Shahul', 'Hameed', 'Male', '', 'user.png', 0, 0, ''),
(117, 240, 'Enabled', NULL, 'Farook', 'J', 'Male', '', 'user.png', 0, 0, ''),
(118, 241, 'Enabled', NULL, 'Shubham', 'Goyal', 'Male', '', 'user.png', 0, 0, ''),
(119, 242, 'Enabled', NULL, 'vijay', 'anand', 'Male', '', 'user.png', 0, 0, ''),
(120, 243, 'Enabled', NULL, 'vasantha', 'lakshmi', 'Male', '', 'user.png', 0, 0, ''),
(121, 244, 'Enabled', NULL, 'Anupam', 'Kandwal', 'Male', '', 'user.png', 0, 0, ''),
(122, 245, 'Enabled', NULL, 'Fazeelath', 'Nisa', 'Male', '', 'user.png', 0, 0, ''),
(123, 246, 'Enabled', NULL, 'shamer', 'k', 'Male', '', 'user.png', 0, 0, ''),
(124, 247, 'Enabled', NULL, 'Khader', 'Haji', 'Male', '', 'user.png', 0, 0, ''),
(125, 248, 'Enabled', NULL, 'kamaal', 'asmath', 'Male', '', 'user.png', 0, 0, ''),
(126, 249, 'Enabled', NULL, 'Abdul', 'Azeem', 'Male', '', 'user.png', 0, 0, ''),
(127, 250, 'Enabled', NULL, 'Khaja', 'Mohideen', 'Male', '', 'user.png', 0, 0, ''),
(128, 251, 'Enabled', NULL, 'Aysha', 'Siddiqa', 'Male', '', 'user.png', 0, 0, ''),
(129, 252, 'Enabled', NULL, 'Viswa', 'Nathan', 'Male', '', 'user.png', 0, 0, ''),
(130, 253, 'Enabled', NULL, 'Shaza', 'Akthar', 'Male', '', 'user.png', 0, 0, ''),
(131, 254, 'Enabled', NULL, 'Deepikaprasad', 'Prasad', 'Male', '', 'user.png', 0, 0, ''),
(132, 255, 'Enabled', NULL, 'Manoj', 'Surandranaath', 'Male', '', 'user.png', 0, 0, ''),
(133, 256, 'Enabled', NULL, 'Deepak', 'Dorairaj', 'Male', '', 'user.png', 0, 0, ''),
(134, 257, 'Enabled', NULL, 'MOHAMMED KIFAYATHULLAH', '', 'Male', '', 'user.png', 0, 0, ''),
(135, 258, 'Enabled', NULL, 'Vishu', 'Dutt', 'Male', '', 'user.png', 0, 0, ''),
(136, 259, 'Enabled', NULL, 'Gaurav', 'Oberoi', 'Male', '', 'user.png', 0, 0, ''),
(137, 260, 'Enabled', NULL, 'Vignesh', 'S', 'Male', '', 'user.png', 0, 0, ''),
(138, 261, 'Enabled', NULL, 'Ksrkrao', 'Siva', 'Male', '', 'user.png', 0, 0, ''),
(139, 262, 'Enabled', NULL, 'Sivakumar', 'Thirumal', 'Male', '', 'user.png', 0, 0, ''),
(140, 263, 'Enabled', NULL, 'Meena', 'K', 'Male', '', 'user.png', 0, 0, ''),
(141, 264, 'Enabled', NULL, 'Mohan', 'S', 'Male', '', 'user.png', 0, 0, ''),
(142, 265, 'Enabled', NULL, 'Jahari', 'J', 'Male', '', 'user.png', 0, 0, ''),
(143, 266, 'Enabled', NULL, 'Vel', 'Murugan', 'Male', '', 'user.png', 0, 0, ''),
(144, 267, 'Enabled', NULL, 'Syed', 'Haja', 'Male', '', 'user.png', 0, 0, ''),
(145, 268, 'Enabled', NULL, 'Barkath', 'Mohammed', 'Male', '', 'user.png', 0, 0, ''),
(146, 269, 'Enabled', NULL, 'Mohamed', 'Sameer', 'Male', '', 'user.png', 0, 0, ''),
(147, 270, 'Enabled', NULL, 'Ashif', 'Ahmed', 'Male', '', 'user.png', 0, 0, ''),
(148, 271, 'Enabled', NULL, 'Sharan', 'Sharan', 'Male', '', 'user.png', 0, 0, ''),
(149, 272, 'Enabled', NULL, 'Mohamed', 'Saliha', 'Male', '', 'user.png', 0, 0, ''),
(150, 273, 'Enabled', NULL, 'Najeema', 'Begum', 'Male', '', 'user.png', 0, 0, ''),
(151, 274, 'Enabled', NULL, 'Ayesha', 'Banu', 'Male', '', 'user.png', 0, 0, ''),
(152, 275, 'Enabled', NULL, 'Mohamed', 'A R', 'Male', '', 'user.png', 0, 0, ''),
(153, 276, 'Enabled', NULL, 'A.masroor', 'ahmed', 'Male', '', 'user.png', 0, 0, ''),
(154, 277, 'Enabled', NULL, 'Adnan', 'Khader', 'Male', '', 'user.png', 0, 0, ''),
(155, 278, 'Enabled', NULL, 'Sadia', 'Firdouse', 'Male', '', 'user.png', 0, 0, ''),
(156, 279, 'Enabled', NULL, 'F.Joseph', 'Raj', 'Male', '', 'user.png', 0, 0, ''),
(157, 280, 'Enabled', NULL, 'smd', 'Salman', 'Male', '', 'user.png', 0, 0, ''),
(158, 281, 'Enabled', NULL, 'Jayalakshmi', '', 'Male', '', 'user.png', 0, 0, ''),
(159, 282, 'Enabled', NULL, 'Kailash', 'Sharma', 'Male', '', 'user.png', 0, 0, ''),
(160, 283, 'Enabled', NULL, 'Sara', 'C', 'Male', '', 'user.png', 0, 0, ''),
(161, 284, 'Enabled', NULL, 'Banu', 'Noor', 'Male', '', 'user.png', 0, 0, ''),
(162, 285, 'Enabled', NULL, 'Judy', 'Dorairaj', 'Male', '', 'user.png', 0, 0, ''),
(163, 286, 'Enabled', NULL, 'Harshitha', 'Pv', 'Male', '', 'user.png', 0, 0, ''),
(164, 288, 'Enabled', NULL, 'rrrrrrrrrrrrrrrr', 'kkkkkkkkkkkkk', 'Female', '', 'user.png', 0, 0, ''),
(170, 297, 'Enabled', NULL, 'rashi', 'khatri', 'Female', '', 'user.png', 0, 0, '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `user_purchase_lib`
--

CREATE TABLE `user_purchase_lib` (
  `id` bigint(50) NOT NULL,
  `purchase_type` text NOT NULL COMMENT 'course, program or quiz',
  `item_id` bigint(50) NOT NULL,
  `u_id` bigint(50) NOT NULL,
  `purchase_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_purchase_lib`
--

INSERT INTO `user_purchase_lib` (`id`, `purchase_type`, `item_id`, `u_id`, `purchase_time`) VALUES
(69, 'course', 3, 287, '2021-06-03 07:32:53'),
(70, 'program', 4, 287, '2021-06-06 04:03:35'),
(71, 'course', 6, 287, '2021-06-03 07:54:55'),
(72, 'course', 12, 287, '2021-06-06 13:06:06'),
(73, 'program', 14, 287, '2021-06-06 19:38:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_quiz_ans`
--

CREATE TABLE `user_quiz_ans` (
  `id` bigint(50) NOT NULL,
  `quiz_id` bigint(50) NOT NULL,
  `user_id` bigint(50) NOT NULL,
  `q_id` bigint(50) NOT NULL,
  `user_option` int(11) NOT NULL,
  `status` text NOT NULL,
  `file` text NOT NULL,
  `quiz_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_quiz_ans`
--

INSERT INTO `user_quiz_ans` (`id`, `quiz_id`, `user_id`, `q_id`, `user_option`, `status`, `file`, `quiz_type`) VALUES
(65, 6, 88, 0, 0, '1', 'uploads/RashikaKhatri_1918594_B.1621947459.pdf', 'mains'),
(66, 26, 287, 0, 0, '1', 'uploads/presentationofmanagersroles-110714045403-phpapp02.1622632886.pdf', 'mains'),
(67, 29, 287, 0, 0, '1', 'uploads/CH 16 Visibility and Positioning in CSS.1622696792.docx', 'mains'),
(68, 32, 287, 0, 0, '1', '', 'mains'),
(69, 32, 287, 0, 0, '1', 'uploads/InfluencerSaga-min (2).1622698338.pdf', 'mains'),
(70, 36, 287, 0, 0, '1', 'uploads/B23Rashika.1622970808.pdf', 'mains'),
(71, 42, 287, 24, 4, 'incorrect', '', ''),
(72, 42, 287, 25, 2, 'correct', '', ''),
(73, 43, 287, 0, 0, '1', 'uploads/WhatsApp Image 2021-05-27 at 10.41.13 AM.1623008359.jpeg', 'mains'),
(74, 44, 287, 29, 2, 'incorrect', '', ''),
(75, 44, 287, 30, 3, 'incorrect', '', ''),
(76, 41, 287, 28, 1, 'incorrect', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `why_us`
--

CREATE TABLE `why_us` (
  `id` bigint(50) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `sort_order` int(11) NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `why_us`
--

INSERT INTO `why_us` (`id`, `title`, `description`, `sort_order`, `added_on`) VALUES
(3, 'Reason1', 'Description1', 1, '2021-03-22 18:41:12'),
(4, 'Reason2', 'Description2', 2, '2021-03-22 18:41:23'),
(5, 'Reason 3', 'Description 3', 3, '2021-03-22 18:41:41'),
(6, 'Reason 4', 'Description4', 4, '2021-03-22 18:41:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_quiz_ans`
--
ALTER TABLE `admin_quiz_ans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_navbar`
--
ALTER TABLE `customer_navbar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent` (`parent`);

--
-- Indexes for table `customer_navbar_corresponding_pages`
--
ALTER TABLE `customer_navbar_corresponding_pages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `navbar_id` (`navbar_id`);

--
-- Indexes for table `documents_upload`
--
ALTER TABLE `documents_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dynamic_pages`
--
ALTER TABLE `dynamic_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_sent`
--
ALTER TABLE `email_sent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_subscribe`
--
ALTER TABLE `email_subscribe`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `featured_courses`
--
ALTER TABLE `featured_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgot_pass`
--
ALTER TABLE `forgot_pass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `input_values`
--
ALTER TABLE `input_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `live_class`
--
ALTER TABLE `live_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navbar_access`
--
ALTER TABLE `navbar_access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `navbar_id` (`navbar_id`);

--
-- Indexes for table `notifications_sent`
--
ALTER TABLE `notifications_sent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `o_id` (`o_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `o_id` (`o_id`);

--
-- Indexes for table `order_item_options`
--
ALTER TABLE `order_item_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_item_id` (`order_item_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participated_quiz`
--
ALTER TABLE `participated_quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_log`
--
ALTER TABLE `payment_log`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `txn_id` (`txn_id`);

--
-- Indexes for table `payment_options`
--
ALTER TABLE `payment_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `previousquiz`
--
ALTER TABLE `previousquiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `previousquiz_que`
--
ALTER TABLE `previousquiz_que`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programs_and_courses`
--
ALTER TABLE `programs_and_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_options`
--
ALTER TABLE `quiz_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_details`
--
ALTER TABLE `shop_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sms_sent`
--
ALTER TABLE `sms_sent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statesandcity`
--
ALTER TABLE `statesandcity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `study_material`
--
ALTER TABLE `study_material`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `useful_links`
--
ALTER TABLE `useful_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `user_liveclass`
--
ALTER TABLE `user_liveclass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_id` (`u_id`);

--
-- Indexes for table `user_purchase_lib`
--
ALTER TABLE `user_purchase_lib`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_quiz_ans`
--
ALTER TABLE `user_quiz_ans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `why_us`
--
ALTER TABLE `why_us`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_quiz_ans`
--
ALTER TABLE `admin_quiz_ans`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `customer_navbar`
--
ALTER TABLE `customer_navbar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `customer_navbar_corresponding_pages`
--
ALTER TABLE `customer_navbar_corresponding_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `documents_upload`
--
ALTER TABLE `documents_upload`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2810;

--
-- AUTO_INCREMENT for table `dynamic_pages`
--
ALTER TABLE `dynamic_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `email_sent`
--
ALTER TABLE `email_sent`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_subscribe`
--
ALTER TABLE `email_subscribe`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `featured_courses`
--
ALTER TABLE `featured_courses`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `forgot_pass`
--
ALTER TABLE `forgot_pass`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `input_values`
--
ALTER TABLE `input_values`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `live_class`
--
ALTER TABLE `live_class`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `navbar_access`
--
ALTER TABLE `navbar_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `notifications_sent`
--
ALTER TABLE `notifications_sent`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item_options`
--
ALTER TABLE `order_item_options`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `participated_quiz`
--
ALTER TABLE `participated_quiz`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `payment_log`
--
ALTER TABLE `payment_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `payment_options`
--
ALTER TABLE `payment_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `previousquiz`
--
ALTER TABLE `previousquiz`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `previousquiz_que`
--
ALTER TABLE `previousquiz_que`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programs_and_courses`
--
ALTER TABLE `programs_and_courses`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `quiz_options`
--
ALTER TABLE `quiz_options`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shop_details`
--
ALTER TABLE `shop_details`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `sms_sent`
--
ALTER TABLE `sms_sent`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `statesandcity`
--
ALTER TABLE `statesandcity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3624;

--
-- AUTO_INCREMENT for table `study_material`
--
ALTER TABLE `study_material`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `useful_links`
--
ALTER TABLE `useful_links`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=298;

--
-- AUTO_INCREMENT for table `user_liveclass`
--
ALTER TABLE `user_liveclass`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `user_purchase_lib`
--
ALTER TABLE `user_purchase_lib`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `user_quiz_ans`
--
ALTER TABLE `user_quiz_ans`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `why_us`
--
ALTER TABLE `why_us`
  MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
