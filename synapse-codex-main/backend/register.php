<?php
// Bật CORS cho phép kết nối từ Next.js
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kết nối cơ sở dữ liệu auth_db
$host = "localhost";
$db_name = "auth_db";
$username_db = "root";
$password_db = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username_db, $password_db);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Lỗi kết nối CSDL: " . $e->getMessage()]);
    exit();
}

// Đọc dữ liệu JSON gửi lên từ Next.js
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$full_name = trim($data['full_name'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($username) || empty($email) || empty($full_name) || empty($password)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Vui lòng nhập đầy đủ các trường thông tin."]);
    exit();
}

// Kiểm tra trùng username hoặc email
$checkStmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1");
$checkStmt->execute([$username, $email]);

if ($checkStmt->fetch()) {
    http_response_code(409);
    echo json_encode(["status" => false, "message" => "Tên đăng nhập hoặc email đã tồn tại."]);
    exit();
}

// Mã hóa mật khẩu
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Thêm tài khoản mới vào CSDL
$stmt = $conn->prepare("INSERT INTO users (username, email, full_name, password, role) VALUES (?, ?, ?, ?, 'user')");
$success = $stmt->execute([$username, $email, $full_name, $hashed_password]);

if ($success) {
    echo json_encode(["status" => true, "message" => "Đăng ký tài khoản thành công!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Lỗi lưu tài khoản."]);
}