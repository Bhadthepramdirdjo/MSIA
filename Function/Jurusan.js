// Bhadriko Theo Pramudya
// 10123375
// IF9

document.addEventListener('DOMContentLoaded', () => {
    const jurusanForm = document.getElementById('jurusanForm');
    const jurusanTbody = document.getElementById('jurusan-tbody');
    const editJurusanModal = document.getElementById('editJurusanModal');
    const editJurusanForm = document.getElementById('editJurusanForm');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const notification = document.getElementById('notification');
    let currentDeleteKodeJurusan = null;
    let currentEditKodeJurusan = null;

    function fetchJurusanData() {
        fetch('../../connection/jurusan.php')
            .then(response => response.json())
            .then(data => {

                jurusanTbody.innerHTML = '';
                data.forEach((jurusan, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${jurusan.NamaJurusan}</td>
                        <td>${jurusan.KodeJurusan}</td>
                        <td>
                            <button onclick="editJurusan('${jurusan.KodeJurusan}', '${jurusan.NamaJurusan}')">Edit</button>
                            <button onclick="confirmDeleteJurusan('${jurusan.KodeJurusan}')">Hapus</button>
                        </td>
                    `;
                    jurusanTbody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.innerText = message;
        notification.className = isError ? 'notification error show' : 'notification success show';
        notification.style.visibility = 'visible';
        setTimeout(() => {
            notification.classList.remove('show');
            notification.style.visibility = 'hidden';
        }, 3000);
    }

    document.getElementById('jurusanForm').addEventListener('submit', function(event) {
        event.preventDefault();
        showNotification('Jurusan berhasil ditambahkan!');
    });

    jurusanForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const kodeJurusan = document.getElementById('kodeJurusan').value;
        const namaJurusan = document.getElementById('namaJurusan').value;

        fetch('../../connection/jurusan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'add',
                kodeJurusan: kodeJurusan,
                namaJurusan: namaJurusan
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchJurusanData();
                    jurusanForm.reset();
                    showNotification('Jurusan berhasil ditambahkan!');
                } else {
                    showNotification(data.message || 'Gagal menambahkan jurusan, Periksa nama dan Kode jurusan nya.', true);
                }
            })
            .catch(error => console.error('Error adding data:', error));
    });

    window.editJurusan = (kodeJurusan, namaJurusan) => {
        currentEditKodeJurusan = kodeJurusan;
        document.getElementById('editKodeJurusan').value = kodeJurusan;
        document.getElementById('editNamaJurusan').value = namaJurusan;
        editJurusanModal.style.display = 'block';
    };

    editJurusanForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newKodeJurusan = document.getElementById('editKodeJurusan').value;
        const namaJurusan = document.getElementById('editNamaJurusan').value;

        fetch('../../connection/jurusan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'update',
                oldKodeJurusan: currentEditKodeJurusan,
                newKodeJurusan: newKodeJurusan,
                namaJurusan: namaJurusan
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchJurusanData();
                    editJurusanModal.style.display = 'none';
                    showNotification('Jurusan berhasil diperbarui!');
                } else {
                    showNotification(data.message || 'Gagal memperbarui jurusan.', true);
                }
            })
            .catch(error => console.error('Error updating data:', error));
    });

    window.confirmDeleteJurusan = (kodeJurusan) => {
        currentDeleteKodeJurusan = kodeJurusan;
        confirmDeleteModal.style.display = 'block';
    };

    confirmDeleteButton.addEventListener('click', () => {
        if (currentDeleteKodeJurusan !== null) {
            fetch('../../connection/jurusan.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'delete',
                    kodeJurusan: currentDeleteKodeJurusan
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchJurusanData();
                        confirmDeleteModal.style.display = 'none';
                        showNotification('Jurusan berhasil dihapus!');
                    } else {
                        showNotification(data.message || 'Gagal menghapus jurusan.', true);
                    }
                })
                .catch(error => console.error('Error deleting data:', error));
        }
    });

    window.closeEditJurusanModal = () => {
        editJurusanModal.style.display = 'none';
    };

    window.closeConfirmDeleteModal = () => {
        confirmDeleteModal.style.display = 'none';
    };

    fetchJurusanData();
});