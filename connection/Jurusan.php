<?php
// Bhadriko Theo Pramudya
// 10123375
// IF9

require 'koneksi.php';

function getJurusan($conn) {
    $sql = "SELECT * FROM jurusan";
    $result = $conn->query($sql);

    $jurusan = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $jurusan[] = $row;
        }
    }

    return $jurusan;
}

function addJurusan($conn, $kodeJurusan, $namaJurusan) {
    $sql = "INSERT INTO jurusan (KodeJurusan, NamaJurusan) VALUES (?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $kodeJurusan, $namaJurusan);
    
    if ($stmt->execute()) {
        $result = array("success" => true, "message" => "Jurusan berhasil ditambahkan");
    } else {
        $result = array("success" => false, "message" => "Error: " . $stmt->error);
    }

    $stmt->close();
    return $result;
}

function updateJurusan($conn, $oldKodeJurusan, $newKodeJurusan, $namaJurusan) {
    $sql = "UPDATE jurusan SET KodeJurusan = ?, NamaJurusan = ? WHERE KodeJurusan = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $newKodeJurusan, $namaJurusan, $oldKodeJurusan);
    
    if ($stmt->execute()) {
        $result = array("success" => true, "message" => "Jurusan berhasil diupdate");
    } else {
        $result = array("success" => false, "message" => "Error: " . $stmt->error);
    }

    $stmt->close();
    return $result;
}

function deleteJurusan($conn, $kodeJurusan) {
    $sql = "DELETE FROM jurusan WHERE KodeJurusan = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $kodeJurusan);
    
    if ($stmt->execute()) {
        $result = array("success" => true, "message" => "Jurusan berhasil dihapus");
    } else {
        $result = array("success" => false, "message" => "Error: " . $stmt->error);
    }

    $stmt->close();
    return $result;
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['action']) && $_GET['action'] == 'getJurusanCount') {
        $sql = "SELECT COUNT(*) as count FROM jurusan";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        echo json_encode(['count' => $row['count']]);
    } else {
        $jurusan = getJurusan($conn);
        echo json_encode($jurusan);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'add':
                $result = addJurusan($conn, $data['kodeJurusan'], $data['namaJurusan']);
                echo json_encode($result);
                break;
            case 'update':
                $result = updateJurusan($conn, $data['oldKodeJurusan'], $data['newKodeJurusan'], $data['namaJurusan']);
                echo json_encode($result);
                break;
            case 'delete':
                $result = deleteJurusan($conn, $data['kodeJurusan']);
                echo json_encode($result);
                break;
            default:
                echo json_encode(array("success" => false, "message" => "Aksi tidak valid"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Aksi tidak ditemukan"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Metode request tidak valid"));
}

$conn->close();
?>