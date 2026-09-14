<?php
// Xử lý CORS cho phép Frontend của Duy gọi API
header("Access-Control-Allow-Origin: *"); // Hoặc thay * bằng 'http://localhost:3000' để bảo mật hơn
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Xử lý preflight request từ axios/fetch của Duy
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Thông tin kết nối Database
$host = "localhost";
$db_name = "auth_db";
$username = "root"; // Đổi nếu bạn dùng user khác
$password = "";     // Đổi nếu có mật khẩu

try {
    $pdo = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $exception) {
    echo json_encode(["status" => "error", "message" => "Lỗi kết nối CSDL: " . $exception->getMessage()]);
    exit();
}
?>