
<?php
require_once 'koneksi.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

switch ($method) {
    case 'GET':
        $result = $conn->query("
            SELECT m.KodeMatakuliah, m.NamaMatakuliah, m.NIDN, d.NamaDosen 
            FROM matakuliah m
            JOIN dosen d ON m.NIDN = d.NIDN
        ");
        $matakuliah = array();
        while($row = $result->fetch_assoc()) {
            $matakuliah[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($matakuliah);
        break;

    case 'POST':
        if (isset($data->action)) {
            if ($data->action == 'addMatakuliah') {
                $stmt = $conn->prepare("INSERT INTO matakuliah (KodeMatakuliah, NamaMatakuliah, NIDN) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $data->kodeMatakuliah, $data->namaMatakuliah, $data->nidn);
                $success = $stmt->execute();
                header('Content-Type: application/json');
                echo json_encode(["success" => $success]);
            } elseif ($data->action == 'updateMatakuliah') {
                $stmt = $conn->prepare("UPDATE matakuliah SET KodeMatakuliah = ?, NamaMatakuliah = ?, NIDN = ? WHERE KodeMatakuliah = ?");
                $stmt->bind_param("ssss", $data->kodeMatakuliahBaru, $data->namaMatakuliah, $data->dosenPengampu, $data->kodeMatakuliahLama);
                $success = $stmt->execute();
                header('Content-Type: application/json');
                echo json_encode(["success" => $success]);
            } elseif ($data->action == 'deleteMatakuliah') {
                $stmt = $conn->prepare("DELETE FROM matakuliah WHERE KodeMatakuliah = ?");
                $stmt->bind_param("s", $data->kode);
                $success = $stmt->execute();
                header('Content-Type: application/json');
                echo json_encode(["success" => $success]);
            }
        }
        break;

    default:
        header('Content-Type: application/json');
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

$conn->close();
?>