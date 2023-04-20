<?php
session_start();
# 0: ok
# 1: user logged out or session timed out -> redirect user to re-login
# 2: unauthorized access
function check_admin_access() {
    // check if the user is logged in and has the 'role' field set in the session variable
    if (isset($_SESSION['ID']) && isset($_SESSION['role'])) {
        $role = $_SESSION['role'];
    
        // check if the user is an admin (role=1)
        if ($role == 1) {
            return;
        } else {
            // other users don't have access to the comment-retrieval action
            http_response_code(401);
            die("Unauthorized access");
        }
    } else {
        // user is not logged in
        http_response_code(408);
        die("Session has timed out or user is not logged in");
    }    
}
function check_user_access() {
    // check if the user is logged in and has the 'role' field set in the session variable
    if (isset($_SESSION['ID']) && isset($_SESSION['role'])) {
        return;
    } else {
        // user is not logged in
        http_response_code(408);
        die("Session has timed out or user is not logged in");
    }    
}
?>