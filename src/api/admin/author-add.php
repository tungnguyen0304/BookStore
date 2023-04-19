<?php 
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('../DBConnect.php');
    require_once('../utils/test_input.php');   
    require_once('../utils/check_access.php');

    // check admin access
    check_admin_access();

    // get post data from client
    $post_data = json_decode(file_get_contents('php://input'), true); 
    $name = test_input($post_data['name']);

    $errors = array();
    if (empty($name)) {
        $errors['name'] = "Tên tác giả không được trống";
    } else if (strlen($name) > 50) {
        $errors['name'] = "Tên tác giả phải ít hơn 50 ký tự";
    }
    
    if (!empty($errors)) {
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
    } else {
        // Insert data into the database
        $qry = "INSERT INTO author
        (name) 
        VALUES (?)";
        $stmt = mysqli_prepare($conn, $qry);
        mysqli_stmt_bind_param($stmt, 's', $name);
        $success = mysqli_stmt_execute($stmt);         

        // If the insert was successful, return a success message
        if ($success) {
            header('Content-Type: application/json');
            echo "Author added successfully";
        } else {
            http_response_code(500);
            echo "Access database failed";
        }    
    }      
    
    // close DB Connection
    mysqli_close($conn);
}
?>