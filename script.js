document.addEventListener('DOMContentLoaded', function () {
    // Function to generate random grid load data
    const generateRandomData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            const load = Math.floor(Math.random() * (500 - 200 + 1)) + 200;  // Random load between 200 and 500 MW
            data.push(load);
        }
        return data;
    };

    // Function to generate forecasted grid load data
    const generateForecastData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            const load = Math.floor(Math.random() * (500 - 250 + 1)) + 250;  // Forecasted load between 250 and 500 MW
            data.push(load);
        }
        return data;
    };

    // Function to format the date for chart labels
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    // Function to update the clock every second
    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    };

    // Function to update the charts with the selected date range
    const updateCharts = (startDate, endDate) => {
        const labels = [];
        const gridLoadData = [];
        const forecastData = [];
        
        const numDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

        // Generate labels and data for the selected date range
        for (let i = 0; i < numDays; i++) {
            const currentDate = new Date(startDate.getTime() + i * (1000 * 3600 * 24));
            labels.push(formatDate(currentDate));  // Set labels to each day's date
            gridLoadData.push(generateRandomData(1)[0]);  // Simulate actual grid load data
            forecastData.push(generateForecastData(1)[0]);  // Simulate forecasted load data
        }

        // Create or update the Actual Grid Load Chart
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

        // Create or update the Forecasted Grid Load Chart
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

    // Event listener for Apply Filter button
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

    // Function to initialize the page with default values and charts
    const initializePage = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);  // Default start date: 7 days ago

        // Set default date values for the date inputs
        document.getElementById('startDate').value = oneWeekAgo.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];

        // Update charts with the default date range (last 7 days)
        updateCharts(oneWeekAgo, today);

        // Start the clock and update every second
        updateClock();
        setInterval(updateClock, 1000);
    };

    // Run the initialization when the page is loaded
    initializePage();
});
