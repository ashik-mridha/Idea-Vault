# IdeaVault

IdeaVault is a community platform where aspiring founders publish startup ideas, browse what others are building and give feedback through comments. Visitors can explore everything without an account; signing in unlocks publishing, managing ideas and commenting.

- Live site: _add after deploy_
- API: _add after deploy_

## Features

- **Landing page** – sticky navbar, hero slider with calls to action, then four sections: trending ideas (ranked by community feedback), categories with live idea counts, how it works, and success stories, followed by the footer.
- **Explore ideas** (`/items`) – keyword search plus category, budget range and date range filters and sorting; responsive 1/2/3-column grid of equal-height cards with loading skeletons and an empty state. Filters live in the URL, so results can be shared.
- **Idea details** (`/items/[id]`, public) – image, specifications, problem, solution, full description, tags, author info, related ideas and a back button. Comments are visible to everyone; logged-in users can post, edit and delete their own.
- **Firebase Authentication** – email/password and Google sign-in through a React Context (`useAuth`), with inline validation, mapped error messages and redirect to `/` after login.
- **Add idea** (`/items/add`, protected) – validated form with toast feedback.
- **Manage ideas** (`/items/manage`, protected) – table on desktop and cards on mobile listing all ideas, with View for everyone and Edit/Delete (with confirmation) on the ideas you own.
- **Extras** – About, Contact (messages stored in MongoDB), Privacy and Terms pages, profile page, "My interactions", light/dark theme.
- **API hardening** – Firebase ID tokens verified on the server, input validation, owner-only updates and deletes, CORS allow-list, public responses never expose other users' email addresses.

## Tech stack

| Layer    | Technology                                        |
|----------|---------------------------------------------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, HeroUI |
| Auth     | Firebase Authentication (client SDK + `firebase-admin` on the server) |
| Backend  | Express 5 (`ideaVault-server`)                    |
| Database | MongoDB                                           |

## Setup

You need Node.js 20+, a MongoDB database and a Firebase project.

### 1. Firebase console

1. Create a project and open **Build → Authentication → Sign-in method**; enable **Email/Password** and **Google**.
2. Under **Authentication → Settings → Authorized domains**, add your deployed frontend domain (`localhost` is there by default).
3. **Project settings → General → Your apps**: register a Web app and copy its config values.
4. For the server, only the project ID is required to verify ID tokens. A service-account key (**Project settings → Service accounts**) is optional.

### 2. API server (`ideaVault-server`)

```bash
cd ideaVault-server
npm install
cp .env.example .env     # fill in MONGODB_URI, CLIENT_URL and FIREBASE_PROJECT_ID
npm run seed             # optional: inserts 11 starter ideas, safe to re-run
npm run dev              # http://localhost:8000
npm test                 # API test suite (uses your MONGODB_URI and cleans up after itself)
```

### 3. Frontend (`ideaVault`)

```bash
cd ideaVault
npm install
cp .env.example .env     # fill in NEXT_PUBLIC_API_URL and the NEXT_PUBLIC_FIREBASE_* values
npm run dev              # http://localhost:3000
npm run build && npm start
```

Never commit `.env` files; only the `.env.example` templates are tracked.

### Environment variables

| Project  | Variable | Purpose |
|----------|----------|---------|
| frontend | `NEXT_PUBLIC_API_URL` | Base URL of the API |
| frontend | `NEXT_PUBLIC_FIREBASE_API_KEY`, `_AUTH_DOMAIN`, `_PROJECT_ID`, `_APP_ID` | Firebase web app config |
| frontend | `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_X_URL` | Optional public contact/social links; empty values are hidden |
| server   | `MONGODB_URI` (`MONGODB_URI_STANDARD`) | Database connection |
| server   | `CLIENT_URL` | Comma-separated allowed frontend origins (CORS) |
| server   | `FIREBASE_PROJECT_ID` (+ optional `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) | Verify Firebase ID tokens |

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/items` | Public | Search, filter and browse ideas |
| `/items/[id]` | Public | Idea details, related ideas, comments |
| `/items/add` | Login required | Publish an idea |
| `/items/manage` | Login required | View all ideas; edit/delete your own |
| `/about` | Public | About IdeaVault |
| `/contact` | Public | Contact form |
| `/login`, `/register` | Public | Email/password and Google authentication |
| `/my-profile`, `/my-interactions` | Login required | Profile and the ideas you commented on |
| `/privacy`, `/terms` | Public | Legal pages |

Old URLs redirect permanently: `/ideas` → `/items`, `/idea/:id` → `/items/:id`, `/add-idea` → `/items/add`, `/my-ideas` → `/items/manage`.

### API summary

| Method & path | Auth | Description |
|---------------|------|-------------|
| `GET /ideas` | – | List ideas (`search`, `category`, `minBudget`, `maxBudget`, `startDate`, `endDate`, `sort`, `limit`) |
| `GET /ideas/trending` | – | Ideas ranked by likes and comments |
| `GET /categories` | – | Idea count per category |
| `GET /idea/:id`, `GET /idea/:id/related` | – | One idea; up to three related ideas |
| `POST /ideas`, `PUT /idea/:id`, `DELETE /idea/:id` | Bearer token | Create; update/delete (owner only) |
| `GET /my-ideas`, `GET /my-interactions` | Bearer token | Your ideas; ideas you commented on |
| `GET /comments/:ideaId`, `POST /comment`, `PUT/DELETE /comment/:id` | read: –, write: Bearer token | Comments (owner only to edit/delete) |
| `POST /contact` | – | Store a contact message |

Authenticated requests send `Authorization: Bearer <Firebase ID token>`.
