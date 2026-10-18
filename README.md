# Artboard

A full-stack online design tool. Create and edit designs with shapes, text, images, and templates. Features user authentication (email + Google OAuth), a visual canvas editor, and cloud-based image storage.

🔗 **Live Demo:** [artboard-navy.vercel.app](https://artboard-navy.vercel.app)

> **Note on the name**
>
> This project was originally called "MERN Canva" / "canva-clone". Fortinet's web filter (FortiGuard) flagged the deployed site as a possible phishing or brand-impersonation page because of the Canva name and logo, which blocked it on protected networks. The project has been renamed to **Artboard** everywhere (title, logo, package names, code, and deployment URL) and no longer loads any third-party brand assets.

## Tech Stack

- **Backend:** Node.js, Express 5, MongoDB (Mongoose)
- **Frontend:** React 19, Vite 7, Tailwind CSS 4
- **Auth:** JWT, Passport.js, Google OAuth 2.0
- **Storage:** Cloudinary
- **Other:** Axios, html-to-image, react-router-dom

## Features

- **Authentication:** Email/password registration and login, Google OAuth
- **Canvas Editor:** Multi-layer canvas with shapes, text, and images; drag, resize, free rotation, z-index layering, opacity, colour, font size/weight, and image corner radius
- **Templates:** Browse and use templates for quick designs
- **Projects:** Save and manage your designs
- **Image Upload:** Upload custom images, backgrounds and design assets, served through Cloudinary with automatic format and quality optimization
- **Export:** Download designs as high-resolution (3x) PNG or JPEG

## Project Structure

```
artboard/
├── config/          # Passport.js (Google OAuth)
├── controllers/     # Auth & design controllers
├── middlewares/     # JWT verification
├── models/          # Mongoose models (User, Design, Template, etc.)
├── routes/          # API routes
├── api/index.js     # Vercel serverless entry (exports the Express app)
├── server.js        # Express app (listens on PORT locally)
├── vercel.json      # Rewrites /api/* to the serverless function
├── frontend/        # React + Vite app
│   └── src/
│       ├── components/   # UI components
│       ├── pages/        # Layout & routing
│       └── utils/        # API client, helpers
└── package.json
```

## Prerequisites

- Node.js 20.19+ (required by Vite 7 and Mongoose 9)
- MongoDB
- Cloudinary account
- Google Cloud project (for OAuth)

## Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=5000
NODE_ENV=local   # "local" uses LOCAL_DB_URI + localhost CORS; any other value uses MONGODB_URI

# Database
LOCAL_DB_URI=mongodb://localhost:27017/artboard
MONGODB_URI=<your-mongodb-atlas-uri>

# Auth
JWT_SECRET=<your-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
API_URL=http://localhost:5000

# Frontend (for OAuth redirect)
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUD_API_KEY=<your-cloudinary-api-key>
CLOUD_API_SECRET=<your-cloudinary-api-secret>
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/estherdev03/artboard.git
   cd artboard
   ```

2. Install dependencies:

   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. Set up `.env` with the variables above.

4. Ensure MongoDB is running locally (or use MongoDB Atlas).

## Running the App

**Development** (runs backend + frontend concurrently):

```bash
npm run dev
```

- Backend: http://localhost:5000  
- Frontend: http://localhost:5173  

**Health check:** `GET /api/ping` returns `{ "ok": true, "message": "API is alive" }`.

## Deployment (Vercel)

The live app runs as a single Vercel project:

- The React app is built with `npm run vercel-build` and served statically from `frontend/dist`. In production the frontend calls the API on the same origin under `/api`.
- `vercel.json` rewrites every `/api/*` request to `api/index.js`, which exports the Express app as a serverless function.
- Before any route runs, a middleware awaits a cached MongoDB connection promise, so cold starts don't fail, and API errors are returned as JSON.

Set the environment variables above in the Vercel project, using `MONGODB_URI` (MongoDB Atlas) and a `NODE_ENV` other than `local`. Point `GOOGLE_CALLBACK_URL` at `https://<your-domain>/api/auth/google/callback`.

## Scripts

| Script        | Description                          |
|---------------|--------------------------------------|
| `npm run dev` | Run backend + frontend concurrently  |
| `npm run server` | Run backend only (nodemon)        |
| `npm run client` | Run frontend only (Vite dev)      |
| `npm run client-build` | Build frontend for production |
| `npm run vercel-build` | Install and build the frontend (used by Vercel) |
| `npm start`   | Run the Express API without nodemon |

## License

MIT
