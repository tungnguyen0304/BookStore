<?php 
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    // get post data from client
    $post_data = json_decode(file_get_contents('php://input'), true); 
    $name = test_input($post_data['name']);
    $country = test_input($post_data['country']);

    $errors = array();
    if (empty($name)) {
        $errors['name'] = "Tên NSX/NXB không được trống";
    } else if (strlen($name) > 50) {
        $errors['name'] = "Tên NSX/NXB phải ít hơn 50 ký tự";
    }

    if (strlen($country) > 20) {
        $errors['country'] = "Tên quốc gia phải ít hơn 20 ký tự";
    }
    
    if (!empty($errors)) {
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
    } else {
        // Insert data into the database
        $qry = "INSERT INTO manufacturer
        (name, country) 
        VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $qry);
        mysqli_stmt_bind_param($stmt, 'ss', $name, $country);
        $success = mysqli_stmt_execute($stmt);         

        // If the insert was successful, return a success message
        if ($success) {
            header('Content-Type: application/json');
            echo "Manufacturer added successfully";
        } else {
            http_response_code(500);
            echo "Access database failed";
        }    
    }      
    
    // close DB Connection
    mysqli_close($conn);
}
?>