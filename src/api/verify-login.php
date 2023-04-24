<?php 
session_start();
require_once('cors.php');
// Start the session
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    // get post data from client
    $post_data = json_decode(file_get_contents('php://input'), true);    
    $username = test_input($post_data['username']);
    $password = test_input($post_data['password']);
    if (empty($username) or empty($password)) {
        http_response_code(400); // invalid user input
        echo "Username and Password cannot be empty";
        mysqli_close($conn);
        exit();
    }    
    
    # check login credential in DB
    $qry = "SELECT * FROM user WHERE username = ?";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 's', $username);            
    $success = mysqli_stmt_execute($stmt);         

    // If the insert was successful, return a success message
    if ($success) {
        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        $password_hash = $row['password_hash'];
        
        # ok
        if (password_verify($password, $password_hash)) {
            // Store the session ID, user ID, role in the session variables
            $_SESSION['ID'] = $row['ID'];            
            $_SESSION['username'] = $row['username'];
            $_SESSION['role'] = $row['role'];  
            // data to return back
            $res = array(
                'role' => $row['role']
            );

            header('Content-Type: application/json');
            echo json_encode($res);
        } else {
            http_response_code(401);
            echo "Wrong Login Credentials";
        }
    } else {
        http_response_code(500);
        echo "Access database failed";
    }    
    
    // close DB Connection
    mysqli_close($conn);
}
?>