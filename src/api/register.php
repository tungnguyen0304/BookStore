<?php 
session_start();
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
    if (!checkName($name)) {
        $errors['name'] = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng";
    } 

    if (!checkUsername($username)) {
        $errors['username'] = "Username gồm 3 đến 20 ký tự chữ thường, chữ hoa, số, dấu gạch chân và dấu gạch nối";
    }

    if (!checkPassword($password)) {
        $errors['password'] = "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ hoa, 1 thường, 1 số, 1 ký tự đặc biệt";
    }

    if (!empty($phone)) {
        if (!checkPhone($phone)) {
            $errors['phone'] = "SĐT không hợp lệ";
        }
    }

    if (!empty($email)) {
        if (!checkEmail($email)) {
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
        // get the ID of the newly inserted user
        $user_id = mysqli_insert_id($conn);
    
        // Retrieve the newly inserted user record from the database
        $qry = "SELECT * FROM user WHERE ID = ?";
        $stmt = mysqli_prepare($conn, $qry);
        mysqli_stmt_bind_param($stmt, 'i', $user_id);            
        $success = mysqli_stmt_execute($stmt);         
    
        if ($success) {
            $result = mysqli_stmt_get_result($stmt);
            $row = mysqli_fetch_assoc($result);
    
            // Store the session ID, user ID, username, role, and initial character of the name in the session variables
            $_SESSION['ID'] = $row['ID'];            
            $_SESSION['username'] = $row['username'];
            $_SESSION['role'] = $row['role'];
    
            // Return the same response as in the login.php file
            $res = array(
                'role' => $row['role'],
            );
    
            header('Content-Type: application/json');
            echo json_encode($res);
        } else {
            http_response_code(500);
            echo "Access database failed";
        }
    } else {
        http_response_code(500);
        echo "Access database failed";
    }
      
    
    // close DB Connection
    mysqli_close($conn);
}
?>