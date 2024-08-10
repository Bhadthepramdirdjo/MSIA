
<?php
// Bhadriko Theo Pramudya
// 10123375
// IF9
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "sia"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
