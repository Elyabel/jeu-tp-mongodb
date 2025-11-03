# Express + TypeScript + MongoDB — API de recherche (architecture MVC orientée objet)

## Structure
- `src/models` — modèles Mongoose + types TypeScript
- `src/services` — classes métiers (GameService)
- `src/controllers` — controllers fins (orchestration requêtes/réponses)
- `src/routes` — déclaration des routes
- `src/config` — connexion à la base de données

## Routes (base `/api`)
- `POST /api/items` — Créer un jeu (body JSON)
  - Exemple : `{ "title": "Elden Ring", "description": "RPG", "genre": "RPG", "platform": "PC", "rating": 9 }`
- `GET /api/items/:id` — Récupérer un jeu par id
- `GET /api/items` — Liste paginée (query params `page`, `limit`)
- `GET /api/search?keyword=...&genre=...&maxRating=...&page=1&limit=10` — Recherche
  - `keyword` : cherche sur `title` **et** `description` via `$regex` (insensible à la casse)
  - `genre` : filtre exact
  - `maxRating` : filtre `rating <= maxRating`

## Notes
- Le service (`src/services/GameService.ts`) contient la logique métier (création, recherche, pagination).
- Les controllers sont petit et n'implémentent pas de logique métier lourde.