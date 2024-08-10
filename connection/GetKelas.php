
<?php
// Bhadriko Theo Pramudya
// 10123375
// IF9
require_once 'koneksi.php';

header('Content-Type: application/json');
$response = array("success" => false, "message" => "Unknown error");

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'getDetail' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $result = $conn->query("SELECT kelas.*, dosen.NamaDosen, jurusan.NamaJurusan FROM kelas 
                            LEFT JOIN dosen ON kelas.NIDN = dosen.NIDN 
                            LEFT JOIN jurusan ON kelas.KodeJurusan = jurusan.KodeJurusan 
                            WHERE kelas.id = $id");

    if ($result->num_rows > 0) {
        $kelas = $result->fetch_assoc();

        
        $result_mahasiswa = $conn->query("SELECT mahasiswa.NamaMahasiswa, mahasiswa.NIM FROM kelasmahasiswa LEFT JOIN mahasiswa ON kelasmahasiswa.NIM = mahasiswa.NIM WHERE kelasmahasiswa.NamaKelas = '{$kelas['NamaKelas']}'");
        $kelas['mahasiswa'] = $result_mahasiswa->fetch_all(MYSQLI_ASSOC);

        $result_matakuliah = $conn->query("SELECT matakuliah.NamaMatakuliah FROM kelasmatakuliah LEFT JOIN matakuliah ON kelasmatakuliah.KodeMatakuliah = matakuliah.KodeMatakuliah WHERE kelasmatakuliah.NamaKelas = '{$kelas['NamaKelas']}'");
        $kelas['matakuliah'] = $result_matakuliah->fetch_all(MYSQLI_ASSOC);

        $response = array("success" => true, "kelas" => $kelas);
    } else {
        $response = array("success" => false, "message" => "ID kelas tidak ditemukan");
    }
} else {
    $result = $conn->query("SELECT kelas.id, kelas.NamaKelas, dosen.NamaDosen, 
                            (SELECT COUNT(*) FROM kelasmahasiswa WHERE kelasmahasiswa.NamaKelas = kelas.NamaKelas) AS jumlah_mahasiswa, 
                            (SELECT COUNT(*) FROM kelasmatakuliah WHERE kelasmatakuliah.NamaKelas = kelas.NamaKelas) AS jumlah_matakuliah 
                            FROM kelas 
                            LEFT JOIN dosen ON kelas.NIDN = dosen.NIDN");

    $kelas_data = array();
    while($row = $result->fetch_assoc()) {
        $kelas_data[] = $row;
    }

    $response = array("success" => true, "data" => $kelas_data);
}

echo json_encode($response);
$conn->close();
?>
