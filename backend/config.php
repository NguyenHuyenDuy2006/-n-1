<?php
$host = "localhost";
$db_name = "auth_db";
$username_db = "root";
$password_db = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username_db, $password_db);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo = $conn; // Đồng bộ cả $conn và $pdo để không bao giờ bịUndefined Variable
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Lỗi kết nối CSDL: " . $e->getMessage()]);
    exit();
}