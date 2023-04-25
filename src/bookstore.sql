-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 25, 2023 at 09:57 AM
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
(13, 'Mark Harrison'),
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
(7, 'M&G', 'Trung Quốc'),
(8, 'MEGATOYS', '');

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
(5, 23, 'Đại học Bách Khoa', '0838654087', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương', '2023-04-11 14:07:30', 662100, 15000, '0', '1'),
(6, 22, 'Giấu tên', '0987654321', '1, Lê Duẩn, P.1, Q.Bình Thạnh, TP.HCM', '2023-04-25 06:01:59', 1191300, 15000, '0', '0'),
(7, 22, 'Nguyễn Văn Nguyễn ACB', '0987654321', '1, Lê Duẩn, P.1, Q.Bình Thạnh, TP.HCM', '2023-04-25 06:29:01', 1203000, 15000, '0', '1'),
(8, 22, 'Nguyễn Văn Nguyễn ACB', '0987654321', '1, Lê Duẩn, P.1, Q.Bình Thạnh, TP.HCM', '2023-04-25 06:30:36', 141400, 15000, '0', '0');

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
(5, 19, 2, 43000),
(6, 17, 2, 300000),
(6, 18, 3, 507300),
(6, 20, 3, 369000),
(7, 21, 2, 224000),
(7, 22, 2, 434000),
(7, 23, 2, 530000),
(8, 26, 2, 126400);

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
(16, 'HARRY POTTER VÀ HÒN ĐÁ PHÙ THỦY', 'harry-potter-va-hon-da-phu-thuy', 10, 210, 1, 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_21542017_035423.jpg', 135000, 'Khi một lá thư được gởi đến cho cậu bé Harry Potter bình thường và bất hạnh, cậu khám phá ra một bí mật đã được che giấu suốt cả một thập kỉ. Cha mẹ cậu chính là phù thủy và cả hai đã bị lời nguyền của Chúa tể Hắc ám giết hại khi Harry mới chỉ là một đứa trẻ, và bằng cách nào đó, cậu đã giữ được mạng sống của mình. Thoát khỏi những người giám hộ Muggle không thể chịu đựng nổi để nhập học vào trường Hogwarts, một trường đào tạo phù thủy với những bóng ma và phép thuật, Harry tình cờ dấn thân vào một cuộc phiêu lưu đầy gai góc khi cậu phát hiện ra một con chó ba đầu đang canh giữ một căn phòng trên tầng ba. Rồi Harry nghe nói đến một viên đá bị mất tích sở hữu những sức mạnh lạ kì, rất quí giá, vô cùng nguy hiểm, mà cũng có thể là mang cả hai đặc điểm trên', 2, 1, 1),
(17, 'HARRY POTTER VÀ PHÒNG CHỨA BÍ MẬT', 'HARRY-POTTER-VA-PHONG-CHUA-BI-MAT', 0, 120, 1, 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_21472017_034753.jpg', 150000, 'Harry khổ sở mong ngóng cho kì nghỉ hè kinh khủng với gia đình Dursley kết thúc. Nhưng một con gia tinh bé nhỏ tội nghiệp đã cảnh báo cho Harry biết về mối nguy hiểm chết người đang chờ cậu ở trường Hogwarts.\r\nTrở lại trường học, Harry nghe một tin đồn đang lan truyền về phòng chứa bí mật, nơi cất giữ những bí ẩn đáng sợ dành cho giới phù thủy có nguồn gốc Muggle. Có kẻ nào đó đang phù phép làm tê liệt mọi người, khiến họ gần như đã chết, và một lời cảnh báo kinh hoàng được tìm thấy trên bức tường. Mối nghi ngờ hàng đầu – và luôn luôn sai lầm – là Harry. Nhưng một việc còn đen tối hơn thế đã được hé mở.\r\n‘Harry Potter và phòng chứa bí mật, không như những bộ truyện nhiều tập khác, vẫn tuyệt hay như người anh em trước… Hogwarts là sáng tạo của một thiên tài.’- Times Literary Supplement', 2, 1, 1),
(18, 'English Grammar in Use Book w Ans', 'English-Grammar-in-Use-Book-w-Ans', 3, 231, 1, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781108430425.jpg', 169100, 'The world\'s best-selling grammar series for learners of English. English Grammar in Use Fourth edition is an updated version of the world\'s best-selling grammar title. It has a fresh, appealing new design and clear layout, with revised and updated examples, but retains all the key features of clarity and accessibility that have made the book popular with millions of learners and teachers around the world. This \'with answers\' version is ideal for self-study.', 11, 6, 2),
(19, 'Bút Nước Xoá Được M&G FKP65815B2 - Màu Xanh Dương - Mực Xanh', 'But-Nuoc-Xoa-Duoc-M&G-FKP65815B2-MauXanhDuong-Muc-Xanh', 127, 122, 1, 'https://cdn0.fahasa.com/media/catalog/product/6/9/6933631569711-mau3.jpg', 21500, 'Bút có thiết kế 1 đầu viết; một đầu tẩy. Bút chỉ có thể tẩy được với đúng mực của loại bút này\r\nCó thể sử dụng như bút gel bình thường, mực không phai theo thời gian, nhưng khi cần xóa, có thể sử dụng đầu tẩy có sẵn ở đuôi bút có thể dễ dàng tẩy xóa mà không để lại dấu vết, mực viết ra sẽ được làm trong suốt (tẩy mực hoàn toàn 100%).\r\nChữ viết trơn tru, mực được phân bố đều, đầu bi không dễ bị rò rỉ mực.\r\nLưu ý:\r\n- Không được dùng bút để viết, ký những giấy tờ pháp lý.\r\n- Thí sinh không nên sử dụng khi làm bài kiểm tra.\r\nMã hàng	6933631569711-mau3\r\nNhà Cung Cấp: Cty Trân Mỹ\r\nThương Hiệu: M&G\r\nXuất Xứ Thương Hiệu: Trung Quốc\r\nNơi Gia Công & Sản Xuất	Trung Quốc\r\nMàu sắc	Xanh Dương\r\nMàu Mực	Xanh\r\nChất liệu: Nhựa\r\nTrọng lượng (gr): 10\r\nKích Thước Bao Bì: 15 x 0.3 x 0.3 cm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Bút Gel - Bút Nước - Ruột Bút Gel bán chạy của tháng\r\nGiá sản phẩm trên Bookstore đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nBút Nước Xoá Được M&G FKP65815B2\r\nBút có thiết kế 1 đầu viết; một đầu tẩy. Bút chỉ có thể tẩy được với đúng mực của loại bút này\r\nCó thể sử dụng như bút gel bình thường, mực không phai theo thời gian, nhưng khi cần xóa, có thể sử dụng đầu tẩy có sẵn ở đuôi bút có thể dễ dàng tẩy xóa mà không để lại dấu vết, mực viết ra sẽ được làm trong suốt (tẩy mực hoàn toàn 100%).\r\nChữ viết trơn tru, mực được phân bố đều, đầu bi không dễ bị rò rỉ mực.\r\nLưu ý:\r\n- Không được dùng bút để viết, ký những giấy tờ pháp lý.\r\n- Thí sinh không nên sử dụng khi làm bài kiểm tra.', NULL, 7, 3),
(20, 'TÔI THẤY HOA VÀNG TRÊN CỎ XANH', 'toi-thay-hoa-vang-tren-co-xanh', 0, 125, 1, 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_04152018_031555.jpg', 123000, 'Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử , rồi chuyện đói ăn, cháy nhà, lụt lội,... Bối cảnh là trường học, nhà trong xóm, bãi tha ma. Dẫn chuyện là cậu bé 15 tuổi tên Thiều. Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận. Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi. Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung. Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.\nTác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người. Cuốn sách, vì thế, có sức ám ảnh.', 1, 1, 1),
(21, 'Thẻ Bài Ma Sói Character Việt Hóa', 'the-bai-ma-soi-character-viet-hoa', 35, 200, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936121470175_1.jpg', 112000, 'Trong một ngôi làng nhỏ, một ngày nọ bị tấn công bởi Ma Sói, loài sinh vật xảo quyệt chuyên đi hại người vào ban đêm và ngụy trang thành dân thường vào ban ngày. Trước tình hình đó, dân làng cùng hợp sức lại, thảo luận để tìm ra ai là Ma Sói đang trộn lẫn trước khi để thảm họa đi xa hơn vào những đêm về sau.\n\nMa Sói phiên bản đặc biệt Characters bao gồm 24 lá cơ bản và 16 nhân vật hoàn toàn mới cộng thêm các lá bài sự kiện! Các nhân vật như thiên sứ, chị em sinh đôi, kịch sĩ, sói trắng, sói trùm, ... hứa hẹn sẽ đem đến cho bạn một kinh nghiệm mới mẻ trong một game tưởng chừng như đã quen thuộc. Nào cùng khám phá Characters!\n\nGiới thiệu: Ma Sói là 1 boardgame rất thường được hay sử dụng trong các lớp học về tranh luận, biện hộ và đàm phán. Chính phủ Hà Lan đã cho phép áp dụng trò chơi này trong môn Logic.\n\nThể loại game: là game thuyết phục, ngôn ngữ cơ thể, teamwork. Ma Sói có nhiều phiên bản và nhiều lớp nhân vật, nhưng sẽ có 2 phiên bản chính: cơ bản (basic) và trăng non (newmoon). Ma sói sẽ được kết hợp giữa lời kể chuyện, âm thanh và ánh sáng khiến trò chơi trở nên huyền ảo và hấp dẫn tột cùng.\n\nBối cảnh game: Châu Âu vào thời trung cổ, có một chàng trai tên là Wilhelm đã đắc tội với một phù thủy nên ông đã bị nguyền rủa một lời nguyền khủng khiếp. Lời nguyền đó là…. “Người sẽ trở thành loài thú dữ vào đêm khuya, ngươi và con cháu ngươi sẽ luôn bị loài người săn đuổi”. Vào tối hôm đó Wilhelm và ba người con của mình đã biến thành sói và tàn sát toàn bộ người trong làng. Việc tàn sát tiếp tục diễn ra ở các ngôi làng lân cận, khi họ di chuyển tới Estonia thì họ bị bắt giữ và bị phán quyết án tử hình. Tuy nhiên một người con của Wihelm đã trốn thoát được và người con ấy thề sẽ trả thù loài người. Người con ấy tự xưng mình là Werewolf. Truyền thuyết về Werewolf ra đời…….\n\nLuật chơi\n\nGame Ma Sói Character gồm hai giai đoạn:\n\nGiai đoạn ban đêm: Mọi người nhắm mắt, Quản Trò gọi vai trò đặc biệt nào thì vai trò ấy mở mắt và thực hiện chức năng của mình trong yên lặng.\n\nGiai đoạn ban ngày: Quản trò ra hiệu mọi người mở mắt, thông báo những ai đã chết đêm qua. Sau đó, bình bầu treo cổ một người bị nghi ngờ là Ma Sói trong ban ngày (Có thể hoãn không treo). Nếu có 2 người cùng có số phiếu bầu treo như nhau thì không ai bị treo cả.\n\nCho tới bản game này thì các chức năng có phần nâng cao khá nhiều nhưng cách chơi vẫn mang tính chất cơ bản đó là sáng dậy thông báo người chết hoặc treo cổ chết băng cách lật bài lật bài, vì thế có 1 vài chức năng như: Hiệp sĩ và hầu gái. Bộ này kết hợp tuyệt vời với 2 bộ ma sói Miller phần 1 và ma sói New Moon phần 2 vì các chức năng hoàn thiện với nhau.\n\nCách chơi nhanh\n\nQuản trò sẽ thông báo ai chết (nếu có) và lấy lá bài nhân vật của người đó.\n\nMọi người có 3 phút suy luận + 5 giây chỉ định người bị tình nghi nhất.\n\n1 phút để người bị chỉ định biện hộ cho bản thân, trong thời gian này không ai được lên tiếng, nếu lên tiếng sẽ mất quyền biểu quyết cuối cùng.\n\n5 giây để tất cả dân làng ( trừ người bị chỉ định ) vote người bị tình nghi đó có bị treo cổ hay không.\n\nNếu người bị tình nghi chết thì sẽ bị lấy thẻ card. Nếu không chết thì tiếp tục chơi.', NULL, NULL, 4),
(22, 'Đồ Chơi Giáo Dục STEM Lắp Ráp Robot Chạy Bằng Năng Lượng Mặt Trời - Green Enegy 9501', 'do-choi-giao-duc-stem-lap-rap-robot-chay-bang-nang-luong-mat-troi-green-enegy-9501', 38, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936190511526.jpg', 217000, 'Đồ chơi giáo dục STEM sử dụng năng lượng mặt trời để hoạt động, vì thể bố mẹ sẽ không phải lo lắng mỗi lần Robot hết pin.\n\nBộ sản phẩm có thể tạo 7 robot khác nhau cho bé thỏa sức sáng tạo, không bị nhàm chán, giúp bé khám phá khoa học năng lượng mặt trời và năng lượng xanh.\n\nSản phẩm hoạt động tốt nhất dưới ánh nắng mặt trời, ngoài ra bố mẹ có thể sử dụng dưới bóng đèn halogen 50W vào những ngày mưa.\n\nSản phẩm gồm 4 vỉ chứa các chi tiết cần thiết và pin năng lượng mặt trời.\n\nBé có thể sử dụng cuốn sổ hướng dẫn để tạo ra những mô hình thú vị, kích thích thói quen tìm tòi, sáng tạo.', NULL, 8, 4),
(23, 'Siêu Bọ Máy - Gián Khổng Lồ - Điều Khiển Từ Xa 9916', 'sieu-bo-may-gian-khong-lo-dieu-khien-tu-xa-9916', 26, 298, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_220624.jpg', 265000, 'Là món đồ chơi điều khiển từ xa rất độc đáo và mới lạ, được mô phỏng từ loài gián sống động, đảm bảo chơi rất thú vị\n\nLà 1 món quà tuyệt vời cho bé gần gũi với thiên nhiên động vật, cũng có thể dùng làm đồ sưu tập, trang trí.\n\nHình thức mới, dễ dàng và an toàn để vận hành.\n\nTrọng lượng nhẹ và dễ dàng mang theo đến mọi nơi bạn muốn.\n\nChú gián di chuyển linh hoạt và nhanh nhẹn, giống hệt với gián thật\n\nSản phẩm bao gồm:\n\n1 con robot hình con Gián bằng nhựa PE đạt chuẩn an toàn\n1 điều khiển, có dùng pin (pin có kèm trong sản phẩm)\nCác chi tiết được sản xuất tỉ mỉ, độ chính xác cao.\n\nTem CR VIETCERT chứng nhận hợp quy tiêu chuẩn do cục Đo lường chất lượng cấp, chứng nhận đạt tiêu chuẩn xuất khẩu các nước.', NULL, 8, 4),
(24, 'Nam Châm Bi Từ Tính Neko - NCM5 (Size 5Mm Sắc Màu)', 'nam-cham-bi-tu-tinh-neko-ncm5-size-5mm-sac-mau', 36, 285, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936110984126.jpg', 284000, '1 hộp gồm nhiều viên bi. Lực hút cực mạnh.\n\nBao bì: Hộp thiếc 65x40 mm\n\nPhù hợp độ tuổi từ 13+\n\nKhả năng tùy biến gần như không giới hạn và người chơi có thể sắp xếp vô số hình thú theo ý thích của mình.thể sắp xếp vô số hình thú theo ý thích của mình.\n\nCác tính năng: có tính chất từ, có thể luôn thay đổi sự kết hợp của mô hình hình học, giải trí cao, sáng tạo. Bộ sưu tập sáng tạo, cảm hứng, tò mò, trí tuệ, thú vị, giải nén trong một. Tính thẩm mỹ, sự kết hợp giữa các viên bi sắt mạnh mẽ và có độ bóng tốt. \n\nCảnh báo: sản phẩm có chi tiết nhỏ, không phù hợp hợp cho trẻ dưới 3 tuổi', NULL, 8, 4),
(25, 'Đồ Chơi Giáo Dục STEM Lắp Ráp Xe Kỹ Thuật - Gao Bo Le KY1010-1 - Xe Cần Cẩu Và Xe Đua (139 Mảnh Ghép)', 'do-choi-giao-duc-stem-lap-rap-xe-ky-thuat-gao-bo-le-ky1010-1-xe-can-cau-va-xe-dua-139-manh-ghep', 49, 200, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936190511533.jpg', 141000, 'Đồ chơi giáo dục STEM lắp ráp xe kỹ thuật là bộ đồ chơi lắp ghép dành cho các bé trai thích mày mò, sáng tạo, được cải tiến với nhiều mẫu mã tỉ mỉ và bất ngờ\n\nĐồ chơi STEM là viết tắt của các từ Science (khoa học), Technology (công nghệ), Engineering (kỹ thuật) và Maths (toán học). Đòi hỏi bé phải vận dụng khéo léo các kĩ năng, tính toán phù hợp để lắp ghép thành công bộ đồ chơi này\n\nBên trong mỗi bộ là các miếng ghép bằng nhựa chắc chắn, có thể lắp ghép qua lại giữa 2 loại xe, từ đó bé có thể chơi nhiều cách khác nhau từ 1 bộ đồ chơi.\n\nĐặc biệt khi sưu tập đủ 4 bộ, bé có thể lắp ghép thành một chiếc xe tải to. Sự kết hợp độc đáo 2 trong 1 và 4 bộ thành 1, chắc chắn đây sẽ là món quà khiến mọi bé trai yêu thích\n\nSản phẩm có Tem CR chứng nhận hợp quy tiêu chuẩn, phù hợp với Quy chuẩn Kỹ thuật Quốc gia', NULL, 8, 4),
(26, 'Đồ Chơi Lắp Ráp Trứng Mô Hình Plant Vs Zombies PVZ-050158', 'do-choi-lap-rap-trung-mo-hinh-plant-vs-zombies-pvz-050158', 14, 34, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936190511267.jpg', 63200, '- Sản phẩm là đồ chơi được lấy cảm hứng từ dòng game nổi tiếng Plants vs Zombies\n\n- Bên trong mỗi quả trứng là các mảnh ghép bằng nhựa cao cấp, tăng cảm giác thú vị và bất ngờ khi tự tay bóc từng quả trứng.\n\n- Tạo hình đầu zombie trên quả trứng rất ngầu và nhân vật hoa quả bên trong có khả năng bắn đạn và tạo ra hoa mặt trời để tấn công zombies như phiên bản game thật\n\n- Ngoài ra, các phụ kiện tóc, mũ, thiết bị có thể trao đổi giữa các nhân vật zombies với nhau. Các bé hãy sưu tập trọn bộ 4 trứng để tạo thành đội quân zombies và plants hùng mạnh.\n\n- Mỗi sản phẩm có tem vàng chống hàng giả hàng nhái. Bố mẹ có thể yên tâm dành tặng cho bé yêu những đồ chơi chất lượng cao nhé!\n\nMã hàng	8936190511267\nĐộ Tuổi	3+\nTên Nhà Cung Cấp	CÔNG TY CỔ PHẦN THẾ GIỚI ĐỒ CHƠI MEGATOYS\nNăm XB	2022\nThương Hiệu	OEM\nXuất Xứ Thương Hiệu	Trung Quốc\nNơi Gia Công &amp; Sản Xuất	Trung Quốc\nMàu sắc	Nhiều màu\nChất liệu	Nhựa\nThông Số Kỹ Thuật	Không Dùng Pin\nThông Tin Cảnh Báo	Sản phẩm có chi tiết nhỏ, không thích hợp cho trẻ dưới 3 tuổi.\nHướng Dẫn Sử Dụng	Xem hướng dẫn sử dụng chi tiết đính kèm.\nTrọng lượng (gr)	45\nKích Thước Bao Bì	9.5 x 6 x 6 cm\nSản phẩm bán chạy nhất	Top 100 sản phẩm Đồ Chơi Lắp Ráp bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nĐồ Chơi Lắp Ráp Trứng Mô Hình Plant Vs Zombies PVZ-050158\n\n- Sản phẩm là đồ chơi được lấy cảm hứng từ dòng game nổi tiếng Plants vs Zombies\n\n- Bên trong mỗi quả trứng là các mảnh ghép bằng nhựa cao cấp, tăng cảm giác thú vị và bất ngờ khi tự tay bóc từng quả trứng.\n\n- Tạo hình đầu zombie trên quả trứng rất ngầu và nhân vật hoa quả bên trong có khả năng bắn đạn và tạo ra hoa mặt trời để tấn công zombies như phiên bản game thật\n\n- Ngoài ra, các phụ kiện tóc, mũ, thiết bị có thể trao đổi giữa các nhân vật zombies với nhau. Các bé hãy sưu tập trọn bộ 4 trứng để tạo thành đội quân zombies và plants hùng mạnh.\n\n- Mỗi sản phẩm có tem vàng chống hàng giả hàng nhái. Bố mẹ có thể yên tâm dành tặng cho bé yêu những đồ chơi chất lượng cao nhé!', NULL, 8, 4),
(27, 'Đồ Chơi Mô Hình Gián Máy Di Chuyển Bằng Rung Động 9902A', 'do-choi-mo-hinh-gian-may-di-chuyen-bang-rung-dong-9902a', 28, 123, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_733.jpg', 113000, 'Đồ chơi được làm bằng vật liệu an toàn cho trẻ em và được trang bị ABS.\n\nThiết kế hình trơn tru và các cạnh không có gờ bảo vệ em bé của bạn khỏi trầy xước.\n\nCó một thiết bị cảm biến được tích hợp bên trong chú gián, miễn là nó cảm nhận được một chướng ngại vật phía trước, chú gián sẽ tự động quay ra.\n\nĐồ chơi cảm ứng này được tạo hình từ một chú gián có thể thu hút sự chú ý và hứng thú của con bạn để chơi và đạt được rất nhiều niềm vui từ nó ..\n\nMã hàng	8936190511205\nĐộ Tuổi	3+\nTên Nhà Cung Cấp	CÔNG TY CỔ PHẦN THẾ GIỚI ĐỒ CHƠI MEGATOYS\nThương Hiệu	ZF\nXuất Xứ Thương Hiệu	Trung Quốc\nNơi Gia Công &amp; Sản Xuất	Trung Quốc\nMàu sắc	Nâu\nChất liệu	Nhựa\nThông Số Kỹ Thuật	Có Dùng Pin, Pin Không Kèm Trong Sản Phẩm\nThông Tin Cảnh Báo	Sản phẩm có chi tiết nhỏ, không thích hợp cho trẻ dưới 3 tuổi.\nHướng Dẫn Sử Dụng	Chơi và vận động.\nTrọng lượng (gr)	200\nKích Thước Bao Bì	15 x 10 x 10 cm\nSản phẩm bán chạy nhất	Top 100 sản phẩm Mô Hình Động Vật bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nĐồ Chơi Mô Hình Gián Máy Di Chuyển Bằng Rung Động 9902A\n\nĐồ chơi được làm bằng vật liệu an toàn cho trẻ em và được trang bị ABS.\n\nThiết kế hình trơn tru và các cạnh không có gờ bảo vệ em bé của bạn khỏi trầy xước.\n\nCó một thiết bị cảm biến được tích hợp bên trong chú gián, miễn là nó cảm nhận được một chướng ngại vật phía trước, chú gián sẽ tự động quay ra.\n\nĐồ chơi cảm ứng này được tạo hình từ một chú gián có thể thu hút sự chú ý và hứng thú của con bạn để chơi và đạt được rất nhiều niềm vui từ nó ..', NULL, 8, 4),
(28, 'Đồ Chơi Mô Hình Nhện Máy Di Chuyển Bằng Rung Động 9902B', 'do-choi-mo-hinh-nhen-may-di-chuyen-bang-rung-dong-9902b', 0, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_734.jpg', 113000, 'Đồ chơi được làm bằng vật liệu an toàn cho trẻ em và được trang bị ABS.\n\nThiết kế hình trơn tru và các cạnh không có gờ bảo vệ em bé của bạn khỏi trầy xước.\n\nCó một thiết bị cảm biến được tích hợp bên trong chú nhện, miễn là nó cảm nhận được một chướng ngại vật phía trước, chú nhện sẽ tự động quay ra.\n\nĐồ chơi cảm ứng này được tạo hình từ một chú nhện có thể thu hút sự chú ý và hứng thú của con bạn để chơi và đạt được rất nhiều niềm vui từ nó ..\n\nMã hàng	8936190511212\nĐộ Tuổi	3+\nTên Nhà Cung Cấp	CÔNG TY CỔ PHẦN THẾ GIỚI ĐỒ CHƠI MEGATOYS\nThương Hiệu	ZF\nXuất Xứ Thương Hiệu	Trung Quốc\nNơi Gia Công &amp; Sản Xuất	Trung Quốc\nMàu sắc	Nâu\nChất liệu	Nhựa\nThông Số Kỹ Thuật	Có Dùng Pin, Pin Không Kèm Trong Sản Phẩm\nThông Tin Cảnh Báo	Sản phẩm có chi tiết nhỏ, không thích hợp cho trẻ dưới 3 tuổi.\nHướng Dẫn Sử Dụng	Chơi và vận động.\nTrọng lượng (gr)	200\nKích Thước Bao Bì	15 x 10 x 10 cm\nSản phẩm bán chạy nhất	Top 100 sản phẩm Mô Hình Động Vật bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nĐồ Chơi Mô Hình Nhện Máy Di Chuyển Bằng Rung Động 9902B\n\nĐồ chơi được làm bằng vật liệu an toàn cho trẻ em và được trang bị ABS.\n\nThiết kế hình trơn tru và các cạnh không có gờ bảo vệ em bé của bạn khỏi trầy xước.\n\nCó một thiết bị cảm biến được tích hợp bên trong chú nhện, miễn là nó cảm nhận được một chướng ngại vật phía trước, chú nhện sẽ tự động quay ra.\n\nĐồ chơi cảm ứng này được tạo hình từ một chú nhện có thể thu hút sự chú ý và hứng thú của con bạn để chơi và đạt được rất nhiều niềm vui từ nó ..', NULL, 8, 4),
(29, 'Complete IELTS B1 Student&#039;s Book with answer with CD-ROM', 'complete-ielts-b1-student-039-s-book-with-answer-with-cd-rom', 0, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_22277.jpg', 251100, 'Complete IELTS combines the very best in contemporary classroom practice with stimulating topics aimed at young adults wanting to study at university. The Student&#039;s Pack is ideal for self-study. It consists of the Student&#039;s Book with Answers with CD-ROM *The Audio CDs (is not included in Student&#039;s Book) which contain all the material for the listening activities. The Student&#039;s Book with Answers contains 8 topic-based units with stimulating activities to ensure that students gain skills practice for each of the four papers of the IELTS exam. It also contains a complete IELTS practice test to allow students to familiarise themselves with the format of the exam. The CD-ROM contains additional skills, grammar, vocabulary and listening exercises.\n\nMã hàng	9781107665774\nTên Nhà Cung Cấp	Cambridge University Press\nTác giả	Mark Harrison\nNXB	Cambridge\nNăm XB	2012\nTrọng lượng (gr)	650\nKích Thước Bao Bì	22x31\nSố trang	198\nHình thức	Bìa Mềm\nSản phẩm hiển thị trong	\nBest Sellers\nCambridge University Press\nCambridge Exams - IELTS\nCambridge TOEIC- TOEFL- IELTS- DICTIONARIES\nEnglish Exams - IELTS\nSản phẩm bán chạy nhất	Top 100 sản phẩm ELT Examination Practice Tests bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nKÈM CD ROM - KHÔNG KÈM CD NGHE\n\nComplete IELTS combines the very best in contemporary classroom practice with stimulating topics aimed at young adults wanting to study at university. The Student&#039;s Pack is ideal for self-study. It consists of the Student&#039;s Book with Answers with CD-ROM *The Audio CDs (is not included in Student&#039;s Book) which contain all the material for the listening activities. The Student&#039;s Book with Answers contains 8 topic-based units with stimulating activities to ensure that students gain skills practice for each of the four papers of the IELTS exam. It also contains a complete IELTS practice test to allow students to familiarise themselves with the format of the exam. The CD-ROM contains additional skills, grammar, vocabulary and listening exercises.', 13, 6, 2),
(30, 'Complete IELTS Bands 6.5-7.5 (C1) SB with Answer &amp; CD-ROM', 'complete-ielts-bands-6-5-7-5-c1-sb-with-answer-amp-cd-rom', 10, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/c/o/complete_ielts_bands_65_75_c1_sb_with_answer_cd_rom_1_2018_08_23_14_31_32.jpg', 251100, 'Complete IELTS Bands 6.5-7.5 (C1) SB with Answer &amp; CD-ROM', 13, 6, 2),
(31, 'Complete IELTS B2 Student&#039;s Book with answer &amp; CD-Rom', 'complete-ielts-b2-student-039-s-book-with-answer-amp-cd-rom', 0, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_22278.jpg', 251000, 'Sách Không kèm Đĩa\n\nComplete IELTS combines the very best in contemporary classroom practice with stimulating topics aimed at young adults wanting to study at university. The Student&#039;s Pack is ideal for self-study. It consists of the Student&#039;s Book with Answers with CD-ROM * The Class Audio CDs ( is not included in Student&#039;s Book) which contain all the material for the listening activities. The Student&#039;s Book with Answers contains 8 topic-based units with stimulating activities to ensure that students gain skills practice for each of the four papers of the IELTS exam. It also contains a complete IELTS practice test to allow students to familiarise themselves with the format of the exam. The CD-ROM contains additional skills, grammar, vocabulary and listening exercises.\n\nMã hàng	9781107695962\nTên Nhà Cung Cấp	Cambridge University Press\nTác giả	Mark Harrison\nNXB	Cambridge\nNăm XB	2012\nTrọng lượng (gr)	700\nKích Thước Bao Bì	22x31\nSố trang	166\nHình thức	Bìa Mềm\nSản phẩm hiển thị trong	\nBest Sellers\nCambridge University Press\nCambridge Exams - IELTS\nCambridge TOEIC- TOEFL- IELTS- DICTIONARIES\nEnglish Exams - IELTS\nSản phẩm bán chạy nhất	Top 100 sản phẩm ELT Examination Practice Tests bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nSách Không kèm Đĩa\n\nComplete IELTS combines the very best in contemporary classroom practice with stimulating topics aimed at young adults wanting to study at university. The Student&#039;s Pack is ideal for self-study. It consists of the Student&#039;s Book with Answers with CD-ROM * The Class Audio CDs ( is not included in Student&#039;s Book) which contain all the material for the listening activities. The Student&#039;s Book with Answers contains 8 topic-based units with stimulating activities to ensure that students gain skills practice for each of the four papers of the IELTS exam. It also contains a complete IELTS practice test to allow students to familiarise themselves with the format of the exam. The CD-ROM contains additional skills, grammar, vocabulary and listening exercises.', 13, 6, 2),
(32, 'Oxford Advanced Learner&#039;s Dictionary: Paperback - 10th Edition (With 1 Year&#039;s Access To Both Premium Online And App)', 'oxford-advanced-learner-039-s-dictionary-paperback-10th-edition-with-1-year-039-s-access-to-both-premium-online-and-app', 0, 140, 1, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9780194798488-dd.jpg', 476100, 'Oxford Advanced Learner&#039;s Dictionary: Paperback - 10th Edition\n\nThe Oxford Advanced Learner&#039;s Dictionary is the world&#039;s bestselling advanced level dictionary for learners of English.\n\nNow in its 10th edition, the Oxford Advanced Learner&#039;s Dictionary, or OALD, is your complete guide to learning English vocabulary with definitions that learners can understand, example sentences showing language in use, and the new Oxford 3000 (TM) and Oxford 5000 (TM) word lists providing core vocabulary that every student needs to learn.\n\nOALD is more than a dictionary. Take your English skills to the next level with extra resources and practice including the online iSpeaker and iWriter, or practise words anytime, anywhere with the Oxford Advanced Learner&#039;s Dictionary app.\n\nMã hàng	9780194798488\nTên Nhà Cung Cấp	Oxford University Press\nTác giả	Diana Lea, Jennifer Bradbery\nNXB	Oxford University Press\nNăm XB	2020\nNgôn Ngữ	Tiếng Anh\nTrọng lượng (gr)	1540\nKích Thước Bao Bì	15.4 x 5.2 x 23.5 cm\nHình thức	Bìa Mềm\nSản phẩm hiển thị trong	\nOxford University Press\nBACK TO SCHOOL\nSản phẩm bán chạy nhất	Top 100 sản phẩm Dictionaries bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nOxford Advanced Learner&#039;s Dictionary: Paperback - 10th Edition\n\nThe Oxford Advanced Learner&#039;s Dictionary is the world&#039;s bestselling advanced level dictionary for learners of English.\n\nNow in its 10th edition, the Oxford Advanced Learner&#039;s Dictionary, or OALD, is your complete guide to learning English vocabulary with definitions that learners can understand, example sentences showing language in use, and the new Oxford 3000 (TM) and Oxford 5000 (TM) word lists providing core vocabulary that every student needs to learn.\n\nOALD is more than a dictionary. Take your English skills to the next level with extra resources and practice including the online iSpeaker and iWriter, or practise words anytime, anywhere with the Oxford Advanced Learner&#039;s Dictionary app.', NULL, 6, 2),
(33, 'Sổ Lò Xo Teen Kẻ Ô Vuông 80gsm - My Best Friend - The Sun 01 - Màu Vàng', 'so-lo-xo-teen-ke-o-vuong-80gsm-my-best-friend-the-sun-01-mau-vang', 20, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8934986009080-mau2.jpg', 24700, '- Sổ có thiết kế đơn giản nhưng tinh tế với hình ảnh bìa dễ thương.\n\n- Kích thước sổ nhỏ gọn, 17 x 11 cm, dễ dàng mang theo sử dụng mọi lúc mọi nơi.\n\n- Sản phẩm có dạng gáy lò xo, không chỉ giúp phần ruột giấy được giữ cố định, chắc chắn, bạn còn có thể xé phần giấy bên trong một cách nhanh chóng mà không sợ làm hư sổ.\n\n- Với thiết kế kiểu gáy lò xo này, việc lật mở sổ cũng sẽ dễ dàng hơn.\n\n- Loại bìa: Bìa Bồi Carton cứng, giúp bảo vệ bìa sổ không bị gãy hay cong vênh trong quá trình sử dụng.\n\n- Chất liệu: Giấy Ford 80gsm dày dặn, láng mịn, chống thấm cao, độ bám chữ tốt.\n\nMã hàng	8934986009080-mau2\nTên Nhà Cung Cấp	Fahasa Print\nThương Hiệu	The Sun\nXuất Xứ Thương Hiệu	Việt Nam\nNơi Gia Công &amp; Sản Xuất	Việt Nam\nMàu sắc	Vàng\nChất liệu	Giấy\nTrọng lượng (gr)	174\nKích Thước Bao Bì	17 x 11 x 1.7 cm\nSản phẩm bán chạy nhất	Top 100 sản phẩm Sổ Các Loại bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nSổ Lò Xo Teen Kẻ Ô Vuông 80gsm - My Best Friend - The Sun 01\n\n- Sổ có thiết kế đơn giản nhưng tinh tế với hình ảnh bìa dễ thương.\n\n- Kích thước sổ nhỏ gọn, 17 x 11 cm, dễ dàng mang theo sử dụng mọi lúc mọi nơi.\n\n- Sản phẩm có dạng gáy lò xo, không chỉ giúp phần ruột giấy được giữ cố định, chắc chắn, bạn còn có thể xé phần giấy bên trong một cách nhanh chóng mà không sợ làm hư sổ.\n\n- Với thiết kế kiểu gáy lò xo này, việc lật mở sổ cũng sẽ dễ dàng hơn.\n\n- Loại bìa: Bìa Bồi Carton cứng, giúp bảo vệ bìa sổ không bị gãy hay cong vênh trong quá trình sử dụng.\n\n- Chất liệu: Giấy Ford 80gsm dày dặn, láng mịn, chống thấm cao, độ bám chữ tốt.', NULL, NULL, 3),
(34, 'Bút Bi 3 Ngòi 3 Màu Thân Vàng Gold + Thân Xanh Dương - Zebra ZX3C B3AZ15-GO', 'but-bi-3-ngoi-3-mau-than-vang-gold-than-xanh-duong-zebra-zx3c-b3az15-go', 10, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/4/9/4901681584598_2.jpg', 154850, 'Bút Bi 3 Ngòi 3 Màu Thân Vàng Gold + Thân Xanh Dương - Zebra ZX3C B3AZ15-GO có kiểu dáng hiện đại, vừa tay cầm, tạo sự thoải mái cho người sử dụng. Ngòi bút êm ái, mực ra đều không bị nhòe, cho chữ viết sắc nét và đẹp như mong muốn. Mực gel cao cấp, mau khô, không đóng cặn, không độc hại, an toàn cho sức khỏe.\n\nBút có 3 ngòi 3 màu: Đen, Đỏ, Xanh Dương\n\nNgòi bút 0.7mm sản xuất theo công nghệ tiên tiến của Nhật nên viết êm, mực chảy đều, nét viết mềm mại\n\nCác phân tử màu không hòa tan trong nước nên mực kháng nước và bền mầu. Mực ra đều, đậm, nhanh khô và không bị lem.\n\nPhần đệm tay được bao bọc bởi cao sụ mềm tạo cảo giác êm ái và không gây mỏi tay khi viết lâu.\n\nBút có thiết kế đẹp mắt, họa tiết xinh xắn phù hợp với nhiều đối tượng khác nhau.\n\nMã hàng	4901681584598\nTên Nhà Cung Cấp	Cty Mai Son\nThương Hiệu	Zebra\nXuất Xứ Thương Hiệu	Thương Hiệu Nhật\nNơi Gia Công &amp; Sản Xuất	Trung Quốc\nMàu sắc	3 Màu\nMàu Mực	3 Màu\nChất liệu	Nhựa\nTrọng lượng (gr)	80\nKích Thước Bao Bì	19 x 6 x 1 cm\nSản phẩm bán chạy nhất	Top 100 sản phẩm Bút Bi bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nBút Bi 3 Ngòi 3 Màu Thân Vàng Gold + Thân Xanh Dương - Zebra ZX3C B3AZ15-GO có kiểu dáng hiện đại, vừa tay cầm, tạo sự thoải mái cho người sử dụng. Ngòi bút êm ái, mực ra đều không bị nhòe, cho chữ viết sắc nét và đẹp như mong muốn. Mực gel cao cấp, mau khô, không đóng cặn, không độc hại, an toàn cho sức khỏe.\n\nBút có 3 ngòi 3 màu: Đen, Đỏ, Xanh Dương\n\nNgòi bút 0.7mm sản xuất theo công nghệ tiên tiến của Nhật nên viết êm, mực chảy đều, nét viết mềm mại\n\nCác phân tử màu không hòa tan trong nước nên mực kháng nước và bền mầu. Mực ra đều, đậm, nhanh khô và không bị lem.\n\nPhần đệm tay được bao bọc bởi cao sụ mềm tạo cảo giác êm ái và không gây mỏi tay khi viết lâu.\n\nBút có thiết kế đẹp mắt, họa tiết xinh xắn phù hợp với nhiều đối tượng khác nhau.', NULL, NULL, 3),
(35, 'Combo Máy Tính CASIO FX-880BTG - Màu Đen + Cẩm Nang Sử Dụng Máy Tính Khoa Học Casio FX-880BTG Thế Hệ Mới Lớp 6-12', 'combo-may-tinh-casio-fx-880btg-mau-den-cam-nang-su-dung-may-tinh-khoa-hoc-casio-fx-880btg-the-he-moi-lop-6-12', 120, 300, 1, 'https://cdn0.fahasa.com/media/catalog/product/z/3/z3893179089319_f90e6b6b418002e02bf43f0c291096e2.jpg', 821500, '1. Máy Tính CASIO FX-880BTG\n\nMáy tính Casio fx-880BTG thuộc dòng máy tính khoa học ClassWiz của hãng máy tính CASIO. Máy tính Casio fx-880BTG đã ra đời với nhiều cải tiến về: thiết kế - giao diện, tính năng nổi trội và độ chính xác cao… để đáp ứng thực tiễn dạy và học tại Việt Nam, đồng thời thay đổi tư duy học tập lâu nay của học sinh.\n\nTính năng nổi bật:\n\n- QR Code hỗ trợ dạy và học\n\n- Bảng tính spreadsheet\n\n- Hộp toán học Math Box\n\n- Bảng tuần hoàn\n\n- Kiểm chứng\n\n- Gian diện mới với thao tác đơn giản hơn\n\n- Kết quả tính toán chính xác lên đến 23 chữ số\n\nTính năng cơ bản:\n\n- Kiểm tra số nguyên tố có 4 chữ số\n\n- Lưu phần thương và phần dư trong phép chia\n\n- Tính năng kiểm tra đúng/sai\n\n- Thông báo vô nghiệm khi giải phương trình bậc hai\n\n- Cực trị của hàm số bậc ba\n\n- Giải phương trình 4 ẩn\n\n- Giải phương trình bậc 4\n\n- Giải bất phương trình bậc 4\n\nLưu ý: Được phép mang vào phòng thi từ thời gian tháng 8 năm 2022\n\n2. Cẩm Nang Sử Dụng Máy Tính Khoa Học Casio FX-880BTG Thế Hệ Mới Lớp 6-12\n\nQuý thầy cô giáo, quý phụ huynh và các em học sinh thân mến!\n\nBắt đầu từ năm 2021, chương trình Giáo dục phổ thông 2018 áp dụng cho lớp 6 và vào năm 2022 áp dụng cho lớp 10. Sự đổi mới này ban đầu gây ra rất nhiều lúng túng cho các nhà quản lý giáp dục, phụ huynh và toàn xã hội. Các hoạt động trải nhiệm thực tế, các chuyên đề trong chương trình là những nét rất mới và không kế thừa được các kinh nghiejm có sẵn vì đây là lần đầu tiên thực hiện chương trình này.\n\nQuyển sách Cẩm nang sử dụng máy tính khoa học Casio Fx-880BTG thế hệ mới Lớp 6-12 là tâm huyest của Ban lãnh đạo Công ty Bitex cùng Tiến sĩ Nguyễn Thái Sơn - Trưởng bộ phận nghiên cứu và Ứng dụng - Phòng phát triển Giáo dục - BITEX, nguyên trưởng khoa Toán Tin học - Đại học Sư Phạm thành phố Hồ Chí Minh ( 2000-2009), Nguyên Giám đốc - tổng biên tập nhà xuất bản ĐHSP Thành phố Hồ Chí Minh (2009-2011).\n\nMã hàng	combo-4549526613692-9786043670530\nTên Nhà Cung Cấp	Bình Tây\nThương Hiệu	Casio\nXuất Xứ Thương Hiệu	Thương Hiệu Nhật\nNơi Gia Công &amp; Sản Xuất	Thái Lan\nMàu sắc	Đen\nChất liệu	Nhựa, Giấy\nSố Lượng/ Bộ	2\nKích Thước Bao Bì	30 x 25 x 3 cm\nSản phẩm bán chạy nhất	Top 100 sản phẩm Máy tính điện tử bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...', NULL, NULL, 3),
(36, 'Combo Máy Tính CASIO FX-880BTG - Màu Hồng + Cẩm Nang Sử Dụng Máy Tính Khoa Học Casio FX-880BTG Thế Hệ Mới Lớp 6-12', 'combo-may-tinh-casio-fx-880btg-mau-hong-cam-nang-su-dung-may-tinh-khoa-hoc-casio-fx-880btg-the-he-moi-lop-6-12', 100, 300, 1, 'https://cdn0.fahasa.com/media/catalog/product/z/3/z3893179089096_66b6f5adda84c6f9bdc26be26812c4a9.jpg', 821500, '', NULL, NULL, 3),
(37, 'Quạt Kẹp Bàn 2908 - Màu Vàng', 'quat-kep-ban-2908-mau-vang', 0, 150, 1, 'https://cdn0.fahasa.com/media/catalog/product/3/e/3e012e1d3d1ec6409f0f.jpg', 167000, 'Quạt có thiết kế nhỏ gọn, thuận tiện mang theo người.\n\nPin dùng liên tục nhiều giờ, có thể sạc lại để dùng tiếp.\n\nQuạt cực mát, giúp bạn tránh được cái nóng giữa trưa hoặc những ngày cúp điện.', NULL, NULL, 5),
(38, 'Quạt Mini Cầm Tay 8816B', 'quat-mini-cam-tay-8816b', 0, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/6/9/6920100845773-_6_.jpg', 72000, 'Quạt có thiết kế nhỏ gọn, thuận tiện mang theo người\n\nPin dùng liên tục nhiều giờ, có thể sạc lại để dùng tiếp\n\nKhông chỉ cầm tay, quạt còn có thể gấp lại để trên bàn\n\nQuạt cực mát, giúp bạn tránh được cái nóng giữa trưa hoặc những ngày cúp điện', NULL, NULL, 5),
(39, 'Bình Nước 750 ml Eco Bottle Fancy - Tupperware - Mẫu 4', 'binh-nuoc-750-ml-eco-bottle-fancy-tupperware-mau-4', 0, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/3/9/3900000055840-mau4.jpg', 285000, 'Thông tin sản phẩm:\n\nDung tích: 750ml\n\nKhả năng chịu nhiệt: 0 ~ 80 ͦC\n\nƯu điểm và tiện ích:\n\n- Chất liệu nhựa PP nguyên sinh, an toàn cho sức khỏe.\n\n- Thân bình in họa tiết cá tính, nổi bật\n\n- Nắp bật tiện lợi khi uống trực tiếp.\n\n- Nắp kín hạn chế rỉ nước ra ngoài khi mang đi.\n\n- Nắp kín khí giữ trọn hương vị trái cây.\n\n- Kích thước vừa vặn, phù hợp với hầu hết cánh cửa tủ lạnh, hộc trên xe hơi, xe gắn máy, túi xách, balo...\n\n- Độ bền cao, có thể tái sử dụng giúp bảo vệ môi trường.\n\nCông dụng:\n\nDùng để đựng nước hoặc các loại nước, nước trái cây, sữa, sinh tố và mang ra ngoài (đến trường, sinh hoạt ngoại khóa...)\n\nCách bảo quản:\n\n- Dùng an toàn trong máy rửa chén (dưới 65⁰C)\n\n- Không tiếp xúc hoặc để gần nguồn lửa để tránh nóng chảy, biến dạng.\n\n- Không chùi rửa bằng dụng cụ sắc nhọn hoặc đặt sản phẩm trong ngăn đông tủ lạnh.\n\n- Không sử dụng trong lò vi sóng, máy hấp tiệt trùng.\n\n- Tránh đựng các thức uống có gas vì sự giãn nở của khí sẽ làm nắp bình bị bật lên, khiến đồ uống tràn ra ngoài.', NULL, NULL, 5),
(40, 'Hình Thần Tài Dán Cửa Trang Trí Tết', 'hinh-than-tai-dan-cua-trang-tri-tet', 0, 50, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935330110001.jpg', 44500, 'Tết đến, ngoài nhưng câu chúc sức khoẻ và bình an, mọi người đều mong muốn thêm nhiều tài lộc. Ông Thần tài là biểu tượng cho sự may mắn về tài lộc và mua may bán đắt.\n\nDán hình ảnh Ông thần tài lên cửa, tường nhà mình trong ngày tết có ý nghĩa cầu mong mọi điều may mắn về việc buôn bán, làm ăn sẽ đến với gia đình trong một năm mới tới.', NULL, NULL, 5),
(41, 'Mô Hình Thần Tài Mini Trang Trí Tết', 'mo-hinh-than-tai-mini-trang-tri-tet', 0, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/3/9/3900000108188.jpg', 30875, 'Sản phẩm là một món đồ trang trí Tết đẹp mắt, ấn tượng giúp cho nhà bạn sinh động và nổi trội hơn trong dịp năm mới đến.\n\nSản phẩm là một mô hình Thần Tài mini mang không khí tưng bừng, rộn ràng của mùa lễ hội đầu năm đến gia đình bạn.\n\nSản phẩm có màu sắc vô cùng bắt mắt, được làm với những chất liệu tốt, không độc hại, an toàn cho người sử dụng.\n\nSản phẩm thiết kế đơn giản, đẹp, dễ thương, đúng tông màu năm mới nhưng khá vui tươi, trẻ trung, phù hợp với mọi khung cảnh.', NULL, NULL, 5),
(42, 'Đồng Hồ Reo - Zhong Yi Xuan SA123MX - Màu Đen', 'dong-ho-reo-zhong-yi-xuan-sa123mx-mau-den', 0, 50, 1, 'https://cdn0.fahasa.com/media/catalog/product/6/9/6921191713552-mau2.jpg', 222250, 'Sản phẩm thiết kế mang phong cách đơn giản.\n\nSản phẩm trang bị hệ thống linh kiện nhanh nhạy, có độ chính xác cao. Hệ thống vận hành bằng pin, không gây tiếng ồn khó chịu.\n\nChân đế bằng kim loại chắc chắn, chống gỉ sét. Độ cân bằng và ổn định tốt giúp đồng hồ đứng vững vàng trên các mặt phẳng, không bị chông chênh, rung lắc.\n\nSản phẩm phù hợp với nhiều không gian khác nhau từ phòng khách, phòng ngủ, phòng làm việc, khách sạn đến những quán cà phê cổ điện, góp phần tô điểm cho không gian của bạn thêm phần nổi bật và thu hút.', NULL, NULL, 5),
(43, 'Đồng Hồ Reo 2 Chuông - Zhong Yi Xuan SA011EQ - Màu Hồng', 'dong-ho-reo-2-chuong-zhong-yi-xuan-sa011eq-mau-hong', 0, 50, 1, 'https://cdn0.fahasa.com/media/catalog/product/6/9/6921191713224_1.jpg', 229900, 'Sản phẩm thiết kế mang phong cách đơn giản. Mặt đồng hồ in hình các loại trái cây dễ thương.\n\nSản phẩm trang bị hệ thống linh kiện nhanh nhạy, có độ chính xác cao. Hệ thống vận hành bằng pin, không gây tiếng ồn khó chịu.\n\nChân đế bằng kim loại chắc chắn, chống gỉ sét. Độ cân bằng và ổn định tốt giúp đồng hồ đứng vững vàng trên các mặt phẳng, không bị chông chênh, rung lắc.\n\nSản phẩm phù hợp với nhiều không gian khác nhau từ phòng khách, phòng ngủ, phòng làm việc, khách sạn đến những quán cà phê cổ điện, góp phần tô điểm cho không gian của bạn thêm phần nổi bật và thu hút.', NULL, NULL, 5),
(44, 'Đèn LED Chống Cận Taotronics 12W TT-DL27 - Màu Đen', 'den-led-chong-can-taotronics-12w-tt-dl27-mau-den', 0, 50, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_233039.jpg', 1216000, 'Đèn bàn LED TaoTronics TT-DL27 có thể điều chỉnh với đầu đèn xoay trái và phải 270 ° hoặc xoay gần 180 °, cổ và cánh tay đèn có thể xoay 125 ° và 90 ° đảm bảo bạn luôn có được góc đọc hoàn hảo bất cứ nơi nào bạn ngồi .\n\nKhông giống như đèn bàn truyền thống đặt tất cả các đèn LED ở trung tâm có thể làm hỏng mắt của bạn, đèn bàn thông minh TaoTronics TT-DL27 phân phối chúng ở những vị trí khác nhau. Bằng cách xếp các đèn LED dọc theo mép đầu đèn, ánh sáng sẽ nhẹ hơn và có thể bảo vệ đôi mắt của bạn. Với thiết kế thân thiện với mắt hơn, bạn có thể sử dụng Đèn chống cận Taotronics TT-DL27 lâu hơn mà không cần lo lắng.\n\nTận hưởng bốn loại chế độ ánh sáng khác nhau bao gồm ngủ, thư giãn, đọc sách và học tập. Đối với mỗi hoạt động, đèn có đèn được tối ưu hóa phù hợp nhất với bạn. Nếu bạn thường xuyên ngủ quên khi đọ sách thì đây là mẫu đèn ngủ lý tưởng cho bạn. Hãy giữ nút nguồn cho đến khi các biểu tượng chế độ nhấp nháy để kích hoạt bộ hẹn giờ 1 giờ, sau một giờ, đèn sẽ tắt ,\n\nTrong khi các loại đèn bàn khác thiếu chắc chắn và thậm chí có thể vỡ khi đụng mạnh vào, đèn bàn TaoTronics có thiết kế chắc chắn hơn để đảm bảo tuổi thọ dài hơn. Đèn bàn LED TaoTronics TT-DL27 được chế tạo bằng kim loại để đảm bảo rằng chiếc đèn không bao giờ bị vỡ. Hơn thế nữa việc đèn có 1 chiếc đế chắc chắn giúp đèn không bị lật đổ và gây ra bất kỳ hư hỏng nào.\n\nBạn có thể dễ dàng sạc chiếc &amp;quot;dế yêu&amp;quot; của bạn với 1 cổng USB 5V/1A được tích hợp ngay trên thân đèn. Bạn có thể sạc điện thoại qua đêm mà không lo cháy nổ hay hỏng hóc.', NULL, NULL, 5),
(45, 'Ly Sứ Có Nắp Kèm Thìa Hình Khủng Long - Sunpio SP2021 - Màu Xanh Dương', 'ly-su-co-nap-kem-thia-hinh-khung-long-sunpio-sp2021-mau-xanh-duong', 0, 50, 1, 'https://cdn0.fahasa.com/media/catalog/product/1/8/1880000955680-mau2.jpg', 118750, 'Sản phẩm được làm từ chất liệu gốm sứ cao cấp bền, cứng, không bong tróc, không bị rạn nứt trong quá trình sử dụng.\n\nNắp ly sứ vừa giúp giữ được nhiệt độ của nước tốt hơn, tránh được bụi bẩn vừa có khe để muỗng tiện lợi.\n\nMuỗng được làm bằng thép không gỉ giúp bạn dễ dàng pha trà, sữa hay các loại thức uống khác\n\nSản phẩm có màu sắc đơn giản, đẹp mắt, bạn có thể dùng ly sứ làm vật dụng trang trí cho tủ kệ của bạn, hoặc tặng bạn bè người thân trong những dịp quan trọng.', NULL, NULL, 5),
(46, 'Atlat Địa Lí Việt Nam - 2022', 'atlat-dia-li-viet-nam-2022', 200, 300, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_6058_1_1_1_1.jpg', 29450, '', NULL, 3, 1),
(47, 'Sách Giáo Khoa Bộ Lớp 5 - Sách Bài Học (Bộ 9 Cuốn) (2023)', 'sach-giao-khoa-bo-lop-5-sach-bai-hoc-bo-9-cuon-2023', 30, 400, 1, 'https://cdn0.fahasa.com/media/catalog/product/3/3/3300000015651-1_1.jpg', 89000, '', NULL, 3, 1),
(48, 'Sách Giáo Khoa Bộ Lớp 5 - Sách Bài Tập (Bộ 11 Cuốn) (2023)', 'sach-giao-khoa-bo-lop-5-sach-bai-tap-bo-11-cuon-2023', 30, 200, 1, 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-sgk2020-5-11_1.jpg', 99600, '', NULL, 3, 1),
(49, 'GIÁO TRÌNH GIẢI TÍCH 2', 'giao-trinh-giai-tich-2', 0, 100, 1, 'https://www.lib.hcmut.edu.vn/uploads/noidung/giao-trinh-giai-tich-2-0-367.jpg', 60000, 'MỤC LỤC\n\nChương 1  Hàm nhiều biến\nChương 2  Đạo hàm riêng và vi phân\nChương 3  Cực trị của hàm nhiều biến\nChương 4  Tích phân kép\nChương 5  Tích phân bội ba\nChương 6  Tích phân đường\nChương 7 Tích phân mặt\nChương 8 Chuỗi', NULL, NULL, 1),
(50, 'KIẾN TRÚC MÁY TÍNH', 'kien-truc-may-tinh', 0, 100, 1, 'https://www.lib.hcmut.edu.vn/uploads/noidung/kien-truc-may-tinh-0-824.jpg', 54000, 'Sách &quot;Kiến trúc máy tính&quot; này được viết ra với mục đích phục vụ cho các độc giả học tập và nghiên cứu các vấn đề xoay quanh kiến trúc, hoạt động và đánh giá hiệu suất các máy tính\n\nMỤC LỤC\n\n1  Các vấn đề cơ bản trong thiết kế máy tính \n2  Kiến trúc tập lệnh \n3  Bộ tính toán số học \n4  Bộ xử lý \n5  Hệ thống bộ nhớ phân cấp', NULL, NULL, 1),
(51, 'GIÁO TRÌNH NGÔN NGỮ LẬP TRÌNH CÁC NGUYÊN LÝ VÀ MÔ HÌNH', 'giao-trinh-ngon-ngu-lap-trinh-cac-nguyen-ly-va-mo-hinh', 0, 10, 1, 'https://www.lib.hcmut.edu.vn/uploads/noidung/giao-trinh-ngon-ngu-lap-trinh-cac-nguyen-ly-va-mo-hinh-0-400.jpg', 32000, 'Bắt đầu với Fortran vào những năm 1950, đến nay đã có hàng trăm ngôn ngữ lập trình cấp cao đã và đang được phát triển. Tuy vậy, các ngôn ngữ cũng chỉ dựa trên một vài mô hình lập trình và có cùng chung nhiều nguyên lý.Phân loại được các ngôn ngữ và hiểu được các nguyên lý cơ bản của chúng không những giúp chúng ta khai thác được tốt hơn ngôn ngữ đang sử dụng, mà còn na91m bắt nhanh được sự thay đổi của ngôn ngữ đó cũng như các ngôn ngữ mới ra đời. Sách này nhằm cung cấp các kiến thức nền tảng chung đó, hơn là về các chi tiết kỹ thuật của một ngôn ngữ lập trình cụ thể.  \n\nMỤC LỤC\n\nChương 1  Mở đầu\nChương 2  Định nghĩa ngôn ngữ lập trình\nChương 3  Xử lý ngôn ngữ lập trình    \nChương 4  Hiện thực ngôn ngữ lập trình - phần dữ liệu       \nChương 5  Hiện thực ngôn ngữ lập trình - phần điều khiển\nChương 6  Lập trình hàm\nChương 7  Lập trình logic', NULL, NULL, 1),
(52, 'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life', 'the-subtle-art-of-not-giving-a-f-ck-a-counterintuitive-approach-to-living-a-good-life', 10, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/1/_/1_67_1.jpg', 233100, 'In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be &quot;positive&quot; all the time so that we can truly become better, happier people.\n\nFor decades, we’ve been told that positive thinking is the key to a happy, rich life. &quot;F**k positivity,&quot; Mark Manson says. &quot;Let’s be honest, shit is f**ked and we have to live with it.&quot; In his wildly popular Internet blog, Manson doesn’t sugarcoat or equivocate. He tells it like it is—a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F**k is his antidote to the coddling, let’s-all-feel-good mindset that has infected American society and spoiled a generation, rewarding them with gold medals just for showing up.\n\nManson makes the argument, backed both by academic research and well-timed poop jokes, that improving our lives hinges not on our ability to turn lemons into lemonade, but on learning to stomach lemons better. Human beings are flawed and limited—&quot;not everybody can be extraordinary, there are winners and losers in society, and some of it is not fair or your fault.&quot; Manson advises us to get to know our limitations and accept them. Once we embrace our fears, faults, and uncertainties, once we stop running and avoiding and start confronting painful truths, we can begin to find the courage, perseverance, honesty, responsibility, curiosity, and forgiveness we seek.\n\nThere are only so many things we can give a f**k about so we need to figure out which ones really matter, Manson makes clear. While money is nice, caring about what you do with your life is better, because true wealth is about experience. A much-needed grab-you-by-the-shoulders-and-look-you-in-the-eye moment of real-talk, filled with entertaining stories and profane, ruthless humor, The Subtle Art of Not Giving a F**k is a refreshing slap for a generation to help them lead contented, grounded lives.', NULL, NULL, 2),
(53, 'Mindset For IELTS Level 2 Student&#039;s Book With Testbank And Online Modules', 'mindset-for-ielts-level-2-student-039-s-book-with-testbank-and-online-modules', 10, 50, 1, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781108638401.jpg', 355500, 'Have confidence in Cambridge, the writers of the IELTS test Mindset immerses you in a wide range of IELTS topics and guides you clearly through all the skills and strategies you need to prepare fully for test day:\n\n- Learning strategies improve your language skills in a structured IELTS context\n\n- Skill practice: Immerse yourself in a wide range of IELTS topics\n\n- Exam practice: Familiarise yourself with the IELTS test through authentic tasks.\n\nAchieve your goal with MINDSET for IELTS\n\nThis Student&#039;s Books includes an access code for Testbank, Online Skills Modules, Academic Study Skills and Language Modules.\n\nMã hàng	9781108638401\nTên Nhà Cung Cấp	Cambridge University Press\nTác giả	Peter Crosthwaite, Natasha De Souza, Marc Loewenthal\nNXB	Cambridge University Press\nNăm XB	2019\nTrọng lượng (gr)	500\nSố trang	192\nHình thức	Bìa Mềm\nSản phẩm hiển thị trong	\nCambridge University Press\nSản phẩm bán chạy nhất	Top 100 sản phẩm ELT Examination Practice Tests bán chạy của tháng\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\nMindset For IELTS Level 2 Student&#039;s Book With Testbank And Online Modules\n\nHave confidence in Cambridge, the writers of the IELTS test Mindset immerses you in a wide range of IELTS topics and guides you clearly through all the skills and strategies you need to prepare fully for test day:\n\n- Learning strategies improve your language skills in a structured IELTS context\n\n- Skill practice: Immerse yourself in a wide range of IELTS topics\n\n- Exam practice: Familiarise yourself with the IELTS test through authentic tasks.\n\nAchieve your goal with MINDSET for IELTS\n\nThis Student&#039;s Books includes an access code for Testbank, Online Skills Modules, Academic Study Skills and Language Modules.', NULL, 6, 2);
INSERT INTO `product` (`ID`, `name`, `unique_name`, `sold_qty`, `current_qty`, `in_stock`, `image`, `price`, `description`, `authorID`, `manufacturerID`, `categoryID`) VALUES
(54, 'Norwegian Wood', 'norwegian-wood', 20, 200, 1, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_140806.jpg', 161100, 'When he hears her favourite Beatles song, Toru Watanabe recalls his first love Naoko, the girlfriend of his best friend Kizuki. Immediately he is transported back almost twenty years to his student days in Tokyo, adrift in a world of uneasy friendships, casual sex, passion, loss and desire - to a time when an impetuous young woman called Midori marches into his life and he has to choose between the future and the past.', NULL, NULL, 2),
(55, 'Đắc Nhân Tâm - Bìa Cứng (Tái Bản 2021)', 'dac-nhan-tam-bia-cung-tai-ban-2021', 200, 200, 1, 'https://cdn0.fahasa.com/media/catalog/product/d/n/dntttttuntitled_1.jpg', 81000, 'Đắc nhân tâm của Dale Carnegie là quyển sách của mọi thời đại và một hiện tượng đáng kinh ngạc trong ngành xuất bản Hoa Kỳ. Trong suốt nhiều thập kỷ tiếp theo và cho đến tận bây giờ, tác phẩm này vẫn chiếm vị trí số một trong danh mục sách bán chạy nhất và trở thành một sự kiện có một không hai trong lịch sử ngành xuất bản thế giới và được đánh giá là một quyển sách có tầm ảnh hưởng nhất mọi thời đại.\n\nĐây là cuốn sách độc nhất về thể loại self-help sở hữu một lượng lớn người hâm mộ. Ngoài ra cuốn sách có doanh số bán ra cao nhất được tờ báo The New York Times bình chọn trong nhiều năm. Cuốn sách này không còn là một tác phẩm về nghệ thuật đơn thuần nữa mà là một bước thay đổi lớn trong cuộc sống của mỗi người.\n\nNhờ có tầm hiểu biết rộng rãi và khả năng ‘ứng xử một cách nghệ thuật trong giao  tiếp’ – Dale Carnegie đã viết ra một quyển sách với góc nhìn độc đáo và mới mẻ trong giao tiếp hàng ngày một cách vô cùng thú vị – Thông qua những mẫu truyện rời rạc nhưng lại đầy lý lẽ thuyết phục. Từ đó tìm ra những kinh nghiệm để đúc kết ra những nguyên tắc vô cùng ‘ngược ngạo’, nhưng cũng rất logic dưới cái nhìn vừa sâu sắc, vừa thực tế.\n\nHơn thế nữa, Đắc Nhân Tâm còn đưa ra những nghịch lý mà từ lâu con người ta đã hiểu lầm về phương hướng giao tiếp trong mạng lưới xã hội, thì ra, người giao tiếp thông minh không phải là người có thể phát biểu ra những lời hay nhất, mà là những người học được cách mỉm cười, luôn biết cách lắng nghe, và khích lệ câu chuyện của người khác.', 3, 4, 1),
(56, 'Đời Thay Đổi Khi Chúng Ta Thay Đổi 01. Chìa Khóa Hạnh Phúc', 'doi-thay-doi-khi-chung-ta-thay-doi-01-chia-khoa-hanh-phuc', 20, 100, 1, 'https://salt.tikicdn.com/cache/750x750/ts/product/d5/ef/20/fe52a75e6f1eed1d636c1350e4a987ba.jpg', 75000, 'Quyển sách này nói về việc tại sao có những người dường như lúc nào cũng ở đúng nơi và đúng lúc - và làm thế nào bạn cũng được như họ; tại sao hoá đơn tính tiền luôn luôn tới ngay tức khắc; tại sao đèn giao thông cứ ở màu đỏ hoài cả nửa ngày trong khi bạn đang trễ một cuộc hẹn làm ă Sách cũng bàn về việc nhận thức được các quy luật tự nhiên để chúng ta có thể điều chỉnh bản tính chúng ta tốt hơn.', 4, 1, 1),
(57, 'Đời Thay Đổi Khi Chúng Ta Thay Đổi 02. Bỏ Bè Kết Bạn', 'doi-thay-doi-khi-chung-ta-thay-doi-02-bo-be-ket-ban', 15, 100, 1, 'https://salt.tikicdn.com/cache/750x750/ts/product/54/d1/73/f962b8f8b8a0ec49f0b55379dde30b96.jpg', 75000, 'Đơn giản, thực tiễn và rất THÚ VỊ,\n\nĐời thay đổi khi chúng ta thay đổi tập 2 nói về những người chúng ta yêu thương,những người giúp đỡ chúng ta và những người cần đến chúng ta, những người chúng ta muốn gặp và những người chúng ta tránh né.\n\nQuyển sách này còn nói về\n\n* Niềm vui trong việc giao tiếp với mọi người\n\n* Đối phó với những nhà tiên tri bi quan\n\n* Đôi khi phải biết nói KHÔNG\n\n* Chiến thắng tật ngồi lê đôi mách, tính nhỏ nhen và cơn nóng giận.\n\nTất cả là nhằm để hiểu một điều NẾU MUỐN CÓ BẠN, TRƯỚC HẾT BẠN PHẢI LÀ MỘT NGƯỜI BẠN.', 4, 1, 1),
(58, 'Vỉ 6 Bút Lông Màu Nước Maped', 'vi-6-but-long-mau-nuoc-maped', 10, 30, 1, 'https://cdn0.fahasa.com/media/catalog/product/3/1/3154140094003_1_1.jpg', 30400, 'Ngòi bút bằng sợi polyester chắc chắn, độ bền cao, hạn chế tối đa tình trạng hao mòn hay toe ngòi sau một thời gian sử dụng.\n\nĐầu bút lướt êm, mực ra đều, giúp viết và vẽ nhanh, đẹp.\n\nNét mực có độ dày và độ đậm vừa phải, màu mực sáng rõ, dễ quan sát.\n\nMàu mực lâu phai và khô nhanh sau khi viết. Nắp đậy kín giúp bảo vệ ngòi bút tốt hơn, đồng thời tránh được việc mực bị khô khi không dùng đến.\n\nMàu nắp bút thể hiện màu mực của sản phẩm giúp bạn dễ dàng phân biệt khi sử dụng.\n\nBạn có thể thỏa sức sáng tạo nên những đường vẽ mang phong cách độc đáo của riêng mình.', NULL, NULL, 3),
(59, 'Thiệp Congratulations - Grey 10-CG11', 'thiep-congratulations-grey-10-cg11', 0, 30, 1, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936077520214-mau5_2.jpg', 9000, 'Sản phẩm là bộ thiệp các bạn có thể dùng để gửi tới bạn bè, người thân lời cảm ơn của chính mình.\n\nBộ thiệp có thiết kế đơn giản và trên thiệp được trang trí các hình ảnh đáng yêu, kèm theo thiệp là phong bì giúp cho thiệp lịch sự và đẹp mắt hơn.\n\nThiệp được làm từ chất liệu giấy dày giúp cho thiệp luôn giữ được thẳng khó bị biến dạng trong quá trình di chuyển.\n\nGiấy được đánh giá cao bởi độ bền, chống nhăn nhàu, hạn chế tối đa tình trạng sờn cũ, mục rách, bề mặt giấy bám mực tốt, cho nét chữ rõ và đẹp hơn.\n\nBạn có thể tặng thiệp kèm với hoa hoặc bất cứ món quà nào sẽ khiến món quà của bạn trở nên đặc biệt hơn.\n\nChiếc thiệp dễ thương này sẽ giúp bạn nhắn gửi lời yêu thương của bạn đến người tặng một cách dễ dàng.', NULL, NULL, 3),
(60, 'Bấm Kim Số 10 - SDI 1105 - Màu Xám', 'bam-kim-so-10-sdi-1105-mau-xam', 34, 100, 1, 'https://cdn0.fahasa.com/media/catalog/product/4/7/4711734110502-mau1_1.jpg', 45000, 'Bấm Kim SDI 1105 là sản phẩm cần thiết cho học sinh, sinh viên và dân văn phòng để đóng hồ sơ, giấy tờ thành tập gọn gàng, ngăn nắp.\n\nBấm kim với lực bấm nhẹ, có khả năng bấm nhanh và chuẩn xác, không làm bung kim hoặc rách giấy.\n\nSản phẩm có kích thước vừa vặn tay cầm, không trơn trượt, dễ sử dụng.', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_comment`
--

CREATE TABLE `product_comment` (
  `ID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `productID` int(10) UNSIGNED NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `comment_datetime` datetime NOT NULL,
  `status` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product_comment`
--

INSERT INTO `product_comment` (`ID`, `userID`, `productID`, `content`, `comment_datetime`, `status`) VALUES
(1, 3, 18, 'Hay quá anh ạ, em đọc không hiểu gì hết', '2023-04-18 05:45:09', NULL),
(2, 23, 18, 'Tôi dân Bách Khoa nên thấy bình thường', '2023-04-18 05:46:47', NULL),
(3, 17, 24, 'Bi đẹp quá', '2023-04-23 23:47:54', NULL),
(4, 17, 21, 'Ma sói đẹp quá', '2023-04-23 23:49:07', NULL),
(5, 24, 24, 'Tôi vừa tạo tài khoản, bi cũng đẹp lắm mặc dù tôi chưa mua', '2023-04-24 09:07:17', NULL),
(6, 24, 17, 'truyện đọc rất hay, mua cũng rất rẻ', '2023-04-24 09:09:11', NULL),
(7, 24, 16, 'Truyện Harry Potter rất hay', '2023-04-24 09:12:39', NULL),
(8, 24, 16, 'Tôi sẽ không mua nữa bởi tôi đã mua rồi', '2023-04-24 09:14:30', NULL),
(9, 24, 19, 'Bút xóa được như mô tả,  OK', '2023-04-24 09:16:36', NULL),
(10, 24, 21, 'Quản trị viên cũng mua hàng nữa hả?', '2023-04-24 09:23:49', NULL),
(11, 24, 21, 'Toi không biết chơi trò này', '2023-04-24 09:28:40', NULL),
(12, 24, 22, 'OK tiết kiệm pin', '2023-04-24 09:33:09', NULL),
(13, 24, 26, 'Tôi rất thích chơi trò này', '2023-04-24 09:41:09', NULL),
(14, 17, 21, 'anh chị không biết chơi thì có thể tham khảo trên google ạ', '2023-04-24 10:05:06', NULL),
(15, 25, 17, 'truyện viết về mình hay quá', '2023-04-25 12:18:40', NULL);

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
(17, 'admin', '$2y$10$XSMDzwmg6d20darPkuL.IuKU7IS6.AunCslj163yRx5Ut.eWASAwO', '1', 'Admin vừa đổi tên', '0909010101', 'abcde@gmail.com', '1, Điện Biên Phủ, P.1, Q.1'),
(21, 'user1', '$2y$10$400gl9awQlOUSF9Y.Av/SOE2oyj8319ommiu0LfMHcuHhSercHQb.', '0', 'Tôi là user khác', '0909090909', '', '1, Le Duan, Q.1, TP.HCM'),
(22, 'user123', '$2y$10$8R13iLk6TIfbE832j2GKCukkAUQmcgGKhvO/x1wlF7GVcerjiTgUC', '0', 'Nguyễn Văn Nguyễn ACB', '0987654321', 'nguyenacb123@gmail.com', '1, Lê Duẩn, P.1, Q.Bình Thạnh, TP.HCM'),
(23, 'bachkhoa', '$2y$10$nBv0GXdLwR.FLjwvCIVT7ep3Ppm57vN0tnovRhAJ3Hd4rvresAqyC', '0', 'Đại học Bách Khoa', '0838654087', 'pdt@hcmut.edu.vn', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương'),
(24, 'khmt', '$2y$10$z.UxFICoz2fHGH7689yueellx9v8.nvp6zx5h9Boof3DasjehxqdS', '0', 'KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH', '0886472560', 'welcome@cse.hcmut.edu.vn', 'A3 – 268 Lý Thường Kiệt, Q. 10, TP. HCM'),
(25, 'harry_potter', '$2y$10$nRiE8MpYPLKYnAtUb3mR2OX.L9bxrTAfVzR.CLJJ.522oQlp/m6Ri', '0', 'Harry Potter', '', '', '');

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
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `product_comment`
--
ALTER TABLE `product_comment`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
