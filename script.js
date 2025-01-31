document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("energyChart").getContext("2d");
    const energyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
            datasets: [{
                label: "Energy Usage (kWh)",
                data: [10, 20, 30, 25, 15, 35],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                fill: true,
            }],
        },
        options: {
            responsive: true,
            scales: {
                x: { grid: { display: false } },
                y: { grid: { display: true } }
            }
        }
    });

    // Simulating real-time data updates
    setInterval(() => {
        const newData = Math.floor(Math.random() * 50) + 10;
        energyChart.data.datasets[0].data.shift();
        energyChart.data.datasets[0].data.push(newData);
        energyChart.update();
    }, 3000);

    // Theme Toggle
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Language Toggle
    document.getElementById("language-toggle").addEventListener("click", () => {
        alert("Language switching functionality coming soon.");
    });

    // Help Toggle
    document.getElementById("help-toggle").addEventListener("click", () => {
        document.getElementById("help-section").classList.toggle("hidden");
    });
});
