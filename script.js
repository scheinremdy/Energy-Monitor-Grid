const countryData = {
    Germany: {
        current: [60, 70, 80, 90, 85, 75, 95, 100, 85, 80],
        forecast: [85, 90, 95, 100, 105, 110, 115, 120, 125, 130]
    },
    USA: {
        current: [150, 160, 170, 180, 175, 165, 185, 200, 190, 180],
        forecast: [190, 200, 210, 220, 230, 240, 250, 260, 270, 280]
    },
    Philippines: {
        current: [40, 45, 50, 55, 53, 48, 60, 65, 62, 58],
        forecast: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
    }
};

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

    const countrySelect = document.getElementById('countrySelect');
    let gridChart, forecastChart;

    function updateCharts(country) {
        const data = countryData[country];

        if (gridChart) gridChart.destroy();
        if (forecastChart) forecastChart.destroy();

        gridChart = createChart(gridLoadCtx, 'Current Load', data.current, 'rgba(75, 192, 192, 1)');
        forecastChart = createChart(forecastCtx, 'Forecasted Load', data.forecast, 'rgba(255, 99, 132, 1)');
    }

    countrySelect.addEventListener('change', () => {
        updateCharts(countrySelect.value);
    });

    // Initialize with Germany's data
    updateCharts('Germany');
});
