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
        fetchRealTimeData();
    }, 5000);

    function fetchRealTimeData() {
        fetch("https://api.example.com/energy?country=DE") // Replace with a real API
            .then(response => response.json())
            .then(data => {
                const newData = data.value;
                energyChart.data.datasets[0].data.shift();
                energyChart.data.datasets[0].data.push(newData);
                energyChart.update();
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    // Theme Toggle
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Language Toggle
    document.getElementById("lang-toggle").addEventListener("click", () => {
        toggleLanguage();
    });

    function toggleLanguage() {
        const elements = {
            title: ["Energy Monitor Grid", "Energieüberwachungsnetz"],
            liveTitle: ["Live Energy Consumption", "Live-Energieverbrauch"],
            liveDesc: ["Monitor real-time energy usage for small businesses.", "Überwachen Sie den Echtzeit-Energieverbrauch für kleine Unternehmen."],
            usageTitle: ["Usage Statistics", "Nutzungsstatistiken"],
            infoTitle: ["Information Terminal", "Informationsterminal"],
            infoContent: ["Real-time updates on energy use trends.", "Echtzeitaktualisierungen zu Energieverbrauchstrends."],
            helpTitle: ["Help & FAQ", "Hilfe & FAQ"]
        };
        const lang = document.documentElement.lang === "en" ? "de" : "en";
        document.documentElement.lang = lang;
        Object.keys(elements).forEach(id => {
            document.getElementById(id).textContent = elements[id][lang === "en" ? 0 : 1];
        });
    }

    // Help Button Toggle
    document.getElementById("help-button").addEventListener("click", () => {
        const helpContent = document.getElementById("help-content");
        helpContent.style.display = helpContent.style.display === "none" ? "block" : "none";
    });
});
