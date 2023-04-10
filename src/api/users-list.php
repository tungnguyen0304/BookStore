<?php
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');

    // sanitize and validate the q parameter
    $q = isset($_GET['q']) ? test_input($_GET['q']) : '';

    // prepare a statement to fetch users
    if ($q === '') {
        $stmt = mysqli_prepare($conn, 'SELECT * FROM user');
    } else {
        $stmt = mysqli_prepare($conn, 'SELECT * FROM user WHERE name LIKE ? OR 
        username LIKE ? OR phone LIKE ? OR email LIKE ? OR address LIKE ?');
        $q = '%'.$q.'%';
        mysqli_stmt_bind_param($stmt, 'sssss', $q, $q, $q, $q, $q);
    }

    // execute the statement and fetch the results
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($users) {
        header('Content-Type: application/json');
        echo json_encode($users);
    } else {
        http_response_code(404);
        echo "No users match";
    }

    // close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>