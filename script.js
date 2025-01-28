document.addEventListener("DOMContentLoaded", () => {
    const countrySelector = document.getElementById("country");
    const infoBtn = document.getElementById("infoBtn");
    const helpBtn = document.getElementById("helpBtn");
    const infoText = document.getElementById("infoText");
    const helpText = document.getElementById("helpText");

    const API_KEYS = {
        Germany: "MakfcOXh4uwGgbVlnXYD",
        Philippines: "your-philippines-key",
        USA: "your-usa-key",
        India: "your-india-key",
        Canada: "your-canada-key"
    };

    // Chart.js Initialization
    const ctx = document.getElementById("gridLoadChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Renewable", "Non-Renewable", "Nuclear"],
            datasets: [{
                label: "Energy Distribution",
                data: [0, 0, 0],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });

    // Fetch and Update Data
    const updateChart = async (country) => {
        const apiKey = API_KEYS[country];
        const apiUrl = `https://api.energydata/${country}/load?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            chart.data.datasets[0].data = [
                data.renewable,
                data.nonRenewable,
                data.nuclear
            ];
            chart.update();
        } catch (error) {
            alert("Failed to fetch data. Please check the API key or network connection.");
            console.error(error);
        }
    };

    // Event Listeners
    countrySelector.addEventListener("change", (e) => {
        updateChart(e.target.value);
    });

    infoBtn.addEventListener("click", () => {
        infoText.classList.toggle("hidden");
    });

    helpBtn.addEventListener("click", () => {
        helpText.classList.toggle("hidden");
    });

    // Load Initial Data for Default Country
    updateChart(countrySelector.value);
});
