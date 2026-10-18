const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();
dotenv.config();

require("./config/passport");

app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET || "artboard-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: `http://localhost:5173`,
      credentials: true,
    }),
  );
} else {
  app.use(
    cors({
      credentials: true,
    }),
  );
}

const getConnectionUri = () =>
  process.env.NODE_ENV === "local"
    ? process.env.LOCAL_DB_URI
    : process.env.MONGODB_URI;

let connectionPromise = null;
const ensureDb = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (connectionPromise) {
    await connectionPromise;
    return;
  }
  connectionPromise = mongoose.connect(getConnectionUri());
  try {
    await connectionPromise;
    console.log("Database is connected...");
  } catch (error) {
    connectionPromise = null;
    console.error("Database connection failed.", error.message);
    throw error;
  }
};

// Wait for DB before handling any API request (fixes Vercel serverless cold start)
app.use("/api", async (req, res, next) => {
  try {
    await ensureDb();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/designRoutes"));

// Return JSON for API errors instead of HTML "Internal Server Error"
app.use((err, req, res, next) => {
  if (req.path.startsWith("/api")) {
    console.error("API error:", err.message || err);
    return res.status(500).json({
      message: "Internal Server Error.",
      detail: err.message || "Unknown error",
    });
  }
  next(err);
});

// Optional: connect at startup when running a long-lived server (local)
if (!process.env.VERCEL) {
  ensureDb().catch(() => {});
}

// Local development server; Vercel will use the exported app via /api.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
}

module.exports = app;
