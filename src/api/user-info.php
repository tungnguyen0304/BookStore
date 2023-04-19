<?php
session_start();
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_once('DBConnect.php');
    require_once('utils/check_access.php');
    require_once('utils/get_user_info.php');

    check_user_access();
    $ID = $_SESSION['ID'];
    
    // Get data from the database
    $result = getUserInfoByID($conn, $ID);
    // If the select was successful, return a success message
    if ($result) {
        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo "User " . $ID . " not found";
        }
    } else {
        http_response_code(500);
        echo "Access database failed";
    }     
    // close DB Connection
    mysqli_close($conn);    
}
?>