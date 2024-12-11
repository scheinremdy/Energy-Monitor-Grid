document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeBtn = document.getElementById('closeBtn');
    const applyFilterBtn = document.getElementById('applyFilter');
    const countrySelect = document.getElementById('countrySelect');
    const gridLoadChartElement = document.getElementById('gridLoadChart');
    const forecastChartElement = document.getElementById('forecastChart');
    const clockElement = document.getElementById('clock');

    let gridLoadChart, forecastChart;

    // Open Help Modal
    helpBtn.addEventListener('click', function () {
        helpModal.style.display = 'block';
    });

    // Close Help Modal
    closeBtn.addEventListener('click', function () {
        helpModal.style.display = 'none';
    });

    // Close Help Modal if clicked outside modal
    window.addEventListener('click', function (event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Country Selector Logic
    countrySelect.addEventListener('change', function () {
        const country = countrySelect.value;
        console.log(`Selected Country: ${country}`);
        updateChartsForCountry(country);  // Update the charts based on the selected country
    });

    // Clock Update
    setInterval(function () {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }, 1000);

    // Update the charts based on country selection
    function updateChartsForCountry(country) {
        // Placeholder for country-specific data
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const gridData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 500));
        const forecastData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 500));

        // Destroy previous charts if they exist
        if (gridLoadChart) {
            gridLoadChart.destroy();
        }

        if (forecastChart) {
            forecastChart.destroy();
        }

        // Create new Grid Load Chart
        gridLoadChart = new Chart(gridLoadChartElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Actual Grid Load (MW)',
                    data: gridData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    tension: 0.1,
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1000
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Actual Grid Load Over Time'
                    }
                }
            }
        });

        // Create new Forecasted Grid Load Chart
        forecastChart = new Chart(forecastChartElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Forecasted Grid Load (MW)',
                    data: forecastData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    tension: 0.1,
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1000
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Forecasted Grid Load Over Time'
                    }
                }
            }
        });
    }

    // Initial charts
    updateChartsForCountry('USA');  // Set default country on load
});
