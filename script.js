document.addEventListener('DOMContentLoaded', function () {
    // Simulate realistic grid load data (with daily patterns)
    const generateRealisticGridData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            // Simulating a daily pattern (higher usage during day, lower at night)
            const hour = new Date().getHours();
            const baseLoad = 300;  // Base load in MW
            const dailyVariation = Math.sin((hour / 24) * Math.PI * 2) * 100;  // Simulate daily peaks and valleys
            const load = baseLoad + dailyVariation + Math.random() * 50;  // Randomness to add variation
            data.push(Math.floor(load));
        }
        return data;
    };

    // Simulate forecasted grid load data with some realistic variation
    const generateForecastData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            const load = Math.floor(Math.random() * (500 - 250 + 1)) + 250;  // Forecasted load between 250 and 500 MW
            data.push(load);
        }
        return data;
    };

    // Format date for chart labels
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    // Update the clock (shows current time)
    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    };

    // Display the current grid load (latest load)
    const updateCurrentLoad = () => {
        const currentLoad = Math.floor(Math.random() * (500 - 200 + 1)) + 200;  // Simulated current load between 200 and 500 MW
        document.getElementById('currentLoad').textContent = `Current Grid Load: ${currentLoad} MW`;
    };

    // Update the charts with the filtered data based on the selected date range
    const updateCharts = (startDate, endDate) => {
        const labels = [];
        const gridLoadData = [];
        const forecastData = [];
        
        const numDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

        // Create labels and data for the selected date range
        for (let i = 0; i < numDays; i++) {
            const currentDate = new Date(startDate.getTime() + i * (1000 * 3600 * 24));
            labels.push(formatDate(currentDate)); // Set labels to each day's date
            gridLoadData.push(generateRealisticGridData(1)[0]); // Simulate actual grid load data with daily patterns
            forecastData.push(generateForecastData(1)[0]); // Simulate forecasted load data
        }

        // Grid Load Chart Update
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

        // Forecasted Load Chart Update
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

    // Apply the selected date range to update the charts
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

    // Initialize the page with default values and charts
    const initializePage = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);  // Default start date: 7 days ago

        // Set default date values for the date inputs
        document.getElementById('startDate').value = oneWeekAgo.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];

        // Update charts with default date range (last 7 days)
        updateCharts(oneWeekAgo, today);

        // Start the clock and update every second
        updateClock();
        setInterval(updateClock, 1000);

        // Update current grid load every 5 seconds
        updateCurrentLoad();
        setInterval(updateCurrentLoad, 5000);
    };

    // Run the initialization when the page is loaded
    initializePage();
});
