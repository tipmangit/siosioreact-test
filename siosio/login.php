<?php
session_start();
require 'config.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$response = ['success' => false, 'errors' => []];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $response['errors'][] = "Username and password are required.";
    } else {
        // User login
        $stmt = $con->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row['password'])) {
                $_SESSION['valid'] = $row['username'];
                $_SESSION['name'] = $row['name'];
                $_SESSION['contact'] = $row['contact'];
                $_SESSION['id'] = $row['Id'];
                $response['success'] = true;
                $response['message'] = "Login successful!";
            } else {
                $response['errors'][] = "Invalid password.";
            }
        } else {
            // Admin login
            $stmt = $con->prepare("SELECT * FROM admins WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $admin_result = $stmt->get_result();

            if ($admin = $admin_result->fetch_assoc()) {
                if (password_verify($password, $admin['password_hash'])) {
                    $_SESSION['admin'] = $admin['username'];
                    $_SESSION['admin_id'] = $admin['id'];
                    $response['success'] = true;
                    $response['message'] = "Admin login successful!";
                } else {
                    $response['errors'][] = "Invalid password.";
                }
            } else {
                $response['errors'][] = "User not found.";
            }
        }
        $stmt->close();
    }
}

echo json_encode($response);
?>