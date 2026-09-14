<?php
require 'config.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->title) && !empty($data->description)) {
    $id = intval($data->id);
    $icon = !empty($data->icon) ? htmlspecialchars($data->icon) : 'code';
    $title = htmlspecialchars($data->title);
    $description = htmlspecialchars($data->description);
    $features = isset($data->features) ? json_encode($data->features) : '[]';

    $query = "UPDATE services SET icon = :icon, title = :title, description = :desc, features = :features WHERE id = :id";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute(['icon' => $icon, 'title' => $title, 'desc' => $description, 'features' => $features, 'id' => $id])) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Đã cập nhật dịch vụ!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Không thể cập nhật dịch vụ."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Thiếu ID hoặc thông tin bắt buộc."]);
}
?>