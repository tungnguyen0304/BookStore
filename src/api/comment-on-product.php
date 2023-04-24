<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
session_start();
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');
    require_once('utils/check_access.php');

    check_user_access();
    // get the userID from the session variable
    $userID = $_SESSION['ID'];
    $username = $_SESSION['username'];
    $userRole = $_SESSION['role'];

    // read the raw request body and decode it as JSON
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    // extract the productID and content values from the JSON data
    $productID = isset($data->productID) ? test_input($data->productID) : '';
    $content = isset($data->content) ? test_input($data->content) : '';

    // check if the required fields are not empty
    if ($productID !== '' && $content !== '') {
        // prepare the SQL statement to insert the comment
        $stmt = mysqli_prepare($conn, 'INSERT INTO product_comment (userID, productID, content, comment_datetime) 
        VALUES (?, ?, ?, NOW())');
        mysqli_stmt_bind_param($stmt, 'iis', $userID, $productID, $content);

        // execute the statement and check if the insertion was successful
        if (mysqli_stmt_execute($stmt)) {
            // insertion successful, retrieve the inserted comment from the database
            $commentID = mysqli_stmt_insert_id($stmt);
            $stmt = mysqli_prepare($conn, 'SELECT * FROM product_comment WHERE ID = ?');
            mysqli_stmt_bind_param($stmt, 'i', $commentID);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $comment = mysqli_fetch_assoc($result);
            $comment['username'] = $username;
            $comment['userRole'] = $userRole;
            header('Content-Type: application/json');
            echo json_encode($comment);
        } else {
            // insertion failed, return an error message
            http_response_code(500);
            echo "Error inserting comment into database";
        }

        // close the statement and connection
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    } else {
        // required fields are empty, return a bad request error
        http_response_code(400);
        echo "Missing or invalid parameters";
    }
}
?>
