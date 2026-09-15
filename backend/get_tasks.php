<?php
// Cấu hình CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

// Kết nối CSDL
require_once 'config.php';

// Lấy project_id từ URL (GET)
$project_id = isset($_GET['project_id']) ? intval($_GET['project_id']) : 0;

if ($project_id <= 0) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Thiếu hoặc sai định dạng project_id."]);
    exit();
}

try {
    // Câu truy vấn JOIN để lấy dữ liệu task kèm tên người được phân công
    $sql = "SELECT tasks.*, users.username AS assignee_name 
            FROM tasks 
            JOIN users ON tasks.assigned_to = users.id 
            WHERE tasks.project_id = ? 
            ORDER BY tasks.created_at DESC";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute([$project_id]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => true, 
        "data" => $tasks
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => false, 
        "message" => "Lỗi CSDL: " . $e->getMessage()
    ]);
}