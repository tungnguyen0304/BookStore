<?php
require_once('../cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('../DBConnect.php');
    require_once('../utils/test_input.php');
    require_once('../utils/check_access.php');

    check_admin_access();

    // sanitize and validate the q parameter
    $q = isset($_GET['q']) ? test_input($_GET['q']) : '';

    // prepare a statement to fetch products
    if ($q === '') {
        $stmt = mysqli_prepare($conn, 'SELECT p.*, a.name AS author_name, m.name AS manufacturer_name, c.name AS category_name FROM product p 
        LEFT JOIN author a ON p.authorID = a.ID 
        LEFT JOIN manufacturer m ON p.manufacturerID = m.ID 
        LEFT JOIN category c ON p.categoryID = c.ID');
    } else {
        $q = '%'.$q.'%';
        $stmt = mysqli_prepare($conn, 'SELECT p.*, a.name AS author_name, m.name AS manufacturer_name, c.name AS category_name FROM product p 
        LEFT JOIN author a ON p.authorID = a.ID 
        LEFT JOIN manufacturer m ON p.manufacturerID = m.ID 
        LEFT JOIN category c ON p.categoryID = c.ID 
        WHERE p.name LIKE ? OR p.unique_name LIKE ? OR p.description LIKE ? OR a.name LIKE ? OR m.name LIKE ? OR c.name LIKE ?');
        mysqli_stmt_bind_param($stmt, 'ssssss', $q, $q, $q, $q, $q, $q);
    }

    // execute the statement and fetch the results
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $products = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($products) {
        header('Content-Type: application/json');
        echo json_encode($products);
    } else {
        http_response_code(404);
        echo "No products match";
    }

    // close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>