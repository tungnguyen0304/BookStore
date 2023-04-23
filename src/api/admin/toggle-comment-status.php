<?php
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('../DBConnect.php');
    require_once('../utils/test_input.php');
    require_once('../utils/check_access.php');

    // check admin access
    check_admin_access();

    // get the comment id to update
    $comment_id = isset($_GET['id']) ? test_input($_GET['id']) : '';

    // check if the comment id is provided
    if ($comment_id === '') {
        http_response_code(400);
        echo "Comment ID is required";
        exit;
    }

    // prepare a statement to fetch the current comment status
    $stmt_select = mysqli_prepare($conn, 'SELECT status FROM product_comment WHERE ID = ?');
    mysqli_stmt_bind_param($stmt_select, 's', $comment_id);
    mysqli_stmt_execute($stmt_select);
    $result = mysqli_stmt_get_result($stmt_select);
    $row = mysqli_fetch_assoc($result);
    $current_status = $row['status'];

    // toggle the comment status
    if ($current_status === '1') {
        $new_status = null;
    } else {
        $new_status = '1';
    }

    // prepare a statement to update the comment status
    $stmt_update = mysqli_prepare($conn, 'UPDATE product_comment SET status = ? WHERE ID = ?');
    mysqli_stmt_bind_param($stmt_update, 'ss', $new_status, $comment_id);
    mysqli_stmt_execute($stmt_update);
    $rows_affected = mysqli_stmt_affected_rows($stmt_update);

    // return the comments or an error message
    if ($rows_affected > 0) {
        echo "Comment status updated";
    } else {
        http_response_code(404);
        echo "Comment not found";
    }
    mysqli_stmt_close($stmt_select);
    mysqli_stmt_close($stmt_update);
    mysqli_close($conn);
}
?>