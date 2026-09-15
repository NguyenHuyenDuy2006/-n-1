<?php
// Cấu hình CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Chống trình duyệt lưu cache
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// Đọc luồng dữ liệu JSON gửi lên từ Frontend
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Bóc tách dữ liệu
$id = isset($data['id']) ? intval($data['id']) : 0;
$progress = isset($data['progress']) ? intval($data['progress']) : 0;
$status = isset($data['status']) ? trim($data['status']) : '';

// Kiểm tra tính hợp lệ cơ bản
if ($id <= 0 || empty($status)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Thiếu ID hoặc trạng thái công việc."]);
    exit();
}

// Giới hạn tiến độ nằm trong khoảng 0 - 100%
if ($progress < 0) $progress = 0;
if ($progress > 100) $progress = 100;

try {
    // Thực hiện cập nhật vào bảng tasks
    $sql = "UPDATE tasks SET progress = ?, status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$progress, $status, $id]);

    // Trả về thông báo thành công
    echo json_encode([
        "status" => true, 
        "message" => "Cập nhật tiến độ thành công!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => false, 
        "message" => "Lỗi CSDL: " . $e->getMessage()
    ]);
}