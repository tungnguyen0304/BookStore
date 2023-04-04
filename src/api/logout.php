<?php
require_once('cors.php');
// Start the session
session_start();

// Invalidate the session ID
$_SESSION['session_id'] = null;

// Remove the session data
session_unset();
session_destroy();

// Delete the session ID cookie
// setcookie('session_id', '', time() - 31536000, '/');
?>