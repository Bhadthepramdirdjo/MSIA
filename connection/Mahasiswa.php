
<?php
// Bhadriko Theo Pramudya
// 10123375
// IF9
header('Content-Type: application/json');

require 'koneksi.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] == 'getMahasiswaCount') {
            $sql = "SELECT COUNT(*) as count FROM mahasiswa";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();
            echo json_encode(['count' => $row['count']]);
        } elseif (isset($_GET['nim'])) {
            $nim = $_GET['nim'];
            $sql = "SELECT * FROM mahasiswa WHERE NIM = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $nim);
            $stmt->execute();
            $result = $stmt->get_result();
            $mahasiswa = $result->fetch_assoc();
            echo json_encode([$mahasiswa]);
        } else {
            $sql = "SELECT * FROM mahasiswa";
            $result = $conn->query($sql);
            $mahasiswa = [];
            while ($row = $result->fetch_assoc()) {
                $mahasiswa[] = $row;
            }
            echo json_encode($mahasiswa);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['action'])) {
            switch ($data['action']) {
                case 'add':
                    $NIM = $data['nimMahasiswa'];
                    $NamaMahasiswa = $data['namaMahasiswa'];
                    $JenisKelamin = $data['jenisKelamin'];

                    $checkSql = "SELECT COUNT(*) as count FROM mahasiswa WHERE NIM = ?";
                    $checkStmt = $conn->prepare($checkSql);
                    $checkStmt->bind_param("s", $NIM);
                    $checkStmt->execute();
                    $checkResult = $checkStmt->get_result();
                    $row = $checkResult->fetch_assoc();

                    if ($row['count'] > 0) {
                        echo json_encode(['success' => false, 'message' => 'NIM tidak bisa sama']);
                    } else {
                        $sql = "INSERT INTO mahasiswa (NIM, NamaMahasiswa, JenisKelamin) VALUES (?, ?, ?)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("sss", $NIM, $NamaMahasiswa, $JenisKelamin);

                        if ($stmt->execute()) {
                            echo json_encode(['success' => true]);
                        } else {
                            echo json_encode(['success' => false, 'message' => 'Failed to add Mahasiswa']);
                        }

                        $stmt->close();
                    }

                    $checkStmt->close();
                    break;

                case 'edit':
                    $oldNIM = $data['oldNIM'];
                    $newNIM = $data['newNIM'];
                    $NamaMahasiswa = $data['NamaMahasiswa'];
                    $JenisKelamin = $data['JenisKelamin'];

                    $checkNIMSql = "SELECT NIM FROM mahasiswa WHERE NIM = ? AND NIM != ?";
                    $checkNIMStmt = $conn->prepare($checkNIMSql);
                    $checkNIMStmt->bind_param("ss", $newNIM, $oldNIM);
                    $checkNIMStmt->execute();
                    $checkNIMStmt->store_result();

                    if ($checkNIMStmt->num_rows > 0) {
                        echo json_encode(['success' => false, 'message' => 'NIM sudah ada.']);
                        $checkNIMStmt->close();
                        $conn->close();
                        exit();
                    }

                    $checkNIMStmt->close();

                    $sql = "UPDATE mahasiswa SET NIM = ?, NamaMahasiswa = ?, JenisKelamin = ? WHERE NIM = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ssss", $newNIM, $NamaMahasiswa, $JenisKelamin, $oldNIM);

                    if ($stmt->execute()) {
                        echo json_encode(['success' => true]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to update Mahasiswa']);
                    }

                    $stmt->close();
                    break;

                case 'delete':
                    if (isset($data['nim'])) {
                        $nim = $data['nim'];

                        $sql = "DELETE FROM mahasiswa WHERE NIM = ?";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("s", $nim);

                        if ($stmt->execute()) {
                            echo json_encode(['success' => true]);
                        } else {
                            echo json_encode(['success' => false, 'message' => 'Failed to delete mahasiswa']);
                        }

                        $stmt->close();
                    } else {
                        echo json_encode(['success' => false, 'message' => 'NIM is required']);
                    }
                    break;

                default:
                    echo json_encode(['success' => false, 'message' => 'Invalid action']);
                    break;
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Action is required']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
        break;
}

$conn->close();
?>
