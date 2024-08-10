<?php
require_once 'koneksi.php';

header('Content-Type: application/json');
$response = array("success" => false, "message" => "Unknown error");

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

switch ($method) {
    case 'GET':
        if (isset($_GET['action'])) {
            $action = $_GET['action'];
            switch ($action) {
                case 'getDosen':
                    $result = $conn->query("SELECT NIDN, NamaDosen FROM dosen");
                    $dosen = array();
                    while($row = $result->fetch_assoc()) {
                        $dosen[] = $row;
                    }
                    echo json_encode($dosen);
                    break;
                case 'getMahasiswa':
                    $result = $conn->query("SELECT NIM, NamaMahasiswa FROM mahasiswa");
                    $mahasiswa = array();
                    while($row = $result->fetch_assoc()) {
                        $mahasiswa[] = $row;
                    }
                    echo json_encode($mahasiswa);
                    break;
                case 'getMatakuliah':
                    $result = $conn->query("SELECT KodeMatakuliah, NamaMatakuliah FROM matakuliah");
                    $matakuliah = array();
                    while($row = $result->fetch_assoc()) {
                        $matakuliah[] = $row;
                    }
                    echo json_encode($matakuliah);
                    break;
                case 'getJurusan':
                    $result = $conn->query("SELECT KodeJurusan, NamaJurusan FROM jurusan");
                    $jurusan = array();
                    while($row = $result->fetch_assoc()) {
                        $jurusan[] = $row;
                    }
                    echo json_encode($jurusan);
                    break;
                case 'getKelas':
                    if (isset($_GET['id'])) {
                        $id = $_GET['id'];
                        $kelasQuery = $conn->query("
                            SELECT kelas.NamaKelas, dosen.NamaDosen, jurusan.NamaJurusan
                            FROM kelas
                            LEFT JOIN dosen ON kelas.NIDN = dosen.NIDN
                            LEFT JOIN jurusan ON kelas.KodeJurusan = jurusan.KodeJurusan
                            WHERE kelas.id = $id
                        ");
                        $kelas = $kelasQuery->fetch_assoc();

                        if ($kelas) {
                            $mahasiswaQuery = $conn->query("
                                SELECT mahasiswa.NamaMahasiswa, mahasiswa.NIM 
                                FROM kelasmahasiswa
                                JOIN mahasiswa ON kelasmahasiswa.NIM = mahasiswa.NIM
                                WHERE kelasmahasiswa.NamaKelas = '{$kelas['NamaKelas']}'
                            ");
                            $mahasiswa = array();
                            while($row = $mahasiswaQuery->fetch_assoc()) {
                                $mahasiswa[] = $row;
                            }

                            $matakuliahQuery = $conn->query("
                                SELECT matakuliah.NamaMatakuliah
                                FROM kelasmatakuliah
                                JOIN matakuliah ON kelasmatakuliah.KodeMatakuliah = matakuliah.KodeMatakuliah
                                WHERE kelasmatakuliah.NamaKelas = '{$kelas['NamaKelas']}'
                            ");
                            $matakuliah = array();
                            while($row = $matakuliahQuery->fetch_assoc()) {
                                $matakuliah[] = $row;
                            }

                            $kelas['mahasiswa'] = $mahasiswa;
                            $kelas['matakuliah'] = $matakuliah;

                            echo json_encode(array('success' => true, 'kelas' => $kelas));
                        } else {
                            echo json_encode(array('success' => false, 'message' => 'Kelas tidak ditemukan'));
                        }
                    } else {
                        echo json_encode(array('success' => false, 'message' => 'ID kelas tidak ditemukan'));
                    }
                    break;
                default:
                    echo json_encode(array('success' => false, 'message' => 'Action not recognized'));
                    break;
            }
        } else {
            $result = $conn->query("SELECT kelas.id, kelas.NamaKelas, dosen.NamaDosen, kelas.KodeJurusan FROM kelas LEFT JOIN dosen ON kelas.NIDN = dosen.NIDN");
            $kelas = array();
            while($row = $result->fetch_assoc()) {
                $kelas[] = $row;
            }
            echo json_encode($kelas);
        }
        break;

    case 'POST':
        $namaKelas = $data->NamaKelas;
        $nidn = $data->NIDN;
        $kodeJurusan = $data->KodeJurusan;
        $mahasiswa_ids = $data->mahasiswa_ids;
        $matakuliah_ids = $data->matakuliah_ids;

        $stmt = $conn->prepare("INSERT INTO kelas (NamaKelas, NIDN, KodeJurusan) VALUES (?, ?, ?)");
        if (!$stmt) {
            echo json_encode(array('success' => false, 'message' => 'Preparation failed: ' . $conn->error));
            break;
        }
        $stmt->bind_param("sss", $namaKelas, $nidn, $kodeJurusan);
        if ($stmt->execute()) {
            $kelas_id = $stmt->insert_id;
            foreach ($mahasiswa_ids as $nim) {
                $stmt_mahasiswa = $conn->prepare("INSERT INTO kelasmahasiswa (NamaKelas, NIM) VALUES (?, ?)");
                $stmt_mahasiswa->bind_param("ss", $namaKelas, $nim);
                $stmt_mahasiswa->execute();
            }
            foreach ($matakuliah_ids as $kodeMatakuliah) {
                $stmt_matakuliah = $conn->prepare("INSERT INTO kelasmatakuliah (NamaKelas, KodeMatakuliah) VALUES (?, ?)");
                $stmt_matakuliah->bind_param("ss", $namaKelas, $kodeMatakuliah);
                $stmt_matakuliah->execute();
            }
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Execution failed: ' . $stmt->error));
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            $stmt = $conn->prepare("DELETE FROM kelas WHERE id = ?");
            if (!$stmt) {
                echo json_encode(array('success' => false, 'message' => 'Preparation failed: ' . $conn->error));
                break;
            }
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                echo json_encode(array('success' => true));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Execution failed: ' . $stmt->error));
            }
            $stmt->close();
        } else {
            echo json_encode(array('success' => false, 'message' => 'ID tidak ditemukan'));
        }
        break;

    default:
        echo json_encode(array('success' => false, 'message' => 'Method not allowed'));
        break;
}

$conn->close();
