<?php
require 'config.php';

// Hàm tạo JWT thủ công đơn giản nhưng chuẩn bảo mật
function generate_jwt($payload, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

$secret_key = "KHOA_BAO_MAT_CUA_BAN_DO_NOT_SHARE"; // Đổi thành một chuỗi ngẫu nhiên dài

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = $data->email;

    $query = "SELECT id, email, password FROM users WHERE email = :email LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['email' => $email]);
    
    $user = $stmt->fetch();

    // Đối chiếu mật khẩu
    if ($user && password_verify($data->password, $user['password'])) {
        
        // Tạo JWT Token có hạn 1 giờ
        $payload = [
            "iss" => "localhost",
            "iat" => time(),
            "exp" => time() + (60 * 60), // 1 giờ
            "user_id" => $user['id'],
            "email" => $user['email']
        ];
        
        $jwt = generate_jwt($payload, $secret_key);

        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Đăng nhập thành công!",
            "token" => $jwt,
            "user" => [
                "id" => $user['id'],
                "email" => $user['email']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Sai email hoặc mật khẩu!"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Vui lòng nhập đủ thông tin."]);
}
?>