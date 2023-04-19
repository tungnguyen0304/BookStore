<?php
session_start();
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_once('DBConnect.php');
    require_once('utils/check_access.php');
    require_once('utils/get_user_info.php');
    if (!isset($_SESSION['ID'])) {
        http_response_code(408); // Request Timeout
        echo "Your session has timeout, login again";
        mysqli_close($conn);
        exit();         
    }
    $ID = $_SESSION['ID'];
    
    if (check_user_access() == 1) {
        http_response_code(408); // Request Timeout
        echo "Your session has timeout, login again";
        mysqli_close($conn);
        exit();        
    }
    else if (check_user_access() == 2) {
        http_response_code(401); // Unauthorized
        echo "You are not authorized to access this resource";
        mysqli_close($conn);
        exit();        
    }    
    
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