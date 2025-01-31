document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("energyChart").getContext("2d");
    const energyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Energy Usage (MW)",
                data: [],
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

    async function fetchEnergyData() {
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&hourly=temperature_2m");
            const data = await response.json();

            if (!data) throw new Error("Invalid API response");

            const germanyEnergy = Math.floor(Math.random() * 100) + 50;  // Placeholder value
            const philippinesEnergy = Math.floor(Math.random() * 80) + 40;  // Placeholder

            const now = new Date().toLocaleTimeString();
            energyChart.data.labels.push(now);
            energyChart.data.datasets[0].data.push((germanyEnergy + philippinesEnergy) / 2);

            if (energyChart.data.labels.length > 10) {
                energyChart.data.labels.shift();
                energyChart.data.datasets[0].data.shift();
            }

            energyChart.update();

            document.getElementById("usage-list").innerHTML = `
                <li>🇩🇪 Germany: ${germanyEnergy} MW</li>
                <li>🇵🇭 Philippines: ${philippinesEnergy} MW</li>
            `;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    setInterval(fetchEnergyData, 10000);
    fetchEnergyData();

    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    document.getElementById("help-button").addEventListener("click", () => {
        document.getElementById("help-section").classList.toggle("hidden");
    });

    document.getElementById("close-help").addEventListener("click", () => {
        document.getElementById("help-section").classList.add("hidden");
    });

    document.getElementById("language-toggle").addEventListener("change", (event) => {
        const lang = event.target.value;
        if (lang === "de") {
            document.getElementById("title").innerText = "Energieüberwachungsnetz";
            document.getElementById("live-title").innerText = "Live-Energieverbrauch";
            document.getElementById("description").innerText = "Überwachung des Echtzeitenergieverbrauchs für Deutschland 🇩🇪 und die Philippinen 🇵🇭.";
            document.getElementById("stats-title").innerText = "Nutzungsstatistiken";
            document.getElementById("help-title").innerText = "So funktioniert es";
            document.getElementById("help-text").innerText = "Dieses System zeigt Live-Energiedaten für Deutschland und die Philippinen.";
        } else {
            document.getElementById("title").innerText = "Energy Monitor Grid";
            document.getElementById("live-title").innerText = "Live Energy Consumption";
            document.getElementById("description").innerText = "Monitoring real-time energy usage for Germany 🇩🇪 and the Philippines 🇵🇭.";
            document.getElementById("stats-title").innerText = "Usage Statistics";
            document.getElementById("help-title").innerText = "How to Use This Monitor";
            document.getElementById("help-text").innerText = "This system displays live energy consumption data.";
        }
    });
});
