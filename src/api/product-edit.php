<?php 
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/get_unique_name.php');    
    require_once('utils/product_utils.php');
    require_once('utils/get_and_check_product_input.php');
    # get ID of product
    $ID = test_input($post_data['ID']);
    $ID_error_mess = check_product_ID($conn, $ID);
    
    if ($ID_error_mess) { # invalid ID
        header('Content-Type: application/json');
        echo json_encode(array('success' => false, 'message' => $ID_error_mess));
    } else if (!empty($errors)) { # input erros
        header('Content-Type: application/json');
        echo json_encode(array('success' => false, 'errors' => $errors));
    } else { # ok
        // check if name is edited, if so then we have to generate a new unique name
        $changed = name_is_changed($conn, $ID, $name);
        $stmt;
        if ($changed) {
            $unique_name = get_unique_name($conn, $name);
            $qry = "UPDATE product
            SET name = ?, unique_name = ?, categoryID = ?, image = ?, price = ?, current_qty = ?,
            sold_qty = ?, authorID = ?, manufacturerID = ?, description = ?
            WHERE ID = ?";
            $stmt = mysqli_prepare($conn, $qry);
            mysqli_stmt_bind_param($stmt, 'sssssssssss', $name, $unique_name, $categoryID, $image, $price, 
            $current_qty, $sold_qty, $authorID, $manufacturerID, $description, $ID);            
        } else {
            $qry = "UPDATE product
            SET categoryID = ?, image = ?, price = ?, current_qty = ?,
            sold_qty = ?, authorID = ?, manufacturerID = ?, description = ?
            WHERE ID = ?";
            $stmt = mysqli_prepare($conn, $qry);
            mysqli_stmt_bind_param($stmt, 'sssssssss', $categoryID, $image, $price, 
            $current_qty, $sold_qty, $authorID, $manufacturerID, $description, $ID);            
        }
        // Update data in the database
        $success = mysqli_stmt_execute($stmt);         

        // If the insert was successful, return a success message
        if ($success) {
            header('Content-Type: application/json');
            echo json_encode(array("success" => true, "message" => "Product edited successfully"));
        } else {
            header('Content-Type: application/json');
            echo json_encode(array("success" => false, "message" => "Edit product in database failed"));
        }    
    }      
    
    // close DB Connection
    mysqli_close($conn);
}
?>