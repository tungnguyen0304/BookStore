<?php
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('DBConnect.php');

    // Retrieve the input parameters from the URL query string
    $categoryID = isset($_GET['categoryID']) ? mysqli_real_escape_string($conn, $_GET['categoryID']) : '';
    $authorID = isset($_GET['authorID']) ? mysqli_real_escape_string($conn, $_GET['authorID']) : '';
    $manufacturerID = isset($_GET['manufacturerID']) ? mysqli_real_escape_string($conn, $_GET['manufacturerID']) : '';
    $price = isset($_GET['price']) ? $_GET['price'] : '';
    $order = isset($_GET['order']) ? $_GET['order'] : '';
    $dir = isset($_GET['dir']) ? $_GET['dir'] : '';
    $page = isset($_GET['page']) ? mysqli_real_escape_string($conn, $_GET['page']) : '';

    // Set up the base query to fetch products
    $sql = 'SELECT * FROM product';

    // Check if a category ID was provided
    if (!empty($categoryID)) {
        // Add a WHERE clause to filter by category ID
        $sql .= " WHERE categoryID = '$categoryID'";
    }

    // Check if an author ID was provided
    if (!empty($authorID)) {
        // Add a WHERE clause to filter by author ID
        if (strpos($sql, 'WHERE') !== false) {
            // If a WHERE clause has already been added, use AND to add another condition
            $sql .= " AND authorID = '$authorID'";
        } else {
            // Otherwise, start a new WHERE clause
            $sql .= " WHERE authorID = '$authorID'";
        }
    }

    // Check if a manufacturer ID was provided
    if (!empty($manufacturerID)) {
        // Add a WHERE clause to filter by manufacturer ID
        if (strpos($sql, 'WHERE') !== false) {
            // If a WHERE clause has already been added, use AND to add another condition
            $sql .= " AND manufacturerID = '$manufacturerID'";
        } else {
            // Otherwise, start a new WHERE clause
            $sql .= " WHERE manufacturerID = '$manufacturerID'";
        }
    }

    // Check if a price range was provided
    if (!empty($price)) {
        // Split the price range into individual values
        $prices = explode('-', $price);
        $minPrice = mysqli_real_escape_string($conn, $prices[0]);
        $maxPrice = mysqli_real_escape_string($conn, $prices[1]);

        // Add a WHERE clause to filter by price range
        if (strpos($sql, 'WHERE') !== false) {
            // If a WHERE clause has already been added, use AND to add another condition
            $sql .= " AND price >= '$minPrice' AND price <= '$maxPrice'";
        } else {
            // Otherwise, start a new WHERE clause
            $sql .= " WHERE price >= '$minPrice' AND price <= '$maxPrice'";
        }
    }

    // Check if an order parameter was provided
    if (!empty($order)) {
        // Determine the column to order by based on the parameter value
        $orderColumn = $order == 'filter_price' ? 'price' : 'sold_qty';
        $sql .= ' ORDER BY ' . $orderColumn;

        // Check if a direction parameter was also provided
        if (!empty($dir)) {
            // Determine the direction to order by based on the parameter value
            $orderDir = $dir == 'asc' ? 'ASC' : 'DESC';
            $sql .= ' ' . $orderDir;
        }
    }

    // Check if a page parameter was provided
    if (!empty($page)) {
        // Add a LIMIT clause to fetch the appropriate page of results
        $perPage = 20; // Change this value to set the number of results per page
        $offset = ($page - 1) * $perPage;
        $sql .= " LIMIT $offset, $perPage";
    }

    // Execute the query to fetch products
    $result = mysqli_query($conn, $sql);

    // Convert the result set to an array of associative arrays
    $products = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }

    // Return the products as a JSON object
    echo json_encode($products);
}
?>