<?php
require 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM services ORDER BY id ASC");
    $services = $stmt->fetchAll();

    // Chuyển đổi chuỗi JSON features thành Array để Duy dễ map() bên React
    foreach ($services as &$service) {
        $service['features'] = json_decode($service['features']);
    }

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $services]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Lỗi server: " . $e->getMessage()]);
}
?>