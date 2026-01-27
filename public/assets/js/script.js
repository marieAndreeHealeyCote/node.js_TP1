const form = document.getElementById('cityForm');
const input = document.getElementById('cityInput');
const resultsDiv = document.getElementById('results');
const loadingText = document.getElementById('loading');

async function fetchWeather(city) {
    if (!city) return;

    loadingText.textContent = "Chargement des données...";
    resultsDiv.innerHTML = "";

    try {
        const res = await fetch('/fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city })
        });

        const data = await res.json();

        if (!res.ok) {
            loadingText.textContent = data.error || "Erreur API";
            return;
        }

        loadingText.textContent = "";
        const weather = data.weather;

        resultsDiv.innerHTML = `
      <h3 class="text-lg font-bold text-teal-800 mb-2">${data.city}, ${data.country}</h3>
      <ul class="list-disc pl-5 text-gray-700">
        <li><strong>Température :</strong> ${weather.temperature} °C</li>
        <li><strong>Vitesse du vent :</strong> ${weather.windspeed} km/h</li>
        <li><strong>Direction du vent :</strong> ${weather.winddirection}°</li>
        <li><strong>Heure observation :</strong> ${weather.time}</li>
      </ul>
    `;
    } catch (err) {
        console.error(err);
        loadingText.textContent = "Erreur lors du chargement des données";
    }
}

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) {
        loadingText.textContent = "Veuillez entrer une ville";
        return;
    }
    fetchWeather(city);
});

// Support lien direct ?id=Ville
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const cityParam = params.get('id');
    if (cityParam && input) {
        input.value = cityParam;
        fetchWeather(cityParam);
        document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
    }
});
