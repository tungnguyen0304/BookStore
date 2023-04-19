<?php 
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('../DBConnect.php');
    require_once('../utils/get_unique_name.php');    
    require_once('../utils/get_and_check_product_input.php');    
    require_once('../utils/test_input.php');   
    require_once('../utils/check_access.php');

    // check admin access
    check_admin_access();    

    if (!empty($errors)) {
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
    } else {
        $unique_name = get_unique_name($conn, $name);
        // Insert data into the database
        $qry = "INSERT INTO product
        (name, unique_name, categoryID, image, price, current_qty, sold_qty, authorID, manufacturerID, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $qry);
        mysqli_stmt_bind_param($stmt, 'ssssssssss', $name, $unique_name, $categoryID, $image, $price, 
    $current_qty, $sold_qty, $authorID, $manufacturerID, $description);
        $success = mysqli_stmt_execute($stmt);         

        // If the insert was successful, return a success message
        if ($success) {
            header('Content-Type: application/json');
            echo "Product edited successfully";
        } else {
            http_response_code(500);
            echo "Access database failed";
        }    
    }      
    
    // close DB Connection
    mysqli_close($conn);
}
?>