const apiUrl = "https://api.electricitymap.org/v3/carbon-intensity/latest";
const apiKey = "MakfcOXh4uwGgbVlnXYD"; // Replace with a valid API key
const countrySelector = document.getElementById("countrySelector");
const canvas = document.getElementById("carbonChart").getContext("2d");
const infoSection = document.getElementById("info");
const helpSection = document.getElementById("help");
const infoToggle = document.getElementById("toggleInfo");
const helpToggle = document.getElementById("toggleHelp");

let chart;
let timestamps = [];
let carbonIntensities = [];

async function fetchCarbonData(zone) {
  try {
    const response = await fetch(`${apiUrl}?zone=${zone}`, {
      method: "GET",
      headers: { "auth-token": apiKey },
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    console.log("API Response:", data);

    if (!data || typeof data.carbonIntensity === "undefined") {
      throw new Error("Invalid API response format.");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to fetch data. Please check the API key or network connection.");
    return null;
  }
}

async function updateChart(zone) {
  const data = await fetchCarbonData(zone);
  if (!data) return;

  const timestamp = new Date().toLocaleString();
  const carbonIntensity = data.carbonIntensity;

  timestamps.push(timestamp);
  carbonIntensities.push(carbonIntensity);

  if (chart) {
    chart.data.labels.push(timestamp);
    chart.data.datasets[0].data.push(carbonIntensity);
    chart.update();
  } else {
    createChart(timestamps, carbonIntensities);
  }
}

function createChart(labels, data) {
  chart = new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Carbon Intensity (gCO2eq/kWh)",
          data: data,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "Carbon Intensity" } },
      },
    },
  });
}

countrySelector.addEventListener("change", (event) => {
  const selectedCountry = event.target.value;
  updateChart(selectedCountry);
});

infoToggle.addEventListener("click", () => {
  infoSection.classList.toggle("hidden");
});
helpToggle.addEventListener("click", () => {
  helpSection.classList.toggle("hidden");
});

updateChart("DE");
