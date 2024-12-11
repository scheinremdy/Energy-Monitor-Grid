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

    // Function to generate realistic grid load data
    const generateRealisticGridData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            const hour = new Date().getHours();
            const baseLoad = 300;
            const dailyVariation = Math.sin((hour / 24) * Math.PI * 2) * 100;
            const load = baseLoad + dailyVariation + Math.random() * 50;
            data.push(Math.floor(load));
        }
        return data;
    };

    // Function to generate forecasted grid load data
    const generateForecastData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            const load = Math.floor(Math.random() * (500 - 250 + 1)) + 250;
            data.push(load);
        }
        return data;
    };

    // Format date for chart labels
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    // Update the clock
    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    };

    // Update charts based on the selected date range
    const updateCharts = (startDate, endDate) => {
        const labels = [];
        const gridLoadData = [];
        const forecastData = [];
        
        const numDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

        // Generate data and labels
        for (let i = 0; i < numDays; i++) {
            const currentDate = new Date(startDate.getTime() + i * (1000 * 3600 * 24));
            labels.push(formatDate(currentDate));
            gridLoadData.push(generateRealisticGridData(1)[0]);
            forecastData.push(generateForecastData(1)[0]);
        }

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
                        text: 'Actual Grid Load Over Time'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `Load: ${context.raw} MW`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
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
                        text: 'Forecasted Grid Load Over Time'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `Forecast: ${context.raw} MW`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // Apply the date filter
    document.getElementById('applyFilter').addEventListener('click', () => {
        const startDateInput = document.getElementById('startDate').value;
        const endDateInput = document.getElementById('endDate').value;

        if (startDateInput && endDateInput) {
            const startDate = new Date(startDateInput);
            const endDate = new Date(endDateInput);
            if (startDate <= endDate) {
                updateCharts(startDate, endDate);
            } else {
                alert("Please ensure the start date is before the end date.");
            }
        } else {
            alert("Please select both start and end dates.");
        }
    });

    // Initialize page
    const initializePage = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);

        document.getElementById('startDate').value = oneWeekAgo.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];

        updateCharts(oneWeekAgo, today);
        updateClock();
        setInterval(updateClock, 1000);
    };

    initializePage();
});
