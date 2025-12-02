const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Autoriser CORS depuis ton frontend Vercel
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Port fourni par Render
const PORT = process.env.PORT || 3000;

// Connexion à PostgreSQL sur Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Route principale
app.get("/", (req, res) => {
  res.send("Backend is running and connected to Render 🟢");
});

// Route API simple
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend with Render! 🚀",
    success: true
  });
});

// 👉 Route /db : récupère les utilisateurs dans PostgreSQL
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id;"
    );

    res.json({
      message: "Database connected successfully 🎯",
      data: result.rows,
      success: true
    });

  } catch (error) {
    console.error("DB ERROR =>", error);
    res.status(500).json({
      message: "Database connection failed ❌",
      error: error.message,
      success: false
    });
  }
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Backend live on port ${PORT}`);
});



