# Moniteur de Ski — Trois Vallées

Site web professionnel multilingue (FR / EN / PT) pour un moniteur de ski indépendant dans les Trois Vallées.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- Déployable sur **Vercel**

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — redirection automatique vers `/fr`, `/en` ou `/pt`.

## Structure i18n

```
/fr              Accueil
/fr/cours-de-ski Cours de ski
/en/ski-lessons  Ski lessons
/pt/aulas-de-esqui Aulas de esqui
…
```

Les slugs sont localisés par langue. Le sélecteur de langue conserve la page courante via les clés de route internes.

## SEO

- Metadata traduites par page et par langue
- Balises `hreflang` via `alternates.languages`
- JSON-LD Schema.org (`LocalBusiness` + `Person`)
- `sitemap.xml` et `robots.txt` générés automatiquement
- Images optimisées avec `next/image`

## Déploiement Vercel

```bash
npm run build
```

Pousser sur GitHub et importer le repo dans Vercel. Aucune configuration supplémentaire requise.

## Calendrier admin (`/admin`)

- Mot de passe : variable `ADMIN_PASSWORD` (Vercel → Settings → Environment Variables). Fallback local : `troisvallees`.
- **En local** : l’enregistrement écrit dans `data/availability.json`.
- **Sur Vercel** : crée un **Blob Store** (Storage → Blob), lie-le au projet (ajoute `BLOB_READ_WRITE_TOKEN`), puis redéploie. Sans ça, l’admin ne peut pas sauvegarder les dates en production.

## À personnaliser

- `lib/i18n/config.ts` — téléphone, email, WhatsApp, URL du site
- Dictionnaires dans `lib/i18n/dictionaries/`
- Remplacer les images Unsplash par vos propres photos
