<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    $stmt = $conn->prepare("SELECT * FROM services ORDER BY id ASC");
    $stmt->execute();
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($services as &$service) {
        if (!empty($service['features'])) {
            $jsonDecoded = json_decode($service['features'], true);
            if (is_array($jsonDecoded)) {
                $service['features'] = $jsonDecoded;
            } else {
                // Tách theo dấu xuống dòng \n nếu trong CSDL là chuỗi thường
                $service['features'] = array_values(array_filter(explode("\n", str_replace("\r", "", $service['features']))));
            }
        } else {
            $service['features'] = [];
        }
    }

    echo json_encode(["status" => true, "data" => $services], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Lỗi CSDL: " . $e->getMessage()]);
}