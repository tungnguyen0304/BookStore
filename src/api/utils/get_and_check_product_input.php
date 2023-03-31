<?php
    require_once('utils/test_input.php');
    // get post data from client
    $post_data = json_decode(file_get_contents('php://input'), true);

    $name = test_input($post_data['name']);
    $categoryID = test_input($post_data['categoryID']);
    $image = test_input($post_data['image']);
    $price = test_input($post_data['price']);
    $current_qty = test_input($post_data["current_qty"]);
    $sold_qty = test_input($post_data["sold_qty"]);
    $authorID = test_input($post_data["authorID"]);
    $manufacturerID = test_input($post_data["manufacturerID"]);
    $description = test_input($post_data['description']);

    $errors = array();
    
    # get category-id list
    $categoryIDList = $conn->query("SELECT ID FROM category");
    $categoryIDList = array_column($categoryIDList->fetch_all(MYSQLI_ASSOC), 'ID');
    # get author-id list
    $authorIDList = $conn->query("SELECT ID FROM author");
    $authorIDList = array_column($authorIDList->fetch_all(MYSQLI_ASSOC), 'ID');
    # get manufacturer-id list
    $manufacturerIDList = $conn->query("SELECT ID FROM manufacturer");
    $manufacturerIDList = array_column($manufacturerIDList->fetch_all(MYSQLI_ASSOC), 'ID');

    # below is to check the validity of inputs
    if (empty($name)) $errors['name'] = "Vui lòng điền tên sản phẩm";

    if (!is_numeric($categoryID)) $errors['categoryID'] = "Vui lòng chọn thể loại sản phẩm";
    else if (!in_array($categoryID, $categoryIDList)) $errors['categoryID'] = "Thể loại sản phẩm không hợp lệ";

    if (strlen($image) > 255) $errors['image'] = "Link hình ảnh phải ít hơn 255 ký tự";

    if (!is_numeric($price)) $errors['price'] = "Vui lòng điền giá sản phẩm";
    else if ((int) $price < 0) $errors['price'] = "Giá sản phẩm phải lớn hơn 0";

    if (!is_numeric($current_qty)) $errors['current_qty'] = "Vui lòng điền số lượng hiện tại của sản phẩm";
    else if ((int) $current_qty < 0) $errors['current_qty']  = "Số lượng hiện tại của sản phẩm phải lớn hơn 0";

    if (!is_numeric($price)) $errors['sold_qty'] = "Vui lòng điền số lượng đã bán của sản phẩm";
    else if ((int) $sold_qty < 0) $errors['sold_qty'] = "Số lượng đã bán của sản phẩm phải lớn hơn 0";

    if (!is_numeric($authorID)) $errors['authorID'] = "Tác giả không hợp lệ";
    else if (!in_array($authorID, $authorIDList)) $errors['authorID'] = "Tác giả không hợp lệ";

    if (!is_numeric($manufacturerID)) $errors['manufacturerID'] = "NXB/NSX không hợp lệ";
    else if (!in_array($manufacturerID, $manufacturerIDList)) $errors['manufacturerID'] = "NXB/NSX không hợp lệ";
    
    if (strlen($description) > 5000) $errors['description'] = "Mô tả sản phẩm phải ít hơn 5000 ký tự";  
?>