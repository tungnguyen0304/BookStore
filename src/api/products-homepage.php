<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('DBConnect.php');
    // First, retrieve top 8 products for each category
    $categories = [1, 2, 3, 4, 5];
    $results = array();
    foreach ($categories as $category) {
        $stmt = mysqli_prepare($conn, "
            SELECT *
            FROM product
            WHERE categoryID = ?
            ORDER BY sold_qty DESC
            LIMIT 8
        ");
        mysqli_stmt_bind_param($stmt, 'i', $category);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $results[$category] = $products;
        mysqli_stmt_close($stmt);
    }

    // Next, retrieve top 8 products overall
    $stmt = mysqli_prepare($conn, "
        SELECT *
        FROM product
        ORDER BY sold_qty DESC
        LIMIT 8
    ");
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $results['top_sellers'] = $products;
    mysqli_stmt_close($stmt);

    header('Content-Type: application/json');
    echo json_encode($results);

    mysqli_close($conn);
}
?>