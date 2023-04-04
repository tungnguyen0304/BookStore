<?php
// Start the session
session_start();
# 1: user
# 2: admin
function check_access_level($role) {
    // The session ID in the cookie matches the session ID in the session variables
    // So we can assume that the user is authenticated and has access to this page
    if ($_SESSION['role'] >= $role) {
        return 0; # ok
    } else {
        return 2;
    }
}
# 0: ok
# 1: user logged out or session timed out -> redirect user to re-login
# 2: unauthorized access
function check_admin_access() {
    return check_access_level(1);
}
function check_user_access() {
    return check_access_level(0);
}
?>