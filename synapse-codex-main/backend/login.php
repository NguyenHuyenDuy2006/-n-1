<?php
// Cho phép Next.js (port 3000) gọi API mà không bị lỗi CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Trả về HTTP 200 ngay nếu trình duyệt gửi request OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kết nối Cơ sở dữ liệu auth_db
$host = "localhost";
$db_name = "auth_db";
$username_db = "root";
$password_db = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username_db, $password_db);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Lỗi kết nối CSDL: " . $e->getMessage()]);
    exit();
}

// Nhận dữ liệu JSON gửi lên từ Next.js
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$user_login = $data['username'] ?? '';
$pass_login = $data['password'] ?? '';

if (empty($user_login) || empty($pass_login)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Vui lòng nhập đầy đủ tài khoản và mật khẩu."]);
    exit();
}

// Tìm tài khoản trong bảng users
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
$stmt->execute([$user_login]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // Kiểm tra mật khẩu (hỗ trợ cả mật khẩu băm password_hash và mật khẩu lưu thẳng plaintext)
    $password_matched = password_verify($pass_login, $user['password']) || ($pass_login === $user['password']);

    if ($password_matched) {
        // Xóa trường password trước khi trả dữ liệu về frontend
        unset($user['password']);
        echo json_encode([
            "status" => true,
            "message" => "Đăng nhập thành công!",
            "user" => $user
        ]);
    } else {
        echo json_encode(["status" => false, "message" => "Mật khẩu không chính xác."]);
    }
} else {
    echo json_encode(["status" => false, "message" => "Tài khoản không tồn tại."]);
}