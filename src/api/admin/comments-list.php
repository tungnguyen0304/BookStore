<?php
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('../DBConnect.php');
    require_once('../utils/test_input.php');
    require_once('../utils/check_access.php');

    check_admin_access();

    // sanitize and validate the q parameter
    $q = isset($_GET['q']) ? test_input($_GET['q']) : '';

    // prepare a statement to fetch comments
    if ($q === '') {
        $stmt = mysqli_prepare($conn, 'SELECT c.*, u.name AS user_name, p.name AS product_name FROM comment c 
        LEFT JOIN user u ON c.userID = u.ID 
        LEFT JOIN product p ON c.productID = p.ID');
    } else {
        $q = '%'.$q.'%';
        $stmt = mysqli_prepare($conn, 'SELECT c.*, u.name AS user_name, p.name AS product_name FROM comment c 
        LEFT JOIN user u ON c.userID = u.ID 
        LEFT JOIN product p ON c.productID = p.ID 
        WHERE c.content LIKE ?');
        mysqli_stmt_bind_param($stmt, 's', $q);
    }

    // execute the statement and fetch the results
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $comments = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($comments) {
        header('Content-Type: application/json');
        echo json_encode($comments);
    } else {
        http_response_code(404);
        echo "No comments match";
    }

    // close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>