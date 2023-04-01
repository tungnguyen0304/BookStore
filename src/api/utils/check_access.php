<?php
// Start the session
session_start();
# 1: user
# 2: admin
function check_access_level($role) {
    // Check if the session ID in the cookie matches the session ID in the session variables
    if ($_COOKIE['session_id'] == $_SESSION['session_id']) {
        // The session ID in the cookie matches the session ID in the session variables
        // So we can assume that the user is authenticated and has access to this page
        if ($_SESSION['role'] >= $role) {
            return 0; # ok
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}
# 0: ok
# 1: user logged out or session timed out -> redirect user to re-login
# 2: unauthorized access
function check_admin_access() {
    return check_access_level(2);
}
function check_user_access() {
    return check_access_level(1);
}
?>