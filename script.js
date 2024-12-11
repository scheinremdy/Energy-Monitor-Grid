// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Simulate random data for grid load and forecast
    const generateRandomData = (length) => {
        const data = [];
        for (let i = 0; i < length; i++) {
            const load = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            data.push(load);
        }
        return data;
    };

    // Function to format date labels for the chart
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    // Update the clock every second
    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    };

    // Function to update the charts with selected date range
    const updateCharts = (startDate, endDate) => {
        const labels = [];
        const gridLoadData = [];
        const forecastData = [];
        
        const numDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

        // Create labels and data for the selected date range
        for (let i = 0; i < numDays; i++) {
            const currentDate = new Date(startDate.getTime() + i * (1000 * 3600 * 24));
            labels.push(formatDate(currentDate));
            gridLoadData.push(generateRandomData(1)[0]);
            forecastData.push(generateRandomData(1)[0]);
        }

        // Update Grid Load Chart
        const gridLoadChart = new Chart(document.getElementById('gridLoadChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Actual Grid Load (MW)',
                    data: gridLoadData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Actual Grid Load Over Time'
                    }
                }
            }
        });

        // Update Forecast Chart
        const forecastChart = new Chart(document.getElementById('forecastChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Forecasted Grid Load (MW)',
                    data: forecastData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Forecasted Grid Load Over Time'
                    }
                }
            }
        });
    };

    // Handle the Apply Filter button
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

    // Initialize the page with default date range and charts
    const initializePage = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);

        // Set the default date range
        document.getElementById('startDate').value = oneWeekAgo.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];

        // Initialize charts with the default date range (last 7 days)
        updateCharts(oneWeekAgo, today);

        // Start the clock
        updateClock();
        setInterval(updateClock, 1000);
    };

    // Run the initialization
    initializePage();
});
