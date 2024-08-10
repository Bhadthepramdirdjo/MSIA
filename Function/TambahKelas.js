// Bhadriko Theo Pramudya
// 10123375
// IF9

document.addEventListener('DOMContentLoaded', () => {
    const kelasTbody = document.getElementById('kelasList');
    const addKelasForm = document.getElementById('addKelasForm');
    const notification = document.getElementById('notification');
    let kelasToDelete = null; 

    function fetchKelasData() {
        fetch('../../connection/Kelas.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => renderKelasTable(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderKelasTable(kelasData) {
        kelasTbody.innerHTML = '';
        kelasData.forEach((kelas, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${kelas.NamaKelas}</td>
                <td>${kelas.NamaDosen}</td>
                <td>${kelas.KodeJurusan}</td>
                <td class="aksi-column">
                    <button class="btn btn-warning view-button" data-kelas-id="${kelas.id}" onclick="openViewModal(${kelas.id})">View</button>
                    <button class="btn btn-danger" onclick="showDeleteModal(${kelas.id})">Hapus</button>
                </td>
            `;
            kelasTbody.appendChild(row);
        });
    }

    function showDeleteModal(kelasId) {
        kelasToDelete = kelasId; 
        document.getElementById('deleteModal').style.display = 'block';
    }

    function deleteClass() {
        if (kelasToDelete !== null) {
            fetch(`../../connection/Kelas.php?action=delete&id=${kelasToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    fetchKelasData();
                    showNotification('Kelas berhasil dihapus!', 'success');
                } else {
                    showNotification('Gagal menghapus kelas: ' + data.message, 'error');
                }
                closeDeleteModal(); 
            })
            .catch(error => {
                showNotification('Gagal menghapus kelas: ' + error.message, 'error');
                closeDeleteModal(); 
            });
        }
    }

    function closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        kelasToDelete = null; 
    }


    function fetchDosenData() {
        fetch('../../connection/Kelas.php?action=getDosen')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => renderDosenTable(data))
            .catch(error => console.error('Error fetching dosen data:', error));
    }

    
    function renderDosenTable(dosenData) {
        const dosenList = document.getElementById('dosenList');
        dosenList.innerHTML = '';
        dosenData.forEach((dosen, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${dosen.NamaDosen}</td>
                <td><input type="radio" name="nidn" value="${dosen.NIDN}"></td>
            `;
            dosenList.appendChild(row);
        });
    }

    
    function fetchMahasiswaData() {
        fetch('../../connection/Kelas.php?action=getMahasiswa')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => renderMahasiswaTable(data))
            .catch(error => console.error('Error fetching mahasiswa data:', error));
    }

    
    function renderMahasiswaTable(mahasiswaData) {
        const mahasiswaList = document.getElementById('mahasiswaList');
        mahasiswaList.innerHTML = '';
        mahasiswaData.forEach((mahasiswa, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${mahasiswa.NamaMahasiswa}</td>
                <td>${mahasiswa.NIM}</td>
                <td><input type="checkbox" name="mahasiswa_ids" value="${mahasiswa.NIM}"></td>
            `;
            mahasiswaList.appendChild(row);
        });
    }

    
    function fetchMatakuliahData() {
        fetch('../../connection/Kelas.php?action=getMatakuliah')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => renderMatakuliahTable(data))
            .catch(error => console.error('Error fetching matakuliah data:', error));
    }

    
    function renderMatakuliahTable(matakuliahData) {
        const matakuliahList = document.getElementById('matakuliahList');
        matakuliahList.innerHTML = '';
        matakuliahData.forEach((matakuliah, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${matakuliah.NamaMatakuliah}</td>
                <td><input type="checkbox" name="matakuliah_ids" value="${matakuliah.KodeMatakuliah}"></td>
            `;
            matakuliahList.appendChild(row);
        });
    }

    
    function fetchJurusanData() {
        fetch('../../connection/Kelas.php?action=getJurusan')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => renderJurusanList(data))
            .catch(error => console.error('Error fetching jurusan data:', error));
    }

    function renderJurusanList(jurusanData) {
        const jurusanList = document.getElementById('kodeJurusan');
        jurusanList.innerHTML = '';
        jurusanData.forEach(jurusan => {
            const option = document.createElement('option');
            option.value = jurusan.KodeJurusan;
            option.textContent = jurusan.NamaJurusan;
            jurusanList.appendChild(option);
        });
    }

    function addClass(event) {
        event.preventDefault();
        const formData = new FormData(addKelasForm);
        const data = {
            action: 'create',
            NamaKelas: formData.get('namaKelas'),
            NIDN: formData.get('nidn'),
            KodeJurusan: formData.get('kodeJurusan'),
            mahasiswa_ids: formData.getAll('mahasiswa_ids'),
            matakuliah_ids: formData.getAll('matakuliah_ids')
        };

        fetch('../../connection/Kelas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                fetchKelasData();
                addKelasForm.reset();
                showNotification('Kelas berhasil ditambahkan!', 'success');
            } else {
                showNotification('Gagal menambah data kelas: ' + data.message, 'error');
            }
        })
        .catch(error => {
            showNotification('Gagal menambah data kelas: ' + error.message, 'error');
        });
    }

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function openViewModal(kelasId) {
        fetch(`../../connection/Kelas.php?action=getKelas&id=${kelasId}`)
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    showNotification('Gagal mengambil data kelas: ' + data.message, 'error');
                    return;
                }

                document.getElementById('modalNamaKelas').textContent = data.kelas.NamaKelas;
                document.getElementById('modalNamaDosen').textContent = data.kelas.NamaDosen;
                document.getElementById('modalJurusan').textContent = data.kelas.NamaJurusan;

                const mahasiswaList = document.getElementById('modalDaftarMahasiswa');
                mahasiswaList.innerHTML = '';
                data.kelas.mahasiswa.forEach(mahasiswa => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${mahasiswa.NamaMahasiswa} (${mahasiswa.NIM})`;
                    mahasiswaList.appendChild(listItem);
                });

                const matakuliahList = document.getElementById('modalDaftarMatakuliah');
                matakuliahList.innerHTML = '';
                data.kelas.matakuliah.forEach(matakuliah => {
                    const listItem = document.createElement('li');
                    listItem.textContent = matakuliah.NamaMatakuliah;
                    matakuliahList.appendChild(listItem);
                });

                document.getElementById('viewModal').style.display = 'block';
            })
            .catch(error => {
                showNotification('Gagal mengambil data kelas: ' + error.message, 'error');
            });
    }

    function closeViewModal() {
        document.getElementById('viewModal').style.display = 'none';
    }

    fetchKelasData();
    fetchDosenData();
    fetchMahasiswaData();
    fetchMatakuliahData();
    fetchJurusanData();

    addKelasForm.addEventListener('submit', addClass);

    window.openViewModal = openViewModal;
    window.showDeleteModal = showDeleteModal;
    window.deleteClass = deleteClass;

    const closeModalButton = document.getElementById('closeModal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeViewModal);
    }

    document.getElementById('confirmDelete').addEventListener('click', deleteClass);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
});
