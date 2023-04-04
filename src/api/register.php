<?php 
require_once('cors.php');
// Start the session
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    // get post data from client
    $post_data = json_decode(file_get_contents('php://input'), true);    
    $name = test_input($post_data['name']);
    $username = test_input($post_data['username']);
    $password = test_input($post_data['password']);
    $phone = test_input($post_data['phone']);
    $email = test_input($post_data['email']);
    $address = test_input($post_data['address']);
    
    $errors = array();
    // check validity
    $nameRegex = '/^[\p{L}\s\']{1,50}$/u';
    if (!preg_match($nameRegex, $name)) {
        $errors['name'] = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng";
    } 

    $usernameRegex = '/^[a-zA-Z0-9_-]{3,20}$/';
    if (!preg_match($usernameRegex, $username)) {
        $errors['username'] = "Username gồm 3 đến 20 ký tự chữ thường, chữ hoa, số, dấu gạch chân và dấu gạch nối";
    }

    $passwordRegex = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/";
    if (!preg_match($passwordRegex, $password)) {
        $errors['password'] = "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ hoa, 1 thường, 1 số, 1 ký tự đặc biệt";
    }

    $phoneRegex = '/(84|0[3|5|7|8|9])+([0-9]{8})\b/';
    if (!empty($phone)) {
        if (!preg_match($phoneRegex, $phone)) {
            $errors['phone'] = "SĐT không hợp lệ";
        }
    }

    $emailRegex = '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{,50}$/';
    if (!empty($email)) {
        if (!preg_match($emailRegex, $email)) {
            $errors['email'] = "Email không hợp lệ";
        }    
    }   

    if (strlen($address) > 255) {
        $errors['address'] = "Địa chỉ phải ít hơn 255 ký tự";
    }    

    if (!empty($errors)) {
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
        mysqli_close($conn);
        exit();
    }
    
    # check login credential in DB
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $qry = "INSERT INTO user
    (username, password_hash, name, phone, email, address) 
    VALUES (?, ?, ?, ?, ?, ?)";
    echo "P1";
    $stmt = mysqli_prepare($conn, $qry);
    echo "P2";
    mysqli_stmt_bind_param($stmt, 'ssssss', $username, $password_hash, $name, $phone, $email, $address);            
    echo "P3";
    $success = mysqli_stmt_execute($stmt);         
    // If the insert was successful, login that user as well
    if ($success) {
        // Generate a new session ID
        $session_id = bin2hex(random_bytes(32));

        // Set a cookie that expires in a year
        setcookie('session_id', $session_id, time() + 31536000, '/');

        // Store the session ID, user ID, role in the session variables
        $_SESSION['session_id'] = $session_id;
        $_SESSION['user_id'] = $row['ID'];            
        $_SESSION['role'] = $row['role'];  

        header('Content-Type: application/json');
        echo "Login successfully";
    } else {
        http_response_code(500);
        echo "Access database failed";
    }    
    
    // close DB Connection
    mysqli_close($conn);
}
?>