# Appareils - Angular, Express & MongoDB (TP3)

Application de gestion d'appareils electromenagers : front-end Angular + Bootstrap, API REST Express, base MongoDB (Mongoose).

## Prerequis
- Node.js 22+, npm
- Docker Desktop (pour MongoDB)

## Lancer le projet

1. MongoDB :
```bash
docker compose up -d mongo
```

2. API (http://localhost:3001) :
```bash
cd api
cp .env.example .env
npm install
npm run dev
```

3. Front (http://localhost:4200) :
```bash
cd front
npm install
npx ng serve
```

## Variables d'environnement (api/.env)

| Variable | Exemple |
|---|---|
| MONGODB_URI | mongodb://localhost:27017/appareilsDB |
| PORT | 3001 |

## Endpoints

| Methode | URL | Description | Statut |
|---|---|---|---|
| GET | /api/health | etat du serveur | 200 |
| GET | /api/appareils | liste | 200 |
| GET | /api/appareils/:id | un appareil | 200 / 400 / 404 |
| POST | /api/appareils | creer | 201 / 400 |
| PUT | /api/appareils/:id | modifier | 200 / 400 / 404 |
| DELETE | /api/appareils/:id | supprimer | 204 / 400 / 404 |

Tests : `api/requests.http` (extension REST Client de VS Code).