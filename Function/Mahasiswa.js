// Bhadriko Theo Pramudya
// 10123375
// IF9

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const mahasiswaForm = document.getElementById("tambahMahasiswaForm");
    const editMahasiswaForm = document.getElementById("editMahasiswaForm");
    const mahasiswaTbody = document.getElementById("mahasiswa-tbody");
    const notification = document.getElementById("notification");
    const editModal = document.getElementById("editModal");
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const closeModalBtn = document.getElementsByClassName('close')[0];

    let currentEditIndex = null;
    let currentDeleteNIM = null;


    function showNotification(success, message) {
        const notification = document.getElementById("notification");
        notification.innerText = message;
        notification.className = success ? 'notification success show' : 'notification error show';
        setTimeout(() => {
            notification.className = success ? 'notification success' : 'notification error';
        }, 3000);
    }

  
    function fetchMahasiswaData() {
        fetch('../../connection/Mahasiswa.php')
            .then(response => response.json())
            .then(data => {
                mahasiswaTbody.innerHTML = "";
                data.forEach((mahasiswa, index) => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${mahasiswa.NamaMahasiswa}</td>
                        <td>${mahasiswa.JenisKelamin}</td>
                        <td>${mahasiswa.NIM}</td>
                        <td>
                            <button onclick="editMahasiswa('${mahasiswa.NIM}')">Edit</button>
                            <button onclick="confirmDeleteMahasiswa('${mahasiswa.NIM}')">Hapus</button>
                        </td>
                    `;

                    mahasiswaTbody.appendChild(row);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    if (mahasiswaForm) {
        mahasiswaForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(mahasiswaForm);
            formData.append('action', 'add');

            fetch('../../connection/Mahasiswa.php', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification(true, "Mahasiswa berhasil ditambahkan!");
                    fetchMahasiswaData();
                    mahasiswaForm.reset();
                } else {
                    showNotification(false, data.message || 'Gagal menambahkan mahasiswa.');
                }
            })
            .catch(error => {
                console.error('Error adding data:', error);
                showNotification(false, 'Gagal menambahkan mahasiswa.');
            });
        });
    }

    window.editMahasiswa = function(nim) {
        fetch(`../../connection/Mahasiswa.php?nim=${nim}`)
            .then(response => response.json())
            .then(data => {
                const mahasiswa = data[0];
                currentEditIndex = mahasiswa.NIM;

                document.getElementById("editNamaMahasiswa").value = mahasiswa.NamaMahasiswa;
                document.getElementById("editJenisKelamin").value = mahasiswa.JenisKelamin;
                document.getElementById("editNimMahasiswa").value = mahasiswa.NIM;
                editModal.style.display = 'flex';
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    if (editMahasiswaForm) {
        editMahasiswaForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(editMahasiswaForm);
            formData.append('action', 'edit');
            formData.append('oldNIM', currentEditIndex); 
            formData.append('newNIM', document.getElementById("editNimMahasiswa").value); 

            fetch('../../connection/Mahasiswa.php', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchMahasiswaData();
                    closeModal();
                    showNotification(true, "Mahasiswa berhasil diperbarui!");
                } else {
                    showNotification(false, data.message || 'Gagal memperbarui mahasiswa.');
                }
            })
            .catch(error => {
                console.error('Error updating data:', error);
                showNotification(false, 'Gagal memperbarui mahasiswa.');
            });
        });
    }

    window.confirmDeleteMahasiswa = function(nim) {
        currentDeleteNIM = nim;
        confirmDeleteModal.style.display = "block";
    };

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener("click", () => {
            if (currentDeleteNIM !== null) {
                fetch('../../connection/Mahasiswa.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'delete', nim: currentDeleteNIM })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchMahasiswaData();
                        closeConfirmDeleteModal();
                        showNotification(true, "Mahasiswa berhasil dihapus!");
                    } else {
                        showNotification(false, 'Gagal menghapus mahasiswa mungkin sudah terdaftar dalam kelas.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting data:', error);
                    showNotification(false, 'Gagal menghapus mahasiswa mungkin sudah terdaftar dalam kelas.');
                });
            }
        });
    }

    function closeModal() {
        editModal.style.display = 'none';
    }

    function closeConfirmDeleteModal() {
        confirmDeleteModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == editModal) {
            closeModal();
        } else if (event.target == confirmDeleteModal) {
            closeConfirmDeleteModal();
        }
    };

    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            closeModal();
        };
    }

    fetchMahasiswaData();
});