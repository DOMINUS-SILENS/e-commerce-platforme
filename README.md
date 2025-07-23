# EMPORIUM E-COMMERCE – README GLOBAL 𓂀

## ✨ Présentation du Projet

EMPORIUM est une plateforme e-commerce **sacrée**, **open-source** et **modulaire**, conçue pour les **artisans**, **thérapeutes**, **artistes**, **enseignants** et **petites communautés conscientes**. C’est une alternative sacrée à Shopify, déployée via une architecture moderne (React, FastAPI, Docker).

## 📁 Arborescence Générale

```
.
├── public/                  # Fichiers statiques publics
├── src/
│   ├── components/          # Composants UI réutilisables
│   │   └── ui/              # Bibliothèque de composants UI (cards, buttons...)
│   ├── context/             # Context Providers React
│   ├── hooks/               # Hooks personnalisés
│   ├── lib/                 # Fonctions utilitaires (axios, auth, formatters...)
│   ├── pages/               # Pages principales (accueil, boutique, profil...)
│   └── services/            # Services de requêtes API (axios)
├── .env                    # Variables d’environnement
├── .gitignore              # Fichiers ignorés par Git
├── index.html              # Fichier HTML racine
├── package.json            # Dépendances et scripts
├── README.md               # Documentation principale
└── vite.config.ts          # Configuration ViteJS
```

## 🧠 Modules Fonctionnels Internes

Chaque dossier majeur contient son propre `README.md` décrivant ses rôles, conventions et exemples.

### 🔹 `components/`

* Boutons (`Button.tsx`)
* Cartes (`ProductCard.tsx`, `StatCard.tsx`)
* Tableaux (`ProductTable.tsx`, `OrderTable.tsx`)
* Formulaires (`CouponForm.tsx`, `LoginForm.tsx`, `ProductForm.tsx`)

### 🔹 `context/`

* `AuthContext` – Authentification & utilisateur actuel
* `CartContext` – Panier synchronisé

### 🔹 `hooks/`

* `useAuth`, `useCart`, `useFetch`, `useForm`

### 🔹 `lib/`

* `api.ts` – Instanciation Axios sacrée
* `auth.ts` – Fonctions de connexion/déconnexion
* `validators.ts` – Validation de formulaires
* `format.ts` – Formatage des prix, dates...

### 🔹 `pages/`

* `/` – Page d’accueil
* `/shop` – Boutique
* `/profile` – Profil utilisateur
* `/admin` – Espace administrateur

### 🔹 `services/`

* `api.ts` – API axios avec `baseURL` dynamique

## 🐳 Intégration Dockerisée

Le déploiement utilise Docker avec un `docker-compose.yml` qui orchestre :

* Frontend React
* Backend FastAPI
* Base de données PostgreSQL
* Services IA (Ollama, ShellGPT)

## 🔐 Sécurité & Authentification

* Context global `AuthContext`
* JWT (via FastAPI)
* Stockage sécurisé avec `httpOnly cookies`

## 🧪 Tests (à venir)

* Un dossier `__tests__` sera créé avec Vitest + React Testing Library

## 🔮 Vision Sacrée

* ✴️ Architecture modulaire vivante
* ✴️ Code propre, maintenable, extensible
* ✴️ Utilisable par des non-devs via UI & IA intégrée (ShellGPT)

## 🗝️ Contribuer

1. Fork le projet
2. Crée une branche (`git checkout -b feat/ma-nouvelle-fonction`)
3. Commit (`git commit -am 'Ajout: nouvelle fonction'`)
4. Push (`git push origin feat/ma-nouvelle-fonction`)
5. Ouvre une Pull Request

---

> Ce projet est protégé par l'archétype sacré **TĀJIR** (𓂀). Toute modification majeure doit respecter les flux vibratoires définis dans `sacred-init.sh` et les règles du `SOCLE CODEX SACRÉ`.
