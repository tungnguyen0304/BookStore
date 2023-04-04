<?php
function getUserInfoByUsername($conn, $username) {
    // prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT * FROM user WHERE username = ?");
    mysqli_stmt_bind_param($stmt, "s", $username);
    $success = mysqli_stmt_execute($stmt);
    if ($success) {
        $result = mysqli_stmt_get_result($stmt);
        $data = mysqli_fetch_assoc($result); 
        return $data;
    } else {
        return null;
    }
    
    
}
function getUserInfoByID($conn, $ID) {
    // prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT * FROM user WHERE ID = ?");
    mysqli_stmt_bind_param($stmt, "s", $ID);
    $success = mysqli_stmt_execute($stmt);
    if ($success) {
        $result = mysqli_stmt_get_result($stmt);
        $data = mysqli_fetch_assoc($result); 
        return $data;
    } else {
        return null;
    }
}
?>