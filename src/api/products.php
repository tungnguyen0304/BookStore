<?php
require_once('cors.php');
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('DBConnect.php');

    // Retrieve the input parameters from the URL query string
    $categoryID = isset($_GET['categoryID']) ? mysqli_real_escape_string($conn, $_GET['categoryID']) : '';
    $authorID = isset($_GET['authorID']) ? mysqli_real_escape_string($conn, $_GET['authorID']) : '';
    $manufacturerID = isset($_GET['manufacturerID']) ? mysqli_real_escape_string($conn, $_GET['manufacturerID']) : '';
    $price = isset($_GET['price']) ? $_GET['price'] : '';
    $order = isset($_GET['order']) ? mysqli_real_escape_string($conn, $_GET['order']) : '';
    $dir = isset($_GET['dir']) ? $_GET['dir'] : '';
    $page = isset($_GET['page']) ? mysqli_real_escape_string($conn, $_GET['page']) : '';
    $q = isset($_GET['q']) ? mysqli_real_escape_string($conn, $_GET['q']) : '';

    // Set up the base query to fetch products
    $sql = 'SELECT p.* FROM product p
        LEFT JOIN author a ON p.authorID = a.ID
        LEFT JOIN manufacturer m ON p.manufacturerID = m.ID';

    if (!empty($q)) {
        // Add a WHERE clause to filter by search query
        $sql .= " WHERE p.name LIKE '%$q%' OR a.name LIKE '%$q%' OR m.name LIKE '%$q%'";
    }

    if (!empty($categoryID)) {
        // Add a WHERE clause to filter by category ID
        $sql .= " WHERE categoryID = '$categoryID'";
    }

    if (!empty($authorID)) {
        // Split the author ID string into an array of IDs
        $authorIDs = explode('-', $authorID);
        // Use the array of IDs to create a comma-separated list for use in the SQL query
        $authorIDList = implode(',', $authorIDs);
        // Add a WHERE clause to filter by author IDs
        if (strpos($sql, 'WHERE') !== false) {
            // If a WHERE clause has already been added, use AND to add another condition
            $sql .= " AND authorID IN ($authorIDList)";
        } else {
            // Otherwise, start a new WHERE clause
            $sql .= " WHERE authorID IN ($authorIDList)";
        }
    }

    if (!empty($manufacturerID)) {
        // Split the manufacturer ID string into an array of IDs
        $manufacturerIDs = explode('-', $manufacturerID);
        // Use the array of IDs to create a comma-separated list for use in the SQL query
        $manufacturerIDList = implode(',', $manufacturerIDs);
        // Add a WHERE clause to filter by manufacturer IDs
        if (strpos($sql, 'WHERE') !== false) {
            // If a WHERE clause has already been added, use AND to add another condition
            $sql .= " AND manufacturerID IN ($manufacturerIDList)";
        } else {
            // Otherwise, start a new WHERE clause
            $sql .= " WHERE manufacturerID IN ($manufacturerIDList)";
        }
    }

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

    if (!empty($order)) {
        // Determine the column to order by based on the parameter value
        switch ($order) {
            case 'price':
                $orderColumn = 'price';
                break;
            case 'sold_qty':
                $orderColumn = 'sold_qty';
                break;
            case 'title':
                $orderColumn = 'name';
                break;
            default:
                $orderColumn = 'sold_qty';
                break;
        }
        $sql .= ' ORDER BY ' . $orderColumn;

        // Check if a direction parameter was also provided
        if (!empty($dir)) {
            // Determine the direction to order by based on the parameter value
            $orderDir = $dir == 'asc' ? 'ASC' : 'DESC';
            $sql .= ' ' . $orderDir;
        }
    }
    $remainingCount = 0;
    if (!empty($page)) {
        $perPage = 4;
        $offset = ($page - 1) * $perPage;
        $sql .= " LIMIT $offset, $perPage";
    
        // Execute a separate query to count the total number of products
        $countSql = 'SELECT COUNT(*) AS total_count FROM product p
            LEFT JOIN author a ON p.authorID = a.ID
            LEFT JOIN manufacturer m ON p.manufacturerID = m.ID';
    
        if (!empty($q)) {
            // Add a WHERE clause to filter by search query
            $countSql .= " WHERE p.name LIKE '%$q%' OR a.name LIKE '%$q%' OR m.name LIKE '%$q%'";
        }
    
        if (!empty($categoryID)) {
            // Add a WHERE clause to filter by category ID
            if (strpos($countSql, 'WHERE') !== false) {
                // If a WHERE clause has already been added, use AND to add another condition
                $countSql .= " AND categoryID = '$categoryID'";
            } else {
                // Otherwise, start a new WHERE clause
                $countSql .= " WHERE categoryID = '$categoryID'";
            }
        }
    
        if (!empty($authorID)) {
            // Split the author ID string into an array of IDs
            $authorIDs = explode('-', $authorID);
            // Use the array of IDs to create a comma-separated list for use in the SQL query
            $authorIDList = implode(',', $authorIDs);
            // Add a WHERE clause to filter by author IDs
            if (strpos($countSql, 'WHERE') !== false) {
                // If a WHERE clause has already been added, use AND to add another condition
                $countSql .= " AND authorID IN ($authorIDList)";
            } else {
                // Otherwise, start a new WHERE clause
                $countSql .= " WHERE authorID IN ($authorIDList)";
            }
        }
    
        if (!empty($manufacturerID)) {
            // Split the manufacturer ID string into an array of IDs
            $manufacturerIDs = explode('-', $manufacturerID);
            // Use the array of IDs to create a comma-separated list for use in the SQL query
            $manufacturerIDList = implode(',', $manufacturerIDs);
            // Add a WHERE clause to filter by manufacturer IDs
            if (strpos($countSql, 'WHERE') !== false) {
                // If a WHERE clause has already been added, use AND to add another condition
                $countSql .= " AND manufacturerID IN ($manufacturerIDList)";
            } else {
                // Otherwise, start a new WHERE clause
                $countSql .= " WHERE manufacturerID IN ($manufacturerIDList)";
            }
        }
    
        if (!empty($price)) {
            // Split the price range into individual values
            $prices = explode('-', $price);
            $minPrice = mysqli_real_escape_string($conn, $prices[0]);
            $maxPrice = mysqli_real_escape_string($conn, $prices[1]);
    
            // Add a WHERE clause to filter by price range
            if (strpos($countSql, 'WHERE') !== false) {
                // If a WHERE clause has already been added, use AND to add another condition
                $countSql .= " AND price >= '$minPrice' AND price <= '$maxPrice'";
            } else {
                // Otherwise, start a new WHERE clause
                $countSql .= " WHERE price >= '$minPrice' AND price <= '$maxPrice'";
            }
        }
    
        // Execute the query to count the total number of products
        $countResult = mysqli_query($conn, $countSql);
        $totalCount = mysqli_fetch_assoc($countResult)['total_count'];
    
        // Calculate the number of products left
        $remainingCount = $totalCount - $offset - $perPage;
    }

    // Execute the query to fetch products
    $result = mysqli_query($conn, $sql);

    $res = array();
    // Convert the result set to an array of associative arrays
    $products = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }

    $res['products'] = $products;
    $res['remain_qty'] = $remainingCount;

    // Return the products as a JSON object
    echo json_encode($res);
}
?>