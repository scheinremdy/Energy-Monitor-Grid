const apiUrl = "https://api.electricitymap.org/v3/carbon-intensity/latest";
const apiKey = "MakfcOXh4uwGgbVlnXYD";
const countrySelector = document.getElementById("countrySelector");
const canvas = document.getElementById("carbonChart");
const infoSection = document.getElementById("info");
const helpSection = document.getElementById("help");
const infoToggle = document.getElementById("toggleInfo");
const helpToggle = document.getElementById("toggleHelp");
let chart;

// Fetch data from the API
async function fetchCarbonData(zone) {
  try {
    const response = await fetch(`${apiUrl}?zone=${zone}`, {
      method: "GET",
      headers: { "auth-token": apiKey },
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    console.log("API Response:", data); // Debugging
    return data.data ? data.data : null; // Ensure data structure is correct
  } catch (error) {
    console.error("Failed to fetch data:", error);
    alert("Failed to fetch data. Please check the API key or network connection.");
    return null;
  }
}

// Update the chart with new data
async function updateChart(zone) {
  const data = await fetchCarbonData(zone);
  if (!data) return;

  const timestamp = new Date(data.timestamp).toLocaleString();
  const carbonIntensity = data.carbonIntensity;

  if (chart) {
    chart.data.labels.push(timestamp);
    chart.data.datasets[0].data.push(carbonIntensity);
    chart.update();
  } else {
    createChart([timestamp], [carbonIntensity]);
  }
}

// Create the chart
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
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "Carbon Intensity" } },
      },
    },
  });
}

// Event listener for country selection
countrySelector.addEventListener("change", (event) => {
  const selectedCountry = event.target.value;
  updateChart(selectedCountry);
});

// Toggle Sections (Help & Info)
infoToggle.addEventListener("click", () => {
  infoSection.classList.toggle("hidden");
});

helpToggle.addEventListener("click", () => {
  helpSection.classList.toggle("hidden");
});

// Initialize with Germany's data
updateChart("DE");
