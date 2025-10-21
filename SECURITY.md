# Guide de Sécurité - Configuration des URLs

Ce document explique comment configurer les URLs du front-end et du back-end de manière sécurisée.

## Pourquoi utiliser des variables d'environnement ?

Les URLs du front-end et du back-end sont maintenant configurées via des **variables d'environnement** pour :

1. **Sécurité** : Éviter d'exposer les URLs réelles dans le code source public
2. **Flexibilité** : Faciliter le changement d'environnement (local, staging, production)
3. **Collaboration** : Chaque développeur peut utiliser ses propres URLs

## Configuration Locale

### Étape 1 : Créer le fichier .env

```bash
cp .env.example .env
```

### Étape 2 : Éditer le fichier .env

Ouvrez le fichier `.env` et remplacez les valeurs par vos URLs réelles :

```env
CYPRESS_BASE_URL=https://votre-front-end.vercel.app
CYPRESS_API_URL=https://votre-back-end.vercel.app
```

### Étape 3 : Vérifier que .env est ignoré par git

Le fichier `.env` est déjà configuré dans `.gitignore` pour ne **jamais** être commité. Vérifiez avec :

```bash
git status
# .env ne devrait pas apparaître dans la liste des fichiers modifiés
```

## Configuration dans GitHub Actions

Pour que les tests E2E fonctionnent dans les workflows GitHub Actions, vous devez ajouter les URLs comme **secrets GitHub**.

### Étape 1 : Accéder aux secrets GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (en haut à droite)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**

### Étape 2 : Ajouter les secrets

Cliquez sur **New repository secret** et ajoutez les deux secrets suivants :

#### Secret 1 : CYPRESS_BASE_URL
- **Name** : `CYPRESS_BASE_URL`
- **Value** : L'URL de votre front-end (ex: `https://dietetic-lab.vercel.app`)

#### Secret 2 : CYPRESS_API_URL
- **Name** : `CYPRESS_API_URL`
- **Value** : L'URL de votre back-end (ex: `https://dietetic-lab-back.vercel.app`)

### Étape 3 : Vérifier la configuration

Les secrets sont automatiquement utilisés par le workflow `.github/workflows/e2e.yml`. Vous pouvez vérifier que tout fonctionne en :

1. Faisant un push sur une branche
2. Vérifiant que le workflow GitHub Actions se lance
3. Consultant les logs pour voir si les tests s'exécutent correctement

## Bonnes Pratiques de Sécurité

### ✅ À FAIRE

- Toujours utiliser le fichier `.env` pour les URLs locales
- Ajouter les URLs sensibles comme secrets GitHub
- Vérifier que `.env` est dans `.gitignore`
- Utiliser des URLs différentes pour développement/staging/production

### ❌ À NE PAS FAIRE

- **JAMAIS** commiter le fichier `.env` dans git
- **JAMAIS** hardcoder les URLs dans le code
- **JAMAIS** partager vos URLs sensibles dans les issues ou PR
- **JAMAIS** logger les URLs dans les tests

## Dépannage

### Problème : Les tests ne trouvent pas les URLs

**Solution** : Vérifiez que les variables d'environnement sont bien définies :

```bash
# Vérifier localement
echo $CYPRESS_BASE_URL
echo $CYPRESS_API_URL

# Ou dans Node.js
node -e "console.log(process.env.CYPRESS_BASE_URL)"
```

### Problème : Les tests échouent dans GitHub Actions

**Solution** : Vérifiez que les secrets sont bien configurés dans GitHub :
1. Allez dans Settings → Secrets and variables → Actions
2. Vérifiez que `CYPRESS_BASE_URL` et `CYPRESS_API_URL` existent
3. Vérifiez que les valeurs sont correctes (pas d'espaces avant/après)

### Problème : Le fichier .env est visible dans git status

**Solution** : Assurez-vous que `.gitignore` contient bien `.env` :

```bash
grep "\.env" .gitignore
# Devrait afficher : .env
```

Si `.env` est déjà commité par erreur :

```bash
git rm --cached .env
git commit -m "Remove .env from git"
```

## Support

Si vous avez des questions ou des problèmes, veuillez ouvrir une issue sur le repository GitHub.
