<?php

// Bhadriko Theo Pramudya
// 10123375
// IF9

header('Content-Type: application/json');

require 'koneksi.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        if (isset($_POST['namaDosen']) && isset($_POST['nidnDosen'])) {
            $namaDosen = $_POST['namaDosen'];
            $nidnDosen = $_POST['nidnDosen'];

            $checkSql = "SELECT * FROM dosen WHERE NIDN = ?";
            $checkStmt = $conn->prepare($checkSql);
            $checkStmt->bind_param("s", $nidnDosen);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();

            if ($checkResult->num_rows > 0) {
                echo json_encode(['success' => false, 'message' => 'NIDN Tidak Boleh Sama']);
            } else {
                $sql = "INSERT INTO dosen (NamaDosen, NIDN) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ss", $namaDosen, $nidnDosen);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to add dosen']);
                }

                $stmt->close();
            }

            $checkStmt->close();
        } elseif (isset($_POST['editIndex']) && isset($_POST['editNamaDosen']) && isset($_POST['editNidnDosen'])) {
            $nidn = $_POST['editIndex'];
            $namaDosen = $_POST['editNamaDosen'];
            $nidnDosen = $_POST['editNidnDosen'];

            $sql = "UPDATE dosen SET NamaDosen = ?, NIDN = ? WHERE NIDN = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $namaDosen, $nidnDosen, $nidn);

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update dosen']);
            }

            $stmt->close();
        } else {
            $data = json_decode(file_get_contents('php://input'), true);
            $nidn = $data['nidn'];

            $sql = "DELETE FROM dosen WHERE NIDN = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $nidn);

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to delete dosen']);
            }

            $stmt->close();
        }
        break;

    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] == 'getDosenCount') {
            $sql = "SELECT COUNT(*) as count FROM dosen";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();
            echo json_encode(['count' => $row['count']]);
        } elseif (isset($_GET['nidn'])) {
            $nidn = $_GET['nidn'];
            $sql = "SELECT * FROM dosen WHERE NIDN = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $nidn);
            $stmt->execute();
            $result = $stmt->get_result();
            $dosen = $result->fetch_assoc();
            echo json_encode([$dosen]);
            $stmt->close();
        } else {
            $sql = "SELECT * FROM dosen";
            $result = $conn->query($sql);
            $dosen = [];
            while ($row = $result->fetch_assoc()) {
                $dosen[] = $row;
            }
            echo json_encode($dosen);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
        break;
}

$conn->close();
?>