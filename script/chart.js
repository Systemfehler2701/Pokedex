let apiData = [];
let apiLabels = [];

const CONFIG_BG_COLOR = [
    ' rgba(61, 61, 61, 0.7)'
];

const CONFIG_BORDER_COLOR = [
    'rgba(0, 0, 0, 1)'
];

/*const CONFIG_CHART_OPTIONS = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};*/


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
                borderWidth: 1.5

            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        font: {
                            size: 8,
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 90,
                        minRotation: 35,
                        font: {
                            size: 8,
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,

                }
            }
        }
    });
}