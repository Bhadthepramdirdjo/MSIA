// Bhadriko Theo Pramudya
// 10123375
// IF9

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); 

    function fetchMahasiswaCount() {
        return fetch('../connection/Mahasiswa.php?action=getMahasiswaCount')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Mahasiswa count:', data.count); 
                return data.count;
            })
            .catch(error => {
                console.error('Error fetching mahasiswa count:', error);
                return 0;
            });
    }

    function fetchDosenCount() {
        return fetch('../connection/Dosen.php?action=getDosenCount')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dosen count:', data.count); 
                return data.count;
            })
            .catch(error => {
                console.error('Error fetching dosen count:', error);
                return 0;
            });
    }

    function fetchJurusanCount() {
        return fetch('../connection/Jurusan.php?action=getJurusanCount')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Jurusan count:', data.count); 
                return data.count;
            })
            .catch(error => {
                console.error('Error fetching jurusan count:', error);
                return 0;
            });
    }

    function animateNumber(element, start, end, duration) {
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const progress = currentTime - startTime;
            const currentNumber = Math.min(Math.floor(progress / duration * (end - start) + start), end);
            element.textContent = currentNumber;
            if (currentNumber < end) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    function updateChart(chart, data) {
        console.log('Updating chart with data:', data); 
        chart.data.datasets[0].data = data;
        chart.update();
    }

    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, { 
        type: 'doughnut',
        data: {
            labels: ['Mahasiswa', 'Dosen', 'Jurusan'],
            datasets: [{
                data: [0, 0, 0], 
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false 
                },
                datalabels: {
                    color: '#000',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: (value, context) => {
                        let label = context.chart.data.labels[context.dataIndex];
                        return label + '\n' + value;
                    }
                }
            },
            cutout: '50%'
        },
        plugins: [ChartDataLabels]
    });

    Promise.all([fetchMahasiswaCount(), fetchDosenCount(), fetchJurusanCount()])
        .then(([totalMahasiswa, totalDosen, totalJurusan]) => {
            const totalMahasiswaElement = document.getElementById('totalMahasiswa');
            const totalDosenElement = document.getElementById('totalDosen');
            const totalJurusanElement = document.getElementById('totalJurusan');

            animateNumber(totalMahasiswaElement, 0, totalMahasiswa, 750);
            animateNumber(totalDosenElement, 0, totalDosen, 750);
            animateNumber(totalJurusanElement, 0, totalJurusan, 750);

            updateChart(myPieChart, [totalMahasiswa, totalDosen, totalJurusan]);

            const totalData = totalMahasiswa + totalDosen + totalJurusan;
            document.getElementById('chartLabel').textContent = 'Total';
            document.getElementById('chartValue').textContent = " ";
        })
        .catch(error => {
            console.error('Error updating dashboard:', error);
        });

    document.getElementById('myPieChart').addEventListener('mousemove', function(event) {
        const activePoints = myPieChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activePoints.length) {
            const firstPoint = activePoints[0];
            const label = myPieChart.data.labels[firstPoint.index];
            const value = myPieChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            document.getElementById('chartLabel').textContent = label;
            document.getElementById('chartValue').textContent = value;
        } else {
            document.getElementById('chartLabel').textContent = 'MSIA';
            document.getElementById('chartValue').textContent = " ";
        }
    });

    console.log('Doughnut Chart initialized'); 
});