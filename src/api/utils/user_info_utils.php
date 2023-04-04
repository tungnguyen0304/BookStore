<?php
function checkUsernameExist($conn, $username) {
    // prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT username FROM user WHERE username = ?");
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    
    $result = mysqli_stmt_get_result($stmt);
    // $data = mysqli_fetch_assoc($result);   
    
    return mysqli_num_rows($result);
}
function checkEmailExist($conn, $email) {
    // prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT email FROM user WHERE email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    
    $result = mysqli_stmt_get_result($stmt);
    // $data = mysqli_fetch_assoc($result);   
    
    return mysqli_num_rows($result);
}
function checkPhoneExist($conn, $phone) {
    // prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT phone FROM user WHERE phone = ?");
    mysqli_stmt_bind_param($stmt, "s", $phone);
    mysqli_stmt_execute($stmt);
    
    $result = mysqli_stmt_get_result($stmt);
    // $data = mysqli_fetch_assoc($result);   
    
    return mysqli_num_rows($result);
}
?>