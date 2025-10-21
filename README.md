# TESTS END-TO-END POUR DIETETIC LAB

Dossier contenant les tests end-to-end avec Cypress pour l'application front/back.

## Pré-requis
- Node.js (>=16)
- npm ou yarn

## Configuration des URLs (variables d'environnement)

Les URLs du front-end et du back-end sont configurées via des **variables d'environnement** pour des raisons de sécurité et de flexibilité.

### Configuration locale

1. Copiez le fichier `.env.example` en `.env` :
   ```bash
   cp .env.example .env
   ```

2. Modifiez le fichier `.env` avec vos URLs réelles :
   ```env
   CYPRESS_BASE_URL=https://votre-front.vercel.app
   CYPRESS_API_URL=https://votre-back.vercel.app
   ```

3. Le fichier `.env` est ignoré par git (déjà configuré dans `.gitignore`), donc vos URLs restent secrètes.

### Configuration dans GitHub Actions

Pour que les tests s'exécutent dans CI/CD :

1. Allez dans **Settings → Secrets and variables → Actions** de votre repository GitHub
2. Ajoutez les secrets suivants :
   - `CYPRESS_BASE_URL` : URL du front-end (ex. https://dietetic-lab.vercel.app)
   - `CYPRESS_API_URL` : URL de l'API back-end (ex. https://dietetic-lab-back.vercel.app)

Ces secrets seront automatiquement utilisés par le workflow `.github/workflows/e2e.yml`.

### Variables d'environnement disponibles
- `CYPRESS_BASE_URL` : URL du front-end (ex. http://localhost:3000 ou https://dietetic-lab.vercel.app)
- `CYPRESS_API_URL` : URL de l'API back-end (ex. http://localhost:8000 ou https://dietetic-lab-back.vercel.app)

## Scripts utiles
- `npm run cy:open` — ouvre l'UI Cypress (utilise les URLs du fichier `.env`)
- `npm run cy:open:with-env` — ouvre Cypress en utilisant les variables `CYPRESS_BASE_URL` et `CYPRESS_API_URL` de votre environnement shell (utilise cross-env)
- `npm run cy:run` — lance tous les tests en headless (utilise les URLs du fichier `.env`)
- `npm run cy:run:ci` — lance les tests en CI en utilisant les variables d'environnement `CYPRESS_BASE_URL` et `CYPRESS_API_URL`

## Exemples d'utilisation

### Avec fichier .env (recommandé pour le développement local)
```bash
# Installation
npm ci

# Configuration
cp .env.example .env
# Puis éditez .env avec vos URLs

# Lancer les tests
npm run cy:open
```

### Sans fichier .env (en passant les variables directement)
```bash
export CYPRESS_BASE_URL=http://localhost:3000
export CYPRESS_API_URL=http://localhost:8000
npm run cy:open:with-env
```

## Notes
- Les tests actuels attendent que l'interface expose des attributs `data-cy` sur certains éléments (inputs, boutons).
- Si vous exécutez ces tests contre un back-end local, assurez-vous que l'API d'authentification et les fixtures existent.
- **Sécurité** : Ne committez JAMAIS le fichier `.env` dans git. Il contient vos URLs sensibles.