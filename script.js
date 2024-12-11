document.addEventListener('DOMContentLoaded', function () {
    // Help Section Modal
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeBtn = document.getElementById('closeBtn');

    helpBtn.addEventListener('click', function () {
        helpModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        helpModal.style.display = 'none';
    });

    // Click outside modal to close it
    window.addEventListener('click', function (e) {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Country Selector
    const countrySelect = document.getElementById('countrySelect');
    countrySelect.addEventListener('change', function () {
        const selectedCountry = countrySelect.value;
        updateChartsForCountry(selectedCountry);
    });

    // Function to generate country-specific grid load data
    const generateCountryData = (country) => {
        const data = [];
        for (let i = 0; i < 7; i++) {  // Example: 7 days of data
            if (country === "USA") {
                data.push(Math.floor(Math.random() * (700 - 500 + 1)) + 500);  // USA: High grid load
            } else if (country === "Germany") {
                data.push(Math.floor(Math.random() * (500 - 300 + 1)) + 300);  // Germany: Medium grid load
            } else if (country === "India") {
                data.push(Math.floor(Math.random() * (900 - 600 + 1)) + 600);  // India: Higher energy usage
            } else if (country === "Japan") {
                data.push(Math.floor(Math.random() * (600 - 400 + 1)) + 400);  // Japan: Moderate grid load
            } else if (country === "Australia") {
                data.push(Math.floor(Math.random() * (600 - 350 + 1)) + 350);  // Australia: Balanced grid load
            }
        }
        return data;
    };

    // Update the charts based on country selection
    const updateChartsForCountry = (country) => {
        const gridLoadData = generateCountryData(country);
        const forecastData = generateCountryData(country);

        const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

        // Update Grid Load Chart
        const gridLoadChart = new Chart(document.getElementById('gridLoadChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Actual Grid Load (MW)',
                    data: gridLoadData,
                    borderColor: '#1abc9c',
                    backgroundColor: 'rgba(26, 188, 156, 0.3)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Actual Grid Load for ${country}`
                    }
                }
            }
        });

        // Update Forecasted Load Chart
        const forecastChart = new Chart(document.getElementById('forecastChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Forecasted Grid Load (MW)',
                    data: forecastData,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.3)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Forecasted Grid Load for ${country}`
                    }
                }
            }
        });
    };

    // Initialize the page
    const initializePage = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);

        document.getElementById('startDate').value = oneWeekAgo.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];

        updateChartsForCountry('USA');
    };

    initializePage();
});
