let language = 'en'; // Default language

// Data fetching function
async function fetchGridData() {
    const apiKey = '0MEaY3Tw2VaeCTyRP3FFbHqVl7G6kyX7x95BArD4'; // Your API key
    const apiUrl = 'https://api.electricitymap.org/v3/carbon-intensity';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        updateDataSection(data);
        updateChart(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Update Data Section
function updateDataSection(data) {
    const gridLoadElement = document.getElementById('grid-load');
    const carbonIntensityElement = document.getElementById('carbon-intensity');

    // Example: Adjust the properties based on the actual API response
    const gridLoad = data.data[0].load; // Grid load in MW
    const carbonIntensity = data.data[0].carbon_intensity; // Carbon intensity in gCO2/kWh

    gridLoadElement.textContent = `${gridLoad} MW`;
    carbonIntensityElement.textContent = `${carbonIntensity} gCO2/kWh`;
}

// Update Chart (Using Plotly.js)
function updateChart(data) {
    const gridLoadData = data.data.map(entry => entry.load);
    const timestamps = data.data.map(entry => entry.timestamp);

    const trace = {
        x: timestamps,
        y: gridLoadData,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#4CAF50' }
    };

    const layout = {
        title: 'Grid Load Over Time',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Grid Load (MW)' }
    };

    Plotly.newPlot('chart-container', [trace], layout);
}

// Language Change Function
function changeLanguage(lang) {
    language = lang;
    updateText();
}

// Update Text Based on Language
function updateText() {
    const title = document.getElementById('title');
    const gridLoadHeading = document.getElementById('grid-load-heading');
    const carbonIntensityHeading = document.getElementById('carbon-intensity-heading');

    if (language === 'de') {
        title.textContent = "Elektrizitätsnetz Lasten-Dashboard";
        gridLoadHeading.textContent = "Aktuelle Netzlast";
        carbonIntensityHeading.textContent = "Kohlenstoffintensität";
    } else {
        title.textContent = "Electric Grid Load Dashboard";
        gridLoadHeading.textContent = "Current Grid Load";
        carbonIntensityHeading.textContent = "Carbon Intensity";
    }
}

// Initial Data Fetch
fetchGridData();
setInterval(fetchGridData, 60000); // Refresh data every minute
