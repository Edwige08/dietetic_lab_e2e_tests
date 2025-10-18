# TESTS END-TO-END POUR DIETETIC LAB

Dossier contenant les tests end-to-end avec Cypress pour l'application front/back.

Pré-requis
- Node.js (>=16)
- npm ou yarn

Variables d'environnement
- CYPRESS_BASE_URL : URL du front-end (ex. http://localhost:3000)
- CYPRESS_API_URL : URL de l'API back-end (ex. http://localhost:8000)

Copiez `.env` pour définir ces variables localement, ou exportez-les dans votre shell.

Scripts utiles
- `npm run cy:open` — ouvre l'UI Cypress
- `npm run cy:open:with-env` — ouvre Cypress en utilisant `CYPRESS_BASE_URL` et `CYPRESS_API_URL` (utilise cross-env)
- `npm run cy:run` — lance tous les tests en headless
- `npm run cy:run:ci` — lance les tests en tête de CI en utilisant `CYPRESS_BASE_URL` et `CYPRESS_API_URL`

Exemples (bash)
```bash
# utilisation d'un .env local (install dotenv) :
cp .env.example .env
# puis lancer:
npm ci
npm run cy:open

# ou sans .env, en exportant explicitement :
export CYPRESS_BASE_URL=http://localhost:3000
export CYPRESS_API_URL=http://localhost:8000
npm run cy:open:with-env
```

Notes
- Les tests actuels attendent que l'interface expose des attributs `data-cy` sur certains éléments (inputs, boutons).
- Si vous exécutez ces tests contre un back-end local, assurez-vous que l'API d'authentification et les fixtures existent.