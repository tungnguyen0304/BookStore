<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');
    require_once('utils/check_access.php');

    check_user_access();
    # get ID of user
    $userID = (int) $_SESSION['ID'];        

    // prepare a statement to fetch orders
    $stmt = mysqli_prepare($conn, 'SELECT * FROM `order` WHERE userID = ?');

    // execute the statement and fetch the results
    mysqli_stmt_bind_param($stmt, 'i', $userID);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $orders = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($orders) {
        header('Content-Type: application/json');
        echo json_encode($orders);
    } else {
        http_response_code(404);
        echo $userID;
        echo "No orders available";
    }

    // close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>