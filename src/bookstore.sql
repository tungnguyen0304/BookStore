-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2023 at 05:52 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`ID`, `name`) VALUES
(4, 'Andrew Matthews'),
(3, 'Dale Carnegie'),
(5, 'Hạ Vũ'),
(2, 'J. K. Rowling'),
(1, 'Nguyễn Nhật Ánh'),
(11, 'Raymond Murphy');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID` int(10) UNSIGNED NOT NULL,
  `unique_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `unique_name`, `name`) VALUES
(1, 'sach-trong-nuoc', 'Sách trong nước'),
(2, 'sach-ngoai-quoc', 'Sách ngoại quốc'),
(3, 'van-phong-pham', 'Văn phòng phẩm'),
(4, 'do-choi', 'Đồ chơi'),
(5, 'hang-luu-niem', 'Hàng lưu niệm');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `country` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`ID`, `name`, `country`) VALUES
(1, 'Trẻ', 'Việt Nam'),
(2, 'Thanh niên', 'Việt Nam'),
(3, 'Giáo dục', 'Việt Nam'),
(4, 'Tổng hợp Thành phố Hồ Chí Minh', 'Việt Nam'),
(5, 'Kim Đồng', 'Việt Nam'),
(6, 'Cambridge University', 'Anh'),
(7, 'M&G', 'Trung Quốc');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `ID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `order_datetime` datetime NOT NULL,
  `total` int(10) UNSIGNED NOT NULL,
  `delivery_cost` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` char(1) NOT NULL DEFAULT '0',
  `method` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`ID`, `userID`, `name`, `phone`, `address`, `order_datetime`, `total`, `delivery_cost`, `status`, `method`) VALUES
