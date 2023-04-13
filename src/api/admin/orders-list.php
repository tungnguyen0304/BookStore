<?php
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('../DBConnect.php');
    require_once('../utils/test_input.php');
    require_once('../utils/check_access.php');

    check_admin_access();

    // sanitize and validate the q parameter
    $q = isset($_GET['q']) ? test_input($_GET['q']) : '';

    // prepare a statement to fetch orders
    if ($q === '') {
        $stmt = mysqli_prepare($conn, 'SELECT o.*, u.name AS user_name FROM `order` o 
        LEFT JOIN user u ON o.userID = u.ID');
    } else {
        $q = '%'.$q.'%';
        $stmt = mysqli_prepare($conn, 'SELECT o.*, u.name AS user_name FROM `order` o 
        LEFT JOIN user u ON o.userID = u.ID 
        WHERE o.name LIKE ? OR o.phone LIKE ? OR o.address LIKE ? OR o.status LIKE ? OR o.method LIKE ?');
        mysqli_stmt_bind_param($stmt, 'sssss', $q, $q, $q, $q, $q);
    }

    // execute the statement and fetch the results
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $orders = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($orders) {
        header('Content-Type: application/json');
        echo json_encode($orders);
    } else {
        http_response_code(404);
        echo "No orders match";
    }

    // close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>