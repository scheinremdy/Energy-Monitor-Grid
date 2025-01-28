const apiUrl = "https://api.electricitymap.org/v3/carbon-intensity/latest";
const apiKey = "MakfcOXh4uwGgbVlnXYD"; // Replace with a valid API key
const countrySelector = document.getElementById("countrySelector");
const canvas = document.getElementById("carbonChart").getContext("2d");

let chart;

// **Fetch Data from API**
async function fetchCarbonData(zone) {
  try {
    const response = await fetch(`${apiUrl}?zone=${zone}`, {
      method: "GET",
      headers: { "auth-token": apiKey },
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);
    const data = await response.json();

    if (!data || !data.data || typeof data.data.carbonIntensity === "undefined") {
      throw new Error("Invalid API response format.");
    }

    return {
      carbonIntensity: data.data.carbonIntensity,
      timestamp: data.data.datetime,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to fetch data. Please check the API key or network connection.");
    return null;
  }
}

// **Update the Chart**
async function updateChart(zone) {
  const data = await fetchCarbonData(zone);
  if (!data) return;

  const timestamp = new Date(data.timestamp).toLocaleTimeString(); // Format timestamp
  const carbonIntensity = data.carbonIntensity;

  if (chart) {
    chart.data.labels.push(timestamp);
    chart.data.datasets[0].data.push(carbonIntensity);
    chart.update();
  } else {
    createChart([timestamp], [carbonIntensity]);
  }
}

// **Create the Chart**
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

// **Event Listener for Country Selection**
countrySelector.addEventListener("change", (event) => {
  const selectedCountry = event.target.value;
  updateChart(selectedCountry);
});

// **Initialize with Germany's Data**
updateChart("DE");
