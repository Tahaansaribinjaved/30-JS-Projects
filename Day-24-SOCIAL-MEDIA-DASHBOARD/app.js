// Chart Data
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
        label: 'Engagement',
        data: [10, 20, 15, 30, 25],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
    }]
};

// Chart Configuration
const config = {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Create Chart
const chart = new Chart(document.getElementById('chart'), config);

