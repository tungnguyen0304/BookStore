<?php 
require_once('cors.php');
// Start the session
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    # get username and password
    // get post data from client
    $post_data = json_decode(file_get_contents('php://input'), true);    
    $username = test_input($post_data['username']);
    $password = test_input($post_data['password']);
    
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
            // Generate a new session ID
            $session_id = bin2hex(random_bytes(32));

            // Store the session ID, user ID, role in the session variables
            $_SESSION['session_id'] = $session_id;
            $_SESSION['user_id'] = $row['ID'];            
            $_SESSION['role'] = $row['role'];  
            // data to return back
            $res = array(
                'session_id' => $session_id,
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