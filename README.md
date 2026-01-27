# MétéoApp - Node.js + Open-Meteo + Tailwind CDN

## Description

Application web pour afficher la météo d'une ville grâce à l'API Open-Meteo.

- Node.js + Express pour le backend
- Sauvegarde des données dans `data/`
- Frontend stylisé avec **Tailwind CSS via CDN**
- Header, footer sticky, interface responsive

## Installation

1. Cloner le projet

```bash
git clone <URL_DU_DEPOT>
cd meteo-app
```

2. Installer les dépendances :

npm install

3. Créer un fichier .env à la racine (optionnel) :

PORT=3000

## Exécution

1. Lancer le serveur :

node index.js

2. Ouvrir le navigateur à l’adresse :

http://localhost:3000/index.html

3. Aller sur Rechercher pour tester la météo d’une ville

Les données sont récupérées via l’API Open-Meteo et affichées dynamiquement.

## Backend

POST /fetch : Reçoit le nom d’une ville, interroge Open-Meteo, sauvegarde les données et renvoie la météo.

GET /data/:city : Retourne les données JSON pour une ville stockée.

## Frontend

Pages HTML : index.html, search.html, contact.html

Script JS : assets/js/script.js

CSS personnalisé : assets/css/style.css

Tailwind CSS via CDN pour stylisation rapide et modern

## Dépendances

Node.js
Express
node-fetch
dotenv
Tailwind CSS CDN
