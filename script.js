const ctx = document.getElementById("energyChart").getContext("2d");
const langBtn = document.getElementById("language-toggle");
const themeBtn = document.getElementById("theme-toggle");
const helpBtn = document.getElementById("help-toggle");
const helpSection = document.getElementById("help-section");
const showGermanyBtn = document.getElementById("show-germany");
const showPhilippinesBtn = document.getElementById("show-philippines");
const showBothBtn = document.getElementById("show-both");
const downloadBtn = document.getElementById("download-btn");
const description = document.getElementById("description");

let language = "en"; // Default language
let darkMode = false;

// Toggle Language
langBtn.addEventListener("click", () => {
    language = language === "en" ? "de" : "en";
    langBtn.textContent = language === "en" ? "Deutsch" : "English";
    document.getElementById("title").textContent = language === "en" ? "Real-Time Energy Monitor" : "Echtzeit-Energieüberwachung";
    description.textContent = language === "en" 
        ? "Live energy consumption updates for Germany and the Philippines." 
        : "Echtzeit-Aktualisierungen des Energieverbrauchs für Deutschland und die Philippinen.";
});

// Toggle Dark Mode
themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.style.backgroundColor = darkMode ? "#222" : "#f4f4f4";
    document.body.style.color = darkMode ? "#fff" : "#333";
});

// Toggle Help Section
helpBtn.addEventListener("click", () => {
    helpSection.classList.toggle("hidden");
});

// Generate a timestamp
function getTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

// Initialize datasets
let germanyData = { label: "Germany (GW)", data: [], borderColor: "blue", borderWidth: 2, fill: false };
let philippinesData = { label: "Philippines (GW)", data: [], borderColor: "green", borderWidth: 2, fill: false };
let labels = [];

// Chart setup
let chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [germanyData, philippinesData]
    },
    options: {
        animation: { duration: 800 },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: "Time" } },
            y: { title: { display: true, text: "Energy Consumption (GW)" } }
        }
    }
});

// Update the chart every minute
function updateData() {
    const currentTime = getTime();
    
    // Simulate realistic energy fluctuations
    let newGermanyValue = 30 + Math.random() * 5;  // 30-35 GW
    let newPhilippinesValue = 15 + Math.random() * 3;  // 15-18 GW

    // Maintain max 20 data points
    if (labels.length >= 20) {
        labels.shift();
        germanyData.data.shift();
        philippinesData.data.shift();
    }

    labels.push(currentTime);
    germanyData.data.push(newGermanyValue);
    philippinesData.data.push(newPhilippinesValue);

    // Update chart
    chart.data.labels = labels;
    chart.update();
}

// Start updating every minute
setInterval(updateData, 60000);
updateData(); // Initial run

// Button events for showing different datasets
showGermanyBtn.addEventListener("click", () => {
    chart.data.datasets = [germanyData];
    chart.update();
});

showPhilippinesBtn.addEventListener("click", () => {
    chart.data.datasets = [philippinesData];
    chart.update();
});

showBothBtn.addEventListener("click", () => {
    chart.data.datasets = [germanyData, philippinesData];
    chart.update();
});

// Download CSV function
downloadBtn.addEventListener("click", () => {
    let csvContent = "Time,Germany (GW),Philippines (GW)\n";
    for (let i = 0; i < labels.length; i++) {
        csvContent += `${labels[i]},${germanyData.data[i] || ""},${philippinesData.data[i] || ""}\n`;
    }
    
    let blob = new Blob([csvContent], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EnergyData.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
