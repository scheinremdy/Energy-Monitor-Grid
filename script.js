// script.js
document.addEventListener("DOMContentLoaded", () => {
    const helpBtn = document.getElementById("help-btn");
    const modal = document.getElementById("help-modal");
    const closeBtn = document.querySelector(".close");
    
    helpBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
    
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    setInterval(updateEnergyData, 5000);
});

function updateEnergyData() {
    const energyChart = document.getElementById("energyChart").getContext("2d");
    const data = {
        labels: ["Office A", "Shop B", "Factory C"],
        datasets: [{
            label: "Energy Usage (kWh)",
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
            backgroundColor: ["red", "blue", "green"],
        }],
    };
    new Chart(energyChart, { type: "bar", data });
}
