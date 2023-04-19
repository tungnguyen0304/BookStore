<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    require_once('utils/user_info_utils.php'); 
    require_once('utils/product_utils.php');
    require_once('utils/check_access.php');

    check_user_access();
    # get ID of user
    $userID = (int) $_SESSION['ID'];    

    $post_data = json_decode(file_get_contents('php://input'), true);    
    $name = test_input($post_data['name']);
    $phone = test_input($post_data['phone']);
    $address = test_input($post_data['address']);
    $method = test_input($post_data['method']);
    $orderContent = $post_data['orderContent'];

    if (!is_array($orderContent)) {
        die("Invalid order content format");
    }

    $errors = array();
    // check validity
    if (!checkName($name)) {
        $errors['name'] = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng";
    } 

    if (!empty($phone)) {
        if (!checkPhone($phone)) {
            $errors['phone'] = "SĐT không hợp lệ";
        }
    }

    if (strlen($address) > 255) {
        $errors['address'] = "Địa chỉ phải ít hơn 255 ký tự";
    }    

    $methods = array('0','1');
    echo $method;
    if (strlen($method) == 0) {
        $errors['method'] = "Vui lòng chọn phương thức thanh toán";
    } else if (!in_array($method, $methods)) {
        $errors['method'] = "Phương thức thanh toán không hợp lệ";
    }

    if (!empty($errors)) {
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
        mysqli_close($conn);
        exit();
    }
    
    // Start a database transaction
    mysqli_autocommit($conn, false);

    try {
        // Insert the order details to the order table
        $order_datetime = date('Y-m-d H:i:s');
        $total = 0;
        $delivery_cost = 0;
        $insert_order_query = "INSERT INTO `order` (userID, name, phone, address, total, order_datetime, method) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $insert_order_query);
        mysqli_stmt_bind_param($stmt, "isssiss", $userID, $name, $phone, $address, $total, $order_datetime, $method);
        mysqli_stmt_execute($stmt);
    
        // Get the ID of the newly inserted order
        $orderID = mysqli_insert_id($conn);
    
        // Insert the order content to the order_content table
        foreach ($orderContent as $item) {
            $productID = $item['productID'];
            $qty = $item['qty'];
    
            // Check if the productID exists and if the quantity is enough
            if (check_product_ID($conn, $productID) == 1) {
                mysqli_rollback($conn);
                http_response_code(404);
                die("Product with ID $productID does not exist");                
            }
            $product_available_check_res = check_product_available($conn, $productID, $qty);
            if ($product_available_check_res == 1) {
                mysqli_rollback($conn);
                http_response_code(400);
                die("Product with ID $productID is out of stock");                
            } else if ($product_available_check_res == 2) {
                mysqli_rollback($conn);
                http_response_code(400);
                die("Product with ID $productID is not enough quantity available");                
            }
    
            // Calculate the subtotal for this item
            $price = get_product_price($conn, $productID);
            $subtotal = $price * $qty;
    
            // Insert the item to the order_content table
            $insert_order_content_query = "INSERT INTO order_content (orderID, productID, qty, subtotal) 
                                           VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $insert_order_content_query);
            mysqli_stmt_bind_param($stmt, "iiii", $orderID, $productID, $qty, $subtotal);
            mysqli_stmt_execute($stmt);
    
            // Update the total for the order
            $total += $subtotal;
        }
    
        // Update the total and delivery_cost for the order
        $delivery_cost = calculate_delivery_cost($total);
        $total += $delivery_cost;
        $update_order_query = "UPDATE `order` SET total = ?, delivery_cost = ? WHERE ID = ?";
        $stmt = mysqli_prepare($conn, $update_order_query);
        mysqli_stmt_bind_param($stmt, "ddi", $total, $delivery_cost, $orderID);
        mysqli_stmt_execute($stmt);
        // Update qty in product table
        update_product_qty($conn, $productID, $qty);
    
        // Commit the transaction
        mysqli_commit($conn);
        echo "Order successfully placed";
    
    } catch (Exception $e) {
        // Rollback the transaction and show the error message
        mysqli_rollback($conn);
        echo "Error: " . $e->getMessage();
    }
    
    // close DB Connection
    mysqli_close($conn);
}
function calculate_delivery_cost($total) {
    return 15000;
}
?>