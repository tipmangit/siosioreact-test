<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

$con = mysqli_connect("localhost","root","","siosio_store") or die(json_encode([
    "success" => false,
    "error" => "Database connection failed"
]));

// Set charset to handle special characters
mysqli_set_charset($con, "utf8mb4");
?>