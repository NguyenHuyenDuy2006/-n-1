<?php
require 'config.php';

// Đọc dữ liệu JSON từ request của Duy
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = htmlspecialchars(strip_tags($data->email));
    $password = $data->password;

    // 1. Kiểm tra email đã tồn tại chưa
    $check_query = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $stmt = $pdo->prepare($check_query);
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email này đã được đăng ký!"]);
        exit();
    }

    // 2. Băm mật khẩu (Bảo mật)
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // 3. Lưu vào Database
    $insert_query = "INSERT INTO users (email, password) VALUES (:email, :password)";
    $insert_stmt = $pdo->prepare($insert_query);

    if ($insert_stmt->execute(['email' => $email, 'password' => $hashed_password])) {
        http_response_code(201);
        echo json_encode(["status" => "success", "message" => "Đăng ký thành công!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Không thể tạo tài khoản lúc này."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Vui lòng điền đủ email và mật khẩu."]);
}
?>