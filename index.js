import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour JSON
app.use(express.json());
app.use(express.static('public'));

// Assurer que le dossier data/ existe
const dataDir = path.join('.', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

/**
 * Route principale : /fetch
 * Reçoit une ville en POST et renvoie la météo
 */
app.post('/fetch', async (req, res) => {
    const { city } = req.body;

    if (!city) return res.status(400).json({ error: "Aucune ville fournie" });

    try {
        // Géocodage pour obtenir latitude/longitude
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            return res.status(404).json({ error: "Ville non trouvée" });
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;

        // Récupération météo actuelle
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        if (!weatherData.current_weather) {
            return res.status(404).json({ error: "Météo non trouvée" });
        }

        const responseData = {
            city: location.name,
            country: location.country,
            weather: weatherData.current_weather,
        };

        // Sauvegarde locale
        const filePath = path.join(dataDir, `${location.name}.json`);
        fs.writeFileSync(filePath, JSON.stringify(responseData, null, 2));

        // Renvoi des données au frontend
        res.json(responseData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/**
 * Route : /data/:city
 * Renvoie les données JSON stockées pour une ville
 */
app.get('/data/:city', (req, res) => {
    const city = req.params.city;
    const filePath = path.join(dataDir, `${city}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Fichier non trouvé" });
    }

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Impossible de lire le fichier" });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
