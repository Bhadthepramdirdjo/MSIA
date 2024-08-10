// Bhadriko Theo Pramudya
// 10123375
// IF9

document.addEventListener('DOMContentLoaded', () => {
    const tambahMatakuliahForm = document.getElementById('tambahMatakuliahForm');
    const matakuliahTbody = document.getElementById('matakuliah-tbody');
    const editModal = document.getElementById('editModal');
    const editMatakuliahForm = document.getElementById('editMatakuliahForm');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const notification = document.getElementById('notification');
    const searchDosenPengampu = document.getElementById('searchDosenPengampu');
    const searchResultsTbody = document.getElementById('search-results-tbody');
    const editSearchDosenPengampu = document.getElementById('searchEditDosenPengampu');
    const editSearchResultsTbody = document.getElementById('edit-search-results-tbody');
    let currentEditIndex = null;
    let currentDeleteKode = null;
    let matakuliahData = [];
    let dosenData = [];

    function fetchMatakuliahData() {
        fetch('../../connection/Matakuliah.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data matakuliah:', data);
                matakuliahData = data;
                renderMatakuliahTable();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function fetchDosenData() {
        fetch('../../connection/Dosen.php?action=getDosen')
            .then(response => {
                console.log('HTTP response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data dosen:', data);
                dosenData = data;
                renderDosenTable();
                renderEditDosenTable();
            })
            .catch(error => console.error('Error fetching dosen data:', error));
    }

    function showToast(message, isError = false) {
        if (notification) {
            notification.innerText = message;
            notification.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }

    function renderMatakuliahTable() {
        if (matakuliahTbody) {
            matakuliahTbody.innerHTML = '';
            if (matakuliahData.length === 0) {
                matakuliahTbody.innerHTML = '<tr><td colspan="4">Tidak ada data matakuliah</td></tr>';
            } else {
                matakuliahData.forEach((matakuliah, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${matakuliah.KodeMatakuliah}</td>
                        <td>${matakuliah.NamaMatakuliah}</td>
                        <td>${matakuliah.NamaDosen}</td>
                        <td>
                            <button id="editButton-${index}" class="edit-btn">Edit</button>
                            <button id="deleteButton-${index}" class="delete-btn">Hapus</button>
                        </td>
                    `;
                    matakuliahTbody.appendChild(row);

                    document.getElementById(`editButton-${index}`).addEventListener('click', () => editMatakuliah(index));
                    document.getElementById(`deleteButton-${index}`).addEventListener('click', () => confirmDeleteMatakuliah(matakuliah.KodeMatakuliah));
                });
            }
        }
    }

    window.confirmDeleteMatakuliah = confirmDeleteMatakuliah;

    function renderDosenTable() {
        const tbody = document.getElementById('search-results-tbody');
        const searchQuery = document.getElementById('searchDosenPengampu').value.toLowerCase();
        tbody.innerHTML = '';
        dosenData
            .filter(dosen => dosen.NamaDosen.toLowerCase().includes(searchQuery) || dosen.NIDN.toLowerCase().includes(searchQuery))
            .forEach((dosen, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${dosen.NamaDosen}</td>
                    <td>${dosen.NIDN}</td>
                    <td><button type="button" onclick="selectDosen('${dosen.NamaDosen}', '${dosen.NIDN}')">Pilih</button></td>
                `;
                tbody.appendChild(tr);
            });
    }

    function renderEditDosenTable() {
        const tbody = document.getElementById('edit-search-results-tbody');
        const searchQuery = document.getElementById('searchEditDosenPengampu').value.toLowerCase();
        tbody.innerHTML = '';
        dosenData
            .filter(dosen => dosen.NamaDosen.toLowerCase().includes(searchQuery) || dosen.NIDN.toLowerCase().includes(searchQuery))
            .forEach((dosen, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${dosen.NamaDosen}</td>
                    <td>${dosen.NIDN}</td>
                    <td><button type="button" onclick="selectEditDosen('${dosen.NamaDosen}', '${dosen.NIDN}')">Pilih</button></td>
                `;
                tbody.appendChild(tr);
            });
    }

    window.selectDosen = function(namaDosen, nidn) {
        document.getElementById('dosenPengampu').value = `${namaDosen} (${nidn})`;
    };

    window.selectEditDosen = function(namaDosen, nidn) {
        document.getElementById('editDosenPengampu').value = `${namaDosen} (${nidn})`;
    };

    searchDosenPengampu.addEventListener('input', renderDosenTable);
    editSearchDosenPengampu.addEventListener('input', renderEditDosenTable);

    function isDuplicateMatakuliah(namaMatakuliah, kodeMatakuliah) {
        return matakuliahData.some(matakuliah => 
            matakuliah.NamaMatakuliah === namaMatakuliah || matakuliah.KodeMatakuliah === kodeMatakuliah
        );
    }

    function addMatakuliah(event) {
        event.preventDefault();
        const namaMatakuliah = document.getElementById('namaMatakuliah').value;
        const kodeMatakuliah = document.getElementById('kodeMatakuliah').value;
        const dosenPengampu = document.getElementById('dosenPengampu').value.split(' (')[1].slice(0, -1);

        if (isDuplicateMatakuliah(namaMatakuliah, kodeMatakuliah)) {
            showToast('Matakuliah dengan kode tersebut sudah ada', true);
            return;
        }

        fetch('../../connection/Matakuliah.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'addMatakuliah',
                namaMatakuliah: namaMatakuliah,
                kodeMatakuliah: kodeMatakuliah,
                nidn: dosenPengampu
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchMatakuliahData();
                showToast('Matakuliah berhasil ditambahkan!');
                tambahMatakuliahForm.reset();
            } else {
                showToast('Gagal menambahkan Matakuliah', true);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    window.editMatakuliah = function(index) {
        currentEditIndex = index;
        const matakuliah = matakuliahData[index];
        document.getElementById('editNamaMatakuliah').value = matakuliah.NamaMatakuliah;
        document.getElementById('editKodeMatakuliahLama').value = matakuliah.KodeMatakuliah;
        document.getElementById('editKodeMatakuliahBaru').value = matakuliah.KodeMatakuliah;
        document.getElementById('editDosenPengampu').value = matakuliah.NIDN;
        editModal.style.display = 'block';
    };

    window.closeModal = function() {
        if (editModal) {
            editModal.style.display = 'none';
        }
    };

    window.closeConfirmDeleteModal = function() {
        if (confirmDeleteModal) {
            confirmDeleteModal.style.display = 'none';
        }
    };

    function updateMatakuliah(event) {
        event.preventDefault();
        const namaMatakuliah = document.getElementById('editNamaMatakuliah').value;
        const kodeMatakuliahLama = document.getElementById('editKodeMatakuliahLama').value;
        const kodeMatakuliahBaru = document.getElementById('editKodeMatakuliahBaru').value;
        const dosenPengampu = document.getElementById('editDosenPengampu').value.split(' (')[1].slice(0, -1);

        if (isDuplicateMatakuliah(namaMatakuliah, kodeMatakuliahBaru) && kodeMatakuliahLama !== kodeMatakuliahBaru) {
            showToast('Matakuliah dengan kode tersebut sudah ada', true);
            return;
        }

        fetch('../../connection/Matakuliah.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateMatakuliah',
                namaMatakuliah: namaMatakuliah,
                kodeMatakuliahLama: kodeMatakuliahLama,
                kodeMatakuliahBaru: kodeMatakuliahBaru,
                dosenPengampu: dosenPengampu
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchMatakuliahData();
                showToast('Matakuliah berhasil diperbarui!');
                closeModal();
            } else {
                showToast('Gagal memperbarui Matakuliah', true);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function confirmDeleteMatakuliah(kode) {
        currentDeleteKode = kode;
        console.log(`Kode matakuliah yang akan dihapus: ${currentDeleteKode}`);
        if (confirmDeleteModal) {
            confirmDeleteModal.style.display = 'block';
        }
    }

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', () => {
            console.log(`Attempting to delete matakuliah with kode: ${currentDeleteKode}`);
            const url = '../../connection/Matakuliah.php';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'deleteMatakuliah',
                    kode: currentDeleteKode
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                if (data.success) {
                    fetchMatakuliahData();
                    showToast('Matakuliah berhasil dihapus!');
                    closeConfirmDeleteModal();
                } else {
                    showToast('Gagal menghapus Matakuliah', true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Gagal menghapus Matakuliah', true);
            });
        });
    }

    if (tambahMatakuliahForm) {
        tambahMatakuliahForm.addEventListener('submit', addMatakuliah);
    }

    if (editMatakuliahForm) {
        editMatakuliahForm.addEventListener('submit', updateMatakuliah);
    }

    fetchMatakuliahData();
    fetchDosenData();
});