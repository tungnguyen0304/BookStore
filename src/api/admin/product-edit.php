<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('../DBConnect.php');  
    require_once('../utils/check_access.php');   
    // check admin access
    check_admin_access();    
    
    require_once('../utils/test_input.php'); 
    # get ID of product
    require_once('../utils/product_utils.php'); 
    require_once('../utils/get_and_check_product_input.php');  
    $ID = test_input($post_data['ID']);
    $ID_error_mess = check_product_ID($conn, $ID);

    if ($ID_error_mess == 1) {
        http_response_code(404);
        echo "Product not found";        
    } else if ($ID_error_mess == 2) {
        http_response_code(500);
        echo "Access database failed";    
    } else if (!empty($errors)) { # input erros
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
    } else { # ok
        // check if name is edited, if so then we have to generate a new unique name
        $changed = name_is_changed($conn, $ID, $name);
        $stmt;
        // Check if variables are empty and pass NULL if they are
        if (empty($manufacturerID)) {
            $manufacturerID = NULL;
        }
        
        if (empty($authorID)) {
            $authorID = NULL;
        }        
        
        if ($changed) {
            require_once('../utils/get_unique_name.php');  
            $unique_name = get_unique_name($conn, $name);
            $qry = "UPDATE product
                    SET name = ?, unique_name = ?, categoryID = ?, image = ?, price = ?, current_qty = ?,
                    sold_qty = ?, authorID = ?, manufacturerID = ?, description = ?
                    WHERE ID = ?";
            $stmt = mysqli_prepare($conn, $qry);
            // Check if variables for image, manufacturerID, and authorID are empty and pass NULL if they are
            mysqli_stmt_bind_param($stmt, 'sssssssssss', $name, $unique_name, $categoryID,
                $image, $price, $current_qty, $sold_qty, $authorID, $manufacturerID,
                $description, $ID);
        } else {
            $qry = "UPDATE product
                    SET categoryID = ?, image = ?, price = ?, current_qty = ?,
                    sold_qty = ?, authorID = ?, manufacturerID = ?, description = ?
                    WHERE ID = ?";
            $stmt = mysqli_prepare($conn, $qry);
            // Check if variables for image, manufacturerID, and authorID are empty and pass NULL if they are
            mysqli_stmt_bind_param($stmt, 'sssssssss', $categoryID,
                $image, $price, $current_qty, $sold_qty, $authorID, $manufacturerID,
                $description, $ID);
        }
        // Update data in the database
        $success = mysqli_stmt_execute($stmt);         

        // If the insert was successful, return a success message
        if ($success) {
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