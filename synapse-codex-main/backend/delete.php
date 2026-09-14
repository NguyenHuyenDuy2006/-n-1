<?php
require 'config.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $id = intval($data->id);

    $query = "DELETE FROM services WHERE id = :id";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute(['id' => $id])) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Đã xóa dịch vụ!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Lỗi khi xóa dịch vụ."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Không tìm thấy ID dịch vụ cần xóa."]);
}
?>