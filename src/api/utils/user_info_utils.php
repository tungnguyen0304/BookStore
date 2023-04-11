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
function checkName($name) {
    $nameRegex = '/^[\p{L}\s\']{1,50}$/u';
    return preg_match($nameRegex, $name);
}
function checkUsername($username) {
    $usernameRegex = '/^[a-zA-Z0-9_-]{3,20}$/';
    return preg_match($usernameRegex, $username);
}
function checkPassword($password) {
    $passwordRegex = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/";
    return preg_match($passwordRegex, $password);
}
function checkPhone($phone) {
    $phoneRegex = '/(84|0[3|5|7|8|9])+([0-9]{8})\b/';
    return preg_match($phoneRegex, $phone);
}
function checkEmail($email) {
    $emailRegex = '/^[A-Za-z0-9._%+-]{1,30}@[A-Za-z0-9.-]{1,20}\.[A-Za-z]{2,6}$/';
    return preg_match($emailRegex, $email);
}
?>