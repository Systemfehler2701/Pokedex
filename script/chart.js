let apiData = [];
let apiLabels = [];

const CONFIG_BG_COLOR = [
    ' rgba(61, 61, 61, 0.7)'
];

const CONFIG_BORDER_COLOR = [
    'rgba(0, 0, 0, 1)'
];

const CONFIG_CHART_OPTIONS = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};


function drawChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: apiLabels,
            datasets: [{
                data: apiData,
                backgroundColor: CONFIG_BG_COLOR,
                borderColor: CONFIG_BORDER_COLOR,
                borderWidth: 2

            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,

                }
            }
        }
    });
}