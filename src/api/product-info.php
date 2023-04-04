<?php
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt;
    if (isset($_GET['id'])) {
        $ID = $_GET['id'];
        require_once('DBConnect.php');
        // Get data from the database
        $qry = "SELECT * FROM product WHERE ID = ?";
        $stmt = mysqli_prepare($conn, $qry);
        mysqli_stmt_bind_param($stmt, 's', $ID);
    } else if (isset($_GET['unique_name'])) {
        $unique_name = $_GET['unique_name'];
        require_once('DBConnect.php');
        // Get data from the database
        $qry = "SELECT * FROM product WHERE unique_name = ?";
        $stmt = mysqli_prepare($conn, $qry);
        mysqli_stmt_bind_param($stmt, 's', $unique_name);        
    }

    $success = mysqli_stmt_execute($stmt);    
    // If the select was successful, return a success message
    if ($success) {
        $result = mysqli_stmt_get_result($stmt);
        $data = mysqli_fetch_assoc($result);    
        if ($data) {
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo "Product not found";
        }
    } else {
        http_response_code(500);
        echo "Access database failed";
    }     
    // close DB Connection
    mysqli_close($conn);    
}
?>