// Bhadriko Theo Pramudya
// 10123375
// IF9

document.addEventListener('DOMContentLoaded', () => {
    const dosenForm = document.getElementById('tambahDosenForm');
    const dosenTbodyWithActions = document.getElementById('DataDosen');
    const dosenTbodyWithoutActions = document.getElementById('ViewDosen');
    const editModal = document.getElementById('editModal');
    const editDosenForm = document.getElementById('editDosenForm');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const closeModalBtn = document.getElementsByClassName('close')[0];
    const notification = document.getElementById('notification');

    let currentDeleteNIDN = null;

    function fetchDosenData() {
        fetch('../../connection/Dosen.php')
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    console.error(data.message);
                } else {
                    if (dosenTbodyWithActions) {
                        renderTableWithActions(data);
                    }
                    if (dosenTbodyWithoutActions) {
                        renderTableWithoutActions(data);
                    }
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderTableWithActions(dosenData) {
        dosenTbodyWithActions.innerHTML = '';
        dosenData.forEach((dosen, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${dosen.NamaDosen}</td>
                <td>${dosen.NIDN}</td>
                <td>
                    <button onclick="editDosen('${dosen.NIDN}')">Edit</button>
                    <button onclick="confirmDeleteDosen('${dosen.NIDN}')">Hapus</button>
                </td>
            `;
            dosenTbodyWithActions.appendChild(row);
        });
    }

    function renderTableWithoutActions(dosenData) {
        // Urutkan data berdasarkan NamaDosen
        dosenData.sort((a, b) => a.NamaDosen.localeCompare(b.NamaDosen));

        dosenTbodyWithoutActions.innerHTML = '';
        dosenData.forEach((dosen, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${dosen.NamaDosen}</td>
                <td>${dosen.NIDN}</td>
            `;
            dosenTbodyWithoutActions.appendChild(row);
        });
    }

    function showNotification(message, isError = false) {
        console.log('showNotification called with message:', message, 'isError:', isError); // Tambahkan log ini
        notification.innerText = message;
        notification.className = isError ? 'notification error' : 'notification success';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    if (dosenForm) {
        dosenForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(dosenForm);
            fetch('../../connection/Dosen.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchDosenData();
                        dosenForm.reset();
                        showNotification('Dosen berhasil ditambahkan!');
                    } else {
                        showNotification(data.message || 'Gagal menambahkan dosen.', true);
                    }
                })
                .catch(error => {
                    console.error('Error adding data:', error);
                    showNotification('Gagal menambahkan dosen.', true);
                });
        });
    }

    window.editDosen = (nidn) => {
        fetch(`../../connection/Dosen.php?nidn=${nidn}`)
            .then(response => response.json())
            .then(data => {
                const dosen = data[0];
                document.getElementById('editIndex').value = dosen.NIDN;
                document.getElementById('editNamaDosen').value = dosen.NamaDosen;
                document.getElementById('editNidnDosen').value = dosen.NIDN;
                editModal.style.display = 'flex';
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    if (editDosenForm) {
        editDosenForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(editDosenForm);
            fetch('../../connection/Dosen.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchDosenData();
                        closeModal();
                        showNotification('Dosen berhasil diperbarui!');
                    } else {
                        showNotification('Gagal memperbarui dosen.', true);
                    }
                })
                .catch(error => {
                    console.error('Error updating data:', error);
                    showNotification('Gagal memperbarui dosen.', true);
                });
        });
    }

    window.confirmDeleteDosen = (nidn) => {
        currentDeleteNIDN = nidn;
        confirmDeleteModal.style.display = 'flex';
    };

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', () => {
            if (currentDeleteNIDN !== null) {
                fetch('../../connection/Dosen.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nidn: currentDeleteNIDN })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            fetchDosenData();
                            closeConfirmDeleteModal();
                            showNotification('Dosen berhasil dihapus!');
                        } else {
                            showNotification('Gagal menghapus dosen.', true);
                        }
                    })
                    .catch(error => console.error('Error deleting data:', error));
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

    fetchDosenData();
});