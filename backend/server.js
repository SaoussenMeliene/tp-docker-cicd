const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// (Optionnel) permettre JSON dans le body
app.use(express.json());

// CORS pour localhost ET conteneurs
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://backend' // pour tests internes (nom de service docker / hostname interne)
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend!',
    timestamp: new Date().toISOString(),
    client: req.get('Origin') || 'unknown',
    success: true
  });
});

app.listen(PORT, () => {
  console.log(`Backend on port ${PORT}`);
});
``

