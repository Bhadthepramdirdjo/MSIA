// Bhadriko Theo pramudya
// 10123375
// I

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('kelasContainer');

    function fetchData() {
        fetch('../connection/GetKelas.php')
            .then(response => response.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    renderCards(data.data);
                } else {
                    console.error("Error fetching data kelas:", data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function renderCards(kelasData) {
        cardContainer.innerHTML = ''; 
        kelasData.forEach(kelas => {
            const kartu = document.createElement('div');
            kartu.className = 'kelas-kartu'; 
            kartu.innerHTML = `
                <h3>${kelas.NamaKelas || "Nama Kelas tidak tersedia"}</h3>
                <p>Nama Dosen Wali: ${kelas.NamaDosen || "Nama Dosen tidak tersedia"}</p>
                <p>Jumlah Mahasiswa: ${kelas.jumlah_mahasiswa || 0}</p>
                <p>Jumlah Matakuliah: ${kelas.jumlah_matakuliah || 0}</p>
                <button onclick="openModal('${kelas.id}')">Lihat Detail</button>
            `;
            cardContainer.appendChild(kartu);
        });
    }

    function openModal(kelasId) {
        fetch(`../connection/GetKelas.php?action=getDetail&id=${kelasId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.kelas) {
                    const modal = document.getElementById('kelasModal');
                    document.getElementById('modalNamaKelas').textContent = data.kelas.NamaKelas;
                    document.getElementById('modalNamaDosen').textContent = data.kelas.NamaDosen;
                    document.getElementById('modalJurusan').textContent = data.kelas.Jurusan;
    
                    const mahasiswaList = document.getElementById('modalDaftarMahasiswa');
                    mahasiswaList.innerHTML = '';
                    if (Array.isArray(data.kelas.mahasiswa)) {
                        data.kelas.mahasiswa.forEach(mahasiswa => {
                            const listItem = document.createElement('li');
                            listItem.textContent = `${mahasiswa.NamaMahasiswa} (${mahasiswa.NIM})`;
                            mahasiswaList.appendChild(listItem);
                        });
                    }
    
                    const matakuliahList = document.getElementById('modalDaftarMatakuliah');
                    matakuliahList.innerHTML = '';
                    if (Array.isArray(data.kelas.matakuliah)) {
                        data.kelas.matakuliah.forEach(matakuliah => {
                            const listItem = document.createElement('li');
                            listItem.textContent = matakuliah.NamaMatakuliah;
                            matakuliahList.appendChild(listItem);
                        });
                    }
    
                    modal.style.display = 'block';
                } else {
                    console.error("Error fetching detail kelas:", data);
                }
            })
            .catch(error => {
                console.error('Error fetching detail:', error);
            });
    }
    

    function closeModal() {
        document.getElementById('kelasModal').style.display = 'none';
    }

    window.openModal = openModal;
    window.closeModal = closeModal;

    fetchData();
});