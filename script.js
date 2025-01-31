document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("energyChart").getContext("2d");
    const usageList = document.getElementById("usage-list");
    const infoBox = document.getElementById("info-box");
    const themeToggle = document.getElementById("theme-toggle");
    const languageToggle = document.getElementById("language-toggle");
    const infoToggle = document.getElementById("info-toggle");

    let currentLanguage = "en";

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
                x: { type: "time", time: { unit: "minute" }, grid: { display: false } },
                y: { grid: { display: true } }
            }
        }
    });

    async function fetchEnergyData() {
        try {
            const response = await fetch("https://api.energydata.info/dataset/live-energy-data.json");  // Example API
            const data = await response.json();
            const germanyEnergy = data.germany.currentUsage;
            const philippinesEnergy = data.philippines.currentUsage;

            const now = new Date().toLocaleTimeString();
            energyChart.data.labels.push(now);
            energyChart.data.datasets[0].data.push((germanyEnergy + philippinesEnergy) / 2);

            if (energyChart.data.labels.length > 10) {
                energyChart.data.labels.shift();
                energyChart.data.datasets[0].data.shift();
            }

            energyChart.update();

            usageList.innerHTML = `
                <li>🇩🇪 Germany: ${germanyEnergy} MW</li>
                <li>🇵🇭 Philippines: ${philippinesEnergy} MW</li>
            `;
        } catch (error) {
            console.error("Error fetching energy data:", error);
        }
    }

    setInterval(fetchEnergyData, 5000);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    languageToggle.addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "de" : "en";
        updateLanguage();
    });

    infoToggle.addEventListener("click", () => {
        infoBox.classList.toggle("hidden");
    });

    function updateLanguage() {
        const translations = {
            en: {
                title: "Energy Monitor Grid",
                infoTitle: "Live Energy Consumption",
                infoText: "Monitor real-time energy usage for Germany and the Philippines.",
                usageTitle: "Usage Statistics",
                helpTitle: "What is the Energy Monitor Grid?",
                helpDescription: "An Energy Monitor Grid is a system used to track, manage, and optimize energy consumption within a specific area.",
                helpHowtoTitle: "How to Use:",
                helpHowto: [
                    "🔄 The chart updates in real-time with energy data from Germany and the Philippines.",
                    "🌙 Click the dark mode button to toggle themes.",
                    "🇩🇪 Click the language button to switch between English and German.",
                    "ℹ️ Click this help button again to close this info box."
                ]
            },
            de: {
                title: "Energie-Monitoring-Netz",
                infoTitle: "Live Energieverbrauch",
                infoText: "Überwachen Sie den Echtzeit-Energieverbrauch für Deutschland und die Philippinen.",
                usageTitle: "Nutzungsstatistik",
                helpTitle: "Was ist das Energie-Monitoring-Netz?",
                helpDescription: "Ein Energie-Monitoring-Netz ist ein System zur Verfolgung, Verwaltung und Optimierung des Energieverbrauchs in einem bestimmten Bereich.",
                helpHowtoTitle: "So verwenden Sie es:",
                helpHowto: [
                    "🔄 Das Diagramm wird in Echtzeit mit Energiedaten aus Deutschland und den Philippinen aktualisiert.",
                    "🌙 Klicken Sie auf den Dunkelmodus-Knopf, um das Design zu wechseln.",
                    "🇩🇪 Klicken Sie auf den Sprachknopf, um zwischen Englisch und Deutsch zu wechseln.",
                    "ℹ️ Klicken Sie erneut auf diese Schaltfläche, um diese Info-Box zu schließen."
                ]
            }
        };

        document.getElementById("title").textContent = translations[currentLanguage].title;
        document.getElementById("info-title").textContent = translations[currentLanguage].infoTitle;
        document.getElementById("info-text").textContent = translations[currentLanguage].infoText;
        document.getElementById("usage-title").textContent = translations[currentLanguage].usageTitle;
        document.getElementById("help-title").textContent = translations[currentLanguage].helpTitle;
        document.getElementById("help-description").textContent = translations[currentLanguage].helpDescription;
        document.getElementById("help-howto-title").textContent = translations[currentLanguage].helpHowtoTitle;
        document.getElementById("help-howto").innerHTML = translations[currentLanguage].helpHowto.map(item => `<li>${item}</li>`).join("");
    }
});
