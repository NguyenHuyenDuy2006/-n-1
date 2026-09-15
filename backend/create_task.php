<?php
// Cấu hình CORS (Lưu ý: Allow-Methods là POST)
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
$project_id = isset($data['project_id']) ? intval($data['project_id']) : 0;
$assigned_to = isset($data['assigned_to']) ? intval($data['assigned_to']) : 0;
$title = isset($data['title']) ? trim($data['title']) : '';
$description = isset($data['description']) ? trim($data['description']) : '';
$due_date = !empty($data['due_date']) ? trim($data['due_date']) : null; // Có thể null nếu không chọn ngày

// Kiểm tra dữ liệu đầu vào cơ bản
if ($project_id <= 0 || $assigned_to <= 0 || empty($title)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Vui lòng cung cấp đầy đủ thông tin: Dự án, Người thực hiện và Tiêu đề công việc."]);
    exit();
}

try {
    // Thêm task mới vào CSDL
    $sql = "INSERT INTO tasks (project_id, assigned_to, title, description, due_date) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$project_id, $assigned_to, $title, $description, $due_date]);

    // Trả về thông báo thành công
    echo json_encode([
        "status" => true, 
        "message" => "Phân công task thành công!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => false, 
        "message" => "Lỗi CSDL: " . $e->getMessage()
    ]);
}