<?php
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');
    
    $orderID = (int) $_GET['id'];

    // Prepare the SQL statement to fetch the order content with corresponding product information for the given orderID
    $query = "SELECT oc.*, p.*
              FROM order_content oc
              JOIN product p ON oc.productID = p.ID
              WHERE oc.orderID = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $orderID);
    mysqli_stmt_execute($stmt);

    // Get the results
    $result = mysqli_stmt_get_result($stmt);
    $order_content = mysqli_fetch_all($result, MYSQLI_ASSOC);

    // Close the statement and database connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    // Return the order content with corresponding product information as JSON
    if ($order_content) {
        header('Content-Type: application/json');
        echo json_encode($order_content);
    } else {
        http_response_code(404);
        echo "Order not exist";
    }
}
?>