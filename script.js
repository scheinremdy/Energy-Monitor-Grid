function getRandomData(size) {
    const data = [];
    for (let i = 0; i < size; i++) {
        data.push(Math.floor(Math.random() * 100) + 50);
    }
    return data;
}

function createChart(ctx, label, data, color) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: data.length }, (_, i) => `Hour ${i + 1}`),
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                borderWidth: 2,
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Time (Hours)' }
                },
                y: {
                    title: { display: true, text: 'Load (MW)' }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const gridLoadCtx = document.getElementById('gridLoadChart').getContext('2d');
    const forecastCtx = document.getElementById('forecastChart').getContext('2d');

    const gridData = getRandomData(10);
    const forecastData = getRandomData(10);

    createChart(gridLoadCtx, 'Grid Load (Current)', gridData, 'rgba(75, 192, 192, 1)');
    createChart(forecastCtx, 'Forecasted Load', forecastData, 'rgba(255, 99, 132, 1)');
});
