<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$id = $data['id'] ?? null;
$title = trim($data['title'] ?? '');
$description = trim($data['description'] ?? '');
$icon = trim($data['icon'] ?? 'code');
$features = $data['features'] ?? '';

if (!$id || empty($title) || empty($description)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Thiếu ID hoặc thông tin cập nhật."]);
    exit();
}

try {
    $stmt = $conn->prepare("UPDATE services SET title = ?, description = ?, icon = ?, features = ? WHERE id = ?");
    $stmt->execute([$title, $description, $icon, $features, $id]);

    echo json_encode(["status" => true, "message" => "Cập nhật thành công!"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Lỗi CSDL: " . $e->getMessage()]);
}