<?php
require 'config.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->title) && !empty($data->description) && isset($data->features)) {
    $icon = !empty($data->icon) ? htmlspecialchars($data->icon) : 'code';
    $title = htmlspecialchars($data->title);
    $description = htmlspecialchars($data->description);
    // Chuyển mảng features thành chuỗi JSON để lưu vào DB
    $features = json_encode($data->features);

    $query = "INSERT INTO services (icon, title, description, features) VALUES (:icon, :title, :desc, :features)";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute(['icon' => $icon, 'title' => $title, 'desc' => $description, 'features' => $features])) {
        http_response_code(201);
        echo json_encode(["status" => "success", "message" => "Đã thêm dịch vụ thành công!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Không thể thêm dịch vụ."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Vui lòng nhập đủ tên, mô tả và danh sách tính năng."]);
}
?>