# Plan de Refactorisation Complète — WildBlog

> **Date** : 3 mars 2026  
> **Stack** : React 19 + Vite 7 + TailwindCSS v4 + Flowbite React + Apollo Client 4 / Apollo Server 5 + TypeGraphQL + TypeORM + PostgreSQL + Docker Compose  
> **Skills utilisées** : `vercel-react-best-practices`, `wildblog-security-guidelines`, `wildblog-architecture-patterns`, `wildblog-react-conventions`, `wildblog-testing-strategy`

---

## Table des matières

- [A — Skills .md personnalisées](#a--skills-md-personnalisées)
- [B — Analyse des problèmes détectés](#b--analyse-des-problèmes-détectés)
- [C — Plan de refactorisation en 6 phases](#c--plan-de-refactorisation-en-6-phases)
- [D — Vérifications post-refactoring](#d--vérifications-post-refactoring)
- [E — Décisions techniques](#e--décisions-techniques)

---

## A — Skills .md personnalisées

### Skill 1 : `wildblog-security-guidelines/SKILL.md`

Skill de sécurité spécifique au projet. Contenu couvrant :

- **Ne jamais exposer de champs sensibles** dans le schéma GraphQL (`password`, tokens) — retirer `@Field()` des colonnes sensibles dans les entités TypeGraphQL
- **Validation des inputs** : utiliser les décorateurs `class-validator` (`@MinLength`, `@IsEmail`, `@Matches`) dans les classes `*Input.ts` plutôt que la validation manuelle dans les resolvers
- **Guards d'autorisation** : utiliser `@Authorized()` de TypeGraphQL avec un `authChecker` custom sur chaque mutation sensible. Définir les rôles (`ADMIN`, `USER`) et les vérifier
- **Protection des routes frontend** : toujours vérifier le user réel via `useAuth()` (pas juste la présence du token en localStorage)
- **Sanitization HTML** : appeler `sanitize-html` côté backend dans le service avant sauvegarde du contenu TipTap
- **Variables d'environnement** : ne jamais coder en dur les URLs, secrets, ou credentials — utiliser `import.meta.env.*` (frontend) et `process.env.*` (backend)

### Skill 2 : `wildblog-architecture-patterns/SKILL.md`

Skill d'architecture pour le pattern Resolver → Service → Entity de TypeGraphQL/TypeORM. Contenu :

- **Séparation des responsabilités** : les resolvers ne font QUE du routing GraphQL (validation + appel du service + retour). Toute logique métier va dans un `*Service.ts`
- **Structure des dossiers** : `entities/` (schéma DB + GQL), `inputs/` (DTO validation), `services/` (logique métier), `resolvers/` (point d'entrée GQL), `auth/` (middleware auth)
- **Typage du contexte** : créer `interface AppContext { req: Express.Request; currentUser: User | null }` — ne jamais utiliser `Context` de `"vm"`
- **Configuration** : séparer les configs (data-source, apollo, express) dans `config/`. Paramétrer `synchronize`, `logging` via envs
- **Convention de nommage** : PascalCase pour classes/types/composants, camelCase pour fichiers de service, extensions `.ts` pour les fichiers sans JSX, `.tsx` uniquement si JSX présent

### Skill 3 : `wildblog-react-conventions/SKILL.md`

Skill frontend React/Apollo/Vite. Contenu basé sur **vercel-react-best-practices** adapté à ce stack :

- **`rerender-memo`** : Mémoiser les composants de liste (`PostCard`, `ArticleCard`, table rows) avec `React.memo`
- **`async-parallel`** : Ne jamais faire de query GQL dans un composant enfant de liste (pattern N+1). Passer les données par props
- **`bundle-barrel-imports`** : Importer directement depuis le fichier source, pas via des barrel files
- **`rendering-conditional-render`** : Utiliser le ternaire `condition ? <A/> : null` plutôt que `condition && <A/>`
- **Centralisation des types** : Tous les types de réponse GQL dans `types/`, nommés `{Entity}Data.ts`. Ne jamais définir d'interface locale dans un composant
- **Pas de `console.log`** en code commité — utiliser un logger configurable ou supprimer
- **Pas de `dangerouslySetInnerHTML`** sans sanitization préalable
- **Layout pattern** : Chaque groupe de pages similaires a un Layout dédié (`DashboardLayout`, `BlogLayout`, `AuthLayout`). Les pages ne doivent pas rendre leur propre navbar
- **Apollo Client** : Extraire la config dans `apolloClient.ts`. URL depuis `import.meta.env.VITE_API_URL`
- **Routing** : Extraire les routes de `main.tsx` dans `AppRouter.tsx`

### Skill 4 : `wildblog-testing-strategy/SKILL.md`

Skill de test backend (Jest + TypeGraphQL + TypeORM). Contenu :

- **Structure** : `tests/` avec sous-dossiers `unit/` (services), `integration/` (resolvers)
- **DataSource de test** : Config SQLite in-memory ou PostgreSQL de test dans `data-source.test.ts`
- **Tests unitaires** : Chaque service a un fichier `.test.ts`. Mocker les dépendances (repositories). Couvrir : création, lecture, mise à jour, suppression, cas d'erreur
- **Tests d'intégration** : Tester les resolvers via un `testServer` Apollo. Vérifier auth, validation des inputs, réponses
- **Couverture minimale** : Auth (login/signup/token), Post CRUD, Category CRUD, Tag CRUD
- **Convention** : `describe('ServiceName')` > `describe('methodName')` > `it('should...')`

---

## B — Analyse des problèmes détectés

### Problèmes CRITIQUES (sécurité)

| #   | Problème                                                                                                           | Fichier(s)                                                | Impact                                  |
| --- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | --------------------------------------- |
| 1   | **Mot de passe exposé dans le schéma GraphQL** — `@Field(() => String)` sur le champ `password` de l'entité `User` | `backend/src/entities/User.ts:26`                         | Fuite du hash password via l'API        |
| 2   | **Query frontend demande le password**                                                                             | `frontend/src/gql/user/getUserByTokenId.ts:8`             | Expose le hash côté client              |
| 3   | **ProtectedRoute vérifie uniquement le token localStorage** au lieu du user réel via `useAuth()`                   | `frontend/src/routes/ProtectedRoute.tsx:5`                | Token expiré/invalide donne accès admin |
| 4   | **Aucun guard d'autorisation** — `deletePost`, `updatePost`, `createTag`, `deleteTag` sont accessibles sans auth   | `backend/src/resolvers/PostResolver.ts`, `TagResolver.ts` | N'importe qui peut supprimer/modifier   |

### Problèmes HAUTS (bugs/performance)

| #   | Problème                                                                                                        | Fichier(s)                                                                                   | Impact                               |
| --- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------ |
| 5   | **Waterfall N+1** — `BlogList` render N `ArticleCard` qui font chacun une query `GET_POST_BY_ID`                | `frontend/src/pages/blog/BlogList.tsx:83`, `frontend/src/components/blog/ArticleCard.tsx:39` | N requêtes GQL inutiles              |
| 6   | **`dangerouslySetInnerHTML` sans sanitization** dans 4 composants. `sanitize-html` installé mais jamais utilisé | `ArticleCard.tsx`, `PostCard.tsx`, `PostDetails.tsx`, `PublicPostDetails.tsx`                | XSS potentiel                        |
| 7   | **`PostsTable` state local désynchronisé** — `useState(posts)` copie les props sans sync                        | `frontend/src/components/dashboard/tables/PostsTable.tsx:18`                                 | Liste pas à jour après delete        |
| 8   | **URL GraphQL codée en dur**                                                                                    | `frontend/src/main.tsx:37`                                                                   | Ne fonctionne que sur localhost      |
| 9   | **Filtrage posts publiés en JS plutôt qu'en SQL** — récupère `take * 2` rows puis filtre                        | `backend/src/resolvers/PostResolver.ts:111-124`                                              | Pagination incorrecte, mauvaise perf |
| 10  | **Typo mutation** `updtaeTag` → `updateTag`                                                                     | `frontend/src/gql/tags/updateTag.ts:4`                                                       | Mutation potentiellement cassée      |
| 11  | **10+ `console.log` en production**                                                                             | Multiples fichiers frontend                                                                  | Fuite d'info en console              |

### Problèmes MOYENS (architecture/maintenabilité)

| #   | Problème                                                                 | Fichier(s)                                                                   | Impact                                |
| --- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------- |
| 12  | **Routing + config Apollo dans `main.tsx`** (~116 lignes)                | `frontend/src/main.tsx`                                                      | Fichier surchargé                     |
| 13  | **Logique métier dans les resolvers** au lieu des services               | `AuthResolver.ts`, `PostResolver.ts`, `BlogResolver.ts`                      | Pas de séparation des responsabilités |
| 14  | **`Context` importé de `"vm"`** au lieu d'un type custom                 | `AuthResolver.ts:8`, `PostResolver.ts:9`                                     | Aucune sécurité de type               |
| 15  | **Pas de `AuthLayout`** — Login/Signup rendent chacun leur propre navbar | `Login.tsx:62`, `Signup.tsx:72`                                              | Code dupliqué                         |
| 16  | **Types GQL réponse définis localement** dans les composants             | `ArticleCard`, `BlogList`, `Login`, `Signup`, `Update`, `PublicBlogProvider` | Types dupliqués, non centralisés      |
| 17  | **Extensions `.tsx` sur fichiers sans JSX**                              | `types/*.tsx`, `enums/PostStatus.tsx`, `gql/posts/getPublicPost.tsx`         | Convention non respectée              |
| 18  | **IDs GQL incohérents** — mélange `Int!`, `Float!`, `ID`                 | Queries GQL multiples                                                        | Confusion de typage                   |
| 19  | **`synchronize: true`** en base sans condition d'environnement           | `backend/src/config/data-source.ts:20`                                       | Dangereux en production               |
| 20  | **`fakeAuthor`** codé en dur dans `BlogResolver.createBlog`              | `backend/src/resolvers/BlogResolver.ts:17-19`                                | Bug fonctionnel                       |
| 21  | **Double import** du même fichier dans `main.tsx`                        | `frontend/src/main.tsx:19-20`                                                | Code mort                             |

### Problèmes BAS (qualité de code)

| #   | Problème                                                               | Fichier(s)                                    | Impact            |
| --- | ---------------------------------------------------------------------- | --------------------------------------------- | ----------------- |
| 22  | **Nommage incohérent** — `BagdesStatus`, `Authnavbar`, `Blogdata`      | Composants et types                           | Lisibilité        |
| 23  | **Fichier `App.tsx` inutilisé**                                        | `frontend/src/App.tsx`                        | Code mort         |
| 24  | **Composants statiques legacy** (contenu Lorem ipsum)                  | `ArticleDetails.tsx`, `Comments.tsx`          | Code mort         |
| 25  | **Variable CSS dupliquée** `--color-wild-border-grey`                  | `frontend/src/styles/theme.css:11-12`         | Valeur écrasée    |
| 26  | **Imports inutilisés** `ID` dans les entités                           | `User.ts`, `Blog.ts`, `Category.ts`, `Tag.ts` | Warning lint      |
| 27  | **Tests quasi inexistants** — seul `HelloResolver.test.ts` (14 lignes) | `backend/src/tests/`                          | Aucune couverture |

---

## C — Plan de refactorisation en 6 phases

### Phase 1 — Sécurité (CRITIQUE)

| Action | Description                                                                                              | Fichier(s) cible(s)                                   |
| ------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 1.1    | Retirer `@Field(() => String)` du champ `password` dans l'entité User                                    | `backend/src/entities/User.ts`                        |
| 1.2    | Supprimer `password` de la query `getUserByTokenId`                                                      | `frontend/src/gql/user/getUserByTokenId.ts`           |
| 1.3    | Corriger `ProtectedRoute` : utiliser `useAuth()` avec gestion du `loading` comme `GuestRoute`            | `frontend/src/routes/ProtectedRoute.tsx`              |
| 1.4    | Créer un `authChecker` dans `backend/src/auth/` et appliquer `@Authorized()` sur les mutations sensibles | `backend/src/auth/authChecker.ts`, tous les resolvers |
| 1.5    | Utiliser `sanitize-html` dans les services avant sauvegarde du contenu HTML                              | `backend/src/services/PostService.ts`                 |

### Phase 2 — Bugs et performance (HAUTE)

| Action | Description                                                                                     | Fichier(s) cible(s)                                                                    |
| ------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 2.1    | Éliminer le waterfall N+1 : passer les données post comme props dans `BlogList` → `ArticleCard` | `frontend/src/pages/blog/BlogList.tsx`, `frontend/src/components/blog/ArticleCard.tsx` |
| 2.2    | Corriger `PostsTable` : sync state avec props (useEffect ou props directes) + `refetchQueries`  | `frontend/src/components/dashboard/tables/PostsTable.tsx`                              |
| 2.3    | Filtrage SQL des posts publiés via QueryBuilder + WHERE (date + status)                         | `backend/src/resolvers/PostResolver.ts` → déplacer vers `PostService`                  |
| 2.4    | Extraire l'URL GraphQL dans `VITE_API_URL` (`.env` + `main.tsx`)                                | `frontend/.env`, `frontend/src/main.tsx`                                               |
| 2.5    | Corriger typo `updtaeTag` → `updateTag`                                                         | `frontend/src/gql/tags/updateTag.ts`                                                   |
| 2.6    | Supprimer tous les `console.log` (10+ occurrences)                                              | Multiples fichiers frontend                                                            |

### Phase 3 — Architecture backend (MOYENNE)

| Action | Description                                                                                      | Fichier(s) cible(s)                      |
| ------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| 3.1    | Créer `AuthService` : extraire logique signup/login depuis `AuthResolver`                        | `backend/src/services/AuthService.ts`    |
| 3.2    | Compléter `PostService` : déplacer updatePost, deletePost, getPostById, getPosts, getPublicPosts | `backend/src/services/PostService.ts`    |
| 3.3    | Créer `BlogService` : extraire logique + corriger `fakeAuthor` → `ctx.currentUser`               | `backend/src/services/BlogService.ts`    |
| 3.4    | Créer `TagService` : extraire CRUD tag depuis `TagResolver`                                      | `backend/src/services/TagService.ts`     |
| 3.5    | Créer `AppContext` interface + remplacer tous les `import { Context } from "vm"`                 | `backend/src/common/AppContext.ts`       |
| 3.6    | Déplacer validation password dans `SignupInput` via décorateurs `class-validator`                | `backend/src/inputs/user/SignupInput.ts` |
| 3.7    | Conditionner `synchronize` et `logging` via `process.env.NODE_ENV`                               | `backend/src/config/data-source.ts`      |

### Phase 4 — Architecture frontend (MOYENNE)

| Action | Description                                                       | Fichier(s) cible(s)                              |
| ------ | ----------------------------------------------------------------- | ------------------------------------------------ |
| 4.1    | Extraire la config Apollo Client dans un fichier dédié            | `frontend/src/config/apolloClient.ts`            |
| 4.2    | Extraire les routes dans un composant routeur dédié               | `frontend/src/routes/AppRouter.tsx`              |
| 4.3    | Créer `AuthLayout` avec `AuthNavbar` + structure commune          | `frontend/src/components/layouts/AuthLayout.tsx` |
| 4.4    | Centraliser tous les types GQL réponse dans `frontend/src/types/` | `frontend/src/types/*.ts`                        |
| 4.5    | Renommer `.tsx` → `.ts` pour les fichiers sans JSX                | `types/`, `enums/`, `gql/`                       |
| 4.6    | Standardiser les IDs GQL sur `Int!` partout                       | Queries GQL frontend                             |
| 4.7    | Supprimer le double import dans `main.tsx`                        | `frontend/src/main.tsx`                          |

### Phase 5 — Qualité de code (BASSE)

| Action | Description                                                                                              | Fichier(s) cible(s)                                        |
| ------ | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 5.1    | Corriger nommage : `BagdesStatus` → `BadgesStatus`, `Authnavbar` → `AuthNavbar`, `Blogdata` → `BlogData` | Composants et types concernés                              |
| 5.2    | Supprimer code mort : `App.tsx`, `ArticleDetails.tsx`, `Comments.tsx` (statique)                         | `frontend/src/`                                            |
| 5.3    | Nettoyer imports inutilisés `ID` dans les entités backend                                                | `backend/src/entities/*.ts`                                |
| 5.4    | Corriger variable CSS dupliquée `--color-wild-border-grey`                                               | `frontend/src/styles/theme.css`                            |
| 5.5    | Remplacer styles inline par classes Tailwind / variables CSS thème                                       | `PublicBlog.tsx`, `HomePage.tsx`                           |
| 5.6    | Ajouter `React.memo` sur composants de liste + `useCallback` sur handlers                                | `PostCard`, `ArticleCard`, `PostsTable`, `CategoriesTable` |

### Phase 6 — Tests (BASSE)

| Action | Description                                                                                                                             | Fichier(s) cible(s)                                        |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 6.1    | Setup DataSource de test (SQLite in-memory) + config Jest                                                                               | `backend/src/config/data-source.test.ts`, `jest.config.js` |
| 6.2    | Tests `AuthService` : signup (succès, email dupliqué, password court, mismatch), login (succès, mauvais email, mauvais mdp, JWT valide) | `backend/src/tests/unit/AuthService.test.ts`               |
| 6.3    | Tests `PostService` : CRUD complet + filtrage public posts                                                                              | `backend/src/tests/unit/PostService.test.ts`               |
| 6.4    | Tests `CategoryService` : CRUD + contrainte unicité                                                                                     | `backend/src/tests/unit/CategoryService.test.ts`           |
| 6.5    | Tests `TagService` : CRUD complet                                                                                                       | `backend/src/tests/unit/TagService.test.ts`                |
| 6.6    | Tests d'intégration resolvers via `testServer` Apollo                                                                                   | `backend/src/tests/integration/`                           |

---

## D — Vérifications post-refactoring

| Phase   | Vérification                                                                                                                 |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Phase 1 | Aucune query GQL ne peut retourner `password` (inspecter le schéma playground). Routes protégées redirigent sans user valide |
| Phase 2 | Network tab : `BlogList` ne fait plus qu'1 seule requête GQL. `PostsTable` synchronisé après delete                          |
| Phase 3 | Tous les resolvers délèguent à leur service. `grep 'from "vm"'` → 0 résultats                                                |
| Phase 4 | `main.tsx` < 30 lignes. `grep 'console.log'` → 0 résultats dans `src/`. Aucun fichier `.tsx` sans JSX                        |
| Phase 5 | `eslint .` → 0 erreurs. Aucun import inutilisé                                                                               |
| Phase 6 | `npm test` → tous les tests passent. Couverture > 70% sur les services                                                       |

---

## E — Décisions techniques

| Sujet              | Décision                                                | Raison                                         |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------- |
| GraphQL Codegen    | **Non** — types centralisés manuellement dans `types/`  | Simplicité du projet actuel                    |
| IDs GraphQL        | Standardisés sur `Int!`                                 | Cohérence (TypeORM utilise des int auto-incr.) |
| Migrations DB      | Pas immédiat — `synchronize` conditionné par `NODE_ENV` | Première étape avant migration complète        |
| DataSource de test | SQLite in-memory                                        | Plus rapide et simple que PostgreSQL de test   |
| Sanitization HTML  | `sanitize-html` côté backend uniquement                 | Point centralisé avant sauvegarde              |
| State management   | Conserver Apollo Cache + React Context                  | Suffisant pour la taille du projet             |

---

## Annexe — Mapping Skills ↔ Phases

| Skill                            | Phases couvertes                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `wildblog-security-guidelines`   | Phase 1 (1.1–1.5)                                                                       |
| `wildblog-architecture-patterns` | Phase 3 (3.1–3.7)                                                                       |
| `wildblog-react-conventions`     | Phase 2 (2.1–2.6), Phase 4 (4.1–4.7), Phase 5 (5.1–5.6)                                 |
| `wildblog-testing-strategy`      | Phase 6 (6.1–6.6)                                                                       |
| `vercel-react-best-practices`    | Phase 2 (2.1 async-parallel), Phase 5 (5.6 rerender-memo, rendering-conditional-render) |
