# Canva Clone

A full-stack design tool inspired by Canva. Create and edit designs with shapes, text, images, and templates. Features user authentication (email + Google OAuth), a visual canvas editor, and cloud-based image storage.

> **Note: the app is published as "Artboard"**
>
> The browser tab title (`frontend/index.html`) and the deployment URL use the name **Artboard** instead of "Canva". Fortinet's web filter flagged the site as a possible phishing or brand-impersonation page because it used the Canva name, which blocked it on networks protected by FortiGuard. Renaming the public-facing title and URL lets the site pass the filter. The repository and code still use "canva-clone" internally.

## Tech Stack

- **Backend:** Node.js, Express 5, MongoDB (Mongoose)
- **Frontend:** React 19, Vite 7, Tailwind CSS 4
- **Auth:** JWT, Passport.js, Google OAuth 2.0
- **Storage:** Cloudinary
- **Other:** Axios, html-to-image, react-router-dom

## Features

- **Authentication:** Email/password registration and login, Google OAuth
- **Canvas Editor:** Drag-and-drop design creation with shapes, text, and images
- **Templates:** Browse and use templates for quick designs
- **Projects:** Save and manage your designs
- **Image Upload:** Upload custom images, backgrounds and design assets
- **Export:** Download designs as images

## Project Structure

```
canva-clone/
├── config/          # Passport.js (Google OAuth)
├── controllers/     # Auth & design controllers
├── middlewares/     # JWT verification
├── models/          # Mongoose models (User, Design, Template, etc.)
├── routes/          # API routes
├── server.js        # Express app entry point
├── frontend/        # React + Vite app
│   └── src/
│       ├── components/   # UI components
│       ├── pages/        # Layout & routing
│       └── utils/        # API client, helpers
└── package.json
```

## Prerequisites

- Node.js (v18+)
- MongoDB
- Cloudinary account
- Google Cloud project (for OAuth)

## Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=5000
NODE_ENV=local

# Database
LOCAL_DB_URI=mongodb://localhost:27017/canva-clone
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
   git clone <repository-url>
   cd canva-clone
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

**Production:**

```bash
npm run client-build
npm start
```

Serves the built frontend from Express. Set `NODE_ENV=production` and `MONGODB_URI` in your environment.

## Scripts

| Script        | Description                          |
|---------------|--------------------------------------|
| `npm run dev` | Run backend + frontend concurrently  |
| `npm run server` | Run backend only (nodemon)        |
| `npm run client` | Run frontend only (Vite dev)      |
| `npm run client-build` | Build frontend for production |
| `npm start`   | Run production server                |

## License

MIT
