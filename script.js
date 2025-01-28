document.addEventListener('DOMContentLoaded', function () {
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeBtn = document.getElementById('closeBtn');
    const countrySelect = document.getElementById('countrySelect');
    const gridLoadChartElement = document.getElementById('gridLoadChart');
    const forecastChartElement = document.getElementById('forecastChart');

    let gridLoadChart, forecastChart;

    // Help Modal Logic
    helpBtn.addEventListener('click', function () {
        helpModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Chart Update Logic
    function updateChartsForCountry(country) {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const gridData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 500));
        const forecastData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 500));

        if (gridLoadChart) gridLoadChart.destroy();
        if (forecastChart) forecastChart.destroy();

        gridLoadChart = new Chart(gridLoadChartElement, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Actual Grid Load (MW)',
                    data: gridData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            }
        });

        forecastChart = new Chart(forecastChartElement, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Forecasted Grid Load (MW)',
                    data: forecastData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                }]
            }
        });
    }

    countrySelect.addEventListener('change', function () {
        updateChartsForCountry(countrySelect.value);
    });

    updateChartsForCountry('USA');
});
