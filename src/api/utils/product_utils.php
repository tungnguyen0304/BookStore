<?php
# check if this product is in DB, return error meesage if any
function check_product_ID($conn, $ID) {
    $qry = "SELECT * FROM product WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 's', $ID);
    $success = mysqli_stmt_execute($stmt); 
    if ($success) {
        mysqli_stmt_store_result($stmt);  // store result for use with mysqli_stmt_num_rows
        if (mysqli_stmt_num_rows($stmt) != 1) {
            return 1;
        } else {
            return 0;
        }
    }

    return 2;
}
function name_is_changed($conn, $ID, $name) {
    $qry = "SELECT name FROM product WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 's', $ID);
    $success = mysqli_stmt_execute($stmt); 
    if ($success) {
        mysqli_stmt_store_result($stmt);  // store result for use with mysqli_stmt_num_rows
        if (mysqli_stmt_num_rows($stmt) == 1) {
            // get name in the result
            mysqli_stmt_bind_result($stmt, $resultName);
            mysqli_stmt_fetch($stmt);
            if ($name == $resultName) {
                return false;
            }
        }
    }

    return true;
}
?>