<?php 
session_start();
setcookie('session_id', session_id(), time() + 3600, '/');
require_once('cors.php');
// Start the session
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    require_once('utils/user_info_utils.php');
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

    $emailRegex = '/^[A-Za-z0-9._%+-]{1,30}@[A-Za-z0-9.-]{1,20}\.[A-Za-z]{2,6}$/';
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

    # check if username, phone, email is conflict
    if (checkUsernameExist($conn, $username)) {
        $errors['username'] = "Username đã được sử dụng, vui lòng chọn username khác";
    }
    if (!empty($phone) && checkPhoneExist($conn, $phone)) {
        $errors['phone'] = "Số điện thoại đã được sử dụng, vui lòng sử dụng số điện thoại khác";
    }
    if (!empty($email) && checkEmailExist($conn, $email)) {
        $errors['email'] = "Email đã được sử dụng, vui lòng sử dụng email khác";
    }    
    
    if (!empty($errors)) {
        http_response_code(409); // conflict
        header('Content-Type: application/json');
        echo json_encode($errors);
        mysqli_close($conn);
        exit();
    }
    require_once('utils/get_user_info.php');
    # check login credential in DB
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $qry = "INSERT INTO user
    (username, password_hash, name, phone, email, address) 
    VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 'ssssss', $username, $password_hash, $name, $phone, $email, $address);  
    $success = mysqli_stmt_execute($stmt);     
    // If the insert was successful, login that user as well
    if ($success) {
        // get user info
        $user = getUserInfoByUsername($conn, $username);
        // Generate a new session ID
        $session_id = bin2hex(random_bytes(32));

        // Store the session ID, user ID, role in the session variables
        $_SESSION['session_id'] = $session_id;
        $_SESSION['ID'] = $user['ID'];            
        $_SESSION['role'] = $user['role'];  

        // data to return back
        $res = array(
            'session_id' => $session_id,
            'role' => $user['role']
        );

        header('Content-Type: application/json');
        echo json_encode($res);
    } else {
        http_response_code(500);
        echo "Access database failed";
    }    
    
    // close DB Connection
    mysqli_close($conn);
}
?>