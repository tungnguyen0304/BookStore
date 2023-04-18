<?php
require_once('cors.php');
require_once('DBConnect.php');

// get the productID parameter from the request
$productID = isset($_GET['productID']) ? $_GET['productID'] : '';

// fetch all comments for the given productID
$sql = "SELECT pc.*, u.name FROM product_comment pc JOIN user u ON pc.userID = u.ID WHERE pc.productID = '$productID'";
$result = mysqli_query($conn, $sql);

// return the comments as a JSON array
$comments = array();
while ($row = mysqli_fetch_assoc($result)) {
    $comments[] = $row;
}
header('Content-Type: application/json');
echo json_encode($comments);

// close the database connection
mysqli_close($conn);
?>