(5, 23, 'Đại học Bách Khoa', '0838654087', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương', '2023-04-11 14:07:30', 662100, 15000, '0', '1');

-- --------------------------------------------------------

--
-- Table structure for table `order_content`
--

CREATE TABLE `order_content` (
  `orderID` int(10) UNSIGNED NOT NULL,
  `productID` int(10) UNSIGNED NOT NULL,
  `qty` int(10) UNSIGNED NOT NULL,
  `subtotal` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `order_content`
--

INSERT INTO `order_content` (`orderID`, `productID`, `qty`, `subtotal`) VALUES
(5, 16, 1, 135000),
(5, 17, 2, 300000),
(5, 18, 1, 169100),
(5, 19, 2, 43000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `unique_name` varchar(230) NOT NULL,
  `sold_qty` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `current_qty` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `in_stock` tinyint(1) NOT NULL DEFAULT 1,
  `image` varchar(255) DEFAULT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `description` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `authorID` int(10) UNSIGNED DEFAULT NULL,
  `manufacturerID` int(10) UNSIGNED DEFAULT NULL,
  `categoryID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `name`, `unique_name`, `sold_qty`, `current_qty`, `in_stock`, `image`, `price`, `description`, `authorID`, `manufacturerID`, `categoryID`) VALUES
(16, 'HARRY POTTER VÀ HÒN ĐÁ PHÙ THỦY', 'harry-potter-va-hon-da-phu-thuy', 10, 210, 1, 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_21542017_035423.jpg', 135000, 'Khi một lá thư được gởi đến cho cậu bé Harry Potter bình thường và bất hạnh, cậu khám phá ra một bí mật đã được che giấu suốt cả một thập kỉ. Cha mẹ cậu chính là phù thủy và cả hai đã bị lời nguyền của Chúa tể Hắc ám giết hại khi Harry mới chỉ là một đứa trẻ, và bằng cách nào đó, cậu đã giữ được mạng sống của mình. Thoát khỏi những người giám hộ Muggle không thể chịu đựng nổi để nhập học vào trường Hogwarts, một trường đào tạo phù thủy với những bóng ma và phép thuật, Harry tình cờ dấn thân vào một cuộc phiêu lưu đầy gai góc khi cậu phát hiện ra một con chó ba đầu đang canh giữ một căn phòng trên tầng ba. Rồi Harry nghe nói đến một viên đá bị mất tích sở hữu những sức mạnh lạ kì, rất quí giá, vô cùng nguy hiểm, mà cũng có thể là mang cả hai đặc điểm trên', 2, 1, 2),
(17, 'HARRY POTTER VÀ PHÒNG CHỨA BÍ MẬT', 'HARRY-POTTER-VA-PHONG-CHUA-BI-MAT', 0, 120, 1, 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_21472017_034753.jpg', 150000, 'Harry khổ sở mong ngóng cho kì nghỉ hè kinh khủng với gia đình Dursley kết thúc. Nhưng một con gia tinh bé nhỏ tội nghiệp đã cảnh báo cho Harry biết về mối nguy hiểm chết người đang chờ cậu ở trường Hogwarts.\r\nTrở lại trường học, Harry nghe một tin đồn đang lan truyền về phòng chứa bí mật, nơi cất giữ những bí ẩn đáng sợ dành cho giới phù thủy có nguồn gốc Muggle. Có kẻ nào đó đang phù phép làm tê liệt mọi người, khiến họ gần như đã chết, và một lời cảnh báo kinh hoàng được tìm thấy trên bức tường. Mối nghi ngờ hàng đầu – và luôn luôn sai lầm – là Harry. Nhưng một việc còn đen tối hơn thế đã được hé mở.\r\n‘Harry Potter và phòng chứa bí mật, không như những bộ truyện nhiều tập khác, vẫn tuyệt hay như người anh em trước… Hogwarts là sáng tạo của một thiên tài.’- Times Literary Supplement', 2, 1, 1),
(18, 'English Grammar in Use Book w Ans', 'English-Grammar-in-Use-Book-w-Ans', 0, 234, 1, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781108430425.jpg', 169100, 'The world\'s best-selling grammar series for learners of English. English Grammar in Use Fourth edition is an updated version of the world\'s best-selling grammar title. It has a fresh, appealing new design and clear layout, with revised and updated examples, but retains all the key features of clarity and accessibility that have made the book popular with millions of learners and teachers around the world. This \'with answers\' version is ideal for self-study.', 11, 6, 2),
(19, 'Bút Nước Xoá Được M&G FKP65815B2 - Màu Xanh Dương - Mực Xanh', 'But-Nuoc-Xoa-Duoc-M&G-FKP65815B2-MauXanhDuong-Muc-Xanh', 127, 122, 1, 'https://cdn0.fahasa.com/media/catalog/product/6/9/6933631569711-mau3.jpg', 21500, 'Bút có thiết kế 1 đầu viết; một đầu tẩy. Bút chỉ có thể tẩy được với đúng mực của loại bút này\r\nCó thể sử dụng như bút gel bình thường, mực không phai theo thời gian, nhưng khi cần xóa, có thể sử dụng đầu tẩy có sẵn ở đuôi bút có thể dễ dàng tẩy xóa mà không để lại dấu vết, mực viết ra sẽ được làm trong suốt (tẩy mực hoàn toàn 100%).\r\nChữ viết trơn tru, mực được phân bố đều, đầu bi không dễ bị rò rỉ mực.\r\nLưu ý:\r\n- Không được dùng bút để viết, ký những giấy tờ pháp lý.\r\n- Thí sinh không nên sử dụng khi làm bài kiểm tra.\r\nMã hàng	6933631569711-mau3\r\nNhà Cung Cấp: Cty Trân Mỹ\r\nThương Hiệu: M&G\r\nXuất Xứ Thương Hiệu: Trung Quốc\r\nNơi Gia Công & Sản Xuất	Trung Quốc\r\nMàu sắc	Xanh Dương\r\nMàu Mực	Xanh\r\nChất liệu: Nhựa\r\nTrọng lượng (gr): 10\r\nKích Thước Bao Bì: 15 x 0.3 x 0.3 cm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Bút Gel - Bút Nước - Ruột Bút Gel bán chạy của tháng\r\nGiá sản phẩm trên Bookstore đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nBút Nước Xoá Được M&G FKP65815B2\r\nBút có thiết kế 1 đầu viết; một đầu tẩy. Bút chỉ có thể tẩy được với đúng mực của loại bút này\r\nCó thể sử dụng như bút gel bình thường, mực không phai theo thời gian, nhưng khi cần xóa, có thể sử dụng đầu tẩy có sẵn ở đuôi bút có thể dễ dàng tẩy xóa mà không để lại dấu vết, mực viết ra sẽ được làm trong suốt (tẩy mực hoàn toàn 100%).\r\nChữ viết trơn tru, mực được phân bố đều, đầu bi không dễ bị rò rỉ mực.\r\nLưu ý:\r\n- Không được dùng bút để viết, ký những giấy tờ pháp lý.\r\n- Thí sinh không nên sử dụng khi làm bài kiểm tra.', NULL, 7, 3),
(20, 'TÔI THẤY HOA VÀNG TRÊN CỎ ĐỎ', 'toi-thay-hoa-vang-tren-co-do', 0, 125, 1, 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg', 123000, 'Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.\nTác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_comment`
--

CREATE TABLE `product_comment` (
  `ID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `productID` int(10) UNSIGNED NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `comment_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product_comment`
--

INSERT INTO `product_comment` (`ID`, `userID`, `productID`, `content`, `comment_datetime`) VALUES
(1, 3, 18, 'Hay quá anh ạ, em đọc không hiểu gì hết', '2023-04-18 05:45:09'),
(2, 23, 18, 'Tôi dân Bách Khoa nên thấy bình thường', '2023-04-18 05:46:47');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `role` char(1) NOT NULL DEFAULT '0',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `password_hash`, `role`, `name`, `phone`, `email`, `address`) VALUES
(3, 'user', '$2y$10$AnOWfHN9MgSdMmOmv3A2.e2teV.ZIB0swRUfCbSjLuQY0f1UruEtS', '0', 'Tôi là user', '', '', ''),
(17, 'admin', '$2y$10$XSMDzwmg6d20darPkuL.IuKU7IS6.AunCslj163yRx5Ut.eWASAwO', '1', 'Tôi là admin', '', '', ''),
(21, 'user1', '$2y$10$400gl9awQlOUSF9Y.Av/SOE2oyj8319ommiu0LfMHcuHhSercHQb.', '0', 'Tôi là user khác', '0909090909', '', '1, Le Duan, Q.1, TP.HCM'),
(22, 'user123', '$2y$10$8R13iLk6TIfbE832j2GKCukkAUQmcgGKhvO/x1wlF7GVcerjiTgUC', '0', 'Nguyễn Văn Nguyễn ACB', '0987654321', 'nguyenacb123@gmail.com', '1, Lê Duẩn, P.1, Q.Bình Thạnh, TP.HCM'),
(23, 'bachkhoa', '$2y$10$nBv0GXdLwR.FLjwvCIVT7ep3Ppm57vN0tnovRhAJ3Hd4rvresAqyC', '0', 'Đại học Bách Khoa', '0838654087', 'pdt@hcmut.edu.vn', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương'),
(24, 'khmt', '$2y$10$z.UxFICoz2fHGH7689yueellx9v8.nvp6zx5h9Boof3DasjehxqdS', '0', 'KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH', '0886472560', 'welcome@cse.hcmut.edu.vn', 'A3 – 268 Lý Thường Kiệt, Q. 10, TP. HCM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `name` (`unique_name`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `order_fk_userID` (`userID`);

--
-- Indexes for table `order_content`
--
ALTER TABLE `order_content`
  ADD PRIMARY KEY (`orderID`,`productID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `unique_name` (`unique_name`),
  ADD KEY `product_fk_authorID` (`authorID`),
  ADD KEY `product_fk_categoryID` (`categoryID`),
  ADD KEY `product_fk_manufacturerID` (`manufacturerID`);

--
-- Indexes for table `product_comment`
--
ALTER TABLE `product_comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_comment`
--
ALTER TABLE `product_comment`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_fk_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_content`
--
ALTER TABLE `order_content`
  ADD CONSTRAINT `order_content_fk_orderID` FOREIGN KEY (`orderID`) REFERENCES `order` (`ID`),
  ADD CONSTRAINT `order_content_fk_productID` FOREIGN KEY (`productID`) REFERENCES `product` (`ID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_fk_authorID` FOREIGN KEY (`authorID`) REFERENCES `author` (`ID`),
  ADD CONSTRAINT `product_fk_categoryID` FOREIGN KEY (`categoryID`) REFERENCES `category` (`ID`),
  ADD CONSTRAINT `product_fk_manufacturerID` FOREIGN KEY (`manufacturerID`) REFERENCES `manufacturer` (`ID`);

--
-- Constraints for table `product_comment`
--
ALTER TABLE `product_comment`
  ADD CONSTRAINT `product_comment_fk_productID` FOREIGN KEY (`productID`) REFERENCES `product` (`ID`),
  ADD CONSTRAINT `product_comment_fk_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
