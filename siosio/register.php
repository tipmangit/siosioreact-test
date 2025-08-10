<?php
require 'config.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$response = ['success' => false, 'errors' => []];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $username = trim($_POST['username'] ?? '');
    $contact = trim($_POST['contact'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $security_answer = trim($_POST['security_answer'] ?? '');

    // Name validation
    if (!preg_match("/^[a-zA-Z\s'-]+$/", $name)) {
        $response['errors'][] = "Invalid name. Use letters, spaces, apostrophes, or hyphens only.";
    }
    // Username validation
    if (!preg_match("/^[a-zA-Z0-9]+$/", $username)) {
        $response['errors'][] = "Invalid username. Use letters and numbers only, no spaces or special characters.";
    }
    // Unique username check
    $check = $con->prepare("SELECT username FROM users WHERE username = ?");
    $check->bind_param("s", $username);
    $check->execute();
    $result = $check->get_result();
    if ($result && $result->num_rows > 0) {
        $response['errors'][] = "Username is already taken. Please try another.";
    }
    // Contact number validation (Philippines)
    if (!preg_match('/^(\+63|0)9\d{9}$/', $contact)) {
        $response['errors'][] = "Invalid contact number. Must be a valid Philippine number.";
    }
    // Password validations
    if ($password !== $confirm_password) {
        $response['errors'][] = "Passwords do not match.";
    }
    if (strlen($password) < 8) {
        $response['errors'][] = "Password must be at least 8 characters long.";
    }
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/', $password)) {
        $response['errors'][] = "Password must include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    if (empty($security_answer)) {
        $response['errors'][] = "Security answer is required.";
    }

    // If no errors, register user
    if (empty($response['errors'])) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $con->prepare("INSERT INTO users (name, username, contact, password, security_answer) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $username, $contact, $hashed_password, $security_answer);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Registration successful!";
        } else {
            $response['errors'][] = "Registration failed. Please try again.";
        }
        $stmt->close();
    }
    $check->close();
}

echo json_encode($response);
?>