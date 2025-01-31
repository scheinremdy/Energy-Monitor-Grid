document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("energyChart").getContext("2d");
    const energyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [], // Time labels will be populated dynamically
            datasets: [
                {
                    label: "Energy Usage in Germany (MW)",
                    data: [],
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    fill: true,
                },
                {
                    label: "Energy Usage in the Philippines (MW)",
                    data: [],
                    borderColor: "#28a745",
                    backgroundColor: "rgba(40, 167, 69, 0.2)",
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                    },
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Energy Usage (MW)',
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        },
    });

    // Function to fetch real-time data
    async function fetchData() {
        try {
            // Fetch data for Germany
            const responseGermany = await fetch('https://api.iea.org/real-time-electricity/germany');
            const dataGermany = await responseGermany.json();

            // Fetch data for the Philippines
            const responsePhilippines = await fetch('https://api.iea.org/real-time-electricity/philippines');
            const dataPhilippines = await responsePhilippines.json();

            // Process and update chart data
            updateChart(dataGermany, dataPhilippines);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
   
::contentReference[oaicite:1]{index=1}
 
